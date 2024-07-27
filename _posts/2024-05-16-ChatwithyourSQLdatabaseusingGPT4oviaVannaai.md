---
title: "SQL 데이터베이스와 대화하는 방법 Vannaai를 통해 GPT-4o를 활용하세요"
description: ""
coverImage: "/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_0.png"
date: 2024-05-16 16:31
ogImage: 
  url: /assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_0.png
tag: Tech
originalTitle: "Chat with your SQL database using GPT 4o via Vanna.ai"
link: "https://medium.com/@arslanshahid-1997/chat-with-your-sql-database-using-gpt-4o-via-vanna-ai-b87e3296f8dc"
---


## OpenAI GPT 4o를 활용한 텍스트-SQL 파이프라인 만들기

![image](/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_0.png)

OpenAI가 최신 주력 모델인 GPT 4o를 공개했습니다. 이 고급 모델은 멀티모달 기능을 갖추고 있어 이미지, 텍스트, 비디오 입력을 처리하여 어떠한 이전 모델보다 뛰어난 답변을 생성할 수 있습니다. 이 게시물은 GPT 4o와 Vanna AI를 사용하여 데이터베이스와 대화할 수 있는 텍스트-SQL 파이프라인을 구축하는 방법을 강조합니다.

![image](/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_1.png)

<div class="content-ad"></div>

<img src="/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_2.png" />

# 시작하기

```js
from vanna.openai import OpenAI_Chat
from vanna.vannadb import VannaDB_VectorStore

class MyVanna(VannaDB_VectorStore, OpenAI_Chat):
    def __init__(self, config=None):
        MY_VANNA_MODEL = # https://vanna.ai/account/profile에서 모델 이름을 가져와주세요
        VannaDB_VectorStore.__init__(self, vanna_model=MY_VANNA_MODEL, vanna_api_key=MY_VANNA_API_KEY, config=config)
        OpenAI_Chat.__init__(self, config=config)

# OpenAI api_key를 추가해주세요
vn = MyVanna(config={'api_key': 'sk-...', 'model': 'gpt-4o'})
```

# 데이터베이스 연결하기

<div class="content-ad"></div>

바나에는 내장된 커넥터로 다음 8가지 데이터베이스에 연결할 수 있어요 (다른 데이터베이스에 연결하려면 몇 줄의 추가 코드가 필요해요):

- Postgres SQL
- Oracle
- DuckDB
- MySQL
- SQLite
- Big Query
- Snowflake
- Microsoft SQL

문서를 참고하면 특정 데이터베이스에 연결하는 방법을 알 수 있어요. 이 글에서는 DuckDB StackOverflow 데이터베이스에 연결할 거에요. 데이터베이스는 여기에 있어요!

```js
#덕DB 데이터베이스에 연결하는 방법이에요
vn.connect_to_duckdb(url='motherduck:[<database_name>]?motherduck_token=<token>&saas_mode=true')
```

<div class="content-ad"></div>

# 훈련

![이미지1](/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_3.png)

![이미지2](/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_4.png)

![이미지3](/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_5.png)

<div class="content-ad"></div>

# Plan (Information Schema)에 대한 훈련

```js
# 정보 스키마 쿼리는 데이터베이스에 따라 조정이 필요할 수 있습니다. 이것은 좋은 시작점입니다.
df_information_schema = vn.run_sql("SELECT * FROM INFORMATION_SCHEMA.COLUMNS")
```

```js
# 정보 스키마를 LLM에서 참조할 수 있도록 작은 조각으로 나눕니다.
plan = vn.get_training_plan_generic(df_information_schema)
plan
```

```js
# 계획이 마음에 들면 주석 처리하고 실행하여 훈련을 시작하세요.
vn.train(plan=plan)
```

<div class="content-ad"></div>

# DDL 훈련

```js
# duckDB에서 describe 문은 모든 테이블에 대한 DDL을 가져올 수 있습니다
vn.train(ddl="DESCRIBE SELECT * FROM Stackoverflow.users;")
```

# SQL 문장에 대한 훈련

```js
# SQL 문장에 대한 훈련 예시입니다
vn.train(
question="가장 많은 배지를 가진 상위 10명의 사용자는 누구인가요?"
,sql="""SELECT UserId, COUNT(*) AS badge_count
FROM stackoverflow.main.badges
GROUP BY UserId
ORDER BY badge_count DESC
LIMIT 10
""")
# 다른 예시
vn.train(
question="가장 많은 답변을 한 사용자와 가장 적은 질문을 한 사용자 간의 총 답변 차이는 얼마인가요?", 
,sql="SELECT MAX(answer_count) - MIN(answer_count) AS difference
FROM (
    SELECT OwnerUserId, COUNT(*) AS answer_count
    FROM stackoverflow.main.posts
    WHERE PostTypeId = 2
    GROUP BY OwnerUserId
) AS answer_counts;
")
```

<div class="content-ad"></div>

# 문서화를 통한 훈련

```js
# 문서화를 통해 맥락 정보를 제공할 수 있습니다.
vn.train(documentation="해당 연도 가장 많은 답변을 낸 사용자를 대 마스터라고 부릅니다")
```

훈련 데이터를 확인하려면 vn.get_training_data()를 사용하실 수 있습니다.

```js
# vn.ask는 다음 함수들을 순차적으로 실행하며, 각각 개별적으로 실행될 수 있습니다.
# 1. vn.generate_ql
# 2. vn.run_sql
# 3. vn.generate_plotly_code
# 4. vn.get_plotly_figure
```

<div class="content-ad"></div>

```js
# Vanna 훈련 후 질문을하는 방법입니다
vn.ask('뱃지 수가 가장 많은 상위 10 명의 사용자를 찾아주세요?')
```

![이미지](/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_6.png)

![이미지](/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_7.png)

# Flask 앱 사용하기
  

<div class="content-ad"></div>

Vanna는 내장 UI Flask 앱이 함께 제공됩니다. 주피터 노트북이나 Python 스크립트 내에서 실행할 수 있습니다.

```js
from vanna.flask import VannaFlaskApp
app = VannaFlaskApp(vn)
app.run()
```

<img src="/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_8.png" />

이렇게 GPT 4o를 텍스트에서 SQL로 사용할 수 있습니다.

<div class="content-ad"></div>

# 성능 비교

GPT 4o와 이와 같은 클래스의 다른 모델들 사이의 비교 결과를 아래에서 확인할 수 있습니다. GPT 4o는 ChatGPT 4 turbo의 59%와 Claude Opus의 56%에 비해 최고 수준인 61%의 정확도로 성능을 발휘합니다.

![image](/assets/img/2024-05-16-ChatwithyourSQLdatabaseusingGPT4oviaVannaai_9.png)

읽어주셔서 감사합니다!