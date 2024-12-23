---
title: "Angular 마이크로 프론트엔드에서 CSS 격리하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-CSSisolationwithAngularMicrofrontends_0.png"
date: 2024-06-22 15:23
ogImage:
  url: /assets/img/2024-06-22-CSSisolationwithAngularMicrofrontends_0.png
tag: Tech
originalTitle: "CSS isolation with Angular Micro frontends"
link: "https://medium.com/@epavliy/css-isolation-with-angular-micro-frontends-eb3bd8261bb9"
isUpdated: true
---

<img src="/assets/img/2024-06-22-CSSisolationwithAngularMicrofrontends_0.png" />

최근에, 마이크로 프론트엔드 아키텍처가 필요한 프로젝트에서 작업하고 있었습니다. 여러분과 공유할만한 흥미로운 도전 과제를 발견했어요.
이 기사에서는 Angular 컨텍스트에서 작업할 것이지만, 물론 다른 프레임워크도 사용할 수 있지만 특정 사항을 고려해야 합니다.

# 마이크로 프론트엔드는 훌륭해요

마이크로 프론트엔드에 대한 주제는 요즘 매우 인기가 있습니다. 모두가 독립적인 팀을 구축하고 개발 프로세스를 효율적으로 확장하고 싶어합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

마이크로프론트엔드 앱을 구축하는 다양한 기술들이 있어요. 그 중에서 내가 아주 좋아하는 한 가지 방법은 Webpack 모듈 페더레이션을 사용하는 것이에요. 더 자세한 내용을 알고 싶다면, Angular 아키텍트(Manfred Steyer)의 이 훌륭한 시리즈를 적극 추천해요.

# 왜 격리와 CSS 격리가 필요한 이유

팀이 독립적으로 작업하고 자체적인 모두 소독창에서 작업할 때, 마이크로 프론트엔드는 가장 잘 맛난다. 이를 실현하려면 일련의 단계를 구현해야 해요.

- Webpack 페더레이션을 사용하면 마이크로프론트엔드 코드를 쉽게로드할 수 있어요. 물론 아무 JS 코드나 될 수 있겠지만, 여기서는 마이크로프론트엔드를 다루고 있으니까요.
- 웹 구성 요소를 사용하면 사용자 정의 요소를 정의할 수 있어서 게임에서 캡슐화의 일종을 가져다 줘요. Angular에서는 Angular Elements를 사용하는 것이 가장 좋아요.
- Shadow DOM은 CSS를 캡슐화할 수 있게 해줘요. 이미로드된 HTML 페이지 안에서 자신만의 CSS 세계를 만들 수 있다고 상상해봐요. 그리고 루트/부모 CSS가 당신의 CSS를 더 이상 망가뜨릴 수 없다고요… 게다가, 격리된 CSS는 루트/부모도 망가뜨리지 않을 거예요. 멋지지 않나요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

고립은 우리가 안전하게 개발할 수 있도록 해줍니다. 누군가가 당신의 스타일을 망가뜨리거나 당신이 누군가의 스타일을 망가뜨려도 걱정할 필요가 없습니다.

그것의 주요 관심사는 무엇일까요? 그것은 중복입니다. 일을 원활하게 진행하기 위해 우리는 서로 다른 수준에서 몇 가지 요소를 중복해서 만들어야 합니다. 하지만 이것이 문제인지 아닌지는 실제 시나리오에 따라 다릅니다. 예를 들어, 동일 페이지에 1-2개의 마이크로 앱이 있는 계획이 있다면 괜찮습니다. 그러나 동일 페이지에 많은 마이크로 앱이 있고 이를 모바일 사용자가 활발하게 사용한다면 중복은 문제를 일으킬 수 있습니다. CSS의 경우, 그런 문제 중 일부는 수정할 수 있습니다. 이제 어떻게 수정하는지 살펴보겠습니다.

# 실습해 봅시다

우선 저희 상황을 설명해 보겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 쉘이 있습니다. teamA에서 개발한 것입니다. 이는 고객의 진입점으로 간주되며 https://resource-portal.test.com을 통해 접근할 수 있습니다. 쉘은 모듈 페더레이션을 사용하여 MFE(Micro Frontend)를 로드하고 웹 컴포넌트로 표시합니다.

- MFE 애플리케이션이 있습니다. teamB에서 개발한 것으로 쉘이 호스팅하도록 웹 컴포넌트로 애플리케이션을 공유합니다. 동시에 https://mfe-app.test.com을 통해 독립적인 앱으로도 접근할 수 있습니다.

반응형 디자인이 필요하다고 가정했을 때, 측정 단위로 REM을 사용하기로 결정했습니다. 그런데 아직 REM에 익숙하지 않다면, 현재 매우 인기가 높은데요. 특히, 반응형 앱을 개발하는 경우에는 더욱 중요합니다. REM 사용에 대해 더 알아보려면 여기를 클릭해주세요.

기본적인 마이크로프론트엔드 설정으로, 쉘과 하나의 마이크로프론트엔드 애플리케이션이 있는 구성을 갖추고 있습니다. 이를 통해 쉘과 MFE가 CSS 측면에서 충돌하지 않도록하여 팀이 안전하게 느낄 수 있도록 하는 것이 주요 목표입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리는 여러 실용적인 경우에 대해 다뤄볼 것이고, 당신의 개발 과정에 유용할 것이라고 생 생각해요. 대부분의 변경 사항은 MFE 측면에서 발생할 것입니다.

## MFE용 ShadowDom 활성화

Angular에서 ShadowDom을 활성화하는 것은 정말 쉽습니다. ViewEncapsulation.ShadowDom을 설정하면 됩니다. 우리 경우에는 모듈 페더레이션을 통해 공유하는 MFE 내부의 앱 컴포넌트에 적용할 것입니다.

```js
encapsulation: ViewEncapsulation.ShadowDom;
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 웹 구성 요소 내부에 스타일 주입하기

적절한 캡슐화가 완료되면 — Angular의 전역/부모 스타일은 더 이상 적용되지 않습니다. 우리의 컴포넌트는 독립적으로 존재합니다. 따라서 필요한 CSS를 직접 컴포넌트 .scss에 주입해야 합니다.

만약 크롬 개발자 도구를 사용하여 소스를 확인하면, MFE 웹 컴포넌트 내부에 `style` 태그가 있음을 알 수 있습니다.

일반적으로 styles.sccs에서 모든 CSS를 app.component.scss로 옮깁니다.
또한 기업 테마, Material 스타일 등과 같은 서드 파티 자원을 주입해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

그런 주입의 부작용 중 하나는 번들 크기입니다. 웹 구성 요소의 각 인스턴스마다 CSS를 중복으로 포함해야 하므로 모든 필요한 외부 구성 요소도 중복됩니다. 하지만 격리 혜택을 많이 얻을 수 있죠, 맞죠?

걱정 마세요. 상황을 개선하는 한 가지 방법이 있습니다 — CDN을 사용하는 것입니다. 그리고 직접 또는 로컬 주입하는 대신 CDN에서 CSS를 링크시키면 됩니다. 브라우저 덕분에 — 보통은 CDN에서 CSS를 캐시에 저장하죠. 이것은 — 첫 번째 인스턴스가 필요한 CSS를 로드하고 그 다음에는 캐시에서 가져올 것이라는 뜻입니다. 또한 앱이 충분히 거대하지 않고 3rd party가 적다면 번들 크기에 대해 걱정할 필요가 없을 겁니다.

## 상속 가능한 스타일 누출 막기 — 중지해요

기본적으로 그림자 DOM으로도 — 일부 스타일은 최상위 수준에서 (우리 경우에는 Shell에서) 누출됩니다. 왜냐하면 상속 가능하기 때문이죠. 예를 들어 색상, 커서, 글꼴 등이 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

위 문제를 해결하기 위해 app.component에 지정된 CSS를 추가하면 됩니다.

```js
:host {
    all: initial;
}
```

## :host에 주의하세요

모든 스타일을 조정했고 독립형 모드에서 확인한 결과 모든 것이 잘 작동합니다. 그러나 셸 내부에서는 적용되지 않는 스타일이 있습니다. 예를 들어, 전역 CSS 변수 등이 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

보통 이런 경우는 CSS에서 :host를 사용할 때 발생했었어요. 조사한 결과, :host에 추가로 :root를 추가해야 한다는 것을 발견했어요. 왜 이런 일이 발생하는지는 확실하지 않지만, 한 가지 관찰 결과를 공유하자면, 독립적으로 작업할 때는 :host를 사용하는 반면, 셸 내에서는 :root를 사용한다는 거예요.

:root div, :host div =`가 작동해요.

## SharedStyleHost 스타일에 작별을

이제 모든 필요한 CSS를 앱 구성 요소 CSS에 직접 주입했어요. 이제 같은 프로젝트에서 그 웹 구성 요소를 사용해요 (index.html에 넣어서).

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

예상대로 그것은 웹 구성 요소 그림자 DOM에만 존재해야합니다. 그러나 문서 헤드를 보면 거기에 훨씬 많은 스타일이 있습니다. 궁금하죠, 왜 그럴까요?

현재 버그가 있어 스타일이 상위로 올라오는 것으로 밝혀졌습니다: https://github.com/angular/angular/issues/35039

이 문제를 해결하려면 공유 스타일 호스트를 정리해야합니다.

참고: 모듈 페더레이션과 웹 구성 요소를 공유하고 다른 앱에서 이 웹 구성 요소를 만드는 경우 이 문제가 발생하지 않을 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 몇 가지 기준 설정하기

지금 셸 내부의 MFE를 살펴보면 모두 잘 보입니다. 그러나 독립적으로 작동할 때는 몇 가지 문제가 발생할 수 있습니다. 시작할 때 REM 사용에 대해 언급했었던 것을 기억하나요?

따라서 독립형으로 REM이 제대로 작동하려면 일반적으로 html 태그 수준에서 기준을 설정해야 합니다. 우리의 경우에는 보통 셸 쪽에서 설정됩니다. 이것은 즉, MFE를 셸 내부에서 사용할 때는 모든 것이 잘 작동하지만 독립 실행 시에는 그렇지 않다는 것을 의미합니다. 그리고 그 기준을 웹 구성 요소 자체에 넣을 수 없습니다. 해결책은 MFE 사이트에서도 기준을 설정하는 것입니다.

```js
html {
   // REM을 위한 기준을 설정합니다
   font-size: 62.5%;
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Angular Material. 게임에 있나요?

알겠어요, 팀B는 Material 라이브러리를 사용하기로 결정했습니다. 그러나 쉘 오너(팀A)는 사용하지 않습니다. 그리고 아마도 Material은 전역 스타일과 많은 scope를 사용하는 경향이 있을 거에요.

작업을 진행하기 위해서는 Material을 MFE app.component.scss에 주입해야 합니다.

이렇게 하면 Material 스타일을 MFE 구성 요소 자체에 주입할 수 있습니다. 이제 독립적이고 독자적입니다. 번들 크기에 대해 생각하고, 바로 이런 직접적인 주입 대신 CDN을 사용하여 개선할 수 있는 방법이 있다는 것을 기억하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 아이고... Material 오버레이?

우리는 기쁘게 생각해요. Material은 잘 작동해요. 그런데 오버레이를 사용하는 컴포넌트들을 사용하기 시작하면 정말 안 좋게 작동해요.

기본적으로 오버레이는 문서 루트에 추가돼요. 이는 라이브러리가 올바르게 위치를 지정하고 끝날 때 정리할 수 있기 때문에 논리적이에요. 그런데 우리 경우에는 어떤 일이 벌어지나요? MFE 웹 컴포넌트가 Shadow DOM을 사용하고 셸에서 모든 스타일을 무시해요. 오버레이 자체는 문서 루트에 추가돼요. 셸의 영역이죠. 거기에 Material 스타일이 있나요? 그렇죠, 없어요. 그게 문제죠.

이 문제를 해결하기 위해 우리는 웹 컴포넌트 내부에 오버레이 컨테이너를 추가해야 해요. 즉, 그 안에 그림자 루트가 있어야 해요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

좋은 점은 Material이 그것을 쉽게 처리할 수 있다는 점입니다.

그런 다음, app.module.ts로 이동하여 다음을 추가해야 합니다:

```js
{
   provide: OverlayContainer,
   useClass: WebComponentOverlayContainer,
},
```

이로써 오버레이 컨테이너가 웹 구성 요소의 쉐도우 루트로 이동하게 됩니다. 거기에 주입된 모든 스타일은 삽입된 오버레이에 영향을 미칠 것입니다. 승리입니다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 잠깐… @font-face가 작동하지 않나요?

Material과 관련된 내용이지만 Material에 국한되지는 않습니다. 팀B가 MFE 애플리케이션에서 사용자 지정 글꼴을 사용하려고 합니다. @font-face는 사용자 지정 글꼴과 함께 작업하는 데 잘 알려진 것입니다.

그래서 app.component.html로 가서 글꼴 링크를 맨 위에 넣고 scss에서 사용해 보려고 합니다.
하지만… 작동하지 않고 Material 아이콘이 보이지 않습니다…

지금 @font-face가 작동하는 방식에 대한 명세 때문에 예기치 않은 결과입니다. 이를 해결하려면 웹 페이지 맨 위에서 폰트를 명시적으로 로드해야합니다. 그런 다음 필요한 위치에서 사용하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

좋은 점은 — Shell 팀에게 별도의 작업 요청을 하지 않아도 된다는 것입니다. 우리는 그 스크립트를 직접 삽입할 수 있습니다. 참고로, 이것은 물론 우리의 독립성에 영향을 미칩니다. 왜냐하면 다른 MFEs가 해당 폰트를 푸시할 수 있는 Shell scope의 상단으로 이동하게 됩니다. 하지만 현재는 다른 선택사항이 없습니다.

MFE에서 폰트를 로드하는 코드는 아래와 같이 보일 수 있습니다:

## Dom 쿼리 — ShadowRoot에 대해 기억하기

일부 경우에는 셸과 MFE 웹 컴포넌트가 함께 있는 상황에서 셀렉터로 요소를 쿼리해야 할 수도 있습니다. 상황에 따라 — MFE 내부에서 ID로 요소를 쿼리하려고 시도할 때 document.querySelector을 사용해봤지만 실패했나요? 왜 그럴까요?
음… 웹 컴포넌트와 쉐도우 DOM 작업을 시작하면 검색할 쉐도우 루트 컨텍스트를 명시적으로 지정해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

그래서 document.querySelector를 사용하는 대신 document.querySelector(`web_component_name`).shadowRoot.querySelector(``)을 사용하면 됩니다.

## 마무리

이 단계에서는 끝났다고 생각해요. CSS 격리 환경에서 작업하는 것은 관련된 각 팀의 구체적인 지식이 필요하다는 것을 알 수 있습니다. 그러나 이러한 구체적인 내용이 투명하고 이해되면, 개발하기가 훨씬 쉬워지며 문제 발생에 대한 걱정이 줄어듭니다.

CSS 격리를 사용해야 하는가? 당연히 그렇지 않아요. 제품과 팀의 요구 사항을 항상 고려하세요.
