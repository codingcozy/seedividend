---
title: "Flutter 322와 함께 사용할 수 있는 5가지 추가 패키지(2024년 최신)"
description: ""
coverImage: "/assets/img/2024-05-18-5extrapackagestousewithFlutter322in2024_0.png"
date: 2024-05-18 22:17
ogImage: 
  url: /assets/img/2024-05-18-5extrapackagestousewithFlutter322in2024_0.png
tag: Tech
originalTitle: "5 extra packages to use with Flutter 3.22 in 2024"
link: "https://medium.com/@kanellopoulos.leo/5-extra-packages-to-use-with-flutter-3-22-in-2024-81a0d8afc78b"
isUpdated: true
---



흥미로운 뉴스! 구글 I/O 2024에서 Flutter 3.22이 발표되었고, 물론 이전에 제가 즐겨 사용하는 Flutter 앱 개발용 패키지에 관한 기사를 사랑해주셔서 감사합니다. 많은 앱에서 사용하는 추가 기능 몇 가지를 공유하기로 결정했습니다. 오늘은 코드를 깔끔하고 조직적으로 유지할 뿐만 아니라 훌륭한 앱을 만드는 데 도움이 되는 5가지 Flutter 패키지를 소개하려고 합니다.

- gap

UI에 여백을 추가해야 하는 경우가 많은데, Row나 Column에서 Padding이나 SizedBox를 사용할 수 있습니다. 그러나 이 두 옵션은 제 취향에 조금 번잡스럽습니다. 이런 문제를 해결하기 위해 Gap이 나왔습니다. Gap은 SizedBox처럼 보이지만 보다 깔끔하며 Scrollable 내에서 작동하며 Column이나 Row에서 사용 가능한 MaxGap을 제공합니다.

사용하기도 매우 쉽습니다:

<div class="content-ad"></div>

```js
Column(
  children: [
    Container(color: Colors.red, height: 20),
    const Gap(20), // 20픽셀의 빈 공간 추가
    Container(color: Colors.red, height: 20),
  ],
);
```

이전에 언급했듯이 코드를 깔끔하고 체계적으로 유지하는 걸 좋아합니다. 일반적으로 앱의 스타일에 사용될 Gaps를 모두 포함하는 styles.dart 파일을 만들어 그 안에 Gaps를 추가하곤 합니다. 예:

```js
const kGap0 = Gap(0);
const kGap5 = Gap(5);
const kGap8 = Gap(8);
const kGap10 = Gap(10);
const kGap15 = Gap(15);
const kGap20 = Gap(20);
const kGap25 = Gap(25);
const kGap30 = Gap(30);
const kGap35 = Gap(35);
const kGap40 = Gap(40);
const kGap50 = Gap(50);
const kGap60 = Gap(60);
const kGap100 = Gap(100);
```

이렇게 하면 UI 사양이 변경되면 앱 내의 공간을 빠르게 재정비할 수 있습니다.

<div class="content-ad"></div>

이 패키지를 확인할 수 있어요.

2. Skeletonizer

![](/assets/img/2024-05-18-5extrapackagestousewithFlutter322in2024_0.png)

모두가 딱딱한 로딩 화면을 싫어하거나 더 나쁜 경우에는 아예 없을 때가 있죠. 사용자로서 무슨 일이 일어나고 있는지 전혀 모를 때. 데이터가 로딩 중인가요? 앱이 다운되었나요? 무슨 일이 벌어지고 있는 건가요? 저는 앱에 스켈레톤 로더를 추가하고 사용자 경험을 향상시키기 위해 스켈레터나이저를 사용해요. 스켈레톤 UI는 데이터가 이미 로딩된 것처럼 보이는 간단한 플레이스홀더 UI를 제공해요. 많은 유명한 앱이 이 기술을 사용하고 사용자들이 익숙해졌어요. 또한 앱에 쉽게 추가할 수 있어요.

<div class="content-ad"></div>

![image](https://miro.medium.com/v2/resize:fit:776/0*SxYiRxewtRIFNa4e.gif)

You can check the package [here](link).

\*A simpler but now old alternative named Skeletons can be found here. This is an honorable mention as it was the first I used and still exists in at least 8 of my apps.

3. toastification

<div class="content-ad"></div>

![이미지](/assets/img/2024-05-18-5extrapackagestousewithFlutter322in2024_1.png)

아름다운 UI와 사용자 경험에 대해 이야기할 때, 내가 개인적으로 가장 좋아하는 토스트 알림 패키지를 이 목록에서 빠뜨릴 수 없었어요. 이 사용하기 쉽고 매우 사용자 정의할 수 있는 패키지를 만나기 전까지 제가 사용했던 "토스트 알림" 구현을 사용해 왔어요. 주로 앱에서 무언가 발생한 사실을 사용자에게 알리기 위해 토스트를 사용했었어요. 예를 들면 "게시물이 승인을 기다리고 있습니다" 또는 "앗, 문제가 발생했습니다" 등이 있어요.

해당 패키지는 여기에서 확인할 수 있어요.

4. linkfy_text

<div class="content-ad"></div>

이 패키지는 소형이고 간단하지만 다양한 애플리케이션에서 매우 유용함을 입증했습니다. 이는 URL, 이메일 주소, 해시태그 등과 같은 패턴을 감지하여 일반 텍스트를 클릭 가능한 요소로 변환합니다. 이 패키지를 자주 활용하여 다음과 같은 애플리케이션에서 사용합니다:

- 푸시 알림: 알림 텍스트 내의 링크가 클릭 가능하도록 보장합니다.
- 앱 내 정보 화면: 잠재적인 링크를 상호작용 가능한 요소로 변환하여 사용자 경험을 향상시킵니다.
- 사용자 게시물: 특히 소셜 앱에서 멘션과 해시태그를 상호작용 가능하게 만들어 사용자 참여와 탐색을 용이하게 합니다.

이 패키지를 사용하는 것은 간단합니다. Text() 위젯을 LinkifyText()로 교체하기만 하면 되어, 앱 텍스트 콘텐츠에 쉽게 상호작용성을 추가할 수 있습니다.

이 패키지를 통합하면 최소한의 노력으로 앱의 기능성과 사용자 경험을 향상시킬 수 있습니다.

<div class="content-ad"></div>

여기에서 패키지를 확인할 수 있어요.

5. flutter_native_splash

마지막으로 여러분의 앱에 대한 네이티브 스플래시 화면을 만들어주는 패키지입니다. 다른 방법들이 있을 수 있지만, 패키지를 사용하지 않고 네이티브 방법에 따라 따르는 것도 가능하다는 것 알지만, 뭐라고 말할 수 있을까요, 나는 게을러... 이 패키지는 매우 사용자 정의 가능하며 Android 및 iOS에 필요한 어떤 종류의 스플래시 화면도 만들 수 있습니다. 더불어 앱 초기화가 원활하게 진행되도록 스플래시 화면을 유지할 수도 있습니다.

여기에서 패키지를 확인할 수 있어요.

<div class="content-ad"></div>

저의 이전 게시물 두 번째 부분을 마무리합니다. Flutter 앱을 개발할 때 가장 좋아하고 가장 많이 사용하는 패키지에 대해 이야기했습니다. Flutter 3.22 버전이 나오면서 더 많은 흥미로운 새로운 패키지들이 나올 것으로 기대됩니다. 함께 더 나은 앱을 만들 수 있는 도움이 되리라 믿어요!
