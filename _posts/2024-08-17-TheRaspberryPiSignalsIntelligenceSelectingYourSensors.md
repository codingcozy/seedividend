---
title: "라즈베리 파이와 신호 정보 센서 선택 방법"
description: ""
coverImage: "/assets/img/2024-08-17-TheRaspberryPiSignalsIntelligenceSelectingYourSensors_0.png"
date: 2024-08-17 01:18
ogImage: 
  url: /assets/img/2024-08-17-TheRaspberryPiSignalsIntelligenceSelectingYourSensors_0.png
tag: Tech
originalTitle: "The Raspberry Pi , Signals Intelligence Selecting Your Sensors"
link: "https://medium.com/radio-hackers/the-raspberry-pi-signals-intelligence-selecting-your-sensors-1e340c39abcb"
isUpdated: false
---


![image](/assets/img/2024-08-17-TheRaspberryPiSignalsIntelligenceSelectingYourSensors_0.png)

SIGINT 수집을 위한 센서 패키지 선택 방법.

만약 중간 회원이 아니라면, substack를 통해 무료로 읽을 수 있습니다.

이전 글에서는 라즈베리파이에서 Dragon OS를 실행하기 위해 SD 카드를 구성하는 방법을 살펴보았습니다. 시그널 인텔리전스에 최적화된 이 배포판은 라디오 스펙트럼 전반에 걸쳐 신호를 찾고 기록하고 분석하는 데 도움이 되는 소프트웨어 패키지로 가득합니다.

<div class="content-ad"></div>

최적화를 위해선 일반적으로 소프트웨어 패키지의 잠재력을 최대로 발휘하기 위해 몇 가지 추가 센서를 추가해야 할 수 있어요. 주로 RTL-SDR과 monitor mode를 지원하는 Wi-Fi 카드가 필요합니다. 대부분의 사람들은 블루투스 장치도 다루고 싶어할 것이지만, 검출 목적으로는 라즈베리의 내장 블루투스 패키지를 사용할 수 있습니다. 그럼 시작해봐요!

![이미지](/assets/img/2024-08-17-TheRaspberryPiSignalsIntelligenceSelectingYourSensors_1.png)

# Dragon, APT 및 터미널

Ubuntu를 기반으로 하는 Dragon은 APT 패키지 매니저를 사용하므로 사용자들이 쉽게 익힐 수 있을 거예요. 메뉴 시스템은 두 개의 하위 메뉴, Ham Tools 및 Other로 간단히 구성되어 있어요. 이게 꽤 간단하게 들리겠지만, 몇 가지 패키지를 탐색해보면 이 배포판에는 매우 유용한 도구들이 가득한 것을 알게 될 거예요.

<div class="content-ad"></div>

GUI 기반 도구가 많이 있어서, 모든 것을 터미널을 사용할 필요는 없을 거예요. 그래도 Wi-Fi 카드에 따라서는 모니터 모드로 전환하기 위해 터미널을 사용해야 할 수도 있어요. 그러나 사용하는 카드 종류에 따라 달라지기 때문에, 이에 대한 자세한 단계는 온라인 튜토리얼을 찾아서 도움을 받을 수 있을 거예요.

그렇지만 터미널에 익숙하지 않다면, 올바르게 작동하기 위해 추가 드라이버가 필요하지 않은 Wi-Fi 카드를 사용하는 게 더 편할 수 있어요. WN-722NV2와 같은 카드는 저렴하고 쉽게 구할 수 있는 선택지이지만, 대부분의 시스템에서는 초보자 친화적이지 않을 수 있어요. Alfa Wireless의 옵션은 추가 구성 문제를 피하는 데 좋은 방법일 수 있어요.

![이미지](/assets/img/2024-08-17-TheRaspberryPiSignalsIntelligenceSelectingYourSensors_2.png)

# The RTL-SDR

<div class="content-ad"></div>

용어를 바꿔 말하자면, Dragon이 Kali Linux나 Parrot OS와 같은 펜 테스팅 동료들과 구분되는 한 가지는 소프트웨어 정의 라디오 동글을 통해 제공하는 다양한 기능이라고 할 수 있어요. 이전에 이 중 하나를 사용해본 적이 없거나 라디오 세계에 입문한 신입자라면, 이 작은 USB 기반 동글은 라디오 스펙트럼의 일부를 신속하고 쉽게 해제하는 저렴하고 합리적인 방법입니다.

R820T TV 튜너를 기반으로하여 몇 년간 더 발전하여 더 안정적이고 정교해졌어요. 더 비싼 SDR 시스템에서 찾을 수 있는 기능이 부족하지만, 많은 사람들에게 디지털 신호의 완전히 새로운 세계로의 입구가 됩니다.

그러나 RTL을 선택할 때 사양이 크게 달라질 수 있으며 종종 가격대와도 많이 다릅니다! SDR을 살펴볼 때, 전자파를 거부하는 금속 하우징, 외부 안테나 커넥터(대역폭의 전체 범위를 탐색) 및 주파수 안정성을 제공하는 TXCO가 있는 제품을 찾는 것이 좋습니다.

RTL을 건너뛰고 더 많은 기능이 있는 장치로 넘어간 경우, 사용 중인 시스템에 따라 Dragon OS와 여전히 사용할 수 있을 것입니다. 그러나 SDRPlay와 같은 제품은 효과적으로 실행하려면 그들의 소프트웨어 패키지를 사용해야 할 수도 있습니다.

<div class="content-ad"></div>

![TheRaspberryPiSignalsIntelligenceSelectingYourSensors](/assets/img/2024-08-17-TheRaspberryPiSignalsIntelligenceSelectingYourSensors_3.png)

# 한계

많은 저렴한 시스템들처럼, RTL도 충분히 잘 작동하며 디자인상 내재된 몇 가지 제한 사항 안에서 작업한다면 완벽하게 작동합니다. 수백 달러가 더 드는 수신기에서 볼 수 있는 감수성과 안정성을 기대하고 있다면 실망할 수도 있겠네요. 하지만 시작하기에 저렴한 방법과 온라인에서 제공되는 다양한 리소스를 원한다면, 이 제품이 여러분을 위한 제품입니다.

하지만 이러한 장치들이 직면할 가장 큰 문제는 종종 신호 거부 및 안정성과 관련된 문제입니다. 대도시 지역에 있다면 FM 라디오 방송국이나 휴대전화 기지국과 같은 강력한 신호에 수신기가 압도당할 수 있다는 것을 알 수 있을 겁니다.

<div class="content-ad"></div>

또한 어디에 있든지 단위가 약간 주파수를 벗어나 있다는 것을 알 수 있을 겁니다. TXCO가 이를 보정하는 데 도움을 줄 수 있지만, 알려진 강한 신호로부터 오프셋을 계산하는 Kalibrate와 같은 도구를 사용하는 것이 가장 쉬운 방법입니다.

# 커뮤니티 개발

현재 수준에서 RTL의 널리 사용되는 것을 감안할 때, 커뮤니티에서는 경험을 향상시키기 위해 다양한 도구와 플러그인을 출시했습니다. Dragon OS에는 다양한 도구가 함께 제공되지만 프로젝트에 따라 여러분의 요구에 부족할 수 있습니다. 이럴 경우 RTL-SDR 블로그를 통해 온라인으로 이용할 수 있는 다양한 추가 리소스가 제공되므로 필요한 도구를 찾는 데 도움이 될 것입니다.

날씨 위성 디코딩부터 디지털 음성 및 아마추어 패킷 레포팅 시스템(APRS)과 같은 디지털 신호까지 다양한 내용을 다루는 플러그인을 통해 가능한 도구를 살펴보는 것만으로도 흥미로운 교육적 여정이 될 수 있습니다.

<div class="content-ad"></div>


![라즈베리파이](/assets/img/2024-08-17-TheRaspberryPiSignalsIntelligenceSelectingYourSensors_4.png)

# 다음 시간에

이제 Dragon OS로 Pi를 구성했고 기존의 센서를 장착했으니, 다음 단계는 이 패키지를 사용하여 근처 환경에서 신호를 찾는 것입니다. 물론, 다음 몇 달 동안 무선 프로토콜을 자세히 탐구하는 데 도움이 되는 다양한 프로세스를 살펴보겠습니다.

이 과정에서 우리는 주파수 범위 중 아마추어 무선 부분에서 일부 디지털 및 음성 신호를 살펴보고, 라이센스 없음 산업, 과학 및 의료(ISM) 대역에서 전송될 수 있는 일부 디지털 신호를 살펴볼 것입니다.


<div class="content-ad"></div>

특히 흥미로울 만한 한 가지는 각종 드론 시스템에서 사용될 수 있는 일부 배출물을 탐색하는 것입니다. 이에는 일인칭 시점 (FPV) 드론과 만능 DJI 모델, 그들의 원격 식별 시스템이 포함됩니다.

마지막으로, 이 출판물에 공헌할 모든 수준의 작가를 찾고 있음을 잊지 마세요. 프로젝트를 시작한 것 같다면 토론을 시작하고 기사를 제출해 보는 것은 어떨까요? 여러분의 참여를 환영합니다!

Medium은 이와 유사한 기사들의 발견 가능성을 향상시키기 위해 최근 알고리즘 변경을 가했습니다. 이러한 변화는 고품질 콘텐츠가 보다 넓은 관객에게 도달하도록 하는 데 목적이 있으며, 여러분의 참여는 이를 실현하는 데 중요한 역할을 합니다.

만약 이 기사가 통찰력 있고 유익하며 재미있다고 느꼈다면, 여러분의 지원을 보여주시기를 삼가겠습니다. 이 기사에 박수를 보내면 저자가 자신의 작업이 사랑받는다는 것을 알게 되는 것 뿐만 아니라 다른 이들에게 도움이 될 수도 있습니다.

<div class="content-ad"></div>

🌟 이 기사를 즐기셨나요? 커뮤니티에 가입해보세요! 🌟

💙 저를 Ko-fi에서 지원해주세요: Investigator515

📢 독점 업데이트를 위해 OSINT 텔레그램 채널에 가입하거나

📢 최신 기프트 정보를 위해 암호 텔레그램을 팔로우해보세요

<div class="content-ad"></div>

🐦 트위터에서 팔로우해 주세요!

🟦 우리는 이제 블루스카이에 있어요!

🔗 꼭 읽어보셔야 할 아티클들:
- 테크가 뭐길래?! 로켓 엔진
- OSINT 조사원을 위한 자기 관리 & 회복 안내서

<div class="content-ad"></div>

✉️ 이와 같은 내용을 더 보고 싶으신가요? 이메일 업데이트를 구독해보세요!