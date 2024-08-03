---
title: "서비스 워커와 캐싱이 도와줍니다"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Service Workers and Caching to the Rescue"
link: "https://medium.com/@denisultanoglu/service-workers-and-caching-to-the-rescue-3ca58a7101b0"
---



![서비스 워커와 캐싱이 도와줍니다](/assets/img/ServiceWorkersandCachingtotheRescue_0.png)

당신의 웹사이트를 레스토랑이라고 생각해보세요. 손님들이 빨리 음식을 받고 즐겁게 식사할 수 있도록 하고 싶으시죠. 서비스 워커와 캐싱은 효율적인 대기원과 잘 갖춰진 식료품실처럼 함께 작동하는 것과 같습니다.

슈퍼 대기원: 서비스 워커

- 이 특별한 대기원(서비스 워커)은 메인 웹사이트와 별도로 백그라운드에서 실행됩니다.
- 이는 고객(브라우저)로부터 주문(요청)을 가로챌 수 있습니다.
- 심지어 내용을 기억하여 다음에 더 빠르게 제공할 수도 있습니다.

<div class="content-ad"></div>

풍부한 식량 저장실: 캐싱

- 식량 저장실(캐시)은 고객이 자주 주문하는 인기 요리(웹사이트 자원)를 저장합니다.
- 이렇게 하면 웨이터(서비스 작업자)가 요리를 다시 요리하지 않고도 즉시 가져올 수 있습니다(서버에서 가져오지 않아도 됨).
- 식량 저장실은 엄청 크지 않아서 웨이터가 기존 요리를 버리고(오래된 자원을) 새로운 것(신선한 콘텐츠)을 위해 자리를 만듭니다.

어떻게 함께 작동하는지

- 처음 방문: 고객(브라우저)이 음식점(웹사이트)을 처음 방문합니다. 웨이터(서비스 작업자)가 주문을 받고, 주방(서버)에서 모든 것을 가져옵니다.
- 스마트한 웨이터: 웨이터는 인기 요리(자원)를 인식하고, 다음에 사용할 것을 위해 식량 저장실(캐시)에 저장합니다.
- 빠른 서비스: 고객이 다시 방문! 이번에는 웨이터가 먼저 식량 저장실(캐시)을 확인합니다. 요리(자원)가 거기에 있고 신선하면, 즉시 제공됩니다 - 훨씬 빨라집니다!
- 신선함 유지: 웨이터는 메뉴(콘텐츠)가 변할 수 있다는 것을 알기 때문에 가끔 주방(서버)에 새로운 것이 있는지 확인합니다.

<div class="content-ad"></div>

당신의 웹사이트(식당)를 위한 혜택:

- 빠른 로딩 시간: 고객들이 음식(웹사이트)을 빨리 받아볼 수 있어서 반복해서 방문해도 더 빨리 주문하실 수 있습니다.
- 더 행복한 고객들: 더 오래 기다릴 필요가 없어 더 나은 경험을 할 수 있습니다.
- 오프라인 즐거움: 주방(서버)이 닫혀 있어도(인터넷이 연결되지 않았어도), 웨이터는 식료품 저장실에서 몇 가지 요리(캐시된 콘텐츠)를 제공할 수 있습니다.

예시를 작성해보겠습니다:

우선, ServiceWorker.js 파일을 생성해야 합니다.

<div class="content-ad"></div>

```js
const cacheName = "my-static-cache"; // 캐시에 이름을 지정해주세요

// 설치 이벤트: 서비스 워커가 처음 등록될 때 발생합니다
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(cacheName) // 지정된 이름으로 캐시 열기
      .then(function (cache) {
        // 캐시할 URL 배열 추가
        return cache.addAll([
          "/", // 웹 사이트 루트를 캐시합니다
          "/index.html", // 주 HTML 파일을 캐시합니다
          "/styles.css", // 스타일시트를 캐시합니다
          "/script.js", // 자바스크립트 파일을 캐시합니다
        ]);
      })
  );
});

// 가져오기 이벤트: 브라우저가 리소스를 가져오려고 할 때 발생합니다
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request) // 캐시에서 요청된 리소스를 찾아봅니다
      .then(function (response) {
        if (response) {
          // 캐시에서 찾았다면 캐시된 응답을 반환합니다
          return response;
        }
        // 찾지 못했다면 네트워크에서 가져와 캐시를 업데이트합니다
        return fetch(event.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            // 가져온 응답을 캐시에 저장하여 나중에 사용합니다
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
  );
});
```

따라서, 파일을 서비스워커 API에 추가해야 합니다.

```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
```

이제 저녁식사를 더 효율적으로 제공할 수 있습니다.```

<div class="content-ad"></div>

알아두세요:

- 모든 브라우저가 아직 슈퍼 웨이터(서비스 워커)를 지원하는 것은 아니지만, 점점 더 흔해지고 있어요.
- 웨이터는 오래된 음식(캐시 무효화)을 버리는 시점을 알아야 해요. 그래야 사이트가 신선하게 유지될 수 있어요.
- 이 시스템을 추가한 후 웹사이트의 작동을 주시해 보세요. 최상의 결과를 얻기 위해 조금씩 조정해야 할 수도 있어요.

# 결론:

서비스 워커와 캐싱을 이용하면 웹사이트가 더 부드럽게 실행되고 방문자들이 만족할 수 있어요. 마치 슈퍼-효율적인 웨이터가 있는 멋진 음식점과 같이 말이에요!
