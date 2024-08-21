---
title: "Docker Docker Engine, 이미지, 컨테이너, Dockerfile 가이드"
description: ""
coverImage: "/assets/img/2024-07-10-DockerAGuidetoDockerEngineImagesContainersDockerfile_0.png"
date: 2024-07-10 02:07
ogImage:
  url: /assets/img/2024-07-10-DockerAGuidetoDockerEngineImagesContainersDockerfile_0.png
tag: Tech
originalTitle: "Docker: A Guide to Docker Engine, Images, Containers , Dockerfile"
link: "https://medium.com/@s-zainrashid98/docker-a-guide-to-docker-engine-images-containers-dockerfile-366a5c074e18"
isUpdated: true
---

# 소개

소프트웨어 개발의 빠른 세계에서 효율성, 확장성 및 속도 달성은 중요합니다. 도커(Docker)는 개발자들과 IT 전문가들에게 원활한 응용 프로그램 배포 및 관리를 제공하는 강력한 플랫폼으로 등장하여 게임 체인저로 자리 잡았습니다. 이 글에서는 도커의 핵심 개념을 탐구하며, 도커 엔진, 도커 이미지, 컨테이너 및 도커 파일을 살펴볼 것이며, 도커가 개발 프로세스를 혁신하는 방식에 대해 포괄적으로 이해할 수 있도록 할 것입니다.

# 도커

도커는 응용 프로그램의 배포, 확장 및 관리를 자동화하기 위해 설계된 오픈 소스 플랫폼입니다. 컨테이너화를 통해 도커는 응용 프로그램이 다른 컴퓨팅 환경에서도 일관되게 실행될 수 있도록 합니다. 이는 응용 프로그램이 개발자의 랩톱, 테스트 환경 또는 제품 환경에서 실행 중이든 간에 동일하게 작동한다는 것을 의미합니다. 도커가 컨테이너를 간단하게 만들었다고 말해도 과언이 아닙니다!

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

# 도커 엔진

대부분의 기술 전문가들이 도커에 대해 이야기할 때는 도커 엔진을 가리킵니다. 도커의 핵심은 도커 엔진에 있습니다. 도커 엔진은 컨테이너를 실행하고 관리하는 핵심 소프트웨어입니다. 도커 엔진은 컨테이너가 호스트 운영 체제에서 실행되도록 하는 런타임입니다. 도커 엔진을 구성하는 주요 구성 요소는 도커 클라이언트, 도커 데몬, containerd 및 runc입니다. 이들을 함께 사용하여 컨테이너를 생성하고 실행합니다.

![Docker Engine](/assets/img/2024-07-10-DockerAGuidetoDockerEngineImagesContainersDockerfile_0.png)

# 도커 이미지

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

도커 이미지는 도커 컨테이너의 청사진이에요. 컨테이너 이미지는 소프트웨어를 실행하는 데 필요한 모든 것을 포함하는 가벼운, 독립적인 실행 가능한 소프트웨어 패키지에요: 코드, 런타임, 라이브러리, 환경 변수 및 구성 파일을 포함하고 있어요. 이미지가 도커 엔진에서 실행할 때 컨테이너로 변환돼요. 이미지는 여러 개의 층으로 구성되어 하나의 개체로 표현돼요.

![Image](/assets/img/2024-07-10-DockerAGuidetoDockerEngineImagesContainersDockerfile_1.png)

# 이미지 층

이미지 내부에는 애플리케이션을 실행하는 데 필요한 운영 체제(OS)와 모든 파일 및 종속성이 포함돼 있어요. 이렇게하면 각 층은 컨테이너화된 애플리케이션을 실행하는 데 필요한 다른 요소를 포함하고 있어요. 컨테이너는 이미지 위에 구축되며 그래서 이미지를 때로는 중단된 컨테이너라고도 부르기도 해요. 이미지는 종종 실제 중단된 컨테이너에서 생성돼요.

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

![image](/assets/img/2024-07-10-DockerAGuidetoDockerEngineImagesContainersDockerfile_2.png)

컨테이너는 이미지로부터 만들어지면 상호 의존적인 관계가 형성됩니다; 마지막으로 그 이미지를 사용하는 컨테이너가 종료되고 파괴될 때까지 이미지를 제거할 수 없습니다. 컨테이너의 유일한 기능은 프로그램 실행입니다. 그러나 컨테이너의 가장 중요한 특징은 빠르고 가볍다는 것입니다. Docker 이미지는 이미지 레지스트리에 저장됩니다. 가장 일반적인 레지스트리는 Docker 허브입니다.

# Docker 컨테이너

Docker 컨테이너는 Docker 이미지의 실행 가능한 인스턴스입니다. 이는 코드 및 그에 필요한 모든 종속성을 포장하여 응용 프로그램이 한 컴퓨팅 환경에서 다른 환경으로 빠르고 신뢰성 있게 실행되도록 하는 표준화된 소프트웨어 단위입니다. VM과 컨테이너의 큰 차이점은 컨테이너가 빠르고 가볍다는 것입니다. 컨테이너는 서로와 호스트 시스템으로부터 격리되어 일관된 런타임 환경을 보장합니다.

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

![이미지](/assets/img/2024-07-10-DockerAGuidetoDockerEngineImagesContainersDockerfile_3.png)

# 도커 파일

도커는 Dockerfile에서 지시사항을 읽어 이미지를 자동으로 빌드할 수 있습니다. Dockerfile은 이미지를 빌드하는 방법에 대한 지시사항이 담긴 간단한 텍스트 파일입니다. Dockerfile에는 두 가지 주요 목적이 있습니다:

- 응용 프로그램 설명
- Docker에게 응용 프로그램을 컨테이너화하는 방법을 알려줍니다 (응용 프로그램이 내장된 이미지를 생성합니다)

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

아래는 Node.js 애플리케이션을 사용하는 기본 예제입니다:

```js
# 부모 이미지로 공식 Node.js 런타임 사용
FROM node:14
# 컨테이너 내에서 작업 디렉토리 설정
WORKDIR /usr/src/app
# package.json과 package-lock.json을 컨테이너로 복사
COPY package*.json ./
# 의존성 설치
RUN npm install
# 나머지 애플리케이션 코드를 컨테이너로 복사
COPY . .
# 애플리케이션 포트 노출
EXPOSE 8080
# 애플리케이션 시작
CMD ["node", "app.js"]
```

# 결론

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

도커는 소프트웨어를 포터블 컨테이너로 패키징하여 응용 프로그램 개발과 배포를 간편하게 만듭니다. 이것은 프로세스를 간소화하고 환경 간 일관성을 보장하며 효율성을 높이는 데 도움이 됩니다. 도커가 발전함에 따라 소프트웨어 관리를 현대화하고 개발 주기를 가속화하는 데 기여할 수 있어서 개발자와 기업 모두에게 귀중한 도구로 자리 잡고 있습니다.
