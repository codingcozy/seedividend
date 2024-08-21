---
title: "DevOps 엔지니어를 위한 도커 프로젝트 Day15"
description: ""
coverImage: "/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_0.png"
date: 2024-07-10 02:22
ogImage:
  url: /assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_0.png
tag: Tech
originalTitle: "Docker Project for DevOps Engineers (Day15)"
link: "https://medium.com/@araizbinsaqib/docker-project-for-devops-engineers-day15-0579adfcd495"
isUpdated: true
---

![이미지](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_0.png)

안녕하세요 여러분!

이전에 우리가 다뤘던 주제는 '데브옵스 엔지니어를 위한 도커(Docker)' 였습니다. 아직 확인하지 않으셨다면 [여기]에서 확인해보세요.

오늘은 데브옵스 엔지니어를 위한 도커 프로젝트에 대해 알아보겠습니다. AWS EC2에서 도커를 사용하여 실제 프로젝트를 배포할 예정입니다.

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

EC2에 Docker 설치하기 (가이드)

SSH 클라이언트를 사용하여 EC2 인스턴스를 실행하려면 Docker가 설치되어 있어야 합니다. Docker 이미지와 컨테이너를 사용하여 프로젝트 배포를 시작하겠습니다. 이 프로젝트는 Python과 Django로 구축된 간단한 할 일 앱이며 해당 소유자에 의해 소유되었습니다.

[프로젝트의 GitHub 저장소 링크]

먼저 인스턴스를 시작한 다음에 연결하겠습니다.

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

![이미지](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_1.png)

# 간단한 웹 어플리케이션용 Dockerfile 만들기 (예: Node.js나 Python 앱)

로컬 머신에서 AWS EC2 인스턴스에 SSH 연결 중이기 때문에, 먼저 'projects'라는 새 폴더를 인스턴스에 만들고 그 안에 프로젝트를 복제할 것입니다.

```js
mkdir projects

git clone https://github.com/shreys7/django-todo.git
```

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

![이미지](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_2.png)

![이미지](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_3.png)

이전에는 응용 프로그램의 설정을 변경해야 합니다. 구체적으로, 호스트 머신의 IP 주소가 응용 프로그램에 액세스할 수 있도록 허용해야 합니다. 이를 위해 todoApp 폴더의 settings.py 파일을 수정해야 합니다.

```js
ubuntu@ip-172-31-18-249:~/projects/django-todo$ vi todoApp/settings.py
```

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

허용된 호스트를 찾아 \* 로 값을 추가할 거에요. 이는 모든 IP 주소가 애플리케이션에 액세스할 수 있게 해줍니다.

![이미지](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_4.png)

이제 호스트 설정을 수정했으므로, AWS 보안 그룹을 수정하여 다음과 같은 규칙을 추가해야 합니다.

![이미지](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_5.png)

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

이제 새로운 규칙을 추가할 거예요. 저는 포트 8003을 통해 애플리케이션에 접속할 거지만, 다른 포트를 사용해도 괜찮아요. 그 다음, Dockerfile을 생성할 차례에요. 프로젝트 저장소에서 아래 명령어를 실행해 주세요:

```js
vi Dockerfile
```

이제 Dockerfile을 사용하여 이미지를 빌드하고 컨테이너를 실행해 볼까요:

```js
vi Dockerfile
```

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

![Dockerfile](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_6.png)

이것은 Django 애플리케이션을 위한 컨테이너 환경을 설정하는 Dockerfile입니다. 각 줄을 살펴보겠습니다:

FROM python:3

- 이 명령은 Python 3가 이미 설치된 Ubuntu 이미지를 가져올 것입니다. 이 줄은 도커 컨테이너용 베이스 이미지를 설정합니다. 공식 Python 3 이미지를 Docker Hub에서 기본 이미지로 사용하도록 지정합니다.
- 이것은 사실상 OS가 Ubuntu인 가상 환경을 만듭니다.

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

```yaml
RUN pip install django==3.2

- 이 명령어는 Docker 컨테이너 내에 Django 버전 3.2를 설치합니다. RUN 명령어는 Docker 이미지 빌드 과정 중에 명령어를 실행합니다. 여기서는 pip(Python 패키지 설치 프로그램)를 사용하여 Django 버전 3.2를 설치합니다.

COPY . .

- 현재 디렉토리(도커 파일이 위치한 로컬 머신 상의 디렉토리)의 모든 파일을 Docker 이미지의 작업 디렉토리로 복사합니다(.은 현재 디렉토리를 의미합니다). 주로 Django 프로젝트 파일 및 필요한 설정을 포함시키기 위해 수행됩니다.
```

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

RUN python manage.py migrate

- 프로젝트 파일을 복사한 후, 이 명령어는 Docker 컨테이너 내부에서 Django의 manage.py migrate 명령어를 실행합니다. 이 명령어는 Django 프로젝트에 정의된 보류 중인 데이터베이스 마이그레이션을 적용합니다. 데이터베이스 스키마가 Django 모델과 최신 상태인지 확인합니다.

CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]

- 이 명령은 이 Docker 이미지로부터 컨테이너를 시작할 때 실행되는 기본 명령을 설정합니다. 이 명령은 Django 개발 서버 (manage.py runserver)를 호스트 0.0.0.0 (외부에서 접근할 수 있음) 및 포트 8002에서 실행합니다.

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

# 요약:

- Dockerfile은 Python 3 기본 이미지에서 시작합니다.
- Django 버전 3.2를 설치합니다.
- 로컬 프로젝트 파일을 Docker 이미지로 복사합니다.
- 데이터베이스 마이그레이션을 적용합니다.
- 컨테이너를 설정하여 포트 8002에서 Django 개발 서버를 실행합니다.

```js
docker build .
```

docker build .을 실행하면 Docker에게 Dockerfile이라는 파일에 제공된 지시 사항을 사용하여 Docker 이미지를 빌드하도록 지시합니다. 간단히 설명하면 다음과 같습니다:

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

- Dockerfile: 저희가 만들고자 하는 애플리케이션을 위한 환경 설정을 Docker에게 알려주는 레시피라고 생각해보세요.
- docker build .: 이 명령어는 Docker에게 현재 디렉토리 (.)에서 Dockerfile이라는 이름의 파일을 찾도록 하는 것입니다. Docker는 이 파일을 읽어서 환경에 무엇을 포함해야 하는지 파악합니다.
- 빌딩: Docker는 Dockerfile에 단계별로 지시된 대로 따라갑니다. 필요한 소프트웨어(예: Python이나 Django)를 설치할 수도 있고, 프로젝트 파일을 환경으로 복사하거나 응용 프로그램을 실행하기 위해 필요한 모든 것을 설정할 수도 있습니다.
- 결과: docker build .이 마친 후, Docker는 응용 프로그램과 그에 필요한 모든 의존성이 포함된 패키지화된 환경(이미지)를 만듭니다. 이 이미지는 응용 프로그램 설정의 스냅샷처럼 Docker가 설치된 모든 시스템에서 실행할 수 있는 것입니다.

요컨대, docker build .은 Docker에게 애플리케이션이 필요로 하는 모든 부품을 깔끔하고 휴대 가능한 패키지로 조립해 달라고 요청하는 것과 같습니다.

![이미지](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_7.png)

```js
sudo docker ps
```

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

아래 사진에서 강조된 숫자는 우리가 실행해야 하는 컨테이너 ID입니다.

![enter image description here](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_8.png)

명령어 sudo docker run -p 8002:8002 fac9825078e6을 살펴보겠습니다:

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

`sudo docker run` 명령어:

- `sudo`는 사용자가 필요한 권한을 가지고 있을 때 Docker 명령을 관리자 권한으로 실행하는 데 사용됩니다.
- `docker run`은 기존 Docker 이미지를 기반으로 새 Docker 컨테이너를 시작합니다.

`-p 8002:8002`:

- 이 옵션(`-p`)은 Docker 컨테이너와 호스트 머신 간 포트를 매핑하는 데 사용됩니다.
- `8002:8002`는 호스트의 포트 8002가 Docker 컨테이너 내의 포트 8002로 전달되도록 지정합니다.
- 이는 호스트 머신의 포트 8002로 보낸 모든 트래픽이 Docker 컨테이너 내의 포트 8002로 전달된다는 의미입니다.

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

이미지 태그(ID) 에 대한 설명입니다:

- Docker 컨테이너로 실행할 이미지의 고유 식별자(ID) 또는 이름입니다.
- Docker는 컨테이너를 시작할 때 사용할 올바른 이미지를 찾기 위해 이 ID를 사용합니다.

# 요약:

- sudo docker run -p 8002:8002 fac9825078e6는 지정된 이미지(fac9825078e6)를 기반으로 새 Docker 컨테이너를 시작합니다.
- 이 명령어는 로컬 머신의 포트 8002를 Docker 컨테이너 내부의 포트 8002에 매핑합니다.
- 이 명령어는 Docker 컨테이너 내에서 응용 프로그램 또는 서비스를 시작하여 호스트 머신의 포트 8002에서 접근할 수 있도록 합니다.

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

참고 사항으로 여기를 방문해 보세요

# 웹 브라우저에서 액세스하여 응용 프로그램이 예상대로 작동하는지 확인합니다

```bash
#sudo docker run -p ports [containerid]
sudo docker rum -p 8002:8002 fac9825078e6
```

이 명령을 실행하면 도커 컨테이너가 실행되어 결과적으로 우리 애플리케이션이 작동합니다.

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

![이미지](/assets/img/2024-07-10-DockerProjectforDevOpsEngineersDay15_9.png)

즐거운 학습이 되길 바랍니다:)
