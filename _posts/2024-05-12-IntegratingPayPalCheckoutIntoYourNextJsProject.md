---
title: "당신의 NextJs 프로젝트에 PayPal Checkout 통합하기"
description: ""
coverImage: "/assets/img/2024-05-12-IntegratingPayPalCheckoutIntoYourNextJsProject_0.png"
date: 2024-05-12 23:01
ogImage: 
  url: /assets/img/2024-05-12-IntegratingPayPalCheckoutIntoYourNextJsProject_0.png
tag: Tech
originalTitle: "Integrating PayPal Checkout Into Your Next.Js Project"
link: "https://medium.com/@programming-advice/integrating-paypal-checkout-into-your-next-js-project-b395d3d81254"
---


## NEXT.JS 앱 라우터에 관한 기사

![이미지](/assets/img/2024-05-12-IntegratingPayPalCheckoutIntoYourNextJsProject_0.png)

참고: Next.Js 앱 라우터를 사용할 것입니다. 페이지 라우터가 아닙니다.

간단한 전자상거래 스토어를 만드는 데 항상 고민했었습니다. 카트와 체크아웃이 제 머리를 얽히게 만들었는데, Stripe, PayPal 또는 심지어 Square를 웹사이트에 통합하려고 노력했기 때문입니다.



하지만 전자 상거래 스토어에서의 고난이 그치지 않았습니다. 결제 통합 시에도 고난이 있었습니다. 그래서 웹사이트용 결제 포털을 만드는 일에 나는 압도되었습니다. "이걸 어떻게 해야하지?"라고 스스로 물었습니다.

Square는 웹사이트에 통합하기 가장 어려운 지불 프로세서입니다. 대면 거래에 더 적합합니다. 그럼에도 불구하고 Square로 설정을 해보았지만 전혀 실패했습니다.

이어 Stripe로 넘어가 보겠습니다. 이것은 온라인 비즈니스에 좋은 옵션입니다. 그러나 고객 서비스와 관련된 다른 문제로 통합에 들어가기 전에 실패했습니다. 그래서 다른 것을 찾아봐야 했습니다.

마지막으로 PayPal을 시도해 본 결과, 다른 온라인 비즈니스에서 성공을 들은 뒤, PayPal로 결제 포털을 만드는 데 성공했습니다. 이제 그 방법을 보여드릴 차례입니다. 그러니 함께 알아보겠습니다:



# 시작하기

![이미지](/assets/img/2024-05-12-IntegratingPayPalCheckoutIntoYourNextJsProject_1.png)

알겠어요. 저는 뭔가 간단한 것을 이루고 싶었어요. 사용자가 지불할 금액을 선택하고 지불하도록 하고 싶었어요. 그건 충분히 간단한 목표죠.

시작하려면 API 엔드포인트를 만드는 방법이 필요합니다. 우리는 App Router를 사용하기 때문에 API 엔드포인트에 대한 제 게시물을 확인해주세요.



만약 당신이 이 글을 읽고 있고 Next.Js 프로젝트를 어떻게 생성하는지 모른다면 뭐하고 있는 거야!? 어쨌든, Next.Js 프로젝트를 만들려면 터미널에서 npx create-next-app@latest을 실행하면 됩니다.

# 금액 구하는 중

이어서, 지불 포털용 페이지를 생성하세요. 또한, 처음에 payment-form이라고 이름 지은 컴포넌트를 만드세요. 왜냐하면 금액 페이지를 체크아웃 페이지와 결합할 것이라고 생각했기 때문입니다. 그러나 결국 그렇게 하지 않았습니다.

그리고 우리가 하는 동안, API 엔드포인트와 이를 위해 필요한 나머지 파일들도 만들어봅시다. 마지막에는 이렇게 된 것처럼 보일 거에요:



```js
프로젝트/
│
├──페이지/api/
│   ├── get-token.ts
|   ├── paypal-client-id.ts
|   ├── paypal.ts
└──src/app
    ├──결제-포털/
    │   ├── page.tsx
    └── 결제-페이지/
    │  ├── page.tsx
    ├── 컴포넌트/
    │   ├── payment-form.tsx
    │   ├── paypal-buttons.tsx
    ├── layout.tsx
    ├── page.tsx
```

우리는 `payment-form.tsx` 파일 맨 위에 ‘use client’를 추가해서, 이 파일의 코드를 기본 서버 측이 아닌 클라이언트 측으로 만들 수 있습니다.

또한, react에서 `useState` 훅과 axios, 그리고 next/navigation에서 `useRouter` 훅을 import 해보겠습니다:

```js
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
```



이제 PaymentFormProps 인터페이스를 사용하여 PaymentForm 컴포넌트의 예상 프롭을 정의해 봅시다.

```js
interface PaymentFormProps {
  onSuccess: (orderId: string) => void;
}
```

우리는 onSuccess를 프롭으로 받는 함수형 컴포넌트를 정의해야 합니다. 이를 PaymentForm이라고 부르겠습니다.

```js
const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess }) => {

}
```


이제, handlePaymentSubmit이란 이름의 함수를 만들어서 결제 양식 제출을 처리하는 함수를 만들겠습니다. 이 함수는 POST 요청을 사용하여 api/paypal로 결제 양식을 제출하려 합니다. 성공하면 Payment-Page로 이동합니다. 실패하면 오류 메시지를 표시합니다:

```js
  const handlePaymentSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post('/api/paypal', { amount });

      setLoading(false);

      if (response.data.success) {
        onSuccess(response.data.orderId);
        router.push(`/Payment-Page?amount=${amount}`);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error('결제 초기화 오류:', error);
      setLoading(false);
      setError('결제 초기화 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };
```

마지막으로, 입력 필드와 제출 버튼을 추가하겠습니다:

```js
  return (
    <div className="flex flex-col gap-4 items-center">
      <label>
        금액 입력:
      </label>
      <input type="number" name="amount" value={amount} onChange={handleAmountChange} className='text-black text-xl font-semibold p-2 rounded'/>
      <button onClick={handlePaymentSubmit} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
        {loading ? '처리 중...' : '결제 제출'}
      </button>
      {error && <p>오류: {error}</p>}
    </div>
  );
```



새로운 코드 아래에 `export default PaymentForm;`를 추가해주세요.

최종 payment-form.tsx 코드는 다음과 같이 보여야 합니다:

```js
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface PaymentFormProps {
  onSuccess: (orderId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handlePaymentSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post('/api/paypal', { amount });

      setLoading(false);

      if (response.data.success) {
        onSuccess(response.data.orderId);
        router.push(`/Payment-Page?amount=${amount}`);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setLoading(false);
      setError('An error occurred while initiating payment. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <label>
        Enter Amount: 
      </label>
      <input type="number" name="amount" value={amount} onChange={handleAmountChange} className='text-black text-xl font-semibold p-2 rounded'/>
      <button onClick={handlePaymentSubmit} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
        {loading ? 'Processing...' : 'Submit Payment'}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default PaymentForm;
```

# 주문 생성하기



paypal.ts 파일에 NextApiRequest와 NextApiResponse를 next에서, axios를 그리고 get-token.ts에서 getToken을 import해서 추가해봐요. getToken 코드는 나중에 보여줄게요.

```js
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getToken from './get-token ';
```

이제 API 엔드포인트를 만들어봅시다. 먼저 HTTP 메소드가 POST인지 확인한 후, 요청 본문에서 amount를 추출해요. 우리는 getToken 함수를 호출해서 액세스 토큰을 받을 거에요. PayPal에서 생성된 액세스 토큰은 .env 파일에 있어야 해요. 코드는 그런 다음 PayPal API로 POST 요청을 보낼 거에요:

```js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;
      const accessToken = await getToken();

      const paypalResponse = await axios.post(
        'https://api.paypal.com/v2/checkout/orders',
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: amount.toString(),
              },
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { id: orderId } = paypalResponse.data;

      res.status(200).json({ success: true, orderId });
    } catch (error) {
      console.error('PayPal API error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
```



위의 코드를 한국어로 번역하면 다음과 같습니다:

```js
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getToken from './get-token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;
      const accessToken = await getToken();

      const paypalResponse = await axios.post(
        'https://api.paypal.com/v2/checkout/orders',
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: amount.toString(),
              },
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { id: orderId } = paypalResponse.data;

      res.status(200).json({ success: true, orderId });
    } catch (error) {
      console.error('PayPal API 에러:', error);
      res.status(500).json({ success: false, error: '내부 서버 오류' });
    }
  } else {
    res.status(405).json({ success: false, error: '허용되지 않은 메소드' });
  }
}
```

# Access Token 가져오기

get-token.ts 코드에 추가할 예정입니다.



axios를 가져와봐요:

```js
import axios from 'axios';
```

그리고 PAYPAL_CLIENT_ID 및 PAYPAL_CLIENT_SECRET를 환경 변수에서 가져와요:

```js
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
```



그럼 우리는 PayPal API에서 액세스 토큰을 검색하는 getToken이라는 비동기 함수를 만들고 싶어요:

```js
const getToken = async () => {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await axios.post(
    'https://api.paypal.com/v1/oauth2/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
    }
  );

  return response.data.access_token;
};

export default getToken;
```

전체 코드는 다음과 같습니다:

```js
import axios from 'axios';

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const getToken = async () => {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await axios.post(
    'https://api.paypal.com/v1/oauth2/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
    }
  );

  return response.data.access_token;
};

export default getToken;
```



# PayPal 버튼 만들기

PayPal 버튼을 만들기 위해 paypal-buttons.tsx 파일을 서버 측이 아닌 클라이언트 측으로 변경해 보겠습니다. ‘use client’를 추가해 주세요. 그리고 여기서 react에서 useEffect 훅을 import해 주세요:

```js
'use client';
import React, { useEffect } from 'react';
```

TypeScript를 사용하기 때문에 전역 창에 속성을 추가하여 오류를 방지해 보겠습니다:



```js
전역을 선언합니다:
   
declare global {
    interface Window {
      paypal?: any;
    }
}

이제 네 개의 속성 유형을 지정하는 객체를 인수로 취하는 함수형 컴포넌트를 정의해야 합니다:

const PayPalPaymentButton = ({ amount, paypalClientId, onSuccess, onError }: { amount: number; paypalClientId: string | null; onSuccess: () => void; onError: (err: any) => void; }) => {

}

함수형 컴포넌트인 PayPalPaymentButton 안에서 useEffect를 사용하여 컴포넌트가 마운트될 때 PayPal SDK 스크립트를 DOM에 추가하세요:



  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}`;
    script.async = true;
    script.onload = () => {
      initializePayPalButton();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

이제 웹페이지에 PayPal 버튼을 렌더링하는 함수를 만들어봅시다:

  const initializePayPalButton = () => {
    window.paypal.Buttons({
      createOrder: function(data: any, actions: any) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount,
              currency_code: 'USD', // 원하는 통화로 변경
            },   
            application_context: {
              user_action: 'PAY_NOW',
              shipping_preference: 'NO_SHIPPING',
              payment_method: { payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED' },
              return_url: 'https://YOUR_WEBSITE_URL',
              cancel_url: 'https://YOUR_WEBSITE_URL',
            },
          }],
        });
      },
      onApprove: function(data:any, actions:any) {
        return actions.order.capture().then(function(details: any) {
          onSuccess();
        });
      },
      onError: function(err: any) {
        onError(err);
      },
    }).render('#paypal-button-container');
  };

이제 버튼을 표시하는 것만 남았습니다:
```



```js
return <div id="paypal-button-container" className='bg-gray-200'></div>;
```

최종 코드:

```js
'use client';
import React, { useEffect } from 'react';

declare global {
    interface Window {
      paypal?: any;
    }
}

const PayPalPaymentButton = ({ amount, paypalClientId, onSuccess, onError }: { amount: number; paypalClientId: string | null; onSuccess: () => void; onError: (err: any) => void; }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}`;
    script.async = true;
    script.onload = () => {
      initializePayPalButton();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePayPalButton = () => {
    window.paypal.Buttons({
      createOrder: function(data: any, actions: any) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount,
              currency_code: 'USD',
            },   
            application_context: {
              user_action: 'PAY_NOW',
              shipping_preference: 'NO_SHIPPING',
              payment_method: { payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED' },
              return_url: 'https://YOUR_WEBSITE_URL',
              cancel_url: 'https://YOUR_WEBSITE_URL',
            },
          }],
        });
      },
      onApprove: function(data:any, actions:any) {
        return actions.order.capture().then(function(details: any) {
          onSuccess();
        });
      },
      onError: function(err: any) {
        onError(err);
      },
    }).render('#paypal-button-container');
  };

  return <div id="paypal-button-container" className='bg-gray-200'></div>;
};

export default PayPalPaymentButton;
```

# PayPal 클라이언트 ID 가져오기



나중에 필요할 것이므로 지금 처리해 봐요. 당신의 paypal-client-id는 환경 변수 중에 PAYPAL_CLIENT_ID가 있는지 확인하고 그것을 클라이언트 쪽으로 보내요:

```js
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const paypalClientId = process.env.PAYPAL_CLIENT_ID;

  if (!paypalClientId) {
    return res.status(500).json({ error: 'PayPal client ID not found.' });
  }

  return res.status(200).json({ paypalClientId });
}
``` 

# Payment-Portal Page.tsx에 코드 추가하기



```js
import PaymentComponent from "../components/payment-form";
```

결제 성공에 대한 함수를 정의하세요:

```js
  const handlePaymentSuccess = (orderId: string) => {
    console.log('결제 성공! 주문 ID:', orderId);
  };
```

PaymentComponent를 반환하세요:



```jsx
  return (
    <main>
      <div>
        <PaymentComponent onSuccess={handlePaymentSuccess} />
      </div>
    </main>
  );
```

# Payment-Page 페이지에 코드 추가하기

파일의 맨 위에 'use client';를 추가해야 합니다. 그 다음으로 useEffect 훅, useState 훅, 그리고 Suspense를 react에서 임포트해주세요. 또한 next/navigation에서 useRouter와 useSearchParams를 임포트해주세요. 마지막으로 paypal-buttons.tsx에서 PayPalPaymentButtons를 임포트해주세요:

```jsx
'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PayPalPaymentButtons from '../ui/PayPalButtons';
```



이제 paymentPage라는 기능 구성 요소를 만들 수 있습니다. 내부에서 useRouter 훅을 사용하여 router 객체에 액세스하는 코드를 추가하고 URL에서 검색 매개 변수를 가져 오는 것을 시도해 보겠습니다. 또한 상태 변수를 선언해 봅시다:

```js
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams ? searchParams.get('amount') : null;
  const [paypalClientId, setPaypalClientId] = useState<string | null>(null);
```

useEffect 훅을 사용하여 API 엔드 포인트 paypal-client-id.ts에서 PayPal 클라이언트 ID를 가져 오는 것을 시도해 보겠습니다:

```js
  useEffect(() => {
    fetch('/api/paypal-client-id')
      .then((response) => response.json())
      .then((data) => {
        if (data.paypalClientId) {
          setPaypalClientId(data.paypalClientId);
        } else {
          console.error('PayPal 클라이언트 ID를 찾을 수 없습니다.');
        }
      })
      .catch((error) => {
        console.error('PayPal 클라이언트 ID를 가져 오지 못했습니다:', error);
      });
  }, []);
```



페이팔 클라이언트 ID가 없는 경우 "로딩 중..."이 표시됩니다:

```js
if (!paypalClientId) {
  return <div>로딩 중...</div>;
}
```

성공 및 오류 처리를 다음과 같이 수행할 거에요:

```js
const handleSuccess = () => {
  router.push('/');
};

const handleError = (error: any) => {
  console.error('결제 오류:', error);
};
```



그럼 모든 것을 표시할 거예요:

```js
  return (
    <div className='bg-blue-900'>
      <div className="w-full bg-blue-900 flex flex-col justify-center items-center">
      <h1 className="md:text-5xl text-3xl font-bold text-blue-500">결제 페이지</h1>
      <p>총액: ${amount}</p>
      <div className="w-screen p-14">
      <PayPalPaymentButtons amount={parseFloat(amount as string)} paypalClientId={paypalClientId} onSuccess={handleSuccess} onError={handleError} />
      </div>
      </div>
    </div>
  );
```

실제 페이지는 Suspense 경계로 둘러싸여야 합니다:

```js
const actualPage: React.FC = () => {
  return <Suspense fallback={<div>Loading...</div>}><PaymentPage /></Suspense>;
}

export default actualPage;
```



전체 코드:

```js
'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PayPalPaymentButtons from '../ui/paypal-buttons';

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams ? searchParams.get('amount') : null;

  const [paypalClientId, setPaypalClientId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/paypal-client-id')
      .then((response) => response.json())
      .then((data) => {
        if (data.paypalClientId) {
          setPaypalClientId(data.paypalClientId);
        } else {
          console.error('PayPal client ID not found.');
        }
      })
      .catch((error) => {
        console.error('Failed to fetch PayPal client ID:', error);
      });
  }, []);

  if (!paypalClientId) {
    return <div>Loading...</div>;
  }

  const handleSuccess = () => {
    router.push('/');
  };

  const handleError = (error: any) => {
    console.error('Payment error:', error);
  };

  return (
    <div className='bg-blue-900'>
      <div className="w-full bg-blue-900 flex flex-col justify-center items-center">
        <h1 className="md:text-5xl text-3xl font-bold text-blue-500">Payment Page</h1>
        <p>Total Amount: ${amount}</p>
        <div className="w-screen p-14">
          <PayPalPaymentButtons amount={parseFloat(amount as string)} paypalClientId={paypalClientId} onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
    </div>
  );
};

const actualPage: React.FC = () => {
  return <Suspense fallback={<div>Loading...</div>}><PaymentPage /></Suspense>;
}

export default actualPage;
```

이렇게해요. 이 글은 Next.js 프로젝트에 PayPal 체크아웃을 통합하는 것에 대한 내용이었습니다. 파일 이름과 코드의 일부 이름으로 보았듯이, 모든 것이 가지고 있기 전에 약간 실험을 해봤습니다. 이 글이 결제 페이지를 만들 때 올바른 방향으로 안내가 되길 바랍니다. 이 튜토리얼을 좋아하셨다면 박수를 보내주시고, 팔로우를 눌러주세요. 질문이 있으시면 언제든지 답변해 드리겠습니다.

즐거운 코딩되세요!
