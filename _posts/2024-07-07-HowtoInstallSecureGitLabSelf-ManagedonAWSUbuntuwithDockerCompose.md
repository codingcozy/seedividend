---
title: "Docker Compose와 함께 AWS Ubuntu에서 안전한 GitLab 셀프 관리 설치 방법"
description: ""
coverImage: "/assets/img/2024-07-07-HowtoInstallSecureGitLabSelf-ManagedonAWSUbuntuwithDockerCompose_0.png"
date: 2024-07-07 03:20
ogImage: 
  url: /assets/img/2024-07-07-HowtoInstallSecureGitLabSelf-ManagedonAWSUbuntuwithDockerCompose_0.png
tag: Tech
originalTitle: "How to Install Secure GitLab Self-Managed on AWS Ubuntu with Docker Compose"
link: "https://medium.com/@varunmanik1/how-to-install-secure-gitlab-self-managed-on-aws-ubuntu-with-docker-compose-7d61d2264c13"
---


HTTPS 설치 (https://varuncloud.shop/users/sign_in)

![HowtoInstallSecureGitLabSelf-ManagedonAWSUbuntuwithDockerCompose_0](https://varuncloud.shop/assets/img/2024-07-07-HowtoInstallSecureGitLabSelf-ManagedonAWSUbuntuwithDockerCompose_0.png)

# 소개

GitLab은 완성된 CI/CD 툴체인을 제공하는 인기 있는 DevOps 플랫폼입니다. 이 안내서에서는 Docker Compose를 사용하여 AWS Ubuntu 서버에 자체 관리 GitLab 인스턴스를 설치하고 HTTPS로 보호하는 단계를 안내하겠습니다.

<div class="content-ad"></div>

## 준비 사항

- AWS 계정
- 등록된 도메인 이름 (Freenom과 같은 무료 도메인 제공 업체 사용 가능)
- Docker 및 AWS의 기본 지식

## 단계 1: Ubuntu EC2 인스턴스 시작하기

- AWS 관리 콘솔에 로그인합니다.
- EC2 대시보드로 이동합니다.
- "인스턴스 시작"을 클릭합니다.
- Ubuntu Server 20.04 LTS (HVM), SSD 볼륨 유형 AMI를 선택합니다.
- 테스트 목적으로 t2.micro와 같은 인스턴스 유형을 선택합니다.
- 필요에 따라 인스턴스 세부 정보를 구성하고 저장소를 추가합니다.
- 다음 수신 규칙을 가진 보안 그룹을 추가합니다:


<div class="content-ad"></div>

- HTTP (포트 80)
- HTTPS (포트 443)
- SSH (포트 22)

- 인스턴스를 검토하고 실행합니다.
- 시작할 때 선택한 키 페어를 사용하여 인스턴스에 SSH로 연결합니다.

![이미지](/assets/img/2024-07-07-HowtoInstallSecureGitLabSelf-ManagedonAWSUbuntuwithDockerCompose_1.png)

# 단계 2: Docker 및 Docker Compose 설치하기

<div class="content-ad"></div>

- 패키지 목록을 업데이트하고 도커를 설치하세요:

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```

도커 컴포즈를 설치하세요:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

<div class="content-ad"></div>

다음 단계로 진행하기 전에, 설치를 확인해보세요:

```js
docker --version
docker-compose --version
```

# 단계 3: 무료 도메인 등록하기

- Freenom 웹사이트에 방문하고 무료 도메인을 등록하세요 (예: example.tk).
- 등록이 완료되면 DNS 설정을 업데이트하여 EC2 인스턴스의 공개 IP 주소를 가리키도록 하세요.

<div class="content-ad"></div>

# Step 4: Route 53 설정하기

Route 53에서 호스팅 영역 설정:

- AWS 관리 콘솔의 Route 53으로 이동합니다.
- "호스팅 영역 생성"을 클릭하고 도메인 이름을 입력합니다.

DNS 레코드 추가하기:

<div class="content-ad"></div>

- 도메인을 EC2 인스턴스의 공개 IP 주소로 가리키는 A 레코드를 만드세요.
- 필요하다면 서브도메인을 위해 CNAME 레코드도 만들 수 있어요.

# 단계 5: 도커 컴포즈를 사용하여 GitLab 설치 및 구성

- GitLab을 위한 Docker Compose 파일을 만들어보세요:

```bash
mkdir gitlab && cd gitlab
nano docker-compose.yml
```

<div class="content-ad"></div>

다음 구성을 docker-compose.yml에 추가해주세요:

```yaml
version: '3.6'

services:
  web:
    image: 'gitlab/gitlab-ce:nightly'
    restart: always
    hostname: 'varuncloud.shop'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'https://varuncloud.shop'
        nginx['redirect_http_to_https'] = true
        nginx['ssl_certificate'] = "/etc/letsencrypt/live/varuncloud.shop/fullchain.pem"
        nginx['ssl_certificate_key'] = "/etc/letsencrypt/live/varuncloud.shop/privkey.pem"
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - '/srv/gitlab/config:/etc/gitlab'
      - '/srv/gitlab/logs:/var/log/gitlab'
      - '/srv/gitlab/data:/var/opt/gitlab'
      - '/etc/letsencrypt:/etc/letsencrypt'
    shm_size: '512m'
```

# 단계 6: Certbot를 사용하여 SSL 인증서 생성하기

- Certbot 설치하기:

<div class="content-ad"></div>

```bash
sudo apt install certbot -y
sudo apt install python3-certbot-nginx -y
```

2. SSL 인증서 획득:

```bash
sudo certbot certonly --standalone -d yourdomain.com

sudo certbot certonly --standalone -d varuncloud.shop
```

# 단계 7: GitLab 실행하기


<div class="content-ad"></div>

- GitLab을 시작하기 위해 Docker Compose를 실행하세요:

```js
docker-compose up -d
```

# 단계 7: GitLab 시작하기

- GitLab을 시작하려면 Docker Compose를 실행하세요.

<div class="content-ad"></div>

```bash
도커 실행 -it <컨테이너_ID_또는_이름> /bin/bash
```

GitLab 레일즈 콘솔 열기:

```bash
gitlab-rails console
```

루트 비밀번호 재설정하기:

<div class="content-ad"></div>

```js
user = User.where(id: 1).first
user.password = 'Str0ngP@ssw01rd!'
user.password_confirmation = 'Str0ngP@ssw01rd!'
user.save!
```

레일즈 콘솔을 나가려면:

```js
exit
```

URL 접속: 

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-07-HowtoInstallSecureGitLabSelf-ManagedonAWSUbuntuwithDockerCompose_2.png)

![이미지](/assets/img/2024-07-07-HowtoInstallSecureGitLabSelf-ManagedonAWSUbuntuwithDockerCompose_3.png)

# 결론

위 단계를 따라하셔서 AWS 우분투 서버에 도커 컴포즈를 사용하여 HTTPS로 보안된 자체 관리형 GitLab 인스턴스를 성공적으로 설치하셨습니다. 이제 GitLab을 사용하여 코드 저장소 및 CI/CD 파이프라인을 관리할 수 있습니다.