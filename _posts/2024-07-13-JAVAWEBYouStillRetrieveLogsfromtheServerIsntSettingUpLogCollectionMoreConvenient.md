---
title: "JAVA 웹 아직도 서버에서 로그를 수집하고 계신가요 로그 수집 설정이 더 편리하지 않나요"
description: ""
coverImage: "/assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_0.png"
date: 2024-07-13 20:41
ogImage:
  url: /assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_0.png
tag: Tech
originalTitle: "JAVA WEB: You Still Retrieve Logs from the Server? Isn’t Setting Up Log Collection More Convenient?"
link: "https://medium.com/stackademic/java-web-you-still-retrieve-logs-from-the-server-isnt-setting-up-log-collection-more-convenient-cedbb262c5b1"
isUpdated: true
---

`<img src="/assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_0.png" />`

# 1. ELK Log System

전통적인 ELK 아키텍처는 현재 Elastic Stack으로 알려져 있으며 Elasticsearch, Logstash, Kibana 및 Beats의 조합으로 이루어져 있습니다:

- Beats는 로그 수집을 담당합니다.
- Logstash는 로그 집계 및 처리를 담당합니다.
- Elasticsearch (ES)는 로그 저장 및 검색 시스템으로 기능합니다.
- Kibana는 프론트엔드 시각화를 제공합니다.

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

전체 아키텍처 다이어그램:

![다이어그램](/assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_1.png)

# 2. EFK 로그 시스템

컨테이너화된 시나리오에서는 특히 Kubernetes(k8s) 환경에서 사용자들이 EFK 아키텍처를 자주 사용합니다.

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

F는 Fluend Bit을 의미합니다. Fluend Bit은 오픈 소스이며 여러 플랫폼에서 동작하는 로그 프로세서 및 포워더입니다. Fluend Bit을 사용하면:

- 다양한 소스에서 데이터/로그를 수집할 수 있습니다.
- 이를 통합하여 여러 대상지로 전송할 수 있습니다.
- Docker 및 k8s 환경과 완벽하게 통합됩니다.

![이미지](/assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_2.png)

# 3. PLG 로그 시스템

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

# 3.1 프로메테우스 + k8s 로그 시스템

프로메테우스는 Kubernetes (k8s)와 결합하여 효율적인 로그 시스템을 구축하는 데 사용할 수 있습니다.

이 시스템은 모니터링 및 경고를 위해 프로메테우스를 활용하여 Kubernetes 환경에서 로그 기록에 강력한 솔루션을 제공합니다.

![이미지](/assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_3.png)

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

<img src="/assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_4.png" />

# PLG

Grafana Labs에서 제공하는 또 다른 로그 솔루션인 PLG가 인기를 얻고 있습니다. PLG 아키텍처는 Promtail, Loki 및 Grafana의 조합으로 구성되어 있습니다:

- Promtail은 로그를 수집하는 역할을 합니다.
- Loki는 로그 집계 및 저장 시스템 역할을 합니다.
- Grafana는 프론트엔드 시각화를 제공합니다.

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

![이미지](/assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_5.png)

Grafana는 오픈 소스 시각화 및 분석 소프트웨어로 사용자가 모니터링 메트릭을 쿼리하고 시각화하며 경보를 설정하고 탐색할 수 있게 합니다.

Grafana는 기본적으로 시계열 데이터에 대한 대시보드 솔루션을 제공하며 1다양한 데이터 소스를 지원합니다.

Grafana Loki는 로그 스택으로 구성될 수 있는 구성 요소 집합입니다. 다른 로그 시스템과 달리 Loki는 로그 메시지의 원시 메시지가 아닌 로그의 레이블만 색인화합니다.

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

대신, 로그 데이터에 대한 레이블 그룹을 설정하여 운영 비용을 줄이고 효율성을 크게 향상시킵니다.

![2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_6.png](/assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_6.png)

# Loki 디자인 철학

Prometheus를 모티브로 한 Loki는 수평적으로 확장 가능하고 고가용성을 갖춘 멀티테넌트 로그 시스템을 목표로 합니다.

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

로키의 전체 아키텍처는 로그 수집, 색인, 저장 및 기타 작업을 수행하기 위해 협력하는 다양한 구성 요소로 구성되어 있습니다.

구성 요소는 다음과 같습니다:

- Promtail: 다양한 소스에서 로그를 수집하고 로키로 전달합니다.
- Loki: 레이블을 사용하여 로그 데이터를 저장하고 색인화합니다.
- Grafana: 로그 데이터를 시각화하고 쿼리 및 경고를 허용합니다.

더 자세히 알아보려면 로키의 아키텍처를 방문해주세요. 로키는 본질적으로 "로그용 프로메테우스와 같은" 것입니다.

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

<img src="/assets/img/2024-07-13-JAVAWEBYouStillRetrieveLogsfromtheServerIsntSettingUpLogCollectionMoreConvenient_7.png" />

프롬테일(Promtail)은 로컬 로그 내용을 Loki 인스턴스로 전송하는 로그 수집 에이전트입니다.

일반적으로 응용 프로그램을 모니터링해야 하는 모든 기계/컨테이너에 배포됩니다. 프롬테일은 주로 대상을 발견하고 로그 스트림에 레이블을 부착하며 Loki로 로그를 전송하는 데 사용됩니다. 지금까지 프롬테일은 두 가지 소스로부터 로그를 추적할 수 있습니다: 로컬 로그 파일과 시스템디로그 (AMD64 아키텍처 전용).

# 4. PLG 대 ELK

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

# 4.1 ES 대 노키

ELK/EFK 아키텍처는 견고하며 실제 환경에서 많은 연도 동안 검증되었습니다.

Elasticsearch (ES)에 저장된 로그는 일반적으로 디스크에 저장된 구조화되지 않은 JSON 객체 형식이며, ES는 각 객체를 전체 텍스트 검색을 위해 색인화합니다. 이를 통해 사용자는 특정 쿼리 언어를 사용하여 이러한 로그를 검색할 수 있습니다.

한편, Loki는 데이터 저장을 분리합니다:

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

- 디스크에 데이터를 저장할 수 있습니다.
- 아마존 S3와 같은 클라우드 저장 시스템도 사용할 수 있습니다.

Loki 로그는 일련의 키-값 쌍으로 레이블이 지정되며, 인덱싱되는 것은 이 레이블 뿐입니다.

이 교환은 Loki의 인덱싱 작업을 덜 비용 소모적으로 만듭니다. 그러나 콘텐츠 기반 쿼리의 경우 사용자는 별도의 검색을 위해 LogQL을 사용해야 합니다.

# 4.2 Fluentd 대 Promtail

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

Fluentd에 비해 Promtail은 Loki에 맞게 사용자 정의되었습니다. Promtail은 Kubernetes (k8s) Pods와 동일한 노드에서 실행되는 서비스를 탐지하고 지정된 디렉토리에서 로그를 읽을 수 있습니다.

Loki는 Prometheus와 유사한 레이블링 방법을 사용합니다. 따라서 Prometheus와 동일한 환경에 배포된 경우, Promtail의 로그는 일반적으로 응용 프로그램 메트릭과 동일한 레이블을 갖추어 통일된 레이블 관리를 가능하게 합니다.

# 4.3 Grafana 대비 Kibana

Kibana는 이상 감지 및 기타 머신러닝 기능과 같은 고급 기능을 포함한 데이터 분석을 위한 많은 시각화 도구를 제공합니다. Prometheus와 Loki의 시계열 데이터를 위해 설계된 Grafana는 동일한 대시보드에서 로그와 메트릭을 볼 수 있도록 해줍니다.

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

# 스택더믹 🎓

끝까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 글을 추천하고 작가를 팔로우해주세요! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Differ
- 스택더믹닷컴에서 더 많은 콘텐츠를 만나보세요.
