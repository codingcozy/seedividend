---
title: "PKG 모듈로 NestJS 빌드하기 리소스 절약의 게임 체인저"
description: ""
coverImage: "/assets/img/2024-06-22-BuildingNestJSwithPKGModuleisaResource-SavingGameChanger_0.png"
date: 2024-06-22 05:55
ogImage: 
  url: /assets/img/2024-06-22-BuildingNestJSwithPKGModuleisaResource-SavingGameChanger_0.png
tag: Tech
originalTitle: "Building NestJS with PKG Module is a Resource-Saving Game Changer"
link: "https://medium.com/@adityadirgantara1/building-nestjs-with-pkg-module-is-a-resource-saving-game-changer-8674226c0fd4"
---


<img src="/assets/img/2024-06-22-BuildingNestJSwithPKGModuleisaResource-SavingGameChanger_0.png" />

## 소개

NestJS 개발 세계에서 효율성과 자원 관리는 매우 중요합니다. 기존의 NestJS 애플리케이션을 구축하는 전통적인 방법은 종종 오랜 시간이 소요되고 상당한 자원을 소비하는 경향이 있습니다. 가장 큰 문제 중 하나는 node_modules 디렉토리의 크기인데, 이는 많은 종속성으로 인해 지나치게 커질 수 있습니다. 이로 인해 빌드 시간이 느려지는 것뿐만 아니라 프로젝트를 관리하고 배포하기 어렵게 만들기도 합니다.

여기에 pkg가 등장합니다. pkg를 활용하면 NestJS 애플리케이션 구축을 간소화하고 종속성 처리를 자동화하며 워크플로우를 최적화할 수 있습니다. 이 현대적인 방법은 일반적인 빌드 방법과 대조적으로 node_modules 디렉토리와 전체 프로젝트 크기를 대폭 줄여 자원을 효율적으로 활용하는 더 효율적이고 자원을 아끼는 대안을 제공합니다.

<div class="content-ad"></div>

또한, `pkg`는 코드를 바이너리로 컴파일하여 NestJS 앱을 독립적으로 만들어줍니다. 이를 통해 node_modules를 별도로 설치할 필요 없이 어디에서나 직접 실행할 수 있게 됩니다. 이 가변성은 응용 프로그램을 다양한 환경에 쉽게 배포할 수 있도록 하며, 설정 시간을 줄이고 의존성 관리와 관련된 잠재적인 문제를 줄일 수 있습니다.

# 전통적인 빌드 과정

전통적으로 NestJS 애플리케이션을 빌드하는 과정에는 여러 단계가 포함됩니다:

- 의존성 설치: `npm install`을 사용하여 package.json에 나열된 모든 필수 패키지를 다운로드하고 설치합니다. 이로 인해 의존성이 많은 응용 프로그램의 경우 큰 node_modules 디렉토리가 생성될 수 있습니다.
- 코드 변환: TypeScript를 사용하여 코드를 TypeScript에서 JavaScript로 변환합니다.
- 배포: 번들 파일과 node_modules를 서버 또는 배포 환경에 업로드합니다.

<div class="content-ad"></div>

이 방법은 효과적이지만 단점도 있습니다:

- 크기: node_modules 디렉토리가 매우 커져서 응용 프로그램을 관리하고 배포하기 어려울 수 있습니다.
- 시간: 각 단계는 종속성 설치부터 코드 변환 및 번들링까지 시간이 걸립니다.
- 복잡성: 종속성 관리와 호환성 확보가 프로젝트가 커짐에 따라 어려울 수 있습니다.

# PKG 접근법

pkg는 NestJS 애플리케이션을 단일 이진 파일로 컴파일하는 현대적인 대안을 제공합니다. 이것이 프로세스를 어떻게 간소화하는지 살펴보겠습니다:

<div class="content-ad"></div>

- 단일 이진 파일: pkg는 응용 프로그램 및 모든 종속성을 독립적인 이진 파일로 컴파일합니다. 이 이진 파일은 node_modules를 설치할 필요 없이 직접 실행할 수 있습니다.
- 종속성 관리 축소: 종속성을 단일 이진 파일로 패키징함으로써, pkg는 배포 중 별도의 node_modules 디렉토리가 필요하지 않도록 합니다. 이를 통해 다양한 환경에서 종속성을 관리하는 복잡성을 줄일 수 있습니다.
- 빠른 배포: 응용 프로그램이 이진 파일로 컴파일되기 때문에 배포는 더 빠르고 간단해집니다. 대상 환경에 종속성을 설치할 필요가 없어 배포 프로세스가 간소화됩니다.
- 향상된 보안: 응용 프로그램을 이진 파일로 패키징하면 공격 표면을 줄이고 종속성을 빌드 시간에 잠금으로 설정하여 보안을 강화할 수 있습니다.

## 안내: pkg 및 Docker를 사용하여 NestJS 응용 프로그램 구축 및 배포하기

본 안내서에서는 NestJS 응용 프로그램을 설정하고, 리소스 효율성을 높이기 위해 pkg를 사용하여 최적화하고, Windows에서 Docker를 사용하여 배포하는 과정을 안내합니다.

## 사전 요구 사항

<div class="content-ad"></div>

시작하기 전에 다음 항목들이 설치되어 있는지 확인하세요:

- Node.js: 시스템에 Node.js가 설치되어 있는지 확인하세요. nodejs.org에서 다운로드할 수 있습니다.
- NestJS: npm을 사용하여 NestJS를 글로벌로 설치하세요.

```js
npm install -g @nestjs/cli
```

3. npm pkg: NestJS 애플리케이션을 독립적인 이진 파일로 패키징하는 데 전역으로 pkg를 설치하세요.

<div class="content-ad"></div>

```js
npm install -g pkg
```

4. Windows용 Docker Desktop: Docker Hub에서 Docker Desktop을 다운로드하여 설치하세요.

## 단계 1: 새로운 NestJS 프로젝트 생성

먼저, NestJS CLI를 사용하여 새로운 NestJS 프로젝트를 만들어보겠습니다.

<div class="content-ad"></div>

```js
nest new nestjs-pkg-app
cd nestjs-pkg-app
```

이렇게 하면 nestjs-pkg-app 디렉토리에 새로운 NestJS 프로젝트가 생성됩니다.

## 단계 2: pkg를 사용하여 응용 프로그램 컴파일하기

다음으로, 프로젝트 디렉토리로 이동하여 pkg를 사용하여 dist 폴더 내의 main.js 파일을 컴파일합니다.

<div class="content-ad"></div>

```js
cd nestjs-pkg-app
npm run build
pkg ./dist/main.js --out-path ./compiled
```

이 명령어는 NestJS 애플리케이션을 컴파일하여 compiled 디렉토리에 독립 실행 바이너리(main)로 만듭니다.

## 단계 3: NestJS 애플리케이션을 도커화

이제 NestJS 애플리케이션을 패키징하고 도커 컨테이너에서 실행할 수 있도록 Dockerfile을 생성해보겠습니다.

<div class="content-ad"></div>

프로젝트 디렉토리(nestjs-pkg-app)에 Dockerfile이라는 파일을 만들어주세요. 아래 내용을 넣어주세요:

```js
FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./compiled ./compiled

EXPOSE 3000

CMD ["/compiled/main"]
```

## 단계 4: Docker 컨테이너 빌드 및 실행하기

작성한 Dockerfile을 사용하여 Docker 이미지를 빌드해보세요.

<div class="content-ad"></div>

```js
도커 파일에 작성된 지시 사항을 기반으로 nestjs-pkg-app라는 이름의 도커 이미지를 빌드하는 명령어입니다.

이제 빌드된 이미지를 사용하여 도커 컨테이너를 실행하십시오.

docker run -p 3000:3000 nestjs-pkg-app

<div class="content-ad"></div>

이 명령은 Docker 컨테이너를 시작하고 nestjs-pkg-app이라는 이름으로 지정하며, 로컬 머신의 포트 3000을 컨테이너 내부의 포트 3000에 매핑합니다.

## 단계 5: NestJS 애플리케이션에 액세스

웹 브라우저를 열고 http://localhost:3000으로 이동하여 Docker 컨테이너 내에서 실행 중인 NestJS 애플리케이션에 액세스하세요.

# 비교

<div class="content-ad"></div>

이 섹션에서는 전통적인 빌드 방식과 NestJS 애플리케이션을 빌드하고 배포하는 데 npm pkg를 사용하는 방법을 비교해보겠습니다.

컴파일 없이: node_modules로 인해 대용량(약 200MB)

![image](/assets/img/2024-06-22-BuildingNestJSwithPKGModuleisaResource-SavingGameChanger_1.png)

컴파일 포함: 모든 종속성이 하나의 바이너리로 번들링되어 있는 속한 크기(약 51.5MB)입니다.

<div class="content-ad"></div>

```
![Building NestJS with PKG Module](/assets/img/2024-06-22-BuildingNestJSwithPKGModuleisaResource-SavingGameChanger_2.png)

이 상세한 비교는 사이즈를 중점으로 하여 기존 빌드와 pkg 간의 선택 시 혜택 및 고려 사항을 독자들에게 명확히 전달해줄 것입니다.

# 결론

요약하면, NestJS 애플리케이션을 빌드하는 데 npm pkg를 활용하는 것은 개발 관행의 중요한 진보를 의미합니다. node_modules 디렉토리의 크기를 줄이고 싱글 이진 파일로의 간단한 배포를 통해, npm pkg는 개발자에게 더 효율적이고 확장 가능한 접근 방식을 제공합니다. 자원 사용량을 최적화하고 배포 워크플로우를 간소화하거나 보안을 강화하려는 경우, npm pkg는 현대적인 개발 요구에 부합하는 매력적인 솔루션을 제공합니다.


<div class="content-ad"></div>

오늘 npm pkg를 활용하여 더 효율적이고 자원을 절약하는 NestJS 개발의 잠재력을 발휘해보세요. 당신의 프로젝트와 팀이 그것에 감사할 것입니다.