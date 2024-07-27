---
title: "당신의 Python 코드를 쉽게 개선할 수 있는 7가지 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-7SimpleWaysToDrasticallyImproveYourPythonCode_0.png"
date: 2024-07-09 19:45
ogImage:
  url: /assets/img/2024-07-09-7SimpleWaysToDrasticallyImproveYourPythonCode_0.png
tag: Tech
originalTitle: "7 Simple Ways To Drastically Improve Your Python Code"
link: "https://medium.com/chifi-media/7-simple-ways-to-drastically-improve-your-python-code-1cc544e2aa7b"
---

<img src="/TIL/assets/img/2024-07-09-7SimpleWaysToDrasticallyImproveYourPythonCode_0.png" />

## 소개

파이썬은 데이터 과학과 함께 올라와 프로그래밍 세계에서 인기를 얻었는데, 이에는 아주 좋은 이유가 있습니다. 이 언어에는 C와 밀접한 연계성과 다양한 문제를 원활하게 해결하기 위한 적절한 타입 및 함수 시스템을 포함한 여러 이점이 있습니다. 이러한 이점 중 하나는 파이썬이 작성, 학습 및 해독이 굉장히 쉬운 언어임에 틀림없습니다. 이로 인해 파이썬은 대부분의 기본 계산 작업에 대한 고수준 스크립팅 언어로 변모했습니다.

파이썬의 사용 편의성은 특히 데이터에 보다 집중하고 싶은 과학자들이나 구문에 덜 관심을 갖고 싶은 초보 프로그래머들을 위한 매력적인 선택지가 됩니다. 그러나 사용 편의성과 접근성과 함께 성능에 주목할 필요가 있습니다. 또한 파이썬 같은 스크립팅 언어는 일반적으로 방법을 잘못 사용하더라도 파악하지 못하거나 직면할 필요가 없는 공간을 훨씬 더 많이 제공하는 경향이 있습니다. 다행히도 새로운 파이썬 사용자들을 위해서 파이썬은 광범위한 기능을 도입하여 사용하기 쉽고 동적으로 타입이 지정된 스크립팅 언어의 단점을 완화할 수 있었습니다. 좋은 프로그래밍 관행과 함께 파이썬의 타입 시스템과 생태계를 효과적으로 활용함으로써 파이썬의 다양한 단점을 완화하고 해당 언어에서 훨씬 더 나은 코드를 작성할 수 있습니다.

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

## 추상화

어떤 객체 지향 프로그래밍 언어에서 가장 먼저 이야기해야 하는 것은 추상화입니다. 추상화는 상속을 사용하여 훨씬 더 많은 기능을 더 적은 코드로 만들 수 있는 일반적인 프로그래밍 개념입니다. 상속은 추상화를 용이하게 하는 방법으로, 하위 클래스를 통해 기능을 전파하는 클래스 유형이 있는 방식입니다. 이것이 추상화 개념의 원래 출발점이자 객체 지향 프로그래밍 개념의 기반이 됩니다. 여기서 "메서드"는 해당 유형에 적합하게 설계된 클래스의 내부 함수를 의미합니다.

추상화는 많은 다른 유형과 함께 사용할 수 있는 일반적인 함수를 만들 수 있게 해줍니다. 이게 바로 계층적 하위 클래스를 사용하여 어떤 유형인지 결정할 수 있는 것입니다. 이것은 다형성이라고도 하며, 하나의 서브루틴으로 여러 유형의 데이터 구조를 '변형'할 수 있는 능력을 의미합니다. Python에서는 메서드와 속성이 클래스를 구성합니다. 그런 다음 이 클래스의 하위 클래스가 될 수 있으며, 속성과 메서드를 상속받을 수 있습니다. 이것이 상속이라고 하며, Simula 시뮬레이션 언어에서 공개된 추상화 개념의 원조입니다.

프로그래머로서 들을 수 있는 일반적인 조언 중 하나는 "일반적인 함수를 작성하라"는 것입니다. 이 조언은 의미가 있습니다. 함수가 보다 일반적일수록 프로젝트에 최종적으로 들어가는 코드가 적어집니다. 이는 또한 사물이 파괴될 기회가 적어지고, 파괴된 경우에는 해결책을 형성하기 위해 한 곳만 살펴보면 되는 것을 의미합니다. 그러나 이 조언에서 종종 빠지는 중요한 부분은 일반적인 함수를 계층적 추상화 수준으로 설계해야 한다는 것입니다. 다시 말해, 우리는 모든 차량을 위해 함수를 작성하고, 필요한 경우에만 트럭을 위한 함수를 작성해야 합니다.

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

이렇게 보면, 파이썬이 제공하는 기능과 메서드 기능도 자연스럽게 패턴이 있는 것 같아요. 함수는 매우 일반적인 호출에 사용하고, 메서드는 특정 유형의 호출에 더 적합하며 특히 상속을 원하는 경우 더 좋아요. Python에서 추상화 기법을 사용하려면, 우선 클래스를 만들어야 해요:

```python
class Car:
    def __init__(self, name, color: str):
        self.name = name
        self.color = color
    def honk(self):
        print(self.name + " has just honked at us in their " + self.color + " car")
```

이 간단한 클래스에는 name 및 color 속성과 honk 메서드가 있습니다. 자동차를 만들고 honk 메서드를 호출하면 작은 메시지가 출력됩니다.

```python
mycar = Car("the mystery machine", "green, flower-covered")
mycar.honk()

the mystery machine has just honked at us in their green, flower-covered car
선택이 삭제됨
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

이것은 좋아요. 하지만 저는 트럭도 가지고 있어요. 제가 시골 소녀니까요. 그래서 우리는 트럭을 만들어야 할 거예요. 괄호 안에 Car 클래스를 Truck 클래스에 제공해주면 Car의 모든 속성과 메소드를 상속받을 수 있어요. 데이터인 이름과 색깔은 같이 저장하지만, 우리의 honk 메소드는 Car의 버전이 차량이 Car임을 언급하기 때문에 변경되어야 해요. 따라서 이를 고려하여, 우리는 서브 클래스에 새로운 메소드를 작성함으로써 상속된 메소드를 오버로드할 수 있어요.

```js
class Truck(Car):
    def honk(self):
        print(self.name + " has just honked at us in their " + self.color + " truck")
```

추상화하지 않은 경우 이 코드는 다음과 같아요:

```js
class Truck(Car):
    def __init__(self, name, color : str):
        self.name = name
        self.color = color
    def honk(self):
        print(self.name + " has just honked at us in their " + self.color + " truck")
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

```python
mytruck = Truck("my large truck", "red")
mytruck.honk()

my large truck가 빨간 트럭으로 우리에게 경적을 울렸어요
```

우리는 완전히 새로운 Car를 생성할 수도 있습니다. 여기서 중요한 점은 pass 키워드를 사용하여 Python의 들여쓰기 문법을 활용해 생성자를 이름만 정의하는 것입니다.

```python
class Sedan(Car):
    pass
```

훨씬 큰 사용 사례에서 추상화가 Python에서 훌륭한 코드를 작성하는 데 절대적으로 필요한 이유를 이해하기 쉽습니다. 다행히 이 기술은 사용하기 매우 쉽습니다, 그리고 제가 논의하고 싶은 다음 기술도 마찬가지입니다.

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

## 표현식들

파이썬과 유사한 많은 다양한 스크립팅 언어를 사용한 후에 얘기하지만, 표현식들이 이런 언어에서 작업할 때 가장 귀중한 자산 중 하나라는 걸 자신 있게 말씀드릴 수 있어요. 표현식들은 제너레이터, 리스트 및 기타 유형을 아주 간결하고 효과적으로 생성하는 방법입니다. 일반적으로 기존의 for 루프를 통해 작성되는 것과 같은 형태로 구성될 수 있는 요소들을 생성하는 방법입니다. 예를 들어, 1부터 30까지의 제곱을 생성하는 다음 예제를 고려해보세요:

```js
values = []
for x in range(1, 30):
    values.append(x ** 2)
```

이것은 for 루프 방식으로, 이는 파이썬에서 반복 가능한 요소와 함께 작업하는 핵심적인 방법입니다. 이 접근 방식의 for 루프 버전은 리스트를 초기화하고 각 반복에서 해당 리스트에 새 요소를 추가하는 것을 요구합니다. 이 방식은 효율적이지만, 요소를 생성하는 데 제너레이터를 사용하는 것만큼 효과적이지는 않습니다. 후자는 더 간결할 뿐만 아니라 성능도 더 나아집니다. 위 예제의 코드는 간단한 리스트 표현식으로 한 줄로 변환됩니다. 제너레이터를 생성하려면 사실상 역방향 for 루프를 작성하고 리스트 구분 기호로 둘러싸면 됩니다.

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
values = [x ** 2 for x in range(1, 30)]
```

위에 대한 설명은 지능 표현식 또는 생성기가 다음 반복 단계의 실행에 매핑된 반환을 만들기위한 함수를 만들어 냄을 의미합니다. 좀 더 간단한 용어로 설명하면, 생성기는 함수에서 반복자를 통해 반환을 만들기 위해 특별히 만들어지는 반면 for 루프는 더 개방적이며 단순히 반복자를 만듭니다. 이로 인해 Python에서 작업을 크게 빠르게 만들며 코드를 훨씬 더 간결하게 만듭니다. 그러나 각 요소에 대해 반환을 기대하지 않는 경우에는 다른 방법을 사용하는 것이 더 나을 수 있습니다.

## 람다 및 맵

Python 코드를 극적으로 개선하는 다음 간단한 기술은 iterable의 요소들을 횡단하여 함수를 호출하는 조합인 람다와 맵을 사용하는 것입니다. 현재 Python의 가장 일반적인 응용 분야가 과학 컴퓨팅이라는 점을 고려하면, 람다와 맵은 놀라울 만큼 많이 사용되는 Python 기능입니다. 둘의 다양성은 많은 다른 도메인에서 함께 기능을 통해 뛰어나기 때문에, 이 기술은 확실히 알아두어야 할 가치가 있습니다. 특히 데이터 과학을 위해 Python 언어를 사용하는 사람들뿐만 아니라요.

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

Lambda는 호출 가능한 함수 유형으로 신속하게 표현식을 작성하는 데 사용됩니다. 이를 통해 간단한 클로저 함수를 생성할 수 있습니다. 이 함수들은 인수로 제공되어 다양한 가능성을 제공할 수 있습니다. Python에서 람다를 사용하는 것은 비교적 간단합니다. 람다 키워드에 인수를 제공한 다음 콜론과 함수의 논리를 추가합니다.

```js
f = lambda x: x + 5
f(5)

10
```

이 개념은 함수를 생성하는 능력 때문에 상당히 강력합니다. 그러나 이 기술이 빛나는 한 가지 맥락은 이러한 함수들을 반복 가능한 객체에 매핑하는 것입니다. 이를 통해 생성기와 연관된 생성 측면 없이 배열을 변경할 수 있습니다. 이 경우 함수는 몇 가지 차이점이 있는 생성기와 유사한 기능을 만들기 위해 요소를 직접 제공받습니다.

```js
f = lambda x: x ** 2

m = map(f, values)
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

우리가 맵을 사용하여 함수를 값에 매핑하면 맵을 단순히 리스트로 캐스팅하여 제곱된 배열을 얻을 수 있습니다:

```js
squared = list(m)
[6,
 9,
 14,
 21,
 30,
 41,
 54,
 69,
 86,
 105,
....
```

이 두 가지를 결합함으로써 코드를 압축하는 방법이 얼마나 쉬운지 알 수 있습니다!

## 추출

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

다음 소프트웨어를 개선하는 방법은 일반적으로 우수한 프로그래밍 조언입니다. 추출 기술은 대규모 하위 루틴에서 코드를 추출하여 작은 하위 루틴의 시리즈로 압축하는 실천 방법입니다. 전체 작업을 처리하는 하나의 함수를 작성하는 대신 해당 작업의 각 단계는 프로젝트 내의 다른 함수로 전달됩니다. 이 기술에 대해 중요성과 중요성을 노래한 몇 가지 기사를 작성했습니다. 위대한 소프트웨어 공학 프로젝트를 만들 때 매우 중요합니다.

```python
def quiz_user():
    correct = []
    print("이름은 뭐에요?")
    x = input()
    print("2 + 2는 뭐에요?")
    answer = input()

    if answer == "4":
        print("정답")
        correct.append(True)
    else:
        print("틀렸어요.")
        correct.append(False)

    print("하늘의 색깔은 뭐에요?")
    answer = input()

    if answer == "파란색":
        print("정답")
        correct.append(True)
    else:
        print("틀렸어요.")
        correct.append(False)

    return correct
```

이 함수에는 여러 단계가 포함되어 있고 최종적으로 이름이 시행하는 것 이상을 수행합니다. 이는 이상적이지 않습니다. 각 함수가 직접적으로 작업을 수행하도록 원합니다. 그리고 목적 외 작은 작업은 함수 바깥에 두는 것이 좋습니다. 추출 프로세스는 몇 가지 핵심 단계로 수행됩니다. 첫 번째 단계에서 함수의 다른 부분과 입력 및 출력을 고려합니다. 함수를 그룹화한 후에는 함수를 함수 밖으로 추출하고 함수를 호출합니다. 이 특정 상황에서는 더 다재다능한 질문 요청 함수를 만드는 것이 더 적합할 수 있지만, 이 경우에는 각각의 출력이 알고리즘 과정의 새로운 단계인 것처럼 가정하여 함수의 반환을 생성합니다.

```python
def ask_name():
    print("이름은 뭐에요?")
    x = input()
    print("안녕 " + x)
    return x

def question1():
    print("2 + 2는 뭐에요?")
    answer = input()

    if answer == "4":
        print("정답")
        return True
    else:
        print("틀렸어요.")
        return False

def question2():
    print("하늘의 색깔은 뭐에요?")
    answer = input()

    if answer == "파란색":
        print("정답")
        return True
    else:
        print("틀렸어요.")
        return False

def quiz_user():
    correct = []
    ask_name()
    correct = [f() for f in (question1, question2)]
    return correct
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

추출 기술을 사용하면 코드를 다양한 방법으로 개선할 수 있어요. 먼저, 함수를 작성할 때 코드를 함수 내에서 재사용할 수 있어요. 특정 알고리즘을 더 큰 함수 내에 그대로 두면, 전혀 다른 목적을 가진 코드 일부에 액세스하지 못할 수도 있어요. 추출 사용의 또 다른 이점은 프로젝트가 훨씬 더 조직적으로 됩니다. 함수는 짧고 중첩을 최소화하는 것이 좋아요. 이 모든 것은 논리적인 코드를 고유한 범위로 가져오는 것이 종종 매우 좋은 선택이 될 수 있다는 것을 말해요.

## del

다음으로 논의하고 싶은 파이썬 기능은 'del' 입니다. 이 키워드는 파이썬 객체를 메모리에서 제거하는 데 사용됩니다. 첫눈에는 그다지 중요하지 않아 보이지만, 파이썬이 사용하기 쉬운 스크립트 언어이기 때문에 가능한 한 자주 사용하고 싶은 파이썬 기능 중 하나에요. 'del'은 종종 간과되지만, 이 기능은 메모리를 보존하는 데 매우 도움이 될 수 있어요.

```js
del squared
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

파이썬과 같은 스크립트 언어에서는 메모리 및 성능 관리 방법이 더 제한적이기 때문에 계산 시간을 단축하고 메모리를 해제하는 데 도움이 되는 모든 것을 활용하고 싶을 것입니다. 파이썬은 사실 유사한 스크립트 언어들 중에서 적어도 힙에서 빠르게 무언가를 제거하고 가비지 수집하는 키워드 del 이 하나는 있어서 어느 정도 독특합니다. 그런 관점에서 이 기능을 확실히 활용하고 싶습니다.

## break 와 continue

당신의 도구 상자에 꼭 있어야 할 또 다른 중요한 기술은 break 와 continue 키워드입니다. 이 두 키워드는 모두 반복적 루프 문맥에서 특히 사용되며, 반복적 루프를 더 최적화하기 위해 break 를 사용하여 반복을 중단하거나 continue 를 사용하여 다음 요소로 건너뛸 수 있습니다.

```js
mydata = [None, None, 55, 22, 33, 44, None, 2, None, 73, 22, None, None, None, 36, "stop here please", 23]
newvalues = []
for x in mydata:
    if x == None:
        continue
    elif x == "stop here please":
        break
    newvalues.append(x)

newvalues
[55, 22, 33, 44, 2, 73, 22, 36]
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

당연히, break와 continue는 각각 자신의 사용 사례를 가지고 있습니다. 예를 들어 조건부로 특정 요소에 대해 작업하고 싶을 때를 생각해보세요. 이러한 키워드에는 끝이 없는 사용 방법이 있으며, 여러분의 도구 상자에 이러한 간단한 도구들을 유지하는 것이 좋은 아이디어입니다.

## else는 최대한 사용을 줄입니다

코드 개선에 관한 참고 사항으로 다룰 마지막 주제는 else를 최대한 줄이는 방법입니다. 저는 큰 else 문과 중첩된 조건문 같은 것은 가능한 한 피해야 한다고 생각합니다. else 자체가 서브루틴이라는 것을 이해해야 합니다. 이것은 우리 함수 아래에서 정의된 완전히 독립적인 스코프의 또 다른 레이어입니다. else 키워드를 사용하는 많은 경우가 있지만, 우리 코드를 더 읽기 쉽고 기능적으로 더 효율적으로 만들기 위해 사용하지 않아야 할 때도 있습니다.

```js
class Pump:
    def __init__(self):
        self.pumping = False

def activate_lights():
    print("the lights are on")

mainvalve = Pump()

def turn_on_pump():
    mainvalve.pumping = True

def turn_switch(has_power: bool):
    if not has_power:
        print("there is no power")
    else:
        activate_lights()
        turn_on_pump()
        if mainvalve.pumping == False:
            print("error turning on the pump")
        else:
            print("the pump is on!")
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

이 경우에는 기본적으로 else 아래에서 함수를 계속 진행합니다. 이 접근 방식에는 여러 가지 단점이 있습니다. 먼저, 똑같은 것을 두 번 프로그래밍할 가능성이 훨씬 커집니다. 이것은 이 글의 방법론 중 하나인데, 우리는 그렇게 하고 싶지 않습니다.

```js
def turn_switch(has_power: bool):
    if not has_power:
        print("전원이 없습니다")
    else:
        activate_lights()
        turn_on_pump()
        if mainvalve.pumping == False:
            print("펌프 작동 오류")
        else:
            print("펌프가 작동 중입니다!")
```

```js
def turn_switch(has_power: bool):
    if not has_power:
        print("전원이 없습니다")
        return
    activate_lights()
    turn_on_pump()
    if mainvalve.pumping == False:
        print("펌프 작동 오류")
        return
        print("펌프가 작동 중입니다!")
```

또한 위의 경우에는 언젠가는 조건부 내부에서 사용되는 변수를 할당해야 할 것입니다. 이 값은 조건부 외부에서 사용할 계획이 있다면 함수의 비공개 범위에 유지하는 것이 훨씬 더 합리적입니다. 조건부 내부에서 변수를 새로 할당할 수 없으며, 조건부는 루프와 마찬가지로 다른 렉시컬 범위를 추가합니다. 이러한 점을 고려하면 이러한 범위를 설정하고 데이터를 전달하는 데 시간이 걸립니다. 몇몇 부적절한 조건부는 큰 문제를 일으키지 않을 수 있지만, 추가적인 중첩 및 더 많은 호출은 항상 성능을 저하시킵니다. 최적의 성능은 Python과 같은 언어에서 더욱 중요합니다. 우리는 Python의 속도 신뢰성이 C와 같은 것에 비하면 그리 높지 않기 때문에 실제 작성한 대부분의 Python 코드가 가능한 최적화되도록 하려고 할 것입니다.

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

다른 경우마다 else를 사용해서는 안 된다는 이유에도 불구하고, else에는 사용할 때의 이유가 있습니다. 특히 모든 조건문 뒤에 기본적으로 else를 사용하는 것은 일반적인 코딩 방식이기 때문에, 그 사용 사례가 else를 사용해야 하는 경우에 대해 명확하게 표현해야 합니다. 전자를 사용하는 것이 더 나은 점이 있다고 생각해요.

## 결론

파이썬의 성공은 확실히 사용 편의성과 접근성에 기인합니다. 다른 언어들처럼 단점이 없는 것은 아니지만, 파이썬이 인기를 얻은 이유를 쉽게 이해할 수 있습니다. 특히 파이썬을 주로 사용하는 분야를 고려하면 더 그렇습니다. 파이썬의 접근성 중 하나인 단점은, 사용자가 놓치기 쉬운 기능들이 있어서 입니다. 예를 들어, 누군가는 오랜 시간 동안 파이썬을 사용했지만 pipenv를 어떻게 사용해야 하는지 모르는 경우가 있을 수 있습니다.

다행히도 시간이 흘러가며 프로그래밍 실력은 향상되고 지식이 쌓입니다. 파이썬은 쉽게 시작할 수 있는 언어이지만, 정말 멋진 기능들을 발견하려면 조금의 연구가 필요합니다. 지속적인 발전을 위해 더 나은 코딩 습관을 습득하는 것은 좋은 생각입니다. 우리는 프로그래머로써 항상成長해야 하며, 우리는 삶을 살아가며 배우고 가르치고 원하는 것을 만드는 시간이 제한되어 있습니다. 우리가 원하는 것이 무엇이든 상관없이 배울 시간을 갖도록 하자는 것이 중요합니다. 우수한 프로그래머가 되는 가장 놀라운 점은 극적인 표현력으로 주변 모두에게 이익이 되는 것입니다. 마치 관객들이 모두 팬인 거리 공연자와 같이요. 오늘날 파이썬을 잘 배운 것은 극히 중요하기 때문에, 적어도 나의 프로그래밍에 대한 분명하고 구체적인 조언을 나눌 수 있어서 기쁩니다!
