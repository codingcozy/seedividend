---
title: "Windows 11에서 Rust 개발을 위한 Dev Container 설정 방법"
description: ""
coverImage: "/assets/img/2024-07-10-SettingupaDevContaineronWindows11forRustDevelopment_0.png"
date: 2024-07-10 02:23
ogImage: 
  url: /assets/img/2024-07-10-SettingupaDevContaineronWindows11forRustDevelopment_0.png
tag: Tech
originalTitle: "Setting up a Dev Container on Windows 11 for Rust Development"
link: "https://medium.com/init-deep-dive/setting-up-a-dev-container-on-windows-11-for-rust-development-83038cc11af3"
---


![이미지](/assets/img/2024-07-10-SettingupaDevContaineronWindows11forRustDevelopment_0.png)

파이썬 OpenCV 구현보다 더 효율적인 비디오 처리 도구에 관심을 가지고 있습니다. FFMPEG를 사용하면 빠른 비디오 처리가 가능하지만 때로는 컴퓨터 비전과 같이 좀 더 고급 기술을 시도하고 싶을 수도 있습니다.

저는 비디오 편집 크레이트를 시도하기로 결정했고, LLVM 및 OpenCV의 다양한 설치에 vcpkg, chocolatey, pacman 및 소스에서 설치 등을 8시간 넘게 썼던 것 같습니다. 이러한 해결책은 저에게 맞지 않았습니다.

이 경험을 토대로 현재와 앞으로 Rust 개발 환경으로 Docker 개발 컨테이너를 사용하기로 결정했습니다. 또한 개발 컨테이너를 사용할 이유가 없다고 생각하지 못합니다. 파일 시스템에 액세스해야 하는 경우? 해당하는 볼륨이 있습니다. 카메라, GPU 또는 장치를 사용해야 하는 경우? 겪을 수는 있지만 해결할 수 있습니다. 신경쓰이는 부분 중 하나는 도커 컨테이너를 시스템 재부팅 및 새 프로젝트에서 다시 빌드해야 한다는 점이 아닐까 싶습니다.

<div class="content-ad"></div>

다음은 내 Dockerfile이에요:

```js
FROM ubuntu:22.04

RUN apt update -y
RUN apt install -y zip unzip
RUN apt install -y jq libssl-dev gcc zip
RUN apt install -y clang ffmpeg pkg-config
RUN apt install -y clang…
```