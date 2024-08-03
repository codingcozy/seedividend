---
title: "JavaScript의  접두사 대신 TypeScript의 private를 사용해야하는 이유 "
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Why Sticking with TypeScripts private Keyword Trumps Using JavaScripts  Prefix for Privacy"
link: "https://medium.com/stackademic/why-sticking-with-typescripts-private-keyword-trumps-using-javascripts-prefix-for-privacy-deba0f4026f0"
---



![Why Sticking with TypeScript's private Keyword Trumps Using JavaScript's Prefix for Privacy](/assets/img/WhyStickingwithTypeScriptsprivateKeywordTrumpsUsingJavaScriptsPrefixforPrivacy_0.png)

프로그래밍의 계속 발전하는 세계에서 JavaScript의 private 클래스 변수에 대한 # 접두사의 도입은 언어 수준에서 진정한 캡슐화를 제공하는 중요한 발전이었습니다. ECMAScript 2022에서 JavaScript에도 도입된 이 기능은 TypeScript 개발자들 사이에서 개인 변수를 정의하는 최선의 방법에 대한 논쟁을 촉발했습니다. JavaScript에 정적 유형 및 향상된 객체 지향 기능을 제공하는 데 유용한 TypeScript은 클래스 캡슐화를 위한 구문의 일부로 오랫동안 private 키워드를 사용해왔습니다. 개인 정보 보호를 보장하기 위한 새로운 # 접두사 구문의 매력에도 불구하고, 저는 TypeScript private 데코레이터의 계속적인 사용을 지지합니다. 여기에 이유가 있습니다:

# 1. 코드베이스의 일관성

TypeScript의 private 키워드는 클래스 내의 개인 속성 및 메서드에 대한 표준입니다. 이는 객체 지향 프로그래밍 개념에 익숙한 사람에게 쉽게 이해될 수 있는 액세스 제어의 명확하고 명시적인 표시입니다. 동일한 코드베이스 내에서 개인 및 #을 사용하여 개인 정보 보호를 전환하는 것은 일관성의 부재로 인해 코드를 읽고 유지 관리하기 어렵게 만들 수 있습니다. private 키워드를 적용하면 일관된 코드 스타일을 유지하고 새로운 개발자가 코드베이스를 이해하기 쉽게 만듭니다.

<div class="content-ad"></div>

# 2. 도구 및 IDE 지원

TypeScript 도구인 린터와 통합 개발 환경(IDE)은 private, protected, public과 같은 TypeScript의 접근 제한자에 최적화되어 있습니다. 이러한 도구는 이러한 접근 수준을 기반으로 가치 있는 피드백과 코드 분석을 제공하여 개발 프로세스 초기에 잠재적인 문제를 미리 파악하는 데 도움을 줍니다. # 접두사에 대한 도구 지원이 개선되고 있지만, TypeScript의 접근 제한자와 기존 도구의 통합성과 성숙도는 더 원활한 개발 경험을 제공합니다.

# 3. TypeScript의 구조적 타입 시스템

TypeScript의 핵심 기능 중 하나는 값의 모양에 초점을 맞춘 구조적 타입 시스템입니다. 이 시스템은 명칭적 타이핑과 비교하여 더 유연하고 동적인 코딩 패턴을 지원합니다. private 키워드의 사용은 이 시스템에 영향을 주지 않지만, # 접두사는 private 필드가 있는 클래스의 유형 확인에 명칭적 요소를 도입합니다. 이러한 약간의 명칭적 타이핑으로 인해 TypeScript 개발자가 감사했던 유연성 중 일부가 제한될 수 있습니다.

<div class="content-ad"></div>

# 4. 상호 운용성 및 리팩터링

대규모 프로젝트나 다른 JavaScript 또는 TypeScript 프로젝트에서 사용될 라이브러리를 작업할 때 코드의 상호 운용성은 매우 중요합니다. TypeScript의 private 키워드는 생성된 JavaScript 코드의 구조를 변경하지 않으므로 다른 프로젝트 간에 작업하기가 더 예측 가능하고 쉬워집니다. 또한 TypeScript의 접근 제한자를 사용하는 코드를 리팩터링하는 것은 TypeScript의 도구 생태계의 도움으로 간단해지며 프로젝트 전체에서 액세스 수준을 자동으로 업데이트할 수 있습니다.

# 5. 미래 호환성

TypeScript 팀은 새로운 JavaScript 기능을 적극적으로 채택하되 TypeScript가 미래 JavaScript 버전과 호환되도록 보장하는 것으로 알려져 있습니다. private 키워드를 사용함으로써 개발자들은 코드가 TypeScript 및 JavaScript의 미래 버전과 호환될 것이라는 것을 믿을 수 있습니다. TypeScript 팀은 JavaScript의 발전에 맞춘 새로운 기능을 지원하거나 이동할 수 있는 경로를 제공할 가능성이 있습니다.

<div class="content-ad"></div>

# 결론

자바스크립트에서 개인 변수에 대한 # 접두사는 언어의 기능에서 중요한 발전을 나타내지만, TypeScript의 private 키워드를 사용하는 이점들 - 일관성, 도구 지원, TypeScript의 유형 시스템과의 호환성, 상호 운용성 및 앞으로의 호환성 - 이어포여 계속해서 사용할 가치가 있는 이유를 제시합니다. TypeScript가 JavaScript와 함께 계속 발전함에 따라 프로젝트 및 팀의 목표와 가장 잘 맞는 기능을 활용하여 유지보수 가능하고 이해하기 쉽고 견고한 코드를 확보하는 것이 중요합니다.

# Stackademic 🎓

끝까지 읽어주셔서 감사합니다. 가기 전에:

<div class="content-ad"></div>

- 작가에 대한 박수와 팔로우 부탁드려요! 👏
- 팔로우하기 X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문해주세요: In Plain English | CoFeed | Venture | Cubed
- Stackademic.com에서 더 많은 콘텐츠를 만나보세요
