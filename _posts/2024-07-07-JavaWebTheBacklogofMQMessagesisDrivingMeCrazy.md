---
title: "Java 웹 MQ 메시지 백로그 문제 해결하는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-JavaWebTheBacklogofMQMessagesisDrivingMeCrazy_0.png"
date: 2024-07-07 19:29
ogImage: 
  url: /assets/img/2024-07-07-JavaWebTheBacklogofMQMessagesisDrivingMeCrazy_0.png
tag: Tech
originalTitle: "Java Web: The Backlog of MQ Messages is Driving Me Crazy"
link: "https://medium.com/@haiou-a/java-web-the-backlog-of-mq-messages-is-driving-me-crazy-7e4d04aa8d1d"
---



![Image](/assets/img/2024-07-07-JavaWebTheBacklogofMQMessagesisDrivingMeCrazy_0.png)

# 소개

저는 이전에 점심과 저녁 피크 시간 동안 상당한 동시성을 겪은 레스토랑 시스템에서 일했습니다.

업무가 원활하게 진행되도록 회사에서는 모든 부서가 식사 시간에는 업무를 번갈아 가며 맡아 온라인 문제를 신속하게 해결하도록 요구했습니다.


<div class="content-ad"></div>

제가 속한 키친 디스플레이 시스템 팀은 주문 시스템의 하위 서비스였어요.

사용자가 주문을 하면, 주문 시스템이 우리 시스템으로 카프카 메시지를 보내요. 우리 시스템은 메시지를 읽고, 비즈니스 로직을 처리하고, 주문 및 요리 데이터를 저장한 후, 이를 요리 관리 클라이언트에 표시해요.

이를 통해 요리사들은 어떤 주문에 어떤 요리가 필요한지 알 수 있고, 요리가 준비되면 시스템이 웨이터에게 서빙하도록 알려줄 수 있어요.

요리를 서빙한 후, 웨이터는 요리 상태를 업데이트해서 사용자가 어떤 요리가 제공되었는지와 어떤 요리가 아직 처리 중인지 알 수 있어요.

<div class="content-ad"></div>

식당 내 주방에서부터 손님에 이르는 과정에서 효율성이 크게 향상됩니다.