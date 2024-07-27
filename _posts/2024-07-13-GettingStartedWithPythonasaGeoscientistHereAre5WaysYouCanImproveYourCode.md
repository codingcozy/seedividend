---
title: "지구과학자를 위한 파이썬 시작 가이드 코드를 개선하는 5가지 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-GettingStartedWithPythonasaGeoscientistHereAre5WaysYouCanImproveYourCode_0.png"
date: 2024-07-13 20:31
ogImage: 
  url: /TIL/assets/img/2024-07-13-GettingStartedWithPythonasaGeoscientistHereAre5WaysYouCanImproveYourCode_0.png
tag: Tech
originalTitle: "Getting Started With Python as a Geoscientist? Here Are 5 Ways You Can Improve Your Code!"
link: "https://medium.com/towards-data-science/getting-started-with-python-as-a-geoscientist-here-are-5-ways-you-can-improve-your-code-82b42c21462b"
---


![Getting Started With Python as a Geoscientist](/TIL/assets/img/2024-07-13-GettingStartedWithPythonasaGeoscientistHereAre5WaysYouCanImproveYourCode_0.png)

여러 해 동안 지질 과학 및 암페트로물리컬 분야에서 다양한 Python 스크립트를 보고 작업해왔습니다. 그동안 다양한 코딩 스타일을 보았고(또는 작성한 적도 있습니다), 잘 구성된 코드에서 문서화가 잘 되어 있는 것부터 모든 내용이 하나의 Python 파일에 있고 거의 구조화되지 않은 것까지 다양합니다. 후자의 경우, 코드를 몇 달 후에 다시 살펴보면 유지, 디버그 및 이해가 어려울 수 있습니다. 적용된 스타일을 결정하는 요구 사항이 종종 코드 작성 목적을 결정합니다.

한 번 또는 두 번 사용될 수 있는 스크립트를 생성하거나 엄격한 시간 제약과 압박 하에 작업할 때는 원하는 만큼 아름답고 조직적으로 작성할 수 없을 수도 있습니다. 그러나 여러 차례 사용하거나 다른 사용자에게 배포하는 코드를 작성하거나 시간이 허락된다면 나중에 확장할 수 있는 방식으로 코드나 앱을 구조화하고 싶을 것입니다. 이렇게 하면 코드를 다시 확인할 때 시간과 머리 아픈 일을 절약할 수 있을 뿐만 아니라 코드가 무엇을 하는지 혹은 무엇을 하려고 했는지 잊는 딜레마를 피할 수도 있습니다.

지질 과학자로서 코딩이 자연스럽지 않을 수 있습니다. 그러나 동료나 친구들이 만들었거나 얘기하는 앱을 보고 시도해보기를 원하는 영향을 받았을 수 있습니다.

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

이 글에서는 몇 년 동안 배운 다섯 가지의 조언을 공유하려고 합니다. 이 조언들은 제 지구과학 Python 애플리케이션을 개선하는 데 도움이 되었고, 처음으로 Python과 머신러닝의 세계로 진입하는 사람들에게도 도움이 될 것입니다.

이 조언은 지구과학자가 아닌 누구에게나 동일하게 적용될 수 있으며, Python을 처음 배우기 시작하는 사람들에게 유용할 것입니다.

# 애플리케이션 폴더 구조 설정

Python 앱을 처음 만들 때 코드를 하나의 폴더에 모두 보관하는 것이 편리하고 쉬울 수 있습니다. 그러나 프로젝트가 성장하고 복잡해지면 코드 베이스를 유지하고 탐색하기가 어려워질 수 있습니다.

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

이 작업을 손쉽게 정리하는 방법은 효과적인 폴더 구조를 만드는 것입니다. 프로젝트가 작은 경우라도 데이터 파일과 출력 또는 임시 파일을 각각의 폴더로 분리하는 것이 유용합니다.

예를 들어, 다음 구조는 데이터 처리, 시각화 및 분석을 위한 특정 기능이 분리된 폴더 집합을 유지합니다. 이를 통해 특정 기능을 자체 파일 내에 저장할 수 있습니다. 이러한 기능들은 main.py 파일에서 필요할 때마다 호출할 수 있습니다.

또한, 데이터 파일은 데이터 하위 디렉토리에 배치할 수 있습니다.


# 간단한 프로젝트 구조 예시
your_project/
├── data_processing/
│   └── data_cleaner.py
├── visualisation/
│   └── plotter.py
├── analysis/
│   └── statistical_model.py
├── data/
│   └── raw_data.csv
└── main.py


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

만약 라이브러리나 플랫폼 전용 어플리케이션(예: Dash)을 개발 중이라면 Cookiecutter와 같은 프레임워크를 살펴볼 가치가 있습니다. 이를 사용하면 여러 미리 정의된 템플릿을 통해 프로젝트 구조를 매우 빠르게 설정할 수 있습니다.

마지막으로, 여러 어플리케이션에서 코드를 재사용할 계획이라면 해당 기능 및 클래스를 저장할 파이썬 라이브러리를 작성하는 것도 고려해보세요.

# 함수와 클래스를 사용하여 재사용 가능한 코드 만들기

Python(또는 다른 어떤 프로그래밍 언어에서도) 작업할 때, 깔끔하고 효율적인 코드를 만드는 관행을 따르는 것은 좋은 습관입니다. 특히 어플리케이션이 점점 커지는 경우에는 더욱 중요합니다. 이를 통해 코드를 쉽게 재사용하고 유지보수하기 쉽게하며 가독성을 높이고 (그 외 여러 가지 이점도 포함하여) 향상시킬 수 있습니다.

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

함수와 클래스를 통해 코드를 구성하고 기능을 분리하여 반복되는 코드를 줄일 수 있습니다.

## 모듈화된 코드를 위한 함수

함수를 사용하면 호출될 때 실행할 수 있는 코드를 캡슐화할 수 있습니다. 함수에 매개변수를 전달할 수 있으며, 결과를 반환할 수 있습니다.

Python에서 함수를 만들려면 def 키워드를 사용하고, 함수의 이름을 작성한 후, 마지막으로 사용할 매개변수/인수를 지정하면 됩니다.

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

예를 들어, 아래 함수는 대용량 밀도 층의 측정값을 바탕으로 밀도 퇴적률을 계산합니다. 이 함수는 세 개의 매개변수( rho_matrix, rho_bulk 및 rho_fluid )를 입력으로 받아 계산을 수행하고 퇴적률 값을 반환합니다.

```js
def calculate_density_porosity(rho_matrix, rho_bulk, rho_fluid):

    return (rho_matrix - rho_bulk) / (rho_matrix - rho_fluid)
```

## 복잡한 데이터 구조를 다루는 클래스

애플리케이션이 커지거나 복잡한 데이터 구조를 처리해야 하는 경우에는 클래스를 고려할 만한 유용한 도구가 될 수 있습니다.

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

파이썬에서 클래스는 객체(블루프린트와 유사한 것)를 생성하고 객체의 동작 방식을 정의하는 데 사용됩니다. 이는 상태(멤버 변수)의 초기 값과 동작(멤버 함수 또는 메소드의 구현)을 제공함으로써 이루어집니다.

## 재사용 가능한 코드를 위한 최상의 관행

여러분의 애플리케이션에서 재사용 가능한 코드를 만들 때 몇 가지 최상의 관행을 소개합니다.

- 단일 책임 원칙: 각 함수 또는 클래스는 단일 책임 또는 목적을 가져야 합니다. 이렇게 하면 코드가 테스트와 유지보수가 더 쉬워집니다.
- 명확한 명명: 함수나 클래스를 생성할 때 명확한 이름을 가져야 합니다. 이 이름은 그들이 무엇을 하는지 또는 무엇을 나타내는지 명확히 보여주어야 합니다. 명명 규칙에 대한 pep-8 가이드라인을 참고하세요.
- 문서화: 함수와 클래스의 목적과 사용법을 문서화하기 위해 독스트링을 사용하고 최소한의 계산 또는 방법론 출처에 대한 참조를 포함하세요. 이것은 특히 지구과학 분야에서 함수가 복잡한 계산을 수행하는 데 사용될 때 특히 중요합니다. 문서화는 블록 주석, 인라인 주석 및 문서화 문자열을 포함할 수 있습니다. 자세한 내용은 pep- 지침을 확인하세요.
- 모듈화된 디자인: 각 부분(함수 또는 클래스)이 개별적으로 테스트 및 사용될 수 있도록 코드를 설계해야 합니다. 이로 인해 한 두 줄짜리 함수가 나올 수도 있지만 이는 더 큰 코드 조각에 감춰진 코드를 가지는 것보다 낫습니다.

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

# 코드에 문서 추가하기

![Python 개발자로 시작하는 방법: 지질학자로 시작하기](/TIL/assets/img/2024-07-13-GettingStartedWithPythonasaGeoscientistHereAre5WaysYouCanImproveYourCode_1.png)

스크립트, 함수 또는 클래스를 작성할 때 문서화가 중요합니다. 코드 내에 주석과 문서화 문자열(docstrings)을 작성하면 몇 달 후에 애플리케이션을 다시 방문했을 때 머리 아픔을 예방하는 데 큰 도움이 될 수 있습니다. 또한, 다른 사람들이 코드를 살펴보는 경우에도 코드를 이해하는 데 도움이 될 수 있습니다.

문서화를 통해 코드의 가독성을 개선하는 세 가지 간단한 방법이 있습니다:

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

주석은 코드 섹션 뒤에 있는 아이디어를 설명하거나 복잡한 논리를 분해하거나 코드에 대한 컨텍스트를 제공하는 데 사용됩니다. 주석을 추가하는 아이디어는 코드가 어떻게 작동하는지 설명하는 것이 아니라 코드와 논리 뒤에 있는 '왜'를 설명하는 것입니다.

도움말 문자열은 함수나 클래스가 무엇을 하는지와 함수나 클래스가 요구하는 매개변수가 무엇인지 설명하는 데 사용됩니다. 이는 코드를 사용하는 사람에게 매우 유용합니다.

타입 힌팅은 사용자가 코드를 더 잘 이해할 수 있게 합니다. 이는 주어진 함수나 클래스의 각 매개변수에 대한 데이터 유형이 무엇인지 사용자에게 알려줌으로써 그렇게 합니다.

이전에 본 예제에서는 도움말 문자열을 추가하여 문서를 확장했습니다. 이로써 함수가 무엇을 하는지, 예상되는 각 매개변수가 무엇인지, 예상하는 데이터 유형이 무엇인지 설명합니다.

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

```js
def calculate_density_porosity(rho_matrix: float, rho_bulk: float, rho_fluid: float) -> float:
    """
    Calculates porosity based on bulk density measurements.

    Parameters:
      rho_matrix (float): The rock matrix density.
      rho_bulk (float): The bulk density value.
      rho_fluid (float): The fluid density.
    
    Returns:
      float: The calculated density porosity.
    """
    return (rho_matrix - rho_bulk) / (rho_matrix - rho_fluid)
```

Python 코드에서 문서화를 개선하는 방법에 대해 더 알아보려면 아래 동영상을 확인해보세요. 코드 문서화에 대해 더 자세히 다루었습니다:

또는 다음 매체 기사를 확인할 수도 있습니다.

# 버전 관리


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

지구과학자로서 학업 과정에서 여러 버전의 에세이 및 논문을 저장하고 dissertation_version1.docx, dissertation_final.docx 또는 dissertation_final_final.docx와 같은 파일 이름을 만드는 데 익숙할 것으로 확신합니다. 이렇게 하면 매우 혼란스러워지고 나중에 파일을 다시 확인할 때 어떤 것이 진정 최종 버전인지 제대로 추적할 수 없게 됩니다.

Git 또는 GitHub와 같은 온라인 시스템과 같은 시스템을 도입하면 미친 듯한 이름의 여러 파일을 만들지 않고도 다른 버전을 추적할 수 있습니다.

또한 프로젝트 작업 중에 만든 변경 사항을 추적하고 싶을 수 있습니다. 이렇게 하면 이전에 작동했던 함수인데도 변경으로 인해 작동이 멈춘 경우 이전에 작동했던 코드로 롤백할 수 있는 가능성이 있습니다.

버전 관리를 도입하면 다음과 같은 작업을 수행할 수 있습니다:

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

- 시간이 지남에 따라 변경 사항을 추적할 수 있습니다.
- 다른 사람과 효과적으로 협력할 수 있습니다.
- 기존 코드를 망가뜨리지 않고 실험할 수 있습니다.
- 그리고 더 많은 기능들

버전 관리의 개념을 이해하고 탐구하기 위한 좋은 안내서를 확인해보세요:

# 작업하는 동안 테스트 생성하기

코드나 애플리케이션을 개발할 때 함수를 수정하는 경우 특히 예상대로 작동하는지 확인해야 합니다.

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

함수를 변경하거나 이에 의존하는 기타 함수들에 대한 어떠한 변경이든 안정성을 확인하는 한 가지 방법은 해당 코드 주변에 테스트를 작성하는 것입니다.

PyTest나 unittest와 같은 여러 Python 테스팅 프레임워크를 사용하면 쉽게 사용할 수 있으며 연속적인 통합 워크플로의 일부로서 자동화할 수도 있습니다.

예를 들어, 아래 코드는 unittest를 사용하고 이전에 본 포로시티 방정식을 감싸는 예시입니다.

```python
import unittest
from your_project.geoscience_calculations import calculate_density_porosity

class TestDensityPorosityCalculation(unittest.TestCase):
    def test_calculate_density_porosity(self):
        self.assertAlmostEqual(calculate_density_porosity(2.65, 2.0, 1.0), 0.39)

if __name__ == '__main__':
    unittest.main()
```

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

이 테스트는 calculate_density_porosity 함수가 rho_matrix, rho_bulk, rho_fluid에 대한 특정 값이 주어졌을 때 밀도 산소포도를 올바르게 계산하는지 확인합니다.

그런 다음 assertAlmostEqual 메서드를 사용하여 예상 값이 반환된 값과 근사하게 일치하는지 확인합니다. 부동 소수점 숫자의 특성 때문에 정확한 동일성을 항상 보장할 수 없을 수 있기 때문입니다.

테스팅에 대해 더 알아보려면 다음 기사를 확인해보세요:

# Summary

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

지구과학자로서, Python에 익숙하지 않을 수도 있고, 경력이나 학업 중에 가볍게 다뤄본 적이 있을 수도 있습니다. 하지만 애플리케이션을 개발하는 데 더 능숙해지고 싶어하는 경우에 이 다섯 가지 팁이 도움이 될 것입니다.

파이썬 코딩을 배우는 초기 단계에 있을 때나 현재 기술과 지식을 확장할 때에는 코드가 적절히 문서화되어 있고, 주변에는 테스트가 작성되어 있으며, 조직화된 구조 내에 포함되어 있는지 확인하는 것이 중요합니다. 코드의 규모와 복잡성이 증가할 때, 이후에 발생할 수 있는 시간 손실과 머리 아픔을 줄일 수 있습니다. 버전 관리를 사용하여 모든 변경 사항을 추적하고 친구나 동료들과 쉽게 협업할 수 있도록 할 수 있습니다.

읽어 주셔서 감사합니다. 이 글을 마치시기 전에 꼭 저의 콘텐츠를 구독하고 제 글을 이메일로 받아보세요. 이 곳에서 확인하실 수 있습니다! 또한, 이 콘텐츠를 즐기셨다면 감사의 표시로 몇 번 클랩을 눌러주시면 감사하겠습니다.