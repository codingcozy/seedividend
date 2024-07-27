---
title: "Angular 애플리케이션 성능 향상 팁 "
description: ""
coverImage: "/assets/img/2024-06-22-HowtoImproveAngularApplicationPerformance_0.png"
date: 2024-06-22 03:37
ogImage: 
  url: /assets/img/2024-06-22-HowtoImproveAngularApplicationPerformance_0.png
tag: Tech
originalTitle: "How to Improve Angular Application Performance 🚀"
link: "https://medium.com/@chandrabhushan1323/how-to-improve-angular-application-performance-fadde3890e71"
---


![그림](/assets/img/2024-06-22-HowtoImproveAngularApplicationPerformance_0.png)

앵귤러는 복잡하고 인터랙티브한 웹 애플리케이션을 구축하는 데 사용할 수 있는 강력한 JavaScript 프레임워크입니다. 그러나 적절하게 최적화되지 않으면 앵귤러 애플리케이션은 느리고 반응이 없을 수 있습니다.

이 문서에서는 앵귤러 애플리케이션의 성능을 향상시키는 방법에 대해 몇 가지 팁과 트릭을 논의할 것입니다. 이러한 팁에는 잘 알려진 것뿐만 아니라 신호와 관련이 없는 몇 가지 독특한 방법도 포함되어 있습니다.

1. ngFor 루프에서 trackBy 사용하기

<div class="content-ad"></div>

ngFor 디렉티브는 데이터 컬렉션을 순회하고 각 항목마다 템플릿을 렌더링하는 데 사용됩니다. 그러나 컬렉션이 큰 경우에는 성능 문제가 발생할 수 있습니다.

성능을 향상시키려면 trackBy 속성을 사용하여 컬렉션의 변경 사항을 추적할 수 있습니다. 이렇게 하면 Angular가 컬렉션의 각 항목에 대해 전체 템플릿을 다시 렌더링하는 것을 방지할 수 있습니다.

2. Lazy loading 사용하기

Lazy loading은 필요한 컴포넌트만 로드할 수 있는 기술입니다. 이를 통해 브라우저가 다운로드하는 초기 번들의 크기를 줄여 성능을 향상시킬 수 있습니다.

<div class="content-ad"></div>

게으른로딩을 사용하려면, 각 게으른로딩된 컴포넌트를 위한 별도의 모듈을 생성해야합니다. 그런 다음, 컴포넌트가 필요할 때 모듈을 로드하기 위해 라우터를 사용할 수 있습니다.

3. 복잡한 표현식과 함께 ngIf 사용을 피하세요

ngIf 디렉티브는 템플릿을 조건부로 렌더링하는 데 사용됩니다. 그러나 템플릿의 표시 여부를 제어하는 표현식이 복잡한 경우, 이는 성능 문제로 이어질 수 있습니다.

성능을 향상시키려면, ngIf와 복잡한 표현식을 사용하는 것을 피해야합니다. 대신, ngSwitch 디렉티브나 ngTemplate 디렉티브를 사용해야합니다.

<div class="content-ad"></div>

4. OnPush 변경 감지 전략 사용하기

Angular는 응용 프로그램 상태의 변경사항을 추적하기 위해 변경 감지를 사용합니다. 그러나 변경 감지를 너무 자주 사용하면 성능 문제가 발생할 수 있습니다.

성능을 개선하기 위해 OnPush 변경 감지 전략을 사용할 수 있습니다. 이 전략은 응용 프로그램 상태가 명시적으로 변경될 때만 변경 사항을 확인합니다.

5. 불변 데이터 구조 사용하기

<div class="content-ad"></div>

앵귤러는 기본적으로 불변 데이터 구조를 사용합니다. 이는 데이터 구조에 변경이 있을 때 새로운 사본이 생성된다는 것을 의미합니다. 이는 앵귤러가 데이터 구조의 변경을 추적할 필요가 없어지므로 성능을 향상시킬 수 있습니다.

AOT 컴파일 사용하기

AOT(Ahead Of Time) 컴파일은 앵귤러가 애플리케이션 코드를 미리 컴파일할 수 있는 기술입니다. 이를 통해 애플리케이션이 로드될 때 브라우저에서 수행해야 하는 작업량을 줄이므로 성능을 향상시킬 수 있습니다.

AOT 컴파일을 사용하기 위해서는 Angular CLI에서 이를 활성화해야 합니다. 다음 명령어를 실행하여 이 작업을 수행할 수 있습니다:

<div class="content-ad"></div>

```js
ng build --aot
```

7. 서버 측 렌더링을 위해 Angular Universal 사용하기

Angular Universal은 Angular 애플리케이션을 서버에서 렌더링할 수 있는 기술입니다. 이를 통해 느린 연결을 가진 사용자들의 성능을 향상시킬 수 있습니다.

Angular Universal을 사용하려면 Angular Universal 패키지를 설치하고 Angular CLI에서 활성화해야 합니다. 다음 명령어를 실행하여 이 작업을 수행할 수 있습니다:

<div class="content-ad"></div>

```js
ng add @angular/universal
```

8. RxJS 및 Signals를 함께 사용하여 반응형 프로그래밍

RxJS는 JavaScript를 위한 반응형 프로그래밍 API를 제공하는 라이브러리입니다. 반응형 프로그래밍은 비동기 이벤트를 더 효율적으로 처리할 수 있게 해 주어 Angular 애플리케이션의 성능을 향상시킬 수 있습니다.

Signals는 Angular 16의 새로운 기능으로, 성능을 향상하는 데 사용될 수 있습니다. Signals는 변경 사항을 관찰할 수 있는 반응적인 값입니다. 이는 값이 변경될 때 다른 부분에 알림을 보내기 위해 Signals를 사용할 수 있다는 것을 의미합니다. 이는 불필요한 변경 검출 주기의 수를 줄여 성능을 향상시킬 수 있습니다.

<div class="content-ad"></div>

예를 들어 사용자가 버튼을 클릭할 때 응용 프로그램에 신호를 보낼 수 있습니다. 이렇게 하면 버튼을 클릭할 때마다 Angular에서 전체 템플릿을 다시 렌더링할 필요가 없어집니다.

10. 웹 워커 사용

웹 워커는 최신 브라우저의 기능으로, 백그라운드에서 코드를 실행할 수 있도록 해줍니다. 이를 통해 CPU 집약적 작업을 백그라운드로 옮겨서 Angular 애플리케이션의 성능을 향상시킬 수 있습니다.

11. 성능 프로파일링 도구 사용

<div class="content-ad"></div>

성능 프로파일링 도구는 귀하의 응용 프로그램에서 성능 문제를 일으키는 부분을 식별하는 데 도움을 줄 수 있습니다. 이 도구들은 응용 프로그램의 다른 부분에 얼마나 많은 시간이 소요되고 있는지, 그리고 응용 프로그램이 얼마나 자주 재렌더링되는지를 보여줄 수 있습니다.

12. Angular 응용 프로그램을 제공하기 위해 CDN을 사용하세요

Angular 응용 프로그램을 제공하기 위해 CDN을 사용하는 것은 응용 프로그램 코드가 사용자 브라우저에 도달하기까지 여행해야 하는 거리를 줄여 응용 프로그램의 성능을 향상시킬 수 있습니다.

13. 이미지를 최적화하세요

<div class="content-ad"></div>

이미지를 최적화하면 사용자 브라우저에서 다운로드해야 하는 이미지의 크기를 줄여 Angular 애플리케이션의 성능을 향상할 수 있어요.

14. 캐싱 전략 사용하기

캐싱 전략을 사용하면 개선할 수 있어요.