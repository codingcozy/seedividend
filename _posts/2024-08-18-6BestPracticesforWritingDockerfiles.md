---
title: "Dockerfile 작성을 위한 6가지 최상의 사례"
description: ""
coverImage: "/assets/img/2024-08-18-6BestPracticesforWritingDockerfiles_0.png"
date: 2024-08-18 11:43
ogImage: 
  url: /assets/img/2024-08-18-6BestPracticesforWritingDockerfiles_0.png
tag: Tech
originalTitle: "6 Best Practices for Writing Dockerfiles"
link: "https://medium.com/@haiou-a/6-best-practices-for-writing-dockerfiles-e200a5a0185b"
isUpdated: false
---



![Dockerfile Best Practices](/assets/img/2024-08-18-6BestPracticesforWritingDockerfiles_0.png)

2013년에 처음 소개된 Docker는 지금까지 10년 이상 발전하여 컨테이너 기술의 산업 표준이 되었습니다.

모든 주요 운영 체제 및 클라우드 플랫폼을 지원하며, 거의 모든 종류의 응용 프로그램을 컨테이너화할 수 있어 응용 프로그램을 서로 다른 기기, 클러스터 또는 클라우드 서비스로 쉽게 이동할 수 있게 합니다.

모든 Docker 컨테이너는 Dockerfile에서 빌드되므로 Dockerfile을 작성할 때는 최상의 방법을 따르는 것이 중요합니다.


<div class="content-ad"></div>

아래에서 이러한 사례들을 탐구해 봅시다.

## 1. 필요한 파일 추가하기

Dockerfile을 작성할 때, 가장 중요한 측면은 캐싱 메커니즘을 고려하는 것입니다.

Docker는 Dockerfile로부터 Docker 이미지를 빌드할 때마다 빌드 프로세스 중에 생성된 캐시를 저장합니다.

<div class="content-ad"></div>

이미지를 다시 빌드할 때 캐시를 사용할 수 있다면 빌드 프로세스를 크게 가속화할 수 있어요. 예를 들어, npm install 명령을 실행하면 Node.js 프로젝트의 모든 종속성을 다운로드하고 설치하는 데 몇 분이 걸릴 수 있어요.

따라서 docker build 명령을 실행할 때 이 캐시를 활용하여 다음 빌드가 매번 몇 분을 기다릴 필요 없이 빠르게 캐시에서 가져올 수 있게끔 할 수 있어요. 이렇게 하면 번거롭고 비효율적인 대기 시간을 줄일 수 있어요.

캐싱에 관심이 없다면 Dockerfile이 다음과 같이 보일 수 있어요:

```js
FROM node:20
COPY . .
RUN npm install
RUN npm build
```

<div class="content-ad"></div>

이 Dockerfile은 Docker의 COPY 명령을 사용하여 모든 프로젝트 파일(소스 코드 포함)을 이미지에 추가한 후 npm install을 실행하여 종속성을 설치하고 마지막으로 npm build를 실행하여 소스 코드에서 응용 프로그램을 빌드합니다.

이 방법은 실행 가능하지만 효율적이지 않습니다. 만약 docker build를 실행한 다음 프로젝트 파일에서 일부 비즈니스 로직을 수정한 후 다시 빌드하려고 하는 경우를 가정해보십시오.

첫 번째 줄인 FROM node:20은 변경되지 않았으므로 Docker는 이 부분에 대해 캐시를 사용하겠지만, 두 번째 줄인 COPY . .에서는 파일이 변경되었기 때문에 캐시가 실패할 것입니다.

Docker는 계층화된 캐싱 메커니즘을 사용하며, Dockerfile의 각 줄이 일반적으로 계층을 나타냅니다.

<div class="content-ad"></div>

한 번 캐시된 레이어가 깨지면 그 이후의 모든 레이어는 빌드에 캐시를 사용하지 않게 됩니다.

이는 Docker가 각 후속 레이어가 모든 이전 레이어에 의존한다고 가정하기 때문에 발생합니다. 이는 합리적인 가정입니다.

예를 들어, 우리의 경우에는 프로젝트 파일이 변경될 때 npm install이 실행되지만, 실제로는 프로젝트 소스 코드에 의존하지 않습니다. 단지 package.json 및 package-lock.json 파일에 의존합니다.

package.json에는 npm이 설치해야 하는 모든 종속성이 정의되어 있습니다. 그러므로 Dockerfile을 개선해 봅시다:

<div class="content-ad"></div>

```js
FROM node:20
COPY package*.json .
RUN npm install
COPY . .
RUN npm build
```

여기서 package*.json을 사용하여 package.json과 package-lock.json을 모두 복사합니다.

보시다시피 npm install을 실행한 후 npm build를 실행하기 전에 전체 응용 프로그램의 소스 코드만 복사합니다. npm build는 소스 코드에 따라 달라지기 때문입니다.

이렇게 하면 소스 코드가 변경되면 package.json이 변경되지 않는 한 npm install은 캐시에서 가져올 수 있습니다.

<div class="content-ad"></div>

패키지.json 파일의 일부 종속성을 변경해야 할 때에만 npm install을 다시 실행해야 합니다.

참고: 예시 Docker 파일은 캐싱 메커니즘이 작동하는 방식을 설명하기 위한 것입니다.

실제 Node.js 애플리케이션 Docker 파일은 다를 수 있습니다. 예를 들어 파일을 추가하고 npm 명령어를 실행하기 전에 WORKDIR을 설정해야 합니다.

# 2. .dockerignore 파일 추가

<div class="content-ad"></div>

깃 저장소에 파일을 푸시하고 싶지 않을 때는 .gitignore 파일에 해당 파일을 추가합니다.

마찬가지로, 도커 빌드 컨텍스트에 파일을 포함시키고 싶지 않을 때는 .dockerignore 파일에 해당 파일을 추가해야 합니다.

도커 이미지를 빌드할 때는 빌드 컨텍스트 경로를 지정하며, 예를 들어 docker build -t 이미지_태그 를 사용합니다.

여기서 마지막 점은 현재 작업 디렉토리를 빌드 컨텍스트로 사용한다는 것을 나타냅니다.

<div class="content-ad"></div>

빌드 컨텍스트는 Docker 데몬으로 전송되어 이미지를 빌드합니다.

Node.js 예제에서는 Docker 이미지를 빌드하기 전에 애플리케이션을 실행하기 위해 로컬에서 npm install 및 npm start를 사용했다고 가정해보겠습니다.

이러한 명령은 로컬 머신에서 직접 실행되므로 npm은 모든 다운로드된 종속성을 저장하기 위해 프로젝트 디렉토리에 node_modules 디렉토리를 생성합니다.

프로젝트 디렉토리 구조는 다음과 같을 수 있습니다:

<div class="content-ad"></div>

```js
node_modules/
public/
src/
package.json
package-lock.json
```

노드 모듈 디렉토리의 크기가 쉽게 1GB에 달할 수 있다는 점에 유의해주세요.

지금은 npm start로 로컬에서 애플리케이션을 테스트했고, 이제 애플리케이션을 위한 Docker 이미지를 빌드하려 합니다.

따라서, 프로젝트 디렉토리에 이전에 언급한 것과 유사한 Dockerfile을 생성했습니다.

<div class="content-ad"></div>

그럼 우리는 명령어 docker build -t image_tag . 을 실행합니다. 그러나 빌드 로그를 살펴보면, 빌드 컨텍스트 크기가 거의 1GB임을 알 수 있어요:

```js
 => [internal] load build context
 => => transferring context: 893.00MB
```

전체 프로젝트 디렉토리 (node_modules 포함)가 빌드 컨텍스트로 전송된 것 때문입니다.

node_modules를 전달하지 않으려면, .dockerignore 파일을 만들고 그 안에 node_modules를 추가해 주세요.

<div class="content-ad"></div>

이제 Docker 이미지를 다시 빌드하면 빌드 로그에서 컨텍스트 크기가 이전보다 훨씬 작다는 것을 확인할 수 있습니다:

```js
 => [internal] load build context
 => => transferring context: 11.41kB
```

이제 우리 프로젝트 구조는 다음과 같습니다:

```js
node_modules/
public/
src/
Dockerfile
.dockerignore
package.json
package-lock.json
```

<div class="content-ad"></div>


.root 디렉토리에 .dockerignore 파일을 항상 배치해야 합니다.

빌드 컨텍스트에서 node_modules를 제외하는 이유를 궁금해 할 수도 있습니다.

이것은 node_modules가 npm에 의해 생성되는 디렉토리이기 때문입니다. 이 디렉토리에는 우리 애플리케이션의 소스 코드가 포함되어 있지 않습니다.

이는 로컬 npm에 의해 로컬 머신 내에서 생성됩니다. Docker에서 실행되는 npm은 Docker 이미지 내에서 자체적으로 node_modules를 생성해야 합니다.

<div class="content-ad"></div>

로컬 node_modules를 Docker 이미지에 추가하는 것은 좋은 방법이 아닙니다.

Docker에는 애플리케이션의 소스 코드만 제공하고 Docker 내에서 빌드 명령을 실행하는 것이 좋습니다.

이렇게 하면 Docker 빌드가 로컬 빌드와 충돌하지 않습니다.

# 3. 모든 명령을 한꺼번에 실행하기

<div class="content-ad"></div>

당신이 개발자이시군요. 위의 텍스트를 친근한 톤으로 한국어로 번역해 드리겠습니다.

이것은 간단합니다. 자주 apt나 다른 패키지 관리자를 사용하여 필요한 패키지를 설치하는 일이 있습니다.

apt install을 실행하기 전에 먼저 apt update를 실행해야 합니다.

Dockerfile에서 여러 RUN 명령을 사용하는 대신, 하나로 결합하는 것이 더 좋습니다:

```js
RUN apt-get update && apt-get install -y \
  git \
  jq \
  kubectl
```

<div class="content-ad"></div>

패키지 이름을 여러 줄로 나누고 알파벳 순으로 정렬하여 가독성을 높였네요.

여러 개의 RUN 명령을 사용하면 각 명령이 새 레이어를 생성하여 빌드 프로세스를 느리게 만들고 더 많은 저장 공간을 차지할 수 있습니다.

# 4. 환경 변수 및 버전 설정

ENV 명령을 사용하여 빌드 과정 중에 환경 변수를 설정할 수 있습니다. 이렇게 하면 이미지에 유지되어 컨테이너가 실행될 때 사용할 수 있습니다.

<div class="content-ad"></div>

예를 들어, 다음과 같이 PATH 변수를 우아하게 수정할 수 있어요:

```js
ENV PATH=/opt/maven/bin:${PATH}
```

혹은 Node.js 애플리케이션을 실행하고 process.env.PORT를 읽을 때 서버를 시작할 때 Dockerfile에서 서버 포트를 설정할 수 있어요:

<div class="content-ad"></div>

```js
ENV PORT=8080
```

어플리케이션을 구성할 때 환경 변수를 최대한 활용하는 것이 일반적으로 권장됩니다.

어플리케이션을 배포할 때는 환경 변수를 변경하는 것이 코드 파일을 수정하고 어플리케이션을 다시 배포하는 것보다 항상 더 쉽습니다.

특정 종속성의 버전을 직관적으로 설정하는 데 ENV 지시문을 사용할 수도 있습니다.

<div class="content-ad"></div>

```js
ENV KUBECTL_VERSION=1.27
RUN curl -fsSL https://pkgs.k8s.io/core:/stable:/v${KUBECTL_VERSION}/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
...
```

버전 및 도커에 관련해 이미지에 "latest" 태그를 사용하지 않는 것이 강력히 권장됩니다.

마찬가지로, 1.27.4와 같이 지나치게 구체적인 버전 번호 사용을 피해야 합니다. 이렇게 하면 중요한 패치 업데이트를 받지 못해 버그를 수정하거나 보안을 개선하는 것을 막을 수 있습니다.

대신 주요(x) 또는 부분(x.y) 버전 번호를 사용해야 합니다.

<div class="content-ad"></div>

```js
FROM python:3.10
```

"python"으로도 작성할 수 있지만, 그렇게 하면 Docker가 항상 최신 버전을 다운로드하게 되어 새 버전에서 중요한 변경 사항이 있을 경우 응용 프로그램이 손상될 수 있습니다.

# 5. 다중 단계 빌드 사용하기

다중 단계 빌드는 Docker의 강력하고 아마도 과소평가된 기능입니다. 이 개념은 이미지의 빌드 프로세스를 여러 단계로 나누는 것입니다.

<div class="content-ad"></div>

마지막 스테이지의 내용만 최종 이미지에 포함되고, 이전 스테이지는 삭제됩니다.

전형적인 사용 사례는 첫 번째 스테이지에서 빌드 도구와 소스 코드를 사용하여 바이너리 파일을 생성한 다음, 이러한 바이너리 파일만 다음 스테이지로 복사하는 것입니다.

최종 이미지에는 소스 코드나 빌드 도구가 포함되지 않습니다. 왜냐하면 최종 이미지는 애플리케이션을 실행하기만 하면 되기 때문입니다.

```js
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /App

# 앱 빌드
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

# 런타임 이미지 빌드
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]
```

<div class="content-ad"></div>

이 공식 샘플 Dockerfile은 ASP.NET 애플리케이션을 빌드하고 실행하는 데 사용됩니다. 첫 번째 단계에서 두 번째 단계로 이진 파일을 복사하는 COPY --from=build-env /App/out . 명령어에 주목해주세요.

첫 번째 단계는 빌드 도구를 포함하는 이미지를 기반으로 하며 (mcr.microsoft.com/dotnet/sdk:7.0), 두 번째 단계는 더 작은 런타임 이미지를 기반으로 합니다 (mcr.microsoft.com/dotnet/aspnet:7.0).

또한 이미지의 부 버전을 명시하는 방법에 주목해주세요.


# 6. Consider Using Slim and Alpine Images


<div class="content-ad"></div>

알파인 이미지는 가벼운 것으로 유명한 알파인 리눅스를 기반으로 합니다. 그래서 알파인 이미지는 구축, 다운로드 및 실행이 이론적으로 빠릅니다.

| REPOSITORY | TAG | SIZE |
|-----------|------------|------|
| python | 3.10-alpine | 50.4MB |
| python | 3.10-slim | 128MB |
| python | 3.10 | 1GB |

파이썬을 예로 들면 알파인 이미지의 크기는 풀 데비안을 기반으로 한 이미지의 1/20입니다.

파이썬은 또한 슬림 이미지도 제공하는데, 이는 데비안을 기반으로 하지만 대부분의 표준 패키지를 제거한 것입니다.

<div class="content-ad"></div>

이러한 작은 이미지의 일반적인 문제는 응용 프로그램이 약간 복잡한 경우 추가 패키지를 설치해야 할 수 있으며, 이로 인해 빌드 시간이 늘어나고 이미지 크기가 증가하여 처음 선택한 목적을 상쇄할 수 있다는 것입니다.