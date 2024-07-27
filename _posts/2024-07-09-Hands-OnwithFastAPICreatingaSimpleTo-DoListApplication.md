---
title: "FastAPI 실습 간단한 할 일 목록 애플리케이션 만들기 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-Hands-OnwithFastAPICreatingaSimpleTo-DoListApplication_0.png"
date: 2024-07-09 09:18
ogImage:
  url: /assets/img/2024-07-09-Hands-OnwithFastAPICreatingaSimpleTo-DoListApplication_0.png
tag: Tech
originalTitle: "Hands-On with FastAPI: Creating a Simple To-Do List Application"
link: "https://medium.com/@ahmedfry34/hands-on-with-fastapi-creating-a-simple-to-do-list-application-478159a6959e"
---

# 먼저, FastAPI에 대한 간결한 소개부터 시작해보겠습니다.

FastAPI는 Python으로 API를 구축하기 위한 현대적인 웹 프레임워크입니다. Sebastián Ramírez가 만들었으며, 빠르고 사용하기 쉽며 기능이 풍부하여 인기를 얻고 있습니다.

FastAPI는 여러 이유로 눈에 띕니다:

- 속도: 사용 가능한 Python 프레임워크 중 가장 빠릅니다.
- 사용 편의성: Python의 타입 힌트 덕분에 코드 작성이 직관적이고 명확합니다.
- 대화형 문서: Swagger UI 및 ReDoc와 같은 도구를 사용하여 대화형 API 문서를 자동으로 생성합니다.

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

FastAPI은 웹 부분에 Starlette(Starlette은 Python에서 비동기 웹 서비스를 구축하기에 이상적인 가벼운 ASGI 프레임워크/도구)를 기반으로 하고 데이터 유효성 검증을 위해 Pydantic을 사용하여 빠르고 신뢰성이 높습니다.

이 글에서는 FastAPI가 인기 있는 이유, 주요 특징, 그리고 직접 API를 구축하기 위해 FastAPI를 시작하는 방법을 살펴보겠습니다. 경험 많은 개발자든 API 개발에 처음 도전하는 개발자든 FastAPI를 사용하면 효율적이고 확장 가능한 웹 애플리케이션을 손쉽게 만들 수 있습니다.

# Flask와 Django와 비교한 FastAPI의 핵심 기능 및 이점

Flask와 Django와 비교했을 때, FastAPI는 다음과 같은 특징으로 두각을 나타냅니다:

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

- 성능 우수성: FastAPI는 Starlette과 Pydantic을 활용하여 빠른 속도에서 Node.js와 Go와 경쟁하며 효율적인 성능을 제공합니다.
- 사용 편의성 및 개발 속도: FastAPI의 간단한 구문과 자동 문서화(Swagger UI, ReDoc)는 개발을 가속화시켜 오류를 줄입니다.
- 데이터 유효성 검사 및 보안: 통합된 Pydantic은 견고한 데이터 유효성을 보장하여 API 신뢰성을 향상시킵니다. FastAPI는 인증 및 권한 부여를 위한 내장 도구로 보안을 간소화합니다.
- 비동기 지원 및 확장성: 비동기 프로그래밍에 대한 일류 지원은 병렬 요청 처리를 가능하게 하며 높은 수요 애플리케이션의 확장성에 중요합니다.

FastAPI는 이러한 분야에서 뛰어나므로 Python 기반 API 프레임워크에서 속도, 확장성 및 개발의 편의성을 필요로 하는 개발자에게 플라스크와 장고 대비 매력적인 선택지입니다.

# FastAPI로 시작하기

FastAPI로 시작하는 것은 간단하며 몇 가지 주요 단계를 거치면 됩니다:

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

- 설치:

- FastAPI를 pip를 사용하여 설치하세요:

```js
pip install fastapi
```

2- 개발 서버 실행:

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

- 빠른 ASGI 서버 인 Uvicorn을 사용하여 FastAPI 애플리케이션을 실행하세요:

```js
uvicorn your_module_name:app --reload
```

- your_module_name을 FastAPI 앱이 정의된 Python 파일로 바꿔주세요.
- --reload 옵션을 사용하여 자동으로 다시로드되도록 설정할 수 있습니다. 코드에 변경 사항이 감지되면 서버가 자동으로 재시작되어 개발이 더 빠르고 편리해집니다.

3- 첫 번째 FastAPI 애플리케이션 만들기:

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

- Python 파일(main.py)에 FastAPI 애플리케이션을 정의하세요:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

- 이 예제에서 @app.get("/")은 루트 URL("/")에서 GET 요청에 응답하는 라우트를 정의합니다.

![이미지](/TIL/assets/img/2024-07-09-Hands-OnwithFastAPICreatingaSimpleTo-DoListApplication_0.png)

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

4- 대화식 API 문서 탐색:

- FastAPI는 자동으로 대화식 API 문서를 생성합니다. 브라우저에서 http://localhost:8000/docs 에 방문하여 Swagger UI를 탐색해보세요.

![FastAPI Swagger UI](/TIL/assets/img/2024-07-09-Hands-OnwithFastAPICreatingaSimpleTo-DoListApplication_1.png)

- 또는, http://localhost:8000/redoc 에 방문하여 ReDoc 문서를 확인할 수도 있습니다.

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

![image](/TIL/assets/img/2024-07-09-Hands-OnwithFastAPICreatingaSimpleTo-DoListApplication_2.png)

5- Expand Your Application:

- Build upon your basic application by adding more routes, handling query parameters, path parameters, request bodies, and integrating with databases or other services.

# Real-World Use Case: Simple To-Do List API

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

간단한 To-Do 리스트 API를 만들면 FastAPI의 핵심 기능과 이점을 이해하는 데 훌륭한 방법입니다. 이 API를 사용하면 사용자가 할 일 항목을 추가, 보기, 업데이트 및 삭제하는 기본 작업을 수행하여 작업을 관리할 수 있습니다.

1- 모델 정의:

FastAPI에서 Pydantic을 사용하여 모델을 정의하면 API 요청 및 응답의 데이터 구조를 유효성 검사할 수 있습니다. 다음은 간단한 To-Do 리스트 API의 모델을 정의하는 방법에 대한 코드입니다:

```js
# Pydantic 및 typing 모듈에서 필요한 구성 요소 가져오기
from pydantic import BaseModel
from typing import List

# 단일 TodoItem을 위한 Pydantic 모델 정의
class TodoItem(BaseModel):
    id: int  # TodoItem의 정수 ID
    title: str  # 예상되는 문자열인 TodoItem의 제목
    description: str  # 예상되는 문자열인 TodoItem의 설명
    completed: bool = False  # TodoItem이 완료되었는지를 나타내는 부울 플래그, 기본값은 False

# TodoList를 나타내는 또 다른 Pydantic 모델 정의
class TodoList(BaseModel):
    todos: List[TodoItem] = []  # 기본적으로 비어 있도록 초기화된 TodoItem 객체 목록
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

이 모델을 정의하는 것은 API가 처리하는 데이터를 일관되게 유지하고 유효성을 검증하여 FastAPI 애플리케이션에서 데이터 관리와 오류 처리를 간소화합니다.

루트 구현:

FastAPI에서 루트는 API의 엔드포인트를 정의하고 들어오는 요청을 처리하는 방법을 지정합니다. 루트를 구현하는 것은 간단한 할 일 목록 API를 구축하는 중요한 단계입니다.

```python
from fastapi import FastAPI, HTTPException
from typing import Optional

# FastAPI 인스턴스 생성
app = FastAPI()
# 할 일 항목을 임시 보관하는 (인메모리 리스트)
todos = []
# 모든 할 일 항목을 검색하는 엔드포인트
@app.get("/todos/", response_model=TodoList)
async def read_todos():
    return {"todos": todos}

# 새 할 일 항목 생성하는 엔드포인트
@app.post("/todos/")
async def create_todo(title: str, description: str):
    # 고유 ID 생성 (실제 애플리케이션에서는 데이터베이스 또는 UUID 사용을 고려)
    todo = {"id": len(todos) + 1, "title": title, "description": description, "completed": False}
    todos.append(todo)
    return todo

# 특정 할 일 항목 업데이트하는 엔드포인트
@app.put("/todos/{todo_id}/", response_model=TodoItem)
async def update_todo(todo_id: int, title: Optional[str] = None, description: Optional[str] = None):
    for todo in todos:
        if todo["id"] == todo_id:
            todo["title"] = title if title else todo["title"]
            todo["description"] = description if description else todo["description"]
            return todo
    raise HTTPException(status_code=404, detail="할 일을 찾을 수 없습니다")

# 특정 할 일 항목 삭제하는 엔드포인트
@app.delete("/todos/{todo_id}/")
async def delete_todo(todo_id: int):
    for idx, todo in enumerate(todos):
        if todo["id"] == todo_id:
            del todos[idx]
            return {"message": "할 일이 삭제되었습니다"}
    raise HTTPException(status_code=404, detail="할 일을 찾을 수 없습니다")
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

# 설명:

- GET 라우트 (/todos/): 모든 할 일 항목을 검색하여 리스트 형식으로 반환합니다.

![이미지](/TIL/assets/img/2024-07-09-Hands-OnwithFastAPICreatingaSimpleTo-DoListApplication_3.png)

- POST 라우트 (/todos/): 고유한 ID, 제목 및 설명을 갖는 새로운 할 일 항목을 만들고 목록에 추가합니다.

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

![image](/TIL/assets/img/2024-07-09-Hands-OnwithFastAPICreatingaSimpleTo-DoListApplication_4.png)

- PUT Route (/todos/'todo_id'/): 기존에 있는 ID로 식별된 to-do 항목을 업데이트합니다. 부분적 업데이트가 가능합니다 (제목 또는 설명만 업데이트할 수 있음).

![image](/TIL/assets/img/2024-07-09-Hands-OnwithFastAPICreatingaSimpleTo-DoListApplication_5.png)

- DELETE Route (/todos/'todo_id'/): 목록에서 ID로 식별된 to-do 항목을 삭제합니다.

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

<img src="/TIL/assets/img/2024-07-09-Hands-OnwithFastAPICreatingaSimpleTo-DoListApplication_6.png" />

이러한 경로들은 클라이언트가 할 일 항목에 대해 모든 CRUD 작업(생성, 읽기, 업데이트, 삭제)을 수행할 수 있도록 합니다. 이를 통해 FastAPI가 다양한 유형의 HTTP 요청과 응답을 처리하는 방법을 보여줍니다.

# 결론

FastAPI를 사용하여 간단한 할 일 목록 API를 작성하면 강력한 기능과 이점에 대해 실용적으로 소개 받을 수 있습니다. 모델 정의, 경로 구현, CRUD 작업 처리 단계를 따르면 FastAPI의 사용 편의성, 성능 및 자동 문서화 기능에 대한 실전 경험을 얻을 수 있습니다.

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

FastAPI의 직관적인 디자인과 강력한 기능으로 초심자든 숙련된 개발자든 모두 현대적이고 고성능의 웹 API를 만드는데 우수한 선택이 될 것입니다. 이 연습을 통해 FastAPI의 핵심 개념을 이해하는데 도움을 받을 뿐만 아니라 미래에 더 복잡하고 확장 가능한 애플리케이션을 구축하는 기술도 갖추게 될 것입니다.

FastAPI를 활용하여 빠르고 효율적으로 API를 개발할 수 있어, 애플리케이션이 강력하면서 유지보수가 쉬운 것을 보장할 수 있습니다. 즐거운 코딩되세요!
