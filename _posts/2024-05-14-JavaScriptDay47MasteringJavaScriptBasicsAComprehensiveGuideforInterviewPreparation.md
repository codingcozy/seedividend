---
title: "자바스크립트 47일차 - 자바스크립트 기초 마스터하기 면접 준비를 위한 포괄적인 가이드"
description: ""
coverImage: "/assets/img/2024-05-14-JavaScriptDay47MasteringJavaScriptBasicsAComprehensiveGuideforInterviewPreparation_0.png"
date: 2024-05-14 15:21
ogImage: 
  url: /assets/img/2024-05-14-JavaScriptDay47MasteringJavaScriptBasicsAComprehensiveGuideforInterviewPreparation_0.png
tag: Tech
originalTitle: "JavaScript Day 47 — Mastering JavaScript Basics: A Comprehensive Guide for Interview Preparation"
link: "https://medium.com/@kirtikau/javascript-day-47-mastering-javascript-basics-a-comprehensive-guide-for-interview-preparation-39c84fd1724d"
---


100일간의 자바스크립트 면접 준비: 초보자의 여정 | 코딩 라운드

![이미지](/assets/img/2024-05-14-JavaScriptDay47MasteringJavaScriptBasicsAComprehensiveGuideforInterviewPreparation_0.png)

## 상위 10개 중요한 인터뷰 자바스크립트 코딩 라운드 인터뷰 질문

## 자바스크립트에서 ARRAY의 ARRAY를 펼치는 방법?



```js
const arry = [[1, 2, [3]], 4, [5, [6, 7]]]

// 출력  [1, 2, 3, 4, 5, 6, 7]
```

답변

단계 1 — flattenMyArray 함수는 배열을 입력으로 받고 각 요소를 반복합니다.

단계 2 — 요소가 배열이면 해당 하위 배열을 펼치기 위해 재귀적으로 자신을 호출합니다.



**단계 3** — 그렇지 않으면, 요소를 평탄화된 배열에 추가합니다.

**단계 4** — 마지막으로, 평탄화된 배열을 반환합니다.

# 방법 1 — (ForEach 방법)

**단계 1** — 평탄화해야 할 입력 배열을 정의합니다.



```js
const nestedArray = [[1, 2, [3]], 4, [5, [6, 7]]]
```

Step 2— `flattenArray` 함수와 결과값(펼쳐진 배열)을 저장할 빈 배열을 만듭니다.

```js
const nestedArray = [[1, 2, [3]], 4, [5, [6, 7]]]

function flattenArray(arr) {
    let flattened = [];

}
```

Step 3— 각 요소를 `forEach` 방법으로 반복하고 함수의 끝에 펼쳐진 값을 반환합니다.



```js
const nestedArray = [[1, 2, [3]], 4, [5, [6, 7]]]

function flattenArray(arr) {
   let flattened = [];

   arr.forEach(item => {
     console.log(item)
       
   });

    return flattened;
}
```

제 4단계 — 입력 배열로 함수를 호출하고 항목에 대한 console.log를 확인합니다.

```js
const nestedArray = [[1, 2, [3]], 4, [5, [6, 7]]]

function flattenArray(arr) {
   let flattened = [];

   arr.forEach(item => {
     console.log(item)
       
   });

    return flattened;
}

const flattenedArray = flattenArray(nestedArray);
```

<img src="/assets/img/2024-05-14-JavaScriptDay47MasteringJavaScriptBasicsAComprehensiveGuideforInterviewPreparation_1.png" />




Step 5— foreach 코드 안에 위의 console.log 관찰에 따라 몇 가지 조건을 추가해 봅시다.

- 요소가 배열인 경우, 해당 하위 배열을 평탄화하도록 재귀적으로 자신을 호출합니다.
- 그렇지 않으면, 해당 요소를 평탄화된 배열에 푸시합니다.

```js
const nestedArray = [[1, 2, [3]], 4, [5, [6, 7]]]

function flattenArray(arr) {
   let flattened = [];

   arr.forEach(item => {
   /* 요소가 배열인 경우, 해당 하위 배열을 재귀적으로 평탄화하도록 호출합니다. */
    if (Array.isArray(item)) {
            flattened = flattened.concat(flattenArray(item));
        } else {
   // 그렇지 않으면, 해당 요소를 평탄화된 배열에 푸시합니다
            flattened.push(item);
        }

   });

    return flattened;
}

const flattenedArray = flattenArray(nestedArray);
```

![JavaScript Basics](/assets/img/2024-05-14-JavaScriptDay47MasteringJavaScriptBasicsAComprehensiveGuideforInterviewPreparation_2.png)



# 최종 코드

```js
const nestedArray = [[1, 2, [3]], 4, [5, [6, 7]]];

function flattenArray(arr) {
   let flattened = [];

   arr.forEach(item => {
   /* 만약 요소가 배열이라면 해당 하위 배열을 평탄화하기 위해 재귀적으로 자신을 호출합니다. */
    if (Array.isArray(item)) {
            flattened = flattened.concat(flattenArray(item));
        } else {
   // 그렇지 않으면 요소를 평탄화된 배열에 추가합니다.
            flattened.push(item);
        }

   });

    return flattened;
}

const flattenedArray = flattenArray(nestedArray);
```

ES6 Map 방법을 사용한 또 다른 방법을 DAY 48에서 논의할 예정입니다.

![JavaScriptDay47MasteringJavaScriptBasicsAComprehensiveGuideforInterviewPreparation_3.png](/assets/img/2024-05-14-JavaScriptDay47MasteringJavaScriptBasicsAComprehensiveGuideforInterviewPreparation_3.png)



# 행복한 코딩 하세요 그리고 기대해주세요 :)

# 만약 제 블로그가 도움이 되었다면 구독, 박수와 팔로우 부탁드립니다 :)