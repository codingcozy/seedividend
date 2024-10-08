---
title: "Revolut에서 iOS의 기초"
description: ""
coverImage: "/assets/img/2024-05-15-ThefundamentalsofiOSatRevolut_0.png"
date: 2024-05-15 03:17
ogImage: 
  url: /assets/img/2024-05-15-ThefundamentalsofiOSatRevolut_0.png
tag: Tech
originalTitle: "The fundamentals of iOS at Revolut"
link: "https://medium.com/revolut/the-fundamentals-of-ios-at-revolut-f75acb765ac8"
isUpdated: true
---




Revolut에서의 iOS 개발 뒷면을 살펴보겠습니다. 우리는 고객이 금융 앱을 통해 금융 생활을 관리하는 것에 의존하는 고객들을 위해 우수한 금융 서비스와 원활한 고객 경험을 제공하기 위해 노력하고 있습니다.

우리는 빠르게 고품질 소프트웨어를 제공할 수 있다고 믿습니다. 이를 달성하기 위해 우리는 중요한 원칙들을 따르고 주로 XP (eXtreme Programming)에서 영감을 받은 현대적인 아자일 실천 방법을 적용하고 있습니다.

# 빠르게 제공하기

현재 iOS 플랫폼에서 우리는 어플리케이션과 SDK를 모두 보유하고 있습니다.
다음은 실시간으로 제공되는 목록입니다:




## Revolut, Revolut `18, Revolut Business, Revolut POS 및 Revolut Pay SDK.

모든 iOS 애플리케이션은 매주 App Store에서 업데이트됩니다. 우리는 지속적 통합 및 지속적 전달의 원칙에 따라 새로운 기능을 빠르게 고객에게 제공합니다. 기능 또는 그 일부가 준비되는 즉시.

우리는 기능 기반 릴리스를 위한 독자적인 프레임워크를 구축했습니다. 우리의 프로세스에 따르면, 상품 소유자는 응용 프로그램의 선택된 버전부터 활성화할 기능을 지정합니다. 그런 다음 응용 프로그램 버전과 해당 기능이 점진적으로 롤아웃되며, 고객 베이스의 소수부터 시작합니다. 이 두 가지 접근 방식인 기능 플래깅과 점진적인 버전 및 기능 롤아웃은 최소한의 위험으로 고객에게 가치를 전달할 수 있도록 합니다. 문제가 발생하면 플래그가 꺼지거나 문제가 있는 변경 사항을 제거하기 위해 오래된 버전을 롤백으로 다시 제출합니다. 또한, 피쳐 플래그는 팀원들이 서로 다른 사용자 경험 간에 쉽게 전환하거나 비교하거나 테스트를 위해 켜거나 끌 수 있도록 합니다.

또한 사전 정의된 지표를 사용하여 새로운 기능을 실험하고 그 영향을 통계적으로 유의한 방식으로 측정할 수 있는 내부 실험 플랫폼을 개발했습니다. 이 플랫폼은 실험이 적절하게 설정되고 결과가 강인한 통계적 프레임워크를 사용하여 생성되는 것을 보장합니다.



모든 아이디어는 테스트되며, 데이터 기반 논리를 활용하여 결정이 내려지며, 최상의 사용자 경험이 핵심 개발 노력을 받도록 보장합니다. 이로 인해 주요 사용자 중심 기능이 신속하고 집중적으로 개발되는 결과를 얻을 수 있습니다.

# 아키텍처

iOS 기본 사항을 탐구할 때, 우리의 iOS 애플리케이션이 더 큰 생태계의 일부에 불과하다는 점을 인식하는 것이 중요합니다. 우리의 목표는 첨단 기술을 육성하여 사용자 경험을 향상시키는 것입니다 — 쉽고 효과적으로 유지합니다. 우리 다양한 앱, 기능 및 팀 간의 일치를 보장하기 위해 시스템 디자인 리뷰(SDR)라는 구조화된 프로세스에 의존합니다.

SDR 프로세스는 솔루션의 아키텍처를 평가하고 리파인하는 데 중요한 메커니즘으로 작용합니다. 아키텍처는 기술적 요소를 원활하게 결합하여 통일되고 효과적인 시스템을 만들어내는 접착제 역할을 합니다. SDR 맥락에서 모바일 아키텍처는 특히 중요하며, iOS 솔루션이 견고하고 확장 가능하며 산업 표준에 부합하는지 보장합니다.



솔루션 수준의 아키텍처를 이해하는 것은 SDR 프로세스에 효과적으로 참여할 뿐만 아니라 Revolut 내에서 개인 및 전문적 성장의 기회를 제공합니다.

iOS 플랫폼 관점에서 모든 제품은 Clean Architecture와 MVVM-C로 구현됩니다.

우리의 앱들은 단일체가 아닙니다. 핵심 모듈, UI 구성요소 및 거래, 결제, 암호화폐, 대출 및 카드와 같은 기능 모듈과 같은 공유 모듈이 포함됩니다.

현재 저희는 다음과 같은 것을 가지고 있습니다:



- 160개의 공유 모듈
- Revolut에는 170개의 모듈이 있습니다.
- Revolut Business에는 80개의 모듈이 있습니다.
- Revolut `18에는 45개의 모듈이 있습니다.

모든 앱과 공유 모듈은 단일 모노 레포지토리에 저장되어 있으며 각 모듈은 독립적으로 빌드 및 실행될 수 있습니다.

모듈화 아키텍처의 간략한 하이라이트:

- 빠른 빌드 시간 - 각 모듈은 전체 앱을 컴파일하지 않고도 빠르게 개발할 수 있도록 예제 또는 데모 프로젝트를 보유하고 있습니다.
- 빠른 개발 - 더 빠른 컴파일 및 예제 프로젝트에서 쉽게 화면에 액세스할 수 있어 더 빠른 개발이 가능합니다.
- 새로운 기능을 시도하기 위한 격리된 환경
- 몇 초만에 실행되는 테스트



# 기술 스택

우리는 Swift를 사용하여 개발하고 iOS SDK를 사용합니다. 우리의 목표는 외부 코드에 대한 의존성을 줄여 제3자 프레임워크에 의존하는 것을 최소화하는 것입니다. 예를 들어, 외부 프레임워크에 강하게 의존하는 대신, 핵심 라이브러리에서 가벼운 반응형 접근 방식을 채택했습니다. 이 전략은 Combine의 기능을 반영하며 미래에 SwiftUI로의 원활한 전환을 쉽게 할 것입니다.

우리 앱은 Xcode의 빌드 기능 한계를 크게 초과했으며, 고품질 소프트웨어를 빠르게 제공하는 우리의 주요 원칙과 일치하도록 하기 위해 다양한 섬세하게 조정된 오픈 소스 및 내부 도구를 사용합니다.

우리의 응용 프로그램과 프레임워크를 빠르게 빌드하고 테스트할 수 있도록, 구글의 Bazel로 전환하였습니다. 이는 신뢰할 수 있는 클라우드 및 로컬 모듈 빌드 캐시를 제공합니다.



우리 내부 도구는 전체 코드 베이스와 쉽게 작업할 수 있는 능력을 제공하는 명령줄 인터페이스로 완전히 Swift로 구축되어 있습니다. 회사의 모든 iOS 엔지니어가 이해하고 수정할 수 있도록 되어 있습니다.

로컬 환경과 유사한 CI 구성이므로 쉽게 빌드, 테스트 및 배포할 수 있습니다. 이는 어디서든 빌드 및 테스트할 수 있음을 의미하며, 추가로 릴리스, 개발, 특정 기능과 같은 모든 브랜치에서 작동하고 TestFlight 및 AppCenter에 배포할 수 있습니다.

개발 규모를 좀 더 잘 이해하기 위해 숫자를 살펴봅시다. 월별 iOS 팀은 약 2,200개의 풀 리퀘스트를 생성하며 이로 인해 거의 4,000~5,000개의 CI 빌드가 이루어집니다.

이처럼 밀도 높은 개발을 하면서 우리는 설정과 모듈 구조를 끊임없이 최적화합니다. 최근에 이러한 최적화로 PR 유효성 검사 시간을 40분에서 10분으로 줄였으며, 결과적으로 매월 거의 2,000~2,500시간의 CI 시간을 줄이게 되었습니다.



아래는 우리가 사용하는 다른 도구 및 기술들에 대한 정보도 중요합니다:

- Git
- Xcode
- Figma
- 데이터 저장을 위한 CoreData (저희의 모든 응용 프로그램은 오프라인 보기를 제공하기 때문에 인터넷 연결이 불가능할 때 CoreData 캐시 데이터베이스에서 데이터를 화면에 표시할 수 있습니다. 예를 들어 고객이 카드 세부 정보를 조회해야 할 때)
- SwiftLint, TeamCity 및 기타

# 교차 기능 팀

우리는 서로 다른 팀과 위치에 흩어진 120명 이상의 고통령 iOS 개발자를 보유하고 있습니다. 각 팀은 유지 및 보수를 책임지는 코드 소유권을 갖고 있습니다. 각 팀은 일반적으로 iOS, Android, 웹, 백엔드 개발자, 제품 소유자, 디자이너 및 데이터 분석가로 구성되어 있습니다. 따라서 각 팀은 아이디어를 제공하고 제품이나 기능으로 변환할 수 있는 작은 스타트업처럼 구성되어 있습니다.



팀원들은 개발한 기능에 대해 완전한 통제권을 갖습니다. 엔지니어로서 교차 기능 팀의 일원이 되는 것은 제품에 영향을 미치고 의사 결정에 참여하며 전문 지식 이외의 기술 학습에 참여할 기회를 갖는 것을 의미합니다.

팀의 생산성을 높이기 위해 분산된 작업 방식에 대해 방해 없이 개발하는 데 많은 도구를 사용합니다. 각 팀이 각자의 설정과 프로세스를 가지고 있지만, 일반적으로 우리는 Agile 방법론을 따르고 있으며 Slack에서 소통하고 Confluence에 개발 자산을 저장하며 Jira에서 진행 상황을 추적합니다.

# 품질

빠른 고품질 소프트웨어 전달을 보장하기 위해 우리는 품질 보증 프로세스의 자동화를 극대화하는 것을 우선시합니다. 우리의 테스트 피라미드는 견고한 기반을 형성하며, iOS 제품에 사용되는 모든 테스트는 Swift로 작성되고 XCTest 및 XCUITest와 같은 네이티브 SDK를 활용합니다. 또한 구문 달콤함과 문서 주도식 테스트 개발을 위해 Quick + Nimble과 같은 프레임워크를 결합하여 문맥과 행동 주도식 테스트를 특징으로 합니다. 더불어 재사용 가능한 디자인 구성 요소를 위해 SnapshotTestCases를 구현합니다.



우리의 자동화된 테스트 피라미드 부분에 대한 몇 가지 숫자가 있습니다:

- 가장 낮은 수준에서는 약 12,000개의 단위 테스트 스위트가 있으며, 개별 구성 요소를 확인하는 데 150,000개 이상의 별도의 테스트 케이스가 있습니다.
- 중간 및 상위 수준에서는 UI 테스트 스위트가 있으며 통합 및 응용 프로그램의 UI/UX 부분을 커버합니다.
- Revolut: 1,800 UI 테스트 케이스
- Revolut Business: 430 UI 테스트 케이스
- Revolut `18: 760 UI 테스트 케이스

또한 제품의 품질을 보증하는 것은 모든 직원들간의 공동 책임임을 중요하게 생각합니다. 특정 QA 엔지니어가 없더라도, 우리의 개발자, 제품 소유자, 디자이너 및 다른 모든 직원들은 고품질을 유지하기 위해 철저한 조치를 취합니다. 그들은 수동 교차 확인 및 매일 앱 사용 테스트를 포함한 다양한 테스트 방법을 업무 프로세스에 통합합니다. 이 자동화 및 협업 접근 방식을 채택함으로써 우리는 신뢰성 있고 사용자 친화적인 제품을 고객들에게 제공하는 의무를 지키고 있습니다.

# 보안



모든 팀원들이 Revolut의 성공이 얼마나 심각하게 우리가 보안 위험에 대처하는지에 달려있음을 이해하고 있습니다. 우리는 사용자 데이터 추적 및 분석에 대한 내부 솔루션을 우선적으로 다루어 개인 데이터가 제3자에게 노출되지 않도록 보장합니다. 우리는 데이터를 활용하여 고객 경험을 향상시키는 데 기여하며, 사용자 흐름을 최적화하거나 UI 요소의 배치를 최적화하는 등의 작업을 합니다.

특히 iOS에 대해서는 모든 민감한 데이터와 자격 증명을 KeyChain에 안전하게 저장하고 최대한 모든 것을 암호화합니다. 게다가, API 엔드포인트 및 로컬 저장소를 세심하게 설계하여 데이터 전송량과 저장된 데이터를 최소화합니다.

# 디자인 일관성

모든 UI 구성 요소는 응용 프로그램 내에서 높은 재사용성을 위해 설계되고 있는데, 이러한 구성 요소는 애플리케이션의 시각적인 일관성을 유지하기 위해 별도의 모듈에 포함되어 있습니다. 이러한 모듈은 개발되는 모든 플랫폼에서 네이티브로 구현되어, 동일한 UI 및 UX 구현을 보장합니다. 이 접근 방식을 디자인 시스템이라고 합니다. 우리는 이 시스템을 핵심 원리로서 원자적 디자인을 고려하여 개발하였습니다.



디자인 시스템은 코드 양과 개발 시간을 줄여주는 자원 절약 도구로 작용합니다. 개발자들은 이제 더 이상 코드를 중복으로 작성하거나 컴포넌트를 처음부터 다시 만드는 시간을 보낼 필요가 없습니다. 대신 레볼루트 디자인 시스템 앱을 활용할 수 있습니다. 이 앱은 모든 기존 UI 컴포넌트를 보여주며, 개발자들이 쉽게 필요한 컴포넌트를 선택하고 재사용할 수 있도록 도와줍니다.

# 레볼루트에 합류하세요

iOS용 세계적 수준의 금융 앱을 만들고 싶나요?
레볼루트에서의 경력 기회를 살펴보고, 가장 재능 있는 개발자들로 구성된 팀에 합류해보세요.

# 링크



우리 애플리케이션:
Revolut
Revolut `18
Revolut Business
Revolut POS
Revolut Pay SDK

접근 방식:
- [실용적인 테스트 피라미드](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Atomic 웹 디자인](https://bradfrost.com/blog/post/atomic-web-design/)

도구:
- [Bazel](https://bazel.build/)
- [SwiftLint](https://github.com/realm/SwiftLint)
- [Quick](https://github.com/Quick/Quick)
- [iOS 스냅샷 테스트 케이스](https://github.com/uber/ios-snapshot-test-case)
- [TeamCity](https://www.jetbrains.com/teamcity/)
- [Confluence](https://www.atlassian.com/software/confluence)
- [Slack](https://slack.com/)
- [Jira](https://www.atlassian.com/software/jira)

Revolut에 대해 더 알아보기:
- [Revolut 엔지니어링 소개](https://medium.com/revolut/under-the-hood-engineering-at-revolut-2dc183c04228)
- [Revolut 채용 정보](https://www.revolut.com/careers)
- [Revolut YouTube 채널](https://www.youtube.com/watch?v=SPDnhMg7kMk&t=1898s)