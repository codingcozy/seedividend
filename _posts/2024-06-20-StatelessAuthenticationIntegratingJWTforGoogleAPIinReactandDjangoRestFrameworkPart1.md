---
title: "상태가 없는 인증 React 및 Django Rest Framework에서 Google API에 JWT 통합하기 파트  1"
description: ""
coverImage: "/assets/img/2024-06-20-StatelessAuthenticationIntegratingJWTforGoogleAPIinReactandDjangoRestFrameworkPart1_0.png"
date: 2024-06-20 02:14
ogImage: 
  url: /assets/img/2024-06-20-StatelessAuthenticationIntegratingJWTforGoogleAPIinReactandDjangoRestFrameworkPart1_0.png
tag: Tech
originalTitle: "Stateless Authentication: Integrating JWT for Google API in React and Django Rest Framework (Part — 1)"
link: "https://medium.com/@lcbiplove1/stateless-authentication-integrating-jwt-for-google-api-in-react-and-django-rest-framework-part-6aab7f47a190"
isUpdated: true
---




# 개요

이 블로그에서는 Google API를 사용하여 내 웹 앱에 JWT 인증을 통합하는 경험을 공유하고 자습서를 제공할 예정입니다. 이것은 총 세 부작으로 이루어질 것입니다. 먼저 주제의 이론적 측면을 다루고, 그 후에는 실습 자습서로 넘어갈 것입니다.

주로 사용할 패키지들은 다음과 같습니다:

- Google API
- Django Rest Framework
- Django Rest Framework SimpleJWT
- Django CORS Headers
- Django Dot Env
- React
- React OAuth Google

<div class="content-ad"></div>

기본적인 앱 설정 생성과 같은 몇 가지 기본 단계를 건너뛸 예정이니 참고해 주세요.

# JWT의 의미와 이유

다양한 인증 방법 중 JWT는 요청의 무결성을 인증하거나 승인하는 상대적으로 새로운 방법입니다. 내 의견으로 JWT의 개념에 끌린 주된 측면 중 하나는 무상태(Stateless) 특성입니다.

무상태 특성이란 요청이 유효한지 확인하기 위해 데이터베이스를 쿼리할 필요가 없다는 것을 의미합니다. 이 특성은 JWT를 강력하게 만들며 꼭 무상태입니다. 한 번 토큰이 서명되고 생성되면, 웹 애플리케이션은 토큰의 서명을 기반으로 토큰을 확인할 수 있습니다. 데이터베이스를 쿼리하여 요청이 합법적인지 확인할 필요는 없습니다. 이는 대규모 애플리케이션에 특히 유용합니다.

<div class="content-ad"></div>

그러나 JWT의 단점을 이해하는 것도 중요합니다. 그 중 하나는 유효한 토큰을 무효화하거나 취소하는 것이 어렵다는 점입니다. 토큰 무효화를 달성하는 방법은 있지만, 다른 종류의 인증(예: 토큰 기반 인증)보다 간단하지는 않습니다.

JWT에 대해 더 자세히 알아보려면 여기에서 공식 소개 페이지를 참조하세요.

# Google API

Google API는 구글이 개발한 응용 프로그램 프로그래밍 인터페이스(API) 집합으로, 구글 서비스 및 기타 애플리케이션과 통신할 수 있게 해줍니다. 이러한 API는 구글 지도, 구글 드라이브, 구글 캘린더 등 다양한 구글 서비스에 액세스할 수 있도록 해줍니다. 우리는 이러한 API를 사용하여 앱에서 사용자를 로그인할 것입니다.

<div class="content-ad"></div>

다음 작업을 수행하겠습니다:

- Google Cloud Console에 접속합니다.
- 왼쪽 상단 로고 근처에서 프로젝트를 선택하거나 새로 만듭니다.


![이미지1](/assets/img/2024-06-20-StatelessAuthenticationIntegratingJWTforGoogleAPIinReactandDjangoRestFrameworkPart1_0.png)

![이미지2](/assets/img/2024-06-20-StatelessAuthenticationIntegratingJWTforGoogleAPIinReactandDjangoRestFrameworkPart1_1.png)


<div class="content-ad"></div>


![Image 1](/assets/img/2024-06-20-StatelessAuthenticationIntegratingJWTforGoogleAPIinReactandDjangoRestFrameworkPart1_2.png)

![Image 2](/assets/img/2024-06-20-StatelessAuthenticationIntegratingJWTforGoogleAPIinReactandDjangoRestFrameworkPart1_3.png)

- 동의 화면에서는 app_name, user_support_email, developer_contact_email을 입력할 것입니다. 다른 필드는 로컬 환경에서 비워둘 겁니다. 나중에 필요한 경우 양식을 업데이트할 수도 있습니다. test_email을 위해 몇 개의 이메일을 추가할 수 있습니다. 그 외에는 '다음' 버튼만 눌러 진행하면 됩니다.
- 이제 동일한 드롭다운에서 새로운 OAuth 클라이언트 ID를 생성할 수 있습니다. 모바일 앱이나 태블릿 애플리케이션을 개발 중이라면 다른 플랫폼을 사용할 수 있습니다.

![Image 3](/assets/img/2024-06-20-StatelessAuthenticationIntegratingJWTforGoogleAPIinReactandDjangoRestFrameworkPart1_4.png)


<div class="content-ad"></div>

- 허가된 js origin은 구글 버튼이 렌더링될 URI를 의미합니다. 즉, 프론트엔드 URL(우리의 리액트 서버)을 의미합니다. 반면에, 허가된 리다이렉트 URI는 우리의 장고 서버를 위한 것입니다.

![이미지](/assets/img/2024-06-20-StatelessAuthenticationIntegratingJWTforGoogleAPIinReactandDjangoRestFrameworkPart1_5.png)

- 그 다음으로 클라이언트 ID와 클라이언트 시크릿을 얻을 수 있어야 합니다. 그것들을 복사해서 환경 변수나 .env 파일에 설정할 수 있습니다. 혹은 다운로드 아이콘을 통해 json 파일을 다운로드할 수도 있습니다.

![이미지](/assets/img/2024-06-20-StatelessAuthenticationIntegratingJWTforGoogleAPIinReactandDjangoRestFrameworkPart1_6.png)

<div class="content-ad"></div>

이제 우리는 프로젝트를 시작할 기본 구조를 설정했습니다. 다음 섹션에서는 Django 백엔드로 시작할 것입니다. 질문이나 제안이 있으면 언제든지 코멘트해 주세요. 읽어주셔서 감사합니다!!!