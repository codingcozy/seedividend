---
title: "Astro 기반 문서에 다중 버전 지원 추가하기"
description: ""
coverImage: "/assets/img/2024-06-20-AddingMulti-VersionSupporttoYourAstro-basedDocumentation_0.png"
date: 2024-06-20 04:15
ogImage: 
  url: /assets/img/2024-06-20-AddingMulti-VersionSupporttoYourAstro-basedDocumentation_0.png
tag: Tech
originalTitle: "Adding Multi-Version Support to Your Astro-based Documentation"
link: "https://medium.com/bitsrc/adding-multi-version-support-to-your-astro-based-documentation-429aa2ca7089"
---


## 같은 문서 안에 여러 버전을 가질 수 있는 방법은 무엇인가요?

![Image](/assets/img/2024-06-20-AddingMulti-VersionSupporttoYourAstro-basedDocumentation_0.png)

현재 Astro는 매우 인기가 높습니다. 저에게 물어봐도 마찬가지에요. 이 프레임워크를 사용하면 개발자들이 유연하고 강력한 정적 웹사이트를 만들 수 있습니다.

다른 곳에서 이주할 때 여러 렌더링 라이브러리를 통합할 수 있는 능력은 채택을 도와 줍니다.

<div class="content-ad"></div>

그리고 문서 사이트를 만드는 것은 아마도 지금 이 시점에서는 사소한 문제일지 모르지만, 최근에 해결해야 했던 문제인 문서 사이트에 다중 버전 지원을 추가하는 방법에 대해 다루고 싶었습니다.

그러니 시작해 봅시다.

# 문제

문서 사이트를 구축하는 것은 많은 페이지로 이루어진 정적 사이트를 구축하는 것 이상을 의미하지 않습니다.

<div class="content-ad"></div>

용하기 쉬우면 Astro를 사용하면 간단합니다.

그러나 제품 버전이 변경될 때 페이지가 변경되면 어떻게 됩니까?

그럴 때 해결해야할 두 가지 주요 문제가 있습니다:

- 쉬운 문제: 라우팅 프로세스에 버전을 추가합니다. 버전 간에 전환할 수 있어야하며, Astro는 파일 경로 기반의 라우팅을 사용하므로 각 버전에 대한 폴더를 만들어야 합니다.
- 어려운 문제: 현재 버전에 맞게 모든 상대적 링크를 처리하고 내부 탐색을 일관되게 유지해야 합니다 (현재 선택된 버전에 따라 동일한 링크가 다른 버전으로 리디렉트되어야 합니다).

<div class="content-ad"></div>

이 문제들은 사소해 보일 수 있지만 쉽게 해결되지 않습니다.

두 기능을 모두 구현하는 방법을 살펴보겠습니다.

# 문제 해결

해결해야 할 문제는 두 가지이므로 한 가지씩 해결해 봅시다.

<div class="content-ad"></div>

## 라우팅 프로세스에 버전 추가하기

가장 쉬운 방법은 /docs/getting-started와 같은 경로에서 /docs/1.1.0/getting-started로 이동하는 것을 확인하는 것입니다.

이렇게 하면 해당 페이지의 내용으로 사용할 getting-started.mdx 파일을 여전히 참조할 수 있고, 해당 파일에 접근하려면 1.1.0이라는 폴더 안에 넣어야 합니다.

이것은 단순한 것으로 보이네요. 해야 할 일은 폴더 구조를 변경하는 것뿐입니다. 따라서 이렇게 변경해야 합니다:

<div class="content-ad"></div>

```js
/
 |_ docs
     |_ v1.0.0
     |  |_ getting-started.mdx
     |
     |_ v2.0.0
        |_ getting-started.mdx
```

위와 같이 변경해 주세요. 변경 후에 Astro가 콘텐츠를 찾을 수 있도록 알려주었으며, 이제 Astro는 제대로 동작할 것입니다. 이제 npm run build를 실행하면 모든 것이 제대로 빌드되지만 새로운 폴더에 생성될 것입니다.

<div class="content-ad"></div>

하지만 아직 끝나지 않았어요. 이것은 1단계의 반만이에요. 우리는 아직 버전 지원의 중요한 부분을 놓치고 있어요. 바로 버전 전환기에요.

사용자가 버전을 변경할 수 있는 방법을 추가해야 해요. 그래서 그 코드를 살펴보도록 해요:

원하는 곳에 추가할 수 있는 간단한 컴포넌트에요. 저는 대개 문서 사이트에 추가하는 헤더에 추가하는 것을 좋아해요. 하지만 당신이 원하는 대로 사용할 수 있어요.

코드를 보면, 컴포넌트는 VERSIONS 배열 내에 나열된 버전을 기반으로 버전 드롭다운을 그려줄 거에요. 거기서 표시할 레이블과 경로를 가져올 거에요.

<div class="content-ad"></div>

최신 버전에서는 경로가 없다는 것을 주목해주세요. 이렇게 하면 최신 버전을 루트 폴더 아래의 docs 폴더에 유지하고, 버전이 명시된 경우에만 버전 폴더를 사용할 수 있게 됩니다.

그런 다음 JavaScript 코드의 일부로 selectCurrentVersion 함수가 실행됩니다. 이 함수는 URL에서 버전 번호를 가져와 올바른 옵션 요소를 선택합니다.

마지막으로 드롭다운에서 onChange 이벤트가 발생하면 updateLocation 함수를 호출합니다. 이 함수는 선택한 버전으로 현재 경로 내의 현재 버전을 덮어씁니다. 그런 다음 사용자를 새 URL로 리디렉션합니다.

그런데 잠깐, 이제 새 버전을 릴리스할 때마다 문서 링크를 모두 확인하고 사용자가 버전 간을 이동하는 것을 방지하기 위해 내부 링크를 업데이트해야 한다는 말인가요?

<div class="content-ad"></div>

그렇게하면 정말 귀찮을 텐데, 특히 문서가 충분히 큰 경우 말이죠. 그래서 이에 대해 처리할 방법을 찾아보겠습니다.

## 모든 상대 링크 처리

문서에 추가하는 하드코딩된 경로에 실제 문서 버전을 유지하는 것을 피할 방법을 찾아야 합니다.

왜냐하면 그렇게 한다면 각 새 버전을 릴리스할 때마다 최신 버전의 문서를 복제해야 하기 때문에 매번 검색 및 교체 프로세스를 실행해야 합니다.

<div class="content-ad"></div>

그리고 우리가 그것을 잊어버리거나 어떠한 이유로 인해, 검색 패턴이 모든 URL을 포착하지 못하면, 결함이 있는 문서 사이트가 공개될 수 있습니다.

우리는 항상 현재 버전을 생각하고, 대안 버전의 문서가 없는 것처럼 다른 섹션에 링크를 걸어야 한다는 방법을 찾아야 합니다.

내가 생각해낸 해결책은 브라우저에서 URL을 직접 수정하는 스크립트를 추가하는 것이었습니다:

그 스크립트를 내 메인 레이아웃 파일의 하단에 넣었습니다. 그렇게 하면 컨텐츠가 로드될 때 스크립트가 실행됩니다.

<div class="content-ad"></div>

해당 코드는 모든 링크를 실행하고, 사이트 도메인 내의 장소로 리디렉션하는 링크를 찾습니다 (이상적으로 "docs.yourdomain.com"과 같은 것) 그 중에서만 현재 버전이 있는 새 링크로 변경합니다.

다시 말해, /docs/getting-started와 같은 상대적 링크를 가져와 현재 선택된 버전에 맞게 /docs/v1.0.0/getting-started로 동적으로 변환합니다. 이렇게하면 모든 상대적 링크 (내비게이션에 사용되는 링크)가 현재 선택된 버전에 자동으로 맞춰집니다.

그게 전부에요. Astro는 정적 사이트에 JavaScript를 추가하고 컴포넌트를 만들 때 매우 유연성을 제공합니다.

<div class="content-ad"></div>

이 예제들은 두 가지 다른 사용 사례를 보여줍니다. 하나는 동적 부분이 있는 컴포넌트가 생성될 때이며, 서버에서 드롭다운이 렌더링되더라도 여전히 작동하도록하기 위해 추가적인 JS 코드를 추가해야 합니다.

다른 한편으로, 모든 서버 사이드 렌더링된 링크는 동적으로 업데이트되어야 합니다(사실 내부 네비게이션만 해당됩니다), 그래서 해당 작업을 수행하는 스크립트를 페이지에 추가했습니다. 우리는 다른 UI 라이브러리를 사용할 필요가 없었습니다.

이러한 유형의 문제를 이전에 마주쳤나요? 그 문제를 어떻게 해결했나요?

# 레고처럼 재사용 가능한 컴포넌트로 앱을 개발하세요

<div class="content-ad"></div>


![image](/assets/img/2024-06-20-AddingMulti-VersionSupporttoYourAstro-basedDocumentation_1.png)

Bit’s open-source tool helps over 250,000 developers build apps with components.

Easily turn any UI, feature, or page into a reusable component — and share it across your applications. Collaborate more efficiently and build faster.

→ Learn more


<div class="content-ad"></div>

앱을 컴포넌트로 분리하여 앱 개발을 쉽게 만들고, 원하는 작업을 위한 최상의 경험을 즐기세요:

## → 마이크로 프론트엔드

## → 디자인 시스템

## → 코드 공유 및 재사용

<div class="content-ad"></div>

## → Monorepo

# Learn more