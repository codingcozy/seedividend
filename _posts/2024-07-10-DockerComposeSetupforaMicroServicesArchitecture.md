---
title: "마이크로서비스 아키텍처를 위한 Docker Compose 설정 방법"
description: ""
coverImage: "/assets/img/2024-07-10-DockerComposeSetupforaMicroServicesArchitecture_0.png"
date: 2024-07-10 02:18
ogImage: 
  url: /assets/img/2024-07-10-DockerComposeSetupforaMicroServicesArchitecture_0.png
tag: Tech
originalTitle: "Docker Compose Setup for a MicroServices Architecture"
link: "https://medium.com/gitconnected/docker-compose-setup-for-a-microservices-architecture-f47902dadcae"
isUpdated: true
---




## 클릭 한 번에 하나의 호스트에서 여러 서비스를 배포하고 통합하기

![alt text](/assets/img/2024-07-10-DockerComposeSetupforaMicroServicesArchitecture_0.png)

간단한 React 앱 프론트 엔드를 넘어 복잡한 애플리케이션 아키텍처가 있다면 어떨까요? 백엔드나 여러 백엔드 서비스가 있는 마이크로서비스 아키텍처일 수도 있습니다. 이러한 시스템을 로컬에서 테스트하는 것은 도전일 수 있습니다. 이러한 서비스는 일반적으로 프로덕션 환경에서 쿠버네티스 클러스터 등에 배포되기 때문입니다. Docker를 사용하면 이러한 분산을 시뮬레이션하는 로컬 환경을 만들 수 있습니다. 이 솔루션은 도커 컴포즈 구성을 사용하여 복잡한 로컬 테스트 인프라를 만드는 "원 클릭" 설정을 제공합니다. nginx 프록시를 사용하여 이를 활용하면 다수의 서비스를 한 서버에 호스트하고 80번 포트(HTTP 프로토콜에 일반적으로 사용되는 포트)를 통해 제공할 수도 있습니다. 이를 통해 한 노드에서 복잡한 웹사이트를 배포할 수 있습니다.

## 따라하기 위한 설정하기

<div class="content-ad"></div>

도커 컴포즈를 사용하여 단일 포트에서 풀 스택 애플리케이션을 호스팅할 때의 사용 예시로 이전 포스트에서 구글 로그인 애플리케이션을 구현할 것입니다. 이 애플리케이션의 코드는 주어진 깃 저장소에서 찾을 수 있지만, 이 애플리케이션의 구성에 대해 더 알고 싶다면 원래의 포스트를 참조해주세요.

자, 이제 이 저장소를 클론해주세요. 적절히 구현하려면 시스템에 Node.js와 Java가 설치되어 있어야 합니다. SQL 설치는 필요하지 않으며, 도커 컴포즈가 처리할 것입니다.

단순한 데모만 보고 싶다면 그 다음 섹션으로 건너뛰세요. 여전히 frontend 리액트 애플리케이션은 localhost:8080을 통해, backend 스프링 부트 애플리케이션은 localhost:8080/api를 통해 접근할 수 있지만 의도된대로 상호 작용하지는 않을 것입니다.

이 애플리케이션이 완전히 작동하려면 약간의 설정이 더 필요합니다. 구글 OAuth 동의 화면을 구성해야 하는데, 이 과정은 내 구글 OAuth 기사에서 자세히 설명되어 있습니다. 간단히 말하면 이 동의 화면 구성을 동일하게 사용할 수 있습니다. 그러나 이제 애플리케이션을 8080 포트에서 호스팅하고 있으므로, 승인된 JavaScript 출처와 리디렉트 URI를 다음과 같이 업데이트해야 합니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-10-DockerComposeSetupforaMicroServicesArchitecture_1.png)

# 작은 조각들

해당 애플리케이션은 내부 도커 네트워크부터 MySQL 인스턴스까지 다양한 지원 구성이 필요합니다. 여기서 도커를 사용하는 장점은 단일 명령어로 설정을 구축할 수 있고, 마운트된 볼륨을 통해 데이터 안정성을 보장할 것입니다. 애플리케이션을 처음 실행한 후에는 도커 데스크톱을 다시 시작하여 터미널을 열 필요가 없습니다.

## 네트워킹 및 지원 캐스트

<div class="content-ad"></div>

이 Docker-compose 구성의 첫 번째 구성 요소는 아마도 가장 중요한 것입니다. 이것은 구현에서 my-network로 간단히 표시되는 docker 네트워크입니다. 이는 연결된 서비스가 도커 인프라 내에서 통신하도록 허용하는 데 사용됩니다. 여기에 구성되어 있는 것을 볼 수 있으며 이를 docker-compose의 모든 서비스에서 참조할 것입니다.

우리는 동일한 호스트에 있는 컨테이너들을 연결하는 데 사용되는 브릿지 네트워크 드라이버를 사용합니다. 이제 이를 통해 nginx를 통해 서비스의 지정된 이름을 통해 요청을 프록시할 수 있게 될 것입니다.

또한 우리의 애플리케이션 데이터를 지원하기 위해 SQL 인스턴스가 필요할 것입니다. 우리는 이 목적으로 기본 MySQL 이미지를 사용하여 SQL 서비스를 생성할 수 있습니다.

여기서 root 패스워드를 설정하고 SQL의 기본 포트인 3306에 호스팅하는 것도 알아두시기 바랍니다. 이곳의 "volumes"에 특별히 주의를 기울이고 싶습니다. 여기서는 ./docker-conf/mysql_data 디렉토리를 사용하여 데이터를 로컬로 유지하며, 컨테이너가 다시 시작되거나 다시 만들어진 경우에도 데이터가 손실되지 않도록 보장합니다.

<div class="content-ad"></div>

이 컨테이너를 시작하면 DBeaver와 같은 도구로 SQL 인스턴스에 연결할 수 있습니다. 아래 사진과 같이 다음 구성을 사용하시면 됩니다:

![SQL instance configuration](/assets/img/2024-07-10-DockerComposeSetupforaMicroServicesArchitecture_2.png)

이제 애플리케이션을 지원하기 위해 GoogleOauth 데이터베이스가 필요합니다. 이 데이터베이스에는 google_user 테이블이 있어야 합니다. 이 테이블은 다음과 같이 varchar(255) 두 개의 열을 포함해야 합니다:

![google_user table columns](/assets/img/2024-07-10-DockerComposeSetupforaMicroServicesArchitecture_3.png)

<div class="content-ad"></div>

모든 훌륭한 작품은 지원 캐스트가 필요해요! 이들이 준비됐으면, 이제 쇼의 진짜 주인공들로 넘어갈게요.

## 애플리케이션

데모 백엔드와 데모 프론트엔드 폴더에 있는 이 애플리케이션들을 제공하기 위해, 베이스 이미지를 만들어야 할 거예요. 우리는 docker-compose로 직접 dockerfiles를 작성하여 이 작업을 수행할 수 있어요. 제 목표는 단추를 누르고 이 애플리케이션을 제공하는 것이죠. 이 docker-compose 설정에 공급할 이미지를 빌드하고 싶지 않아요. 먼저 백엔드 서비스로 이를 시연해볼게요:

이 설정에는 몇 가지 중요한 측면이 있어요. 이전 섹션에서 다뤘던 네트워크에 대한 호출을 볼 수 있어요. 애플리케이션들은 네트워크에 배치되어야 하고, container_name을 사용하여 네트워크 상황에서 애플리케이션을 참조할 수 있지만, 나중에 이에 대해 더 자세히 다루게 될 거예요. 그리고 빌드와 볼륨 섹션이 있어요. 우리는 SPRING_DOCKERFILE을 마운트하여 빌드 구성에서 사용할 수 있도록 해요.

<div class="content-ad"></div>

여기서는 docker-compose 구성에서 사용할 응용 프로그램을 빌드할 것입니다. 이 컨테이너를 다시 빌드할 때마다, 빌드할 이미지의 참고 프레임으로 이 dockerfile이 나타날 것입니다.

리액트 응용 프로그램 구성은 이 스프링 서비스와 거의 동일할 것입니다. 유일한 차이점은 응용 프로그램을 제공하는 데 사용하는 포트(3000)와 REACT_DOCKERFILE 사용입니다.

## 결합 요소 — nginx Proxy

모두 연결하기 위해 두 애플리케이션을 포트 3000 및 8090을 통해 8080번 포트로 프록시하는 nginx 서비스를 구성할 것입니다. 서비스 구성은 비교적 간단합니다.

<div class="content-ad"></div>

서버를 8080 포트를 사용하도록 구성하고, ./nginx.conf (서버 구성 파일)를 컨테이너에 연결하여 default.conf 파일로 사용할 것입니다. 이제 이 구성 파일을 참조하여 트래픽을 우리 서비스로 프록시할 것입니다. 

여기서 컨테이너 이름들을 사용하여 우리가 구성한 대로 동일한 도커 네트워크를 사용하도록 서비스를 참조할 수 있습니다. 네트워크에 더 많은 앱이 있을 경우, 우리는 트래픽을 동일한 방식으로 다양한 포트로 프록시할 것입니다. 여기서 nginx는 로컬 테스트를 위해 8080 포트에서 수신 대기 중이지만, 이는 단일 서버에서 전체 스택 애플리케이션을 80 포트로 배포하는 데 사용될 수 있습니다.

# 실제 애플리케이션 동작

이 서버를 가동해 봅시다! 프로젝트로 이동하여 다음 명령을 실행하세요:

<div class="content-ad"></div>

docker-compose up

이제, 애플리케이션이 올바르게 구성되었다면 포트 8080에 호스팅된 풀스택 회원가입 애플리케이션을 볼 수 있을 겁니다. 이 애플리케이션은 동일한 도메인이기 때문에 (예: http://localhost) 도메인을 명시하지 않은 채로 백엔드에 호출을 할 것입니다. Dash.js 컴포넌트에서 /api/hello 엔드포인트로 호출하는 방법을 예로 살펴보세요:

이제 이 애플리케이션이 완전히 작동 중임을 간단히 http://localhost:8080으로 이동하여 확인할 수 있습니다. 그러면 우리가 원래 포트 3000에 호스팅된 리액트 애플리케이션으로 라우팅되는 것을 확인할 수 있습니다!

![이미지](/assets/img/2024-07-10-DockerComposeSetupforaMicroServicesArchitecture_4.png)

<div class="content-ad"></div>

만약 설정에 따른 적절한 단계를 따라갔다면 백엔드로 성공적인 요청도 볼 수 있을 겁니다. 그렇지 않다면 postman과 같은 도구를 열고 백엔드로 요청을 보냅시다. 403 Unauthorized 응답을 받을 수도 있지만 이는 예상한 것입니다. 백엔드에 도달했다면 설정이 작동 중입니다.