---
title: "Amplify vs Firebase 내 실제 제품과의 대면 비교"
description: ""
coverImage: "/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_0.png"
date: 2024-05-12 20:01
ogImage:
  url: /assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_0.png
tag: Tech
originalTitle: "Amplify vs. Firebase: A Head-to-Head Comparison With My Real Product"
link: "https://medium.com/better-programming/amplify-vs-firebase-a-head-to-head-comparison-with-a-real-product-b6fd76058416"
---

## 주요 차이점 및 유사점

![Comparison Image](/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_0.png)

지난 1년간 실제 트래픽과 사용자가 있는 2개 제품을 개발했습니다. 하나는 Amplify를 사용하고, 다른 하나는 Firebase를 사용했습니다. 제가 배운 교훈들과 Amplify와 Firebase를 대조한 비교를 공유하려고 합니다.

이 글을 두 부분으로 나눠 작성하겠습니다. 첫 번째 부분에서는 Firebase에 대해, 두 번째 부분에서는 Amplify에 대해 이야기하겠습니다.

# 왜 Firebase 또는 Amplify를 사용해야 하나요?

간단히 말해서, 나는 경력이 4년인 프론트엔드 엔지니어입니다. 제 경험상 본업급 백엔드에 거의 관여한 적이 없어 백엔드 품질에 대한 최고의 실천 방법에 대한 지식이 적다고 가정해도 좋습니다.

제품 개발에 집중하고 싶으며, 인증, 데이터베이스 CRUD, 자산 저장, 그리고 물론 백엔드 보안을 포함한 백엔드 측면의 품질을 희생하지 않고 가장 빠르게 출시하고자 합니다.

Amplify와 Firebase는 모두 동일한 문제를 해결하는데, 즉 프론트엔드 웹 및 모바일 개발자가 쉽게 앱 또는 게임을 빌드하고 확장할 수 있는 완벽한 솔루션을 제공한다는 점입니다.

# 파이어베이스를 사용하여 만든 내가 만든 것

세계 각지의 플레이어들이 게임 속에 출시되기를 원하는 모든 노래 위시리스트를 수집하기위해 프로젝트 세카이를 기반으로 한 커뮤니티 페이지를 만들었습니다.

![이미지](/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_1.png)

# 내 프로젝트에서 사용한 파이어베이스 기능

## 인증

Firebase Authentication을 사용하여 사용자 인증 및 권한 부여를 처리했어요. 많은 인증 옵션이 있지만, 이 프로젝트에서는 Google 로그인과 Twitter 로그인을 선택했어요.

![이미지](/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_2.png)

## Firestore

Cloud Firestore를 데이터베이스 옵션으로 사용했어요. 이는 MongoDB와 유사한 문서 기반 구조를 가진 NoSQL 데이터베이스입니다. 이 데이터베이스를 사용하여 다음을 처리했어요:

- 내장된 실시간 업데이트로 사용자 투표

![](/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_3.png)

- 사용자가 소원 노래를 제출

![이미지](/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_4.png)

- 게임에서 이미 출시된 노래를 관리합니다.

![이미지](/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_5.png)

## 저장소

저는 이미지 배너와 같은 자산 저장을 다루는 간단한 사용 사례를 가지고 있는 Cloud Storage를 사용했어요.

## 보안 규칙

저는 사용자가 특정 데이터에 접근할 수 있도록 조작할 수 있는 보안 규칙을 사용했어요.

## Algolia

Cloud Firestore은 데이터 조작 기능이 훌륭하지만 한 가지 중요한 기능을 수행할 수 없습니다: 전체 텍스트 및 부분 텍스트 검색입니다. 그러나 Firebase는 Algolia 검색과 통합하는 것을 지원하는 우선 순위 옵션을 제공합니다.

# Firebase의 장단점

## 장점

- 생산성 — Firebase는 프론트엔드 엔지니어를 위한 훌륭한 기능을 갖추고 있어 제품을 빨리 출시하고 사용자 트래픽에 따라 자동으로 확장하며 보안을 보장하는 데 큰 도움이 됩니다. Firebase의 내부에는 GCP 자체가 있어 Firebase 프로젝트의 기능을 Google Cloud Platform으로 쉽게 확장할 수 있습니다.
- 학습 곡선 — Firebase 기능과의 통합이 매우 직관적이기 때문에 학습 곡선이 낮습니다.
- 인증 — Firebase 인증은 Google, Apple, Facebook, Twitter, Microsoft, GitHub, Yahoo와 같은 제3자 서비스와의 통합을 위한 많은 내장 지원이 있습니다.

## 단점

어드민 패널이 없음 — Firebase에는 내장된 어드민 패널이 제공되지 않습니다. 사용자들은 Firebase 콘솔 내에서 데이터를 직접 조작할 수 있지만, UI가 기술 지식이 없는 사람들에겐 너무 기술적일 수 있습니다. 이 경우, 별도의 어드민 패널을 만들어야 합니다.

![이미지](/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_6.png)

전체 또는 부분 텍스트 검색 미지원 — 부분 또는 전체 텍스트 검색을 수행하는 데 필요한 기능이 내장되어 있지 않기 때문에, Algolia, Elasticsearch, 또는 Typesense와 같은 제3자 서비스와 통합해야 합니다.

데이터베이스 객체 모델링 - 이 프로젝트를 개발할 때, 저는 여전히 Firebase 버전 8.10.0을 사용하고 있었는데, 클라우드와 코드 간 데이터 유형의 일관성을 유지하는 것이 꽤 어려웠습니다. MongoDB와 같은 데이터베이스는 객체 모델링을 위한 Mongoose와 같은 솔루션이 있지만, Firestore에 대한 유사한 솔루션을 찾지 못했습니다. 이는 때때로 필드 이름에 오타가 있거나, 필드 이름이 아직 정의되지 않아서 생산성과 코드 품질이 떨어지게 만듭니다.

하지만 Firebase의 최신 버전에서는 이 문제를 해결할 수 있는 사용자 정의 객체를 처리하는 기능이 있습니다:

```js
class City {
  constructor(name, state, country) {
    this.name = name;
    this.state = state;
    this.country = country;
  }
  toString() {
    return this.name + ", " + this.state + ", " + this.country;
  }
}

// Firestore 데이터 컨버터
const cityConverter = {
  toFirestore: (city) => {
    return {
      name: city.name,
      state: city.state,
      country: city.country,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new City(data.name, data.state, data.country);
  },
};
```

# Amplify를 활용해 만들어본 것

코스프레 취미를 위한 전체적인 의상 대여 샵을 만들었어.

![이미지](/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_7.png)

# 내 프로젝트에서 사용한 Amplify 기능

- Amazon Cognito — 사용자 인증 및 권한 부여를 처리하기 위해 Amazon Cognito를 사용했어. 다양한 인증 옵션이 있지만, 이 프로젝트에서는 Google 및 Facebook 로그인을 선택했어.
- Amazon CloudFormation — AWS CloudFormation을 사용하면 인프라를 코드로 처리하여 AWS 및 제3자 리소스를 모델링, 프로비저닝 및 관리할 수 있어. CloudFormation 덕분에 스테이징 및 프로덕션과 같은 브랜치 환경을 쉽게 만들 수 있어.
- Amazon AppSync — AWS AppSync을 사용하면 서버리스 GraphQL 및 Pub/Sub API를 생성해 어플리케이션 개발을 단순화할 수 있어. 안전하게 데이터 쿼리, 업데이트 또는 게시하는 단일 엔드포인트를 통해 애플리케이션 개발을 단순화할 수 있어.
- Amazon DynamoDB — Firestore를 사용하는 문서 기반 컨셉에 대해 이전 섹션에서 소개했었어. 다른 쪽으로 DynamoDB는 Redis와 유사한 키-값 스키마를 사용해. 웹사이트의 모든 데이터(사용자 데이터, 제품 데이터, 거래 데이터, 결제 데이터 등)를 처리하기 위해 DynamoDB를 사용했어.
- Amazon S3 — S3는 어디서든 어떤 양의 데이터든 검색할 수 있는 객체 저장소야. 제품 이미지, 웹사이트 자산, 사용자 자산을 처리하기 위해 Amazon S3를 사용했어.
- Amazon Pinpoint — Amazon Pinpoint는 대상 멀티채널 통신 도구야. Google Analytics의 AWS 플랫폼용 동등물이야. 웹사이트 관련 추적 및 분석을 처리하기 위해 Amazon Pinpoint를 사용했어.
- Amazon Lambda — Amazon Lambda는 서버리스, 이벤트 주도형 컴퓨팅 서비스야. 결제 게이트웨이 및 택배 게이트웨이와 같은 제3자 공급업체와의 모든 API 통신을 처리하기 위해 AWS Lambda를 사용했어.

# Amplify의 장단점

## 장점

- Amplify Studio — 이전 섹션에서 논의된 Firebase 버전과 달리, AWS Amplify에는 Amplify Studio라는 일반 관리 패널이 함께 제공됩니다. Amplify Studio는 데이터 관리, 사용자 관리 및 자산 관리를 처리할 수 있습니다. Amplify Studio의 기능을 보여주는 몇 가지 예시는 다음과 같습니다.

![Amplify Studio](/assets/img/2024-05-12-AmplifyvsFirebaseAHead-to-HeadComparisonWithMyRealProduct_8.png)

- CloudFormation - AWS CloudFormation을 사용하면 환경을 쉽게 복제할 수 있습니다. 특히 스테이징 및 프로덕션 환경을 구축할 때 유용합니다. Firebase와 비교했을 때 이것이 주요 장점 중 하나입니다.
- 데이터베이스 객체 모델링 - AWS AppSync을 통해 GraphQL 스키마 유형을 사용하여 데이터베이스 스키마를 정의할 수 있습니다. 이것은 '데이터베이스를 코드로' 접근 방식을 만들어 모든 데이터 구성에서 일관성을 보장합니다. 또한 이 스키마를 사용하여 데이터 인가를 구성할 수도 있습니다.

```js
type Products @model @auth(rules: [{allow: public}]) {
  id: ID!
  available_size: [AvailableSizeEnums!]!
  day_rent_price: Int!
  is_active: Boolean!
  minimum_rent_duration: Int!
  product_name: String!
  quantity: Int!
  weight: Int!
  s3_path: String!
  product_image: [String!]!
  product_description: String!
}
```

전체-부분-텍스트 검색 - Amazon은 Amazon OpenSearch로 검색을 처리하는 내장 기능을 제공합니다.

## 단점

인증 - AWS Cognito는 Firebase와 비교했을 때 소셜 통합 옵션이 적습니다. Amazon, Facebook, Google 및 Apple을 통한 로그인 옵션이 있지만 Auth0와 연동하여 확장할 수 있습니다.

학습 곡선 - AWS Amplify는 Firebase에 비해 UI 엔지니어들에게 이해하기 어려운 학습 곡선을 가지고 있다고 느껴져요. Amplify는 AWS 리소스를 관리하기 위한 구축 블록이자 CLI 가이드 명령어일뿐입니다. 따라서 Amplify가 어떻게 작동하는지 이해하려면 여러 AWS 제품을 이해해야 합니다. 예를 들어, DynamoDB에 새 데이터 필드를 추가하려면 Firestore와 달리 몇 단계를 거쳐야 합니다.

커뮤니티 토론 부족 - 앞서 말한대로 AWS Amplify는 학습 곡선이 높습니다. 그래서 오류, 문제 또는 모르는 것을 만났을 때 Firebase와 비교하여 Stack Overflow나 GitHub의 토론 및 질의응답이 적습니다. 게다가 AWS 개발자 지원을 구독하여 기술적인 질문이 있을 경우 AWS에서 직접 개발자 지원을 받을 수 있습니다.

# 결론

프론트엔드 엔지니어로서, Amplify와 Firebase는 우리가 직접 제품을 만들 때 백엔드와 관련된 복잡한 문제를 해결할 수 있는 좋은 도구입니다. 어떤 것을 더 선호하는지 물어본다면, 그것은 상황에 따라 다르겠죠.

커뮤니티와 함께 재미있는 것이나 별로 중요하지 않은 제품을 만들고 싶다면 Firebase를 선택할 것입니다. 하지만 본격적인 제품을 만들어 나의 부수입을 올리고 싶다면 Amplify를 선택할 것입니다.

# 자료

- [Amplify 문서](https://docs.amplify.aws/)
- [Firebase 문서](https://firebase.google.com/docs)
