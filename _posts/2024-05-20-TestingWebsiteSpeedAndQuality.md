---
title: "웹사이트 속도와 품질 테스트하기"
description: ""
coverImage: "/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_0.png"
date: 2024-05-20 22:55
ogImage:
  url: /assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_0.png
tag: Tech
originalTitle: "Testing Website Speed And Quality"
link: "https://medium.com/@deathshadow/testing-website-speed-and-quality-e37622bd5889"
isUpdated: true
---

![Speed and Quality](/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_0.png)

웹 사이트나 애플리케이션의 속도, 크기 및 효율성은 사용자뿐만 아니라 백엔드에서도 가장 중요한 요소 중 하나입니다. 큰, 뚱뚱하고 부풀어 올라간 코드베이스는 프레임워크 팬보이들의 반대 주장에도 불구하고 작업이 어려워지며, 초과 서버 부하를 초래합니다.

접근성 및 효율성 컨설턴트로 프리랜싱을 하면서 지난 15년 동안 수많은 웹사이트를 살펴본 적이 있습니다. 이러한 웹사이트들은 매우 낮은 트래픽을 처리하기 위해 고군분투하고 있는 것으로 나타났습니다. 콘텐츠와 기능이 $10/mo VPS보다 더 필요하지 않은 매니지드 전용 호스팅 계획으로 다중 프로세서 비용이 많이 드는 것입니다.

그러나 가장 끔찍한 것은 해당 사이트들이 "반드시 그렇게" 되어야 하는 무수한 엘리베이터들이다. "기업용 등급"이라고 주장하며 ("그게 실제로 무엇을 의미하는지. "바보들이기 때문에 쓰레기인가 봅니다"); "협업을 위해 필요한 코드를 십 배로 작성해야한다" 또는 "새로운 입사자를 빠르게 숙달" 시킬 필요가 있다고 주장하는 등 자신의 무능함을 덮기 위한 모든 헛소리와 함께. 내 이전 기사의 댓글을 다시 읽어보면 많은 귀찮은 변명들을 볼 수 있습니다.

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

살인범은 빠른 웹사이트를 만드는 것이 어렵지 않다는 것이 가장 중요한데요. 그에 대해 이전에 글을 썼었습니다:
[여기를 클릭하세요!](https://medium.com/codex/so-you-want-to-make-your-website-faster-d2a00db39097)

하지만 기존 웹사이트의 속도를 분석하는 것은 대부분의 사람들이 처리하기 어려운 기술을 요구합니다. HTML, CSS를 알고 있고 관심을 가지고 있다면 쉬울텐데요. 안타깝게도, 프레임워크를 사용하는 바보들, 백엔드 개발자들이 프런트엔드를 다룰 수 있다고 속이는 사람들, "웹 디자이너"라는 착각에 빠진 예술가들, 전체 과정에 대한 큰 문제를 일으키는 많은 다른 사람들이 거의 제로로 기술합니다.

이를 해결해보겠습니다.

# 추천 도구

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

자동화는 일반적으로 플레이스보로 사용됩니다. 머리 속에 있는 것을 활용하지 않으면 정확하지 않습니다. 모든 것이 약간의 출발점으로 사용할 수는 있지만 그것이 하는 일을 큰 그릇으로 받아들여야 한다는 것이죠.

Google Lighthouse은 대부분의 Blink 기반 Chrome과 유사한 브라우저(Chrome, Vivaldi, Opera, "최신" Edge 릴리스)의 검사 도구로 내장되어 있습니다. Lighthouse는 속도, 사용성, 접근성, 이미지 최적화, 파일 형식과 관련된 여러 문제를 지적할 수 있습니다. 아마도 우리에게 주어진 최고의 자동화 도구일 것입니다.

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

## 그러나

저는 등대가 수백 개의 개별 파일로 구성된 2MB 페이지에 100% 완벽한 속도 점수를 주는 것을 본 적이 있고, 동시에 6개 이하의 파일로 만든 50k 페이지에는 50%의 점수를 주었습니다. 물론 등대가 제시하는 내용을 사용하여 최적화하는 것을 권장하지만, 페이지가 빠른지 여부를 확인하는 데는 좋은 도구가 아니라고 생각합니다. 이 도구는 페이지가로드된 후에 "렌더(render)"와 같은 것을 과대평가하고 파일 수와 크기를 지나치게 과소평가합니다.

예를 들어, 이 FailwindUI 쓰레기 코드를 살펴보십시오:
https://spotlight.tailwindui.com/about

이는 26개 파일에서 615k이며, 압축 해제하면 218k로 감소됩니다. 따라서 파일 수만으로 최악의 경우 18초의 오버헤드가 발생합니다. 실제 세계에서는 3초 정도로 설명하겠습니다. 그런데 왜 이러는 걸까요? 1.4k의 일반 텍스트와 하나의 콘텐츠 미디어(우주 비행사 이미지)인가요? 심지어 파일 9개로 52k도 안 되는 일입니다.

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

캐시를 활용하지 않도록 작성되었고, 효율성을 덮어두려는 것보다는 "아무것도 아닌 SPA"로 스크립트를 던져 처리하려고 하며, 이는 "더 많은 코드를 던져 더 빠르게 만들 수 있다"는 어리석음의 전형입니다.

그럼에도 불구하고, 이것의 라이트하우스 점수는 무엇인가요?

![텍스트](/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_2.png)

저는 "성능"을 주면서 60점을 줄 것입니다. 그런데 왜 그렇게 후하다고 생각하나요?

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

라이트하우스는 실제 세계의 제한 없이 당신의 연결 속도와 그들의 연결 속도에 기반을 두고 있어요. 광섬유의 마법 땅에 있는 우리에게는 어떤 쓰레기도 꽤 괜찮은 점수를 얻을 수 있어요.

하지만 그 기준으로 대부분을 가리킴을 살펴보세요. 전송 시간은 심지어 나열되지 않았어요. First paint, contentful paint? 그것은 렌더링이죠. 최적화하기에 유용하지만, 확실히 페이지 속도의 전부가 아니에요.

이것은 이전 게시물을 위해 한 페이지의 리라이트를 사용하여 명백해져요: https://cutcodedown.com/for_others/medium_articles/failwindUI/shotlightFull/about.php

여기에서 라이트하우스 점수가 거의 동일합니다:

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

![TestingWebsiteSpeedAndQuality](/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_3.png)

전송 크기의 1/5이지만 파일 개수의 1/4, DOMContentReady에 도달하는 시간은 1/3로 단축되며 서브 페이지에 대한 사전 캐싱을 활용하여 SPA / CSR JavaScript의 90%가 무의미한 코드 팽창으로 소멸되는 경우가 있습니다...

그러나 통계와 마케팅을 진지하게 검토하는 사람들이 이 두 숫자를 매우 심각하게 받아 듭니다. 사용자가 사이트를 3초 안에 포기할 수 있다는 사실을 알기 때문입니다! 4초 이상이면 25% 이상의 탈퇴 위험이 있으며, 그 이후로매초마다 16%가 증가합니다.

탈퇴란 사용자가 "이건 말아먹겠다. 다른 데 가야지!" 하는 것을 비하한 용어입니다.

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

그 접속 속도가 관련이 있는 것 뿐만 아니라 속도 점수는 도구가 만들어진 시간에 다른 웹 사이트와 상대적으로 기반을 두고 있습니다. 따라서 웹이 만들어진 시점에 좋지 않았다면, 어떤 시점을 넘어서면 더 나은 것이 있다고 말할 "여력"이 없습니다.

또한 이러한 높은 평가를 개발자로서 우리 스스로에게 돌릴 수도 있습니다. 두 예제 모두 저 트래픽 환경에서 운영되며 괜찮은 호스팅 환경에서 작동합니다. 이 데모 템플릿들이 다뤄야 할 연결 제한, 서버 부하 또는 다른 여러가지 실제 웹 사이트에서 다뤄야 하는 것들과 부딪히지 않습니다.

그래서 라이트하우스에 대해서는 "수리해야 할 것을 수리하라"고 말합니다. 그것은 그런 일에 대한 놀라운 도구입니다. 그 수리를 하면 페이지가 더 빨라지고 더 접근 가능해질 것입니다. 그저 "100 성능" 평가를 신뢰하지 마세요. 이것은 실제 사이트 속도의 좋은 지표가 아닙니다.

## 파이어폭스

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

![Testing Website Speed and Quality](/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_4.png)

브라우저는 속도 평가에 중요한 부분입니다. 자동화를 믿지 말고 실제 브라우저에서 실제 환경에서 테스트하는 것이 더 현명합니다.

각 브라우저 엔진은 파티에 자신만의 특별한 도구를 가져옵니다. 파이어폭스의 검은 네트워크 탭은 실제 파일 크기를 보여줍니다. 압축된 크기뿐만 아니라 실제 크기를 보여주죠. 크롬 같은 세부사항은 보여주지 않습니다!

파이어폭스에서 페이지를 로드하고 문서 인스펙터를 열려면 마우스 오른쪽 버튼을 클릭하고 "검사"를 선택하거나 F12를 누르세요 — 그 안에 탭이 나타납니다. 위의 FailwindUI 템플릿을 사용하여 "네트워크" 탭으로 이동하고 캐시를 지우고 페이지를 다시 로드하세요: CTRL-F5

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

![이미지](/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_5.png)

우리는 모든 파일에 대한 "폭포수"를 얻습니다. 기본 정렬 순서는 파일이 로드된 순서이며, 오른쪽의 그래프에서는 지연, 핸드셰이킹, 전송 시간을 보여줍니다. 두 가지 파일 크기를 얻을 수 있습니다: 실제 파일 크기 및 전송될 때의 크기. 후자의 숫자는 일반적으로 파일이 gzip 압축으로 전송된 경우 더 작을 것입니다.

푸터에 있는 정보도 중요합니다. DOMContentLoaded는 브라우저가 페이지 렌더링을 시작하기에 충분한 정보를 갖고 있다고 판단하는 시간이며, "로드"는 기본적으로 렌더링이 완료된 시점입니다. 자주 JavaScript의 로드 후 파일이 있을 수 있으며, 이는 Reflow를 강제할 수도 있습니다(결과적으로 불편한 동작이 발생할 수 있음) 또는 사용자가 아직 수행하지 않은 조치를 위해 로드될 수 있습니다.

또한 파비콘은 항상 페이지가 "완료"된 후에 로드됨을 기억해 주세요.

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

사람들이 종종 내게 물어보는 질문 중 하나는 내가 얼마나 많은 파일이 로드되었는지 또는 총 크기가 얼마인지를 어떻게 알 수 있는지이다. 여기 있습니다.

## Chrome처럼

![이미지](/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_6.png)

속도 테스트에 대한 가장 큰 실수 중 하나는 자기 연결이 "일반 사람들이 얻는 것"을 대표한다고 믿는 것입니다. "하지만 내게는 빠르다"란 오류로 이어집니다. 여러분은 항상 내가 말하는대로 알고 있어요:

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

당신과 당신의 마법 같은 판타지 세계의 네트워크 연결이나 완벽한 5G 수신만이 중요한 건 아니에요, 다른 사람들도 중요한 거예요.

특히 바보 같은 사람들이 그런 사용자들을 "가난뱅이"라고 불러서 더욱 짜증스러울 수 있어요. 실제로 그냥 '계급 전쟁'으로 빠지는 거죠.

따라서 연결을 인위적으로 제한하면, 허위 인식을 없앨 수 있어요. 안타깝게도 Firefox의 네트워크 탭은 연결 제한이 활성화되면 종종 페이지의 하위 파일을 다시로드하지 않을 수 있어요. 그러면 제한하는 의미가 없어지죠. 그래서 Chrome과 비발디(Vivaldi)와 같은 브라우저의 동등한 기능을 사용해야만 해요. 그렇게 하면 됩니다. 저의 일상용 운전사람이에요.

파일 크기를 실제로 보여주지 않지만, 테스트 단계에서 우리는 실제로 전송되는 것에 더 관심이 있어요.

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

두 번째 툴바 아래에 "스로틀링 없음"이라고 쓰인 드롭다운이 있어요. 그 드롭다운의 기본 값은... 좀 부족해요.

그래서 보통 이런 설정을 추가해서 "실제 세계"를 시뮬레이션해요:

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

<img src="/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_9.png" />

다운로드 속도 2 Mbits, 업로드 속도 512kbits, 지연 시간 200ms입니다. 패킷 손실은 걱정하지 마세요. 이것은 우리의 요구를 충분히 제한할 것입니다.

이 속도 제한으로 동일한 네트워크 폭포도를 가져올까요?

<img src="/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_10.png" />

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

그렇게 끔찍하게 보이지는 않을 수도 있어요 — 25개 요청이 있는 병렬처리는 여전히 많은 나쁜 선택지들을 집어삼키고 있답니다. 하지만 그래서 연결 제한을 조절할 수 없는 자동화에 대해 우리 스스로 속임수를 부리고 있는 것 아닐까 싶어요. 그래도 제가 쓴 것과 비교해보세요:

![image](/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_11.png)

어쨌든, 저는 한 가지 방안을 제안해요 — Blink(크롬과 비슷한 엔진)과 Gecko(파이어폭스, 아이스위젤 등) 모두를 사용해보세요. 호환성 뿐만 아니라 속도와 도구 사이의 차이점을 테스트하기 위해서죠. 네트워킹 워터폴은 여러분의 친구입니다. 여러분의 로드 순서에서 병목 현상이 발생하는 곳을 정확히 파악하는 데 도움이 될 거예요.

# 페이지스피드 인사이트: 비추천!

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

"구글 '페이지속도'는 한때 — 10년이 넘게 전— 유용한 도구였습니다. 그러나 그 이후로 그 저의는 희석되었고, 오도된, 오해되고, 오늘날에는 사실보다는 플래이스보로 여겨지고 있습니다. 어느 순간에는 마케팅 사기 같은 느낌까지 들었죠!

그 하락 추세는 실질적인 해를 가져오는 요소에 중점을 두기 시작했을 때 시작되었습니다. 이에 대한 한 예로 '페이지의 폴드 위' CSS를 마크업에 넣는 어리석은 방법이 있습니다. 이것은 '캐시를 비우는 첫 번째 로딩'을 가속화할 수 있지만, Bootcrap이나 Failwind 같은 멍청한 쓸모없는 쓰레기의 비용을 지불하게 됩니다. 예를 들어, 지연된 HTTP 병렬성, 하위 페이지 전체에 걸쳐 공유하는 스타일에 대한 사전 캐싱 기회의 놓침, 재방문 시 캐싱 놓침 등이 있습니다. 'text-center col-4-s col-6-m text-400-red'와 같은 클래스가 무식한 헛소리라는 것과 마찬가지로 정적 마크업에 'style' 태그의 순수 존재도 무식한 헛소리라고 말할 수 있습니다. 주목할 점은 그게 마크업 안에 있다는 것이며, 페이지 로드 후 스크립팅 전용 스타일로 추가되는 것에는 문제가 없습니다.

그리고, 문서 검사기는 소스/마크업을 표시하지 않습니다. 그것은 DOM을 보여줍니다!

PageSpeed에 나쁜 조언이 스며들기 시작할 때 그것들이 끌어 당겼던 상황이 확실해졌습니다. 우리에게 유용한 도구를 제공하여 우리를 중독시킨 후, "페이지속도 서비스"라는 우리를 속이려는 쓰레기 'CDN 대체'를 이용하도록 조장하는 마케팅 플랫폼으로 사용했습니다."

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

"서비스" 라는 말은 고객을 정말로 섬기고 있습니다. "속도"를 불필요하게 느린 것을 고쳐 사용할 수 없는 클라이언트 측 스크립팅의 꼬마 조각들로 만드는 동시에 그렇지 않으면 건강한 사이트를 운영하는 데 더 비싼 방향으로 만들고 있어요!

사기, 사기, 사기 같은 말을 자주 쓰는 건 알아요... 하지만 정말… 제발요.

Google PageSpeed가 말하는 거 하나 믿지 말라고 권하고 싶네요. 라이트하우스가 비슷한 운명을 맞이하지 않기를 바랄 뿐이에요.

# 진정 중요한 것은 무엇인가

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

도구가 무엇인가를 알려준다고 해서 항상 그 의미를 완전히 이해한다는 것은 아니에요. 마찬가지로, 자동화된 도구는 주로 시작하는 지점이며 여전히 올바르게 사용하기 위해 약간 자신의 뇌를 사용해야 합니다. 라이트하우스의 숫자를 보고 "괜찮아"라고 생각하기가 너무 쉽습니다. 심지어 그렇지 않을 때도요.

실제로 걱정해야 할 세 가지 주요 요소가 있어요. 도구들은 당신이 가진 것을 말해줄 뿐, 꼭 필요한 것이나 여전히 문제가 있는지를 반드시 알려주진 않아요.

## #1 대역폭과 파일 크기

이것은 가장 쉽게 평가하고 문제 해결할 수 있는 부분이에요. 또한, 무능한 사기꾼들이 때때로 "모두가 이제 브로드밴드를 갖고 있다"고 사측적으로 무시하거나 피할 다른 쓸데없는 변명을 찾기 때문에 그들이 가장 쉽게 무시하는 부분 중 하나에요.

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

이러한 "무시"의 실제 예시로 최근 다른 프로그래머가 내가 개선할 때 "최적" AVIF 대신 PNG 사용했어야 했다며 화를 내서 몹시 화를 내는 상황이 있었습니다. 20k를 절약할 수 있었다고 했죠. 그는 내가 "허튼 소리만 한다"는 예시로 사용했습니다. 전 그냥 2.5 메가바이트의 "아무 의미없는" JS를 12k의 코드로 교체했다는 사실을 완전히 무시했습니다. 더구나 해당 클라이언트는 의료 시설로, IE7이 최첨단이었던 Win ME 기반의 얇은 클라이언트를 사용하고 있습니다. IE에서 AVIF나 webp는 지원되지 않습니다.

많은 개발자들은 반복적으로 자신의 HTML, CSS 및 JavaScript 크기를 무시하면서 대역폭을 절약하기 위해 가능한 모든 자동화를 시도합니다. 그래서 무능한 jQuery, Tailwind, Bootstrap과 같은 것들이 위험한 이유입니다. 제가 계속 강조해 온 것처럼:

사실 미디어 파일 - 오디오, 비디오, 이미지 - 가 코드보다 세 배 이상이나 작아지는 것이 흔해졌습니다. 그 중 대부분의 책임은 JavaScript의 몫입니다. 또한 며칠전에도 말한 바 있듯이, jQuery로 수행된 것 중 세 가지 범주에 속하지 않는 것은 본 적이 없습니다:

- JavaScript 없이 할 수 있는 HTML 및 CSS 작업
- jQuery 없이 더 간단하고 코드가 적은 작업
- 웹사이트나 어플리케이션에서 하면 안 되는 작업들

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

이제는 JavaScript를 사용하여 80% 이상을 수행하는 작업에 대해서도 확장해야 한다고 생각합니다. Typescript와 같은 Transpiler는 출력 코드의 크기가 얼마나 크든 상관하지 않고, 더 복잡하고 유지보수하기 어려운 코드를 작성하도록 장려합니다; React나 Angular와 같은 쓸데없는 프런트엔드 프레임 워크가 서버의 "잘못된 쪽"에서 작업을 수행함; 모달 대화 상자나 햄버거 메뉴와 같은 스크립팅 요소를 사용하여 `esc` 키를 눌러 닫히도록 하는 일이 정말 필요한 일인데도 불구하고 1k가 딱 헤더에 들어가도록 presentational한 디자인이 해결되어 있는 것처럼 표시하지 않습니다.

Bootcrap나 Failwind와 같은 프런트엔드 프레임워크 쓰레기통과 같은 무능한 재앙도 마찬가지 입니다. 이러한 것들을 사용하도록 속이거나, 사용하지 않았을 때보다 훨씬 더 많은 코드를 작성할 수 있게끔 꾀어냅니다; HTTP 병렬 처리를 지연시키며, 캐싱 기회를 놓치게 하며, 작업을 수행하는 데 필요한 코드 양의 2배에서 10배까지 배포합니다.

그리고 사람들이 "Simple Jack"이 멋진 여자 앞에서 마주하는 것 처럼 자신들의 사이트나 앱이 느리다고 궁금해 할 때도 있습니다.

<img src="/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_12.png" />

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

이 모든 것에 대해 생각하는 것은 자동화된 도구가 사람들을 잘못된 안전감에 빠트리고 있다는 점이라고 생각해요. 이미지 최적화, 파일 축소? 모두 좋고 필요한 작업이죠. 하지만 거기서 멈추어선 안 돼요!

코드 부풀림; 의존성 지옥; 아무 의미 없는 파일들을 위해 개별 파일; 아무 의미 없는 파일을 위한 통합 파일 (모든 것을 마크업에 넣는 것 같은 행위); 아무 의미 없는 추가 함수들. 지금 대부분의 쓰레기를 만드는 사람들의 능력에 대해 의문을 제기하게 되는 부분들이 점점 더 성능, 지속 가능성, 유지 관리성과 관련하여 더욱 걱정되는 부분이죠.

의미 있는 그림이 나타나기 전에 HTML의 크기와 스크립팅이 얼마나 큰지는 아마도 가장 중요한 파일들 중 하나이자 무시되는 부분일 수도 있어요. 왜냐하면 HTTP 병렬성을 연기하고 캐싱 기회를 놓치고 있기 때문이거든요.

FF와 Chrome과 같은 워터폴을 보세요. 문서가 완료될 때까지 다른 것들이 로딩 될 수 없다는 것을 보세요. 저의 계산기 데모에서 가져온 것들 처럼요.

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

하위 파일이 HTML 작성이 완료될 때까지 다운로드를 시작할 수 없습니다. 그리고 HTTP 2.0 푸시 또는 HTML 5 사전로드 / 모듈 사전로드도 이를 해결하지 못합니다! 다른 사람들이 말하는 대로라고 주장할 수 있을지라도.

그래서 HTML 파일에 불필요한 것들을 넣을수록( "text-large text-center text-400-red"와 같이) 다른 모든 파일의 다운로드를 지연시키며, HTTP가 여러 파일을 동시에 전송할 수 있는 능력을 최대한 활용할 수 없게 됩니다. (여러 패킷이 A지점에서 B지점 사이의 다른 경로를 통해 이동할 수 있기 때문입니다)

같은 스타일을 여러 페이지에 걸쳐 공유할 경우 캐싱 기회를 놓치게 됩니다. 각 방문뿐만 아니라 같은 방문 내에서 페이지 간에도 캐싱이 가능한 외부 파일로 모든 것을 이동시킬 수 있는데, 이러한 부분이 CSS가 존재하는 이유입니다. 스타일을 정적으로 설정하는 것이 아니라 마크업에서 "style"을 지정해야하며 외관을 고르게 만들기 위해 "style = ""을 사용해야 합니다. 그리고 "이 것은 작은 화면에 4열, 큰 화면에는 6열로 중앙 정렬된 텍스트와 빨간색으로 표시되는 것"을 나타내는 클래스가 무지하고 무능력한 반대표! 프레임워크뿐만 아니라 전체 "컴포넌트"의 어리석은 사고도 물어뜯어야 합니다. HTML 3.2 이해의 최전선이 미래가 되어서는 안됩니다.

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

아니요, "원자적"이나 "유틸리티" 클래스가 얼마나 무지하고 불행하며 쓸모 없는 쓰레기인지 정말로 표현할 수 있는 공손한 말은 없습니다.

HTML의 미리 정의된 태그들이 의미를 갖기 때문에, 관심사의 분리를 실천하면 실제로 콘텐츠와 목적에 따라 HTML의 크기를 추정할 수 있습니다... 적어도 대부분의 전통적인 웹 페이지에 대해 해당합니다. 저는 다음 공식을 사용합니다 (모든 값은 바이트 단위)

2048 +
일반 텍스트 _ 1.5 +
앵커 (또는 A의 작업을 하는 버튼) _ 192 +
폼 요소 (input, select, textarea, option) _ 128 +
미디어 (img, video, audio) _ 256

2k는 `!DOCTYPE`에서 `/head`까지의 모든 것이 포함되어야 하는 상한선이며, 콘텐츠 당 50% 비용은 완전히 합리적입니다. 192는 URL이나 INPUT/TEXTAREA/SELECT/OPTION 크기에 대한 관대한 추정치이며, 미디어 요소에 대한 256바이트 역시 그러한 것입니다.

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

보통 견적을 50% 이상 초과하면 페이지에 문제가 있습니다. 그러면 이를 두 배 이상 초과하면, 웹 기술과 전혀 관련이 없는 사람들이 만든 무식하고 무능한 쓰레기입니다.

웃기게도, 웹 앱이라면? 4k. 플랫. 그 이유는 마크업에 있는 건 헤더 안의 내용(스타일시트 로드, 프리로드, 제목), 'script' 로드, 그리고 'noscript' 경고뿐이어야 하기 때문입니다. 당신의 "마크업"이 스크립팅이 있는 상태에서만 기능한다면, 그것을 블러디 HTML이 아닌 스크립트에 구축하세요!

"일반 텍스트"를 가져오는 방법이 궁금하다면, 그냥 HTML 없는 페이지 텍스트를 의미합니다. 바로 'body' 내의 모든 CDATA (문자 데이터)입니다. 기존 페이지에서 그것을 추출하는 가장 쉬운 방법은 브라우저에서 열고, CTRL-A를 눌러 전체 선택한 후, CTRL-C로 복사하고, 그것을 평문 편집기에 CTRL-V하여 얼마나 많은 텍스트가 있는지 확인하는 것입니다.

퇴보한 부트스트랩의 가격표 페이지를 예로 들어 보겠습니다:
https://getbootstrap.com/docs/5.3/examples/pricing/

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

평문 888바이트, 앵커(또는 버튼) 20개 및 미디어 요소 하나를 포함하고 있어야 할 텐데, 그렇게 되면 5,428바이트가 되겠네요. 그들은 어느 정도의 HTML을 사용했을까요? 17.3k! 사람들은 내가 그들의 무능한 쓰레기를 계속해서 비난하는 이유에 대해 궁금해할 것입니다.

몇 년 전에 쓴 것을 고려해보세요:
https://cutcodedown.com/for_others/medium_articles/bootStrapRewrites/pricing/pricing.template.html

이는 HTML을 올바르게 사용하며, 마크업에 형식화 클래스를 주입하지 않습니다. 그 결과 5,528바이트에 불과합니다. 나의 공식이 제공한 "대략값"과 거의 일치하죠.

CSS도 상당히 예측 가능합니다. 사이트의 단일 페이지에 대해 약 20k 정도가 대체로 정상이지만, 전체 사이트에 대해서는 공유되어야 하는 스타일 양 때문에 미디어 대상에 대한 상한선은 48k입니다. 많은 웹 사이트에서 필요로 하는 것은 48k으로 media="screen"용 하나 또는 두 개의 파일이고, 대체로 인쇄의 역할은 쓸모없는 것들을 제거하고 단색으로 가기 때문에 media="print"용 32k의 CSS로도 충분합니다. 전체 사이트에 대해서 말이죠!

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

스크린과 인쇄용으로 총 80k가 넘는 CSS 파일이 세 개나 네 개 필요 없어. 그거야!

...그리고 왜 저 부끄럽고 무식한 것들이 있는 부트크랩 페이지는 엉성하고 느리고 작업하기 힘든 말도 안 되는 것으로 만들어졌는지, 웹 기술을 사용하는 방법을 아는 게 아닌 사람들에 의해 만들어졌다! (Failwind도 마찬가지야!). 어떻게 말해야 할까?

![이미지](/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_13.png)

그렇게 말이야. 부트크랩은 압축 시 최소한 전체 사이트의 2/3는 되는데, 왜냐하면 계속해서 마크업에 당신을 허술하게 만들기 때문이야? 압축하지 않았을 때, 그들의 라이브러리가 아닌 CSS는 14k이며, 그것들을 합쳐도 전체 페이지는 HTML+CSS로 32k이야... 즉, 현재 단일 페이지이며, 그들의 독특한 코드 — 부트스트랩을 제외한 것 —은 10.3k인 내 리라이트와는 달리 세 배가 돼. 그들의 단독 HTML만 해도, 나와 비교하면 HTML과 CSS 합쳐도 70%가 더 커!

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

그렇게하면 체중이 늘어나고, 느려지며 유지보수하기 어려운 웹사이트가 되어버릴 거예요. 사용성과 접근성을 무시하는 결과는 더할 나위 없는 형편입니다.

계속해서 언급했듯이:

그리고 그 증거는 숫자 속에 있어요. 숫자에 대해 이야기해보겠습니다...

## #2 파일 개수

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

페이지에 있는 별도 파일 수는 로드 시간에 막대한 영향을 줄 수 있습니다. 경우에 따라 전체 파일 크기보다 더 많은 영향을 미칠 수도 있죠!

FTP를 사용해 본 적이 있다면 100개의 별도 1k 파일을 전송하는 데 단일 100k 파일을 전송하는 것보다 훨씬 오래 걸린다는 것을 알아챌 수 있을 겁니다. 이는 서버와 시스템이 파일이 있는지, 작성해야 하는지, 이미 캐시되어 있는지 등을 계속 확인하며 소통하는 "핸드셰이킹" 오버헤드에서 비롯됩니다. HTTP도 동일한 문제를 겪지만, 병렬 처리(동시에 여러 전송)를 활용하여 패널티를 줄이고, HTTP 2 푸시 및 HTML 5 사전로드와 같은 새로운 기술을 사용하여 문제를 더욱 완화할 수 있습니다.

하지만 이 문제가 마술처럼 사라진다는 것은 아닙니다.

이제 일부 사람들은 "모든 것을 한 파일에 모아놓으면 왜 안 되지?"라고 과도하게 반응하기도 합니다. 사실 많은 사람들이 이 방식을 취하고 있지만, 해당 방법은 많은 문제를 야기할 수 있습니다.

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

- 하나의 파일에 모든 것이 들어 있고 하위 페이지가 동일한 데이터를 공유하는 경우 - 표현 이미지, 아이콘, 메뉴, 헤더, 푸터, 일반 스타일링 - 서브 페이지에 대해 캐싱/미리로드를 하지 않습니다. 각 페이지 로드마다 이를 로드해야 하기 때문에 서브 페이지의 속도를 희생하는 것입니다. 캐시가 비어 있는 첫 번째 로드를 위해 속도를 포기합니다.
- HTTP의 파일 병렬로 로드하는 능력을 활용하고 있지 않습니다. 이는 단일 연결이 가질 수 있는 "속도 제한"을 피할 수 있습니다.
- 이는 서버가 동적 페이지를 구성하는 데 더 많은 노력을 들게 만듭니다.

다른 말로 하면 Bootstrap, Tailwind, HTMX 및 수십 개의 기타 "나도 인터넷 할 수 있어요" 개발과 같은 어리석은 문제입니다.

파일의 수를 줄이려고 하지 않는 이유는 없습니다. 다른 것처럼 지나칠 수도 있습니다. 캐싱 등을 위해 별도의 파일이 필요하지만 핸드셰이크 오버헤드 때문에 페이지 로드 속도가 느려지는 개별 파일이 너무 많아서도 안됩니다.

푸시 또는 프리로드를 사용하지 않는 경우, 좋은 규칙은 첫 번째 여덟 개의 파일이 "무료"라는 것입니다. 그 이후의 각 파일은 실제로 200ms의 현실적인 벌칙을 받습니다. 최악의 경우 일부 사람들은 1초정도까지 느낄 수도 있습니다. 따라서 48개의 별도 파일로 이루어진 전통적인 "올드 스쿨" 페이지는 8부터 40초의 핸드셰이킹 오버헤드를 볼 수 있습니다. 이는 80% 이상의 이탈 영역입니다.

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

알겠어요, 20ms 정도로 더 적은 숫자가 나올 수도 있어서 즉시 통신 중단은 아니지만, 그건 서버나 주요 백본에 가깝다는 뜻이에요. "당신의 일이 아니니까"라고 다시 말하자면, 여러분 모두에게 영향을 미치는 거잖아요.

푸시/사전로드를 사용하면 초기 HTML 파일과 동일한 연결에서 핸드셰이킹이 처리돼요. 이렇게 하면 이러한 파일에 대한 핸드셰이킹 오버헤드가 없어져요... 어느 정도, 말이에요.

이 더 최신 기술을 사용할 때는 주의를 기울여야 해요. 조금은 수익이 줄어들 수도 있답니다. 브라우저 구현 문제인지, 시간이 많이 걸리는 것인지 잘 모르겠지만, 파일이 8개를 넘어가면 효과가 크게 떨어진다고 해요. 그래서 푸시/사전로드를 사용할 때는 다음과 같이 제한하는 것을 제안해요:

- media="screen" CSS(하나 또는 두 개의 파일이어야 함)
- 외부 JavaScript(세 개 또는 네 개의 파일로 제한)
- 웹폰트
- "대규모" 배경 이미지와 같은 중요한 정적 요소들

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

그 목록에서 4번 항목은 정말 필요없는 항목이에요. 하지만 난 ‘디자이너’를 자칭하는 예술적인 사람들이 그런 종류의 사물을 좋아하는 걸 알아요. 기본적인 디자인 지식이 없더라도요. 그리고 rel="modulepreload"도 있어요. 이건 새로운 "JavaScript 모듈"과 함께 사용되지만, 로딩에 제한이 없어 보여요. 서버가 허용하는 한 전송/연결을 많이 사용할 수 있는 이유를 알아내기 위해 더 많이 실험을 해봐야 할 것 같아요.

하지만 서버나 브라우저가 처리할 수 있는 연결에는 한계가 있다는 걸 기억해야 해요. 서버에 트래픽이 많을수록 사용자에게 유지할 수 있는 연결이 점점 줄어들게 돼요. Google, Xitter, 또는 Facebook과 같은 큰 기업들에겐 큰 문제가 아니겠지만, 대부분의 일반적인 사이트 소유자나 기업들에게는 쉽지 않은 문제일 수 있어요.

예를 들어, 한가한 시간대에 근처 캠퍼스의 혼잡한 무료 인터넷에 연결된 상황을 상상해보세요. 혹은 집에서 pooky가 지하실에서 게임과 영화를 얻어다 주는 동안, 부인이 Mando를 보면서 다섯 개의 소셜미디어 사이트를 동시에 스크롤하고 있는 경우… 집의 인터넷 연결 한도는 얼마나 남을까요?

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

Google은 하드웨어를 그냥 투입하는 것만으로 해결할 수 있는 문제도 있지만, 그들은 네트워킹, 프로토콜 및 명세 변경을 추진하여... 최소한으로 줄일 수 있도록 노력하고 있습니다. 오늘날 우리가 HTTP 2.0 푸시라고 부르는 것은 Google SPDY라는 이름으로 출발했습니다. 크롬을 위해 만들지 않고 오픈 소스로 공개하고 HTTP 명세로 적용시킨 덕분에 Google이 절약한 돈은 상당히 많을 것입니다.

우리 모두가 이로 인해 혜택을 받는다구요? 저는 이에 불만을 품지 않겠습니다.

모든 이런 개선 사항에도 불구하고, 일반적인 사이트에 HTML+CSS+JS 파일이 8개 이상, 또는 실제로 애플리케이션이 될만한 "웹 애플리케이션"에는 24개의 파일이 넘어간다면, 여러분의 코드는 아마 성능이 좋지 않을 겁니다. 특히 자바스크립트 부분에서 이 코드 한 줄마다 추가 함수를 만들고, 각 함수를 위한 파일을 만드는 것이 "좋은 행위"가 된 것에 대해 충격을 받고 있습니다. 정말 부정직한 일이죠!

하지만 전체 파일 수를 효율적으로 관리하는데 도움을 줄 수 있는 기술도 더 많이 있습니다. 가장 고전적인 기법 중 하나인 "CSS 스프라이트"는 모든 디자인 이미지/아이콘을 한 이미지에 넣고, 배경으로 적용하고, 배경 위치를 조정하여 원하는 부분만 나타내는 것을 포함합니다.

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

대부분의 경우 SVG 및 웹폰트로 대체되었습니다. 이러한 방법을 사용하면 핸드셰이크 수를 줄일 뿐만 아니라 해상도 감소 없이 어떤 크기에도 완벽하게 확장이 가능합니다.

단색 아이콘이 있다면 "Font-awesome"와 같은 폰트에 넣는 것은 여러 아이콘을 한 고작한 파일로 효율적으로 사용할 수 있는 좋은 방법입니다. 다양한 색상 지원이 준비 중이지만 아직은 다소 불안정합니다. 그러나 마크업을 건드리지 않고 색상을 변경하고 싶다면 SVG보다 우수합니다.

일반적으로 아이콘에 대해 SVG를 사용하는 것에는 여러 문제가 있습니다. 가장 큰 문제 중 하나는 대부분의 사람들이 HTML에 그것들을 잘못 넣어 반복해서 사용하며 공유된 페이지 간에 캐시되지 않고 HTTP 병렬성을 지연시킨다는 것입니다. 이 문제의 해결책은 CSS로 이동하여 배경 이미지로 사용하는 것입니다. XML 텍스트이기 때문에 CSS로 쉽게 인코딩할 수 있습니다.

그러나 CSS에 넣었음에도 불구하고 CSS에서 색상을 제어할 수 없고, 반복해서 사용해야 합니다. (필터를 사용하면 몇 가지 귀여운 트릭을 사용할 수 있습니다.)

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

여전히 SVG 및 웹 폰트는 수백 개의 파일을 하나로 교체하는 능력을 발휘하고 있습니다. 이를테면 캐싱과 병렬성을 희생하지 않고요.

요점은 무엇일까요? 파일 수를 적게 유지하되, 할 일이 도리보다 더 나쁘게 되지 않도록 지나치게 너무 열중하지 마세요.

솔직히 말해서, 이 조언은 대부분 웹 관련 모든 것에 적용됩니다. 사람들은 한 가지 방법을 배우고는 모든 것에 적용하려고 하거나, 어떤 "속도 향상" 기술에 대해 듣고 나서는 아무도 그것을 이해하고 싶어하지않아 너무 지나치게 적용하곤 하죠. 그냥 건드리지 않았더라면 하는 것보다 더 많은 피해를 줄 때도 있죠!

## #3 렌더링 시간

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

간단히 말해서, 브라우저가 서버에서 검색한 코드를 사용 가능한 페이지로 변환하는 데 소요되는 시간은 충분한 파일이 있는 이후입니다.

이것은 많은 사람들이 나쁜 습관을 정당화하기 위해 사용하는 비열한 수식어로 많이 사용됩니다. 개발자들이 실제로 코드 크기를 두 배나 네 배로 늘려 브라우저가 "페이지를 렌더링하는 데 소요되는 시간"을 몇 밀리초 짜내려고 할 때 이 중 가장 나쁜 경우입니다. 그들이 코드 부풀리기로 전체 로드 시간을 더 느리게 만든다는 것에 대해 깨닫지 못합니다.

이것은 "레이아웃에 테이블을 사용하지 마십시오"를 "테이블을 절대 사용하지 말아라!!!" 라고 하며 변형한 어리석은 구호로 발전한 바보들이 돌아다닌 엽기적인 지들을 향한 가증스럽게 병적인 변명이 되어왔습니다. 그들은 "테이블은 렌더링하는 데 너무 느리다"라고 말한 것은 그들의 무지를 정당화하는 겨우란 어림짐작의 변명으로 사용했습니다.

옛날에 웃기며 말한 것처럼:

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

지금, "렌더 시간"이 하찮다는 걸 의미하나요? 전혀 아니에요. 그냥 많은 사람들이 그것에 대해 어리석은 부분에 집착한다는 거죠 (라이트하우스가 레이어드 선형 그라디언트에 열광하면서 거대한 이미지 위의 텍스트에는 신경쓰지 않는 것을 보세요), 이것은 방정식에서 아주, 아주 작은 부분일 뿐입니다.

더 나쁜 것은 CSS와 같은 것을 탓하는 사람들이 있지만, 그들은 두 자리 이상의 킬로바이트 업무를 하는 메가바이트의 JavaScript를 가지고 있습니다.

더 많은 코드가 있을수록, 렌더가 시작되기 전에 걸리는 시간이 더 오래 걸립니다. 더 많은 마크업, CSS 규칙 및 스크립팅을 사용할수록 렌더 시간이 더 오래 걸립니다. 그래서 Failwind나 Bootcrap과 같은 어리석음은 비성능적인 쓰레기인 것이죠. 이들은 자신들과는 반대되는 근거 없는 주장을 하지만요.

그리고 확실히 선형 그라디언트, 박스 그림자, 텍스트 그림자 등은 처리 성능과 렌더 시간이 많이 소요되는 것이 사실입니다. 그러나 정적 이미지를 사용하는 것과 비교했을 때, 오래된 하드웨어를 제외하고 모든 것에 대한 소요 시간/오버헤드가 분원인 것을 보면요.

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

… 그리고 우리는 영원히 "와 응 응 아이 던즈 워나 스탑 유징 윈블로우즈 XP 앤 머 겟 빈티엄 4" 사람들을 위해 유연하게 휘어져서 서 있을 수 없어요.

## 내 Tandy 1000SX가 윈도우 XP를 실행할 것을 기대하는 것만큼 터무니없어요.

![이미지](/assets/img/2024-05-20-TestingWebsiteSpeedAndQuality_14.png)

완전히 헛소리는 아니지만, 나는 Lighthouse가 당신에게 말하는 대로 해 보라고 말할 거예요... 그래도 명백히 헛소리인 것으로 약간의 성능 점수를 받아도? 어쨌든 그래도 될 거예요. 대부분 "렌더링"에서 지연을 초래하는 실제 근본적인 원인들은 다 다루기 쉽기 때문에요:

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

- DOM 요소가 너무 많이 있어요. 즉, 마크업을 적게 사용해주세요.
- CSS 규칙이 너무 많아요. 적은 CSS를 사용하고 모든 것에 클래스를 부착하지 마세요.
- JavaScript가 너무 많이 사용되었어요. JavaScript 없이 할 수 있는 경우에는 반드시 그렇게 하세요!
- 파일이 너무 많아요. 렌더링은 "window.onload"이 발생하기 전까지 시작할 수 없음을 기억해주세요.

다시 말해서, 제가 거의 모든 기사, 포럼 게시물, 소셜 미디어 등에서 수십 년 동안 계속 말해 온 것들이에요. 그리고 Resig, Otto, Thornton, Wathan과 같은 사기꾼들이 치켜 들고 있는 것들이에요.

# 요약

웹사이트의 90% 이상이 속도에 있어 코드 크기, 코드 복잡성, 개별 파일 수 및 전체 파일 크기 등과 관련이 있어요. 이 중에서 파일 크기는 실제로 지난 10년 동안 가장 큰 문제가 될 수도 있어요.

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

파일 수를 살펴보세요. HTML 파일의 크기와 전달하려는 실제 내용을 비교해 보세요. 전체 코드 양과 작업과 비교해서 얼마나 많은 코드가 있는지 살펴보세요. 대부분의 "속도 문제"는 여기서 기인합니다. 계속 말하고 있는 것처럼, 블라인드로 코드를 복사하거나 붙여넣기하여 "프레임워크 덤비"하거나 HTML, CSS, JavaScript를 제대로 사용하는 가장 기본적인 개념에 대한 무지의 결과입니다.

텍스트 4k와 이미지 1다스를 전달하기 위해 4십 때의 파일에 메가바이트의 코드가 있다면, "여기가 문제의 근원입니다." 또한, 기사 작성에 있던 공백에 대해 사과드립니다. 이 기사는 90% 정도 완성된 채로 두 달 동안 오픈 탭에 열려 있었고, 이와 유사한 여러 기사들도 마찬가지였습니다. 지금은 내 일정이 매우 바쁘고 봄/여름이 시작되어 상황이 더욱 악화되고 있습니다.
