---
title: "CSS font와 color에 대해 자세히 살펴보기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "A Closer Look at CSS Fonts and Colors"
link: "https://medium.com/@rashmipatil24/css-fonts-and-colors-1fbee8e09ae7"
isUpdated: true
---

## 눈에 띄는 잔치

당신의 웹사이트는 정보 이상의 것입니다 - 그것은 경험입니다. 그리고 이 경험을 형성하는 주요 요소 중 하나는 타이포그래피입니다. 폰트와 색상은 단순히 장식 이상의 강력한 디자인 요소입니다 - 이들은 웹상에서 효과적인 커뮤니케이션, 브랜드 정체성 및 사용자 경험을 확립합니다. 신중하게 선택하고 심사숙고하게 적용함으로써 웹 디자이너는 시각적으로 멋진, 감정적으로 공감되며 사용자 친화적인 웹사이트를 만들어 방문자에게 오랫동안 지속되는 인상을 남길 수 있습니다. 이 블로그에서는 CSS 폰트와 색상을 자세히 살펴보고 웹 디자인의 기술을 습득하는 데 도움이 되도록 하겠습니다.

![이미지](/assets/img/ACloserLookatCSSFontsandColors_0.png)

# 폰트:

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

폰트는 웹사이트의 분위기와 개성을 결정하는 데 중요한 역할을 합니다. 웹 페이지의 쓰여진 내용의 가독성, 개성, 시각적 매력을 결정하는 데 중요한 항목 중 하나입니다.

## 폰트 패밀리:

CSS를 사용하여 텍스트의 폰트 패밀리를 지정할 수 있습니다. 세리프(serif) 및 산세리프(sans-serif) 두 종류의 폰트 패밀리가 있습니다. 세리프 폰트는 문자 끝에 작은 선이나 장식이 있지만, 산세리프 폰트는 그렇지 않습니다. Arial, Times New Roman 같은 흔한 옵션을 선택하거나 Google Fonts와 같이 더 독특한 폰트를 선택할 수 있습니다.

```js
body {
    font-family: "Helvetica", sans-serif;
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

여기서 전체 웹페이지의 글꼴을 Helvetica로 설정했습니다. 만약 Helvetica를 사용할 수 없는 경우 일반적인 산세리프 글꼴로 대체됩니다.

CSS에는 여러 글꼴을 정의하는 방법이 있습니다:

## 일반 글꼴 패밀리:

CSS는 "serif," "sans-serif," "monospace" 등과 같은 일반적인 글꼴 패밀리를 제공합니다. 이러한 패밀리는 특정 글꼴이 사용자의 기기에 없는 경우 대체 옵션으로 작용합니다.

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

## 특정 글꼴:

이름으로 특정 글꼴을 지정할 수도 있어요. 더 넓은 호환성을 위해 대체 옵션을 포함하는 것이 중요합니다.

## 구글 글꼴:

Google Fonts는 무료 글꼴의 방대한 컬렉션을 제공합니다. 웹사이트에 쉽게 통합할 수 있는 글꼴을 선택하여 HTML 파일의 head 섹션에 링크를 추가하고 CSS에서 사용하세요.

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
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
```

```js
body {
    font-family: 'Roboto', sans-serif;
}
```

## 글꼴 크기:

CSS를 사용하면 텍스트의 크기를 제어할 수 있습니다. 픽셀(px), ems(em), 백분율(%)과 같은 다양한 단위를 사용할 수 있습니다.

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

```css
p {
  font-size: 16px;
}
```

이 코드는 문단의 글꼴 크기를 16픽셀로 설정합니다.

## 글꼴 스타일:

CSS 속성인 `font-style`을 사용하여 글꼴 스타일을 조절할 수 있습니다. 글꼴 스타일은 텍스트가 이탤릭체인지 일반체인지를 지정합니다.

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

## 글꼴 두께:

글꼴 두께는 텍스트의 문자가 얼마나 두꺼운지 또는 가늘지를 결정합니다. 100(가늘게)에서 900(굵게)까지의 두께를 지정할 수 있습니다.

```js
p {
    font-weight: 300;
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

페이지의 모든 단락을 글자 두께를 조금 높게 만들게 됩니다.

## 줄 간격:

줄 간격은 텍스트 줄 사이의 수직 간격을 나타냅니다. 적절한 줄 간격을 설정하면 가독성이 향상됩니다.

```js
p {
    line-height: 1.5;
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

이는 단락의 줄 간격을 글꼴 크기의 1.5배로 설정합니다.

## 텍스트 정렬:

text-align과 같은 CSS 속성을 사용하여 텍스트를 정렬할 수 있습니다.

```js
h3 {
    text-align: center;
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

## 텍스트 꾸미기:

텍스트 꾸미기 속성을 사용하면 밑줄, 윗줄, 가로줄 및 없음과 같은 효과를 추가할 수 있습니다.

```js
a {
    text-decoration: none;
}
```

# 색상:

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

색은 웹사이트에 활기와 시각적 매력을 더해줍니다. 색은 정보 전달, 감정 유발, 그리고 시각적 계층 구조 설정에 중요한 역할을 합니다.

## 텍스트 색상:

색 속성은 텍스트의 색상을 설정할 수 있습니다. 미리 정의된 색 이름, 16진수 코드, RGB 또는 HSL 값 등을 사용할 수 있습니다.

```js
p {
    color: #333333;
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

페이지의 모든 문단을 어두운 회색으로 만들 수 있어요.

### 배경 색상:

요소의 배경 색상을 변경하려면 background-color 속성을 사용하세요.

```js
body {
    background-color: #f0f0f0;
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

웹 페이지 전체에 연한 회색 배경을 설정해줄거예요.

## 호버 효과:

사용자가 요소 위에 마우스를 올렸을 때 색상을 변경할 수 있어요. 이때 :hover 가상 클래스를 사용해요.

```js
a:hover {
    color: #ff0000;
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

CSS는 "red," "blue," "green" 등과 같은 이름이 지정된 색상 세트를 지원합니다. 이들은 사용하기 쉽지만 옵션이 제한적입니다.

```js
h2 {
    color: blue;
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

## 16진수 색상:

16진수 표기법은 RGB 값들을 지정하여 더 정확한 색상 조절을 가능하게 합니다. CSS에서 색상을 정의하는 가장 일반적으로 사용되는 방법입니다.

```js
p {
    color: #FFA500;
}
```

## RGB와 RGBA:

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

RGB 표기법은 빨강, 초록, 파랑 값의 조합을 사용하여 색상을 정의합니다. RGBA에는 투명도를 지정하기 위한 추가적인 알파 매개변수가 포함되어 있습니다.

```js
p {
    background-color: rgba(0, 0, 0, 0.5); /* 흑색의 투명도 50% */
}
```

## HSL 및 HSLA:

HSL(Hue, Saturation, Lightness) 표기법은 색상을 색조, 채도 및 명도에 기초하여 직관적으로 지정하는 방법을 제공합니다. HSLA에는 투명도를 위한 알파 매개변수가 포함되어 있습니다.

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
p {
    background-color: hsla(120, 100%, 50%, 0.3);
}
```

CSS로 글꼴과 색상을 다루는 방법을 이해하면 귀하의 브랜드 정체성을 효과적으로 전달하고 전체 사용자 경험을 향상시킬 수 있습니다. 다양한 글꼴과 색상을 실험하여 웹 사이트 스타일과 잘 어울리는 완벽한 조합을 찾아보세요. 사이트 전체에서 간단하고 가독성 있으며 일관된 스타일을 유지하는 것이 중요합니다.

웹 개발의 멋진 세계에서 더 많은 통찰력을 기대해 주세요. 즐거운 코딩되세요!
