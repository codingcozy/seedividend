---
title: "더 나은 프로그래머가 되는 10가지 팁"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-BecomeaBetterCoder10Tips_0.png"
date: 2024-07-09 14:47
ogImage:
  url: /assets/img/2024-07-09-BecomeaBetterCoder10Tips_0.png
tag: Tech
originalTitle: "Become a Better Coder: 10 Tips"
link: "https://medium.com/@deasadiqbal/become-a-better-coder-10-tips-fa81f732a624"
---

위반 시 해고 조치를 받을 수 있습니다.

![이미지](/TIL/assets/img/2024-07-09-BecomeaBetterCoder10Tips_0.png)

수백 개, 아니면 수천 개의 Python 최상의 관례들이 있습니다. 누구든 물으면 약간 다른 버전의 관례를 듣게 될 것입니다.

인터넷은 모든 사람이 의견을 표현할 권리를 주었습니다. 심지어 제게도요. 그러나 이 글에서는 절대로 변할 수 없는 20가지 Python 최상의 관례에 대해 다룰 것입니다.

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

## 팁 1: 함수는 매개변수와 반환 유형을 명시해야 합니다

함수를 정의할 때, 매개변수의 유형과 함수의 결과가 반환하는 데이터 유형을 항상 명시하는 것이 좋습니다. 이렇게 하면 당신과 팀의 개발자들이 항상 시각적으로 이해를 얻기 위해 print 문을 사용하지 않고도 무엇을 기대해야 하는지 알 수 있습니다.

좋은 예시:

```js
def greet(name: str) -> None:
  """사용자를 이름으로 인사합니다."""
  print(f"안녕, {name}!")

def calculate_area(length: int, width: int) -> int:
  """사각형의 면적을 계산합니다."""
  area = length * width
  return area
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

좋은 점:

```python
def do_something():
  print("이 함수는 어떤 일을 수행하지만 무엇을 하는 지 명확하지 않아요!")

# 함수 호출
do_something("이것은 실수입니다!")  # 오류를 발생시킬 수 있어요
```

## 팁 2: 함수는 동일한 추상화 수준에 있어야 합니다

함수가 동일한 추상화 수준에 있을 때, 우리는 함수가 단일하고 명확한 작업을 수행해야 한다는 것을 의미합니다. 해당 작업은 함수 내에서 일관된 추상화 수준이어야 합니다. 다시 말해, 함수는 특정 세부 수준이나 복잡성에 집중해야 하며, 모든 함수의 작업은 해당 동일한 수준에서 작동해야 합니다.

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

좋은 예시:

```python
def calculate_average(numbers):
    total = sum(numbers)
    count = len(numbers)
    average = total / count
    return average
```

나쁜 예시:

```python
def get_numbers():
    numbers = [2, 3, 4, 1, 4, 1, 416, 6]
    return numbers

def calculate_average():
    numbers = get_numbers()
    numbers_plus_30 = [num + 30 for num in numbers]

    total = sum(numbers_plus_30)
    count = len(numbers)
    average = total / count
    return average

calculate_average()
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

## 팁 3: 함수는 작게 작성하세요

함수는 재사용 가능하도록 의도되었습니다. 그리고 함수가 커질수록 재사용 가능성이 줄어듭니다. 이는 함수가 하나의 일만 수행해야 하는 이유와도 관련이 있습니다. 함수가 하나의 일만 한다면, 그 함수가 작을 가능성이 높습니다.

## 팁 4: 개방 폐쇄 원칙

개방 폐쇄 원칙(Open Closed Principle, OCP)은 클래스, 메소드 또는 함수는 확장에 대해 열려 있어야 하지만 수정에 대해서는 닫혀 있어야 한다는 원칙입니다. 이는 정의된 클래스, 메소드 또는 함수가 코드를 변경하지 않고도 쉽게 재사용하거나 여러 인스턴스에 대해 확장할 수 있어야 한다는 것을 의미합니다.

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

예를 들어, 주소라는 클래스가 있다고 가정해 봅시다.

```js
class Address:
    def __init__(self, country):
        self.country = country

    def get_capital(self):
        if self.country == 'canada':
            return "ottawa"
        if self.country == 'america':
            return "Washington D.C"
        if self.country == 'united Kingdom':
            return "London"

address = Address('united Kingdom')
print(address.get_capital())
```

이 코드는 OCP를 따르지 못합니다. 새로운 국가가 추가될 때마다 해당 국가에 대한 if 문을 새로 작성해야 합니다. 지금은 간단해 보일 수 있지만, 상상해 보세요. 100개 이상의 국가를 고려해야 한다면 어떻게 될까요?

이것이 바로 OCP가 필요한 이유입니다.

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
capitals = {
    'canada': "Ottawa",
    'america': "Washington D.C",
    'united Kingdom': "London"
}

class Address:
    def __init__(self, country):
        self.country = country

    def get_capital(self):
        return capitals.get(self.country, "Capital not found")

address = Address('united Kingdom')
print(address.get_capital())
```

## 팁 5: 가능하면 주석을 피하세요

주석은 가짜 진실의 모습을 취할 수 있습니다. 코드가 실제로 무엇을 하는지에서 다른 사람이 말한 것이 무엇인지로 독자의 마음을 벗어나게 합니다.

시간이 흐르고 코드가 업데이트나 변경을 받는 경우에 매우 문제가 될 수 있습니다. 어느 순간 주석은 거짓이 되고 모두가 이제 모두가 거짓을 통해 진실을 관찰해야 합니다.

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

코멘트는 가능하면 피해야 합니다. 코멘트는 독자가 과거의 여러분의 사고를 상속하도록 강요합니다. 함수나 클래스가 변경된 경우, 대부분 코멘트는 함께 변경되지 않습니다. 대부분 코멘트는 독자가 앞으로 생각하는 것을 방해합니다.

코멘트는 작성자가 명확하고 설명적인 클래스, 함수 또는 변수 이름을 제공할 능력이 부족했음을 의미합니다. 이는 프로그래머의 태도가 열악하다는 것을 드러내며, 팀이 그러한 태도를 상속하도록 강요합니다.

## 팁 6: 매직 넘버를 피하세요

매직 넘버는 나중에 변경될 수 있는 하드코딩된 값입니다. 그러나 이는 업데이트하기 어려울 수도 있습니다.

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

예를 들어, "Your Orders" 개요 페이지에 표시되는 마지막 50개 주문이 있는 페이지가 있다고 가정해 보겠습니다. 여기서 50은 '매직 넘버'입니다. 즉, 표준 또는 관례를 통해 설정된 숫자가 아니라 규격에 명시된 이유에 따라 임의로 설정한 숫자입니다.

이제 50이 다양한 위치에 있습니다 — SQL 스크립트( SELECT TOP 50 \* FROM orders), 웹사이트(Your Last 50 Orders), 주문 로그인(for (i = 0; i < 50; i++)) 및 가능한 많은 다른 위치에 있습니다.

좋은 방법:

```js
NUM_OF_ORDERS = 50
SELECT TOP NUM_OF_ORDERS * FROM orders
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

좋지 않은 방법:

```js
SELECT TOP 50 * FROM orders
```

## 팁 7: 깊은 중첩 피하기

루프, 조건문 또는 함수 내에서 중첩된 수준을 제한하여 가독성을 향상시키세요.

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

좋아요:

```js
if x and y:
    do_something()
```

나쁘죠:

```js
if x:
    if y:
        do_something()
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

## 팁 8: 경로 하드코딩을 피하세요

파일 경로나 URL을 하드코딩하는 것을 피하고, 대신 설정 파일이나 환경 변수를 사용하세요.

좋은 예시:

```js
import os
file_path = os.getenv("FILE_PATH")
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

좋은 점 9: 클래스는 작아야 해요

그렇다! 클래스도 가능한 작아야 해요. 함수처럼 말이죠.

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

함수의 크기는 해당 함수의 라인 수에 의해 결정되지만, 클래스의 크기는 해당 클래스가 가진 책임의 수에 의해 결정됩니다.

일반적으로, 클래스 이름은 해당 클래스가 가질 수 있는 책임의 종류를 나타냅니다. 그러나 이름이 모호하거나 너무 일반적일 때는 대부분 해당 클래스에 너무 많은 책임을 부여하고 있는 것입니다.

이는 SRP (단일 책임 원칙)로 돌아가게 됩니다. 이 원칙에 따르면 클래스는 변경되어야 하는 이유 즉, 하나의 책임만 가져야 합니다.

## 팁 10: 복잡한 삼항 표현식을 피하세요

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

너무 복잡한 삼항식 사용을 최대한 자제해주세요. 코드를 이해하기 쉽도록 가독성을 우선시하여 작성해주세요.

좋은 예시:

```js
if number % 2 == 0:
    result = "even"
elif number % 3 == 0:
    result = "odd"
else:
    result = "neither"
```

나쁜 예시:

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
result = "even" if number % 2 == 0 else "odd" if number % 3 == 0 else "neither"
```

읽어 주셔서 감사합니다!✨ 만약 내 컨텐츠가 마음에 들고 나를 지원하고 싶다면, Patreon에서 나를 지원하는 가장 좋은 방법 —

- 더 많은 컨텐츠는 DeepNexus에서 확인하기 🚀
- 팔로우하기: LinkedIn | YouTube✅ | Github
- 기계 학습 및 딥 러닝에서 도움이 필요하다면, 내 Fiverr ✔서비스를 확인하고 Upwork에서 연락해요!
