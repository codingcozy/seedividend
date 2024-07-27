---
title: "홈 랩 DNS 업데이트 테크니티움, 파이홀"
description: ""
coverImage: "/assets/img/2024-05-17-HomeLabDNSUpdateTechnitiumPi-Hole_0.png"
date: 2024-05-17 04:14
ogImage: 
  url: /assets/img/2024-05-17-HomeLabDNSUpdateTechnitiumPi-Hole_0.png
tag: Tech
originalTitle: "Home Lab DNS Update: Technitium++, Pi-Hole––"
link: "https://medium.com/@a.j.longchamps/home-lab-dns-update-technitium-pi-hole-cb9bf24bb8b5"
---


이번 아침에는 Pi Hole DNS 서버를 다른 Technitium 설치로 대체하기로 결정했어요. 그래서 이제 HA를 위해 두 개의 Technitium DNS 서버를 사용하고 있어요.

우분투 23.10 서버 이미지를 설치한 후, Technitium의 웹사이트에서 이 편리한 한 줄 명령어를 제공하네요:

```js
curl -sSL https://download.technitium.com/dns/install.sh | sudo bash
```

<div class="content-ad"></div>

거기서 고정 IP, 관리자 비밀번호를 설정하고 원래의 Technitium DNS 서버에서 설정을 가져왔습니다. 최근 블로그 게시물에서 이에 대한 내용을 다뤘어요.

Technitium 웹 인터페이스로 돌아와서 설정 페이지의 가져오기/내보내기 기능을 사용하여 주 서버의 설정을 백업하고 보조 서버에 복원했어요:

![image](/assets/img/2024-05-17-HomeLabDNSUpdateTechnitiumPi-Hole_1.png)

백업 인터페이스를 통해 캡처할 항목을 선택할 수 있어요:

<div class="content-ad"></div>

마찬가지로 복원 페이지에서 가져오길 원하는 것을 묻습니다:

![capture](/assets/img/2024-05-17-HomeLabDNSUpdateTechnitiumPi-Hole_3.png)

그 후에 정적 IP를 적용하고 모든 것이 예상대로 작동하는지 확인하기 위해 다시 부팅했습니다. 이제 두 개의 다른 라즈베리 파이 장치에서 두 개의 Technitium DNS 서버가 실행 중입니다.

<div class="content-ad"></div>

내 원래 계획은 라즈베리 파이 서버에 어떤 종류의 microk8s 설치를 사용하고 Kubernetes가 컨테이너를 실행하도록 하는 것이었습니다. 그러나 외부에서 k8s가 포트 53에서 듣도록 하는 데 어려움이 있었기 때문에, 일단 그 계획을 포기하기로 결정했습니다. 다시 시도하지 않을 것 같고, 대신 내장형 (잘, 쉽게 설치 가능한) core-dns 기능을 사용할 것입니다. 그 목적으로는 K8s가 과도한 것이었을 것입니다.

업데이트된 홈 랩 인벤토리 다이어그램이 도착했습니다. 곧 발행될 예정이니 기대해주세요!