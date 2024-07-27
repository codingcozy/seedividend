---
title: "일상적인 프로덕션 프로젝트에서 사용하는 파이썬 도구들  Part I"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-PythonThingsIUseInDayToDayProductionProjectsPartI_0.png"
date: 2024-07-09 20:45
ogImage:
  url: /assets/img/2024-07-09-PythonThingsIUseInDayToDayProductionProjectsPartI_0.png
tag: Tech
originalTitle: "Python Things I Use In Day To Day Production Projects — Part I"
link: "https://medium.com/python-in-plain-english/python-things-i-use-in-day-to-day-production-projects-part-i-68b80c7c9962"
---

![Python Project](/TIL/assets/img/2024-07-09-PythonThingsIUseInDayToDayProductionProjectsPartI_0.png)

Let's talk about real-world projects. I like to share things that can have a real impact on your Python journey, and today I've decided to share how I structure, code, test, and deploy a real Python project.

— What do I do?

To provide more context, I work as a Solution Engineer (SE) at a Spanish company. As an SE, my tasks range from creating customized systems to helping speed up integration with a new customer through APIs.

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

저희 팀에서는 FastAPI를 사용하여 API를 개발하고, Streamlit을 사용하여 간결한 사용자 인터페이스(UI)를 구축합니다.

이 글에서는 다음과 같은 내용을 공유하겠습니다:

- Python 프로젝트 구조화 방법
- 도움이 될 수 있는 Python 기능들

그럼, 더 이상 언제까지 기다릴 필요 없이 바로 시작해보겠습니다.

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

## 파이썬 프로젝트 구조화 방법

새 프로젝트를 구조화하는 것은 쉬운 일이 아닙니다. 어떤 파일을 먼저 만들어야 하는지, 어떤 폴더가 필요한지 고민하게 됩니다.

시간이 지남에 따라 모든 프로그래머는 작업을 더 쉽게 할 수 있는 자신만의 구조화 스타일을 개발하게 됩니다. 프로젝트를 어떻게 구조화할지 결정하는 데 도움이 되도록 다음 목록을 만들었습니다:

- 각 모듈과 패키지는 자명해야 합니다.

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

모듈의 이름만으로도 모듈의 목적을 명확히 이해할 수 있어야 합니다. 이름이 모듈이 무엇을 위한 것인지 말하지 않는다면, 그것은 좋지 않은 이름입니다.

```python
# connection.py - 데이터베이스에 연결하기 위한 모듈
async def connect[T](*args, **kwargs) -> T:
    pass
```

connection.py 모듈은 데이터베이스에 연결을 만들고 해당 연결을 반환하는 모듈입니다. 현재 이름만으로는 명확하지 않을 수 있습니다. 이 연결은 무엇에 대한 연결인가요? 파일 서버인가요? SSH 연결인가요?

하지만 이 모듈을 올바른 모듈에 배치하면 명확해집니다.

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

.
├── my_app
│ ├── **init**.py
│ └── db
│ ├── **init**.py
│ └── connection.py

우리에게는 이제 Database를 의미하는 db라는 패키지가 있습니다. 그래서 Database와 관련된 모든 것이 거기에 있다고 가정합니다. 그 중에 connection도 포함되어 있겠네요.

— 모든 것은 자신의 자리가 있다

저는 일을 체계적으로 정리하는 것을 좋아합니다. 코딩할 때는 다른 프로그래머들이 나와 함께 작업해야 할 경우에는 무엇을 생각하게 될지 또는 제가 떠난 후에 작업을 계속해야 할 경우를 피해 생각할 수 없습니다.

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

내 코드를 보고 "이딴 쓰레기 코드가 뭐냐?" 라고 말하지 않도록 하고 싶어.

그런 일이 생길 수 있어. 내 이전 프로젝트에 대해 누군가가 그런 말을 했을 거야. 그런 점은 미안해. 그때는 더 좋은 방법을 몰랐거든.

내가 하는 SE의 일 중 하나는 클라이언트를 통합하는 데 도움이 되는 API를 만드는 것이야. API는 기본적으로 엔드포인트로 이루어져 있어. 각 엔드포인트는 API에 연결되는 경로야.

예를 들어, 우리 API가 주문과 제품을 다룬다고 해보자. 각 주문과 관련된 작업은 특정 엔드포인트를 호출함으로써 이루어지고, 제품도 마찬가지야.

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
# main.py
from fastapi import FastAPI  # fastapi 모듈이 설치되어 있다고 가정합니다

app = FastAPI()

@app.post('/order')
async def create_order[T](payload: T):
    # 새로운 주문을 생성하는 함수
    pass

@app.patch('/order/{id}')
async def update_order[T](payload: T, id: int | str):
    # 주문 내용을 업데이트하는 함수
    pass

@app.get('/order/{id}')
async def get_order[T](id: str | int) -> T:
    # ID에 따라 주문을 반환하는 함수
    pass

@app.get('/orders')
async def all_orders[T]() -> list[T]:
    # 모든 주문을 반환하는 함수
    pass

@app.get('/order/{id}')
async def delete_order(id: str | int):
    # ID에 따라 주문을 삭제하는 함수
    pass
```

위에서도 보시다시피 주문에 대한 엔드포인트가 이미 많이 있습니다. 새로운 작업이 필요한 경우 더 많아질 수 있습니다. 마찬가지로 main.py 파일에 제품과 관련된 모든 필요한 엔드포인트를 만들 경우 유지 관리가 어려워질 수 있습니다.

각각의 엔드포인트를 따로 관리하는 것이 좋은 접근 방식일 것입니다. 저는 routes 패키지를 생성하여 각 작업에 따른 모든 엔드포인트를 담는 것을 좋아합니다.

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
.
├── my_app
│   ├── __init__.py
|   ├── main.py
│   └── db
│   │   ├── __init__.py
│   │   ├── connection.py
|   └── routes
│       ├── __init__.py
│       └── order.py
│       └── product.py
```

따라서 주문과 관련된 모든 엔드포인트는 order.py 파일 안에 있게 됩니다:

```js
# routes/order.py
from fastapi import APIRouter # fastapi가 설치되어 있다고 가정합니다.


router = APIRouter()

@router.post('/order')
async def create_order[T](payload: T):
    # 새 주문을 생성하는 함수
    pass

@router.patch('/order/{id}')
async def update_order[T](payload: T, id: int | str):
    # 주문 내용을 업데이트하는 함수
    pass

@router.get('/order/{id}')
async def get_order[T](id: str | int) -> T:
    # 주문 ID로 주문을 반환하는 함수
    pass

@router.get('/orders')
async def all_orders[T]() -> list[T]:
    # 모든 주문을 반환하는 함수
    pass

@router.get('/order/{id}')
async def delete_order(id: str | int):
    # 주문 ID로 주문을 삭제하는 함수
    pass
```

이렇게 하면 main.py 모듈의 주요 프로젝트에 루트를 연결할 수 있습니다:

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
from fastapi import FastAPI
from routes import order

app = FastAPI()

# 주문용 라우터 추가
app.include_router(order.routes)
```

프로젝트가 성장하면서 새로운 라우트 모듈을 추가할 때도 같은 작업을 수행합니다.

— 반복하지 말고(Don't Repeat Yourself, DRY)

대부분의 경우, 우리는 불필요하게 같은 것을 반복하고 있습니다. 그러나 코드를 반복하지 않고 간단하게 만드는 것은 생각보다 쉽지 않을 수 있습니다.

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

코드를 여러 곳에서 쉽게 재사용할 수 있도록 단순화하는 것에는 몇 가지 생각과 계획이 필요합니다. 다른 곳에서 예기치 않은 동작이 발생하지 않도록 변경 사항을 주의 깊게 확인하고 대비해야 합니다.

DRY는 소프트웨어 개발 원칙 중 하나로, Don't Repeat Yourself의 약자로, 한 번만 정의하고 중복을 피하는 것을 강조합니다.

나의 프로젝트 구조에서는 보통 모듈 간에 공유되는 것들을 모아 둔 commons라는 패키지가 항상 있습니다:

```js
.
├── my_app
│   ├── __init__.py
|   ├── main.py
│   └── db
│   │   ├── __init__.py
│   │   ├── connection.py
|   └── routes
│   |   ├── __init__.py
│   |   └── order.py
│   |   └── product.py
|   └── commons
│       ├── __init__.py
|       └── base_response.py
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

프로젝트에서 각 엔드포인트마다 응답 객체를 반환한다고 가정해 봅시다. 주문 및 제품에 대한 응답 구조는 동일해야 하지만 각각에 따라 값이 다를 수 있습니다.

제가 하는 방식은 나머지 부분에서 상속될 수 있는 기본 응답 객체를 만드는 것입니다. 사용자 정의 구현을 가질 수 있는 메서드는 기본에 구현되지 않으며, 구현은 자식 클래스에 맡겨 둡니다.

```js
# ResponseObject에 대한 기본 클래스 - commons/base_response.py
class BaseResponse:
    def __init__(self, *args, **kwargs) -> None:
        pass

    def some_method(self, *args, **kwargs) ->:
        raise NotImplementedError # 구현을 자식 클래스에 맡깁니다

    def status(self, code: int) -> bool:
        return 200 < code <= 299 # 기본 클래스에서 구현됨

    def another_method[T](self, *args, **kwargs) -> T:
        # 무언가를 수행
```

— 컨트롤러, 모델 및 스키마

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

제품 생성, 주문 등을 만드는 기능이 어딨는지 궁금할 수 있습니다.

과거에는 MVC 패턴을 따랐었는데요. M은 모델을 뜻하며, 여기에는 모든 모델이 들어갈 패키지가 있었습니다. V는 뷰로, 주문과 같은 경로(예: 주문 경로)가 모두 들어갔고, C는 컨트롤러로, 데이터베이스에 연결하고 제품을 생성하는 로직 등이 포함되어 있었죠.

저는 M과 C를 "버리기"를 좋아해요. 주문을 위한 패키지를 가지는 것을 선호하며, 여기에는 모델/스키마와 해당 독점 로직이 모두 포함됩니다.

.
├── my_app
│ ├── **init**.py
│ ├── main.py
│ └── db
│ │ ├── **init**.py
│ │ ├── connection.py
| └── routes
│ | ├── **init**.py
│ | └── order.py
│ | └── product.py
| └── commons
│ | ├── **init**.py
| | └── base_response.py
| └── order
│ ├── **init**.py
| └── schemas.py
| └── response.py # base_response.py를 상속받을 것임

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

— 테스트

여기서 놀라운 점은 없어요. 모든 프로젝트에서 프로젝트의 루트에 테스트 폴더가 있습니다. 저는 pytest를 사용해서 테스트하는 것을 선호하며, 모든 테스트 폴더에는 공유 픽스처가 있는 contest.py 모듈이 있습니다.

```js
.
├── my_app
│   ├── __init__.py
|   ├── main.py
│   └── db
│   │   ├── __init__.py
│   │   ├── connection.py
|   └── routes
│   |   ├── __init__.py
│   |   └── order.py
│   |   └── product.py
|   └── commons
│   |   ├── __init__.py
|   |   └── base_response.py
|   └── tests
│       ├── __init__.py
|       └── conftest.py
```

테스트에 대해 더 알아보려면:

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

프로젝트 의존성

모든 환경에서 실행되기 위해 프로젝트에는 필요한 종속 항목이 있습니다.

이러한 종속 항목은 다음과 같을 수 있습니다:

- 모든 Python 종속 항목이 존재하는 요구 사항 파일
- 프로젝트 구성이 있는 설정 파일
- 이미지를 만들기 위한 Dockerfile (Docker를 사용하는 경우)
- 린트 및 테스트와 같은 작업을 실행하기 위한 모든 명령 및 구성이 포함된 Makefile
- 라이선스 파일 및 README 파일
- 기타.

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
.
├── my_app
│   ├── __init__.py
|   ├── main.py
│   └── db
│       ├── __init__.py
│       ├── connection.py
|   └── routes
│       ├── __init__.py
│       ├── order.py
│       └── product.py
|   └── commons
|       ├── __init__.py
|       └── base_response.py
|   └── tests
|       ├── __init__.py
|       └── conftest.py
├── settings.py
├── Dockerfile
├── Makefile
├── README
└── requirements.txt
```

## 제가 사용하는 파이썬 기능 중 도움이 될 수 있는 것들

제가 파이썬 기능과 코드를 향상시키는 멋진 기능에 대해 많이 쓰고 있습니다.

하지만 제 프로젝트에서 얼마나 그것을 사용하고 있을까요?

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

— match/case부터 시작해봐요.

Python 3.10에 도입된 match 문은 복잡한 if-elif-else 또는 딕셔너리 기반 구조의 간결하고 읽기 쉬운 대안을 제공합니다.

if-elif-else의 대안이 아닌 것을 위해 사용할 수도 있지만, 저는 자주 if-elif 블록을 사용할 때 이를 활용해왔어요.

```js
match expression:
    case a:
        # a 케이스에서 할 일
    case b:
        # b 케이스에서 할 일
    case c:
        # c 케이스에서 할 일
    case d:
        # d 케이스에서 할 일
    case e:
        # e 케이스에서 할 일
    case _:
        # 이전 케이스들에 해당하지 않을 때, 다른 일 수행
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

— Python의 typing에서 제네릭 타입 — TypeVar

이 기사에서 볼 수 있는 대부분의 예제에서 제네릭 타입을 사용해 왔습니다. 엔드포인트, 함수, 그리고 클래스에서도 사용하고 있죠.

```js
# ResponseObject의 기본 클래스 - commons/base_response.py
class BaseResponse:
    # 클래스의 나머지 부분은 그대로 유지

    def another_method[T](self, *args, **kwargs) -> T:
        # 어떤 일을 수행
```

여기에서는 제네릭 타입 T를 받아 제네릭 타입인 T를 반환하는 함수를 정의했습니다.

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

— @override 데코레이터

이 글에서 사용된 예시 중 하나는 다른 응답 객체들에 의해 상속될 base_response.py라는 기본 응답 클래스입니다.

기본 클래스의 일부 메소드는 각 응답 객체에 따라 사용자 정의되거나 재정의될 것입니다.

따라서 해당 메소드를 재정의하고 있는 것을 명시적으로 표시하기 위해, PEP 698에서 소개된 @override 데코레이터를 사용합니다.

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
# order/response.py
from typing import override
from commons.base_response import BaseResponse

class Response(BaseResponse):
    def some_method(self, *args, **kwargs) ->:
        # do something

    @override
    def another_method[T](self, *args, **kwargs) -> T:
        # change the behavior of this method
```

이 부분에 대해 더 자세하게 이야기하겠습니다:

## 마지막으로

각 프로젝트는 새로운 것을 배우고 적용할 수 있는 새로운 기회입니다.

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

새로운 프로젝트를 시작할 때마다 솔직히 말하면 좀 무서워해. 하지만 프로젝트를 구조화하고 코딩을 시작하자마자 그 두려움은 사라져.

물론, 어차피 하나에 짜증나는 버그가 있으면 그때는 삶의 선택에 대해 다시 생각하게 만들 수 있지.

프로젝트를 구조화하는 것은 집을 정리하는 것과 비슷해. 우리 모두 정리하고 조직하는 방법이 있지. 중요한 건 우리가 최선을 다해 보다 깨끗하고 잘 정리된 상태로 만들어 놓는 거야. 그래서 우리나 다른 누군가가 무언가를 찾아야 할 때 쉽게 찾을 수 있도록 해야 해.

안녕하세요! 제 글을 읽어주셔서 감사합니다. 이 글을 즐기셨다면 비슷한 내용을 직접 이메일로 받아보고 싶다면

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

# 친절한 한국어 번역 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 다 가시기 전에:

- 작가를 추천하고 팔로우해주세요 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼을 방문해보세요: Stackademic | CoFeed | Venture | Cubed
- 더 많은 콘텐츠: PlainEnglish.io
