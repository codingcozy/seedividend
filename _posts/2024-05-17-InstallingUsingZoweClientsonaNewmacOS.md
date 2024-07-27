---
title: "새 macOS에서 Zowe 클라이언트 설치 및 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-InstallingUsingZoweClientsonaNewmacOS_0.png"
date: 2024-05-17 03:58
ogImage: 
  url: /assets/img/2024-05-17-InstallingUsingZoweClientsonaNewmacOS_0.png
tag: Tech
originalTitle: "Installing , Using Zowe Clients on a New macOS"
link: "https://medium.com/@dkelosky/installing-using-zowe-clients-on-a-new-macos-d038743885d5"
---


<img src="/assets/img/2024-05-17-InstallingUsingZoweClientsonaNewmacOS_0.png" />

최근에 Windows에서 macOS로 작업 환경을 "업그레이드"했습니다. 아래는 Zowe Clients(Zowe CLI 및 Zowe Explorer)를 새로 설치하고 새로운 기기를 설정하는 과정을 기록한 것입니다.

# Homebrew

가장 먼저 설치한 소프트웨어는 Homebrew("macOS용 누락된 패키지 관리자")였습니다. Homebrew의 설치는 간단합니다: 명령을 실행하고 대화식 프롬프트를 따르면 됩니다.

<div class="content-ad"></div>

# VS Code, Hyper, & fnm

Homebrew를 설치한 후, 다른 필요한 의존성 패키지를 추가했습니다:

- VS Code (Zowe Explorer를 위한) — `brew install --cask visual-studio-code`
- Hyper (Zowe CLI를 위한 멋진 터미널) — `brew install --cask hyper`
- fnm (Node.js 버전 관리자, nvm의 대체품) — `brew install fnm`

만약 따라 하고 있다면, 설치를 완료하기 위해 `~/.zprofile` 또는 `~/.zshrc`에 이러한 명령어를 추가해야 할 것입니다:

<div class="content-ad"></div>

```js
export PATH=/home/$USER/.fnm:$PATH 
eval "$(fnm env --use-on-cd --version-file-strategy=recursive)"
```

# Node.js

fnm를 사용하여 Node.js를 설치하고 확인하세요:

![이미지](/assets/img/2024-05-17-InstallingUsingZoweClientsonaNewmacOS_1.png)


<div class="content-ad"></div>

# Zowe CLI

Zowe CLI을 설치하고 데몬을 활성화하려면 npm install -g @zowe/cli를 실행하세요:

![이미지](/assets/img/2024-05-17-InstallingUsingZoweClientsonaNewmacOS_2.png)

# Zowe Explorer

<div class="content-ad"></div>

여기로 이동해서 설치 버튼을 클릭해주세요 (VS Code가 처음에 열려있지 않은 경우 두 번 클릭해야 할 수도 있어요):

![이미지](/assets/img/2024-05-17-InstallingUsingZoweClientsonaNewmacOS_3.png)

# 팀 구성

팀 구성을 만들고 zowe 명령을 실행해보세요:

<div class="content-ad"></div>


![Screenshot 1](/assets/img/2024-05-17-InstallingUsingZoweClientsonaNewmacOS_4.png)

Accessing z/OS data sets (after inputting credentials multiple times and selecting “Always allow”:

![Screenshot 2](/assets/img/2024-05-17-InstallingUsingZoweClientsonaNewmacOS_5.png)

# Summary


<div class="content-ad"></div>

시작부터 끝까지, 새 macOS에서 Zowe CLI와 Zowe Explorer를 설치하고 실행하는 데는 중단이 많이 발생하더라도 약 30분이 소요됩니다.