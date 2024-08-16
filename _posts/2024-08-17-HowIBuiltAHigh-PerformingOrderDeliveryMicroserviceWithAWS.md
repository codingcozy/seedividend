---
title: "AWS로 고성능 주문 배송 마이크로서비스를 구축한 방법"
description: ""
coverImage: "/assets/img/2024-08-17-HowIBuiltAHigh-PerformingOrderDeliveryMicroserviceWithAWS_0.png"
date: 2024-08-17 01:12
ogImage: 
  url: /assets/img/2024-08-17-HowIBuiltAHigh-PerformingOrderDeliveryMicroserviceWithAWS_0.png
tag: Tech
originalTitle: "How I Built A High-Performing Order Delivery Microservice With AWS"
link: "https://medium.com/aws-in-plain-english/how-i-built-a-high-performing-order-delivery-microservice-with-aws-35f40be81a54"
isUpdated: false
---


![Alt text](/assets/img/2024-08-17-HowIBuiltAHigh-PerformingOrderDeliveryMicroserviceWithAWS_0.png)

약 한 달 전에 고객으로부터 주문 배송 시스템을 만들어 달라는 제안을 받았어요.

고객은 고객이 웹사이트에서 주문한 주문을 처리할 수 있는 시스템이 필요했어요.

고객은 현재 저 트래픽 웹사이트를 운영하고 있어 스케일링이 필요하지 않았지만, 미래에 더 많은 수익을 얻고자 접근성을 고려하여 확장 가능한 시스템을 구축할 수 있느냐고 물었어요.

<div class="content-ad"></div>

솔루션 아키텍처를 설계한 후에 어떤 것을 고안했는지에 대한 일반적인 개요를 제시합니다.

# 솔루션 개요

- 내가 개발한 솔루션의 프런트엔드 앱을 호출하기 위한 API 게이트웨이로 AWS API Gateway를 사용했습니다.
- 서버 코드의 대부분을 처리하기 위해 AWS Lambda 함수를 사용했습니다.
- 주 데이터베이스로 Amazon DynamoDB를 사용했습니다.
- 주문을 대기시키기 위해 Amazon SQS를 사용했습니다.
- 주문 영수증을 저장하기 위해 Amazon S3를 사용했습니다.
- PDF 영수증 및 이미지와 같은 정적 자산을 캐시하기 위해 Amazon CloudFront를 사용했습니다.
- 주문을 위해 이메일을 보내기 위해 Amazon SES를 사용했습니다.
- 필요한 모든 리소스를 JavaScript로 AWS CDK(Cloud Development Kit)를 사용하여 생성했습니다.
- 데이터베이스에서 캐싱을 처리하고 싶지 않아서 프런트엔드에서 캐싱을 구현했습니다(react-query를 사용). 

# API Gateway & Lambda

<div class="content-ad"></div>

AWS CDK를 사용하여 다음 엔드포인트를 노출하는 서버리스 API Gateway를 프로비저닝했어요:

- 배달 주문하기
- 긴급 배달 주문하기
- 주문 세부 정보 가져오기
- 주문 수정하기 (“배송” 상태가 되기 전)
- 주문 취소하기 (“배송” 상태가 되기 전)

다음은 AWS Lambda를 생성하는 데 사용한 필수적인 CDK 코드입니다.

```js
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as ses from 'aws-cdk-lib/aws-ses';
import { Construct } from 'constructs';

export class BookingSystemBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // '?urgent=true' 쿼리 파라미터로 일반 주문 및 긴급 주문하는 기능
    const placeOrderFunction = new lambda.Function(this, 'PlaceOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'placeOrder.handler',
      environment: {
        TABLE_NAME: table.tableName,
        AWS_REGION: this.region,
      },
    });

    const fetchOrderFunction = new lambda.Function(this, 'FetchOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'fetchOrder.handler',
      environment: {
        TABLE_NAME: table.tableName,
        AWS_REGION: this.region,
      },
    });

    const modifyOrderFunction = new lambda.Function(this, 'ModifyOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'modifyOrder.handler',
      environment: {
        TABLE_NAME: table.tableName,
        AWS_REGION: this.region,
      },
    });

    const cancelOrderFunction = new lambda.Function(this, 'CancelOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'cancelOrder.handler',
      environment: {
        TABLE_NAME: table.tableName,
        AWS_REGION: this.region,
      },
    });

    table.grantReadWriteData(placeOrderFunction);
    table.grantReadWriteData(fetchOrderFunction);
    table.grantReadWriteData(modifyOrderFunction);
    table.grantReadWriteData(cancelOrderFunction);
  }
}
```

<div class="content-ad"></div>

위 코드 아래에 해당 API Gateway 엔드포인트에 다음을 추가했습니다:

```js
const api = new apigateway.RestApi(this, 'OrdersAPI', {
  restApiName: 'OrdersAPI',
  description: '고객 주문 처리',
});

// /orders 리소스 생성
const orders = api.root.addResource('orders');
const placeOrderAPI = new apigateway.LambdaIntegration(placeOrderFunction);
orders.addMethod('POST', placeOrderAPI);

// /orders/{orderID} 리소스 생성
const order = orders.addResource('{orderID}');
const fetchOrderDetailsAPI = new apigateway.LambdaIntegration(fetchOrderFunction);
order.addMethod('GET', fetchOrderAPI); // 주문에 대한 세부 정보 가져오기

// 주문 수정
const modifyOrderAPI = new apigateway.LambdaIntegration(modifyOrderFunction);
order.addMethod('PUT', modifyOrderAPI); // 주문 수정

// 주문 취소
const cancelOrderAPI = new apigateway.LambdaIntegration(cancelOrderFunction);
order.addMethod('DELETE', cancelOrderAPI); // 주문 취소
```

DynamoDB에 새 주문을 만드는 Lambda 코드는 다음과 같습니다:

```js
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

export const handler = async (event) => {
  const { orderID, orderDetails, customer } = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: marshall({
      pk: orderID,
      sk: orderID,
      ...customer,
      ...orderDetails,
      createdAt: new Date().toISOString(),
    }),
  };

  try {
    await client.send(new PutItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "주문이 성공적으로 처리되었습니다!" }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "주문 처리에 실패했습니다.", error: error.message }),
    };
  }
};
```

<div class="content-ad"></div>

위의 람다 코드는 피치 요청으로 주문, 고객 등의 값을 수용하여 params 객체에 추가하고 DynamoDB에 PutItemCommand를 생성합니다.

수정 및 삭제는 비슷하니 건너뜁니다.

# DynamoDB

DynamoDB를 사용하여 고객이 언제든지 주문을 신뢰할 수 있게 할 수 있고 항상 주문에 대한 사용 가능한 상태를 유지할 수 있습니다.

<div class="content-ad"></div>

DynamoDB보다 다른 NoSQL 데이터베이스를 선택한 결정은 고객에게 더 신뢰할 수 있는 경험을 제공하기 위해 높은 가용성을 갖는 데이터베이스 서비스를 갖기 위해서입니다.

더 효율적이고 비용 효율적인 방법으로, 저는 데이터베이스를 한 개의 테이블만 사용하여 모든 엔티티를 그 테이블 안에 저장하도록 설계했습니다.

다음과 같이 디자인했습니다: 

[이미지](/assets/img/2024-08-17-HowIBuiltAHigh-PerformingOrderDeliveryMicroserviceWithAWS_1.png)

<div class="content-ad"></div>

만약 이것이 낯설게 느껴진다면, 이 기사를 읽어보세요.

저는 이 표에 사용자, 주문, 거래 등을 저장하고 있어요.

이것은 낮은 지연 시간을 가능하게 하고 여러 표를 프로비저닝하는 비용을 줄입니다.

이 데이터베이스 디자인은 사용자들에 대한 쿼리, 그들이 한 주문, 그리고 해당 거래에 대한 결제 정보, 날짜 및 더 많은 정보를 가능하게 해줘요.

<div class="content-ad"></div>

이 데이터베이스를 프로비저닝하기 위해 다음 CDK 코드를 사용했습니다:

```js
const table = new dynamodb.Table(this, 'orders', {
  partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
  sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
});
```

이 코드는 테이블의 모든 항목을 식별할 파티션 키 (pk)와 정렬 키 (sk)를 정의합니다.

나중에 더 많은 데이터 액세스 패턴을 충족하기 위해 몇 가지 인덱스도 생성했습니다.

<div class="content-ad"></div>

# SQS

이 시스템을 확장하고 더 견고하게 만들기 위해 Amazon SQS를 사용하여 몇 가지 메시지 대기열을 만들었습니다.

메시지 대기열은 시스템에 두 가지 이점을 제공했습니다.

먼저, 모든 서비스가 메시지를 통해 분리되어 상호 통신했습니다.

<div class="content-ad"></div>

두 번째로, 주문 처리가 메시지 대기열로 확장되었습니다.

따라서 Lambda 함수로 직접 전송되어 DynamoDB에 기록되는 대신, 먼저 메시지 대기열로 전송되고 비동기적으로 처리되어 DynamoDB에 기록되었습니다.

다음과 같이 SQS 메시지 대기열을 생성할 수 있습니다:

```js
// 주문을 SQS로 전송
await sqs.sendMessage({
  QueueUrl: process.env.QUEUE_URL,
  MessageBody: JSON.stringify({ pk, sk, orderID, orderDetails, customer }),
}).promise();
```

<div class="content-ad"></div>

다른 람다 함수가 이러한 메시지를 기다리고 있어요. 이 함수는 고객 주문을 DynamoDB에 작성할 거에요. 더 작은 애플리케이션에는 과도한 기능일 수 있지만, 앱이 내일 확장되어야 한다면, 지금의 대비를 할 준비가 되어 있어요.

# S3 & CloudFront

저는 정적 파일을 S3 버킷에 저장하는 데 사용했어요. 영수증, 사용자 이미지, 회사 미디어(로고 및 문서)와 같은 파일들을 저장하고 있답니다.

Lambda 함수는 영수증 읽기 요청이 발생할 때마다, 관련된 영수증 파일을 S3에서 검색하도록 구성되어 있어요.

<div class="content-ad"></div>

S3에서 정적 에셋을 제공하는 대신, 대부분의 에셋은 CloudFront를 사용하여 CDN을 통해 제공되었습니다.

S3 Bucket의 생성:

```js
const bucket = new s3.Bucket(this, ORDERS_RECEIPTS_BUCKET, {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});
// 액세스 권한에 대한 추가 구성…
```

그리고 정적 파일을 캐시하기 위한 CloudFront CDN:

<div class="content-ad"></div>

```js
const distribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
  originConfigs: [
    {
      s3OriginSource: {
        s3BucketSource: bucket,
      },
      behaviors: [{ isDefaultBehavior: true }],
    },
  ],
});
```

프론트 엔드에서 파일을 요청하면 파일은 먼저 CDN 도메인 이름을 사용합니다. 이렇게 하면 원본 S3 버킷 서버에서 더 멀리 떨어진 사용자도 CDN 덕분에 파일을 더 빨리 검색할 수 있습니다.

# SES

마지막으로, 클라이언트를 위해 대량 및 예약 이메일을 보낼 수 있도록 Amazon Simple Email Service를 구성했습니다.

<div class="content-ad"></div>

저는 이렇게 SES에서 이메일 식별 정보를 만들었습니다:

```js
const CLIENT_EMAIL = "<client-email>"
const emailIdentity = new ses.EmailIdentity(this, 'EmailIdentity', {
  identity: CLIENT_EMAIL, 
});
```

이 작업을 마치고 나면, 람다를 사용하여 이메일을 손쉽게 보낼 수 있었습니다:

```js
await ses.sendEmail({
  Source: CLIENT_EMAIL, 
  Destination: { ToAddresses: [customerEmail]}, 
  Message: {
    Subject: { Data: '오늘 주문 영수증' },
    Body: {
      Text: { Data: '주문해 주셔서 감사합니다. 등...' },
    },
  },
}).promise();
```

<div class="content-ad"></div>

모든 주문 생성 시에 두 개의 이메일이 발송되었습니다:

- 최근 주문 내역을 안내하는 고객 이메일
- 웹사이트에 주문이 접수된 것을 공지하는 클라이언트 이메일

# 결론

저희가 고객을 위해 구축한 주문 배송 시스템은 API Gateway, Lambda, DynamoDB, SQS, S3, CloudFront 및 SES와 같은 다양한 AWS 서비스를 활용하여 효율적이고 확장 가능한 솔루션입니다.

<div class="content-ad"></div>

각 서비스는 신뢰성, 효율성 및 미래 확장 가능성을 보장하기 위해 선정되었습니다. 현재 트래픽은 낮지만 미래 성장에 대비할 수 있는 시스템이 준비되어 있습니다.

시스템은 미래 성장을 처리할 수 있도록 준비되어 있으며 사용자들에게 뛰어난 경험을 제공하고 있어 신뢰성이 높습니다.

이 블로그 글을 즐기셨다면, 제 글 작성을 지원하기 위해 커피도 사 주실 수 있어요: https://buymeacoffee.com/urielbitton

👋 제 이름은 Uriel Bitton이고 Serverless, 클라우드 컴퓨팅 및 AWS를 마스터하는 데 도움을 드리기 위해 헌신하고 있습니다.

<div class="content-ad"></div>

🚀 서버리스, 확장 가능하며 강인한 애플리케이션을 구축하는 방법을 배우고 싶다면, 제 뉴스레터를 구독해보세요:

[https://medium.com/@atomicsdigital/subscribe](https://medium.com/@atomicsdigital/subscribe)

읽어 주셔서 감사합니다. 다음에 또 만나요!

# 쉽게 알려드립니다 🚀

<div class="content-ad"></div>

인 플레인 영어 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클라프하고 팔로우해주세요️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: CoFeed | Differ
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기