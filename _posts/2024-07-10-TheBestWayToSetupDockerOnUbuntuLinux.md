---
title: "우분투 리눅스에서 Docker 설정하는 최고의 방법"
description: ""
coverImage: "/trivasor.github.io/assets/no-image.jpg"
date: 2024-07-10 02:43
ogImage: 
  url: /trivasor.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "The Best Way To Setup Docker On Ubuntu Linux"
link: "https://medium.com/@it-delinquent/the-best-way-to-setup-docker-on-ubuntu-linux-90aaba559971"
---


리눅스에서 Docker 인스턴스를 많이 생성해본 경험이 있어서, 이제는 그 방법이 내게 익숙해 졌어요. 하지만 어느 때는 우분투 리눅스에서 Docker를 설정하는 가장 좋은 방법을 전혀 몰랐던 적이 있었죠.

다양한 방법과 자습서들을 수없이 시도해봤지만, 모두 뭔가 빠진 게 있었어요. 이로 인해 설치가 제대로 작동하지 않거나 확장하기 어려운 경우가 종종 있었답니다.

저의 우분투 리눅스에 Docker를 설치하는 방법을 여러분과 공유하고 싶어요. 웹사이트에도 이 내용을 올려두었으니, 거기서 보시는 것이 좋을 수도 있겠죠.

# 소개

<div class="content-ad"></div>

그럼 간단한 개요를 들어가볼게요. 저는 Ubuntu 22.04를 사용할 거지만 최신 버전인 24.04를 사용해도 괜찮아요. 이 설정의 일반적인 흐름은 리눅스를 업데이트하고 필요한 디렉토리를 만드는 것일 거예요. 그게 끝나면 권한을 설정하고 도커를 apt-get 저장소에 추가할 거예요.

그럼 시작해 볼까요?

# 우분투 리눅스에서 도커 설치하는 가장 좋은 방법

우선, 우분투 머신을 업데이트해야 해요. 특정 버전에 고정되어 있다면 이 단계를 건너뛸 수도 있지만, 전 항상 최선의 방법을 찾아 기회를 살리곤 해요.

<div class="content-ad"></div>

# 우분투 업데이트

우분투를 업데이트하려면 아래 명령어를 실행해보세요:

```bash
sudo do-release-upgrade
```

```bash
sudo apt-get update; sudo apt-get upgrade
```

<div class="content-ad"></div>

그 중 하나의 명령에 대해 프롬프트를 받을 수도 있습니다. 'Y'를 누르고...