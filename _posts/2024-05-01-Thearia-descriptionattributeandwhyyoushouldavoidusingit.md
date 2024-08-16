---
title: "aria-description 속성과 사용을 피해야 하는 이유"
description: ""
coverImage: "/assets/img/2024-05-01-Thearia-descriptionattributeandwhyyoushouldavoidusingit_0.png"
date: 2024-05-01 22:46
ogImage: 
  url: /assets/img/2024-05-01-Thearia-descriptionattributeandwhyyoushouldavoidusingit_0.png
tag: Tech
originalTitle: "The aria-description attribute and why you should avoid using it"
link: "https://medium.com/user-experience-design-1/the-aria-description-attribute-and-why-you-should-avoid-using-it-2ac15e7e24ae"
isUpdated: true
---




![이미지](/assets/img/2024-05-01-Thearia-descriptionattributeandwhyyoushouldavoidusingit_0.png)

# 소개

소개를 건너뛰세요.

새로운 것이 나타날 때마다, 열정적이고 심지어 선량한 개발자들은 세세한 내용을 읽지 않고 빠르게 구현할 수도 있습니다. 이제 WAI-ARIA 1.3의 First Public Working Draft에 새로운 ARIA 역할과 속성이 포함되었기 때문에 신중함이 필요합니다.

<div class="content-ad"></div>

이 기사에서는 새로운 aria-description 속성에 대해 다룰 것이며 가능하다면 사용을 피해야 하는 이유에 대해 알려드릴 겁니다.

## WAI-ARIA 1.3

WAI-ARIA는 Web 접근성 이니셔티브 — 접근 가능한 풍부한 인터넷 애플리케이션에 대한 줄임말입니다. ARIA 작업 그룹은 웹 브라우저 및 개발자들을 위해 "네이티브 호스트 언어 요소에 적용할 수 있는 역할, 상태 및 기타 속성을 포함한 보충 속성 개발을 통해 웹 콘텐츠의 접근성을 향상시키는 권고안 세트" 를 제공합니다. (출처)

2024년 1월 말 (이 기사 작성일 몇 주 전)에 ARIA 작업 그룹은 WAI-ARIA 1.3의 첫 번째 공개 작업 초안을 공개했습니다.

<div class="content-ad"></div>

W3C 권장사양이 되기까지는 아직 몇 단계가 남았지만, WCAG가 프로세스를 거치는 데 걸리는 시간만큼 길지는 않을 것 같아요.

aria-description이 최종 권장사양에 반드시 포함될 것이지만, 완료 전에 WAI-ARIA 1.3에 변경이 있을 가능성이 높습니다.

## ARIA 속성에 관한 간단한 설명

aria-description에 대해 설명하기 전에 ARIA 속성에 대한 중요한 사항을 알아야 합니다.

<div class="content-ad"></div>

- ARIA 속성은 기본 HTML 요소를 사용할 수 없을 때에만 사용해야 합니다.
- ARIA 속성은 콘텐츠가 보조 기술(AT)에서 소비되는 방식만 변경합니다. 비-AT 사용자에게는 페이지의 시각적 또는 기능적 변경이 없습니다.
- ARIA 속성을 어떻게 사용해야 하는지 확신이 없다면 사용하지 마세요. ARIA Authoring Practices Guide에 명시되어 있습니다:

## aria-description은 무엇인가요?

### aria-description을 어떻게 사용하나요?

aria-description 속성은 개발자가 보조 기술(AT) 사용자를 위해 인터랙티브 요소에 컨텍스트와 안내를 추가할 수 있게 합니다.

<div class="content-ad"></div>

개발자는 aria-label 속성이 작동하는 방식과 유사하게 aria-description 속성에 일반 텍스트를 사용할 수 있습니다:

```js
<label>예시
<input type="text" id="textExample" 
aria-description="AT 사용자에게만 
제공되는 유용한 텍스트입니다" /></label>
```

## aria-description과 aria-describedby의 차이점은 무엇인가요?

정보의 목적 자체에는 차이가 없습니다. 그저 전달 방식에만 차이가 있을 뿐입니다.

<div class="content-ad"></div>

aria-describedby 속성은 DOM에서 다른 요소(또는 요소들)를 참조하여 사용합니다. 이는 aria-labelledby 속성이 작동하는 방식과 유사합니다.

시각적으로 명백한 것을 보조 기술에게 전달하는 수단으로 자주 사용됩니다. 두 개 이상의 요소 간에 관계가 있다는 것을 나타냅니다.

도움말 텍스트의 매우 흔한 예는 다음과 같습니다:

```js
<label for="textFirstName">이름</label>
<input type="text" id="textFirstName" aria-describedby="descFirstName" />
<div id="descFirstName">최소 2자 이상</div>
```

<div class="content-ad"></div>

아래처럼 렌더링됩니다:


![내용](/assets/img/2024-05-01-Thearia-descriptionattributeandwhyyoushouldavoidusingit_1.png)

AT는 다음과 같이 읽을 것입니다:

aria-description 속성을 사용하면 개발자가 기존 요소를 할당하는 대신 일반 텍스트를 사용할 수 있습니다.

<div class="content-ad"></div>

```js
<label for="textFirstName">이름
</label>
<input type="text" id="textFirstName"
aria-description="최소 2자"/>
<div aria-hidden="true">최소: 2글자</div>
```

위와 같이 렌더링됩니다:

<img src="/assets/img/2024-05-01-Thearia-descriptionattributeandwhyyoushouldavoidusingit_2.png" />

그러나 보조 기술(AT)로는 첫 번째 예제와 동일하게 읽힙니다:

<div class="content-ad"></div>

이 예시에서 "Min: 2 chars" 도움말 텍스트는 시각적인 것 뿐이에요 - 도움말 텍스트와 텍스트 상자를 프로그래밍적으로 연결하는 것은 아무것도 없습니다. 대신 aria-description 속성을 사용하여 시각적으로 표현된 내용을 전달합니다.

## aria-description를 사용하기 전 개발자들은 무엇을 하고 있었나요?

일부 개발자들은 "비아름다운" 텍스트를 페이지에 넣는 것에 꺼렸어요. 비록 그 텍스트가 많은 사용자들에게 도움이 될지라도요.

그 대신, 그 텍스트를 시각적으로 숨기고, 프로그래밍적으로 aria-describedby로 할당했어요:

<div class="content-ad"></div>


<label for="textFirstName">이름</label>
<input type="text" id="textFirstName" aria-describedby="descFirstName" />
<div hidden id="descFirstName">2자 이상 필요합니다</div>


위 코드는 다음과 같이 렌더링됩니다:

<img src="/assets/img/2024-05-01-Thearia-descriptionattributeandwhyyoushouldavoidusingit_3.png" />

그리고 이전과 마찬가지로 AT는 다음과 같이 읽을 것입니다:

<div class="content-ad"></div>

물론, 테이블 태그를 Markdown 형식으로 변경해야 합니다.

<div class="content-ad"></div>

그러나 aria-describedby 속성을 사용할 때 개발자들이 기억해야 할 중요한 점이 있습니다. aria-describedby를 참조로 사용하는 모든 가시 요소에 aria-hidden="true" 속성이 있어야 합니다:

```js
<label for="textFirstName">이름</label><br/>
<small id="descFirstName" aria-hidden="true">최소 2자</small><br/>
<input type="text" id="textFirstName" aria-describedby="descFirstName">
```

<div class="content-ad"></div>

만약 스크린 리더 사용자가 화살표 키를 사용하여 페이지를 탐색하는 경우, `small` 요소("최소 2자 이상")에 `aria-hidden="true"` 속성이 없으면 사용자가 해당 텍스트를 두 번 듣게 될 수 있습니다: 한 번은 요소 간 이동할 때, 다른 한 번은 텍스트 상자가 포커스를 받을 때입니다.

`aria-hidden="true"`는 페이지를 통해 탐색하는 동안 요소를 읽지 못하도록 하지만, aria-describedby로 제어 요소의 설명으로 사용될 때는 여전히 읽힙니다. 또한 텍스트가 맥락을 벗어나 읽히는 것을 방지합니다.

## aria-description의 이점은 무엇인가요?

ARIA 작업 그룹은 aria-description 속성이 다음과 같은 이점을 제공할 것으로 기대합니다:

<div class="content-ad"></div>

- aria-describedby와 함께 사용되는 설명 요소가 컨텍스트를 벗어날 때 시각 장애를 가진 사용자가 발생할 수 있는 문제를 방지합니다.
- aria-describedby와 함께 사용되는 설명 요소가 두 번 읽히는 가능성을 방지합니다.
- aria-describedby 속성의 참조로 사용하기 위해 요소를 생성하는 필요성을 줄여 DOM의 크기를 줄입니다.
- aria-describedby 참조에 대한 id 속성을 생성할 필요성을 줄여 DOM에서 중복 id 값을 줄입니다.
- 개발자가 설명 텍스트를 추가할 때 aria-label 대신 aria-description을 사용하도록 유도합니다.

위의 내용에 대체적으로 동의하지만, 사용하는 데에 있어 위험이 있습니다. 이에 대해 조금 더 다루겠습니다.

## 실험: AT는 aria-description을 어떻게 읽고 다른 ARIA 속성과 어떻게 다를까요?

기본 라벨링 방법과 ARIA 라벨링 및 설명을 결합할 때 어떤 일이 벌어질까요?

<div class="content-ad"></div>

위의 혼란을 해결하려면 다음을 확인해 보세요:

```js
<label>Who’s on First?
<input type="text" aria-label="ARIA Label" 
aria-labelledby="labelledby" 
aria-describedby="describedby" 
aria-description="ARIA Description">
</label>
<span id="labelledby">Labelled By</span>
<span id="describedby">Described By</span>
```

이 마크업에는 다음이 포함되어 있습니다:

- `label` ("누가 처음일까요?")
- aria-label ("ARIA Label")
- 텍스트가 "Labelled By"인 요소를 참조하는 aria-labelledby 속성
- 텍스트가 "Described By"인 요소를 참조하는 aria-describedby 속성
- aria-description 속성 ("ARIA Description")

<div class="content-ad"></div>

노트: 절대로 이렇게 하지 마세요. 이것은 테스트 목적으로만 사용됩니다.

AT가 무엇을 읽을지 추측할 수 있나요?

다섯 개의 라벨과 설명 중 세 개가 읽히지 않는 것을 보실 수 있습니다. 이는 AT가 ARIA 속성에 대한 규칙 때문입니다. 이 규칙은 다음과 같습니다:

- AT는 `aria-label`이 있으면 `label` 요소를 무시합니다.
- AT는 `aria-labelledby` 속성이 있는 경우 `label` 요소와 aria-label 속성을 모두 무시합니다.
- AT는 `aria-describedby` 속성이 있는 경우 `aria-description` 속성을 무시합니다.

<div class="content-ad"></div>

따라서, 이러한 속성은 모두 동시에 사용될 때에는 aria-labelledby 및 aria-describedby 속성만 보조 기술에서 사용되며, 나머지는 무시됩니다.

ARIA 속성을 사용할 때 이 사실을 명심해 주세요.

## "Description"이란 중요한 키워드입니다

레이블과 설명 사이에는 차이가 있습니다.

<div class="content-ad"></div>

라벨이라는 것은 "이것은 무엇인가요?"라는 질문에 답합니다.
설명은 "이것을 어떻게 사용해야 하며" 혹은 "이것에 대해 알아야 할 사항은 무엇인가요?"라는 질문에 답합니다.

그러니 labeling 속성으로 aria-description이나 aria-describedby를 사용하지 마세요.

## aria-description을 어떻게 사용해야 하나요?

트위터/X 게시물 하단의 버튼을 살펴보세요:

<div class="content-ad"></div>

<img src="/assets/img/2024-05-01-Thearia-descriptionattributeandwhyyoushouldavoidusingit_5.png" />

이 소스 코드에는 Replies 버튼에 대한 (매우 줄인) 마크업이 있습니다:

```js
<div aria-label="3284 Replies. Reply" 
role="button" tabindex="0" >
<!-- 다수의 중첩된 요소 -->
</div>
```

보조 기술(AT)이 읽는 내용:

<div class="content-ad"></div>

이 경우에는 Twitter 개발자들이 설명 정보를 전달하기 위해 레이블 속성(aria-label)을 사용하고 있습니다. 게다가, 설명 정보("3284 Replies")는 실제 레이블 텍스트("Reply")보다 먼저 읽힙니다.

기억하세요, 컨트롤의 식별/목적(즉, 레이블)이 가장 중요한 정보이므로, 보조 기술에서 먼저 읽혀져야 합니다.

다른 지원 또는 문맥 정보(즉, 설명)는 그 다음에 읽혀져야 합니다.

도움이 된다면, 사용자와 보조 기술 간의 대화로 생각해보세요.

<div class="content-ad"></div>

그래서 더 나은(비록 완벽하지 않은) 구현은 다음과 같이 보일 것입니다:

```js
<div aria-label="답글"
aria-description="3284개의 답글" 
role="button" tabindex="0" >
<!-- 여러 단계로 중첩된 요소들 -->
</div>
```

참고: 이는 조금 더 나은 결과를 얻기 위해 가능한 한 작은 변경만을 가한 사례 중 하나입니다. role과 aria-label 속성을 사용하는 대신에 실제 `button` 요소로 되어있고 고유한 텍스트를 가지는 것이 좋습니다.

AT는 이렇게 읽을 것입니다:

<div class="content-ad"></div>

# aria-description 사용을 피해야 하는 이유

혹시 aria-description에 대해 흥분하고 계신가요? 지금까지 글을 읽어보고 모든 것이 멋진 것 같아요 — 페이지를 혼잡하게 만들지 않고도 설명 텍스트를 추가할 수 있는 간단한 해결책을 기다리고 계셨군요.

드림이 꺼지지 않도록 해드리겠지만, 가능하다면 aria-description을 피하는 것을 권장합니다.

버튼 비활성화, 텍스트 상자 비활성화, 텍스트 상자에 자리 표시자 사용과 같이 절대 하지 말아야 할 일들을 언급했던 것처럼 "절대"라고 말씀드릴 순 없지만 (이에 대한 링크는 아래에 있습니다), 적어도 제가 보기에는 aria-description의 사용 사례는 상당히 적다고 생각합니다.

<div class="content-ad"></div>

![Thearia-descriptionattributeandwhyyoushouldavoidusingit_6](/assets/img/2024-05-01-Thearia-descriptionattributeandwhyyoushouldavoidusingit_6.png)

## 위험 #1: aria-description은 비대화형 요소에서 작동하지 않습니다

aria-describedby, aria-label 및 aria-labelledby도 마찬가지입니다. 그러나 이것이 개발자들을 `span` 또는 `div` 요소에 사용하는 것을 막지는 못했습니다. 이러한 특성 중 하나를 AT에 작동하도록 만들려면 버튼 또는 텍스트 상자와 같은 대화형 요소 역할을 부여하고 tabindex="0" 속성을 부여해야합니다.

… 또는 처음부터 해야했던 것을 할 수도 있습니다: `input` 또는 `button`과 같은 기본 HTML 컨트롤을 사용하십시오. 이것은 대부분의 추측 작업을 제거합니다.

<div class="content-ad"></div>

## 주의 #2: aria-description 값은 다른 언어로 번역되지 않습니다

aria-describe도 마찬가지입니다. 이것을 테스트해보세요:

- 다음 URL로 이동하세요: https://a11ysupport.io/tests/html/aria/aria-description.html (무엇을 번역해야 하는지 확인하기 위해).
- Google 번역(https://translate.google.com/)에 들어가세요.
- 텍스트 상자에 https://a11ysupport.io/tests/html/aria/aria-description.html을 입력하세요. (절대 필요없는 placeholder/플로팅 레이블 사용 자제해주세요).
- 영어 이외의 언어를 선택하세요 (오른쪽에 있는). 제 예시에서는 스페인어를 선택했습니다.
- 화면 리더 (JAWS, NVDA, VoiceOver, 또는 Narrator)를 실행하고, 예시 1에 대한 텍스트 상자("Etiqueta de ejemplo"라벨이 붙은)가 포커스되었을 때 읽히는 내용을 들어보세요.

![이미지](/assets/img/2024-05-01-Thearia-descriptionattributeandwhyyoushouldavoidusingit_7.png)

<div class="content-ad"></div>

NVDA에서는 "예제 레이블 편집 오류: 78 빈칸"이라고 읽습니다.

해당 번역된 텍스트 상자의 마크업은 다음과 같습니다 (관련 없는 부분은 제거했습니다):

```js
<label for="target">
예제 레이블
</label>
<input id="target" type="text"
aria-description="error: 78">
```

그래서, Google 번역은 텍스트 상자의 레이블을 스페인어로 변경했지만 aria-description 값은 변경하지 않았습니다. 다시 말하지만, aria-describedby에서도 동일한 일이 발생할 것이며, 심지어 aria-label 번역도 불안정할 수 있습니다. Adrian Roselli의 "aria-label 번역되지 않습니다"라는 기사에서 언급한 것처럼:

<div class="content-ad"></div>

## 위험 요소 3: 실수하기 쉽습니다

aria-describedby 속성 대신 aria-description을 사용하는 이점 중 하나는 aria-describedby가 일반적으로 페이지에서 보이는 요소를 참조한다는 것입니다. 페이지에 표시되는 경우 맞춤법과 문법 오류를 감지하기가 더 쉽습니다.

AT 사용자에게 제공하는 텍스트가 마크업에서만 있고 페이지에 표시되지 않는 경우 실수하기 쉽습니다.

## 위험 요소 4: 시각 장애가 없는 사용자가 중요한 정보를 놓칠 수 있습니다

<div class="content-ad"></div>

aria-description을 올바르게 활용하면 보조 기술을 사용하는 사용자에게 비장애인 사용자가 접근할 수 있는 동일한 유용한 정보를 제공하는 것을 의미합니다.

그러나 선의를 가진 개발자는 시각이 있는 사용자에게 제공되는 정보보다 aria-description 속성에 더 많은 정보를 포함할 수 있습니다. 그 정보 중 일부는 시각이 있는 사용자에게 유용할 수 있으며, 개발자는 시각적으로 해당 정보를 페이지에 포함해야 합니다.

접근성은 스크린 리더 사용자만을 위한 것이라고 가정하지 마십시오.

만약 해당 정보가 모든 사용자에게 유용하다면, 모든 사람이 인지할 수 있도록 페이지에 표시해야 합니다.

<div class="content-ad"></div>

# 결론

aria-description을 사용하는 데는 위험이 있지만, 절대 사용하지 말아야 하거나 존재해서는 안 된다는 의도는 전혀 아닙니다.

책임을 지고 적절하게 사용할 수는 있지만, 이전 글에서 언급한 대로 개발자들이 기본적인 접근성 관행조차 잘못 적용하는 사례가 늘어나고 있다는 사실도 알아두어야 합니다.

따라서, 개발자들이 해당 책임을 다 할 수 있는지에 대해 의문이 듭니다.

<div class="content-ad"></div>

마지막으로, aria-description 및 기타 ARIA 속성은 마지막 수단으로 사용해야 합니다.

페이지를 작고 간단하며 이해하기 쉽게 유지하세요.
가능하다면 기본 HTML을 사용하세요.

테스트하세요. 다시 테스트하세요. 보조 기술에 의존하는 사용자들과 함께 테스트하세요. 반복하세요.

# 링크

<div class="content-ad"></div>

## 기사에서 언급된 내용

- WAI-ARIA 1.3
- ARIA 작업 그룹
- ARIA 작성 가이드
- A11ySupport.io aria-description 테스트
- 구글 번역
- 에이리아-레이블 번역되지 않음 by 에이드리언 로젤리

## 더 읽어볼 만한 내용

- 접근성은 어려워요 — 조심스럽게 ARIA 레이블을 사용해야 합니다! by Attila Vágó
- Aria-description: 대중 요청으로 철없는 박수가 준다 by Steve Faulkner
- MDN WebDocs: aria-description

<div class="content-ad"></div>

## 내 관련 기사들

- 우리는 모두 웹에 부끄러워해야 합니다: WebAIM의 2023 접근성 보고서
- 텍스트 상자에 플레이스홀더를 사용하지 말아야 하는 이유
- 절대 버튼을 비활성화하지 마십시오 — 왜 그런가요?
- 텍스트 상자를 비활성화하는 것: 왜 나쁜 생각이고 대신 어떻게 해야 하는지