---
title: "2024년 대기업에서 디자인 시스템 설계 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Planning a Design System Generation"
link: "https://medium.com/@nathanacurtis/planning-a-design-system-generation-ce4120393557"
isUpdated: true
---

## 라이브러리 전반에 걸쳐 전환하는 방법

시리즈 디자인 시스템 세대 중 5번째 중 2번째:
정의하기 | 계획하기 | 채택하기 | 명명하기 | 제외하기

전체 라이브러리를 변경하는 것은 어마어마한 도전입니다. 몇 달 동안 작업이 소요될 수 있습니다. 때로는 1년 이상이 걸릴 때도 있습니다. 업데이트 및 리팩터링이 복잡하고 서로 의존하는 기능 목록에 영향을 미칩니다. 업무는 여러 학과와 이해관계자들에게 그림자처럼 퍼져나가며 검토 작업의 파도가 몰려옵니다. 용감한 초기 채택자들은 작업을 빨리 진행하기 위해 가능한 한 빨리 접속하길 바랍니다. 당신은 앞서 달려가죠. 그리고 배우면서 다시 돌아와 리팩터링합니다. 작업의 규모는 엄청납니다.

디자인 시스템 리더들과 매니저들, 걱정하지 마세요. 잘 계획된 계획은 각 단계별로 작업을 안내하고 점진적으로 전달하며 중요한 중간 단계에서 명확하게 소통할 수 있도록 도와줍니다.

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

이 게시물은 중요하고 혁명적인 변화를 통해 디자인 시스템 라이브러리를 관리하는 고수준 접근 방식을 설명합니다. 데모와 계획을 통해 조직이 전략에 헌신할 수 있도록 하면, 구현 작업은 라이브러리를 전달하기 위해 단계별로 진행될 수 있습니다. 그 과정에서 작업을 할당하고 그룹화하며 순서를 정하는 전술을 적용할 수 있습니다. 완료되면, 이전 세대를 폐기하고 종료 활동을 수행하면서 라이브러리를 론칭할 수 있습니다.

# 전략 단계

외부 요구사항이나 시스템 주도적 추구로 인해 시작된다면, 전략적 단계는 발견에서 동시에 여러 트랙을 통해 합의를 이끌어내고 방향을 탐색하고 이해 관계자를 일치시키며 구현을 계획할 수 있습니다.

## 일반적인 활동

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

- 요구 사항 수집, 이해 관계자 면담, 기존 시스템 및 백로그 감사를 통해 필요를 발견합니다.
- 비쥬얼 언어 발전 또는 기술 스파이크를 통한 증명 개발을 통해 잠재적인 미래를 탐색합니다.
- 누가 언제, 어떻게 만들 것인지 계획합니다.
- 탐색과 계획을 통해 이해 관계자들을 일치시켜 인식을 형성하고 합의를 도모합니다.

## 완료 정의

전략 단계는 모든 이해 관계자가 계획에 일치하고 커밋하여 탐색 및 데모에 기반한 구현을 약속했을 때 완료됩니다.

전략 단계의 탐색은 구현으로 이어질 수 있습니다. 전자가 끝나기 전에 후자가 시작된다면 괜찮습니다. 기획자의 초점은 확신 있는 약속과 명확한 전진 경로에 있어야 합니다.

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

# 실행 단계

실행 단계는 완전한 라이브러리를 생성하며 언제나 의미 있는 단계로 진행됩니다.

여러 해 동안 두 단계를 거쳐 진행하는 것으로 결정했습니다:

- 알파(s), 여기서 약간의 기능(색상, 타이포그래피, 아이콘, 버튼 등)이 충분히 발전하여 기능이 어떻게 구축될지를 보여줍니다.
- 베타(s), 충분한 품질과 안정성으로 충분한 기능이 구축되어 관심 있는 사용자들이 사용할 수 있는 안정적인 생산을 허용합니다.

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

## 일반 활동

- 특히 영향력 있는 커뮤니티 회원들을 위한 정기 진행 데모
- 기능 및 산출물의 완료 여부를 모니터링하기 위한 정기 상태 회의
- 진행 상황을 보여주고 흥미를 유발하는 마일스톤 통신
- 접근 방식, 변경 사항 및 이관 유효성을 검증하기 위한 시범 및 테스트 주기
- 배운 내용을 바탕으로 완료된 부분을 재방문하고 리팩토링
- 사전 출시 예고 및 기대 설정 통신

## 완료를 정의

라이브러리가 베타 상태로 전환되는 시점은 충분한 구성 요소가 충분한 생산 수준 품질로 제공되어 초기 채택자들이 확신을 가지고 사용할 수 있는 때입니다. 전반적인 구현이 완료되는 시점은 라이브러리가 베타 상태를 빠져나와 범용으로 사용 가능하게 출시되는 때입니다.

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

# 실행 전술

## 본 요점을 증진하여 점진적인 전달

작업 규모가 클수록 시간이 더 오래 걸립니다. 그 결과로 작업을 마일스톤으로 나누어 주요 순간에 의사 소통을 하고 그 외에는 점진적으로 전달합니다.

최근 몇 년간 제가 이끈 가장 간단한 "재설계" 구현은 출시 전 알파 버전을 거친 뒤 출시 전에 대략 월 단위로 세 번의 베타 버전이 출시되었습니다.

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

자주, "리디자인" 주기는 9~12개월이 소요되며, 작업물을 점진적으로 전달하기 위한 더 많은 알파 및 베타 순간이 있습니다.

마일스톤을 따라 중요한 순간을 고려해보세요. 예를 들어, 문서 사이트와 같은 한 출력물이 다른 출력물(예: 발행된 Figma 라이브러리 및 Storybook 문서)보다 후에 처음으로 모든 채택자들에게 보이게 될 수 있습니다.

## 작업을 순서대로 나열하는 데 종속성 사용하기

라이브러리의 완전한 생성은 10개에서 15개부터 100개 이상의 컴포넌트를 포함할 수 있습니다. 작업의 순서를 결정하는 방법은 어떤가요? 분명히, A부터 시작해서 Z로 끝내지는 않겠죠.

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

일반적으로 컴포넌트 라이브러리는 작은 것부터 큰 것까지 만들거나 다시 만듭니다. 더 큰 것을 완성하기 어려울 때, 그것이 의존하는 더 작은 것들이 완전하지 않은 경우가 많습니다. 그러므로 라이브러리 의존성 트리를 직접 맵핑하는 것은 작업을 어떻게 순서대로 처리할지에 대한 정보를 제공합니다.

Breadcrumb 및 Tabs와 같은 간단한 구성 요소에는 의존성이 없습니다. 언제든지 처리할 수 있어요. 그러나 List Group는 다른 이야기입니다. Checkable 항목이 있는 경우 Checkbox에 의존하며, Checkbox는 Form label에 의존하며, 그 다음은 Tooltip에 의존합니다(제가 작업하는 몇 가지 시스템에서) 그리고 Icon에 의존합니다. 많은 경로가 Icon으로 연결되므로 첫 번째 일괄 처리에서 처리해야 할 작업입니다.

특히 하위 구성 요소가 있는 대규모 라이브러리는 복잡하고 작성하기 어려우며 유지하기 귀찮은 의존성 트리 맵을 작성합니다. 그러므로 비공식적으로 처리하세요. 이러한 다이어그램을 자동화할 때까지 완벽하게 실험하거나 유지하지 마세요. 대신, 이러한 관계를 스프레드시트나 Jira 또는 Asana와 같은 작업 관리 도구와 같은 것에 기록하세요.

## 의존성 및 공유 속성에 기반하여 그룹화하고 할당하세요

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

나무 다이어그램에 속지 마세요. 의존성을 존중하면서 효과적으로 우선순위를 정하고 그룹화하세요. 예를 들어, 버튼은 초기에 필요하며, 텍스트 입력 문제를 해결하면 다른 양식 구성 요소를 마무리할 수 있고, 경로 탐색은 레이아웃에서 고립되어 우선순위가 낮습니다. 해당 배치에 주의하세요.

그러나 기능은 사람에 의해 만들어집니다. 의존성을 존중하면서 직원에게 분배하고 할당하여 유사한 특성을 가진 구성 요소를 그룹화하고 관련된 업무를 맡겨주세요.

개선된 예시에서 디자이너 1은 분명히 "양식 디자이너"입니다. 툴팁에 대한 초기이지만 복잡한 고려사항은 라벨과 오류를 처리하여 텍스트 입력을 완료하고 "선택 가능 요소"(체크박스, 라디오 버튼 및 토글) 및 기타 내용의 일괄 처리를 완료합니다.

디자이너 2는 아이콘과 버튼에 중점을 두며 리스팅된 목록 및 경로 탐색과 같은 "쉬운" 구성 요소를 중간에 추가하고 나중에 방대한 목록 그룹이 될 수 있는 내용을 전달할 책임이 있습니다. 담당자 간의 의존성 커넥터의 수가 제한되어 있어, 한 명이 다른 한 명을 차단할 위험을 최소화하는 점에 유의해주세요.

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

기능 할당이 이제는 노력에 따라 대략적으로 공평하게 분배되며, 팀원 사이에 일을 명확히 분배하며 의존관계의 흐름을 존중합니다. 둘 다 기대대로 제공된다면 😉.

## 다른 속도로 기능 품질, 양 및 안정성 향상

디자인 시스템의 전 세대를 구현하는 과정이 진행됨에 따라 구성 요소의 양, 품질 및 안정성이 서로 다른 속도로 증가합니다.

이는 주기의 알파, 베타 및 GA 순간을 구성하는 데 도움이 됩니다.

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

기능 품질은 처음에 높게 시작해서 계속해서 높은 수준을 유지합니다. 시스템 개발자들은 구조적인 정밀성, 사용성, 접근성, 성능 및 라이브러리 일관성을 타협할 수 없는 것으로 간주하는 경향이 있어요. 그 점이 정말 좋아요. 그럼에도 불구하고 결함은 발생합니다. 놓친 세부사항을 수정해야 할 때도 있어요. 완벽주의는 진전의 적이 될 수 있어요. 알파에 대해서는 품질의 타협이 중요하지 않지만, 이는 제품 작업을 제공하는 채택자들에게 영향을 줄 거에요. 그러니 품질이 초기에 완벽할 필요는 없다고 예상하고 괜찮아요. 대신, 중요한 전환점에 초점을 맞춥시다: 베타. 라이브러리가 베타로 사용할 수 있다는 기대를 설정하면 조기 채택자들은 제품 작업에 충분한 품질을 신뢰할 수 있어야 해요.

완료된 기능의 양은 시간이 지남에 따라 "S 곡선" 모양을 띕니다. 발매에 다가갈수록 서서히 가속화되다가 둔화하게 되어요. 알파 버전에는 몇 가지 구성 요소만 포함되면 충분해요. 그런 다음 팀은 더 빠르고 더 많은 기능들을 제공하고 있지만, 발매에 다가갈수록 생산성이 느려질 수 있어요:

- 주력이 물건 만들기에서 테스트 및 문서화로 옮겨짐
- 뒤늦게 추가되는 구성 요소들은 더 크고 복잡해질 수 있음
- 피드백으로 이미 완료로 여겨진 것들을 재검토하게 됨

각 기능의 시각적 및 API 안정성은 구현 과정에서 증가합니다. 그럼에도 뒤바뀌는 일이 발생합니다. 더 많은 기능을 만들면서 학습한 내용에 기반해 이미 완료된 것으로 여겨진 것들을 다시 검토하게 될 것입니다. 안정적인 API에 대한 약속은 발매 시에만 확고하면 충분해요. 컴포넌트의 이름과 같은 일부 선택은 도입될 때부터 안정적이어야 할 수도 있어요. 반면에 속성 API, 레이아웃, 시각적 디테일링은 변화할 여지를 줘야 합니다. 개발주기 동안에 시스템 팀은 패턴을 비교, 평가하고 특징들을 통일시키기 위한 공간이 필요합니다.

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

각 조직은 각 단계에서 시스템이 얼마나 완전하고 안정적이며 훌륭한지에 대한 정의를 직접 결정할 것입니다. 그러나 마지막에 완료될 때, 채택자들은 완성도 높고 안정적이며 훌륭한 세대를 필요로 할 것입니다.

## 완료 행렬을 활용한 작업 보고

작업이 범위가 결정되고 계획되고 진행 중인 경우, 진척 상황을 요약하는 데 사용한 가장 구체적인 시각적 도구는 완료 행렬입니다. 주 구조는 최상위 작업 및/또는 산출물을 열로, 기능을 행으로 그룹화하여 구성 (기초, 구성 요소, 패턴)하고 출시 마일스톤(알파, 베타 1, 베타 2...)별로 정렬합니다.

안타깝게도, 이 행렬을 Jira나 Asana와 같은 작업 관리 도구에서 자동으로 생성하기는 어렵습니다 (리리스 보드의 사용자 정의 필드를 열로 생성하는 것이 큰 도움이 될 수 있습니다). 그렇지 않으면 Figma, Confluence 또는 프레젠테이션 슬라이드에서 유지되는 표를 수동으로 업데이트해야할 것입니다.

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

# 출시 및 일반 사용 가능성 ("GA")

공식 출시. 이 "모두를 위해 완료되고 준비된 순간"은 적극적인 커뮤니케이션으로 강조되며 간헐적으로 "보증 기간"이 뒤따를 수 있습니다. 사용자들이 시스템 팀에게 자신을 훈련해 주기를, 문제를 해결해 주기를, 그리고 사정을 해 주기를 얼마나 많이 기대하는지 소홀히 하지 마세요.

## 일반적인 활동

- 출시 이메일, Slack 및 기타 알림
- 다양하고 다른 대중을 대상으로 한 실시간 데모
- 시스템 팀과 친구들을 위한 축하 파티
- 이주 및 신규 기능에 중점을 둔 심층 훈련
- 일시적으로 시스템 팀 역량을 이동하여 "다음 구성 요소 제공" 대신 더 많은 지원 및 컨설팅을 선호
- 한숨 돌리고 신경을 가라앉히며 다음 일정을 세우며 팀이 휴식할 수 있도록 하는 것.

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

## 완료 조건 정의

출시 기간은 디자인 시스템 관행이 다시 “일상으로 돌아가는” 상태(BAU)에 안정화될 때 종료됩니다. 점진적인 작업은 현재의 것을 향상시키고 새로운 것을 제공하며 필요에 따라 천천히 작은 것들을 파괴합니다.

그러나 대부분의 경우, 점진적인 변경의 기간은 영원히 지속되지 않습니다. 또 다른 세대는 지평에 나타나고, 그리고...

세대 간 전환 기간은 디자인 시스템 생애에서 가장 크고 중요한 순간입니다. 전략, 구현 및 궁극적으로 종료 단계를 걸쳐 진행 방식을 계획하고 전달함으로써, 기대치를 설정하고 협력 파트너가 그에 맞게 계획할 수 있도록 지원합니다. 다음 큰 순간을 준비하는 동안 팀과 함께 좋은 결과를 이루길 바랍니다.

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

다음: #3. 세대 명칭하기
