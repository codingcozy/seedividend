---
title: "MERN 스택으로 웹 개발, React Native로 앱 개발 튜토리얼 8  HTML에서 의미 있는 마크업"
description: ""
coverImage: "/assets/img/2024-06-20-WebMERNAppReactNativeDevelopmentTutorial8SemanticMarkupinHTML_0.png"
date: 2024-06-20 00:48
ogImage:
  url: /assets/img/2024-06-20-WebMERNAppReactNativeDevelopmentTutorial8SemanticMarkupinHTML_0.png
tag: Tech
originalTitle: "Web (MERN) , App (React Native) Development Tutorial#8 | Semantic Markup in HTML"
link: "https://medium.com/@mehtaba728/web-mern-app-react-native-development-tutorial-8-semantic-markup-in-html-5aa749e6638f"
isUpdated: true
---

<img src="/assets/img/2024-06-20-WebMERNAppReactNativeDevelopmentTutorial8SemanticMarkupinHTML_0.png" />

만약 비디오를 시청하며 배우는 것을 선호하신다면: [여기를 클릭해주세요](https://youtu.be/5ElYZ9q7u0E)

MERN 스택으로의 웹 개발 여정과 React Native를 사용한 앱 개발을 통해 여러 가지 필수적인 주제를 다뤘습니다. 여덟 번째 설치에서는 웹 개발의 기본적인 측면에 초점을 맞추어 Semantic Markup in HTML을 다룰 것입니다. 의미 있는 HTML을 이해하고 활용하는 것은 접근성이 좋고 SEO에 친화적이며 유지보수가 쉬운 웹 애플리케이션을 만드는 데 중요합니다.

# 시멘틱 HTML이란 무엇인가요?

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

시맨틱 HTML은 HTML 태그를 사용하여 내용의 의미와 구조를 전달하는 것을 말합니다. `div`나 `span`과 같은 비의미론적 태그와는 달리, 시맨틱 태그는 그 안의 내용의 역할과 중요성에 대한 정보를 제공합니다. 예시로는 `header`, `article`, `footer`, `section`, `nav` 등이 있습니다.

# 시맨틱 HTML을 사용하는 이유

- 접근성: 시맨틱 HTML은 스크린 리더 및 보조 기술에 맥락을 제공하여 접근성을 개선합니다. 이를 통해 장애를 가진 사용자가 웹 페이지를 더 효율적으로 탐색하고 이해할 수 있습니다.
- SEO 이점: 검색 엔진은 시맨틱 태그를 사용하여 웹 페이지의 내용과 구조를 이해합니다. 적절한 시맨틱 마크업은 웹 사이트의 검색 엔진 순위를 향상시킬 수 있습니다.
- 유지보수성: 시맨틱 HTML은 코드를 더 가독성 있고 유지보수하기 쉽게 만듭니다. 다른 개발자들(그리고 미래의 본인)은 웹 페이지의 구조와 내용을 이해하고 수정하는 것이 더 쉬울 것입니다.

# 주요 시맨틱 HTML 요소

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

가장 일반적으로 사용되는 의미 있는 HTML 요소 중 일부를 살펴보겠습니다:

# `header`

`header` 요소는 소개 콘텐츠나 탐색 링크 세트를 나타냅니다. 일반적으로 사이트의 로고, 탐색 메뉴 및 기타 소개 요소를 포함합니다.

```js
<header>
  <h1>내 웹사이트</h1>
  <nav>
    <ul>
      <li>
        <a href="#home">홈</a>
      </li>
      <li>
        <a href="#about">소개</a>
      </li>
      <li>
        <a href="#contact">연락처</a>
      </li>
    </ul>
  </nav>
</header>
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

# `nav`

`nav` 요소는 탐색 링크 블록을 정의하는 데 사용됩니다. 이는 사용자와 검색 엔진이 웹 사이트의 구조를 이해하는 데 도움이 됩니다.

```js
<nav>
  <ul>
    <li>
      <a href="#home">Home</a>
    </li>
    <li>
      <a href="#services">Services</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ul>
</nav>
```

# `main`

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

`main` 요소는 문서의 주요 콘텐츠를 나타냅니다. 문서당 하나의 `main` 요소만 있어야하며, `article`, `aside`, `footer`, `header`, 또는 `nav` 요소의 하위 요소로 있어서는 안됩니다.

```js
<main>
  <article>
    <h2>내 웹사이트에 오신 것을 환영합니다</h2>
    <p>여기에 주요 내용이 들어갑니다.</p>
  </article>
</main>
```

# `section`

`section` 요소는 문서 내의 섹션을 정의합니다. 일반적으로 제목과 함께 콘텐츠를 주제별로 그룹화하는 데 사용됩니다.

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

# `section`

"section" 태그는 웹 페이지 내에서 콘텐츠의 섹션을 정의하는 데 사용됩니다. 주로 그룹화된 콘텐츠에 사용됩니다.

```html
<section>
  <h2>Our Services</h2>
  <p>We offer a wide range of services to meet your needs.</p>
</section>
```

# `article`

`article` 요소는 독립적으로 배포될 수 있는 자체 컨텐츠 조각을 나타냅니다. 블로그 게시물, 뉴스 기사 및 유사한 콘텐츠에 자주 사용됩니다.

```html
<article>
  <h2>Understanding Semantic HTML</h2>
  <p>Semantic HTML is a powerful tool for web developers...</p>
</article>
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

# `aside`

`aside` 요소는 주변 콘텐츠와 관련이 있는 콘텐츠를 나타냅니다. 사이드바, pull quotes 및 기타 보조 콘텐츠에 자주 사용됩니다.

```js
<aside>
  <h2>관련 링크</h2>
  <ul>
    <li>
      <a href="#link1">링크 1</a>
    </li>
    <li>
      <a href="#link2">링크 2</a>
    </li>
  </ul>
</aside>
```

# `footer`

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

`푸터` 요소는 문서나 섹션의 하단을 나타냅니다. 일반적으로 메타데이터, 관련 문서へ의 링크, 그리고 문서에 대한 기타 정보를 포함합니다.

```js
<footer>
  <p>&copy; 2024 내 웹사이트. 판권 소유.</p>
</footer>
```

- 접근성 있는 내비게이션: 내비게이션이 접근성이 있도록 하려면 `nav`와 필요할 때 적절한 ARIA (Accessible Rich Internet Applications) 역할을 사용하세요.

```js
<nav role="navigation">
  <ul>
    <li>
      <a href="#home">홈</a>
    </li>
    <li>
      <a href="#services">서비스</a>
    </li>
    <li>
      <a href="#contact">연락처</a>
    </li>
  </ul>
</nav>
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

# 결론

시멘틱 HTML은 현대 웹 개발의 기본 요소로, 접근성, SEO 및 유지보수 측면에서 다양한 이점을 제공합니다. MERN 스택 프로젝트와 React Native 앱에 시맨틱 요소를 통합하여 보다 견고하고 사용자 친화적인 애플리케이션을 만들 수 있습니다. 개발 여정을 계속하면서 HTML의 구조와 의미가 애플리케이션의 기능과 디자인과 동일한 중요성을 갖는다는 것을 기억해 주세요.

다음 튜토리얼에서는 웹 및 모바일 앱 개발의 고급 주제에 대해 더 자세히 다룰 예정이니 기대해 주세요. 즐거운 코딩되세요!
