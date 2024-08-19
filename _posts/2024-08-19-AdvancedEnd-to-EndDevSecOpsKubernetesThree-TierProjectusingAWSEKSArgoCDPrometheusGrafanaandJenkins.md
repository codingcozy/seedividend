---
title: "AWS EKS를 활용한 고급 DevSecOps Kubernetes 3계층 프로젝트 - ArgoCD, Prometheus, Grafana, Jenkins 사용하기"
description: ""
coverImage: "/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_0.png"
date: 2024-08-19 03:06
ogImage: 
  url: /assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_0.png
tag: Tech
originalTitle: "Advanced End-to-End DevSecOps Kubernetes Three-Tier Project using AWS EKS, ArgoCD, Prometheus, Grafana, and Jenkins"
link: "https://medium.com/stackademic/advanced-end-to-end-devsecops-kubernetes-three-tier-project-using-aws-eks-argocd-prometheus-fbbfdb956d1a"
isUpdated: true
updatedAt: 1724032874346
---



![Project Introduction](https://miro.medium.com/v2/resize:fit:1400/1*yy-REEUGhUP6828ftFD93g.gif)

# 프로젝트 소개:

End-to-End DevSecOps Kubernetes 프로젝트 안내에 오신 것을 환영합니다! 이 포괄적인 프로젝트에서는 Kubernetes와 AWS를 사용하여 견고한 삼다 계층 구조를 설정하는 과정을 안내합니다. 또한 DevOps의 최상의 관행과 보안 조치를 적용합니다. 이 프로젝트는 확장 가능한 애플리케이션 환경을 배포, 보호 및 모니터링하는 실습 경험을 제공하는 데 목표가 있습니다.

# 프로젝트 개요:


<div class="content-ad"></div>

이 프로젝트에서는 다음과 같은 핵심 측면을 다룰 예정입니다:

- IAM 사용자 설정: AWS에서 필요한 권한이 있는 IAM 사용자를 만들어 배포 및 관리 작업을 용이하게 합니다.
- 코드로 하는 인프라 (IaC): Terraform과 AWS CLI를 사용하여 AWS의 Jenkins 서버 (EC2 인스턴스)를 설정합니다.
- Jenkins 서버 구성: Jenkins 자체, Docker, Sonarqube, Terraform, Kubectl, AWS CLI 및 Trivy와 같은 필수 도구를 Jenkins 서버에 설치하고 구성합니다.
- EKS 클러스터 배포: eksctl 명령을 사용하여 AWS의 관리형 쿠버네티스 서비스인 Amazon EKS 클러스터를 생성합니다.
- 로드 밸런서 구성: EKS 클러스터용 AWS Application 로드 밸런서 (ALB)를 구성합니다.
- Amazon ECR 저장소: Amazon Elastic Container Registry (ECR)에서 frontend 및 backend Docker 이미지용 개인 저장소를 생성합니다.
- ArgoCD 설치: 지속적 배포와 GitOps를 위해 ArgoCD를 설치하고 설정합니다.
- Sonarqube 통합: DevSecOps 파이프라인에서 코드 품질 분석을 위해 Sonarqube를 통합합니다.
- Jenkins 파이프라인: 백엔드 및 프론트엔드 코드를 EKS 클러스터로 배포하기 위한 Jenkins 파이프라인을 생성합니다.
- 모니터링 설정: Helm, Prometheus 및 Grafana를 사용하여 EKS 클러스터를 모니터링합니다.
- ArgoCD 애플리케이션 배포: 데이터베이스, 백엔드, 프론트엔드 및 인그레스 구성 요소를 포함한 Three-Tier 애플리케이션을 배포하기 위해 ArgoCD를 사용합니다.
- DNS 구성: 사용자 정의 서브도메인을 통해 애플리케이션에 액세스할 수 있도록 DNS 설정을 구성합니다.
- 데이터 유지: 데이터베이스 팟의 지속적인 데이터 유지를 보장하기 위해 지속 볼륨 및 지속 볼륨 클레임을 구현합니다.
- 결론 및 모니터링: 주요 성과를 요약하고 Grafana를 사용하여 EKS 클러스터의 성능을 모니터링하여 프로젝트를 마무리합니다.

# 전제 조건:

프로젝트를 시작하기 전에 다음 전제 조건을 충족하는지 확인하십시오:

<div class="content-ad"></div>

- 리소스를 생성할 권한을 가진 AWS 계정이 필요합니다.
- 로컬 머신에 Terraform 및 AWS CLI가 설치되어 있어야 합니다.
- Kubernetes, Docker, Jenkins 및 DevOps 원칙에 대한 기본적인 이해가 필요합니다.

# 단계 1: IAM 사용자 생성 및 AWS 액세스 키 생성

테스트 목적으로 새 IAM 사용자를 AWS에 생성하고 AdministratorAccess를 부여하십시오 (조직 프로젝트에 권장되지 않음)

AWS IAM 서비스로 이동하고 사용자를 클릭하세요.

<div class="content-ad"></div>


<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_0.png" />

Create a new user by clicking on the button.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_1.png" />

Enter the name for the user and click on the Next button.


<div class="content-ad"></div>

![GitHubTable](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_2.png)

"Attach policies directly" 옵션을 선택하고 AdministratorAccess를 검색한 후 선택하세요.

다음을 클릭하세요.

![GitHubTable](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_3.png)

<div class="content-ad"></div>

아래의 표를 Markdown 형식으로 바꿔주세요.

Click on Create user

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_4.png" />

Now, Select your created user then click on Security credentials and generate access key by clicking on Create access key.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_5.png" />

<div class="content-ad"></div>

Command Line Interface (CLI)를 선택한 후 확인란을 선택하고 다음 단추를 클릭하세요.

![Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_6.png)

설명을 제공하고 생성 액세스 키를 클릭하세요.

![Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_7.png)

<div class="content-ad"></div>

여기서 자격 증명을 받았고 미래를 위해 CSV 파일을 다운로드할 수 있습니다.

![Credentials](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_8.png)

# 단계 2: Terraform 및 AWS CLI를 설치하여 AWS에 Jenkins 서버(EC2)를 배포합니다.

로컬 머신에 Terraform 및 AWS CLI를 설치하고 구성하여 AWS 클라우드에 Jenkins 서버를 만듭니다.

<div class="content-ad"></div>

테라폼 설치 스크립트

```js
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg - dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update
sudo apt install terraform -y
```

AWSCLI 설치 스크립트

```js
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install
```

<div class="content-ad"></div>

지금 두 가지 도구를 설정해 보세요.

테라폼 설정하기

아래 명령어를 사용하여 파일 /etc/environment을 수정하고 강조된 줄을 추가하고 실제 키를 블러 공간에 추가하세요.


sudo vim /etc/environment


<div class="content-ad"></div>


![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_9.png)

환경 변수 변경 후, 컴퓨터를 재시작하여 변경 사항을 반영하세요.

AWS CLI 구성

아래 명령어를 실행하여 키를 추가하세요


<div class="content-ad"></div>

```js
aws configure
```

![Screenshot](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_10.png)

# 단계 3: 테라폼을 사용하여 Jenkins 서버(EC2)를 배포합니다

Git 저장소를 복제하십시오- https://github.com/AmanPathak-DevOps/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project

<div class="content-ad"></div>

Jenkins-Server-TF로 이동해주세요.

백엔드.tf 파일을 수정하여 버킷 이름과 DynamoDB 테이블을 변경해주세요 (둘 다 AWS 클라우드에서 수동으로 생성한 것을 확인해주세요).

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_11.png)

이제 Pem 파일 이름을 다른 이름으로 바꿔야 합니다. 이미 AWS에서 생성한 Pem 파일 이름을 제공해주세요.

<div class="content-ad"></div>

아래 명령을 실행하여 백엔드를 초기화하세요.

```js
terraform init
```

<div class="content-ad"></div>

아래 명령어를 실행하여 구문 오류를 확인해보세요.

```js
terraform validate
```

![Error](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_14.png)

어떤 종류의 AWS 서비스가 생성될지 블루프린트를 확인하려면 아래 명령어를 실행하세요.

<div class="content-ad"></div>

```js
terraform plan -var-file=variables.tfvars
```

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_15.png" />

이제 아래 명령어를 실행하여 AWS 클라우드에서 인프라를 생성합니다. 최대 3~4분이 소요될 수 있습니다.

```js
terraform apply -var-file=variables.tfvars --auto-approve
```

<div class="content-ad"></div>

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_16.png" />

이제 Connect를 클릭하여 Jenkins 서버에 연결합니다.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_17.png" />

ssh 명령을 복사하여 로컬 머신에 붙여넣기 하세요.

<div class="content-ad"></div>


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_18.png)

# 단계 4: Jenkins 구성

이제 Jenkins 서버에 로그인했습니다.

![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_19.png)


<div class="content-ad"></div>

저희는 젠킨스, 도커, 소나큐브, 테라폼, 쿠버네티스, AWS CLI, 그리고 Trivy와 같은 서비스들을 설치했습니다.

이제 모든 것이 제대로 설치되었는지 확인해 보겠습니다.

```js
jenkins --version
docker --version
docker ps
terraform --version
kubectl version
aws --version
trivy --version
eksctl --version
```

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_20.png" />

<div class="content-ad"></div>


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_21.png)

이제 Jenkins를 구성해야 합니다. Jenkins 서버의 공용 IP를 복사하고 즐겨 사용하는 브라우저에 8080 포트로 붙여넣으십시오.

![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_22.png)

"Install suggested plugins"을 클릭하세요.


<div class="content-ad"></div>


![image1](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_23.png)

The plugins will be installed

![image2](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_24.png)

After installing the plugins, continue as admin


<div class="content-ad"></div>

![AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_25.png](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_25.png)

Save and Finish를 클릭해주세요.

![AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_26.png](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_26.png)

Start using Jenkins를 클릭해주세요.

<div class="content-ad"></div>


<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_27.png" />

다음 코드 조각처럼 Jenkins 대시보드가 표시될 것입니다.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_28.png" />

# 단계 5: eksctl 명령어를 사용하여 EKS 클러스터를 배포할 것입니다.


<div class="content-ad"></div>

지금은 Jenkins 서버 터미널로 돌아가서 AWS를 구성해보세요.

![AWS Configuration](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_29.png)

Manage Jenkins로 이동하세요.

플러그인을 클릭하세요.

<div class="content-ad"></div>

`<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_30.png" />`

다음 플러그인을 설치하려면 사용 가능한 플러그인을 선택하고 설치를 클릭하세요.

AWS 자격 증명

Pipeline: AWS 단계

<div class="content-ad"></div>


![Screenshot 1](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_31.png)

Once both plugins are installed, restart your Jenkins service by checking the Restart Jenkins option.

![Screenshot 2](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_32.png)

Log in to your Jenkins Server again.


<div class="content-ad"></div>

`<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_33.png" />`

이제 Jenkins에서 AWS 자격 증명을 설정해야 합니다.

Manage Plugins로 이동하고 Credentials를 클릭하세요.

`<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_34.png" />`

<div class="content-ad"></div>

글로벌을 클릭해주세요.


<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_35.png" />


종류로 AWS 자격 증명을 선택하고, 아래 스니펫에 표시된대로 ID를 추가하십시오. AWS 액세스 키 및 보안 액세스 키를 제외하고 동일한 ID를 추가하신 후 '생성'을 클릭하세요.


<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_36.png" />


<div class="content-ad"></div>

아래 스니펫과 같은 자격 증명이 생성될 것입니다.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_37.png" />

이제 GitHub 자격 증명을 추가해야 합니다. 왜냐하면 현재 내 저장소가 비공개 상태이기 때문이죠.

산업 프로젝트에서 저장소가 비공개 상태일 것이기 때문에 이 작업을 수행하고 있습니다.

<div class="content-ad"></div>

깁허브 계정의 사용자 이름과 개인 액세스 토큰을 추가해주세요.

Markdown 형식으로 테이블을 변경해주세요.

두 자격 증명은 다음과 같이 보일 것입니다.

Markdown 형식으로 테이블을 변경해주세요.

<div class="content-ad"></div>

아래 명령어를 사용하여 EKS 클러스터를 생성해보세요.

```js
eksctl create cluster --name Three-Tier-K8s-EKS-Cluster --region us-east-1 --node-type t2.medium --nodes-min 2 --nodes-max 2
aws eks update-kubeconfig --region us-east-1 --name Three-Tier-K8s-EKS-Cluster
```

![cluster](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_40.png)

클러스터가 생성되면 아래 명령어를 사용하여 노드가 준비되었는지 확인할 수 있습니다.

<div class="content-ad"></div>

```bash
kubectl get nodes
```

![Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_41.png)

# Step 6: 이제, 우리는 응용 프로그램이 인그레스 컨트롤러를 갖게 될 것이므로 EKS에서 로드 밸런서를 구성할 것입니다.

로드 밸런서 전제 조건을 위한 정책을 다운로드하세요.

<div class="content-ad"></div>

마크다운 형식을 사용하여 표 태그를 변경하세요.

```js
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json
```

![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_42.png)

아래 명령어를 사용하여 IAM 정책을 만드세요.

```js
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
```

<div class="content-ad"></div>


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_43.png)

OIDC 제공자 만들기

```js
eksctl utils associate-iam-oidc-provider --region=us-east-1 --cluster=Three-Tier-K8s-EKS-Cluster --approve
```

![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_44.png)


<div class="content-ad"></div>

아래 명령어를 사용하여 서비스 계정을 생성하고 귀하의 계정 ID로 교체해주세요.

```js
eksctl create iamserviceaccount --cluster=Three-Tier-K8s-EKS-Cluster --namespace=kube-system --name=aws-load-balancer-controller --role-name AmazonEKSLoadBalancerControllerRole --attach-policy-arn=arn:aws:iam::<your_account_id>:policy/AWSLoadBalancerControllerIAMPolicy --approve --region=us-east-1
```

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_45.png" />

AWS 로드 밸런서 컨트롤러를 배포하려면 아래 명령어를 실행하십시오.

<div class="content-ad"></div>

```js
sudo snap install helm --classic
helm repo add eks https://aws.github.io/eks-charts
helm repo update eks
helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName=my-cluster --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
```

2분 후에 아래 명령어를 실행하여 파드가 실행 중인지 확인해보세요.

```js
kubectl get deployment -n kube-system aws-load-balancer-controller
``` 

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_46.png)


<div class="content-ad"></div>

# Step 7: Amazon ECR Private Repositories 생성이 필요합니다. (Frontend 및 Backend)

"Create repository"를 클릭하세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_47.png)

Private 옵션을 선택하여 저장소를 제공하고 저장을 클릭하세요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_48.png)

백엔드 저장소에 대해서도 동일한 작업을 수행한 후 저장 버튼을 클릭합니다.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_49.png)

이제 ECR 프라이빗 저장소를 설정하였습니다.


<div class="content-ad"></div>


![AWS ECR Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_50.png)

Now, we need to configure ECR locally because we have to upload our images to Amazon ECR.

Copy the 1st command for login

![AWS ECR Command](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_51.png)


<div class="content-ad"></div>

지금은 복사한 명령을 Jenkins Server에서 실행하세요.


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_52.png)


# 단계 8: ArgoCD 설치 및 구성

우리는 3계층 네임스페이스에 애플리케이션을 배포할 것입니다. 이를 위해 EKS에서 3계층 네임스페이스를 생성할 것입니다.

<div class="content-ad"></div>

```bash
kubectl create namespace three-tier
```

![Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_53.png)

저희 두 개의 ECR 저장소는 비공개입니다. 따라서 이미지를 ECR 저장소로 푸시하려고 시도하면 Imagepullerror 오류가 발생합니다.

이 오류를 해결하려면 아래 명령을 사용하여 ECR Repo를 위한 시크릿을 생성한 다음, 이 시크릿을 배포 파일에 추가하겠습니다.

<div class="content-ad"></div>

주의: 비밀 정보는 앞에서 ECR에 로그인할 때 생성되는 .docker/config.json 파일에서 나옵니다.

```js
kubectl create secret generic ecr-registry-secret \
  --from-file=.dockerconfigjson=${HOME}/.docker/config.json \
  --type=kubernetes.io/dockerconfigjson --namespace three-tier
kubectl get secrets -n three-tier
```

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_54.png" />

이제, ArgoCD를 설치할 것입니다.

<div class="content-ad"></div>

이를 위해 별도의 이름 공간을 만들고 설치를 위해 argocd 구성을 적용하십시오.

```js
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.4.7/manifests/install.yaml
```

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_55.png" />

모든 파드가 실행 중이어야 하며, 아래 명령을 실행하여 확인하십시오.

<div class="content-ad"></div>

```js
kubectl get pods -n argocd
```

![Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_56.png)

이제 아래 명령어를 사용하여 argoCD 서버를 로드밸런서로 노출합니다.

```js
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}'
```

<div class="content-ad"></div>


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_57.png)

Load Balancer가 생성되었는지 확인하려면 AWS 콘솔에 가서 확인할 수 있습니다.

![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_58.png)

ArgoCD에 액세스하려면 로드 밸런서 DNS를 복사하고 좋아하는 브라우저에서 입력하세요.


<div class="content-ad"></div>

아래 코드에서 table태그를 Markdown 형식으로 바꿔 보세요.

**Markdown:**

You will get a warning like the below snippet.

Click on Advanced.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_59.png" />

Click on the below link which is appearing under Hide advanced


<div class="content-ad"></div>

아래는 마크다운 형식으로 표를 변환한 내용입니다.


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_60.png)

이제 배포를 수행하기 위해 argoCD 서버의 비밀번호를 얻어야 합니다.

그 전에 필요한 것은 jq입니다. 아래 명령어로 설치해주세요.

```shell
sudo apt install jq -y
```

<div class="content-ad"></div>


![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_61.png)

```js
export ARGOCD_SERVER='kubectl get svc argocd-server -n argocd -o json | jq - raw-output '.status.loadBalancer.ingress[0].hostname''
export ARGO_PWD='kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d'
echo $ARGO_PWD
```

![이미지2](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_62.png)

argoCD에 사용자 이름과 암호를 입력하고 SIGN IN을 클릭하세요.


<div class="content-ad"></div>

아래는 ArgoCD 대시보드입니다.

이제, DevSecOps 파이프라인에 Sonarqube를 구성해야 합니다.

<div class="content-ad"></div>

해결하려면 Jenkins 서버의 공개 IP를 복사하고 9000 포트로 즐겨찾기 브라우저에 붙여넣으세요.

사용자 이름과 암호는 admin입니다.

로그인을 클릭하세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_65.png)

<div class="content-ad"></div>

비밀번호를 업데이트해주세요

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_66.png)

관리를 클릭하고, 보안을 선택한 후에 사용자를 선택해주세요

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_67.png)

<div class="content-ad"></div>

아래와 같이 Markdown 형식의 테이블로 변경해 주세요.


| 클릭: Update tokens | 클릭: Generate |
| --- | --- |
| ![Update tokens](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_68.png) | ![Generate](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_69.png) |


<div class="content-ad"></div>

안녕하세요! 위의 글을 친절한 톤으로 한국어로 번역해 드리겠습니다.

안전한 곳에 토큰을 복사하고 "완료"를 클릭해주세요.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_70.png" />

이제 품질 확인을 위한 웹훅을 구성해야 합니다.

관리를 클릭한 후, 구성을 선택하고 웹훅을 선택해주세요.

<div class="content-ad"></div>


![image description](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_71.png)

Click on Create

![image description](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_72.png)

Provide the name of your project and in the URL, provide the Jenkins server public IP with port 8080 add sonarqube-webhook in the suffix, and click on Create.


<div class="content-ad"></div>


http://`jenkins-server-public-ip`:8080/sonarqube-webhook/

![Webhook](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_73.png)

Here, you can see the webhook.

![Webhook](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_74.png)


<div class="content-ad"></div>

여기서는 프런트엔드 코드를 위한 프로젝트를 생성해야 해요.

수동으로 클릭하세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_75.png)

프로젝트에 표시할 이름을 제공하고 Setup을 클릭하세요.

<div class="content-ad"></div>

Markdown 형식으로 테이블 태그를 변경해주세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_76.png)

'로컬로'를 클릭하세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_77.png)

기존 토큰 사용 옵션을 선택하고 '계속'을 클릭하세요.

<div class="content-ad"></div>

"표 태그를 Markdown 형식으로 변경해주세요."

<div class="content-ad"></div>


![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_79.png)

이제 백엔드 코드용 프로젝트를 생성해야 합니다.

프로젝트 생성을 클릭하세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_80.png)


<div class="content-ad"></div>

프로젝트 이름을 제공하고 설정을 클릭하세요.

![Set up](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_81.png)

로컬에서 클릭하세요.

![Locally](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_82.png)

<div class="content-ad"></div>

기존 토큰 사용을 선택하고 계속을 클릭하세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_83.png)

다른 및 Linux 운영 체제를 선택하세요.

위 단계를 수행한 후 아래 코드 조각에서 확인할 수 있는 명령을 얻을 수 있습니다.

<div class="content-ad"></div>

이제 Jenkins Backend Pipeline에서 코드 품질 분석을 수행하는 명령을 사용해보세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_84.png)

이제 소나 인증 정보를 저장해야 합니다.

대시보드로 이동 - `Jenkins 관리 -` 자격 증명

<div class="content-ad"></div>

"종류"를 "비밀 텍스트로 선택하여" 접속 토큰을 비밀로 넣고 다른 것은 그대로 유지하세요.

"만들기"를 클릭하세요.

이제, ECR 이미지를 위해 파이프라인에서 수정될 배포 파일을 푸시하기 위해 GitHub 개인 액세스 토큰을 저장해야 합니다.

<div class="content-ad"></div>

GitHub 자격 증명 추가하기

종류를 "비밀 텍스트"로 선택하고 GitHub 개인 엑세스 토큰(비밀번호가 아님)을 "비밀"에 붙여넣은 후 다른 것은 그대로 두세요.

"생성"을 클릭하세요.

참고: 토큰을 생성하지 않은 경우, 먼저 생성한 다음 젠킨스에 붙여넣으세요.

<div class="content-ad"></div>

`<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_86.png" />`

우리의 파이프라인에 따라, ECR 레포지토리 URI 때문에 Jenkins 자격 증명에 계정 ID를 추가해야 합니다.

종류를 "Secret text"로 선택하고 시크릿에 AWS 계정 ID를 붙여넣고 다른 정보는 그대로 두세요.

"Create"를 클릭하세요.

<div class="content-ad"></div>

아래 Markdown 형식으로 table tag를 변경해주세요.


| Header One | Header Two |      
|------------|------------|        
| Row 1 Col 1| Row 1 Col 2|       
| Row 2 Col 1| Row 2 Col 2|      


<div class="content-ad"></div>

`<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_88.png" />`

이제 백엔드를 위한 ECR 이미지 이름을 제공해야 합니다. 백엔드 전용으로 선택하십시오.

종류를 시크릿 텍스트로 선택하고 시크릿에 백엔드 저장소 이름을 붙여 넣고 다른 것은 그대로 두십시오.

만들기를 클릭하세요.

<div class="content-ad"></div>


<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_89.png" />

프로젝트를 구현하기 위해 필요한 모든 자격 증명의 최종 단편.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_90.png" />

# 단계 10: 필요한 플러그인 설치 및 플러그인 구성하여 서비스 세계 장애 복구 응용 프로그램 배포


<div class="content-ad"></div>

아래의 플러그인을 설치하려면 대시보드 - "Manage Jenkins" - 플러그인 - "Available Plugins"로 이동하세요.

```js
Docker
Docker Commons
Docker Pipeline
Docker API
docker-build-step
Eclipse Temurin installer
NodeJS
OWASP Dependency-Check
SonarQube Scanner
```

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_91.png" />

이제 설치된 플러그인을 구성해야 합니다.

<div class="content-ad"></div>

대시보드로 이동하여 Jenkins 관리 - 도구로 이동하세요.

저희는 JDK를 구성 중입니다.

JDK를 검색하고 아래 스니펫처럼 구성 정보를 제공하세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_92.png)

<div class="content-ad"></div>

이제 소나큐브 스캐너를 구성할 것입니다.

소나큐브 스캐너를 찾아 아래 코드 조각과 같이 구성하세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_93.png)

이제 노드제이에스를 구성할 것입니다.

<div class="content-ad"></div>

**Node를 검색하고 아래 스니펫처럼 구성을 제공하십시오.**

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_94.png)

**이제 OWASP 종속성 검사를 구성하겠습니다.**

**Dependency-Check를 검색하고 아래 스니펫처럼 구성을 제공하십시오.**

<div class="content-ad"></div>


![Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_95.png)

이제 도커를 구성할 것입니다.

도커를 검색하고 아래 조각처럼 구성을 제공하세요.

![Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_96.png)


<div class="content-ad"></div>

이제 젠킨스에서 소나큐브 경로를 설정해야 합니다.

대시보드로 이동 -` Jenkins 관리 -` 시스템

소나큐브 설치 항목을 검색합니다.

이름을 제공하고, 서버 URL에는 최근에 추가한 소나큐브의 퍼블릭 IP(젠킨스와 동일) 및 포트 9000을 복사하고, 최근에 추가한 소나 토큰을 선택한 후, 적용 및 저장을 클릭합니다.

<div class="content-ad"></div>


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_97.png)

Now, we are ready to create our Jenkins Pipeline to deploy our Backend Code.

Go to Jenkins Dashboard.

Click on New Item.


<div class="content-ad"></div>


![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_98.png)

파이프라인 이름을 제공하고 OK를 클릭하십시오.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_99.png)

이것은 EKS에서 백엔드 코드를 배포하기 위한 Jenkins 파일입니다.


<div class="content-ad"></div>

젠킨스에 붙여 넣으세요.

https://github.com/AmanPathak-DevOps/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project/blob/master/Jenkins-Pipeline-Code/Jenkinsfile-Backend

적용 및 저장을 클릭하세요.


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_100.png)


<div class="content-ad"></div>

이제, 빌드를 클릭해 주세요.

우리의 파이프라인은 몇 가지 일반적인 실수 뒤에 성공했어요.

참고: 프로젝트에 맞게 파이프라인을 변경해 주세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_101.png)

<div class="content-ad"></div>

자, 이제 우리는 프런트엔드 코드를 배포하는 젠킨스 파이프라인을 만들 준비가 되었다.

- 젠킨스 대시보드로 이동하세요.
- New Item을 클릭하세요.
- 파이프라인의 이름을 제공하고 OK를 클릭하세요.

<div class="content-ad"></div>

아래는 EKS에 프론트엔드 코드를 배포하기 위한 Jenkins 파일입니다. 이를 Jenkins에 복사하여 붙여넣기 해주세요.

[Jenkinsfile-Frontend 링크](https://github.com/AmanPathak-DevOps/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project/blob/master/Jenkins-Pipeline-Code/Jenkinsfile-Frontend)

<div class="content-ad"></div>

"Apply & Save"를 클릭해주세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_103.png)

이제 빌드를 클릭하세요.

우리의 파이프라인은 몇 가지 일반적인 실수 후 성공적으로 완료되었습니다.

<div class="content-ad"></div>

참고: 프로젝트에 따라 파이프라인에서 변경 사항을 적용하세요.

Markdown 형식으로 표 태그를 변경해주세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_104.png)

설정 10: EKS 클러스터 모니터링을 설정할 거예요. 클러스터 사양 및 필요한 다른 정보를 모니터링할 수 있습니다.

Helm을 사용하여 모니터링을 구현할 거예요.
아래 명령을 사용하여 프로메테우스 저장소를 추가하세요.

<div class="content-ad"></div>

```js
helm repo add stable https://charts.helm.sh/stable
```

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_105.png" />

Prometheus를 설치해보세요.

```js
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install grafana grafana/grafana
```

<div class="content-ad"></div>


![Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_106.png)

이제 아래 명령어로 서비스를 확인하세요

```js
kubectl get svc
```

![Image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_107.png)


<div class="content-ad"></div>

이제 클러스터 외부에서 프로메테우스와 그라파나 콘솔에 액세스해야 합니다.

그를 위해 서비스 유형을 ClusterType에서 LoadBalancer로 변경해야 합니다.

stable-kube-prometheus-sta-prometheus 서비스를 편집해주세요.

```js
kubectl edit svc stable-kube-prometheus-sta-prometheus
```

<div class="content-ad"></div>

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_108.png)

클러스터 유형에서 로드 밸런서로 48번째 라인 수정

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_109.png)

stable-grafana 서비스 수정하기

<div class="content-ad"></div>

```js
kubectl edit svc stable-grafana
```

![Image 1](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_110.png)

39번째 라인의 ClusterType을 LoadBalancer로 수정

![Image 2](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_111.png)


<div class="content-ad"></div>

이제 서비스를 다시 나열하면 로드밸런서 DNS 이름들을 볼 수 있습니다

```js
kubectl get svc
```

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_112.png" />

콘솔에서도 확인할 수 있습니다.

<div class="content-ad"></div>


<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_113.png" />

이제 Prometheus 대시보드에 액세스하십시오.

즐겨 찾는 브라우저에 `Prometheus-LB-DNS`:9090를 붙여 넣으시면 아래와 같은 화면을 보실 수 있습니다.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_114.png" />


<div class="content-ad"></div>

상태를 클릭하고 대상을 선택하세요.

여러 개의 대상을 볼 수 있습니다.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_115.png" />

그래프 나 대시보드에 접근하세요.

<div class="content-ad"></div>

Grafana의 ALB DNS를 복사하여 즐겨찾는 브라우저에 붙여넣어주세요.

Grafana에 로그인할 때 사용자 이름은 admin이고 비밀번호는 prom-operator입니다.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_116.png" />

이제 "데이터 소스"를 클릭하세요.

<div class="content-ad"></div>


![Image 1](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_117.png)

Select Prometheus

![Image 2](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_118.png)

In the Connection, paste your `Prometheus-LB-DNS`:9090.


<div class="content-ad"></div>


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_119.png)

If the URL is correct, then you will see a green notification.

Click on Save & test.

![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_120.png)


<div class="content-ad"></div>

이제 쿠버네티스 클러스터 로그를 시각화하는 대시보드를 만들겠습니다.

대시보드를 클릭하세요.

![대시보드](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_121.png)

대시보드를 클릭하면 쿠버네티스 구성 요소들의 모니터링을 많이 볼 수 있을 겁니다.

<div class="content-ad"></div>


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_122.png)

Kubernetes 대시보드 유형을 가져와 보세요.

새로 만들기를 클릭하고 가져오기를 선택하세요

![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_123.png)


<div class="content-ad"></div>

6417 ID를 제공하고 Load를 클릭하세요.

참고: 6417은 Grafana에서 Kubernetes 데이터를 모니터링하고 시각화하는 데 사용되는 고유한 ID입니다.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_124.png)

이전에 만든 데이터 소스를 선택하고 Import를 클릭하세요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_125.png)

여기, 당신을 위해 있습니다.

당신은 Kubernetes 클러스터 데이터를 볼 수 있어요.

다른 Kubernetes 클러스터의 세부 정보를 자유롭게 살펴보세요.


<div class="content-ad"></div>

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_126.png" />

# Step 11: ArgoCD를 사용하여 Three-Tier 애플리케이션을 배포합니다.

저희 저장소가 비공개로 설정되어 있기 때문에 ArgoCD에서 개인 저장소를 구성해야 합니다.

설정을 클릭한 후 Repositories를 선택하십시오.

<div class="content-ad"></div>


![Step 1](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_127.png)

Click on CONNECT REPO USING HTTPS

![Step 2](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_128.png)

Now, provide the repository name where your Manifests files are present.


<div class="content-ad"></div>

사용자 이름과 GitHub 개인 액세스 토큰을 제공하고 CONNECT를 클릭해주세요.


| 이름 | 내용 |
|-----|------|
| 사용자 이름 | 입력 |
| 토큰 | 입력 |


연결 상태가 성공적이면 저장소가 성공적으로 연결된 것입니다.


![연결성공](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_130.png)


<div class="content-ad"></div>

이제 첫 번째 애플리케이션으로 데이터베이스를 생성할 것입니다.

CREATE APPLICATION을 클릭해주세요.

![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_131.png)

아래 코드 조각에 제공된 대로 세부 정보를 제공하고 아래로 스크롤하십시오.

<div class="content-ad"></div>

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_132.png" />

이전 단계에서 구성한 동일한 저장소를 선택하세요.

경로에는 Manifest 파일이 위치한 위치를 제공하고 다른 것들을 아래 스크린샷에 표시된 대로 제공하세요.

만들기를 클릭하세요.

<div class="content-ad"></div>

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_133.png" />

데이터베이스 어플리케이션을 배포하는 동안, 백엔드 어플리케이션을 생성할 것입니다.

아래 코드 조각에 제공된 것처럼 세부 정보를 제공하고 아래로 스크롤하세요.

<img src="/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_134.png" />

<div class="content-ad"></div>

이전 단계에서 구성한 동일한 저장소를 선택하세요.

Path에는 Manifest 파일이 제시된 위치를 제공하고 다른 것들을 아래 스크린샷에 표시된 대로 제공하세요.

CREATE를 클릭하세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_135.png)

<div class="content-ad"></div>

백엔드 애플리케이션이 배포되기 시작하는 동안, 우리는 프론트엔드 애플리케이션을 생성할 것입니다.

아래 스니펫에서 제공된 대로 세부 정보를 제공하고 내려가주세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_136.png)

이전 단계에서 구성한 동일한 저장소를 선택하세요.

<div class="content-ad"></div>

경로(Path)에는 Manifest 파일이 표시되는 위치를 제공하고 아래 스크린샷에 표시된 것과 같은 다른 정보를 제공하세요.

CREATE를 클릭하세요.

![screenshot](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_137.png)

프론트엔드 애플리케이션이 배포되기 시작할 때, 인그레스를 위한 애플리케이션을 생성하겠습니다.

<div class="content-ad"></div>

아래 스니펫에 제공된 내용대로 세부 정보를 제공하고 아래로 스크롤하세요.

![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_138.png)  

이전 단계에서 구성한 동일한 저장소를 선택하세요.  

경로에는 Manifest 파일이 위치한 위치를 제공하고 아래 스크린샷에 표시된 다른 사항을 제공하세요.

<div class="content-ad"></div>

CREATE를 클릭해주세요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_139.png)

Ingress 어플리케이션이 배포되면, 응용 프로그램 로드 밸런서가 생성됩니다.

k8s-three로 명명된 로드 밸런서를 확인할 수 있습니다.

<div class="content-ad"></div>


![image](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_140.png)

이제, ALB-DNS를 복사하여 도메인 제공업체로 이동하십시오. 제 경우 porkbun이 도메인 제공업체입니다.

DNS로 이동하여 CNAME 유형을 추가하고 hostname을 backend로, 답변에 ALB를 추가한 후 저장을 클릭하십시오.

참고: 저는 서브도메인 backend.amanpathakdevops.study를 생성했습니다.


<div class="content-ad"></div>

아래 마크다운 형식을 사용하여 4개의 애플리케이션 배포를 확인할 수 있습니다.

![Snippet 141](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_141.png)

지금부터 2~3분 후에 브라우저에서 서브도메인을 입력하여 마법을 볼 수 있습니다. 

![Snippet 142](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_142.png)

<div class="content-ad"></div>

앱을 사용하여 레코드를 추가할 수 있습니다.

앱을 사용하여 레코드를 삭제할 수 있습니다.

<div class="content-ad"></div>


![Advanced End-to-End DevSecOps Project using AWS EKS, ArgoCD, Prometheus, Grafana, and Jenkins](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_145.png)

Now, you can view your Grafana Dashboard to monitor EKS data including pods, namespace, and deployments.

![Grafana Dashboard](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_146.png)

If you want to monitor the three-tier namespace.


<div class="content-ad"></div>

네임 스페이스에서 쓰리 티어를 다른 네임 스페이스로 교체해주세요.

ArgoCD에서 수행된 배포들을 확인할 수 있습니다.

![ArgoCD에서 수행된 배포](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_147.png)

이것은 ArgoCD에서의 인그레스 응용 프로그램 배포입니다.

<div class="content-ad"></div>


![Frontend Application Deployment](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_148.png)

This is the Frontend Application Deployment in ArgoCD

![Backend Application Deployment](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_149.png)

This is the Backend Application Deployment in ArgoCD


<div class="content-ad"></div>


![Database Application Deployment in ArgoCD](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_150.png)

This is the Database Application Deployment in ArgoCD

![Persistent Volume & Persistent Volume Claim Configuration](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_151.png)

If you observe, we have configured the Persistent Volume & Persistent Volume Claim. So, if the pods get deleted, then the data won't be lost. The Data will be stored on the host machine.


<div class="content-ad"></div>

아래와 같이 변경하는 것이 좋을 것 같아요.


To validate it, delete both Database pods.

![Image 1](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_152.png)

Now, the new pods will be started.

![Image 2](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_153.png)


<div class="content-ad"></div>

그리고 당신의 애플리케이션은 하나의 데이터조각도 잃지 않을 거예요.

![이미지](/assets/img/2024-08-19-AdvancedEnd-to-EndDevSecOpsKubernetesThree-TierProjectusingAWSEKSArgoCDPrometheusGrafanaandJenkins_154.png)

# 결론:

이 종합적인 DevSecOps Kubernetes 프로젝트에서 우리는 성공적으로:

<div class="content-ad"></div>

- AWS에서 IAM 사용자 및 Terraform 설정을 구축했습니다.
- AWS에 Jenkins를 배포하고 도구를 구성하고 Sonarqube와 통합했습니다.
- EKS 클러스터를 설정하고 로드 밸런서를 구성하고 개인 ECR 저장소를 설립했습니다.
- Helm, Prometheus 및 Grafana를 사용하여 모니터링을 구현했습니다.
- GitOps 관행을 위해 ArgoCD를 설치하고 구성했습니다.
- Three-Tier 애플리케이션을 배포하는 CI/CD를 위한 Jenkins 파이프라인을 작성했습니다.
- 지속적인 볼륨 및 클레임으로 데이터 지속성을 보장했습니다.

제 작업을 지원해 주세요-
https://www.buymeacoffee.com/aman.pathak

LinkedIn에서 연락을 유지하세요: LinkedIn 프로필

GitHub를 통해 최신 소식을 받아보세요: GitHub 프로필

<div class="content-ad"></div>

현재 트렌디한 DevOps 및 클라우드 기술에 대해 이야기해볼까요?
Discord 서버에 참여해보세요 - https://discord.gg/jdzF8kTtw2

다른 질문이 있으면 언제든지 연락해주세요.

즐거운 학습되세요!

# Stackademic

<div class="content-ad"></div>

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가를 클로밍하고 팔로우해주시면 감사하겠습니다! 👏
- 저희 X를 팔로우해주세요 | LinkedIn | YouTube | Discord
- 다른 플랫폼도 방문해보세요: In Plain English | CoFeed | Venture