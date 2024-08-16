---
title: "React 앱을 위한 GitLab과 Hostinger로 CICD 구현하기 단계별 안내"
description: ""
coverImage: "/assets/img/2024-06-19-ImplementingCICDforReactAppswithGitLabandHostingerAStep-by-StepGuide_0.png"
date: 2024-06-19 23:55
ogImage: 
  url: /assets/img/2024-06-19-ImplementingCICDforReactAppswithGitLabandHostingerAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Implementing CI CD for React Apps with GitLab and Hostinger: A Step-by-Step Guide"
link: "https://medium.com/@deabdullahmanzoor/implementing-ci-cd-for-react-apps-with-gitlab-and-hostinger-a-step-by-step-guide-5fa68cf9214d"
isUpdated: true
---





![이미지](/assets/img/2024-06-19-ImplementingCICDforReactAppswithGitLabandHostingerAStep-by-StepGuide_0.png)

이 가이드에서는 React 애플리케이션을 Hostinger에 배포하기 위한 파이프라인 설정 과정을 안내해 드릴 거에요. 목표는 GitLab 저장소로의 푸시가 웹사이트에 자동 업데이트를 유발하는 배포 프로세스를 자동화하는 것입니다. 이 튜토리얼에서는 GitLab의 강력한 CI/CD 기능을 활용하여 Hostinger에 React 애플리케이션을 배포하는 데 필요한 단계에 대해 자세히 살펴볼 거예요.

Gitlab CI/CD 파이프라인 설정하기

CI/CD 파이프라인을 설정하려면 프로젝트의 루트 디렉토리에 .gitlab-ci.yml 파일을 생성해야 해요. 이 파일은 파이프라인의 단계와 작업을 정의할 거예요. 여기에 React 프로젝트에 대한 샘플 내용이 있어요:


<div class="content-ad"></div>

```js
stages:
  - build
  - deploy

build:
  stage: build
  image: node:latest
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk update && apk add lftp
  script:
    - lftp -c "set ftp:ssl-allow no; open -u $FTP_USERNAME,$FTP_PASSWORD $FTP_SERVER; mirror -Rev ./dist/ /your_hosting_directory --ignore-time --parallel=10; quit"
  only:
    - main
```

이 파일에서 두 개의 스테이지인 build와 deploy를 정의했습니다. build 스테이지는 가장 최신의 Node.js 이미지를 사용하여 프로젝트 종속성을 설치하고 React 어플리케이션을 빌드합니다. 빌드된 파일은 dist/ 디렉터리 아래 artifacts로 저장됩니다.

deploy 스테이지는 가장 최신의 Alpine 이미지를 사용하고 lftp라는 명령 줄 FTP 클라이언트를 설치합니다. 그런 다음, lftp를 사용하여 $FTP_SERVER로 지정된 FTP 서버에 $FTP_USERNAME 및 $FTP_PASSWORD로 지정된 사용자 이름과 비밀번호로 연결합니다. 수정 시간을 무시하고 병렬로 최대 10개의 파일을 업로드하여 dist/ 디렉터리를 FTP 서버의 /your_hosting_directory 디렉터리로 미러링합니다. 이 스테이지는 main 브랜치에서만 실행됩니다.

실제 FTP 자격 증명으로 $FTP_USERNAME, $FTP_PASSWORD 및 $FTP_SERVER를 교체해야 합니다. 이에 대해 확실하지 않다면 걱정하지 마세요. GitLab 프로젝트 설정에서 이러한 자격 증명을 비밀 변수로 설정하는 프로세스를 설명하는 단계에 따라 안내해 드릴 테니 걱정 마세요. 이 접근 방식을 통해 자격 증명이 안전하고 비밀 유지됩니다.


<div class="content-ad"></div>

호스팅에서 FTP 세부정보 가져오기

Hostinger 계정에 로그인합니다: 먼저 Hostinger 계정에 로그인하세요. 로그인 후에 Hostinger 제어판으로 이동하게 됩니다.

호스팅 섹션으로 이동합니다: 제어판에서 "호스팅" 섹션으로 이동하세요. 여기서 모든 호스팅 목록을 볼 수 있습니다. 원하는 호스팅 옆의 "대시보드" 버튼을 클릭하여 FTP 세부정보를 가져오세요. 아래 스크린샷에서 확인할 수 있습니다.

<img src="/assets/img/2024-06-19-ImplementingCICDforReactAppswithGitLabandHostingerAStep-by-StepGuide_1.png" />

<div class="content-ad"></div>

FTP 계정 섹션에 액세스하세요: 화면 왼쪽에 메뉴가 표시됩니다. "파일" 섹션 아래에 있는 "FTP 계정"을 클릭해보세요.

FTP 세부정보를 가져오세요: FTP 계정 섹션에서 호스팅 계정과 관련된 FTP 계정 목록이 나열됩니다. 각 FTP 계정 옆에는 FTP 사용자 이름, FTP 서버, 그리고 숨겨진 비밀번호가 표시됩니다. FTP 비밀번호를 확인하려면 "눈" 아이콘을 클릭하세요.

이 세부정보를 안전하게 보관하는 것을 기억하세요. 다음 섹션에서는 GitLab 프로젝트 설정에서 이러한 세부정보를 사용하여 비밀 변수를 설정하는 방법을 안내해 드리겠습니다.

<div class="content-ad"></div>

GitLab에서 비밀 변수 설정하기

- GitLab 프로젝트로 이동하기: GitLab 계정에 로그인하여 비밀 변수를 설정하려는 특정 프로젝트로 이동합니다.
- 설정에 액세스하기: 프로젝트의 메인 페이지에서 왼쪽 메뉴에 있는 "설정" 옵션을 클릭합니다.
- CI/CD 섹션으로 이동하기: 설정에서 "CI / CD" 섹션을 찾아 클릭합니다.
- 변수 섹션 확장하기: CI / CD 섹션에서 "변수"라는 하위 섹션을 찾아 "확장" 버튼을 클릭합니다.
- 새 변수 추가하기: "변수 추가" 버튼을 클릭합니다. 변수의 키와 값을 입력할 수 있는 필드가 표시됩니다.
- FTP 상세 정보 입력하기: "키" 필드에 변수 이름(예: FTP_USERNAME)을 입력합니다. "값" 필드에 Hostinger에서 가져온 해당 값 입력합니다. 값이 안전하게 유지되도록 "변수 가리기" 옵션이 선택되어 있는지 확인합니다. FTP_PASSWORD 및 FTP_SERVER에 대해서도 이 과정을 반복합니다.
- 변수 저장하기: 각 변수를 저장하려면 "변수 추가" 버튼을 클릭합니다. 모든 변수를 추가한 후 .gitlab-ci.yml 파일에서 사용할 수 있으며 안전하게 보호됩니다.

![이미지](/assets/img/2024-06-19-ImplementingCICDforReactAppswithGitLabandHostingerAStep-by-StepGuide_3.png)

이 변수들은 대소문자를 구분하며 .gitlab-ci.yml 파일에서 사용되는 변수와 정확히 일치해야 합니다.

<div class="content-ad"></div>

거의 다 왔어요, 당신의 CI/CD 파이프라인이 준비되었습니다!

이 튜토리얼에서는 React 애플리케이션을 위한 GitLab 및 Hostinger를 사용하여 CI/CD 파이프라인을 설정하는 과정을 안내했습니다. 우리는 빌드 및 배포 단계를 정의하는 .gitlab-ci.yml 파일을 만드는 방법, Hostinger에서 FTP 세부 정보를 가져오는 방법, 그리고 이러한 세부 정보를 GitLab의 시크릿 변수로 안전하게 설정하는 방법을 배웠습니다.

이 설정을 통해 GitLab 저장소의 주 브랜치에 푸시할 때마다 자동 빌드 및 배포 프로세스가 트리거되어 Hostinger 사이트가 항상 최신 변경 사항과 함께 업데이트됨이 보장됩니다. 이렇게 하면 배포 프로세스를 자동화할 뿐만 아니라 수동 배포로 발생할 수 있는 오류 위험을 줄일 수도 있습니다.

성공적인 CI/CD 파이프라인의 핵심은 정기적인 테스트와 모니터링입니다. 항상 GitLab에서 파이프라인 실행 로그를 확인하여 모든 것이 원활히 동작하는지 확인하세요. 즐거운 코딩하세요! 🙌

<div class="content-ad"></div>

의견이나 질문이 있으시면 답글을 남겨주시거나 연락해주세요. 😊