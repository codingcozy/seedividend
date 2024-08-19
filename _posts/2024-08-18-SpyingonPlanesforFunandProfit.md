---
title: "재미와 이익을 위해 비행기를 감시하기 신기한 비행기 추적 방법"
description: ""
coverImage: "/assets/img/2024-08-18-SpyingonPlanesforFunandProfit_0.png"
date: 2024-08-18 11:38
ogImage: 
  url: /assets/img/2024-08-18-SpyingonPlanesforFunandProfit_0.png
tag: Tech
originalTitle: "Spying on Planes for Fun and Profit"
link: "https://medium.com/codex/spying-on-planes-for-fun-and-profit-789f4ef7d799"
isUpdated: true
updatedAt: 1724032818451
---


싸고 저렴한 SDR(소프트웨어 정의 라디오) 동글과 라즈베리 파이를 이용해서 ADS-B 데이터를 수집하는 방법을 알아보았어요.

![비행기 추적 및 즐거움을 위한 스파이 이미지](/assets/img/2024-08-18-SpyingonPlanesforFunandProfit_0.png)

# 여기서 무엇을 하는 건가요?

최근 아마존에서 싸고 저렴한 SDR 동글을 구입했어요. 온라인에서 항공 추적에 대한 토론을 살펴보면서 이 제품을 알게 되었고, 항공 산업에서 사이버 보안 전문가로 일하고 있는 저에게 항공기 시스템에 대한 큰 관심이 있어요. 특히 오픈 소스와 프로프라이어터리 기술 간의 상호작용을 이해하는 데 흥미를 느끼고 있어요. 업무 중 ACARS 데이터를 자주 다루는데, 이것이 제 궁금증을 자극하여 radarplane.com과 adsbexchange.com 같은 온라인 자료들을 더 탐색해보게 되었어요. flightradar24.com의 내용이 매력적이라고 생각했지만, 세션 타임아웃 문제로 사용에 어려움을 겪었어요. 더 나은 설정을 위해 역방향 프록시를 저렴한 "미니 PC"(Celeron 프로세서와 eMMC 저장 장치 탑재)로 옮겼어요. 베니라 데비안, Nginx 및 Crowdsec를 실행하는 이 구성은 매우 효율적이었어요. 남는 자원을 활용하기 위해 Raspberry Pi를 다시 활용해 플래싱하고 Docker를 설치한 후 Audiobookshelf를 배포했는데, 성능이 훌륭했고 개인 안드로이드 폰과도 원활하게 연결되었어요. 특히, 이 설정은 라즈베리 파이가 이전에 사용했던 자원보다 훨씬 적게 소비했고 추가 기능을 위한 충분한 공간이 남았어요. 이 성공에 자극받아, Flightradar24.com에서 제공하는 문서를 따라 새로운 ADB-S(자율형 의존적 추적-브로드캐스트) SDR 동글을 Pi 설정에 통합하여 사무실 내에서 추적 스테이션을 구축했어요.

<div class="content-ad"></div>

![2024-08-18-SpyingonPlanesforFunandProfit_1.png](/assets/img/2024-08-18-SpyingonPlanesforFunandProfit_1.png)

# 지금 HAM이 되셨나요?

아니요. 저는 야외 라디오 열렬가(Ham)들을 알게 된 즐거움은 있지만, 그들 중 하나라고 주장하지는 않습니다. Hams는 라디오 통신을 진지하게 다루며, 종종 고품질 마이크를 장착한 데스크톱 라디오를 보유하고 견고한 야외 안테나에 연결합니다. 더 나아가 안테나 막대와 접지 설비에 투자하기도 합니다. 또한 이동 시 곧바로 통신을 할 수 있게 차량에 설치된 휴대용 라디오를 소유하기도 합니다.

한편, 제 설정은 라즈베리 파이에 USB 동글을 연결하고 더 나은 안테나로 수신을 향상시키는 것으로 간단하게 되어 있습니다. 저는 방송 활동에 종사하지 않으며, 이 설정 이외에 더 진보된 SDR 하나와 아마존 위시 리스트에 있는 Beofung 라디오만이 라디오 재고로 있습니다. 이런 노력들은 본질적으로 집에서 실험하는 영역에 속합니다. 여기서는 사실상 비트를 다루고 있지만, 비행기에서 전송된 비트를 해독하는 것입니다. 저는 항상 이런 비정상적인 프로젝트에 종사하며, 이러한 독특한 프로젝트에 참여하는 것은 저의 세계에서 흔한 일입니다. 저는 이런 식으로 이상한 것들을 자주 합니다.

<div class="content-ad"></div>

# 이것으로 무엇을 얻을까요?

Flightradar24.com에 ADS-B 데이터를 제공하면 연간 500달러 가치의 무료 비즈니스 라이센스를 획들할 수 있습니다. 본질적으로 ADS-B 지상 국부국, 비록 가장 기본적인 형태로 만들었습니다. 라즈베리 파이에 꽂은 SDR 동글을 사용하여 비행기가 식별, 위치, 고도, 속도 및 기타 중요 정보를 송신하는 비행기간 의존형 감시 방송 (ADS-B) 신호를 해독할 수 있습니다. ADS-B 기능이있는 지상 수신기는 이러한 신호를 수신 및 해독할 수 있습니다.

FlightRadar24와 같은 서비스는 정확한 비행 추적을 위해 ADS-B 데이터에 액세스해야합니다. 다행히 주변에 주요 공항 허브와 여러 대형 지역 공항이 있습니다. 처음에는 기본 안테나로 매일 약 650대의 비행기를 캡처하고 매일 2~35대의 비행기의 위치를 정확하게 파악했습니다. 설정을 향상시키기 위해 1090 MHz에 특별히 튜닝 된 새 안테나에 7달러만을 투자했습니다.

키트 안테나는 처음에 천장 타일에 부착되어 있었지만, 새로운 안테나를 천장 위의 줄기에 파란색 테이프 한 조각 위에 세밀하게 잠재워 새로운 안테나를 설치하여 청결한 설치를 선택했습니다. 케이블은 이더넷 연결 옆으로 세심하게 배치하여 서버에 연결되어 있습니다. 이 업그레이드로 범위의 뚜렷한 향상이 있었으며, 나의 범위가 10에서 25해리로 확대되었습니다. 결과적으로 더 많은 사설 항공기와 헬기의 신호를 수신하기 시작했습니다.

<div class="content-ad"></div>

간단히 키트 안테나를 2층 사무실 창가에 두는 것으로도 만족할 수 있는 경우가 있겠지만, 저는 최상의 성능을 위해 숨길 수 있고 고정된 설치를 선호했습니다. 성능 차이가 분명합니다. 7달러를 투자하고 Rp-SMA 여성-Mcx 남성 어댑터만 있으면 됐어요.

![이미지1](/assets/img/2024-08-18-SpyingonPlanesforFunandProfit_2.png)

![이미지2](/assets/img/2024-08-18-SpyingonPlanesforFunandProfit_3.png)

# 이 작업을 어떻게 하나요?

<div class="content-ad"></div>

FLightradar24.com을 위한 SDR 동글과 피드를 설정하는 것은 정말 쉽습니다.

SDR 동글을 삽입하고 안테나를 연결하세요. 안테나를 좋은 곳에 놓으세요. 안테나를 배치하는 방법에 대한 자세한 문서가 있습니다. 저는 내 안테나를 천장에 꽂았는데, 당신은 당신의 책상에 놓을 수 있습니다. 우리는 로켓 과학자가 아니에요, 이건 라즈베리 파이와 리눅스야. 피드를 받게 될 거에요, 하지만 일부 데이터는 충분히 좋지 않을 수 있어요.

라디오가 켜져 있는지 확인하려면 lsusb를 입력하세요. Realtek RTL2838 DVB-T가 있어야 해요, DVB-T는 중요해요.

![Spying on Planes for Fun and Profit](/assets/img/2024-08-18-SpyingonPlanesforFunandProfit_4.png)

<div class="content-ad"></div>

공식 문서는 그들의 웹사이트에서 확인하실 수 있어요.

시작하기 전에 가져야 할 것은, frflightradar24.com 웹사이트 계정이에요. 이메일 주소는 fr24feed 소프트웨어를 설정할 때 사용할 거예요. 데이터가 이메일과 키와 연결되면, 당신의 계정은 비즈니스 계정으로 업그레이드될 거에요.

다음 명령어를 실행해 주세요.

sudo apt update

<div class="content-ad"></div>

sudo apt upgrade

아래 스크립트를 실행하여 시도해 볼 수 있어요:

```shell
wget -qO- https://fr24.com/install.sh | sudo bash -s
```

이메일과 공유 키를 입력해야 합니다. 또한 수신기 타입을 선택해야 하는데, 옵션 1 또는 dvbt여야 합니다. dvbt를 선택하세요, 그게 동글의 타입이에요.

<div class="content-ad"></div>

어떤 문제가 있으면 설정 파일을 편집할 수 있어요:

sudo nano /etc/fr24feed.ini

또한, 포트 8754에서 사용 가능한 일부 설정이 있는 상태 웹 페이지가 있어요. 따라서 http://192.168.0.10:8754 또는 RFC1918 네트워크 주소를 사용할 수 있어요. ufw가 실행 중이라면 다른 시스템에서 상태 페이지에 접속할 수 있도록 “sudo ufw allow 8754”를 꼭 실행해 주세요.

<img src="/assets/img/2024-08-18-SpyingonPlanesforFunandProfit_5.png" />

<div class="content-ad"></div>

FlightRadar24.com에서 성공적인 피드를 가지고 있다면, 다른 ADB-S 사이트로 피드를 시작하는 것도 좋은 아이디어일 겁니다. 그들은 종종 회원들에게 프리미엄 혜택을 제공합니다. adsbexchange.com은 큰 항공 추적 사이트이며, 그들의 항공 추적기는 매우 정교하고 다양한 기능이 있습니다. 피더들은 프리미엄 액세스를 받습니다. 그들의 설정은 문서에서 설명한대로 매우 쉽습니다.

인스톨 스크립트를 실행하세요:


curl -L -o /tmp/axfeed.sh https://www.adsbexchange.com/feed.sh

sudo bash /tmp/axfeed.sh


<div class="content-ad"></div>

스탯 클라이언트를 설치해주세요:

```bash
curl -L -o /tmp/axstats.sh https://www.adsbexchange.com/stats.sh

sudo bash /tmp/axstats.sh
```

아래 링크를 통해 여러분이 피드를 제공하고 있는지 확인해보세요: [https://www.adsbexchange.com/myip/](https://www.adsbexchange.com/myip/)

<div class="content-ad"></div>

성공적으로 수집하고 프리미엄 액세스를 표시하여 트래킹 맵과 통계에 액세스할 수 있어야 합니다:

![이미지](/assets/img/2024-08-18-SpyingonPlanesforFunandProfit_6.png)

## 이게 가치가 있을까요?

네, 절대 가치가 있어요. 저는 Flightradar24.com으로 ADS-B 데이터 피드를 공급하고 잠재적으로 다른 트래킹 플랫폼에 액세스함으로써 Flightradar24로부터 특권을 받을 뿐만 아니라 비행 추적의 네트워크를 확장하는 데 기여합니다. 이 프로젝트는 리눅스와 비행에 관심을 가진 저의 이중 관심을 충족시킬뿐만 아니라 실용적인 목적도 제공합니다. 라즈베리 파이 설정을 활용하여 ADS-B 데이터를 제공함으로써 비행 추적 서비스의 정확성과 범위를 적극적으로 향상시키고 있습니다. 비행기 애호가, 산업 전문가 및 일반 대중에게 혜택을 주는 서비스를 발전시킴으로써 이 프로젝트에 참여함으로써 라즈베리 파이를 뜯어보는 열정이 되살아남게 되었고, 몇 년간 플랫폼에서 가장 즐거운 경험 중 하나가 되었습니다.