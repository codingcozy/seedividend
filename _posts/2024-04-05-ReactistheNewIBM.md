---
title: "리액트는 새로운 IBM이 되다"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "React is the New IBM"
link: "https://medium.com/@chrlschn/react-is-the-new-ibm-6af2f4b04e5e"
isUpdated: true
---

![ReactistheNewIBM_0](/assets/img/ReactistheNewIBM_0.png)

우리 중 일부는 산업에 충분한 기간 동안 변형된 이 문구들이 나타나고 사라지는 것을 보았습니다.

구글에서 가장 먼저 나오는 결과에 이에 관한 훌륭한 블로그 게시물이 있습니다:

Paul Liesching이 작성한 매우 잘 쓴 LinkedIn 기사를 인용했습니다:

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

이와 유사한 변형이 있었고 사라져갔습니다. "IBM"을 "Oracle"이나 "Microsoft" 또는 "Intel" 또는 "SAP"으로 바꾸면 이해할 수 있습니다.

React는 당연히 회사가 아니지만, 이제 React가 동일한 위치를 차지하고 있다고 제안하겠습니다. 이는 진전을 위한 문제이며, 현 상황에 대한 징후입니다.

# 프론트엔드의 상황

JS 2022 설문 조사 결과, React가 여전히 사용량 측면에서 선두에 있음이 예상되었습니다. 사실, 이 설문 조사의 한정된 대상을 기준으로 시장 점유율이 계속 확대되고 있습니다:

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

![React is the New IBM 1](/assets/img/ReactistheNewIBM_1.png)

만약 YCombinator의 Work at a Startup 채용 사이트를 스타트업 세계의 대리자로 사용한다면, React로 더 많이 기울어져 있다는 것을 알 수 있습니다:

![React is the New IBM 2](/assets/img/ReactistheNewIBM_2.png)

Target과 같은 주요 기업에서도 이미 사용되고 있습니다.

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

![React is the New IBM 3](/assets/img/ReactistheNewIBM_3.png)

그리고 월마트:

![React is the New IBM 4](/assets/img/ReactistheNewIBM_4.png)

심지어 모두가 싫어하면서도 사랑하는 협업 도구인 Microsoft Teams도 이제 React로 다시 작성되고 있습니다:

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

<img src="/assets/img/ReactistheNewIBM_5.png" />

React가 이제 "안전한" 기업 선택, 현대적인 IBM이라는 신호가 더는 없다는 것은 분명합니다. 그래서 아마 React를 선택하지 말아야 할지도 모릅니다.

# React의 문제점

## 성능

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

다섯 가지 주요 프론트엔드 라이브러리 중에 — React, Angular, Vue, Svelte, 그리고 Preact — React가 성능 면에서 한쪽으로 밀린 라이브러리 중 하나입니다.

데이터 크기 측면에서는:

![React는 새로운 IBM 입니다](/assets/img/ReactistheNewIBM_6.png)

또는 CPU 시간 면에서도:

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

![ReactistheNewIBM_7](/assets/img/ReactistheNewIBM_7.png)

React는 성능이 좋지 않습니다.

주요 UI 라이브러리에 대한 벤치마크는 React를 성능이 좋지 않은 것으로 나타냅니다:

![ReactistheNewIBM_8](/assets/img/ReactistheNewIBM_8.png)

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

거의 모든 성능 측면에서:

React의 부적합한 페이로드 크기, 부적합한 실행 속도 및 높은 메모리 사용량 조합은 특히 모바일 대상 웹 앱에 대한 나쁜 선택지가 됩니다.

개발자들이 고속 인터넷 연결과 최신 장치에서 작업할 때는 이러한 문제가 잘 알려지지 않습니다, 특히 하드웨어와 연결성이 더 균일한 기업 환경에서는 더욱 그렇습니다. 그런데 소비자 시장에서? 개발도상국에서? 오래된 장치에서? 이 제약은 최종 사용자가 겪게 됩니다.

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

## 생태계 vs 혁신

이 모든 것을 감안해도, React는 여전히 프런트엔드 개발에서 최고의 라이브러리로 남아 있습니다.

이것은 IBM이나 마이크로소프트의 지배 시대와 달리 자기 이행 예언의 부산물입니다. IBM이나 마이크로소프트나 오라클이나 React를 선택하는 것의 생태계와 지각된 "안전함"으로 인해 더 많은 React가 만들어지는 자아성장 주기를 만들어 냅니다. 이것은 다음과 같이 표현될 수 있습니다:

```js
while (react.isPopular) {
  react.isPopular = true;
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

하지만 이것은 혁신에 대한 시각 장애를 만들어냅니다.

크고 있는 생태계 → 의존성이 커짐 → 기업의 참여도 증가 → 혁신이 점점 어려워지는 것을 보실 겁니다. 혁신을 하기 위해서만이 아니라, 성능을 향상시키고, DX를 개선하고, 현대 웹 앱과 상호 작용하는 최종 사용자 경험을 향상시키기 위해서입니다. React가 시장 지배력을 확보한 후에는 혁신이 거의 없어지게 되는 것은 사실입니다. 첫째로, 더 높은 안정성을 기대하기 때문에입니다. 하지만 두번째로, 프로젝트의 리더십 팀에는 폐쇄적인 마음의 오만함이 불어든다는 것입니다.

앤드류 클라크의 트윗을 처음 보았을 때, 이것이 농담인 줄 알았습니다. 분명히, 이것은 농담이겠지, 맞죠? 클라크는 신호와의 세밀한 반응성이 "성능에 좋다"고 인정하고 있습니다...

이겍은 농담이 아닙니다; 실제로, React 팀은 이 접근 방식을 두 배로 강조할 것입니다. 이에도 불구하고 더 나은, 더 빠른 모델이 존재한다는 모든 증거에도 불구하고, 팀은 시장 점유율에 제약을 받고 있으며 또한 스스로를 판매하고 있는 것을 개발자들과 최종 사용자인 우리가 잘못 선택했다고 인정하기에는 너무 오만합니다.

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

알렉스 러셀이 의견 기사에서 쓴 대로:

앤드루 클락의 비전, 리액트의 단점을 해결하기 위해 더 많은 컴파일러 마법을 사용하는 것은 실제로 페이스북스러운 방식으로 성능 및 기술적 모델의 적합성 문제를 해결하는 것입니다. 우리는 페이스북의 HipHop 가상 머신과 같은 것을 PHP의 규모에 맞춰 만든 것과 Hack 프로그래밍 언어에서도 같은 것을 보았습니다.

한편, 나는 리액트 팀을 찬양해야한다고 생각합니다. 리액트에 투자한 팀이 노력을 처음부터 다시 시작하지 않아도 되도록 했다는 점을 칭찬해야한다고 생각합니다(마치 HipHop으로 성능이 나쁜 PHP를 확장할 수 있었던 것처럼). 그러나 반면에, 리액트의 실패에 대한 해결책이 단순히 "마법"을 더 많이 컴파일러로 강요하여 고장난 모델을 작동시키는 것에서 점진적인 방법론을 더 멀어지도록 하는 것을 볼 수 있습니다.

나에게는 리액트가 막다른 골목이며, 그 본질적인 결점은 컴파일러 마법으로만 해결할 수 있다는 것이 분명하다. 우리는 여기서 JavaScript 및 HTML 프런트엔드를 구축하고 있습니다, 운영 체제가 아닙니다!

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

어쩌면 더 중요한 것은, 그 컴파일러의 마법은 잘못된 대상에 대해 해결하고 있다는 점입니다.

## 복잡성

예전 IBM 메인프레임 시스템이나 Microsoft의 엔터프라이즈 소프트웨어인 SharePoint와 같이, 이러한 시스템의 복잡성은 매우 과소평가되고 있습니다. 이것이 지배적인 위치에 있으면서 "안전한" 선택이기 때문에 강력한 부분 중 하나입니다: 시장 점유율은 여기저기에서 만나는 실제 현실과 많은 FUD(두려움, 불확실성, 의심)를 만들어냅니다("만약 우리가 JavaScript/Svelte/Vue/Solid/Preact 개발자를 고용할 수 없다면 어떨까요?!").

한번 더, Alex Russell의 글은 솔직하게 말합니다:

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

리액트의 복잡성은 잘 숨겨져 있지만 렌더 사이클이 stateless 컴포넌트를 전제로 하는 것에 내재되어 있어, 개발자들은 언제 어디에 상태를 조심스럽게 배치해야 하는지를 이해해야 합니다.

리액트의 준 함수형 모델은 상태를 관리하는 어려움에 대해 일반적인 가정을 하고 있는데, 저는 그것이 사실이 아니라고 생각합니다. World of BS에는 다양한 프로그래밍 철학들과 그들이 상태를 어떻게 바라보는지에 대한 간결한 내용이 있습니다.

이렇게 읽으면, 리액트의 훅스 모델이 함수형으로 지향하는 것과 어울릴 때 혼란스러운 이유를 볼 수 있습니다: 훅스는 개념적으로 getter와 setter가 있는 객체지향적인 상태 캡슐화와 더 비슷합니다 (이 아이디어에 대해 감사드립니다
Amy Blankenship
).

이 프로그래밍 철학과 상태를 보는 방식에 대한 이 관찰은 매우 적절하며, 웹 UI가 상태보다는 논리적인 측면으로 더 치우쳐 있는지 고려하여 한 모델이 다른 모델보다 적합한지를 고려하는 흥미로운 질문입니다. 그리고 계속되는 질문: 리액트의 함수형 접근법은 실제로 로직과 상태를 정확하게 만드는 복잡성을 줄일까요? (충분히 큰 리액트 프로젝트를 진행한 적이 있다면, 이미 그 질문에 대한 답을 알고 있을 겁니다.)

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

당신이 코드를 돌아보고 뭔가 이상한 부수 효과를 찾은 후 useMemo와 useCallback을 추가하거나 UI에서 이상한 버그를 찾은 후 과도한 useMemo와 useCallback 사용을 제거하고 있는 경우, 그렇다면 클럽에 환영합니다. React의 렌더 모델과 기능적 순수성에 대한 강조는 모든 상태를 가진 UI 응용 프로그램 라이브러리나 프레임워크 (데스크톱 앱, 모바일 앱, 3D 게임 라이브러리 등)이 설계된 방식을 고려할 때 직관적이지 않습니다.

그래픽 카드 수준에서는 한 프레임씩 그려지며 이전에 있던 렌더링된 픽셀 버퍼를 삭제하지만, 이는 하드웨어 수준의 구현 세부 사항이며 추상화로 인해 이러한 낮은 수준의 세부 사항이 개발자에게 전달되지 않습니다. 일반적으로 UI 구성 요소나 개체가 상태를 가정하는 것처럼 우리는 항상 가정합니다. 다시 말해, Unreal이나 Unity 또는 Godot과 같은 엔진의 목적은 상태가 있는 프레임 렌더링 파이프라인 위에 상태 추상화를 통해 생산성을 향상시키는 것입니다.

페이스북이 React 개발자에게 DOM 트리가 매번 재생성된 것처럼 가정하라고 요청하는 이유가 있을지도 모릅니다 🤷‍♂️.

다음으로 넘어가보겠습니다:

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

## 당신의 문제를 해결하지 못합니다

확실한 것은, React의 초기 학습 곡선은 매우 낮습니다. 왜냐하면 React 자체가 주로 그림을 달아주고 가장 기본적인 상태 관리에 초점을 두고 있기 때문입니다. 만약 React를 잘못 사용한다고 해도(예: "순수한", 부작용이 없는 컴포넌트를 작성하지 않는 경우), 작은 프로젝트에서는 문제에 대해 거의 느끼지 못할 것입니다.

그러나 React의 논리적 모델인 상태 변화에 따라 UI 전체를 다시 생성하는 것은 규모에 맞게 올바르게 수행하기가 매우 어렵습니다. 여기서 말하는 바는 응용 프로그램과 팀이 커짐에 따라 컨텍스트 제공자의 층이 늘어나면, 예기치 않은 부작용을 가진 컴포넌트를 작성할 가능성이 서로 다른 기술 수준, 지식, 경험 그리고 코드 양이 더 많아져 증가한다는 것입니다.

Facebook 및 Target, Walmart, Microsoft와 같은 대기업 팀들을 고려할 때, 엄격한 테스트, 추가 도구 및 더 나은 교육을 통해 이를 관리할 수 있습니다. 따라서 여기서 주된 질문은 React가 시작업이나 속도를 내고 싶어하는 소규모 팀에게 최적인 도구인가입니다. 나는 그 답이 “아니오”라고 주장합니다; React는 Facebook에서 Facebook의 규모와 자원을 바탕으로 Facebook의 문제를 해결하기 위해 탄생했습니다.

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

어떤 면에서는, 이것은 Scott Carey의 "복잡성이 소프트웨어 개발자들을 죽이고 있다" 라는 기사를 떠올리게 합니다. 그 기사에는 이 훌륭한 인용구가 있습니다:

특히, Carey는 모노리딕 방식에서 마이크로서비스로의 전환을 현대 아키텍처의 복잡성의 주요 원인 중 하나로 지목했습니다.

마이크로서비스와 그에 따른 증가된 복잡성이 필요한 시간과 장소가 분명히 있습니다. 그러나 각 팀이 스스로에게 물어봐야 할 질문은 "지금 이것이 필요한가?" 일 것이거나 단지 "복잡성 상인"들이 자신들의 상품을 팔려고 하는 것인지 입니다.

리액트의 복잡성과 마찬가지로, 대부분의 경우 답은 아마도 "아니요"일 것입니다. 대부분 우리는 페이스북, 타겟, 혹은 월마트의 문제를 페이스북, 타겟, 월마트의 규모로 해결하거나, 페이스북, 타겟, 월마트의 수준의 리소스를 사용하면서 페이스북, 타겟, 월마트 수준의 헤킹과 해결책을 사용할 수 있는 상태는 아닙니다.

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

우리 중 대부분, 특히 스타트업에서는 기술 스택을 선택하는 중요한 측면으로 빠르게 움직이되 발을 쏴버리지 않는 것이 더 중요할 수 있습니다.

UI 공간에서 유용한 혁신의 많은 부분은 이제 React 생태계 주변에서 일어나고 있습니다: Solid.js, Preact.js, Svelte.js, Vue.js, Astro.js, HTMX (전체 페이지를 SSR하는 대신 변경된 부분만 SSR하는 것이 왜 SSR하나요?), Qwik.js, Marko.js, Deno Fresh, 그리고 현대적인 JavaScript 능력을 활용한 점진적 향상.

Vue 3.4의 defineModel 매크로는 보이는 것보다 작은 혁신조차 DX와 반복 속도에 미치는 영향이 깊은 사례입니다.

![image](/assets/img/ReactistheNewIBM_10.png)

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

IBM과 마찬가지로 React도 언젠가 자체적인 대량과 혁신 능력 부족으로 인해 그 왕관을 잃을 것입니다. 이미 팀이 프론트엔드의 상태와 개발자, 팀, 그리고 최종 사용자들을 위한 경험을 개선하지 못하고 계속 고민하는 방식에서 그것이 확인되고 있습니다. Vue의 Evan You는 다른 팀들로부터 좋은 아이디어를 빌려오는 데 문제가 없으나(예: Vue의 새로운 Vapor 모드), React 팀은 그럼에도 불구하고 성능을 위한 더 나은 모델들이 있다는 사실을 인정하면서도 그냥 고집하고 있습니다. 레몬만 있다면 레몬을 판매하는 것을 멈추는 것은 어렵죠!

React는 새로운 IBM입니다: 배워야 하고, 그 문제점을 이해해야 하며, 적절한 맥락에서 여전히 배포해야 합니다. React를 선택해도 해고되지는 않겠지만, 비용이 많이 들고, 비대하며, 올바르게 적용하기 어려우며, 단계마다 구현하는 것이 즐겁지 않을 것입니다. React는 "혁신의 가장 큰 적인 상황 유지 마인드"입니다.
