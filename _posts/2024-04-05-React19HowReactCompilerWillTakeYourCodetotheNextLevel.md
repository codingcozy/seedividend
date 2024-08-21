---
title: "리액트 코드 작성 방식을 뒤바꾼 React19"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "React 19 How React Compiler Will Take Your Code to the Next Level"
link: "https://medium.com/@malikchohra/react-19-how-react-compiler-will-take-your-code-to-the-next-level-8a89702d8860"
isUpdated: true
---

# 소개

React 19의 매우 기대되는 릴리스는 React 코드 작성 방식을 혁신할 것으로 예상됩니다. 이번 업데이트는 그냥 또 다른 업데이트가 아닙니다. 이는 전례없는 React 컴파일러를 소개하는데, 이는 개발을 최적화하여 이전에 hooks에서 처리하던 작업을 자동화하는 혁신적인 변화를 약속합니다. 이 기사는 React 컴파일러의 잠재력을 탐구하고 React 개발에 접근하는 방식을 변화시킬 수 있는 방법을 탐구합니다.

이 재작성은 React 19의 정확한 영향이나 릴리스 날짜에 대한 주장을 피하며, 아직 개발 중이기 때문에 React 컴파일러의 가능성에 초점을 맞춥니다. 또한 해당 기사가 hooks를 컴파일러로 대체하는 데 중점을 둠을 직접 언급합니다.

# 새로운 React가 예전 방식에 어떤 영향을 줄까요?

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

React 19에 추가된 주요 변경 사항은 다음과 같습니다:

### useMemo, useCallback, memo:

이러한 최적화 도구는 컴포넌트와 값의 메모이제이션을 위한 것으로, React 컴파일러에 의해 대체되었습니다. 컴파일러는 필요에 따라 컴포넌트와 값의 최적화 및 메모이제이션을 자동으로 처리하여 명시적 메모이제이션 후크나 하이어오더 컴포넌트가 필요하지 않게 되었습니다.

### forwardRef:

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

리액트 컴파일러 방식에서 ref는 컴포넌트 계층 구조를 통해 전달할 수 있는 일반 prop으로 변환됩니다. 이는 ref의 사용을 간소화시켜주며, 다른 prop과 마찬가지로 처리되어 forwardRef 래퍼가 필요하지 않습니다.

## React.lazy:

리액트 Suspense 컴파일러(RSC)와 promise-as-child 구문을 사용하여 컴포넌트를 지연 로딩하는 대신, RSC를 사용하여 구성 요소를 비동기적으로 로드하고 컴포넌트를 promise-as-child 컴포넌트로 래핑하여 원활한 로드 경험을 보장합니다.

## useContext:

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

리액트 컴파일러는 useContext 훅을 대체하기 위한 새로운 use(Context) 훅을 소개합니다. 이 훅을 사용하면 컴포넌트 내에서 컨텍스트 값을 간단하게 사용할 수 있으며, 컴파일러가 보일러플레이트 코드를 줄이는 것을 목표로 하고 있습니다.

## 프라미스 처리:

프라미스를 사용한 오류 처리가 리액트 컴파일러 방식에서 간단해졌습니다. 직접 프라미스를 throw 하는 대신, use(promise) 훅을 활용하여 비동기 작업과 오류를 더욱 효과적으로 제어할 수 있습니다.

## `<Context.Provider>`를 `<Context>`로 변경:

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

기존에는 `Context.Provider`를 사용하여 컨텍스트를 사용하는 컴포넌트를 감싸는 전통적인 접근 방식은 간단한 구문 `Context`로 직접 컴포넌트 트리 내에서 대체되었습니다. 이렇게 하면 컨텍스트를 사용하는 방법이 더 직관적이고 간결해집니다.

# 리액트 컴파일러로 깔끔한 코드 예제

우리가 API를 호출하여 제품 목록을 가져와서 뷰 내부에 매핑하는 예를 살펴보겠습니다

지금은 이렇게 작성됩니다:

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

<img src="/assets/img/React19HowReactCompilerWillTakeYourCodetotheNextLevel_0.png" />

리액트 19 컴파일러가 소개되면, 우리의 코드는 이렇게 변할 것입니다:

<img src="/assets/img/React19HowReactCompilerWillTakeYourCodetotheNextLevel_1.png" />

PS: App 컨테이너에는 에러 및 로딩 컴포넌트 처리를 포함해야 합니다. 이것은 어떻게 구현되어야 하는지에 대한 예시입니다

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

<img src="/assets/img/React19HowReactCompilerWillTakeYourCodetotheNextLevel_2.png" />

# 결론

기술의 변화하는 분위기 속에서 최신 정보를 따라가는 것은 어렵습니다. 이를 위해 최신 정보를 얻기 위해 사람들, 블로그 또는 기사들을 따라 가야 합니다.

저는 소셜 미디어에서 React, React Native 및 TypeScript에 관한 소식을 공유하고 있습니다. 최신 정보를 얻으려면 저를 팔로우해주세요. LinkedIn 또는 Medium에서 저를 팔로우하세요.

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

#keepLearning #keepGrowing #react #react19
