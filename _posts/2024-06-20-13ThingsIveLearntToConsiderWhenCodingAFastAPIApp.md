---
title: "파이파이 앱을 코딩할 때 고려해야 할 13가지를 배운 것들"
description: ""
coverImage: "/assets/img/2024-06-20-13ThingsIveLearntToConsiderWhenCodingAFastAPIApp_0.png"
date: 2024-06-20 04:46
ogImage: 
  url: /assets/img/2024-06-20-13ThingsIveLearntToConsiderWhenCodingAFastAPIApp_0.png
tag: Tech
originalTitle: "13 Things I’ve Learnt To Consider When Coding A FastAPI App"
link: "https://medium.com/@zlliu/13-things-ive-learnt-to-consider-when-coding-a-fastapi-app-8a53f3ce1c88"
---


대학 시절에는 학교 프로젝트를 위해 쓸만한 한 페이지 FastAPI 백엔드 애플리케이션을 만들 수 있었어요. 솔직히 말해 많은 교수님들이 우리의 프로젝트 코드를 읽지도 않으셨다니까요.

```python
# 예시: 쓸만한 한 페이지 fastapi 앱

from fastapi import FastAPI

app = FastAPI()

@app.get('/stuff')
def get_all():
    return {'과일': '사과'}

import uvicorn
uvicorn.run(app)
```

^ 우리는 이렇게 코드를 작성해서 가능한 빨리 일을 끝낼 수 있었고, 우리의 백엔드 엔드포인트가 올바른 결과를 반환하기만 하면, 대부분의 경우 우리 코드가 얼마나 잘 작성되었는지는 아무도 신경쓰지 않았어요.

<div class="content-ad"></div>

저는 현재 대규모 프로덕션급 FastAPI 앱을 개발 중이에요. 만약 제가 이 중 하나라도 하게 된다면, 개발 책임자님에게 혼날 거라고 확신해요. 지난 몇 달 동안 대규모 FastAPI 앱을 만들며 배운 13가지 고려 사항을 소개해드릴게요.

# 1) 타입 어노테이션 (타입 힌트)

이전에 내 코드를 작성했던 방식은 다음과 같아요:

```python
def do_stuff(a, b, c):
    ...
```

<div class="content-ad"></div>

지금 제가 코드를 작성하는 방식은 다음과 같습니다:

```js
from typing import List

def do_stuff(a: int, b: str, c: List[int]) -> List[str]:
    ...
```

여기서 내장 typing 모듈을 사용하여 몇 가지 타입 주석을 추가했습니다:

- a는 정수여야 합니다.
- b는 문자열이어야 합니다.
- c는 정수들로 이루어진 리스트여야 합니다.
- 함수의 반환 값은 문자열들로 이루어진 리스트여야 합니다.

<div class="content-ad"></div>

노트 — 타입 어노테이션(또는 타입 힌트)은 데이터 타입을 강제하지 않습니다. 그저 제안하는 것뿐입니다. 기술적으로 잘못된 데이터 타입을 전달할 수 있지만, Python은 여전히 허용합니다.

하지만, 타입 어노테이션을 작성하는 것은 내가 의도적으로 하는 선택입니다 — 나는 이것들을 다른 개발자들이 동일한 코드베이스에서 작업할 때 명확하고 이해하기 쉽도록 하기 위해 작성합니다. 이렇게 하면 다른 개발자들이 데이터 타입이 정확히 무엇인지 알아내기 위해 더 많은 시간을 낭비하지 않아도 됩니다.

# 2) 정적 타입 체커를 사용하기

타입 어노테이션은 데이터 타입을 강제하지 않지만, mypy와 같은 정적 타입 체커는 강제합니다.

<div class="content-ad"></div>

```python
def add(a: int, b: int) -> int:
    return a + b

print(add('hello ', 'world'))
```

여기서 a와 b는 정수형이어야 하지만 문자열을 전달했습니다.

- 일반적으로 Python은 이를 허용합니다
- mypy와 같은 정적 형 검사 도구는 허용하지 않습니다

따라서 데이터 유형 위반에 대한 추가적인 보호층으로 정적 유형 검사기를 CICD(지속적 통합 지속적 배포) 파이프라인의 일부로 포함하는 것이 중요하다는 것을 깨달았습니다.

<div class="content-ad"></div>

# 3) PEP8 및 코드 스타일링

링크: [https://peps.python.org/pep-0008/](https://peps.python.org/pep-0008/)

예전에 코드를 작성할 때 PEP8을 무시했었어요. 그러다가 코드가 금방 지저분하고 못생기게 되는 것을 깨달았죠.

PEP8 문서는 우리에게 Python 코딩 규칙을 제공하여 코드베이스를 일관되고 깔끔하게 유지하는 것이 이상적이라는 것을 알려줍니다. Python에서는 이를 무시할 수 있지만, 당신의 기술 리드는 그렇게 하지 말라고 할지도 몰라요.

<div class="content-ad"></div>

내 머릿속에 기억나는 몇 가지 규칙이 있어요:

- 함수 간에는 1줄의 개행을 추가해 주세요, 클래스 간에는 2줄의 개행을 넣어 주세요.
- 들여쓰기는 탭 대신 공백을 사용해야 합니다.
- from X import * 는 좋지 않은 습관입니다.
- import 구문은 어떤 순서로든 정리되어야 합니다.
- 코드 라인은 79자 이상으로 길어지면 안 됩니다.

파이썬 개발자가 되고 싶다면, PEP8 문서를 한 번은 꼭 살펴보기를 추천해요. 대부분의 코딩 관례를 조금이라도 익히는 데 도움이 될 거예요.

참고 — 때로는 제가 코드를 작성할 때 PEP8 규칙을 무시하기도 하지만, 프로덕션 코드를 작성할 때는 최대한 모든 규칙을 준수하려 노력하고 있어요.

<div class="content-ad"></div>

# 4) 폴더 구조 및 도메인

학교 프로젝트에서는 어디에 .py 파일을 놓느냐에 상관없이 파일을 마구 놓을 수 있지만, 제품용 코드에서는 그렇게 할 수 없습니다.

제품용 코드에서는 모든 사람이 따라야 할 폴더/파일 구조가 있습니다. 각 팀마다 약간씩 다를 수 있지만, 동일한 팀 구성원 모두가 합의해야 할 사항입니다.


src/
 └── sqlmodels/
    └── dog.py
    └── cat.py
    └── bird.py
 └── dbchanges/
 └── code/
    └── bin/
    └── utils/
    └── web_api/
        └── domain1
          └── router.py
          └── service.py
          └── models.py
        └── domain2
          └── router.py
          └── service.py
          └── models.py
        └── domain3
          └── router.py
          └── service.py
          └── models.py
 └── requirements/
.gitignore
README.md
dockerfile


<div class="content-ad"></div>

여기는 내 제품용 FastAPI 코드의 매우 간소화된 버전입니다 (실제 폴더 구조는 훨씬 더 큽니다)

참고 - 우리 응용 프로그램의 각 하위 섹션은 독립된 도메인 폴더가 제공됩니다.

.MD 파일을 마크다운 형식으로 변경해주세요. 

.py 파일을 마음대로 어디에 둘 수 있고 아무도 신경 쓰지 않는 시절은 지나갔지만, 내가 주장하는 바에 의하면 이것은 좋은 일이라고 생각합니다 - 합의된 폴더 구조는 전체 프로젝트를 더 깔끔하고 유지 관리하기 쉽게 만듭니다.

ORM(객체-관계 매핑)을 사용하는 것이란 SQLAlchemy와 같은 것들.

<div class="content-ad"></div>

제가 학교 프로젝트에서 FastAPI 앱을 다룬 것을 기억해요:

- 각 엔드포인트마다, 데이터에 접근할 때는 데이터베이스를 직접 호출했어요.
- MongoDB에서 바로 사전을 받고, 곧바로 반환했어요.

^ 다만 이 방법에는 문제가 있어요 — 앱이 커질수록 굉장히 지저분하고 유지보수하기 어려워져요. 작은 앱이라면 상관없을 수도 있지만, 대규모 앱에서는 어려울 거에요.

크고 복잡한 애플리케이션에서는 SQLAlchemy와 같은 ORM (객체-관계 매핑) 시스템 사용이 좋은 아이디어라고 말할 수 있어요.

<div class="content-ad"></div>

```js
# 데이터베이스를 직접 호출하기
query = 'select * from dogs where age < 5'

cursor.execute(query)
dogs = cursor.fetchall()

print(dogs)
```

```js
# SQLALchemy 사용하기
stmt = select(Dog).where(Dog.age<5)
dogs = session.execute(stmt)

print(dogs)
```

ORM은 우리 데이터베이스를 감싼 래퍼인데, 시작하는 데는 학습 곡선이 있을 수 있어요. 하지만 거대한 응용프로그램에는 구조가 필요하다는 걸 기억해봐요.

만약 FastAPI 앱에서 수천 개의 문자열 SQL 쿼리를 처리해야 한다면 상황은 좀 체증스러울 거에요 (코드베이스와 정신 건강 모두 말이에요)

<div class="content-ad"></div>

# 6) 엔드포인트에 대한 입력 및 출력 정의

나는 예전에 이렇게 엔드포인트를 작성했어요:

```js
# 나쁜 코드

@app.get('/dogs')
def all_dogs():
    return get_all_dogs()

@app.get('/dogs/{id}')
def one_dog(id):
    return get_dog(id)
```

^ 정확한 입력 및 출력 구조가 정의되지 않았어요. 문제점:

<div class="content-ad"></div>

- 다른 개발자들이 입력과 출력이 무엇인지 추측하는 데 시간을 낭비할 필요가 없어집니다
- 미래에는 아마도 당신이 입력과 출력이 무엇인지 추측하는 데 시간을 낭비할 수도 있습니다

결국 이렇게 코드를 작성하는 것을 배웠어요:

```js
# 덜 나쁜 코드

@app.get(
    '/dogs', 
    response_model=List[Dog],
    name='모든 개 가져오기'
)
def all_dogs() -> List[Dog]:
    return get_all_dogs()

@app.get(
    '/dogs/{id}',
    response_model=DogWithMoreInfo,
    name='아이디로 한 마리 개 가져오기'
)
def one_dog(id: int) -> Dog:
    return get_dog(id)
```

^ 여기서 type 어노테이션을 사용하고 app.get() 내부의 response_model 키워드 인수를 사용하여 각 엔드포인트의 입력과 출력이 무엇이어야 하는지 훨씬 명확하게 만들었습니다.

<div class="content-ad"></div>

# 7) 모델 간의 관계

우리에게는 사람과 개가 있고, 한 사람이 여러 마리의 개를 소유할 수 있다고 가정해 봅시다.

모델 간의 관계를 사용하기 전에, 다음은 우리의 Dog 모델이 어떻게 보일지에 대한 예시입니다:

```js
// dog
{
    "name": "rocky",
    "age": 3,
    "owner_id": 1
}
```

<div class="content-ad"></div>

기술적으로 우리는 이렇게 작성할 수 있어요:

```js
// dog
{
    "name": "rocky",
    "age": 3,
    "owner_id": 1,
    "owner": {
        "name": "tom",
        "age": 30,
        "job": "teacher"
    }
}
```

하지만 특히 수백 개의 API 엔드포인트를 다루고 있다면 이것이 지루할 수 있어요.

대신, SQLModels 관계를 사용하여 우리의 삶을 더 쉽게 만들 수 있어요:

<div class="content-ad"></div>

```js
# 매우 간단한 예시

class Human(HumanBase, table=True):
    __tablename__ = 'humans'

    dogs: list["Dog"] = Relationship(back_populates='owner')

class Dog(DogBase, table=True):
    __tablename__ = 'dogs'

    owner: Human = Relationship(back_populates='dogs')
```

우리 엔드포인트 코드에서 response_model을 Dog로 설정하면 자동으로 Human 정보도 가져올 수 있습니다:

```js
{
    "name": "rocky",
    "age": 3,
    "owner_id": 1,
    "owner": {
        "name": "tom",
        "age": 30,
        "job": "teacher"
    }
}
```

그리고 데이터베이스 내의 다른 중요한 관계들도 함께 가져옵니다.


<div class="content-ad"></div>

# 8) 접근 제어 및 어떤 API에 누가 접근할 수 있는지

학교 코드에서 기억하는 것은 모든 엔드포인트가 공개적이었다는 것입니다. 우리는 단지 엔드포인트의 입력과 출력이 올바른지에만 주의를 기울렸고, 다른 것들에는 그다지 신경을 쓰지 않았습니다.

그러나 모든 것이 공개적으로 되어 있다는 것은 좋지 않은 실천 방법입니다.

프로덕션 급 코드에서는 다음과 같은 시스템이 필요합니다:

<div class="content-ad"></div>

- API 호출을 하는 사용자 식별
- 해당 사용자가 호출할 수 있는 API 엔드포인트 결정

한 걸음 더 나아가면, 서로 다른 사용자가 볼 수 있는 결과를 제어할 수도 있습니다. 예를 들어:

- 관리자는 모든 것을 볼 수 있음
- 비관리자는 자신의 이름이 포함된 항목만 볼 수 있음

이를 구현하는 하나의 올바른 방법이 없으므로 시간을 들여 신중하게 생각해보시기 바랍니다.

<div class="content-ad"></div>

# 9) 로깅

프로덕션급 FastAPI 코드에서는 아마도 독립형 스크립트를 제외하고는 print()를 사용하지 않습니다.

대신 로거를 사용합니다. 로깅의 몇 가지 장점:

- 정보를 캡처하는 방법이 팀 전체에서 표준화됨
- 여러 로깅 기능이 이미 구현되어 있어 그냥 사용하기만 하면 됨
- 다양한 로깅 레벨은 애플리케이션을 실행할 때 얼마나 많은 출력을 원하는지 결정하는 데 매우 유용함

<div class="content-ad"></div>

파이썬 백엔드/풀스택 개발자가 되고 싶다면, 로깅 라이브러리에 대해 배우거나 적어도 어느 정도는 알아야 합니다. 기억하세요 — 프로덕션급 코드에서는 print()를 많이 사용하지 않아요.

# 10) 예외 처리

여러 해 전에 예외를 처리했던 방법은 다음과 같습니다 (나쁜 방법):

```js
try:
    # 내 코드
except Exception as e:
    print(e)
```



<div class="content-ad"></div>

프로덕션 수준의 FastAPI 코드베이스에서는 일반적으로 다음을 갖춥니다:

- 상당수의 사용자 정의 예외
- 이러한 사용자 정의 예외를 저장하기 위한 별도의 폴더
- 정확히 어떤 예외를 잡고자 하는지 지정하는 보다 복잡한 예외 처리문
- 단순히 print(e)를 출력하는 것 이상의 작업을 수행하는 예외 및 마지막 문에서 더 복잡한 코드

예를 들어:

```python
try:
    # 어떤 코드

except CustomException1 as e:
    # 특별 처리 코드
    
    logger.info(str(e))

except CustomException2 as e:
    # 한 번 다시 시도하는 코드

    logger.info(str(e))

except CustomException3 as e:
    # 이 예외를 기반으로 다른 예외 발생

    raise CustomException4() from e

except Exception as e:
    logger.info(str(e))
```

<div class="content-ad"></div>

프로덕션 수준의 FastAPI 앱에서는 단순히 Exception as e로 모든 예외를 처리할 수 없습니다.

# 11) 단위 테스트 및 기타 테스트

학교 프로젝트에서는 테스트를 작성할 필요가 없었습니다. 주로 프레젠테이션 이후에는 코드를 더 이상 사용하지 않기 때문입니다.

그러나 프로덕션 수준의 코드베이스에서는 단위 테스트뿐만 아니라 통합 테스트 등이 필수적입니다.

<div class="content-ad"></div>

- 수십 개의 엔드포인트를 테스트해야 한다면 일종의 자동화된 테스트를 도입할 필요가 있어요.
- 모든 사람이 테스트를 수작업으로 모든 것을 테스트하면 만족스럽지 않을 거예요.

단위 테스트를 작성하는 것이 지루할 수 있지만, 나는 대규모 코드 베이스에서는 필수적이라는 것을 깨달았어요.

테스트에 익숙하지 않다면 pytest 학습을 시도해 볼 수 있어요.

# 12) 데이터의 업데이트 이력 추적

<div class="content-ad"></div>

사용자가 데이터를 생성/업데이트/삭제할 때마다 이를 이상적으로는 어떤 종류의 히스토리 테이블에 기록해야 합니다.

예를 들어, 사용자가 PUT 엔드포인트 중 하나를 사용하여 그의 개의 색상을 노란색으로 업데이트하고 이를 데이터베이스에 저장했다고 가정해보겠습니다.

히스토리 테이블 내에서 이 작업을 추적하기 위해 다음과 같이 보일 수 있습니다.

- 우리의 주요 개 데이터가 포함된 dogs 테이블이 있다고 가정해봅시다.
- dogs 테이블에 있는 각 개에 대해 수행된 모든 변경 사항이 포함된 dog_history 테이블이 있습니다.

<div class="content-ad"></div>

아래는 예시 워크플로우입니다:

- 사용자 A가 자신의 강아지 색상을 노란색으로 업데이트합니다 (강아지 ID=100).
- 우리는 강아지 테이블을 보통대로 업데이트합니다.
- 그런 다음 강아지 이력 테이블에 새 항목을 삽입합니다.
- 새 항목에는 1) 사용자 2) 타임스탬프 3) 변경된 필드 4) 이전 값 5) 새 값이 포함됩니다.
- 예를 들어, "사용자 A가 (ID가 100인 강아지)의 색상을 초록에서 노란색으로 변경했습니다."

```js
{
    user=A, 
    dog_id=100, 
    field_changed='color', 
    old_value='green', 
    new_value='yellow',
    timestamp=178787878787
}
```

^ 이와 같이 사용자의 업데이트 작업을 추적할 수 있습니다.

<div class="content-ad"></div>

# 13) 데이터베이스 변경 추적

대규모 프로덕션급 앱에서는 데이터 모델에 변경 사항이 있을 수 있습니다. 이를 데이터베이스에서 (테이블 수정이 필요한 경우) 변경할 필요가 있을 수 있습니다.

- 일부 테이블에 열 추가가 필요할 수 있습니다.
- 완전히 새로운 테이블을 추가해야 할 수도 있습니다.

프로덕션급 앱에서는 데이터베이스를 직접 변경하지 않습니다. 여러 이유로 이는 최악의 실천 방법입니다.

<div class="content-ad"></div>

- 변경 사항은 되돌릴 수 없습니다 — 누군가 변경을 실수하면 되돌릴 수 없어요
- 변경 사항은 추적할 수 없습니다 — 누군가 변경을 실수하면 누가 그것을 했는지 알 수 없어요

보통, 팀 내 모든 사람들이 데이터베이스에 가하는 모든 변경 사항을 포함하는 전통적인 dbchanges 폴더가 있습니다

- 이 dbchanges 폴더에는 보통 여러 폴더가 포함되어 있습니다.
- 각 폴더에는 일부 .xml 파일과 .sql 파일이 들어 있습니다. 이것들을 각각 changeset이라고 합니다.
- 우리가 changeset을 실행하면 그 안에 있는 변경 사항이 데이터베이스에 적용됩니다.
- 만약 changeset이 실수라면 데이터베이스가 손상되지 않도록 롤백을 수행할 수 있습니다.

# 결론

<div class="content-ad"></div>

이해하기 쉽고 명확했기를 바랍니다.

# 만약 나를 창작자로 지원하고 싶다면

- 내 책을 구매해 주세요! — 파이썬에 대해 알지 못했던 101가지
- 어디에서 찾을 수 있는지: https://payhip.com/b/vywcf
- 해당 이야기에 50번의 박수를 쳐 주세요
- 당신의 생각을 말해 주는 댓글을 남겨주세요
- 이야기 중 가장 마음에 드는 부분을 강조해 주세요

감사합니다! 이 작은 행동들은 큰 도움이 되며 정말 감사드립니다!

<div class="content-ad"></div>

YouTube: [https://www.youtube.com/@zlliu246](https://www.youtube.com/@zlliu246)  

LinkedIn: [https://www.linkedin.com/in/zlliu/](https://www.linkedin.com/in/zlliu/)  