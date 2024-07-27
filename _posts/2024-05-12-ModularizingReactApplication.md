---
title: "리액트 애플리케이션 모듈화하기"
description: ""
coverImage: "/assets/img/2024-05-12-ModularizingReactApplication_0.png"
date: 2024-05-12 21:53
ogImage: 
  url: /assets/img/2024-05-12-ModularizingReactApplication_0.png
tag: Tech
originalTitle: "Modularizing React Application"
link: "https://medium.com/@kemaltf_/modularizing-react-application-89557d4c3ca4"
---


리액트 애플리케이션에서는 뷰 레이어 이상의 것을 사용하는 게 일반적입니다. 라우터, 로컬 저장소, 네트워크 요청, 보안 기능 등이 필요할 수 있습니다. 이러한 문제들을 모두 뷰 컴포넌트나 훅 안에서 처리하려고 하면 혼란을 초래하고 코드를 이해하기 어렵게 만들 수 있습니다.

컴포넌트에 모든 것을 쑤셔 넣기보다는 각각 다른 파일이나 폴더로 관심사를 분리하는 것이 더 좋습니다. 이런 식으로 코드를 구성하면 응용 프로그램을 이해하는 데 필요한 정신적 부담을 줄일 수 있습니다. 한 번에 한 가지에 집중할 수 있어서 유지보수와 새로운 기능 추가가 더 쉬워집니다.

하나의 접근 방법은 뷰-모델-데이터 레이어링 개념을 사용하는 것입니다. 이는 코드를 세 개의 레이어로 분리하는 것을 포함합니다. 뷰 레이어(리액트 컴포넌트), 모델 레이어(비즈니스 로직 및 계산), 데이터 레이어(네트워크 요청, 로컬 저장소 등)로 구분합니다. 이를 통해 응용 프로그램의 각 측면을 독립적으로 생각할 수 있어서 집중력을 높이고 코드를 더 모듈화하고 유지보수하기 쉽게 만들 수 있습니다.

이러한 원칙은 새로운 것이 아니며 웹 시대 이전의 대형 GUI 애플리케이션에서 사용되었습니다. 이러한 확립된 패턴을 리액트 애플리케이션에 적용함으로써 더 조직적이고 관리 가능한 코드베이스를 만들 수 있습니다.



# React 어플리케이션의 발전

React 어플리케이션이 성장함에 따라 초기에는 모든 로직을 컴포넌트 내부에 넣을 것입니다. 그러나 코드가 추가될수록 유지보수하기 어려운 혼돈스러운 상황이 될 수 있습니다. 이를 피하려면 확장 가능한 프런트엔드 앱을 구축하기 위해 다음 단계를 따르세요:

1. 간단하게 시작하기: 처음에는 React 컴포넌트 내에 모든 로직이 들어갈 수 있으며, 동적 요소가 포함된 HTML처럼 보일 수 있습니다.

2. 코드 구조화: 앱이 확장됨에 따라 코드를 뷰, 모델 및 데이터와 같은 별도의 레이어로 구성합니다. 이렇게 함으로써 복잡성을 줄이고 유지보수를 쉽게 만듭니다.



모듈화: 코드를 더 작고 재사용 가능한 모듈로 분할하여 앱 전반에 걸쳐 관리하고 재사용하기 쉽게 합니다.

패턴 수립: 코드 구조, 명명 및 폴더 구성을 위한 명확한 패턴과 규칙을 정하여 일관성과 명확성을 유지합니다.

수립된 패턴 활용: 검증된 디자인 패턴과 업계 모베스트 프랙티스를 활용하여 앱 아키텍처를 이끄는 우량한 방법을 찾아 공통된 함정을 피합니다.

문서화: 코드베이스를 효과적으로 문서화하여 개발자를 안내하고 모든 사람이 앱의 구조와 설계 결정을 이해할 수 있도록 합니다.



## 단일 구성 요소 애플리케이션

![이미지](/assets/img/2024-05-12-ModularizingReactApplication_0.png)

## 다중 구성 요소 애플리케이션

복잡한 구성 요소를 작은 구성 요소로 분할하는 것은 좋은 아이디어입니다. 이는 최종 HTML의 구조를 반영하며 한 번에 한 부분에 초점을 맞출 수 있게 해줍니다.



![ModularizingReactApplication_1](/assets/img/2024-05-12-ModularizingReactApplication_1.png)

앱이 커질수록 단순히 UI에 관한 것만이 아닙니다. 네트워크 요청을 처리하고 UI용 데이터를 형태로 변경하며, 서버에 대한 데이터를 수집해야 할 것입니다. 모든 것을 컴포넌트에 넣는 건 이상하게 느껴질 수 있습니다. 사용자가 보는 것뿐만이 아닙니다. 게다가 어떤 컴포넌트는 너무 많은 내부 상태를 유지해야 합니다.

## 훅을 이용한 상태 관리

이러한 논리를 서로 다른 위치에 두는 것이 더 낫습니다. React에서는 이렇게 할 수 있도록 여러분의 훅을 만들 수 있습니다. 훅은 상태를 공유하고 상태가 변경될 때의 로직을 공유하는 데 도움이 됩니다.



<img src="/assets/img/2024-05-12-ModularizingReactApplication_2.png" />

하나의 컴포넌트를 여러 부분으로 나누었군요. 몇 개의 간단한 디스플레이 전용 컴포넌트와 컴포넌트 상태를 다루는 재사용 가능한 훅이 있습니다.

하지만 때로는 훅 안에 상태를 관리하는 것이 아닌 계산을 하는 로직이 있다면서요.

## 비즈니스 모델이 나타났습니다



![모듈화된 React 애플리케이션의 이미지](/assets/img/2024-05-12-ModularizingReactApplication_3.png)

이 논리를 다른 곳으로 옮기면 정말 도움이 될 수 있다는 것을 깨달았군요. 이것을 분리함으로써, 논리가 더 집중되고 특정 뷰에 의존하지 않습니다. 따라서 데이터 매핑 및 널 값을 확인하는 간단한 객체를 만들기 시작합니다. 이러한 객체를 더 많이 만들면서 상속 또는 다형성을 사용하면 모든 것이 더 깔끔해집니다. 다른 영역에서 디자인 패턴을 적용하여 프론트엔드 애플리케이션을 더 깨끗하고 조직화된 상태로 만들려고 합니다.

# 계층화된 프론트엔드 애플리케이션

애플리케이션이 성장함에 따라 일부 패턴에 주목할 때가 옵니다. 사용자 인터페이스와 관련이 없고 데이터가 어디에서 왔는지 신경 쓰지 않는 객체들이 있습니다. 이러한 객체들을 다른 계층으로 분리하려고 합니다. 각 계층을 자세히 설명해 드릴게요: 표현(Presentation), 도메인(Domain), 그리고 데이터(Data) 계층입니다.



<img src="/assets/img/2024-05-12-ModularizingReactApplication_4.png" />

위의 개요를 통해 코드를 구조화하는 방법과 다음 단계를 알 수 있습니다. 하지만 접해 보기 전에 고려해야 할 많은 세부 사항이 있습니다.

다음 섹션에서는 실제 프로젝트의 기능을 안내해 드릴 것입니다. 이를 통해 대규모 프론트엔드 응용 프로그램에 유용한 패턴 및 설계 원칙을 보여 드릴 것입니다.

# 예제 프로젝트



## 결제 기능 구축

먼저 기본적인 온라인 주문 앱으로 시작해 봅시다. 여기서 고객들은 제품을 선택하고 주문에 추가할 수 있습니다. 그리고 나중에 결제 방법을 선택하여 구매를 완료할 수 있습니다.

![이미지](/assets/img/2024-05-12-ModularizingReactApplication_5.png)

알겠어요. 지금은 결제 컴포넌트에 집중해 봅시다. 결제 방법 옵션들은 서버 측에서 구성되어 있어서, 서로 다른 국가의 고객들은 서로 다른 옵션을 볼 수 있습니다. 예를 들어, Apple Pay는 특정 국가에서만 이용 가능할 수 있습니다. 결제 방법용 라디오 버튼은 백엔드로부터의 데이터에 의해 제어됩니다. 만약 결제 방법이 반환되지 않는다면, 아무것도 보여주지 않고 기본값으로 "현금 결제"를 가정할 것입니다.



테이블 태그를 Markdown 형식으로 변경해 보세요.

Setup your mock server

- Install JSON Server

```js
npm install -g json-server
```

2. Create a Mock Data File payment-methods.json



```json
{
  "paymentMethods": [
    { "name": "신용 카드" },
    { "name": "PayPal" },
    { "name": "Apple Pay" }
  ]
}
```

3. JSON Server 시작

```js
json-server --watch payment-methods.json --port 3001
```

결제 과정은 건너뛰고 Payment 컴포넌트만 살펴봄으로써 간단하게 유지할 것입니다. 여기에 코드가 어떻게 나올지에 대한 기본적인 예시가 있습니다:



```js
src/Payment.tsx…

  export const Payment = ({ amount }: { amount: number }) => {
    const [paymentMethods, setPaymentMethods] = useState<LocalPaymentMethod[]>(
      []
    );
  
    useEffect(() => {
      const fetchPaymentMethods = async () => {
        const url = "http://localhost:3001/paymentMethods";
  
        const response = await fetch(url);
        const methods: RemotePaymentMethod[] = await response.json();
  
        if (methods.length > 0) {
          const extended: LocalPaymentMethod[] = methods.map((method) => ({
            provider: method.name,
            label: `Pay with ${method.name}`,
          }));
          extended.push({ provider: "cash", label: "Pay in cash" });
          setPaymentMethods(extended);
        } else {
          setPaymentMethods([]);
        }
      };
  
      fetchPaymentMethods();
    }, []);
  
    return (
      <div>
        <h3>Payment</h3>
        <div>
          {paymentMethods.map((method) => (
            <label key={method.provider}>
              <input
                type="radio"
                name="payment"
                value={method.provider}
                defaultChecked={method.provider === "cash"}
              />
              <span>{method.label}</span>
            </label>
          ))}
        </div>
        <button>${amount}</button>
      </div>
    );
  };
```

이 코드는 꽤 일반적이며, 초보자를 위한 튜토리얼에서 가져온 것일 것입니다. 그렇게 나쁘지 않지만, 서로 다른 것들을 한 곳에 섞어서 이해하기 어렵게 만들었습니다.

## 초기 구현의 문제점

원래 코드의 문제점은 주로 Payment 컴포넌트가 너무 많은 일을 하고 있다는 것입니다. 다양한 작업을 처리하므로 코드를 이해하기 어렵습니다. 변경을 하려면 네트워크 요청을 시작하는 방법, 컴포넌트용 데이터 형식을 지정하는 방법, 각 결제 방법을 표시하는 방법, 그리고 Payment 컴포넌트 자체의 렌더링 로직을 이해해야 합니다.



지금은 간단한 예제에서는 큰 문제가 되지는 않아요. 하지만 코드가 커지고 복잡해지면 리팩토링이 필요해질 거에요.

뷰 코드와 비뷰 코드를 서로 다른 위치에 분리하는 것이 좋은 생각이죠. 뷰는 비뷰 로직보다 자주 변경되곤 해요. 이를 분리함으로써 특정 모듈에 집중하여 새로운 기능을 구현하기가 더 쉬워집니다.

## 뷰 코드와 비뷰 코드의 분리

뷰 코드와 비뷰 코드를 분리해봅시다. React에서는 사용자 정의 훅을 사용하여 컴포넌트의 상태를 관리하면서 컴포넌트 자체는 대부분 상태가 없도록 유지할 수 있어요. Extract Function 기법을 사용하여 usePaymentMethods라는 함수를 생성할 거에요. "use" 접두사는 React에서 해당 함수가 상태를 처리하는 훅이라는 것을 나타내는 관례입니다.



표 태그를 마크다운 형식으로 변경하십시오.



뷰를 더 나눠서 하위 구성 요소를 추출해 보는 건 어때요? 컴포넌트를 순수 함수로 만들면 (입력에 따라 결과가 예측 가능한) 테스트, 이해 및 재사용에 매우 도움이 될 거예요. 기억하세요, 컴포넌트가 작을수록 재사용될 가능성이 높아집니다.

우리는 "함수 추출" 기술을 다시 사용할 수 있어요 (React에서는 컴포넌트를 본질적으로 함수로 취급하기 때문에 "컴포넌트 추출"이라고 부를 수도 있어요).

```js
src/Payment.tsx…

const PaymentMethods = ({
  paymentMethods,
}: {
  paymentMethods: LocalPaymentMethod[];
}) => (
  <>
    {paymentMethods.map((method) => (
      <label key={method.provider}>
        <input
          type="radio"
          name="payment"
          value={method.provider}
          defaultChecked={method.provider === "cash"}
        />
        <span>{method.label}</span>
      </label>
    ))}
  </>
);
```

Payment 컴포넌트는 PaymentMethods를 직접 사용할 수 있으므로 다음과 같이 단순화할 수 있답니다.



src/PaymentComponent.tsx…

```js
export const Payment = ({ amount }: { amount: number }) => {
    const { paymentMethods } = usePaymentMethods();

    return (
      <div>
        <h3>결제</h3>
        <PaymentMethods paymentMethods={paymentMethods} />
        <button>${amount}</button>
      </div>
    );
  };
```

PaymentMethods는 상태를 가지지 않는 순수 함수(순수 컴포넌트)입니다. 기본적으로 문자열 서식 변환 함수입니다.

## 로직을 캡슐화하기 위한 데이터 모델링



지금까지 우리가 한 변경 사항은 뷰와 뷰가 아닌 코드를 분리하는 데 초점을 맞춰왔는데, 이것은 좋은 일이죠. 훅은 데이터를 가져오고 형태를 바꾸는 것을 관리하며, Payment와 PaymentMethods 모두 비교적 작고 이해하기 쉬운 형태가 되었어요.

하지만 조금 더 자세히 살펴보면 아직 개선할 부분이 있습니다. 예를 들어, PaymentMethods 컴포넌트에서는 결제 수단이 기본적으로 선택되어야하는지 여부를 결정하는 일부 로직이 있습니다.

```js
src/Payment.tsx…

  const PaymentMethods = ({
    paymentMethods,
  }: {
    paymentMethods: LocalPaymentMethod[];
  }) => (
    <>
      {paymentMethods.map((method) => (
        <label key={method.provider}>
          <input
            type="radio"
            name="payment"
            value={method.provider}
            defaultChecked={method.provider === "cash"}
          />
          <span>{method.label}</span>
        </label>
      ))}
    </>
  );
```

뷰에서 이러한 테스트 문은 로직 누출로 간주될 수 있으며, 시간이 지남에 따라 서로 다른 곳에 흩어져 수정이 더 어려워질 수 있습니다.



데이터를 가져올 때 데이터 변환에서 논리 누출 가능성이 또 하나 있을 수 있습니다.

```js
 useEffect(() => {
      const fetchPaymentMethods = async () => {
        const url = "https://online-ordering.com/api/payment-methods";
  
        const response = await fetch(url);
        const methods: RemotePaymentMethod[] = await response.json();
  
        if (methods.length > 0) {
          const extended: LocalPaymentMethod[] = methods.map((method) => ({
            provider: method.name,
            label: `Pay with ${method.name}`,
          }));
          extended.push({ provider: "cash", label: "Pay in cash" });
          setPaymentMethods(extended);
        } else {
          setPaymentMethods([]);
        }
      };
  
      fetchPaymentMethods();
    }, []);
```

methods.map 안의 익명 함수가 변환을 묵묵히 수행합니다. 위의 `method.provider === "cash"`와 함께 이 논리는 클래스로 추출할 수 있습니다. 데이터와 동작을 단일 위치로 중앙 집중화한 PaymentMethod 클래스를 만들 수 있습니다.

```js
// src/PaymentMethod.ts

interface RemotePaymentMethod {
  name: string;
}

export interface LocalPaymentMethod {
  provider: string;
  label: string;
  isDefaultMethod: boolean;
}

export function createPaymentMethod(remotePaymentMethod: RemotePaymentMethod): LocalPaymentMethod {
  const provider = remotePaymentMethod.name;
  const label = provider === 'cash' ? `Pay in ${provider}` : `Pay with ${provider}`;
  const isDefaultMethod = provider === 'cash';

  return { provider, label, isDefaultMethod };
}
```  



이제,

```js
import { createPaymentMethod } from './PaymentMethod';

useEffect(() => {
  const fetchPaymentMethods = async () => {
    const url = "https://online-ordering.com/api/payment-methods";

    const response = await fetch(url);
    const methods: RemotePaymentMethod[] = await response.json();

    if (methods.length > 0) {
      // Memetakan setiap elemen dari methods menjadi objek LocalPaymentMethod
      const localMethods: LocalPaymentMethod[] = methods.map(createPaymentMethod);

      // Menambahkan metode pembayaran "cash" sebagai opsi tambahan
      localMethods.push({ provider: "cash", label: "Pay in cash" });

      // Mengatur state paymentMethods dengan array hasil pemetaan
      setPaymentMethods(localMethods);
    } else {
      // Jika tidak ada metode pembayaran yang ditemukan, set state menjadi array kosong
      setPaymentMethods([]);
    }
  };

  fetchPaymentMethods();
}, []);
```

이제 Payment 컴포넌트를 작업을 완료하기 위해 함께 작동하는 여러 작은 부분들로 재구성하고 있어요.

![ModularizingReactApplication_6](/assets/img/2024-05-12-ModularizingReactApplication_6.png)



새로운 구조에는 여러 가지 이점이 있어요:

- 로직 캡슐화: 이 클래스는 모든 결제 방법 관련 로직을 캡슐화하여, 뷰에 내장하는 것보다 테스트와 수정이 더 쉬워졌어요.
- 순수한 기능성: 추출된 컴포넌트인 PaymentMethods는 도메인 객체 배열에만 의존하는 순수한 기능이에요. 이로 인해 외부 상태와 상호 작용할 필요 없이 쉽게 테스트하고 재사용할 수 있어요.
- 명확성과 모듈성: 각 부분이 명확하고 독립적으로 탐색할 수 있어요. 이 모듈식 접근법은 새로운 요구 사항이 발생했을 때 코드 수정을 간단하게 만들어줘요.

# 새로운 요구 사항: 자선 단체에 기부하기

새로운 기능인 자선 단체에 소액을 기부할 수 있는 기능을 애플리케이션에 추가하고 있어요. 고객이 주문과 함께 작은 금액을 자선 단체에 기부할 수 있는 옵션을 제공할 거예요. 사용자의 주문 총액이 $19.80이라면, $0.20을 기부할 수 있는 옵션을 제공할 거예요. 동의하면, 해당 버튼에 표시되는 총 금액을 업데이트할 거예요.




![ModularizingReactApplication](/assets/img/2024-05-12-ModularizingReactApplication_7.png)

변경을 하기 전에 현재 코드 구조를 간단히 살펴봅시다. 코드를 구조화해서 각 부분을 폴더로 구분하는 것을 선호합니다. 이렇게 하면 규모가 커져도 쉽게 탐색할 수 있어요.

```js
src
      ├── App.tsx
      ├── components
      │   ├── Payment.tsx
      │   └── PaymentMethods.tsx
      ├── hooks
      │   └── usePaymentMethods.ts
      ├── models
      │   └── PaymentMethod.ts
      └── types.ts
```

우리 앱에서 App.tsx는 주 진입점으로 작동합니다. 이 파일에는 Payment 컴포넌트가 포함되어 있는데, 이 컴포넌트는 다양한 결제 옵션을 표시하기 위해 PaymentMethods를 활용합니다. usePaymentMethods 훅은 원격 서비스에서 데이터를 가져와 PaymentMethod 객체로 변환합니다. PaymentMethod 객체는 레이블과 기본 옵션 여부를 저장합니다.



## 내부 상태: 기부에 동의

이 페이지에서 체크박스를 선택한 사용자를 추적하기 위해 Payment에서 이러한 수정 사항을 구현하려면 agreeToDonate라는 부울 상태가 필요합니다.

```js
 // 새로운 기능
  const [agreeToDonate, setAgreeToDonate] = useState(false);

  const { total, tip } = useMemo(
    () => ({
      total: agreeToDonate ? Math.floor(amount + 1) : amount,
      tip: parseFloat((Math.floor(amount + 1) - amount).toPrecision(10)),
    }),
    [amount, agreeToDonate]
  );

  const handleChange = (event) => {
    setAgreeToDonate(event.target.checked);
  };
```

Math.floor 함수를 사용하여 숫자를 내림하여 사용자가 기부에 동의한 경우 올바른 금액을 얻을 수 있습니다. 내림 처리된 값과 원래 금액 간의 차이는 팁에 할당됩니다.



뷰 관점에서, JSX에는 간단한 설명과 함께 체크박스가 포함될 것입니다:

```js
src/Payment.tsx…

  return (
    <div>
      <h3>Payment</h3>
      <PaymentMethods options={paymentMethods} />
      <div>
        <label>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={agreeToDonate}
          />
          <p>
            {agreeToDonate
              ? "기부해 주셔서 감사합니다."
              : `나는 자선에 $${tip}을 기부하고 싶어합니다.`}
          </p>
        </label>
      </div>
      <button>${total}</button>
    </div>
  );
```

이러한 새로운 변경 사항으로 코드가 다시 여러 작업을 처리하기 시작합니다. 뷰 관련 코드와 비뷰 관련 코드가 혼합되지 않도록 주의깊게 관찰하는 것이 중요합니다. 불필요한 혼합이 발견된다면 분리할 수 있는 방법을 고려해보세요.

그러나 이것은 엄격한 규칙은 아닙니다. 작고 일관된 구성 요소의 경우, 모든 것을 깔끔하게 유지하여 전반적인 작동 방식을 이해하기 위해 여러 곳을 찾아다닐 필요가 없도록 해도 괜찮습니다. 그러나 컴포넌트 파일이 이해하기 어렵게 너무 커지지 않도록 주의해야 합니다.



# 훅을 활용하여 해결책 모색

이 상황에서는 기부 여부에 따라 팁과 총액을 계산할 수 있는 객체가 필요합니다. 사용자가 기부 여부를 변경할 때마다 업데이트된 총액과 팁을 반환해야 합니다. 

이 요구 사항을 충족하기 위해 이러한 로직을 캡슐화하는 사용자 정의 훅을 구현하는 것이 이상적입니다. 이 사용자 정의 훅은 사용자의 입력을 기반으로 총액 및 팁 값을 계산하며 깔끔하고 재사용 가능한 솔루션을 제공할 것입니다.

```js
src/hooks/useRoundUp.ts…

  export const useRoundUp = (amount: number) => {
    const [agreeToDonate, setAgreeToDonate] = useState<boolean>(false);
  
    const {total, tip} = useMemo(
      () => ({
        total: agreeToDonate ? Math.floor(amount + 1) : amount,
        tip: parseFloat((Math.floor(amount + 1) - amount).toPrecision(10)),
      }),
      [amount, agreeToDonate]
    );
  
    const updateAgreeToDonate = () => {
      setAgreeToDonate((agreeToDonate) => !agreeToDonate);
    };
  
    return {
      total,
      tip,
      agreeToDonate,
      updateAgreeToDonate,
    };
  };
```



그래서 뷰에서는 초기 금액을 전달하여 이 훅을 활용할 것입니다. 이 훅은 모든 필요한 상태를 내부적으로 관리할 것입니다. 사용자가 기부 선호도를 토글할 때마다 updateAgreeToDonate 함수를 사용하여 훅의 값을 수정할 수 있습니다. 그러면 업데이트된 총액과 팁 금액을 반영하기 위해 리렌더링이 트리거됩니다.

```js
src/components/Payment.tsx…

  export const Payment = ({ amount }: { amount: number }) => {
    const { paymentMethods } = usePaymentMethods();
  
    const { total, tip, agreeToDonate, updateAgreeToDonate } = useRoundUp(amount);
  
    return (
      <div>
        <h3>Payment</h3>
        <PaymentMethods options={paymentMethods} />
        <div>
          <label>
            <input
              type="checkbox"
              onChange={updateAgreeToDonate}
              checked={agreeToDonate}
            />
            <p>{formatCheckboxLabel(agreeToDonate, tip)}</p>
          </label>
        </div>
        <button>${total}</button>
      </div>
    );
  };
```

메시지 형식 지정 로직을 formatCheckboxLabel과 같은 도우미 함수로 추출하는 것은 실제로 컴포넌트의 코드를 단순화할 것입니다. 이 도우미 함수는 사용자가 기부에 동의했는지 여부에 따라 적절한 메시지를 생성하는 논리를 처리할 수 있습니다.

```js
const formatCheckboxLabel = (agreeToDonate: boolean, tip: number) => {
  return agreeToDonate
    ? "기부해 주셔서 감사합니다."
    : `자선 단체에 $${tip} 기부하고 싶습니다.`;
};
```



상태와 로직을 useRoundUp과 같은 사용자 정의 훅에서 관리함으로써 Payment 컴포넌트가 훨씬 간단해지고 렌더링에 집중할 수 있습니다. 역할의 분리로 코드를 이해, 테스트 및 유지 관리하기 쉬워집니다. 또한 기부 확인란을 별도의 컴포넌트로 추출하는 것은 모듈성과 재사용성을 더욱 향상시켜 React 개발에서의 모범 사례를 준수합니다.

```js
src/components/DonationCheckbox.tsx…

  const DonationCheckbox = ({
    onChange,
    checked,
    content,
  }: DonationCheckboxProps) => {
    return (
      <div>
        <label>
          <input type="checkbox" onChange={onChange} checked={checked} />
          <p>{content}</p>
        </label>
      </div>
    );
  };
```

또한 Payment에서는 React의 선언적 UI 덕분에 코드를 간단하게 읽을 수 있습니다. 거칠고 단순한 HTML조각처럼요.

```js
src/components/Payment.tsx…

  export const Payment = ({ amount }: { amount: number }) => {
    const { paymentMethods } = usePaymentMethods();
  
    const { total, tip, agreeToDonate, updateAgreeToDonate } = useRoundUp(amount);
  
    return (
      <div>
        <h3>Payment</h3>
        <PaymentMethods options={paymentMethods} />
        <DonationCheckbox
          onChange={updateAgreeToDonate}
          checked={agreeToDonate}
          content={formatCheckboxLabel(agreeToDonate, tip)}
        />
        <button>${total}</button>
      </div>
    );
  };
```



이제 이 시점에서 우리의 코드 구조는 아래 다이어그램과 같이 보입니다. 각 부분이 자신의 업무에 집중하고 프로세스가 작동하도록 함께 모이는 것에 주목해주세요.

![모듈화된 리액트 애플리케이션 다이어그램](/assets/img/2024-05-12-ModularizingReactApplication_8.png)

# 참고