---
title: "앵귤러 애플리케이션에서의 environmentts 파일에 대하여"
description: ""
coverImage: "/assets/img/2024-06-20-AboutenvironmenttsinyourAngularapplications_0.png"
date: 2024-06-20 03:30
ogImage: 
  url: /assets/img/2024-06-20-AboutenvironmenttsinyourAngularapplications_0.png
tag: Tech
originalTitle: "About environment.ts in your Angular applications"
link: "https://medium.com/@hongtatyew/about-environment-ts-in-your-angular-applications-50646ab08c81"
---


`<img src="/assets/img/2024-06-20-AboutenvironmenttsinyourAngularapplications_0.png" />`

Environment.ts는 애플리케이션 설정을 보관하는 일반적인 장소입니다. Angular 애플리케이션의 컴포넌트, 파이프 또는 다른 TypeScript 파일에 설정을 직접 하드코딩하는 대신 환경 파일에 애플리케이션 설정을 저장하면 다양한 애플리케이션 환경에서 다른 설정을 가질 수 있습니다. 또한, 모든 애플리케이션 설정이 한 파일에 집중되어 필요에 따라 쉽게 수정할 수 있습니다.

환경.ts는 Angular 문서에서 잘 문서화되어 있지만 Angular 애플리케이션 구축 및 실행 주제에서 유지됩니다. 따라서 일부 사용자는 환경.ts 파일의 사용법을 모를 수 있습니다.

# 면책 조항

<div class="content-ad"></div>

이 문서는 Angular 공식 문서와 거의 유사합니다. 환경 설정을 더 잘 다루는 방법을 이해할 수 있도록 이 문서에 추가 정보를 포함했습니다. 이 문서는 오래되었을 수 있으니 항상 최신 정보를 참조하려면 공식 Angular 문서를 참고하세요: Angular 애플리케이션 빌드 및 제공.

# 환경 폴더 구조

모든 Angular 프로젝트에 environments 폴더가 있습니다. 이 폴더는 모든 애플리케이션 설정이 환경별로 보관되는 곳입니다. environment.ts는 기본 환경 파일로 프로젝트에서 참조됩니다.

```js
yourProject/src/environments
- environment.ts
- environment.prod.ts
```

<div class="content-ad"></div>

# environment.ts 파일 사용 방법

여러 개의 파일이 environments 폴더에 있기 때문에 무엇을 가져와야 할지 궁금할 수 있습니다. 애플리케이션 설정을 사용하려면 environment.ts 파일을 가져오기만 하면 됩니다. 아래에서 이유를 설명하겠습니다.

```js
import { environment } from './../environments/environment';
```

아래 스니펫은 app.component.ts가 environment.ts 파일에서 변수를 사용하는 방법을 보여줍니다.

<div class="content-ad"></div>

```js
// app.component.ts
import { Component } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    if(environment.production) { // 👈🏻👈🏻👈🏻
      // 만약 이것이 프로덕션 환경이라면 구현 코드 작성
    }
  }
  title = 'app works!';
}
```

# environment.ts 파일의 production 변수

새로운 Angular 애플리케이션을 생성할 때마다 미리 설정된 production 변수를 찾을 수 있습니다.

```js
// 이 파일은 `fileReplacements` 배열을 사용하여 빌드 중에 대체될 수 있습니다.
// `ng build --prod`는 `environment.ts`를 `environment.prod.ts`로 대체합니다.
// 파일 대체 목록은 `angular.json`에서 찾을 수 있습니다.

export const environment = {
  production: false // 👈🏻👈🏻👈🏻
};
```

<div class="content-ad"></div>

질문: 이 변수를 삭제할 수 있을까요? 답은 아니요입니다. 왜냐하면 이 변수는 main.ts에서 사용되어 있어서 production 변수가 true로 설정된 경우 production 모드를 활성화하는 데 사용됩니다. Production 모드를 활성화하면 Angular은 변경 감지 과정이 어떤 바인딩에 추가 변경 사항이 생기지 않는지 확인하여 응용 프로그램 성능을 향상시킵니다 (일방향 데이터 흐름이라고도 함). 이 enableProdMode 메서드에 대해 자세히 다루지는 않겠습니다. enableProdMode에 대해 더 알고 싶다면 이 기사에서 enableProdMode가 무엇을 하는지 자세히 읽어보시기 바랍니다: https://lukaonik.medium.com/what-is-the-difference-between-production-and-development-mode-in-angular-3eed82b9cf73. 다시 말해서, 응용 프로그램을 디버깅하지 않을 때는 production 변수를 항상 true로 설정해야 합니다.

```js
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode(); // 👈🏻👈🏻👈🏻
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

팁: Angular은 앱이 개발 모드에서 실행 중인지 확인하기 위한 유틸리티 함수를 제공합니다.

```js
import { Component, OnInit, isDevMode } from '@angular/core';

@Component({ ... })
export class AppComponent implements OnInit {
  ngOnInit() {
    if (isDevMode()) { // 👈🏻👈🏻👈🏻
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
```

<div class="content-ad"></div>

# environment.ts 파일에 변수를 추가하고 Angular 애플리케이션에서 이 변수를 사용하세요.

필요에 따라 environment.ts 파일에 하나 이상의 변수를 추가할 수 있습니다. environment.ts에 enableLogging이라는 간단한 변수를 추가해 봅시다:

```js
// environment.ts

// 이 파일은 `fileReplacements` 배열을 사용하여 빌드 중에 교체될 수 있습니다.
// `ng build --prod`는 `environment.ts`를 `environment.prod.ts`로 대체합니다.
// 파일 교체 목록은 `angular.json`에서 찾을 수 있습니다.

export const environment = {
  production: false,
  enableLogging: true
};
```

새로 추가된 이 변수를 사용하려면 environment.ts 파일을 import하여 Angular 애플리케이션의 모든 TypeScript 파일에서 사용하면 됩니다.

<div class="content-ad"></div>

```js
// app.component.ts

import { Component } from '@angular/core';
import { environment } from './../environments/environment'; // 👈🏻👈🏻👈🏻

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    if(environment.enableLogging) { // 👈🏻👈🏻👈🏻
      console.log('Angular app started');
    }
  }
  title = 'app works!';
}
```

# 환경별 응용 프로그램 설정 구성

일반적으로 한 애플리케이션 당 여러 환경이 있습니다. Angular 애플리케이션의 설정은 개발자마다 다를 수 있습니다. 그럼에도 불구하고 추가 환경을 구성하려면 개발 및 프로덕션 환경 이외의 환경을 설정해야 합니다.

기본적으로 Angular 애플리케이션에는 environment.ts 및 environment.prod.ts가 있습니다. 저는 개발 환경으로 environment.ts를 사용합니다. 지역에서 Angular 애플리케이션을 개발하기 때문에 명령에 추가 인수를 추가할 필요가 없고, environment.ts가 기본 설정으로 사용됩니다. 반면 프로덕션 환경에서는 ng serve --configuration production과 같은 추가 매개변수를 전달해야 합니다.

<div class="content-ad"></div>

기존 Angular 애플리케이션을 위한 스테이징 환경을 구성해 보겠습니다.

먼저 environments 폴더에 새 파일을 추가해야 합니다. 파일의 네이밍 컨벤션은 environment.`environment_name`.ts 입니다. environment.staging.ts 라는 파일을 다음 내용과 함께 생성해 봅시다:

```js
// environments/environment.staging.ts
export const environment = {
  production: true // 애플리케이션을 디버깅 중이 아니라면 true
};
```

그 다음, environment.ts에 있는 모든 변수는 이 environment.staging.ts에 있어야 합니다. 왜냐하면 environment.staging.ts가 컴파일 시(environment.ts 파일 대체) 필요하기 때문입니다 (ng serve 또는 ng build). 따라서 environment.staging.ts 파일에 누락된 변수가 없어야하며, 그렇지 않으면 컴파일이 실패할 수 있습니다.

<div class="content-ad"></div>

안전을 위해 environment.ts의 내용을 environment.staging.ts로 복사한 후 environment.staging.ts의 설정을 스테이징 설정으로 수정하세요. 이제 environment.staging.ts를 마친 것입니다.

ng build를 위한 angular.json 확장

ng build 명령어는 Angular 애플리케이션을 컴파일하는 데 사용됩니다. 스테이징 환경으로 애플리케이션을 컴파일해야 할 때는 ng build --configuration staging이 필요합니다. 이 명령어를 실행하려고 하면 지금처럼 오류 메시지가 나올 것입니다.

이는 angular.json에서 스테이징 구성을 설정하지 않았기 때문입니다. 루트 폴더의 angular.json으로 이동하여 build configurations에서 production 구성을 복사하고 (아래 스니펫에서 production 구성 위치를 확인하십시오), 복사한 구성을 production 구성 바로 아래에 붙여넣으세요. 붙여넣은 구성의 이름을 staging으로 변경하고 파일 교체 경로를 스테이징 환경 파일 경로로 설정하세요. 이제 ng build --configuration staging을 다시 실행하면 성공적으로 빌드할 수 있을 것입니다.

<div class="content-ad"></div>

만약 주목했다면, configurations 맨 끝에 defaultConfiguration 설정이 있습니다. 이 설정은 ng build를 실행할 때 기본 구성을 설정하는 것입니다. 어떤 구성도 지정하지 않았다면 빌더는 defaultConfiguration에서 구성을 사용합니다. 지금 ng build를 실행하면 기본 구성은 프로덕션 구성이 될 것입니다.

```js
{
    [...]
    "projects": {
      "your-project-name": {
        [...]
        "architect": {
          "build": {
            [...]
            "configurations": { 
              "production": { // 👈🏻👈🏻👈🏻 이 섹션을 복사하세요
                "budgets": [
                  {
                    "type": "initial",
                    "maximumWarning": "500kb",
                    "maximumError": "1mb"
                  },
                  {
                    "type": "anyComponentStyle",
                    "maximumWarning": "2kb",
                    "maximumError": "4kb"
                  }
                ],
                fileReplacements: [
                  {
                    replace: 'src/environments/environment.ts',
                    with: 'src/environments/environment.production.ts',
                  },
                ],
                "outputHashing": "all"
              },
              "staging": { // 👈🏻👈🏻👈🏻 여기에 붙여넣고 staging으로 이름을 변경하세요
                "budgets": [
                  {
                    "type": "initial",
                    "maximumWarning": "500kb",
                    "maximumError": "1mb"
                  },
                  {
                    "type": "anyComponentStyle",
                    "maximumWarning": "2kb",
                    "maximumError": "4kb"
                  }
                ],
                fileReplacements: [
                  {
                    replace: 'src/environments/environment.ts',
                    with: 'src/environments/environment.staging.ts', // 환경 파일 경로를 staging 환경 파일 경로로 변경하세요
                  },
                ],
                "outputHashing": "all"
              },
              [...]
            },
            "defaultConfiguration": "production"
          },
          [...]
        }
      }
    }
  }
```

ng serve를 위해 angular.json을 확장하기

ng serve는 Angular 애플리케이션을 로컬에서 실행하려는 경우 사용하는 명령어입니다. 이 명령은 애플리케이션을 빌드하고 서비스하며 파일 변경 시 다시 빌드합니다. 이미 ng build를 설정했습니다. ng serve는 빌드 구성을 사용하여 애플리케이션을 빌드하고 제공합니다. 그런 다음 다음 형식의 serve 구성을 serve configurations에 추가해야 합니다.

<div class="content-ad"></div>

```js
"<환경 이름>": {
  "browserTarget": "your-project-name:build:<빌드 구성에서의 환경 이름>"
},
```

스테이징 환경에서는 angular.json 파일이 다음과 같이 보일 것입니다.

```js
{
    [...]
    "projects": {
      "your-project-name": {
        [...]
        "architect": {
          [...]    
          "serve": {
            "builder": "@angular-devkit/build-angular:dev-server",
            "configurations": {
              "production": {
                "browserTarget": "your-project-name:build:production"
              },
              "staging": { // 👈🏻👈🏻👈🏻 이 serve 구성을 추가합니다
                "browserTarget": "your-project-name:build:staging"
              },
              "development": {
                "browserTarget": "your-project-name:build:development"
              }
            },
            "defaultConfiguration": "development"
          },
          [...]
        }
      }
    }
  }
```

ng serve --configuration staging 명령을 실행하면 스테이징 설정으로 애플리케이션을 실행할 수 있습니다.

<div class="content-ad"></div>

# Angular schematic을 사용하여 환경 추가하기

Angular 애플리케이션에 환경 하나를 추가하면 구성해야 할 설정이 많을 것이라고 생각할 수 있습니다. 그리고 왜 자동으로 추가되지 않는 것인지 의아해할 수도 있습니다. 걱정하지 마세요. Angular CLI(버전 15.1 이상)에는 새로운 schematic이 추가될 예정입니다. 이를 통해 Angular 애플리케이션에 환경을 추가할 수 있습니다. 이 작업은 단순히 다음 명령을 실행하면 됩니다. `ng generate environments`를 실행하면 새로운 환경이 Angular 애플리케이션에 추가됩니다. 이에 대한 자세한 내용은 여기에서 확인할 수 있습니다: [Bring back environment.ts to new projects · Issue #24381 · angular/angular-cli · GitHub](https://github.com/angular/angular-cli/issues/24381)

# 결론

Angular 애플리케이션에 새로운 환경을 구성하는 것은 흥미로운 작업이라고 생각합니다. Angular 팀이 프레임워크를 구현하는 방식을 살펴볼 때마다 항상 뭔가를 배우게 됩니다. 여러분도 새로운 환경을 구성하는 방법을 익히고, 더 쉬운 방법이 제공되는 schematic이 나올 것이라는 것을 알아두시면 좋겠습니다.