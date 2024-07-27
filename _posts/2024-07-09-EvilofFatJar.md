---
title: "FatJar의 단점 분석 왜 피해야 할까"
description: ""
coverImage: "/assets/img/2024-07-09-EvilofFatJar_0.png"
date: 2024-07-09 21:12
ogImage: 
  url: /assets/img/2024-07-09-EvilofFatJar_0.png
tag: Tech
originalTitle: "Evil of FatJar"
link: "https://medium.com/helidon/evil-of-fatjar-3c3011b4bd55"
---


2024년이 왔어요! ThinJar를 사용해보세요!

<img src="/assets/img/2024-07-09-EvilofFatJar_0.png" />

FatJar는 오랜 시간동안 우리와 함께해 왔어요. 처음에는 Java 앱을 종속성 jar 파일에 대해 걱정할 필요 없이 하나의 jar 아카이브로 배포할 수 있도록 했어요. 하지만 그것은 어떻게 가능했을까요? 모든 종속성을 함께 재패키징함으로써! 재패키징은 자바 모듈 시스템을 손상시킬 뿐만 아니라 CI/CD 파이프라인 속도를 상당히 늦출 수도 있어요!

# FatJar

<div class="content-ad"></div>

팻잔은 Java 애플리케이션을 한 개의 JAR에 패키징하는 방법으로, 모든 종속성의 클래스가 한 개의 새로운 JAR에 다시 패키징됩니다.

![팻잔](/assets/img/2024-07-09-EvilofFatJar_1.png)

장점:

- 쉬운 배포와 배포

<div class="content-ad"></div>

단점:

- 하나의 큰 아카이브
- 서드 파티 종속성을 제외할 수 없음
- 큰 컨테이너 이미지 레이어를 만들도록 강요함
- Java 모듈을 무너뜨림
- CDI 빈 아카이브 설명자를 깨뜨림

# ThinJar

ThinJar는 모든 종속성을 수반하는 /lib 폴더에 보관하는 멋진 이름일 뿐입니다. C 프로그램에서 정적으로 링크된 라이브러리와 마찬가지 방식입니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-EvilofFatJar_2.png" />

장점:

- 서드 파티 의존성을 제외하는 것이 쉽습니다.
- 작은 jar 아카이브
- 세밀한 컨테이너 이미지 레이어링
- 자바 모듈에 친화적
- CDI 아카이브에 친화적

단점:

<div class="content-ad"></div>

- 클래스패스 설정 시 번거로움이 더 많음

## 컨테이너 이미지

컨테이너 이미지를 만들 때 누가 어떤 역할을 하는지 명확해집니다. FatJar를 사용하면 선택의 여지가 없으며 한꺼번에 전체 JAR를 복사해야 합니다:

```js
COPY --from=build /helidon/target/quickstart.jar ./
```

<div class="content-ad"></div>

thinjar를 사용하면 종속성을 독립적인 단계로 컨테이너 이미지로 복사할 수 있어요.

```js
COPY --from=build /helidon/target/libs ./libs
COPY --from=build /helidon/target/quickstart.jar ./
```

종속성이 독립적인 단계로 컨테이너 이미지로 복사되기 때문에 별도로 캐싱됩니다. 다음에 무언가를 수정하고 비즈니스 코드만 변경할 때는 변경되지 않은 종속성을 이미지 저장소에 모두 푸시할 필요가 없어요. 작은 아카이브만 푸시하면 되어 시간과 대역폭을 절약할 수 있어요.

빠른 데모와 비교해볼까요?

<div class="content-ad"></div>

```js
git clone git@github.com:danielkec/thinjar-vs-fatjar.git
cd thinjar-vs-fatjar
docker build -t helidon/demo-thinjar . -f Dockerfile
docker build -t helidon/demo-fatjar . -f Dockerfile.fatjar
```

각 이미지의 히스토리를 비교할 때:

```js
docker history helidon/demo-fatjar:latest
```

FatJar는 하나의 2Mb 크기 layer를 생성하는 것을 볼 수 있습니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-09-EvilofFatJar_3.png)

ThinJar은 의존성만 있는 큰 레이어와 비즈니스 코드만 있는 작은 레이어 두 개를 만듭니다.

```js
docker history helidon/demo-thinjar:latest
```

![이미지](/assets/img/2024-07-09-EvilofFatJar_4.png)


<div class="content-ad"></div>

이제 조금만 변경하고 두 이미지를 다시 빌드해 봅시다.

```js
sed -i "s/^app.greeting=.*/app.greeting=Bonjour/" src/main/resources/application.properties
docker build -t helidon/demo-thinjar . -f Dockerfile
docker build -t helidon/demo-fatjar . -f Dockerfile.fatjar
```

결과에서 이미 알 수 있듯이 ThinJar 이미지는 모든 종속성을 캐시했기 때문에 아무 것도 변경되지 않았습니다.

![FatJar의 악질 (Evil of FatJar)](/assets/img/2024-07-09-EvilofFatJar_5.png)

<div class="content-ad"></div>


![FatJar image](/assets/img/2024-07-09-EvilofFatJar_6.png)

Creating a new layer with all the dependencies for the FatJar image.

![FatJar image](/assets/img/2024-07-09-EvilofFatJar_7.png)

![FatJar image](/assets/img/2024-07-09-EvilofFatJar_8.png)


<div class="content-ad"></div>

하나의 작은 변경 사항으로 FatJar로 패키징된 애플리케이션의 크기가 불필요하게 2Mb가 더 커지나요? 이제 이미 DevOps가 불평하고 있는 소리가 들리시나요?

# 결론

ThinJar이 마이크로서비스 개발에 훨씬 적합합니다. 원격 저장소로 변경 사항을 푸시하는 것이 더 빨라지고 CI/CD 파이프라인도 더 행복해집니다!

Helidon은 처음부터 ThinJar로 제공되도록 설계되었으며, Helidon의 스타터를 사용해보세요. 모든 것이 기본적으로 작동합니다.

<div class="content-ad"></div>

우리 새해 다짐은 ThinJar를 사용하는 것으로 합시다! 우리 개발팀이 감사할 거예요.

비교에 사용된 예제 프로젝트는 여기에서 찾을 수 있어요.