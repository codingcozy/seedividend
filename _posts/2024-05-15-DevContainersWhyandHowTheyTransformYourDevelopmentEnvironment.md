---
title: "개발 컨테이너 - 왜 필요하고 어떻게 개발 환경을 변화시키는지"
description: ""
coverImage: "/assets/img/2024-05-15-DevContainersWhyandHowTheyTransformYourDevelopmentEnvironment_0.png"
date: 2024-05-15 15:49
ogImage: 
  url: /assets/img/2024-05-15-DevContainersWhyandHowTheyTransformYourDevelopmentEnvironment_0.png
tag: Tech
originalTitle: "Dev Containers — Why and How They Transform Your Development Environment"
link: "https://medium.com/@feh-araujo/dev-containers-296b8dbd2cf9"
isUpdated: true
---




소프트웨어 개발 세계에서 일관성 있는 신뢰할 수 있는 개발 환경은 생산성과 효율성에 중요합니다. 전통적인 로컬 개발 환경은 모든 것을 수동으로 설치하는 것으로, 호환성 문제, 의존성 및 버전 충돌 문제, 그리고 광범위한 설정과 구성이 필요한 문제에 직면할 수 있습니다. 여기서 도커 개발 컨테이너가 나오면 개발 경험을 혁신할 수 있습니다.

🇧🇷 Portuguese version here!

![이미지](/assets/img/2024-05-15-DevContainersWhyandHowTheyTransformYourDevelopmentEnvironment_0.png)

## 도커 개발 컨테이너란 무엇인가요?



특정 프로젝트를 만들기 위한 모든 도구가 들어 있는 상자를 상상해 보세요. 목공에 필요한 공구 상자처럼 망치, 톱 등이 들어 있습니다. Docker 개발 컨테이너는 이와 같은 상자와 비슷하지만 소프트웨어 개발을 위한 것입니다. 가상 환경에 사전 설치된 필수 소프트웨어가 모두 포함되어 사용할 준비가 된 상태입니다.

Docker 개발 컨테이너는 Docker 기술을 활용하여 완전한 개발 환경을 포장한 가벼운, 격리된 환경입니다 (당신의 공구 상자!). 이러한 컨테이너는 특정 프로젝트를 개발하는 데 필요한 모든 도구, 라이브러리 및 런타임 구성을 캡슐화합니다. 개발자가 개발 컨테이너를 실행하면 로컬에서 작업한 코드 변경 사항이 클라우드로 배포될 때나 여러 사람이 함께 작업할 때와 동일하게 잘 작동함을 보장합니다.

# 일관되고 재사용 가능한 환경

개발 컨테이너를 사용하면 팀 내 모든 사람이 자신이 사용하는 컴퓨터에 상관없이 동일한 설정을 사용할 수 있습니다. 모두가 약간 다른 오븐과 재료로 케이크를 구워야 하는 대신, 개발 컨테이너는 모두가 정확히 같은 오븐과 같은 레시피를 사용하도록 보장합니다. 이는 한 명이 작업한 프로젝트가 다른 사람에게도 동일하게 작동하며, 새 팀원이 합류할 때 자신의 환경을 처음부터 설정하지 않고도 즉시 코딩을 시작할 수 있음을 의미합니다.



# Visual Studio Code에서 개발 컨테이너 확장 기능 사용하기

Visual Studio Code의 Dev Containers 확장 기능을 사용하면 개발 컨테이너를 쉽게 다룰 수 있어요. 이렇게 사용하는 방법에 대해 간단히 설명해 드릴게요:

- 복잡한 설정을 건드릴 필요 없이 VS Code 내에서 새로운 개발 컨테이너를 설정할 수 있어요. 미리 만들어진 템플릿 중 하나를 사용하거나 직접 정의해서 시작할 수 있어요.
- 이 확장 기능을 사용하면 다른 개발 환경간에 매끄럽게 전환할 수 있어요. 여러 대의 컴퓨터 환경을 여러 개 설정하지 않아도 되고, 일반적으로 발생하는 복잡함이 없어요.
- 코드 작업은 로컬 데스크탑에서 작업하는 것과 같아요. 실제 코드가 컨테이너 안에서 실행되더라도, VS Code 내에서 프로젝트를 수정, 실행, 디버그할 수 있어요. 이미 익숙한 인터페이스를 통해 작업할 수 있어요.



`devcontainer.json` 파일은 실제로 개발 컨테이너의 청사진입니다. 개발 환경에 필요한 모든 것을 지정합니다. 

- 사용할 기본 이미지: 이는 개발 환경의 "OS"를 선택하는 것과 같습니다. 간단한 Ubuntu 환경이나 좀 더 사용자 정의된 것이 될 수 있습니다.
- 필요한 소프트웨어: 컨테이너에 미리 설치되어야 하는 모든 도구와 프로그램을 나열합니다. 이는 이러한 설정을 수동으로 설정하는 시간을 낭비하지 않아도 된다는 것을 의미합니다.
- 설정과 확장: 파일은 또한 VS Code의 구성 설정을 포함하거나 자동으로 설치되어야 하는 확장을 나열할 수도 있습니다.

이 구성 파일을 사용하면 누구나 이 개발 컨테이너를 사용할 때 개인 컴퓨터에 관계없이 정확히 동일한 설정을 가질 수 있으며, "내 컴퓨터에서는 잘 되는데" 문제를 피하는 데 도움이 됩니다.

제 CDK에 관한 글에서 devcontainer.json을 살펴보겠습니다:



```json
{
    "name": "aws-dev-container",
    "image": "mcr.microsoft.com/devcontainers/typescript-node:1-18-bookworm",
    "features": {
        "ghcr.io/devcontainers/features/aws-cli:1": {},
        "ghcr.io/devcontainers-contrib/features/aws-cdk:2": {}
    },
    "customizations": {
        "vscode": {
            "extensions": [
                "dbaeumer.vscode-eslint",
                "eamodio.gitlens",
                "firsttris.vscode-jest-runner",
                "ryanluker.vscode-coverage-gutters",
                "humao.rest-client"
            ]
        }
    },
    "remoteUser": "root"
}
```

- name: 이 키는 여러 개의 컨테이너 중에서 쉽게 식별할 수 있게 도와주는 개발 컨테이너의 친근한 이름을 할당합니다.
- image: 개발 컨테이너의 기본으로 사용할 Docker 이미지를 지정합니다. 이것은 운영 체제와 미리 설치된 언어나 프레임워크를 결정합니다. 위 예에서는 이미 NodeJS와 Typescript가 설치된 이미지를 사용했습니다.
- features: 이것이 개발 컨테이너의 가장 좋은 ... 기능 중 하나입니다. "기능"은 컨테이너에 자동으로 설치되는 추가적인 도구나 유틸리티입니다. 이것들은 일반적으로 특정 기능을 가진 컨테이너의 기본 기능을 확장하기 위해 사용됩니다. 이 예에서는 AWS CLI와 CDK를 추가했습니다. 컨테이너에 추가할 수 있는 전체 기능 목록을 여기에서 찾을 수 있습니다.
- customizations: VS Code를 위해 개발 환경을 사용자 정의할 수 있게 합니다.
- extensions: 컨테이너에 자동으로 설치할 VS Code 확장 목록을 나열합니다. 수동으로 설정하지 않고 개발 경험을 향상시키는 데 사용됩니다.
- remoteUser: 컨테이너 내에서 VS Code 서버가 실행될 기본 사용자를 지정합니다. 이는 컨테이너 내 파일과 프로세스에 대한 권한 및 액세스에 영향을 미칩니다. 예를 들어 root는 일반적으로 컨테이너 내의 모든 것을 수정할 수 있는 루트 사용자로 작동한다는 것을 의미합니다.

# 개발 컨테이너 사용

개발 컨테이너를 사용하려면 먼저 Dev Containers 확장을 설치해야 합니다.




디브 컨테이너 구성 파일(devcontainer.json)은 프로젝트의 루트인 .devcontainer 폴더에 위치합니다.

이 구성으로 처음으로 프로젝트를 열 때 VS Code가 제안을 안내해줍니다.

![이미지](/assets/img/2024-05-15-DevContainersWhyandHowTheyTransformYourDevelopmentEnvironment_1.png)

VS Code는 컨테이너 구성을 감지하고 프로젝트를 컨테이너 내에서 열지 원하는 지 물어봅니다. "컨테이너에서 다시 열기"를 선택하면 Docker 이미지와 컨테이너가 생성됩니다. 화면이 다시 로드되고 VS Code가 컨테이너에 연결됩니다.



"Command Palette"를 통해 컨테이너를 빌드/재빌드할 수도 있습니다.

![이미지](/assets/img/2024-05-15-DevContainersWhyandHowTheyTransformYourDevelopmentEnvironment_2.png)

컨테이너가 생성되면, devcontainer.json 구성에 설명된 대로 환경을 갖게 됩니다.

# devcontainer.json을 사용한 기본 구성



devcontainer.json 파일은 dev container 구성의 핵심입니다. 위에서 보신 것처럼 다양한 설정 및 기능을 직접 지정할 수 있어 개발 환경을 쉽게 설정하고 "features"로 매우 사용자 정의할 수 있습니다.

# Dockerfile로 고급 설정하기

더 많은 사용자 정의 및 모듈식 설정이 필요한 경우 Dockerfile을 가리키는 방식으로 devcontainer.json 구성을 확장할 수 있습니다. 이 방법을 통해 환경에 대한 보다 큰 유연성과 제어가 가능해집니다.

```json
{
    "name": "aws-dev-container",
    "build": {
        "dockerfile": "Dockerfile"
    },
    "customizations": {
        "vscode": {
            "extensions": [
                "dbaeumer.vscode-eslint",
                "eamodio.gitlens",
                "firsttris.vscode-jest-runner",
                "ryanluker.vscode-coverage-gutters",
                "humao.rest-client"
            ]
        }
    },
    "remoteUser": "root"
}
```



질문이나 제안이 있으면 댓글을 남겨주세요. 함께 배우는 모두에게 도움이 될 거에요! 🤠