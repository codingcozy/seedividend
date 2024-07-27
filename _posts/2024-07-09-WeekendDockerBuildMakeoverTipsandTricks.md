---
title: "주말에 도전하는 Docker 빌드 점검 유용한 팁과 트릭 공개"
description: ""
coverImage: "/assets/img/2024-07-09-WeekendDockerBuildMakeoverTipsandTricks_0.png"
date: 2024-07-09 10:49
ogImage: 
  url: /assets/img/2024-07-09-WeekendDockerBuildMakeoverTipsandTricks_0.png
tag: Tech
originalTitle: "Weekend Docker Build Makeover: Tips and Tricks"
link: "https://medium.com/gitconnected/weekend-docker-build-makeover-tips-and-tricks-18dee11abb2a"
---


만약 당신이 Docker를 좋아한다면 콘솔에서 빌드를 실행할 때 가장 큰 고민 중 하나를 공유할 수 있을 겁니다. 기본적으로 출력물에는 색상이 없어서 같은 내용이 반복되는 텍스트들을 보고 무슨 일이 일어나고 있는지 파악하기 어렵지요.

![WeekendDockerBuildMakeoverTipsandTricks](/assets/img/2024-07-09-WeekendDockerBuildMakeoverTipsandTricks_0.png)

나는 도커 이미지 빌드 콘솔 출력물을 여러 텍스트 조각에 색상을 추가하여 개선하는 데 몇 시간을 할애했고, 결과물은 굉장히 멋집니다. 여러분과 함께 공유할 수 있어서 진심으로 기쁩니다.

우선, 재밌는 작은 NodeJS 프로젝트를 위해 멀티 스테이지 Dockerfile을 만들었습니다. NCC를 사용하여 전체 NodeJS 앱과 모듈을 하나의 멋진 .JS 파일로 번들링했는데, 이로써 최종 Docker 이미지 크기를 상당히 줄였습니다. NCC를 사용하니 압도적인 1GB 용량을 딱 133.99MB로 줄였어요!

<div class="content-ad"></div>

여기 파일과 gist 링크가 있어요. 코드 안에 모든 부분을 설명했지만 여기서 한 줄씩 설명할게요. 
[gist 링크](https://gist.github.com/jsmuster/70082c79d95d663a872d14a67166ff11)

### Stage 1: Builder

이 부분은 우리의 NodeJS 애플리케이션 코드를 하나의 JavaScript 파일로 컴파일하는 일시적인 도커 이미지를 생성합니다. 이 이미지는 다단계 빌드의 다음 단계에서 사용됩니다.

기본 이미지

```js
FROM node:lts-alpine as builder
```

<div class="content-ad"></div>

- 최신 장기 지원(LTS) 버전의 Node.js를 Alpine Linux 베이스 이미지와 함께 빌더 단계에 사용합니다. Alpine은 작은 크기와 효율성으로 선택되었습니다.

환경 변수

```js
ENV NODE_ENV=production
```

- NODE_ENV 환경 변수를 production으로 설정하여 애플리케이션이 운영 모드에 있다는 것을 나타냅니다.

<div class="content-ad"></div>

여행하는 중입니다

```js
WORKDIR /usr/src/app
```

- 컨테이너 내에서 작업 디렉토리를 /usr/src/app으로 설정합니다

패키지 파일 복사

<div class="content-ad"></div>

```js
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
```

- 이 명령은 package.json, package-lock.json 및 npm-shrinkwrap.json 파일(있는 경우)을 작업 디렉터리로 복사합니다. 이 파일들은 필요한 종속성을 설치하는 데 사용됩니다.

의존성 설치

```js
RUN npm install --production
```

<div class="content-ad"></div>

이전 단계에서 나열된 프로덕션 종속성을 설치해보세요.

NCC 설치하기

```js
RUN npm install -g @zeit/ncc
```

- ncc (Node.js Compiler Collection)를 글로벌로 설치합니다. 노드.js 프로젝트를 하나의 파일로 컴파일하는 데 사용됩니다.

<div class="content-ad"></div>

```js
COPY . .
```

- 애플리케이션 소스 코드의 나머지를 작업 디렉토리로 복사합니다.

프로젝트 빌드하기

<div class="content-ad"></div>

```js
위 코드는 NODE_OPTIONS를 OpenSSL 레거시 프로바이더로 설정하고 ncc를 사용하여 ./bin/www에 위치한 프로젝트를 컴파일하여 dist 디렉토리에 하나의 파일로 출력하는 것을 의미합니다.

Node 모듈 제거

RUN rm -rf node_modules

<div class="content-ad"></div>

- project를 빌드한 후에 더 이상 필요하지 않은 node_modules 디렉토리를 제거하여 공간을 절약합니다.

포트 노출

EXPOSE 3000

- Docker에게 컨테이너가 3000번 포트에서 수신 대기한다는 것을 알립니다.

<div class="content-ad"></div>

# 단계 2: 실제 Docker 이미지 빌드하기

이 부분은 실제 이미지를 빌드하는 과정입니다.

기본 이미지

FROM node:lts-alpine as backend

<div class="content-ad"></div>

- 저희 NodeJS 애플리케이션에는 Node.js LTS Alpine 이미지를 사용하고 있어요.

환경 변수

ENV NODE_ENV=production

- NODE_ENV 환경 변수를 production으로 설정해 줍니다.

<div class="content-ad"></div>

작업 디렉토리

WORKDIR /usr/src/app

컨테이너 내에서 작업 디렉토리를 /usr/src/app으로 설정합니다. 필요에 따라 원하는 값으로 변경할 수 있습니다.

컴파일된 파일 복사

<div class="content-ad"></div>

# 빌더 도커 이미지의 dist 디렉토리에서 컴파일된 파일을 현재 도커 이미지의 작업 디렉토리로 복사합니다.

명령어 정의

CMD ["node", "index.js"]

<div class="content-ad"></div>

- 기본 명령어를 사용하여 응용 프로그램을 실행하는 것으로 설정됩니다: `node index.js`.

이제 Docker 빌드 출력을 향상시키기 위해 작성한 실제 스크립트를 보겠습니다.

어떤 색깔도 없는 세부적인 Docker 빌드 로그를 읽으려고 하면 마임이 어둠 속에서 공연하는 것 같아요. 무언가는 일어나고 있지만 정확히 무엇이 일어나고 있는지는 전혀 모르겠죠.

첫 번째 대시와 숫자 패턴 "#1"에 색상을 입히는 시도로 이 프로세스가 시작되었습니다. 이 단계를 성공적으로 마치면 전체 출력을 적절히 변환할 수 있었습니다. 여기에 출력의 일부를 간략하게 소개합니다:

<div class="content-ad"></div>

```
![2024-07-09-WeekendDockerBuildMakeoverTipsandTricks_1.png](/assets/img/2024-07-09-WeekendDockerBuildMakeoverTipsandTricks_1.png)

깃헙 gist에 스크립트를 공유했어요. 여기서 가져다 놓고 더 개선해 보세요. 이 코드를 한 줄씩 쪼개 봅시다:

[gist 바로가기](https://gist.github.com/jsmuster/fcce009ddb35fa15f2f409b20c4c94f2)

Shebang


<div class="content-ad"></div>

```js
#!/bin/sh
```

- 이 명령은 스크립트가 sh 쉘을 사용하여 실행되어야 함을 지정합니다. 이는 기본적으로 모든 쉘 스크립트의 일부이며 파일 맨 위에 반드시 있어야 합니다. 그렇지 않으면 스크립트가 실행되지 않을 수 있습니다.

ANSI 색상 코드

```js
# 일반 텍스트 색상
BLACK='\033[0;30m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'

# 굵은 텍스트 색상
BOLD_BLACK='\033[1;30m'
BOLD_RED='\033[1;31m'
BOLD_GREEN='\033[1;32m'
BOLD_YELLOW='\033[1;33m'
BOLD_BLUE='\033[1;34m'
BOLD_MAGENTA='\033[1;35m'
BOLD_CYAN='\033[1;36m'
BOLD_WHITE='\033[1;37m'

# 배경색
BG_BLACK='\033[40m'
BG_RED='\033[41m'
BG_GREEN='\033[42m'
BG_YELLOW='\033[43m'
BG_BLUE='\033[44m'
BG_MAGENTA='\033[45m'
BG_CYAN='\033[46m'
BG_WHITE='\033[47m'

NC='\033[0m' # 색상 없음
```

<div class="content-ad"></div>

- 일반 텍스트, 굵은 텍스트 및 배경색에 대한 다양한 ANSI 색상 코드를 정의했어요. 콘솔 출력물을 색깔로 표시하기 위해 이 코드들을 사용할 거에요.

컬러 에코 함수들

```js
echo_red() {
    echo "${RED}$1${NC}"
}

echo_green() {
    echo "${GREEN}$1${NC}"
}

echo_yellow() {
    echo "${YELLOW}$1${NC}"
}

echo_blue() {
    echo "${BLUE}$1${NC}"
}
```

- 특정 색깔(빨강, 초록, 노랑, 파랑)으로 텍스트를 출력하는 함수들을 정의했어요.

<div class="content-ad"></div>

```js
colorize_output() {
    while IFS= read -r line; do
        # "#[0-9]* CACHED" 패턴을 찾아 색칠합니다.
        if echo "$line" | grep -q "#[0-9]*"; then
            # 일치하는 패턴에 색을 입힙니다.
            line=$(color_pattern "$line")
        fi
        echo "$line"
    done
}
```

- 입력에서 라인을 읽고 color_pattern 함수를 사용하여 색을 입힐 패턴을 확인합니다. IFS= read -r line 루프는 공백을 제거하지 않고 라인을 읽습니다.

Color Pattern Function


<div class="content-ad"></div>

```js
color_pattern() {

    local input="$1"
    local red='\\033[0;31m'

    local green='\\033[0;32m'
    local yellow='\\033[0;33m'
    local blue='\\033[0;34m'

    local black='\\033[0;30m'
    local magenta='\\033[0;35m'
    local cyan='\\033[0;36m'
    local white='\\033[0;37m'

    # Bold text colors
    local bold_black='\\033[1;30m'
    local bold_red='\\033[1;31m'
    local bold_green='\\033[1;32m'
    local bold_yellow='\\033[1;33m'
    local bold_blue='\\033[1;34m'
    local bold_magenta='\\033[1;35m'
    local bold_cyan='\\033[1;36m'
    local bold_white='\\033[1;37m'

    # Background colors
    local bg_black='\\033[40m'
    local bg_red='\\033[41m'
    local bg_green='\\033[42m'
    local bg_yellow='\\033[43m'
    local bg_blue='\\033[44m'
    local bg_magenta='\\033[45m'
    local bg_cyan='\\033[46m'
    local bg_white='\\033[47m'

    local reset='\\033[0m'
    local pattern="#[0-9]+"
    
    input=$(echo "$input" | sed -E "s/($pattern)/${bold_white}${bg_black}\1${reset}/g")

    pattern="DONE"
    
    input=$(echo "$input" | sed -E "s/($pattern)/${green}\1${reset}/g")

    pattern="exporting"
    
    input=$(echo "$input" | sed -E "s/($pattern)/${green}\1${reset}/g")

    pattern="writing image"
    
    input=$(echo "$input" | sed -E "s/($pattern)/${bold_black}\1${reset}/g")

    pattern="[0-9]+\.[0-9]+s"
    
    input=$(echo "$input" | sed -E "s/($pattern)/${blue}\1${reset}/g")

    pattern="CACHED"
    
    input=$(echo "$input" | sed -E "s/($pattern)/${yellow}\1${reset}/g")

    pattern="\[internal\]"
    
    input=$(echo "$input" | sed -E "s/($pattern)/${cyan}\1${reset}/g")

    pattern='\[builder [0-9]+/[0-9]+\]'

    input=$(echo "$input" | sed -E "s/(\[builder [0-9]+\/[0-9]+\])/${bold_green}\1${reset}/g")

    pattern='\[backend [0-9]+/[0-9]+\]'

    input=$(echo "$input" | sed -E "s/(\[backend [0-9]+\/[0-9]+\])/${magenta}\1${reset}/g")
    
    # Return the modified string
    echo "$input"
}
```

- 이 기능은 문자열을 이스케이프해야 하기 때문에 지역 색상 변수를 보유하고, sed를 사용하여 입력 문자열의 다양한 패턴에 다양한 색상 코드를 적용합니다. SED는 리눅스의 스트림 편집기입니다.

시작 메시지 표시

```js
echo_green "빌드 스크립트를 시작합니다..."
```

<div class="content-ad"></div>

- 녹색으로 빌드 스크립트의 시작을 나타내는 메시지를 출력합니다.

도커 빌드 함수 실행

```js
run_docker_build() {
    docker image build --progress=plain -t 나만의이미지이름:latest . 2>&1 | tee dockerbuild.log | colorize_output
}
```

- Docker 빌드 명령을 실행하고 그 출력을 로그 파일과 colorize_output 함수로 동시에 보내도록 하는 함수를 정의했습니다. 이 코드에서 "나만의이미지이름:latest" 부분에는 여러분이 원하는 이미지 이름을 넣어주셔야 합니다. 이 코드는 빌드 로그를 dockerbuild.log 파일에 출력합니다.

<div class="content-ad"></div>

도커 빌드 실행

```js
run_docker_build
```

- run_docker_build 함수를 호출하여 컬러 적용된 출력으로 도커 빌드 프로세스를 시작합니다.

최종 상태 메시지

<div class="content-ad"></div>


```js
echo_green "빌드 스크립트가 완료되었습니다."
```

- 빌드 스크립트가 완료되었다는 메시지를 초록색으로 출력합니다.
