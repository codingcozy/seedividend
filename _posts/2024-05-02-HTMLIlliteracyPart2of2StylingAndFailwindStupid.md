---
title: "HTML 문맹 스타일링과 실패 윈드 스튜피드"
description: ""
coverImage: "/assets/img/2024-05-02-HTMLIlliteracyPart2of2StylingAndFailwindStupid_0.png"
date: 2024-05-02 00:31
ogImage:
  url: /assets/img/2024-05-02-HTMLIlliteracyPart2of2StylingAndFailwindStupid_0.png
tag: Tech
originalTitle: "HTML Illiteracy (Part 2 of 2) Styling And Failwind Stupid"
link: "https://medium.com/codex/html-illiteracy-part-2-of-2-styling-and-failwind-stupid-f4867d13595a"
isUpdated: true
---

<img src="/assets/img/2024-05-02-HTMLIlliteracyPart2of2StylingAndFailwindStupid_0.png" />

우선, 제가 처음부터 시작했던 템플릿의 마무리된 모습을 보여드릴게요. CSS의 어떻게/무엇을/왜 나누기 전에 숫자와 방법론에 대해 이야기하고 싶어요.

여기서 찾을 수 있어요:
https://cutcodedown.com/for_others/medium_articles/failwindUI/shotlight/shotlight.html

내 모든 예제와 마찬가지로 디렉토리는 쉽게 탐색할 수 있도록 잠금이 해제되어 있어요:
https://cutcodedown.com/for_others/medium_articles/failwindUI/shotlight/

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

그리고 거기에는 전부가 포함된 .rar 파일이 있어서 여러분이 자유롭게 사용해 볼 수 있어요.

그렇다, 1:1이 완벽하지 않은 이유는 레이아웃 문제, 공백의 낭비로 UX가 저하되는 문제, 접근성이 떨어지는 폰트 크기, 크로스 플랫폼의 불일치를 초래하는 쓰레기 "시스템 폰트" 스택의 추악한 사용, 거의 읽을 수 없는 컬러 대조까지 모든 문제를 수정했기 때문이에요. 하지만 그 마지막 부분에 대해서는 제 시력 상의 이유로 액세시빌리티 문제에 대해 굉장히 민감해져 버린 것 같아요!

# 숫자로 대화해요

크기가 코드 품질을 항상 보장한다는 의미는 아니지만 – 너무 크거나 너무 작을 수도 있지만 – 인자들이 엉터리 쓰레기임을 확실하게 알 수 있는 징후들이 있어요.

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

그래서 TailwindUI의 원본 "스포트라이트"와 내가 다시 쓴 "샷라이트"를 비교해보겠습니다.

```js
      원본              나의 수정본
     개수   크기        개수   크기        비율
HTML   1   32,506   HTML   1    3,768      8.627 : 1
 CSS   1   35,604    CSS   1    9,097      3.914 : 1
  JS  10  385,106     JS   1    1,240    246.053 : 1
--------------------  ----------------  ------------
합계  12   453,216       3   14,105     32.131 : 1
```

내가 코드를 사용하는 것이 필요한 코드의 2배에서 10배를 사용한다고 말하면 사람들은 항상 의아해합니다... 그럼 32배나 필요한 코드와 246배의 JavaScript를 사용하는 건 어떨까요?

공정하게 말하자면, 전체 사이트를 마칠 때까지 내가 가지게 될 거대한 스타일 시트가 약 32k 정도 됩니다. 35k의 CSS는 그 파일이 모든 페이지에 공유되는 경우 무리하지 않습니다. 그렇지만 모든 페이지의 마크업이 전체 페이지에 32k 이상이거나 SPA 로드 버전에 14-15k가 될 때 그들에게 무엇을 절약해 주는지 의문이 듭니다.

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

--- EDIT --- 와우, 난 정말 숫자들을 Mr. Scotted 했어. Part 4에서 모든 페이지를 만들었고 CSS 양은 얼마나 됐을까? 10.6k이었어. 그래서 수정해야 할 점은, Failwind를 사용하면 필요한 CSS 양이 세 배나 된다는 거야. 그래서 하나의 페이지의 HTML과 다섯 개의 템플릿 페이지의 CSS를 합친 용량은 그들의 마크업 또는 CSS의 1/3이라는 거야. 하지만 그렇지, Failwind는 최적화되어 있고 쓸모없는 것은 컴파일해 버려.

Failwind와 그들이 사용한 것들이 "더 쉬운" 접근 방식이라고 날 설득할 수는 없어. 또는 그런 엉망으로 유지되는 것이 "협업하기 더 좋다", "잘 테스트된다", "기업용으로 확장 가능하다" 같은 말로 잘못 믿지 말라는 거야.

이 절대적인 헛소리를 방어하는 사람들은 거짓말쟁이이거나, ‘진실이기 때문이 아니라 당신이 원하기 때문에’ 받아들인 거짓말을 빈말하는 사람이거나, 그냥 웹 개발에 대해 충분히 알지 못해 블러디 주제에 이 대하면서 아무것도 모르는 사람이야!

# 그리고 Failwind가 최악인 게 아니야!

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

본 사이트를 살펴보면서, 워낙에 JavaScript를 300k가량 사용해서 뭐하는 건지 궁금했어요. 전 10k도 안 쓸 것을 하고 있는데 말이죠... 그리고 그것이 정상적인 웹 사이트를 위한 템플릿이었는데, 왜 그런 SPA를 만들었는지 알게 되었어요.

왜지? 그냥 속도가 빠르다는 환상을 제공하기 위해서죠.

저는 이것을 많이 봤어요. 부트스트랩, 페일윈드, 뭐야이런 쓸데없는 쓰레기 때문에, 그리고 "의미론적인 것이 뭐지?" 하고 "와와, 눈이 결합체를 다룰 수 있어" 하고 이딴식으로 하다보니까, 큰 차트가 필요한 페이지들이 불필요하게 거대한 CSS나 JS에 의존하게 돼요. 이런 페이지들은 후원하는데 시간이 많이 걸리고, 호스팅 비용이 비싸고 여러 가지 다른 문제들이 생겨요. 특히 페이지 로딩 속도에 대한 "페이지 로딩은 악이다" 라는 헛소리 측면에서.

대신에 파일이 그렇게 크지않았다면, 브라우저 캐시에서 계속 삭제되지 않을 겁니다, 어찌됐든 어떤 캐시 제어가 있더라도; 프레젠테이션을 마크업에 쓰지 말고 "유틸리티"나 "원자" 같은 속임수로 자신을 속이지 말고; HTML과 CSS가 완전히 잘하고 있는 작업을 스크립트의 도움 없이 JS를 쓰지 않았다면; 그리고 대체적으로 10k의 작업을 위해 100k의 HTML을 사용하지 않았다면?

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

아마도, 진짜로 아마도 "페이지로드는 악이다"라는 생각을 하지 않고 더 높은 성능을 가진 사이트를 만들 수 있을 거에요. 더 깔끔하고 명확하며 작업하기 쉬운 마크업을 사용해볼 수 있어요. 아마도 모든 문제에 대한 해답은 모든 것에 더 많은 코드를 던져야 한다는 괴물들과 사기꾼들의 말에 속아들지 않게 될지도 모르겠네요. 기억해요:

# SPA에게 무정한가요?

NO! TailwindUI의 원래 "spotlight" 템플릿이 이를 증명해주잖아요. 왜냐하면 이것은 TailwindUI의 90%나 그 쯤인 쓰레기들과 마찬가지로 무용지물(SPA)일 뿐이거든. 아니면, 캐싱 모델, HTTP 병렬처리 등을 우리이 나눔 관심에 따라 따르면 코드 양이 한 쪽만큼 해결될 수 있거든.

나는 SPA에 합당한 사용 예가 없다고 말하고 싶진 않아요. 또는 특정 유형의 콘텐츠를 로딩하는 데 일반적으로 AJAX를 사용하는 경우가 있죠. 그것은 이유가 있어요. 하지만 그 이유가 "와 와, 페이지로드를 원치 않아"가 아니에요.

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

위 템플릿이 말한 바가 무엇인지 궁금하신가요?

- 스크립트가 서브페이지에 로드될 때 페이지 로드를 피하려고 한다면, 각 서브페이지의 크기는 14-16k입니다. 이는 동일한 페이지에 대한 전체 마크업보다 큽니다! 그리고 기억하세요, 내 CSS와 JS는 캐시되어 있고 그 페이지들을 미리 캐싱하게 됩니다.
- 그들은 JavaScript 수백 킬로바이트가 필요하며, 그것을 위해 심지어 JavaScript마저 없는 것으로 처리합니다.
- 이게 진짜 충격이죠... 그들이 사용하는 암호화폐 거래소에서 전체 메뉴를 보여줄 때 - 데스크탑이든 모바일 버전을 여는 경우든 - 그들의 시스템은 모든 서브페이지를 로드합니다, 심지어 방문자가 그 페이지들을 방문하지 않을지라도.

다시 한 번 강조하고 싶어요:

![이미지](/assets/img/2024-05-02-HTMLIlliteracyPart2of2StylingAndFailwindStupid_1.png)

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

진짜, 이거 보면 멍청하다고 생각해:

가운데에 평균 15k인 x-구성 요소 그룹이 보이지? 그것이 하위 페이지의 내용이야. 정적인 하위 페이지들! 내가 "올바르게" 코딩했다면 — 내만의 표준에 따라 거만하게 구현한 것들을 말해봐, (와우, 이건 아픈 자기 인식이야) — 아마도 각각 4k의 내용이 있어서 가장 최악의 경우에도 총 8k의 페이지 로드가 될 걸세.

다시 말해서, 모든 스타일과 스크립트가 캐시되어 있을 테니까.

오 안돼!!! 8k 페이지 로드!!!

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

사실 CSS의 :target 속성을 사용하여 거의 동일하게 작동하는 SPW — Single Page Website — 를 만들 수도 있을 것 같아요. 심지어 JavaScript를 필요로하지 않는 40k HTML 파일조차 필요하지 않을 수도 있어요!

왜 안 해볼까요? 예전에 :target을 실험해볼 때 작은 x86 어셈블리 언어 참조를 만들면서 그랬었거든요.
https://x86.cutcodedown.com

"해시 링크"의 힘이죠.

이전에 언급한 적이 있는 대로:

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

이제 어떤 사람들은 Tailwind에 대한 책임을 물을 수 없을 것이라고 생각할 수 있겠지만, 처음부터 이따위 쓰레기 스크립팅으로 뛰어드는 것을 유발할 수 있는 것이 무엇일지 물어봐야 합니다. Failwind의 사용, SPA의 사용(이 경우), 끝없는 "아무것도 하는 JavaScript", 손상된 캐싱 모델의 사용. 이 모든 것들은 제가 계속 이야기하는 문제의 증상일 뿐입니다.

# HTML 및 CSS 무지

Failwind와 같은 어리석은 것을 사용할 만한 사람들은 무수한 무의미한 DIV 수프, 잘못된/접근할 수 없는 제목 순서, 표현적인 마크업을 속이거나, 심지어 "스크립트화되어서선 안 될 것들"을 위해 JavaScript를 사용하는 사람들을 가리킵니다. 물론 이들은 보다 빠르게 만들기 위해 일각에서 코드를 더 던지려는 안타까운 노력의 결과로 속아넘어가게 될 것입니다.

그것이 바로 그들이 React, Vue 또는 Angular에 열광하고 PHP에 물을 끼얹는 이유인 거 같아요. PHP는 보통 웹사이트를 위한 깔끔하고 간단한 마크업을 쉽게 작성하게 해줍니다. 너무 깔끔하고 간단한 해결책이라서 그들의 node.js 기반 솔루션들이 그저 어리석게 보이게 만드는 것이죠.

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

과거 10년 동안 상담한 클라이언트 중 3분의 1에서 해고당한 "디자이너"와 "프론트엔드 코더"들과 거의 일치합니다.

그들은 HTML이나 CSS를 제대로 사용하는 방법을 몰라서 마크업에 프레젠테이션 클래스를 던지거나, 스크립트화 될 필요가 없는 것들에 자바스크립트를 던지며, 예술적인 사람들이 사이트 카펫 전체를 걸어다니며 추적한 후, "수리"라고 약속하는 어떠한 해결책이든 코드를 더 던짐으로써 모든 것을 해결하려고 합니다.

더 많은 코드와 어려운 트릭이 느린 유지보수가 어려운 웹사이트를 마법처럼 고칠 수 있다고 생각하십니까?

어떤 분들이 여러분에게 이 프레임워크 쓰레기가 도움이 된다고 생각하십니까? 속은 것입니다!

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

Nue.js의 기사에서 일부 이미지를 사용하여 보여주려고 했던 것이에요. 제 코드를 사용하여 동일한 비교를 할 거예요.

TailwindUI의 원래 "spotlight" 템플릿은 다음과 같아요:

```js
 <div class="flex flex-1 justify-end md:justify-center">
  <div class="pointer-events-auto md:hidden" data-headlessui-state="">
      <button
          class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
          type="button"
          aria-expanded="false"
          data-headlessui-state=""
      >
          Menu
          <svg viewBox="0 0 8 6" aria-hidden="true" class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400">
              <path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
      </button>
  </div>
  <div
      style="
          position: fixed;
          top: 1px;
          left: 1px;
          width: 1px;
          height: 0;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
          display: none;
      "
  ></div>
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
<a href="#mainMenu" hidden>
  <span>메인 메뉴 열기</span>
</a>
```

아래 CSS와 함께 사용하세요:

```js
a[href="#mainMenu"] {
  display:block;
  width:2.25rem;
  height:2rem;
  background:linear-gradient(
    to bottom,
    var(--linkColor) 0%,
    var(--linkColor) 18%,
    transparent 18%,
    transparent 41%,
    var(--linkColor) 41%,
    var(--linkColor) 59%,
    transparent 59%,
    transparent 82%,
    var(--linkColor) 82%,
    var(--linkColor) 100%
  );
}
a[href="#mainMenu"] span{
  position:absolute;
  left:-200vw;
}
```

선형 그라데이션을 사용하여 "확인" 햄버거 아이콘 만들기. 귀여운 트릭이죠?

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

다시 한번 상기해 주세요. 처음 로드에 HTTP 병렬 처리가 지연될수록 마크업이 커질수록 클 수록입니다. 마크업에 선언될 수 있는 서브 파일에서 선언될 수 있는 것이 더 많다면, 더 많은 캐싱 기회를 놓치게 됩니다. 그래서 그런 식으로 HTML에 모든 것을 넣어두면 비슷한 페이지 사이에 캐싱이 되지 않아요... 모바일 메뉴 링크 같은 것이 매 페이지에 있을 때? 그래, 그건 어리석은 짓이에요.

그리고 그 무례함 때문에 사람들이 SPA로 가려고 시도하는 겁니다. 관련 분리를 따르는 수고를 하지 않고 다시로드할 필요가 없는 것을 다시로드하기 위해 코드를 추가하는 겁니다.

그래서 Wathan의 작은 "분리는 중요하지 않다"는 그가 얼마나 사기꾼인지를 절대적으로 보여줍니다. 그는 원래 사이트 구축 HTML 3.2 스타일의 기념비를 만드는 과정에서 그것이 왜 그런지 신경 쓰지 않았거나 이해하지 않았던 것을 심취하는 대신 대안을 만들려고 시도했어요.

하지만 맞아요, 과거에 갖혀있는 것은 저겁니다...

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

생각해 봐. 사용자가 해당 페이지로 이동하지 않더라도 모든 하위 페이지 내용을 동시에 로드하여 SPA 방식이 전 면적을 차지하는 경우, 그들이 작업하기 위해 사용하는 대규모 스크립팅과 함께 저장하지 않는 SPA 접근 방식을 고려해보세요 (아마도 2백킬로 바이트 작업을 수행하고 있지 않을까요). 그들은 관심 분리 작업을 하지 않아도 되는 평균 15킬로 바이트의 마크업을 "페이지" 당 로드하고 있습니다. 대부분의 경우 이러한 페이지는 완성된 마크업으로 10킬로 바이트 이하여야 하는데요. 제대로 마크업을 작성하고 일반 페이지 로드가 발생하도록 하는 것보다 어떠한 이점을 얻을 수 있을까요?

답은 아무것도 아닙니다. 그들은 물 속을 헤엄치며, 실제로 더 느려지고, 작업하기 어렵고, 유지 보수하기 어렵고, 다른 사람들에게 이해하기 어려워집니다. 사람들이 주장하는 가치를 반대하게 되죠!

# 그래서 내 CSS에 대해 이야기해 볼게요!

약속한 대로, 스타일시트 결정사항에 대해 분석해볼게요.

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

외부 모노리식 스타일시트에 모든 것이 담겨 있습니다. 하나의 파일, 한 번의 핸드셰이크만으로도, 화면에 특별히 대상화되었기 때문에 화면 외의 사용자들은 제 화면 모양에 전혀 신경 쓰지 않습니다. HTML에서 화면 모양을 다루는 것은 정말 바보 같은 행동이죠. 당신은 맹목, 점자, TTY, 검색과 같은 사용자들에게 시각적인 레이아웃, 색상 또는 기타 형식 요소에 관심 없이 정보를 보내고 있는 것입니다.

그래서 만약에 class="text-center text-lg text-400-red"와 같은 것을 말한다면, 세계에 친절하고 패배를 인정하고, HTML 3.2 또는 4 Tranny를 쓰는 것으로 돌아가세요! 당신은 HTML이 존재하는 이유를 제대로 깨달지 못한 것입니다.

저는 항상 가장 크고 넓은 레이아웃부터 시작해서 창을 좁히다가 갑자기 깨지는 지점에서 쿼리를 조정합니다. 초기에 이렇게 했던 이유는 미디어 쿼리를 알지 못하는 레거시 UA들이 데스크탑이었기 때문에, 데스크탑을 먼저 다룬 것입니다. 스타일 측면에서 보면, 이는 데스크톱과 모바일에서 퀄리티한 경험을 제공하는 가장 신뢰할 만한 방법이고, 그래서 "모바일 퍼스트" 접근법을 완전히 틀렸다고 생각해 왔습니다.

기억하세요: HTML은 기본적으로 반응형입니다. 디자인이 문제를 일으킨 것입니다.

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

아래로 튕기는 공을 따라가보세요:
https://cutcodedown.com/for_others/medium_articles/failwindUI/shotlight/template/shotlight.screen.css

먼저 웹폰트를 로드합니다.

```js
@font-face {
  font-display:swap;
  font-family:flowtext;
  font-style:normal;
  font-weight:normal;
  src:
    url("fonts/poppins-western.woff2") format("woff2"),
    url("fonts/poppins-western.woff") format("woff");
}
```

2024년이니, 웹폰트로 .ttf, .eot, .svg같은 것들을 건드릴 필요 없습니다. 전체 스타일시트를 바꾸지 않고도 웹 "플로우 텍스트"에 사용되는 글꼴을 바꿀 수 있도록 플로우텍스트(flowtext)라고 부릅니다. "poppins-western"은 Poppins의 라틴-1 외의 모든 것을 제거한 버전이며, woff2로부터 파일 크기를 150k에서 단 30k로 축소했습니다.

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

저는 예전에 일주일 사용하지 않았던 일부 오래된 UA(Universal Analytics)들을 위해 외부 스타일을 먼저 넣곤 했어요. 지금은 현대적인 문제는 아니지만, 그냥 제가 익숙해서 계속 사용하고 있어요.

다음으로, 라이트 모드용 색상 세트를 설정하고 여러 곳에서 사용할 수 있는 계산을 설정해두었어요.

```js
body {
  --bodyBg: #DDD;
  --borderColor: #BBB;
  --contentBg: #FFF;
  --mainMenuBg: linear-gradient(
    to bottom,
    #EEE 0%,
    #DDD 100%
  );
  --flowColor: #333;
  --headerColor: #000;
  --linkColor: #000;
  --focusColor: #088;
  --highlightColor: #077;
  --navBg: #DDD;
  --modalHeaderBg: #CCC;
  --modalBorder: 0.0625rem solid #666;
  --sectionFocusBg: #DDD;

  --sidePad: max(0.5rem, 3vw);
}
```

저는 간단하게 유지하기 위해 3자리 16진수를 선택했어요. 요즘 제가 제작할 때는 HSL을 변수와 함께 사용하여 색상 체계를 빠르게 변경할 수 있지만, 데모를 위해서는 이것으로 충분해요.

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

"거리는 사람들이 '이것을 :root에 선언해야 한다고 말하는 사람들이 많아요' 또는 'body에는 그렇게 넣을 수 없어'라는 피드백을 받았어요. 그 이유가 뭔가요? CSS 사용자 지정 속성은 어디서든 설정할 수 있구요. BODY 및 해당 콘텐츠에만 유용한 속성을 :root에 규칙으로 적용하는 이유가 무엇일까요?

솔직히 말해서, 만약 :root에서 CSS 작업을 해야 한다면, 아마도 정말, 정말 잘못된 방법을 사용하는 중이겠죠.

다음으로, 다크 모드를 위해 간단한 클래스를 사용하여 이를 재정의하겠어요:

```js
body.dark {
  --bodyBg:#333;
  --borderColor:#444;
  --contentBg:#000;
  --mainMenuBg:linear-gradient(
    to bottom,
    #000 0%,
    #222 100%
  );
  --flowColor:#CCC;
  --headerColor:#EEE;
  --linkColor:#FFF;
  --focusColor:#0AC;
  --highlightColor:#0BC;
  --navBg:#333;
  --modalHeaderBg:#333;
  --modalBorder:0.125rem solid #000;
  --sectionFocusBg:#333;
}

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

간단해요. 이렇게 모두 쉽고 기억하기 쉬운 의미 있는 변수 이름들이라니? 그렇죠, 그런 느낌이에요.

다음은 리셋이에요. 모든 것을 리셋하는 * { margin:0; padding:0; border:0;} 같은 리셋들은 FF에서 INPUT과 TEXTAREA 같은 것들의 스타일을 망가뜨릴 수 있어요. Meyers의 "리셋 리로디드" 같은 다른 리셋들은 너무 크기 때문에 프레임워크처럼 보이고 리셋에 나쁜 명성을 샀어요. 제 리셋은 적어도 금방 중간 정도에 있다고 생각해요.

html,body,div,p,h1,h2,h3,h4,h5,h6,
ul,ol,li,dl,dt,dd,form,fieldset,caption,legend,
table,tr,td,th,address,blockquote,img {
 margin:0;
 padding:0;
}

img, fieldset {
 border:none;
}

body *, *:after, *:before {
 box-sizing:border-box;
 flex:0 0 auto;
}

button, label, summary {
 cursor:pointer;
}

hr {
 display:none;
}

html, body {
 height:100%;
}

body, button, input, table, textarea, select {
 font-size:1rem;
 line-height:1.5;
 font-family:inherit;
}

그리고 일반적인 값을 몇 가지 설정해 주죠.

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

body {
  font-family: flowtext, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--headerColor);
}

알아볼만한 내용이네요. #fauxbody:

#fauxBody {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background: var(--bodyBg);
  color: var(--flowColor);
}

이것은 BODY의 행동을 가장하여 스크롤링을 다루지만, 다른 절대 및 고정 위치 요소가 스크롤바를 회피 가능케하여 일반적인 모달 대화 상자의 이중 스크롤 막대 버그를 처리합니다. 또한 MAIN에 flex-grow를 넣어 "100% 최소 높이" 레이아웃을 손쉽게 만들게되어 있습니다. 이것은 max-width 동작을 설정한 후에 수행되는 작업입니다.

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

#fauxBody > * {
  width:100%;
  max-width:calc(54rem + var(--sidePad));
  margin:0 auto;
  padding:1rem var(--sidePad);
  background:var(--contentBg);
}

main {
  flex-grow:1;
}

나는 좀 더 좁은 max-width와 동적으로 성장/축소하는 패딩을 위한 계산을 사용했어. 이건 텍스트의 긴 줄이 읽기 어려워지지 않게 제한하고, 커다란 디스플레이에서 더 나은 간격을 만들어 주면서 작은 화면에 적합하게 축소해줘.

아이콘에 대해 배경 정렬과 크기 조정을 공유하는 요소들이 몇 개 있어서, 이들을 함께 묶어 뒀어.

#top > a:first-child:after,
#mainMenu div > a:before,
.toggleLightDark {
  background-position:center;
  background-repeat:no-repeat;
  background-size:contain;
}

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

해당 내용은 Markdown 형식입니다. 아래는 원문의 번역입니다.

헤더:

#top {
  display:flex;
  align-items:center;
  gap:0.5rem;
}

#top a {
  text-decoration:none;
}

#top > a span,
#mainMenu a[href="#"] span,
.toggleLightDark span,
h1 {
  position:absolute;
  left:-200vw;
}

또한 이것은 flex 컨테이너이며, 그 안에 밑줄이 그어진 앵커를 원하지 않고, 이 모든 SPAN과 h1은 아이콘 또는 이미지를 대신하여 화면 밖에 숨겨져야 합니다.

나는 화면에서 숨기는 대신에 화면 판독기가 잘못된 화면 미디어를 따르는 경우에도 해당 텍스트를 읽을 수 있도록 화면 밖에 위치시키는 것을 사용했습니다.

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

#top > a:first-child:after {
  content:"";
  display:inline-block;
  width:3rem;
  height:3rem;
  background-image:url(images/avatar.webp);
  border-radius:1.5rem;
}

그래서 첫 번째 앵커 안에 생성된 콘텐츠를 사용하여 숨겨진 H1을 감싸 아바타 원을 만듭니다. 이것은 모든 페이지에서 사용되기 때문에 우리는 외관을 미리로드하여 각 페이지를 더 작고 빠르게 만들었습니다! 이것은 변경 기회를 놓치지 않고 마크업에 '쓸데없는 것'을 넣는 것을 의미하는 것입니다. HTML 캐싱은 여전히 작동하지만 쓸데없는 이야기하는 사람들! 너희는 쓰레기에 대해 아무것도 모르는 것이야. 조용히 있어!

#mainMenu {
  flex-grow:1;
}

#mainMenu ul,
#fauxBody > footer > ul {
  list-style:none;
  display:flex;
}

메인 메뉴는 사용 가능한 공간을 채우도록 허용되며, 데스크톱에서 다크/라이트 토글 및 사이트 로고 사이에 중앙에 배치됩니다. 푸터와 헤더 메뉴가 일부 스타일을 공유하기 때문에 함께 그룹화했습니다.

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

간단하게 푸터를 끝내는 걸로 할 수 있겠군요.

#fauxBody > footer {
  display:flex;
}

#fauxBody > footer > ul {
  flex-grow:1;
  gap:0.25rem 1rem;
}

메인 메뉴는 로켓 과학이 아닙니다. Von Braun이 말했듯이, 달에 사람을 올리는 것도 로켓 과학이 아닙니다. 그들을 안전하게 집으로 데려오는 것이 중요한 것죠.

#mainMenu ul {
  justify-content:center;
}

#mainMenu li a,
#fauxBody > footer a {
  display:block;
  text-decoration:none;
  color:var(--linkColor);
  transition:color 0.3s;
}

#mainMenu li a {
  padding:0.5rem;
  background:var(--mainMenuBg);
  border:solid var(--borderColor);
  border-width:0.0625rem 0;
}

#mainMenu li a:focus,
#mainMenu li a:hover,
#fauxBody > footer a:focus,
#fauxBody > footer a:hover {
  color:var(--focusColor);
}

#mainMenu li strong a {
  color:var(--highlightColor);
}

#mainMenu li:first-child a {
  padding-left:1rem;
  border-left-width:0.0625rem;
  border-radius:2.5rem 0 0 2.5rem;
}

#mainMenu li:last-child a {
  padding-right:1rem;
  border-right-width:0.0625rem;
  border-radius:0 2.5rem 2.5rem 0;
}

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

내가 보여준 추가된 푸터 스타일 몇 가지를 보실 수 있지만, 정말로 이 모든 것이 무엇을 하는 것인지 설명해야 한다면 CSS를 배우세요.

라이트/다크 토글은 원본 이미지가 너무 얇아 거의 보이지 않고 접근성 최소 기준을 완전히 미달했기 때문에 font-awesome에서 SVG를 빌렸습니다. 나는 이를 CSS에 인라인으로 넣어 그 불필요한 쓰레기들이 경쟁할 기회를 줬지만, 실제로는 웹폰트를 사용할 것입니다.

테두리없이 색상을 투명하게 한 버튼을 만듭니다. .toggleLightDark {
  display: block;
  width: 3rem;
  height: 2.5rem;
  border: 0;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z'/%3E%3C/svg%3E");
}

어두운 모드일 때 이미지 바꾸기 .dark .toggleLightDark {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath d='M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z'/%3E%3C/svg%3E");
  filter: invert(1);
}

SVG에 이미 색상을 직접 넣을 수도 있지만 CSS에서 SVG를 사용할 때는 filter가 더 나은 선택입니다. 단색 SVG의 경우 filter를 사용하여 검정에서 흰색으로 전환하는 것뿐만 아니라, filter가 할 수 있는 모든 작업을 조사하면 심지어 색상을 입힐 수도 있습니다! "CSS에 있는 SVG의 색상을 제어할 수 없다"는 얘기는 그만큼일 뿐입니다.

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

다음으로 UI 일관성을 위해 공통 요소를 스타일링합니다.

h2 {
  font-size: clamp(1.25rem, 6vw, 2rem);
  line-height: 1.2;
  max-width: 32rem;
}

h2 > span {
  display: inline-block;
}

h3,
p {
  max-width: 40rem;
}

p {
  margin: 1rem 0;
}

클램프된 글꼴 크기는 모바일에서 매끄럽고 깨끗하게 확장되도록 하며, Failwind와 같은 메디어 쿼리나 쿼리 기반 클래스를 사용하는 번거로움을 피할 수 있습니다.

.articleSummaries는 매우 단순하게 시작됩니다:

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

.articleSummaries {
  margin-top: 2rem;
}

.articleSummaries > a {
  text-decoration: none;
  color: inherit;
}

.articleSummaries article {
  margin-top: 1rem;
}

.articleSummaries > a * {
  transition: background 0.3s;
}

.articleSummaries article > header {
  display: flex;
  align-items: start;
}

.articleSummaries article h3 {
  width: 1%; /* 텍스트 줄 바꿈 수정 */
  order: 2;
  flex-grow: 1;
  font-size: 1.2rem;
  line-height: 1.25;
  padding: 1rem;
}

.articleSummaries article > header > time {
  padding-top: 1rem;
  width: 10rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.articleSummaries article > header ~ * {
  margin-left: 10rem;
}

다시 말하지만, 그 곳에서 특별히 기록할 내용은 없어요.

H3와 TIME은 HEADER 컨테이너 내에서 순서가 바껴 있고 padding과 line-height를 사용하여 수직 정렬되어 있어요. 맨 끝에서는 HEADER의 형제 태그마다 TIME 요소의 너비만큼 들여쓰기가 되어, 제목과 맞춰져 있어요.

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

그런데 호버 상태는 앵커 가상 상태 내에서 동일한 인접 형제 선택자를 사용합니다.

.articleSummaries > a:focus header h3,
.articleSummaries > a:hover header h3,
.articleSummaries > a:focus header ~ *,
.articleSummaries > a:hover header ~ * {
  background: var(--sectionFocusBg);
}

좀 아쉽지만, 'TIME'이 강조되지 않길 원하기 때문에... 이것이 마크업 의미론을 희생하지 않는 한 우리가 고생하는 방식입니다.

일부 마진 축소 문제로 인해 또는 'TIME'을 왼쪽으로 넘기지 않을 때를 생각해, 절대적인 위치 대신에 패딩에서 마진으로 바꿉니다.

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

.articleSummaries p {
  margin: 0;
  padding: 0 1rem 1rem;
}

그리고 이것이 모두 바로 데스크탑 레이아웃입니다. 총 6k밖에 없어요.

미디어 쿼리는 코드 작성 순서와 다르게 나와 있습니다. 보통 소스에서 작은 것부터 큰 것 순서대로 나열하는 편이지만, 우리는 먼저 가장 작은 것을 살펴보겠습니다:

@media (max-width: 30rem) {
  #fauxBody > footer {
    display: block;
    text-align: center;
  }
  #fauxBody > footer ul {
    justify-content: center;
  }
} /* max-width:30rem */

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

그것은 단순히 왼쪽/오른쪽 동작을 제거하여 메뉴를 멍청하게 중앙에 위치시키는 것 뿐이에요. 졸려요.

@media (max-width: 35rem) {
  header > a:first-child {
    flex-grow: 1;
  }
  a[href="#mainMenu"] {
    display: block;
    width: 2.25rem;
    height: 2rem;
    background: linear-gradient(
      to bottom,
      var(--linkColor) 0%,
      var(--linkColor) 18%,
      transparent 18%,
      transparent 41%,
      var(--linkColor) 41%,
      var(--linkColor) 59%,
      transparent 59%,
      transparent 82%,
      var(--linkColor) 82%,
      var(--linkColor) 100%
    );
  }
  #mainMenu,
  #mainMenu > a {
    width: 100%;
    height: 100%;
  }
  #mainMenu {
    position: fixed;
    top: 0;
    left: -200vw;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    opacity: 0;
    transition: left 0s 0.5s, opacity 0.5s;
  }
  #mainMenu:target {
    left: 0;
    opacity: 1;
    transition: opacity 0.5s;
  }
  // 나머지 내용은 생략합니다.
} /* max-width:35rem */

해당 스타일은 햄버거 메뉴의 모달 버전을 만듭니다. 앵커를 확장하여 햄버거를 밀고 밝은/어두운 모드를 오른쪽으로 이동시키고 있는데, 중앙 NAV를 제거하고 있기 때문입니다. "hidden" 메뉴 앵커를 보이도록 하기 위해 display:block을 사용하고, "버거 아이콘"처럼 보이도록 스타일을 지정했어요. 바깥쪽 NAV는 모달로 스타일을 적용하여 화면 밖으로 이동되도록 하여, :target일 때 보여주기 위해 애니메이션 효과를 줄 수 있어요.

:target을 사용하면 자바스크립트 없이 모달 메뉴를 만들 수 있으며, 링크로 직접 연결할 수도 있답니다.

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

외부 앵커는 #mainMenu 내부에 전체 화면 크기로 설정되며, DIV 아래로 슬라이딩하기 위해 음수 마진이 설정됩니다. 이를 통해 그 DIV 외부를 클릭하여 모달을 닫을 수 있습니다.

DIV 자체는 메뉴 프레임이며, 여기에서는 margin:auto를 사용하여 스크롤 막대가 나타나고 음수 마진이 모든 크기에서 올바르게 정렬되도록 합니다.

생성된 콘텐츠를 사용하여 "메인 메뉴" 텍스트를 만들고, DIV 내부의 닫기 앵커는 해당 콘텐트의 패딩 위에 절대 위치로 배치되어 멋진 닫기 "X" SVG를 만듭니다.

그런 다음 데스크톱 스타일링을 많이 제거하고 모바일에 더 유용한 스타일을 적용합니다. 어떤 사람들은 이것이 복잡해 보인다고 할 수 있지만... 그렇지 않습니다.

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

마지막 쿼리:

@media (max-width: 40rem) {
  .articleSummaries article > header {
    display: block;
  }
  .articleSummaries article h3 {
    width: auto;
  }
  .articleSummaries article > header time {
    display: block;
    width: auto;
    padding: 0 1rem 1rem;
    margin-top: -1rem;
  }
  .articleSummaries article > header ~ * {
    margin-left: 0;
  }
  .articleSummaries > a:focus article,
  .articleSummaries > a:hover article {
    background: var(--sectionFocusBg);
  }
} /* max-width:40rem */

화면이 너무 작은 경우에는 날짜를 별도의 열로 표시하는 대신 H3 아래에 표시하고 모든 것에 적절한 강조 효과를 추가하며 패딩/마진을 조정합니다.

여기까지 전체 CSS입니다...

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

# 이 것이 요지입니다

이 HTML 및 CSS를 결합하면 마크업 코드의 3분의 1이 됩니다! 더 깔끔하고 명확하며 간단하며 작업하기 쉽습니다. SPA를 사용하면 캐싱을 활용하여 오히려 더 나빠지고 좋아지지 않습니다.

이를 이해하지 못하는 사람은 단 하나의 HTML 줄조차 작성하는 데 자격이 없습니다. 그만. 500 달러 이상의 인간 악성 소프트웨어 구호금을 받을 수 없습니다.

이것이 바로 나의 생각을 나타내는 이유입니다. 매우 독특한 페이지 - 희귀한 경우 - 스타일 시트는 최대 1k 증가해야하기 때문에 대부분의 웹 사이트는 총 48k를 넘는 이유가 전혀 없습니다. 전체 템플릿을 복제한다면 전체 페이지에 대해 총 24k를 초과하여 크게 깨질 것으로 예상할 수 있습니다. 따라서 실제로 모든 페이지가 구현된 후에도 단일 페이지 + 거대한 스타일 시트의 HTML보다 마크업만으로 아마도 더 작을 것입니다.

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

자바스크립트 없이 대부분의 기능이 구현되어 있지만 라이트/다크 토글 기억 및 키보드 보조로 모달 동작을 개선하기 위해...

# 일부 자바스크립트

여기를 따라 참고하세요:
https://cutcodedown.com/for_others/medium_articles/failwindUI/shotlight/scripts/shotlight.js

이것에 대해 모듈을 사용하지 않겠습니다. 왜냐하면 클라이언트 측에서 그렇게 분할하면 그만큼 핸드쉐이크의 수가 늘어나서 콘텐츠에 더 좋게 사용될 수 있는 횟수가 늘어나기 때문입니다. 나는 그러므로 유지하려고 노력하거나 적어도 배포하기 전에는 단일 스크립트를 사용할 것입니다. 100k 내외로 커질 때 병렬성을 활용하고 싶을 때까지입니다. 이는 "내 방법이나 고속도로"라고 말해서는 안 되는 균형 잡힌 행동입니다.

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

하지만 나는 같은 크기의 프로젝트를 위해 다른 개발자들이 사용하는 메가바이트 당 50k의 JS를 사용하는 경향이 있기 때문에...

그렇다고 해도 코드 섹션 간에 격리를 유지하는 것이 좋아서 IIFE를 사용하던 것이었지만 지금은 scope를 격리하는 {}를 사용합니다.

첫 번째 섹션을 살펴봅시다. 먼저 쿠키가 "on"으로 설정되어 있는지 확인하고 필요에 따라 클래스를 적용하는 라이트/다크 모드를 살펴봅니다.

{ // 라이트/다크 모드

  let match = document.cookie.match(
    new RegExp("(^|;)\\s*darkMode=([^;]*)(;|$)", "i")
  );
  document.body.classList[
    match && (match[2] == "on") ? "add" : "remove"
  ]("dark");

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

백엔드에서는 쿠키에 따라 클래스를 설정하고, 가능하다면 match() 코드를 제거할 것입니다. (즉, 정적 .html을 사용하지 않는다면) BODY 태그에 클래스를 서버 측에서 설정하는 것은 거의 항상 정당화할 수 있는 희귀한 경우 중 하나입니다.

모든 좋은 규칙에는 예외가 있어야 합니다. 심지어 "표현하고 싶은 모습을 말하지 말라."라는 규칙도.

그런 다음 innerHTML 대신 DOM 요소를 생성하는 도우미 함수를 추가합니다.

const make = (tagName, attr = {}, ...append) => {
  let e = Object.assign(document.createElement(tagName), attr);
  if (append) e.append(...append);
  return e;
};

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

여기 고르게 축소한 것이며 전체 버전의 루틴에서 가져온 내용입니다. 그래도 이것으로 충분해요:

  document.getElementById("top").appendChild(
    make(
      "button",
      {
        className : "toggleLightDark",
        onclick : (e) => {
          document.cookie = "darkMode=" + (
            document.body.classList.toggle("dark") ? "on" : ""
          ) + ";expires=Fri, 31 Dec 9999 23:59:59 GMT;SameSite=None;Secure";
        },
        type : "button"
      },
      make("span", {}, "Toggle Light/Dark Mode")
    )
  );

} // Light / Dark Mode

DOM에서 라이트/다크 토글을 만들고 버튼의 클릭 이벤트를 연결하고 적절히 쿠키를 설정합니다.

궁금하신 분들을 위해 직접 DOM 생성을 위한 전체 라이브러리를 작성 중이고, 이를 위한 구문은 다음과 같을 것입니다:

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

document.getElementById("top").__make(
  "button_button.toggleLightDark",
  {
    onclick: (e) => document.__cookie.set("darkMode", document.body.classList.toggle("dark") ? "on" : ""),
  },
  ["span", "Toggle Light/Dark Mode"]
);

간단한 라이트/다크 모드 전환을 만드는 데 무거운 코드들을 보게되면서 정말 헛수고인 것 같아요. 어떤 사람들은 모든 문제에 대한 대답이 마크업에 더 많은 클래스를 추가하는 것인가봐요.

쿠키가 존재하지 않는 경우 호스트 OS 값을 감지하는 등 개선할 부분이 있을 수 있지만, 그것조차 15줄이 아닌 3줄 정도라니요.

라이트/다크 모드 이후에는 ESC 키를 눌러 열려있는 모달을 닫는 기능이 있어요. 저는 보통 모달에 .modal 클래스를 사용하는데, 그에 대한 후크를 설정하고 #mainMenu을 테스트합니다. 많은 경우에 이들이 쌓이는 경우 배열 대 조건문으로 전환할 것이에요.

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

{
  // Modal Helpers

  /* 기억하세요, 키를 누르는 것만으로는 이스케이프 키가 반환되지 않습니다! */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || location.hash.length < 2) return;
    const target = document.getElementById(location.hash.substr(1));
    if (target && (target.classList.contains("modal") || target.id == "mainMenu")) location.hash = "";
  });
} // Modal Helpers

기술적으로 바깥 {}를 제거해도 스코프가 누출되지는 않겠지만, 형식을 일관성있게 유지하기 위해 남겨두고 있습니다.

미리 종료 여부를 테스트하고, 대상이 .modal이거나 #mainMenu인 경우에만 실행되는 것에 주목해주세요. "닫기"라는 겉만 번지르르한 기능은 페이지 해시를 #으로 설정하여 대상이 아니게 만드는 것 이상의 것이 아닙니다.

이런 것을 구현하려고 사람들이 미친듯이 얽힌 과정에 항상 놀라곤 합니다. 이런 걸 시각적 개념을 스크린을 사용하지 않는 사용자에게 전달하려는 아리아-롤 또는 `dialog` 같은 헛소리란 말입니다. 적절한 의미 있는 마크업과 해시 기반의 페이지 내 탐색이 있다면, 모달이라는 것이 window.alert나 window.confirm과 같은 것이 아닐 때 사용자에게 "대화"인 것을 전달해야 한다는 아이디어는 100% 허튼 소리입니다. 더 이상 끌어내지 않겠습니다!

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

지금 가장 한을 끓이는 쓰레기 개발자들 — SPA, Tailwind, React/Vue/Angular, HTMX — 모두 당신에게 어떠한 도움도 주지 않습니다. 사람들은 완벽한 무지함과 현실적인 진실 대신 달콤한 거짓말에 귀를 기울여 속아당하고 있습니다. 이 쓰레기를 밀어주는 사기꾼들은 당신의 두려움과 무지에 무리를 가하고 있습니다.

실제로는 그렇지 않음에도 불구하고, 수십 개의 파일에 분산된 두 배에서 십 배가 넘는 코드가 어떻게 마법처럼 더 쉬워 보인다고 당신을 속일 것입니다. 이러한 시스템을 만드는 사람들은 HTML, CSS 또는 JavaScript를 올바르게 사용하는 데 합리적인 결정을 내릴 능력이 없습니다.

다른 사람들이 당신에게 이런 말을 하는 사람들은, 마치 마시멜로에 깐단으로 바꿔놓기처럼, 당신의 피를 짜내는 데서 팥과 건포도에서 마시멜로로 전향해버렸다고 생각해보세요.

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

그래서 그들은 마크업의 2배에서 10배까지, 그만한 만큼 더 또는 그 이상의 CSS, 수십 킬로 바이트의 작업을 수행하는 JS를 가지고 끝나게 되며, 모든 것을 더 어렵게 만들게 되는데, 왜일까요? "와아와아, 아이 비스 투 스튜피드 투 유스 더 익스턴얼 스타일쉿?"

# 한 걸음 더 나가기

언급한 대로, 이것에 대한 "파트 3 of 2"를 쓸 수도 있을 것입니다 - 불멸의 현신 시리즈에서의 다섯 권 중 여섯 번째 책과 유사하게 - 프린트 디자인에 대해 논의하고, 그들의 템플릿의 다른 페이지를 보여주어 그들의 "아무것도 없는 SPA" 접근 방식이 정말 얼마나 어리석은지를 보여주고, 아마도 연락 모달을 추가하여 JS를 좀 더 확장하여 모달 초점을 격리하는 등을 논의할 것입니다.

그것이 언제 이루어질지 또는 그럴지의 보장은 없습니다.

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

이런 "SPA for nothing"이 얼마나 월권능을 하고 있느냐면 반 정도의 대역폭과 처리 과부하만으로도 제대로 된 HTML을 적절히 작성하는 것으로 충분히 제압할 수 있다는 건 웃기기만 합니다. 다시 말하자면, SPA를 사용해야 하는 경우가 없는 건 아니지만, 모든 문제에 대한 해결책은 아니다!

# 기사 목차:

부분 1: 마크업
부분 2: CSS (여기 있음)
부분 3: 인쇄 CSS
부분 4: SPA 클라운 슈어
```
