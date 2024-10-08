---
title: "HCI 제1부 상호 작용을 형성하는 과소평가된 감각 - 촉각"
description: ""
coverImage: "/assets/img/2024-05-27-HCIPart1TheUnderratedSenseShapingOurInteractionsTouch_0.png"
date: 2024-05-27 19:22
ogImage:
  url: /assets/img/2024-05-27-HCIPart1TheUnderratedSenseShapingOurInteractionsTouch_0.png
tag: Tech
originalTitle: "HCI Part 1: The Underrated Sense Shaping Our Interactions — Touch"
link: "https://medium.com/heyjobs-tech/hci-part-1-the-underrated-sense-shaping-our-interactions-touch-ce97a8773a67"
isUpdated: true
---

인간-컴퓨터 상호작용 시리즈 첫 번째 기사에 오신 것을 환영합니다. 우리는 주변 세계와 상호작용하는 데 주로 시각과 청각을 생각합니다. 그러나 종종 간과되는 촉각은 우리의 일상생활과 기술과의 인터페이스 방법에서 중요한 역할을 합니다.

![touch image](/assets/img/2024-05-27-HCIPart1TheUnderratedSenseShapingOurInteractionsTouch_0.png)

촉각은 단지 물체의 질감을 느끼는 것 이상입니다. 피부 표면(온도, 압력)의 감각과 자기 지각, 우리 몸이 공간에서의 위치와 움직임을 인식하는 것이 결합된 것입니다. 이 복잡한 감각은 컵을 집거나 가상 현실 세계를 탐험하는 것처럼 단순한 행동부터 복잡한 행동까지 수행할 수 있게 합니다.

# 사용자 인터페이스에서의 촉각의 힘

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

UI(사용자 인터페이스)의 영역에서 터치는 중요한 역할을 합니다. 스마트폰 화면 위에서 손가락이 부드럽게 움직이는 것부터 물리적 버튼을 눌렀을 때의 쾌적한 감쇠 소리까지, 터치 상호작용은 사용성과 사용자 경험을 향상시킬 수 있습니다. 진동이나 힘 피드백을 사용하여 촉감을 만드는 햅틱스는 상호작용에 또 다른 층을 더해줍니다.

다음은 UI 디자인에서 터치가 어떻게 사용되는지와 UI/UX 디자이너 및 프런트엔드 엔지니어를 위한 실용적인 고려 사항과 함께 예시 몇 가지입니다:

## 진동 알림:

메시지나 전화 알림을 통지하는 핸드폰의 익숙한 진동 경고는 햅틱스의 기본이지만 효과적인 활용 사례입니다.

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

UI/UX 고려사항: 디자이너는 진동 알림이 섬세하면서도 눈에 띄게 되도록 설계해야 합니다. 사용자가 혼란스럽거나 압도당하지 않도록 주의해야 합니다. 엔지니어들은 다양한 알림을 위한 다른 진동 패턴을 만들기 위해 햅틱 피드백 API를 구현할 수 있습니다.

## 질감 있는 가상 버튼

물리적 버튼의 느낌을 모방하여 섬세한 진동을 이용하면 터치 스크린 사용의 정확도와 만족도가 향상될 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*j947PelqqZbU_U4iWIrhsw.gif)

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

UI/UX 고려 사항: 디자이너들은 조금 불투명도가 변화하거나 섬세한 엠보싱과 같은 질감 있는 버튼을 나타내는 시각적 단서를 만들 수 있습니다.

## 대화식 슬라이더

조절 중에 햅틱 피드백을 제공하는 슬라이더는 사용자의 제어와 정밀도를 향상시킬 수 있습니다.

UI/UX 고려 사항: 디자이너들은 슬라이더의 범위와 현재 값이 나타나는 명확한 시각적 단서를 사용해야 합니다. 엔지니어들은 슬라이더가 한계에 다다를 때 강도가 증가하는 햅틱 피드백을 통합할 수 있습니다.

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

## 대상 크기 및 간격

클릭 가능한 대상(버튼, 메뉴 항목) 사이의 적절한 크기와 간격은 모바일 기기에서 정확한 터치 상호작용을 위해 중요합니다.

![이미지](/assets/img/2024-05-27-HCIPart1TheUnderratedSenseShapingOurInteractionsTouch_1.png)

UI/UX 고려 사항: 디자이너는 기기 유형 및 사용자 연구에 따라 권장되는 터치 대상 크기를 준수해야 합니다. 프런트엔드 엔지니어는 상호작용 요소 사이의 적절한 간격을 보장하는 라이브러리나 프레임워크를 구현할 수 있습니다.

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

# 나쁜 예 및 그를 피하는 방법

## 부정확한 터치 대상

작은 버튼이나 잘 조정되지 않은 터치 스크린은 분노와 놓친 클릭으로 이어질 수 있습니다.

해결책: 터치 대상의 크기를 키우고 디자인 중 적절한 간격을 유지하십시오.

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

<img src="/assets/img/2024-05-27-HCIPart1TheUnderratedSenseShapingOurInteractionsTouch_2.png" />

## 너무 복잡한 햅틱:

너무 세고 부정확하며 화면 상의 동작과 일치하지 않는 햅틱 피드백은 혼란을 초래할 수 있으며 주의를 산만하게 만들 수 있습니다.

해결책: 디자이너들은 명확성을 우선시하고 다양한 진동 패턴을 사용자들과 테스트해야 합니다.

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

# 터치 기술의 미래

터치 기술의 세계는 끊임없이 발전하고 있습니다. 기대할만한 몇 가지 신기한 발전들이 있습니다:

- 울트라햅틱스: 이 기술은 초음파를 사용하여 공중에서 촉각을 만들어 가상 현실 경험을 혁신할 수 있습니다.

- 모양 변화 재료: 터치에 따라 물리적으로 변형되는 인터페이스를 상상해 보세요. 이는 새로운 수준의 상호작용을 제공할 것입니다.

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

![Image](/assets/img/2024-05-27-HCIPart1TheUnderratedSenseShapingOurInteractionsTouch_3.png)

이러한 기술이 발전함에 따라 UI 디자이너들은 더 많은 도구를 활용하여 직관적이고 매혹적인 사용자 경험을 만들어낼 수 있습니다.

# 결론: 터치의 미래를 위한 디자인

터치는 단순히 신체적 감각 이상의 것이며, 세계와 상호작용하는 방법에 대한 창이기도 합니다. 터치의 복잡성을 이해하고 새로운 기술을 받아들이면, UI/UX 디자이너 및 프론트엔드 엔지니어는 기능성 뿐만 아니라 직관적이고 쾌활하게 느껴지는 인터페이스를 만들어낼 수 있습니다.

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

터치의 미래는 흥미로운 가능성을 약속합니다. 공중에서의 햅틱 피드백부터 형태를 변화시키는 소재까지, 디지털과 물리적 사이의 경계가 흐려지고 있습니다. 이러한 발전이 계속되면, 우리는 상상할 수만 있던 방식으로 터치의 힘을 활용한 더욱 풍부하고 몰입적인 사용자 경험을 기대할 수 있을 겁니다.

그래서 다음 번에 스마트폰을 사용하거나 가상 세계를 탐험할 때, 그 경험의 토대가 되는 터치의 무성의 심포니를 한 순간이나마 감상해 보세요. 이 강력한 감각을 이용하여 우리의 삶에 기술이 자연스럽게 통합되는 미래를 디자인할 수 있습니다. 그것은 우리 자신의 연장으로 느껴지는 것처럼 자연스러울 것입니다.

# 나의 참고문헌
