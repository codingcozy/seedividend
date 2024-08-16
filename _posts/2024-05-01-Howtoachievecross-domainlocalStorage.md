---
title: "크로스 도메인에서 로컬스토리지 구현하기"
description: ""
coverImage: "/assets/img/2024-05-01-Howtoachievecross-domainlocalStorage_0.png"
date: 2024-05-01 23:55
ogImage: 
  url: /assets/img/2024-05-01-Howtoachievecross-domainlocalStorage_0.png
tag: Tech
originalTitle: "How to achieve cross-domain localStorage"
link: "https://medium.com/@adiachituve/how-to-achieve-cross-domain-localstorage-790a657ec36f"
isUpdated: true
---





![이미지](/assets/img/2024-05-01-Howtoachievecross-domainlocalStorage_0.png)

LocalStorage는 웹에 데이터를 저장하는 한 가지 방법입니다. 이는 클라이언트 컴퓨터 브라우저에 저장됩니다.

데이터는 도메인별로 저장되며, 동일한 도메인을 가진 페이지만이 데이터에 액세스하고 수정할 수 있습니다. 다른 도메인의 페이지는 서로의 데이터에 액세스할 수 없습니다. 이는 브라우저 저장소 보안 문제이며, 사실 도메인 및 서브도메인 간에 LocalStorage/SessionStorage/IndexedDB를 공유할 수 없습니다. 이는 "동일 출처 정책"의 일부입니다.

# 왜 localStorage를 공유해야 할까요?

<div class="content-ad"></div>

내가 겪은 실제 예시 중 하나는 회사에서 개발하지 않은 마케팅 사이트의 데이터에 접근해야 했을 때였어요. 우리 회사에서 개발하지 않은 사이트는 저희 응용 프로그램 사이트와 다른 도메인에 호스팅되어 있었거든요.
마케팅 사이트가 www.marketing.com 도메인에 있고, 저희 응용 프로그램이 다른 도메인인 www.app-site.com에 있었다고 해봅시다. 사용 사례는 분석 목적을 위해 이 두 사이트 간의 전체 사용자 이동을 저장하는 것이었어요. 사용자는 localStorage에 저장된 사용자 ID를 받았고, 그 여정 중 각 이벤트가 그 ID와 함께 기록되었어요. 저는 도메인 간에 localStorage를 공유할 수 있는 방법이 필요했어요.

# 어떻게 해결할까요?

A 도메인이 www.aaa.com이고 B 도메인이 www.bbb.com일 때, B 도메인이 A 도메인의 localStorage를 읽고 쓸 수 있도록 하고 싶다고 해봅시다.

## 요약

<div class="content-ad"></div>

- 도메인 B에 있는 Iframe을 사용하여 도메인 A에서 작은 HTML을로드합니다.
- 각 도메인(domain B 및 도메인 A의 Iframe)에서 리스너를 설정하고 postMessage를 통해 통신합니다.
- 도메인 A는 localStorage에서 데이터를 가져와 메시지로 보냅니다.

![이미지](/assets/img/2024-05-01-Howtoachievecross-domainlocalStorage_1.png)

## 다른 localStorage에 쓰기

먼저 도메인 B에 Iframe을 생성하고 도메인 A에서 작은 HTML 파일을로드하도록합니다. Iframe 스타일에는 높이, 너비 및 테두리가 없습니다. 또한 절대 위치에 떠 있습니다. DOM의 자연 흐름에 차지되지 않도록하기 위함입니다.

<div class="content-ad"></div>

```js
// www.bbb.com
<iframe id="iframe" src="www.aaa.com/external.html" onload="onMyFrameLoad()"  style="width:0;height:0;border:none;position:absolute;"></iframe>
```

그리고 도메인 A에서 호스팅된 작은 HTML 파일을 만들어서 리스너를 설정합니다:
```js
// www.aaa.com/external.html
<html>
    <head>
      <script>
          window.addEventListener('message', (message) => {
            if (message.origin === 'http://www.bbb.com') {
              const data = JSON.parse(message.data);
              const { userId } = data;
              if (userId){
                localStorage.setItem('userId', userId);
              }
            }
          });
      </script>
    </head>
</html>
```

이제 도메인 A는 도메인 B로부터 userId와 같은 데이터가 포함된 메시지를 받을 준비가 되었습니다. 이 데이터를 localStorage에 저장합니다. 이 스크립트는 www.aaa.com 아래에 있음을 기억하세요. Iframe에 포함되어 있더라도 여전히 도메인 A의 localStorage를 사용합니다. 사용자가 도메인 B에서 도메인 A로 이동할 때, 우리는 이미 데이터를 갖고 있을 것입니다. 왜냐하면 도메인 B가 메시지를 보내고 도메인 A가 해당 데이터를 localStorage에 저장했기 때문입니다. 중요한 보안 점검으로 message.origin을 먼저 확인하는 것을 잊지 마세요! 우리는 익숙하지 않은 출처의 메시지에 응답하고 싶지 않습니다.


<div class="content-ad"></div>

우리는 실제로 도메인 B에서 postMessage를 통해 메시지를 보내야 합니다. 이를 위해 Iframe의 onMyFrameLoad 함수 코드를 추가합니다:

```js
// www.bbb.com
<script>
  function onMyFrameLoad() {
    var userId = getUserId();
    var data = {userId: userId};
    var iframeEl = document.getElementById("myIframe");
    iframeEl.contentWindow.postMessage(JSON.stringify(data), 'www.aaa.com');
  };
</script>

<iframe id="iframe" src="www.aaa.com/external.html" onload="onMyFrameLoad()"  style="width:0;height:0;border:none;position:absolute;"></iframe>
```

Iframe가로드 된 후에 onMyFrameLoad 함수가 실행되어야 하는 것이 중요합니다. 즉, onload에서 호출해야 합니다. 메시지를 보내기 전에 다른 쪽에서 이벤트 리스너를 추가해야 합니다.

그래서 모든 것을 설정했습니다. 사용자가 도메인 B에 도달하면 Iframe이 로드되고, 그런 다음 도메인 A의 external.html이 호출되어 메시지를 위한 리스너를 설정합니다. 도메인 B는 이후 userId를 도메인 A로 전송할 postMessage를 실행한 후, 그것이 localStorage에 저장될 것입니다.

<div class="content-ad"></div>

# 반대 방향

이제 사용자가 처음에 도메인 A를 방문한 경우를 고려해 봅시다. 우리는 도메인 A의 로컬 저장소에 저장된 사용자 ID와 같은 데이터를 도메인 B와 공유하고 싶습니다.

이를 위해 외부.html에 이 데이터가 이미 있는지 확인하는 if 문을 추가해야 합니다. 데이터가 있는 경우, 도메인 B에게 postMessage를 보냅니다. 그렇지 않으면, 도메인 B가 데이터를 보내기를 대기합니다.

```js
// www.aaa.com/external.html
<html>
    <head>
      <script>
            const userId = localStorage.getItem('userId');
            if (userId) {
              const data = {userId: userId};
              parent.postMessage(JSON.stringify(data), "http://www.bbb.com")
            }
            else {
              window.addEventListener('message', (message) => {
                if (message.origin === 'http://www.marketing.com') {
                  const data = JSON.parse(message.data);
                  const { userId } = data;
                  if (userId){
                    localStorage.setItem('userId', userId);
                  }
                }
              });       
            }  
      </script>
    </head>
</html>
```

<div class="content-ad"></div>

알림: 이제 postMessage는 iframe 요소가 아니라 부모의 속성입니다. 이는 iframe이 포함되어 있을 때 해당 window이 로드를 담당하는 부모 객체이기 때문입니다.

그리고 도메인 A와 유사하게, 도메인 B에서 듣는 리스너를 추가할 것입니다.

```js
// www.bbb.com
<script> 
    window.addEventListener('message', function(message) {
    if (message.origin === 'wwww.aaa.com') {
      var data = JSON.parse(message.data);
      var userId = data.userId;
      if (userId){
        doSomethingWithTheData()
      }
    }
  });
</script>

<script>
  function onMyFrameLoad() {
    var userId = getUserId();
    var data = {userId: userId};
    var iframeEl = document.getElementById("myIframe");
    iframeEl.contentWindow.postMessage(JSON.stringify(data), 'www.aaa.com');
  };
</script>

<iframe id="myIframe" src="www.aaa.com/external.html" onload="onMyFrameLoad()"  style="width:0;height:0;border:none;position:absolute;"></iframe>
```

# 결론

<div class="content-ad"></div>

우리는 localStorage에 저장된 데이터를 다른 도메인과 iframe을 사용하여 postMessage를 통해 공유할 수 있다는 것을 알았어요.

이것은 물론 2개의 도메인 간에 정확히 공유하려는 매개변수에 대한 합의가 있는 구체적인 사용 사례에 적합합니다. 우리는 거의 없지만 교차 도메인 스토리지 규칙을 어길 용의가 있는 몇 가지 사용 사례가 있으므로, 당신의 경우가 적합한 사용 사례인지 신중히 생각해야 해요.