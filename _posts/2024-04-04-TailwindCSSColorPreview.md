---
title: "Tailwind CSS 색상 preview 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Tailwind CSS Color Preview"
link: "https://medium.com/@sebastianknight955/tailwind-css-color-preview-fc7034ecd857"
isUpdated: true
---

![Tailwind CSS Color Preview Screenshot 0](/assets/img/TailwindCSSColorPreview_0.png)

요즘 대부분의 웹 개발자들이 Visual Studio Code를 사용합니다. 내 의견으로는 Tailwind CSS가 웹 페이지의 스타일링을 위한 최고이자 가장 일반적인 프레임워크입니다. 그러나 한 가지 귀찮은 누락된 기능은 VS Code Tailwind CSS 색상 미리보기가 HSL 색상에 대해 작동하지 않는다는 것입니다. 이 기사에서는 이에 대한 일부 해결책을 설명하겠습니다.

![Tailwind CSS Color Preview Screenshot 1](/assets/img/TailwindCSSColorPreview_1.png)

위 스크린샷에서 보듯이, Tailwind CSS의 기본 형식인 HSL로 정의된 배경과 전경이 색상 미리보기를 보여주지 않습니다. 그러나 16진수 표기법으로 정의된 예시는 정상적으로 표시됩니다. 미리보기를 받는 것 이상으로 좋은 점은 색상을 클릭하면 색상 팔레트가 나타나며, 이를 사용하여 색상을 변경할 때 편리하다는 점입니다.

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

![이미지](/assets/img/TailwindCSSColorPreview_2.png)

# HSL 색상이란

HSL은 색조(Hue), 채도(Saturation), 명도(Lightness)를 나타냅니다.
색조는 0부터 360까지의 색상 활에 해당하는 각도입니다.

![이미지](/assets/img/TailwindCSSColorPreview_3.png)

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

채도는 색상의 강도를 나타냅니다. 100%는 완전한 색, 0%는 완전히 회색입니다.
밝기는 색에 얼마나 많은 빛을 줄 것인지를 나타냅니다. 0%는 전혀 빛이 없고, 100%는 완전한 밝기입니다.

HSL의 좋은 점은 원하는 색을 얻기 위해 0부터 360 사이의 값 사이에서 Hue 값을 선택할 수 있으며, 그 후에는 채도와 밝기를 변경하여 색 팔레트를 만들 수 있다는 것입니다.

# Tailwind CSS 색상 미리보기를 위한 해결책

새 프로젝트를 설정할 때 얻는 것과 가능한 동일한 원본 Tailwind CSS 색상 구성을 유지하려면, 각 행 뒤에 HSL 색상을 주석으로 추가하는 것이 최선입니다. 그럼 색상 미리보기를 볼 수 있습니다만, 단점은 색 팔레트를 사용할 수 없다는 것입니다.

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

<img src="/assets/img/TailwindCSSColorPreview_4.png" />

다른 대안은 HSL 값을 HSL 함수로 직접 래핑하는 것입니다. 이 경우 tailwind 구성 파일도 업데이트해야합니다. 이 방법의 장점은 미리보기를 얻을 수 있으면서 색상 팔레트에도 액세스할 수 있다는 것입니다.

<img src="/assets/img/TailwindCSSColorPreview_5.png" />

globals.css의 예시

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
@레이어 베이스 {
  :루트 {
    --백그라운드: hsl(100 100% 50%);
    --전경: hsl(40 100% 80%);
```

tailwind.config.js 예시

```js
확장: {
      색상: {
        background: "var(--background)",
        foreground: "var(--foreground)",
```

그래서 globals.css 파일에서는 값을 hsl 함수로 감쌌고, tailwind.config.js에서는 hsl 함수를 제거했습니다.

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

이 접근 방식의 유일한 단점은 Tailwind 버전을 업데이트할 때 일부 업데이트를 진행해야 할 수 있다는 점입니다. 그러나 Tailwind는 Tailwind CSS 4에서 구성에 관한 몇 가지 변경을 하고 있기 때문에 결국 마주치게 될 문제입니다.
