---
title: "ASPNet Core Web API와 React 웹 애플리케이션 Docker로 배포하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_0.png"
date: 2024-07-09 11:04
ogImage: 
  url: /assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_0.png
tag: Tech
originalTitle: "Dockerize ASP.Net Core Web API and React Web Application"
link: "https://medium.com/@fsilva0703/dockerize-asp-net-core-web-api-and-react-web-application-d180d8ce44b0"
isUpdated: true
---




백엔드와 프런트엔드를 도커 이미지로 만들어 한 컨테이너 안에서 실행하는 가장 간편한 방법을 소개해드릴게요.

과거에는 누군가 도커 컨테이너에 대해 이야기할 때마다, 새로운 것에 대한 무지 때문에 조금 두렵고 배워볼까 망설이기도 했어요. 그러나 요즘 도커의 강력함과 도움이 얼마나 큰지 알게 되면, 이젠 이것을 이용함으로써 얻을 수 있는 이점과 편의성, 그리고 어떻게 하면 더 쉽고 간편하게 생활할 수 있는지를 발견할 거예요.

어플리케이션을 특정 환경에서 실행할 수 있도록 설정하고 배포하고 맞추는 데 많은 시간을 들이는 대신, 필요한 모든 종속성과 설정을 쉽게 설치하고 실행하기만 하면 됩니다. 다시 말해, 개발하는 과정에서 이 어려운 부분에 대해 걱정할 필요가 없는 거예요.

도커 사용의 장점 중 일부를 강조해보자면:

<div class="content-ad"></div>

- 독립성: 도커는 응용 프로그램이 배포된 위치에 관계없이 동일한 환경에서 실행되도록 보장합니다. 이를 통해 "내 컴퓨터에서는 잘 작동한다" 문제를 제거합니다.

- 환경 복제: 개발, 테스트 및 프로덕션 환경을 쉽게 복제할 수 있습니다.

- 단일 이미지: 응용 프로그램과 모든 종속성을 하나의 도커 이미지로 패키징하여 일관되게 배포할 수 있습니다.
- CI/CD 통합: 자동 테스트, 빌드 및 배포를 위한 CI/CD 파이프라인과의 원활한 통합.

- 마이크로서비스: 도커는 마이크로서비스 아키텍처에 적합하며 애플리케이션의 다른 부분을 독립적으로 확장할 수 있습니다.
- 부하 분산: API의 여러 인스턴스를 쉽게 배포하고 성능과 신뢰성을 높이기 위해 부하 분산을 사용할 수 있습니다.

- 가벼움: 도커 컨테이너는 가상 머신과 비교하여 가벼우며 호스트 OS 커널을 공유하고 더 적은 리소스를 사용합니다.
- 이식성: 컨테이너는 도커를 지원하는 모든 시스템에서 실행될 수 있어 다른 환경으로 애플리케이션을 이동하기가 더 쉬워집니다.

<div class="content-ad"></div>

- 프로세스 격리: 컨테이너는 프로세스 격리를 제공하여 응용 프로그램이 서로 간섭하지 않도록 보장합니다.
- 보안: 컨테이너는 특정 보안 정책으로 구성할 수 있어 공격 표면을 줄입니다.

- 의존성 번들링: 컨테이너 내에 모든 필요한 의존성이 번들링되어 있어, 응용 프로그램이 실행에 필요한 모든 것을 항상 갖추고 있는 것을 보장합니다.
- 버전 관리: 응용 프로그램과 해당 의존성의 다른 버전을 더 효과적으로 관리할 수 있습니다.

- 빠른 설정: 개발자는 도커를 사용하여 빠르게 개발 환경을 설정할 수 있어, 입사에 필요한 시간을 줄일 수 있습니다.
- 일관된 개발 환경: 모든 개발자가 동일한 환경에서 작업하도록 보장하여 환경 특정 버그를 줄입니다.

- 자동화된 테스트: 생산 환경과 유사한 테스트 환경을 쉽게 자동화하여 더 신뢰할 수 있는 테스트를 할 수 있습니다.
- 일회성 환경: 필요할 때 테스트 환경을 빠르게 생성하고 제거함으로써 비용을 줄입니다.

<div class="content-ad"></div>

- 버전 관리된 이미지: Docker 이미지를 버전별로 쉽게 관리하여 이전 버전의 응용 프로그램으로 되돌릴 수 있습니다.
- 재해 복구: 안정적인 컨테이너 이미지를 재배포하여 고장으로부터 빠르게 회복할 수 있습니다.

- 멀티 플랫폼 지원: Docker는 여러 플랫폼을 지원하여 ASP.NET Core 애플리케이션을 다양한 OS에서 개발 및 테스트할 수 있습니다.

지금은 Docker를 사용하는 장점을 알게 되었으니, 사용 방법을 알아보도록 합시다!

P.S.: 이 링크에서 Docker Desktop을 설치해 봅시다: Docker Desktop: 개발자를 위한 #1 컨테이너화 도구 | Docker

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_0.png)

ASP.NET Core Web API를 실행하는 Docker 컨테이너의 운영 체제로 Linux를 사용하는 것은 여러 가지 장점이 있습니다. 

- 일반적으로 Linux 컨테이너는 Windows 컨테이너보다 가볍고 효율적입니다. 더 적은 리소스를 필요로 하며 빠르게 시작할 수 있어 성능이 향상되고 호스팅 비용을 낮출 수 있습니다.

따라서 프로젝트를 생성한 직후에 Dockerfile이 자동적으로 프로젝트의 루트에 추가됩니다.

<div class="content-ad"></div>

우리 프로젝트에 "Dockerfile"이 추가될 때 기본적으로 추가된 명령어와/또는 구성을 식별하기 위해 파일을 열어보겠습니다.

우리는 현재 프로젝트 "Card.Api"에 포함된 구성을 기본적으로 컨테이너에 포함되어 있는 것을 알 수 있습니다. 때로는 올바른 경로를 설정하기 위해 기본 구성을 약간 변경해야 하거나 다른 프로젝트를 추가해야 하는 경우도 있습니다. 우리의 경우에는 의존 프로젝트를 동일한 컨테이너에 추가하기 위해 변경 사항을 구현해야 합니다.

<div class="content-ad"></div>

![2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_3.png](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_3.png)

그래서,이 샘플에는 Card.API 프로젝트 외에도 추가로 Docker에 추가하려는 2개의 프로젝트(Card.Domain 및 Card.Infra)가 있습니다. 이를 위해 Dockerfile을 다시 열어서 강조된 줄에서 볼 수 있듯이 필요한 설정을 추가해야 합니다. 우리는 포트 80과 443을 노출하고 있으며, 해당 포트를 통해 HTTP 프로토콜용 포트 80과 HTTPS용 포트 443에서 API가 실행될 것임을 나타내고 있습니다.

![2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_4.png](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_4.png)

![2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_5.png](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_5.png)

<div class="content-ad"></div>

![이미지1](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_6.png)

![이미지2](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_7.png)

이 기능이 추가되면, Visual Studio Solution Explorer에 docker-compose 프로젝트와 docker-compose.yml 파일이 추가됩니다.

![이미지3](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_8.png)

<div class="content-ad"></div>

그럼 모든 것이 준비된 것 같으니, 이제 docker-compose.yml 파일을 살펴보고 프로젝트를 배포하는 동안 우리가 무엇을 업하려는지 분석해 보겠습니다. 하지만, 그 전에 도커 컴포즈에서 어떤 종류의 구성을 가질 수 있는지 알아보겠습니다.

Services: 이는 귀하의 애플리케이션을 형성하는 독립적인 컨테이너입니다. 각 서비스는 특정 도커 이미지를 기반으로하며 고유한 구성, 환경 변수, 포트 및 기타 설정을 가질 수 있습니다. 이 글의 목적은 백엔드와 프런트엔드를 동일한 컨테이너에서 업 하는 방법을 가르치는 것이므로, 두 개의 서비스가 정의될 것입니다.

Networks: 사용자 정의 네트워크를 정의하여 서비스를 연결할 수 있으며, 이를 통해 컨테이너 간 제어된 통신이 가능합니다.

Volumes: 볼륨을 생성하여 컨테이너에 영구 저장소를 제공할 수 있습니다. 이를 통해 데이터를 컨테이너 외부에 저장하고 여러 서비스 간에 공유할 수 있습니다.

<div class="content-ad"></div>

의존성: 서비스 간 관계와 의존성을 정의할 수 있습니다. 예를 들어, 웹 서비스는 데이터베이스 서비스에 의존할 수 있습니다. 구체적으로 이 프로젝트에서는 데이터베이스로 SQLite를 메모리에 사용하고 있지만, 일반 SQL Server 데이터베이스를 사용하는 경우 데이터베이스를 서비스 의존성으로 설정할 수 있습니다.

빌드 컨텍스트: 서비스에 대한 사용자 정의 이미지를 빌드하려면 빌드 컨텍스트와 Dockerfile 경로를 지정할 수 있습니다. docker-compose.yml 파일을 열면 됩니다.

![image](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_9.png)

그럼, 우리의 docker-compose.yml 파일에서 구조가 만들어졌습니다. "Services" 정의부터 시작해봅시다: 계층 구조를 따라가면 백엔드 및 프론트엔드 프로젝트가 "card.api" 및 "card.front"로 서비스로 정의된 것을 보실 수 있습니다. card.api 서비스 아래에 사용할 이미지 이름도 정의되어 있습니다. 도커가 실행될 때 사용할 이미지 이름이므로 $'DOCKER-REGISTRY-' + 서비스 이름 card.api와 같이 되어야 합니다. 그 다음으로는 백엔드를 위해 5000:80으로 포트를 정의한 것을 볼 수 있습니다. API를 실행할 것이며, 그 후에는 API에서 사용할 변수를 저장하는 환경변수들을 정의하고 있습니다. 로그인, 비밀번호, jwt_key 등과 같이 API에서 사용하는 변수들을 저장하는 것입니다. 그 다음은 API를 시작하는 명령을 정의하는 진입점입니다. 마지막 단계는 실행할 Dockerfile 경로를 정의해야 하는 빌드/컨텍스트입니다.

<div class="content-ad"></div>

그럼... 프론트엔드 쪽과 비슷한 설정을 가지고 있지만 할 작업이 더 적어요. 하지만 도커 컨테이너에서 두 개의 서비스를 실행하기로 계획 중이니, 먼저 프론트엔드 프로젝트로 가서 Dockerfile을 추가해야 합니다. 그러면 docker-compose.yml이 의도한 대로 읽고 이해할 수 있을 거에요.  

![이미지](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_10.png)  

파일을 열어서 프론트엔드 프로젝트를 올바르게 실행하기 위해 필요한 설정을 포함시킵시다.  

![이미지](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_11.png)  

<div class="content-ad"></div>

여행 전문가분들, 여기 한 가지 팁을 드릴게요. React 프로젝트를 실행하는 도중에 이미지 다운로드를 하기 위해 첫 번째 줄을 사용하고 있습니다. node:16-alpine이나 원하시는 다른 이미지를 사용하세요. WORKDIR은 기본적으로 /app을 사용하며, COPY 명령어는 프론트엔드를 위해 생성한 이미지로 packge.json과 yarn.lock 파일을 복사하는 데 필수적입니다. "yarn install" 명령어를 실행하여 프로젝트의 모든 종속성을 설치하고, 코드를 이미지로 복사하기 위해 COPY를 사용하며, EXPOSE로는 프론트엔드를 실행할 때 정의한 포트 3000을 사용하고 있고 마지막으로 CMD는 프론트엔드 프로젝트를 시작하는 명령어입니다.

이제 프론트엔드 프로젝트에 Dockerfile이 구성되어 있기 때문에, docker-compose.yml 파일로 돌아가서 빠르게 뭔가 빠트리지 않았는지 확인해봅시다. 이 시점에서는 서비스명, "card.front", 빌드 경로인 front-end 경로 (../../FRONT)와 Dockerfile, 포트 (3000), 그리고 환경을 설정해야 합니다. 우리의 경우에는 개발 환경을 사용하고 있습니다.

여러분, 이 글에서 설명된 대로 모두 완료했다면, Docker Desktop이 백그라운드에서 실행 중인지도 확인해주세요. 이제 도커 프로젝트를 시작해봅시다. 여러분의 프로젝트는 아래 사진처럼 이렇게 나와야 합니다. Docker Compose를 사용하여 프로젝트를 시작할 수 있는 옵션이 제공되는 모습이에요: 

![이미지](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_12.png)

<div class="content-ad"></div>

필요한 대로 모든 것이 구성되었다면, 앱을 실행할 때 비주얼 스튜디오가 다음 사진처럼 나타날 것입니다. 왼쪽에 실행 중인 컨테이너와 환경을 구축하는 동안 기록된 로그가 나타난다는 점을 주의하세요:

![이미지](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_13.png)

이제 우리의 Docker Desktop을 확인해보겠습니다. 컨테이너와 이미지가 예상대로 구축되고 실행되었는지 확인하기 위해서입니다.

![이미지](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_14.png)

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_15.png)

마지막으로 프로젝트가 제대로 작동하는지 확인해봐야 해요. 아래 링크를 실행하여 Swagger를 열어봅시다: http://localhost:5000/swagger/index.html 및 http://localhost:3000.

![이미지](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_16.png)

![이미지](/assets/img/2024-07-09-DockerizeASPNetCoreWebAPIandReactWebApplication_17.png)

<div class="content-ad"></div>

여러분, 이만큼입니다! 읽어 주셔서 감사합니다. 조금이라도 도움이 되었으면 좋겣네요. 다음 기사에서 만나요! 🌟