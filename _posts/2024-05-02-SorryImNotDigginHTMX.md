---
title: "HTMX가 개발자들에게 인기 없는 이유"
description: ""
coverImage: "/assets/img/2024-05-02-SorryImNotDigginHTMX_0.png"
date: 2024-05-02 00:56
ogImage:
  url: /assets/img/2024-05-02-SorryImNotDigginHTMX_0.png
tag: Tech
originalTitle: "Sorry, I’m Not Diggin’ HTMX"
link: "https://medium.com/@kentondejong/sorry-im-not-diggin-htmx-cc28df862910"
---

![image](/assets/img/2024-05-02-SorryImNotDigginHTMX_0.png)

언제나 새로 나오는 기술에 대해 비판적이라고 해도 되겠죠. 그래서 HTMX에 대해 처음 들었을 때부터 팬이 아니었어요.

HTMX는 "자바스크립트 대신 HTML에서 직접 현대적인 브라우저 기능에 액세스할 수 있도록 하는 라이브러리"라고 설명되어 있는데, HTMX를 사용하는 첫 번째 단계는 자바스크립트 라이브러리를 포함해야 한다는 거잖아요:

```js
<script
  src="https://unpkg.com/htmx.org@1.9.10"
  integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
  crossorigin="anonymous"
></script>
```

<div class="content-ad"></div>

![image](https://miro.medium.com/v2/resize:fit:960/1*Z6JScodi-nf6CEtuSxaBmw.gif)

내게 더 감명깊게 만들었을 것은 JavaScript 이외의 언어를 사용했다면 였을 겁니다. 예를 들어, WebAssembly를 사용하는 Blazor나 기술적으로는 여전히 JavaScript인데 Python으로 작성된 Brython 같은 것들이 있죠. 색다른 솔루션은 인정하지만, JavaScript를 사용하지 않는다고 주장하면서 실제로는 JavaScript를 사용한다면, 자바스크립트 라이브러리가 계속 늘어난다는 장난이었을까 하는 생각이 들었어요.

안타깝게도 이것은 농담이 아니예요.

하지만, 이것 때문에 HTMX 아이디어를 뭔가 좀 무시해버렸죠. 그러나, X와 Reddit 등 어디서나 계속 HTMX에 대해 듣고 있는데, 특히 이것이 프로젝트에 통합하기가 얼마나 쉬운지에 대해 말이죠. 정말로 일반적인 JavaScript보다 얼마나 더 쉬운지. 얼마나 쉬운가요? 쉬워요? 쉬워요?? 제가 정말로 이해하지 못했습니다.

<div class="content-ad"></div>

하지만 이 프레임워크에 대해 더 알고 싶게 된 이유는 Jason Knight의 HTMX, "Framework Stupid"이 심도깊게 늘어난 것이었습니다! Knight의 글은 항상 재밌게 읽히며, 그는 몇 가지 탄탄한 주장을 펼쳐 HTMX가 진지하게 다가오지 않는다면, 나도 진지하게 받아들이지 않아도 된다는 것을 깨닫게 했습니다.

일단, HTMX에 대해서 더 알려주는 몇 가지 핵심 "모티베이션" 포인트가 있으며, 이들 중 어느 것도 나에게는 정말 이해하기 어렵습니다.

## 1. `<a>`와 `<form>`만이 HTTP 요청을 보낼 수 있는 이유는 무엇인가요?

사실 아닙니다. `img` 태그도 마찬가지이며, `audio`, `video`, `iframe`, `embed`, `frame`과 `link`, `script`와 같은 미디어 태그도 HTTP 요청을 보낼 수 있습니다.

<div class="content-ad"></div>

## 2. 클릭 및 제출 이벤트만 [HTTP 요청]을 트리거해야 하는 이유는 무엇인가요?

(왜 첫 번째 항목에는 "and"라고 하고 두 번째 항목에는 "&"이라고 할까요? 일관성이 있을 것 같지 않나요? 어쨌든, 제가 지나치게 까다로운 것 같아요. 그들이 실제 현금 협찬을 받는 신생 기술인 것처럼 보이지는 않잖아요.)

이 명제는 사실이 아닙니다. HTTP 요청은 나태 속성을 포함하는 이미지로 동적으로 트리거될 수 있습니다. 그리고 클릭 외에도 터치 이벤트도 있습니다. 물론 onload와 같이 HTTP 요청을 호출하는 명백한 방법뿐만 아니라 EventSource와 같이 뜻밖의 방법도 있습니다. 클릭 및 제출 외에도 HTTP 요청을 트리거하는 여러 방법이 많이 있습니다.

## 3. 왜 GET 및 POST 메서드만 사용 가능해야 하나요?

<div class="content-ad"></div>

이건 너가 빠져들 수 있는 토끼굴이야! 물론 계속해서 토론을 해왔고 또 해왔지만. 예를 들어, 이 W3C 권고서는 2009년 10월 20일에 발표됐고 또는 이 2011 스택익스체인지 스레드나 이 2012 W3C 버그 리포트에서 다뤄졌어.

이건 여러 번 제안된 적이 있지만 항상 거부당했어. 왜 그럴까? HTML5 Working draft을 만드는 인간, 전설이자 신화인 이안 힉슨에 따르면:

나에겐 이해가 돼!

## 4. 왜 전체 화면만 교체할 수 있어야 할까?

<div class="content-ad"></div>

웹사이트가 `테이블`과 `프레임`으로 만들어졌던 시절이 그립다면, 정말 행운아지! 요즘에는 React부터 Blazor까지 다양한 컴포넌트들이 있어서 옛 콘텐츠를 그대로 두고도 새로운 콘텐츠로 업데이트할 수 있는 독립적인 동적 요소들이 등장했어.

하지만, 이 같은 기능은 예전부터 있었어. 2006년에 출시된 jQuery 1.0은 바로 이것을 수행하는 load() 메소드를 가지고 있었어:

```js
$("#result").load("ajax/test.html #container");
```

이와 같은 기능은 바닐라 JavaScript로도 아주 쉽게 할 수 있지:

<div class="content-ad"></div>

```js
let resultElement = document.getElementById("result");

fetch("ajax/test.html")
  .then((response) => response.text())
  .then((html) => {
    let tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    let containerContent = tempElement.querySelector("#container").innerHTML;
    resultElement.innerHTML = containerContent;
  })
  .catch((error) => console.error("콘텐츠를 불러오는 중 오류가 발생했습니다:", error));
```

![링크](https://miro.medium.com/v2/resize:fit:960/1*5bwk8lXsMpJK7xyn-LJ1-A.gif)

# HTMX가 테이블에 무엇을 가져다주나요?

그들의 동기에는 동의하지 않지만, 그들이 자바스크립트를 사용하고 있다는 점에서 그들이 자바스크립트 없는 시스템을 운영하고 있다고 주장하는 것에도 동의하지 않습니다. 그럼에도 불구하고 HTMX가 제게 어떻게 생활을 편하게 해줄 수 있을지 알고 싶었습니다. 이론에는 동의할 수 없을지라도 실제로는 맘에 들 수도 있지 않을까요?

<div class="content-ad"></div>

그래서 나는 그들의 Hypermedia On Whatever you’d Like 라는 기사를 읽었어. 그 기사에서는 HOWL 스택에 대해 이야기하고 있었는데 (그렇기 때문에 "you’d" 가 소문자로 적힌 것... 나를 괴롭히는 것...). 이 기사는 JavaScript가 프런트엔드 개발의 기본 언어이기 때문에 백엔드에서도 사용할 필요가 있다는 압박(그들의 말)이 많다고 이야기하고 있어. 10년 이상 코딩을 해 온 나로써는 이 압박을 전혀 느낀 적이 없어. 마음대로 사용하거나, 이용주가 원하는대로 사용하면 돼. 웹사이트의 73%가 워드프레스를 실행하고 있다. 왜 PHP로 만들어진 웹사이트인 워드프레스 Headless CMS를 사용해야 할까?(너를 쳐다봐, 워드프레스 Headless CMS.) PHP가 오래된 언어인가? 나는 6개월마다 새로운 JavaScript 라이브러리를 채택하는 것보다는 PHP를 사용하는 게 좋다. 또 다른 더 인기 있는 대안도 많다는 거지.

이 기사는 이렇게 마무리돼:

… 하지만 그게 아니잖아?? 이들의 주장에 대해 이해할 수가 없어. React는 사이트의 3.5%에서 사용되고 있고, Node.js는 3%에서 사용되고 있다. PHP는 73%, ASP.NET은 6%를 차지하고 있다. JavaScript를 사용할 수는 있지만, 단일 옵션으로 고려해서는 안 된다.

그들이 인용한 사이트 중 하나는 "HTMX + Flask: 최신 Python 웹 앱, JavaScript 제외한 코스"다. 이 코스는 Flask를 HTMX와 함께 사용하는 방법을 보여주는 3시간 강의인데, 단지 사용할 수 있다는 점 외에는, 왜 사용해야 하는지 이해가 안 가. JavaScript를 코딩하지 않고 사용하기 위한 것일까? 나는 더 이해하기 위해 이 코스를 듣고 싶지만, 그 기술을 그 이면을 이해하지 않고 사용하는 아이디어는 파괴적인 결과를 낼 수 있다. 자바스크립트나 CSS 기본 원리를 이해하지 않은 채 React나 Tailwind 같은 프레임워크를 사용하는 개발자들을 보면 그게 확실하게 확인된다.

<div class="content-ad"></div>

![HTMX](https://miro.medium.com/v2/resize:fit:960/1*LovCpYqVf20IXXpi3VZ2JA.gif)

# HTMX를 시도해보려면 어떤 점이 필요할까요?

저가 HTMX를 사용하는 데 제일 막혀 있는 것은 그들의 동기, 실천 또는 문법에 동의하지 않아서가 아닙니다. 그들이 hyperscript.js를 만들어서 꽤 멋지다고 생각하기 때문에도 아닙니다. 또한 Knight가 그의 글에서 언급한 그들의 끔찍하게 유효하지 않고 접근하기 어려운 HTML 때문도 아닙니다. 저는 그 모든 것을 넘어서 볼 수 있습니다.

HTMX를 시도해보게끔 만들기 위해 그들이 해야 할 일은 그들의 웹 사이트가 실제로 HTMX를 사용한다면 좋겠다는 것입니다. 그들의 웹 사이트는 꽤 간단하지만, HTMX를 실제로 사용해보여주기에 훌륭한 기회입니다. 홈페이지는 꽤 최소한이지만, 설명서 페이지는 그렇지 않습니다. 각 섹션에 대해 다른 페이지가 있는 모듈 시스템이 있고, 컨텐츠를 동적으로 가져오기 위해 HTMX를 사용하는 것은 HTMX의 능력을 보여줄 수 있는 좋은 방법이 될 것입니다. 눈으로 보는 것이 믿는 것이며, 그들 자신조차 사용하지 않을 때 어떤 것도 믿기 어렵습니다.

<div class="content-ad"></div>

HTMX에 대한 생각이 어떻습니까? 그냥 또 다른 유행 용어인가요, 아니면 실제로 따라야 할 가치 있는 것인가요? 제 생각을 알려주세요!
