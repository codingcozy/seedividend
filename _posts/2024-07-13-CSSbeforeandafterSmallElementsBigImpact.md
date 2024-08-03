---
title: "작지만 강력한 CSS before 및 after 요소 활용법"
description: ""
coverImage: "/assets/img/2024-07-13-CSSbeforeandafterSmallElementsBigImpact_0.png"
date: 2024-07-13 18:54
ogImage: 
  url: /assets/img/2024-07-13-CSSbeforeandafterSmallElementsBigImpact_0.png
tag: Tech
originalTitle: "CSS ::before and ::after — Small Elements, Big Impact"
link: "https://medium.com/@wesleyvanpeer/css-before-and-after-small-elements-big-impact-fd5a54e7793a"
---



![UI Element](/assets/img/2024-07-13-CSSbeforeandafterSmallElementsBigImpact_0.png)

코딩은 내가 일반적으로 쓰는 주제가 아니에요. 하지만 좋아하는 분야 중 하나에요. 몇 년 전에 웹 개발과 반응형 웹 디자인을 배웠고, 이제 C#을 배우고 있는데도 다른 멋진 것들을 발견하곤 해요. 이번에는 CSS(Cascading Style Sheets)에서 꽤 재밌는 것을 우연히 발견했는데, 여기서 당신과 함께 나누고 싶네요.

:before와 :after 의사요소에 대해 들어보신 적이 있나요? 제 팔로워 중 대다수가 아닐 확률이 99% 이상이에요. 이것들을 발견한 이후 내가 웹 디자인에 접근하는 방식이 완전히 달라졌어요. 왜 그런지 보여드릴게요. 하지만 먼저...

## 가짜 요소(Pseudo-elements)란 무엇인가요?


<div class="content-ad"></div>

의사 요소는 우리의 CSS 도구 상자에 살고있는 보이지 않는 요정처럼 작동합니다. 이를 통해 HTML(Hyper Text Markup Language) 요소에 추가 콘텐츠를 쉽게 삽입할 수 있습니다. HTML 코드를 변경할 필요 없이 말이죠. 제 생각에는 웹 콘텐츠를 향상시키는 데 굉장히 유용합니다.

## 언제 사용해야 하나요?

디자인에 약간의 멋을 더하고 싶을 때 언제든지 의사 요소를 활용해보세요. 다음은 몇 가지 상황입니다:

- 지루한 글머리 기호에 질렸을 때.
- 버튼에 멋진 호버 효과를 추가해야 할 때.
- 제목에 화려한 밑줄을 만들고 싶을 때(누가 화려한 것을 좋아하지 않겠어요?).

<div class="content-ad"></div>

## 어떻게 작동하나요?

간단한 예제부터 시작해봐요. 원한다면 Codepen을 사용해서 직접 확인해볼 수도 있어요. 다음과 같이 HTML이 있는 경우를 가정해볼게요:

```js
<h1>Welcome to My Cool Site</h1>
```

이에 파란색 밑줄을 추가해 보겠습니다:

<div class="content-ad"></div>

```js
h1 {
  position: relative;
  display: inline-block;
}

h1::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: -10px;
  left: 0;
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff);
  border-radius: 2px;
}
```

우리는 이제 h1에 ::after 가상 요소를 추가했습니다. `content: '';` 부분은 가상 요소를 만드는 데 중요합니다. 텍스트를 추가하지 않더라도 가상 요소가 표시되도록 이 줄을 포함해야 합니다.

그런 다음, 이를 절대 위치로 배치했고 (부모를 상대적으로 만드는 걸 기억하세요!), 일부 스타일링을 적용했습니다.

<img src="/assets/img/2024-07-13-CSSbeforeandafterSmallElementsBigImpact_1.png" />


<div class="content-ad"></div>

## CSS에서 '부모(Parent)'란 무엇인가요?

'부모(Parent)'란 다른 요소를 포함하는 요소를 가리킵니다. 이 경우 h1 요소는 ::after 가상 요소의 부모입니다. 부모인 h1에 position: relative;을 설정함으로써, ::after 가상 요소가 h1 요소 자체에 상대적으로 위치하도록 할 수 있습니다. 이렇게 하면 가상 요소를 h1의 경계 내 정확한 위치에 배치할 수 있게 됩니다.

## 호버 효과로 멋있게 꾸며보기

저는 개인적으로 호버 효과를 정말 좋아합니다. 멋진 호버 효과가 있는 버튼을 만들어봅시다. 수정된 코드:

<div class="content-ad"></div>


# 내 멋진 사이트에 오신 것을 환영합니다!

<button class="fancy-btn">Click Me!</button>



```css
h1 {
  position: relative;
  display: inline-block;
}

h1::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: -10px;
  left: 0;
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff);
  border-radius: 2px;
}

.fancy-btn {
  position: relative;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  overflow: hidden;
  cursor: pointer;
  z-index: 0; /* Ensure button is below pseudo-element */
}

.fancy-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #eb34de;
  transition: all 0.3s ease;
  z-index: -1; /* Ensure pseudo-element is below button content */
}

.fancy-btn:hover::before {
  left: 0;
}

.fancy-btn span {
  position: relative;
  z-index: 1; /* Ensure button text is above pseudo-element */
}
```

<img src="https://miro.medium.com/v2/resize:fit:1400/1*zjvymEiDU7_pKidykhg_3A.gif" />

## 사용자 지정 불릿 포인트


<div class="content-ad"></div>

문단을 명확하게 유지하기 위해 글머리 기호가 유용하지만, 표준 검정 점들은 당연히 그냥 표준 검정 점입니다. 감사하게도 우리는 그것들을 밝게 만들 수도 있습니다.

먼저 HTML에 몇 가지 글머리 기호를 추가해 봅시다:

```js
<h1>Welcome to My Cool Site</h1>
<br>
<button class="fancy-btn">Click Me!</button>

<!--여기에 글머리 기호를 추가합니다-->

- Item 1
- Item 2
- Item 3
```

그런 다음 CSS를 조정하여 지루한 점들을 바꿔봅시다:

<div class="content-ad"></div>

```css
h1 {
  position: relative;
  display: inline-block;
}

h1::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: -10px;
  left: 0;
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff);
  border-radius: 2px;
}

.fancy-btn {
  position: relative;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  overflow: hidden;
  cursor: pointer;
  z-index: 0;
}

.fancy-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #eb34de;
  transition: all 0.3s ease;
  z-index: -1;
}

.fancy-btn:hover::before {
  left: 0;
}

.fancy-btn span {
  position: relative;
  z-index: 1;
}

/* Here's the adjusted list */

.cool-list {
  list-style: none;
  padding-left: 20px;
}

.cool-list li {
  position: relative;
  margin-bottom: 10px;
}

.cool-list li::before {
  content: '🚀';
  position: absolute;
  left: -20px;
}
``` 

이제 각 목록 항목/글머리 기호가 지루한 점이 아니라 작은 로켓 모양으로 바뀌었어요.

CSS로 이모지나 사용자 정의 모양을 만들 수 있어요.

조금 더 현대적으로 했어요...

<div class="content-ad"></div>

위는 :before 및 :after 가상 요소의 데모 목적을 위한 것이었습니다. 이제 재미있게 전체를 현대화해 보려고 합니다. 이 게시물에 더 많은 코드를 추가하지 않으려면 실제 Codepen에서 최신 소스 코드를 찾을 수 있어요. 😉

![image](https://miro.medium.com/v2/resize:fit:1400/1*H_6_1Fy8oWov3QDuxv1whA.gif)

웹 디자인 또는 코딩을 사랑하는 이유가 여기 있어요 — 처음부터 무언가를 만들어내고 자신이 만드는 것을 보기 때문이에요. 시간이 걸리긴 하지만요. 빌드하는 데 뿐만 아니라 배우는 데도 시간이 걸려요. 제는 네덜란드어 웹사이트를 호스팅하기 위해 워드프레스를 선택했지만, 후회하고 있어요. 전체 제어권을 가지는 대신 속도를 선택했거든요. 이곳에서 교훈을 얻었다고 말해도 되겠네요.

제가 하려는 다가오는 프로젝트 중 하나는 그 전체 웹사이트를 처음부터 다시 만들어 모두 직접 코딩하는 것이에요. 최근 다른 게시물에서 말했듯이 의지적으로 제가 많이 맡았다고 할 수 있는데, 그 프로젝트는 현재 보류 중이에요. 그러나 그 과정을 문서로 남겨둘 생각도 해봤어요.

<div class="content-ad"></div>

내 말이 공감되거나 유익했다면, 애정을 표현해주세요 — 커피 사줘도 돼요. 그것은 요가치료보다도 더 저렴하답니다!