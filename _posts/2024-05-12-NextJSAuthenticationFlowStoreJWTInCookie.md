---
title: "NextJS 인증 플로우  JWT를 쿠키에 저장하기"
description: ""
coverImage: "/assets/img/2024-05-12-NextJSAuthenticationFlowStoreJWTInCookie_0.png"
date: 2024-05-12 20:04
ogImage: 
  url: /assets/img/2024-05-12-NextJSAuthenticationFlowStoreJWTInCookie_0.png
tag: Tech
originalTitle: "NextJS Authentication Flow — Store JWT In Cookie"
link: "https://medium.com/javascript-in-plain-english/nextjs-authentication-flow-store-jwt-in-cookie-fa6e6c8c0dca"
isUpdated: true
---




나는 NextJS 앱 라우터를 프론트엔드로, NestJS를 백엔드로 활용한 사이드 프로젝트에 참여하고 있어. JWT와 쿠키를 사용해서 장기간에 걸쳐 인증 플로우를 구축 중이야. 여기에서는 내가 사용 중인 인증 플로우를 공유할 거야.

# 왜 LocalStorage나 SessionStorage 대신 쿠키를 사용하나요?

LocalStorage/SessionStorage에 저장된 항목은 JavaScript에서 읽을 수 있어 XSS 공격에 취약할 수 있어. 그래서 나는 JavaScript에서 접근할 수 없는 HttpOnly 쿠키를 사용해 액세스 토큰을 저장하기로 결정했어. 즉, 공격자들은 쿠키에서 액세스 토큰을 읽을 수 없다는 뜻이야.

# 인증 플로우




![이미지](/assets/img/2024-05-12-NextJSAuthenticationFlowStoreJWTInCookie_0.png)

![이미지](/assets/img/2024-05-12-NextJSAuthenticationFlowStoreJWTInCookie_1.png)

# 로그인

## NextJS



로그인 라우트 핸들러를 실행하세요.

LoginButton.tsx

```js
    const loginRes = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(YOUR_LOGIN_CREDENTIAL),
    });
```

## NextJS 라우트 핸들러



여기가 엑세스 토큰을 설정해야 하는 곳입니다.

app/api/login/route.ts

```js
...
export async function POST(request: NextRequest) {
  const loginRes = await axios.post(
    "MY_BACKEND_URL/api/login",
    {...}
  );

  cookies().set("accessToken", loginRes.data.accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    sameSite: "strict"
  });
  
  return NextResponse.json(loginRes.data, { status: 201 });
}
```

## Axios



쿠키가 SameSite=Strict로 설정되어 있으면, 다른 도메인에서 요청이 발생했을 때 서버로 자동으로 전송되지 않습니다. 백엔드로 보낼 때 jwt를 수동으로 쿠키로 설정하고 싶을 수 있습니다. 그렇지 않으면 백엔드는 쿠키가 어디에 있는지 모릅니다. 따라서, Axios 인터셉터를 사용하여 요청 헤더에 쿠키를 첨부합니다.

```js
import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? "";
};

instance.interceptors.request.use(async function (config) {
  const accessToken = await getCookie("accessToken");
  // 인증에서 쿠키를 설정할 수 있습니다
  // 백엔드에서 accessToken을 읽으려면 어떻게 하고 싶은지에 따라 다릅니다
  config.headers.Cookie = `accessToken=${accessToken}`;
  return config;
});
```

## NestJS

JWT를 생성하고 API 응답에 포함시켜 반환합니다.



```js
...
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async login(token: string) {
    try {
      ...
      const userPayload = {
        sub: sub,
        username: name,
        email: email,
        _id: user._id,
      };
      const accessToken = await this.jwtService.signAsync(userPayload);

      return { accessToken };
    } catch (e) {
      console.log(e);
    }
  }
}
```

# 로그아웃

## NextJS




로그아웃 라우트 핸들러를 실행합니다

```js
  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
  };
```

## NextJS 라우트 핸들러

쿠키를 삭제합니다.



```js
...
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  cookies().delete("accessToken");
  return NextResponse.json({ status: 201 });
}
```

# 결론

프로젝트에 대한 최종 인증 흐름이 아마 이것은 아닐 것입니다. 여전히 더 나은 구현 방법(예: Refresh Token 흐름 구현 등)을 찾고 있습니다. 읽어 주셔서 감사합니다.

# 간단하게 설명하면 🚀



In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수로 응원하고 팔로우해주세요 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠 확인해보세요