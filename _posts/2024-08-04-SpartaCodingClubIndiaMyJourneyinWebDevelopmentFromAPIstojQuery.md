---
title: "스파르타 코딩 클럽 인도 웹 개발 여정 API부터 jQuery까지"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-04 19:16
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Sparta Coding Club India My Journey in Web Development From APIs to jQuery"
link: "https://medium.com/@bijayeenihalder/sparta-coding-club-india-my-journey-in-web-development-from-apis-to-jquery-5bfe68a6456c"
isUpdated: true
---

# 1. 새로운 배움

## Spartapedia OpenAPI에 액세스하기

요즘, 나는 API의 세계에 뛰어들어 Spartapedia OpenAPI에 액세스하는 방법을 배우면서 새로운 경험을 쌓았어요. API(Application Programming Interfaces)는 서로 다른 소프트웨어 애플리케이션이 서로 통신할 수 있도록 하는 데 꼭 필요해요. 특히 Spartapedia OpenAPI는 외부 소스에서 데이터를 가져와 웹 애플리케이션으로 통합하는 방법을 이해하는 데 도움이 되었어요.

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

API는 일반적으로 HTTP 요청을 사용하여 데이터를 가져 오거나 게시하거나 업데이트하거나 삭제합니다. 이 예에서는 Spartapedia에서 데이터를 가져 오기 위해 GET 요청을 보내는 데 초점을 맞추었습니다. jQuery의 $.ajax와 같은 도구를 사용하여 이러한 요청을 수행하고 응답을 효과적으로 처리할 수 있었습니다.

## 예시 코드 스니펫:

```js
$.ajax({
  type: "GET",
  url: "http://spartacodingclub.shop/post/en",
  data: {},
  success: function (response) {
    let movies = response["movies"];
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i];
      let title = movie["title"];
      let desc = movie["desc"];
      let image = movie["image"];
      let comment = movie["comment"];
      let star = movie["star"];
      let star_emoji = "⭐".repeat(star);
      let temp_html = `
                            <div class="col">
                                <div class="card h-100">
                                    <img src="${image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">${desc}</p>
                                        <p>${star_emoji}</p>
                                        <p class="mycomment">${comment}</p>
                                    </div>
                                </div>
                            </div>
                        `;
      $("#cards-box").append(temp_html);
    }
  },
});
```

# jQuery vs JavaScript

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

다른 중요한 학습 내용은 jQuery와 순수 JavaScript를 사용하는 차이와 장점을 이해하는 것이었습니다. jQuery는 HTML 문서 탐색, 이벤트 처리 및 애니메이션을 간소화하는 빠르고 작고 기능이 풍부한 JavaScript 라이브러리입니다.

## 설명:

JavaScript는 웹 개발의 기반을 제공하는 반면, jQuery는 DOM 조작, 이벤트 처리 및 AJAX 호출과 같은 일반적 작업에 대해 보다 간결하고 사용하기 쉬운 구문을 제공합니다. 이는 생산성과 코드 가독성을 크게 향상시킬 수 있습니다.

## 예시 코드 조각:

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
// div 숨기기를 위한 JavaScript
document.getElementById("element").style.display = "none";

// div 숨기기를 위한 jQuery
$("#element").hide();
```

# 2. 직면한 어려움

# 중첩된 JSON 응답 이해

내가 직면한 어려움 중 하나는 중첩된 JSON 응답에서 데이터에 접근하는 일이었습니다. JSON(JavaScript Object Notation)은 중첩된 JSON 응답에서 데이터에 접근하는 것을 의미합니다. 깊게 중첩된 JSON 객체를 탐색하기 위해서는 JavaScript에서 객체 표기법에 대한 명확한 이해가 필요했습니다.

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

## 해결책:

이를 극복하기 위해 다양한 JSON 구조를 사용하고 console.log와 같은 디버깅 도구를 사용하여 중첩된 속성의 경로를 추적하는 것으로 연습했습니다.

## 예제 코드 스니펫:

```js
$.ajax({
  type: "GET",
  url: "http://spartacodingclub.shop/en/global_air/seoul",
  data: {},
  success: function (response) {
    let dates = response["data"]["forecast"];
    for (let i = 0; i < dates.length; i++) {
      let day = dates[i]["day"];
      let avg = dates[i]["avg"];
      console.log(day, avg);
    }
  },
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

# 3. 지금까지의 나의 여정에 대한 반성

# 성장과 발전

내 여정을 되돌아보면, 웹 개발 기술에서 상당한 성장을 보았습니다. 처음에는 AJAX와 API 요청과 같은 개념들이 다소 혼란스러웠지만, 지속적인 연습과 실전 프로젝트를 통해 이러한 기술들에 훨씬 더 편안해졌습니다.

# 시작했을 때와의 차이점

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

처음에는 JavaScript 구문과 DOM 조작에 대한 기본을 이해하는 데 어려움을 겪었습니다. 지금은 자신 있게 API 호출을 수행하고 JSON 데이터를 처리하며 jQuery를 사용하여 복잡한 작업을 간소화할 수 있습니다. 문제 해결 능력도 향상되어 이제 문제를 더 효율적으로 디버깅하고 연구 및 실습을 통해 해결책을 찾을 수 있습니다.

# 향후 학습 목표

앞으로는 백엔드 개발 지식을 더 깊이 있는 수준으로 이해하고 API를 생성하고 관리하는 방법을 파악하고 싶습니다. 또한 Python, 웹 크롤링, MongoDB 및 React 또는 Angular와 같은 고급 JavaScript 프레임워크를 탐험하여 더 동적이고 상호 작용적인 웹 애플리케이션을 구축하고자 합니다.

# 결론

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

스파르타 코딩 클럽 인도에 가입해서 정말 변화를 맛보았어요. 체계적인 학습 커리큘럼과 실용적인 프로젝트들이 제 스킬과 자신감을 크게 향상시켰어요. 이 여정을 계속하고 더 많은 지식을 넓히는 것을 기다리고 있어요.
