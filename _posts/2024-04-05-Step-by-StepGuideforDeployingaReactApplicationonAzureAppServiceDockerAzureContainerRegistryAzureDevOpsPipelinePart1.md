---
title: "리액트 애플리케이션을 Azure App Service, Docker, Azure Container Registry, Azure DevOps Pipeline에 배포하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Step-by-Step Guide for Deploying a React Application on Azure App Service, Docker, Azure Container Registry , Azure DevOps Pipeline  Part 1"
link: "https://medium.com/@yogender.singh.wd/step-by-step-guide-for-deploying-a-react-application-on-azure-app-service-docker-azure-container-a3ad2f79bdb1"
isUpdated: true
---





Azure App Service에 React 애플리케이션을 배포하는 것은 올바르게 수행한다면 매우 원활한 프로세스일 수 있어요. 이 포괄적인 가이드에서는 각 단계를 세심하게 안내하며, 필요한 경우 효과적으로 문제를 해결할 수 있도록 보장해 드릴 거예요. 게다가 이곳에서 설명하는 단계는 React 애플리케이션에만 한정되지 않아요. 도커화된 프로젝트에 유사한 원칙을 적용할 수 있답니다.

자, 시작해볼까요 🚀

## 단계 1: React 앱 만들기 및 로컬에서 빌드 테스트

먼저 npx create-react-app react-demo 명령을 사용하여 새 React 앱을 생성하세요. 그런 다음, 일반적으로 "build": "react-scripts build"처럼 패키지.json 파일에 빌드 명령이 올바르게 설정되어 있는지 확인하세요. 제품 빌드를 생성하려면 npm run build를 실행하세요. 모든 것이 예상대로 작동하는지 확인하기 위해 npx http-server .와 같은 로컬 서버를 사용하여 로컬에서 빌드를 확인하세요.

<div class="content-ad"></div>

## 단계 2: React 앱에 Docker 적용하기

Docker 자산을 편리하게 관리하기 위해 Docker Desktop을 설치해보세요. 프로젝트의 루트 디렉토리에 Dockerfile을 생성하세요. 다음과 같은 다중 단계 빌드 프로세스를 활용하세요:

- 첫 번째 단계에서, 일반적으로 노드 기반 이미지를 사용하여 React 앱을 빌드합니다. 이 예제에서는 /build 폴더에 출력 파일이 생성됩니다.
- 두 번째 단계에서, Nginx 이미지를 사용하여 앱을 제공합니다.

다음은 Dockerfile의 간소화된 버전입니다:

<div class="content-ad"></div>

```js
# 단계 1: React 앱 빌드하기
FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 단계 2: Nginx를 이용해 React 앱 제공하기
FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
```

## 단계 3: Docker 이미지 생성하기

도커 데스크톱이나 터미널 명령을 사용하여 Docker 이미지를 빌드할 수 있습니다. 터미널을 사용하는 경우, docker build -t react-demo:latest .와 같은 명령을 사용하면 됩니다. --progress=plain 옵션을 사용하여 간소화된 로그와 더 쉬운 디버깅을 제공합니다. docker images 명령을 사용하여 생성된 모든 이미지를 확인하고 나열하세요.

## 단계 4: 이미지 실행 및 컨테이너 확인

<div class="content-ad"></div>

Docker Desktop에서 이미지 섹션으로 이동하여 원하는 이미지를 클릭하고 포트를 지정하여 실행합니다. 또는 docker run -p 4000:80 react-demo과 같은 터미널 명령어를 사용하여 컨테이너를 실행할 수도 있습니다.

## 단계 5: Azure 컨테이너 레지스트리 (ACR) 구성

Azure 컨테이너 레지스트리 (ACR)는 Azure 생태계 내에서 Docker 컨테이너 이미지의 개인 저장소로 작동합니다. 다음은 ACR을 설정하는 방법입니다:

- Azure 포털 접근: Azure 포털(portal.azure.com)에 로그인합니다.
- 새 레지스트리 생성: "컨테이너 레지스트리"를 검색하고 새 레지스트리를 생성합니다. 이름, 구독, 리소스 그룹, 위치 및 SKU와 같은 세부 정보를 제공합니다.
- 저장소 설정: 생성된 후 레지스트리로 이동합니다. 왼쪽 메뉴에서 "저장소"를 찾습니다. 초기에는 저장소가 보이지 않을 수 있습니다. 이 단계는 이미 조직에서 사용 중인 경우 선택적으로 수행합니다.
- 향후 작업: 로컬 환경이나 CI/CD 파이프라인에서 Docker 이미지를 레지스트리에 푸시할 준비를 합니다. 이 단계는 Azure App Service 또는 Azure Kubernetes Service (AKS)와 같은 Azure 서비스에서 이미지에 액세스할 수 있도록 하는 데 필수적입니다.
- 이러한 단계를 따라 Azure 컨테이너 레지스트리를 신속하게 구성하여 Azure에서 컨테이너 이미지를 안전하게 저장하고 관리할 수 있습니다.

<div class="content-ad"></div>

## 단계 6: React 이미지를 Azure 컨테이너 레지스트리에 푸시하는 방법: 재미있는 시작!

React 애플리케이션을 도커 이미지로 만든 후, Azure 컨테이너 레지스트리(ACR)에 이미지를 푸시할 차례입니다. 이 작업을 수행하는 세 가지 옵션이 있습니다:

옵션 1: Azure 포털에서 이미지 빌드

- 이전 단계와 비슷하게, 소스 코드로 이동하여 Dockerfile을 찾습니다.
- Dockerfile을 클릭하면 "Azure에서 이미지 빌드하기" 옵션이 표시됩니다.
- 인증하고 적절한 권한을 부여한 후에 이미지를 ACR에 직접 생성하고 푸시할 수 있습니다.

옵션 2: Azure CLI 사용 (일부 자동화)

<div class="content-ad"></div>

```js
# Azure에 로그인
az login

# Azure Container Registry(ACR)에 로그인
az acr login --name <ACR-registry-name>

# Docker 이미지 빌드
docker build --platform=linux/amd64 -t <ACR-registry-name>.azurecr.io/<image-name>:<image-tag> .

# Docker 이미지를 ACR로 푸시
docker push <ACR-registry-name>.azurecr.io/<image-name>:<image-tag>
```

옵션 3: Azure DevOps 파이프라인 (완전 자동화)
— Azure DevOps에서 Azure Container Registry (ACR) 서비스 연결을 만들어 시작합니다.
— 그런 다음, Azure 파이프라인으로 이동하여 새 파이프라인을 만듭니다.
— 파이프라인을 구성하여 Docker 이미지를 빌드하고 ACR로 자동으로 푸시하도록 설정합니다.
— Azure 파이프라인 설치를 위해 다음 문서를 확인해주세요.

귀하의 작업 흐름과 요구 사항에 가장 잘 맞는 옵션을 선택하세요. 수동 제어, CLI를 통한 부분 자동화, 또는 Azure DevOps 파이프라인을 통한 완전 자동 배포 중에서 React 이미지를 ACR로 푸시하는 것은 배포 과정에서 중요한 단계입니다.

## 단계 7: Azure App Service에 애플리케이션 배포

배포를 완료하기 위해, Azure App Service에 애플리케이션을 설정하는 방법은 다음 단계를 따르세요.

<div class="content-ad"></div>

- Azure 포털에 액세스하세요: portal.azure.com에 가서 "App Service"를 검색합니다.
- 새 서비스 생성:
  - 구독 및 리소스 그룹 세부 정보를 제공하세요.
  - App 서비스에 이름을 지정하세요.
  - "게시(Publish)" 아래에서 "Docker Container"를 선택하세요.
  - 런타임 스택(예: Node 18 또는 Node 20) 및 지역을 지정하세요.
  - 선호에 따라 필수 필드를 채워주세요.
- Docker 설정 구성:
  - "Docker" 탭 아래에서 "Single Container"를 선택하세요.
  - 이미지 소스를 "ACR" (Azure Container Registry)로 설정하세요.
  - Step 5에서 레지스트리를 선택하세요.
  - 이미지 이름을 "react-demo"로 설정하고 태그를 "latest"로 지정하세요.
- 검토 및 생성:
  - 다른 선택 사항을 건너뛰세요.
  - "검토 + 생성"을 클릭하고 정확성을 확인하세요.
  - 설정을 시작하려면 "생성(Create)"을 클릭하세요.
- 배포 대기:
  - 배포에는 시간이 걸릴 수 있습니다.
  - 완료되면 "리소스로 이동(Go to resource)"을 클릭하세요.
- 어플리케이션에 액세스하세요:
  - 개요 섹션에서 임시 도메인 URL을 찾으세요.

이러한 단계를 따라가면 Docker화된 React 애플리케이션이 Azure App Service에서 실행되어 사용할 준비가 될 것입니다.

## 꿀팁: ACR과 App Service는 어떻게 작동하나요?

Azure App Service에 애플리케이션이 배포되면 Azure 포털의 왼쪽 패널에 편리하게 위치한 배포 센터를 통해 배포 설정을 관리할 수 있습니다. 배포 센터 내에서 컨테이너 레지스트리에 대한 정보를 포함한 자세한 구성 옵션을 찾을 수 있습니다.

여기서 중요한 부분은, 컨테이너 레지스트리 세부 정보와 함께 웹훅 URL이 존재한다는 것입니다. 이 웹훅은 배포 프로세스의 중요한 구성요소로 작용합니다. 새 이미지가 컨테이너 레지스트리에 푸시될 때마다 이 웹훅이 트리거됩니다.

<div class="content-ad"></div>

Webhook은 본질적으로 통신 메커니즘이며, Azure 앱 서비스에 애플리케이션 Docker 이미지의 업데이트를 알리는 역할을 합니다. 이 자동화된 프로세스는 수동 개입없이 애플리케이션이 최신 상태를 유지하도록 보장합니다. 이는 배포 워크플로우를 간소화하며 컨테이너 레지스트리와 Azure 앱 서비스 간의 원활한 통합을 제공합니다.

이것으로 모두 끝났어요! 계속 대화를 이어가거나 제 글쓰기 여정을 지원하기 위해 팔로우하거나 갈채를 보내주세요!
