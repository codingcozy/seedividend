---
title: "AWS에 Netflix 클론 배포하기 DevSecOps 프로젝트 완벽 가이드"
description: ""
coverImage: "/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_0.png"
date: 2024-07-07 13:55
ogImage:
  url: /assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_0.png
tag: Tech
originalTitle: "Deploying a Netflix Clone on AWS: A DevSecOps Project"
link: "https://medium.com/@aashiqconnects/deploying-a-netflix-clone-on-aws-a-devsecops-project-a64bf6aeaa14"
isUpdated: true
---

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_0.png)

# 소개 :

이 블로그 포스트에서는 다양한 DevSecOps 도구와 실천 방법을 사용하여 클라우드에 Netflix 클론 애플리케이션을 배포하는 단계를 안내하겠습니다. 이 프로젝트는 EC2 인스턴스 설정부터 보안 스캔, CI/CD 파이프라인 및 모니터링 도구 통합까지 모든 내용을 다룰 것입니다.

# 프로젝트 개요 :

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

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_1.png)

본 프로젝트는 Jenkins, Docker, SonarQube, Trivy, Prometheus 및 Grafana와 같은 도구를 사용하여 보안 및 자동화된 Netflix 클론 애플리케이션을 배포하는 것을 다룹니다.

# 단계 1: 초기 설정 및 배포

단계 1: EC2 (Ubuntu 22.04) 시작하기

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

AWS에서 Ubuntu 22.04를 사용하여 EC2 인스턴스를 프로비저닝하세요.
인스턴스에 SSH로 연결하세요.

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_2.png)

단계 2: 코드 복제

- 모든 패키지를 업데이트하고, 저장소를 복제하세요.

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

Step 3: 도커 설치 및 컨테이너를 사용하여 앱 빌드하기

- EC2 인스턴스에 Docker를 설정합니다.

```js
sudo apt-get install docker.io -y
sudo usermod -aG docker $USER
newgrp docker
sudo chmod 777 /var/run/docker.sock
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

### Step 4: API 키 받기

- TMDB에서 API 키를 발급받으세요. [TMDB 바로가기](https://www.themoviedb.org)

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_3.png)

- 어플리케이션을 개발하고 Docker를 사용하여 API 키를 적용하세요.

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
docker build --build-arg TMDB_V3_API_KEY=<your-api-key> -t netflix .
```

# Phase 2: 보안

단계 1: SonarQube 및 Trivy 설치

- Docker 이미지로 SonarQube 설치

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
도커를 사용하여 SonarQube 커뮤니티 버전을 9000 포트로 실행하는 명령어입니다.
```

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_4.png)

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_5.png)

- Trivy를 설치하세요.

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
sudo apt-get install wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy
```

이제 trivy를 사용하여 이미지를 스캔해 보세요.

```bash
trivy image <이미지ID>
```

다음으로 소나큐브(SonarQube)를 통합하는 단계입니다.

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

# SonarQube와 CI/CD 파이프라인 통합하기

코드 품질 분석을 위해 SonarQube를 CI/CD 파이프라인에 통합해보세요.

## 단계 3: CI/CD 설정

### 단계 1: Jenkins 설치하기

- EC2 인스턴스에 Jenkins를 설치합니다.

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
sudo apt update

#Java 설치

sudo apt install fontconfig openjdk-17-jre
java -version
openjdk version "17.0.8" 2023-07-18
OpenJDK Runtime Environment (build 17.0.8+7-Debian-1deb12u1)
OpenJDK 64-Bit Server VM (build 17.0.8+7-Debian-1deb12u1, mixed mode, sharing)

#Jenkins 설치

sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_6.png)

- EC2 인스턴스의 공인 IP로 웹 브라우저에서 Jenkins에 접속합니다.
- 공인IP:8080
- '제안된 플러그인 설치'를 사용하여 Jenkins 플러그인을 설치하겠습니다.

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_7.png)

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

- 권장되는 플러그인이 설치되었습니다

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_8.png)

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_9.png)

단계 2: Jenkins 구성

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

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_10.png)

다음 플러그인을 설치하세요:

- NodeJS
- Eclipse Temurin Installer
- SonarQube Scanner
- JDK
- OWASP Dependency Check
- Docker
- Docker Commons
- Docker Pipeline
- Docker API
- docker-build-step
- Email Extension Template

Jenkins에서 도구 구성: JDK(17), NodeJs(16), Docker, SonarQube-Scanner

- Jenkins 관리 → 도구 → JDK(17) 및 NodeJs(16) 설치 → 적용 및 저장 클릭. 필요한 모든 도구에 대해 수행해주세요.
- Jenkins 파이프라인을 생성하세요.

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

pipeline{
agent any
tools{
jdk 'jdk17'
nodejs 'node16'
}
environment {
SCANNER_HOME=tool 'sonar-scanner'
}
stages {
stage('clean workspace'){
steps{
cleanWs()
}
}
stage('Checkout from Git'){
steps{
git branch: 'main', url: 'https://github.com/N4si/DevSecOps-Project.git'
}
}
stage("Sonarqube Analysis "){
steps{
withSonarQubeEnv('sonar-server') {
sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Netflix \
 -Dsonar.projectKey=Netflix '''
}
}
}
stage("quality gate"){
steps {
script {
waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
}
}
}
stage('Install Dependencies') {
steps {
sh "npm install"
}
}
stage('OWASP FS SCAN') {
steps {
dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
dependencyCheckPublisher pattern: '\*\*/dependency-check-report.xml'
}
}
stage('TRIVY FS SCAN') {
steps {
sh "trivy fs . > trivyfs.txt"
}
}
stage("Docker Build & Push"){
steps{
script{
withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){  
 sh "docker build --build-arg TMDB_V3_API_KEY=<yourapikey> -t netflix ."
sh "docker tag netflix nasi101/netflix:latest "
sh "docker push nasi101/netflix:latest "
}
}
}
}
stage("TRIVY"){
steps{
sh "trivy image nasi101/netflix:latest > trivyimage.txt"
}
}
stage('Deploy to container'){
steps{
sh 'docker run -d --name netflix -p 8081:80 nasi101/netflix:latest'
}
}
}
}

---

만약 도커 로그인에 실패하는 오류가 나타나면

sudo su
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins

## Phase 4: 모니터링

Step 1: 프로메테우스와 노드 익스포터 설치:

- 어플리케이션을 모니터링하기 위해 프로메테우스와 그라파나를 설치합니다.

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

i) 프로메테우스 설치하기:

- 먼저, 프로메테우스를 위해 전용 리눅스 사용자를 생성하고 프로메테우스를 다운로드하세요.

```js
sudo useradd --system --no-create-home --shell /bin/false prometheus
wget https://github.com/prometheus/prometheus/releases/download/v2.47.1/prometheus-2.47.1.linux-amd64.tar.gz
```

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_11.png)

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

"Prometheus 파일을 추출하고, 이동하여 디렉터리 생성

```js
tar -xvf prometheus-2.47.1.linux-amd64.tar.gz
cd prometheus-2.47.1.linux-amd64/
sudo mkdir -p /data /etc/prometheus
sudo mv prometheus promtool /usr/local/bin/
sudo mv consoles/ console_libraries/ /etc/prometheus/
sudo mv prometheus.yml /etc/prometheus/prometheus.yml
```

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_12.png)

- 디렉터리에 대한 소유권 설정"

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
# 프로메테우스를 위한 시스템디 유닛 구성 파일을 생성합니다

sudo nano /etc/systemd/system/prometheus.service

프로메테우스 서비스 파일에 아래 내용을 추가하세요
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

[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

StartLimitIntervalSec=500
StartLimitBurst=5

[Service]
User=prometheus
Group=prometheus
Type=simple
Restart=on-failure
RestartSec=5s
ExecStart=/usr/local/bin/prometheus \
 --config.file=/etc/prometheus/prometheus.yml \
 --storage.tsdb.path=/data \
 --web.console.templates=/etc/prometheus/consoles \
 --web.console.libraries=/etc/prometheus/console_libraries \
 --web.listen-address=0.0.0.0:9090 \
 --web.enable-lifecycle

[Install]
WantedBy=multi-user.target

![Deploying a Netflix Clone on AWS: A DevSecOps Project](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_13.png)

프로메테우스 서비스 파일의 핵심 부분을 간단하게 설명해드릴게요:

- User와 Group은 프로메테우스가 실행될 리눅스 사용자와 그룹을 지정합니다.
- ExecStart에는 프로메테우스 실행 파일 경로, 구성 파일 위치 (prometheus.yml), 저장 디렉토리 및 기타 설정을 지정합니다.
- web.listen-address는 프로메테우스가 9090 포트에서 모든 네트워크 인터페이스에서 수신 대기하도록 구성합니다.
- web.enable-lifecycle은 API 호출을 통해 프로메테우스를 관리할 수 있도록 허용합니다.

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

Prometheus를 활성화하고 시작해주세요:

```bash
sudo systemctl enable prometheus
sudo systemctl start prometheus
```

Prometheus 상태 확인:

```bash
sudo systemctl status prometheus
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

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_14.png)

서버 IP와 포트 9090을 사용하여 웹 브라우저에서 Prometheus에 액세스할 수 있습니다:
http://`your-server-ip`:9090

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_15.png)

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

ii) 노드 익스포터 설치:

- 노드 익스포터를 위한 시스템 사용자를 생성하고 노드 익스포터를 다운로드하세요

```js
sudo useradd --system --no-create-home --shell /bin/false node_exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
```

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_16.png)

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

- Node Exporter 파일을 압축 해제하고 실행 파일을 이동하고 정리해주세요.

```js
tar -xvf node_exporter-1.6.1.linux-amd64.tar.gz
sudo mv node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin/
rm -rf node_exporter*
```

- Node Exporter를 위한 systemd 유닛 설정 파일을 생성해주세요.

```js
sudo nano /etc/systemd/system/node_exporter.service
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

```js
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

StartLimitIntervalSec=500
StartLimitBurst=5

[Service]
User=node_exporter
Group=node_exporter
Type=simple
Restart=on-failure
RestartSec=5s
ExecStart=/usr/local/bin/node_exporter --collector.logind

[Install]
WantedBy=multi-user.target
```

![Image](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_17.png)

필요에 따라 다른 추가 플래그로 --collector.logind를 대체하세요.

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

Node Exporter을 활성화하고 실행하려면:

```js
sudo systemctl enable node_exporter
sudo systemctl start node_exporter
```

Node Exporter의 상태를 확인하려면:

```js
sudo systemctl status node_exporter
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

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_18.png)

프로메테우스(Prometheus)에서 노드 익스포터(Node Exporter) 메트릭에 액세스할 수 있습니다.

iii) 프로메테우스 플러그인 통합 구성:

Jenkins를 프로메테우스와 통합하여 CI/CD 파이프라인을 모니터링하세요.

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

프로메테우스 설정:

프로메테우스를 구성하여 Node Exporter 및 Jenkins에서 메트릭을 가져 오도록하려면 prometheus.yml 파일을 수정해야합니다. 여기에 설정 예제가 있습니다:

```js
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']

  - job_name: 'jenkins'
    metrics_path: '/prometheus'
    static_configs:
      - targets: ['<your-jenkins-ip>:<your-jenkins-port>']
```

Jenkins 설정에 적합한 값으로 `your-jenkins-ip` 및 `your-jenkins-port`를 교체해야합니다.

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

구성 파일의 유효성을 확인해보세요:

```bash
promtool check config /etc/prometheus/prometheus.yml
```

위 명령어를 실행하면 프로메테우스의 설정 파일인 prometheus.yml의 유효성을 확인할 수 있어요.

```bash
curl -X POST http://localhost:9090/-/reload
```

만약 설정을 다시 불러오고 싶다면 위 명령어를 사용해주세요.

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

프로메테우스 타겟에 접속하려면 다음 URL을 사용하시면 됩니다:

http://`your-prometheus-ip`:9090/targets

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_19.png)

스텝 2: 우분투 22.04에 그라파나를 설치하고 프로메테우스와 연동 설정하기

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

의존성 설치하기:

먼저 필수적인 의존성이 설치되었는지 확인해주세요.

```shell
sudo apt-get update
sudo apt-get install -y apt-transport-https software-properties-common
```

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_20.png)

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

GPG 키 추가하기:

- Grafana의 GPG 키 추가하기

```js
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

Grafana 저장소 추가하기:

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

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_21.png)

Grafana 저장소 추가:

```js
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

그라파나 업데이트 및 설치하기:

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

패키지 목록을 업데이트하고 Grafana를 설치하세요.

```js
sudo apt-get update
sudo apt-get -y install grafana
```

Grafana 서비스를 활성화하고 시작하세요:

- 재부팅 후에 Grafana가 자동으로 시작되도록 서비스를 활성화하세요.
- 그리고 Grafana를 시작하세요.

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
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Check Grafana Status:

- 그라파나 서비스 상태 확인: 정상적으로 실행 중인지 확인하기 위해

```shell
sudo systemctl status grafana-server
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

Grafana 웹 인터페이스에 접속해보세요:

![image](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_22.png)

Grafana 웹 인터페이스에 접속해보세요:

http://`your-server-ip`:3000

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

Grafana에 로그인하라는 화면이 나타납니다. 기본 사용자 이름은 "admin"이고 기본 비밀번호도 "admin"입니다.

![img](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_23.png)

기본 비밀번호 변경하기:

처음으로 로그인할 때 Grafana에서는 보안상의 이유로 기본 비밀번호를 변경하라는 메시지가 표시됩니다. 새로운 비밀번호를 설정하려면 안내에 따르세요.

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

프로메테우스 데이터 소스 추가하기:

메트릭을 시각화하려면 데이터 소스를 추가해야 합니다. 다음 단계를 따라주세요:

![이미지1](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_24.png)

![이미지2](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_25.png)

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

메트릭을 시각화하려면 데이터 원본을 추가해야 합니다. 다음 단계를 따라주세요:

- "데이터 원본"을 선택합니다.
- "데이터 원본 추가" 버튼을 클릭합니다.
- 데이터 원본 유형으로 "Prometheus"를 선택합니다.
- "HTTP" 섹션에서:
- "URL"을 http://localhost:9090으로 설정합니다 (Prometheus가 동일한 서버에서 실행 중이라고 가정).
- 데이터 원본이 작동하는지 확인하려면 "저장 및 테스트" 버튼을 클릭합니다.

대시보드 가져오기:

메트릭을 더 쉽게 볼 수 있도록 미리 구성된 대시보드를 가져올 수 있습니다. 다음 단계를 따라주세요:

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

- 좌측 사이드바의 “+”(플러스) 아이콘을 클릭하면 “생성” 메뉴가 열립니다.

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_26.png)

- “대시보드”를 선택합니다.
- “가져오기” 대시보드 옵션을 클릭합니다.
- 가져오고자 하는 대시보드 코드(예: 코드 1860)를 입력합니다.
- “로드” 버튼을 클릭합니다.
- 드롭다운 메뉴에서 추가한 데이터 소스(프로메테우스)를 선택합니다.
- “가져오기” 버튼을 클릭합니다.

이제 프로메테우스에서 메트릭을 시각화하는 Grafana 대시보드가 설정되었어요.

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

![img](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_27.png)

그라파나는 시각화 및 대시보드 작성에 강력한 도구입니다. 또한 특정 모니터링 요구에 맞게 더욱 맞춤 설정할 수 있습니다.

여기까지입니다! 그라파나를 프로메테우스와 함께 모니터링 및 시각화에 사용할 수 있도록 성공적으로 설치하고 설정했습니다.

# 단계 5: 알림

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

알림 서비스 설정하기:

- Jenkins나 다른 알림 메커니즘에서 이메일 알림을 설정합니다.

# 단계 6: Kubernetes

- Gmail 계정에 로그인하여 프로필을 클릭한 후 Google 계정 관리를 클릭합니다.

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

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_28.png)

Google 계정의 왼쪽에서 Security를 선택하세요. 앱 비밀번호를 만들려면 2단계 인증을 클릭하세요.

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_29.png)

Jenkins를 입력하고 앱 비밀번호를 만들려면 만들기를 클릭하세요.

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

![2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_30](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_30.png)

You will see an App password similar to the one below.

![2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_31](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_31.png)

![2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_32](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_32.png)

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

`/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_33.png`

Manage Jenkins를 클릭하고 → 자격 증명을 선택하여 이메일 사용자 이름과 생성된 비밀번호를 추가합니다.

`/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_34.png`

`/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_35.png`

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

`![image](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_36.png)`

Jenkins Global credentials(제한 없음)에 Google 이메일 알림 자격 증명이 추가되었습니다.

Jenkins 시스템에서, 확장된 이메일 알림 섹션 아래, 이미지에 표시된 대로 구성해 보겠습니다.

`![image](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_37.png)`

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

적용을 클릭한 후 저장하세요.

그 다음, 파이프라인을 수정하여 아래 블록을 삽입해 보겠습니다.

```js
post {
     always {
        emailext attachLog: true,
            subject: "'${currentBuild.result}'",
            body: "프로젝트: ${env.JOB_NAME}<br/>" +
                "빌드 번호: ${env.BUILD_NUMBER}<br/>" +
                "URL: ${env.BUILD_URL}<br/>",
            to: 'postbox.aj99@gmail.com',  // 여러분의 이메일 주소로 변경해주세요
            attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
        }
    }
```

# 단계 6: 쿠버네티스

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

이제 쿠버네티스 클러스터를 노드 그룹과 함께 설정할 차례입니다. 이를 통해 애플리케이션을 배포하고 관리할 수 있는 확장 가능한 환경을 제공받게 될 것입니다.

프로메테우스를 활용한 쿠버네티스 모니터링

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_38.png)

프로메테우스는 강력한 모니터링 및 경보 툴킷으로, 여러분은 쿠버네티스 클러스터를 모니터링하는 데 활용하게 될 것입니다. 게다가 헬름을 사용하여 노드 익스포터를 설치하여 클러스터 노드에서 지표를 수집할 것입니다.

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

Helm을 사용하여 Node Exporter 설치하기

쿠버네티스 클러스터를 모니터링하기 위해 프로메테우스 Node Exporter를 설치할 거에요. 이 구성 요소는 클러스터 노드에서 시스템 수준 메트릭을 수집할 수 있게 해줍니다. Helm을 사용하여 Node Exporter를 설치하는 단계는 다음과 같아요:

프로메테우스 커뮤니티 Helm 레포지토리를 추가하세요:

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

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

Node Exporter를 위한 Kubernetes 네임스페이스를 만들어주세요:

```bash
kubectl create namespace prometheus-node-exporter
```

Helm을 사용하여 Node Exporter를 설치해보세요:

```bash
helm install prometheus-node-exporter prometheus-community/prometheus-node-exporter --namespace prometheus-node-exporter
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

프로메테우스 구성(prometheus.yml)에 nodeip:9001/metrics에서 메트릭을 스크랩하기 위한 새 작업을 추가해 보세요:

프로메테우스 구성 파일(prometheus.yml)을 업데이트하여 nodeip:9001/metrics에서 메트릭을 스크랩하는 새 작업을 추가할 수 있습니다. 다음 설정을 prometheus.yml 파일에 추가하여 이 작업을 수행할 수 있어요.

```js
  - job_name: '넷플릭스'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['node1Ip:9100']
```

'your-job-name'을 작업에 대한 설명적인 이름으로 바꿔주세요. static_configs 섹션은 메트릭을 스크랩할 대상을 지정하는데, 이 경우에는 nodeip:9001으로 설정되어 있습니다.

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

반드시 이 변경 내용을 구성 파일에 적용하기 위해 Prometheus를 다시로드하거나 재시작하는 것을 잊지 마세요.

ArgoCD를 사용하여 응용 프로그램을 배포하려면 다음 단계를 따를 수 있어요. Markdown 형식으로 제시할게요:

# 단계 7: ArgoCD를 사용하여 응용 프로그램 배포하기

EKS Workshop 문서에서 제공된 지침을 따라 Kubernetes 클러스터에 ArgoCD를 설치할 수 있어요.

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
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

![ArgoCD](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_39.png)

```yaml
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}'
```

```yaml
export ARGOCD_SERVER=`kubectl get svc argocd-server -n argocd -o json | jq --raw-output '.status.loadBalancer.ingress[0].hostname'`
echo $ARGOCD_SERVER
export ARGO_PWD=`kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d`
echo $ARGO_PWD
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

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_40.png)

로드 밸런서 링크를 복사해서 브라우저에 붙여넣고, Advanced ==`를 클릭한 후 아래 링크를 클릭하세요.

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_41.png)

GitHub 저장소를 소스로 설정하기

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

ArgoCD를 설치한 후에는 응용 프로그램 배포를 위한 GitHub 저장소를 설정해야 합니다. 보통 이 과정에는 저장소와의 연결 구성 및 ArgoCD 응용 프로그램의 소스 정의가 포함됩니다. 구체적인 단계는 설정 및 요구 사항에 따라 다를 수 있습니다.

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_42.png)

![이미지](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_43.png)

- ArgoCD 응용 프로그램 생성:

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

- name: 애플리케이션의 이름을 설정하세요.
- destination: 애플리케이션을 배포할 대상지를 정의하세요.
- project: 애플리케이션이 속한 프로젝트를 지정하세요.
- source: 애플리케이션의 소스를 지정하세요. GitHub 리포지토리 URL, 리비전 및 리포지토리 내 애플리케이션 경로를 포함합니다.
- syncPolicy: 자동 동기화, 정리 및 자가치유를 포함한 동기화 정책을 구성하세요.

![2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_44.png](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_44.png)

이제 Argo CD를 사용하여 애플리케이션을 성공적으로 배포하였습니다.

Argo CD는 모든 실행 중인 애플리케이션을 지속적으로 모니터링하고 실행 상태를 Git 리포지토리에 지정된 원하는 상태와 비교하는 Kubernetes 컨트롤러입니다.

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

![image](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_45.png)

앱에 접속하기

- 앱에 접속하려면 보안 그룹에서 포트 30007이 열려 있는지 확인하고 새 탭을 열어 NodeIP:30007을 붙여넣기하면 앱이 실행됩니다.

![image](/assets/img/2024-07-07-DeployingaNetflixCloneonAWSADevSecOpsProject_46.png)

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

# 단계 8: 정리

AWS EC2 인스턴스 정리:

- 더 이상 필요하지 않은 AWS EC2 인스턴스를 종료합니다.
- EKS 클러스터 및 노드 그룹 종료
- 사용 중인 Elastic IP 제거

위 단계를 따르면 클라우드 상에서 Netflix 클론을 배포하고 관리하기 위한 완전히 기능적인 DevSecOps 파이프라인을 구축할 수 있습니다. 지침을 개별 환경과 요구 사항에 맞게 수정하는 것을 잊지 마세요.

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

# 감사합니다!
