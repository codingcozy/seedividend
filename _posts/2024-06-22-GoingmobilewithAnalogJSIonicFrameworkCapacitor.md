---
title: "AnalogJS  Ionic Framework  Capacitor를 사용해 모바일 앱 개발하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-GoingmobilewithAnalogJSIonicFrameworkCapacitor_0.png"
date: 2024-06-22 15:01
ogImage: 
  url: /assets/img/2024-06-22-GoingmobilewithAnalogJSIonicFrameworkCapacitor_0.png
tag: Tech
originalTitle: "Going mobile with AnalogJS + Ionic Framework + Capacitor"
link: "https://medium.com/ngconf/going-mobile-with-analogjs-ionic-framework-capacitor-e773735c95c7"
---


![이미지](/assets/img/2024-06-22-GoingmobilewithAnalogJSIonicFrameworkCapacitor_0.png)

이미 AnalogJS에 대해 들어보셨을 것 같아요. Angular 메타 프레임워크인 AnalogJS는 Brandon Roberts가 만들었고, Vite, Vitest, SSR, SSG, 파일 기반 라우팅 및 API 라우팅을 우리의 Angular 프로젝트에 제공합니다. 만약 이에 대해 들어보지 못했다면 한 번 살펴보시기를 추천드립니다. 정말 놀라운 프로젝트에요!

또한 Ionic Framework에 대해 들어보셨을 것입니다. 웹을 위한 모바일 SDK인 Ionic Framework은 Angular/React/Vue를 사용하여 단일 코드베이스에서 모던하고 고품질의 크로스 플랫폼 모바일 앱을 개발할 수 있게 해줍니다.

이 게시물에서는 AnalogJS 애플리케이션에 Ionic Framework를 통합하고 두 가지 프레임워크의 혜택을 얻는 데 필요한 단계에 대해 설명하겠습니다!

<div class="content-ad"></div>

# 설치

먼저 Ionic에서 애플리케이션에 필요한 패키지들을 설치해야 합니다:

- @ionic/angular는 Ionic Framework에서 모든 컴포넌트와 서비스를 제공합니다.
- ionicons는 Ionic의 놀라운 무료 아이콘 라이브러리입니다.
- @ionic/angular-toolkit은 Ionic 스키매틱을 프로젝트에 추가합니다.

아래 명령어를 실행하여 세 가지 패키지를 모두 설치할 수 있습니다:

<div class="content-ad"></div>

```js
npm install @ionic/angular@latest ionicons
npm install -D @ionic/angular-toolkit
```

# Ionic을 위한 AnalogJS 앱 구성

이제 Ionic을 프로젝트에 설치했으니, 작동하도록 구성해야 합니다.

프로젝트 vite.config.ts 파일로 이동하여 Ionic 라이브러리를 SSR 프로세스에서 제외하고 noExternal 속성에 추가하세요.
다음과 같이 보일 것입니다:

<div class="content-ad"></div>

```js
ssr: {
  noExternal: [
    '@ionic/**',
    '@stencil/**',
    'ionicons',
  ],
},
```

이제 app.config.ts 파일에서 provideIonicAngular 메서드와 IonicRouteStrategy 프로바이더를 추가하세요. 첫 번째는 Ionic의 모든 기능을 앱에 가져오고, 후자는 동일한 컴포넌트가 라우트 변경시 다시 렌더링되도록 합니다.

app.component.ts 파일을 업데이트하여 Ionic 앱에 필요한 구조를 포함하도록 하세요.

```js
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app>`,
})
export class AppComponent {}
```

<div class="content-ad"></div>

Angular은 아직 웹 구성 요소와 SSR을 지원하지 않습니다. 그동안 클라이언트 수화 기능을 비활성화해야 합니다. 몇 가지 옵션이 있지만 여기서는 ion-app 구성 요소에 ngSkipHydration 속성을 사용할 겁니다.

간단히 ion-app 태그에 ngSkipHydration 속성을 추가하면 됩니다. 코드는 다음과 같이 보일 것입니다:

```js
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  template: `<ion-app ngSkipHydration><ion-router-outlet></ion-router-outlet></ion-app>`,
})
export class AppComponent {}
```

마지막으로 앱에 Ionic 스타일을 추가해야 합니다. 이를 위해 styles.css 파일 이름을 styles.scss로 변경하고 vite.config.ts 파일을 업데이트하여 SCSS를 지원하도록 설정하십시오:

<div class="content-ad"></div>

```js
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      analog({
        vite: {
          inlineStylesExtension: 'scss',
        },
      }),
    ],
  };
});
```

그런 다음 변경 사항에 맞게 index.html 파일도 스타일 파일과 일치하도록 수정합니다:

```js
<head>
  <!-- 기타 헤더 -->
  <link rel="stylesheet" href="/src/styles.scss" />
</head>
<body>
  <!-- 내용 -->
</body>
```

마지막으로 styles.scss 파일에 Ionic 스타일을 추가합니다:

<div class="content-ad"></div>

```js
/* Ionic 컴포넌트가 제대로 작동하려면 필요한 기본 CSS */
@import '@ionic/angular/css/core.css';

/* Ionic으로 제작된 앱을 위한 기본 CSS */
@import '@ionic/angular/css/normalize.css';
@import '@ionic/angular/css/structure.css';
@import '@ionic/angular/css/typography.css';
@import '@ionic/angular/css/display.css';

/* 주석 처리할 수 있는 선택적인 CSS 유틸리티 */
@import '@ionic/angular/css/padding.css';
@import '@ionic/angular/css/float-elements.css';
@import '@ionic/angular/css/text-alignment.css';
@import '@ionic/angular/css/text-transformation.css';
@import '@ionic/angular/css/flex-utils.css';

/**
 * Ionic Dark 모드
 * -----------------------------------------------------
 * 자세한 내용은 다음 링크를 참조하세요:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import "@ionic/angular/css/palettes/dark.always.css"; */
/* @import "@ionic/angular/css/palettes/dark.class.css"; */
@import '@ionic/angular/css/palettes/dark.system.css';
```

이게 다입니다! Ionic을 사용하여 AnalogJS 애플리케이션을 만들었습니다. 필요한 경우 Capacitor를 설치하여 iOS 및 Android용으로 빌드할 수 있습니다.

AnalogJS를 Ionic과 Capacitor로 빠르게 시작하고 싶다면, AnalogJS + Ionic + Capacitor 템플릿을 사용하여 새 프로젝트를 만들 수 있습니다! 이미 필요한 모든 것으로 사전 구성되어 있어 설정을 걱정할 필요가 없고 즉시 멋진 애플리케이션을 구축할 수 있습니다!

<img src="/assets/img/2024-06-22-GoingmobilewithAnalogJSIonicFrameworkCapacitor_1.png" />

<div class="content-ad"></div>

에두아르도는 히어로데브스에서 일하는 시니어 소프트웨어 엔지니어로, 멕시코 몬테레이에 거주하고 있습니다. 세 아름다운 딸의 아버지이자 남편으로, Angular, Ionic 및 웹 관련 모든 것을 사랑합니다. 그는 OSS 커뮤니티에 자주 기고하며, Angular 커뮤니티 미팅의 스페인 챕터 공동 주최자이자 Google Developer Group 몬테레이 공동 주최자, Ionic 몬테레이 미팅의 주최자, Ionic 개발 전문가, ngChampion이며 Angular GDE가 되기 위한 길을 걷고 있습니다.