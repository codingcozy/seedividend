---
title: "앵귤러에서의 국제화i18n 가이드"
description: ""
coverImage: "/assets/img/2024-06-20-AGuidetoInternationalizationi18ninAngular_0.png"
date: 2024-06-20 05:30
ogImage:
  url: /assets/img/2024-06-20-AGuidetoInternationalizationi18ninAngular_0.png
tag: Tech
originalTitle: "A Guide to Internationalization (i18n) in Angular"
link: "https://medium.com/@ayushgrwl365/a-guide-to-internationalization-i18n-in-angular-a6ca7a9bc027"
isUpdated: true
---

![2024-06-20-AGuidetoInternationalizationi18ninAngular_0.png](/assets/img/2024-06-20-AGuidetoInternationalizationi18ninAngular_0.png)

디지털 세계에서 전 세계 대중에 도달하는 것은 웹 개발자들의 궁극적인 목표입니다. 이를 달성하는 한 가지 방법은 Angular 애플리케이션을 다국어로 만드는 것입니다. 국제화(i18n)의 세계에 오신 것을 환영합니다. 여기서 여러 나라 사용자들의 언어로 의사소통할 수 있는 앱을 만들어 보겠습니다. 이 블로그에서는 Angular 프로젝트에 i18n을 통합하고 전 세계 사용자들에게 앱을 이용할 수 있도록 하는 방법을 탐구할 것입니다.

# Angular에서 국제화(i18n) 소개

웹 앱을 세계의 다른 지역 사용자들과 연결할 수 있는 도구로 생각해보세요. 모든 사람에게 환영받고 사용하기 쉬운 경험을 제공하기 위해 우리는 그들의 언어를 구사해야 합니다. 국제화(i18n)는 여러 언어와 지역에 적응할 수 있도록 앱을 만드는 과정입니다. Angular는 이를 성취할 수 있는 강력한 도구와 기능을 제공합니다.

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

# 새 Angular 프로젝트 설정하기

i18n 여행을 시작하기 전에 새 Angular 프로젝트를 만들어봅시다. 걱정하지 마세요; 이 부분은 간단합니다.

```js
ng new i18n-app
```

이 명령은 Angular CLI를 사용하여 새 Angular 프로젝트를 초기화합니다. 프로젝트 구성에 대한 몇 가지 질문을 하게 될 것인데, 예를 들어 Angular 라우팅을 포함할지, 어떤 스타일시트 형식을 사용할지 (CSS, SCSS 등) 등을 물을 것입니다. 프로젝트의 요구에 맞는 옵션을 선택해 주세요.

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

# Angular의 i18n 도구 설치 및 구성

i18n 여행을 시작하기 위해 올바른 도구가 필요합니다. 우리 앱을 다국어로 만들기 위해 Angular의 i18n 도구를 설치하고 구성해보겠습니다.

```js
ng add @angular/localize
```

이 명령은 필요한 패키지를 설치하고 프로젝트 구성을 업데이트하여 i18n 지원을 활성화합니다. Angular의 @angular/localize 패키지는 번역 추출 및 관리 도구를 제공합니다.

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

# 안녕하세요!

테이블 태그를 Markdown 형식으로 변경해보세요.

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

@@appTitle 값은 이 번역 메시지의 고유 식별자로 작동합니다. 다양한 언어로의 번역을 이 특정 텍스트와 연관시키는 데 도움이 됩니다.

각 텍스트를 고유한 i18n 식별자와 연결하는 것이 좋은 실천 방법입니다.

# messages.xlf 생성 자동화

앱을 업데이트할 때마다 번역 메시지를 수동으로 추출하는 것은 번거로울 수 있습니다. 다행히도 xliffmerge 패키지를 사용하여이 프로세스를 자동화할 수 있습니다.

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

- xliffmerge를 설치하세요:

```js
npm install xliffmerge --save-dev
```

- xliffmerge 구성: 구성 파일을 만들어 xliffmerge를 구성하세요. 예를 들어, xliffmerge.config.json과 같이 파일을 만들고 지원할 언어 및 번역을위한 원본 및 대상 폴더를 지정하세요. 다음은 간단한 구성입니다:

```js
{
  "xliffmergeOptions": {
    "srcDir": "src",
    "genDir": "src/locale",
    "languages": ["en", "fr", "es"]
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

- 번역 생성: xliffmerge를 실행하여 messages.xlf 파일을 생성하거나 업데이트하세요:

```js
npx xliffmerge --profile xliffmerge.config.json
```

이 명령어는 앱 템플릿에서 번역 메시지를 자동으로 추출하고 병합하여 각 언어 파일에 저장합니다.

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

# 기본 언어 및 로캘 설정하기

우리 앱의 전역 여행에서 시작점이 필요합니다 - 기본 언어. 이를 앱의 app.module.ts 파일에서 설정할 수 있습니다.

```js
import { LOCALE_ID } from "@angular/core";

@NgModule({
  providers: [{ provide: LOCALE_ID, useValue: "en-US" }],
})
export class AppModule {}
```

이 예제에서는 기본 언어를 영어(미국)로 설정했습니다. 이는 사용자가 앱을 처음 방문할 때 영어로 표시되며, 그들이 다른 언어를 선택하지 않는 한 계속 영어로 표시됨을 의미합니다.

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

# 언어 전환하기

언어 전환기 컴포넌트를 구현하여 사용자가 선호하는 언어를 선택할 수 있도록 하면 앱을 사용자의 요구에 맞게 조정할 수 있습니다.

아래에는 Angular 앱에서 언어 전환기를 만드는 간단한 예제가 있습니다:

```js
<button (click)="changeLanguage('fr')">프랑스어</button>
<button (click)="changeLanguage('es')">스페인어</button>
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

컴포넌트 안에서:

```js
changeLanguage(language: string) {
  this.translateService.use(language);
}
```

이 코드를 사용하면 사용자가 앱의 언어를 동적으로 변경할 수 있습니다.

# 날짜, 숫자 및 통화 형식 설정

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

숫자와 날짜는 각 지역에 따라 다른 형식을 가지고 있어요. Angular는 사용자의 로캘에 따라 그들을 포맷하는 내장된 파이프들을 제공하여 이를 간편하게 만들어줘요. 마치 당신의 앱에 문화적 전환을 주는 것과 같달까요?

Angular의 파이프를 사용하면 사용자의 로캘에 따라 숫자, 날짜 및 통화를 포맷할 수 있어요. 예를 들어, 날짜 파이프를 사용하여 날짜를 포맷할 수 있어요:

```js
{ today | date: 'shortDate' }
```

이 예제에서 today는 JavaScript Date 객체이며, date 파이프를 통해 사용자의 로캘에 따라 단축된 날짜 형식으로 포맷되어요.

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

# 국제화된 앱을 테스트해보세요

이제 여러 언어로 지원되는 앱을 사용해보고 다른 언어로 테스트해보는 탐험가 모자를 쓰는 시간입니다. 긴 번역으로 인해 발생할 수 있는 텍스트 오버플로 및 UI 문제를 확인하세요.

모든 국제 사용자를 위해 부드러운 사용자 경험을 보장하기 위해 다양한 언어로 앱을 철저히 테스트하는 것이 중요합니다.

# 국제화된 Angular 앱을 배포하기

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

앱이 여러 언어로 유창해지면 웹을 정복할 준비가 된 것입니다. 배포하고 전 세계 사용자들을 매료시키는 것을 지켜보세요.

국제화된 Angular 앱을 배포하는 것은 일반적인 Angular 앱을 배포하는 것과 별 다를 바가 없습니다. Netlify, Vercel, 또는 AWS와 같은 다양한 호스팅 서비스나 플랫폼을 사용하여 앱을 호스팅하고 전 세계 사용자에게 접근할 수 있습니다.

# 결론

축하합니다, 여러 언어로 번역된 Angular 앱을 만드는 비밀을 발견했습니다! 국제화 (i18n)를 통해 앱을 세계 여행에 떠날 수 있으며 모든 사용자의 언어를 구사할 수 있습니다. 다양성을 수용하고 문화를 이어주며 참으로 세계적인 웹 존재를 만들어보세요.

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

# 추가 자료

- Angular i18n 문서
- xliffmerge GitHub 저장소

이제 국제화 및 자동화의 기술을 정복했으니, 앱이 전 세계 사용자들과 소통할 준비가 되었습니다.
