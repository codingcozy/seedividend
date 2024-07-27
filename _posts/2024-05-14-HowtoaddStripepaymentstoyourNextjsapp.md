---
title: "Nextjs 앱에 Stripe 결제 추가하는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowtoaddStripepaymentstoyourNextjsapp_0.png"
date: 2024-05-14 16:09
ogImage: 
  url: /assets/img/2024-05-14-HowtoaddStripepaymentstoyourNextjsapp_0.png
tag: Tech
originalTitle: "How to add Stripe payments to your Next.js app"
link: "https://medium.com/@sultanoveli/how-to-add-stripe-payments-to-your-next-js-app-d1cfced7c8a5"
---


<img src="/assets/img/2024-05-14-HowtoaddStripepaymentstoyourNextjsapp_0.png" />

와! 내 매체 암호를 찾았어요!

이제, 내 첫 번째 기사에서 Stripe를 Next.js 앱에 통합하는 방법에 대해 이야기하려고 해요.

이 프로젝트에서는 너무 복잡한 것을 만드는 데 주의를 기울이지 않을 거에요. 대신에 우리는 간편한 Next.js 13.4 앱을 개발하여 일회성 Stripe 결제를 가능하게 할 거에요.



## 설정하기

터미널을 열고 나의 경우에는 Workspace 안에서 다음 명령을 실행해 주세요.

```js
npx create-next-app@latest
```

위 명령을 실행하면 "create-next-app@13.4.1"을 설치하라는 메시지가 표시되며 몇 가지 질문이 있을 겁니다.



- 프로젝트 이름은 무엇인가요? stripe-nextjs
- TypeScript를 사용하고 싶나요? 네
- ESLint를 사용하고 싶나요? 네
- 이 프로젝트에 Tailwind CSS를 사용하고 싶나요? 아니요, 스타일 작업을 하지 않을 예정이기 때문에
- `src/` 디렉토리를 사용하고 싶나요? 네
- App Router를 사용하시겠습니까? 네
- 기본 import 별칭을 사용자 정의하시겠습니까? 아니요

질문에 모두 답했다면, 설치가 시작됩니다!

이제 설치가 완료되었습니다! 이제 실제로 Next.js 앱을 보려면 터미널에서 다음 명령을 실행하세요. Next.js 앱 내부에 있는지 확인하세요.

```js
yarn run dev
```



더 나아가기 전에, Stripe 계정을 생성하고 API 키를 받아봐요.

Stripe 계정을 만든 후에, dashboard.stripe.com/test/apikeys로 이동해서 API 키를 받아요.

## 환경 파일 설정하기

루트 디렉토리 안에, .env.local이라는 파일을 만들어주세요.



.env.local 파일 안에 다음을 추가해주세요:

```js
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
```

여기서 기억해야 할 중요한 점이 몇 가지 있어요. 먼저, """를 Stripe 키로 대체해야 합니다. 둘째로, 두 변수 간의 차이를 이해하는 것이 중요합니다. 하나는 "NEXT_PUBLIC"을 포함하고 다른 하나는 포함하지 않습니다. 간단히 말해서, "NEXT_PUBLIC"을 사용하여 STRIPE_PUBLISHABLE_KEY를 노출시키는 것은 괜찮지만 시크릿 키는 절대로 클라이언트 측에 노출되어서는 안 됩니다.

알았어요, 이해했어요? 그럼 다음 단계로 넘어갑시다!



## 필요한 패키지 설치하기

당신의 Next.js 앱 내부에 다음 패키지를 설치해보세요:

```js
@stripe/react-stripe-js @stripe/stripe-js stripe axios
```

## 백엔드 작업을 시작해봅시다



우리 앱 폴더 안에 api라는 새 폴더를 만들어주세요. 이곳에 모든 백엔드 코드가 위치하게 됩니다.

api 폴더 안에 create-payment-intent라는 새 폴더를 만들고, 그 안에 route.ts 라는 파일을 생성해주세요.

![이미지](/assets/img/2024-05-14-HowtoaddStripepaymentstoyourNextjsapp_1.png)

"create-payment-intent" 폴더 안에 "route"라는 파일을 만드는 이유는 Next.js에 API 요청을 다루고 있다는 것을 알리는 것입니다. 공식 문서에 따르면, route는 라우팅의 가장 기본적인 수준으로, 페이지가 하는 것처럼 레이아웃이나 클라이언트 측 탐색에 영향을주지 않습니다. "route.ts" 파일이 "page.ts" 파일이 있는 곳에 존재할 수 없다는 점을 명심해야 합니다. 자세한 내용은 문서를 참고하는 것을 강력히 권장합니다.



여기는 route.ts 파일의 코드입니다:

```js
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const { amount } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
    });

    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
```

이것을 자세히 살펴보고 무슨 일이 일어나고 있는지 이해해 봅시다.

첫째로, 우리는 타입과 stripe를 import 합니다:



```js
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
```

다음으로 stripe 인스턴스를 만듭니다:

```js
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});
```

우리의 Stripe 인스턴스는 env.local 파일에서 Stripe 비밀키가 필요합니다. 더 나아가, 우리는 Stripe 인스턴스에 TypeScript를 활성화하고 인스턴스용 Stripe API 버전을 지정했습니다.



계속 진행하기 전에 Next.js 13.4에서 API 경로를 다루는 방법에 대해 이야기해 봅시다.

아마 이미 주목했을 것이지만, 함수의 제목이 "POST"와 같이 모두 대문자로 되어 있습니다. 이 네이밍 규칙은 Next.js가 실행할 해당 HTTP 메소드를 결정하기 위해 필요합니다. 예를 들어, GET 요청을 수행하려면 함수의 제목을 "GET"으로 지정해야 하며, 수행하려는 다른 작업에 대해서도 유사하게 지정해야 합니다.

알겠습니다, 이해했습니다, 좋아요! 계속 진행합시다!

우리 함수 내에서는 요청에서 데이터를 비구조화하는 방식으로 진행합니다. 그 후에는 데이터 객체에서 금액을 더욱 세분화합니다.



```js
const { data } = await req.json();
const { amount } = data;
```

이제 모든 흥미로운 로직이 발생하는 trycatch 블록을 살펴보겠습니다!

파고들어 봅시다.

```js
const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(price) * 100,
      currency: "USD",
    });

    return new NextResponse(paymentIntent.client_secret, { status: 200 });
```



우리의 try 블록 안에서, 결제 인텐트를 생성할 것입니다. 결제 인텐트에 대해 잘 모르신다면 걱정하지 마세요. 거래에 관한 중요한 정보를 담고 있죠. 지원되는 결제 방법, 징수할 금액, 그리고 희망하는 통화를 포함하고 있습니다.

마지막으로, Stripe로부터 얻은 클라이언트 시크릿을 포함한 응답을 반환할 것입니다. 이 단계는 매우 중요합니다. 왜냐하면 우리는 클라이언트 측에서 Stripe가 결제를 확인하는 데 도움을 주기 위해 클라이언트 시크릿을 활용할 것이기 때문이죠.

```js
    return new NextResponse(error, {
      status: 400,
    });
```

우리의 catch 블록 안에서는 간단히 오류를 포함한 응답을 반환합니다.



이 시점에서 백엔드 개발은 완료되었습니다. 이제 새로 만든 엔드포인트와 상호 작용할 클라이언트 측으로 이동해 봅시다.

## 프론트엔드

마법을 시작하기 전에 정리해 봅시다!

layout.tsx 파일에서 global.css를 불러오는 줄을 삭제하세요. 스타일에 대해서는 다루지 않을 거에요.



앱.tsx 파일에서 `main` 태그 내부의 모든 내용을 삭제하고, Image 컴포넌트 import 구문을 삭제해주세요.

좋아요, 이 시점에서 layout.tsx 파일은 다음과 같아야 합니다:

```js
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

그리고 app.tsx 파일은 다음과 같아야 합니다:



```js
export default function Home() {
  return (
    <></>
  );
}
```

여기 멋진 곳에요, 결제 양식을 설정해 봅시다!

"src" 폴더에서 "components"라는 새 폴더를 만들어 주세요. "components" 폴더 안에 "PaymentForm"이라는 또 다른 폴더를 만들어 주세요. "PaymentForm" 폴더 안에 "PaymentForm.tsx"라는 파일을 만들어 주세요. 거기에 우리의 결제 양식이 위치하고 대부분의 로직이 여기서 실행될 거에요.

시작해 봅시다!



우리가 컴포넌트 작성을 시작하기 전에, Next.js에게 서버 컴포넌트가 아닌 클라이언트 컴포넌트를 다루고 있다는 것을 알려주어야 해요.

PaymentForm.tsx 파일의 맨 위에 다음을 추가해주세요:

```js
"use client";
```

그 다음에 다음과 같은 import 문을 추가해주세요:



```js
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
```

이제 빈 컴포넌트를 생성해봅시다:

```js
export default function PaymentForm() {
  return <></>;
}
```

지금까지의 파일은 이렇게 보여야 합니다:



```js
"사용자용";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";

export default function PaymentForm() {
  return <></>;
}
```

우리 컴포넌트 안에서 처음으로 해야 할 일은 Stripe 훅을 사용하는 것인데, 우리가 사용할 훅은 useStripe와 useElements 입니다.

```js
  const stripe = useStripe();
  const elements = useElements();
```

from을 제출할 수 있는 onSubmit이라는 함수를 만들어봅시다.



```js
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {}
```

onSubmit 함수 안에서 e.preventDefault(); 를 사용하여 기본 동작을 막아줍시다.

다음으로, stripe 카드 엘리먼트에 다음 스니펫을 사용하여 접근해야 합니다:

```js
    const cardElement = elements?.getElement("card");
```



지금부터 실제 마법을 시도해 봅시다!

try-catch 블록을 만들어 봅시다. try 블록 안에는 stripe와 cardElement의 존재 여부를 확인하는 조건문을 만들 것입니다. 둘 중 하나라도 누락된 경우, onSubmit 함수를 효과적으로 중단시키고 더 이상의 작업을 방지하기 위해 null을 반환할 것입니다.

catch 블록에서는 단순히 error를 console.log 하면 됩니다.

다음은 코드 조각입니다:



```js
    try {
      if (!stripe || !cardElement) return null;
    } catch (error) {
      console.log(error);
    }
```

안녕하세요 여러분, 지금 좋은 위치에 있어요. 계속 진행하죠.

Stripe와 cardElement가 모두 존재하는지 확인한 후에, 이전에 백엔드에서 설정한 API를 사용하여 결제 의도를 생성할 수 있습니다. API에 전달할 데이터는 금액이 포함되며, 저의 경우에는 89로 설정되어 있어요.

```js
    const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: 89 },
      });
```



응답을 clientSecret라는 변수에 할당해보세요.

```js
const clientSecret = data;
```

마지막으로 우리가 해야 할 일은 stripe에서 제공하는 confirmCardPayment 메서드를 사용하여 결제를 확인하는 것입니다. 아래는 예시 코드 조각입니다:

```js
await stripe?.confirmCardPayment(clientSecret, {
  payment_method: { card: cardElement },
});
```



지금까지 onSubmit 함수를 완료했습니다.

우리의 컴포넌트가 stripe에서 제공하는 CardElement 컴포넌트를 사용하는 폼을 반환하도록 만들어보겠습니다.

```js
    <form onSubmit={onSubmit}>
      <CardElement />
      <button type="submit">제출하기</button>
    </form>
```

최종 결과:



```js
"사용자 사용";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: 89 },
      });
      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CardElement />
      <button type="submit">제출</button>
    </form>
  );
}
```

좋은 소식입니다! 우리의 PaymentForm 컴포넌트가 이제 완성되었습니다. 만세! 이제 마지막 단계로 넘어가서, 새롭게 생성된 PaymentForm 컴포넌트를 사용하도록 앱의 app.tsx 파일을 업데이트하는 것을 진행해보겠습니다.

PaymentForm 컴포넌트가 app.tsx 안에서 사용되기 전에, 몇 가지를 import하고 stripe를 로드해야 합니다.

```js
"사용자 사용";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm/PaymentForm";
```



stripe를 불러와보겠습니다:

```js
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
```

stripe를 컴포넌트 외부에서 로드하는 것을 확인해주세요. 그렇지 않으면 stripe가 매번 렌더링되어 원하지 않는 결과가 발생할 수 있습니다.

마지막으로, return 문 안에서 우리에게 제공된 Element 공급자를 활용해봅시다. PaymentForm 컴포넌트를 해당 공급자로 감싸겠습니다. 다음과 같이 보여야 합니다:



여기 완성된 결과입니다:

```js
"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm/PaymentForm";
// 컴포넌트 렌더링 시에 `Stripe` 객체를 다시 생성하는 것을 피하기 위해
// `loadStripe`를 컴포넌트 밖에서 호출하는 것을 확인해주세요.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Home() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
```

와! Stripe를 사용하여 결제 폼을 만들었네요. 잘 했어요!



이 글이 도움이 되었으면 좋겠어요! 앞으로 여기서 더 활발하게 활동할 거에요. 기대돼요 🤔

여기 git 레포지토리 링크에요. 즐겨보세요!