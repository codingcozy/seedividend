---
title: "FastAPI에서 Celery와 RabbitMQ 사용 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-UsingCeleryRabbitMQWithFastAPI_0.png"
date: 2024-07-09 19:19
ogImage:
  url: /assets/img/2024-07-09-UsingCeleryRabbitMQWithFastAPI_0.png
tag: Tech
originalTitle: "Using Celery + RabbitMQ With FastAPI"
link: "https://medium.com/stackademic/using-celery-rabbitmq-with-fastapi-2e6f0236841e"
---

![표](/TIL/assets/img/2024-07-09-UsingCeleryRabbitMQWithFastAPI_0.png)

안녕하세요, 우주 여러분! 오늘은 Celery + RabbitMQ와 FastAPI를 사용한 최근 경험을 공유하려고 합니다. 최근에 오디오 분석 관련 프로젝트를 하고 있었어요. 이 프로젝트에서 일부 작업은 완료하는 데 조금 시간이 걸렸어요. 따라서 클라이언트가 서버에 요청을 보내면 이러한 작업 때문에 서버가 잠시 바쁠 거예요. 그래서 클라이언트 요청에 대한 응답을 보내는 데 상당한 시간이 소요되었죠. 이 상황을 방지하기 위해 백그라운드에서 작업을 실행하는 방법을 찾았어요. 결국 해결책인 Celery — 분산 작업 큐를 찾았고, 이 글에서는 어떻게 Celery를 사용해 목표를 이루었는지 설명할 거예요.

Celery는 실시간 처리를 지원하는 작업 큐이며 작업 스케줄링도 지원해요. 간단히 말해, 서버가 시간이 오래 걸리는 작업에 대한 요청을 받으면 해당 작업을 Celery 작업 큐에 추가하고 백그라운드에서 실행될 거예요. Celery는 작업의 상태를 유지하는데, 대기 중인지, 시작된 상태인지, 성공적인지 등을 확인할 수 있어요. Celery에는 메시지 브로커 서비스가 필요해요. 서버(주 어플리케이션)가 작업을 위해 요청을 받으면, celery 워커가 이용 가능할 때까지 작업은 작업 큐에 있어야 해요. 워커가 사용 가능하면 메시지 큐에서 작업을 실행할 거예요. RabbitMQ는 celery의 기본 메시지 브로커인데, Redis, Amazon SQS, Apache Kafka와 같은 다른 솔루션이 있어요. 저는 이를 가장 간단하게 하고자 RabbitMQ를 사용했어요. 이 애니메이션 동영상에서 이 작업이 어떻게 이루어지는지 설명합니다.

# 구현

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

먼저 RabbitMQ를 설정해 봅시다. 프로젝트를 개발하는 환경은 Windows를 사용하고 있어요. RabbitMQ를 설정하기 위해서 Docker 이미지를 사용하고 있어요. 원하신다면 Docker 대신에 RabbitMQ를 설치할 수도 있어요.

```js
docker run -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

Docker 컨테이너가 시작되면, 브라우저를 통해 127.0.0.1:5672로 RabbitMQ 대시보드에 로그인할 수 있어요. 사용자 이름과 비밀번호는 모두 'guest'에요.

<img src="/TIL/assets/img/2024-07-09-UsingCeleryRabbitMQWithFastAPI_1.png" />

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

이제 Celery를 설치하고 설정해 봅시다. 다음 라이브러리를 설치하세요. 저는 python-dotenv 라이브러리를 사용하여 .env 파일에서 보안 정보를 관리합니다.

```js
pip install celery python-dotenv
```

내 FastAPI 프로젝트는 이와 유사한 폴더 구조를 가지고 있어요.

```js
app/
├── config/
│   ├── __init__.py
│   └── celery_config.py
├── tasks/
│   ├── __init__.py
│   └── celery_tasks.py
├── __init__.py
├── main.py
├── .env
└── requirements.txt
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

먼저, .env 파일에서 환경 변수를 만들어봅시다. Celery에는 두 가지가 필요합니다. 첫 번째는 메시지 브로커 URL입니다. 제 경우에는 RabbitMQ 서버 URL입니다. (`USERNAME`, `PASSWORD`를 교체하여 사용자명과 비밀번호를 입력해주세요. 기본값은 guest입니다.) 두 번째는 결과 백엔드입니다. Celery가 작업 실행 결과를 저장하는 곳으로, 작업을 완료한 후에 이 결과를 검색할 수 있습니다.

```js
CELERY_BROKER_URL=amqp://<USERNAME>:<PASSWORD>@localhost:5672//
CELERY_RESULT_BACKEND=rpc://
```

좋아요. 이제 Celery 앱을 생성하고 구성해봅시다. 이를 위해 celery_config.py 파일을 만들겠습니다.

```js
# celery_config.py
# 별도의 파일에서 celery 작업을 정의하기 위한 구성.
import os
from celery import Celery
from dotenv import load_dotenv

load_dotenv() # 환경 변수를 불러오기 위한 코드

celery_app = Celery(__name__, broker=os.getenv("CELERY_BROKER_URL"), backend=os.getenv("CELERY_RESULT_BACKEND"))

celery_app.conf.update(
    imports=['app.tasks.celery_tasks'], # celery 작업 파일 경로
    broker_connection_retry_on_startup=True,
    task_track_started=True
)
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

분리된 파일을 만들어 Celery 작업을 정의했어요. 하지만 그건 꼭 필요하지 않아요. 이 파일 안에 작업들을 정의할 수 있어요. 만약 이 파일 안에 작업을 정의한다면, imports=['app.tasks.celery_tasks'] 라인을 추가할 필요가 없어요. 따라서, 당신의 구성은 이런 식이에요.

```js
# celery_config.py
# 이 파일 안에 Celery 작업을 정의하기 위한 구성.
import os
from celery import Celery
from dotenv import load_dotenv

load_dotenv() # 환경 변수 로드

celery_app = Celery(__name__, broker=os.getenv("CELERY_BROKER_URL"), backend=os.getenv("CELERY_RESULT_BACKEND"))

celery_app.conf.update(
    broker_connection_retry_on_startup=True,
    task_track_started=True
)
```

이제 Celery 작업을 만들어봐요. celery_tasks.py 파일을 만들고 그 안에 작업들을 정의했어요. Celery 작업을 정의하기 위해 데코레이터를 사용해요.

```js
# celery_tasks.py
import asyncio
from app.config.celery_config import celery_app


@celery_app.task
def my_task(x, y):
    ans = x + y
    print(ans)
    return ans


async def my_async_task(x, y):
    await asyncio.sleep(3)
    ans = x + y
    print(ans)
    return ans


@celery_app.task
def my_second_task(x, y):
    result = asyncio.run(my_async_task(x, y))
    return result
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

별도의 파일 대신 이러한 방식으로 구성 파일 내에서 작업을 정의할 수 있어요.

```python
# celery_config.py
# 이 파일 안에서 Celery 작업을 정의하는 설정입니다.
import os
import asyncio
from celery import Celery
from dotenv import load_dotenv

load_dotenv() # 환경 변수를 불러오기

celery_app = Celery(__name__, broker=os.getenv("CELERY_BROKER_URL"), backend=os.getenv("CELERY_RESULT_BACKEND"))

celery_app.conf.update(
    broker_connection_retry_on_startup=True,
    task_track_started=True
)

@celery_app.task
def my_task(x, y):
   ans = x + y
   print(ans)
   return ans

async def my_async_task(x, y):
   await asyncio.sleep(3)
   ans = x + y
   print(ans)
   return ans

@celery_app.task
def my_second_task(x, y):
   result = asyncio.run(my_async_task(x, y))
   return result
```

이제 라우트 핸들러에서 이러한 작업을 사용할 수 있어요. 아래는 예시 라우트 핸들러입니다. 여기서 GET 엔드포인트를 만들었어요. 이 엔드포인트 핸들러 내부에서 Celery 작업을 사용해요.

```python
from fastapi import FastAPI

from app.tasks.celery_tasks import my_task

app = FastAPI()

@app.get("/run")
def handle_run():
   task_response = my_task.delay(5, 6)
   return {"message": "작업 실행이 시작됐어요!"}

if __name__ == '__main__':
    uvicorn.run(app, port=8080)
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

알겠어요. 코딩 부분은 끝났습니다. 이제 세럴리 워커를 실행해봅시다. 이 세럴리 워커는 RabbitMQ의 메시지 대기열에 있는 작업을 실행할 것입니다. 만약 RabbitMQ 서버를 시작하지 않았다면, 세럴리 워커를 시작하기 전에 RabbitMQ를 시작해주세요.

```js
celery --app app.config.celery_config.celery_app worker --loglevel=info --pool=solo
```

만약 세럴리가 어떠한 오류 없이 실행된다면, 터미널에서 다음과 유사한 출력을 확인할 수 있습니다.

<img src="/TIL/assets/img/2024-07-09-UsingCeleryRabbitMQWithFastAPI_2.png" />

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

위 이미지에서 [작업] 섹션 아래에서 celery_tasks.py 파일에 정의한 celery 작업을 볼 수 있습니다. 작업 대기열이 새 작업을 받으면 celery가 해당 작업을 실행합니다. 이제 FastAPI 서버를 실행해 봅시다.

```js
uvicorn app.main:app --port 8000
```

Swagger 문서 페이지에서 엔드포인트를 시도해 봅시다. 엔드포인트에 요청을 보낸 후 celery 터미널을 확인하면 다음과 같은 출력을 볼 수 있습니다.

<img src="/TIL/assets/img/2024-07-09-UsingCeleryRabbitMQWithFastAPI_3.png" />

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

작업을 받았고, 작업을 실행하기 시작했습니다. 그리고 실행이 완료된 후에는 작업이 성공했다고 합니다. 이는 우리의 작업이 FastAPI 서버에 의해 실행되는 것이 아닌 celery 워커에 의해 실행된다는 것을 의미합니다.

## 작업 모니터링

Celery 작업과 워커를 모니터링하기 위해 Flower를 사용할 수 있습니다. Flower를 설치해보겠습니다.

```js
pip install flower
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

로컬 머신에서 flower를 실행하세요.

```js
celery flower --app app.config.celery_config.celery_app --broker:amqp://localhost//
```

웹 브라우저에서 flower 모니터링 도구를 확인할 수 있습니다. http://localhost:5555/ 으로 이동하세요.

![Flower Monitoring Tool](/TIL/assets/img/2024-07-09-UsingCeleryRabbitMQWithFastAPI_4.png)

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

요즘 FastAPI 프로젝트에서 Celery + RabbitMQ를 사용하는 방법을 소개했어. 여기서 어떤 일이 벌어지는지 이해할 수 있을 거야. 이건 이 작업을 수행하는 가장 간단한 방법이야. 나는 기본 작업 대기열을 사용했어. 원한다면 더 많은 작업 대기열을 생성할 수도 있어. 그리고 더 많은 구성 가능한 사항들도 있어. 그들의 설명서를 확인해봐. 작업 완료 상태를 클라이언트에게 알리기 위해 WebSocket을 사용할 수도 있어. 이게 전부야. 다음 블로그에서 만나자. 즐거운 코딩이 되길!

# Stackademic 🎓

끝까지 읽어주셔서 감사해요. 떠나시기 전에 이런 점 유의해주세요:

- 박수를 치고 작가를 팔로우해주시면 감사하겠어요! 👏
- 저희를 팔로우해주세요 X | LinkedIn | YouTube | Discord
- 다른 플랫폼도 방문해보세요: In Plain English | CoFeed | Differ
- Stackademic.com에서 더 많은 콘텐츠를 만나보세요
