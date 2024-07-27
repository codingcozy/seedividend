---
title: "엔터프라이즈급 소프트웨어 개발 워크플로우 Makefile, Dockerfile, Jenkinsfile, Pipfile 사용법 - Part 1"
description: ""
coverImage: "/assets/img/2024-07-07-EnterprisegradesoftwaredevelopmentworkflowusingMakefileDockerfileJenkinsfilePipfilePart1_0.png"
date: 2024-07-07 03:19
ogImage: 
  url: /assets/img/2024-07-07-EnterprisegradesoftwaredevelopmentworkflowusingMakefileDockerfileJenkinsfilePipfilePart1_0.png
tag: Tech
originalTitle: "Enterprise grade software development workflow using Makefile, Dockerfile, Jenkinsfile , Pipfile: Part 1"
link: "https://medium.com/@yogender027mae/enterprise-grade-software-development-workflow-using-makefile-dockerfile-jenkinsfile-pipfile-a32cd54013fd"
---


컨티뉴어스 인티그레이션(CI) 파이프라인을 활용한 최고의 가이드

첫 번째 부분에서는 로컬 개발 오케스트레이션에 대해 다뤄보겠습니다. Makefile, Pyenv, 그리고 Pipenv의 강력함을 소개할 거에요.

두 번째 부분에서는 워크플로우를 Jenkinsfile을 사용한 자동화된 CI 파이프라인으로 이전할 거에요. 소프트웨어 테스트, 빌드, 그리고 배포가 Jenkins 서버에 의해 원활하게 이루어질 거예요.

![이미지](/assets/img/2024-07-07-EnterprisegradesoftwaredevelopmentworkflowusingMakefileDockerfileJenkinsfilePipfilePart1_0.png)

<div class="content-ad"></div>

CI(연속 통합)는 개발자로 하여금 자동화 세부 사항을 걱정하지 않고 코딩에 더 집중할 수 있도록 도와줍니다. 로컬 개발 환경 생성 및 테스트부터 원격 환경 설치, 원격 프로덕션 빌드 및 배포까지 매 단계가 효율적으로 처리됩니다. 

개발자가 티켓을 받으면 동료 팀원들의 개발 환경과 완전히 동일한 로컬 개발 환경을 구축해야 합니다. 이를 위해 주로 Pipfile과 Pipfile.lock를 주로 활용합니다. (여기서 더 자세히 설명되어 있습니다.) 환경(또는 가상 환경)을 설정한 후 개발이 시작됩니다. 개발이 완료되면 개발자는 코드를 브랜치에 푸시하고 풀 리퀘스트(PR)를 엽니다.

나머지 팀원들은 Pipfile과...을 사용하여 당신의 환경과 동일한 로컬 환경을 구축하여 개발된 코드를 테스트합니다.