---
title: "JavaScript Promise 제대로 이해하고 넘어가자"
description: ""
coverImage: "/assets/img/2024-05-17-JavaScriptPromisesDemystifiedTheOnlyGuideYoullNeedPart1_0.png"
date: 2024-05-17 03:20
ogImage: 
  url: /assets/img/2024-05-17-JavaScriptPromisesDemystifiedTheOnlyGuideYoullNeedPart1_0.png
tag: Tech
originalTitle: "JavaScript Promises Demystified: The Only Guide You’ll Need : Part 1"
link: "https://medium.com/@shubhritik/javascript-promises-demystified-the-only-guide-youll-need-part-1-a835910d8045"
---



![이미지](/assets/img/2024-05-17-JavaScriptPromisesDemystifiedTheOnlyGuideYoullNeedPart1_0.png)

자바스크립트를 사용하면 언젠가는 프로미스에 직면하게 될 것입니다. 프로미스는 자바스크립트에서 비동기 프로그래밍의 핵심입니다. 실시간 데이터는 모두 프로미스를 사용하여 처리됩니다. 프론트엔드 개발자든 백엔드 개발자든, 이 개념을 이해하는 것은 원활한 자바스크립트 애플리케이션을 만드는 데 중요합니다. 이 블로그 포스트에서는 프로미스에 대해 깊게 들어가보고 다른 곳을 찾아볼 필요가 없도록 이해해보겠습니다.

MDN 웹 문서에는 다음과 같이 설명되어 있습니다:

'프로미스 객체는 비동기 작업의 최종 완료(또는 실패)와 그 결과 값의 대기 시간을 나타냅니다.'


<div class="content-ad"></div>

상기 문장을 더 잘 이해하기 위해 두 친구의 예를 들어보겠습니다. 첫 번째 친구가 두 번째 친구에게 돈을 빌려주고, 두 번째 친구는 한 달 후에 돈을 돌려줄 것을 약속합니다. 이제 두 가지 경우의 수가 있습니다. 두 번째 친구가 약속대로 돈을 돌려주거나, 두 번째 친구가 돈을 돌려주기를 거절할 수 있습니다.

어떤 경우에도 한 달 후에는 결과가 나올 것입니다. 그 점은 확실합니다. 이것이 JavaScript에서 약속이 작동하는 방식입니다. 약속은 응답을 보장합니다: 성공 또는 실패 중 하나가 될 것이지만, 반드시 응답을 받을 수 있습니다.

약속에 따라, 성공적인 해결에 대해 '이행(resolve)'이라고 하고, 실패한 해결에 대해 '거부(rejected)'라고 합니다. 따라서 총 세 가지 상태로 약속을 나타낼 수 있습니다:

- pending: 초기 상태, 이행되지도 거절되지도 않은 상태.
- fulfilled: 작업이 성공적으로 완료된 상태.
- rejected: 작업이 실패한 상태.

<div class="content-ad"></div>

약속을 어떻게 만들 수 있는지 살펴봅시다.

```js
const myPromise = new Promise((resolve, reject) => {
  let a = true; // 여기서 일반적으로 일부 외부 호출을 수행합니다.
  if (a) {
      setTimeout(() => {
      resolve("foo");
    }, 1000);
  } else {
    setTimeout(() => {
        reject("foo");
      }, 1000);
  }
});
```

기본적인 약속은 이렇게 보입니다. 외부 호출을 시뮬레이션하기 위해 setTimeout 함수를 사용했는데, 여기에 호출에 1초의 지연이 추가됩니다. 조건이 성공하면 resolve가 반환되고 실패하면 reject가 반환됩니다.

약속에 대해 추가 조치를 취하려면 연결된 세 가지 메서드가 있습니다.

<div class="content-ad"></div>

- then: 이 방법은 성공적인 처리의 응답을 받기 위해 프로미스에서 사용됩니다.
- catch: 이 방법은 거절된 경우 프로미스에서 오류를 받기 위해 사용됩니다.
- finally: 응답에 관계없이 어떤 작업을 수행하고 싶다면, 이를 사용합니다.

이러한 방법은 모두 프로미스를 반환하며, 데이터를 계속 전달하고 체이닝할 수 있습니다.

```js
myPromise
 .then((response) => {
   // 성공한 경우에 대한 작업 수행
  })
  .catch((error) => {
   // 거절된 경우에 대한 작업 수행
  })
  .finally(() => {
   // 각각의 작업 후에 수행할 작업 수행
  })
```

이제 프로미스가 더 이상 시작할 때보다 훨씬 더 의미가 있길 바랍니다. 다가오는 블로그에서 여러 프로미스를 호출하고 그러한 상황을 처리하는 방법, 콜백 지옥이 뭔지 그리고 어떻게 벗어날 수 있는지, 여러 프로미스를 처리하는 데 사용할 수 있는 방법 등을 알아볼 것입니다.

<div class="content-ad"></div>

이 블로그 시리즈를 마치면 약속을 사용하는 데 훨씬 더 편안해지고 무엇이 일어나고 있는지 깊이 이해할 수 있을 거예요.

끝까지 읽어 주셔서 감사합니다. 친구들과 함께 좋아요를 눌러 주시고 댓글을 남겨 주시고 공유해 주세요. 그래야 그들도 능숙해질 수 있으니까요. 함께 배우는 건 훨씬 더 재미있어요.

좋은 하루 되세요!