---
title: "2024년 안드로이드 인터뷰 대비 Broadcasts Receiver 관련 35가지 질문"
description: ""
coverImage: "/assets/img/2024-07-12-AndroidInterviewQuestions35BroadcastsReceiverinAndroid_0.png"
date: 2024-07-12 21:44
ogImage:
  url: /assets/img/2024-07-12-AndroidInterviewQuestions35BroadcastsReceiverinAndroid_0.png
tag: Tech
originalTitle: "Android Interview Questions: 35 | Broadcasts Receiver in Android"
link: "https://medium.com/@dawinderapps/android-interview-questions-35-broadcasts-receiver-in-android-636656bc8116"
isUpdated: true
---

<img src="/assets/img/2024-07-12-AndroidInterviewQuestions35BroadcastsReceiverinAndroid_0.png" />

이 이야기는 Android 인터뷰 질문 시리즈의 일부입니다. 주요 개념과 모범 사례를 습득하고 자신감을 가지고 어떤 인터뷰든 쉽게 통과하세요. 안드로이드 기술을 손쉽게 향상시키세요. 전체 시리즈를 확인하려면 아래 링크를 클릭하세요.

# 소개

Android에서 앱들은 서로 통신할 수 있으며 시스템은 브로드캐스트라고하는 메시징 시스템을 사용합니다. 브로드캐스트 수신자는 이 시스템의 중요한 부분으로, 앱들이 시스템 또는 다른 앱으로부터 메시지를 받아 응답할 수 있게 합니다. 이들은 앱이 최신 상태를 유지하도록 도와주고 변경 사항에 반응하며 새로운 작업을 시작할 수 있습니다. 이 기사에서는 브로드캐스트 수신자가 어떻게 작동하며, 그 종류와 앱 개발에서 효과적으로 사용하는 방법에 대해 탐색해 보겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 브로드캐스트 수신기란 무엇인가요?

안드로이드에서 브로드캐스트 수신기는 앱이 시스템 전체의 알림인 브로드캐스트를 수신하고 응답할 수 있는 구성 요소입니다. 이러한 브로드캐스트는 시스템이나 다른 앱이 보내는 메시지로, 특정 이벤트나 변경 사항을 다른 앱에 알리기 위해 전송됩니다.

라디오 방송을 상상해 보세요: 라디오 스테이션이 올바른 주파수로 튜닝된 모든 라디오에서 수신할 수 있는 신호를 보내는 것처럼, 안드로이드 시스템과 앱도 수신하기 위해 등록한 모든 앱에서 수신할 수 있는 브로드캐스트를 보냅니다.

# 브로드캐스트의 종류

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

안녕하세요! 안드로이드에는 두 가지 주요 브로드캐스트 유형이 있어요:

### 1. 시스템 브로드캐스트

시스템 브로드캐스트는 시스템에서 전송되며 일반적으로 앱에 시스템 전역 이벤트를 알리는 데 사용됩니다. 안드로이드 시스템에서 보내지며 다음과 같은 이벤트가 포함돼요:

- 장치 부팅 완료
- 배터리 부족
- 화면 켜짐/꺼짐
- 네트워크 연결 상태 변경

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 시스템 브로드캐스트의 예시입니다:

- android.intent.action.BOOT_COMPLETED: 장치 부팅이 완료되면 전송됩니다
- android.intent.action.BATTERY_LOW: 배터리 수준이 특정 임계값 아래로 떨어지면 전송됩니다
- android.intent.action.SCREEN_ON: 화면이 켜질 때 전송됩니다

## 2. 사용자 정의 브로드캐스트

반면에, 사용자 정의 브로드캐스트는 앱에서 전송되며 다양한 목적으로 사용할 수 있습니다. 이들은 앱에서 전송되며 다양한 목적으로 사용할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 앱간 데이터 전송
- 다른 앱에 이벤트 알림
- 다른 앱에서 작업 트리거

다음은 사용자 정의 방송의 몇 가지 예시입니다:

- 음악 앱이 새 곡이 재생 중임을 다른 앱에 알리기 위해 방송을 보내는 경우
- 날씨 앱이 날씨 업데이트를 다른 앱에 알리기 위해 방송을 보내는 경우
- 소셜 미디어 앱이 새로운 포스트를 다른 앱에 알리기 위해 방송을 보내는 경우

# 방송 수신기가 어떻게 동작하는지

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 단계 1: AndroidManifest.xml 파일에 방송 수신기 등록

```js
<receiver android:name=".MyReceiver">
  <intent-filter>
    <action android:name="android.intent.action.BATTERY_LOW" />
  </intent-filter>
</receiver>
```

이 단계에서는 AndroidManifest.xml 파일에 방송 수신기를 등록합니다. 방송 수신기 클래스 이름(.MyReceiver)과 수신하려는 동작(android.intent.action.BATTERY_LOW)을 지정합니다.

## 단계 2: 방송 수신기 클래스 생성

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```kotlin
class MyReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BATTERY_LOW) {
            Toast.makeText(context, "배터리가 낮습니다", Toast.LENGTH_SHORT).show()
        }
    }
}
```

이번 단계에서는 BroadcastReceiver 클래스를 확장하는 방송 수신기 클래스(MyReceiver)를 생성합니다. 우리는 방송을 수신할 때 호출되는 onReceive() 메서드를 재정의합니다. 이 예에서는 ACTION_BATTERY_LOW인지 확인하고 해당 경우 토스트 메시지를 표시합니다.

단계 3: 방송 송부

```kotlin
fun sendBroadcast() {
    val intent = Intent("android.intent.action.BATTERY_LOW")
    sendBroadcast(intent)
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 단계에서는 sendBroadcast() 메서드를 사용하여 브로드캐스트를 전송합니다. ACTION_BATTERY_LOW 작업을 사용하여 Intent를 만들고 sendBroadcast() 메서드에 전달합니다.

단계 4: 브로드캐스트 수신

브로드캐스트가 전송되면, 시스템은 인텐트 필터에 지정된 작업에 따라 등록된 브로드캐스트 수신기와 일치시킵니다. 일치하는 항목이 발견되면 시스템은 해당 브로드캐스트 수신기의 onReceive() 메서드를 호출합니다.

우리의 예제에서는 MyReceiver 클래스의 onReceive() 메서드가 호출되어 "배터리가 낮습니다"라는 메시지를 토스트로 표시합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이는 시스템 방송과 동일하게 사용자 정의 방송을 생성할 수 있는 예시입니다. 간단한 예시가 여기 있습니다:

```js
// 단계 1: 사용자 정의 방송 작업 정의
com.example.ACTION_NEW_MESSAGE

// 단계 2: AndroidManifest.xml 파일에 방송 수신기 등록
<receiver android:name=".MyCustomReceiver">
    <intent-filter>
        <action android:name="com.example.ACTION_NEW_MESSAGE" />
    </intent-filter>
</receiver>

// 단계 3: 방송 수신기 클래스 생성
class MyCustomReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == "com.example.ACTION_NEW_MESSAGE") {
            val message = intent.getStringExtra("message")
            Toast.makeText(context, "Received message: $message", Toast.LENGTH_SHORT).show()
        }
    }
}

// 단계 4: 사용자 정의 방송 전송
fun sendCustomBroadcast(message: String) {
    val intent = Intent("com.example.ACTION_NEW_MESSAGE")
    intent.putExtra("message", message)
    sendBroadcast(intent)
}
```

이 코드는 사용자 정의 방송 작업 (com.example.ACTION_NEW_MESSAGE)을 정의하고 해당 방송을 받아들일 방송 수신기(MyCustomReceiver)를 등록합니다. 방송이 메시지와 함께 전송되면 수신기는 작업을 확인하고 메시지를 추출하여 토스트 메시지를 표시합니다. 방송은 sendBroadcast() 메서드를 사용하여 전송되며, 이는 수신기가 방송을 수신하고 처리할 수 있도록 활성화시킵니다. 이를 통해 앱들은 방송을 통해 서로 통신하고 데이터를 교환할 수 있습니다.

# 방송 수신기의 사용 사례

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 시스템 이벤트: 시스템 상태 변경 시 알림을 받습니다 (예: 배터리 부족, 화면 켜기/끄기)
- 다른 앱으로부터 데이터: 다른 앱이 보낸 데이터를 받습니다 (예: 새 메시지 알림)
- 알림: 사용자에게 알림을 표시합니다 (예: 새 이메일, 메시지 또는 업데이트)
- 위젯 업데이트: 홈 화면의 위젯을 업데이트합니다 (예: 날씨, 뉴스 또는 주식)
- 데이터 동기화: 앱 간 데이터를 동기화합니다 (예: 연락처, 캘린더 이벤트 또는 메모)
- 위치 업데이트: 장치가 특정 위치에 들어간 때 업데이트를 받습니다 (예: 지오펜싱)
- 센서 데이터: 장치 센서에서 데이터를 받습니다 (예: 빛, 소리 또는 움직임)
- 지오펜싱: 특정 위치에 들어갈 때 알림을 받습니다 (예: 집, 직장 또는 학교)
- 웨어러블 업데이트: 웨어러블 기기에서 업데이트를 받습니다 (예: 피트니스 트래커 또는 스마트워치)
- 사용자 정의 방송: 앱 간에 사용자 정의 방송을 보내고 받습니다 (예: 사용자 정의 알림 또는 데이터 업데이트)

이 주제에 관한 인터뷰에서 물어볼 수 있는 몇 가지 질문:

- 안드로이드에서 Broadcast Receiver란 무엇인가요?
  시스템 전반의 알림이나 이벤트에 응답하는 구성 요소입니다.
- Broadcast Receiver에서 Intent Filter의 목적은 무엇인가요?
  Receiver가 처리해야 할 방송을 지정하기 위해 사용됩니다.
- 동기식과 비동기식 Broadcast Receiver의 차이점은 무엇인가요?
  동기식 Receiver는 주 스레드에서 실행되고, 비동기식 Receiver는 백그라운드 스레드에서 실행됩니다.
- Broadcast Receiver를 등록 해제해야 하는 시기는 언제인가요?
  리소스를 낭비하지 않기 위해 Receiver가 더 이상 필요하지 않을 때 등록을 해제해야 합니다.
- Broadcast Receiver가 액티비티를 시작할 수 있나요?
  네, startActivity() 메서드를 사용하여 시작할 수 있습니다.
- Broadcast Receiver에서 수신한 데이터를 어떻게 처리하나요?
  getIntent() 메서드를 사용하여 Intent에서 데이터를 추출합니다.

질문이 있거나 추가 설명이 필요하면 언제든지 저에게 연락해 주세요 ☎️. 또한 다른 이들이 이에 도움을 받을 수 있는 경우 함께 공유해 주시고 👏 여러 번 클랩을 쾌적해 주시기 바랍니다. 여러분의 지원은 저에게 큰 힘이 되며 계속 배운 것을 공유할 수 있도록 격려해 주는 요인입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

마지막으로, 코딩 세계를 한 줄씩 탐험하는 이런 게시물을 더 보고 싶다면 👥 Dawinder Singh Gill를 팔로우해보세요. 즐거운 코딩되세요!
