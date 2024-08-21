---
title: "HTTP 요청 로그를 통해 봇 트래픽 측정 및 감사하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-HowtoMeasureandAuditBotTrafficbyHTTPRequestLogs_0.png"
date: 2024-06-23 13:31
ogImage:
  url: /assets/img/2024-06-23-HowtoMeasureandAuditBotTrafficbyHTTPRequestLogs_0.png
tag: Tech
originalTitle: "How to Measure and Audit Bot Traffic by HTTP Request Logs"
link: "https://medium.com/gitconnected/how-to-measure-and-audit-bot-traffic-by-http-request-logs-97068beaca12"
isUpdated: true
---

현재 인터넷 트래픽의 약 30%는 봇, 스파이더 및 크롤러에 의해 생성됩니다. 이들은 다양한 목적으로 웹을 스캔하는 자동화 프로그램입니다.

이 프로그램 중 일부는 다음과 같은 중요한 인터넷 작업을 수행합니다:

- 검색 엔진 인덱싱
- 성능 모니터링
- 인터넷 매핑
- 선의의 취약점 스캔

해당 주제에서 제가 찾을 수 있는 가장 포괄적인 목록은 클라우드플레어의 목록입니다.

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

# 합법적인 또는 조작된 것인가요?

좋은 크롤러 외에도, 다른 많은 봇들은 단순히 자원을 낭비하거나 비패치된 취약점을 악용하려 하거나 웹사이트의 콘텐츠를 훔치려고 시도하는 경우가 많습니다.

좋은 봇과 나쁜 봇을 구분하는 것은 어려운 주제입니다. 몇몇 영리한 봇은 사용자 에이전트 필드를 조정하여 실제로 보이도록 속이려고 합니다. 사용자 에이전트 필드는 브라우저가 웹사이트로 보내는 것이며, 자기 자신을 식별하는 방법입니다.

```js
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:35.0) Gecko/20100101 Firefox/35.0
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

그래도 프로그래밍으로 요청을 보낼 때, 어떤 개발자든 해당 요청에 원하는 사용자 에이전트를 설정할 수 있어요. 그래서 HTTP 요청이 필수적인 봇에서 시작되었는지를 확인하는 방법은 사용자 에이전트 값을 살펴보는 것 뿐이에요.

## robots.txt는 어떤가요?

웹사이트 루트에 위치한 robots.txt 파일은 자동화된 요청에 대한 해당 웹사이트의 정책을 나타냅니다. 크롤러(또는 프로그램)가 지시 사항을 존중하고 이행하는 것은 그들에 달려 있어요.

# 원본 확인

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

다행히도, 주요 인터넷 업체들은 명확한 확인 지침을 제공하고 최신 IP 목록을 유지하고 있습니다. 이를 통해 누구든지 특정 서비스에서 오는 임의의 요청인지 여부를 확인할 수 있습니다.

지금 당장, 이 정보를 공유하는 기업들 사이에 공통 표준이 없습니다. 이 공통 표준의 부재는 괜찮습니다; 웹에는 더 많은 대화가 필요합니다 — 더 많은 규제가 아닌요.

아래를 읽어보세요.

## Google

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

Google은 사전 정의된 URL에서 제공되는 JSON 형식(기계가 읽을 수 있는 형식)으로 봇 IP 범위를 공개합니다. Google은 현재 세 가지 주요 크롤러를 운영 중입니다:

- GoogleBot — Google 검색용 초기 크롤러
- GoogleBot Special + AdsBot — 광고 및 기타 서비스
- GoogleBot User Triggered — 사용자 요청에 따른 색인 작업

## Bing

Microsoft는 검색 결과를 개선하기 위해 BingBot을 사용하며, Google과 동일한 JSON 형식으로 IP 범위를 나열합니다.

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

## OpenAI

GPTBot은 OpenAI의 봇으로, 웹사이트 콘텐츠를 다운로드하는 데 사용될 가능성이 높습니다. 이를 통해 ChatGPT와 같은 AI 모델을 훈련할 수 있습니다. IP 범위는 JSON 형식으로 제공됩니다. robots.txt를 사용하여 이들을 차단할 수 있습니다.

## DuckDuckGo

DuckDuckGo는 Google의 대체로서 개인정보 보호에 중점을 둔 검색 엔진입니다. 이 페이지에서 각 개별 봇의 IP를 공개합니다.

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

## 메타

메타는 웹사이트에 접근하기 위해 Facebook 크롤러를 사용합니다. IP 범위는 radb.net 레지스트리를 사용하여 공개됩니다.

## Amazon, Apple, Baidu, Sogou, Yahoo, Yandex

이 기업들은 인터넷을 스캔하는 데 사용되는 IP 주소의 고정된 목록이나 자동 업데이트되는 목록을 공개하지 않습니다. 그러나, bot 트래픽이 자신들의 시스템에서 유래되었는지 확인하는 문서화된 방법을 갖고 있습니다. host 명령을 사용하여 확인할 수 있습니다.

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

$ host 17.58.101.179
179.101.58.17.in-addr.arpa domain name pointer 17-58-101-179.applebot.apple.com.

## 인터넷 아카이브

인터넷 아카이브 봇은 웨이백 머신/아카이브 닷오르그 프로젝트를 위한 크롤러입니다. 그들은 웹의 콘텐츠를 역사적인 이유로 저장합니다. 웹사이트는 변화하고 페이지는 매일 생성되고 사라집니다.

IABot은 host 명령을 사용하여 확인할 수 있습니다. robots.txt의 내용을 무시하기 때문에 차단하기 어렵습니다.

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

## CommonCrawl

커먼크롤(CommonCrawl)은 인터넷 아카이브와 유사한 비영리 기관입니다. 전체 인터넷의 주기적인 스냅샷 또는 데이터셋을 생성하고 이를 공개적으로 제공합니다.

커먼크롤은 해당 주제에 대한 정보를 과도하게 공유하지 않으며, 실제 CCBot를 식별하는 것은 대규모 온디맨드 AWS 인프라에서 실행되므로 더 복잡합니다.

한 가지 방법은 사용자 에이전트와 호스트를 모두 확인하는 것입니다. 이는 완벽한 방법은 아니지만, 모든 EC2 클라우드 인스턴스가 같은 .amazonaws.com 호스트 이름을 공유하기 때문에 복잡합니다. 그러나 두 가지가 일치하면, 요청이 실제 CCBot에서 시작되었을 가능성이 있습니다.

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

# 이 스크립트로 변환하기

GitHub에는 자체 업데이트되는 좋은 봇 IP 목록 및 프로젝트가 많이 있습니다. 주요 단점은 이러한 프로젝트 관리자에게 의존한다는 것입니다. 이러한 프로젝트의 계획 또는 EOL(수익화 종료) 날짜는 알려져 있지 않으며 라이선스도 명확하지 않습니다.

그것을 고려하면 아래 스크립트는 생성자에서 IP 범위에 관한 모든 정보를 다운로드합니다. 그 정보는 직접 제공되는 서비스에서 가져옵니다. 따라서 HTTP 요청 로그 항목의 IP 및 사용자 에이전트를 확인할 수 있습니다.

안타깝게도 이 스니펫은 완전한 Python 패키지로 발전시키기 위해 추가 작업이 필요하므로 현재는 Gist 상태입니다. 호스트 호출로 인해 실시간 사용에 대한 도움 클래스는 충분히 빠르지 않을 것입니다. 50,000개의 로그 항목을 확인하는 데 약 15분이 소요됩니다. 서브프로세스 호출에 대해 교차 플랫폼 작업이 필요할 수 있습니다. IPv6 지원은 없습니다. 가독성을 우선시합니다.

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

웹 응용 프로그램 방화벽(WAF)가 실시간으로 이러한 요청을 차단해야 한다면 CloudFlare, RunCloud 등의 검증된 서비스를 선택하세요.

현재 클래스는 과거의 HTTP 서버 로그 항목을 테스트할 수 있습니다. 서버가 받는 건강한 봇/크롤러/스파이더 트래픽의 양을 확인하는 데 사용할 수 있습니다.

# 사용 방법

저는 NGINX 서버의 봇 트래픽을 확인하기 위해 아래 스크립트를 사용했습니다.
아래의 사용 예는 하위 폴더 내에있는 모든 access.log[.*.gz] 파일을 구문 분석합니다.

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

# NGINX 로그 파일에서 모든 데이터를 pandas DataFrame으로 로드합니다

NGINX 로그 파일에서 모든 데이터를 pandas DataFrame으로로드합니다.

# tqdm을 사용하여 요청 정보를 확인하고 진행 상황을 보고합니다

tqdm을 사용하여 요청 정보를 확인하고 진행 상황을 보고합니다. 이 단계는 시간이 걸릴 수 있으므로 주의해주세요.

# 디스크에 보고서 저장 및 요약 출력

디스크에 보고서를 저장하고 요약을 출력합니다.

이 스크립트는 NGINX 로그 파일에 작동합니다. NGINX는 인그레스 컨트롤러로 가장 인기 있는 선택지이기 때문에 잘 작동합니다.  
위 코드 조각들은 어떤 데이터 분석 사용 사례 및 다른 인그레스 컨트롤러에 대한 확장이 가능하도록 충분히 일반적입니다.

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

사실, 로봇 요청 중에서 4%만 진짜 서비스에서 시작된 것으로 나타났습니다. 즉, 25개 중 1개만이 진짜 요청입니다.

나머지는 단지 대역폭과 자원을 낭비하는 것 뿐입니다.

읽어주셔서 감사합니다!
