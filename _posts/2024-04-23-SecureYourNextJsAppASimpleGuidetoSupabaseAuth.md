---
title: "NextJs 앱을 안전하게 유지하세요 Supabase Auth에 대한 간단한 가이드"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Secure Your NextJs App A Simple Guide to Supabase Auth"
link: "https://medium.com/@whateverittech/secure-your-nextjs-app-a-simple-guide-to-supabase-auth-4e69cf9ecf99"
isUpdated: true
---





## NextJs 14 앱 라우터에서 Supabase Auth를 사용하는 단계별 가이드

이 게시물에서는 서버 측 렌더링(SSR)을 통해 Next.js 14 앱 라우터에 Supabase Auth를 원활하게 통합하는 방법을 단계별로 안내합니다. 이 프로세스를 통해 Next.js 애플리케이션의 인증 기능을 강화하는 것이 쉬워질 것입니다.

# 필수 요건:

- Next 14
- TailwindCSS
- Supabase Auth

<div class="content-ad"></div>

# 설치:

다음 명령을 실행하여 이 사전 조건을 설치하세요

```js
// NEXTJS 14
npx create-next-app@latest

// SUPABASE AUTH
npm install @supabase/supabase-js @supabase/ssr
```

# 단계 1: UI 구성

<div class="content-ad"></div>

설치가 완료되면 로그인, 가입, 오류 및 환영 페이지를 만들어보세요.

1. 로그인/가입 페이지 만들기

- `/app/login/page.tsx` 파일을 생성하세요.
- 파일 안에 `SupabaseLogo/` 컴포넌트가 있어야 합니다. 이 컴포넌트는 Supabase 로고를 포함한 SVG 파일을 가지고 있습니다.
- 로그인 폼을 위한 `Button/`, `Input/`, `Separator/`, `Label/` 등이 있는 스타일링된 tailwind 컴포넌트가 있어야 합니다.

```js
import React from "react";
import SupabaseLogo from "@/components/logo-supabase";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white/10 rounded-md p-6 border border-white/5 w-[300px]">
        <div className="flex justify-center mb-6 mt-2">
          <SupabaseLogo />
        </div>

        <form className="flex flex-col gap-2">
          <Label htmlFor="email">이메일:</Label>
          <Input id="email" name="email" type="email" required />
          <Label htmlFor="password">비밀번호:</Label>
          <Input id="password" name="password" type="password" required />
          <Separator />
          <Button>로그인</Button>
          <Button>가입하기</Button>
        </form>
      </div>
    </main>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="rounded hover:bg-white hover:text-black font-semibold px-4 py-2 border border-white/20 transition duration-100 ease-in-out"
      {...rest}
    >
      {children}
    </button>
  );
};

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input
      className="rounded px-4 py-2 text-white outline-none bg-black/30 border border-white/10 focus:bg-white focus:text-black"
      {...rest}
    />
  );
};

const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
  return (
    <label {...rest} className="text-sm text-white/30">
      {children}
    </label>
  );
};

const Separator = () => <hr className="border-white/10 my-2" />;
```

<div class="content-ad"></div>

- SupabaseLogo 컴포넌트용 /components/logo-supabase.tsx 파일을 생성하세요.

```js
export default function SupabaseLogo() {
  return (
    <svg width="150" viewBox="0 0 581 113" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M151.397 66.7608C151.996 72.3621 157.091 81.9642 171.877 81.9642C184.764 81.9642 190.959 73.7624 190.959 65.7607C190.959 58.559 186.063 52.6577 176.373 50.6571L169.379 49.1569C166.682 48.6568 164.884 47.1565 164.884 44.7559C164.884 41.9552 167.681 39.8549 171.178 39.8549C176.772 39.8549 178.87 43.5556 179.27 46.4564L190.359 43.9558C189.76 38.6546 185.064 29.7527 171.078 29.7527C160.488 29.7527 152.696 37.0543 152.696 45.8561C152.696 52.7576 156.991 58.4591 166.482 60.5594L172.976 62.0598C176.772 62.8599 178.271 64.6605 178.271 66.8609C178.271 69.4615 176.173 71.762 171.777 71.762C165.983 71.762 163.085 68.1611 162.786 64.2602L151.397 66.7608Z" fill="white" />
      <path d="M233.421 80.4639H246.109C245.909 78.7635 245.609 75.3628 245.609 71.5618V31.2529H232.321V59.8592C232.321 65.5606 228.925 69.5614 223.031 69.5614C216.837 69.5614 214.039 65.1604 214.039 59.6592V31.2529H200.752V62.3599C200.752 73.0622 207.545 81.7642 219.434 81.7642C224.628 81.7642 230.325 79.7638 233.022 75.1627C233.022 77.1631 233.221 79.4636 233.421 80.4639Z" fill="white" />
      <path d="M273.076 99.4682V75.663C275.473 78.9636 280.469 81.6644 287.263 81.6644C301.149 81.6644 310.439 70.6617 310.439 55.7584C310.439 41.1553 302.148 30.1528 287.762 30.1528C280.37 30.1528 274.875 33.4534 272.677 37.2544V31.253H259.79V99.4682H273.076ZM297.352 55.8585C297.352 64.6606 291.958 69.7616 285.164 69.7616C278.372 69.7616 272.877 64.5605 272.877 55.8585C272.877 47.1566 278.372 42.0554 285.164 42.0554C291.958 42.0554 297.352 47.1566 297.352 55.8585Z" fill="white" />
      <path d="M317.964 67.0609C317.964 74.7627 324.357 81.8643 334.848 81.8643C342.139 81.8643 346.835 78.4634 349.332 74.5625C349.332 76.463 349.532 79.1635 349.832 80.4639H362.02C361.72 78.7635 361.422 75.2627 361.422 72.6622V48.4567C361.422 38.5545 355.627 29.7527 340.043 29.7527C326.855 29.7527 319.761 38.2544 318.963 45.9562L330.751 48.4567C331.151 44.1558 334.348 40.455 340.141 40.455C345.737 40.455 348.434 43.3556 348.434 46.8564C348.434 48.5568 347.536 49.9572 344.738 50.3572L332.65 52.1576C324.458 53.3579 317.964 58.2589 317.964 67.0609ZM337.644 71.962C333.349 71.962 331.25 69.1614 331.25 66.2608C331.25 62.4599 333.947 60.5594 337.345 60.0594L348.434 58.359V60.5594C348.434 69.2615 343.239 71.962 337.644 71.962Z" fill="white" />
      <path d="M387.703 80.4641V74.4627C390.299 78.6637 395.494 81.6644 402.288 81.6644C416.276 81.6644 425.467 70.5618 425.467 55.6585C425.467 41.0552 417.174 29.9528 402.788 29.9528C395.494 29.9528 390.1 33.1535 387.902 36.6541V8.04785H374.815V80.4641H387.703ZM412.178 55.7584C412.178 64.7605 406.784 69.7616 399.99 69.7616C393.297 69.7616 387.703 64.6606 387.703 55.7584C387.703 46.7564 393.297 41.8554 399.99 41.8554C406.784 41.8554 412.178 46.7564 412.178 55.7584Z" fill="white" />
      <path d="M432.99 67.0609C432.99 74.7627 439.383 81.8643 449.873 81.8643C457.165 81.8643 461.862 78.4634 464.358 74.5625C464.358 76.463 464.559 79.1635 464.858 80.4639H477.046C476.748 78.7635 476.448 75.2627 476.448 72.6622V48.4567C476.448 38.5545 470.653 29.7527 455.068 29.7527C441.881 29.7527 434.788 38.2544 433.989 45.9562L445.776 48.4567C446.177 44.1558 449.374 40.455 455.167 40.455C460.763 40.455 463.46 43.3556 463.46 46.8564C463.46 48.5568 462.561 49.9572 459.763 50.3572L447.676 52.1576C439.484 53.3579 432.99 58.2589 432.99 67.0609ZM452.671 71.962C448.375 71.962 446.276 69.1614 446.276 66.2608C446.276 62.4599 448.973 60.5594 452.371 60.0594L463.46 58.359V60.5594C463.46 69.2615 458.265 71.962 452.671 71.962Z" fill="white" />
      <path d="M485.645 66.7608
```

<div class="content-ad"></div>

```js
export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      죄송합니다, 문제가 발생했습니다.
    </main>
  );
}
```

3. 환영 페이지 만들기

이 페이지는 사용자를 환영하는 페이지입니다. 사용자가 인증되었다면 사용자의 이메일이 표시될 것입니다. 이 페이지를 만들려면 /app/page.tsx 파일을 업데이트하고 다음 코드를 따라하세요.

```js
import Link from "next/link";
import React from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          환영합니다, <strong>게스트</strong>님!
        </div>

        <div className="flex gap-2 text-sm mt-1">
          <LinkButton href="/login">로그인</LinkButton>
        </div>
      </div>
    </main>
  );
}

const LinkButton = ({
  href,
  children,
}: {
  href: string,
  children: React.ReactNode,
}) => {
  return (
    <Link
      href={href}
      className="text-white/30 hover:text-white transition duration-100 ease-in-out"
    >
      {children}
    </Link>
  );
};
```

<div class="content-ad"></div>

# 단계 2: 클라이언트 Supabase 생성하기

다음 단계에는 Supabase의 클라이언트를 생성하게 됩니다. Supabase에서 로그인, 가입 등의 기능을 사용할 수 있게 될 것입니다.

1. 환경 설정

- 새로운 Supabase 계정 생성
- 새 프로젝트 생성
- 프로젝트 설정 열기 - API 섹션
- 루트 폴더에 .env.local 파일 생성
- URL 및 Anon/Public Key 값을 .env.local로 복사하세요

<div class="content-ad"></div>

```js
NEXT_PUBLIC_SUPABASE_URL=<당신의_수파베이스_프로젝트_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<당신의_수파베이스_익명_키>
```

2. 클라이언트 측 Supabase 클라이언트 생성

- /utils/supabase/client.ts에 새 파일을 만들고 다음 코드를 따르세요

```js
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

<div class="content-ad"></div>

3. 서버 측 Supabase 클라이언트 생성

- /utils/supabase/server.ts에 새 파일을 생성합니다.

```js
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {}
        },
      },
    }
  )
}
```

4. 미들웨어 생성

<div class="content-ad"></div>

이 미들웨어는 getUser() 함수를 사용하여 인증 토큰을 새로 고칩니다. 루트 폴더에 middleware.ts 라는 새 파일을 만들고 다음 코드를 따라하거나 복사하세요.

```js
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

# 단계 3: Supabase 통합

Supabase를 위한 기능을 생성한 후에는 해당 유틸 함수를 로그인/가입 및 환영 페이지와 통합할 수 있습니다.

<div class="content-ad"></div>

1. 로그인/가입 동작

- /app/login/action.ts에 새 파일을 만들고 다음 코드를 따르세요.

```js
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/auth/notification')
}
```

2. 로그인 페이지와 통합하기

<div class="content-ad"></div>

- 로그인 페이지의 기능 로그인 및 가입 기능을 /app/login/page.tsx에 가져오세요

```js
...
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <main className="...">
      <div className="...">
        <div className="...">...</div>

        <form className='...'>
          ...
          <Button formAction={login}>로그인</Button>
          <Button formAction={signup}>가입하기</Button>
        </form>
      </div>
    </main>
  )
}
```

3. 알림 페이지

Supabase Auth에서 가입한 후 사용자는 사용자를 활성화하는 이메일을 수신합니다. 이 페이지는 사용자에게 이메일을 확인하도록 알림하는 페이지입니다. 이 페이지를 만들려면 /app/auth/notification/page.tsx에 새 파일을 만들고 다음 코드를 따르세요.

<div class="content-ad"></div>

```js
export default function NotificationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      이메일을 확인해주세요.
    </main>
  );
}
```

4. 확인된 가입 이메일 템플릿 업데이트

- Supabase 대시보드로 이동 — Authentication — 이메일 템플릿
- 가입 확인 이메일을 다음과 같이 업데이트

```js
<h2>가입을 확인하세요</h2>

<p>사용자를 확인하려면 다음 링크를 따르세요:</p>
<p><a href="{ .SiteURL }/auth/confirm?token_hash={ .TokenHash }&type=signup">이메일 확인</a></p>
```

<div class="content-ad"></div>

5. API 사용자 활성화

사용자가 링크 'Confirm your mail'을 클릭하면이 API로 리디렉션됩니다. TokenHash 및 유형을 사용하여 사용자를 확인합니다.

- /app/auth/confirm/route.ts에 새 파일을 만들고 다음 코드를 따르세요

```js
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  // 사용자를 오류 페이지로 리디렉션하고 몇 가지 지침을 표시합니다.
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
```

<div class="content-ad"></div>

6. 로그아웃 컴포넌트

- /components/sign-out.tsx에 새 파일 생성
- 이 파일에는 supabase에서 사용자를 로그아웃하는 버튼과 서버 작업 함수를 포함해야 합니다.

```js
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function SignOut() {
  const logout = async () => {
    "서버 사용";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <form>
      <button
        formAction={logout}
        className="text-white/30 hover:text-white transition duration-100 ease-in-out"
      >
        로그아웃
      </button>
    </form>
  );
}
```

7. 웰컴 페이지에 Supabase 통합하기

<div class="content-ad"></div>

- 웰컴 페이지 업데이트 /app/page.tsx
- SignOut 가져와 utils에서 createClient 서버 사이드로 임포트
- 사용자가 인증되었는지 확인하기 위해 getSession 함수 호출
- 사용자가 인증된 경우 이메일과 SignOut 버튼을 표시

```js
...
import SignOut from "@/components/sign-out";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const session = await supabase.auth.getSession();
  const user = session.data?.session?.user;

  return (
    <main className="...">
      <div>
        <div>환영합니다, <strong>{user?.email ?? "손님"}</strong>님!</div>

        <div className="flex gap-2 text-sm mt-1">
          {user
            ? <SignOut/>
            : <LinkButton href="/login">로그인</LinkButton>
          }
        </div>
      </div>
    </main>
  );
}
```

이 단계를 완료한 후, 다음 앱에서 테스트할 수 있습니다.
