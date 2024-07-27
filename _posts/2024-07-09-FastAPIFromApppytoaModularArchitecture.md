---
title: "FastAPI Apppy에서 모듈러 아키텍처로 전환하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-FastAPIFromApppytoaModularArchitecture_0.png"
date: 2024-07-09 20:24
ogImage:
  url: /assets/img/2024-07-09-FastAPIFromApppytoaModularArchitecture_0.png
tag: Tech
originalTitle: "FastAPI: From App.py to a Modular Architecture"
link: "https://medium.com/towardsdev/fastapi-from-app-py-to-a-modular-architecture-54ca9e0044eb"
---

<img src="/TIL/assets/img/2024-07-09-FastAPIFromApppytoaModularArchitecture_0.png" />

패스트API를 사용하여 백엔드를 구축할 때, 일반적으로 하나의 app.py 파일로 시작하는 것이 흔합니다. 이 접근 방식은 작은 프로젝트에 적합하지만, 응용 프로그램이 성장함에 따라 유지 보수와 확장이 어려워집니다.

이 블로그 포스트에서는 Routers, Controllers, Services 및 Repositories로 구성된 구조화된 아키텍처를 사용하여 FastAPI 애플리케이션을 모놀리식 app.py 파일에서 리팩토링하는 방법을 살펴보겠습니다.

## 소개: 우리의 할 일 API

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

리팩터링 프로세스에 뛰어들기 전에 함께 작업할 API를 살펴보겠습니다. 다음과 같은 엔드포인트를 가진 간단한 할 일 애플리케이션을 구축 중입니다.

![API Image](/TIL/assets/img/2024-07-09-FastAPIFromApppytoaModularArchitecture_1.png)

이러한 API를 통해 사용자는 할 일 항목에 대한 CRUD(Create, Read, Update, Delete) 작업을 수행할 수 있습니다. 각 할 일 항목은 다음과 같은 속성을 가지게 될 것입니다.

이제 작업 중인 API를 이해했으므로 몇 가지 전제 조건 및 이를 구현하는 방법을 살펴보겠습니다.

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

## 준비 사항

처음 접근과 리팩토링을 시작하기 전에 FastAPI 프로젝트를 설정해 봅시다.

```js
python3 -m venv venv
source env/bin/activate  # Windows에서는 `env\Scripts\activate
```

```js
fastapi;
uvicorn;
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

```bash
pip3 install -r requirements.txt
```

## 초기 접근 방식: 모든 것을 app.py에서 처리

간단한 Todo API를 시작해봅시다. 이 API는 루트 레벨의 app.py에서 완전히 구현되어 있습니다.

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# 새로운 todo를 생성하기 위한 Pydantic 모델
class TodoCreate(BaseModel):
    title: str

# todo 항목을 위한 Pydantic 모델. TodoCreate를 상속받고 id 및 completed 필드를 추가합니다.
class Todo(TodoCreate):
    id: int
    completed: bool = False

# 데이터베이스를 모방한 todos의 인메모리 저장소
todos = []

# 새로운 todo를 생성하는 엔드포인트
@app.post("/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    # id를 증가시킨 새로운 todo 항목을 생성합니다.
    new_todo = Todo(id=len(todos) + 1, **todo.model_dump())
    todos.append(new_todo)  # 새로운 todo를 목록에 추가합니다.
    return new_todo  # 생성된 todo를 응답으로 반환합니다.

# 모든 todo를 가져오는 엔드포인트
@app.get("/todos", response_model=list[Todo])
def get_todos():
    return todos  # todo 목록을 응답으로 반환합니다.

# 특정 id의 todo를 가져오는 엔드포인트
@app.get("/todos/{todo_id}", response_model=Todo)
def get_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo  # 찾은 경우 해당 todo를 반환합니다.
    # 해당 todo를 찾을 수 없는 경우 404 상태 코드와 메시지를 포함한 HTTPException을 발생시킵니다.
    raise HTTPException(status_code=404, detail="Todo가 없습니다")

# id에 따라 todo를 업데이트하는 엔드포인트
@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, updated_todo: TodoCreate):
    for todo in todos:
        if todo.id == todo_id:
            todo.title = updated_todo.title  # todo의 제목을 업데이트합니다.
            return todo  # 업데이트된 todo를 반환합니다.
    # 해당 todo를 찾을 수 없는 경우 404 상태 코드와 메시지를 포함한 HTTPException을 발생시킵니다.
    raise HTTPException(status_code=404, detail="Todo가 없습니다")

# id에 따라 todo를 삭제하는 엔드포인트
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            del todos[index]  # 목록에서 todo를 삭제합니다.
            return {"message": "Todo가 성공적으로 삭제되었습니다"}  # 성공 메시지를 반환합니다.
    # 해당 todo를 찾을 수 없는 경우 404 상태 코드와 메시지를 포함한 HTTPException을 발생시킵니다.
    raise HTTPException(status_code=404, detail="Todo가 없습니다")

# Uvicorn 서버를 사용하여 애플리케이션을 실행하는 주요 블록
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", port=3000, host="0.0.0.0", reload=True)
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

API를 시작하려면 python3 app.py 명령어를 사용해요

음...

이 방법은 작은 애플리케이션에는 작동하지만 몇 가지 단점이 있어요:

- 모든 라우팅, 비즈니스 로직 및 데이터 저장소가 단일 파일에 혼합되어 있어요.
- 애플리케이션이 성장함에 따라 유지 및 확장하기 어려워져요.
- 개별 구성 요소를 테스트하는 것이 어려워져요.
- 코드의 재사용성이 제한되어요

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

![FastAPIFromApppytoaModularArchitecture](/TIL/assets/img/2024-07-09-FastAPIFromApppytoaModularArchitecture_2.png)

Refactoring journey starts now...

## Routers Introduction

To structure our application effectively, the first step is to introduce routers.

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

새로운 폴더를 만들어 routers라는 이름을 붙이고 todo_router.py라는 파일을 추가해주세요.

```python
from fastapi import APIRouter

router = APIRouter()

@router.post("/todos")
def create_todo():
    pass

@router.get("/todos")
def get_todos():
    pass

@router.get("/todos/{todo_id}")
def get_todo(todo_id: int):
    pass

@router.put("/todos/{todo_id}")
def update_todo(todo_id: int):
    pass

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    pass
```

이제 app.py를 업데이트하여 라우터를 사용하세요.

```python
from fastapi import FastAPI
from routers import todo_router

app = FastAPI()

app.include_router(todo_router.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", port=3000, host="0.0.0.0", reload=True)
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

라우터를 도입함으로써 작업 관련 라우트를 메인 app.py 파일에서 분리하여 코드를 더 깔끔하고 집중적으로 유지하였습니다.

## 컨트롤러 추가

다음으로, 요청 처리 로직을 처리하기 위한 컨트롤러를 도입할 예정입니다.

controllers라는 새 디렉토리를 생성하고 todo_controller.py라는 파일을 추가하세요.

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
from fastapi import HTTPException
from pydantic import BaseModel

class TodoCreate(BaseModel):
    title: str

class Todo(TodoCreate):
    id: int
    completed: bool = False

class TodoController:
    def __init__(self):
        self.todos = []

    def create_todo(self, todo: TodoCreate):
        new_todo = Todo(id=len(self.todos) + 1, **todo.model_dump())
        self.todos.append(new_todo)
        return new_todo

    def get_todos(self):
        return self.todos

    def get_todo(self, todo_id: int):
        for todo in self.todos:
            if todo.id == todo_id:
                return todo
        raise HTTPException(status_code=404, detail="Todo를 찾을 수 없습니다.")

    def update_todo(self, todo_id: int, updated_todo: TodoCreate):
        for todo in self.todos:
            if todo.id == todo_id:
                todo.title = updated_todo.title
                return todo
        raise HTTPException(status_code=404, detail="Todo를 찾을 수 없습니다.")

    def delete_todo(self, todo_id: int):
        for index, todo in enumerate(self.todos):
            if todo.id == todo_id:
                del self.todos[index]
                return {"message": "Todo가 성공적으로 삭제되었습니다."}
        raise HTTPException(status_code=404, detail="Todo를 찾을 수 없습니다.")
```

todo_router.py 파일을 업데이트하여 컨트롤러를 사용하십시오.

```js
from fastapi import APIRouter
from controllers.todo_controller import TodoController, TodoCreate, Todo

router = APIRouter()
todo_controller = TodoController()

@router.post("/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    return todo_controller.create_todo(todo)

@router.get("/todos", response_model=list[Todo])
def get_todos():
    return todo_controller.get_todos()

@router.get("/todos/{todo_id}", response_model=Todo)
def get_todo(todo_id: int):
    return todo_controller.get_todo(todo_id)

@router.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, updated_todo: TodoCreate):
    return todo_controller.update_todo(todo_id, updated_todo)

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    return todo_controller.delete_todo(todo_id)
```

## 서비스 레이어 구현

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

이제 비즈니스 로직을 처리하는 서비스 레이어를 소개해 봅시다.

services 라는 새 디렉토리를 만들고 todo_service.py 라는 파일을 추가해 주세요.

```js
from pydantic import BaseModel

class TodoCreate(BaseModel):
    title: str

class Todo(TodoCreate):
    id: int
    completed: bool = False

class TodoService:
    def __init__(self):
        self.todos = []

    def create_todo(self, todo: TodoCreate) -> Todo:
        new_todo = Todo(id=len(self.todos) + 1, **todo.model_dump())
        self.todos.append(new_todo)
        return new_todo

    def get_todos(self) -> list[Todo]:
        return self.todos

    def get_todo(self, todo_id: int) -> Todo | None:
        for todo in self.todos:
            if todo.id == todo_id:
                return todo
        return None

    def update_todo(self, todo_id: int, updated_todo: TodoCreate) -> Todo | None:
        for todo in self.todos:
            if todo.id == todo_id:
                todo.title = updated_todo.title
                return todo
        return None

    def delete_todo(self, todo_id: int) -> bool:
        for index, todo in enumerate(self.todos):
            if todo.id == todo_id:
                del self.todos[index]
                return True
        return False
```

todo_controller.py를 업데이트하여 서비스를 사용하도록합니다.

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
from fastapi import HTTPException
from services.todo_service import TodoService, TodoCreate, Todo

class TodoController:
    def __init__(self):
        self.todo_service = TodoService()

    def create_todo(self, todo: TodoCreate):
        return self.todo_service.create_todo(todo)

    def get_todos(self):
        return self.todo_service.get_todos()

    def get_todo(self, todo_id: int):
        todo = self.todo_service.get_todo(todo_id)
        if todo is None:
            raise HTTPException(status_code=404, detail="할 일을 찾을 수 없습니다")
        return todo

    def update_todo(self, todo_id: int, updated_todo: TodoCreate):
        todo = self.todo_service.update_todo(todo_id, updated_todo)
        if todo is None:
            raise HTTPException(status_code=404, detail="할 일을 찾을 수 없습니다")
        return todo

    def delete_todo(self, todo_id: int):
        if self.todo_service.delete_todo(todo_id):
            return {"message": "할 일이 성공적으로 삭제되었습니다"}
        raise HTTPException(status_code=404, detail="할 일을 찾을 수 없습니다")
```

## 레포지터리 레이어 생성

마지막으로 데이터 지속성을 처리하는 레포지터리 레이어를 소개합니다.

repositories라는 새 디렉토리를 만들고 todo_repository.py라는 파일을 추가하세요.

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
from pydantic import BaseModel

class TodoCreate(BaseModel):
    title: str

class Todo(TodoCreate):
    id: int
    completed: bool = False

class TodoRepository:
    def __init__(self):
        self.todos = []

    def create_todo(self, todo: TodoCreate) -> Todo:
        new_todo = Todo(id=len(self.todos) + 1, **todo.model_dump())
        self.todos.append(new_todo)
        return new_todo

    def get_todos(self) -> list[Todo]:
        return self.todos

    def get_todo(self, todo_id: int) -> Todo | None:
        for todo in self.todos:
            if todo.id == todo_id:
                return todo
        return None

    def update_todo(self, todo_id: int, updated_todo: TodoCreate) -> Todo | None:
        for todo in self.todos:
            if todo.id == todo_id:
                todo.title = updated_todo.title
                return todo
        return None

    def delete_todo(self, todo_id: int) -> bool:
        for index, todo in enumerate(self.todos):
            if todo.id == todo_id:
                del self.todos[index]
                return True
        return False
```

Update `todo_service.py` to use the repository,

```python
from repositories.todo_repository import TodoRepository, TodoCreate, Todo

class TodoService:
    def __init__(self):
        self.todo_repository = TodoRepository()

    def create_todo(self, todo: TodoCreate) -> Todo:
        return self.todo_repository.create_todo(todo)

    def get_todos(self) -> list[Todo]:
        return self.todo_repository.get_todos()

    def get_todo(self, todo_id: int) -> Todo | None:
        return self.todo_repository.get_todo(todo_id)

    def update_todo(self, todo_id: int, updated_todo: TodoCreate) -> Todo | None:
        return self.todo_repository.update_todo(todo_id, updated_todo)

    def delete_todo(self, todo_id: int) -> bool:
        return self.todo_repository.delete_todo(todo_id)
```

우리의 리팩터링 여정은 여기서 끝납니다…

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

파이썬 앱.py에서 구조화된 모듈 아키텍처로 이어지는 이 여정에서, 우리는 Todo API를 더 확장 가능하고 유지 관리 가능한 애플리케이션으로 변형시켰습니다. 라우터, 컨트롤러, 서비스 및 리포지토리를 도입함으로써, 우리는 관심사의 명확한 분리와 프로젝트 확장에 따른 복잡성 관리 능력을 향상시켰습니다.

## 모듈식 아키텍처의 주요 이점:

- 향상된 유지 보수성: 각 컴포넌트 - 라우터, 컨트롤러, 서비스 및 리포지토리 -는 이제 특정 책임을 처리하여 변경 시 의도치 않은 부작용의 위험을 줄입니다.
- 향상된 테스트 용이성: 각 레이어가 명확하게 구분되어 유닛 테스트가 보다 간편해집니다. 우리는 각 컴포넌트를 독립적으로 테스트하여 응용 프로그램 전체에서 견고함과 신뢰성을 보장할 수 있습니다.
- 확장성과 유연성: 모듈식 디자인은 확장을 용이하게 합니다. 새로운 기능을 추가하거나 기존 기능을 수정할 때 전체 코드베이스를 철저히 재작업하지 않고도 수행할 수 있습니다. 이 유연성은 데이터베이스 전환이나 비즈니스 로직 업데이트와 같은 작업에도 연결됩니다.

우리의 리포지토리는 이제 다음과 같이 보입니다...

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

`<img src="/TIL/assets/img/2024-07-09-FastAPIFromApppytoaModularArchitecture_3.png" />`

FastAPI 애플리케이션을 모듈식 아키텍처로 리팩토링함으로써, 지속적인 성장과 유연성을 위한 견고한 기반을 마련했습니다. 이 접근 방식은 현재 개발 노력을 향상시킬 뿐만 아니라 앞으로의 도전과 기회에 대비하는 데 도움이 됩니다.

안녕히 가세요!!
