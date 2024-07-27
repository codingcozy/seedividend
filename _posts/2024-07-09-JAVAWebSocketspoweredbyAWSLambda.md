---
title: "AWS Lambda로 구동되는 JAVA WebSockets 사용 방법"
description: ""
coverImage: "/assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_0.png"
date: 2024-07-09 09:32
ogImage: 
  url: /assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_0.png
tag: Tech
originalTitle: "JAVA WebSockets powered by AWS Lambda"
link: "https://medium.com/solutions-architect-rocks/java-websockets-powered-by-aws-lambda-8cd974024030"
---


![이미지](/assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_0.png)

이 안내서는 Snapstart를 사용하여 AWS Lambda JAVA를 이용한 AWS API Gateway Websocket 사용 방법을 보여줍니다. 느린 콜드 스타트를 피하기 위해 Snapstart를 사용하는 Quarkus를 활용한 전체 예제를 작성했습니다.

# 어느 정도의 배경 지식이 필요합니다…

AWS API Gateway를 사용하여 Java로 웹소켓을 생성하는 가이드를 찾아보았지만 어렵게 찾아보았습니다. 이는 Snapstart 기술을 통해 서버리스 Java를 작성하는 가장 좋은 방법이기 때문에 아쉬운 일입니다. 이에 시작하는 데 도움이 되도록 이 안내서를 작성했습니다. 즐겁게 시작하세요.

<div class="content-ad"></div>

웹소켓을 사용하는 이유는 무엇일까요? 고급 웹 API를 사용하면 클라이언트와 서버 간의 실시간 통신이 더 효율적으로 이루어집니다. 저는 WebSockets을 활용한 응급 텔레헬스 가상 라인 시스템을 개발했어요. 이제 더 나은 시스템 구축을 위해 이를 개선할 수 있는 새로운 기회가 생겼죠. 모든 참가자를 통화에 연결하는 더 좋은 방법, AI를 활용한 진료 채팅 제품 등이 있어요.

처음에는 NestJS와 TypeScript를 사용하여 첫 번째 웹소켓을 개발했습니다. node.js를 사용한 예제들은 socket.io나 유사한 라이브러리를 사용하는 경우가 많은데, 이 서버 유형은 AWS 람다 서버리스 환경 대신 인프라로 호스팅되어야 합니다. 이 작업을 위해 AWS API 게이트웨이 웹소켓 API를 깊게 이해해야 했습니다. 이제 이를 어떻게 간단하게 구현하는지 알려드릴게요.

AWS API 게이트웨이는 서버 부분을 관리하며 클라이언트 연결과 관련된 모든 작업을 처리해요. 하지만 각 이벤트(CONNECT, Authorizer, MESSAGE, DISCONNECT)마다 API 게이트웨이는 어떻게 해야 할지 알기 위해 람다를 호출합니다.

# 작동 방식

<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_1.png" />

- API를 생성하면 AWS가 기본 URL인 wss://`apiId`를 제공합니다(고정 도메인과 연결할 수 있습니다). 그런 다음 new WebSocket(`URL`, `SubProtocol`)를 사용하여 연결을 열고 일부 메시지를 변경할 수 있습니다.
- API Gateway가 서버 역할을 수행합니다: 연결 열기, 메시지 보내고 수신받기, 클라이언트 연결 끊기. 모든 연결은 API Gateway 관리 API를 사용하여 관리할 수 있으며, 이에 대해 더 자세히 설명하겠습니다.
- 각 서버 작업은 특정 경로로 처리됩니다. 각 경로는 Lambda에 보낼 이벤트입니다.
- WebSocket 경로를 보호하기 위해 다른 Lambda를 경로 Authorizer로 연결할 수 있습니다. 보호된 경로가 호출될 때마다 API Gateway는이 Lambda를 호출하여 해당 작업을 허용하거나 거부할지 평가합니다. 저는 연결 경로만 보호해야한다고 생각합니다. 연결이 열리지 않은 상태에서는 다른 경로를 처리할 수 없기 때문입니다. WebSocket API 서명에 인증 헤더가 없어서 일부 WebSocket 설계에서는 첫 번째 메시지에서 토큰을 보내는 등 연결을 열어보면 하여튼. 웹 브라우저에서 연결을 여는 동안 SubProtocol을 사용하여 토큰을 보내고 Authorizer에서 테스트할 수 있습니다. 하지만 결정은 여러분에게 달렸습니다.
- Authorizer는 이벤트를 테스트하고 Policy 문서를 반환하여 실행을 허용하거나 거부합니다.
- Policy 문서가 허용하는 경우, API Gateway는 이벤트 CONNECT를 람다에 보냅니다. 사용자와 연결 ID를 연결하고 나중에 이 연결로 메시지를 보내기 위해 DB 또는 캐시에 저장할 수 있습니다.
- 클라이언트가 열린 소켓으로 메시지를 보내면 API Gateway가 MESSAGE 이벤트에 대한 람다를 호출합니다. route key를 사용하여 $default route를 사용하거나 각 메시지 유형에 대해 별도의 람다를 정의할 수 있습니다. 예를 들어, 메시지에 '“action”: “…”'와 같은 서명이 있다면, action 값에 따라 특정 유형의 동작을 처리하는 전용 람다를 보낼 수 있습니다. 모든 메시지를 처리하기 위해 독특한 람다를 사용하는 것을 선호합니다. 다시 말하지만, 결정은 여러분에게 달렸습니다.
- 연결이 끝날 때(사용자 또는 서버에 의해), API Gateway는 DISCONNECT 이벤트를 호출합니다.

6단계에서 연결과 사용자를 연결하고 저장해야 한다고 언급했을 때, 이 사용자와 연결을 관리하고 메시지를 보내거나 서버에서 연결을 끊는 것이 중요합니다. API Gateway 관리 API를 사용하여 API 엔드포인트를 전달하여 이러한 동작을 수행합니다.

# 액션으로 이동합시다!

<div class="content-ad"></div>

Quarkus의 간단한 가이드로 AWS Lambda를 생성하는 방법을 시작했어요. 플랫폼은 Quarkus를 Lambda 루프에 맞게 잘 적응시키는 데 훌륭한 일을 합니다. Lambda를 개발하는 데 효과적으로 작동합니다. 하지만 더 많은 것이 필요해요.

## AWS SAM 파일을 적응시키기

Quarkus는 AWS SAM을 사용하여 sam.jvm.yaml을 생성하여 Quarkus와 함께 AWS Lambda를 배포하는 데 도움을 줍니다. 그러나 target 폴더에서 src로 복사하고 WebSocket API를 생성하기 위해 기능을 증가시키는 방법을 보여줄게요:

```js
리소스:
### API 선언

  WebSocketApi:
    Type: AWS::ApiGatewayV2::Api
    Properties:
      Name: java-websocket
      ProtocolType: WEBSOCKET
      RouteSelectionExpression: $request.body.action

### API에 인증자 등록

  WebSocketAuthorizer:
    Type: AWS::ApiGatewayV2::Authorizer
    Properties:
      Name: WebSocketAuthorizer
      ApiId: !Ref WebSocketApi
      AuthorizerType: REQUEST
      AuthorizerUri:
        Fn::Sub: arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${WebSocketAuthorizerFunction.Arn}/invocations
      IdentitySource:
        - route.request.header.Sec-WebSocket-Protocol

#### 모든 루트

  ConnectRoute:
    Type: AWS::ApiGatewayV2::Route
    Properties:
      ApiId: !Ref WebSocketApi
      RouteKey: $connect
      AuthorizationType: CUSTOM
      AuthorizerId: !Ref WebSocketAuthorizer
      OperationName: ConnectRoute
      Target: !Join
        - "/"
        - - "integrations"
          - !Ref RouteIntegration

  DisconnectRoute:
    Type: AWS::ApiGatewayV2::Route
    Properties:
      ApiId: !Ref WebSocketApi
      RouteKey: $disconnect
      AuthorizationType: NONE
      OperationName: ConnectRoute
      Target: !Join
        - "/"
        - - "integrations"
          - !Ref RouteIntegration

  MessageRoute:
    Type: AWS::ApiGatewayV2::Route
    Properties:
      ApiId: !Ref WebSocketApi
      RouteKey: $default
      AuthorizationType: NONE
      OperationName: MessageRoute
      Target: !Join
        - "/"
        - - "integrations"
          - !Ref RouteIntegration

### 각 루트에 동일한 람다 함수 사용

  RouteIntegration:
    Type: AWS::ApiGatewayV2::Integration
    DependsOn:
      - WebSocketLambdaFunction
    Properties:
      ApiId: !Ref WebSocketApi
      Description: 라우트 통합
      IntegrationType: AWS_PROXY
      IntegrationUri:
        Fn::Sub: arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${WebSocketLambdaFunction.Arn}/invocations

  배포:
    Type: AWS::ApiGatewayV2::Deployment
    DependsOn:
      - ConnectRoute
      - MessageRoute
      - DisconnectRoute
    Properties:
      ApiId: !Ref WebSocketApi

  스테이지:
    Type: AWS::ApiGatewayV2::Stage
    Properties:
      StageName: Develop
      Description: 개발 스테이지
      DeploymentId: !Ref Deployment
      ApiId: !Ref WebSocketApi

### 람다 함수, 원하는 대로 구성해요

  WebSocketLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: io.quarkus.amazon.lambda.runtime.QuarkusStreamHandler::handleRequest
      Runtime: java21
      CodeUri: target/function.zip
      MemorySize: 1024
      Timeout: 30
      AutoPublishAlias: SnapStart
      SnapStart:
        ApplyOn: PublishedVersions
      Environment:
        Variables:
          JAVA_TOOL_OPTIONS: -XX:+TieredCompilation -XX:TieredStopAtLevel=1
          QUARKUS_LAMBDA_HANDLER: WebSocket
      Policies:
        - AWSLambdaBasicExecutionRole
        - Statement:
            - Effect: Allow
              Action:
                - "execute-api:ManageConnections"
              Resource:
                - !Sub "arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${WebSocketApi}/*"

  WebSocketLambdaFunctionPermission:
    Type: "AWS::Lambda::Permission"
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref WebSocketLambdaFunction
      Principal: apigateway.amazonaws.com

### 인증자 람다

  WebSocketAuthorizerFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: com.brazilianbytes.websocket.WebSocketAuthorizer::handleRequest
      Runtime: java21
      CodeUri: target/function.zip
      MemorySize: 1024
      Timeout: 30
      AutoPublishAlias: SnapStart
      SnapStart:
        ApplyOn: PublishedVersions
      Environment:
        Variables:
          JAVA_TOOL_OPTIONS: -XX:+TieredCompilation -XX:TieredStopAtLevel=1
          QUARKUS_LAMBDA_HANDLER: Authorizer
      Policies:
        - AWSLambdaBasicExecutionRole
        - Statement:
            - Effect: Allow
              Action:
                - "execute-api:ManageConnections"
              Resource:
                - !Sub "arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${WebSocketApi}/*"

  WebSocketAuthorizerFunctionPermission:
    Type: "AWS::Lambda::Permission"
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref WebSocketAuthorizerFunction
      Principal: apigateway.amazonaws.com
```

<div class="content-ad"></div>

이 파일을 사용하면 AWS에 WebSocket을 배포할 수 있어요.

## Lambda 핸들러

![Lambda Handlers](/assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_2.png)

WebSocketLambda는 간단한 이벤트 프로세서에요. EventHandlerFactory는 이벤트를 처리할 적절한 프로세서를 제공해요.

<div class="content-ad"></div>

```java
public class WebSocketLambda implements RequestHandler<APIGatewayV2WebSocketEvent, APIGatewayV2WebSocketResponse> {

  @Inject
  Logger logger;

  @Inject
  EventHandlerFactory factory;

  @Override
  public APIGatewayV2WebSocketResponse handleRequest(APIGatewayV2WebSocketEvent event, Context context) {
    final Gson gson = new Gson();
    logger.debug("WebSocketLambda.handleRequest");
    logger.debug(gson.toJson(event));
    logger.debug(gson.toJson((context)));

    AbstractEventHandler processor = this.factory.getEventHandler(event.getRequestContext().getEventType());

    return processor.handle(event, context);
  }
}
```

WebSocketAuthorizer는 사용자가 작업을 수행할 수 있는지 여부를 확인할 것입니다.

```java
public class WebSocketAuthorizer implements RequestHandler<APIGatewayCustomAuthorizerEvent, IamPolicyResponse> {

  @Override
  public IamPolicyResponse handleRequest(final APIGatewayCustomAuthorizerEvent event, final Context context) {
    final String principalId = event.getHeaders().get("Sec-WebSocket-Protocol");
    final String resource = String.format("arn:aws:execute-api:%s:*:%s/%s/*",
        System.getenv("AWS_REGION"),
        event.getRequestContext().getApiId(),
        event.getRequestContext().getStage()
    );

    IamPolicyResponse response = IamPolicyResponse
        .builder()
        .withPrincipalId(principalId)
        .withPolicyDocument(
            IamPolicyResponse.PolicyDocument.builder()
                .withVersion(IamPolicyResponseV1.VERSION_2012_10_17)
                .withStatement(
                    Collections.singletonList(
                        Objects.equals(principalId, "ALLOW") ?
                            IamPolicyResponse.allowStatement(resource) :
                            IamPolicyResponse.denyStatement(resource)
                    )
                )
                .build()
        )
        .build();

    return response;
  }
}
```

## 이벤트 프로세서들


<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_3.png" />
각 핸들러는 CONNECT, MESSAGE, DISCONNECT 라우트를 다룰 것입니다.

```js
@EventHandlerType(EventType.CONNECT)
public class ConnectEventHandler extends AbstractEventHandler {
  @Override
  public APIGatewayV2WebSocketResponse handle(APIGatewayV2WebSocketEvent event, Context context) {
    final APIGatewayV2WebSocketResponse response = super.handle(event, context);
    final String PROTOCOL_HEADER = "Sec-WebSocket-Protocol";
    response.getHeaders().put(PROTOCOL_HEADER, event.getHeaders().get(PROTOCOL_HEADER));

    return response;
  }
}
```

MessageEventHandler는 ActionHandlerFactory와 함께 작동합니다. 필요에 따라 각 메시지 유형에 대한 ActionHandler를 생성하게 될 것입니다.

<div class="content-ad"></div>

```java
@EventHandlerType(EventType.MESSAGE)
public class MessageEventHandler extends AbstractEventHandler {
  @Inject
  ApiGatewayUtil util;

  @Inject
  ActionHandlerFactory factory;

  @Override
  public APIGatewayV2WebSocketResponse handle(APIGatewayV2WebSocketEvent event, Context context) {

    if (event.getBody() != null) {
      Map json = new Gson().fromJson(event.getBody(), Map.class);
      AbstractActionHandler<?> handler = factory.getActionHandler((String) json.getOrDefault("action", null));
      handler.handle(event, context);
    }

    return super.handle(event, context);
  }
}
```

## Action Processors

![Action Processors](/assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_4.png)

This is the default Action Handler. It works for any message:

<div class="content-ad"></div>

```java
@ActionHandlerType(ActionHandlerFactory.DEFAULT_ACTION_HANDLER)
public class DefaultActionHandler extends AbstractActionHandler<AbstractSocketMessage> {
  @Override
  public void handleImpl(APIGatewayV2WebSocketEvent event, Context context, AbstractSocketMessage message) {
    final Map<String, String> json = Map.of(
        "message", "whatever"
    );
    this.util.postToConnection(event, gson.toJson(json));
  }
}
```

그러나 메시지별로 ActionHandler를 특수화하려면 메시지의 일부를 기준으로 분리할 수 있습니다. MarcoPoloActionHandler의 예시를 보여드리겠습니다.

```java
@ActionHandlerType("marco")
public class MarcoPoloActionHandler extends AbstractActionHandler<MarcoPoloMessage> {
  @Override
  public void handleImpl(APIGatewayV2WebSocketEvent event, Context context, MarcoPoloMessage message) {
    final Map<String, String> json = Map.of(
        "action", "polo",
        "ts", Instant.now().toString()
    );
    this.util.postToConnection(event, gson.toJson(json));
  }
}
```

사용자가 '“action”: “Marco”'와 같은 메시지를 보내면 이 핸들러가 트리거됩니다.


<div class="content-ad"></div>

postToConnection() 메소드를 주목하셨나요? 이 메소드는 클라이언트에 메시지를 보내기 위해 API Gateway Management SDK를 호출합니다.

```js
@ApplicationScoped
public class ApiGatewayUtil {

  private ApiGatewayManagementApiClient getClient(APIGatewayV2WebSocketEvent event) {
    String region = System.getenv("AWS_REGION");

    return ApiGatewayManagementApiClient.builder()
        .region(region == null ? Region.SA_EAST_1 : Region.of(region))
        .endpointOverride(URI.create(String.format("https://%s/%s", event.getRequestContext().getDomainName(), event.getRequestContext().getStage())))
        .build();
  }

  public void postToConnection(APIGatewayV2WebSocketEvent event, String data) {
    ApiGatewayManagementApiClient client = this.getClient(event);
    client.postToConnection(
        PostToConnectionRequest.builder()
            .connectionId(event.getRequestContext().getConnectionId())
            .data(SdkBytes.fromString(data, Charset.defaultCharset()))
            .build());
  }
}
```

## 인생은 장미로 가득하지 않지만... :-(

AWS SAM CLI는 sam.jvm.yaml을 사용하여 로컬 Docker 컨테이너에서 람다 런타임을 실행하고 Quarkus 코드를 실행할 수 있습니다... 그러나 이는 단순한 람다나 REST/HTTP 람다와만 작동합니다. WebSocket 람다는 AWS SAM에서 로컬로 작동하지 않으며, GitHub에 관한 불평할 문제가 열려 있습니다.

<div class="content-ad"></div>

아직 QuarkusTest를 사용하여 코드를 실행 및 디버깅할 수 있습니다.

## 유닛 테스트가 훌륭합니다


![JAVAWebSocketspoweredbyAWSLambda_5](/assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_5.png)


리소스 폴더에는 API Gateway가 핸들러로 보내는 이벤트들이 모두 있습니다. 모든 것이 어떻게 작동하는지 이해하기 위해 이를 알아야 합니다. 이 프로젝트에 추가해야 할 것은 메시지 유형과 테스트뿐입니다.

<div class="content-ad"></div>

```java
@QuarkusTest
@TestProfile(WebSocketLambdaTestProfile.class)
public class WebSocketLambdaTest {

  static Gson gson;
  @InjectSpy
  ApiGatewayUtil apiGatewayUtil;

  @BeforeAll
  public static void setup() {
    WebSocketLambdaTest.gson = new Gson();
  }

  @Test
  @Order(1)
  public void CONNECT() throws Exception {
    final String json = TestUtil.readJSON("scenarios/websocket/CONNECT.event.json");

    given()
        .contentType("application/json")
        .accept("application/json")
        .body(json)
        .when()
        .post("/_lambda_")
        .then()
        .statusCode(200);
  }

  @Test
  @Order(2)
  public void DefaultMessage() throws Exception {
    final String json = TestUtil.readJSON("scenarios/websocket/default.event.json");

    given()
        .body(json)
        .when()
        .post("/_lambda_")
        .then()
        .statusCode(200);

    verify(apiGatewayUtil)
        .postToConnection(
            argThat(socketEvent -> socketEvent.getBody().contains("whatever")),
            contains("maoe")
        );
  }

  @Test
  @Order(3)
  public void MarcoPoloMessage() throws Exception {
    final String json = TestUtil.readJSON("scenarios/websocket/action.event.json");

    given()
        .body(json)
        .when()
        .post("/_lambda_")
        .then()
        .statusCode(200);

    verify(apiGatewayUtil)
        .postToConnection(
            argThat(socketEvent -> socketEvent.getBody().contains("marco")),
            contains("polo")
        );
  }

  @Test
  @Order(4)
  public void DISCONNECT() throws Exception {
    final String json = TestUtil.readJSON("scenarios/websocket/DISCONNECT.event.json");

    given()
        .body(json)
        .when()
        .post("/_lambda_")
        .then()
        .statusCode(200);
  }

  /**
   * This class provides a mock implementation of the ApiGatewayUtil class for testing purposes.
   * It overrides the postToConnection method to avoid calling the AWS API during tests.
   */
  @Mock
  public static class MockApiGatewayUtil extends ApiGatewayUtil {
    public void postToConnection(APIGatewayV2WebSocketEvent event, String data) {}
  }

}
```

‘action’ 메시지를 테스트할 때는 Order()를 테스트에 지정해야 합니다. 왜냐하면 테스트 병렬성이 후속 단언문과 혼동을 줄 수 있기 때문입니다. 이 점을 피하는 방법을 더 잘 이해할 수 있다면 알려주세요.

이 테스트는 Quarkus에 의해 시작된 Lambda 루프를 사용하여 더 신뢰할 수 있게 만들고 있습니다. 그러나 필요에 따라 테스트를 작성할 수 있습니다.

테스트 중요한 클래스가 있습니다. 바로 Mock: ApiGatewayUtil 클래스입니다. 제 코드에서 이 클래스를 사용하여 postToConnection()을 호출하여 웹소켓 메시지를 보냅니다. 이 코드는 테스트에서 실패할 것입니다.

<div class="content-ad"></div>

## 디버깅

IDE를 사용하여 테스트를 시작하고 원격 디버거를 연결할 수 있어요.

터미널에서 다음 명령을 실행해보세요:

```js
mvn -Dmaven.surefire.debug test
```

<div class="content-ad"></div>

이 문구는 JVM 디버거를 포트 5005에서 실행하고 대기하는 것입니다. 그 후에 IntelliJ를 사용하여 원격 디버거를 연결하세요.

![이미지](/assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_6.png)

그리고 중단점에서 멈출 것입니다.

![이미지](/assets/img/2024-07-09-JAVAWebSocketspoweredbyAWSLambda_7.png)

<div class="content-ad"></div>

# 모든 것이 끝났어요

이 상세한 가이드를 따라주셔서 정말 감사드립니다. 모든 코드는 제 GitHub 저장소에 있습니다. 자유롭게 복제하고 사용하세요. 개선을 위해 기여하는 PR을 보내주시고, 이 가이드가 도움이 되었다면 칭찬도 잊지 마세요.