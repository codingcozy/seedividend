---
title: "react-native-inappbrowser-reborn으로 React Native에서 매끄러운 웹 브라우징 구현 방법"
description: ""
coverImage: "/assets/img/2024-08-17-UnlockingSeamlessWebBrowsinginReactNativewithreact-native-inappbrowser-reborn_0.png"
date: 2024-08-17 01:39
ogImage:
  url: /assets/img/2024-08-17-UnlockingSeamlessWebBrowsinginReactNativewithreact-native-inappbrowser-reborn_0.png
tag: Tech
originalTitle: "Unlocking Seamless Web Browsing in React Native with react-native-inappbrowser-reborn"
link: "https://medium.com/stackademic/unlocking-seamless-web-browsing-in-react-native-with-react-native-inappbrowser-reborn-7ea8c4381a49"
isUpdated: true
updatedAt: 1723864300132
---

사용자가 React Native 앱 내에서 링크를 클릭할 때마다 외부 웹 브라우저로 리디렉션되는 것에 지쳤나요? react-native-inappbrowser-reborn과 함께 이러한 괴로움을 이제 고백해보세요!

이 기사에서는 react-native-inappbrowser-reborn을 사용하여 사용자에게 매끄러운 인앱 브라우징 경험을 제공하는 실용적 측면에 대해 탐구할 것입니다.

이 게시물의 끝에는 React Native 앱에서 react-native-inappbrowser-reborn을 통합하는 것을 보여주는 실용적인 데모를 제공할 것입니다. 더욱 흥미로운 점은 이 데모의 코드가 실제 프로젝트에서 즉시 사용할 수 있으며, 단순히 복사하여 붙여넣기만 하면 됩니다!

![이미지](/assets/img/2024-08-17-UnlockingSeamlessWebBrowsinginReactNativewithreact-native-inappbrowser-reborn_0.png)

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

## 소개

react-native-inappbrowser-reborn은 React Native 앱 인터페이스 내에서 외부 URL을 열 수 있게 해주는 강력한 라이브러리입니다. 이를 통해 사용자들의 경험을 방해하지 않고 계속해서 앱 안에서 유지하면서 사용자들을 유지할 수 있습니다. 인증 흐름, 결제 게이트웨이를 구현하거나, 단순히 앱 내에서 공유된 외부 링크를 열 때도 react-native-inappbrowser-reborn이 모두 해결해줍니다.

## 시작하기

react-native-inappbrowser-reborn을 시작하는 것은 아주 쉽습니다. 먼저, React Native 프로젝트에 라이브러리를 설치하세요:

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
npm install react-native-inappbrowser-reborn
```

다음으로, 라이브러리를 네이티브 iOS 프로젝트에 연결하세요:

```js
cd ios && pod install && cd .. # iOS의 CocoaPods는 이 추가 단계가 필요합니다
```

## 앱 내 브라우저에서 URL 열기

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

가장 흥미로운 부분으로 들어가 봅시다 — react-native-inappbrowser-reborn을 사용하여 앱 내에서 외부 URL을 열기! 아래는 in-app 브라우저에서 URL을 열기 위한 간단한 예제입니다:

```js
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";

const ExternalLinkButton = ({ url }) => {
  const handleOpenLink = async () => {
    try {
      await InAppBrowser.open(url);
    } catch (error) {
      console.error("링크 열기 실패:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleOpenLink}>
      <Text>링크 열기</Text>
    </TouchableOpacity>
  );
};

export default ExternalLinkButton;
```

## 사용자 정의 옵션

react-native-inappbrowser-reborn은 앱의 요구에 따라 in-app 브라우징 경험을 맞춤화할 수 있는 다양한 사용자 정의 옵션을 제공합니다. 예를 들어 추가 옵션을 지정할 수 있습니다:

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

- 브라우저의 제목을 표시/숨김합니다.
- 네비게이션 컨트롤을 활성화/비활성화합니다.
- 브라우저의 표현 스타일을 사용자 정의합니다.

모든 가능한 옵션과 사용법에 대한 자세한 내용은 라이브러리 설명서를 참조하세요.

## 데모: 약속 및 메시지 패널

약속과 메시지를 관리하는 모바일 애플리케이션을 개발 중이라고 상상해보세요. 사용자가 애플리케이션 인터페이스를 벗어나지 않고 메시징 플랫폼에서 메시지와 같은 외부 콘텐츠에 신속하게 액세스할 수 있도록 제공하고 싶습니다. react-native-inappbrowser-reborn을 사용하여 이를 어떻게 구현할 수 있는지 살펴보겠습니다.

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

![Image](https://miro.medium.com/v2/resize:fit:616/1*8rq4m8hcfPQaf0rRftTtYQ.gif)

```js
const handleContinueToMsgPortal = async (url) => {
  try {
    const isAvailable = await InAppBrowser.isAvailable();
    InAppBrowser.close();

    if (isAvailable) {
      return await InAppBrowser.open(url, {
        // iOS Properties
        modalPresentationStyle: "formSheet",
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: false,
        enableUrlBarHiding: false,
        enableDefaultShare: false,
        showInRecents: true,
      });
    }

    return await Linking.openURL(url);
  } catch (e) {
    Alert.alert(e.toString());
  }
};
```

이 코드 스니펫은 handleContinueToMsgPortal 함수를 정의하며 React Native 앱 내에서 사용자를 외부 메시징 플랫폼으로 리디렉션하는 역할을 담당합니다.

여기에는 다음 기능에 대한 세부 내용이 포함되어 있습니다:

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

- Async Function: handleContinueToMsgPortal은 URL을 매개변수로 사용하는 비동기 함수입니다. 이 함수는 앱 내 브라우저의 가용성을 확인하고 지정된 URL을 열기 위한 비동기 작업을 처리하는 것이 목적입니다.
- 앱 내 브라우저 가용성 확인: 해당 함수는 InAppBrowser.isAvailable()을 사용하여 앱 내 브라우저의 가용성을 확인하는 것으로 시작합니다. 이 메서드는 현재 플랫폼에서 앱 내 브라우저를 사용할 수 있는지 여부를 나타내는 부울값을 반환합니다.
- 기존 브라우저 인스턴스 닫기: 앱 내 브라우저가 사용 가능한 경우 함수는 InAppBrowser.close()를 사용하여 기존의 모든 브라우저 인스턴스를 닫습니다. 이를 통해 이전의 브라우저 세션이 새로 열리기 전에 종료됩니다.
- URL 열기: 앱 내 브라우저가 사용 가능한 경우 함수는 InAppBrowser.open()를 사용하여 지정된 URL을 열려고 시도합니다. iOS에서는 모달 프레젠테이션 스타일 설정 및 Android에서는 다양한 속성 설정과 같이 브라우저 동작을 사용자 정의하는 추가 옵션을 제공합니다.
- 링킹으로 대체: 앱 내 브라우저가 사용 불가능하거나 오프닝 프로세스 중에 오류가 발생한 경우, 함수는 Linking.openURL()을 사용하여 기기의 기본 외부 브라우저에서 URL을 열도록 대체합니다.
- 오류 처리: 함수에는 프로세스 중에 발생할 수 있는 모든 오류를 처리하기 위한 try-catch 블록이 포함되어 있습니다. 오류가 발생하는 경우 Alert.alert()를 사용하여 오류 메시지를 표시합니다.

![Image](https://miro.medium.com/v2/resize:fit:592/1*hjYVhtRAnkrQilqqDytROQ.gif)

iOS 및 Android 간 동작 차이를 알 수 있습니다: iOS에서는 기본 브라우저를 활용하여 URL을 모달로 열지만, Android는 Chrome의 사용자 지정 탭에서 URL을 열어 전체 공간을 차지합니다.

그러나 문제가 발생할 경우 오류를 처리하는 것을 잊지 말아주세요.

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

<img src="https://miro.medium.com/v2/resize:fit:616/1*7yw_Hq1x1l5nCojM7YBNaA.gif" />

## 결론

react-native-inappbrowser-reborn을 사용하면 React Native 앱의 사용자 경험을 향상시킬 수 있습니다. 앱 내 브라우징 기능을 원활하게 통합하여 외부 링크 열기부터 인증 흐름 처리까지 다양한 가능성이 있습니다. 외부 브라우저로의 갑작스러운 리디렉션을 작별하고 사용자에게 일관된 앱 경험을 제공하세요.

소스 코드는 Github에서 확인할 수 있습니다. 즐거운 코딩하세요! ☀️

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

# 스택데믹 🎓

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가를 클립하고 팔로우해 주시면 감사하겠습니다! 👏
- 팔로우해 주세요 X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Venture | Cubed
- 스택데믹닷컴에서 더 많은 콘텐츠 확인하기
