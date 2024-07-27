---
title: "버릇없는 Google 사진 RaspberryPi, SyncThing 및 PhotoPrism을 사용하여 사진 백업하기"
description: ""
coverImage: "/assets/img/2024-05-15-DumbGooglePhotosBackupyourphotosusingRaspberryPiSnycThingandPhotoPrism_0.png"
date: 2024-05-15 16:21
ogImage: 
  url: /assets/img/2024-05-15-DumbGooglePhotosBackupyourphotosusingRaspberryPiSnycThingandPhotoPrism_0.png
tag: Tech
originalTitle: "Dumb Google Photos: Backup your photos using RaspberryPi, SnycThing and PhotoPrism"
link: "https://medium.com/@lennart.dde/dumb-google-photos-backup-your-photos-using-raspberrypi-snycthing-and-photoprism-2c3aaa98817a"
---


<img src="/assets/img/2024-05-15-DumbGooglePhotosBackupyourphotosusingRaspberryPiSnycThingandPhotoPrism_0.png" />

디지털 시대에 있어서 사진은 우리의 가장 소중한 자산 중 하나로, 대체할 수 없는 순간과 추억을 담고 있습니다. 하지만 이러한 기억을 보호하는 것은 어려울 수 있습니다. 특히 기기 고장, 분실 또는 도난의 위험이 있습니다. 전통적인 클라우드 서비스는 해결책을 제공하지만 종종 개인 정보 보호와 계속해서 지불해야 하는 요금이라는 비용이 따릅니다. 이 글은 Raspberry Pi, Syncthing 및 PhotoPrism을 사용하여 사진을 백업하는 강력하고 개인 정보 보호 중심의 솔루션을 소개합니다. 이 도구들은 사용자 맞춤형 및 안전한 방법을 제공하여 사진을 저장, 관리 및 액세스할 수 있습니다. 사진을 좋아하는 사람이거나 디지털 기억을 안전하게 보호하고자 하는 경우, 이 안내서를 통해 데이터를 비공개로 유지하고 기억을 안전하게 보관하는 포괄적인 가정용 사진 백업 시스템을 설정하는 방법을 안내해 드리겠습니다.

# 목차

도구 이해하기



라즈베리 파이 준비

Syncthing 설치 및 구성

PhotoPrism 설정

백업 프로세스 자동화



사진 백업 시스템 최적화를 위한 팁

## 소개

사진 백업은 전문가와 애호가 모두에게 소중한 기억과 작품을 보호하기 위한 중요한 작업입니다. 다양한 기술 솔루션의 등장으로 가정에서 경제적이면서도 효과적인 백업 시스템을 구축하는 것이 더욱 쉬워졌습니다. 이 안내서는 Raspberry Pi, Syncthing 및 PhotoPrism을 활용하여 강력한 사진 백업 솔루션을 만드는 데 초점을 맞춥니다. 각 도구는 각각 고유한 강점을 가지고 있습니다. Raspberry Pi는 소형이면서도 강력한 하드웨어 플랫폼을 제공하며, Syncthing은 여러 장치 간 파일의 안전하고 개인적인 동기화를 제공하며, PhotoPrism은 이 파일들을 쉽게 정리하고 액세스할 수 있도록 도와줍니다. 이러한 기술들을 통합함으로써 사용자들은 완전히 자동화되고 확장 가능한 사진 백업 시스템을 구축할 수 있습니다.

## 섹션 1: 도구 이해



라즈베리 파이는 다양한 프로젝트에 사용할 수 있는 작고 저렴한 컴퓨터입니다. 우리의 목적에는 그 소형 크기와 저전력 소비로 가정용 서버를 운영하기에 이상적인 선택입니다. 다양한 모델이 있지만, 미디어 파일을 효율적으로 처리하기 위해 램과 프로세서가 더 좋은 모델이 선호됩니다.

싱크띵은 여러 기기 간 파일 동기화 프로세스를 간소화하는 무료 오픈소스 지속적인 파일 동기화 프로그램입니다. 싱크띵은 피어 투 피어 모델로 작동하여 데이터가 제3자 클라우드 서비스에 의존하지 않도록 보장하여 파일을 개인적이고 제어할 수 있게 합니다.

포토프리즘은 Go와 Google TensorFlow로 구동되는 오픈소스 사진 관리 도구입니다. 다양한 매개변수를 기반으로하여 사진에 액세스하고 정리할 수 있는 사용자 친화적 인터페이스를 제공합니다. 사진 색인, 중복 관리, 강력한 검색 기능 제공 등의 기능을 포함하여, 싱크띵이 다루는 방대한 양의 데이터를 보고 정리하는 데 탁월한 도구이므로 사진 관리에 뛰어난 툴입니다.

# Section 2: 라즈베리 파이 준비하기



라즈베리 파이를 사진 백업 시스템의 백본으로 설정하는 것은 올바른 하드웨어 선택부터 소프트웨어 환경 구성까지 여러 중요 단계가 필요합니다. 시작하는 방법은 다음과 같습니다:

## 하드웨어 선택

라즈베리 파이는 다양한 모델로 제공되며 각각 다른 사양과 기능을 갖추고 있습니다. 사진 관리 및 백업을 위한 프로젝트의 경우, 라즈베리 파이 5를 강력히 추천합니다. 이 모델은 우수한 처리 성능과 증가된 메모리 옵션(최대 8GB RAM)을 갖추고 있어 대용량 파일을 처리하고 여러 서비스를 원활하게 실행하는 데 도움이 됩니다.

또한 필요한 것은:



- SD 카드: 적어도 32GB의 저장 용량을 갖춘 고속 SD 카드는 운영 체제 및 애플리케이션에 필수적입니다. 많은 읽기/쓰기 작업에 적합한 고내구성 카드를 사용하는 것을 고려해보세요.
- 전원 공급: 안정적이고 신뢰할 수 있는 전원 공급을 보장하기 위해 라즈베리 파이의 공식 전원 공급 장치를 사용하세요.
- 외장 하드 드라이브: 사진을 저장하기 위해 USB를 통해 연결된 외장 HDD 또는 SSD가 필요합니다. 백업 요구 사항을 처리할 수 있는 충분한 용량을 갖췄는지 확인해주세요.

라즈베리 파이의 자세한 초기 설정 가이드는 이 기사를 참고해주세요.

## 소프트웨어 설치 및 네트워크 설정

- 운영 체제: 라즈베리 파이 웹사이트에서 라즈베리 파이 OS의 최신 버전을 다운로드하세요. Raspberry Pi Imager를 사용하여 SD 카드에 OS 이미지를 작성해주세요. 이 도구는 Pi를 부팅하기 전에 Wi-Fi 설정, SSH 활성화 및 로케일 설정 구성과 같은 고급 옵션도 제공합니다.
- 초기 설정: SD 카드를 라즈베리 파이에 삽입하고, 모니터, 키보드, 마우스를 연결하고 전원을 켜세요. 홈 네트워크에 연결하는 것을 포함하여 초기 설정을 완료하기 위해 화면 안내에 따라 진행하세요.
- 소프트웨어 업데이트: 라즈베리 파이를 최신 상태로 유지하는 것은 보안 및 성능 측면에서 중요합니다. 다음 명령을 실행하여 설치된 모든 패키지를 업데이트하세요:



```js
sudo apt update
sudo apt full-upgrade
```

필요한 패키지 설치: Syncthing 및 PhotoPrism을 원활하게 실행하기 위해 몇 가지 패키지가 필요합니다. 다음 명령을 실행하여 설치하세요:

```js
sudo apt install -y curl wget vim git
```

## Tailscale을 사용한 네트워킹



전통적인 포트 포워딩 대신 Tailscale을 사용하여 집 네트워크 외부에서 Raspberry Pi에 액세스할 수 있습니다. Tailscale은 기기 간 안전한 네트워크를 만드는 제로 구성 VPN 서비스입니다:

- Tailscale 설치: Raspberry Pi에 Tailscale을 설치하여 기기를 보호하고 원격 액세스를 간편하게하세요:

```js
curl -fsSL https://tailscale.com/install.sh | sh
```

- Tailscale 설정: 화면 안내에 따라 로그인하고 기기를 Tailscale 네트워크에 연결하세요.
- 어디서나 액세스: Tailscale을 설정하면 전통적인 네트워크 설정 없이 Tailscale 네트워크에 연결된 장치에서 Raspberry Pi에 액세스할 수 있습니다.



라즈베리 파이에 Tailscale을 설정하는 자세한 단계는 이 포괄적인 안내서를 참조해주세요.

이제 안전하게 인터넷에 Tailscale을 통해 연결된 라즈베리 파이는 사진 백업 서버로 사용할 준비가 되었습니다. 다음 단계는 Syncthing을 설치하고 구성하여 파일을 여러 기기간에 동기화하는 것입니다.

# 섹션 3: Syncthing 설치 및 구성

Syncthing은 인터넷을 통해 여러 기기간에 파일을 안전하게 동기화하는 강력한 오픈 소스 도구입니다. 이 섹션에서는 라즈베리 파이에 Syncthing을 설치하고 사진을 효율적으로 동기화하도록 구성하는 방법을 다룰 것입니다.



## Syncthing 설치하기

Syncthing Repository 추가하기: 먼저 Syncthing 저장소를 Raspberry Pi에 추가하여 최신 업데이트를 직접 받도록 해보세요:

```js
curl -s https://syncthing.net/release-key.txt | sudo apt-key add -
echo "deb https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list
```

Syncthing 설치하기: 패키지 목록을 업데이트하고 Syncthing을 설치하세요:



```js
sudo apt update
sudo apt install syncthing
```

서비스 활성화 및 시작: Syncthing이 부팅 시 자동으로 시작되고 백그라운드에서 실행되도록하려면 Syncthing 서비스를 활성화하고 시작하십시오:

```js
systemctl enable syncthing@$(whoami).service
systemctl start syncthing@$(whoami).service
```

## Syncthing 구성하기



- Syncthing에 액세스하기: Syncthing은 라즈베리 파이의 웹 인터페이스를 통해 액세스할 수 있습니다. 브라우저를 열고 http://localhost:8384로 이동하세요. 원격으로 액세스하는 경우, 라즈베리 파이의 IP 주소 뒤에 :8384를 붙입니다.
- 기기 추가: 기기 간에 파일을 동기화하려면 각 기기를 Syncthing 네트워크에 추가해야 합니다. Syncthing 대시보드에서 "기기 추가"를 클릭하고 동기화할 각 기기의 기기 ID를 입력하세요. 해당 기기의 Syncthing 인터페이스에서 기기 ID를 찾을 수 있습니다.
- 폴더 공유: 기기가 연결된 후 동기화할 폴더를 지정할 수 있습니다. "폴더 추가"를 클릭하고 폴더 경로, 레이블을 제공하고 이 폴더와 동기화하려는 기기를 선택하세요. 사진 백업을 위해, 모든 사진이 저장되고 동기화되는 특정 폴더를 기기에 만드세요.
- 파일 버전 관리 및 백업 설정: Syncthing을 사용하면 파일의 이전 버전을 유지할 수 있어 추가적인 백업 보호층이 제공됩니다. 폴더 설정에서 "파일 버전 관리" 아래에서 단순 파일 버전 관리 또는 단계적 파일 버전 관리와 같은 필요에 맞는 버전 관리 방법을 선택하세요.
- 보안 설정: 보안을 강화하기 위해 Syncthing을 HTTPS를 사용하도록 구성하고 "설정" - "GUI" 아래에서 강력한 GUI 인증 비밀번호를 설정하세요.

## 사진 자동 백업

백업 프로세스를 자동화하기 위해, 모든 기기의 지정된 사진 폴더에 추가된 새로운 사진이 자동으로 라즈베리 파이에 동기화되도록 확인하세요. Syncthing은 이러한 폴더를 모니터링하고 모든 연결된 기기에 변경 사항을 동기화합니다.

구성된 Syncthing을 통해 사진은 이제 지속적으로 라즈베리 파이에 백업되어 어디서든 안전하게 액세스할 수 있습니다. 이 설정은 견고한 백업 솔루션을 제공할 뿐만 아니라 데이터가 개인 정보로 유지되고 제어 범위 내에 유지되도록 보장합니다.



다음 단계는 Syncthing이 동기화된 사진을 저장하는 저장소와 PhotoPrism을 통합하여 사진 관리를 위한 아름답고 기능적인 인터페이스를 제공하는 것입니다.

# 섹션 4: PhotoPrism 설정

PhotoPrism은 최신 기술을 활용하여 사용자 친화적인 인터페이스를 제공하는 개인 정보 보호에 중점을 둔 오픈 소스 사진 관리 응용 프로그램입니다. 이 섹션에서는 Raspberry Pi에 PhotoPrism을 설치하고 Syncthing에 저장된 사진과 원활하게 작동하도록 구성하는 방법을 안내해 드리겠습니다.

## PhotoPrism 설치하기



환경을 준비하세요:

- PhotoPrism은 Raspberry Pi에서 실행하려면 Docker가 필요합니다. 따라서 첫 번째 단계는 Raspberry Pi에 Docker 및 Docker Compose를 설치하는 것입니다:

```js
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ${USER}
newgrp docker
sudo apt-get install -y docker-compose
```

PhotoPrism 다운로드:



예제 PhotoPrism 도커 설정을 Raspberry Pi로 복제해보세요:

```js
git clone https://github.com/photoprism/photoprism.git
cd photoprism/docker
```

저장소 설정:

도커 Compose 파일을 조정하여 Syncthing이 사진을 저장하는 디렉토리를 매핑하십시오. 이를 위해 PHOTOPRISM_ORIGINALS_PATH를 Syncthing에 의해 동기화된 디렉토리로 설정해야 합니다.



```yaml
volumes:
  - "/path/to/syncthing/photos:/photoprism/originals"
```

## PhotoPrism 구성

- 구성 편집:

- docker-compose.yml 파일에서 필요한 조정을 하여 설정을 맞추세요. 예를 들어, 더 많은 성능이 필요하다면 PHOTOPRISM_WORKERS와 같은 환경 변수를 수정하여 작업자 수를 늘릴 수 있습니다.
- 최적의 성능을 위해 메모리와 CPU 설정이 적절히 조정되었는지 확인하세요.



PhotoPrism을 시작해보세요:

설정이 완료되면 Docker Compose를 사용하여 PhotoPrism을 시작할 수 있어요:


docker-compose up -d


이 명령은 필요한 Docker 이미지를 가져와 PhotoPrism 서비스를 시작할 거예요.



## 사진프리즘 사용하기

웹 인터페이스에 접속하는 방법:

- 웹 브라우저를 열고 http://`Raspberry-Pi-IP`:2342로 이동하여 사진프리즘 인터페이스에 접속합니다.
- 설정 마법사를 통해 초기 설정을 안내받을 수 있으며, 관리자 계정을 설정하는 과정을 포함합니다.

사진 색인하기:



- 한 번 로그인하면 사진을 정리하기 위해 색인화 프로세스를 시작하세요. PhotoPrism은 지정된 디렉토리를 스캔하고 썸네일을 생성하며 태그를 적용하고 내장 AI를 사용하여 사진을 분류할 것입니다.
- 설정 메뉴에서 색인화 프로세스를 수동으로 시작하거나 새 사진이 추가될 때 자동으로 실행되도록 설정할 수 있습니다.

기능 살펴보기:

- 태그, 색상 또는 얼굴로 검색하는 다양한 기능을 탐색해보세요. PhotoPrism의 AI 기능을 사용하여 사진의 내용을 기반으로 사진을 검색할 수도 있어서 기억을 효과적으로 관리하고 검색할 수 있습니다.

이제 PhotoPrism을 설정하고 Syncthing과 통합했으므로 Raspberry Pi가 강력하고 개인용 사진 관리 시스템으로 변신합니다. 이 설정은 사진을 안전하게 다른 기기에 백업하는 것뿐만 아니라 사진 컬렉션을 브라우징하고 정리하기 위한 직관적인 인터페이스도 제공합니다.



# 사진 백업 시스템 최적화 팁

라즈베리 파이, 싱크싱, 포토프리즘을 통합하여 사진 백업과 관리에 대해 설정을 최적화하여 효율성과 데이터 안전성을 중요시하는 것이 중요합니다. 특히 스마트폰과 라즈베리 파이 간의 사진 동기화를 관리하는 데에 시스템이 원활하고 안전하게 작동하도록 다음 몇 가지 팁을 제공합니다.

## 1. 일방향 동기화를 위한 싱크싱 설정 구성

스마트폰에서의 데이터 손실을 방지하고 저장 공간을 효과적으로 관리하기 위해 중요한 것은 스마트폰에서 라즈베리 파이로의 일방향 동기화를 설정하는 것입니다. 이 설정은 스마트폰에서 촬영한 모든 사진이 자동으로 라즈베리 파이로 백업되지만 스마트폰에서 삭제해도 라즈베리 파이에서는 삭제되지 않는다는 것을 의미합니다. 다음은 이를 구성하는 방법입니다:



동기화 폴더 설정하기:

- 스마트폰에서 Syncthing과 공유할 폴더를 설정하고 여기에 사진을 넣어주세요. 일반적으로 카메라 폴더를 사용합니다.

폴더 유형 구성하기:

- 스마트폰에서 폴더 유형을 "송신 전용"으로 설정해주세요. 이 설정은 스마트폰에서의 변경 사항(삭제 포함)이 라즈베리 파이에 있는 백업에 영향을 미치지 않도록 합니다.
- 라즈베리 파이에서 해당 폴더를 "수신 전용"으로 설정하세요. 이렇게 하면 파이는 파일을 받기만 하고 핸드폰으로 변경 사항을 전달하지 않습니다.



가끔씩 라즈베리 파이가 일방적으로 동기화하다보니 동기화가 맞지 않을 수 있는 상황을 감지할 수 있습니다. 라즈베리 파이의 Syncthing 인터페이스에서 이러한 변경 사항을 수동으로 덮어쓰면 핸드폰의 데이터와 다시 맞출 수 있습니다.

## 2. 스마트폰 스토리지 관리하기

사진은 스마트폰의 저장 공간을 빠르게 소모할 수 있으므로 이 공간을 규칙적으로 관리하는 것이 중요합니다:



## 정기적인 정리:

- Raspberry Pi에 사진이 백업되었는지 확인한 후에는 안전하게 스마트폰에서 삭제할 수 있습니다. Google 사진의 "공간 확보"와 같이 청소를 자동화하는 앱이나 설정은 유용할 수 있지만, 백업된 사진만 삭제하도록 구성되어 있는지 확인하세요.

Syncthing 상태 모니터링:

- 스마트폰의 Syncthing 앱을 정기적으로 확인하여 연결되어 있고 기대한 대로 동기화되는지 확인하세요. 연결이 끊기면 백업이 지연되어 사진이 너무 일찍 삭제될 경우 데이터 유실이 발생할 수 있습니다. 



## 3. 데이터 중복성 보장

사진을 추가로 보호하려면 다음과 같은 중복성 조치를 고려해보세요:

외장 하드 드라이브:

- 추가 외장 하드 드라이브를 Raspberry Pi에 연결하고 Syncthing 또는 별도의 백업 시스템을 구성하여 사진을 중복으로 복제합니다. 이 중복성은 하드웨어 고장에 대비합니다.



온라인 백업 솔루션:

- 여기서 중요한 것은 데이터를 개인 장치 내에 안전하게 보관하는 데 있지만, 절대적인 안전을 위해 보조 백업으로 암호화된 클라우드 백업 서비스를 사용하는 것을 고려해보세요. 개인 정보 보호를 위해 파일을 업로드하기 전에 암호화하세요.

## 4. 자동화된 유지보수

일부 유지보수 작업을 자동화하면 수시로 수동 개입하지 않아도 시스템이 효율적으로 유지될 수 있습니다.



안녕하세요! 아래는 Markdown 형식으로 테이블 태그를 변환하는 방법입니다.


Automated Scripts:

- Write scripts to handle periodic re-indexing in PhotoPrism or database cleanups, and set them to run at times of low activity via cron jobs on the Raspberry Pi.

Monitor System Health:

- Use tools like htop or web-based monitoring solutions to keep an eye on the Raspberry Pi’s performance. Monitoring can help you spot issues before they affect your backups.
 

도움이 되었기를 바랍니다! 만약 더 도움이 필요하시면 언제든지 물어보세요.



위의 팁을 따라하면 Raspberry Pi, Syncthing 및 PhotoPrism을 사용하여 견고하고 효율적이며 안전한 사진 백업 시스템을 만들 수 있습니다. 이 설정은 신뢰할 수 있는 백업을 통해 안심감을 제공하는데 그치지 않고, 사적이고 사용자 정의 가능한 사진 관리 솔루션을 제공합니다.

# 결론

Raspberry Pi, Syncthing 및 PhotoPrism의 통합은 사진 백업 및 관리에 대한 견고한 솔루션을 제공합니다. 이 시스템은 당신의 추억들이 안전하게 보존되고, 외부 위협으로부터 데이터를 보호하는 사적 네트워크 내에서 모든 기기에서 쉽게 액세스할 수 있도록 보장합니다. 프로 사진작가이든 기술 애호가이든, 이 설정은 제3자 클라우드 서비스에 의존하지 않고 디지털 사진 관리를 직접 제어할 수 있도록 돕습니다.