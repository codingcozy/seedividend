---
title: "클라이언트 측 JavaScript를 사용하여 문자열을 버퍼 및 데이터 URL 형식으로 변환하는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowToConvertStringToBufferAndDataURLFormatsUsingClient-SideJavaScript_0.png"
date: 2024-05-14 13:52
ogImage: 
  url: /assets/img/2024-05-14-HowToConvertStringToBufferAndDataURLFormatsUsingClient-SideJavaScript_0.png
tag: Tech
originalTitle: "How To Convert String To Buffer And Data URL Formats Using Client-Side JavaScript"
link: "https://medium.com/javascript-in-plain-english/how-to-convert-string-to-buffer-and-data-url-formats-using-client-side-javascript-9514a8c446d2"
---


웹 애플리케이션에서는 Base64가 종종 사용됩니다. 바이너리 데이터를 ASCII 텍스트 형식으로 저장하거나 전송하기 위해 인코딩하는 데 쓰입니다. 예를 들어, 파일 전송 API는 효율적인 저장 및 처리 속도로 인해 이진 데이터로 반환된 응답을 받는 경우가 많습니다.

![image](/assets/img/2024-05-14-HowToConvertStringToBufferAndDataURLFormatsUsingClient-SideJavaScript_0.png)

# NodeJS의 버퍼 클래스

NodeJS에 독점적인 전역 API 중 하나인 버퍼 클래스는 보내거나 받는 이진 데이터를 처리하는 편리한 수단으로 사용됩니다. 예를 들어, 다음 코드 스니펫은 NodeJS의 버퍼 모듈을 사용하여 문자열을 ArrayBuffer로 변환하거나 그 반대로 변환하는 방법을 보여줍니다:



```js
const str = 'Hey. this is a string!';

const buffer = Buffer.from(str, 'utf-8'); // 형식: ArrayBuffer
const b64Str = Buffer.from(str, 'utf-8').toString('base64');
console.log(b64Str);
/* 예상 결과: */
// SGV5LiB0aGlzIGlzIGEgc3RyaW5nIQ==

const originalStr = Buffer.from(b64Str, 'base64').toString('utf-8');
console.log(originalStr);
/* 예상 결과: */
// Hey. this is a string!
```

## 클라이언트 측 브라우저 환경

- btoa()는 Base64로 인코딩된 문자열을 읽고 출력합니다.
- atob()은 Base64 문자열의 디코딩에 사용됩니다.

NodeJS의 Buffer 모듈은 기본적으로 UTF-8 인코딩 체계를 사용하는 반면, btoa()와 atob()은 유니코드 텍스트와 같은 비 ASCII 문자를 해석할 수 없어 에러를 발생시킵니다.



```js
try {
  btoa('ヾξ⸨🎀˶❛ヮ❛⸩ﾉ ᵀᴴᴱ ᴿᴵᴮᴮᴼᴺ ᴳᴵᴿᴸ'); // 유니코드 문자만
} catch(err) {
  console.error(err);
}
// 콘솔 출력:
/* InvalidCharacterError: Failed to execute 'btoa' on 'Window': The */
/* string to be encoded contains characters outside of the Latin1 range. */
```

그러므로 데이터를 이진 데이터 형식으로 변환하는 경우 — 즉, Data URL 및 ArrayBuffer로 변환하기 위해 사전에 UTF-8로 문자열을 바이트 시퀀스로 변환한 후 이 바이트 시퀀스를 Base64 문자열로 인코딩해야 합니다.

# 구현 세부 사항

여기 클라이언트 측 JavaScript를 사용하여 "유니코드 문제"를 해결하기 위한 2가지 가능한 방법이 있습니다. 양 구현 모두 아래의 헬퍼 함수 convertBitArrtoB64 및 convertB64ToBitArr가 포함되어야 한다는 점을 유의하십시오:



```js
// Uint8Array를 Base64 문자열로 변환하는 함수
const convertBitArrtoB64 = (bitArr) => ( btoa( bitArr.reduce((data, byte) => data + String.fromCharCode(byte), '') ) );

// Base64 문자열을 Uint8Array로 변환하는 함수
const convertB64ToBitArr = (b64Str) => ( Uint8Array.from(atob( (b64Str.includes(';base64,') ? (b64Str.split(','))[1] : b64Str) ), (v) => v.charCodeAt(0)) );
```

## (1) TextEncoder & TextDecoder

UTF-8 문자열 인코딩은 네이티브 브라우저에서 TextEncoder 인터페이스(반대 방향으로는 TextDecoder)로 처리할 수 있습니다:

- 문자열을 ArrayBuffer 및 Base64로 인코딩된 데이터 URL로 변환하기




```js
const inputStr = '히카리 미나미';

// 문자열을 Uint8Array로 출력하는 인자를 사용하는 함수
const bitArr = (utf8Str) => (new TextEncoder().encode(utf8Str));

const uInt8Arr = bitArr(inputStr);
console.log(uInt8Arr);
// 예상 결과:
// 236,150,136,237,132,132,235,170,164,237,157,144,32,236,130,183,235,143,138

const buffer = uInt8Arr.buffer; 
console.log(buffer); 
// 예상 결과:
// 바이트 길이가 21인 ArrayBuffer 출력

const b64Str = convertBitArrtoB64( bitArr(inputStr) );
console.log(b64Str);
// 예상 결과:
// 7ZWw7ISw7Iqk7YOJIDA=
```

- 원래 입력된 텍스트로의 역 변환

```js
// Uint8Array를 사용하는 인자를 문자열로 출력하는 함수
const utf8Str = (bitArr) => (new TextDecoder().decode(bitArr.buffer));

const originalStr = utf8Str(convertB64ToBitArr(b64Str));
console.log(originalStr);
// 예상 결과:
// 히카리 미나미
```

## (2) unescape + encodeURIComponent 및 decodeURIComponent + escape




그러나 대안으로 UTF-8 인코더를 구현하는 JavaScript를 사용할 수도 있습니다. 이를 위해 브라우저 글로벌 객체인 unescape + encodeURIComponent (그리고 반대 방향으로는 decodeURIComponent + escape)를 사용할 수 있습니다:

- 문자열을 ArrayBuffer와 Base64로 인코딩된 데이터 URL로 변환

```js
const inputStr = 'ヾξ⸨🎀˶❛ヮ❛⸩ﾉ ᵀᴴᴱ ᴿᴵᴮᴮᴼᴺ ᴳᴵᴿᴸ';

// 문자열을 받아 Base64 문자열을 출력하는 함수
const utf8_to_b64 = (str) => (btoa(unescape(encodeURIComponent(str))));

const b64Str = utf8_to_b64(inputStr);
console.log(b64Str);
// 예상 결과:
// 44O+zr7iuKjwn46Ay7binZvjg67inZviuKnvvokg4bWA4bS04bSxIOG0v+G0teG0ruG0ruG0vOG0uiDhtLPhtLXhtL/htLg=

const uInt8Arr = convertB64ToBitArr(utf8_to_b64(inputStr));
console.log(uInt8Arr);
// 예상 결과:
// 227,131,190,206,190,226,184,168,240,159,142,128,203,182,226,157,155,227,131,174,226,157,155,226,184,169,239,190,137,32,225,181,128,225,180,180,225,180,177,32,225,180,191,225,180,181,225,180,174,225,180,174,225,180,188,225,180,186,32,225,180,179,225,180,181,225,180,191,225,180,184

const buffer = uInt8Arr.buffer; 
console.log(buffer); 
// 예상 결과:
// 71바이트 길이의 ArrayBuffer를 출력함
```

- 원래 입력 텍스트로의 역변환



```js
// Base64로 인코딩된 데이터 URL을 받아 String을 출력하는 함수입니다.
const b64_to_utf8 = (str) => (decodeURIComponent(escape(atob(str)));

const originalStr = b64_to_utf8(b64Str);
// 예상 결과:
// ヾξ⸨🎀˶❛ヮ❛⸩ﾉ ᵀᴴᴱ ᴿᴵᴮᴮᴼᴺ ᴳᴵᴿᴸ
```

# 실시간 데모

## ASCII 문자만 사용

<img src="https://miro.medium.com/v2/resize:fit:1200/1*FHtRkS1iUjaSCPGv6Pz0-A.gif" />




## 유니코드 문자만

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*kwj-q8KMkj_nQcqWhliUBw.gif)

convert-to-buffer에서 직접 시도해보세요!

여기까지 읽어주셔서 정말 감사합니다! ❤ 이 구현이 유용했기를 바라며, 더 많은 GIS, 데이터 분석 및 웹 응용 프로그램 관련 콘텐츠를 원하시면 Medium에서 제 팔로우를 해주세요. 정말로 감사하겠습니다 — 😀



— 🌮 타코 한 개 사주세요 ξ(🎀˶❛◡❛)

## 다른 웹 관련 콘텐츨 후보:

# PlainEnglish.io 🚀

In Plain English 커뮤니티의 일원이 되어주셔서 감사합니다! 떠나시기 전에:



- 저자에 대한 박수 및 팔로우 부탁드려요️
- In Plain English에 글을 쓸 수 있는 방법을 배워보세요️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문: Stackademic | CoFeed | Venture