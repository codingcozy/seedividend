---
title: "Mirantis Kubernetes 엔진 기업을 위한 통합 컨테이너 오케스트레이션 방법"
description: ""
coverImage: "/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_0.png"
date: 2024-07-09 10:58
ogImage:
  url: /assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_0.png
tag: Tech
originalTitle: "Mirantis Kubernetes Engine: Unified Container Orchestration for Enterprises"
link: "https://medium.com/@harsh05/mirantis-kubernetes-engine-unified-container-orchestration-for-enterprises-ac3c7a5ab152"
isUpdated: true
---

# 컨테이너화 소개

요즘 급변하는 기술 환경에서 컨테이너화는 중요한 혁신으로 부상하여 애플리케이션 개발, 배포 및 관리 방식을 변화시키고 있습니다. 컨테이너화는 애플리케이션과 의존성을 하나의 가벼운 컨테이너 안에 묶어 효율적으로 관리하며, 개발부터 운영까지 다양한 환경에서 일관성을 보장합니다.

## 컨테이너화의 필요성

- 일관성과 이식성: 컨테이너는 애플리케이션이 어디에 배포되더라도 일관된 방식으로 실행되도록 보장하여 "내 컴퓨터에서는 동작했는데" 증후군을 해소합니다.
- 격리성: 각 컨테이너는 독립된 환경에서 작동하여 충돌을 방지함으로써 보안과 안정성을 향상시킵니다.
- 자원 효율성: 가상머신과 비교해 가벼운 컨테이너는 더 나은 자원 활용과 빠른 시작 시간을 가능하게 합니다.
- 확장성: Kubernetes 및 Docker Swarm과 같은 컨테이너 오케스트레이션 플랫폼은 수요에 따라 애플리케이션의 자동 확장을 용이하게 합니다.

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

# 쿠버네티스와 도커 스웜

## 쿠버네티스:

쿠버네티스(Kubernetes 또는 K8s)는 응용 프로그램 컨테이너의 배포, 확장 및 운영을 자동화하기 위해 설계된 오픈소스 플랫폼입니다. 분산 시스템을 견고하게 운영할 수 있는 프레임워크를 제공하여 필요에 따라 확장하고 축소하며 장애 조치를 관리합니다.

## 도커 스웜:

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

도커 스웜은 도커의 기본 클러스터링 및 오케스트레이션 도구입니다. 이 도구를 사용하면 도커 엔진 클러스터를 관리하는 과정이 간편해지며, 이를 하나의 가상 도커 엔진으로 변환할 수 있습니다. 스웜은 사용 편의성과 도커 도구와의 통합에 중점을 둡니다.

Mirantis Kubernetes Engine (MKE) 는 기업급 컨테이너 오케스트레이션 플랫폼으로 이전에는 Universal Control Plane (UCP)로 알려졌습니다. MKE는 쿠버네티스와 도커 스웜을 모두 통합하여 여러 환경, 특히 멀티 클라우드 환경에서 컨테이너를 효과적으로 관리하고 오케스트레이션할 수 있는 통합 인터페이스를 제공합니다.

MKE를 사용하는 이유는 무엇일까요?

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

- 통합 오케스트레이션: MKE는 쿠버네티스와 스웜 오케스트레이터 모두를 지원하여 사용자가 단일 플랫폼 내에서 양쪽의 강점을 활용할 수 있습니다.
- 기업급 보안: MKE는 롤 기반 액세스 제어(RBAC), 안전한 통신 및 이미지 보안과 같은 고급 보안 기능을 제공합니다.
- 다중 클라우드 유연성: MKE는 다른 클라우드 공급업체 간에 원할하게 운영되도록 설계되어 하이브리드 및 다중 클라우드 전략에 이상적입니다.
- 사용자 친화적 인터페이스: MKE의 웹 기반 인터페이스는 클러스터 관리 및 모니터링을 간단하게 만들어 컨테이너 오케스트레이션과 관련된 일반적으로 발생하는 복잡성을 줄입니다.

# Docker Swarm을 사용하여 MKE 클러스터 설치 설정

이 섹션에서는 AWS에 MKE 클러스터를 설정하는 과정을 안내하겠습니다. 이때 우리는 오케스트레이터로 Docker Swarm을 사용할 것입니다. 이는 인스턴스를 시작하고 MKE를 설치하고 노드를 연결하는 과정을 포함합니다.

## 단계 1: AWS 인스턴스 시작하기

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

- AWS 인스턴스 생성:

- AWS에서 EC2 인스턴스 네 개 시작하기 (2 개의 매니저 노드 및 2 개의 워커 노드).
- 모든 인스턴스가 동일한 VPC에 있고 필요한 트래픽을 허용하는 보안 그룹을 갖도록합니다 (예: SSH, HTTP 및 HTTPS).

![이미지1](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_0.png)

![이미지2](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_1.png)

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

![2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_2.png](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_2.png)

![2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_3.png](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_3.png)

![2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_4.png](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_4.png)

![2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_5.png](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_5.png)

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

![Mirantis Kubernetes Engine](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_6.png)

![Mirantis Kubernetes Engine](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_7.png)

## Step 2: Manager 노드에 MKE 설치하기

- Manager 노드에 연결
- Docker 설치하기

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

- 모든 인스턴스(매니저 또는 워커)에는 Docker가 설치되어 있어야 합니다.
- 패키지 데이터베이스를 업데이트하고 Docker를 설치하세요.

```js
yum update -y
yum install docker -y
systemctl enable docker --now
```

![이미지](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_8.png)

3. MKE 설치하기:

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

- MKE는 도커 허브에서 이미지로 제공되는 소프트웨어입니다.

```js
docker pull mirantis/ucp:3.6.1
```

![Mirantis Kubernetes Engine](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_9.png)

- DIND 환경에서 Mirantis K8S를 실행하세요.

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
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock  mirantis/ucp:3.6.1 install --host-address </매니저-노드-의-사설-IP/> --swarm-only --force-minimums --interactive
```

![링크 텍스트](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_10.png)

- 사용자 이름과 암호를 입력하라는 프롬프트가 나타납니다.

![링크 텍스트](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_11.png)

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

- 클라이언트로서 추가 에일리어스를 제공하여, 공용 IP를 HTTP 프로토콜로 연결할 수 있습니다: [https://public-IP](https://public-IP)

![image](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_12.png)

- 이 이미지들은 매니저가 다른 노드와 연결 및 제어하기 위해 필요합니다.
- 만약 도커 info 명령어를 실행하면 스왐이 활성화된 것을 볼 수 있습니다.

## 3단계: MKE 웹 UI 탐색

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

- MKE 웹 UI에 접속해보세요:

- 웹 브라우저를 열고 https://`manager-node-ip` 로 이동하세요.
- MKE 설치 중 생성한 자격 증명을 사용하여 로그인하세요.

![이미지](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_13.png)

2. 대시보드를 탐험해보세요:

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

- MKE 대시보드를 확인해 보세요. 클러스터 개요, 노드 상태, 실행 중인 서비스, 그리고 사용 가능한 리소스를 제공합니다.

![MKE 대시보드](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_14.png)

## 단계 4: 웹 UI를 통해 스웜에 워커 노드 추가하기

![워커 노드 추가](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_15.png)

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

- 옵션을 선택하고 해당 노드에 가입 명령을 붙여넣으세요.

![Node 1](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_16.png)

![Node 2](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_17.png)

- 이제 포털에서 확인하면 노드 수가 두 개로 증가한 것을 볼 수 있습니다.

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

![이미지](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_18.png)

- 비슷하게 매니저 노드를 추가할 수도 있습니다.
- 워커 노드에 합류하자마자 일부 컨테이너가 자동으로 시작되었습니다. 이러한 컨테이너는 매니저 노드에 의해 실행되어 효과적으로 통신하고 노드에 대한 모든 업데이트를 수행할 수 있습니다.

![이미지](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_19.png)

- 서비스 배포: MKE 인터페이스를 사용하여 새 서비스를 배포하고 기존 서비스를 확장하며 애플리케이션의 건강 상태와 성능을 모니터링하세요.

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

![Image 1](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_20.png)

![Image 2](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_21.png)

![Image 3](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_22.png)

![Image 4](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_23.png)

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

![이미지 1](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_24.png)

- 이곳에서도 작업을 확장할 수 있습니다.

![이미지 2](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_25.png)

![이미지 3](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_26.png)

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

- 대시보드에서는 노드의 실시간 모니터링이 가능합니다.

![이미지](/assets/img/2024-07-09-MirantisKubernetesEngineUnifiedContainerOrchestrationforEnterprises_27.png)

# 멀티 클라우드 환경에서의 MKE 장점

상호 운용성: MKE는 다양한 클라우드 플랫폼에 배포를 지원하여 통합된 관리 경험을 제공합니다. 이는 공급업체 락인을 줄이고 비용, 성능 및 지역적 위치를 기준으로 클라우드 제공업체를 선택할 때 유연성을 높여줍니다.

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

높은 가용성: MKE는 여러 클라우드를 걸쳐 클러스터를 관리할 수 있는 능력을 가지고 있어, 작업 부하를 분산시키고 장애 극복 메커니즘을 원활하게 구현하여 높은 가용성과 재해 복구를 보장합니다.

최적화된 자원 활용: 다양한 클라우드 제공업체를 활용함으로써 기관은 자원 활용을 최적화할 수 있습니다. 비용 효율성과 자원 이용 가능성에 따라 작업 부하를 균형 있게 분배할 수 있습니다.

향상된 보안: MKE는 모든 지원 환경에서 견고한 보안 기능을 제공하여 기본 클라우드 인프라에 관계없이 일관된 보안 정책과 관행을 보장합니다.

# 결론

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

Mirantis Kubernetes Engine (MKE)은 오늘날 다양하고 동적인 IT 환경에서 컨테이너화된 애플리케이션을 효과적으로 관리하는 강력하고 유연한 솔루션을 제공합니다. Kubernetes와 Docker Swarm의 강점을 결합하여, MKE는 멀티 클라우드 환경에서 운영되는 기업의 요구 사항을 충족시키는 포괄적인 플랫폼을 제공합니다. 컨테이너화 여정을 시작하려는 중이거나 기존 인프라를 최적화하고자 하는 경우, MKE는 여러분의 목표를 손쉽고 효율적으로 달성할 수 있는 도구와 기능을 제공합니다.
