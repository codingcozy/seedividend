---
title: "주말 AI 프로젝트 PC와 Raspberry Pi에서 YOLO를 사용한 객체 탐지 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-AWeekendAIProjectObjectDetectionwithYOLOonPCandRaspberryPi_0.png"
date: 2024-07-07 02:24
ogImage:
  url: /assets/img/2024-07-07-AWeekendAIProjectObjectDetectionwithYOLOonPCandRaspberryPi_0.png
tag: Tech
originalTitle: "A Weekend AI Project: Object Detection with YOLO on PC and Raspberry Pi"
link: "https://medium.com/towards-data-science/a-weekend-ai-project-object-detection-with-yolo-on-pc-and-raspberry-pi-0653e01032c1"
---

<img src="/TIL/assets/img/2024-07-07-AWeekendAIProjectObjectDetectionwithYOLOonPCandRaspberryPi_0.png" />

컴퓨터 비전은 다양한 규모의 ML 앱에 중요한 역할을 할 수 있습니다. $20,000에 이르는 테슬라 로봇이나 자율 주행 자동차부터 스마트 도어벨과 진공 청소기까지 다양한 영역에 활용될 수 있습니다. 그러나 실제 엣지 디바이스에는 클라우드 인프라와 비교할 때 하드웨어 사양이 제약되어 있는 경우가 많아 도전적인 과제로 여겨집니다.

YOLO(You Only Look Once)는 인기 있는 객체 검출 라이브러리로, 첫 번째 버전은 2015년에 만들어졌습니다. YOLO는 임베디드 디바이스에서 특히 흥미로운데, 거의 모든 곳에서 실행될 수 있습니다. 파이썬 뿐만 아니라 C++(ONNX 및 OpenVINO) 및 Rust 버전도 제공됩니다. 1년 전에 저는 Raspberry Pi 4에서 YOLO v8을 테스트했습니다. 요즘에는 많은 변화가 있었는데, 새로운 Raspberry Pi 5가 출시되었고, 더 새로운 YOLO v10도 출시되었습니다. 따라서 새 모델을 새 하드웨어에서 실행했을 때 더 빠르고 정확하게 작동할 것으로 기대합니다.

본문에 제시된 코드는 크로스 플랫폼이므로 Raspberry Pi가 없는 독자들도 Windows, Linux 또는 OS X 컴퓨터에서 실행할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

계속해서, 어떻게 작동하는지 살펴보겠습니다!

## Raspberry Pi

라즈베리 파이에 대해 들어보지 못한 사람을 위해 간단히 설명해보겠습니다...
