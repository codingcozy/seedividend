---
title: "Nodejs 애플리케이션으로 로컬 DynamoDB를 Dockerizing 하는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-DockerizingLocalDynamoDBwithNodejsApplication_0.png"
date: 2024-07-07 03:17
ogImage: 
  url: /assets/img/2024-07-07-DockerizingLocalDynamoDBwithNodejsApplication_0.png
tag: Tech
originalTitle: "Dockerizing Local DynamoDB with Node.js Application"
link: "https://medium.com/@alimarnoos/dockerizing-local-dynamodb-with-node-js-application-eb555d704c06"
isUpdated: true
---




![2024-07-07-DockerizingLocalDynamoDBwithNodejsApplication_0.png](/assets/img/2024-07-07-DockerizingLocalDynamoDBwithNodejsApplication_0.png)

우리 팀과 함께 프로젝트를 진행하면서 API 앱을 설정했어요. 당연히 API를 만들기 위해 Node.js를 선택했고 데이터베이스로 DynamoDB를 사용했어요. 개발 단계에서 데이터베이스를 로컬로 설정하는 게 더 비용 효율적일 것 같아서 이렇게 결정했어요.

AWS는 DynamoDB용 Docker 이미지를 쉽게 가져올 수 있어요. 이 부분은 쉬웠죠. 그러나 어려웠던 부분은 Node.js 컨테이너와 DynamoDB 컨테이너를 원활하게 함께 실행하는 것이었어요.

몇 시간 동안 여러 번의 시행착오 끝에, 결국 작동하는 해결책을 찾았어요. 이 특정 사용 사례에 대한 온라인 기사를 찾을 수 없어서, 이곳에서 제 발견을 공유하기로 했어요.

<div class="content-ad"></div>

여기 내가 한 작업이야:

1- 프로젝트의 루트 디렉토리에 Dockerfile을 만들어봤어.

\js
#Dockerfile

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]
\

위에서 볼 수 있듯이, 컨테이너를 실행하기 위해 npm run dev 명령어를 제공했어. TypeScript 앱이 있으니까 nodemon을 설치하고 package.json 파일 스크립트를 다음과 같이 구성했어.

<div class="content-ad"></div>


```json
 "scripts": {
   "dev": "nodemon src/index.ts",
   "build": "tsc",
   "start": "node dist/index.js"
 }
```

도커파일에 Dynamodb를 포함하지 않았습니다. Dynamodb는 Docker Compose로 처리할 수 있는 추가 복잡성만 증가시킬 뿐이기 때문입니다.

2- 프로젝트의 루트 디렉토리에 docker-compose.yml 파일을 만드세요.

```yaml
#docker-compose.yml

version: '3.8'

services:
  dynamodb-local:
    image: amazon/dynamodb-local
    ports:
      - '8000:8000'
    volumes:
      - ./dynamodb_data:/home/dynamodblocal/data

  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - AWS_REGION=us-east-1
      - AWS_ACCESS_KEY_ID=your_access_key_id
      - AWS_SECRET_ACCESS_KEY=your_secret_access_key
    volumes:
      - .:/usr/src/app
    depends_on:
      - dynamodb-local
    command: npm run dev
```


<div class="content-ad"></div>

해당 파일에는 두 개의 서비스/컨테이너가 포함되어 있습니다:

- DynamoDB: 이 서비스는 DockerHub에서 이미지를 가져와 8000번 포트에서 실행합니다.
- App: 이 서비스는 이전에 만든 Dockerfile을 사용하여 컨테이너를 빌드합니다.

참고: 파일의 다음 줄에서는 Docker Compose에게 Node.js 이미지를 빌드하기 위해 현재 디렉토리의 Dockerfile을 사용하도록 지시하고 있습니다:

```js
app:
    build: .
```

<div class="content-ad"></div>

3- 프로젝트 루트 디렉토리에 Makefile을 만들어주세요.

Makefile은 선택 사항이지만, 프로젝트에 참여하는 팀이 있을 때 애플리케이션의 빌드 및 실행 프로세스를 단순화하는 데 도움이 되므로 권장됩니다.

```js
# Makefile

.PHONY: all build start stop restart logs clean

all: build

build:
    @echo "도커 이미지 빌드 중..."
    docker-compose build

start:
    @echo "도커 컨테이너 시작 중..."
    docker-compose up

stop:
    @echo "도커 컨테이너 중지 중..."
    docker-compose down

restart: stop start

logs:
    @echo "로그 표시 중..."
    docker-compose logs -f

clean: stop
    @echo "도커 컨테이너와 이미지 제거 중..."
    docker-compose down --rmi all
```

각 명령어를 자세히 살펴보겠습니다:

<div class="content-ad"></div>

- build: 도커 이미지를 빌드하려면 docker-compose build를 실행합니다.
- start: 도커 컨테이너를 시작하려면 docker-compose up을 실행합니다.
- stop: 도커 컨테이너를 중지하려면 docker-compose down을 실행합니다.
- restart: 도커 컨테이너를 중지한 다음 시작하려면 실행합니다.
- logs: 도커 컨테이너의 로그를 보려면 docker-compose logs -f을 실행합니다.
- clean: 도커 컨테이너를 중지하고 모든 도커 이미지를 삭제하려면 실행합니다.

앱을 실행하기 전에 컨테이너를 빌드해야 합니다:

make build

이제 실행할 수 있습니다:

<div class="content-ad"></div>

make 시작하기

노트:
- 새 패키지를 설치할 때는 make build를 다시 실행하여 컨테이너를 다시 빌드해야 합니다.
- 빌드 명령어를 여러 번 실행하면 사용되지 않는 오래된 이미지가 많이 생성될 수 있으므로 make clean을 사용하거나 도커 CLI/Docker Desktop을 사용하여 정리하는 것이 좋습니다.

결론적으로 Docker와 Docker Compose를 사용하면 DynamoDB와 함께 Node.js API를 쉽게 설정할 수 있습니다. Makefile을 사용하여 프로세스를 간소화하고 환경을 깨끗하게 유지하세요. 이 가이드가 도움이 되었기를 바랍니다.