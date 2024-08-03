---
title: "React를 사용하여 이메일 주소로 폼 제출 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Sending a form submission to an Email address using React"
link: "https://medium.com/@ryandengland/sending-a-form-submission-to-an-email-address-using-react-9578737e4223"
---



저의 개인 웹사이트에 원본이 게시되었습니다. 최근, 저는 타투 아티스트를 위한 웹사이트를 구축하기 위해 계약을 맺었고, 이메일 주소로의 예약 및 일반 문의를 보내는 방법을 어떻게 처리할지 고민하고 있었습니다.

![React를 사용하여 이메일 주소로 양식 제출 보내기](/assets/img/Sending-a-form-submission-to-an-Email-address-using-React_0.png)

최종적으로 선택한 것은 EmailJS라는 서비스였습니다. 이 간단한 서비스를 통해 웹 개발자는 백엔드에서 필요한 구성을 거의 하지 않고도 웹사이트의 프런트엔드에 이메일 전송 기능을 추가할 수 있습니다.

<div class="content-ad"></div>

# 단계 1: 시작하기

가장 먼저 해야 할 일은 EmailJS와 계정을 설정하는 것입니다. 이를 위해 그들의 웹사이트로 이동하여 여러 "가입하기" 버튼 중 하나를 클릭하면 됩니다.

<img src="/assets/img/Sending-a-form-submission-to-an-Email-address-using-React_1.png" />

이메일 주소를 인증하고 로그인한 후에는 EmailJS 대시보드로 이동됩니다. 거기에서 "이메일 템플릿"을 클릭하면 됩니다.

<div class="content-ad"></div>

![React를 사용하여 이메일 주소로 양식 제출 보내기](/assets/img/Sending-a-form-submission-to-an-Email-address-using-React_2.png)

서비스를 테스트하기 시작할 때 200개의 이메일을 이용할 수 있다는 것을 주목하게 될 거야. 이것이 내 직접적인 고려 사항이 아니라는 것 때문에, 내 지갑을 파야 하는 전에 200번의 테스트를 실행할 수 있다는 것을 의미해. 멋지지!

# 단계 2: 이메일 템플릿 생성

프론트엔드 개발자들: 경고해! EmailJS가 제공하는 내장 HTML 편집기를 사용해 이메일 템플릿을 만드는 것이 처음에 직관적일 수 있지만, 보통의 의미론적 HTML보다 이메일 기반 HTML이 가지는 명확하지 않은 제약 때문에 개발하는 데 큰 장애물 중 하나였어.

<div class="content-ad"></div>

내게 있어서 가장 큰 조정 중 하나는 대부분의 이메일 서비스에서 부트스트랩을 네이티브로 지원하지 않는다는 것이었습니다. 이를 염두에 두고, 포매팅에 창의적으로 접근해야 했어요.

내가 원했던 것은 각 이메일 상단에 로고 이미지가 표시되고 그 아래에 제목이 따르는 것이었는데, 두 요소 모두 뷰포트 안에서 가운데 정렬되어야 했어요. 이미지를 일반적인 `img` 요소로 가져와서 제공되는 미리 보기에서 가운데 정렬할 수는 있었지만, 실제로 전송되는 이메일에서는 잘 표현되지 않았어요.

내 해결책은 `div`를 사용하고 배경 이미지 CSS 수정자를 활용하는 것이었어요.

![이미지 이름](/assets/img/Sending-a-form-submission-to-an-Email-address-using-React_3.png)

<div class="content-ad"></div>

100% 너비로 설정하고 고정된 높이를 가지면 이미지가 뷰포트 크기에 관계없이 div 안에 적절히 위치하도록 할 수 있어요.

또 다른 도전 과제는 웹 안전 폰트의 사용이었어요. 웹사이트에 "Colt Soft"라는 폰트가 있어서 Adobe Creative Suite에서 가져왔어요.

일반 HTML로는 이를 가져오는 데 문제가 없어요. HTML 문서의 head에 `link` 요소를 포함하기만 하면 돼요. 그러나 이겮 없이 이메일에서는 그냥 작동하지 않아요.

사실, 이 폰트를 SVG/이미지 파일로 변환하여 코드에 인라인으로 포함시키지 않으면 이를 우회할 방법이 없어요. 이메일을 읽는 사람은 문신 예술가일 것을 고려하면 이 정도는 지나친 것 같았어요.

<div class="content-ad"></div>

## 변수로 EmailJS 템플릿 채우기

EmailJS는 특정 변수가 이름에 따라 어디에 들어가야 하는지를 나타내기 위해 이중 중괄호 { }를 사용하여 Handlebars와 유사하게 작동합니다. 템플릿 미리보기에서는 API 호출에서 나타날 것과 같이 변수 이름을 인라인으로 작성합니다.

<img src="/assets/img/Sending-a-form-submission-to-an-Email-address-using-React_4.png" />

내게 좋아 보여요! 이제 코드에 통합할 시간입니다!

<div class="content-ad"></div>

# 단계 3: 이메일JS를 코드베이스와 연동하기

이제 실제로 쉬운 부분이에요. EmailJS는 자신들의 문서 작업 및 API 설정을 놀라운 수준으로 잘 해냈어요.

실제로 해야 할 일은 두 가지뿐이에요:

- 폼 매개변수를 하나의 JSON 객체로 정리하기

<div class="content-ad"></div>

![Sending a form submission to an Email address using React_5](/assets/img/Sending-a-form-submission-to-an-Email-address-using-React_5.png)

2. 이메일JS에서 요구하는 필수 데이터와 API 호출을 위해 데이터를 올바르게 포맷팅하여 form 매개변수를 포함시킵니다.

![Sending a form submission to an Email address using React_6](/assets/img/Sending-a-form-submission-to-an-Email-address-using-React_6.png)

서비스 ID, 템플릿 ID 및 사용자 ID는 첫 번째 단계를 완료한 후에 제공될 예정입니다.

<div class="content-ad"></div>

이제 남은 일은 양식을 REST API로 전송하는 것뿐이에요! 아래와 같이 구현했어요.

![이미지](/assets/img/Sending-a-form-submission-to-an-Email-address-using-React_7.png)

적절한 오류 처리는 항상 중요해요!

# 마무리 생각

<div class="content-ad"></div>

이메일JS는 모든 웹 개발자가 살펴봐야 할 편리한 도구입니다. 미니멀한 학습 곡선 덕분에 Javascript를 사용하는 과정에서 구현하기 쉬운 서비스 중 하나입니다.

즐거운 코딩 하시길!

-라이언
