---
title: "잔머리 풀기 CORS와 함께하는 Spring Boot, Spring Security"
description: ""
coverImage: "/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_0.png"
date: 2024-05-12 21:49
ogImage: 
  url: /assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_0.png
tag: Tech
originalTitle: "What the CORS ft Spring Boot , Spring Security"
link: "https://medium.com/@rajendraprasadpadma/what-the-cors-ft-spring-boot-spring-security-562f24d705c9"
---


<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_0.png" />

알겠습니다. 어느 날 한 마리로 리소스를 만들고, 읽고, 업데이트하고, 삭제할 수 있는 단일 리소스에 노출된 엔드포인트를 제공하는 간단한 Rest API를 만들려고 했습니다. React를 사용하여 이러한 요청을 제출하는 작은 폼을 만들고 싶었습니다.

주의하세요, 다음 React 폼은 정말 진보적입니다. 이러한 종류의 폼을 만들려면 최소한 닌자 수준의 React 개발자여야합니다.

<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_1.png" />



친구들은 부러워하지 마세요!

그래서 제 Rest API(Spring Boot으로 만든)는 'http://localhost:8080'에서 실행되고, 내 React 앱은 'http://localhost:3000'에서 실행 중이었어요.

![이미지](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_2.png)

첫 번째 포스트 요청을 보내 리소스를 서버에 만들 준비가 끝났어요. 기다림이 여린 마음으로, 마치 JPL 직원들이 Perseverance 착륙을 기다리던 것처럼요.



그 다음 콘솔에서 이것을 보았어요


![이미지](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_3.png)

그리고 '개발자 콘솔'의 네트워크 탭으로 들어가서 더 자세히 파헤치려고 했더니, 두 개의 요청이 남아 있는 것을 보았어요

![이미지](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_4.png)



리액트 코드에서 fetch api를 사용하여 아래 POST 요청을 보냈습니다.

![POST 요청](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_5.png)

페이지에서 해당 제출 버튼을 누른 후, 두 가지에 대해 혼란스러웠습니다: 

- 왜 내 POST가 실패했는지
- 개발자 콘솔 스크린샷에서 두 개의 요청이 서버 네트워크 탭에 표시되는 이유



CORS 소개

CORS는 특정 자바스크립트 코드(예: 내 React 코드 - http://localhost:3000)가 서버(내 서버에서 실행 중인 Spring Boot Rest Api - http://localhost:8000)로부터 리소스를 요청할 권한이 있는지 브라우저가 이해하는 방법입니다. 서버에서 허용되지 않으면 브라우저가 CORS 예외를 간단히 발생시킵니다.

콘솔에서 받은 오류 메시지로 이해해 봅시다:


fetch에 대한 액세스가 CORS 정책에 의해 차단되었습니다. ‘http://localhost:8080/airports`에서 `http://localhost:3000` 출처로부터: 사전 플라이트 요청에 대한 응답이 액세스 제어 확인을 통과하지 못함: 요청한 리소스에 ‘Access-Control-Allow-Origin’ 헤더가 없습니다. 불투명한 응답이 필요한 경우 요청의 모드를 ‘no-cors’로 설정하여 CORS가 비활성화된 상태로 리소스를 가져올 수 있습니다.




여기 이해해야 할 키포인트는 '오리진(origin)'입니다. '오리진'은 '프로토콜://호스트:포트'의 조합입니다. 따라서 요청은 'http://localhost:3000'이라는 오리진에서 이루어지고 요청은 'http://localhost:8080'으로 보내집니다. 이는 두 개의 다른 오리진 간의 통신을 시도하는 것입니다. 따라서 이러한 경우에는 브라우저가 요청자(http://localhost:3000)가 요청받는이(http://localhost:8080)로부터 리소스를 요청할 수 있는지 확인합니다. 요청자가 허용되지 않을 경우, 요청을 할 때 CORS 에러가 발생합니다.

그런데 왜 네트워크 탭에서 두 개의 요청이 발생하는 것일까요?

주의 깊게 살펴보면, 하나의 요청은 'preflight'로 분류되고 다른 하나(즉, 실제로 POST를 하는 요청)는 스크린샷에서 보듯이 'CORS 에러'로 분류됩니다. 따라서 브라우저들은 먼저 POST 요청을 보내지 않고, 서버에서 허용된 '오리진'이 무엇인지 확인하려고 먼저 시도합니다. 이 확인을 위해 서버로 OPTIONS 요청을 보냅니다. 이는 종종 'preflight' 요청이라고 불립니다.

따라서 이 preflight 요청으로 브라우저가 실제로 무엇을 기대하고 있는지 알아볼까요?



브라우저는 서버로부터 해당 요청을 수락할 수 있다는 응답 헤더를 받기를 기다리고 있어요.

정확히 어떤 응답 헤더인가요?

"access-control-allow-origin" — 여기서 허용된 출처가 명시된 헤더에요. localhost:3000이 헤더에 명시되어 있다면 우리는 업무를 진행할 수 있어요.

![이미지](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_6.png)



이렇게 실패한 사전 플라이트 요청을 확인해 봅시다.

요청 방법이 ‘OPTIONS’이고 서버에서 그 요청을 하지 못하게 하는 (403) 것으로 나왔네요. 그리고 나의 응답 헤더에는 ‘Access-Control-Allow-Origin’이라고 언급된 것이 없습니다. 결국, 서버 측에서 "OPTIONS" 요청 방법이 정의되지 않았기 때문에 사전 플라이트 요청 자체가 실패했습니다.

![image](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_7.png)

내 컨트롤러에는 기본적인 CRUD 요청 매핑(GET, POST, PUT, DELETE)만 있습니다.




<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_8.png" />

이제 원래 질문은 무엇일까요? 사전검사(preflight)가 허용된 출처를 확인하고 "http://localhost:3000"을 허용된 출처로 허용하는 방법은 무엇일까요?

Spring Boot은 @CrossOrigin 어노테이션을 통해 간단한 해결책을 제공합니다. 컨트롤러 클래스 상단에 이렇게 간단히 넣어보세요.

<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_9.png" />



이제 Spring Boot 애플리케이션을 다시 시작하고 리소스를 게시해 보았어요.

그러자 성공했어요!

![이미지](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_10.png)

이제 프리플라이트와 포스트 요청이 모두 '200 - A Ok ;)'로 성공적으로 나갔다는 것을 확인하실 수 있을 거예요.



자 이제 사전 검사 요청과 응답 헤더를 살펴보겠습니다.

사전 검사의 요청 헤더에서 요청 방법은 ‘OPTIONS’이며 응답 헤더에서는 다음을 알 수 있습니다.

‘Access-Control-Allow-Origin’ : * (이는 어떤 출처에서도 서버로의 요청을 보낼 수 있다는 것을 나타내므로 제 리액트 애플리케이션도 요청을 보낼 수 있는 자격이 있습니다.)

‘Access-Control-Allow-Methods’ : POST (사전 검사는 만들어질 POST가 자격이 있다는 것을 확인했습니다)



'허용' : GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH.

서버의 @CrossOrigins 변경 전에 사전 요청(preflight request)이 서버에서 OPTIONS가 허용되지 않았기 때문에 403 상태를 받았습니다. 하지만 이제 서버에서 모든 요청 방법이 허용되는 것을 볼 수 있습니다. 따라서 preflight인 "OPTIONS" 요청이 서버에 선언된 엔드포인트가 없더라도 정상적으로 진행됩니다.

![이미지](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_11.png)

컨트롤러에 @CrossOrigins를 선언하는 것만으로 모든 출처와 방법이 서버에 도달할 수 있는 문을 열게 됩니다. 하지만 실제 응용 프로그램에서는 그런 것을 원하지 않을 것입니다. 따라서 @CrossOrigins의 이러한 속성을 사용하여 서버에서 필터링하고자 하는 출처와 방법을 사용자 정의할 수 있습니다.



- origins = "http://localhost:3000"

(내 React 앱만 요청할 수 있게 해줍니다)

2. methods='RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE'

(어떤 메서드를 요청에서 허용할 지 정의할 수 있습니다)



다른 것들을 선언하여 헤더를 허용하는 것, 자격 증명을 허용하는지 등을 확인할 수 있습니다. 스스로 살펴보세요!

![이미지](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_12.png)

Phase II — 스프링 시큐리티를 사용하여 내 요청에 기본 인증 부착

좋아요. 이 자신감을 얻은 후에, 나는 내 REST API에 스프링 시큐리티를 부착해보고 싶었습니다. 요청을 인증하는 방법으로 기본 인증을 허용하려고 했습니다.



<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_13.png" />

나는 닌자인 나로써, pom.xml에 Spring Security 스타터 종속성을 추가하고 메이븐 종속성을 업데이트하고 서버를 시작했어. 서버를 다시 시작하면, Spring Security가 응용 프로그램에 '사용자'라는 기본 사용자 이름과 Spring Security가 무작위로 생성하는 해시된 비밀번호로 인증 레이어를 추가해.

이제, 리액트 애플리케이션에서 동일한 포스트 요청을 보냈어.

그리고 다시 한 번, 무서운 CORS 예외가 발생했어.


![2024-05-12-WhattheCORSftSpringBootSpringSecurity_14](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_14.png)

네트워크에 들어가서 문제를 더 디버깅했습니다.

post 요청이 하나만 있었고 프리플라이트 요청은 없었습니다. post 요청에 대한 응답에는 'Access-Control-Allow-Origin'이 설정되어 있지 않았습니다. 또한 'WWW-Authenticate:Basic realm="Realm"' 헤더를 확인했습니다.

![2024-05-12-WhattheCORSftSpringBootSpringSecurity_15](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_15.png)



그래서 기본적으로 스프링 시큐리티를 활성화한 후에는 두 가지 작업을 수행해야 합니다:

- 요청을 보낼 때 클라이언트에서 기본 인증 요청을 보내야 합니다.
- 서버가 React 애플리케이션이 허용된 출처임을 나타내는 Access-Control-Allow-Origin 플래그를 보내야 합니다.

그런데, 우리가 컨트롤러에 @CrossOrigins를 이미 언급했었죠.

그렇지만, 스프링 시큐리티를 활성화했을 때는 고려되지 않으니 이를 해결할 방법이 필요합니다.



한 단계씩 해결해 보겠습니다.

- 우리 클라이언트에서 기본 인증 요청을 보냅시다.

Fetch를 사용하므로 React에서 POST 호출을 할 때 보내는 매개변수에 다음 헤더 정보를 첨부해야 합니다:


"Authorization":"Basic Base64encoded(username:password)"




제 사용자 이름은 "user"이고,

비밀번호는 "harambe"입니다.

리액트에서 btoa라는 함수를 사용할 수 있습니다. 사용자 이름과 비밀번호를 이 함수에 전달하면 btoa(user:harambe)처럼 보일 것입니다. btoa 메소드는 base64 인코딩된 문자열을 반환합니다. 그래서 결과물은 다음과 같이 보일 것입니다:


![이미지](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_16.png)



기본 및 btoa(username:password) 방법 사이에 공백을 유지하는 것을 잊지 마세요. 이것은 인증을 돕게 됩니다.

이제 해당 포스트 호출을 다시 시도해 봅시다.

![이미지](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_17.png)

음, 음, 여기 누가 있나요. 네트워크로 이동하여 사전 휴식 및 포스트 요청을 모두 확인했습니다.



<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_18.png" />

패턴은 프로젝트에 spring security를 추가하기 전에 만난 것과 똑같아요. 권한이없는 하나의 사전(OPTIONS) 요청과 별도의 CORS 예외가 있다 fetch POST 호출(실제 호출).

사전 요청과 응답을 살펴보면, 서버에서는 액세스 허용 제어 원점을 반환하지 않았고 OPTIONS 요청에서도 인증을 예상하고 있었어요.

<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_19.png" />



<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_20.png" />

저는 주말 절반을 보내며 Spring Security를 구성하여 Cross Origin 요청을 허용하는 방법을 찾았습니다. 이 코드를 발견했어요.

<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_21.png" />

이 Rest API를 호스팅하는 주요 Spring 애플리케이션에서 이러한 기본 제공 메서드를 호출하여 Spring Security 구성을 구성하세요.



여기 메서드가 있어요.

- cors() - 스프링 시큐리티에 CORS를 활성화하라고 알려줍니다. 이제 서버는 오리진을 화이트리스트/필터링할 준비가 되었어요. 그래서 여전히 오리진 목록을 설정할 것입니다.
- httpBasic() - 클라이언트가 기본 인증 방식을 통해 요청을 인증할 것이라고 스프링 시큐리티에 알려줍니다. 그래서 스프링 시큐리티는 클라이언트에서 보내는 'Authorization': 'Basic #해시'를 읽을 수 있도록 조정되어 있어요. 유효한 인증 정보인 경우, 스프링 시큐리티는 우리를 통과시켜줄 거에요.

코드에서 보이는 나머지 메서드들에 대해서는 다른 블로그 포스트를 계획 중이에요.

지금은 cors()가 활성화된 상태일 뿐, 화이트리스트에 등록할 오리진을 아직 설정해야 해요.



<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_22.png" />

여기서 컨트롤러를 보면 다음과 같은 설정을 추가했습니다.

- origins = "http://localhost:3000" : 내 리액트 코드가 있는 곳입니다.
- allowCredentials = true: 인증 형식을 사용한다면 중요한 부분입니다.

기본적으로 @CrossOrigin은 모든 요청 방식과 헤더를 허용합니다. 그래서 사전 통지 요청에 문제가 없을 겁니다.



지금, 다시 그 게시 버튼을 눌러보세요

![이미지1](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_23.png)

![이미지2](/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_24.png)

마침내, 영광의 달콤함.



이곳에 있는 두 번째 요청은 무시해 주세요. Preflight에서 온 것이 아닙니다. 화면 캡처에서 보는 것처럼, 뭔가를 게시한 후에 'Get'을 수행하는 로직을 작성했습니다.

우리의 설정으로 인해 POST 요청 및 응답 헤더가 어떻게 영향을 받는지 확인해보겠습니다.

<img src="/assets/img/2024-05-12-WhattheCORSftSpringBootSpringSecurity_25.png" />

'Access-Control-Allow-Credentials' 플래그가 true로 설정되어 있고, 허용된 출처에는 React 애플리케이션 원본이 표시되는 것을 볼 수 있습니다.



행복한 하루 보내세요!