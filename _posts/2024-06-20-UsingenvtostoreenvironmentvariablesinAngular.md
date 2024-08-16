---
title: "앵귤러에서 환경 변수를 저장하기 위해 env 파일을 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-UsingenvtostoreenvironmentvariablesinAngular_0.png"
date: 2024-06-20 05:40
ogImage: 
  url: /assets/img/2024-06-20-UsingenvtostoreenvironmentvariablesinAngular_0.png
tag: Tech
originalTitle: "Using .env to store environment variables in Angular."
link: "https://medium.com/@desinaoluseun/using-env-to-store-environment-variables-in-angular-20c15c7c0e6a"
isUpdated: true
---





![이미지](/assets/img/2024-06-20-UsingenvtostoreenvironmentvariablesinAngular_0.png)

API 키가 포함된 Angular 프로젝트를 작업한 적이 있나요? 그리고 API 키를 사용자 정의 환경 변수에 저장하고 싶지 않았나요?

다양한 이유가 있을 수 있지만, 기본적인 사용 사례는 항상 해당 키를 깃 저장소에 노출시키지 않고자 하는 것입니다.

이 방법을 사용하고 싶은 이유와 장점은 많지만, 그에 대해 자세히 다루지는 않겠습니다. 왜냐하면 이 글을 읽고 계시다면 이미 해당 접근 방식의 이점을 알고 있으며, 이 방법이 필요하기 때문이라고 생각하기 때문입니다.


<div class="content-ad"></div>

얘기는 그만하고 이제 시작해봐요. 이 글은 이미 기존의 앵귤러 프로젝트가 있다고 가정합니다. 따라서 이 글은 역순 접근 방식을 따를 것입니다. 즉, 최종 결과물부터 작업을 진행할 겁니다.

최종 결과물은 무엇일까요? 최종 결과물은 아래와 같은 코드를 작성할 수 있도록 하는 것입니다:

STEP 1: 앱의 app.component.ts를 수정하세요.

그리고 프로세스 환경에서 값을 읽어와 앵귤러 앱에 적용해보는 거죠.

<div class="content-ad"></div>

process.env이란 무엇인가요? process.env 전역 변수는 노드에 의해 실행 시간에 응용 프로그램에서 사용할 수 있도록 주입되며, 시작할 때 응용 프로그램이 있는 시스템 환경의 상태를 나타냅니다. 예를 들어, 시스템에 PATH 변수가 설정되어 있으면 이 변수는 process.env를 통해 액세스할 수 있게 됩니다.

위의 코드 스니펫을 실행하면 대부분의 경우 컴파일 오류가 발생할 가능성이 높습니다. 기본적으로 angular는 process.env가 무엇을 의미하는지 이해하지 못하기 때문입니다. 컴파일 오류를 해결하려면 패키지를 설치해야 합니다.

단계 2: @types/node를 설치합니다.

그런 다음 아래와 같이 tsconfig.app.json 파일을 수정해야 합니다. 이렇게 하면 angular가 노드 코드 "process.env"를 이해합니다.

<div class="content-ad"></div>

**단계 3:** tsconfig.app.json을 수정합니다.

이제 "ng serve"를 실행할 때 어플리케이션은 컴파일 오류에 빠지지 않지만, 여전히 값이 정의되지 않은 곳에서 읽을 수 없는 런타임 오류가 발생합니다. 이 문제를 해결하기 위해 몇 가지 패키지를 더 설치해야 합니다.

**단계 4:** @angular-builders/custom-webpack과 dotenv-webpack을 설치합니다.

**단계 5:** angular.json을 수정합니다.

<div class="content-ad"></div>

angular.json 파일을 수정해야 합니다. projects.architect.build를 찾아서 아래와 같이 builder의 값 수정해야 합니다. 또한 options 속성과 값을 추가해야 합니다.

projects.architect.serve를 찾아서 builder의 값 수정해야 합니다.

단계 6: custom-webpack.config.ts 파일 생성

이제 src 폴더에 custom-webpack.config.ts 파일을 생성해야 합니다.

<div class="content-ad"></div>

**단계 7: .env 파일 생성**

루트 폴더에 .env 파일을 만들어주세요. 다음 형식으로 선언할 모든 변수를 추가할 수 있습니다. 이 파일은 우리의 프로세스 환경 변수 값을 보관합니다.

**단계 8: .gitignore 파일에 .env 추가**

.gitignore 파일에 .env를 추가해주세요.

<div class="content-ad"></div>

이제 제어 C를 사용하여 노드 서버를 다시 시작하고 다시 "ng serve"를 실행해야 합니다.

보너스:

아래와 같이 process.env를 사용하여 environment.prod.ts 또는 environment.ts에서 환경을 설정할 수 있습니다.

그런 다음 app.component.ts 파일은 다음과 같이 보일 것입니다.

<div class="content-ad"></div>

앱 자체에 비밀을 저장하는 것은 매우 좋지 않은 습관입니다. 그래서 프론트엔드이든 백엔드 앱이든 상관없습니다. 앱 비밀은 어떤 경우에도 공개되어서는 안 됩니다. 그래서 대부분의 호스팅 서비스에는 환경 변수를 노출시키지 않고 설정할 수 있는 기능이 있거나 보안 관리를 위해 Vault와 같은 서비스를 사용하는 경우가 많습니다.