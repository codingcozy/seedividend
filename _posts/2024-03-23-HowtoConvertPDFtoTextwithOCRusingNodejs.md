---
title: "Nodejs를 사용하여 OCR을 이용하여 PDF를 텍스트로 변환하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to Convert PDF to Text with OCR using Nodejs"
link: "https://cloudmersive.medium.com/how-to-convert-pdf-to-text-with-ocr-using-node-js-cfb3630735fb"
---



우리의 PDF 파일이 비트맵 이미지(벡터 이미지가 아닌 이미지)로 변환될 때 문서로부터 일반 텍스트를 추출하기 위해 OCR 서비스가 필요합니다.

![OCR를 사용하여 PDF를 텍스트로 변환하는 방법 이미지](/assets/img/How-to-Convert-PDF-to-Text-with-OCR-using-Node.js_0.png)

다행히도 아래 코드를 사용하여 우리의 Node.js 애플리케이션에서 무료로 이용할 수 있는 PDF to Text OCR API를 쉽게 활용할 수 있습니다. 이 빠르고 메모리 내 변환 서비스는 우리의 원본 문서에서 텍스트를 포함한 일반 텍스트 문자열을 반환하며 다음과 같은 방법으로 요청을 사용자 정의할 수 있습니다:

- 요청에 대한 Basic, Normal 또는 Advanced 인식 모드를 선택하여 페이지 회전, 왜곡 및 저품질 이미지에 대한 탄력성을 향상시킵니다 (높은 탄력성은 요청 완료를 위해 더 많은 API 호출을 차지할 수 있음).
- 입력 문서의 언어를 지정할 수 있으며 수십 개의 일반 국제 언어를 지원합니다.
- 이미지 변환 전에 이미지를 전처리하도록 선택할 수 있습니다. (이 기능을 해제하려면 'none'으로 설정).

<div class="content-ad"></div>

저희 요청을 인가하기 위해서는 무료 티어 API 키만 있으면 됩니다. 이를 통해 매월 800회의 API 호출 한도를 무언의 추가 약정 없이 이용할 수 있고, 클라우드머시브 웹사이트에서 무료 계정을 등록함으로써 얻을 수 있습니다.

첫 번째 단계는 SDK를 설치하는 것입니다. 아래 명령을 실행하여 이를 수행할 수 있습니다:

```js
npm install cloudmersive-ocr-api-client --save
```

또는 이 코드 스니펫을 package.json 파일에 추가함으로써도 됩니다:

<div class="content-ad"></div>

```js
  "dependencies": {
    "cloudmersive-ocr-api-client": "^1.3.3"
  }
```

마침내, 함수를 호출하고 위에서 언급한 요청 매개변수를 우리가 원하는 대로 설정할 수 있습니다:

```js
var CloudmersiveOcrApiClient = require('cloudmersive-ocr-api-client');
var defaultClient = CloudmersiveOcrApiClient.ApiClient.instance;

// API 키 인증 구성: Apikey
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = '귀하의 API 키';

var apiInstance = new CloudmersiveOcrApiClient.PdfOcrApi();

var imageFile = Buffer.from(fs.readFileSync("C:\\temp\\inputfile").buffer); // 파일 | OCR을 수행할 PDF 파일.

var opts = {
  'recognitionMode': "recognitionMode_example", // 문자열 | 선택 사항; 가능한 값은 'Basic'로 기본 인식을 제공하며 페이지 회전, 비스듬히 된 페이지 또는 저해상도 이미지에 내성이 없으며 페이지 당 1-2개의 API 호출을 사용합니다; 'Normal'은 매우 장애 허용성 OCR 인식을 제공하여 페이지 당 14-16개의 API 호출을 사용합니다; 그리고 'Advanced'는 가장 높은 품질과 가장 장애에 강거나 인식에 수행되는 페이지당 28-30개 API 호출을 사용합니다. 기본 인식 모드는 'Basic'입니다.
  'language': "language_example", // 문자열 | 선택 사항, 입력 문서의 언어, 기본값은 영어(ENG)입니다. 가능한 값은 ENG(영어), ARA(아랍어), ZHO(중국어-간체), ZHO-HANT(중국어-번체), ASM(아사미어), AFR(아프리칸스어), AMH(암하릭어), AZE(아제르바이잔어), AZE-CYRL(아제르바이잔어-키릴), BEL(벨라루스어), BEN(벵골어), BOD(티베트어), BOS(보스니아어), BUL(불가리아어), CAT(카탈로니아어; 발렌시아어), CEB(세부어), CES(체코어), CHR(체로키어), CYM(웨일스어), DAN(덴마크어), DEU(독일어), DZO(종카어), ELL(그리스어), ENM(고문/중세 영어), EPO(에스페란토), EST(에스토니아어), EUS(바스크어), FAS(페르시아어), FIN(핀란드어), FRA(프랑스어), FRK(프랑크어), FRM(중세 프랑스어), GLE(아일랜드어), GLG(갈리시아어), GRC(고대 그리스어), HAT(아이티어), HEB(히브리어), HIN(힌디어), HRV(크로아티아어), HUN(헝가리어), IKU(이눅티툭어), IND(인도네시아어), ISL(아이슬란드어), ITA(이탈리아어), ITA-OLD(옛날 - 이탈리아어), JAV(자바어), JPN(일본어), KAN(칸나다어), KAT(조지아어), KAT-OLD(옛날-조지아어), KAZ(카자흐어), KHM(중부 캄보디아어), KIR(키르기스어), KOR(한국어), KUR(쿠르드어), LAO(라오어), LAT(라틴어), LAV(라트비아어), LIT(리투아니아어), MAL(말라얄람어), MAR(마라티어), MKD(마케도니아어), MLT(몰타어), MSA(말레이어), MYA(버마어), NEP(네팔어), NLD(네덜란드어), NOR(노르웨이어), ORI(오리야어), PAN(펀자브어), POL(폴란드어), POR(포르투갈어), PUS(푸슛푸어), RON(루마니아어), RUS(러시아어), SAN(산스크리트어), SIN(싱할라어), SLK(슬로바키아어), SLV(슬로베니아어), SPA(스페인어), SPA-OLD(옛 스페인어), SQI(알바니아어), SRP(세르비아어), SRP-LAT(라틴 세르비아어), SWA(스와힐리어), SWE(스웨덴어), SYR(시리아어), TAM(타밀어), TEL(텔루구어), TGK(타지크어), TGL(타갈로그어), THA(태국어), TIR(티그리냐어), TUR(터키어), UIG(위구르어), UKR(우크라이나어), URD(우르도어), UZB(우즈베크어), UZB-CYR(키릴 우즈베크어), VIE(베트남어), YID(이디시어)
  'preprocessing': "preprocessing_example" // 문자열 | 선택 사항, 전처리 모드, 기본값은 'Auto'입니다. 가능한 값은 None(이미지의 전처리 없음) 및 Auto(OCR 적용 전 이미지 자동 향상; 이를 권장합니다).

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API 호출이 성공했습니다. 반환된 데이터: ' + data);
  }
};
apiInstance.pdfOcrPost(imageFile, opts, callback);
```

이제 래스터 PDF 문서를 텍스트로 쉽게 변환할 수 있습니다.

```

```
