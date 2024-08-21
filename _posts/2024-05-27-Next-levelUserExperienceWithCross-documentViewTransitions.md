---
title: "사용자 경험(UX) 크로스 문서 뷰 전환 하는 방법"
description: ""
coverImage: "/assets/img/2024-05-27-Next-levelUserExperienceWithCross-documentViewTransitions_0.png"
date: 2024-05-27 19:05
ogImage:
  url: /assets/img/2024-05-27-Next-levelUserExperienceWithCross-documentViewTransitions_0.png
tag: Tech
originalTitle: "Next-level User Experience With Cross-document View Transitions"
link: "https://medium.com/gitconnected/next-level-user-experience-with-cross-document-view-transitions-74ee0ab8b6a1"
isUpdated: true
---

## 파워포인트 슬라이드쇼처럼 웹사이트를 만드는 방법

![Image](/assets/img/2024-05-27-Next-levelUserExperienceWithCross-documentViewTransitions_0.png)

웹사이트의 링크를 클릭하면서 왜 PowerPoint 슬라이드쇼처럼 부드럽지 않을까 궁금했던 적이 있나요?

표준적인 불편한 페이지 로딩에 짜증이 나시나요?

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

다행히도 매우 간단한 해결책이 있습니다. CSS와 JavaScript에 대한 약간의 경험만 있으면 사용자 정의 전환을 시작할 수 있습니다.

이 문서에서는 다음 프로젝트에서 이를 사용해야 하는 이유를 설명하고, 웹사이트에 구현하는 방법을 보여드릴 것입니다.

# 왜 Cross-Document View 전환을 사용해야 하는가?

- 웹사이트를 사용할 때 사용자 경험과 만족도가 향상되고 개선됩니다.
- 이는 웹사이트의 일관성을 높이고, 내용에 대한 이해를 증진시켜줍니다.
- 특수 효과를 위해 일반적으로 외부 라이브러리 및 프레임워크를 사용하지만, 이는 성능 손실로 이어질 수 있습니다. 반면 내부 방법은 더 빠르고 효과적인 방법을 제공합니다.

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

# 문서 간 보기 전환 구현

문서 간 보기 전환을 구현하려면 HTML, CSS, 그리고 JavaScript를 조합하여 사용해야 합니다.

아래에서는 이러한 전환을 설정하고 구현하는 데 필요한 단계를 안내해 드리겠습니다.

## 기본 설정

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

다중 페이지 애플리케이션을 위한 기본적인 HTML 구조부터 시작해보겠습니다. 두 개의 간단한 HTML 페이지를 생성해보겠습니다.

페이지 1: index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>페이지 1</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>페이지 1</h1>
      <a href="page2.html" class="transition-link">페이지 2로 이동</a>
    </div>
    <script src="transition.js"></script>
  </body>
</html>
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

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>페이지 2</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>페이지 2</h1>
        <a href="index.html" class="transition-link">페이지 1로 이동</a>
    </div>
    <script src="transition.js"></script>
</body>
</html>
```

## 트랜지션을 위한 CSS

트랜지션을 위한 CSS 스타일을 정의합니다. 여기서는 간단한 페이드 인 및 페이드 아웃 효과를 사용할 것입니다.

```js
/* styles.css */
body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    transition: opacity 0.5s ease;
}

.hidden {
    opacity: 0;
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

## 페이지 전환 처리를 위한 JavaScript

페이지 간 전환을 처리하는 JavaScript 로직을 구현하세요. 이는 링크에 이벤트 리스너를 추가하고 전환 효과를 관리하는 것을 포함합니다.

```js
// transition.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".transition-link");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetUrl = event.target.href;

      document.body.classList.add("hidden");

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500);
    });
  });
});

window.addEventListener("pageshow", () => {
  document.body.classList.remove("hidden");
});
```

# 모두 함께 적용하기

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

index.html과 page2.html 모두 CSS와 JavaScript 파일이 올바르게 연결되어 있는지 확인해주세요. 사용자가 다른 페이지로 이동하려는 링크를 클릭하면 현재 페이지가 페이드아웃되고 새 페이지가 페이드인되어 부드러운 전환 효과가 만들어집니다.

![다음 수준의 사용자 경험을 위한 문서 간 뷰 전환](/assets/img/2024-05-27-Next-levelUserExperienceWithCross-documentViewTransitions_1.png)

## 고급 전환

기본 페이드 전환은 좋은 시작점이지만, 슬라이드, 스케일 또는 사용자 정의 애니메이션과 같은 더 복잡한 전환으로 창의적으로 구성할 수 있습니다.

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

다음은 슬라이드 전환의 예시입니다:

```css
/* styles.css */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.hidden {
  opacity: 0;
  transform: translateX(-100%);
}
```

또한 다양한 탐색 컨텍스트에 따른 다양한 종류의 전환을 처리하기 위해 더 복잡한 JavaScript를 추가할 수도 있습니다.

더 많은 정보를 위해 이 웹사이트도 확인해보세요: [https://developer.chrome.com/docs/web-platform/view-transitions/cross-document](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)

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

# 최종 인사

문서 간 보기 전환이란 기능은 멀티페이지 애플리케이션의 사용자 경험을 향상시키는 강력한 기능입니다.

페이지간 부드럽고 일관된 전환을 구현함으로써, 웹 애플리케이션을 더 현대적이고 반응성있게 느끼게 할 수 있습니다.

서로 다른 종류의 전환을 실험하여 애플리케이션 디자인과 사용자 경험 목표에 가장 적합한 것을 찾아보세요.

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

행운을 빕니다!
