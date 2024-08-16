---
title: "DOM 기반 XSS에 대해서 알아보자"
description: ""
coverImage: "/assets/img/2024-05-12-BreakingDownDOM-basedXSSAPracticalExploration_0.png"
date: 2024-05-12 23:27
ogImage: 
  url: /assets/img/2024-05-12-BreakingDownDOM-basedXSSAPracticalExploration_0.png
tag: Tech
originalTitle: "Breaking Down DOM-based XSS: A Practical Exploration"
link: "https://medium.com/@osamaavvan/breaking-down-dom-based-xss-a-practical-exploration-929d44f10906"
isUpdated: true
---



안녕하세요 여러분, 모두 잘 지내시길 바랍니다.
이 글은 DOM XSS에 관한 것이며, 클라이언트 측 JavaScript의 소스 코드 분석만으로도 DOM XSS를 찾아낼 수 있는 방법에 대해 다룹니다.

웹 애플리케이션의 클라이언트 측 코드를 분석하는 중에 보안 취약점이 발견되었습니다. 이 취약점은 DOM 기반 크로스사이트 스크립팅(XSS) 공격을 허용합니다.

![DOM XSS](/assets/img/2024-05-12-BreakingDownDOM-basedXSSAPracticalExploration_0.png)

이 취약점은 URL 매개변수에서 가져온 사용자 입력을 잘못 처리한 것에서 비롯됩니다. 애플리케이션은 window.location.search 함수를 사용하여 utm_source 및 utm_campaign 두 매개변수를 가져옵니다. 이 매개변수는 그런 다음 getUrlParameter() 함수로 전달됩니다.

![이미지](/assets/img/2024-05-12-BreakingDownDOM-basedXSSAPracticalExploration_1.png)

이 함수는 URL 쿼리 문자열에서 특정 매개변수의 값을 추출하고 디코딩한 후 해당 값을 반환하는 데 목적을 둡니다. 예를 들어, URL이 다음과 같은 경우 https://exapmle.com/redact?utm_source=hello Figure 1의 아래 코드가 실행됩니다.

getUrlParamter(`utm_source`, queryString) 함수는 utm_source 매개변수인 hello의 값을 반환하여 utm_source 변수에 저장할 것이며, utm_campaign 매개변수에 대해서도 동일합니다.

![이미지](/assets/img/2024-05-12-BreakingDownDOM-basedXSSAPracticalExploration_2.png)

그림 3에서 utm_campaign 매개변수 값이 "closedDomains"로 설정되면, 애플리케이션은 utm_source의 값에 따라 switch case 문을 실행합니다. 일치하는 case가 없는 경우, 애플리케이션은 utm_source의 값으로 brandName() 함수를 호출합니다.

![이미지](/assets/img/2024-05-12-BreakingDownDOM-basedXSSAPracticalExploration_3.png)

그림 4에서 brandName 함수는 매개변수 값에 따라 .js-brandname-container 클래스를 가진 요소를 숨기거나 .js-brandname 클래스를 가진 요소의 inner HTML을 설정하는 방식으로 설계되었습니다. brandName 값이 false로 설정되면 지정된 요소를 숨기고, 그렇지 않으면 요소의 inner HTML을 제공된 brandName 값으로 설정합니다.

그림 3에서 이미 알 수 있듯이, 우리는 URL 매개변수 utm_source를 통해 함수brandName(utm_source)에 전달되는 매개변수 값을 제어할 수 있으므로 이제 HTML 태그를 삽입하고 임의의 JavaScript 코드를 실행할 수 있습니다.

프론트 엔드 개발자입니다. 위의 텍스트를 친절한 어조로 한국어로 번역해 주세요.

아카마이 방화벽이 구출 작업을 수행했습니다. 이제 (WAF)가 잠재적으로 존재할지라도 XSS 공격을 실행하기 위해 성공적으로 우회했습니다. 다음 payload를 자유롭게 사용하세요.

https://your-server/x.js를 자신의 서버로 바꿔주세요. 자바스크립트 파일을 업로드한 서버에 대체하세요. 해당 파일은 payload를 실행할 것입니다.

"Click Me" 버튼을 클릭하면 됩니다.

![DOM-based XSS Attack](/assets/img/2024-05-12-BreakingDownDOM-basedXSSAPracticalExploration_6.png)

읽어 주셔서 감사합니다.
