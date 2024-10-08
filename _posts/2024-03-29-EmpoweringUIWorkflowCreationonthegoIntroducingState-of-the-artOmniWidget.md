---
title: "UI 워크플로우 생성을 강화할 수 있는 OmniWidget 소개"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Empowering UI Workflow Creation on the go  Introducing State-of-the-art OmniWidget"
link: "https://medium.com/airteldigital/empowering-ui-workflow-creation-on-the-go-introducing-state-of-the-art-omniwidget-fecf8b4e47e1"
isUpdated: true
---

# 소개

현재 빠르게 변화하는 디지털 환경에서, Airtel에서 우리에게 있어서 최적의 응용 프로그램 성능을 보장하는 것은 원활한 사용자 경험을 제공하고 경쟁 우위를 유지하는 데 매우 중요합니다.

Airtel에서 우리는 새로운 서비스 주문(Airtel Black / Broadband / Prepaid SIM / XSafe 등)과 같은 다양한 채널을 방문하는 거의 5백만 명의 사용자들이 기존 서비스의 변경 및 기존 서비스 이전과 같은 작업을 수행합니다. 이러한 모든 제품과 서비스는 각자 고유한 여정이 필요하며, 우리는 변화하는 시장 조건과 점점 높아지는 고객 기대에 지속적으로 적응해야 합니다. 따라서, 신속한 시장 변화에 대응하려면 웹사이트와 Airtel Thanks 앱을 계속 수정하는 것이 매우 중요합니다.

위의 문제를 해결하고 고객 경험에 일관성을 더하기 위해, 모바일 앱과 웹 모두에 대한 코드 한 줄을 작성할 필요 없이 사용자 여정을 정의할 수 있는 능력을 갖기 위한 여정에 나섰습니다. 동시에, 여러 A/B 실험을 동시에 실행할 수 있을 정도로 프로세스가 간단하고 견고하도록했습니다.

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

우리는 이를 정교하면서도 강력한 엔진이라고 부르는데요 — OmniWidget

# 배경과 동기

OmniWidget이 등장하기 전에는 새 제품/서비스의 UI/UX를 효율적으로 출시하거나 기존 서비스의 UI/UX를 업그레이드할 때 다양한 어려움에 직면했습니다.

번거로운 개발 노력이 필요했고 이어서 엄격한 테스트가 필요했습니다. 동일한 흐름의 다양한 변형을 실행하는 것은 상황을 악화시켰습니다. 이는 더 느린 처리시간과 성장 숫자를 추진하는 측면에서 생산성 감소로 이어졌습니다. 기술적으로 말하자면, 이는 사용되지 않는 기능을 제거하기 위해 더 자주 코드 정리 주기를 동반하게 되어 우리 엔지니어링 팀에 압력을 더 늘어뜨리게 했습니다.

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

모든 이러한 문제와 더 많은 것들이 우리에게 미리 정해진 템플릿에 의존하지 않는 UI 렌더링 엔진을 고안해야 한다는 동기를 부여했습니다. 요약하면, 설정에 기반해 전체 UI를 생성하고 각 사용자 상호 작용에 대해 어떤 일이 발생해야 하는지 이해하며 설정에 기반해 조치를 취하고 AB 테스트를 가능하게 하며 Web과 App에서 작동하는 시스템을 만들어야 했습니다.

# 솔루션

Android Native 및 iOS Native 애플리케이션과 원활하게 통합되는 애플리케이션을 만들기 위해 우리의 명백한 선택은 React Native였습니다.
웹에서도 작동하도록하려면 react-native-web을 사용했습니다. 이런 식으로 당사의 웹 및 앱 사용자를 위해 응용프로그램을 개발하기 위한 단일 리포지토리 구조를 활용했습니다.

웹 여정과의 통합을 위해, IFRAME을 기반으로 한 통합을 지원합니다.
이렇게 함으로써 코드 변경 시 극단적인 경우에도 실시간 업데이트를 전달할 수 있습니다.

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

모바일 앱 통합을 위해, 네이티브 언어 SDK에서 OmniWidget을 노출하는 SDK 기반 통합을 지원합니다.

# OmniWidget을 구동하는 아키텍처

![OmniWidget을 구동하는 아키텍처](/assets/img/EmpoweringUIWorkflowCreationonthegoIntroducingState-of-the-artOmniWidget_0.png)

OmniWidget이 열리자마자 백엔드에서 모든 구성을 요청합니다. 어떤 필드를 렌더링할지, 선행 API 요청, 필드가 활성화/비활성화될지, 필드가 표시/숨겨질지, 필드에 유효성 오류가 있는지, onBlur, onFocus, onClick, onSelect, onDrag 등에서 취해야 할 조치들은 구성이 전체 UX를 제어하는 예시입니다. 이 외에 각 필드에 CSS 스타일링을 적용하는 테마 엔진도 있습니다.

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

사용자 그룹에 정의된 조합에 따라 클라이언트로 전송할 구성이 결정됩니다. 이 접근 방식을 통해 우리는 코드 한 줄을 작성하지 않고도 AB 실험을 수행할 수 있습니다.

디자인 원칙으로, 우리는 전체 웹 페이지를 가장 작은 구성 요소로 분해하는 데 초점을 맞추었으며, 기능을 위해 필요한 것을 찾아내고, 피라미드 방식으로 코드에 가장 잘 맞는 구성 요소를 최종 결정했습니다.

# OmniWidget가 전통적인 웹 페이지의 기본적인 문제를 해결한 방법

A. 구성 요소 레이아웃
저희는 모든 구성 요소 구성을 트리 구조로 반환하며, 전용 모바일 앱에서 코드를 작성하는 방식과 유사합니다.

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

B. 데이터 공급
각 구성 요소마다 redux 스토어에 동적 항목이 생성됩니다. 각 구성 요소는 자신의 엔트리를 참조하여 데이터를 표시합니다.

C. 데이터 가져오기 및 사용자 상호작용
우리는 백엔드 구성에 완전히 의해 구동되는 TaskEngine을 개발했습니다. 각 작업은 redux 스토어에서 특정 값 설정, API 발동, 데이터를 부모에게 보내기 등과 같이 매우 기본적입니다. 각 작업은 스토어에 있는 데이터를 기반으로 사용자 정의 페이로드를 생성하는 능력을 갖고 있습니다.
도시 드롭다운의 경우, 우리는 먼저 백엔드에서 도시 목록을 가져오는 프리마운트 작업을 가지고 있습니다. 그런 다음 다른 작업이 정확한 위치에 해당 사항을 설정하고 구성 요소가 참조하는 redux 스토어에 설정합니다. 사용자가 새로운 도시를 선택할 때마다, 동일한 필드가 업데이트됩니다.

D. 조건부 가시성, 비활성 또는 유효성
AND 연산, OR 연산, isEmpty, isNotEmpty, equals, regexMatch 등과 같은 기본 규칙을 구현하는 RuleEngine을 개발했습니다.
이러한 규칙에 따라 가시성이 허용되는 조건, 비활성화가 강제되는 조건 등을 구성합니다.

E. 폼 제출과 같은 조건부 작업 실행
우리의 TaskEngine은 RuleEngine 뒤에 숨겨져 있습니다. 이렇게 함으로써 정의된 규칙이 통과되거나 실패할 경우 어떤 작업을 수행할지 정의합니다.

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

**F. 스타일을 어떻게 관리했나요?**
위에서 언급했듯이, 각 구성 요소에 고유한 ID를 할당했습니다. 이렇게 하면 백엔드에서 스타일시트를 간단히 보내고 각 구성 요소가 자체 스타일시트를 참조할 수 있습니다.

이것은 기본 UI 작업을 해결한 몇 가지 예시 중 일부입니다.

## 이 아키텍처의 기타 이점

**A. 더 큰 작업을 수행하는 데 더 작은 팀**
전체 UI가 구성을 사용하여 생성되므로 각 제품에 대해 별도의 개발 및 테스트 팀이 필요하지 않습니다. OmniWidget를 유지하는 데 필요한 것은 단일 팀뿐입니다.

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

### B. 빠른 적응성 및 낮은 GTM 시간

설정 작성은 코드 작성보다 훨씬 빠르기 때문에 이제 몇 일 안에 전체 UI 여정을 만들 수 있는 위치에 있습니다. 이로써 우리의 GTM 시간이 매우 빨라졌습니다.

### C. 신속한 입사 절차

같은 팀과 하나의 제품이므로 새로 합류한 팀 구성원들의 전반적인 학습 곡선은 현재 훨씬 낮습니다.

# 결론

OmniWidget는 빠른 전환을 위한 비즈니스 과제를 해결하는 데 도움이 되었습니다.

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

최신 아키텍처 덕분에 중복 기능으로 코드를 날릴 필요가 없어요. 최소주의 접근 방식을 기반으로 하기 때문에 코드가 훨씬 더 깔끔하고 유지보수가 쉬워요.

크고 복잡한 팀이 필요하지 않아요. 이미 있는 리액트 개발자 팀이 안드로이드, iOS 및 웹 제품을 유지할 수 있으니까 더 큰 팀이 필요하지 않아요.

단일 레포와 단일 인터페이스로, 우리의 모니터링이 더 효율적이고 더 적은 시간이 필요해요.

신뢰할만한 언급

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
