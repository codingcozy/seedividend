---
title: "Django Rest FrameworkDFR를 사용하여 Mpesa STK 푸시 및 CallbackView 구현하기"
description: ""
coverImage: "/assets/img/2024-06-19-ImplementingMpesaSTKpushandCallbackViewusingDjangoRestFrameworkDFR_0.png"
date: 2024-06-19 23:36
ogImage: 
  url: /assets/img/2024-06-19-ImplementingMpesaSTKpushandCallbackViewusingDjangoRestFrameworkDFR_0.png
tag: Tech
originalTitle: "Implementing Mpesa STK push and CallbackView using Django Rest Framework(DFR)"
link: "https://medium.com/@gabrielngeti4/implementing-mpesa-stk-push-and-callbackview-using-django-rest-framework-dfr-fc42bf0474df"
isUpdated: true
---




![이미지](/assets/img/2024-06-19-ImplementingMpesaSTKpushandCallbackViewusingDjangoRestFrameworkDFR_0.png)

Mpesa와 Safaricom은 네트워킹 분야에서 경쟁사들을 능가하는 뛰어난 위치에 있습니다. Mpesa의 주요 목표는 사용자들이 편리하게 거래할 방법을 마련하는 것이었습니다. 기술의 발전으로, 사용자들이 금전 거래를 수행해야 하는 많은 웹 및 모바일 애플리케이션 내에서 사용될 API를 만들 필요가 있었습니다.

MPESA STK PUSH

대부분의 사람들은 대부분 시간에 핸드폰을 가지고 있기 때문에 핸드폰으로 결제하는 것이 합리적일 것입니다. Mpesa 팀은 라이브 및 샌드박스 API를 소개했습니다. mpesa stk push를 사용하려면 액세스 토큰을 생성해야 합니다. 액세스 토큰은 응용 프로그램이 mpesa api를 사용할 수 있는 시간대를 제공하는 코드입니다. 액세스 토큰 생성을 구현하려면 Daraja 계정이 필요합니다. 그런 다음 홈 뷰의 내 애플리케이션 섹션으로 이동하여 앱을 만듭니다. 앱이 생성되면 다음이 생성됩니다:

<div class="content-ad"></div>

<img src="/assets/img/2024-06-19-ImplementingMpesaSTKpushandCallbackViewusingDjangoRestFrameworkDFR_1.png" />

여기에 필요한 모든 세부 정보를 제공합니다. 각 앱은 특정 조직을 위해 구축되었기 때문에 거기에 나와 있는 일부 자격 증명은 실제로 필요하지 않을 수 있습니다.

이제 여러분의 views 파일에 액세스 생성 기능을 구현합니다. 참고로, 이 가이드는 여러분이 django와 그 구조를 충분히 숙지하고 있다고 가정합니다. 그러나 보안을 위해, 'pip install python-decouple'을 사용하여 python decouple을 설치하는 것을 강력히 권장합니다. 이는 매개변수를 재배포하지 않고 변경할 수 있도록 설정을 구성하는 데 도움이 됩니다. 다음은 django에서 해당 기능을 구현하는 방법입니다:

<img src="/assets/img/2024-06-19-ImplementingMpesaSTKpushandCallbackViewusingDjangoRestFrameworkDFR_2.png" />

<div class="content-ad"></div>

실제로 사용자 키와 시크릿은 보안상의 이유로 소스에 노출되어서는 안 되지만 별도의 .env 파일에 넣어야 합니다. 이는 구성에서 사용자 키와 시크릿을 검색하여 콜론 구분자로 연결한 후 결과를 Base64로 인코딩하고 인코딩된 값으로 HTTP 인증 헤더를 구성합니다. 그런 다음 지정된 API URL로 Authorization 헤더 및 JSON Content-Type 헤더와 함께 GET 요청을 보냅니다. JSON 형식으로 예상되는 API 응답은 "access_token" 값을 추출하여 함수에서 반환됩니다. 액세스 토큰은 mpesa stk push 함수에서 사용될 것입니다.

![image](/assets/img/2024-06-19-ImplementingMpesaSTKpushandCallbackViewusingDjangoRestFrameworkDFR_3.png)

알겠어요, 앞에서 언급한 대로 Safaricom에서 생성한 키는 기밀이며 소스 코드에 노출되어서는 안 됩니다. 함수에서 모든 거래에 타임 스탬프를 첨부하기 위해 날짜 형식이 필요하며 위에서 보여준 형식을 따라야 합니다. 그런 다음 위 함수로부터 받은 액세스 토큰을 사용합니다. 그런 다음 mpesa 비밀번호가 필요하며 이 비밀번호는 mpesa 숏코드, mpesa 패스키, 그리고 형식 지정된 날짜를 문자열로 변환하여 비밀번호를 인코딩하는 공식이 필요합니다. 그런 다음 수신한 데이터를 사용하는 페이로드를 구성하고 이 경우에는 전화번호와 금액입니다. 그런 다음 거래가 성공적인지 여부에 대한 JSON 응답을 받습니다.

MPESA CALLBACK VIEW

<div class="content-ad"></div>

mpesa stk 페이로드에서는 모든 stk 푸시 트랜잭션 결과가 전송되는 안전한 콜백URL을 포함해야 합니다. 이를 통해 트랜잭션을 추적할 수 있습니다.

![이미지](/assets/img/2024-06-19-ImplementingMpesaSTKpushandCallbackViewusingDjangoRestFrameworkDFR_4.png)

동그라미가 그려진 선은 생성된 모델을 나타냅니다. 모든 거래, 실패한 것도 포함하여 mpesa에서 콜백 URL로 수신된 모든 거래가 거기에 저장됩니다. mpesa에서 수신한 본문은 daraja 웹사이트에서 찾을 수 있는 구조가 있는 딕셔너리입니다. 상태 코드가 200인 응답은 성공적으로 간주되어 SuccessfulResponses 모델에 저장됩니다. POST 메서드를 사용하여 콜백 URL이 데이터를 저장하는 기능에 액세스할 수 있으며, GET 메서드는 모델의 모든 트랜잭션을 볼 수 있는 용도로 사용됩니다. 이 경우 직렬화기를 사용하여 파이썬 객체를 JSON으로 변환합니다. 모든 변환 복잡성은 정의해야 하는 직렬화기에 의해 처리됩니다. 다음은 예시입니다:

![이미지](/assets/img/2024-06-19-ImplementingMpesaSTKpushandCallbackViewusingDjangoRestFrameworkDFR_5.png)

<div class="content-ad"></div>

이 시리얼라이저는 데이터베이스의 AllResponses 모델의 모든 레코드를 변환합니다.

요약하자면, 이것은 stk push를 통한 mpesa 거래의 전체 흐름입니다. 데이터의 전체 흐름을 설명할 때 비 기술용어를 사용하지 않으려 노력했지만, 이는 기본적인 장고 패러다임을 전제로 한 것입니다.

즐겁게 코딩하세요.