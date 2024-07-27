---
title: "React 앱 도커라이징 코드 예제로 간단하게 따라 하는 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-06-23-DockerizingaReactAppAStep-by-StepGuidewithCodeExample_0.png"
date: 2024-06-23 13:43
ogImage: 
  url: /assets/img/2024-06-23-DockerizingaReactAppAStep-by-StepGuidewithCodeExample_0.png
tag: Tech
originalTitle: "Dockerizing a React App: A Step-by-Step Guide with Code Example"
link: "https://medium.com/@muhammedcuma/dockerizing-a-react-app-a-step-by-step-guide-with-code-example-3a802ea8874d"
---


<img src="/assets/img/2024-06-23-DockerizingaReactAppAStep-by-StepGuidewithCodeExample_0.png" />

프로페셔널한 리액트 개발자로서, 리액트 앱을 도커화하는 것은 시간을 절약하고 개발 프로세스를 효율적으로 만드는 중요한 기술입니다. 도커는 애플리케이션과 의존성을 하나의 컨테이너로 패키징할 수 있게 해주는 컨테이너화 도구입니다. 도커는 개발 환경을 일관되게 만드는 데 매우 유용하며 복잡한 설치 및 구성 프로세스를 없애줍니다.

본문에서는 코드 예시와 함께 리액트 앱을 도커화하는 과정을 안내합니다. 간단한 Create React App으로 만든 리액트 앱을 사용하여 리액트 애플리케이션을 컨테이너화하는 방법을 보여줄 것입니다.

# 전제 조건

<div class="content-ad"></div>

시작하기 전에, 저희가 컴퓨터에 다음 사전 준비물이 설치되어 있는지 확인해야 합니다:

- Docker — 공식 웹사이트에서 다운로드할 수 있어요.
- Node.js — 공식 웹사이트에서 다운로드할 수 있어요.

# 단계 1: 리액트 앱 만들기

먼저 Create React App을 사용해 간단한 리액트 앱을 만들어 봅시다. 터미널을 열고 다음 명령어를 실행하세요.

<div class="content-ad"></div>

```js
npx create-react-app my-react-app
```

이 명령어를 실행하면 my-react-app 이라는 이름의 새 React 앱이 생성됩니다.

# 단계 2: React 앱 빌드하기

앱이 생성되면 Dockerize하기 전에 빌드해야 합니다. 터미널을 열고 앱의 루트 디렉토리로 이동한 다음 다음 명령어를 실행하십시오:

<div class="content-ad"></div>

```js
npm run build
```

이 명령어를 실행하면 앱을 빌드하고 Docker로 제공할 정적 자산이 포함된 build 디렉토리가 생성됩니다.

# 단계 3: Dockerfile 생성

다음으로 앱의 루트 디렉토리에 Dockerfile을 생성해야 합니다. Dockerfile은 앱이 실행될 환경을 지정하는 데 사용됩니다. 좋아하는 텍스트 편집기를 열고 앱의 루트 디렉토리에 Dockerfile이라는 새 파일을 생성해주세요. 파일에 다음 코드를 추가해주세요:

<div class="content-ad"></div>

```js
# 베이스 이미지 지정
FROM node:alpine
```

```js
# 작업 디렉토리 설정
WORKDIR /app
# package.json과 package-lock.json 파일 복사
COPY package*.json ./
# 종속성 설치
RUN npm install
# 앱 파일 복사
COPY . .
# 앱 빌드
RUN npm run build
# 포트 노출
EXPOSE 3000
# 앱 실행
CMD ["npm", "start"]
```

이 Dockerfile은 노드의 가벼운 버전인 node:alpine을 베이스 이미지로 지정합니다. 우리는 작업 디렉토리를 /app으로 설정하고, package.json 및 package-lock.json 파일을 복사하고, 종속성을 설치하며, 앱 파일을 복사하고, 앱을 빌드하고, 포트 3000을 노출합니다. 마지막으로, npm start로 앱을 실행할 수 있도록 명령을 설정합니다.

# 단계 4: Docker 이미지 빌드하기

<div class="content-ad"></div>

이제 Dockerfile이 준비되었으니 Docker 이미지를 빌드하는 데 사용할 수 있습니다. 터미널을 열고 앱의 루트 디렉토리로 이동한 다음 다음 명령을 실행하세요:

```js
docker build -t my-react-app-image .
```

이 명령은 my-react-app-image라는 태그가 붙은 Docker 이미지를 빌드합니다.

# 단계 5: Docker 컨테이너 실행

<div class="content-ad"></div>

도커 이미지를 빌드했으면, 도커 컨테이너를 실행할 수 있어요. 터미널을 열고 다음 명령어를 실행해주세요:

```js
docker run -p 3000:3000 my-react-app-image
```

이렇게 하면 도커 컨테이너가 시작되고, 당신의 컴퓨터의 3000번 포트를 컨테이너의 3000번 포트에 매핑해줍니다. 이제 웹 브라우저를 열고 http://localhost:3000 으로 이동하여 React 앱을 확인할 수 있어요.

# 단계 6: 도커화된 React 앱 테스트하기

<div class="content-ad"></div>

도커화된 React 앱이 작동 중인지 확인하려면 웹 브라우저를 열고 http://localhost:3000으로 이동하십시오. 도커 컨테이너 내에서 React 앱이 실행 중인 것을 볼 수 있어야 합니다.

# 단계 7: 도커 이미지 게시

마침내, 우리는 도커 이미지를 Docker Hub 또는 Amazon ECR과 같은 컨테이너 레지스트리에 게시할 수 있습니다. 다른 개발자들이 자신의 프로젝트에서 이미지를 사용하기 쉬워집니다. 이미지를 Docker Hub에 게시하려면 다음 단계를 따르세요:

- 이미 계정이 없다면 Docker Hub 계정을 만드세요.
- 터미널에서 docker login 명령을 사용하여 Docker Hub에 로그인하세요.
- 다음 명령을 사용하여 Docker 이미지에 Docker Hub 사용자 이름 및 앱 이름을 태그하세요.

<div class="content-ad"></div>

다음 명령어를 사용하여 Docker 이미지를 Docker Hub에 푸시하세요:

- docker push your-docker-hub-username/my-react-app-image:latest

이제 Docker 이미지가 Docker Hub에 사용 가능해졌습니다.

<div class="content-ad"></div>

# 결론

이 글에서는 간단한 예제를 활용하여 React 앱을 Docker화하는 방법을 배웠습니다. Dockerfile을 만들고 Docker 이미지를 빌드하며 Docker 컨테이너를 실행하는 방법을 살펴보았습니다. 또한 Docker화된 앱을 테스트하고 Docker 이미지를 Docker Hub에 게시했습니다. React 앱을 Docker화하면 개발 프로세스를 간소화하고 다른 개발자와 앱을 공유하기가 더 쉬워집니다. 이 지식을 활용하여 여러분만의 React 앱을 Docker화하고 컨테이너화가 제공하는 다양한 이점을 활용할 수 있습니다.