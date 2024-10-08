---
title: "접근성을 위해 버튼을 절대 비활성화면 안되는 이유"
description: ""
coverImage: "/assets/img/2024-05-01-NevereverdisablebuttonsWhynot_0.png"
date: 2024-05-01 23:13
ogImage:
  url: /assets/img/2024-05-01-NevereverdisablebuttonsWhynot_0.png
tag: Tech
originalTitle: "Never, ever disable buttons — Why not?"
link: "https://medium.com/user-experience-design-1/never-ever-disable-buttons-part-1-why-not-73d16a0fb32b"
isUpdated: true
---

## 사용 불가능한 컨트롤

![이미지](/assets/img/2024-05-01-NevereverdisablebuttonsWhynot_0.png)

# 내용

버튼을 비활성화하는 문제

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

**이 섹션에서는 버튼을 비활성화하는 것이 사용자에 대한 나쁜 해결책인 이유에 대해 이야기하겠습니다. 이에는 홍보되는 소통 부족 및 특정 사용자들이 인식할 수 없는 점이 포함됩니다.**

**이의 반박**

**비활성화된 버튼을 금지하는 것에 대한 일반적인 이의에 대해, WCAG의 입장, 특수 사용 사례, 오류 방지 등을 논의할 것입니다.**

**결론**

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

링크

## 비활성화된 버튼의 문제점

![Image](/assets/img/2024-05-01-NevereverdisablebuttonsWhynot_1.png)

**사용자:** "왜 비활성화되었죠?" **개발자:** "그건 당신의 문제죠."

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

버튼을 비활성화하는 데는 접근성 문제가 있을 수 있습니다(우리가 나중에 살펴볼 것이지만), 보조 기술(AT)을 의존하지 않는 사람들에게도 안좋은 메시지를 전달하고 있다고 생각해요.

버튼을 비활성화하면 사용자에게 어떤 메시지를 전달하고 있을까요?

친애하는 사용자님:

- "이 버튼은 지금 작동하지 않지만, 왜 그런지 알 수 있어야 합니다."
- "이 버튼은 지금 작동하지 않지만, 앞으로 작동할지에 대해 알려주지 않겠습니다."
- "이 버튼이 비활성화된 이유는 당신의 문제입니다."

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

당신이 명백하게 이런 생각을 하지는 않겠지만, 그게 당신이 전달하고 있는 바입니다 — 또는 적어도, 그게 고객이 당신이 전달하고 있는 것이라고 생각하는 것입니다. 그것이 정말 중요한 부분이죠.

또한 사용자에게 생각하고, 추측하고, (결국) 도움을 요청하도록 강요하고 있습니다. 그리고 이전 글에서 언급한 대로, 그건 안 되는 일입니다.

Hampus Sethfors가 "비활성화된 버튼은 최악입니다" 라는 제목의 글에서 쓴 것을 보면:

사용자가 일반적으로 할 수 있는 작업을 수행하지 못하도록 하려면, 사용자가 알아야 하는 정보가 필요합니다:

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

- 그들은 그 행동을 할 수 없습니다.
- 그들이 그 행동을 왜 할 수 없는지
- 그들이 그 행동을 하려면 어떤 단계를 (적용할 수 있는 경우) 취할 수 있는지

버튼을 비활성화하는 것은 사용자에게 아무것도 알려주지 않습니다.

![버튼 비활성화](/assets/img/2024-05-01-NevereverdisablebuttonsWhynot_2.png)

## 스크린리더 사용자: "어떤 버튼?" 개발자: "여기 있어요. 보이지 않나요?"

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

버튼을 비활성화하면 보조 기술을 사용하는 많은 사용자들에게 숨겨지기 때문에요.

버튼을 비활성화하면 탭 순서에서 제외됩니다. 따라서, 이는 결국 버튼을 숨기는 것과 같은 효과를 줄 수 있어요.

보조 기술 사용자들의 관점에서 보면, 이는 작동하지 않는 양식으로 보입니다.

세 개의 필수 필드가 있는 양식이 있다고 가정해봅시다. 세 필수 필드에 값이 모두 입력되었을 때에만 제출 버튼이 활성화되도록 하는 멋진 자바스크립트가 있다고 해봅시다.

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

AT(AT) 사용자가 양식 중 하나에 아무 내용도 입력하지 못한 채 실수로 양식을 완료한다고 생각합니다. 그 후:

- Tab 키를 누릅니다 — 제출 버튼이 비활성화되어 있어 전혀 무시됩니다. 이제 사용자는 양식 외부에 있을 수도 있습니다.
- "f" 키를 누릅니다(JAWS 및 NVDA 스크린 리더의 다음 양식 컨트롤로 이동하는 키) — 제출 버튼이 비활성화되어 있어 "사용 불가"로 읽힐 것입니다. 사용자는 그 이유를 알지 못할 것입니다.
- Enter 키를 누릅니다 — 아무 일도 일어나지 않습니다.

이것은 AT 사용자를 전혀 고려하지 않은 매우 흔한 디자인 패턴입니다.

다음은
제임스 칼튼
의 "UI 함정: 비활성화된 버튼 및 입력란"이라는 기사에서 쓴 내용입니다.

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

## 색각 이상이 있는 사용자: "버튼이 비활성화돼있어?" 개발자: "네! 못 봤어?"

버튼을 비활성화하면 색상 지각에 어려움을 겪는 사용자들에게도 문제가 발생합니다. 시각적으로 말하자면, 버튼을 비활성화하면 색상만 바뀌고 다른 것들은 변경되지 않습니다.

만약 사용자가 비활성화된 "제출" 버튼을 클릭하고 비활성화되어 있다는 사실을 알지 못한다면, 페이지는 사용자에게 그들이 해당 작업을 수행할 수 없음을 충분히 전달하지 못한 것입니다 (#1 위).

버튼이 비활성화되어 있는 것을 충분히 전달하는 방법에 대해 궁금하시다면, 이 기사의 제목을 다시 읽어보시라고 제안합니다: "절대로, 절대로 버튼을 비활성화하지 마세요."

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

# 이의에 대한 대답

그래서, 제 입장은 이렇습니다: 버튼을 비활성화하지 마세요... 절대로.

이의가 충분하게 제시될 것이라고 확신합니다. 그래서 가장 흔한 이의에 대해 언급하겠습니다.

## 이의 #1: WCAG는 허용한다고 말합니다.

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

이의가 SC 1.4.3에 해당하는 것으로 추정합니다: 최소 대비:

문제가 되는 텍스트는 "비활성 사용자 인터페이스 구성 요소의 일부인 텍스트 또는 이미지...대비 요구 사항이 없습니다."라고 적힌 부수적 섹션입니다.

WCAG가 이 법적 규정을 남겨 놓은 이유와(SC 1.4.1의 색상 사용 철학과 어떻게 불일치하는지)에 대해 자세히 설명하지는 않겠습니다. 그러나 제가 이전에 쓴 기사에서 (아래 링크 참조)와 같이 준수는 접근성과 동일하지 않다는 점을 기꺼이 지적할 것입니다.

그것들을 "지침"이라고 부르는 이유가 있습니다. WCAG를 최소한의 기준으로 간주하세요. 만약 귀하의 목표가 접근성이라면, 버튼을 비활성화하지 마세요.

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

## 이의 제기 #2: 비활성화된 버튼이 필요한 특별한 사용 사례가 있어요

아니에요, 그렇지 않아요.

더 접근성 있는 방법으로 처리할 수 없는 시나리오는 들어보지 못했어요. 그런 상황이 있다면 제게 알려주세요.

결국 사용자가 당신처럼 웹을 활용하고 생각한다고 가정하거나 접근성 해결책을 위해 필요한 작업을 하지 않고자 하는 것으로 보입니다.

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

"테이블이 첫 번째 페이지나 마지막 페이지에 있을 때 페이지네이션 버튼을 어떻게 처리해야 할까요?"
버튼을 비활성화하는 방법을 사용하지 않고도 접근성 있는 해결책이 있습니다.

"제출 버튼을 더블 클릭하는 것을 방지하는 방법은 무엇인가요?"
이를 방지하기 위해 JavaScript만 사용한다면, 접근성만 문제가 아닙니다.

## 이의 제기 #3: 버튼 비활성화는 사용자가 잘못된 데이터를 입력하는 것을 방지합니다

그래서 유효성 검사를 하는 것입니다."

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

그리고, 버튼을 비활성화하는 것은 잘못된 데이터가 있음을 사용자에게 전달하지 않는다. 사용자의 관점에서는 당신의 양식이 망가졌다고 생각할 수도 있어요.

최근에 웹사이트에서 사진을 주문했던 적이 있어요. 모든 올바른 정보를 입력했는데도 (여러 번 확인했어요) 어쩌다가 "주문하기" 버튼이 비활성화되어 있었어요.

오류 메시지가 표시되지 않았고, 왜 비활성화되어 있는지 알려주는 텍스트도 없었어요 — 그냥 비활성화되어 있었어요. 그래서 모든 좋은 개발자처럼 소스를 수정해서 비활성 속성을 제거하고 주문을 넣었더니 잘 처리되었어요. 유효성 검사도 없었고, 오류도 없었어요.

그러니 보안이나 잘못된 입력을 위한 문으로서 비활성화된 버튼을 사용하지 마세요. 유효성 검사가 해야 할 역할을 하도록 두세요.

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

## 이의 제기 #4: 버튼을 비활성화하고 툴팁을 제공하지 않으면 안 되나요?

툴팁을 어떻게 시각장애(AT) 사용자가 인식할까요?

우선, 버튼을 비활성화해서는 안 된다는 이유 중 하나에 다시 돌아왔습니다: 모든 사용자가 인식할 수 없습니다.

title 속성을 사용할 때 대상 컨트롤이 포커스를 가지거나 사용자가 마우스 커서를 올리는 경우에만 작동한다는 것을 말하는 건가요?

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

수비된 컨트롤은 초점을 받지 않습니다. 스크린 리더 사용자인 경우는 물론, 초점을 받지 않는 상태에서 사용자가 해당 텍스트를 인지할 수 없습니다.

![버튼 비활성화 이미지](/assets/img/2024-05-01-NevereverdisablebuttonsWhynot_3.png)

그리고 버튼 주변에 해당 버튼이 왜 비활성화되었는지 설명하는 텍스트가 있다면, 동일한 규칙이 적용됩니다. 스크린 리더 사용자는 그 텍스트를 어떻게 인지할까요? 아마도 당신은 버튼에 aria-describedby 속성을 사용하여 그 텍스트 요소의 id 값을 제공한 것일 것입니다. 하지만 (한 번 더 말하지만) 이 방법은 버튼이 초점을 받아야만 작동하며, 비활성화된 버튼은 그렇지 않습니다.

## 이의제기 #5: "F" 키를 사용하는 AT 사용자는 버튼을 여전히 인지할 수 있습니다.

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

네, 그 말이 맞아요.

"키보드 단축키"를 이용할 때 JAWS 및 NVDA에서는 "f" 키가 다음 양식 컨트롤을 나타내는 단축키입니다 (VoiceOver의 경우 [VoiceOver 키] + Command + J입니다).

하지만 이의를 제기하는 것은 AT(AT-Assistive Technology) 사용자가 웹 페이지를 어떻게 소비하거나 AT를 사용하는지를 가정한다는 것 아닐까요? 어떤 사람들은 Tab을 사용하고, 어떤 사람들은 다음 양식 컨트롤로 이동하는 키를 사용하며, 또 다른 사람들은 다른 키를 사용할 수도 있습니다.

또한, 색각 이상 사용자도 있습니다. 그들은 여전히 몇 번 클릭하지 않고는 버튼이 비활성화되었음을 감지하지 못할 것입니다 — 이것이 고장났다고 결론을 내리지 않는다고 가정합니다.

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

## 이의 제기 #6: 유용한 솔루션에 시간이 없어요. 버튼 비활성화는 빠르고 간편하며 대다수 사용자에게 문제를 해결해줍니다.

그래서 시간이 소중해요? 누구의 시간이요? 사용자들의 시간은 소중하지 않나요?

어떤 것들을 위해 얼마나 많은 루프를 돌릴 건가요? 완벽한 모서리가 둥근 세련된 UI, 만족스러운 전환 효과, 눈을 즐겁게 하는 폰트들을 얻기 위해서는요? 모바일 친화적인 인터페이스는 어떻게 하는 거에요?

네, 버튼에 비활성 속성을 덧붙이는 것보다 더 많은 작업이 필요해요. 하지만, 여러분이 제공하는 더 다양한 유용한 솔루션들이 있다면, 앞으로 유용한 솔루션들을 만드는 것이 더 쉬워질 거에요.

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

## 반론 #7: 접근 가능한 솔루션이 추한 것일 것이다

어떤게 더 좋을까요: 추한 작동 페이지인가요, 예쁘지만 망가진 페이지인가요?

버튼을 비활성화하면 AT 사용자에게는 페이지가 깨졌다고 볼 수 있습니다. 그 순간에는 예쁜 페이지가 무슨 차이를 만들까요?

그리고, 내가 아는 대부분의 UX 전문가들은 도전을 좋아해요. 이것을 도전으로 만들어 보세요: 추하지 않은, 사용하기 쉬우면서 접근 가능한 솔루션을 찾아보세요.

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

## 이의 제기 #8: 버튼 비활성화는 세기 전환 이후에 흔했던 관행입니다

네... 맞아요.

그때 HTML 태그에는 모두 대문자를 사용했습니다. 그래도 바뀌었죠?

```js
<P CLASS="retro">그렇죠, 바뀌었어요.</P>
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

"늘 그래왔으니까"는 흔한 변명은 하지 않겠어요. 게다가 이것으로는 접근성 문제를 해결할 수 없어요.

옛날 나쁜 습관은 그만두자구요.

# 결론

나한테 '해결책을 제시하지 않았다'는 댓글을 보내시기 전에, 네 말이 맞아요. 그렇게 하면 기사가 아주 길어지겠죠. 그래서 이것은 Part 1입니다. 차기 기사에서는 버튼 비활성화에 대한 접근 가능한 대안을 살펴볼 거에요.

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

제가 빠뜨린 이의사항이 있으면 알려주세요. 접근성 문제를 초래시키는 문제에 비해 버튼을 비활성화하는 좋은 이유를 아직 발견하지 못했습니다.

우리는 우리와 같은 사람들을 위해 개발하는 것을 그만두어야 합니다. 아마도 대신 각 사용자 그룹 - 또는 웹 페이지를 소비하는 데 사용되는 각 유형의 도구 - 에 대해 생각해볼 필요가 있습니다. 이에는 전형적인 시각적 사용자, 키보드 전용 사용자, 색맹 사용자, 스크린 리더 사용자 등이 포함됩니다.

다음은 각각의 버튼을 비활성화하는 것이 무엇을 하는지에 대한 설명입니다:

- 전형적인 사용자: 버튼이 비활성화되었어요. 왜 그런 건지 모르겠네요? 제가 뭔가 잘못한 것 같은데, 무엇이죠?
- 키보드 전용 사용자: 버튼에 접근할 수 없어요. 비활성화되었겠죠. 왜 그런지 모르겠네요?
- 색맹 사용자: 버튼을 클릭하고 있지만 아무 일도 일어나지 않아요. 비활성화되었건가 고장났나요? 누가 알겠어요?
- 스크린 리더 사용자: 버튼이 어디 있죠?

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

끝으로 버튼을 비활성화함으로써, 한 그룹의 사용자(전형적인 시각 장애가 없는 마우스/키보드 사용자)에게 웹 페이지 이용 방법에 대한 정보를 제공하지만 다른 그룹(AT 사용자)에게는 그 정보를 제공하지 않고 숨기게 됩니다.

습관을 깨는 게 참 괴롭다는 건 알아요, 특히 쉬운, 오랜 습관의 경우 더 그렇죠. 하지만 우리는 사용자들에게 제대로 된 서비스를 제공할 필요가 있어요... 모든 사용자에게요.

여기 [Part 2]가 있어요: 절대로 버튼 비활성화하지 말아야 하는 이유 — 접근성 솔루션을 위한 요구사항.

여기 [Part 3]가 있어요: 절대로 버튼 비활성화하지 말아야 하는 이유 — 더 많은 접근성 대안들.

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

# 링크

## 언급된 글들

- Disabled buttons suck by
  Hampus Sethfors
- UI Traps: Disabled Buttons and Inputs by
  James Carleton

## 추가로 읽어볼 만한 글들

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

- 비활성 버튼의 대비 수준은 어떻게 되어야 할까? by Giulia Alfarano
- 버튼을 비활성화하지 마세요 by Chris Ferdinandi
- 비활성 버튼을 '회색으로 표시'하는 것이 괜찮은가요? by H Locke

## 내 연관 기사

- 제2부: 절대로 버튼을 비활성화하지 마세요 — 접근성 있는 솔루션을 위한 요구 사항
- 제3부: 절대로 버튼을 비활성화하지 마세요 — 더 많은 접근 가능한 대안
- 텍스트 상자의 비활성화: 좋지 않은 아이디어 및 그 대안
- 접근성은 오해되고 있습니다 — 이를 수정합시다
- 만족시켜야 할 요구 사항으로서의 접근성 전달, 규칙으로 따라야 할 것이 아닙니다
