---
title: "완벽 가이드 Angular 다국어i18n 애플리케이션 만들기"
description: ""
coverImage: "/assets/img/2024-06-22-ACompleteGuideToAngularMultilingualApplicationi18n_0.png"
date: 2024-06-22 14:52
ogImage:
  url: /assets/img/2024-06-22-ACompleteGuideToAngularMultilingualApplicationi18n_0.png
tag: Tech
originalTitle: "A Complete Guide To Angular Multilingual Application (i18n)"
link: "https://medium.com/angular-in-depth/a-complete-guide-to-angular-multilingual-application-91f431f0f12c"
isUpdated: true
---

Angular i18n 애플리케이션을 초기화하고 구현해 보세요. Transloco를 사용하여 Angular에서 다국어 애플리케이션을 구현하는 방법을 안내하는 가이드입니다! 번역 파일의 지연 로딩을 포함하여 멀티 언어 애플리케이션을 구현하는 방법을 설명합니다.

![Angular 다국어 애플리케이션 완벽 가이드 이미지](/assets/img/2024-06-22-ACompleteGuideToAngularMultilingualApplicationi18n_0.png)

# 목차

- 국제화 (i18n) 및 지역화 개요
- Angular 애플리케이션 초기화 및 패키지 설치
- 프로젝트 구성
- 템플릿 내 번역
- TypeScript 내 번역
- 활성 언어 변경
- 번역 파일의 지연 로딩

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

# 간단 요약

본 GitHub 저장소의 구현된 예제 코드로 건너뛰어보고 여기에서 작동하는 데모를 확인할 수 있습니다.

# 국제화 (i18n) 및 로컬라이제이션

지난 수십 년 동안 전 세계의 사용자를 대상으로 한 애플리케이션이 많이 등장했습니다. 그에 따라 사용자의 언어와 문화에 따라 제품 및 서비스를 구현하는 필요성을 느끼게 되었습니다. 이 과정을 국제화 (i18n “I” - 열 여덟 개의 글자 - “N”)이라고 합니다. 반면 로컬라이제이션은 특정 제품을 고유한 지역 시장에 맞게 조정하는 것을 의미합니다. Angular 로컬라이제이션은 다양한 기능을 제공합니다:

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

- 다른 언어로 번역할 텍스트 추출
- 특정 로캘을 위한 데이터 형식 지정

Angular의 국제화를 사용할 수 있습니다:

- 내장된 파이프를 사용하여 로컬 형식으로 날짜, 숫자, 백분율 및 통화를 표시합니다.
- 컴포넌트 템플릿에서 번역할 텍스트 지정.
- 번역할 표현의 복수 형태 지정.
- 번역할 대체 텍스트 지정.

![이미지](/assets/img/2024-06-22-ACompleteGuideToAngularMultilingualApplicationi18n_1.png)

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

# Angular 애플리케이션 초기화 및 패키지 설치하기

먼저, Angular 애플리케이션을 만들어야 합니다! 당신의 컴퓨터에 Angular CLI가 설치되어 있는 것으로 가정합니다. Angular CLI를 사용하여 Angular 애플리케이션을 초기화하려면 다음과 같이 입력할 수 있습니다:

```js
ng new <PROJECT_NAME>
```

이 Medium 스토리에서는 Angular 애플리케이션의 구현 세부 사항에 대해 다루지 않습니다. 프로젝트의 전체 구현을 보려면 GitHub 리포지토리를 참조하실 수 있습니다. ng serve 명령을 사용하여 Angular 애플리케이션을 시작하세요. 이제 Angular 프로젝트가 실행 중이므로 i18n의 구현 세부 사항으로 넘어가 봅시다.

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

Transloco를 사용하려고 합니다. 먼저 필요한 패키지를 설치해야 합니다.

```js
ng add @ngneat/transloco
```

위 명령을 실행한 후에는 프로젝트에 새 파일이 생길 수 있습니다. Angular Universal을 사용하는지 여부와 지원할 언어 등 몇 가지 질문에 답해야 합니다.

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

transloco-root.module.ts 파일에서 transloco의 구성 파일을 찾을 수 있습니다. 여기서 지원하는 언어, 애플리케이션의 기본 언어, 런타임에서 언어를 변경할지 여부를 변경할 수 있습니다. 모든 옵션 목록은 여기에서 찾을 수 있습니다.

```js
import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { Injectable, isDevMode, NgModule } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'de', 'fa'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
```

이제 transloco-root.module.ts를 루트 모듈에 가져와야 합니다. 루트 모듈은 아마도 app.module.ts라고 할 것입니다.

<img src="/assets/img/2024-06-22-ACompleteGuideToAngularMultilingualApplicationi18n_3.png" />

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

# 템플릿 내의 번역

'ng add @ngneat/transloco' 명령을 실행한 후에는 지정한 모든 언어가 포함된 i18n 디렉터리가 assets 디렉터리에 나타납니다. 이것들은 주요 언어 파일입니다. 홈페이지나 헤더에서 사용할 수 있습니다. 하지만 각 모듈을 위한 고유한 디렉터리를 만들어서 해당 모듈로 lazy load할 수도 있습니다. 레이지 로딩에 대해서는 조금 후에 다룰 것입니다. 먼저 Transloco와 함께 작업을 시작해 봅시다.

## 구조 지시문 사용

템플릿에서 \*transloco 지시문을 사용할 수 있습니다. 그러나 feature 모듈에는 translocoModule을 가져와야 하고, 주 페이지에는 translocoRootModule을 가져와야 합니다. 우리가 제목을 번역하려고 한다고 가정해 봅시다. 우리는 번역된 텍스트를 i18n 디렉터리의 JSON 파일에 포함해야 합니다.

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

en.json 파일은 다음과 같이 보여야 합니다:

```json
{
  "title": "Hello World!"
}
```

그리고 다른 언어(예를 들어 독일어)로 번역할 경우 de.json 파일은 다음과 같아야 합니다:

```json
{
  "title": "Hallo Welt!"
}
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

지금 저희 템플릿에서는 다음과 같이 디렉티브를 사용하여 선택한 언어의 값을 보여줄 수 있습니다:

```js
<h1 *transloco="let t"> { t("title") } </h1>
```

하지만 아래와 같이 중첩된 키 속성을 포함한 복잡한 JSON 구조를 가지고 있을 수도 있습니다:

```js
// JSON은 다음과 같은 주석을 지원하지 않습니다.
// 이 주석은 단지 예시를 위한 것입니다.

// en.json
{
  "title": "Hello World!",
  "form": {
     "firstName": "First Name",
     "lastName": "Last Name"
    }
}

// de.json
{
  "title": "Hallo Welt!",
  "form": {
     "firstName": "Vorname",
     "lastName": "Nachname"
    }
}
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

이제 두 가지 옵션이 있습니다. t 함수의 중첩 항목을 사용하거나 값 찾기를 수행하는 where 지시문을 사용할 수 있습니다.

```js
<!-- 옵션 1 -->
<h1 *transloco="let t"> { t("form.firstName") } </h1>

<!-- 옵션 2 -->
<h1 *transloco="let t; read:'form'"> { t("firstName") } </h1>
```

옵션 2가 더 읽기 쉽습니다.

## 파이프 사용하기

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

다른 방법은 아래와 같이 파이프를 사용하는 것입니다:

```js
<h1>{"title" | transloco}</h1>
```

# TypeScript 내에서 번역

TranslocoService를 컴포넌트에 주입한 후에는 아래와 같이 안전하게 사용할 수 있습니다:

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
export class AppComponent {
  constructor(private readonly translocoService: TranslocoService) {}

  ngOnInit() {
    this.translocoService.translate('title');
    this.translocoService.translate('form.firstName');
  }
}
```

다른 번역 API도 여기에서 모두 찾을 수 있어요. 하지만 이러한 API가 올바르게 작동하려면 런타임에 번역 파일이 로드되었는지 확인해야 해요.

# 활성 언어 변경

사용자가 애플리케이션 언어를 변경하는 버튼을 클릭하면 애플리케이션의 선택된 언어를 변경해야 해요. 이를 위해 먼저 적절한 컴포넌트를 만들어 주세요. 완전히 구현된 컴포넌트는 여기에서 찾을 수 있어요.

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
import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  template: `
    <div>
      <button
        *ngFor="let language of languagesList; index as i"
        (click)="changeLanguage(language.code)"
      >
        <img [src]="language.imgUrl" [alt]="language.name" />
        <span> { language.shorthand } </span>
      </button>
    </div>
  `,
})
export class LanguageSelectorComponent {
  constructor(private translocoService: TranslocoService) {}
  public languagesList:
    Array<Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>> = [
    {
      imgUrl: '/assets/images/English.png',
      code: 'en',
      name: 'English',
      shorthand: 'ENG',
    },
    {
      imgUrl: '/assets/images/Deutsch.png',
      code: 'de',
      name: 'German',
      shorthand: 'GER',
    },
    {
      imgUrl: '/assets/images/Persian.png',
      code: 'fa',
      name: 'Persian',
      shorthand: 'PER',
    },
  ];
  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
    languageCode === 'fa'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
  }
}
```

위 코드에서 보듯이 영어, 독일어, 페르시아어로 언어를 변경하는 세 개의 버튼을 구현했습니다. 사용자가 버튼을 클릭하면 선택한 언어 코드로 translocoService의 setActiveLang 메서드를 호출합니다.
페르시아어나 아랍어와 같은 언어는 오른쪽에서 왼쪽으로 쓰이는 것을 고려해주세요. 애플리케이션의 방향을 rtl에서 ltr로 변경하는 것을 잊지 마세요.

<img src="/assets/img/2024-06-22-ACompleteGuideToAngularMultilingualApplicationi18n_4.png" />

# 지연로딩 번역

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

애플리케이션 초기화 시 모든 번역 파일을 동시에 로드하는 것은 좋은 아이디어가 아닙니다. 특히 모듈이 많은 경우에는 그렇습니다. 애플리케이션의 로드 시간이 더 늘어날 뿐만 아니라 전체 애플리케이션을 위한 단일 번역 파일을 작업하는 것도 어려운 일입니다. 다행히 우리는 모듈에 번역 파일을 지연 로드할 수 있습니다.
우리에게는 pageOne과 pageTwo라는 두 개의 모듈이 있다고 가정해 봅시다. 각 모듈에 대해 i18n 디렉토리 내에 디렉토리를 만들겠습니다. 각 언어에 대해 동일한 수의 JSON 파일로 디렉토리를 채워 주세요. 이제 각 모듈에 대한 범위를 지정하기만 하면 됩니다. 이를 수행하는 방법이 몇 가지 있습니다.

```js
<!-- pageOne 모듈 -->
<h1 *transloco="let t; scope:'pageOne'"> { t('title') } </h1>
<!-- 위의 범위를 주의해서 확인하세요 -->
```

다른 세부 정보도 읽기 방법과 같습니다. TypeScript에서 번역을 지연로드하려면 쉽게 목표를 달성할 수 있습니다.

먼저 translocoModule을 가져온 모듈에서 원하는 범위를 지정해야 합니다.

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
const routes: Routes = [
  {
    path: "",
    component: PageOneComponent,
  },
];

@NgModule({
  declarations: [PageOneComponent],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "pageOne" }],
  imports: [RouterModule.forChild(routes), TranslocoModule],
})
export class PageOneModule {}
```

이제 TypeScript 파일에서 아래와 같이 현재 scope에 접근할 수 있습니다:

```js
export class AppComponent {
  constructor(
    private translocoService: TranslocoService,
    @Inject(TRANSLOCO_SCOPE) private scope
  ) {}

  ngOnInit() {
    this.translocoService.selectTranslate('title', params, this.scope)
      .subscribe(console.log);
  }
}
```

컴포넌트에 TRANSLOCO_SCOPE를 인젝션하면 모듈의 현재 scope를 사용할 수 있습니다.

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

# 최종 결과물

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*WVqJR58gpb6SdUpsgpR-1g.gif)

## 전체 구현 데모를 확인할 수 있습니다:

https://angular-multi-lingual.hmousavi.dev

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

## GitHub 저장소를 확인해보세요:

[GitHub 저장소](https://github.com/hossein13m/angular-multi-lingual)

# 친구들과 공유하세요! 👏 최대 50번 클랩을 해주세요.

의견이나 아이디어를 공유할 때 주저하지 마세요. 트위터에서 저에게 연락하거나 제 포트폴리오를 방문해서 다른 방법을 찾을 수 있어요.
