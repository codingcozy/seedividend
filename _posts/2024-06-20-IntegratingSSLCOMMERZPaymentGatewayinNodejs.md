---
title: "Nodejs에서 SSLCOMMERZ 결제 게이트웨이 통합하기"
description: ""
coverImage: "/assets/img/2024-06-20-IntegratingSSLCOMMERZPaymentGatewayinNodejs_0.png"
date: 2024-06-20 04:32
ogImage: 
  url: /assets/img/2024-06-20-IntegratingSSLCOMMERZPaymentGatewayinNodejs_0.png
tag: Tech
originalTitle: "Integrating SSLCOMMERZ Payment Gateway in Node.js"
link: "https://medium.com/@shejanmahamud/integrating-sslcommerz-payment-gateway-in-node-js-1e0e7d1e2c70"
---


이 블로그 포스트에서는 MongoDB를 사용하여 Node.js 애플리케이션에 SSLCommerz 결제 게이트웨이를 통합하는 과정을 안내하겠습니다. 이 안내서는 웹 애플리케이션을 위한 안전하고 효율적인 결제 처리 시스템을 설정하는 데 도움이 될 것입니다.

![이미지](/assets/img/2024-06-20-IntegratingSSLCOMMERZPaymentGatewayinNodejs_0.png)

SSLCOMMERZ는 SSL Wireless가 개발한 안전하고 인증된 온라인 결제 게이트웨이 플랫폼으로, 온라인 비즈니스 및 전자상거래 판매 업체의 최종 고객이 고객의 카드, 모바일 지갑 또는 은행 계좌로 안전한 거래를 수행할 수 있도록 하였습니다. SSLCOMMERZ의 주요 이점을 살펴보겠습니다.

- 온라인 문서를 통한 빠른 활성화
- 쉬운 통합
- 방글라데시 중앙 은행이 PSO 라이선스 부여
- 30개 이상의 결제 방식
- 글로벌 결제 수락
- 실시간 대시보드 보고
- PCI DSS 규정을 준수한 고수준 보안

<div class="content-ad"></div>

# 준비 사항

시작하기 전에 다음 사항이 준비되어 있는지 확인하십시오:

- Node.js: 컴퓨터에 Node.js가 설치되어 있는지 확인하십시오. nodejs.org에서 다운로드할 수 있습니다.
- MongoDB: MongoDB가 설정되어 실행 중인지 확인하십시오.
- SSLCommerz 계정: SSLCommerz 상인 계정이 필요합니다. sslcommerz.com에서 가입할 수 있습니다.

# 단계 1: 프로젝트 설정하기

<div class="content-ad"></div>

먼저, 새로운 Node.js 프로젝트를 생성하고 필요한 종속성을 설치하세요. 터미널을 열고 다음 명령을 실행해보세요:

```js
mkdir sslcommerz-integration
cd sslcommerz-integration
npm init -y
npm install express body-parser dotenv sslcommerz-lts mongodb cors
```

# 단계 2: 환경 변수 설정

프로젝트의 루트에 .env 파일을 생성하고 SSLCommerz 자격 증명을 추가하세요. 이러한 자격 증명은 SSLCommerz API와의 요청을 인증하는 데 사용될 것입니다.

<div class="content-ad"></div>

```js
STORE_ID=your_store_id
STORE_PASSWORD=your_store_password
SERVER_API=http://localhost:3030
MONGO_URI = "mongodb+srv://username:password@cluster0.7ctc5qe.mongodb.net/?retryWrites=true&w=majority"
```

상인 계정을 생성한 후 이메일로 STORE_ID 및 STORE_PASSWORD를 받게 됩니다. SERVER_API는 백엔드 API 주소이며, MONGO_URI는 MongoDB 대시보드에서 얻을 수 있습니다.

# 단계 3: 익스프레스 서버 설정

이제 익스프레스 서버를 설정하고 결제 작업을 처리하기 위한 필요한 라우트를 정의하세요. app.js 파일을 만들고 다음 코드를 추가하세요:


<div class="content-ad"></div>

```js
const express = require('express');
const bodyParser = require('body-parser');
const SSLCommerzPayment = require('sslcommerz-lts');
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // SSLCommerz로부터 전송된 폼 데이터 처리를 위해

// MongoDB 연결
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// CORS 및 JSON 파싱을 위한 미들웨어
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// SSLCommerz 구성
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; // 라이브 모드: true, 샌드박스 모드: false

const run = async () => {
  try {
    // 데이터베이스 연결
    await client.connect();

    // 주문 저장을 위한 컬렉션
    const ordersCollection = client.db("test").collection("orders");

    // 결제 생성을 위한 POST 요청
    app.post("/plans", async (req, res) => {
      // 클라이언트에서 보낸 플랜 세부 정보
      const planDetails = req.body;

      // 가격을 정수로 변환
      const price = parseInt(planDetails.price);

      // ObjectId를 사용하여 트랜잭션 ID 생성
      const tran_id = new ObjectId().toString();

      // SSLCommerz로 보낼 결제 데이터
      const data = {
        total_amount: price,
        currency: "BDT",
        tran_id: tran_id,
        success_url: `${process.env.SERVER_API}/payment/success`,
        fail_url: `${process.env.SERVER_API}/payment/fail`,
        cancel_url: `${process.env.SERVER_API}/payment/cancel`,
        ipn_url: `${process.env.SERVER_API}/payment/ipn`,
        shipping_method: "Courier",
        product_name: planDetails.plan,
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: planDetails.user_email,
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh"
      };

      // SSLCommerz 결제 초기화
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // 결제 게이트웨이 URL 가져오기
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });

        // 주문 세부 정보를 데이터베이스에 삽입
        const order = { ...planDetails, tran_id, status: 'pending'};
        const result = ordersCollection.insertOne(order);
      });

      // 성공한 결제 처리를 위한 POST 요청
      app.post("/payment/success", async (req, res) => {

        // 데이터베이스에서 주문 상태를 성공으로 업데이트
        const result = await ordersCollection.updateOne(
          { tran_id },
          { $set: { status: 'success'} }
        );
         // 클라이언트에 결제 성공 페이지로 리디렉션
        res.redirect("http://localhost:5173/payment/success");
      });

      // 실패한 결제 처리를 위한 POST 요청
      app.post("/payment/fail", async (req, res) => {

        // 데이터베이스에서 주문 상태를 실패로 업데이트
        const result = await ordersCollection.updateOne(
          { tran_id },
          { $set: { status: 'failed'} }
        );
       // 클라이언트에 결제 실패 페이지로 리디렉션
        res.redirect("http://localhost:5173/payment/fail");
      });

      // 취소된 결제 처리를 위한 POST 요청
      app.post("/payment/cancel", async (req, res) => {

        // 데이터베이스에서 주문 상태를 취소됨으로 업데이트
        const result = await ordersCollection.updateOne(
          { tran_id },
          { $set: { status: 'canceled'} }
        );
        // 클라이언트에 결제 취소 페이지로 리디렉션
        res.redirect("http://localhost:5173/payment/cancel");
      });

      // IPN(즉시 결제 알림) 처리를 위한 POST 요청
      app.post("/payment/ipn", async (req, res) => {

        // IPN 알림에 따라 데이터베이스에서 주문 상태 업데이트
        const result = await ordersCollection.updateOne(
          { tran_id },
          { $set: { status: status === "VALID" } }
        );
        res.send({ message: "IPN received" });
      });
    });
  } finally {
    // 서버가 계속 실행되도록 보장
  }
};

// 서버 실행
run().catch(console.dir);

// 서버 실행 상태 확인을 위한 간단한 루트
app.get('/', async (req, res) => {
  res.send({ server_status: "Running" });
});

// Express 서버 시작
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
```

<div class="content-ad"></div>

프론트엔드에서 지불 프로세스를 트리거하기 위해 아래의 코드 스니펫을 사용할 수 있어요. 이 코드는 POST 요청을 /plans 엔드포인트로 보내고, 사용자를 SSLCommerz 지불 페이지로 리디렉션해요.

```js
const handlePlans = async () => {
  const { data } = await axios.post('/plans', {
    user_email: user.email,
    plan: plan,
    price: price,
    purchase_date: purchaseDate,
    expiration_date: expirationDate,
    currency: 'BDT',
    payment_method: 'SSLCOMMERZ'
  });
  // 서버로부터 받은 URL로 리디렉션하기
  window.location.replace(data.url);
};
```

# 설명

- handlePlans 함수: 해당 함수는 필요한 플랜 세부 정보와 함께 /plans 엔드포인트로 POST 요청을 보냅니다.
- 리디렉션: 응답을 받은 후, 사용자는 window.location.replace를 사용하여 SSLCommerz 지불 페이지로 리디렉션됩니다.

<div class="content-ad"></div>

# 결론

이 블로그 포스트에서 우리는 SSLCommerz 결제 게이트웨이를 Node.js 어플리케이션에 성공적으로 통합하고 데이터베이스 작업에 대해 직접 MongoDB를 사용했습니다. 이 통합을 통해 안전하게 결제를 처리하고 데이터베이스를 업데이트할 수 있습니다.

# 주요 포인트

- SSLCommerz 설정: SSLCommerz와 상점 ID 및 비밀번호를 획득하기 위해 상인 계정을 사용합니다.
- 환경 변수: 환경 변수에 자격 증명을 안전하게 저장합니다.
- MongoDB 작업: 주문 추적 및 사용자 플랜 업데이트를 위해 데이터베이스 작업에 MongoDB를 사용합니다.

<div class="content-ad"></div>

이 단계를 따라하면 Node.js 애플리케이션에 견고하고 안전한 결제 처리 시스템을 설정할 수 있어요. 코딩을 즐기세요!