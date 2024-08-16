---
title: "iOS 앱을 위한 맞춤형 푸시 알림 레이아웃 만들기 방법"
description: ""
coverImage: "/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_0.png"
date: 2024-07-01 17:06
ogImage: 
  url: /assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_0.png
tag: Tech
originalTitle: "Build a custom Push Notification layout for iOS Apps"
link: "https://medium.com/kinandcartacreated/build-a-custom-push-notification-layout-for-ios-apps-fade83927c51"
isUpdated: true
---




## 푸시 알림을위한 사용자 정의 레이아웃을 만드는 방법에 대한 빠르고 쉬운 안내서입니다. NotificationExtendedContent를 사용하세요.

![Push Notification Layout](/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_0.png)

## 소개

푸시 알림은 매우 유용합니다. 우리 모두가 알고 있고, 2009년에 출시된 이후로 이 기능을 광범위하게 사용해 왔습니다.
몇 년 동안 알림은 여러 가지 방법으로 개선되어 왔으며, 이제는 푸시 알림 레이아웃의 더 풍부한 버전을 구현할 수 있습니다. 이를 위해 Notification Content Extension을 사용할 것입니다.
이 유형의 알림은 사용자 지정 레이아웃을 즉시 표시하지 않으며, 사용자가 알림을 길게 누르면 새 레이아웃이 표시됩니다.

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:640/1*ZbjLnYTAZtthoD0Y2FzxuA.gif" />

이 기사에서는 GitHub에서 샘플 프로젝트를 찾을 수 있는 작은 저장소를 만들었습니다.

## 시작하는 방법

알림에 대해 이야기하고 있기 때문에 먼저 프로젝트에 필요한 기능을 추가해야 합니다. 프로젝트의 주요 대상의 Signing & Capabilities 탭으로 이동하여 Push Notifications 기능을 추가하세요.

<div class="content-ad"></div>


![이미지1](/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_1.png)

유저에게 푸시 알림을 보여주기 위해 권한을 요청해야 합니다. 이를 프로젝트의 App 파일에서 처리할 수 있습니다.

프로젝트에 푸시 알림 컨텐츠 익스텐션을 위한 필요한 파일들을 추가해야 합니다. 이를 위해 올바른 타겟을 추가해야 하니, File - New - Target을 선택해주세요.

![이미지2](/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_2.png)


<div class="content-ad"></div>

여기서 Notification Content Extension을 검색하고 새 대상에 이름을 적어주세요.

작업을 마치면 새 스키마를 Xcode에서 제안하는 대로 활성화시키기만 하면 됩니다. 
이제 프로젝트에서 우리가 반짝이는 새 알림을 만들기 위해 필요한 모든 파일이 포함된 새 대상을 볼 수 있어야 합니다.

![이미지](/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_3.png)

각 파일이 어떤 역할을 하는지 이해하기 쉽지만 꼼꼼하게 살펴봅시다:

<div class="content-ad"></div>

**알림 뷰 컨트롤러**

이 클래스는 알림 레이아웃의 로직과 이행을 책임지는 단순하고 명확한 역할을 합니다.
뷰 컨트롤러는 didReceive(_ notification:) 함수에서 현재 수신한 푸시 알림(그리고 그 안의 페이로드)을 가져와 데이터를 우리가 필요한 대로 사용할 것입니다.

**주요 인터페이스**

<img src="/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_4.png" />

<div class="content-ad"></div>

여기에서는 새로운 유형의 알림이 표시될 레이아웃을 찾을 수 있습니다. 이것은 UIKit 스토리보드이며 여기에 설정할 제약 조건에 대해 매우 주의해야 합니다. 왜냐하면 무언가 잘못되면 알림이 완전히 비어 보일 수 있습니다.

INFO.PLIST

![image](/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_5.png)

이것은 우리의 NotificationContentExtension의 유용한 속성을 추가할 수 있는 클래식한 Info.plist입니다. 생성될 때 기본값이 이미 포함되어 있으며 각각은 특정한 용도가 있습니다.

<div class="content-ad"></div>

- NSExtensionMainStoryboard: 레이아웃에 사용되는 스토리보드 이름만 정의하는 것이에요. 우리 경우에는 MainInterface입니다.
- NSExtensionPointIdentifier: Apple stuff은 우리에겐 유용하지 않아요.
- UNNotificationExtensionCategory: 이는 우리의 알림 콘텐츠 익스텐션의 사용자 정의 식별자로, 이 알림 레이아웃을 일반적인 것 대신에 언제 보여줄지 앱이 이해할 수 있게 하는 목적이에요. 푸시 알림 페이로드를 빌드할 때 백엔드 서비스에서 사용해야 해요.
- UNNotificationExtensionInitialContentSizeRatio: 이는 기기에 초기에 표시될 때 사용자 정의 알림 인터페이스의 가로 세로 비율 소수값이에요. 값이 1이면 높이와 너비가 동일하고, 0.5이면 높이가 너비의 반 정도 됩니다. "초기에 표시될 때" 라고 써 놓은 이유는 사용자 지정 알림 레이아웃이 표시된 후에는 제약에 따라 자동으로 크기가 조정될 것이기 때문이에요. 이것을 컨텐츠에 따라 실제로 완전히 로드되고 표시되기 전에 보고 있는 알림의 가로 세로 비율로 생각해보세요. 
(참고: 시뮬레이터에서는 이를 알아차리지 못할 것입니다. 적어도 제가 테스트를 진행한 동안에는, 기기에서만 차이를 볼 수 있었어요)

기본 키-값 쌍 외에도 몇 가지 더 추가할 수 있는 다른 것들이 있어요. 그러니 함께 해봅시다:

![customPushNotificationLayout](/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_6.png)

- UNNotificationExtensionUserInteractionEnabled: 이는 실제로 알림 UI 요소가 사용자와 상호작용할 수 있는지 여부를 정의하는 쌍이에요. 
  - 값이 NO인 경우, 푸시 알림의 어느 부분을 눌러도 앱이 열리고 푸시 알림을 누를 때 사용되는 기본 델리게이트 메소드가 호출될 뿐이에요.
  - 값이 YES인 경우, 사용자는 UI 요소(예: 버튼)와 상호작용할 수 있지만, 앱을 열 수 있는 방법은 없습니다. 심지어 상호작용이 없는 UI 요소를 누르는 것도 앱을 열 수 없어요.
- UNNotificationExtensionUserContentHidden: 이는 표준 푸시 알림 UI를 사용자 정의 레이아웃 위에 표시할지 여부를 정의하는 데 사용되어요. ​​예시에서 보이는 것처럼요.

<div class="content-ad"></div>

레이아웃은 숨겨지지 않은 콘텐츠의 경우, 잘 표시되도록 몇 가지 조정이 필요할 수 있음을 유의해야 합니다.

## 알림 페이로드

푸시 알림의 페이로드에는 내부에 "category" 요소를 가져야 하며, 이를 "aps" 필드 내부에 배치해야 합니다. 여기서는 콘텐츠 익스텐션 대상 Info.plist에 설정한 UNNotificationExtensionCategory 값을 명시해야 합니다.

```js
{
  "aps": {
      "category": "customNotificationIdentifier",
      "alert" : {
            "title" : "EXTENDED NOTIFICATION",
            "subtitle" : "Subtitle of the push payload",
            "body" : "This is the text inside the body of the payload. This is displayed below the subtitle and above the footer."
      },
      "footer": "Footnote inside the push payload",
      "firstButton": "Main Button",
      "secondButton": "Secondary Button",
      "imageUrl": "https://raw.githubusercontent.com/MarkWarriors/MGExtendedNotifications/main/mount_fuji.jpg"
  }
}
```

<div class="content-ad"></div>

남은 페이로드는 당연히 당신의 요구에 맞게 사용자 정의할 수 있습니다. 이 경우에는 우리의 사용자 정의 레이아웃에서 무엇을 할 수 있는지 보여주기 위해 다양한 사용자 정의 필드를 추가했습니다.

## 알림 레이아웃 만들기

이제 실제로 푸시 알림 사용자 정의 레이아웃을 만드는 시간입니다. 이 예제에서는 레이블, 버튼 및 이미지 뷰를 추가했습니다.

![이미지](/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_7.png)

<div class="content-ad"></div>

NotificationViewController에서는 당연히 UI 요소의 모든 참조를 만들고 버튼용 탭 제스처 인식기를 구현했어요.

이제 푸시 알림 페이로드에서 다양한 정보를 올바른 UI 요소에 바인딩합시다.

didReceive(_ notification:)에서 모든 매개변수를 매핑했음을 볼 수 있어요. 푸시 알림의 기본 속성(제목, 부제목, 본문)은 notification.request.content 개체에서 가져오며, 페이로드의 모든 사용자 정의 매개변수는 notification.request.content.userInfo["aps"] 사전에 포함되어 있습니다. 페이로드 구조를 반영하고 있어요.

imageView의 경우 loadImage(withUrl:)이라는 사용자 정의 함수를 사용하는 것을 볼 수 있고, 이미지를 URL에서로드할 것이에요. 이를 위해 UIImageView 확장에 이 메서드를 추가했어요.

<div class="content-ad"></div>

그럼요, 페이로드를 UI에 매핑했어요. 이제 결과를 확인해볼 시간입니다.

## 알림 테스트

이제 모든 설정이 완료되었으니, 알림을 테스트하기만 하면 됩니다. 가장 좋은 방법은 시뮬레이터와 Mac 터미널을 사용하는 것입니다. 먼저, 푸시 알림을 위한 올바른 JSON 페이로드를 만들어 파일로 저장하세요. 위에서 사용한 것과 같은 형식입니다:

```js
{
  "aps": {
      "category": "customNotificationIdentifier",
      "alert" : {
            "title" : "EXTENDED NOTIFICATION",
            "subtitle" : "푸시 페이로드의 부제목",
            "body" : "페이로드의 본문 안의 텍스트입니다. 이는 부제목 아래에 표시되며 푸터 위에 표시됩니다."
      },
      "footer": "푸시 페이로드 내 푸터",
      "firstButton": "주 버튼",
      "secondButton": "보조 버튼",
      "imageUrl": "https://raw.githubusercontent.com/MarkWarriors/MGExtendedNotifications/main/mount_fuji.jpg"
  }
}
```

<div class="content-ad"></div>

터미널을 열어서 다음 명령어를 입력해주세요


push booted $'YOUR_APP_BUNDLE_IDENTIFIER' $'PATH_TO_YOUR_PAYLOAD_FILE'


예를 들어,


push booted com.medium.myProject /Users/MyProject/payload.json


<div class="content-ad"></div>

만약 제대로 작업을 했다면, 시뮬레이터에서 알림이 나타날 것입니다

![Notification](/assets/img/2024-07-01-BuildacustomPushNotificationlayoutforiOSApps_8.png)

그리고 알림을 길게 누르면 확장되어 사용자 정의 레이아웃이 표시됩니다

![Custom Layout](https://miro.medium.com/v2/resize:fit:640/1*Du9uBOmOM_YAN1MVaORlRw.gif)

<div class="content-ad"></div>

이제 제가 언급한 대로 작업을 했고 Info.plist 파일에서 키-값 속성 UNNotificationExtensionUserInteractionEnabled을 YES로 설정했다면, 알림 내부의 버튼과 상호 작용할 수 있어야 합니다. 그러나 다른 곳을 탭하여 앱을 열 수 있는 방법이 없다는 것을 알 수 있을 거예요.

![image](https://miro.medium.com/v2/resize:fit:640/1*yQlzTlTu7LyR4NuBsGvNyA.gif)

물론 값이 NO로 설정된 경우, 알림의 모든 부분을 탭하면 기대한 대로 앱이 열릴 것입니다.

![image](https://miro.medium.com/v2/resize:fit:640/1*qZXP5DIua2MrnzERDOtENA.gif)

<div class="content-ad"></div>

이제 우리는 푸시 알림을 위한 사용자 정의 레이아웃을 만들었어요.