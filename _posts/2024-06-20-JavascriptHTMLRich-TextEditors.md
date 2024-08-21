---
title: "자바스크립트 HTML 리치 텍스트 편집기"
description: ""
coverImage: "/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_0.png"
date: 2024-06-20 03:27
ogImage:
  url: /assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_0.png
tag: Tech
originalTitle: "Javascript HTML: Rich-Text Editors"
link: "https://medium.com/@itsuki.enjoy/javascript-html-rich-text-editors-8fbde4e1b119"
isUpdated: true
---

리치 텍스트 편집기 또는 WYSIWYG 편집기를 사용하면 사용자가 스타일이 적용된 텍스트, 이미지, 목록, 코드 블록 등을 입력할 수 있습니다. 만약 여러분이 마크다운으로 작성할 수 없는 사용자를 대상으로 한 웹사이트에서 텍스트/문서 입력을 구축 중이라면 이 접근 방식이 유용할 것입니다.

이 글에서는 모든 현대적인 웹에 쉽게 통합할 수 있는 뛰어난 무료 오픈 소스 WYSIWYG인 Quill로 이러한 편집기를 만드는 방법을 안내해 드릴 것입니다.

# 기본 예제

우리의 프로젝트에 필요한 JavaScript 및 CSS 파일을 포함시켜 시작하겠습니다.

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
<!-- 스타일시트 포함 -->
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<!-- Quill 라이브러리 포함 -->
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
```

또는 저처럼 코드 펜을 사용하는 경우 설정을 클릭하고 위의 Css 및 Js 링크를 추가해주세요.

<img src="/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_0.png" />

가장 간단한 형태로 시작해보겠습니다.

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

Markdown

```js
var quill = new Quill("#editor", {
  theme: "snow",
});
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

CSS: 없음

그래, 이 간단한 리치 텍스트 편집기를 얻기 위해 해야 할 일은 이것뿐이에요. 여기서 글꼴 크기를 변경하거나 스타일을 추가/삭제할 수 있습니다.

![리치 텍스트 편집기](/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_1.png)

editor라는 id를 설정하고 Quill 편집기를 초기화하는 데 사용하고 있습니다. 그러나 CSS 선택기나 DOM 객체를 전달할 수도 있어요.

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

예를 들어, 다음과 같이 classname editor를 전달하면 Quill이 첫 번째 일치하는 요소에 에디터를 생성합니다.

```js
var editor = new Quill(".editor");
```

또는 DOM 객체를 전달할 수도 있습니다.

```js
var container = document.getElementById("editor");
var editor = new Quill(container);
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

만약 툴바에 폭과 같은 추가 스타일링을 하고 싶다면, 에디터 자체의 스타일을 변경하는 것은 작동하지 않을 것입니다. 다음과 같이 결과물이 나올 것입니다.

![example image](/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_2.png)

이를 수행하는 방법은 3가지가 있습니다.

Quill은 툴바를 위한 클래스인 ql-toolbar를 사용하므로 아래와 같이 스타일을 오버라이드할 수 있습니다.

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

아래는 Markdown 형식으로 변경한 내용입니다.

![이미지](/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_3.png)

또는 전체 편집기를 사용자 정의 컨테이너에 임베드하고 컨테이너 너비를 변경할 수도 있습니다.

![이미지](/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_4.png)

세 번째 옵션은 new Quill()를 호출하고 편집기를 만들 때 추가 구성을 추가하는 것입니다. 다음 부분에서 이에 대해 자세히 살펴보겠습니다.

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

좋아요! 이제 리치 텍스트 편집기가 아닌 스타일이 좀 적은 편집기가 되었네요!

## 사용자 정의

Quill로 더 풍부하게 만들어 보겠습니다.

이 라이브러리는 사용자 정의와 확장을 염두에 두고 설계되었습니다. 우리의 요구에 맞게 커스터마이즈하는 다양한 방법이 있습니다.

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

- Configuration: 기존 기능을 조정하는 데 사용됩니다
- Modules: 새로운 기능을 추가하는 데 사용됩니다
- Themes: 스타일링을 위해 사용됩니다

# 구성

먼저 기존 기능을 어떻게 조정할 수 있는지 살펴보겠습니다.

우리가 위에서 사용한 javascript에서 'theme: ‘snow’'를 추가했다는 점을 유의해주세요.

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
var quill = new Quill("#editor", {
  theme: "snow",
});
```

이것은 Quill에서 인식하는 옵션 중 하나입니다. 전체 목록을 확인할 수 있고, 저는 발견한 몇 가지를 여러분에게 보여드릴게요.

## 모듈

새 기능을 추가할 때 사용할 키입니다. 곧 자세히 살펴볼 예정입니다.

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

이외에도 몇 가지 매우 중요한 미리 만들어진 것들이 있어요.

- 툴바

아래에는 위에서 보여드렸던 기본적인 것이 있어요

![이미지](/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_5.png)

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

테이블 태그를 마크다운 형식으로 변경하면 됩니다.

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

아래에 보이는 내용입니다.

![이미지](/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_6.png)

색상 및 배경에 대해 빈 배열을 가지고 있더라도 여전히 선택할 수 있는 멋진 색 팔레트를 얻을 수 있습니다.

이는 테마가 드롭다운을 위해 기본값을 지정할 수 있기 때문입니다. 위의 예에서 우리는 Snow를 사용하고 있으며, 색상 및 배경 형식에 대해 빈 배열로 설정하면 색상 목록에서 기본값으로 35가지 색상을 제공합니다.

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

위의 예시에서는 단순히 기존의 어트리뷰터를 선택했습니다. 그러나 여러분은 이를 사용자 정의할 수도 있어요. 예를 들어, 사용자 지정 글꼴을 추가하려면:

```js
var FontAttributor = Quill.import("attributors/class/font");
FontAttributor.whitelist = ["sofia", "slabo", "roboto", "inconsolata", "ubuntu"];
Quill.register(FontAttributor, true);
```

```js
.ql-font-roboto {
  font-family: 'Roboto', sans-serif;
}
```

더 많은 사용자 정의와 제어를 원하신다면, HTML에서 직접 툴바를 만들고 DOM 요소나 셀렉터를 Quill에 전달할 수 있어요.

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
<!-- 툴바 컨테이너 생성 -->
<div id="toolbarContainer">
  <!-- 글꼴 크기 드롭다운 추가 -->
  <select class="ql-size">
    <option value="small"></option>
    <!-- 주의: 값이 없어서 기본 값으로 재설정됨 -->
    <option selected></option>
    <option value="large"></option>
    <option value="huge"></option>
  </select>
  <!-- 굵게 버튼 추가 -->
  <button class="ql-bold"></button>
  <!-- 아래 첨자 및 위첨자 버튼 추가 -->
  <button class="ql-script" value="sub"></button>
  <button class="ql-script" value="super"></button>
</div>
<div id="editor">
</div>
```

```js
var options = {
  modules: {
    toolbar: {
      container: "#toolbarContainer",
      handlers: {
        bold: customBoldHandler,
      },
    },
  },
  theme: "snow",
};

var quill = new Quill("#editor", options);
```

만약 사용자 정의 컨테이너를 사용한다면, 컨트롤도 직접 설정해야 합니다. 그렇지 않으면 빈 툴바가 나타날 수 있습니다. 아래와 같이 확인하세요.

<img src="/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_7.png" />

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

테이블 태그를 Markdown 형식으로 변경하면 됩니다.

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
var toolbarHanlderOptions = {
  handlers: {
    link: function (value) {
      if (value) {
        var href = prompt("URL을 입력하세요");
        this.quill.format("link", href);
      } else {
        this.quill.format("link", false);
      }
    },
  },
};

var options = {
  modules: {
    toolbar: toolbarHanlderOptions,
  },
  theme: "snow",
};

var quill = new Quill("#editor", options);
```

우리는 다음을 받게 될 것입니다

<img src="https://miro.medium.com/v2/resize:fit:1400/1*QpD3jR3s6v4M_nUWwLOFdg.gif" />

핸들러 함수는 툴바에 바인딩되어 있으므로 this를 사용하면 툴바 인스턴스를 참조하게 됩니다.

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

위 조정 도구 모양에 대한 자세한 내용은 여기에서 확인할 수 있어요.

- 구문

이 모듈은 구문 강조 효과를 적용하여 코드 블록 포맷을 강화합니다. 코드 블록을 자동으로 감지하고 구문 강조를 적용하기 위해 훌륭한 highlight.js 라이브러리가 사용됩니다.

사용하려면 먼저 마음에 드는 highlight.js 스타일 시트를 추가하고 highlight.js 라이브러리를 포함시키세요.

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

만약 제가 사용하고 있는 것처럼 codepan.io를 사용 중이라면, 설정 옵션을 통해이를 추가하는 것이 작동하지 않을 수 있으며 수동으로 HTML에 다음과 같이 추가해야 합니다.

```js
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
```

그런 다음 툴바 옵션에 코드 블록을 포함시키십시오. 저 위의 예제를 사용 중이라면 이미 포함되어 있어야 합니다.

모듈에 구문 키를 추가하고 구문 모듈을 포함하려면 true로 설정하세요.

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
var quill = new Quill("#editor", {
  modules: {
    syntax: true,
    toolbar: [["code-block"]],
  },
  theme: "snow",
});
```

아래와 같이 특정 언어 또는 모든 언어로 구성할 수도 있습니다.

```js
// 선택적으로 hljs 구성
hljs.configure({
  languages: ["javascript", "ruby", "python"],
});

// 또는 모든 언어 강조
hljs.highlightAll();
```

## placeholder

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

이 옵션 키는 편집기가 비어 있을 때 표시할 자리 표시자 텍스트를 구성하는 데 사용됩니다.

다음과 같은 옵션을 사용하면

```js
var options = {
  placeholder: "말해보세요!",
  theme: "snow",
};

var quill = new Quill("#editor", options);
```

다음은 우리가 얻게 될 것입니다!

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

<img src="/assets/img/2024-06-20-JavascriptHTMLRich-TextEditors_8.png" />

## readOnly

이 값은 에디터를 읽기 전용 모드로 초기화할지 여부를 나타냅니다. 기본값은 false입니다.

사용자가 더 이상 수정할 수 없게 하고 입력한 내용을 확인해야 하는 확인 페이지를 만들고 싶을 때 이 값은 정말 유용합니다. 이 경우 툴바를 false로 설정하고 싶을 수도 있습니다.

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
var options = {
  modules: {
    toolbar: false,
  },
  readOnly: true,
  theme: "snow",
};

var quill = new Quill("#editor", options);
```

## 테마

이 키는 전체 스타일링을 구성하는 데 사용할 키이며 곧 자세히 살펴볼 것입니다.

# 모듈

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

이전 섹션에서 툴바와 같은 몇 가지 미리 구축된 모듈을 이미 살펴보았습니다. 이 모듈은 확장되어 원본 모듈을 대체하거나 다시 등록할 수도 있습니다.

예를 들어, 이를 통해 클립보드 모듈이 Quill과 외부 애플리케이션 간에 복사, 잘라내기 및 붙여넣기를 어떻게 처리할지 구성할 수 있습니다.

```js
var Clipboard = Quill.import("modules/clipboard");
var Delta = Quill.import("delta");

class PlainClipboard extends Clipboard {
  convert(html = null) {
    if (typeof html === "string") {
      this.container.innerHTML = html;
    }
    let text = this.container.innerText;
    this.container.innerHTML = "";
    return new Delta().insert(text);
  }
}

Quill.register("modules/clipboard", PlainClipboard, true);

var quill = new Quill("#editor");
```

그러나 때로는 (사실 대부분의 경우) 기존 모듈을 사용하거나 구성하는 것이 더 쉬울 수 있습니다. 위 예에서 기존 Clipboard의 addMatcher API가 더 적합합니다.

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

리치 텍스트 편집기에 대한 API가 무엇인지 궁금하신가요? 조금 더 자세히 설명해 드릴게요. 실제로 이게 Quill의 가장 멋진 부분이라고 생각해요.

# 테마

우리는 이미 여러 차례 이 키를 사용했어요. 사용할 테마 이름입니다. 내장된 옵션은 bubble 또는 snow입니다. 잘못된 값은 기본 최소 테마를 로드합니다.

- bubble: 간단한 툴팁 기반 테마입니다.
- snow: 깨끗하고 평평한 툴바 테마이며, 위에서 반복적으로 사용한 것입니다.

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

테마의 구체적인 스타일시트는 여전히 수동으로 포함해야 합니다. 더 많은 정보 및 추가 사용자 정의를 위해 테마를 확인해보세요!

# API 주도 설계

자바스크립트와 HTML을 사용하여 간단한 리치 텍스트 편집기를 만드는 방법을 보여드렸습니다. 그러나 Quill에서 가장 독특한 요소 중 하나(제 개인적인 의견으로)는 API 주도 설계입니다.

대부분의 리치 텍스트 편집기는 사용자가 작성한 텍스트를 알지 못하며, 내용을 웹 개발자가 보는 렌즈로 보게 됩니다: DOM입니다. 이는 DOM이 불균형 트리로 구성된 노드로 이루어져 있지만 텍스트는 줄, 단어 및 문자로 이루어져 있기 때문에 임피던스 불일치를 초래합니다.

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

문자가 측정 단위인 DOM API가 없습니다. 이 제한으로 대부분의 리치 텍스트 에디터는 "이 범위에 어떤 텍스트가 있는가?" 또는 "커서가 굵은 텍스트에 있는가?" 같은 간단한 질문에 대답할 수 없습니다.

그에 반대로, API 주도 설계를 통해 Quill은 굵은 텍스트인지 확인하려면 `b`나 `strong` 노드 또는 글꼴 두께 스타일 속성을 찾는 DOM 탐색이 필요하지 않습니다.

할 일은 getFormat(5, 1) API를 호출하는 것 뿐입니다. 모든 핵심 API 호출은 임의의 인덱스와 길이로 액세스하거나 수정할 수 있습니다. 그리고 해당 이벤트 API는 직관적인 JSON 형식으로 변경 사항을 보고하며 HTML 구문 분석이나 DOM 트리 비교가 필요하지 않습니다.

그러므로 Quill은 나만의 리치 텍스트 에디터 솔루션을 설계할 때 더 많은 옵션과 자유를 제공하며 더 간단한 해결책으로 이어줍니다!

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

그거 오늘은 여기까지야!

리치 텍스트 편집기를 만들어서 부자가 되어보자(아마?)!
