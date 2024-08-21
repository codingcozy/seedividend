---
title: "리액트 컨퍼런스 2024 리액트 v19 RC"
description: ""
coverImage: "/assets/img/2024-05-16-ReactConf2024Reactv19RC_0.png"
date: 2024-05-16 16:34
ogImage:
  url: /assets/img/2024-05-16-ReactConf2024Reactv19RC_0.png
tag: Tech
originalTitle: "React Conf 2024. React v19 RC"
link: "https://medium.com/@vordgi/react-conf-2024-76aabd9da1e1"
isUpdated: true
---

<img src="/assets/img/2024-05-16-ReactConf2024Reactv19RC_0.png" />

리액트.js 컨프의 첫째 날이 끝났어요. 이 기대되는 컨퍼런스는 이전 것이 열린 지 거의 3년 후에 열렸어요. 리액트 업데이트도 기대돼었던 만큼 기다리고 기다린 만큼 너무 기대됐어요. 이 업데이트로 시작된 컨퍼런스에 대해 이 기사는 이제 그것에 전념할 거예요. 그리고 예상대로 — 버전 19가 릴리스 후보 상태로 이동했다는 것을 보셨다시피요. 전체 릴리스는 2주 내로 약속됐어요.

전반적으로, 저는 next.js 개발자로서 대부분이 익숙했어요. 허브의 수십 개의 기사들이 이 업데이트의 거의 모든 부분에 대해 이미 언급해 왔으며, 저는 next.js에서 소개된 업데이트 일부에 대해 일부 다뤄봤어요.

이 업데이트의 주요 방향은 "높은 DX에서 높은 UX를 실현하는 것" 이었다고 할 수 있어요. 최대한 간단한 코드로 최대의 성능을 달성하는 것이죠. 동시에, 업데이트의 일부에서는 서버 컴포넌트에 대해 거의 언급이 없었고, 간접적으로만 언급했어요. 그래서, 컨퍼런스로 넘어가 볼까요.

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

이러한 회의에서는 일반적으로 모든 것이 성장에 대한 설명으로 시작합니다. React 다운로드가 매년 10억 건에 이르렀습니다. 이 도구의 성장은 필연적으로 커뮤니티의 성장과 연결되어 있습니다. 따라서 Stackoverflow 통계도 보여졌는데, 개발자의 40%가 React를 웹 개발에 사용하고 있으며, 36%가 학습 중임을 나타냈습니다.

![이미지](/assets/img/2024-05-16-ReactConf2024Reactv19RC_1.png)

또한 흥미로운 사실은 React 기능이 이제는 프레임워크 안에서만 가능해졌다는 것이며, 이제 React.js에서 특정 프레임워크를 권장하기 시작했습니다. 슬라이드에는 remix, redwoodjs, next.js, expo가 보였습니다. 흥미로운 점은 이 목록에 React Router가 없다는 것입니다.

네! 이제 React Router도 이 목록에 추가할 수 있습니다. 첫 번째 회의 보고서는 Ryan Florence로부터 받았습니다. 이제 React Router로 SPA뿐만 아니라 SSR 및 SSG도 수행할 수 있습니다. 이제 Vite와 함께 사용하여 가능한 기능입니다. 데이터 및 서버 컴포넌트 작업을 위한 훅이 제공됩니다.

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

<img src="/assets/img/2024-05-16-ReactConf2024Reactv19RC_2.png" />

하지만 지금은 React.js의 변화로 돌아가 볼까요? 요소들을 조정하고 애플리케이션을 확장하는 문제가 다음에 설명되었습니다. JSX는 UI 개발에서 요소의 조정 문제를 해결했습니다. 그리고 load되는 요소들의 조정 문제를 해결하기 위해 Suspense가 추가되었습니다 (로딩 중에 무엇을 해야 하고 사용자에게 이 시간에 무엇을 보여줄지에 대한 문제).

React 19에서 다음 것들도 추가되었습니다:

- Server components. 이러한 컴포넌트는 데이터를 로드하고 이후 컴포넌트로 이동하는 문제를 해결할 수 있습니다 (익숙한 props를 사용);
- 메타데이터 포함. 메타태그는 어디든지 포함될 수 있습니다. React 자체가 올바른 위치에 추가하고 하나의 복사본만 남습니다.

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

![Image](/assets/img/2024-05-16-ReactConf2024Reactv19RC_3.png)

- 사전로드 방법. 수동으로 태그를 추가하는 것 외에도 링크 사전로드를 위한 방법들이 추가되었습니다 - preinit, preload, prefetchDNS 및 preconnect. 문서에는 preloadModule 및 preinitModule 방법도 설명되어 있지만, 이유는 불명이지만 이들은 회의에서 보여지지 않았습니다.

![Image](/assets/img/2024-05-16-ReactConf2024Reactv19RC_4.png)

- 스타일 임베딩. meta 태그와 유사하게, 스타일에 대한 작업이 진행될 것입니다. 그러나 여기에 중요도 옵션이 추가되었습니다 - 이에 따라 어떤 스타일이 더 중요한지(따라서 DOM에서 더 낮게 표시될 것인지)가 결정됩니다.

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

![이미지](/assets/img/2024-05-16-ReactConf2024Reactv19RC_5.png)

이제 컴포넌트의 스타일 로딩은 서스펜스로 추적됩니다. 즉, 컴포넌트가 렌더링되는 동안에만 로더를 표시할 수있는 것이 아니라 해당 스타일이 준비되는 동안에도 표시할 수 있습니다.

![이미지](/assets/img/2024-05-16-ReactConf2024Reactv19RC_6.png)

서버 컴포넌트의 등장으로 React는 서버 렌더링 책임을 더 맡게 되었으며 결과적으로 하이드레이션은 더 많은 논리와 잠재적인 문제를 가지게 되었습니다. React.js 팀은 하이드레이션 오류를 개선했습니다.

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

![ReactConf2024](/assets/img/2024-05-16-ReactConf2024Reactv19RC_7.png)

실제 트리 구조 작업에 중요한 변화에 대한 추가적으로, React.js에서 양식과 상호 작용 논리가 업데이트되었습니다. 먼저, react-dom에 양식 컴포넌트가 포함되었으며, 이는 요소에 대한 중요한 변경 사항을 의미합니다. 그리고 그 이야기는 “action” 속성 변경에 대한 것입니다 — 양식을 onSubmit이나 네이티브 속성을 통해 제출하는 대안으로.

![ReactConf2024](/assets/img/2024-05-16-ReactConf2024Reactv19RC_8.png)

action을 추가하는 것 자체는 onSubmit과 같이 보이지만, 이벤트 대신 FormData를 즉시 가져옵니다.

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

![ReactConf2024Reactv19RC_9](/assets/img/2024-05-16-ReactConf2024Reactv19RC_9.png)

또한, 폼 필드 및 버튼에 formAction prop이 추가되었습니다. 이는 동일한 방식으로 작동합니다.

사용자가 폼 로직을 로드하기 전에도 즉시 폼 제출을 요청하면 클라이언트 액션을 사용하는 경우 제출이 연기되고 로직이 준비되자마자 수행됩니다. 서버 액션의 경우 클라이언트 js가 필요하지 않기 때문에 즉시 제출됩니다.

그러나 기본 차이 외에도 폼 제출과 상호 작용에 중요한 변화가 있습니다 - 이들은 새로운 훅입니다. useOptimistic, useFormStatus 및 useActionState.

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

Sam Selikoff 씨가 "React unpacked: A Roadmap to React 19"라는 프레젠테이션에서 사용 예시를 공유했습니다. 예를 들어, onSubmit을 action + useActionState로 대체한 내용은 이런 식입니다:

![Image](/assets/img/2024-05-16-ReactConf2024Reactv19RC_10.png)

그리고 낙관적 렌더링을 추가할 수 있습니다:

![Image](/assets/img/2024-05-16-ReactConf2024Reactv19RC_11.png)

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

그리고 다시 레포트에서 중요한 변경 사항으로 돌아가 보겠습니다. 비교적 작은 변경 사항이 나열되었지만 매우 가치 있습니다. React.js 19에서는 forwardRef 없이도 함수형 컴포넌트에 ref를 props로 전달할 수 있습니다. 즉석에서 가능합니다.

![이미지](/assets/img/2024-05-16-ReactConf2024Reactv19RC_12.png)

또한, 컴포넌트에 ref를 전달할 때 언마운트 시 콜백을 반환할 수도 있습니다.

![이미지](/assets/img/2024-05-16-ReactConf2024Reactv19RC_13.png)

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

최종 열쇠 변경은 React 컴파일러였습니다. 내장되어 있는 메모이제이션을 갖춘 고급 로더입니다. React와 함께 응용 프로그램에서 메모이제이션을 자동으로 설정할 수 있습니다. Lauren Tan은 발표에서 이에 대해 자세히 설명했습니다. "React 컴파일러 사례 연구".

그래서 메모이제이션을 설정하는 방법을 이해하기 위해 React는 다시 렌더링을 트리거하는 위치부터 끝점까지의 관계를 분석합니다:

![이미지](/assets/img/2024-05-16-ReactConf2024Reactv19RC_14.png)

이러한 관계에 따라 컴파일러는 의존성의 전체 그래프를 상상할 수 있습니다:

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

![ReactConf2024](/assets/img/2024-05-16-ReactConf2024Reactv19RC_15.png)

그런 다음이 연결에 따라 필요한 종속성으로 메모이제이션을 설정하세요. 이 경우 노래가 변하지 않기 때문에 필터링된 노래(filteredSongs)는 동일해야 합니다(노래에 종속성이 있는 메모이제이션으로 처리됩니다). 그리고 setSong에 의해 노래가 변경되면 NowPlaying이 다시 렌더링되어야 합니다(song에 종속성이 있는 메모이제이션으로 처리됩니다).

![ReactConf2024](/assets/img/2024-05-16-ReactConf2024Reactv19RC_16.png)

"최대한 간단한 코드로 최대의 성능을 내세요."

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

좋은 해결책이지만, 실제로 메모이제이션을 어떻게 설정할지가 흥미로울 것입니다. 개발자가 이를 작성해야 할 위치와 이 논리를 컴파일러에게 맡겨 복잡하지 않게 유지할 가치가 있는 위치를 볼 수 있을 것입니다.

바벨을 지원하는 모든 주요 프레임워크와 빌드 시스템에 지금 바로 컴파일러를 설치할 수 있습니다. 이미 인스타그램, 페이스북, 그리고 댄 아브라모프가 현재 일하고 있는 회사 Bluesky에서 사용되고 있습니다.

또한, 코드 최적화와 관련된 모든 문제를 지적해주는 eslint 플러그인을 설치하여 컴파일의 신뢰성과 품질을 높일 수 있습니다. 일반적으로, 이 플러그인은 컴파일러와는 독립적으로 사용할 수 있습니다.

```js
npm install eslint-plugin-react-compiler
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

당신은 커맨드 라인 유틸리티를 사용할 수도 있어요. 컴파일러가 어플리케이션을 최적화할 가능성을 점검해 줄 거에요.

```js
npx react-compiler-healthcheck
```

다른 혁신은 Lydia Hallie에 의해 공유되었어요 — 사용 함수. 네, 실수가 아니에요 — 훅이 아니에요.

<img src="/assets/img/2024-05-16-ReactConf2024Reactv19RC_17.png" />

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

use와 hooks의 주요 차이점은 use는 조건 내에서 사용할 수 있다는 것입니다.

![이미지](/assets/img/2024-05-16-ReactConf2024Reactv19RC_18.png)

use 자체는 프라미스 또는 컨텍스트를 사용할 수 있습니다. use에 어떤 인수가 전달될지 확신할 수 없는 상황을 상상하기 어려운데, 왜 두 개의 독립적인 함수를 만들지 않는 것인지 알 수 없습니다.

마지막으로, 놀라운 보고서, 발표, 예제 및 일반적인 성과를 언급하겠습니다. React.js 팀은 모든 개선 사항의 가능성을 보여줄 수 있었으며 (next.js 팀, 용서해 주지만 가까이 서지도 못했습니다). 또한 즐거운 차이점으로, React.js 팀은 fetch API의 재작성을 코어에 포함하지 않기로 결정하고 이미 완료된 변경 사항을 되돌렸다고 언급하겠습니다.

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

일반적인 변경 목록은 다음과 같습니다:

![이미지](/assets/img/2024-05-16-ReactConf2024Reactv19RC_19.png)
