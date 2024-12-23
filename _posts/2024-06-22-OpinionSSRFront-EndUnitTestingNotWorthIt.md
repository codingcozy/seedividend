---
title: "의견 SSR 프론트엔드 유닛 테스트의 가치가 없는 이유"
description: ""
coverImage: "/assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_0.png"
date: 2024-06-22 04:49
ogImage:
  url: /assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_0.png
tag: Tech
originalTitle: "Opinion: SSR Front-End Unit Testing, Not Worth It"
link: "https://medium.com/codex/opinion-ssr-front-end-unit-testing-not-worth-it-ff0132481d8a"
isUpdated: true
---

## 프로덕션에서 개발자들이 직면하는 문제와 해결 방법 강조

안녕하세요! 제 경력 동안 프론트엔드 개발자로 일하면서 테스트가 우선순위인 프로젝트에 참여한 적이 없다는 사실을 알게 되었습니다. 사실, 테스트가 필수적이지는 않았죠.

일반적인 작업 흐름은 기획, 개발, QA, 소유주 확인, 그리고 릴리스로 진행되곤 했습니다. 결과가 항상 100% 버그 없는 것은 아니었지만, 문제는 개발과 크게 상관이 없는 경우가 많았습니다. 즉, 계획 단계에서 사용자의 요구사항을 사전에 고려하지 않았거나 릴리스 이후에 최종 사용자가 특정 기능에 부정적인 피드백을 준 경우였습니다. 어쨌든, 가장 필요한 것은 최고 속도로 지속적인 배포를 보장하는 것이었습니다.

이런 환경에서 우리의 상황은 아마 다음과 같을 것입니다:

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

![OpinionSSRFront-EndUnitTestingNotWorthIt](/assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_0.png)

# 요약

먼저, 문서에서 나온 프론트엔드 단위 테스트는 쓸모없고, 많은 비용이 들면서 아무것도 알려주지 않는다는 문제를 강조합니다. 그런 다음, 실제로 우리가 생산 중에 직면한 문제들은 우리가 원하는대로 렌더링되지 않거나, 우리가 원하는 방식으로 렌더링되지 않는 것이었습니다. 따라서, 실제 문제에 어떻게 대처할 수 있는 지를 제안하였는데, 그것은 간단한 if문일 것입니다. 마지막에, '나쁜 것'을 개선하는 방법과 제안된 해결책의 '추악한 점'을 개선하는 방법을 논의합니다. 거의 비전적인 개선 사항으로 글을 마무리합니다.

# 면책조항

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

아래에 있는 내용이 모두 해당되지 않을 수 있지만, FAANG-tier 레거시 프로젝트와 같은 경우 상품 카드가 여러 가지 상태를 가진 프로토타입 디자인 시스템 또는 백엔드가 아닌 프런트엔드에 매우 복잡한 비즈니스 로직을 가진 경우를 제외하고, 저는 꼭 확인하거나 여러분이 아는 프런트엔드 개발자와 공유하길 강력히 권장합니다.

# 문제

솔직히 말해서, useRef()에 대해서는 문서가 꽤 확장되었지만, 이 개념에 완전히 동의합니다. 모든 문서 조각을 보면(특히 React에서), 많은 '하면 안 되는 일'과 충분한 '해야 하는 일'이 없다는 생각이 듭니다. 똑같이 프런트엔드 테스팅 예제에 대해서도 마찬가지입니다. 그들이 보여주는 것은 컴포넌트 렌더링 여부를 확인하는 것뿐인 "안녕, 세계" 수준의 테스트일 뿐입니다.

이로 인해 우리는 토론의 핵심으로 도달했습니다. 프런트엔드 앱에서 무엇을 테스트해야 할까요? 더 구체적으로 말하면, SSR Gatsby 웹사이트에서는 무엇을 테스트해야 할까요? 백엔드가 없지만 Storyblok CMS와 Bitbucket의 CI/CD를 가진 경우 빌드가 실패하면 배포가 방지되는 상황에서요.

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

기술 슈퍼바이저가 나에게 일반적으로 요구하는 것은 유닛 테스트였어요. 왜냐하면 그것들이 가장 “인기가 많고” “관리하기 쉽다”고 생각하기 때문이에요. 이 아이디어의 핵심은 당신이 개발하고 컴포넌트를 독립적으로 테스트하고, 그것이 정상적으로 작동하고 올바르게 동작하는지 확인하는 것이에요. 하지만 프런트엔드 유닛 테스트는 우리에게 무엇을 보여줄까요? 공식 문서와 몇 가지 관련 기사를 살펴보도록 하죠.

# React에서 테스트에 대해 전문가들은 무엇을 말하나요?

## React 문서 (테스팅 개요 — 테스팅 섹션은 오직 레거시 문서만 포함됨):

- 컴포넌트 트리 렌더링
- 완전한 앱 렌더링

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

## Jest 문서

- 스냅샷 테스트
- DOM 테스트

## React 테스트 레시피 (이전 문서만)

- 렌더링
- 데이터 가져오기
- 모듈 모의
- 이벤트
- 타이머
- 스냅샷 테스트

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

요약하면, FreeCodeCamp의 "리액트에서 유닛 테스트 작성 방법"이라는 기사는 테스트를 다음과 같은 카테고리로 나누어 내는 뛰어난 일을 해냅니다:

- 컴포넌트가 props와 함께 렌더링되는지 여부
- 컴포넌트가 상태 변경과 함께 어떻게 렌더링되는지
- 컴포넌트가 사용자 상호작용에 어떻게 반응하는지

이 시점에서 저는 이 기사를 읽기 전에도 거의 동일한 분류를 구성하고 있었기 때문에 진짜 궁금증이 생겼습니다. 우리는 다음을 확인하려고 노력하고 있기 때문입니다:

- 컴포넌트가 렌더링되는지 여부
- 컴포넌트가 영향을 받는지 여부
- 컴포넌트가 상호작용 가능한지 여부

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

![OpinionSSRFront-EndUnitTestingNotWorthIt_1.png](/assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_1.png)

나는 각 시나리오에서 완전히 헷갈려 하고 있다. 어쩌면, 너무 복잡하고 오버로드된 앱들에서는 개발 중에 적어도 하나의 질문에 대답할 수 없을지도 모르지만 나는 localhost에서 이러한 질문 중 어느 하나에도 갇히지 않아서 운이 좋은 편이다. 그래서, 중요한 것에 대답하지 못하는 단위 테스트가 왜 필요한지 묻고 싶다. 내 현재 프로젝트를 살펴보고 무엇을 확인하는 데 유용할지 찾아보자.

# 실제로 생산에서 어떤 문제가 발생하나요?

위에서 언급한 대로, 문서에 실제 시나리오가 있었으면 좋겠지만, 그럴 만한 것이 없다면 웹사이트에서 만난 문제들을 분류해보려 한다.

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

## 컴포넌트가 필요한 일부 props을 받지 못하고 렌더링됩니다.

- 세부 정보: 예를 들어, 우리가 타이틀 필드를 가진 HeroSection.tsx를 가지고 있으며, 이 컴포넌트에는 수직 여백이 몇 개 있습니다. CMS에서 아무 것도 오지 않아도 프로젝트가 크래시되지 않습니다.
- 결과: 텍스트 없이 여백이 렌더링됩니다.
- 영향: 사용자 경험이 나빠지며, 보기 좋지 않습니다.

## 컴포넌트가 필요한 props을 받지 못하고 빌드가 충돌합니다.

- 세부 정보: 상품명과 가격이 있는 항목을 기대하면서, 어떤 확인도 없이 (조건부 체이닝조차 없이!) 단순히 items.map()을 사용합니다.
- 결과: 빌드가 파이프라인에서 충돌하고, 프로덕션에서 아무 변화도 없습니다.
- 영향: 나쁜 개발 경험, 기능 배송이 느려집니다.

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

에러가 발생하면 "RENDERED vs. NOT RENDERED" 범주 내에 해당하는 문제에 직면하게 될 수 있어요. 상태 변경이나 사용자 조작에 응답하지 않는 것을 배포한 적이 없다는 건 저에게는 생각조차 해본 적이 없었어요. 만약 이와 같은 것을 개발하고 QA가 이를 식별하지 못한다면, 아마도 테스트도 도움이 되지 않을 것이고 이 글도 솔직히 도움이 되지 않을 겁니다. 하지만, 아주 복잡한 마이크로 프론트엔드 구성요소가 설계 키트 없이 연결돼 있는 경우...

![2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_2.png](/assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_2.png)

# 어떻게 실제 문제에 대처할 수 있을까요?

사람들이 처음으로 제안하는 것은 "단위 테스트를 작성하세요!"라고 말하는 것인데, 음... 아닙니다.

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

여기에는 "아니요"에 대한 몇 가지 층이 있어요:

## 개발 속도가 두 배 이상 느려집니다. 문서의 공식 예제를 한 번 더 살펴보세요.

- 구성요소 8줄 vs 테스트 30줄 Testing Recipes — React
- 구성요소 24줄 vs 테스트 18줄 Testing React Apps · Jest

## Storyblok 데이터 구조를 모의하는 것이 정말 어려워요.

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

- CMS에서 많이 사용되는 richtext입니다. 게다가 Storyblok의 rich text를 역공학하여 성공하더라도 즉시 긴밀하게 결합된 레거시가됩니다. 이 span의 피라미드는 외부에서 업데이트 할 때마다 깨질 수도 있습니다. 또는 다른 방식을 채택한 다른 CMS로 이동할 수도 있습니다.
- 내부 및 "중첩" 루트가 있는 외부의 링크, 일반 URL이 있는 외부의 링크, 2가지 매우 다른 구조를 테스트하기 위해 가장하는 것입니다. 우리가 받는 것을 알 수 없기 때문에.
- 파일 및 이미지와 같은 에셋. 예를 들어 .svg. 이상적인 항목이지만 .png의 사용량 감소와 테스트의 구식화 문제를 줄이려고 일주일에 한 번 디자인 리뷰를 할 수 있습니다.

## 그리고 가장 중요한 것

하나의 컴포넌트에 "필요한" props로 테스트를 통과시키고 props 없이 실패한다는 것은 본질적으로 아무 것도 해결하지 않습니다. 우리는 페이지를위한 템플릿을 개발하기 때문에 가능한 한 재사용 가능해야하며 모든 props을 필수로 만드는 것은 유연성을 깨뜨리게 될 것입니다.

다행히도 "RENDERED vs. NOT RENDERED" 이분법에 접근할 "저렴한" 방법이 있습니다. 모든 컴포넌트에 "필수" props을 검사하는 if 문만 있으면 됩니다.

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

![이미지](/assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_3.png)

만약 CMS에서 무언가를 기대하고 있지만 컴포넌트가 전혀 렌더링되지 않길 원한다면, null을 반환하면 됩니다. 이것은 말 그대로 빙산의 일각에 불과합니다.

## if 문장만으로 충분할까요?

이미 반복된 느낌일 수 있지만, 사실 "아니요". 이번에는 "아니지만 충분합니다."

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

그러면 결과에 대해 알아봅시다:

## 장점

- 실제 유닛 테스트보다 "가장 체"하고 훨씬 간결합니다.
- 일부 이상하게 보이는 컴포넌트를 렌더링하지 않습니다. (그리고 CSS 접근 방식에 따라 공백도 표시되지 않을 수도 있습니다.)

## 단점

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

- 서투르고 반복적인 부분이 있습니다.
- 모든 구성 요소가 아닌지 확인할 수 없습니다. (이것에 대해 생각해 보세요!)

## 문제점

- 컴포넌트가 렌더링되지 않을 때, 그것이 괜찮은지 아닌지 말할 기회가 없습니다. 예를 들어, 콘텐츠 작성자가 버튼 레이블을 빠뜨린 경우 컴포넌트가 사라지고 전체적인 모습은 괜찮아 보일 수 있지만 페이지의 일부가 없으며 5개 언어로 번역된 수십 개의 페이지에 대해 사이트 전반적으로 디버깅할 수 없습니다. 하지만, 유닛 테스트에서도 정확히 같은 상황이 발생합니다!

# 문제를 개선하는 방법

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

## DRY 원칙 적용

DRY(Don't Repeat Yourself) 원칙부터 적용해보겠습니다. 재사용이 가능하도록 함수를 작성해야 합니다. 함수는 다음과 같은 작업을 수행해야 합니다:

- 우리가 전달하는 속성들이 무엇이고 그 수가 몇 개인지 예측할 수 없으므로 객체 기반으로 일반화되어야 합니다.
- 각 필드 값에 대해 반복합니다.
- 이러한 값들이 모두 허용 가능한지 확인합니다. 가능한 데이터 구조를 예측하지 못할 경우 업데이트해야 할 수도 있습니다.
- 값 중 일부가 “필수” 기준을 충족하지 못하는 경우 false를 반환합니다.
- 모든 필드/속성이 "채워져" 있다면 true를 반환합니다.

제 구현은 아마도 다음과 같을 것입니다:

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

<img src="/assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_4.png" />

배열 확인을 더 자세히 살펴보세요. 이미지와 Storyblok 유형에 대해서는 if 문을 확장해야 할 필요가 있겠지만, 방향은 명확해야 합니다. 개발 환경에서 컴포넌트 이름을 두 번째 매개변수로 전달하고 부족한 필드 이름을 로깅하여 컴포넌트 이름별로 그룹화하는 방법으로 더 개선할 수 있지만, 지금은 간단하게 유지하는 것을 선호합니다.

이제 우리는 모든 컴포넌트에 쉽고 일관된 if 문을 갖게 됩니다:

<img src="/assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_5.png" />

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

# 만약 팀이 이를 무시한다면?

이를 실제로 사용할 수 있도록 하기 위해, 우리는 마침내 의미있는 테스트가 필요합니다. 나는 jest.spyOn(object, methodName)을 사용하는 것을 제안합니다. 테스트 구현은 필요하지 않지만, 모든 컴포넌트에서 해당 메소드가 호출되었는지 확인해야 합니다.

# UGLY를 개선하는 방법들

모든 것이 올바르게 처리되면, CMS로부터 "필수" 필드가 부족한 컴포넌트를 렌더링하지 않는 설정이 있습니다. 하지만 유연성이 필요한 몇몇 컴포넌트와 일반 CMS의 유연성 때문에 이러한 "필수" 필드를 누락할 수 있으며 결과적으로 페이지에 컴포넌트가 없을 수 있습니다. 모든 것이 작동하나, 요금제가 없는 요금 페이지는 많은 의미가 없습니다. 특히 수십 개의 페이지와 5개 국가 언어에 대한 로컬라이제이션을 진행하는 다른 부서들이 작업 중인 상황에서는 상황이 더욱 복잡해집니다.

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

내가 제안하는 해결책은 뛌륭하진 않지만, 각 구성요소에 대해 if 문과 똑같이 작동합니다. 메커니즘은 다음과 같이 동작합니다:

- onCreatePage() 사이클 동안 Storyblok에서 오는 모든 필드를 확인합니다.
- 각 필드가 비어 있는지 확인하고 "filled" 및 "empty" 값으로 결과를 객체에 저장합니다.
- 페이지 별로 필터링할 수 있는 간단한 디버그 페이지를 만들고 "all" 및 "empty" 값으로 전환할 수 있는 기능을 추가합니다.

이 메커니즘을 구현하는 것이 너무 복잡하기 때문에 이 디버거의 CLI 버전만 쇼케이스하겠습니다:

![디버거 CLI 버전](/assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_6.png)

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

이제 내용 작성자들은 무엇이 빠졌는지 명확히 알아보고 그것이 우연히 빠진 것인지 확인할 수 있습니다. 그런 다음 필요하다면 Storyblok에 가서 해당 필드를 수정하면 됩니다.

![이미지](/assets/img/2024-06-22-OpinionSSRFront-EndUnitTestingNotWorthIt_7.png)

결론  
여기까지 읽어 주셔서 감사합니다! 프론트엔드에 대한 무분별한 유닛 테스트가 좋지 않다는 것을 설득하지는 못했더라도 적어도 SSR 생성 웹사이트의 테스트 접근 방식을 고민해 볼 수 있기를 바랍니다.

다음 단계를 생각해보면 디버거를 자동화해 보고 싶습니다. 최신 빌드 이후 "비어 있는" 필드가 되어버린 콘텐츠 변경을 기업의 슬랙 채널에 보고하는 차이 시스템을 설정해야 합니다. 이상적으로는 CMS의 마지막으로 게시된 페이지에 대한 보고서를 생성하여 해당 페이지의 비어 있는 필드를 강조해야 합니다.

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

위 내용을 공유하고 다시 게시해주세요. 전면 테스트에 대한 나의 비전통적인 접근에 대한 비평과 토론을 환영합니다. 그리고 절대 잊지 말아 주세요. 당신이 하는 모든 것은 어떤 의미가 있어야 합니다. "최상의 사례"를 따르는 것이 허용되지 않습니다. 그것이 전면 응용 프로그램의 단위 테스트인 경우에 특히 그렇습니다.

# 솔직하게 설명하자면 🚀

Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 저자를 박수하고 팔로우하는 것을 잊지 마세요! ️👏️️
- 저희를 팔로우하세요: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 확인하세요
