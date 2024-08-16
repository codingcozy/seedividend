---
title: "더 나은 생산성을 위한 Chrome DevTools 자바스크립트 디버깅 기능들"
description: ""
coverImage: "/assets/img/2024-05-14-ChromeDevToolsJavaScriptDebuggingFeaturesForBetterProductivity_0.png"
date: 2024-05-14 14:16
ogImage: 
  url: /assets/img/2024-05-14-ChromeDevToolsJavaScriptDebuggingFeaturesForBetterProductivity_0.png
tag: Tech
originalTitle: "Chrome DevTools JavaScript Debugging Features For Better Productivity"
link: "https://medium.com/gitconnected/chrome-devtools-javascript-debugging-features-for-better-productivity-5974c414478c"
isUpdated: true
---




![Chrome DevTools JavaScript Debugging Features for Better Productivity](/assets/img/2024-05-14-ChromeDevToolsJavaScriptDebuggingFeaturesForBetterProductivity_0.png)

소프트웨어 버그는 소프트웨어 프로그램에서 예상치 못한 또는 잘못된 동작을 가리킵니다. 다른 소프트웨어 유형과 마찬가지로 웹 앱에도 버그가 포함될 수 있습니다. 웹 앱의 버그는 해당 웹 앱의 품질을 버그 심각도에 따라 저하시킬 수 있습니다. 몇 가지 심각한 소프트웨어 버그는 전체 웹 앱을 영향을 미치며 사용자 인터랙션 흐름을 망가뜨릴 수 있습니다. 한편 일부 미세한 소프트웨어 버그는 사용자 흐름의 일부를 영향을 미치며 대안 흐름으로 교체 가능할 수 있습니다. 잘 알려진 디버깅 프로세스는 웹 개발자가 웹 앱에서 버그를 제거하여 품질을 회복하는 데 도움을 줍니다.

현대 웹 브라우저는 기능이 풍부한 웹 개발 환경으로서, JavaScript 소스 코드에서 버그를 감지하기 위한 디버깅 기능을 제공합니다. 예를 들어, Google Chrome은 제품적인 JavaScript 디버깅을 위해 DevTools 패널을 제공합니다. DevTools은 표준 중단점을 기반으로 한 동적 코드 분석 및 변수 감시, 스택 프레임 분석기, 리스너 검사자 등과 같은 고급 디버깅 기능을 제공합니다. DevTools는 브라우저에서 로드된 베니라 JavaScript를 디버그할 수 있을 뿐만 아니라 Chrome DevTools 프로토콜을 통해 TypeScript, Node.js, Deno 및 React Native 앱을 디버그할 수 있도록 지원합니다. 게다가 대부분의 프론트엔드 프레임워크/라이브러리는 디버깅 경험을 향상하기 위한 DevTools 확장을 제공합니다(예: React Developer Tools).

생산성 중심의 Chrome DevTools 기능을 파악하면 JavaScript 소스 코드를 빠르게 디버그할 수 있고 버그 수정을 생산적으로 진행할 수 있습니다. 이 글에서는 JavaScript 디버깅 생산성을 높일 수 있는 DevTools 기능에 대해 설명하겠습니다. 이러한 DevTools 기능을 연습하고 디버깅 방법을 찾는 대신 디버깅에만 집중하세요!



# 변수와 표현식 감시하기

디버거 브레이크포인트가 코드 실행을 중단할 때마다, 마우스를 가져다 대면 JavaScript 변수를 살펴볼 수 있습니다. 이 기술을 사용하여 디버깅 중에 원자값과 객체를 살펴볼 수 있지만, 한꺼번에 여러 변수를 감시해야 한다면 시간이 많이 소요될 수 있습니다. 디버깅 중 감시해야 하는 변수와 표현식을 평가해야 한다면 더 어려워질 수 있습니다. 이런 경우에는 디버거 코드 뷰와 콘솔을 자주 왔다갔다해야 합니다.

DevTools에서는 브레이크포인트를 기반으로 변수와 표현식을 감시하거나 브레이크포인트에서 멈추지 않고 수동으로 업데이트할 수 있습니다. 다음 코드 조각을 살펴보세요:

```js
let m = 0;
let s = 0;

setInterval(() => {
  s++;
  if(s === 60) {
    m++;
    s = 0;
  }
}, 1000);
```



위 코드는 두 변수를 사용해 간단한 초-분 타이머를 구현한 것입니다. 다음과 같이 새로운 감시자를 추가하고 중단점을 설정하여 m 및 s 변수를 확인할 수 있습니다:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*T23NrZm73SydEAZjai8NVQ.gif)

매 초마다 실행을 멈추는 중단점이 있기 때문에 중단점을 제거하고 대신 새로고침 버튼을 누를 수 있습니다. 또한 감시자 레코드로 표현식을 평가할 수도 있습니다. 예를 들어 다음 샘플 표현식이 선행 0이 있는 타이머 값을 출력하는 방법을 확인해보세요:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*4f9JCOR17w3M4-Tp82Q92w.gif)



# 콘솔에서 디버거 컨텍스트 사용하기

우리는 객체 속성을 검사하기 위해 마우스를 호버하고 관찰자를 설정하는 방식으로 사용할 수 있습니다. 그러나 어떤 상황에서는 콘솔에서 자동 완성을 지원하는 상태에서 객체 메서드를 트리거하고 객체 속성을 검사해야 할 때가 있습니다. 개발 도구는 이 요구 사항을 해결하기 위해 콘솔의 범위를 현재 중단점으로 변경합니다. d 객체의 getMilliseconds() 메서드의 반환 값을 확인해야 한다고 가정해 봅시다:

```js
function getMagicDate(d) {
  if(d.getDate() % 2 === 0) {
    d.setDate(d.getDate() + 2);
  }
  else {
    d.setMonth(d.getMonth() + 1);
  }
  return d;
}

getMagicDate(new Date());
```

먼저 중단점을 설정하고 코드 실행 프로세스를 중단해야 합니다. 그런 다음, 콘솔 서랍을 열기 위해 escape 키를 누르고 실행할 메서드를 입력하세요:



![Live Expressions](https://miro.medium.com/v2/resize:fit:1400/1*yErxg7PWPkt1nBHar2Z3Mw.gif)

# 중단점 없이 실시간 표현식 만들기

첫 번째 예제에서는 위쳐(watchers)를 사용하여 샘플 프로그램의 몇 가지 변수를 조사했습니다. 표현식의 업데이트된 결과를 보려면 중단점에 멈춰야했거나 새로 고침 버튼을 눌러야 했습니다. DevTools를 사용하면 콘솔에서 실시간 표현식을 만들 수 있으므로 중단점을 사용하지 않고도 원하는 표현식의 업데이트된 결과를 볼 수 있습니다.

이 시나리오에 대해 이전에 사용한 코드를 사용하겠습니다:



```js
let m = 0;
let s = 0;

setInterval(() => {
  s++;
  if (s === 60) {
    m++;
    s = 0;
  }

  console.log(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
}, 1000);
```



# 마지막 콘솔 결과 및 선택된 요소에 액세스하는 방법

자동화를 위해 Bash 스크립팅을 사용하는 경우, 마지막 완료된 프로세스의 종료 코드를 가져오는 방법을 알고 있을 것입니다. $? 특수 Bash 매개변수가 도움이 됩니다. DevTools도 자동화 스크립팅에 존재하는 유사한 기능을 제공하여 디버깅 생산성을 향상시키려고 노력합니다. 콘솔에서 여러 식을 평가할 때, 사전 정의된 $_ 유틸리티 변수를 사용하여 마지막 표현식의 결과를 얻을 수 있습니다. 이는 디버깅 중에 테스트 데이터를 작성할 때 매우 유용합니다. 다음 예제를 살펴보세요:

![예제](https://miro.medium.com/v2/resize:fit:1400/1*emqAYbt1vrKkcYS8aWP0Yw.gif)

위 예에서는 $_ 유틸리티 변수를 사용하여 이전에 생성된 JavaScript 객체에 액세스합니다.



우리는 모두 포커스가 있는 요소를 반환하는 document.activeElement 속성에 대해 알고 있습니다. 그렇다면 DevTools Inspector에서 선택한 DOM 요소에 대한 참조를 얻어야 한다면 어떻게 할까요? $0 유틸리티 변수가 도와줍니다:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*rGXZoHl7e_qNtS9dCIG8Nw.gif" />

공식 Chrome 콘솔 유틸리티 참조를 읽고 JavaScript 디버깅 중에 콘솔에서 사용할 수 있는 더 많은 단축 변수와 함수에 대해 알아보세요.

다음 이야기는 여러분에게 JavaScript의 최신 단축 구문에 대해 가르쳐줍니다:



# 이벤트 리스너 브레이크포인트 설정하기

풀리피처가 갖춰진 개발 환경인 웹 브라우저는 다양한 이벤트를 제공하여 개발자들이 고품질이고 사용자 친화적인 웹 앱을 개발할 수 있도록 도와줍니다. 각 브라우저 API는 일반적으로 개발자들을 위한 이벤트 기반 상호작용 모델을 제공하며, 그에 따라 개발자들은 JavaScript 코드베이스에서 이벤트 리스너 콜백을 붙이곤 합니다. 디버깅을 위해 이벤트 리스너에 대한 브레이크포인트를 설정하려면 알려진 쉽고 간단한 방법이 있습니다.

다음 코드를 살펴보세요:

```js
let btn = document.getElementById('btn');
let count = 0;

btn.addEventListener('click', (e) => {
  btn.innerText = `Clicked ${++count} times`;
});
```



우리는 쉽게 이벤트 리스너를 중단점으로 설정할 수 있습니다. 왜냐하면 어디에 작성되어 있는지 알기 때문이죠. 그런데 만약 많은 이벤트 리스너가 있는 낯선한 코드베이스를 디버깅해야 한다면 어떨까요? DevTools는 이벤트 이름을 기반으로 중단점을 설정할 수 있는 방법을 제공합니다. 다음 예시를 살펴보세요:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*jWE3Q8yaZtfjoU-OsZK3EQ.gif)

위의 클릭 리스너 중단점은 코드 실행을 중지하고 자동으로 리스너 콜백으로 이동합니다. 비슷하게, XHR, worker, clipboard, keyboard 등의 이벤트에 대한 중단점을 설정하고 이벤트 리스너 등록을 찾을 수 있습니다.

다음 이야기에서는 모든 현대 웹 개발자가 알아야 할 새로운 브라우저 이벤트 및 API에 대해 설명합니다:



# 네트워크 요청 중단점 사용하기

XHR 이벤트 중단점을 사용하여 네트워크 요청을 감지할 수 있습니다. 이를 통해 네트워크 관련 JavaScript 코드에 수동으로 중단점을 설정할 필요 없이 코드 실행이 모든 XHR 이벤트에서 중단되는 것이 아니라 특정 네트워크 요청에만 관심이 있는 경우에도 이를 감지할 수 있습니다. 개발자 도구는 URL 필터를 기반으로 네트워크 요청을 감지하는 소스 탭에 다른 섹션을 제공합니다. 예를 들어, 앱이 https://api.example.com URL에 대한 요청을 보내는 소스 코드 라인을 찾아야 한다고 가정해봅시다. 다음과 같이 XHR/fetch 중단점을 설정할 수 있습니다:

![네트워크 요청 중단점](https://miro.medium.com/v2/resize:fit:1400/1*vg4xUAWXbRv7vJrAYQWq1w.gif)

이 접근법을 사용하면 특정 네트워크 요청이 어디서 트리거되었는지, 코드를 검사하거나 네트워크 탭에서 시간을 소비하지 않고 파악할 수 있습니다. 위 미리보기에서처럼, 개발자 도구는 네트워크 요청을 전송한 코드 세그먼트를 자동으로 표시하므로 필요한 경우 새로운 중단점을 설정하고 결과를 추가 검사할 수 있습니다.



# 호출 스택 검사

개발자들은 종종 전체 소스 코드를 여러 JavaScript 함수로 분해하여 코드의 가독성과 품질을 향상시킵니다. 또한 이러한 함수들을 여러 모듈로 정리하여 관리 가능성을 더욱 향상시킵니다. 따라서 특정 웹 앱에서 사용자가 작업을 호출할 때마다 JavaScript 엔진의 호출 스택에서 여러 JavaScript 함수가 실행됩니다. 이러한 스택 프레임은 입력 매개변수와 비공개 변수를 포함하는 함수 스코프를 보유합니다. 재귀 알고리즘 디버깅 및 함수 호출 스택 분석을 위해 스택 프레임을 검사하는 것이 중요합니다.

스택 프레임 분석기를 사용하는 것은 매우 쉬운데 - debugger 키워드를 사용하고 호출 스택 세그먼트를 열고 각 스택 프레임의 스코프를 검사할 수 있습니다. 아래 미리보기에서 보여지는 것과 같습니다:

![image](https://miro.medium.com/v2/resize:fit:1400/1*8OX_qVhdz4UtapF2jUzV8A.gif)



호출 스택은 이론적인 스택 데이터 구조를 사용합니다. 모든 일반적인 데이터 구조를 알면 프로그래밍 기술이 향상되며, 다음 이야기에서 설명했습니다:

읽어주셔서 감사합니다.