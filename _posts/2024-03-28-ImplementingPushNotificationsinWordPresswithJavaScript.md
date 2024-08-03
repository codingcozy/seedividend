---
title: "워드프레스에서 자바스크립트를 사용하여 푸시 알림 구현하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Implementing Push Notifications in WordPress with JavaScript"
link: "https://medium.com/@volodymyrzh/implementing-push-notifications-in-wordpress-with-javascript-4ba910832e46"
---



<img src="/assets/img/ImplementingPushNotificationsinWordPresswithJavaScript_0.png" />

안녕하세요! 사용자들과 효과적으로 소통하는 것은 온라인 존재감을 유지하고 확장하는 중요한 측면입니다. 이를 실현하는 가장 직접적이고 영향적인 방법 중 하나는 푸시 알림을 통한 것입니다. 푸시 알림을 통해 사용자들에게 업데이트, 공지사항 또는 새로운 콘텐츠에 대한 알림을 제공할 수 있습니다. 이를 위해 JavaScript를 사용하여 WordPress 사이트에 푸시 알림을 구현하면 사용자 참여도를 크게 향상시킬 수 있습니다. 이 기사에서는 해당 프로세스를 안내하고 시작하는 데 필요한 코드 예제를 제공할 것입니다.

# 푸시 알림 이해하기

푸시 알림은 브라우저나 웹 애플리케이션이 닫혀 있을 때에도 사용자의 데스크톱이나 모바일 기기로 전송될 수 있는 메시지입니다. 이러한 알림은 사용자들과 다시 소통하거나 콘텐츠를 홍보하거나 새 글이나 댓글을 알리는 데 강력한 도구가 될 수 있습니다.

<div class="content-ad"></div>

# 서비스 워커 설정하기

푸시 알림을 구현하기 전에, 워드프레스 사이트에 서비스 워커를 설정해야 합니다. 서비스 워커는 브라우저에서 웹 페이지와 별도로 백그라운드에서 실행되는 스크립트로, 웹 페이지나 사용자 상호작용이 필요하지 않은 기능을 제공할 수 있는 문을 엽니다.

더 읽어보기: 워드프레스에서 ARIA와 CSS로 접근성 향상하기

# 서비스 워커 생성하기

<div class="content-ad"></div>

워드프레스 테마 디렉토리에 sw.js라는 이름의 새 JavaScript 파일을 생성하세요. 이 파일은 서비스 워커로 사용될 것입니다.

sw.js:

```js
self.addEventListener("push", function (event) {
  const title = "Get Notified";
  const options = {
    body: "Stay updated with our latest news and updates.",
    icon: "/path/to/icon.png",
    badge: "/path/to/badge.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
```

# 서비스 워커 등록하기

<div class="content-ad"></div>

서비스 워커를 등록하려면 WordPress 테마의 푸터(예: footer.php)에 다음 JavaScript 코드를 추가하십시오. 닫히는 `/body` 태그 앞에 넣어주세요.

```js
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // 등록에 성공한 경우
        console.log('ServiceWorker 등록 성공. 범위: ', registration.scope);
      }, function(err) {
        // 등록 실패 :(
        console.log('ServiceWorker 등록 실패: ', err);
      });
    });
  }
</script>
```

# 푸시 알림 통합

서비스 워커를 설정한 후, 다음 단계는 푸시 알림을 통합하는 것입니다. 이에는 사용자에게 알림 수신 권한을 요청하고 알림 서비스에 구독하는 과정이 포함됩니다.

<div class="content-ad"></div>

# 알림 권한 요청

사용자에게 알림을 수신할 수 있는 권한을 요청하는 스크립트를 작성해보세요. 이 스크립트는 테마에 직접 추가하거나 사용자 정의 플러그인을 통해 추가할 수 있습니다.

```js
<script>
  Notification.requestPermission().then(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        // 등록을 사용하여 푸시 알림 구독
        console.log('사용자가 알림 수락함');
      });
    }
  });
</script>
```

그리고, CSS 및 JavaScript로 워드프레스에서 애니메이션 효과가 있는 진행 표시막을 만드는 방법을 알아보세요. https://medium.com/@volodymyrzh/creating-animated-progress-bars-in-wordpress-with-css-and-javascript-c22f7118c4a5

<div class="content-ad"></div>

# 알림 보내기

알림을 보내는 것은 일반적으로 특정 이벤트(예: 새 블로그 글 게시)에 기반하여 알림을 트리거하는 백엔드 서비스를 포함합니다. WordPress는 서버 측 PHP 코드를 사용하여 서비스 워커를 통해 푸시 알림을 보낼 수 있습니다.

알림을 트리거하는 예시 PHP 코드 (간단 버전):

```js
// 푸시 알림을 보내는 PHP 코드
function send_push_notification($subscriber_id, $message) {
  $subscriber = get_subscriber_data($subscriber_id); // 이 함수가 구독자 정보를 가져온다고 가정
  $endpoint = $subscriber['endpoint'];
  $key = $subscriber['key'];
  $token = $subscriber['token'];

  $headers = array(
    'Authorization: key=' . $key,
    'Content-Type: application/json'
  );

  $postdata = json_encode(array(
    'notification' => array(
      'title' => '새 업데이트',
      'body' => $message,
      'icon' => '/icon.png 경로'
    ),
    'to' => $endpoint
  ));

  $ch = curl_init('https://fcm.googleapis.com/fcm/send');
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $result = curl_exec($ch);
  curl_close($ch);

  return $result;
}
```

<div class="content-ad"></div>
