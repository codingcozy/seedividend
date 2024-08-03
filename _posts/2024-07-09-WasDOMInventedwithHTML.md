---
title: "DOM이 HTML과 함께 발명되었나요"
description: ""
coverImage: "/assets/img/2024-07-09-WasDOMInventedwithHTML_0.png"
date: 2024-07-09 08:48
ogImage:
  url: /assets/img/2024-07-09-WasDOMInventedwithHTML_0.png
tag: Tech
originalTitle: "Was DOM Invented with HTML?"
link: "https://medium.com/@nile.bits/was-dom-invented-with-html-67e42091b063"
---

<img src="/assets/img/2024-07-09-WasDOMInventedwithHTML_0.png" />

소스: [https://www.nilebits.com/blog/2024/07/was-dom-invented-with-html/](https://www.nilebits.com/blog/2024/07/was-dom-invented-with-html/)

# 소개

문서 객체 모델(DOM)은 HTML 및 XML 콘텐츠를 구성 정돈된 방식으로 표현하여 웹 개발의 필수 구성 요소입니다. 그렇다면 HTML은 DOM보다 먼저 개발되었을까요? 이 기사에서는 DOM과 HTML의 역사를 탐구하며, 그 발전과 최종적인 융합을 살펴보겠습니다. 우리는 이 둘의 기술적인 세부 사항을 함께 살펴보며, 중요한 아이디어를 강조하기 위해 코드 샘플을 제공할 것입니다. 이러한 기술의 진행 과정을 이해하는 것은 현대 웹을 영향을 주는 방식과 웹 개발 방법론에 영향을 주는 방식을 명확히 해줍니다.

<div class="content-ad"></div>

# HTML이 탄생

HTML 또는 하이퍼텍스트 마크업 언어는 1991년 팀 버너스-리에 의해 발명되었습니다. 이것은 웹에서 정보를 게시하고 탐색하기 위한 간단한 방법을 만들기 위해 설계되었습니다. HTML의 첫 번째 버전은 다소 간단했습니다. 문서를 구조화하기 위한 기본 태그로 구성되어 있었습니다.

```js
<!DOCTYPE html>
<html>
<head>
    <title>첫 번째 HTML 문서</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>이것은 문단입니다.</p>
</body>
</html>
```

# HTML의 초기 시절

<div class="content-ad"></div>

HTML의 초기 버전은 오늘날 볼 수 있는 정교한 기능이 없었습니다. 주로 텍스트, 링크 및 간단한 미디어 요소로 정적 페이지를 생성하는 데 사용되었습니다. 웹이 성장함에 따라 더 동적이고 인터랙티브한 콘텐츠에 대한 필요성도 커졌습니다.

90년대 초반에는 기능이 적은 새로운 매체였습니다. 초기 웹 사이트는 텍스트 기반이었고 현재 표준으로 여기는 인터랙티브 기능이 부족했습니다. 웹을 활용하는 개인이 늘어나면서 더 풍부한 정보와 개선된 사용자 경험에 대한 요구가 증가했습니다.

# 팀 버너스-리의 비전

팀 버너스-리의 웹 비전은 국제 정보 허브를 구축하는 것이었습니다. 논문을 연결하는 하이퍼링크를 사용해 사용자가 한 정보에서 다른 정보로 쉽게 이동할 수 있도록 한 방법을 제안했습니다. 이 개념으로 인해 오늘날 우리가 알고 있는 World Wide Web 및 HTML이 가능해졌습니다.

<div class="content-ad"></div>

버너스리의 HTML에 대한 최초 제안은 웹 문서의 구조를 설명하기 위해 설계된 18개의 요소로 이루어져 있었습니다. 이러한 요소들은 제목, 단락, 목록, 링크를 만들 수 있게 해주었으며 초기 웹 페이지의 기초를 형성했습니다.

# HTML의 진화

웹이 발전함에 따라 HTML도 발전해왔습니다. 웹 개발자와 사용자들의 성장하는 요구를 해결하기 위해 HTML의 새로운 버전이 개발되었습니다. 1995년에 출시된 HTML 2.0은 첫 번째 표준 버전으로, 이후의 개선을 위한 기반이 제공했습니다. 후속 버전들은 표, 폼, 멀티미디어 지원과 같은 기능들을 도입했습니다.

```js
<!DOCTYPE html>
<html>
<head>
    <title>HTML 2.0 문서</title>
</head>
<body>
    <h1>HTML 2.0 기능</h1>
    <p>이 버전은 표와 폼을 소개했습니다.</p>
    <table>
        <tr>
            <th>열 1</th>
            <th>열 2</th>
        </tr>
        <tr>
            <td>데이터 1</td>
            <td>데이터 2</td>
        </tr>
    </table>
    <form action="/submit">
        <label for="name">이름:</label>
        <input type="text" id="name" name="name">
        <input type="submit" value="제출">
    </form>
</body>
</html>
```

<div class="content-ad"></div>

# 더 많은 상호 작용성이 필요한 이유

웹의 상호 작용성을 약속하는 것은 1990년대 중반쯤에 분명해졌습니다. 개발의 목표는 사용자 경험을 더 다이내믹하고 매력적으로 만드는 것이었습니다. JavaScript와 같은 스크립팅 언어의 등장은 웹 페이지의 클라이언트 측 수정을 가능하게 한 이 상호 작용성의 요구에서 비롯되었습니다.

정적 HTML의 제한성이 분명해지고 동적 콘텐츠에 대한 수요가 증가했습니다. JavaScript는 HTML 요소를 실시간으로 조작하는 방법을 제공하여 더 풍부하고 상호 작용적인 웹 애플리케이션의 길을 열었습니다.

# 현대 웹 개발에서의 HTML의 역할

<div class="content-ad"></div>

오늘날 HTML은 웹 개발의 기초를 이루고 있습니다. 특히 HTML5는 멀티미디어, 그래픽 및 복잡한 웹 애플리케이션을 지원하는 고급 기능을 포함하고 있습니다. 반응형 및 인터랙티브 웹사이트를 만드는 견고한 기반을 제공합니다.

```js
<!DOCTYPE html>
<html>
<head>
    <title>HTML5 예제</title>
</head>
<body>
    <h1>HTML5 기능들</h1>
    <video width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4">
        브라우저가 비디오 태그를 지원하지 않습니다.
    </video>
    <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>
    <script>
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        context.fillStyle = '#FF0000';
        context.fillRect(10, 10, 150, 75);
    </script>
</body>
</html>
```

HTML의 발전은 그것이 겸손한 시작에서 현재의 형태로 변화한 웹을 강력하고 다재다능한 플랫폼으로 반영합니다. HTML의 지속적인 발전은 현대 웹 애플리케이션 요구를 충족할 수 있도록 해줍니다.

# DOM이란 무엇인가요?

<div class="content-ad"></div>

웹 문서에는 Document Object Model(DOM)이라는 프로그래밍 인터페이스가 포함되어 있어요. 이를 사용하여 프로그램은 페이지의 대표로 사용하여 문서의 구조, 디자인 및 내용을 변경할 수 있어요. DOM에 의해 문서는 객체 트리로 표시되며, 각 객체는 콘텐츠의 다른 섹션을 나타내요.

# DOM의 구조

DOM은 HTML 또는 XML 문서를 트리 구조로 나타내며, 각 노드는 문서 일부를 나타내는 객체에요. 이러한 트리 구조는 개발자가 프로그래밍 방식으로 문서의 요소를 탐색하고 조작할 수 있도록 도와줘요.

```js
<!DOCTYPE html>
<html>
<head>
    <title>DOM Example</title>
</head>
<body>
    <h1 id="heading">Hello, World!</h1>
    <p>This is a paragraph.</p>
    <button id="changeText">Change Text</button>
    <script>
        // DOM에서 요소에 접근
        document.getElementById("changeText").addEventListener("click", function() {
            document.getElementById("heading").innerHTML = "Text Changed!";
        });
    </script>
</body>
</html>
```

<div class="content-ad"></div>

위의 예에서 DOM은 HTML 문서를 객체 트리로 나타냅니다. 각 요소(예: `h1` 및 `p` 태그)는 DOM 트리에서 노드입니다. JavaScript를 사용하여 이러한 노드와 상호 작용하여 문서의 내용과 구조를 동적으로 변경할 수 있습니다.

# DOM 작동 방식

DOM은 언어 중립적 인터페이스로, 다양한 프로그래밍 언어와 함께 사용할 수 있지만 웹 개발에서는 주로 JavaScript와 함께 사용됩니다. 문서가 보여지는 동안 스크립트가 콘텐츠, 구조 및 스타일을 업데이트할 수 있도록 도와줍니다.

다음은 DOM을 사용하여 수행할 수 있는 주요 작업 몇 가지입니다:

<div class="content-ad"></div>

- 요소에 액세스하기: ID, 클래스, 태그 이름 또는 다른 속성으로 요소에 액세스할 수 있습니다.

```js
var element = document.getElementById("myElement");
```

- 요소 수정하기: 콘텐츠, 속성, 스타일을 변경할 수 있습니다.

```js
element.innerHTML = "새로운 내용";
element.style.color = "빨강";
```

<div class="content-ad"></div>

- 요소 생성하기: 새로운 요소를 만들어 문서에 추가할 수 있습니다.

```js
var newElement = document.createElement("div");
newElement.innerHTML = "안녕, DOM!";
document.body.appendChild(newElement);
```

- 요소 제거하기: 문서에서 요소를 제거할 수 있습니다.

```js
var elementToRemove = document.getElementById("myElement");
elementToRemove.parentNode.removeChild(elementToRemove);
```

<div class="content-ad"></div>

# DOM의 진화

DOM은 여러 수준을 통해 발전해 왔으며, 각 수준에서는 새로운 기능이 추가되고 이전 버전의 한계가 해결되었습니다.

- DOM 레벨 1 (1998): 문서 조작에 대한 기본 메서드를 제공하는 초기 명세입니다.
- DOM 레벨 2 (2000): XML 네임스페이스 지원, 이벤트 처리 향상, CSS 지원 개선이 도입되었습니다.
- DOM 레벨 3 (2004): XPath 지원 추가, 더 나은 문서 탐색, 오류 처리 개선이 이루어졌습니다.

# 모던 DOM 특징들

<div class="content-ad"></div>

현대 웹 개발은 동적이고 대화형 웹 애플리케이션을 만들 때 DOM에 많이 의존합니다. 다음은 현대 DOM 기능의 예시입니다:

- 이벤트 처리: 사용자의 작업에 반응하기 위해 이벤트 리스너를 추가합니다.

```js
document.getElementById("myButton").addEventListener("click", function () {
  alert("버튼이 클릭되었습니다!");
});
```

- 속성 조작: 엘리먼트의 속성을 변경합니다.

<div class="content-ad"></div>

```js
var img = document.getElementById("myImage");
img.src = "new-image.jpg";
```

- 클래스 작업: CSS 클래스 추가, 제거 또는 토글.

```js
var element = document.getElementById("myElement");
element.classList.add("newClass");
```

- DOM 탐색: DOM 트리를 탐색합니다.

<div class="content-ad"></div>

```js
var parent = document.getElementById("childElement").parentNode;
var children = document.getElementById("parentElement").childNodes;
```

# DOM의 중요성

현대 웹 개발자가 동적이고 인터랙티브한 사용자 경험을 구축하기 위해서는 문서 객체 모델(DOM)에 접근할 수 있어야 합니다. DOM은 프로그래밍 가능한 온라인 문서 조작의 기초를 제공하며, 실시간 변경과 상호작용이 가능하게 해줍니다. 웹 애플리케이션이 더 복잡해지면서 DOM은 계속 변화하며, 개발자의 요구를 충족시키기 위해 새로운 기능과 기능이 추가됩니다.

DOM을 이해하고 효과적으로 사용하는 것은 웹 개발자에게 중요합니다. 이를 통해 사용자 입력에 응답하고 동적 콘텐츠를 제공하여 전체 사용자 경험을 향상시키는 리치하고 인터랙티브한 웹 애플리케이션을 만들 수 있습니다.

<div class="content-ad"></div>

# DOM 표준화

다양한 웹 브라우저는 문서 객체 모델(DOM)이 초기에 표준화되지 않았기 때문에 호환성 문제가 있습니다. 이러한 차이로 인해 초기 웹 개발자들은 모든 기기에서 균일하게 작동하는 웹 사이트를 구축하는 데 어려움을 겪었습니다. 이러한 문제에 대응하고 온라인 문서를 조작하는 일관된 방법을 보장하기 위해 DOM의 표준화가 필요했습니다.

# 초기 구현 및 도전

1990년대 중반에 HTML 문서와 상호 작용하기 위해 사용된 두 가지 주요 스크립팅 언어는 Microsoft의 JScript와 Netscape의 JavaScript였습니다. 각 브라우저가 다른 버전의 DOM을 구현했기 때문에 호환성 문제가 발생했습니다. 각기 다른 브라우저가 인터넷 익스플로러와 넷스케이프 네비게이터처럼 문서 구성 요소에 액세스하고 수정하는 다른 방법을 가지고 있기 때문에 크로스 브라우저 프로그래밍은 어려웠습니다.

<div class="content-ad"></div>

```js
// 넷스케이프 네비게이터
document.layers["myLayer"].document.open();
document.layers["myLayer"].document.write("안녕, 네비게이터!");
document.layers["myLayer"].document.close();

// 인터넷 익스플로러
document.all["myLayer"].innerHTML = "안녕, 익스플로러!";
```

표준화된 모델이 없어 개발자들은 서로 다른 브라우저를 위해 다른 코드를 작성해야 했기 때문에 개발 시간과 복잡성이 증가했습니다. 이 분산은 웹이 풍부하고 인터랙티브한 콘텐츠를 위한 플랫폼으로 성장하는 것을 방해했습니다.

# 세계 웹 consorium (W3C)의 역할

일관성의 필요성을 인정한 세계 웹 consorium (W3C)가 공통 문서 객체 모델을 만드는 데 주도적인 역할을 맡았습니다. 웹의 지속적인 확장을 보장하기 위해 W3C라는 글로벌 커뮤니티가 개방 표준을 만들고 있습니다. DOM Level 1은 W3C에 의해 1998년에 발표된 최초의 표준화된 DOM 버전입니다.

<div class="content-ad"></div>

# DOM 레벨 1 (1998)

DOM 레벨 1은 문서 구조 및 콘텐츠를 조작하기 위한 기본 인터페이스 집합을 제공했습니다. 이는 스크립트가 HTML 및 XML 문서의 콘텐츠, 구조 및 스타일에 액세스하고 업데이트하는 표준화된 방법을 정의했습니다. 이 표준화는 다양한 브라우저에서 일관되게 작동하는 코드를 개발자가 작성할 수 있도록 해 주어 중요한 이정표였습니다.

```js
// 표준화된 DOM 레벨 1 코드
var element = document.getElementById("myElement");
element.innerHTML = "안녕, DOM!";
```

DOM 레벨 1은 핵심 기능을 제공하는 데 초점을 맞추었습니다. 여기에는 아래와 같은 기능이 포함되어 있습니다:

<div class="content-ad"></div>

- 문서 탐색: 문서 트리를 탐색하는 방법.
- 요소 조작: 요소에 액세스하고 수정하는 방법.
- 이벤트 처리: 이벤트 처리를 위한 기본 지원.

# DOM 레벨 2 (2000)

DOM 레벨 2는 DOM 레벨 1의 기능을 확장하여 다음과 같은 새로운 기능을 소개했습니다:

- XML 네임스페이스: 여러 XML 어휘를 처리하기 위한 XML 네임스페이스 지원.
- 향상된 이벤트 처리: 이벤트 캡처링과 버블링을 지원하는 개선된 이벤트 모델.
- CSS 조작: CSS 스타일에 액세스하고 조작하는 방법.

<div class="content-ad"></div>

```js
// DOM 레벨 2에서 이벤트 리스너 추가하기
document.getElementById("myButton").addEventListener("click", function () {
  alert("버튼 클릭됨!");
});
```

# DOM 레벨 3 (2004)

DOM 레벨 3은 새로운 기능을 도입하고 기존 기능을 개선하여 DOM을 더욱 강화했습니다:

- XPath 지원: XPath 표현식을 사용하여 문서를 쿼리하는 방법.
- 문서 탐색 및 범위: 더 고급화된 문서 탐색 및 조작을 위한 인터페이스.
- 오류 처리 개선: 오류 및 예외를 처리하기 위한 향상된 메커니즘.

<div class="content-ad"></div>

```js
// DOM Level 3에서 XPath 사용하기
var xpathResult = document.evaluate("//h1", document, null, XPathResult.ANY_TYPE, null);
var heading = xpathResult.iterateNext();
alert(heading.textContent);
```

# 표준화의 영향

W3C에 의한 DOM의 표준화는 웹 개발에 깊은 영향을 미쳤습니다:

- 일관성: 개발자들은 다양한 브라우저에서 작동하는 코드를 작성할 수 있어 브라우저별 코드 필요성을 줄였습니다.
- 상호운용성: 표준화된 방법과 인터페이스는 사용자의 브라우저에 관계없이 웹 페이지가 일관되게 동작하도록 보장했습니다.
- 혁신: 표준화는 고급 웹 애플리케이션의 개발을 위한 안정적인 기반을 제공하며 웹 기술의 추가 혁신을 가능케 했습니다.

<div class="content-ad"></div>

# 최신 DOM 표준

DOM은 계속 발전하고 있으며 최신 표준은 이전 버전에서의 기반을 미리 놓고 구축하고 있습니다. 예를 들어, HTML5는 Canvas API, 웹 스토리지 및 웹 워커와 같은 DOM에 의존하는 새로운 API 및 기능을 소개했습니다.

```js
// DOM을 사용하여 HTML5 Canvas API 사용
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.fillStyle = "#FF0000";
context.fillRect(0, 0, 150, 75);
```

DOM의 표준화는 웹의 발전에서 중요한 단계였으며, 개발자가 웹 문서와 상호 작용할 수 있는 일관된 신뢰성 있는 방법을 제공했습니다. W3C의 작업을 통해 이러한 표준을 개발하고 유지함으로써, 웹은 동적이고 대화식 컨텐츠를 만드는 강력하고 다재다능한 플랫폼으로 남아 있도록 보장되었습니다. DOM이 계속 발전함에 따라 웹 개발에서 중심적인 역할을 계속할 것입니다.

<div class="content-ad"></div>

# HTML과 DOM: 뒤얽힌 진화

HTML과 문서 객체 모델(DOM)은 처음에는 별도로 개발되었지만, 웹이 성숙해짐에 따라 점점 더 밀접하게 얽혀들게 되었습니다. 동적이고 상호작용적인 콘텐츠의 필요성은 HTML의 향상을 이끌었는데, 이러한 개선사항들은 웹 페이지와의 상호작용에 DOM을 필요로 했습니다. 이 섹션에서는 HTML과 DOM이 함께 어떻게 발전해왔는지를 탐색하며, 웹 개발에 미치는 주요 이정표와 영향을 강조합니다.

# 초기 웹: 정적 HTML과 제한된 상호작용

인터넷 초기에 HTML은 주로 정적인 웹 페이지에 사용되었습니다. 이러한 사이트에서는 매우 적거나 아예 상호작용을 할 수 없었습니다. 그저 텍스트, 그래픽 및 링크만이 존재했습니다. 제목, 단락, 목록 및 링크와 같은 구성 요소들이 포함된 문서는 HTML을 사용하여 구성될 수 있습니다.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html>
<head>
    <title>Initial Web Page</title>
</head>
<body>
    <h1>Welcome to the Beginning of the Web</h1>
    <p>This is a basic static web page.</p>
    <a href="https://www.example.com">Go to Example</a>
</body>
</html>
```

하지만 웹이 인기를 얻으면서 더 다이나믹하고 상호 작용적인 콘텐츠에 대한 수요가 증가했습니다. 이 수요는 JavaScript와 같은 스크립팅 언어 개발로 이어졌는데, 이는 개발자가 HTML 문서를 프로그래밍적으로 조작할 수 있게 해주었습니다.

# JavaScript와 동적 HTML의 출현

넷스케이프가 1995년도에 소개한 JavaScript는 스크립트가 HTML 문서와 상호 작용할 수 있게 함으로써 웹 개발을 혁신하였습니다. 이 상호 작용은 문서의 구조화된 표현을 제공하는 DOM을 통해 가능해졌습니다.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html>
<head>
    <title>Dynamic HTML Example</title>
</head>
<body>
    <h1 id="heading">Hello, World!</h1>
    <button onclick="changeText()">Change Text</button>

<script>
        function changeText() {
            document.getElementById("heading").innerHTML = "Text Changed!";
        }
    </script>
</body>
</html>
```

이 예제에서 JavaScript는 버튼을 클릭할 때 `h1` 요소의 내용을 변경하기 위해 DOM을 사용합니다. 이 기능은 동적 HTML(DHTML)의 시작을 표시하며 더 많은 상호작용적이고 매력적인 웹 페이지를 만들 수 있게 해줍니다.

# HTML의 진화: 새로운 요소와 API 소개

웹 개발자들이 동적 콘텐츠의 가능성을 탐색할 때 HTML은 계속 발전해왔습니다. HTML의 새로운 버전은 상호작용 웹 페이지를 만드는 능력을 향상시키는 요소와 속성을 소개했습니다.

<div class="content-ad"></div>

- HTML 4.0 (1997): 인라인 프레임(iframe), 향상된 폼 컨트롤 및 스크립팅 언어 지원과 같은 기능을 소개했습니다.
- HTML 5 (2014): 새로운 의미론적 요소, 멀티미디어 지원 및 오프라인 저장, 그래픽 및 실시간 통신을 위한 API를 포함한 중요한 향상을 가져왔습니다.

```js
<!DOCTYPE html>
<html>
<head>
    <title>HTML5 예시</title>
</head>
<body>
    <header>
        <h1>HTML5 향상 기능</h1>
    </header>
    <section>
        <video width="320" height="240" controls>
            <source src="movie.mp4" type="video/mp4">
            브라우저가 비디오 태그를 지원하지 않습니다.
        </video>
    </section>
    <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>

<script>
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        context.fillStyle = '#FF0000';
        context.fillRect(10, 10, 150, 75);
    </script>
</body>
</html>
```

# 현대 웹 개발: HTML5, CSS3 및 JavaScript

오늘날 웹 개발의 핵심 기술은 HTML, CSS 및 JavaScript입니다. JavaScript는 상호 작용을 가능하게 하며, HTML은 구조를 제공하고 CSS는 디스플레이를 관리합니다. 이러한 기술들은 DOM에 의해 함께 유지되며 원활한 작동을 가능하게 합니다.

<div class="content-ad"></div>

## HTML5 및 새로운 API

HTML5은 DOM에 크게 의존하는 여러 새로운 API를 소개했으며, 개발자들이 보다 풍부하고 인터랙티브한 웹 애플리케이션을 생성할 수 있게 합니다:

- Canvas API: 그래픽 및 애니메이션을 그리기 위한 API입니다.
- Web Storage API: 사용자의 브라우저 내에서 데이터를 로컬로 저장하기 위한 API입니다.
- Geolocation API: 사용자의 지리적 위치를 검색하기 위한 API입니다.

```js
// DOM과 함께 Geolocation API 사용
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    document.getElementById("location").innerHTML =
      "위도: " + position.coords.latitude + "<br>" + "경도: " + position.coords.longitude;
  });
}
```

<div class="content-ad"></div>

## CSS3와 고급 스타일링

CSS3는 애니메이션, 전환 및 변형을 포함한 웹 페이지 스타일링을 위한 새로운 기능과 기능을 소개했습니다. 이러한 향상된 기능은 개발자가 DOM과 함께 작동하는 시각적으로 매력적이고 인터랙티브한 사용자 인터페이스를 만들 수 있도록 합니다.

```css
/* CSS3 전환 예제 */
#box {
  width: 100px;
  height: 100px;
  background-color: blue;
  transition: width 2s;
}

#box:hover {
  width: 200px;
}
```

# 프레임워크와 라이브러리의 역할

<div class="content-ad"></div>

현대 웹 개발은 종종 DOM과 직접 작업하는 복잡성을 추상화하는 프레임워크와 라이브러리를 사용하는 것을 포함합니다. React, Angular, Vue.js와 같은 프레임워크는 복잡한 웹 애플리케이션을 구축하는 강력한 도구를 제공하면서 기본 DOM에 의존합니다.

```js
// React 컴포넌트 예시
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "안녕, 세상아!" };
  }

  changeText = () => {
    this.setState({ text: "텍스트가 변경되었습니다!" });
  };
  render() {
    return (
      <div>
        <h1>{this.state.text}</h1>
        <button onClick={this.changeText}>텍스트 변경</button>
      </div>
    );
  }
}
ReactDOM.render(<MyComponent />, document.getElementById("root"));
```

# 결론

더욱 동적이고 상호작용적인 웹 콘텐츠에 대한 요구는 HTML과 DOM의 발전을 촉발시켰습니다. HTML과 DOM은 초기 웹의 정적 페이지에서 오늘날의 풍부하고 동적인 앱으로 사용자와 개발자의 요구를 충족하기 위해 발전해 왔습니다. 현대 웹의 진화는 웹 기술이 발전함에 따라 HTML과 DOM 간 상호작용에 중점을 둘 것입니다.

<div class="content-ad"></div>

# 참고 자료

- W3C DOM 명세서
- HTML의 역사
- 팀 버너스-리의 HTML 원본 제안서
- 자바스크립트와 초기 브라우저 전쟁
- HTML5 및 웹 API
- CSS3 전환과 애니메이션

출처: https://www.nilebits.com/blog/2024/07/was-dom-invented-with-html/
