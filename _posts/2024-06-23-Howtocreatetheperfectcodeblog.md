---
title: "완벽한 코드 블로그를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-Howtocreatetheperfectcodeblog_0.png"
date: 2024-06-23 14:18
ogImage:
  url: /assets/img/2024-06-23-Howtocreatetheperfectcodeblog_0.png
tag: Tech
originalTitle: "How to create the perfect code blog"
link: "https://medium.com/@abenezerdaniel147/how-to-create-the-perfect-code-blog-f3329b3fea5d"
isUpdated: true
---

![Code Block Image](/assets/img/2024-06-23-Howtocreatetheperfectcodeblog_0.png)

## 1. What is a code block

A code block is a section of a website's content used to display the syntax of a programming language. It is commonly used in educational blogs, documentation, programming forums, and more. Having a functional and well-formatted code block is crucial for your website.

## 2. Creating a basic code block

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

코드 블록을 만들려면 두 가지 HTML 태그 중 하나를 사용합니다. `code` 태그는 일반적으로 텍스트 편집기에서 볼 수 있는 스타일로 내용을 표시하는 데 사용됩니다. 이 스타일링은 주로 글꼴에서 확인할 수 있습니다. 글꼴은 IDE와 같은 글꼴 패밀리로 변경됩니다. 다른 태그인 `pre`는 텍스트를 그대로 표시하는 데 사용됩니다. HTML에서 텍스트는 단일 공백과 단일 줄 바꿈만 존재하도록 다듬지만 `pre` 태그를 사용하면 작성하는 동안 입력한 모든 공백과 줄 바꿈이 고려됩니다.

이 코드 블록에서는 모던한 기능이 있는 코드 블록을 만들기 위해 `code`와 `pre` 태그를 모두 사용할 것입니다. 첫 번째 단계는 아래 코드를 사용하는 것입니다:

```js
<pre>
  <code>
function greetings() {
  console.log("Hello World!");
}
  </code>
</pre>copy
```

위 코드에서 보듯이, 코드가 태그로 둘러싸여 있기 때문에 코드 태그에 있는 모든 것이 그대로 형식화되도록 pre 태그를 사용하고, 동시에 코드 태그를 사용하여 글꼴을 변경하고 웹 사이트를 의미적으로 만듭니다. 이 코드의 형식은 깨져 보일 수 있지만, 이것이 바로 pre 태그에 내용을 작성할 때 들여쓰기 없이 작성해야 하는 방식입니다. 코드 태그에서는 코드 블록이 작동하는지 테스트하는 데 도움이 되는 간단한 JavaScript 코드만 작성했습니다.

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

# 3. 문법 강조 기능 추가하기

문법 강조 기능은 코드의 다른 부분의 색상을 변경하여 사용자가 코드의 구문을 쉽게 식별할 수 있도록 하는 것입니다. 문법 강조 기능에는 많은 규칙이 있으며 이 시스템을 직접 만드는 것은 도전이 될 수 있습니다(제가 블로그를 작성할 수도 있겠죠). 대신 구글에서 개발한 스택 오버플로 같은 웹사이트에서 사용되는 인기 있는 3rd party 라이브러리인 code-prettify를 사용할 것입니다. 사용법은 매우 간단합니다. 두 가지만 하면 됩니다. 첫 번째는 제공된 CDN을 사용하여 프로젝트에 포함하는 것입니다:

```js
<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
```

두 번째로 해야 할 일은 우리 코드 태그에 "prettyprint" 클래스를 지정하여 라이브러리가 문법 강조 기능을 적용할 위치를 알 수 있게 하는 것입니다. 사용할 클래스는 이미 문서에서 미리 정해져 있습니다.

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
<pre>
  <code class="prettyprint">
function greetings() {
  console.log("Hello World!");
}
  </code>
</pre>copy
```

우리의 코드에 모든 구문 강조 효과를 제공합니다.

# 4. 복사 버튼 추가

코드 블록에 일반적인 기능으로 사용자가 코드를 선택하지 않고도 쉽게 복사할 수 있는 방법을 제공하는 것이 좋습니다. 특히 대규모 코드 블록을 다룰 때 마우스로 코드를 모두 선택해야 하는 것은 귀찮을 수 있습니다. 복사 버튼을 만드는 것은 매우 간단합니다. 먼저 HTML에 버튼을 포함시켜야 합니다:

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
<pre>
  <code class="prettyprint">
function greetings() {
  console.log("Hello World!");
}
  </code>
  <button class="copy-btn">Copy</button>
</pre>copy
```

그런 다음 JavaScript를 사용하여 작업할 것입니다:

```js
const btn = document.querySelector(".copy-btn")
const code = document.querySelector("code")

btn.addEventListener("click", () => {
  navigator.clipboard.writeText(code.textContent)
})copy
```

위의 코드에서 볼 수 있듯이, 방금 만든 버튼에 이벤트 리스너를 추가하고 `code`의 텍스트 콘텐트를 사용자 클립보드로 복사하는 JavaScript를 작성했습니다. navigator 객체를 사용하여 사용자가 실행 중인 시스템의 클립보드에 액세스합니다. inner-HTML 대신에 code의 텍스트 콘텐트를 사용하는 것에 유의하십시오. inner-HTML을 사용하면 하이라이트 라이브러리 code-prettify에서 생성된 추가 코드도 복사되기 때문입니다.

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

# 5. 일반적인 스타일링 추가하기

기술적으로 모든 것이 작동하는 것을 확인했으니, 이제 스타일링을 추가할 시간입니다. 이 블로그는 스타일에 관한 것은 아니지만, 아래에서 사용하고 싶은 스타일을 알려드리겠습니다:

```js
pre {
  max-width: 560px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: .5em 1em;
  position: relative;
}

button {
  font: inhreit;
  font-size: 12px;
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: absolute;
  top: .5rem;
  right: 1rem;
  cursor: pointer;
}
```

위의 스타일을 공부하고 사용하며 원하는 대로 변경할 수 있습니다.

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

이 블로그를 도움이 되었다면 새로운 블로그 포스트 알림을 받으려면 X(트위터)에서 저를 팔로우해보세요. 읽어 주셔서 감사합니다!
