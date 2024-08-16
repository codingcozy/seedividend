---
title: "내가 좋아하는 JavaScript 짧은 코드 한 줄"
description: ""
coverImage: "/assets/img/2024-05-14-MyFavouriteJavaScriptOne-Liners_0.png"
date: 2024-05-14 15:11
ogImage: 
  url: /assets/img/2024-05-14-MyFavouriteJavaScriptOne-Liners_0.png
tag: Tech
originalTitle: "My Favourite JavaScript One-Liners"
link: "https://medium.com/gitconnected/my-favourite-javascript-one-liners-0e11f736ac3b"
isUpdated: true
---





![My Favourite JavaScript One-Liners](/assets/img/2024-05-14-MyFavouriteJavaScriptOne-Liners_0.png)

오늘은 다양한 코딩 과제에서 많은 도움을 받은 가장 유용하고 간단한 JavaScript 원 라이너를 여러분과 공유하고 싶어요.

다음의 속임수를 사용함으로써 복잡한 함수를 프로그래밍하는 데 많은 작업을 줄일 수 있어요.

그러니 이제 말이 더 필요 없죠! 함께 시작해봐요!




# 디자인 모드

일반적으로 꺼져 있는 이 기능을 활성화하면 웹사이트에서 어떤 텍스트든 선택하고 편집할 수 있습니다. 이를 통해 소스 코드를 변경하지 않고도 빠르게 다양한 텍스트나 단어를 시도해 볼 수 있습니다.

이 기능을 활성화하려면 아래 코드만 필요합니다:

```js
document.designMode = "on"
```



# 배열 병합

```js
const merge = [...array1, ...array2];
```

이 코드 스니펫은 JavaScript의 전개 구문을 활용하여 두 배열의 내용을 매끄럽게 병합합니다. 각 배열의 요소를 대괄호 안에 펼쳐서 새로운 배열을 만들어 두 소스 배열의 모든 요소를 포함시킵니다.

이 간결한 접근 방식은 원본 배열을 변형시키지 않고 배열을 결합하는 과정을 간단하게 만들어 줍니다.



중복을 피하고 각 요소가 한 번만 존재하도록 하려면 Set() 메서드를 사용하십시오:

```js
const merge = [...new Set([...array1, ...array2])];
```

# 랜덤 Hex 색상 생성

다음 코드는 16진수 코드로 랜덤 색상을 생성합니다. 이는 데이터 시각화나 동적 콘텐츠 생성 시 매우 유용합니다.



```js
const randomHexColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
```

# 클립보드에 복사

선택된 웹사이트의 일부를 클립보드에 복사할 수 있습니다.

```js
document.execCommand('copy');
```



자바스크립트를 사용하여 텍스트를 클립보드에 복사하는 방법은 클립보드 API를 사용하는 것입니다. 간단한 예제를 보여드리겠습니다:

```js
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// 사용 예시:
const textToCopy = "안녕하세요, 세상!";
copyToClipboard(textToCopy);
```

- copyToClipboard 함수는 임시 텍스트영역 요소를 생성하여 해당 값으로 설정하고, 문서 바디에 추가한 뒤 해당 내용을 선택하고, 복사 명령을 실행하여 마지막으로 DOM에서 텍스트영역 요소를 제거합니다.
- "안녕하세요, 세상!"을 복사할 텍스트로 교체해주세요.


console.table




이 함수는 특히 대량 데이터의 콘솔 출력을 용이하게 합니다. console.log()에 비해 데이터를 표로 표시하여 더 명확한 대안을 제공합니다.

```js
const data = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Alice', age: 25, city: 'Los Angeles' },
  { name: 'Bob', age: 35, city: 'Chicago' }
];

console.table(data);
```

<img src="/assets/img/2024-05-14-MyFavouriteJavaScriptOne-Liners_1.png" />

이 게시물이 여러분의 문제 중 일부를 해결하고 즐겁게 읽으셨기를 바랍니다! 여러분의 가장 좋아하는 JavaScript 원라이너가 무엇인지 댓글로 알려주세요.



가장 최신 컨텐츠를 받아보려면 구독을 잊지마세요! 👍

코딩 즐기세요! 🚀