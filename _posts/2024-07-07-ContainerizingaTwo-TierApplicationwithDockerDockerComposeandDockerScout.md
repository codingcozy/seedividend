---
title: "Docker, Docker Compose, Docker Scout로 투-티어 애플리케이션 컨테이너라이징 하는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-ContainerizingaTwo-TierApplicationwithDockerDockerComposeandDockerScout_0.png"
date: 2024-07-07 23:33
ogImage: 
  url: /assets/img/2024-07-07-ContainerizingaTwo-TierApplicationwithDockerDockerComposeandDockerScout_0.png
tag: Tech
originalTitle: "Containerizing a Two-Tier Application with Docker, Docker Compose, and Docker Scout"
link: "https://medium.com/@bhavesh_jadhav/containerizing-a-two-tier-application-with-docker-docker-compose-and-docker-scout-a60c2e41d96b"
---


요즘 빠르게 변화하는 기술 분야에서 컨테이너화는 애플리케이션을 배포하고 관리하는 중추적인 요소로 자리잡았어요. Docker, Docker Compose, Docker Scout와 같은 도구들을 활용하면 프로세스를 혁신적으로 간소화하여 확장성, 보안, 효율성을 확보할 수 있어요. 이번 포스팅에서는 최근 진행한 프로젝트를 통해 이야기를 나눠보려고 해요. 이 프로젝트에서는 두 계층 애플리케이션을 컨테이너화하고 Docker Compose를 통해 조정, Docker Scout로 보안을 강화하는 과정을 소개할게요.

![이미지](/assets/img/2024-07-07-ContainerizingaTwo-TierApplicationwithDockerDockerComposeandDockerScout_0.png)

# 사용한 도구 및 기술

- Docker: 컨테이너 생성 및 관리.
- Docker Compose: 다중 컨테이너 Docker 애플리케이션 정의 및 실행.
- Docker Scout: Docker 이미지의 취약점 검사.
- 코드 편집기: Visual Studio Code.

<div class="content-ad"></div>

# 프로젝트 개요

해당 프로젝트는 웹 애플리케이션과 데이터베이스로 구성된 이중 계층 애플리케이션을 Docker를 사용하여 컨테이너화하는 것을 포함합니다. 도커 컴포즈를 사용하여 다중 컨테이너 구성을 관리하고, Docker Scout를 사용하여 Docker 이미지의 보안을 확인하여 취약점을 검사합니다. 이 설정은 DevOps에서 중요한 기술인 컨테이너화, 오케스트레이션 및 보안에 대한 실무 경험을 제공합니다.

# 주요 요구 사항

## 기능 요구 사항

<div class="content-ad"></div>

- Docker를 사용하여 각 응용프로그램 구성 요소를 컨테이너화합니다.
- Docker Compose를 사용하여 다중 컨테이너 설정을 구성합니다.
- 컨테이너 간의 네트워크 통신이 원활하게 이루어지도록 합니다.
- Docker 이미지를 Docker Scout로 스캔하고 발견된 취약점을 해결합니다.

## 비기능 요구 사항

- 성능: 이미지 크기와 시작 시간을 최적화하는 방법으로 컨테이너를 최적화합니다.
- 보안: Docker 보안 모베스트 프랙티스를 구현합니다.
- 문서: 응용프로그램을 빌드, 실행 및 스캔하기 위한 명확한 지침을 제공합니다.

# 배포 단계

<div class="content-ad"></div>

아래는 컨테이너화된 이중 티어 애플리케이션을 배포하는 단계별 가이드입니다:

**1. EC2 인스턴스 시작**

- 인스턴스 유형: t2.micro
- AMI: Ubuntu
- 보안 그룹 규칙: 포트 22, 80, 5000 오픈

**2. Docker 설치**

<div class="content-ad"></div>

업데이트된 패키지 목록을 확인하고 Docker를 설치해보세요:


sudo apt-get update
sudo apt-get install docker.io


## 3. 도커 데몬 접근

현재 사용자의 Docker 소켓 소유권을 변경해보세요.

<div class="content-ad"></div>

```bash
sudo chown $USER /var/run/docker.sock
```

## 4. 도커 컴포즈 설치

도커 컴포즈 설치 방법은 아래와 같습니다:

```bash
sudo apt install docker-compose-v2
```

<div class="content-ad"></div>

## 5. 깃허브 저장소 복제하기

깃허브 저장소를 복제하고 프로젝트 디렉토리로 이동해보세요:

```shell
git clone https://github.com/bhaveshjadhav/Docker-Compose-Two-Tier-App.git
cd Docker-Compose-Two-Tier-App
```

## 6. 도커 구성하기

<div class="content-ad"></div>

```docker
# Dockerfile for the backend
FROM mysql:5.7
```

## 7. Create docker-compose.yml

도커 컴포즈를 사용하여 도커 컨테이너를 실행하세요:

```js
docker compose up -d
```

<div class="content-ad"></div>

## 8. 어플리케이션에 접속하기

어플리케이션을 방문하려면 http://localhost:5000 으로 이동해주세요.

## 9. 컨테이너와 상호 작용하기

실행 중인 컨테이너에 접속하세요.

<div class="content-ad"></div>


도커를 사용하여 MySQL 컨테이너에 접속하는 방법을 알아봅시다.

먼저 명령어를 실행하여 MySQL 컨테이너에 접속합니다:

```bash
도커 exec -it <mysql_컨테이너_아이디> mysql -u root -p
```


<div class="content-ad"></div>

```sql
```


SHOW DATABASES;
USE KYC;
SHOW TABLES;
SELECT * FROM messages;
INSERT INTO messages (message) VALUES ("your message");


## 11. Install Docker Scout

<div class="content-ad"></div>

도커 스카우트 이미지 스캔을 위해 설치하세요:

```shell
mkdir -p ~/.docker/cli-plugins/
cd ~/.docker/cli-plugins/
curl -sSfL https://raw.githubusercontent.com/docker/scout-cli/main/install.sh | sh -s --
```

## 12. DockerHub 로그인

도커허브에 로그인하세요:

<div class="content-ad"></div>

```bash
도커 로그인

## 13. 도커 이미지 스캔

도커 스카웃을 사용하여 이미지를 스캔하세요:

도커 스카웃 quickview <이미지:태그>
도커 스카웃 cves <이미지:태그>
도커 스카웃 cves -o <이미지:태그> > scan_report.txt

<div class="content-ad"></div>

## 14. 정리하기

컨테이너를 중지하고 제거하세요:

docker compose down
docker compose up -d

## 15. EC2 인스턴스 종료하기

<div class="content-ad"></div>

EC2 인스턴스를 사용한 후에는 불필요한 요금 발생을 방지하기 위해 반드시 종료하세요.

# 결론

Docker 및 Docker Compose를 사용하여 응용 프로그램을 컨테이너화하면 배포 및 관리 과정이 단순화되며, Docker Scout와 같은 도구는 취약점을 식별하여 보안을 강화합니다. 이 프로젝트는 이러한 도구들을 실습해보는 기회를 제공하며, 현대적인 DevOps 실천법에서 그 중요성을 강조합니다.