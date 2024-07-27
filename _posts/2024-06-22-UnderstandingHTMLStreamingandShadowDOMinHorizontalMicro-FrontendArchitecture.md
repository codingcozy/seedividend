---
title: "수평 마이크로 프론트엔드 아키텍처에서 HTML 스트리밍 및 Shadow DOM 이해하기"
description: ""
coverImage: "/assets/img/2024-06-22-UnderstandingHTMLStreamingandShadowDOMinHorizontalMicro-FrontendArchitecture_0.png"
date: 2024-06-22 03:53
ogImage: 
  url: /assets/img/2024-06-22-UnderstandingHTMLStreamingandShadowDOMinHorizontalMicro-FrontendArchitecture_0.png
tag: Tech
originalTitle: "Understanding HTML Streaming and Shadow DOM in Horizontal Micro-Frontend Architecture"
link: "https://medium.com/stackademic/understanding-html-streaming-and-shadow-dom-in-horizontal-micro-frontend-architecture-51cdada138f5"
---


웹 개발 분야에서, 마이크로 프론트엔드 개념은 거대한 응용프로그램을 작은 관리 가능한 부분으로 분해하는 능력으로 인해 상당한 인기를 얻고 있습니다. 마이크로 프론트엔드 아키텍처에서 자주 사용되는 두 가지 중요한 기술은 HTML 스트리밍과 쉐도우 DOM입니다. 이 글에서는 이러한 기술들이 무엇을 의미하는지, 서로 어떻게 보완하는지, 코드 예제를 제공하고 수평적인 마이크로 프론트엔드 아키텍처에서의 장단점에 대해 논의할 것입니다.

# HTML 스트리밍:

HTML 스트리밍 또는 서버 측 렌더링 (SSR)은 서버에서 생성되는 대로 HTML을 점진적으로 클라이언트로 전송하는 것을 포함합니다. 이 접근 방식은 브라우저가 내용을 점진적으로 렌더링하도록 허용함으로써 인식된 성능을 향상시킵니다. 이 과정에서 서버는 페이지의 나머지 부분을 처리하고 있는 동안 브라우저가 내용을 점진적으로 렌더링할 수 있습니다.

<div class="content-ad"></div>

장점

- 지각되는 성능 향상: 사용자가 전체 페이지가 완전히 로드되기 전에도 콘텐츠를 더 빨리 볼 수 있습니다.
- SEO에 유리: 검색 엔진 크롤러가 초기 HTML 응답에서 콘텐츠를 쉽게 색인화할 수 있습니다.
- 상호 작용까지 단축된 시간: 사용자가 페이지를 로드하는 동안 상호 작용할 수 있어 더 부드러운 사용자 경험을 제공합니다.

단점

- 서버 부하 증가: 각 요청에 대해 서버에서 HTML을 생성하는 것은 자원이 소모적일 수 있습니다.
- 클라이언트 측 상호 작용 한계: HTML 스트리밍만으로는 복잡한 클라이언트 측 상호 작용을 구현하기 어려울 수 있습니다.
- 전체 로드 시간이 느려질 수 있는 가능성: 초기 콘텐츠가 빨리 나타나지만 전체 페이지가 클라이언트 측 렌더링과 비교했을 때 더 오래 걸릴 수 있습니다.

<div class="content-ad"></div>

# 셰도우 DOM:

셰도우 DOM은 특정 요소 내부의 DOM과 CSS를 캡슐화하여 전역 범위에서 보호하는 웹 표준입니다. 이를 통해 개발자는 자체 스타일링 및 동작을 갖춘 독립적인 구성 요소를 만들 수 있으며 페이지의 다른 부분에서 발생할 수 있는 스타일 또는 스크립트 충돌을 방지할 수 있습니다.

장점

- 캡슐화: 셰도우 DOM으로 구축된 컴포넌트는 페이지의 다른 부분과 격리되어 의도하지 않은 스타일 또는 스크립트 충돌이 발생할 가능성을 줄입니다.
- 재사용성: 캡슐화된 컴포넌트는 기능에 영향을 주지 않고 응용 프로그램의 서로 다른 부분에 재사용할 수 있습니다.
- 유지보수성: 셰도우 DOM은 캡슐화를 강화하고 컴포넌트 간 의존성을 줄이는 방식으로 더 깨끗한 코드 아키텍처를 촉진합니다.

<div class="content-ad"></div>

단점

- 브라우저 지원: 대부분의 최신 브라우저는 Shadow DOM을 지원하지만, 오래된 브라우저는 폴리필(polyfill)이 필요하거나 대체 전략이 필요할 수 있습니다.
- 학습 곡선: Shadow DOM에 익숙하지 않은 개발자는 구현 및 디버깅하는 과정에서 학습 곡선에 직면할 수 있습니다.
- 스타일링 유연성의 제한: Shadow DOM 외부에서 캡슐화된 컴포넌트의 스타일링은 도전적일 수 있으며 추가적인 노력이 필요할 수 있습니다.

# HTML Streaming과 Shadow DOM 함께 사용하기:

수평적인 마이크로 프론트엔드 아키텍처에서 여러 독립적인 팀이 애플리케이션의 다른 부분에 기여하는 경우, HTML 스트리밍과 Shadow DOM을 결합하면 중요한 이점을 제공할 수 있습니다. 이러한 기술이 어떻게 함께 작동할 수 있는지 예를 살펴보겠습니다:

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Microfrontend with Shadow DOM</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- HTML streaming content -->
  <div id="streamedContent">
    <!-- Shadow DOM component -->
    <div id="shadowContainer"></div>
  </div>
  <script>
    // Fetch HTML streaming content
    fetch('streamedContent.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('streamedContent').innerHTML = html;
        
        // Create Shadow DOM
        const shadowContainer = document.getElementById('shadowContainer');
        const shadowRoot = shadowContainer.attachShadow({mode: 'open'});
        
        // Fetch and inject Shadow DOM content
        fetch('shadowContent.html')
          .then(response => response.text())
          .then(html => {
            shadowRoot.innerHTML = html;
          });
      });
  </script>
</body>
</html>
```

이 예시에서 클라이언트로 주요 HTML 콘텐츠가 스트리밍되는 동안 그 내부의 특정 섹션은 Shadow DOM을 사용하여 캡슐화되었습니다. 이를 통해 다른 팀들이 각자의 구성요소에 독립적으로 작업하고, 캡슐화를 보장하며 충돌 위험을 줄일 수 있습니다.

더 읽어보기:

- HTML 스트리밍: HTML 스트리밍의 장점
- Shadow DOM: Shadow DOM 소개
- 마이크로 프론트엔드: 마이크로 프론트엔드 아키텍처

<div class="content-ad"></div>

# 결론:

HTML 스트리밍과 Shadow DOM은 특히 수평적인 마이크로 프론트엔드 아키텍처 내에서 애플리케이션의 확장성, 성능, 유지 보수성을 크게 향상시킬 수 있는 강력한 기술입니다. 이러한 기술이 어떻게 작동하며 효과적으로 결합될 수 있는지를 이해함으로써, 개발자들은 유지 및 관리가 쉬운 견고하고 확장 가능한 웹 애플리케이션을 구축할 수 있습니다.

# Stackademic 🎓

끝까지 읽어 주셔서 감사합니다. 가기 전에:

<div class="content-ad"></div>

- 작가에게 박수를 보내주시고 팔로우도 부탁드려요! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼에서도 만나보세요: In Plain English | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠와 싸우기 싫으시다구요? Differ를 시도해보세요
- 더 많은 콘텐츠는 Stackademic.com에서 확인해보세요