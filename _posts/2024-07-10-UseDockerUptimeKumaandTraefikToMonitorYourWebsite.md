---
title: "Docker, Uptime Kuma, Traefik으로 사이트 모니터링하는 방법"
description: ""
coverImage: "/assets/img/2024-07-10-UseDockerUptimeKumaandTraefikToMonitorYourWebsite_0.png"
date: 2024-07-10 02:36
ogImage: 
  url: /assets/img/2024-07-10-UseDockerUptimeKumaandTraefikToMonitorYourWebsite_0.png
tag: Tech
originalTitle: "Use Docker, Uptime Kuma, and Traefik To Monitor Your Website"
link: "https://medium.com/gitconnected/use-docker-uptime-kuma-and-traefik-to-monitor-your-website-593373f9e0c2"
---


![이미지](/assets/img/2024-07-10-UseDockerUptimeKumaandTraefikToMonitorYourWebsite_0.png)

# 소개

이 글에서는 Docker/Docker Swarm을 사용하여 로컬 PC 또는 서버에서 웹사이트 모니터링을 설정하는 방법을 보여드릴 예정입니다. prometheus, node-exporter 또는 graphana와 같이 복잡한 모니터링 스택을 사용하는 대신 NodeJs와 Vue로 작성된 가벼운 대안인 Uptime Kuma를 소개하고자 합니다.

해당 프로젝트는 오픈 소스로 GitHub에서 찾을 수 있으며, 링크는 다음과 같습니다: https://github.com/louislam/uptime-kuma

<div class="content-ad"></div>

이 대체 방법을 사용하게 된 결정적인 이유는 다음과 같습니다:

- UI가 아름답습니다!
- Docker/Docker Swarm과의 매우 손쉬운 설정
- 믿을 수 없이 쉬운 구성
- Discord, Slack, 이메일(SMTP) 등을 통한 알림 지원. 전체 목록을 보려면 여기를 클릭하십시오.

# 준비물

서버나 로컬 머신에서 Uptime Kuma를 실행하려면 환경을 준비해야 합니다. 저는 개인적으로 Docker Swarm에서 실행되며 Docker로 배포된 반대 프록시로 Traefik을 실행하는 것을 좋아합니다...