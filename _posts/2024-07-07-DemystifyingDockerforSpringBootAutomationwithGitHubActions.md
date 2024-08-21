---
title: "Spring Boot와 Docker 쉽게 이해하기 GitHub Actions로 자동화하는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_0.png"
date: 2024-07-07 20:14
ogImage:
  url: /assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_0.png
tag: Tech
originalTitle: "Demystifying Docker for Spring Boot: Automation with GitHub Actions"
link: "https://medium.com/@dharshib.8/demystifying-docker-for-spring-boot-automation-with-github-actions-716652668d7e"
isUpdated: true
---

이 블로그에서는 Docker의 기본 개념, 구성 아키텍처, Spring Boot 애플리케이션의 Docker화, 그리고 GitHub Actions를 이용한 Docker 프로세스 자동화에 대해 살펴보겠습니다.

# 1. Docker 이해하기

![이미지](/assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_0.png)

## 1.1. Docker란 무엇인가요?

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

`Docker`을 설명하는 주요 포인트:

- 오픈 소스 플랫폼: Docker는 누구나 무료로 사용하고 기여할 수 있는 플랫폼입니다.
- 배포, 확장, 관리 자동화: Docker는 애플리케이션을 빠르게 설정하고 실행하는 프로세스를 단순화하고 자동화합니다.
- 가벼우며 휴대 가능한 컨테이너: 컨테이너는 어디서든 실행할 수 있는 작고 독립적인 단위입니다.
- 애플리케이션과 의존성: 컨테이너에는 애플리케이션을 실행하는 데 필요한 모든 것이 포함되어 있습니다 (코드, 라이브러리, 구성).
- 환경간 일관성: 컨테이너는 애플리케이션이 어디에서 실행되는지에 상관없이 동일한 방식으로 작동하도록 보장하여 "내 컴퓨터에서는 작동한다" 문제를 해결합니다.

더 쉬운 유사성을 통해 Docker를 설명해보겠습니다:

소프트웨어용 화물 컨테이너로 Docker를 생각해보세요.

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

- 배송용 컨테이너는 컨테이너 자체를 변경하지 않고 다른 수단(선박, 기차, 트럭)으로 다양한 유형의 상품(가구, 전자제품, 옷)을 운반할 수 있습니다.

- 도커 컨테이너는 컨테이너 자체를 변경하지 않고 다양한 컴퓨팅 환경(개발자 노트북, 테스트 서버, 프로덕션 클라우드)에서 애플리케이션을 실행하는 데 필요한 모든 부품(코드, 라이브러리, 설정)을 운반합니다.

## 1.2. 도커의 주요 구성 요소

![Docker 이미지](https://yourwebsite.com/assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_1.png)

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

- 이미지: 이미지는 애플리케이션을 특정 시점의 스냅숏으로 만들어내는 읽기 전용 템플릿입니다.
- 컨테이너: 컨테이너는 애플리케이션을 실행하는 데 필요한 모든 것이 포함된 가벼우면서도 이동 가능하며 자기 완비적인 단위입니다. 도커 컨테이너는 이미지의 실행 가능한 인스턴스입니다.
- 도커파일: 도커파일은 이미지를 조립하기 위해 사용되는 일련의 명령어가 포함된 스크립트입니다. 도커에게 이미지를 단계별로 어떻게 구성해야 하는지 알려줍니다.
- 도커 허브: 도커 이미지가 저장되고 공유되는 공개 레지스트리입니다. 개발자들은 도커 허브로 이미지를 푸시하거나 다른 사람이 만든 이미지를 풀어서 실행할 수 있습니다.
- 도커 엔진: 도커의 핵심으로, 이미지를 사용하여 컨테이너를 빌드하고 실행하는 런타임입니다. 도커 데몬과 도커 클라이언트를 포함합니다.
- 도커 데몬: 호스트 머신에서 실행되는 백그라운드 서비스입니다. 이미지, 컨테이너, 네트워크, 볼륨 등 도커 객체를 관리합니다. 도커 데몬은 도커 API 요청을 수신하고 처리합니다.
- 도커 클라이언트: 사용자가 도커 데몬과 상호작용할 수 있게 해주는 커맨드 라인 도구입니다. 도커 명령을 입력하면 클라이언트가 해당 명령을 도커 API를 통해 도커 데몬에게 전송합니다.
- 도커 네트워크: 도커 네트워크는 컨테이너가 동일한 호스트에서든 여러 호스트 사이에서든 서로 통신할 수 있도록 합니다. 네트워크는 컨테이너 그룹을 격리하거나 그룹 간 통신을 가능하게 할 수 있습니다.
- 도커 볼륨: 도커 볼륨은 도커 컨테이너에서 생성하고 사용하는 데이터를 지속적으로 유지할 수 있는 방법을 제공합니다. 볼륨은 호스트 파일 시스템에 저장되며 컨테이너 간에 공유할 수 있습니다.
- 도커 컴포즈: 도커 컴포즈는 다중 컨테이너 도커 애플리케이션을 정의하고 실행하기 위한 도구입니다. 도커 컴포즈를 사용하면 YAML 파일을 통해 애플리케이션의 컨테이너, 네트워크, 볼륨을 구성할 수 있습니다.
- 도커 데스크톱 (Windows/Mac): 도커 엔진, 도커 클라이언트, 도커 컴포즈 등이 포함된 사용자 친화적인 응용 프로그램입니다.

## 1.3. 도커의 장점

![도커 장점](/assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_2.png)

- 환경 일관성: 이는 개발, 테스트 및 프로덕션 환경에서 애플리케이션이 동일하게 작동함을 보장합니다.
- 간소화된 종속성 관리: 도커를 사용하면 애플리케이션이 실행되는 데 필요한 종속성이 컨테이너 내에 패키징되어 있습니다. 이는 호스트 시스템의 종속성 간 충돌을 없애고 다른 버전의 종속성이 평화롭게 공존할 수 있게 합니다.
- 확장성과 격리성: 도커 컨테이너는 가벼운 독립적인 환경을 제공하여 동일한 호스트 머신에서 독립적으로 실행할 수 있습니다. 도커 컨테이너는 빠르게 시작, 중지, 복제될 수 있어 수요에 따라 애플리케이션을 수평으로 확장하기 쉽습니다.
- 마이크로서비스 아키텍처: 도커는 각 서비스를 독립적으로 패키징하고 배포할 수 있는 마이크로서비스 기반 애플리케이션을 지원합니다.
- 버전 관리와 롤백: 도커 이미지는 버전이 지정되어 있어 개발자가 이전 버전으로 롤백하거나 변화를 쉽게 추적할 수 있습니다.
- 데브옵스와 지속적 통합/지속적 배포(CI/CD): 도커는 일관된 환경을 제공하여 테스트, 배포 및 프로덕션을 위한 자동화를 용이하게 합니다.
- 이식성: 도커 컨테이너는 개발자 노트북, 온프레미스 서버, AWS, Azure, 구글 클라우드와 같은 클라우드 플랫폼을 지원하는 시스템 상에서 실행할 수 있습니다.

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

## 1.4. 도커 아키텍처: OS 수준 기능 및 VM 비교

![이미지](/assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_3.png)

리눅스

- 도커는 기본적으로 리눅스에서 실행되도록 설계되었습니다. 네임스페이스와 cgroups와 같은 리눅스 커널 기능을 활용합니다.
- 도커 데몬은 호스트 커널 기능을 활용하여 네이티브로 실행됩니다.

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

Windows/macOS

- 윈도우와 macOS에서는 Docker Desktop을 사용합니다. Docker Desktop은 Docker Daemon을 실행하는 가벼운 가상 머신을 포함하고 있습니다.
- Docker Desktop은 Hyper-V 또는 Windows Subsystem for Linux 2 (WSL 2)를 사용하여 Docker Daemon이 실행되는 리눅스 환경을 만듭니다.
- Docker Desktop은 macOS에서 HyperKit을 사용하여 리눅스 가상 머신을 만듭니다.
- Windows/macOS의 Docker 클라이언트는 VM 내의 Docker Daemon과 통신합니다.

Docker와 가상 머신

- VM은 하이퍼바이저(예: VMware, Hyper-V, VirtualBox)에서 실행되며 여러 VM을 위한 하드웨어를 가상화합니다. 컨테이너는 호스트 OS 커널을 활용하는 Docker Engine에서 실행됩니다.
- 각 VM은 자체 커널을 포함한 완전한 OS 인스턴스를 포함합니다. 컨테이너는 호스트 OS 커널을 공유하여 응용 프로그램을 격리시키지만 각 컨테이너에 별도의 OS가 필요하지는 않습니다.
- VM은 자원을 많이 소비하며 각 VM은 자체 OS 및 가상화된 하드웨어 리소스가 필요합니다. 컨테이너는 호스트 OS 커널을 공유하며 응용 프로그램별 종속성만 포함되어 자원을 효율적으로 사용합니다.
- VM은 완전한 OS를 초기화해야 하기 때문에 부팅에 시간이 오래 걸립니다. 컨테이너는 완전한 OS가 아닌 응용 프로그램 환경만 부팅해야 하므로 거의 즉시 시작됩니다.

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

# 2. 환경 설정하기

## 2.1. 도커 설치

- 도커 공식 웹사이트에서 운영체제에 맞는 설치 지침을 따르세요.
- 설치 후, 버전 확인을 위해 다음 명령어를 사용하세요.

```bash
docker version
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

## 2.2. 스프링 부트 애플리케이션 생성하기

- 스프링 이니셜라이저를 사용하여 새 프로젝트 생성하기
- 간단한 REST 컨트롤러 생성하기

```java
@RestController
public class HelloController {

    @GetMapping("/welcome")
    public String welcome() {
        return "도커 배우기 시작!";
    }
}
```

- 애플리케이션을 실행하여 로컬에서 정상 작동하는지 확인하기. 웹 브라우저를 열고 http://localhost:8080/welcome로 이동해보세요. "도커 배우기 시작!" 메시지가 나타나야 합니다.

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

# 3. 스프링 부트 어플리케이션 도커화

![Docker](/assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_4.png)

## 3.1. Dockerfile 만들기

앞서 말씀드린대로, Dockerfile은 당신의 어플리케이션을 위해 Docker 이미지를 빌드하는 방법에 대한 일련의 명령을 포함한 스크립트입니다.

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

도커파일(Dockerfile) 안에 있는 각 명령은 이미지에서 레이어를 생성하며, 변경되지 않은 레이어를 효율적으로 재사용할 수 있습니다.

다음은 일반적인 도커파일 명령어들입니다:

- FROM: 도커 이미지의 기본 이미지를 설정합니다.
- COPY 또는 ADD: 호스트 시스템에서 파일을 도커 이미지로 복사합니다.
- RUN: 도커 이미지에서 명령을 실행하며, 주로 의존성을 설치하는 데 사용됩니다.
- CMD 또는 ENTRYPOINT: 컨테이너가 시작될 때 실행할 명령을 지정합니다.
- EXPOSE: 컨테이너 내부에서 애플리케이션이 실행될 포트를 지정합니다.

루트 디렉토리에 도커파일을 만들어보세요.

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

# Dockerfile

# Java 실행 환경이 포함된 기본 이미지 사용

FROM openjdk:17-jdk-alpine # 사용하려는 JDK 버전으로 교체하기

# 컨테이너 내부의 작업 디렉터리 설정

WORKDIR /app

# Spring Boot JAR 파일을 컨테이너로 복사

COPY target/spring-boot-docker-example.jar /app/spring-boot-docker-example.jar

# Spring Boot 애플리케이션이 실행 중인 포트 노출

EXPOSE 8080

# Spring Boot 애플리케이션 실행

ENTRYPOINT ["java", "-jar", "/app/spring-boot-docker-example.jar"]

JAR(Java ARchive) 파일은 Java 애플리케이션의 컴파일된 및 패키지된 버전입니다. Spring Boot 애플리케이션을 실행하는 데 필요한 모든 컴파일된 Java 클래스, 리소스 및 라이브러리가 포함되어 있습니다.

pom.xml의 build 섹션에서 finalName을 jar 파일의 이름으로 설정하세요. 이 설정은 생성된 JAR 파일의 이름이 spring-boot-docker-example.jar로 지정될 것을 보장합니다.

<build>
    <finalName>spring-boot-docker-example</finalName>
</build>

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

## 3.2. 프로젝트 빌드하기

```js
mvn clean install
```

## 3.3. 도커 이미지 구성하기

도커 이미지를 구성하려면 Dockerfile이 있는 디렉토리로 이동하여 다음 명령을 실행하세요:

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

도커 빌드 -t <이미지명>:<태그> .

`이미지명`: 도커 이미지에 할당하려는 이름입니다.

`태그`: 이미지에 할당하려는 태그입니다. 태그를 사용하면 이미지의 다른 버전 또는 변형을 구분할 수 있습니다. 예를 들어 v1.0, latest 또는 특정 빌드 번호 (build-123)로 이미지를 태그할 수 있습니다. 문제가 발생하면 이전 안정적인 릴리스로 태그된 이전 버전으로 쉽게 롤백할 수 있습니다.

. (점)은 현재 디렉토리를 빌드 컨텍스트로 사용함을 의미합니다. 빌드 컨텍스트는 도커가 이미지를 빌드하는 데 필요한 파일을 찾는 위치로, Dockerfile 및 해당 파일 내부에서 참조한 모든 파일이 포함됩니다.

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

도커 이미지를 만들어 봅시다.

```js
docker build -t spring-boot-docker-example:v1.0 .
```

이미지 빌드 과정에서 도커는 Dockerfile을 한 줄씩 읽어 각 명령을 실행하여 이미지의 레이어를 생성합니다. 실행 과정에서는 각 단계별로 진행 상황과 잠재적인 문제를 보여줍니다.

도커 이미지가 잘 생성되었는지 확인하려면, docker images 명령을 실행하여 사용 가능한 이미지들을 나열해 보세요.

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

```js
도커 이미지
```

## 3.4. 도커 컨테이너 실행하기

빌드된 이미지로부터 컨테이너를 실행하려면, 다음과 같이 `docker run` 명령어를 사용하십시오:

```js
docker run -p <호스트 포트>:<컨테이너 포트> <이미지 이름>:<태그>
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

- `host-port`: 호스트 컴퓨터에서 컨테이너 포트로 매핑하려는 포트 번호입니다.
- `container-port`: Docker 컨테이너 내부에서 응용 프로그램이 수신 대기 중인 포트 번호입니다.

이제 우리의 도커 이미지를 실행해 봅시다.

```js
docker run -p 8080:8080 spring-boot-docker-example:v1.0
```

-p 8080:8080: 이 명령은 컨테이너의 포트 8080을 호스트 컴퓨터의 포트 8080으로 매핑합니다.

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

호스트 머신에서 localhost:8080으로 보내는 요청은 도커 컨테이너 내부의 포트 8080으로 전달됩니다. 여기서 Spring Boot 애플리케이션이 실행 중인 것이죠.

이제 웹 브라우저에서 http://localhost:8080 으로 이 애플리케이션에 액세스할 수 있습니다.

도커 컨테이너 내에서 애플리케이션이 실행 중인지 확인하려면 모든 실행 중인 컨테이너를 나열하는 docker ps 명령을 실행해보세요.

```js
docker ps
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

모든 컨테이너(구동중인 것과 멈춘 것 포함)을 나열하려면 아래 명령어를 실행하세요.

```js
docker ps -a
```

## 3.5. Docker 이미지를 Docker Hub에 푸시하기

Docker Hub에 로그인하세요. 계정이 없는 경우 무료 계정을 만드세요.

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

새 저장소를 만들어 주세요. Docker Hub 대시보드에서 "저장소 만들기" 버튼을 클릭하세요. 저장소 이름을 입력해주세요. 예를 들어, spring-boot-docker-example-repo와 같이 이름을 지어주세요. 선택적으로 설명을 제공하고 가시성(공개 또는 비공개)를 설정할 수 있습니다. "만들기" 버튼을 클릭하여 저장소를 만들어주세요.

Docker Hub 계정과 저장소가 설정되면 Docker 이미지를 Docker Hub로 푸시할 수 있습니다.

로컬 Docker 이미지에 Docker Hub의 저장소 이름을 태깅하세요. `사용자 이름`/`저장소 이름`:`태그` 형식을 사용하세요.

```js
docker tag spring-boot-docker-example:v1.0 yourusername/spring-boot-docker-example-repo:v1.0
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

태그가 지정된 이미지를 Docker Hub로 푸시하세요.

```js
docker push yourusername/spring-boot-docker-example-repo:v1.0
```

푸시한 뒤, Docker Hub에 이미지를 확인할 수 있습니다. Docker Hub에 로그인한 후, 저장소로 이동하여 (yourusername/spring-boot-docker-example-repo) "Tags" 탭을 확인하여 푸시된 이미지를 확인할 수 있습니다.

## 3.6. Docker Hub에서 Docker 이미지 끌어오기

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

도커 이미지가 도커 허브에 푸시되면 다른 사람들은 어디서든지 해당 이미지를 끌어와서 실행할 수 있어요.

도커 컨테이너를 실행하려는 기기에서, 도커 허브에서 이미지를 끌어오세요.

```js
도커 풀 yourusername/spring-boot-docker-example-repo:v1.0
```

끌어온 이미지를 도커 컨테이너로 실행하세요.

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

```bash
docker run -p 8080:8080 yourusername/spring-boot-docker-example-repo:v1.0
```

웹 브라우저를 열고 http://localhost:8080 으로 이동하여 Docker 컨테이너 내에서 실행 중인 Spring Boot 애플리케이션에 액세스하세요.

# 4. 도커와 GitHub actions를 활용한 지속적 통합 및 배포(CI/CD).

## 4.1. CI/CD 이해하기

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

![이미지](/assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_5.png)

1. 지속적 통합: CI는 소프트웨어 개발에서 개발자들이 자주 코드 변경을 공유 저장소에 통합하는 실천 방법입니다.

- 새 기능을 위한 새 코드를 작성합니다.
- 코드를 공유 저장소에 푸시합니다.
- 자동화된 테스트가 실행되어 코드가 작동하는지 확인합니다.
- 테스트가 통과하면 코드가 병합됩니다. 그렇지 않으면 문제를 해결하고 다시 푸시합니다.

2. 지속적 배포: CD는 코드 변경이 CI 단계를 통과한 후 자동으로 프로덕션 환경에 배포(릴리스)되는 실천 방법입니다.

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

- 코드가 병합되고 모든 테스트가 통과되면 CI 시스템이 애플리케이션의 새 버전을 빌드합니다.
- 새 버전은 자동으로 라이브 서버에 배포되어 사용자가 액세스할 수 있습니다.
- 시스템은 배포를 모니터링하여 모든 것이 원할하게 작동되도록 합니다.

요약하면, CI/CD는 코드 변경을 통합하고 제품에 배포하는 프로세스를 자동화하여 소프트웨어 개발을 더 빠르고 신뢰성 있게 만들어주며 오류 가능성을 줄여줍니다.

## 4.2. GitHub Actions 이해하기

![GitHub Actions](/assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_6.png)

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

전통적으로 Docker를 GitHub Actions와 같은 자동화 도구를 사용하지 않고 사용한다면, 코드를 변경할 때마다 애플리케이션을 수동으로 빌드하고 Docker 이미지를 생성한 후 Docker Hub와 같은 Docker 레지스트리에 푸시해야 합니다.

GitHub Actions은 이러한 프로세스를 자동화하는 방법입니다.

GitHub Actions를 사용하면 YAML 파일에서 워크플로우를 정의하여 특정 이벤트(예: 특정 브랜치로 푸시) 발생 시 어떤 작업을 수행할지 지정할 수 있습니다.

이를 통해 애플리케이션 빌드, 테스트 실행, Docker 이미지 빌드, Docker Hub에 푸시, 심지어 서버나 클라우드 플랫폼에 배포하는 작업과 같은 작업들을 자동화할 수 있습니다.

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

GitHub Actions을 이용하여 작업을 자동화하면 시간을 절약할 수 있고, 수동 노력을 줄일 수 있으며, 모든 코드 변경이 일관된 빌드 및 배포 프로세스를 트리거하도록 보장할 수 있습니다.

먼저 CI/CD가 무엇인지 이해했습니다. 이제 GitHub Actions에서 사용되는 일부 용어들을 살펴보겠습니다.

Workflow

- Workflow는 GitHub 리포지토리에서 정의하는 자동화된 프로세스입니다.
- 이는 이벤트에 의해 트리거될 수 있는 하나 이상의 작업으로 구성됩니다.
- Workflow는 리포지토리의 .github/workflows 디렉토리에 있는 YAML 파일에서 정의됩니다.

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

이벤트

- 이벤트는 워크플로를 트리거하는 특정 활동입니다.
- 일반적인 이벤트에는 issues, push, pull_request, release, schedule이 포함됩니다.

```js
on: push: branches: -main;
```

작업

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

- 작업은 동일한 러너에서 실행되는 단계 모음입니다.
- 작업은 병렬로 실행되거나 다른 작업에 의존할 수 있습니다.
- 러너는 활성화되면 워크플로를 실행하는 서버입니다.

```js
jobs:
  build: # 작업 1
    runs-on: ubuntu-latest # 작업 1에 대한 러너

  test: # 작업 2
    runs-on: ubuntu-latest # 작업 2에 대한 러너
    needs: build # 빌드 작업이 성공적으로 완료되면 테스트가 실행됩니다.
```

- 기본적으로 워크플로의 작업은 병렬로 실행됩니다. needs 키워드를 사용하여 실행 순서를 제어할 수 있습니다.

단계

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

- 단계는 작업 내에서 개별 작업 단위입니다.
- 명령을 실행하거나 종속 항목을 설정하거나 액션을 사용할 수 있습니다.
- 각 단계는 자체 프로세스에서 실행됩니다.

```js
jobs:
  build: #Job 1
    runs-on: ubuntu-latest # Job 1에서 사용할 러너

    steps:
    # 단계 1
    - name: 코드 확인
      uses: actions/checkout@v2

    # 단계 2
    - name: JDK 11 설정
      uses: actions/setup-java@v2
      with:
        java-version: '11'

    # 단계 3
    - name: Maven으로 빌드
      run: mvn clean install
```

액션

- 액션은 공통 작업을 수행하기 위해 사용할 수 있는 재사용 가능한 코드 단위입니다.
- 커뮤니티에서 작성된 액션을 사용하거나 직접 만들 수 있습니다. 사용 키워드로 단계에서 액션을 사용할 수 있습니다.
- 미리 작성된 액션 사용 예시: 코드 확인

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
단계:
  - 이름: 코드 체크아웃
    사용처: actions/checkout@v2
```

- 스스로 만든 액션을 생성하는 예시

```yaml
- 이름: 메이븐으로 빌드
  실행: mvn clean install
```

비밀 정보

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

- 비밀은 API 키나 로그인 자격 증명과 같은 중요한 정보를 저장하기 위해 리포지토리에 만드는 암호화된 변수입니다.
- 워크플로우에서는 시크릿 컨텍스트를 사용하여 비밀을 액세스할 수 있습니다.

```js
- name: 도커허브에 로그인
  run: docker login -u ${secrets.DOCKER_USERNAME} -p ${secrets.DOCKER_PASSWORD}
```

## 4.3. GitHub Actions 워크플로우 작성

![이미지](/assets/img/2024-07-07-DemystifyingDockerforSpringBootAutomationwithGitHubActions_7.png)

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

GitHub으로 이동하여 새 저장소를 생성하세요.

생성된 저장소 주소(origin)를 프로젝트에 추가하세요.

프로젝트의 루트 디렉토리에 이미 도커파일을 만들었습니다. 그 다음 단계로 넘어갑시다.

루트 디렉토리에 GitHub Actions 워크플로우를 위한 디렉토리를 생성하세요.

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

```bash
mkdir .github/workflows
```

`.github/workflows` 폴더에 docker.yml이라는 workflow 파일을 생성하세요.

```yaml
# Workflow의 이름
name: Docker를 위한 CI/CD Pipeline

# Workflow를 트리거하는 이벤트 정의
on:
  push: # push 이벤트가 발생할 때 Workflow를 트리거합니다.
    branches:
      - main # main 브랜치로 push할 때에만 트리거합니다.
  pull_request: # pull request 이벤트가 발생할 때 Workflow를 트리거합니다.
    branches:
      - main # main 브랜치로 pull request를 보낼 때에만 트리거합니다.

# Workflow의 일부로 실행될 작업 정의
jobs:
  build:
    runs-on: ubuntu-latest # 러너 환경을 지정합니다.

    steps:
      - name: 코드 체크아웃 # 저장소 코드를 체크아웃하는 단계
        uses: actions/checkout@v2 # 미리 빌드된 checkout 액션을 사용합니다.

      - name: JDK 17 설정 # Java 개발 키트 버전 17을 설정하는 단계
        uses: actions/setup-java@v2 # 미리 빌드된 setup-java 액션을 사용합니다.
        with:
          java-version: "17" # JDK 버전을 지정합니다.

      - name: Maven으로 빌드 # Maven을 사용하여 프로젝트를 빌드하는 단계
        run: mvn clean install # Maven의 clean 및 install 명령어를 실행합니다.

      - name: Docker Hub에 로그인 # Docker Hub에 로그인하는 단계
        run: docker login -u ${secrets.DOCKER_USERNAME} -p ${secrets.DOCKER_PASSWORD} # Secrets로 로그인

      - name: Docker 이미지 빌드 # Docker 이미지를 빌드하는 단계
        run: docker build -t yourusername/spring-boot-docker-example-repo:v1.0 . # 지정된 태그로 Docker 이미지를 빌드합니다.

      - name: Docker 이미지 푸시 # Docker 이미지를 Docker Hub에 푸시하는 단계
        run: docker push yourusername/spring-boot-docker-example-repo:v1.0 # 지정된 태그로 Docker 이미지를 푸시합니다.
```

우리 엔드포인트의 메시지를 변경해보겠습니다.

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

```java
@RestController
public class HelloController {

   @GetMapping("/welcome")
   public String welcome() {
       return "GitHub Actions를 활용한 Docker 학습을 시작해봅시다!";
   }
}
```

시크릿을 설정하기 위해서는 GitHub 저장소 설정으로 이동합니다. "시크릿 및 변수" 섹션으로 이동한 후 "Actions"로 이동합니다. DOCKER_USERNAME 및 DOCKER_PASSWORD를 위한 새 저장소 시크릿을 추가하십시오.

수정 사항을 추가하고, 커밋하고, GitHub에 푸시해주세요.

```bash
git add .
git commit -m "Docker 및 GitHub Actions를 이용한 CI/CD 설정 완료"
git push origin main
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

GitHub Actions workflow은 본 브랜치로의 모든 푸시 또는 풀 리퀘스트마다 자동으로 트리거됩니다.

깃허브 리포지토리의 “Actions” 탭으로 이동해주세요.

작업 흐름이 실행 중인 것을 볼 수 있어요.

작업 흐름이 완료되면 Docker Hub 계정으로 이동해주세요. Docker 이미지가 Docker Hub의 리포지토리로 성공적으로 푸시되었는지 확인해보세요.

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

이제 터미널을 열고 이미지를 다시 가져와 실행하세요.

웹 브라우저를 열고 http://localhost:8080 으로 이동하여 도커 컨테이너 내에서 실행되는 Spring Boot 어플리케이션에 액세스하세요.

GitHub Actions를 사용하면 변경 사항을 가질 때마다 수동으로 도커 이미지를 빌드하고 푸시할 필요가 없어집니다.

설정한 워크플로우는 전체 프로세스를 자동화합니다. 코드를 저장소로 푸시할 때마다 GitHub Actions가 도커 이미지를 빌드하고 Docker Hub로 푸시해 줍니다.

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

# 5. 다음 단계: Docker로 더 많은 탐험하기

가이드를 완료한 것을 축하합니다! 이제 Docker에 대한 튼튼한 이해와 해당 구성 요소, Spring Boot 애플리케이션용 Docker 이미지를 빌드, 푸시, 풀 및 실행하는 방법을 알게 되었을 것입니다. 또한 GitHub Actions로 이러한 프로세스를 자동화하는 방법도 배웠습니다. 하지만 이것은 시작에 불과합니다. 다음에 탐험할 수 있는 흥미로운 분야들이 있습니다:

## 5.1 . 고급 Dockerfile 최적화

Dockerfile의 최상의 관행과 최적화에 대해 더 깊이 파고들어보세요. 이미지 크기를 최소화하고 빌드 캐싱을 활용하며 다중 단계 빌드를 사용함으로써 더 효율적인 Docker 이미지를 만드는 방법을 배워보세요.

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

## 5.2. 도커 컴포즈

도커 컴포즈를 사용하여 다중 컨테이너 도커 애플리케이션을 관리하는 방법을 배워보세요. 이 도구를 사용하면 복잡한 마이크로서비스 아키텍처를 개발하고 테스트하기에 이상적인 다중 컨테이너 애플리케이션을 간편하게 정의하고 실행할 수 있습니다.

## 5.3. 도커 네트워킹

도커의 네트워킹 기능을 탐색해보세요. 컨테이너가 서로 통신하는 방법, 사용자 정의 네트워크를 구성하는 방법, 컨테이너 간 네트워크 트래픽을 보호하는 방법에 대해 이해하세요.

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

## 5.4. 도커 볼륨

도커 볼륨에 대해 배우고 컨테이너에서 데이터 지속성을 관리하는 방법을 알아보세요. 컨테이너 수명 주기를 넘어 데이터 저장이 필요한 애플리케이션에 꼭 필요한 내용입니다.

## 5.5. 도커와 마이크로서비스

도커를 사용하여 마이크로서비스를 빌드하고 배포하는 방법에 대해 알아봅시다. 각 서비스를 독립적으로 컨테이너화하는 방법, 서비스 간 통신 관리, 그리고 마이크로서비스 아키텍처에서 확장성과 탄력성을 보장하는 방법을 이해하세요.

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

## 5.6. 지속적 배포

CI/CD 파이프라인을 확장하여 지속적 배포를 포함시킵니다. AWS ECS, Google Kubernetes Engine, 또는 Azure Kubernetes Service와 같은 도구를 사용하여 Docker화된 애플리케이션을 스테이징 및 프로덕션과 같은 다양한 환경으로 자동으로 배포하는 방법을 배우세요.

계속해서 Docker로 멋진 것들을 만들며 탐험하고 학습해보세요!

제 글이 유용했다면 클랩(chaps)을 해주시고 친구들과 동료들과 공유해주시기를 고려해주세요.

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

행복한 코딩하세요!

-다르시 바라수브라마니암-
