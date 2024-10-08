---
title: "도커 컨테이너 관리하는 방법 실전 가이드"
description: ""
coverImage: "/assets/img/2024-07-06-DockerContainerAdministration_0.png"
date: 2024-07-06 03:28
ogImage:
  url: /assets/img/2024-07-06-DockerContainerAdministration_0.png
tag: Tech
originalTitle: "Docker Container Administration"
link: "https://medium.com/@ershrawan014/docker-container-administration-d17ead0fa147"
isUpdated: true
---

/assets/img/2024-07-06-DockerContainerAdministration_0.png

여기는 랜처와 포테이너.io와 같은 Docker 컨테이너 관리를 위한 오픈소스 도구들을 소개하는 기사입니다.

컨테이너는 애플리케이션, 의존성, 라이브러리, 이진 파일 및 실행에 필요한 구성을 포함하는 완전한 실행 환경을 구성합니다. 이를 컨테이너화라고 하며, 애플리케이션 플랫폼과 해당 의존성, 운영 배포 간의 차이, 그리고 하부 인프라에서 추상화될 수 있도록 돕습니다.

그러나, 도커화된 애플리케이션을 프로덕션 컨테이너로 이동시키려면 보안, 자동화, 오케스트레이션 및 관리를 보장하기 위한 적절한 관리 도구가 필요합니다. 오늘날 이미지와 컨테이너가 프로덕션에 이르기까지 다양한 환경에서 배포되는 방법을 정의하는 것이 중요하며, 도커는 개발자가 더 신속하게 혁신하도록 돕습니다.

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

# 구조

- 컨테이너 관리 소개

- Rancher를 이용한 컨테이너 관리

- Portainer.io를 이용한 컨테이너 관리

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

# 목표

• 컨테이너 관리에 대한 이해

• 랜처를 이용한 컨테이너 관리에 대한 이해

- 포테이네리오를 이용한 컨테이너 관리에 대한 이해

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

# 컨테이너 관리 소개

조직과 개발자들은 도커 환경을 관리하는 데 관련된 도전적인 과제와 도커 컨테이너를 배포하면서 효과적인 관리를 지원하는 비즈니스 솔루션을 실행할 필요성을 고려해야 합니다. 도커 컨테이너는 산재, 규정 준수, 그리고 관리 문제를 성공적으로 관리할 수 있도록 해주는 필수 기술입니다.

컨테이너의 생명 주기는 세 가지 단계로 나뉩니다:

1. 개발 단계: 첫 번째 단계에서 개발자들은 애플리케이션 코드와 라이브러리와 같은 항목을 포함하는 도커 컨테이너를 작성하고 배포합니다. 그런 다음 애플리케이션을 테스트하고 오류를 수정하며 기능이나 개선 사항을 추가하고 새로운 도커 이미지를 만들어 새 컨테이너에 배포합니다. 이 과정은 필요한 표준이 충족될 때까지 계속됩니다.

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

애플리케이션 릴리스: 두 번째 단계에서는 매니저들이 Docker 구축, 테스트, 그리고 배포 드라이버를 포함하는 애플리케이션 환경의 자동화를 조정합니다.

IT 운영: 마지막 단계에서는 컨테이너가 생산 환경에 배포되어 해체될 때까지 운영 및 사용 가능한 상태로 유지됩니다. 이 단계에서 최종적인 도전 과제인 오케스트레이션 및 거버넌스, 보안, 그리고 컨테이너 모니터링이 중요합니다.

Docker의 혜택을 최대한 활용하려면, 개발자들과 조직들은 다음 다섯 가지 주요 컨테이너 관리 도전 과제를 해결할 수 있는 솔루션들이 필요합니다:

통제 부재: 개발자들은 빠르게 애플리케이션 컨테이너를 만들고, 실행하며 테스트할 자유가 필요합니다. 반면, 운영 팀은 리소스의 과소비를 피하기 위해 통제와 거버넌스가 필요합니다.

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

##### 성장로드맵을 따라 팬데믹으로부터 복구하기

개발 환경의 변화에 따라 중요한 것은 품질과 안전을 유지하는 것입니다.

##### 규모 확장의 복잡성

가상화된 또는 클라우드 인프라는 사라지지 않고 Docker 인프라와 계속 공존할 것입니다.

##### Docker 및 다른 인프라를 커버하는 완전한 애플리케이션 구현

Docker 및 다른 인프라를 커버하는 완전한 애플리케이션의 구현에는 애플리케이션을 오케스트레이트하고 실행 환경을 최적으로 관리하기 위한 더 발전된 능력이 필요합니다.

##### 취약점 보호와 규정 준수

Docker 컨테이너는 운영 체제의 일부를 포함하기 때문에 Heartbleed나 Ghost와 같은 취약점을 포함할 수 있습니다. 환경의 보호에는 호스트 Docker 레이어, 컨테이너 및 이미지의 보안이 필요합니다. 컨테이너 업데이트는 운영 업무를 개발로 변경할 수 있는 새로운 관리 패러다임을 만듭니다.

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

Docker 환경에서는 특별한 모니터링 능력이 필요합니다. Docker와 API 수준 통합 및 Docker 이미지에 내장된 측정 기능과 같은 기능이 필요합니다.

Docker의 혜택을 최대한 활용하기 위해 기업은 Docker 컨테이너의 전체 수명주기를 관리하고 개발 및 프로덕션 환경 모두에서 기업의 가용성을 보장하는 적절한 관리 및 관리 도구가 필요합니다.

Docker 생태계 안에서, 우리는 이미지 및 컨테이너를 안전하게 관리하는 프로세스를 관리하기 위한 개발자들을 위한 흥미로운 도구들을 찾을 수 있습니다. 컨테이너 관리를 위한 주요 도구로 Rancher와 Portainer를 강조할 수 있습니다.

Portainer는 다양한 Docker 환경(호스트 수준이나 Swarm을 통한 클러스터 수준)을 관리할 수 있는 사용자 인터페이스입니다. 이 도구는 Docker 엔진에서 실행할 수 있는 단일 컨테이너로 구성되어 있으며 리눅스 컨테이너나 네이티브 Windows 컨테이너로 구현할 수 있습니다.

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

Rancher(랜처)는 도커(Docker)에서 작동하는 오픈소스 플랫폼으로, 컨테이너 기반으로 응용 프로그램을 배포할 수 있게 해줍니다. 이 플랫폼에는 AWS(아마존), Azure(마이크로소프트), DigitalOcean과 같은 다른 클라우드의 기계 또는 인스턴스를 시각적으로 관리하는 Hosts 섹션이 있습니다. 이는 인스턴스 관리를 위한 시각적 콘솔로 볼 수 있습니다.

Dockstation(독스테이션)과 같은 다른 관리 솔루션도 있습니다. Dockstation은 도커(Docker)에서 컨테이너 관리를 위한 사용자 인터페이스 애플리케이션입니다. 먼저 프로젝트를 생성하고 도컴포즈(.ymil) 파일이나 응용 프로그램을 시작할 수 있는 도커 실행 명령을 설정합니다. 더 많은 설치 및 사용 정보는 GitHub의 공개 저장소에서 확인할 수 있습니다.

- [Dockstation GitHub 저장소](https://github.com/DockStation/dockstation)

주요 기능 중에서 각 컨테이너의 자원 소비를 볼 수 있으며, 실행 중인 컨테이너의 상태를 모니터링하고 리소스, CPU, 메모리, 네트워크 사용량을 표시할 수 있다는 점을 강조할 수 있습니다.

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

다음 섹션에서는 Rancher를 사용하여 Docker에서 컨테이너 스택을 오케스트레이션하는 방법을 배웁니다.

# Rancher를 사용한 컨테이너 관리:

Rancher는 원격 서버에서 컨테이너 및 컨테이너 스택을 관리할 수 있는 플랫폼입니다. 서버에 들어가서 컨테이너를 관리하는 대신 모든 작업을 한 곳에서 처리할 수 있으며 Rancher가 제공하는 모든 기능을 활용할 수 있습니다. 아래 URL에서 설치 요구 사항을 확인할 수 있습니다:

서버에 Docker 컨테이너로 Rancher를 설치하려면 다음 명령을 실행하세요:

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
$ docker run -d --restart=unless-stopped -p 8080:8080 rancher/server:stable
```

위 명령은 Rancher의 공식 이미지를 다운로드하고 Rancher 서버를 실행하게 됩니다. 패널 인터페이스에는 8080 포트를 통해 접속할 수 있습니다.

Rancher가 제공하는 주요 장점 중 일부는 다음과 같습니다:

- 필요에 따라 여러 환경을 만들 수 있으며, 다른 환경에 대한 사용자 및 역할을 관리할 수 있습니다.

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

• Cattle, Mesos, Kubernetes, 그리고 Docker Swarm과 같은 여러 옵션 중에서 컨테이너 오케스트레이터를 선택할 수 있어요.

• Rancher 커뮤니티라는 공개 카탈로그가 있어서 커뮤니티가 응용 프로그램에 기여할 수 있어요.

이 플랫폼에는 AWS(Amazon), Azure(Microsoft), 그리고 Digitalocean과 같은 서로 다른 클라우드의 기계나 인스턴스들을 시각적으로 관리할 수 있는 '호스트' 섹션이 있어요. 이는 인스턴스 관리의 시각적 콘솔이라고 할 수 있어요.

Rancher가 제공하는 옵션 중 하나는 컨테이너와 스택을 배포하기 위한 호스트 추가 가능성이에요.

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

/assets/img/2024-07-06-DockerContainerAdministration_1.png

애플리케이션은 간단한 인터페이스를 가지고 있습니다. 한편으로, 호스트들은 컨테이너를 만들고 그 컨테이너로 만든 애플리케이션을 시작할 수 있습니다. Rancher는 에이전트를 관리하여 호스트들과의 통신을 확립합니다. 그래서 우리는 그 에이전트를 설치해야 합니다. 그것은 매우 간단한 프로세스입니다. Rancher 콘솔에서 다음 단계를 따라 호스트들을 추가하기만 하면 됩니다:

1. 메뉴 내에서 Infrastructure | Hosts 옵션 선택

2. 마법사가 가리키는 단계를 따라 호스트에 에이전트를 설치합니다.

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

3. Rancher가 관리하길 원하는 호스트에서 명령을 실행합니다.
