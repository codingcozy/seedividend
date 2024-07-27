---
title: "React 앱을 Azure Webapp에 배포하는 방법 다단계 Azure YAML 파이프라인 사용하기"
description: ""
coverImage: "/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_0.png"
date: 2024-06-20 02:22
ogImage: 
  url: /assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_0.png
tag: Tech
originalTitle: "Deploy React App to Azure Webapp using muti stage Azure YAML Pipeline"
link: "https://medium.com/@prasad.reddy0708/deploy-react-app-to-azure-webapp-using-muti-stage-azure-yaml-pipeline-99444112437f"
---


이 글에서는 Azure YAML Pipeline을 사용하여 React 앱을 Azure Webapp에 배포하는 배포 프로세스를 안내하겠습니다.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_0.png)

# 웹 앱 생성하기

- Azure 포털에 로그인하고 자격 증명으로 이동하세요: https://portal.azure.com/#home
- 검색 창에서 App Services를 찾아 서비스 아래에서 해당 옵션을 선택합니다.

<div class="content-ad"></div>


![image](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_1.png)

3. 클릭하여 Web App 옵션을 선택하고 새 웹 앱을 만듭니다. 아래와 같이 요구 사항에 맞게 웹 앱을 구성하세요.

이름: 웹 앱의 이름 (참고:이 이름은 Azure 전체에서 고유해야합니다.)
런타임 스택: 노드
운영 체제: 리눅스
가격 책정: 요구 사항에 가장 적합한 계획을 선택하세요.

![image](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_2.png)


<div class="content-ad"></div>


![Image 3](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_3.png)

![Image 4](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_4.png)

![Image 5](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_5.png)

![Image 6](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_6.png)


<div class="content-ad"></div>

4. '만들기' 버튼을 클릭한 후에는 새 웹 앱 생성 프로세스가 시작됩니다.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_7.png)

5. 웹 앱이 성공적으로 생성된 후에 '리소스로 이동' 버튼을 클릭하세요.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_8.png)

<div class="content-ad"></div>

6. 빈 템플릿 페이지가 표시됩니다.

![템플릿 페이지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_9.png)

![템플릿 페이지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_10.png)

# 서비스 연결 생성

<div class="content-ad"></div>

7. 웹 앱이 생성되었으니, Azure YAML 파이프라인을 사용하여 React 앱을 웹 앱에 배포하는 데 집중해 봅시다.

8. https://dev.azure.com/ 로 이동하여 자격 증명으로 로그인하세요.

9. 아래 이미지에서와 같이 조직 및 프로젝트를 선택하세요.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_11.png)

<div class="content-ad"></div>

10. Azure의 리소스와 통신하기 위해 파이프라인에 서비스 연결을 생성하려면 프로젝트 설정을 클릭해주세요.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_12.png)

11. 서비스 연결을 만들기 위해 서비스 연결 - `새 서비스 연결`을 클릭해주세요.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_13.png)

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_14.png)

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_15.png)

12. 원하는 서비스 연결을 만들 Subskription을 드롭다운에서 선택하고 이름을 지정하세요.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_16.png)

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmultistageAzureYAMLPipeline_17.png" />

# YAML 파이프라인 생성

14. 프로젝트 폴더 루트에 React 소스 코드를 포함하는 azure-pipelines.yml이라는 새 YAML 파일을 만듭니다.

아래 변수의 값을 해당 값으로 대체합니다.
azureSubscription: your_service_connection_name (이미지 #12에 표시된 서비스 연결 이름)
webAppName: your_webapp_name (이미지 #3에 표시된 Web App 이름)

<div class="content-ad"></div>

아래 파이프라인에서 deploy 단계 환경인 dev는 dev 환경으로 코드를 배포하기 위한 승인을 받기 위해 사용됩니다. 비슷하게, 추가 단계를 추가하여 test 및 prod 환경으로 배포할 수 있습니다.

```js
trigger:
  - dev

pool:
  vmImage: ubuntu-latest

variables:
  azureSubscription: "azure-pipelines-azure-sc"
  webAppName: demo-react-linux-webapp

stages:
  - stage: build
    displayName: build
    jobs:
      - job: "build"
        displayName: build job
        steps:
          - task: NodeTool@0
            inputs:
               versionSource: "spec"
               versionSpec: "20.x"

          - script: |
               npm install
               npm run build --if-present
            displayName: "npm install, build"

          - task: ArchiveFiles@2
            inputs:
               rootFolderOrFile: "$(System.DefaultWorkingDirectory)/build"
               includeRootFolder: false
               archiveType: "zip"
               archiveFile: "$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip"
               replaceExistingArchive: true
            
          - task: PublishBuildArtifacts@1
            inputs:
               PathtoPublish: "$(Build.ArtifactStagingDirectory)"
               ArtifactName: "drop"
               publishLocation: "Container"

  - stage: deploy
    displayName: "Deploy to the dev environment"
    dependsOn: Build
    condition: succeeded()
    jobs:
      - deployment: Deploy
        environment: dev
        strategy:
           runOnce:
             deploy:
               steps:
                 - task: AzureRmWebAppDeployment@4
                   inputs:
                      ConnectionType: "AzureRM"
                      azureSubscription: "$(azureSubscription)"
                      appType: "webAppLinux"
                      WebAppName: "$(webAppName)"
                      packageForLinux: "$(Pipeline.Workspace)/drop/$(Build.BuildId).zip"
                      #아래 StartupCommand는 리눅스 환경에서 React 앱을 실행하는 데 필요합니다.
                      StartupCommand: "pm2 serve /home/site/wwwroot/ --no-daemon --spa"
```

<img src="/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_18.png" />

15. Azure DevOps의 Repo에 코드를 게시하세요.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_19.png" />

16. DevOps 포털로 이동하여 파이프라인을 클릭하고, "파이프라인 - 새 파이프라인"을 선택하여 새 파이프라인을 생성하세요.

<img src="/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_20.png" />

17. 코드가 포함된 Azure YAML 파이프라인이 있는 리포지토리를 찾아보세요.

<div class="content-ad"></div>


![Table 1](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_21.png)

![Table 2](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_22.png)

![Table 3](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_23.png)

# 환경 변수 구성


<div class="content-ad"></div>

18. 우리는 App.js 파일의 React 코드에서 REACT_APP_ENVIRONMENT라는 환경 변수를 사용하고 있습니다. 따라서 파이프라인에도 환경 변수를 생성해 봅시다.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_24.png)

19. Variables - 새 변수를 클릭해주세요.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_25.png)

<div class="content-ad"></div>


![image 1](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_26.png)

![image 2](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_27.png)

![image 3](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_28.png)

20. If you have multiple environment variables to configure, repeat Step #19.


<div class="content-ad"></div>

21. 파이프라인을 실행하려면 실행 옵션을 클릭하세요.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_29.png)

22. 빌드 단계가 진행 중입니다.

![이미지](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_30.png)

<div class="content-ad"></div>

23. 빌드 프로세스가 완료되면 배포 단계로 이동합니다. "View" 버튼을 클릭하여 배포를 승인하세요.

![이미지1](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_31.png)

![이미지2](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_32.png)

![이미지3](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_33.png)

<div class="content-ad"></div>


![Deployment successful](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_34.png)

24. Deployment completed successfully!!!

![React App deployed](/assets/img/2024-06-20-DeployReactApptoAzureWebappusingmutistageAzureYAMLPipeline_35.png)

24. Browse the Web App and you can see React App is deployed successfully. The environment variable value that we configured in Step #19 is displayed here.


<div class="content-ad"></div>

안녕하세요! 위 문서를 읽어주셔서 감사합니다. 만약 이 레포지토리가 도움이 되었다면, 별풍선을 주시고 저를 팔로우해주세요. 앞으로도 많은 유익한 글을 공유할 예정이에요. 감사합니다!