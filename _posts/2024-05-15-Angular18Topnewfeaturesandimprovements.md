---
title: "Angular 18  새로운 주요 기능 및 개선사항TOP"
description: ""
coverImage: "/assets/img/2024-05-15-Angular18Topnewfeaturesandimprovements_0.png"
date: 2024-05-15 10:42
ogImage: 
  url: /assets/img/2024-05-15-Angular18Topnewfeaturesandimprovements_0.png
tag: Tech
originalTitle: "Angular 18 — Top new features and improvements"
link: "https://medium.com/@mr.wahib/angular-18-top-new-features-and-improvements-2aa053733ca8"
isUpdated: true
---




<img src="/assets/img/2024-05-15-Angular18Topnewfeaturesandimprovements_0.png" />

앵귤러 18의 릴리스 날짜가 금방 오다가 예상 데뷔일인 2024년 5월 20일에 기대감이 커지고 있습니다. 새로운 기능과 개선 사항이 무엇을 가져올지 기대되는 가운데, 앵귤러는 지속적으로 발전하여 개발자들의 요구 사항과 문제를 해결하고 각 업데이트마다 혁신, 최적화 및 개선을 제공합니다. 앵귤러 18에서 기대되는 새로운 기능들을 알아보겠습니다:

# 함수를 사용한 라우트 리다이렉트

앵귤러 18에서는 문자열 대신 함수를 사용하여 리디렉트를 관리할 수 있는 새로운 기능이 소개됩니다. 이 개선으로 라우팅에서 더 많은 유연성을 제공하고 새로운 가능성을 엽니다. 예를 들면:



테이블 태그를 Markdown 형식으로 변경하면 다음과 같습니다.


The function can access an object with information about the URL, allowing for more dynamic redirection.

## Default Content in ng-content

Default content is now allowed within the ng-content tag. This logical extension will enable developers to include default content directly in the tag itself:

## New RedirectCommand class




리다이렉트 명령 클래스인 RedirectCommand클래스를 도입하기 전에, Guards 및 Resolvers는 새로운 경로를 나타내는 UrlTree를 반환하여 네비게이션을 리다이렉트할 수 있었습니다. 그러나 이 방법은 NavigationExtras를 사용한 네비게이션 리다이렉션을 허용하지 않습니다. 예를 들어:

이 문제를 해결하기 위해 Angular 18에서는 가드 및 리졸버에서 네비게이션 리다이렉션을 처리하는 NavigationExtras를 허용하는 새 RedirectCommand클래스를 소개했습니다.

이 개선으로 Angular 애플리케이션에서 복잡한 네비게이션 패턴을 다루는 것이 더 쉬워지며 유지보수성과 유연성이 향상됩니다.

# 새 ng-template API



Angular 18은 ng-template API를 더 강력하고 유연하게 만들 수 있는 기능을 도입할 수도 있습니다.

# 향상된 Forms API

Forms API는 몇 가지 향상을 받아서 더 강력하고 개발자 친화적입니다:

- 좀 더 쉬운 Form 객체 정의: 이를 통해 폼 모델을 더 적은 보일러플레이트 코드로 작성할 수 있어 가독성과 유지 보수성을 향상시킵니다.
- 간단한 유효성 검사 규칙: API는 대부분의 유효성 검사 시나리오에 대한 더 나은 추상화를 제공하여 필수 필드, 최소/최대 값, 패턴 및 사용자 정의 유효성 검사를 더 쉽게 관리할 수 있습니다.
- 복잡한 유효성 검사 시나리오 관리: 교차 필드 유효성 검사나 동적 유효성 규칙 등에 대한 Angular 18의 기능을 통해 복잡한 경우를 더 잘 관리할 수 있습니다.
- 세밀한 제어: 폼 유효성 검사에 대해 더 많은 제어를 제공하여 오류 메시지를 사용자 정의하고 비동기적 유효성 검사를 처리하며 사용자 입력에 효과적으로 반응할 수 있습니다.



# Zoneless Applications

Angular 18은 응용 프로그램에 신호를 통합하여 zone.js에 의존하지 않고 작동하도록 합니다. 이 최적화는 성능과 응답 시간을 향상시킵니다.

Matthieu Riegler와 Enea Jahollari는 각각이 주제에 관한 기사를 게시했습니다.

Matthieu의 기사는 새로운 하이브리드 변경 감지 시스템에 깊이 들어가며 Signal 변경 또는 markForCheck를 호출하는 비동기(pipe)와 같은 작업이 zone.js 외부에서도 자동으로 변경 감지를 트리거할 수 있다는 것을 강조합니다.



한편, Enea의 기사는 zone.js를 완전히 비활성화하고 이러한 새로운 트리거 메커니즘에 완전히 의존하여 애플리케이션 상태 변경을 관리하는 데 초점을 맞추고 있습니다.

# TypeScript 4.7 지원

Angular 18은 TypeScript 4.7의 기능을 최대한 활용합니다. 이 강력한 JavaScript의 슈퍼셋은 빠른 컴파일 시간과 간소화된 빌드 절차, 향상된 Readonly 지원, 새로운 import 유형 및 템플릿 리터럴 유형과 같은 다양한 성능 향상을 소개합니다. 이러한 개선 사항으로 더 원활한 개발 경험과 잠재적으로 더 빠른 애플리케이션 실행이 가능해집니다.

중요한 점은 Angular 18에서 TypeScript 5.4 이전 버전의 지원을 중단한다는 것입니다. 따라서 TypeScript 버전을 업데이트하면 이러한 진보를 활용할 수 있습니다.



# Ivy를 통한 성능 개선

Angular의 새로운 렌더링 엔진 인 Ivy는 Angular 18에서 성능을 향상시키고 번들 크기를 줄이며 트리 쉐이킹 능력을 향상시킴으로써 계속 발전하고 있습니다.

# 개선된 디버깅 도구

Angular 18에서는 디버깅 도구에 여러 가지 개선 사항이 도입될 예정입니다. 이러한 개선 사항은 Angular 애플리케이션의 디버깅 과정을 단순화하고 응용 프로그램 상태에 대한 더 깊은 통찰을 제공하기 위해 목표로 합니다.



- 디버깅 시 소스 맵 활용
- 컴포넌트 트리 및 데이터 바인딩 시각화

# Angular 18: 반응성을 위한 새 시대

Angular 18이 다가오고 있습니다. 개발자들을 위한 흥미로운 변화를 약속하며, 단순함, 개선된 컴포넌트 및 향상된 도구에 초점을 맞춰 이번 버전은 개발 경험을 더욱 높이고 있습니다. 릴리즈를 열망하며 우리의 개발 경험이 어떻게 진화되는지 기대하고 있습니다.

# 읽어 주셔서 감사합니다!



만약 이 내용이 유익했다면, 댓글을 남기거나 박수를 보내주시거나 제 팔로우를 눌러주세요. 공유는 사랑입니다, 따라서 여러분의 기술 열정이 넘치는 친구들과 커뮤니티에 전달해 보세요. 그리고 LinkedIn에서 저와 연락을 유지해주시는 걸 잊지 마세요 — 언제나 열정을 가진 열광적인 분들과 소통하는 것을 기대하고 있습니다! 👏

기억해 주세요, 우리의 기술 커뮤니티는 협력과 지식 공유에 의해 번영합니다. 대화를 이어나가 봅시다! 😊🚀