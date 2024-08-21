---
title: "Karpenter  오픈소스 고성능 Kubernetes 클러스터 자동 스케일러 소개"
description: ""
coverImage: "/trivasor.github.io/assets/no-image.jpg"
date: 2024-07-13 01:54
ogImage:
  url: /trivasor.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Karpenter — An Open-Source High-Performance Kubernetes Cluster Autoscaler"
link: "https://medium.com/dev-genius/karpenter-an-open-source-high-performance-kubernetes-cluster-autoscaler-05bee7ca1b61"
isUpdated: true
---

# 소개

Karpenter는 AWS에서 구축된 오픈 소스, 유연하고 고성능의 Kubernetes 클러스터 오토스케일러입니다. 이는 응용 프로그램 부하의 변화에 신속하게 대응하여 적절한 규모의 컴퓨팅 리소스를 런칭하여 응용 프로그램 가용성 및 클러스터 효율성을 향상시키는 데 도움을 줍니다. Karpenter는 응용 프로그램의 요구를 충족하는 즉시적인 컴퓨팅 리소스를 제공하고 클러스터의 컴퓨팅 리소스 풋프린트를 최적화하여 비용을 줄이고 성능을 향상시킵니다.

Karpenter가 없었던 이전에는 Kubernetes 사용자가 Amazon EC2 Auto Scaling 그룹과 Kubernetes 클러스터 오토스케일러를 사용하여 클러스터의 컴퓨팅 용량을 동적으로 조정해야 했습니다. AWS에서 Kubernetes 고객들은 Kubernetes 클러스터 오토스케일러를 사용하여 클러스터 오토스케일링을 구성하는 것이 어렵고 제한적이라는 어려움을 겪었습니다.

Karpenter가 클러스터에 설치되어 있으면 Karpenter는 스케줄되지 않은 파드의 집계 리소스 요청을 관찰하고, 스케줄링 지연과 인프라 비용을 줄이기 위해 새로운 노드를 실행하거나 종료 결정을 내립니다. Karpenter는 Kubernetes 클러스터 내의 이벤트를 관찰한 다음, Amazon EC2와 같은 기본 클라우드 공급업체의 컴퓨팅 서비스로 명령을 보내는 방식으로 작동합니다.

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

카펜터는 Apache 라이선스 2.0으로 라이선스가 부여된 오픈 소스 프로젝트입니다. 이는 모든 중요한 클라우드 제공업체 및 온프레미스 환경에서 실행되는 어떤 쿠버네티스 클러스터와도 작동하도록 설계되었습니다.

# AWS에서 카펜터 시작하기

카펜터를 시작하려면 Kubernetes 클러스터 내에서 일부 컴퓨팅 용량이 있는지 확인한 후 Helm 차트를 사용하여 공개 저장소에서 제공하는 차트를 설치하십시오. 또한 카펜터는 선택한 공급자에서 컴퓨팅 자원을 할당하기 위한 권한이 필요합니다.

클러스터에 설치되면 기본 카펜터 프로비저너는 클러스터 내의 계산 자원이 부족하여 예약할 수 없는 쿠버네티스 파드를 관찰하고, 이를 예약하고 자원 요구 사항을 충족시키기 위해 새로운 자원을 자동으로 실행합니다.

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

먼저 eksctl을 사용하여 EKS 클러스터를 만들어 봅시다.

```js
cat <<EOF > cluster.yaml
---
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: eks-karpenter-demo
  region: us-east-1
  version: "1.20"
managedNodeGroups:
  - instanceType: m5.large
    amiFamily: AmazonLinux2
    name: eks-kapenter-demo-ng
    desiredCapacity: 1
    minSize: 1
    maxSize: 5
EOF
$ eksctl create cluster -f cluster.yaml
```

Karpenter는 자체 관리 노드 그룹뿐만 아니라 관리 노드 그룹 등 어디에서든 실행될 수 있습니다. Karpenter는 당신의 계정에서 EC2 인스턴스를 프로비저닝할 것입니다.

이어서 AWS CloudFormation 템플릿을 사용하여 필요한 AWS Identity and Access Management (IAM) 리소스를 생성하고, Karpenter 컨트롤러에 대한 IAM Roles for Service Accounts (IRSA) 권한을 얻기 위해 설명서를 따라 직접 인스턴스를 시작할 수 있는 허용하는 권한을 얻을 수 있습니다. 또한 Helm 차트를 설치하여 클러스터에 Karpenter를 배포해야 합니다.

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

$ helm repo add karpenter https://charts.karpenter.sh
$ helm repo update
$ helm upgrade --install --skip-crds karpenter karpenter/karpenter --namespace karpenter \
 --create-namespace --set serviceAccount.create=false --version 0.5.0 \
 --set controller.clusterName=eks-karpenter-demo \
 --set controller.clusterEndpoint=$(aws eks describe-cluster --name eks-karpenter-demo --query "cluster.endpoint" --output json) \
 --wait # for the defaulting webhook to install before creating a Provisioner

Karpenter 프로비저너는 클러스터에서 Karpenter의 동작을 구성할 수 있는 쿠버네티스 리소스입니다. 기본 프로비저너를 생성하면, Karpenter가 클러스터에서 컴퓨팅 리소스를 제공하기 위해 필요한 것 이외에 추가적인 사용자 정의를 하지 않고 노드 속성을 자동으로 검색합니다. 이 때 인스턴스 유형, 존, 아키텍처, 운영 체제 및 인스턴스의 구매 유형과 같은 노드 특성을 Karpenter가 자동으로 발견합니다. 명시적인 비즈니스 요구사항이 없다면 이러한 spec:requirements을 정의할 필요가 없습니다.

cat <<EOF | kubectl apply -f -
apiVersion: karpenter.sh/v1alpha5
kind: Provisioner
metadata:
name: default
spec:

# 프로비저닝된 노드의 매개변수를 제한하는 요구 사항들

requirements: - key: "node.kubernetes.io/instance-type" # 포함되지 않으면 모든 인스턴스 유형이 고려됨
operator: In
values: ["m5.large", "m5.2xlarge"] - key: "topology.kubernetes.io/zone" # 포함되지 않으면 모든 존이 고려됨
operator: In
values: ["us-east-1a", "us-east-1b"] - key: "kubernetes.io/arch" # 포함되지 않으면 모든 아키텍처가 고려됨
operator: In
values: ["arm64", "amd64"] - key: "karpenter.sh/capacity-type" # 포함되지 않으면 AWS 클라우드 공급업체에 대한 웹훅이 기본으로 온디맨드로 설정됨
operator: In
values: ["spot", "on-demand"]
provider:
instanceProfile: KarpenterNodeInstanceProfile-eks-karpenter-demo
ttlSecondsAfterEmpty: 30
EOF

ttlSecondsAfterEmpty 값은 Karpenter가 빈 노드를 종료하도록 구성합니다. 이 값을 비활성화하면 노드가 활용도가 낮아 스케일 다운되지 않습니다. Karpenter가 현재 활성화되어 클러스터에 노드를 생성하기 위해 준비되어 있습니다. 배포를 사용하여 일부 팟을 생성하고, Karpenter가 응답으로 노드를 프로비저닝하는 것을 확인해보세요.

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
$ kubectl create deployment inflate \
--image=public.ecr.aws/eks-distro/kubernetes/pause:3.2 \
--requests.cpu=1
```

배포를 확장하고 Karpenter 컨트롤러의 로그를 확인해볼까요?

```yaml
$ kubectl scale deployment inflate --replicas 10
$ kubectl logs -f -n karpenter $(kubectl get pods -n karpenter -l karpenter=controller -o name)
2021-11-23T04:46:11.280Z        INFO    controller.allocation.provisioner/default       Starting provisioning loop      {"commit": "abc12345"}
2021-11-23T04:46:11.280Z        INFO    controller.allocation.provisioner/default       Waiting to batch additional pods        {"commit": "abc123456"}
2021-11-23T04:46:12.452Z        INFO    controller.allocation.provisioner/default       Found 9 provisionable pods      {"commit": "abc12345"}
2021-11-23T04:46:13.689Z        INFO    controller.allocation.provisioner/default       Computed packing for 10 pod(s) with instance type option(s) [m5.large]  {"commit": " abc123456"}
2021-11-23T04:46:16.228Z        INFO    controller.allocation.provisioner/default       Launched instance: i-01234abcdef, type: m5.large, zone: us-east-1a, hostname: ip-192-168-0-0.ec2.internal    {"commit": "abc12345"}
2021-11-23T04:46:16.265Z        INFO    controller.allocation.provisioner/default       Bound 9 pod(s) to node ip-192-168-0-0.ec2.internal  {"commit": "abc12345"}
2021-11-23T04:46:16.265Z        INFO    controller.allocation.provisioner/default       Watching for pod events {"commit": "abc12345"}
```

프로비저너의 컨트롤러는 Pod 변경을 감지하여 새로운 인스턴스를 시작하고 프로비저너블 Pod를 새로운 노드에 할당합니다.

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

이제 배포를 삭제하세요. 30초 후 (ttlSecondsAfterEmpty = 30), Karpenter가 빈 노드를 종료해야합니다.

```js
$ kubectl delete deployment inflate
$ kubectl logs -f -n karpenter $(kubectl get pods -n karpenter -l karpenter=controller -o name)
2021-11-23T04:46:18.953Z        INFO    controller.allocation.provisioner/default       Watching for pod events {"commit": "abc12345"}
2021-11-23T04:49:05.805Z        INFO    controller.Node Added TTL to empty node ip-192-168-0-0.ec2.internal {"commit": "abc12345"}
2021-11-23T04:49:35.823Z        INFO    controller.Node Triggering termination after 30s for empty node ip-192-168-0-0.ec2.internal {"commit": "abc12345"}
2021-11-23T04:49:35.849Z        INFO    controller.Termination  Cordoned node ip-192-168-116-109.ec2.internal   {"commit": "abc12345"}
2021-11-23T04:49:36.521Z        INFO    controller.Termination  Deleted node ip-192-168-0-0.ec2.internal    {"commit": "abc12345"}
```

kubectl로 노드를 삭제하면, Karpenter가 해당 인스턴스를 우아하게 코든팅하고 드레인하며 종료합니다. Karpenter는 노드 객체에 finalizer를 추가하여 모든 팟이 드레인되고 인스턴스가 종료될 때까지 삭제를 차단합니다.

가속 컴퓨팅: Karpenter는 모든 종류의 Kubernetes 애플리케이션과 함께 작동하지만, 대량의 다양한 컴퓨팅 리소스를 빠르게 프로비저닝하고 해제하는 사용 사례에서 특히 잘 작동합니다. 예를 들어, 이는 머신 러닝 모델을 훈련하거나 시뮬레이션을 실행하거나 복잡한 금융 계산을 수행하는 배치 작업을 포함합니다. 가속 EC2 인스턴스가 필요한 사용 사례에 대해 nvidia.com/gpu, amd.com/gpu 및 aws.amazon.com/neuron의 사용자 지정 리소스를 활용할 수 있습니다.
