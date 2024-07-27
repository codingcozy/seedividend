---
title: "파이썬에서 덮어쓰기 헷갈리지만 위험하고 강력한 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-OverwritinginPythonTrickyDangerousPowerful_0.png"
date: 2024-07-09 19:09
ogImage:
  url: /assets/img/2024-07-09-OverwritinginPythonTrickyDangerousPowerful_0.png
tag: Tech
originalTitle: "Overwriting in Python: Tricky. Dangerous. Powerful"
link: "https://medium.com/towards-data-science/overwriting-in-python-tricky-dangerous-powerful-04b12a9b1a7e"
---

## 파이썬 프로그래밍

![이미지](/TIL/assets/img/2024-07-09-OverwritinginPythonTrickyDangerousPowerful_0.png)

파이썬에서 여러 가지 객체를 덮어썼습니다. 여러분도 파이썬으로 코딩하는데 많은 시간을 보냈다면 이를 경험했을 것입니다. 적어도 파이썬에서는 객체를 덮어쓰는 것이 이 언어의 핵심이기 때문입니다.

변수를 덮어썼지만 함수, 클래스, 그리고 클래스 메서드까지도 덮어썼습니다. 때로는 예외까지 덮어썼습니다.

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

그리고 실제로 변수 덮어쓰기와 호출 가능한 객체 덮어쓰기 사이에는 차이가 있습니다. 이 두 가지 프로세스 간의 차이는 실제로 상당히 중요합니다. 후자는 더 까다롭기 때문에요. 호출 가능한 객체 덮어쓰기에 초점을 맞추고 있지만, 좀 더 고급 기술인 것으로 알려진 것이기 때문에 변수 덮어쓰기에 대해서도 이야기할 것입니다. 그것은 이야기를 이어가는 좋은 시작점을 제공하기 때문이죠.

파이썬은 거의 모든 것을 덮어쓸 수 있습니다. 거의는, 즉 모든 것이 아닌 거의 모든 것 — 예를 들어 in 키워드를 덮어쓰려고 하면 실패할 것입니다(언어의 문법 자체를 수정하려는 의도라면 다르겠지만, 우리는 오늘 이에 대해 언급하지 않을 것입니다). 그러나 이러한 몇 가지 예외를 제외하고는 변수, 함수, 사용자 정의 클래스, 내장 클래스, 클래스의 인스턴스, 클래스의 메서드, 예외, 람다 또는 부분 함수 등 모든 것을 덮어쓸 수 있습니다.

덮어쓰기에 대해 이야기하는 것은 파이썬에서 객체를 교체하거나 재할당하는 것과 관련이 있습니다. 클래스에서 상속된 메서드의 구현을 기술하는 객체지향 프로그래밍 개념인 오버라이딩과는 다른 개념입니다. 더 중요한 것은 덮어쓰기와 확장(예: 클래스에 새로운 메서드 추가), 서브클래스화(객체지향 프로그래밍의 상속 형태) 간의 차이를 이해하는 것입니다.

그럼에도 불구하고 나는 '덮어쓰기'라는 용어를 넓은 의미로 사용합니다. 특정 상황에서는 더 정확한 용어가 특정 형태의 덮어쓰기를 더 잘 설명할 수 있습니다. 오버로딩과 몽키 패칭과 같은 형태의 덮어쓰기를 보다 정확하게 설명하는 것이요. 오버로딩은 다양한 유형의 입력에 대해 작동하도록 함수를 정의하는 것을 말합니다. 몽키 패칭은 실행 시간에 클래스, 함수 또는 모듈의 동적 수정을 참조하며, 원본 객체를 수정하지 않고 호출 가능한 객체의 동작을 변경할 때 자주 사용됩니다. 그러나 이러한 용어들은 모두 덮어쓰기의 특정 사례입니다.

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

이 기사는 당신에게 덮어쓰기 기술을 가르치려는 것이 아닙니다. 오히려 덮어쓰기가 어떻게 작동하는지, 왜 위험할 수 있는지 및 주의해야 할 위험과 결과에 대해 이해하는 데 도움을 주고자 합니다.

우리는 호출 가능한 객체를 덮어쓰는 데 초점을 맞출 것입니다. 이것들이 가장 흥미로운(동시에 가장 까다로운) 사용 사례를 이루기 때문입니다. 그러나 처음에 변수를 덮어쓰는 방법부터 시작할 것이며, 나중에 호출 가능한 객체를 덮어쓰는 방법에 대해 논의할 것입니다. 그 후 실제 예시들을 보여줄 테니 주제를 이해하는 데 도움이 될 것입니다. 그러면 덮어쓰기의 여러 위험과 잠재적 결과에 대해 이동할 것입니다. Python 객체를 덮어쓰기 전에 완전히 안전한지, 그 효과가 실제로 원하는 효과인지 심사숙고해야 한다는 것을 당신에게 납득시키고 싶습니다.

# 덮어쓰기란?

일반적으로, Python에서 덮어쓰기란 이름에 새 객체를 할당하는 것을 의미합니다. 그러니까:

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

- 덮어씌워지기 전: 이름 x는 특정 객체를 저장하는 메모리 주소와 연관되어 있습니다. 파이썬 용어로 말하면, x는 해당 객체를 참조합니다.
- 덮어씌워진 후: x에 새로운 객체를 할당하면, 그 참조가 새로운 객체가 저장된 다른 메모리 주소를 가리키도록 변경됩니다. 이제 이름 x는 이 새로운 객체를 참조합니다.

이 기본 개념은 Python의 변수 관리와 메모리 처리를 이해하는 데 중요합니다. x에 의해 참조되는 이전 객체가 모든 참조를 잃으면 가비지 수집 기능인 Python의 메모리 해제를 위한 후보가 됩니다.

일상적인 Python 코딩에서 변수 값을 재할당하는 등 덮어쓰기를 마주할 확률이 높습니다. 아래 예시처럼:

```js
>>> x = 10
>>> x
10
>>> x = 20
>>> x
20
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

여기에 있습니다:

```js
>>> x = 10
>>> x
10
>>> x = "하! 나는 x의 유형을 변경했어요!"
>>> x
'하! 나는 x의 유형을 변경했어요!'
```

본래 문제가 없지만 변수 덮어쓰기는 유형 변경을 포함할 때 조금 미묘해집니다. 위의 두 코드 블록을 비교해 보면, 전자는 유형 변경이 없는 반면 후자는 유형 변경이 있습니다. Python은 동적으로 유형이 지정되는 언어이기 때문에 변수의 유형을 변경하는 것(예: 정수에서 문자열로 다시 할당하는 것)은 오르지 않습니다. 그러나 가독성과 유지보수에 일부 도전을 가져올 수도 있습니다.

Python의 동적 유형 시스템은 변수가 수명 주기의 어느 시점에서든 어떤 유형의 개체를 참조할 수 있도록하는 중요한 수준의 유연성을 제공합니다. 이에 대해 자세히 읽을 수 있는 다음 글이 있으니 참고하세요:

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

파이썬의 강점 중 하나인 이 유연성은 신속한 개발과 간단한 데이터 흐름을 가능하게 합니다. 그러나 많은 권한이 따르기 때문에 큰 책임도 따라옵니다. 그리고 이것이 파이썬의 동적 환경에도 적용됩니다. 변수 유형을 바꾸는 간편성은 특히 대규모 코드 기반에서 코드의 가독성을 떨어뜨릴 수 있습니다.

이러한 도전에 대처하기 위해 파이썬에서는 예상 유형의 변수, 함수 매개변수 및 반환 값 등을 명시할 수 있게 해주는 타입 힌트를 소개했습니다. 자세한 내용은 여기를 참조해주세요:

타입 힌트는 파이썬의 동적 성격에는 직접적으로 영향을 미치지 않습니다. 대신, 타입 힌트는 정적 유형의 장점에 간접적으로 (그리고 선택적으로) 이점을 제공하는 다리 역할을 합니다. 예전에는 아직 파이썬 환경의 일부가 아니었을 때 이미 다른 타입 힌팅은 많은 파이썬 개발자들이 꿈꿔왔던 것입니다.

한편으로, 파이썬의 동적 타이핑은 변수가 수명 동안 다른 유형의 값들을 보관할 수 있도록 합니다. 다른 한편으로, 타입 힌트의 도입은 예상 유형을 명시하는 방법을 제공하면서 코드의 가독성을 향상시키고 정적 분석 도구를 지원합니다. 예를 들어, 타입 힌트 관점에서 첫 번째 코드 블록에서 x를 덮어쓰는 것은 완전히 올바릅니다. 그러나 두 번째 블록에서는 그렇지 않습니다. 이는 정수를 새 이름 x에 할당할 때 타입 힌트를 넣지 않고 실제로는 x가 정수임을 간접적으로 타입 검사기에 알렸기 때문입니다. 이후에 x를 문자열로 덮어쓰기 때문입니다.

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

이 문제를 피하기 위해 다음을 할 수 있습니다:

```js
>>> from typing import Union
>>> x: Union[int, str] = 10
>>> x
10
>>> x = "하! x의 유형을 변경했지만 여전히 정상입니다!"
>>> x
'하! x의 유형을 변경했지만 여전히 정상입니다!'
```

x가 정수 또는 문자열일 수 있다고 알려주면, 타입 체커는 이 코드에서 아무 문제가 없다고 볼 것입니다.

잠깐, 뭐라구요?! 왜 타입 힌트에 대해 그렇게 많이 언급하나요? 우리는 파이썬에서 덮어쓰기에 대해 얘기하고 싶지 않았나요? 왜 이걸 하고 있지 않나요?

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

그렇습니다. Type hint는 우리를 보호합니다. 모든 의도치 않은 유형의 값으로 변수를 잘못 덮어쓸 경우를 방지해줍니다. 따라서 Python에서 변수를 덮어쓸 때 Type hint는 안전장치 역할을 합니다. 타입 체커가 특정 덮어쓰기에 대해 경고를 보내면, 우리 스스로 좋은 일을 위해 그것이 올바른지 확인하고 의도한 결과가 실제로 달성되는지 확인해야 합니다.

변수를 덮어쓰는 것은 Python에서 가장 간단한 덮어쓰기 형태입니다. 다음 섹션에서는 해당 주제에 대해 더 자세히 살펴보며 콜러블(함수, 클래스, 클래스 메서드)을 덮어쓸 때 발생할 수 있는 리스크에 대해 논의할 것입니다. 이러한 형태의 덮어쓰기는 복잡한 도전 과제를 도입하고 신중한 처리를 하지 않으면 심각한 문제로 이어질 수 있는 가능성이 있습니다.

# 함수, 클래스 및 클래스 메서드 덮어쓰기

다양한 객체 유형을 다루지만 관련 위험요소가 기본적으로 동일하기 때문에 세 가지 덮어쓰기 형태를 함께 설명하기로 결정했습니다. 따라서 가독성을 위해 함수에 대해 설명하겠지만, 모든 내용은 동일하게 클래스, 클래스 메서드 및 기타 콜러블 객체에도 적용됩니다.

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

기존 함수를 덮어쓰는 이유에 대해 궁금할 수 있습니다. 그냥 다르게 구현하면 안 되는 걸까요? 사실, 우리가 다르게 구현할 수 있는 상황도 있습니다. 따라서 덮어쓸 필요가 없는 경우도 있습니다. 그러나 외부 패키지에서 함수(또는 여러 함수)를 덮어써야 하는 상황도 있을 수 있습니다. 그 이유는 다양할 수 있습니다. 조금 다른 동작이 필요하거나 다른 데이터 유형과 호환되어야 하거나 성능을 개선해야 할 수도 있고, 또는 원래 구현에서 버그가 발견되었지만 수정된 공식 릴리스를 기다릴 수 없는 경우일 수도 있습니다.

저는 이러한 상황을 여러 번 경험해왔고, 덮어쓰기가 종종 좋은 해결책이 되었습니다. 패키지의 주요 기능을 제공하는 외부(PyPi에서 가져온) Python 패키지에서 수십 개의 함수와 클래스 메서드를 덮어써야 했던 Python 프로젝트 중 하나가 있습니다. 이는 해당 패키지가 큰 코드베이스를 갖고 있지만 부주의하고 때로는 잘못된 코드가 포함되어 있었지만, 사용해야 했기 때문입니다.

함수를 덮어쓰는 예제를 살펴보겠습니다. Python은 매우 유연하기 때문에 내장 함수를 덮어쓰기가 매우 쉽습니다:

\[이미지 첨부: "2024-07-09-OverwritinginPythonTrickyDangerousPowerful_1.png"\]

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

위에서 sum 함수를 max 함수로 덮어썼습니다. 그러나 더 많은 것을 할 수 있습니다. 아래에서 sum 함수를 문자열로 덮어씁니다!

![이미지](/TIL/assets/img/2024-07-09-OverwritinginPythonTrickyDangerousPowerful_2.png)

파이썬에서 덮어쓰기가 어떻게 작동하는지 이해하려면 파이썬에서 전역 변수가 어떻게 작동하는지 이해하는 것이 중요합니다. 이와 관련한 자세한 내용은 다음 기사에서 확인할 수 있습니다:

간단히 말하면, 한 모듈에서 sum을 덮어쓰면 다른 모듈에 영향을 미치지 않습니다. 따라서 sum은 여기에 덮어씌워지지 않습니다. 이것은 기억해야 할 중요한 사항입니다. 왜냐하면 위에서 보여준대로 sum을 덮어쓰면 두 개의 다른 sum 함수가 만들어지기 때문입니다.

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

- 덮어쓴 합계는 덮어쓰기를 수행한 모듈에서 발생합니다.
- 프로그램의 모든 다른 모듈(그리고 사실 다른 프로그램들에서의 기본 내장 합계)에는 원래 기본 내장 합계가 있습니다.

객체를 전역으로 덮어쓰려면 내장 모듈을 활용하는 특정 기술이 필요합니다. 그러나 여기서 이 주제를 심도깊게 다루지는 않겠습니다. 더 알아보고 싶다면 (그리고 왜 주의해서 진행해야 하는지 이해하고 싶다면) 위의 기사를 읽어보세요. 거기에서 그 방법을 설명했지만 관련된 위험성도 설명했습니다.

특정 모듈이나 외부 패키지의 모듈(파이썬 표준 라이브러리 모듈 포함)에서 함수를 전역으로 덮어써도 전역으로 덮어씌우지 않고 싶다면 다른 접근 방법이 필요합니다. 이 기술에 대해 아래 기사에서 설명했습니다:

이 글은 파이썬에서 전역 변수와 파이썬 모듈에서 객체를 가져오는 다양한 방법에 대한 두 가지 기사로, 파이썬에서 덮어쓰기가 어떻게 작동하는지 이해하는 데 필요한 지식을 제공합니다.

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

다음 섹션에서는 기능을 덮어쓰는 매우 잘 알려진 Python 기법인 'decoration'을 소개합니다.

## Decoration은 덮어쓰기!

하하! 여러분 중 일부에게 충격을 주었을지도 모르겠네요 — 먼저 덮어쓰기를 해킹의 일종으로 논의했는데, 이제 Python의 가장 흥미로운 및 인기 있는 문법 설탕 중 하나인 'decoration'이 덮어쓰기의 한 형태라고 말하고 있습니다!

더 많은 Python decoration에 대해 알고 싶다면, 다음 기사에서 기본 및 고급 정보를 찾을 수 있습니다:

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

장식은 실제로 덮어쓰기의 한 특정 버전입니다: 일반적으로 가져오는 시간에 발생하며 되돌릴 수 없습니다. 다시 말해, 한 번 장식되면 항상 장식되어 있습니다. "일반적으로" 라고 했습니다, 왜냐하면 해당 프로세스를 되돌릴 수 있는 기술이 있기 때문입니다; 이와 같은 것을 배우고 장식에 대해 더 알고 싶다면 위의 기사를 참조하세요.

이제 표준 장식의 논리를 분석해 봅시다:

- 원본 함수인 original_func가 있다고 가정합니다.
- 특정 방식으로 함수의 동작을 변경하려고 하지만 여전히 같은 이름인 original_func를 사용하여 새 버전의 함수를 호출하려면,
- 함수의 동작을 변경하는 장식자(클래스나 함수일 수 있음)를 생성합니다. 장식자를 사용하여 원본 함수를 장식할 수 있지만 다른 함수도 가능합니다.
- original_func를 장식하여 그 동작을 변경합니다. 기술적으로, 장식은 원본 함수를 새로운 동작이 있는 함수로 덮어씁니다. 새로운 함수는 일반적으로 장식의 효과로 인해 원본 함수를 호출하지만, 장식된 함수가 그렇게 할 필요는 없습니다.
- 따라서 original_func를 호출하면 사실 새 함수가 호출됩니다. 이 새 함수는 original_func를 통해서만 접근할 수 있습니다. 함수 이름이 original_func인 함수를 가지고 있더라도 원본 함수에 접근할 수 없습니다.

4번째 단계에서 무엇을 했는지 주목했나요? 다른 것이 아니라 덮어쓰기입니다 — 이것이 장식이 덮어쓰기의 한 형태인 이유입니다.

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

함수를 꾸며주는 것은 매우 조심스러워야 한다는 뜻인가요?

정확히 그렇습니다! 함수를 꾸미는 것은 덮어쓴다는 의미이기 때문에 조심해야 합니다. 그럼에도 불구하고, 꾸미기에는 좋은 점이 하나 있습니다. 파이썬을 알고 계시다면 꾸미는 방법을 이미 알고 계셔서, 꾸며진 함수가 동작이 변경되고 원래 함수가 덮어씌워진다는 것을 이미 알고 계실 겁니다.

즉, 꾸미기는 함수를 덮어쓰는 비교적 안전한 방법이라는 뜻입니다. 안전한 이유는 꾸미는 것이 명확하며, 특히 '@' 구문을 사용하여 수행할 때 명확하기 때문입니다. 꾸민다는 것은 개발자가 외치는 것과 같습니다: "안 봤어요? 이 함수를 덮어씌우고 있어요! 다르게 동작할 거에요!"

지금 이 방식을 다른 모듈에 숨겨진 한 줄로 함수를 덮어씌우는 방식과 비교해보세요. 꾸미기는 덮어쓰기를 알려주고 있지만, 후자의 방식은 조용히 속삭이는 것과 같습니다: "쉿... 덮어쓰고 있어요... 이 함수를... 다르게 동작하게 할 거에요..."

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

이 섹션에서 중요한 결론이 나오는데요. Python에서 함수, 클래스 및 클래스 메서드 덮어쓰기 기법은 눈에 띄게 할 수도 있고 눈에 띄지 않을 수도 있습니다. 가능한 경우 더 눈에 띄는 방법을 선택해야 합니다. 코드에서 알기 어려운 덮어쓰기 기술을 사용하지 않도록 하세요. 이는 코드의 기능을 혼란스럽게 만들고 이해를 방해할 수 있습니다.

# 예시 1: 프로덕션 코드

이 섹션에서는 덮어쓰기가 중요한 역할을 하는 많은 가능한 상황 중 하나를 분석할 것입니다. 그러나 이는 넓은 주제에 대한 특정 예시일 뿐이므로 모든 가능한 위험 요소를 다루지는 않습니다. 따라서 이 섹션을 예시로 취급하고, 다음 섹션에서 덮어씌기의 위험에 대해 좀 더 일반적으로 논의할 것입니다.

다음 가상이지만 완전히 타당한 사례 연구를 고려해 보겠습니다. 이 시나리오를 읽고 분석하면서 개발자의 역할을 맡아주세요. 실수를 저지른 사람은 아니지만 그 결과물과 씨름해야 하는 사람이 바로 여러분입니다.

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

5년 이상 프로젝트에 참여한 수많은 개발자들이 작업한 코드를 이어 받았습니다. 코드 베이스에는 20개의 모듈 중 하나인 큰 모듈이 있고, 이 모듈에는 read_info_from_db라는 중요한 기능이 있습니다. 이 기능은 사용 중인 20개 모듈 중 15개에서 사용되며, 사용되는 프로세스에 중요한 정보를 제공합니다. 그러니까 현재까지는 잘 작동하고 있습니다.

하지만 여기서 모르는 사실이 하나 있습니다. 개발자 중 한 명이 이 함수의 동작을 변경했습니다. 더 심각한 문제는 이 개발자가 모든 모듈이 아닌 7개 모듈에서만 이를 수행했다는 것입니다. 이 개발자는 해당 함수를 또 다른 함수로 덮어쓰는 해킹을 했는데, 이를 통해 이 7개 모듈에서만 다르게 동작했습니다. 게다가, 덮어쓰기는 특정 모듈이 가져올 때의 프로세스 중간에 이루어졌습니다.

결과적으로, 이상한 출력물이 발생했지만 초기에는 조금 이상했을 뿐입니다. 출력물이 너무 조금 변하고 오류가 발생하지 않았기 때문에 심지어 그 변화에 대해 인식하지 못했습니다. 본인의 작업 20주차를 마치고 나서야 변경 사항을 알게 되었습니다.

21주차에 드디어 출력물의 문제를 인식하게 되었습니다. 처음에 데이터에 문제가 있을 수 있다는 것을 알아차렸지만, 이를 찾지 못했습니다. 코드를 디버깅했지만 덮어쓰기를 알지 못했습니다 — 코드 전체를 한 줄씩 디버깅하는 것은 선택지가 아니었고, 적어도 처음에는 가능한 방법이 아니었습니다. 왜냐하면 10만 줄 이상의 코드를 다루는데, 버그를 찾을 위치조차 알 길이 없기 때문입니다.

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

결국, 해결되지 않은 디버깅을 3일 더 한 후에 모든 것이 다운되었습니다. E-V-E-R-Y-T-H-I-N-G!

![image](/TIL/assets/img/2024-07-09-OverwritinginPythonTrickyDangerousPowerful_3.png)

모든 유닛 테스트는 통과했는데, 이는 해당 시나리오를 커버하지 않았다는 것을 의미합니다. 해킹은 심지어 설명서에도 언급되지 않았습니다. 그래서 그것을 간과한 것이 당연한 일이었습니다.

따라서 첫 번째 결론은: 덮어쓰기 해킹을 사용할 때는 항상 명확하게 문서화하고, 해당되는 유닛 테스트를 구현하고, 그것들을 철저하게 만드는 것입니다.

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

단위 테스트나 해킹에 대한 문서가 없었던 이유는 무엇일까요? 아마도 일시적인 해결책이었거나 코드 리팩토링되지 않은 상태로 남아있었을 수도 있습니다. 혹은 개발자가 회사를 떠나기 전에 작성하지 못한 것일 수도 있습니다. 또는 개발자가 대충 처리했을 수도 있습니다. 그 이유는 중요하지 않습니다 — 결과가 중요합니다. 지금은 애플리케이션 코드와 버그를 찾는 작업에 책임이 있는 건 여러분입니다.

어쨌든, 해킹을 발견하기 위해 하루 종일 디버깅에 시간을 들였습니다. 일곱 개의 모듈에서 사용할 다른 기능으로 원래 함수를 덮어씌우는 것이 이 해킹이었습니다. 결과적으로 같은 이름을 가진 두 개의 다른 함수가 되었는데, 한 함수는 여덟 개 모듈에서 호출되고 다른 하나는 일곱 개 모듈에서 호출되었습니다. 처음에는 해킹된 함수가 잘 작동했지만, 어느 순간 데이터가 변경되면서 해킹된 함수가 무의미한 데이터를 반환하기 시작했습니다.

이와 같은 상황은 완전한 재앙을 초래할 수 있으므로 코드 설계 측면에서 심각한 문제입니다. 이는 해킹을 절대 적용해서는 안 된다는 것을 의미하는 것이 아니라, 오히려 조심성을 가지고 적용하고 문서화하며 테스트하며 가급적 빨리 리팩토링해야 한다는 것을 의미합니다(최적의 해결책을 나타내는 경우를 제외하고). 더구나, 해킹을 문서화하지 않는 것은 위험합니다.

이 예에서 덮어쓰기는 해킹이었습니다. 그러나 항상 그런 것은 아닙니다. 종종 이는 의도적인 결정일 수 있습니다. Python은 다양한 상황에서 다양한 개체를 덮어쓸 수 있도록 허용하기 때문에 이 기법을 사용하는 데 주저하지 마세요. 그러나 이를 할 때 항상 주의해야 합니다. 결과 코드가 불분명해질 위험이 있다면, 이를 문서화하고 이 특정 객체를 덮어쓰기로 선택한 이유를 설명하세요.

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

# 주요 위험과 결과

안녕하세요! 이 기사의 본질로 넘어갈 때입니다: Python에서 객체를 덮어쓰는 것, 특히 함수, 클래스 메소드 또는 전체 클래스를 덮어쓸 때 발생할 수 있는 위험과 가능한 결과에 대해 이야기하려고 합니다.

하지만 기억해 주세요, 객체를 덮어쓰는 것은 위험할 수 있지만, 이것은 일반적인 코딩 기술입니다. 따라서 이것을 모든 방법으로 피하는 것이 아니라 올바르게 사용하는 것이 중요합니다. 더 나은 해결책을 찾을 수 있다면 사용하세요 — 이는 모든 코딩 기술에 대해 말할 수 있는 것입니다. 따라서 덮어쓰기를 두려워하지 마세요, 그러나 코드를 개선하는 방향으로 신중하게 사용하세요. 이는 코드를 불분명하게 하거나 취약하게 만드는 것보다 더 나은 방법입니다.

아래에서 덮어쓰기의 가능한 위험 목록을 찾을 수 있습니다. 이 목록이 완전한 것은 아니지만, 가장 중요한 위험을 다루고 있다고 생각합니다. 객체를 덮어쓸 때 이러한 위험들을 인식하는 것이 좋습니다 — 특히 덮어쓰기가 복잡하거나 비표준적이거나 불분명할 때입니다.

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

## 1. 예상치 못한 동작

이것은 아마도 가장 빈번하고 명백하며 눈에 띄는 문제일 것입니다. 덮어씌우기는 프로그램의 예상 기능을 런타임에서 변경함으로써 부작용, 예측할 수 없는 동작 및 결과를 초래할 수 있습니다.

더욱이, 이러한 덮어씌우기는 덮어쓴 함수에 직간접적으로 의존하는 다른 객체들에도 영향을 줄 수 있어서 코드와 애플리케이션의 복잡성과 기능성이 증가할 수 있습니다.

## 2. 유지보수

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

코드의 복잡도를 줄이는 것은 유지 보수 중에 덮어쓰기가 어려운 문제를 일으킬 수 있습니다. 여기서 명확한 문서화가 도움이 될 수 있습니다: 덮어쓰기의 이유, 메커니즘 및 가능한 위험을 명확히 설명해야 합니다. 문서는 또한 덮어쓰기를 리팩토링할 수 있는지 분석해야 합니다.

## 3. 호환성

덮어쓰기가 현재 환경에서 완벽하게 작동하더라도, 외부 라이브러리의 나중 버전이나 파이썬 자체에서는 비슷하게 작동할 것을 보장할 수 없습니다. 이러한 업데이트는 원래 함수의 동작이나 함수 간 상호작용의 변경으로 인해 덮어쓰기에 의해 도입된 새로운 동작에 영향을 줄 수 있습니다.

따라서 이러한 변경은 업데이트 후 진단하기 어려운 오류로 이어질 수 있습니다. 덮어씌운 기능에 대한 좋은 단위 및 통합 테스트가 도움이 될 수 있습니다.

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

## 4. 보안

적절한 보안 조치가 누락된 중요한 메서드나 함수를 덮어쓰면 덮어쓴 버전이 원본과 동일한 보안 관행을 준수하지 않는 경우에 보안 취약점이 발생할 수 있습니다. 함수를 덮어쓰는 경우, 항상 해당 보안 수준을 분석하고 내 버전에 반영하려고 노력하세요. 심지어 개선할 수도 있을지도 모르죠? 실제로, 보안을 강화하기 위해 일부 덮어쓰기가 추가 보안 조치를 구현하는 것을 목표로 합니다.

작업 중인 코드에서 발견한 덮어쓰기를 분석할 때에는 항상 보안에 특별히 주의를 기울이고, 덮어쓴 버전이 충분히 안전한지 확인하세요.

## 5. 성능

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

많은 표준 라이브러리 모듈과 외부 패키지에는 C로 작성된 매우 최적화된 구현이 포함되어 있어, 사용자 정의 Python 코드로 유사한 성능을 달성하기가 어렵거나 불가능할 수도 있습니다. 이러한 최적화가 너무 우수하여, C 확장으로 비슷한 성능을 달성하는 것조차 어려울 뿐만 아니라 향상시키기도 어려울 수 있습니다. 성능이 중요할 때는 이러한 기능을 덮어쓰기 전에 고려해 보세요.

가끔은 단순한 벤치마크가 덮어쓰기가 비효율적이지 않은지 결정하는 데 충분할 수 있습니다. 응용 프로그램에 덮어쓴 함수나 클래스를 유지하기로 선택한 경우, 성능 테스트를 진행하는 것이 좋습니다. 이러한 경우에는 perftester 패키지가 유용한 도구일 수 있습니다. 이 패키지는 실행 시간 및 메모리 사용량 측면에서 벤치마킹 및 성능 테스트를 위한 도구를 제공합니다. 해당 리포지토리의 패키지 설명서를 읽어보세요.

아래 기사는 해당 패키지를 사용한 시간 기반 벤치마킹에 대해 다룹니다:

물론 성능이 중요하지 않다면, 벤치마킹에 미친 듯이 집착할 필요는 없습니다. 그렇다고 완전히 무시해선 안 됩니다. 이러한 경우에도 특정 함수나 클래스를 덮어써서 코드를 천 배 느리게 만들지 않았는지 확인하세요.

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

## 6. 의존성 오해

대규모 프로젝트에서는 의존성을 관리하는 것이 어려울 수 있습니다. 복잡한 환경에서 상호 연결된 의존성을 다루는 것은 이 어려움을 더욱 증가시킬 수도 있습니다. 가끔은 함수나 클래스를 덮어쓰면 이러한 의존성이나 환경 자체가 변경될 수 있습니다. 이는 덮어쓰기를 위해 새로운 의존성을 도입하거나 새로운 함수/클래스가 원본과 다른 import를 필요로 할 때 발생할 수 있습니다.

이러한 변경 사항이 제대로 문서화되지 않고 미래 개발 팀에서 명확히 이해하지 못한다면, 덮어쓴 함수/클래스가 있는 애플리케이션이 원본 함수가 있는 애플리케이션이 아닌 다른 환경에서 실행될 때 문제가 발생할 수 있습니다. 이러한 상황은 복잡성을 증가시킬 수 있습니다.

이 추가된 복잡성이 반드시 문제가 되지는 않지만, 혼동과 오해로 이어질 수 있습니다. 따라서, 덮어쓰기로 인해 애플리케이션에서 발생하는 환경 변경 사항을 문서화하는 것을 기억해 주세요.

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

## 7. 디자인 파괴하기

코드와 응용 프로그램의 디자인은 코드 품질을 보장하는 데 중요한 역할을 합니다. 기술적으로는 불량 및 잘 디자인된 응용 프로그램에서 동일한 기능을 달성하는 것이 가능하지만, 나쁜 디자인은 코드베이스의 가독성을 현저히 감소시키고 복잡성을 증가시키며 취약점을 도입할 수 있습니다. 결과적으로 항상 코드와 응용 프로그램 디자인의 명확성을 추구해야 합니다.

모든 코드 디자인의 중요한 측면은 추상화 계층입니다. 덮어쓰기는 클래스 또는 모듈의 기본 구조를 망치는 일이 될 수 있습니다. 예를 들어, 개인용으로 설계된 클래스 속성(메소드 포함)을 변경하거나 또는 원래 개인적인 속성을 공개적으로 만드는 것을 포함할 수 있습니다. 개발자가 속성을 개인으로 설정할 때 그 뒤에 일반적으로 이유가 있습니다. 일반적으로 사용자에 의해 직접 액세스되지 않도록 의도합니다.

클래스의 개인 속성을 덮어쓰면 원래 개발자가 방지하려고 했던 것을 정확히 하는 것입니다. 때로는 원래 개발자가 계획하지 않은 기능을 달성하기 위해 필요할 수 있지만, 그럼에도 불구하고 이러한 조치는 객체 지향 프로그래밍(OOP)의 기본 원칙에 도전할 수 있어서 불안정한 코드로 이어질 수 있습니다. OOP 원칙을 훼손한다고 생각하는 사람들도 있는데, 이는 강한 표현이지만 무리가 없는 발언입니다.

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

따라서, 속성을 덮어쓰는 것은 OOP의 근본적인 원칙을 위반한다고 생각될 수 있다는 것을 인식하는 것이 중요합니다. 가끔은 속성 하나 대신 클래스 전체를 덮어쓰는 것이 더 나아 보일 수도 있습니다. 그러나 OOP 순수주의자들은 여전히 이를 OOP의 핵심 원칙에 위배된다고 간주할 것입니다.

이 토론에서 저는 절대적인 권장 사항을 제공하는 대신 인식을 높이려고 합니다. 특히 다른 사람이 사용할 수 있도록 설계된 프레임워크나 보통의 Python 코드를 작업할 때 이와 같은 점을 기억해 주시기를 바랍니다.

## 8. 테스트 중의 어려움

이전에 언급했듯이, 덮어쓴 기능에 대한 새로운 단위 및 통합 테스트를 구현하는 것은 효과적이며 종종 필수적인 안전장치입니다. 그러나 기존 기능의 동작을 변경하면 기존 테스트에 영향을 미칠 것이라는 점을 기억하는 것이 중요합니다. 최소한 일부 기존 동작을 고려한 테스트 중 몇 개는 실패해야 합니다. 그리고 그것은 놀랄 일이 아니어야 합니다. 왜냐하면 우리는 다른 동작을 얻기 위해 기능을 덮어썼기 때문입니다. 사실, 이러한 중요한 변경사항 이후에 모든 원래 테스트가 여전히 통과한다면, 원래 테스트가 충분히 설계되지 않았을 수도 있다는 것을 나타낼 수 있습니다.

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

따라서 함수, 클래스 메소드 또는 전체 클래스를 덮어쓸 때는 새로운 테스트를 구현하는 것만큼 원래 테스트를 다시 평가하는 것이 중요합니다. 이를 다양한 방법으로 할 수 있지만, 실패한 테스트를 표시하는 것을 권장합니다. 예를 들어, 아래 Pytest의 foo() 함수 테스트에서 다음을 수행할 수 있습니다:

```js
@pytest.mark.xfail(reason="foo() 덮어쓰기로 인한 실패")
def test_foo_blahblah():
    ...
```

또는, 테스트를 건너뛰도록 선택할 수 있습니다:

```js
@pytest.mark.skip(reason="foo() 덮어쓰기로 인한 실패")
def test_foo_blahblah():
    ...
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

보통 나는 전자의 방식을 선호해요. 왜냐하면 실제로 무언가를 수행하기 때문이죠. 테스트를 건너뛰기만 하는 것이 아니에요. 덮어쓴 기능 때문에 실패할 것으로 예상된 테스트를 표시하는 것은 테스트 자체에 대한 통찰력을 제공해줘요. 만약 원래의 foo() 함수나 새로운 (덮어쓴) 버전 중 하나를 수정한 후에 테스트가 더 이상 실패하지 않으면, 이는 더 깊은 분석이 필요하다는 신호예요. 왜 이전에 실패해야 했는데 더 이상 실패하지 않는 테스트가 있을까요? 이런 미묘한 차이는 단순히 새로운 기능 때문에 테스트를 건너뛰면 놓칠 수 있어요.

이로 인해 테스트 스위트의 복잡성과 전체 코드 베이스의 방식이 증가한다는 것에 유의하세요. 여러 함수, 클래스 및/또는 클래스 메서드를 덮어쓰는 경우를 상상해보세요. 덮어씌운 부분 자체가 그리 복잡하지 않았더라도 테스트 스위트는 훨씬 더 복잡해질 수 있어요. 이것은 코드를 다른 관점에서 바라봐야 한다는 것을 보여줍니다.

따라서, 만약 덮어쓰기를 코드에 그대로 둘 것으로 결정한다면, 해당 테스트를 리팩토링하는 것을 고려해야 해요. 경우에 따라서는 해당 테스트를 건너뛰고 새로운 테스트를 구현하는 것이 나을 수도 있어요. 아니면 이전의 테스트를 완전히 제거하는 것이 좋을지도 모르겠어요 — 덮어쓰기가 일시적인 해결책일 땐 하지 말아야 할 일이죠?

## 9. 디버깅의 어려움

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

앱을 디버깅할 때 덮어씌운 함수, 클래스 및/또는 메서드가 있는 경우 코드의 복잡성 때문에 문제 해결이 더 어려울 수 있습니다. 특히 덮어쓴 함수 또는 메서드 내에 오류가 있는 경우에는 그렇습니다. 덮어쓰기가 잘 문서화되지 않은 경우 특히 더 그럴 수 있습니다.

디버깅을 단순화하는 한 가지 해결책은 정보를 제공하는 사용자 정의 예외 클래스를 정의하는 것일 수 있습니다. 예를 들어, foomodule 모듈의 foo() 함수를 덮어써야 할 필요가 있다면 상상해보십시오. 해당 함수는 세 개의 인수 x, y, z를 가져옵니다. (프로토타입 단계이므로 유형 힌트를 건너 뛸 수 있습니다.) 이것이 메인 진입점에서 함수를 덮어쓰는 방법입니다:

```js
# __main__.py
import foomodule

def foo_overwritten(x, y, z):
    ...

if __name__ == "__main__":
    foomodule.foo = foomodule.foo_overwritten
    foomodule.foo(1, 2, 3) # calls foo_overwritten(1, 2, 3)
```

다음과 같이 할 수 있습니다:

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
# __main__.py
import foomodule

class OverwritingError(Exception):
    ...

def foo_overwritten(x, y, z):
    try:
        ...
    except Exception as e:
        raise OverwritingError(
            f"Overwritten된 foo() 함수에서 오류 발생"
        ) from e

if __name__ == "__main__":
    foomodule.foo = foomodule.foo_overwritten
    foomodule.foo(1, 2, 3) # foo_overwritten(1, 2, 3) 호출
```

만약 원래의 foo() 함수가 예외를 일으키면 일반적인 방식으로 예외가 발생합니다. 그러나 Overwriting된 함수가 예외를 일으키면, OverwritingError가 원래의 예외에서 발생합니다. 따라서 Overwriting된 함수에서 발생한 오류를 즉시 확인할 수 있으며, 예외 메시지를 확인할 수 있습니다.

예외 발생에 대한 일반적인 시나리오입니다. 위 예제에서 모든 foo() 호출은 Overwriting된 버전을 호출하는 것을 의미하지만, 이와 같이 원본과 Overwriting된 버전을 모두 사용하려는 경우가 있습니다. 그렇다면 이 두 버전에서 발생한 예외를 구별할 수 있습니다. 이는 프로세스 중간에 foo() 함수를 덮어쓰는 경우에도 작동합니다:

```js
# __main__.py
import foomodule

class OverwritingError(Exception):
    ...

def foo_overwritten(x, y, z):
    try:
        ...
    except Exception as e:
        raise OverwritingError(
            f"Overwritten된 foo() 함수에서 오류 발생"
        ) from e

if __name__ == "__main__":
    foomodule.foo(1, 2, 3) # FLAG 1: foo(1, 2, 3) 호출
    foomodule.foo = foomodule.foo_overwritten
    foomodule.foo(1, 2, 3) # FLAG 2: foo_overwritten(1, 2, 3) 호출
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

만약 FLAG 1로 표시된 줄을 실행하는 동안 예외가 발생하면, foomodule.foo()에서의 원시 예외가 발생합니다. 그러나 FLAG 2 줄을 실행하는 동안 예외가 발생하면, foomodule.foo()에서는 OverwritingError 및 foo_overwritten() 함수에서 발생한 실제 예외가 발생합니다.

# 개발 도구로서의 덮어쓰기

지금까지 우리는 덮어쓰기를 주로 생산 솔루션으로 논의해왔습니다. 일시적이든 영구적이든 상관없이요. 또한, 논의한 리스크는 이 시나리오를 의미했습니다.

이 섹션에서는 다른 시나리오로서의 덮어쓰기 사용에 대해 이야기하고 싶습니다. 보통 이러한 경우에는 그 정도 리스크를 안고있지 않고, 때로는 전혀 리스크가 없을 수도 있습니다.

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

다음 상황을 상상해보세요. 테스트 파일에서 collections.Counter 클래스를 사용하여 두 리스트를 비교하는 데 사용될 예정인 30개 이상의 어설션을 구현했습니다. 예를 들어 여기에서와 같이요:

```js
>>> from collections import Counter
>>> list_1 = [1, 2, 3, 4]
>>> list_2 = [1, 2, 4, 3]
>>> list_3 = [1, 2, 4, 5]
>>> list_1 == list_2
False
>>> Counter(list_1) == Counter(list_2)
True
>>> list_1 == list_3
False
>>> Counter(list_1) == Counter(list_3)
False
>>> list_2 == list_3
False
>>> Counter(list_2) == Counter(list_3)
False
```

(이 예제에서 사용되는 것보다 더 많은 기능을 제공하는 collections.Counter 클래스가 있습니다. 즉, 두 리스트의 요소를 비교하는 것 등이 가능합니다.)

Counter를 적용한 Counter 인스턴스를 비교하는 것은 요소를 비교하고 순서는 무시한다는 것을 보실 수 있습니다. 따라서 list_1과 list_2가 동일한 요소를 가지고 있더라도 요소의 순서가 다르기 때문에 서로 다르다는 것이죠. 그러나 이들 리스트에 Counter를 적용한 후에 비교하는 경우, 비교 결과는 True를 반환합니다. list_3는 이들 중 양쪽과 다른 요소를 가지고 있기 때문에, list_1 및 list_2로부터 Counter를 적용한 비교에서 실패합니다.

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

이제 특정 시점에 다른 테스트 로직을 확인해보기로 생각했습니다. Counter 클래스를 사용하여 리스트를 비교하는 대신 전통적인 방식으로 비교하고 싶습니다:

```js
>>> list_1 == list_2
False
>>> list_1 == list_3
False
```

위에서 언급한대로 Counter 클래스를 사용하는 30개 이상의 어설션을 가지고 있습니다. 이와 관련된 모든 코드 줄을 수동으로 변경하지 않고 이러한 비교 방법이 어떻게 작동하는지 확인하려면 어떻게 해야 할까요?

하나씩 확인할 수 있습니다. 한편으로, 이는 각 어설션을 개별적으로 확인하기 때문에 좋은 방법일 수 있습니다. 그러나 반대로 이것은 상당히 시간 소요가 될 수 있습니다, 특히 새로운 어설션이 모두 통과하는 경우가 발생할 때. 그렇다면 빠르게 이 작업을 수행할 방법이 있는가요?

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

네, 있습니다. 사실 두 가지 해결책을 생각해 냈습니다. 둘 중 하나는 다른 것보다 나은 방법입니다.

첫 번째 해결책은 조금 거칠어요. 편집기나 IDE에서 Counter를 빈 문자열로 모두 바꿔주면 됩니다 (즉, Counter(list_1)에서 (list_1)으로 바뀝니다). (다만 이 방법은 호출할 때 추가 인수가 필요한 클래스/함수에 사용할 수 없습니다.) 이 방법으로 변경한 버전에서 다시 Counter로 되돌아가고 싶다면 작업을 다시 해야 하는 번거로움이 있습니다. 따라서 동일한 세션에서 작업해야 하며, 대체 모두 도구를 사용한 후에 추가 작업을 수행해서는 안됩니다. 그렇게 되면 모두 다시 해야 하게 됩니다.

솔직히 말해서 이 해결책은 크게 좋아하는 편이 아닙니다. 다소 기계적인 방법이기 때문입니다. 텍스트 편집기/IDE를 사용하여 코드를 변경하게 되는데, 이는 위험성이 따릅니다. 이러한 변경으로 예상치 못한 변화가 발생할 수 있습니다. 예를 들어, 'encounter'라는 함수를 구현하거나 이 이름을 사용하는 변수가 있는 경우, 'encounter'가 'en'으로 변경될 수 있습니다. 따라서 대체 도구를 사용할 때 주의해야 합니다.

대신 덮어쓰기를 사용할 수 있습니다. 이 특정 상황에서는 실제로 매우 간단합니다. Counter(list_1)을 list_1이나 일반적으로 Counter(obj)를 obj와 같은 의미로 만들고 싶은 경우, Counter를 동일한 함수로 덮어씌우면 됩니다. 동일한 함수는 객체(예: obj)를 받아서 변경하지 않은 채로 반환하는 함수입니다. 이를 정의하는 것은 매우 간단합니다.

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
>>> def identity(obj): return obj
```

그러나 identity 함수를 정의할 필요는 없고 collections.Counter 클래스를 덮어쓰기 해야 합니다. 따라서 덮어쓰기를 사용할 테스트 모듈의 imports 블록 바로 뒤에 다음을 수행하는 것이 충분합니다:

```js
... # imports
from collections import Counter
... # imports

Counter = lambda obj: obj
```

당연히 일반적인 def 정의를 사용할 수도 있습니다:

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
... # 가져오기
from collections import Counter
... # 가져오기

def Counter(obj): return obj
```

위와 같이 작성하셨습니다! Counter의 유형이 변경됩니다: 더 이상 클래스가 아니라 함수가 됩니다. 우리의 특정 상황에서는 문제가 되지 않지만, Counter는 호출 가능한 클래스이며, 우리의 코드에서 추가 인수 없이 호출합니다 (즉, Counter(list_1)와 같이 사용)하고 클래스의 다른 메서드를 사용하지 않습니다. 다른 메서드를 사용했다면 더 복잡한 monkey patching을 사용해야 했을 것입니다.

여기까지입니다! 이 매우 간단한 덮어쓰기는 Counter가 작동하는 방식을 변경합니다:

```js
>>> list_1 == list_2
False
>>> Counter(list_1) == Counter(list_2)
True
>>> Counter = lambda obj: obj
>>> list_1 == list_2
False
>>> Counter(list_1) == Counter(list_2)
False
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

물론, 이것은 항상 출력을 변경한다는 것을 의미하지는 않아요:

```js
>>> list_4 = [1, 2, 2, 5]
>>> list_5 = [1, 2, 2, 5]
>>> list_4 == list_5
True
>>> Counter(list_4) == Counter(list_5)
True
>>> Counter = lambda obj: obj
>>> list_1 == list_2
True
>>> Counter(list_1) == Counter(list_2)
True
```

덮어쓰기 기교를 완료하면, Counter의 모든 인스턴스를 제거하거나 원래 코드로 돌아가야 해요. 후자를 위해, Counter의 정의를 아이덴티티 함수로 조작하는 코드 한 줄만 제거하면 됩니다.

이것은 개발 기술에 불과하다는 것을 기억하세요. 얼마나 유혹적인지에 관계없이 실제 코드에서 사용해서는 안 됩니다.

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

이름이 지정된 람다 정의를 사용한 것을 알아 보셨나요? 이것은 제품 코드에서 하지 말아야 할 것이지만, 임시 개발 기술로 이름이 지정된 람다 함수를 사용하는 데는 아무런 문제가 없다고 생각해요. 마찬가지로 임시 데이터 분석 코드에서 사용하는 것이 잘못된 일이라고 보지 않아요.

이런 경우에는 결과에 너무 걱정하실 필요가 없지만, 예외 사항이 있어요. 예를 들어 코드가 제품용 데이터베이스와 통신하는 경우라면, 제품 코드를 작성하거나 개발 목적의 일회성 임시 속임수를 사용하더라도 항상 매우 주의해야 해요.

# 결론

덮어쓰기가 종종 해킹으로 여겨지기도 하지만 항상 그런 것은 아니에요. 개발자의 도구 세트에서 표준적이고 귀중한 도구가 될 수 있어요. 그러나 단순 변수 외의 복잡한 객체에 덮어쓰기를 사용하는 경우에는 기본적인 조건을 기억해야 해요. 개발 목적의 일시적인 해결책이 아닌 경우, 덮어쓰기의 각 인스턴스는 충분히 문서화되고 명확하고 포괄적인 테스트로 처리되어야 해요.

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

새로운 callable 객체를 덮어쓰는 아이디어가 떠오를 때, 저는 원본 구현을 이해하기 위해 노력합니다. 이를 이해하지 않으면 덮어쓰기가 무엇을 하는지, 그리고 왜 원본 버전과는 다르게 동작하는지 이해할 수 없을 것입니다.

맥락과 원본 함수를 이해한 후, 덮어쓰기의 목적과 덮어쓰기가 정말 가장 좋은 방법인지 파악하려고 합니다. 함수를 다시 정의하거나 메서드를 서브클래싱하는 것으로 동일한 결과를 얻을 수 있을지 생각해 봅니다. 또는 callable 인스턴스를 가진 클래스에 메서드를 추가하는 등의 방식으로 기능을 확장할 수 있을지도 모릅니다.

아직도 덮어쓰기가 최선의 해결책으로 보인다면, 이에 따른 위험과 결과를 고려합니다. 이는 심각한 사고 과정처럼 보일 수도 있지만, 사실 그렇습니다. 덮어쓰기의 장단점을 따져 봐야 합니다. 장점이 단점을 상회하고 위험이 심하지 않다고 판단되면 사용하기로 결정합니다. 상황이 명확하지 않을 때도... 결정은 필요합니다. 혼자 작업하는 경우에는 본능에 귀를 기울이세요. 팀 프로젝트인 경우, 덮어쓰기가 중요한 변화처럼 보일 때는 팀원들과 상의하는 것이 항상 좋은 생각입니다.

이 글을 계획할 때, 상당히 간단할 것으로 예상했습니다. 덮어쓰기의 위험에 대해 얼마나 많은 얘기를 할 수 있겠는가? 그러나 주제에 더 깊이 파고들수록 그 안에 복잡한 부분들을 보게 되었습니다.

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

만약 코딩 기법으로 덮어쓰기를 주의 깊게 살펴보면, 첫눈에 보이는 것보다 더 위험할 수 있다는 것을 알 수 있죠? 그래서 이 글의 주요 목적은 파이썬에서 객체를 덮어쓰고 싶다면 신중히 생각해야 한다는 것을 설득하는 것이었습니다. 만약 그렇게 하기로 결정한다면, 덮어쓰기를 주의 깊게 실행하고, 테스트 스위트의 해당 부분을 재설계하고 확장하며, 덮어쓰기의 이유를 문서화하여 설명하는 것이 중요합니다.

일시적 개발 기법으로 덮어쓰기를 사용하는 것을 넘어서 조심해야 할 사항이 몇 가지 있을 수 있습니다. 예를 들어, 잘 알려진 데코레이터를 표준 사용 사례로 사용하는 경우, 그다지 신중하지 않아도 될 수도 있습니다. 이 규칙은 모든 데코레이터에 대한 보편적인 것이 아니지만, 널리 사용되는 것들에 해당합니다. 사용자가 코드가 무슨 일이 일어나고 있는지 이해하지 못하게 만드는 것을 피하기 위해 사용자 정의 데코레이터는 투명성과 명확성을 요구합니다. 여기서 "경솔한 것 보다는 안전한 것이 좋다" 원칙이 적용됩니다: 데코레이터를 설명하는 한 두 문장을 더 쓰는 것이 사용자가 무슨 일이 일어나고 있는지 이해하지 못할 위험을 감수하는 것보다 낫습니다.

저는 파이썬에서 객체를 덮어쓰지 말 것을 설득하려고 한 것이 아닙니다. 그 반대로, 저는 덮어쓰기를 굉장히 강력한 파이썬 프로그래밍 도구로 보지만 동시에 도전적이고 책임 있는 도구로도 보고 있습니다. 강력한 도구는 종종 부작용을 일으킬 수 있으며, 덮어쓰기도 그러한 부작용을 가질 수 있습니다. 그래서 제 조언은 다음과 같습니다: 덮어쓰기를 두려워하지 마세요, 하지만 사용할 때 조심하세요. 먼저 생각하고, 그런 다음 덮어씁니다.
