---
title: "Nodejs와 Reactjs에서 Razorpay 결제 게이트웨이 통합 방법"
description: ""
coverImage: "/assets/img/2024-06-22-RazorpayPaymentGatewayIntegrationInNodeJSReactJS_0.png"
date: 2024-06-22 02:29
ogImage:
  url: /assets/img/2024-06-22-RazorpayPaymentGatewayIntegrationInNodeJSReactJS_0.png
tag: Tech
originalTitle: "Razorpay Payment Gateway Integration In Node JS , React JS"
link: "https://medium.com/@aifuture/razorpay-payment-gateway-integration-in-node-js-react-js-6a560740bba7"
isUpdated: true
---

# Node.js 및 React JS에서 Razorpay 결제 게이트웨이 통합

<img src="/assets/img/2024-06-22-RazorpayPaymentGatewayIntegrationInNodeJSReactJS_0.png" />

# Node.js에서 Razorpay 결제 API 구현

많은 시장에서 제공되는 결제 게이트웨이는 온라인 거래가 처리되는 곳입니다. 여기에서 Node.js를 사용하여 온라인 상점에 Razorpay 결제 API를 구현하는 방법을 설명하겠습니다.

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

우리는 ReactJS에서 Node.js로 작성된 API를 사용하여 Razorpay 결제 게이트웨이를 통합하는 방법에 대해 이야기할 것입니다.

물론 로직은 동일하기 때문에 사용하는 언어가 중요하지 않습니다. 그러니 시작해 봅시다!

## 단계 1:

Razorpay 웹사이트에서 계정을 만들어 여기에서 Key Id 및 Key Secret을 받으세요.
이 정보는 설정 - `API keys`에서 얻을 수 있습니다.

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

노트- 테스트 모드에 계십니까? 확인 부탁드립니다.

## 단계 2:

이번 단계에서는 Razorpay 결제 게이트웨이가 어떻게 작동하는지 이해해 보겠습니다. Razorpay 결제 게이트웨이의 흐름은 무엇인가요?

다음 단계들은 Razorpay에서의 결제 흐름의 주요 구성 요소입니다-

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

<img src="/assets/img/2024-06-22-RazorpayPaymentGatewayIntegrationInNodeJSReactJS_1.png" />

- 고객이 주문을 생성합니다.
- Razorpay는 주문에 대한 주문 ID를 생성하고, 우리는 이를 통합에 사용합니다.
- 주문 ID를 사용하여 결제 UI가 열리며, 고객은 세부 정보를 입력하고 결제 수단을 선택하고 금액을 지불합니다.
- 그런 다음,이 단일 지불에는 처리를 받는 결제 ID이 있으며 우리는 응답으로 razorpay_signature, razorpay_order_id 및 razorpay_payment_id를 받습니다.
- 그런 다음,이 결제를 인증하고 캡처하여 전체 거래를 정리하고 완료해야 합니다.

## 단계 3:

이제 코드를 작성합시다.

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

## 백엔드

Razorpay를 초기화합니다.

```js
npm i razorpay
```

## 비밀 키 사용하기

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

Razorpay의 모든 API에 접근하려면 먼저 Razorpay 패키지를 설치한 다음 시크릿 키를 사용해야 합니다.

```js
const Razorpay = require("razorpay");
```

```js
const razorpay = new Razorpay({
  key_id: "rzp_test_uGoq5ADrFTgYRAhk",
  key_secret: "FySe2f58UYtg6Hjkj1a5s6clk9B",
});
```

## 주문 생성을 위한 API 경로

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

우리는 주문을 배치하고 아래 나열된 API를 호출해야 합니다. 주문에 관한 기본 정보를 유지하고 주문을 반환해야 합니다. 나는 Razorpay를 위한 이 API의 요청 본문을 구성하고 create order 함수를 호출했습니다. 그런 다음에는 주문 ID를 프론트엔드 팀에 보내야 했으므로 그들이 이를 활용할 수 있고 Razorpay 체크아웃 페이지의 비밀키도 사용할 수 있습니다. 지불이 성공하면 상태가 "Failed"에서 "Authorized"로 변경됩니다. Razorpay 대시보드에서 확인할 수 있습니다.

```js
app.post("/order", async (req, res) => {
  // razorpay 초기화
  const razorpay = new Razorpay({
    key_id: req.body.keyId,
    key_secret: req.body.keySecret,
  });

  // razorpay 주문에 대한 옵션 설정
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "각 주문에 대한 고유 ID",
    payment_capture: 1,
  };
  try {
    const response = await razorpay.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    res.status(400).send("주문을 생성할 수 없습니다. 다시 시도해주세요!");
  }
});
```

## 지불 캡처를 위한 API 경로

Razorpay 설정에서 다음 URL을 웹훅에 특별한 비밀 키로 입력하고 "payment.capture" 열을 선택해야 하며, 이렇게하면 지불이 성공할 때마다 활성화됩니다.

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

Webhook에서 제공한 비밀 키를 사용하여 이 URL에서 서명을 확인해야 합니다. 지불 상태는 확인 후 "캡처됨"으로 변경됩니다.

```js
const crypto = require("crypto");

const secret_key = "1234567890";

app.post("/paymentCapture", (req, res) => {
  // 유효성 검사 수행

  const data = crypto.createHmac("sha256", secret_key);

  data.update(JSON.stringify(req.body));

  const digest = data.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("요청이 유효합니다");

    // 응답을 보내고 정보를 데이터베이스에 저장할 수 있습니다.

    res.json({
      status: "ok",
    });
  } else {
    res.status(400).send("유효하지 않은 서명");
  }
});
```

## 환불

지불이 완료된 후 환불할 수 있습니다. 요청할 API 호출과 함께 지불 ID와 금액을 제공하면 내부적으로 Razorpay의 환불 함수가 호출되어 돈을 동일한 계좌로 반환합니다.

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

```javascript
app.post("/refund", async (req, res) => {
  try {
    // 먼저 결제 ID를 확인한 후 Razorpay API에 액세스합니다.

    const options = {
      payment_id: req.body.paymentId,

      amount: req.body.amount,
    };

    const razorpayResponse = await razorpay.refund(options);

    // 응답을 보내고 데이터베이스에 정보를 저장할 수 있습니다.

    res.send("환불 성공");
  } catch (error) {
    console.log(error);

    res.status(400).send("환불 발행에 문제가 있습니다");
  }
});
```

## 장점

Razorpay Payment Gateway와 통합하는 이점은 아래에 나열되어 있습니다.

Onboarding

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

표 태그를 Markdown 형식으로 변경해주세요.

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

은행으로부터 수신한 오류 코드에 기초하여 Razorpay는 실패한 API 환불을 지능적으로 다시 시도합니다. 당사의 인스턴트 환불 도구 덕분에 최상의 환불 경험을 고객에게 제공할 수 있습니다.

확장성과 가용성

당사 시스템은 1초에 800개의 트랜잭션 요청을 처리할 수 있으며 성능이 저하되지 않습니다. 상태 페이지와 대시보드 외에도 장애 업데이트 이메일을 전송합니다.

정산 조정

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

거래 처리를 추적하려면 특정 날짜나 월에 지불된 지불, 환불, 이체 및 조정을 모두 추적하기 위해 결제 조정을 사용하십시오.

보상

우리 회사는 국내외 다양한 카드, 다양한 인터넷뱅킹 대안, UPI 수집 및 의도, EMI, 무카드 EMI 및 Paytm 및 PhonePe와 같은 지갑을 모두 지원합니다.

## 단계 4: 프론트엔드 (React js)

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

다음은 Razorpay를 렌더링하는 코드입니다.

```js
import { useEffect, useRef } from 'react';
import crypto from 'crypto-js';
import PropTypes from 'prop-types';
import Axios from 'axios';

// 스크립트를로드하고 DOM 트리에 추가하는 함수
const loadScript = src => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    console.log('razorpay가 성공적으로로드되었습니다');
    resolve(true);
  };
  script.onerror = () => {
    console.log('razorpay로드 중 오류 발생');
    resolve(false);
  };
  document.body.appendChild(script);
});


const RenderRazorpay = ({
  orderId,
  keyId,
  keySecret,
  currency,
  amount,
}) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  // razorpay 체크아웃 모달 스크립트로드
  const displayRazorpay = async (options) => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js',
    );

    if (!res) {
      console.log('Razorpay SDK를로드하지 못했습니다. 온라인 상태이십니까?');
      return;
    }
    // 모든 정보가 나중에 논의 할 options에로드됩니다.
    const rzp1 = new window.Razorpay(options);

    // 선택한 결제 방법을 검색하려는 경우
    rzp1.on('payment.submit', (response) => {
      paymentMethod.current = response.method;
    });

    // 거래 실패시 결제 ID를 검색
    rzp1.on('payment.failed', (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });

    // razorpay 체크아웃 모달 열기
    rzp1.open();
  };


  // 결제 서버에 알리기
  const handlePayment = async (status, orderDetails = {}) => {
    await Axios.post(`${serverBaseUrl}/payment`,
      {
        status,
        orderDetails,
      });
  };


  // 다음 단계에서이 객체를 작성 할 것입니다.
  const options = {},

  useEffect(() => {
    console.log('레이저페이');
    displayRazorpay(options);
  }, []);

  return null;
};

export default RenderRazorpay;
```

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

이제 통합의 가장 중요한 부분입니다.

```js
const options = {
  key: keyId, // 프롭스로부터 키 ID
  amount, // 프롭스로부터 최소 단위 금액
  currency, // 프롭스로부터 통화
  name: "amit", // 결제 모달에 표시할 조직의 제목
  // image, // 사용자 정의 로고 URL
  order_id: orderId, // 프롭스로부터 주문 ID
  // 이 핸들러 메서드는 항상 결제에 성공했을 때 실행됩니다.
  handler: (response) => {
    console.log("succeeded");
    console.log(response);
    paymentId.current = response.razorpay_payment_id;

    // 지불을 캡처하고 승인하는 가장 중요한 단계입니다. 이 작업은 백엔드 서버에서 수행할 수 있습니다.
    const succeeded =
      crypto.HmacSHA256(`${orderId}|${response.razorpay_payment_id}`, keySecret).toString() ===
      response.razorpay_signature;

    // 성공적으로 승인되면 결제를 성공으로 간주할 수 있습니다.
    if (succeeded) {
      handlePayment("succeeded", {
        orderId,
        paymentId,
        signature: response.razorpay_signature,
      });
    } else {
      handlePayment("failed", {
        orderId,
        paymentId: response.razorpay_payment_id,
      });
    }
  },
  modal: {
    confirm_close: true, // true로 설정하면 × 버튼을 클릭했을 때 확인이 필요합니다.
    // 체크아웃 모달이 닫힐 때 실행되는 함수입니다.
    // 이 모달이 닫히는 이유는 3가지가 있을 수 있습니다.
    ondismiss: async (reason) => {
      const { reason: paymentReason, field, step, code } = reason && reason.error ? reason.error : {};
      // 이유 1- 지불이 취소될 때. 이는 × 아이콘을 클릭하거나 명시적으로 지불을 취소할 때 발생할 수 있습니다.
      if (reason === undefined) {
        console.log("cancelled");
        handlePayment("Cancelled");
      }
      // 이유 2- 시간 초과로 인해 모달이 자동으로 닫힐 때
      else if (reason === "timeout") {
        console.log("timedout");
        handlePayment("timedout");
      }
      // 이유 3- 지불이 실패했을 때
      else {
        console.log("failed");
        handlePayment("failed", {
          paymentReason,
          field,
          step,
          code,
        });
      }
    },
  },
  // 이 속성을 사용하여 재시도를 활성화/비활성화할 수 있습니다.
  // 기본적으로 활성화되어 있습니다.
  retry: {
    enabled: false,
  },
  timeout: 900, // 시간 제한(초)
  theme: {
    color: "", // 체크아웃 모달에 대한 사용자 정의 색상
  },
};
```

## 단계 5: 이제 결제를 진행해 봅시다.

이렇게 보입니다.

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

![2024-06-22-RazorpayPaymentGatewayIntegrationInNodeJSReactJS_2](/assets/img/2024-06-22-RazorpayPaymentGatewayIntegrationInNodeJSReactJS_2.png)
