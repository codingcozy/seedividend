---
title: "자바스크립트에서 간단한 반환과 프로미스 반환의 차이"
description: ""
coverImage: "/assets/img/2024-05-14-DifferencebetweenSimplereturnandPromisereturninJS_0.png"
date: 2024-05-14 12:53
ogImage: 
  url: /assets/img/2024-05-14-DifferencebetweenSimplereturnandPromisereturninJS_0.png
tag: Tech
originalTitle: "Difference between Simple return and Promise return in JS"
link: "https://medium.com/@mrabhinav1289/difference-between-simple-return-and-promise-return-in-js-c5cae6b1ba34"
isUpdated: true
---




자바스크립트에서 단순 반환과 프로미스 반환은 서로 다른 목적을 가지고 있어요.

## 단순 반환:

함수에서 값을 직접 반환할 때, 이는 동기 작업입니다. 함수가 실행되고 결과를 즉시 반환해요.

![이미지](/assets/img/2024-05-14-DifferencebetweenSimplereturnandPromisereturninJS_0.png)



## 아래는 코드 분석입니다:

1. 함수 정의: 두 개의 매개변수 a와 b를 받는 add라는 함수를 정의합니다.

2. 반환문: add 함수 내에서 a와 b의 합을 반환하는 return a + b;를 사용합니다.

3. 함수 호출: 그런 다음 매개변수 10과 20을 사용하여 add 함수를 호출합니다.



4. 결과 저장: 반환된 값(10과 20의 합인 30)이 result 변수에 저장됩니다.

5. 출력: 마지막으로, 우리는 결과값 30을 콘솔에 출력합니다.

단순하고 동기적입니다. 함수는 값을 즉시 반환합니다.

# Promise Return:



Promise는 비동기 작업에 사용됩니다. 지금이나 미래에 사용할 수 있는 값이나 결코 사용할 수 없는 값을 나타냅니다. 함수가 Promise를 반환하면 비동기 작업을 수행하고 그 작업의 결과에 따라 Promise를 해결하거나 거부할 수 있습니다.

![Promise Image](/assets/img/2024-05-14-DifferencebetweenSimplereturnandPromisereturninJS_1.png)

이 코드에서:

- reject()에 new Error("Strings are not equal")를 인수로 추가하여 오류에 대한 자세한 정보를 제공했습니다.
- catch 블록에서 (error)를 콜백 함수의 인수로 추가하여 오류 객체를 캐치하고 해당 메시지를 기록했습니다.



이제 코드가 오류 없이 실행되고 적절한 출력을 제공해야 합니다. str1과 str2가 동일한 경우 "Success message. Both names are equal."을 출력합니다. 그 외에는 "Error: Strings are not equal"을 출력합니다.

## 차이점:

실행 컨텍스트:

- 간단한 반환: 동기적으로 실행됨.
- Promise 반환: 비동기 실행을 허용함.



비동기 작업 다루기:

- Simple return: 비동기 작업을 처리할 수 없습니다.
- Promise return: 특별히 비동기 작업을 처리하기 위해 설계되었습니다.

사용 방법:

- Simple return: 동기 작업에 사용됩니다.
- Promise return: 비동기 작업에 사용됩니다.