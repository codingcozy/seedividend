---
title: "Python 코드 가독성을 높이는 어노테이션 사용법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_0.png"
date: 2024-07-09 19:05
ogImage:
  url: /assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_0.png
tag: Tech
originalTitle: "Enhancing Readability of Python Code via Annotations"
link: "https://medium.com/towards-data-science/enhancing-readability-of-python-code-via-annotations-09ce4c9b3729"
---

## 파이썬 프로그래밍

![Python Image](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_0.png)

코드의 명확성은 덕목이자 필수불가결한 것입니다. 코드를 명확하고 가독성 있게 작성한다면, 다른 개발자가 이해할 수 있고, 사용자들도 어떻게 사용해야 하는지 이해할 수 있으며, 미래의 여러분도 시간이 흐르면서 구현한 코드의 세부사항을 대부분 잊어버릴텐데, 그때에도 그 코드를 감사히 여기게 될 것입니다. 프로젝트와 코드베이스의 규모가 커질수록 코드의 명확성은 더욱 중요해집니다.

프로그래밍 언어 중에서 파이썬은 매우 가독성이 좋은 코드를 제공합니다. 아니, 오히려 매우 가독성이 좋은 코드를 제공할 수 있는데, 이를 가독성 좋은 코드로 만드는 방법을 알아야 합니다. 저는 파이썬이 매우 인기를 얻은 이유 중 하나가 코드의 가독성 때문이라고도 말씀드릴 수 있습니다. 그래서 우리는 좋은 파이썬 코드를 작성하는 책임이 있습니다. 이를 위해 우리는 도구가 필요합니다.

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

파이썬 코드 품질을 향상시키는 도구가 많이 있어요. 먼저, 좋은 파이썬 코드의 표준을 충족시키는 코드를 작성해야 해요. 이러한 표준은 PEP 8에서 제공돼요.

많은 내용을 학습하고 수많은 규칙이 있지만 걱정하지 마세요: 하나씩 차근차근 배우다 보면 언젠가는 대부분의 규칙을 따르게 될 거예요. 얼마 지나지 않아 PEP 8을 다시 참고할 필요 없이 제시된 표준을 사용할 수 있을 거예요. 좋은, 관습적인 파이썬 코드를 작성하는 방법을 자연스럽게 습득하게 될 거예요.

코드 가독성을 높이는 스타일 가이드만 있는 게 아니에요. 오늘은 다른 도구, 즉 코드 어노테이션에 대해 이야기해보려고 해요. 개발 중인 코드의 가독성을 향상시키는 도구임을 기억하세요. 어노테이션은 대문자로 작성된 구문으로, 코드 개발자나 유지 관리자, 덜 자주이지만 사용자에게 주의를 기울일 필요가 있음을 알려주는 표현이에요.

가장 흔한 예로는 TODO, NOTE, FIXME, BUG 및 REVIEW가 있어요. 더 많은 어노테이션이 있고, 필요하다면 사용자 정의 어노테이션도 만들 수 있어요.

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

간략히 말하자면, 코드 주석은 단순한 코멘트 이상입니다. 이들은 코드의 주목이나 개선을 필요로 하는 부분을 강조하는 표준화된 방법입니다.

Visual Studio Code (VSC)와 같은 고급 통합 개발 환경(IDE)에서 작업할 때, 주석은 코딩을 크게 향상시킬 수 있습니다. 이것들은 코드 실행 방식을 변경하는 것이 아니라 코드와 상호 작용하는 방식을 변경해서 개발 과정을 원활하게 돕습니다.

저는 VSC 사용자입니다. 만약 당신도 VSC를 사용한다면, TODO Highlight 확장 프로그램(현재 TODO Highlight v2도 사용 가능)을 설치하여 주석을 강조할 수 있습니다. 이를 통해 주석을 놓치기 어려울 정도로 강조해줍니다. 이 글에서는 조금 후에 이 확장 프로그램을 사용하는 방법에 대해 논의할 것입니다. VSC를 사용하지 않는다면, 당신이 사용하는 IDE나 편집기가 주석 강조 기능을 제공하는지 확인해보세요. 그렇지 않더라도 주석을 사용할 수 있습니다. 강조 기능 없이는 약간 덜 눈에 띌 수 있겠지만, 그럼에도 불구하고 코드 품질 및 팀 간 소통을 개선하는 강력한 도구로 남아 있을 것입니다.

이 글은 Python 개발에서 코드 주석의 유용성을 탐구합니다. 또한 Visual Studio Code에서의 주석 강조 기능이 어떻게 작동하는지 보여드리겠습니다.

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

# 주석

파이썬에서 "주석(Annotation)"과 "주석 처리(Annotate)"라는 용어는 두 가지 다른 의미를 가질 수 있습니다. 첫째로, 파이썬 함수에 주석 처리하는 것은 주로 해당 함수에 타입 힌트(Type hints)를 추가하는 것을 의미합니다. 따라서 함수의 주석은 타입 힌트를 추가한 시그니처로 구성됩니다.

본 문서에서는 다른 의미, 즉 코드에 대한 중요한 측면을 가리키는 대문자로 된 단어를 추가하여 코드에 주석을 다는 것에 대해 논의하고 있습니다.

이 부분이 혼란스러울 수 있습니다. 예를 들어, "foo() 함수에 주석 처리를 추가해주세요." 라는 문장은 두 가지 의미를 가질 수 있습니다:

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

- foo() 함수에 타입 힌트를 추가해주세요. 이 문장의 전형적인 의미입니다.
- foo() 함수에 주석을 추가해주세요. 혼동을 줄일 수 있으므로, “foo() 함수의 독스트링이나 코드에 이런-저런 주석을 추가해주세요”와 같이 다른 표현을 사용하는 것이 좋습니다.

따라서 항상 "annotation(주석)"과 "annotate(주석을 추가하다)"이라는 단어를 사용하여 의미를 명확히 해주세요.

## 주석의 종류

저는 두 종류의 주석을 사용합니다:

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

- 프로그래밍에서 일반적으로 사용되는 주석들; 이것들을 훨씬 더 자주 사용해요.
- 특정 코드 조각을 주석 처리하는 데 개인적인 필요성을 반영한 사용자 정의 주석; 절약해서 사용합니다.

이러한 전형적인 코드 주석들은 다음과 같습니다:

- TODO: 구현해야 할 작업, 개선사항 또는 특징을 나타냅니다. 가장 일반적으로 사용되는 주석 중 하나이며 아마도 가장 자주 사용됩니다.
- NOTE: 모듈, 클래스, 메소드 또는 함수(문서 문자열에 있는 경우)에 대한 중요한 정보를 강조하는 데 사용됩니다. 내장 주석으로 사용될 경우에는 해당 코드 조각 앞에 배치되며, 구현, 사용 또는 컨텍스트와 관련된 것일 수 있습니다. 개발자가 알아야 할 사항입니다.
- BUG: 코드 내의 버그를 표시합니다. 버그에 대한 설명과 기타 중요한 정보와 함께 제공해야 합니다. 알고 있는 특정 버그일 수도 있고, 알 수 없는 버그가 있는 코드 조각의 표시일 수도 있습니다.
- FIXME: 수정해야 하는 코드 내의 문제점을 표시합니다. 그러나 BUG와는 다릅니다. BUG는 코드에서 실제로 실수를 나타내는 반면, FIXME는 단순한 버그가 아닌 문제점을 나타내며, 쓸데없거나 비효율적인 구현, 비즈니스 로직의 잘못된 구현, 불분명한 코드와 관려될 수 있습니다.
- REVIEW: 리뷰어가 특정 코드 조각에 주의를 기울여야 함을 알리는 신호를 보냅니다. 따라서 맥락을 명확히 설명해야 합니다.

이외에도 가끔씩 두 가지 사용자 정의 코드 주석을 사용하는 것을 좋아해요:

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

- 이것을 생각해보세요: 이것은 깊이 있는 사고를 필요로 하는 코드 조각이나 아이디어(문서 문자열에 위치한 경우)를 나타냅니다. 주로 기술적인 측면이 아니라 비즈니스 로직과 관련이 있는 경우가 많습니다.
- 재고를 위해 다시 고려해보세요: 재고가 필요한 코드 조각을 나타냅니다. 설명 없이는 혼란스럽기 때문에 이유나 아이디어를 제공해야 합니다.

당신이 지켜야 할 규칙은 주석을 명확하게 설명하는 것입니다. RECONSIDER로 설명된 것처럼, 설명이 없는 주석은 혼란스러울 수 있습니다. 이 설명은 간결하고 명확해야 합니다. 주석은 확실히 자세한 논의를 위한 도구로 사용되어서는 안 됩니다.

우리는 종종 TODO가 주석이라고 말하지만, 사실 주석은 TODO와 같이 설명이 있는 주석 태그입니다.

## 주석은 누구에게 주로 작성되나요?

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

의도된 수신자별로 주석을 그룹화할 수도 있습니다. 다음 수신자에게 주석을 지정할 수 있습니다:

- 개발자: 주석의 가장 일반적인 사용은 개발 중에 코드의 중요한 측면을 개발팀에 알리는 데 사용됩니다.
- 코드 사용자: 덜 흔한 사용 사례입니다. 이러한 주석은 사용자들에게 사용 중요 사항을 알리는 데 사용됩니다. 예를 들어, 폐기 예정, 동작 변경, 함수가 구현하는 로직에 대한 중요한 정보 등입니다. 개발자를 위한 주석과는 다른 종류의 정보를 전달합니다. 이러한 주석은 코드가 아닌 문서에 위치합니다.
- 유지관리자: 가장 흔하지 않은 주석 유형이며, 신중하게 사용해야 합니다. 코드 기반이 생산 환경에 있고 코드가 사용자에게 사용되는 경우, 사용자는 코드 설명서에 이러한 주석을 보게 되면 혼란스러울 수 있습니다. 따라서 코드 유지자를 위해 주석을 사용해야 하는 경우 사용자를 대상으로 한 문서(예: docstrings)에 하지 마십시오. 필요 시 인라인 주석이나 유지 문서에 사용하십시오.

이 세 가지 유형의 주석을 세밀하게 일치시킬 수는 없습니다. 개발자, 유지관리자 및 사용자를 위해 주석에 NOTE를 사용할 수는 있지만, FIXME 주석은 코드 사용자를 대상으로 지정하지 않습니다.

중요한 점은 코드에 주석을 달 때 주석 대상이 누구인지 항상 염두에 두는 것입니다. 주석 태그 자체로는 이를 달성하는 데 충분하지 않습니다: NOTE 주석 태그를 보더라도 해당 주석이 어디로 지정된 것인지 알 수 없습니다. 주석의 설명이 맥락을 설명합니다.

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

이게 혼란스러울 수 있다는 걸 알아요. 이렇게 해보는 건 어떨까요? 예를 들어 주석 태그들을 구별해서 세 가지 유형의 주석들을 구분하는 방법을 시도해 볼 수도 있어요. 그러나, 그렇게 하면 주석이 더 길어져서 가독성이 떨어질 수도 있어요. 이와 관련된 시도나 비슷한 작업을 한 사례에 대해 알고 있지는 않아요.

그래서 코드 주석을 추가할 때는 가능한 한 명확하게 작성해 보세요. 또한, 누구를 위해 코드를 주석 처리하는지 명확히 하는 것도 중요하답니다.

## 주석은 무엇을 위해 사용되나요?

저는 주석의 목적을 세 가지로 간주해요:

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

- 팀 의사 소통을 증진시킵니다. 코드에 주석을 추가하면 다른 개발자들에게 무언가 일어나고 있는지 알릴 수 있습니다. 예를 들어, 다음 작업이나 릴리스에서 무언가를 할 예정이라고 알릴 수 있습니다 (TODO). 그렇게 하면 코드 리뷰어들은 왜 이 작업을 하지 않았는지 궁금해하지 않아도 되며 코드에서 직접 이 정보를 알 수 있습니다 (또 다른 접근 방법은 풀 리퀘스트에 이를 작성하는 것이지만, 흥미롭게도 많은 리뷰어들은 이것을 읽지 않습니다...).
- 주석을 사용하는 것은 개발자들을 위한 기억 기법(mnemonic technique)입니다. 주석은 기억 기호로 작동하며 코드의 특정 부분을 강조하는 것을 넘어서 개발자들이 빠르게 문제를 식별하고 기억하며 미래 고려를 위해 해당 영역으로 이동하는 데 도움을 줍니다. 주석은 쉽게 발견하기 쉽고 IDE나 편집기의 텍스트 검색 도구를 사용하여 쉽게 찾을 수 있습니다.
- 의논을 위한 장소를 제공합니다. 코드는 그 복잡성을 논의하기에 좋은 장소가 거의 없지만, 코드에 주석을 달고 의문점에 대해 논의하면 이는 유용한 도구로 변합니다. 그러나 이러한 논의를 최대한 간결하게 유지하도록 기억하세요.

이 세 가지 목적 중 첫 번째는 팀워크를 나타내며 두 번째는 주석이 혼자 작업할 때에도 사용될 수 있다는 것을 보여줍니다. 저도 그렇게 사용하고 있으며, 무엇을 해야 하는지 (TODO) 상기시키는 데 훌륭한 도구로 생각하며 코드의 중요한 측면을 논의하는 데 좋은 도구라고 생각합니다 (예: NOTE, FIXME, RECONSIDER, 그리고 문제에 따라 다른 어노테이션도 있음).

팀에 속해 있을 때, 주석은 코드뿐만 아니라 문서에서도 무언가를 가리키는 가장 효율적인 방법일 수 있습니다. 물론, 개발자들과의 직접적인 의사 소통, 저장소에 코멘트 남기기 등 다른 도구들을 사용할 수 있습니다. 그러나 주석처럼 효율적이지 않을 때가 더 많습니다. 주석은 바로 그 곳에 있어야 하며 따라서 간과하기 어려운 이러한 위치에 있습니다.

## 주석은 얼마나 길어야 할까요?

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

주석은 가능한 한 짧게 작성하여 메시지를 전달해야 합니다. 이 규칙을 어길 경우가 있지만, 주로 그렇습니다.

주석이 너무 길어지면 주석답지 않게 보일 수 있습니다. 독자들이 혼란스러워하거나 주석을 읽고 있는지조차 잊을 수도 있습니다.

그러므로 주석은 짧을수록 좋습니다. 문장 단편은 허용되지만, 일반적으로 전체 문장을 사용하면 이해가 높아집니다.

## 주석이란 무엇을 의미하는가?

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

코드에서 어노테이션을 많이 볼 때 — 특히 그 양이 많을 때 — 대부분 코드가 개발 중에 있는 것을 의미합니다. 이것은 어노테이션이 주로 개발 도구이기 때문입니다.

물론 예외도 있습니다. 때로는 코드 유지보수자들이 사용하는 어노테이션을 발견할 수도 있어요. 그래서 그 존재가 여전히 코드가 개발 중에 있다는 것을 의미할 필요는 없습니다. 또한 미래 릴리스에 대한 경고나 코드 동작 변경과 관련된 어노테이션을 코드 사용자를 위해 볼 수도 있습니다.

그러나 프로덕션 코드에서 어노테이션을 과도하게 사용하는 것은 좋은 습관이 아닙니다. 중요한 정보를 전달하는 몇 개의 어노테이션은 괜찮지만, 모든 다른 함수나 클래스 메서드마다 어노테이션을 보게 되는 프로덕션 코드는 좋지 않아요. 프로덕션 코드에 어노테이션으로 가득 찬 것을 볼 때는, 신중한 결정이었는지 여부와는 상관없이 애플리케이션이 미성숙하게 배포된 것 같은 느낌을 받아요.

## 어노테이션을 사용하는 곳?

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

코드 주석은 코드에 직접 추가되기 때문에 눈에 띄기 어려워요. 게다가 IDE 하이라이터를 사용하면 주석이 더욱 더 눈에 띌 수도 있어요. BUG와 같은 주석은 그렇게 되어야 해요; 코드에 버그가 있다는 사실을 크게 알고 싶어하는 거니까요. 이것은 곧 예시로 보여줄게요.

저는 네 곳에 주석을 사용해요:

- 모듈 독스트링: 모듈 독스트링에는 주로 TODO를 사용하지만, NOTE도 사용해요. 모듈 독스트링은 버그를 주석으로 처리하거나 특정 함수에서 무엇이 잘못되었는지 설명하는 곳이 아니에요. 그래서 모듈 독스트링에 주석을 달 일은 상대적으로 적어요. 달게 되면 보통 모듈 독스트링 끝에 주석을 달아요만, 이것이 규칙은 아니에요.
- 클래스/메서드/함수 독스트링: 이것은 인라인 주석(아래 설명될)과 함께 가장 일반적인 주석 위치 중 하나에요. 클래스/메서드/함수 수준의 모든 주석을 작성할 수 있는 전형적인 위치에요. 함수가 비즈니스 로직을 잘못 구현했을 수도, 성능을 높일 수도, 병목이 될 수도, 어딘가에 버그가 있지만 어디에 있는지는 확인되지 않았을 수도 있는 경우에 이 위치가 가장 좋아요. 주석이 메서드/함수 코드를 참조할 때, 주로 해당 독스트링 끝에 두곤 해요. 다시 말하지만, 이것이 규칙은 아니에요: 주석이 독스트링이 전달하는 내용을 참조할 때는 때로는 독스트링 내부에 더 잘 맞을 수 있어요.
- 인라인 주석: 위에서 언급한 클래스/메서드/함수 독스트링에 해당되는 첫 번째 문장이 여기에도 적용돼요. 그러나 인라인 주석은 코드 수준에 사용돼요. 주석은 일반적으로 참조하는 코드 단편 바로 앞에 두게 되요.
- 문서 파일: 이 경우는 훨씬 덜 빈번한 사용 사례에요. 때때로 저는 문서 파일, 주로 README에서 주석을 사용해요. 예를 들어 새로운 섹션이 추가되어야 할 때 표시하거나, 특정 섹션이 완전하지 않거나 자세한 경우를 나타내거나, 특정 기능이 아직 예정대로 작동하지 않음을 강조하기 위해 이렇게 하죠. 문서 파일에 주석이 있는 위치에 주석을 달아요 — 해당 측면이 (또는 있어야 할 곳) 논의되는 곳에요.

많은 사람들이 문서 파일이 실제로 코드의 일부가 아니라고 주장할 수 있지만, README와 같은 파일은 보통 코드 저장소의 중요한 부분을 구성해요. 이런 파일에 주석을 다는 것은 주의를 끄는 훌륭한 방법이에요. 그래서 왜 문서 파일에서 주석을 사용하는 것을 피해야 할까요? 🌟

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

docstring에 대해 이야기해보죠. 사용자에게 중요한 정보를 docstring에 추가해야 한다면, 주석을 사용할 필요가 없습니다. Docstring은 문서화의 중요한 요소이기 때문에 그 안에 포함된 내용은 중요해야 합니다. 그러므로, 사용자를 위한 주석 사용은 정보가 극히 중요하고 강조되어야 하는 경우에만 제한하는 것이 좋습니다.

# Example

다음 스크립트를 살펴보죠. 코드가 간단하고 유용한 일은 하지 않지만, 주석을 강조하는 방법을 보여주는 데 완벽히 적합할 것입니다. 실제 코드에서 사용한 것보다 더 많은 주석을 사용할 것이지만, 예를 들어 모듈을 디자인할 때 이렇게 할 수 있다고 상상할 수 있습니다.

여기 텍스트 파일에 있는 코드의 원시 버전입니다.

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
"""이것은 예시 어노테이션 모듈입니다.

할 일: 확장 프로그램을 설치하세요.
다시 고려: 다른 어노테이션을 동일한 방식으로 포맷해야 할까요?
"""
def foo(x, y, z):
    """세 요소로 구성된 튜플을 생성합니다.

    예시:
    >>> foo(1, 2, 3)
    (1, 2, 3)
    >>> foo('1', '2', 3)
    ('1', '2', 3)

    할 일: *args를 사용하여 더 많은 인수를 허용하세요.
    다시 고려: 이 함수가 정말 중요한가요?
    """
    return x, y, z

def bar(x: int) -> tuple[int, float, str]:
    """세 가지 유형을 갖는 int 튜플을 생성합니다.

    할 일: "세 가지 유형을 갖는 int 튜플"이 무엇인지 설명하세요.
    할 일: 독스트링을 추가하세요.
    """
    # 수정 필요: tuple에 대한 직접 호출을 제거하세요.
    return tuple(x, float(x), str(x))

def baz(x: float) -> tuple[int, float, str]:
    """float에서 세 가지 유형을 갖는 int 튜플을 생성합니다.

    할 일: "세 가지 유형을 갖는 int 튜플"이 무엇인지 설명하세요.
    할 일: 독스트링을 추가하세요.
    """
    # 버그: x는 float이므로 튜플의 첫 번째 위치를 float로 변환해야 합니다.
    # 수정 필요: tuple에 대한 직접 호출을 제거하세요.
    return tuple(x, x, str(x))
```

여기서 네 가지 유형의 어노테이션을 사용했어요. 세 개는 일반적인 것들(TODO, NOTE, FIXME, BUG)이고 하나는 사용자 정의(RECONSIDER)입니다.

코드 하이라이팅 없이도 어노테이션이 돋보이는 것을 알 수 있어요. 코드에 어노테이션이 가득해도 스크립트에 약간의 어노테이션만 있는 경우보다 어노테이션을 더 쉽게 발견할 수 있고 하이라이팅이 없는 텍스트 파일에서도 쉽게 간과되지 않음을 동의하실 거에요.

이제 일반적인 Python 코드 하이라이팅을 사용해 스크립트를 확인해보겠습니다.

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
"""이것은 예제 어노테이션 모듈입니다.

할 일: 확장 프로그램을 설치하세요.
재고: 서로 다른 어노테이션이 동일한 방식으로 서식이 있는지 확인해야 합니까?
"""
def foo(x, y, z):
    """세 요소의 튜플을 만듭니다.

    예시:
    >>> foo(1, 2, 3)
    (1, 2, 3)
    >>> foo('1', '2', 3)
    ('1', '2', 3)

    할 일: 더 많은 인수를 허용하도록 *args를 사용하세요.
    재고: 이 함수가 정말 중요한가요?
    """
    return x, y, z

def bar(x: int) -> tuple[int, float, str]:
    """세 가지 유형의 int 튜플을 만듭니다.

    할 일: "세 가지 유형의 int 튜플"이 무엇인지 설명하세요.
    할 일: 문서 테스트 추가하기.
    """
    # 수정 필요: tuple에 대한 직접 호출 제거하기:
    return tuple(x, float(x), str(x))

def baz(x: float) -> tuple[int, float, str]:
    """소수로부터 세 가지 유형의 int 튜플을 만듭니다.

    할 일: "세 가지 유형의 int 튜플"이 무엇인지 설명하세요.
    할 일: 문서 테스트 추가하기.
    """
    # 버그: x가 float이므로 float로 변환되어야 합니다 (튜플의 첫 번째 위치 참조)
    # 수정 필요: tuple에 대한 직접 호출 제거하기:
    return tuple(x, x, str(x))
```

저는 Medium 스토리 편집기와 해당 코드 강조 도구를 사용했습니다. 일부 어노테이션을 굵은 글꼴로 서식을 지정하여 강조하고 있음을 확인할 수 있습니다. 그러나 이는 인라인 주석에 대해서만 적용되며 독스트링에는 적용되지 않습니다.

귀하의 IDE나 편집기가 어노테이션 하이라이팅을 제공하는지 확인하고 해당 기능이 어떻게 작동하는지 확인한 후 설정해보세요. 이 작업은 중요합니다. 때로는 어노테이션 하이라이팅이 너무 불편할 수 있습니다. 하이라이팅을 과도하게 사용하면 코드 자체에 집중하는 데 문제가 발생할 수 있습니다. 어노테이션이 너무 눈에 띄면 무시할 수 없도록 지나치게 두드러질 수 있습니다.

이는 코드 어노테이션에 대한 재미있는 점입니다. 어노테이션은 관심을 끌기 위해 존재하지만 작성하거나 읽은 후에는 그 존재를 잊을 수 있어야 합니다. 그 존재를 무시할 수 없다면 당신을 방해할 것입니다. 따라서 코드 개발 중에 그들의 주목성과 보이지 않음 사이의 적절한 균형을 찾아야 합니다.

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

코드 개발 중의 무시할 수 있는 역할에 대해 이야기해 보겠습니다. 이 아이디어는 주석을 쓴 후에도 그것을 무시할 수 있어야 하며, 읽은 후에도 무시할 수 있어야 합니다. 따라서 개발자가 주석을 읽고 그 내용을 이해하면, 코드 작업 중에 주석을 무시할 수 있어서 주의를 산만하게 하지 않아도 됩니다.

전문 IDE나 고급 기능을 갖춘 텍스트/코드 편집기를 사용할 때, 주석을 강조 표시하는 기능을 제공하는지 확인해 보세요. 그리고 이 기능이 있다면, 도구를 구성하여 원하는 주석 강조 표시 설정을 찾아보세요.

그러므로 자신과 팀원들을 위해 작동하는 주석 강조 표시 구성을 찾아야 합니다. 보통 여러분이 작성한 주석을 사용하는 유일한 사람은 아니기 때문입니다. 아래에서 Visual Studio Code에서 이를 어떻게 하는지 보여드리겠습니다. 우리는 작업의 기술적 부분에 집중할 것이며, 결론에서는 나의 프로젝트에서 사용하는 주석 강조 표시 구성을 소개할 것입니다.

# Visual Studio Code에서 주석(annotation)

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

이 섹션은 Visual Studio Code에 관련된 내용입니다:

아마도 이것은 PyCharm과 함께 두 가지 가장 자주 사용되는 Python IDE 중 하나일 것입니다. 아래 예시에서는 Visual Studio Code의 1.87.2 버전을 사용하고 있습니다.

VSC에는 단순한 내장 어노테이션 강조 기능이 있습니다. 우리 예시 스크립트에서는 이 기능이 어떻게 작동하는지 살펴보겠습니다:

![example](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_1.png)

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

위에서 보듯이, VSC는 인라인 주석이나 문서 문자열에 상관없이 표준 주석을 강조 표시합니다; 여기서는 TODO, NOTE, FIXME 및 BUG입니다. 사용자 정의 주석인 RECONSIDER는 강조 표시되지 않습니다.

이 강조 표시는 주석이 다른 글꼴 색상으로 인쇄되기 때문에 상당히 미묘합니다. 이는 종종 동작하지만 우리는 더 많은 기능을 원할 수 있습니다:

- 일부 주석은 다른 주석보다 더 눈에 띄게 표시될 수 있습니다. 특히 BUG 및 FIXME와 같이 중요한 주석들은 더욱 눈에 띌 수 있습니다.
- 예를 들어 RECONSIDER와 같은 사용자 정의 주석을 강조 표시하고 싶을 것입니다.

VSC에는 주석을 강조 표시하는 도구가 있으며 TODO Highlight 확장 프로그램으로 제공됩니다:

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

도구가 조금 오래되었어요. 마지막 커밋과 릴리즈가 2021년 10월에 있었지만 여전히 아주 잘 작동해요. 여기가 그 저장소입니다.

그래서, 확장 프로그램을 설치해봐요:

![이미지](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_2.png)

"설치" 버튼을 누른 후에, 우리는 확장 프로그램 버전 1.0.5를 사용할 수 있을 거에요. 스크립트가 있는 탭으로 이동한 후에, 이것을 볼 수 있을 거에요:

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

<img src="/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_3.png" />

이번에는 주요 주석이 훨씬 더 눈에 띄게 표시됩니다. 그러나 모두가 아닙니다. 명확히 말하자면 TODO Highlight는 모든 주석을 주석 처리하지 않습니다. 예를 들어, 이 예제에서 BUG와 NOTE, 심지어 사용자 정의 주석 중 하나인 RECONSIDER도 주석 처리하지 않습니다. BUG와 NOTE는 여전히 강조 표시되지만 내장 VSC 주석 강조 기능에 의해 강조 표시됩니다.

이로운 경우가 많습니다. 팀에서 작업하는 경우 모든 팀원이 확장 프로그램을 설치하면 동일한 강조 표시가 표시되므로 이 접근 방식의 장점이 됩니다. 때로는 강조 표시기를 확장하고 싶을 수도 있습니다. 그리고 다음 섹션에서 이를 진행할 것입니다.

## 사용자 정의 설정으로 TODO Highlight 확장하기

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

기본 구성이 충분하지 않다면 사용자 팀이나 개인 설정을 추가할 수 있습니다. 이를 위해 VSC 설치의 모든 사용자 설정을 포함하는 settings.json 파일을 편집해야 합니다.

기본 설정을 확인하려면 F1을 누르고 "default settings"를 입력하세요. 다음을 보게 됩니다:

![이미지](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_4.png)

이 파일을 읽어 기본 설정을 확인할 수 있지만 수정하지 마세요. 사용자 설정은 다른 파일에 있으므로 다시 F1을 누르고 "user settings"를 입력하세요:

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

![Screenshot of the second option](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_5.png)

두 번째 옵션인 사용자 설정이 있는 JSON 파일을 선택해주세요. 이곳에는 TODO Highlighter를 위한 사용자 지정 설정을 추가할 수 있습니다. 이를 하는 방법은 확장 프로그램을 열고 DETAILS 탭을 읽어보시면 알 수 있습니다:

![Screenshot of the DETAILS tab](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_6.png)

확장 프로그램이 강조하지 않는 주석을 스크립트에 추가해보겠습니다: BUG, NOTE 및 RECONSIDER입니다. 이를 위해서는 새로운 필드인 todohighlight.keywords를 추가하는 단 한 줄의 코드를 추가해야 합니다:

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

![Image](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_7.png)

만약 콜론을 강조하고 싶다면, 주석의 일부로 취급해야 합니다. 그렇지 않으면, 이러한 주석은 콜론 없이 강조되어 표시됩니다. 이는 내장 주석에 대해 TODO 하이라이터가 사용하는 동작과 다른 동작입니다 (다음 이미지에서 TODO가 어떻게 강조되는지 확인해보세요).

settings.JSON에 사용자 정의 구성을 추가하면 확장 프로그램이 즉시 업데이트됩니다. 방금 추가한 주석이 설정 파일 및 다른 열린 파일에서 위 화면샷과 같이 강조 표시될 것을 볼 수 있습니다.

이제 스크립트는 다음과 같이 보일 것입니다:

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

![image](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_8.png)

좋아요! 그리고 자주 그것만으로 충분합니다.

하지만 한 발 더 나아가 다른 색상으로 설정하고 싶다면 — 사실 더 많은 것도 할 수 있습니다 — 이 파일에서 할 수 있습니다. 지금처럼 BUG 주석을 더 강조해 봅시다:

![image](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_9.png)

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

이것이 어떻게 작동하는지 확인할 수 있어요. 정말로 눈에 띄고, 이게 전체적인 목적이었죠. baz() 함수에 대해서만 확인해 보겠습니다:

![이미지](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_10.png)

어노테이션이 추가적인 줄로 확장되는 경우, baz() 함수의 BUG처럼 그 부분은 전혀 강조되지 않아요. 어노테이션 태그만 강조될 때는 문제가 되지 않지만, 여기서는 전체 줄을 강조하려고 해요. 그래서 baz()에서 버그를 설명하는 두 줄 모두 태그가 달려 있어요.

첫눈에 보면, 독자들은 두 어노테이션(그리고 두 버그)을 보고 있다고 생각할 수 있어요. 그래서 두 번째 줄을 들여쓰기하여 이전 줄의 연속임을 시각적으로 나타낼 수 있어요(표시하지 않음).

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

저는 어떻게 해야 할지 보여드렸는데, 전체 줄을 강조하는 것은 지나치게 하지 마세요. 이것은 혼란스럽고 주의를 산만하게 만들기 때문에, 주석 태그만 강조하는 것을 선호합니다.

다양한 주석에 대해 설정을 다르게 할 수 있습니다:

![Python Readability Annotations](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_11.png)

여기서는 BUG에 대해 자세한 설정을 제공하고, FIXME에 대해서는 덜 자세한 설정을 하며, NOTE 및 RECONSIDER 주석을 기본 설정으로 사용할 것입니다.

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

설정 파일에 추가한 주석이 어떻게 강조되는지 확인할 수 있어요. 그런데 가끔은 방금 한 변경 사항이 보이지 않아서 뭔가 잘못되었다고 생각할 수도 있어요. 이럴 때는 설정된 JSON 파일을 새로고침해주면 됩니다 (닫고 다시 열거나) 또는 변경 사항을 반영한 후 다른 탭으로 이동하면 예상대로 강조 표시기가 작동할 거에요.

마지막으로, TODO 하이라이트의 기본 스타일을 변경하는 방법을 보여드릴게요:

![TODO 하이라이트 기본 스타일 변경](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_12.png)

이제 다음 구성으로 예시 스크립트가 어떻게 보이는지 확인해볼게요:

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

<img src="/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_13.png" />

이게 스크립트야:

<img src="/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_14.png" />

# 결론 및 제안

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

주석을 사용하면 코드의 가독성을 크게 높일 수 있어요. 그러나 지나치게 사용하면 오히려 반대 효과를 낼 수 있어요. 특히 화려한 강조 표시를 사용하거나 지나치게 긴 설명을 쓰는 경우에는 코드가 더 이해하기 어려워질 수 있어요.

여기 파이썬 코드에서 주석을 사용하는 방법에 대한 제안이 있어요:

## 사용은 하되 지나치지는 말아요

먼저, 주석을 사용하지만 지나치게 사용하지는 마세요. 주석은 특히 중요한 내용을 전달해야 할 때 사용하세요. 그 내용이 코드에서 잊혀지거나 간과될 수 있는 경우 주석을 달아주세요.

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

동시에 사용에 대해 걱정하지 마세요: 과도한 강조만 사용하지 않는다면, 주석은 제대로 돌아 봐야 할 방법으로 제대로 들어날 수 있습니다. 따라서, 어떤 경우에도 섬세한 강조를 사용하세요. 솔직히 말하자면, 과하게 강조된 항목보다는 강조되지 않은 주석이 더 잘 작동합니다.

## 주석은 중요한 정보에만 사용하세요

주석은 무의미한 코멘트가 아닙니다. 진짜 말해야 하는 것입니다. 코드나 프로젝트, 코드 검토, 또는 다른 것에 중요할 수 있지만, 반드시 중요해야 합니다.

그러므로 주석을 단순히 무언가를 말하는 멋진 방법으로 취급하지 마세요. 중요한 정보를 전달하는 데 있어서 효율적인 (가시성 면에서) 방법으로 취급하세요.

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

## 커스텀 주석 사용을 자제해주세요

팀원들이 이해하기 어려워할 수도 있는 커스텀 주석은 피하는 것이 좋습니다. 이는 커스텀 주석을 전혀 사용하지 말아야 한다는 의미가 아니라, 보통 주석이 더 잘할 수 있는 경우에는 커스텀 주석을 사용하지 않는 것이 좋다는 것입니다. 만약 그렇다면, 사실 더 나은 일을 합니다 — 다른 사람들이 쉽게 알아차리고 이해하기 쉬울 것이며, 주석을 처리하고 상황을 이해하는 데 몇 초간 멈춰야 할 필요가 없을 것입니다.

이는 커스텀 주석을 전혀 피해야 한다는 것이 아닙니다. 팀 프로젝트에서는 최대한 사용하지 않으려고 노력하지만, 혼자 작업하거나 두세 명의 개발자로 이루어진 작은 팀에서 일할 때 필요하다면 때로는 커스텀 주석을 사용하기도 합니다.

상황이 커스텀 주석이 필요함을 시사하는 것 같다면, 다른 방법을 찾아보려고 노력해보세요. 두 번 생각하고, 다시 한 번 검토하세요. 여전히 최선의 접근 방식이라고 생각한다면, 한 번 더 생각해보세요. 혹시 팀원들과 상의해보는 것은 어떨까요?

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

테이블 태그를 마크다운 형식으로 바꾸세요.

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

## 주석 설정을 신중히 구성하세요

너무 많은 주석 설정으로 과도하게 하지 마세요. 시각적으로 다른 형식으로 서식이 지정된 많은 주석이 포함된 코드는 시각적으로 혼잡해집니다.

사실, 예제 스크립트에 사용한 일부 설정은 지나치게 과장되었습니다. 예를 들어, BUG를 한 줄 전체를 강조하는 설정과 같은 것입니다. 종종, 새로운 주석을 추가하고 각각 개별적으로 설정하는 대신 기본 설정을 사용하는 것이 가장 좋을 수 있습니다.

일부 주석을 다른 주석과 구별하고 싶다면 — 예를 들어, BUG 및 FIXME — 여기와 같이 작은 변경만으로 충분합니다:

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

<img src="/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_15.png" />

VSC의 확장 기능 TODO Highlight에서, 가장 인기있는 주석들을 주석 처리하는 것을 의미합니다: TODO, NOTE, REVIEW, BUG 및 FIXME. 내장 TODO Highlight의 주석인 TODO는 자체 색상을 갖게 될 것입니다. BUG 및 FIXME는 다른 주석들과 달리 동일한 스타일을 사용합니다. BUG에는 "color": "white"를 추가해야 했는데, 그렇지 않으면 기본 색상으로 검정색이 사용되었을 것입니다:

<img src="/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_16.png" />

이로써 다음 효과가 발생합니다:

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

![image](/TIL/assets/img/2024-07-09-EnhancingReadabilityofPythonCodeviaAnnotations_17.png)

안녕하세요! 파이썬 코드의 가독성과 코드 개발의 효율성을 높일 수 있는 주석에 대해 이야기해봅니다. 그러나 주석을 과하게 사용하지 않는 것이 중요합니다. 과도한 구성은 주석을 너무 눈에 띄게 만들어 코드에 불필요한 시각적 혼란을 줄 수 있습니다.

그러므로 주석 사용을 꺼리지 말고 현명하게 활용해보세요. 자신에게 유혹이 되지 않는다면, 일단 주석이 어떻게 작동하는지 이해하는 것이 중요합니다. 왜냐하면 늦게나마 주석을 사용하는 팀에 속하거나 주석이 포함된 외부 패키지를 사용할 수도 있기 때문입니다.

그러므로 주석이 어떻게 작동하는지 이해하는 것이 중요합니다. 이 글이 도움이 되었으면 좋겠습니다. 그럼에도 주석에는 주관적인 면이 있습니다. 이 글에서도 주석을 어떻게 보고, 어떻게 생각하는지를 설명했지만, 다른 사람들은 다른 의견을 가질 수 있습니다.
