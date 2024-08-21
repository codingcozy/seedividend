---
title: "안드로이드 14 포어그라운드 서비스 가이드"
description: ""
coverImage: "/assets/img/2024-07-01-GuidetoForegroundServicesonAndroid14_0.png"
date: 2024-07-01 20:13
ogImage:
  url: /assets/img/2024-07-01-GuidetoForegroundServicesonAndroid14_0.png
tag: Tech
originalTitle: "Guide to Foreground Services on Android 14"
link: "https://medium.com/@domen.lanisnik/guide-to-foreground-services-on-android-9d0127dc8f9a"
isUpdated: true
---

안녕하세요! 안드로이드 14에는 SDK 버전 34를 타겼다면 포그라운드 서비스와 관련된 중요 변경 사항이 포함되어 있습니다. 이 변경 사항을 적용하려면 어떤 작업을 해야 하는지 살펴보겠습니다.

또한 나타날 수 있는 일반적인 예외 상황과 그들을 어떻게 해결할 수 있는지도 다룰 예정입니다.

이 글의 끝에는 포그라운드 서비스를 올바르게 구현하는 방법을 보여주는 샘플 프로젝트도 찾아보실 수 있습니다.

![Foreground Services on Android 14](/assets/img/2024-07-01-GuidetoForegroundServicesonAndroid14_0.png)

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

## 포그라운드 서비스란 무엇인가요?

포그라운드 서비스는 사용자에게 표시되는 작업이나 작동을 수행하는 서비스로, 사용자가 앱과 직접 상호 작용하지 않을 때에도 실행을 계속할 수 있습니다. 이러한 서비스는 활성 상태임을 사용자에게 인식시키기 위해 시스템 알림을 표시해야 합니다.

포그라운드 서비스를 사용하는 앱의 예시로는 아래와 같은 것들이 있습니다:

- 사용자가 앱을 나갔을 때에도 음악을 재생하는 음악 플레이어 앱(예: Spotify),
- 폰이 잠겨 있을 때에도 걸음 수를 추적하는 피트니스 앱(예: Google Fit),
- 운전 방향을 제공하는 네비게이션 앱(예: Google Maps) 등이 있습니다.

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

## 포그라운드 서비스 유형

Android 10에서는 `service` 요소 내에 있는 android:foregroundServiceType 속성을 소개했습니다. 이 아이디어는 서비스가 하는 일의 종류를 명시적으로 지정하는 것입니다. 지금까지는 서비스가 위치, 카메라 또는 마이크 권한을 사용하는 경우에만 유형을 지정해야 했습니다.

Android 14에서는 포그라운드 서비스 유형을 지정하는 것이 필수적으로 되었습니다. 이는 포그라운드 서비스의 올바른 사용과 기기 제조업체 간의 일관성을 보장하기 위한 조치입니다.

현재 지원되는 유형은 다음과 같습니다:

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

- 카메라 (Android 11에서 필수) — 비디오 통화 앱과 같이 백그라운드에서 카메라에 액세스할 때
- connectedDevice — Bluetooth 피트니스 장치와 상호 작용할 때
- dataSync — 데이터를 업로드하거나 다운로드할 때, Deprecated될 예정이며 DownloadManager, BackupManager, 또는 WorkManager와 같은 대안을 대신 사용해야 함
- health (Android 14에서 새롭게 추가) — 운동 추적 앱과 같은 피트니스 앱용
- 위치 (Android 10에서 필수) — 위치가 필요한 경우, 네비게이션과 같이
- mediaPlayback — Spotify나 Netflix와 같은 앱과 같이 백그라운드에서 오디오 또는 비디오 재생을 계속할 때
- mediaProjection — 외부 장치나 화면에 콘텐츠를 투영할 때
- 마이크 (Android 11에서 필수) — 호출 앱과 같이 백그라운드에서 마이크에 액세스할 때
- phoneCall — 계속 중인 통화를 할 때
- remoteMessaging (Android 14에서 새롭게 추가) — 한 기기에서 다른 기기로 문자 메시지를 전송할 때
- shortService — 중단할 수 없는 중요한 작업을 빠르게 완료해야 할 때, 약 3분 동안만 실행 가능
- specialUse — 다른 유형이 사용 사례를 수용하지 못할 때
- systemExempted — 시스템 앱을 위해 예약

백그라운드 서비스 유형 선언
Android 14를 지원하기 위한 첫 번째 단계는 AndroidManifest 파일에서 서비스 선언을 업데이트하고 올바른 포그라운드 서비스 유형을 지정하는 것입니다.

서비스가 여러 유형을 필요로 하는 경우 다음과 같이 | 연산자를 사용하여 결합할 수 있습니다:

```js
<manifest xmlns:android="http://schemas.android.com/apk/res/android" ...>
    <service
        android:name=".MyForegroundService"
        android:foregroundServiceType="camera|location|microphone"
        android:exported="false">
    </service>
</manifest>
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

만약 매니페스트에서 해당 서비스의 유형을 선언하지 않고 foreground service를 시작하려고 하면 startForeground()를 호출할 때 시스템에서 MissingForegroundServiceTypeException을 throw할 것입니다.

## 특정 foreground service 권한 요청

Android 9 (API 28)부터 앱은 앱 매니페스트에서 FOREGROUND_SERVICE 권한을 요청해야 했으며, 이는 시스템에서 자동으로 부여되었습니다.

```js
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
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

Android 14(API 34)부터 앱은 전경 서비스의 유형에 따라 추가 권한을 요청해야 합니다. 따라서, 서비스가 외부 블루투스 장치에 연결되면 FOREGROUND_SERVICE_CONNECTED_DEVICE를 지정해야 합니다. 시스템에서 권한이 자동으로 부여됩니다.

```js
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_CONNECTED_DEVICE" />
```

만약 서비스가 여러 유형이 필요하다면, 각 유형마다 해당 권한을 선언해야 합니다.

두 권한 중 하나라도 선언을 잊어버리면, 정확한 이유를 설명하는 SecurityException을 받게 됩니다.

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

```js
java.lang.SecurityException:
     Permission Denial: startForeground from pid=8589, uid=10623
     requires android.permission.FOREGROUND_SERVICE

or

java.lang.SecurityException:
     Starting FGS with type mediaPlayback targetSDK=34
     requires permissions:
        all of the permissions allOf=true
        [android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK]
```

## startForeground() 함수에서 서비스 유형 지정

manifest에서 foreground service 유형을 선언하는 것 외에도 startForeground() 함수를 호출할 때 이를 명시해야 합니다.

서비스를 foreground에서 실행하려면 서비스 내에서 ServiceCompat.startForeground()를 호출해야 합니다. 보통 onStartCommand()에서 호출됩니다. 이 함수는 서비스, 알림의 ID, 알림 객체, 그리고 서비스가 수행하는 작업을 나타내는 foreground service 유형을 인자로 받습니다.

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

안드로이드 이전 버전에서는 foregroundServiceType 인수에 0을 전달하기만 하면 됐었지만, 이제는 매니페스트에 선언된 올바른 타입 또는 타입의 하위 집합을 전달해야 합니다. 사용 사례에 따라 추가된 타입으로 startForeground()를 여러 번 호출하는 것이 가능합니다.

```js
ServiceCompat.startForeground(
    this,
    id,
    notification,
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK
    } else {
        0
    }
)
```

foregroundServiceType에 0을 전달하여 startForeground()를 시도하면 예외가 발생합니다:

```js
android.app.InvalidForegroundServiceTypeException:
  Starting FGS with type none
  targetSDK=34 has been prohibited
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

만약 매니페스트에 선언하지 않은 타입을 전달하면, 이와 유사한 예외를 받게 됩니다:

```js
java.lang.IllegalArgumentException:
  foregroundServiceType 0x00000002 is not a subset of
  foregroundServiceType attribute 0x00000000 in service
  element of manifest file
```

```js
android.app.ForegroundServiceDidNotStartInTimeException:
  Context.startForegroundService() did not then call Service.startForeground()
```

## 런타임 권한 요청하기

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

각 전경 서비스 유형에는 필요한 권한 목록이 있습니다. 전경 서비스를 시작하기 전에 필요한 런타임 권한을 요청하고 승인받아야 합니다. 권한이 승인되지 않은 상태에서 서비스를 시작하려고 하면 해당 서비스에서 예외가 발생합니다.

예를 들어, 앱이 백그라운드에 있을 때도 카메라를 사용해야 하는 서비스라면 android.permission.CAMERA 권한을 요청해야 합니다.

그리고 서비스가 Bluetooth 장치에 연결해야 한다면 다음 중 하나 이상의 조건이 성립해야 합니다.

- 매니페스트에 다음 중 하나 이상의 권한을 선언:
- CHANGE_NETWORK_STATE
- CHANGE_WIFI_STATE
- CHANGE_WIFI_MULTICAST_STATE
- NFC
- TRANSMIT_IR
- 다음 중 하나 이상의 런타임 권한을 요청하고 승인받아야 합니다:
- BLUETOOTH_CONNECT
- BLUETOOTH_ADVERTICE
- BLUETOOTH_SCAN
- UWB_RANGING
- UsbManager.requestPermission() 호출하기

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

만약 서비스 시작 전 조건을 충족하지 않을 경우, 해당 조건이 충족되지 않았다는 정보를 포함한 예외가 발생합니다. 아래 예시에서는 앱이 필요한 권한을 부여받지 못한 상태입니다.

```js
Starting FGS with type connectedDevice targetSDK=34 requires permissions:
- all of the permissions allOf=true
  - [android.permission.FOREGROUND_SERVICE_CONNECTED_DEVICE]
- any of the permissions allOf=false
  - [android.permission.BLUETOOTH_ADVERTISE,
     android.permission.BLUETOOTH_CONNECT,
     android.permission.BLUETOOTH_SCAN,
     android.permission.CHANGE_NETWORK_STATE,
     android.permission.CHANGE_WIFI_STATE,
     android.permission.CHANGE_WIFI_MULTICAST_STATE,
     android.permission.NFC,
     android.permission.TRANSMIT_IR,
     android.permission.UWB_RANGING,
     USB Device,
     USB Accessory]
```

## 알림이 올바르게 설정되어 있는지 확인해주세요

백그라운드 서비스를 시작할 때, 서비스 실행 기간 동안 사용자에게 보여질 알림을 제공해야 합니다. Android 13에서는 알림을 게시하는 런타임 권한이 도입되었는데, 이에 따라 앱이 이 권한을 요청하고 사용자가 명시적으로 부여해야만 알림이 표시됩니다. 그렇지 않으면 알림이 보이지 않습니다.

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

- POST_NOTIFICATIONS 권한을 요청하고 사용자가 수락하면 알림이 정상적으로 표시됩니다.

![이미지](/assets/img/2024-07-01-GuidetoForegroundServicesonAndroid14_1.png)

- 권한을 요청하고 사용자가 거부하면 알림이 표시되지 않지만 서비스는 의도한 대로 작동합니다. 사용자들은 작업 관리자에서 백그라운드 작업을 수행하는 앱임을 확인할 수 있습니다.
- 알림 권한을 요청하지 않고도 알림을 게시하려고 하면, 앞의 내용과 동일하게 앱이 작동합니다.

![이미지](/assets/img/2024-07-01-GuidetoForegroundServicesonAndroid14_2.png)

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

## Google Play 콘솔의 사용 사례에 대한 세부 정보 제공

Google Play 콘솔에 새 버전의 앱을 업로드하고 Android 14를 대상으로 하며 foreground service 유형을 사용하는 경우, 콘솔에서 사용법에 대한 추가 세부 정보를 제공하라는 메시지가 표시됩니다.

Google은 앱이 foreground 서비스를 적절하게 사용하고 있는지 확인하기 위해, App content 페이지 (정책 - 앱 콘텐츠)에서 새로운 선언을 제출해야 합니다.

선언한 각 foreground 서비스 유형에 대해 다음을 수행해야 합니다:

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

- 어떤 전경 서비스 유형을 사용하는 앱의 기능을 설명합니다.
- 시스템에 의해 작업이 지연되거나 중단될 경우 사용자에게 미치는 영향을 설명합니다.
- 각 전경 서비스 기능을 보여주는 비디오 링크를 포함합니다. 비디오에서는 사용자가 앱에서 기능을 트리거하기 위해 취해야 하는 단계를 보여주어야 합니다.
- 각 전경 서비스 유형에 대한 구체적인 사용 사례를 선택하십시오. 여기에 나열된 사전 설정된 사용 사례 중 하나를 선택하거나 수동으로 입력할 수 있습니다.

## 삼성 기기를 위한 개선 사항

삼성은 안드로이드 14 이상을 실행하는 갤럭시 기기에서 전경 서비스가 의도대로 작동하도록 한 통합 정책에 관해 Google와 협력했습니다. 이는 삼성이 34%¹의 시장 점유율을 가지고 있고, 이전에는 전경 서비스가 경우에 따라 Pixels와 같은 기기와 비교했을 때 다르게 작동했기 때문에 통합된 안드로이드 플랫폼으로 나아가는 중요한 한 걸음입니다.

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

여기 인용문이 있습니다:

# 샘플 앱

안드로이드 14에서 포그라운드 서비스를 만들고 시작하는 방법을 보여주는 간단한 샘플 앱을 준비했습니다. 다음 기능이 포함되어 있습니다:

- 위치를 포그라운드 서비스 형태로 선언하여 포그라운드 서비스 시작
- 서비스 시작 전에 위치 권한 요청
- Activity에서 포그라운드 서비스에 바인딩하여 서비스 상태를 표시하고 위치 업데이트 수신
- 액티비티에서 서비스 중지
- 포그라운드 서비스 알림을 표시하기 위해 알림 권한 요청

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

# 결론

안드로이드 14에서는 전경 서비스와 관련된 여러 가지 변경 사항이 있어, 앱이 API 34를 대상으로 설정되도록 만들기 위해 개발자들이 추가 작업을 해야 합니다. 가장 큰 변경 사항은 전경 서비스 유형이 이제 필수 요소가 되었는데, 이는 서비스를 시작하기 전에 모든 요구 사항을 충족해야 한다는 것을 의미합니다.

새로운 변경 사항은 전경 서비스에 대해 더 표준화된 접근 방식을 의미하며 다양한 제조업체로부터 더 나은 지원을 기대할 수 있습니다.

이 안내서가 유용했기를 바라며, 샘플 앱을 검토하고 아래 링크된 추가 자료를 확인하여 더 많은 정보를 얻기를 권장합니다.

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

자원:

- https://developer.android.com/develop/background-work/services/foreground-services — foreground 서비스에 대한 공식 문서
- https://developer.android.com/about/versions/14/changes/fgs-types-required — 모든 foreground 서비스 유형에 대한 요구 사항을 자세히 설명합니다.
- https://www.droidcon.com/2023/11/15/a-guide-to-using-foreground-services-and-background-work-in-android-14/ — 앨리스 유안(Alice Yuan)이 Droidcon London 23에서 진행한 훌륭한 강연. 안드로이드에서 백그라운드 작업을 위한 Google의 공식 가이드라인과 모범 사례를 다룹니다.

참고 자료:

- [1] https://www.demandsage.com/android-statistics/
- [2] https://android-developers.googleblog.com/2023/05/improving-consistency-of-background-work-on-android.html
