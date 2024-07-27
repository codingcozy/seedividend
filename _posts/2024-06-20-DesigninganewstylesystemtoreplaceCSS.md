---
title: "CSS를 대체할 새로운 스타일 시스템 설계하기"
description: ""
coverImage: "/assets/img/2024-06-20-DesigninganewstylesystemtoreplaceCSS_0.png"
date: 2024-06-20 00:49
ogImage: 
  url: /assets/img/2024-06-20-DesigninganewstylesystemtoreplaceCSS_0.png
tag: Tech
originalTitle: "Designing a new style system to replace CSS"
link: "https://medium.com/@decketts/designing-a-new-style-system-to-replace-css-182d68d2d11b"
---


## 자바스크립트 UI — 개발블로그 #3

![이미지](/assets/img/2024-06-20-DesigninganewstylesystemtoreplaceCSS_0.png)

## 소개

저번 주에 자바스크립트 UI에서 기본 뷰 몇 가지를 소개하고, 웹 사이트/웹 앱에서 HTML이 필요 없게끔 뷰 트리를 구현한 내 방법에 대해 이야기했어요.

<div class="content-ad"></div>

이번 주에는 CSS가 희생양이 되었습니다.

## JavaScript 내 CSS

간단히 말해서 JavaScriptUI는 CSS-in-JavaScript 솔루션입니다. DOM API가 HTML의 기능을 JavaScript로 이동하는 데 사용될 수 있는 것과 유사하게 우리는 CSS도 마찬가지로 할 수 있습니다. 이에 대한 두 가지 이유가 있습니다.

먼저, 변수, 연산자, 조건문, 반복문 및 함수와 같은 적절한 프로그래밍 개념을 사용하는 것은 스타일링과 레이아웃 구축에 훨씬 강력한 방법입니다. 손에 들고 있는 손가락 수만 있어도 우리가 원하는 거의 모든 것을 달성할 수 있습니다. 이러한 도구들은 CSS조차도 시작했기 때문에 널리 사용되는데, 그것은 어설픈 방식으로 도입되었습니다. 그러면 JavaScript가 처음부터 이 도구들을 가지고 있고 훨씬 더 나은 구현을 가지고 있을 때는 왜 CSS도 이 도구들을 도입하려고 하는지 생각해 보게 됩니다.

<div class="content-ad"></div>

두 번째로, CSS에는 이해하기 어려운 몇 가지 개념이 있어서 이를 이해하고 학습하며 생산적으로 활용하기가 매우 어려운 점이 있습니다. 이 추상화는 스타일링 및 레이아웃 작업 방식을 재설계할 수 있는 기회를 제공할 것입니다. 이에 대해 보통 제 사용하는 네 가지 범주는 다음과 같습니다:

- 현재 상태를 유지해야 하는 충분히 좋은 개념
- 좋지만 이름을 변경해야 하는 개념
- 잘못 설계되어 있어서 재설계가 필요한 개념
- 잘못된 개념이지만 재설계할 수 없는 경우

그럼 시작해 봅시다.

## 이 가독성이 떨어지는 방식

<div class="content-ad"></div>

일단 시작하면 "최상의" 관행을 위반해서 Views를 직접 대상으로 삼을 거에요. CSS가 이를 피하려고 애를 쓰는 것을 굉장히 재밌게 생각하죠. 어떤 옵션이 있는지 알아보죠:

- 인라인 스타일 사용:

```js
<p style="font-family: Helvetica; color: black; opacity: 0.5">Hello World</p>
```

- 외부 스타일 사용:

<div class="content-ad"></div>


```js
#foo {
    font-family: Helvetica;
    color: black;
    opacity: 0.5
}
```

- JavaScript로 스타일 사용:

```js
<p id="foo">Hello World</p>
```

<div class="content-ad"></div>

```javascript
const foo = document.getElementById("foo");
foo.style.fontFamily = "Helvetica";
foo.style.color = "black";
foo.style.opacity = 0.5;
```

이게 참으로 간단한 것인데 이렇게 못생겼게 보일 수 있는 건 정말 놀랍죠. 프론트엔드 개발 배울 때 아무나 시도해보는 가장 기본적인 것인데도 CSS가 왜 학습 곡선이 가파른지 궁금해지죠.

## 현재 브라우저 API의 주요 문제점

자바스크립트에서 스타일을 설정하는 방법은 두 가지가 있습니다: 개별 속성을 설정할 수도 있고, 뷰에서 클래스를 추가/제거할 수도 있습니다. 동적으로 클래스를 만드는 건 그다지 깔끔하지 않아서 저는 첫 번째 옵션에 집중하고 싶었어요.


<div class="content-ad"></div>

우리의 Views가 HTMLElements이기 때문에 이미 접근하여 스타일 속성을 설정할 수 있습니다. 이는 JavaScript의 기본적인 옵션인데, 몇 가지 문제가 있어서 별로 좋아하지 않습니다:

- 스타일 속성은 View 자체의 속성이 아니라 스타일 객체의 속성이므로 보일러플레이트가 추가되고 사용하기 어려워집니다.
- 여러 속성 이름과 값이 나쁘고 일관성이 없거나 의미가 없습니다.
- 타입 변환 및 단위 처리가 JavaScript의 동적 특성에 비해 꽤 좋지 않습니다.

그래서 단순히 Views에 스타일 속성을 추가하는 것만으로는 해결되지 않았습니다. 나머지 문제들도 해결할 수 있는 스타일 시스템이 필요했습니다.

```js
//이것도 그다지 좋지 않습니다.
const text = Text("style me");
text.fontFamily = "Helvetica"; 
text.color = "black";
text.opacity = 0.5;
```

<div class="content-ad"></div>

## Getter/setter

또 다른 흔한 방법은 값을 가져오거나 설정하기 전에 값을 처리하는 getter/setter 메소드를 사용하는 것입니다. 이를 여러 가지 방법으로 달성할 수 있습니다:

- 일반 속성과 접근자 설명자 사용
- Proxy 객체 사용
- getter/setter 메소드 쌍 사용

모든 옵션에는 중요한 단점이 있습니다: 일반 속성을 사용하는 것은 여전히 장황하며, Proxy를 추가하는 것은 지나친 것 같고 (그리고 현재는 HTML 요소를 래핑하는 것을 절대 피하고 싶습니다), 모든 속성을 두 가지 메소드로 정의하고 사용하는 것은 비대합니다. 제가 원했던 것은 훨씬 더 나은 것이면서 더 간결하며 물론 새로운 뷰 계층과 호환되어야 했습니다.

<div class="content-ad"></div>

## 아름다움이야말로 미인

얼마의 실험이 있었지만, 결국 getter/setter 메서드 구문을 결합하기로 결정했습니다. 여기 JavaScriptUI를 사용한 동일한 예제입니다:

```js
Text("Hello World")
    .fontFamily("Helvetica")
    .fontColor("black")
    .opacity(0.5);
```

이 방식에는 여러 가지 이점이 있습니다. 간결하고 균일하며 복잡한 작업을 내부에서 처리할 수 있습니다. 또한 메서드를 연쇄적으로 사용하여 선언적 뷰 트리와 호환됩니다.

<div class="content-ad"></div>

각 속성은 getter/setter 메서드를 사용하여 정의됩니다. 이 메서드는 인수가 있으면 setter로 작동하고 인수가 없으면 getter로 작동합니다. 이는 JavaScript에서는 지원되지 않지만 메서드 내부에서 전달된 인수의 개수를 확인하는 간단한 조건문으로 가짜로 만들 수 있습니다.

놀랍게도, setter는 View 자체를 반환할 수도 있어서 메소드 체이닝을 지원합니다.

따라서 다음과 같이:

```js
const text = Text("Hello World");
text.setFontFamily("Helvetica");
text.getFontFamily();
```

<div class="content-ad"></div>

우리는 이렇게 할 수 있어요:

```js
Text("안녕하세요 세계")
    .fontFamily("Helvetica")
    .fontFamily(); // 현재 글꼴 가져오기
```

이러한 메서드들은 CSS와 비교하면 더 나은 이름, 더 좋은 값, 더 좋은 값 유형, 심지어는 더 나은 인수(더 나은 숫자 및/또는 더 좋은 순서의 인수)를 가질 수 있어요. 이것 또한 유효한 JavaScript이므로 브라우저에서 그냥 실행하기 전에 컴파일, 트랜스파일, 빌드 또는 수정할 필요가 전혀 없어요.

<div class="content-ad"></div>

## 메탈을 밟으세요

우리가 뷰 트리로 할 때처럼 스크립팅 언어로 이동하면 거의 끝없이 새로운 가능성이 열립니다. 여기에서 JavaScriptUI가 할 수 있는 몇 가지 아이디어를 간략히 소개해 드리겠습니다:

- 값을 저장하기 위해 적절한 변수와 상수 사용

```javascript
const color = "darkgray";

Stack(
    Text("Hello World")
        .fontColor(color),

    Text("Hola mundo")
        .fontColor(color)
);
```

<div class="content-ad"></div>

- 값을 평가하는 연산자를 사용합니다

```js
let darkMode = true;

Text("Hello World")
    .fontColor(darkMode ? "white" : "black);
```

- 개체의 속성을 참조합니다

```js
const catImage = Image("cat.jpeg")
    .width(100)
    .height(300);

const dogImage = Image("dog.jpeg")
    .width(catImage.width())
    .height(catImage.height());
```

<div class="content-ad"></div>

- 더 복잡한 로직을 정의하기 위해 콜백(callbacks)을 사용하세요

```js
Image("hero.jpeg")
    .width(() => {
        if (device === "mobile") {
            return 400;
        }
        
        if (device === "tablet") {
            return 600;
        }
        
        if (device === "desktop") {
            return 1200;
        }
    });
```

- 컴포넌트를 생성하고 스타일 관리를 중앙 집중화하기 위해 사용자 정의 클래스를 사용하세요

```js
function Button(label) {
    return Text(label)
        .width("content")
        .height("content")
        .padding(12, 40, 12, 40)
        .cornerRadius(50)
        .backgroundColor("lightblue");
}

Stack(
    Button("Log in"),
    Button("Subscribe")
);
```

<div class="content-ad"></div>

- 반응형 프로그래밍을 위해 상태 값(즉, 시그널)를 사용합니다.

```js
Image("welcome.png")
    .width(viewport.width) // viewport.width가 변경될 때마다 재계산됩니다.
    .height(viewport.height); // viewport.height가 변경될 때마다 재계산됩니다.
```

이것은 JavaScriptUI에서 이미 사용 가능한 아이디어 중 일부에 불과하며, 앞으로 더 많은 아이디어가 있고 더 실험 중인 것도 많습니다.

## 그럼 이만큼입니다.

<div class="content-ad"></div>

여러분께 보여드릴 기능이 아직 많지만, 지금은 여기까지 하겠습니다. 앞으로 몇 주 동안 JavaScriptUI가 레이아웃 작성을 어떻게 간소화하는지, 상호 작용을 어떻게 처리하는지, 다양한 상태/신호 구현을 어떻게 실험하는지, 그리고 전체적인 프론트엔드 개발을 개선하기 위해 여러 가지 HTML 및 CSS 개념을 어떻게 수정했는지를 보여드릴 예정입니다.

그러니 기대해 주시고, JavaScriptUI를 좋아하신다면 박수를 치거나 댓글을 달거나 다른 사람들과 공유해 주시기 바랍니다.

감사합니다. 즐거운 한 주 되세요.

⬅️ JavaScriptUI — 개발블로그 #2, `rip`HTML`/rip`