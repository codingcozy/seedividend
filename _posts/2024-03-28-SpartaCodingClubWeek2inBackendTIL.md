---
title: "백엔드에서 CRUD 하는 방법 "
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Sparta Coding Club Week 2 in Backend  TIL"
link: "https://medium.com/@sharannallathuru/sparta-coding-club-week-2-in-backend-til-d6eecd81cc70"
isUpdated: true
---

# 백엔드 개발 2주차: 데이터베이스, API, 그리고 플라스크의 심층 탐구

백엔드 개발 여정의 두 번째 주는 정말 흥미진진했습니다. 파이썬, CRUD 작업, 데이터베이스, 그리고 API의 매혹적인 세계를 탐험하며 백엔드 개발 역량을 크게 강화할 수 있었죠. 이번 주에는 API가 클라이언트와 서버 간에 원활한 통신을 지원하는 방법을 이해하는 데 초점을 맞추었으며, 서버 생성을 위해 Flask를 실습해 보기도 했습니다. 프론트엔드와 백엔드 개발 간의 시너지는 풀스택 웹 애플리케이션을 개발하는 데 필수적이었고, 이 역시 중요한 탐구 대상 중 하나였습니다. 이 여정에서 한 발 한 발 나아가며 꾸준히 성장해 나가는 모습이 백엔드 개발 분야에서 뛰어난 성과를 이루겠다는 다짐을 더 강력히 하고 있습니다.

## CRUD 작업 해부하기:

데이터 관리와 웹 개발의 핵심은 CRUD(Create, Read, Update, Delete)에 있습니다. 이 네 가지 작업은 데이터와 상호 작용하는 데 기초적입니다.

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

## MongoDB Atlas를 탐험해보세요:

MongoDB Atlas은 MongoDB 기술을 바탕으로한 최신 데이터베이스 서비스로 등장합니다. 이는 단순성, 확장성 및 보안을 위해 설계되어 있으며 다음을 제공합니다:

- 다양한 요구에 적응할 수 있는 수월한 확장 기능.
- 데이터베이스에 안정적으로 액세스할 수 있도록 지속적인 가용성.
- 데이터를 보호하기 위한 고급 보안 프로토콜.
- 성능을 향상시키고 지연 시간을 줄이기 위한 전역 데이터 분배.
- 개발자가 우수한 애플리케이션을 만들 수 있도록 간소화된 관리.

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

## API의 역할:

API 또는 응용프로그램 프로그래밍 인터페이스는 서로 다른 소프트웨어 응용프로그램 간 통신의 기반으로 작용합니다. 이를 통해 서로 다른 소프트웨어 생태계를 연결하고 확장하며 자동화하고 맞춤화하며 연결하는 잠재력을 발휘합니다. 클라이언트와 서버 간 정보 교환을 용이하게 함으로써 API는 소프트웨어 솔루션의 원활한 개발에서 중추적 역할을 합니다.

## Flask 소개:

Flask는 간결함과 유연성으로 손꼽히는 Python 기반 웹 개발 도구로, 요청 처리, 페이지 맞춤 설정 및 기능 개선에 대한 간소화된 접근 방식을 제공하여 초보자와 숙련된 개발자 모두를 위한 도구로 인기를 끌고 있습니다.

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

## 주 2 프로젝트 개요: 원페이지 쇼핑 몰

이번 주 프로젝트는 API를 활용하여 원페이지 쇼핑 몰 기능을 향상시키는 데 중점을 두었습니다. 이 작업은 Flask 프로젝트를 만들고 쇼핑 몰 기능 API와 통합하여 두 가지 주요 목표를 달성하는 것을 포함했습니다:

1. 주문 배치 (POST): '주문' 버튼을 클릭하면 정보가 목록에 추가되는 기능을 구현합니다.
2. 주문 목록 조회 (GET): 페이지 로드 시 주문 목록이 업데이트되도록 보장합니다.

MongoDB, CRUD 작업, API 및 Flask에 대한 이 탐구는 제 이해를 깊이 향상시켰습니다. 이러한 기술은 개발자들에게 힘을 실어줍니다:

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

- 탁월한 효율성으로 데이터를 관리합니다.
- 애플리케이션 간의 원활한 커뮤니케이션을 지원합니다.
- 민첩하게 견고한 웹 애플리케이션을 개발합니다.

나는 기술을 개선하며 도전을 극복하는 동안, 이러한 기술을 숙달하기에 대한 나의 헌신은 변함이 없습니다.

당신이 나의 여정을 따라오고 앞으로 있는 학습 경험을 나누는 것을 초대합니다. 웹 개발 세계에서의 더 많은 통찰과 모험을 기대해주시기 바랍니다.

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
