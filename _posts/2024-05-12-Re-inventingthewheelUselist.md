---
title: "바퀴 다시 발명하기 - 목록 사용"
description: ""
coverImage: "/assets/img/2024-05-12-Re-inventingthewheelUselist_0.png"
date: 2024-05-12 20:09
ogImage: 
  url: /assets/img/2024-05-12-Re-inventingthewheelUselist_0.png
tag: Tech
originalTitle: "Re-inventing the wheel — Use list"
link: "https://medium.com/@francoratovoson/re-inventing-the-wheel-use-list-81734b624aff"
---


이번 시리즈에서는 바퀴를 새롭게 발명해 보려 합니다. 맞아요, 사람들이 네게 하지 말라고 말했던 것을 정확히 하려고 하지만, 우리는 반항자들이야 😉.

프로젝트 틀을 만들기 위해 단순한 pnpm monorepos를 만들었지만, 여러분은 자유롭게 설정을 사용할 수 있어요. 중요한 건 완벽하게 작동하는 리액트 프로젝트를 갖고 있다는 것이에요. 이 시리즈는 그것에 대해 이야기하는 것이 아니지만, 관심이 있다면 나와 같은 가이드를 따라 갈 수 있어요: https://dev.to/vinomanick/create-a-monorepo-using-pnpm-workspace-1ebn

하지만 내 설정을 꼭 따르고 싶다면, 여기서 레포를 클론할 수 있어요: https://github.com/FrancoRATOVOSON/use-wheel

# 소개



React 생태계의 방대한 풍경 가운데, 우리는 개발 업무를 간소화해 주겠다고 약속하는 다양한 라이브러리와 프레임워크로 여유롭게 나눠먹는다. 그러나 프로젝트가 복잡해지면서 우리는 종종 우리의 요구 사항을 초과하는 부품과 복잡한 시스템과 씨름해야 할 때가 많습니다.

이러한 딜레마는 최근 사이드 프로젝트에 착수할 때 익숙한 일 중 하나였습니다. 여러 도구와 라이브러리를 만지작거리면서, 많은 요구 사항이 더 단순하고 집중된 해결책으로 충족될 수 있다는 것을 깨달았습니다. 그래서 이 시리즈 아이디어가 탄생했습니다 — 불필요한 것을 벗어내고 단숨함의 우아함을 받아들이는 기본으로 되돌아가는 여정입니다.

그러나 이것은 그냥 대충 다시 만드는 것에 대한 이야기만이 아닙니다. 이것은 창조의 기쁨을 되찾고 체험을 통해 학습함으로써 배우는 것에 대한 새로운 가능성을 발견하는 것입니다. 복잡한 개념을 기본 구성 요소로 분해함으로써, 우리는 어떻게 일이 진행되는지에 대한 깊은 이해를 얻고 혁신을 위한 새로운 가능성을 발견할 수 있습니다.

# 오늘 우리는 뭐 요리해볼까요?



그러면 함께 이 여정을 시작해보죠. 리스트는 널리 사용되는 만큼 필수적인 요소이죠. 사용자를 표시하거나 제품을 전시하는 등 무수히 많은 응용 프로그램의 기초를 이룹니다. 이미 사용 중인 솔루션들인 useList와 @tastack/table(테이블과 더 관련이 있다는 건 알지만) 같은 솔루션들은 매력적인 기능을 제공하지만, 우리의 요구에 정확히 맞춘 것을 만들 수 있다면 어떨까요?

React에서 리스트 관리의 기술을 탐구하며, 가벼우면서 다목적으로 사용할 수 있는 효용성 있는 도구를 만들어보겠습니다. 이 시리즈가 끝날 때쯤, 단순함의 힘에 대한 새로운 인식과 개발 워크플로우를 향상시킬 실용적인 도구가 생길 것입니다.

이 여정의 끝에 우리가 생산할 결과는 다음과 같습니다:

# 요구 사항



그래, 시작해봅시다! 우리의 야생 목록을 다룰 때 필수적인 기능들에 대한 체크리스트가 있어요:

- 정렬 (Sorting): 지저분한 데이터 스택에서 탐색해 본 적이 있나요? 시간이 없어요! 목록을 정렬하고 혼돈을 조금이나마 정리할 방법이 필요해요.
- 필터링 (Filtering): 정보 과부하와 이별을 외치죠! 불필요한 소음을 걸러내고 진정으로 중요한 것에 집중하고 싶어요.
- 표시 (Pagination & Page Size): 끝없는 결과 페이지를 넘기며 보기? 그럴 필요 없어요! 소형 청크로 나누어 탐색을 쉽게 만들어 주세요.
- 선택 (Selection): 때로는 선택해야 할 때가 있어요! 여러 항목을 선택하거나 특별 데이터에 집중해야 할 때, 일을 처리할 도구가 필요해요.

이제 우리의 희망 목록이 완성되었으니, 옷 소매를 걷어 올리고 일하러 가봐요. 우리 신뢰할 수 있는 "useList" 유틸리티의 탄생이랍니다!

```js
// useList.ts

export function useList<T>(data: Array<T>) {
  return {
    list: data
      .filter(() => true) // 필터링 로직을 위한 자리 표시자
      .sort(() => 0)      // 정렬 로직을 위한 자리 표시자
      .slice()            // 페이징 로직을 위한 자리 표시자
  }
}
```



여기서 우리가 보고 있는 것은 무엇일까요? 우리는 데이터 배열을 가져와서 "list" 속성을 포함하는 깔끔한 패키지를 반환하는 일반적인 함수를 만들었습니다. 이 속성은 우리의 원본 데이터 배열의 필터링, 정렬 및 잘린 버전을 보유하고 있습니다.

하지만 기다려봐, 아직 끝난 게 아니에요! 당연히 기본 기능이 준비되었지만, 이제 진짜 로직을 뿌려야 할 때입니다. 우리는 정렬, 필터링, 페이지네이션 및 선택을 다루고 있어요. 그러니 생각의 모자를 쓰고, 이에 조금의 코딩 마법을 뿌려봐요. 이것은 상당히 흥미진진한 여정이 될 거에요! 🎩✨

일단 쉬운 것부터 시작해봅시다.

## 선택하기



알겠어요, 친구들, 선택에 관한 이야기를 해볼 시간이에요! 우리 목록에서 항목을 선택할 때 몇 가지 옵션이 있어요:

- 사용자 지정 고유 ID: 한 가지 옵션은 사용자에게 고유 ID를 각 요소에 제공하도록 요청하는 것이에요. 이렇게 하면 사용자가 선택을 식별하는 방법을 완전히 제어할 수 있어요.
- 유연한 선택 메커니즘: 또 다른 방법은 사용자가 선택 프로세스가 작동하는 방식을 결정하도록 하는 것이에요. 그러면 사용자가 자신의 특정 요구 사항과 선호도에 맞게 조정할 수 있어요.

하지만 또 다른 옵션이 있어요, 선택 메커니즘을 우리가 맡지만 사용자들이 각 요소를 식별하는 방법을 선택할 수 있게 할 거예요. 어떻게요? 바로 이런 멋진 작은 함수를 제공해서:

```js
type UseListOptions<T, U> = {
  getId: (element: T) => U
}
```



이렇게 하면 사용자가 요소를 식별하는 자체 방법을 지정할 수 있어요. 제공된 데이터에 이미 고유한 ID가 있는 경우 훌륭해요! 그렇지 않은 경우, 함수를 사용자 정의하여 ID를 생성할 수 있어요.

이제 구현에 대해 자세히 알아볼까요? 수행해야 할 일은 선택 목록과 선택을 켜고 끄는 함수를 추가하는 것 뿐이에요:

```js
export function useList<T, U>(data: Array<T>, { getId }: UseListOptions<T, U>) {
  const [selection, setSelection] = React.useState<Set<U>>(new Set([]))

  const toogleSelection = React.useCallback(
    (item: T, state?: boolean) =>
      setSelection(currentSelection => {
        const itemId = getId(item)
        const selectionList = new Set(currentSelection)
        if (state || !selectionList.has(itemId)) selectionList.add(itemId)
        else selectionList.delete(itemId)
        return new Set(selectionList)
      }),
    [getId]
  )

  return {
    list: data
      .filter(() => true)
      .sort(() => 0)
      .slice(),
    selection,
    toogleSelection
  }
}
```

뭔가 빠뜨린 게 있나요? 음, 네, 제공하지 않을 수 없는 기능을 잊었네요:



```js
const toogleSelectionAll = React.useCallback(
  (state?: boolean) =>
    setSelection(currentSelection => {
      if (state || currentSelection.size === 0)
        return new Set(data.map(item => getId(item)))
      const selectionList = new Set(currentSelection)
      selectionList.clear()
      return selectionList
    }),
  [data, getId]
)
```

그리고 이로서 모든 것을 마쳤습니다. 그 다음 계획은 무엇인가요?

## 정렬 및 필터링

좋아요, 여러분, 이제 정렬과 필터링을 다루는 시간입니다! 그리고 놀랍게도 선택보다 더 쉽습니다. 사용자는 함수를 제공하고, 우리는 그저 마법을 부릅니다.



위 코드를 업데이트해 봅시다:

```js
type UseListOptions<T, U> = {
  filterFn: (element: T) => boolean
  getId: (element: T) => U
  sortFn: (elementA: T, elementB: T) => number
}

export function useList<T, U>(
  data: Array<T>,
  { filterFn, getId, sortFn }: UseListOptions<T, U>
) {

  ...

  return {
    list: data.filter(filterFn).sort(sortFn).slice(),
    selection,
    toggleSelection
  }
}
```

이제 궁금증이 생길 수 있어요. "필터링과 정렬 순서는 중요할까요?" 그 대답은 네요 — 주로 성능상의 이유로 중요합니다. 정렬이 시작되기 전에 배열 크기를 줄이기 위해 데이터를 먼저 필터링합니다. 그러나 slice 작업은 마지막에 옵니다. 페이지네이션을 위한 것이거든요. 우리는 표시된 항목을 기준으로 정렬 및 필터링 매개변수가 변경되더라도 일관성을 유지하기 위해 전체 데이터 집합에서 필터링 및 정렬합니다.

하지만 여기서 멈추지 않겠어요! 나중에 우리는 최적화와 코드 청결성에 대해 더 탐구할 거에요.



이러한 조정 사항을 고려하면 정렬 및 필터링 기능이 빛을 발할 준비가 되었어요! React에서 목록 관리의 멋진 세계로 더 깊이 파고들어가는 것을 기대해 주세요.

## 페이지네이션

자, 이제 파티 시작할 시간이에요 😎.

페이지네이션은 간단해 보일 수 있지만, 믿어두세요, 눈에 보이는 것 이상의 것이 있어요. 먼저, 현재 위치(현재 페이지, 말하자면)를 추적하고 한 번에 표시할 항목 수(페이지 크기)를 파악하며 페이지 간에 전환할 수 있는 편리한 기능이 몇 가지 필요해요 (첫 번째, 이전, 다음, 마지막, 그리고 심지어 이동하기까지!).



시작해봐요:

```js
유형 UseListOptions <T, U> = {
  defaultPageSize: 숫자
  ...
}

export function useList <T, U> (
  데이터 : 배열 <T>,
  { defaultPageSize, filterFn, getId, sortFn }: UseListOptions <T, U>
) {
  const [pageSize, setPageSize] = React.useState <number> (defaultPageSize)
  const [index, setIndex] = React.useState <number> (0)

  ...

  return {
    list : 데이터
      .filter (filterFn)
      .sort (sortFn)
      .slice (index, index + pageSize),
    ...
  }
}
```

참 간단하죠? 이제 현재 페이지를 결정하는 문제부터 해결해 봅시다:

```js
export function useList <T, U> (
  데이터 : 배열 <T>,
  { defaultPageSize, filterFn, getId, sortFn }: UseListOptions <T, U>
) {
  ...

  const currentPage = React.useMemo (
    () => index / pageSize + 1,
    [index, pageSize]
  )

  return {
    ...
    currentPage,
  }
}
```



이건 꽤 쉬운데요, 현재 페이지는 현재 인덱스를 페이지 크기로 나눈 값에 1을 더하면 됩니다. 왜냐하면 페이지는 1부터 시작하기 때문이에요. 그런데 이 말은 인덱스가 항상 페이지 크기의 배수여야 한다는 가정을 하고 있죠. 그러나 이는 합리적입니다. 페이지를 변경할 때마다 인덱스에 페이지 크기를 더해주기 때문이에요.

이제 페이지 간에 부드러운 탐색을 보장합시다:

```js
const nextPage = React.useCallback(() => {
  if (pageSize < data.length && index + pageSize < data.length)
    setIndex(currentIndex => currentIndex + pageSize)
}, [data.length, index, pageSize])
```

먼저, 아직 보여줄 데이터가 남아 있는 경우에만 nextPage로 이동할 수 있도록 합시다. 이를 위해 페이지 크기는 데이터의 길이보다 작아야 하고, 인덱스를 증가시켰을 때 그 값이 데이터 배열 내에 여전히 존재해야 합니다. 이런 논리를 따라가면, 인덱스는 항상 페이지 크기의 배수일 것이라는 것을 알 수 있습니다. 왜냐하면 0, 페이지 크기, 페이지 크기 + 페이지 크기, ... 와 같이 될 수 있거든. 그런데 만약 갑자기 페이지 크기를 변경한다면 어떻게 될까요? 우리가 첫 번째 페이지에 있는 동안에는 별 상관이 없겠지만, 리스트의 어딘가에 있는데 첫 페이지가 아닌 경우에는 현재 페이지와 표시해야 하는 내용을 다시 계산해야 할 것입니다.



음 네, 먼저 네비게이션을 완성하고 나중에 여기로 돌아올까요?
그래서, 이전, 첫 번째 그리고 마지막 페이지:

```js
const previousPage = React.useCallback(() => {
  if (pageSize < data.length && index - pageSize >= 0)
    setIndex(currentIndex => currentIndex - pageSize)
}, [data.length, index, pageSize])

const firstPage = React.useCallback(() => setIndex(0), [])

const lastPage = React.useCallback(() => {
  if (pageSize < data.length && index + pageSize < data.length) {
    const pageCount = Math.ceil(data.length / pageSize)
    setIndex(pageSize * pageCount)
  }
}, [data.length, index, pageSize])
```

알아채셨나요? 우리는 또 다른 중요한 정보인 pageCount를 만들었어요. 우리도 그것을 반환해야겠네요.

코드를 변경해봅시다:



```js
const pageCount = React.useMemo(() => {
  if (pageSize >= data.length) return 1
  return Math.ceil(data.length / pageSize)
}, [data.length, pageSize])

...

const lastPage = React.useCallback(() => {
  if (pageSize < data.length && index + pageSize < data.length)
    setIndex(pageSize * (pageCount - 1))
}, [data.length, index, pageCount, pageSize])
```

이제 setPageSize 구현 전에 보너스 기능을 추가해 봅시다:

```js
const goToPage = React.useCallback(
  (destinationPage: number) => {
    if (destinationPage < pageCount)
      setIndex(pageSize * (destinationPage - 1))
  },
  [pageCount, pageSize]
)
```

보시다시피 lastPage와 거의 비슷합니다. 나중에 정리하도록 하겠습니다.



## 페이지 크기 설정

여기서 재미있는 부분이 나왔네요! 사용자가 페이지 크기를 변경하기로 결정하는 것은 보통 한 번에 더 많은 정보를 보고 싶어서입니다. 그러나 이미 여러 페이지를 탐색 중이라면, 현재 페이지 유지와 더 많은 요소 표시 중 어느 것에 우선순위를 두어야 할까요? 우리에게 완전히 달려 있지만, 사용자의 관점에서는 뷰 크기를 변경했기 때문에 이전에 발견한 정보를 잃는 것이 이상적이지 않습니다. 게다가, 현재 어떤 페이지에 있는지에 대해서는 관심조차 없을 수도 있습니다.

현재 표시된 정보는 현재 인덱스와 현재 페이지 크기 사이에 있습니다. 따라서 사용자가 페이지 크기를 업데이트하면, 현재 인덱스를 조정하여 그 값에 페이지 크기를 추가하면 마지막 인덱스가 포함되도록 해야 합니다.

그것을 하는 가장 쉬운 방법은 다음과 같습니다:



```js
const setPageSize = React.useCallback(
  (size: number) => {
    setPageSizeState(size);
    const newIndex = Math.floor(index / size) * size;
    setIndex(newIndex);
  },
  [index]
);
```

아시다시피, 이것은 내가 만들기 별로 어렵지 않아 보이는 것보다 더 쉬운 것 같아요 😛. 해결책의 단순함이 해결해야 할 문제의 복잡함을 숨기는 것이 아니기 때문이에요. 이제 코드를 설명해 볼게요:
먼저, 페이지 크기를 새 페이지 크기로 설정해요. 간단하죠? 그런데 이제 어려운 부분이 나와요: 왜 Math.floor를 사용하는 걸까요? 그리고 여기서 정확히 무엇을 계산하고 있을까요?

다음을 고려해 보세요: 표시된 어떤 요소든 index와 index + pageSize 사이에 위치해 있어요. 다시 말해:

- 페이지 1의 요소는 0부터 pageSize 사이에 위치해요
- 페이지 2의 요소는 pageSize부터 pageSize * 2 사이에 위치해요
- 페이지 3의 요소는 pageSize * 2부터 pageSize * 3 사이에 위치해요
- 계속해서 이어지죠...



일반적으로, 페이지 n의 요소는 (pageSize * (n-1))과 (pageSize * n) 사이에 있습니다. 이 계산을 역으로 바꾸면, n이 항상 (i / pageSize) + 1 이하임을 알 수 있습니다. 하지만 왜 "이상"이 아닌 걸까요? 이 계산이 수학적으로 맞을 수 있지만, 중요한 점은 i가 0에서 시작하는 반면 페이지 인덱스는 1에서 시작한다는 것을 기억하는 것입니다. 현재 인덱스는 현재 페이지에 페이지 크기를 곱한 값이기 때문에 결과를 곱해서 올바른 인덱스를 찾습니다.

휴! 수학적인 여정이 꽤 길었지만, 이러한 세세한 점을 이해하면 사용자가 어떻게 상호 작용하든 페이징 시스템이 원활하게 작동하도록 할 수 있습니다.

# 테스트

## 설정하기



우리의 페이지네이션 시스템을 만들었으니, 이제 시험해보는 시간이에요! 사용자 주문 목록을 만들고, 날짜나 금액으로 정렬하거나, 이메일로 필터링하며, 주문 상태를 변경(배송됨 또는 아직 안됨)하는 기능 등을 탐험해볼 거에요. 데이터를 채우기 위해, 현실적인 테스트 데이터를 생성하는 유용한 도구인 faker.js를 사용할 거예요.

먼저, 데이터를 생성하는 방법을 보겠어요:

```js
// 저는 생성한 사용자 목록을 가지고 있는 사용자 목록을 만들었어요.
// 각 주문이 개별 사용자에 속하지 않도록 하기 위해, 이것은 검색 필터 기능을 위한 것이에요.
function fakeUserList() {
  const list: string[] = []
  for (let index = 0; index < 10; index++) {
    list.push(faker.internet.email())
  }
  return list
}

export function fakeOrdersList() {
  const userList = fakeUserList()
  const list: Order[] = []
  const dataSize = faker.number.int({ max: 100, min: 50 })
  for (let index = 0; index < dataSize; index++) {
    list.push({
      amount: faker.number.int({ max: 500, min: 150 }),
      date: faker.date.recent({ days: 100 }),
      id: faker.string.uuid(),
      isDelivered: faker.number.int({ max: 10, min: 0 }) % 2 === 0,
      user: userList[faker.number.int({ max: userList.length - 1, min: 0 })]
    })
  }

  return list
}
```

이제, 부모 컴포넌트를 설정해봅시다:



```js
import React from 'react'

import { OrderList } from '@/components/common'
import { fakeOrdersList } from '@/lib/faker'

export default function OrdersPage() {
  const [orders, setOrders] = React.useState(fakeOrdersList())

  const deleteOrders = React.useCallback(
    (ids: string[]) =>
      setOrders(list => list.filter(element => !ids.includes(element.id))),
    []
  )

  return <OrderList deleteOrders={deleteOrders} list={orders} />
}
```

그리고 리스트 컴포넌트 :

```js
// import문 생략...

interface OrderListProps {
  deleteOrders: (ids: string[]) => void
  list: Array<Order>
}

export default function OderList({ deleteOrders, list: data }: OrderListProps) {
  const [search, setSearch] = React.useState<string>('')
  const [sort, setSort] = React.useState<'asc' | 'desc' | null>(null)
  const {
    currentPage,
    firstPage,
    lastPage,
    list,
    nextPage,
    pageCount,
    pageSize,
    previousPage,
    selection,
    setPageSize,
    toogleSelection,
    toogleSelectionAll
  } = useList(data, {
    defaultPageSize: 5,
    filterFn: order => {
      if (search) return order.user.toLowerCase().includes(search.toLowerCase())
      return true
    },
    getId: elt => elt.id,
    sortFn: (a, b) => {
      if (!sort) return 0
      if (sort === 'asc') return a.amount - b.amount
      return b.amount - a.amount
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2 items-center">
        <div className="flex justify-start items-center gap-2">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full rounded-lg bg-background pl-9 md:w-[200px] lg:w-[336px]"
              placeholder="검색..."
              type="search"
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {sort === 'asc' ? (
                    <>
                      <ArrowUpNarrowWide className="size-4 mr-4" />
                      오름차순
                    </>
                  ) : sort === 'desc' ? (
                    <>
                      <ArrowDownNarrowWide className="size-4 mr-4" />
                      내림차순
                    </>
                  ) : (
                    <>
                      <ArrowUpDown className="size-4 mr-4" />
                      정렬
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-28 h-fit p-2 bg-background border rounded-md mt-2">
                <DropdownMenuRadioGroup
                  value={sort || undefined}
                  onValueChange={value => setSort(value as 'asc' | 'desc')}
                >
                  <DropdownMenuRadioItem className="cursor-pointer" value="asc">
                    오름차순
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="cursor-pointer"
                    value="desc"
                  >
                    내림차순
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {search && (
            <div>{`${data.filter(order => order.user.toLowerCase().includes(search.toLowerCase())).length} 결과`}</div>
          )}
        </div>
        <div className="flex justify-end gap-2 items-center">
          <div className="text-muted-foreground text-nowrap">페이지당 표시 행 수</div>
          <Select
            value={`${pageSize}`}
            onValueChange={value => setPageSize(Number(value))}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="bottom">
              {[5, 10, 15, 20, 30, 50].map(size => (
                <SelectItem key={`pageSize-${size}`} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {list.map(order => {
          const { amount, date, id, isDelivered, user } = order
          return (
            <Card
              className={cn('p-4', 'flex items-center justify-between')}
              key={id}
            >
              <div className="flex item-center gap-2">
                <div className="size-9 grid content-center ml-2">
                  <Checkbox
                    checked={selection.has(id)}
                    id={user}
                    onCheckedChange={state =>
                      toogleSelection(
                        order,
                        typeof state === 'string' ? false : state
                      )
                    }
                  />
                </div>
                <label
                  className={cn(
                    'flex flex-col gap-1',
                    'font-medium leading-none',
                    'cursor-pointer'
                  )}
                  htmlFor={user}
                >
                  <span className="font-semibold">{user}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(date, 'PPP')}
                  </span>
                </label>
                <div>{isDelivered && <Badge>배송완료</Badge>}</div>
              </div>
              <div>{`${amount} $`}</div>
            </Card>
          )
        })}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <div className="flex flex-col gap-0">
            <div className="flex gap-2 justify-start items-center">
              <Checkbox
                checked={selection.size > 0}
                id="all-users-selection"
                onCheckedChange={state =>
                  toogleSelectionAll(typeof state === 'string' ? false : state)
                }
              />
              <label
                className="text-muted-foreground cursor-pointer"
                htmlFor="all-users-selection"
              >
                {selection.size > 0 ? `모두 선택 해제` : `모두 선택`}
              </label>
            </div>
            {data && (
              <p>{`${selection.size} 중 ${data.length} 사용자 선택됨.`}</p>
            )}
          </div>
          {selection.size > 0 && (
            <Button
              variant="destructive"
              onClick={() => deleteOrders(Array.from(selection))}
            >
              선택된 사용자 삭제
            </Button>
          )}
        </div>
        <div className={cn('flex justify-start items-center gap-2')}>
          <Button
            disabled={currentPage === 0}
            size="icon"
            variant="outline"
            onClick={firstPage}
          >
            <DoubleArrowLeftIcon className="size-4" />
          </Button>
          <Button
            disabled={currentPage === 0}
            size="icon"
            variant="outline"
            onClick={previousPage}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div className="text-muted-foreground">
            {`페이지 ${currentPage} / 총 ${pageCount} 페이지`}
          </div>
          <Button
            disabled={currentPage >= pageCount}
            size="icon"
            variant="outline"
            onClick={nextPage}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            disabled={currentPage >= pageCount}
            size="icon"
            variant="outline"
            onClick={lastPage}
          >
            <DoubleArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
```



## 기다리지 말고, 한번 시도해봅시다

우리 예시를 테스트해보러 바로 들어가봅시다! 처음 눈에 보이는 대로 모든 것이 원활히 작동해야 합니다. 몇 가지 요소를 선택해보고, 모두 선택 해제하기, 모두 선택하기, 오름차순 및 내림차순으로 정렬하기, 페이지 크기 변경하기, 페이지를 통해 이동하기를 시도해보세요. 예! 모든 것이 잘 진행되지만, 검색할 때까지요.

[이미지](/assets/img/2024-05-12-Re-inventingthewheelUselist_0.png)

어떤 문제를 발견하셨나요? 화면에 표시된 요소는 9개만 있어야 합니다. 이것은 페이지 2가 4개의 요소만 포함해야 한다는 것을 의미합니다 (실제로 그렇지만), 그리고 마지막 페이지여야 합니다. 그러나 그렇지 않습니다. 요소를 필터링할 때, 페이지네이션 로직이 목록의 현재 상태에 따라 따르지 않습니다. 그 결과, 다른 페이지로 이동하면 아무것도 나타나지 않게 됩니다.



지금, 이러한 오류를 수정하고 코드를 정리해 봅시다:

# 마지막 스프린트

## 우선, 문제를 해결하세요

해결책은 놀랍게도 간단합니다:



```js
export function useList<T, U>(
  dataList: Array<T>,
  { defaultPageSize, filterFn, getId, sortFn }: UseListOptions<T, U>
) {
  const data = React.useMemo(
    () => dataList.filter(filterFn ?? (() => true)),
    [dataList, filterFn]
  )
  ...
}
```

지금은 많은 것을 이름을 다시 지을 필요가 없어요. 우리는 간단히 페이지네이션 및 선택과 같은 다른 기능들을, 필터된 목록을 기반으로 합니다.
이제 예제를 다시 실행하고 변경 사항을 관찰해 보세요:

![Re-inventing the wheel: UseList](/assets/img/2024-05-12-Re-inventingthewheelUselist_1.png)

심지어 모두 선택을 시도해 볼 수 있고, 필터된 결과만 선택됨을 알 수 있을 거예요. 그러나 모든 선택된 값을 삭제하면, "모두 선택" 확인란이 여전히 선택된 채로 남겨진다는 것을 알 수 있을 거예요. 이는 데이터가 변경될 때 선택 목록을 업데이트하지 않기 때문입니다.
이러한 문제를 해결해 봅시다:



```js
export function useList<T, U>(
  dataList: Array<T>,
  { defaultPageSize, filterFn, getId, sortFn }: UseListOptions<T, U>
) {
  ...

  React.useEffect(() => {
    setSelection(new Set([]))
  }, [dataList.length])

  ...
}
```

각 렌더링마다 원본 데이터의 길이가 변경되면 선택 목록을 지웁니다.

네, 우리의 훅은 실제로 더 확장되고 복잡해지고 있습니다. 이제 코드를 정리해봅시다.
(네, 알겠어요. 여전히 깔끔한 코드에 대해서는 이야기를 못하고 있는데 말이죠! 🙄)

## 정리하기



먼저, 각 기능을 자신만의 함수로 분리해 봅시다. 선택 기능부터 시작해 보겠습니다. 선택에 대한 파일을 만들고 다음 코드를 붙여 넣어주세요:

```js
export function useListSelection<T, U>(
  data: Array<T>,
  getId: (element: T) => U
) {
  const [selection, setSelection] = React.useState<Set<U>>(new Set([]))

  React.useEffect(() => {
    setSelection(new Set([]))
  }, [data.length])

  const toogleSelection = React.useCallback(
    (item: T, state?: boolean) =>
      setSelection(currentSelection => {
        const itemId = getId(item)
        const selectionList = new Set(currentSelection)
        if (state || !selectionList.has(itemId)) selectionList.add(itemId)
        else selectionList.delete(itemId)
        return new Set(selectionList)
      }),
    [getId]
  )

  const toogleSelectionAll = React.useCallback(
    (state?: boolean) =>
      setSelection(currentSelection => {
        if (state || currentSelection.size === 0)
          return new Set(data.map(item => getId(item)))
        const selectionList = new Set(currentSelection)
        selectionList.clear()
        return selectionList
      }),
    [data, getId]
  )

  return { selection, toogleSelection, toogleSelectionAll }
}
```

이제 페이징에 대해 해결해 봅시다. 파일을 만들고 아래 코드를 붙여 넣어주세요:

```js
export function useListPagination<T>(data: Array<T>, defaultPageSize: number) {
  const [pageSize, setPageSizeState] = React.useState<number>(defaultPageSize)
  const [index, setIndex] = React.useState<number>(0)

  const currentPage = React.useMemo(
    () => index / pageSize + 1,
    [index, pageSize]
  )

  const pageCount = React.useMemo(() => {
    if (pageSize >= data.length) return 1
    return Math.ceil(data.length / pageSize)
  }, [data.length, pageSize])

  const nextPage = React.useCallback(() => {
    if (pageSize < data.length && index + pageSize < data.length)
      setIndex(currentIndex => currentIndex + pageSize)
  }, [data.length, index, pageSize])

  const previousPage = React.useCallback(() => {
    if (pageSize < data.length && index - pageSize >= 0)
      setIndex(currentIndex => currentIndex - pageSize)
  }, [data.length, index, pageSize])

  const firstPage = React.useCallback(() => setIndex(0), [])

  const lastPage = React.useCallback(() => {
    if (pageSize < data.length && index + pageSize < data.length)
      setIndex(pageSize * (pageCount - 1))
  }, [data.length, index, pageCount, pageSize])

  const goToPage = React.useCallback(
    (destinationPage: number) => {
      if (destinationPage < pageCount)
        setIndex(pageSize * (destinationPage - 1))
    },
    [pageCount, pageSize]
  )

  const setPageSize = React.useCallback(
    (size: number) => {
      setPageSizeState(size)
      const newIndex = Math.floor(index / size) * size
      setIndex(newIndex)
    },
    [index]
  )

  return {
    currentPage,
    firstPage,
    goToPage,
    index,
    lastPage,
    nextPage,
    pageCount,
    pageSize,
    previousPage,
    setPageSize
  }
}
```



그렇죠, 여전히 꽤 크지만 삶이 그런 거에요. 항상 원하는 대로 되는 것은 아니죠. 🤷🏾‍♂️.
자, 이제 메인 후크를 업데이트해 봅시다:

```js
export function useList<T, U>(
  dataList: Array<T>,
  { defaultPageSize, filterFn, getId, sortFn }: UseListOptions<T, U>
) {
  const data = React.useMemo(
    () => dataList.filter(filterFn ?? (() => true)),
    [dataList, filterFn]
  )

  const selection = useListSelection(data, getId)
  const { index, pageSize, ...pagination } = useListPagination(
    data,
    defaultPageSize
  )

  const list = React.useMemo(
    () => [...data].sort(sortFn).slice(index, index + pageSize),
    [data, index, pageSize, sortFn]
  )

  return {
    list,
    pageSize,
    ...pagination,
    ...selection
  }
}
```

"모두 선택" 확인란이 데이터 크기가 변경될 때(예: 삭제 시) 또는 필터링할 때 선택 취소됩니다. 이는 선택을 지우기 위해 사용하는 useEffect가 필터링된 데이터에 기반하고 있기 때문입니다. 사용자가 적용하는 검색 또는 필터와 관계없이 선택을 유지할지 또는 현재 동작을 유지할지 결정할 수 있습니다.

현재 동작을 유지하면 선택은 후크에서 반환한 데이터를 기반으로 하지만, 기존 동작은 최종 사용자가 보기를 결정한 데이터 내용이 아닌 데이터에서 작동할 수 있어 예측할 수 없는 동작을 초래할 수 있습니다. 사용자 경험(UX)과 보안을 위해 현재 구현이 더 나은 선택입니다. 하지만, 여전히 확신이 들지 않는다면, 선택 후크에서 useEffect를 제거하고 그것을 useList 함수로 이동시키고, 의존성을 dataList.length로 변경해보세요.



# 최종 기능

이제 최종 고려 사항은 사용자가 사용하려는 기능을 선택할 수 있는 유연성을 제공하는 것입니다. 사용자가 항상 정렬, 필터링 또는 선택 기능이 필요한 것은 아닐 수 있습니다. 따라서 이러한 기능을 선택 사항으로 허용해야 합니다. 구현 내용을 자세히 살펴보겠습니다.

일부 새로운 아이디어: 사용자가 사용하려는 각 기능에 대해 값을 제공해야 합니다. 예를 들어, 페이지네이션에는 defaultPageSize, 필터링에는 filterFn, 정렬에는 sortFn, 선택 기능에는 getId를 제공해야 합니다. 사용자가 매개변수에 값을 제공하지 않으면 해당 기능이 비활성화됩니다. getId 함수를 제공하지 않고도 액세스하려고 할 경우에도 기능을 사용할 수 있습니다.

이제 당신은 « 네, 그런데 모든 것이 선택 사항이라면, 사용자가 빈 객체를 제공하면 어떻게 되나요? »라고 할 것이고, 저는 그들이 그냥 멍청한 것이라고 말할 것이지만 그것은 아무 문제가 되지 않을 것입니다 😜. 걱정하지 마세요, TypeScript가 우리를 돕기 위해 여기 있습니다. 사용자로부터 최소한 하나의 매개변수를 제공 받기 위해 유틸리티 타입을 생성해야 합니다. 여기에 결과입니다:



```js
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

type UseListOptions<T, U> = {
  defaultPageSize: number
  filterFn: (element: T) => boolean
  getId: (element: T) => U
  sortFn: (elementA: T, elementB: T) => number
}

type UseListParamsType<T, U> = AtLeastOne<UseListOptions<T, U>>
```

이제 UseListParamsType을 훅의 두 번째 매개변수 유형으로 사용하고 완료!

예제 코드의 오류를 수정하는 시간입니다 (일부 매개변수를 제거해서 어떻게 되는지도 시도해보세요):

```js
return (
  <div className="space-y-4">
    <div className="flex justify-between gap-2 items-center">
      <div className="flex justify-start items-center gap-2">
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-full rounded-lg bg-background pl-9 md:w-[200px] lg:w-[336px]"
            placeholder="Search..."
            type="search"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {sort === 'asc' ? (
                  <>
                    <ArrowUpNarrowWide className="size-4 mr-4" />
                    Asc
                  </>
                ) : sort === 'desc' ? (
                  <>
                    <ArrowDownNarrowWide className="size-4 mr-4" />
                    Desc
                  </>
                ) : (
                  <>
                    <ArrowUpDown className="size-4 mr-4" />
                    Sort
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-28 h-fit p-2 bg-background border rounded-md mt-2">
              <DropdownMenuRadioGroup
                value={sort || undefined}
                onValueChange={value => setSort(value as 'asc' | 'desc')}
              >
                <DropdownMenuRadioItem className="cursor-pointer" value="asc">
                  Asc
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="cursor-pointer"
                  value="desc"
                >
                  Desc
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {search && (
          <div>{`${data.filter(order => order.user.toLowerCase().includes(search.toLowerCase())).length} results`}</div>
        )}
      </div>
      {pageSize && setPageSize && (
        <div className="flex justify-end gap-2 items-center">
          <div className="text-muted-foreground text-nowrap">
            Rows per page
          </div>
          <Select
            value={`${pageSize}`}
            onValueChange={value => setPageSize?.(Number(value))}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="bottom">
              {[5, 10, 15, 20, 30, 50].map(size => (
                <SelectItem key={`pageSize-${size}`} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
    <div className="space-y-4">
      {list.map(order => {
        const { amount, date, id, isDelivered, user } = order
        return (
          <Card
            className={cn('p-4', 'flex items-center justify-between')}
            key={id}
          >
            <div className="flex item-center gap-2">
              {selection && toogleSelection && (
                <div className="size-9 grid content-center ml-2">
                  <Checkbox
                    checked={selection.has(id)}
                    id={user}
                    onCheckedChange={state =>
                      toogleSelection(
                        order,
                        typeof state === 'string' ? false : state
                      )
                    }
                  />
                </div>
              )}
              <label
                className={cn(
                  'flex flex-col gap-1',
                  'font-medium leading-none',
                  'cursor-pointer'
                )}
                htmlFor={user}
              >
                <span className="font-semibold">{user}</span>
                <span className="text-sm text-muted-foreground">
                  {format(date, 'PPP')}
                </span>
              </label>
              <div>{isDelivered && <Badge>delivered</Badge>}</div>
            </div>
            <div>{`${amount} $`}</div>
          </Card>
        )
      })}
    </div>
    <div className="flex justify-between items-center">
      {selection && (
        <div className="flex justify-start items-center gap-4">
          <div className="flex flex-col gap-0">
            <div className="flex gap-2 justify-start items-center">
              {toogleSelectionAll && (
                <Checkbox
                  checked={selection.size > 0}
                  id="all-users-selection"
                  onCheckedChange={state =>
                    toogleSelectionAll(
                      typeof state === 'string' ? false : state
                    )
                  }
                />
              )}
              <label
                className="text-muted-foreground cursor-pointer"
                htmlFor="all-users-selection"
              >
                {selection.size > 0 ? `Unselect all` : `Select all`}
              </label>
            </div>
            {data && (
              <p>{`${selection.size} of ${data.length} user(s) selected.`}</p>
            )}
          </div>
          {selection.size > 0 && (
            <Button
              variant="destructive"
              onClick={() => deleteOrders(Array.from(selection))}
            >
              Delete selected users
            </Button>
          )}
        </div>
      )}
      {currentPage && pageCount && (
        <div className={cn('flex justify-start items-center gap-2')}>
          <Button
            disabled={currentPage === 0}
            size="icon"
            variant="outline"
            onClick={firstPage}
          >
            <DoubleArrowLeftIcon className="size-4" />
          </Button>
          <Button
            disabled={currentPage === 0}
            size="icon"
            variant="outline"
            onClick={previousPage}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div className="text-muted-foreground">
            {`Page ${currentPage} of ${pageCount}`}
          </div>
          <Button
            disabled={currentPage >= pageCount}
            size="icon"
            variant="outline"
            onClick={nextPage}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            disabled={currentPage >= pageCount}
            size="icon"
            variant="outline"
            onClick={lastPage}
          >
            <DoubleArrowRightIcon className="size-4" />
          </Button>
        </div>
      )}
    </div>
  </div>
)
```



# 결론

긴 여정이죠? 깊게 숨 쉬세요, 우리는 막 시작했어요. 이 시리즈에서는 리액트 애플리케이션에서 보통 사용하는 몇 가지 유용한 도구들을 새롭게 구현해 볼 거예요.