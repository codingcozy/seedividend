---
title: "라즈베리 파이를 활용한 네트워크 설정하는 방법"
description: ""
coverImage: "/assets/img/2024-08-18-NetworkingTheRaspberryPi_0.png"
date: 2024-08-18 11:35
ogImage:
  url: /assets/img/2024-08-18-NetworkingTheRaspberryPi_0.png
tag: Tech
originalTitle: "Networking , The Raspberry Pi"
link: "https://medium.com/@investigator515/networking-the-raspberry-pi-b23a1f0b96a3"
isUpdated: true
updatedAt: 1724032792824
---

![네트워킹을 통해 라즈베리파이 배운다](/assets/img/2024-08-18-NetworkingTheRaspberryPi_0.png)

이 프로젝트들로 네트워킹에 대해 스스로 가르치세요.

만약 미디엄 회원이 아니라면, substack를 통해 무료로 읽을 수 있습니다.

전자기기의 발전과 함께 시간이 지남에 따라 리퍼비시 기기의 가용성이 증가했습니다. 현재의 시장에서는 예전 기업용 시스템이 학습에 좋은 도구로 사용될 수 있고, 저렴하게 구할 수 있으며, 새로운 삶을 위해 리퍼비싱하고 새 목적으로 사용될 수 있습니다. 라즈베리파이와 같은 싱글 보드 컴퓨터의 성능 향상과 결합하면, 집에서 실험실이나 자체 호스팅 설정에서 실행할 시스템을 비교적 쉽게 적당한 비용으로 찾을 수 있습니다.

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

그 결과, 자체 호스팅에 대한 재폴더가 있습니다. 오늘날의 클라우드 중심 세계에서는 거의 희귀한 것으로 여겨지는 많은 사람들이 자체 호스팅 시스템을 구성하고 사용하는 것이 리눅스, 네트워크 및 장치 구성 및 보안 문제와 같이 다양한 새로운 기술을 배우는 좋은 방법이 될 수 있다는 것을 확인했습니다. 오늘의 글에서는 교육 및 홈 랩 목적으로 라즈베리 파이에서 실행할 수 있는 몇 가지 간단한 프로젝트를 살펴보겠습니다. 간단한 메일 서버부터 자유로운 시스템까지 모든 것을 다루며 기술적으로 능동적이시라면 여기에 주목할 프로젝트가 있을 것입니다. 그런데 먼저, 메모리에 관한 간단한 이야기를 해보겠습니다.

이러한 프로젝트 중 하나를 실험용으로만 사용하려면 내장 SD 카드가 적당할 것입니다. 그러나 신뢰성을 위해 장기 설치를 하는 경우에는 SSD를 사용하는 것이 더 좋은 선택일 수 있습니다. 언제나 상황을 고려하고 자신의 상황에 가장 적합한 옵션을 사용하십시오.

참고: 보드 간에 상당한 차이가 있어서 일반적으로 나중 모델 시스템이 이전 모델보다 효율적으로 자체 호스팅 소프트웨어를 실행할 수 있습니다. 그러나 테스트 목적으로 특정 유형의 보드에 적합한 올바른 소프트웨어 이미지를 얻었는지 확인하는 것이 중요합니다. 테스트 목적으로 Pi 4와 가능한 경우 새 Pi 5를 사용합니다.

![네트워킹 더 라즈베리 파이](/assets/img/2024-08-18-NetworkingTheRaspberryPi_1.png)

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

# FreedomBox

데비안에서 실행되는 FreedomBox 프로젝트는 프로그래밍 기술이 부족한 사용자들을 포함한 많은 사람들에게 자가 호스팅을 제공하기 위해 만들어졌습니다. 전문가가 아닌 이들을 위한 개인 서버로 소개되며, 대규모의 애드온을 구성할 수 있는 무료 다운로드 가능한 OS 이미지로 제공됩니다.

Git 호스팅부터 Matrix 채팅 서버, 이메일 서버, VPN, 심지어 비트 토렌트와 자체 호스팅 웹 검색까지 모두 포함되어 있습니다. 또한 내장된 Cockpit 프로그램을 사용하여 성능 및 통계를 쉽게 추적할 수 있습니다.

이미 Raspberry Pi용 다운로드 가능한 이미지가 제공되므로 FreedomBox는 시작할 수 있는 훌륭한 프로젝트가 될 수 있습니다. 그러나 기술적인 면에서 약간 어려운 것으로 생각하는 사람들도 있을 수 있습니다. 그럼에도 불구하고, FreedomBox의 웹 기반 데모를 사용하여 실제 사용 전에 먼저 시도해볼 수 있습니다.

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

다음 링크를 통해 FreedomBox 데모 버전을 확인해보세요

![FreedomBox Demo](/assets/img/2024-08-18-NetworkingTheRaspberryPi_2.png)

## OpenVPN 서버

웹 및 클라우드 기반 VPN 서비스에는 다양한 옵션이 있지만, 개인 정보 보호에 더 관심이 있는 사람들은 자체 VPN 서버를 구축해보는 것에 관심이 있을 것입니다. 이는 네트워킹에 대해 배우는 것 뿐만 아니라 데이터가 내부에 유지된다는 추가적인 안심감을 줍니다.

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

가장 좋은 옵션 중 하나는 OpenVPN 서버 패키지입니다. Raspberry Pi OS의 기본 패키지 관리자인 apt 패키지 관리자에 제공되며, 개인 정보 보호를 다시 시작하는 빠르고 쉬운 방법입니다.

자체 호스팅 VPN 서버를 구성하면 네트워킹 기본원론에 액세스할 수 있을뿐만 아니라 인증서 및 엔드포인트 구성에 대해 배울 수 있습니다.

시작하기 위해 OpenVPN 웹사이트에서 제공하는 이 안내서를 따라 주세요.

![NetworkingTheRaspberryPi_3 이미지](/assets/img/2024-08-18-NetworkingTheRaspberryPi_3.png)

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

# Plex 미디어 스테이션

몇 년 전에는 Netflix와 같은 서비스가 평균 소비자에게 매우 좋은 가치를 제공했다고 할 수 있었습니다. 그러나 오늘날에는 미디어 라이브러리가 줄어들고 패스워드 공유가 제한되며 광고가 추가된 상황에서, flix를 그만두고 자체 버전을 사용하는 것이 더 좋은 때는 없었습니다. 이를 빠르고 쉽게 수행하는 가장 좋은 방법 중 하나는 Plex 미디어 서버를 사용하는 것입니다.

다운로드할 수 있는 쉽게 설정 가능한 옵션과 자신만의 라이브러리를 만들 수 있는 기능으로, Plex는 옛 라이브러리를 디지털화하는 데도 좋고, 집에서 캐주얼하게 시청하는 데도 좋은 선택일 수 있습니다.

유료 버전도 있지만, 똑똑한 홈랩 사용자들은 대부분의 작업을 무료 버전으로 충분히 해낼 수 있습니다. 컴퓨터용 적절한 버전을 이 링크를 통해 다운로드하세요.

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

![Raspberry Pi networking](/assets/img/2024-08-18-NetworkingTheRaspberryPi_4.png)

# 네트워크 연결 스토리지 (NAS)

초보자가 구성하기 가장 쉬운 프로젝트 중 하나임에도 불구하고, DIY NAS 시스템은 놀랍게도 가장 흥미로울 수도 있습니다. 이는 많은 프로젝트가 제대로 실행되기 위해 전용 기계가 필요한 반면, 네트워크 연결 스토리지는 USB를 통해 연결된 오래된 라우터로 간단히 만들 수 있다는 점 때문입니다.

전용 시스템의 성능을 제공하지는 않지만, 많은 사람들에게는 프로젝트를 완료하는 데 필요한 추가 장비가 거의 없는 오래된 하드웨어를 다시 사용하는 완벽한 방법일 수 있습니다.

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

OpenMediaVault은 라즈베리 파이에서 완벽하게 작동하는 무료 Linux 기반 OS로, 처음으로 미디어 서버를 구축하기에 좋은 선택지입니다. 다만, 제대로 보안을 유지해주는 것을 잊지 마세요!

기본 버전의 Raspberry Pi OS를 사용하여 OpenMediaVault를 구성할 수 있습니다.

![이미지](/assets/img/2024-08-18-NetworkingTheRaspberryPi_5.png)

# Pi-Hole 광고 차단기

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

만약 넷플릭스를 끊을 수 없다면, PiHole 광고 차단기를 구성하여 그들에게 대항할 수도 있어요. 전체 네트워크에서 광고를 차단하는 PiHole은 짜증나는 광고들이 간단히 사라지는 동굴처럼 작동해요.

쉽게 다운로드할 수 있는 이미지로, PiHole은 거의 설정 후 잊어버릴 수 있는 단일 일일 프로젝트예요. 가장 좋은 점은 내장 대시보드를 통해 얼마나 많은 시간을 되찾았는지 쉽게 추적할 수 있다는 거에요.

가동하려면 일부 구성이 필요하지만, 최소한의 수고로 작동하는 데 도움이 되는 다양한 튜토리얼이 많이 있어요.

많은 사람들과 가정 네트워크에 있어서 PiHole은 현재 사용되지 않는 보드의 가장 좋은 활용 중 하나에요. 올바르게 구성하면 유튜브에도 작동할 거예요. 또한 Reddit에 활발한 커뮤니티가 있어서 발생할 수 있는 어떤 문제든 도와줄 사람이 많아요.

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

<img src="/assets/img/2024-08-18-NetworkingTheRaspberryPi_6.png" />

# 마무리마무리

이러한 프로젝트들 중 일부는 여분의(또는 새로운) 라즈베리 파이의 훌륭한 활용이 될 수 있습니다. 그러나 어떤 독자들에게는 하드웨어에 투자하는 것이 선택사항이 아닐 수도 있습니다. 그러므로 배우는 목적으로는 항상 대안이 있으면 좋습니다.

따라서 가끔 사용하는 하드웨어에 주의를 기울이는 것이 가겨게 다시 활용하기에 완벽할 수도 있습니다. 그리고 라우터에 중점을 둔다면, 기본 구성에서 사용할 수 없는 기능과 패키지를 지원하는 써드파티 펌웨어가 있다는 점을 언급할 가치가 있습니다. OpenWRT 프로젝트 같은 프로젝트는 오래된 하드웨어를 구성하거나 새로운 기능을 잠금해제하는 데 좋은 방법이 될 수도 있습니다.

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

라즈베리 파이가 하드웨어 측면에서 가장 좋은 선택일 수 있지만, 유일한 선택이 아닌 것을 기억하는 것도 중요합니다. 집에서 활용할 수 있는 오래된 하드웨어가 있는지 확인해 보세요. 댓글에서 공유해 주시면 감사하겠습니다!

최근 Medium은 이와 같은 기사들의 발견 가능성을 높이기 위해 알고리즘 변경을 가했습니다. 이러한 변화는 높은 품질의 콘텐츠가 보다 넓은 관객에게 전달되도록 하는 데 목적이 있으며, 여러분의 참여가 이를 실현하는 데 중요한 역할을 합니다.

만약 이 기사를 유익하고 재미있게 읽으셨다면, 작가가 여러분의 작업을 인정받았음을 알려주고, 해당 기사가 다른 이들에게 도움이 될 수 있도록 가시성을 높이는 데 도움이 되는 기능인 Clap 버튼을 눌러주세요.

🌟 이 기사를 즐겨보셨나요? 우리의 작업을 지원하고 커뮤니티에 참여해 보세요! 🌟

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

💙 Ko-fi에서 제를 지원해주세요: Investigator515

📢 단독 업데이트를 위해 OSINT 텔레그램 채널에 가입하세요

📢 최신 이벤트 정보를 얻으려면 암호화폐 텔레그램을 팔로우하세요

🐦 트위터에서도 팔로우해주세요

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

🟦 우리는 지금 Bluesky에 있어요!

🔗 다음은 당신이 좋아할만한 기사입니다:

- 테크에 대해 어떻게 생각하세요?! 로켓 엔진
- OSINT 조사관을 위한 자기 관리 및 회복 안내서

✉️ 이와 같은 콘텐츠를 더 원하시나요? 이메일 업데이트를 신청하세요
