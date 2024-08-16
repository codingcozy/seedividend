---
title: "Docker로 커스터마이즈된 Visual Studio Code 웹 서버 구축 방법"
description: ""
coverImage: "/assets/img/2024-07-13-LetsbuildaCustomizedVisualStudioCodeWebServerwithDocker_0.png"
date: 2024-07-13 01:46
ogImage: 
  url: /assets/img/2024-07-13-LetsbuildaCustomizedVisualStudioCodeWebServerwithDocker_0.png
tag: Tech
originalTitle: "Let's build a Customized Visual Studio Code Web Server with Docker"
link: "https://medium.com/@kpatronas/lets-build-a-customized-visual-studio-code-web-server-with-docker-7a1151bf80d3"
isUpdated: true
---




![Image](/assets/img/2024-07-13-LetsbuildaCustomizedVisualStudioCodeWebServerwithDocker_0.png)

저는 M2 프로세서가 장착된 맥 컴퓨터를 소유하고 있는데, 이는 매우 좋은 컴퓨터입니다. 다만 한 가지 큰 문제가 있는데요.. IBM은 아직 M2와 같은 ARM 프로세서용 ibm_db2 Python 라이브러리를 이식하지 않았습니다. 이것이 제게는 큰 장애물이었습니다. VM과 같은 다른 해결책에 대해 고민해 보기도 했지만, 너무 비효율적으로 느껴졌습니다. 그래서 Docker를 활용한 해결책을 찾게 되었어요. 맥의 Docker를 이용하면 VM보다 더 작은 오버헤드로 X64 컨테이너를 실행할 수 있어서, 저는 하루에 할 일을 위해 필요한 것들을 갖춘 Visual Studio Code Server, Python, SSH 키, 라이브러리 등이 포함된 컨테이너를 만들었습니다. 그리고 여전히 소스 파일은 컨테이너 디렉토리에 로컬로 유지했어요.

도커 파일(Dockerfile)

도커파일 자체가 주석과 함께 설명이 되어 있는 것 같아요. 하지만 몇 가지 섹션을 명확히 해보겠습니다.

<div class="content-ad"></div>


# 공식 Ubuntu 베이스 이미지 사용
FROM ubuntu:latest

# 구성 인수
ARG USERNAME=a_username
ARG GIT_USERNAME="First Last"
ARG GIT_EMAIL="mail@example.com"

# 업데이트하고 다양한 deb 패키지 설치, 여러분의 것을 여기에 삽입해 주세요
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates git \
    openssh-server iputils-ping coreutils sudo curl wget python3 python3-pip python3-dev build-essential && \
    rm -rf /var/lib/apt/lists/*

# 다양한 Python 라이브러리 설치, 여러분의 것을 여기에 삽입해 주세요
RUN pip3 install ibm_db sqlalchemy ibm_db_sa notebook pandas sshtunnel matplotlib

# ${USERNAME}이라는 새 사용자 생성 및 비밀번호 설정
RUN useradd -m -s /bin/bash "${USERNAME}"
RUN echo "${USERNAME}:password" | chpasswd

# 비밀번호 없이 sudoers에 ${USERNAME} 추가
RUN echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/coder

# ${USERNAME}으로 변경
USER ${USERNAME}

# SSH 키 및 추가 호스트 파일에 대한 paths 생성
RUN mkdir -p /home/${USERNAME}/.ssh && mkdir -p /home/${USERNAME}/projects && sudo mkdir -p /etc/hosts.d

# .ssh 디렉터리로 SSH 키 파일 복사, 현재 디렉터리에 키를 복사했는지 확인해 주세요
COPY id_rsa /home/${USERNAME}/.ssh/id_rsa
COPY id_rsa.pub /home/${USERNAME}/.ssh/id_rsa.pub
COPY hosts /etc/hosts.d/

# .ssh 디렉터리 및 내용에 대한 올바른 권한 설정
RUN sudo chmod 700 /home/${USERNAME}/.ssh
RUN sudo chmod 600 /home/${USERNAME}/.ssh/id_rsa
RUN sudo chmod 644 /home/${USERNAME}/.ssh/id_rsa.pub

# Git 사용자 구성
RUN git config --global user.name "${GIT_USERNAME}"
RUN git config --global user.email "${GIT_EMAIL}"

# code-server 확장 프로그램을 위한 디렉터리 생성
RUN mkdir -p /home/${USERNAME}/.local/share/code-server/extensions

# 파이썬 및 주피터 확장 프로그램과 함께 VSCode Server 설치, 여러분의 것을 여기에 삽입해 주세요
RUN curl -fsSL https://code-server.dev/install.sh | sh && \
    code-server --install-extension ms-python.python && \
    code-server --install-extension ms-toolsai.jupyter

# SSH 및 code-server용 포트 노출
EXPOSE 8080 22

# 컨테이너 시작 시 SSH 서비스 및 code-server 실행
CMD sudo service ssh start && code-server --auth none --bind-addr 0.0.0.0:8080


## 위 명령어들은 무엇을 하는 걸까요?

첫 번째 RUN 명령어는 .ssh, projects 및 /etc/hosts.d 디렉터리를 생성합니다.

- .ssh는 호스트에서 컨테이너로 복사할 수 있는 ssh 키를 저장하는 데 필요합니다.
- hosts.d는 DNS 서버를 사용하지 않지만 하드코딩된 호스트가 있는 환경에 필요합니다.


<div class="content-ad"></div>

호스트에서 컨테이너로 키를 복사하는 COPY 명령어는 키를 사용하지 않을 경우 해당 라인을 주석 처리할 수 있습니다.

이어지는 RUN 명령어는 올바른 키 권한을 설정합니다. 키를 사용하지 않을 경우 해당 라인을 주석 처리하세요.

```js
# SSH 키 및 추가 호스트 파일을위한 paths 생성
RUN mkdir -p /home/${USERNAME}/.ssh && mkdir -p /home/${USERNAME}/projects && sudo mkdir -p /etc/hosts.d

# .ssh 디렉토리에 SSH 키 파일 복사, 현재 디렉토리에 키를 복사했는지 확인하세요
COPY id_rsa /home/${USERNAME}/.ssh/id_rsa
COPY id_rsa.pub /home/${USERNAME}/.ssh/id_rsa.pub
COPY hosts /etc/hosts.d/

# .ssh 디렉토리 및 내용에 올바른 권한 설정
RUN sudo chmod 700 /home/${USERNAME}/.ssh
RUN sudo chmod 600 /home/${USERNAME}/.ssh/id_rsa
RUN sudo chmod 644 /home/${USERNAME}/.ssh/id_rsa.pub
```

다음에 아래와 같은 명령문들이 나와요.

<div class="content-ad"></div>

```js
# 코드 서버 확장 프로그램을 위한 디렉토리 생성
RUN mkdir -p /home/${USERNAME}/.local/share/code-server/extensions

# VSCode Server와 함께 파이썬 및 주피터 확장 프로그램 설치, 여러분이 사용할 확장 프로그램은 여기에 추가하세요
RUN curl -fsSL https://code-server.dev/install.sh | sh && \
    code-server --install-extension ms-python.python && \
    code-server --install-extension ms-toolsai.jupyter
```

이러한 명령문은 우리가 좋아하는 비주얼 스튜디오 코드 확장 프로그램을 호스팅 할 디렉토리를 만들고, code-server를 설치하여 해당 확장 프로그램을 설치합니다.

## docker-compose.yml 파일

다음은 docker-compose.yml 파일인데, 이 파일은 매우 중요합니다. 왜냐하면 이 파일을 사용하여 로컬 디렉토리를 컨테이너에 마운트해 소스 파일을 저장하는 위치에 연결할 수 있기 때문입니다. 이 말은 즉, 디렉토리를 마운트하지 않으면 다음 컨테이너 재시작 때 모든 변경/추가 사항이 사라질 수 있다는 것을 의미합니다.


<div class="content-ad"></div>

```yaml
version: '3'
services:
  vscode:
    platform: linux/amd64
    image: vscode-webui
    ports:
      - "8080:8080"
      - "2222:22"
    volumes:
      - /Users/${USER}/Documents/projects/containers/vscode/projects:/home/${USER}/projects
```

- 호스트 디렉토리 부분을 정의하는 볼륨 문의 첫 부분을 변경하기 원할지도 모릅니다.
- platform: linux/amd64 문은 도커가 Mac과 유사한 컴퓨터에서 Linux X64 컨테이너를 실행할 수 있도록 하는 에뮬레이션 레이어를 사용하도록 합니다.

## 결론

VS 코드 서버와 같은 도구를 컨테이너화하여 사용하면 더 유연한 휴대성 및 구성 옵션이 가능하며, Mac을 사용하면서 VM을 사용하지 않고 Linux 소프트웨어를 실행해야 하는 경우에도 해결책이 됩니다.