---
title: "Angular에서 첫 번째 라이브러리 만드는 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_0.png"
date: 2024-06-23 13:52
ogImage: 
  url: /assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_0.png
tag: Tech
originalTitle: "Step-by-step guide to creating your first library in Angular"
link: "https://medium.com/angular-in-depth/step-by-step-guide-to-creating-your-first-library-in-angular-6827276bfc9f"
isUpdated: true
---




<img src="/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_0.png" />

안녕하세요! 라이브러리 프로젝트를 진행 중이었고, 각본을 만들 때는 앵귤러 라이브러리를 단계별로 만드는 방법을 어딘가에 기록하지 않았다는 것을 깨닫게 되었습니다. 이것은 나중에 참고할 수 있도록 그리고 여러분을 위해도 올린 것입니다. 그러니 시작해 보겠습니다!

이 블로그 글을 시작하기 전에, 앵귤러 라이브러리 코딩랩에 대해 말씀드리고 싶습니다. 나는 Angular를 사용하여 라이브러리를 만드는 동안 마주치는 모든 가능한 오류들을 설명하고 있는 코딩랩을 준비 중입니다. 이 코딩랩은 CLI를 사용하여 라이브러리를 만드는 방법을 단계별로 안내하는 내용이 될 것입니다. 이 코딩랩은 자세한 레시피가 되어서, 여러분은 그대로 따라 하여 라이브러리를 만들 수 있습니다.

이 블로그 글에서는 라이브러리의 개요, 라이브러리 생성, 앵귤러 애플리케이션에서 로컬로 사용하는 방법, npm에 발행하는 방법에 대해 이야기하겠습니다.

<div class="content-ad"></div>

라이브러리 만들기: [여기](https://github.com/NishuGoel/ngSLDemo)

라이브러리 사용하기: [여기](https://github.com/NishuGoel/consuming-angular-lib)

# 개요

우선, 프로그래밍에서 라이브러리란 일반적으로 무엇을 의미하는지 이해해 보겠습니다.

<div class="content-ad"></div>

사전 컴파일된 루틴 - 이것은 반복적으로 수행할 작업의 컴파일된, 확립된, 즉시 사용 가능한 버전임을 시사합니다.
프로그램이 사용할 수 있다 - 이는 이 재사용성이 라이브러리가 생성된 프로젝트가 아니더라도 여러 다른 프로젝트에서 활용될 수 있다는 것을 시사합니다.

이 모든 것을 종합하면, 라이브러리는 주로 여러 프로젝트에서 사용할만한 기능 세트이며 해당 기능의 컴파일된 버전이 번들로 제공되어 필요한 프로젝트에 제공됩니다. 따라서 라이브러리의 기능은 다음과 같습니다.

- 쉽게 공유할 수 있는 코드
- 반복해서 사용할 수 있는 기능
- 하나의 기능을 위해 별도로 지정된 코드

Angular 라이브러리에는 기능을 정의하기 위한 컴포넌트, 모듈, 서비스가 포함되어 있습니다. 우리 앱에서 이미 많은 라이브러리를 사용하고 있습니다. 예를 들어 카운트 다운 타이머나 스크롤 바와 같은 기능을 위해서 사용됩니다. 자주 사용되는 기능이 있다면 왜 그것을 라이브러리로 내보내어 활용하지 않을까요? 많은 Angular/Javascript 라이브러리에 연결된 Angular 애플리케이션으로 생각해보세요.

<div class="content-ad"></div>

# 어떤 라이브러리가 Angular 라이브러리로서 자격을 갖추려면 무엇이 있어야 할까요?

- 먼저 플랫폼 독립적이어야 합니다.
- 번들화되고 배포돼야 합니다.
- AOT 컴파일레이션 준비가 되어 있어야 합니다.
- TypeScript로 작성돼야 합니다.

이제 모든 사람이 소비하기 쉽도록 표준화되고 있는 라이브러리를 만들기 위해서는 패키지를 어떻게 배포해야 하는지에 대한 표준이나 권장 방법이 있어야 합니다.

Angular 패키지 포맷은 우리의 Angular 패키지를 배포하는 추천 방법입니다. 이는 다음에 중점을 두고 있습니다:

<div class="content-ad"></div>

- 모듈 정의
- 타이핑 파일
- 진입점
- AOT 준비 메타데이터 파일

APF를 여기에서 읽으세요.

# 라이브러리 만들기

주로 라이브러리를 만드는 데 필요한 중요한 단계는 모든 템플릿을 인라인하고 ngc로 컴파일하여 빌드 형식을 생성하는 것입니다. 그러나 이는 많은 수동 작업이 필요하고 ng-packagr이 이를 해결하기에 충분합니다.

<div class="content-ad"></div>

ng-packagr을 사용하여 라이브러리를 생성하는 방법에 대해 작성했어요.

David Herges가 만든 ng-packagr은 단일 명령어를 사용하여 라이브러리를 빌드하고 패키징할 수 있게 해줍니다. 그러나 Angular 6 이후에는 CLI 내에 통합되어 있어, ng-packagr을 사용하여 Angular 라이브러리를 생성하는 데 ng generate 명령어를 사용할 수 있습니다.

ng-packagr이 우리를 위해 처리해주는 것들은 무엇이 있을까요?

- Angular 패키지 형식으로 라이브러리 생성
- 모든 번들 생성 (es52015, esm5, umd)
- 형식 정의 파일(.d.ts) 생성
- aot 메타데이터 파일 생성
- 모든 스타일과 템플릿을 인라인으로 처리합니다!

<div class="content-ad"></div>

저희 라이브러리를 위한 작업 공간을 만들어보겠습니다!

다음 명령어를 사용하여 새로운 애플리케이션을 생성하되 애플리케이션을 만들지 않도록 설정하세요.

```bash
ng new `application-name` --create-application=false
```

이렇게 하면 애플리케이션을 만들지 않고 작업 공간만 생성됩니다. 이후 해당 작업 공간 내에서 라이브러리를 생성할 수 있습니다. 아래 이미지를 참고하세요.

![Step-by-step guide to creating your first library in Angular](/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_1.png)


<div class="content-ad"></div>

ng generate library `library-name`

이 명령은 lib 폴더가 포함된 projects 폴더를 생성합니다. 여기서 라이브러리에 추가할 기능을 작성할 수 있어요! 

![Step-by-step guide to creating your first library in Angular](/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_2.png)

라이브러리 작성을 마쳤나요?

<div class="content-ad"></div>

# 라이브러리 구축 시간입니다!

루트 package.json에 빌드 라이브러리 스크립트를 추가하세요:

```json
"build-library": "ng build nishu-library”
```

![이미지](/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_3.png)

<div class="content-ad"></div>

이렇게 하면 라이브러리를 위한 dist 폴더가 생성됩니다.

![이미지](/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_4.png)

프로젝트가 조금 어려워지기 시작하는 지점입니다. 왜냐하면 이제 전체 프로젝트에는 3개의 package.json 파일이 모두 포함되어 있다는 것을 알아차릴 것입니다. 루트 package.json에는 라이브러리 빌드 스크립트가 작성되어 있고, 라이브러리 package.json에는 라이브러리의 이름, 버전과 같은 정보가 제공됩니다. 이것은 라이브러리를 npm에 배포할 때 사용됩니다. 라이브러리를 패키징할 때에 대해 이야기를 나눌 것입니다.
세 번째 package.json은 방금 생성한 라이브러리의 배포 폴더에 있습니다. 이 폴더에는 내보낼 최종 코드가 포함되어 있습니다.

# 라이브러리 패키징

<div class="content-ad"></div>

우리 라이브러리를 패키징하려면 라이브러리 배포 디렉토리로 이동하여 npm pack 명령을 실행하면 됩니다.

여기서 라이브러리 디렉토리를 패킹하는 혼란을 피합니다. 라이브러리의 빌드된 배포 폴더를 패킹해야 합니다. 이를 수동으로 하는 대신에 스크립트도 추가할 수 있습니다.

"pack-lib": "cd dist/nishu-library && npm pack"

이렇게 하면 라이브러리용 .tgz 패키지가 생성되고, 이를 내보낼 것입니다. 다른 애플리케이션에서 사용될 것입니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_5.png" />

우리의 패키지가 준비되었으니, 다른 애플리케이션 내에서 사용하여 테스트할 수 있습니다.

새로운 Angular 애플리케이션을 생성하고 다음을 사용하여 라이브러리를 설치하세요:

npm install `path-to-tgz-file`

<div class="content-ad"></div>

패키지.json을 확인해 보세요. 종속성에 설치되었는지 확인하세요.

다음과 같이 파일이 추가된 것을 확인할 수 있을 겁니다:

![image](/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_6.png)

다음 단계로, 라이브러리의 모듈을 가져와 컴포넌트를 사용하세요.

<div class="content-ad"></div>


' NishuLibraryModule'를 `nishu-library`에서 가져와주세요.

이렇게 하면 프로젝트에서 이 모듈 내에서 선언된 컴포넌트에 액세스할 수 있게 됩니다. 이제 템플릿에서 이 컴포넌트를 직접 사용하여 작동 방식을 확인할 수 있습니다!

<img src="/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_7.png" />

템플릿에서는,


<div class="content-ad"></div>

```js
<section class="body-section">
    <lib-nishu-library></lib-nishu-library>
</section>
```

여기 있어요!

<img src="/assets/img/2024-06-23-Step-by-stepguidetocreatingyourfirstlibraryinAngular_8.png" />

# 마지막으로 우리 라이브러리를 게시해 봅시다.

<div class="content-ad"></div>

라이브러리를 게시하려면 npm 패키지에 대한 네이밍 규칙을 따르고 고유하게 유지해야 합니다. npm에는 많은 라이브러리가 있으므로, 라이브러리를 @`your-username`/`library-name`과 같이 명명하는 것이 쉬운 방법입니다.

다음 단계는 package.json 내부에 라이브러리의 이름과 버전을 지정하는 것입니다.

```js
{
  "name": "nishu-library",
  "version": "1.0.0",
  "peerDependencies": {
        "@angular/common": "~9.0.0",
        "@angular/core": "~9.0.0",
  }
}
```

peerDependencies는 소비 프로젝트에 해당 패키지 버전과 잘 호환됨을 알리는 방법입니다. 라이브러리의 버전을 주요 버전, 부 버전, 패치 버전 구체적으로 따르기 위해 시맨틱 버전팅을 사용하세요. SemVer에 대해 자세히 알아보세요.

<div class="content-ad"></div>

패키지.json에는 작성자, 라이선스 등 라이브러리에 대한 더 많은 정보를 추가할 수 있습니다.

라이브러리를 빌드하고 dist 폴더에 업데이트된 패키지.json을 찾으세요. pack-lib 스크립트를 사용하여 새 번들을 패키징하세요.

모두 준비되었나요? 이제 npm에 로그인합시다. 명령줄 또는 GUI에서 둘 다 가능합니다.

npm login을 사용하여 npm에 로그인하고 npm whoami로 확인하세요.

<div class="content-ad"></div>

단계별로 첫 번째 Angular 라이브러리를 만드는 방법에 대한 안내서.

<div class="content-ad"></div>

짠, 이제 누구나 아래와 같이 Angular 프로젝트에서 이 공개 라이브러리를 사용할 수 있어요:

```bash
npm i nishu-library
```

읽어 주셔서 감사합니다! 피드백/질문은 트위터/링크드인을 통해 연락해 주세요. 🚀