---
title: "ROS2 시작하기 ROS2 Humble을 Ubuntu 2204LTS에 설치하고 설정하기"
description: ""
coverImage: "/assets/img/2024-05-16-GettingStartedwithROS2InstallandSetupROS2HumbleonUbuntu2204LTS_0.png"
date: 2024-05-16 04:11
ogImage: 
  url: /assets/img/2024-05-16-GettingStartedwithROS2InstallandSetupROS2HumbleonUbuntu2204LTS_0.png
tag: Tech
originalTitle: "Getting Started with ROS2: Install and Setup ROS2 Humble on Ubuntu 22.04(LTS)"
link: "https://medium.com/@sagarcadet/getting-started-with-ros2-install-and-setup-ros2-humble-on-ubuntu-22-04-lts-ad718d4a3ac2"
isUpdated: true
---




## "ROS2 시작하기" 시리즈의 제3부분

안녕하세요, 독자 여러분! "ROS2 시작하기" 시리즈에 오신 것을 환영합니다! 이 시리즈에서는 ROS 2에 대한 포괄적인 소개와 기본 개념, 실제 응용 프로그램을 안내해 드리고자 합니다. ROS(로봇 운영 시스템)를 이전에 사용해 보지 않았거나 ROS 1조차 사용해 본 적이 없거나 기본 개념을 실제로 빠르게 상기시키고 싶다면 본 시리즈를 참고해 주세요. 토론된 개념에 대한 더 깊은 이해를 위해 제공된 링크를 탐색해 보시기 바랍니다.

다음은 시리즈의 기사 목록입니다:

- ROS2 시작하기: 소개
- ROS2 시작하기: 왜 ROS2를 사용해야 할까요?



# 내 시스템에 ROS2를 설치할 수 있을까요?

ROS 2를 설치하려면 여러 옵션이 있습니다. ROS 2는 특정 운영 체제용 이진 패키지를 제공합니다. ROS 2의 공식 설치 문서에서는 이를 Tier 1 운영 체제라고 하며 이러한 운영 체제를 사용하는 사용자에게 설치가 간단하다고 설명합니다.

- Ubuntu Linux
- Red Hat
- Windows

## 중요 사항:



- macOS 사용자들을 위한 프로세스는 조금 다릅니다. ROS 2는 macOS를 위한 이진 패키지를 제공하지 않으므로 설치는 소스로부터 빌드해야 합니다. 이는 더 복잡한 과정일 수 있지만 macOS 사용자가 시스템에서 ROS 2를 사용할 수 있게 합니다.
- 이진 패키지와 소스로부터 빌드하는 두 가지 방법 모두 사용 용도에 따라 다른 기능을 제공하는 완전한 기능을 갖춘 ROS 2 설치로 이어집니다.
- 패키지를 통한 설치는 자동 종속성 관리 및 시스템 업데이트와 함께 업데이트를 권장하지만 root 액세스가 필요합니다.
- 루트 액세스가 없는 경우 이진 아카이브를 고려하십시오.

# Docker와 같은 컨테이너 솔루션을 사용하여 ROS 2를 설치할 수 있을까요?

ROS2를 설정하는 또 다른 편리한 방법은 Docker를 사용하는 것입니다. Docker를 사용하면 ROS2를 컨테이너 환경에서 실행할 수 있어 설치 과정을 단순화하고 다양한 시스템 간 일관성을 확보할 수 있습니다.

Docker를 사용하여 ROS2를 설치하려면 먼저 시스템에 Docker를 설치해야 합니다. Docker를 설치한 후 공식 ROS Docker Hub 저장소에서 ROS2 Docker 이미지를 가져올 수 있습니다. 그런 다음 ROS2를 실행하는 새로운 Docker 컨테이너를 생성하여 컨테이너 내에서 개발을 시작할 수 있습니다.



ROS2 개발을 위해 Docker를 사용하면 ROS2 환경을 시스템에서 격리하거나 새로운 컴퓨터에서 빠르게 ROS2를 설정해야 할 때 특히 유용합니다.

# 설치 전 확인해야 할 사항

- ROS 2를 설치할 때는 안정적인 기반을 제공하는 Long-Term Support (LTS) 버전을 설치하는 것이 좋습니다.
- 설치 전에 ROS 2 버전이 운영 체제 버전과 호환되는지 확인하는 것이 중요합니다. 설치할 ROS 2 버전의 공식 설명서에서 이 정보를 확인할 수 있습니다. 호환성을 확인하면 버전 불일치로 발생할 수 있는 문제를 예방하는 데 도움이 됩니다.
- 또한, 설치할 ROS 2 버전과 Gazebo 버전의 호환성을 확인하는 것이 중요합니다. 여기에서 확인할 수 있습니다.

# 어떤 OS + ROS 2 조합을 선택해야 할까요?



원하는 운영 체제를 선택하는 데 고민 중이라면, ROS 2 개발을 위해 Ubuntu가 많이 추천됩니다. 특히 Ubuntu Mate는 Raspberry Pi에도 설치할 수 있고 가벼운 운영 체제로 알려져 있습니다. 이는 데스크톱 컴퓨터(지상 제어 또는 시뮬레이션 테스트 스테이션)와 라즈베리 파이(로봇 컴퓨터)가 동일한 운영 체제를 사용할 수 있어서 호환성을 간단하게 유지하며 개발 경험을 보다 원할하게 만들어 줍니다.

이 기사 시리즈에서는 Raspberry Pi에 ROS 2 Humble Hawksbill (LTS) 조합을 사용할 Ubuntu Mate - Jammy Jellyfish (22.04)를 사용할 것입니다. 이는 독자들이 강의에 따라 따라와도 안정적이고 잘 지원되는 환경을 제공합니다. 그러니, 더 이상 미루지 말고 설치 과정을 시작해봅시다. Ubuntu에서 ROS2 Humble 설치의 공식 문서를 확인할 수 있습니다.

# 다음은 Ubuntu 22.04(LTS)에 ROS 2 Humble를 설치하는 단계입니다

## 1. 로캘 설정



```js
로케일  # UTF-8 확인

sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

locale  # 설정 확인
```

## 2. 소스 설정

ROS 2 apt 저장소를 추가하려면 Ubuntu Universe 저장소가 활성화되어 있는지 확인하세요.

```js
sudo apt install software-properties-common
sudo add-apt-repository universe
```



ROS 2 GPG 키를 apt에 추가해주세요.

```js
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```

그런 다음 리포지토리를 소스 목록에 추가해주세요.

```js
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```



## 3. ROS 2 패키지 설치

저장소를 설정한 후에는 apt 저장소 캐시를 업데이트하세요. 이는 ROS 2 패키지를 설치하기 전에 시스템이 최신 상태임을 보장합니다.

```js
sudo apt update
sudo apt upgrade
```

이제 ROS 2를 설치하는 두 가지 옵션이 있습니다.



데스크톱 설치 (권장):

- ROS, RViz, 데모 및 튜토리얼이 포함되어 있습니다.
- ROS 개발을 위한 완전한 데스크톱 환경을 제공합니다.

```bash
sudo apt install ros-humble-desktop
```

ROS-Base 설치 (최소 설치):



- 통신 라이브러리, 메시지 패키지, 명령줄 도구를 포함합니다.
- GUI 도구는 포함되어 있지 않으며 미니멀한 설정에 적합합니다.

```js
sudo apt install ros-humble-ros-base
```

저희는 Ground Control 및 Simulation System(저희의 데스크탑/노트북)에 "ros-humble-desktop"를 설치하고 Robot Computer(Raspberry Pi)에 "ros-humble-ros-base"를 설치할 것입니다.

마지막으로 개발 도구를 설치합니다: 컴파일러 및 다른 ROS 패키지를 빌드하기 위한 도구들을 포함합니다.



```js
sudo apt install ros-dev-tools
```

## 4. 환경 설정

ROS 2에서 작업을 시작하려면 먼저 각 터미널 세션에서 설정 스크립트를 소스로 지정해야 합니다.

```js
# 만약 bash를 사용하지 않는다면 shell에 맞게 ".bash"를 대체하세요
# 가능한 값은: setup.bash, setup.sh, setup.zsh
source /opt/ros/humble/setup.bash
```



## 5. 몇 가지 예제를 시도해보세요

참고: 예제는 "데스크톱 설치"에만 포함되어 있습니다.

Talker-listener

하나의 터미널에서 설정 파일을 소스로 실행한 후 Python talker를 실행하세요:



```js
/opt/ros/humble/setup.bash을 소스로 지정
ros2 run demo_nodes_py talker
```

다른 터미널에서 설정 파일을 소스로 지정한 다음 Python 리스너를 실행하세요:

```js
source /opt/ros/humble/setup.bash
ros2 run demo_nodes_py listener
```

이렇게 보입니다:




![image](/assets/img/2024-05-16-GettingStartedwithROS2InstallandSetupROS2HumbleonUbuntu2204LTS_0.png)

Stop both scripts using Ctrl+C.

## 6. Bonus step!

To automate the environment setup process and avoid sourcing the setup file manually each time, we can add the command to source the setup file in the ".bashrc" file. This way, the command will be executed automatically every time we open a new terminal or SSH session.




여기서 .bashrc 파일을 편집하는 방법입니다.

```js
nano ~/.bashrc
```

그리고 파일 끝에 명령어 `source /opt/ros/humble/setup.bash` 를 추가해주세요. 

![이미지](/assets/img/2024-05-16-GettingStartedwithROS2InstallandSetupROS2HumbleonUbuntu2204LTS_1.png)



# 다음은 무엇일까요?

다음 기사에서는 작업 공간(workspaces) 및 노드(nodes)와 같은 개념을 다룰 예정입니다. 작업 공간은 ROS 2 패키지를 구성하고 빌드하는 데 필수적이며, 노드는 ROS 2에서 계산을 수행하는 개별 프로세스입니다. 이러한 개념을 이해하는 것은 ROS 2 개발 여정을 진행할 때 중요할 것입니다.

지금까지 잘 따라오셨다면, 그것은 단순히 관심을 가졌다는 것이 아니라, 헌신적이신 것입니다. 저희는 여러분을 여기에 맞이할 수 있어 기쁩니다!

여러분의 관심과 참여는 우리에게 더 많은 콘텐츠를 만들고, 우리의 열정을 공유하는 로봇학 학습자들, 커뮤니티 및 기술 애호가들과 지식을 공유하게 하는 열정을 불어넣습니다.



우리와 함께 이 여정에 참여해 주셔서 감사합니다. ROS 2를 함께 탐험하며 더 많은 유익한 기사, 튜토리얼 및 실용적인 예시를 엿보기 위해 기다려주세요.

# 추가 읽을거리

- ROS 2 겸손한 설치