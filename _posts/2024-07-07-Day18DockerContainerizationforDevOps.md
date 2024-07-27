---
title: "18일차 DevOps를 위한 Docker 컨테이너화 방법"
description: ""
coverImage: "/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_0.png"
date: 2024-07-07 23:34
ogImage: 
  url: /assets/img/2024-07-07-Day18DockerContainerizationforDevOps_0.png
tag: Tech
originalTitle: "Day 18 : Docker Containerization for DevOps."
link: "https://medium.com/@rohitrajput2/day-18-docker-containerization-for-devops-7b640b51b4f5"
---


![이미지](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_0.png)

오늘은 Docker-Compose를 다뤘어요. YAML 파일을 사용하여 MongoDB와 Mongo-Express를 어떻게 연결하는지 설명했어요.

지금까지 Docker-Compose 파일을 만들고 Repository에 푸시했죠. 이제 다른 Docker 개념을 좀 더 자세하게 살펴봅시다.

![이미지](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_1.png)

<div class="content-ad"></div>

# 도커 컴포즈란 무엇인가요?

- 도커 컴포즈는 여러 개의 컨테이너로 구성된 도커 애플리케이션을 정의하고 실행할 수 있는 도구입니다.
- YAML 파일을 사용하여 애플리케이션의 *서비스, 네트워크 및 볼륨을 구성하는 도구입니다.
- 도커 컴포즈를 사용하면 여러 개의 컨테이너를 하나의 애플리케이션으로 쉽게 구성하고 실행할 수 있어 복잡한 애플리케이션을 관리하고 배포하기 쉽습니다.
- 도커 컴포즈는 로컬에서 애플리케이션을 개발하고 테스트하는 데 자주 사용됩니다. 한 대의 컴퓨터에서 전체 애플리케이션 스택을 정의하고 실행할 수 있기 때문입니다.
- 또한 애플리케이션의 구성을 다른 개발자들과 손쉽게 공유할 수 있습니다. 구성은 단일 YAML 파일에 저장되어 버전 관리에 커밋할 수 있습니다.

# YAML은 무엇인가요?

- YAML은 자주 사용되는 구성 파일을 작성하는 데 사용되는 데이터 직렬화 언어입니다. 누구에게 물어보느냐에 따라 YAML은 Yet Another Markup Language 또는 YAML ain't markup language (재귀적 약어)로 알려져 있으며, YAML은 문서가 아닌 데이터에 사용됨을 강조합니다.
- YAML은 사람이 읽고 이해하기 쉽기 때문에 인기 있는 프로그래밍 언어입니다.
- YAML 파일은 .yml 또는 .yaml 확장자를 사용합니다.

<div class="content-ad"></div>

# Docker-Compose.yaml 파일 만드는 방법 :

단계 1: 버전 (Docker Compose의 버전).

단계 2: 서비스 (컨테이너를 추가하는 곳)

예시(컨테이너, 이미지, 포트, 환경 변수)

<div class="content-ad"></div>

Step 3: 우리는 이와 같은 여러 환경을 만들 수 있어요.

# 태스크-1:

도커 컴포즈(yml) 파일을 사용하는 방법과 환경을 설정하는 방법, 서비스를 구성하고 다른 컨테이너 간의 링크를 설정하는 방법, 그리고 도커 컴포즈(yml) 파일에서 환경 변수를 사용하는 방법을 배워봐요.

![Day18DockerContainerizationforDevOps_2](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_2.png)

<div class="content-ad"></div>

# Task-2:

공개 저장소(예: Docker Hub)에서 기존의 Docker 이미지를 가져와 로컬 머신에서 실행해보세요.

![이미지](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_3.png)

docker inspect 명령을 사용하여 컨테이너의 실행 중인 프로세스와 노출된 포트를 확인하세요.

<div class="content-ad"></div>

도커의 inspect 명령어를 사용하면 `container_id` 또는 `image_id`에 대한 정보를 확인할 수 있어요.

![이미지](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_4.png)

도커 logs 명령어를 사용하면 컨테이너의 로그를 확인할 수 있어요. `container_id`를 사용해보세요.

<div class="content-ad"></div>


![Docker Container](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_5.png)

도커 컨테이너를 중지하려면 docker stop 및 docker start 명령어를 사용하세요.

도커 컨테이너를 중지하려면 docker stop `container_id` 또는 `image_id`명을 사용하세요.

![Docker Commands](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_6.png)


<div class="content-ad"></div>

![Day18DockerContainerizationforDevOps_7](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_7.png)

도커 컨테이너를 시작하려면 `container_id` 또는 `image_id`를 사용하십시오.

![Day18DockerContainerizationforDevOps_8](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_8.png)

![Day18DockerContainerizationforDevOps_9](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_9.png)

<div class="content-ad"></div>

Docker rm 명령어를 사용하여 작업이 완료되면 컨테이너를 제거하세요.


docker rm `container_id` 혹은 `image_id`


![이미지](/assets/img/2024-07-07-Day18DockerContainerizationforDevOps_10.png)

제 소셜 미디어 계정을 팔로우해 주세요.

<div class="content-ad"></div>

LinkedIn : [Rohit Rajput LinkedIn](https://www.linkedin.com/in/rohitrajputops/)