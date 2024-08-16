---
title: "Spring Boot Starter로 커스텀 라이브러리 개발하는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-DevelopingCustomLibrariesWithSpringBootStarter_0.png"
date: 2024-07-12 21:34
ogImage: 
  url: /assets/img/2024-07-12-DevelopingCustomLibrariesWithSpringBootStarter_0.png
tag: Tech
originalTitle: "Developing Custom Libraries With Spring Boot Starter"
link: "https://medium.com/better-programming/developing-custom-libraries-with-spring-boot-starter-cf463a5eca39"
isUpdated: true
---




![이미지](/assets/img/2024-07-12-DevelopingCustomLibrariesWithSpringBootStarter_0.png)

# 왜 사용자 정의 라이브러리를 만들어야 하는가?

난 자명한 답을 갖고 있는 질문처럼 보입니다. 그러나 마이크로서비스 환경에서는 사용자 정의 라이브러리를 사용해야 하는 이유에 대해 많은 논의가 있었습니다. 여기 몇 가지 주요 사항이 있습니다:

- DRY(Don't Repeat Yourself) 원리는 코드를 재사용할 수 있도록 하는 것을 권장합니다. 중복 코드를 사용자 정의 라이브러리와 같은 추상화로 추출하여 다른 여러 곳에서 호출할 수 있습니다. 공유 로직의 변경 사항은 공유 로직을 호출하는 모든 위치가 아닌 단일 라이브러리에서 발생합니다. 사용자 정의 라이브러리는 마이크로서비스 간의 코드 중복을 해결하기 위한 주요 솔루션입니다.
- 공유 코드 사용이 서비스 경계를 넘어서면 이는 결합의 한 형태를 도입한 것입니다. 저결합과 고응집력을 바탕으로 하는 마이크로서비스의 원칙에는 이는 바람직하지 않습니다.
- 어떤 사람들은 "서비스 간의 결합도가 너무 높은 것이 코드 중복으로 인한 문제보다 훨씬 더 나쁘다"고 주장합니다. (Sam Newman의 책 '빌딩 마이크로서비스'에서 인용)

<div class="content-ad"></div>

# 커스텀 라이브러리를 설계하는 가장 좋은 방법은 무엇일까요?

- 커스텀 라이브러리 내에서 도메인 특화 코드를 작성하지 않습니다.
- 비즈니스 관련 공유 코드조차 커스텀 라이브러리 내에 있어서는 안 될 것입니다.
- 공통 분모를 생각해보세요. 추상화를 생각해보세요. 기본 동작을 생각해보세요. 이러한 것들이 커스텀 라이브러리를 위한 후보 자격이 될 겁니다.

# 왜 Spring Boot Starter를 사용해야 할까요?

Spring Boot 스타터 라이브러리는 Spring Boot 애플리케이션의 주요 구성 요소 중 하나입니다. Spring Boot 개발자로서, 우리는 spring-boot-starter-web, spring-boot-starter-data-jpa, spring-boot-starter-actuator 등과 같은 애착있는 스타터 라이브러리를 사용해왔습니다. 이 글에서는 Spring Boot 스타터 프레임워크를 탐구하여 우리만의 커스텀 스타터 라이브러리를 만들어보려고 합니다. Spring Boot 스타터를 사용하면 우리의 커스텀 스타터 라이브러리 프레임워크를 만든다는 여러 이점이 있습니다.

<div class="content-ad"></div>

- Spring Boot의 자동 구성과의 심술을 더 매끄럽게 통합합니다.
- 성숙한 Spring Boot starter 프레임워크에 더 균형있는 접근 방식을 택하여 Spring Boot의 확장으로 만듭니다.
- 제 의견으로는, Spring Boot starter 프레임워크의 가장 큰 장점은 사용자 지정 라이브러리의 기본 동작을 제공하는 능력이며, 사용자 정의 동작으로 기본 동작을 덮어쓰도록 허용하기도 합니다. 이 기능 하나만으로도, 많은 면에서 사용자 지정 라이브러리가 마이크로서비스 사이에 결합을 유발하는 딜레마를 해결합니다.
네, 사용자 정의 라이브러리를 가질 수 있고 필요 시 마이크로서비스에서 해당 라이브러리의 사용자 지정 로직을 가질 수 있으며, 브릴리언트한 프레임워크인 Spring Boot starter가 제공하는 옵션을 통해 결합을 줄일 수 있습니다.

# Spring Boot Starter를 사용하여 사용자 정의 라이브러리 구축하는 방법

Spring Boot는 Spring Boot 자동 구성을 이용해 매우 쉽게 자체 사용자 지정 라이브러리를 구축할 수 있도록 했습니다. 몇 가지 간단한 단계를 따르세요:

# 단계 1: 멀티 모듈 또는 싱글 모듈 중 선택하기

<div class="content-ad"></div>

Spring의 문서에 따르면, 커스텀 스타터에는 다음이 포함될 수 있습니다:

- 라이브러리 로직에 대한 자동 구성 코드를 포함하는 autoconfigure 모듈입니다.
- autoconfigure 모듈에 대한 종속성을 제공하는 starter 모듈로써, 라이브러리 로직 및 일반적으로 유용한 추가적인 종속성도 제공합니다. 간단히 말해, 스타터를 추가하면 해당 라이브러리를 사용하기 위해 필요한 모든 것을 제공해야 합니다.

이 두 모듈로 분리하는 것은 반드시 필요한 것은 아닙니다. 라이브러리 로직에 복수의 변형, 옵션 또는 선택적 기능이 있다면 자동 구성을 분리하는 것이 좋습니다. 그러면 몇 가지 기능이 선택적임을 명확하게 표현할 수 있습니다.

또한, 선택적 종속성에 대한 의견을 제공하는 스타터를 만들 수 있습니다. 동시에, 다른 사람은 autoconfigure 모듈만을 활용하고 다른 의견으로 자체 스타터를 만들 수도 있습니다.

<div class="content-ad"></div>

만약 자동 구성이 비교적 간단하고 선택적 기능이 없다면, 스타터의 두 모듈을 병합하는 것이 라이브러리 구조를 간단하게 만드는 데 이상적입니다.

이 지침에 따라 우리의 사용자 정의 라이브러리에 대해 제안할 수 있습니다. 라이브러리 로직이 매우 간단한 경우에는 한 모듈만 생성하는 것이 좋습니다. 단순하게 하고, 과도한 엔지니어링을 하지 맙시다. 여러 구현이 필요한 특수 라이브러리 시나리오의 경우, 위에서 언급한 두 모듈 방식을 채택하는 것이 좋습니다.

# 단계 2: 라이브러리 이름 선택

Spring의 사용자 정의 라이브러리 네이밍 규칙에 따르면, 우리는 이름을 먼저 라이브러리 이름으로 시작하고 그 뒤에 "-spring-boot-starter"를 붙여야 합니다. 예를 들어, 샘플 사용자 정의 라이브러리의 경우, 우리의 아티팩트 ID를 "sample-spring-boot-starter"로 지정해야 합니다. 이유는 만약 우리가 라이브러리 이름을 "spring-boot-starter-"로 시작한다면, 이는 Spring Boot Starter 라이브러리나 앞으로 제공할 수 있는 새로운 스타터와 충돌할 가능성이 높기 때문입니다.

<div class="content-ad"></div>

커스텀 라이브러리를 위한 의존성을 추가할 때는 pom 내에서 라이브러리의 artifact id를 명시해야 합니다. 예를 들어:

# Step 3: pom.xml 변경 사항

커스텀 라이브러리에 대한 특정 의존성을 추가하는 것 외에도, 사용 중인 spring-boot-starter-parent 버전이 3.0.0-M5임을 명시해야 합니다. 이는 이 글 작성 시점의 최신 부트 3 마일스톤 버전입니다.

또한, spring-boot-autoconfigure 의존성을 추가하는 것도 잊지 말아주세요.

<div class="content-ad"></div>

# 단계 4: 사용자 지정 라이브러리의 주요 로직을 정의하는 서비스 레이어 만들기

이것은 서비스 레이어, 구성 레이어 또는 다른 레이어에서 자세한 라이브러리 로직 구현입니다. 우리가 사용자 정의 라이브러리로 추출하고 싶었던 공유 코드입니다.

# 단계 5: 사용자 정의 자동 구성 클래스 만들기

이 단계는 사용자 정의 라이브러리가 사용자 정의 Spring Boot 스타터가 되는 핵심입니다.

<div class="content-ad"></div>

다음은 샘플 코드입니다:

- @ConditionalOnClass 어노테이션은 SampleService 클래스가 ApplicationContext에 존재하는 경우에만 SampleService 클래스를 포함할 수 있게 합니다.
- @ConditionalOnMissingBean 어노테이션은 ApplicationContext에 SampleService 타입 빈이 없는 경우에는 sampleService 빈을 생성한다는 것을 나타냅니다.

# 단계 6: spring.factories 파일 추가하여 사용자 정의 자동 구성 클래스 반영하기

spring.factories 파일은 Spring Boot가 부팅 중에 자동으로 로드하는 파일입니다. Spring Boot는 jar 파일 내 META-INF 디렉토리에 spring.factories 파일이 있는지 확인합니다. 해당 파일에는 EnableAutoConfiguration 키 아래에 구성 클래스를 나열해야 합니다.

<div class="content-ad"></div>

저희 샘플에서는 Spring Boot에게 SampleAutoConfiguration 클래스를 EnableAutoConfiguration의 후보로 사용하도록 지시합니다. 이를 위해 META-INF/spring.factories에 아래와 같이 등록합니다:

```js
org.springframework.boot.autoconfigure.EnableAutoConfiguration=com.github.wenqiglantz.library.sample.config.SampleAutoConfiguration
```

커스텀 스타터 라이브러리를 만들었다면, 단순히 새로운 의존성을 추가하여 마이크로서비스에서 우리의 커스텀 스타터 라이브러리를 호출할 수 있습니다. 이는 일반적인 Spring Boot 스타터 라이브러리를 추가하는 방법과 동일합니다.

이 곳에서 GitHub에서 샘플 커스텀 Spring Boot 스타터를 찾을 수 있습니다. 이 샘플은 새로운 커스텀 라이브러리를 만드는 데 사용할 수 있는 템플릿 역할을 합니다. 상기 모든 기능을 제공하며, 추가로 다음을 제공합니다:

<div class="content-ad"></div>

- 코딩 스타일 자동화를 보장하기 위한 체크스타일 메이븐 플러그인
- 단위 테스트 커버리지를 보장하기 위한 자코코 메이븐 플러그인
- 써드파티 라이브러리의 취약점이 포함되어 있지 않도록 보장하기 위한 디펜던시 체크 플러그인

# 디펜던시 계층 구조

이 샘플 서비스 라이브러리에 대한 완료된 디펜던시 계층 구조는 다음과 같습니다:

![Dependency Hierarchy](/assets/img/2024-07-12-DevelopingCustomLibrariesWithSpringBootStarter_1.png)

<div class="content-ad"></div>

# 커스텀 라이브러리를 보관하는 모노레포

구글, 페이스북, 우버 등 엔지니어링 중심의 기업들은 기반 시설의 핵심 요소로서 모노레포를 채택해, 많은 사용이 시작되었습니다. 이번에는 우리의 커스텀 라이브러리를 보관하기 위해 모노레포를 사용하는 장단점을 살펴보겠습니다.

## 장점

- 팀 간 더 나은 가시성과 협력. 모노레포는 커스텀 라이브러리를 더 쉽게 찾고 활용할 수 있도록 도와줍니다. 이는 협업을 촉진하고 코드 재사용을 촉진함으로써 기술 부채를 줄일 수 있습니다.
- 단순화된 의존성 관리. 모노레포는 내부 및 타사 의존성 관리를 간편화하는 데 도움을 줄 수 있습니다. 다이아몬드 의존성 문제나 동일한 의존성의 여러 버전을 가진 여러 프로젝트의 우려와 같은 문제를 해결하는 데 도움이 됩니다.
- 대규모 코드 리팩터링. 특정 기능을 리팩터링하기 위해 여러 프로젝트에 걸쳐 여러 PR을 작성할 필요 없이, 모노레포를 사용하면 해당 기능을 활용하는 서비스를 한 번의 커밋으로 해결할 수 있습니다.
- 단순화된 릴리스. 새 릴리스를 빌드할 때 모든 라이브러리에 동일한 버전을 생성하여, 라이브러리를 사용할 때 모두 동일한 버전을 사용할 수 있습니다.

<div class="content-ad"></div>

## 단점

- 빌드 파이프라인. 대규모 코드베이스를 가진 팀에게 빌드를 민첩하게 수행하는 것은 어려울 수 있습니다. 페이스북과 구글은 각각 매우 큰 모노레포에 대한 빌드 프로세스를 관리하기 위해 자체 빌드 도구(Buck 및 Bazel)를 개발했습니다. 다행히도 Buck와 Bazel은 오픈소스로 공개되어 있으므로 모노레포를 사용하는 경우 그들을 활용할 수 있습니다.
- VCS 도구 관련 문제. 대규모 코드베이스와 수백만 개의 커밋을 가진 조직은 git 성능에 영향을 받을 수 있습니다.
- 액세스 제어 제한. 모노레포의 경우 개발자들은 그 안의 모든 코드에 접근할 수 있습니다. 특정 라이브러리에 대한 액세스 제한을 하는 것이 쉽지 않습니다.
- 오픈소스 취약성 우선순위 및 라이선스. 모노레포를 사용하면 오픈 소스 종속성을 관리하기 쉬워지지만, 취약성 수정 우선순위를 결정하고 제품별 속성 보고서를 생성하는 프로세스를 복잡하게 할 수 있습니다. 각 제품을 빌드하는 데 사용된 파일과 종속성을 이해하기 위해 SCA(소프트웨어 구성 분석) 또는 오픈 소스 관리 소프트웨어를 빌드 시스템과 통합해야 합니다.

# 요약

우리는 이야기의 초반에 사용자 정의 라이브러리에 대한 주장을 탐구했습니다. 그런 다음 Spring Boot 스타터 프레임워크가 사용자 정의 라이브러리를 개발하는 데 훌륭한 선택인 이유를 살펴보았습니다. 이어서 Spring Boot 스타터를 사용하여 사용자 정의 라이브러리를 개발하는 단계별 지침을 살펴보았습니다.

<div class="content-ad"></div>

저의 GitHub 저장소에서 샘플 코드를 찾을 수 있어요.

코딩 즐겁게 하세요!

# 참고 자료

Spring Boot 참조 문서

<div class="content-ad"></div>

마이크로서비스 공유 라이브러리 - 디자인 및 모베스트 프랙티스

Monorepos 사용의 장단점 - FOSSA