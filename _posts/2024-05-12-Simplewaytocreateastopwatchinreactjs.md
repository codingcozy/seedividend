---
title: "리액트 JS에서 스톱워치를 만드는 간단한 방법"
description: ""
coverImage: "/assets/img/2024-05-12-Simplewaytocreateastopwatchinreactjs_0.png"
date: 2024-05-12 20:48
ogImage: 
  url: /assets/img/2024-05-12-Simplewaytocreateastopwatchinreactjs_0.png
tag: Tech
originalTitle: "Simple way to create a stopwatch in react js"
link: "https://medium.com/how-to-react/simple-way-to-create-a-stopwatch-in-react-js-bcc0e08e041e"
---


![이미지](https://miro.medium.com/v2/resize:fit:1400/1*cpD3T-0TChZXMlfpRFBBAQ.gif)

안녕하세요! 이번 튜토리얼에서는 React JS로 시간, 분, 초 및 밀리초가 표시된 스톱워치를 만드는 방법을 배워보겠습니다. 스톱워치는 이벤트의 시작부터 종료까지 경과된 시간을 측정하는 데 사용되는 장치입니다.

이 튜토리얼을 시작하기 전에 React JS 및 그 구성 요소에 대한 기본적인 이해가 필요합니다. 또한 Visual Studio Code와 같은 코드 편집기가 컴퓨터에 설치되어 있어야 합니다.

단계 1: React 프로젝트 생성하기



React 프로젝트를 만들려면 다음 명령을 사용할 수 있어요:

```js
npx create-react-app stopwatch
```

단계 2: 컴포넌트 작성
이 단계에서는 "Stopwatch"라는 새 컴포넌트를 만들겠어요. "src" 폴더에 "Stopwatch.js"라는 새 파일을 만들어주세요. 이 파일에는 스톱워치의 로직이 포함되어요.

단계 3: 설명
useEffect 훅에서는 10밀리초마다 시간을 증가시키기 위해 setInterval을 사용해요. clearInterval 함수는 cleanup 함수에서 반환되어, 컴포넌트가 Unmount될 때 간격을 멈추게 돼요. 코드의 나머지 부분은 주석을 사용하여 설명되었어요.



단계 4: 스타일 추가하기
“src" 폴더에 “stopwatch.css"라는 새 파일을 만들어 아래의 CSS 코드를 파일 안에 추가하고, 그 후에 CSS 파일을 우리의 “Stopwatch.js" 파일에 import하세요.

단계 5: 스톱워치 import하기
App.js 파일에서 Stopwatch 컴포넌트를 import하고 return 문 안에 렌더링하세요.

질문이 있으시다면 LinkedIn을 통해 저에게 연락하실 수 있습니다.

아래에서 GitHub 저장소와 codesandbox에서의 데모를 찾으실 수 있습니다.