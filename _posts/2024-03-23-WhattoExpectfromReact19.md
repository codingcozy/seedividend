---
title: "프론트엔드 개발자가 React 19에서 알아둬야할 중요한 내용들 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "What to Expect from React 19"
link: "https://medium.com/@onix_react/what-to-expect-from-react-19-3c7ed152f0e8"
isUpdated: true
---

![이미지](/assets/img/What-to-Expect-from-React-19_0.png)

# 새로운 기능

- React 컴파일러: React 코드를 일반 JavaScript로 변환하여 성능을 두 배로 향상시킬 수 있습니다.
- 액션: 웹 페이지 내 데이터 및 상호작용 처리를 간소화합니다.
- 서버 컴포넌트: 서버에서 렌더링하여 페이지 로드 속도를 높이고 SEO를 개선합니다.
- 자산 로딩: 자산을 백그라운드로 로드하여 페이지 전환이 더 부드럽게 이루어집니다.
- 문서 메타데이터: 컴포넌트로 쉽게 SEO를 향상시킬 수 있습니다.
- 웹 컴포넌트: 유연한 개발을 위해 향상된 호환성이 제공됩니다.
- 향상된 후크: 컴포넌트 라이프사이클 및 상태를 더욱 세밀하게 제어할 수 있습니다.

## React 컴파일러

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

원래 연구 프로젝트로 시작된 React 컴파일러는 Instagram.com에서 제작의 중요한 구성 요소로 발전했습니다. 이 혁신적인 도구는 React 애플리케이션에서 과도한 다시 렌더링 문제를 해결하며, 개발자들에게 일반적으로 고통스러운 점을 다룹니다. 기존의 메모이제이션 기술인 useMemo와 useCallback과 같은 수동 기법은 효과적이지만 번거롭고 오류가 발생할 수 있습니다.

React 컴파일러는 다른 접근 방식을 취하여, React의 핵심적인 메타 모델을 해치지 않으면서 코드를 자동으로 최적화합니다. JavaScript와 React 규칙을 이해해 효율적인 코드 리라이팅을 안전하게 수행합니다. 이를 통해 렌더링 성능을 크게 향상시켜 사용자 경험을 원활하게 만들어줍니다, 특히 자주 다시 렌더링되는 복잡한 데이터 시각화 구성 요소에서 효과를 발휘합니다. 컴파일러를 오픈 소스로 공개하고 Meta에서 사용을 확대하는 계획도 있습니다. 개발자들은 Strict Mode와 React의 ESLint 플러그인과 같은 도구로 코드 품질을 향상시키며, 응용 프로그램의 신뢰성과 확장성을 보장할 수 있습니다.

- useMemo, useCallback, memo

React 컴파일러가 있기 때문에 명시적인 메모이제이션 후크나 고차 컴포넌트가 필요없어졌습니다. 이제 컴파일러가 필요한 대로 컴포넌트와 값을 자동으로 최적화하고 메모이제이션하여 개발 프로세스를 간소화합니다.

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

- useContext

리액트 컴파일러는 useContext 훅의 대체로 작동하는 간소화된 use(Context) 훅을 소개합니다. 이 새로운 훅은 컴포넌트 내에서 컨텍스트 값을 소비하는 방법을 간소화하며, 컴파일러의 목표인 보일러플레이트 코드를 최소화하는 것과 일치합니다.

- React.lazy

React.lazy에서 떠나, React Suspense Compiler(RSC)는 비동기 컴포넌트 로딩을 위해 promise-as-child 구문을 사용합니다. 이 통합은 promise-as-child 컴포넌트 내에 컴포넌트를 캡슐화함으로써 원활한 로딩 경험을 보장합니다.

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

- forwardRef

리액트 컴파일러 접근 방식을 사용하면 'ref' 속성이 표준 프롭으로 변환되어 컴포넌트 계층 구조를 통해 원활하게 전파될 수 있습니다. 이 간소화는 ref 사용을 단순화시키며, 나머지 프롭과 마찬가지로 처리되어 forwardRef 래퍼가 필요 없어집니다.

- `Context.Provider` to

컨텍스트를 사용하는 구성 요소를 `Context.Provider` 내에 캡슐화하는 일반적인 방법은 더 직관적이고 간결한 구문인 `Context`로 대체되며, 컴포넌트 트리에 직접 통합됩니다. 이 간소화는 컨텍스트의 사용성을 향상시켜 더 직관적이고 간결한 접근 방식을 제공합니다.

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

- promise 발생시키기

React 컴파일러 방식에서는 promise를 사용한 오류 처리가 간소화됩니다. 개발자들은 직접 promise를 throw하는 대신 use(promise) hook을 활용하여 비동기 작업 및 오류를 보다 구조화된 방식으로 처리합니다. 이를 통해 비동기 작업과 관련 오류를 보다 조절된 방식으로 처리할 수 있습니다.

## 동작

React 동작은 클라이언트에서 서버로 데이터를 전송하는 방법에 대한 조사의 일환으로 개발되었습니다. 이 기능을 사용하면 개발자들은 `form/`과 같은 DOM 요소에 함수를 할당하여 데이터베이스 변이와 같은 작업을 원활하게 수행할 수 있습니다.

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
<form action={search}>
  <input name="query" />
  <button type="submit">Search</button>
</form>
```

React의 action 함수는 클라이언트 또는 서버 측 정의에서 유연성을 제공하여 동기적 또는 비동기적으로 작동할 수 있습니다. React는 useFormStatus 및 useFormState와 같은 훅을 제공하여 폼 작업 상태 및 응답에 접근할 수 있도록 데이터 제출 라이프사이클을 관리합니다.

기본적으로 전환 내에서 액션을 제출하여 처리 중에 페이지 상호 작용을 유지합니다. 이러한 액션은 async/await을 지원하여 업데이트 중에 대기 중인 UI 표시를 가능하게 합니다.

useOptimistic을 사용하면 임시 업데이트가 최종 상태 커밋 시 자동으로 복원됩니다. 이를 통해 낙관적인 클라이언트 측 상태 설정이 가능하며 필요할 경우 서버 데이터로 되돌아갈 수 있습니다.

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

라이브러리 작성자는 일관된 React 경험을 위해 사용자 정의 액션 props를 통합할 수 있습니다. React의 철학은 플랫폼 간의 기능 호환성을 보장하며, 앱 이전을 간소화합니다.

## 서버 구성 요소

React 19의 실험적인 기능인 서버 구성 요소는 React 구성 요소의 서버 측 렌더링을 가능하게 합니다. 이는 초기 페이지 로드가 빨라지고 SEO가 향상되어 검색 엔진이 콘텐츠를 쉽게 색인화할 수 있습니다.

## 자산 로딩

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

React 19를 이용하면 사진 및 기타 파일을 빠르게 준비할 수 있어요. 현재 페이지를 보고 있는 동안 백그라운드에서 이미 로딩을 시작해서 새로운 페이지로 이동할 때 기다릴 시간이 줄어들어요.

## 문서 메타데이터

새로운 `DocumentHead` 컴포넌트를 도입하여 페이지에 제목과 메타 태그를 추가하는 작업이 간단해졌어요. 이 컴포넌트를 사용하면 SEO를 최적화하고 사이트 전체에서 브랜드 일관성을 유지할 수 있어요. 이제 여러 페이지에 중복 코드를 사용할 필요가 없어요.

## 웹 컴포넌트

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

React 19은 웹 구성 요소와의 호환성을 크게 향상시켰어요. 이것은 React 프로젝트 내에서 웹 구성 요소를 매끄럽게 통합할 수 있는 길을 열어 주고, 개발 유연성을 향상시키며 별도의 웹 구성 요소 및 React 전용 라이브러리를 줄일 수도 있을 거예요.

## 향상된 Hooks

Hooks는 이제 이전보다 더 좋아졌어요. 코드가 실행되고 업데이트되는 시점을 더욱 잘 제어할 수 있어요. 이를 통해 웹사이트가 원할하게 작동하고 코드 작성이 조금 더 쉬워졌어요.

# React Canary의 새로운 기능

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

리액트 카나리는 공식 릴리스 이전에 안정적인 기능을 개별적으로 소개합니다. 이 새로운 접근 방식은 커뮤니티 입력을 받아 공개적으로 기능을 구축함으로써 사용자들이 완료 후가 아닌 완결 단계에서 그들에 대해 배울 수 있도록 합니다. 리액트 카나리에는 리액트 서버 컴포넌트, 자산 로딩, 문서 메타데이터 및 액션과 같은 주목할 만한 기능이 포함되어 있으며, react.dev에서 문서화된 내용도 함께 제공됩니다.

- 지시문: "use client" 및 "use server" 지시문은 재사용 가능한 컴포넌트를 위한 클라이언트 및 서버 환경 사이의 분할 지점을 정의하는 전체 스택 리액트 프레임워크 구축을 지원합니다.
- 문서 메타데이터: 이제 페이지에 제목 및 메타 태그와 같은 요소를 간편하게 추가할 수 있는 새로운 컴포넌트가 있습니다. 이를 통해 SEO를 개선하고 같은 코드를 반복하지 않고도 웹사이트 전반에 걸쳐 브랜드가 올바르게 표시되도록 도와줍니다.
- 자산 로딩: 리액트 19는 사진 및 기타 파일을 빠르게 준비하는 일을 쉽게 만들어줍니다. 사람들이 현재 페이지를 보는 동안 배경에서 파일을 로딩하기 시작합니다. 이는 새로운 페이지로 이동할 때 대기 시간이 줄어든다는 것을 의미합니다.
- 액션: 클라이언트에서 서버로 데이터 전송을 관리하기 위한 액션 추가와 함께 useFormStatus 및 useFormState와 같은 훅들, 그리고 useOptimistic을 사용한 낙관적 UI 업데이트가 포함되어 있습니다.

이러한 기능들은 서로 의존 관계가 있기 때문에 안정적인 채널에서 개별적으로 릴리스하기 어렵습니다. 리액트 카나리는 일관된 개발 및 안정적인 API의 점진적 릴리스를 용이하게 합니다. 현재 리액트 카나리에 포함된 기능 세트가 릴리스 준비를 마쳤으며, 이 접근 방식을 통해 개발자들이 제품 사용에 필요한 모든 것을 갖추고 있음이 보장됩니다.

# 결론

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

요약하자면, React 19는 React 생태계에서 중요한 발전을 이루었으며, 여러 가지 주목할 만한 기능과 개선 사항을 소개했습니다. 특히, React 컴파일러는 주목할 만한 추가 요소로, useMemo 및 useCallback과 유사한 자동 생성을 통해 다시 렌더링 효율을 최적화합니다. 게다가 Action 및 useOptimistic은 각각 데이터 제출 및 낙관적 상태 업데이트를 관리하는 데 도움이 됩니다. 이에 더해 Directives, Document Metadata 및 Asset Loading은 개발자들에게 향상된 제어와 유연성을 제공합니다. 총괄해서, React 19는 React를 더 효율적이고 견고하며 개발자 친화적으로 만드는 큰 발전을 상징합니다.
