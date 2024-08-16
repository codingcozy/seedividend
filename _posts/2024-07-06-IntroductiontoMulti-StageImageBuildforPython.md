---
title: "Python 멀티-스테이지 이미지 빌드 소개"
description: ""
coverImage: "/assets/img/2024-07-06-IntroductiontoMulti-StageImageBuildforPython_0.png"
date: 2024-07-06 03:24
ogImage: 
  url: /assets/img/2024-07-06-IntroductiontoMulti-StageImageBuildforPython_0.png
tag: Tech
originalTitle: "Introduction to Multi-Stage Image Build for Python"
link: "https://medium.com/towards-data-science/introduction-to-multi-stage-image-build-for-python-41b94ebe8bb3"
isUpdated: true
---




이미지의 크기에 대해서는 그리 신경 쓰지 않았는데, Github Actions를 사용하여 컨테이너에 코드를 배포하기 시작하면서 조금 더 중요하게 여기기 시작했습니다. 여기서 수학은 간단합니다: 컨테이너의 크기가 클수록 로드 시간이 길어지고, 따라서 비용도 더 많이 듭니다. 제 파이썬 이미지 크기가 5Gb에 도달한 순간(파이토치, 고마워요!), 더 효율적인 이미지 빌드 방법을 탐색하기 시작했습니다.

요약하자면 — 멀티 스테이지 빌드 접근법을 사용하여 기준 이미지의 크기를 65% 줄일 수 있었습니다.

이 게시물에서는 세 가지 빌드 방법을 검토하고, 몇 가지 간단한 단계로 파이썬 이미지의 크기를 줄일 수 있는 방법을 살펴볼 것입니다. 공식 Python 이미지인 python:3.10을 사용한 기준 빌드로 시작하여 이미지 슬림 버전을 탐구하고, 보다 고급스러운 방법인 멀티 스테이지 빌드를 소개할 것입니다.

<div class="content-ad"></div>

# 사전 준비 사항

본 튜토리얼을 따라하기 위해서는 다음 설정이 필요합니다:

- macOS 또는 Windows 운영 체제를 사용하는 경우 Docker Desktop (또는 해당하는 프로그램)이 필요하며, 다른 운영 체제를 사용하는 경우 Docker가 설치되어 있어야 합니다.