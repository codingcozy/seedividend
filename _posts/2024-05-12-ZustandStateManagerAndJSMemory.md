---
title: "상태 관리자인 Zustand와 JS 메모리"
description: ""
coverImage: "/assets/img/2024-05-12-ZustandStateManagerAndJSMemory_0.png"
date: 2024-05-12 22:19
ogImage: 
  url: /assets/img/2024-05-12-ZustandStateManagerAndJSMemory_0.png
tag: Tech
originalTitle: "Zustand State Manager And JS Memory"
link: "https://medium.com/stackademic/zustand-state-manager-and-js-memory-b39efe6a811e"
isUpdated: true
---




이 기사에서는 매우 간단하고 쉽게 관리할 수 있는 Zustand 상태 관리자를 검토할 것이며, 사용 시 고려해야 할 몇 가지 사항이 있습니다. 또한 기본적으로 JavaScript 메모리 관리가 어떻게 작동하는지 설명하겠습니다.

![Zustand 상태 관리자 및 JS 메모리](/assets/img/2024-05-12-ZustandStateManagerAndJSMemory_0.png)

여기 Zustand 상태 관리자에서의 기본 이슈 설명이 있습니다. 매우 간단한 구조를 가진 store를 선언했는데, 이 store는 목록으로 간단한 데이터를 유지하도록 설계되었고 setStoreData라는 단일 메서드만 있습니다. store를 사용할 수 있겠죠? 내가 store를 가져왔다면 모든 컴포넌트에서 store 데이터를 사용할 수 있고, setStoreData 메서드를 가져오면 store 데이터를 편집할 수도 있을 것입니다. 하지만 setStoreData 메서드를 가져오지 않아도 store 데이터를 편집할 수 있다면 어떨까요? 네, 그렇게 되어서는 안 될 것 같지만 Zustand에서 그렇게 되고 있어서 React 프로젝트에서 Zustand 상태 관리자를 사용할 때 매우 조심해야 합니다. 어떻게 그런 일이 발생하는지 살펴보겠습니다...

![Zustand 상태 관리자 및 JS 메모리](/assets/img/2024-05-12-ZustandStateManagerAndJSMemory_1.png)



우리가 간단한 상점 예제를 보여드립니다. 꽤 기본적인 내용이죠. 하지만 이 상점을 사용하는 중에 작은 문제가 있습니다.

![image](/assets/img/2024-05-12-ZustandStateManagerAndJSMemory_2.png)

이 조건하에, `setStoreDATA` 함수를 전혀 사용하지 않는다는 점을 볼 수 있습니다. 그런데 이 함수가 메소드를 사용하지 않아도 상점 데이터를 설정할 수 있습니다. 어떻게 그런 일이 가능한 걸까요?

JavaScript에서 기본 데이터 유형(숫자, 문자열, 불리언, null, undefined, 심볼, BigInt)은 변수가 액세스하는 위치에 직접 저장됩니다. 그러나 객체, 배열 및 함수와 같은 비-기본 유형은 참조로 저장되기 때문에 우리가 참조로 호출하면 데이터 유형을 조작할 수 있습니다. 이것은 프로그램 전체에 직접 영향을 미치며 우리가 수정한 공간이 아닌 모든 곳에서 변경을 가져옵니다. 그래서 데이터를 참조로 저장하는 것은 무엇인가요?



참조에 의한 전달 및 값에 의한 전달

## 값에 의한 전달

값에 의한 전달을 사용할 때, 원래 데이터의 사본이 함수에 전달됩니다. 함수 내부에서 매개변수를 변경해도 원본 데이터에는 영향을 미치지 않습니다. 이는 함수에 전달된 값이 실제로 원래 값의 사본이기 때문입니다. 대부분의 기본 데이터 유형(정수, 부동 소수점 및 부울과 같은)은 보통 값에 의해 전달됩니다.

```js
function modifyValue(num) {
    num = 15;
    console.log("함수 내부 값:", num);
}

let x = 5;
modifyValue(x);
console.log("함수 호출 후 x 값:", x);
```



이 예시의 결과

```js
함수 내부의 값: 15
함수 호출 후 x 값: 5
```

이 예시에서는 함수 내에서 x의 값이 변경되었지만 x의 값이 변하지 않았습니다. 이는 함수가 x의 사본만을 접근했기 때문입니다.

# 참조로 전달



자바스크립트에서 객체(배열 및 함수 포함)를 함수에 전달할 때, 기술적으로 "공유"로 전달됩니다 (간단히 말하면 참조에 의한 전달이라고도 합니다). 실제로 객체에 대한 참조를 전달하므로 함수 내에서 객체를 수정하면 원본 객체에 영향을 줍니다.

```js
function modifyArray(arr) {
    arr.push(4);
    console.log("함수 내부의 배열:", arr);
}

let myArray = [1, 2, 3];
modifyArray(myArray);
console.log("함수 호출 후 배열:", myArray);
```

이 예제의 출력

```js
함수 내부의 배열: [1, 2, 3, 4]
함수 호출 후 배열: [1, 2, 3, 4]
```



요약하자면, 자바스크립트에서:

- 값을 전달 (원시 값): 값만 전달되므로 함수 내부의 매개변수 변경은 원래 변수에 영향을 미치지 않습니다.
- 참조로 전달 (객체): 객체에 대한 참조가 전달되므로 매개변수 변경은 원래 객체에 영향을 미칩니다.

그렇다면 Zustand는 무엇일까요?

Zustand에서는 사용자가 스토어를 변경할 때 setStoreData 메서드를 사용하도록 강제하는 보호 기능이 배열을 유지하는 경우에는 없습니다.



# 결론

만약 당신이 리스트 구조를 유지하는 상점을 가지고 있다면, 자바스크립트에서 배열인 리스트는 참조 호출로 편집될 것입니다. 즉, 당신이 상점 데이터를 호출하고 그 데이터를 함수에서 사용하고 다른 리스트나 값을 동일하게 만들었다고 가정해봅시다. 이러한 경우, 선언한 설정 방법을 사용하지 않아도 상점이 변경될 것입니다.

아마도 이것은 간단한 부족한 보호 또는 고의적으로 포기된 자유일 수 있습니다. 특히 상점이 리스트 구조를 포함하는 경우, Zustand 상점을 사용할 때 극도로 조심해야 합니다.

# Stackademic 🎓



끝까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 작가를 박수로 응원하고 팔로우해주세요! 👏
- X를 팔로우하고 LinkedIn, YouTube, Discord에서 우리를 만나보세요.
- 다른 플랫폼을 방문해보세요: In Plain English, CoFeed, Venture, Cubed
- 알고리즘 콘텐츠를 다루도록 강요하는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요.
- Stackademic.com에서 더 많은 콘텐츠를 만나보세요.