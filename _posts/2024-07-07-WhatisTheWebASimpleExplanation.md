---
title: "웹이란 무엇인가 간단한 설명"
description: ""
coverImage: "/assets/img/2024-07-07-WhatisTheWebASimpleExplanation_0.png"
date: 2024-07-07 12:45
ogImage: 
  url: /assets/img/2024-07-07-WhatisTheWebASimpleExplanation_0.png
tag: Tech
originalTitle: "What is The Web: A Simple Explanation"
link: "https://medium.com/@alfadlimaulana/what-is-the-web-a-simple-explanation-527053544d03"
isUpdated: true
---



![Web and Internet Difference](/assets/img/2024-07-07-WhatisTheWebASimpleExplanation_0.png)

많은 사람들이 웹과 인터넷이 같은 것이라고 생각하지만 사실은 아닙니다. 간단히 말하면, 인터넷은 세계를 연결하는 네트워크인 반면, 월드 와이드 웹 또는 간단히 웹은 인터넷을 이용하여 정보를 공유하는 한 가지 방법입니다. 웹은 HTML, HTTP, URL이라는 세 가지 주요 구성 요소로 구성되어 있습니다. 이 세 가지가 무엇인지 살펴보겠습니다.

## HTML (하이퍼텍스트 마크업 언어)

위에서 언급한 대로, 웹은 정보를 공유하는 한 가지 방법입니다. 정보 자체는 HTML 파일 내에 포함되어 있습니다. HTML 파일을 열면 혼란스러울 수 있는 코드 줄이 표시됩니다. 그러나 웹 브라우저(예: Chrome, Safari 등)는 이 코드를 변환하여 현재 보고 계신 웹 페이지와 같이 표시할 수 있습니다. 하이퍼링크로 연결된 웹 페이지의 집합을 웹사이트라고 합니다.

<div class="content-ad"></div>

![HTTP (Hypertext Transfer Protocol)](https://www.example.com/assets/img/2024-07-07-WhatisTheWebASimpleExplanation_1.png)

# HTTP (하이퍼텍스트 전송 프로토콜)

모든 형태의 커뮤니케이션에는 합의된 규칙이 있습니다. 취업 면접을 가는 상황을 상상해보세요. 당신과 채용 담당자는 주제, 장소, 언어 등에 대해 합의해야 합니다. 이러한 합의된 규칙을 프로토콜이라고 합니다.

HTTP 프로토콜은 클라이언트(웹 브라우저)와 웹 서버(웹사이트가 저장된 곳) 간 데이터 전송을 용이하게 하는 규칙 세트로 설명할 수 있습니다. HTTP를 통해 양쪽 모두가 해야 할 일, 요청된 데이터, 데이터를 보호하는 방법 등을 이해할 수 있습니다. HTTP 외에도 이메일에 대한 SNMP, 파일에 대한 FTP 등과 같이 각각의 기능을 갖는 다른 프로토콜이 있습니다.

<div class="content-ad"></div>

# URL (통합 자원 지시자)

URL(Uniform Resource Locator, 통일 자원 지시자)은 브라우저에 필요한 자원(문서, 이미지 등)을 어디에서 어떻게 가져올지 알려주는 텍스트입니다. 이 웹사이트의 URL은 브라우저 주소창에 표시됩니다. 새 웹사이트나 페이지로 이동하려면 주소 창에 새 URL을 입력할 수 있습니다. URL은 주로 프로토콜, 도메인 및 경로 세 가지 구성 요소로 이루어져 있습니다.

## 프로토콜

이미 프로토콜에 대해 약간 설명했었죠. 여러분은 웹 리소스에 액세스하는 데 사용되는 "http://" 및 "https://"와 친숙할 것입니다. HTTPS는 HTTP의 보안 버전으로, 전송되는 데이터를 암호화하여 더 안전합니다. HTTPS의 "S"는 "Secure"의 약자입니다. 또한 이메일에는 "mailto:", 파일 액세스에는 "ftp://"와 같이 다른 프로토콜도 사용될 수 있음을 유의해 주세요.

<div class="content-ad"></div>

## 도메인

웹 서버는 웹 사이트를 저장하고 처리하는 특수 컴퓨터입니다. 다른 컴퓨터와 마찬가지로 웹 서버는 IP 주소를 갖고 있습니다. 실제로 URL의 도메인은 서버의 IP 주소입니다. 이 IP 주소는 사람들이 기억하기 쉽도록 텍스트(google.com, medium.com 등)로 표시됩니다. 믿지 못하겠다면 google.com의 IP 주소인 "142.250.191.46"을 브라우저 주소 표시줄에 입력해 보세요. 결과가 같음을 확인할 수 있습니다. 도메인을 IP 주소로 변환하는 장치는 DNS 서버입니다. 더 명확한 그림을 위해 아래 그림을 참고하세요.

![도메인 이미지](/assets/img/2024-07-07-WhatisTheWebASimpleExplanation_2.png)

## 경로

<div class="content-ad"></div>

파일 탐색기인 파일 탐색기 또는 Finder와 같은 파일 관리자를 사용하여 파일을 자주 찾습니다. 경로의 기능은 어느 정도 유사합니다. 파일이 저장된 위치를 알려줍니다. 아래 이미지는 파일 구조와 URL 경로 간의 관계를 보여줍니다.

![file structure and URL path](/assets/img/2024-07-07-WhatisTheWebASimpleExplanation_3.png)

경로는 도메인 뒤의 모든 문자로 이루어져 있으며, "/"로 시작합니다. 이미지를 참조하면 경로는 "/home.html" 및 "/about/about.html"입니다. "/home.html"은 "home.html 파일을 검색하라"로 해석할 수 있습니다. 반면에 "/about/about.html"은 "about 폴더에 들어가서 about.html 파일을 검색하라"로 이해할 수 있습니다. 이것은 경로의 기본 개념에 불과하니 참고하십시오. 더 자세히 설명할 수도 있겠지만, 또 다른 기사에서 설명할 수 있습니다.

# 요약

<div class="content-ad"></div>

웹 페이지에 접근하는 시나리오를 통해 모든 것을 연결해 보겠습니다. 웹 브라우저 주소 표시줄에 https://phosphoricons.com/index.html을 입력한다고 가정해 보세요. "Enter"를 누르면 컴퓨터가 DNS 서버에서 phosphoricons.com과 관련된 IP 주소를 요청합니다. 그 후 컴퓨터가 획득한 IP 주소의 서버에서 "index.html" 파일을 요청합니다. 이러한 모든 과정은 https 프로토콜이 모든 데이터 전송을 암호화하기 때문에 안전하게 이루어집니다.

웹에 대해 설명할 수 있는 것은 여기까지입니다. 이 글에서의 목표는 모든 사람이 쉽게 이해할 수 있도록 웹을 설명하는 것이었습니다. 따라서 아직도 답변되지 않은 질문이 많다면 죄송합니다. 읽어 주셔서 감사합니다!
