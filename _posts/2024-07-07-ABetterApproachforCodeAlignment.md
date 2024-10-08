---
title: "더 나은 코드 정렬 방법 개발자들을 위한 팁"
description: ""
coverImage: "/assets/img/2024-07-07-ABetterApproachforCodeAlignment_0.png"
date: 2024-07-07 13:03
ogImage:
  url: /assets/img/2024-07-07-ABetterApproachforCodeAlignment_0.png
tag: Tech
originalTitle: "A Better Approach for Code Alignment"
link: "https://medium.com/@gayanper/a-better-approach-for-code-alignment-611b520ff37e"
isUpdated: true
---

코드 정렬이라는 용어는 여러분들에게 여러 의미를 갖을 수 있습니다. 본 이야기의 의미는 견고한 소프트웨어 실행을 위해 필요한 권장 사항을 준수하는지 확인하는 것입니다.

이제 그런 구현 예시들을 살펴보겠습니다.

- 요청 인증
- RESTful API 빌드
- OpenTelemetry와 같은 관측성 프레임워크 설정
- Testcontainers와 같은 라이브러리를 사용한 통합 테스트 설정

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

위의 시나리오에서는 코드/라이브러리 구성을 구현하는 방법을 모든 개발자가 유사하게 따르기를 원하는 상황을 찾을 수 있을 것입니다. 각각 한 가지 예를 살펴보겠습니다.

- 요청 권한부여 - 역할을 확인하기 전에 항상 토큰을 유효성 검사하십시오.
- RESTful API 빌드 - API에 항상 @Produces 주석 사용
- OpenTelemetry와 같은 관측성 프레임워크 설정 - 모든 종류의 데이터 로그, 메트릭 및 추적을 위해 OTLP Exporter 사용
- Testcontainers와 같은 라이브러리를 사용하여 통합 테스트 설정 - CI 빌드에서 실행할 때 충돌을 피하기 위해 네트워크 별칭 사용

이제 코드 정렬이 필요한 시나리오가 여럿 있습니다. 따라서 우리가 그것을 달성할 수 있는 다양한 방법을 살펴보겠습니다.

# 솔루션

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

## 공유 라이브러리

이것은 몇몇 개발자들이 이 문제를 해결하기 위해 시도하는 가장 일반적인 방법입니다.

각 시나리오에 이 방법을 적용하고, 이 솔루션을 사용하여 문제를 해결하는 방법을 살펴봅시다.

- 권한 요청 — 공유 라이브러리 함수를 정의하여 토큰 유효성 검사를 수행하고 역할 클레임과 예상 역할을 확인하여 해당 작업을 수행할 수 있는지 여부를 통보할 수 있는 간단한 부울 결과를 제공할 수 있습니다. 이는 기대 역할/권한별로 간편화된 권한 부여를 위해 각 API에 미들웨어로 기대 역할/권한과 함께 이 공유 권한 구성요소를 플러그인할 수 있도록 지원되는 사용된 WebAPI 프레임워크를 지원하기 위해 확장될 수 있습니다.
- RESTful API 구축 — 공유 라이브러리 함수를 정의하여 개발자가 제공할 핸들러 함수와 경로를 통해 기대 헤더로 WebAPI 엔드포인트를 구성할 수 있도록 할 수 있습니다. 이는 WebAPI 라이브러리/프레임워크를 랩핑할 것입니다.
- OpenTelemetry 같은 관측 가능 프레임워크 설치 — 서비스 이름과 수집기 엔드포인트만 고려하여 OpenTelemetry SDK 구성을 수행할 수 있는 공유 라이브러리 함수를 정의할 수 있습니다. 이는 OpenTelemetry SDK를 랩핑할 것입니다.
- Testcontainers 같은 라이브러리를 사용하여 통합 테스트 설정 — 주어진 매개변수로 Testcontainer 인스턴스를 구축하는 공유 라이브러리 함수를 정의할 수 있습니다. 이는 Testcontainers 라이브러리를 랩핑할 것입니다.

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

## 코드 템플릿

개발자들이 새로운 서비스 모듈이나 엔드포인트를 생성할 때 이러한 템플릿을 사용할 수 있도록 코드 템플릿을 제공할 수도 있습니다. 이를 위한 언어/프레임워크에 내장된 지원이 있을 수도 있고, 이를 지원하는 도구를 찾을 수도 있으며, 직접 구축하는 것도 가능합니다.

- 인증 요청 — 이는 새 엔드포인트 생성 템플릿의 일부가 될 수 있습니다.
- RESTful API 구축 — 이는 새 엔드포인트 생성 템플릿의 일부가 될 수 있습니다.
- OpenTelemetry와 같은 관측 가능성 프레임워크 설정 — 이는 새 서비스 모듈 생성 템플릿의 일부가 될 수 있습니다.
- Testcontainers와 같은 라이브러리를 사용한 통합 테스트 설정 — 이는 새 Testcontainer 인스턴스 생성 템플릿의 일부가 될 수 있습니다.

각 시나리오에서의 활용도는 다를 수 있으며 때로는 편집기/IDE 템플릿 지원에 의존해야 할 수도 있습니다.

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

## 린팅/정적 분석

지금까지의 모든 접근 방식들은 개발자가 밑바닥 라이브러리 옵션을 제한하거나 숨기려고 노력하거나 코드를 생성한 후에 잊어버리려고 하는 방식입니다. 첫 번째 방식은 개발자가 실수를 할 수 없도록 보장하고, 두 번째 방식은 올바른 코드를 생성하고 나중에 코드를 편집할 때 개발자가 실수를 하지 않도록 믿습니다.

이 방식은 다르게 다룹니다. 개발자가 창의성을 발휘하여 코드를 작성할 수 있도록 허용하지만, 중요한 부분이 포함되어 있는지도 확인합니다.

- 권한 요청 — 컴파일 시간에 코드를 분석하여 JWT 토큰이 역할/권한을 확인하기 전에 유효한지 확인합니다.
- RESTful API 작성 — 컴파일 시간에 코드를 분석하여 엔드포인트 정의가 필요한 올바른 헤더 정의를 포함하고 있는지 확인합니다.
- OpenTelemetry와 같은 모니터링 프레임워크 설정 — 컴파일 시간에 코드를 분석하여 구성 코드에 OLTP Exporter만 포함되어 있고 올바르게 구성되어 있는지 확인합니다.
- Testcontainers와 같은 라이브러리를 사용한 통합 테스트 설정 — 컴파일 시간에 코드를 분석하여 테스트 코드의 각 Testcontainer 정의가 네트워크 별칭 설정을 포함하고 있는지 확인합니다.

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

당신이 중요한 부분을 찾지 못한다면 이는 컴파일 오류나 경고를 유발할 수 있습니다. 강제하고자 하는 규칙들은 공유 라이브러리와 매우 유사하게 정의하고 유지할 수 있습니다. 이 분석 규칙을 포함하여 CI 빌드에서 코드 변경이 중요한 부분을 포함하고 있는지 확인할 수 있습니다. 대부분의 프로그래밍 언어 컴파일러는 이 기능을 지원하거나 적어도 이를 위한 라이브러리가 있습니다. 기술 거물들이 지원하는 라이브러리를 사용하여 해당 언어를 위한 규칙을 쉽게 정의할 수 있습니다. 이야기에서 "Testcontainers와 같은 라이브러리를 사용한 통합 테스트 설정"에 대한 간단한 규칙 구현을 살펴보겠습니다.

# 어떻게 선택하나요?

위에 언급된 솔루션들은 모두 마법의 방법은 아닙니다. 그 중 일부는 특정 사용 사례에 더 적합하며, 또 다른 일부는 특정 사용 사례에 적합하지 않습니다. 또한, 솔루션을 선택할 때 개발자 경험과 오직 당신의 엔지니어링 부서에서 구축하고자 하는 기술 문화를 고려해야 합니다. 그래서 몇 가지 사용 사례를 살펴보고 각각에 대해 여러 솔루션을 비교하여 좋은 선택인지 확인해 보겠습니다. 비교할 때 우리는 다음을 살펴볼 것입니다:

- 재사용성
- 유지보수 및 비용
- 개발자 경험 및 문화

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

## 권한 인가 요청

인가는 모든 시스템에서 중요한 부분입니다. 따라서 인가에 대한 버그 가능성을 줄이는 것이 매우 중요합니다. 이러한 구현의 성격은 매우 반복적이고 유사하다는 점도 있습니다. 따라서 다음과 같은 이유로 “공유 라이브러리”에 매우 적합한 후보입니다.

- 신원 및 액세스 관리 팀이 해당 라이브러리와 기능의 명확한 소유자이기 때문에
- 어떤 WebAPI 프레임워크에 대해 미들웨어를 제공하여 소비자가 구성만 하면 됩니다.
- 공유 라이브러리 함수 API의 미들웨어가 역호환되도록 유지되는 한 인가 전략을 변경하는 것이 시스템의 다시 작성을 많이 할 필요가 없습니다.

다른 솔루션(코드 템플릿 & 린팅) 또한 좋은 후보지만, "공유 라이브러리" 솔루션이 하는 것처럼 인가와 관련된 잠재적인 버그 감소에 대처하지 못합니다. 린팅 솔루션을 통해 모든 가능한 구현 변형을 포착하고 누락된 부분을 식별하려 하면 너무 엔지니어링화된 솔루션이라고 볼 수 있고, 이것은 구현 및 유지 관리에 더 높은 비용이 필요한 솔루션이 될 수 있습니다.

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

## RESTful API 만들기

많은 WebAPI 프레임워크에서 이미 RESTful 엔드포인트를 간단하게 만들 수 있습니다. 따라서 개발자가 특정 HTTP 헤더를 반환하도록하는 "공유 라이브러리"를 작성하려는 것은 과도하게 엔지니어링된 솔루션이라고 볼 수 있습니다. 이로 인해 개발자들이 산업 표준이 아닌 홈그론 WebAPI 프레임워크/라이브러리를 사용해야 한다면 개발자 경험이 저하될 수도 있습니다.

"코드 템플릿"은 이 문제를 부분적으로 해결할 수 있지만, 개발자가 코드 템플릿을 사용할 것이라는 보장이 없거나 생성된 코드가 수정될 가능성이 없기 때문에 이 해결책은 일부만 해결합니다.

"린팅/정적 분석"은 좋은 해결책이 될 수 있습니다. 분석해야 하는 코드가 간단하고 변이가 적기 때문에 코드 컴파일 시간에 이러한 문제를 포착하기위한 간단한 규칙을 작성하는 것이 쉽습니다. 이렇게 하면 코드를 작성하는 시점이나 컴파일할 때 개발자에게 즉각적인 피드백을 제공합니다. 또한 코드가 컴파일 될 때 항상 이러한 검사가 수행됩니다.

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

“코드 템플릿”과 “린팅/정적 분석”을 결합하면 개발자들에게 더 나은 경험을 제공할 수 있어요.

- 표준 WebAPI 프레임워크/라이브러리를 계속 사용할 수 있어요.
- 조직의 코딩 기대에 따른 빠진 부분에 대한 즉각적인 피드백을 받을 수 있어요.
- 템플릿을 사용하여 코딩을 더 빠르게 할 수 있어요.

템플릿 및 린팅 규칙은 조직의 플랫폼 팀이 소유하거나 Inner Source 프로젝트로 취급될 수 있어요. 이 변경 사항은 이러한 코드에 한정되므로, 이에 대한 전용 팀이 없다 해도 큰 문제가 될 수 없어요.

“OpenTelemetry와 같은 관측 가능한 프레임워크 설정하기” 및 “Testcontainers 같은 라이브러리로 통합 테스트 설정하기” 두 경우 모두 앞서 언급한 사용 사례와 유사하므로, 이러한 사용 사례에 대한 해결책 또한 “린팅/정적 분석” 또는 “코드 템플릿” 및 “린팅/정적 분석”의 결합일 수 있어요.

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

# 원칙의 요지

코드를 조정하기 위해 공유 라이브러리를 작성해야 하는지 또는 코드를 조정하기 위해 린팅/정적 분석 도구를 사용해야 할지 결정할 때 언제나 무엇을 조정하려고 하는지 고려해야 합니다.

- 우리가 조정하려는 코드가 시스템 기능에 중요한가요?
- 우리가 조정하려는 코드가 도메인 특화된가요?
- 우리가 조정하려는 코드가 시스템의 여러 위치에서 동일한 방식으로 반복되나요?
- 개발자로부터 구현을 숨기는 것이 개발자 권한 부여에 불만을 일으키는가요?

이제 Q1과 Q3의 답변이 모두 "예"라면 비즈니스에 영향을 줄 수 있는 시스템 문제의 위험을 줄이기 위해 공유 라이브러리 사용을 고려해야 합니다. Q3가 "아니오"라면 린팅/정적 분석 도구를 사용하여 처리할 수 있는지 고려할 수 있습니다.

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

Q1, Q2, 그리고 Q3 응답이 모두 "아니요"라면 그 공유 라이브러리 솔루션을 고려하지 말아야 합니다. 해당 솔루션은 높은 유지보수 비용이나 너무 복잡한 솔루션으로 이어질 수 있습니다.

Q4가 "예"라면 언제나 린팅/정적 분석 도구를 사용해보세요. 하지만 다른 응답들과 함께 고려하고 특히 Q1을 검토하여 린팅 도구 문제가 중요한 비즈니스 기능의 장애를 일으키지 않도록 해야 합니다.

당신의 개발자들은 귀하의 엔지니어링 부서/조직에서 가장 가치 있는 자산입니다. 그러므로 그들의 동기부여와 권한 부여에 신경을 써야 합니다. 이것은 당신의 부서/조직에서 좋은 엔지니어링 문화를 유지하기 위한 최우선 과제여야 합니다. 이를 유지하지 못하면 많은 우수한 개발자들이 당신의 부서/조직을 떠날 것입니다. 그러므로 이 사항도 고려에 포함시켜야 합니다.

즐거운 코딩하세요! 👨‍💻
