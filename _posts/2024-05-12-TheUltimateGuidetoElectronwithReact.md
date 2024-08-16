---
title: "Electron과 React를 활용한 최종 가이드"
description: ""
coverImage: "/assets/img/2024-05-12-TheUltimateGuidetoElectronwithReact_0.png"
date: 2024-05-12 20:44
ogImage: 
  url: /assets/img/2024-05-12-TheUltimateGuidetoElectronwithReact_0.png
tag: Tech
originalTitle: "The Ultimate Guide to Electron with React"
link: "https://medium.com/folkdevelopers/the-ultimate-guide-to-electron-with-react-8df8d73f4c97"
isUpdated: true
---




![The Ultimate Guide to Electron with React](/assets/img/2024-05-12-TheUltimateGuidetoElectronwithReact_0.png)

가장 포괄적인 크로스 플랫폼 데스크톱 앱 개발 여정에 오신 것을 환영합니다.

본문에서는 Electron과 React의 강력한 기능을 어떻게 구현하는지 배워보겠습니다. 이 글을 끝까지 읽으면 다음과 같은 구현 방법을 마스터하게 될 것입니다:

- 데스크톱 앱 화면을 만드는 방법
- Electron에서 react-router-dom을 사용하여 라우트를 구현하는 방법
- React 컴포넌트에서 remote 모듈을 사용해 네이티브 호출을 하는 방법
- React 컴포넌트 내에서 OS별 다이얼로그를 트리거하는 방법
- Electron에서 IPC(Inter-process Communication)하는 방법



<img src="https://miro.medium.com/v2/resize:fit:940/1*jkoCIr04_tZ6i8fACZQ5dQ.gif" />

# 일렉트론을 사용하여 제작된 주요 앱들

<img src="https://miro.medium.com/v2/resize:fit:1400/1*VwPQAQ_7t0Iw666IzEzdQw.gif" />

# 일렉트론? 물리학을 배우는 거면 나는 물러갈래요!



일렉트론은 크로미움 엔진에서 작동하는 견고한 다중 프로세스 아키텍처 프레임워크입니다. 이는 무거운 I/O 및 CPU 바운드 작업이 UI(주 프로세스)를 차단하지 않도록 새 스레드에 넣어 처리한다는 것을 보장합니다.

일렉트론은 최신 버전의 크롬을 함께 제공합니다. 그 강력한 기능을 활용해 애플리케이션 창(렌더러 프로세스)에서 무거운 계산을 조율할 수 있어 앱이 60fps로 실행될 수 있습니다.

# 잠깐! 주 프로세스가 뭔가요? 무서워 보이는데요!

주 프로세스는 일렉트론 앱의 주요 부분입니다. 여러 개의 하위 프로세스(렌더러 프로세스라고도 함)를 생성할 수 있습니다. 어떻게 할까요? 곧 알아볼게요.



React 앱을 Electron과 함께 빠르게 설정해보겠습니다.

node 및 npm이 설치되어 있다고 가정합니다. electron-app이라는 이름의 폴더를 만들고, 즐겨 사용하는 코드 편집기로 해당 폴더를 열어주세요.

터미널을 열고 npx create-react-app . 명령어를 실행해주세요. 여기서 마지막에 점(.)을 붙여주면 현재 폴더에 React 앱이 생성됩니다.

public 폴더 아래에 main.js라는 파일을 생성해주세요.




![이미지](/assets/img/2024-05-12-TheUltimateGuidetoElectronwithReact_1.png)

다음 코드를 main.js 파일에 복사하세요. 나중에 이 코드가 무엇을 하는지 돌아와서 설명하겠습니다.

이제 package.json 파일을 엽니다.

다음과 같이 main.js 파일을 가리키는 경로를 가진 main 엔트리를 추가하세요.



```js
// 이 줄에 쉼표를 추가하는 것을 잊지 마세요
"private":true,
// 다음 줄을 추가하세요
"main":"public/main.js"
```

이제 Electron을 설치할 준비가 되었습니다. 터미널을 열고 다음을 실행하세요:

```js
npm i electron
```

이제 package.json 파일의 scripts 섹션에 리액트 앱을 Electron에서 실행할 수 있는 항목을 추가해봅시다.



package.json 파일의 scripts 섹션에 아래와 같이 electron-dev 항목을 추가하세요. 이 항목의 값은 electron이어야 합니다.

만약 모든 단계를 올바르게 따랐다면, package.json 파일은 아래와 같이 보여야 합니다.

이제 electron 앱을 시작할 시간입니다. Electron은 react-app을 에뮬레이트하기 때문에 우선 react-app이 실행되어야 합니다.



터미널 창을 열고 다음 명령어를 실행해주세요:

```js
npm start
```

브라우저에서 리액트 앱이 실행되면, 다른 터미널을 열고 다음 명령어를 실행해주세요:

```js
npm run electron-dev
```



네이티브 데스크탑 창에서 첫 번째 일렉트론 앱이 실행되고 있어요!

![이미지](/assets/img/2024-05-12-TheUltimateGuidetoElectronwithReact_3.png)

# 메인 프로세스

일렉트론 앱은 메인 프로세스를 가지고 있어요. 이 프로세스는 BrowserWindows를 생성하여 GUI를 만들어요. 각 BrowserWindow는 독립적인 랜더러 프로세스를 실행하며, BrowserWindow가 닫힐 때 파괴돼요. npm run electron-dev (내부적으로 electron .를 실행) 명령어를 실행하면, 메인 프로세스가 시작되고 일렉트론 환경을 초기화해요.



다음으로, 주 프로세스는 package.json 파일에서 주요 항목을 찾아 주 파일을 실행합니다.

main.js 파일에서 Electron은 ready 이벤트가 이미 발생했는지 확인합니다.

whenReady() 함수는 ready 이벤트가 발생했을 때에만 이행된 프로미스를 반환합니다.

```js
app.whenReady().then(createWindow)
```



만약 whenReady() 함수가 완료된 프로미스를 반환하면, createWindow() 함수가 실행됩니다. createWindow() 함수는 새 BrowserWindow 인스턴스를 생성하고 해당 창 안에 웹페이지를 로드합니다.

# 렌더러 프로세스

각 렌더러 프로세스는 그 안에서 실행 중인 웹페이지에 대해 관심을 갖습니다. BrowserWindow는 HTML 파일을 찾습니다. 우리의 경우, 리액트 앱은 포트 3000에서 실행 중인 index.html 파일을 가지고 있습니다. loadURL() 함수에 html 파일의 URL을 전달하면, 일렉트론은 BrowserWindow에서 해당 파일을 로드합니다.

```js
win.loadURL('http://localhost:3000');
```



만약 모든 BrowserWindows가 닫혔을 때 앱 종료 작업을 알리면, window-all-closed 이벤트는 마지막 BrowserWindow 인스턴스가 닫힌 직후 정확히 발생합니다. app 모듈의 quit() 함수는 앱을 종료합니다.

```js
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit()
   }
})
```

그러나 macOS(darwin)에서는 사용자가 명시적으로 종료할 때까지 앱이 dock에서 활성 상태로 남아있는 것이 일반적이므로, 우리는 dock에서 앱을 계속 활성 상태로 유지할 수 있습니다.

# 원격 모듈



리모트 모듈은 랜더러 프로세스가 일반적으로 주 프로세스에서만 사용할 수 있는 API에 액세스할 수 있도록 합니다. 랜더러 프로세스에서 이러한 API에 액세스하려면 리모트 모듈이 주 프로세스와 통신하기 위해 내부 IPC 채널을 사용합니다. 이 글에서는 나중에 IPC에 대해 자세히 다룰 것입니다. 리모트 모듈을 사용하면 인터프로세스 메시지를 명시적으로 보내지 않고도 GUI 모듈에 액세스할 수 있습니다.

중요한 점은 랜더러 프로세스에서 GUI 모듈에 액세스할 수 있지만, 종종 모듈이 랜더러 프로세스에서 생성된 것으로 오해되는 경우가 있습니다. 실제로는 객체가 주 프로세스에서 생성되고 랜더러 프로세스와 원격으로 공유됩니다.

```js
import React from 'react';
// React 컴포넌트에서 리모트 모듈을 가져오는 방법은?
const electron = window.require('electron');
const remote = electron.remote
const {BrowserWindow, dialog, Menu} = remote
```

`enableRemoteModule` 옵션을 `true`로 설정하여 리모트 모듈을 활성화하세요.



# BrowserWindow

브라우저 창( BrowserWindow)이 무엇인지 그리고 어떤 일을 하는지 이미 살펴보았습니다. 이제 BrowserWindow의 속성을 살펴보겠습니다.

## BrowserWindow를 어떻게 생성할까요?

아래 줄은 빈 BrowserWindow를 생성합니다.



```js
// 너비와 높이는 기본값으로 800 x 600으로 설정됩니다
const window = new BrowserWindow()
```

loadURL() 함수를 사용하여 URL에서 HTML 파일을 로드하는 방법을 살펴보았습니다. 그러나 제품 환경에서는 가장 필요한 파일/모듈을 번들로 묶습니다. loadFile() 함수는 자산에서 HTML 파일을 로드하는 데 도움이 됩니다.

다음은 실제 모습입니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*T1mZlyoO9B51rPlDSdf1kQ.gif" />




## 창 크기 설정

`BrowserWindow API`는 BrowserWindow의 크기를 설정하는 속성을 제공합니다.

```js
function createWindow () {
const windowOne = new BrowserWindow({width:400,height:400})
}
```

위 예시는 400x400 크기의 BrowserWindow을 만듭니다. 그러나 이 크기는 끝없이 늘어나는 현상을 초래할 수 있어 예상치 못한 동작을 일으킬 수 있습니다.



마지막에 표시된 img 요소를 Markdown 형식으로 바꿔주시면 다음과 같이 됩니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*KtAHl31wk38Tf89ksEFdrA.gif)



## 사용자 정의 제목

아래에 표시된 것처럼 명시적으로 정의되지 않은 경우, BrowserWindow의 제목은 package.json 파일에 정의된 앱 이름과 동일합니다. 또는 HTML 파일에서 정의된 제목이 있으면 해당 제목이 제목으로 사용됩니다.

```js
function createWindow () {
 const windowOne = new BrowserWindow({
           title:"My First App"
 })
}
```

## 프레임 없는 BrowserWindow을 생성하는 방법?



`frame` 속성을 `false`로 설정하면 BrowserWindow이 메뉴, 툴바, 닫기 및 최소화 버튼과 같은 네이티브 창의 일부를 제거합니다.

```js
function createWindow () {
 const windowOne = new BrowserWindow({
           title:"My First App",
           frame:false
 })
}
```

<img src="/assets/img/2024-05-12-TheUltimateGuidetoElectronwithReact_4.png" />

## 부모 및 자식 창 생성



부모 속성이 BrowserWindow에 정의된 경우 해당 BrowserWindow은 부모 창으로 할당된 BrowserWindow의 자식 창이 됩니다.

```js
function createWindow () {
  let heyparent = new BrowserWindow()
  let heychild = new BrowserWindow({ parent: heyparent })
  heychild.show()
  heyparent.show()
}
```

자식 창은 항상 부모 창 위에 유지됩니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*snqCjVLVAygSiP-B3qr0uQ.gif)



## 모달 창

부모 창이 자식 창이 나타날 때 비활성화되도록 하는 방법은 무엇인가요? 바로 모달 창이 하는 역할입니다. 모달 창을 만들려면 부모와 모달 속성을 모두 설정해야 합니다.

```js
const parent = new BrowserWindow()
const child = new BrowserWindow({ parent: top, modal: true})
child.loadURL('https://github.com')
```

위 방법으로 모달 창을 성공적으로 만들지만, 일부 브라우저에서는 약간의 지연이 발생할 수 있습니다. 그래서 권장하는 방법은 show 속성을 false로 설정하는 것입니다.



이제 자식 창이 렌더링되자마자 show 함수를 실행하여 표시하십시오. 그러나 페이지가 렌더링을 완료했을 때 어떻게 감지할까요?

웹페이지가 렌더링된 즉시 ready-to-show 이벤트가 발생합니다.

ready-to-show 이벤트가 발생하면 지연 없이 show() 함수를 사용하여 웹페이지를 표시할 수 있습니다.

```js
const parent = new BrowserWindow()
// 권장됨
const child = new BrowserWindow({ 
    parent: parent,
    modal: true, 
    show: false
 })
child.loadURL('https://github.com')
// 파일이 렌더링된 즉시 표시
child.once('ready-to-show', () => {   child.show() })
```



<img src="https://miro.medium.com/v2/resize:fit:1400/1*Gv3oYJmHGXrzP1_cnH4JKQ.gif" />

## 메뉴바를 제거하거나 숨기는 방법은?

removeMenu() 함수를 호출하거나 setMenu() 함수를 사용하여 Menu를 null로 설정하십시오.

다음은 메뉴 바가 제거된 BrowserWindow의 모습입니다.




![이미지](/assets/img/2024-05-12-TheUltimateGuidetoElectronwithReact_5.png)

## React 컴포넌트에서 BrowserWindow 열기

해당 컴포넌트에는 클릭 시 BrowserWindow를 열어주는 버튼이 있습니다.

다음은 그 모습입니다.



![image](https://miro.medium.com/v2/resize:fit:1400/1*rtOf3JpMRYHlptZCN7g4bg.gif)

# Electron에서 React 컴포넌트에서 대화 상자를 열려면?

세 가지 주요 다이얼로그에 대해 설명합니다. React 컴포넌트에서 각각의 버튼 클릭으로 각각을 트리거할 것입니다.

## showErrorBox()



다이얼로그를 표시하는 함수입니다. 두 개의 매개변수, 타이틀 (문자열)과 내용 (문자열)을 사용합니다. 시작 시 에러를 보고하는 데 사용됩니다. 따라서 준비 이벤트 이전에 안전하게 사용할 수 있습니다.

```js
import React from 'react';
const electron = window.require('electron');
const remote = electron.remote
const {dialog} = remote
const App = () =>{
return(
  <button onClick={()=>{
   dialog.showErrorBox('Error Box','Fatal Error')
  }>Show Error Box</button>
 )
}
export default App
```

작동 확인해보세요

![image](https://miro.medium.com/v2/resize:fit:1400/1*ntV47YaW4i6exyZ8pTOakg.gif)



## showOpenDialog()

`showOpenDialog()` 함수는 파일 선택기 또는 디렉터리 선택기 역할을 합니다. properties 배열을 설정하여 대화상자의 동작을 정의할 수 있습니다. 이 함수는 다음과 같은 속성을 갖는 객체를 반환하는 Promise를 반환합니다:

- cancelled : Boolean — 대화상자가 취소되었는지 여부를 나타냅니다.
- filePaths: Array — 선택된 파일 경로의 배열입니다.


| Title | Message | Filters |
| --- | --- | --- |
| 'Title' | 'Message' | Images: jpg, png, gif |
| | | Movies: mkv, avi, mp4 |
| | | Custom File Type: as |
| | | All Files: * |

이렇게 생겼어요.

![image](https://miro.medium.com/v2/resize:fit:1400/1*3qDlBC3KOU27v_sv-vaPdg.gif)




## showMessageBox()

지정된 유형에 따라 다른 종류의 대화 상자를 표시합니다. 이 대화 상자 함수는 또한 버튼, 체크박스 등을 사용합니다. 대화 상자가 닫힐 때까지 프로세스를 차단합니다. 이 함수는 다음 속성을 포함하는 객체로 해결되는 Promise를 반환합니다:

response: 클릭된 버튼의 인덱스

checkboxChecked: 부울값 — 체크박스가 선택되었는지 여부



아래는 가장 많이 사용되는 매개변수와 함께 다양한 유형의 메시지 상자를 보여주는 데모입니다.

이렇게 보입니다.

![Message Boxes](https://miro.medium.com/v2/resize:fit:1400/1*5kfsVcdtp854xZJmIMc2dw.gif)

# Electron에서 사용자 정의 메뉴를 만드는 방법




일반적으로는 메뉴를 준비 이벤트에서 설정하는 것이 가장 좋습니다. 그러나 먼저 버튼 클릭에서 리액트 컴포넌트를 통해 설정해 봅시다.

## buildFromTemplate

buildFromTemplate 함수는 옵션(템플릿) 배열을 가져와 Menu 인스턴스를 반환합니다. 각 옵션은 다음과 같은 매개변수를 가진 객체입니다: label: string, click: function, type: string, submenu: array(options) 및 role: name-of-a-role.

```js
// option:object
{
    label: 'options',
    submenu: [
        { role: 'selectall' },
        { role: 'reload' }
    ]
}
```



## setApplicationMenu

매개변수로 Menu 인스턴스를 가져와 각 창의 상위 메뉴로 설정합니다.

실제 동작을 확인해보세요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*XNDUagIYg7RZrIWvG1njyQ.gif)



### 역할, 구분자 및 하위 메뉴 속성이 있는 메뉴

다음 예제에서는 구분자, 하위 메뉴 및 역할이 있는 메뉴를 살펴볼 것입니다.

다음과 같이 보입니다.

![menu](https://miro.medium.com/v2/resize:fit:1400/1*JOHdFj-znvZA7ZirWNTJpg.gif)



# 일렉트론과 리액트에서 라우터 구현하는 방법

## 왜 BrowserRouter를 사용하지 않는가?

일반적으로 리액트 앱에서는 라우터를 BrowserRouter 컴포넌트로 감싸서 사용합니다. BrowserRouter 컴포넌트는 요청 기반 환경에 가장 적합한 라우팅 메커니즘을 구현합니다. 다음은 리액트 앱에서 라우팅을 보여주는 간단한 예제입니다.

BrowserRouter 컴포넌트는 요청 기반 프레임워크인 리액트와 잘 작동하지만, 일렉트론과 같은 파일 기반 환경에서는 전혀 작동하지 않을 수 있습니다. 그러나 react-router-dom 패키지는 모든 라우팅 케이스를 처리하기 위해 제공됩니다.



## 해시 라우터가 도와줍니다!

리액트 라우터 돔 패키지에는 브라우저 라우터처럼 파일 기반 환경에서 작동하는 해시 라우터 컴포넌트가 포함되어 있습니다.

해시 라우터 컴포넌트를 사용한 루트는 브라우저 라우터와 같은 방식으로 설정할 수 있습니다. 브라우저 라우터를 기반으로 한 구현에서 변경해야 할 것은 브라우저 라우터 컴포넌트를 해시 라우터 컴포넌트로 바꾸는 것뿐입니다. 여기에는 일렉트론에서 작동하도록 수정된 브라우저 라우터 기반 라우트가 있습니다.

실제로 어떻게 동작하는지 확인해 보겠습니다.



<img src="https://miro.medium.com/v2/resize:fit:1400/1*Gjv4nMUXuBiBEONKC9kXog.gif" />

좋아요! 지금까지 BrowserWindows를 생성/수정하는 방법과 페이지를 실행하여 특정 용도에 맞는 OS별 대화 상자를 트리거하고, HashRouter를 사용하여 라우트를 설정하고, main 프로세스에서만 액세스할 수 있는 렌더러 프로세스의 모듈에 액세스하는 방법에 대해 배웠어요. 이제 약간 더 깊게 파고들어 Electron 프레임워크의 핵심인 IPC를 이해해봐요!

# 프로세스 간 통신(IPC)

우리는 메인 프로세스와 렌더러 프로세스에 대해 배웠어요.



일렉트론은 메인 프로세스가 BrowserWindows를 생성/처리해야 하며, 각 창은 자체 랜더러 프로세스를 운영하여 웹페이지를 실행합니다. 그래서 랜더러 프로세스가 네이티브 API를 활용해 GUI를 변경해야 할 경우, 일렉트론에서 필요한 네이티브 모듈을 직접 가져와 필요한대로 호출할 수 있을 것 같지만, 그렇지 않습니다!

랜더러 프로세스는 서드파티 라이브러리/웹페이지를 실행하기 때문에, 네이티브 GUI API를 호출하는 것은 치명적인 오류가 될 수 있으며 데이터 누출로 이어질 수 있습니다.

웹페이지에서 GUI 작업을 수행해야 하는 경우, 랜더러 프로세스는 메인 프로세스와 통신해야 하며 메인 프로세스는 네이티브 작업 요청이 유효한지 확인한 후에만 처리해야 합니다.

메인 프로세스와 랜더러 프로세스 간의 통신은 요구 사항에 따라 동기적이거나 비동기적일 수 있습니다.



![이미지](/assets/img/2024-05-12-TheUltimateGuidetoElectronwithReact_6.png)

렌더러 프로세스는 특정 채널로 메인 프로세스에 요청을 보내서 일부 인수와 함께 네이티브 작업을 실행하도록 요청하고, 메인 프로세스는 웹페이지에서 해당 인수와 함께 네이티브 API에서 작업을 비동기적으로 실행하여 요청을 수행합니다.

## on() 및 once()

ipcMain과 ipcRenderer 모듈 모두 특정 채널에서 이벤트를 수신하기 위해 'on' 및 'once' 메소드를 가지고 있습니다.



```js
// channel: 문자열 및 이벤트 및 인수를 함수 매개변수로 사용하는 콜백(listener)
// main 프로세스
ipcMain.on(channel, listener)
ipcMain.once(channel, listener)
// renderer 프로세스
ipcRenderer.on(channel, listener) 
ipcRenderer.once(channel, listener)
```

특정 채널로 새 메시지가 도착하면 콜백(listener)이 전달된 매개변수와 함께 실행됩니다.

'once' 함수도 동일한 방식으로 작동하지만, 한 번 이벤트를 청취한 후에는 제거됩니다.

## send()




ipcRenderer 모듈에는 지정된 채널로 메시지를 보내는 'send' 메서드가 있습니다.

```js
// channel:string(채널 이름),
// 채널을 통해 보낼 args
// 주 프로세스로.
ipcRenderer.send(channel, ...args)
```

## removeListener() 및 removeAllListeners()

주 프로세스에서 여러 렌더러 프로세스가 동일한 채널을 구독하는 상황이 있는데, 성능을 높이기 위해 한 번에 하나 이상의 청취자를 제거하고 싶을 수 있습니다. ipcMain 모듈에는 지정된 청취자를 제거하는 removeListener 및 채널에서 모든 청취자를 제거하는 removeAllListeners 메서드가 포함되어 있습니다.



```js
// 특정 채널에서 특정 청취자를 제거합니다
removeListener(channel, listener)
// 채널에서 모든 청취자를 제거합니다
removeAllListeners([channel])
```

## 비동기적 메시지 교환

렌더러 프로세스에서 네이티브 API를 호출하려면 주로 메인 프로세스에 IPC 호출을 수행해야 합니다. 렌더러 프로세스에서는 네이티브 API에 직접 액세스할 수 없기 때문입니다. 그런데 요청된 네이티브 작업이 무거운 작업이라면 어떨까요? 그렇다면 IPC 호출이 무거운 네이티브 작업의 실행이 완료될 때까지 UI를 차단하게 될 것입니다. 이를 해결하기 위해 비차단적인 비동기 전송 함수가 있습니다.

메인 프로세스는 요청을 수행한 후 일부 메타데이터와 함께 비동기적으로 응답을 보낼 수도 있습니다.



## 동기 메시지 교환

일부 사용자 활동이 UI에 즉각적인 변경을 필요로 할 수있는 상황이 발생할 수 있습니다. UI에서의 모든 이러한 긴급 트리거에 대해 동기 방식의 교환을 사용할 수 있습니다.

ipcRenderer 모듈에는 'sendSync' 함수가 함께 제공되며 'send' 함수와 완전히 동일하게 작동하지만 동기적으로 작동합니다. 이는 동기적으로 보낸 모든 요청이 리소스 활용 면에서 가볍게 유지되어야 한다는 것을 의미하기도 합니다. 그렇지 않으면 UI가 원활하게 렌더링되는 것을 방해할 수 있습니다.

지금까지 학습한 내용을 React에서 구현해 보겠습니다.



# 리액트 컴포넌트에서 IPC를 확인해 봅시다

리액트 컴포넌트에서 버튼을 클릭하여 주 프로세스에 메시지를 동기적 및 비동기적으로 보낼 것입니다.

App 컴포넌트에 두 개의 버튼을 생성해봅시다. 하나는 동기적으로 다른 하나는 비동기적으로 주 프로세스에 문자열을 보내기 위한 것입니다.

## App.js



main.js 파일에서 ‘anything-synchronous’ 및 ‘anything-asynchronous’ 채널에서 보낸 메시지를 수신하기 위한 ‘on’ 함수를 생성하세요.

## main.js

다음은 예시입니다.

![예시](https://miro.medium.com/v2/resize:fit:1400/1*zWv0lrOCxMyjfEqsPQRPKw.gif)



## 메인 프로세스에서(Renderer 프로세스(앱 컴포넌트)에 동기적 및 비동기적으로 응답을 보내 봅시다.

## 비동기적 응답

비동기적 메시지에 대한 응답을 보내려면 'event.reply' 메서드를 사용합니다.

비동기적 응답은 메타데이터가 원시 요청을 하는 메인 채널을 막지 않도록 다른 채널로 보내집니다.



main.js

App.js

주된 프로세스에 의해 다른 채널로 응답이 전송되므로, 랜더러 프로세스는 응답을 수락하기 위해 이를 수신 대기해야 합니다.

'arg' 매개변수로 전달된 응답을 캐치할 리스너(callback)와 함께 'on' 메서드가 사용됩니다.



## 동기 응답

동기적으로 응답을 보내려면 응답으로 전달 될 데이터를 'event.returnValue'로 설정하십시오.

main.js

App.js



렌더러 프로세스인 App 컴포넌트에서 이를 잡는 방법은 다음과 같습니다.

다음과 같이 보일 것입니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*L33_yu2Npjsi0yEDuiO9Fw.gif)

왼쪽에는 App 컴포넌트를 실행하는 렌더러 프로세스가 있고, 오른쪽에는 메인 프로세스가 있습니다. 브라우저 콘솔에서는 렌더러 프로세스가 보낸 비동기 및 동기 메시지에 대한 메인 프로세스의 응답 메시지를 볼 수 있습니다.



## 놀라운 소식! 좋은 소식이 있어요!

마이크로소프트는 빠른 WASM(WebAssembly)을 활용한 .NET 기반 크로스 플랫폼 응용프로그램 개발 프레임워크 BLAZOR를 Electron에 구현하려고 노력하고 있습니다. 이는 코드 베이스를 거의 변경하지 않고 Electron으로 만들어진 앱들을 대규모로 성능을 향상시킬 것입니다.

시간 내어 주셔서 정말 감사합니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*rHuMSNiP_9-VY9MwDXrzuA.gif)



미래에 대한 모든 좋은 일들이 가득하길 바래요!

![이미지](https://miro.medium.com/v2/resize:fit:1000/1*UX3p7WMPuQWnhcSw9EeVfQ.gif)