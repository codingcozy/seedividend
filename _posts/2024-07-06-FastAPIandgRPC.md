---
title: "FastAPI와 gRPC 비교 2024년 알아야 할 주요 차이점"
description: ""
coverImage: "/assets/img/2024-07-06-FastAPIandgRPC_0.png"
date: 2024-07-06 11:21
ogImage: 
  url: /assets/img/2024-07-06-FastAPIandgRPC_0.png
tag: Tech
originalTitle: "FastAPI and gRPC"
link: "https://medium.com/@arturocuicas/fastapi-and-grpc-19c9b329b211"
---


/assets/img/2024-07-06-FastAPIandgRPC_0.png

안녕하세요 여러분! 오랜 시간 노력한 끝에 FastAPI 시리즈로 돌아왔습니다. 이번에는 gRPC와 함께 하게 됩니다. gRPC는 마이크로서비스 간에 가장 효율적인 데이터 전송 프로토콜 중 하나이며, 저의 최애 중 하나입니다.

우리가 할 일은 세 개의 gRPC 서버를 만드는 겁니다. 각 서버는 서로 다른 부서를 시뮬레이션하고, 각 서버의 가용성에 따라 요청을 처리하고 응답을 생성하는 소비자를 만들 것입니다.

프로젝트는 매우 간단할 것입니다. 레스토랑에서 주문을 받는 서비스 레이어를 갖도록 할 것인데요, 메뉴에 있는 각 항목(drinks 1, drinks 2 등)을 처리할 것입니다. 서비스 레이어는 레스토랑의 서로 다른 부서인 주방, 바, 베이커리를 나타내는 각각의 gRPC에 문의해야 합니다. 요청된 각 항목은 재고에 있을 수도 있고 없을 수도 있습니다. 시작해봅시다! 🚀

<div class="content-ad"></div>

# 한 마디로, 아래 항목들이 필요할 것입니다:

- FastAPI 이미지
- 3개의 gRPC 서버 이미지

먼저 주문을 받고 gRPC에 요청을 보낼 FastAPI 앱을 준비해보겠습니다. 앱은 꽤 간단하지만 잘 구성된 구조를 가지고 있을 것입니다. 아래는 예시 구조입니다.


.
├── api
│   ├── dependencies
│   │   └── grpc
│   │      ├── bar.py
│   │      ├── bakery.py
│   │      └── kitchen.py
│   ├── router.py
│   └── routes
│       └── restaurants.py
├── business_logic
│   └── restaurants.py
├── core
│   └── config.py
├── Dockerfile
├── main.py
├── poetry.lock
├── pyproject.toml
└── schemas
    └── orders.py


<div class="content-ad"></div>

다른 프로젝트들과 다르게, 새로운 의존성을 소개합니다. 여기에는 gRPC 클라이언트가 포함되며, 가독성을 높이기 위해 각 클라이언트를 분리된 grpc 모듈에 두겠습니다. 추가적으로, business_logic이라는 새로운 모듈을 소개하는데, 이를 통해 모든 비즈니스 규칙을 처리할 것입니다. 일반적으로, 다른 도메인과 우리 자신의 모델이 결합되고 변환된 후에 프레젠테이션 레이어로 이동하기 전에 처리됩니다.

이제 기본 코드를 배치하고 테스트해보겠습니다!

![FastAPI and gRPC](/assets/img/2024-07-06-FastAPIandgRPC_1.png)

시작하기에 매우 기본적인 엔드포인트입니다:

<div class="content-ad"></div>

```js
@router.post(  
    "",  
    status_code=201,  
    name="create_order",  
)  
def create_order(  
    order_create: OrderCreate, 
):   
    return {"Say": "주문이 생성되었습니다!"}
```

레스토랑에서 다루는 주문 옵션들을 확실하게 하기 위해 Pydantic의 Enum을 사용하여 유효성 검사를 할 것입니다.

```js
class DrinkEnum(str, Enum):  
    coffee: str = "커피"  
    soda: str = "소다"  
    beer: str = "맥주"  
    wine: str = "와인"  
  
  
class MealEnum(str, Enum):  
    pasta: str = "파스타"  
    pizza: str = "피자"  
    meat: str = "고기 요리"  
    fish: str = "생선 요리"  
  
  
class DessertEnum(str, Enum):  
    cookie: str = "쿠키"  
    donut: str = "도넛"  
    brownie: str = "브라우니"  
    gelato: str = "젤라또"  
  
  
class OrderCreate(BaseModel):  
    order_id: UUID = uuid4()  
    drink: DrinkEnum  
    meal: MealEnum  
    dessert: DessertEnum
```

콘솔에서 테스트해보세요! 💻


<div class="content-ad"></div>


이제 gRPC 서버로 넘어가 봅시다. 우리가 Kafka 게시물에서 했던 것과 같이 베이스를 만들고 복제할 겁니다. 먼저 구조부터 만들어 봅시다.


.
├── core
│   └── config.py
├── Dockerfile
├── main.py
├── poetry.lock
├── protos
│   └── bar.proto
├── pyproject.toml
└── services
    └── bar.py


파이썬 프로젝트라면 gRPC와 Protos 관련 패키지를 관리하기 위해 Poetry를 초기화할 겁니다.


<div class="content-ad"></div>

```python
poetry init
poetry add grpcio grpcio-tools grpc-interceptor
poetry add python-dotenv pydantic
```

이제 Protos를 작성해 보겠습니다. 이는 어떤 요청과 응답이 될 것인지, 전송할 객체와 타입을 정할 때 할당한 언어로 컴파일된 템플릿입니다.

```js
syntax = "proto3";

package bar;

message OrderRequest {
  string order = 1;
}

message OrderResponse {
  string order_status = 1;
}

service Bar {
  rpc GetOrder(OrderRequest) returns (OrderResponse) {}
}
```

이제 grpc_tools 도구를 사용하여 protobuf 파일을 생성할 것입니다.


<div class="content-ad"></div>

```js
poetry run python -m grpc_tools.protoc -I./protos --python_out=./pb --grpc_python_out=./pb ./protos/bar.proto
```

우리가 pb 폴더에 저장하고 있기 때문에 import에서 수정이 필요합니다. 보통은 스크립트를 통해 이 작업을 처리할 수 있습니다.

file bar_pb2_grpc.py:

```js
import bar_pb2 as bar__pb2  # 이전

import pb.bar_pb2 as bar__pb2  # 수정
```

<div class="content-ad"></div>

이제 main.py 파일로 가서 구현해 봅시다:

```js
import logging
from concurrent import futures

import grpc
from grpc_interceptor import ExceptionToStatusInterceptor

from core.config import settings
from pb.bar_pb2_grpc import add_BarServicer_to_server
from services.bar import BarBaseService


class BarService(BarBaseService):
    pass


def serve():
    interceptors = [ExceptionToStatusInterceptor()]
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10), interceptors=interceptors
    )
    add_BarServicer_to_server(BarService(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    logging.basicConfig(level=settings.logging_level, format=settings.log_format)
    logging.info('Bar Server Starter...')

    serve()
```

여기서는 서버에 10개의 스레드를 설정할 것이라는 점 등 여러 흥미로운 점들을 발견할 수 있습니다. 이러한 매개변수는 필요에 따라 조정할 수 있습니다. 또한 gRPC 도구에서 생성된 서비스를 서버로 전달하는 것을 볼 수 있습니다. 경험상 서비스 로직을 다른 모듈로 이동하는 것이 매우 권장됩니다. 메인 파일이 많은 양의 코드를 포함하기 쉽기 때문에 처리하기 어려워지기 전에 위임하기를 권장합니다.

또한 서버 예외를 가로채는 기능이 있음을 알 수 있습니다. 나중에 응답에서 이를 어떻게 구현할 수 있는지 살펴볼 것입니다. 다른 중요한 부분은 할당할 포트입니다. 보안 또는 보안되지 않은 상태로 구성할 수 있습니다. 우리 경우에는 보안되지 않은 상태일 것입니다. 보안 상태의 경우 문서를 남기겠습니다.

<div class="content-ad"></div>

이제 음료 제공 서비스를 이야기해볼게요!

![image](/assets/img/2024-07-06-FastAPIandgRPC_2.png)

```js
import logging  
  
from grpc import StatusCode  
from grpc_interceptor.exceptions import NotFound, GrpcException  
  
from pb.bar_pb2 import OrderResponse  
from pb.bar_pb2_grpc import BarServicer  
  
mock_drinks = {  
    "coffee": 10,  
    "soda": 5,  
    "beer": 0  
}  
  
  
class BarBaseService(BarServicer):  
      
    def GetOrder(self, request, context):  
        drinks_stock = mock_drinks.get(request.order)  
  
        if drinks_stock is None:  
            raise GrpcException(  
                details="Drink not Found",  
                status_code=StatusCode.NOT_FOUND,  
            )  
  
        if drinks_stock == 0:  
            raise NotFound(  
                details="Drink out of stock",  
                status_code=StatusCode.NOT_FOUND,  
            )  
  
        return OrderResponse(order_status="Delivery!")
```

이제 해야 할 일은 GetOrder 요청을 받았을 때 일부 저장소(데이터베이스, 파일 등)의 응답을 시뮬레이션하는 거예요. 코드를 다른 서버에 복제하기 전에 코드를 테스트해보겠습니다. 이를 위해 Postman을 사용할 건데요:

<div class="content-ad"></div>

![image](https://miro.medium.com/v2/resize:fit:1200/1*N3-rOFlB9Pd8T9WpbmaILw.gif)

서버가 올바르게 작동하는 것을 확인한 후, 남은 두 서버에 대해 동일한 프로세스를 반복합니다.

세 서버를 모두 갖추게 되면, 앱에서 gRPC 서버를 소비할 수 있도록 클라이언트를 작성할 것입니다. 먼저 만들어 둔 모든 프로토콜 버퍼 파일을 복사하여 앱 내에 pb라는 폴더에 저장합니다.

```js
ls -1t app/pb
bakery_pb2_grpc.py
bakery_pb2.py
kitchen_pb2_grpc.py
kitchen_pb2.py
bar_pb2_grpc.py
bar_pb2.py
__init__.py
```

<div class="content-ad"></div>

이제 고객 정보를 살펴봅시다.

각 고객 정보는 다음과 같아야 합니다:

```js
import grpc
from google.protobuf.json_format import MessageToDict

from core.config import settings
from pb.bar_pb2 import OrderRequest
from pb.bar_pb2_grpc import BarStub


class BarClient(object):
    def __init__(self):
        self.channel = grpc.insecure_channel(f"{settings.grpc_bar}:50052")
        # self.channel = grpc.insecure_channel("0.0.0.0:50051")
        self.stub = BarStub(self.channel)

    def get_order(self, order):
        try:
            stub = self.stub.GetOrder(OrderRequest(order=order))

            return MessageToDict(
                stub,
                preserving_proto_field_name=True,
                including_default_value_fields=True
            )

        except grpc.RpcError as rpc_error:
            return {
                "order_status": rpc_error.details()
            }
```

마지막으로 응답을 위한 스키마를 생성하고 이 프로젝트를 Docker에 넣어봅시다.

<div class="content-ad"></div>

```python
class OrderBase(BaseModel):  
    order_id: UUID = uuid4()  
  
class OrderCreate(OrderBase):  
    drink: DrinkEnum  
    meal: MealEnum  
    dessert: DessertEnum  
  
class OrderRead(OrderBase):  
    drink: str  
    meal: str  
    dessert: str
```

이제 도커화 해 봅시다! 🚀

```yaml
version: "3.8"  
  
services:  
  fastapi_service:  
    build:  
      context: ./app  
      dockerfile: Dockerfile  
    hostname: fastapi_service  
    container_name: fastapi_service  
    ports:  
      - "8000:8000"  
    env_file:  
      - app/.env  
    volumes:  
      - ./app:/home/app  
    networks:  
      - my-net  
  
  bakery:  
    build:  
      context: ./bakery  
      dockerfile: Dockerfile  
    hostname: bakery  
    container_name: bakery  
    ports:  
      - "50051:50051"  
    env_file:  
      - bakery/.env  
    volumes:  
      - ./bakery:/home/bakery  
    networks:  
      - my-net  
  
  bar:  
    build:  
      context: ./bar  
      dockerfile: Dockerfile  
    hostname: bar  
    container_name: bar  
    ports:  
      - "50052:50051"  
    env_file:  
      - bar/.env  
    volumes:  
      - ./bar:/home/bar  
    networks:  
      - my-net  
  
  kitchen:  
    build:  
      context: ./kitchen  
      dockerfile: Dockerfile  
    hostname: kitchen  
    container_name: kitchen  
    ports:  
      - "50053:50051"  
    env_file:  
      - kitchen/.env  
    volumes:  
      - ./kitchen:/home/kitchen  
    networks:  
      - my-net  
  
networks:  
  my-net:  
    external: true
```

# 결론

<div class="content-ad"></div>

gRPC 서버를 사용하면 여러 마이크로서비스 간에 정보를 쉽게 공유할 수 있습니다. 전송 속도가 놀랍도록 빠르기 때문에 비즈니스 로직을 한 곳에 중앙 집중시킬 수 있습니다. 또한, 확장성이 매우 좋습니다. 프로토콜 버퍼 파일을 관리하고 업데이트하는 것이 약점일 수 있지만, 처음부터 자동화하면 문제가 없을 것입니다.

- 궁금한 점이나 제안이 있으시면 댓글란에 자유롭게 남겨주세요. 🙏
- GitHub 저장소 링크를 남겨두었으니 직접 사용해보세요. 🔨

좋은 하루 보내세요! 👋

# 소스 코드

<div class="content-ad"></div>

# 참고 자료