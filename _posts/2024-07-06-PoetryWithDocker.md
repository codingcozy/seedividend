---
title: "도커Docker를 활용한 시적 애플리케이션 제작 방법"
description: ""
coverImage: "/assets/img/2024-07-06-PoetryWithDocker_0.png"
date: 2024-07-06 11:17
ogImage:
  url: /assets/img/2024-07-06-PoetryWithDocker_0.png
tag: Tech
originalTitle: "Poetry With Docker"
link: "https://medium.com/gitconnected/poetry-with-docker-eca8682da020"
isUpdated: true
---

/assets/img/2024-07-06-PoetryWithDocker_0.png

만약 제처럼 (자신이 프로젝트 구조에 관심을 가지는 사람이라면) 이미 이 두 도구를 따로 사용하고 있다면, 이제 두 가지를 결합할 때입니다.

## Poetry란?

Poetry는 나의 모든 저장소에 지난 몇 년간 사용해온 견해 있는 Python 패키지 관리자입니다.

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

**이미지 태그를 마크다운 형식으로 변경해 보세요**

Poetry는 처음에는 배우기 어려운 도구일 수 있지만 (죄송합니다. 팀!), 특히 프로젝트에 많은 종속성이 있는 경우에 매우 편리합니다. 다른 패키지 관리자들이 고전하는 다양한 시나리오도 Poetry가 안전하게 관리할 수 있습니다. 꼭 한 번 살펴보시는 걸 추천해요 :)

## 도커란?

도커가 무엇인지 알아두는 것이 좋아요. 그리고 배워야 해요!

# 흔한 시나리오

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

프로젝트 잘 관리되고 시를 품은 프로젝트가 있어요.
멋진 앱을 개발하고 배포하기 위한 Dockerfile이 있어요.

저는 이런 문제를 겪었어요:
requirements.txt를 프로젝트에 추가하고 모든 종속성을 수동으로 재정의하고 싶지 않았어요! 이미 poetry를 사용하고 있으니까요!
