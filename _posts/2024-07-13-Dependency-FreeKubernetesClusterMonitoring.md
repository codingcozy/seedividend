---
title: "의존성 없는 Kubernetes 클러스터 모니터링 방법"
description: ""
coverImage: "/assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_0.png"
date: 2024-07-13 01:56
ogImage: 
  url: /assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_0.png
tag: Tech
originalTitle: "Dependency-Free Kubernetes Cluster Monitoring"
link: "https://medium.com/better-programming/dependency-free-kubernetes-cluster-monitoring-5f7aa2f038d9"
---


![image](/assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_0.png)

애플리케이션을 배포하는 데 가장 많이 사용되는 플랫폼은 이제 쿠버네티스입니다. 하나로 말씀드리면, 쿠버네티스 클러스터는 팟과 디플로이먼트와 같은 수백 개의 리소스로 이루어져 있으며, 여러 구성 요소와 사용자 정의 오퍼레이터로 이루어져 있습니다.

서비스, 애플리케이션, 그리고 네트워크가 리소스로 캡슐화되어 있기 때문에 사용자들이 쿠버네티스가 어떻게 작동하는지 이해하는 것은 어렵습니다. 컨테이너 내에서 무슨 일이 일어나는지, 어떤 팟이 특정 요청을 실행하는지, 그리고 요청이 성공적으로 실행되지 않는 이유 등 여러가지 부분이 있습니다. 그래서 클라우드 관리팀은 리소스의 건강 상태를 관찰하고 모니터링할 필요가 있습니다.

관찰 가능성은 로깅(logging), 추적(tracing), 그리고 메트릭(metrics)이라는 세 가지 측면으로 나눌 수 있습니다. 로깅을 통해 애플리케이션의 작업을 이해할 수 있습니다. 추적을 통해 문제가 발생하는 위치를 파악할 수 있습니다. 마지막으로, 메트릭은 클러스터의 리소스 사용량과 전반적인 건강 상태를 보여줍니다.

<div class="content-ad"></div>


![Dependency-Free Kubernetes Cluster Monitoring 1](/assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_1.png)

CNCF 커뮤니티에서 가장 투자를 많이 받은 분야 중 하나이기도 합니다. 아래 이미지는 CNCF에서 관찰 가능성과 관련된 모든 프로젝트를 나열한 것으로, 그 중 많은 것들을 전에는 사용해보거나 알지 못했던 것들이 많았습니다.

![Dependency-Free Kubernetes Cluster Monitoring 2](/assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_2.png)

일반적으로 모니터링 도구는 메트릭을 수집하고 집계하는 데 중점을 둡니다. 그러나 Murre, 오픈 소스이면서 의존성이 없는 Go 도구는 클러스터 내 노드, 파드 및 컨테이너의 CPU 및 MEM 사용량을 얻을 때,이 목록에 있는 도구들보다 더 우수한 성과를 보여줍니다.


<div class="content-ad"></div>

머러를 탐험하기 전에 Prometheus + Grafana와 kubectl Top 명령어를 살펴보겠습니다. 이것들은 의존성이 없는 모니터링 도구들이 어떻게 작동하는지와 머러의 장점은 무엇인지 알아봅니다.

# 의존성이 없는 모니터링 도구들

## Prometheus + Grafana

가장 인기 있는 Kubernetes 모니터링 솔루션으로, 해당 노드의 CPU 및 메모리 사용량을 얻는 데 도움을 줍니다. 예를 들어, node_memory_Buffers_bytes와 같은 정보가 아래에 표시됩니다:

<div class="content-ad"></div>

![Monitoring Kubernetes Clusters Without Dependencies](/assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_3.png)

하지만 Prometheus의 메트릭은 각 pod/컨테이너/노드를 일일이 매핑해야 하며 CPU와 MEM에 대한 각기 다른 메트릭 키는 pod와 컨테이너 간의 관계를 직관적으로 파악하기 어렵게 만듭니다.

예를 들어, 컨테이너의 MEM과 CPU를 관찰하려면 각각 container_memory_working_set_bytes 및 container_cpu_usage_seconds_total을 구성해야 합니다. 또한, Prometheus의 학습 곡선은 높은 편이며 사용자들은 그것의 메트릭 키 및 집계 함수(sum, rate 등)에 익숙해져야 합니다.

설치와 구성이 필요한 것만 아니라, Prometheus와 Grafana는 리소스 사용량을 모니터링하기에 너무 방대하고 복잡합니다.

<div class="content-ad"></div>

## Kubectl Top

**kubectl top** 명령어를 사용하면 노드/파드의 리소스 사용량을 확인할 수 있습니다.

![이미지](/assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_4.png)

먼저, Kubernetes에 기본으로 포함되어 있지 않기 때문에 metrics-server를 설치해야 합니다. 그러나 대부분의 클라우드 제공업체는 Horizontal Pod Autoscaler 및 Vertical Pod Autoscaler가 작동하기 위해 이미 기본적으로 제공하고 있습니다. 그러나 수동으로 Kubernetes 클러스터를 설정한 경우에는 여전히 metrics-server를 설치해야 합니다.

<div class="content-ad"></div>

이제 kubectl top node과 kubectl top pod 명령어를 통해 각각 노드와 파드의 리소스 사용량을 별도로 확인할 수 있게 되었습니다.

![이미지](/assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_5.png)

결함에 대해서는 metrics-server에 의존하기 때문에 Metrics API 사용 불가 오류가 발생할 수 있습니다. 그리고 기본 100m CPU 및 200MiB 메모리 설정은 클러스터에 노드당 70개의 파드가 있고 노드가 100개 미만일 때만 원할하게 작동합니다. 또 다른 점은 컨테이너 리소스 사용량을 표시하지 않는다는 것입니다. 매번 최신 파드 및 노드 리소스 사용량만 표시되며 지속적으로 업데이트되지 않습니다.

# 메트릭 수집 방법

<div class="content-ad"></div>

프로메테우스와 Kubectl top은 일정 부분 우리 요구사항을 충족시킬 수 있어요. 그러나 조금 더 깊게 파고들면 프로메테우스는 kube-state-metrics에 의존하고, top은 metrics-server에 의존한다는 것을 알게 됩니다. 이 두 가지는 모두 metrics API를 사용해요. 두 도구의 차이점은 metrics-server가 클러스터 수준의 데이터를 읽는 데 초점을 맞추는 반면 kube-state-metrics는 배치 및 복제본과 같은 서로 다른 자원 유형에 대한 데이터를 읽는 데 초젘을 맞춰요.

![이미지](/assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_6.png)

# 오픈 소스 Murre로 의존 없는 모니터링

Murre를 발견하기 전에 노드 및 팟 자원 사용량을 디버깅하기 위해 top 명령어를 사용했어요. Murre는 의존성이 없는 오픈 소스 도구로, 분명히 더 효과적이에요.

<div class="content-ad"></div>

![Murre](https://miro.medium.com/v2/resize:fit:1400/1*yDakl15pscAOqac-M8RFOg.gif)

Murre은 각 네임스페이스의 팟과 컨테이너의 리소스 사용량을 보여주며 실시간으로 업데이트합니다. 또한 CPU/MEM별로 정렬도 지원합니다.

Murre을 설치하는 것만으로도 충분합니다. 클러스터에 의존하는 것이 전혀 없으며 APIServer에 의존하지 않습니다. 대신 client-go를 통해 실시간으로 팟/컨테이너 정보를 얻고 터미널에 내용을 포맷하여 표시합니다 (마치 kubectl 플러그인이 구현된 방식처럼). 설치는 매우 간단합니다:

```js
go install github.com/groundcover-com/murre@latest
```

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-13-Dependency-FreeKubernetesClusterMonitoring_7.png)

코드는 쉽게 이해하고 소화할 수 있어요: 메트릭을 얻는 로직은 fetcher.go의 GetContainers 함수에 있습니다. PodList를 가져오고 컨테이너들을 순회합니다.

정기적인 업데이트는 Go timer.Ticker + select를 사용하여 수행되며 --interval 매개변수로 구성할 수 있습니다.

# 결론


<div class="content-ad"></div>

이번 글에서는 비의존성 무료 K8s 모니터링을 살펴보고, 의존성 없는 모니터링과 어떻게 비교되는지 살펴보았습니다. Murre는 클러스터에 어떠한 의존성도 설치하지 않고 Pod와 컨테이너의 리소스 사용량을 관찰하는 데 효과적인 도구입니다. 아직 초기 단계이며 완벽해지기를 기대하는 중이지만 더 많은 기능이 추가되면 배포, 레플리카, APIServer의 메트릭을 표시하는 등 더욱 강력해질 것으로 상상됩니다.

읽어 주셔서 감사합니다! 더 많은 소식을 기대해주세요.