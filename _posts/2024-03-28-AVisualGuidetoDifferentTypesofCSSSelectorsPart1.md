---
title: "알아두면 유용한 CSS selector 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "A Visual Guide to Different Types of CSS Selectors Part 1"
link: "https://medium.com/@Itsmemuna/a-visual-guide-to-different-types-of-css-selectors-part-1-0c32b9740509"
---



# CSS 선택자

CSS 선택자는 CSS의 필수 구성 요소로, 스타일을 적용하려는 특정 HTML 요소를 대상으로 하는 데 도움이 됩니다. 웹 페이지의 다양한 요소에 스타일을 적용하는 강력한 방법을 제공하며, 웹 사이트의 모양과 느낌을 다양한 방식으로 변경하는 데 사용할 수 있습니다.

CSS 규칙 집합의 시작 부분은 중괄호 내부의 속성이 어떤 요소에 영향을 미쳐야 하는지를 정의합니다.

# CSS 선택자의 종류

<div class="content-ad"></div>

HTML 문서의 다른 요소를 대상으로 삼을 수 있는 다양한 유형의 CSS 선택자가 있습니다. CSS 규칙에는 id 및 class 선택자가 일반적으로 사용됩니다. 기타 선택자 유형은 다음과 같습니다:

- Type Selector
- Attribute Selector
- Pseudo-class Selector
- Pseudo-element Selector
- Descendant Selector
- Child Selector
- Adjacent sibling Selector
- General sibling Selector

# ID란 무엇인가요?

ID는 HTML 요소에 추가할 수 있는 고유 식별자로 작동하는 HTML 속성입니다. 이 속성은 페이지 내에서 고유합니다.

<div class="content-ad"></div>

웹 문서에 세 개의 문단이 있다고 상상해보세요. 이들을 다르게 디자인하고 싶다면, 디자인하기 전에 문단 요소에 id를 포함하는 것이 중요합니다. 다음과 같이 보일 것입니다:

```js
<p id="first">First Paragraph</p>
<p>Second Paragraph</p>
<p>Third Paragraph</p>
```

# 어떻게 ID를 선택할까요?

브라우저는 “#” 기호 없이 ID를 식별하지 못합니다. 따라서 ID 선택기 앞에 이 기호를 사용해야 합니다.

<div class="content-ad"></div>

```js
#첫번째{
  text-align: center;
}
```

아이디(ID)는 고유 식별자이며 두 개의 요소가 동일한 ID를 가질 수 없음을 주의하십시오.

# 클래스란 무엇인가요?

클래스는 HTML 요소에 추가되는 HTML 속성으로 식별자 역할을 하는 것입니다. ID와 클래스의 차이점은 ID가 고유한 식별자인 반면 클래스는 그렇지 않다는 것입니다. 동일한 예시를 사용하여 두 번째와 세 번째 단락을 디자인하는 데 클래스 속성을 사용해 봅시다:

<div class="content-ad"></div>

```js
<p id="first">첫 번째 단락</p>
<p class="paragraph">두 번째 단락</p>
<p class="paragraph">세 번째 단락</p>
```

위와 같이 두 개 이상의 속성이 동일한 클래스를 가질 수 있습니다. 또 다른 장점은 요소가 두 개의 클래스 속성을 동시에 가질 수 있다는 것입니다.

```js
<p id="first">첫 번째 단락</p>
<p class="paragraph">두 번째 단락</p>
<p class="paragraph third">세 번째 단락</p>
```

# 어떻게 클래스로 선택하나요?

<div class="content-ad"></div>

브라우저는 “.” 기호 없이 클래스를 인식하지 못합니다. 이 기호를 클래스 선택자 앞에 다음과 같이 사용합니다:

```js
.paragraph{
  text-align: center;
}
```

클래스가 고유 식별자가 아닌 것을 주의하세요. 두 요소가 동일한 클래스를 가질 수 있습니다. CSS에서 클래스를 사용하는 것이 더 안전합니다.

# 유형 선택자

<div class="content-ad"></div>

타입 선택기는 h1, p, div 등 특정 유형의 모든 요소를 대상으로 하는 데 사용될 수 있습니다. 아래와 같이 사용할 수 있어요:

```js
div{
  background-color: plum;
}
```

# 속성 선택기

속성 선택기는 특정 속성이나 속성값을 가진 요소를 대상으로 하는 데 사용될 수 있습니다. "특정 속성을 가진 요소를 대상으로 한다"는 것이 무슨 말인지 사례로 설명해 드릴게요:

<div class="content-ad"></div>

위에서 보는 것처럼 "target" 속성은 파란색 배경을 주기 위해 선택되었습니다.

# 가상 클래스 선택자

<div class="content-ad"></div>

가상 클래스는 요소의 특별한 상태를 정의하는 데 사용됩니다. 가상 클래스 선택기는 hover, active 또는 visited와 같은 특정 상태에 있는 요소를 대상으로합니다. 가상 클래스 선택기의 예는 앵커 가상 클래스입니다.

```js
a: link {
  color: green; /* 방문하지 않은 링크를 편집합니다 */
}

a: visited {
  color: gray; /* 방문한 링크를 편집합니다 */
}

a: hover {
  color: purple; /* 마우스를 올렸을 때 색상 변경 */
}

a: active {
  color: whitesmoke; /* 활성 링크를 편집합니다 */
}
```

가상 클래스 선택기에 대한 자세한 정보는 여기를 클릭하십시오.

# 가상요소 선택기

<div class="content-ad"></div>

가상 요소 선택자를 사용하여 요소의 특정 부분을 대상으로 할 수 있습니다. 예를 들어, 문단의 첫 글자나 첫 줄 등입니다. 예시:

```js
p::first-line{
  color: azure;
}
```

위 코드는 p 요소의 첫 줄의 색상을 변경합니다.

# 결론

<div class="content-ad"></div>

CSS 선택자는 웹 페이지 디자인 및 개발에 중요한 역할을 합니다. 특정 HTML 요소를 대상으로 하는 유연하고 강력한 스타일을 적용하여 웹 사이트를 시각적으로 매력적이고 매혹적으로 만드는 방법을 제공합니다. 다양한 유형의 CSS 선택자를 알고 있다면 웹 개발자는 독특하고 매력적인 디자인을 만들어 관객의 주목을 끌 수 있습니다. CSS 선택자를 더 탐구하면 웹 디자인 기술을 향상시키고 탁월한 사용자 경험을 만들 수 있는 방법을 발견할 수 있을 겁니다.
