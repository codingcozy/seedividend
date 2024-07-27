---
title: "Leetcode-데일리 챌린지 1701 평균 대기 시간 구하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-Leetcode-DailyChallenge1701AverageWaitingTime_0.png"
date: 2024-07-09 21:11
ogImage: 
  url: /assets/img/2024-07-09-Leetcode-DailyChallenge1701AverageWaitingTime_0.png
tag: Tech
originalTitle: "Leetcode-Daily Challenge: 1701. Average Waiting Time"
link: "https://medium.com/@trinadhrayala/leetcode-daily-challenge-1701-average-waiting-time-acd53263b9fa"
---


트리나드 라야라의 환영 메시지:
제 글을 읽어 주셔서 감사합니다! 내용이 마음에 드셨다면 Clapping을 누르고 Medium에서 저를 팔로우해 주시면 감사하겠습니다. 여러분의 지원이 저에게 많은 힘이 됩니다. 앞으로도 유익한 콘텐츠를 계속 제작할 수 있도록 도와주세요.

문제 설명:
한 명의 요리사가 있는 레스토랑이 있습니다. customers 배열이 주어지며, customers[i] = [도착시간i, 준비시간i]로 구성됩니다.

- 도착시간i는 i번째 고객의 도착 시간입니다. 도착 시간은 비내림차순으로 정렬됩니다.
- 준비시간i는 i번째 고객의 주문을 준비하는 데 걸리는 시간입니다.

고객이 도착하면 요리사에게 주문을 하고, 요리사는 한 번에 한 명의 고객을 위해 음식을 준비합니다. 요리사는 입력으로 주어진 순서대로 고객들을 위해 음식을 준비합니다. 고객은 요리사가 주문을 준비하는 동안 기다립니다.

<div class="content-ad"></div>

모든 고객의 평균 대기 시간을 반환합니다. 실제 답변과 10-5 내의 해결책은 허용됩니다.
예시 1:

```js
Input: customers = [[1,2],[2,5],[4,3]]
Output: 5.00000
Explanation:
1) 첫 번째 고객은 시간 1에 도착하며, 요리사는 주문을 받아 시간 1에 즉시 준비를 시작하고 시간 3에 완료하여 첫 번째 고객의 대기 시간은 3 - 1 = 2입니다.
2) 두 번째 고객은 시간 2에 도착하며, 요리사는 주문을 받아 시간 3에 준비를 시작하고 시간 8에 완료하여 두 번째 고객의 대기 시간은 8 - 2 = 6입니다.
3) 세 번째 고객은 시간 4에 도착하며, 요리사는 주문을 받아 시간 8에 준비를 시작하고 시간 11에 완료하여 세 번째 고객의 대기 시간은 11 - 4 = 7입니다.
따라서 평균 대기 시간은 (2 + 6 + 7) / 3 = 5입니다.
```

예시 2:

```js
Input: customers = [[5,2],[5,4],[10,3],[20,1]]
Output: 3.25000
Explanation:
1) 첫 번째 고객은 시간 5에 도착하며, 요리사는 주문을 받아 시간 5에 즉시 준비를 시작하고 시간 7에 완료하여 첫 번째 고객의 대기 시간은 7 - 5 = 2입니다.
2) 두 번째 고객은 시간 5에 도착하며, 요리사는 주문을 받아 시간 7에 준비를 시작하고 시간 11에 완료하여 두 번째 고객의 대기 시간은 11 - 5 = 6입니다.
3) 세 번째 고객은 시간 10에 도착하며, 요리사는 주문을 받아 시간 11에 준비를 시작하고 시간 14에 완료하여 세 번째 고객의 대기 시간은 14 - 10 = 4입니다.
4) 네 번째 고객은 시간 20에 도착하며, 요리사는 주문을 받아 시간 20에 즉시 준비를 시작하고 시간 21에 완료하여 네 번째 고객의 대기 시간은 21 - 20 = 1입니다.
따라서 평균 대기 시간은 (2 + 6 + 4 + 1) / 4 = 3.25입니다.
```

<div class="content-ad"></div>

제약 조건:

- 1 ≤ customers.length ≤ 105
- 1 ≤ arrival[i], time[i] ≤ 10^4
- arrival[i] ≤ arrival[i+1]

1. time 및 avgTime을 0으로 초기화합니다.
time은 요리사가 현재 주문을 마칠 시간을 추적합니다.
avgTime은 모든 고객들의 총 대기 시간을 누적합니다.

2. 고객을 순회합니다:
만약 요리사가 이전 주문을 마치고 현재 고객이 도착하기 전에 있다면 (time < arrival[i]), time을 현재 고객의 도착 시간으로 업데이트합니다 (time = arrival[i]).
현재 주문의 준비 시간을 time에 추가합니다 (time += time[i]).
현재 고객의 대기 시간을 계산하고 (time - arrival[i]) avgTime에 추가합니다.
3. 평균 대기 시간은 avgTime을 고객 수로 나누어 계산합니다.

<div class="content-ad"></div>

```js
class Solution {
    public double averageWaitingTime(int[][] customers) {
        double time = 0, avgTime = 0;

        for(int i = 0;i < customers.length; i++){
            int[] orders = customers[i];
            if(time < orders[0]) time = orders[0];
            time += orders[1];
            avgTime += (time - orders[0]);
        }
        return avgTime / customers.length;
    }
}
```

# 시간 복잡도 분석

- 시간 복잡도: 이 접근 방식의 시간 복잡도는 O(n)이며, 여기서 n은 고객의 수입니다. 이는 고객 목록을 한 번 반복하기 때문입니다.
- 공간 복잡도: 공간 복잡도는 변수 time과 avgTime에 대해 추가로 일정한 양의 공간만 사용하므로 O(1)입니다.

팁:
주어진 문제 설명을 더 잘 이해하기 위해 leetcode에서 제공한 힌트를 읽고 이해해 보세요.


<div class="content-ad"></div>


![Image 0](/assets/img/2024-07-09-Leetcode-DailyChallenge1701AverageWaitingTime_0.png)

![Image 1](/assets/img/2024-07-09-Leetcode-DailyChallenge1701AverageWaitingTime_1.png)

![Image 2](/assets/img/2024-07-09-Leetcode-DailyChallenge1701AverageWaitingTime_2.png)

![Image 3](/assets/img/2024-07-09-Leetcode-DailyChallenge1701AverageWaitingTime_3.png)


<div class="content-ad"></div>

감사합니다.
참고: 수정이 필요한 부분이 있으면 피드백란에 언급해 주시고 친구들과 공유해 주시고 팔로우 버튼을 클릭해 주세요.

즐거운 코딩,
Trinadh Rayala