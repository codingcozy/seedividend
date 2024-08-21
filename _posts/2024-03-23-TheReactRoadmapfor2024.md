---
title: "2024년 개발을 시작한 분들을 위한 React 로드맵"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: " The React Roadmap for 2024"
link: "https://reedbarger.medium.com/%EF%B8%8F-the-react-roadmap-for-2024-89be565217d2"
isUpdated: true
---

![React Roadmap](/assets/img/🗺️-The-React-Roadmap-for-2024_0.png)

이 가이드에서는 2024년에 React 개발자가 되는 데 도움이 되는 모든 개념, 라이브러리 및 도구를 다루는 완전한 로드맵을 제시하겠습니다.

내 목표는 React에서의 행복한 길을 보여주어 함정에서 멀어지고, React에서 정말 중요한 부분에 시간을 소비하여 여러분이 목표를 달성할 수 있도록 도와드리는 것입니다.

여기 여러분이 놀라운 앱을 개발하고 일자리를 얻으며 React를 사용하는 것을 즐길 수 있도록 도와줄 React 개발자를 위한 로드맵입니다. 완전 초보자든 더 고급 사용자든 상관없이 선택하고자 하는 로드맵입니다.

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

# 🧱 핵심 React 개념 학습하기

React 애플리케이션을 만들 때 필요한 핵심 React 개념이 여러 가지 있습니다. 간단하거나 복잡한 React 애플리케이션을 구축할 때에도 필요한 내용들이에요.

가장 큰 개념은 아마도 컴포넌트일 거예요. 2024년에는 거의 모든 컴포넌트가 함수 컴포넌트가 될 것으로 예상돼요.

이러한 컴포넌트들은 React 엘리먼트와 JSX로 구성돼요. JSX의 작동 방식을 이해하는 것은 필수적이에요. 또한 props를 사용해 컴포넌트에 데이터를 전달하고, props와 state의 차이를 알아내는 것도 중요하죠. 마지막으로, 조건부 렌더링을 사용해 사용자 인터페이스의 일부를 조건에 따라 렌더링하는 방법을 알아내는 것도 중요한 요소가 되겠죠.

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

⏳ 다음 항목에 시간을 덜 쓰세요:

- 오래된 프로젝트에서 주로 볼 수 있는 Class 컴포넌트. Class 컴포넌트는 더 이상 기본 컴포넌트 유형이 아닙니다. React Hooks가 있기 때문인데, Hooks는 함수 컴포넌트에서만 사용됩니다.
- render props와 고차 컴포넌트 같은 오래된 패턴들은 2018년 이전에 React Hooks가 도입되기 전에 주로 사용된 것이므로 배울 필요가 없습니다.
- 리스트, 키, 이벤트 같은 간단한 개념들. 이러한 내용들을 이해하기 어렵지 않습니다.

# 🎣 핵심 Hooks 배우기

React의 핵심 개념을 배운 후에는 내장된 React Hooks를 배우세요. 그 중에서 가장 중요하고 자주 사용되는 것은 useState, useEffect, useRef, 그리고 useContext입니다.

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

이 훅을 사용하려면 React 상태의 기본을 이해하고 useEffect로 부수 효과를 수행하는 방법, 그리고 무한 루프와 같은 useEffect의 잠재적인 함정을 피해야 합니다.

또한 useRef 훅을 위한 refs와 useContext를 위한 context API를 이해해야 합니다.

다시 말해서, 이러한 것들이 아마도 90%의 시간을 사용할 것입니다. 나머지 10% 정도는 고유한 기능을 추가하기 위해 만드는 사용자 정의 훅일 수도 있습니다. (번역에 문제가 있으면 알려주세요.)

⏳ 시간을 덜 소비하세요:

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

- useContext와 비교해서 자주 사용되지 않는 useReducer 같은 Hooks입니다.
- useCallback 및 useMemo와 같은 최적화 Hooks입니다. 때때로 중요할 수 있지만, 덜 자주 사용할 것입니다.

# 🧠 중급 React 개념

React를 정말 마스터하려면 중급 개념을 확실하게 이해해야 합니다.

이 중급 개념들 중 일부는:

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

- React가 렌더링되는 원인을 이해하는 방법
- 비즈니스 로직을 재사용 가능한 훅으로 이동하는 방법
- "lifting state up"과 같은 기본 패턴
- 프롭 드릴링을 피하고 컨텍스트를 과도하게 사용하지 않기 위한 구성 사용 방법

이전에 언급한 핵심 개념은 주로 React 프로젝트를 적극적으로 코딩하고 만들며 가장 잘 이해할 수 있지만, 중급 개념은 React가 작동하는 방식을 이해해야 합니다.

다행히도, 새로 업데이트된 React 문서를 읽으면 이해할 수 있습니다. 이러한 중간 및 때로는 심화된 개념을 다루는 매우 유용한 안내서가 많이 있습니다.

# 🛠️ Vite를 사용하여 React 앱 만들기

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

React의 긍정적이자 부정적인 면은 그 밋어이 얼마나 의견이 분분하느냐입니다. React는 단일 페이지 애플리케이션을 만드는 데 도움이 되지만, 종종 필수 기능을 추가하려면 써드파티 라이브러리를 사용해야 하는 경우가 많습니다.

2024년에 새로운 React 앱을 만들기 위해 CLI/빌드 도구인 Vite를 사용하는 것을 강력히 추천합니다.

![React Roadmap for 2024](/assets/img/🗺️-The-React-Roadmap-for-2024_1.png)

NPM과 같은 패키지 매니저를 사용하여 단일 명령으로 React 애플리케이션을 처음부터 만들어 모든 필요한 도구를 구축 및 제작하여 개발 및 프로덕션 용으로 실행할 수 있습니다.

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

```js
npm create vite@latest my-react-app -- --template react
```

릴리스된 최신 버전의 Vite로 React 앱을 만들어보세요.

Create React App은 더 이상 권장되지 않습니다. 활발하게 유지보수되지 않으며 Vite보다 훨씬 느립니다.

# 🐕 TanStack Query로 데이터 가져오기

React 애플리케이션에서 데이터 가져오는 것은 어려울 수 있습니다. 전용 라이브러리없이 useEffect 훅에서 HTTP 요청을 수행해야 합니다.

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

그러나 이 방법은 로딩하고 오류 상태를 관리하기 위해 많은 보일러플레이트 코드를 추가해야 하며, 불필요한 요청을 만들지 않도록하는 많은 로직을 다루지 않습니다.

React 또는 Next.js 애플리케이션에 대해 추천하는 라이브러리는 TanStack Query(이전에 React Query로 알려진)입니다.

![The React Roadmap for 2024](/assets/img/🗺️-The-React-Roadmap-for-2024_2.png)

이는 API 엔드포인트에서 데이터를 요청하는 것뿐만 아니라 "변이"(업데이트)하는 간단한 훅을 제공합니다.

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

이 라이브러리는 데이터 가져오기 라이브러리에서 원하는 대부분의 기능을 제공합니다. 캐싱, 중복 요청 제거, 데이터가 오래된지 여부를 알려주는 등을 포함하여 정확히 원하는 대로 사용자 정의할 수 있습니다.

좋은 대체제를 찾고 있다면 SWR을 시도해 볼 수 있습니다. TanStack Query만큼 많은 기능을 갖고 있지는 않지만 React에서 데이터 가져오기를 훨씬 쉽게 만드는 또 다른 좋은 경량 옵션입니다.

# 🤹‍♂️ Zustand로 상태 관리하기

프로젝트가 어느 정도 규모로 커질 때 React 애플리케이션에서 상태 관리 라이브러리가 반드시 필요합니다. 오랜 시간 동안 React 애플리케이션의 기본 상태 관리 라이브러리는 Redux였으며 Redux Toolkit로 계속 발전해 왔습니다.

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

2024년에도 수천 개의 회사에서는 아직도 Redux를 사용하고 있습니다. 그러나 생태계는 더 간편한 상태 관리 솔루션 쪽으로 변화했습니다.

이를 통해 상태를 객체로 설명하고 해당 상태 객체의 속성을 업데이트하는 함수를 작성할 수 있습니다. 지난 몇 년간 제게 가장 선호하는 상태 관리 라이브러리는 Zustand였습니다.

![이미지](/assets/img/🗺️-The-React-Roadmap-for-2024_3.png)

Zustand는 매우 유용한 작은 라이브러리로, 간단한 훅을 사용하여 어떤 구성 요소에서든 상태를 관리하는 데 도움이 될 뿐만 아니라 불필요한 다시 렌더링을 방지하는 기능도 제공합니다.

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

Zustand과 비슷한 API를 공유하는 Recoil과 Jotai와 같은 좋은 대안이 많이 있습니다.

# ✨ TailwindCSS와 Radix UI로 스타일링하기

React를 위한 다양한 스타일링 옵션이 있습니다. 이것들은 사전에 제작된 컴포넌트 세트로, 멋진 일관된 디자인뿐만 아니라 내장된 기능도 제공합니다.

지난 몇 년 동안 나는 Material UI와 같은 것을 추천했을 것입니다. 그러나 이러한 컴포넌트 라이브러리는 종종 유연하지 않고 사용자 정의하기 어렵며 번들 크기를 크게 늘리는 경우가 많습니다.

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

2024년을 위한 더 나은 대안은 많은 개발자와 비즈니스가 이동하고 있는 Tailwind CSS와 같은 솔루션을 사용하는 것입니다. 이는 사전 제작된 클래스를 체이닝하여 컴포넌트를 스타일링할 수 있게 해주며 Radix와 같은 최소한의 컴포넌트 라이브러리와 결합하여 사용할 수 있습니다.

Radix는 프리미티브(Primitives)라고 불리는 것을 제공합니다. 이를 통해 대화상자, 버튼, 선택상자, 툴팁 등 필요한 기능을 가진 컴포넌트를 쉽게 작성할 수 있으며 여러분이 선호하는 스타일로 지정할 수 있습니다.

![The React Roadmap for 2024](/assets/img/🗺️-The-React-Roadmap-for-2024_4.png)

# ShadCN UI로 앱에 스타일을 입혀보세요

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

ShadCN UI는 TailwindCSS와 Radix 컴포넌트를 모두 사용하는 컴포넌트 세트로, 모든 애플리케이션에 좋은 시작점을 제공합니다. 전통적인 컴포넌트 라이브러리보다 더 많이 사용자 정의할 수도 있습니다.

2024년에 React 프로젝트에서 사용하는 것을 강력히 추천드립니다.

만약 컴포넌트 라이브러리를 사용하고 싶다면, Mantine, Chakra UI, Material UI와 같은 좋은 선택지가 있습니다.

# 🪧 TanStack Router로 라우팅 추가하기

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

리액트 라우터는 여러분이 구축할 대부분의 리액트 애플리케이션에 대한 기본 라우터로 남아 있습니다.

리액트 라우터는 리액트의 거의 시작부터 존재해 왔으며, 리액트 라우터 6과 함께 중요한 업데이트를 지속적으로 받고 있습니다. 탄탯 스택 라우터 같은 대안도 있지만, 리액트 라우터는 상세한 문서에서 확인할 수 있듯이 상상할 수 있는 거의 모든 사용 사례를 다룹니다.

다만, 한 가지 중요한 대안이 있다면 TanStack 라우터입니다.

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

2024년을 위한 새로운 라우터입니다. 타입 안전한 네비게이션, 내장된 TypeScript 지원, 중첩 라우팅, 자동 경로 프리페칭 등 많은 훌륭한 기능이 있어요. 이 라우터는 TanStack Query나 SWR과 같은 클라이언트 측 데이터 가져오기 라이브러리와 함께 사용하도록 설계되었습니다.

만약 TanStack Query를 사용 중이라면, 미래의 React 프로젝트에서 TanStack Router를 꼭 확인해보세요.

# 📑 React Hook Form으로 폼 만들기

React 앱을 만들 때 항상 폼 라이브러리를 사용할 필요는 없어요. 하지만 폼 유효성 검사가 필요하다면, React Hook Form이 높은 사용자 정의성과 직관적인 선택지로 좋은 선택일 거예요.

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

![🗺️-The-React-Roadmap-for-2024_6.png](/assets/img/🗺️-The-React-Roadmap-for-2024_6.png)

내장된 useForm 훅을 사용하면 입력 유효성 검사와 오류 메시지를 매우 쉽게 사용자 정의할 수 있어요.

React Hook Form이 훌륭한 점은 컴포넌트에 추가해야 하는 코드가 매우 적다는 거에요. 대부분은 useForm 훅 자체에 추상화되어 있어요.

Formik 및 Final Form과 같은 다른 신뢰할만한 대안들도 있지만 설정하는 데 조금 더 많은 코드가 필요할 수 있어요.

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

# 🥞 Next.js를 사용한 Full-Stack React 앱

React 프로젝트를 구축하는 방법을 선택할 때 가장 중요한 선택 중 하나는 Full-Stack React 프레임워크입니다.

이러한 프레임워크를 사용하면 사용자가 상호 작용하는 React 클라이언트뿐만 아니라 API를 생성하고 인증을 추가하는 서버 측도 구축할 수 있습니다.

가장 인기 있는 React 프레임워크는 Next.js이며 이유가 있습니다.

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

![React 로드맵 2024](/assets/img/🗺️-The-React-Roadmap-for-2024_7.png)

Next.js 13에서는 서버 컴포넌트를 제공해주었어요. 이것을 이용하면 React 코드를 서버에서 실행할 수 있게 되어요. 이렇게 하면 클라이언트로 보내는 JavaScript 양을 줄여 전반적으로 더 나은 사용자 경험을 제공할 수 있어요.

또한, 서버에서 데이터를 가져와 그 데이터를 React 컴포넌트에 초기 렌더링할 수 있게 되어요. 이렇게 하면 많은 로딩 스피너를 피할 수 있으면서도 애플리케이션에 싱글 페이지 앱과 유사한 경험을 제공할 수 있게 되어요.

Next.js의 단점은 React의 주요 개념과 충돌할 것 같은 많은 패턴을 포함하고 있다는 것이에요. 그러나 이것은 React 개발자로서 여러분의 삶을 더 쉽게 만들고 더 빠르게 빌드할 수 있도록 의도되었어요.

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

좋은 대안으로 Next.js의 Remix를 추천합니다. Remix는 곧 서버 컴포넌트를 도입할 예정이에요.

# 🏆 프로 페이셜 리엑트 개발자가 되어보세요

React를 처음부터 끝까지 배울 수 있는 최고의 자료를 찾고 계신가요?

✨ 소개합니다: 더 깊이있는 학습을 위한 React 부트캠프

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

부트캠프에는 React로 성공하기 위한 모든 리소스가 제공됩니다:

- 🎬 깊이 있는 비디오 200개 이상
- 🕹️ 실습형 React 도전 과제 100개 이상
- 🛠️ 인상적인 포트폴리오 프로젝트 5개 이상
- 📄 React 핵심 치트시트 10개 이상
- 🥾 완벽한 Next.js 부트캠프
- 🖼️ 애니메이션 비디오 시리즈 전체

아래를 클릭하여 직접 React 부트캠프를 체험해보세요.

![React Roadmap](/assets/img/🗺️-The-React-Roadmap-for-2024_8.png)

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

시작하려면 클릭하세요.
