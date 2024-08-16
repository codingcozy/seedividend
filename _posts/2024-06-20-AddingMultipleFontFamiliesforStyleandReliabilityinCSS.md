---
title: "CSS에서 스타일과 신뢰성을 위한 여러 폰트 패밀리 추가하기"
description: ""
coverImage: "/assets/img/2024-06-20-AddingMultipleFontFamiliesforStyleandReliabilityinCSS_0.png"
date: 2024-06-20 05:49
ogImage: 
  url: /assets/img/2024-06-20-AddingMultipleFontFamiliesforStyleandReliabilityinCSS_0.png
tag: Tech
originalTitle: "Adding Multiple Font Families for Style and Reliability in CSS"
link: "https://medium.com/@tutorialsfreak2022/adding-multiple-font-families-for-style-and-reliability-in-css-a32a067e127c"
isUpdated: true
---





![Font selection plays a crucial role in web design. It sets the tone, enhances readability, and influences user experience. CSS (Cascading Style Sheets) offers the power to incorporate multiple font families, giving you flexibility and control over your website’s visual appeal. This article delves into the methods for adding two or more font families in your CSS, ensuring a stylish and reliable presentation.](/assets/img/2024-06-20-AddingMultipleFontFamiliesforStyleandReliabilityinCSS_0.png)

# The Essential Rule: @font-face

The @font-face rule is the cornerstone of incorporating custom fonts into your CSS. It allows you to define the font family name, specify the location of the font files and set additional properties like font weight and style.


<div class="content-ad"></div>

여기 기본 구조가 있어요:

```js
@font-face {
 font-family: "MyFont"; /* 플롯의 이름 */
 src: url("font.woff2") format("woff2"), /* 폰트 파일 경로와 형식 */
 url("font.woff") format("woff"); /* 구형 브라우저를 위한 백업 형식 */
}
```

이 예시에서 "MyFont"는 폰트 패밀리에 할당된 이름입니다. src 속성은 폰트 파일의 위치와 형식을 지정합니다. WOFF2 및 WOFF와 같이 여러 형식을 포함하는 것이 좋습니다. 다양한 브라우저에서 호환성을 보장하기 위함이에요.

# 여러 폰트 패밀리 지정하기

<div class="content-ad"></div>

두 개 이상의 글꼴 패밀리를 포함하려면 CSS 내에 추가적인 @font-face 규칙을 추가하기만 하면 됩니다. 각 규칙은 해당 속성을 가진 고유한 글꼴 패밀리를 정의합니다.

```js
@font-face {
 font-family: "HeadingFont";
 src: url("headingfont.ttf") format("truetype");
}
@font-face {
 font-family: "BodyFont";
 src: url("bodyfont.woff2") format("woff2"),
 url("bodyfont.woff") format("woff");
}
```

이제 "HeadingFont"와 "BodyFont"라는 두 가지 서로 다른 글꼴 패밀리가 있습니다.

# 내용에 글꼴 적용하기

<div class="content-ad"></div>

@font-face를 사용하여 글꼴 패밀리를 정의한 후에는 font-family 속성을 사용하여 HTML 요소에 적용할 수 있습니다:

```js
h1, h2, h3 {
 font-family: "HeadingFont", serif; /* 주요로 HeadingFont 사용, 대체로 serif 사용 */
}
p, span {
 font-family: "BodyFont", sans-serif; /* 주요로 BodyFont 사용, 대체로 sans-serif 사용 */
}
```

이 예시에서, 제목 (h1, h2, h3)은 주로 "HeadingFont"를 사용합니다. 브라우저가 이를 지원하지 않는 경우 세리프 글꼴로 대체됩니다. 마찬가지로, 문단과 span은 주로 "BodyFont"를 사용하며, sans-serif로 대체됩니다.

# 글꼴 스택: 우선순위와 대체글꼴

<div class="content-ad"></div>

폰트 스택을 사용하면 쉼표로 구분된 글꼴 패밀리 목록을 지정할 수 있습니다. 브라우저는 지원하는 첫 번째 글꼴을 사용하려고 시도할 것입니다. 사용 가능한 것이 없으면 일반적인 글꼴을 사용합니다. 다음은 예시입니다:

```js
CSS
p {
 font-family: "Open Sans", Arial, sans-serif;
}
```

이 경우 브라우저는 "Open Sans"를 우선적으로 처리할 것입니다. 사용할 수 없는 경우 Arial을 시도할 것입니다. 마지막 수단으로 제네릭 sans-serif 글꼴을 사용할 것입니다. 이렇게 함으로써 사용자 시스템에 선호하는 글꼴이 없어도 일관된 글꼴 렌더링이 가능합니다.

# 여러 글꼴 패밀리 사용의 모범 사례

<div class="content-ad"></div>

- 폰트 개수 제한하기: CSS로는 많은 폰트를 사용할 수 있지만, 너무 많은 폰트 사용은 성능에 영향을 미칠 수 있고 웹사이트가 지저분해 보일 수 있습니다. 일관된 디자인을 위해 두 가지 이상의 주요 폰트를 지향해 보세요.
- 대체 폰트 고려하기: 항상 일관된 렌더링을 보장하기 위해 제네릭 폰트 패밀리(예: serif, sans-serif)를 대체 폰트로 포함하세요.
- 서로 어욈되는 폰트 선택하기: 시각적으로 잘 어울리는 폰트를 선택해 보세요. 사용자의 주의를 산만하게 만들 수 있는 충돌 스타일을 피해야 합니다. Google Fonts와 같은 도구를 활용하여 폰트 조합을 찾을 수 있습니다.
- 철저히 테스트하기: 웹사이트를 다양한 브라우저와 기기에서 테스트하여 폰트가 올바르게 렌더링되는지 확인하세요.

이러한 규칙을 따르면 CSS에 여러 폰트 패밀리를 효과적으로 추가하여 시각적으로 매력적이고 풍부한 사용자 경험을 제공할 수 있습니다. 기억해 주세요, 잘 선택된 폰트 조합은 웹사이트의 미적 요소와 브랜드 아이덴티티를 크게 향상시킬 수 있습니다. 이 코드를 시도해 보고 싶다면 CSS 컴파일러를 사용해보는 것이 좋습니다. 이를 통해 실시간으로 변경 사항을 확인하고 CSS 기술을 향상시킬 수 있습니다.