---
title: "텍스트 상자 비활성화를 하면 안되는 이유"
description: ""
coverImage: "/assets/img/2024-05-01-Disablingtextboxeswhyitsabadideaandwhattodoinstead_0.png"
date: 2024-05-01 23:24
ogImage:
  url: /assets/img/2024-05-01-Disablingtextboxeswhyitsabadideaandwhattodoinstead_0.png
tag: Tech
originalTitle: "Disabling text boxes: why it’s a bad idea and what to do instead"
link: "https://medium.com/user-experience-design-1/disabling-text-boxes-why-its-a-bad-idea-and-what-to-do-instead-48fa50f7c433"
isUpdated: true
---

## 비활성화된 컨트롤

왜 텍스트 상자를 비활성화하는 걸까요? 당연히 사용자가 값을 변경하지 못하게 하려는 것이죠.

![image](/assets/img/2024-05-01-Disablingtextboxeswhyitsabadideaandwhattodoinstead_0.png)

그렇다면 왜 처음부터 보여줄까요? 아마도 사용자가 컨트롤의 내용을 볼 수는 있지만 값을 변경하지는 못하게 하기 위해서일 것입니다.

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

그래서 사용자가 콘텐츠를 보는 것은 좋지만 수정하는 것은 원치 않을 때 텍스트 상자를 비활성화 하는 것에 문제가 있나요?

이 질문에 대한 답변을 이 글에서 다룰 예정이며, 내가 추천하는 대안을 포함한 몇 가지 대안을 제시할 것입니다.

불행하게도, 수정할 수 없는 정보를 제공하는 모든 솔루션에는 단점이 있습니다. 특히 비활성화 속성을 사용하여 HTML을 사용하는 경우 더욱 그렇습니다.

이 글의 범위: 이 글에서는 텍스트 상자 (`input type="text"/`)만 다룰 것입니다. 개발자가 일반적으로 비활성화하는 다른 컨트롤은 아래 요구 사항을 충족시키기 위해 고유한 변경이 필요합니다. 이러한 모든 내용을 다루면 글이 너무 길어집니다.

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

# 내용

요구 사항

솔루션으로 이룰 희망하는 목표를 설명합니다.

텍스트 상자를 비활성화하지 말아야 하는 이유

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

텍스트 상자에 비활성 속성을 사용하는 문제를 살펴볼 거에요.

의문의 해결책

보조 기술 사용자를 위해 제안된 해결책과 그 해결책이 문제를 야기하는 이유에 대해 이야기할 거에요.

가능한 대안 해결책

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

우리는 접근성 측면에서 더 유망한 몇 가지 방법을 논의할 것이며, 왜 그런지도 설명할 거에요. 만약 전체 글을 읽고 싶지 않다면, 제가 추천하는 해결책으로 건너뛰세요.

결론

링크

# 요구 사항

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

저희 솔루션에서는 사용자가 시각적으로든 보조 기술을 이용하여 소비할 수 있는 콘텐츠가 있어야 합니다.
사용자가 콘텐츠를 변경할 수 없도록 해야 합니다.
사용자에게 콘텐츠를 변경할 수 없는 이유를 전달해야 합니다.
적용 가능한 경우 사용자가 콘텐츠를 변경하는 방법을 전달해야 합니다.
컬러 대비에 대한 측면을 고려하여 콘텐츠를 접근 가능한 방식으로 제시해야 합니다.

이러한 요구 사항을 얼마나 잘 충족하는 지 여러 흔한 솔루션을 조사해보겠습니다. 하지만 먼저, disabled 속성을 사용하는 것의 문제에 대해 알아보겠습니다.

목차로 이동

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

# 텍스트 상자를 비활성화하지 말아야 하는 이유

## 의심스러운 색 대비

```js
<label for="txtFName" id="lblFName">이름</label>
<input id="txtFName" type="text" disabled value="John" />
```

상기 마크업은 브라우저에서 다음과 같이 렌더링됩니다:

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

![이미지](/assets/img/2024-05-01-Disablingtextboxeswhyitsabadideaandwhattodoinstead_1.png)

이제, 처음으로 생각할 수 있는 것은 이것이 텍스트 상자의 배경과 텍스트의 색상 간의 색 대비 비율을 통해 접근성을 위반할 수 있다는 것일 겁니다.

그러나 이는 WCAG 레벨 AA 요구 사항을 충족합니다. 성공 기준 1.4.3 대비(최소)에 정해져 있지만, 성공 기준 1.4.6 대비(향상)에서는 미달합니다.

이는 항상 그랬던 것은 아닙니다. 다양한 브라우저의 비활성 제어와 여러 UI 라이브러리에서는 더 어두운 배경 색상을 가지고 있어 분명히 레벨 AA를 위반했습니다.

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

비록 배경이 어두운 경우라도, WCAG에는 장애가 있는 컨트롤에 대한 예외 규정이 있었습니다. "이해하기 - 성공 기준 1.4.3 대비 (최소값)" 페이지에 따르면:

이는 규정 준수와 접근성이 같은 것은 아니라는 상황 중 하나입니다.

비활성화된 텍스트 상자가 텍스트와 배경색 간의 컬러 대비 비율이 최소 컬러 대비 비율을 충족시키지 못한다면, 왜 괜찮을까요?

상기 출처에서 WCAG는 사용자가 해당 컨트롤과 상호작용하지 않기 때문에 괜찮다고 제안하는 것으로 보입니다.

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

내 의견으로는 다음 네 가지 이유로 그것은 잘못된 것 같아요:

- 시각 장애가 있는 사용자는 그것이 비활성화되었거나 텍스트 상자에 사용자 상호작용이 없어야 하는 것을 어떻게 알 수 있을까요?
- 정보가 중요하더라도 불변적이어도 어떨까요? 시각 장애나 색맹을 가진 사람도 그 정보를 소비할 수 있어야 하지 않을까요?
- 우리는 사용자에게 그것이 비활성화되었음을 전달하는 데 색상만 의존하고 있지는 않나요 (이는 색상 사용 원칙 1.4.1 위반될 수 있음)?
- 색상에 의존하는 것 외에도, 비활성화 속성이 있는 컨트롤은 스크린 리더나 기타 보조 기술에서 건너뛰어질 수 있어, 사용하는 사람들은 해당 컨트롤의 정보를 소비할 수도 없을 수도 있어요.

## 사용자에게 비활성화되었음을 알리는 접근 방법이 없음

누군가가 대답으로 말할 수도 있습니다. "음, 웹 페이지는 사용자에게 텍스트 박스가 사용할 수 없어서 비활성화되었음을 알리고 있어요. 게다가, 스크린 리더가 비활성화된 폼 컨트롤을 항상 건너뛰지는 않아요. 어떻게 사용하는지에 따라 다르거든요."

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

첫 번째로, 사용자가 꺼져 있는 컨트롤과 상호 작용하려고 시도하게 만들어서 짜증을 내거나 해당 컨트롤이 꺼져 있다는 것을 깨닫기 전까지 짜증을 내게 할까? 누구나 짜증을 내게 될 거야.

두 번째로, 맞아요: 스크린 리더는 사용자가 어떻게 사용하는지에 따라 꺼져 있는 컨트롤을 이해할 수 있어요. 예를 들어, JAWS와 NVDA에서 "F" 키를 누르면 다음 폼 컨트롤을 읽어주는데, 이는 텍스트 상자, 라디오 버튼 등을 포함하고 꺼져 있는 컨트롤도 읽을 거예요 (만약 "Tab" 키를 사용하여 페이지를 탐색한다면 꺼져 있는 컨트롤은 건너뛰게 되어요).

하지만 누군가가 스크린 리더를 어떻게 사용할지를 상정하지 않을 건가요? 사용자가 스스로 찾아내기를 기대하지 말고 게으르게 할 게 아니라, 항상 해야 할 일을 하자고요: 가능한 가장 접근성 있는 콘텐츠를 만들어요.

내가 알기로는, 사용자에게 컨트롤이 왜 꺼져 있는지 알려줘야 하는 경우가 WCAG에 없어요. 성공 기준 1.3.1 정보와 관계성의 "정신"에 해당한다는 주장을 할 수도 있지만, 솔직히 말해서 그 기준은 지극히 일반적이어서 거의 모든 것이 해당될 수 있는 범위에 있어요.

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

하지만 항상 말씀드리듯이 WCAG를 준수하는 것이 단순히 시작에 불과합니다. 한 줄에 있어도 운전을 잘 못할 수 있죠.

![Image](/assets/img/2024-05-01-Disablingtextboxeswhyitsabadideaandwhattodoinstead_2.png)

반박으로는 "비활성화된 컨트롤 옆에 텍스트를 추가하여 사용자에게 해당 텍스트 상자가 비활성화되었음을 알릴 수 있습니다."라고 할 수 있습니다. 좋아요! 이제 시각적으로 페이지를 볼 수 있는 사용자들에게 신경 쓰고 있네요. 그런데 그 외의 사용자는 어떻게 해야 할까요?

스크린 리더가 이 정보를 건너뛸 수 있다는 점으로 다시 돌아갑니다. 비활성화된 텍스트 상자에 aria-describedby 특성을 사용하더라도, 스크린 리더가 텍스트 상자를 여전히 건너뛴다면 절대 소비되지 않을 것입니다.

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

컨텐츠로 돌아가기

# 의문의 해결책

위에서 제기된 문제를 해결하기 위해 몇 가지 흥미로운 제안된 해결책이 있었습니다.

## 탭 인덱스 트릭

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

tabindex="0" 속성/값을 요소에 추가하면 기본적으로 초점을 맞추지 않는 요소를 초점을 맞출 수 있게 만듭니다. 그러므로 이 속성이 비활성화된 텍스트 상자에 적용되면 모든 것이 잘 작동할 것입니다:

```js
<label for="txtFName" id="lblFName">이름</label>
<input id="txtFName" type="text" disabled tabindex="0" value="John" />
```

웹 페이지를 보는 동안 보조 기술 없이 사용하는 대부분의 사용자는 차이를 알아차리지 못할 것입니다. 이는 대부분의 브라우저가 tabindex 속성보다 disabled 속성을 우선하여 처리하기 때문입니다.

그러나 일부 스크린 리더는 tabindex가 0으로 설정된 비활성화된 텍스트 상자에 초점을 두거나(적어도 소비하는 것)을 허용할 수 있습니다.

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

화면 판독기들이 이를 처리하는 방식이 일관성이 없다는 문제가 있습니다. 일부는 이를 완전히 건너뛰고, 다른 것들은 그렇지 않습니다. 따라서 이 해결책은 작동하지 않을 것입니다.

## aria-disabled 트릭

다른 제안된 해결책은 비활성 속성 대신 aria-disabled 속성을 사용하는 것입니다:

```js
<label for="txtFName" id="lblFName">이름</label>
<input id="txtFName" type="text" aria-disabled="true" value="John"/>
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

이렇게하면 스크린 리더에게 텍스트 상자를 비활성화된 텍스트 상자처럼 표시할 수 있지만, 보조 기술을 사용하지 않는 사람들에게는 활성화됩니다.

물론, 이는 사용자가 컨트롤을 편집할 수 없는 것을 방지하는 것을 무효화합니다. 다시 말해서, 이 솔루션은 disabled 속성을 사용하는 것보다 좋지 않습니다 - 적어도 일부 JavaScript 개입 없이는 그렇습니다.

보조 기술을 사용하지 않는 사용자를 위해 이를 수정하려면, 개발자는 아마도 JavaScript를 사용하여 입력을 방지하고 코드 뒤에 텍스트 상자를 읽지 않도록 해야 할 것입니다. 시각적으로 사용자에게 텍스트 상자가 비활성화되었음을 알리고 왜 비활성화되었는지 및 향후 변경이 가능한지를 설명해야 할 것입니다.

그러므로 이 면에선 가능성이 있긴 하지만, 그 모든 과정을 거치는 것은 불필요합니다. 요약하면: 이것은 나쁜 해결책입니다.

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

컨텐츠로 돌아가기

# 가능한 대안 솔루션

![이미지](/assets/img/2024-05-01-Disablingtextboxeswhyitsabadideaandwhattodoinstead_3.png)

## 솔루션 1 탐구: 컨트롤 숨기기

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

일부 UX 전문가들은 컨트롤을 비활성화하는 대신 숨기는 것이 좋다고 제안합니다. 이렇게 하면 사용자가 결국 컨트롤이 왜 활성화된 상태인지 추측할 필요가 없어집니다.

난 필요하지 않은 것을 숨기는 원칙이 유익하다고 생각하지만, 컨트롤이 제공하는 정보가 중요한 경우에는 어떻게 하나요? 그 정보를 숨겨 놓으면 사용자가 어떻게 소비하도록 허용할까요?

이 해결책을 구현할 때, 그 점을 고려하는 데 시간을 들이는 것이 중요합니다.

해결책 자체는 간단합니다.

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
<body hidden>
  <h2>이 문제에 대한 솔루션은...</h2>
  <p>이것은 사용자를 혼란스럽게하지 않기 위해 숨겨진 비활성화된 요소입니다.</p>
  <p>첫 번째 이름: John</p>
</body>
```

참고: 이 예제에서 `fieldset` 및 `legend` 요소는 단순히 해당 요소를 그룹화하고 레이블을 붙이는 방법입니다.

이 솔루션은 적절할 수 있지만, 숨기는 정보가 중요하지 않은 경우에만 해당됩니다. 그렇지 않으면 이 솔루션은 부적절할 수 있으며 수정을 제한하려는 모든 경우에 대한 일반적인 솔루션이 될 수 없습니다.

장점:

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

- 사용자가 값을 변경하는 것을 방지합니다.
- 매우 간단합니다 (해당 요소나 부모 요소에 hidden 속성을 추가하기만 하면 됩니다).
- 페이지의 컨트롤 수를 줄여 사용자가 쉽게 소비할 수 있도록 합니다.

단점:

- 컨트롤이 표시해야 할 정보를 사용자가 소비하는 것을 방지합니다.
- 어떤 경우에는 숨겨진 이유를 설명하지 않습니다.
- 때로는 정보가 중요할 수 있어 일반적인 해결책으로 작동하지 않을 수 있습니다.

판단:

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

이 솔루션은 숨겨진 정보가 중요하지 않은 경우에만 적합합니다. 그렇지 않으면 모든 요구 사항을 충족하지 못합니다. 하지만 각각의 경우에 따라 구현할 수는 있습니다.

## 솔루션 2 조사: 컨트롤 대신 텍스트 사용

접근성 향상을 위해, 사용할 수 있는 대안으로, 비활성 상태인 컨트롤은 스크린리더에 건너뛰어질 수 있고, 몇 가지 폼 컨트롤이 읽기 전용 속성을 가지고 있지 않다면, 정보를 간단한 텍스트로 보여줄 수 있다고 들었습니다.

다음과 같이 변경:

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
<p>
  <span>이름: </span>
  <span id="fName">John</span>
</p>
```

이렇게 변환해 보세요!

```js
<form>
  <label for="txtFName" id="lblFName">
    이름
  </label>
  <input id="txtFName" type="text" disabled value="John" />
</form>
```

만약 페이지에 `form` 요소가 없으면 문제가 해결될 것입니다. 그런데 단일 필드를 비활성화해야 하는 경우에는 어떻게 할까요? 그럼 화면 판독기가 `p` 요소를 건너뛰는 문제가 발생합니다.

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

다시 말해, 'form' 요소 내부에 다음 내용이 있다면:

```js
<label for="txtFName" id="lblFName">First Name</label>
<input id="txtFName" type="text" disabled value="John" />
<p><span>Last Name: </span><span id="lName">Doe</span></p>
```

"Last Name" 텍스트와 값이 무시될 가능성이 높습니다.

그렇다면, 이를 적절한 해결책으로 활용할 수 있지만, 한 가지 방법으로 처리하는 것을 제안합니다.

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

- `form` 요소 외부에는 양식 컨트롤에 있을 것 같은 관련 텍스트를 그룹화하세요. 이렇게 하면 스크린 리더가 해당 텍스트를 건너뛰지 못하게 됩니다.
- 모든 정보를 모달로 넣고, 양식 안에 모달을 열 수 있는 버튼을 추가하세요.

그래서, 다음과 같이 만들어보세요:

```js
<p>다음 값들은 현재 편집할 수 없습니다. 11월 1일 Open Season에서 이 값들을 변경할 수 있습니다:</p>
<ul class="immutableValues">
<li>이름: <span id="fNameValue">John</span></li>
<li>중간 이름: <span id="mNameValue">Xavier</span></li>
<li>성: <span id="lNameValue">Doe</span></li>
</ul>
<form action="/accountInfo.php" method="post">
<fieldset>
<legend>모든 필드는 필수입니다</legend>
<label for="txtNName" id="lblNcName">닉네임</label>
<input id="txtNName" type="text" required autocomplete="nickname" />

...

</fieldset>
</form>
```

장점:

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

- 정보를 편집할 수 있는지에 대한 혼란이 없습니다.
- 간단합니다.
- 모달 솔루션을 사용하여 값이 편집되지 않는 이유를 더 자세히 설명하고 앞으로 어떻게/왜 편집 가능해질지 설명하는 말을 추가할 수 있습니다.

단점:

- 텍스트 필드와 텍스트 상자를 `form` 요소 내에서 혼합하여 사용할 수 없습니다.
- 텍스트 상자가 돕는 기술에 의해 건너뛰어질 수 있기 때문에 form 내에 포함될 수 없습니다.
- 편집할 수 없는 컨트롤을 그룹화하는 것이 의미 없는 경우를 고려해서, 모든 사람이 이해할 수 있는 규칙을 만드는 것이 도전적일 수 있습니다.

판단:

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

이 솔루션은 텍스트 필드를 폼 밖이나 모달 안에 따로 그룹화할 수 있다면 작동할 수 있어요. 하지만 저희의 요구 사항을 충족시키기 위해서는 사용자에게 왜 정보를 편집할 수 없는지 알려주고 어떻게 해야 하는지 설명하는 정보를 추가해야 합니다. 필드 근처에 텍스트를 추가하는 것만으로 간단히 해결할 수 있어요.

만약 이 두 요구 사항이 여러분의 상황에 해당하지 않는다면, 이 솔루션은 현재 상태 그대로 여러분에게 도움이 될 수 있을 거예요.

## 3번 솔루션 조사 중: 읽기 전용 컨트롤(조정이 필요한)

`input type="text"/` 엘리먼트에 readonly 속성을 부여하여 읽기 전용으로 설정하는 것이 우리의 문제를 해결할 것 같아요, 그렇죠? 사용자가 탭할 수 있게 하고 회색 배경이 없다는 장점이 있어요. 이는 화면 낭독기 사용자와 키보드만 사용하는 사용자에게 도움이 되는 것으로 생각되지 않나요?

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

음, 그렇긴 한데 또 다른 문제가 있어요. 비활성화된 컨트롤과 유사한 문제인데요: 사용자가 텍스트 상자가 읽기 전용인 이유를 모른다는 거죠. 마찬가지로 사용자는 그게 왜 비활성화되었는지도 알지 못합니다.

텍스트 상자에 대해 정보를 전달하고 편집을 방지하기 위해 readonly 속성이 해답이 될 수 있을까요? 맞아요, 하지만 이는 텍스트 상자에만 해당돼요. 아쉽게도 버튼, 체크박스, 선택 컨트롤 및 라디오 버튼은 readonly 속성을 지원하지 않아요.

그렇다면 어떻게 이 솔루션을 활용할 수 있을까요? 우리는 다음과 같이 해야 해요:

- 사용자에게 텍스트 상자가 읽기 전용임을 알린다.
- 사용자에게 향후 텍스트 상자를 어떻게/왜 편집할 수 있는지 알려준다.
- 이들을 텍스트 상자에 프로그래밍적으로 연결시킨다.

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

So, 어떻게 컨트롤이 읽기 전용인지 알릴까요? 먼저, 다음과 같이 텍스트 상자의 레이블을 추가하는 것을 제안합니다:

```js
<label for="txtFName" id="lblFName">이름
<span aria-hidden="true">(읽기 전용)</span></label><br />
<input id="txtFName" type="text" readonly value="John" />
```

이렇게 렌더링됩니다:

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

![이미지](/assets/img/2024-05-01-Disablingtextboxeswhyitsabadideaandwhattodoinstead_4.png)

참고: 화면 판독기를 사용하는 경우 레이블에 "읽기 전용" 텍스트를 넣었지만 이것은 aria-hidden="true" 속성을 가진 `span` 요소 내부에 있습니다. 왜냐하면 화면 판독기가 포커스를 받을 때 텍스트 "읽기 전용"을 이미 알려주기 때문에 레이블에 그것을 반복할 필요가 없기 때문입니다.

텍스트 상자가 읽기 전용인 이유에 대해 전달하세요

사용성과 접근성은 종종 겹치고, 이것은 분명 그중 하나입니다. 텍스트 상자가 읽기 전용인 경우, 왜인지 설명하는 페이지의 어디에서나 설명이 있는지 확인할 수 있나요?

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

만약 사용자가 값을 변경하고 싶어하지만(또는 필요로 하지만), 어떻게 해야 하는지 모르는 상황이라면 어떨까요? 사용자의 이름이 잘못 입력되었거나 생년월일이 틀린 경우를 생각해보세요. 컨트롤은 읽기 전용입니다; 사용자는 이제 어떻게 해야 할까요? "편집(Edit)" 버튼도 없습니다. 텍스트 상자를 편집 가능하게 하는 명확한 방법이 없습니다. 아마도 누군가가 고객 지원에 문의를 할 것 같네요.

대신, 텍스트 상자 자체에 정보를 제공합시다. 이를 위해 도움말 텍스트를 사용합시다:

```js
<label for="txtFName" id="lblFName">이름
<span aria-hidden="true">(읽기 전용)</span></label><br />
<input id="txtFName" type="text" readonly value="John"
aria-describedby="descFName" /><br />
<span id="descFName" class="helptext">
이 값은 2023년 11월 1일에 개시되는 Open Season까지 변경할 수 없습니다<span hidden>.</span>
</span>
```

이와 같이 렌더링됩니다:

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

![이미지](/assets/img/2024-05-01-Disablingtextboxeswhyitsabadideaandwhattodoinstead_5.png)

스타일링은 신경 쓰지 않았어요; 이 부분은 여러분께 맡기겠습니다.

텍스트 상자에 aria-describedby 속성을 부여하고 help 텍스트 'span' 요소의 id로 설정했다는 점을 주목해주세요. 이렇게 하면 텍스트 상자가 포커스를 받으면 화면 낭독기가 help 텍스트를 읽어줍니다.

예를 들어, Chrome에서 NVDA로 볼 때 이렇게 읽힙니다:

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

부록: 도움말 텍스트 뒤에 마침표를 넣었습니다. 도움말 텍스트와 텍스트 상자의 값 사이에 일시적인 중단을 만들기 위함입니다. 오래 동안 스크린 리더를 사용해 온 사람들에게는 필요하지 않지만, (마침표는) 논리적인 구분을 제공하며, 모든 스크린 리더 사용자가 그들을 능통하게 사용할 것이라고 상정하지는 않습니다.

또한, 도움말 텍스트가 텍스트 상자가 읽기 전용인 이유만이 아니라, 어떻게(또는 이 경우에는 언제) 다시 수정 가능한지에 대해서도 안내했음을 주목해 주세요.

만약 설명을 도움말 텍스트로 충분히 간결히 작성할 수 없다고 생각된다면, "[필드 이름]을 왜 편집할 수 없는지?"라는 버튼이나 하이퍼링크를 고려해보세요. 클릭하면 이유를 명시하고 제어가 다시 편집 가능한지/어떻게 가능할지를 안내하는 작은 메시지가 표시될 수 있습니다.

여러 텍스트 상자로 옵션을 준비해 두세요.

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

### 여러 텍스트 상자가 동일한 이유로 읽기 전용인 경우, 그룹으로 묶어 `fieldset` 안에 넣고 `legend` 요소를 사용하여 이유를 설명하는 것이 최적일 수 있습니다:

```js
<fieldset>
<legend>오픈 시즌이 2023년 11월 1일에 시작될 때까지 이 필드를 변경할 수 없습니다<span hidden>.</span></legend>

<label for="txtFName" id="lblFName">이름
<span aria-hidden="true">(읽기 전용)</span></label><br />
<input id="txtFName" type="text" readonly value="John" /><br />

<label for="txtLName" id="lblLName">성
<span aria-hidden="true">(읽기 전용)</span></label><br />
<input id="txtLName" type="text" readonly value="Doe" /><br />

</fieldset>

<label for="txtNName" id="lblNName">별명</label><br />
<input id="txtNName" type="text" autocomplete="nickname" />
```

화면 읽기기는 일반적으로 해당 `fieldset` 내 첫 번째 컨트롤이 포커스를 받았을 때 `legend` 요소의 텍스트를 읽어줍니다.

다음은 실제 렌더링 결과입니다:

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

<img src="/assets/img/2024-05-01-Disablingtextboxeswhyitsabadideaandwhattodoinstead_6.png" />

NVDA 및 JAWS에서 "이름" 필드가 초점을 받을 때 Chrome에서 이것이 어떻게 읽혀지는지 살펴보겠습니다 (아래에 "[Tab]"가 보이면 사용자가 Tab 키를 누르는 것을 나타냅니다):

이 구현에 관한 몇 가지 사항:

- `fieldset` 내의 첫 번째 텍스트 상자가 초점을 받으면 `legend` 텍스트가 먼저 읽히고 한 번만 읽힙니다 (뒤에 "성" 텍스트 상자가 초점을 받았을 때 다시 읽히지 않습니다). 사용자가 `fieldset` 외부로 다시 돌아올 때 `legend`가 읽힙니다.
- 화면 판독기(NVDA 또는 JAWS)는 "별명" 필드가 초점을 받을 때 그룹화(`fieldset`)를 떠났음을 사용자에게 알려주지 않습니다.

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

장점:

- 보조 기술이 필요한 사용자와 필요하지 않은 사용자가 모두 사용할 수 있습니다.
- 사용자에게 텍스트 상자가 편집할 수 없다는 것을 알려줍니다.
- 사용자에게 텍스트 상자가 왜 편집할 수 없는지, 언제 편집 가능해지는지 알려줍니다.
- 비교적 간단합니다.

단점:

- 이 해결책은 (JavaScript 개입 없이) 텍스트 상자와 `textarea` 컨트롤에만 사용 가능합니다.
- `fieldset` 방법을 채택하고 `fieldset` 외부의 컨트롤이 포커스를 받을 때 어떤 단서도 제공하지 않으면 보조 기술 사용자에게 혼란을 줄 수 있습니다.

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

결론:

저는 이게 가능한 가장 접근성 높은 해결책이라고 말하고 싶은 건 아닙니다; 하지만 제가 조사한 바로는 (적어도 텍스트 상자에 대해서는) 최선의 해결책인 것 같아요.

비교적 간단하며, 반복 가능하며, 접근성이 좋아요.

목차로 돌아가기

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

텍스트 상자를 완전히 비활성화하는 것은 접근성이 떨어지지만 (놀랍게도) WCAG와 일치합니다.

최대 접근성을 추구하지 않고 준수를 목표로 하는 것은 자녀를 살려 둔 것만으로 부모의 일을 했다고 말하는 것과 같습니다. 가끔은 그게 당신이 할 수 있는 전부일 수도 있죠 - 이해합니다.

하지만 사용자들을 위해 최선을 다하려고 항상 노력하세요. 그들이 콘텐츠를 어떻게 소비하든 상관없이요.

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

또한, "접근 가능한" 것은 스크린 리더를 사용하는 사람뿐만 아니라 시각적인, 기억력, 실행 기능 및 인지적 도전을 겪는 사람들까지 모두를 고려해야 합니다.

그들이 내용을 소비할 수 있는 방식으로 제공해주세요.

Contents로 돌아가기

# 링크

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

- HTML에서 폼 컨트롤 비활성화하기 by Hajime Yamasaki Vukelic
- 비활성화된 버튼을 사용하지 마세요 by Tú Bùi
- WCAG
- MDN 웹 문서: Disabled 속성
- MDN 웹 문서: Readonly 속성
