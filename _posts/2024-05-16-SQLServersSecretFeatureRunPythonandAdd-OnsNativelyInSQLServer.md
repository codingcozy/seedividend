---
title: "SQL Server의 비밀 기능 - SQL Server에서 Python 및 애드온을 네이티브로 실행하기"
description: ""
coverImage: "/assets/img/2024-05-16-SQLServersSecretFeatureRunPythonandAdd-OnsNativelyInSQLServer_0.png"
date: 2024-05-16 17:19
ogImage:
  url: /assets/img/2024-05-16-SQLServersSecretFeatureRunPythonandAdd-OnsNativelyInSQLServer_0.png
tag: Tech
originalTitle: "SQL Server’s Secret Feature — Run Python and Add-Ons Natively In SQL Server"
link: "https://medium.com/towards-data-science/sql-servers-secret-feature-run-python-and-add-ons-natively-in-sql-server-7f3c4efe5c00"
isUpdated: true
---

## 파이썬 라이브러리를 가져와서 SQL 테이블을 조작하고 출력하며, SQL 서버를 떠나지 않고 작업하세요.

## 문제

이 프로젝트에서는 두 가지 서로 다른 출처에서 가져온 37,000개의 회사 이름을 관리하는 어려움에 직면합니다. 이 복잡성은 이러한 소스 간에 동일한 회사가 어떻게 나열되는지에 대한 잠재적인 불일치에 있습니다.

## 목표

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

이 문서의 목표는 Microsoft SQL Server 내에서 Python을 네이티브로 실행하는 방법을 가르치는 것입니다. 또한 SQL을 사용하여 결과 테이블에 대해 추가 처리를 수행하고, 애드온 및 외부 라이브러리를 사용할 수 있습니다.

![이미지](/assets/img/2024-05-16-SQLServersSecretFeatureRunPythonandAdd-OnsNativelyInSQLServer_0.png)

# 초기 알고리즘 빌드

다음은 알고리즘을 구축할 때 따를 전략입니다:

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

- 블로킹 — 공통 속성을 기반으로 데이터 집합을 더 작은 블록이나 그룹으로 나누어 레코드 비교의 계산 복잡성을 줄이는 것입니다. 이는 검색 공간을 좁히고 유사도 검색 작업의 효율성을 향상시킵니다.
- 전처리 — 생 데이터를 정리하고 표준화하여 대문자를 소문자로 변환하거나 구두점을 제거, 불용어를 제거하는 등의 작업을 통해 분석에 준비시킵니다. 이 단계는 데이터 품질을 향상시키고 잡음을 줄입니다.
- 유사도 검색 모델 적용 — 모델을 적용하여 레코드 간의 유사도나 거리를 토큰화된 표현을 기반으로 계산하는 것입니다. 이는 코사인 유사도나 편집 거리와 같은 메트릭을 사용하여 레코드 링킹이나 중복 제거와 같은 작업을 위해 유사한 쌍을 식별하는 데 도움이 됩니다.

## 블로킹

내 데이터 집합은 매우 불균형합니다 — 첫 번째 테이블에는 1,361,373개의 엔티티가 있고 두 번째 테이블에는 37,171개의 회사 이름이 있습니다. 전처리하지 않은 테이블에서 일치를 시도하면 알고리즘은 매우 오랜 시간이 걸릴 것입니다.

테이블을 블로킹하려면 2개의 데이터 집합 간에 어떤 공통된 특성이 있는지 확인해야 합니다. 내 경우, 회사들은 모두 내부 프로젝트와 관련이 있습니다. 그러므로 다음과 같이 작업할 것입니다:

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

- 작은 테이블에서 고유한 회사 이름과 프로젝트 코드를 추출합니다.
- 프로젝트 코드를 순회하면서 큰 테이블에서 해당 코드를 찾습니다.
- 해당 프로젝트의 모든 자금을 매핑하고 큰 테이블에서 제외합니다.
- 다음 프로젝트에 대해 반복합니다!

이렇게 하면 매 반복마다 큰 데이터 세트를 줄이게 되며, 프로젝트 수준에서의 필터링된 데이터 세트로 인해 매핑이 빠릅니다.

이제 두 테이블을 프로젝트 코드로 필터링할 것입니다.

이 방식으로 접근하면, 작은 테이블에는 프로젝트 'ABC'에 대해 매핑할 406개의 행만 있고, 큰 테이블에는 매핑 대상인 15,973개의 행이 있습니다. 이는 최초 테이블에서 상당한 감소입니다.

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

## 프로그램 구조

이 프로젝트는 SQL 서버에서 Python 및 SQL 함수를 모두 포함할 것입니다. 아래는 프로그램이 어떻게 작동하는지 더 명확히 이해하기 위해 간략히 스케치된 내용입니다:

![프로그램 실행](/assets/img/2024-05-16-SQLServersSecretFeatureRunPythonandAdd-OnsNativelyInSQLServer_1.png)

프로그램 실행:

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

- 프로젝트 코드를 루프로 출력하는 것은이 기능의 가장 간단한 버전입니다.

SQL 커서는 너무 많은 리소스를 사용한다는 것이 빨리 드러납니다. 간단히 말해서, 이는 커서가 행 수준에서 작동하고 모든 행을 통과하여 작업을 수행하기 때문입니다.

성능을 향상시키기 위해 임시 테이블을 사용하고 커서를 제거할 것입니다. 여기에 결과 함수가 있습니다:

이제 이 함수는 대형 매핑 테이블에서 해당 프로젝트로 필터링된 프로젝트 코드와 데이터를 선택하는 데 약 3초가 소요됩니다.

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

데모 목적으로는 2개의 프로젝트에만 집중할 것이나, 프로덕션 환경에서 작업할 때는 모든 프로젝트에서 함수를 실행할 것입니다.

다음에 사용할 최종 함수는 다음과 같습니다:

## 매핑 테이블 준비

다음 단계는 Python 전처리 및 매핑 함수용 데이터를 준비하는 것입니다. 이를 위해 2개의 데이터셋이 필요합니다:

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

- 대형 매핑 테이블에서 프로젝트 코드로 필터링된 데이터
- 소기업 테이블에서 프로젝트 코드로 필터링된 데이터

여기에 2개의 테이블에서 선택된 데이터가 포함된 업데이트된 함수가 있습니다:

이 함수를 통해 각 프로젝트에 대한 프로젝트, 회사 이름 및 소스를 얻을 수 있습니다.

이제 파이썬에 대비되었습니다!

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

# SQL에서의 Python 실행

SQL Server에서 Python은 sp_execute_external_script을 통해 SQL Server 내에서 Python 코드를 직접 실행할 수 있게 해줍니다.

SQL과 Python 간의 데이터 교환을 통해 Python의 기능을 SQL 워크플로에 통합할 수 있습니다. 제공된 예시에서는 Python 스크립트가 실행되어 입력 데이터에서 pandas DataFrame을 생성합니다.

결과는 단일 출력으로 반환됩니다.

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

대박이네요!

SQL에서 Python을 실행하는 중요한 몇 가지 사항이 있습니다:

- 문자열은 작은 따옴표(')가 아닌 큰 따옴표(")로 정의됩니다. 특히 정규표현식을 사용할 때 이를 확인해야 하며, 오류 추적에 시간을 낭비하지 않도록 주의해주세요.
- 하나의 출력만 허용됩니다. 따라서 Python 코드는 출력에서 하나의 테이블을 생성하게 됩니다.
- 디버깅을 위해 print 문을 사용하고 결과를 SQL 서버의 '메시지' 탭에 인쇄된 결과를 확인할 수 있습니다. 아래와 같이:

![image](/assets/img/2024-05-16-SQLServersSecretFeatureRunPythonandAdd-OnsNativelyInSQLServer_2.png)

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

## SQL에서 파이썬 라이브러리

SQL Server에서는 여러 라이브러리가 미리 설치되어 있고 쉽게 접근할 수 있습니다. 이러한 라이브러리들의 완전한 목록을 보려면 다음 명령을 실행할 수 있습니다:

다음은 결과의 예시입니다:

![이미지](/assets/img/2024-05-16-SQLServersSecretFeatureRunPythonandAdd-OnsNativelyInSQLServer_3.png)

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

# 파이썬으로 텍스트 매칭하기

우리가 생성한 테이블에 돌아와서, 이제 파이썬을 사용하여 여러 소스에서 가져온 회사 이름을 매칭할 수 있습니다. 우리의 파이썬 절차는 긴 테이블을 입력받아 매핑된 엔티티들이 있는 테이블을 출력할 것입니다. 이는 작은 회사 테이블의 각 레코드 옆에 있는 대형 매핑 테이블에서 가장 가능성이 높은 매치를 보여주어야 합니다.

![이미지](/assets/img/2024-05-16-SQLServersSecretFeatureRunPythonandAdd-OnsNativelyInSQLServer_4.png)

이를 위해 먼저 SQL 절차에 파이썬 함수를 추가해 보겠습니다. 첫 번째 단계는 데이터 집합을 단순히 Python에 넣는 것입니다. 이를 샘플 데이터셋으로 하고, 그런 다음 실제 데이터로 하겠습니다. 여기에 코드가 있습니다:

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

이 시스템을 통해 두 테이블을 모두 파이썬 함수의 입력으로 전달할 수 있습니다. 그러면 두 테이블을 출력으로 출력합니다.

## 파이썬에서의 전처리

문자열을 효과적으로 일치시키기 위해 Python에서 몇 가지 전처리를 수행해야 합니다. 이는 다음을 포함합니다:

- 강세 음절 및 다른 언어별 특수 문자 제거
- 공백 제거
- 구두점 제거

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

SQL 작업 중 정렬을 사용하여 첫 번째 단계를 진행하고, 나머지 두 단계는 Python 함수의 전처리 단계에서 처리될 것입니다.

다음은 전처리가 포함된 함수의 모습입니다:

결과는 3개의 열로 나타납니다. 하나는 회사 이름을 소문자로 작성하고, 두 번째 열은 프로젝트 열이며, 세 번째 열은 출처입니다.

## Python에서 문자열 매칭하기

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

여기서는 사용할 수 있는 라이브러리의 수가 제한되어 있기 때문에 창의적이어야 합니다. 따라서 먼저 결과물이 어떻게 보여야 하는지 결정해봅시다.

소스 2에서 가져온 데이터를 소스 1의 데이터와 일치시키려고 합니다. 따라서 소스 2의 각 값에 대해 일치하는 값의 그룹이 있어야 하며, 일치 정도를 나타내는 점수도 있어야 합니다.

![image](/assets/img/2024-05-16-SQLServersSecretFeatureRunPythonandAdd-OnsNativelyInSQLServer_5.png)

작업을 단순화하기 위해 라이브러리를 가져오지 않고 내장된 python 라이브러리를 먼저 사용할 것입니다.

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

로직:

- 각 프로젝트를 반복
- 소스에 따라 자금을 포함한 테이블을 만듭니다. 여기서 소스 1은 매핑 데이터가 있는 큰 테이블이고, 2는 초기 회사 데이터 세트입니다.
- 작은 데이터 세트에서 데이터를 배열로 선택합니다.
- 결과 배열의 각 요소를 대형 매핑 데이터 프레임의 각 요소와 비교합니다.
- 각 엔터티의 점수를 반환합니다.

코드:

그리고 여기가 최종 결과입니다:

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

![table](/assets/img/2024-05-16-SQLServersSecretFeatureRunPythonandAdd-OnsNativelyInSQLServer_6.png)

이 테이블에서는 각 회사 이름, 해당 프로젝트, 그리고 소스(대형 매핑 테이블에서인지 소규모 회사 테이블에서인지)가 나열되어 있습니다. 오른쪽의 점수는 소스 2와 소스 1 사이의 회사 이름 유사성 메트릭을 나타냅니다. 소스 2에서 비롯된 company4는 항상 점수가 1인 100% 일치임을 유의하는 것이 중요합니다.

SQL Server 내에서 Machine Learning Services를 통해 Python 스크립트를 실행하는 것은 인-데이터베이스 분석 및 기계 학습 작업을 가능하게 하는 강력한 기능입니다. 이 통합은 데이터 이동이 필요 없이 직접적인 데이터 접근을 가능하게 하여 데이터 집중적 작업의 성능과 보안을 크게 최적화합니다.

그러나 주의해야 할 제한 사항이 있습니다. 이 환경은 하나의 입력을 지원하므로 SQL 컨텍스트 내에서 직접 수행될 수 있는 작업의 복잡성을 제한할 수 있습니다. 또한 기본 라이브러리에서 지원되지 않는 일부 유형의 데이터 분석이나 기계 학습 작업에 대한 대안 솔루션이 필요할 수 있습니다. 게다가 사용자들은 복잡한 Python 코드가 포함된 T-SQL 쿼리에서의 복잡한 간격과 같은 SQL Server 환경의 복잡성을 해결해야 하며, 이러한 것들은 오류와 혼란의 원인이 될 수 있습니다.

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

이러한 도전에도 불구하고, SQL Server에서 Python을 실행하는 것이 유리한 여러 응용 프로그램이 있습니다:

1. 데이터 정제 및 변환 — Python을 SQL Server에서 직접 사용하여 복잡한 데이터 전처리 작업을 수행할 수 있습니다. 예를 들어, 누락된 데이터를 처리하거나 값을 정규화하여 후속 분석이나 보고 전에.

2. 예측 분석 — SQL Server 내에서 Python 기계 학습 모델을 직접 배포하면 실시간 예측이 가능해집니다. 고객 이탈 또는 판매 예측과 같은 실시간 데이터베이스 데이터를 사용하는 예측이 가능합니다.

3. 고급 분석 — Python의 능력을 활용하여 데이터베이스에서 직접 고급 통계 분석과 데이터 마이닝을 수행할 수 있습니다. 이를 통해 데이터 전송 지연 없이 의사 결정 프로세스를 도와줍니다.

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

4. 자동 보고 및 시각화 — Python 스크립트는 SQL Server 데이터에서 직접 데이터 시각화와 보고서를 생성할 수 있어 자동 업데이트와 대시보드를 가능하게 합니다.

5. 머신 러닝 모델 운영화 — SQL Server에 Python을 통합함으로써, 모델을 데이터베이스 환경 내에서 직접 업데이트하고 관리할 수 있어 운영적 워크플로우를 간소화시킵니다.

마지막으로, Python이 SQL Server에서 실행되는 것은 일부 도전을 동반하지만, 데이터 처리, 분석 및 예측 모델링을 데이터베이스 환경 내에서 직접 향상시키고 간소화시키는 다양한 가능성을 열어줍니다.
