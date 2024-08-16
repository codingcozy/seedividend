---
title: "Spring Cloud Function으로 서버리스 구현하기 AWS Lambda Java 17 지원 및 SnapStart와의 통합 방법"
description: ""
coverImage: "/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_0.png"
date: 2024-07-12 21:21
ogImage: 
  url: /assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_0.png
tag: Tech
originalTitle: "Going Serverless With Spring Cloud Function, AWS Lambda Java 17 Support, and SnapStart"
link: "https://medium.com/better-programming/going-serverless-with-spring-cloud-function-aws-lambda-java-17-support-and-snapstart-d3d8ffd44bbd"
isUpdated: true
---





![이미지](/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_0.png)

AWS Lambda는 2023년 4월 27일에 Java 17 지원을 추가했어요. 많은 기대를 받고 기다려졌던 기능이죠! 이 새로운 기능으로 Spring Boot 3 개발자들은 네이티브 이미지 옵션과 Lambda 사용자 정의 런타임과 함께 자바 람다 함수를 배포할 수 있는 새로운 옵션이 생겼어요.

이 글에서는 Lambda Java 17 지원과 SnapStart를 활성화하여 Spring Cloud Function으로 개발 및 배포된 Java 람다 함수에 대해 자세히 살펴보겠어요. 이 함수는 HTTP API 게이트웨이로 앞단에 두게 될 거예요.

저희 Java 람다 함수에서는 이전에 썼던 글 'Integrating ChatGPT and Whisper APIs Into Spring Boot Microservice'를 확장해서, 채팅 기능이 있는 Lambda 함수로 만들 건데요. 이 함수는 OpenAI API의 /chat/completions 엔드포인트를 호출할 거예요.


<div class="content-ad"></div>


![image](/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_1.png)

# 스프링 클라우드 함수

스프링 클라우드 함수는 서버리스 제공업체 간에 통일된 프로그래밍 모델을 지원합니다. 이는 서버리스 제공업체에서 스프링 부트 기능(자동 구성, 의존성 주입, 메트릭)을 활성화합니다.

스프링 클라우드 함수는 모든 전송 세부 정보 및 인프라를 추상화하여 개발자가 익숙한 도구 및 프로세스를 유지하고 비즈니스 로직에 몰입할 수 있도록 합니다.


<div class="content-ad"></div>

우리의 OpenAI API 채팅 기능 구현 세부 내용을 살펴보겠습니다.

## pom.xml에 종속성 추가하기

먼저 pom.xml에 Spring Cloud Function 관련된 종속성을 추가해야 합니다. 그런데, 우리가 Lambda 함수를 배포할 곳은 AWS이므로 AWS 관련 종속성도 몇 가지 추가해보겠습니다.

```js
<dependency>
 <groupId>org.springframework.cloud</groupId>
 <artifactId>spring-cloud-function-adapter-aws</artifactId>
 <version>4.0.2</version>
</dependency>
<dependency>
 <groupId>org.springframework.cloud</groupId>
 <artifactId>spring-cloud-starter-openfeign</artifactId>
 <version>4.0.2</version>
</dependency>
<dependency>
 <groupId>com.amazonaws</groupId>
 <artifactId>aws-lambda-java-events</artifactId>
 <version>3.11.1</version>
 <scope>provided</scope>
</dependency>
<dependency>
 <groupId>com.amazonaws</groupId>
 <artifactId>aws-lambda-java-core</artifactId>
 <version>1.2.2</version>
</dependency>
```

<div class="content-ad"></div>

## 함수 클래스

Spring Cloud Function으로 구축된 앱에서 함수를 구현하는 주요 두 가지 방법이 있습니다:

- @Bean으로 주석이 달린 일반 메서드 사용
- 함수에 대한 전용 클래스 사용

저희는 첫 번째 방법을 사용하겠습니다. OpenAIClientFunctions 함수 클래스에서 함수 구현을 위해 @Bean으로 주석이 달린 일반 메서드를 사용할 것입니다.

<div class="content-ad"></div>

이 함수 클래스는 Spring Cloud OpenFeign을 호출하여 OpenAI의 API를 사용합니다. 샘플 빈 구성은 다음과 같습니다:

```java
@Configuration
@ConfigurationProperties
@Slf4j
@RequiredArgsConstructor
public class OpenAIClientFunctions {

    private final OpenAIClientService openAIClientService;

    @Bean
    public Function<ChatRequest, ChatGPTResponse> chat() {
        return (request) -> {
            return openAIClientService.chat(request);
        };
    }
}
```

OpenAIClientService가 Spring Cloud OpenFeign을 통해 OpenAI API를 호출하고 FeignClient가 OpenAIClientConfig를 사용하여 구성된 내용은 이전 글 "ChatGPT 및 Whisper API를 Spring Boot Microservice에 통합"에서 설명한 내용과 매우 유사합니다. 자세한 구현 내용을 여기서 다시 설명하지는 않겠습니다.

# Lambda Java 17 런타임

<div class="content-ad"></div>

AWS Lambda은 이제 Java 17을 관리 런타임 및 컨테이너 기본 이미지로 지원합니다. AWS Corretto OpenJDK 배포판을 기반으로 한 Java 17 런타임은 Java 17 기능을 갖추고 있을 뿐만 아니라 Lambda 함수를 Graviton 2 프로세서에서 실행할 때 최적화된 성능 향상을 제공하며, 빠른 콜드 스타트를 위한 SnapStart 지원, 그리고 최신 버전의 Spring Boot 3 프레임워크를 지원합니다.

# SnapStart

2022년 11월에 출시된 SnapStart은 Lambda 함수를 낮은 시작 지연 시간으로 빌드하는 새로운 가능성을 엽니다. Java 함수의 콜드 스타트 문제를 해결하는데 SnapStart는 혁신적인 역할을 합니다.

SnapStart은 게시된 함수 버전들과 함께 작동합니다. 내부적으로 함수의 수명주기에는 배포 및 호출 두 가지 주요 단계가 있습니다. 함수 버전이 게시되면 배포 단계가 트리거되고, 아래 다이어그램에 표시된 여러 단계를 거칩니다.

<div class="content-ad"></div>

함수 코드를 초기화하는 동안 Lambda 서비스는 초기화된 실행 환경의 암호화된 스냅샷을 촬영하고 이를 단계별 캐시에 유지하여 저지연 액세스를 제공합니다. 호출 단계에서 Lambda는 스냅샷에서 실행 환경을 재개하여 처음부터 초기화하는 대신 낮은 시작 지연시간으로 이어집니다.

![사진](/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_2.png)

SnapStart가 작동하는 방식에 대해 자세히 알아보려면 AWS의 시니어 서버리스 솔루션 아키텍트인 Mark Sailes의 이 기사를 확인해보세요.

# AWS Lambda Power Tuning

<div class="content-ad"></div>

Lambda 함수 개발은 Alex Casalboni가 개발한 AWS Lambda Power Tuning으로 조정하지 않으면 완료되지 않습니다. 최근에 작성한 "AWS Lambda Power Tuning을 활용한 성능 최적화 자동화"라는 제 블로그 글에서 새 Lambda 함수를 튜닝하는 방법을 자세히 설명했으니 확인해보세요.

상태 머신 실행을 성공적으로 완료한 후, 출력 URL에서 다음 다이어그램을 받았습니다:

![다이어그램](/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_3.png)

기본 512 MB 메모리가 가장 낮은 호출 시간과 합리적인 호출 비용을 제공하기 때문에, 이 기능에서는 이 기본 메모리를 유지할 것입니다.

<div class="content-ad"></div>

# HTTP API 게이트웨이

저희 람다 함수는 HTTP API 게이트웨이로 앞단을 겪게 될 거예요. 왜 HTTP API 게이트웨이를 선택하나요?

REST API 게이트웨이와 HTTP API 게이트웨이는 둘 다 RESTful API 제품입니다. 우리는 HTTP API 게이트웨이를 REST API 게이트웨이보다 주로 가격과 성능의 장점 때문에 선택하게 되었어요.

두 종류의 API 게이트웨이는 모두 AWS를 통한 요청 횟수와 데이터 전송 비용에 대한 요금만 부과받아요. 하지만, 가격 차이가 크게 나타나는데요. REST API는 백만 요청 당 3.50달러에 데이터 전송 요금을 부과해요. HTTP API는 첫 백만 요청에 대해 1.00달러를 부과하고, 그 이후에는 백만 요청 당 0.90달러를 부과해요. 이 주목할 만한 71%의 가격 차이가 있어요.

<div class="content-ad"></div>

HTTP API 게이트웨이는 요청 처리와 트래픽 처리면에서 더 효율적일 수 있어요. 이는 낮은 수준의 프로토콜과 메커니즘을 사용할 수 있기 때문인데, 이를 통해 지연 시간을 크게 감소시키고 성능을 향상시킬 수 있어요.

REST API 게이트웨이는 HTTP API 게이트웨이보다 더 많은 기능을 지원하지만, HTTP API 게이트웨이는 최소한의 기능으로 설계되어 낮은 가격에 제공될 수 있어요. API 키, 클라이언트별 쓰로틀링, 요청 유효성 검사, AWS WAF 통합 또는 사설 API 엔드포인트와 같은 기능이 필요하다면 REST API를 선택하세요. 그러한 기능이 필요하지 않다면 HTTP API 게이트웨이를 선택하세요. 저희 채팅 기능에는 HTTP API 게이트웨이를 사용할 거에요.

# Terraform과 GitHub Actions를 활용한 CI/CD 파이프라인

SAM과 CDK가 서버리스 앱을 위한 인프라스트럭처 코드 도구로 인기가 많지만, 저는 Terraform의 팬이에요. 새로운 람다 함수 및 이에 대한 HTTP API 게이트웨이를 프로비저닝하기 위해 Terraform을 사용할 거에요. DevOps 셀프 서비스 중심의 Terraform 프로젝트 구조를 따를 거에요.

<div class="content-ad"></div>

## 배포 고려 사항

알아야 할 몇 가지 배포 요구 사항:

- 우리의 Lambda 함수 런타임은 Java 17이어야 합니다.
- 이 함수에 SnapStart를 활성화하세요.
- 함수는 HTTP API 게이트웨이를 통해 전달될 것입니다.
- Spring Cloud Function을 사용하여 Lambda 런타임 핸들러를 org.springframework.cloud.function.adapter.aws.FunctionInvoker로 정의해야 합니다.
- Lambda 환경 변수를 추가하고 키를 SPRING_CLOUD_FUNCTION_DEFINITION으로 값으로 chat로 설정해야 합니다. 왜냐하면 이것이 우리의 Lambda 함수 빈 이름입니다.
- SnapStart는 배포된 버전을 필요로 하며, API 게이트웨이 통합은 Lambda 버전 ARN을 가리켜야 하며, 기본 함수 ARN이 아니어야 합니다.

## Lambda 프로비저닝

<div class="content-ad"></div>

위 배포 고려 사항을 염두에 두고, aws_lambda_function을 사용하여 Lambda 함수를 프로비저닝하는 우리의 Terraform 모듈 lambda_java의 주요 구현 세부 정보를 아래와 같이 정리했습니다. publish 매개변수가 true로 설정되어 있고, apply_on을 PublishedVersions로 지정하여 snap_start가 켜져 있음에 유의하세요.

```js
resource "aws_lambda_function" "lambda_function" {
  function_name = var.lambda_function.function_name
  runtime       = var.lambda_function.runtime
  handler       = var.lambda_function.handler
  memory_size   = var.lambda_function.memory_size
  timeout       = var.lambda_function.timeout
  filename      = data.archive_file.lambda_zip.output_path
  role          = aws_iam_role.lambda.arn

  tracing_config {
    mode = "PassThrough"
  }
  ephemeral_storage {
    size = var.lambda_function.ephemeral_storage
  }

  publish = true
  snap_start {
    apply_on = "PublishedVersions"
  }

  environment {
    variables = {
      SPRING_CLOUD_FUNCTION_DEFINITION = var.lambda_function.function_name_variable
      API_KEY                          = var.api_key
    }
  }
}
```

그리고 우리 함수 리포의 Terraform 디렉토리에는 입력 변수와 값을 보관하는 terraform.tfvars 파일이 있습니다. 위에서 논의한 내용과 일치하는 runtime 및 handler 값에 주의하고, 메모리 크기는 전원 조정에서 결론을 도출한 값입니다.

```js
aws_region                         = "us-east-1"
http_api_gateway_name              = "openai-api-client"
api_gateway_stage_name             = "dev"
description                        = "openai-api-client"
api_gw_log_group_retention_in_days = 7
stage_variables                    = {}

lambda_code_file             = "./openai-api-chat-0.0.1-SNAPSHOT-aws.jar"
lambda_archive_path          = "./openai-api-chat-0.0.1-SNAPSHOT-aws.zip"
resource_name_prefix         = "chat-java17-snapstart"
lambda_log_retention_in_days = 7
lambda_function              = {
  function_name          = "chat-java17-snapstart"
  runtime                = "java17"
  handler                = "org.springframework.cloud.function.adapter.aws.FunctionInvoker"
  function_name_variable = "chat"
  ephemeral_storage      = "512"
  memory_size            = "512"
  timeout                = "15"
}
```

<div class="content-ad"></div>

또한 Java 17 람다 런타임 지원은 terraform-provider-aws 버전 4.66.0에서 제공됩니다. 따라서 main.tf 파일의 required_providers 섹션에 올바른 버전을 사용하는지 확인해주세요. 아래 스니펫을 참조해주세요.

```js
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.66"
    }
  ...
}
```

우리의 Lambda 모듈의 출력 중 하나로 aws_lambda_function 리소스의 qualified_invoke_arn 속성을 캡처하고 있습니다. 이는 API Gateway에서 Lambda 함수를 호출할 때 사용하는 버전 번호가 포함된 ARN(ARN with Lambda function's version number)을 의미합니다. 이 데이터는 Lambda 함수를 HTTP API Gateway와 통합하는 데 중요한 역할을 합니다.

```js
output "qualified_invoke_arn" {
  value       = aws_lambda_function.lambda_function.qualified_invoke_arn
  description = "API Gateway에서 Lambda 함수를 호출하는 데 사용되는 버전 번호가 포함된 ARN(ARN with lambda version number)"
}
```

<div class="content-ad"></div>

## HTTP API Gateway Provisioning

API 게이트웨이를 프로비저닝 하는 가장 간단한 방법은 API 게이트웨이 리소스의 body 매개변수로 OpenAPI 스펙을 전달하는 것입니다. 저희 경우, `aws_apigatewayv2_api`의 body 매개변수에 OpenAPI 스펙 JSON을 전달하고 있습니다.

```js
resource "aws_apigatewayv2_api" "apigateway" {
  name          = var.http_api_gateway_name
  description   = var.description
  protocol_type = "HTTP"
  body          = var.open_api_spec
}
```

OpenAPI 스펙 JSON 파일은 정말 간단하고 직관적입니다. 아래 스니펫을 확인해보세요. 데모를 위해 간단하게 유지하고 있지만, 실제로는 인가자를 추가하거나 CORS를 구성하는 것이 좋습니다.

<div class="content-ad"></div>

```json
{
  "openapi": "3.0.1",
  "info": {
    "title": "openai-api-client",
    "version": "2023-04-30 00:45:35UTC"
  },
  "paths": {
    "/chat-java17-snapstart": {
      "post": {
        "responses": {
          "default": {
            "description": "Default response for POST /chat-java17-snapstart"
          }
        },
        "x-amazon-apigateway-integration": {
          "payloadFormatVersion": "2.0",
          "type": "aws_proxy",
          "httpMethod": "POST",
          "uri": "${qualified_invoke_arn}",
          "connectionType": "INTERNET"
        }
      }
    }
  },
  "x-amazon-apigateway-importexport-version": "1.0"
}
```

위의 중요한 줄 중 하나는 x-amazon-apigateway-integration 섹션의 uri입니다. 위 섹션에서 프로비저닝된 람다 함수 출력에서 qualified_invoke_arn을 캡처했던 것을 기억하십니까? 여기서 우리는 실제로 HTTP API 게이트웨이를 람다 함수 버전과 통합하기 위해 해당 qualified_invoke_arn을 사용하고 있습니다.

빠른 퀴즈: 왜 특정 함수 버전과 통합해야 할까요?

맞췄어요! SnapStart는 발행된 버전을 필요로 합니다.

<div class="content-ad"></div>

아래에서 HTTP API 게이트웨이 모듈을 호출하여 프로비전하는 코드 스니펫을 확인할 수 있습니다. templatefile 함수를 사용하여 openai-client-openapi.json 파일을 open_api_spec 변수에 전달하고, Lambda 모듈 module.lambda.qualified_invoke_arn의 출력을 qualified_invoke_arn으로 구성했습니다.

```js
module "apigatewayv2" {
  source     = "github.com/wenqiglantz/reusable-workflows-modules//terraform/modules/apigatewayv2?ref=main"
  aws_region = var.aws_region

  open_api_spec = templatefile("${path.root}/openai-client-openapi.json", {
    qualified_invoke_arn = module.lambda.qualified_invoke_arn
  })
  http_api_gateway_name              = var.http_api_gateway_name
  description                        = var.description
  api_gateway_stage_name             = var.api_gateway_stage_name
  api_gw_log_group_retention_in_days = var.api_gw_log_group_retention_in_days
  stage_variables                    = var.stage_variables
  lambda_function                    = var.lambda_function.function_name
}
```

## GitHub Actions Workflow

GitHub Actions 워크플로우를 개발하여 CI 및 CD를 실행하여 Java Lambda 코드를 빌드하고 배포하여 AWS에서 프로비전된 Lambda 함수에 배포되도록 했습니다. 아래에 해당 워크플로우의 주요 단계를 호출하는 코드 스니펫이 표시되어 있습니다. 이 코드는 action appleboy/lambda-action을 호출하여 지정된 jar 파일을 Lambda 함수에 배포하며, 자격증명과 AWS 지역 정보가 전달됩니다.

<div class="content-ad"></div>


- name: Lambda 함수에 배포하기
  uses: appleboy/lambda-action@master
  with:
    # 여기서는 액세스 키와 비밀 키를 사용해야 합니다. IAM 역할은 작동하지 않았습니다.
    aws_access_key_id: ${secrets.AWS_ACCESS_KEY_ID}
    aws_secret_access_key: ${secrets.AWS_SECRET_ACCESS_KEY}
    aws_region: ${secrets.AWS_REGION}
    function_name: chat-java17-snapstart
    zip_file: target/openai-api-chat-0.0.1-SNAPSHOT-aws.jar


## 추가 포인트: Infracost 지원

Infracost는 엔지니어들이 리소스를 시작하기 전에 클라우드 비용을 확인할 수 있도록 도와줍니다. 제 Terraform 코드는 이미 Infracost와 통합되어 있어, CPU/메모리의 정적 구성 및 동적 사용량 세부정보를 기반으로 클라우드 비용을 볼 수 있습니다.

아래는 Lambda 함수와 해당 API 게이트웨이에 대해 정의한 사용량 파일입니다. 이 예상 사용량 세부정보는 단순히 샘플입니다:


<div class="content-ad"></div>

```js
version: 0.1
resource_type_default_usage:

  aws_lambda_function:
    monthly_requests: 1000000       # 람다 함수에 대한 월간 요청 횟수.
    request_duration_ms: 1000       # 각 요청의 평균 지속 시간(밀리초)입니다.

  aws_cloudwatch_log_group:
    storage_gb: 10                  # CloudWatch 로그에 저장된 총 데이터(GB).
    monthly_data_ingested_gb: 10    # CloudWatch 로그에 의해 월간 흡수된 데이터(GB).
    monthly_data_scanned_gb: 10     # CloudWatch 로그 인사이트에서 월간 스캔된 데이터(GB).

  aws_apigatewayv2_api:
    monthly_requests: 1000000       # HTTP API Gateway에 대한 월간 요청 횟수.
    request_size_kb: 2              # HTTP API Gateway로 보낸 평균 요청 크기(KB). 요청은 512KB 증가로 측정되며, 최대 크기는 10MB입니다.
```

위의 구성이 있으면, 함수를 프로비젼하는 Terraform GitHub Actions 워크플로를 실행할 때, Infracost 추정 상세 내용에 대한 이메일 알림이 발송됩니다. 아래 예시 이메일에서는 람다 함수와 관련된 리소스의 월간 총 비용, $22가 포함되어 있습니다.

<img src="/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_4.png" />

인프라 파이프라인에 Infracost를 통합하는 방법에 대해 더 알고 싶다면, 자세한 내용은 제 글인 'Infracost + Terraform + GitHub Actions = 클라우드 비용 관리 자동화'를 확인해보세요.

<div class="content-ad"></div>

# 배포 옵션 비교

동일한 람다 함수를 가지고, 두 가지 다른 옵션에 대한 배포를 살펴봅시다. 결과는 매우 명확합니다.

## 옵션 1: 람다 Java 17 지원, SnapStart 없음

기본 메모리는 512 MB, SnapStart 없음:

<div class="content-ad"></div>


![image1](/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_5.png)

Startup time: 4.372 seconds

![image2](/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_6.png)

## Option 2: Lambda Java 17 support, with SnapStart enabled


<div class="content-ad"></div>

기본 메모리는 512 MB이며, SnapStart로 함께 제공됩니다:

![이미지1](/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_7.png)

복원 시간: 569.09 ms

![이미지2](/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_8.png)

<div class="content-ad"></div>

로그의 아래 보고서 라인이 더 많은 정보를 알려줍니다:


![이미지](/assets/img/2024-07-12-GoingServerlessWithSpringCloudFunctionAWSLambdaJava17SupportandSnapStart_9.png)


- 소요 시간: 3593.21 ms (대부분은 OpenAI API 호출로 인해 시간이 오래 걸림)
- 청구된 소요 시간: 3854 ms
- 복원 소요 시간: 568.35 ms (더 이상 콜드 스타트가 없어졌습니다!)
- 청구된 복원 소요 시간: 260 ms

SnapStart에 의한 성능 향상이 상당히 뚜렷하다는 것을 확인할 수 있습니다! 더 이상 콜드 스타트는 없습니다! SnapStart는 정말 Java 람다 함수에 대한 게임 체인저입니다.

<div class="content-ad"></div>

## 언급할 가치가 있는 몇 가지 관찰 사항

샘플 채팅 기능을 사용하면서 arm64 아키텍처를 사용하도록 변환해 보려고 시도했더니, SnapStart가 활성화된 함수는 arm64 아키텍처로 변환할 수 없다는 사실을 발견했습니다.

이후 이 AWS 문서를 찾았습니다. SnapStart에는 몇 가지 제한 사항이 있으니 주의해야 합니다:

업데이트: 2023년 5월 10일 현재, AWS X-Ray로 SnapStart가 활성화된 람다 함수를 디버깅하는 것이 쉽게 되었습니다. 정말 좋은 소식입니다!

<div class="content-ad"></div>

# 요약

Lambda Java 17 지원과 SnapStart로 인해 Java가 서버리스 개발의 주요 언어 중 하나로 등장합니다. 인기 있는 Spring Boot 프레임워크와 Spring Cloud Function을 사용하면 Java는 견고하고 확장 가능한 서버리스 마이크로서비스를 구축할 수 있는 많은 잠재력을 갖고 있습니다.

여기 계신 모든 수준의 Java 개발자들에게 부르는 소리입니다 — 서버리스 개발을 꺼리지 마세요! 이제 우리는 모두 서버리스 세계로 뛰어들어서 약간의 물보기를 하도록 합시다! ECS 또는 EKS에서 호스팅하고자 하는 워크로드들에 대해서는, 아마도 서버리스 아키텍처가 더 나은 옵션이 될지 확인해보는 것이 좋을 것입니다.

이 글의 완전한 소스 코드는 제 GitHub Repos에서 확인하실 수 있습니다.

<div class="content-ad"></div>

https://github.com/wenqiglantz/openai-api-client-spring-cloud-function

https://github.com/wenqiglantz/reusable-workflows-modules

코딩 즐기세요!

## 참고 문헌:

<div class="content-ad"></div>

Spring Cloud Function

Spring Cloud Function으로 서버리스 함수 만들기 | Baeldung

https://aws.amazon.com/about-aws/whats-new/2023/04/aws-lambda-java-17/

https://aws.amazon.com/blogs/compute/reducing-java-cold-starts-on-aws-lambda-functions-with-snapstart/

<div class="content-ad"></div>

https://github.com/alexcasalboni/aws-lambda-power-tuning

[https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function.html#snap_start](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function.html#snap_start)

[https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)

[https://www.tinystacks.com/blog-post/api-gateway-rest-vs-http-api-what-are-the-differences/](https://www.tinystacks.com/blog-post/api-gateway-rest-vs-http-api-what-are-the-differences/)

<div class="content-ad"></div>

https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html 