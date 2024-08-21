---
title: "Reset.css로 프로젝트 스타일을 초기화 하는 방법"
description: ""
coverImage: "/assets/img/2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_0.png"
date: 2024-05-27 19:08
ogImage:
  url: /assets/img/2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_0.png
tag: Tech
originalTitle: "Reset.css and (Entirely Personal!) Recommendations for 2024"
link: "https://medium.com/@itsuki.enjoy/reset-css-and-entirely-personal-recommendations-for-2024-fd7e32e15642"
isUpdated: true
---

![Reset CSS](/assets/img/2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_0.png)

웹 사이트 소스를 확인하면 이곳저곳에서 이 reset.css를 만날 수 있습니다. CSS Reset은 무엇이며 왜 필요한 걸까요?

이 기사에서 다양한 reset.css를 확인할 수 있는 간단한 코드펜을 만들었어요! CSS Reset을 느껴보기 위해 한 번 시도해보세요!

CSS Reset 스타일 시트는 기본 브라우저 스타일을 모두 재정의하는 CSS 스타일 목록입니다. 대부분의 브라우저는 테두리, 패딩 및 마진, 확대 축소, 글꼴 등에 자체 스타일을 가지고 있습니다. reset.css를 사용하면 이러한 기본 동작을 모두 제거하고 다양한 브라우저에서 일관된 UI/UX를 유지할 수 있습니다.

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

크롬

- 사파리
- 파이어폭스
- 엣지

웹 디자인을 일관되게 유지하는 옵션을 찾고 있다면, reset.css 외에도 normalize.css를 사용할 수 있는 옵션이 있습니다.

reset.css와는 다르게 normalize.css는 브라우저 기본값을 지우는 대신 일부를 보존합니다. 이는 sub와 같은 요소를 사용하는 경우 유용할 수 있습니다. 이 경우 reset.css 대신 normalize.css를 사용하면 일반 텍스트와 거의 동일하게 보입니다.

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

또한 normalize.css를 사용하면, 사전 서식이 지정된 텍스트의 글꼴 크기를 수정하는 등의 일반적인 버그를 수정할 수 있습니다.

그러나 저는 기본 스타일을 모두 초기화하고 싶습니다! 그래서 reset.css를 사용하기로 결정했고, 이 문서에서 제 추천을 공유하려고 합니다!

# reset.css 사용하기

reset.css를 다른 스타일 시트처럼 사용할 수 있습니다. 여기서 염두에 두어야 할 유일한 것은 reset.css가 가장 먼저 와야 한다는 것입니다!

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

<head>
    <link rel="stylesheet" href="reset.css" />
    <link rel="stylesheet" href="otherStyles.css" />
</head>

# 2024년을 위한 추천

안녕하세요! 실제로 reset.css는 서로 다른 방식으로 서로 다른 정도의 스타일을 초기화합니다. 여기서 내가 정말 좋아하는 것들 중 일부를 공유하고 싶어요!

자세히 알아보거나 시각화를 더 잘 하고 싶다면, 우리가 이 글에 포함시킨 모든 다른 reset.css를 비교할 수 있는 간단한 코드펜을 사용해보세요. 이 글에는 normalize.css도 포함되어 있으며 스타일시트를 추가하지 않은 선택 사항도 비교할 수 있도록 포함해 두었어요.

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

<img src="https://miro.medium.com/v2/resize:fit:1400/1*wjXmIrPgLX_afnYKDhvj4w.gif" />

(PS: CSS 내용은 무시해도 괜찮아요, 시각화를 위한 것뿐이에요!)

## 현대 CSS 리셋

여기서 제공하는 것은 아마도 현대 브라우저에 가장 흔하게 사용되는 CSS 리셋 중 하나일 것입니다. 테일윈드에서 리셋 스타일시트로 사용되었던 것으로 알고 있는데요 (이제는 normalize.css를 사용하러 가는 것 같아요). (그런 의미로, 이것은 제가 독특하다고 보지 않아서 가장 마음에 들지 않는 것이에요!)

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

이 reset.css의 가장 좋은 부분 중 하나는 파일을 작고 유지하기 때문에 로딩 속도가 정말 빠르다는 점입니다. 또한 모든 요소에 대해 box-sizing을 border-box로 정의하고 양식과 목록을 정의하는 데 많은 주의를 기울입니다.

이 리셋은 실제로 내 개인적인 의견으로는 모든 `h1`과 같은 태그에 대해 글꼴 크기를 유지해 normalize.css에 더 가깝다고 생각합니다.

저자는 GitHub 저장소를 성공적으로 이루었고 reset.css를 여기에 게시했습니다. 로컬 파일에 복사하여 붙여 넣거나 CDN인 https://unpkg.com/modern-css-reset/dist/reset.min.css를 사용하여 추가할 수 있습니다.

![이미지](/assets/img/2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_1.png)

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

## Reboot.css

부트스트랩에서 사용하는 리셋 CSS입니다. 퀄리티가 보장되죠!

사실 이건 normalize.css에 더 가깝습니다. 위의 것과 비교했을 때 요소들의 폰트 크기(`h1` 등)를 유지합니다. 아래 스크린샷에서 보시다시피 패딩도 그대로 유지됩니다.

(사실 이거 쓰고 아무것도 안 쓰는 거랑 차이가 크게 느껴지지는 않았던 것 같아요…)

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

![이미지](/assets/img/2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_2.png)

다음 방법으로 추가할 수 있어요

- CDN 사용: [https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap-reboot.css](https://cdn.rawgit.com/twbs/bootstrap/v4-dev/dist/css/bootstrap-reboot.css), 또는
- Github에서 다운로드하세요.

## @acab/reset.css

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

@acab/reset.css는 최신 CSS 기능을 활용한 스타일 리셋이에요. 이 리셋 스타일시트를 다른 것과 구별하는 두 가지 주요 기능이 있어요.

- iOS Safari에서 100vh가 전체 높이를 채우지 않는 문제를 해결했어요.
- color-scheme을 활용하여 자동 다크 모드를 지원해요.

@acab/reset.css를 사용하는 방법:

- npm을 이용해 설치하기: npm install @acab/reset.css,
- CDN 이용: https://unpkg.com/@acab/reset.css,
- 소스 코드 다운로드 후 로컬 파일로 추가하기.

해보세요! 🙂

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

그리고 보시다시피, 위의 것과 많이 다른데요, 제 지역의 컬러 스킴에 적응하고 있어요!

![이미지](/assets/img/2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_3.png)

### 새로운 CSS 초기화

이 새로운 CSS 초기화는 제가 가장 좋아하는 스타일이에요!

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

기본 스타일을 제외한 모든 것이 제거됩니다. 그러나 display 속성 및 iframe, canvas, img, svg, video와 같은 특수 HTML 요소는 유지됩니다.

![이미지1](/assets/img/2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_4.png)

![이미지2](/assets/img/2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_5.png)

네, 스타일이 하나도 남지 않습니다. 입력 상자나 라디오 버튼조차 없어요! 모든 것을 제거하고 처음부터 직접 디자인하고 싶다면 완벽해요!

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

너무 복잡한 것 같나요? 특정 요소의 기본 스타일을 되찾는 데는

- 전역 CSS 리셋 키워드, unset 및 revert 키워드.
- 모든 속성을 초기화하는 all 속성을 결합할 수 있어요.

특정 HTML 요소의 브라우저 기본 스타일을 되찾으려면, 예를 들어 input의 경우, 다음과 같이 할 수 있어요

```js
input {
    all: revert;
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

그리고 이제 우리가 사용하는 일반적인 형식으로 돌아왔어요!

![2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_6.png](/assets/img/2024-05-27-ResetcssandEntirelyPersonalRecommendationsfor2024_6.png)

이 새로운 CSS 리셋은 특정성을 제거하는 :where() 가상 클래스와 여러 인수를 가진 :not() 가상 클래스와 같은 다른 CSS 기능도 사용합니다.

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

저기요!

저희 프로젝트에서는 다음 방법으로 사용할 수 있어요:

- CDN을 이용하는 방법: https://cdn.jsdelivr.net/npm/the-new-css-reset@1.11.2/css/reset.min.css,
- 최신 버전 다운로드하는 방법, 또는
- NPM 패키지로 사용하는 방법

읽어 주셔서 감사합니다! 마음에 드는 방법을 찾으셨나요?

즐거운 스타일링 되세요!
