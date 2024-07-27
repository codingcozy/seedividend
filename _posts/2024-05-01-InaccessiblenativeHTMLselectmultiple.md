---
title: "HTML에서 접근성을 준수하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-InaccessiblenativeHTMLselectmultiple_0.png"
date: 2024-05-01 23:07
ogImage: 
  url: /assets/img/2024-05-01-InaccessiblenativeHTMLselectmultiple_0.png
tag: Tech
originalTitle: "Inaccessible native HTML: <select multiple>"
link: "https://medium.com/user-experience-design-1/inaccessible-native-html-select-multiple-ec19c7bd67e7"
---


## 접근하기 어려운 HTML

![이미지](/assets/img/2024-05-01-InaccessiblenativeHTMLselectmultiple_0.png)

아마도 많은 접근성 옹호자(그 중 한 명이 바로 저입니다)로부터 들어왔을 것입니다. 제 3자 UI 프레임워크 및 라이브러리의 사용을 피하거나 최소화해야 한다는 제의를 말이죠. 우리는 항상 네이티브 HTML을 사용하는 것이 좋다고 말하는 것입니다. (어떤 홈-롤드, ARIA가 풍부한 div와 span rave 대신)

거의 항상 말이죠.

<div class="content-ad"></div>

일부 네이티브 HTML 구현은 사용이 어려운 경우가 있습니다. 이 기사는 `select multiple` 요소에 초점을 맞출 것입니다.

## 작동 방식

`select multiple` 요소의 아이디어는 사용자가 그룹화된 체크박스 목록과 유사하게 제어를 위해 여러 옵션을 선택할 수 있다는 것입니다.

그러나 이 기능이 사용하기 어렵다는 것뿐만 아니라 사용자 친화적이지도 않다는 것을 알게 될 것입니다. 아래는 마크업입니다:

<div class="content-ad"></div>

```js
<label for="lbmPets">애완동물</label>
<select id="lbmPets" multiple>
  <option>강아지</option>
  <option>고양이</option>
  <option>고슴도치</option>
  <option>뱀</option>
  <option>조랑말</option>
  <option>암석</option>
</select>
```

위의 마크업은 이렇게 렌더링됩니다:

![애완동물 선택 창](/assets/img/2024-05-01-InaccessiblenativeHTMLselectmultiple_1.png)

그 multiple 속성이 설정되어 있어서, 사용자는 여러 애완동물을 선택할 수 있습니다. 사용자가 어떻게 여러 옵션을 선택할 수 있나요?

<div class="content-ad"></div>

## 마우스를 사용하여 여러 개 선택하기

만약 마우스만 사용한다면, 연속적인 옵션들만 선택할 수 있습니다. "개"와 "고슴도치"와 같이 연속되지 않는 옵션을 선택하려면, 행운을 빌어야 합니다. 내가 알기로는, 그것은 마우스만을 사용하면 불가능합니다.

## 마우스와 키보드를 사용하여 여러 개 선택하기

마우스와 키보드를 사용하여 연속적이고 비연속적인 옵션들을 선택할 수 있습니다. 연속적인 항목을 선택하려면, 선택하고자 하는 범위의 한쪽 끝을 선택한 뒤 Shift 키를 누른 채로 다른 끝에 해당하는 옵션을 클릭하면 됩니다:

<div class="content-ad"></div>


![이미지](https://miro.medium.com/v2/resize:fit:804/1*JuD893iR1NkC9p47BgPVXw.gif)

비연속 항목을 선택하려면 하나의 옵션을 선택하고 Ctrl 키를 누른 채로 다음 옵션을 클릭한 후 필요한 만큼 반복하세요:

![이미지](https://miro.medium.com/v2/resize:fit:804/1*9RnOj1NxOyKCm34LmTE36g.gif)

## 키보드만으로 여러 항목 선택

<div class="content-ad"></div>

키보드만 사용하면 마우스 클릭 대신 스페이스 바를 사용하여 동일한 작업을 수행할 수 있어요. 선택 상태를 전환하고 포커스를 조정하는 데 약간 까다로울 수 있지만 가능해요:

![demo](https://miro.medium.com/v2/resize:fit:804/1*_OODTheBxFKunrqslpacqg.gif)

## 독자 도전 과제

여러분에게 도전 과제가 있어요: 아래 데모를 사용하여 한 손으로 여러 비연속 옵션을 선택해 보세요.

<div class="content-ad"></div>

https://jsfiddle.net/6azcb2hu/

이것을 할 수 있었나요?

다른 HTML 요소들과 비교하면 이것은 상당히 어려울 것입니다. 나는 키보드만을 사용하여 손이 어색하게 Ctrl 키, Space 바 및 화살표 키에 손을 뻗어야만 성공했어.

문제가 보이나요?

<div class="content-ad"></div>

아직 보조 기술에 대해 언급하지 않았네요.

## 보조 기술이 있는 select multiple 컨트롤

그렇다면 보조 기술(AT)을 사용할 때는 어떨까요? 앞서 설명한 것처럼 비-AT 사용자가 겪는 제약 사항과 동일한 제한 사항이 있습니다. 또한 이전에 선택한 옵션을 기억해야 합니다.

예를 들어, `select multiple` 컨트롤이 포커스를 가지면 사용자에게 레이블의 텍스트, 현재 선택된 옵션의 텍스트, 해당 옵션이 위치한 위치(예: "6개 중 2개"), 및 해당 옵션이 선택되었는지에 대한 정보를 전달합니다.

<div class="content-ad"></div>

그러나 해당 컨트롤이 포커스를 잃으면, 다시 포커스를 받을 때 선택된 옵션을 확인할 방법이 없다고 보입니다. 컨트롤이 다시 포커스를 받으면 주로 레이블 텍스트와 현재 선택된 옵션이 소개됩니다.

여기서 위쪽 또는 아래쪽 화살표 키를 누르면 모든 옵션이 선택 취소됩니다. 이것만으로도 이 컨트롤이 일회용 컨트롤임을 의미합니다. 시각장애를 가진 사용자가 이 페이지로 돌아가면 옵션을 다시 선택해야 합니다.

결국, 시각 보조 기기에 대해 이 컨트롤은 가치 있는 것보다 오히려 나쁜 영향을 미칩니다.

# 이제 어떻게 해야 할까요?

<div class="content-ad"></div>

## 왜 이것이 문제인가요?

이것은 문제입니다. 왜냐하면 이 컨트롤의 사용 가능한 기능 부족, 보조 기술 지원 및 사용자 정의 가능성이 개발자들을 보통 접근성을 별로 고려하지 않거나 대충 처리하는 써드파티 라이브러리에 의존하도록 유도하기 때문입니다.

Select2 및 SumoSelect와 같은 써드파티 콤보박스 라이브러리는 다중 선택 동작을 가능하게 하며 개발자들이 찾는 많은 기능과 사용자 정의 가능성을 제공하지만, 두 가지 라이브러리 (그리고 다른 라이브러리들)도 각자의 접근성 문제를 가지고 있습니다.

## 해결책은 있을까요?

<div class="content-ad"></div>

그래서, 무엇을 할 수 있을까요?

W3C 내부의 커뮤니티 그룹인 OpenUI가 있습니다. "HTML, CSS, JS 및 Web API를 결합하여 웹 개발자가 현대적인 맞춤형 사용자 인터페이스를 만들 수 있는 기술을 제공하기 위한 더 큰 아키텍처 계획을 용이하게 하는 것을 목표로 합니다." (출처)

간단히 말해, 그들은 W3C에서 검토하고 채택(또는 그렇지 않음)되는 표준을 제안합니다.

그 중 하나의 제안은 'selectlist'라는 요소입니다. 이는 'select' 요소보다 훨씬 많은 사용자 정의 및 확장 기능을 제공하며, 관련 텍스트 삽입, 아이콘 추가, 스타일링 및 기타 몇 가지 기능을 제공합니다.

<div class="content-ad"></div>

하지만 이게 접근 가능한건가요?

음, 아니요. 전혀 아닙니다.

사실, 데모 페이지에서 일부 컨트롤에 키보드로 액세스할 수조차 없습니다. 직접 테스트하려면 실험적인 웹 플랫폼 기능을 허용하는 브라우저 설정을 변경해야 합니다. 지침은 데모 페이지에 나와 있어요.

하지만... 노트에 적혀 있는대로:

<div class="content-ad"></div>

그래서, 본질적으로는 작동 컨셉이지만 접근성이 거의 구현되지 않은 상태입니다. 이 요소(또는 그 변형)이 채택되면, 접근성의 기본적인 구현을 보장하기 위해 엄격한 검토를 거쳐야 할 것입니다.

해당 요소는 WHATWG의 Github에서 이슈로 제안되었으며, 본 문서 작성 시점에서 아직 오픈 상태입니다.

## 그럼 그 전까지는 어떻게 할까요?

제 생각이 틀리지 않았다면, `selectlist`가 곧 구현될 것으로 생각하기는 어렵습니다(혹시 그렇게 되더라도). 그래서 기다리는 것은 좋은 선택이 아닙니다. 심지어 내일 구현된다 해도 브라우저 지원이 느릴 가능성이 높습니다.

<div class="content-ad"></div>

한편, 여러 가지 옵션이 있습니다.

옵션 1: 여러 개의 체크박스 사용

많은 잠재적 선택 옵션이 있는 경우 이 방법이 맞지 않을 수 있습니다. 그러나 몇 개의 옵션이 있는 경우 그룹화된 체크박스를 사용하는 것이 완전히 적합합니다 (그리고 접근성이 좋습니다).

체크박스를 그룹화하기 위해 `fieldset`와 `legend`를 사용하는 것을 권장합니다 (ARIA나 역할 속성은 필요하지 않습니다):

<div class="content-ad"></div>

```js
<fieldset>
<legend>Pets</legend>
<label><input type="checkbox" id="chkDog">Dog</label>
<label><input type="checkbox" id="chkCat">Cat</label>
<label><input type="checkbox" id="chkHedgehog">Hedgehog</label>
<label><input type="checkbox" id="chkSnake">Snake</label>
<label><input type="checkbox" id="chkPony">Pony</label>
<label><input type="checkbox" id="chkRock">Rock</label>
</fieldset>
```

![2024-05-01-Inaccessible native HTML select multiple](/assets/img/2024-05-01-InaccessiblenativeHTMLselectmultiple_2.png)

옵션 2: (매우 주의해서) 써드 파티 라이브러리 사용하기

많은 옵션이 있거나 이를 그룹화된 체크박스로 표시하는 것이 적절하지 않은 경우, 써드 파티 라이브러리를 사용해야 할 수 있습니다.

<div class="content-ad"></div>

개발 중에 알아두세요: 현재로서는 즉시 접근할 수 있는 제3자 멀티-선택 컨트롤을 아직은 본 적이 없습니다.

어떤 사람들은 더 좋은 것을 만들어보기도 했습니다. 예를 들어, WooCommerce에서 Select2 프로젝트를 포크하여 더 접근 가능한 경험을 제공하고자 하는 SelectWoo를 만들었습니다. 그러나 심지어 그 구현에도 몇 가지 문제가 있습니다.

요약하면, 이 방법을 선택한다면 JavaScript를 많이 조정하고 브라우저/보조기술(AT) 테스트를 많이 준비해야 합니다.

# 결론

<div class="content-ad"></div>

이 문제가 발생하는 것은 정말 싫은 일이에요.

`select multiple` 요소는 분명히 접근성이 떨어지며, 절연, 운동 및 기억 도전과 보조 기술 사용자에게 불필요한 부담입니다.

개발자들은 `select` 요소에 대한 불만을 솔직하게 표현해 왔으며, multiple 속성이 추가되면 더욱 그렇습니다.

저의 겸손한 권고는 다중 선택 제어가 필요한 상황을 피할 수 있는 방법을 찾아보는 것입니다. 범위를 좁히거나 옵션을 제한하는 등의 방법을 통해요. 불가피한 상황일 수 있겠지만, 가능하다면 그룹화된 체크박스를 사용해보세요.

<div class="content-ad"></div>

만약 그 방법을 선택할 수 없고, 제3자 솔루션을 도입해야 한다면, 준비하세요. 접근성을 확보하기 위해 매우 괴로운 작업을 많이 해야 할 것입니다. 그리고 접근성 감사자들이 그 제3자 컨트롤을 열심히 조사할 것입니다.

그러니 철저히 테스트해 보세요!

# 링크

## 언급된

<div class="content-ad"></div>

- `select multiple`에 대한 JSFiddle 예시
- Select2
- SumoSelect
- OpenUI
- OpenUI: Charter
- Open UI: `selectlist` 데모 페이지
- WHATWG HTML GitHub 이슈: `selectlist` 요소
- SelectWoo

## 관련 자료

- WHATWG HTML GitHub 이슈: `select` 사용자 정의화를 위한 Opt-in
- MDN Web 문서: multiple 속성

## 더 읽어보기

<div class="content-ad"></div>

- 산드리나 페레이라에 의한 네이티브 및 커스텀 선택 요소 사이의 균형 찾기
- 그렉 휘트워스에 의한 'select' 컨트롤을 스타일링할 수 있을까요?
- 사라 히글리에 의한 'select' 당신의 독재
- 멘디 지에에 의한 대량 경험: 다중 선택 및 대량 작업 탐색