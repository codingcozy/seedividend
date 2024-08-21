---
title: "Ubuntu 2204에서 Docker Desktop 설치하는 방법"
description: ""
coverImage: "/assets/img/2024-07-10-HowToInstallDockerDesktoponUbuntu2204_0.png"
date: 2024-07-10 02:16
ogImage:
  url: /assets/img/2024-07-10-HowToInstallDockerDesktoponUbuntu2204_0.png
tag: Tech
originalTitle: "How To Install Docker Desktop on Ubuntu 22.04"
link: "https://medium.com/@selvamraju007/how-to-install-docker-desktop-on-ubuntu-22-04-1ebe4b2f8a14"
isUpdated: true
---

![이미지](/assets/img/2024-07-10-HowToInstallDockerDesktoponUbuntu2204_0.png)

안녕하세요! 이 블로그에서는 우분투 22.04에 도커 데스크톱을 설정하는 방법에 대해 알아볼 것입니다.

도커 데스크톱:

도커 데스크톱은 macOS, Linux 및 Windows 기기용으로, 컨테이너화된 응용 프로그램 및 마이크로서비스를 신속하고 안전하게 빌드하고 공유할 수 있게 해주는 애플리케이션입니다.

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

Docker Desktop에는 앱 개발을 위한 내장 Kubernetes 설정이 포함되어 있습니다. 또한, 인증된 이미지, 템플릿, 그리고 여러 언어와 도구를 선택하여 사용할 수 있습니다. 개발 워크플로우는 Docker Hub를 활용하여 안전한 저장소로 개발 환경을 확장하고 빠른 자동 빌드, 지속적 통합, 그리고 안전한 협업을 할 수 있도록 합니다.

## 사전 준비 사항

다음 기본 요구 사항을 충족하는지 확인해주세요.

- 가상화 지원이 활성화된 64비트 CPU
- 적어도 4GB RAM
- GUI 데스크톱 환경 (가능하다면 GNOME, MATE, 또는 KDE)
- 관리자 권한이 있는 Sudo 사용자

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

# KVM 가상화 지원

만약 호스트 컴퓨터가 가상화를 지원한다면 kvm 모듈은 자동으로 로드될 것입니다. 수동으로 모듈을 로드하려면 아래 명령을 실행하세요:

```js
modprobe kvm
```

호스트 컴퓨터의 프로세서에 따라 해당 모듈을 로드해야 합니다.

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
sudo modprobe kvm_intel  # Intel 프로세서
sudo modprobe kvm_amd    # AMD 프로세서
```

단계 1: Gnome 데스크톱이 없는 상황에서는 Gnome 터미널을 설치해야 합니다:

```bash
sudo apt install gnome-terminal
```

단계 2: Docker Desktop for Linux의 tech preview 또는 베타 버전을 제거하세요. 아래 명령을 실행하세요:

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
sudo apt remove docker-desktop
```

# 우분투 22.04에서 도커 설치 방법:

이제 도커를 설치해 봅시다. 그 전에 패키지 목록을 업데이트하고 필요한 종속성을 다음과 같이 설치해 주세요.

```bash
$ sudo apt update
$ sudo apt install software-properties-common curl apt-transport-https ca-certificates -y
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

설치가 완료되면 Docker의 GPG 서명 키를 추가하세요.

```js
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-archive-keyring.gpg
```

다음으로 시스템에 공식 Docker 저장소를 다음과 같이 추가하세요.

```js
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
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

한번 저장소가 설치되면 아래와 같이 Docker와 다른 Docker 도구들을 설치해주세요.

```js
$ sudo apt install docker-ce docker-ce-cli containerd.io uidmap -y
```

설치가 완료되었으면, Docker가 정상적으로 실행 중인지 다음 명령어로 확인해주세요:

```js
sudo systemctl status docker
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

첫 번째 그림을 보면 도커 데스크톱을 우분투 22.04에 설치하는 방법을 확인할 수 있어요.

도커 버전을 확인하려면 아래 명령어를 입력해보세요.

```js
docker version
```

두 번째 그림도 참고하세요!

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

우분투 22.04에 도커 데스크톱 설치하는 방법을 알려드리겠습니다.

먼저 아래의 wget 명령어를 사용하여 도커 데스크톱을 설치하세요. 현재 최신 버전은 도커 데스크톱 버전 4.19.0입니다.

```bash
$ wget https://desktop.docker.com/linux/main/amd64/docker-desktop-4.19.0-amd64.deb
```

또한 아래 명령어를 사용하여 DEB 패키지를 다운로드할 수 있으며, 그 후 설치하세요.

도움이 되셨길 바랍니다. 😊

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
$ sudo apt install ./docker-desktop-*-amd64.deb
```

![HowToInstallDockerDesktoponUbuntu2204_3](/assets/img/2024-07-10-HowToInstallDockerDesktoponUbuntu2204_3.png)

도커 데스크톱을 실행해보세요:

이제 응용 프로그램 메뉴에서 도커 데스크톱을 실행하고 사용권 계약 조건에 동의하세요.

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

지금부터 CLI 명령어 대신 도커 데스크톱에서 컨테이너를 생성할 수 있어요.

즐거운 학습되세요! 🌍✈️🙂
