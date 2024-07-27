---
title: "HTML과 CSS로 회원 가입 성공 메시지 만들기"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-CreateRegistrationSuccessfulMessageInHTMLandCSS_0.png"
date: 2024-07-09 18:32
ogImage:
  url: /assets/img/2024-07-09-CreateRegistrationSuccessfulMessageInHTMLandCSS_0.png
tag: Tech
originalTitle: "Create Registration Successful Message In HTML and CSS"
link: "https://medium.com/@cwrworksite/login-and-registration-form-in-html-and-css-with-source-code-e0cf03ff7d94"
---

코더 여러분, CodeByRandom에 따뜻한 환영을 전합니다. 오늘은 HTML과 CSS를 사용하여 등록 성공 메시지를 만들어 보겠습니다. 우리가 소셜 미디어 사이트나 어떤 웹 사이트를 처음 사용할 때는 자신을 등록하고 이름, 성, 이메일, 전화번호 및 선택한 암호와 같은 몇 가지 정보를 제공해야 합니다.

그 후에 "가입 완료" 메시지가 나옵니다. 구글 계정을 만드는 것과 같습니다. 이제 프론트엔드 개발자로서 HTML과 CSS를 사용하여 이를 만들어낼 수 있습니다. 이제 정보를 입력하고 양식을 제출한 후 모든 것이 잘되면 화면에 성공적인 가입 메시지를 받게 됩니다. 클라이언트 측에서 네트워크 문제나 잘못된 정보와 같이 문제가 발생하면 서버 측에서 오류 메시지가 화면에 표시됩니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

지원서 성공 메시지를 HTML로 만드는 과정을 살펴보겠습니다.

## 회원 가입 성공 메시지 HTML 코드:

하이퍼텍스트 마크업 언어인 HTML은 웹 브라우저에서 표시되는 문서에 사용되는 표준 마크업 언어입니다.

모든 HTML 문서는 문서 유형 선언(`!DOCTYPE html`)으로 시작해야 합니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

HTML 문서 자체는 `html`로 시작하여 `/html`로 끝납니다.

HTML 문서의 가시적인 부분은 `body`와 `/body` 사이에 있습니다. HTML 본문의 본 내용은 웹 사이트의 주요 내용을 담고 있습니다.

```js
<div id="card" class="animated fadeIn">
    <div id="upper-side">
        <?xml version="1.0" encoding="utf-8"?>
        <!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) -->
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg
            version="1.1"
            id="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            xml:space="preserve"
        >
            <path
                d="M131.583,92.152l-0.026-0.041c-0.713-1.118-2.197-1.447-3.316-0.734l-31.782,20.257l-4.74-12.65 c-0.483-1.29-1.882-1.958-3.124-1.493l-0.045,0.017c-1.242,0.465-1.857,1.888-1.374,3.178l5.763,15.382 c0.131,0.351,0.334,0.65,0.579,0.898c0.028,0.029,0.06,0.052,0.089,0.08c0.08,0.073,0.159,0.147,0.246,0.209 c0.071,0.051,0.147,0.091,0.222,0.133c0.058,0.033,0.115,0.069,0.175,0.097c0.081,0.037,0.165,0.063,0.249,0.091 c0.065,0.022,0.128,0.047,0.195,0.063c0.079,0.019,0.159,0.026,0.239,0.037c0.074,0.01,0.147,0.024,0.221,0.027 c0.097,0.004,0.194-0.006,0.292-0.014c0.055-0.005,0.109-0.003,0.163-0.012c0.323-0.048,0.641-0.16,0.933-0.346l34.305-21.865 C131.967,94.755,132.296,93.271,131.583,92.152z"
            />
            <circle
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                stroke-miterlimit="10"
                cx="109.486"
                cy="104.353"
                r="32.53"
            />
        </svg>
        <h3 id="status">Success</h3>
    </div>
    <div id="lower-side">
        <p id="message">
            Congratulations, your account has been successfully created.
        </p>
        <a href="#" id="contBtn">Continue</a>
    </div>
</div>
```

이 HTML 코드에서 우리는 `card`라는 id와 fade-in으로 애니메이션을 정의했습니다. 그리고 `xml` 태그에서 체크 기호의 경로를 연결하고 스트로크, 스트로크 너비 및 스트로크 제한을 설정했습니다. 그리고 메시지를 정의했습니다. HTML 출력을 살펴보겠습니다. 회원 가입 성공 메시지에 대한 CSS를 작성하기 전에요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

## HTML 출력 등록 성공 메시지:

![등록 성공 이미지](/ui-log-2/assets/img/2024-07-09-CreateRegistrationSuccessfulMessageInHTMLandCSS_1.png)

# CSS 코드 등록 성공 메시지:

CSS는 Cascading Styling Sheets의 약어입니다. CSS는 웹 사이트의 레이아웃을 스타일링하는 데 사용됩니다. 여기에서는 border-box와 display 속성, 그리고 positioning 속성과 같은 CSS의 기본 개념을 사용하고 있습니다. 'WebKit'이라는 용어는 Safari 및 Chrome 브라우저에서 콘텐츠를 렌더링하는 데 CSS 구문에서 사용됩니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

웹킷 코드를 CSS에 추가해야 할 수도 있습니다. 이는 Chrome 및 Safari에서 올바르게 렌더링되도록 보장하기 위한 것입니다. 이는 관련 렌더링 엔진이 제공하는 벤더 접두사 속성입니다 (-WebKit은 Chrome, Safari용이며, -Moz는 Firefox, -o는 Opera, -ms는 Internet Explorer용).

```js
body {
    background: #1488EA;
}
#card {
    position: relative;
    top: 110px;
    width: 320px;
    display: block;
    margin: auto;
    text-align: center;
    font-family: "Source Sans Pro", sans-serif;
}
```

이 스니펫에서는 body에 배경색을 지정했으며, 그런 다음 카드에 메시지와 체크 심볼을 포함시켰으며, 너비, 정렬 및 글꼴 패밀리를 설정했습니다.

```js
#upper-side {
    padding: 2em;
    background-color: #8BC34A;
    display: block;
    color: #fff;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}
#checkmark {
    font-weight: lighter;
    fill: #fff;
    margin: -3.5em auto auto 20px;
}
#status {
    font-weight: lighter;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1em;
    margin-top: -0.2em;
    margin-bottom: 0;
}
#lower-side {
    padding: 2em 2em 5em 2em;
    background: #fff;
    display: block;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

위 스니펫에서 카드의 위치와 체크 표시의 위치를 지정하고 패딩, 배경색, 색상 및 적절한 테두리를 설정했습니다.

```js
#message {
    margin-top: -0.5em;
    color: #757575;
    letter-spacing: 1px;
}
#contBtn {
    position: relative;
    top: 1.5em;
    text-decoration: none;
    background: #8bc34a;
    color: #fff;
    margin: auto;
    padding: 0.8em 3em;
    -webkit-box-shadow: 0px 15px 30px rgba(50, 50, 50, 0.21);
    -moz-box-shadow: 0px 15px 30px rgba(50, 50, 50, 0.21);
    box-shadow: 0px 15px 30px rgba(50, 50, 50, 0.21);
    border-radius: 25px;
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
}
#contBtn:hover {
    -webkit-box-shadow: 0px 15px 30px rgba(60, 60, 60, 0.4);
    -moz-box-shadow: 0px 15px 30px rgba(60, 60, 60, 0.4);
    box-shadow: 0px 15px 30px rgba(60, 60, 60, 0.4);
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
}
```

이 최종 스니펫에서는 위치, 색상 및 테두리 반경을 사용하여 버튼 및 해당 호버를 디자인하고 버튼 위에 호버 효과에 대한 전환을 제공했습니다. 결과를 확인해봅시다.

# Html 및 Css를 사용한 회원가입 성공 메시지의 최종 출력:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

<img src="/ui-log-2/assets/img/2024-07-09-CreateRegistrationSuccessfulMessageInHTMLandCSS_2.png" />

등록 성공 메시지에 대한 요약:

우리는 HTML과 CSS 코드를 사용하여 등록 성공 메시지를 만들었습니다. 먼저 속성을 부여하고 틱(√) 기호의 경로를 제공하는 HTML 파일을 생성하세요. 그리고 이 프로젝트를 구축하는 데 주요 역할을 하는 CSS 파일을 만들어 HTML 파일에서 정의된 태그를 스타일링하고 몇 가지 효과와 호버(마우스 올리면 이벤트 발생)를 추가했습니다.

이 것이 마음에 든다면 코멘트를 달아주시면 새로운 프로젝트를 여러분을 위해 가져올 동기부여가됩니다. 수행하는 동안 어려움을 느끼신다면 언제든지 코멘트 섹션을 통해 저희에게 연락하십시오.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

행복한 코딩

작성자 — 히만슈 싱

# 이 회원 가입 성공 메시지에는 어떤 코드 편집기를 사용하나요?

VS Code Studio를 사용하는 것을 추천합니다. 간단하고 사용하기 쉽습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# 이 프로젝트는 반응형이 맞나요?

네, 이 Registration Successful Message 프로젝트는 반응형입니다.

# 이 프로젝트를 만들 때 외부 링크를 사용했나요?

아니요, Registration Successful Message를 만들 때 외부 링크를 사용하지 않았습니다.
