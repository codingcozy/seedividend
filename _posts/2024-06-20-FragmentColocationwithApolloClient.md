---
title: "ApolloClient와 함께 Fragment Colocation"
description: ""
coverImage: "/assets/img/2024-06-20-FragmentColocationwithApolloClient_0.png"
date: 2024-06-20 00:20
ogImage:
  url: /assets/img/2024-06-20-FragmentColocationwithApolloClient_0.png
tag: Tech
originalTitle: "Fragment Colocation with ApolloClient"
link: "https://medium.com/shippio/fragment-colocation-with-apolloclient-815edbcf7a69"
isUpdated: true
---

<img src="/assets/img/2024-06-20-FragmentColocationwithApolloClient_0.png" />

# Fragment이란 무엇인가요?

Fragment Colocation에 대해 논의하기 전에, 먼저 Fragment가 무엇인지 간단히 설명하겠습니다.

GraphQL에서 Fragment는 쿼리의 재사용 가능한 조각입니다. Fragment를 사용하면 코드 중복을 피하고 쿼리를 구성할 때 특히 여러 쿼리에서 같은 데이터 조각을 검색할 때 쿼리를 조직화할 수 있습니다.

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
fragment UserDetails on User {
  id
  name
  email
}

query GetUser {
  user(id: 1) {
    ...UserDetails
  }
}

query GetAllUsers {
  users {
    ...UserDetails
  }
}
```

이 예제에서는 UserDetails라는 fragment가 정의되었고 GetUser 및 GetAllUsers 쿼리 내에서 재사용됩니다. 이렇게 하면 동일한 데이터 부분을 여러 번 작성할 필요가 없어집니다. (이 코드는 ChatGPT에 의해 생성됨.)

# Fragment Colocation이란

일본에서는 Fragment Colocation(apollo Client에서 fragment 일치)라고도 합니다.

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

Fragment Colocation은 GraphQL fragments가 해당 컴포넌트와 함께 배치되는 디자인 접근 방식입니다. 이 방식은 어떤 컴포넌트가 어떤 데이터를 필요로 하는지 명확히 알려주어 데이터 의존성을 관리하기 쉽게 만들어줍니다.

현대 프런트엔드 개발에서 데이터 가져오기와 표시는 밀접한 관련이 있습니다. 전통적인 방법은 종종 데이터 가져오기 로직을 여러 곳에 분산시켜 유지보수성과 재사용성이 감소하게 됩니다. Fragment Colocation은 이러한 문제를 중앙화하고 효율적으로 데이터 의존성을 조직화함으로써 해결합니다.

# Shippio의 문제점 ⛴

Shippio에서는 Apollo Client를 GraphQL 클라이언트 라이브러리로 사용합니다.

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

그러나 몇 가지 문제가 발생했습니다:

- 자식 컴포넌트가 의존하지 않는 필드를 포함하여 불필요한 props가 전달됩니다.
- 필요한 필드를 추가하려면 부모 컴포넌트의 쿼리 필드를 수정해야 했는데, 이는 상당한 영향을 미쳤습니다.
- props를 통해 전달된 값이 서버에서 가져온 것인지 클라이언트에서 생성된 것인지 명확하지 않았습니다.
- 위 문제를 해결하기 위해 여러 자식 컴포넌트에서 useQuery를 사용하여 필요한 값만 가져오도록 했지만, 이는 GraphQL 같지 않았고 요청 수가 증가했습니다.
- 모든 쿼리를 단일 gql 디렉토리에 중앙 집중시키면 의존하는 컴포넌트를 식별하기 어려워졌습니다.

## 코드 샘플 (실제 코드가 아닙니다)

```js
// 파일 트리

src
├── App.tsx
├── components
│   ├── ShipmentList.tsx
│   ├── ShipmentListHeader.tsx (ShipmentList.tsx의 자식 컴포넌트)
│   ├── ShipmentListItem.tsx (ShipmentList.tsx의 자식 컴포넌트)
└── gql
    ├── ShipmentListQuery.ts (쿼리)
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

```javascript
// gql 폴더의 ShipmentListQuery

import { graphql } from "@/__codegen__";

export const ShipmentListQuery = graphql(`
  query ShipmentListQuery(
    $shipmentId: ID
    ...
  ) {
    shipmentSearch(
      shipmentId: $shipmentId
      ...
    ) {
      team {
       name
      }
      milestones {
        id
        milestoneType
        status
        completionDoneAt
      }
    }
  }
`);

export type ShipmentListQueryItem = ArrayType<Query["shipmentSearch"]>;
```

```javascript
// ShipmentList.tsx (루트 컴포넌트)

export const ShipmentList = () => {

   const { data } = useQuery(ShipmentListQuery,
    { variables: { ... } }
  )

  return (
   <Stack>
     <ShipmentListHeader shipment={data.shipment} />
     <ShipmentListItem shipment={data.shipment} />
   </Stack>
}
```

```javascript
// ShipmentListItem.tsx (ShipmentList.tsx의 하위 컴포넌트)

type Props = {
 shipment: ShipmentListQueryItem;
}
export const ShipmentListItems = ({ shipment }: Props) => {
  return (
   <Stack>
     {shipment.milestones.map((milestone) => (
       <Box key={milestone.id}>
         <Text>{milestone.milestoneType}</Text>
           <Text>{milestone.status}</Text>
           <Text>{milestone.completionDoneAt}</Text>
         </Box>
     )}
   </Stack
}
```

```javascript
// ShipmentListHeader.tsx (ShipmentList.tsx의 하위 컴포넌트)

type Props = {
 shipment: ShipmentListQueryItem;
}

export const ShipmentListHeader = ({ shipment }: Props) => {
  return (
   <Stack>
     <Text>{shipment.team.name}</Text>
   </Stack>
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

처음에는 이 접근 방식이 좋아 보입니다. 하지만 컴포넌트가 더 복잡해지고 구조가 더 중첩되면 위에서 언급한 문제가 발생할 수 있습니다.

## 이슈 예시

- ShipmentListHeader에서 팀 ID를 표시하려면 부모인 ShipmentList 컴포넌트의 쿼리를 수정해야 합니다. (자식 컴포넌트의 변경 사항이 부모 컴포넌트에 영향을 미칩니다.)
- 전체 data.shipment 객체를 전달하는 것은 의도하지 않은 처리로 이어질 수 있습니다.
- ShipmentListItem은 마일스톤만 필요하지만 팀 정보도 받습니다.
- ShipmentListHeader는 팀 정보만 필요하지만 마일스톤도 받습니다.

# Apollo Client를 사용한 Fragment Colocation 연습

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

위의 코드를 Fragment Colocation을 활용하여 개선해 봅시다.

이 글을 사용하기 위해 다음 패키지들이 필요합니다.

```js
@apollo/client
@graphql-codegen/cli
@graphql-codegen/client-preset
```

codegen.ts 파일의 설정은 아래와 같습니다. preset을 client로 설정하여 client-preset의 대부분 기능을 사용할 수 있습니다.

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
// codegen.ts

import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "<schema 경로>",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/__codegen__/": {
      preset: "client",
    },
  },
};

export default config;
```

참고 링크: https://the-guild.dev/graphql/codegen/docs/guides/react-vue

## Fragment Colocation을 사용한 코드 재작성

```js
import { graphql } from '@/__codegen__';

export const ShipmentListQuery = graphql(`
  query ShipmentListQuery(
    $shipmentId: ID
    ...
  ) {
    shipmentSearch(
      shipmentId: $shipmentId
      ...
    ) {
      ...ShipmentListHeaderFragment
      ...ShipmentListItemFragment
    }
  }
`);

export const ShipmentList = () => {

   const { data } = useQuery(ShipmentListQuery,
    { variables: { ... } }
  )

  return (
   <Stack>
     <ShipmentListHeader shipment={data.shipment} />
     <ShipmentListItem shipment={data.shipment} />
   </Stack>
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

```js
import { FragmentType, graphql, useFragment } from "@/__codegen__/"

const fragment = graphql(`
  fragment ShipmentListItemFragment on Milestone {
      milestones {
        id
        milestoneType
        status
        completionDoneAt
      }
  }
`)

type Props = {
 shipmentListItems: FragmentType<typeof fragment>
}

export const ShipmentListItems = ({ shipmentListItems }: Props) => {
   const fragmentData = useFragment(fragment, shipmentListItems)

  return (
   <Stack>
     {fragmentData.map((milestone) => (
       <Box key={milestone.id}>
         <Text>{milestone.milestoneType}</Text>
           <Text>{milestone.status}</Text>
           <Text>{milestone.completionDoneAt}</Text>
         </Box>
     )}
   </Stack>
}
```

```js
import { FragmentType, graphql, useFragment } from "@/__codegen__/"

const fragment = graphql(`
  fragment ShipmentListHeaderFragment on Shipment {
      team {
       name
      }
  }
`)

type Props = {
 shipmentHeader: ShipmentListQueryItem;
}

export const ShipmentListHeader = ({ shipmentHeader }: Props) => {
   const fragmentData = useFragment(fragment, shipmentHeader)

  return (
   <Stack>
     <Text>{fragmentData.team.name}</Text>
   </Stack>
}
```

위 코드에서 다음과 같은 이점을 얻을 수 있습니다:

- 명확한 데이터 종속성: 각 컴포넌트는 필요한 데이터를 명시적으로 정의하여 종속성이 명확해집니다. 자식 컴포넌트에서 GraphQL 서버에서 가져오는 값을 조사하는 것이 더 쉬워집니다.
- 재사용성 향상: Fragment 사용은 코드 재사용을 촉진합니다. Fragment 유형도 생성되므로 타입 재사용이 가능합니다.
- 유지보수성 향상: 쿼리에 대한 변경 사항이 지역화되어 유지보수가 쉬워집니다. 상위 컴포넌트의 쿼리를 수정할 필요가 없습니다.
- 1 기능 컴포넌트에 1 루트 쿼리
- 데이터 캡슐화: Fragment 마스킹을 사용하여 종속성이 없는 컴포넌트에서 의도하지 않은 필드 사용을 차단할 수 있습니다.

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

# 보충: Fragment Masking

Fragment Masking을 사용하면 Fragment 데이터의 속성을 상위 수준 구성 요소에서 숨기고 데이터 가시성을 제어할 수 있습니다. 다시 말해, 캡슐화를 강제합니다.

![이미지](/assets/img/2024-06-20-FragmentColocationwithApolloClient_1.png)

참고: [https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen](https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen)

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

# 결론

Fragment Colocation은 React와 GraphQL을 사용하는 현대 프론트엔드 개발에서 매우 유용한 패턴입니다. 데이터 종속성을 명확히하고 재사용성과 유지보수성을 향상시킴으로써, 개발자는 더 효율적으로 고품질의 코드를 작성할 수 있습니다. 여러분의 프로젝트에서 이 접근 방식을 채택해보고 직접 이점을 경험해보는 것도 좋을 것입니다.

---

만약 이 글이 여러분의 흥미를 자극했고, 이 지식을 활용하고 싶다면, 우리가 채용 중이니 확인해보세요!

아래 링크를 확인해보세요.
▼ 직업 기회

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

**▼ 연락처**
LinkedIn: [Shippio Inc.](https://www.linkedin.com/company/shippioinc/)
Shippio 인사팀 이메일 주소: shippiohr@shippio.io
