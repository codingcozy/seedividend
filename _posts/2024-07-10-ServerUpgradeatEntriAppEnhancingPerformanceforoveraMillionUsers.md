---
title: "엔트리 앱 서버 업그레이드 백만명 이상의 사용자 성능 향상 방법"
description: ""
coverImage: "/assets/img/2024-07-10-ServerUpgradeatEntriAppEnhancingPerformanceforoveraMillionUsers_0.png"
date: 2024-07-10 01:58
ogImage:
  url: /assets/img/2024-07-10-ServerUpgradeatEntriAppEnhancingPerformanceforoveraMillionUsers_0.png
tag: Tech
originalTitle: "Server Upgrade at Entri App: Enhancing Performance for over a Million Users"
link: "https://medium.com/entri-engineering-product-design/server-upgrade-at-entri-app-enhancing-performance-for-over-a-million-users-ec4971c3fc60"
isUpdated: true
---

![Server Upgrade at Entri: Enhancing Performance for over a Million Users](/assets/img/2024-07-10-ServerUpgradeatEntriAppEnhancingPerformanceforoveraMillionUsers_0.png)

Entri에서는 원활하고 효율적인 사용자 경험을 제공하기 위한 약속이 우리를 이끕니다. 그래서 코드베이스와 인프라를 계속 개선하고 있습니다. 최근의 백엔드 서버 업그레이드는 성능, 확장성, 신뢰성을 향상시키기 위한 거대한 작업이었습니다. 본 블로그에서는 시스템 업그레이드를 위해 취한 포괄적인 단계에 대해 소개하고 있습니다. 저희와 함께 신중한 계획과 실행 과정을 경험해보세요. 사용자에게 최소한의 방해와 최대한의 혜택을 제공하기 위해 노력했습니다.

PostgreSQL 데이터베이스 업그레이드

서버 업그레이드의 첫 번째 중요한 단계는 PostgreSQL 데이터베이스를 최신 버전으로 업데이트하는 것이었습니다. Django의 가장 오래된 버전조차도 최신 PostgreSQL 버전을 지원하지만, 그 역은 사실이 아닙니다. 따라서 데이터베이스를 업그레이드하는 것이 초기 조치여야 했습니다.

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

저희는 개발 환경에서 PostgreSQL을 업그레이드하는 것으로 시작했습니다. 이를 통해 전체 개발 및 QA 팀이 업그레이드된 서버를 사용하기 시작했고, 잠재적인 문제를 조기에 식별하고 해결하는 데 중요한 역할을 했습니다. 모든 것이 올바르게 작동하는지 확인하기 위해 수동 및 자동화된 테스트를 수행했습니다. 이 철저한 사전 제품 테스트 단계는 제품 환경으로의 원활한 전환을 보장하는 데 중요했습니다.

제품 데이터베이스를 업그레이드할 때는 상세한 계획을 따랐습니다:

- 다운타임 공지: 사용자들에게 장애 시간을 최소화하기 위해 2일 전에 예정된 다운타임을 공지했습니다.
- 주요 서비스 서버로의 트래픽 중지: 서버로의 트래픽을 중지했습니다.
- 백업 시작: 현재 데이터베이스의 백업을 시작했습니다. 백업은 점진적이었기 때문에 몇 시간 전에 이미 하나를 만들어 두어 프로세스를 가속화했습니다.
- 백업에서 복구: 현재 백업에서 복구를 시작하여 문제가 발생할 경우 사용할 수 있도록 했습니다.
- 데이터베이스 업그레이드 수행: 데이터베이스를 최신 버전의 PostgreSQL로 업그레이드했습니다.
- 트래픽 재개: 서비스로의 트래픽을 다시 시작했습니다.

4단계와 5단계는 다운타임을 최소화하기 위해 병렬로 수행되었습니다. 그 결과 백엔드 서버는 약 30분 동안 오프라인이었으며 사용자에게 최소한의 영향을 미치도록 최소한의 시간대에 예약되었습니다. 많은 앱 화면이 오프라인 사용을 지원하기 때문에 대부분의 사용자는 문제를 겪지 않았습니다. 콜라와 피자에 힘입어 우리 팀은 업그레이드를 효율적으로 완료했고 잠재적인 문제에 대응할 준비가 되어 있었습니다.

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

파이썬 업그레이드

파이썬 3.11으로 업그레이드하기로 결정한 이유는 추천되는 (n-1)번째 버전이며, 상당한 성능 향상이 제공되기 때문입니다. 하지만 최신 버전의 우분투에서는 기본 지원이 되지 않아 처음에는 초기 설정이 어려웠습니다. 우리의 초기 계획은 먼저 파이썬을 업그레이드하고, 나중에 서비스를 컨테이네라이즈하는 것이었습니다.

그러나 곧 두 작업을 동시에 처리하는 장점을 깨달았습니다. 기계에 직접 파이썬 3.11을 설치하고 설정하는 대신, 프로세스를 간단하게 해주는 도커 이미지를 선택했습니다. 업그레이드와 함께 어플리케이션을 컨테이네라이즈하는 것은 업무 흐름을 간소화하고 구성 문제의 위험을 최소화했습니다.

업그레이드 계획에 처음에는 없었지만, 업그레이드 프로세스를 컨테이네라이즈하는 것이 유용하다는 것을 발견했습니다. 확장 가능한 인프라를 제공하여 코드가 다양한 환경에서 일관되게 실행되도록 보장하며, "내 컴퓨터에서는 작동한다"는 문제를 해결했습니다.

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

Django 및 Python 라이브러리 업그레이드

Django 업그레이드를 위해 현재 LTS 버전인 4.2를 선택했습니다. 우리의 방대한 코드베이스에서 Django 및 모든 관련 Python 라이브러리를 업데이트하는 작업은 상당한 노력이 필요했습니다. 최근 업그레이드 이후의 경과를 고려할 때, 이 작업은 최우선 과제가 되었습니다.

먼저 깨끗한 가상 환경에 필요한 Django 버전을 설치하는 것부터 시작했습니다. bash 스크립팅을 사용하여 코드베이스에서 모든 import 문을 추출하고 모든 서드파티 라이브러리를 식별했습니다. 그런 다음 이러한 라이브러리의 최신 버전을 찾아 설치했습니다. 이 과정에서 충돌하는 종속성을 해결하기 위해 수동 조사가 필요했지만, 이는 1회성 노력이었습니다. 참고로, 이와 관련해 향후에 어떤 해결책을 찾아야 할 것 같네요.

또한 개발 의존성 및 테스트에 사용된 라이브러리를 업그레이드했습니다. 테스트 주도 개발에 의존하는 우리는 신속히 코드베이스 내에서 발견한 문제점을 해결했습니다. 개발자 테스트를 진행한 후, 업그레이드된 서버를 사용하여 운영 환경을 재현하고 QA 팀에 엄격한 테스트를 거쳐 전달했습니다. 그들은 잠재적인 문제점을 식별하는 데 한 달을 투자했고, 우리는 그 모두를 신속히 해결했습니다.

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

다음 Django 업그레이드의 주요 변경 사항은 다음과 같습니다:

- url에서 path로 업데이트: 간단한 regex 치환으로 이를 성공적으로 수행했습니다.
- Django 모델의 JSONField 위치 변경: 또 다른 find-and-replace 작업이었습니다.
- 데이터베이스 마이그레이션: 내부 기본 모델 값 변경에 필요한 마이그레이션을 실행하여 이전 버전과의 호환성을 보장했습니다.

Redis 업그레이드

또 다른 중요한 단계는 Redis 서버를 업그레이드한 것인데, 이 작업은 메인 서비스가 QA 팀의 테스트 중에 있을 때 수행했습니다. 저희 Redis 서버는 만료 및 비만료 키를 모두 관리합니다. 만료 키는 데이터 캐싱에 사용되며, 재생성하는 보조 로직을 통해 이를 쉽게 클리어할 수 있었습니다.

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

비만료 키는 주로 실험 기능에 사용되는데, 업그레이드 후에 이러한 키를 저장하고 되살릴 수 있는 메커니즘이 필요했습니다. 저희는 Python 피클링을 활용하여 모든 데이터를 포함한 피클 파일을 만들었고, Redis 서버를 업그레이드한 다음 파일에서 데이터를 복원했습니다. 이런 해킹적인 해결책이 효과적이었습니다.

또한, 저희 Redis 서버에는 영속성이 부족했습니다. 업그레이드를 기회로 삼아 영속성을 활성화하여 두 가지 개선을 동시에 이룩했습니다.

Celery 업그레이드는 메인 서비스와 동일한 코드베이스를 공유하는 Celery를 업그레이드하는 것이 더 하나의 간단한 단계였습니다. 새 테이블 생성 및 필드 업데이트와 같은 필요한 데이터베이스 마이그레이션은 원칙적인 소스 코드 훑기를 통해 확인되었습니다. 왜냐하면 좋은 개발자는 문서를 읽는 것보다 소스 코드를 더 유익하게 여기거든요!

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

사용자들에게 업그레이드를 새롭게 선보입니다.

업그레이드 과정 동안 우리는 모든 잠재적인 문제와 롤백에 대비해 면밀히 계획을 세웠습니다. 제품 환경에 업그레이드된 서버를 배포하는 것은 우리 사무실 IP에서만 트래픽을 먼저 라우팅하고 모니터링을 위해 모든 것을 설정하는 것을 포함했습니다. 이 신중한 접근은 기존 서버와 신버전 서버 간의 세션 키 생성 차이로 인한 예기치 못한 문제를 식별하는 데 도움이 되었습니다. 사용자들이 서버를 전환할 때 로그아웃되는 문제가 발생했기 때문에 세션 스티키니스를 구현했지만 불행히도 문제가 해결되지 않았습니다.

Django 라이브러리의 세션 키 로직을 업데이트하는 스크립트를 개발하여 서버 간의 일관성을 보장했습니다. 이 솔루션이 훌륭히 작동했고, 우리는 업그레이드된 서버로의 트래픽을 점진적으로 1주일 동안 늘려갔습니다. 모든 가능한 문제에 대비하고 필요한 경우 이전 서버로 롤백할 준비가 되어 있었습니다. 모든 것이 정상 작동하는 것이 확인되면, 예방적인 백업을 수행한 후 모든 데이터베이스 마이그레이션을 실행했습니다.

성능 향상

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

최근에 이루어진 Python과 Django의 업그레이드는 API 응답 속도를 줄이고 전체 사용자 경험을 향상시키는 중요한 성능 향상을 이끌어냈습니다. 이러한 업데이트로 우리의 CI/CD 통합이 간소화되었고, 더욱 신속한 배포와 디버깅을 위한 프로덕션 환경의 복제 설정이 간소화되었습니다. 더불어, 이러한 변경으로 인프라 요구 사항을 줄이는 것을 통해 서버 비용을 낮추는데 이바지했습니다.

각 단계를 세심하게 계획하고 실행함으로써, 우리는 자사의 주요 백엔드 서비스를 성공적으로 업그레이드하여 성능과 확장성을 향상시키고 사용자들에게는 최소한의 방해를 주는 데 성공했습니다. 이러한 포괄적인 업그레이드로 인해 우리는 미래 성장을 위한 자리매김을 하였으며 사용자 경험을 크게 향상시키는 길을 열었습니다.
