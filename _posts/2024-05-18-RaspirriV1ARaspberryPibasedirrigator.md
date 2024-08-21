---
title: "RaspirriV1로 라즈베리 파이 기반의 자동 급수기 만들기"
description: ""
coverImage: "/assets/img/2024-05-18-RaspirriV1ARaspberryPibasedirrigator_0.png"
date: 2024-05-18 21:28
ogImage:
  url: /assets/img/2024-05-18-RaspirriV1ARaspberryPibasedirrigator_0.png
tag: Tech
originalTitle: "RaspirriV1: A Raspberry Pi based irrigator"
link: "https://medium.com/@mariosk/raspirriv1-a-raspberry-pi-based-irrigator-6f121abb1a88"
isUpdated: true
---

몇 년 전에 제가 작은 잔디 정원을 관리하기 위한 책임을 맡아 상업용 스크린 LCD를 갖춘 자동 급수 시스템을 사용했어요. 그러나 COVID-19 대유행으로 인한 봉쇄 기간에 LCD 화면이 고장나면서 프로그래머 메뉴에 접근할 수 없게 되었어요.

해결책을 찾기 위해 고장 난 LCD 화면을 모바일 앱으로 교체하고, 급수 시스템을 Raspberry Pi Zero로 대체하기로 결정했어요. 이 대체 방안을 추구한 동기는 시장에서 다른 상업적인 솔루션에 비해 경제적인 측면과 나의 새로운 프로젝트에 도전하는 즐거움이었어요. 게다가, 이 노력은 그리스 테살로니키에서 열린 Voxxed Days Conference에서 만난 Flutter 개발자인 Tom Makrodimos와의 협력으로 이끌어졌어요!

# 프로젝트 개요

제 주요 목표 중 하나인 기존 급수 시스템을 Raspberry Pi로 대체하기 위해 프로젝트를 `RaspirriV1`로 적절하게 명명했어요. 이는 Raspberry Irrigator Version 1을 상징하는 이름이에요.

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

서버 소프트웨어는 Python을 기반으로 하며, RaspirriV1 모바일 앱은 Flutter를 기반으로 합니다.

# 개발 여정

모바일 앱 및 서버 측 구성 요소의 아키텍처 설계와 구현을 시작하기 전에, 우리는 잠재적인 하드웨어적 과제에 대해 논의하였습니다. 그 시점에서, 라즈베리 파이가 24볼트 전원 공급이 필요한 전기 밸브를 제어할 수 있는 내재된 능력이 부족하다는 것을 알았습니다. 이 장애를 인식한 후, 전자 기술에 대한 전문 지식을 보유한 두 명의 친구인 Lambros Anastasopoulos와 Dimitris Iliopoulos에게 연락했습니다. 그들은 즉시 이 과제를 확인하고 해결책을 종이에 스케치하여 Proof-of-Concept를 스티로폼 보드에 만들었습니다:

![사진](/assets/img/2024-05-18-RaspirriV1ARaspberryPibasedirrigator_0.png)

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

전자 연결의 정확성을 확인하고 LED의 켜고 끄기 기능을 검증하기 위해 간단한 Python 구현을 빠르게 시작했습니다. Concept 증명은 성공적인 기능을 보여줌으로써 우리가 다음 단계로 진행할 확신을 더했습니다:

구성품 비용은 선택한 특정 모델에 따라 다릅니다. 그러나 일반적인 추정 금액은 다음과 같습니다:

- Raspberry Pi (Zero-4): $35–$55
- Reley: $5–$10
- 24V DC 전원 공급기: $10
- LED: $1–$2
- 전류 제한 저항기: $0.50–$1
- Step-down 변환기: $5

총액: $57–$83$

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

위에 나와 있는 회로도는 라즈베리 파이를 사용하여 릴레이를 제어하는 간단한 회로를 보여줍니다. 릴레이는 LED나 모터와 같은 고출력 부하를 켜고 끄는 데 사용됩니다. 이 회로는 24V DC 전원 공급기로 구동됩니다.

라즈베리 파이는 디지털 출력 핀을 사용하여 릴레이에 연결됩니다. 라즈베리 파이가 출력 핀을 HIGH로 설정하면 릴레이 코일이 활성화되고 릴레이 접점이 닫힙니다. 이로써 24V 전원 공급기에서 하중으로 전류가 흐를 수 있습니다. 라즈베리 파이가 출력 핀을 LOW로 설정하면 릴레이 코일이 비활성화되고 릴레이 접점이 열립니다. 이로써 하중으로 전류가 흐르지 않게 됩니다.

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

회로 내 LED는 부하가 켜졌을 때 표시하는 데 사용됩니다. LED는 24V 전원 공급원을 통해 전류 제한 저항을 통해 연결됩니다. 전류 제한 저항은 LED가 너무 많은 전류를 빨아들이고 소멸되는 것을 방지하기 위해 필요합니다.

회로 내 Step-down 컨버터는 24V DC 전원 공급 전압을 5V DC로 변환하는 데 사용됩니다. 5V DC 전압은 Raspberry Pi를 구동하는 데 사용됩니다.

# 소프트웨어 아키텍처

![Image](/assets/img/2024-05-18-RaspirriV1ARaspberryPibasedirrigator_2.png)

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

위의 UML 다이어그램에 따라 사용자가 모바일 앱을 라즈베리 파이 서버와 블루투스 통신을 통해 페어링하고 인터넷을 통해 제어하는 단계는 다음과 같습니다:

단계 1: 사용자는 모바일 앱을 시작하고 설정-`연결 초기화'를 클릭하여 모바일 앱을 서버와 페어링합니다.

<img src="/assets/img/2024-05-18-RaspirriV1ARaspberryPibasedirrigator_3.png"/>

단계 2: 사용자는 계속을 클릭하고 RaspirriV1 서버에서 사용할 사용 가능한 WiFi 네트워크 중 하나를 선택합니다.

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

![이미지](/assets/img/2024-05-18-RaspirriV1ARaspberryPibasedirrigator_4.png)

### 단계-3: 준비 완료!!! 이제 앱을 사용하여 인터넷을 통해 관정을 제어하고 일정을 설정하며 시스템 상태를 모니터링할 수 있습니다. 앱을 처음 실행할 때는 밸브가 활성화되어 있지 않습니다. 라즈베리 파이에서 밸브를 활성화하고 해당 포트를 앱에서 선택할 수 있습니다.

![이미지](/assets/img/2024-05-18-RaspirriV1ARaspberryPibasedirrigator_5.png)

### 단계-4: 그런 다음 토글 버튼으로 밸브를 켜거나 끄거나 각 밸브에 대한 일정 프로그램을 만들 수 있습니다.

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

![Program creation](/assets/img/2024-05-18-RaspirriV1ARaspberryPibasedirrigator_6.png)

STEP-5: To create a program, select days, start time, and duration. You can change the valve name if desired and then click Save. A new schedule will be created and saved in the raspirri-server storage.

![Schedule creation](/assets/img/2024-05-18-RaspirriV1ARaspberryPibasedirrigator_7.png)

# Raspberry Pi Server

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

라스피리V1을 위한 서버 소프트웨어는 세 가지 주요 모듈로 구성되어 있습니다:

이 구성 요소는 클라우드 MQTT 브로커와의 통신을 설정하여 시스템 설정의 온라인 구성 및 유지 관리를 용이하게 합니다.

Bluetooth 특성을 등록하기 위해 설계된 이 모듈은 휴대 기기를 라스피리V1과 초기 페어링할 수 있게 합니다. 이 페어링 프로세스는 모바일 앱을 IoT 장치와 연결하기 위해 필요한 필수 최소 구성을 보장합니다.

MQTT 모듈의 상태를 모니터링하고 필요한 경우 다시 시작하는 이 모듈이 구현되었습니다.

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

모든 모듈은 Raspbian OS에서 서로 다른 systemd 서비스로 시작됩니다. 사용된 Python 라이브러리는 다음과 같습니다:

```js
APScheduler==3.10.4

# Linting/Tooling
black>=23.3.0
build>=0.10.0
bump2version==1.0.1
codecov>=2.1.13
configparser==6.0.0
coverage==7.3.2
Deprecated==1.2.13
distro==1.7.0

# Raspirri
fastapi[all]==0.109.1
feedparser==6.0.11
future==0.18.3
getmac==0.8.3
invoke==2.2.0
isort>=5.12.0
lockfile==0.12.2
loguru==0.7.2

# Documentation
mkdocs>=1.4.3
mkdocs-material>=9.1.14
mkdocstrings>=0.21.2
mkdocstrings[python]>=0.9.0
mypy>=1.3.0
paho-mqtt==1.6.1
pre-commit>=3.3.2
Pygments>=2.15.1
pyright>=1.1.309

# Testing
pytest>=7.4.3
pytest-asyncio==0.21.1
pytest-benchmark>=4.0.0
pytest-cov>=4.1.0
pytest-mock==3.12.0
pytest-ordering==0.6
requests==2.31.0
ruff>=0.0.270

# Linting/Tooling
setuptools>=67.8.0
subprocess.run==0.0.8
uvicorn==0.27.0
```

# Flutter 모바일 앱

RaspirriV1 모바일 앱은 RaspirriV1 서버 소프트웨어의 자동 급수 시스템 컨트롤러입니다. Flutter 프레임워크와 Dart 프로그래밍 언어로 작성되었으며 Android 5 (롤리팝, API 21) 이후 버전의 모바일폰과 태블릿을 지원합니다.

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

핵심 구성 요소

Flutter로 제작된 Android 앱은 시각적으로 직관적인 인터페이스를 제공합니다. 크로스 플랫폼 기능을 통해 일관된 경험을 제공하며 Flutter의 핫 리로드 기능을 추가하여 개발 및 테스트를 쉽게 할 수 있습니다.

앱은 상태를 원활하고 효율적으로 관리하기 위해 Riverpod 패키지를 활용합니다.

Riverpod는 반응형 캐싱 및 데이터 바인딩 프레임워크로, 애플리케이션의 상태를 쉽게 구성, 공유 및 업데이트할 수 있어 원활하고 유지보수 가능한 개발 경험을 보장합니다.

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

우리 시스템의 핵심은 MQTT 프로토콜에 있습니다. 이 프로토콜을 통해 안드로이드 앱과 라즈베리 파이 서버 간에 실시간 통신이 가능해집니다. Mqtt_client 패키지는 메시지를 신속하고 효율적으로 교환하여 관개 시스템을 빠르고 반응적으로 제어할 수 있도록 도와줍니다.

초기 설정 과정을 간단하게 하기 위해 초기화 단계에서 Bluetooth 통신을 위해 flutter_blue_plus 패키지를 사용합니다. 이를 통해 안드로이드 앱이 중요한 Wi-Fi 자격 증명을 신속하게 라즈베리 파이 서버에 전송하여 인터넷에 안전하고 안정적으로 연결할 수 있게 됩니다.

기기 설정에 따라 자동으로 영어 및 그리스어를 지원합니다. 아래에서 설명된대로 언어를 추가하는 것이 용이합니다.

사용한 Flutter 패키지는 다음과 같습니다:

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
environment:
  sdk: ">=3.1.0 <4.0.0"

dependencies:
  collection: ^1.18.0
  duration_picker: ^1.1.1
  flutter:
    sdk: flutter
  flutter_blue_plus: ^1.28.10

  flutter_localizations:
    sdk: flutter

  flutter_riverpod: ^2.4.5
  google_fonts: ^6.1.0
  http: ^1.1.2
  intl: ^0.18.1
  mockingjay: ^0.5.0
  mocktail: ^1.0.3
  mqtt_client: ^10.0.0
  package_info_plus: ^5.0.1
  rename_app: ^1.3.1
  shared_preferences: ^2.2.2
  typed_data: ^1.3.2
  url_launcher: ^6.2.3

dev_dependencies:
  flutter_test:
    sdk: flutter
  integration_test:
    sdk: flutter

  flutter_lints: ^2.0.0
  flutter_native_splash: ^2.3.9
  flutter_launcher_icons: ^0.13.1
```

## 지속적 통합

현대 소프트웨어 개발에서 품질 표준이 각 빌드마다 일정하게 유지되도록 보장하려면 현재의 DevOps 도구를 활용해야 한다는 것은 부인할 수 없습니다. 이에 따라, 저희는 서버 및 모바일 앱 프로젝트 모두 GitHub Actions를 활용해 GitHub에서 구축되었습니다. GitHub Actions는 빌드, 테스트 및 릴리스 프로세스를 자동화할 수 있도록 하는 지속적 통합 및 지속적 전달(CI/CD) 플랫폼으로, 우리에게 이와 같은 기능을 제공했습니다.

따라서, 우리의 저장소에 대한 각 pull request에 대해, 우리는 사전 커밋 포매팅 도구, 린터, 단위 테스트를 실행합니다. 이러한 단계가 모두 성공적으로 통과되면 해당 pull request를 병합할 수 있습니다. 마찬가지로, 저장소 소유자가 새로운 Git 태그를 생성하여 새 릴리스를 작성하고자 할 때, 모든 CI 절차가 시작됩니다. 모든 검사가 통과되면:

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

- 새 릴리스가 생성되어 릴리스 섹션에 업로드되었습니다.
- CHANGELOG.md 파일이 자동으로 업데이트되어 이전 릴리스 이후의 최신 커밋이 반영되었습니다.

# 데모

# 향후 계획

각 프로젝트의 이슈 섹션에는 구현을 기다리고 있는 여러 잠재적인 향상 사항이 기술되어 있습니다. 이 프로젝트의 상용화는 산업용 케이스를 개발하고 유료 클라우드 기반 MQTT 브로커를 활용함으로써 원활하게 달성할 수 있습니다. 다른 모든 구성 요소는 단일 밸브에 주력하여 우리의 지역 정원에서 여러 날 동안 엄격한 테스트를 거쳤습니다.

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

# 결론

이 프로젝트의 미래를 함께 만들어 나가는 것에 여러분을 초대합니다. 여러분의 협력, 피드백, 그리고 통찰력은 혁신을 이끌어가는 데 귀중한 자산입니다. 열렬한 지지자, 개발자, 또는 우리의 노력에 흥미를 느끼는 분이던, 언제든지 저희와 소통할 것을 장려합니다. 함께 새로운 가능성을 탐색하고, 기존 기능을 개선하며, 의미 있는 영향을 미칠 수 있습니다. 만약 이 프로젝트가 여러분을 영감을 주는 사례라면, 주변 사람들과 공유를 망설이지 마세요. 함께 놀라운 것을 만들어봅시다.

# 참고 자료

- 서버 Github 저장소
- Flutter Github 저장소
- 라즈베리 파이와 MQTT 가이드
- GPIO 핀 연결 가이드

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

**사용한 도구 및 자원:** VSCode, Raspberry Pi, CodiumAI

아래는 연락처 정보입니다! 이 프로젝트에 관한 질문이 있으시면 언제든지 이메일 보내주세요.

마리오스 카라기아나폴루스 `mariosk@gmail.com` 톰 마크로디모스 `tom.makrodi@gmail.com`
