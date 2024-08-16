---
title: "Ionic 앱에 지문 및 얼굴 인식을 통합해보세요"
description: ""
coverImage: "/assets/img/2024-06-20-IntegrateBiometricAuthenticationinYourIonicAppwithFingerprintandFaceID_0.png"
date: 2024-06-20 00:33
ogImage: 
  url: /assets/img/2024-06-20-IntegrateBiometricAuthenticationinYourIonicAppwithFingerprintandFaceID_0.png
tag: Tech
originalTitle: "Integrate Biometric Authentication in Your Ionic App with Fingerprint and Face ID"
link: "https://medium.com/@vishaldarekar/integrate-biometric-authentication-in-your-ionic-app-with-fingerprint-and-face-id-416d73a1f96e"
isUpdated: true
---




생체 인증은 지문 및 얼굴 인식을 포함하여 사용자가 안전하고 편리하게 인증할 수 있는 방법을 제공합니다. 이 튜토리얼에서는 cordova-plugin-fingerprint-aio 플러그인을 사용하여 Ionic 앱에 생체 인증을 통합하는 방법을 알아보겠습니다. 이 플러그인은 특정 생체 인식 방법을 추상화하며 지문 및 얼굴 인식을 모두 지원하며 사용자 기기에서 사용 가능한 것에 맞게 적응합니다.

![이미지](/assets/img/2024-06-20-IntegrateBiometricAuthenticationinYourIonicAppwithFingerprintandFaceID_0.png)

# 준비 사항

시작하기 전에 다음 설정이 완료되었는지 확인하십시오:

<div class="content-ad"></div>

- Node.js 및 npm이 설치되어 있습니다.
- Ionic CLI가 설치되어 있습니다 (npm install -g @ionic/cli).
- Android 개발을 위해 Android Studio가 필요합니다.
- macOS에서 iOS 개발을 위해 Xcode가 필요합니다.
- 생체 인식 기능(지문 또는 얼굴 인식)이 있는 실제 기기

# 단계 1: 새 Ionic 프로젝트 생성

먼저, 새 Ionic 프로젝트를 생성해야 합니다. 이미 프로젝트가 있는 경우, 이 단계를 건너뛸 수 있습니다.

```bash
ionic start biometric-auth blank --type=angular
cd biometric-auth
```

<div class="content-ad"></div>

# 단계 2: 지문 AIO 플러그인 추가하기

이제 cordova-plugin-fingerprint-aio 플러그인과 Ionic Native 래퍼를 설치해야 합니다.

```js
ionic cordova plugin add cordova-plugin-fingerprint-aio
npm install @awesome-cordova-plugins/fingerprint-aio
```

# 단계 3: 앱 구성하기

<div class="content-ad"></div>

# app.module.ts 업데이트

우리 앱이 FingerprintAIO 프로바이더를 사용하도록 구성해야 합니다. src/app/app.module.ts 파일을 열어 다음과 같이 업데이트해 주세요:

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

# 생체 인증 구현

<div class="content-ad"></div>

다음으로 홈페이지 구성요소에 생체 인증을 구현할 것입니다.

## 홈페이지 파일 업데이트

src/app/home/home.page.ts 파일을 열어 아래 내용으로 업데이트해 주세요:

```js
import { Component } from '@angular/core';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private faio: FingerprintAIO) {}

  async showFingerprintAuth() {
    try {
      // 생체 인증 사용 가능 여부 확인
      const available = await this.faio.isAvailable();
      if (available) {
        const result = await this.faio.show({
          title: '생체 인증', // 생체 인증 다이얼로그의 제목
          subtitle: '접근 권한 인증', // 생체 인증 다이얼로그의 부제목
          description: '지문 또는 얼굴을 사용하여 인증하세요', // 생체 인증 다이얼로그 설명
          fallbackButtonTitle: '백업 사용', // 백업 버튼 제목
          disableBackup: true // 안드로이드에서 '백업 사용' 옵션 비활성화 (선택 사항)
        });
        console.log(result);
        alert('인증 성공');
      } else {
        alert('이 장치에서는 생체 인증을 사용할 수 없습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('인증 실패');
    }
  }
}
```

<div class="content-ad"></div>

## 홈 페이지 업데이트

src/app/home/home.page.html 파일을 열고 다음과 같이 업데이트하십시오:

```js
<ion-header>
  <ion-toolbar>
    <ion-title>
      생체 인증
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-button (click)="showFingerprintAuth()">
    지문/얼굴 ID로 인증하기
  </ion-button>
</ion-content>
```

# 단계 4: 앱 테스트

<div class="content-ad"></div>

이제 앱을 테스트할 시간입니다. 바이오메트릭 기능은 시뮬레이터나 에뮬레이터에서 테스트할 수 없으므로 실제 기기에서 앱을 실행해야 합니다.

# 결론

이 튜토리얼에서는 cordova-plugin-fingerprint-aio 플러그인을 사용하여 Ionic 앱에 바이오메트릭 인증을 통합했습니다. 이 플러그인은 사용자 기기에서 사용 가능한 지문 및 얼굴 인식을 모두 지원하며, 위에서 안내한 단계를 따라 Ionic 앱의 보안 및 사용자 경험을 바이오메트릭 인증으로 향상시킬 수 있습니다.

구현을 더 자유롭게 사용자 흐름에 통합하고 개선해보세요. 즐거운 코딩되세요!