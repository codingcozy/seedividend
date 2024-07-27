---
title: "FastAPI에서 Pydantic 직렬화 단계별 가이드"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-PydanticserializationstepbystepsforFastAPI_0.png"
date: 2024-07-07 12:56
ogImage:
  url: /assets/img/2024-07-07-PydanticserializationstepbystepsforFastAPI_0.png
tag: Tech
originalTitle: "Pydantic serialization step by steps for FastAPI"
link: "https://medium.com/@gayashangamage/pydantic-serialization-step-by-steps-for-fastapi-f51ee20d4f10"
---

![이미지](/TIL/assets/img/2024-07-07-PydanticserializationstepbystepsforFastAPI_0.png)

FastAPI 프레임워크를 사용하여 API를 구축하려면 pydantic에 대해 알아야 합니다. 'post' 요청은 본문 매개변수만 허용하기 때문입니다. 본문 매개변수를 읽으려면 pydantic 모델을 구현해야 합니다.

그러나 문제는 이 pydantic 모델의 데이터를 사용할 때, 원본 pydantic보다 쉬운 데이터 유형(파이썬 사전 또는 JSON일 수 있음)으로 변환해야 한다는 것입니다. 이 데이터 유형으로 작업하는 것이 원본 pydantic보다 쉽기 때문입니다.

이 프로세스를 직렬화라고 합니다. 이름에서 알 수 있듯, 이 문제에 대해 심각하게 생각할 필요가 없습니다. 이 주제에 대해 알아야 할 모든 것을 단순화할 것입니다.

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

FastAPI에서 데이터를 반환할 때 pydantic 모델과 정확히 동일한 데이터를 반환하고 싶다면 직렬화 방법을 사용할 필요가 없습니다. FastAPI가 이를 자동으로 처리하기 때문입니다. 그러나 pydantic 데이터 출력을 사용자 정의하려면 (적어도 새 필드를 추가하거나 기존 필드를 제거하는) pydantic에서 어떤 종류의 직렬화 방법을 사용하는 것이 좋습니다. model_dump(), dict() 및 model_dump_json()과 같은 방법이 있습니다.

먼저 어떻게 무조건적으로 pydantic 모델과 동일한 데이터를 반환하는지 알아보겠습니다.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
class University(BaseModel):
    name : str
    place : str
@app.post('/create')
async def addUniversity(university : University):
    # 업무 로직을 수행한 후
    # pydantic 모델 그대로 반환합니다
    return university
```

그리고 위의 pydantic 모델을 수정하여 (다른 필드를 추가하는 간단한 예) 직렬화 방법을 사용하지 않고 반환하는 방법을 살펴보겠습니다. 이것은 어려운 주제가 아닙니다. 그저 새로운 사전을 만들고 출력으로 반환하는 것뿐입니다.

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
from pydantic import BaseModel

app = FastAPI()
class University(BaseModel):
    name : str
    place : str
@app.post('/create')
async def addUniversity(university : University):
    newUniversity = {
        'name' : university.name,
        'place' : university.place,
        'contactNum' : +1234678
    }
    return newUniversity
```

만약 직렬화(serialization)에 대해 익숙하지 않다면, 위와 같은 방법으로 해야 한다고 생각할 수 있습니다. 하지만 이제 직렬화 메서드를 적용하는 방법을 살펴본 후, 우리의 작업을 더 쉽게 할 수 있는 방법을 알아보겠습니다.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
class University(BaseModel):
    name : str
    place : str
@app.post('/create')
async def addUniversity(university : University):
    # 새로운 대학 변수를 정의하고 직렬화된 데이터를 할당합니다.
    newUniversity = university.model_dump()
    # 새 데이터 추가
    newUniversity['contactNum'] = 12345678
    # 값을 반환합니다.
    return newUniversity
```

따라서 직렬화를 사용할 수 있는 유용한 방법 중 하나를 보여드렸습니다. 이 주제에 대해 더 자세히 알아보고 싶다면, 직렬화에 대해 알아야 할 모든 것을 간단하게 설명해드리겠습니다.
pydantic에는 세 가지 주요 기본 직렬화 메서드가 있습니다.

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

## model_dump( )

이 함수는 Pydantic 모델을 사전으로 변환하는 데 사용됩니다. 사전으로 변환한 후에는 아래와 같이 출력을 사용자 지정하는 여러 옵션이 있습니다.

```js
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()
class University(BaseModel):
    name : str
    place : str = Field(alias='location place')
    rank : int
    specialize : int = Field(default=1)
@app.post('/create')
async def addUniversity(university : University):
    newUniversity = university.model_dump(exclude='rank', include=['name', 'place', 'specialize'], mode='python', by_alias=True, exclude_defaults=True)
    # 비즈니스 로직 구현
    # 데이터베이스에 저장
    # 결과 반환
    return newUniversity
```

코드 설명
addUniversity()가 데이터베이스에 새로운 대학을 추가하는 엔드포인트로 상상해 봅시다. 사용자가 프론트엔드에서 데이터를 제출하면 이 API 엔드포인트는 데이터를 받아서 Pydantic 모델에 전달합니다. addUniversity() 함수 내에서 University 데이터 모델을 model_bump() 메서드를 사용하여 직렬화하는 새로운 변수 newUniversity를 선언합니다. 여기에서 우리는 Pydantic 모델의 출력을 원하는 대로 사용자 정의할 수 있습니다.

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

"exclude": 이 옵션을 사용하여 Pydantic 모델에서 가져온 필드를 제거할 수 있습니다.

"include": 여기서 함수 내에서 계산에 필요한 필드를 지정할 수 있습니다.

"by_alias": Pydantic 모델의 각 필드에 대한 대체 이름을 이미 정의했다면, by_alias는 사용 여부에 대한 옵션을 제공합니다.

"exclude_default": Pydantic 모델의 특정 필드에 대한 기본값을 정의했기 때문에, 기본값과 같은 값을 가진 필드를 제외하려면 이 옵션을 사용할 수 있습니다. 이 옵션은 그 목적을 위해 사용됩니다.

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

만약 다른 옵션들을 더 탐색하고 싶다면, `API documentation` Pydantic 문서 `Base model` `model_dump` 를 확인해보세요.

## dict()

여기서 제공하는 것 또한 `model_dump()` 메서드와 비슷합니다. 왜냐하면 이 역시 파이썬 딕셔너리를 반환하기 때문입니다. 하지만 다른 점은 customize our pydantic model을 위해 사용할 수 있는 몇 가지 옵션이 있다는 것입니다.

## model_dump_json()

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

만약 JSON 출력 또는 직렬화 출력을 JSON 형식으로 받고 싶다면 `model_dump_json()`을 사용하세요. `model_dump` 메서드에서 사용 가능한 모든 옵션들을 여기에도 사용할 수 있습니다.

# 다른 직렬화 옵션들은 무엇이 있을까요

## @field_serializer

예를 들어 Pydantic 모델에서 특정 필드를 커스텀하고자 할 때, 함수나 엔드포인트로 Pydantic 모델 데이터를 가져오기 전에 그 필드를 수정하고 싶을 수 있습니다. 다시 말해 Pydantic 모델을 호출한 후 일부 필드를 수정해 해당 데이터를 함수나 엔드포인트로 반환하고자 하는 경우가 있을 수 있습니다. 이런 경우 `@field_serializer`를 사용해야합니다.

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
from pydantic import BaseModel, field_serializer

app = FastAPI()
class University(BaseModel):
    name: str
    place: str
    rank: str
    specialize: int

    @field_serializer('rank', when_used='always')
    def rank_serialize(rank: str):
        rank = 'world rank - ' + rank
        return rank

@app.post('/create')
async def addUniversity(university: University):
    return university
```

**코드 설명**

University pydantic 모델은 name, place, specialize와 함께 rank와 같은 여러 필드를 허용합니다. 이 모델에 데이터를 전달할 때 rank 필드의 값은 문자열입니다. 그러나 이 코드 외부에서 데이터를 전달할 때 rank의 값으로 숫자만 받습니다. "01", "02"와 같은 링크를 사용하지만 이 pydantic 모델 외부에서 데이터를 전달할 때 rank의 값을 "world rank - 01"과 같이 바꾸고 싶습니다. 간단히 말해 출력은 다음과 같아야 합니다.

```python
{
  "name": "string",
  "place": "string",
  "rank": "world rank - 01",
  "specialize": 0
}
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

js
{
"name": "string",
"place": "string",
"rank": "01",
"specialize": 0
}

단일 필드만 직렬화하려면 Pydantic 모델 내에서 새로운 함수를 선언해야 합니다. 이 함수에는 '@field_serializer' 데코레이터를 사용해야 합니다. 하지만 먼저 해당 데코레이터를 Pydantic 모델에서 import해야 합니다. 여러 매개변수를 받을 수 있지만, 여기서는 두 가지만 언급합니다. 첫 번째는 어떤 필드를 직렬화할지를 나타내는 것입니다. 여기서는 'rank' 필드를 사용했습니다. 두 번째는 'when_use'입니다. 이곳에서 언제 이 필드 직렬화기를 사용할지 알려주어야 합니다. 이 예시에서는 'always'를 사용합니다.

그런 다음 해당 함수 내에서 원하는 작업을 수행하고, 마지막으로 반환하면 됩니다. 그게 전부입니다. 간단하지요?

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

## @model_serializer

이 메서드에서는 엔드포인트나 함수로 반환하기 전에 원하는대로 pydantic 모델을 직렬화할 수 있습니다. 이는 field_serializer와 매우 유사합니다. 더 잘 이해하기 위해 예제를 살펴봅시다.

```js
from fastapi import FastAPI
from pydantic import BaseModel, model_serializer

app = FastAPI()
class University(BaseModel):
    name : str
    place : str
    @model_serializer()
    def rank_serialize(self):
        return {
        'name' : 'the ' + self.name,
        'place' : self.place + ', sri lanka'
        }
@app.post('/create')
async def addUniversity(university : University):
    return university
```

이렇게 출력을 얻고 싶습니다.

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
  "name": "콜롬보 대학",
  "place": "스리랑카 콜롬보"
}
```

대신에 모델 시리얼라이저를 사용해보세요.

```js
{
  "name": "콜롬보 대학",
  "place": "콜롬보"
}
```

첫 번째로 해야 할 일은 pydantic 모델에서 model_serializer를 import하는 것입니다. 그런 다음 모델 내부에서 '@model_serializer' 데코레이터가 달린 함수를 선언하고 원하는 방식으로 출력을 구성하십시오. 마지막으로 반환하십시오. 더 자세한 내용은 pydantic 문서 `API Documentation`의 `Functional serializer` 섹션을 참조하십시오.

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

그냥 간단하게 Pydantic에서 serializer를 사용하는 방법이야. 더 자세한 내용을 원한다면 문서를 확인하고 이해를 돕기 위해 뭔가를 구현해보세요...

코딩 즐겁게 하시고 또 다른 FastAPI 주제에서 만나요...
