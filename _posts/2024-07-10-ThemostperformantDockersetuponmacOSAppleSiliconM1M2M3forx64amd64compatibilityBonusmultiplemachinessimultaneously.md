---
title: "macOS에서 x64 및 amd64 호환성을 위한 최고의 Docker 설정 Apple Silicon M1, M2, M3 - 추가 팁 여러 머신 동시 사용"
description: ""
coverImage: "/assets/img/2024-07-10-ThemostperformantDockersetuponmacOSAppleSiliconM1M2M3forx64amd64compatibilityBonusmultiplemachinessimultaneously_0.png"
date: 2024-07-10 02:20
ogImage:
  url: /assets/img/2024-07-10-ThemostperformantDockersetuponmacOSAppleSiliconM1M2M3forx64amd64compatibilityBonusmultiplemachinessimultaneously_0.png
tag: Tech
originalTitle: "The most performant Docker setup on macOS (Apple Silicon M1, M2, M3) for x64   amd64 compatibility. Bonus: multiple machines simultaneously!"
link: "https://medium.com/@guillem.riera/the-most-performant-docker-setup-on-macos-apple-silicon-m1-m2-m3-for-x64-amd64-compatibility-da5100e2557d"
isUpdated: true
---

![이미지](/assets/img/2024-07-10-ThemostperformantDockersetuponmacOSAppleSiliconM1M2M3forx64amd64compatibilityBonusmultiplemachinessimultaneously_0.png)

요즘 몇 년간 대부분의 작업에서 Podman을 주로 Docker 대체제로 사용해왔어요. 이에 관해 여러 게시물에서 썼습니다:

- Apple Silicon (M1, M2, M3)에서 x86_64를 위한 Podman 머신 설정 (M1, M2, M3에서 Docker amd64 컨테이너 실행)
- Mac (M1, M2)에서 Docker / Podman에서 ElasticSearch 실행 (공식 문서 개선)
- Visual Studio Code Docker Extension 사용하기
- Visual Studio Code devcontainer를 rootless Podman에서 올바르게 작동하도록 만들기
- (몇 년 전에 설정 문제를 해결하기도 했어요. 여기서 macOS (M1 & QEMU 7)에서 Podman)

최근에는 amd64 컨테이너에서 실행되는 중형 워크로드가 포함된 프로젝트를 진행 중이었어요.

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

성능이 점점 중요해지다보니, 사용 사례에 대한 대안을 찾기 시작했습니다.

과거에 콜리마를 접했지만, 지금부터 매일 사용하기 시작했습니다.

Apple의 하이퍼바이저와 로제타 번역 레이어를 사용할 수 있는 가능성으로 인해, 현재는 성능 면에서 Podman을 앞지르고 있습니다.

# 어떻게 작동하나요?

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

우리는 colima와 docker CLI를 설치합니다. 그 후 macOS의 가상화 레이어와 x86/amd64를 Apple Silicon으로 변환하는 특별 구성 플래그를 사용하여 VM을 시작합니다.

Colima는 Lima VM을 만들기 위한 래퍼일 뿐입니다.

Lima는 rosetta로 향상된 x86/amd64 호환성과 도커 런타임을 제공하는 가상 머신입니다.

# 설치

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
brew install colima # 이 래퍼를 사용하여 리마 가상 머신을 만듭니다
brew install docker # CLI만 필요합니다
```

# 초고성능 가상 머신 생성 및 구성

참고: CPU, 메모리 및 디스크 설정을 자신의 요구사항과 하드웨어에 맞게 조정하세요

```bash
colima start \
--profile default \
--activate \
--arch aarch64 \
--cpu 10 \
--disk 48 \
--memory 24 \
--mount ${HOME}:w \
--mount-inotify \
--ssh-agent \
--vm-type vz \
--vz-rosetta \
--verbose
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

# 핵심 구성 설정

- arch: AARCH64는 ARM64 기계에서 실행하고 x86_64 기계가 아닌 것을 지정합니다.
- vm-type: VZ (애플의 Hypervisor.Framework 사용)
- vz-rosetta: Rosetta를 활성화합니다 (macOS 13.0 이상 필요)

린마(Lima) 및 호환성 모드를 사용하여 Rosetta를 구성하는 방법은 아래 참조:

# 도커를 대체하는 셸 구성하기

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

기계가 작동하도록 기다리고 도커 환경을 설정해 봅시다. (사실, 이 과정은 엄격히 필요하지는 않습니다. 번들 nerdctl 도구를 사용해도 됩니다.)

하지만 도커를 대체할 간편한 옵션을 원하신다면 따라 해보세요:

- 이를 당신의 셸 프로필에 넣거나 필요할 때 현재 세션에 넣으세요.

```js
export COLIMA_VM="default"
export COLIMA_VM_SOCKET="${HOME}/.colima/${COLIMA_VM}/docker.sock"
export DOCKER_HOST="unix://${COLIMA_VM_SOCKET}"
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

# 보너스: 여러 대의 기계 동시에 운영

특정 시점에는 더 많은 실험을 실행하거나 작업을 분할하고 부하를 나누고 싶을 수도 있습니다.

예를 들어, 애플의 하이퍼바이저를 사용하는 경우에는 VM 디스크 크기를 생성 후에는 조절할 수 없다는 제한이 있습니다. 따라서 VM을 파괴하고 다시 만들지 않고도 (모든 컨테이너를 잃지 않도록) 다른 VM을 나란히 두어 부하를 분산시킬 수 있습니다.

Podman은 이러한 유형의 작업 부하를 공식적으로 지원하지 않지만, 여전히 동일한 결과를 얻을 수 있습니다.

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

# 보조 머신을 생성하려면 colima 명령을 하나 더 실행하면 됩니다

```js
colima start \
--profile secondary \
--activate \
--arch aarch64 \
--cpu 1 \
--disk 20\
--memory 8 \
--mount ${HOME}:w \
--mount-inotify \
--ssh-agent \
--vm-type vz \
--vz-rosetta \
--verbose
```

```js
export COLIMA_VM="secondary"
export COLIMA_VM_SOCKET="${HOME}/.colima/${COLIMA_VM}/docker.sock"
export DOCKER_HOST="unix://${COLIMA_VM_SOCKET}"
```

이것으로 끝입니다.

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

즐겨보세요!
