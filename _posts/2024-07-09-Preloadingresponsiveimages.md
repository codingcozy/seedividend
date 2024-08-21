---
title: "반응형 이미지를 미리 로드하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-Preloadingresponsiveimages_0.png"
date: 2024-07-09 18:18
ogImage:
  url: /assets/img/2024-07-09-Preloadingresponsiveimages_0.png
tag: Tech
originalTitle: "Preloading responsive images"
link: "https://medium.com/@akashjha9041/preloading-responsive-images-3aecf114968e"
isUpdated: true
---

브라우저는 태그를 발견하기 전에 지정된 반응형 이미지의 적절한 변형을 미리로드할 수 있습니다. 이미지 CDN을 사용하지 않는 경우 각 이미지에 대해 여러 차원을 저장하고 해당 속성에 지정해야 합니다. 미리로딩으로 인해 이미지가 1.2초 더 빨리로드됩니다.

![Preloading responsive images](/assets/img/2024-07-09-Preloadingresponsiveimages_0.png)

# 반응형 이미지 개요

300픽셀 너비의 화면에서 웹을 둘러보고 있고 페이지가 1500픽셀 너비의 이미지를 요청했다고 가정해봅시다. 이 페이지는 모든 그 부가적 해상도로 아무것도 할 수 없는 화면 때문에 많은 셀룰러 데이터를 낭비했습니다. 이상적으로, 브라우저는 화면 크기보다 조금 넓은 이미지 버전, 예를 들어 325픽셀 크기의 이미지를 가져와야 합니다. 이는 데이터를 낭비하지 않고 고해상도 이미지를 보장합니다. 게다가 이미지가 더 빨리로드됩니다. 반응형 이미지는 브라우저가 다른 기기에 대해 다른 이미지 리소스를 가져올 수 있도록 합니다. 이미지 CDN을 사용하지 않는 경우 각 이미지에 대해 여러 차원을 저장하고 srcset 속성에 지정해야 합니다. w 값은 각 버전의 너비를 브라우저에 알려줍니다. 디바이스에 따라 브라우저가 적절한 이미지를 선택할 수 있습니다.

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

# Preload 개요

Preload를 사용하면 HTML에서 발견되기 전에 가능한 한 빨리 로드하고 싶은 중요 리소스에 대해 브라우저에 알릴 수 있습니다. 특히 스타일시트에 포함된 폰트, 배경 이미지 또는 스크립트로부터 로드된 리소스와 같이 쉽게 발견되지 않는 리소스에 대해 특히 유용합니다.

```js
<link rel="preload" as="image" href="important.png">
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

# 반응형 이미지 + 프리로드 = 빠른 이미지 로딩

반응형 이미지와 프리로드는 지난 몇 년 동안 사용 가능했지만, 동시에 무언가가 부족했습니다: 반응형 이미지를 미리로딩하는 방법이 없었습니다. Chrome 73부터 브라우저는 img 태그를 발견하기 전에 srcset에서 지정된 반응형 이미지의 적절한 변형을 미리로딩할 수 있습니다!

사이트 구조에 따라서는 이미지 표시 속도가 상당히 빨라질 수 있습니다! 우리는 JavaScript를 사용하여 반응형 이미지를 지연로딩하는 사이트에서 테스트를 실행했습니다. 프리로딩을 진행하면 이미지 로딩이 1.2초 더 빨리 완료되었습니다.

반응형 이미지는 모든 최신 브라우저에서 지원되지만, 이미지를 프리로드하는 것은 크로미움 기반 브라우저에서만 지원됩니다.

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

# imagesrcset와 imagesizes

반응형 이미지를 사전로드하기 위해 `link` 요소에 새로운 속성이 최근에 추가되었습니다: imagesrcset과 imagesizes. 이러한 속성은 `link rel="preload"`와 함께 사용되며 `img` 요소에서 사용되는 srcset 및 sizes 구문과 일치합니다.

예를 들어, 다음과 같이 지정된 반응형 이미지를 사전로드하려면:

```js
<img src="wolf.jpg" srcset="wolf_400px.jpg 400w, wolf_800px.jpg 800w, wolf_1600px.jpg 1600w" sizes="50vw" alt="멋진 늑대">
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

앞선 예시는 HTML의 `head`에 다음을 추가하여 table 태그를 Markdown 형식으로 변경할 수 있습니다:

```js
<link rel="preload" as="image" href="wolf.jpg" imagesrcset="wolf_400px.jpg 400w, wolf_800px.jpg 800w, wolf_1600px.jpg 1600w" imagesizes="50vw">
```

이렇게 하면 `srcset` 및 `sizes`가 적용하는 동일한 자원 선택 로직을 사용하여 요청을 시작할 수 있습니다.

# 사용 사례

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

# 동적으로 삽입된 반응형 이미지 사전로딩

만약 슬라이드쇼의 일부로 동적으로 히어로 이미지를 로딩하고 첫 번째로 표시될 이미지를 알고 있다면, 해당 이미지를 사용자가 볼 수 있도록 빠르게 로딩하기를 원할 것입니다. 이때 해당 이미지를 로딩하기 전에 스크립트를 기다릴 필요가 없으므로 로딩 지연이 발생하지 않습니다.

동적으로 로드된 이미지 갤러리가 있는 웹사이트에서 이 문제를 검사할 수 있습니다:

- 새 탭에서 예시 웹사이트를 엽니다.
- `Control+Shift+J` (또는 Mac의 `Command+Option+J`)를 눌러 DevTools를 엽니다.
- 네트워크 탭을 클릭합니다.
- Throttling 드롭다운 목록에서 Fast 3G를 선택합니다.
- Disable cache 확인란을 해제합니다.
- 페이지를 새로 고칩니다.

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

![Preloading responsive images](/assets/img/2024-07-09-Preloadingresponsiveimages_1.png)

Using preload helps here because the image starts loading ahead of time and is likely to already be there when the browser needs to display it.

![Preloading responsive images](/assets/img/2024-07-09-Preloadingresponsiveimages_2.png)

To see the difference that preloading makes, you can inspect the same dynamically-loaded image gallery but with preloaded first image by following the steps from the first example.

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

문제를 해결하기 위한 대체 방법은 마크업 기반의 캐러셀을 사용하고 브라우저의 프리로더가 필요한 리소스를 가져오도록 하는 것입니다. 그러나 이 방법이 항상 실용적이라고는 할 수 없습니다. (예를 들어, 마크업 기반이 아닌 기존 컴포넌트를 재사용하는 경우)

# 이미지셋을 사용하여 배경 이미지 사전로드하기

각각의 화면 밀도에 따라 다른 배경 이미지를 가지고 있는 경우 CSS에서 이미지셋 구문을 사용하여 지정할 수 있습니다. 브라우저는 화면의 DPR에 따라 표시할 이미지를 선택할 수 있습니다.

```js
background-image: image-set( "cat.png" 1x, "cat-2x.png" 2x);
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

위의 구문은 Chromium 및 WebKit 기반 브라우저에서 이 기능에 대해 벤더 접두사가 필요하다는 사실을 무시합니다. 이 기능을 사용할 계획이라면 Autoprefixer(온라인 도구로 제공됨)를 사용하여 자동으로 해결할 수 있습니다.

CSS 배경 이미지의 문제는 브라우저가 페이지의 `head`에 있는 모든 CSS를 다운로드하고 처리한 후에야 비로소 발견한다는 것인데, 이는 많은 양의 CSS일 수 있습니다...

반응형 배경 이미지가 있는 예제 웹사이트에서 이 문제를 검토할 수 있습니다.

![예시 이미지](/assets/img/2024-07-09-Preloadingresponsiveimages_3.png)

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

반응형 이미지 미리로딩은 그림을 더 빨리 불러오는 간단하고 해킹되지 않은 방법을 제공합니다.

```js
<link rel="preload" as="image" imagesrcset="cat.png 1x, cat-2x.png 2x">
```

주의: href 속성을 제외하면 `link` 요소에서 이미지 srcset을 지원하지 않는 브라우저가 CSS에서 이미지 집합을 지원하지만 잘못된 소스를 다운로드하지 않도록 할 수 있습니다. 그러나 이 경우 preload의 혜택을 받을 수 없습니다.

미리로딩된 반응형 배경 이미지로 이전 예제의 동작 방식을 확인할 수 있습니다.

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

![image](/assets/img/2024-07-09-Preloadingresponsiveimages_4.png)

# 반응형 이미지 사전로드하기

이론적으로 반응형 이미지를 사전로드하면 그 속도가 빨라지지만, 실제로는 어떻게 될까요?

이에 대한 답변으로 저는 데모 PWA 쇼핑몰의 두 가지 복사본을 만들었습니다: 이미지를 사전로드하지 않은 하나와 일부 이미지를 사전로드한 하나입니다. 사이트가 JavaScript를 사용하여 이미지를 지연로드하기 때문에, 초기 뷰포트에 표시될 이미지를 사전로드하면 이점을 얻을 수 있을 것입니다.

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

이로 인해 이미지를 미리로드하지 않은 경우와 이미지를 미리로드한 경우의 결과가 발생했습니다. 숫자를 살펴보면 시작 렌더가 동일한 것을 알 수 있습니다. 스피드 인덱스는 약간 향상되었습니다(이미지가 더 빨리 도착하지만 화면의 큰 부분을 차지하지 않기 때문에 273ms). 하지만 차이를 포착하는 실제 지표는 마지막으로 그려진 히어로 메트릭입니다. 이 메트릭은 1.2초 개선되었습니다. 🎉🎉
물론, 필름스트립 비교로 시각적 차이를 가장 잘 나타낼 수 있습니다:

![Filmstrip Comparison](/assets/img/2024-07-09-Preloadingresponsiveimages_5.png)

# 미리로드와 `picture`?

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

응답형 이미지에 익숙하다면 "picture"에 대해 궁금해하실 수 있습니다.

Web Performance Working Group은 srcset 및 sizes에 대한 사전로드 동등 기능을 추가하고 있지만 "picture" 요소는 해당 기능을 다루지 않습니다. 그 기능은 "아트 디렉션" 사용 사례에 대응합니다.

왜 이 사용 사례가 "방치"되었을까요?

해당 사용 사례를 해결하려는 관심이 있음에도 불구하고, 이 문제를 해결하기 위한 여러 기술적 문제가 아직 해결해야 할 것들이 많아서 해결방안이 복잡할 것으로 예상됩니다. 또한, 대부분의 경우 오늘날에도 해당 사용 사례를 해결할 수 있는 것으로 보이지만, 조금은 강제적인 방식(아래 참조)으로 할 수 있습니다.

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

Web Performance WG는 srcset을 먼저 배포하기로 결정하고 동등한 picture 지원의 수요가 생기는지 확인하기로 했습니다.

만약 `picture`를 미리로드할 수 있는 위치에 있다면 다음 기술을 해결책으로 사용할 수 있을 것입니다.

다음 시나리오가 주어졌을 때:

```js
<picture>
    <source srcset="small_cat.jpg" media="(max-width: 400px)">
    <source srcset="medium_cat.jpg" media="(max-width: 800px)">
    <img src="large_cat.jpg">
</picture>
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

`picture` 요소의 논리(또는 정확히는 이미지 소스 선택 논리)는 `source` 요소의 미디어 속성을 순서대로 확인하여 일치하는 첫 번째 소스를 찾고 첨부된 리소스를 사용하는 것입니다.

반응형 프리로드는 "순서"나 "첫 번째 일치"와 같은 개념이 없기 때문에, 브레이크포인트를 다음과 같은 방식으로 변환해야 합니다:

```js
<link rel="preload" href="small_cat.jpg" as="image" media="(max-width: 400px)">
<link rel="preload" href="medium_cat.jpg" as="image" media="(min-width: 400.1px) and (max-width: 800px)">
<link rel="preload" href="large_cat.jpg" as="image" media="(min-width: 800.1px)">
```

# 프리로드와 타입

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

`picture` 요소는 첫 번째 유형에 대한 일치도 지원하여 다양한 이미지 형식을 제공하고 브라우저가 지원하는 첫 번째 이미지 형식을 선택할 수 있습니다. 이 사용 사례는 현재 preload에서 지원되지 않습니다.

이를 사용하는 사이트에서는 preload를 피하는 것이 최선의 선택이며, 대신 preload 스캐너가 해당 `picture`와 `source` 요소에서 이러한 이미지를 가져오도록 하는 것이 좋습니다. 우선순위 힌트를 지원하는 특히 이러한 경우에는 preload만으로는 적합한 이미지가 우선적으로 적재되도록 하는 것이 좋은 실척입니다.

# Largest Contentful Paint (LCP)에 미치는 영향

이미지는 Largest Contentful Paint (LCP)의 후보가 될 수 있기 때문에 사전로드를 통해 웹 사이트의 LCP를 개선할 수 있습니다. 위의 기술들을 사용하면 반응형 이미지가 더 빠르게 로드되도록 할 수도 있습니다.

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

이미지를 미리로드하더라도 반응형이든 아니든, 미리로드가 초기 마크업 페이로드에서 발견할 수 없는 이미지 리소스에 특히 잘 작동함을 인식하세요. 서버에서 완전한 마크업을 보내는 웹사이트의 경우, 큰 이점을 눈치채지 못할 수도 있습니다. 하지만 클라이언트에서 마크업을 렌더링하는 경우 — 브라우저의 프리로드 스캐너를 우회하는 경우 — 성능을 향상시키기 위해 잠재적인 LCP 이미지를 미리로드할 수 있는 기회가 있습니다.

# 요약

반응형 이미지 미리로드는 우리에게 반응형 이미지를 미리로드할 수 있는 새로운 흥미로운 가능성을 제공하며, 이전에는 해킹만으로 가능했던 방법으로만 가능했던 것들을 가능케 합니다. 속도에 민감한 개발자의 도구상 중요한 새로운 추가 기능이며, 사용자들에게 가능한 빨리 사용하고자 하는 중요한 이미지들이 필요할 때 항상 미리 준비되어 있도록 보장할 수 있게 해줍니다.
