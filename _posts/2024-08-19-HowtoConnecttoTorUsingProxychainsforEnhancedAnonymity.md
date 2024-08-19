---
title: "프록시체인을 이용해 토르 연결 하는 방법"
description: ""
coverImage: "/assets/img/2024-08-19-HowtoConnecttoTorUsingProxychainsforEnhancedAnonymity_0.png"
date: 2024-08-19 03:23
ogImage: 
  url: /assets/img/2024-08-19-HowtoConnecttoTorUsingProxychainsforEnhancedAnonymity_0.png
tag: Tech
originalTitle: "How to Connect to Tor Using Proxychains for Enhanced Anonymity"
link: "https://medium.com/@forgecode/how-to-connect-to-tor-using-proxychains-for-enhanced-anonymity-2cf13110b3d9"
isUpdated: true
updatedAt: 1724032921460
---


아래는 Proxychains를 사용하여 Tor로 연결하는 빠른 안내서입니다. Proxychains와 함께 Tor를 사용하면 Tor에 도달하기 전에 귀하의 트래픽이 여러 프록시 서버를 거치게 됩니다.

(이 지침은 대부분의 리눅스 사용자에 의해 일반적으로 사용되는 apt 디렉토리에 중점을 두고 있습니다. Fedora를 사용 중이라면 지침에서 apt를 dnf로 간단히 대체하십시오.)

다음은 단계별 지침입니다:
sudo apt update && apt upgrade -y
sudo apt install proxychains
sudo apt install tor
sudo nano /etc/proxychains.conf

![이미지](/assets/img/2024-08-19-HowtoConnecttoTorUsingProxychainsforEnhancedAnonymity_0.png)

<div class="content-ad"></div>

저희는 지금 "strict_chain"에 해시태그를 추가하고, 대신 "dynamic_chain"에서 해시태그를 제거할 거예요.

아래로 스크롤해서 socks5 127.0.0.1 9050을 추가해주세요.

![이미지](/assets/img/2024-08-19-HowtoConnecttoTorUsingProxychainsforEnhancedAnonymity_1.png)

그리고 마지막으로 다음 명령어를 입력해서 Tor 서비스를 시작해주세요: sudo service tor start

<div class="content-ad"></div>

```bash
sudo service tor status

![How to Connect to Tor Using Proxychains for Enhanced Anonymity](/assets/img/2024-08-19-HowtoConnecttoTorUsingProxychainsforEnhancedAnonymity_2.png)

It must be active (running) and Bootstrapped 100% (done) without any errors. Since I’m using Fedora, there may be some differences in the information displayed, but as long as it’s working properly and error-free, you’re all set.

try it with a command:
```

<div class="content-ad"></div>

프록시체인즈를 사용하여 파이어폭스 브라우저를 실행하세요.

프록시체인즈를 이용하여 `curl http://ifconfig.me` 명령을 실행하세요.

![이미지](/assets/img/2024-08-19-HowtoConnecttoTorUsingProxychainsforEnhancedAnonymity_3.png)

이 설정은 추가적인 난독화 계층을 더해 온라인 활동을 추적하는 데 어렵게 만듭니다. 프록시체인즈와 Tor를 함께 사용하면 개인 정보 보호, 검열 우회, 그리고 점점 더 연결된 세상에서 데이터를 보호하는 튼튼한 해결책이 됩니다.