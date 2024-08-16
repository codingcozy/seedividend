---
title: "Vite React 앱을 Azure App Service에 CI CD 파이프라인GitHub Actions을 사용하여 배포하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_0.png"
date: 2024-05-12 19:18
ogImage: 
  url: /assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_0.png
tag: Tech
originalTitle: "How to deploy a Vite React app to Azure App Service using CI CD Pipelines(GitHub Actions)"
link: "https://medium.com/@janesfrontenddiary/how-to-deploy-a-vite-react-app-to-azure-app-service-using-ci-cd-pipelines-github-actions-1cee30d49ab0"
isUpdated: true
---




개인 React 프로젝트를 시작하거나 제품용 대규모 웹 애플리케이션을 구축하든, React 앱을 호스팅하는 다양한 옵션이 많습니다. 최근에 Azure를 좀 더 전문적으로 다뤄보면서, Vite + React 앱을 Azure에 배포하고 CI/CD 파이프라인을 통해 성공적으로 실행 및 지속적으로 배포하는 방법을 공유하고 싶었어요.

시작하기 전에 다음 사항을 필요로 합니다:

- 활성 구독이 있는 Microsoft Azure 계정
- 시스템에 최신 Node LTS (v18.16.1 현재 버전)이 설치되어 있어야 합니다
- GitHub 계정

다음과 관련해서 편안해야 해요:



- Bash/Zsh을 사용한 명령 줄
- Git
- npm, yarn, pnpm과 같은 모든 Node 패키지 관리 시스템
- YAML: [YAML이란 무엇인가요? - 초보자를 위한 안내서](https://circleci.com/blog/what-is-yaml-a-beginner-s-guide/)
- Azure 포털: [Azure 포털](https://portal.azure.com/)

시작하기 전에, 제목에서 언급된 중요한 개념 몇 가지를 먼저 명확히해 보겠습니다: Azure App Service 및 CI/CD 파이프라인.

# Azure App Service란

Azure App Service는 웹 앱, RESTful API 및 모바일 백엔드를 호스팅하기 위한 Azure의 플랫폼 서비스(PaaS)입니다. GitHub Actions를 사용한 지속적인 배포를 포함한 내장된 DevOps 기능도 제공됩니다.



Azure App Service에는 Web App, Web App + Database 및 Static Web App이라는 세 가지 서비스 옵션이 있어요.

![Azure App Service](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_0.png)

이 세 가지 옵션의 이름은 자명해요. Static Web App Service의 중요한 점은 백엔드 API 측면에서 제약 사항이 있다는 것이에요: https://learn.microsoft.com/en-us/azure/static-web-apps/apis-overview#constraints.

백엔드 API를 사용하는 정적 웹사이트를 디플로이할 때 Azure Functions만 사용한다면 Static Web App을 사용해도 문제가 없어요. 공식 Vite 문서에는 Azure Static Web App으로의 배포 방법에 대한 안내가 있어요: https://vitejs.dev/guide/static-deploy.html#azure-static-web-apps



그러나 더 복잡한 사용 사례의 경우, 웹 앱 또는 Web 앱 + 데이터베이스를 사용하고 싶을 것입니다. 저는 웹 앱 서비스를 사용하고 있지만 귀하의 요구에 가장 적합한 것을 선택할 수 있습니다.

# CI/CD란 무엇인가요?

CI는 지속적인 통합(Continuous Integration)을 의미하고, CD는 지속적인 전달 및 배포(Continuous Delivery and Continuous Deployment)를 의미합니다. CI/CD는 소프트웨어를 유연한 환경에서 빈번한 배포를 보장하는 데 중요한 프로세스입니다.

지속적인 통합(CI)은 새 코드 변경사항을 자동으로 공유 저장소에 통합하는 프로세스입니다. 이는 "우리는 새로운 코드 변경을 만들었는데, 그것을 기존 코드베이스에 어떻게 통합할까요?"라는 질문에 대답합니다.



지속적 전달과 지속적 배포 (CD)는 보통 함께 그룹화되지만, 두 가지를 구별하는 것이 중요합니다:

지속적 전달은 테스트, 버그 확인, 통합된 코드 변경이 언제든지 저장소에서 프로덕션으로 이동할 수 있는 자동화된 프로세스를 가지는 것을 의미합니다. 이는 "우리는 변경 사항을 저장소에 통합했는데, 이제 어떻게 효율적으로 작업물을 전달할까?"라는 질문에 대응합니다.

지속적 배포는 저장소에서 프로덕션으로의 배포 프로세스를 자동화하는 것을 의미합니다. 이는 "우리는 작업물을 전달했는데, 이제 어떻게 배포해서 최종 사용자가 경험할 수 있게 할까?"라는 질문에 대응합니다.

CI/CD 파이프라인은 소프트웨어를 빌드, 테스트하고 프로덕션으로 릴리스하는 자동화된 프로세스이며, 이 프로세스를 돕는 여러 도구들이 있습니다.



GitHub Actions은 GitHub의 자체 CI/CD 플랫폼으로, 빌드, 테스트 및 배포 파이프라인을 GitHub 내에서 자동화할 수 있습니다. 2018년에 출시된 이후로 개발자들 사이에서 인기를 얻고 있습니다. 이전에 CircleCI와 같은 다른 CI/CD 플랫폼을 사용해본 적이 있다면, GitHub Actions를 사용하는 것이 쉬울 것입니다.

CI/CD에 처음 접하는 경우 걱정하지 마세요. 나중에 이 글에서 워크플로우 설정에 대해 자세히 설명하겠습니다. GitHub Actions를 사용하여 애플리케이션을 테스트하고 빌드하며, 코드 변경이 main 브랜치에 푸시될 때마다 Azure App Service에 배포하는 배포 워크플로우를 설정하는 방법을 배울 수 있을 것입니다.

# 단계별 가이드

## Azure 포털을 통해 Azure 앱 서비스 만들기



- 홈으로 이동하십시오 — 리소스 그룹 — 만들기.

'앱이름'_dev로 이름을 지정한 리소스 그룹을 귀하의 지역에 만들고, 검토 + 생성을 클릭하세요. 이것은 우리의 개발 리소스 그룹이 될 것입니다. 필요하면 나중에 테스트 및 프로덕션 그룹을 만들 수도 있습니다.

![이미지](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_1.png)

2. 홈으로 이동하십시오 — 앱 서비스 — 만들기 — 웹 앱



구독을 선택하고 방금 만든 같은 리소스 그룹을 선택하십시오:

![image](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_2.png)

다음과 같이 인스턴스 세부 정보를 입력하십시오:

이름: 'your_app의_이름'



발행: 코드

런타임 스택: Node 18 LTS

운영 체제: 리소스 그룹에 따라 Linux 또는 Windows를 선택하실 수 있습니다. 저는 여기서는 Linux를 선택했습니다.

지역: 리소스 그룹과 동일한 지역



가격제도: 당신만의 요금제를 선택하세요. 개인 프로젝트의 경우, 무료 F1 요금제가 충분할 것입니다.

![이미지](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_3.png)

모든 필드를 채운 후에는 배포를 구성하기 위해 다음을 클릭할 수 있습니다.

만약 당신의 애플리케이션이 Windows에서 실행 중이라면, 직접 지속적인 배포를 설정할 수 있습니다. Azure는 Linux에서 F1 요금제로 실행 중인 앱에 대해 이 기능을 지원하지 않습니다. 걱정마세요, 앱 서비스가 생성된 후 지속적인 배포를 설정할 것입니다.



![이미지](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_4.png)

나머지 단계는 선택 사항입니다. 빠르게 "검토 + 만들기"로 이동할 수 있어요. 만들기를 클릭하면 앱 서비스 배포가 진행 중임을 확인할 수 있어요.

![이미지](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_5.png)

3. 배포가 완료되면 몇 분만 걸릴 것입니다. "홈 - 앱 서비스"로 이동하면 새로운 앱 서비스가 표시되며 확인할 수 있을 거예요.



![이미지](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_6.png)

브라우즈 버튼을 클릭하거나 다음 URL(https://'name_of_your_app'.azurewebsites.net)로 이동하여 아래 페이지를 확인할 수 있습니다. Azure에서 웹 앱에 대한 콘텐츠를 받지 못했다는 일반적인 문제 해결 페이지입니다.

![다른 이미지](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_7.png)

그러니 이제 프로젝트를 배포하고 Azure에서 지속적인 배포를 설정해 봅시다.



## 프로젝트 설정 (GitHub에서 이미 레포지토리를 가지고 있으면 이 부분을 건너뛰세요)

이미 프로젝트를 설정한 적이 없다면, 이 섹션에서는 React 앱을 Vite를 사용하여 설정하는 방법을 보여드립니다. 저는 개인적으로 Microsoft 튜토리얼에서는 Create React App을 사용하는 경향이 있지만, Vite를 사용하는 것을 선호합니다.

제 경험상, Vite 같은 빠른 빌드 도구를 사용하면 개발 프로세스를 가속화할 수 있어 개발자 경험을 향상시키고 응용 프로그램 구축에 더 집중할 수 있습니다. Vite의 테스트 러너 Vitest 역시 속도가 빠르며 빠른 피드백을 제공해주어 테스트 주도 개발(TDD)을 할 때 특히 큰 도움이 됩니다.

일반적으로 사용하는 빌드 도구가 Create React App인 경우, 여러분이 평소처럼 React 애플리케이션을 구동시키세요.



Vite와 npm을 사용하는 경우, 다음 명령어로 새 React 애플리케이션을 만들 수 있어요:

```js
npm create vite@latest
```

Vite로 빌드하는 데 더 많은 정보를 원하시면 여기를 확인해 보세요: https://vitejs.dev/guide/

프로젝트 이름을 입력하고, React를 선택하고, JavaScript/TypeScript를 선택하도록 프롬프트를 따라가세요.



<img src="/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_8.png" />

이제 Vite가 마법을 부리며 프로젝트 구조를 설정할 것입니다. 완료되면 터미널에서 다음 명령어를 입력하세요:

```js
cd {name_of_your_app} # 프로젝트 디렉토리로 이동
npm install # 프로젝트 의존성 설치
npm run dev # 개발 모드에서 어플리케이션 실행. 기본적으로 5173포트에서 실행됩니다.
```

http://localhost:5173으로 이동하여 방금 생성한 React 프로젝트를 확인하세요.



<img src="/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_9.png" />

지금 깃허브에서 새 저장소를 생성하고 프로젝트 코드를 모두 커밋해주세요. 그럼 GitHub Actions를 사용하여 Azure App Service로 배포할 수 있게 됩니다.

## GitHub Actions를 활용한 지속적 배포

Azure App Service는 BitBucket, GitHub, Local Git, 그리고 Azure Repos와 같은 다양한 플랫폼과의 연속적 배포를 통합할 수 있습니다.



깃허브 액션을 사용하여 Azure로 배포하는 두 가지 방법이 있습니다. 이 방법 중 하나는 앱 서비스 배포 센터를 사용하는 것입니다. Azure는 배포 센터를 사용하는 방법에 대해 자세한 안내를 제공하고 있습니다: [링크](https://learn.microsoft.com/en-us/azure/app-service/deploy-github-actions?tabs=applevel#use-the-deployment-center)

배포 센터를 사용하는 것이 빠르고 간단하긴 하지만, 처음으로 배포하는 경우에는 Azure가 워크플로 파일을 자동으로 생성하여 선택한 브랜치로 푸시하고, 이로 인해 워크플로 실행이 트리거됩니다. 처음 실행은 실패할 것입니다. 이는 워크플로 파일의 배포 경로가 루트 경로(".")로 설정되어 있고, GitHub 액션이 전체 소스 코드가 아닌 'dist' 폴더만을 배포하도록 시도하기 때문입니다.

자동으로 생성된 파일의 다른 부분을 수정하여 워크플로에서 폐기된 액션을 사용하지 않도록 변경하고 싶을 것입니다.



나는 필요하다면 배포 센터를 사용하는 대신에 나만의 워크플로 파일을 구성하는 것을 선호해요.

이를 위해 프로젝트 루트 디렉토리에 .github/workflows/ 폴더를 만들고 main_'name_of_your_app'.yml로 명명된 다음의 워크플로 파일을 추가해주세요:

```js
# Azure Web Apps 배포 동작에 대한 문서: https://github.com/Azure/webapps-deploy
# Azure를 위한 더 많은 GitHub Actions: https://github.com/Azure/actions

name: Azure Web App로 Node.js 앱 빌드 및 배포 - {name_of_your_app}

# 변경이 main 브랜치로 푸시될 때마다 워크플로를 실행합니다
on:
  push:
    branches:
      - main
  workflow_dispatch:

# 선택 사항: 여기서 환경 변수를 주입할 수 있습니다
# 이러한 변수를 저장소 설정 - Secrets 및 변수 - Actions - 변수에 추가할 수 있어요
env:
  VITE_ENV_VAR1: ${ env.VITE_ENV_VAR1 }
  VITE_ENV_VAR2: ${ env.VITE_ENV_VAR2 }

# 이 워크플로에는 빌드와 배포 두 가지 작업이 있습니다
jobs:
 # 애플리케이션을 프로덕션용으로 빌드합니다
 # 프로덕션 환경을 가능한 가깝게 구성해야 합니다. 예: 리눅스 앱에는 Ubuntu를 사용하고, 동일한 Node 버전을 사용하는 등
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Node.js 버전 설정
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'

      - name: 의존성 설치, 빌드 및 테스트
        run: |
          npm install
          npm run build --if-present
          npm run test --if-present
         # 다른 스크립트가 구성되어 있다면 이곳에 추가해주세요. 예: linting, 포맷팅

      - name: 배포 작업용 아티팩트 업로드
        uses: actions/upload-artifact@v3
        with:
          name: node-app
          path: dist # 배포 경로여야 합니다. 루트 경로가 아니에요
 
 # Azure로 애플리케이션 배포
  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'Production'
      url: ${ steps.deploy-to-webapp.outputs.webapp-url }

    steps:
      - name: 빌드 작업으로부터 아티팩트 다운로드
        uses: actions/download-artifact@v3
        with:
          name: node-app

      - name: 'Azure Web App로 배포'
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v2
        with:
          app-name: {name_of_your_app}
          slot-name: 'Production'
          publish-profile: ${ secrets.AZUREAPPSERVICE_PUBLISHPROFILE } # 발행 프로필은 항상 Secrets에 저장되어야 합니다.
          package: .
```

이 파일을 main 브랜치에 커밋하기 전에 Secrets와 환경 변수(있는 경우)를 구성해야 합니다. Secrets는 기본적으로 기밀 환경 변수입니다. 비밀이 생성되면 삭제하거나 덮어씌울 수 있지만 표시할 수는 없어요.



Azure 게시 프로필에는 Azure 앱 서비스로 배포하는 데 필요한 기밀 정보가 포함되어 있습니다. 이는 민감한 데이터이므로 이를 비밀로 저장해야 합니다. 이후 워크플로에서 반복적으로 사용할 수 있습니다.

게시 프로필을 얻기 위해 앱 서비스의 개요 페이지로 이동하고 게시 프로필 다운로드를 클릭할 수 있습니다.

![게시 프로필 다운로드](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_11.png)

다운로드한 파일의 내용을 복사하여 GitHub 시크릿의 값으로 다음 단계에서 사용할 수 있도록 합니다. 이제 Azure 포털을 떠나 GitHub 프로젝트 페이지로 다시 이동할 수 있습니다.



Settings — Secrets and variables — Actions — secrets 에서 Secrets 및 변수를 추가할 수 있어요.

![이미지1](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_12.png)

![이미지2](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_13.png)

그럼 다음 시크릿을 만들게요:



AZUREAPPSERVICE_PUBLISHPROFILE='발행 프로필 내용'

이제 모든 설정이 완료되었습니다. 워크플로 파일을 메인 브랜치에 푸시하면 GitHub의 작업 탭에서 워크플로 실행을 볼 수 있어야 합니다.

워크플로가 성공적으로 실행된 경우, React 앱이 Azure에 배포된 것을 의미합니다.

애플리케이션이 Windows에서 실행 중이라면, 축하합니다! 이제 https://'앱의_이름'.azurewebsites.net를 클릭하여 애플리케이션을 실행할 수 있어야 합니다.



![이미지](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_14.png)

## Linux를 사용하는 경우의 마지막 단계

Linux를 사용하고 위의 모든 단계를 올바르게 따르셨서 Azure가 콘텐츠를 인식하지 않는 이유에 대해 궁금하실 수 있습니다:

![이미지](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_15.png)



이는 Linux에서 실행되는 응용 프로그램이 추가적인 시작 명령인 pm2 serve /home/site/wwwroot --no-daemon이 필요하기 때문입니다. 이를 추가하려면 Azure App Service 페이지로 이동하여 - 설정 - 구성 - 일반 설정 - 시작 명령으로 이동한 다음, pm2 serve /home/site/wwwroot --no-daemon을 붙여 넣고 저장하시면 됩니다.

![이미지](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_16.png)

PM2는 Linux에서 NodeJS 애플리케이션을 제공하고 관리할 수 있는 NodeJS 프로세스 관리자입니다. Azure App Service Linux의 Node.js 컨테이너에는 기본적으로 PM2가 설치되어 있으므로 기본적으로 CLI를 사용할 수 있습니다. App Service Linux에서 PM2를 사용하는 자세한 정보는 여기에서 확인할 수 있습니다: https://azureossd.github.io/2022/02/22/Using-PM2-on-App-Service-Linux/

이제 https://'name_of_your_app'.azurewebsites.net으로 돌아가서 응용 프로그램이 성공적으로 제공되는 것을 확인할 수 있습니다.



![image](/assets/img/2024-05-12-HowtodeployaViteReactapptoAzureAppServiceusingCICDPipelinesGitHubActions_17.png)

여기에 있습니다. 이제 Azure App Service에서 호스팅되는 Vite + React 애플리케이션이 있습니다. 또한 코드 변경이 메인 브랜치로 푸시될 때마다 GitHub Actions가 워크플로를 실행하여 앱을 Azure로 테스트, 빌드 및 배포합니다.

GitHub의 예제 프로젝트: https://github.com/d3v-g/medium-deploy-react-app