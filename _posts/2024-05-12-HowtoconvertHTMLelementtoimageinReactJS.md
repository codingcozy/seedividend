---
title: "React JS에서 HTML 요소를 이미지로 변환하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoconvertHTMLelementtoimageinReactJS_0.png"
date: 2024-05-12 22:26
ogImage: 
  url: /assets/img/2024-05-12-HowtoconvertHTMLelementtoimageinReactJS_0.png
tag: Tech
originalTitle: "How to convert HTML element to image in React JS"
link: "https://medium.com/how-to-react/how-to-convert-html-element-to-image-in-react-js-2fdbf972d877"
isUpdated: true
---





<img src="/assets/img/2024-05-12-HowtoconvertHTMLelementtoimageinReactJS_0.png" />

HTML을 이미지로 변환하는 것은 웹 응용 프로그램에서 유용한 기능일 수 있습니다. React에서 이 작업을 수행하는 여러 가지 방법이 있지만, 가장 일반적인 방법 중 하나는 서드파티 라이브러리를 사용하는 것입니다. 이 글에서는 React에서 html-to-image 모듈을 사용하여 HTML을 이미지로 변환하는 방법을 살펴보겠습니다.

# 요구 사항

- html-to-image



<b>단계 1: html-to-image 설치하기</b>

html-to-image 모듈을 사용하려면 먼저 설치해야 합니다. React 프로젝트에서 다음 명령을 실행하여 이 작업을 수행할 수 있습니다.

```js
npm install html-to-image
```

<b>단계 2: 라이브러리 가져오기</b>



라이브러리를 설치한 후에는 React 컴포넌트로 가져와야 합니다. 파일 상단에 다음과 같은 import 문을 포함하여 이 작업을 할 수 있습니다.

```js
import { toPng } from 'html-to-image';
```

3단계: HTML 요소에 대한 참조 추가

변환하려는 HTML을 이미지로 지정하기 위해 HTML 요소를 명시해야 합니다. useRef 훅을 사용하여 이 작업을 할 수 있습니다. 다음과 같은 코드를 추가하여 HTML 요소에 대한 참조를 만들어야 합니다.



```js
const elementRef = useRef(null);
```

그런 다음 변환하려는 HTML 요소에 ref 속성을 추가해야 합니다. 예를 들어:

```js
<table
        ref={elementRef}
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          borderCollapse: "collapse",
          width: "50%",
          margin: "0 auto",
        }}
      >
        <tr>
          <th
            style={{
              backgroundColor: "#04AA6D",
              padding: "12px 8px",
              textAlign: "left",
              border: "1px solid #ddd",
            }}
          >
            회사
          </th>
          <th
            style={{
              backgroundColor: "#04AA6D",
              padding: "12px 8px",
              textAlign: "left",
              border: "1px solid #ddd",
            }}
          >
            연락처
          </th>
          <th
            style={{
              backgroundColor: "#04AA6D",
              padding: "12px 8px",
              textAlign: "left",
              border: "1px solid #ddd",
            }}
          >
            국가
          </th>
        </tr>
        <tr>
          <td
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            Alfreds Futterkiste
          </td>
          <td
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            Maria Anders
          </td>
          <td
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            독일
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            Berglunds snabbköp
          </td>
          <td
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            Christina Berglund
          </td>
          <td
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            스웨덴
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            Centro comercial Moctezuma
          </td>
          <td
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            Francisco Chang
          </td>
          <td
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            멕시코
          </td>
        </tr>
      </table>
```

참고: 스타일이 포함된 이미지를 다운로드하려면 HTML에 인라인 스타일을 포함해야 합니다.




단계 4: HTML을 이미지로 변환하기

이제 우리는 HTML 요소에 참조를 추가했으니, htmlToImage 라이브러리를 사용하여 이미지로 변환할 수 있습니다. 다음 코드를 추가하여 이 작업을 수행할 수 있습니다:

```js
const htmlToImageConvert = () => {
  toPng(elementRef.current, { cacheBust: false })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
};
```

htmlToImageConvert 함수는 HTML을 이미지로 변환하고 싶을 때 트리거됩니다. 이 함수는 html-to-image 패키지의 toPng 메서드를 사용하여 HTML 요소를 PNG 이미지로 변환합니다.



5단계: 변환을 시작할 버튼 추가하기

마지막으로, 변환을 시작할 버튼을 React 컴포넌트에 추가해야 합니다. 다음 코드를 추가하여 이 작업을 수행할 수 있습니다.

```js
<button onClick={htmlToImageConvert}>이미지 다운로드</button>
```

문의 사항이 있으시면 LinkedIn을 통해 연락해 주세요.



아래에서 GitHub 저장소 샘플과 codesandbox 데모를 찾아볼 수 있어요.