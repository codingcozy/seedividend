---
title: "자바스크립트에서 외부에서 프로미스 해결하기 실용적인 사용 예시"
description: ""
coverImage: "/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_0.png"
date: 2024-05-12 23:51
ogImage: 
  url: /assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_0.png
tag: Tech
originalTitle: "Resolve a Promise from outside in JavaScript: practical use cases"
link: "https://medium.com/coding-beauty/javascript-resolve-promise-from-outside-e6c6f64c6717"
isUpdated: true
---





![Image](/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_0.png)

It's one of those cool things you can do in JavaScript that's immensely powerful in the real world.

# Powerful practical use cases

## Action (A) waiting for another (B)



A는 진행 중입니다만 사용자는 B를 하고 싶지만 A가 먼저 발생해야 합니다.

예시: 사용자가 게시물을 생성, 저장 및 게시할 수 있는 소셜 앱. 마치 Medium처럼.

![이미지1](/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_1.png)

![이미지2](/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_2.png)



만약 사용자가 저장 중에 게시물을 발행하길 원한다면 어떻게 할까요?

해결책: 발행되기 전에 게시물이 저장되도록 확인하세요.

![이미지](/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_3.png)

![이미지](https://miro.medium.com/v2/resize:fit:588/0*u7Littlul1VVDuUU.gif)



이 논리를 Deffered 클래스로 추상화하면 더욱 좋아집니다:

![이미지](/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_4.png)

리팩토링✅:

![이미지](/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_5.png)



그리고 이전과 정확히 같이 작동합니다:

![image](https://miro.medium.com/v2/resize:fit:588/0*dv5w4HYCmh1giS5w.gif)

Deferred는 훨씬 깔끔합니다. 그래서 우리는 ts-deferred, deferred, promise-deferred와 같은 수많은 NPM 라이브러리를 가지고 있습니다.

![image](/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_6.png)



## 이벤트 스트림 Promisifying하기

이건 내가 여러 번 사용해 본 멋진 설정이야.

실제로 이벤트 스트림이 발생할 때 대기하는 비동기 작업을 수행하는 것입니다. 내부적으로:

![이미지](/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_7.png)



# 마무리

외부에서 약속을 이행하는 것은 강력한 패턴을 발휘합니다.

사용자 조치부터 이벤트 스트림까지 깔끔하고 유연한 코드를 유지합니다. 그리고 ts-deferred와 같은 라이브러리를 사용하면 더 나은 처리가 가능합니다.

# 자바스크립트가 하는 모든 미친 일



알고 있던 것이 모두라 생각했을 때 새로운 것을 알려드릴게요.
자바스크립트의 세심한 주의사항과 잘 알려지지 않은 부분들을 담은 Every Crazy Thing JavaScript Does 가이드로 고통스러운 버그를 피하고 소중한 시간을 절약하세요.

오늘 여기서 무료로 받아보세요.

![이미지](/assets/img/2024-05-12-ResolveaPromisefromoutsideinJavaScriptpracticalusecases_8.png)