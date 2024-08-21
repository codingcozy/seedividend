---
title: "프리로드Preload와 SrcSet을 남용하는 것 능력 부족한 개발자들의 한심한 절망"
description: ""
coverImage: "/assets/img/2024-07-12-OverusingPreloadAndSrcSetPatheticDesperationByIneptDevelopers_0.png"
date: 2024-07-12 19:22
ogImage:
  url: /assets/img/2024-07-12-OverusingPreloadAndSrcSetPatheticDesperationByIneptDevelopers_0.png
tag: Tech
originalTitle: "Overusing Preload And SrcSet ? Pathetic Desperation By Inept Developers?"
link: "https://medium.com/codex/overusing-preload-and-srcset-pathetic-desperation-by-inept-developers-9c07464ab882"
isUpdated: true
---

<img src="/assets/img/2024-07-12-OverusingPreloadAndSrcSetPatheticDesperationByIneptDevelopers_0.png" />

FailwindUI 템플릿에서 한 번 진짜 대단한 것을 발견했고, 공유할 필요를 느꼈습니다. 주의: 이 기사는 대부분 토로로 가득합니다.

"동료 웹 개발자들"에 대한 내 낮은 의견이 잘 알려져 있습니다. 대부분의 개발자들은 CSS 또는 JavaScript를 사용할 만큼 HTML에 대해 충분히 알지 못하다는 믿음에 뿌리가 깊습니다. 이 기본적 이해의 부족은 각 프로젝트를 통해 수백 개의 다른 문제로 이어집니다. 예를 들어, 볼륨 증가, 캐싱 기회 놓치기, 더 높은 서버 부하, 접근성 파괴 또는 없음, 그리고 수십 개 또는 수백 개의 다른 문제가 포함됩니다.

만들어지는 가장 흔한 문제 중 하나는 더 빠르게 보이려는 시도를 위해 점점 더 많은 코드를 겹치려는 것입니다. 그리고 내가 계속 말하고 있는 것 중 하나는:

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

그러나 안타깝게도 많은 개발자들이 나쁜 코드, 나쁜 실천 방식, 그리고 일반적인 무지에 대해 변명을 합니다. 이것이 의도적인 무지로 인해 Tailwind, React 등과 같은 사기성 사기가 새끼들을 속이고 속이게 하는 것을 가능하게 합니다.

웹사이트를 가속화하는 다양한 기술들이 있습니다. 예를 들어 preload 'link' 또는 HTTP 2 Push를 사용하여 로드 순서를 미세 조정하거나, 타겟 장치에 최적 크기의 파일을로드하기 위해 'srcset'을 사용할 수 있습니다. 코드의 압축(minification) 및 gzip 압축 또한 효과를 발휘할 수 있습니다. 그러나...

이것은 마법 같은 치료제처럼 모든 것에 바르는 것을 권하는 것이 아닙니다. 언제 이러한 기술이 이익을 가져다 주는지, 언제 깊게 심어진 문제를 단순히 무시하려 하고 있는지, 그리고 언제 그것들이 도움보다 해로운 효과를 가져다 줄지를 이해하지 못한다면? 그대는 바퀴를 돌리며 시간과 노력을 낭비하며 아무런 개선이 이루어지지 않습니다.

# 사례 예시

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

내가 "HTML 문맹" 시리즈의 제III부를 발표한 지 며칠 만에, TailwindUI에 대한 내 비판적인 글을 썼는데 누군가가 접촉해 왔어. 사기꾼이 이를 이용한 사기를 당한 것이 아닌가 묻는 사람도 있었어.

그들의 "웹사이트"를 살펴보니 — 두 개의 간단한 양식을 가진 기본적인 스퀴즈 페이지였는데 — 분명히 나는 지난 10년간 싸우고 있는 지뢰같은 사기꾼들에게 속았다는 걸 알 수 있었어.

"쓰고 싶지 않으면 사용하지 않으면 된다"라고 할 사람들이 있다. 거기서의 문제는 나의 작업은 미숙하게 결합된 기존 사이트에 접근하여 접근성, 속도 및 신뢰성 문제를 해결하는 것이 포함되어 있다는 것이야. 그래서 내 전에 그 사람이 했던 것을 제어할 수 있는 방법이 없어.

다른 사람들은 Tailwind가 "사기"가 아니라고 말할 것이며, TailwindUI의 많은 부분이 "무료"이기 때문에 그렇지 않을 것이라고 할 것이야. 돈의 교환을 어디서 하는지? 그게 맞아, 그들은 사기꾼이 아니라 기만가일 뿐이야. 그들의 사치스러운 것이 얼마나 위대한지 주장하는 것은 그저 속여먹기에 불과할 뿐... 하지만 진정한 사기? 아니야.

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

사기꾼들은 아는 게 없는 무식하고 무능한 바보들로, 고객들의 돈을 털기 위해 대사를 쏟아낸다. 아무것도 아닌 템플릿을 복사하여 색상과 폰트를 바꾸는 수준의 일을 하고, 그 후에 다른 이들에게 그들의 이른바 "작품"에 대한 비용을 청구할 만큼 담대하다니요.

이번 사례에서 나의 잠재적 고객은 스퀴즈 페이지에 다소 단순한 백엔드가 있는데 이를 변경하여 이벤트를 적용하기 위해 5천 달러를 지불했습니다. 그런데 이것은 결국 Tailwind UI의 Keynote 템플릿을 복사한 것일 뿐이었고, 백엔드에는 어리석은 REACT 코드가 붙여져 있었죠.

해당 템플릿을 모르는 분들을 위해 링크를 첨부합니다:
https://keynote.tailwindui.com/

말할 필요도 없이, 이전 개발자를 사기로 고발하는 것이 좋을 것 같습니다. 왜냐하면 그들은 실제로 이를 "전적으로 스크래치에서 직접 구축했다"며 이지미 없는 디자이너가 작업했다고 말했기 때문이죠. 정말 헛소리에 불과하죠.

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

이게 바로 '아이 캔즈 해브 더 인터웹스' 같은 전혀 예상했던 대로의 '돌팔이, 바보, 그리고 바보들이 가져가고 다른 이들을 속이는 '프레임워크 스튜피드'로부터 기대할 수 있는 전형적인 쇼인 것 같아요. 코드를 들여다보면 전형적인 것들이 다 나와 있어요: 표현 클래스, 의미 없는 의미론, 아무것도 없는 자바스크립트, HTML이 왜 존재하는지에 대한 완전한 무지, 제 다른 글을 읽어본 적이 있다면 어떤 느낌인지 알 거예요. 결론은 뭐냐면?

16k의 일을 하는데도 138k의 마크업이 들어가 있고, 12k의 일을 하는데 35k의 CSS가 들어가 있으며, 압축 페이지에 9개 파일에 363k의 자바스크립트가 들어가 있는데 그 안에 4k도 안 되는 일만 하는 페이지까지... 일에 필요한 코드를 12배나 더 사용하는 일상적인 웨일틴드 위대한 작업이네요.

원본 FailwindUI 쓰레기에서 했던 가장 무례한 일에 초점을 맞춰 이번에는 말도 안 되게 한 것 중 하나에 집중하고 싶네요.

# 불필요하고 쓸데없는 Preload 및 SrcSet

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

원본 FailwindUI 예제의 소스를 살펴보면 이 보석 같은 코드가 있어요: (저가 추가한 서식)

```js
<link
  rel="preload"
  as="image"
  imagesrcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=256&amp;q=75 256w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=384&amp;q=75 384w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=640&amp;q=75 640w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=750&amp;q=75 750w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=828&amp;q=75 828w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=3840&amp;q=75 3840w"
  imagesizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
  fetchPriority="high"
/>
```

각 이미지에 대해 18번 반복됩니다. 여기서 무엇이 잘못되었을까요?

- 픽셀 미디어 쿼리와 em/rem 선언을 혼합하여 사용했기 때문에, EM/REM을 사용하는 사용자들에게는 깨져있어요 (Failwind의 "잘 테스트된 구성 요소" 관련 얘기)
- 각 이미지 크기마다 동적 호출을 사용하고 있기 때문에 서버 측 크기 조정 오버헤드가 발생해요. 404 캐시 기술에 대해 들어본 적이 없나봐요.
- HTML에는 FETCHPRIORITY 속성이 없어요!!! 네, DOMHTMLLinkElement 속성으로는 존재하지만, 이것이 HTML에도 존재한다는 의미는 아니에요! 아마도 누군가 이미 HTML 속성이 JavaScript 속성이 아니라고 썼을 텐데요.
- 해당 이미지들은 4k에서도 아래로 스크롤시에 나타나기 때문에, 미리로딩하기보다는 레이지 로딩을 해야 해요 — 바로 미리로딩의 역할이에요!

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

같은 방식으로 우리가 어리석게 설계된 `img`를 이해하려고 노력할 때

```js
<img
  alt=""
  fetchPriority="high"
  width="1120"
  height="560"
  decoding="async"
  data-nimg="1"
  class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
  style="color: transparent;"
  sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
  srcset="
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=256&amp;q=75   256w,
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=384&amp;q=75   384w,
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=640&amp;q=75   640w,
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=750&amp;q=75   750w,
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=828&amp;q=75   828w,
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=1080&amp;q=75 1080w,
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=1200&amp;q=75 1200w,
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=1920&amp;q=75 1920w,
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=2048&amp;q=75 2048w,
   /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=3840&amp;q=75 3840w
 "
  src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteven-mchail.4e94472e.jpg&amp;w=3840&amp;q=75"
/>
```

또한 fetchpriority가 없습니다. 아무런 도움이 되지 않는 data-attribute, 무익한 이성을 초월한 쓸데없는 클래스, 그리고 - 최소한의 존엄을 유지해야 할 대상에 호버 애니메이션을 추가하는 것은 오히려 어리석은 사람들의 왕좌에 대한 기념비적인 행위입니다. 그런 부분에 문제가 무엇인지 설명해야 한다면, 프론트엔드 작업을 중단해 주세요.

하지만 여기서 중요한 건... 미리로드된 파일을 너무 많이 추가해서 미리로드가 이점을 제공하지 않게 만들어버린다는 사실과, 백엔드에서 동적 호출을 사용하여 끝도 없는 사이즈를 생성하도록 하기 때문에 일어나는 일에요?

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

거의 50k의 코드를 날리게 되네요 (HTML에 있어 캐시되지 않은 것들 때문에) 그리고... 대역폭을 절약하려고?!?

더 웃긴 건 이게 망가졌다는 거예요. 어떤 이유에서인지 — 적어도 내 기기에서는 — 750 넓이만 로드됩니다.

하지만 더 나빠지는 건, 왜일까요? 그 이미지들은 16:9 비율인데요... 그들이 16:9 여야 할 이유는 어디에도 없습니다 (사용자로서 나에게는 항상 배치가 망가진 쓰레기여서 고정 측정치가 망가졌기 때문이 아닐까요) 동적으로 잘라내기, 심지어 4k에서도 375px보다 큰 크기가 있어야 하는 이유가 전혀 없습니다.

그래서 그들이 3840 폭까지 쿼리를 가지고 있는 게 미친 짓이라는 거죠.

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

하지만 더 유익하고 재미있는 사실은 그들이 얼마나 적은 대역폭을 "절약"하려고 노력하는지입니다. 사용자가 바로 나가버리고 스크롤을 내리지 않아도, 이 18개의 이미지는 모두 여전히 로드됩니다. 그래서 페이지를 늦게 불러오기 위해 50k의 마크업을 사용하게 됩니다. 속도를 위해 한다는 이름으로.

더욱이 "합리적인" 최소 크기가 대략 400x225 정도라면 jpeg로는 10k일 겁니다. 그들 중에서 하나라도 4k에서는 높이가 384픽셀보다 높지 않을 것이고, 파일 크기가 15k를 조금 넘을 뿐입니다.

하지만 이미지는 파일이 .webp이지만 .jpg를 호출하기 때문에 '통계적으로 망가진' 것으로 볼 수 있습니다. 이 경우 어떤 초난감 .webp 인코더를 사용하고 있는지 궁금해집니다.

그래서 기본적으로 이미지 크기 40k를 "절약"하기 위해 50k의 코드를 낭비했다는 건가요? 와우, 다이나믹 콜에 대한 추가 서버 부하, (캐시되더라도) 페이지 로드 지연을 일으킬 마크업 팽창, HTTP 병렬성을 지연시키는 끊임없는 프리로드, 심지어 보이지도 않을 수 있는 이미지를 로드하도록 강제하는 상황을 고려했을 때, 이 보다 더 가치있어 보이네요. 그리고 첫 로드 시 실제로 6개만 사용된다는 사실에 대한 다른 기사를 위한 세부사항을 얘기하기도 전에요!

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

# 그래서 어떻게 했어야 했을까요?

- 이미지를 lazy-load로 설정하여 페이지를 멈추지 않게 처리
- 사전로드를 시도하지 말 것
- 최대 두 개만 넘는다면, 여러 가지 크기로 만드느라 시간을 낭비하지 말 것
- 이미 파일 크기에 대해 상당히 최적화된 이미지들과 시간을 낭비하는 대신, 50k의 일을 하는데 500k의 코드가 작성되는 것에 대해 무언가 하세요? 알아요, 알아요... 또 다시 두 배에서 십 배나 필요한 코드에 대해 이상한 제이슨 삼촌이 떠들고 다닐 거예요.

그들은 압축 및 gizpping된 코드가 정말 압축되지 않은 상태에서 어떻게 있을 것인지보다 더 많은 것을 가지고 있습니다. 이것이 정말 누군가에게 다음과 같은 질문을 하게 만드는 이유입니다:

# 그들이 왜 이렇게 했을까요?

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

가장 간단히 설명하면, 대부분의 Failwind를 사용할 가치가 있다고 생각하는 사람들과 마찬가지로, 그들은 그들이 무엇을 하는지 모르고 하나의 웹 사이트를 작성하기에 적격하지 않다는 점이다. 하지만 이것은 그 이상으로 깊이 있는 문제이다.

![이미지](/assets/img/2024-07-12-OverusingPreloadAndSrcSetPatheticDesperationByIneptDevelopers_1.png)

이것의 많은 부분이 copypasta 태도에 기인합니다. "주류 개발자" 기술의 부가부분이 ^C로 시작되고 ^V로 끝나는 곳입니다. 그들은 코드 스니펫을 보고 아무것도 이해하지 않고 무작정 복사합니다. 그들이 복사한 것이 작동할 것을 무작정 희망하며, 심지어 그것이 사실 가치 있는 것이라고 믿습니다. 더 나쁜 것은 "멀도록 수용 회수"의 더 많은 대안을 꼽아 들이는 점에서 훨씬 더 심각합니다.

![이미지](/assets/img/2024-07-12-OverusingPreloadAndSrcSetPatheticDesperationByIneptDevelopers_2.png)

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

대중 심리는 여기서도 역할을 합니다. Tailwind에 대한 끝없는 거짓 정보가 “사실”으로 홍보되기 때문에 어떤 일이 잘못되고 있다 해도 그것이 “당신의 잘못”이어야 하며 시스템의 잘못이 아니라는 것을 의미합니다. “숫자가 거짓말을 한다”며 “권위주의 오류”라고 말하는 것들, “수백만 명의 개발자와 대기업들이 틀릴 수 없다!”

네, 그들도 틀릴 수 있습니다. 항상 이렇게 말하고 있죠:

그리고 다시 말해, “그런데 수백만 명의 사람들”이나 “수천 개의 기업들”이라고 핑계를 대면, 나는 상위 등급의 지름길 뇌를 가진 어리석은 사람과 상호작용하고 있다는 것을 알아요. 대중 심리보다 더 큰 낚인 깃발은 없습니다!

“프런트엔드 개발자”들의 문제 중 하나는 실제로 백엔드 코더인 마인드를 가진 것입니다. 종종 그것을 인식하지 못한 채로 서버에서 최소화된 방식으로 코드를 작성하고, 사용하는 템플릿 시스템에 대해 전혀 걱정하지 않습니다. HTML/CSS에 관한 "프레임워크 병신"이라는 이유 중 하나로 이것을 의심했습니다... 그래서 내게 놀라운 일이 아니었습니다. 모든 전종 사이트에 표시되는 preload 및 srcset 링크들은 "최적화된" 서버 쪽 코드로 생성되고 있는 것이 아닌가 의심해왔습니다. 그들은 복잡한 로직과 JSX 스타일 트래시 4k 함수를 작성하고 있습니다. 이는 8k의 코드를 클라이언트 사이드로 살짝 뱉어내어 정상적으로 작성된 표시 여분 512 바이트의 작업을 수행하고 있는 것입니다. 그런 다음 "4k"를 썼다고 자랑하며, 무지한 8k가 아닌 8k를 쓰지 않고서는, 자신에게 박수를 칩니다. 여전히 필요한 코드의 8배라는 사실은 누가 상관할까요. :/

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

이 남용과 오용의 원인이 되는 것은 진짜로 플레이스보 효과가 있다고 생각합니다. 최악의 희망적 사고입니다.

![이미지](/assets/img/2024-07-12-OverusingPreloadAndSrcSetPatheticDesperationByIneptDevelopers_3.png)

이 새로운 기술들을 배웠을 때, 로드 시간에 도움이 될 수 있다고 알려져 있다. Google PageSpeed나 Lighthouse 같은 것에서 추가하는 것을 제안한다면... 무슨 일을 하는지 모르고 어떻게 작동하는지 모르는 개발자는 토니에게 기술 학교에 기부하도록 협박받을 정도로 초조한 로봇처럼 모든데 뿌립니다.

하지만 그들은 실제로 언제 어디에 사용해야 하는지 이해하지 못하기 때문에, 최신 "수리"를 급하게 적용할 때 누군가가 그것이 정당하거나 올바른지에 대해 물어보지 않습니다. 이러한 주장하는 "전문가"들은 손가락을 교차시키며 저렴한 비전조교처럼 기도합니다. 이러한 상황은 확인 편향에 의해 악화됩니다. 그들은 그것이 작동하기를 원하기 때문에, 그것이 아무것도 하지 않을 때에도 작동한다고 생각하거나, 상황을 악화시킬 때에도 작동한다고 여깁니다.

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

저는 또 다른 문제를 새롭게 드러나게 한 것 같아요: 대부분의 개발자들이 웹사이트나 앱을 성능 테스트하는 방법을 실제로 알지 못한다는 점입니다. 이들은 PageSpeed나 Lighthouse와 같은 도구에 지나치게 의존하지만, 페이지가 실제로 빨라지는 요소나 페이지를 어떻게 실제로 빠르게 만드는지, 심지어 HTTP 로드 순서와 같은 가장 기본적인 것들이 어떻게 작동하는지를 이해하지 못합니다.

로드 순서를 이해하지 못한다면, "preload"를 어디에 사용해야 하는지를 이해할 리가 없어요.

그래서 우리는 자체 오류를 심지어 디버깅할 수 없는 개발자들이 만든 방대하고 혼란스러운, 유지 관리하기 어려운 덩어리들로 끝나게 돼요. "프레임워크 바보" 때문에 모두가 더 열심히 일하지만 더 똑똑하게 일하지는 않아요... 하지만 그들은 이것이 얼마나 심각한 문제인지 사소한 모든 것이 그들을 얼마나 크게 해치고 있는지에 대해 인식하지 못해요. 와단과 같은 사람들이 "포퍼"를 판다고 생각할 정도로요.

최종 결과물은 무지한 것, 무능함, 무책임을 자신들을 숨기려고 절망적으로 발버둥치는 듯한 시도처럼 느껴져요. 마치 공주 매트리스처럼 한 장바닥 위에 또 다른 붕대를 계속 올리는 것처럼, 당근을 제거하는 것이 답인데요. 실제 문제를 해결하는 대신 "문제"에 더 많은 코드를 던지는 것이 지금은 너무 널널하게 흔해요.

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

그 결과로 파괴하려는 산업으로 보이는 산업이 나타나게 되었죠. 이것은 하나의 작은 구석 같아 보일 수 있지만, Failwind나 그 사용자로 인해 더 많은 인트를 옹호하고, 이성적이지 않은 예제를 계속해서 내놓으면 이를 모르는 사람들이 — 혹은 더 나쁜 경우, 속임수를 씌우는 사기꾼들이 여러분이 수백만 개의 부서진 쓰레기 돈 구덩이들과 마주하게 됩니다.

아마 웹사이트의 속도를 높이는 기술이 아닌, 어떻게 테스트하는지에 대해 이야기하는 기사를 써야 할 것 같아요. 대부분의 사람들은 웹사이트나 애플리케이션을 올바르게 테스트 하는 방법조차 알지 못하며, “하지만 제 컴퓨터에서는 빠르잖아요!”와 같은 자신의 편견들조차 인식하지 못합니다.
