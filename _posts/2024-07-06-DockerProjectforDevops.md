---
title: "DevOps를 위한 최신 Docker 프로젝트 구성 방법"
description: ""
coverImage: "/assets/img/2024-07-06-DockerProjectforDevops_0.png"
date: 2024-07-06 11:20
ogImage: 
  url: /assets/img/2024-07-06-DockerProjectforDevops_0.png
tag: Tech
originalTitle: "Docker Project for Devops"
link: "https://medium.com/@m.qasimnauman/docker-project-for-devops-56cbdc13f8ce"
isUpdated: true
---




/assets/img/2024-07-06-DockerProjectforDevops_0.png

안녕하세요 여러분! 데브옵스 여행을 계속하면서 도커 설치 및 기본 명령을 살펴보았습니다. 이제 실제 프로젝트를 AWS EC2에서 도커를 사용하여 배포하게 될 것입니다.

요구 사항:

EC2에 도커 설치 (가이드)

<div class="content-ad"></div>

EC2 인스턴스 실행 중입니다.

이제 도커가 설치되었고 실행 중이므로 도커 이미지와 컨테이너를 사용하여 프로젝트 배포를 시작하겠습니다.

해당 프로젝트는 Python과 Django를 이용한 간단한 할 일 애플리케이션이며 해당 소유자에 의해 소유되었습니다.

프로젝트의 GitHub 저장소 링크를 확인해보세요:

[프로젝트의 GitHub 저장소](Link to project’s GitHub repository)

<div class="content-ad"></div>

우리는 우선 인스턴스를 시작하고, 해당 인스턴스를 연결할 것입니다.


![Docker Project for DevOps](/assets/img/2024-07-06-DockerProjectforDevops_1.png)


저는 도커가 실행 중인 EC2 인스턴스에 있으니, 먼저 projects라는 새 폴더를 만들겠고, 그 안에 프로젝트를 복제할 것입니다.

사용된 명령어: 

<div class="content-ad"></div>

```js
mkdir projects

git clone https://github.com/shreys7/django-todo.git
```

![2024-07-06-DockerProjectforDevops_2.png](/assets/img/2024-07-06-DockerProjectforDevops_2.png)

그 다음 단계는 Dockerfile을 생성하는 것입니다.

Dockerfile은 컨테이너를 만들기 위한 일련의 지침입니다. Docker에게 기본 이미지를 사용할 지, 어떤 명령을 실행할 지, 어떤 파일을 포함할 지를 알려줍니다. 예를 들어, 웹사이트를 위한 컨테이너를 만든다면 Dockerfile은 Docker에게 공식 웹 서버 이미지를 사용하고, 웹사이트 파일을 컨테이너에 복사하며, 컨테이너가 시작될 때 웹 서버를 시작하도록 지시할 수 있습니다.


<div class="content-ad"></div>

도커 파일에서 자주 사용되는 명령어에 대해 알아보세요.

이전에 우리 애플리케이션의 설정을 변경해야 합니다. 호스트 머신의 IP 주소가 애플리케이션에 액세스할 수 있도록 해야 합니다. 이를 위해 todoApp 폴더의 settings.py 파일을 수정할 것입니다.

![이미지1](/assets/img/2024-07-06-DockerProjectforDevops_3.png)

![이미지2](/assets/img/2024-07-06-DockerProjectforDevops_4.png)

<div class="content-ad"></div>

우리는 허용된 호스트를 찾아 그 값을 *로 추가할 것이며, 이는 모든 IP 주소가 우리의 애플리케이션에 접근할 수 있도록 허용합니다.

이렇게 해서 호스트 설정을 수정했습니다.

<div class="content-ad"></div>

보안 그룹을 수정하여 다음 규칙을 추가하여 해당 포트를 열 수 있도록 허용합니다.

![이미지](/assets/img/2024-07-06-DockerProjectforDevops_6.png)

이 규칙을 추가하고, 나는 포트 8000을 통해 응용 프로그램에 액세스 할 것입니다. 다른 포트를 사용해도 괜찮습니다.

이후에는 Dockerfile을 생성할 것입니다. 프로젝트 저장소에서 다음 명령을 실행하세요.

<div class="content-ad"></div>

```shell
nano Dockerfile
```

내용

```js
FROM python:3

RUN pip install django==version

COPY . .

RUN python manage.py migrate

CMD ["python","manage.py","runserver","0.0.0.0:8000"]
```

이제 이를 바탕으로 Docker 이미지를 만들겠습니다.

<div class="content-ad"></div>

도커 이미지는 도커 컨테이너에서 코드를 실행하는 데 사용되는 파일입니다. 도커 이미지는 도커 컨테이너를 만들기 위한 일련의 명령어로, 일종의 템플릿 역할을 합니다. 또한, 도커 이미지는 도커를 사용할 때의 출발점이기도 합니다. 이미지는 가상 머신 환경에서 스냅샷과 비슷합니다.

도커 이미지에 대해 더 알아보려면 [도커 이미지](링크)를 참고하세요.

해당 도커 파일로부터 도커 이미지를 생성하기 위해서는 아래 명령어를 사용합니다.

```bash
sudo docker build . -t tag_name
```

이제 여행하는 느낌이 나시죠! 마치 새로운 세계를 탐험하는 듯한 기분이에요. 언제든지 다른 정보가 필요하시면 물어보세요. 함께 즐거운 여행이 되도록 도와드릴게요. 😊✈️🌏

<div class="content-ad"></div>

파일을 실행하면 도커 파일이 시작됩니다.

![도커 프로젝트 이미지](/assets/img/2024-07-06-DockerProjectforDevops_7.png)

작업을 완료하면 고유한 ID를 가진 새 도커 이미지가 생성됩니다.

![도커 프로젝트 이미지](/assets/img/2024-07-06-DockerProjectforDevops_8.png)

<div class="content-ad"></div>

가용한 도커 이미지를 확인하려면 다음 명령을 사용합니다.

![도커 이미지](/assets/img/2024-07-06-DockerProjectforDevops_9.png)

다음으로는 이미지를 사용하여 도커 컨테이너를 실행하는 작업을 해야 합니다.

```js
#sudo docker run -p 포트 [컨테이너아이디]
sudo docker rum -p 8000:8000 9aad7bec8d9e
```

<div class="content-ad"></div>

도커 컨테이너를 실행하면 애플리케이션이 실행됩니다.

다음 링크를 통해 애플리케이션에 접근할 수 있습니다.

```js
http://matchine_public_ip/port_no
```

<div class="content-ad"></div>

/assets/img/2024-07-06-DockerProjectforDevops_10.png

도커 컨테이너를 사용하여 어플리케이션을 가상 서버에 배포하는 방법을 알려 드렸습니다. 

도커를 사용하여 컨테이너화된 어플리케이션을 성공적으로 배포하셨군요. 

이해에 어려움을 겪으신다면 아래 링크를 방문해 보세요: [링크1](link1), [링크2](link2)

<div class="content-ad"></div>

읽어 주셔서 감사합니다.