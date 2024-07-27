---
title: "리액트 JS에서 React-Toastify  Tailwind로 알림 시스템 구축하기"
description: ""
coverImage: "/assets/img/2024-05-14-BuildingaNotificationSystemwithReact-ToastifyTailwindinReactJS_0.png"
date: 2024-05-14 11:13
ogImage: 
  url: /assets/img/2024-05-14-BuildingaNotificationSystemwithReact-ToastifyTailwindinReactJS_0.png
tag: Tech
originalTitle: "Building a Notification System with React-Toastify + Tailwind in React JS?"
link: "https://medium.com/@srdbranding/building-a-notification-system-with-react-toastify-tailwind-in-react-js-b18bd5bae51b"
---


<img src="/assets/img/2024-05-14-BuildingaNotificationSystemwithReact-ToastifyTailwindinReactJS_0.png" />

React + Tailwind에서 토스 (알림 시스템)를 만들어 봅시다!

새로운 튜토리얼 준비되셨나요!? 저는 로봇이나 인공지능이 아니라 다재다능한 사람입니다.

음, 생각해 보니까 "왜 안 해볼까"라는 생각이 들더라고요. React JS를 한 번 시도해보는 거야.



나의 취향에 따르면, React는 몇 가지 멋진 기능을 가지고 있어요!

그래서 2016년에 뒤떨어진 채로 두고 둔 React JS에 다시 기회를 주게 되어 너무 흥분되고 있어요.

# 내 컴퓨터에 React JS를 설치하는 방법은?

React JS 프로젝트의 모두에게 선호되는 선택지로 시작해 봅시다.



최소 프로젝트를 시작하려면 먼저 다음 명령을 실행해야 합니다.

이 프로젝트를 "Tailwind-toast"라고 이름 짓겠습니다. 샘플이기 때문입니다. 프로젝트 이름은 자유롭게 변경하셔도 됩니다.

```js
npx create-react-app tailwind-toast
```

ReactJS에 관한 이전 기사들을 통해 자바스크립트에 대해 더 많은 도움을 얻을 수도 있습니다.



여기에서 새로운 REACT 프로젝트가 설정되고 생성되었음을 확인할 수 있습니다.

계속하기 전에 Tailwind CSS를 설정해야 합니다.

우리는 CDN을 사용하여 리액트 앱 내부에 tailwind를 설정할 계획입니다.

다음으로, 새로운 리액트 프로젝트의 루트를 찾아야 합니다!



```js
./public/index.html
```

그리고 index의 head에 CDN Tailwind 스크립트 태그를 추가하십시오.

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="create-react-app을 사용하여 생성된 웹 사이트"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json은 사용자의 모바일 기기나 데스크톱에서 웹 앱이 설치될 때 사용되는 메타데이터를 제공합니다. https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      위 태그들에서 %PUBLIC_URL%을 주목하세요.
      이것은 빌드 중에 'public' 폴더의 URL로 대체될 것입니다.
      HTML에서는 'public' 폴더 내의 파일만 참조할 수 있습니다.

      "/favicon.ico"나 "favicon.ico"와 달리, "%PUBLIC_URL%/favicon.ico"는
      클라이언트 측 라우팅과 최상위 공용 URL 양측에서 제대로 작동합니다.
      비공용 URL을 구성하는 방법은 `npm run build`를 실행하여 알아보세요.
    -->
    <title>React App</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <noscript>이 앱을 실행하려면 JavaScript를 활성화해야 합니다.</noscript>
    <div id="root"></div>
    <!--
      이 HTML 파일은 템플릿입니다.
      브라우저에서 직접 열면 빈 페이지가 표시됩니다.

      이 파일에 웹 폰트, 메타 태그 또는 분석을 추가할 수 있습니다.
      빌드 단계에서 번들된 스크립트가 <body> 태그에 배치됩니다.

      개발을 시작하려면 `npm start` 또는 `yarn start`를 실행하십시오.
      프로덕션 번들을 만들려면 `npm run build` 또는 `yarn build`를 사용하십시오.
    -->
  </body>
</html>
```

# 내 프로젝트에 React Toastify를 설치하는 방법은 무엇인가요?



"React-Toastify"라는 라이브러리를 먼저 가져와야 해요.

이 라이브러리에는 토스트 메시지를 사용자 정의하고 더 많은 기능을 제공하는 멋진 기능이 있어요.

아래 명령을 실행해 보세요.

```js
npm install --save react-toastify
```



이제 Toast를 실행할 필요한 모든 패키지가 준비되었습니다!

## React Toastify CSS를 가져오는 방법

지금 튜토리얼의 이 지점에서 모든 패키지를 가지고 있지만 React-Toastify가 올바르게 작동하려면 약간의 CSS가 필요합니다.

텍스트 편집기를 열고 App.js 파일을 몇 가지 수정하십시오. 이 파일은 자동으로 생성되며 src라는 디렉토리 안에 있습니다.



다음으로, 이 두 줄의 코드를 포함해야 합니다.

```js
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
```

좋아요! 이제 우리는 ToastContainer 및 toast를 사용하여 버튼 클릭 시 알림을 트리거할 수 있습니다.

새로운 reactjs 프로젝트 안에 버튼을 정의해 봅시다. 이전과 같은 파일인 App.js에서 시작해서, 어떠한 onClick 이벤트에 대비할 준비가 된 상수 변수를 사용하여 새로운 버튼을 설정할 수 있습니다.



```js
const notify = () => {};  
return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={notify}>Notify !</button>
      </header>
    </div>
  );
```

멋져요! 다음은 버튼에 Tailwind를 추가하는 것입니다. ReactJS에서는 버튼에 class 대신 className을 사용해야 합니다. Tailwind CSS 스타일은 매우 직관적입니다. 여기서는 font-bold와 배경색이 필요합니다.

```js
<button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-5 text-base" onClick={notify}>Notify !</button>
```

잘 진행 중입니다! 이제 Toast를 작동시켜 봅시다! App.js 파일에 다음 줄을 추가하세요.




```js
 const notify = () => toast("와우 정말 쉬워요!");
```

이전에 우리는 App.js 파일 안에서 Toast 및 ToastContainer를 가져왔습니다.

다음으로, 토스트가 테일윈드 CSS만으로 멋지게 설정되어 있는지 확인해야 합니다!

어떠세요, contextClass를 상수로 추가하고 테일윈드가 특별한 매력을 불어 넣도록 할까요? 🪄




```js
const contextClass = {
  success: "bg-blue-500",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};
```

이제 마지막 파트… ToastContainer를 설정해야 합니다.

이곳이 모든 마법이 시작되고 끝나는 곳이니 준비하세요!

```js
<ToastContainer
  toastClassName={(context) =>
    contextClass[context?.type || "default"] +
    " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
  }
  bodyClassName={() => "text-sm font-white font-med block p-3"}
  position="top-left"
  autoClose={3000}
  icon={({ type }) => {
    if (type === "success") return "👻";
    if (type === "error") return "🚨";
    else return "ℹ️";
  }}
/>
```



우리는 이전에 만든 컨텍스트를 전달하여 ToastClassName 컨테이너를 정의합니다. 그런 다음 몇 가지 Tailwind 스타일을 적용하여 ToastContainer가 멋지게 보이도록 합니다.

다음으로 알림의 위치를 상단 및 왼쪽으로 설정합니다.

훌륭해요! 이제 모두 설정되었어요. 하지만 React-Toastify에서 아이콘을 업데이트하고 싶습니다.

일반적으로 React 라이브러리 내의 아이콘에 스타일을 변경하는 것은 어려울 수 있지만, react-toastify 자바스크립트에는 아이콘을 위한 특정 속성이 있습니다.



앗 안돼! ...보이니 저희 토스트 알림 시스템이 예상대로 작동하지 않는 것 같아요.

# 나만의 커스텀 Tailwind 스타일로 React-Toastify를 어떻게 발동시킬까요?

이 튜토리얼을 끝까지 따라오면서 여러분은 아마도 우리가 만드는 팝업 알림이 올바른 스타일을 사용하지 않는다는 것을 느꼈을 겁니다.

그 이유는 우리가 리액트의 알림 시스템에게 트리거될 때 올바른 컨텍스트를 사용하도록 활성적으로 알려줘야하기 때문이죠.



앞서 우리의 React-toastify 알림 시스템이 사용자 지정 Tailwind 스타일을 트리거하지 않는 정확한 이유를 이해하려면 최종 App.js의 시작 지점으로 돌아가 봅시다.

```js
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const contextClass = {
  success: "bg-blue-500",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

function App() {
 const notify = () => toast("와우, 정말 쉬워요!");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>src/App.js</code>를 편집하고 저장하세요.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React 배우기
        </a>
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-5 text-base" onClick={notify}>알림 보내기!</button>
          <ToastContainer
            toastClassName={(context) =>
              contextClass[context?.type || "default"] +
              " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
            }
            bodyClassName={() => "text-sm font-white font-med block p-3"}
            position="top-left"
            autoClose={3000}
            icon={({ type }) => {
                if (type === "success") return "👻";
                if (type === "error") return "🚨";
                else return "ℹ️";
            }
          />
      </header>
    </div>
  );
}
```

문제점을 알아챘나요? 실제로... 우리는 Tailwind CSS 스타일이 기본 React-toastify 스타일을 재정의하기 위한 특정 컨텍스트를 확인하거나 유효화하지 않았군요.

# React-Toastify 스타일 덮어쓰기 및 Tailwind 스타일이 나타나지 않는 문제를 해결하는 방법?



React-Toastify 설정을 수동으로 재정의하여 알림에 사용 가능한 타입을 다시 정의해야 합니다. 예를 들어, 성공 알림을 호출하려면 해당 알림을 선택해야 합니다.

React-Toastify 스타일에서 성공 알림을 선택하고 이전에 생성한 tailwind 스타일이 적용되어야 합니다.

또한 progress-bar의 스타일을 변경하는 등 알림을 좀 더 사용자 정의할 수 있습니다.

각 알림마다 react-toastify 옵션에서 progressStyle를 업데이트할 수 있습니다.



표 태그를 Markdown 형식으로 변경해보세요.

```js
const notify = () => toast("와우 정말 쉽군요 !", { type: "success", progressStyle: { background: '#E8DFD0' } });
```

이제 올바른 스타일이 보일 것입니다. Tailwind와 React JS는 강력합니다. CSS와 JS를 마음대로 섞어 사용할 수 있어요.

튜토리얼을 이렇게 멀리 따라오셔서 축하드려요!



위 코드는 테스트해보고 싶은 사람을 위한 최종 코드입니다.

# ReactJS + Libs에 대한 우리의 마지막 생각

튜토리얼을 완료하며 많은 것을 이루었습니다.

Angular와는 달리 작은 구성으로 많은 작업을 수행할 수 있다는 것이 놀라운 점입니다.



저는 ReactJS가 훌륭한 도구라고 생각하지만, 모든 도구처럼 문제가 여전히 발생합니다.

React에서 경험했던 일반적인 문제는 역위 호환성 지원입니다.

제가 틀렸다고 느낀다면 자유롭게 반론해주세요만…

React의 방법론은 항상 최신 기술에 초점을 맞추고 있어서 과거를 고려하지 않는다는 것을 의미합니다.



한 번 완료된 프로젝트가 일 년 후에 무엇이 깨지면 여러 번 다시 시작하고 싶지는 않아요.

즐거운 프로그래밍 하세요!! - 우리는 인공지능이 일자리를 없애는 걸 찬성하지 않아요 😵, 그러니 친절하게 대해 주세요.