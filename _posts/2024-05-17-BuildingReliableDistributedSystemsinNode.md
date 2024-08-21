---
title: "Node에서 안정적인 분산 시스템 구축하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-BuildingReliableDistributedSystemsinNode_0.png"
date: 2024-05-17 20:34
ogImage:
  url: /assets/img/2024-05-17-BuildingReliableDistributedSystemsinNode_0.png
tag: Tech
originalTitle: "Building Reliable Distributed Systems in Node"
link: "https://medium.com/@lorendsr/building-reliable-distributed-systems-in-node-aff92fa45ad8"
isUpdated: true
---

이 게시물은 Stripe, Netflix, Coinbase, Snap 및 기타 많은 회사들이 분산 시스템에서 다양한 문제를 해결하기 위해 사용하는 durable execution 개념을 소개합니다. 그리고 Temporal의 TypeScript/JavaScript SDK를 사용하여 durable 코드를 작성하는 것이 얼마나 간단한지 보여줍니다.

# 분산 시스템

트랜잭션을 지원하는 단일 데이터베이스로 뒷받침된 요청-응답 단일체를 구축할 때, 우리는 분산 시스템에 대한 많은 고려 사항이 없습니다. 단순한 실패 모드를 가질 수 있으며 쉽게 정확한 상태를 유지할 수 있습니다:

- 클라이언트가 서버에 도달할 수 없는 경우 클라이언트가 다시 시도합니다.
- 클라이언트가 서버에 도달하지만 서버가 데이터베이스에 도달하지 못하는 경우 서버는 오류로 응답하고 클라이언트가 다시 시도합니다.
- 서버가 데이터베이스에 도달하지만 트랜잭션이 실패하는 경우 서버는 오류로 응답하고 클라이언트가 다시 시도합니다.
- 트랜잭션이 성공하지만 서버가 클라이언트에 응답하기 전에 종료된 경우 클라이언트가 서버가 다시 켜질 때까지 다시 시도하고, 트랜잭션은 두 번째로 실패합니다(트랜잭션이 이미 적용되었는지를 알려주는 idempotency token과 같은 확인이 있음을 가정), 그리고 서버는 클라이언트에게 작업이 이미 수행되었음을 보고합니다.

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

한 번에 두 번째 위치를 추가하면 데이터베이스를 사용하는 서비스나 외부 API와 같은 일은 장애를 처리하고 일관성을 유지하는 것(모든 데이터 저장소 간의 정확성)이 훨씬 더 복잡해집니다. 예를 들어, 서버가 신용 카드를 청구하고 데이터베이스를 업데이트해야 하는 경우처럼, 단순한 코드를 더 이상 작성할 수 없게 됩니다.

```js
function handleRequest() {
  paymentAPI.chargeCard();
  database.insertOrder();
  return 200;
}
```

카드 청구(첫 번째 단계)는 성공했지만 데이터베이스에 주문 추가(두 번째 단계)가 실패할 경우 시스템은 일관성 없는 상태에 놓일 수 있습니다. 이 일관성을 유지하기 위해 두 번째 단계를 데이터베이스에 도달할 때까지 다시 시도하도록 할 수 있습니다. 그러나 코드를 실행하는 프로세스가 실패할 수도 있으며, 이 경우 우리는 첫 번째 단계가 발생한 사실을 전혀 알 수 없게 됩니다. 이 문제를 해결하려면 세 가지를 수행해야 합니다:

- 주문 세부 정보를 유지
- 완료한 프로그램 단계를 유지
- 데이터베이스에서 미완료 주문을 확인하고 다음 단계로 계속 진행하는 워커 프로세스 실행

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

그, 그리고 재시도 상태를 유지하고 각 단계에 시간 제한을 추가하는 것만으로도 많은 코드를 작성해야 하고, 특정 가장자리 경우나 실패 모드를 놓칠 수 있습니다. 만약 전체적이고 확장 가능한 아키텍처를 보려면 클릭하세요. 우리가 모든 그 코드를 작성하고 디버그할 필요 없이 좀 더 빠르고 신뢰할 수 있는 것들을 구축할 수 있었으면 좋겠다. 그걸 할 필요 없다는 건 우리가 내구성 실행을 사용할 수 있기 때문입니다.

# 내구성 실행

내구성 실행 시스템은 우리의 코드를 각 단계를 지속시키는 방식으로 실행합니다. 코드를 실행하는 프로세스나 컨테이너가 종료되어도 코드는 호출 스택과 로컬 변수를 포함한 모든 상태를 유지한 채 다른 프로세스에서 자동으로 계속 실행됩니다.

내구성 실행은 하드웨어가 얼마나 신뢰할지나 하류 서비스가 얼마나 오랫동안 오프라인인지에 상관없이 코드가 완료되도록 보장합니다. 재시도와 타임아웃은 자동으로 수행되며, 코드가 아무것도 하지 않을 때(예를 들어 sleep('1 month') 문을 기다리는 동안) 자원이 해제됩니다.

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

내구성 있는 실행은 이벤트 주도 아키텍처, 작업 대기열, 사가, 회로 차단기 및 트랜잭션 아웃박스와 같은 분산 시스템 패턴을 구현하는 것이 중요하지 않거나 불필요하게 만듭니다. 이것은 더 높은 추상화 수준에서 프로그래밍하는 것으로, 서버 충돌이나 네트워크 문제와 같은 일시적인 실패에 대해 걱정할 필요가 없는 곳입니다. 이것은 다음과 같은 새로운 가능성을 엽니다:

- 로컬 변수에 상태를 저장하는 것이 데이터베이스보다 낫습니다. 로컬 변수는 자동으로 저장되기 때문입니다.
- 한 달 동안 잠자는 코드를 작성할 수 있습니다. 다음 달에도 잠자던 프로세스가 여전히 존재할 필요가 없고, 리소스가 지속되는 동안 사용되지 않아도 됩니다.
- 영원히 실행할 수 있는 함수, 그리고 이러한 함수와 상호작용할 수 있는 (명령을 보내거나 데이터를 쿼리하는) 기능들.

내구성 있는 실행 시스템의 몇 가지 예는 Azure 내구성 함수, Amazon SWF, Uber Cadence, Infinitic, 그리고 Temporal(내가 일하는 곳)입니다. 완벽히 객관적이지 못할 리스크를 감수하더라도, 나는 Temporal이 이러한 옵션 중에서 최고라고 생각합니다 😊.

# 내구성 있는 JavaScript

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

이제 분산 시스템에서의 일관성과 내구 실행이 무엇인지 살펴보았으니, 실제 예시를 살펴보겠습니다. 내가 만든 이 음식 주문 앱은 내구성 있는 코드가 어떻게 생겼고 어떤 문제를 해결하는지 보여줍니다:

temporal.menu

![Building Reliable Distributed Systems in Node](/assets/img/2024-05-17-BuildingReliableDistributedSystemsinNode_0.png)

이 앱은 네 가지 주요 기능을 갖고 있습니다:

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

- 주문 생성 및 고객에게 청구
- 주문 상태 가져오기
- 주문 수령 처리
- 주문 배달 처리

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*5Ivi74IEaDxDo182J91nSA.gif)

메뉴에서 품목을 주문하면 배송 기사 사이트(drive.temporal.menu)에 나타나며, 운전자는 주문을 수령 처리하고 배달된 것으로 표시할 수 있습니다.

모든 이 기능은 내구성이 있는 JavaScript 또는 TypeScript의 단일 기능에서 구현할 수 있습니다. 저희는 TypeScript를 사용하고 있습니다 - TypeScript를 권장하며 라이브러리의 이름은 TypeScript SDK입니다. 그러나 npm에는 JavaScript 형식으로 게시되어 있으며 모든 Node.js 프로젝트에서 사용할 수 있습니다.

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

# 주문 생성하기

이 앱의 코드를 살펴봅시다. 몇 가지 API 경로를 살펴보겠지만 대부분은 order라는 단일 내구성 함수의 각 부분을 검토할 겁니다. 앱을 실행하거나 코드를 보려면 프로젝트를 다운로드하고 설정하려면 다음을 실행하세요:

```js
npx @temporalio/create@latest --sample food-delivery
```

사용자가 주문 버튼을 클릭하면 React 프론트엔드가 tRPC 백엔드에서 정의된 createOrder 뮤테이션을 호출합니다. createOrder API 경로 핸들러는 내구성 주문 함수를 시작하여 주문을 생성합니다. 내구성 함수인 Workflows은 @temporalio/client의 Client 인스턴스를 사용하여 시작된다. 이는 tRPC 컨텍스트에 ctx.temporal로 추가되었으며, 경로 핸들러는 유효성이 검증된 입력(제품 ID 번호 및 주문 ID 문자열을 포함한 객체)을 받아들이며, ctx.temporal.workflow.start를 호출하여 주문 Workflows을 시작합니다. 입력.productId를 인수로 제공합니다:

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

```typescript
apps/menu/pages/api/[trpc].ts

import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { taskQueue } from 'common'
import { Context } from 'common/trpc-context'
import { order } from 'workflows'

const t = initTRPC.context<Context>().create()

export const appRouter = t.router({
  createOrder: t.procedure
    .input(z.object({ productId: z.number(), orderId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.temporal.workflow.start(order, {
        workflowId: input.orderId,
        args: [input.productId],
        taskQueue,
      })
      return 'Order received and persisted!'
    }),
```

The order function starts out validating the input, setting up the initial state, and charging the customer:

packages/workflows/order.ts

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

```js
type OrderState = 'Charging card' | 'Paid' | 'Picked up' | 'Delivered' | 'Refunding'

export async function order(productId: number): Promise<void> {
  const product = getProductById(productId)
  if (!product) {
    throw ApplicationFailure.create({ message: `Product ${productId} not found` })
  }
  let state: OrderState = 'Charging card'
  let deliveredAt: Date
  try {
    await chargeCustomer(product)
  } catch (err) {
    const message = `Failed to charge customer for ${product.name}. Error: ${errorMessage(err)}`
    await sendPushNotification(message)
    throw ApplicationFailure.create({ message })
  }
  state = 'Paid'
```

어떤 기능이 실패할 수있는 함수는 자동으로 재시도됩니다. 이 경우 chargeCustomer 및 sendPushNotification은 두 서비스에 액세스하며, 현재 가동 중이거나 "일시적으로 사용할 수 없음"과 같은 일시적 오류 메시지를 반환할 수 있습니다. Temporal은 이러한 함수를 실행하는 것을 자동으로 재시도합니다 (기본적으로 제곱 백오프 방식으로 무제한으로, 그러나 이것은 구성 가능합니다). 함수는 "카드 거절"과 같은 재시도할 수 없는 오류도 throw할 수 있습니다. 이 경우에는 재시도되지 않습니다. 대신, 에러가 chargeCustomer(product)에서 throw되고 catch 블록에서 캐치됩니다. 고객은 결제 방법이 실패했다는 알림을 받으며, 우리는 주문 Workflow를 실패시키기 위해 ApplicationFailure를 throw합니다.

# 주문 상태 확인

다음 코드 부분은 약간의 백그라운드 지식이 필요합니다. 일반 함수는 오래 실행할 수 없으므로, 일이 발생할 때까지 대기하는 동안 리소스를 차지하고, 언젠가는 새 코드를 배포하고 이전 컨테이너가 종료되면 종료될 것입니다. 내구성 함수는 두 가지 이유로 임의의 길이로 실행할 수 있습니다:

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

- 어떤 것을 기다리고 있을 때에는 리소스를 차지하지 않습니다.
- 그들을 실행하는 프로세스가 종료되어도 문제가 되지 않습니다. 다른 프로세스가 실행을 계속할 것이기 때문입니다.

따라서 일부 영구 함수는 돈을 이체하는 함수처럼 짧은 시간 운영되지만, 어떤 것은 주문이 완료될 때 끝나는 주문 함수와 고객의 평생을 지속하는 고객 함수와 같이 길게 운영됩니다.

긴 시간 동안 실행되는 함수와 상호 작용할 수 있는 것은 유용합니다. Temporal은 함수로 데이터를 보내는 신호(Signals)와 함수에서 데이터를 가져오는 쿼리(Queries)를 제공합니다. 드라이버 사이트는 이 API 경로를 통해 주문 함수에 쿼리를 보내어 각 주문의 상태를 보여줍니다:

apps/menu/pages/api/[trpc].ts

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

```js
getOrderStatus: t.procedure
  .input(z.string())
  .query(({ input: orderId, ctx }) => ctx.temporal.workflow.getHandle(orderId).query(getStatusQuery)),
```

특정 주문 함수(Workflow Execution이라고도 함)의 핸들을 가져와 getStatusQuery를 보내고 결과를 반환합니다. getStatusQuery는 주문 파일에 정의되어 있으며 주문 함수에서 처리됩니다:

packages/workflows/order.ts

```js
import { defineQuery, setHandler } from '@temporalio/workflow'

export const getStatusQuery = defineQuery<OrderStatus>('getStatus')

export async function order(productId: number): Promise<void> {
  let state: OrderState = 'Charging card'
  let deliveredAt: Date
  //…
  setHandler(getStatusQuery, () => {
    return { state, deliveredAt, productId }
  })
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

getStatusQuery를 전달하는 order 함수가 호출되면, setHandler에 전달된 함수가 호출되어 로컬 변수의 값을 반환합니다. chargeCustomer 호출이 성공하면 상태가 '지불 완료'로 변경되고, getStatusQuery를 계속 폴링하던 드라이버 사이트가 업데이트된 상태를 받습니다. 그리고 'Pick up' 버튼을 표시합니다.

# 주문 픽업하기

드라이버가 주문을 픽업으로 표시하기 위해 버튼을 탭하면, 사이트는 API 서버에 pickUp 변경을 보내고, 이는 order 함수에 pickedUpSignal을 보냅니다:

apps/driver/pages/api/[trpc].ts

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

```js
pickUp: t.procedure
  .input(z.string())
  .mutation(async ({ input: orderId, ctx }) =>
    ctx.temporal.workflow.getHandle(orderId).signal(pickedUpSignal)
  ),
```

신청 함수는 상태를 업데이트하여 시그널을 처리합니다:

packages/workflows/order.ts

```js
export const pickedUpSignal = defineSignal('pickedUp')

export async function order(productId: number): Promise<void> {
  // …
  setHandler(pickedUpSignal, () => {
    if (state === 'Paid') {
      state = 'Picked up'
    }
  })
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

함수의 하단에서는 고객에 청구된 후에 픽업이 발생할 때까지 기다려왔다:

packages/workflows/order.ts

```js
import { condition } from '@temporalio/workflow'

export async function order(productId: number): Promise<void> {
  // ...
  try {
    await chargeCustomer(product)
  } catch (err) {
    // ...
  }
  state = 'Paid'
  const notPickedUpInTime = !(await condition(() => state === 'Picked up', '1 min'))
  if (notPickedUpInTime) {
    state = 'Refunding'
    await refundAndNotify(
      product,
      '⚠️ No drivers were available to pick up your order. Your payment has been refunded.'
    )
    throw ApplicationFailure.create({ message: 'Not picked up in time' })
  }
```

`await condition(() => state === 'Picked up', '1 min')` 함수는 상태 변화를 'Picked up'으로 변경할 때까지 1분 동안 대기합니다. 1분이 지나도 상태가 변경되지 않으면 false를 반환하고 고객에게 환불을 합니다. (우리는 요리사와 배송 기사의 속도에 엄격한 기준을 가지고 있거나, 데모 앱의 사용자가 모든 실패 모드를 볼 수 있기를 원하는 것 같아요 😄.)

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

# 배송

마찬가지로 "배송" 버튼으로 전송된 deliveredSignal이 있습니다. 픽업 후 1분 이내에 운전자가 배송을 완료하지 않으면 고객에게 환불이 이뤄집니다.

packages/workflows/order.ts

```js
export const deliveredSignal = defineSignal('delivered')

export async function order(productId: number): Promise<void> {
  setHandler(deliveredSignal, () => {
    if (state === 'Picked up') {
      state = 'Delivered'
      deliveredAt = new Date()
    }
  })
  // …
  await sendPushNotification('🚗 주문 픽업됨')
  const notDeliveredInTime = !(await condition(() => state === 'Delivered', '1 min'))
  if (notDeliveredInTime) {
    state = 'Refunding'
    await refundAndNotify(product, '⚠️ 운전자가 주문을 배달하지 못했습니다. 결제가 환불되었습니다.')
    throw ApplicationFailure.create({ message: '제시간 배송되지 않음' })
  }
  await sendPushNotification('✅ 주문이 배달되었습니다!')
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

배송이 성공적으로 완료되면 고객이 식사를 하는 데 한 분을 기다리고, 그들에게 경험을 평가하도록 요청합니다.

```js
  await sleep('1 min') // 이것은 몇 시간 또는 심지어 몇 달이 될 수도 있습니다
  await sendPushNotification(`✍️ 식사를 평가해주세요. ${product.name.toLowerCase()}는 어떠셨나요?`)
}
```

최종 푸시 알림 이후, 주문 함수 실행이 종료되고 Workflow Execution이 성공적으로 완료됩니다. 함수가 완료되었더라도 Temporal이 함수의 최종 상태를 저장하고 있기 때문에 여전히 쿼리를 보낼 수 있습니다. 주문이 배달된 후 1분 뒤 페이지를 새로 고치면 여전히 getStatusQuery가 작동하고 "배송됨"이 상태로 표시됩니다:

![이미지](/assets/img/2024-05-17-BuildingReliableDistributedSystemsinNode_1.png)

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

# 요약

단일 내구성 함수를 사용하여 다단계 주문 흐름을 구현할 수 있는 방법을 살펴보았습니다. 이 함수는 네트워크, 데이터 저장소 또는 하위 서비스와 관련된 일시적 문제뿐만 아니라 다음과 같은 문제가 발생할 경우에도 완료가 보장됩니다:

- 네트워크, 데이터 저장소 또는 하위 서비스와 관련된 일시적 문제
- 함수 실행 중 문제 발생
- 기반이 되는 Temporal 서비스 또는 데이터베이스 다운

이를 통해 분산 시스템에 대한 여러 문제점을 해결할 수 있었으며:

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

- 로컬 변수를 사용하여 상태를 데이터베이스에 저장하는 대신에 활용할 수 있습니다.
- 주문이 너무 오래 걸려 주문을 취소하거나 chargeCustomer와 같은 일시적 함수를 재시도하고 시간 초과하는 내장 기능을 위해 데이터베이스에 타이머를 설정할 필요가 없었습니다.
- 다음 단계로 진행하기 위해 워커가 조사하는 작업 대기열을 설정할 필요가 없었으며, 실패한 프로세스에 의해 중단된 미완료 작업을 진행하거나 선택하기 위해서도 필요하지 않았습니다.

다음 글에서는 배송 앱의 코드를 더 살펴보고 Temporal이 우리에게 내구성 실행을 제공하는 방법을 배우게 될 것입니다. 새로운 글이 올라오면 알림을 받으려면 Twitter 또는 LinkedIn에서 팔로우해주세요.

질문이 있으면 언제든지 도와드릴게요! Temporal의 미션이 개발자를 돕는 데에 있고, 개인적으로 그것에서 기쁨을 느낍니다 🤗. 트위터에서는 @lorendsr로, temporal-typescript 태그가 달린 StackOverflow 질문에는 답변(그리고 좋아요 😄)을 달며, 커뮤니티 Slack에는 @Loren으로 활동하고 있습니다 💃.

# 더 배우기

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

더 알아보려면 다음 자료를 추천합니다:

- 영상: Temporal 소개 및 TypeScript SDK 사용하기
- 몇 가지 일반적인 사용 사례
- TypeScript SDK 문서: t.mp/ts
- TypeScript API 참조: t.mp/ts-api
- TypeScript 튜토리얼

더 많은 TypeScript SDK에 관한 블로그 포스트:

- Node.js 작업 큐로서 Temporal 사용하기
- 장기 워크플로를 통해 API 요청 캐싱하기
- 워크플로에 대한 REST API를 생성하는 Express 미들웨어
- TS SDK 1.0.0 릴리스
- Workflow 결정론을 강제하기 위해 V8 독립체 사용하는 방법

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

💬 하커 뉴스, 레딧, 트위터, 또는 링크드인에서 토론해보세요.

이 게시물 초안을 읽어준 제시카 웨스트, 브라이언 호건, 애밀리아 망고, 그리고 짐 워커에게 감사드립니다.
