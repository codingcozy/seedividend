---
title: "React Native 웹 뷰와 React 앱 간의 통신"
description: ""
coverImage: "/assets/img/2024-05-14-CommunicationbetweenReactNativewebviewandReactapp_0.png"
date: 2024-05-14 11:40
ogImage: 
  url: /assets/img/2024-05-14-CommunicationbetweenReactNativewebviewandReactapp_0.png
tag: Tech
originalTitle: "Communication between React Native web view and React app"
link: "https://medium.com/@svbala99/communication-between-react-native-web-view-and-react-app-c0fb0af7e5a6"
---


이것은 React Native 웹 뷰와 React 응용 프로그램 간의 데이터 통신 방법 중 하나입니다.

![CommunicationbetweenReactNativewebviewandReactapp](/assets/img/2024-05-14-CommunicationbetweenReactNativewebviewandReactapp_0.png)

React Native 앱의 웹 뷰와 별도로 호스팅된 React 애플리케이션 간의 통신 방법은 여러 가지가 있을 수 있습니다. 저는 이러한 요구사항을 마주했고, 여기에 적용하기로 결정한 해결책을 공유하려 합니다.

먼저, React 응용 프로그램과 React Native 응용 프로그램의 기본 구현을 살펴보겠습니다.



간단한 React 어플리케이션:-

- App.js의 useEffect() 안에 원시 이벤트를 수신하는 이벤트 리스너를 추가합니다. 이는 HTML의 "window" 객체 내에 존재합니다. EventTarget 인터페이스의 addEventListener() 메소드는 특정 이벤트가 대상에 전달될 때마다 호출될 함수를 설정합니다. 참고: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- 첨부한 리스너 함수 안에서는 React 네이티브 또는 HTML 문서로 전송되는 외부 소스에서 찾을 수 있는 데이터가 포함된 nativeEvent 객체를 얻습니다.
- React에서 React 네이티브로 메시지를 보내려면 window.ReactNativeWebView.postMessage() 메소드를 사용할 수 있습니다. 추가적인 임포트나 패키지가 필요하지 않습니다. 이는 HTML의 "window" 객체에 내장되어 있습니다. window.postMessage() 메소드는 Window 객체 간 안전하게 교차 출처 통신을 가능하게 합니다. 예를 들어 페이지와 생성된 팝업 간 또는 페이지와 내장된 iframe 간의 통신입니다. 참고: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

<img src="/assets/img/2024-05-14-CommunicationbetweenReactNativewebviewandReactapp_1.png" />

간단한 React 네이티브 어플리케이션과 웹 뷰:-



- 어떤 npm 패키지에서 간단한 웹뷰를 생성합니다.
- 웹사이트에서 메시지를 받으려면 웹뷰의 onMessage = '' 속성을 가리키는 메소드를 첨부합니다. 해당 함수에서 들어오는 메시지를 처리할 수 있습니다.
- React로 메시지를 보내려면 useRef()를 사용하여 참조를 가져와야 합니다. ref = 'webViewRef'와 함께 첨부합니다.
- webViewRef.current.postMessage()를 사용하여 React 웹사이트로 메시지를 보낼 수 있습니다.
- componentDidMount() 시점에 뭔가를 트리거하려면, webview의 onLoadEnd() 속성에 필요한 메소드를 추가하여 할 수 있습니다. 이것은 웹뷰가 웹사이트를 로드했을 때 콜백을 트리거합니다.
- 최신 버전의 userAgents를 언급했습니다. 또한 domStorageEnabled, cacheEnabled, javaScriptEnabled 등과 같은 프롭스를 활성화하여 React Native 스크린의 성능이 향상되도록 했습니다.
- 사이트가 로드될 때까지 사용자 정의 로더를 표시할 수도 있습니다.

[이미지 바로가기](/assets/img/2024-05-14-CommunicationbetweenReactNativewebviewandReactapp_2.png)

저의 Github 저장소 공유합니다: [react-zoom](https://github.com/svbala99/react-zoom) 및 [zoomsdk-sign-generator-express](https://github.com/svbala99/zoomsdk-sign-generator-express)

이 저장소들은 React Native에서 웹뷰를 설정할 수 있게 해주고, 해당 웹뷰에서 zoom 미팅을 호스팅할 수 있게 합니다. 두 번째 저장소는 안전한 서명을 생성하는 데 도움이 됩니다. 이는 공식 Zoom에서 지시한 대로 입니다.



누군가에게 도움이 되면 좋겣습니다. 읽어 주셔서 감사합니다. 또 다른 흥미로운 글로 돌아오겠습니다. 건강하세요, 챙기세요!!!