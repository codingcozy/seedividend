---
title: "흑자 블랙 바스타의 코발트 스트라이크를 추적하기"
description: ""
coverImage: "/assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_0.png"
date: 2024-05-15 16:44
ogImage: 
  url: /assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_0.png
tag: Tech
originalTitle: "Hunting Black Basta’s Cobalt Strike"
link: "https://medium.com/@Intel_Ops/hunting-black-bastas-cobalt-strike-96a81a6ea781"
isUpdated: true
---




<img src="/assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_0.png" />

지난 주 FBI와 CISA가 Black Basta 랜섬웨어 그룹을 위한 #StopRansomware 경보를 발표했습니다.2024년 중에 이 그룹은 LockBit와 Play 다음으로 총 랜섬웨어 피해자가 세 번째로 많은 것으로 나타났습니다. 특히, 그 그룹이 Cobalt Strike를 사용한다는 점이 강조되었습니다(표 10 - "알려진 Black Basta Cobalt Strike 서버 도메인" 참조).

Intel-Ops는 Black Basta가 배포한 Cobalt Strike 서버를 포함하여 야생에서 Cobalt Strike 서버를 적극적으로 추적하고 있습니다. 이 게시물에서는 FBI/CISA 경보에 포함된 C2 서버 및 해당 경보에 미포함된 C2 서버 또는 악의적이거나 Black Basta와 관련된 서버로 공개적으로 추적되지 않은 서버에 대한 분석 결과 중 일부를 강조하겠습니다.



블랙 바스타의 코발트 스트라이크 그래프:

발리딘의 "Bulk Analyzer" 도구를 사용하여 공지사항의 도메인을 빠르게 활성 IP 주소로 해결하고 시간에 따른 호스팅 패턴을 이해하며, 말테고 그래프에 대한 상관 관계를 생성할 수 있습니다:

![그래프 이미지](/assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_1.png)

# 결과



- 블랙 바스타 인프라는 명확한 클러스터로 그룹화될 수 있으며, 이 중 일부를 아래에서 강조하겠습니다.
- 블랙 바스타 인프라에서 관찰된 주요 워터마크는 1357776117 및 1158277545입니다.
- 코발트 스트라이크 서버의 대부분은 Vult Hosting LLC (AS-CHOOPA), JW Lucasweg 35, Digital Ocean 및 Servinga에서 호스팅됩니다.

# 클러스터 1

블랙 바스타가 운영하는 대다수의 코발트 스트라이크 서버는 DNS 비컨을 활용합니다: https://hstechdocs.helpsystems.com/manuals/cobaltstrike/current/userguide/content/topics/listener-infrastructue_beacon-dns.htm. 우리의 분석에 따르면, 공지서에서의 IOC는 거의 전적으로 Vultr, Lucasweg 및 Digital Ocean에서 호스팅됩니다.

우리의 조사에 따르면, 적어도 6개의 추가 DNS 코발트 스트라이크 비컨이 이러한 제공업체에서 호스팅되었습니다. Intel-Ops는 다른 제공업체에서도 유사한 C2를 식별했습니다. "thenewbees[.]org"와 같은 새로 식별된 도메인은 공지서에 기재된 다른 DNS 비컨들의 네이밍 컨벤션과 일치합니다.



인텔-옵스 클러스터 1의 예시 DNS 비콘:

![Example DNS Beacon](/assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_2.png)

## 클러스터 2

도메인 "usaglobalnews[.]org"은 Cobalt Strike 비콘의 일부인 것으로 보입니다. 인텔-옵스 클러스터 2에서는 두 개의 도메인이 이전에 이미 Pikabot을 포함한 Black Basta 사건과 관련하여 Trend Micro에 의해 2023년 12월에 보고되었습니다. "ruggioil[.]com"과 "bluenetworking[.]net"의 도메인은 모두 해당 사건과 연결되었습니다.



https://www.trendmicro.com/content/dam/trendmicro/global/ko/research/24/a/a-look-into-pikabot-spam-wave-campaign/ioc-pikabot-spam-campaign.txt

Intel-Ops Cluster 2에서의 Cobalt Strike 서버 예시:

![Cobalt Strike 3](/assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_3.png)

![Cobalt Strike 4](/assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_4.png)



# 클러스터 3

인텔-옵스 클러스터 3 내에서는 3개의 자문 도메인이 관찰되었으며, 이 중 일부는 중국 호스팅 업체 및 중국 DNS 레코드의 분포가 더 큰 코발트 스트라이크 서버와 클러스터링되어 있습니다. 추가로, "dfir-delight"의 2024년 4월 보고서에서 적어도 3개의 추가 C2 서버와 자문 도메인 중 하나가 공개적으로 블랙 바스타 활동에 속한다고 확인되었습니다: https://dfir-delight.de/p/black-basta-iocs/

인텔-옵스 클러스터 3 코발트 스트라이크 C2 서버 예시:

![HuntingBlackBastasCobaltStrike_5](/assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_5.png)



# 클러스터 4

Intel-Ops는 워터마크가 있는 여러 개의 Cobalt Strike 비콘을 식별했습니다: 1357776117. 이 워터마크가 있는 IP 주소의 비교적 작은 클러스터가 있습니다: 우리는 Hunt.io를 사용하여 지난 30일 동안 이 워터마크가 있는 IP의 수를 식별할 수 있습니다. 특히, 해결 도메인 중 일부가 공고서의 도메인 이름 규약과 일치하는 것을 확인했습니다:

![이미지](/assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_6.png)

이 클러스터 내에서, 최근의 Black Basta 사건에 공개적으로 속한 다른 IP 주소가 있습니다. 또한, 워터마크만을 분석했을 때 호스팅이 Black Basta 클러스터의 다른 패턴과 거의 일치하지 않았습니다, 예를 들어 DNS 비콘이요.



예시 인텔-옵스 클러스터 4 내의 Cobalt Strike C2 서버:

![Alt text](/assets/img/2024-05-15-HuntingBlackBastasCobaltStrike_7.png)

# 결론

블랙 바스터 공고로부터 추론할 수 있는 추가적인 클러스터/상관 관계가 있습니다. 이 분석은 보고서에 나와 있는 알려진 지표만 다루고 있습니다. Cobalt Strike를 이용하는 그룹에 대한 보호를 강화하고 추가 정보를 얻으려면:



**Hunting Adversary Infrastructure Course**

우리의 "Hunting Adversary Infrastructure" 과정에서 가르치는 기술을 활용하면 보안 분석가들이 모두 레벨에서 활동을 클러스터링하고 소속을 판단하는 등 보고서를 더욱 풍부하게 할 수 있습니다. 이러한 모든 지표들은 Intel-Ops에서 적극 추적되고 곧 C2 위협 피드를 통해 제공될 예정입니다.

Cobalt Strike와 Black Basta와 같은 그룹과 같은 프레임워크를 추적하는 방법을 배우고 싶다면, 저희 과정에 등록해보시기 바랍니다. 여기에서 등록하면 학생들은 배우는 데 도움을 줄 추가적인 쿼리 및 API 크레딧이 포함된 Validin 플랫폼을 위한 특별한 Intel-Ops 계정을 획들할 수 있습니다.

C2 Feed



저희 C2 피드에 관한 정보가 필요하시면 LinkedIn, Twitter 또는 이메일(contact@intel-ops.io)로 연락해주세요.