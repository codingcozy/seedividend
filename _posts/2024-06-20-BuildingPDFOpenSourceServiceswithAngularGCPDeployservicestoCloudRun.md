---
title: "Angular 및 GCP를 활용한 PDF 오픈 소스 서비스 구축 - 클라우드 런으로 서비스 배포하기"
description: ""
coverImage: "/assets/img/2024-06-20-BuildingPDFOpenSourceServiceswithAngularGCPDeployservicestoCloudRun_0.png"
date: 2024-06-20 05:44
ogImage: 
  url: /assets/img/2024-06-20-BuildingPDFOpenSourceServiceswithAngularGCPDeployservicestoCloudRun_0.png
tag: Tech
originalTitle: "Building PDF Open Source Services with Angular , GCP — Deploy services to Cloud Run"
link: "https://medium.com/itnext/building-pdf-open-source-services-with-angular-gcp-deploy-services-to-cloud-run-686b5b8fb87b"
---


![image](/assets/img/2024-06-20-BuildingPDFOpenSourceServiceswithAngularGCPDeployservicestoCloudRun_0.png)

안녕하세요! Angular (Analogjs), Firestore, Cloud Storage, 그리고 CloudRun을 이용하여 오픈 소스 PDF 서비스를 구축하는 여정에 오신 것을 환영합니다. 이 프로젝트는 제 지식을 공유하고 지속적으로 최상의 사례를 학습하며 동시에 커뮤니티에 기여하는 플랫폼으로 제공됩니다.

파트 1: 아키텍처 개요
파트 2: Cloud Run에 서비스 배포

데모: https://pdfun.xyz

<div class="content-ad"></div>

해결책은 GCP 생태계를 중심으로 구축되었으므로 프로젝트를 GCP에 배포하는 것이 좋습니다. 그렇게 하면 서비스에 액세스할 수 있습니다. 해결책은 두 부분으로 구성됩니다:

- 웹 UI (Analogjs — Angular): 사용자 상호작용 처리
- 백엔드 (Node — Express): PDF 파일 처리

# 왜 Cloud Run에 배포해야 하는가?

Cloud Run은 Google Cloud Platform(GCP)에서 제공하는 완전히 관리되는 컴퓨팅 플랫폼으로 stateless 컨테이너를 자동으로 확장시킵니다. 그렇다면 왜 우리는 서비스를 배포할 때 Cloud Run을 선택해야 할까요? 여기에 몇 가지 이유가 있습니다:

<div class="content-ad"></div>

- Cloud Run은 장기 실행 작업을 지원하여 서비스를 배포하기에 훌륭한 선택입니다. 서비스는 최대 60분 동안 실행되며, 계산 시간이 많이 필요한 작업을 수용할 수 있습니다.
- 이외에도 Cloud Run은 자동 스케일링, 개발자 친화적 환경, 통합 로깅 및 모니터링, 사용량에 따른 요금 체계, 다양한 플랫폼 간 이식성 등의 혜택을 제공합니다. 이로써 PDF 서비스를 배포하기 위한 다목적이고 비용 효율적인 솔루션이 됩니다.

## 도커를 사용한 Google Cloud Run 배포

Cloud Run은 서비스를 배포하기 위해 도커 이미지를 사용하므로, 필요한 작업은 애플리케이션을 이미지로 랩핑하는 것입니다.

### Prerequisites

<div class="content-ad"></div>

시작하기 전에 다음 사항을 확인해주세요:

- 활성화된 과금이 설정된 Google Cloud 프로젝트
- 로컬 머신에 설치된 도커
- 설치 및 초기화된 Google Cloud SDK

더 자세한 지시 사항을 위해 클라우드런에 배포하는 방법 문서를 참고해주세요.

## 도커 이미지 빌드하기

<div class="content-ad"></div>

다음으로 프로젝트와 Docker 이미지를 빌드해야 합니다. 이는 docker build 명령을 사용하여 수행할 수 있습니다. 이미지에 레지스트리 이름을 태그하는 것을 잊지 마세요. 예를 들어:

```js
// build-new-image.sh

imageTag=${REGION}-docker.pkg.dev/$GCLOUD_PROJECT/$REPO/$image

docker build -t $imageTag -f Dockerfile --platform linux/x86_64 .
```

REGIONS, GCLOUD_PROJECT, REPO 및 image를 Google Cloud 프로젝트 ID, 이미지 이름 및 이미지 태그로 대체해주세요.

## Artefact Registry로 이미지 푸시

<div class="content-ad"></div>

이미지를 빌드하고 나면, docker push 명령어를 사용하여 Artifact Registry에 이미지를 푸시할 수 있어요:

```js
docker push $imageTag
```

## 클라우드 런(Cloud Run)에 새 서비스 생성하기

이미지가 Artifact Registry에 등록되었으니, 클라우드 런에 새 서비스를 생성할 수 있어요. PDF 서비스를 배포하려면 다음 명령어를 실행하세요:

<div class="content-ad"></div>

```bash
gcloud run deploy pdfun \
  --image=us-central1-docker.pkg.dev/pdfun-prod/pdf/pdfun \
  --platform=managed --project=pdfun-prod --region=us-central1 \
  --allow-unauthenticated
```

이 명령은 서비스 이름이 pdfun인 Web UI를 Cloud Run에 배포하고 웹 사이트에 모두 접근할 수 있도록 허용합니다(`--allow-unauthenticated`).

# 보너스: Nx를 활용하여 서비스 배포하기

서비스를 배포할 때 Nx는 간편한 프로세스를 제공합니다. 구성 후에는 영향을 받는 앱만 배포할 수 있도록 하기 위해 yarn deploy를 실행하기만 하면 됩니다. 예를 들어 프론트엔드만 업데이트하는 경우 프론트엔드만 빌드되고 배포됩니다.

<div class="content-ad"></div>

저희가 배포 명령어를 실행한 후 무슨 일이 벌어지는지에 대해, 커밋을 비교하여 main 브랜치의 최신 커밋과 함께 영향 받는 프로젝트에 대해 배포 대상을 실행합니다.

pdfun 애플리케이션의 project.json을 확인해 봅시다:

<div class="content-ad"></div>

```js
// project.json

...

"deploy": {
  "executor": "nx:run-commands",
  "options": {
    "commands": ["nx deploy-docker pdf", "nx deploy-cloudrun pdf"],
    "color": true,
    "parallel": false
  },
  "dependsOn": [
    {
      "target": "build"
    }
  ]
},
"deploy-cloudrun": {
  "command": "gcloud run deploy pdfun --image=us-central1-docker.pkg.dev/pdfun-prod/pdf/pdfun --platform=managed --project=pdfun-prod --region=us-central1 --allow-unauthenticated"
},
"deploy-docker": {
  "command": "./build-new-image.sh --dir dist/pdf/analog --image pdfun",
  "parallel": false,
  "dependsOn": [
    {
      "target": "copy"
    }
  ]
},
```

그래서 deploy 대상이 실행되면 두 개의 다른 명령이 트리거됩니다:

```js
npx nx deploy-docker pdf
npx nx deploy-cloudrun pdf
```

이 명령들은 이어서 도커 이미지를 빌드하고 해당 이미지를 푸시한 후 Artifact Registry에 업로드된 이미지를 기반으로 Cloud Run 서비스를 배포할 것입니다.

<div class="content-ad"></div>

여기 결과입니다:

```js
dalenguyen$ yarn deploy

yarn run v1.22.19
$ npx nx affected -t deploy --base=main~1 --head=main

 NX   Running target deploy for 2 projects and 3
 NX   Running target deploy for 2 projects and 3 tasks they depend on

   ✔  nx run domain:build (6초)
———————————————————————————————————————————————
   ✔  nx run pdf:build:production (17초)
———————————————————————————————————————————————
   ✔  nx run pdf:deploy (17초)
   ✔  nx run pdf-on-create:deploy (29초)
———————————————————————————————————————————————

 NX   2개의 프로젝트 및 해당 종속 작업들을 위한 타겟 deploy가 성공적으로 실행되었습니다 (37초)
```

로컬 환경에서 빌드 캐시를 활용하여 약 1분 내에 두 개의 서비스가 빌드되고 배포되었다는 것을 확인할 수 있어요!

# 궁금한 점이 있으신가요?

<div class="content-ad"></div>

문제가 있거나 궁금한 점이 있으면 언제든지 GitHub 레포지토리에 이슈를 생성해주세요. 또는 채팅을 통해 저와 대화할 수도 있어요. 도와드리고 피드백을 받는 것을 기쁘게 생각할 거예요.

다음 파트도 기대해주세요. 그때까지 즐거운 코딩 되세요!