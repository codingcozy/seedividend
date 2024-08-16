---
title: "Angular i18n을 사용하여 성능 향상과 구성 요소 수준 조직을 위한 사용자 정의 번역 서비스"
description: ""
coverImage: "/assets/img/2024-06-20-Angulari18nwithaCustomTranslationServiceforBetterPerformanceandComponent-LevelOrganization_0.png"
date: 2024-06-20 00:35
ogImage: 
  url: /assets/img/2024-06-20-Angulari18nwithaCustomTranslationServiceforBetterPerformanceandComponent-LevelOrganization_0.png
tag: Tech
originalTitle: "Angular i18n with a Custom Translation Service for Better Performance and Component-Level Organization"
link: "https://medium.com/@ajaygajjarkar512001/angular-i18n-with-a-custom-translation-service-for-better-performance-and-component-level-2bdf38ef4bc2"
isUpdated: true
---




<img src="/assets/img/2024-06-20-Angulari18nwithaCustomTranslationServiceforBetterPerformanceandComponent-LevelOrganization_0.png" />

Angular 애플리케이션의 다국어화는 종종 앱에 대한 모든 레이블과 번역을 포함하는 대규모 집중화된 en.json 파일을 유지하는 작업을 포함합니다. 이 방법은 번역 데이터를 집중화하지만, 애플리케이션이 커짐에 따라 관리하기 어려워지고 더욱 복잡해질 수 있습니다. 또한, 모든 번역을 미리 로드하는 것은 특히 lazy-loaded 컴포넌트에서 성능에 부정적인 영향을 줄 수 있습니다.

이러한 도전에 대처하기 위해 저는 컴포넌트별 번역 파일을 허용하는 사용자 지정 트랜스레이션 서비스를 개발했습니다. 이 방법은 조직화를 개선하고 유지보수를 간단화하며 en.json 파일을 더 작고 컴포넌트별 부분으로 나눔으로써 성능을 최적화합니다.

Angular i18n에서 흔히 사용되는 관행은 assets/i18n 디렉토리에 있는 단일 en.json 파일에 모든 번역을 저장하는 것입니다. 이 접근 방식에는 장점이 있지만 여러 문제점도 도입됩니다:

<div class="content-ad"></div>

- 복잡성과 혼잡성: 더 많은 번역이 추가됨에 따라 en.json 파일을 관리하기가 점점 어려워집니다.
- 유지보수 부담: 모든 라벨이 하나의 파일에 있을 때 번역을 업데이트하는 것은 시간이 많이 걸리고 오류가 발생할 수 있습니다.
- 성능 문제: 큰 번역 파일을 로드하면 응용 프로그램이 느려질 수 있으며, 특히 컴포넌트가 지연로드될 때 더 그러합니다.

이러한 문제를 해결하기 위해 컴포넌트별 번역 파일 사용을 지원하는 사용자 정의 번역 서비스를 만들었습니다. 각 컴포넌트는 자체 번역 파일을 가지며, 해당 파일은 컴포넌트와 동일한 디렉토리에 저장됩니다. 이 접근 방식에는 여러 가지 이점이 있습니다:

- 조직 개선: 특정 컴포넌트와 관련된 번역 파일은 관리하고 탐색하기가 더 쉽습니다.
- 편리한 유지보수: 번역 업데이트는 개별 컴포넌트에 로컬화되어 오류 발생 위험이 줄어듭니다.
- 더 나은 성능: 필요한 번역만 로드되어 성능이 향상되며, 특히 지연로드되는 컴포넌트에서 효과적입니다.

# 사용자 정의 번역 서비스 구현하기

<div class="content-ad"></div>

각 구성 요소마다 구성 요소 디렉터리에 별도의 번역 파일을 만드세요. 예를 들어 aBlogPostComponent의 경우 해당 구성 요소에 대한 en.ts 파일을 만들어야 합니다.

이제 우리만의 사용자 정의 번역 서비스를 만들 것입니다. 우리의 서비스는 `ngx-translate` 라이브러리에서 제공하는 TranslateService 위에 래퍼(wrapper)로 작용합니다. 이를 통해 기본 라이브러리 메서드를 사용하여 우리만의 사용자 정의 도우미 함수를 작성할 수 있게 됩니다.

이 서비스에서 한 클래스와 하나의 함수를 생성해야 합니다. 여기서 setDefaultLocale를 만들었습니다. 이 함수에서는 setDefaultLang으로 번역 언어를 설정합니다. 1단계에서 만든 파일을 여기서 세션에 설정해야 합니다.

<div class="content-ad"></div>

이제 번역 모듈을 설정하겠습니다.

[이미지를 확인하시려면 클릭하세요.](/assets/img/2024-06-20-Angulari18nwithaCustomTranslationServiceforBetterPerformanceandComponent-LevelOrganization_2.png)

모듈 파일을 생성하고 해당 모듈 파일에서 위에 표시된 대로 하나의 클래스를 내보내야 합니다. Observable 페이지 변경을 감지하고 번역 파일을 여기에 설정할 것입니다.

[이미지를 확인하시려면 클릭하세요.](/assets/img/2024-06-20-Angulari18nwithaCustomTranslationServiceforBetterPerformanceandComponent-LevelOrganization_3.png)

<div class="content-ad"></div>

번역 모듈 파일에서 translateModule의 forRoot를 정의해야 합니다.

아래 형식과 같이 en.ts와 같은 번역 파일을 만들어야 합니다.

![image](/assets/img/2024-06-20-Angulari18nwithaCustomTranslationServiceforBetterPerformanceandComponent-LevelOrganization_4.png)

우리의 템플릿 파일에서 텍스트를 번역하려면, 텍스트(또는 변수)를 번역 파이프와 함께 파이핑하면 브라우저에서 마법이 일어나는 것을 확인할 수 있습니다. 그리고 그 서비스와 함수를 호출하고, 2단계에서 만든 en.ts 파일을 전달해야 합니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-20-Angulari18nwithaCustomTranslationServiceforBetterPerformanceandComponent-LevelOrganization_5.png)

# 사용자 정의 번역 서비스의 이점

구성 요소별 번역 파일을 지원하는 사용자 정의 번역 서비스를 구현하면 여러 가지 이점이 제공됩니다:

- 향상된 조직화: 번역을 해당 구성 요소에 가깝게 유지함으로써 코드베이스가 보다 조직화되고 탐색하기 쉬워집니다.
- 단순화된 유지 관리: 특정 구성 요소의 번역을 업데이트하는 것이 더 쉽고 오류 가능성이 낮아집니다.
- 향상된 성능: 필요한 번역 파일만 로드하면 메모리 사용량이 줄어들고 애플리케이션 성능이 향상되어 특히 지연로드된 구성 요소에 유용합니다.


<div class="content-ad"></div>

이 방법은 코드의 가독성과 유지 관리성을 향상시키는데 그치지 않고 Angular 애플리케이션 전체의 성능도 향상시킵니다. 다음 프로젝트에서 이 방법을 시도해보고 보다 간소하고 효율적인 국제화 프로세스의 혜택을 경험해보세요.