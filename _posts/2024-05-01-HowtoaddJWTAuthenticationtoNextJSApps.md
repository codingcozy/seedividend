---
title: "NextJS 앱에 JWT 인증 추가하는 방법(2024년 최신)"
description: ""
coverImage: "/assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_0.png"
date: 2024-05-01 17:56
ogImage:
  url: /assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_0.png
tag: Tech
originalTitle: "How to add JWT Authentication to NextJS Apps"
link: "https://medium.com/gitconnected/how-to-add-jwt-authentication-to-nextjs-apps-a0dc83bd257d"
isUpdated: true
---

![이미지](/assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_0.png)

# 소개

본 문서는 NextJS를 사용하여 인증을 구현하는 방법에 대한 간단한 자습서입니다. 가이드에 들어가기 전에 사용될 기술을 시연하겠습니다:

- JWT 또는 JSON Web Token은 두 당사자 간에 안전하게 클레임을 나타내는 데 사용되는 산업 표준 RFC 7519 방법입니다.
- NextJS 미들웨어: 미들웨어를 사용하면 요청이 완료되기 전에 코드를 실행할 수 있으며, 수신된 요청을 기반으로 응답을 수정하여 리다이렉팅하거나 요청 또는 응답 헤더를 수정하거나 직접 응답하는 등의 작업을 수행할 수 있습니다. 이를 사용하여 우리는 인증을 처리하는 라우팅을 돕겠습니다.
- JWT 인증 서비스: JWT를 사용하여 인증을 지원하는 백엔드 서비스가 필요합니다. NestJS를 사용하여 어떻게 만드는 지에 대한 내 튜토리얼을 확인하거나 다른 기술을 사용하여 직접 만들 수 있습니다.

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

# 레이아웃

먼저 사용자 인터페이스가 필요해요. 이 간단한 레이아웃을 살펴봐요:

![이미지](/assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_1.png)

레이아웃을 보고 루트를 말해줄 수 있어요. 총 3가지 종류의 루트가 있어요:

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

- 공개 경로: 누구나 접근할 수 있는 경로
- 인증 경로: 인증되지 않은 사용자만 접근할 수 있는 경로
- 보호된 경로: 인증된 사용자만 접근할 수 있는 경로

# 인증 서비스

API 로그인을 호출해야 합니다. 따라서 인증 API 호출을 처리하는 서비스가 필요합니다. 이 예제에서는 axios를 사용하여 API 호출을 처리할 것입니다.

![이미지](/assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_2.png)

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

로그인 요청이 성공하면 사용자 이름, accessToken 또는 JWT, 만료 시간을 얻을 수 있습니다.

# 인증 훅

3 가지 간단한 훅이 필요합니다:

- useCurrentUser : 현재 로그인한 사용자 정보를 가져오는 훅
- useLogin : 로그인 방법을 제공하는 훅
- useLogout : 로그아웃 방법을 제공하는 훅

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

저희는 먼저 첫 번째 useLogin으로 들어갈 거에요:

![HowtoaddJWTAuthenticationtoNextJSApps_3](/assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_3.png)

사용자 정보를 쿠키로 저장했죠. 왜 쿠키를 사용했을까요? 나중에 설명할게요.

useLogout:

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

![이미지](/assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_4.png)

로그아웃하려면 쿠키를 지우기만 하면 됩니다.

사용자 현재 사용자

![이미지](/assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_5.png)

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

# 미들웨어

React만 사용하면 모든 라우트에서 인증을 확인하는 것이 꽤 어렵습니다. 그러나 NextJS 미들웨어를 사용하면 매우 쉽게 처리할 수 있습니다.

먼저, 라우트를 확인해 봅시다:

![라우트 이미지](/assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_6.png)

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

이 가이드는 간단한 것이므로, 이렇게 가보겠습니다.

중요한 부분은 미들웨어입니다. NextJS에서 미들웨어는 요청이 완료되기 전에 코드를 실행할 수 있게 해주며, 들어오는 요청을 기반으로 요청이나 응답 헤더를 수정하거나, 리다이렉팅하거나, 요청이나 응답에 직접 응답할 수 있게 해줍니다.

즉, 미들웨어는 프로젝트의 모든 경로에 대해 호출될 것입니다.

미들웨어.ts 파일을 살펴보겠습니다:

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

![이미지](/assets/img/2024-05-01-HowtoaddJWTAuthenticationtoNextJSApps_7.png)

해석:

- 먼저 쿠키에서 현재 사용자를 가져옵니다.
- 다음 경로가 보호된 경로인지 확인한 후, 사용자가 인증되지 않았거나 토큰이 만료되었는지 확인합니다. 사용자를 쿠키에서 삭제하고 /login으로 리디렉트합니다.
- 다음 경로가 인증 경로이지만 사용자가 로그인되어 있는 경우, 사용자를 /profile로 리디렉트합니다.

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

여기서, NextJS에서 인증을 처리하는 간단한 구현이다. 이 글이 유용하게 느껴지길 바라며, 예제 코드가 너무 난해하다면 소스 코드를 여기서 확인해보세요.

# 마지막으로

내 컨텐츠는 누구에게나 무료이지만, 이 글이 도움이 되었다면 여기에서 커피 한 잔 사주시면 감사하겠습니다.
