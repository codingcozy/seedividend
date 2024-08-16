---
title: "올라마와 오픈 웹 UI를 쿠버네티스에 배포하기"
description: ""
coverImage: "/assets/img/2024-05-16-DeployingOllamaandOpenWebUIonKubernetes_0.png"
date: 2024-05-16 16:56
ogImage: 
  url: /assets/img/2024-05-16-DeployingOllamaandOpenWebUIonKubernetes_0.png
tag: Tech
originalTitle: "Deploying Ollama and Open Web UI on Kubernetes"
link: "https://medium.com/@0xthresh/deploying-ollama-and-open-web-ui-on-kubernetes-7a05c986153e"
isUpdated: true
---




여러 이유들로 인해 별도의 긴 텍스트 블로그 게시물에서 설명할 것을 계획한 대로, 저는 팀이 AI 모델을 자체 호스팅하고 개발 팀을 더 효율적으로 만들 수 있는지 조사하는 실험을 진행하기로 결정했습니다. 본문에서는 우리 팀을 위해 쿠버네티스에서 Ollama와 Open Web UI를 호스팅하기 위해 구축한 아키텍처에 대해 설명하고, 왜 그것을 선택했는지 설명하겠습니다.

# IDE 플러그인 선택

무언가를 구축하기 전에, Ollama와 양방향 대화 및 코드 자동 완성(FIM)을 모두 지원하는 IDE 플러그인을 찾기를 원했습니다. Cody AI와 Llama Coder를 포함한 여러 옵션을 평가한 후, VS Code에서 저희 개발자들을 위해 Twinny를 선택했습니다. (우리 둘의 IntelliJ 개발자들은 자신들의 선택을 했습니다.)

Cody AI는 멋지며, 제 개인 장비에서 사용 중입니다. 팀을 위해, 우리는 라이선스 문제나 구매 부분과의 충돌을 피하기 위해 모든 부분에서 오픈 소스 소프트웨어를 준수하고자 했습니다. Llama Coder는 오픈 소스이며 좋으나, 우리가 시도했을 때는 채팅 기능만 있었습니다. Twinny는 저희가 로컬 테스트 중에도 채팅 및 자동 완성 기능을 둘 다 잘 수행하는 유일한 오픈 소스 IDE 플러그인이었습니다. 플러그인 유지자는 항상 열정적으로 작업하고 문제에 신속히 대응하는 것으로 보여서 우리가 좋아하는 점입니다.

<div class="content-ad"></div>

# 아키텍처

첫 번째 POC에서는 Open Web UI 도커 컴포즈 파일을 EC2 인스턴스에서 실행하여 테스트했습니다. 초기 POC에서는 작업을 훌륭하게 수행했습니다. UI를 올리고 Twinny를 연결했으며, GPU 드라이버를 올바르게 설치한 후에는 성능이 양호했습니다. 이것이 잘 확장되지 않을 것을 알고 빠르게 모든 것을 쿠버네티스에 구축하는 다음 단계로 넘어갔습니다.

저희는 AWS 회사이므로 이러한 워크로드를 EKS에서 호스팅하기로 결정했습니다. GPU 지원을 위해 EKS 가속화 AMI를 사용하여 Ollama 인스턴스에서 드라이버를 추가하는 작업을 저희를 도와주었습니다. NVIDIA K8s Device Plugin을 실행하는 Daemon Set으로 작동되도록 배포하는 방법은 AWS 문서에 연결된 지침을 따르세요. 클러스터를 설정한 후 아래 명령어를 사용할 수 있습니다.

```js
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.14.5/nvidia-device-plugin.yml
```

<div class="content-ad"></div>

우리는 ALB 인그레스 컨트롤러를 사용하여 Open Web UI Ingress 주석에서 ALB를 생성했고, Persistent Volumes를 처리하기 위해 EBS CSI 플러그인을 사용했습니다.

노드 그룹에 대해 초기 빌드를 위해 세 개의 노드 그룹을 사용했습니다: Open WebUI 서비스는 GPU가 필요하지 않기 때문에 m5a.large 인스턴스를 사용하는 노드 그룹에서 실행되며, FIM 모델 및 채팅 모델 각각에 대해 g5.2xlarge 인스턴스에서 실행되는 두 개의 별도의 Ollama 노드 그룹을 구축했습니다. GPU 메트릭스를 수집하기 위해 사용자 데이터를 통해 CloudWatch 에이전트를 설치하고 사용 패턴 및 동작을 볼 수 있도록 했습니다.

처음에 이것을 구축할 때 Ollama는 메모리에 로드되지 않은 모델에 대해 사용자가 요청을 보낼 때마다 모델을 언로드 및 재로드하여 사용자가 응답을 받기까지 5-15초의 지연이 발생했습니다. 그러나 Ollama는 그 이후에 한 번에 여러 모델을로드 유지하는 기능을 출시했으나, 우리는 현재는 별도의 모델에 대해 별도의 백엔드를 계속 사용하고 있습니다.

마지막으로, Ollama와 Open WebUI 서비스를 구축하기 위해 각각의 Helm 차트를 사용했습니다:

<div class="content-ad"></div>

- https://artifacthub.io/packages/helm/ollama-helm/ollama
- https://artifacthub.io/packages/helm/open-webui/open-webui

튜닝 섹션에는 서비스가 시작되자마자 최대 성능을 얻기 위해 Helm 값에 포함해야 하는 팁이 포함되어 있습니다.

현재 설정에 대한 아키텍처 다이어그램은 아래에서 확인할 수 있습니다.

![아키텍처 다이어그램](/assets/img/2024-05-16-DeployingOllamaandOpenWebUIonKubernetes_0.png)

<div class="content-ad"></div>

# 섬세한 조정

제품이 좀 더 생산 준비 상태로 설정되어 있으므로 작은 시범 그룹에게 오픈하여 매일 테스트 중입니다. 사용자들이 들어오자, 사용자들에게 응답이나 코드 자동 완성을 받기 전에 지연이 발생한다는 보고를 받기 시작했습니다.

Ollama가 한 번에 한 요청에만 응답할 수 있다는 것을 발견했는데, 이는 여러 사람들에게 노출하는 목적을 상쇄시켰습니다. 다행스럽게도 Ollama의 1.34 릴리스에서 OLLAMA_NUM_PARALLEL 옵션이 추가되어 Ollama가 한 번에 여러 요청에 응답할 수 있도록 설정할 수 있게 되었습니다. 이 값을 10으로 설정하고, g5.2xlarge 인스턴스에서 10개의 응답을 동시에 받는 것이 꽤 잘 작동하는 것을 알았습니다. 약간의 속도 저하만 있어요. Ollama 배포가 고사용량 상태에 있을 때 확장하도록 메트릭을 수집하는 작업을 시작했지만, 아직 그 정도로는 못 갔습니다.

Ollama Helm 차트에 추가할 수 있는 다른 값은 ollama.models 값입니다. 이를 통해 Ollama 서비스가 호스팅할 모든 모델을 미리 로드할 수 있어서 첫 사용자들에게 시간을 절약할 수 있습니다.

<div class="content-ad"></div>

# 마무리

이 블로그 글에 대해 더 많은 정보를 추가하고 업데이트할 가능성이 매우 큽니다. 미래에는 시작점으로 사용할 수 있는 몇 가지 샘플 코드를 제공할 예정이지만 거기서 약속을 드릴 수는 없습니다.

의견이나 질문이 있으면 언제든지 0xthresh@proton.me로 연락해주세요. 최대한 빨리 회신 드리겠습니다.

읽어 주셔서 감사합니다!