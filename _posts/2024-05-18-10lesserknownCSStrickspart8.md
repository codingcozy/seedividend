---
title: "잘 알려지지 않은 CSS 팁 10가지"
description: ""
coverImage: "/assets/img/2024-05-18-10lesserknownCSStrickspart8_0.png"
date: 2024-05-18 22:08
ogImage:
  url: /assets/img/2024-05-18-10lesserknownCSStrickspart8_0.png
tag: Tech
originalTitle: "10 lesser known CSS tricks part 8"
link: "https://medium.com/@creativebyte/10-lesser-known-css-tricks-part-8-41439222fdeb"
isUpdated: true
---

![이미지](/assets/img/2024-05-18-10lesserknownCSStrickspart8_0.png)

10가지 잘 알려지지 않은 CSS 트릭 시리즈의 여덟 번째 파트에 오신 것을 환영합니다. 이미 느끼고 계신 분들도 있겠지만, 만약 여기 처음 오신 분들이라면 이전 게시물을 보지 않으셨다면... 안녕하세요! 저는 10가지 잘 알려지지 않은 CSS 트릭 목록을 만들었어요 (지금까지 70가지를 소개했고, 이번을 끝으로 80가지 트릭 모음이 완성될 거에요). 이번 트릭들이 웹 디자인 역량 향상에 도움이 되길 바래요.

## 01. scroll-snap-align

scroll-snap-align 속성은 스크롤 컨테이너 내에서 스크롤 스냅 지점의 정렬을 제어하여 스크롤 동작을 정확하게 제어하고 사용자 경험을 향상시킵니다.

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
.container {
  scroll-snap-type: x mandatory;
}

.item {
  scroll-snap-align: center;
}
```

## 02. overscroll-behavior

overscroll-behavior를 사용하면 브라우저가 스크롤 초과를 처리하는 방식을 정의하여 원치 않는 스크롤 효과를 방지하고 전체 스크롤 경험을 개선할 수 있습니다.

```css
.scrollable {
  overscroll-behavior: contain;
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

## 03. font-kerning

font-kerning은 문자 간 간격을 미세하게 조정하여 텍스트 요소 내 문자 간 간격을 조정하여 최적의 가독성을 보장합니다.

```js
p {
  font-kerning: auto;
}
```

## 04. shape-margin

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

함께 사용할 때 CSS 모양과 shape-margin은 부유 요소의 모양 주변에 여백을 지정하여 텍스트 감싸기와 레이아웃을 미세하게 제어할 수 있습니다.

```js
.shape {
  shape-margin: 20px;
}
```

## 05. scroll-margin

scroll-margin은 스크롤링 컨테이너의 가장자리와 스크롤링 콘텐츠 시작 사이의 여백을 설정하여 스크롤링을 위한 버퍼 공간을 제공하여 사용자 경험을 향상시킵니다.

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
.container {
  scroll-margin-top: 100px;
}
```

## 06. tab-size

scroll-margin은 스크롤링 컨테이너의 가장자리와 스크롤링 콘텐츠의 시작 사이의 여백을 설정하여 스크롤링에 대한 버퍼 공간을 제공하여 사용자 경험을 향상시킵니다.

```css
pre {
  tab-size: 4;
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

## 07. text-align-last

text-align-last은 블록 요소 내 텍스트의 마지막 줄 맞춤을 결정하여, 다중 줄 블록에서 텍스트 정렬을 정밀하게 제어합니다.

```js
p {
  text-align-last: justify;
}
```

## 08. text-justify

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

이 속성은 텍스트 맞춤 동작을 제어하며, 텍스트 맞춤에 대해 단어 간 간격 또는 글자 간 간격을 사용해야 하는지를 지정합니다.

```js
p {
  text-align: justify;
  text-justify: inter-word;
}
```

## 09. column-fill

column-fill은 콘텐츠가 다중 열 레이아웃 전체에 분배되는 방식을 지시하여, 콘텐츠가 열 사이에 순차적으로 또는 균형있게 분배되도록 합니다.

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
.container {
  column-count: 3;
  column-fill: auto;
}
```

## 10. outline-offset

outline-offset 속성은 윤곽선과 요소 가장자리 사이의 간격을 조정하여 레이아웃에 영향을 주지 않고 윤곽선의 모양을 미세하게 제어할 수 있게 합니다.

```css
button {
  outline: 2px solid blue;
  outline-offset: 4px;
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

# 읽어 주셔서 감사합니다

- 👏 이야기에 박수를 보내주세요 (50번 클랩) - 기사를 더 많이 퍼지도록 도와주세요
- ✉️ 독점 콘텐츠, 리소스 및 무료 선물을 위해 뉴스레터에 가입해주세요
- 🤝 Buymeacoffee.com에서 커피 한 잔을 기부해주세요
- 🔔 팔로우해주세요: Medium | X | LinkedIn
- 📝 매월 5달러로 Medium 멤버십 프로그램에 가입하고 저와 다른 작가들이 멋진 작품을 이어나갈 수 있도록 지원해주세요
