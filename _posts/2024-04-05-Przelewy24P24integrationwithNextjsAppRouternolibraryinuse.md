---
title: " 라이브러리 사용 없이 Nextjs어플리케이션 라우터와 Przelewy24 P24 통합 하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Przelewy24 P24 integration with Nextjs App Router  no library in use"
link: "https://medium.com/@pether.maciejewski/przelewy24-p24-integration-with-next-js-app-router-no-library-in-use-89557c3aa4fc"
isUpdated: true
---





![Przelewy24 Payment Integration without External Libraries](/assets/img/Przelewy24P24integrationwithNextjsAppRouternolibraryinuse_0.png)

외부 결제 라이브러리를 의존하지 않고 Przelewy24 결제 요청을 생성하는 것은 흥미로운 도전으로, 결제 프로세스에 대한 깊은 통찰력과 통합에 대한 더 큰 제어력을 제공할 수 있습니다. 여기에서는 Next.js 14 및 웹 애플리케이션을 구축하는 인기 있는 React 프레임워크로 API를 구축하는 과정을 안내해 드리겠습니다.

저장소를 확인하고 싶으시면 여기를 참고해주세요.

P24 - Przelewy24는 폴란드에서 국내 결제 기관으로 인정받으며, 승인 및 정산 메커니즘을 포함한 다양한 결제 서비스를 제공합니다. Przelewy24 API를 활용하기 위해 상인은 먼저 P24 관리 패널에서 계정을 설정해야 합니다. 이 등록 프로세스를 통해 상인은 계정 잔액을 감시하고, 클라이언트 결제를 모니터링하고, 환불을 처리하는 등 다양한 도구를 활용할 수 있습니다.

<div class="content-ad"></div>

1단계: Next.js 애플리케이션 설정

```js
npx create-next-app@latest my-p24-app
cd my-p24-app
```

2단계: 결제 API 구현

Next.js 애플리케이션에서 P24 거래를 생성하는 요청을 처리해야합니다. 필요한 모듈을 가져와주세요.

<div class="content-ad"></div>

```js
import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";
```

위의 import 구문에는 응답을 보내기 위한 "NextResponse", 안전한 해시를 생성하기 위한 "crypto", 그리고 HTTP 요청을 만들기 위한 "axios"가 포함되어 있습니다.

CORS 헤더를 정의합니다:

```js
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
```

<div class="content-ad"></div>

이 헤더들은 Cross-Origin Resource Sharing(CORS)를 활성화하여 다른 도메인에서 API를 호출할 수 있도록 합니다.

P24에서 요구하는 SHA-384 해시를 위한 유틸리티 함수 만들기

```js
function calculateSHA384(data) {
  const hash = crypto.createHash("sha384");
  hash.update(data);
  return hash.digest("hex");
}
```

이 함수는 주어진 데이터 문자열의 SHA-384 해시를 계산합니다. 이는 P24에 요청을 서명하기 위해 필요합니다.

<div class="content-ad"></div>

P24 클래스 정의

```js
// 라이브러리 동작을 모방하기 위한 P24 클래스 정의
class P24 {
  constructor(posId, apiKey, crcKey, merchantId, options = { sandbox: true }) {
    this.posId = posId;
    this.apiKey = apiKey;
    this.crcKey = crcKey;
    this.merchantId = merchantId;
    this.options = options;
    this.client = axios.create({
      baseURL: "https://sandbox.przelewy24.pl/api/v1", // 적절한 베이스 URL로 업데이트
      auth: {
        username: posId.toString(),
        password: apiKey,
      },
    });
  }

  // 거래 생성 메소드
  async createTransaction(order) {
    try {
      const hashData = {
        sessionId: order.sessionId,
        merchantId: this.merchantId,
        amount: order.amount,
        currency: order.currency,
        crc: this.crcKey,
      };
      const sign = calculateSHA384(JSON.stringify(hashData));
      const orderData = {
        ...order,
        posId: this.posId,
        sign: sign,
      };
      const response = await this.client.post(
        "/transaction/register",
        orderData
      );
      console.log(response.data.data.token);
      return {
        token: response.data.data.token,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create transaction");
    }
  }
}
```

P24 클래스는 API 자격 증명으로 초기화하고 P24와 거래 등록을 위한 메소드를 포함하는 거래 생성 기능을 캡슐화합니다.

옵션과 POST 요청 처리

<div class="content-ad"></div>

```js
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
  // POST 요청 처리를 통해 거래 생성
}
```

이 함수들은 HTTP OPTIONS 및 POST 요청을 처리하여 CORS를 활성화하고 결제 거래를 처리합니다.

단계 3: 결제 요청 처리

POST 메서드에서 요청 본문에서 필요한 매개변수를 추출하고, P24 자격 증명으로 P24 클래스를 인스턴스화하고 주문 세부 정보로 createTransaction을 호출합니다. 오류를 적절하게 처리하고 거래 결과를 클라이언트에 반환합니다.

<div class="content-ad"></div>

이 설정의 중요한 측면 중 하나는 sessionID 생성입니다. 이 sessionID는 거래 추적, 유효성 검사 및 환불 처리에 중요합니다. 상인 자체 논리에 따라 고유하게 만들어져야 합니다.

POST 방법의 예시 코드는 다음과 같습니다: /api/p24/route.ts

```js
export async function POST(req) {
  const body = await req.json();

  const { randomSessionId, amount } = body;
  console.log(randomSessionId, amount);

  const merchantId = 213883;
  const posId = process.env.PRZELEWY24_POS_ID;
  const crcKey = process.env.PRZELEWY24_CRC_KEY;
  const apiKey = process.env.PRZELEWY24_CRC_API_KEY;

  if (req.method === "POST") {
    try {
      const p24 = new P24(posId, apiKey, crcKey, merchantId); // P24 클래스의 인스턴스 생성

      // 주문 개체 생성
      const order = {
        merchantId: merchantId,
        sessionId: "xxx12124",
        amount: amount * 100,
        currency: "PLN",
        description: "테스트 주문",
        email: "john.doe@example.com",
        channel: 8192,
        country: "PL",
        language: "pl",
        urlReturn: "http://localhost:3000",
        urlStatus: "http://localhost:3000",
        timeLimit: 20,
        encoding: "UTF-8",
      };

      // 라이브러리 메소드를 사용하여 거래 생성
      const transactionResult = await p24.createTransaction(order);

      // 클라이언트에 응답 전송
      return NextResponse.json(transactionResult, { headers: corsHeaders });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "내부 서버 오류" },
        { headers: corsHeaders, status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "허용되지 않는 메소드" },
      { headers: corsHeaders, status: 405 }
    );
  }
}
```

/api/p24/route.ts 파일의 전체 코드:

<div class="content-ad"></div>

```js
import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// SHA-384 해시를 계산하는 함수
function calculateSHA384(data) {
  const hash = crypto.createHash("sha384");
  hash.update(data);
  return hash.digest("hex");
}

// 라이브러리의 동작을 모방하기 위한 P24 클래스 정의
class P24 {
  constructor(posId, apiKey, crcKey, merchantId, options = { sandbox: true }) {
    this.posId = posId;
    this.apiKey = apiKey;
    this.crcKey = crcKey;
    this.merchantId = merchantId;
    this.options = options;
    this.client = axios.create({
      baseURL: "https://sandbox.przelewy24.pl/api/v1", // 적절한 기본 URL로 업데이트
      auth: {
        username: posId.toString(),
        password: apiKey,
      },
    });
  }

  // 거래 생성 메소드
  async createTransaction(order) {
    try {
      const hashData = {
        sessionId: order.sessionId,
        merchantId: this.merchantId,
        amount: order.amount,
        currency: order.currency,
        crc: this.crcKey,
      };
      const sign = calculateSHA384(JSON.stringify(hashData));
      const orderData = {
        ...order,
        posId: this.posId,
        sign: sign,
      };
      const response = await this.client.post(
        "/transaction/register",
        orderData
      );
      console.log(response.data.data.token);
      return {
        token: response.data.data.token,
      };
    } catch (error) {
      console.error(error);
      throw new Error("거래 생성에 실패했습니다");
    }
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
  const body = await req.json();

  const { randomSessionId, amount } = body;
  console.log(randomSessionId, amount);

  const merchantId = 213883;
  const posId = process.env.PRZELEWY24_POS_ID;
  const crcKey = process.env.PRZELEWY24_CRC_KEY;
  const apiKey = process.env.PRZELEWY24_CRC_API_KEY;

  if (req.method === "POST") {
    try {
      const p24 = new P24(posId, apiKey, crcKey, merchantId); // P24 클래스의 인스턴스 생성

      // 주문 객체 생성
      const order = {
        merchantId: merchantId,
        sessionId: "xxx12124",
        amount: amount * 100,
        currency: "PLN",
        description: "테스트 주문",
        email: "john.doe@example.com",
        channel: 8192,
        country: "PL",
        language: "pl",
        urlReturn: "http://localhost:3000",
        urlStatus: "http://localhost:3000",
        timeLimit: 20,
        encoding: "UTF-8",
      };

      // 라이브러리 방법을 사용하여 거래 생성
      const transactionResult = await p24.createTransaction(order);

      // 클라이언트에 응답 보내기
      return NextResponse.json(transactionResult, { headers: corsHeaders });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "내부 서버 오류" },
        { headers: corsHeaders, status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "허용되지 않은 방법" },
      { headers: corsHeaders, status: 405 }
    );
  }
}
```

이제 클라이언트 측의 onClick 트리거 예제를 확인해보세요:

```js
const onP24Checkout = async () => {
  try {
    fetch("/api/p24checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: fundsInAmount,
        randomSessionId: Math.floor(Math.random() * 1000000),
        /* 주문 세부 정보 입력 */
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 사용자를 지불 URL로 리다이렉트
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          console.error("지불 URL을 받지 못했습니다");
        }
      })
      .catch((error) => {
        console.error("에러:", error);
        // 에러 처리
      });
  } catch (error) {
    console.log(error);
  }
};
```

단계 4: 통합 테스트하기

<div class="content-ad"></div>

라이브로 전환하기 전에 P24 샌드박스 환경을 사용하여 통합을 철저히 테스트하세요. 거래가 성공적으로 생성되고 결제 프로세스가 예상대로 작동하는지 확인하세요.

단계 5: 결제 방법 검색

다음은 P24 API에서 사용 가능한 결제 방법을 가져오는 '서버 액션'으로 사용할 수 있는 Next.js 14의 코드 조각입니다:

/lib/actions/getPMethods.action.js

<div class="content-ad"></div>

```js
'server'를 사용합니다

import { NextResponse } from 'next/server'
import axios from 'axios'

export const getPaymentMethods = async () => {
  const posId = process.env.PRZELEWY24_POS_ID
  const apiKey = process.env.PRZELEWY24_CRC_API_KEY

  try {
    const response = await axios.get(
      'https://sandbox.przelewy24.pl/api/v1/payment/methods/pl?amount=150&currency=PLN',
      {
        auth: {
          username: posId,
          password: apiKey,
        },
      },
    )

    return response
  } catch (error) {
    console.error(error)

    return NextResponse.error({ error: '내부 서버 오류' })
  }
}
```

결론

지불 라이브러리를 사용하지 않고 Next.js 애플리케이션에 P24 지불 요청을 직접 통합하면 유연성이 높아지고 지불 프로세스에 대한 깊은 이해가 가능해집니다. 이 접근 방식은 자격 증명의 주의 깊은 처리, 안전한 서명 생성 및 원활한 사용자 결제 경험을 보장하기 위한 적절한 오류 처리를 필요로 합니다.

금융 거래를 다룰 때는 보안과 신뢰성이 중요합니다. 항상 민감한 정보를 암호화하고 입력 데이터를 유효성 검사하며, 안전하고 효율적인 결제 프로세스를 보장하기 위해 통합을 철저히 검사하십시오.

<div class="content-ad"></div>

즐거운 코딩하세요 :)

피오티르
