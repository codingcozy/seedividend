---
title: "HTMX vs React 비교 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "HTMX vs React A Complete Comparison"
link: "https://medium.com/@semaphoreci/htmx-vs-react-a-complete-comparison-84c47fbb0198"
---



HTMX의 궁극적인 목표는 JavaScript가 필요하지 않고 HTML 내에서 직접 현대적인 브라우저 상호 작용을 제공하는 것입니다. 비교적 새로운 라이브러리이지만, 2020년 말에 처음 출시된 이후 IT 웹 커뮤니티의 주목을 끌고 있습니다.

2023년 JavaScript Rising Stars "프론트엔드 프레임워크" 부문에서 2위(React 바로 뒤)를 차지하며 GitHub Accelerator에도 참여하고 GitHub에서 2만 개 이상의 스타를 받아 HTMX는 빠르게 인기를 얻고 있습니다. 이에 대해 왜 이렇게 많은 관심이 생기고 있는 걸까요? React를 대체할 수 있는 가능성이 있을까요? 알아봅시다!

HTMX vs React 가이드에서는 HTMX를 선택한 이유, 무엇인지, 어떤 기능을 제공하며 React와의 성능, 커뮤니티, 기능 등에서 비교하는 방법을 알아볼 수 있습니다.

# HTMX vs React 요약

<div class="content-ad"></div>

아래 요약 표를 확인하여 HTMX와 React 비교에 대해 바로 알아보세요:

HTMXReact개발자Big Sky SoftwareMeta오픈 소스✅✅GitHub 별점29k+218k+크기2.9 kB6.4 kB구문HTML 기반, 사용자 정의 속성 사용JSX 기반, JavaScript의 확장 버전목표현대적 상호 작용 기능을 직접 HTML에 추가컴포넌트 기반의 완전한 기능을 갖춘 UI JavaScript 라이브러리학습 곡섬진접거대AJAX 요청 및 기타 일부 기능조합성, 단방향 데이터 바인딩, 상태 관리, 훅 등 성능뛰어남좋음, 특히 대규모 앱이나 복잡한 웹 애플리케이션 통합기존 HTML 페이지에 임베드 가능기존 HTML 페이지에 임베드 가능하며 주로 JavaScript 기반 프로젝트에서 사용커뮤니티소규모이 상위 시장 생태계소매우 풍부

# React로 나아가는 과정: jQuery에서 현대 웹 프레임워크로

웹 개발 초기에는 개발자가 AJAX 요청, DOM 조작 및 이벤트 처리를 위해 jQuery에 의존했습니다. 시간이 지나면서 온라인 애플리케이션이 더 현대적, 구조화되고 확장 가능해졌습니다. Angular, React 및 Vue와 같은 프레임워크 및 라이브러리가 차이를 만들었습니다.

<div class="content-ad"></div>

React는 컴포넌트 기반 아키텍처를 소개하여 웹 개발을 영원히 변화시켰어요. UI에 대한 선언적 접근과 일방향 데이터 흐름은 웹 개발을 간단하고 재사용 가능하며 유지보수성 있게 만들어주었죠. 이러한 측면들로 인해 React는 동적이고 반응적이며 대화형 웹 애플리케이션을 구축하는 데 가장 적합한 솔루션으로 자리매김했어요.

# HTMX로의 진화: 웹 프레임워크에서 현대적인 HTML로

React, Vue, Angular와 같은 웹 프레임워크들은 구조화된 웹 애플리케이션을 구축하는 데 큰 도움이 되지만, 그 복잡성은 단순함을 추구하는 개발자에게는 부담스러울 수 있어요. 이때 HTMX가 등장하죠!

HTMX는 React에서처럼 현대적 상호작용성을 위한 가벼운 솔루션이지만, jQuery와 같은 과잉 부담은 없는 간단한 통합을 제공해줘요. HTMX는 사용자 정의 속성으로 HTML을 확장하여 JavaScript 코드 없이도 AJAX 요청을 가능하게 합니다. HTMX의 아이디어는 개발자가 익숙한 HTML을 버리지 않고도 웹의 마법 속으로 들어갈 수 있도록 간단하게 유지하는 것이죠.

<div class="content-ad"></div>

HTMX는 더 복잡한 프론트엔드 프레임워크가 주를 이루는 세상에서 간결하고 유연한 대안으로 자리 잡고 있어요. 아래 섹션에서 더 자세히 알아보세요.

# HTMX: 상호작용의 새로운, 현대적인 방식

HTMX는 가벼우며 종속성이 없는 확장 가능한 JavaScript 프론트엔드 라이브러리로, 최신 브라우저 기능을 HTML에서 직접 이용할 수 있게 해줘요. 구체적으로 말하면, AJAX 요청, CSS 전환, 웹 소켓 및 서버 전송 이벤트를 HTML 코드에서 직접 다룰 수 있게 해줘요.

이 라이브러리를 사용하면 특별한 HTML 속성을 설정하는 것만으로 대부분의 기능에 액세스할 수 있어요. JavaScript 한 줄도 쓸 필요 없이요. 이렇게 HTMX는 HTML을 다음 수준으로 끌어올려서 완전한 하이퍼텍스트로 만들어줘요.

<div class="content-ad"></div>

이제 라이브러리가 제공하는 내용을 일부 HTMX 예제를 통해 살펴보겠습니다.

## AJAX 요청 트리거

HTMX의 주요 개념은 HTML에서 직접 AJAX 요청을 보낼 수 있는 능력입니다. 이것은 다음 속성들 덕분에 가능해집니다:

- hx-get: 주어진 URL로 GET 요청을 보냅니다.
- hx-post: 주어진 URL로 POST 요청을 보냅니다.
- hx-put: 주어진 URL로 PUT 요청을 보냅니다.
- hx-patch: 주어진 URL로 PATCH 요청을 보냅니다.
- hx-delete: 주어진 URL로 DELETE 요청을 보냅니다.

<div class="content-ad"></div>

HTMX 속성 중 하나를 갖는 HTML 요소가 트리거되면 지정된 유형의 AJAX 요청이 해당 URL로 전송됩니다. 기본적으로 요소는 "자연스러운" 이벤트(예: `input`, `textarea`, 및 `select`의 경우에는 변경, `form`의 경우에는 제출, 그 외에는 클릭)에 의해 트리거됩니다. hx-trigger 속성을 사용하여 이 동작을 사용자 정의할 수도 있습니다.

이제 아래의 HTMX 예제를 살펴보겠습니다:

```js
<div hx-get="/users">사용자 보기</div>
```

이렇게 브라우저에 알립니다:

<div class="content-ad"></div>

# 쿼리 매개변수 및 본문 데이터

HTMX가 쿼리 매개변수 및 본문 데이터를 설정하는 방법은 HTTP 요청 유형에 따라 다릅니다:

- GET 요청: 기본적으로 hx-get은 AJAX 요청에 자동으로 어떠한 쿼리 매개변수도 포함시키지 않습니다. 쿼리 매개변수를 설정하려면 hx-get에 전달된 URL에 명시하십시오. 그렇지 않으면 hx-params 속성을 사용하여 HTMX의 기본 동작을 재정의하십시오.
- GET이 아닌 요청: 요소가 `form`인 경우 AJAX 요청의 본문에는 해당 입력 값의 이름 속성을 매개변수 이름으로 사용하여 모든 입력 값이 포함됩니다. `form`이 아닌 경우 가장 가까운 포함 `form`의 모든 입력 값이 본문에 포함됩니다. 그렇지 않은 경우, 요소가 값을 속성으로 가지고 있다면 해당 값을 본문에 사용합니다. 다른 요소의 값을 본문에 추가하려면 값을 원하는 모든 요소의 CSS 선택기와 함께 hx-include 속성을 사용하십시오. 그런 다음 hx-params 속성을 사용하여 일부 본문 매개변수를 걸러내십시오. 또한 사용자 정의 htmx:configRequest 이벤트 핸들러를 작성하여 본문 정의 논리를 프로그래밍적으로 수정할 수 있습니다.

<div class="content-ad"></div>

# AJAX 결과 처리

이전에 언급한 대로, HTMX는 AJAX 요청을 트리거한 요소의 내부 HTML을 서버가 반환한 HTML 콘텐츠로 대체합니다. hx-swap 및 hx-target 속성을 사용하여 이 동작을 사용자 정의할 수 있습니다:

- hx-swap은 서버가 반환한 HTML을 처리하는 방법을 정의하며 innerHTML(기본값), outerHTML, beforebegin, afterbegin, beforeend, afterend, delete, none 중 하나의 값을 사용합니다.
- hx-target은 CSS 선택기를 허용하고 선택된 요소에 스왑 로직을 적용하도록 HTMX에 지시합니다.

이제 아래 HTMX 스니펫을 살펴보세요:

<div class="content-ad"></div>

```js
<button hx-post="/tasks" hx-swap=".todo-list" hx-target="afterend">
  할 일 추가
</button>
```

이를 브라우저에 알리는 내용입니다:

대박이네요! 이제 HTMX의 기본 및 작동 원리에 대해 탐색했습니다. 이 라이브러리에서 지원하는 일부 기능에 불과함을 명심하세요. 더 많은 정보를 찾아보려면 문서를 살펴보세요.

# HTMX 대 React: 두 가지 웹 기술 비교

<div class="content-ad"></div>

HTMX에 대해 알고 작동 방식을 알았으니, 프론트엔드 웹 개발 라이브러리의 석궁 왕인 React와 비교해보겠습니다. 이 섹션에서는 HTMX와 React 중 어느 쪽이 더 나은지 결정할 때 고려해야할 중요한 측면을 탐색할 것입니다.

이제 HTMX 대 React 비교에 대해 자세히 살펴보겠습니다!

# 접근 방식

- HTMX: HTML을 확장하여 마크업에서 서버와 직접 상호작용할 수 있는 기능을 제공합니다. 간결성, 간결함, 가독성을 중요시합니다:

<div class="content-ad"></div>

```js
<div hx-get="/hello-world">클릭해주세요!</div>
```

- React: JSX로 작성된 재사용 가능한 구성 요소에 기반을 둔 사용자 인터페이스를 구축하는 완전한 기능을 갖춘 JavaScript 라이브러리입니다.

```js
import React, { useState } from "react";
```

```js
const HelloWorldComponent = () => {
  const [responseData, setResponseData] = useState(null);
  const handleClick = () => {
    fetch("/hello-world")
      .then((response) => response.text())
      .then((data) => {
        setResponseData(data);
      });
  };
  return (
    <div onClick={handleClick}>
      {responseData ? <>{responseData}</> : "클릭해주세요!"}
    </div>
  );
};
export default HelloWorldComponent;
```

<div class="content-ad"></div>

# 학습 곡선

- HTMX: HTML 기반 구문과 방식을 사용하여 HTMX는 학습 곡선이 매우 부드럽습니다. 기존의 전통적인 웹 개발에 익숙한 개발자들은 몇 일만에 이를 마스터할 수 있으며, 초보자들도 첫날부터 사용을 시작할 수 있습니다.
- React: 웹 개발에 대한 독특한 방식 때문에 React는 학습 곡선이 가파릅니다. 첫 번째 React 애플리케이션을 만들기 전에 SPA(단일 페이지 응용 프로그램), Virtual DOM, JSX, 상태 관리, 프롭스, 재렌더링 등의 개념을 이해해야 합니다. 이는 일부 초보자들에게는 압도적일 수 있습니다.

# 특징

- HTMX: 라이브러리 뒤의 핵심 개념은 JavaScript 코드가 필요하지 않은 HTML에서 AJAX 호출을 가능하게 하는 것으로 요약될 수 있습니다. 다른 멋진 기능들이 언급될 수 있지만, 그것이 HTMX가 제공하는 것을 대부분 요약합니다.
- React: React를 인기있게 만든 몇 가지 기능은 코드 재사용을 기반으로 한 구성 요소 기반 아키텍처, UI 개발을 쉽게 하는 JSX 구문, 견고한 상태 관리, 훅, 클라이언트 및 서버 측 렌더링을 지원하는 효율적인 Virtual DOM, CSS-in-JS 지원 등이 있습니다.

<div class="content-ad"></div>

# 성능

- HTMX: 가벼우면서 의존성이 없는 특성으로 인해 HTMX를 이용하는 웹 페이지는 초기 페이지 로딩이 빠르며 클라이언트 측 처리가 줄어듭니다. 일반적으로, HTMX는 간단한 상호작용을 가진 애플리케이션에 대해 우수한 성능을 발휘합니다.
- React: React로 구축된 SPA 애플리케이션은 일반적으로 많은 양의 JavaScript를 포함합니다. 이는 더 높은 네트워크 이용률과 클라이언트 측 렌더링 시간으로 이어집니다. 그러나 가상 DOM 및 효율적인 중복 처리 알고리즘 덕분에 React는 UI를 빠르게 업데이트할 수 있어 대규모 애플리케이션에 적합합니다.

# 통합

- HTMX: 어떤 HTML 웹 페이지에도 삽입할 수 있습니다. HTMX는 원시 HTML 콘텐츠를 반환할 수 있는 백엔드 기술과 자연스럽게 통합되어 있으며 Node.js, Django, Laravel, Spring Boot, Flask 등과 같은 기술과 함께 사용될 수 있습니다.
- React: 프론트엔드 라이브러리인 React는 기존 사이트에 기술적으로 통합할 수 있습니다. 동시에 React를 통합하는 데는 추가 구성이 필요할 수 있으며 특히 JavaScript 중심이 아닌 프론트엔드 프로젝트의 경우 더 많은 구성이 필요할 수 있습니다.

<div class="content-ad"></div>

HTMX와 React는 동일한 프로젝트에서 함께 사용할 수 있습니다. 이는 React와 HTMX를 웹 페이지의 서로 다른 부분에서 사용하거나 HTMX 속성을 활용하는 React 컴포넌트를 가질 수 있다는 것을 의미합니다.

# 사용 사례

- HTMX: 간단하고 현대적이며 동적 상호 작용이 필요한 프로젝트에 가장 적합합니다. HTMX는 전체 프론트엔드 프레임워크의 모든 고급 기능이 필요하지 않을 때 가벼우면서도 효율적인 옵션입니다. 또한 전용 클라이언트 측 JavaScript 로직을 작성하지 않고도 상호 작용형 HTML 페이지를 제공하고자 하는 백엔드 개발자에게 이상적입니다.
- React: 사용자 경험을 향상시키고 복잡한 상태를 처리해야 하는 단일 페이지 어플리케이션 및 복잡한 웹 어플리케이션을 개발하는 데 가장 적합합니다. 여러 프로젝트에서 UI 컴포넌트를 재사용하려는 대규모 팀에게도 좋은 옵션입니다.

React에서 HTMX로 이전하는 것은 가능하며 코드베이스를 67% 줄일 수 있습니다. 그러나 React를 인기 있는 이유인 고급 상태 관리와 같은 모든 기능이 필요하지 않을 때에만 권장됩니다.

<div class="content-ad"></div>

# 커뮤니티

- HTMX: HTMX의 첫 릴리스는 2020년 말에 이루어졌기 때문에 React만큼 인기가 높을 것이라 기대할 수는 없습니다. 따라서 많은 안내서, 튜토리얼 및 안내 영상을 찾기 어려울 것입니다. 그럼에도 불구하고, 해당 프로젝트는 이미 GitHub에서 2만9천개 이상의 스타를 받았으며 근처에서 많은 소문이 나고 있습니다.
- React: 전 세계 수백만 개발자와 GitHub에서 21만8천 개 이상의 스타를 받은 React는 웹 개발 라이브러리의 무패 챔피언입니다. Statista 조사에 따르면 React는 전체 프런트엔드 웹 라이브러리 사용량의 40% 이상을 차지하며, React에 대한 수십만 개의 튜토리얼, 기사 및 비디오가 있어 당연히도 감탄할 만합니다.

# 생태계

- HTMX: 물론 라이브러리 자체는 확장 가능하지만, 프로젝트는 비교적 새로운 상태이며 HTMX 라이브러리와 유틸리티가 많이 없습니다. 본 글 작성 시점에서 npm의 htmx 태그에는 35개의 패키지만 있습니다.
- React: npm에서만 React 태그가 6,000개가 넘는 라이브러리를 포함합니다. 이것은 React 관련 태그 중 하나이며, 이와 호환되는 수십 수천 개의 라이브러리를 찾을 수 있습니다.

<div class="content-ad"></div>

# HTMX와 React 중 어떤 프론트엔드 라이브러리를 선택해야 할까요?

두 기술을 비교할 때는 절대적인 승자가 없습니다. HTMX와 React는 모두 우수한 프론트엔드 웹 개발 라이브러리이며, 어느 것을 선택할지는 프로젝트의 요구 사항과 목표에 따라 다릅니다.

상태 관리가 필요한 웹 애플리케이션, 복잡한 기능을 제공하며 재사용 가능한 구성 요소가 필요한 경우 React가 더 적합합니다. 간단한 상호 작용과 특별한 고급 기능이 필요하지 않은 사이트를 구축할 때는 HTMX가 더 나은 해결책일 수 있습니다.

HTMX와 React 사이에서 정보를 기반으로 결정을 내릴 수 있도록 두 라이브러리의 장단점을 살펴보겠습니다!

<div class="content-ad"></div>

# HTMX: 장단점

👍 장점:

- 간단하고 직관적인 HTML 기반 구문.
- 몇 가지 HTML 속성만 사용하여 AJAX 요청 및 DOM 업데이트 가능.
- JavaScript 없이 HTML 내에서 동적 상호 작용 가능.
- 기존 HTML 웹 페이지에 쉽게 통합 가능.
- 단 몇 KB만을 무게로 하는 가벼운 라이브러리.

👎 단점:

<div class="content-ad"></div>

- 백엔드 UI 엔드포인트가 필요하여 원시 HTML을 반환하며, 따라서 프론트엔드와 더 밀접하게 관련됨.
- 아직 상대적으로 새로운 기술.

# React: 장단점

👍 장점:

- JSX로 작성된 재사용 가능한 컴포넌트를 사용하여 UI 구조화.
- 복잡한 상태 관리 및 다른 유용한 기능 지원.
- 전 세계에서 가장 많이 사용되는 프론트엔드 웹 라이브러리.
- Meta에 의해 개발되고 유지보수됨.
- 백엔드에 대한 견해가 없음.

<div class="content-ad"></div>

👎 단점:

- 배우고 숙달하기가 그리 쉽지 않습니다.
- 비 JavaScript 기반 프로젝트로 통합하기 어려울 수 있습니다.

# 결론

본 문서 HTMX vs React에서는 HTMX가 무엇이고 어떻게 작동하는지, 그리고 React와 어떻게 경쟁하는지를 배웠습니다. HTMX는 일반적인 웹 프레임워크에서 소개되는 복잡성 없이 현대적인 HTML 상호작용을 가능하게 합니다. HTMX의 미래가 밝다고 하더라도, HTMX가 React를 대체하기 위한 것은 아닙니다. HTMX가 빛을 발하는 부분을 더 잘 이해하기 위해 공식 사이트에서 제공하는 HTMX 예제 목록을 확인해보세요.

<div class="content-ad"></div>

두 라이브러리는 정반대로, 함께 공존할 수 있고 서로 다른 사용 사례를 대상으로 할 수 있습니다. 여기서 배운대로, React는 사용자 경험이 풍부하고 복잡한 기능을 가진 웹 애플리케이션에 이상적이며, HTMX는 간단한 상호 작용이 필요한 웹 페이지에 더 적합합니다.

2024년 2월 22일에 https://semaphoreci.com 에서 원문이 게시되었습니다.
