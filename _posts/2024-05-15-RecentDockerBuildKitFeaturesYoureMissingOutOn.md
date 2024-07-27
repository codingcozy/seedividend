---
title: "최근 놓치고 있는 도커 빌드킷의 기능들"
description: ""
coverImage: "/assets/img/2024-05-15-RecentDockerBuildKitFeaturesYoureMissingOutOn_0.png"
date: 2024-05-15 03:35
ogImage: 
  url: /assets/img/2024-05-15-RecentDockerBuildKitFeaturesYoureMissingOutOn_0.png
tag: Tech
originalTitle: "Recent Docker BuildKit Features You’re Missing Out On"
link: "https://medium.com/gitconnected/recent-docker-buildkit-features-youre-missing-out-on-a25aed8689fe"
---


![이미지](/assets/img/2024-05-15-RecentDockerBuildKitFeaturesYoureMissingOutOn_0.png)

BuildKit 도입으로 Docker의 향상된 빌더 백엔드가 도입되었고, 많은 새로운 기능이 Docker에 추가되었습니다. 그 중 많이 알려지지 않은 기능들을 알아야 할 것이며, Docker를 더 잘 활용하기 위해 사용해야 할 것들에 대한 소개입니다.

# 디버깅

가장 일반적인 작업인 디버깅부터 시작해보겠습니다. Docker 빌드의 디버깅은 항상 고통스러운 작업이었습니다. RUN 또는 COPY 명령이 실패하면 일반적으로 문제가 발생한 상황을 확인하고 디버깅하기가 까다로웠습니다. 일반적으로 RUN ls -la와 같은 명령을 추가하여 더 많은 정보를 얻기 위해 시도했습니다. 그러나 이제는 docker buildx debug를 통해 이 상황이 바뀌었습니다.



```js
export BUILDX_EXPERIMENTAL=1
docker buildx debug --invoke /bin/sh --on=error build .

[+] Building 1.2s (14/18)                docker:default
...
------
 > [builder 5/6] RUN exit 1:
------
Dockerfile:10
--------------------
   8 |     RUN pip3 install -r requirements.txt
   9 |     
  10 | >>> RUN exit 1
  11 |     
  12 |     COPY . /app
--------------------
ERROR: process "/bin/sh -c exit 1" did not complete successfully: exit code: 1
[+] Building 0.0s (0/0)                  docker:default
Launching interactive container. Press Ctrl-a-c to switch to monitor console
Interactive container was restarted with process "u6agxp1ywqapemxrt8iexfv4h". Press Ctrl-a-c to switch to the new container
/ # ls -la
total 72
drwxr-xr-x    1 root     root          4096 May  5 12:59 .
drwxr-xr-x    1 root     root          4096 May  5 12:59 ..
drwxr-xr-x    1 root     root          4096 May  4 10:11 app
...
```

위 스니펫에서 먼저 실험적인 BuildKit 기능을 BUILDX_EXPERIMENTAL 환경 변수로 활성화합니다. 그런 다음 docker buildx debug를 통해 빌드를 시작합니다. 빌드가 어느 시점에서든 실패하면 컨테이너로 이동하여 실행 문맥을 탐색하고 디버깅할 수 있습니다.

빌드가 실패했을 때만 디버그 세션을 시작하는 --on=error 옵션을 포함했음에 유의하세요.

자세한 내용은 디버깅 문서를 참조하십시오.



# 환경 변수

만약 이전에 BuildKit으로 빌드를 실행했다면 새롭고 멋진 로그 출력을 눈치챘을 것입니다. 멋져 보이긴 하지만 디버깅할 때는 그리 실용적이지 않죠. 그럴 때는 평범한 로그 출력으로 전환할 수 있는 환경 변수가 있습니다:

```js
export BUILDKIT_PROGRESS=plain
```

원하는 경우 rawjson으로 설정할 수도 있지만, 이는 사람이 직관적으로 읽기 어려울 수 있지만 어떤 방식으로든 로그를 처리하고 싶을 때 유용할 수 있습니다.



만약 TTY 기반의 동적 출력을 좋아하지만 색상을 싫어한다면, 간단히 다음과 같이 변경할 수 있습니다:

```js
BUILDKIT_COLORS="run=green:warning=yellow:error=red:cancel=cyan" docker buildx debug --invoke /bin/sh --on=error build .
```

위와 같이 출력이 변합니다:

<img src="/assets/img/2024-05-15-RecentDockerBuildKitFeaturesYoureMissingOutOn_1.png" />



기타 환경 변수에 대한 문서를 참조해보세요.

# Exporters

BuildKit은 빌드 결과물이 어떻게 저장될지를 정의하는 수출자(Exporters) 개념을 소개합니다. 가장 유용한 두 가지 옵션은 이미지(image)와 레지스트리(registry)입니다. image는 기대했을 것처럼 빌드 결과물을 컨테이너 이미지로 저장하며, 레지스트리 수출자는 자동으로 지정된 레지스트리로 푸시합니다:

```js
docker buildx build --output type=registry,name=martinheinz/testimage:latest .
```



우리가 해야 할 일은 --output 옵션을 지정하고 registry의 유형과 대상을 설정하는 것뿐입니다. 이 옵션은 한 번에 여러 레지스트리를 지정하는 것도 지원합니다:

```js
docker buildx build --output type=registry,\"name=docker.io/martinheinz/testimage,docker.io/martinheinz/testimage2\" .
```

마지막으로, --cache-to 및 --cache-from 옵션을 제공하여 레지스트리에서 기존 이미지를 캐시 소스로 사용할 수도 있습니다:

```js
docker buildx build --output type=registry,name=martinheinz/testimage:latest \
 --cache-to type=inline \
 --cache-from type=registry,ref=docker.io/martinheinz/testimage .

...
 => CACHED docker-image://docker.io/docker/dockerfile:1.4@sha256:9ba7531bd80fb0a858632727cf7a112fbfd19b17e94c4e84ced81e24ef1a0dbc
...
 => CACHED [builder 2/5] WORKDIR /app                                                                                                  0.0초
 => CACHED [builder 3/5] COPY requirements.txt /app                                                                                    0.0초
 => CACHED [builder 4/5] RUN --mount=type=cache,target=/root/.cache/pip     pip3 install -r requirements.txt                           0.0초
 => CACHED [builder 5/5] COPY . /app                                                                                                   0.0초
 => CACHED [dev-envs 1/3] RUN <<EOF (apk update...)                                                                                    0.0초
 => CACHED [dev-envs 2/3] RUN <<EOF (addgroup -S docker...)                                                                            0.0초
 => CACHED [dev-envs 3/3] COPY --from=gloursdocker/docker / /                                                                          0.0초
 => preparing layers for inline cache                                                                                                  0.0초
...
```



# 이미지 도구

도커 빌드x의 간편하지만 유용한 서브커맨드인 imagetools는 이미지를 가져오지 않고도 레지스트리의 이미지를 검사할 수 있게 해줍니다. 자세한 내용은 많은 예시를 포함하고 있지만, 저에게 가장 유용한 것은 원격 이미지의 다이제스트를 가져오는 것입니다:

```js
docker buildx imagetools inspect alpine --format "{json .Manifest}" | jq .digest
"sha256:c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6a"
```

# 최신 Dockerfile 구문



빌드킷과 함께 새로운 Dockerfile 구문이 도입되었습니다. 이를 통해 Dockerfile 프론트엔드라는 것이 사용됩니다. 현재 최신 구문을 활성화하려면 Dockerfile 맨 위에 다음과 같은 지시문을 추가해야 합니다:

```js
# syntax=docker/dockerfile:1.3
FROM ...
```

버전을 확인하려면 dockerfile-upstream 도커 허브 저장소를 확인하세요.



지금부터 소개할 첫 번째 도커 파일 문법 개선 사항은 here-docs입니다. 여기서는 멀티 라인 스크립트를 RUN 및 COPY 명령어에 전달할 수 있게 해줍니다:

```js
# syntax = docker/dockerfile:1.3-labs
FROM debian
RUN <<eot bash
  apt-get update
  apt-get install -y vim
eot

# 같은 내용:
RUN apt-get update && apt-get install -y vim
```

과거에는 단일 RUN에 여러 명령어를 넣고 싶다면 &&을 사용해야 했지만, 이제는 here-docs를 사용하여 일반 스크립트를 작성할 수 있습니다.

게다가, 첫 번째 줄에서 해석기를 지정할 수 있어 Python 스크립트를 작성할 수도 있습니다:



```bash
# syntax = docker/dockerfile:1.3-labs
FROM python:3.6
RUN <<eot
#!/usr/bin/env python
print("hello world")
eot
```

# COPY and ADD Features

새로운 Dockerfile 구문에서는 COPY 및 ADD에 대한 변경 사항과 개선 사항도 더 많이 있습니다.

COPY는 이제 --parents 옵션을 지원합니다:




```js
# syntax=docker/dockerfile:1.7.0-labs
FROM ubuntu

COPY ./one/two/some.txt /normal/

RUN find /normal
#10 [3/5] RUN find /normal
#10 0.223 /normal
#10 0.223 /normal/some.txt

COPY --parents ./one/two/some.txt /parents/

RUN find /parents
#12 [5/5] RUN find /parents
#12 0.509 /parents
#12 0.509 /parents/one
#12 0.509 /parents/one/two
#12 0.509 /parents/one/two/some.txt
```

만약 일반 COPY로 중첩된 파일을 복사하면 이미지에는 부모 디렉토리 없이 파일 자체만 포함되며, --parents로 전체 파일 트리가 복사됩니다. 이는 cp --parents의 작동 방식과 유사합니다.

--exclude 옵션을 사용할 수 있는 것과 같이, --parents 옵션도 사용할 수 있습니다:

```js
COPY --exclude=*.txt ./some-dir/* ./some-dest
```



파일을 복사할 때 제외된 파일 및 패턴을 무시하는 옵션입니다.

마침내 ADD 명령어도 향상되었습니다 - 이제 Git 저장소를 직접 추가할 수 있습니다:

```js
# syntax=docker/dockerfile:1.7.0-labs
FROM ubuntu

ADD git@github.com:kelseyhightower/helloworld.git /repo
RUN ls -la /repo
```

이 Dockerfile을 빌드하면 다음과 같은 결과를 얻을 수 있습니다:




docker buildx build --ssh default --progress=plain .
- [2/3] ADD git@github.com:kelseyhightower/helloworld.git /repo
  - Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
  - ref: refs/heads/master HEAD
    - 96a652519d1aaca11085ca3a7806bead4d2c273f   HEAD
    - 96a652519d1aaca11085ca3a7806bead4d2c273f   refs/heads/master
  - ref: refs/heads/master HEAD
    - 96a652519d1aaca11085ca3a7806bead4d2c273f   HEAD
    - From github.com:kelseyhightower/helloworld
      - [new branch]      master     -> master
      - [new branch]      master     -> origin/master
  - DONE 7.4s
- [2/3] ADD git@github.com:kelseyhightower/helloworld.git /repo
  - DONE 0.0s


이것은 비공개 저장소에도 작동합니다.

더 많은 흥미로운 옵션을 문서에서 볼 수 있습니다. 예를 들어, --keep-git-dir이나 --checksum을 통해 아티팩트 체크섬을 유효성 검사할 수 있습니다.

# 보너스: 들여쓰기



그리고 BuildKit 기능은 아니지만, 최근에 발견한 하나의 사실은 Dockerfile에서 줄을 들여쓰면 잘 작동한다는 것입니다. 이렇게 하면 다단계 빌드를 진행할 때 가독성이 향상되는 효과를 얻을 수 있습니다:

```js
# syntax=docker/dockerfile:1
FROM golang:1.21
  WORKDIR /src
  
  COPY main.go .
  RUN go build -o /bin/hello ./main.go

FROM scratch
  COPY --from=0 /bin/hello /bin/hello
  CMD ["/bin/hello"]
```

처음에는 이상하게 보일 수 있지만, 내견에 따르면 더 읽기 쉬워져서 각 단계가 어디에서 시작되고 어떤 명령이 속해 있는지 명확해집니다.

# 결론



이 기사의 예시는 내가 가장 유용하다고 생각하는 기능들만을 보여줍니다. 그러나 Docker 공식 문서와 BuildKit 문서, 또한 최신 변경 사항을 확인해보십시오. Docker 블로그도 좋은 자료가 있으며 특히 표시된 글들을 확인해보세요.

이 기사는 원래 martinheinz.dev에서 게시되었습니다.

또한 다음 글들을 즐기실 수도 있습니다...