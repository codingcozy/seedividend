---
title: "자바스크립트 DSA 모험 - 3장 - 배열-01"
description: ""
coverImage: "/assets/img/2024-06-20-JavaScript-DSAAdventures-Chapter03-Array-01_0.png"
date: 2024-06-20 07:17
ogImage: 
  url: /assets/img/2024-06-20-JavaScript-DSAAdventures-Chapter03-Array-01_0.png
tag: Tech
originalTitle: "JavaScript-DSA Adventures -Chapter 03 -Array-01"
link: "https://medium.com/@nmjnishchitha/javascript-dsa-adventures-03-array-01-3d00a3c5ab2f"
isUpdated: true
---




이 블로그에서는 프로그래밍에서 핵심적이고 널리 사용되는 배열 데이터 구조를 알아볼 것입니다.

배열은 메모리가 서로 옆에 위치한 선형 데이터 구조입니다. 우리는 배열 요소에 인덱스 번호로 액세스할 수 있습니다. 배열은 대량의 데이터를 저장하는 데 자주 사용됩니다. 메모리 할당과 차원을 기반으로 범주화된 다양한 유형의 배열이 있습니다.

# 메모리 할당에 따른 배열

정적 배열: 배열 크기가 고정된 배열로, 메모리 할당이 배열 생성 시에 이루어집니다.

<div class="content-ad"></div>

```js
let arr=[1,2,3,4,5];
```

동적 배열: 크기가 동적으로 커질 수 있는 배열이며, 메모리 할당이 동적으로 이루어집니다.

```js
let arr= new Array(5);
```

# 차원에 따른 배열

<div class="content-ad"></div>

a. 일차원

b. 다차원

# 미리 정의된 배열 메소드의 복잡성 분석

- push(): 배열의 끝에 요소를 추가하며 다른 인덱스를 업데이트하지 않습니다.
시간 복잡도: O(1)
공간 복잡도: O(1)

<div class="content-ad"></div>


![image](https://miro.medium.com/v2/resize:fit:1400/1*opzqu5bRV6657AZwySuS5g.gif)

2. pop(): 배열의 끝에서 요소를 제거하고 다른 인덱스를 업데이트하지 않습니다.
시간 복잡도: O(1)
공간 복잡도: O(1)

![image](https://miro.medium.com/v2/resize:fit:1400/1*cP7tauXB0AkDx9P0ECRooA.gif)

3. shift(): 배열의 시작에서 요소를 제거하고 남은 인덱스를 업데이트합니다.
시간 복잡도: O(n)
공간 복잡도: O(1)


<div class="content-ad"></div>


![image](https://miro.medium.com/v2/resize:fit:1400/1*wDYt2Kg8rb0miocg8amjYw.gif)

4. unshift(): 배열의 시작 부분에 요소를 추가하고 남은 인덱스를 업데이트합니다.
시간 복잡도: O(n)
공간 복잡도: O(1)

![image](https://miro.medium.com/v2/resize:fit:1400/1*HagypKnHwgJPgAA53o2IAQ.gif)

5. splice(): 기존 요소를 이동하여 요소를 추가하거나 제거합니다.
시간 복잡도: O(n)
공간 복잡도: O(n) (요소가 추가되면 새로운 요소에 대한 추가 공간이 필요합니다)


<div class="content-ad"></div>

6. concat(): 두 배열을 병합합니다.  
시간 복잡도: O(n + m) (여기서 'n'과 'm'은 병합되는 배열의 길이입니다)  
공간 복잡도: O(n + m) (결과를 저장하기 위해 새로운 배열이 생성됨)

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*u4_C14uNAEPERs71mjPssQ.gif)

7. 요소에 접근 (arr[index]): 인덱스를 사용하여 요소에 직접 액세스합니다.  
시간 복잡도: O(1)  
공간 복잡도: O(1)

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*6OuIlKR5RJiLwCS3SAM3lg.gif)

<div class="content-ad"></div>

8. map(): 호출한 배열의 각 요소에 대해 함수를 호출하여 새 배열을 생성합니다.
시간 복잡도: O(n)
공간 복잡도: O(n) (동일한 크기의 새 배열이 생성됨)

9. forEach(): 배열 요소마다 한 번씩 제공된 함수를 실행합니다.
시간 복잡도: O(n)
공간 복잡도: O(1)

10. reduce(): 누산기에 대해 함수를 적용하고 배열의 각 요소마다 하나의 값을 줄입니다.
시간 복잡도: O(n)
공간 복잡도: O(1)

11. filter(): 제공된 함수에 의해 구현된 테스트를 통과하는 모든 요소로 새 배열을 생성합니다.
시간 복잡도: O(n)
공간 복잡도: O(n) (필터링된 요소를 보유하는 새 배열이 생성됨)

<div class="content-ad"></div>

12. slice(): 기존 배열의 일부를 추출하여 새 배열을 생성합니다.
시간 복잡도: O(n)
공간 복잡도: O(n) (추출된 요소로 새 배열이 생성됩니다)

13. includes(): 배열에 특정 값이 포함되어 있는지 여부를 확인합니다.
시간 복잡도: O(n)
공간 복잡도: O(1)

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*qAvY1uZYVoruLu2hiDG7Ow.gif)

14. indexOf(): 주어진 요소가 처음으로 발견되는 인덱스를 반환합니다.
시간 복잡도: O(n)
공간 복잡도: O(1)

<div class="content-ad"></div>


![image](https://miro.medium.com/v2/resize:fit:1400/1*vjlt1A3ss8ncvINiuD4QJg.gif)

15. find(): 주어진 테스트 함수를 만족하는 배열 내 첫 번째 요소를 반환합니다.
시간 복잡도: O(n)
공간 복잡도: O(1)

![image](https://miro.medium.com/v2/resize:fit:1400/1*dK0xCiis9Aia7wgpR86Stg.gif)

16. findIndex(): 주어진 테스트 함수를 만족하는 배열 내 첫 번째 요소의 인덱스를 반환합니다.
시간 복잡도: O(n)
공간 복잡도: O(1)


<div class="content-ad"></div>


![image](https://miro.medium.com/v2/resize:fit:1400/1*vjlt1A3ss8ncvINiuD4QJg.gif)

17. sort(): 배열 요소를 정렬하며 일반적으로 Timsort의 변형을 사용합니다.
시간 복잡도: O(n log n)
공간 복잡도: O(n) (정렬 중 임시 배열에 대한 추가적인 공간이 필요합니다)

# 왜 배열을 사용해야 할까요?

배열은 요소에 쉽게 액세스하고 더 나은 캐시 지역성을 갖고 싶을 때 유용합니다. 캐시 지역성은 상대적으로 가까운 저장 위치 내에서 데이터 요소를 사용하는 것을 의미합니다. 프로세서가 메모리 위치에 액세스할 때 그것이 필요한 특정 데이터뿐만 아니라 인접한 데이터 블록도 캐시로 로드합니다. 배열은 연속적으로 저장되어 있기 때문에 한 요소에 액세스하면 캐시로 로드된 인접 요소가 있을 수 있습니다. 이는 인접한 요소에 대한 후속 액세스가 빠르다는 것을 의미합니다. 왜냐하면 이미 캐시에 들어있기 때문입니다.


<div class="content-ad"></div>

다음에 코딩할 때는 이 통찰을 잘 기억하고 자신감을 가지고 DSA(Data Structures and Algorithms) 모험을 떠나보세요!

다음 블로그에서 만나요, 코드 마법사들!