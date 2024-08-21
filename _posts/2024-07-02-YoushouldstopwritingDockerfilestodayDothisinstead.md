---
title: "오늘 당장 Dockerfile 작성을 멈춰야 하는 이유와 대안 방법"
description: ""
coverImage: "/assets/img/2024-07-02-YoushouldstopwritingDockerfilestodayDothisinstead_0.png"
date: 2024-07-02 23:22
ogImage:
  url: /assets/img/2024-07-02-YoushouldstopwritingDockerfilestodayDothisinstead_0.png
tag: Tech
originalTitle: "You should stop writing Dockerfiles today — Do this instead"
link: "https://medium.com/kpmg-uk-engineering/you-should-stop-writing-dockerfiles-today-do-this-instead-3cd8a44cb8b0"
isUpdated: true
---

## Dockerfile 및 docker-compose 설정을 작성하기 위해 docker init 사용하기

![링크](/assets/img/2024-07-02-YoushouldstopwritingDockerfilestodayDothisinstead_0.png)

Dockerfile과 docker-compose.yml 파일을 작성하는 것이 괴롭다고 느끼시는 분들 중 하나이신가요?

적어도 저는 그 과정을 즐기지 않았어요.

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

저는 Dockerfile과 docker-compose 설정 파일을 작성하면서 보안 취약점을 물러오는지 모르게 하고 있는 지 늘 궁금했어요.

그런데 Docker팀에서는 그런 걱정을 할 필요가 없도록 Generative AI 기술을 활용한 새로운 도구를 만들었다는데요.

바로 CLI 유틸리티 도구인 docker init 이랍니다!

# docker init 소개

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

며칠 전 도커가 도커의 일반 지원을 시작했습니다. 제가 시도해 봤는데 너무 유용했어요. 이제 매일 사용할 수 있는 것을 기다릴 수 없어요.

## 도커 init이 뭔가요?

도커 init은 프로젝트 내에서 도커 리소스를 초기화하는 데 도움을 주는 명령 줄 유틸리티입니다. 이는 프로젝트 요구 사항에 기반하여 Dockerfiles, Compose 파일 및 .dockerignore 파일을 생성합니다.

이를 통해 프로젝트용 도커를 구성하는 과정이 간단해지며 시간을 절약하고 복잡성을 줄일 수 있습니다.

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

# 도커 초기화 방법

도커 초기화 사용법은 간단하고 몇 가지 단계만 거칩니다. 먼저 도커 에셋을 설정할 프로젝트 디렉토리로 이동하세요.

간단한 플라스크 앱을 만들어 보겠습니다.

```bash
touch app.py requirements.txt
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

```js
# app.py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_docker():
    return '<h1> hello world </h1'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
```

```js
# requirements.txt
Flask
```

## 도커 시작의 마법을 보겠습니다.

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
도커 init
```

![이미지](/assets/img/2024-07-02-YoushouldstopwritingDockerfilestodayDothisinstead_1.png)

다음으로 할 일은 응용 프로그램 플랫폼을 선택하는 것입니다. 예를 들어, 우리는 파이썬을 사용합니다. 프로젝트에 대한 권장 값들을 제안할 겁니다. 예를 들어 파이썬 버전, 포트, 엔트리포인트 명령어 등이 있을 겁니다.

![이미지](/assets/img/2024-07-02-YoushouldstopwritingDockerfilestodayDothisinstead_2.png)

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

기본값을 선택하거나 원하는 값을 제공하여 도커 구성 파일을 생성하고 실행 방법에 대한 지침을 제공할 수 있습니다.

![이미지](/assets/img/2024-07-02-YoushouldstopwritingDockerfilestodayDothisinstead_3.png)

이렇게 자동으로 생성된 구성이 어떻게 보이는지 확인해 봅시다.

- Dockerfile

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

# syntax=docker/dockerfile:1

# 이 파일에는 시작하는 데 도움이 되는 주석이 포함되어 있습니다.

# 더 많은 도움이 필요하면 Dockerfile 참조 가이드를 방문하십시오.

# https://docs.docker.com/engine/reference/builder/

ARG PYTHON_VERSION=3.11.7
FROM python:${PYTHON_VERSION}-slim as base

# Python이 pyc 파일을 작성하는 것을 방지합니다.

ENV PYTHONDONTWRITEBYTECODE=1

# Python이 stdout 및 stderr를 버퍼링하지 않도록 합니다.

# 버퍼링으로 인해 어플리케이션이 로그를 남기지 않고 충돌하는 상황을 피합니다.

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# 앱이 실행될 비권한 사용자를 생성합니다.

# https://docs.docker.com/go/dockerfile-user-best-practices/ 참조

ARG UID=10001
RUN adduser \
 --disabled-password \
 --gecos "" \
 --home "/nonexistent" \
 --shell "/sbin/nologin" \
 --no-create-home \
 --uid "${UID}" \
 appuser

# Docker의 캐싱을 활용하기 위해 종속성을 별도 단계로 다운로드합니다.

# 이후 빌드를 가속화하기 위해 /root/.cache/pip에 캐시 마운트를 활용합니다.

# requirements.txt에 대한 bind mount를 사용하여 복사하지 않아도 되도록 합니다.

RUN --mount=type=cache,target=/root/.cache/pip \
 --mount=type=bind,source=requirements.txt,target=requirements.txt \
 python -m pip install -r requirements.txt

# 어플리케이션을 실행할 비권한 사용자로 전환합니다.

USER appuser

# 소스 코드를 컨테이너에 복사합니다.

COPY . .

# 어플리케이션이 수신 대기하는 포트를 노출합니다.

EXPOSE 5000

# 어플리케이션을 실행합니다.

CMD gunicorn 'app:app' --bind=0.0.0.0:5000

그리고요, 이걸 보셨나요? 저보다 나은 Dockerfile을 작성해 주었네요.

- compose.yaml

![이미지](/assets/img/2024-07-02-YoushouldstopwritingDockerfilestodayDothisinstead_4.png)

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

앱을 실행하는 데 필요한 docker-compose 구성을 작성했습니다. 저희 앱은 데이터베이스와 연결되지 않았기 때문에 데이터베이스 컨테이너를 위한 코드는 주석 처리되어 있어요.

만약 Flask 앱에 데이터베이스를 사용하려면, docker-compose 파일에서 db 서비스 구성을 주석 처리를 해제하고, 비밀 정보를 담은 지역 파일을 생성한 후 앱을 실행하세요. 또한 .dockerignore 파일도 우리에게 생성해 주었어요.

# 왜 docker init을 사용해야 할까요?

docker init을 사용하면 Docker 초보자들에게 특히 편리합니다. Dockerfile이나 다른 구성 파일을 수동으로 작성하는 번거로운 작업을 없애 주어 시간을 절약하고 오류를 최소화할 수 있습니다.

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

애플리케이션 유형에 따라 도커 설정을 사용자 정의하는 템플릿을 사용하고 있으며 업계의 모범 사례를 준수합니다.

# 마지막으로

결론적으로, 도커를 사용하면 모든 것을 처리할 수 있습니다.

- 여기 출입자들 중 90%보다 나은 도커 구성 작성.
- 엄격한 사람처럼 최상의 사례 따르기.
- 시큐리티 전문가들이 수십 개의 취약점을 보고할 때 당신이 상상조차 못한 수백 개의 취약점 때문에 비난과 노력이 낭비되지 않게 됩니다.

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

이번 포스트는 여기까지입니다. 다음 포스트에서 만나요!

만약 이 블로그 포스트가 유용했다면 박수를 치거나 댓글을 남겨주시고 팔로우 및 구독도 부탁드립니다.
