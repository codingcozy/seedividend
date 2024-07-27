---
title: "CDK 중첩 스택 - 왜와 어떻게"
description: ""
coverImage: "/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_0.png"
date: 2024-06-20 02:39
ogImage: 
  url: /assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_0.png
tag: Tech
originalTitle: "CDK Nested Stacks — The “Why” and “How”"
link: "https://medium.com/@leejamesgilmore/cdk-nested-stacks-the-why-and-how-3f836528045d"
---



![CDK Nested Stacks](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_0.png)

## 시작말

✔️ 우리는 중첩 스택의 필요성에 대해 이야기합니다.
✔️ AWS CDK로 어떻게 이것이 실현될 수 있는지 논의합니다.

# 소개 👋🏽


<div class="content-ad"></div>

이 빠른 기사에서는 AWS CDK 중첩 스택에 대해 이야기하고, 언제 우리 서비스에 사용해야 하는지, 그리고 이를 어떻게 구현할 수 있는지에 대해 살펴볼 것입니다. 예제 코드 베이스를 통해 걸어 보기 위해 'Gilmore Cuisine'라는 가상 회사를 다룰 것입니다:

![image](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_1.png)

기사의 코드는 GitHub에서 여기에서 찾을 수 있습니다:

더 자세한 기사와 예제는 Serverless Advocate 패턴 및 솔루션 레지스트리를 자유롭게 이용해 주세요:

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_2.png" />

# 어떻게 작동할까요? 💡

애플리케이션을 구축할 때 클라우드포메이션에서 스택 당 500개의 리소스 제한에 도달하는 경우가 종종 있습니다.

이것은 우리가 아마도 내부적으로 많은 리소스를 포함하는 우리만의 L3 구성을 사용했기 때문에 발생할 수 있습니다. 예를 들어 알람, 점진적 배포, 대시보드 등을 포함하는 람다 구성이 있는 경우이며, 우리는 이 구성을 스택에서 여러 번 사용하여 제한을 초과하게 됩니다.

<div class="content-ad"></div>

AWS CDK의 NestedStack 구조는 부모 스택 내에서 하나의 자원으로 계산하여 스택 당 AWS CloudFormation 500개 자원 제한을 우회할 수 있게 해줍니다. 이는 중첩 스택이 다른 중첩 스택을 포함하여 최대 500개의 자원을 가질 수 있다는 것을 의미합니다. 중첩 스택은 구조화된 스택의 계층을 가질 수 있습니다:

![CDK Nested Stacks hierarchy](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_3.png)

중첩 스택의 범위(본질적으로 부모)는 AWS CDK의 Stack 또는 NestedStack 구조여야 합니다. 기존의 스택과 마찬가지로 중첩 스택에서의 구조 정의는 동일합니다.

합성 과정에서 중첩 스택은 자체 AWS CloudFormation 템플릿으로 변환되어 AWS CDK 스테이징 버킷에 업로드됩니다. 중첩 스택은 부모 스택에 바인딩되어 독립적인 배포 자산으로 처리되지 않습니다.

<div class="content-ad"></div>

부모 스택과 중첩 스택 간의 리소스 속성의 상호 참조는 AWS CDK를 사용할 때 자동으로 스택 매개변수와 출력으로 변환됩니다.

다음 섹션의 코드를 살펴봅시다.

👇 더 나아가기 전에 — 앞으로의 블로그 게시물과 서버리스 뉴스를 받으시려면 LinkedIn에서 저와 연결해주세요 https://www.linkedin.com/in/lee-james-gilmore/

![CDK Nested Stacks](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_4.png)

<div class="content-ad"></div>

# 코드를 통해 이야기하기👨‍💻

내 작업을 따르는 사람들은 일반적으로 애플리케이션을 '상태 없음'과 '상태 있는' 리소스로 분할하는 것을 알고 있을 것입니다. 또한 깔끔한 코드 및 아키텍처에 대한 내 의견이 있습니다.

이 경로를 계속 따라가서 중첩 스택을 사용하려면 폴더 구조 관점에서 다음과 같이 보일 것입니다:

![Folder Structure](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_5.png)

<div class="content-ad"></div>

이제 이제는 'stateful' 및 'stateless'의 상위 스택 아래 하나 이상의 중첩된 스택을 가지고 있음을 쉽게 확인할 수 있습니다. 그리고 그 스택이 개념적 수준에서 무엇을 포함하는지 볼 수 있습니다(API 리소스, 데이터베이스 리소스, 이벤트 버스 리소스 및 컴퓨팅 리소스).

이제 폴더 구조를 확장해 보면:

![image](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_6.png)

중첩된 스택에는 파일에 'nested'가 추가된 단어도 있습니다. 이는 생성된 파일과 콘솔에 표시되어 이해하기 쉽게 만듭니다.

<div class="content-ad"></div>

우리의 상태 유지 스택 코드를 살펴보면 다음과 같은 내용을 볼 수 있습니다:

```js
import * as cdk from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { DatabaseResources } from './nested/database/database-nested';
import { EventBusResources } from './nested/event-bus/event-bus-nested';

export interface GilmoreCuisineStatefulStackProps extends cdk.StackProps {
  stage: string;
}

export class GilmoreCuisineStatefulStack extends cdk.Stack {
  public databaseResources: DatabaseResources;
  public eventBusResources: EventBusResources;

  constructor(
    scope: Construct,
    id: string,
    props: GilmoreCuisineStatefulStackProps
  ) {
    super(scope, id, props);

    // 두 상태 유지 중첩 스택을 가져와서 인스턴스화합니다.
    this.databaseResources = new DatabaseResources(this, 'DatabaseResources', {
      stage: props.stage,
    });

    this.eventBusResources = new EventBusResources(this, 'EventBusResources', {
      stage: props.stage,
    });
  }
}
```

위에서 볼 수 있듯이, 우리의 상위 스택은 두 중첩된 스택을 가져와서 그것들을 인스턴스화합니다.

그런 다음 DatabaseResources 중첩 스택을 살펴보면 다음과 같은 내용을 볼 수 있습니다:

<div class="content-ad"></div>

```js
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

import { Construct } from 'constructs';

interface DatabaseResourcesProps extends cdk.NestedStackProps {
  stage: string;
}

export class DatabaseResources extends cdk.NestedStack {
  public table: dynamodb.Table;

  constructor(scope: Construct, id: string, props: DatabaseResourcesProps) {
    super(scope, id, props);

    // our database is a static resource
    this.table = new dynamodb.Table(this, 'Table', {
      tableName: `gilmore-cuisine-table-${props.stage}`,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
```

특히 이 스택이 cdk.Stack이 아닌 부모와 같이 cdk.NestedStack을 확장하는 것을 볼 수 있습니다.

이제 상태 리소스를 사용하는 ComputeResources 중첩 스택으로 이동하면 다음과 같은 코드가 나옵니다:

```js
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

import { Construct } from 'constructs';

interface ComputeResourcesProps extends cdk.NestedStackProps {
  stage: string;
  api: apigw.RestApi;
}

export class ComputeResources extends cdk.NestedStack {
  private api: apigw.RestApi;
  private table: dynamodb.Table;
  private bus: events.EventBus;

  constructor(scope: Construct, id: string, props: ComputeResourcesProps) {
    super(scope, id, props);

    this.api = props.api;

    // 상태 리소스에서 테이블의 인스턴스 가져오기
    this.table = dynamodb.Table.fromTableName(
      this,
      'Table',
      `gilmore-cuisine-table-${props.stage}`
    ) as dynamodb.Table;

    // 상태 리소스에서 bus의 인스턴스 가져오기
    this.bus = events.EventBus.fromEventBusName(
      this,
      'EventBus',
      `gilmore-cuisine-event-bus-${props.stage}`
    ) as events.EventBus;

    // 람다 파우어툴즈 설정 생성
    const lambdaPowerToolsConfig = {
      LOG_LEVEL: 'DEBUG',
      POWERTOOLS_LOGGER_LOG_EVENT: 'true',
      POWERTOOLS_LOGGER_SAMPLE_RATE: '1',
      POWERTOOLS_TRACE_ENABLED: 'enabled',
      POWERTOOLS_TRACER_CAPTURE_HTTPS_REQUESTS: 'captureHTTPsRequests',
      POWERTOOLS_SERVICE_NAME: 'gilmore-cuisine-service',
      POWERTOOLS_TRACER_CAPTURE_RESPONSE: 'captureResult',
      POWERTOOLS_METRICS_NAMESPACE: 'gilmore-cuisine',
    };

    // 람다 함수 생성
    const listBookingsLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, 'ListBookingsLambda', {
        functionName: `${props.stage}-gilmore-cuisine-list-bookings`,
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(
          __dirname,
          '../../src/adapters/primary/list-bookings/list-bookings.adapter.ts'
        ),
        memorySize: 1024,
        handler: 'handler',
        tracing: lambda.Tracing.ACTIVE,
        bundling: {
          minify: true,
          sourceMap: true,
        },
        environment: {
          NODE_OPTIONS: '--enable-source-maps',
          ...lambdaPowerToolsConfig,
          TABLE_NAME: this.table.tableName,
          BUS: this.bus.eventBusName,
        },
      });

    const createBookingLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, 'CreateBookingLambda', {
        functionName: `${props.stage}-gilmore-cuisine-create-booking`,
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(
          __dirname,
          '../../src/adapters/primary/create-booking/create-booking.adapter.ts'
        ),
        memorySize: 1024,
        handler: 'handler',
        tracing: lambda.Tracing.ACTIVE,
        bundling: {
          minify: true,
          sourceMap: true,
        },
        environment: {
          NODE_OPTIONS: '--enable-source-maps',
          ...lambdaPowerToolsConfig,
          TABLE_NAME: this.table.tableName,
          BUS: this.bus.eventBusName,
        },
      });

    // 함수에 대한 테이블 권한 부여
    this.table.grantReadData(listBookingsLambda);
    this.table.grantWriteData(createBookingLambda);

    // 함수가 메시지를 발행하도록 허용
    this.bus.grantPutEventsTo(createBookingLambda);

    // 올바른 API 리소스에 람다 함수 추가
    const orders = this.api.root
      .getResource('v1')
      ?.getResource('bookings') as apigw.Resource;

    orders.addMethod(
      'GET',
      new apigw.LambdaIntegration(listBookingsLambda, {
        proxy: true,
      })
    );

    orders.addMethod(
      'POST',
      new apigw.LambdaIntegration(createBookingLambda, {
        proxy: true,
      })
    );
  }
}
```

<div class="content-ad"></div>

위에서 볼 수 있듯이 DynamoDB 테이블 및 EventBridge 이벤트 버스의 상태를 전달하는 것이 아니라, 다음 메서드를 사용하여 그들에 대한 참조를 얻고 있습니다.

```js
...
// 상태를 가진 스택에서 테이블의 인스턴스를 가져옴
this.table = dynamodb.Table.fromTableName(
  this,
  'Table',
  `gilmore-cuisine-table-${props.stage}`
) as dynamodb.Table;

// 상태를 가진 스택에서 이벤트 버스의 인스턴스를 가져옴
this.bus = events.EventBus.fromEventBusName(
  this,
  'EventBus',
  `gilmore-cuisine-event-bus-${props.stage}`
) as events.EventBus;
...
```

그러나 이는 상태를 가진 스택이 상태가 없는 스택보다 먼저 배포되어야 함을 의미합니다. 이는 의존성에 관한 다음과 같이 메인 애플리케이션 파일에서 확실하게 할 수 있습니다.

```js
#!/usr/bin/env node

import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';

import { GilmoreCuisineStatefulStack } from '../stateful/stateful';
import { GilmoreCuisineStatelessStack } from '../stateless/stateless';

const stage = 'prod';

const app = new cdk.App();

const stateful = new GilmoreCuisineStatefulStack(
  app,
  'GilmoreCuisineStatefulStack',
  {
    stage,
  }
);

const stateless = new GilmoreCuisineStatelessStack(
  app,
  'GilmoreCuisineStatelessStack',
  {
    stage,
  }
);

// stateless가 stateful보다 먼저 배포되도록 함
stateless.addDependency(stateful);
```

<div class="content-ad"></div>

다음 섹션에서 해결책을 배포하고 테스트해 봅시다.

## 배포 및 테스트 🧑🏾‍💻

그럼 이제 'gilmore-cuisine' 폴더에서 다음 명령을 실행하여 스택을 배포해 보겠습니다:


npm run deploy


<div class="content-ad"></div>

동일한 폴더에서 cdk 목록 명령을 실행하면 앞서 설명한대로 두 개의 상위 스택만 볼 수 있습니다:

![CDK Nested Stacks](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_7.png)

합성된 CloudFormation 템플릿 및 에셋이 포함된 cdk.out 폴더를 로컬로 확인하면 다음 파일들이 표시됩니다:

두 개의 상위 템플릿, GilmoreCuisineStatefulStack.template.json 및 GilmoreCuisineStatelessStack.template.json,이 있음을 확인할 수 있습니다. 이들은 아래와 유사한 내용을 가지고 있으며 중첩 스택을 가리킵니다:

<div class="content-ad"></div>

```js
...
"UpdateReplacePolicy": "Delete",
"DeletionPolicy": "Delete",
"Metadata": {
  "aws:cdk:path": "GilmoreCuisineStatefulStack/EventBusResources.NestedStack/EventBusResources.NestedStackResource",
  "aws:asset:path": "GilmoreCuisineStatefulStackEventBusResourcesAC59B19D.nested.template.json",
  "aws:asset:property": "TemplateURL"
}
...
```

배포가 완료되면 콘솔로 전환하여 콘솔에 중첩 스택이 표시되지 않도록 설정하면 다음과 같이 표시됩니다:

이제 콘솔에서 두 스택의 하위 중첩 스택을 살펴보겠습니다:

이제 각 스택의 내용을 자세히 살펴보겠습니다:

<div class="content-ad"></div>

## ✔️ Stateful Stack

상태 유지 스택 안에는 DatabaseResources와 EventBusResources에 대한 중첩 스택을 볼 수 있습니다:

보다 자세한 내용을 살펴보면 다음과 같습니다:

DatabaseResources
우리의 DynamoDB 테이블이 포함된 DatabaseResources에 대한 중첩 스택을 볼 수 있습니다.

<div class="content-ad"></div>

EventBusResources
이벤트 버스, CloudWatch 로그 그룹 및 이벤트 규칙 대상을 포함하는 EventBusResources의 중첩 스택을 볼 수 있습니다:

이제 무상태 스택과 관련된 내용을 살펴보겠습니다.

## ✔️ 무상태 스택

무상태 스택에는 ApiResources 및 ComputeResources의 두 개의 중첩 스택이 표시됩니다.

<div class="content-ad"></div>

ApiResources
아래에서 ApiResources에 대한 중첩 스택을 볼 수 있는데, API Gateway REST API, 스테이지, 배포 등이 포함되어 있습니다.

ComputeResources
아래에서 ComputeResources에 대한 중첩 스택을 볼 수 있는데, 두 개의 람다 함수가 포함되어 있습니다:

## 테스팅 🧪

<img src="/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_8.png" />

<div class="content-ad"></div>

만약 Postman 파일을 사용하여 /bookings/의 POST 엔드포인트를 요청하면 다음과 같은 결과를 볼 수 있습니다:

![이미지](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_9.png)

그리고 CloudWatch 로그의 모든 이벤트를 캐치하는 대상을 살펴보면 아래와 같이 이벤트가 표시됩니다:

![이미지](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_10.png)

<div class="content-ad"></div>

아래는 목록 예약 엔드포인트를 실행할 수도 있어요. 

이것을 보여 주겠죠: 

![List Bookings EndPoint](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_12.png)

# 결론  

<div class="content-ad"></div>

이 글을 읽어주셔서 감사합니다. 마지막으로 다룬 내용을 요약하면 다음과 같습니다:

- 중첩 스택이 필요한 이유에 대해 이야기했습니다.
- AWS CDK를 사용하여 이를 어떻게 구현할 수 있는지에 대해 이야기했습니다.

# 마무리 인사 👋🏽

이 짧은 글을 즐겁게 읽어주셨기를 바라며, 마음에 드셨다면 공유해 주시고 피드백을 주세요!

<div class="content-ad"></div>

비슷한 콘텐츠를 더 보고 싶다면 제 YouTube 채널을 방문해주세요!

![YouTube](/assets/img/2024-06-20-CDKNestedStacksTheWhyandHow_13.png)

그리고 다음 링크를 통해 연락할 수도 있어요:

[LinkedIn 프로필](https://www.linkedin.com/in/lee-james-gilmore/)
[Twitter 프로필](https://twitter.com/LeeJamesGilmore)

<div class="content-ad"></div>

만약 이 게시물을 즐겼다면, 추가 포스트/시리즈를 확인하려면 제 프로필 Lee James Gilmore를 팔로우해 주세요. 또한 'clap' 기능을 이용해 주세요. 게시물 하단에 위치해 있습니다. 한 번 이상으로도 클랩을 할 수 있어요! 

# 나에 대해

"안녕하세요, 저는 영국에 거주하고 있는 AWS 커뮤니티 빌더, 블로거, AWS 인증 클라우드 아키텍트이자 기술 및 아키텍처 글로벌 총괄인 Lee입니다. 현재 City Electrical Factors (UK) 및 City Electric Supply (US)에서 근무 중이며, 지난 6년간 주로 AWS에서 풀스택 JavaScript를 사용해 왔습니다."

<div class="content-ad"></div>

저는 모든 것을 AWS, 혁신, 소프트웨어 아키텍처, 그리고 기술에 대한 사랑으로 서버리스를 옹호하는 사람이라고 생각해요.

*** 제공된 정보는 제 개인적인 견해이며, 그에 따른 책임을 지지 않습니다. ***

아래 내용도 관심이 있을지도 모릅니다: