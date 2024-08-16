---
title: "CORS를 활용한 효율적인 RSS JavaScript 파서 소개"
description: ""
coverImage: "/assets/img/2024-06-20-IntroducinganEfficientRSSJavaScriptParserwithCORS_0.png"
date: 2024-06-20 01:04
ogImage: 
  url: /assets/img/2024-06-20-IntroducinganEfficientRSSJavaScriptParserwithCORS_0.png
tag: Tech
originalTitle: "Introducing an Efficient RSS JavaScript Parser with CORS"
link: "https://medium.com/@asbedb/introducing-an-efficient-rss-javascript-parser-with-cors-05ca31c320c1"
isUpdated: true
---




웹 개발 영역에서 RSS 피드와 같은 외부 콘텐츠를 애플리케이션에 통합하는 것은 종종 Cross-Origin Resource Sharing (CORS) 제약 때문에 도전이 될 수 있습니다. 이 보안 조치는 사용자 데이터를 보호하는 데 중요하지만 Medium과 같은 플랫폼에 호스팅된 RSS 피드와 같은 다른 출처에서 데이터를 검색하는 것을 복잡하게 만들 수 있습니다.

이 기사에서는 CORS 제한을 다루면서 JavaScript를 사용하여 RSS 피드를 구문 분석하는 복잡성을 탐구합니다. 우리는 다양한 출처에서 동적 콘텐츠를 통합할 수 있도록 RSS 데이터를 원활하게 가져오고 구문 분석하는 방법을 탐구할 것입니다. 관련 코드는 여기서 확인할 수 있습니다:

<div class="content-ad"></div>

https://github.com/asbedb/rss-parser-cors

# RSS 피드를 사용하는 이유?

RSS(Really Simple Syndication) 피드는 웹에서 콘텐츠 배포의 핵심 요소로 남아 있으며, 기사, 뉴스 업데이트, 블로그 글과 같이 자주 업데이트되는 콘텐츠를 게시하는 표준화된 형식을 제공합니다. 개발자와 콘텐츠 집계자들에게 RSS 피드는 여러 소스에서 실시간으로 큐레이션된 콘텐츠에 구조화된 방법으로 액세스하고 표시하는 기능을 제공합니다.

# CORS 제약 해결

<div class="content-ad"></div>

RSS 피드를 Medium과 같은 플랫폼에서 가져올 때 개발자가 주로 직면하는 문제 중 하나는 CORS 제한입니다. 브라우저는 이러한 정책을 강요하여 악성 스크립트가 명시적인 허가 없이 다른 도메인 간에 데이터에 접근하는 것을 방지합니다. 이 보안 계층은 중요하지만 종종 스마트한 솔루션을 요구하여 데이터 검색 및 통합을 원활하게 할 수 있게 합니다.

# 자바스크립트가 해결책이다: RSS 파싱

다양성과 풍부한 라이브러리 및 프레임워크 생태계를 통해 자바스크립트는 RSS 피드와 같은 XML 기반 콘텐츠의 파싱 및 조작을 위한 강력한 해결책을 제공합니다. 현대적인 기술과 라이브러리를 활용하여 개발자는 프록시나 서버 측 솔루션을 사용하여 CORS 제한을 우회하고 애플리케이션이 RSS 콘텐츠를 안전하고 효율적으로 가져오고 표시할 수 있도록 할 수 있습니다.

# CORS 호환 RSS 파서 구현

<div class="content-ad"></div>

이 기사에서는 CORS Anywhere 및 jQuery를 사용하여 단일 RSS 소스에서 파싱하는 데 도움을 줄 것입니다. 이 기사는 매체(Medium)에 있으므로 내 매체(Medium) RSS 피드를 사용합시다!

## CORS Anywhere

## jQuery

## 프로젝트 설정하기

<div class="content-ad"></div>

아래는 서버 측 기능을 로컬 또는 온라인으로 설정하는 데 필요한 기본 지식을 전제로 합니다.

익숙하지 않은 경우, 로컬 개발을 위해 로컬 LAMP/XAMP 스택을 실행하거나 NodeJS 서버 측 기능을 실행하는 호스팅 제공 업체의 옵션을 찾아보는 것을 강력히 추천합니다.

# 프로젝트 폴더 구조

```js
js/main.js
css/styles.css
index.html
```

<div class="content-ad"></div>

# index.html

이 연습을 위해 아주 기본적인 HTML 구조를 사용하여 기초를 설정할 것입니다.

여기서 고려해야 할 가장 중요한 세 가지 요소는 다음과 같습니다.

- 페이지의 `head` 태그에 jQuery 스크립트를 호출하는지 확인하세요. 아래 예제는 CDN min.js 참조 점을 사용하며 구현할 수 있습니다.
- 이 예에서는 생성된 HTML 코드를 `container id="rss-embed"`의 컨테이너에 추가하는 방식으로 사용하며, 이 요소의 id가 js 파일이 이 컨테이너와 일치하는지 확인하는 것이 중요합니다.
- 페이지 하단에 main.js에 대한 참조를 추가하여 페이지가 렌더링된 후에 스크립트가 호출되도록하여 특정성과 관련된 문제를 회피하십시오.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title> CORSJS Example</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💾</text></svg>">
        <link rel="stylesheet" href="css/styles.css"> 
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body> 
      <h1>Posts</h1>
      <container id="rss-embed"></container>
      <script src="js/main.js"></script>
    </body>
</html> 
```

# js/main.js

아래에서 스크립트 기능을 볼 수 있습니다. 이 예제에서는 HerokuApp 버전의 CORS Anywhere를 사용하고 있습니다.

참고: HerokuApp 버전의 CORS Anywhere는 데모 및 테스트 용도로만 사용해야 합니다. 프로덕션 환경에서 CORS Anywhere를 사용하려면 이 링크를 참조하세요.


<div class="content-ad"></div>

```js
const RSS_URL = 'https://cors-anywhere.herokuapp.com/https://medium.com/feed/@asbedb';

$.ajax({
    url: RSS_URL,
    dataType: "xml",
    success: function(data) {
        $(data).find("item").each(function() {
            const el = $(this);
            const contentEncoded = el.find("content\\:encoded").text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = contentEncoded;
            const pTags = tempDiv.getElementsByTagName('p');
            const firstImg = tempDiv.querySelector('img');
            const firstImageUrl = firstImg ? firstImg.getAttribute('src') : 'img/medium.webp'; // <img> 태그가 없는 경우 기본 이미지 URL 제공

            let firstTwoSentences = '';
            if (pTags.length > 0) {
                const firstPTagContent = pTags[0].textContent.trim();
                const sentences = firstPTagContent.split(/[\.\?!]\s+/);
                firstTwoSentences = sentences.slice(0, 1).join('. ');
            }
            //HTML Message-Embedder//
            const template = `
            <a href="${el.find("link").text()}" target="_blank">
                <div class="message-embed">
                    <div id="title" style="color: lightseagreen;">${el.find("title").text()}</div>
                    <div id="pub-date" class="post-pubdate">${el.find("pubDate").text()}</div>
                    <div id="post-image"><img class="message-embed-image" src="${firstImageUrl}"/></div>
                    <div id="leading-message" class="leading-message">${firstTwoSentences}</div>
                </div>
            </a>
            `;
            $("#rss-embed").append(template);
        });
    },
    error: function(xhr, status, error) {
        console.error("Error fetching RSS feed:", error);
    }
});
```

이제 한번 알아봅시다.

우선 RSS_URL을 정의하여 RSS 피드를 가져올 것입니다. Heroku를 사용 중이라면 데모 기능을 사용하기 전에 도전을 완료해야합니다 (브라우저에서 표시됩니다).

```js
const RSS_URL = 'https://cors-anywhere.herokuapp.com/https://medium.com/feed/@asbedb';
```

<div class="content-ad"></div>

우리가 RSS_URL을 정의한 후에는 jQuery AJAX 요청이 발생합니다. 이 작업은 피드를 확인하여 XML 피드가 제대로 제공되고 있는지 확인합니다.

```js
$.ajax({
    url: RSS_URL,
    dataType: "xml",
    success: function(data) {
```

여기서 우리는 파싱 프로세스를 시작합니다. 대부분의 RSS 피드는 파싱할 콘텐츠를 `item` 태그에 분류할 것입니다. 예시로 Medium의 RSS 피드를 살펴보겠습니다.

![Medium RSS feed](/assets/img/2024-06-20-IntroducinganEfficientRSSJavaScriptParserwithCORS_1.png)

<div class="content-ad"></div>

관련 태그를 살펴보기 시작하면 소화해야 할 내용이 많을지도 모르겠어요. 우리는 주로 `item``/item` 내에 중첩된 내용에 관심을 가지고 있어요.

```js
$(data).find("item").each(function() {
    const el = $(this);
    const contentEncoded = el.find("content\\:encoded").text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentEncoded; 
```

성공적인 데이터 호출 후에는 이제 `items`를 반복하면서 각 "게시물"/"기사"를 수집하려고 해요. 더 중요한 것은 여기서 특정 요소를 구문 분석하고 읽기 쉬운 HTML 형식으로 표시할 수 있어야 한다는 거에요.

위 코드는 우리가 다룰 것이 많은 핵심 요소들을 임시로 세 가지 상수에 보관할 거에요.

<div class="content-ad"></div>

첫 번째 `el`은 `item` 태그 내에 있는 모든 콘텐츠로 구성됩니다.

두 번째 `contentEncoded`는 Medium RSS 태그 `content:encoded`에서 기사 콘텐츠로 구성됩니다.

그런 다음 이를 `tempDiv`라는 새롭게 생성된 임시 `div`에 저장합니다.

```js
  const pTags = tempDiv.getElementsByTagName('p');
  const firstImg = tempDiv.querySelector('img');
  const firstImageUrl = firstImg ? firstImg.getAttribute('src') : 'img/medium.webp';
```

<div class="content-ad"></div>

이 파서를 작성한 방식은 카드가 내용을 포함하고 있어 해당 카드는 세 개의 요소를 가지며 원본 기사로 연결될 것을 의도하여 작성되었습니다.

단순히 말하면, 카드에는 제목, 기사의 짧은 오프닝 문장, 발행 날짜, 그리고 카드를 클릭할 수 있는 형태로 기사의 첫 번째 이미지가 둥근 아이콘으로 표시될 것입니다.

일부 추가적인 jQuery/JavaScript 마법이 우리가 필요로 하는 요소의 데이터를 "세척"하는 데 도움이 될 것입니다.

여기에서는 p 태그로 pTags를 정의하여 요소`p`를 가져옵니다 (이것은 Medium이 사용하는 방법이며, 귀하의 RSS/XML 소스에 따라 다를 수 있습니다).

<div class="content-ad"></div>

firstImg은 첫 번째 `img` 태그를 찾고 해당 첫 번째 태그에서 속성 src=""의 URL을 가져옵니다.

이제 요소 중 하나를 가져왔으므로 p태그를 첫 두 문장으로 정리해야 합니다.

```js
let firstTwoSentences = '';
if (pTags.length > 0) {
    const firstPTagContent = pTags[0].textContent.trim();
    const sentences = firstPTagContent.split(/[\.\?!]\s+/);
    firstTwoSentences = sentences.slice(0, 2).join('. ');
}
```

여기서 firstTwoSentences라는 새 변수를 문자열로 정의합니다.

<div class="content-ad"></div>

우리의 첫 번째 if 문은 길이를 확인하여 pTags에 실제 콘텐츠가 있는지 확인합니다.

그런 다음 처음 `p` 태그를 잘라 문자를 반복하는 수를 줄이고 " . " 문자를 분리자로 사용합니다!

그런 다음 첫 번째 두 문장을 함께 잘라 생성된 문자열로 firstTwoSentences 변수를 대체합니다!

마법 같은 일이 일어납니다!

<div class="content-ad"></div>

```js
  const template = `
  <a href="${el.find("link").text()}" target="_blank">
      <div class="message-embed">
          <div id="title" style="color: lightseagreen;">${el.find("title").text()}</div>
          <div id="pub-date" class="post-pubdate">${el.find("pubDate").text()}</div>
          <div id="post-image"><img class="message-embed-image" src="${firstImageUrl}"/></div>
          <div id="leading-message" class="leading-message">${firstTwoSentences}</div>
      </div>
  </a>
  `;
  $("#rss-embed").append(template);
```

마지막으로 모든 변수를 HTML 요소로 넣고 이를 rss-embed `container`에 추가해야 합니다.

여기에서는 template이라는 변수를 만들고 XML 피드에서 직접 요소를 가져와서 새롭게 구문 분석한 `p` 태그를 HTML 형식으로 넣는 작업을 시작합니다. 이 스크립트에서 고려해야 할 중요한 사항은 다음과 같습니다.

```js
${el.find("title").text()
```

<div class="content-ad"></div>

이 변수는 우리의 원본 AJAX jQuery 선택기에서 가져온 것입니다. 이는 XML 피드의 'items'에서 `title` 태그를 직접 가져오는 것입니다. link, pubDate에도 동일한 논리가 적용됩니다.

```js
${firstImageURL}
${firstTwoSentences}
```

이것들은 이전 코드에서 호출된 변수들입니다.

# css/styles.css

<div class="content-ad"></div>

스타일링은 완전히 당신에게 달려 있어요! 시작하는 데 도움이 되는 몇 줄의 코드가 있어요.

```js
:root{
    /* 배경 색상 */
    --darker: #292b2f;
    
    /* 글꼴 색상 */
    --light-white: #cfcfcf; 
}

body{
    background-color: var(--darker);
    color: var(--light-white);
    padding: 10px;
    overflow-y: hidden;
    font-family: "Lucida Console", Monaco, monospace;
    font-size: 32px;
    letter-spacing: 0px;
    word-spacing: -3.8px;
    font-weight: 700;
}

a{
  text-decoration: none;
}

.message-embed{
    display: inline-flex;
    flex-direction: column;
    user-select: none; 
    text-align: center;
    outline-style: solid;
    border-radius: 10px;
    outline-width: 1px;
    outline-color: lightseagreen;
    width: 200px;
    cursor: pointer;
    padding: 20px;
    min-height: 300px;
}

.message-embed:hover{
    outline-color: white;
    box-shadow: -1px -1px 35px 10px rgba(255, 255, 255, 0.4);

}

.message-embed-image{
    padding-top: 5px; 
    width: 150px; 
    height: 150px;
    border-radius: 100%;
}

.post-pubdate, .leading-message{
    font-size: 15px;
    padding-top: 12px;
    color: white;
}
```