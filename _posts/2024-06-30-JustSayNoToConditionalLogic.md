---
title: "조건문 로직을 피해야 하는 이유 5가지"
description: ""
coverImage: "/assets/img/2024-06-30-JustSayNoToConditionalLogic_0.png"
date: 2024-06-30 22:50
ogImage:
  url: /assets/img/2024-06-30-JustSayNoToConditionalLogic_0.png
tag: Tech
originalTitle: "Just Say No: To Conditional Logic"
link: "https://medium.com/@trevor-pace/just-say-no-to-conditional-logic-0c4323b99db6"
isUpdated: true
---

아마도 소프트웨어 개발자가 받는 가장 일반적인 요청 중 하나는 다음과 같은 익숙한 구조를 가지고 있습니다. 고객으로부터 직접 받는지, 엔지니어링/제품/프로그램 등의 매니저로부터 받는지 상관없이 항상 동일합니다: 특정 기능을 특정 데이터 조각에 적용해야 합니다.

고객의 관점에서 완전히 타당한 요청이지만, 미숙한 소프트웨어 개발자가 빠지기 쉬운 시간 소모적 함정을 만들어냅니다. 구체적인 예를 살펴보겠습니다.

다음과 같은 함수가 있다고 상상해 봅시다:

```js
async function createShipment(create: ShipmentCreate) {
  // 새 출하물을 만듭니다.

  // 고객이 차단되지 않았는지 확인합니다.
  const customer = await CustomerModel.findOne({ _id: create.customer });
  if (!customer) {
    throw new CustomerUnknownError();
  }
  if (customer.banned) {
    throw new CustomerBannedError();
  }

  const shipment = await ShipmentModel.create({
    customer: create.customer,
    state: ShipmentState.NEW_SHIPMENT,
  });

  return shipment;
}
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

이제 고객 X의 발송물은 친환경 연료를 사용해야 한다는 것을 보장하는 작업을 맡게 되었습니다. 이 작업은 Shipment 객체에 requiredFuel이라는 필드를 추가하여 운전자 앱을 통해 특정 연료를 사용해야 한다는 정보를 표시하는 것으로 요청되었습니다. 값이 null 또는 정의되지 않았을 경우에는 해당 제약이 없음을 의미합니다.

그래서 우리는 이렇게 작업을 진행합니다:

```js
async function createShipment(create: ShipmentCreate) {
  // 새로운 배송물을 생성합니다

  // 고객이 금지당하지 않았는지 확인합니다
  const customer = await CustomerModel.findOne({ _id: create.customer });
  if (!customer) {
    throw new CustomerUnknownError();
  }
  if (customer.banned) {
    throw new CustomerBannedError();
  }

  const requiredFuel = shipment.Customer == "Customer X" ? FuelType.Sustainable : null;

  const shipment = await ShipmentModel.create({
    customer: create.customer,
    state: ShipmentState.NEW_SHIPMENT,
    requiredFuel,
  });

  return shipment;
}
```

충분히 간단해 보이네요. 고객이 원하는 대로 동작하나요? 네, 맞아요. 하지만 여기에는 결과가 따라옵니다. 명시적으로 고객 X를 조건문으로 확인하면서 코드를 작성함으로써 우리가 갖게 되는 결과는 있습니다:

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

- 테스트해야 할 추가 논리적 경로를 추가했습니다:

![이미지](/assets/img/2024-06-30-JustSayNoToConditionalLogic_0.png)

- 미래 시스템에서 문제를 디버깅할 때 개발자가 필요로 하는 정신적 능력이 증가했습니다.
- 덜 일반적인 해결책.

## 더 나은 해결책 찾기

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

다시 원래 요청을 살펴봅시다:

여기에서 실제 문제가 발생하는 곳입니다. 이 요청은 일반적이지 않지만, 우리는 의문을 제기하지 않았습니다. 미래에 더 많은 고객이 지속 가능한 연료를 사용해야 하는지 의문을 제기하지 않았습니다. 다른 종류의 연료가 나올 것인가요? 더 나쁜 것은, 종종 과거 소프트웨어 경험이 있는 매니저들과 상호 작용할 때, 문제가 종종 더 프로그래밍적으로 표현됩니다.

주니어/스트레스 받는/과로한 개발자로서 그냥 "예"라고 말하고 구현으로 바로 넘어가는 것이 쉽습니다. 그러나 이 요청을 다시 표현해 봅시다. 먼저, 보다 일반화하여:

그리고, 조건을 없애는 것으로 두 번째로:

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

이제 이 간소화된 요청을 받았으니 다음과 같은 구현을 고안해 냈습니다:

```js
async function createShipment(create: ShipmentCreate) {
  // 새 출하물 생성

  // 고객이 금지되지 않았는지 확인
  const customer = await CustomerModel.findOne({ _id: create.customer });
  if (!customer) {
    throw new CustomerUnknownError();
  }
  if (customer.banned) {
    throw new CustomerBannedError();
  }

  const shipment = await ShipmentModel.create({
    customer: create.customer,
    state: ShipmentState.NEW_SHIPMENT,
    requiredFuel: customer.fuelPreference,
  });

  return shipment;
}
```

이 솔루션은 원래의 모든 문제를 해결합니다. 추가 테스트가 필요하지 않으며, 코드를 읽고 디버깅하기도 쉽고 완전히 범용적입니다. 단지 고객 데이터베이스 객체의 fuelPreference를 설정해주면 됩니다. 만약 그들이 그런 것을 가지고 있지 않다면, null 또는 undefined로 남겨두고 다른 서비스/프론트엔드가 렌더링/처리 하도록 놔두세요. 그들이 할 일이기 때문입니다.

우리는 첫 번째로 No라고 말함으로써 문제를 해결했습니다. 구체적인 내용에 No를 하고 조건부 논리에 No를 했습니다. 우리는 개발자가 할 가장 중요한 일 중 하나인 일을 했습니다. 원래의 요청을 받아 질문을 하고 가장 간단한 구현을 찾아냈습니다.

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

우리는 시간을 절약했어요. 함께 고객에게도 시간을 절약했습니다. 추가 테스트를 작성하는 대신 기존 데이터베이스에 하나의 필드만 추가했어요. 하지만 고객 Y에 대한 미래 요청이 없을 거라 시간을 절약했습니다.
