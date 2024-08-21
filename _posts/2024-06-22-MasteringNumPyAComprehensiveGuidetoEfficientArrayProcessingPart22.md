---
title: "NumPy 마스터하기 효율적인 배열 처리 종합 가이드 Part 2"
description: ""
coverImage: "/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_0.png"
date: 2024-06-22 05:37
ogImage:
  url: /assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_0.png
tag: Tech
originalTitle: "Mastering NumPy: A Comprehensive Guide to Efficient Array Processing (Part 2 2)"
link: "https://medium.com/python-in-plain-english/mastering-numpy-a-comprehensive-guide-to-efficient-array-processing-part-2-2-627393d34169"
isUpdated: true
---

## 빠르고 똑똑한 데이터 조작을 위한 NumPy의 힘을 활용하세요.

# 소개

NumPy 튜토리얼의 두 번째 파트에 오신 것을 환영합니다! 이전에는 다음 목록의 처음 7개 챕터를 다루었습니다. 이번 포스트에서는 8장부터 14장까지 진행하려고 합니다.

- NumPy 설치
- 배열 초기화
- NumPy 배열 제한
- 계산 속도와 메모리 사용량
- 데이터 유형
- 색인 및 슬라이싱
- 배열 생성 함수
- 난수 생성
- 보기 및 복사
- 수학 함수
- 논리 및 비트 연산자
- 검색 및 정렬
- 모양 및 재구성
- 연결 및 분할

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

참고: 이 문서에서 사용된 모든 자료는 제 GitHub 저장소에서 확인할 수 있습니다. 여기에 링크를 남깁니다.

# 8. 랜덤 숫자

NumPy를 사용하면 랜덤 숫자를 생성할 수 있습니다. 제 경우에는 이 기능을 사용하여 기계 학습 및 딥 러닝 모델에서 무작위 가중치를 초기화하는 데 사용해 보았습니다. 제가 처음부터 구현하려고 노력했던 그때입니다. 이러한 유형의 NumPy 기능에는 다른 응용 프로그램이 있을 것이라고 믿습니다.

## 균일 분포

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

이제 np.random.rand()로 시작해 봅시다. 이 함수는 [0.0, 1.0) 범위 내에서 균일 분포에서 무작위 숫자를 생성합니다. 이는 숫자가 정확히 0.0이 될 수는 있지만, 1.0에 근접할 뿐입니다. 이 함수를 사용하려면 우리가 원하는 배열의 형태를 전달해주기만 하면 됩니다. np.random.random()은 사실상 np.random.rand()와 동일합니다. 그러나 이 함수에 대한 입력은 튜플 형태여야 한다는 것을 염두에 두세요. 이 두 함수 중 어느 것이든 실제로 서로 교차하여 사용할 수 있습니다. 이는 단지 사용자의 취향에 따라 다를 뿐입니다.

```js
# Codeblock 1
np.random.rand(10,3)

### 대안
# np.random.random((10,3))
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_0.png" />

아직 무작위 균일 분포와 관련하여, 더 많은 유연성이 필요하다면 np.random.uniform()를 사용할 수 있습니다. 이 함수를 사용하면 분포의 범위를 지정할 수 있어 [0.0, 1.0)에 고정되어 있는 것보다 더 유연해집니다. 아래 코드 블록에서 수를 90부터 100 사이로 범위 설정하는 방법을 보여드리겠습니다.

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
# 코드 블록 2
np.random.uniform(low=90, high=100, size=(5,5))
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_1.png)

만약 균일 분포에서 숫자를 np.histogram()에 넣으면, 모든 바구니(첫 번째 인덱스의 배열)에 유사한 빈도의 발생이 있음을 볼 수 있습니다. 아래 예제에서는 10개의 바구니로 분배된 50,000개의 숫자를 생성합니다. 이렇게 하면 각 바구니에 약 5,000개의 발생 횟수가 있습니다. 무작위 균일 함수의 세 가지 변형(np.random.rand(), np.random.random() 및 np.random.uniform())이 모두 이렇게 동작합니다.

```js
# 코드 블록 3
np.histogram(np.random.uniform(size=(50000)))

### 유사한 결과를 제공합니다
# np.histogram(np.random.rand(50000))
# np.histogram(np.random.random(50000))
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

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_2.png" />

## 정규 분포

균일 분포 뿐만 아니라 np.random.randn()을 사용하여 정규 분포의 데이터도 생성할 수 있습니다. 여기서 전달할 수 있는 유일한 매개변수는 생성될 배열의 모양입니다.

```js
# 코드 블록 4
np.random.randn(6,4)
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

![Image](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_3.png)

안타깝게도 np.random.randn() 함수는 분포의 평균과 표준 편차를 변경할 수 있는 기능을 제공하지 않습니다. 이 함수에서 두 매개변수는 각각 0과 1로 고정되어 있습니다. 만약 이러한 값을 사용자 정의하고 싶다면 np.random.normal()을 사용해야 합니다. np.random.normal()에서는 평균을 loc 매개변수를 사용하여 조절하고, 표준편차는 scale 매개변수를 통해 수정할 수 있습니다.

```js
# Codeblock 5
np.random.normal(loc=8, scale=3, size=(5,5))
```

![Image](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_4.png)

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

제가 앞서 사용한 np.histogram() 함수는 np.random.randn() 및 np.random.normal()에 의해 생성된 배열이 실제로 정규 분포를 따르는지 확인하는 데 사용될 수 있습니다. 아래 그림 6은 이를 설명하는데, 첫 번째 배열을 통해 가운데 있는 bin이 가장 빈도가 높음을 보여줍니다.

```js
# 코드 블록 6
np.histogram(np.random.normal(loc=0, scale=1, size=50000))

### 비슷한 결과를 출력
# np.histogram(np.random.randn(50000))
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_5.png" />

지금까지 많은 유사한 함수가 존재한다는 것을 알아차렸습니다. 특히, 무작위 숫자를 생성하는 데 사용되는 함수들은 균일 및 정규 분포와 관련된 함수들이 많습니다. 그런 경우에는 np.random.uniform() 및 np.random.normal()만 사용하는 것을 권장드립니다. 두 함수가 가장 유연하기 때문입니다.

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

## 랜덤 정수

우리가 이전에 논의한 함수들은 주로 랜덤 소수점 숫자를 생성하는 데 초점을 맞췄습니다. 실제로 Numpy는 랜덤 정수를 생성하는 함수인 np.random.randint()를 제공합니다. 이 함수의 매개변수 및 동작은 np.random.uniform()와 동일합니다. 지정된 범위 내의 모든 숫자는 선택될 확률이 완전히 동일합니다. 다시 말해, np.random.randint()는 숫자 선택을 위해 균일한 이산 분포를 사용합니다. 아래 예시에서 생성된 숫자들은 [5,10) 범위 내에 있을 것입니다 (즉, 10은 포함되지 않음).

```js
# Codeblock 7
np.random.randint(low=5, high=10, size=(20,3))
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_6.png)

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

## 배열 섞기

다음으로 이야기하고 싶은 함수는 np.random.shuffle()입니다. 그러나 더 진행하기 전에 먼저 배열 K를 초기화하고 싶습니다.

```js
# 코드 블록 8
K = np.random.randint(1, 30, size=10)
K
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_7.png" />

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

아마 알아챌 수 있었던 것처럼, np.random.shuffle()은 배열의 요소 순서를 섞어주는 함수입니다. 이 함수는 배열을 그 자리에서 섞기 때문에, 새로운 배열을 만드는 것이 아니라 원본 배열을 직접 섞는다는 것을 명심해 주세요.

```js
# 코드 블록 9
print('섞기 전 K\t: ', K)
np.random.shuffle(K)
print('섞은 후 K\t: ', K)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_8.png" />

## 랜덤 선택

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

아직 배열 K와 작업 중이시군요. 이제 그 중에서 숫자를 무작위로 선택하는 방법을 알려드릴게요. np.random.choice()를 사용하면 간단하죠. 아래 코드 블록에서 함수를 사용하는 여러 예제를 보여드릴게요.

```js
# 코드 블록 10
print(np.random.choice(K), end='\n\n')                #(1)
print(np.random.choice(K, size=(2,3)), end='\n\n')    #(2)
print(np.random.choice(K, size=(2,4), replace=False)) #(3)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_9.png" />

(1)에서 지정된 줄에서, 함수에 배열만 전달하면 해당 배열에서 한 개의 숫자를 반환합니다. (2)의 size 매개변수를 사용하여 출력의 차원을 지정할 수도 있어요. 출력 결과를 보면 16이 두 번 나타나는 것을 알 수 있어요. 이는 기본적으로 함수가 복원 선택으로 무작위 숫자를 선택하기 때문인데요, 즉, 원래 배열에서 하나의 숫자가 여러 번 선택될 수 있습니다. 이를 원치 않는 경우, replace=False를 써서 다음과 같이 쓸 수 있어요. (3)에서처럼요. 이렇게 하면 결과 배열의 요소 수가 원본 배열의 요소 수보다 크면 안 된다는 점에 유의하세요. 궁금하시다면, 세 번째 출력에서 두 번 나타나는 12는 배열 K에 12가 실제로 두 번 나타난 것 때문입니다.

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

## 시드

생성된 무작위 숫자를 재현 가능하게 하는 경우가 많습니다. 이를 위해 np.random.seed()를 사용할 수 있습니다. 사용 방법은 간단합니다. 단지 인수로 숫자를 넣고 동일한 숫자를 출력을 정확히 원하는 노트북 셀에서 사용하면 됩니다. 다음 예제를 살펴봅시다. 여기서 np.random.randint()로 생성된 배열이 두 연속된 코드 블록에서 정확히 동일하게 나오기를 원합니다. 이 예에서 시드를 99로 설정하기로 결정했습니다(원하는 정수를 선택할 수 있습니다). np.random.randint()가 정확히 동일한 숫자를 반환하려면, 동일한 시드로 np.random.seed()를 다시 호출해야 합니다.

```python
# 코드 블록 11
np.random.seed(99)
np.random.randint(low=0, high=10, size=(2,5))
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

```json
# 코드 블록 12
np.random.seed(99)
np.random.randint(low=0, high=10, size=(2,5))
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_11.png)

# 9. 뷰(View)와 복사(Copy)

## 뷰(View)

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

한 변수에서 다른 변수로 배열을 할당할 때 Numpy의 성질을 고려해야 합니다. 다음 예제를 살펴보겠습니다.

```js
# 코드 블록 13
L = np.array([55, 66, 77, 88, 99])
M = L
print(M)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_12.png" />

여기서 배열 L을 변수 M에 할당했으므로 두 변수가 동일한 배열을 포함하게 됩니다. 다음으로, 아래 코드 블록 14를 사용하여 M의 0번 인덱스를 변경하려고 합니다. 그러나 M의 첫 번째 요소만 바꾸려고 했지만 배열 L의 요소도 변경됩니다.

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
# 코드 블록 14
M[0] = 15
print('L:', L)
print('M:', M)
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_13.png)

이 결과가 나온 이유는 M이 단순히 L의 "뷰(view)"일 뿐이기 때문입니다. 다시 말해 위에서 보여준 방법은 배열을 복사하는 것이 아니라 두 변수가 여전히 "연결"되어 있기 때문입니다.

## 복사

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

위의 경우가 발생하지 않도록하려면, M에 할당할 때 copy() 메서드를 L에 넣으면 됩니다. 이렇게 하면 M에 저장된 배열이 완전히 다른 배열이 되어, 하나의 배열에 대한 수정이 다른 배열에 영향을 미치지 않도록 보장됩니다.

```js
# Codeblock 15
L = np.array([55, 66, 77, 88, 99])
M = L.copy()
M[0] = 15

print('L:', L)
print('M:', M)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_14.png" />

# 10. 수학 함수

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

## 기본 수학 연산

이 장에서는 Numpy의 수학 기능을 사용하는 방법에 대해 알아보려고 합니다. 시작하기 전에 사전에 배열 N과 O를 초기화해 봅시다.

```js
# Codeblock 16
N = np.array([1,2,3], dtype='int32')
O = np.array([4,5,6], dtype='int32')
```

우리는 가장 기초적인 것부터 시작할 것입니다: 덧셈, 뺄셈, 곱셈 및 나눗셈입니다. Numpy에서 배열에 이러한 연산자를 적용하면 연산은 요소별로 수행됩니다. 이러한 이유로 배열 피연산자의 차원이 정확히 일치하는지 확인해야 합니다.

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

# 코드 블록 17

print(N + O)
print(N - O)
print(N \* O)
print(N / O)

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_15.png)

위의 코드블록 17에서 소개된 방법들은 Numpy 배열에서만 작동합니다. 리스트에 똑같은 작업을 시도하면 모든 예제가 오류가 발생할 것이며, 덧셈 연산은 두 리스트를 연결할 것입니다.

대안으로 np.add(), np.subtract(), np.multiply() 및 np.divide()와 같은 Numpy에서 제공하는 함수들을 사용할 수도 있습니다. 연산자 기호와 함수 모두 정확히 같은 결과를 생성합니다. 따라서 이 경우에는 개인 취향에 따라 선택하면 됩니다. 아래 코드블록은 이러한 함수들을 어떻게 사용하는지 보여줍니다. 결과 출력은 Figure 16에 표시된 것과 완전히 동일합니다.

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
# Codeblock 18
print(np.add(N, O))
print(np.subtract(N, O))
print(np.multiply(N, O))
print(np.divide(N, O))
```

넘파이(Numpy)에서 "브로드캐스팅(broadcasting)"이라는 개념이 있습니다. 이는 기본적으로 크기가 다른 배열 또는 배열과 스칼라 간의 연산을 수행할 수 있다는 것을 의미합니다. 다음 경우에는 숫자 5가 배열 N의 모든 요소로 브로드캐스팅된다고 말할 수 있습니다.

```js
# Codeblock 19
print(N + 5)
print(N - 5)
print(N * 5)
print(N / 5)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_16.png" />

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

제가 다음으로 논의하고 싶은 것은 행렬 곱셈입니다. 이전에 언급한 대로, 네 가지 기본 수학 연산 함수는 요소별로 작동합니다. 이는 np.multiply() 함수가 행렬 곱셈을 위해 의도된 것이 아니라는 것을 의미합니다. 대신 np.matmul()을 사용해야 합니다. 이 경우 두 입력 행렬이 연산 가능한지 확인해야 합니다. 다음 예제에서는 각각 크기가 (4,3)과 (3,2)인 배열 O와 P 사이의 곱셈을 수행합니다.

```js
# 코드블록 20
O = np.array([[2, 1, 0],
              [5, 4, 3],
              [8, 7, 6],
              [1, 0, 9]])

P = np.array([[4, 3],
              [6, 5],
              [8, 7]])

np.matmul(O, P)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_17.png" />

여전히 기본 수학 연산과 관련된 다른 함수에는 np.sign(), np.negative() 및 np.abs()가 있습니다. 이러한 함수들의 사용법을 배열 Q에 대해 보여드리겠습니다.

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
# 코드 블록 21
Q = np.array([-56, 92, -24, -66, 72, -75, 90, 0, 32, 51])

print(np.sign(Q))
print(np.negative(Q))
print(np.abs(Q))      # 대안: np.absolute()
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_18.png)

함수 이름대로, np.sign()은 배열의 각 요소의 부호를 취하는 데 사용됩니다. -1, 0 또는 1만 표시됩니다. 다음으로, np.negative()를 사용하여 숫자의 부호를 뒤집을 수 있습니다. 위의 예시에서 -56은 56이 되고, 92는 -92가 됩니다. 마지막으로, np.abs() 또는 np.absolute()를 사용하여 숫자의 절대값을 취할 수 있습니다.

## 최대공약수(GCD)와 최소공배수(LCM)

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

최대공약수(GCD)와 최소공배수(LCM)는 Numpy에서 각각 np.gcd()와 np.lcm()으로 구현되어 있습니다. 이러한 함수들을 사용하려면, 간단히 두 숫자나 배열을 입력인수로 넣으면 됩니다.

```js
# 코드블록 22
print(np.gcd(81, 72))    #(1)
print(np.lcm([3, 6, 9], 24))    #(2)
print(np.lcm([3, 12, 9], [24, 16, 3]))    #(3)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_19.png" />

위 코드블록 22의 예제를 살펴봅시다. #(1)으로 표시된 줄은 81과 72의 최대공약수인 하나의 숫자를 반환합니다. 한편, #(2) 줄에서는 숫자 24가 첫 번째 인수에 브로드캐스트되어 LCM이 24와 목록의 각 숫자 간에 계산됩니다. 마지막으로, 두 인수에 대해 리스트를 전달하면, LCM 또는 GCD 계산이 요소별로 수행됩니다 (#(3)).

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

## 지수 함수

np.power() 함수를 사용하여 지수 연산을 수행할 수 있습니다. 이 함수는 두 개의 입력을 받습니다: 밑수와 지수입니다. 해당 함수는 지수로 분수를 전달하여 루트를 계산할 수 있도록 매우 유연합니다.

```js
# Codeblock 23
print(np.power(8, 3))
print(np.power([1,2,3,4], 2))
print(np.power(144, 1/2))
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_20.png)

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

유연성이 있긴 하지만, np.power()은 실제로 연산 속도에 있어서 최상이라고 할 수는 없습니다. 실제로 더 빠른 계산을 제공하는 몇 가지 특정 목적을 위한 대안들이 있습니다. np.square(), np.sqrt(), np.cbrt() 및 np.exp()가 그 예입니다. 아래 코드 블록은 np.power()와 이러한 함수들의 동등한 사용법을 보여줍니다.

```js
# 코드 블록 24
print(np.square(6))             # np.power(6,2)와 동일
print(np.sqrt([144,16,9,4]))    # np.power([144,16,9,4], 1/2)와 동일
print(np.cbrt([343,27]))        # np.power([343,27], 1/3)와 동일
print(np.exp([2,3,4]))          # np.power(np.e, [2,3,4])와 동일
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_21.png" />

## 각도 변환 및 삼각함수

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

넘파이에서는 삼각함수를 사용할 수 있습니다. np.sin(), np.cos() 및 np.tan()을 사용할 때 주의해야 할 점은 이 함수들이 라디안 단위의 각도를 입력으로 받는다는 것입니다. 따라서 각도가 도(degree)로 주어진 경우 np.deg2rad()를 사용하여 라디안으로 변환해야 합니다. 아래 Codeblock 25에서는 각도를 도와 라디안으로 변환하는 방법을 보여줍니다.

```js
# Codeblock 25
R = np.array([0, 90, 180, 270])    # 각도 (도)가 담긴 배열
S = np.array([0, np.pi/2, np.pi, np.pi*3/2])    # 각도 (라디안)가 담긴 배열

print(np.deg2rad(R))
print(np.rad2deg(S))
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_22.png" />

각도 변환 방법을 이해했으니, 이제 삼각함수의 사용법을 실제로 보여드리겠습니다. 다음 코드에서 숫자 0, 45, 60이 각도 (도)를 나타낸다고 가정합니다. 이 숫자들은 라디안으로 변환된 후 배열 T에 저장되어 np.sin(), np.cos(), np.tan()의 입력으로 사용됩니다.

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
# 코드 블록 26
T = np.deg2rad([0, 45, 60])

print(np.sin(T))
print(np.cos(T))
print(np.tan(T))
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_23.png)

## 로그 함수

로그 함수에 대해 이야기할 때, 적어도 가장 기본적이라고 생각되는 세 가지 함수가 있습니다. 아래 코드 블록 27에서는 배열 U에 np.log(), np.log2() 및 np.log10() 함수를 어떻게 사용하는지 보여줍니다.

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

# 코드 블록 27

U = [1, 2, 10, np.e]

print(np.log(U))
print(np.log2(U))
print(np.log10(U))

![Image](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_24.png)

Numpy에서 np.log()는 수학의 ln() 함수와 동일합니다 (밑이 e인 로그). 한편, np.log2()와 np.log10()은 각각 밑이 2와 10인 로그입니다.

## 통계 함수

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

만약 숫자 데이터 분포를 가지고 있다면, 통계적 특성을 계산하여 추가 분석을 수행할 수 있습니다. 우리에게 운이 좋은 것은 Numpy가 이 작업을 쉽게 수행할 수 있는 다양한 함수를 제공해준다는 것입니다. 이와 관련된 모든 함수들 — 아마도 이들 모두가 명확히 이해할 만한 함수들로 보입니다 — 이 코드 블록 28에 나와 있습니다.

```js
# 코드 블록 28
V = np.array([1, 5, 4, 6, 8, 5, 4, 3, 2, 4, 7, 9, 5, 4, 3, 2, 0, 7, 9])

print('sum\t:', np.sum(V))
print('mean\t:', np.mean(V))
print('median\t:', np.median(V))
print('var\t:', np.var(V))
print('stddev\t:', np.std(V))
print('q1\t:', np.quantile(V, 0.25))
print('q2\t:', np.quantile(V, 0.5))
print('q3\t:', np.quantile(V, 0.75))
print('min\t:', np.min(V))
print('max\t:', np.max(V))
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_25.png" />

이 주제 외에도 통계 측정과 직접적인 관련이 없지만 여전히 유용할 수 있는 두 가지 다른 함수가 실제로 있습니다. 말하고자 하는 두 함수는 np.argmin()과 np.argmax()인데, 이 두 함수는 배열에서 가장 작은 값과 가장 큰 값이 들어 있는 인덱스를 반환합니다. 가장 작거나 큰 값이 여러 개인 경우, 이 두 함수는 가장 낮은 인덱스를 반환합니다.

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
# 코드 블록 29
print('argmin\t:', np.argmin(V))
print('argmax\t:', np.argmax(V))
```

![image](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_26.png)

## 선형 대수

넘파이는 선형 대수 계산을 수행하는데 다양한 도구를 제공합니다. 여기서 여러분께 보여드릴 수 있는 몇 가지 사항들이 있습니다. 코드 블록 30에 표시된 두 배열이 있다고 가정해 봅시다.

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
# 코드 블록 30
W = np.array([10, 20, 30, 40])
X = np.array([3, 4, 5, 6])
```

넘파이에서 1차원 배열은 벡터로 생각할 수 있습니다. 따라서 np.dot()을 사용하여 W와 X의 내적을 계산할 수 있습니다.

```js
# 코드 블록 31
np.dot(W, X)
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_27.png)

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

또한 NumPy는 np.inner() 및 np.outer()를 통해 내적과 외적을 계산할 수 있도록 합니다.

```python
# Codeblock 32
print(np.inner(W, X))
print(np.outer(W, X))
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_28.png" />

이제 2D 배열을 다루고 있다면 우리가 할 수 있는 것들에 대해 좀 더 자세히 알아보겠습니다. 이를 시연하기 전에 배열 Y를 미리 초기화하고 싶습니다.

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
# 코드 블록 33
Y = np.array([[2, 1, 0],
              [0, 4, 5],
              [2, 6, 3]])
```

행렬의 전치(transpose)를 얻으려면 np.transpose()를 사용하거나 해당 행렬의 T 속성을 사용할 수 있습니다. 아래 코드 블록을 확인해보세요.

```js
# 코드 블록 34
np.transpose(Y)

### 대안
# Y.T
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_29.png)

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

넘파이는 행렬의 역행렬을 계산하는 함수도 제공합니다. `np.linalg.inv()`를 사용하면 행렬 Y의 역행렬을 계산할 수 있습니다.

```js
# 코드 블록 35
np.linalg.inv(Y)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_30.png" />

그러나 중요한 점은 행렬이 특이행렬일 때, 즉 행렬식이 0일 때 `np.linalg.inv()`가 오류를 반환한다는 것입니다. 따라서 역행렬을 계산하기 전에 행렬의 행렬식 값을 확인하는 것이 좋은 아이디어라고 생각합니다. 확인을 위해 `np.linalg.det()`을 사용하세요.

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
# Codeblock 36
np.linalg.det(Y)
```

![Image](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_31.png)

더불어 Numpy는 np.linalg.eig()를 사용하여 고유값과 고유벡터를 계산할 수 있습니다. 이 함수는 두 값 모두 반환하므로 출력을 위해 두 변수를 할당해야 합니다.

```js
# Codeblock 37
eigenvalues, eigenvectors = np.linalg.eig(Y)

print(eigenvalues, end='\n\n')
print(eigenvectors)
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

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_32.png" />

지금까지 Numpy에서 다양한 수학 함수에 대해 많이 이야기했습니다. 실제로 더 설명하지 않은 것도 많이 있습니다. 더 탐구하고 싶다면 [이 사이트](1)를 방문해보세요.

# 11. 논리 및 비트 연산자

## 논리 연산자

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

이 기사의 맨 처음에, NumPy가 우리에게 boolean 자료형의 배열을 만들 수 있게 한다고 언급했지만, 이 주제에 대해 아직 자세히 다루지는 않았습니다. 그리고 이제, 이 장에서 그에 대해 이야기하고 싶습니다. 먼저, Z와 AA라는 이름으로 두 배열을 초기화하는 것으로 시작합시다.

```js
# 코드블록 38
Z = np.array([True, True, True])
AA = np.array([False, True, True])
```

boolean 연산을 수행하는 가장 간단한 방법은 `np.logical_and()`, `np.logical_or()`, 및 `np.logical_xor()`를 사용하는 것입니다. 우리가 이 함수들을 인수로써 같은 차원의 두 배열을 넣어주면, 이 함수들은 요소별 연산을 수행할 것입니다. 다음 예제를 참조해주세요.

```js
# 코드블록 39
print(np.logical_and(Z, AA))
print(np.logical_or(Z, AA))
print(np.logical_xor(Z, AA))
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

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_33.png)

OR 및 AND 연산자와 약간 비슷한 두 가지 특수 기능이 실제로 있는데, np.any()와 np.all()입니다. np.any()는 배열에 하나 이상의 True가 있으면 True를 반환합니다. 반면에 np.all()은 배열의 모든 요소가 True인 경우에만 True를 반환합니다. 아래 코드 블록 40에서는 배열 Z와 AA에 대해 이 두 함수를 어떻게 사용하는지 보여줍니다.

```js
# 코드 블록 40
print('np.any(Z): ', np.any(Z))
print('np.all(Z): ', np.all(Z), end='\n\n')
print('np.any(AA):', np.any(AA))
print('np.all(AA):', np.all(AA))
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_34.png)

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

우리는 실제로 np.any()와 np.all()을 좀 더 고급으로 사용할 수 있어요. 다음 코드 블록에서 #(1) 행에서, np.any()는 배열 AB에서 4보다 큰 숫자가 하나 이상 있는 경우 True를 반환할 거에요. 다음으로, #(2) 행에서는 AB의 모든 요소가 4보다 큰 경우에만 True를 반환할 거에요.

```js
# Codeblock 41
AB = np.array([2, 0, 3, -5, 5, -1, 2, -4])

print(np.any(AB > 4))    #(1)
print(np.all(AB > 4))    #(2)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_35.png" />

## 비트 연산자

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

비트 연산자는 논리 연산자만큼 직관적으로 보이지 않을 수 있습니다. 그럼에도 불구하고 두 가지의 기본 아이디어는 정확히 같습니다. 차이는 비트 연산자가 정수를 입력으로 사용한다는 점뿐입니다. 연산 중에 이러한 정수들은 이진으로 먼저 변환된 후 비트 단위로 작동됩니다. 아래 예시에서는 np.bitwise_and(), np.bitwise_or() 및 np.bitwise_xor()에 12와 13을 입력 인수로 넣었습니다.

```js
# Codeblock 42
print(np.bitwise_and(12, 13))
print(np.bitwise_or(12, 13))
print(np.bitwise_xor(12, 13))
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_36.png" />

위 함수들은 모두 처음에 12와 13을 이진으로 변환하여 작동합니다: 1100과 1101. 이 값을 AND 연산자로 처리하면 1100이 됩니다. 한편 OR 연산자는 1101을 반환하고 XOR는 0001을 반환합니다. 이진 수열을 10진수로 변환하면 최종 결과로 12, 13 및 1이 나옵니다.

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

이 주제에 추가로, np.binary_repr()을 사용하여 10진수의 이진 표현을 확인할 수 있습니다.

```js
# 코드 블록 43
print(np.binary_repr(12))
print(np.binary_repr(13))
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_37.png)

# 12. 검색 및 정렬

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

특정 숫자를 찾을 때에는 불리언 인덱싱이라는 기법을 사용할 수 있어요. 이 방법을 마스킹처럼 생각할 수도 있죠. 여기서 저는 다음 코드 블록에서 초기화한 배열 AC를 이 아이디어로 설명하고 싶어요.

```js
# 코드블록 44
AC = np.array([9, 4, 5, 3, 2, 6, 8, 6, 5, 4, 5, 5, 3, 2])

mask = AC > 5  #(1)
mask
```

이름이 "mask"인 것은 사실상 AC와 길이가 정확히 같은 다른 배열이며, 여기에는 불리언 값만 포함돼요. 이렇게 배열을 생성하려면 (1) 라인에서 하는 것처럼 조건을 적용하면 되요. 이 코드 라인에서는 배열 AC의 모든 요소가 지정된 조건을 충족하는지 확인해요. 만약 조건을 충족한다면 해당 인덱스는 True로 할당돼요.

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

실제 마스킹은 아래의 코드블록 45를 사용하여 실행됩니다. 이렇게 하면 우리의 기준을 충족하는 숫자만 출력됩니다.

```js
# 코드블록 45
AC[mask]
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_39.png" />

사실, 마스크를 별도의 변수에 저장할 필요는 없습니다. 대신, 다음과 같이 간단히 작성할 수 있습니다:

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
# 코드블록 46
AC[AC > 5]
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_40.png)

논리 연산자도 사용할 수 있습니다. 다음 예시는 9를 제외한 모든 요소 중 5보다 큰 모든 요소를 출력합니다.

```js
# 코드블록 47
AC[(AC > 5) & (AC != 9)]
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

![Image](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_41.png)

실제로 np.where()를 사용하여 동일한 결과를 얻을 수 있습니다. 아래는 그 방법입니다. 결과 출력은 이전 것과 정확히 동일하기 때문에 나타내지 않습니다.

```python
# Codeblock 48
AC[np.where((AC > 5) & (AC != 9))]
```

np.where() 함수 자체는 배열에서 지정된 기준을 충족하는 색인을 반환하여 작동합니다. 이 특정 경우에는 선택된 색인이 6, 8 및 6에 해당하는 5, 6 및 7이며, 이는 배열 AC에서의 값들과 일치합니다.

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

# 코드블록 49

np.where((AC > 5) & (AC != 9))

# AC의 요소를 떠올려보세요: [9, 4, 5, 3, 2, 6, 8, 6, 5, 4, 5, 5, 3, 2].

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_42.png)

np.where() 함수는 3개의 인수를 전달할 때 더 유용할 수 있습니다. 즉, 조건, x 및 y를 정확한 순서로 전달합니다. 이러한 인수를 다음과 같이 생각할 수 있습니다: "조건이 True를 반환하면 x를 수행하고, 그렇지 않으면 y를 수행합니다." 이를 더 잘 설명하기 위해 다음 코드는 배열 AC의 모든 요소를 5보다 큰 경우 0으로 변환합니다. 그렇지 않으면 숫자가 2씩 추가됩니다.

# 코드블록 50

print(AC)
print(np.where(AC > 5, 0, AC+2))

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

![마스터링 넘파이 효율적인 배열 처리를 위한 포괄적인 가이드 22_43 이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_43.png)

만약 배열 내의 고유한 값의 수를 찾는다는 요청이 오면, np.unique()를 사용할 수 있습니다. 이 함수를 사용하는 방법은 간단합니다. 배열을 유일한 매개변수로 넣기만 하면 됩니다. 또는 만약 원한다면, return_counts=True를 사용하여 해당 값들의 발생 횟수도 얻을 수 있습니다.

```python
# 코드블록 51
np.unique(AC, return_counts=True)
```

![마스터링 넘파이 효율적인 배열 처리를 위한 포괄적인 가이드 22_44 이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_44.png)

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

## 정렬

함수의 이름이 나타내듯이, 배열을 정렬하는 데 필요한 것은 np.sort()입니다. 예를 들어, 여기서 배열 AD와 AE를 가지고 정렬 작업을 수행할 것입니다.

```js
# 코드 블록 52
AD = np.array([77,33,44,99,22,88,55,11,66])
AE = np.array(["Elon Musk", "Bill Gates", "Joe Biden", "Barack Obama"])

print(np.sort(AD))
print(np.sort(AE))
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_45.png" />

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

위의 결과에서 두 배열이 오름차순으로 정렬되어 있음을 확인할 수 있습니다. 실제로 np.sort()에는 결과 배열을 내림차순으로 정렬할 수 있는 매개변수가 없습니다. 따라서, 만일 원한다면 np.flip()을 사용하여 내림차순으로 정렬할 수 있습니다.

```js
# Codeblock 53
print(np.flip(np.sort(AD)))
print(np.flip(np.sort(AE)))

### 대체 방법
# print(np.sort(AD)[::-1])
# print(np.sort(AE)[::-1])
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_46.png" />

만약 배열을 정렬하긴 하되 값이 아닌 인덱스만 필요한 경우, np.argsort()를 사용할 수 있습니다.

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

# 코드블록 54

np.argsort(AD)

# AD의 요소들을 상기해 봅시다: [77, 33, 44, 99, 22, 88, 55, 11, 66].

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_47.png)

Figure 48에 표시된 출력은 기본적으로 AD 배열에서 가장 작은 숫자를 포함하는 7번째 인덱스를 보여줍니다. 이후로 AD[4], AD[1], 등이 따릅니다. 정렬이 제대로 작동하는지 확인하기 위해 np.argsort()의 전체 출력을 사용하여 다음과 같이 인덱싱을 수행할 수 있습니다:

# 코드블록 55

AD[np.argsort(AD)]

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

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_48.png" />

2차원 배열의 경우, axis 매개변수를 사용하여 정렬 방향을 결정할 수 있습니다. 이는 np.sort()와 np.argsort() 둘 다에 적용할 수 있습니다. 아래 배열 AF를 고려해 봅시다.

```js
# 코드블록 56
AF = np.array([[3, 1, 5, 7],
               [8, 9, 3, 2],
               [4, 8, 2, 6]])
```

만약 위 행렬을 열을 따라 정렬하고 싶다면, axis=0을 사용해야 합니다. 반면, axis=1은 행을 따라 정렬할 수 있게 합니다. 아래 코드블록 57는 그 방법을 보여줍니다.

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
# Codeblock 57
print(np.sort(AF, axis=0), end='\n\n')
print(np.sort(AF, axis=1))
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_49.png" />

이 장에 대해 이야기하고 싶은 마지막 주제는 실제로는 정렬과는 크게 관련이 없지만, 여전히 배열 순서와 관련이 있는 주제입니다. 이야기하려는 함수는 np.roll()인데, 이 함수를 사용하여 요소들에 대한 순환 이동을 수행할 수 있습니다. 이 아이디어를 설명하기 위해 먼저 한 시퀀스를 생성할 것입니다.

```js
# Codeblock 58
AG = np.arange(13)
AG
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

아래는 codeblock를 사용하여 시퀀스를 shift 매개변수에 전달한 값에 따라 회전시킬 수 있습니다. 이 경우에는 AG를 오른쪽으로 3번(#(1)) 회전하고 왼쪽으로 3번(#(2)) 회전해 봅니다.

```js
# Codeblock 59
print(np.roll(AG, shift=3))     #(1)
print(np.roll(AG, shift=-3))    #(2)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_51.png" />

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

# 13. 형태와 변경

Python 리스트에서는 len() 함수를 사용하여 요소의 개수를 알 수 있습니다. 그러나 이 방법은 다차원 배열에는 효과적이지 않을 수 있습니다. 다차원 배열에서는 len() 함수가 가장 바깥쪽 차원만을 세기 때문입니다. 아래의 코드 블록에서 len() 함수가 5를 반환하는 것을 볼 수 있습니다. 이는 전체 배열 차원을 나타내지 않습니다.

```js
# 코드 블록 60
AH = np.array([[0,   1,  2,  3,  4,  5],
               [6,   7,  8,  9, 10, 11],
               [12, 13, 14, 15, 16, 17],
               [18, 19, 20, 21, 22, 23],
               [24, 25, 26, 27, 28, 29]])

len(AH)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_52.png" />

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

len() 함수와 다르게 Numpy 배열의 shape 속성을 활용하면 더 정확한 결과를 얻을 수 있어요. 아래의 코드블록 61의 출력 결과를 보면 배열 AH가 5개의 내부 배열로 구성되어 있고, 각 내부 배열은 6개의 요소로 이루어져 있음을 알 수 있어요. 이를 이전 챕터에서 설명했던 대로 5×6 크기의 행렬로 생각할 수 있어요. 또는 이미지 처리에 관심이 있는 경우, 이는 높이가 5이고 너비가 6인 픽셀을 가진 이미지에 해당해요.

```js
# 코드블록 61
AH.shape
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_53.png)

Numpy는 reshape() 메소드를 통해 배열의 모양을 변경할 수 있게 해줘요. 다음 예제에서는 AH를 사이즈 (3,10)으로 재구성하는 방법을 보여드릴게요.

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
# Codeblock 62
AH.reshape(3,10)
```

![Image](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_54.png)

배열을 재구성할 때 중요한 점은 재구성 전후의 총 요소 수가 일정해야 한다는 것입니다. 다시 말해, 배열 차원은 총 요소 수의 인수여야 합니다. 이 요구 사항을 충족하지 못하면 오류가 발생합니다.

배열 재구성은 2D 배열에만 국한되지 않습니다. 아래 코드 블록에서 배열을 3D로 변환하는 예시를 보여드리겠습니다.

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
# 코드 블록 63
AH.reshape(2,3,5)
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_55.png)

축에 대해 선택할 숫자를 확신할 수 없는 경우, 간단히 -1을 쓰면 Numpy가 해당 값을 자동으로 설정해줍니다. 그러나 한 번에 둘 이상의 -1을 전달할 수 없다는 점을 염두에 두세요.

```js
# 코드 블록 64
AH.reshape(-1,5)
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

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_56.png" />

다음은 또 다른 예시입니다. 이 경우에는 배열을 30행 1열로 설정했습니다.

```js
# 코드 블록 65
AH.reshape(-1,1)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_57.png" />

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

만약 다차원 배열을 1차원 배열로 재구성하고 싶다면 flatten()이나 reshape(-1) 메소드를 사용할 수 있어요.

```js
# Codeblock 66
AH.flatten()

### 대안
# AH.reshape(-1)
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_58.png" />

이 주제 외에도, 만약 배열에 빈 축을 추가하고 싶다면 np.newaxis를 사용할 수 있어요. 솔직히 말해서, 이 기술은 조금 직관적이지 않아요. 그래서, 제가 일반적으로 Codeblock 65에서 한 것과 같은 작업을 하는 데 np.reshape()를 사용해요.

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

# 코드 블록 67

AH.flatten()[:, np.newaxis]

### 대안

# AH.flatten().reshape(-1,1)

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_59.png)

아래는 np.newaxis에 대한 또 다른 예제입니다. 여기서는 행에 새로운 축을 추가하는 데 사용했습니다.

# 코드 블록 68

AH.flatten()[np.newaxis, :]

### 대안

# AH.flatten().reshape(1,-1)

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

![Image](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_60.png)

# 14. Concatenation and Splitting

파이썬 리스트에 새 요소를 추가하려면 append() 메소드를 사용할 수 있습니다. Numpy에서는 np.vstack(), np.hstack(), np.append(), np.concatenate()와 같은 다양한 대안이 있습니다. 이러한 함수들은 모두 여러 배열을 결합하는 것이라는 기본 아이디어를 가지고 있지만, 이러한 함수들은 각각 다른 용도를 가지고 있습니다.

이 주제를 논의하기 전에 먼저 두 개의 새 배열 AI와 AJ를 초기화하고 싶습니다.

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
# 코드블록 69
AI = np.array(np.random.randint(0, 5, (2,4)))
AJ = np.array(np.random.randint(5, 10, (2,4)))

print(AI, end='\n\n')
print(AJ)
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_61.png)

두 배열을 수직으로 연결하여 결합하려면 np.vstack()을 사용할 수 있습니다.

```js
# 코드블록 70
np.vstack((AI,AJ))
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

알수 있듯이, np.hstack()은 두 배열을 수평으로 쌓는 데 사용됩니다.

```js
# 코드 블록 71
np.hstack((AI, AJ))
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

np.vstack()과 np.hstack() 함수는 여러 배열을 한 번에 쌓을 수 있습니다. 주의할 점은 배열의 열 수가 동일한 경우 수직 스택이 가능하다는 것입니다. 수평 스택의 경우, 배열의 행 수가 동일할 때만 작동합니다.

```js
# 코드블록 72
print(np.vstack((AI,AJ,AJ,AJ,AI)), end='\n\n')
print(np.hstack((AI,AJ,AJ,AJ,AI)))
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_64.png" />

또한, np.append() 함수는 배열을 연결하기 전에 먼저 배열을 평평하게 만든 후 작동합니다. 따라서 결과적으로 얻는 출력물은 1차원 배열이 됩니다. 이 기본 동작과는 상관없이 np.append() 함수를 np.vstack() 및 np.hstack()와 동일하게 작동하도록 axis 매개변수를 사용할 수 있습니다.

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

# 코드 블록 73

print(np.append(AI, AJ), end='\n\n')
print(np.append(AI, AJ, axis=0), end='\n\n')
print(np.append(AI, AJ, axis=1))

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_65.png" />

사실 np.append() 함수는 한 번에 두 개 이상의 배열을 결합할 수 없습니다. 만약 그렇게 하고 싶다면 np.concatenate()를 사용할 수 있습니다. axis 매개변수도 np.append()와 동일하게 작동합니다. 만약 axis에 값을 지정하지 않으면 np.concatenate() 함수는 수직 스택을 수행합니다.

# 코드 블록 74

print(np.concatenate([AI, AI, AI], axis=None), end='\n\n')
print(np.concatenate([AI, AI, AI]), end='\n\n')
print(np.concatenate([AI, AI, AI], axis=1))

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

<table> 태그를 Markdown 형식으로 바꿔보세요.

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_66.png" />

## Splitting

스택에 사용되는 것뿐만 아니라 Numpy는 분할을 위한 몇 가지 함수도 제공합니다. 아래의 배열 AK를 고려해 봅시다.

```js
# Codeblock 75
AK = np.random.randint(0, 10, (20))
AK
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

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_67.png)

np.split() 함수를 먼저 소개하겠습니다. 이 함수는 두 가지 주요 매개변수를 받습니다: ary (나눌 배열) 및 indices_or_sections (분할 지점). 다음 코드에서는 배열 AL을 인덱스 3과 5에서 나누어 세 개의 새 배열을 얻으려고 합니다. 각 배열은 원본 배열에서 0부터 2까지, 3부터 4까지, 5부터 19까지의 범위를 갖습니다.

```js
# 코드 블록 76
np.split(AK, indices_or_sections=[3,5])
```

![이미지](/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_68.png)

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

2D 배열을 나누려면 np.hsplit() 또는 np.vsplit()을 사용할 수 있습니다. 사실 np.split()에 축 매개변수를 전달하여 동일한 작업을 수행할 수도 있습니다. 주요 아이디어는 기본적으로 동일하지만, np.vsplit() 및 np.hsplit()을 사용하여 분할 지점은 각각 행 번호와 열 번호를 참조합니다. 이러한 두 함수를 배열 AL에 대해 시연하겠습니다.

```js
# 코드블록 77
AL = np.random.randint(0, 10, (5,6))
AL
```

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_69.png" />

아래는 np.vsplit()을 사용하는 방법입니다.

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

# 코드 블록 78

np.vsplit(AL, [2,4])

### 대안

# np.split(AL, [2,4], axis=0)

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_70.png" />

마지막으로 np.hsplit() 사용법입니다.

# 코드 블록 79

np.hsplit(AL, [3,4])

### 대안

# np.split(AL, [3,4], axis=1) #동등한

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

<img src="/assets/img/2024-06-22-MasteringNumPyAComprehensiveGuidetoEfficientArrayProcessingPart22_71.png" />

# 마무리

드디어 끝났어요! 지금까지 저가 자주 사용하는 NumPy 함수들을 다뤄봤어요. 사실 더 설명하지 않은 기능들도 많이 남아 있어요. 하지만 걱정하지 마세요. 이제 모든 기초를 마스터했기 때문에 쉽게 배울 수 있을 거예요.

읽어 주셔서 감사해요. 이 글이 유용했기를 바라며, 다음 글에서 만나요. 안녕히 계세요!

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

# 참고 자료

[1] Universal functions (ufunc). NumPy. https://numpy.org/doc/stable/reference/ufuncs.html [접속일: 2024년 1월 8일].

# 쉽게 이해하기 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

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

- 작가를 칭찬하고 팔로우하려면 클랩을 눌러주세요! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼에서 저희를 만나보세요: CoFeed | Differ
- 더 많은 콘텐츠: PlainEnglish.io
