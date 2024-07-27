---
title: "React Hook Form과 Nextjs 134를 사용하여 React에서 폼 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-CreatingaForminReactwithReactHookFormandNextjs134_0.png"
date: 2024-05-12 20:29
ogImage: 
  url: /assets/img/2024-05-12-CreatingaForminReactwithReactHookFormandNextjs134_0.png
tag: Tech
originalTitle: "Creating a Form in React with React Hook Form and Next.js 13.4"
link: "https://medium.com/@prithvi128717/creating-a-form-in-react-with-react-hook-form-and-next-js-13-4-5dae780daaef"
---


![이미지](/assets/img/2024-05-12-CreatingaForminReactwithReactHookFormandNextjs134_0.png)

이번 튜토리얼에서는 React Hook Form을 사용하여 폼 처리 및 유효성 검사를 수행하는 Next.js 애플리케이션에서 로그인 폼을 만들겠습니다. 또한 Zod 라이브러리를 사용하여 폼 스키마를 정의하고 유효성을 검사할 것입니다. 이 튜토리얼이 끝나면 클라이언트 측 유효성을 갖춘 완전히 작동하는 로그인 폼이 준비될 것입니다.

# 준비물

시작하기 전에 다음이 설치되어 있는지 확인하세요:



- 노드.js 및 npm (Node Package Manager)
- Next.js 버전 13.4 이상

## 프로젝트 설정

다음 단계로 Next.js 프로젝트를 설정하고 필요한 종속성을 설치해보겠습니다.

- 다음 명령어를 실행하여 새 Next.js 프로젝트를 생성하세요:



```js
npx create-next-app login-form-app
cd login-form-app
```

2. **폼 처리 및 유효성 검사를 위해 필요한 패키지 설치:**

```js
npm install react-hook-form @hookform/resolvers zod
```

# 폼 생성하기



이 예제에서는 이메일과 비밀번호를 입력 필드로 사용하는 로그인 양식을 만들겠습니다.

다음 내용을 가진 src 디렉토리에 LoginForm.tsx라는 새 파일을 생성하세요:

```js
// app/components/LoginForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "../zodSchema/login";

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: FormData) {
    console.log(isSubmitting);
    console.log(data);
    // 이를 서버 액션으로 변경하거나 인증 API 엔드포인트를 가져오세요
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000); // 2초를 밀리초로 변환
    });
    router.push("/tweets");
  }

  return (
    <div className="selection:bg-rose-500 selection:text-white">
      <div className="flex min-h-screen items-center justify-center bg-rose-100">
        <div className="flex-1 p-8">
          <div className="mx-auto w-80 overflow-hidden rounded-3xl bg-white shadow-xl">
            {/* 양식 헤더 */}
            <div className="rounded-bl-4xl relative h-44 bg-rose-500">
              <svg
                className="absolute bottom-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#ffffff"
                  fillOpacity="1"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>

            {/* 양식 본문 */}
            <div className="rounded-tr-4xl bg-white px-10 pb-8 pt-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                다시 오신 것을 환영합니다!
              </h1>
              <form
                className="mt-12"
                action=""
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* 이메일 입력 */}
                <div className="relative">
                  <input
                    {...register("email", { required: true })}
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    placeholder="john@doe.com"
                    autoComplete="off"
                  />
                  {errors?.email && (
                    <p className="text-red-600 text-sm">
                      {errors?.email?.message}
                    </p>
                  )}
                  <label
                    htmlFor="email"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    이메일 주소
                  </label>
                </div>

                {/* 비밀번호 입력 */}
                <div className="relative mt-10">
                  <input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
                    placeholder="비밀번호"
                    autoComplete="off"
                  />
                  {errors?.password && (
                    <p className="text-red-600 text-sm">
                      {errors?.password?.message}
                    </p>
                  )}
                  <label
                    htmlFor="password"
                    className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    비밀번호
                  </label>
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={!isDirty || !isValid || isSubmitting}
                  className="mt-20 block w-full cursor-pointer rounded bg-rose-500 px-4 py-2 text-center font-semibold text-white hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-500 focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 mr-2 text-white animate-spin fill-rose-600 opacity-100"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* 스피너 애니메이션용 SVG */}
                      </svg>
                    </div>
                  ) : (
                    "로그인"
                  )}
                </button>
              </form>

              {/* 비밀번호 잊은 경우 링크 */}
              <a
                href="#"
                className="mt-4 block text-center text-sm font-medium text-rose-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

이제 LoginForm 컴포넌트를 만들었으므로 메인 페이지 컴포넌트에서 가져와 사용할 수 있습니다.



페이지 디렉토리에 index.tsx라는 새 파일을 만들어서 아래 내용을 넣어주세요:

```js
// app/page.tsx

import LoginForm from "../src/components/LoginForm";

export default function HomePage() {
  return (
      <LoginForm />
  );
}
```

이 파일에서는 LoginForm 컴포넌트를 import하여 HomePage 컴포넌트 내에서 렌더링하고 있습니다.

# Zod Schema



다음으로, 로그인 양식 유효성 검사를 위해 Zod를 사용하여 loginSchema를 정의해 봅시다. 다음 내용을 포함하는 src/zodSchema 디렉토리에 login.ts라는 새 파일을 만들어주세요:

```js
// src/zodSchema/login.ts

import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type User = z.infer<typeof loginSchema>;
```

이 스키마는 로그인 양식 필드에서 예상하는 데이터의 구조를 정의합니다.

# 양식 테스트



이제 클라이언트 측 유효성 검사가 포함된 완전히 작동하는 로그인 폼이 있습니다. 이 폼은 제출을 허용하기 전에 이메일이 올바른 형식인지와 비밀번호가 최소 8자 이상인지를 확인할 것입니다.

폼을 테스트하려면 Next.js 애플리케이션을 실행하세요:

```js
npm run dev
```

브라우저에서 http://localhost:3000을 방문하여 로그인 폼이 작동하는 것을 확인할 수 있습니다.



# 요약

이 튜토리얼에서는 React Hook Form을 사용하여 Next.js 애플리케이션에서 로그인 폼을 만드는 방법을 배웠습니다. 폼 처리와 유효성 검사를 위해 사용했습니다. 우리는 Zod를 사용하여 폼 스키마를 정의하고 유효성을 검사했습니다. 사용자가 잘못된 데이터를 입력하면 오류 메시지가 표시되고, 폼이 올바르게 작성될 때까지 제출 버튼이 비활성화됩니다. 이 구현은 React 및 Next.js 프로젝트에서 더 복잡한 폼을 만드는 좋은 시작점을 제공합니다.

사용자 경험을 향상시키는 좋은 방법인 클라이언트 측 유효성 검사를 기억해주세요. 하지만 로그인 폼의 유일한 보안 계층이 되어서는 안 됩니다. 항상 강력한 서버 측 유효성 검사와 인증 메커니즘을 갖추어 애플리케이션을 잠재적인 보안 위협으로부터 보호해야 합니다.

즐거운 코딩! 🚀