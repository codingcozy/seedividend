---
title: "CI CD 마스터하기 GitHub Actions로 React 앱을 AWS S3에 배포하고 호스팅하기"
description: ""
coverImage: "/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_0.png"
date: 2024-05-12 22:12
ogImage: 
  url: /assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_0.png
tag: Tech
originalTitle: "Mastering CI CD: Deploying a React App to AWS S3 with GitHub Actions and Hosting It"
link: "https://medium.com/cloud-native-daily/mastering-ci-cd-deploying-a-react-js-app-to-aws-s3-with-github-actions-and-hosting-it-b1ce82360331"
isUpdated: true
---




## AWS S3를 사용하여 GitHub Actions로 React.js 앱을 배포하고 호스팅하는 포괄적인 가이드

![이미지](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_0.png)

AWS S3와 GitHub Actions의 강력함을 느껴보세요. 이 포괄적인 가이드는 GitHub Actions를 사용하여 AWS S3에 React.js 앱을 배포하고 호스팅하는 간소화된 과정을 안내합니다. 워크플로우를 간소화하고 확장성을 확보하여 사용자에게 탁월한 경험을 제공하세요. AWS S3 및 GitHub Actions의 잠재력을 펼쳐보세요!

# 목표:



- React.js 애플리케이션의 배포 프로세스를 간단하게 만들어보세요.
- GitHub Actions를 활용하여 배포 파이프라인을 자동화하세요.
- AWS S3를 사용하여 React.js 앱을 확장 가능하게 호스팅하세요.
- 신뢰할 수 있는 배포를 통해 사용자에게 뛰어난 경험을 제공하세요.
- 효율적인 배포와 호스팅을 위한 지식과 도구로 개발자를 지원하세요.

# 요구 사항 :

- React.js에 대한 기본적인 이해
- GitHub 계정으로 저장소 호스팅 및 GitHub Actions 사용
- AWS S3 계정으로 React.js 애플리케이션 호스팅
- GitHub 및 AWS S3에 대한 액세스 및 권한
- YAML 설정에 익숙함
- 명령 줄 인터페이스(CLI) 능숙함

# 따라 할 단계:



- IAM 사용자를 생성하고 AmazonS3FullAccess 정책을 연결하세요.
- 비밀 액세스 키의 .csv 파일을 다운로드하세요.
- S3 버킷을 생성하세요: ACL을 활성화하고 모든 공개 액세스 차단 옵션을 해제하세요.
- GitHub으로 이동하여 공개 저장소를 만드세요.
- 설정으로 이동하여 시크릿을 클릭하세요.
- 다음을 저장할 새로운 리포지토리 시크릿 생성: 액세스 키 ID(AWS_ACCESS_KEY_ID), 비밀 액세스 키(AWS_SECRET_ACCESS_KEY) 및 버킷 이름(AWS_S3_BUCKET).
- React 애플리케이션을 만들고 GitHub 워크플로우를 추가하세요.
- GitHub에 푸시하세요.
- 작업 섹션으로 이동하여 애플리케이션 빌드부터 S3로 업로드까지의 모든 단계를 확인하세요.
- S3의 정적 파일 호스팅을 활성화하고 호스팅된 웹 앱을 볼 수 있는 엔드포인트를 열어보세요.

## 단계 1: IAM 사용자 생성

![이미지 제목](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_1.png)

![이미지 제목](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_2.png)



<img src="/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_3.png" />

## 단계 2: 새로 생성된 사용자의 보안 자격 증명 섹션에서 액세스 키 생성

<img src="/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_4.png" />

## 단계 3: S3 버킷 만들기



버킷에 이름을 지어주시고 ACL을 활성화해주세요.

<img src="/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_5.png" />

모든 공개 액세스 차단 해제를 선택 해제하고 경고를 읽은 후에 선택하세요.

<img src="/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_6.png" />



위의 표를 Markdown 형식으로 변경해주세요.



## 5단계: 레포지토리의 설정으로 이동하여 왼쪽 섹션에서 시크릿을 선택합니다.

![이미지](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_8.png)

## 6단계: 새로운 레포지토리 시크릿을 클릭하고 모든 세부 정보를 추가합니다.

![이미지](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_9.png)




![Image](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_10.png)

![Image](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_11.png)

After creating this, you can see like this

![Image](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_12.png)



## 단계 7: React 앱을 만들고 GitHub Actions 워크플로우 추가하기

```js
npx create-react-app react-gh-action-s3
```

React 앱을 만든 후에, ".github\workflows" 라는 폴더를 하나 추가하고 새 파일을 만들어 "main.yaml"이라고 이름 짓습니다. 아래 코드를 main.yaml 파일에 복사하세요:

![이미지](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_13.png)




```yaml
name: 웹사이트 업로드

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: 코드 확인
        uses: actions/checkout@v2

      - name: Node.js 설정
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: 의존성 설치
        run: npm install

      - name: 앱 빌드
        run: npm run build

      - name: S3에 업로드
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read
        env:
          SOURCE_DIR: build/
          AWS_S3_BUCKET: ${ secrets.AWS_S3_BUCKET }
          AWS_ACCESS_KEY_ID: ${ secrets.AWS_ACCESS_KEY_ID }
          AWS_SECRET_ACCESS_KEY: ${ secrets.AWS_SECRET_ACCESS_KEY }
```

## 단계 8: GitHub에 추가하기

<img src="/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_14.png" />

## 단계 9: Action 섹션으로 이동하여 프로세스 보기하기



코드를 업로드한 후 Action 섹션으로 이동하여 GitHub Actions가 코드를 빌드하고 S3로 업로드하는 과정을 확인해보세요. 처음에는 시간이 조금 걸릴 수 있지만 첫 번째 푸시 이후에는 변경 사항이 처음과 비교했을 때 적으므로 시간이 줄어들 것입니다.

클릭한 후 최근 커밋을 볼 수 있습니다. 그리고 빌드를 클릭하세요. 진행 중인 모든 프로세스를 볼 수 있습니다. 모든 작업이 완료되면 다음을 볼 수 있습니다:

![이미지](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_15.png)

이것은 모든 프로세스가 완료되었고 빌드 파일이 aws에서 제공된 버킷 이름으로 업로드되었음을 의미합니다.



## 단계 10: S3를 웹 호스팅으로 구성

GitHub에서 업로드된 파일을 여기서 볼 수 있습니다.

![이미지](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_16.png)

이제 프로퍼티 섹션으로 이동하여 맨 아래로 스크롤합니다. 정적 웹사이트 호스팅 옵션을 볼 수 있습니다. 편집을 클릭하고 활성화하고 index.html을 index 문서 섹션에 작성하십시오. 그런 다음 변경 사항을 저장하십시오.



![Main image](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_17.png)

이제 정적 웹사이트 호스팅 섹션에 링크가 보입니다. 새 탭에서 열어보세요.

![Image 18](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_18.png)

![Image 19](/assets/img/2024-05-12-MasteringCICDDeployingaReactApptoAWSS3withGitHubActionsandHostingIt_19.png)



React 애플리케이션이 이제 실시간으로 작동 중이에요. 코드를 변경하고 GitHub에 푸시하면, 여기서 몇 초 내에 새로운 변경 사항이 보입니다.

이 게시물을 읽어주셔서 감사합니다! AWS S3에서 GitHub Actions를 사용하여 React.js 애플리케이션을 배포하고 호스팅하는 여정에서 도움이 되었기를 바랍니다. 질문, 피드백 또는 제안이 있으시면 언제든지 연락해주세요. 여러분의 의견은 소중하고 큰 도움이 됩니다.

## 추가 읽을거리: