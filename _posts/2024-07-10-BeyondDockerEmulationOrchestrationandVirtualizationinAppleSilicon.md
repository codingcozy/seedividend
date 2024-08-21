---
title: "Docker를 넘어서 Apple Silicon에서의 에뮬레이션, 오케스트레이션 및 가상화 방법"
description: ""
coverImage: "/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_0.png"
date: 2024-07-10 02:12
ogImage:
  url: /assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_0.png
tag: Tech
originalTitle: "Beyond Docker: Emulation, Orchestration, and Virtualization in Apple Silicon"
link: "https://medium.com/itnext/beyond-docker-emulation-orchestration-and-virtualization-in-apple-silicon-34011259cd91"
isUpdated: true
---

## Apple Silicon 및 기타 용도를 위한 컨테이너화 메커니즘 및 솔루션 깊이 파헤쳐보기

![이미지](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_0.png)

지난 다섯 년간 저는 대규모 Kubernetes 클러스터 내에서 마이크로서비스 세계로 심취해왔습니다. 제 일반적인 작업 흐름은 로컬에서 솔루션을 만들어 열심히 테스트하고, 그러고는 내 변경 사항을 마스터 브랜치에 커밋하는 것입니다.

Docker는 오랫동안 제 개발 환경이었지만, 최근 도커의 라이선스 변경으로 대체 환경을 찾게 되었습니다. 더군다나, ARM 및 x64 이미지 모두와 호환되는 Kubernetes 환경을 찾는 사냥을 벌였습니다.

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

저의 요구사항은 굉장히 간단했어요:

- 도커(또는 비슷한 도구) 환경에서 단일 컨테이너를 실행하고 조정하기 위한 도컴포즈 기능이 포함된 환경.
- 복잡한 배포를 위해 맞춤형 쿠버네티스 프레임워크.
- 이 환경은 Quarkus의 개발 서비스와 함께 사용할 수 있어야 해요. Quarkus에는 도커나 Podman 설정을 마이크로서비스의 필요에 따라 자동으로 구성해주는 편리한 기능이 있어요. 예를 들어, Quarkus에서 Kafka 종속성을 통합하면 개발 단계에서 Kafka 이미지를 도커나 Podman을 통해 받아올 뿐 아니라 응용 프로그램의 구성을 원활하게 조정할 거예요.
- 간단하게 설정할 수 있어야 해요.
- Docker Desktop이 아니어야 해요.

이 기사에서는 마이크로서비스 개발을 위한 잠재적인 Docker 대체제로 고려되는 다양한 컨테이너 및 쿠버네티스 솔루션을 자세히 살펴보겠어요. 이 기사는 모든 것을 다루지는 않지만 상당한 개요를 제공합니다. 주요 목표는 다음과 같아요:

- 이 도구들이 사용하는 기본 소프트웨어 구성 요소를 명확하게 하기.
- macOS에서 개발 환경을 구축하는 노하우를 제공하면서 이 정보의 대부분이 윈도우에도 적용될 수 있도록 하기.
- 독자들이 특정 요구를 충족하기 위해 다양한 기술을 효과적으로 활용하고 결합할 수 있도록 근본적인 지식을 제공하는 거예요.

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

여기서 논의된 많은 해결책들이 특정 결과를 얻기 위해 결합될 수 있다는 점을 유념하는 것이 가치가 있습니다. 원하는 기능을 처음부터 모두 다루지는 않더라도 미니큐브와 포드맨 같은 조합이 유익할 수 있습니다. 이 포스트의 주요 내용은 아니지만 말이죠.

먼저, 컨테이너 지원 개발 환경을 설정할 때 사용하는 소프트웨어 스택을 명확히 해줄 컨테이너화 개념 몇 가지를 살펴보려고 합니다.

# 개념

먼저, 컨테이너화 개념을 간단히 살펴보고, 컨테이너 지원 개발 환경 구성 시 사용되는 소프트웨어 스택에 대해 알아보겠습니다.

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

## 가상화 및 컨테이너 런타임

가상화는 일반적으로 "가상화 소프트웨어" 또는 "하이퍼바이저"로 더 많이 알려진 소프트웨어 계층이나 플랫폼으로, 단일 물리 장치에서 여러 운영 체제가 동시에 실행되도록 하는 것입니다. 이는 가상 머신(VM)을 생성하여 각각이 독립적으로 자신의 운영 체제와 응용 프로그램을 실행할 수 있는 별도의 물리 장치처럼 작동합니다.

컨테이너 런타임은 컨테이너를 실행하고 관리하는 소프트웨어로, 가벼우면서 격리된 단위인 컨테이너를 만들어 각각의 응용 프로그램과 그 의존성을 일관되게 다양한 환경에 걸쳐 실행할 수 있도록 합니다. 이 런타임은 컨테이너 이미지를 불러오는 작업, 컨테이너를 생성, 시작하고 모니터링하는 작업, 다른 프로세스로부터 격리된 상태를 유지하고 필요한 리소스를 제공하는 작업을 처리합니다. 인기 있는 컨테이너 런타임으로는 Docker, containerd 및 runc가 있습니다.

이는 Docker(또는 Podman 또는 다른 것) 환경이 x64 및 ARM 아키텍쳐를 모두 지원하는지 여부가 하이퍼바이저가 해당 아키텍쳐를 지원하는지에 달려있다는 것을 의미합니다.

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

![Beyond Docker Emulation, Orchestration, and Virtualization in Apple Silicon](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_1.png)

리눅스에서 실행될 때 Docker는 namespace 및 cgroups와 같은 네이티브 OS 기능을 활용하여 컨테이너화를 용이하게 합니다. 그 결과로 리눅스에서는 VM이 필요하지 않습니다. 그러나 macOS와 Windows의 경우 상황이 달라지며 가상화가 필요해집니다. 일반적으로 다음 요소가 이러한 플랫폼에서 포함됩니다:

- VM을 초기화하는 가상화 메커니즘(hyperkit, QEmu 등)
- 컨테이너 런타임의 내부 VM 설치
- 호스트 및 게스트 폴더 마운팅을 보장하기 위한 파일 시스템 통합

선택한 도구에 따라 컨테이너 런타임 소켓을 직접 호스트에 마운트할 결정을 내릴 수 있습니다. 예를 들어 Docker는 docker.sock 소켓을 시스템에 직접 연결하여 호스트의 CLI가 가상 머신 내의 Docker와 상호 작용할 수 있도록 합니다.

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

## 도커 생태계

도커를 언급할 때는 일반적으로 다음 도구에 대해 이야기합니다:

- 도커 런타임. 저수준 컨테이너 관리에 containerd를 사용합니다.
- 도커 CLI. 도커 데몬과 상호 작용을 허용하는 명령줄 도구입니다. macOS에서는 docker, docker-compose를 설치하고 Homebrew를 사용하여 자동 완성을 설정할 수 있습니다: `brew install docker` . 이 명령을 통해 CLI 도구만 설치됩니다. 도커 엔진이나 Docker Desktop은 설치되지 않습니다.
- 도커 데스크톱. 도커 런타임, 도커 CLI, 기본 도커 런타임이 모두 포함된 패키지입니다. 선택 사항인 쿠버네티스 설치도 제공되며, Docker 런타임을 통해 설치됩니다. 또한 Docker 엔진 매개변수를 변경할 GUI를 가진 데스크톱 애플리케이션도 제공합니다. 웹 사이트에서 전체 Docker Desktop dmg 파일을 다운로드하고 설치하면 도커 명령줄 도구, 도커 컨테이너 엔진 및 Docker 데스크톱 애플리케이션 전체가 설치됩니다.
- containerd - 호스트 시스템에서 컨테이너 전체 라이프사이클을 관리하는 중요한 컨테이너 런타임입니다. 이미지 가져오기, 푸시, 관리 등과 같은 기능을 지원합니다. 초기에 containerd는 Docker의 필수 구성 요소였으며 Docker, Inc.에서 개발되었습니다. 그러나 이후의 발전에서 Docker와 별도로 분리되어 독립 프로젝트로 존재합니다. 이 분리에도 불구하고 Docker는 여전히 기본 실행 레이어로 containerd를 의존합니다.

## Apple의 가상화 프레임워크 및 Rosetta

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

로제타는 인텔 기반 맥 컴퓨터용으로 만들어진 앱이 애플 실리콘 맥에서 실행되도록 하는 번역 레이어입니다. 애플 가상화 프레임워크는 애플 실리콘 및 인텔 기반 맥 컴퓨터에서 가상 머신(VM)을 만들고 관리할 수 있게 하는 API 세트입니다. 가상화 프레임워크와 로제타는 함께 작동하여 애플 실리콘 맥에서 인텔 기반 앱을 실행할 강력한 방법을 제공합니다. 컨테이너화 관점에서 로제타와 AVF는 함께 작동하여 x64 컨테이너 실행을 가능하게 합니다. 모든 컨테이너화 솔루션에서 애플의 솔루션 사용을 지원하는 것은 아닙니다. 사실, 대부분은 가상화에 QEmu를 지원하며, 애플의 프레임워크는 비교적 최근에 지원되었습니다.

## QEMU

QEMU는 일반적이고 오픈 소스의 기계 에뮬레이터 및 가상화 프로그램입니다. QEMU는 다양한 하드웨어 플랫폼에서 운영 체제 및 애플리케이션을 실행하는 데 사용될 수 있습니다. QEMU는 컨테이너화 도구에 의해 종종 사용되어 가볍게 사용할 수 있는 가상 머신을 생성하여 컨테이너를 실행하는 데 사용됩니다.

QEMU가 컨테이너화 도구에 의해 사용되는 또 다른 방법은 일회성 컨테이너를 생성하는 데 사용됩니다. 일회성 컨테이너는 빠르게 생성되고 제거되는 컨테이너를 의미합니다. QEMU를 사용하여 다양한 운영 체제 및 아키텍처를 기반으로 하는 일회성 컨테이너를 생성할 수 있습니다.

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

컨테이너화에 있어 QEMU는 Arm 및 x64 이미지를 상호 운용 가능하게 실행할 수 있는 가상 머신을 만들기 위해 많은 도구에서 사용됩니다.

## Docker 및 Apple Silicon에서의 x64 컨테이너

먼저 엄밀히 말하면 "다중 아키텍처 이미지"는 존재하지 않습니다. 그러나 Docker 생태계에서는 이미지가 종종 이 동작을 모방합니다. Docker로 이미지를 빌드하고 푸시할 때, 이미지는 기본적으로 사용 중인 아키텍처로 설정됩니다. 그래서 시스템이 이미지의 아키텍처와 다른 아키텍처를 지원하는 경우, 이미지를 실행하려고 하면 "exec format error"와 같은 오류가 발생할 수 있습니다.

Docker 다중 아키텍처 이미지는 특정 아키텍처에 맞게 조정된 각각의 독립적인 이미지로 구성됩니다. 이러한 이미지들은 해당 아키텍처에 대응되는 메타데이터를 매핑하는 단일 매니페스트 아래에서 통합됩니다. Docker는 다중 아키텍처 이미지의 개념에 대한 좋은 설명을 다음 링크에서 제공하고 있습니다: [다중 아키텍처 빌드와 이미지의 간단한 방법](https://www.docker.com/blog/multi-arch-build-and-images-the-simple-way/)

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

최근 Docker의 새로운 업데이트에서는 애플의 가상화 프레임워크와 Rosetta 에뮬레이션을 지원하게 되었습니다. 이 통합으로 Docker는 Arm 및 Intel 아키텍처 이미지를 모두 수용할 수 있게 되었는데, Intel 이미지는 QEmu 에뮬레이션을 통해 관리됩니다. Intel 이미지에 대한 에뮬레이션 사용으로 성능 손실이 발생할 수 있다는 것은 예견되는 일이죠.

터미널에서 docker pull을 실행할 때, Docker는 귀하의 기기 아키텍처와 호환되는 이미지를 검색하려고 노력합니다. 일치하는 이미지를 찾을 수 없는 경우, Docker는 AMD64 이미지를 선택하고 실행을 위해 Rosetta에 의존할 것입니다.

Docker Hub의 여러 프로젝트에서 "멀티 아키텍처 이미지"가 제공되고 있다는 사실에 유의해야 합니다. 예를 들어, NGINX Docker 페이지에서 지원되는 아키텍처가 설명되어 있습니다.

![이미지](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_2.png)

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

도커 데스크톱 for macOS에서는 쿠버네티스까지 확장 가능하다. 도커 데스크톱 내에서 쿠버네티스를 활성화시킴으로써, 쿠버네티스가 도커 런타임 환경 내에서 작동하도록 지시하는 셈이다. 이는 즉, 쿠버네티스가 도커와 동일한 컨테이너 런타임 및 가상 머신을 활용할 것을 의미한다. 컨테이너 런타임이 또한 애플의 Rosetta를 활용하고 있기 때문에, 쿠버네티스는 에뮬레이션을 통해 x64 컨테이너를 실행할 수 있고, 도커 럠타임의 기능을 활용할 수 있다.

기초 개념 몇 가지를 소개했으니, 이러한 기술을 활용하는 도구들을 알아보자. 이것은 전체 목록이 아니지만, 단일 컨테이너나 완전한 마이크로서비스 스택을 실행하기 위한 도커 대안에 대한 통찰을 제공할 것이다.

# 도구

## 평범한 Minikube

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

![이미지](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_3.png)

Minikube는 독립 구성 요소로 사용할 수도 있습니다. 그리고 다양한 종류의 드라이버를 지원하는 것으로 보입니다. Docker를 제외하면, 남은 옵션으로는 QEmu와 Hyperkit이 있습니다.

brew install minikube을 실행한 후,

제 컴퓨터에서는 Hyperkit이 지원되지 않는 것 같네요.

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
➜  ~ minikube start --driver=hyperkit
W0910 16:57:02.238664    4768 main.go:291] 현재 Docker CLI 컨텍스트 "default"를 해결할 수 없습니다: 컨텍스트 "default"를 찾을 수 없음: /Users/csotiriou/.docker/contexts/meta/37a8eec1ce19687d132fe29051dca629d164e2c4958ba141d5f4133a33f0688f/meta.json을 열 수 없음: 그런 파일이나 디렉터리가 없습니다
😄 minikube v1.31.2를 사용 중. Darwin 13.5.1 (arm64)에서 실행
✨ 사용자 구성에 따라 hyperkit 드라이버 사용 중

❌ DRV_UNSUPPORTED_OS로 인해 종료: 'hyperkit' 드라이버는 darwin/arm64에서 지원되지 않음
```

AMD64 컨테이너만 엄격히 지원하는 경우 QEmu를 사용할 때 다음 오류 메시지가 표시됩니다:

```js
exec /usr/sbin/nginx: exec format error
default/my-deployment-698dfbdfb7-wkcm2 (my-container)에 대한 EOF 스트림 닫힘
```

즉, 현재 Minikube 설치에서 QEmu를 사용하여 i386 컨테이너를 에뮬레이트할 수 없습니다. 게다가 이 방법은 단순히 docker와 docker-compose를 설치하지 않고 실행하는 문제를 해결하지 못합니다. 그래도 해보려고 했어요.

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

미니큐브에서 제공하는 팟맨 드라이버는 유망한 것 같아요. 왜냐하면 팟맨이 x64 이미지를 에뮬레이트하고 사용할 수 있기 때문이죠. 그런데 현재로서는 실험 단계에 있어서 아직 시도해보지 못한 점이 아쉽습니다.

## Microk8s

![Beyond Docker Emulation, Orchestration, and Virtualization in Apple Silicon](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_4.png)

멀티패스/마이크로케이츠 조합은 정말 매력적인 스택이라고 생각해요. 새로운 가상 머신을 추가하는 것은 정말 간단하고, 쿠버네티스 클러스터를 설정하는 것은 단 한 명령어로 해결할 수 있습니다.

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

Microk8s는 Multipass를 사용합니다. Multipass는 표준 Ubuntu 가상 머신을 설치하고 실행합니다. 그런 다음 게스트 머신에 microk8s를 설치하고 모든 것을 호스트 머신과 연결하는 필요한 구성을 수행합니다.

Multipass와 MicroK8s의 시너지는 컨테이너 오케스트레이션을 위한 매력적인 기술 스택을 제공합니다. 새로운 가상 머신을 시작하는 것은 놀랍도록 간단하며, 새로운 Kubernetes 클러스터를 시작하는 것은 한 명령어 실행만으로 간단합니다.

MicroK8s는 내부적으로 Multipass를 활용합니다. Multipass가 하는 일은 표준 Ubuntu 머신을 실행하고 운영하는 것입니다. 이 가상 머신 내에서 MicroK8s를 설치하고 게스트 머신을 호스트와 연결하기 위한 필수 구성을 수행합니다.

도구 세트가 튼튼하긴 하지만 주의할 점도 있습니다. Multipass가 macOS 호환성을 위해 QEmu에 크게 의존하고 있음에도 불구하고 MicroK8s에서 x64 이미지를 실행하기 어려웠습니다. 또한, 해결책으로 Minikube보다는 결합된 Docker 인스턴스를 호스트에 쉽게 통합하는 부분에서 모자랍니다. 이러한 도전에 직면하여 다른 대안적인 솔루션을 탐색하기로 결정했습니다.

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

# Podman + KIND

Podman은 컨테이너를 오케스트레이팅하고 관리하는 도커 호환 도구입니다. 도커가 얼마 전 라이선스를 변경하면서, Podman은 잠재적인 대안으로 제 첫 선택이었습니다. 그러나 초기 단계에서는 폴더 마운팅과 네트워킹과 관련된 여러 문제에 직면했습니다.

지금은 Podman이 크게 발전했습니다. 지난 몇 달 동안 그것을 집중적으로 사용한 결과, 그 기능성에 감탄받았습니다. 게다가 Podman 데스크톱 애플리케이션도 있어서, 팟과 개별 컨테이너의 오케스트레이션과 배포를 더욱 간단하게 할 수 있습니다.

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

아래에서 Podman은 QEmu를 활용합니다. Quarkus 팀이 애플 실리콘 기기에서 Podman을 작동하는 통찰력 있는 자습서를 제작했습니다. Podman의 아키텍처에서 QEmu에 대한 의존성이 명백합니다. 이는 QEmu가 다양한 아키텍처를 에뮬레이션하는 데 특화되어 있어서 Podman이 x64 이미지를 간편하게 지원할 수 있게 해줍니다. QEmu의 x64 에뮬레이션은 애플의 Rosetta 2 속도와는 경쟁하지 못할 수도 있지만 가상화 프레임워크를 통해 지원되는 Rosetta 2의 속도는 전형적인 사용 사례에 충분합니다.

QEmu의 x64 에뮬레이션은 가상화 프레임워크를 통해 제공되는 애플의 Rosetta 2만큼 빠르지는 않지만, 우리의 사용 사례에는 충분합니다. Podman은 ARM 및 x64 컨테이너를 모두 실행하는 것을 지원하기 때문에 KIND — Kubernetes In Docker를 내부에 설치하고 원하는 작업을 수행하기 위해 그 고급 에뮬레이션을 활용할 수 있습니다.

저에게는 Podman과 KIND의 조합이 모든 요구 사항을 충족시키는 데 성공했습니다.

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

- 저는 익숙한 Docker 명령어를 복제합니다.
- 추가적인 VM이 필요하지 않고 동일한 장치에서 Kubernetes를 운영할 수 있어 RAM 사용을 최적화합니다.
- Docker (또는 Podman) 명령어를 통해 또는 Kubernetes 내 KIND를 통해 ARM 및 x64 컨테이너를 지원합니다.
- Quarkus의 개발 환경 서비스는 Dev Services 라이브러리로 지원되며 Docker 및 Podman 환경을 자동으로 감지하고 활용할 수 있습니다.

참고: 저는 Docker Compose를 많이 의존합니다. Podman이 docker-compose와 완벽하게 통합되지 않을 수 있다는 소문이 있지만, 나는 Podman과 docker-compose v2.x의 경험이 이와 반대됩니다. 그러나 Podman이 Docker의 직접적인 대체품으로 자주 언급되지만 두 가지 사이에는 여러 세부 사항이 다릅니다.보다 자세한 비교를 위해서는 이 기사를 추천합니다.

# Limactl & Colima

![BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_7.png)

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

리마는 Linux 머신 생성기 입니다.

리마는 리눅스 머신을 macOS(및 Linux)에서 설정하는 데 탁월한 도구로 Linux Machines의 약어입니다. 이는 containerd 용 Docker 호환 CLI 인 nerdctl과 자주 결합됩니다. Docker 도 containerd 위에서 구축되었음을 기억하세요. 이러한 다양성의 이유는 지원하는 가상화 및 컨테이너 엔진의 많은 조합 때문입니다.

특히 "Fast Mode 2, Rosetta"가 매우 흥미롭었습니다. 여기서는 Rosetta 2 에뮬레이션을 사용하여 k3s와 containerd가 포함된 머신을 설정할 수 있도록 했습니다. 아래는 제 yaml 파일 설정입니다.

- 아치: "x86_64"
- 다이제스트: "sha256:d5b419272e01cd69bfc15cbbbc5700d2196242478a54b9f19746da3a1269b7c8"
- 아치: "aarch64"
- 다이제스트: "sha256:5ecab49ff44f8e44954752bc9ef4157584b7bdc9e24f06031e777f60860a9d17"
- 아치: "x86_64"
- 아치: "aarch64"

- 모드: 시스템
- 스크립트: |
  #!/bin/sh
  if [ ! -d /var/lib/rancher/k3s ]; then
  curl -sfL https://get.k3s.io | sh -s - --disable=traefik
  fi

- 스크립트: |
  #!/bin/bash
  set -eux -o pipefail
  if ! timeout 30s bash -c "until test -f /etc/rancher/k3s/k3s.yaml; do sleep 3; done"; then
  echo >&2 "k3s is not running yet"
  exit 1
  fi
  힌트: |
  k3s kubeconfig 파일이 아직 생성되지 않았습니다.
  로그를 확인하려면 "limactl shell k3s sudo journalctl -u k3s"을 실행하세요.
  그래도 비어 있다면 로그 하단을 "/var/log/cloud-init-output.log"에서 확인하세요.

- guest: "/etc/rancher/k3s/k3s.yaml"
  호스트: "{.Dir}/copied-from-guest/kubeconfig.yaml"

메시지: |
호스트에서 `kubectl`을 실행하려면(이미 kubectl이 설치되어 있다고 가정), 다음 명령을 실행하세요:

---

export KUBECONFIG="{.Dir}/copied-from-guest/kubeconfig.yaml"
kubectl ...

---

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

그런 식으로 하여 제가 단순하게 실행했는데도 Kubernetes가 ARM과 x64 컨테이너를 무리없이 실행할 수 있었습니다. 그러나 Lima와 nerdctl은 다소 낮은 수준의 프레임워크입니다. 뛰어난 성능을 발휘하지만 Quarkus(특히 Dev Services)와 같은 내가 사용하는 일부 도구는 자동으로 이를 활용하지 못합니다.

Lima를 사용하여 ARM과 x64 컨테이너를 무리없이 실행할 수 있었습니다. 그러나 Lima와 nerdctl은 다소 낮은 수준에서 작동합니다. 그들은 뛌러 올 수는 있지만 Quarkus(특히 Dev Services)와 같은 내가 사용하는 특정 도구들은 Docker 소켓을 어디에서 찾아야 하는지와 호스트에서 완전한 Docker 환경을 구축하는 데 필요한 다른 것들을 알지 못하기 때문에 기본 통합되지 않습니다. 결과적으로 Lima를 엄격히 사용하려면 모든 것을 수동으로 설정해야 합니다.

여기서 Colima가 필요한 이유입니다.

![이미지](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_8.png)

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

Colima은 본질적으로 리마 위에 세련된 계층으로 구축되어 더욱 개선된 래퍼 역할을 합니다. 리마의 다재다능성을 유지하면서도 Colima는 리눅스 컨테이너 머신을 설정하는 프로세스를 더욱 간단하게 만들고 macOS 시스템과의 깊은 통합을 강조합니다.

예를 들어, 저는 새로운 Colima 설치를 시작하는 데 사용하는 명령어는 다음과 같습니다:

```js
colima start --kubernetes --arch aarch64 --vm-type=vz --vz-rosetta
```

이 명령어를 실행하면 다음이 설치됩니다:

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

- 도커 및 컨테이너드가 내장된 가상 머신입니다. 이 가상 머신은 Lima를 사용하며 매우 가벼운 Alpine 이미지를 기반으로 합니다.
- 말했던 도커 런타임을 사용하는 Kubernetes (k3s)
- 이 인스턴스는 x64 이미지를 실행할 수 있습니다.
- x64 가상화를 위해 QEmu 대신 Rosetta를 사용하고 있으므로 에뮬레이션 시 매우 빠릅니다.
- 호스트의 ~/.colima/default/docker.sock 위치에 마운트된 소켓이 있어 다른 도커 런타임과 함께 사용할 수 있습니다.

이 특정 호스트를 도커 CLI와 함께 사용하려면 호스트 머신에서 `colima context name`을 사용하여 도커 호환 엔진 간에 전환할 수 있습니다.

저와 같이 Quarkus 개발 서비스를 사용하는 경우 Quarkus Dev Services를 실행할 때 DOCKER_HOST 환경 변수를 설정할 수 있습니다.

예시:

코드 예시를 넣으십시오.

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
# .bashrc 또는 .zshrc에 다음 줄을 추가하여 Colima 도커 소켓을 항상 사용할 수 있습니다

export DOCKER_HOST="unix://${HOME}/.colima/default/docker.sock"

# 랜처 데스크톱
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

![이미지](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_9.png)

Rancher Desktop은 Lima를 핵심으로 작동합니다. 초기 실행 시에는 ~/.rd/bin 디렉토리가 설정되며, 여기에는 docker 실행 파일에 대한 별칭이 저장되어 해당 앱의 바이너리로 연결됩니다:

```js
Rancher Desktop.app/Contents/Resources/resources/darwin/bin
```

제공되는 명령줄 도구 모음에는 Rancher와 통신하는 rdctl 및 docker, docker-compose, nerdctl, docker-buildx와 같은 익숙한 유틸리티가 포함되어 있습니다.

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

Rancher Desktop을 실행하면 다음과 같은 스택이 처리됩니다:

- Linux VM이 생성됩니다.
- Docker CLI가 Docker Machine 내부에 설치됩니다.
- Guest OS 내에 K3s의 버전이 설치됩니다.
- 내 ~/.kube/config 파일이 rancher-desktop 컨텍스트로 업데이트되어 내장된 k3d와 상호 작용할 수 있게 됩니다.
- 구성에 따라 다음이 발생합니다.
- Rancher 설정에서 컨테이너 엔진으로 Docker를 설정한 경우, 게스트 머신에 Docker 데몬이 실행되고 소켓이 호스트 OS에 마운트됩니다. K3s는 --docker 옵션을 사용하여 실행되어 데몬 호스트를 통해 Kubernetes를 실행합니다.
- Rancher 설정에서 컨테이너 엔진으로 containerd를 설정한 경우, Docker 데몬은 설치되지 않고 k3s는 containerd 런타임만을 사용하여 부팅됩니다.

![이미지](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_10.png)

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

Rancher는 Rosetta를 통한 Apple Virtualization Framework 지원도 제공하며, x64 에뮬레이션을 더욱 빠르게 할 수 있게 합니다. QEmu도 잘 작동합니다. 두 옵션을 모두 활성화하여 x64 이미지를 사용할 수 있습니다.

![이미지](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_11.png)

Lima를 기반으로 구축된 Rancher Desktop은 몇 가지 내재적 이점을 제공합니다:

- macOS ARM에서 Rosetta 에뮬레이션에 대한 실험적 지원. 내 경험상 신뢰할 만한 성능을 보여주었습니다.
- macOS 파일 시스템이 가상 머신 내에 원활하게 통합되어 VM의 파일 시스템에 대한 본연적 소속감을 줍니다.
- 호스트와 게스트 간에 공유되는 이미지가 하나의 레지스트리에서 유래한 것처럼 보입니다.
- 설치는 간편합니다. 드래그 앤 드롭만으로 충분합니다.
- 컨테이너 엔진, 에뮬레이션 옵션 등에 대한 매우 좋은 사용자 정의 옵션이 제공됩니다.

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

![Travel to Korea](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_12.png)

라인처 데스크톱은 모비, 컨테이너디, 그리고 K3s와 같은 오픈 소스 구성 요소로 완전히 구축되어 있는데, 이는 개발 목적으로 로컬 쿠버네티스 환경을 구축하고 싶은 사람들에게 탁월한 솔루션을 제공합니다. 저는 신뢰성 때문에 프로덕션 환경에서 K3s를 사용해 왔습니다. 라인처 데스크톱을 높이는 것은 K3s를 부드럽게 통합한다는 점입니다. 이 솔루션은 리소스 소비를 낮추면서도 최적의 성능을 보장하는 포괄적인 쿠버네티스 시스템의 강력함을 결합하고 있습니다. 그리고 K3s의 상당한 인기로 인해 보다 간단한 커뮤니티 지원을 보장하여 다른 대안과 구분되고 있습니다.

다양한 제품과 함께 K3s를 설치할 수 있지만, 라인처 데스크톱은 모든 것을 한 곳에서 제공하여 시작부터 필요한 모든 것을 갖추도록 보장합니다.

라인처 데스크톱을 Quarkus의 개발 서비스와 함께 사용하는 경우 DOCKER_HOST 변수에 마운트되는 소켓을 노출하는 것이 필요합니다. 이는 이곳에서 논의된 다른 옵션들과 마찬가지로 수행됩니다.

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
export DOCKER_HOST=unix:///Users/<<username>>/.rd/docker.sock
```

실제 소켓이 마운트된 위치를 알아내기 위해 docker context list를 사용하여 호출을 적절히 조정하세요.

저는 Rancher Desktop을 사용하여 모든 문제를 간단하게 해결할 수 있는 솔루션이라고 생각합니다. 동시에 매우 쉽게 운영할 수 있습니다. 현재 제가 선호하는 솔루션입니다.

# 보너스, 맥 전용 솔루션: OrbStack

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

![OrbStack](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_13.png)

오브스택(OrbStack)은 컨테이너 관리 분야에서 비교적 새로운 플레이어로서, 다른 툴과 구분되는 독특한 위치에 있습니다. 현재 그 기능이 확장되고 있으며, 현재는 랜처 데스크톱(Rancher Desktop)과 유사한 수준에 있습니다(낮은 수준 기능과 림액트릴(limactl)이 제공하는 다양성 면에서는 아직까지 기능이 풍부하지는 않습니다). 오브스택의 능력을 이해하기 위해 랜처 데스크톱과 비교를 해보겠습니다 - 강력한 툴을 활용하는 점 뿐만 아니라, 두 플랫폼이 마이크로서비스 개발자들(Docker & Kubernetes)을 위한 기능셋에서 유사점이 있기 때문입니다. 특히, 오브스택은 가상 머신 내에서 Kubernetes를 실행하기 위한 지원을 최근에 통합했습니다.

오브스택의 놀라운 특징 중 하나는 자원 소비가 매우 적다는 점입니다. Kubernetes 배포를 생성하는 테스트를 해본 결과, 효율적이고 신뢰할 수 있다는 것을 확인했습니다. 이 플랫폼은 도커와 쿠버네티스 컨테이너를 동일한 가상 머신 스택 내에서 관리합니다.

![OrbStack](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_14.png)

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

Orbstack을 경쟁 업체와 구분짓는 한 가지 측면은 macOS와의 밀접한 통합으로, 놀랄 만큼 가벼운 특징을 갖추고 있습니다. 제 요구에 맞게 Rancher Desktop만큼 기능이 풍부하지만 성능과 효율성 면에서도 뛰어납니다.

제 컴퓨터에서 Orbstack을 Kubernetes와 함께 부팅하는 데 단 2초만 소요됩니다. CPU 및 RAM 사용량 모두 최소화되어 있습니다. Orbstack은 자원을 보수적으로 할당한 후 작업량에 따라 동적으로 더 많은 RAM을 할당합니다. 재미있게도, Lima와의 경험이 이와 비슷하지만 주목할 만한 세부 차이가 있습니다.

어플리케이션을 실행하지 않은 기본 Kubernetes 설정에서 Orbstack은 일관되게 다른 동료들보다 적은 자원을 소비한다는 것이 나타났습니다.

또 다른 관찰은 Rancher Desktop과의 UI 성능을 비교한 것입니다. Rancher Desktop은 Electron 또는 유사한 프레임워크를 사용하여 개발된 것으로 보입니다. 어플리케이션은 내 컴퓨터에서 대략 800 Mbytes를 사용하는 반면, Orbstack은 약 100 Mbytes 정도 사용합니다. 결과적으로 RAM 소비 차이가 더 크며, Orbstack의 메뉴 탐색은 빠르고 원활한 느낌을 주며, Rancher Desktop의 다소 느린 경험과는 다릅니다.

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

![img1](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_15.png)

![img2](/assets/img/2024-07-10-BeyondDockerEmulationOrchestrationandVirtualizationinAppleSilicon_16.png)

오브스택은 랜처 데스크톱과 마찬가지로 도커 소켓을 탑재하고 있습니다. 다른 개발 스택과 함께 사용하기 위해 마운트된 위치를 찾으려면 도커 context list를 사용할 수 있습니다.

현재 작성 시점에서 오브스택과 랜처 데스크톱을 비교했을 때 세 가지 잠재적인 단점을 확인했습니다.

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

- 가격 정책: Orbstack은 상업적 용도를 위한 유료 제품으로 전환될 예정입니다. 수정: 가격 정보는 여기를 참조하세요: [Orbstack 가격](https://orbstack.dev/pricing). 반대로, Rancher Desktop은 무료로 제공되는 것을 고수하고 있습니다. 이 가격 결정이 장벽처럼 보일 수 있지만, 제품 가치를 고려하는 것이 중요합니다. Orbstack의 요청 가격은 macOS 통합 및 해당 개발 노력을 고려할 때 합당해 보입니다.
- 사용 가능한 Linux 머신의 기본 부재: Docker 및 Kubernetes를 Orbstack에서 간단히 작동시킬 때 기본적인 Linux 머신이 존재하지 않는 점이 다른 차이점 중 하나입니다. Orb를 통해 Linux 머신을 설치하고 실행할 수 있지만(리소스 소비를 최소화하면서도), 이는 주 Docker / Kubernetes 환경과 별도의 VM으로 작동합니다. 이로 인해 가상 머신 내에 설치하지 않는 한 Docker CLI에 직접 액세스할 수 없습니다. 이 문제는 저에게는 문제가 되지 않았지만, 잠재적 사용자들이 심사숙고할 수 있는 측면입니다.
- 사용자 정의 능력: Orbstack은 Rancher Desktop과 대조하여 사용자 정의 면에서 조금 제한적으로 보입니다, 특히 후자가 사용하는 기본 도구들을 고려할 때입니다. LiMa와 Rancher Desktop을 통해 사용자는 VM에 대한 가상화 유형을 결정하거나 컨테이너 엔진을 전환하는 등 더 다양한 선택지를 갖습니다. Orbstack은 이러한 선택지를 사전에 간소화하여 스택 설정 프로세스를 단순화하였지만, 이는 사용자 정의를 희생함으로써 이루어진 것입니다. 따라서 Kubernetes 설치에 대해 세밀한 제어를 원하거나 다양한 컨테이너 엔진을 통해 애플리케이션을 테스트하거나 툴/인프라의 다양한 버전을 테스트하고자 하는 사용자들에게는 Orbstack이 적합하지 않을 수 있습니다.

요약하자면 Orbstack은 여러 이점을 제시하지만, 이러한 잠재적 한계는 정보를 철저히 검토하여 선택하는 데 고려할 만합니다. macOS 사용자들 대부분은 간편하고 원활한 K8s 및 Docker 설정을 원할 때 OrbStack의 가격 모델이 즉시 맞게 나올 것입니다. 더 많은 사용자 정의 능력을 원한다면, 여기서 논의된 다른 옵션들을 확인해보세요.

# 결론

이 글은 초기 의도 이상으로 상당히 확장되었습니다. 길이에도 불구하고, 논의된 툴들의 표면만 긁어본 것에 놀랍습니다. 강조된 각 방법은 개별적 요구 사항에 따라 고유한 이점과 한계를 가지고 있습니다.

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

이제는 애플 실리콘 등장 이후의 중요한 발전을 목격하는 것이 정말으로 만족스럽습니다. 오늘날, 우리는 강력한 개발 옵션 다양성을 알아볼 수 있습니다. 마이크로서비스 개발을 위한 생태계가 성숙하고 효율적인 단계에 이른 것을 깨달아 기쁩니다.

# 추가로 읽어볼 것

- QEmu — [https://www.qemu.org](https://www.qemu.org)
- containerd — 가장 인기 있는 컨테이너 런타임
- Docker vs containerd: 컨테이너 런타임 비교: 두 개념을 설명하는 매우 좋은 기사
- 애플의 가상화 프레임워크

원문은 2023년 9월 19일에 [https://oramind.com](https://oramind.com)에서 게시되었습니다.
