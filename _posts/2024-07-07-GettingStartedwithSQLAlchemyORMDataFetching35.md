---
title: "SQLAlchemy ORM 시작하기  데이터 가져오기 버전 35"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-GettingStartedwithSQLAlchemyORMDataFetching35_0.png"
date: 2024-07-07 21:46
ogImage:
  url: /assets/img/2024-07-07-GettingStartedwithSQLAlchemyORMDataFetching35_0.png
tag: Tech
originalTitle: "Getting Started with SQLAlchemy ORM — Data Fetching (3 5)"
link: "https://medium.com/@tomas-svojanovsky/getting-started-with-sqlalchemy-orm-data-fetching-3-5-a968414fd871"
---

![이미지](/TIL/assets/img/2024-07-07-GettingStartedwithSQLAlchemyORMDataFetching35_0.png)

ORM에서 Core와 동일하게 많은 것들이 작동합니다. 한 가지 다른 점은 연결 실행 방법 대신 세션을 사용한다는 것입니다.

## ID로 가져오기

만약 ID로 사용자를 가져오고 싶다면, 두 가지 옵션이 있습니다. session.query와 session.get을 사용할 수 있습니다.

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

세션에서 get 메서드를 직접 사용할 수 있으며, Todo 클래스와 기본 키를 전달해야 합니다.

```python
from sqlalchemy import create_engine, Column, Integer, Text
from sqlalchemy.orm import Session, DeclarativeBase

class Base(DeclarativeBase):
    pass

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True)
    label = Column(Text, nullable=False)
    status = Column(Text, nullable=False)

# Base.metadata.drop_all(engine)
# Base.metadata.create_all(engine)

todos = [
    Todo(label="Walk a dog", status="doing"),
    Todo(label="Shopping", status="in_progress"),
]

with Session(engine) as session:
    # session.add_all(todos)
    # session.commit()

    result = (
        session.get(Todo, 1)
    )

    print(result.id, result.label, result.status)  # 1 Walk a dog doing
```

기본 키를 사용하지 않거나 다른 열에서 검색하려는 경우 where 메서드를 사용할 수 있습니다. 이 경우에는 예를 들어서...
