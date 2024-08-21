---
title: "궁극의 CICD DevOps 파이프라인 프로젝트 - 체계적인 구축 방법 2024"
description: ""
coverImage: "/assets/img/2024-07-07-TheUltimateCICDDevOpsPipelineProject_0.png"
date: 2024-07-07 23:40
ogImage:
  url: /assets/img/2024-07-07-TheUltimateCICDDevOpsPipelineProject_0.png
tag: Tech
originalTitle: "The Ultimate CI CD DevOps Pipeline Project"
link: "https://medium.com/@zk36708/the-ultimate-ci-cd-devops-pipeline-project-ea450ca50a94"
isUpdated: true
---

![이미지](/assets/img/2024-07-07-TheUltimateCICDDevOpsPipelineProject_0.png)

# 소개

본 글은 다양한 데브옵스 도구를 활용하여 지속적 통합/지속적 배포(CI/CD) 파이프라인을 설정하는 포괄적인 안내서를 제공합니다. 이 프로젝트는 쿠버네티스 클러스터에 보드 게임 애플리케이션을 배포하고, 제킨스에서 파이프라인을 설정하는 내용을 담고 있습니다.

# 단계 1: 인프라 구축

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 환경 설정

환경 설정은 AWS에서 Ubuntu EC2 인스턴스를 생성하는 과정을 포함합니다. Ubuntu EC2 인스턴스를 생성하는 단계는 다음과 같습니다:

1. AWS Management Console에 로그인합니다.
2. EC2 대시보드로 이동합니다.
3. EC2 대시보드 측면 표시줄의 "인스턴스" 링크를 클릭합니다.
4. "인스턴스 시작" 버튼을 클릭합니다.
5. "단계 1: Amazon Machine Image (AMI) 선택" 섹션에서 사용 가능한 AMI 목록에서 "Ubuntu"를 선택합니다.
6. 사용하려는 Ubuntu 버전을 선택합니다. 예를 들어 "Ubuntu Server 20.04 LTS"를 선택합니다.
7. "단계 2: 인스턴스 유형 선택" 섹션에서 요구 사항에 맞는 인스턴스 유형을 선택합니다. 기본 옵션(보통 t2.micro 인스턴스)은 테스트 및 소규모 워크로드에 적합합니다.
8. 네트워크 설정, 서브넷, IAM 역할 등의 인스턴스 세부정보를 구성합니다. 지금은 이러한 설정을 기본 설정으로 남겨둘 수 있습니다.
9. 루트 볼륨의 크기를 지정합니다(기본값은 테스트 목적으로 보통 적합합니다).
10. 인스턴스를 더 잘 구성하고 관리하기 위해 태그를 추가할 수 있습니다.
11. "단계 6: 보안 그룹 구성" 섹션에서 보안 그룹을 구성하여 자신의 IP 주소에서 SSH 액세스(포트 22)를 허용합니다. 다른 요구 사항에 따라 다른 포트(HTTP, HTTPS 등)를 허용할 수도 있습니다.
12. 인스턴스 구성을 검토합니다.
13. 기존 키페어를 선택하거나 새로운 키페어를 생성합니다.
14. 확인란을 선택합니다.
15. "인스턴스 시작"을 클릭합니다.
16. 인스턴스에 액세스하는 방법: Mobaxterm 사용하기

# 쿠버네티스 설정하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Kubeadm을 사용하여 Kubernetes 클러스터를 설정했습니다. 클러스터는 네트워킹에 Calico를 사용하고 인그레스 컨트롤에 NGINX를 사용하도록 구성되어 있습니다. 이제 Kubernetes를 설치하는 단계를 알려드리겠습니다:

1. 시스템 패키지 업데이트 [마스터 노드 및 워커 노드에서 실행]

```bash
sudo apt-get update
```

2. Docker 설치 [마스터 노드 및 워커 노드에서 실행]

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```shell
sudo apt install docker.io -y
sudo chmod 666 /var/run/docker.sock
```

- 마스터 및 워커 노드에서 쿠버네티스에 필요한 종속성 설치

```shell
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
sudo mkdir -p -m 755 /etc/apt/keyrings
```

- 마스터 및 워커 노드에 쿠버네티스 저장소 및 GPG 키 추가

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```shell
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

- 패키지 목록 업데이트하기 [마스터 노드 및 워커 노드에서]

```shell
sudo apt update
```

- Kubernetes 구성 요소 설치하기 [마스터 노드 및 워커 노드에서]

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
sudo apt install -y kubeadm=1.28.1-1.1 kubelet=1.28.1-1.1 kubectl=1.28.1-1.1
```

- 마스터 노드의 Kubernetes 마스터 노드를 초기화합니다.[마스터 노드에서]

```bash
sudo kubeadm init -- pod-network-cidr=10.244.0.0/16
```

- Kubernetes 클러스터를 구성합니다.[마스터 노드에서]

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

- 네트워킹 솔루션 (Calico) 배포 [마스터 노드에]

```bash
kubectl apply -f https://docs.projectcalico.org/v3.20/manifests/calico.yaml
```

- 인그레스 컨트롤러 (NGINX) 배포 [마스터 노드에]

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```yaml
kubectl apply -f [4](https://raw.githubusercontent). com/kubernetes/ingress - nginx/controller-v0.49.0/deploy/static/provider/baremetal/deploy. yaml
```

# Jenkins 설정하기

젠킨스는 우분투 인스턴스에 설치되어 있습니다. 이곳에는 이클립스 테뮤린 설치 프로그램, 파이프라인 메이븐 통합, 설정 파일 제공자, 소나큐브 스캐너, 쿠버네티스 CLI, 쿠버네티스, 도커, 그리고 도커 파이프라인 단계와 같은 여러 플러그인이 설치되어 있어 파이프라인을 지원합니다. 우분투에 젠킨스를 설치하는 단계는 다음과 같습니다:

- OpenJDK 17 JRE Headless 설치하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# OpenJDK 17 JRE headless를 설치합니다.
sudo apt install openjdk-17-jre-headless -y
```

- Jenkins의 GPG 키를 다운로드합니다.

```js
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
```

- 패키지 관리자 소스에 Jenkins 저장소를 추가합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

/dev/null은 가상의 파일로, 텍스트와 데이터를 버리는 데 사용됩니다. 여기서는 로그 메시지 등이 이미 출력되었고 더 이상 관심이 없다는 뜻입니다.

패키지 매니저 저장소를 업데이트합니다.

```bash
sudo apt-get update
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Jenkins 설치하기

```bash
sudo apt-get install jenkins -y
```

# Nexus 설정하기

Nexus는 Docker 컨테이너를 사용하여 설정됩니다. 빌드 아티팩트를 저장하는 저장소로 사용됩니다. Nexus를 설정하는 방법은 아래와 같습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 패키지 매니저 저장소 업데이트

```bash
sudo apt-get update
```

- 필요한 종속성 설치

```bash
sudo apt-get install -y ca-certificates curl
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 도커 GPG 키를 저장할 디렉토리를 만듭니다

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

- 도커의 GPG 키를 다운로드 합니다

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 'key'에 대한 적절한 권한을 보장하세요.

```js
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

- Docker 저장소를 Apt 소스에 추가하세요

/dev/null

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```shell
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \$(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

- 패키지 관리자 저장소 업데이트

```shell
sudo apt-get update
```

- 도커 설치하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

- 도커 컨테이너를 사용하여 넥서스 만들기

```bash
docker run -d --name nexus -p 8081:8081 sonatype/nexus3:latest
```

# 소나큐브 설정하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

SonarQube은 Docker 컨테이너를 사용하여 설정됩니다. 코드 품질과 보안 분석에 사용됩니다. SonarQube를 설정하는 단계는 다음과 같습니다:

1. 패키지 관리자 저장소 업데이트

```js
sudo apt-get update
```

2. 필요한 종속성 설치

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
sudo apt-get install -y ca-certificates curl
```

- Docker GPG 키를 저장할 디렉토리를 만듭니다.

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

- Docker의 GPG 키를 다운로드합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker.gpg
```

- Add the Docker repository to the APT sources list by creating a new file:

```bash
sudo echo "deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

코드 조각을 공유해 주셔서 감사합니다!

다음과 같이 Docker 패키지 관리자 저장소를 시스템에 추가하고 패키지 관리자 리포지토리를 업데이트하는 과정을 설명해 드리겠습니다.

먼저, Docker 패키지 관리자 저장소를 시스템에 추가합니다. 이를 위해 아래와 같은 명령어를 실행합니다.

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

이후, 패키지 관리자 리포지토리를 업데이트하려면 아래 명령어를 사용하시면 됩니다.

```bash
sudo apt-get update
```

위의 내용들이 도움이 되셨길 바라며, 다른 궁금한 점이 있으시면 언제든지 물어보세요! 😊

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 도커 설치하기

```js
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

- 소나큐브 도커 컨테이너 만들기

```js
docker run -d --name sonar -p 9000:9000 sonarqube:lts-community
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Phase 2: 개인 Git 설정

개인 Git 저장소를 만들고 개인 액세스 토큰을 생성하여 저장소에 연결하고 코드를 푸시하는 단계:

## 개인 Git 저장소 만들기:

선호하는 Git 호스팅 플랫폼(예: GitHub, GitLab, Bitbucket)으로 이동하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

당신의 계정에 로그인하거나 계정이 없다면 가입하세요.

새 저장소를 만들고 비공개로 설정하세요.

## 개인 액세스 토큰 생성:

계정 설정 또는 프로필 설정으로 이동하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

“Developer settings” 또는 “개인 액세스 토큰” 섹션을 찾아보세요.

필요한 권한(예: repository 액세스)을 제공하여 새 토큰을 생성하세요.

## 로컬로 저장소 복제하기:

Git Bash나 터미널을 열어주세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

여행 전문가 여러분, 환영합니다!

저는 여행을 좋아하는 분들을 위해 유용한 정보를 제공해드리는 전문가입니다. 혹시 궁금한 점이 있거나 여행 관련 도움이 필요하시다면 언제든지 물어보세요!

이제 여행 팁을 하나 드릴게요. 먼저 레포지토리를 클론할 디렉토리로 이동해주세요. 그 다음에 아래 명령어를 입력하면 됩니다:

- `git clone repository_URL`

여기서 `repository_URL` 자리에 본인의 레포지토리 URL을 넣어주시면 됩니다. 여행을 떠나기 전에 손쉽게 레포지토리를 클론하는 방법이에요. 즐거운 여행 되세요! 🌍✈️

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

소스 코드 파일을 추가해 주세요:

클론한 저장소 디렉토리로 이동하세요.

소스 코드 파일을 붙여넣거나 이 디렉토리 안에 새로 만드세요.

## 변경 내용 스테이징 및 커밋하기:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

변경 사항을 스테이징하기 위해 git add 명령어를 사용하세요:

- git add .

의미 있는 메시지와 함께 스테이징된 변경 사항을 커밋하기 위해 git commit 명령어를 사용하세요:

- git commit -m "여기에 커밋 메시지를 작성하세요"

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 저장소에 변경 사항 반영하기:

git push 명령어를 사용하여 커밋한 변경 사항을 원격 저장소로 푸시합니다:

git push

이 저장소에 처음으로 푸시하는 경우, 원격 저장소와 브랜치를 지정해야 할 수도 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- git push -u origin master

만약 다른 브랜치로 푸시하는 경우에는 'master'를 해당 브랜치 이름으로 바꿔주세요.

## 개인 액세스 토큰을 인증 정보로 입력:

푸시하는 동안 자격 증명이 요청될 때, 사용자 이름(일반적으로 이메일)을 입력하고 비밀 액세스 토큰을 패스워드로 사용해주세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 단계를 따라하면 개인 Git 저장소를 만들고 Git Bash를 사용하여 연결하고 코드 변경 사항을 안전하게 푸시하는 데 개인 액세스 토큰을 사용할 수 있습니다.

# 단계 3: CI/CD 파이프라인

# 파이프라인 구성

파이프라인은 선언적 파이프라인 스크립트를 사용하여 Jenkins에서 구성되었습니다. 파이프라인 단계에는 Git 체크아웃, 코드 컴파일, 단위 테스트, 파일 시스템 스캔, SonarQube 분석, 품질 게이트 확인, 빌드 패키지화, Nexus로 아티팩트 배포, Docker 이미지 빌드 및 푸시, Kubernetes로 배포 및 배포 검증이 포함되어 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이것은 Jenkins 파이프라인 설정의 예입니다:

```js
pipeline {
    agent any
    tools {
        jdk 'jdk17'
        maven 'maven3'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }
    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: 'git-cred', url: '당신의_GIT_REPO_URL'
            }
        }
        stage('Compile') {
            steps {
                sh "mvn compile"
            }
        }
        stage('Test') {
            steps {
                sh "mvn test"
            }
        }
        stage('File System Scan') {
            steps {
                sh "trivy fs --format table -o trivy-fs-report.html ."
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=BoardGame -Dsonar.projectKey=BoardGame -Dsonar.java.binaries=.'''
                }
            }
        }
        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'sonar-token'
                }
            }
        }
        stage('Build') {
            steps {
                sh "mvn package"
            }
        }
        stage('Publish To Nexus') {
            steps {
                withMaven(globalMavenSettingsConfig: 'global-settings', jdk: 'jdk17', maven: 'maven3', mavenSettingsConfig: '', traceability: true) {
                    sh "mvn deploy"
                }
            }
        }
        stage('Build & Tag Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {
                        sh "docker build -t adijaiswal/boardshack:latest ."
                    }
                }
            }
        }
        stage('Docker Image Scan') {
            steps {
                sh "trivy image --format table -o trivy-image-report.html adijaiswal/boardshack:latest"
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred', toolName: 'docker') {
                        sh "docker push adijaiswal/boardshack:latest"
                    }
                }
            }
        }
        stage('Deploy To Kubernetes') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: 'kubernetes', contextName: '', credentialsId: 'k8-cred', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://당신의_K8S_CLUSTER_IP:6443') {
                    sh "kubectl apply -f deployment-service.yaml"
                }
            }
        }
        stage('Verify the Deployment') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: 'kubernetes', contextName: '', credentialsId: 'k8-cred', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://당신의_K8S_CLUSTER_IP:6443') {
                    sh "kubectl get pods -n webapps"
                    sh "kubectl get svc -n webapps"
                }
            }
        }
    }
    post {
        always {
            script {
                def jobName = env.JOB_NAME
                def buildNumber = env.BUILD_NUMBER
                def pipelineStatus = currentBuild.result ?: 'UNKNOWN'
                def bannerColor = pipelineStatus.toUpperCase() == 'SUCCESS' ? 'green' : 'red'
                def body = <html> <body> <div style="border: 4px solid ${bannerColor}; padding: 10px; "> <h2>${jobName} - Build ${buildNumber}</h2> <div style="background-color: ${bannerColor}; padding: 10px; "> <h3 style="color: white; ">Pipeline Status: ${pipelineStatus.toUpperCase()}</h3> </div> <p>Check the <a href="${BUILD_URL}">console output</a>.</p> </div> </body> </html>
                emailext (
                    subject: "${jobName} - Build ${buildNumber} - ${pipelineStatus.toUpperCase()}",
                    body: body,
                    to: 'jaiswaladi246@gmail.com',
                    from: 'jenkins@example.com',
                    replyTo: 'jenkins@example.com',
                    mimeType: 'text/html',
                    attachmentsPattern: 'trivy-image-report.html'
                )
            }
        }
    }
}
```

당신의 실제 Git 리포지토리 URL과 Kubernetes 클러스터 IP를 각각 YOUR_GIT_REPO_URL 및 YOUR_K8S_CLUSTER_IP로 변경해주세요.

# Phase 4: Monitoring

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

애플리케이션 및 쿠버네티스 클러스터 모니터링을 위해 Prometheus, Node Exporter, Black Box Exporter, Grafana를 사용할 수 있습니다. 아래는 이러한 도구를 다운로드할 수 있는 링크입니다:

- [Prometheus](link)
- [Node Exporter](link)
- [Black Box Exporter](link)
- [Grafana](link)

이 도구들을 다운로드한 후, 각각의 설치 및 구성 가이드를 따라 애플리케이션과 쿠버네티스 클러스터 모니터링을 설정할 수 있습니다.

이것은 초안이므로 추가 수정이 필요할 수 있습니다. 또한 최종 기사를 공유할 때 민감한 정보는 자리 표시자로 교체해야 합니다. 더 필요한 도움이 있으면 언제든지 말씀해 주세요!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이미지 출처: 데브옵스 샥
