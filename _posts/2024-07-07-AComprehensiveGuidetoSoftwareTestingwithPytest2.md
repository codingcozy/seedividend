---
title: "Pytest로 소프트웨어 테스트하는 종합 가이드 2"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-AComprehensiveGuidetoSoftwareTestingwithPytest2_0.png"
date: 2024-07-07 19:17
ogImage:
  url: /assets/img/2024-07-07-AComprehensiveGuidetoSoftwareTestingwithPytest2_0.png
tag: Tech
originalTitle: "A Comprehensive Guide to Software Testing with Pytest #2"
link: "https://medium.com/@rockeyrockssandeep1994/a-comprehensive-guide-to-software-testing-with-pytest-2-e0e59fdf1933"
---

<img src="/TIL/assets/img/2024-07-07-AComprehensiveGuidetoSoftwareTestingwithPytest2_0.png" />

두 번째 부분에서는 소프트웨어 테스트의 원칙과 실천 방법에 대해 이야기하겠습니다. 또한 "pytest가 이러한 원칙과 실천 방법을 구현하는 데 어떻게 도움이 되는지"에 대한 질문에 대답할 것입니다.

이전 게시물인 Pytest를 사용한 소프트웨어 테스트의 포괄적인 가이드 #1에서 이미 설명한 내용인데, 이것은 향후 테스트 구현 및 전략을 위한 중요한 기반 요소로 생각합니다. 이미 1부 게시물을 읽었다면 이 내용은 건너뛰셔도 됩니다.

# 소프트웨어 테스트의 필요성은 무엇인가요?

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 소프트웨어 요구 사항 충족을 보장합니다.
- 올바른 구성을 확인합니다.
- 버그를 일찍 발견합니다.

## 초기 테스트의 중요성

- 시간 절약: 디버깅 및 재작업을 줄입니다.
- 즉각적인 피드백: 빠르게 문제를 식별하고 해결합니다.
- 생산성 향상: 집중된 개발을 장려합니다.
- 주요 문제 예방: 안정성과 자신감을 보장합니다.

## 소프트웨어 테스트 수명 주기 (STLC)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 요구 사항 분석: 요구 사항 명확화.
- 테스트 계획: 목표, 범위, 및 자원 정의.
- 테스트 케이스 설계: 자세한 테스트 케이스 작성.
- 테스트 환경 설정: 환경 준비 및 테스트.
- 테스트 실행: 테스트 실행, 결함 기록, 및 재테스트.
- 테스트 마감: 테스트 완료, 서명 확인.

## 소프트웨어 테스팅 유형

- 기능 테스팅: 단위, 통합, 시스템, 회귀, 상호작용, 스모크, 및 수용 테스팅.
- 비기능 테스팅: 성능, 로드, 스트레스, UI, 보안, 사용성, 및 호환성 테스팅.

## 다양한 관행 및 개발자의 마인드셋

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

실무에서 테스트 코드를 작성할 때 아래의 사고/실천 프레임워크 중 하나 이상을 반드시 사용한다는 것을 발견했습니다, 특히 CI/CD 부분에서!

- 테스트 주도 개발 (TDD):

- TDD는 코드 작성 전에 테스트 코드를 작성하는 소프트웨어 개발 접근 방식입니다. 이 방법은 코드베이스가 지속적으로 테스트되도록 보장합니다. 이 과정은 실패하는 테스트를 작성하고, 테스트를 통과시키는 코드를 작성하고, 코드를 개선하기 위해 코드를 리팩터링하는 주기를 따릅니다. 이 접근 방식은 작은 증분적인 단계에 집중함으로써 코드 품질과 디자인을 향상시키는 데 기여한다.

2. 행위 주도 개발 (BDD):

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- BDD는 테스트를 소프트웨어의 예상 동작을 설명하는 방식으로 작성하며, 자연어 구조를 사용하는 경우가 많습니다. 이를 통해 테스트가 비기술 관계자에게 더 잘 이해되어 개발자, 테스터 및 비즈니스 분석가 간의 협력을 촉진합니다.

3. 지속적 통합 (CI):

- CI는 코드 변경을 자주 공유 저장소에 통합한 후 자동 빌드 및 테스트를 수행하는 실천입니다. 이 실천은 개발 주기 초기에 문제를 감지하고 해결하는 데 도움을 주며, 소프트웨어 업데이트를 제공하는 데 걸리는 시간을 줄이고 품질을 향상시킵니다.

4. 지속적 배포 (CD):

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- CD는 자동화된 테스트를 통과하자마자 코드를 프로덕션 환경에 자동으로 배포하여 CI를 확장합니다. 이 실천 방법은 새로운 기능 및 수정 사항이 빠르고 일관되게 사용자에게 제공되도록 보장하며, 수동 개입을 최소화하고 배포 문제의 위험을 줄입니다.

# 그러니까, 테스트 케이스를 설계할 때 주의할 점은 무엇일까요?

여기서, 이론을 일부 실용적인 코드 조각과 함께 보충하는 것이 좋을 것 같았습니다. 나중에 이 시리즈의 블로그에서 pytest에 대한 깊이 있는 소개와 설명을 작성할 예정입니다.

## 테스트를 위한 최상의 실첵

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 명확하고 간결한 테스트 작성하기:

- 각 테스트가 이해하기 쉽고 단일 기능에 집중되도록 보장합니다.
- 예시: 이름대로, 두 숫자를 더하고 싶다면 해당 함수에 그 역할을 부여하는 것이 좋습니다.

```js
def test_addition_function_adds_two_numbers_correctly():
    assert addition(2, 3) == 5
```

2. 테스트 격리:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 테스트들은 서로에게 의존하지 않도록 해야합니다. 그렇지 않으면 잘못된 양성 또는 음성 결과가 발생할 수 있습니다.
- 예시: 각 테스트는 자체 환경을 설정하고 해체해야 합니다. 즉, 각 데이터는 자체 데이터 입력 설정(예를 들어 fixtures를 통해)과 데이터 정리(해체) 로직을 가져야 합니다.

```python
import pytest
@pytest.fixture
def setup_environment():
    # 설정 코드
    yield
    # 해체 코드
def test_example(setup_environment):
    assert example_function() == expected_result
```

3. 설명적인 이름 사용하기:

- 테스트 함수에 설명적인 이름을 지어서 무엇이 테스트되고 있는지 명확하게 표현하세요.
- 예시: 만약 두 숫자를 더하는 test_function이라는 함수가 있다면, test_function 대신 test_addition_function_adds_two_numbers_correctly와 같이 명확한 이름을 사용하세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

def test_addition_function_adds_two_numbers_correctly():
assert addition(2, 3) == 5

4. 자동화 테스트:

- CI/CD 파이프라인에 테스트를 통합하여 각 코드 변경마다 자동으로 실행되도록 합니다.
- 예시: Jenkins, Travis CI 또는 GitHub Actions를 사용하여 테스트 실행을 자동화합니다.
- Pytest는 CI/CD 파이프라인에 쉽게 통합할 수 있습니다. 프로젝트에 구성 파일을 추가하여 테스트를 자동 실행합니다.
- 예시: GitHub Actions를 위한 .github/workflows/python-app.yml을 사용합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

5. 테스트 검토 및 리팩터링:

- 효율성과 효과를 향상시키기 위해 정기적으로 테스트를 검토합니다.
- 예시: 중복되는 테스트를 제거하고 오래된 테스트를 업데이트하며, 모든 예외 케이스를 커버합니다.
- 코드 커버리지 보고서를 생성하기 위해 pytest-cov와 같은 Pytest 플러그인을 사용하고, pytest-xdist를 사용하여 병렬 테스트를 실행합니다.

```bash
pip install pytest-cov pytest-xdist
pytest --cov=my_package --cov-report=html
pytest -n 4  # 4개의 코어를 사용하여 테스트를 병렬로 실행합니다
```

# 참고 문헌

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Agile Alliance. "테스트 주도 개발(TDD)란 무엇인가요?" Agile Alliance
- BrowserStack. "테스트 주도 개발(TDD)란 무엇인가요?" BrowserStack
- Wikipedia. "테스트 주도 개발" Wikipedia
- Built In. "테스트 주도 개발(TDD)란 무엇인가요? 안내." Built In
- Agile Alliance. "행위 주도 개발(BDD)란 무엇인가요?" Agile Alliance
- Wikipedia. "행위 주도 개발" Wikipedia
- LambdaTest. "행위 주도 개발(BDD)란 무엇인가요? 전체 가이드." LambdaTest
- BrowserStack. "BDD가 뭔가요? (행위 주도 개발)" BrowserStack
