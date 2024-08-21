---
title: "데스크탑 화면은 더 이상 존재하지 않는다"
description: ""
coverImage: "/assets/img/2024-07-06-Theresnosuchthingasadesktopscreen_0.png"
date: 2024-07-06 10:11
ogImage:
  url: /assets/img/2024-07-06-Theresnosuchthingasadesktopscreen_0.png
tag: Tech
originalTitle: "There’s no such thing as a desktop screen"
link: "https://medium.com/design-bootcamp/theres-no-such-thing-as-a-desktop-screen-b9e300c0b128"
isUpdated: true
---

## 반응성을 더 높인 다음 단계로

/assets/img/2024-07-06-Theresnosuchthingasadesktopscreen_0.png

내 아버지는 80대에 접어들어 있는 늙은 분인데, 13인치 Panasonic 비즈니스 노트북을 사용해. 네, 그것들은 만들어지긴 했어요. 하지만 일본 이외에서는 얻을 수 없어요. FXGA 해상도 디스플레이(1366x768)를 사용하고 계시고, 시력이 예전만큼 좋지 않아요. 안경을 써도 웹 페이지를 읽기가 어렵다고요. 디스플레이는 기본적으로 125%로 설정되어 있었어요. 하지만 곧 우리가 150%로 늘렸어요. 그런데 어떤 웹 페이지에서는 여전히 200%까지 확대를 해야만 그 글을 읽을 수 있어요. 이건 사실상 300% 확대죠. 그것이 실제적인 의미는 무엇일까요? 아빠가 노트북을 사용할 때 당신의 페이지가 450px 미만 너비로 표시된다는 뜻이에요...

당신이 이에 대해 생각해 볼 시간을 드릴게요...

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

다음에 "이 앱은 데스크톱 전용이다"라고 생각할 때 다시 한번 생각해보세요. 반응형은 그것보다 훨씬 미묘합니다.

그리고 기본 글꼴 크기를 "크게"로 설정했다는 걸 말했나요? 😁

여러 해 동안 나는 이 모든 것을 다루는 데 도움이 되는 다양한 기술을 배우고, 오늘날 널리 사용되는 방법론에 대한 결론을 도출했습니다. 반응형이 무엇인지, 그리고 어떻게 견고한 레이아웃 원칙을 이해하여 무너지지 않고 버틸 수 있는지에 대한 간단한 안내를 해 드릴게요. 아마도 여러분에게도 도움이 될 것입니다.

# 화면 기반의 중단점은 쓸모없습니다

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

가끔 이런 추천을 볼 때가 있어요:

```js
@media (max-width: 599px) { /* 휴대폰 */

}

@media (min-width: 600px) { /* 큰 휴대폰 */

}

@media (min-width: 900px) { /* 태블릿 */

}

@media (min-width: 1200px) { /* 노트북 */

}

@media (min-width: 1800px) { /* 데스크탑 */

}
```

그들은 이 값들을 면밀한 조사로 뒷받침하며 브라우저 사용 통계로부터 얻은 화면 크기로 추천합니다. 화려한 차트가 함께 나오기도 해요. 그러나 이 모든 것은 완전히 쓸모가 없어요. 왜냐하면, 진짜 원하는 것은 화면 크기가 아니라 뷰포트의 크기죠! 그리고 이는 여러 요소에 따라 변하기 때문에요. 확대, 창 크기, 디스플레이 배율 등이 그 예인데요. 지금, 디스플레이 배율을 무시하고 이를 물리적 디스플레이 크기처럼 다룬다 하더라도, 뷰포트에 영향을 주는 두 가지 요인이 있다고 생각합니다.

GitHub에 가서 화면을 500%까지 확대해보세요. 거의 우리가 보통 "모바일 레이아웃"이라고 부르는 곳으로 들어간다는 걸 알 수 있어요.

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

/assets/img/2024-07-06-Theresnosuchthingasadesktopscreen_1.png

이 레이아웃은 모바일 기기에서 찾을 수 있는 것과 비슷해 보이지만, 여기에는 꼬임이 있어요. 매우 짧아요. 여전히 수평 (가로) 포맷이에요! "노트북"이나 "태블릿"과 같은 구문이 응담성에 대해 완전히 관련 없다는 점을 이해하시기를 바래요.

누가 400%~500% 줌을 사용하나요? 이미 우리가 말했듯이 제 아빠는 실제로 300% 줌을 사용하네요. 그러나 시력 문제가 없더라도 우리는 여전히 확대할 수 있어요. 예를 들어, 저는 때로는 27인치 4K 모니터에서 125%로 이미 확대된 상태에서 400% 줌을 사용하기도 해요. 가끔 소파에서 2m 떨어져 블루투스 마우스로 빠르게 뭔가를 확인하고 싶을 때죠. 400%로 확대하지 않으면 아무것도 볼 수 없어요. 이건 1등 세계적인 문제인가요? 네, 물론이지요. 그저 당신이 줌을 사용했을 때 웹 페이지가 예상대로 동작해야 하는 필요가 있는 사람들이 시각 장애가 있는 사람 뿐만이 아니라 있다는 것을 알려드리고 싶었어요.

중요한 건, 사람들이 다양한 이유로 당신이 예상하지 못하는 일들을 하고 있다는 거에요. "접근성"이나 "장애인"에 관한 것 뿐만이 아니라, 당신의 작업이 그냥 작동할 때 높은 품질의 장인정신이라고 생각되죠. ™️

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

그리고 엔지니어링에 대한 자부심과 좋은 제품을 만들고 싶은 욕망이 당신을 설득하지 못한다면, 웹 접근성에 대한 공식 가이드라인을 참고할 수도 있어요.

# 글꼴 크기 추가하기

이제 이 모든 것에 글꼴 크기를 추가해볼게요. 만약 모든 것을 픽셀로 설정한다면, 브라우저의 기본 글꼴 크기를 변경할 때 어떻게 될까요?

다음 코드를 고려해보세요:

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
button {
  font: inherit;
  color: inherit;
  cursor: pointer;
  height: 32px;
  padding: 6px 16px;
  border: 1px solid #400;
  border-radius: 4px;
  background: #dee;
}
```

기본 글꼴 크기에서는 괜찮아 보여요.

/assets/img/2024-07-06-Theresnosuchthingasadesktopscreen_2.png

하지만 크롬에서 글꼴 크기를 "크게"로 변경하면 이제 버튼이 이상하게 보여요.

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

/assets/img/2024-07-06-Theresnosuchthingasadesktopscreen_3.png

그게 정말 고해상도 같지 않나요?

'body'에서 폰트 크기를 16px로 지정하여 인터페이스를 "원래" 상태로 돌릴 수 있어요. 이것은 사용자가 지정한 폰트 크기가 적용되는 것을 방지하는 불필요한 부작용이 있어요.

누군가가 폰트 크기를 변경하는 데 노력을 들이면, 그들이 그 조치에 어떤 영향을 기대할 가능성이 매우 높다는 것은 심리학자가 필요하지 않아요. 'body'에서 16px 폰트 크기를 지정하는 이러한 "수정"은 좋지 않아요. 사용자의 폰트 크기 변경에 반응하지 않아요 - 반응하지 않아요.

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

우리 버튼의 문제는 글꼴 크기 변경에 따라 크기가 조절되지 않았다는 것입니다. 이것이 우리가 다뤄야 할 근본적인 문제입니다. CSS는 텍스트 관련 단위를 제공하는데, 이는 텍스트 측정값에 따라 변하는 단위들입니다. 여기에 폰트 크기와 직접적으로 연결된 간단한 목록이 있습니다:

- em — 요소의 글꼴 크기 (상속된 것 포함)
- rem — `html` 요소에서의 1em과 동일 — `html` 요소에서 글꼴 크기를 지정하지 않는 경우 (하지 마세요), 브라우저의 기본 글꼴 크기와 일치해야 합니다.
- ch — 현재 요소의 글꼴을 사용하여 숫자 0의 폭 (또는 상속된 것)의 대략적인 크기
- ex — 현재 요소의 글꼴을 사용하여 문자 x의 높이를 나타냄 (또는 상속된 것)

이 중에서 em과 rem을 가장 자주 사용합니다. 여러 다른 방식으로 구현할 수 있는 모든 것과 마찬가지로, 서로 다른 접근 방식을 지지하는 사람들 간에 종교적인 전투가 벌어질 수 있습니다. 특히 이 특정 케이스에서 em을 사용한 고정된 CSS를 보여드리겠습니다. em을 rem으로 대체하면 동일한 결과를 얻을 수 있습니다:

```css
button {
  font: inherit;
  color: inherit;
  cursor: pointer;
  height: 2em;
  padding: 0.3em 1em;
  border: max(1px, 0.07em) solid #400;
  border-radius: 0.25em;
  background: #dee;
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

이 변경으로 인해 버튼의 모든 모습에 영향을 미치는 기본 글꼴 크기가 균등하게 확대되어 비율을 유지합니다.

/assets/img/2024-07-06-Theresnosuchthingasadesktopscreen_4.png

올바른 rem과 em 값을 계산하는 방법은 무엇인가요? 사실 대부분 계산하지 않아요. 그냥 눈대중으로 맞추고 보기 좋게 만드는 겁니다. 이 두 단위는 글꼴 크기를 기준으로 하기 때문에 텍스트를 보고 "응, 글자 크기의 반 정도야" 하고 간단히 확인합니다. 대략적으로 맞추고 미세 조정하세요. Figma 디자인을 기반으로 작업한다면 비슷하게 하면 됩니다. 이것은 기술입니다. 배울 수 있어요.

아직 이를 할 수 없는 분들이 있을 거라는 것은 알고 있습니다. 시각적인 훈련이 필요합니다. 잘 되지 않는다면 픽셀에 의지하고 싶어질 수 있으니, 결코 오래된 sweetheart인 픽셀로 돌아가고 싶어진다면 나중에 다른 옵션을 제공할게요.

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

폰트 크기에 관해서 말씀드리자면, 접근성 측면에서 페이지에서 사용해야 할 규정된 크기는 없습니다. 이는 사용자가 기본 폰트 크기를 제어할 수 있고, 접근성 있는 웹 페이지는 그것을 존중해야 하기 때문입니다. 그러나 14px는 많은 상황에서 작은 크기일 수 있다는 것을 기억해 주세요. (상황 = 사람의 능력 + 장비 + 환경). 기본 크기보다 작게 표시해야 하는 텍스트가 필요할 경우, 절대 87.5% (또는 0.875em / 0.875rem) 이하로 내려가지 마세요 (대부분의 경우 브라우저의 공장 설정에서 14px입니다). 기억하세요, 페이지에서 가장 작은 텍스트 크기는 14px입니다!

# 적절히 대응하기

프로그래밍에서 "적절한"이라고 명확하게 선언할 수 있는 것은 별로 없습니다. 우리가 하는 말 중 대부분은 본질적으로 의견이거나 적어도 어떤 상황에서의 선택지이기 때문에 보편적으로 적절하지는 않습니다. 그러나 분명히 "적절하다"고 말할 수 있는 것들이 있습니다. 그것들은 작동 여부에 영향을 미치는 것들입니다.

반응형 레이아웃의 경우, (텍스트-)상대적인 단위를 사용하는 것이 적절한 방법입니다. 그리고 이를 "대부분의 곳에서" 사용하는 것은 안 됩니다. 모두에게 해당되어야 합니다. 이를 어기면 어떤 일이 벌어질지 보겠습니다.

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

/assets/img/2024-07-06-Theresnosuchthingasadesktopscreen_5.png

링크드인에서 뭔가 잘못됐어요. 텍스트 상대값과 픽셀 값을 섞어서 사용해버렸는데, 이런 결과가 나왔어요 — 우아하지도, 고품질이지도 않죠.

요약하자면: 모든 곳에서 텍스트 상대 단위를 사용하세요 — 미디어 쿼리 포함해서요. 마침표.

%나 vw, vh 같은 상대 단위를 사용하는 경우는 몇 가지 있을 수 있어요. 제 경험상, 이들은 길이 단위의 5% 미만을 차지하며, 주로 레이아웃과 관련이 있어요. 사용하는 방식에 따라 달라질 수 있어요.

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

“하지만, 저, 다른 사람들은 모두 픽셀을 사용하고 있어요! 이게 어떻게 가능한 건가요!” 한숨... 네, 대부분의 개발자들이 픽셀을 사용하고 있어요. 하지만, 대다수의 개발자들이 일관되고 의도적으로 우수한 결과물을 생산하는 최고의 개발자들은 아닙니다. 전 세계 개발자 인구 중 최고의 개발자들은 아마도 5% 미만인 것으로 기억하는데, 어디서 읽은 것 같기는 한데, 정확하게 기억하고 있지는 않아요.

“나는 상위 X%에 속한다고 말하려는 게 아니에요!“ 라고 말할 생각은 없어요. 그보다는, 만약 95%의 평범하거나 하위 수준의 개발자들이 하는 것을 기반으로 의견을 형성한다면, 평균 이하의 결과물을 얻게 될 거에요. 남들의 의견을 빌리기보다는 실제로 작동하는 것과 작동하지 않는 것에 기반을 두는 것이 더 나을지도 모르겠어요. 다시 말하지만, 상황에 따라 달라질 수 있어요.

그럼, 계속하죠.

의견의 영역(으로) 돌아와서, 농담 두 개 더 드리겠어요. 너무 많이 노력하지 않고도 반응형 레이아웃을 정말로 반응형으로 만드는 두 가지 제안이 있습니다.

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

먼저 flexbox를 마스터하는 것이 중요해요. 이미 반응형 레이아웃을 만드는 데 flexbox를 사용하는 방법에 대해 썼어요. 격자(grid)도 비슷한 방식으로 사용할 수 있다고 하는데, 저는 아직 그 기술을 제대로 습득하지 못했어요. 그것은 대부분의 경우에 flexbox가 아주 잘 작동하기 때문이겠죠. 만약 텍스트 상대적 단위와 픽셀 단위를 혼용하지 않는 좋은 자료를 찾으신다면 알려주세요. 😉

두 번째 제안은 임의의 화면 크기가 아닌 콘텐츠를 기준으로 한 미디어 쿼리 브레이크포인트를 사용하는 것이에요. 이것은 간단한 기술이지만 놀랍도록 효과적이에요. 하는 일은, 뷰포트 너비를 단지 변경해가며, 어떤 것이 이상하게 보이거나 완전히 깨지는 것이 있을 때까지 더해가는 거예요. 그럼 다시 조금 뒤로 돌아가서 정상으로 복구되는 지점을 찾아낼 거에요. 그게 바로 깨지는 것의 특정 브레이크포인트야. "브레이크포인트는 무엇이 깨질 때의 지점이다"라고 생각해보세요. 그러고 나서 뷰포트의 픽셀 너비를 16으로 나누어 rem으로 변환해주세요 (예를 들어, 브레이크포인트가 1118픽셀이라면 70rem이 됩니다, 반올림).

```js
@media (width < 70rem) {
  .broken-element {
    flex-direction: column;
    align-items: stretch;
  }
}
```

(네, 미디어 쿼리에서 rem과 em을 완전히 사용할 수 있어요!)

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

여기에 제안하는 아이디어는 페이지의 각 부분을 개별적으로 처리하고 다양한 화면 크기를 지원하는 강인한 UI를 갖게 하는 것입니다. 때로는 동일한 브레이크포인트에서 페이지의 다른 부분을 다뤄야할 수도 있지만, 이는 'WCD(너비 공통 최대치… 농담이죠 😝)'를 사용하여 브레이크포인트를 조정하는 문제일 뿐입니다.

이렇게 하면 대부분의 뷰포트 및 폰트 크기 관련 응답성을 대부분 다룰 수 있습니다.

# 여기에 그치지 않아요

사용자는 자체 스타일 시트를 사용할 수도 있습니다. 이제 사용자가 그것으로 수행할 수 있는 모든 조치를 고려할 수는 없습니다. 결코 가능하지 않아요. 그러나 그들도 그런 스타일 시트를 모든 것에 사용하지는 않습니다.

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

사용자 정의 CSS의 가장 중요한 용도는 가독성을 높이는 데 있습니다. 사용자는 글자 간격을 넓히거나 줄 간격을 늘리거나 문단 사이 간격을 더 늘릴 수 있습니다. 이는 주로 인지능력이 감소된 상태일 때 일어날 수 있지만, 정작 중요한 것은 그 이유가 무엇이든 사용자가 그렇게 하는 것을 지원해야 한다는 점입니다. 우리 페이지가 이러한 재정의에 응답할 수 있도록 최대한 확실히 해야 합니다.

크롬 및 크롬 기반 브라우저에서는 Text Spacing Editor라는 확장 프로그램이 있습니다.

/assets/img/2024-07-06-Theresnosuchthingasadesktopscreen_6.png

이 확장 프로그램을 사용하면 사용자가 페이지 스타일을 재정의하는 방식을 시뮬레이션할 수 있습니다. 사용법은 재정의를 활성화한 후 사용자 지정 스타일이 적용될 때 아무 문제가 없는지 확인하는 것입니다.

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

브라우저가 보통 어떻게 레이아웃을 배치하는지 크게 바꾸지 말라는 게 내가 줄 수 있는 최고의 조언이에요. 예를 들어 컨텐츠가 증가함에 따라 상자가 수직으로 확장된다던가 하는 것들을 명시적인 높이로 지정하면서, 그게 꼭 필요한 건지 생각을 해보세요. 혹시 유연 또는 그리드 컨테이너가 더 나은 해결책이 될 수도 있어요.

CSS 없이 페이지가 100% 응답형이라는 걸 기억하세요. 여러분의 CSS로 그 응답성을 깨는 거니까, 여기서 중요한 건 깨짐을 최소화하는 것이지 고장난 것을 고치는 것은 아니에요.

# 그래도 Figma는!

현실은 아직도 완전히 웹 UI 프로젝트를 작업하기에 자격이 충분치 않은 UX 디자이너들이 있다는 거예요. 그들은 그냥 자신들의 화소들을 좋아해요. 그거 싫어해도, 그들이 사용하는 도구는 화소 기반으로 되어 있어요. 텍스트 상대 단위를 완벽하게 다루더라도, 픽셀과 rem 또는 em 사이를 변환하는 게 여전히 귀찮을 수 있어요, 특히 제가 그렇게 쉽게 따져볼 수 없다면요. 또는 말하자면 전적으로 텍스트 상대적 레이아웃에서 두 픽셀씩 여기저기나 하나씩 하나씩해 하류 디자이너가 떼거든요... 😭 이해해요. 쉽지 않죠.

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

만약 올바른 방법으로 할 수 없다면, 다음 해결책을 고려해보세요.

PostCSS 플러그인인 pxtorem이 있다. 이름에서 알 수 있듯이 CSS를 처리하여 모든 px 값을 rem으로 변환합니다. 그러나 이 도구를 사용할 때 두 가지 사항을 고려해야 합니다:

- 아마도 더 이상 관리되지 않을 가능성이 높기 때문에 버그를 스스로 수정해야 할 수 있습니다.
- 기본 설정에서 속성 일부만 변환하므로 여전히 문제가 발생할 수 있습니다.

내 추천은 다음 설정을 사용하는 것입니다:

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
pxtorem({
  propList: ["*"],
  mediaQuery: true,
});
```

이제 모든 곳에서 픽셀을 사용할 수 있습니다. 디자이너가 지정한대로 Figma 값을 직접 사용할 수 있습니다. 미디어 쿼리에서도 픽셀을 사용할 수 있습니다. 기본 글꼴 크기를 변경하면 처리된 CSS가 rem 단위로 되어 있기 때문에 레이아웃이 정확하게 확대/축소됩니다.

그러나 이 권장 사항에는 두 가지 주의 사항이 있습니다:

- em과 달리 이 기술을 사용하면 레이아웃을 위해 필요한 CSS 양이 줄어들지 않습니다. em은 제대로 사용하면 꽤 많은 작업을 절약할 수 있습니다.
- 저는 이것을 테스트만 해본 것을 넘어서 프로젝트에서 사용한 적이 없기 때문에 부작용이 있는지는 확실하지 않습니다.

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

반응형 디자인은 무작위로 정해진 화면 너비가 아닌, 페이지가 언제 무너지기 시작하는지를 늘리거나 줄일 수 있는 정도를 말합니다. 높은 품질의 웹 UI는 다양한 요소 중 하나로서 매우 견고합니다. 화면 크기(합리적인 한도 내에서), 글꼴 크기, 줌, 창 크기, 임의의 사용자 지정 스타일시트에 관계없이 일관성 있게 정보를 전달합니다.

모든 것을 고려하고 "픽셀 완벽한" 해결책을 만드는 것은 제 생각에는 괴롭다는 행동입니다. 오히려 우리는 특정 사례에 대해 걱정할 필요 없이 모든 것(또는 적어도 실생활 상황의 거의 모든 것)을 다룰 수 있는 몇 가지 간단한 도구를 어떻게 사용해야 하는지 배워야 합니다. 때로는 드물게 걸어온 길로 인도되기도 하지만, 그게 필요한 일이라면 그것 또한 유효한 길입니다. 😉
