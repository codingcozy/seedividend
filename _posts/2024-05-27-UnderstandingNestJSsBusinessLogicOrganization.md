---
title: "NestJS의 비즈니스 로직 조직 이해하기"
description: ""
coverImage: "/assets/img/2024-05-27-UnderstandingNestJSsBusinessLogicOrganization_0.png"
date: 2024-05-27 18:47
ogImage: 
  url: /assets/img/2024-05-27-UnderstandingNestJSsBusinessLogicOrganization_0.png
tag: Tech
originalTitle: "Understanding NestJS’s Business Logic Organization"
link: "https://medium.com/@dpericich/understanding-nestjss-business-logic-organization-5504b4ee0487"
---



![Understanding NestJS's Business Logic Organization](/assets/img/2024-05-27-UnderstandingNestJSsBusinessLogicOrganization_0.png)

전통적인 MVC 아키텍처에서 왔다면 NestJS는 낯설게 느껴질 수 있습니다. 물론, view(사용자 인터페이스) 계층, model(데이터베이스) 계층, 및 controller(비즈니스 로직) 간의 관심사 분리 아이디어는 존재합니다. 그러나 NestJS에서는 파일과 비즈니스 로직을 구조화하기 위한 새로운 흐름을 소개합니다. 라우팅 요청에 대한 컨트롤러, 비즈니스 로직 처리를 위한 서비스, 데이터베이스 조작을 위한 리포지토리의 패턴을 사용합니다. NestJS에서 비즈니스 로직을 어떻게 구성할지 살펴보겠습니다.

## 요청 처리 새로운 방식

NestJS는 구성 기반의 백엔드 프레임워크입니다. JavaScript로 작성되었지만 TypeScript를 사용할 때 가장 빛을 발합니다. 기본 NodeJS와 Express의 Wild West 접근 방식과 Ruby on Rails의 엄격한 규칙 기반 접근 방식과는 다릅니다. NestJS는 애플리케이션 개발을 위한 최상의 관행을 형성하면서도 유연한 디자인을 가능하게 하는 패턴 또는 레시피를 제공합니다.


<div class="content-ad"></div>

NestJS 프로젝트의 설정은 모듈의 조율에 중점을 두고 있습니다. 모든 로직은 기능을 제공하거나 사용하는 모듈에 래핑되어 있습니다. 다른 소프트웨어와 마찬가지로 진입점이 있으며 서로 의존하는 웹이 있습니다:

![이미지](/assets/img/2024-05-27-UnderstandingNestJSsBusinessLogicOrganization_1.png)

NestJS는 사용자 요청을 처리하기 위해 서비스와 리포지토리를 모듈 간에 공유하면서 복잡해질 수 있습니다. 단순하게 시작하여 컨트롤러, 서비스 및 리포지토리를 포함하는 격리된 모듈부터 시작하는 것이 좋습니다. 데이터베이스 변경 요청이 NestJS 프로젝트를 통해 어떻게 라우팅되는지 살펴보겠습니다.

## NestJS에서 컨트롤러는 무엇을 하는가?

<div class="content-ad"></div>

모든 것은 컨트롤러에서 시작됩니다. 클래식 MVC 프로젝트에서는 컨트롤러가 프로젝트의 많은 부분을 책임집니다. 뷰는 서버에서 반환된 데이터를 반영합니다. 모델은 데이터 구조를 제공하고 레코드와 관련된 비즈니스 로직을 저장하며, 컨트롤러는 이들 간의 모든 것을 조율합니다.

NestJS에서도 컨트롤러는 일부 비슷한 기능을 가지지만 책임은 훨씬 적습니다. 컨트롤러는 간단히 트래픽 디렉터로 기능하여 어디로 어떻게 전달해야 하는지 확인합니다. 요청 유효성 검사를 위한 파이프나 들어오는 데이터를 형성하고 유효성 검사하기 위한 DTO(데이터 전송 객체)와 같이 더 많은 기능을 추가할 수 있지만, 컨트롤러는 비즈니스 로직을 처리하지 않습니다.

NestJS에서는 컨트롤러의 역할이 요청을 수락하고 일부 유효성 검사를 수행하여 요청과 데이터를 올바른 서비스로 라우트하는 것입니다. 이는 여전히 많은 책임을 요구하지만 다른 프레임워크보다는 적습니다.

![이미지](/assets/img/2024-05-27-UnderstandingNestJSsBusinessLogicOrganization_2.png)

<div class="content-ad"></div>

## NestJS에서 서비스는 무엇을 하는가요?

요청 및 선택적 데이터가 어디로 가는지 알게 되면 비즈니스 로직에 맞게 형태를 변형합니다. 이것이 우리의 서비스 파일이 필요한 이유입니다. NestJS의 서비스는 컨트롤러로부터의 요청에 기반하여 데이터를 생성, 형태를 변형 또는 업데이트하는 로직을 말합니다. 신발을 구매한 사람을 위한 새로운 주문을 생성하거나 사용자의 구식 지불 수단을 제거하는 등의 작업이 일어날 수 있습니다.

무엇을 하든, 서비스에서는 애플리케이션 데이터에 대한 작업을 수행하여 새 상태를 지속할 수 있게 됩니다. 서비스가 데이터를 형태로 만드는 동안, 이 새 상태를 지속하기 위해 데이터베이스와 대화하는 책임은 없습니다. 데이터를 지속시키기 위해서는 저장소가 필요합니다.

## NestJS에서 리포지토리는 무엇을 하는가요?

<div class="content-ad"></div>

저장소는 데이터베이스로의 요청을 처리합니다. 사용자의 요청이 올바른 비즈니스 로직(컨트롤러에 의해)으로 라우팅되고 데이터에 필요한 작업(서비스에 의해)이 수행되면 업데이트된 응용 프로그램 상태를 영속화할 준비가 됩니다.

저장소는 CRU(D) 작업으로 구성되어 있으며 API 클라이언트와 유사한 도구로 볼 수 있습니다. 저장소의 메서드는 데이터베이스에 특정 데이터 레코드를 읽거나 쓰기를 예상합니다. 그게 전부입니다. 이는 다른 접근 방식인 ORM과는 달라요, 여기서 데이터베이스 호출이 서비스에 직접 엮이지 않습니다. 추가 파일이 늘어나는 것은 더 많은 작업이 필요해 보일 수 있지만, 별도의 저장소 파일을 갖는 것은 서비스 또는 앱 사이에서 데이터베이스 작업을 공유하고, 코드를 확장하기 위해 코드를 모듈화하는 데 도움이 됩니다.

## NestJS에 대한 마지막 생각

NestJS는 강력한 백엔드 프레임워크로 API를 빌드하는 프로세스를 가속화합니다. Ruby on Rails 또는 Java 배경에서 오는 것을 배워야 할 내용이 많을 수 있습니다. 다행히 문서는 방대하고 이해하기 쉽습니다. 깨끗하고 일관된 코드를 작성하기 위해 문서를 여러 번 검토하는 것을 강력히 권장합니다.