---
title: " 초고속 Python Docker 빌드 Poetry 사용 방법 "
description: ""
coverImage: "/assets/img/2024-07-07-BlazingfastPythonDockerbuildswithPoetry_0.png"
date: 2024-07-07 23:39
ogImage:
  url: /assets/img/2024-07-07-BlazingfastPythonDockerbuildswithPoetry_0.png
tag: Tech
originalTitle: "Blazing fast Python Docker builds with Poetry 🏃"
link: "https://medium.com/@albertazzir/blazing-fast-python-docker-builds-with-poetry-a78a66f5aed0"
isUpdated: true
---

## 천천히 번거로운 Docker 빌드를 순조롭게 작업으로 바꾸는 법

![Blazing fast Python Docker builds with Poetry](/assets/img/2024-07-07-BlazingfastPythonDockerbuildswithPoetry_0.png)

프로젝트의 Docker 이미지를 구축하는 것은 일반적으로 재현 가능하고 결정론적인 방식으로 종속성을 설치하는 작업을 포함합니다. Python 커뮤니티에서 Poetry는 이를 달성하기 위한 가장 인정받는 도구 중 하나입니다. 그러나 Docker 빌드에서 Poetry를 비최적적으로 사용하면 성능 저하와 오랜 빌드 시간으로 인해 개발자 생산성이 저하될 수 있습니다.

본 문서는 이미 Poetry와 Docker, 특히 Docker 레이어 캐싱이 작동하는 방식 등에 대해 이미 알고 있다고 가정하며 빌드를 최적화하는 방법을 찾고 있는 독자들을 위해 구성되었습니다. 순진한 해결책부터 더 최적화된 솔루션으로 구성하여 각 최적화의 영향을 독자에게 이해시킬 수 있도록 구성했습니다. 소개는 여기까지, 이제 몇 가지 Docker 파일을 살펴보겠습니다! 💪

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 0. 프로젝트 구조

여행에 대해 이야기할 때 재미있는 장난감 프로젝트를 사용해봅시다. 그 이름을 우연히 발굴한 안나푸르나 산으로 지었습니다 ⛰ 간단한 Poetry 프로젝트는 pyproject.toml, 관련된 poetry.lock, 코드 및 Dockerfile이 포함될 것입니다.

.
├── Dockerfile
├── README.md
├── annapurna
│ ├── **init**.py
│ └── main.py
├── poetry.lock
└── pyproject.toml

간단한 예제로, 항상 사용하는 몇 가지 linters와 함께 유명한 fastapi 웹 서버를 poetry add fastapi로 설치했습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```json
{
  "tool.poetry": {
    "name": "annapurna",
    "version": "1.0.0",
    "description": "",
    "authors": ["Riccardo Albertazzi <my@email.com>"],
    "readme": "README.md"
  },
  "tool.poetry.dependencies": {
    "python": "^3.11",
    "fastapi": "^0.95.1"
  },
  "tool.poetry.group.dev.dependencies": {
    "black": "^23.3.0",
    "mypy": "^1.2.0",
    "ruff": "^0.0.263"
  },
  "build-system": {
    "requires": ["poetry-core"],
    "build-backend": "poetry.core.masonry.api"
  }
}
```

## 1. The naive approach 😐

Docker 빌드가 해야 할 일은 Python과 Poetry를 설치하고, 코드를 가져오고, 의존성을 설치하고, 프로젝트의 진입점을 설정하는 것입니다. 이것이 바로 여기서 하는 일입니다:

```json
FROM python:3.11-buster

RUN pip install poetry

COPY . .

RUN poetry install

ENTRYPOINT ["poetry", "run", "python", "-m", "annapurna.main"]
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 간단한 Dockerfile은 업무를 처리하며, 간단한 docker build . 명령어를 실행하면 이미 작동하는 이미지를 얻을 수 있습니다. 이것은 실제로 자습서와 오픈 소스 프로젝트에서 보는 일반적인 Dockerfile입니다. 이해하기 쉽기 때문에 그렇습니다. 그러나 프로젝트가 성장하면 지루한 빌드와 거대한 Docker 이미지로 이끌게 될 것입니다 - 내 결과 Docker 이미지는 사실 1.1GB입니다! 보여줄 최적화는 캐시를 활용하고 최종 이미지 크기를 줄이는 방향으로 이루어집니다.

# 2. 워밍 업 🚶

워밍업을 위한 몇 가지 개선 사항부터 시작해 봅시다:

- poetry 버전을 고정시키세요. Poetry는 작은 버전 간에 파괴적인 변화를 포함할 수 있으며, 새 버전이 출시될 때 빌드가 갑자기 실패하길 원치 않을 것입니다. 로컬에서 사용 중인 동일한 버전으로 명확히 고정시키는 것이 좋습니다.
- 필요한 데이터만을 COPY하세요. 다른 것은 제외하세요. 예를 들어, 로컬 가상 환경( .venv 에 위치함)을 불필요하게 복사하는 것을 피할 수 있습니다. README.md가 없으면 Poetry가 경고를 일으킬 수 있습니다(저는 이 선택을 실제로 공유하지 않습니다) 따라서 빈 파일을 만듭니다. 로컬 파일을 복사할 수도 있었지만, 이렇게 함으로써 수정할 때마다 Docker 레이어 캐싱을 방지할 수 있습니다.
- poetry install --without dev을 사용하여 개발 종속성을 설치하지 마세요. 본 제품 환경에서는 린터 및 테스트 스위트가 필요하지 않으므로 이러한 개발용 의존성을 설치할 필요가 없습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
FROM python:3.11-buster

RUN pip install poetry==1.4.2

WORKDIR /app

COPY pyproject.toml poetry.lock ./
COPY annapurna ./annapurna
RUN touch README.md

RUN poetry install --without dev

ENTRYPOINT ["poetry", "run", "python", "-m", "annapurna.main"]
```

우리는 이미 1.1GB에서 959MB로 용량을 줄였어요. 큰 차이는 아니지만 성실한 노력이예요.

# 3. Poetry 캐시 정리 🧹

기본적으로 Poetry는 다운로드한 패키지를 캐시해 놓아 나중에 재설치할 때 사용합니다. 우리는 도커 빌드 과정에서 이를 신경 쓰지 않아도 되기 때문에 중복 저장소를 제거할 수 있어요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Poetry는 --no-cache 옵션을 지원하며, 왜 나는 사용하지 않을까? 나중에 이에 대해 알아보겠다 ;)
- 캐시 폴더를 제거할 때는 이 작업이 동일한 RUN 명령어에서 이루어졌는지 확인하십시오. 별도의 RUN 명령어에서 작업을 수행하면 캐시는 여전히 이전 Docker 레이어 (poetry install을 포함하는 레이어)의 일부가 됩니다. 그 결과, 최적화가 무용지물로 될 수 있습니다.

이 과정에서 내 빌드의 결정론을 더 강화하기 위해 몇 가지 Poetry 환경 변수를 설정하고 있습니다. 가장 논란이 되는 것 중 하나는 POETRY_VIRTUALENVS_CREATE=1입니다. 왜 가상 환경을 Docker 컨테이너 내부에 만들고 싶어할까요? 솔직히 이 플래그를 비활성화하는 대신 이 솔루션을 선호하는 편입니다. 왜냐하면 이렇게 하면 내 환경이 최대한 격리되고, 무엇보다도 설치가 시스템 Python이나 더 나아가 Poetry 자체와 엉키지 않도록 해줍니다.

FROM python:3.11-buster

RUN pip install poetry==1.4.2

ENV POETRY_NO_INTERACTION=1 \
 POETRY_VIRTUALENVS_IN_PROJECT=1 \
 POETRY_VIRTUALENVS_CREATE=1 \
 POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /app

COPY pyproject.toml poetry.lock ./
COPY annapurna ./annapurna
RUN touch README.md

RUN poetry install --without dev && rm -rf $POETRY_CACHE_DIR

ENTRYPOINT ["poetry", "run", "python", "-m", "annapurna.main"]

# 4. 코드를 복사하기 전에 의존성 설치하기 👏

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

지금까지는 잘 진행되고 있지만, 우리의 Docker 빌드는 여전히 매우 고통스러운 부분이 있습니다: 코드를 수정할 때마다 의존성을 다시 설치해야 합니다! 이는 Poetry가 프로젝트를 설치할 때 필요한 코드를 COPY하기 때문입니다. Docker 레이어 캐싱 방식으로 인해 COPY 레이어가 무효화되면 연이어 빌드를 다시 진행해야 합니다. 프로젝트가 커질수록 한 줄의 코드만 변경하더라도 매우 지루해지고 빌드 시간이 길어질 수 있습니다.

해결책은 Poetry에 가상 환경을 구축하는 데 필요한 최소한의 정보를 제공하고 이후에 코드베이스를 COPY하는 것입니다. 현재 프로젝트를 가상 환경에 설치하지 않도록 하는 --no-root 옵션을 사용하여 이를 달성할 수 있습니다.

```python
FROM python:3.11-buster

RUN pip install poetry==1.4.2

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN touch README.md

RUN poetry install --without dev --no-root && rm -rf $POETRY_CACHE_DIR

COPY annapurna ./annapurna

RUN poetry install --without dev

ENTRYPOINT ["poetry", "run", "python", "-m", "annapurna.main"]
```

이제 응용 프로그램 코드를 수정해보세요. 마지막 3개 레이어만 다시 계산되는 것을 알 수 있을 겁니다. 빌드가 빠르게 완료되었죠! 🚀

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 가상 환경에 프로젝트를 설치하기 위해 추가적인 RUN poetry install --without dev 명령어가 필요합니다. 이는 예를 들어 사용자 정의 스크립트를 설치할 때 유용할 수 있습니다. 당신의 프로젝트에 따라 이 단계가 필요하지 않을 수도 있습니다. 어쨌든, 프로젝트 의존성이 이미 설치되어 있기 때문에 이 레이어 실행은 매우 빠를 것입니다.

# 5. Docker 다중 스테이지 빌드 사용하기 🏃‍♀

지금까지 빌드 속도는 빠르지만 여전히 큰 Docker 이미지가 만들어집니다. 우리는 다중 스테이지 빌드를 도입함으로써 이 문제를 해결할 수 있습니다. 최적화는 다음과 같은 올바른 베이스 이미지를 사용하여 달성됩니다:

- Python buster는 개발 의존성이 포함된 큰 이미지로, 가상 환경을 설치하는 데 사용할 것입니다.
- Python slim-buster는 Python을 실행하는 데 필요한 최소한의 의존성만 포함된 작은 이미지로, 우리의 어플리케이션을 실행하는 데 사용할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

다단계 빌드를 통해 한 단계에서 다른 단계로 정보를 전달할 수 있습니다. 특히 가상 환경이 구축되는 부분입니다. 주목해야 할 점은 다음과 같습니다:

- 런타임 단계에서는 Poetry가 아예 설치되어 있지 않습니다. 실제로 빌드된 가상 환경에서 Python 애플리케이션을 실행하는 데는 Poetry가 필요하지 않습니다. Python이 올바른 가상 환경을 인식할 수 있게 환경 변수(예: VIRTUAL_ENV 변수)를 조정하면 됩니다.
- 저의 장난감 프로젝트에는 필요 없어서 두 번째 설치 단계(RUN poetry install --without dev)를 간소화했습니다. 그럼에도 불구하고 런타임 이미지에 이 단계를 추가할 수 있습니다: RUN pip install poetry && poetry install --without dev && pip uninstall poetry.

Dockerfile이 더 복잡해지면 Docker CLI에 연결된 새로운 빌드 백엔드인 Buildkit을 사용하는 것도 제안드립니다. 빠르고 안전한 빌드를 찾고 있다면 그것이 지금 사용해야 할 도구입니다.

```js
DOCKER_BUILDKIT=1 docker build --target=runtime .
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 빌드 이미지, 가상 환경 구축에 사용됩니다

FROM python:3.11-buster as builder

RUN pip install poetry==1.4.2

ENV POETRY_NO_INTERACTION=1 \
 POETRY_VIRTUALENVS_IN_PROJECT=1 \
 POETRY_VIRTUALENVS_CREATE=1 \
 POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN touch README.md

RUN poetry install --without dev --no-root && rm -rf $POETRY_CACHE_DIR

# 런타임 이미지, 가상 환경에서 코드 실행을 위해 사용됩니다

FROM python:3.11-slim-buster as runtime

ENV VIRTUAL_ENV=/app/.venv \
 PATH="/app/.venv/bin:$PATH"

COPY --from=builder ${VIRTUAL_ENV} ${VIRTUAL_ENV}

COPY annapurna ./annapurna

ENTRYPOINT ["python", "-m", "annapurna.main"]

결과는요? 런타임 이미지 용량이 6배나 줄었어요! 6배나! 용량이 `1.1 GB` 에서 `170 MB` 로 감소했답니다.

# 6. Buildkit Cache Mounts ⛰

이미 작은 Docker 이미지와 코드 변경 시 빠른 빌드를 얻었는데, 더 얻을 수 있는 게 있을까요? 음… 의존성이 변경될 때도 빠른 빌드를 얻을 수 있습니다 😎

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 final 트릭은 다른 기능들에 비해 상대적으로 최근에 나왔기 때문에 많은 사람들이 모르는 기능입니다. 이 기능은 Buildkit 캐시 마운트를 활용하는데, 기본적으로 Buildkit에 캐싱 목적으로 폴더를 마운트하고 관리하도록 지시하는 기능입니다. 흥미로운 점은 이러한 캐시가 빌드 간에 지속될 것이라는 것입니다!

이 기능을 Poetry 캐시와 연결하면 (이제 캐싱을 유지하고 싶었던 이유를 이해하시죠?) 매번 프로젝트를 빌드할 때 재사용되는 종속성 캐시를 얻을 수 있습니다. 우리가 얻는 결과는 동일한 환경에서 동일한 이미지를 여러 번 빌드할 때 빠른 종속성 빌드 단계입니다.

Poetry 캐시가 설치 후에 지워지지 않음을 주목하세요. 이는 빌드 간에 캐시를 저장하고 재사용하는 것을 방지하지 않도록 하는 것입니다. 이는 괜찮습니다. 왜냐하면 Buildkit은 빌드된 이미지에 관리 캐시를 유지하지 않을 것이기 때문입니다 (게다가, 이는 심지어 저희의 런타임 이미지도 아닙니다).

```js
FROM python:3.11-buster as builder

RUN pip install poetry==1.4.2

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN touch README.md

RUN --mount=type=cache,target=$POETRY_CACHE_DIR poetry install --without dev --no-root

FROM python:3.11-slim-buster as runtime

ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

COPY --from=builder ${VIRTUAL_ENV} ${VIRTUAL_ENV}

COPY annapurna ./annapurna

ENTRYPOINT ["python", "-m", "annapurna.main"]
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 최적화의 단점은 뭘까요? 현재 Buildkit은 캐시 마운트를 제어할 수 있는 기능이 없어서 CI 환경과는 어울리지 않습니다. Buildkit 리포지토리에서 가장 투표를 많이 받은 GitHub 이슈입니다 😄

# 요약

1GB 이미지를 몇 분 만에 생성하는 간단하지만 끔찍한 Dockerfile을 최적화된 버전으로 만들어봤습니다. 몇 초 만에 수백 MB 크기의 이미지를 만드는 것입니다. 모든 최적화 작업은 주로 다음 Docker 빌드 원칙을 활용합니다.

- 계층을 작게 유지하여 복사 및 설치하는 항목의 양을 최소화합니다.
- Docker 레이어 캐싱을 활용하여 캐시 미스를 줄이십시오.
- 느리게 변하는 것(프로젝트 종속성)은 빠르게 변하는 것(애플리케이션 코드)보다 먼저 빌드해야 합니다.
- Docker 멀티 스테이지 빌드를 사용하여 실행 이미지를 가능한 가볍게 만듭니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

파이썬 프로젝트를 Poetry로 관리할 때 이 원칙을 적용할 수 있지만, PDM과 같은 다른 종속성 관리자 및 다른 언어에도 동일한 원리를 적용할 수 있습니다.

빌드가 빠르고 작아지는 것을 보며 기쁨의 눈물을 흘릴 수 있기를 바라며, 추가적인 도커 팁이 있다면 댓글에 공유해주세요! 👋
