---
title: "Angular v15에 Google Analytics 추가하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_0.png"
date: 2024-06-23 14:03
ogImage: 
  url: /assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_0.png
tag: Tech
originalTitle: "Adding Google Analytics to Angular v15"
link: "https://medium.com/@danielfilipkowskiblogs/adding-google-analytics-to-angular-v15-1766c4bdaed5"
isUpdated: true
---




아마 당신도 저와 같이 포트폴리오를 만들고 방문자 추적을 원하시는 분들 중 하나일 것 같아요. 다음 직업에 얼마나 가까운지 확인하려고 사이트 트래픽을 추적하고 싶어하시는 분들일 것이라고 생각해요. 혹은 스타트업에서 일하고 있는데 사용자 참여를 추적하길 원하는 경우도 있을 거예요. 어떤 케이스이든 데이터는 웹 개발에서 매우 중요하며 사람들의 일상 생활과 상호 작용하는 방식으로 상당히 중요합니다.

그러니까 더 이상 말이 필요 없겠죠! Angular v15를 사용하여 Google Analytics를 통해 당신의 분석을 어떻게 추적할 수 있는지 단계별로 알려드릴게요.

## 단계 1: Google Analytics 가입하기

우선 처음으로 Google Analytics에 가입해야 해요. 이미 가입한 경우에는 걱정하지 마세요. 아직 가입하지 않은 경우에는 걱정하지 마시고 시작하려면 이 링크의 지시에 따라 https://analytics.withgoogle.com/ 진행한 다음 이 페이지로 돌아오세요.

<div class="content-ad"></div>

가입 절차를 완료하셨다면 또는 이미 이 과정을 완료했다면, 아래 화면을 확인해야 합니다.

![Google Analytics](/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_0.png)

파란색 버튼 위에 측정 ID가 표시되어 있는 것을 알 수 있을 겁니다. 제 사진에서는 측정 ID가 흐릿하게 처리되어 있습니다. 예시로, 저의 경우 일시적으로 1234로 설정되어 있습니다.

## Step 2: Angular 애플리케이션에 Google Analytics 추가하기

<div class="content-ad"></div>

이제 index.html 파일을 열어야 합니다. 파일이 열리면 아래 코드를 head 태그 밑에 추가해야 합니다. 그러나 body 위에 추가해야 합니다. 아래와 같이 보이는대로 추가해주세요:

```js
 <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-M7DLQTY7NJ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', <your_sites_measurement_ID>);
    </script>
```

측정 ID는 이 튜토리얼의 1단계에서 찾은 ID로 교체해주세요. 완료하면 이와 같이 보여야 합니다.

<img src="/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_1.png" />

<div class="content-ad"></div>

## 단계 3: 분석 서비스 작성하기

이번에 처음으로 Angular 서비스를 생성하고 계신다면, Angular 구조를 따르기 위해 app 폴더 내에 services라는 새 폴더를 생성하는 것을 제안드립니다. 다음과 같이 보여야 합니다:

![폴더 구조](/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_2.png)

그런 다음, 새로운 서비스를 생성하고 분석.service.ts라는 이름의 새 서비스를 만들어 새 services 폴더 안에 넣으세요. 분석.service.ts 파일 내에는 다음 코드를 적용하게 됩니다:

<div class="content-ad"></div>

```ts
import { Injectable } from '@angular/core';

declare var gtag: any;

@Injectable({providedIn: 'root'})
export class AnalyticsService {

  trackEvent(eventName: string, eventDetails: string, eventCategory: string) {
    gtag('event', eventName, {
    // event Type - example: 'SCROLL_TO_TOP_CLICKED'
    'event_category': eventCategory,
    // the label that will show up in the dashboard as the events name
    'event_label': eventName,
    // a short description of what happened
    'value': eventDetails
    })
  }
}
```

var gtag를 선언함으로써 Angular에게 애플리케이션 어딘가에 참조하려는 gtag라는 메서드가 있는 것을 알려줍니다. 이제 gtag를 index.html 파일에 가져와서 새로운 메서드를 만들 수 있게 되었습니다. 우리가 만든 새로운 메서드는 trackEvent()입니다. 각 속성이 대시보드에 어떻게 표시될지 이해하는 데 도움이 되도록 주석을 남겨 두었습니다.

다음 단계는 선택 사항입니다. 그러나 대부분의 주요 응용 프로그램은 이 구조를 따르므로 이 프레임워크가 익숙하지 않다면 해당 폴더의 index.ts 파일을 업데이트하는 습관을 가져가는 것을 제안합니다. 그런 경우가 아니라면 services 폴더 내에 index.ts 파일을 생성하여 * 장식자를 사용하여 모든 서비스 콘텐츠를 내보낼 수 있도록 합니다. 아래 정보를 참고로 사용하십시오.

![이미지](/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_3.png)


<div class="content-ad"></div>

## 단계 4: 새로운 분석 서비스 사용하기

이제 사용 중인 컴포넌트에 새 서비스를 가져와야 합니다. 이 튜토리얼은 v15용이므로 독립형 컴포넌트 방법을 사용할 것입니다. 이전 버전을 사용 중이라면 서비스를 컴포넌트가 포함된 모듈 또는 앱 모듈로 가져와야 합니다.

당신의 파일은 Angular의 최신 버전을 사용 중이라면 다음과 유사한 모습이어야 합니다:

![이미지](/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_4.png)

<div class="content-ad"></div>

한 번 서비스를 가져와서 제공자 목록에 추가하세요. 그런 다음 @angular/core에서 ngOnInit()를 구현할 것입니다. 이렇게 하면 Angular 라이프사이클에서 생성자가 완료된 후 footer가 로드되었다는 이벤트를 보낼 수 있게 됩니다. 그런 다음 분석 서비스를 타겟팅하고 trackEvent() 메서드에 액세스하여 일부 데이터를 전달할 것입니다. 저는 footer 컴포넌트를 예시로 사용하겠습니다. 아래 이미지에서 보여지는 것처럼:

![Adding Google Analytics to Angular v15_5](/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_5.png)

## 단계 5: 배포 및 테스트

마지막 단계는 애플리케이션을 배포하고 최종 결과를 테스트하는 것입니다. 대시보드로 돌아가서 리포트에 있는 실시간 탭으로 이동할 수 있습니다. 사이트에 방문하면 지도상에서 자신을 확인할 수 있고 새 이벤트가 애플리케이션에 추가되었음을 확인할 수 있을 것입니다.

<div class="content-ad"></div>


![Google Analytics Event Network Tab](/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_6.png)

이벤트를 트리거할 때 컬렉션 이벤트 트리거를 보게 될 것입니다. 또한 쿠키에서 태그를 볼 수 있습니다. 두 가지 이미지 모두 아래에서 확인할 수 있습니다.

![Collection Event Trigger in Cookies](/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_7.png)

![Viewing the Tag in Cookies](/assets/img/2024-06-23-AddingGoogleAnalyticstoAngularv15_8.png)


<div class="content-ad"></div>

앞으로의 개발 팁과 요령을 팔로우해주세요. 읽어 주셔서 감사합니다. 여러분의 지원에 감사드립니다.