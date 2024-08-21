---
title: "프론트엔드 성능 최적화  페이지 성능 향상을 위한 6 단계"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Frontend Performance Optimization  6 steps to getting your page ripped"
link: "https://medium.com/@arunrajkumar/frontend-performance-web-application-optimization-techniques-553123b465ed"
isUpdated: true
---

# 좋은 다이어트 프로그램처럼, 우리는 체계적인 방식으로 체중을 줄이는 절제된 접근법을 채택했습니다. 우리는 주요 소스를 확인하고 공격을 시작했습니다.

Freshchat의 웹 메신저는 페이지 하단에 있는 확장 가능한 작은 버블입니다.

수백만 명의 월간 활성 사용자(MAU)를 가진 웹 메신저를 책임지고 있다면, 다른 웹사이트 위에 적재되었을 때 속도와 크기에 대해 신중하게 생각해야 합니다.

Freshchat에서는 사용자 경험을 향상시키는 도전에 착수했습니다. 결국, 누가 가벼우면서 더 빠른 페이지를 원하지 않겠습니까?

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

## 페이지 크기란 무엇인가요?

## 왜 줄여야 하나요?

처음 시작했을 때, 우리의 웹 메신저 크기가 경고를 주는 7.8MB였어요. 말도 안 돼는 소리 같죠. 우리가 그런 크기를 허용했던 거죠? 아마도 단기간에 시장에 진입해야 했던 탓이겠지요.

그런 후에, 그 크기의 약 1/20로 줄이기 위해 몇 가지 조치를 취했어요.

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

## 저희가 한 방법

좋은 체중 감량 프로그램처럼, 체계적인 접근 방식으로 체중을 감량했습니다. 우리는 주요 정보원을 식별하고 공격을 시작했습니다.

## 1. 초기 체지반 - 이모티콘 최적화

전통적인 지혜에 따르면 이미지를 스프라이트 파일로 결합해야 합니다. 그러나 우리는 정반대로 했어요. 1,280개의 이모티콘을 담은 거대한 크기(압축되지 않은 8MB)의 스프라이트 파일을 사용하였습니다. 이 파일은 페이지를 불러올 때마다 가져와서 이모티콘 피커 내에서 표시되었습니다.

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

![이미지](/assets/img/FrontendPerformanceOptimization6stepstogettingyourpageripped_0.png)

대화에 사용된 이모티콘을 표시하는 동안 동일한 스프라이트 파일이 참조되었습니다.

![이미지](/assets/img/FrontendPerformanceOptimization6stepstogettingyourpageripped_1.png)

그래서 이모지 피커를 사용하지 않아도 대화 내에서 이모티콘을 표시하기 위해 스프라이트 파일이 로드됩니다. 겸손한 이모지를 표시하려면 거대한 8MB가 필요합니다.

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

우리는 먼저 스프라이트 파일을 1,280개의 파일로 분할하여 대화창 안의 이모지들이 개별적으로 액세스할 수 있도록 했어요.

![이미지](/assets/img/FrontendPerformanceOptimization6stepstogettingyourpageripped_2.png)

그리고 다음으로는 이모지 피커를 클릭할 때만 스프라이트 파일을 늦게 로드하도록 했어요.

이 해킹은 로드 시에 우리가 버릴 수 있는 가장 큰 청크인 5MB(gzip 압축)를 절약할 수 있었답니다.

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

## 2. 적정 크기 - 미디어 파일 크기 조정

시간이 흘러, 사용했던 여러 미디어 파일들이 용량이 커지기 시작했습니다. 완전히 무시했기 때문이었습니다. 이제 이를 바로 잡을 때입니다.

- 50KB의 loader.gif을 css 해킹(`1KB)으로 대체했습니다.
- 33KB의 notif.mp3는 비트율을 낮추고 무음 부분을 자르는 작업을 통해 4KB로 줄였습니다.
- 57KB의 이모티콘 메타 파일은 각 이모티콘에 대한 사용되지 않는 메타 속성을 제거하여 28KB로 줄였습니다.
- 5MB의 이모티콘 스프라이트 파일은 해상도를 60x60에서 30x30으로 줄여 2.1MB로 줄였습니다. 그래서 이모티콘들이 필요할 때 더 빨리 로드됩니다.

## 3. 인자확장을 통한 리소스 로딩

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

다시 이모지로 돌아와서, 우리는 이모지 카테고리에 기반하여 단일 대형 이모지 스프라이트 파일을 8개의 파일로 나누었어요.

![이미지](/assets/img/FrontendPerformanceOptimization6stepstogettingyourpageripped_3.png)

그래서, 이모지 선택기를 클릭할 때 2.1MB를 로드하는 대신, 보여지는 카테고리에 해당하는 미미한 250KB 스프라이트 파일만을 로드했어요.

멋지죠? 8MB의 이모지 스프라이트에서 250KB로.

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

웹 메신저에서 FAQ 검색은 브라우저에서 lunr.js를 사용하여 이루어집니다. 그리고 lunr.js가 지원하는 모든 언어에서 키워드 검색을 지원합니다. 이는 총 14개의 지원 언어 파일을 로드해야 했다는 것을 의미합니다.

![이미지](/assets/img/FrontendPerformanceOptimization6stepstogettingyourpageripped_4.png)

하지만, 필요할 때에만 로드했습니다.

따라서, 우리는 사용자의 지역 설정을 식별하고 정말 필요한 언어 파일만을 로드했습니다.

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

Moment.js의 로케일 및 공동 브라우징과 유사한 방식으로 접근했습니다. 이 기능을 통해 고객의 화면 접근 권한을 요청하여 원격으로 도와드릴 수 있습니다.

## 4. CDN 매직

정적 리소스를 CDN으로 이동하는 장점을 과대 평가할 수 없습니다. 회고적으로, 이것은 무엇보다 먼저 수행되어야 했다고 느낍니다.

이점:

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

- 리소스 전달 속도 개선 — 페이지 로딩 시간이 현격히 단축되었습니다.
- nginx 서버의 CPU 사용량 감소.
- 더 나은 압축 알고리즘으로 인해 리소스 크기가 줄어듭니다.
- 전반적으로 고객들에게 빠른 경험을 제공합니다.

## 5. 도박 올리기 — 불필요한 것을 제거하기

우리는 모두 더 빨리 작업을 마치기 위해 라이브러리를 사용합니다. 누군가 이미 한 작업을 완료했다면, 왜 다시 만들까요? 그냥 빌리세요.

시장에 빨리 진입하는 데 도움이 되지만, 우리 벤더(js|css)에 많은 불필요한 코드를 추가합니다.

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

Animate.css는 fadeIn, fadeOut, zoomIn, slideInRight 등과 같은 멋진 전환 효과를 제공해줬어요. 하지만 그 중 일부만 사용하는 대신, 우리는 모든 애니메이션을 하나의 파일 animate.min.css에 포함시켰어요.

Moment Timezone은 사용자의 시간대를 식별하는 데 도움이 되었어요. 2012년부터 2022년까지의 시간대 데이터를 사용하는 대신, 과거의 모든 알려진 데이터와 미래 20년분의 데이터가 있는 더 큰 데이터 세트를 사용했어요.

Bootstrap도 포함되어 있었어요. 누가 Bootstrap 없이 웹사이트를 만들까요? 우리는 그들의 버튼 스타일만 사용해야 했더라도 Bootstrap을 사용했어요. 그때 bootstrap.min.(js|css)를 제거하면, 또 다른 50KB를 줄일 수 있어요.

이모지들이 또 나왔어요. 이모지를 최적화할 수 있는 여지는 끝이 없는 것 같아요. 우리는 동물과 국기를 포함해 가장 적게 사용된 (사실 전혀 사용되지 않은) 이모지들을 식별하고 제거했어요. 그들이 상당한 용량을 차지하고 있었거든요.

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

## 6. 빼다

우리가 정상에 다다른 줄 알았던 찰나에, Brotli 압축이 등장했습니다.

이 마지막 단계는 우리에게 추가로 16%의 무게를 줄이는 데 도움이 되었습니다.

지금 우리의 웹 메신저는 한때 7.8MB에서 크게 성장했던 것과는 거리가 멀어진 430KB로 남아 있습니다.

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

업데이트: 특정 브라우저가 아직 Brotli 압축된 리소스를 지원하지 않기 때문에 이를 되돌려야 했습니다.

## 결론

이제 가벼워졌으니, 앞으로는 저희의 규율이 우리를 좋은 상태로 유지할 것입니다. 우리가 포함하는 각 리소스에 대해 다음 질문들을 스스로에게 물어봅니다:

- 이것 없이도 할 수 있을까요?
- 그렇지 않다면, 사용하는 관련 코드만 포함할 수 있을까요?

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

## 다음에는 무엇을 할까요?

우리가 리소스에 무엇을 넣었는지에 대해 주의하는 것은 이제 모든 프론트엔드 엔지니어들이 단언하는 학문이 되었습니다.

## 크레딧

저희 Freshchat 프론트엔드 팀은 Sankar Ganesh, Mohamed Imthihas, Arunkumar Velu, Vasanth Kumar 그리고 저, Arun Rajkumar로 구성되어 있습니다.

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

Sakthi Goutham, Yuvaraj, Vijayabharathi, and Shanmugapriya from Freshchat QA.
