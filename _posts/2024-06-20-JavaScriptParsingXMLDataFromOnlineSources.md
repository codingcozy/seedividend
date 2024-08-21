---
title: "자바스크립트 - 온라인 소스로부터 XML 데이터 구문 분석하기"
description: ""
coverImage: "/assets/img/2024-06-20-JavaScriptParsingXMLDataFromOnlineSources_0.png"
date: 2024-06-20 01:25
ogImage:
  url: /assets/img/2024-06-20-JavaScriptParsingXMLDataFromOnlineSources_0.png
tag: Tech
originalTitle: "JavaScript — Parsing XML Data From Online Sources"
link: "https://medium.com/@mohamad.razzi.my/javascript-parsing-xml-data-from-online-sources-e291af841073"
isUpdated: true
---

![이미지](/assets/img/2024-06-20-JavaScriptParsingXMLDataFromOnlineSources_0.png)

웹에서 XML 데이터를 가져오고 추출하는 능력은 웹 개발자에게 중요한 기술입니다. XML은 구조화된 데이터를 교환하는 데 널리 사용되는 형식이며, 많은 온라인 서비스와 API가 이 형식으로 데이터를 제공합니다.

JavaScript로 XML 데이터를 가져오는 현대적인 방법 중 하나는 fetch() API를 사용하는 것입니다. fetch() 함수를 사용하면 이전의 XMLHttpRequest 객체보다 더 간결하고 promise 기반으로 HTTP 요청을 보내고 XML 내용을 검색할 수 있습니다.

fetch()를 사용하여 XML 데이터를 가져오면 JavaScript에서 DOMParser 객체와 같은 도구를 제공하여 XML을 DOM 구조로 구문 분석할 수 있으며, 이를 통해 필요한 정보를 추출할 수 있습니다.

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

# [1] JavaScript 프로젝트 생성하기

Replit 플랫폼에서 만들어보세요

![](/assets/img/2024-06-20-JavaScriptParsingXMLDataFromOnlineSources_1.png)

# [2] HTML과 JavaScript 코드 편집하기

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

파일 index.html:

```js
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>replit</title>
  <link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>
  <div id="divOutput"></div>
  <script src="script.js"></script>
</body>

</html>
```

위 HTML 코드는 웹 페이지의 기본 구조를 설정합니다. 이는 문자 인코딩, 뷰포트, 제목을 지정하는 `head` 섹션과 "style.css"라는 외부 CSS 파일에 대한 링크를 포함하고 있습니다. 또한, 동적 콘텐츠를 담을 컨테이너로 사용될 ID가 "divOutput"인 `div` 요소와 페이지 로드 시 실행될 "script.js"라는 외부 JavaScript 파일을 포함하는 `script` 요소를 포함한 `body` 섹션을 포함합니다. `!DOCTYPE html` 선언은 웹 브라우저에게 이 문서가 HTML5 문서임을 알려주며, 전체 코드는 클라이언트 측 스크립팅 및 JavaScript 파일을 사용한 동적 콘텐츠 조작을 포함한 웹 페이지의 기초를 설정합니다.

파일 script.js:

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
var myUrl = "https://catalog.ldc.upenn.edu/desc/addenda/LDC2010T05.xml";
// CORS 문제를 처리하기 위해 cors-anywhere 서비스를 사용함
var proxy = "https://cors-anywhere.herokuapp.com/";

// 요청 실행
fetch(proxy + myUrl)
  .then((response) => response.text())
  .then((xmlString) => parseXML(xmlString))
  .catch((error) => console.error(error));

// XML 데이터 파싱
function parseXML(xmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "application/xml");

  // 요소에 액세스
  const posts = doc.getElementsByTagName("Post");
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const postClass = post.getAttribute("class");
    const postUser = post.getAttribute("user");
    const postText = post.textContent.trim();

    console.log("게시물 클래스:", postClass);
    console.log("게시물 사용자:", postUser);
    console.log("게시물 텍스트:", postText);

    const terminals = post.getElementsByTagName("t");
    for (let j = 0; j < terminals.length; j++) {
      const terminal = terminals[j];
      const pos = terminal.getAttribute("pos");
      const word = terminal.getAttribute("word");
      console.log(`POS: ${pos}, 단어: ${word}`);
      const divOutput = document.getElementById("divOutput");
      if (divOutput) {
        divOutput.innerHTML += `POS: ${pos}, 단어: ${word}<br>`;
      }
    }
    console.log();
  }
}
```

제공된 코드는 "https://catalog.ldc.upenn.edu/desc/addenda/LDC2010T05.xml"에 위치한 XML 문서를 가져와 내용을 파싱하는 JavaScript 솔루션을 보여줍니다. 이 데이터는 NPS Internet Chatroom Corpus의 일부입니다.

위의 JavaScript 코드는 fetch() API를 사용하여 HTTP 요청을 수행하고, 잠재적인 Cross-Origin Resource Sharing (CORS) 문제를 처리하기 위해 "https://cors-anywhere.herokuapp.com/"의 프록시 URL을 활용합니다. fetch 요청에서의 응답은 텍스트 형식으로 변환되며, XML 문자열이 가정적인 parseXML() 함수에 전달되어 추가 처리됩니다. 코드에는 또한 fetch나 파싱 작업 중 발생할 수 있는 문제를 기록하기 위한 오류 처리도 포함되어 있습니다.

parseXML() 함수는 이전 코드 스니펫에서 가져온 XML 데이터를 파싱하는 역할을 합니다. 먼저 DOMParser 객체의 새 인스턴스를 생성하고, parseFromString() 메서드를 사용하여 XML 문자열을 Document 객체로 파싱합니다. 함수는 이후 파싱된 문서에서 모든 'Post' 요소를 검색하고, 각각의 'class', 'user' 및 텍스트 내용을 추출하여 콘솔에 기록합니다. 다음으로, 함수는 각 'Post' 요소 내부의 모든 't' (터미널) 요소를 가져와, 'pos' (품사) 및 'word' 속성을 추출하고, 이 정보를 콘솔에 기록하고 동시에 'divOutput' ID를 가진 HTML 요소에 추가합니다. 이 과정을 통해 함수는 XML 데이터를 파싱하고 관련 정보를 추출하여 이를 콘솔과 웹 페이지에 표시할 수 있게 됩니다.

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

결과:

<img src="/assets/img/2024-06-20-JavaScriptParsingXMLDataFromOnlineSources_2.png" />

# [3] Replit Code:

코드를 사용하지 않는 방법을 선호하는 경우:

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

- https://jsonformatter.org/xml-parser
- https://codebeautify.org/xml-parser-online

# 🤓
