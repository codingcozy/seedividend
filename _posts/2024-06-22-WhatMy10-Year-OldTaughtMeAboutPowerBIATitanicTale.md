---
title: "10살 아이에게 배운 Power BI 이야기 타이타닉 데이터 분석의 교훈"
description: ""
coverImage: "/assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_0.png"
date: 2024-06-22 03:52
ogImage:
  url: /assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_0.png
tag: Tech
originalTitle: "What My 10-Year-Old Taught Me About Power BI: A Titanic Tale"
link: "https://medium.com/make-your-data-speak/what-my-10-year-old-taught-me-about-power-bi-a-titanic-tale-0d12d049e722"
isUpdated: true
---

## 수상 경력 있는 프로젝트 이야기

![이미지](/assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_0.png)

## 장난

이렇게 상상해 봐: 내 딸, 마스터마인드 대모각인 로블록스에서의 강도. 집에 침입하고 금고를 털고, 결코 걸리지 않고 전리품을 가져간다. 이 모든 일이 내 눈앞에서 벌어지고 있다고! 의문의 부모 행동 한 번 했을 때, 그녀가 강도 능력을 선보일 때 웃음을 참을 수 없었다. 나의 자녀, 디지털 도둑.

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

<img src="/assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_1.png" />

얼마나 이 모든 걸 알아내었는지 물어봐야 했다. 유튜브에서 튜토리얼을 보았나요? 다른 누군가를 모방했나요? 그녀의 대답은? "아뇨, 그냥 계속해서 다양한 방법을 시도해 보았어요." 그녀는 불가능한 것을 시도함으로써 가능한 일로 변화시켰어요.

# 타이타닉: 침몰하지 않는 자의 메아리

이 아이디어는 내게 강하게 남았습니다. 컴퓨터로 돌아가 작업을 하고 있던 참에요. 2024년 '당신의 데이터를 말하게 만들기' 대회에 참가 중이었어요. 이 대회에는 두 가지 주요 카테고리가 있었지요:

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

이야기하기에 매력있는 옵션을 선택했지만, 주제에 대해 감이 없었습니다. 그때 딸이 나에게 "타이타닉"을 제안했습니다. 그녀는 영화를 수백 번이나 보았어요. 그런데 이제 도전이 있었습니다: 파워 BI를 사용하여 이 전설적인 이야기를 어떻게 전달할 수 있을까요? 제임스 카메론의 상징적인 버전을 넘어서, 정말 매혹적인 것을 만들어야 했습니다.

이 보고서에서 원했던 것은 다음과 같습니다:

- 포괄적인 데이터: 이해하기 쉽고 매력적인 배와 승객에 대한 세부 정보.
- 독창성: 사용자들이 새로운 것을 배우기 위해 머물러 있는 독창적이고 주목할만한 보고서.
- 맞춤형: Deneb로 만든 차트와 그래프로 한층 높은 맞춤화 수준을 제공하기.

이 비전을 갖고 데이터를 찾아 나서기 시작했습니다. 학창 시절의 타이타닉 Kaggle 데이터셋은 출발점이었지만, 더 필요했습니다. 그래서 저는 앤사이클로피디아 타이타닉을 발견했습니다. 이 곳은 이야기, 사진, 상세한 승객 목록의 작은 보물 창고였어요. 출생지부터 최후까지 모든 것을 담고 있어, 이야기에 완벽한 데이터셋이었습니다. 이제 남은 일은 독자들을 사로잡을 수 있는 이야기로 엮는 것뿐이었습니다.

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

<img src="/assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_2.png" />

## HTML 내용 (Lite)

나는 Spline에서 3D 객체를 시도해 보면서 이를 Power BI 리포트에 추가했어요. 이것은 Power BI에서 매일 볼 수 있는 것이 아닙니다. 가장 좋은 부분은 무엇일까요? 전문가일 필요가 없다는 것이에요. 다니엘 마시-패트릭(Daniel Marsh-Patrick)의 HTML Content Lite 사용자 정의 시각적을 사용하고 기본 HTML 프레임워크를 배우고 Spline에서 임베드 코드를 붙여넣으면 됩니다.

그러나 제가 궁금해 한 것은, 이것이 비지니스에 얼마나 유용한가요? 사용자들이 최신 숫자에만 관심이 있다면 3D 객체를 사용하게 하는 것은 무슨 의미가 있을까요? 어떻게 HTML과 CSS를 기능적이고 재미있게 만들 수 있을까요?

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

저는 더 탐험하기로 결정했어요. CodePen의 HTML, CSS 및 JavaScript 애니메이션의 세계로 뛰어들었죠. 간단한 효과를 찾아 코드를 Power BI로 복사했는데, 결과는... 아무것도 나타나지 않았어요. 몇 차례 더 실패한 후에는 패배감이 들었죠. 그런 다음, 딸의 말이 내 마음에 울렸어요: "그냥 계속 다양한 방법을 시도해봤어요." 그래서 다시 도전해 보았고, YouTube에서 자습서를 찾아보았지만 여전히 축치느껴졌어요. 막혀버린 느낌에, ChatGPT에 문의하기로 결심했어요.

"이 HTML과 CSS 코드를 Power BI의 HTML Lite 비주얼에 결합해 줄 수 있을까요?" 라고 물었죠. 그리고 바로 ChatGPT가 그 마법을 부린답니다. 코드를 Power BI에 붙여넣기 했더니, 와! 부드럽게 뒤집히는 카드가 나타났어요. 독특하고 주목을 끄는데, 정말로 매력적으로 작동했죠.

![이미지](/assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_3.png)

# Deneb

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

Deneb은 Enterprise DNA를 통해 발견한 게임 체인저에요. 그들의 튜토리얼은 그렉 필립스에 의해 이끌어지며 최고 수준이에요. 또한 유튜브 'Power BI Guy'의 벤 페리는 매우 명확하고 단계별 안내를 제공해요. Deneb를 사용하면 시각적 요소의 거의 모든 부분을 조정할 수 있어요.

![이미지](/assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_4.png)

실제로 가장 어려웠던 부분은 리포트 테마와 일치하는 올바른 차트 스타일을 선택하는 것이었어요. 리포트에는 여러 데이터 주도 시각화가 포함되어 있었는데, 각각이 이야기의 독특한 부분을 보여줘요. 제가 가장 좋아한 것은 라이프보트 차트였어요. 그것은 간단하지만 강력하며, 서로 겹쳐진 막대로 라이프보트 용량의 차이를 보여줬어요. 전체적으로 6개의 차트만 있었지만, 각각이 자신만의 소설이었어요. 이는 Power BI 기본 시각화로 수행할 수도 있었지만, 대회는 특별한 무언가를 필요로 했어요.

## 구조/레이아웃

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

엔사이클로피디아 타이타닉을 찾아보며 HTML/CSS 아이디어를 찾던 중, 이야기를 흥미롭게 안내할 레이아웃이 필요했습니다. 그때 제 10살 친구, 창의적인 천재인 우리아이가 제안했어요: “신문 모양으로 만들면 멋지지 않을까?”

<img src="/assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_5.png" />

Figma를 사용해서 각 페이지의 레이아웃을 만들었어요. 배경 이미지를 생성하고 설정하고, 시각 요소를 일치시키는 것은 쉬웠죠. 하지만 마감일 몇 주 전, HTML 시각 요소가 너무 많아서 보고서가 느린 것을 깨달았어요. 판사가 보고서가 로드되기까지 5~10초를 기다리는 건 바람직하지 않았죠. 다시 접근 방식을 재고해야 했고, “계속 노력해봐” 라는 생각을 되새겼어요.

'로딩' HTML 시각 요소를 찾아보았지만, 모든 것이 로드된 후에는 사라지게 하는 데 어려움을 겪었어요. 제 해결책을 소개할게요: 큰 배경 이미지 대신 조각들로 나눠서 각각을 로드되는 시각 요소 위에 이미지를 사용하여 층을 이루는 것이었어요. 완벽하진 않지만, 누가 Power BI 보고서의 첫 페이지를 가로지르는 배를 보지 않았을까요?

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

## 계속 노력해 보세요

타이타닉 프로젝트는 여러 어려움이 있었지만, 결국 게임을 바꾸는 즐거운 경험이 되었어. 배울 점은 무언가 새롭고 미친 듯한 것을 시도하는 데 두려워하지 말아야 한다는 거야. Data2Speak를 확인해 보면 영감을 받을 수 있어; 그들은 비즈니스 대시보드와 스토리텔링 프로젝트에 대한 놀라운 보고서를 가지고 있어. 우리의 프로젝트도 함께 즐길 수 있으니까. 심지어 당신의 다음 프로젝트에 대한 발상을 찾을 수도 있어, 아마도 이번과 같은 대회용으로 말이야.

![프로젝트 이미지](/assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_6.png)

내가 말해줄게, 10세 딸에게 우리 프로젝트가 2등을 차지했다고 말하는 기분보다 더 좋은 것은 없어. 다음 날에는 이미 다음 프로젝트에 대해 설레이고 있었어 — 공룡 프로젝트야!

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

# 현업에서의 활용성?

HTML과 CSS가 어떻게 더 전통적인 비즈니스 보고서에 활용될 수 있는지에 대한 질문으로 돌아가서, 제가 이 향상된 KPI 카드를 만들었는데, 이를 통해 여러분이 무엇을 할 수 있는지 예시로 제시했습니다. 자, 파일을 다운로드해서 여러분이 어떤 것을 만들 수 있는지 확인해보세요!

# 저자 소개

제이슨 보이어는 관리 및 유지보수 분야에서 경험이 있는 데이터 분석가입니다. 현재 Amentum에서 일하고 있는 제이슨은 데이터에서 통찰을 발견하여 창의적이고 고품질의 보고서를 제공하는 전문가입니다. 제이슨과 LinkedIn에서 연결해보세요.

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

감사합니다!

Data2Speak 웹사이트를 확인하고 LinkedIn 및 Twitter에서 팔로우해보세요!

![이미지](/assets/img/2024-06-22-WhatMy10-Year-OldTaughtMeAboutPowerBIATitanicTale_7.png)
