---
title: "대규모 Rails 실전 아키텍처 결정과 배운 점  2024년 최신 Ruby 심층 분석"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-04 19:03
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Rails at Scale Real-World Architecture Decisions and Lessons Learned  Ruby Deep Dive18"
link: "https://medium.com/@diversepixel/rails-at-scale-real-world-architecture-decisions-and-lessons-learned-ruby-deep-dive-17-0451b2f156d3"
isUpdated: true
---

루비 온 레일즈는 기술 거물부터 혁신적인 스타트업 및 오픈 소스 프로젝트까지 다양한 성공적인 애플리케이션을 구동해 왔습니다. 이 글에서는 각기 다른 조직이 레일즈를 어떻게 확장하고 중요한 아키텍처 결정을 내렸으며, 그 과정에서 얻은 귀중한 교훈에 대해 알아보겠습니다.

## GitHub: 모놀리스 체제 발전

아키텍처 결정:

- 수백만 사용자로 확장되는 동안 단일체 아키텍처를 유지
- 대규모 코드 저장소를 처리하기 위해 사용자 정의 데이터베이스 솔루션(GitHub-SQL) 개발
- "작은 단위로 자주 배포" 전략 구현

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

배운 교훈:

- 적절한 설계와 인프라로 모놀리스는 확장될 수 있습니다.
- 특정 요구사항에 맞춤형 도구에 투자하면 상당한 이점을 얻을 수 있습니다.
- 지속적인 배포는 리스크를 줄이고 개발 속도를 높일 수 있습니다.

최신 정보 파악하기:

- 정기적인 Rails 업그레이드를 통해 상향 게시한 수정 사항
- 실시간 기능을 위한 ActionCable과 같은 새로운 기능의 점진적 채택

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

## Shopify: 모듈식 단일체 접근 방식

아키텍처 결정:

- 애플리케이션을 구성 요소로 나누는 "모듈식 단일체" 방식 도입
- 수평 확장을 위해 사용자 정의 데이터베이스 샤딩 솔루션(Ghostferry) 구현
- Scout APM와 같은 성능 모니터링 도구 개발 및 오픈소스화

얻은 교훈:

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

- 모듈식 설계는 운영 복잡성 없이 많은 마이크로서비스 이점을 제공할 수 있습니다.
- 장기적인 확장성을 위해 데이터 이전 및 샤딩 도구에 투자하는 것이 중요합니다.
- 내부 도구를 오픈소스화하면 커뮤니티에 이점을 제공하고 코드 품질을 향상시킬 수 있습니다.

최신 정보 유지:

- 핵심 인프라 및 Rails 업그레이드를 유지하는 전담 팀
- Rails 핵심에 적극적인 기여, 프레임워크 방향에 영향을 미침

## Basecamp: 규모에 맞은 간단함

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

아키텍처 결정:

- Rails의 규칙과 간단함을 받아들임
- 현대적이고 빠른 UI를 위해 Hotwire(Turbo 및 Stimulus)를 개발하고 채택
- 관심 분리를 위해 다중 데이터베이스 지원을 활용함

학습한 교훈:

- Rails 규칙을 준수하면 유지보수가 용이하고 성능이 우수한 애플리케이션을 개발할 수 있음
- JavaScript를 일부 첨가한 서버 렌더링된 HTML은 반응형 UI를 만들 수 있음
- 관심에 따라 데이터베이스를 분리하면 성능과 확장성을 개선할 수 있음

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

최신 유지하기:

- 새로운 Rails 기능의 초기 채택, 그 개발을 주도하는 경우가 많음
- 새로운 Rails 기능을 활용하기 위한 정기적인 리팩터링

## Gitlab: 대규모 오픈 소스 Rails 어플리케이션 관리

아키텍처 결정:

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

- 모노리식 코어를 유지하면서 서비스 지향 아키텍처로 점진적 전환
- 복잡한 작업을 처리하기 위해 백그라운드 작업을 널리 사용
- REST와 함께 GraphQL API 구현

배운 교훈:

- 오픈 소스 개발은 코드 품질과 기능 속도를 증진시킬 수 있음
- 모놀리스와 서비스의 균형은 신중한 계획과 명확한 경계가 필요
- GraphQL은 API 사용자에게 유연성을 제공하고 특히 복잡한 데이터 요구 사항에 유용함

최신 정보 유지하기:

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

- 주요 Rails 버전을 위한 전용 업그레이드 스프린트
- 업그레이드 중 안정성을 보장하기 위한 방대한 테스트 커버리지

## 인스타카트: 레일즈를 활용한 실시간 물류

아키텍처 결정:

- 백엔드 서비스에는 Rails를 활용하고 프론트엔드에는 React 도입
- 복잡한 배송 물류 처리를 위해 강력한 백그라운드 작업 처리 구현
- 캐싱 및 실시간 데이터에 대해 Redis를 많이 활용

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

배운 교훈:

- 적절한 도구와 결합하면 Rails가 복잡한 물류 시스템을 효과적으로 지원할 수 있습니다.
- 프론트엔드와 백엔드를 분리하는 것은 개발 속도를 향상시킬 수 있습니다.
- 캐싱은 대규모 실시간 데이터 처리에 중요합니다.

최신 정보 유지:

- 최신 Rails 버전으로의 점진적 이전
- 지속적인 성능 모니터링 및 최적화

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

## Chatwoot: 오픈소스 고객 상호작용 스위트

아키텍처 결정:

- 프론트엔드에 Vue.js를 사용한 단일 Rails 응용 프로그램으로 구축되었습니다.
- 실시간 통신을 위해 ActionCable을 활용했습니다.
- 확장성을 위해 플러그인 시스템을 구현했습니다.

얻은 교훈:

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

- 레일스는 현대적이고 실시간 애플리케이션을 효과적으로 지원할 수 있어요
- 오픈소스 개발은 빠른 기능 개발 및 커뮤니티 참여를 촉진할 수 있어요
- 플러그인 시스템을 통해 핵심 코드베이스를 손상시키지 않고 맞춤 설정 가능

최신 정보 유지하기:

- 정기적인 의존성 업데이트 및 레일스 업그레이드
- 프로젝트를 최신 상태로 유지하기 위해 커뮤니티 기여 활용

# 공통 테마와 베스트 프랙티스:

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

## 신중한 아키텍처 진화:

- 단일체로 시작하고 필요할 때만 서비스를 추출합니다.
- 복잡성을 관리하기 위해 모듈식 디자인을 사용합니다.

## 성능 최적화:

- 캐싱 전략에 투자합니다 (Redis, Russian Doll 캐싱).
- 데이터베이스 쿼리를 최적화하고 적절한 인덱싱을 구현합니다.
- 번거로운 작업에 대한 백그라운드 작업을 사용합니다.

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

## 확장 전략:

- 수평 확장을 위해 데이터베이스 샤딩 구현하기
- 데이터베이스 부하 분산을 위해 읽기 전용 복제본 활용
- 정적 자산 전달을 위해 CDN 활용

## Rails 최신 유지하기:

- 현재 유지를 위해 정기적이고 점진적인 업그레이드
- 업그레이드를 용이하게 하기 위해 포괄적인 테스트 커버리지 유지
- 방향에 영향을 미치기 위해 Rails 및 관련 프로젝트에 기여하기

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

## 에코시스템 활용하기:

- 일반적인 기능에는 젬(Gem)을 활용하세요
- 내부 도구를 오픈소스로 공개하여 커뮤니티에 기여하세요
- Rails 컨퍼런스 및 커뮤니티 행사에 참여하세요

## 새로운 기술 균형 맞추기:

- 이득이 있는 곳에서는 새로운 프론트엔드 기술(React, Vue.js)을 채택하세요
- ActionCable과 같은 최신 Rails 기능을 탐색하세요
- 복잡한 API 요구 사항을 고려하여 GraphQL을 사용하세요

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

이러한 사례 연구는 Rails가 모든 규모의 애플리케이션에 대한 실현 가능하고 확장 가능한 솔루션이라는 것을 입증합니다. 성공의 열쇠는 신중한 아키텍처 결정, 성능 최적화에 대한 헌신, 그리고 애플리케이션을 최신 상태로 유지하는 전략에 있습니다. 다음 기술 거인을 구축하거나 오픈 소스 프로젝트를 만들고 있더라도, 이러한 Rails 애플리케이션으로부터 배운 교훈은 시간이 지남에 따라 Rails 애플리케이션을 확장하고 유지하는 데 유용한 통찰력을 제공합니다.
