---
title: "Dagger를 사용하여 컴포저블을 주입시키되, 그것을 잃지 않는 방법"
description: ""
coverImage: "/assets/img/2024-05-15-InjectingComposableswithDaggerwithoutlosingit_0.png"
date: 2024-05-15 15:54
ogImage: 
  url: /assets/img/2024-05-15-InjectingComposableswithDaggerwithoutlosingit_0.png
tag: Tech
originalTitle: "Injecting Composables with Dagger without losing it"
link: "https://medium.com/proandroiddev/injecting-composables-with-dagger-without-losing-it-bcf5a6988229"
isUpdated: true
---





![Injecting Composables with Dagger without losing it](/assets/img/2024-05-15-InjectingComposableswithDaggerwithoutlosingit_0.png)

Everyone is using Hilt/Koin or some other fancy DI framework that just works™.

In this house, we still use plain Dagger2. It’s… not going great.

Consider the predicament of a composable that can only work with certain parameters:




가끔 composable들이 호출자에게 너무 많은 것을 요구하는 경우가 있어요.

이 때는 아마도 이미 너무 깊이 들어간 상황일 것이고, 이를 바꾸려면 다른 10가지 것들을 깨뜨려야 할 수도 있어요.

## 정리

이 게시물의 목표는 독립적인 composable을 만드는 방법을 찾는 것입니다:



- 자체 Dagger 컴포넌트를 생성합니다.
- 자신을 주입합니다.
- 사용자 정의 팩토리로 ViewModel을 빌드합니다.
- ViewModels 및 Compose에 대한 자세한 정보는 이 미미/블로그를 확인해주세요.

## 요약

## 시작점

Dagger2로 활동/프래그먼트를 일반적으로 사용합니다.



- 자체 Dagger 컴포넌트를 빌드합니다
- 또는 애플리케이션 컴포넌트에서 일부 의존성을 가져옵니다

그런 다음 의존성을 파라미터로 컴포저블에 아래로 전달할 것입니다 (현재 그대로 또는 함수를 통해):

정보는 CompositionLocals로도 전달할 수 있습니다.

이 방법은 논란의 여지가 있는데, 최소한 이 글에서는 다루지 않겠습니다.



<img src="/assets/img/2024-05-15-InjectingComposableswithDaggerwithoutlosingit_1.png" />

## 이주

FirstScreen을 독립적으로 만들기 위해서는 주입된 종속성을 별도의 클래스로 분리해야 합니다.

@Stable 주석을 사용하면 생성된 후에 실제로 변경되지 않을 것을 compose 컴파일러에 알릴 수 있습니다.



## Dagger 구성 요소

## Compose 레이어

이 방법은 처음에는 작동하지만 매번 재구성할 때마다 Dagger 구성 요소가 다시 생성됩니다.

이와 같이 무해한 예제에 대해서는 성능에 거의 영향을 미치지 않을 것입니다. 그러나 보다 복잡한 화면에 대해서는 그렇지 않을 수 있습니다.




Let’s use the classic remember keyword, then:

![image](/assets/img/2024-05-15-InjectingComposableswithDaggerwithoutlosingit_2.png)

## Should someone actually do this?

This approach goes against most compose guidelines. Composables should really be pure functions, fast, idempotent, and free of side effects.




하지만 주요 리팩터링이 실현 가능하지 않을 때, 너무 많은 노력을 들이지 않고 작동시킬 수 있어요.

## 잊지말고요 (미안해요😑)

효율성이 중요하다면, 간단히 처리할 수 없을 거에요. Ian Lake가 여기에서 왜 설명하는지 알려줄게요:

위와 같은 경우에는 DI 구성 요소가 다시 생성되어 composable로 주입될 거예요.



세계의 끝은 아니지만, 특히 무거운 Dagger 구성 요소의 경우에는 약간의 단점이 있습니다.

만약 기억하는 값을 너무 쉽게 잃어버리지 않을까 걱정된다면, 더 고급 스코핑 옵션 2가지가 있습니다:

- **resaca**
    - sebaslogen에 의해 만들어졌습니다. 정말 좋아요! 👍
- **Circuit**
    - Slack에 의해 만들어졌습니다. 더 강력한 기억 형태 이외에도 더 많은 기능들을 제공합니다. 개인적인 경험은 없습니다.

## 그래도요



조금이나마 도움이 되었기를 바랍니다.

@markasduplicate

나중에 봐요.