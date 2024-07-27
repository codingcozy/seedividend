---
title: "서버리스 인증 자가 서비스 플랫폼 구축 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_0.png"
date: 2024-07-07 21:49
ogImage:
  url: /assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_0.png
tag: Tech
originalTitle: "Serverless Auth Self-Serve Platform"
link: "https://medium.com/@leejamesgilmore/serverless-auth-self-serve-platform-0caa2ca61892"
---

<img src="/TIL/assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_0.png" />

## 서문

🌟 Amazon Cognito 머신 간 인증 흐름이 무엇인지 다루고 있습니다.
🌟 중앙 집중식 인증 플랫폼의 필요성을 살펴봅니다.
🌟 기본 예제 프론트엔드 UI를 통해 진행합니다.
🌟 전체적인 AWS 아키텍처에 대해 이야기합니다.
🌟 TypeScript와 AWS CDK 코드를 통해 진행 과정을 설명합니다.

# 소개 👋🏽

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

조직 내에서는 많은 다른 팀이 보안적으로 외부 시스템 및 제3자 API에 로드되어야 하는 경우가 거의 항상 발생합니다. 일반적으로 각 팀이 자체 인증 서버를 생성해야 하고 OAuth 2.0 클라이언트 자격 증명 흐름이 어떻게 작동하는지 파악해야 하는 작업이 진행됩니다.

본 문서에서는 우리가 어떻게 중앙 회사 인증 서비스를 생성할 수 있는지에 대해 다룰 것입니다. Amazon Cognito를 기반으로 개발자가 스스로 서비스를 이용할 수 있는 포털을 가지고 있는 이 서비스를 통해 회사 내의 모든 팀이 자신들의 서드파티 소비자를 위한 액세스 토큰 구성을 빠르게 만들 수 있습니다.

컨텐츠를 이해하기 쉽게 하기 위해, TypeScript 및 AWS CDK를 사용하여 가상의 'LJ Health Food' 회사의 완벽한 솔루션 코드 예제를 생성할 것입니다. 이 회사는 건강식품 배달 회사이지만 Uber Eats나 Just Eat과 같은 서드파티 통합을 통해 주문을 받을 수도 있습니다.

![이미지](/TIL/assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_1.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

여기에서 완전한 솔루션 코드 예제를 찾을 수 있습니다:

이 예제에서는 3rd party 서비스가 자사의 앱을 통해 주문을 배치하는 내용에 대해 리더십팀과 회의를 가졌습니다. 그들은 동의하고, 엔지니어링 팀은 통합 과정을 시작합니다.

![image](/TIL/assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_2.png)

이를 위해 우리는 그들을 신뢰할 수 있는 클라이언트로 설정하고, 다른 서비스가 주문을 배치할 수 있는 부분에만 액세스할 수 있도록 권한을 부여해야 합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image](/TIL/assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_3.png)

이 특정 인가 플로우를 통해 이 신뢰가 어떤 모습인지 살펴보겠습니다.

👇 더 나아가기 전에 — 향후 블로그 포스트와 서버리스 뉴스에 대해 연결하려면 LinkedIn에서 저와 연락해주세요. https://www.linkedin.com/in/lee-james-gilmore/

![Image](/TIL/assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_4.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 중앙 집중식 인증이 필요한 이유 🛡️

더 진행하기 전에, 회사 내에서 자체 서비스 스타일 포털을 통해 인증을 중앙 집중화해야 하는 이유는 무엇일까요? 그렇지 않으면 일반적으로 다음과 같은 문제가 발생합니다:

- 각 프로젝트/서비스에 대한 액세스 토큰을 위한 인증 서버를 설정해야 하는 팀들에게 높은 인지 부하가 발생합니다.
- OAuth 2.0 클라이언트 인증 흐름이 어떻게 작동하는지 이해해야 하는 데 높은 인지 부하가 발생합니다 (이에 대해 나중에 더 다룰 것입니다).
- Amazon Cognito의 UI는 매우 복잡하며 필요하지 않은 많은 기능이 포함되어 있습니다. 우리는 자체 UI에서 이것을 제거함으로써 이런 소음을 최소화할 수 있습니다 (필요한 기능만 표시).
- 보안 팀이 처리해야 하는 포인트가 더 많아집니다.

<img src="/TIL/assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_5.png" />

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

"중앙 집중형 권한 부여가 우리에게 어떤 이점을 제공할까요?

✔️ 셀프 서비스 포털에서 새로운 3rd 파티 클라이언트 및 서비스를 신속하게 추가할 수 있어요.

✔️ 모든 클라이언트 및 토큰을 관리하는 팀이 한 팀에만 의지하지 않아도 되어 조직 내 병목 현상을 피할 수 있어요 (Team Topologies를 생각해보세요) - 이렇게 하면 팀원들이 AD를 통해 로그인하고 자체 구성을 관리할 수 있어요.

✔️ 보안 팀은 한 솔루션의 디자인을 확인하고 팀과 함께 쉽게 모니터링할 수 있어요."

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

✔️ Auth0, Tyk 등의 서비스를 사용할 수도 있겠지만, Amazon Cognito보다 훨씬 비싸기 때문에 typ씨피 방법을 사용할 수 없습니다. 또한 일반적으로 제공하는 모든 기능이 필요하지 않을 수 있습니다. Amazon Cognito를 프록시하면 UI를 우리의 요구에 맞게 조정할 수 있기 때문에 구현을 자체적으로 사용 사례에 맞게 할 수도 있습니다.

## 클라이언트 자격 증명 흐름이란? 🔐

이제 중앙 인증 플랫폼의 필요성에 대해 논의했으니, 여태까지 여러 번 언급한 OAuth 2.0 클라이언트 자격 증명 흐름이 무엇인지 알아보겠습니다.

간단한 용어 해설을 통해 이야기를 나눠보죠:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 클라이언트 — 클라이언트(클라이언트 웹 애플리케이션과 혼동되지 않도록 주의)는 API(리소스 서버)에서 리소스에 액세스하려는 백엔드 서비스, 데몬 또는 기기입니다.
- 리소스 서버 — 리소스 서버는 하나 이상의 클라이언트가 인증된 요청을 보내려고 하는 API입니다. 리소스 서버는 클라이언트로부터 받은 엑세스 토큰을 발급한 클라이언트에게 토큰을 부여한 인가 서비스와 대조합니다.
- 인가 서비스 — 인가 서비스는 클라이언트가 특정 리소스 서버를 위해 엑세스 토큰을 생성하는 방법으로, 토큰에는 범위가 포함될 수 있습니다.
- 범위 — 범위는 클라이언트가 인가 서비스로부터 받은 엑세스 토큰에 청구하는 것으로, 리소스 서버에서 클라이언트에 노출되는 기능을 상세히 기술합니다.

거의 모든 경우에 우리는 REST API를 사용하여 서로 동기적으로 통신하는 하나 이상의 서비스가 필요하며, 이러한 서비스들은 일반적으로 백엔드 서비스이므로 '사용자'가 아닌 '기기'로 인증해야 합니다.

이 요구 사항이 있을 때, 우리는 "m2m" 플로우를 실행하여 산업 표준 OAuth 2.0 인증 플로우인 "클라이언트 자격 증명 플로우"를 수행합니다. 아래에 표시된 것과 같습니다:

위 다이어그램에서 보듯이:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 3rd party 서비스는 주문을 배치하기 위해 저희의 리소스 서버(API)를 호출하기 위해 특히 인증 서버에서 액세스 토큰을 요청합니다.
- 클라이언트 자격 증명(즉, 클라이언트 ID 및 클라이언트 비밀번호)가 올바른 경우, 인증 서버는 새로운 유효한 액세스 토큰을 반환합니다.
- 3rd Party 서비스는 이제 요청 헤더의 'Authorization'에 액세스 토큰을 사용하여 리소스 서버 API를 호출합니다.
- 리소스 서버는 이제 액세스 토큰을 인증 서버에 대조하여 a.) 유효한 토큰이고 b.) 호출 중인 API의 엔드포인트에 대한 올바른 스코프를 갖고 있는지 확인합니다.
- 리소스 서버 API의 응답은 클라이언트에게 다시 전송됩니다.

지금 우리가 높은 수준에서 이에 대해 이야기했으니, 우리의 자체 서비스 포털이 어떻게 생겼는지 살펴봅시다. 이를 통해 3rd Party 모바일 앱이 우리 주문 서비스를 이용하여 주문을 배치할 수 있도록 관리 세부 정보를 관리할 수 있는 것입니다.

![이미지](/TIL/assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_6.png)

# 저희 클라이언트 앱은 어떻게 생겼나요? 🎨

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 이 기사의 POC 스타일 구현에서 중앙 인증 플랫폼 응용 프로그램의 모습을 살펴봅시다.

다만, 이것이 POC로서 제작 준비가 된 것이 아니라는 것을 명심해주세요!

우리는 기존의 리소스 서버 및 클라이언트를 나열하는 메인 페이지에서 시작합니다.

'새 리소스 서버 만들기' 버튼을 클릭하여 새 리소스 서버를 추가할 필요한 세부 정보를 추가하는 모달이 표시됩니다. 예를 들어, 우리의 리소스 서버에는 '주문하기' 및 '주문 목록'이라는 두 가지 스코프가 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

자원 서버를 설정했으니 이제 '새 클라이언트 생성' 버튼을 클릭할 수 있어요. 이 버튼을 클릭하면 아래에 표시된 것처럼 관련 클라이언트 세부 정보를 추가할 수 있는 모달이 나타나요. 이 예제에서는 클라이언트 이름과 스코프를 설정하고, 리소스 서버에서 새로운 주문을 할 수 있는 'lj-health-food/place-order'로 지정했어요. 이 예제에서 주문 목록을 나열할 수는 없도록 했어요.

새 클라이언트를 만든 후 관련 세부 정보를 보여주려면 목록에서 새로 만든 클라이언트의 '보기' 버튼을 클릭하세요.

자체 서비스 사용 인증 서비스가 필요한 이유, 클라이언트 자격 증명 흐름이 무엇인지, 그리고 자체 서비스 사용 플랫폼 프론트엔드가 어떻게 생겼는지에 대해 설명했으니 이제 전체 아키텍처에 대해 이야기해보겠어요.

# 무엇을 만들고 있나요? 🛠️

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

위에서 다룬 내용을 고려하면, 우리는 내부 플랫폼의 얇은 슬라이스를 구축할 것입니다. 이 플랫폼은 우리의 제3자 서비스를 인증하면서 팀이 쉽고 빠르게 새 고객(클라이언트)을 온보딩하고 사용 가능한 스코프를 설정하고 새로운 리소스 서버를 설정할 수 있게 합니다. 본질적으로, 세 가지 마이크로서비스가 있습니다.

위 다이어그램에서 볼 수 있는 것은 다음과 같습니다:

- 내부 팀은 Entra ID(Active Directory)를 통해 UI에 로그인하여 AD 그룹을 통해 포털에 액세스할 수 있는 특정 직원만 접근할 수 있습니다.
- 내부 UI는 API 게이트웨이를 BFF(Backend-for-Frontend)로 호출하며, 이는 다양한 람다 함수를 사용하여 Amazon Cognito와 상호 작용하여 클라이언트, 리소스 서버 및 스코프를 설정합니다.
- 모든 BFF 구성은 Amazon DynamoDB에 저장됩니다. 다만 이것은 매우 간단한 예제에서는 설정하지 않습니다.
- Cognito 사용자 풀에 설정된 제3자 서비스는 머신 투 머신 토큰(client-credentials flow)을 생성하여 리소스 서버를 위해 생성된 액세스 토큰을 'Authorization' 헤더에 넣어 API 게이트웨이를 호출합니다.
- 리소스 서버는 API 게이트웨이에 연결된 람다 인증기(라우터)를 사용하여 Cognito 사용자 풀에서 토큰을 유효성 검사하고 요청을 처리합니다.

이제 주요 코드에 대해 이야기해 보겠습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 주요 코드로 이야기 나누기 👨‍💻

저희의 GitHub 프로젝트는 세 가지 주요 솔루션으로 나누어져 있습니다:

- 'shared-central-auth' 폴더에 중앙 Auth 서비스 및 UI가 있습니다.
- 'resource-server-service' 폴더에는 리소스 서버가 있습니다.
- 'client-service' 폴더에는 클라이언트 (3rd Party 서비스)가 있습니다.

자, 각각의 중요 코드를 살펴보겠습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## ✔️ 공유된 중앙 인증

먼저 CDK 앱에서 '무상태(Stateless)' 스택을 만들어서 Amazon Cognito 사용자 풀을 생성합니다:

```js
import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';

import { Construct } from 'constructs';

export class SharedCentralAuthStatefulStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 클라이언트 자격 증명 플로우(m2m auth)를 위해 공유 Cognito 사용자 풀 생성
    const authUserPool: cognito.UserPool = new cognito.UserPool(
      this,
      'SharedAuthUserPool',
      {
        userPoolName: 'SharedAuthUserPool',
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    // Cognito에서 사용자 풀 도메인 생성
    // (외부 서비스가 토큰을 요청할 수 있게 해줍니다)
    const authUserPoolDomain: cognito.UserPoolDomain =
      new cognito.UserPoolDomain(this, 'SharedAuthUserPoolDomain', {
        userPool: authUserPool,
        cognitoDomain: {
          domainPrefix: 'lj-health-food-auth',
        },
      });

    ...
  }
}
```

다음으로 사용자 풀과 상호 작용할 UI에 사용될 Amazon API Gateway를 생성합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```typescript
// 우리의 경험 레이어 API를 생성합니다.
const api: apigw.RestApi = new apigw.RestApi(this, "CentralAuthApi", {
  description: "LJ Food Delivery - Central Auth Service",
  deploy: true,
  defaultCorsPreflightOptions: {
    allowOrigins: apigw.Cors.ALL_ORIGINS,
  },
  deployOptions: {
    stageName: "prod",
    loggingLevel: apigw.MethodLoggingLevel.INFO,
  },
});
```

이어서 ‘clients’와 ‘resource-servers’에 대한 리소스를 추가합니다.

```typescript
// API에서 리소스를 만듭니다.
const resourceServers: apigw.Resource = api.root.addResource("resource-servers");
const clients: apigw.Resource = api.root.addResource("clients");
const client: apigw.Resource = clients.addResource("{id}");
const resourceServer: apigw.Resource = resourceServers.addResource("{id}");
```

여러 Lambda 함수가 있으며 이 함수들은 클라이언트 목록 표시, 리소스 서버 생성, 클라이언트 삭제 등과 같은 기능을 위해 API Gateway 엔드포인트와 통합됩니다. 한 예시 함수를 살펴보겠습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// 새로운 리소스 서버를 추가하는 람다 함수를 생성합니다
const createResourceServer: nodeLambda.NodejsFunction = new nodeLambda.NodejsFunction(this, "CreateResourceServer", {
  functionName: "create-resource-server",
  runtime: lambda.Runtime.NODEJS_20_X,
  entry: path.join(__dirname, "src/adapters/primary/create-resource-server/create-resource-server.adapter.ts"),
  memorySize: 1024,
  handler: "handler",
  tracing: Tracing.ACTIVE,
  bundling: {
    minify: true,
  },
  environment: {
    ...lambdaPowerToolsConfig,
    USER_POOL_ID: userPoolId,
  },
});
```

Lambda 함수들은 우리의 Cognito 사용자 풀을 관리하기 위해 AWS SDK v3를 활용하므로, 각각에 필요한 관련 권한을 부여해야 합니다. 위의 'CreateResourceServer' 람다 함수의 경우, 아래와 같이 할 수 있습니다:

```js
// 람다 함수에 사용자 풀 액세스 권한 부여
createResourceServer.addToRolePolicy(
  new iam.PolicyStatement({
    actions: ["cognito-idp:CreateResourceServer"],
    resources: [userPool.userPoolArn],
  })
);
```

그런 다음 Lambda 함수 핸들러 유즈케이스(비즈니스 로직)는 Amazon Cognito와 통신하기 위해 보조 어댑터를 활용하며, 아래는 AWS SDK를 사용하여 리소스 서버를 생성하는 예시입니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
export async function createCognitoResourceServer(
  resourceServerName: string,
  identifier: string,
  scopes: ResourceServerScopeType[]
): Promise<ResourceServerType> {
  const params: CreateResourceServerCommandInput = {
    UserPoolId: userPoolId,
    Identifier: identifier,
    Name: resourceServerName,
    Scopes: scopes,
  };

  try {
    const command = new CreateResourceServerCommand(params);
    const response: CreateResourceServerCommandOutput = await client.send(command);

    logger.info("resource server created: ", JSON.stringify(response.ResourceServer));
    const resourceServer = response.ResourceServer;

    if (!resourceServer) {
      throw new Error("resource server could not be created");
    }

    logger.info("resource server details: ", JSON.stringify(resourceServer));
    return resourceServer;
  } catch (error) {
    logger.error("error creating resource server: ", JSON.stringify(error));
    throw error;
  }
}
```

이 시점에서 Amazon API Gateway가 여러 람다 함수를 대리하며 AWS SDK v3를 사용하여 사용자 풀에서 클라이언트 및 리소스 서버를 관리하는 기능을 제공합니다. 이 기능을 UI를 통해 사용할 수 있습니다!

## ✔️ 리소스 서버

이 시점에서 UI로 이동하여 클라이언트가 사용할 주문 API를 위한 리소스 서버를 생성할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

마이크로서비스의 실제 Amazon API Gateway, Lambda 함수 및 DynamoDB 테이블에 대해서는 여기서 다루지 않겠습니다. 이 내용은 매우 기본적이며, 위의 대부분의 코드 예제를 다루었습니다. 그러나 우리가 여기서 다룰 것은 API Gateway에서의 Lambda Authorizer와 Lambda 핸들러의 내용입니다.

위의 코드를 보면, 우리는 액세스 토큰을 확인하는 데 사용될 RequestAuthorizer를 만드는 것을 볼 수 있습니다. 이 토큰은 모든 클라이언트의 Authorization 헤더에 포함되어 있습니다. 그 다음, 아래에 표시된대로 이를 API Gateway에 추가합니다:

```js
// ensure that our lambda function is invoked through the api
// and we have a request based lambda authorizer to validate the token
orders.addMethod(
  "POST",
  new apigw.LambdaIntegration(createOrder, {
    proxy: true,
  }),
  {
    authorizer: authoriser, // add our lambda authoriser
    authorizationType: apigw.AuthorizationType.CUSTOM,
  }
);
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

API 엔드포인트가 호출될 때마다 먼저 Lambda Authorizer를 호출하여 액세스 토큰을 유효성 검사합니다.

그런 다음 아래의 Lambda 핸들러 내용을 확인할 수 있습니다. 여기에서는 Authorization 헤더의 액세스 토큰을 유효성 검사합니다:

```js
import { APIGatewayAuthorizerResult } from "aws-lambda/trigger/api-gateway-authorizer";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { PolicyDocument } from "aws-lambda";
import { config } from "@config";
import { logger } from "@shared";

const cognitoJwtVerifier = CognitoJwtVerifier.create({
  userPoolId: config.get("userPoolId"),
  clientId: [config.get("clientId")], // 유효한 클라이언트 ID 배열
  scope: [config.get("scopes")], // 허용된 스코프
  tokenUse: "access",
});

export const handler = async function (event: any): Promise<APIGatewayAuthorizerResult> {
  try {
    // 클라이언트가 클라이언트 ID와 클라이언트 시크릿(스코프로)를 사용하여 받은
    // 인증 토큰을 요청에서 가져옵니다. 이를 로그에만 표시합니다.
    const authToken = event.headers["Authorization"] || "";

    logger.info(`Auth token: ${authToken}`);

    // 토큰 검증
    const decodedJWT = await cognitoJwtVerifier.verify(authToken);

    // methodArn에 대한 허용 정책 생성
    const policyDocument: PolicyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: event["methodArn"],
        },
      ],
    };

    // 컨텍스트에 클라이언트 ID를 전달합니다
    const context = {
      clientId: decodedJWT.sub,
    };

    const response: APIGatewayAuthorizerResult = {
      principalId: decodedJWT.sub,
      policyDocument,
      context,
    };

    return response;
  } catch (err) {
    console.error("invalid auth token: ", err);
    throw new Error("unauthorized");
  }
};
```

위 코드에서 유효성 확인이 이루어지는 것을 확인할 수 있습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 액세스 토큰의 만료 기간이 지나지 않았습니다.
- 알려진 클라이언트 중 하나를 위해 생성되었습니다.
- 예상대로 올바른 범위를 포함하고 있습니다.
- 액세스 토큰은 우리의 Cognito UserPool에서 서명되었습니다.

모든 작업은 `aws-jwt-verify` 패키지를 사용하여 수행되었습니다.

## ✔️ 클라이언트 서비스

그래서 이제 우리에게는 새로운 주문을 생성하는 리소스 서버 서비스가 있고, 중앙 인증 플랫폼에서 이를 위한 모든 구성 설정이 완료되었습니다. 이제 리소스 서버 API를 사용할 3rd party 서비스인 클라이언트를 생성해야 합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

새 주문을 만드는 비즈니스 로직인 사용 사례를 살펴보겠습니다. 아래에 표시된 대로, 우리의 서드파티 서비스에서 새 주문을 만드는 방법을 살펴보겠습니다.

```js
import { CreateOrder, Order } from "@dto/order";
import { logger, schemaValidator } from "@shared";

import { createOrder } from "@adapters/secondary/https-adapter";
import { saveOrder } from "@adapters/secondary/database-adapter";
import { schema } from "@schemas/order";

export async function createOrderUseCase(order: CreateOrder): Promise<Order> {
  logger.info(`주문이 접수되었습니다: ${JSON.stringify(order)}`);

  // 인증 토큰과 함께 다른 서비스를 호출하여 주문을 생성합니다.
  const createdOrder = await createOrder(order);

  // 생성된 주문의 응답이 올바른 형태인지 확인합니다.
  schemaValidator(schema, createdOrder);

  // 주문 서비스로부터 반환된 주문을 DynamoDB에 저장합니다.
  await saveOrder(createdOrder);

  logger.info(`주문이 id와 함께 완료되었습니다: ${JSON.stringify(createdOrder.id)}`);

  return createdOrder;
}
```

우리는 보조 어댑터를 통해 주문을 생성하고, 이를 페이로드와 유효한 액세스 토큰을 사용해 리소스 서버 API를 호출합니다. 그리고 리턴된 주문 세부 정보를 우리 자체 DynamoDB 테이블에 저장합니다.

HTTP 핸들러는 액세스 토큰을 생성하고 주문 요청을 리소스 서버 API로 보내는 데 관여합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { CreateOrder, Order } from "@dto/order";
import { generateAccessToken, logger } from "@shared";

import axios from "axios";
import { config } from "@config";
import { decode } from "jsonwebtoken";

export async function createOrder(order: CreateOrder): Promise<Order> {
  // 설정 가능한 세부 정보를 구성에서 가져옵니다
  const clientId = config.get("clientId");
  const clientSecret = config.get("clientSecret");
  const url = config.get("authUrl");
  const resourceServerUrl = config.get("resourceServerUrl");

  // 주문 서비스를 이용하여 주문을 작성하기 위한 스코프
  const scopes: string[] = ["lj-health-food/place-order"];

  // 주문 서비스를 위한 액세스 토큰 생성
  // 클라이언트 자격 증명으로 중앙 인증 서비스를 호출하여
  const accessToken = await generateAccessToken(clientId, clientSecret, url, scopes);

  // 참고: 접근 토큰은 절대로 로깅해서는 안 됩니다
  // 그러나 이 예제에서는 디코딩된 내용을 살펴보겠습니다
  const decoded = decode(accessToken, { complete: true });
  logger.info(`디코딩된 토큰 : ${JSON.stringify(decoded)}`);

  // 주문을 생성하기 위해 주문 API(리소스 서버)에 요청 보냄
  // 헤더에 액세스 토큰을 전달합니다
  const { data }: { data: Order } = await axios.request({
    url: "orders",
    method: "post",
    baseURL: resourceServerUrl,
    headers: {
      Authorization: accessToken,
    },
    data: order,
  });

  return data;
}
```

마지막으로, 실제로 generateAccessToken 함수를 사용하여 액세스 토큰을 생성하는 코드를 살펴봅시다:

```js
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { logger } from '@shared';
import { stringify } from 'querystring';

export async function generateAccessToken(
  clientId: string,
  clientSecret: string,
  url: string,
  scopes: string[] = []
): Promise<string> {
  try {
    const payload = {
      grant_type: 'client_credentials',
      scope: scopes.length ? scopes.join(' ') : undefined,
    };

    const options: AxiosRequestConfig = {
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      auth: {
        username: clientId,
        password: clientSecret,
      },
      data: stringify(payload),
      url: '/oauth2/token',
      baseURL: url,
    };

    const { data }: AxiosResponse<any> = await axios.request(options);

    logger.info(`액세스 토큰 응답: ${data}`);

    return data?.access_token as string;
  } catch (error) {
    throw error;
  }
}
```

위의 코드에서 알 수 있듯이, 이 코드는 클라이언트 ID, 시크릿 및 스코프를 사용하여 중앙 인증 서비스(Cognito 사용자 풀)의 토큰 엔드포인트에 POST 요청을 수행하여 유효하면 액세스 토큰을 반환합니다. 액세스 토큰은 이와 유사합니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
{
  "sub": "<your-client_id>",
  "token_use": "access",
  "scope": "lj-health-food/place-order",
  "auth_time": 1709980199,
  "iss": "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_tyReqcsgR",
  "exp": 1709983799,
  "iat": 1709980199,
  "version": 2,
  "jti": "x9d6ggd3-8752-4b4f-1423-12x01bsd5b89",
  "client_id": "<your-client_id>"
}
```

The token의 주요 속성들은 다음과 같습니다:

- sub: 이것은 토큰의 주체를 나타내며 일반적으로 클라이언트 ID를 가리킵니다.
- token_use: 토큰의 목적을 나타냅니다. 이 경우 "access" 토큰으로, 특정 리소스나 서비스에 액세스를 부여하는 의미입니다.
- scope: 토큰으로 부여된 특정 권한을 설명합니다. 이 예제에서 토큰은 "lj-health-food/place-order" 스코프에 액세스를 부여하므로, "lj-health-food" 서비스 내에서 주문을 할 수 있는 능력을 나타냅니다.
- auth_time: 인증이 발생한 시간을 나타내며 유닉스 에포크를 기준으로 한 초 단위로 측정됩니다 (1970년 1월 1일 00:00:00 UTC부터의 초).
- iss: "발급자"를 나타내며 토큰의 발급자를 지정합니다. 토큰을 발급한 ID 공급자의 URL입니다. 여기서는 Amazon Cognito ID 공급자입니다.
- exp: 토큰의 만료 시간을 나타내며, 그 이후에는 유효하지 않다고 간주되어야 합니다. auth_time과 마찬가지로 유닉스 에포크를 기준으로 합니다.
- jti: "JWT ID"를 의미하며 토큰의 고유 식별자입니다. 토큰 재생 공격을 방지하는 데 도움이 됩니다.
- client_id: 토큰을 요청한 클라이언트 응용 프로그램의 ID를 나타냅니다.

이제 코드를 확인하고 배포하고 UI를 탐험하여 여러분의 요구에 맞게 조정하세요!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 마무리

여기까지 읽어주셔서 감사합니다! 요약하면 다음과 같은 내용을 다루었습니다:

✔️ Amazon Cognito 기계 대 기계 흐름이란 무엇인가.
✔️ 중앙 집중식 인증 플랫폼이 필요한 이유를 살펴보았습니다.
✔️ 기본 예제 프론트엔드 UI를 살펴보았습니다.
✔️ 전체적인 AWS 아키텍처를 설명했습니다.
✔️ TypeScript 및 AWS CDK 코드를 살펴보았습니다.

# 마무리 인사 👋🏽

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 기사를 즐겨 보셨다면 공유하고 피드백 주시면 감사하겠습니다!

유사한 콘텐츠를 원하신다면 제 유튜브 채널을 구독해주세요!

![이미지](/TIL/assets/img/2024-07-07-ServerlessAuthSelf-ServePlatform_7.png)

아래의 채널을 통해 저와 연결하고 싶습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

https://www.linkedin.com/in/lee-james-gilmore/
https://twitter.com/LeeJamesGilmore

만약 게시물을 즐겼다면 추가로 게시물/시리즈를 보기 위해 제 프로필 Lee James Gilmore를 팔로우해주세요. 그리고 꼭 연결하고 안부를 물어보세요 👋

그리고 게시물 하단에 있는 '박수' 기능도 사용해주세요. (한 번 이상 박수를 칠 수 있어요!!)

# 나에 대해

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

"안녕하세요, 저는 영국에 거주하는 AWS 커뮤니티 빌더, 블로거, AWS 인증 클라우드 아키텍트이자 Global Head of Technology & Architecture인 Lee입니다. 현재 City Electrical Factors (UK) & City Electric Supply (US)에서 근무하고 있으며, 지난 6년 동안 AWS에서 전문적으로 풀 스택 JavaScript를 주로 다루고 있습니다.

저는 서버리스를 지지하는 입장에서 모든 것에 대한 사랑, 혁신, 소프트웨어 아키텍처, 기술에 대한 관심을 가지고 있습니다."

**_ 제공된 정보는 제 개인적인 견해이며 정보 사용에 대한 책임을 지지 않습니다. _**

아래 내용도 참고하실 수 있습니다:
