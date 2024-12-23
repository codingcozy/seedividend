---
title: "고급 자료 구조와 알고리즘 초기 이진 인덱스 트리 구현 방법"
description: ""
coverImage: "/assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsImplementingyourfirstBinaryIndexedTree_0.png"
date: 2024-06-22 02:03
ogImage:
  url: /assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsImplementingyourfirstBinaryIndexedTree_0.png
tag: Tech
originalTitle: "Advanced Data Structures and Algorithms: Implementing your first Binary Indexed Tree"
link: "https://medium.com/bitsrc/advanced-data-structures-and-algorithms-implementing-your-first-binary-indexed-tree-a3fcfd2a98ab"
isUpdated: true
---

## 최적화에 실패한 보통의 데이터 구조

![이미지](/assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsImplementingyourfirstBinaryIndexedTree_0.png)

가끔 데이터 구조는 직접적이고 매우 실용적인 사용 사례를 가지고 있어 누군가 그것을 고안할 만한 이유를 이해할 수 있습니다.

그런데 항상 그렇지만은 않습니다. 때로는 데이터 구조가 그저 어떤 이점이나 성능 향상을 제공하기 위해 존재하는 경우도 있습니다. 항상 사용하실 건가요? 아마도 그렇지 않을 것입니다. 하지만 실제로 유용하게 사용할 때 알아 두어서 기뻐할 것입니다.

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

오늘은 BIT 또는 다른 말로 이진 인덱스 트리에 대해 이야기하고 싶어요. 이 데이터 구조는 검색 및 삽입을 최적화하려고 노력하지만 그것을 실패하는 특징을 가지고 있어요.

# BITs 뒤에 숨겨진 의도

BITs를 "보통인 데이터 구조"라고 부르고 싶어요. 다른 데이터 구조들이 트리에서 삽입 또는 읽기 연산 중 하나를 최적화하려고 하는데 그 결과를 O(1)로 만들고 다른 하나는 O(n)으로 놓는 것에 집중하는 반면, BITs는 두 가지 모두를 개선하려고 해요.

그런데 트리에 삽입하고 읽기를 상수 시간 안에 수행하는 것은 불가능하기 때문에, 이 구조체가 시도하는 것에 실패한다고 말하는 건 정말 그렇게 생각해요.

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

말이 그렇게 되면, 실제로 BITs는 O(Log n) 성능으로 데이터를 삽입하고 읽을 수 있게 해줍니다. 대단하지도 않고 최악도 아니라서, 그러니까 그냥 보통 정도입니다.

농담은 그만두고, BITs를 사용하면 트리를 쿼리하고 업데이트하는 데 합리적인 성능을 제공합니다. 따라서 트리 모양의 구조물을 다루고 논리가 그것에 많은 읽기 및 쓰기를 수행하는 경우, 이것이 당신에게 적합한 데이터 구조일 수 있습니다.

이 데이터 구조의 주요 사용 사례는 배열 내 요소들의 효율적인 접두사 합계(즉, n번째까지의 모든 요소의 합)를 가질 수 있는 능력입니다. 이것은 산술 코딩을 사용할 때 편리하다고 합니다. 그러나 우리는 지금 그 무한한 토끼굴에 들어가지 않겠습니다.

# JavaScript에서 이진 색인 트리 구현

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

이 코드를 구현할 때, 예상과는 다르게 할 것입니다. 클래스로 트리 구조를 구현하는 대신, 이 구조를 배열로 나타내고 트래버스하는 방법으로 이해할 수 있도록 특수한 비트 연산을 사용할 것입니다.

두 가지 작업에 초점을 맞출 것입니다: 업데이트와 특정 위치까지의 합을 얻는 것입니다.

업데이트 작업은 주어진 값을 원하는 위치에 추가하고, 또한 구조를 트래버스하여 모든 하위 항목을 업데이트 할 것입니다.

"getSum" 작업은 원하는 노드까지의 서브트리의 합을 반환할 것입니다.

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

## BIT 생성하기

처음 다룰 주제는 어떻게 만드는 지입니다. 앞서 말했듯이 배열로 표현하고, 현재 인덱스의 마지막 설정 비트를 계산하여 이동하며, 트리를 탐색할 때 이를 추가하거나 제거합니다.

먼저, BIT를 초기 생성할 때는 아래로 이동하므로, 마지막 설정된 비트를 추가합니다.

초기에 BIT 배열은 모두 0으로 설정되어 있고, 우리는 원본 값의 배열을 지나가며 이 논리를 따릅니다:

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

- 첫 번째 인덱스(이 경우에는 0)부터 시작합니다.
- 인덱스에 1을 추가합니다(BIT 배열은 초기 요소가 비어 있는 상태입니다).
- 현재 인덱스의 배열 값과 BIT 배열 내의 새 위치에 값을 추가합니다.
- 인덱스의 마지막으로 설정된 비트(즉, 1)을 가져와 인덱스에 추가하여 2로 바꿉니다.
- 단계 1로 돌아갑니다.

시작할 배열이 다음과 같다고 가정해 봅시다: [2, 1, 1, 3, 2, 3], 그리고 BIT에 접두사 합을 저장하려고 할 때:

- 인덱스 0에서 2의 값을 얻습니다.
- BIT 배열에 가서 1을 추가하여 BIT 인덱스를 1로 만듭니다.
- BIT 배열의 위치 1에 있는 값에 2를 추가하여 2로 만듭니다.
- 1의 마지막 설정된 비트인 1을 가져와 BIT 인덱스에 추가하여 2로 만듭니다.
- BIT 배열의 인덱스 2에서는 다시 2를 추가하여 2가 됩니다.
- 2의 마지막 설정된 비트(10)는 2이므로 BIT 인덱스 4로 이동합니다.
- BIT 인덱스 4에 2를 추가하여 마찬가지로 2가 됩니다.
- 4의 마지막 설정된 비트(100)도 4이므로 존재하지 않는 8로 이동하게 되고 여기서 종료됩니다.

이 시점에서 BIT 배열은 다음과 같이 보입니다: [0, 2, 2, 0, 2, 0, 0]

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

그리고 우리는 원래 배열의 첫 번째 2개만 추가했습니다. 이제 우리 배열의 두 번째 요소에도 같은 작업을 수행합니다(위치 1):

- 원래 인덱스 1은 BIT 인덱스 2를 의미합니다(시작 시 인덱스에 1을 추가하는 것을 기억하세요).
- 우리는 BITArray[2]의 값에 1을 추가하여 3으로 만듭니다.
- 2가 4로 변하기 때문에 BIT 배열의 4번째 위치에 1을 추가하여 또한 3으로 만듭니다.
- 그리고 이제 4가 8로 변하면서 다시 범위를 벗어나게 되므로 여기서 멈춥니다.

이 시점에서 BIT 배열은 다음과 같이 보입니다: [0, 2, 3, 0, 3, 0, 0]

그리고 계속 진행하면 다음과 같은 결과를 얻게 됩니다:

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
Idx — BIT 배열
0 — [0, 0, 0, 0, 0, 0, 0] - 초기 상태
1 — [0, 2, 2, 0, 2, 0, 0] - 첫 번째 반복
2 — [0, 2, 3, 0, 3, 0, 0] - 두 번째 반복 (위에서 설명한대로)
3 — [0, 2, 3, 1, 4, 0, 0]
4 — [0, 2, 3, 1, 7, 0, 0]
5 — [0, 2, 3, 1, 7, 2, 2]
6 — [0, 2, 3, 1, 7, 2, 5]
```

모든 값을 BIT 배열에 추가한 후에는 [0, 2, 3, 1, 7, 2, 5]가 됩니다.

이해를 돕기 위해 다음과 같이 구현을 살펴보겠습니다:

constructBITree 함수는 배열을 초기화하고 각 값에 대해 업데이트하는 역할을 합니다.

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

이제 배열이 설정되면, 원하는 색인까지의 접두사 합을 요청할 수 있는 쿼리를 시작할 수 있습니다.

## 트리 쿼리

트리를 쿼리하는 것은 이전과 유사한 접근 방식을 따릅니다만, 역으로 진행됩니다.

인덱스 0 대신 우리가 찾고 있는 인덱스에서 (물론 1을 더한 값으로) 시작하고, 해당 인덱스의 마지막 비트를 제거하여 0 또는 그 이하로 이동하면서 트리를 "위로" 이동합니다.

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

우리의 BIT 배열 [0, 2, 3, 1, 7, 2, 5]에서 트리에 쿼리하여 5번째 요소의 접두사 합을 얻고 싶다고 합시다. 물론, 이는 원래 배열의 모든 값을 더하는 것과 동일하다는 것을 의미합니다 (6개의 값이 있음).

- 이제, 인덱스 5에서 시작하지만 1을 추가하여 6이 되었습니다.
- BIT 배열의 6번째 인덱스의 값은 5입니다.
- 이제, 인덱스의 마지막 설정된 비트 (6이며 2진법으로 110입니다)를 빼서 4로 만듭니다.
- 우리의 BIT 배열에서 4번째 인덱스의 값은 7이므로 5에 추가하여 약 12가 됩니다.
- 4의 마지막 설정된 비트는 4이므로, 빼서 0이 됩니다.
- 끝났습니다.

원래 배열을 모두 순회하여 모든 숫자를 더하는 대신, 우리는 BIT 배열에서 2개의 값을 필요로 했습니다. 이 변경으로 O(n)을 O(Log2(n)) 알고리즘으로 변환했습니다. 꽤 멋지죠?!

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

자, 이제 구현을 살펴봅시다:

이것은 간단한 구현입니다. 핵심은 8번 라인이며, 여기서 현재 인덱스에서 마지막으로 설정된 비트를 뺍니다. 여기서 모든 마법이 벌어집니다.

읽어주셨나요? IT 산업에서 2 십년의 지혜를 무료로 공유하는 제 뉴스레터를 구독해보세요. "늙은 개발자의 헛소리"에 가입하세요!

이진 색인 트리는 그 뒤의 논리를 이해하면 매우 멋집니다. 첫 시도에서 이해하기 어려워 해도 걱정하지 마세요. "이해하는 데 오랜 시간이 걸렸어요". 중간값을 저장된 배열에서 확인하고 위에 보여준 단계를 따라 가는 것이 내 추천입니다.

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

BITs를 사용해 보신 적이 있나요? 그것으로 무엇을 하셨나요? 이 데이터 구조의 실제 구현에 대해 알고 싶어요! 그러니까 의견란에 공유해 주세요!

# 레고처럼 재사용 가능한 구성 요소로 앱 구축하기

![이미지](/assets/img/2024-06-22-AdvancedDataStructuresandAlgorithmsImplementingyourfirstBinaryIndexedTree_1.png)

Bit의 오픈소스 도구는 25만 명 이상의 개발자가 구성 요소로 앱을 만드는 데 도와주고 있어요.

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

어떤 UI, 기능 또는 페이지를 재사용 가능한 구성 요소로 변환하여 여러 애플리케이션 간에 공유하세요. 협업하기가 더 쉽고 빠르게 빌드할 수 있어요.

→ 자세히 알아보기

앱을 구성 요소로 분할하여 앱 개발을 더 쉽게 만들고 원하는 작업 흐름에 대한 최상의 경험을 누리세요:

## → 마이크로 프론트엔드

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

## → 디자인 시스템

## → 코드 공유 및 재사용

## → 모노 저장소

# 더 알아보기
