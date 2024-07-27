---
title: "자바스크립트 프레임워크의 인기 모바일 앱 개발용 툴인 React Native의 AdMob 통합에 대해 알아보자"
description: ""
coverImage: "/assets/img/2024-05-12-SeniorReactNativeAdmobIntegration_0.png"
date: 2024-05-12 22:30
ogImage: 
  url: /assets/img/2024-05-12-SeniorReactNativeAdmobIntegration_0.png
tag: Tech
originalTitle: "Senior React Native Admob Integration"
link: "https://medium.com/@tayfunkaya/senior-react-native-admob-integration-fe1588af5767"
---


안녕하세요 여러분,

![이미지](/assets/img/2024-05-12-SeniorReactNativeAdmobIntegration_0.png)

오늘은 리액트 네이티브에서 애드몹 통합을 통해 인앱 광고를 수익화하는 방법에 대해 이야기하겠습니다.

궁금한 점이 있으시면 언제든지 연락주세요.



우선 link에서 계정을 만들고 iOS 및 Android용 두 가지 다른 앱을 생성해야 합니다.

![image](/assets/img/2024-05-12-SeniorReactNativeAdmobIntegration_1.png)

📍 이런 식으로 두 가지 다른 앱을 만들고 추가해야 합니다. 여기서 중요한 점은 귀하의 제품이 스토어에 있는 경우 스토어를 추가하지 않도록 하는 것입니다. 앱을 공유한 후에도 스토어를 추가해야 합니다.

그런 다음 프로젝트에 아래 패키지를 설치해야 합니다.



```js
npm i react-native-google-mobile-ads
```

이 패키지는 매우 건강합니다. 현재 지원은 최신 버전까지 업데이트되어 있습니다.

여기서 중요한 점은 빌드 버전을 따라야 한다는 것입니다. ios 및 안드로이드 플랫폼에서 광고를 오류없이 사용하고 싶다면 버전 12.6.0을 사용하는 것을 권장드립니다.

적절히 패키지를 설치한 후 pod install을 실행한 상태에서 android와 ios 모두 다음 단계를 수행해야 합니다.



📌 app.json에 생성한 앱 ID를 추가하세요. 완전히 입력하는 것이 중요합니다.

```js
{
  ...
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
    "ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx"
  }
}
```

이 작업을 올바르게 수행했다면, 이제 사용할 수 있습니다.

# 배너 광고



```js
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
```

```js
<GAMBannerAd
    unitId={TestIds.BANNER}
    sizes={[BannerAdSize.FULL_BANNER]}
    requestOptions={
      requestNonPersonalizedAdsOnly: true,
    }
/>
```

여기서 페이지 하단이나 상단에 배너 광고가 주목을 끕니다. 이 광고는 고정되어 있으며, 페이지에서 사용하는 상태 및 조건에 따라 표시하거나 숨길 수 있습니다.

<img src="/assets/img/2024-05-12-SeniorReactNativeAdmobIntegration_2.png" />



위와 같은 예제를 볼 수 있습니다. 다양한 옵션을 사용하여 내용을 정리할 수 있습니다.

# 인터스티셜 광고

```js
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
```

```js
const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});
```



📔 여기서는 우리가 만든 요청에 키워드를 사용하여 보여줄 광고 콘텐츠 단어를 선택하고 집중할 수 있어요.

이 유형의 광고는 사용자가 특정한 앱의 핵심 목표를 달성하고 특정 동작을 취한 경우에 보여줄 수 있는 광고입니다. 예를 들어 다운로드 버튼, 공유 버튼, 특정 시간 동안 앱에 머무르는 사용자 등을 포함해요.

💎 여기서 중요한 점은 이거에요. 페이지가 열릴 때 생성된 요청을 가능한 빨리 로드하는 것이 필요합니다. 원격 광고 콘텐츠를 설정하고 필요한 곳에 보여주는 것이 건강에 좋을 거예요.

```js
useEffect(() => {
    let interValId: NodeJS.Timeout;
    interValId = setInterval(() => {
      if (interstitial) {
        interstitial.addAdEventListener(AdEventType.LOADED, () => {
          interstitial.show();
          if (interValId) {
            clearInterval(interValId);
          }
        });
        interstitial.load();
      }
    }, 500);
 }, []);
```



💡 광고가 언제 업로드되고 도착할지 보장할 수 없어요. 로드 과정이 중단될 수도 있고 제어하기 어려워질 수 있어요. 그래서 주기적으로 광고를 로드하고 정리하는 것이 중요해요. 이것이 중요한 관행이에요.

이것은 제가 작성한 제 코드로 완전히 자유롭습니다. 훅을 사용하여도 제어할 수 있어요. 광고를 위한 훅들에 대해 다음 기사에서 공유할 거에요.

![광고 이미지](/assets/img/2024-05-12-SeniorReactNativeAdmobIntegration_3.png)

위와 같은 예시를 보실 수 있어요. 다양한 옵션으로 구성할 수 있어요.



# 앱 오픈 광고

```js
import { AppOpenAd, TestIds } from 'react-native-google-mobile-ads';
```

```js
const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['패션', '의류'],
});
```

📔 여기에서는 광고 콘텐츠에 표시하고 초점을 맞출 원하는 키워드를 요청에서 생성한 키워드와 함께 지정할 수 있습니다.



앱을 열자마자 보여줄 수있는 광고입니다. 이름에서 알 수 있듯이, 이 광고를 자주 사용하는 것은 권장하지 않습니다.

```js
useEffect(() => {
    appOpenAd?.load();
    setTimeout(() => {
        if (appOpenAd) {
            appOpenAd?.show();
        }
    }, 1000);
}, []);
```

app.tsx에서 코드를 관리하는 것이 좋습니다. 또한 다른 후크를 통해 관리할 수도 있습니다. 페이지가 로드될 때 광고가 로드되고 설정한 시간이 지난 후에 페이지에 표시됩니다.

![이미지](/assets/img/2024-05-12-SeniorReactNativeAdmobIntegration_4.png)



위와 같이 예제를 확인할 수 있습니다. 다양한 옵션으로 조직화할 수 있어요.

# 보상형/비디오 광고

```js
import { RewardedAd, GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
```

```js
const rewarded = RewardedAd.createForAdRequest(TestIds.GAM_REWARDED, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['패션', '의류'],
});
```



📔 여기서는 우리가 생성한 요청의 키워드를 사용자가 원하는 광고 콘텐츠 단어로 장착할 수 있어요. 이를 강조하고 보여줄 수 있도록 해보세요.

이 유형의 광고는 여러분에게 가장 많은 수익을 창출해 줄 종류의 광고에요. 이 광고들은 추가 혜택으로 표시되어야 해요. 예를 들어, 광고를 시청함으로써 더 많은 코인을 얻을 수 있다고 생각할 수 있어요.

💊 너무 자주 보여주면 고객을 잃을 수도 있을 거에요.

```js
useEffect(() => {
  rewarded.load()
}, []);
```



컴포넌트가 로드될 때, 로드 작업을 수행합니다.

```js
<Button
   onPress={()=> rewarded.show()}
   title="보상형 광고 보기"
/>
```

여기에서는 광고가 로드된 시점과 페이지가 실제로 광고를로드 한 것이 있음을 공식적으로 확인할 수 없을 수 있습니다. 이를 해결하기 위해 아래 함수를 사용하여 작업을 보장하거나 모든 광고 작업을 단일 훅에서 추적할 수 있습니다.

```js
const showAds = () => {
    let interValId: NodeJS.Timeout;
    interValId = setInterval(() => {
      if (rewarded) {
        rewarded.addAdEventListener(AdEventType.LOADED, () => {
          rewarded.show();
          if (interValId) {
            clearInterval(interValId);
          }
        });
        rewarded.load();
      }
    }, 500);
};
```



여기에서 로드를 필수로 만들었고 광고는 완전히 표시되었습니다.

![예시 이미지](/assets/img/2024-05-12-SeniorReactNativeAdmobIntegration_5.png)

위의 예시처럼 보실 수 있습니다. 다양한 옵션으로 조직화할 수 있습니다.

여기에서 제안하는 제어 구조와 데모는 시니어 레벨의 사례입니다. 따라서 리액트 네이티브 애플리케이션에서 google 광고로 수익을 창출할 수 있습니다. 통합을 완전히 숨기면 수익이 증가할 것입니다. 사용자 정의 키워드를 사용하는 것이 중요합니다.



감사합니다. 언제든 연락 주세요. 공유하기를 잊지 마세요 🤗

다음 글에서 뵙겠습니다. 안녕 👋

## Linkedin

## Github