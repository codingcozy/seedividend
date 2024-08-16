---
title: "674Mb에서 58Mb로 자바 기반 도커 이미지 최적화하는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-Optimizingjavabasedockerimagessizefrom674Mbto58Mb_0.png"
date: 2024-07-07 13:49
ogImage: 
  url: /assets/img/2024-07-07-Optimizingjavabasedockerimagessizefrom674Mbto58Mb_0.png
tag: Tech
originalTitle: "Optimizing java base docker images size from 674Mb to 58Mb"
link: "https://medium.com/@RoussiAbel/optimizing-java-base-docker-images-size-from-674mb-to-58mb-c1b7c911f622"
isUpdated: true
---




만약 당신이 자바 개발자이고 도커를 사용하여 애플리케이션을 패키징한다면, "hello world"와 같은 간단한 프로젝트에도 최종 이미지 크기가 상당히 커질 수 있다는 것을 눈치챘을 것입니다. 이 글에서는 자바 애플리케이션의 도커 이미지 크기를 최적화하기 위한 몇 가지 팁을 알려드릴 것입니다.

이 글에서는 이전 글에서 빌드한 Spring 웹 애플리케이션인 Error handling in Spring web using RFC-9457 specification을 사용하여 팁을 시연할 것입니다. 이 애플리케이션은 오직 2개의 엔드포인트를 포함하고 있습니다:

- GET /users/:id: 아이디로 사용자를 가져오기 위함
- POST /users: 새로운 사용자를 생성하기 위함

UserController.java

<div class="content-ad"></div>

```java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("{id}")
    public User getUser(@PathVariable Long id){
        return userService.getUserById(id)
                .orElseThrow(() -> new UserNotFoundException(id, "/api/users"));
    }

    @PostMapping
    public User createUser(@Valid @RequestBody User user) {
        return userService.createUser(user);
    }
}
```

코드가 별로 많지 않죠? 하지만 가장 간단한 도커 이미지의 크기(최적화를 적용하지 않은 경우)는 상당히 큽니다.

# 이미지 크기를 왜 신경 써야 할까요?

이미지 크기는 개발자 또는 조직으로서 성능에 상당한 영향을 미칠 수 있습니다. 특히 다수의 서비스가 있는 대규모 프로젝트에서 이미지 크기는 상당히 크며, 이로 인해 많은 비용과 시간이 소모될 수 있습니다.

<div class="content-ad"></div>

큰 이미지를 피해야 하는 이유 중 일부는 다음과 같습니다:

- 디스크 공간: 도커 레지스트리와 프로덕션 서버의 디스크 공간을 낭비하게 됩니다.
- 느린 빌드: 이미지가 크면 빌드하고 푸시하는 데 시간이 더 오래 걸립니다.
- 보안: 이미지가 클수록 의존성이 많아질 뿐 아니라 공격 표면도 더 많아집니다.
- 대역폭: 이미지가 클수록 레지스트리로부터 이미지를 가져오거나 푸시할 때 대역폭 소모가 더 많아집니다.

# 간단한 Dockerfile 사용하기

# 베이스 이미지 잘 고르기 ✌🏽

<div class="content-ad"></div>

적용하기 전에, 언제나 어플리케이션을 패키징할 때 사용하는 베이스 이미지를 신중하게 선택해야 합니다. 선택한 베이스 이미지는 최종 이미지의 크기에 상당한 영향을 미칠 수 있습니다.

Java 어플리케이션을 패키징하는 데 사용할 수 있는 몇 가지 베이스 이미지가 있습니다. 몇 가지 예시로는 다음과 같습니다:

- JDK Alpine 베이스 이미지: 이 이미지들은 상당히 작지만, 모든 어플리케이션에 적합하지는 않아 일부 라이브러리와의 호환성 문제가 발생할 수 있습니다.
- JDK Slim 베이스 이미지: 이 이미지들은 Debian이나 Ubuntu를 기반으로 하며, 전체 JDK 이미지에 비해 상당히 작지만 여전히 크기가 큽니다.
- JDK full 베이스 이미지: 이 이미지들은 상당히 크며, 어플리케이션을 실행하는 데 필요한 모든 모듈과 종속성을 포함하고 있습니다.

베이스 이미지의 크기에 대한 감을 잡기 위해, 여기 openjdk:17-jdk-slim (슬림)와 eclipse-temurin:17-jdk-alpine (알파인) 이미지의 크기 비교가 있습니다:

<div class="content-ad"></div>

애플리케이션 아티팩트(JAR)의 크기는 약 20MB입니다.

![이미지](/assets/img/2024-07-07-Optimizingjavabasedockerimagessizefrom674Mbto58Mb_0.png)

도커 이미지에 아티팩트를 패키징하려면 아래와 같이 애플리케이션 루트 디렉토리에 Dockerfile을 정의해야 합니다:

## 베이스 이미지로 openjdk:17-jdk-slim을 사용합니다.

<div class="content-ad"></div>

다음은 Dockerfile.base-openjdk에 대한 내용입니다.

```js
FROM openjdk:17-jdk-slim

# 컨테이너 내에서 작업 디렉토리 설정
WORKDIR /app

# 사용자 생성
RUN addgroup --system spring && adduser --system spring --ingroup spring

# 사용자 변경
USER spring:spring

COPY target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

Dockerfile을 정의한 후에는 다음 명령어를 사용하여 이미지를 빌드할 수 있습니다.

```js
docker build -t user-service .
```

<div class="content-ad"></div>

이제 사용자 서비스라는 이름의 도커 이미지가 있어야 합니다. 애플리케이션 아티팩트의 크기와 비교했을 때 이미지 크기가 상당히 큽니다. 약 674MB나 됩니다.

![이미지](/assets/img/2024-07-07-Optimizingjavabasedockerimagessizefrom674Mbto58Mb_1.png)

와우, 뭐라고요 🤯 !! 아직도 이 프로젝트는 의존성이 없는 2개 엔드포인트를 갖춘 작은 프로젝트에 불과한데, 그렇다면 수십 개의 의존성 및 파일이 있는 애플리케이션은 어떨까요 !!

## eclipse-temurin:17-jdk-alpine을 베이스 이미지로 사용합니다.

<div class="content-ad"></div>

이제 위에 있는 내용을 Markdown 포맷으로 수정했습니다:

```js
Dockerfile.base-temurin

FROM eclipse-temurin:17-jdk-alpine

ARG APPLICATION_USER=spring
# 애플리케이션을 실행할 사용자를 생성하고 루트(root)로 실행하지 마십시오
RUN addgroup --system $APPLICATION_USER && adduser --system $APPLICATION_USER --ingroup $APPLICATION_USER

# 애플리케이션 디렉토리를 생성합니다
RUN mkdir /app && chown -R $APPLICATION_USER /app

# 애플리케이션을 실행할 사용자를 설정합니다
USER $APPLICATION_USER

# jar 파일을 컨테이너로 복사합니다
COPY --chown=$APPLICATION_USER:$APPLICATION_USER target/*.jar /app/app.jar

# 작업 디렉토리를 설정합니다
WORKDIR /app

# 포트 노출
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

다음 명령을 사용하여 이미지를 빌드한 후:

docker build -t user-service:alpine -f Dockerfile.base-alpine . --platform=linux/amd64

<div class="content-ad"></div>

이클립스-테뮤린:17-jdk-alpine 기본 이미지를 사용하여 이미지를 빌드한 후 결과가 나왔어요.

![image](/assets/img/2024-07-07-Optimizingjavabasedockerimagessizefrom674Mbto58Mb_2.png)

두 이미지의 크기를 비교해보세요. 이클립스-테뮤린:17-jdk-alpine 기본 이미지를 사용한 이미지의 크기는 180MB로, 튜닝이 전혀 없어도 openjdk:17-jdk-slim을 기본 이미지로 사용한 이미지(674MB)보다 73% 작아요.

# 직접 최적화하기

<div class="content-ad"></div>

## 잠시만요, 왜 JDK 이미지 대신 JRE 이미지를 사용할 수 없을까요?

좋은 질문이네요! 이유는 Java 11부터 JRE가 더 이상 제공되지 않기 때문이에요.

![이미지](/assets/img/2024-07-07-Optimizingjavabasedockerimagessizefrom674Mbto58Mb_3.png)

## jlink를 사용하여 자체 JRE 이미지 빌드하기

<div class="content-ad"></div>

jlink은 애플리케이션을 실행하는 데 필요한 모듈만 포함하는 사용자 정의 런타임 이미지를 만들 수 있는 도구입니다.

👉 만약 애플리케이션이 데이터베이스와 상호 작용하지 않는다면, 이미지에 java.sql 모듈을 포함할 필요가 없습니다. 데스크톱 GUI와 상호 작용하지 않는다면, 이미지에 java.desktop 모듈을 포함할 필요가 없습니다. 이와 같은 방식으로 계속할 수 있습니다.

따라서 jlink을 사용하면 Dockerfile이 다음과 같아야 합니다:

# 첫 번째 스테이지, 커스텀 JRE 빌드
FROM eclipse-temurin:17-jdk-alpine AS jre-builder

# jlink에서 필요한 binutils 설치
RUN apk update &&  \
    apk add binutils

# 작은 JRE 이미지 빌드
RUN $JAVA_HOME/bin/jlink \
         --verbose \
         --add-modules ALL-MODULE-PATH \
         --strip-debug \
         --no-man-pages \
         --no-header-files \
         --compress=2 \
         --output /optimized-jdk-17

# 두 번째 스테이지, 커스텀 JRE를 사용하여 앱 이미지 빌드
FROM alpine:latest
ENV JAVA_HOME=/opt/jdk/jdk-17
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# 기본 이미지에서 JRE 복사
COPY --from=jre-builder /optimized-jdk-17 $JAVA_HOME

# 앱 사용자 추가
ARG APPLICATION_USER=spring

# 애플리케이션 실행을 위한 사용자 생성, 루트로 실행하지 않음
RUN addgroup --system $APPLICATION_USER &&  adduser --system $APPLICATION_USER --ingroup $APPLICATION_USER

# 애플리케이션 디렉토리 생성
RUN mkdir /app && chown -R $APPLICATION_USER /app

COPY --chown=$APPLICATION_USER:$APPLICATION_USER target/*.jar /app/app.jar

WORKDIR /app

USER $APPLICATION_USER

EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/app/app.jar" ]

<div class="content-ad"></div>

그러니까 여기서 한 일을 설명해보겠습니다:

- 두 단계가 있어요. 첫 번째 단계는 jlink를 사용해 커스텀 JRE 이미지를 빌드하는 데 사용되고, 두 번째 단계는 얇은 알파인 이미지에 애플리케이션을 패키징하는 데 사용돼요.
- 첫 번째 단계에서는 eclipse-temurin:17-jdk-alpine 이미지를 사용해 jlink를 통해 커스텤 JRE 이미지를 빌드했어요. 우선 jlink에 필요한 binutils를 설치하고, --add-modules ALL-MODULE-PATH(현재)를 사용해 애플리케이션 실행에 필요한 모든 모듈을 포함하는 작은 JRE 이미지를 빌드했죠.
- 두 번째 단계에서는 알파인 이미지(크기가 매우 작은 3MB)를 사용해 애플리케이션을 패키징했어요. 우리는 첫 번째 단계에서 만든 커스텀 JRE를 JAVA_HOME으로 사용했어요.
- Dockerfile의 나머지 부분은 이전 것과 동일해요. 아티팩트를 복사하고 엔트리포인트를 설정하는 것 외에 사용자를 루트가 아닌 사용자로 변경하는 것이죠.

이제 다음 명령을 사용해 이미지를 빌드할 수 있어요:

docker build -t user-service:jlink-all-modules-temurin -f Dockerfile.jlink-all-modules.temurin .

<div class="content-ad"></div>

만약 다음 명령어를 실행한다면:

docker images user-service

이미지의 새로운 Docker 이미지 크기가 85.3MB로 나왔다는 것을 알 수 있을 거예요. 이는 이제 eclipse-temurin 베이스 이미지보다 약 95MB가 더 작아진 것이에요 🎉🥳

![이미지](/assets/img/2024-07-07-Optimizingjavabasedockerimagessizefrom674Mbto58Mb_4.png)

<div class="content-ad"></div>

만약 이미지가 예상대로 작동하는지 확인하려면 다음 명령을 실행해 보세요:

docker run -p 8080:8080 user-service:jlink-all-modules-temurin

그러면 예상대로 응용 프로그램이 실행되는 것을 확인할 수 있을 거에요.

![이미지](/assets/img/2024-07-07-Optimizingjavabasedockerimagessizefrom674Mbto58Mb_5.png)

<div class="content-ad"></div>

## 부족한 부분을 해결하는 방법 🤌🏽

우리는 우수한 개발자들이기 때문에 항상 작업을 개선하고 싶어합니다. 이미지 크기를 더 줄일 수 있는 방법을 살펴보겠습니다.

이미지 크기가 여전히 큰 이유는 jlink 명령어에서 --add-modules ALL-MODULE-PATH를 사용하여 응용 프로그램을 실행하는 데 필요한 모든 모듈을 포함했기 때문입니다. 그러나 우리가 실제로 필요한 것은 그 중 일부일 뿐입니다. 그래서 애플리케이션을 실행하는 데 필요한 모듈만 포함하여 더 작은 이미지 크기를 얻는 방법을 살펴봅시다.

## 애플리케이션을 실행하는 데 필요한 모듈을 어떻게 알 수 있을까요?

<div class="content-ad"></div>

JDK에 포함된 jdeps 도구를 사용할 수 있습니다. jdeps는 jar 파일의 종속성을 분석하고 어플리케이션을 실행하는 데 필요한 모듈 목록을 생성하는 데 사용될 수 있는 도구입니다.

아래와 같은 명령을 프로젝트의 루트에서 실행하여 이 작업을 수행할 수 있습니다:

jdeps --ignore-missing-deps -q \
      --recursive \
      --multi-release 17 \
      --print-module-deps \
      --class-path BOOT-INF/lib/* \
      target/spring-error-handling-rfc-9457-0.0.1-SNAPSHOT.jar

이 명령은 어플리케이션을 실행하는 데 필요한 모듈 목록을 출력합니다. 우리 경우에는 다음과 같습니다:

<div class="content-ad"></div>

```
자바 기본, 컴파일러, 데스크탑, 인스트루먼트, 관리, 네이밍, 네트워크, 환경 설정, RMI, 스크립팅, 보안, SQL, JFR, 지원되지 않는 모듈을 jlink 명령어의 ALL-MODULE-PATH 대신 간단히 넣을 수 있습니다.

Dockerfile.jlink-known-modules.temurin

```js
# 첫 번째 단계, 커스텀 JRE 빌드
FROM openjdk:17-jdk-slim AS jre-builder

# jlink에서 필요한 binutils 설치
RUN apt-get update -y &&  \
    apt-get install -y binutils

# 작은 JRE 이미지를 빌드합니다
RUN $JAVA_HOME/bin/jlink \
         --verbose \
         --add-modules java.base,java.compiler,java.desktop,java.instrument,java.management,java.naming,java.net.http,java.prefs,java.rmi,java.scripting,java.security.jgss,java.sql,jdk.jfr,jdk.unsupported \
         --strip-debug \
         --no-man-pages \
         --no-header-files \
         --compress=2 \
         --output /optimized-jdk-17

# 두 번째 단계, 커스텀 JRE를 사용하여 애플리케이션 이미지를 빌드
FROM alpine:latest
ENV JAVA_HOME=/opt/jdk/jdk-17
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# 베이스 이미지에서 JRE를 복사합니다
COPY --from=jre-builder /optimized-jdk-17 $JAVA_HOME

# 앱 사용자 추가
ARG APPLICATION_USER=spring

# 애플리케이션을 실행할 사용자를 생성하고 루트로 실행하지 않습니다
RUN addgroup --system $APPLICATION_USER &&  adduser --system $APPLICATION_USER --ingroup $APPLICATION_USER

# 애플리케이션 디렉토리 생성
RUN mkdir /app && chown -R $APPLICATION_USER /app

COPY --chown=$APPLICATION_USER:$APPLICATION_USER target/*.jar /app/app.jar

WORKDIR /app

USER $APPLICATION_USER

EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/app/app.jar" ]
```


<div class="content-ad"></div>

그럼 다음 명령어를 사용하여 이미지를 빌드할 수 있어요:

```js
docker build -t user-service:jlink-known-modules-temurin -f Dockerfile.jlink-known-modules.temurin .
```

그리고 이미지 빌드 후의 크기는 다음과 같아요:
![이미지 크기](/assets/img/2024-07-07-Optimizingjavabasedockerimagessizefrom674Mbto58Mb_6.png)

<div class="content-ad"></div>

우리가 85.3MB 대신 57.8MB의 더 작은 이미지 크기를 얻었어요.

이게 좋긴 한데, jdeps 명령어를 수동으로 실행하고 모듈을 복사하여 jlink 명령어를 실행하는 대신에 이 과정을 자동화할 수는 없을까요?

## 도커 파일 내부에서 프로세스 자동화하기

Dockerfile.jlink-with-jdeps.temurin

<div class="content-ad"></div>


# 첫 번째 단계, 사용자정의 JRE 빌드하기
```js

FROM eclipse-temurin:17-jdk-alpine AS jre-builder

RUN mkdir /opt/app
COPY . /opt/app

WORKDIR /opt/app

ENV MAVEN_VERSION 3.5.4
ENV MAVEN_HOME /usr/lib/mvn
ENV PATH $MAVEN_HOME/bin:$PATH

RUN apk update && \
    apk add --no-cache tar binutils

RUN wget http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  tar -zxvf apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  rm apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  mv apache-maven-$MAVEN_VERSION /usr/lib/mvn

RUN mvn package -DskipTests
RUN jar xvf target/spring-error-handling-rfc-9457-0.0.1-SNAPSHOT.jar
RUN jdeps --ignore-missing-deps -q  \
    --recursive  \
    --multi-release 17  \
    --print-module-deps  \
    --class-path 'BOOT-INF/lib/*'  \
    target/spring-error-handling-rfc-9457-0.0.1-SNAPSHOT.jar > modules.txt

# 작은 JRE 이미지 빌드
RUN $JAVA_HOME/bin/jlink \
         --verbose \
         --add-modules $(cat modules.txt) \
         --strip-debug \
         --no-man-pages \
         --no-header-files \
         --compress=2 \
         --output /optimized-jdk-17

# 두 번째 단계, 사용자정의 JRE 사용하여 앱 이미지 빌드하기

FROM alpine:latest
ENV JAVA_HOME=/opt/jdk/jdk-17
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# 베이스 이미지에서 JRE 복사
COPY --from=jre-builder /optimized-jdk-17 $JAVA_HOME

# 앱 유저 추가
ARG APPLICATION_USER=spring

# 어플리케이션을 실행할 사용자 생성, 루트로 실행하지 않기
RUN addgroup --system $APPLICATION_USER &&  adduser --system $APPLICATION_USER --ingroup $APPLICATION_USER

# 앱 디렉터리 생성
RUN mkdir /app && chown -R $APPLICATION_USER /app

COPY --chown=$APPLICATION_USER:$APPLICATION_USER target/*.jar /app/app.jar

WORKDIR /app

USER $APPLICATION_USER

EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/app/app.jar" ]

이후 다음 명령어를 사용하여 이미지를 빌드할 수 있습니다.

docker build -t user-service:jlink-with-jdeps.temurin -f Dockerfile.jlink-with-jdeps.temurin . --platform=linux/amd64

<div class="content-ad"></div>

## 보너스

마무리하기 전에, 중간 과정에서 이미지의 크기를 줄일 수 있는 .dockerignore 파일을 사용하여 특정 파일이나 디렉토리를 제외할 수 있다는 점을 유의해 주세요.

또한 작은 베이스 이미지를 선택하는 것은 좋지만, 좋은 보안 정책이 적용되어 있고 애플리케이션과 호환되는지도 확인해야 합니다.

# 결론

<div class="content-ad"></div>

이 기사가 도움이 되었으면 좋겠습니다. 궁금한 점이나 의견이 있으시면 트위터나 링크드인에서 연락 주세요. 또한 새로운 기사를 보시려면 제 웹사이트 https://www.abdelrani.com을 방문해 주세요.

# 참고 자료

- [다중 단계 빌드 - Docker 공식문서](https://docs.docker.com/develop/develop-images/multistage-build/)
- [jlink - Oracle 공식문서](https://docs.oracle.com/en/java/javase/11/tools/jlink.html)
- [jdeps - Oracle 공식문서](https://docs.oracle.com/en/java/javase/11/tools/jdeps.html)
- [Java SE 11 릴리스 노트 및 문제점 - 오라클](https://www.oracle.com/java/technologies/javase/11-relnote-issues.html)