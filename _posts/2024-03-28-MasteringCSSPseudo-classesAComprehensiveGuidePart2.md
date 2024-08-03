---
title: "CSS 가상 클래스 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Mastering CSS Pseudo-classes A Comprehensive Guide  Part 2"
link: "https://medium.com/@paddyuiux/mastering-css-pseudo-classes-a-comprehensive-guide-part-2-87af1e8bc0a4"
---



![MasteringCSSPseudo-classesAComprehensiveGuidePart2_0](/assets/img/MasteringCSSPseudo-classesAComprehensiveGuidePart2_0.png)

CSS(가상 클래스)는 웹 디자인의 기본을 이루며, 개발자들에게 웹 페이지의 모양과 레이아웃을 제어하는 능력을 제공합니다. CSS가 제공하는 여러 기능 중에서, 가상 클래스는 다양한 조건과 상태에 따라 요소를 대상으로 하는 강력한 도구로 높게 평가됩니다.

이 안내서에서는 몇 가지 더 많은 CSS 가상 클래스에 대해 깊이 파헤치며, 그 문법, 응용 및 사용법을 마스터할 수 있도록 실용적인 예제를 제공할 것입니다.

# 사용된 CSS 가상 클래스:

<div class="content-ad"></div>

- :checked
- :disabled
- :enabled
- :lang(language)
- :not(selector)
- :empty
- :placeholder-shown
- :required
- :optional
- :root
- :valid
- :invalid

## 1. :checked

CSS에서의 :checked 의사 클래스는 현재 선택되거나 확인된 체크박스, 라디오 버튼 또는 선택 드롭다운의 옵션과 같은 폼 요소에 스타일을 적용하는 데 사용됩니다.

이 의사 클래스를 사용하면 요소의 확인된 상태에 따라 스타일을 적용할 수 있습니다.

<div class="content-ad"></div>

사용자가 선택한 경우, 체크박스, 라디오 버튼 또는 선택 드롭다운의 옵션과 같은 입력 요소에 스타일을 적용합니다.

---

체크박스가 있는 간단한 HTML 구조를 고려해보세요:

```js
<input type="checkbox" id="checkbox1">
<label for="checkbox1">Checkbox 1</label>
```

<div class="content-ad"></div>

지금 사용자가 체크박스를 선택했을 때 해당 체크박스를 스타일링하고 싶다면, :checked를 사용할 수 있어요:

```js
/* 사용자가 체크박스를 선택했을 때 스타일을 지정합니다 */
input[type="checkbox"]:checked + label {
  color: #007bff; /* 라벨 텍스트 색상을 파란색으로 변경합니다 */
}
```

이 예시에서, 체크박스가 선택되면 인접한 라벨의 텍스트 색상이 파란색으로 변경됩니다.

— — —

<div class="content-ad"></div>

:checked 가상 클래스는 셀렉트 드롭다운에서 라디오 버튼 옵션과 함께 사용할 수도 있어요:

```js
<input type="radio" id="radio1" name="group">
<label for="radio1">옵션 1</label>

<select>
  <option value="option1" id="option1">옵션 1</option>
  <option value="option2" id="option2">옵션 2</option>
</select>
```

```js
/* 라디오 버튼을 선택했을 때 스타일 적용 */
input[type="radio"]:checked + label {
  font-weight: bold; /* 라벨 텍스트를 볼드체로 변경 */
}

/* 셀렉트 옵션을 선택했을 때 스타일 적용 */
option:checked {
  background-color: #f0f0f0; /* 배경색을 연한 회색으로 변경 */
}
```

이 예시에서는 선택된 라디오 버튼의 라벨 텍스트가 굵어지고, 셀렉트 드롭다운에서 선택된 옵션의 배경색이 연한 회색으로 변경됩니다.

<div class="content-ad"></div>

:checked을 사용하면 사용자가 선택한 옵션을 나타내는 시각적 피드백을 제공하여 사용성과 전반적인 사용자 경험을 향상시킬 수 있습니다.

## 2. :disabled

CSS의 :disabled 가상 클래스는 비활성화된 폼 요소에 스타일을 적용하는 데 사용됩니다.

이 가상 클래스를 사용하면 개발자들이 활성 상태인 폼 요소와 비활성 상태인 요소를 시각적으로 구별할 수 있습니다.

<div class="content-ad"></div>

입력 요소, 버튼, 선택 드롭다운 및 기타 폼 컨트롤에 스타일을 적용합니다. 이들은 disabled 속성이 설정된 경우에 해당합니다.

---

비활성화된 입력 필드와 비활성화된 버튼이 있는 간단한 HTML 양식을 고려해보세요:

```js
<input type="text" value="비활성화된 입력" disabled>
<button disabled>비활성화된 버튼</button>
```

<div class="content-ad"></div>

이제 만약 비활성화된 입력 필드와 버튼의 스타일을 변경하고 싶다면, :disabled를 사용할 수 있어요:

```js
/* 비활성화된 폼 요소 스타일 지정 */
input:disabled {
  opacity: 0.5; /* 투명도 감소 */
  cursor: not-allowed; /* 커서를 'not-allowed'로 변경 */
}

button:disabled {
  background-color: #dddddd; /* 배경색을 연한 회색으로 변경 */
  color: #999999; /* 텍스트 색상을 회색으로 변경 */
  cursor: not-allowed; /* 커서를 'not-allowed'로 변경 */
}
```

이 예시에서는 비활성화된 입력 필드는 투명도가 감소되고 'not-allowed' 커서를 가지며, 비활성화된 버튼은 연한 회색 배경색, 회색 텍스트 색상 및 'not-allowed' 커서를 가질 거에요.

— — —

<div class="content-ad"></div>

:disabled 가상 클래스는 셀렉트 드롭다운과 체크박스와 같은 다른 비활성화된 폼 요소에도 스타일을 적용하는 데 사용할 수 있어요.

```js
<select disabled>
  <option value="1">옵션 1</option>
  <option value="2">옵션 2</option>
</select>

<input type="checkbox" disabled>
```

```js
/* 비활성화된 셀렉트 드롭다운 스타일 지정 */
select:disabled {
  opacity: 0.5; /* 투명도 조절 */
  cursor: not-allowed; /* 커서를 'not-allowed'로 변경 */
}

/* 비활성화된 체크박스 스타일 지정 */
input[type="checkbox"]:disabled {
  opacity: 0.5; /* 투명도 조절 */
  cursor: not-allowed; /* 커서를 'not-allowed'로 변경 */
}
```

이 예시에서 비활성화된 셀렉트 드롭다운과 체크박스는 투명도가 줄어들고 'not-allowed' 커서가 됩니다.

<div class="content-ad"></div>

`<table>` 태그를 Markdown 형식으로 변경하면, 표를 더 읽기 쉽게 만들 수 있어요.

<div class="content-ad"></div>

비활성화되지 않은 입력 요소, 버튼 또는 기타 양식 컨트롤에 스타일을 적용합니다.

— — —

간단한 HTML 양식을 고려해보세요. 입력 필드와 버튼이 있는 양식:

```js
<input type="text" placeholder="텍스트를 입력하세요" disabled>
<button>클릭하세요</button>
```

<div class="content-ad"></div>

이 예시에서는 disabled 속성을 사용하여 입력 필드를 비활성화하고 버튼은 활성화된 상태를 유지합니다.

---

이제, 비활성화된 입력 필드와 스타일을 다르게 적용하고 싶다면 :enabled를 사용할 수 있습니다:

```js
/* 활성화된 버튼에 스타일 적용 */
button:enabled {
  background-color: #007bff; /* 배경색을 파란색으로 변경 */
  color: #ffffff; /* 텍스트 색상을 흰색으로 변경 */
  cursor: pointer; /* 커서를 포인터로 변경 */
}
```

<div class="content-ad"></div>

이 예시에서 버튼은 활성화되었을 때 파란 배경색, 흰색 텍스트 색 및 포인터 커서가 표시됩니다.

— — —

:enabled 으로 유사 클래스를 사용하여 다른 활성화된 폼 요소를 스타일링할 수도 있습니다. 이는 입력 필드나 선택 드롭다운과 같은 요소에 대한 스타일을 지정할 수 있습니다:

```js
/* 활성화된 입력 필드에 스타일 지정 */
input:enabled {
  border: 1px solid #007bff; /* 파란 테두리 추가 */
}

/* 활성화된 선택 드롭다운에 스타일 지정 */
select:enabled {
  background-color: #f2f2f2; /* 배경색을 연한 회색으로 변경 */
}
```

<div class="content-ad"></div>

이러한 예에서 활성화된 입력 필드는 파란 테두리가 있고, 활성화된 드롭다운은 연한 회색 배경색이 있습니다.

:enabled를 사용하여 현재 상호작용 가능한 폼 요소를 시각적으로 표시함으로써 사용성을 향상시키고 전체 사용자 경험을 개선할 수 있습니다.

## 4. :lang(language)

CSS의 :lang 가상 클래스는 부모 또는 조상 요소의 lang 속성에서 지정된 언어를 기반으로 요소를 스타일링하는 데 사용됩니다.

<div class="content-ad"></div>

이 pseudo-class는 요소에 특정 언어를 기반으로 한 스타일을 적용할 수 있게 해줍니다.

이는 서로 다른 언어로 된 텍스트를 서로 다르게 스타일링하거나, 다국어 웹사이트에 특정 스타일을 제공하는 데 자주 사용됩니다.

— — —

다음은 영어 텍스트가 포함된 단락 (`p`) 요소와 프랑스어 텍스트가 포함된 다른 단락이 있는 간단한 HTML 구조를 고려해보세요:

<div class="content-ad"></div>

```html
<p lang="en">This is a paragraph in English.</p>
<p lang="fr">Ceci est un paragraphe en français.</p>
```

이제, 언어에 따라 단락을 스타일링하려면 :lang:을 사용할 수 있습니다.

```css
/* 영어로 작성된 단락에 스타일 적용 */
p:lang(en) {
  font-style: italic; /* 영어 텍스트를 이탤릭체로 설정 */
}

/* 프랑스어로 작성된 단락에 스타일 적용 */
p:lang(fr) {
  font-weight: bold; /* 프랑스어 텍스트를 굵게 설정 */
}
```

이 예제에서, 영어로 작성된 단락은 이탤릭체로 설정되고, 프랑스어로 작성된 단락은 굵게 표시됩니다.


<div class="content-ad"></div>

---

:lang 가상 클래스는 특정 언어 변형 또는 방언을 타겟팅하는 데에도 사용될 수 있어요.

예를 들어, 캐나다 프랑스어 (fr-CA)로 작성된 단락을 스타일링하려면 다음을 사용할 수 있어요:

```js
/* 캐나다 프랑스어로 작성된 단락 스타일링하기 */
p:lang(fr-CA) {
  color: #ff0000; /* 텍스트 색상을 빨강으로 변경 */
}
```

<div class="content-ad"></div>

이 예시에서 캐나다 불어로 쓰인 단락은 빨간 글자색으로 표시됩니다.

:lang을 사용하면 웹 사이트 콘텐츠의 스타일링을 다른 언어에 맞게 조정할 수 있어서, 다른 언어를 구사하는 사용자들에게 더 나은 경험을 제공할 수 있습니다.

## 5. :not(selector)

CSS의 :not 가상 클래스는 지정된 선택기와 일치하지 않는 요소를 선택하는 데 사용됩니다.

<div class="content-ad"></div>

개발자들이 특정 기준을 충족하지 않는 요소에 스타일을 적용할 수 있도록 해주어 더 정확한 스타일링 제어를 제공합니다.

이는 클래스, ID 또는 유형에 따라 요소를 대상으로하고, 그들을 스타일링에서 제외할 수 있도록 사용할 수 있습니다.

— — —

항목 목록이 포함된 간단한 HTML 구조를 고려해보세요:

<div class="content-ad"></div>

```js
<ul>
  <li class="item">항목 1</li>
  <li>항목 2</li>
  <li class="item">항목 3</li>
  <li>항목 4</li>
</ul>
```

이제 "item" 클래스가 없는 리스트 항목만 스타일링하려면 :not:을 사용할 수 있습니다.

```js
/* "item" 클래스가 없는 리스트 항목에 스타일 적용 */
li:not(.item) {
  color: #999999; /* 텍스트 색상을 회색으로 변경 */
}
```

이 예제에서 "item" 클래스가 없는 리스트 항목의 텍스트 색상이 회색으로 변경됩니다.

<div class="content-ad"></div>

---

:not 가상 클래스는 타입이나 다른 속성에 따라 특정 요소를 제외할 때도 사용될 수 있어요:

```js
/* "submit" 타입을 갖지 않는 input 필드에 스타일 적용하기 */
input:not([type="submit"]) {
  border: 1px solid #cccccc; /* 테두리 추가 */
  padding: 5px; /* 패딩 추가 */
}
```

이 예제에서는 "submit" 타입을 갖지 않는 모든 input 필드에는 테두리와 패딩이 적용됩니다.

<div class="content-ad"></div>

**:not**을 사용하면 특정 요소를 대상으로 지정하면서 다른 요소는 제외할 수 있어 CSS 스타일링에서 더 유연성을 제공하고 웹 페이지 전반에 일관된 디자인을 보장할 수 있습니다.

## 6. :empty

CSS의 **:empty** 가상 클래스는 자식 요소가 없는 요소, 텍스트 노드 및 공백을 포함한 요소를 선택하고 스타일을 적용하는 데 사용됩니다.

이 가상 클래스를 사용하면 내용이 전혀 포함되지 않은 요소에 스타일을 적용할 수 있습니다.

<div class="content-ad"></div>

그것은 열림 태그와 닫힘 태그 사이에 콘텐츠가 포함되어 있지 않은 요소를 대상으로합니다. 텍스트 노드, 공백 또는 다른 요소를 포함합니다.

— — —

div 요소가 포함된 간단한 HTML 구조를 고려해 보세요:

```js
<div></div>
```

<div class="content-ad"></div>

이제 div 요소를 empty 일 때 스타일링하고 싶다면, :empty 를 사용할 수 있어요:

```js
/* 빈 div 요소에 스타일을 적용합니다 */
div:empty {
  background-color: #f2f2f2; /* 배경색을 연한 회색으로 변경 */
  border: 1px dashed #999999; /* 대시로 테두리 추가 */
  padding: 10px; /* 여백 추가 */
}
```

이 예제에서 div 요소는 empty 상태일 때 연한 회색 배경색, 대시로 된 테두리, 그리고 패딩이 적용됩니다.

<div class="content-ad"></div>

:empty 가상 클래스는 비어있는 컨테이너나 동적 콘텐츠의 자리 표시자와 같은 플레이스홀더를 스타일링하는 데 유용할 수 있습니다.

예를 들어, 빈 `div`를 드래그 앤 드롭 기능의 드롭 존으로 스타일링하거나 동적으로 로드된 콘텐츠의 자리 표시자로 사용할 수 있습니다.

```js
<div class="drop-zone"></div>
```

```js
/* 빈 드롭 존에 스타일 추가 */
.drop-zone:empty {
  border: 2px dashed #007bff; /* 테두리 색을 파란색으로 변경 */
  height: 100px; /* 높이 설정 */
}
```

<div class="content-ad"></div>

이 예시에서 빈 드롭 영역은 파란 점선 테두리와 지정된 높이를 가지고 있어 사용자가 상호 작용할 수 있도록 시각적 신호를 제공합니다.

:empty를 사용하여 빈 요소를 스타일링하여 사용자 경험을 향상시킬 수 있으며, 시각적으로 더 매력적으로 만들거나 사용자에게 추가적인 맥락을 제공할 수 있습니다.

## 7. :placeholder-shown

CSS의 :placeholder-shown 가상 클래스는 입력 요소가 현재 플레이스홀더 텍스트를 표시할 때 스타일을 지정하는 데 사용됩니다.

<div class="content-ad"></div>

이 의사 클래스는 입력 요소에 스타일을 적용할 수 있게 해줍니다. 이것은 자리 표시자 텍스트가 표시되는지 여부에 따라서 스타일을 적용합니다.

사용자 입력에 의해 덮어씌워지지 않으면 입력 요소에 스타일을 적용합니다.

---

간단한 HTML 입력 필드를 고려해 보세요:

<div class="content-ad"></div>

```js
<input type="text" placeholder="이름을 입력해주세요">
```

이제, 입력 필드의 플레이스홀더 텍스트가 표시될 때 해당 필드의 스타일을 변경하려면 :placeholder-shown을 사용할 수 있습니다:

```js
/* placeholder 텍스트가 표시될 때 입력 필드를 스타일링합니다 */
input:placeholder-shown {
  border: 1px solid #ccc; /* 테두리 추가 */
  color: #999; /* 텍스트 색상을 회색으로 변경 */
}
```

이 예시에서는 입력 필드가 플레이스홀더 텍스트가 표시될 때 회색 테두리와 텍스트 색상을 가지게 됩니다.

<div class="content-ad"></div>

---

:placeholder-shown 으사족 클래스는 placeholder 텍스트가 표시될 때 사용자에게 데이터를 입력하는 위치를 시각적으로 알려주기 위한 입력 필드를 스타일링하는 데 유용할 수 있습니다.

```js
/* 입력 필드를 placeholder 텍스트가 표시될 때 스타일링합니다 */
input:placeholder-shown {
  background-color: #f2f2f2; /* 배경색을 연한 회색으로 변경 */
  padding: 10px; /* 패딩 추가 */
}
```

이 예제에서는 placeholder 텍스트가 표시될 때 입력 필드의 배경색이 연한 회색이되고 패딩이 추가됩니다.

<div class="content-ad"></div>

`:placeholder-shown`을 사용하면 사용자가 입력 데이터를 어디에 넣어야 하는지 시각적으로 알려주는 방법으로 사용자 경험을 향상시킬 수 있어요.

## 8. :required

CSS의 `:required` 의사 클래스는 필수 속성이 설정된 폼 요소를 스타일링하는 데 사용됩니다.

이 의사 클래스를 사용하면 필수 폼 요소에 대해 특정 스타일을 적용하여 양식의 필수 필드에 대한 사용자에게 시각적인 힌트를 제공할 수 있습니다.

<div class="content-ad"></div>

사용자가 양식을 제출하기 전에 입력해야 하는 텍스트 필드, 체크박스 및 라디오 버튼과 같은 입력 요소에 스타일을 적용합니다.

— — —

필수 입력 필드가 있는 간단한 HTML 양식을 고려해보세요:

```js
<form>
  <label for="username">사용자 이름:</label>
  <input type="text" id="username" name="username" required>
  <button type="submit">제출</button>
</form>
```

<div class="content-ad"></div>

이제 사용자에게 시각적 피드백을 제공하기 위해 필수 입력 필드를 스타일링하고 싶다면, :required를 사용할 수 있어요:

```js
/* 필수 입력 필드를 스타일링합니다 */
input:required {
  border: 2px solid #007bff; /* 파란 테두리 추가 */
}
```

이 예시에서는 사용자에게 필수 필드임을 표시하기 위해 입력 필드에 파란 테두리가 표시됩니다.

— — —

<div class="content-ad"></div>

:required 가상 클래스는 체크박스와 라디오 버튼과 같은 다른 필수 양식 요소에도 스타일을 적용하는 데 사용할 수 있습니다.

```js
<form>
  <input type="checkbox" id="agree" name="agree" required>
  <label for="agree">약관에 동의합니다</label>
  <button type="submit">제출</button>
</form>
```

```js
/* 필수 체크박스를 스타일링합니다 */
input[type="checkbox"]:required {
  border: 2px solid #007bff; /* 파란 테두리 추가 */
}
```

이 예시에서는 사용자에게 필수 필드임을 나타내기 위해 체크박스에 파란색 테두리가 생깁니다.

<div class="content-ad"></div>

폼에서 필수 필드를 나타내는 시각적 단서를 제공하여 사용성과 전반적인 사용자 경험을 향상시킬 수 있는 :required를 사용할 수 있어요.

## 9. :optional

CSS의 :optional 가짜 클래스는 필수 속성이 설정되지 않은 폼 요소의 스타일을 지정하는 데 사용됩니다.

이 가상 클래스를 사용하면 개발자가 선택적인 폼 요소에 스타일을 적용하여 필수 필드와 선택적 필드를 사용자에게 시각적으로 알려줄 수 있어요.

<div class="content-ad"></div>

`입력`, `텍스트 에어리어` 및 `다른 양식 컨트롤`에 스타일을 적용합니다. 이 중 필수로 표시되지 않은 요소에 대해서 적용됩니다.

---

필수로 표시된 입력란들을 포함하는 간단한 HTML 양식을 고려해보세요:

```js
<form>
  <label for="name">이름:</label>
  <input type="text" id="name" name="name" required>

  <label for="email">이메일:</label>
  <input type="email" id="email" name="email">

  <label for="message">메시지:</label>
  <textarea id="message" name="message"></textarea>

  <button type="submit">제출</button>
</form>
```

<div class="content-ad"></div>

이제 선택 사항인 입력 필드의 스타일을 필수 입력 필드와 다르게 지정하고 싶다면 ":optional"을 사용할 수 있어요:

```js
/* 선택 사항인 입력 필드에 스타일 적용 */
input:optional,
textarea:optional {
  border: 1px solid #ccc; /* 테두리 추가 */
}

/* 선택 사항인 입력 필드에 스타일 적용 */
input:optional {
  background-color: #f9f9f9; /* 배경색 변경 */
}
```

이 예시에서 필수 속성이 설정되지 않은 입력 필드와 텍스트 영역은 연한 회색 테두리와 조금 다른 배경색을 가지게 됩니다.

":optional" 가상 클래스는 양식 내에서 선택 사항인 필드를 시각적으로 강조하는 데 특히 유용하며, 사용성과 전반적인 사용자 경험을 향상시킬 수 있어요.

<div class="content-ad"></div>

## 10. :root

CSS에서의 :root 가상 클래스는 문서의 루트 요소인 일반적으로 `html` 요소를 선택하는 데 사용됩니다.

개발자는 문서 전체에 적용되는 전역 스타일과 변수를 정의할 수 있습니다.

일반적으로 문서 내의 모든 요소에 적용되는 전역 스타일 및 CSS 변수(사용자 정의 속성)를 정의하는 데 사용됩니다.

<div class="content-ad"></div>

---

간단한 HTML 문서를 살펴보세요:

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
</body>
</html>
```

```js
/* 전역 스타일 및 변수 정의 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}

/* 전역 스타일 적용 */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  color: var(--secondary-color);
}

/* CSS 변수 사용 */
h1 {
  color: var(--primary-color);
}
```

<div class="content-ad"></div>

이 예에서는 :root 가상 클래스를 사용하여 두 가지 CSS 변수 : --primary-color와 --secondary-color을 정의합니다. 이 변수들은 각각 주요 색상과 보조 색상을 나타냅니다. 그런 다음 이러한 변수를 사용하여 전체 문서의 색상 구성표를 정의합니다.

또한 :root를 사용하여 글로벌 스타일인 font-family, background-color 및 color와 같은 스타일을 body 요소에 적용합니다.

:root를 사용함으로써 개발자는 전체 문서에 적용되는 글로벌 스타일과 변수를 쉽게 정의하고 관리할 수 있어 웹 사이트의 스타일링을 유지하고 업데이트하는 것이 더욱 쉬워집니다.

## 11. :valid

<div class="content-ad"></div>

CSS에서의 :valid 가상 클래스는 정의된 제약 조건이나 요구 사항에 따라 유효한 입력을 포함하는 폼 요소에 스타일을 적용하는 데 사용됩니다.

이 가상 클래스를 사용하면 입력이 지정된 유효성 검사 기준을 충족했을 때 사용자에게 시각적으로 표시할 수 있습니다.

이 가상 클래스는 현재 값이 유효한 경우 텍스트 필드 또는 확인란과 같은 입력 요소에 스타일을 적용합니다.

---

<div class="content-ad"></div>

간단한 이메일 주소를 요구하는 입력 필드가 있는 HTML 폼을 고려해보세요:

```js
<form>
  <label for="email">이메일:</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">제출</button>
</form>
```

만약 입력 필드에 유효한 이메일 주소가 들어있을 때 스타일을 변경하고 싶다면, :valid를 사용할 수 있어요:

```js
/* 입력 필드에 유효한 이메일 주소가 들어있을 때 스타일 지정 */
input:valid {
  border-color: green; /* 테두리 색상을 초록색으로 변경 */
}
```

<div class="content-ad"></div>

이 예제에서는 브라우저의 내장 이메일 유효성 검사에 따라 유효한 이메일 주소가 포함된 경우 입력 필드에 녹색 테두리가 생깁니다.

---

:valid 가상 클래스는 체크박스나 텍스트 영역과 같은 다른 폼 요소에도 적용될 수 있습니다. 이들의 입력이 제약 조건에 따라 유효한 경우에 스타일을 지정하는 데 사용됩니다.

```js
<input type="checkbox" id="agree" required>
<label for="agree">약관에 동의합니다</label>
```

<div class="content-ad"></div>

```js
/* 체크박스가 체크되었고 유효할 때 스타일을 지정합니다. */
input[type="checkbox"]:valid {
  outline-color: green; /* 외곽선 색을 초록색으로 변경합니다. */
}
```

이 예시에서는 체크박스가 필수 속성에 따라 체크되어 유효할 때 초록색 외곽선을 가질 것입니다.

`:valid`을 사용하면 사용자에게 입력이 지정된 유효성 기준을 충족했음을 바로 시각적으로 알려줌으로써 사용자 경험을 향상시키고 양식 제출 시의 오류를 줄일 수 있습니다.

## 12. :invalid

<div class="content-ad"></div>

CSS에서 :invalid 가상 클래스는 지정된 제약 조건에 따라 유효하지 않은 값이나 형식을 갖는 양식 요소를 스타일링하는 데 사용됩니다.

이 가상 클래스를 사용하면 개발자들이 사용자에게 입력이 필요한 기준을 충족하지 못했음을 시각적으로 표시할 수 있습니다.

--- --- ---

유효한 이메일 주소가 필요한 입력 필드가 있는 간단한 HTML 양식을 고려해보세요:

<div class="content-ad"></div>

```js
<form>
  <label for="email">이메일:</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">제출</button>
</form>
```

이제, 값이 유효하지 않을 때 (즉, 유효한 이메일 주소가 아닐 때) 입력 필드를 스타일링하려면 :invalid을 사용할 수 있습니다:

```js
/* 값이 유효하지 않을 때 입력 필드 스타일 지정 */
input:invalid {
  border-color: #ff0000; /* 테두리 색상을 빨간색으로 변경 */
}
```

이 예시에서 유효하지 않은 이메일 주소(예: "@ " 기호가 없는 경우)로 양식을 제출하려고하면, 입력 필드는 값이 유효하지 않다는 것을 나타내기 위해 빨간 테두리가 생깁니다.

<div class="content-ad"></div>

---

`:invalid` 으사례유사사클래스는 지정된 제약조건에 따라 해당 값이 유효하지 않은 상태를 가진 숫자 입력, 텍스트영역 및 선택 드롭다운과 같은 다른 유형의 양식 요소에 적용할 수도 있습니다.

```js
/* 값이 유효하지 않을 때 숫자 입력 스타일 지정 */
input[type="number"]:invalid {
  border-color: #ff0000; /* 테두리 색상을 빨간색으로 변경 */
}
```

이 예시에서 숫자 입력은 값이 유효하지 않은 경우(예: 지정된 범위를 벗어날 때) 빨간 테두리가 지정됩니다.

<div class="content-ad"></div>

:invalid를 사용하여 사용자에게 입력 내용이 필요한 기준을 충족시키지 못했다는 시각적 단서를 제공하여 사용성과 전반적인 사용자 경험을 향상시킬 수 있습니다.

# 결론:

CSS 가상 클래스는 개발자가 동적이고 인터랙티브한 웹 경험을 만들 수 있는 강력한 도구입니다. 문법과 적용을 이해함으로써 웹 프로젝트의 시각적 매력과 사용성을 향상시킬 수 있습니다.

이러한 가상 클래스를 실험해보고 CSS 아카데미에 통합해 웹 디자인 기술을 한 단계 끌어올릴 수 있습니다. 연습과 창의성으로 무궁무진한 가능성을 탐색해보세요.
