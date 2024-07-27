---
title: "DevSecOps 프로젝트 CI CD, Docker, Kubernetes로 자바 기반 애완동물 쇼핑몰 애플리케이션 배포하는 방법"
description: ""
coverImage: "/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_0.png"
date: 2024-07-02 23:14
ogImage: 
  url: /assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_0.png
tag: Tech
originalTitle: "DevSecOps (DevOps) Project: Deploying a Petshop Java-Based Application with CI CD, Docker, and Kubernetes"
link: "https://medium.com/@21harsh12/devsecops-devops-project-deploying-a-petshop-java-based-application-with-ci-cd-docker-and-e737d3a5501b"
---


![Blog Image](https://miro.medium.com/v2/resize:fit:1198/0*SrFliCpFziZ8voqc.gif)

# 소개

안녕하세요! 이 블로그에서는 Jenkins를 CI/CD 도구로 활용하여 Petshop Java 기반 애플리케이션을 배포하는 과정을 안내하겠습니다. 본 배포과정은 컨테이너화를 위해 Docker, 컨테이너 조종을 위해 Kubernetes를 활용하며, Terraform, SonarQube, Trivy, Ansible과 같은 보안 및 자동화 도구를 포함합니다. 이 프로젝트는 현대적인 애플리케이션 배포에 대한 포괄적인 접근 방식을 보여주며, 자동화, 보안, 확장성을 강조합니다.

이 프로젝트를 통해 다양한 도전과제를 직접 마주하고 해결함으로써 문제 해결 능력을 크게 향상시키고 관련 기술에 대한 이해를 깊게 하게 되었습니다. 함께 살펴보도록 하죠! 🔍🛠️

<div class="content-ad"></div>

Ajay Kumar Yegireddi님께 프로젝트와 자세한 블로그를 제공해 주셔서 정말 감사드립니다. 해당 블로그는 제가 이 프로젝트를 성공적으로 완료하는 데 큰 도움이 되었습니다. 🙏🏽

이 프로젝트는 다양한 도구와 기술을 실전을 통해 경험할 수 있는 놀라운 학습 경험이었습니다. 현대 DevOps 관행에 중요한 요소들에 대한 실무 실습을 제공했습니다. 제 작업을 공유할 수 있어 기쁘고, 여러분의 피드백이나 질문을 기대합니다! 💬

# 경고⚠️

진행하기 전에 코드를 정확히 읽고 이해하도록 합니다. GitHub 저장소 URL, 자격 증명, DockerHub 사용자 이름 등의 변수를 필요에 맞게 수정하십시오. 이러한 변수를 업데이트하지 않으면 배포 과정에 영향을 줄 수 있습니다. 항상 구성을 두 번 확인하고 환경과 일치하는지 확인하십시오.

<div class="content-ad"></div>

# 프로젝트 개요

이 프로젝트의 목표는 안전하고 확장 가능하며 자동화된 방식으로 Java 기반의 Petshop 응용 프로그램을 배포하는 것입니다. 다음은 사용된 주요 구성 요소와 도구입니다:

- Jenkins는 지속적 통합 및 지속적 배포(CI/CD)용
- Docker는 응용 프로그램을 컨테이너화하는 데 사용
- Kubernetes는 컨테이너를 조절하는 데 사용
- Terraform은 인프라를 코드로 관리하기 위한 것
- SonarQube는 정적 코드 분석 및 품질 보증을 위해 사용
- Trivy는 컨테이너 보안 스캔용
- Ansible은 구성 관리 용

# Petshop Java 기반 응용 프로그램 배포를 위한 CI/CD 파이프라인

<div class="content-ad"></div>

CI/CD 파이프라인은 현대 소프트웨어 개발에서 중요한 구성 요소로, 팀이 고품질 소프트웨어를 효율적이고 신뢰성 있게 제공할 수 있도록 돕습니다. 아래는 Petshop Java 기반 애플리케이션을 위한 CI/CD 파이프라인에 대한 설명이 있습니다.

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_0.png)

# 파이프라인 개요

- 개발팀: 개발 팀은 코드를 작성하고 공유 저장소에 커밋합니다.
- GitHub: 프로젝트가 호스팅되는 코드 저장소. 개발자는 코드 변경을 GitHub에 커밋합니다.
- Jenkins: 빌드, 테스트 및 배포 프로세스를 자동화하는 CI/CD 도구. Jenkins는 코드 커밋을 감지하고 파이프라인을 트리거합니다.
- Maven: Java 애플리케이션을 빌드하고 컴파일하는 데 사용됩니다.
- Dependency-Check: 빌드 프로세스 중 취약한 종속성을 스캔하는 도구입니다.
- Ansible: Docker와 통합하여 플레이북을 사용하여 구성 및 배포를 관리합니다.
- Docker: 개발, 테스트 및 프로덕션 간에 일관된 환경을 위해 애플리케이션을 컨테이너화합니다.
- SonarQube: 코드 품질과 보안을 보장하기 위해 정적 코드 분석을 수행합니다.
- Trivy: 취약성을 유지하고 안전한 배포를 위해 Docker 이미지를 스캔합니다.
- Kubernetes: 컨테이너화된 애플리케이션 배포를 조정하고 스케일링 및 작업 관리를 수행합니다.

<div class="content-ad"></div>

# 상세한 파이프라인 설명

- GitHub에 커밋:
   - 작업: 개발자가 코드를 작성하고 변경 사항을 GitHub 저장소에 커밋합니다.
   - 중요성: 중앙 집중식 코드 관리는 버전 관리와 협업을 보장합니다.
- Jenkins 빌드 트리거:
   - 작업: Jenkins는 GitHub 저장소를 모니터링하여 새로운 커밋을 감지합니다. 새로운 커밋이 감지되면 Jenkins가 파이프라인을 트리거합니다.
   - 중요성: 통합 프로세스를 자동화하여 수동 개입을 줄이고 개발 주기를 가속화합니다.
- Maven 빌드:
   - 작업: Jenkins는 Maven을 사용하여 프로젝트를 빌드합니다. Maven은 코드를 컴파일하고 배포할 수 있는 형식(JAR 파일 등)으로 패키징합니다.
   - 중요성: 응용 프로그램이 소스 코드에서 일관되게 빌드될 수 있도록 보장합니다.
- 의존성-체크:
   - 작업: Maven은 프로젝트의 의존성을 스캔하기 위해 의존성-체크와 통합됩니다.
   - 중요성: 개발 프로세스 초기에 타사 라이브러리의 잠재적 보안 위험을 식별하고 완화합니다.
- Ansible Docker Playbook:
   - 작업: Ansible 플레이북은 Docker 컨테이너 설정을 자동화합니다. Jenkins가 Docker 환경이 올바르게 구성되었는지 확인하기 위해 Ansible을 사용합니다.
   - 중요성: 환경 설정 및 구성 관리를 단순화하여 서로 다른 환경 간에 일관성을 유지합니다.
- Docker 컨테이너화:
   - 작업: 어플리케이션을 Docker를 사용하여 컨테이너화하며 어플리케이션과 그 의존성을 하나의 컨테이너로 패키징합니다.
   - 중요성: 컨테이너는 "내 컴퓨터에서는 작동하는데"와 관련된 문제를 줄이는 일관된 런타임 환경을 제공합니다.
- Maven 컴파일 및 테스트:
   - 작업: Maven은 코드를 컴파일하고 어플리케이션이 예상대로 작동하는지 확인하기 위해 테스트를 실행합니다.
   - 중요성: 자동화된 테스트는 코드 변경이 새로운 버그를 도입하지 않도록 보장합니다.
- SonarQube 분석:
   - 작업: Jenkins는 코드 품질과 보안 문제를 확인하기 위해 SonarQube와 통합합니다.
   - 중요성: 전체 코드 품질과 안전 기준을 유지하여 어플리케이션이 신뢰할 수 있고 유지 관리가 가능하도록 보장합니다
- Trivy 보안 스캔:
   - 작업: Trivy는 배포 전에 Docker 이미지를 알려진 취약점에 대해 스캔합니다.
   - 중요성: 배포된 컨테이너가 안전하고 중요한 취약성이 없는지 확인합니다.
- Kubernetes 배포:
   - 작업: Jenkins가 컨테이너화된 어플리케이션을 Kubernetes 클러스터에 배포합니다.
   - 중요성: Kubernetes는 어플리케이션의 배포, 확장 및 운영을 관리하여 고가용성 및 신뢰성을 보장합니다.

# 메인 질문: 이 CI/CD 파이프라인이 필요한 이유???

- 자동화: 전체 빌드, 테스트 및 배포 프로세스를 자동화하여 수동 노력을 줄이고 효율성을 높입니다.
- 일관성: 응용 프로그램이 개발, 테스트 및 프로덕션 환경에서 동일하게 작동하는지 보장합니다.
- 품질 보증: SonarQube, Dependency-Check와 같은 도구를 통합하여 코드 품질과 보안을 유지합니다.
- 보안: 취약성을 스캔하는 Trivy를 사용하여 안전한 이미지만 배포되도록 합니다.
- 확장성: Kubernetes에 어플리케이션을 배포하여 수요에 따라 원활하게 확장될 수 있습니다.
- 신뢰성: 자동화된 테스팅과 분석을 통해 새로운 코드 변경이 어플리케이션을 망치지 않도록 보장하여 신뢰성을 유지합니다.

<div class="content-ad"></div>

결론적으로, 이 CI/CD 파이프라인은 견고하고 안전하며 확장 가능한 Petshop Java 기반 애플리케이션을 제공하는 데 필수적입니다. 전체 프로세스를 자동화함으로써, 애플리케이션이 항상 배포 가능한 상태여야 하며, 개발 라이프사이클 동안 코드 품질과 보안 기준을 유지하도록 보장합니다.

# Docker 및 Kubernetes(K8s) 모두를 사용하는 이유는?

CI/CD 파이프라인에서 Docker와 Kubernetes를 모두 사용하는 것은 각 기술의 강점을 활용하는 이점의 조합을 가져옵니다. Petshop Java 기반 애플리케이션을 배포하는 맥락에서 둘 다 사용되는 이유에 대한 설명은 다음과 같습니다:

## Docker: 컨테이너화

<div class="content-ad"></div>

- 일관된 환경: 도커는 애플리케이션과 필요한 모든 종속성을 컨테이너에 패키징합니다. 이를 통해 애플리케이션이 배포된 위치와 관계없이 항상 동일하게 작동하므로 "내 컴퓨터에서는 작동한다" 문제를 제거합니다.

- 격리: 컨테이너는 프로세스 격리를 제공하여 각 애플리케이션이 다른 것과 간섭하지 않는 자체 환경에서 실행됩니다. 이러한 격리로 보안과 안정성이 향상됩니다.

- 가벼움: 도커 컨테이너는 경량화되어 가상 머신과 비교해 빠르게 시작되므로 마이크로서비스 및 현대적인 애플리케이션 아키텍처에 이상적입니다.

- 이식성: 도커를 지원하는 모든 시스템에서 컨테이너를 실행할 수 있어 개발, 테스트, 제품 환경 간에 이식성을 제공합니다.

## 쿠버네티스: 오케스트레이션

- 확장성: 쿠버네티스는 수요에 따라 애플리케이션의 스케일링을 자동화합니다. 변동하는 부하를 처리하기 위해 실행 중인 컨테이너의 수를 자동으로 증가 또는 감소시킬 수 있습니다.

- 부하 분산: 쿠버네티스는 내장된 로드 밸런싱을 제공하여 여러 컨테이너 간에 트래픽을 분산시켜 가용성과 성능을 보장합니다.

- 자가 치유: 쿠버네티스는 실패한 컨테이너를 자동으로 다시 시작하고, 컨테이너를 교체하며, 노드가 실패할 때 컨테이너를 재스케줄링하여 애플리케이션이 계속 사용 가능하도록 합니다.

- 자동 배포: 쿠버네티스는 컨테이너의 배포를 관리하여 롤링 업데이트와 롤백을 쉽게 수행할 수 있습니다. 이를 통해 원활하고 중단되지 않는 애플리케이션 업데이트를 보장합니다.

- 자원 관리: 쿠버네티스는 클러스터 전체에서 CPU 및 메모리와 같은 자원을 효율적으로 관리하여 활용도와 성능을 최적화합니다.

## 결합된 혜택

<div class="content-ad"></div>

- 개발에서 운영으로: Docker는 개발 중 개별 애플리케이션을 패키징하고 실행하는 데 이상적입니다. Kubernetes는 이러한 Docker 컨테이너를 가져와 제대로 규모 확장하여 안정적으로 실행하는 인프라를 제공합니다.
- 마이크로서비스 아키텍처: 개별 마이크로서비스에 Docker를 사용하고 Kubernetes를 사용하여 이러한 마이크로서비스를 관리하면 유연하고 확장 가능하며 견고한 아키텍처를 구축할 수 있습니다.
- 복잡한 애플리케이션: Petshop Java 기반 애플리케이션과 같이 여러 구성 요소로 구성된 애플리케이션에 대해서는 Kubernetes가 각 구성 요소의 배포를 조정하고 이들 간의 의존성을 관리하며 원활하게 함께 작동하도록 보장할 수 있습니다.
- CI/CD 통합: CI/CD 파이프라인에서 Docker는 동일한 컨테이너화된 애플리케이션이 다른 단계에서 시험되고 배포되도록 보장하고, Kubernetes는 제공 환경으로의 배포가 관리되고 확장 가능하며 견고하게 실행되도록 보장합니다.

## 예시 워크플로우

# :::세부 단계별 안내:::

# 단계 1: 테라폼을 사용하여 Ubuntu (22.04) T2 Large 인스턴스 생성하기

<div class="content-ad"></div>

테라폼 IaC를 사용하여 전통적인 방법이 아닌 AWS에서 EC2 인스턴스를 시작하는 중이에요. AWS CLI를 설정하고 테라폼을 사용하는 방법에 익숙하다고 가정할게요.

먼저 다음과 같은 테라폼 설정이 포함된 main.tf 파일을 생성해주세요. 이 설정은 AWS EC2 인스턴스를 프로비저닝하기 위한 것이에요:

```js
# 공급자 설정
provider "aws" {
  region = "ap-south-1" # 지역 설정
}

# 모든 인바운드 및 아웃바운드 트래픽을 허용하는 새 보안 그룹 생성
resource "aws_security_group" "allow_all" {
  name        = "allow_all_traffic"
  description = "모든 인바운드 및 아웃바운드 트래픽을 허용하는 보안 그룹"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 인스턴스 시작
resource "aws_instance" "my_ec2_instance" {
  ami             = "ami-0f58b397bc5c1f2e8"
  instance_type   = "t2.large"
  key_name        = "MyNewKeyPair"
  security_groups = [aws_security_group.allow_all.name]

  # 루트 블록 장치 구성
  root_block_device {
    volume_size = 30
  }

  tags = {
    Name = "MyUbuntuInstance"
  }
}
```

그 다음, 초기화하고 테라폼 설정을 적용해주세요:

```js
terraform init
terraform apply
```

<div class="content-ad"></div>

# 단계 2: Jenkins, Docker, Trivy 설치하기

키페어로 EC2 인스턴스에 SSH로 연결한 후 다음 명령어를 실행하세요:

```js
# 패키지 업데이트
sudo apt update -y

# Jenkins 설치
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update -y
sudo apt install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Docker 설치
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update -y
sudo apt install docker-ce -y
sudo usermod -aG docker ${USER}
newgrp docker
sudo chmod 777 /var/run/docker.sock

# Trivy 설치
sudo apt install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt update -y
sudo apt install trivy -y
```

아파치 메이븐의 기본 프록시는 8080이기 때문에 Jenkins의 포트를 8080에서 8090으로 변경해야합니다.

<div class="content-ad"></div>


지금까지 여행을 즐겼나요? 여행 중에는 자주 발생하는 문제 중 하나가 업무와 관련된 일을 처리해야 할 때입니다. 이를 위해 제가 준비한 몇 가지 명령어를 사용해보세요!


sudo systemctl stop jenkins
sudo systemctl status jenkins
cd /etc/default
sudo vi jenkins   # HTTP_PORT=8090로 포트 변경 후 저장하고 종료
cd /lib/systemd/system
sudo vi jenkins.service  # Environments="Jenkins_port=8090"로 포트 변경 후 저장하고 종료
sudo systemctl daemon-reload
sudo systemctl restart jenkins
sudo systemctl status jenkins


이제 공용 IP 주소를 확인해보세요.


<EC2 공용 IP 주소: 8090>
# jenkins 비밀번호 확인
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
# jenkins 서버를 설정하고 나면 비밀번호를 변경하세요


![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_1.png)


<div class="content-ad"></div>

도커 설치 후에는 SonarQube 컨테이너를 생성합니다:

```bash
docker run -d --name sonar -p 9000:9000 sonarqube:lts-community
```

이제 SonarQube가 정상적으로 작동 중입니다.   
사용자 이름과 암호를 입력하고 로그인한 후 비밀번호를 변경해주세요.

```bash
username admin
password admin
```

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_2.png)

# 단계 3: Jenkins에 플러그인 설치하기

Jenkins에서 `Manage Jenkins` - `Available Plugins`으로 이동하여 다음 플러그인을 설치해주세요:

- JDK (Eclipse Temurin 설치기)
- SonarQube Scanner
- Maven
- OWASP Dependency Check


<div class="content-ad"></div>

글로벌 도구 구성에서 Java와 Maven 설정하기
Jenkins 관리 → 도구 → JDK(17)와 Maven3(3.6.0) 설치 → 적용 및 저장 클릭하기

![이미지1](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_3.png)

![이미지2](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_4.png)

파이프라인 옵션으로 새 작업 만들기:

<div class="content-ad"></div>

이미지 태그를 마크다운 형식으로 바꿔주세요.

파이프라인 스크립트:

```js
pipeline{
    agent any
    tools {
        jdk 'jdk17'
        maven 'maven3'
    }
    stages{
        stage ('작업 공간 정리'){
            steps{
                cleanWs()
            }
        }
        stage ('소스 코드 체크아웃') {
            steps {
                git 'https://github.com/<당신의-java-프로젝트-저장소-또는-복제한-저장소>' #https://github.com/Harshit-cyber-bit/jpetstore-6
            }
        }
        stage ('maven 컴파일') {
            steps {
                sh 'mvn clean compile'
            }
        }
        stage ('maven 테스트') {
            steps {
                sh 'mvn test'
            }
        }
   }
}
```

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_6.png)

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_7.png)

# 단계 4: Jenkins에서 SonarQube 서버 설정하기

EC2 인스턴스의 공용 IP 주소를 가져옵니다. SonarQube는 9000번 포트에서 작동하기 때문에 `공용 IP 주소`:9000으로 액세스할 수 있습니다.
계속 진행하려면 SonarQube 서버로 이동한 다음 다음 단계를 따릅니다:
관리 → 보안 → 사용자 → 토큰을 클릭합니다. 그런 다음 이름을 제공하고 "토큰 생성"을 클릭하여 토큰을 업데이트하고 복사합니다.

Jenkins 대시보드로 이동한 다음 관리 Jenkins → 자격 증명 → 비밀 텍스트 추가로 이동합니다. 화면은 다음과 같아야 합니다:

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_8.png)

그 다음으로 Jenkins 대시보드로 이동한 후, Manage Jenkins → System으로 이동하여 아래 이미지에 표시된대로 필요한 구성을 추가해주세요.

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_9.png)

이제 우리는 도구에 소나 스캐너를 설치할 것입니다.

<div class="content-ad"></div>

![링크 텍스트](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_10.png)

SonarQube 대시보드에서 품질 게이트를 추가하려면 Administration → Configuration → Webhooks로 이동하세요.

![링크 텍스트](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_11.png)

자세한 내용을 추가하세요.

<div class="content-ad"></div>


# 이름: jenkins
# 품질 게이트의 URL 섹션 중에 다음을 추가하세요
[http://jenkins-public-ip:8090](http://jenkins-public-ip:8090)/sonarqube-webhook/
# 시크릿란을 비워둡니다.

이제 이 스크립트를 파이프라인에 추가하십시오 (대시보드 → 펫스토어 → 구성) 그리고 우리가 한 SonarQube 단계를 테스트하세요:

```js
# 도구 섹션에 다음을 환경으로 추가하세요
environment {
    SCANNER_HOME=tool 'sonar-scanner'
}
# 단계에 다음을 추가하세요
stage("Sonarqube Analysis") {
    steps {
        withSonarQubeEnv('sonar-server') {
            sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Petshop \
            -Dsonar.java.binaries=. \
            -Dsonar.projectKey=Petshop '''
        }
    }
}
stage("품질 게이트") {
    steps {
        script {
            waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
        }
    }
}
```

적용하고 저장한 다음 빌드를 실행하세요. 이제 SonarQube 서버로 이동하여 프로젝트로 이동하세요:


<div class="content-ad"></div>

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_12.png)

# 단계 5: OWASP 의존성 체크 플러그인 설치

Jenkins 대시보드에 가서 Manage Jenkins → 플러그인으로 이동하세요. OWASP Dependency-Check 플러그인을 찾은 후 클릭하여 재시작 없이 설치하세요.

플러그인 설치 후, Dashboard → Manage Jenkins → Tools 로 이동해 도구의 구성을 진행하세요.

<div class="content-ad"></div>

이미지 태그를 다음과 같이 Markdown 형식으로 변경해주세요:


![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_13.png)


지금 OWASP 스크립트를 파이프라인에 추가하세요:

```js
stage ('Build war file'){
    steps {
        sh 'mvn clean install -DskipTests=true'
    }
}
stage("OWASP Dependency Check"){
    steps{
        dependencyCheck additionalArguments: '--scan ./ --format XML ', odcInstallation: 'DP-Check'
        dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
    }
}
```

적용한 후 저장하고 빌드하세요.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_14.png)

보고서를 확인하실 수 있습니다.

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_15.png)

![이미지](https://miro.medium.com/v2/resize:fit:1280/0*2D2vHmHPBfxgR0kt.gif)

<div class="content-ad"></div>

# 단계 6: 도커 설정

젠킨스에서 "Manage Jenkins - Available Plugins"로 이동해서 다음 플러그인을 설치해주세요:
- Docker
- Docker Commons
- Docker Pipeline
- Docker API
- docker-build-step

이제 대시보드로 가서 Jenkins 관리 → 도구로 이동해주세요.

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_16.png)

<div class="content-ad"></div>

글로벌 자격 증명에 DockerHub 사용자 이름과 암호(액세스 토큰)을 추가하세요:

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_17.png)

# 단계 7: Ansible 저장소 추가 및 Ansible 설치

SSH를 통해 인스턴스에 연결하여 서버에 Ansible을 설치하려면 다음 명령어를 실행하세요:

<div class="content-ad"></div>

```bash
sudo apt update -y
sudo apt install software-properties-common -y
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible -y
sudo apt install ansible-core -y
ansible --version #to check if it installed properly or not
```

인벤토리를 추가하려면 새 디렉토리를 만들거나 기본 Ansible 호스트 파일에 추가할 수 있습니다.

```bash
cd /etc/ansible
sudo vi hosts
```

```bash
[local]
<Jenkins의 IP>
```

<div class="content-ad"></div>

저장하고 나가기

제이킨스 관리 - 가능한 플러그인으로 이동하여 Ansible 플러그인을 설치하세요.

이제 제이킨스로 Ansible을 호출하기 위해 자격 증명을 추가해보세요.

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_18.png)

<div class="content-ad"></div>

개인 키 섹션에 .pem 키 파일 내용을 직접 붙여넣으세요.

서버에서 Ansible 경로를 확인하기 위해 다음과 같이 입력하세요.

```js
which ansible
```

경로를 복사해서 여기에 붙여넣으세요:

<div class="content-ad"></div>

![Ansible playbook](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_19.png)

이제 Ansible playbook을 작성해보겠습니다. 해당 playbook은 Docker 이미지를 빌드하고 태깅한 뒤 Docker Hub에 푸시하고, Ansible을 사용하여 해당 이미지를 컨테이너에 배포합니다.

이미 깃허브 레포지토리에 준비가 되어있지만, DockerHub 자격 증명을 사용할 수 있게 수정해야 합니다:

![DockerHub credentials](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_20.png)

<div class="content-ad"></div>

다음은 도커 이미지를 빌드하고 Docker Hub에 푸시한 뒤 컨테이너를 실행하는 파이프라인 단계를 포함해 주세요.

```yaml
stage('도커 설치') {
  steps {
    dir('Ansible') {
      script {
        ansiblePlaybook credentialsId: 'ssh', disableHostKeyChecking: true, installation: 'ansible', inventory: '/etc/ansible/', playbook: 'docker-playbook.yaml'
      }
    }
  }
}
```

이제 파이프라인 빌드 과정을 마치면 아래 URL을 방문하여 웹 애플리케이션의 결과를 확인할 수 있습니다.

```yaml
<jenkins-ip:8081>/jpetstore
```

<div class="content-ad"></div>

![Kubernetes Setup](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_21.png)

# Step 8: Kubernetes 설정

Kubernetes 마스터-슬레이브 세트업을 위해 두 개의 인스턴스를 생성하세요. 아래 Terraform 코드를 사용하거나 AWS 콘솔을 통해 전통적으로 생성할 수 있습니다:

```js
# 공급자 구성
provider "aws" {
  region = "ap-south-1" # 지역을 지정하세요.
}

# 모든 인바운드 및 아웃바운드 트래픽을 허용하는 새 보안 그룹 생성
resource "aws_security_group" "allow_all" {
  name        = "allow_all_traffic"
  description = "모든 인바운드 및 아웃바운드 트래픽을 허용하는 보안 그룹"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 첫 번째 EC2 인스턴스 시작
resource "aws_instance" "my_ec2_instance1" {
  ami             = "ami-0f58b397bc5c1f2e8" # 귀하의 지역에 유효한 AMI ID를 확인하세요.
  instance_type   = "t2.medium"
  key_name        = "MyNewKeyPair"
  security_groups = [aws_security_group.allow_all.name]

  # 기본 크기의 루트 블록 디바이스 (대부분의 Linux AMIs의 경우 8GB)
  root_block_device {
    volume_size = 8
  }

  tags = {
    Name = "k8s-master"
  }
}

# 두 번째 EC2 인스턴스 시작
resource "aws_instance" "my_ec2_instance2" {
  ami             = "ami-0f58b397bc5c1f2e8" # 귀하의 지역에 유효한 AMI ID를 확인하세요.
  instance_type   = "t2.medium"
  key_name        = "MyNewKeyPair"
  security_groups = [aws_security_group.allow_all.name]

  # 기본 크기의 루트 블록 디바이스 (대부분의 Linux AMIs의 경우 8GB)
  root_block_device {
    volume_size = 8
  }

  tags = {
    Name = "k8s-slave"
  }
}
```

<div class="content-ad"></div>

젠킨스 머신에 Kubectl과 Minikube 설치하기

```js
# Kubectl 설치
sudo apt-get update
sudo apt-get install -y apt-transport-https gnupg2 curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
kubectl version --client

# Minikube 설치
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
minikube start
```

간편하게 처리하기 위해 새로 생성된 인스턴스를 SSH를 사용하여 옆으로 두어 하나는 master로 다른 하나는 worker로 호스트 이름을 변경할 수 있습니다. 다음 명령어를 사용하여 설정할 수 있어요.

```js
sudo su
hostname master # 두 번째는 worker로 설정
bash
clear
```

<div class="content-ad"></div>

이제 이 명령어를 마스터 및 워커 노드에서 실행해주세요:

```bash
sudo apt-get update

sudo apt-get install -y docker.io
sudo usermod –aG docker Ubuntu
newgrp docker
sudo chmod 777 /var/run/docker.sock

sudo curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo tee /etc/apt/sources.list.d/kubernetes.list <<EOF
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF

sudo apt-get update

echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
sudo apt update
sudo apt install -y kubelet kubeadm kubectl

sudo snap install kube-apiserver
```

![마스터 인스턴스](https://miro.medium.com/v2/resize:fit:996/0*OvfCxkODfhGF5-Fy.gif)

## 마스터 인스턴스에서,

<div class="content-ad"></div>

```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
# 만약 관리자(root) 모드에 있으면 종료하고 아래 명령어를 실행하세요
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

## 워커 인스턴스에서는,

```bash
sudo kubeadm join <master-node-ip>:<master-node-port> --token <token> --discovery-token-ca-cert-hash <hash>
```

Jenkins 마스터나 로컬 파일 관리자로 구성 파일을 복사하여 저장하고, 마스터 노드에서 찾을 수 있습니다.

<div class="content-ad"></div>

```js
cd /.kube
cat config
```

그걸 복사해서 문서나 다른 폴더에 secret-file.txt로 저장하세요.

젠킨에 k8s 플러그인을 설치하세요.

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_22.png)


<div class="content-ad"></div>

이제 Jenkins 관리로 이동하세요 - 자격 증명 - 시스템 - 전역 자격 증명 - 자격 증명 추가하기

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_23.png)

# 단계 9: Ansible 및 Kubernetes 마스터-슬레이브 설정

Kubernetes 클라이언트와의 통신을 가능하게 하려면 Ansible 노드에 SSH 키를 생성하고 Kubernetes 마스터 시스템과 공유해야 합니다.

<div class="content-ad"></div>

주요한 메인 인스턴스(젠킨을 실행 중인 인스턴스, 마스터-워커가 아닌)에서 다음과 같이 명령어를 입력해 주세요.

```js
ssh-keygen
```

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_24.png)

.ssh 디렉토리로 변경하고 공개 키(id_rsa.pub)를 복사하세요.

<div class="content-ad"></div>

```js
cd .ssh
cat id_rsa.pub  # 이 공개 키를 복사하세요
```

Ansible Main에서 공개 키를 복사한 후, Kubernetes 마스터 머신의 .ssh 디렉토리로 이동하여 복사한 공개 키를 authorized_keys 파일에 붙여넣으세요.

```js
cd .ssh  # k8s 마스터 머신에서
sudo vi authorized_keys
```

메인에서 공개 키를 Kubernetes 머신에 추가하면 더 이상 키를 사용한 액세스가 구성됩니다. 확인하려면 다음 명령 형식을 사용하여 Kubernetes 마스터에 액세스해 보세요.

<div class="content-ad"></div>

```js
ssh ubuntu@<public-ip-k8s-master>
```

이제 Ansible 서버의 호스트 파일을 열어 Kubernetes 마스터의 공개 IP를 추가하세요.

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_25.png)

```js
[k8s]
k8s 마스터의 공개 IP
```

<div class="content-ad"></div>

## Ansible 마스터-슬레이브 연결 테스트

```js
ansible -m ping all # 주 인스턴스에서 실행
```

파이프라인에 단계 추가 및 작업 빌드:

```js
stage('ansible을 사용한 k8s') {
    steps {
        dir('Ansible') {
            script {
                ansiblePlaybook credentialsId: 'ssh', disableHostKeyChecking: true, installation: 'ansible', inventory: '/etc/ansible/', playbook: 'kube.yaml'
            }
        }
    }
}
```

<div class="content-ad"></div>

Kubernetes 클러스터에서 다음 명령어를 실행해주세요.

```js
kubectl get all
kubectl get svc
```

```js
<slave-ip:serviceport(30699)>/jpetstore
# 포트는 달라질 수 있으니, 위 명령어(kubectl get all)에서 확인할 수 있어요.
```

![이미지](/assets/img/2024-07-02-DevSecOpsDevOpsProjectDeployingaPetshopJava-BasedApplicationwithCICDDockerandKubernetes_26.png)

<div class="content-ad"></div>

# 완성된 파이프라인:

```js
파이프라인{
    에이전트 모두
    도구 {
        jdk 'jdk17'
        메이븐 'maven3'
    }
    환경 {
        SCANNER_HOME=tool 'sonar-scanner'
    }
    단계{
        단계 ('작업 폴더 정리'){
            단계{
                cleanWs()
            }
        }
        단계 ('소스 코드 체크아웃') {
            단계 {
                git 'https://github.com/your-github-repo'
            }
        }
        단계 ('메이븐 컴파일') {
            단계 {
                sh 'mvn clean compile'
            }
        }
        단계 ('메이븐 테스트') {
            단계 {
                sh 'mvn test'
            }
        }
        단계("소나큐브 분석 "){
            단계{
                withSonarQubeEnv('sonar-server') {
                    sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Petstore \
                    -Dsonar.java.binaries=. \
                    -Dsonar.projectKey=Petstore '''
                }
            }
        }
        단계("품질 게이트"){
            단계 {
                스크립트 {
                  waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
                }
           }
        }
        단계 ('War 파일 빌드'){
            단계{
                sh 'mvn clean install -DskipTests=true'
            }
        }
        단계("OWASP 의존성 체크"){
            단계{
                dependencyCheck additionalArguments: '--scan ./ --format XML ', odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        단계('앤서블 도커 설정') {
            단계 {
                디렉토리('앤서블'){
                  스크립트 {
                        ansiblePlaybook credentialsId: 'ssh', disableHostKeyChecking: true, installation: 'ansible', inventory: '/etc/ansible/', playbook: 'docker.yaml'
                    }
                }
            }
        }
        단계('앤서블을 사용한 k8s 설정'){
            단계{
                디렉토리('앤서블') {
                    스크립트{
                        ansiblePlaybook credentialsId: 'ssh', disableHostKeyChecking: true, installation: 'ansible', inventory: '/etc/ansible/', playbook: 'kube.yaml'
                    }
                }
            }
        }
   }
}
```

# 결론

이러한 단계를 따라서 우리는 Jenkins, Docker, Kubernetes, Terraform, SonarQube, Trivy, 그리고 앤서블을 사용하여 Java 기반 Petshop 애플리케이션을 성공적으로 배포했습니다. 이 프로젝트는 현대 애플리케이션 배포에 대한 포괄적인 접근 방식을 보여주었을 뿐만 아니라 데브옵스 파이프라인에서의 자동화와 보안의 중요성을 강조합니다.

<div class="content-ad"></div>

이 여정은 인프라 프로비저닝부터 지속적 통합 및 배포, 컨테이너화, 오케스트레이션, 견고한 보안 조치까지 소중한 학습 경험이었습니다. 이 상세 가이드가 여러분의 배포 프로젝트에 도움이 되고 데브세커스 옵스 영역의 강력한 도구와 기술을 탐험하게 도와주기를 바랍니다.

궁금한 점이 있거나 공유하고 싶은 내용이 있는 경우 연락해주세요. 여기 제 포트폴리오에서도 저를 디엠해주세요. 

앞으로의 여정, 제 프로젝트, 사이버 보안 이야기, 글들을 계속해서 팔로우해주셔서 감사합니다! 🚀

![Traveler](https://miro.medium.com/v2/resize:fit:996/0*YG0Vg5Tz3c-1Peij.gif)

우리의 스킬을 강화하고 안전하고 확장 가능한 애플리케이션을 함께 만들어 나가요! #데브옵스 #데브세커스옵스 #CI #CD #AWS #Terraform #Jenkins #Docker #Kubernetes #보안자동화 #SonarQube #Trivy #Ansible