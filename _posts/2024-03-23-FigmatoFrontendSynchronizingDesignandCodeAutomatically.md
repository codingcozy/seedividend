---
title: "Figma에서 Frontend로 디자인과 코드 자동 동기화하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Figma to Frontend Synchronizing Design and Code Automatically"
link: "https://vkteam.medium.com/figma-to-frontend-synchronizing-design-and-code-automatically-62e493054631"
isUpdated: true
---

![Figma-to-Frontend:-Synchronizing-Design-and-Code-Automatically_0.png](/assets/img/Figma-to-Frontend:-Synchronizing-Design-and-Code-Automatically_0.png)

안녕하세요! 저는 VK Tech의 디자인 책임자인 Anastasia Kabalkina입니다. 이 포스트에서는 디자인 토큰과 컴포넌트를 자동으로 생성하여 디자인 시스템의 1/3을 동기화하는 방법에 대해 이야기하겠습니다.

저희 팀은 금융 및 분석용 b2b 제품인 VK Tax Compliance, VK GRC, VK Data Symphony, VK Process Mining 등을 개발하고 있습니다. 이미 출시한 제품을 지원하는 동시에 매년 약 10개의 제품 이니셔티브를 전개하고 있어 제품 포트폴리오가 빠르게 성장하고 있습니다.

빠르게 성장하는 것에는 단점도 있습니다 — 인터페이스 품질을 효과적으로 통제하고 UX/UI 패턴의 일관성을 보장하는 것이 점점 더 어려워지고 중요해지고 있는 것을 알 수 있습니다.

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

## 디자인 및 프론트엔드의 불일치

대부분의 제품 개발 팀과 마찬가지로 몇 년 전에 저희는 디자인과 프론트엔드 간의 불일치에 직면했습니다.

저희의 디자인 시스템에서 많은 변화가 발생합니다: 새 컴포넌트를 때때로 추가하고, 이미 존재하는 컴포넌트를 개선하고 더 발전시키며, 다른 컴포넌트는 쓸모 없어지기도 합니다 — 이러한 변경 사항 중 일부는 다양한 이유로 모두 100% 정확하게 프론트엔드로 전달되지 않습니다.

어느 순간에 이 불일치가 심각해졌습니다 — 거의 모든 프론트엔드 컴포넌트가 어느 정도 디자인과 다르다는 것을 알게 되었습니다.

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

물론, 최소한의 불일치라도 전체적으로 보면 전체 그림을 크게 왜곡합니다.

다른 색상, 들여쓰기, 코너 반경 또는 크기가 다를 수 있습니다. 결국 실제로는 레이아웃과 달라 보이는 인터페이스가 나옵니다.

우리의 디자인과 프론트엔드를 "전통적인 방법"으로 조정하려는 시도는 실패했습니다.

디자인 검토 단계를 개발 프로세스에 통합하지 못했거나 모든 구성 요소를 수동으로 비교하지 못했거나 스프린트 중에 이러한 활동을 위한 시간을 찾지 못했습니다 — 항상 더 높은 우선순위를 갖는 다른 작업을 처리했습니다.

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

한편, 디자이너, 개발자, 분석가, 프리세일 매니저, 테스터 및 무엇보다 중요한 사용자와 비즈니스에게 모두 불편을 초래하여 상황이 악화되었기 때문에 우리는 이러한 불일치를 용납할 수 없었습니다.

## Figma 파일로부터 스타일 및 구성요소 자동 생성 아이디어

작업을 완료해야하지만 시간이 부족한 경우 어떻게 해야할까요? 자동화가 유일한 해결책입니다.

물론 자동화도 리소스를 소비하지만 대부분은 구현 단계에서 일어납니다. 그런 다음 많은 시간과 노력을 절약하고 전체 과정의 효율성을 향상시키기 시작합니다.

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

우리는 디자인에서 스타일과 컴포넌트를 코드로 자동으로 내보내기로 결정했고, 이 작업을 처리할 수 있는 Figma 플러그인이나 독립형 제품과 같은 도구를 찾기 시작했습니다.

그런 종류의 것을 찾지 못했습니다. 그러나 Figma의 API를 검토했을 때, 필요한 정보를 가져와 스타일과 컴포넌트를 직접 생성해볼 수 있다는 것을 이해했습니다.

전체적인 작업 흐름은 다음과 같습니다:

- Figma 파일에서 직접 데이터 가져오기.
- 수작업으로 코드 생성기(이하 Figma 생성기)를 통해 전달하기.
- 스타일의 디자인 토큰을 css, json, ts 형식(그 외 형식도 가능)으로 포함한 출력물, svg 아이콘 및 react (javascript) 컴포넌트의 코드 가져오기.
- 생성된 컴포넌트를 storybook에 자동으로 배치하기.

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

![Figma-to-Frontend:-Synchronizing-Design-and-Code-Automatically_1.png](/assets/img/Figma-to-Frontend:-Synchronizing-Design-and-Code-Automatically_1.png)

피그마 파일이 코드 생성의 원천이 되므로 스타일과 구성요소의 모든 매개변수를 반영해야 합니다.

이를 위해 피그마 스타일을 관리하고 구성 요소의 매개변수화를 처리하기 위한 특정 형식을 고안했습니다. 이는 생성에 사용될 수 있으며 일반적으로 수용되는 디자인 시스템 접근 방식과 충돌하지 않습니다.

## 스타일 자동 생성을 위한 피그마 파일 관리

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

텍스트 스타일, 색상 및 효과는 로컬 스타일(텍스트 스타일, 색상 스타일, 효과 스타일)을 통해 표준 방식으로 관리되며 추가 설정 없이 생성됩니다.

로컬 스타일을 통해 관리할 수 없는 스타일(예: 테두리, 테두리반경, 간격 및 아이콘 크기\*)을 생성하기 위해 특별한 구성 요소를 만듭니다. 각 구성 요소에는 스타일 이름과 해당 스타일이 전달하는 매개변수가 할당됩니다.

예를 들어, 테두리 스타일을 생성하기 위해 솔루션이 스타일 이름(예: 기본, 필드 테두리, 이미지 테두리 또는 디자이너 또는 프론트엔드 개발자의 재량에 따라 다른 이름)을 가진 컴포넌트를 생성하고 스트로크 색상 및 스트로크 너비 매개변수를 할당합니다. 여러 가지 테두리 스타일이 있는 경우, 각 스타일에 대해 별도의 컴포넌트가 생성됩니다.

![이미지](/assets/img/Figma-to-Frontend:-Synchronizing-Design-and-Code-Automatically_2.png)

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

- 스타일 생성 코드는 변수가 나오기 전에 작성되었습니다. 이제 우리는 Figma 생성기의 이 측면을 발전시켜 로컬 스타일과 변수에서 스타일을 모두 생성할 계획입니다.

## 컴포넌트 자동 생성을 위한 Figma 파일 관리

컴포넌트 생성은 좀 더 복잡하고 광범위한 작업입니다. 컴포넌트는 여러 특성을 가지고 있어서 Figma 생성기에 의해 가져오고 올바르게 처리되어야 합니다.

다음은 이러한 특성의 몇 가지 예시입니다:

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

- 매개변수의 조합에 따라 서로 다른 변형이 있는 변형 요소들,
- 구성 요소 상태에 의존하여 구성 요소 스타일을 결정하는 가상 상태 (가상 클래스) (호버, 포커스, 액티브, 체크됨 등),
- 구성 요소가 다른 구성 요소를 포함할 수 있음 (예: 버튼 내부에 아이콘 구성 요소 포함),
- 구성 요소를 구성할 수 있음 (예: 버튼 내부의 아이콘은 표시되거나 표시되지 않을 수 있고, 오른쪽 및/또는 왼쪽에 배치할 수 있음),
- 구성 요소가 텍스트를 포함할 수 있음 (예: 버튼, 체크박스 또는 라디오 버튼의 레이블) 및 모양 또는 곡선을 포함할 수 있음 (예: 체크박스 내부의 체크 표시 또는 라디오 버튼 내부의 원).

구성요소를 올바르게 생성하려면 Figma 생성기가 Figma 파일에서 위의 모든 정보를 가져와서 구성 요소의 react (자바스크립트) 코드를 생성해야합니다. 이를 위해 Auto layout 및 Properties 기능에 기반한 Figma 레이아웃 및 구성 요소의 매개변수화 기술을 개발했습니다.

모든 구성 요소는 Auto layout 기능을 사용하여 정렬되어 있습니다. 다음을 사용합니다:

- 항목 간의 수평 간격, 패딩 매개변수를 사용하여 패딩 및 내부 들여쓰기를 설정합니다.
- 구성 요소 너비와 높이 제한을 결정하기 위해 최소 너비, 최대 너비, 최소 높이 및 최대 높이 매개변수를 사용합니다.
- 텍스트를 "자르는" 기능을 활성화하는 Truncate text 매개변수 사용
- 텍스트 컨테이너 내 허용되는 줄 수를 설정하기 위해 Max lines 매개변수를 사용합니다.

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

그 외에도, 수평 및 수직 조절 매개변수를 사용하여 컴포넌트 동작 유형을 프런트엔드로 내보냅니다(이 매개변수는 컴포넌트 크기가 내용에 따라 결정되는지(hug) 또는 컴포넌트가 할당된 공간 전체를 차지하는지(fill)를 결정합니다).

![이미지](/assets/img/Figma-to-Frontend:-Synchronizing-Design-and-Code-Automatically_3.png)

## 속성 관리 예시

다중 값 속성(예: xs, s, m, l 값이 있는 크기 속성)을 관리하기 위해 변형 속성 기능을 사용합니다. 예를 들어 참/거짓 값을 허용하는 속성인 비활성화(disabled), isNegative, isLoading 등은 동일한 방식으로 지정됩니다.

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

가상 상태 (의사 클래스)는 Variant 속성을 통해 지정되며 true/false 값을 수용하며, 이러한 상태의 이름에는 다른 속성과 구분하기 위해 콜론이 추가됩니다. (예: :hover, :focus, :active와 같이).

우리는 불리언 속성을 표준 방식으로 관리하며, 이는 Boolean 함수를 통해 이루어집니다. (예: showIconLeft, showFirstButton 등의 속성). 또한, 다른 컴포넌트 내에 컴포넌트를 삽입하기 위해 Instance 스왑 속성 매개변수를 삽입 영역으로 설정합니다.

![이미지](/assets/img/Figma-to-Frontend:-Synchronizing-Design-and-Code-Automatically_4.png)

컴포넌트에 텍스트 컨테이너가 포함되어 있는 경우, 해당 컨테이너는 Children이라는 텍스트 매개변수로 할당되어 프론트엔드에서 컴포넌트에 어떤 텍스트든 "추가"할 수 있습니다.

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

<img src="/assets/img/Figma-to-Frontend:-Synchronizing-Design-and-Code-Automatically_5.png" />

## 컴포넌트 자동 생성의 성과 및 제한 사항

1년 만에 18개의 컴포넌트 생성 방법을 익혔습니다. 매번 생성할 때마다 새로운 도전이었죠.

그럼에도 불구하고, 저희는 다음을 성취했습니다:

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

- 모든 구성 요소의 기본 매개변수를 프론트엔드로 내보냅니다.
- 고도로 자격을 갖춘 개발자가 작성한 것처럼 능숙하게 코드가 작성된 완전한 구성 요소를 생성합니다.
- 타사 라이브러리에 연결할 수 있는 구성 요소를 생성합니다(예를 들어, 제목 구성 요소는 생성되지만 "i" 아이콘 위를 가리킬 때 나타나는 툴팁 구성 요소는 자동으로 활성화되는 AntDesign 구성 요소).

![이미지](/assets/img/Figma-to-Frontend:-Synchronizing-Design-and-Code-Automatically_6.png)

그러나 생성에는 제한 사항이 있습니다. 따라서 코드를 작성하는 비용이 지나치게 높아서 절대적인 이득을 얻지 못하는 구성 요소가 있습니다(오픈 소스 라이브러리에서 정교한 로직이 있는 테스트된 선택 구성 요소를 사용하는 것이 이 구성 생성기를 처음부터 작성하는 것보다 훨씬 쉽습니다).

또한, 현재까지 우리는 Figma에서 애니메이션 매개변수를 내보내거나 어떻게 다른 구성 요소의 어떤 수의 구성 요소를 수용하는 구성 요소를 생성할 지 발명하지 못했습니다.

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

마지막으로 가장 중요한 제약 사항은 Figma 생성기가 우리의 통제를 벗어나는 API를 통해 데이터를 얻는다는 것입니다. 따라서 API의 변경이나 제한된 접근이 생성기를 추가로 개발하거나 이 방식으로 구성 요소를 생성하는 아이디어를 완전히 포기해야 할 필요성을 만들 수 있습니다. 그리고 Figma의 다음 업그레이드에서 개발 모드가 무엇을 제공할지 아무도 모릅니다.)

## 우리가 얻은 결과

전체 디자인 시스템을 생성하는 데 성공하지 못했지만, 완전히 생성된 스타일 라이브러리와 약 30% 정도에 해당하는 자동으로 생성된 구성 요소 집합을 얻었습니다.

이것이 우리에게 무슨 의미를 갖는지 알아보겠습니다.

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

저희 디자인 시스템의 1/3이 이미 100% 동기화되었다는 뜻이에요. 그리고 동기화는 자동으로 이루어지기 때문에, 이 시스템 부분에 대한 디자인 리뷰를 하는 데 리소스를 낭비할 필요가 없어요.

생성된 구성 요소를 향상시키고 다양한 변형을 추가하고, 이후에 그것들을 프론트엔드로 분담해줄 수 있어요. 그것도 단 몇 분 안에!

UI 스타일을 즉석에서 조정할 수 있어요 (색상, 폰트, 모서리 반지름 등).

우리의 Figma 생성기를 계속해서 개선할 수 있으므로, 추가 실험을 위한 기초를 갖추고 있어요.

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

하지만, 무엇보다 중요한 것은 우리(그리고 아마도 여러분도)가 함께 일하고 전문적으로 성장하는 디자이너와 프론트엔드 개발자가 가장 이례적인 작업들을 해결할 수 있다는 것을 확신할 수 있다는 점입니다!

이 게시물에서는 프로세스의 디자이너 부분을 설명했습니다. 곧 다가올 다른 기사에서는 코드 생성의 세부 사항을 읽어보세요!

## 연락처 및 감사의 글

이 흥미로운 내부 프로젝트를 위해 용기와 지원, 독특한 경험 및 이 기사를 작성하는 동안의 지원에 감사드립니다!

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

의견이나 제안이 있으시다면, 게시물에 댓글로 공유해주세요!
