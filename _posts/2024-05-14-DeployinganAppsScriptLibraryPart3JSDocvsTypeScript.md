---
title: "앱 스크립트 라이브러리 배포하기 Part 3 JSDoc 대 TypeScript"
description: ""
coverImage: "/assets/img/2024-05-14-DeployinganAppsScriptLibraryPart3JSDocvsTypeScript_0.png"
date: 2024-05-14 13:45
ogImage: 
  url: /assets/img/2024-05-14-DeployinganAppsScriptLibraryPart3JSDocvsTypeScript_0.png
tag: Tech
originalTitle: "Deploying an Apps Script Library Part 3: JSDoc vs TypeScript"
link: "https://medium.com/javascript-in-plain-english/deploying-an-apps-script-library-part-3-jsdoc-vs-typescript-0a8772566293"
isUpdated: true
---




<img src="/assets/img/2024-05-14-DeployinganAppsScriptLibraryPart3JSDocvsTypeScript_0.png" />

# 아주 간단히 요약하면;

약 1년 전, SvelteKit이 TypeScript에서 JSDoc으로의 전환 결정을 내렸을 때 개발자 커뮤니티에 주목할 만한 변화가 있었습니다. TypeScript는 라이브러리 개발에 이상적인 선택이 아니라고 명시하며 이 전환이 일어났는데, 이로 인해 개발자들 사이에서 논란이 일었습니다. 처음에는 이것이 발전이 아닌 퇴보로 보여 의심스러웠습니다. TypeScript는 심지어 이전 블로그 포스트 중 하나에서 추천하는 도구로 소개되기도 했습니다. 그러나 이 결정은 시간이 흐름에 따라 점차 나에게 와닿게 되었고, 구글 앱스 스크립트에서 유사한 접근 방식을 채택하게 되었습니다. 이 전환의 이유는 여러 가지가 있으며, 일부는 보편적으로 적용되는 이유이며, 다른 일부는 앱스 스크립트의 특이성과 관련된 이유입니다.

여기에 다시 레포 및 NPM 페이지 링크가 있습니다.



자 TypeScript를 처음 선택했던 이유와 그것보다 JSDoc를 선호하는 이유에 대해 알아봅시다.

# TypeScript를 처음 선택한 이유

TypeScript는 스크립팅 및 앱 개발 분야에서 게임 체인저였습니다. 이는 주로 견고한 타입 안전 기능 때문입니다. TypeScript를 사용하면 명시적으로 선언하거나 지능적으로 추론할 수 있는 정적 타입을 사용할 수 있어 안전하고 견고한 코드를 작성하는 능력을 향상시킵니다. Google Apps Script 개발자에게 TypeScript는 추가적인 이점을 제공합니다; npm i -D @types/google-apps-script 명령어를 사용하여 GAS 타입을 쉽게 설치할 수 있습니다. 이를 통해 이러한 유형을 정의하는 데 필요한 초기 투자 시간에도 불구하고 개발 프로세스 초기에 버그를 조기에 발견하는 데 큰 도움이 됩니다.

또한 TypeScript는 타입에 대한 자동 완성을 제공하여 코드 품질과 유지 보수성을 향상시키고 코딩 프로세스를 가속화하며 오류를 줄입니다. 또한, 네임스페이스와 모듈을 사용할 수 있어 보다 조직적이고 모듈식 코드 구조를 구현할 수 있습니다. 이러한 기능들이 모두 Google Apps Script로 복잡하고 확장 가능한 애플리케이션을 개발하려는 개발자들에게 TypeScript를 매력적인 선택으로 만듭니다.



# TypeScript의 단점

TypeScript은 많은 이점을 제공하지만 몇 가지 개발자들에게는 특히 번거로울 수 있는 단점도 있습니다. 먼저, 컴파일 단계가 필요하다는 점은 주요한 문제일 수 있습니다. 이 과정은 빌드 시스템의 설정 및 유지에 추가적인 복잡성을 추가하므로 일부 팀이 추구하는 간소화된 프로세스와 일치하지 않을 수 있습니다.

또한, TypeScript은 종종 추가적인 종속성을 필요로 합니다. 예를 들어 프로젝트에 단위 테스트를 통합할 때 추가 패키지를 다루어야 한다는 점과 Cucumber와 같은 프레임워크와 특히 호환성 문제가 발생할 수 있어 통합이 거의 불가능해질 수 있습니다. 이는 특정 테스트 프레임워크에 의존하는 팀들에게 문제가 될 수 있습니다.

다른 중요한 단점은 많은 양을 요구한다는 점입니다. TypeScript는 타입을 명시적으로 선언해야하므로 코드가 비대해질 수 있습니다. 이로 인해 코드가 덜 우아해지며 타입 정의를 작성하고 관리하는 데 더 많은 시간이 소비되어 개발 속도가 느려질 수 있습니다.



마지막으로, 이러한 유형을 최신 상태로 유지하는 것은 상당한 부담이 될 수 있습니다. 프로젝트가 규모가 확장되고 발전함에 따라 정확한 유형 정의를 유지하는 것은 지속적인 관심이 필요하며 유용한 자원을 다른 개발 활동으로 전환할 수 있습니다. 이 과부하는 TypeScript를 사용하는 이점을 초월할 정도로 중요할 수 있으며, 이로 인해 일부 팀은 선택을 재검토하기도 합니다.

# Apps Script 특정 단점

TypeScript를 사용하는 데 관한 주목할만한 Apps Script 특정 단점 중 하나는 clasp 사용에 관련이 있습니다. clasp는 TypeScript를 JavaScript로 컴파일하는 도구 중 하나로, Apps Script 런타임과 호환되는 방식으로 작동합니다. 그러나 아쉽게도 clasp는 더 이상 업데이트되지 않는 상태이며, 이는 상당한 위험을 야기할 수 있습니다. clasp가 의존하는 TypeScript 버전이 점점 구식화되고 있으며, 호환성 문제나 완전한 실패가 발생하기 전에 오랜 시간이 걸리지 않을 것입니다. 이 구식화로 인해 더 최신의 TypeScript 기능이나 업데이트에 의존하는 스크립트들이 실행 안 될 가능성이 있습니다.

clasp의 기본 컴파일을 우회하려는 사람들을 위해서 자체 컴파일 구성을 설정하는 것은 대안이 될 수 있습니다. 그러나 이 방법은 자체적인 어려움을 포함하고 있습니다. 개발자들은 최종적인 JavaScript 출력이 Apps Script와 호환되도록 보장해야 합니다. 최소한, module.exports를 폴리필하는 노력이 필요하며, TypeScript 없이 이러한 조정을 관리하는 것이 간단하고 더 직관적일 수 있습니다.



또한 Google Apps Script와 호환되는 JavaScript 번들링 과정은 이 시리즈에서 나중에 다룰 예정입니다. 이 과정은 Apps Script 환경에서 스크립트가 원활하게 실행되도록 보장하므로 ECMAScript 표준 및 기타 호환성 장벽과 관련된 문제를 피할 수 있습니다. 이러한 요소들은 Apps Script 컨텍스트에서 TypeScript 대안을 고려하는 강력한 이유가 됩니다. 이에 대해 더 자세히 알아볼 것입니다.

# JSDoc의 구원

JSDoc로 전환하면 Apps Script 환경에서 TypeScript의 복잡성과 오버헤드에 좌절한 사람들에게 매력적인 대안이 제공됩니다. JSDoc의 가장 중요한 장점 중 하나는 컴파일 단계가 필요하지 않다는 것입니다. 이는 개발 프로세스를 간소화하고 설정 시간을 줄이며 빌드 중에 발생하는 오류 가능성을 줄입니다. 또한 clasp의 기능을 망가뜨릴 염려없이 컴파일이 실패할 걱정을 할 필요가 없습니다.

게다가 JSDoc는 추가적인 종속성 없이 작동합니다. 이 간소화된 접근 방식은 많은 종속성을 유지하는 환경에서 부담이 될 수 있는 곳에서 특히 유용하며, 충돌 및 관리 문제로 이어질 수 있는 가능성을 줄일 수 있습니다.



복잡한 유형이 필요한 경우에도 JSDoc은 여전히 유연성을 제공합니다. 개발자들은 .d.ts 파일을 활용하여 복잡한 유형을 정의할 수 있으며, TypeScript의 엄격한 요구 사항을 완전히 따르지 않고 고급 유형 안전성이 필요한 중간 지점을 제공합니다.

중요한 점은 JSDoc이 다수의 개발자가 필요로 하는 기본적인 기능을 지원하면서도 타입 체크와 자동 완성을 제공한다는 것입니다. 이러한 기능을 통해 개발자들은 추가적인 도구의 부담 없이 정확하고 효율적인 코드를 작성할 수 있습니다.

마지막으로, JSDoc을 사용하는 주목할만한 장점 중 하나는 코드베이스에서 기술 문서를 직접 생성하는 능력입니다. 간단한 명령행 명령을 통해 JSDoc은 소스 코드의 주석을 서식이 있는 HTML 문서로 변환하여 문서 작성 및 업데이트를 일관되게 수행하기 쉽게 만듭니다. 이 기능은 사용자 채택 및 개발자 온보딩에 중요한 문서를 최신 상태로 유지해야 하는 프로젝트에서 특히 가치가 있습니다.

# 결론



종류들은 멋지지만 JSDoc이 TypeScript보다 우세합니다.

# 시리즈의 다른 글들

- 파트 1: 나는 Google Apps Script에서 console.table()이 필요했고, 여기에 대해 한 일입니다.
- 파트 2: 소스 코드와 프로젝트 구조
- 파트 3: JSDoc 대 TypeScript (바로 이 글)
- 파트 4: 곧 배포 예정
- 파트 5: 곧 배포 예정
- 파트 6: 곧 배포 예정
- 파트 7: 곧 배포 예정

# 나에 대해



저는 전업 Google Workspace 및 Google Cloud Platform 개발자이자 Workspace Google Developer Expert (GDE)입니다. 또한 Wurkspaces.dev의 창립자이기도 합니다. 프로젝트에 신뢰할 수 있는 개발자를 찾고 계시다면 저를 고용해보세요.

# 쉽게 이해할 수 있는 영어로 🚀

이 쉽게 이해할 수 있는 커뮤니티의 일원이 되어주셔서 감사합니다! 떠나시기 전에:

- 작가를 클랩하고 팔로우하는 것을 잊지 마세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루는 블로깅 플랫폼에 지친 적이 있나요? Differ를 시도해보세요
- PlainEnglish.io에서 더 많은 콘텐츠를 확인해보세요