---
title: "Redis 대신 PostgreSQL을 사용해야 하는 이유"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-WhoneedsRediswhenPostgreswilldo_0.png"
date: 2024-07-07 21:46
ogImage:
  url: /assets/img/2024-07-07-WhoneedsRediswhenPostgreswilldo_0.png
tag: Tech
originalTitle: "Who needs Redis, when Postgres will do?"
link: "https://medium.com/stackademic/who-needs-redis-when-postgres-will-do-9ad54379fb94"
---

![이미지1](/TIL/assets/img/2024-07-07-WhoneedsRediswhenPostgreswilldo_0.png)

레디스를 정말 좋아합니다. 토네이도 앱을 확장하고 실시간 업데이트를 지원할 수 있게 해줬죠. 토네이도는 nginx 뒤에서 실행하고 토네이도 앱의 여러 인스턴스를 가동하는 것을 권장합니다.

![이미지2](/TIL/assets/img/2024-07-07-WhoneedsRediswhenPostgreswilldo_1.png)

이제 클라이언트가 앱에 연결하고 모든 앱의 모든 클라이언트에게 방송이 전달되어야 합니다. 레디스는 여기서 나서서 모든 앱이 레디스 채널을 구독하고 작성 앱에서 publish를 호출하는 pub/sub(발행 및 구독) 패턴을 제공합니다. 이는 Heroku나 AWS에서 매우 잘 작동하는데, 누가 서버가 몇 개나 있는지 알 수 없는 환경에서 작동합니다. 그러나 단일 장애 지점을 도입하게 됩니다.

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

<img src="/TIL/assets/img/2024-07-07-WhoneedsRediswhenPostgreswilldo_2.png" />

그럼, Postgres는 어떤가요? 저의 지속성은 SQLAlchemy로 이뤄집니다. MySQL에서 Postgres로 가끔 전환해 보았는데, 장점이 있는지 살펴보기 위해서예요. MySQL은 인noDB 인터페이스를 통해 캐시를 업데이트할 수 있는데, 이는 인noDB 트랜잭션 내에서 기본 데이터를 업데이트하는 동시에 캐시를 업데이트할 수 있어요. 안타깝게도, MySQL의 개발자들은 이 확장 기능을 폐기하기로 결정했어요. 그래서 Postgres와 그들 자체의 연결 클래스를 살펴보았어요. 함께 살펴보죠...
