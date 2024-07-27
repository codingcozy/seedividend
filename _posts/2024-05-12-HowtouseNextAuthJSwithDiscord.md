---
title: "NextAuthJS를 Discord와 함께 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtouseNextAuthJSwithDiscord_0.png"
date: 2024-05-12 20:57
ogImage: 
  url: /assets/img/2024-05-12-HowtouseNextAuthJSwithDiscord_0.png
tag: Tech
originalTitle: "How to use NextAuth.JS with Discord"
link: "https://medium.com/javascript-in-plain-english/how-to-use-nextauth-js-with-discord-d2f274c4c1b4"
---


## Discord API를 사용하여 NextJS에서 NextAuth.JS를 통한 "Discord를 사용한 로그인"을 구현하는 방법을 배워보세요.

<img src="/assets/img/2024-05-12-HowtouseNextAuthJSwithDiscord_0.png" />

최근 대시보드 프로젝트를 작업하던 중에 Discord 사용자들이 애플리케이션에 로그인하고 그들의 서버 중 하나를 수정할 수 있도록 하는 작업을 하게 되었습니다.

이전에 NextJS로 인증을 구현해본 적이 없던 사람으로써 전혀 감이 안 왔습니다. NextAuth, Auth0, Clerk 및 Supabase 사이를 계속 왔다갔다했습니다. 오류가 발생했을 때, 처음 몇 초만에 NextAuth를 포기했습니다.



신입 개발자로 시작하는 것은 어렵습니다. 대부분의 경우, 처음으로 선택한 옵션이 가장 이상적인 경우가 많아요. 저는 모든 것을 시도해보고 결국 NextAuth로 돌아왔어요. 어떻게 구현하는지 알아내고 끝없는 시간을 보냈기 때문에 당신은 그럴 필요가 없어요!

이 글을 통해 우리가 어떻게 인증을 구현할 수 있는지 살펴보도록 하죠.

# NextAuth를 위한 Discord 제공자

NextAuth를 활용하면 Google, Facebook, Apple, Github 등 다양한 서비스를 위한 인증을 설정할 수 있어요. NextAuth는 이러한 서비스와 플랫폼을 제공자(provider)라고 부르죠. 다시 말해, 이러한 제공자는 서비스이며 사용자들은 이를 통해 애플리케이션에 로그인할 수 있어요.



이 기사에서는 Discord Provider를 사용할 것입니다. 다른 공급업체와 달리, Discord는 인증 설정을 위해 추가 구성이 필요합니다. 우리는 먼저 이러한 요구 사항을 정렬해야 합니다.

Discord Developer Portal에서 애플리케이션을 생성하여 Discord API 및 Discord 인프라에 액세스해야 합니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*2IOmhM7_ZtM_Mf8zc6u5Dg.gif)

그런 다음 Client ID와 Client Secret을 가져와야 합니다. 보안 목적을 위해 Client Secret을 재설정해야 합니다.



![이미지](https://miro.medium.com/v2/resize:fit:1200/1*fXb5ABTdet-g_6FIqRwUpA.gif)

필요한 자격 증명을 획득한 후 다음 단계로 진행할 수 있습니다. 관련 정보를 얻을 수 없는 경우, 선택한 브라우저에서 기본 검색을 수행하고 누군가가 안내해 줄 것입니다.

## NextJS 앱 초기화

이미 하지 않았다면 NextJS 애플리케이션을 설정해야 합니다. 다음 명령어를 터미널에서 사용하여 NextJS 애플리케이션을 초기화하고 단계를 따르세요.



```js
npx create-next-app@latest
```

데모를 위해 프론트 엔드에서 인증 기능을 보여주기 위해 TypeScript보다는 JavaScript를 선택했어요 (화 angry지 마세요) 그리고 API 라우트를 용이하게 하기 위해 최신 App Router를 사용하고 전반적으로 더 나은 경험을 위해 TailwindCSS를 사용했어요.

또한, src/ 구성을 선택하지 않았어요. 우리는 모든 것을 app/ 디렉토리 안에서 할 거예요. 그러나 당신의 어플리케이션에 맞춰 동일한 단계를 따르고 코드 스니펫을 조정할 수 있어요.

## NextAuth 설치하기



프로젝트에 NextAuth를 설치하려면 다음 명령을 사용해야 합니다.

```js
npm install next-auth
```

설치가 완료되면 권한 부여와 관련된 다양한 요청을 처리하기 위한 새로운 API route를 생성해야 합니다. 먼저 app/ 디렉토리 안에 api/라는 폴더를 만듭니다.

그런 다음 api/ 디렉토리 내에 nested 폴더를 만들어 auth/로 이름 지어주세요. 마지막으로 auth/ 디렉토리 내에 […nextauth]라는 디렉토리를 만듭니다. NextAuth는 이 디렉토리 구조를 엄격히 요구하므로 이러한 작업이 마법처럼 이루어질 것입니다.



들어오는 요청을 처리하기 위해 app/api/auth/[...nextauth]/route.js 경로에 route.js 파일을 생성하세요. 이 파일은 동적 경로 핸들러입니다.

![이미지](/assets/img/2024-05-12-HowtouseNextAuthJSwithDiscord_1.png)

## NextAuth를 위한 API Route 생성

이 동적 경로 핸들러는 NextAuth 구성을 저장하고 NextAuth와 관련된 들어오는 요청을 처리할 것입니다.



먼저 라우트 핸들러 파일에 NextAuth를 가져와보세요. 그런 다음 NextAuth에서 Discord Provider를 가져와주세요. 이 두 항목을 가져온 후, NextAuth를 구성하기 시작하겠습니다.

```js
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";
```

이제 클라이언트 ID와 클라이언트 시크릿이 필요합니다. 준비해두세요. 이제 AuthOptions라는 객체를 만들 것입니다. 이 객체는 인증에 필요한 값들을 가진 객체입니다. 기억해주세요, 객체를 초기화할 때 export 키워드를 사용해야 합니다.

이 객체를 사용하여 서버 컴포넌트에서 현재 세션에 액세스할 것입니다. 그런데, 세션은 서버 기반이며 DB와는 무관합니다.



여기 파일이 보이는 모양입니다.

```js
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

export const AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: "클라이언트_시크릿",
      clientSecret: "클라이언트_시크릿",
    }),
  ],
};
```

이제 NextAuth 함수를 사용하여 인증을 초기화해야 합니다. 이 함수는 AuthOptions와 해당 속성을 매개변수로 필요로 합니다. 따라서 AuthOptions 객체를 매개변수로 전달할 것입니다.

```js
const handler = NextAuth(AuthOptions);
```



NextAuth와 구성 옵션을 성공적으로 통합했습니다. 하지만, 더 있습니다. 누군가가 계정에 Discord를 사용하여 로그인하는 경우, Discord가 애플리케이션이 처리하고 로그인한 사용자의 계정에 액세스하기 위한 코드를 생성합니다.

이 고유 코드를 사용하여 직렬화된 토큰을 얻을 수 있습니다. 토큰은 로그인한 사용자를 나타내는 문자열의 일련 번호이며 Discord API에 액세스할 수 있는 열쇠 역할을 합니다. 우리는 봇의 토큰 또는 유효한 Discord 사용자의 토큰이 있을 때만 Discord API에 액세스할 수 있습니다.

해당 고유 코드가 어디에 있는지 궁금해하는 분들도 있을 것입니다. Discord는 사용자가 로그인에 성공한 후 애플리케이션이 사용자를 리디렉션하는 URL에 넣습니다. 다음은 NextAuth가 어떻게 도와주는지에 대한 설명입니다.



우리가 사용자 정의 리디렉션 URL을 대신 사용하는 대신 NextAuth의 도움을 받을 것입니다. Discord 개발자 포털에서 선택한 애플리케이션의 OAuth 섹션에 다음과 같은 리디렉션 URL을 삽입할 것이며, 이 URL은 사용자가 로그인에 성공한 후 NextAuth의 라우트 핸들러로 사용자를 리디렉션할 것입니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*deLjJ2UZeiuCS8AcNZzm9A.gif)

리디렉션 URL은 이전에 로컬로 저장된 애플리케이션에서 미리 만든 동적 라우트 핸들러의 경로입니다. 프로덕션 빌드에서는 localhost:3000을 여러분의 도메인 이름이나 VPS IP로 바꿔야 합니다.

사용자가 로그인하면 NextAuth의 라우트 핸들링 시스템으로 리디렉션되며, NextAuth가 즉시 코드를 토큰으로 교환하고 저장합니다.



## NextAuth 콜백

유저가 로그인하면 다른 페이지로 리디렉션되기를 원합니다. 기본 NextAuth 페이지에 머무르지 않도록 하거나 기본적으로 루트 디렉토리(홈페이지)로 리디렉션되지 않도록 하고 싶습니다. 따라서 NextAuth에서 리디렉션을 처리하기 위해 콜백을 사용할 것입니다.

NextAuth는 개발자가 고유한 사용 사례에 맞게 구성할 수 있는 콜백을 제공합니다. 특정 이벤트가 트리거될 때마다 NextAuth 콜백이 호출됩니다. 예를 들어, signIn() 콜백은 유저가 로그인했을 때 실행됩니다.

우리의 경우, redirect() 콜백을 재정의할 것입니다. 이 콜백은 두 개의 매개변수를 가져야 하지만, 우리는 일반적으로 루트 디렉토리의 URL(localhost:3000/)을 필요로 합니다.



```js
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

export const AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: "YOUR_CLIENT_ID",
      clientSecret:
        "YOUR_CLIENT_SECRET",
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },
};

const handler = NextAuth(AuthOptions);
```

또한 route 핸들러에서 NextAuth() 함수를 호출한 결과를 내보내야 합니다. 그렇지 않으면 세션에 액세스하거나 처리할 GET 및 POST 요청이 작동하지 않습니다.

다음은 route.js 파일이어야 합니다. /dashboard를 원하는 경로로 바꿀 수 있습니다.

```js
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

export const AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: "YOUR_CLIENT_ID",
      clientSecret:
        "YOUR_CLIENT_SECRET",
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
```



# 디스코드 권한

기본적으로 로그인한 사용자의 사용자 이름과 이메일에만 액세스할 수 있습니다. 더 많은 정보에 액세스하려면 디스코드 API 및 엔드포인트를 사용해 볼 수 있지만, 디스코드는 접근을 거부할 것입니다. 이는 디스코드가 개인 정보 보호와 보안을 강화하기 때문입니다.

더 많은 정보에 액세스하려면 사용자의 권한이 필요합니다. 사용자가 로그인을 시도할 때 그들로부터 권한을 얻을 수 있습니다. 주목했을 것인데, 디스코드는 사용자가 로그인 시도할 때 응용 프로그램에 부여하는 권한을 나열합니다.

![이미지](/assets/img/2024-05-12-HowtouseNextAuthJSwithDiscord_2.png)



만약 무작위로 보였다면, 그것은 오산이었습니다. 개발자는 이러한 권한을 요청하며, 사용자들은 보통 그것을 무시합니다. 우리는 권한을 요청하기 위해 그것들을 권한 URL에 추가함으로써 실현할 수 있습니다. route.js 파일로 돌아가는 시간입니다.

DiscordProvider 함수 안에, authorization이라는 또 다른 속성을 추가해야 합니다. 이 속성의 값은 애플리케이션 요구 사항에 따라 다를 것입니다. 이전에 말한대로, 저는 로그인한 사용자의 길드에 액세스하고 그것들을 표시하려고 합니다.

그러므로, 저는 해당 권한을 요청하고 몇 가지 다른 것들도 포함할 것입니다. Discord 개발자 포털에서 그것들을 찾을 수 있습니다.

![이미지](/assets/img/2024-05-12-HowtouseNextAuthJSwithDiscord_3.png)



페이지 URL 쿼리 매개변수에서 모든 권한 이름이 ' + ' 기호를 사용하여 연결될 것입니다.

```js
providers: [
    DiscordProvider({
      clientId: "YOUR_CLIENT_ID",
      clientSecret:
        "YOUR_CLIENT_SECRET",
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+guilds",
    }),
],
```

이제 프론트 엔드를 구성하여 로그인 프로세스를 시작해 보겠습니다.

# 프론트 엔드 구성하기



새로운 애플리케이션을 시작했기 때문에 루트 디렉토리에서 수정을 할 것입니다. 만약 로그인 버튼을 다른 곳에 넣고 싶다면 그렇게 할 수 있어요. 단계 자체는 동일해요.

루트 디렉토리에 LoginUsingDiscord.jsx라는 클라이언트 컴포넌트를 만들어서 onClick 이벤트를 처리할 거에요. 주요 페이지.js 파일은 여전히 기본 서버 컴포넌트 모드로 유지될 거에요.

컴포넌트 내부에서는 "next-auth/react"에서 signIn() 함수를 import하여 "Login" 버튼을 클릭했을 때 호출할 거에요. signIn() 함수에는 하나의 매개변수를 전달할 수 있어요. 바로 클릭했을 때 호출될 로그인 버튼이 표현하는 프로바이더의 이름이에요.

```js
"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginUsingDiscord() {
  return (
    <section className="flex gap-8 items-center justify-center mt-12">
      <p className="font-bold text-lg">Discord를 사용하여 로그인</p>
      <button
        onClick={() => signIn("discord")}
        className="text-base py-3 px-4 bg-[#5865F2]"
      >
        로그인
      </button>
    </section>
  );
}
```



그것이에요. 버튼을 클릭하면 Discord 로그인 화면으로 리디렉션됩니다. 토큰의 직렬화가 완료되면 redirect() 콜백에서 선택한 URL로 이동합니다. 제 경우에는 /dashboard로 이동했어요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*6VWH3jSGprzfSPkHbafQfA.gif)

성공적으로 로그인한 후에는 localhost:3000/api/auth/session에서 세션에 액세스할 수 있어요. 이 세션은 기본적으로 사용자 이름과 이메일만 포함하고 있어요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*L3cZJJjMjQNvcKrWFXPAFw.gif)



route.js 파일 내에서 signIn()이라는 다른 콜백 함수를 덮어쓸 것입니다. 보안을 위해 토큰은 NextAuth의 범위 내에서만 접근할 수 있습니다.

```js
async signIn({ account }) {
  const discordToken = account.access_token;

  return true;
},
```

signIn() 콜백은 사용자, 계정, 자격증명 등 다른 값들을 매개변수로 제공합니다. 우리는 access token을 검색하기 위해 account 매개변수만 필요합니다.

대시보드 프로젝트에서 토큰을 해싱한 후 DB에 저장했습니다. 그러나 이곳에서는 그렇게 하지 않을 것입니다. 토큰을 사용하여 사용자에 대한 정보에 액세스하고 간소화를 위해 콘솔에 출력하려고 합니다.



디스코드 API를 라우트나 서버 구성요소에서 사용하려면 토큰을 어딘가에 저장해야 합니다. 디스코드 API로의 모든 요청에는 디스코드 사용자 토큰이 필요합니다. 이 기사를 복잡하게 만들 수 없기 때문에 토큰을 어디에도 저장하지 않고 가져온 데이터를 콘솔에 표시할 것입니다.

토큰을 어디에도 저장하지 않으므로 route.js 파일 외부에서 사용할 수 없습니다. 따라서 signIn() 콜백 내에서 디스코드 API에 대한 API 요청을 만들고 동작하는 방법을 보여드리겠습니다.

# 디스코드 API 사용하기

signIn() 콜백을 계속 수정해보겠습니다. 사용자에 대한 정보를 가져와 콘솔에 출력하여 간단하게 표시하겠습니다. 이러한 API 요청의 엔드포인트는 디스코드 문서에 나와 있습니다.



Discord에서 제공하는 api/users/@me 엔드포인트로 GET 요청을 보내고, 로그인한 사용자의 정보가 포함된 객체를 받아오고 있어요. 사용자가 로그인했는지에 대해서는 중요하지 않아요. 각 액세스 토큰은 고유한 사용자를 나타내요.

토큰은 매달 만료되며 갱신이 필요해요. 저는 사용자의 토큰을 사용할 때마다 그들을 대신해서 API 요청을 보내고 있어요. Discord는 저를 중재자로 취급해요.

```js
async signIn({ account }) {
   const discordToken = account.access_token;

   const discordUser = await fetch(`https://discord.com/api/users/@me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${discordToken}`,
      },
    }).then((res) => res.json());
  
    console.log(discordUser);

    return true;
},
```

액세스 토큰을 header의 Authorization 속성에 전달하면, 모든 것을 올바르게 수행했다면 API 엔드포인트로부터 응답을 받을 수 있어요.



![Screenshot](/assets/img/2024-05-12-HowtouseNextAuthJSwithDiscord_4.png)

결국 LoginUsingDiscord 구성 요소 내에 로그아웃 버튼을 추가했어요. signOut() 함수를 사용했어요. 이 함수는 매개변수 없이 작동합니다. 왜냐하면 하나의 서비스만 활성 세션을 가질 수 있거든요. 여기에 코드가 있어요.

```js
<button
  onClick={() => signOut()} className="text-base py-3 px-4 bg-[#ED4245]">
  Sign Out
</button>
```

# 결론



대부분의 애플리케이션에서 인증 구현은 어려운 작업입니다. NextAuth를 사용하면 이 작업을 더 쉽게 할 수 있습니다. 세션을 만드는 방법, 사용자가 Discord를 사용해 로그인할 수 있도록 하는 방법, 토큰을 사용해 Discord API에 API 요청을 보내는 방법 등을 배웠습니다.

마찬가지로 Google과 같은 다른 제공업체를 사용할 수도 있습니다. 이 글이 도움이 되었기를 바랍니다. 소프트웨어 엔지니어로 취직하고 싶다면 대기 목록에 가입하는 것을 권장합니다.

질문이 있다면 director@afankhan.com 이나 다른 곳에서 @whyafan 으로 연락해 주세요.

# 평문으로 🚀



플레인 영어 커뮤니티에 참여해 주셔서 감사합니다! 다음에 가시기 전에:

- 작가를 추천하고 팔로우하기 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요