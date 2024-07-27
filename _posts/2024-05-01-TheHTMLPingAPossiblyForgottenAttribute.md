---
title: "HTML Ping 이제는 사용하지 않아야하는 이유"
description: ""
coverImage: "/assets/img/2024-05-01-TheHTMLPingAPossiblyForgottenAttribute_0.png"
date: 2024-05-01 22:50
ogImage: 
  url: /assets/img/2024-05-01-TheHTMLPingAPossiblyForgottenAttribute_0.png
tag: Tech
originalTitle: "The HTML Ping: A Possibly Forgotten Attribute"
link: "https://medium.com/gitconnected/the-html-ping-a-possibly-forgotten-attribute-8deb563ff470"
---


![이미지](/assets/img/2024-05-01-TheHTMLPingAPossiblyForgottenAttribute_0.png)

HTML ping 속성은 웹 개발자가 링크 클릭 추적을 가볍게 구현할 수 있도록 도와주는 도구입니다.

## Ping 속성 이해하기

Ping 속성은 HTML에서 앵커(`a`) 요소와 특별히 함께 사용됩니다. 그 값으로 URL의 공백으로 구분된 목록을 허용합니다. Ping 속성이 정의된 앵커 요소를 클릭하면 브라우저가 자동으로 지정된 URL로 POST 요청을 보냅니다.

<div class="content-ad"></div>

기본적인 예제를 살펴보면 ping 속성이 어떻게 작동하는지 알 수 있어요:

```js
<a href="https://www.example.com/article" ping="https://www.example.com/track">기사 읽기</a>
```

이 예제에서 사용자가 "기사 읽기" 링크를 클릭하면 브라우저가 https://www.example.com/track으로 POST 요청을 보내게 됩니다.

# 핑 요청

<div class="content-ad"></div>

ping 속성을 사용하면 브라우저가 지정된 URL로 POST 요청을 보냅니다. 요청 payload는 단어 PING이고 ping-to 요청 헤더에는 링크의 대상이 포함됩니다. 또한 사용자 에이전트와 같은 다른 정보도 요청 내에서 액세스할 수 있습니다.

ping 요청의 content-type은 일반적인 폼 제출 또는 AJAX 요청과 구별되도록 text/ping으로 설정됩니다.

# 브라우저 지원

ping 속성의 브라우저 지원은 비교적 좋지만, 다양한 브라우저 간에 일부 차이가 있습니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-05-01-TheHTMLPingAPossiblyForgottenAttribute_1.png)

## 실용적인 사용 사례

### 링크 클릭 추적

Ping 속성의 주요 목적은 링크를 통한 사용자 상호 작용을 추적하는 것입니다. Ping 속성에 하나 이상의 URL을 정의함으로써 사용자가 웹사이트와 상호 작용하는 방식을 모니터링하고 분석할 수 있습니다.

<div class="content-ad"></div>

다음 예제를 살펴보세요:

```js
<a href="https://www.example.com/popular-posts" ping="https://www.example.com/track">인기 게시물 읽기</a>
```

이 경우 사용자가 "인기 게시물 읽기" 링크를 클릭하면 ping 속성이 지정된 URL(https://www.example.com/track)로 POST 요청을 트리거합니다. 이 요청은 링크가 클릭된 것을 알리는 통지 역할을 하여 데이터를 수집하고 사용자 행동을 분석할 수 있게 합니다.

## 교차 도메인 추적

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경하세요.

The ping attribute can also be used to track user interactions across different domains. Suppose you have multiple websites within your organization and want to collect data about how users navigate between them. By defining the appropriate tracking URLs in the ping attribute, you can achieve seamless cross-domain tracking.

# Availability of Third-Party Analytics Providers

Third-party analytics providers, such as Google Analytics, offer comprehensive tracking solutions that are easy to implement. By simply embedding a single JavaScript snippet, developers can access powerful tracking capabilities without the need for manual HTML modifications. These providers handle the tracking infrastructure, data processing, and reporting, making it a convenient choice for many web developers.

# Conclusion

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경하세요.