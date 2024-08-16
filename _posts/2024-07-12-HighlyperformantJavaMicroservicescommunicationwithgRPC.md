---
title: "gRPC로 높은 성능의 Java 마이크로서비스 통신 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-HighlyperformantJavaMicroservicescommunicationwithgRPC_0.png"
date: 2024-07-12 21:23
ogImage: 
  url: /assets/img/2024-07-12-HighlyperformantJavaMicroservicescommunicationwithgRPC_0.png
tag: Tech
originalTitle: "Highly performant Java Microservices communication with gRPC"
link: "https://medium.com/geekculture/highly-performant-java-microservices-communication-with-grpc-c20e3a77a8db"
isUpdated: true
---




![이미지](/assets/img/2024-07-12-HighlyperformantJavaMicroservicescommunicationwithgRPC_0.png)

현대 클라우드 네이티브 소프트웨어 개발에서, 마이크로서비스는 의심의 여지 없이 가장 널리 사용되는 아키텍처 패턴입니다. 더 알아보려면 이전 기사 '마이크로서비스 101: 아키텍처 이해'를 읽어보세요. 마이크로서비스 아키텍처 디자인 패턴에 대해 깊이 파고들고 싶다면, 제 글 '마이크로서비스 아키텍처와 그 중요한 10가지 디자인 패턴'을 읽어보세요.

마이크로서비스 아키텍처에서는 더 작은 서비스가 특정 도메인에 집중함으로써 서비스를 개발하고 유지하는 데 필요한 인지 부하를 낮출 수 있습니다. 그러나 비즈니스 요구사항을 충족하기 위해 서비스끼리 통신해야 합니다. 이 기사에서는 gRPC(원격 프로시저 호출 프레임워크)와 Liberica JDK를 사용하여 고성능 마이크로서비스 통신을 구축하는 방법을 보여드릴 것입니다.

# 구현

<div class="content-ad"></div>

마이크로서비스는 서로 동기적 및 비동기적으로 통신할 수 있습니다. 동기 통신에는 RESTful API가 널리 사용되지만 gRPC도 인기를 얻고 있습니다. RESTful API와 마찬가지로 gRPC는 서비스 간 통신을 위한 플랫폼 간 언어를 고려하지 않는 방법을 제공합니다. 2016년 Google이 RESTful API의 한계를 극복하기 위해 RPC(원격 프로시저 호출)를 사용하여 마이크로서비스 간 통신을 위해 gRPC를 만들었습니다. gRPC는 HTTP/2를 기반으로 하며 성능을 향상시키기 위해 이진 형식인 Protobuf를 사용합니다. 성능이 중요한 응용 프로그램에서는 gRPC가 효율적이기 때문에 RESTful API보다 우위를 차지할 수 있습니다. HTTP/2와 이진 메시지 형식 Protobuf를 사용함으로써, gRPC가 RESTful API보다 다음의 세 가지 경우에 필요한 경계를 넘어섭니다:

- 더 높은 성능
- 양방향 스트리밍
- 클라이언트 측 부하 분산

저희의 데모에서는 PayPal과 유사한 결제를 생성할 수 있는 단순한 결제 마이크로서비스를 개발할 것입니다. 간단함을 위해 이 결제 마이크로서비스는 데이터베이스가 없이 일시적으로 될 것입니다.

시스템 요구 사항:

<div class="content-ad"></div>

## Java 설치하기

최신 LTS Java 릴리스인 Liberica JDK 17을 설치해주세요. 설치를 확인하려면 다음 명령어를 실행해보세요:

```js
java –version
```

아래와 같은 결과가 표시됩니다:

<div class="content-ad"></div>

```js
openjdk 17.0.4.1 2022-08-12 LTS
OpenJDK 실행 환경 (빌드 17.0.4.1+1-LTS)
OpenJDK 64-Bit 서버 VM (빌드 17.0.4.1+1-LTS, 혼합 모드, 공유 중)
```

이전에 언급한 대로 gRPC는 일반적으로 프로토콜 버퍼를 서비스 정의 및 메시징 형식으로 사용합니다. gRPC에서 서비스 및 메시지 정의는 .proto 파일에 설정됩니다. 프로토콜 버퍼 컴파일러는 .proto 파일을 언어별 구현으로 변환합니다.

필요한 준비물로는 공식 문서에서 설명한 대로 기계에 프로토콜 버퍼 컴파일러를 설치해야 합니다.

Ubuntu 시스템에 프로토콜 버퍼를 설치하는 명령어는 다음과 같습니다:

<div class="content-ad"></div>

```js
sudo apt install -y protobuf-compiler
```

만약 설치가 성공적으로 완료되었다면, 다음 명령어를 사용하여 프로토콜 버퍼 컴파일러 버전을 확인할 수 있습니다:

```js
protoc-version
```

출력 결과는 다음과 같을 것입니다:

<div class="content-ad"></div>

```js
libprotoc 3.12.4
```

# 프로젝트 생성하기

이 데모에서는 Java 17을 사용하여 IDE (예: IntelliJ)로 Gradle 프로젝트를 생성할 것입니다.

gRPC 및 프로토콜 버퍼를 지원하기 위해 다음 종속성을 추가해야 합니다:

<div class="content-ad"></div>


```js
implementation 'io.grpc:grpc-netty:1.49.0'
implementation 'io.grpc:grpc-protobuf:1.49.0'
implementation 'io.grpc:grpc-stub:1.49.0'
```

## .proto 파일 정의

gRPC는 클라이언트와 서버 간의 서비스 계약이 먼저 정의되어야 하는 계약 중심 통신 시스템입니다. Java 소스 코드는 .proto 파일에서 생성됩니다. 여기 우리 Payment 마이크로서비스를 위한 .proto 파일 정의입니다:

```js
syntax = "proto3";
option java_multiple_files = true;
package org.mkzaman.grpcservice;

import "google/protobuf/timestamp.proto";

message Person {
 int32 id = 1;
 string name = 2;
 string email = 3;
}

message PaymentRequest {
 Person sender = 1;
 Person receiver = 2;
 string purpose = 3;
 double amount = 4;
}

enum PaymentStatus {
 SUCCESS = 0;
 FAILURE = 1;
}

message PaymentResponse {
 PaymentStatus status = 1;
 string paymentId = 2;
 google.protobuf.Timestamp executionTime = 3;
}

service PaymentService {
 rpc sendPayment(PaymentRequest) returns (PaymentResponse);
}
```


<div class="content-ad"></div>

파일을 한 줄씩 분석해 봅시다.

.proto 파일은 다음과 같은 기본 구성으로 시작합니다:

```js
syntax = "proto3";
option java_multiple_files = true;
package org.mkzaman.grpcservice;

import "google/protobuf/timestamp.proto";
```

- 첫 번째 줄은 사용하는 Protobuf 버전을 정의합니다. 여기서는 버전 3을 사용합니다.
- 두 번째 줄은 .proto 파일로부터 여러 Java 파일이 생성될 것임을 나타냅니다.
- 세 번째 줄은 생성된 Java 파일의 패키지 이름을 정의합니다.

<div class="content-ad"></div>

.proto 파일에서는 "import"를 사용하여 다른 .proto 파일 및 해당 정의를 가져올 수도 있습니다. 네 번째 줄에서는 구글의 "timestamp.proto" 파일을 가져와서 표준 타임스탬프 속성을 사용합니다.

다음은 메시지 형식입니다:

```js
message Person {
 int32 id = 1;
 string name = 2;
 string email = 3;
}

message PaymentRequest {
 Person sender = 1;
 Person receiver = 2;
 string purpose = 3;
 double amount = 4;
}

enum PaymentStatus {
 SUCCESS = 0;
 FAILURE = 1;
}

message PaymentResponse {
 PaymentStatus paymentStatus = 1;
 string paymentId = 2;
 google.protobuf.Timestamp paymentTime = 3;
}
```

처음 몇 줄에서 "Person" 메시지를 정의했습니다. 각 매개변수에 번호를 지정해야 합니다. REST와 달리 Protobuf는 매번 속성 이름(예: "id")이 전달되는 것이 아니라 숫자 "1"을 전달합니다.

<div class="content-ad"></div>

우리는 또한 송신자, 수신자, 목적 및 금액을 포함하는 PaymentRequest를 정의했습니다.

마찬가지로, 결제 상태, 결제 ID 및 결제 시간을 포함하는 PaymentResponse를 정의했습니다.

마지막으로, 여기 Payment 서비스 계약서가 있습니다:

```js
service PaymentService {
 rpc sendPayment(PaymentRequest) returns (PaymentResponse);
}
```

<div class="content-ad"></div>

서비스에는 PaymentRequest를 받아 PaymentResponse를 반환하는 간단한 sendPayment 메서드가 포함되어 있습니다.

## Java 코드 생성하기

.proto 계약으로부터 Java 코드를 생성하는 여러 방법이 있습니다. 프로토콜 버퍼 컴파일러 "protoc"를 gRPC 문서에 설명된 대로 로컬 머신에 설치하는 것이 하나의 방법입니다. 이 컴파일러 "protoc"를 사용하여 .proto 파일로부터 Java 코드를 생성할 수 있습니다.

또 다른 방법은 Gradle 플러그인을 사용하여 .proto 파일로부터 Java 코드를 생성하는 것입니다. 우리는 그것을 위해 Gradle 플러그인을 사용할 것입니다. gRPC Gradle 플러그인에 대해 더 알아보려면 공식 웹사이트를 방문해 주세요.

<div class="content-ad"></div>

먼저 "service.proto" 파일을 "src/main/proto" 디렉토리에 저장하세요.

그런 다음, 다음과 같이 build.gradle 파일에 프로토콜 버퍼 Gradle 플러그인을 추가하세요:

```js
plugins {
   id 'java'
   id 'com.google.protobuf' version '0.8.19'
}
```

또한 다음과 같이 Protobuf 컴파일을 구성해야 합니다:

<div class="content-ad"></div>

```js
protoc {
    artifact = 'com.google.protobuf:protoc:3.12.4'
}

plugins {
    grpc {
        artifact = 'io.grpc:protoc-gen-grpc-java:1.49.0'
    }
}

generateProtoTasks {
    all()*.plugins {
        grpc {}
    }
}
```

마지막으로, 생성된 소스 코드를 "sourceSets"에 추가하여 IDE가 생성된 Java 코드를 찾고 연결할 수 있도록 합니다.

Gradle 빌드를 성공적으로 완료하면 다음과 같은 메시지 파일이 생성됩니다:

- PaymentRequest.java
- PaymentResponse.java
- PaymentStatus.java
- Person.java

<div class="content-ad"></div>

PaymentServiceGrpc.java 서비스 파일도 생성됩니다. 여기에는 sendPayment() 메서드를 포함하는 static abstract 클래스 PaymentServiceImplBase가 포함되어 있습니다.

PaymentServiceImplBase 클래스를 확장하여 sendPayment() 메서드를 구현해야 합니다.

## 서버 정의

아래와 같이 PaymentServiceImpl 클래스를 정의하고 sendPayment() 메서드를 완성하세요:

<div class="content-ad"></div>


페이먼트 응답은 SUCCESS 상태, 결제 ID 및 결제 시간으로 생성됩니다.

다음과 같은 방법으로 gRPC 서버를 정의합니다:

```java
public static void main(String[] args) throws IOException, InterruptedException {
   Server server = ServerBuilder
           .forPort(8080)
           .addService(new PaymentServiceImpl()).build();

   server.start();
   server.awaitTermination();
}
```

<div class="content-ad"></div>

gRPC 서버는 이미 정의된 Payment 서비스 구현체와 함께 포트 8080에서 리스닝을 시작합니다.

## 클라이언트 정의

다음과 같이 main() 메서드를 사용하여 gRPC 클라이언트를 정의합니다:

```js
public static void main(String[] args) {
   ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 8080)
           .usePlaintext()
           .build();

   PaymentServiceGrpc.PaymentServiceBlockingStub blockingStub
           = PaymentServiceGrpc.newBlockingStub(channel);

   PaymentRequest paymentRequest = PaymentRequest.newBuilder()
                           .setSender(Person.newBuilder().setName("Alice").setId(1).setEmail("alice@alice.com").build())
                           .setReceiver(Person.newBuilder().setName("Bob").setId(2).setEmail("bob@bob.com").build())
                           .setPurpose("Private")
                           .setAmount(1000.00)
                           .build();

   PaymentResponse paymentResponse = blockingStub.sendPayment(paymentRequest);

   channel.shutdown();
}
```

<div class="content-ad"></div>

gRPC에서는 연결, 연결 풀링 및 로드 밸런싱과 같은 낮은 수준의 세부 정보를 추상화하기 위해 고수준 ManagedChannel을 제공합니다.

이 경우 gRPC 서버 주소를 지정합니다. 또한 채널은 "plaintext"로 정의되어 있어 암호화되지 않습니다.

PaymentServiceBlockingStub 스텁은 실제 원격 메서드 호출인 sendPayment()을 수행하는 데 사용됩니다. 클라이언트는 서버와 상호 작용하기 위해 스텁을 사용합니다. 여기서 우리는 응답을 받을 때까지 기다리는 BlockingStub을 사용하고 있습니다.

또한 서버와 비동기 통신을 위한 PaymentServiceStub(비동기 스텁) 및 PaymentServiceFutureStub(퓨처 스텁)이 있습니다.

<div class="content-ad"></div>

간단한 PaymentRequest가 생성되어 gRPC 통신을 테스트하기 위해 클라이언트와 서버 간 통신이 이루어졌습니다. stub을 사용하여 동기적으로 sendPayment() 메서드를 호출하면 PaymentResponse가 반환됩니다.

다음은 생성된 로그 메시지입니다:

```js
2022-09-14 00:54:59 INFO  PaymentServiceImpl:31 - Payment request = sender {
  id: 1
  name: "Alice"
  email: "alice@alice.com"
}
receiver {
  id: 2
  name: "Bob"
  email: "bob@bob.com"
}
purpose: "Private"
amount: 1000.0

2022-09-14 00:54:59 INFO  PaymentServiceImpl:32 - Payment response = paymentId: "23490a4d-75cc-49c0-9012-bc203624f576"
paymentTime {
  seconds: 1663109699
  nanos: 247148687
}
```

로그 메시지에는 gRPC 클라이언트와 서버가 미리 정의된 service.proto 파일을 사용하여 동기적으로 통신한 내용이 표시됩니다.

<div class="content-ad"></div>

# gRPC와 RESTful API의 성능 비교

gRPC를 RESTful API보다 선택하는 주된 이유 중 하나는 gRPC의 우수한 성능입니다. 이를 가능하게 하는 핵심 요소는 JSON 텍스트 형식 대신 사용되는 Protobuf 이진 형식입니다.

protobuf-java-util 라이브러리를 사용하여 직렬화된 Protobuf 메시지와 JSON 메시지의 크기를 비교해보겠습니다.

아래는 비교에 사용된 코드 스니펫입니다:

<div class="content-ad"></div>

```java
final int serializedSize = paymentRequest.getSerializedSize();
System.out.println("serializedSize = " + serializedSize);

final String jsonMessage = JsonFormat.printer().print(paymentRequest);
System.out.println("jsonMessageSize = " + jsonMessage.length());
```

우리의 예시에서 PaymentRequest에 대한 Protobuf 이진 메시지 크기는 68바이트이고, JSON 메시지 크기는 210바이트입니다. 이는 PaymentRequest에 대한 Protobuf 메시지 크기가 동등한 JSON 메시지의 약 32%라는 것을 의미합니다.

REST vs. gRPC의 성능을 평가하는 기사에서 저자는 HTTP를 통해 플레인 텍스트 JSON 요청을 보내는 방식으로 gRPC와 REST를 비교했습니다. 그 벤치마크에 따르면 이 특정 페이로드에 대해 데이터를 수신할 때 gRPC는 대략 REST보다 7배 빠르며, 데이터를 보낼 때는 REST보다 약 10배 빠릅니다.

다른 기사인 gRPC 대 REST 성능 비교에서 저자는 단방향 및 양방향 통신 방식으로 HTTP를 통해 플레인 텍스트 요청을 보내어 유사한 성능 테스트를 실시했습니다. 단방향 통신 결과는 gRPC가 CPU 활용, 처리량 및 응답 시간 측면에서 REST보다 우수하게 수행됨을 명백히 보여줍니다:

<div class="content-ad"></div>

소스: gRPC 대 REST 성능 비교

양방향 통신의 경우 gRPC가 더 뛰어난 성능을 보여줍니다:

## 사용 사례

gRPC는 모든 경우에 REST 대신 사용할 수 있지만, 성능, 처리량, 지연 시간 및 CPU 사용량이 주요 성능 지표인 상황에서 사용하는 것을 추천합니다. 따라서 다음 경우에는 gRPC를 권장드립니다:

<div class="content-ad"></div>

- 양방향 스트리밍
- 고성능 마이크로서비스 통신
- 사물 인터넷(IoT)
- 고성능 스트리밍(Kafka 또는 다른 메시지 버스 및 메시지 대기열).

또한, 대부분의 공용 클라우드 서비스(API Gateway, 메시지 버스, 메시지 대기열)는 gRPC를 네이티브로 지원합니다.

# JVM 세계에서의 대안

프로젝트 내의 모든 마이크로서비스가 JVM 언어(Java, Scala, Kotlin 등)로 개발된 경우, TCP 또는 UDP를 통한 클라이언트-서버 통신이나 RMI 기반 RPC 통신을 위해 순수한 JVM 라이브러리를 사용할 수 있습니다. KryoNet과 같은 라이브러리는 널리 사용되는 효율적인 이진 객체 그래프 직렬화 프레임워크 Kryo를 사용합니다.

<div class="content-ad"></div>

Kryo는 좋은 직렬화 프레임워크이며 RPC용 Protobuf의 대안을 제공합니다. 하지만 항상 Protobuf보다 더 효율적인 것은 아니며 사용 사례에 따라 평가해야 합니다.

다음은 직렬화된 메시지 크기를 비교하는 코드 조각입니다:

직렬화된 메시지 크기는 98입니다. JSON(46%)보다 훨씬 작지만 Protobuf(32%)보다는 상대적으로 큽니다.

# 결론

<div class="content-ad"></div>

이 기사에서는 gRPC를 사용하여 고성능 마이크로서비스 통신을 숙달했습니다. 전통적인 웹 클라이언트와 백엔드 마이크로서비스 간 통신에는 더 나은 기술이 있을 수 있습니다. 그럼에도 불구하고 효율적인 기능과 우수한 성능으로 인해 gRPC는 마이크로서비스 간 통신에 대해 REST보다 선호될 수 있습니다. 게다가, gRPC는 마이크로서비스 간에 양방향 스트리밍이 필요할 때 go-to 프로토콜입니다.

우리는 Java와 Gradle을 사용하여 gRPC 기반 마이크로서비스 통신을 수립하는 간단한 방법을 시연했습니다. 보시다시피, Java는 gRPC와 같은 현대적인 RPC 프레임워크를 지원하며, 다른 현대적인 프로그래밍 언어와 마찬가지로 성능이 우수하고 다양한 기능을 제공합니다.

프로젝트의 소스 코드는 GitHub에서 확인할 수 있습니다.

원문은 https://bell-sw.com에서 원래 게시되었습니다.

<div class="content-ad"></div>

# 유사한 기사