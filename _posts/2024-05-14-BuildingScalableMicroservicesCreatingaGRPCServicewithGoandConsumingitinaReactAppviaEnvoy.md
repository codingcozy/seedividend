---
title: "스켈러블한 마이크로서비스 구축 Go로 GRPC 서비스 만들기 및 Envoy를 통해 React 앱에서 사용하기"
description: ""
coverImage: "/assets/img/2024-05-14-BuildingScalableMicroservicesCreatingaGRPCServicewithGoandConsumingitinaReactAppviaEnvoy_0.png"
date: 2024-05-14 10:14
ogImage: 
  url: /assets/img/2024-05-14-BuildingScalableMicroservicesCreatingaGRPCServicewithGoandConsumingitinaReactAppviaEnvoy_0.png
tag: Tech
originalTitle: "Building Scalable Microservices: Creating a GRPC Service with Go and Consuming it in a React App via Envoy"
link: "https://medium.com/@digvijay17july/building-scalable-microservices-creating-a-grpc-service-with-go-and-consuming-it-in-a-react-app-1de3c4385c05"
isUpdated: true
---




<img src="/assets/img/2024-05-14-BuildingScalableMicroservicesCreatingaGRPCServicewithGoandConsumingitinaReactAppviaEnvoy_0.png" />

# 준비물

구현에 들어가기 전에 시스템에 다음 사항이 설치되어 있는지 확인하세요:

- Go: 공식 웹사이트(https://golang.org/)에서 Go를 설치하세요.
- Node.js와 npm: (https://nodejs.org/)에서 Node.js를 다운로드하고 설치하세요.
- Docker: Envoy 프록시 컨테이너를 실행하기 위해 Docker를 설치하세요(https://www.docker.com/).



# 단계 1: Go에서 GRPC 서비스 만들기

먼저 Go로 GRPC 서비스를 만들어봅시다. 프로젝트를 위한 새 디렉토리를 만들고 Go 환경을 설정해보세요:

```js
go-grpc-server-with-envoy
```

아래 명령을 실행하여 프로젝트를 초기화하세요:



```js
cd go-grpc-server-with-envoy
go mod init
```

지금은 새로운 Go 파일을 만들어서 서비스를 구현해보세요. 예를 들어 main.go 파일을 만들 수 있습니다. 이 파일에서 GRPC 서비스와 그 메서드를 정의해보세요. 다음은 간단한 예시입니다:

```js
package main

import (
	"context"
	"log"
	"net"
	"google.golang.org/grpc"
)

// YourService should implement the methods of your GRPC service.
type YourService struct{}

// 여기에 GRPC 메서드를 구현하세요.

func main() {
	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	// 여기에 서비스를 등록하세요.

	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
```

# 스텝 2: 프로토버프 정의 만들기




서비스와 메시지를 Protocol Buffers(Protobuf)를 사용하여 정의하세요. "proto" 폴더 안에 .proto 파일을 만들어주세요. 예를 들어 UserInfo.proto 파일을 만들어서 서비스와 메시지 유형을 정의해주세요:

```js
syntax = "proto3";

package proto;

option go_package = "app/proto";

message User {
    string name = 1;
    int32 age = 2;
    Address address = 3;
    PhoneNumber phone = 4;
    string updated_at = 5;
    string created_at = 6;
}

message Address {
    string street = 1;
    string city = 2;
    string state = 3;
    string zip = 4;
}

message PhoneNumber {
    string primary = 1;
    map<string, string> others = 2;
}

message UserRequest {
    string name = 1;
}

message UserResponse {
    User user = 1;
    int32 status = 2;
    string error = 3;
}

service Usr {
    rpc GetUser(UserRequest) returns (UserResponse) {}
}
```

.proto 파일을 컴파일하여 Go 코드를 생성하세요:

```js
 protoc ./proto/userInfo.proto --go_out=. --go-grpc_out=.
```



# 단계 3: GRPC 서비스 구현하기

main.go 파일에 .proto 파일의 정의에 따라 GRPC 서비스 메소드를 구현해주세요.

```go
package main

import (
    "context"
    "log"
    "net"
    "time"

    "github.com/digvijay17july/golang-projects/go-grpc-react-example/go-grpc-server-with-envoy/app/proto"
    "google.golang.org/grpc"
)

type server struct {
    proto.UnimplementedUsrServer
}

func (*server) GetUser(ctx context.Context, in *proto.UserRequest) (*proto.UserResponse, error) {
    
    others := make(map[string]string)
    others["secondary"] = "233453"
    phone := &proto.PhoneNumber{Primary: "1234567890", Others: others}
    user := &proto.User{Name: "Digvijay", Age: 23, Address: &proto.Address{Street: "Pune", City: "Pune", State: "MAHARASHTRA", Zip: "201223"}, Phone: phone, UpdatedAt: time.Now().UTC().String(), CreatedAt: time.Now().UTC().String()}
    return &proto.UserResponse{User: user, Status: 200, Error: ""}, nil
}

func main() {
    lis, err := net.Listen("tcp", ":8080")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }
    s := grpc.NewServer()
    grpcServer := &server{}
    proto.RegisterUsrServer(s, grpcServer)
    log.Printf("Starting server on port :%v", lis.Addr())
    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }

}
```

# 단계 4: GRPC 서비스 Docker 이미지 빌드 및 실행하기



Dockerfile for the Grpc Service app -

```js
FROM golang:1.21.4-alpine

WORKDIR /app

COPY go.sum ./

COPY . ./

RUN go build -o /go-grpc-server-with-envoy

EXPOSE 8080

CMD ["/go-grpc-server-with-envoy"]
```

이미지 빌드하기 -

```js
docker build -t go-grpc-server-with-envoy .
```



# 단계 5: Envoy Proxy 설정하기

Envoy 폴더를 생성하세요. 이 폴더에는 2개의 파일이 포함됩니다.

- ./config/envoy.yaml

```js
admin:
  address:
    socket_address: { address: 0.0.0.0, port_value: 9901 }
static_resources:
  listeners:
    - name: listener_0
      address:
        socket_address: { address: 0.0.0.0, port_value:  8080 }
      filter_chains:
        - filters:
            - name: envoy.filters.network.http_connection_manager
              typed_config:
                "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
                codec_type: auto
                stat_prefix: ingress_http
                route_config:
                  name: local_route
                  virtual_hosts:
                    - name: local_service
                      domains: ["*"]
                      routes:
                        - match: { prefix: "/"}
                          route: { cluster: grpc_service}
                      cors:
                        allow_origin_string_match:
                          - prefix: "*"
                        allow_methods: GET, PUT, DELETE, POST, OPTIONS
                        allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                        max_age: "1728000"
                        expose_headers: custom-header-1,grpc-status,grpc-message
                http_filters:
                  - name: envoy.filters.http.grpc_web
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.filters.http.grpc_web.v3.GrpcWeb
                  - name: envoy.filters.http.cors
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.filters.http.cors.v3.Cors
                  - name: envoy.filters.http.router
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
  clusters:
    - name: grpc_service
      connect_timeout: 0.25s
      type: LOGICAL_DNS
      typed_extension_protocol_options:
        envoy.extensions.upstreams.http.v3.HttpProtocolOptions:
          "@type": type.googleapis.com/envoy.extensions.upstreams.http.v3.HttpProtocolOptions
          explicit_http_config:
            http2_protocol_options: {}
      lb_policy: ROUND_ROBIN
      load_assignment:
        cluster_name: grpc_service
        endpoints:
          - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      address: host.docker.internal
                      port_value: 8080
```



2. ./config/Dockerfile

```js
FROM envoyproxy/envoy:v1.28.0
COPY ./envoy.yaml /etc/envoy/envoy.yaml
```

# 단계 6: 앱 실행을 위한 docker-compose.yaml 생성

```js
version: '3'
services:
  grpc-server:
    image: go-grpc-server-with-envoy:latest  # 실제 Go gRPC 서버 이미지 이름과 태그로 변경
    ports:
      - "8080:8080"  # 컨테이너의 gRPC 포트를 호스트 머신에 매핑
    networks:
      - go-grpc-server-with-envoy

  gateway-envoy:
    build:
      context: ./envoy/config
      dockerfile: Dockerfile
    ports:
      - '8083:8080'

    networks:
      - go-grpc-server-with-envoy

networks:
  go-grpc-server-with-envoy:
```



백엔드를 Envoy 프록시로 실행하려면:

```js
docker-compose up
```

출력:

![이미지](/assets/img/2024-05-14-BuildingScalableMicroservicesCreatingaGRPCServicewithGoandConsumingitinaReactAppviaEnvoy_1.png)



# 단계 7: 리액트 앱 생성하기

```js
npx create-react-app my-grpc-app
cd my-grpc-app
```

# 단계 8: gRPC-Web 및 google-protobuf 플러그인 설치

```js
npm install -g protoc-gen-ts
npm i protoc-gen-grpc-web
```



# 단계 9: 리액트 앱에서 다른 종속성 구성하기

```js
  "dependencies": {
    "@grpc/proto-loader": "^0.7.10",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/react": "^18.2.47",
    "@types/react-dom": "^18.2.18",
    "google-proto-files": "^4.0.0",
    "google-protobuf": "3.21.2",
    "grpc-web": "^1.5.0",
    "protoc-gen-grpc-web": "^1.4.2",
    "protoc-gen-ts": "^0.8.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
```

# 단계 10: 리액트 앱을 위한 GRPC 클라이언트 코드 생성

.proto 파일을 컴파일하여 js 코드를 생성하세요:



```js
protoc -I=src/proto userInfo.proto --js_out=import_style=commonjs,binary:./src/proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src/proto
```

# 단계 11: React 앱 구성하기

UserDetails.js

```js
import React, { Component } from 'react';
import { UsrClient } from '../proto/userInfo_grpc_web_pb';
import { UserRequest } from '../proto/userInfo_pb';// 생성된 클라이언트 코드를 가져옵니다

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
        };
    }

    componentDidMount() {
        const client = new UsrClient('http://localhost:8083'); // 사용 중인 gRPC 서버 URL로 교체해주세요

        // 사용자 이름을 사용해 요청 생성
        const request = new UserRequest();
        // 원하는 사용자 이름으로 대체해주세요

        // GetUser RPC 호출
        client.getUser(request, {}, (err, response) => {
            if (!err) {
                this.setState({ user: response.getUser() });
            } else {
                this.setState({ error: '사용자 데이터를 불러오는 중 오류 발생' });
            }
        });
    }

    render() {
        const { user, error } = this.state;

        return (
            <div>
                {error ? (
                    <p>Error: {error}</p>
                ) : user ? (
                    <div>
                        <h1>사용자 세부 정보</h1>
                        <p>이름: {user.getName()}</p>
                        <p>나이: {user.getAge()}</p>
                        <h2>주소</h2>
                        <p>거리: {user.getAddress().getStreet()}</p>
                        <p>도시: {user.getAddress().getCity()}</p>
                        <p>주: {user.getAddress().getState()}</p>
                        <p>우편번호: {user.getAddress().getZip()}</p>
                        {/* 전화번호 정보를 비슷하게 표시할 수 있습니다 */}
                        <p>업데이트 날짜: {user.getUpdatedAt()}</p>
                        <p>생성 날짜: {user.getCreatedAt()}</p>
                    </div>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        );
    }
}

export default UserDetail;
```



App.js

```js
import logo from './logo.svg';
import './App.css';
import UserDetail from './components/UserDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UserDetail>
          
        </UserDetail>
      </header>
    </div>
  );
}

export default App;
```

### Step 12: React 앱 빌드 및 실행

React 앱을 빌드하고 실행하세요.



```js
npm start
```

결과 -

<img src="/assets/img/2024-05-14-BuildingScalableMicroservicesCreatingaGRPCServicewithGoandConsumingitinaReactAppviaEnvoy_2.png" />

# 결론



본 튜토리얼에서는 Go로 GRPC 서비스를 생성하는 방법, Envoy를 프록시로 구성하는 방법, 그리고 React 앱을 빌드하여 Envoy를 통해 GRPC 서비스와 통신하는 과정을 다루었습니다. 이 설정은 분산 시스템을 구축하는 확장 가능하고 효율적인 방법을 제공합니다. 필요에 따라 서비스 및 React 앱에 더 많은 GRPC 메서드와 기능을 추가하여 이 예제를 확장할 수 있습니다. 즐거운 코딩하세요!

더 많은 정보를 위해 코드를 확인하세요: GitHub