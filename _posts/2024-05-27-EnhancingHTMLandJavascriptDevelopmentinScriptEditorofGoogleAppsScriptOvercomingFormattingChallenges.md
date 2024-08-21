---
title: "Google Apps Script의 스크립트 편집기에서 HTML 및 Javascript 개발 기능 향상하기 서식 지정 문제 극복하기"
description: ""
coverImage: "/assets/img/2024-05-27-EnhancingHTMLandJavascriptDevelopmentinScriptEditorofGoogleAppsScriptOvercomingFormattingChallenges_0.png"
date: 2024-05-27 19:09
ogImage:
  url: /assets/img/2024-05-27-EnhancingHTMLandJavascriptDevelopmentinScriptEditorofGoogleAppsScriptOvercomingFormattingChallenges_0.png
tag: Tech
originalTitle: "Enhancing HTML and Javascript Development in Script Editor of Google Apps Script: Overcoming Formatting Challenges"
link: "https://medium.com/google-cloud/enhancing-html-and-javascript-development-in-script-editor-of-google-apps-script-overcoming-c8702a5500c2"
isUpdated: true
---

![EnhancingHTMLandJavascriptDevelopmentinScriptEditorofGoogleAppsScript](/assets/img/2024-05-27-EnhancingHTMLandJavascriptDevelopmentinScriptEditorofGoogleAppsScriptOvercomingFormattingChallenges_0.png)

# 개요

2022년 4월에 시작된 Google Apps Script IDE가 개선되었음에도 불구하고 HTML 및 Javascript 개발에 대한 어려움이 발생합니다. 특히 스크립트 편집기의 내장된 언어 형식 지정은 큰 Javascript 코드베이스에 대해 불충분하며, 잠재적으로 오류를 일으킬 수 있습니다. 본 보고서는 이러한 형식 지정 문제를 해결하고 스크립트 편집기 내에서 개발을 원활하게 할 수 있는 솔루션을 제안합니다.

# 소개

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

Google Apps Script 통합 개발 환경(IDE) 스크립트 편집기가 2022년 4월 13일에 중요한 업데이트를 받아 더 현대적이고 간소화된 개발 환경으로 변모했습니다. 이 향상된 IDE를 통해 개발자들은 그들의 조직을 위해 구글 워크스페이스 애플리케이션의 기능을 확장하는 사용자 정의 솔루션을 만들 수 있습니다.

스크립트 편집기는 Google Apps Script 개발에 유용한 도구지만, HTML 및 Javascript를 사용할 때 문제가 발생할 수 있습니다. 현재 스크립트 편집기 내에서 HTML 및 Javascript 개발은 직접 HTML 파일에서 발생합니다. 편집기는 서식 지원 기능을 제공하지만, Javascript 코드 포맷팅은 HTML 포맷팅과 비교했을 때 덜 견고해 보입니다. 이로 인해 큰 Javascript 코드베이스를 다룰 때 특히 오류가 발생할 수 있습니다.

본 보고서는 이 특정 문제에 대한 해결책을 제안합니다. Google Apps Script 스크립트 편집기 내에서 HTML 및 Javascript를 효과적으로 개발하는 방법을 탐구하고, 개발 효율성을 향상시키고 오류를 줄일 수 있도록 올바른 Javascript 코드 포맷팅을 보장합니다.

# 사용법

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

# 1. Google Apps Script 프로젝트 만들기

이 샘플에서는 HTML 및 Javascript를 사용하기 위해 Google Spreadsheet에서 대화 상자를 사용합니다. 따라서 새 Google Spreadsheet를 만들고 스크립트 편집기를 열어주세요.

# 2. 샘플 스크립트 1

이 섹션에서 현재 문제를 설명합니다. 아래 스크립트와 HTML을 복사하여 스크립트 편집기에 붙여넣어주세요.

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

# code.gs

```js
function openDialog() {
  const html = HtmlService.createHtmlOutputFromFile("index");
  SpreadsheetApp.getUi().showModalDialog(html, "sample");
}
```

# index.html

```js
<!DOCTYPE html>
<html>
<head>
<base target="_top">
</head>
<body>
<div id="sample"></div>
<script>
const array = [["A1", "B1", "C1"],["A2", "B2", "C2"],["A3", "B3", "C3"]];
const div = document.getElementById("sample");
const table = document.createElement('table');
table.border = "1";
table.style.width = "100%";
table.style["border-collapse"] = "collapse";
for (let i = 0; i < array.length; i++) {
  const tr = document.createElement('tr');
  for (let j = 0; j < array[i].length; j++) {
    const td = document.createElement('td');
    const text = document.createTextNode(array[i][j]);
    td.appendChild(text);
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
div.appendChild(table);
</script>
</body>
</html>
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

# 테스트

openDialog 함수를 실행하면 대화 상자가 열리고 대화 상자에서 다음 테이블을 볼 수 있습니다. HTML과 JavaScript가 잘 작동하는 것을 확인할 수 있습니다.

![Table Image](/assets/img/2024-05-27-EnhancingHTMLandJavascriptDevelopmentinScriptEditorofGoogleAppsScriptOvercomingFormattingChallenges_1.png)

다음 단계로 넘어가면 index.html을 볼 때 JavaScript 형식이 지정되지 않았고 가독성이 낮다는 것을 알 수 있습니다. 이 코드를 스크립트 편집기에서 형식을 맞추면 다음과 같이 됩니다.

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

<img src="https://miro.medium.com/v2/resize:fit:1400/0*AQlYdIS3NlLn6zcy.gif" />

코드를 서식화하면 HTML이 올바르게 서식이 적용됩니다. 그러나 Javascript는 올바르게 서식이 적용되지 않는 것을 볼 수 있습니다. 이 상황은 Javascript를 개발하는 데 문제가 될 수 있다고 생각합니다.

# 3. 샘플 스크립트 2

본 섹션에서는 상기 상황을 피하기 위한 해결책으로 샘플 스크립트 2를 소개하고자 합니다. 따라서 아래 스크립트를 복사하기 전에 상기 섹션에서 사용된 code.gs 및 index.html을 지우고, 다음 스크립트와 HTML을 스크립트 편집기에 복사하여 붙여넣어 주세요.

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

# code.gs

```js
function javascript_() {
  const array = [
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"],
  ];
  const div = document.getElementById("sample");
  const table = document.createElement("table");
  table.border = "1";
  table.style.width = "100%";
  table.style["border-collapse"] = "collapse";

  for (let i = 0; i < array.length; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < array[i].length; j++) {
      const td = document.createElement("td");
      const text = document.createTextNode(array[i][j]);
      td.appendChild(text);
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  div.appendChild(table);
}

function openDialog() {
  const html = HtmlService.createTemplateFromFile("index");
  html.javascript = javascript_.toString().match(/^function javascript_\(\) {([\s\S\w]*)}$/)[1];
  SpreadsheetApp.getUi().showModalDialog(html.evaluate(), "sample");
}
```

# index.html

```js
<!DOCTYPE html>
<html>
<head>
<base target="_top">
</head>
<body>
<div id="sample"></div>
<script>
<?!= javascript ?>
</script>
</body>
</html>
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

# 테스팅

openDialog 함수를 실행하면 대화 상자가 열리고 대화 상자에서 다음 표를 볼 수 있습니다. 위 섹션에서 동일한 결과를 볼 수 있습니다.

다음 단계로, 현재 index.html 및 code.gs를 확인하면 두 형식 모두 미완료되고 가독성이 낮음을 알 수 있습니다. 이러한 코드가 스크립트 편집기로 형식이 지정되면 다음과 같이 됩니다.

![image](https://miro.medium.com/v2/resize:fit:1400/0*Sszz38pwq-gqhqju.gif)

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

index.html과 code.gs를 형식화하면 두 파일 모두 적절한 서식으로 표시되어 가독성이 향상됩니다. 또한 JavaScript 코드는 대화 상자 내에서 올바르게 작동합니다.

이전에 언급했듯이 스크립트 편집기는 현재 code.gs 스크립트 파일 내의 Google Apps 스크립트를 형식화할 수 있습니다. 이 보고서는이 기능을 해결책으로 활용합니다. JavaScript는 code.gs 스크립트 파일에서 개발되며 개발된 코드는 index.html HTML 파일로 가져옵니다. 이 작업 흐름을 통해 JavaScript 코드를 적절히 형식화하여 개발할 수 있습니다.

# 중요

JavaScript 코드에 스크립트 편집기와 호환되지 않는 구문이 포함된 경우 이 해결책을 적용할 수 없음에 유의해 주세요. 이러한 시나리오에서 주의해 주시기 바랍니다.

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

# 참고

- 최상단의 추상 이미지는 Gemini에게 이 보고서를 제공하여 생성되었습니다.
