---
title: "배트맨 테마 CSS 디자인 쉽게 만드는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-12-Batman-ComicCSS_0.png"
date: 2024-07-12 19:18
ogImage: 
  url: /ui-log-2/assets/img/2024-07-12-Batman-ComicCSS_0.png
tag: Tech
originalTitle: "Batman-Comic.CSS"
link: "https://medium.com/gitconnected/batman-comic-css-cee100461579"
---


<img src="/ui-log-2/assets/img/2024-07-12-Batman-ComicCSS_0.png" />

지난 주에 말라가에서 열린 Open South Code 행사에 참여하여 comiCSS 뒤의 창의 과정을 설명했어요. 이 행사의 일환으로 어린이 행사가 있었고, 저는 자원봉사를 했어요.

주최자들이 제 발표와 관련된 무언가를 해주길 원했고, 그래서 새로운 CSS 유틸리티 클래스 라이브러리인 batman-comic.css가 탄생했어요. 이 라이브러리는 누구나 배트맨 코믹 스트립을 만들고 싶어하는 사람을 위한 것이에요.

이 라이브러리는 지난 두 주 동안 만들어졌는데, 우리는 이 라이브러리를 두 개의 어린이 행사에서 사용했어요. 이 라이브러리를 사용하면 아이들이 HTML로 놀 수 있고 CSS의 힘을 빠르게 확인할 수 있어요. 때로는 이것이 가장 좋은 사용 방법이 아닐지라도요. 아이들은 어떻게 텍스트를 추가하거나 일부 HTML 클래스를 교체하여 완전히 다른 코믹을 즉시 볼 수 있는지 즐기고 있어요.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 원본

이 라이브러리에 대한 원래 아이디어는 "웨딩 초대장"이라는 코믹CSS 만화 스트립에서 비트맨과 로빈이 브루스 웨이... 죄... 비트맨이 어떻게 과히경제적일 수 있는지에 대해 논쟁하는 것에서 나왔어요:

![image](/ui-log-2/assets/img/2024-07-12-Batman-ComicCSS_1.png)

그 만화 아이디어가 마음에 들었고 프로세스를 간소화하고 싶었어요. 이 캐릭터들과 계획이 없더라도. 프로세스를 단순화하는 것은 코믹CSS에 더 많은 일관성(및 속도)을 제공할 거예요. 이 라이브러리 이외에도 옆으로 뭔가를 작업하고 있었지만 말이 많았네요.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이벤트를 위한 문자를 생성하는 CSS 라이브러리를 만드는 것은 간단해 보였어요 (활동을 준비할 시간이 별로 없었거든요), 이미 많은 표정으로 된 것이 많았기 때문이에요.

HTML과 CSS의 즉각적인 만족감은 아이들과 오랜 시간을 함께한다면 큰 도움이 될 거예요. 그들은 코딩을 하고 만화가 즉시 어떻게 업데이트되는지 볼 수 있을 거예요. 그리고 그랬죠.

# 라이브러리

세부 사항, 색상 및 클래스가 모두 온라인 설명서 페이지에 있고, 스페인어로 된 또 다른 페이지도 있어요. 그 페이지는 저가 어린이 행사용으로 만들었어요.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

캐릭터들의 그림은 단일 HTML 요소와 가상 요소, 그리고 여러 그라데이션을 사용한 CSS로 만들어졌어요. 이 간단함 덕분에 만화에 캐릭터를 추가하기가 쉬워요. 예를 들어, 웃는 배트맨을 추가하려면 다음과 같이 하세요:

```js
<div class="batman"></div>
```

또한, 서로 다른 눈과 입을 설정하기 위한 클래스가 있어요. 모든 캐릭터는 최대 864가지 다른 조합을 생성하는 얼굴 표정 클래스를 가지고 있어요 (12가지 눈 조합 * 24가지 입 조합 * 3가지 추가 기능). 예를 들어, 화난 배트맨을 추가하려면:

```js
<div class="batman eyes-angry mouth-angry"></div>
```

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이것은 각 캐릭터가 가질 수 있는 클래스 목록입니다. 일부는 다른 클래스와 결합될 수 있습니다(“combinable”로 표시됨)

눈

- eyes-no: 눈이 없습니다.
- eyes-think: 위에서 약간 감게 있습니다.
- eyes-doubt: 위에서 아래로 약간 감게 있습니다.
- eyes-sad: 슬픔을 나타내는 눈(안쪽을 향해 기울임).
- eyes-angry: 화남을 나타내는 눈(바깥쪽을 향해 기울임).
- eyes-suspicious: 왼쪽 눈은 생각하고 오른쪽 눈은 화낸 눈.
- eyes-surprise (combinable): 큰 눈.
- eyes-shock (combinable): 오른쪽 눈이 더 돋보임.

입

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

- mouth-no: 입 없음.
- mouth-sad: 눈살 찌푸린 입.
- mouth-angry: mouth-sad 참고.
- mouth-talk: 대화하는 캐릭터의 입.
- mouth-round: 동그라미 모양
- mouth-whisper: 작은 타원 모양
- mouth-right (조합 가능): 입을 오른쪽으로 약간 이동.
- mouth-left (조합 가능): 입을 왼쪽으로 약간 이동.
- mouth-to-right (조합 가능): 입을 오른쪽 방향으로 기울임.
- mouth-to-left (조합 가능): 입을 왼쪽 방향으로 기울임.

기타

- blush: 얼굴의 가시적 부분에 붉은 빛.
- scare: 얼굴의 가시적 부분에 푸른 빛.
- shame: 얼굴의 가시적 부분에 (더 연한?) 붉은 빛.

이 클래스 이름들에 완전히 확신이 있는 것은 아닙니다. 이 라이브러리를 "빠르고 거칠게" 개발했기 때문에 이름과 기본값을 더 일관성 있게 변경할 가능성이 높습니다.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

또한 각 캐릭터는 색상을 정의하기 위해 다른 CSS 맞춤 속성을 사용합니다(자세한 내용은 문서를 확인하세요) 그리고 만화 스트립 패널은 쉬운 사용자 정의를 위해 레이아웃에 CSS Grid를 사용합니다.

# 예시

지금처럼 라이브러리로 만들어진 내용의 예시 몇 가지를 살펴보겠습니다:

<img src="/ui-log-2/assets/img/2024-07-12-Batman-ComicCSS_2.png" />

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

<img src="/ui-log-2/assets/img/2024-07-12-Batman-ComicCSS_3.png" />

<img src="/ui-log-2/assets/img/2024-07-12-Batman-ComicCSS_4.png" />

이 몇 개는 같은 아이디어를 다르게 구현한 것입니다. 더 많은 아이디어가 필요했지만, 이 예시들은 라이브러리 옵션을 보여줄 수 있어요.

# 다음에는 무엇을 할까요?

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

제가 언급한 대로, CSS 만화를 새로 만들기 위해 이 라이브러리를 직접 사용해볼 예정이지만 솔직히 말해서 아직 어떻게 적용할지 잘 모르겠어요.

이벤트에 다시 사용할 수도 있어요 - 특히 어린이와 초보자들과 함께 하는 경우, 조금의 코드로 무엇을 할 수 있는지에 대해 놀라워하는 것 같아요. 하지만 몇 가지 업데이트가 필요할 거예요:

- 새 캐릭터 (수퍼맨? 베인? 조커? 캣우먼?)
- 새로운 표정
- 올바른 표정 (로빈이 약간 버그가 있어요)
- 소품 추가

미래 단계로는 해당 라이브러리를 GitHub에 공유하고 세계에 공개하여 다른 사람들이 사용하고 새로운 콘텐츠(특히 소품)를 기여할 수 있도록 할 것입니다.

<!-- ui-log 수평형 -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

만약 너도 격주/어리버리한 사이드 프로젝트를 좋아한다면, 나도 좋아해! 그리고 그것들을 자주 여기 Medium에 공유해! 예를 들어, 이 놀란 애니메이션 캐릭터 대사를 순수 CSS로 만든 것 같은 것 말이야: