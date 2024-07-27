---
title: "우분투 2204, 2004 및 1804에서 Intel x64, AMD, ARM64 CPU용 Nodejs 20 설치하는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoInstallNodejs20onUbuntu22042004and1804forIntelx64AMDandARM64CPUs_0.png"
date: 2024-06-20 07:32
ogImage: 
  url: /assets/img/2024-06-20-HowtoInstallNodejs20onUbuntu22042004and1804forIntelx64AMDandARM64CPUs_0.png
tag: Tech
originalTitle: "How to Install Node.js 20 on Ubuntu 22.04, 20.04, and 18.04 for Intel x64, AMD, and ARM64 CPUs"
link: "https://medium.com/@gmusumeci/how-to-install-node-js-20-on-ubuntu-22-04-20-04-and-18-04-for-x64-amd-and-arm64-cpus-232d0f3c9f08"
---


<img src="/assets/img/2024-06-20-HowtoInstallNodejs20onUbuntu22042004and1804forIntelx64AMDandARM64CPUs_0.png" />

이 이야기에서는 Intel/AMD 및 ARM64 CPU에서 실행 중인 Ubuntu 22.04, 20.04 및 18.04에 Node.js v20.x를 무인으로 설치하는 방법을 배우게 됩니다.

# 가장 오래된 버전의 Node.js 삭제하기

선택적 단계: Node.js 버전 20.x를 설치하기 전에 아래의 BASH 명령어를 사용하여 가장 오래된 Node.js 버전을 삭제할 수 있습니다:

<div class="content-ad"></div>

```js
sudo apt-get remove nodejs
```

## 우분투 Intel/AMD CPU에 NodeJS 설치 방법:

아래는 INTEL/AMD CPU에 Node.js 버전 20.x를 설치하는 데 필요한 문장들입니다:

```js
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt update
sudo apt install -y nodejs
```

<div class="content-ad"></div>

# 우분투 ARM64 CPU에 NodeJS 설치 방법:

아래는 ARM64 CPU에서 Node.js 버전 20.x을 설치하는 데 필요한 문장들입니다:

```js
nodeVersion=20.14    
sudo apt-get remove nodejs
wget "https://nodejs.org/dist/v${nodeVersion}.0/node-v${nodeVersion}.0-linux-arm64.tar.gz"
tar -xvf "node-v${nodeVersion}.0-linux-arm64.tar.gz"
sudo cp "node-v${nodeVersion}.0-linux-arm64" "/etc/node${nodeVersion}" -r
sudo ln -s "/etc/node${nodeVersion}/bin/node" /usr/bin/node
sudo ln -s "/etc/node${nodeVersion}/bin/npm" /usr/bin/npm
```

# Node.js 설치 확인

<div class="content-ad"></div>

아래 명령을 실행하여 설치가 완료되었는지 확인해보세요:

```js
guillermo@kopi-vm:~$ node -v
v20.14.0
```

이게 전부에요! 만약 이 이야기를 좋아했다면, 👏을 눌러 지원을 보여주세요. 읽어 주셔서 감사합니다!