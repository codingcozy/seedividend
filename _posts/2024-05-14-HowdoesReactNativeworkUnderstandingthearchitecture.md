---
title: "React Native가 어떻게 작동하는지 이해하기 아키텍처에 대해"
description: ""
coverImage: "/assets/img/2024-05-14-HowdoesReactNativeworkUnderstandingthearchitecture_0.png"
date: 2024-05-14 10:24
ogImage: 
  url: /assets/img/2024-05-14-HowdoesReactNativeworkUnderstandingthearchitecture_0.png
tag: Tech
originalTitle: "How does React Native work? Understanding the architecture"
link: "https://medium.com/front-end-weekly/how-does-react-native-work-understanding-the-architecture-d9d714e402e0"
isUpdated: true
---




<img src="/assets/img/2024-05-14-ReactNativeArchitecture.png" />

# React Native이란 무엇인가요?

React Native은 React와 JavaScript를 사용하여 네이티브로 렌더링된 iOS 및 Android 앱을 작성할 수 있게 해주는 훌륭한 기술입니다.

이 방식에는 두 가지 주요 장점이 있습니다. 첫째로, 이는 웹 개발자들이 가장 인기 있는 JavaScript UI 라이브러리를 사용하여 네이티브한 느낌의 모바일 애플리케이션을 쉽게 작성할 수 있게 합니다.



둘째, React Native로 작성된 대부분의 코드는 iOS 및 Android 모두 개발을 간편하게 해주는 동시 개발을 간소화합니다.

# 그래서, 어떻게 작동하는 거죠?

React Native의 아이디어는 두 가지 별개의 부분인 JavaScript 코드와 Native 코드(안드로이드의 경우 Java/Kotlin, iOS의 경우 Objective-C/Swift)를 결합하여 함께 작동시키는 것입니다. 네이티브 코드는 기기에서 직접 실행되지만, JavaScript는 가상 머신이 필요합니다.

iOS 기기에는 C++로 작성된 내장 JavaScript 엔진인 JavaScriptCore가 내장되어 있어 JavaScript 코드를 컴파일하고 실행할 것입니다. 안드로이드 기기에는 내장된 JS 엔진이 없으므로 JavaScriptCore는 React Native 프레임워크와 함께 제공될 것입니다.



자바/Obj-C와 자바스크립트는 서로 다른 프로그래밍 언어이기 때문에 직접적으로 대화할 수 없습니다. 그러나 둘 모두 이해하는 형식의 데이터를 사용하여 간접적으로 대화할 수 있습니다. 그 형식이 JSON입니다. 이 통신은 Bridge라는 프로그램 세트에 의해 처리됩니다.

![](/assets/img/2024-05-14-HowdoesReactNativeworkUnderstandingthearchitecture_1.png)

React Native의 빌드 및 런타임

빌드 시간에, 자바 또는 Objective-C로 작성된 네이티브 코드는 Java 및 C++ 이진 파일로 컴파일되며, 자바스크립트 코드는 Metro 번들러를 사용하여 번들로 묶입니다. Metro는 웹 개발에서 사용되는 웹팩 번들러와 유사하게 작동하지만 React Native에 최적화되어 있습니다.



바이너리와 JS 번들은 최종적으로 대상 플랫폼용 실행 파일 내에 패킹될 것입니다.

런타임 시점에서, JavaScript 코드는 JavaScript 가상 머신에서 실행되고 네이티브 코드는 장치에서 직접 실행될 것입니다. 브릿지는 이 두 영역 사이에서 직렬화된 메시지를 전송할 것입니다. 이러한 메시지는 그 후 역직렬화되어 처리될 것입니다.

# React Native 스레드

사용자가 애플리케이션을 실행하면, 장치는 세 개의 주요 스레드와 필요에 따라 추가 백그라운드 스레드를 시작할 것입니다.



![React Native 아키텍처 이해: React Native가 어떻게 작동하는가](/assets/img/2024-05-14-HowdoesReactNativeworkUnderstandingthearchitecture_2.png)

- Main Thread — 이것은 애플리케이션이 실행될 기본 네이티브 스레드입니다. 디바이스 화면에 사용자 상호작용 및 UI 렌더링을 담당합니다. 모든 완전 네이티브 빌드 애플리케이션에서 실행 중인 동일한 스레드입니다.

- JavaScript Thread — 여기서 애플리케이션의 비즈니스 로직(즉, JavaScript 및 React 코드)이 실행됩니다.

- Shadow Thread — 이 스레드는 JavaScript 스레드와 함께 시작됩니다. 그 역할은 뷰의 위치를 계산하고 JS 스레드에 작성된 레이아웃 트리를 구성하는 것입니다. React Native는 네이티브 호스트가 이해할 수 있는 레이아웃 시스템으로 플렉스박스 기반의 레이아웃을 변환하는 Yoga 레이아웃 엔진을 활용합니다.



네이티브 모듈 스레드 - 어플리케이션이 플랫폼 API에 액세스해야 할 때, 예를 들어, 기기의 저장소와 같은 경우, 이 스레드에서 처리됩니다.

# React Native의 브릿지

브릿지는 의심의 여지 없이 React Native 아키텍처의 가장 중요한 부분입니다. 이를 통해 JavaScript 및 네이티브 레이어 사이에서 JSON 메시지를 통해 정보를 교환할 수 있습니다.

이 논리는 웹 응용 프로그램의 경우와 동일합니다. 여기서 프론트엔드 및 백엔드 레이어는 서로에 대해 알 필요가 없으며 (따라서 JavaScript 및 Python과 같은 다른 기술로 작성할 수 있음), 그들은 교환하는 정보를 이해하여 처리해야 합니다.



한 예시를 통해 알아보겠습니다.

![React Native Architecture](/assets/img/2024-05-14-HowdoesReactNativeworkUnderstandingthearchitecture_3.png)

- 네이티브 이벤트가 발생합니다. 예를 들어 터치나 스크롤 이벤트.
- 네이티브 측에서 필요한 모든 데이터와 함께 직렬화된 메시지가 브릿지를 통해 전송됩니다.
- JavaScript가 메시지를 수신하고 역직렬화하여 다음 단계를 결정합니다. 이 경우 아이콘을 변경합니다.
- JavaScript 레이어에서 요청된 작업에 관한 정보와 함께 메시지가 브릿지를 통해 전송됩니다.
- 네이티브 측이 메시지를 수신하고 역직렬화하여 뷰를 업데이트합니다.

# 브릿지의 문제



위에서 언급한대로, 브릿지는 비동기적이기 때문에 특정 경우에 문제가 발생할 수 있습니다.

브릿지를 통해 정보를 비동기적으로 교환하는 것은 매우 빠르지만 때로는 충분하지 않을 수 있으며 동기적인 방식이 더 나을 수 있습니다.

사용자가 신용카드 번호를 입력하는 입력 상자를 가정해 봅시다. 번호를 읽기 쉽게 하기 위해 매 네 자리마다 공백을 삽입하고 싶습니다. 그를 위해 사용자가 문자를 입력할 때마다 간단한 JS 함수를 작성하여 호출하면 됩니다.

![이미지](/assets/img/2024-05-14-HowdoesReactNativeworkUnderstandingthearchitecture_4.png)



이렇게 작동하는 것을 확인해 봅시다.

![React Native architecture](/assets/img/2024-05-14-HowdoesReactNativeworkUnderstandingthearchitecture_5.png)

네이티브 측에서 사용자가 입력한 문자에 대한 정보가 이미 렌더링된 이후에 올 것을 확인할 수 있습니다. 그런 다음, 저희의 JavaScript 코드가 그 변경 사항을 처리하여 필요한 경우 공백을 삽입하고 새 입력 상태를 설정하면, 이 정보가 다시 네이티브 측으로 전송되어 새 UI가 렌더링됩니다.

이로 인해 사용자가 텍스트를 서식 지정하고 업데이트하기 전에 볼 수 있는 상황이 발생할 수 있습니다(즉, “42578" 대신에 “4257 8"을 보여 줘야 할 때). 이 상황은 브릿지가 처리 중인 유일한 사항이라면, 상태의 이러한 점프는 눈에 띄지 않을 수 있습니다. 이 작업이 얼마나 빠르게 수행되는지 때문입니다. 그러나 동시에 많은 업데이트를 처리하는 것은 실생활의 다리와 같은 교통량을 초래할 수 있습니다. 복잡한 애플리케이션에서 문제가 될 수 있음을 상상해 볼 수 있습니다.



다른 문제는 브릿지의 정보 교환에 사용되는 JavaScript와 네이티브 영역 사이에 직렬화하고 역직렬화해야 한다는 것인데, 이는 시간이 많이 소요되며, 애플리케이션이 커질수록 차이가 발생할 수 있습니다.

이러한 문제를 해결하기 위해 React Native 팀은 JavaScript와 네이티브 코드를 더 잘 조합하는 효율적인 방법을 찾아 새 아키텍처에 JavaScript Interface를 도입했습니다.

# JSI — JavaScript Interface

0.68 버전부터 새 React Native 아키텍처를 사용할 수 있어 브릿지 메커니즘 대신 JavaScript Interface를 채택했습니다.



JSI(JavaScript Interface)는 모든 JavaScript 엔진에서 활용할 수 있는 통합된 경량 범용 레이어입니다. 이를 사용함으로써 우리는 네이티브 API에 직접적인 연결을 할 수 있게 됩니다.

하지만 어떻게 할까요?

C++은 네이티브 Java/Obj-C 메서드/객체들을 JavaScript에 "HostObject"를 통해 노출시킬 것입니다. JavaScript는 이 객체에 대한 참조를 보유하여 Java/Obj-C API에 직접적으로 액세스할 수 있게 됩니다.

이 작업은 동일한 스레드에서 동기적으로 수행될 수도 있고 새로운 스레드를 생성하여 비동기적으로 처리될 수도 있습니다.



이 기능은 React Native를 새로운 차원으로 끌어 올려 주며, 제공하는 많은 장점 때문에 곧 널리 받아들여질 것입니다.

이 주제를 보다 자세히 살펴보고 싶다면, Parashuram N의 새로운 아키텍처 프레젠테이션을 시청하고 공식 React Native 문서를 참고해보시기를 권장합니다.

# 결론

지금쯤 React Native가 어떻게 작동하는지와 그 아키텍처가 어떻게 구성되어 있는지에 대한 간략한 개요를 얻었을 것입니다. 이 글이 도움이 되었기를 바라며, React Native 세계를 더 깊이 탐험하길 격려합니다.