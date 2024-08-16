---
title: "라즈베리 파이에서 도커 이미지를 실행하는 방법"
description: ""
coverImage: "/assets/img/2024-05-16-HowtorundockerimagesonRaspberryPi_0.png"
date: 2024-05-16 17:30
ogImage: 
  url: /assets/img/2024-05-16-HowtorundockerimagesonRaspberryPi_0.png
tag: Tech
originalTitle: "How to run docker images on Raspberry Pi"
link: "https://medium.com/@dogabudak/how-to-run-docker-images-on-raspberry-pi-ed63b0b9b758"
isUpdated: true
---




<img src="/assets/img/2024-05-16-HowtorundockerimagesonRaspberryPi_0.png" />

여기에 긴 소개 단락을 만들려고 했지만, 만약 이 링크를 클릭했다면 도커와 라즈베리 파이에 대해 이미 알고 있을 것 같네요, 맞죠? 그러면 바로 이 기사의 "어떻게" 부분을 확인해 볼까요?

간편하게 하기 위해 파이용 기본 운영 체제 인 "Raspberry Pi OS" (이전 명칭은 Raspbian)를 사용할 것입니다. 또한 Raspberry Pi 4를 사용할 것입니다. Raspberry Pi 4는 이전 모델보다 성능이 향상되었으며, RAM (1GB, 2GB 또는 4GB) 및 더 빠른 처리 능력의 옵션이 있습니다.

# SD 카드 준비하기

<div class="content-ad"></div>

라즈베리 파이 OS의 최신 버전을 다운로드하려면 다음 단계를 따라주세요:

1. 라즈베리 파이 웹사이트 방문: https://www.raspberrypi.org/ 에서 라즈베리 파이 공식 웹사이트를 방문해주세요.

2. 다운로드 섹션으로 이동: 웹사이트에서 "다운로드" 섹션을 찾아주세요. 보통 상단 메뉴나 홈페이지에 있습니다.

3. 라즈베리 파이 OS 선택: 다운로드 섹션 안에서 사용 가능한 운영 체제 목록을 보실 수 있습니다. "Raspberry Pi OS" 또는 해당 변형(최소 버전의 경우 "Raspberry Pi OS Lite"와 같은)을 찾아주세요.

<div class="content-ad"></div>

4. 에디션 선택: 사용 가능한 다양한 에디션이 있을 수 있습니다. 전체 데스크톱 버전이나 Lite 버전과 같이 선택할 수 있습니다. 당신의 요구에 가장 잘 맞는 것을 선택하세요. 데스크톱 버전에는 그래픽 사용자 인터페이스가 포함되어 있고 Lite 버전은 명령줄만 지원합니다. 저는 대부분의 경우 Lite 버전을 선호합니다.

5. 이미지 다운로드: 원하는 에디션의 다운로드 링크를 클릭하세요. 이렇게 하면 다운로드 프로세스가 시작됩니다.

6. 다운로드 확인 (옵션): Raspberry Pi 웹 사이트에서 제공하는 체크섬을 사용하여 다운로드한 이미지의 무결성을 확인하는 것이 좋은 습관입니다. 이는 다운로드 프로세스 중에 이미지가 손상되지 않았음을 보장합니다.

7. SD 카드 준비: 다운로드가 완료되면, 다운로드한 이미지를 SD 카드에 작성해야 합니다. 이 작업에는 Etcher(https://www.balena.io/etcher/)와 같은 소프트웨어를 사용할 수 있습니다. 소프트웨어가 제공하는 지침에 따라 이미지를 SD 카드에 작성하세요.

<div class="content-ad"></div>

SD 카드를 추출하기 전에 해당 카드에서 SSH를 활성화하세요. 라즈베리파이 재단은 라즈베리파이 전역의 보안을 향상시키고 해킹 위험을 줄이기 위해 예방 조치로 기본 이미지에서 SSH(Secure Shell) 액세스를 비활성화했습니다. 대신 사용자는 "boot/" 디렉토리에 "ssh"라는 이름의 텍스트 파일을 만듦으로써 SSH를 활성화할 수 있습니다. 이 파일은 비어 있어도 되고 원하는 텍스트를 포함할 수도 있습니다.

![이미지](/assets/img/2024-05-16-HowtorundockerimagesonRaspberryPi_1.png)

8. 라즈베리파이에 SD 카드를 삽입하세요: 이미지를 SD 카드에 기록한 후, 해당 SD 카드를 라즈베리파이의 SD 카드 슬롯에 삽입합니다.

# Docker 설치

<div class="content-ad"></div>

라즈베리 파이를 부팅하면 본주어(avahi) 서비스를 통해 네트워크에서 해당 장치를 찾을 수 있습니다.

## SSH로 연결하기

```shell
$ ssh pi@raspberrypi.local
```

비밀번호는 raspberry입니다.

<div class="content-ad"></div>

보안 상의 이유로 passwd 명령어를 사용하여 사용자 pi의 암호를 변경하는 것이 좋습니다.

## Docker 설치 프로그램 시작

![이미지](/assets/img/2024-05-16-HowtorundockerimagesonRaspberryPi_2.png)

Docker 프로젝트에서 유지보수하는 스크립트는 systemd 서비스 파일의 생성을 자동화하고 관련 Docker 이진 파일을 /usr/bin/ 디렉토리로 복사합니다.

<div class="content-ad"></div>

스크립트를 실행하려면 다음 명령을 실행하세요:

```js
curl -sSL https://get.docker.com | sh
```

이전에는 Raspberry Pi에 Docker를 설치하는 것이 수동 프로세스를 필요로 했는데, 종종 처리 능력이 제한된 장치에서 Docker를 처음부터 빌드하는 작업이 필요했고, 이는 몇 시간이 걸릴 수 있었습니다. Hypriot과 같은 ARM 애호가들의 노력 덕분에 Docker의 지속적인 통합(CI) 프로세스에는 이제 .deb 패키지가 지원 옵션으로 포함되어 있습니다.

더 최신 버전을 테스트하고 싶다면 get.docker.com을 test.docker.com으로 교체하여 테스트 버전 사용으로 전환할 수 있습니다. 그러나 이러한 버전에는 아직 해결되지 않은 문제가 일부 남아 있을 수 있음을 감안해주시기 바랍니다.

<div class="content-ad"></div>

# 도커 구성

최상의 경험을 얻기 위해 수행해야 하는 몇 가지 수동 단계가 있습니다.

## 도커 자동 시작 설정

```js
$ sudo systemctl enable docker
```

<div class="content-ad"></div>

라즈베리 파이를 다시 시작하거나 다음 명령을 사용하여 도커 데몬을 시작할 수 있습니다:

```js
$ sudo systemctl start docker
```

## 도커 클라이언트 활성화

도커 클라이언트를 사용하려면 관리자 권한이 있거나 docker 그룹에 속해 있어야 합니다. "pi" 사용자 또는 그와 동일한 권한을 가진 사용자가 docker 그룹에 추가되었는지 확인하세요.

<div class="content-ad"></div>

```js
$ sudo usermod -aG docker pi
```

이 변경 사항을 적용한 후에는 로그 아웃하고 ssh를 통해 다시 연결하십시오.

## ARM 아키텍처 이미지 실행

ARM 아키텍처를 사용하는 Raspberry Pi 3 및 Raspberry Pi 4와 같은 모델을 위한 이미지는 대부분 latest로 표시되어 있어 ARM 아키텍처를 지원하도록 제작되어있어 잘 작동해야 합니다. 그러나 ARMv6 아키텍처를 사용하는 이전 모델 (예: Raspberry Pi 1 및 Raspberry Pi Zero)의 경우 호환성이 제한 될 수 있으며 ARMv6를 대상으로한 이미지를 별도로 지정하거나 직접 빌드해야 할 수도 있습니다.

<div class="content-ad"></div>


도커를 실행할 준비가 되었습니다. 라즈베리 파이를 사용할 수 있습니다. 이제 라즈베리 파이에서 새 이미지를 실행해 보세요. 제 웹 서비스를 라즈베리 파이에 배포하고 집에서 애플리케이션 백엔드를 실행할 예정입니다.

다음 "어떻게" 글을 기대해 주세요!
