---
title: "크롬 콘솔 유틸리티 모든 개발자가 알아야 할 내용"
description: ""
coverImage: "/assets/img/2024-05-14-ChromeConsoleUtilitiesThatEveryDeveloperShouldKnow_0.png"
date: 2024-05-14 14:00
ogImage: 
  url: /assets/img/2024-05-14-ChromeConsoleUtilitiesThatEveryDeveloperShouldKnow_0.png
tag: Tech
originalTitle: "Chrome Console Utilities That Every Developer Should Know"
link: "https://medium.com/gitconnected/chrome-console-utilities-that-every-developer-should-know-1e383c0ebadf"
isUpdated: true
---





![ChromeConsoleUtilities](/assets/img/2024-05-14-ChromeConsoleUtilitiesThatEveryDeveloperShouldKnow_0.png)

모든 표준 웹 브라우저는 일반적으로 개발자가 웹 앱을 디버깅할 수 있는 도구를 제공합니다. 예를 들어 대부분의 브라우저에는 내장된 JavaScript 디버거, DOM 트리 인스펙터, 네트워크 모니터 및 네트워크 속도 시뮬레이터가 있습니다. 인기 있는 Google Chrome 브라우저는 생산성 중심의 웹 앱 디버깅 기능을 제공하는 잘 알려진 DevTools 툴킷을 제공합니다. DevTools 프로토콜 덕분에 네이티브 웹 앱 디버깅 외에도 Chrome에서 TypeScript, Deno, Node.js 및 React Native 앱을 디버깅할 수 있습니다.

웹 앱 디버깅 프로세스는 주로 브라우저 콘솔, 디버거 인터페이스 및 DOM 인스펙터를 사용합니다. 웹 개발자들은 보통 브라우저 콘솔을 사용하여 디버깅과 실험적인 목적을 위해 빠른 코드 조각을 실행하고 디버깅 관련 로그 값을 확인합니다. Chrome은 GNU/Linux 터미널에서 개발자 생산성을 높이는 Bash 해석기와 같은 여러 생산성 중심 단축키를 제공하여 콘솔에서 코드 조각을 효율적으로 작성하는 데 도움을 줍니다. 이러한 Chrome 콘솔 유틸리티 단축키를 사용하여 웹 애플리케이션 디버깅 관련 작업(예: 인스펙터에서 선택된 DOM 요소 가져오기)을 빠르게 처리할 수 있습니다. 이러한 콘솔 유틸리티는 브라우저 콘솔에서만 작동하므로 웹 앱 소스 파일에서 이름 충돌을 걱정할 필요가 없습니다.

이 기사에서는 Chrome에서 사용할 수 있는 여러 콘솔 유틸리티를 설명하여 웹 애플리케이션을 더 빠르게 디버깅할 수 있도록 도와드리겠습니다. 디버깅 활동 중에 번거롭고 긴 코드 입력이 필요한 마우스 클릭이나 입력을 피하고 Chrome 콘솔에서 이러한 빠른 단축키를 사용하세요.




# 빠른 DOM 노드 선택을 위한 JQuery 스타일 셀렉터

인기있는 JQuery 라이브러리는 기존의 웹 API보다 CSS 셀렉터를 기반으로 DOM 요소를 선택하는 더 생산적인 방법을 제공합니다. 만약 콘솔에서 일부 DOM 노드 속성에 액세스하거나 일부 DOM 노드를 검색해야 하는 경우는 어떨까요? 웹 앱이 JQuery를 사용한다면 JQuery를 사용할 수 있으므로 $ 구문을 사용할 수 있지만, 만약 JQuery를 사용하지 않는다면요?

Chrome은 JQuery 라이브러리를 사용하지 않아도 콘솔에서 $ 구문을 사용할 수 있게 해줍니다. Chrome 콘솔에서 $는 단일 요소를 즉시 쿼리할 수 있도록 document.querySelector 메서드의 단축키로 작동합니다:

```js
$('.item-01')
```



위의 코드 스니펫은 item-01 클래스 이름을 가진 첫 번째 DOM 노드를 출력합니다. 비슷하게, $$ 바로 가기는 document.querySelectorAll 메서드를 트리거하고 하나 이상의 요소를 반환합니다. 예를 들어, 다음 코드 스니펫은 모든 `h1` 요소를 출력합니다:

```js
$$('h1')
```

XPath 표현식을 기반으로 DOM 요소를 선택할 수도 있습니다. 다음과 같이 사용합니다:

```js
$x('/html/body/div')
```



# 표준 콘솔 API 단축키

모든 브라우저와 Node.js와 같은 JavaScript 실행 환경은 웹 앱 코드베이스에서 디버깅을 위해 개발자들이 사용할 수 있는 완전한 기능을 갖춘 콘솔 API를 제공합니다. 예기치 않은 문제가 발생할 때 브라우저 콘솔에 몇 가지 메시지를 기록할 수 있습니다. 그런 다음 개발자 또는 사용자 테스트 중에 중요 문제를 진단하기 위해 분석할 수 있습니다. console.log, console.error, console.warn은 일반적으로 사용되는 콘솔 로깅 방법입니다.

Chrome은 디버깅 생산성을 향상시키기 위해 여러 콘솔 API에 대한 단축 함수 이름만을 제공합니다. dir 함수는 console.dir API 메소드를 트리거하므로 객체의 키-값 데이터를 출력하는 데 사용할 수 있습니다. 이것은 콘솔이 기본적으로 HTML 코드와 함께 요소를 출력할 때 DOM 요소 속성을 출력하는 좋은 메커니즘입니다:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*edY7C6664IEZlnhK3uEfCA.gif)



비슷하게, 콘솔 표시 방법을 이용하기 위해 table 함수를 사용할 수 있습니다. 또한 clear 함수는 console.clear 메서드를 호출하여 브라우저 콘솔을 지웁니다.

콘솔 API는 또한 성능 프로파일러를 시작하고 중지하는 두 가지 표준이 아닌 메서드를 제공합니다. Chrome은 profile 및 profileEnd 콘솔 함수 단축키를 통해 이러한 프로파일러 전용 콘솔 API 메서드를 호출하며, 다음 미리 보기에 나와 있습니다:

![JavaScript Object API Shortcuts](https://miro.medium.com/v2/resize:fit:1400/1*Bh2JR81JSCzdF55B1PFeng.gif)



현대적인 범용 프로그래밍 언어인 JavaScript는 거의 모든 개발 요구 사항을 위한 완전히 갖춘 미리 로드된 표준 라이브러리를 제공합니다. JavaScript는 JSON과 유사한 객체 개념과 내장 JSON 직렬화/역직렬화를 사용하여 객체를 다루는 데 생산적인 방법을 제공합니다. 모든 웹 개발자가 Object.keys 및 Object.values 메서드를 알고 있습니다. 이들은 JavaScript 객체에서 키와 값을 추출하는 데 도움이 되는 메서드입니다. Chrome 콘솔 유틸리티는 키와 값 내장 기능 바로 가기를 구현하며 디버깅 활동 중에 이러한 자주 사용되는 Object API 메서드를 생산적으로 사용할 수 있게 해줍니다.

다음 객체의 키와 값을 별도로 검사해야 한다고 가정해 보겣습니다:

```js
const doc = {
  id: 100,
  title: 'My document',
  size: 'A4',
  authorId: 100
}
```

위 객체의 키만 출력하려면, 다음 미리보기에 표시된 대로 keys 함수를 사용할 수 있습니다.




![image](https://miro.medium.com/v2/resize:fit:1400/1*kDCuc9qJcb5Af0z8nH0FOQ.gif)

"values" 함수는 특정 객체의 모든 값을 출력하는 효율적인 방법을 제공합니다:

![image](https://miro.medium.com/v2/resize:fit:1400/1*1eIQH3rgOnfb6Po5Kgu5hQ.gif)

다음 이야기는 경험 많은 웹 개발자로서 알아야 할 새로운 브라우저 API를 설명합니다:




# 브레이크포인트 설정 및 소스 코드 검사를 위한 바로 가기

현대 웹 앱 디버깅 프로세스는 일반적으로 브레이크포인트와 DOM 검사를 활용합니다. 브레이크포인트는 JavaScript 디버깅을 도와주고, DOM 검사는 HTML 분석 및 CSS 기반 스타일링 개선을 지원합니다. 브레이크포인트를 설정하려면 개발자 도구 인터페이스나 디버거 JavaScript 문을 사용할 수 있습니다. Chrome 콘솔도 브레이크포인트 설정을 위한 생산성 바로 가기를 제공합니다.

다음과 같은 함수가 현재 콘솔 컨텍스트에 로드되어 있고 사용 가능하다고 가정해 봅시다:

```js
function genArr(n) {
  let sq = n ** 2;
  sq = Math.min(sq, 1000);
  let arr = [...new Array(sq).keys()];
  return arr;
}
```



genArr 함수 내에서 중단점을 설정해야 한다고 가정해봅니다. 콘솔에서 debug 함수를 호출하여 자동 중단점을 활성화할 수 있습니다:

```js
debug(genArr)
```

그러면, 개발자 도구가 genArr 함수에 자동으로 중단점을 추가할 것입니다:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*FkCGFnh2yVQ1O9lWH0B8fQ.gif" />



지금은 genArr 함수가 실행될 때 자동 중단점이 코드 실행을 중단시킵니다. 다음 함수 호출로 자동 중단점을 비활성화할 수 있습니다:

```js
undebug(genArr)
```

위 접근법을 사용하면 중단점을 설정하고 함수를 검색할 수 있습니다. 자동 중단점을 활성화하지 않고 함수 소스를 확인해야 하는 경우 inspect 함수가 도움이 됩니다. 특정 함수로 이동하고 콘솔에 해당 함수의 소스를 출력합니다. 아래 미리보기에서 보여지는 것과 같습니다:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*f33oL_zYjf0OJikBbmUxmQ.gif" />



현재 활성 요소를 검사하는 기능을 사용할 수 있어요. 

```js
inspect(document.activeElement)
```

# 함수 호출 모니터링

디버깅 작업 중에 함수 호출을 감지하는 여러 방법이 있어요. 일부 개발자들은 주로 콘솔에 일부 값을 출력하여 함수 호출을 감지하기 위해 console.log 문을 수동으로 사용하죠. 한편, 일부 개발자들은 중단점을 설정합니다. 이러한 접근 방법에는 여러 가지 단점이 있어요. 특정 함수가 수천 번 호출된다면, 중단점으로는 시간이 많이 소요될 거에요. 반면 콘솔.log 기반 방법을 사용하려면 소스를 수동으로 편집해야 해요.



크롬 콘솔 유틸리티에는 빌트인 콘솔 함수인 monitor 및 unmonitor이 있어서 소스 파일을 직접 편집하거나 중단점을 사용하지 않고도 함수 호출을 효율적으로 모니터링할 수 있습니다.

이전 genArr 함수 실행을 모니터링해야 한다고 가정해봅시다:

```js
function genArr(n) {
  let sq = n ** 2;
  sq = Math.min(sq, 1000);
  let arr = [...new Array(sq).keys()];
  return arr;
}
```

먼저 특정 함수에 대해 모니터링 기능을 활성화하세요:



```js
monitor(genArr)
```

지금부터 genArr 함수에 들어오는 모든 호출을 모니터링하고 콘솔에 입력된 인수를 출력합니다:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*K8rzCdmRGu0IZXTa5EV7Vw.gif" />

다음 코드 스니펫을 사용하여 genArr 함수의 함수 모니터링을 비활성화할 수 있습니다:



```js
unmonitor(genArr)
```

# 콘솔 내에서 이벤트 처리하기

DevTools에는 브라우저 이벤트를 감지하는 여러 가지 방법이 있습니다. 특정 이벤트가 트리거될 때 소스 브레이크포인트를 자동으로 설정하는 이벤트 브레이크포인트를 설정할 수 있습니다. 또한 window 객체에 연결된 전역 이벤트를 찾는 기능도 제공합니다. 그렇다면 콘솔에서 웹 앱 이벤트를 직접 감지하고 탐색하고 싶다면 어떻게 해야 할까요?

Chrome 콘솔 유틸리티는 getEventListeners 내장 함수를 제공하여 특정 객체의 등록된 이벤트 리스너를 찾을 수 있습니다. 예를 들어, 다음 코드 조각은 현재 활성 DOM 요소 객체에 연결된 모든 이벤트 리스너를 출력합니다:



```js
getEventListeners(document.activeElement)
```

위의 유틸리티 함수는 등록된 이벤트 리스너를 살펴보는 데 도움이 됩니다. 특정 이벤트가 어떻게 트리거되었는지를 알고 싶을 때, DevTools GUI의 이벤트 리스너 브레이크포인트 기능을 사용하지 않고는 어떻게 할 수 있을까요?

monitorEvents 및 unmonitorEvents 바로 가기 함수를 사용하면 JavaScript 객체를 기반으로 브라우저 이벤트를 모니터링할 수 있습니다.

다음 코드 스니펫을 살펴보세요:



```js
monitorEvents(document.activeElement, 'click')
```

위의 코드 조각을 콘솔에 입력하면 현재 활성 요소의 모든 클릭 이벤트를 찾을 수 있어요:

![click event monitoring](https://miro.medium.com/v2/resize:fit:1400/1*LRnKHf1OPXuqUl7z6YbDag.gif)

다음 코드 조각으로 이벤트 모니터링을 비활성화할 수 있어요:



```js
unmonitorEvents(document.activeElement)
```

# 줄임표 디버그 관련 변수들

모든 명령 줄 해석기는 일반적으로 개발 작업을 가속화하는 다양한 생산성 중심의 단축키를 제공합니다. 예를 들어 Bash 해석기는 이전 명령의 프로세스 종료 코드를 얻기 위한 특별 매개 변수 $?를 제공합니다. 비슷하게, Chrome 콘솔 해석기는 웹 앱 디버깅 작업을 위한 각종 줄임표 변수들을 제공합니다.

$_ 줄임표 변수는 콘솔에서 실행된 이전 표현식의 반환 값을 리턴합니다.



아래 예시를 살펴봐주세요:

<img src="/assets/img/2024-05-14-ChromeConsoleUtilitiesThatEveryDeveloperShouldKnow_1.png" />

이전에 document.activeElement 속성과 $ 쿼리 선택자 단축키를 사용하여 DOM 요소를 참조했습니다. 그러나 디버깅 중에 실제 렌더링된 DOM의 포커스를 변경하지 않고도 요소 탭(인스펙터) 내에서 DOM 트리 요소를 선택하는 것이 일반적입니다. 인스펙터에서 현재 선택된 DOM 요소를 가져오기 위한 단축 변수가 있다면 document.activeElement나 $ 기반 선택자 구문을 사용하지 않고도 콘솔에서 효율적으로 사용할 수 있습니다.

Chrome에서는 $0 단축 변수를 사용하여 인스펙터에서 선택된 DOM 요소를 참조할 수 있습니다. 콘솔을 통해 선택된 DOM 요소의 데이터 속성을 변경해야 한다고 가정해보세요. 다음 미리보기에 표시된 대로 수행할 수 있습니다:



![이미지](https://miro.medium.com/v2/resize:fit:1400/1*XHlPmNHQwVPU4uTkxzMaKQ.gif)

여기 이 기사의 보너스 디버깅 팁을 알려 드리겠습니다. 시스템 클립보드로 역직렬화된 JavaScript 객체를 복사하는 데 복사 함수를 사용할 수 있습니다.

다음 예제 코드 조각을 살펴보세요. 이 코드는 샘플 JavaScript 객체를 시스템 클립보드로 복사합니다:

```js
const doc = {
  id: 100,
  title: '내 문서',
  size: 'A4',
  authorId: 100
};
copy(doc)
```



더 많은 생산성 중심 기능을 Chrome DevTools에서 배울 수 있는 다음 이야기를 확인해보세요:

읽어줘서 고마워.