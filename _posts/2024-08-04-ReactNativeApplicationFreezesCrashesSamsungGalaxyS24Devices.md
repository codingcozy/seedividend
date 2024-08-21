---
title: "삼성 갤럭시 S24 기기에서 React Native 애플리케이션 멈춤 및 크래시 문제 해결 방법"
description: ""
coverImage: "/assets/img/2024-08-04-ReactNativeApplicationFreezesCrashesSamsungGalaxyS24Devices_0.png"
date: 2024-08-04 19:33
ogImage:
  url: /assets/img/2024-08-04-ReactNativeApplicationFreezesCrashesSamsungGalaxyS24Devices_0.png
tag: Tech
originalTitle: "React Native Application Freezes Crashes Samsung Galaxy S24 Devices"
link: "https://medium.com/@enginergen/react-native-application-freezes-crashes-samsung-galaxy-s24-devices-7620ad42aa16"
isUpdated: true
---

# 문제는 무엇인가요?

요즘 많은 개발자들이 한 문제에 대해 이야기하고 있어요. 삼성 갤럭시 S24(플러스, 울트라)에서 앱이 전혀 작동하지 않는다는 것이죠. 앱이 시작 화면에서 멈추고 아무 일도 일어나지 않아요. 이 문제는 디버그 모드에서는 나타나지 않고 Google Play 출시 이후에만 발생해요. 사용자들이 Google Play에서 앱을 설치한 뒤 이 문제를 마주하게 되는 거죠. 안타깝게도, 그들은 앱을 사용할 수 없게 됩니다.

![이미지](/assets/img/2024-08-04-ReactNativeApplicationFreezesCrashesSamsungGalaxyS24Devices_0.png)

이 문제에 대해 조사해봤어요. 심지어 안드로이드 스튜디오 네이티브 앱에서도 시도해봤지만 문제를 발견하지 못했어요. 이 문제는 React Native에서만 발생하며, 저도 React Native에서 이 문제를 겪었습니다.

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

이 블로그에서는 이 문제를 주제로 삼을 것입니다.

## 이유

먼저, 삼성 갤럭시 S24 장치에서만 발생하는 이유를 이해해야 합니다. 실제로 우리는 이 문제가 어떤 종류의 장치에서 발생하는지 모릅니다. 다른 장치들도 이 문제를 겪을 수도 있지만, 삼성 갤럭시 24를 위한 해결책을 만든다면 다른 장치들에 대해서도 문제를 해결할 수 있을 것으로 생각합니다.

![이미지](/assets/img/2024-08-04-ReactNativeApplicationFreezesCrashesSamsungGalaxyS24Devices_1.png)

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

에뮬레이터들 중 많은 것들이 32비트 코드를 지원하지만, 삼성 갤럭시 S24는 64비트 기기로 더 이상 32비트를 지원하지 않습니다.

첫 번째 이유는 이것일 수 있습니다: React Native 어플리케이션에 32비트 코드가 포함되어 있어, 64비트를 지원하는 기기에서만 문제가 발생합니다.

문의하실 수도 있는데, 어플리케이션은 디버그 모드와 릴리즈 모드에서 서로 다른 역할과 설정을 갖습니다. 이러한 설정 때문에 디버그 모드에서는 정상 작동하는 것처럼 보일 수 있습니다. 하지만 이는 오도되어서는 안 됩니다.

에러의 두 번째 이유는 React Native와 의존하는 다른 라이브러리들 간의 버전 호환성 문제일 수 있습니다. 이러한 문제를 식별하고 사용 중인 라이브러리의 버전을 확인하는 것이 중요합니다.

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

새로운 모델 디바이스가 시장에 출시되면 놀라운 변화가 따라옵니다. 이 상황에서는 개발자들이 모든 상황에 대비할 수 있도록 준비되어야 합니다.

# 솔루션

이제 해결책을 찾아보는 시간입니다.

다음 버전에 대해 이 솔루션이 작동합니다.

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
"react": "16.9.0",
"react-native": "0.61.5".
```

저희 첫 번째 해결 방법으로 아래 나열된 공식 소스를 참고하겠습니다.

Support 64-bit architectures | Android Developers

자세한 정보를 얻고 싶은 분들은 위 소스를 읽어보세요.

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

첫 번째 해결책

우선, SoLoader 라이브러리에 대해 알아야 합니다. SoLoader는 페이스북에서 개발한 Android 라이브러리입니다. 이 라이브러리의 역할은 응용 프로그램에 라이브러리를 로드하고 그들의 동적 가용성을 보장하는 것입니다.

오류의 주요 원인은 이 라이브러리일 수 있습니다. 위에서 제공한 공식 소스의 기사가 이를 확인하는 것으로 보입니다.

우리에게 일어나고 있는 일이 정확히 이것입니다. 우리 응용 프로그램은 64비트 문제로 시작 시 멈추고 진행되지 않습니다.

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

내 예상은 많은 기기에서 스플래시 화면에서 응용 프로그램이 충돌하고 멈추는 주요 이유일 것입니다. 다음 해결책을 적용하면 이 문제에 직면하지 않을 것이라고 믿습니다.

참고: 응용 프로그램은 항상 디버그 모드에서 작동하므로 Google Play에서 테스트해야 합니다.

사실, 이 문제의 해결책은 바로 이 답변 바로 위에 제공되어 있습니다.

설명한 대로, 제공된 해결책을 적용하고 SoLoader 버전을 v0.10.4로 업그레이드할 것입니다.

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

아래에 있는 코드 라인을 찾아보세요.

```js
ext {
  buildToolsVersion = "xxx"
  minSdkVersion = xx
  compileSdkVersion = xx
  targetSdkVersion = xx
}
```

이 객체에 `soLoaderVersion = "0.10.4+"` 라인을 추가하세요. 최종 버전은 다음과 같아야 합니다:

```js
ext {
  buildToolsVersion = "xxx" // 이 부분은 변경하지 마세요. 필요하다면 수정하세요.
  minSdkVersion = xx // 이 부분은 변경하지 마세요. 필요하다면 수정하세요.
  compileSdkVersion = xx // 이 부분은 변경하지 마세요. 필요하다면 수정하세요.
  targetSdkVersion = xx // 이 부분은 변경하지 마세요. 필요하다면 수정하세요.
  soLoaderVersion = "0.10.4+"
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

이제 우리가 추가한 매개변수를 사용할 차례입니다. 이를 위해 다음과 같이 앱 레벨의 build.gradle 파일을 열어주세요.

이 파일에서 dependencies 섹션을 찾아주세요. 적절한 위치에 다음 줄을 새로운 implementation으로 추가해주세요.

```js
implementation "com.facebook.soloader:soloader:$soLoaderVersion"
```

추가한 후, 애플리케이션을 다시 빌드할 수 있습니다. 빌드 과정에서 문제가 발생하면 (저는 어떤 문제도 겪지 않았습니다), 그 문제를 해결하려고 노력해보세요.

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

성공적인 빌드 후에 SoLoader 업그레이드에 문제가 없었다는 것을 의미합니다.

해결책을 테스트하기 위해 앱을 Google Play에 다시 등록하세요. 출시가 승인되면 Samsung Galaxy S24 기기에서 테스트해보세요. 어플리케이션이 성공적으로 작동할 것으로 예상됩니다.

두 번째 해결책

첫 번째 해결책이 작동하지 않았다면, 유일하게 해야 할 일은 React Native 버전을 호환 가능한 버전이나 최신 버전으로 업그레이드 하는 것뿐입니다. 그러나 이러한 업그레이드가 새로운 문제를 발생시킬 수 있으니 주의해서 진행해야 합니다.

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

업그레이드 과정 중 문제가 발생하지 않았다면, 다시 애플리케이션을 테스트할 수 있습니다. 업그레이드가 현재 애플리케이션 구성에 어떤 영향을 미칠지에 대한 세부 정보는 제공할 수 없지만, 문제를 해결할 수도 있습니다.

이 해결책은 100% 성공을 보장하지는 않고 시간이 소요될 수 있습니다. 따라서 우선적으로 첫 번째 해결책을 시도해 보는 것이 좋습니다. 저는 첫 번째 해결책을 적용했고 성공적인 결과를 얻었습니다.

# 결론

위에서 설명한 단계를 따르면 이 문제를 대부분 해결할 수 있을 것으로 생각합니다.

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

새로운 장치들은 서로 다른 구성을 가지고 있기 때문에 우리 애플리케이션에서 문제를 일으키기 마련입니다.

문제를 방지하기 위해서는 React Native 및 그 종속 라이브러리를 정기적으로 확인하는 것이 필요합니다. 이 과정에서는 테스트 장치를 사용하고 최신 모델 장치의 응답을 측정하기 위해 로그 파일을 주의 깊게 조사해야 합니다.

이러한 맥락에서 Google Play에서 제공하는 ANR (Application Not Responding) 레코드도 확인하여 잠재적인 충돌을 확인해야 합니다.

유지보수는 소프트웨어에 있어 매우 중요한 단계입니다. 체계적으로 수행되면 오랜 기간에 걸친 많은 문제를 사전에 식별하고 해결할 수 있도록 도와줍니다.

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

만약 텍스트에 대한 의견이 있으시면 언제든지 공유해주세요. 제가 잘못된 설명을 했다면 지적해주시면 정확한 정보를 제공하는 데 도움이 될 것입니다.

읽어 주셔서 감사합니다.
