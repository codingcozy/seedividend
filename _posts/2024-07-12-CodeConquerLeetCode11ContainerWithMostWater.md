---
title: "LeetCode 11 - Container With Most Water 최대 물 용량 계산 방법 배우기"
description: ""
coverImage: "/assets/img/2024-07-12-CodeConquerLeetCode11ContainerWithMostWater_0.png"
date: 2024-07-12 21:37
ogImage: 
  url: /assets/img/2024-07-12-CodeConquerLeetCode11ContainerWithMostWater_0.png
tag: Tech
originalTitle: "Code , Conquer: LeetCode #11 — Container With Most Water"
link: "https://medium.com/@ChrisBader/code-conquer-leetcode-11-container-with-most-water-b2d187f81402"
isUpdated: true
---




중간 회원이 아니세요? 친구 링크를 통해 전체 기사를 읽어보세요!

# 빠른 메뉴

- 빠른 메뉴
- 소개
- 문제
  - 문제 설명
  - 문제 예시
  - 문제 제약 조건
  - 문제 요약
- 해결책
  - "모두를 확인해 봅시다" 접근 방식
  - 포인터 솔루션
  - 포인터 솔루션 - 수정
- 요약

# 소개

<div class="content-ad"></div>

안녕하세요. 얼마동안 아무것도 해결하지 못했어요. 공부에 집중해야 했거든요. 그런데 다시 LeetCode에 도전하고 싶어요. 이 문제는 중간 난이도라 너무 복잡하지 않을 거에요. 좋은 해결책을 찾아볼까요?

# 문제

## 문제 설명

문제 정의를 살펴보겠습니다:

<div class="content-ad"></div>

## 문제 예시

그들은 더 명확히 설명하기 위해 이미지와 몇 가지 예시를 추가했어요:

![image](/assets/img/2024-07-12-CodeConquerLeetCode11ContainerWithMostWater_0.png)

## 문제 제약조건

<div class="content-ad"></div>

또한 문제에 일부 제약 조건이 적용됩니다:

![problem constraints](/assets/img/2024-07-12-CodeConquerLeetCode11ContainerWithMostWater_1.png)

## 문제 요약

이제 모든 것을 모았으니, 여기서 다루어야 할 문제를 살펴보겠습니다. 우리는 이차원 컨테이너로 사용될 수 있는 "벽"을 나타내는 높이 배열을 주어집니다.

<div class="content-ad"></div>

가장 많은 물을 저장할 수 있는 컨테이너를 찾기 위해 두 벽으로 표현된 컨테이너에 저장될 수 있는 물의 양을 최대화하는 것이 목표입니다. 몇 가지 잠재적인 해결책을 살펴보겠습니다.

# 해결책

## "모든 경우를 확인해보는 거야" 방식

떠오르는 첫 번째 생각은 가장 큰 표면적을 가진 조합을 추적하면서 가능한 모든 벽 조합을 반복하는 것입니다. 이 방법이 가장 많은 물을 저장할 수 있는 컨테이너를 찾는 데 도움이 될 것입니다.

<div class="content-ad"></div>

이를 위해, 우리는 다음을 수행합니다:

- 왼쪽과 오른쪽 벽을 살펴본 거리 x를 계산합니다.
- 컨테이너의 높이 y를 살펴본 두 벽 중 작은 것으로 계산합니다. 컨테이너는 가장 낮은 벽만큼 높을 수 있기 때문에 그 이상으로는 물을 잃게 됩니다.
- 최대 면적을 추적하는 변수 maxArea를 유지합니다.

다음은 이러한 구현이 어떻게 보일 수 있는지에 대한 예시입니다:

알겠어요, 이 방식이 작동한다고 약속할게요, 하지만...

<div class="content-ad"></div>


![CodeConquerLeetCode11ContainerWithMostWater](/assets/img/2024-07-12-CodeConquerLeetCode11ContainerWithMostWater_2.png)

당연한 이야기일 수도 있지만, 모든 가능한 조합을 반복하는 것은 계산상으로 너무 비싼 방법입니다. 벽 배열의 제약 조건에는 최대 10^5까지 확장될 수 있다고 명시되어 있습니다. 즉, (10^5)² = 10¹⁰ 개의 조합을 확인해야 합니다. 효율적으로 원하는 바가 아닙니다. 다른 잠재적인 해결책을 살펴보겠습니다:

## 포인터 솔루션

첫 번째 방법을 개선하기 위해, 고려할 벽을 추적하기 위한 포인터를 활용할 수 있습니다. 가장 왼쪽에서 시작하는 포인터와 가장 오른쪽에서 시작하는 포인터를 할당하면, 일부 주어진 조건에 따라 벽 배열을 탐색할 수 있습니다:


<div class="content-ad"></div>

- 만약 왼쪽 벽이 오른쪽 벽보다 높다면, 오른쪽 포인터를 한 칸 왼쪽으로 이동시킵니다.
- 만약 오른쪽 벽이 왼쪽 벽보다 높다면, 왼쪽 포인터를 한 칸 오른쪽으로 이동시킵니다.
- 왼쪽 포인터가 오른쪽 포인터보다 높거나 같다면, 모든 관련 벽 조합을 이미 확인했기 때문에 해결책을 반환합니다.

이렇게 함으로써 항상 가장 높은 벽을 지속적으로 추적하여 다른 잠재적으로 유망한 후보들과 비교합니다. 좀 더 자세히 설명한 작은 그래픽을 준비했어요:

![그림](/assets/img/2024-07-12-CodeConquerLeetCode11ContainerWithMostWater_3.png)

더 작은 벽으로부터 항상 멀어지도록 이동하기 때문에 잠재적으로 더 큰 영역만을 살펴볼 수 있습니다. 이 최적화를 통해 무차별 대입법(O(n²))보다 시간 복잡도를 개선하여 O(n)로 줄일 수 있습니다.

<div class="content-ad"></div>

아래는 알고리즘의 구현입니다:

이제 리트코드에서 무엇을 말하는지 확인해보겠습니다:

![이미지](/assets/img/2024-07-12-CodeConquerLeetCode11ContainerWithMostWater_4.png)

좋아요, 실행 시간을 초과하지 않고 5밀리초 내에 실행됩니다. 대부분의 경우에는 괜찮지만, 다른 사용자들은 더 나은 것을 찾은 것으로 보입니다. 더 나아지는 방법이 있는지 살펴봅시다.

<div class="content-ad"></div>

## 포인터 솔루션 — 개정판

그래픽을 다시 살펴보겠습니다:

![image](/assets/img/2024-07-12-CodeConquerLeetCode11ContainerWithMostWater_5.png)

알고리즘이 진행됨에 따라 벽들이 서로 가까워지는데, 두 벽이 보다 큰 컨테이너를 형성하려면 벽 크기가 커져야합니다. 이 특성 덕분에 현재 고려 중인 두 벽 중 작은 벽보다 작은 벽들은 안전하게 건너뛸 수 있습니다.

<div class="content-ad"></div>

이렇게 함으로써 우리는 동적으로 해야 할 계산을 줄일 수 있어요. 코드를 살펴보죠:

우리는 필요한 계산을 최대한 줄이도록 관련 벽 쌍에 대해 최대 면적을 계산하는 방식으로 줄입니다.

이것은 사소한 개선이지만 우리를 리더 보드의 꼭대기로 이끌어줍니다:

![이미지](/assets/img/2024-07-12-CodeConquerLeetCode11ContainerWithMostWater_6.png)

<div class="content-ad"></div>

# 요약

O(n²)에서 O(n)으로 복잡성을 줄이는 것이 필요했습니다. 처음 방법은 실행 비용이 너무 비싸서 이러한 개선이 반드시 필요했습니다. 더 개선할 여지가 있을 수 있지만, 효율성과 가독성 측면에서 발견한 해결책에 만족합니다. 내 솔루션과는 다른 것을 생각해본다면 언제든지 말해주세요!

읽어 주셔서 정말 감사합니다. 궁금한 점이나 의견이 있으면 언제든지 댓글을 남겨주세요!