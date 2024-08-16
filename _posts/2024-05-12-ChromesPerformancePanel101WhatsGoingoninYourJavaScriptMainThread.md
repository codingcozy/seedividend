---
title: "크롬 성능 패널 101 자바스크립트 메인 스레드에서 무슨 일이 벌어지고 있을까"
description: ""
coverImage: "/assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_0.png"
date: 2024-05-12 23:28
ogImage: 
  url: /assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_0.png
tag: Tech
originalTitle: "Chrome’s Performance Panel 101: What’s Going on in Your JavaScript Main Thread"
link: "https://medium.com/gitconnected/chromes-performance-panel-101-what-s-going-on-in-your-javascript-main-thread-da1bb0c6c298"
isUpdated: true
---




<img src="/assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_0.png" />

# 목차

Chrome의 성능 패널에 익숙해지기

- 프로파일러의 사용자 인터페이스 이해
- 사전 설정 단계



프로파일링을 시작해봐요!

- CPU 활용률
- 네트워크 요청 타임라인
- 프레임 및 이벤트 타이밍
- JavaScript 주 스레드

팁: 프로파일러를 효과적으로 사용하는 방법

- 예시 1: LCP 성능 저하 조사하기
- 예시 2: 클릭 동작 시 어플리케이션이 멈추는 현상 조사하기



프론트엔드 개발자로서, 크롬의 성능 패널에 있는 자바스크립트 프로파일러를 들어본 적이 있거나 마주쳐 본 적이 있을지도 모릅니다. 초안에서는 차트와 그래프가 압도적으로 보일 수 있습니다.

![Chrome Performance Panel](/assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_1.png)

처음에는 다소 복잡해 보일 수 있지만, 자바스크립트 프로파일러는 디버깅에 매우 유용합니다. 이 도구를 사용하면 애플리케이션을 실행할 때 자바스크립트 메인 스레드에서 발생하는 모든 일들을 살펴볼 수 있습니다. 이 글에서는 크롬의 성능 패널을 사용한 프로파일링에 관한 제 경험을 공유하겠습니다.

# 크롬의 성능 패널에 친숙해지기



## 프로파일러의 사용자 인터페이스 이해하기

프로파일러의 모든 설정을 다루지는 않겠습니다. 오직 몇 가지 중요한 기능만이 필수이며 앱 프로파일링을 위해 구성될 것입니다.

![프로파일러](/assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_2.png)

- 녹화 및 프로파일링 시작 및 페이지 다시로드하는 작업 버튼과 Clear 버튼이 있습니다.
- 프로파일링 레코드의 이력.
- 스크린샷 및 JavaScript 힙 메모리 사용량을 프로파일링과 함께 보여주는 옵션.
- CPU 및 네트워크 쓰로틀링.



기능에 대한 포괄적인 문서를 원하시면 Chrome DevTools 성능 문서를 참고해보세요.

## 사전 구성 단계

정확한 결과를 보장하고 디버깅 프로세스를 쉽게 해 하기 위해 다음 설정을 고려해보세요:

- 시크릿 모드: 시크릿 모드에서 Chrome을 실행하면 브라우저에 영향을 미치지 않도록 확장 프로그램을 비활성화하고 캐시를 지움으로써 성능 측정에 영향을 주지 않도록합니다.
- Localhost 대 Production: 저는 TypeScript, React 또는 Webpack과 같은 번들러를 사용하는 프로젝트에서 트랜스 파일 된 또는 최소화된 코드에 문제가 발생하는 것을 피하기 위해 localhost에서 프로필링을 선호합니다. 소스 코드 추적을 쉽게 하기 위해 Chrome DevTools에 소스 맵을 업로드하여 제품 프로필링을 위해 정확한 소스 코드를 파일에 매핑하세요.
- CPU 쓸개 (4배 느리게): 주요 사용자 그룹이 모바일 기기를 사용하는 경우 CPU 쓸개를 활성화하는 것을 고려해보세요. 주의할 점은 쓸개 속도가 귀하의 기기의 CPU 성능을 기준으로 하며 결과가 다른 기기에서 달라질 수 있다는 점입니다.
- 네트워크 쓸개 (느린 3G): 네트워크를 Fast 3G 또는 Slow 3G로 설정하는 것을 추천합니다. 이 접근 방식은 네트워크 병목 현상을 더 명확하게 드러낼 수 있습니다.



# 프로파일링을 시작해봐요

만약 우리가 index.html 파일에 다음과 같은 코드 조각이 있다고 가정해봅시다:

```js
<!DOCTYPE html>
<html lang="en">
  <body>
    <h1>API에서 데이터 가져오기:</h1>
    <div id="api-data">로딩 중...</div>
    <script>
      const getData = async () => {
        const apiUrl = "https://jsonplaceholder.typicode.com/todos/1";
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("네트워크 응답이 올바르지 않습니다.");
          }
          const data = await response.json();
          document.getElementById("api-data").innerHTML = `
                    <p>제목: ${data.title}</p>
                `;
        } catch (error) {
          document.getElementById("api-data").innerText =
            "데이터를 불러오는 데 실패했습니다.";
        }
      };
      document.addEventListener("DOMContentLoaded", getData);
    </script>
  </body>
</html>
```

이 코드는 로딩한텍스트를 출력한 후 더미 데이터를 가져 오기 위해 HTTP 요청을 보내고 그것으로 로딩 텍스트를 바꾸는 역할을 합니다. 이렇게 간단해요.



인크ognito Chrome 창에서 index.html을 열고 "프로파일링 시작 및 페이지 다시로드" 버튼을 클릭해 보세요.

다음은 결과입니다.

## CPU 활용률

![Image](/assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_3.png)



상단 섹션(빨간 상자)은 CPU 활용을 나타내며, 다양한 브라우저 활동을 나타내는 다양한 색상이 있습니다. 예를 들어 스크립팅, 렌더링, 페인팅 또는 아이들 활동이 있습니다. 이러한 것들은 보통 JavaScript 주 스레드 활동에 상응합니다.

이 특정 시간대에 CPU는 대부분 유휴 상태입니다. HTML 구문 분석, DOMContentLoaded의 이벤트 핸들러 실행 및 레이아웃 단계에 사용되는 것들이 필요합니다. 레이아웃 단계는 브라우저 렌더링 단계 중 하나이며, 모든 노드의 차원과 위치를 계산하고 페이지의 각 객체의 크기와 위치를 결정합니다. 브라우저 렌더링 프로세스에 대해 더 자세히 알아보려면 여기를 읽어보세요: 브라우저 작동 방식 - 렌더링.

## 네트워크 요청 타임라인

![Network Request Timeline](/assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_4.png)



네트워크 요청 타임라인에서는 API 엔드포인트인 https://jsonplaceholder.typicode.com/todos/1이 호출되고 응답이 약 2초 후에 반환되는 것을 볼 수 있습니다.

## 프레임 및 이벤트 타이밍

![Frames and Event Timings](/assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_5.png)

프레임 타임라인은 API 응답이 반환될 때 텍스트 로드부터 결과를 렌더링하는 과정을 알려줍니다. 이벤트 타이밍 타임라인에서는 DCL (DOM 내용 로드됨), FCP (첫 번째 콘텐츠 페인트), L (로드됨), LCP (가장 큰 콘텐츠 페인트)와 같은 다양한 이벤트를 보여줍니다.



## 자바스크립트 메인 스레드

![자바스크립트 메인 스레드](/assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_6.png)

자바스크립트 메인 스레드의 모든 활동과 각 활동을 완료하는 데 소요된 시간을 보여줍니다. 호출 스택을 시각화하며 각 레이어가 작업을 나타냅니다. 각 작업을 완료하는 데 소요된 자체 시간과 총 시간을 제공합니다.

![작업 시간 시각화](/assets/img/2024-05-12-ChromesPerformancePanel101WhatsGoingoninYourJavaScriptMainThread_7.png)



자기 시간은 해당 메서드가 그 안에서 호출된 다른 메서드로 인해 발생한 시간을 제외하고 코드 라인 전체를 실행하는 데 걸리는 시간을 의미합니다. 총 시간은 해당 메서드 자체와 내부에서 호출된 다른 메서드에 의해 소요된 시간을 포함합니다.

화염 차트에서는 위에서 아래로 쌓인 함수들을 볼 수 있습니다. JavaScript 이벤트 루프는 호출 스택을 확인하고 다음 호출 스택을 시작하기 전에 비어 있는 상태에서 LIFO (Last In, First Out) 순서로 쌓인 모든 작업을 실행합니다. 이는 JavaScript가 단일 스레드 언어임을 나타내며, 즉 한 번에 하나의 작업을 수행할 수 있다는 것을 보여줍니다.

위의 화염 차트에서 JavaScript 메인 스레드에서 어떤 작업이 발생하는지 설명하기 위해 몇 가지 중요한 부분에 대해 강조해 보겠습니다.



초록 상자 안에는 최상위 함수가 DOMContentLoaded에 대한 이벤트 핸들러이고, 콜백 함수는 getData() 함수입니다. 이 함수는 Fetch API를 호출하여 HTTP 요청을 보내는 것을 담당합니다. 이 시점에서 fetch 작업은 브라우저의 Web API로 전달됩니다.

자바스크립트 이벤트 루프에서 자바스크립트 엔진은 다음 매크로태스크를 시작하기 전에 실행할 마이크로태스크가 있는지 확인합니다. API 호출이 메인 자바스크립트 스레드 외부에서 처리되므로, 데이터가 도착하기 전에 브라우저 렌더링 단계(빨간 상자에 표시됨)나 기타 동기 코드와 같은 다른 매크로태스크를 계속 실행합니다.

데이터가 도착하면 프로미스의 해결(resolve) 부분(try-catch 블록 내 await 뒤에 배치된 코드)이 마이크로태스크로 예약됩니다. 현재 매크로태스크가 완료되면, 이벤트 루프는 다음 매크로태스크로 넘어가기 전에 모든 누적된 마이크로태스크를 처리합니다.



이 문서는 단일 스레드 JavaScript가 매크로태스크와 마이크로태스크 개념을 사용하여 I/O 작업을 비차단으로 수행하는 방법을 완벽하게 보여줍니다. 이를 통해 UI가 상호작용하고 응답성을 유지할 수 있습니다.

# 팁: 프로파일러를 효율적으로 활용하는 방법

JavaScript 메인 스레드 타임라인에서 특정 함수를 검색하려면 키보드 단축키 Command + F를 사용할 수 있습니다. 일반적으로, 조사하려는 이벤트나 네트워크 요청을 먼저 찾고, 그런 다음 JavaScript 메인 스레드의 작업들을 살펴보곤 합니다.

## 예시 1: LCP 성능 저하 조사하기



앱이 콘텐츠를 로드하는 데 오랜 시간이 걸리거나 LCP 점수가 낮은 이유를 알아보고 싶다면 DOMContentLoaded 이벤트를 검색하여 콜 스택에서 발생하는 작업을 확인할 수 있습니다. 프리즈는 일반적으로 오랜 작업으로 인해 발생하며, 이는 콜 스택이 50ms 이상 소요되는 것을 의미합니다.

## 예시 2: 클릭 작업에서 앱 프리징 조사하기

버튼을 클릭할 때 앱이 왜 멈추는지 조사하고 싶다면 녹화를 시작하고 해당 작업을 수행하세요. 그런 다음 마우스 이벤트인 Event: pointerdown 또는 Event: mousedown을 검색하고 콜 스택의 기능을 검토하세요.

또한 스크린샷을 사용하여 조사하고자 하는 특정 시간대를 파악할 수도 있습니다.



프로파일러는 디버깅 및 브라우저, JavaScript, 심지어 프레임워크 작동 이해에 매우 유용한 도구입니다! 여기서 무언가를 배웠으면 좋겠네요. 프로파일링을 즐기세요!