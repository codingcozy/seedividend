---
title: "DockerHub에 나만의 Docker 이미지를 빌드하고 푸시하는 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_0.png"
date: 2024-07-10 02:51
ogImage: 
  url: /assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_0.png
tag: Tech
originalTitle: "A Step-by-Step guide to Build and Push Your Own Docker Images to DockerHub"
link: "https://medium.com/@komalminhas.96/a-step-by-step-guide-to-build-and-push-your-own-docker-images-to-dockerhub-709963d4a8bc"
isUpdated: true
---




# 개요

도커는 소프트웨어 및 모든 종속성을 포함하여 소프트웨어를 패키징하고 배포하는 것을 쉽게 만들어 애플리케이션을 배포하는 방법을 혁신적으로 바꿨습니다. 도커는 미리 빌드된 이미지의 방대한 저장소를 제공하지만, 귀하의 특정한 요구에 맞게 맞춤형 도커 이미지를 만드는 것에 상당한 가치가 있습니다. 이 가이드에서는 처음부터 시작하여 직접 컨테이너 이미지를 만드는 과정을 안내하고, 그것을 Docker Hub에 게시하는 방법을 탐구할 것입니다. 저희는 nginx를 통해 웹 페이지를 제공하는 작은 웹 서버인 도커 이미지를 만들 것입니다.

# 그런데 도커가 뭔가요?

도커는 소프트웨어를 표준화된 단위인 컨테이너로 패키징하여 소프트웨어가 실행되기 위한 모든 것(라이브러리, 시스템 도구, 코드, 런타임)을 가지고 있는 소프트웨어 플랫폼입니다. 호스트에 설치된 것에 의존하지 않아도 되기 때문에, 도커를 사용하면 빠르고 쉽게 애플리케이션을 배포하고 확장할 수 있으며 코드가 제대로 실행될 것이라는 확신을 가질 수 있습니다. 이로써 "내 컴퓨터에서는 잘 작동하는데" 문제를 피할 수 있는데요.

<div class="content-ad"></div>

![How Docker works — A simple explanation](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_0.png)

도커(Docker)는 컨테이너를 위한 운영 체제입니다. 코드를 실행하는 표준 방법을 제공함으로써 작동합니다. 가상 머신이 서버 하드웨어를 가상화하는 방식과 유사하게, 컨테이너는 서버의 운영 체제를 가상화합니다. 도커는 각 서버에 설치되어 빌드, 시작 또는 중지하는 데 사용할 수 있는 간단한 명령을 제공합니다.

![How Docker works — A simple explanation](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_1.png)

<div class="content-ad"></div>

# 실행

# Dockerfile 만들기

먼저 Dockerfile을 만드는 것부터 시작해 봅시다. Dockerfile은 Docker 이미지를 빌드하는 지시 사항을 포함하는 스크립트입니다. 이는 귀하의 이미지를 만들기 위한 청사진과 같은 역할을 합니다.

먼저 Visual Studio Code에서 새 디렉토리인 "example-docker-project"를 만들고 해당 디렉토리를 엽니다. 그리고 "Dockerfile"이라는 새 파일을 생성해주세요. 만약 필요하다면 저의 레포지토리인 https://github.com/komal-max/Build-and-Push-Your-Own-Docker-Images 를 참고하실 수도 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_2.png" />

도커의 대부분 이미지는 다른 이미지를 기반으로 만들어집니다. 대부분은 리눅스 이미지를 기반으로 합니다. '우분투'와 같이 이미지를 명시할 수 있는데, 이는 우분투의 모든 종속성을 갖춘 좋은 출발점을 제공할 것입니다. 그러나 이 프로젝트에서 웹 서버를 만드는 경우처럼, 우리는 보다 작은 것인 Nginx에서 시작하는 것이 좋습니다. Nginx를 기본 이미지로 설정하면 실제로 Dockerhub(https://hub.docker.com/_/nginx)에서 온 것입니다. 여기에서 버전 태그, 버전 없는 태그 및 Perl과 같은 추가 종속성이 포함된 일부 태그, 또는 완전히 다른 기본 이미지를 기반으로 한 것인 Alpine 같은 것을 볼 수 있습니다. 이 이미지에 Dockerhub에서 볼 수 있는 어떤 태그도 추가할 수 있습니다. 저의 경우 'latest' 태그를 사용했지만, 이미지 크기를 줄이고 싶다면 'alpine'을 선택하는 것이 더 좋습니다. 차이를 보려면 터미널에서 'docker images' 명령을 사용하면 이미지 크기의 상당한 차이를 볼 수 있습니다.

<img src="/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_3.png" />

다음으로 COPY 명령을 사용하게 됩니다. COPY 명령을 사용하면 호스트 머신의 파일을 실제 이미지로 복사할 수 있습니다. 즉, 웹 사이트나 정적 페이지를 복사할 수 있습니다. 이를 위해 먼저 소스 폴더를 만들고 그 소스 폴더 안에 html이라는 새 폴더를 만들고 그 안에 index.html을 만듭니다. 깃허브 저장소의 간단한 HTML 파일을 자유롭게 사용해주세요. 예시를 위해 최소한으로 유지하였지만, 원하는 대로 사용자 정의할 수 있습니다. 웹페이지에 이미지 또한 추가할 수 있습니다.

<div class="content-ad"></div>

이제 Dockerfile로 돌아가서, COPY 명령은 두 개의 매개변수, 즉 소스와 대상을 가져야 합니다.

다음으로, 포트 80을 노출할 수 있지만, 이미지를 사용할 때 원하는 포트로 노출할 수 있으므로 이 단계는 건너뛸 수 있습니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_6.png)

다음으로, entrypoint를 위한 명령어를 정의해야 합니다. 우리는 매개변수의 배열 형태로 몇 가지 인자를 전달하길 원합니다.

![이미지](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_7.png)

# 이미지를 만드는 방법은?

<div class="content-ad"></div>

터미널을 열고 docker --version 또는 docker info와 같은 명령어를 사용해서 도커가 설치되어 있는지 확인해보세요. 만약 설치되어 있지 않다면 https://docs.docker.com/get-docker/ 에서 도커를 설치해야 해요.

도커 파일이 있는 폴더로 이동해주세요.

![이미지](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_8.png)

이제 해당 도커 파일이 있는 폴더로 이동해주세요.

![이미지](/assets/img/2024-07-10-AStepby-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_9.png)

<div class="content-ad"></div>

도커 이미지를 만드는 방법은 다음과 같아요: docker build -t `이미지 이름` `도커 파일이 있는 디렉토리 경로(현재 디렉토리이므로 .을 사용합니다)`  

![도커 이미지 만들기](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_10.png)

만들어진 이미지를 확인하려면 docker images  

![도커 이미지 확인하기](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_11.png)

<div class="content-ad"></div>

이제 컨테이너를 생성하는 방법을 알아보겠습니다.

이미지가 컨테이너로 변환되는 방법은 다음과 같습니다:


docker run -d (또는 데몬) -p (내부의 포트 80을 외부의 포트 80에 노출할 때) `이미지 ID`


실행 중인 Docker 컨테이너를 확인하려면 `docker ps`를 사용하세요.

<div class="content-ad"></div>

이제 웹페이지를 확인하려면 브라우저로 이동하여 localhost를 입력하면 다음과 비슷한 것을 볼 수 있습니다:

![image13](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_13.png)

대단해요! 이제 우리가 만든 이미지를 기반으로 실행되는 도커 컨테이너가 있습니다. nginx를 기반으로 만든 이미지를 만들었고, html 파일을 만들었으며 몇 가지 이미지를 추가하여 컨테이너 내에 넣었고, 이를 통해 파일을 제공하는 것을 확인했습니다. 이는 docker를 지원하는 모든 기기에서 작동할 것입니다. Windows, Mac 또는 Linux를 실행하는 컨테이너 엔진이 작동 중이라면 동일하게 실행되고 작동할 것입니다.

<div class="content-ad"></div>

# 컨테이너를 중지하거나 도커 이미지를 제거하는 방법

컨테이너를 중지하려면 다음 명령어를 사용할 수 있습니다: `docker stop 컨테이너 아이디`

중지된 컨테이너를 시작하려면 다음 명령어를 사용할 수 있습니다: `docker start 컨테이너 아이디`

모든 도커 컨테이너를 나열하려면 (중지된 컨테이너 포함) 다음과 같이 사용하세요: `docker ps -a`

<div class="content-ad"></div>

컨테이너를 삭제하려면: docker rm `컨테이너 ID`

![image](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_14.png)

도커 이미지를 삭제하려면: docker rmi `이미지 ID`

도커 이미지가 더 이상 존재하지 않는지 확인하려면: docker images

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_15.png)

# .dockerignore 파일이 무엇인가요?

.dockerignore 파일은 도커에서 사용되는 설정 파일로, 도커 이미지를 빌드할 때 제외해야 하는 파일 및 디렉토리를 지정하는 데 사용됩니다. 이 파일은 Git의 .gitignore와 유사하게 작동하여 이미지 빌드 과정 중 제외해야 하는 파일 또는 디렉토리에 대한 패턴을 정의할 수 있습니다. .dockerignore 파일에서는 일반적으로 artifacts(아티팩트), builds(빌드), errors(에러)와 같은 우리가 컨테이너 내부에 넣고 싶지 않은 내용을 확인할 수 있습니다.

.dockerignore가 어떻게 도움이 되는지 예시를 들어보면, 민감한 내용인 비밀번호가 포함된 파일을 source/html 폴더에 넣는다고 가정해봅시다. 만약 .dockerignore를 사용하지 않고 도커 빌드를 실행하면, 도커 빌드는 source/html의 모든 것(민감한 파일 포함)을 복사하여 이미지 안에 넣게 됩니다. 이는 해당 파일이 이미지 안에 존재하며 컨테이너를 실행시키는 모든 사용자가 해당 파일을 볼 수 있다는 것을 의미합니다.

<div class="content-ad"></div>

` sensitive.txt ` 파일을 생성한 후 다음 단계를 따라 새 이미지를 빌드합니다.

1. `docker build` 명령을 사용하여 새 이미지를 빌드합니다.
2. `docker run` 명령을 사용하여 이미지를 컨테이너로 실행합니다.
3. 컨테이너로 실행을 하고 나서 `sensitive` 파일의 내용이 보이는 것을 확인할 수 있습니다.

`sensitive` 파일이 보이는 것을 수정하려면, 먼저 해당 컨테이너를 중지하고 제거합니다. 그런 다음 `.dockerignore` 파일을 만들고 패턴 `\*/sensitive.txt`를 사용하여 파일 이름 `sensitive.txt`를 추가합니다. 이렇게 하면 프로젝트 디렉토리나 하위 디렉토리에 `sensitive.txt` 파일이 있더라도 `.dockerignore` 파일에 `\*/sensitive.txt`를 추가하면 Docker가 최종 Docker 이미지에 포함하지 않도록 막을 수 있습니다. 이중 별표(`**`)는 글로브스타(globstar) 패턴으로, 0개 이상의 디렉토리 및 하위 디렉토리에 일치하는 것을 나타냅니다. `.dockerignore`에서의 컨텍스트에서는 사실상 "어떤 디렉토리나 하위 디렉토리"를 의미합니다.

<div class="content-ad"></div>

![마법을 볼 준비가 되었습니다!](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_18.png)

이제 `.dockerignore`의 마법을 확인해볼 차례입니다. 새로운 도커 이미지를 생성하고 컨테이너를 실행한 뒤에 `exec`을 통해 컨테이너에 들어가보면 `sensitive.txt` 파일이 더 이상 보이지 않습니다.

![Docker Hub로 도커 이미지 푸시하기](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_19.png)

# Docker 이미지를 Docker Hub로 푸시하기

<div class="content-ad"></div>

도커 허브에 이미지를 푸시하려면 먼저 도커 허브에서 새 저장소를 만드실 수 있어요. 도커 허브 계정에 로그인한 다음 `저장소 만들기`를 클릭하셔서 저장소 이름을 지정하고 공개 또는 비공개로 설정하신 후에 '만들기'를 클릭해 주세요.

이후에 푸시하고 싶은 이미지에 태그를 붙이세요: docker tag `이미지 이름` `도커허브 계정 이름` `저장소 이름` `버전`

그 이미지에 태그를 붙인 후에는 도커에 로그인해서 docker login을 입력하시고 자격 증명을 입력해 주세요.

![이미지](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_20.png)

이미지 출처: GettyImages

<div class="content-ad"></div>

이제 이미지를 푸시하려면 다음을 사용하세요: docker push `이미지 이름` `버전 이름`

![이미지](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_21.png)

도커 허브에서 이미지가 푸시되었는지 확인할 수 있습니다.

![이미지](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_22.png)

<div class="content-ad"></div>

또한, 이미지를 끌어오는 방법을 확인하고 싶다면, Public View를 클릭하여 Docker Pull 명령어를 볼 수 있습니다.

![Docker Image](/assets/img/2024-07-10-AStep-by-StepguidetoBuildandPushYourOwnDockerImagestoDockerHub_23.png)

# 결론

이 프로젝트에서는 도커 파일을 만들고, 베이스 이미지로 이동하며, 웹페이지를 만들고, 직접 만든 간단한 웹페이지를 제공하는 우리 자신의 사용자 정의 도커 컨테이너를 빌드하는 방법에 대해 알아봤습니다.

<div class="content-ad"></div>

도커를 사용하면 코드를 더 빠르게 배포할 수 있고 애플리케이션 운영을 표준화하며 코드를 신속하게 이동시켜 리소스 활용을 개선하여 비용을 절약할 수 있어요. 도커를 사용하면 어디에서든 안정적으로 실행할 수 있는 단일 객체를 얻을 수 있어요. 도커의 간단하고 직관적인 구문을 통해 완전한 제어권을 얻을 수 있어요. 넓은 채택률은 도커와 함께 사용할 준비가 된 다양한 도구와 바로 사용 가능한 응용 프로그램이 있는 강력한 생태계를 의미해요. 그러니 마음껏 실험하고 도커 컨테이너화의 무한한 가능성을 발견해 보세요.

이 간단하지만 흥미로운 도커 프로젝트에 참여해 주셔서 감사합니다. 이 프로젝트를 개선할 점이 있다고 생각하거나 문제를 발견하거나 어려움에 부딪히면 언제든지 알려 주세요. 또한 이 프로젝트에 영감과 지침을 얻은 참고 자료 목록을 추가하겠습니다 👏.

컨테이너화하는 즐거운 시간 되세요!

# 참고 자료

<div class="content-ad"></div>

- [유튜브 링크](https://www.youtube.com/watch?v=SnSH8Ht3MIc)
- [깃헙 링크](https://github.com/komal-max/Build-and-Push-Your-Own-Docker-Images)
- [AWS Docker 페이지](https://aws.amazon.com/docker/)
- [Docker 시작하기 문서](https://docs.docker.com/get-started/overview/)
- [Docker 허브](https://hub.docker.com/)