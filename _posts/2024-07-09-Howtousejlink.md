---
title: "jlink 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-Howtousejlink_0.png"
date: 2024-07-09 21:48
ogImage: 
  url: /assets/img/2024-07-09-Howtousejlink_0.png
tag: Tech
originalTitle: "How to use jlink"
link: "https://medium.com/@cat.edelveis/how-to-use-jlink-0b8f8b340c59"
---


![How to use jlink](/assets/img/2024-07-09-Howtousejlink_0.png)

이 문서에서는 jlink를 사용하는 방법에 대한 안내를 제공할 것입니다. jlink는 무시되고 있는 유용한 Java 기능으로, 적절한 베이스 이미지와 결합하면 Docker 컨테이너 이미지 크기를 50% 이상으로 줄일 수 있습니다!

# jlink란 무엇인가요?

jlink는 개발자들이 주어진 응용 프로그램을 실행하기 위해 필요한 플랫폼 모듈만을 포함한 사용자 정의 Java 런타임 이미지를 만들 수 있게 해주는 Java 링커입니다.

<div class="content-ad"></div>

자바 9부터 자바 애플리케이션 및 JDK 자체가 밀접한 관련 패키지(모듈) 그룹으로 구성됩니다. jlink를 사용하여 자르면 일반 JRE처럼 작동하지만 응용 프로그램 실행에 필요한 모듈만 포함된 사용자 정의 JRE 이미지가 생성됩니다.

우리는 Spring Boot 애플리케이션을 위해 사용자 정의 JRE를 생성할 것입니다.

필수 사항

- JDK 21. Spring에서 권장하는 Liberica JDK를 사용합니다.
- Docker
- 좋아하는 IDE

<div class="content-ad"></div>

Spring Petclinic을 예시로 사용해보겠습니다만, 여러분이 직접 사용하는 애플리케이션을 사용해도 좋아요. Spring Boot 3.3은 CDS 지원을 비롯한 다양한 개선 사항을 제공하는 것이 좋아요.

jlink에 진입하기 전에 exploded jar를 빌드해보세요. exploded jar를 실행하는 것이 효율적이며, Spring에서 권장하는 방법이에요.

```js
mvn -Dmaven.test.skip=true clean package
java -Djarmode=tools -jar target/spring-petclinic-3.3.0-SNAPSHOT.jar extract
```

이렇게 하면 lib 하위 디렉토리를 포함하여 애플리케이션 라이브러리 및 애플리케이션 클래스가 포함된 spring-petclinic-3.3.0-SNAPSHOT 디렉토리가 생성되며, lib에 있는 라이브러리를 참조하는 매니페스트가 있는 애플리케이션 jar도 생성됩니다.

<div class="content-ad"></div>

# 애플리케이션이 사용하는 모듈을 나열하려면 jdeps를 사용하세요

jlink 도구를 사용하여 사용자 정의 런타임을 만들기 전에, 해당 애플리케이션이 사용하는 JDK 모듈을 찾아야합니다. 이를 위해 Java Dependency Analysis Tool인 jdeps를 사용할 것입니다. jdeps 유틸리티는 Java 바이트코드를 처리하고 클래스 간에 패키지 수준 또는 클래스 수준의 의존성을 보여줍니다.

다음과 같은 인수를 사용하여 jdeps를 실행할 것입니다:

- --multi-release는 멀티 릴리스 jar의 경우 버전을 지정합니다.
- --class-path는 클래스 파일을 찾을 위치를 지정합니다. 여기서는 우리가 폭발된 jar의 lib 폴더 내의 애플리케이션 라이브러리에 대해 jdeps를 실행할 것입니다.
- --ignore-missing-deps는 누락된 종속성을 무시합니다.
- --list-deps는 모듈 종속성을 나열합니다.

<div class="content-ad"></div>

많은 추가 옵션이 있습니다. 공식 문서에서 자세히 읽을 수 있어요.

아래 명령어를 실행하면 앱이 필요로 하는 모듈 목록이 표시됩니다:

```js
jdeps --multi-release 21 --class-path 'spring-petclinic-3.3.0-SNAPSHOT/lib/*' --ignore-missing-deps --list-deps spring-petclinic-3.3.0-SNAPSHOT/spring-petclinic-3.3.0-SNAPSHOT.jar
   java.base
   java.compiler
   java.desktop
   java.instrument
   java.logging
   java.management
   java.naming
   java.net.http
   java.prefs
   java.rmi
   java.scripting
   java.security.jgss
   java.security.sasl
   java.sql
   java.sql.rowset
   java.transaction.xa
   java.xml
   jdk.jfr
   jdk.management
   jdk.net
   jdk.unsupported
```

# jlink를 사용하여 사용자 정의 JRE 생성하기

<div class="content-ad"></div>

주어진 필수 모듈 목록으로 jlink를 사용할 준비가 끝났습니다! 다음 옵션을 포함하는 명령어를 사용할 것입니다:

- --compress는 리소스를 압축하는 옵션입니다 (압축하지 않을 경우 0, 상수 문자 공유를 위해 1, ZIP 압축을 위해 2).
- --strip-debug는 결과 이미지에서 디버그 정보를 제거합니다.
- --no-header-files는 헤더 파일을 제외합니다.
- --no-man-pages는 man 페이지를 제외합니다.
- --add-modules는 나열된 모듈을 루트 모듈 집합에 추가합니다.
- --output은 결과 런타임 이미지의 위치를 지정합니다.

더 많은 옵션은 문서에서 찾을 수 있습니다.

커스텀 Java 런타임 이미지를 생성하기 위한 jlink 명령어를 조합해봅시다:

<div class="content-ad"></div>

```js
jlink --compress=2 --strip-debug --no-header-files --no-man-pages --add-modules java.base,java.compiler,java.desktop,java.instrument,java.logging,java.management,java.naming,java.net.http,java.prefs,java.rmi,java.scripting,java.security.jgss,java.security.sasl,java.sql,java.sql.rowset,java.transaction.xa,java.xml,jdk.jfr,jdk.management,jdk.net,jdk.unsupported --output target/jlink-runtime
```

만약 로컬 머신에서 이 명령을 실행하면 68.3MB 크기의 사용자 지정 런타임을 얻을 수 있습니다. 그러나 우리의 목표는 컨테이너 이미지에서 jlink를 사용하는 것이기 때문에 결과에 오래 머물지 말고 가장 흥미로운 부분으로 넘어가 봅시다.

# 커스텀 JRE을 사용하여 응용프로그램 Docker화하기

프로젝트 루트에 다음 Dockerfile을 배치하세요:

<div class="content-ad"></div>


FROM bellsoft/liberica-runtime-container:jdk-all-21-musl as builder
RUN jlink --compress=2 --strip-debug --no-header-files --no-man-pages --add-modules java.base,java.compiler,java.desktop,java.instrument,java.logging,java.management,java.naming,java.net.http,java.prefs,java.rmi,java.scripting,java.security.jgss,java.security.sasl,java.sql,java.sql.rowset,java.transaction.xa,java.xml,jdk.jfr,jdk.management,jdk.net,jdk.unsupported --output /jlink-runtime

FROM bellsoft/alpaquita-linux-base:stream-musl
COPY --from=builder /jlink-runtime /jlink-runtime
COPY spring-petclinic-3.3.0-SNAPSHOT/ /spring-petclinic-3.3.0-SNAPSHOT/

EXPOSE 8080
ENTRYPOINT ["/jlink-runtime/bin/java", "-jar", "/spring-petclinic-3.3.0-SNAPSHOT/spring-petclinic-3.3.0-SNAPSHOT.jar"]


여기서는 Docker 다중 단계 빌드를 사용하여 최종 이미지를 깔끔하게 유지합니다.

우리는 커스텀 JRE를 생성하고 추출한 앱과 커스텀 JRE를 약 5MB 크기의 작은 Linux 배포인 Alpaquita Linux에 기반한 신선한 이미지로 복사합니다.

이제 Docker 이미지를 빌드하세요:


<div class="content-ad"></div>

```js
도커 빌드 -t petclinic-jre-jlink .
```

이미지 확인하세요:

```js
도커 이미지
REPOSITORY                                          TAG                                                   IMAGE ID       CREATED          SIZE
petclinic-jre-jlink                                 latest                                                3b0f5faad9c4   9 seconds ago    140MB
```

최종 컨테이너 이미지는 단 140MB밖에 차지하지 않아요! 모든 것이 제대로 작동하는지 확인하기 위해 애플리케이션을 실행해 보세요:

<div class="content-ad"></div>

```js
docker run -p 8080:8080 petclinic-jre-jlink
```

로컬호스트:8080으로 이동하면 Spring Petclinic 애플리케이션의 홈페이지가 표시됩니다.

# 종합: Docker 이미지 크기 비교

140 MB는 평균 크기의 데모 애플리케이션에 대한 양호한 결과로 보입니다. 그러나 실제로 얼마나 좋을까요?

<div class="content-ad"></div>

아래는 일반적인 JRE 기반 컨테이너 이미지를 만들기 위한 Dockerfile입니다:

```js
FROM bellsoft/liberica-runtime-container:jre-21-stream-musl
COPY spring-petclinic-3.3.0-SNAPSHOT/ /spring-petclinic-3.3.0-SNAPSHOT/
CMD ["java", "-jar", "/spring-petclinic-3.3.0-SNAPSHOT/spring-petclinic-3.3.0-SNAPSHOT.jar"]
```

앱을 도커화하고 이미지 크기를 확인하세요:

```js
docker build -t petclinic-jre-std .
docker images
REPOSITORY                                          TAG                                                   IMAGE ID       CREATED             SIZE
petclinic-jre-std                                   latest                                                325ba5c52e28   7 seconds ago       200MB
```

<div class="content-ad"></div>

60 MB는 그렇게 큰 차이가 아니라고 말할 수 있습니다. 그러나 이는 클라우드 배포용으로 최적화된 Liberica JRE Lite를 기반으로 한 Liberica Runtime Container와 Alpine-inspired 경량 배포인 Alpaquita Linux을 사용했기 때문입니다.

Liberica JDK Lite는 다듬어진 JDK가 아닙니다. 전체 Java SE 호환 JDK이지만 최적화된 모듈 압축과 같은 여러 개선 사항이 있습니다.

인기 있는 JDK 배포인 Eclipse Temurin을 가져와서 다른 컨테이너 이미지를 생성해 보겠습니다:

```js
FROM eclipse-temurin:21.0.3_9-jre-jammy
COPY spring-petclinic-3.3.0-SNAPSHOT/ /spring-petclinic-3.3.0-SNAPSHOT/
CMD ["java", "-jar", "/spring-petclinic-3.3.0-SNAPSHOT/spring-petclinic-3.3.0-SNAPSHOT.jar"]
```

<div class="content-ad"></div>

컨테이너 이미지를 빌드하고 크기를 확인해보세요:

```js
docker build -t petclinic-jre-temurin .
docker images
REPOSITORY                    TAG        IMAGE ID       CREATED         SIZE
petclinic-jre-temurin         latest     ac9fec0d6f8b   6 seconds ago   331MB
```

결과적으로, Docker 컨테이너 이미지의 크기는 331MB가 될 것입니다.

따라서, jlink를 사용하지 않은 Liberica Runtime Container로 빌드하면 Eclipse Temurin으로 이미지를 빌드한 것보다 40% 작아집니다. 그리고 jlink를 사용하면 이미지 크기가 57% 작아집니다!

<div class="content-ad"></div>

한 가지 요점을 정리하자면, 기본 이미지를 변경하는 것만으로도 리소스 소비를 최적화할 수 있는 경우가 종종 있습니다. 그 결과를 더 향상시키고 메모리 사용량을 더 줄이기 위해 jlink 도구를 사용할 수 있습니다.

코딩을 즐기세요!