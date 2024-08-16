---
title: "Fetch API CORS 및 no-cors에 대한 궁극의 가이드"
description: ""
coverImage: "/assets/img/2024-05-14-FetchAPITheUltimateGuidetoCORSandno-cors_0.png"
date: 2024-05-14 13:16
ogImage: 
  url: /assets/img/2024-05-14-FetchAPITheUltimateGuidetoCORSandno-cors_0.png
tag: Tech
originalTitle: "Fetch API: The Ultimate Guide to CORS and ‘no-cors’"
link: "https://medium.com/@cybersphere/fetch-api-the-ultimate-guide-to-cors-and-no-cors-cbcef88d371e"
isUpdated: true
---





<img src="/assets/img/2024-05-14-FetchAPITheUltimateGuidetoCORSandno-cors_0.png" />

웹 애플리케이션에서 제3자 API 또는 서버에서 데이터를 가져와야 하는 경우가 있나요? 그렇다면, 요청한 데이터에 액세스하는 데 방해가 되는 Cross-Origin Resource Sharing (CORS) 오류를 만날 수도 있습니다.

이 블로그 포스트에서는 Fetch API에서 CORS 및 No-CORS 모드를 사용하여 이러한 제약을 극복하고 외부 소스에서 데이터를 성공적으로 가져오는 방법을 살펴볼 것입니다.

먼저, CORS가 무엇이며 왜 중요한지 이해해 봅시다.




그러나 웹 애플리케이션에서 제3자 API 또는 서버로 요청을 보내야 할 때는 장애가 될 수도 있습니다.

![image](/assets/img/2024-05-14-FetchAPITheUltimateGuidetoCORSandno-cors_1.png)

Fetch API는 웹 애플리케이션에서 HTTP 요청을 보내는 방법을 제공합니다. Fetch를 사용하면 fetch() 함수의 mode 옵션을 사용하여 요청의 모드를 지정할 수 있습니다.

mode 옵션은 `cors`, `no-cors`, `same-origin`, 또는 `navigate` 중 하나로 설정할 수 있습니다.



`cors` 모드에서는 브라우저가 요청에 Origin 헤더를 포함하며, 서버가 허용 여부를 나타내는 Access-Control-Allow-Origin 헤더로 응답할 것을 기대합니다.

서버가 적절한 헤더로 응답하면, 브라우저는 요청을 계속 진행하도록 허용하고 응답을 웹 페이지에 제공합니다. 이 모드는 제3자 API나 서버에 요청을 보낼 때 유용합니다.

```js
fetch('https://example.com/api/data', {
  mode: 'cors',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    key1: 'value1',
    key2: 'value2'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

`no-cors` 모드에서는 브라우저가 요청에 Origin 헤더를 포함하지 않으며, 서버의 응답이 불투명하게 처리되어 JavaScript 코드로 액세스할 수 없습니다. 이 모드는 서버로부터의 응답이 필요하지 않은 경우, 예를 들어 제3자 애널리틱스 서비스에 요청을 보낼 때 사용됩니다.



이제 Fetch API에서 CORS 및 No-CORS 모드를 사용하는 방법을 이해했으므로, 언제 사용해야 하는지에 대해 이야기해보겠습니다.