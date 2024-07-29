---
title: "자바 다시 배우기 동적 프록시가 기반한 원칙은 무엇일까"
description: ""
coverImage: "/assets/img/2024-07-29-RelearningJavaWhatPrinciplesAreDynamicProxiesBasedOn_0.png"
date: 2024-07-29 14:00
ogImage: 
  url: /assets/img/2024-07-29-RelearningJavaWhatPrinciplesAreDynamicProxiesBasedOn_0.png
tag: Tech
originalTitle: "Relearning Java What Principles Are Dynamic Proxies Based On"
link: "https://medium.com/@cstoppgmr/relearning-java-what-principles-are-dynamic-proxies-based-on-726ea74d6f0a"
---



![이미지](/assets/img/2024-07-29-RelearningJavaWhatPrinciplesAreDynamicProxiesBasedOn_0.png)

프로그래밍 언어는 다양한 관점에서 분류할 수 있습니다. 그 중 동적 타입과 정적 타입은 하나의 관점입니다. 기본적인 차이는 타입 정보가 실행 시점에 검사되는지 컴파일 시점에 검사되는지입니다.

강한 타이핑과 약한 타이핑 사이에도 비슷한 대립이 있습니다. 이는 변수에 값을 할당할 때 명시적으로 타입 변환을 강제해야 하는지 여부와 관련이 있습니다.

그렇다면 Java는 이 분류에 어떻게 맞는 걸까요? Java는 일반적으로 정적 타입, 강한 타입 언어로 간주됩니다. 그러나 리플렉션과 같은 메커니즘을 제공하기 때문에 동적 타입 언어의 몇 가지 능력도 갖추고 있습니다.


<div class="content-ad"></div>

간단히 말씀드리면, 오늘의 질문은 자바의 리플렉션 메커니즘과 다이내믹 프록시 뒤에 숨은 원리에 대한 것이에요.

# 전형적인 답변

리플렉션 메커니즘은 자바에서 제공하는 기본 기능으로, 프로그램이 런타임에서 내부를 조사할 수 있게 해줘요. 리플렉션을 통해 우리는 클래스나 객체를 직접 조작할 수 있어요. 예를 들어, 객체의 클래스 정의를 가져오거나, 클래스에서 선언된 속성과 메서드에 액세스하거나, 메서드를 호출하거나 객체를 생성하거나, 런타임에서 클래스 정의를 수정하는 등의 작업이 가능해요.