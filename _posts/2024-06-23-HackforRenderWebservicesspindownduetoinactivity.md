---
title: "사용하지 않을 때에도 웹 서비스 활동 유지하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-HackforRenderWebservicesspindownduetoinactivity_0.png"
date: 2024-06-23 13:15
ogImage: 
  url: /assets/img/2024-06-23-HackforRenderWebservicesspindownduetoinactivity_0.png
tag: Tech
originalTitle: "Hack for Render Web services spin down due to inactivity"
link: "https://medium.com/@shriharshranjangupta/solution-for-render-com-web-services-spin-down-due-to-inactivity-a5c6061b581b"
isUpdated: true
---




백엔드 응용 프로그램을 취미로 배포할 때, Render는 간편성과 기능 세트로 인해 인기 있는 선택지입니다. 그러나 Render의 일반적인 문제 중 하나는 사용되지 않을 경우 무료 인스턴스가 중단될 수 있다는 것입니다. 이는 인스턴스를 다시 배포해야 할 때 최대 1분까지 응답이 지연되는 결과를 가져옵니다. Render에서 이러한 동작에 대해 명확히 설명되어 있습니다:

![image](/assets/img/2024-06-23-HackforRenderWebservicesspindownduetoinactivity_0.png)

**문제점**
사용되지 않을 때 Render 인스턴스가 중단되어 서버가 일정 시간 후에 액세스될 때 지연이 발생합니다. 이는 응답 시간이 느려지면 사용자 경험에 영향을 미칠 수 있어 특히 거슬리는 문제일 수 있습니다.

**해결책**
사이트를 사용하지 않는 경우에도 인스턴스를 활성 상태로 유지하려면 app.js 또는 index.js 파일에 자체 참조 리로더를 추가할 수 있습니다. 이를 통해 정기적으로 서버에 핑을 보내 인스턴스가 중단되지 않도록 할 수 있습니다.

다음은 이 작업을 수행하는 간단한 코드 스니펫입니다:

<div class="content-ad"></div>

```js
const url = `https://yourappname.onrender.com/`; // 사용 중인 Render URL로 변경
const interval = 30000; // 간격을 밀리초 단위로 지정 (30초)

function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`새로고침 시간: ${new Date().toISOString()}: 상태 코드 ${response.status}`);
    })
    .catch(error => {
      console.error(`새로 고침 에러 시간: ${new Date().toISOString()}:`, error.message);
    });
}


setInterval(reloadWebsite, interval);
```

작동 방식

- 자체 참조 새로 고침: 이 코드 스니펫은 서버에 매 30초마다 핑을 보내는 간격을 설정합니다.
- 유지 및 활성 상태 유지: 서버에 지속적으로 핑을 보내면 활성 상태를 유지하고 중단되지 않도록 합니다.
- 로그: 주기적인 확인을 볼 수 있고 서버가 활성 상태인지 확인할 수 있는 로그를 모니터링할 수 있습니다.

구현

<div class="content-ad"></div>

- 코드 추가: 위 코드를 app.js 또는 index.js 파일에 추가합니다.
- 서버 시작: 앱을 Render에 배포하세요.
- 모니터링: Render 대시보드의 로그를 확인하여 서버가 정기적으로 핑되는지 확인하세요.

장점

- 다운타임 없음: 서버가 활성 상태로 유지되어 빠른 응답을 제공합니다.
- 간편한 솔루션: 복잡한 설정 없이 쉽게 구현할 수 있습니다.
- 확장성: 소규모에서 중규모의 취미 프로젝트에 잘 작동합니다.

다중 백엔드 관리
다중 백엔드가 있는 프로젝트의 경우, 리로더를 단일 백엔드로 통합할 수 있습니다. 이 접근 방식은 각 백엔드가 자체 리로더를 필요로하지 않고 모든 인스턴스가 활성 상태로 유지되도록 보장합니다.

<div class="content-ad"></div>

결론
백엔드에 간단한 다시로더 스크립트를 추가함으로써, Render 인스턴스가 비활성화로 인해 종료되는 것을 방지할 수 있습니다. 이를 통해 서버가 반응성을 유지하여 취미 프로젝트에 더 나은 사용자 경험을 제공할 수 있습니다. 이 해결책은 소규모부터 중규모 프로젝트에 효과적이며 서버의 활동을 지속적으로 유지하는 데 도움이 됩니다.

참고:

- Github

도움이 되셨기를 바랍니다! 즐거운 배포되길 바랍니다.