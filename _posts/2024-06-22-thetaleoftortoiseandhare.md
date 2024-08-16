---
title: "거북이와 토끼의 이야기 승리의 비결은 무엇일까"
description: ""
coverImage: "/assets/img/2024-06-22-thetaleoftortoiseandhare_0.png"
date: 2024-06-22 02:02
ogImage: 
  url: /assets/img/2024-06-22-thetaleoftortoiseandhare_0.png
tag: Tech
originalTitle: "the tale of tortoise and hare"
link: "https://medium.com/@thakuria.mayukh/the-tale-of-tortoise-and-hare-43c55e459a07"
isUpdated: true
---




# 소개

거북이와 토끼 알고리즘 또는 플로이드의 순환 감지 알고리즘은 연결 리스트의 경우에 매우 일반적으로 사용되는 알고리즘입니다. 이는 기초 역학 법칙과 직관에 기반을 둔 것입니다. 본문은 본 알고리즘에 대해 간단히 설명하고, 이 마법 같은 알고리즘에 대해 모두에게 알려주려고 합니다.

# 직관

우리에게 루프가 있는 연결 리스트가 있다고 가정해 봅시다. 만약 여러분이 연결 리스트의 루프가 무엇인지 모르는 경우, 마지막 노드가 리스트의 중간 노드를 자신의 노드로 가지고 있는 경우를 의미합니다.

<div class="content-ad"></div>

이건 무한 루프를 만들어버리네요!!!

![image](/assets/img/2024-06-22-thetaleoftortoiseandhare_0.png)

하지만 어떻게 해결할 수 있을까요?

한 순간 동안 이 문제를 내버려두고 다른 영역으로 들어가볼까요?

<div class="content-ad"></div>

고속과 저속(토끼와 거북이) 두 개의 포인터를 만들어서 거북이와 토끼를 반영하겠습니다. 빠른 포인터는 2의 속도(반복당 두 노드)로 이동하고, 느린 포인터는 1의 속도(반복당 한 노드)로 이동합니다. 두 포인터가 만난다면 이는 반복이 있음을 의미합니다.

하지만 이 두 포인터가 어떻게 만나게 되는지 아십니까?

<div class="content-ad"></div>

# 수학적 증명

알고리즘이 왜 동작하는지 자세히 살펴보겠습니다.

지금 우리는 느린 포인터와 빠른 포인터가 서로 다른 시간에 루프에 들어간다는 것을 알고 있습니다. 느린 포인터는 속도가 1이므로 각 반복에서 링크를 한 번씩만 건너뜁니다. 빠른 포인터는 속도가 2입니다. 따라서 매 반복마다 빠른 포인터는 1단계씩 느린 포인터에 접근하게 되고, 루프에 들어갈 때 느린 포인터와 빠른 포인터 사이의 거리는 항상 1로 나눌 수 있으므로, 빠른 포인터는 한 번의 루프 이내에 느린 포인터를 잡아내게 됩니다.

또 다른 방식으로 생각해 보실 수도 있습니다. 느린 포인터가 한 위치에 갇혀 있고 전체 링크드 리스트가 속도 1로 움직인다고 상상해 보십시오. 이것은 빠른 포인터가 느린 포인터에 대해 매 반복에서 노드 1개씩만 움직인다는 것을 의미합니다.

<div class="content-ad"></div>


![이미지 1](/assets/img/2024-06-22-thetaleoftortoiseandhare_2.png)

![이미지 2](/assets/img/2024-06-22-thetaleoftortoiseandhare_3.png)

빠른 속도와 느린 속도 사이의 거리와 시작 위치와는 관계없이 루프가 있다면 결국 만날 것을 증명했습니다.

# 코드


<div class="content-ad"></div>

내감으로 코드를 작성해볼까요?

우선, 노드를 만들어봅시다.

```js
class Node {
    constructor(name = null) {
        this.val = name;
        this.next = null;
    }
}
```

그런 다음 두 개의 포인터를 생성하고, 이를 헤드를 가리키도록 할 것입니다.

<div class="content-ad"></div>

```js
var isLoop = function(head) {
    let slow = head;
    let fast = head;
}
```

제거 사례 설정 중입니다.

```js
var isLoop = function(head) {
    let slow = head;
    let fast = head;
    while (fast != null && fast.next != null) {

    }
    return false
}
```

포인터를 이동합니다.

<div class="content-ad"></div>

```js
var isLoop = function(head) {
    let slow = head;
    let fast = head;
    while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast == slow) {
            return true;
        }
    }
    return false;
}
```

이제 우리의 코드가 완성되었어요. 우리는 드디어 루프를 감지할 수 있는 코드를 작성했어요.

그게 다일까요? 이 알고리즘의 유일한 용도인가요?

# 사용 사례


<div class="content-ad"></div>

이 알고리즘의 주요 사용 사례 중 하나가 사이클 탐지인데, 단순히 그것만이 아닙니다. 다른 사용 사례를 살펴봅시다.

연결 리스트의 중간을 찾아 봅시다. 우연히도 이를 수행하는 최적 알고리즘은 토끼와 거북이 알고리즘입니다.

두 대의 차량이 있는 트랙이 있다고 가정해 봅시다. 차량 1은 차량 2의 반 속도입니다. 따라서 차량 2가 트랙 끝에 도달할 때, 차량 1은 트랙의 중간에 있을 것입니다. 이것이 우리의 직관입니다.

이를 코딩해 봅시다.

<div class="content-ad"></div>

```js
// 코드 함수 변환
var mid = function(head) {
    let slow = head;
    let fast = head;
    while (fast != null || fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
}
```

다른 예제 사용 사례로는 연결 리스트의 중간 노드를 삭제하는 것이 있습니다.

이전 솔루션을 이 질문에 구현하려고 하면 문제가 발생합니다. 만약 중간 노드를 삭제해야 한다면, 우리는 slow가 중간 노드 직전 노드에서 멈추길 원합니다. 어떻게 할 수 있을까요?

한 가지 분명한 해결책은 slow 포인터보다 한 단계 이전인 이전 포인터를 사용하는 것일 수 있고, 실제로 이것은 좋은 해결책입니다. 그러나 더 나은 해결책은 fast 포인터에 앞서 시작하는 기회를 주는 것입니다. 이렇게 하면 slow가 이전 알고리즘보다 한 단계 더 적게 이동합니다. 그러므로 우리는 해결책을 찾았습니다.


<div class="content-ad"></div>

솔루션을 코드로 작성해 보겠습니다.

```js
var midRemover = function(head) {
    if (head == null || head.next == null) {
        return head;
    }
    let slow = head;
    let fast = head.next.next;
    while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return head;
}
```

그래서 Linked Lists의 경우 거북이와 토끼 알고리즘은 매우 유용하지만, 시간 복잡도와 공간 복잡도는 어떨까요?

# 시간 복잡도

<div class="content-ad"></div>

이 알고리즘의 시간 복잡도를 찾아 봅시다. 머리와 루프의 시작 사이에 거리 x가 있다고 가정하고, 루프의 길이가 y이라고 합시다. slow가 루프의 시작점에 도달할 때, 걸린 반복 횟수는 x일 것입니다. 또한, fast 포인터가 slow가 루프의 시작점에 도달할 때 어디에 있든, fast가 slow에 도달하는 데 걸릴 수 있는 최대 반복 횟수는 y입니다. 왜냐하면 두 지점 사이의 최대 가능한 거리는 y-1이기 때문에, 거리는 1단위로 감소하므로 fast가 slow에 도달하는 데 걸리는 최대 시간은 y-1이지만 우리는 y로 근사합니다.

따라서 알고리즘의 시간 복잡도는 O(N)입니다.

# 공간 복잡도

이 알고리즘은 두 개의 포인터만 사용합니다. 따라서 링크드 리스트의 크기가 변경되더라도 알고리즘에 사용되는 추가 공간은 변하지 않습니다.

<div class="content-ad"></div>

이 알고리즘에 사용된 추가 공간은 O(1)입니다.