---
title: "Puck가 복잡한 것을 간단하고 유연하게 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Effortless content editing how Puck makes the complexsimple and flexible"
link: "https://medium.com/xaviemirmon/effortless-content-editing-how-puck-makes-the-complex-simple-and-flexible-16cceed3875c"
isUpdated: true
---

지난 몇 년 동안 웹 개발은 전에 없던 속도로 발전해 왔어요. COVID가 기업에 미치는 영향을 직접 목도했고, 영업 전략을 순식간에 적응시켜야 하는 디지털 전략의 필요성을 목격했어요. 한때 번영하던 벽돌과 모르타르 미션들은 순식간에 전환하고 디지턀로 이동해야 했어요. 목표는 고객의 웹 사이트 구축을 용이하게 하여 순식간에 전환할 수 있고 품질을 희생하지 않는 것이 되었죠.

약 5년 전에 SME 및 기업을 위한 이 간극을 메우는 솔루션이 나타나기 시작했어요. 저는 Acquia Site Studio(가장 익숙한), Elementor, Builder.io 및 React Bricks 등이 있어요. 이 모든 솔루션이 멋지고 실행 속도가 놀라울 정도로 빠릅니다(전 직원들이 3개월이 걸렸을 사이트를 10일 만에 구축하기도 했어요). 그러나 이 모든 솔루션에는 중요한 결함이 있다고 보이는데요. 운영을 위해 모두 구독이 필요하고 블랙박스 API를 사용하는데, 이는 비즈니스 리스크 수준을 발생시킵니다.

## Puck가 등장합니다...

2023년 9월, Puck라는 새로운 오픈 소스 프로젝트로 모든 것이 달라졌어요. Puck은 여러분이 첫 번째 컴포넌트를 드래그 앤 드롭 환경으로 가져올 수 있는 react 기반 페이지 빌딩 솔루션이에요. 정말 기존과는 다른 혁신적인 제도입니다!

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

심로의 이 말이 이에 잘 요약했어요.

# Puck 소개

React 앱에 Puck을 추가하면 컨텐츠 편집 가능성이 새롭게 열립니다. 즉시 간단하고 직관적으로 요소를 끌어다 놓고 재배열하고 편집할 수 있는 UI가 제공됩니다. 일관성을 유지하면서 구축된 편집 레이어를 제공합니다. 공학 팀은 다양한 백엔드 시스템을 사용하더라도 유사하게 상호작용하는 UI를 구축할 수 있습니다. 따라서 비 기술 직군은 비즈니스의 백엔드 시스템의 세부 사항을 이해할 필요 없이 한 번 학습하고 적응될 수 있습니다.

Puck은 강력한 JSON 모델을 가지고 있어 다른 콘텐츠 관리 시스템과의 통합이 매우 간단합니다. Puck은 핵심 React 기능과 일급 컴포넌트를 활용하므로 기존 라이브러리와 디자인 시스템을 추가 노력 없이 쉽게 사용할 수 있습니다. 이 방법의 추가 장점은 간편함입니다. 추가적인 API 레이어가 필요하지 않으므로 복잡한 데이터 마이그레이션이 필요하지 않습니다. 필요한 일은 데이터를 React 컴포넌트에 매핑하는 것 뿐입니다.

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

퍽은 사용자 정의 필드 아키텍처, 강력한 플러그인 시스템 및 UI 및 동작을 위한 조합 가능한 방식을 제공합니다. 매우 모듈식이며 사용자 정의 페이지 구축 경험에 쉽게 적응할 수 있습니다. 예를 들어, 디자인 시스템을 구축하기 위해 스토리북의 대안으로 Puck을 사용하는 프로젝트를 이끌고 있습니다.

말이 아닌 행동이 더 중요하다고 하는데, 여기에 간단한 데모가 있습니다.

위 데모에서 Puck의 주요 기능 중 일부를 살펴볼 수 있습니다.

- 페이지 제목 편집
- SEO 제목 계층 구조 경고
- 페이지에 구성 요소를 끌어 생성
- 구성 요소 편집
- 그리드 레이아웃을 끌어 생성
- 변경 사항 발행
- 되돌리기/다시 실행

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

만약 이 글이 귀하의 흥미를 자극했다면, 퍽(Puck)을 이해하기 위해 더 깊이 파고들어볼 가치가 있는 몇 가지 다른 페이지가 있습니다:

## 왜 로우코드인가요?

일부 분들은 아마 묻고 있을지도 모릅니다. 로우코드에 대해 어떤 큰 차이가 있고, 왜 제가 이를 옹호하는 걸까요? 로우코드는 마케터나 CMS 편집자와 같은 비기술적 사용자에게 편집 작업을 더 쉽게 만들어줍니다. 이들에게 웹 사이트 페이지를 빠르게 구축할 수 있는 건설 블록에 접근할 수 있게 합니다.

로우코드 웹사이트 구축은 Squarespace, Wix 및 Weebly와 같은 서비스들이 상당한 유연성을 제공하는 것으로 오랫동안 잘 알려져 있습니다. 그러나 이 개념은 더 큰 규모의 사이트와 플랫폼(SMEs 및 기업을 위한)에서 사용 가능해지는 데 더 오랜 시간이 걸렸습니다. 대규모 기업은 보다 엄격한 지지와 UI 일관성을 필요로 하며, 사전 구축된 디자인 시스템을 사용하거나 특정 브랜딩 가이드라인을 준수합니다. 과제는 귀하의 웹 플랫폼이 비기술적 사용자의 창의력을 억누르지 않으면서도 브랜드의 무결성을 유지할 충분한 유연성을 제공하는지입니다.

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

다른 사람들과 로우코드에 대해 이야기할 때 개발자가 필요 없어지게 되는지 자주 물어보게 됩니다. 저는 거의 반 년 동안 로우코드를 사용해 왔지만, 그동안 로우코드는 혁신적이고 변화를 주지만 개발자가 계속해서 이 로우코드 제품을 만들고 발전시키는 데 매우 필요하다고 말할 수 있습니다. 개발자들이 종종 새로운 영역과 플랫폼 전체에 더 많은 초점을 맞추게 해서 작은 세부 사항에 갇히는 것보다 훨씬 유연하게 제작할 수 있도록 도와줍니다.

## 결론

모듈화/구성 요소 기반 개발 방식으로 전환하면 코드베이스가 더 유연하고 재사용 가능해집니다. 엄격히 정의된 템플릿에서 재사용 가능한 구성 요소를 사용하도록 전환하는 것은 더 효율적이며, 더 많은 코드를 공유하고 재사용할 수 있습니다. 이를 디자인 시스템과 플랫폼으로 확장하면 양적 ROI가 커집니다. 도구의 진입 장벽을 낮추면 팀의 더 많은 구성원이 프로젝트 초기에 참여할 수 있고, 조직은 보다 신속하게 나아갈 수 있습니다.

Puck은 전에는 제공된 적이 없었던 새로운 기회를 제공하여 매우 흥미로운 프로젝트입니다. 이전에 프로젝트에 로우코드를 추가하면 혜택이 있었으나 라이선스 및 데이터 모델에 대한 제한이 있어 많은 기업들에게 결정적으로 좋지 않았습니다.

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

만약 이 내용이 흥미롭고 귀하의 비즈니스에 도움이 된다면, LinkedIn에서 저에게 연락해주세요. 어떻게 도움을 줄 수 있는지 대화를 나누고 싶어요!
