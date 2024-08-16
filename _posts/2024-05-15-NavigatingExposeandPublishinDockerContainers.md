---
title: "도커 컨테이너에서 노출Expose과 공개Publish 이해하기"
description: ""
coverImage: "/assets/img/2024-05-15-NavigatingExposeandPublishinDockerContainers_0.png"
date: 2024-05-15 11:05
ogImage: 
  url: /assets/img/2024-05-15-NavigatingExposeandPublishinDockerContainers_0.png
tag: Tech
originalTitle: "Navigating 'Expose' and 'Publish' in Docker Containers"
link: "https://medium.com/@nikheal/navigating-expose-and-publish-in-docker-containers-e4c1429de8ac"
isUpdated: true
---





![2024-05-15-NavigatingExposeandPublishinDockerContainers_0](/assets/img/2024-05-15-NavigatingExposeandPublishinDockerContainers_0.png)

도커는 응용 프로그램을 배포하는 방법을 혁신적으로 바꿨습니다. 소프트웨어를 컨테이너화하는 데 가벼우면서도 효율적이며 휴대 가능한 솔루션을 제공합니다. Docker 컨테이너에서 노출(expose)하고 게시(publish)하는 내용을 이해하는 것은 컨테이너와 호스트 시스템 간의 네트워크 통신을 효과적으로 관리하는 데 중요합니다.

Docker Expose이란 무엇인가요?

Dockerfile에서 EXPOSE 지시문은 컨테이너가 실행 중에 어떤 네트워크 포트에서 수신 대기하는지 Docker에 알려줍니다.




하지만 Docker 호스트 외부에서 컨테이너에 직접 액세스하거나 해당 포트를 호스트 시스템에 공개하지는 않습니다. 대신, 들어오는 연결을 수신하기 위해 컨테이너가 설정된 포트를 나열하는 메모 역할을 합니다.

예를 들어, Dockefile에 EXPOSE 80를 포함하면, 컨테이너화된 응용프로그램이 80포트에서 들어오는 연결을 기다리는 것을 나타냅니다.

이 정보는 컨테이너화된 응용프로그램의 네트워킹 요구사항을 이해하려는 개발자나 관리자에게 유용합니다.

도커 Publish가 무엇인가요?



한편, docker run 명령에 -p 또는 — publish 플래그를 사용하면 컨테이너에서 호스트 시스템으로 포트를 공개하여 외부 세계에서 액세스할 수 있습니다.

-p 플래그를 사용하여 포트를 공개하면, Docker는 호스트 시스템의 포트와 컨테이너의 포트 사이에 매핑을 작성합니다.

예를 들어, docker run -p 8080:80 `이미지 이름`을 실행하면 컨테이너에서 호스트 시스템의 포트 80을 포트 8080에 공개합니다. 따라서 호스트의 포트 8080으로 전달된 모든 트래픽은 컨테이너의 포트 80으로 라우팅됩니다.

예시 및 사용 사례:



웹 응용 프로그램이 도커 컨테이너에서 실행되고 포트 80에서 수신하는 시나리오를 생각해보세요. Dockerfile에 EXPOSE 지시문을 사용하여이 포트를 노출하려면 다음 줄을 추가하면 됩니다:

```js
EXPOSE 80
```

이를 통해 Docker에게 컨테이너화된 웹 응용 프로그램이 포트 80에서 수신한다는 것을 알립니다.

이제 docker run 명령을 사용하여 컨테이너를 실행할 때 호스트 시스템의 포트 80에 해당하는 포트에 80포트를 게시할 수 있습니다. -p 플래그를 사용하면 됩니다:



```js
# 도커 실행 -p 8080:80 <이미지 이름>
```

이 명령은 컨테이너 내의 80포트를 호스트 시스템의 8080포트로 매핑하여 웹 애플리케이션에 외부 액세스할 수 있게 합니다.

아래 명령은 지정된 이미지를 기반으로 컨테이너를 백그라운드 모드에서 시작하고 -- publish-all 옵션을 사용하여 모든 노출된 포트를 호스트 시스템의 랜덤 포트로 게시합니다.

예를 들어, Dockerfile에 80포트와 443포트에 대한 EXPOSE 지시가 포함되어 있다면, 아래 명령을 실행하면 자동으로 컨테이너의 80포트와 443포트가 호스트 시스템의 랜덤 포트에 매핑됩니다.



```js
# 도커 실행 -d — 모두 공개 <이미지 이름>
```

주요 차이점 :

노출 :

공개 :
  



Best Practices:

- Dockerfile에서 EXPOSE를 사용하여 컨테이너가 수신 대기 중인 포트를 문서화하세요.
- 필요할 때 컨테이너 포트를 호스트 시스템에 공개하기 위해 docker run -p를 사용하세요.
- 보안 상의 영향을 염두에 두고 외부 액세스에 필요한 포트만 노출하세요.
- 컨테이너 간 통신을 위해 네트워크 및 서비스 검색과 같은 Docker 네트워킹 기능을 탐색하세요.

결론:
요약하자면, "노출"과 "공개"는 Docker 컨테이너 네트워킹에서 중요한 개념입니다.
EXPOSE를 통해 컨테이너 포트를 문서화하고, docker run -p를 통해 컨테이너 포트를 호스트 시스템에 노출하여 외부 액세스를 가능하게 합니다.

이러한 개념을 효과적으로 이해하고 적용함으로써, 개발자와 시스템 관리자는 Docker 컨테이너에서 네트워크 통신을 능숙하게 관리할 수 있습니다.