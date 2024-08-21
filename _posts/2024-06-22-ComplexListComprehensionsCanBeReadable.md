---
title: "복잡한 리스트 컴프리헨션도 읽기 쉽게 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-ComplexListComprehensionsCanBeReadable_0.png"
date: 2024-06-22 14:18
ogImage:
  url: /assets/img/2024-06-22-ComplexListComprehensionsCanBeReadable_0.png
tag: Tech
originalTitle: "Complex List Comprehensions Can Be Readable!"
link: "https://medium.com/towards-data-science/complex-list-comprehensions-can-be-readable-b6c657622910"
isUpdated: true
---

## PYTHON PROGRAMMING

![image](/assets/img/2024-06-22-ComplexListComprehensionsCanBeReadable_0.png)

Python comprehensions — including list, dictionary, and set comprehensions as well as generator expressions — constitute a powerful Python syntactic sugar. You can read about them in the following articles:

Python comprehensions have two great advantages when compared to the corresponding for loops: they are faster and they can be much more readable.

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

위에서 "훨씬 더 가독성이 높을 수 있습니다"라는 구절을 유의해주세요. 실제로 항상 더 가독성이 높은 것은 아닙니다. 그렇다면, 언제 가독성이 높아질까요?

그것은 당신에 달렸습니다. 파이썬 컴프리헨션의 가독성은 개발자인 여러분이 결정합니다. 무심코 구현하는 것은 컴프리헨션의 가독성을 해치지만 for 루프에 대해서도 동일하게 말할 수 있습니다.

파이썬에서 컴프리헨션은 영어 문장을 읽는 것과 매우 유사하게 읽도록 디자인되었습니다: 컴프리헨션은 왼쪽에서 오른쪽으로 (또는 여러 줄을 사용할 경우 위에서 아래로) 읽을 수 있습니다. 마치 영어 문장을 왼쪽에서 오른쪽으로 읽는 것과 같이요.

많은 사람들은 복잡한 컴프리헨션을 사용해서는 안 된다고 말합니다. 이 기사에서는 이 범주에 속하는 잘 알려진 원칙 - 혹은 신화라고 해도 좋을 것 같습니다. 유감스럽게도, 많은 사람들은 성공적으로 사용될 수 있는 상황에서 파이썬 컴프리헨션을 지나치게 회피함으로써 이 원칙을 무리하게 적용합니다.

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

# 읽기 이해

나는 Python 내포를 알고리즘으로 생각하는 것을 좋아해요: 데이터 작업이 하나 이상의 루프에서 수행된 후 선택적인 조건 또는 여러 조건이 따라옵니다. 그러한 이해 방식은 내포를 이해하는 데 크게 도움이 됩니다, 비록 그것이 꽤 길고 복잡하다 해도요.

기억하세요, Python 내포는 항상 다음 패턴을 사용합니다: 데이터 작업 → 루프(들) → 선택적 조건(들). 우리는 내포를 분석할 때마다 이로 돌아오겠어요.

이 규칙에는 예외가 있어요. 월러스 연산자를 사용할 때, 이 알고리즘 패턴을 약간 변경해야 할 필요가 있는데요; 나중에 이에 대해 자세히 다룰 거에요. 그럼에도 불구하고, 연습을 많이 하면 이 변경이 큰 도전이 되지 않을 거에요, 알고리즘은 큰 가독성을 잃지 않을 거에요.

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

## 기본 사용 사례

매우 간단한 예제를 고려해봅시다. 숫자 목록 x가 주어졌을 때, x의 제곱 요소 목록을 만들고 싶습니다. 이 작업은 보통의 for 루프를 사용하여 수행할 수 있습니다:

```js
>>> x = [1, 2, 5, 100]
>>> x_squared = []
>>> for xi in x:
...     x_squared.append(xi**2)
>>> x_squared
[1, 4, 25, 10000]
```

두 번째 줄부터 코드를 읽어봅시다.

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

- 먼저 비어있는 출력 리스트 x_squared를 만들어요. 이름 자체가 리스트가 어떤 내용을 포함할지를 말해줘요.
- for 루프가 실행되는데, 각 반복은 xi에 대해 실행되며, xi의 값은 x 리스트의 연속 요소로 구성돼요.
- 각 반복에서 우리는 xi\*\*2를 출력 리스트 x_squared에 추가해요.

해당 리스트 컴프리헨션을 고려해 봅시다:

```js
>>> x = [1, 2, 5, 100]
>>> x_squared = [xi**2 for xi in x]
>>> x_squared
[1, 4, 25, 10000]
```

이 간단한 예제에서 보듯이 컴프리헨션은 한 줄만 필요해요. 여기서 읽을 수 있는 방법은 다음과 같아요:

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

- 각 xi에 대해 xi\*\*2를 계산하여 x 목록의 연속적인 값으로 결과를 출력 목록에 수집합니다.

그게 다에요! 명확하고, 명백하며, 읽기 쉽습니다. 우리가 사용한 패턴을 주목했나요? 데이터 작업 → 반복이 아주 간단합니다.

초보자들에게는 그렇게 명확하고 명백하며 읽기 쉽지는 않을 수 있습니다. 그러나 프로그래밍 언어를 배우고 그 강점을 활용하려면 연습이 필요합니다. 그런 다음에야 언어의 강점인 구문 슈가(Python 컴프리헨션과 같이)을 정말로 활용할 수 있습니다.

진짜야: Python을 사용하고 싶다면 컴프리헨션을 사용하고 이해할 수 있어야 합니다.

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

파이썬 컴프리헨션을 자연스럽고 읽기 쉽지 않다고 생각하지 않더라도 계속 시도해보세요. Sooner or later, you’ll see in them what advanced Pythonistas see: simplicity joined with brevity and readability. 계속 노력해주세요.

이것은 매우 간단한 사용 사례였지만, 사실은 이러한 컴프리헨션은 파이썬의 실무에서 매우 흔합니다. 우리는 if 문을 추가하여 조건을 추가함으로써 좀 더 복잡하게 만들어 볼 수 있습니다. 이 경우 홀수만 가져와서 xi % 2 != 0인 수만 가져와 봅시다. 이를 위해 for 루프를 다음과 같이 수정할 수 있습니다:

```python
>>> x = [1, 2, 5, 100]
>>> x_squared = [xi**2 for xi in x if xi % 2 != 0]
>>> x_squared
[1, 25]
```

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

그래서요:

- 이전과 마찬가지로 빈 출력 목록인 x_squared를 생성하십시오.
- for 루프가 실행되며, 각 반복은 xi에 대해 실행되고, xi의 값은 x 목록의 후속 요소를 구성합니다.
- 각 반복에서 xi가 홀수인지 확인합니다. 그렇다면 xi\*\*2 값을 출력 목록 x_squared에 추가합니다. 그렇지 않으면 xi는 무시됩니다.

해당하는 리스트 컴프리헨션을 사용해 봅시다:

```js
>>> x = [1, 2, 5, 100]
>>> x_squared = [xi**2 for xi in x if xi % 2 != 0]
>>> x_squared
[1, 25]
```

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

한번 읽어 봅시다:

- x 목록의 연속 값 xi에 대해 xi\*\*2을 계산합니다.
- 홀수 값 xi의 결과를 출력 목록에 수집합니다.

위의 두 가지 상황에서도 목록 내포 버전이 더 간편하게 읽힌다고 생각합니다. for 루프를 사용하면 전체 코드를 읽어야 하며, 다양한 작업이 코드 전반에 흩어져 있습니다. 반면 목록 내포는 모든 작업을 전형적인 패턴에 모아 넣은 간결한 한 줄로 이루어져 있습니다: 데이터 작업 → 루프 → 조건.

이러한 간단한 상황들이었습니다. 그러나, 파이썬 내포의 가독성이 떨어질 수 있는지도 알려진 사실은, 여러 층으로 중첩되어 복잡해진 경우입니다 (즉, 루프 안에 루프를 생성). 이러한 예제에 대해 다음 섹션에서 살펴보겠습니다.

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

## 고급 사용 사례

이번에는 보통 대응하는 목록 내포보다 조금 더 복잡하게 작성하고 읽기 어려운 사전 내포를 사용해보겠습니다. 또한 하나의 루프와 두 개의 if 문을 사용할 것입니다.

다음 데이터로 작업할 것입니다:

```js
>>> products = [
...     "위젯", "가제트", "띵가마직",
...     "두다드", "무엇",
... ]
>>> prices = [19.99, 25.50, 9.99, 20.00, 22.50]
>>> discounts = [0.10, 0.25, 0.05, 0.20, 0.15]
```

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

할인율이 최소 15%이고 가격이 $20에서 $30 사이인 제품에 대한 가격을 포함하는 사전을 만들고 싶습니다.

일반적인 for 루프부터 시작해봅시다:

```js
>>> discounted_products = {}
>>> prod_price_disc = zip(products, prices, discounts)
>>> for product, price, discount in prod_price_disc:
...     if discount >= 0.15 and 20 <= price <= 30:
...         discounted_products[product] = price
>>> discounted_products
{'Gadget': 25.5, 'Doodad': 20.0, 'Whatsit': 22.5}
```

위 코드를 이렇게 이해할 수 있습니다:

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

- 먼저, 우리는 조건을 충족하는 제품들을 수집할 출력용 딕셔너리인 discounted_products를 초기화해야 합니다.
- 그런 다음 제품 이름, 가격 및 할인을 동시에 반복하는 for 루프를 생성합니다. 이를 위해 zip() 함수를 사용하여 zip 객체를 만들어야 합니다.
- 루프 내에서 모든 제품의 할인이 적어도 15% (할인 `= 0.15)이고 가격이 $20에서 $30 사이에 있는지 두 가지 조건을 확인합니다.
- 두 조건이 모두 충족되면 제품과 해당 가격을 discounted_products 딕셔너리에 추가하며, 제품은 키가 되고 가격은 값이 됩니다.

내가 본 바에 의하면 꽤 간단한 연습이지만 for 루프를 기반으로 한 코드는 비례적으로 간단하지는 않습니다. 따라서 해당하는 딕셔너리 컴프리헨션을 살펴보겠습니다:

```js
>>> discounted_products = {
...     product: price
...     for product, price, discount
...     in zip(products, prices, discounts)
...     if discount >= 0.15 and 20 <= price <= 30
... }
>>> discounted_products
{'Gadget': 25.5, 'Doodad': 20.0, 'Whatsit': 22.5}
```

보시다시피, 두가지 접근방식 모두 동일한 결과를 도출합니다. 코드를 읽어보죠:

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

- 전체 과정이 하나의 사전 컴프리헨션으로 압축됐어요. 하지만 매우 긴 줄을 받아들이는 준비가 되어 있지 않다면 한 줄에 맞지 않을 거예요. 저는 이렇게 너무 긴 한 줄보다 위에서 보여준 for 루프가 더 읽기 쉬울 수 있다고 생각해요.
- 이 컴프리헨션을 해독하는 방법은 다음과 같아요. 제품(키)과 가격(값)을 가져와서, 제품, 가격 및 할인을 동시에 반복하면서 해당 zip 객체를 사용해서 할인 제품 그룹(할인 적용된 제품)을 만들어내는 zip() 함수를 사용해요 — 단, 두 가지 조건을 만족해야 해요. 각 제품의 할인이 적어도 15%여야 하고(discount `= 0.15) 가격은 $20부터 $30 사이여야 해요(20 `= price `= 30).
- 이러한 키-값 쌍은 할인 된 제품(discounted_products)이라는 출력 사전에 보관돼요.

나에게는 컴프리헨션 코드가 사전 구축, 데이터 처리, 루핑 및 조건 검사를 하나로 통합한 명확한 편이에요. 이제 하나의 줄이 아니지만 결과 코드는 여전히 매우 읽기 쉽고, 전체 과정을 우리가 이전에 사용한 알고리즘 패턴을 사용하여 구현해요: 데이터 처리 → 루프 → 조건. 두 가지 조건이 하나의 if 조건으로 압축돼 있음을 유의해요. 두 if 문을 쉽게 사용할 수도 있지만(이는 코드의 양 버전 모두에 적용됨), 여러분이 선택해야 할 것은 가독성입니다.

- 즉, Python 컴프리헨션에서 a if b는 a and b와 동일한 의미를 갖습니다. 두 가지 해법의 벤치마킹이 결론적인 결과를 제공하지 않았기 때문에 선택은 가독성에 따라 달라져야 해요.

더 나아가서 두 개의 중첩된 for 루프를 사용하는 더 복잡한 시나리오를 고려해볼게요. 이것이 사용할 데이터에요:

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

```js
>>> products = ['사과', '바나나', '체리', '데이트']
>>> prices = [25, 15, 22, 35]
>>> discounts = [0.20, 0.10, 0.15, 0.25]
>>> locations = ['동쪽', '서쪽', '북쪽', '남쪽']
>>> available_in = [
...     ['동쪽', '북쪽'],
...     ['서쪽'],
...     ['남쪽', '동쪽'],
...     ['북쪽']
... ]
```

가게가 네 곳에 있지만 제품은 특정 위치에만 한정적으로 판매됩니다. 'available_in' 목록에는 제공된 위치의 리스트로 제공됩니다. 따라서, 예를들어 사과는 동쪽과 북쪽 가게에서만 사용할 수 있고 바나나는 서쪽 가게에서만 사용할 수 있습니다. 이 조건을 따라 제품 및 해당 조건을 따라 가격을 적용해야 합니다.

다음은 for 루프입니다:

```js
>>> discounted_products = {}
>>> zipped = zip(products, prices, discounts, available_in)
>>> for product, price, discount, locations in zipped:
...     for location in locations:
...         cond1 = discount >= 0.15
...         cond2 = 20 <= price <= 30
...         cond3 = location in ['동쪽', '북쪽']
...         if cond1 and cond2 and cond3:
...             discounted_products[(product, location)] = price
>>> discounted_products
{('사과', '동쪽'): 25, ('사과', '북쪽'): 25, ('체리', '동쪽'): 22}
```

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

해당하는 딕셔너리 함축 부분과 함께 테이블 태그를 마크다운 형식으로 변경하시려면 다음과 같이 작성하시면 됩니다:

```js
>>> zipped = zip(products, prices, discounts, available_in)
>>> discounted_products = {
...     (product, location): price
...     for product, price, discount, locations in zipped
...     for location in locations
...     if discount >= 0.15
...        and 20 <= price <= 30
...        and location in ['East', 'North']
... }
>>> discounted_products
{('Apples', 'East'): 25, ('Apples', 'North'): 25, ('Cherries', 'East'): 22}
```

세 가지 if 조건 대신에 세 개의 if 조건을 사용할 수도 있습니다:

```js
>>> zipped = zip(products, prices, discounts, available_in)
>>> discounted_products = {
...     (product, location): price
...     for product, price, discount, locations in zipped
...     for location in locations
...     if discount >= 0.15
...     if 20 <= price <= 30
...     if location in ['East', 'North']
... }
>>> discounted_products
{('Apples', 'East'): 25, ('Apples', 'North'): 25, ('Cherries', 'East'): 22}
```

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

이번에는 코드를 한 줄씩 설명해 드리지 않겠습니다. 스스로 시도해 보세요. 그러나 코드의 다음 측면을 강조하고 싶습니다:

- 일반적인 for 루프에서는 조건 변수인 cond1, cond2 및 cond3를 정의했습니다. 이론적으로 이는 필요하지 않지만 가독성을 위해 이렇게 했습니다. 그렇지 않으면 조건이 포함된 줄은 매우 길어지거나 여러 줄로 나눠져야 했을 것입니다.
- 딕셔너리 내장에서는 이를 할 필요가 없습니다. 세 가지 조건이 포함된 코드는 가독성이 좋지만 세 줄로 나뉩니다. 그러나 이 분할은 가독성을 저하시키지 않고 해당 데이터가 세 가지 조건을 충족해야 함을 보여줍니다.
- 내장은 이전과 같은 패턴을 따릅니다: 연산, 루프, 조건. 다시 말하지만 일반 문장처럼 위에서 아래로 읽을 수 있습니다.
- 추가 복잡성(두 버전 모두)은 중첩된 for 루프로 인해 도입됩니다: for location in locations. 위치별로 루핑하고 있는 것을 이해하는 것으로 충분합니다. 내게는 이 줄에는 복잡성이 너무 많이 포함되어 있지 않습니다, 적어도 중첩된 for 루프에서처럼요.

이 기사의 요점은 Python 내장이 복잡한 상황에서도 간단할 수 있다는 주장을 하는 것이 아닙니다. 대신, 일부 복잡한 상황에서도 기존의 일반적인 for 루프보다 내장이 더 가독성이 높을 수 있다는 것을 보여주고 싶었습니다. 그러니까, 복잡해서 내장을 포기하기로 결정한 경우 대안을 상기시켜 주십시오. 즉, 해당 for 루프가 내지 말기로 결정한 내장보다 심지어 더 덜 가독성이 있을 수 있다는 것이죠.

코드가 가독성이 좋은지 여부는 여러분의 몫입니다. 더 복잡한 상황에서는 코드가 읽기 어려워질 수 있습니다. 마지막 예제를 다시 써 보겠습니다.

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

```js
>>> discounted_products = {
...     (product, location): price
...     for product, price, discount, locations in zip(products, prices, discounts, available_in)
...     for location in locations
...     if discount >= 0.15 and 20 <= price <= 30 and location in ['East', 'North']
... }
>>> discounted_products
{('Apples', 'East'): 25, ('Apples', 'North'): 25, ('Cherries', 'East'): 22}
```

이 버전은 이전 것보다 읽기 어렵지만, 나는 이것이 여전히 꽤 읽기 쉽다고 생각한다. 특히 전통적인 for 루프와 비교했을 때 요사이편한데? 중첩된 내포문이 읽기 어려운 것인가? 일반적으로 맞는 말인가요? 내가 보기에는 아무리 그래도 조금은 그럴 수 있습니다. zip() 함수의 강력함을 기억한다면, 상당히 읽기 쉬운 코드를 작성할 수 있습니다. 물론 zip 객체가 어떻게 작동하는지 알고 있다는 전제하에요.

다음 예제를 고려해보세요. 복수의 for 루프가 정말 이해하기 어려울까요?

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

행 값인 x 및 열 값인 y를 사용하여 값 행렬을 계산해 보겠습니다. 이는 곱셈 표와 유사합니다.

```js
>>> multi_table = {(x, y): x * y for x in range(10) for y in range(10)}
>>> multi_table[(5, 6)]
30
```

여러 줄로 분할하여 더 가독성 있게 바꿀 수 있습니다.

```js
>>> multi_table = {
...     (x, y): x * y
...     for x in range(10)
...     for y in range(10)
... }
>>> multi_table[(5, 6)]
30
```

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

저는 확실히 후자를 선호합니다. 한 명령어로 이루어진 5줄의 리스트 내포를 사용하는 것이 더 좋다고 생각해요. 각 줄이 프로세스의 개별 단계를 나타냅니다.

여기에, 이것은

- 데이터 작업: x\*y를 계산하고 (x, y) 튜플로 저장
- 반복문: 주어진 x 값에 대해, 주어진 y 값에 대해

이겁니다. 이것은 간단한 곱셈이었지만, 첫 번째 줄을 더 고급 계산으로 바꿀 수 있고, 그러면 이러한 내포가 삶을 더 쉽게 만들고 코드를 훨씬 간단하고 가독성이 높게 만들 수 있다는 것을 알게 될 거에요.

다음에 해당하는 코드보다 간단하지 않나요?

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

```js
multi_table = {}
for x in range(10):
    for y in range(10):
        multi_table[(x, y)] = x * y
multi_table
```

여기처럼 행렬을 계산해야 할 때는 zip 객체가 아닌 두 개의 루프가 필요하다는 점을 기억하세요. zip은 행렬을 계산하지 않기 때문입니다. 다음을 비교해보세요:

```js
x, y = range(3), range(3)
[(xi, yi) for xi, yi in zip(x, y)] # list(zip(x, y))와 동일
[(0, 0), (1, 1), (2, 2)]
[(xi, yi) for xi in x for yi in y]
[(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
```

이 계산 줄이 길지 않다면 이해하기 쉬운 내용일 때, 이해를 돕기 위해 리스트 내포가 항상 더 읽기 쉬울 것이라 주장하고 싶지는 않습니다.

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

월러스 연산자를 잊지 말아야합니다. 컴프리헨션 코드를 더욱 강력하게 만들 수 있죠. 파이썬 3.8 이상에서 사용 가능합니다:

```js
>>> {
...     (x, y): prod
...     for x in range(7)
...     for y in range(7)
...     if (prod := x * y) % 2 != 0
...     if y > x
... }
{(1, 3): 3, (1, 5): 5, (3, 5): 15}
```

이 코드를 이해하는 데 문제가 없어야 합니다. 다음과 같이 사전을 만들고 있습니다:

- 데이터 작업: x, y의 튜플에 대해 x와 y의 곱을 계산합니다.
- 루프: range(7)에서 x 값에 대해, range(7)에서 y 값에 대해
- 조건: 곱셈을 한 값이 홀수이고, y가 x보다 클 경우

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

이번에는 데이터 조작 결과에 대한 조건이었습니다. 원래 데이터와는 다른 조건이었죠. 그래서 우리는 위바다 연산자를 사용했습니다.

이걸 사용하면 읽는 과정이 조금 복잡해질 수 있어요. 우리는 prod를 사용하는 줄에서 실제로 정의된 곳으로 이동해야 하고, 그 다음에 다시 같은 줄로 돌아와야 해요. 따라서 우리는 위바다 연산자 없이도 같은 작업을 할 수 있을까요?

네, 가능해요:

```js
>>> {
...     (x, y): x * y
...     for x in range(1, 7)
...     for y in range(1, 7)
...     if (x * y) % 2 != 0
...     if y > x
... }
{(1, 3): 3, (1, 5): 5, (3, 5): 15}
```

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

이 코드에서 문제점을 발견했나요? 이번에는 가독성이 아니라 최적화에 관한 문제에요: 오타리스트(철학 연산자) 버전과 달리, 제품 (x \* y)이 두 번 계산됩니다! 이는 오타리스트 연산자를 사용하지 않은 버전보다 느리다는 것을 의미해요.

그럼 일반 for 루프로 어떠한지 확인해보겠습니다. 여기서는 오타리스트 연산자가 필요하지 않아요:

```js
multi_table = {}
for x in range(7):
    for y in range(7):
        prod = x * y
        if prod % 2 != 0 and y > x:
            multi_table[(x, y)] = prod
multi_table
{(1, 3): 3, (1, 5): 5, (3, 5): 15}
```

정말이지, 함축 표현식의 다음 부분:

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

```js
...     (x, y): x * y
...     for x in range(1, 7)
...     for y in range(1, 7)
...     if (x * y) % 2 != 0
...     if y > x
```

제 생각에는 다음 부분이 일반 for 루프의 이 부분보다 훨씬 가독성이 좋습니다:

```js
>>> for x in range(7):
...     for y in range(7):
...         prod = x * y
...         if prod % 2 != 0 and y > x:
...             multi_table[(x, y)] = prod
```

이전의 코드에 왈러스 연산자가 있음에도 불구하고 그렇습니다!

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

# 복잡한 이해를 단순하게 하는 파이프라인

한 번 더, 일반적인 이해 패턴으로 돌아가 봅시다: 데이터 조작 → 루프 → 선택적 조건. 첫 번째 단계인 데이터 조작은 간단할 수도 복잡할 수도 있습니다. 때로는 여러 데이터 조작으로 이루어질 수도 있습니다.

하나의 이해 안에 여러 작업을 결합해야 한다면, 중요한 솔루션이 여러 가지 있습니다. 가장 중요한 것은 다음과 같습니다:

작업을 합쳐라. 예를 들어, (x + 5)\*\*2는 사실 두 작업, x + 5와 그 결과의 제곱을 계산하는 것을 합칩니다. 하지만 다른 예제로 작업을 한 번에 세 개 결합해야 한다고 가정해봅시다: str.lower(), str.strip(), 그리고 str.replace(` `,`_`). 이 경우에는 다음과 같이 합니다:

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

```js
>>> texts = [
...     "Text 1",
...     "the Second text   ",
...     " and FINALLY, the THIRD text!  \t"]
>>> output_join = [
...     t.lower().strip().replace(' ', '_')
...     for t in texts
... ]
```

이 방법은 이런 단순한 경우에만 작동합니다. 이와 같이 연산을 간단한 방법으로 결합하고 추가적인 중간 계산이 불필요한 경우에만 성공합니다.

함수를 사용해 보세요. 대신 함수를 사용하여 모든 연산을 함수로 이동하고 내포에서 해당 함수를 호출할 수 있습니다:

```js
>>> def preprocess(text: str) -> str:
...     return text.lower().strip().replace(' ', '_')
>>> output_func = [preprocess(t) for t in texts]
```

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

이 솔루션은 매우 복잡한 상황에서도 작동할 수 있습니다. 데이터에 대한 여러 고급 연산이 필요하고 계산이 필요한 여러 단계를 거치더라도 작동합니다.

실제로 이해하기 매우 쉽습니다. 데이터 연산 로직이 내부적으로 처리되는 함수(preprocess()와 같이)로 이동하기 때문입니다. 때로는 한 번만 사용되는 함수를 정의하는 것이 좋지 않은 아이디어일 수 있지만 코드를 조직화하는 데 도움이 되는 경우에는 훌륭하게 작동할 수 있습니다.

이 방법을 선택하면 함수에 정보를 제공하는 의미 있는 이름을 사용하는 것을 기억하십시오. 그렇게 함으로써 함수 내에 구현된 데이터 연산 로직이 복잡하더라도 이해할 수 있는 내용으로 이러한 이해를 읽을 수 있습니다.

콤프리헨션 파이프라인을 사용하세요. 이 경우 단일 콤프리헨션은 사용하지 않고 단계별로 콤프리헨션을 호출합니다. 이를 콤프리헨션 파이프라인이라고 합니다. 제너레이터 파이프라인을 생성해 봅시다:

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

```js
>>> step1 = (t.lower() for t in texts)
>>> step2 = (t.strip() for t in step1)
>>> output_gen_pipe= (t.replace(' ', '_') for t in step2)
```

그리고 목록을 기반으로 한 해당 파이프라인 (listcomp pipeline):

```js
>>> step1 = [t.lower() for t in texts]
>>> step2 = [t.strip() for t in step1]
>>> output_list_pipe = [t.replace(' ', '_') for t in step2]
```

전자 버전은 생성기를 생성하므로 평가해야 합니다. 평가하기 위해 이를 위한 목록을 사용할 것입니다. 아래 참고해주세요.

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

노트: 모든 네 가지 접근 방식은 매우 유사한 결과를 보여줍니다:

```js
>>> (output_join == output_func == list(output_gen_pipe) == output_list_pipe)
True
```

이해를 돕기 위해 표현식 파이프라인이 강력한 솔루션을 제공할 수 있습니다. 그러나 실제 파이프라인에만 작동하는 것이 아니라는 점을 명심해 주세요.

이 주제는 고급적이므로 여기에서 다루지 않겠습니다. 관심이 있다면 다음 기사에서 관련 정보를 많이 찾아볼 수 있습니다:

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

이미 Python을 사용해온 지 얼마 되지 않았다면, 아마 단순한 상황에만 comprehension을 사용하고 그렇지 않은 경우에는 for 루프를 사용하라는 경고를 들어본 적이 있을 것입니다. 특정 상황이 comprehension으로 구현하기에 너무 복잡한지를 결정하는 방법은 무엇일까요?

이를 위해서는 연습과 경험이 필요합니다. 숙련된 Python 개발자는 이러한 결정을 내릴 때 거의 망설임이 없습니다. 그들은 일반적인 맥락에서 어느 선택이 더 나은지 보통 알고 있습니다.

고급 Python 개발자가 아니라면, 이러한 기술을 키워야 합니다. 아직 그 수준에 이르지 못했다면 걱정하지 마세요; 가능한 많은 comprehension을 구현하여 이 기술을 연습해보세요 — 심지어 맥락이 comprehension에는 너무 어려워 보이더라도 그렇게 해보세요. 맥락이 실제로 매우 복잡하고 각 반복마다 여러 작업이 필요한 경우가 아닌 이상, comprehension과 for 루프 둘 다 구현하고 비교해보세요.

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

각 반복이 여러 데이터 작업을 필요로 할 때도, 우리가 위에서 논의한 간단한 비결을 활용하여 이해하기 쉬운 코드를 만들 수 있습니다: 데이터 작업을 함수로 이동시키고 이를 함축 표현의 루프 각 반복에서 호출하세요. 이러한 접근 방식은 모든 작업이 루프의 코드 블록 내에 구현된 for 룹보다 훨씬 간결한 코드를 제공할 수 있습니다.

함축 표현이 너무 어려워 보일 때도 조기에 포기하지 마세요. 일단 시도해보고, 성공하면 꽤 깔끔한 해결책이 될 수 있습니다: 함축 표현의 코드의 어려움은 그것을 구현하는 어려움과 비례하지 않아도 됩니다.

보통, for 룹과 해당 함축 표현 중에서 선택할 수 있습니다. 그러나 때로는 단일 명령(긴 경우도 다수의 줄로 분할될 수 있기 때문에)을 사용해야 할 때가 있으며, 이 경우엔 단순히 함축 표현이 필요합니다.

예를 들어, Pytest의 픽스처(parametrization of fixtures)의 매개변수화를 고려해보세요. pytest.fixture() 호출 내부나 직접 params 인자로 전달하는 매개변수 목록을 만들 수 있습니다. 종종, 내부에서 작업하는 것이 좋습니다. 왜냐하면 이렇게 하면 코드가 더욱 명확하고 조직적으로 구성되기 때문입니다. 픽스처의 매개변수화 코드가 pytest.fixture() 호출 내부에 포함하기에 너무 복잡해질 때만 외부로 이동시킵니다.

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

파이썬 구문 설탕인 컴프리헨션(제너레이터 표현식 포함), 데코레이터, 물고기 연산자 등은 파이썬을 강력하고 가독성 있게 만들어줍니다. 그래서 이러한 요소들을 피하지 마세요. 이들은 파이썬 프로그래밍을 더 쉽게 만들기 위해 존재합니다. 게다가, 컴프리헨션은 파이썬에 아름다움을 더해줍니다. 이를 배워서 사용하는 법을 익히면, 이제까지 못 느꼈던 만족감을 느낄 수 있을 거예요.

모두가 이러한 이유를 동의하는 것은 아닙니다. 어떤 사람들은 파이썬을 잘 모르는 사람들이 그런 코드를 이해하지 못할 수 있다고 말하기도 합니다. 하지만 저는 그 접근 방식에 완전히 반대합니다. 프로그래밍 언어를 선택했다면, 해당 언어의 기본 구문과 구문 설탕을 사용하는 것이 당연하다고 생각해요. 이들은 종종 해당 언어에서 가장 강력한 프로그래밍 도구 중 하나에 속합니다.

만약 C 구문을 사용하고 싶다면 C를 사용하세요, 파이썬을 사용하면서도 C 구문을 사용하면 사실상 파이썬다운 코드가 아니게 됩니다. 비록 올바르게 동작할지라도, 이러한 코드는 길고 최적화되지 않으며 이해하기 어려울 수 있습니다.

컴프리헨션을 가장 단순한 상황에만 사용해야 한다는 주장은 오버 사용된 신화가 되어버렸습니다. 사실, 너무 복잡한 컴프리헨션 사용은 피해야 하지만, 이것이 무엇을 의미하는 걸까요? 두 개의 조건문이나 중첩된 루프는 컴프리헨션을 너무 복잡하게 만드는 것인가요? 아니요, 그렇지 않아요!

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

그래서 이 규칙을 따라주세요: Python 컴프리헨션이 해당하는 for 루프보다 이해하기 복잡하다면 컴프리헨션을 사용하지 마세요. 하지만, 컴프리헨션이 더 이해하기 쉽다면 무조건 사용해주세요. 심지어 여러 줄에 걸쳐 나타나고 어려울지라도요.

다시 말해, 컴프리헨션을 사용할지 여부를 결정할 때는 가독성과 해당하는 for 루프의 이해도를 기반으로 하세요. 성능이 우려된다면 그것도 고려해주세요; 이는 종종 컴프리헨션을 for 루프보다 선호해야 한다는 것을 의미합니다.
