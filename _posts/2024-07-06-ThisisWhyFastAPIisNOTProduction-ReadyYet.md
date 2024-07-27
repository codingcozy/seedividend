---
title: "아직 FastAPI를 프로덕션에 사용하면 안 되는 이유"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-ThisisWhyFastAPIisNOTProduction-ReadyYet_0.png"
date: 2024-07-06 10:24
ogImage:
  url: /assets/img/2024-07-06-ThisisWhyFastAPIisNOTProduction-ReadyYet_0.png
tag: Tech
originalTitle: "This is Why FastAPI is NOT(!) Production-Ready Yet"
link: "https://medium.com/python-in-plain-english/this-is-why-fastapi-is-not-production-ready-yet-6c707823bd7c"
---

# 요약

현대 웹 개발에서 효율적으로 종속 항목을 관리하는 것이 확장 가능하고 유지 관리 가능한 애플리케이션을 만드는 데 중요합니다. 의존성 주입(Dependency Injection, DI) 및 제어의 역전(Inversion of Control, IoC)은 이 요구를 해결하는 두 가지 디자인 원칙입니다. 본 문서에서는 DI와 IoC가 두 가지 인기 있는 Python 프레임워크인 FastAPI 및 PyNest에서 어떻게 구현되는지 알아봅니다. 우리는 두 프레임워크를 소개하고, DI에 대한 접근 방식을 자세히 살펴보며, 다음 프로젝트에 최적인 선택을 도와줄 종합적인 비교를 제공할 것입니다.

/assets/img/2024-07-06-ThisisWhyFastAPIisNOTProduction-ReadyYet_0.png

# FastAPI 소개

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

FastAPI은 표준 Python 타입 힌트를 기반으로 하는 Python 3.7+용 현대적이고 빠른 웹 프레임워크입니다. OpenAPI와 JSON Schema의 자동 생성 기능을 제공하여 API를 빠르고 효율적으로 만드는 데 매우 편리합니다. FastAPI의 DI(Dependency Injection) 접근 방식은 내장되어 있으며, Python의 타입 힌트를 활용하여 의존성을 원활하게 주입합니다.

# FastAPI의 DI(Dependency Injection) 접근 방식

FastAPI에서는 의존성 주입이 함수 시그니처 내의 Depends 키워드를 사용하여 처리됩니다. 이는 FastAPI에게 의존성 함수를 호출하도록 지시하고 해당 매개변수의 인수 값으로 결과를 사용하도록 합니다.

## 예시: FastAPI 의존성 주입

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

```python
from fastapi import Depends, FastAPI

app = FastAPI()

# 의존성 함수
async def common_parameters(q: str = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

# 해당 의존성을 사용하는 라우트
@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

이 예에서 `common_parameters`은 `/items/` 라우트에 접근할 때마다 실행되는 의존성 함수입니다.

## 의존성 주입에서의 중복성

FastAPI는 각 라우트의 함수 수준에서 의존성이 주입되어야 합니다. 여러 라우트가 동일한 의존성을 필요로 하는 경우 각 라우트 핸들러 함수에 별도로 주입해야 합니다. 특히 많은 수의 라우트와 공유 의존성이 있는 응용 프로그램에서 반복적이고 장황한 코드로 이어질 수 있습니다.

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

## 예제

```js
from fastapi import Depends, FastAPI

app = FastAPI()

# 의존성
class Logger:
    def __init__(self):
        print("로거 시작")
        time.sleep(2)
        print(f"로거 시작됨 - {self}")

    def log(self, message):
        print(f"로깅 - {message}")


# 동일한 의존성을 주입하는 여러 라우트
@app.get("/items/")
async def read_items(logger: Annotated[Logger, Depends(Logger)]):
    logger.log("아이템 목록")
    return {"message": "아이템"}

@app.post("/items/")
async def create_item(logger: Annotated[Logger, Depends(Logger)]):
    logger.log("아이템 생성 중")
    return {"message": "아이템 생성됨"}
```

새로운 DB가 필요한 모든 새로운 라우트에서 우리는 DB를 명시적으로 주입해야 합니다. 약간 크게 확장해보면 모든 라우트가 공유된 로거, 공유된 설정, 그리고 DB 연결을 주입해야 한다고 상상해보면, 같은 코드를 계속 반복해서 작성해야 하는 상황이 생길 것입니다.

# FastAPI에서 클래스 의존성 주입하기

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

FastAPI 루트에서 단일 및 여러 종속성을 주입하고 모든 호출마다 객체를 재설정하는 문제를 탐색해 보는 시나리오를 살펴봅시다.

단일 종속성 주입 - 이 예시에서는 API 루트로 주입될 Logger 객체를 만듭니다.

```python
from fastapi import FastAPI, Depends
import time

app = FastAPI()

class Logger:
    def __init__(self):
        print("Logger Starting")
        time.sleep(2)
        print(f"Logger Started at - {self}")
        self.params = {}

    def log(self, message):
        print(f"Logging - {message}")

@app.get("/")
def get(logger: Logger = Depends(Logger)):
    logger.log("Endpoint hit")
    return "Logger works"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

출력:

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

로그 출력 시작
로그 출력 시작 위치 - <main.Logger object at 0x102f3ddf0>
로그 - 엔드포인트 요청
정보: 127.0.0.1:64670 - "GET / HTTP/1.1" 200 OK

로그 출력 시작
로그 출력 시작 위치 - <main.Logger object at 0x102f3dbe0>
로그 - 엔드포인트 요청
정보: 127.0.0.1:64670 - "GET / HTTP/1.1" 200 OK

로그 출력 시작
로그 출력 시작 위치 - <main.Logger object at 0x102f3dbb0>
로그 - 엔드포인트 요청
정보: 127.0.0.1:64670 - "GET / HTTP/1.1" 200 OK

위의 결과를 살펴보겠습니다. 애플리케이션의 루트 경로에 접속하려고 할 때, 로거 객체가 초기화되고 "0x102f3ddf0" 위치로 설정되었음을 볼 수 있습니다. 그런 다음 두 번째로 동일한 경로에 액세스하면 로거 객체가 다시 초기화됩니다. 이 때는 다른 메모리 위치에 설정됩니다. 루트 경로를 호출할 때마다 로거 초기화에 2초의 대기 시간이 소요됩니다.

그렇다면 로거에 의존하는 서비스가 필요한 경우 어떻게 될까요?

from fastapi import FastAPI, Depends
import time
import random

class Logger:
def **init**(self):
print("로그 출력 시작")
time.sleep(2)
print(f"로그 출력 시작 위치 - {self}")

    def log(self, message):
        print(f"로그 - {message}")

class Service:
def **init**(self, logger: Logger = Depends(Logger)):
self.logger = logger
print("서비스 시작")
time.sleep(1)
print(f"서비스 시작 위치 - {self}")

    def 실행(self):
        self.logger.log("어떤 작업을 수행 중")
        return f"작업 수행, {random.random()}"

app = FastAPI()

@app.get("/")
def get(service: Service = Depends(Service)):
return f"{service.실행()}"

if **name** == "**main**":
import uvicorn
uvicorn.run(app, host="0.0.0.0", port=8000)

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

당연히요! FastAPI 및 IOC 컨테이너에서의 지원 부족은 이 엔드포인트를 호출할 때마다 이미 초기화된 객체들을 초기화하기 위해 3초의 지연 시간을 지불해야 한다는 주된 이유입니다. 이 패턴은 진정한 안티-패턴이며, FastAPI의 약점을 드러낼 수도 있습니다.

이 문제를 해결하려고 수십 시간을 낭비한 후, FastAPI 자체가 그러한 기능을 제공하지 못하며, 새롭고 더 통합적인 접근이 필요하다는 것을 이해했습니다. 그래서 저는 PyNest를 만들게 되었습니다. 이는 의존성 주입과 모듈성에 중점을 둔 Python 메타-프레임워크입니다.

# PyNest: 모듈식 DI 접근 방식

PyNest의 DI 시스템은 반복적인 코드를 줄이고 대규모 애플리케이션에 특히 유용한 개발 프로세스를 간소화하는 데에 디자인되었습니다. PyNest는 의존성이 한 번에 한 번씩 주입되는 구조화된 DI 시스템을 제공하며, 대체로 컨트롤러 클래스 수준에서 이루어집니다. 이 구조는 한 번 의존성이 컨트롤러에 주입되면 더 이상 주입이 필요하지 않고 코드가 재사용되며 DRY 원칙을 준수할 수 있음을 의미합니다. 이 구조를 통해 한 번 의존성이 컨트롤러에 주입되면 더 이상의 주입이 필요 없이 해당 컨트롤러의 모든 경로 메서드에서 사용될 수 있으므로 코드베이스를 간소화할 수 있습니다.

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

/assets/img/2024-07-06-ThisisWhyFastAPIisNOTProduction-ReadyYet_1.png

# 한 번 주입하고 여러 번 사용하기

PyNest의 모듈화된 아키텍처를 사용하면 컨트롤러 클래스의 생성자에 종속성을 주입할 수 있어서 매번 모든 라우트에 종속성을 반복해서 주입할 필요 없이 모든 라우트에서 이 종속성을 사용할 수 있습니다.

예시 —

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

```python
from nest.core import Injectable, Controller, Get, Post

@Injectable
class Logger:
    def __init__(self):
        print("Logger Starting")
        time.sleep(2)
        print(f"Logger Started at - {self}")

    def log(self, message):
        print(f"Logging - {message}")


@Controller("items")
class ItemsController:

  # Inject Once
  def __init__(self, logger: Logger):
      self.logger = logger


  # Use Many
  @Get("/")
  async def read_items(self):
      self.logger.log("list of items")
      return {"message": "Items"}

  @Post("/{item}")
  async def create_item(self, item: str):
      self.logger.log("creating item")
      return {"message": f"Item created - {item}"}
```

이 모듈화된 접근 방식을 통해 컨트롤러 생성자에 필요한 만큼의 의존성을 주입하고 이러한 의존성을 클래스 메서드에서 액세스할 수 있습니다. 이 결과로 코드가 훨씬 더 깔끔해지며 코드를 다시 작성하거나 복잡하게 만들 필요가 없어집니다.

# 싱글턴 패턴의 힘을 받아들이세요

이전에 논의한 바와 같이, FastAPI의 DI 매커니즘의 가장 큰 단점은 종속성을 관리하기 위해 싱글턴 패턴을 사용하지 않는 것입니다. 우리는 종속성이 모든 들어오는 요청마다 초기화되어야 한다는 것을 관찰했습니다.

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

PyNest에서는 현역에서 "injector" 라이브러리를 활용합니다. 이 라이브러리는 현대적인 Python 애플리케이션에서 종속성을 관리하기 위한 패키지입니다. injector은 싱글톤 패턴과 멀티 바인딩을 지원합니다. 클래스가 Injectable로 표시되어 종속성으로 등록되면, injector는 해당 클래스의 인스턴스를 생성하고 그 참조를 저장합니다. 이 injectable 객체에 대한 모든 호출은 injector를 통해 이루어지며, injectable 객체의 싱글톤 인스턴스를 반환합니다.

## 코드로 살펴보기

먼저, PyNest에서 모든 관련 import문을 정리해 봅시다

```python
import logging
import os

from nest.core import (
    Controller,
    Delete,
    Get,
    Injectable,
    Module,
    Post,
    Put,
    PyNestFactory,
)
import time
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

다음으로 주입하려는 두 개의 제공자와 로직 레이어를 포함하는 주요 서비스를 선언할 것입니다.

```js
# 구성 제공자
@Injectable()
class ConfigService:
    def __init__(self):
        time.sleep(2)
        print(f"ConfigService 시작 - {self}")
        self.config = os.environ

    def get(self, key: str):
        return self.config.get(key)

# 로거 제공자
@Injectable()
class Logger:
    def __init__(self, config_service: ConfigService):
        time.sleep(2)
        print(f"로거 시작 - {self}")
        self.config_service = config_service
        self.log = logging.getLogger(__name__)

# 주요 서비스
@Injectable()
class ItemService:
    def __init__(self, logger: Logger):
        time.sleep(2)
        print(f"ItemService 시작 - {self}")
        self.logger = logger
        self.items = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

    def get(self):
        self.logger.log.info("엔드포인트 호출됨")
        return self.items

    def post(self, item: dict):
        self.items.append(item)
        return self.items

    def put(self, item: dict):
        self.items.append(item)
        return self.items

    def delete(self, item: dict):
        self.items.remove(item)
        return self.items
```

이제 Controller를 생성하고 서비스에 주입합니다 —

```js
@Controller("items")
class ItemController:
    def __init__(self, item_service: ItemService):
        print("ItemController 시작 - {self}")
        self.item_service = item_service

    @Get("/")
    def get(self):
        return self.item_service.get()

    @Post("/")
    def post(self, item: dict):
        return self.item_service.post(item)

    @Put("/")
    def put(self, item: dict):
        return self.item_service.put(item)

    @Delete("/")
    def delete(self, item: dict):
        return self.item_service.delete(item)
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

대단해요, 거의 다 왔어요. 이제 앱 모듈을 정의하고 애플리케이션을 실행해 봅시다 -

```js
@Module(
    controllers=[ItemController],
    providers=[Logger],
)
class AppModule:
    pass


app = PyNestFactory.create(AppModule)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app.http_server, host="0.0.0.0", port=8623)
```

결과 —

```js
ConfigService starting - <__main__.ConfigService object at 0x10444d580>
Logger Starting - <__main__.Logger object at 0x10444daf0>
ItemService starting - <__main__.ItemService object at 0x10444d190>

INFO:     Started server process [64770]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8623 (Press CTRL+C to quit)


INFO:     127.0.0.1:63810 - "GET /items/ HTTP/1.1" 200 OK
INFO:     127.0.0.1:63824 - "PUT /items/ HTTP/1.1" 200 OK
INFO:     127.0.0.1:63840 - "POST /items/ HTTP/1.1" 200 OK
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

와우! 정말 멋지네요. 우리는 Injectables 객체를 한 번만 초기화하고, 그 이후로는 컨테이너가 해당 객체들의 인스턴스를 관리한다는 것을 알 수 있어요.

/assets/img/2024-07-06-ThisisWhyFastAPIisNOTProduction-ReadyYet_2.png

# PyNest DI 매니페스트

## 주입 가능한 객체

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

- Injectable-to-Injectable Injection: Injectable 객체는 다른 Injectable 객체를 주입할 수 있어서 일관성 있고 통합된 종속성 계층을 만들 수 있습니다.

## Controllers

- Controller Injection: 컨트롤러는 Injectable 객체를 주입할 수 있어서 필요에 따라 서비스와 리포지토리에 책임을 위임할 수 있습니다.

## Dependency Graph

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

- 비순환 의존성 그래프: 의존성은 유향 비순환 그래프 (DAG)를 형성해야 합니다. 순환 의존성이 없어야 하며, 이를 통해 처리 가능한 의존성 해결 및 런타임 오류나 무한 루프를 방지할 수 있습니다.

## 의존성 해결과 관리

- 애플리케이션 초기화 과정에서 IoC 컨테이너는 모든 의존성을 해결하고, 아직 등록되지 않은 개체의 인스턴스를 생성하며, 이러한 인스턴스를 관리하여 주입하는 위치에서 제공될 수 있도록 합니다.

## 제공자(Providers) 내보내기

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

- 모듈은 제공자를 내보낼 수 있으며, 이는 응용 프로그램 내의 다른 모듈에서 사용되거나 주입될 수 있습니다.

## 모듈 간 제공자 주입

- 다른 모듈에서 제공자를 주입하려면 해당 원하는 제공자를 포함하는 모듈을 명시적으로 가져와야 합니다.

## 인스턴스 참조 및 재사용

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

- 애플리케이션이 삽입된 공급자를 호출하면 이미 초기화된 인스턴스를 참조하여 재사용합니다. 이렇게 함으로써 필요 없는 공급자 인스턴스의 생성을 방지하고 필요할 때 싱글톤과 같은 패턴을 준수합니다.

# 결론: DI에 있어 PyNest가 선호되는 이유

PyNest의 DI 접근 방식은 코드 조직화와 유지 보수 측면에서 명확한 장점을 제공하며, 특히 모듈화 및 반복을 피하는 것이 중요한 대규모 프로젝트에 적합합니다. 응용 프로그램 구조 내에서 더 높은 수준에서 의존성을 주입할 수 있도록 함으로써, PyNest는 보다 DRY(반복하지 마라) 코드베이스를 용이하게 만들어 줌으로써 오류 가능성을 줄이고 리팩터링 및 테스트 프로세스를 간소화합니다.

반면에 FastAPI의 DI 시스템은 각자의 강점을 갖고 있지만, 함수 수준에서의 주입 요구는 불필요하고 중복적인 요소를 도입할 수 있으며, 웹 애플리케이션이 복잡성을 더해감에 따라 유지 보수 및 확장성에서 오히려 역효과를 낼 수 있습니다.

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

# 자원

- 비동기 마법: PyNest와 SQLAlchemy 2.0이 파이썬 앱 성능을 25% 향상시킵니다.
- FastAPI 이상: PyNest를 이용한 2024년 파이썬 마이크로서비스의 진화
- 의존성 주입 101 - PyNest를 이용한 파이썬 웹 앱의 의존성 주입 단순화
- PyNest PyPI: https://pypi.org/project/pynest-api
- 공식 문서: https://pythonnest.github.io/PyNest/
- GitHub 저장소: https://github.com/PythonNest/PyNest

# 간단하게 설명하기 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 계속하시기 전에:

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

- 글쓴이를 클랩하고 팔로우해주세요! 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: CoFeed | Differ
- 더 많은 콘텐츠: PlainEnglish.io
