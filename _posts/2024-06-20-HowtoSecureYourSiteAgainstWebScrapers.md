---
title: "웹 스크레이퍼로부터 사이트를 안전하게 보호하는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoSecureYourSiteAgainstWebScrapers_0.png"
date: 2024-06-20 07:15
ogImage:
  url: /assets/img/2024-06-20-HowtoSecureYourSiteAgainstWebScrapers_0.png
tag: Tech
originalTitle: "How to Secure Your Site Against Web Scrapers"
link: "https://medium.com/bitsrc/how-to-secure-your-site-against-web-scrapers-the-best-browser-fingerprinting-techniques-9b0a996efb91"
isUpdated: true
---

## 가장 좋은 브라우저 지문 기술입니다. 당신만의 지문 코드를 몇 분 안에 구현하는 법을 배워보세요!

![이미지](/assets/img/2024-06-20-HowtoSecureYourSiteAgainstWebScrapers_0.png)

브라우저 지문 기술은 사용자를 고유하게 식별하고 싶은 다양한 상황에서 사용되는 보안 기술입니다. 물론, 그러한 상황 중 하나는 당신의 웹 사이트를 스크랩하는 경우입니다. 사용자 에이전트나 IP를 확인하는 것과 같은 제한적인 탐지 기술을 사용하면 그 정보를 쉽게 변경할 수 있으며 당신은 알지 못할 수도 있습니다.

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

그러나 브라우저 핑거프린트와 같은 것을 구현한다면, 그들의 작업을 훨씬 더 어렵게 만들 수 있습니다. 왜냐하면 가짜로 만들기 어려운 정보를 사용하기 때문이죠.

이 기사에서는 이렇게 불리는 "브라우저 핑거프린트"를 만드는 가장 일반적인 기술 중 일부를 다루고, 그 중 하나를 구현하는 방법을 안내해 드릴 거예요.

# 일반적인 브라우저 핑거프린팅 기술

이 제목이 어려운 것처럼 들릴 수 있지만, 핑거프린트란 특정 입력 데이터 집합으로부터 생성된 해시에 불과합니다.

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

진짜 핵심은 어떻게 그것에 도달하는지에 있어요.

### 캔버스 요소 사용하기

지문을 얻는 한 가지 방법은 사용자가 보지 못하도록 뭔가를 그려내고 그 결과를 확인하는 것입니다.

각 브라우저는 캔버스 요소에 콘텐츠를 렌더링하는 방식에 약간의 차이가 있습니다. 이들은 미묘한 차이이므로 찾고 있지 않다면 정말로 발견하기 어렵습니다.

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

특정한 사용 사례는 여러 사실을 활용합니다:

- 모든 시스템에 폰트가 제공되지 않아서 그런 경우에는 대체 옵션을 사용해야 합니다.
- 적용된 안티 앨리어싱이 항상 동일하지는 않습니다.
- 브라우저의 구현에 따라 다른 세부 사항이 있습니다.

한 번 렌더링된 후 이미지를 해시로 변환해야 하며, 그렇게 하면 지문이 생성됩니다.

최고의 부분은 캔버스 요소를 숨길 수 있어서 사용자가 실제로 무엇을 하는지 알 수 없다는 것입니다.

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

## 미디어 장치 목록

브라우저의 지문을 식별하는 또 다른 방법은 시스템에 연결된 미디어 장치 목록을 수집하고 그 정보를 기반으로 해시를 생성하는 것입니다.

이를 어떻게 할 수 있을까요? 실은 매우 간단합니다. 모든 최신 브라우저에는 연결된 모든 장치를 나열할 수 있는 미디어 장치 API가 있습니다.

다음 코드는 시스템에서 모든 미디어 장치를 나열합니다:

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

MDN 공식 문서에서 가져온 코드입니다. 제 Firefox에서 실행하면 다음 출력이 나옵니다:

```html
<img src="/assets/img/2024-06-20-HowtoSecureYourSiteAgainstWebScrapers_1.png" />
```

미래 요청에서 식별자 역할을 할 수 있는 단일 해시 값을 생성하는 방법을 쉽게 파악할 수 있을 것 같습니다. 브라우저 구성을 변경하더라도 식별 가능합니다.

## 오디오 파형 지문분석

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

캔버스 요소 기술과 마찬가지로 Web Audio API를 사용하여 오디오 클립을 생성할 수도 있습니다. 고정된 소스(모든 시스템에 동일한 입력을 제공하는 발진기)를 기반으로 하고 출력의 해시를 계산할 수도 있습니다.

Web Audio API의 복잡성을 고려하면, 많은 수학과 부동 소수점 수학이 관련되어 있습니다. 이는 각 브라우저가 조금씩 다른 구현을 갖게 되며, 이는 누가 작성했는지와 해당 운영 체제에 따라 달라집니다. 이러한 차이점은 실행 중인 시스템이 매 실행에서 일관된 고유값을 생성할 수 있을 정도로 충분히 누적됩니다.

이러한 값은 브라우저와 운영 체제를 식별하는 데 사용할 수 있는 신뢰할 수 있는 지문으로 사용할 수 있습니다. 특히, 브라우저의 시크릿 모드를 사용하더라도 동일한 지문이 유지됩니다.

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

# 직접 지문코드를 구현해 봅시다

가장 흔한 지문 기술 중 일부를 이해했으니, 여기서는 그 중 하나를 구현하는 방법에 대해 빠르게 살펴보겠습니다.

미디어 장치 목록에 대한 코드 일부를 이미 보았지만, 캔버스 요소에 중점을 둘 것입니다. 많은 데이터 포인트를 수집하는 것보다 더 흥미로운 것이라고 생각하기 때문입니다.

이 기술을 사용하려면 텍스트가 포함된 그림을 캔버스 요소 내부에 그리고, 그 그림을 단일 해시로 변환해야 합니다.

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

우리가 해야 할 일은 캔버스를 정의하고 그 안에 몇 가지 모양을 그리고 텍스트를 추가한 다음, 그 위에서 toDataURL 메서드를 호출하는 것 뿐이에요. 기본적으로 캔버스는 우리의 이미지를 PNG로 변환하고, 그것을 단일 해시 값으로 변환할 겁니다.

특히, 우리의 "해시"는 단일 정수가 될 겁니다. 본인이 원하는 해싱 방법을 사용해도 돼요. 저는 코딩하기 쉽고 빠른 성능을 가진 하나를 선택했어요.

이 코드는 다음과 같은 출력물을 생성합니다:

![How to Secure Your Site Against Web Scrapers](/assets/img/2024-06-20-HowtoSecureYourSiteAgainstWebScrapers_2.png)

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

당연히 실제 이미지는 상당히 추악합니다. 우리는 지금 아름다운 것을 만들려는 것이 아니라 해시에 대해 걱정하고 있습니다. 크롬과 시크릿 모드의 크롬의 값이 동일하고 파이어폭스에서는 다르다는 것을 주목하세요.

이것은 중요한 포인트입니다. 이는 크롤러/스크레이퍼가 그들의 브라우저에서 음해모드를 사용함으로써 "속이려" 하려고 할 때 언제인지 알 수 있다는 것을 의미합니다.

그들은 브라우저를 변경할 수 있고, 그러면 당신은 몰라도 될 것입니다. 그러나 스크레이퍼/크롤러는 보통 자신을 다른 것처럼 식별하려고 하는 동일한 브라우저를 항상 사용합니다 (User Agent 문자열과 같이).

이 상황에서 당신은 웹사이트를 크롤링/스크래핑하려는 헤드리스 브라우저에 대해 보호할 수 있습니다. 위 코드를 숨겨진 Canvas 요소에 실행하는 스크립트를 갖고, 해시를 가져와서 자체 "블랙리스트" 값 목록과 비교하세요. 그들이 거기에 있다면, 그럼 무슨 일을 해야하는지 알 수 있습니다!

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

브라우저 지문 추적은 사용자가 시스템과 상호 작용하는 방식을 원치 않을 때 보호하는 데 훌륭한 도구일 수 있습니다. 사이트를 스크랩하려는 사람부터 사용자가 유료 콘텐츠를 속일 수 없도록 하는 데 사용되며, 또는 콘텐츠에 제한된 횟수로만 액세스하도록 하는 데도 사용될 수 있습니다. 정말로 여러분의 상상력이 한계입니다.

그리고 이론이 복잡해 보이지만 실제 구현은 그렇지 않다는 것을 알 수 있습니다. 여러분은 손쉽게 자체 지문 코드를 작성할 수 있습니다.

이런 기술 중 하나를 사용해 보셨나요? 혹은 더 나아가, 과거에 한 번 속여 본 경험이 있으신가요? 그렇다면 어떻게 하셨는지 이야기를 공유해 주세요!

# 재사용 가능한 컴포넌트로 마이크로프론트엔드 구축하기

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

<img src="/assets/img/2024-06-20-HowtoSecureYourSiteAgainstWebScrapers_3.png" />

Bit의 오픈소스 도구를 통해 25만 명 이상의 개발자가 컴포넌트로 앱을 만들 수 있습니다.

어떤 UI, 기능 또는 페이지도 재사용 가능한 컴포넌트로 변환하여 여러 애플리케이션에서 공유할 수 있습니다. 협업이 더 쉬워지고 빠르게 개발할 수 있습니다.

→ 자세히 알아보기

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

앱을 구성 요소로 나누어 앱 개발을 쉽게 만들고 원하는 워크플로우에 최적의 경험을 즐기세요:

- **Micro-Frontends**
- **Design System**
- **Code-Sharing and reuse**

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

## → 모노리포

# 더 알아보기
