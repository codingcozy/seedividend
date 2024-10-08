---
title: "타입스크립트 세금"
description: ""
coverImage: "/assets/img/2024-06-20-TheTypeScriptTax_0.png"
date: 2024-06-20 02:30
ogImage:
  url: /assets/img/2024-06-20-TheTypeScriptTax_0.png
tag: Tech
originalTitle: "The TypeScript Tax"
link: "https://medium.com/javascript-scene/the-typescript-tax-132ff4cb175b"
isUpdated: true
---

## 비용 대 수익 분석

![이미지](/assets/img/2024-06-20-TheTypeScriptTax_0.png)

TypeScript는 2017년부터 2019년까지 크게 성장했으며 여러 가지 면에서 그렇게 한 것이 타당합니다. TypeScript를 애용하는 이유가 많습니다. 2018년 JavaScript의 상태 조사에서 응답자의 거의 절반은 TypeScript를 시도해보고 다시 사용할 의향이 있다고 말했습니다. 그러나 대규모 앱 개발 프로젝트에 사용해야 할까요?

본 문서는 TypeScript를 사용하여 대규모 애플리케이션을 구축하는 데의 투자 수익률(ROI)을 분석하기 위해 좀 더 비판적이고 데이터 중심의 방식을 취합니다.

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

# TypeScript 성장

TypeScript는 가장 빠르게 성장하는 언어 중 하나이며 현재는 JavaScript로 컴파일하는 언어 중 선두를 유지하고 있어요.

![TheTypeScriptTax_1](/assets/img/2024-06-20-TheTypeScriptTax_1.png)

![TheTypeScriptTax_2](/assets/img/2024-06-20-TheTypeScriptTax_2.png)

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

이 높은 추세는 무시해서는 안 될만큼 인상적하지만, 전체적인 JavaScript 생태계를 지배하고 있는 것으로는 아직까지 거리가 멀어요. 이것은 훨씬 더 큰 바다 속에서 큰 물결과 같다고 말할 수 있을 것 같아요.

![이미지1](/assets/img/2024-06-20-TheTypeScriptTax_3.png)

![이미지2](/assets/img/2024-06-20-TheTypeScriptTax_4.png)

그렇지만, TypeScript는 2018년에 전환점에 다다르고, 2019년에 많은 제작 프로젝트들이 사용할 것으로 예상됩니다. JavaScript 개발자로서, 선택의 여지가 없을 수도 있어요. TypeScript 결정은 당신 대신에 이뤄질 것이며, 배우고 사용하는 데 두려워하지 말아야 해요.

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

그러나 그것을 사용할지 여부를 결정하는 위치에 있다면, 혜택과 비용에 대한 현실적인 이해가 필요합니다. 그것이 긍정적인 영향을 줄까요, 부정적인 영향을 줄까요?

내 경험 상, 둘 다 가지고 있지만 긍정적인 ROI에 미치지 못합니다. 많은 개발자들이 TypeScript를 좋아하며, TypeScript 개발 경험의 여러 측면을 진심으로 즐기는 부분이 많습니다. 그러나 이 모든 것에는 비용이 따릅니다.

# 배경

저는 C/C++ 및 Java와 같은 정적 타입 언어를 사용하는 배경을 가지고 있습니다. JavaScript의 동적 타입은 처음에는 적응하기 어려웠지만, 익숙해지면 긴 어두운 터널을 벗어나 빛 안으로 들어온 것처럼 느껴졌습니다. 정적 타입에 대해 좋아할 점이 많지만, 동적 타입에 대해서도 많이 좋아합니다.

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

지난 몇 년 동안, TypeScript에 전적으로 몰두하다가 경험을 쌓아왔습니다. TypeScript를 사용하여 대규모 프로덕션 팀을 이끌며 TypeScript의 다양한 프로젝트에 대한 영향과 비교를 볼 수 있었습니다.

2018년에는 탈중앙화 애플리케이션이 부상했고 대부분의 경우 스마트 계약과 오픈 소스 소프트웨어를 사용하게 되었습니다. 가치 있는 인터넷을 다룰 때 버그는 사용자에게 비용을 치르게 할 수 있습니다. 신뢰할 수 있는 코드를 작성하는 것이 더 중요해졌고, 이러한 프로젝트들이 일반적으로 오픈 소스로 공개되어 있기 때문에 TypeScript로 코드를 개발하여 다른 TypeScript 팀이 통합하기 쉽도록 만든 것이 좋다고 생각했습니다. 동시에 JavaScript를 사용하는 프로젝트와의 호환성도 유지되었습니다.

최근 TypeScript에 대한 이해도가 깊어졌습니다. TypeScript의 장단점을 보다 명확하게 파악했습니다. 제 기대와는 달리 성공적이지 못했다는 점이 안타깝지만, 향후 TypeScript를 큰 규모 프로젝트에 선택하지 않을 것입니다.

## TypeScript에 대한 저의 애정한 점

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

저는 TypeScript에 대해 여전히 장기적으로 긍정적인 마음을 갖고 있습니다. TypeScript를 좋아하고 있으며, 아직도 TypeScript에 대해 많이 사랑하는 부분이 많습니다. TypeScript 개발자와 지지자들이 이 글을 적극적인 비판으로 보는 것이 아니라 적대적인 비난으로 받아들이지 않기를 바랍니다. TypeScript 개발자들은 몇 가지 문제를 해결할 수 있고, 그들이 그렇게 한다면 ROI 분석을 반복해 다른 결과에 도달할 수도 있습니다.

정적 타입은 함수를 문서화하고 사용 방법을 명확히 하며 인식적 부담을 줄이는 데 매우 유용할 수 있습니다. 예를 들어, Haskell의 타입은 보통 도움이 되고 비용 효율적이며 무해하며 방해되지 않는다고 생각합니다. 그러나 때로는 Haskell의 유연한 하이어캌드 타입 시스템조차 방해가 되기도 합니다. Haskell (또는 TypeScript)에서 변환자를 타이핑해 보세요. 쉽지 않고 아마도 무타입 등가물 보다 조금 더 어려울 것입니다.

TypeScript에서 타입 어노테이션은 방해되는 경우 선택 사항으로 사용될 수 있다는 것을 좋아하고 있으며, TypeScript가 구조적 타이핑을 사용하고 타입 추론을 일부 지원한다는 점을 사랑합니다 (추론에 대한 개선 여지가 많이 있지만).

TypeScript는 사용자 정의 타입을 지원하는데, 이는 재사용 가능한(인라인이 아닌) 타입이며 다양한 방식으로 API와 함수 시그니처를 주석 처리하는데 적용할 수 있는 것입니다. 하나의 인터페이스에는 많은 구현체가 있을 수 있습니다. 인터페이스는 TypeScript의 가장 좋은 기능 중 하나이며, 이 기능이 JavaScript에 내장되어 있는 것을 바라곤 합니다.

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

가장 좋은 뉴스: Atom이나 Visual Studio Code와 같은 잘 지원되는 편집기를 사용한다면, 내 의견으로는 TypeScript의 편집기 플러그인은 자바스크립트 생태계에서 최고의 IDE 개발자 경험을 제공합니다. 다른 플러그인 개발자들은 이를 시도하고 개선 방법에 대해 메모해 보아야 합니다.

# 숫자로 보는 TypeScript의 ROI

대규모 응용 프로그램에 적합한지 여부를 보다 잘 이해하기 위해 몇 가지 차원에서 TypeScript를 -10부터 10까지의 척도로 평가할 것입니다.

0보다 큰 수는 긍정적인 영향을 나타냅니다. 0보다 작은 수는 부정적인 영향을 나타냅니다. 3-5점은 상대적으로 강한 영향을 나타내며, 2점은 중간 영향을 나타냅니다. 1점은 비교적 낮은 영향을 나타냅니다.

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

이 숫자들은 정확하게 측정하기 어려우며 다소 주관적일 수 있지만, 실제 프로젝트에서 관찰된 비용 및 보상을 반영하기 위해 최선을 다한 것으로 추정했습니다.

영향력이 평가된 모든 프로젝트는 `50k LOC`이며, 여러 명의 협업자가 여러 달 동안 작업한 프로젝트입니다. 하나의 프로젝트는 Angular 2 + TypeScript로 작성된 프로젝트로, 기존 JavaScript를 사용한 Angular 1로 작성된 유사한 프로젝트와 비교되었습니다. 다른 모든 프로젝트는 React와 Node로 작성되었으며, 일반 JavaScript로 작성된 React/Node 프로젝트와 비교되었습니다. 주관적인 버그 발생률, 상대적인 속도, 개발자 피드백은 추정되었지만 정확하게 측정되지 않았습니다. 모든 팀에는 경험 많은 TypeScript 개발자와 신입 TypeScript 개발자가 혼합되어 있었으며, 모든 팀원은 TypeScript 온보딩을 돕기 위해 더 경험 많은 멘토에게 접근할 수 있었습니다.

작은 샘플링된 프로젝트의 객관적 데이터는 신뢰할 수 있는 오차 범위 내에서 명확한 객관적 판단을 내리기 어려웠습니다. 하나의 프로젝트에서 원시 JavaScript는 TypeScript보다 41% 낮은 공개 버그 발생률을 보여주었습니다. 다른 한 프로젝트에서는 TypeScript 프로젝트가 해당 네이티브 JavaScript 버전보다 4% 낮은 버그 발생률을 보여주었습니다. 분명히 다른 품질 측정 항목들의 구현(또는 부재)이 TypeScript보다 훨씬 강력한 영향을 미쳐 사용성을 뛰어넘는 수치를 왜곡시켰습니다.

오차 범위가 너무 넓어서 객관적인 양적 측정을 포기하고 대신 기능 전달 속도 및 시간 사용 내역에 초점을 맞추었습니다. ROI를 점별로 상세하게 분석한 내용을 확인하실 수 있습니다.

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

주관적인 요소가 많기 때문에 해석의 여지에 오차를 허용해야 합니다(차트에 표현됨), 하지만 전체적인 ROI(투자수익률) 균형은 예상할 수 있는 것을 잘 보여줄 것입니다.

이 작은 혜택 점수들에 대한 피너쥐 의견 반박을 이미 듣고 있네요, 그러나 전적으로 그 주장에 동의하지는 않습니다. TypeScript는 매우 유용하고 강력한 기능을 제공합니다. 그 부분에 대해서는 의문의 여지가 없습니다.

작은 혜택 점수를 이해하기 위해서 TypeScript와 비교할 때 무엇을 고려해야 하는지 잘 알아야 합니다: JavaScript만이 아니라 JavaScript와 함께 사용되는 원시 JavaScript용 도구들까지를 비교하는 것입니다.

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

자세히 살펴보겠습니다.

개발 도구: TypeScript의 내가 가장 좋아하는 기능 중 하나이자 아마도 TypeScript를 사용하는 가장 강력한 현실적인 혜택은 TypeScript가 인터페이스 유형 힌트를 제공하고 프로그래밍 중에 잠재적인 오류를 실시간으로 잡아내어 개발자의 인지 부하를 줄여준다는 점입니다. 일부 좋은 플러그인과 함께 원시 JavaScript에서 그것들 중 하나도 가능하지 않았다면 TypeScript에 더 많은 혜택을 주겠지만, JavaScript를 사용하는 것만으로도 가능한 기능은 0 점이며, 시작점이 이미 꽤 좋은 편입니다.

대부분의 TypeScript 지지자들은 TypeScript가 무엇과 경쟁하는지 제대로 이해하지 못하는 것 같습니다. 개발 도구 선택은 TypeScript vs 원시 JavaScript와 도구 없음이 아니라 TypeScript와 전체적인 JavaScript 개발 도구 생태계 전체의 비교입니다. 원시 JavaScript 자동완성 및 오류 감지는 자동완성, 유형 추론 및 린트 도구를 사용할 때 TypeScript의 혜택의 80% - 90%를 제공합니다. 유형 추론을 실행하고 ES6 기본 매개변수를 사용할 때는 TypeScript 코드와 같이 유형 힌트를 얻습니다.

![이미지](/assets/img/2024-06-20-TheTypeScriptTax_6.png)

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

공정하게 말하자면, TypeScript 코드의 주석을 제공하기 위해 기본 매개변수를 사용하면 TypeScript 코드에 대한 주석을 제공할 필요가 없게 됩니다. 이는 TypeScript를 사용하는 데 발생하는 오버헤드 중 하나인 타입 구문 부담을 줄이는 훌륭한 방법입니다.

TypeScript의 이러한 기능에 대한 도구는 아마도 조금 더 나은데, 모든 것이 한 곳에 모아져 있습니다. 하지만 이것만으로는 비용을 합당화할만큼 충분하지는 않습니다.

API 문서: TypeScript의 또 다른 큰 장점은 항상 소스 코드와 동기화되는 API에 대한 더 나은 문서입니다. TypeScript 코드에서 심지어 API 문서를 생성할 수도 있습니다. 이는 JSDoc와 Tern.js를 JavaScript에서 사용하여 동일한 이점을 얻을 수 있으며, 문서 생성기가 풍부합니다. 개인적으로 JSDoc를 좋아하지는 않지만, TypeScript는 여기서 몇 가지 우위성을 얻습니다.

실제로 최고의 인라인 문서 작성이 있어도 여전히 실제 문서가 필요하므로, TypeScript는 기존 문서 옵션을 대체하는 것이 아니라 더 나은 옵션을 제공합니다.

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

리팩터링. 대부분의 경우에 TypeScript를 사용하여 리팩터링에서 상당한 이점을 얻을 수 있다면, 당신의 코드가 너무 강하게 결합되어 있다는 것을 나타내는 코드 스멜일 가능성이 높습니다. 저는 더 많은 조립 가능하고, 더 튼튼하게 결합되지 않은 코드를 작성하는 방법에 대해 전체적인 책을 썼습니다. “Composing Software” 라는 책입니다. TypeScript가 당신에게 많은 리팩터링 고통을 덜어 주고 있다면, 강하게 결합된 것이 여전히 피할 수 있는 다른 문제들을 많이 유발하고 있는 가능성이 높습니다. 반드시 그 책을 읽을 것을 적극 추천합니다, 특히 “Mocking is a Code Smell“이라는 챕터는 강하게 결합된 원인과 그것을 피하는 데 도움이 되는 여러 가지 모범 사례들에 대해 많은 정보를 제공합니다.

반면에, 일부 기업은 매우 큰 생태계를 운영하며 연결된 프로젝트들이 동일한 코드 저장소를 공유하고 있는 경우가 있습니다 (예: Google의 유명한 monorepo). TypeScript를 사용하면 그들은 API 디자인 선택들을 업그레이드하여 더 나은 디자인 및 새로운 사용 사례를 고려할 수 있습니다. 해당 업그레이드 담당자들은 또한 그들의 라이브러리 변경이 monorepo에 의존하는 소프트웨어 중 어느 것도 깨뜨리지 않도록 확인하는 책임이 있습니다. TypeScript는 이 매우 제한된 TypeScript 사용자 하위 집합에게 상당한 시간 절약 기회를 제공할 수 있습니다.

나는 매우 제한된 하위 집합이라고 말하는데, 거대하고 폐쇄적인 monorepo 생태계는 규칙보다는 예외입니다. 이 프로세스는 Google에서 규모가 있을 수 있지만, 라이브러리 작성자가 인식하지 못하는 저장소에는 규모가 불가능합니다. 더 넓은 생태계에서 라이브러리 API에 파괴적인 변경을 가하는 것은 알지 못하는 코드를 깨뜨릴 수 있습니다.

전통적인, 더 분산화된 라이브러리 생태계에서, 사람들은 API에 파괴적인 변경을 피하고 대신 확장에 대한 Open/Close 원칙을 따르며 새로운 기능들을 만듭니다(API는 확장을 위해 열려 있고, 파괴적인 변경에 대해서는 닫혀 있습니다). 이것이 대부분의 경우 웹 플랫폼이 어떻게 발전해 왔는지를 보여줍니다, 몇 가지 예외를 제외하고요. 이것이 React가 여전히 React 0.14 이후로 더 좋은 옵션들로 대체되었음에도 지원하는 기능들을 유지하는 이유입니다. React는 계속 발전하고 훌륭한 새로운 기능들을 추가하여 개발 경험을 급격하게 개선하지만, 예를 들어 class components는 매우 개선된 React Hooks API가 확립 된 후에도 React에서 지원될 것입니다.

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

생태계 전체에 변경을 가하는 것을 필수로 하는 대신 선택 사항으로 만들어줍니다. 팀은 전체 생태계 코드 변경 프로젝트를 라이브러리 팀에게 부담 주지 않고 필요에 따라 소프트웨어를 점진적으로 업그레이드할 수 있습니다.

전체 생태계 코드 변경이 필요한 경우에도 유형 추론 및 자동 코드 변환 도구를 활용할 수 있어요. TypeScript가 필요하지 않습니다.

처음에는 리팩터링에 대한 스코어를 0으로 잡고 목록에서 제외했으나 제가 열린/닫힌 접근 방식, 추론 및 코드 변환 방식을 강력하게 선호하기 때문입니다. 그러나 일부 팀은 특정한 상황 하에서 실제 혜택을 누리고 있습니다.

네이티브 JavaScript를 사용하는 다른 방식이 더 나을 수 있습니다.

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

타입 안전성은 큰 차이를 만들지 않는 것 같아요. TypeScript 지지자들은 자주 타입 안전성의 이점을 언급하지만, 실제로 타입 안전성이 제작 단계에서의 버그 밀도에 큰 영향을 주지 않는 것으로 나타났어요. (2022 연구에 따르면 TypeScript가 버그 감소에 큰 영향을 미치지 않는 증거가 더 많습니다). 이것은 코드 검토와 TDD가 (특히 TDD만으로 40% ~ 80%의 차이를 만들어냅니다) 매우 큰 영향을 미칩니다. 디자인 리뷰, 사양 리뷰, 코드 리뷰와 TDD를 결합하면 버그 밀도가 90% 이상 감소할 수 있어요. 이러한 프로세스의 많은 부분 (특히 TDD)은 TypeScript가 잡는 버그와 같은 종류의 모든 버그를 잡아내는 데 도움이 되며, TypeScript가 잡을 수 없는 많은 버그도 잡아낼 수 있어요.

TypeScript는 "공개 버그"의 약 20% 정도를 다룰 수밖에 없는데, 공개란 버그가 구현 단계를 넘어서 공개 저장소에 커밋된 상태를 의미합니다. 이 정보는 영국 대학 (University College London)의 Zheng Gao와 Earl T. Barr, 그리고 Microsoft Research의 Christian Bird에 따라요.

이 연구의 저자들은 TypeScript의 영향을 과소평가했다고 생각하는데, 다른 품질 측정이 이미 적용된 것으로 가정했지만 다른 버그 방지 조치의 품질을 판단하는 노력을 하지 않았어요. 이를 인정했지만 계산에서 전혀 고려하지 않았답니다.

내 경험상 대부분의 팀은 일부 조치를 부분적으로 적용하지만 모든 중요한 버그 방지 조치를 충분히 적용하지 않아요. 우리 팀에서는 디자인 리뷰, 사양 리뷰, TDD, 코드 리뷰, 린트, 스키마 유효성 검사 및 회사에서 지원하는 지도를 활용해 버그 밀도에 뚜렷한 영향을 미치며, 타입 오류를 거의 제로로 줄일 수 있어요.

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

내 경험상 린팅을 제외한 모든 것이 정적 타입보다 코드 품질에 더 큰 영향을 미칩니다. 다시 말해, 나는 논문의 저자들보다 훨씬 엄격한 '제로' 정의에서 시작하고 있어요.

만약 다른 버그 예방 조치를 제대로 구현하지 않았다면, TypeScript만 사용해서 버그 밀도를 15%에서 18% 줄일 수 있을 거라는 확신은 있지만, 제품이 출시되어 현실적인 문제를 일으키기 시작할 때까지 80%의 버그를 완전히 감지하지 못할 거에요.

TypeScript가 실시간 버그 피드백을 제공한다는 주장도 있겠지만, 타입 추론, 린트 및 TDD도 마찬가지로 버그를 더 일찍 잡을 수 있어요 (파일 저장 시에 유닛 테스트를 실행하는 watch 스크립트를 설정했기 때문에 거의 즉시 풍부한 피드백을 받아요). 이러한 다른 조치들이 비용이 든다는 이야기를 할 수 있지만, TypeScript가 항상 버그 80%를 놓치기 때문에 당연히 이런 조치들을 건너뛸 수 없으니, 비용은 ROI 수학의 양쪽에 적용되며 이미 고려되어 있어요.

이 연구는 사전에 알려진 버그를 살펴보았고, 해당 버그를 수정하는 데 변경된 정확한 코드 라인도 포함되어 있었어요. 즉, 문제와 잠재적인 해결책이 타입 도입 전에 알려진 상태였습니다. 이는 사전에 해당 버그가 존재함을 알고 있더라도 TypeScript가 공개된 버그 중 85%를 검출하지 못했다는 것을 의미하며, 15%만 잡아냈다는 것을 나타냅니다.

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

왜 TypeScript로는 많은 버그를 감지할 수 없을까요? 우선, GitHub에서 연구된 공개 분류된 버그 중 약 78%가 사양 오류로 인한 것이었습니다. 행동을 올바르게 지정하지 않거나 사양을 올바르게 구현하지 못한 실패는 가장 흔한 버그 유형이며, 이 사실은 TypeScript로 감지하거나 예방할 수 있는 대다수의 버그를 자동으로 불가능하게 만듭니다. "To Type or Not to Type"에서 연구 저자들은 "ts-undetectable" 버그 범주를 식별하고 분류했습니다.

위의 "StringError"는 문자열이 올바른 유형인데도 잘못된 값(예: 잘못된 URL)을 포함한 오류의 분류입니다. 브랜치 오류와 술어 오류는 잘못된 코드 경로를 사용하게 만드는 논리 오류입니다. TypeScript가 다뤄야 할 수 없는 다양한 기타 오류가 있음을 볼 수 있습니다. TypeScript가 버그의 20% 이상을 감지할 수 있을 가능성은 적습니다.

하지만 20%는 꽤 많이 들리죠! TypeScript가 왜 더 높은 버그 예방 점수를 얻지 못할까요?

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

정적 유형으로 감지할 수 없는 많은 버그가 있기 때문에 디자인 검토, 명세 검토, 코드 검토 및 TDD와 같은 기타 품질 관리 수단을 건너 뛰는 것은 책임감이 없을 수 있습니다. 따라서 TypeScript가 버그를 방지하는 데 사용되는 유일한 도구일 것으로 가정하는 것은 공정하지 않습니다. 실제 ROI를 파악하려면 연구 저자들이 충분히 고려하지 않은 다른 수단으로 발견된 버그를 할인한 후 버그 감소 수학을 적용해야 합니다.

![image](/assets/img/2024-06-20-TheTypeScriptTax_8.png)

만약 프로젝트에 버그 방지 수단이 없었다면 1,000개의 버그가 있었을 것으로 상상해보세요. 다른 품질 조치를 적용한 뒤 잠재적인 프로덕션 버그 카운트가 100으로 감소했습니다. 이제 TypeScript가 추가적으로 얼마나 많은 버그를 방지했는지를 살펴보아 TypeScript 투자의 버그 발견 ROI를 더 진정한 의미로 살펴볼 수 있습니다. 버그의 거의 80%가 TypeScript로 감지할 수 없으며, 모든 TypeScript 감지 가능한 버그는 TDD와 같은 다른 수단으로 잠재적으로 발견될 수 있습니다.

- 수단 없음: 1,000개의 버그
- 다른 수단 적용 후: 100개의 버그 남음 — 900개의 버그 발견
- TypeScript를 다른 수단에 추가한 후: 80개의 버그 남음 — 추가 20개의 버그 발견

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

![이미지](/assets/img/2024-06-20-TheTypeScriptTax_9.png)

일부 사람들은 정적 타입이 있다면 많은 테스트를 작성할 필요가 없다고 말합니다. 이들은 어리석은 주장을 하는 중입니다. 정말 아무 대결도 아닙니다. TypeScript를 사용하더라도 다른 조치들이 필요합니다.

![이미지](/assets/img/2024-06-20-TheTypeScriptTax_10.png)

이 시나리오에서 리뷰 및 TDD를 통해 TypeScript 없이 1,000개 중 900개의 버그를 잡을 수 있습니다. TypeScript는 리뷰와 TDD를 건너뛰면 1,000개 중 200개의 버그를 잡아냅니다. 당연히 둘 중 하나를 선택할 필요는 없지만, 다른 조치들을 적용한 후 TypeScript를 추가하면 기하급수적으로 감소하는 결과로 인해 매우 작은 개선이 이루어집니다.

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

업데이트: 2019년 2월 11일:

에어비앤비가 최근 TypeScript를 개발 프로세스에 추가하여 버그를 38% 줄였다고 보고했습니다. 이게 어떻게 가능할까요? 이 기사에 따르면 그건 불가능한 일이죠, 맞나요? 숫자 학산이 아니에요. 우리는 백분율, 평균, 그리고 감소하는 수익에 관해 다루고 있어요, 구체적인 값들은 아니죠.

이 기사가 의존하는 연구에서는 평균을 대표하고 있으며, 다른 품질 측정의 존재나 결여가 TypeScript가 해결할 수 있는 잔여 버그의 백분율에 영향을 줍니다.

다른 측정이 해결하는 ts-감지할 수 없는 버그가 많아지면 TypeScript가 처리할 수 있는 잔여 버그의 백분율도 높아지지만, 그 다른 측정들은 또한 TypeScript가 처리해야 할 잔여 버그의 총 수치를 줄여줍니다. 따라서 백분율은 올라갈 수 있지만, 잡히는 버그의 총 수치는 거의 변하지 않을 수도 있어요.

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

또한, 주의 깊은 코드 리뷰는 버그를 발견하고 줄이는 데 탁월한 역할을 합니다. 전체 코드베이스를 완전히 재검토하는 것만큼 주의 깊은 코드 리뷰는 없습니다. 모든 코드 라인을 주의 깊게 검사하고 분석함으로써 나타나는 결과를 보면, 그로부터 약 30%의 버그 감소가 기대됩니다. 단독 이러한 작업만으로도 (JavaScript로 남겨두었을지라도) 타입과는 무관하게 버그가 줄어들 것으로 예상됩니다.

현재로서는 높은 확률로 방식을 공개하지 않았으며 그들이 사용하는 다른 버그 감소 방안에 대해 보고하지 않았으나, 나는 코드에 들어가기 전 사양 설명 검토 프로세스의 형태를 사용하여 코드로 전이되는 사양 버그의 비율을 줄이고 있다고 추측하고 있습니다.

다른 말로 하면, TypeScript로 해결할 수 없는 많은 버그를 제거할 때 TypeScript는 남아있는 버그에 대해 더 높은 비율의 버그 감소를 제공할 수 있습니다.

이 결과는 TypeScript로 해결할 수 있는 공개 버그의 20%만이 실제로 해결될 수 있다는 사실을 변경하지 않으며, 지수적으로 감소하는 수익에 대한 주장을 무효화하지 않습니다.

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

에어비앤비는 디자인 또는 사양 검토와 함께 자동화된 코드 커버리지가 평균 이상일 수 있다는 것을 시사합니다. 아마도 단위 테스트 커버리지나 기능 테스트 커버리지 중 하나라도 빠진, 즉 높지 않은 자동 코드 커버리지를 가지고 있을 수 있습니다. 적절한 단위 테스트 커버리지를 가지면 정적 타입이 잡을 수 있는 버그의 거의 100%를 포함하여 TypeScript로 잡을 수 없는 많은 버그를 잡을 수 있습니다.

대부분의 팀은 거의 또는 전혀 구현된 디자인/사양 검토 프로세스가 없습니다. 엔지니어가 개발자에게 전달하기 전에 모델링을 비판적으로 검토하는 것만으로도 평균 이상일 것입니다. 많은 팀은 전혀 공식적인 디자인 검토 프로세스가 없습니다.

아래는 그들의 TypeScript 이점 차트가 어떻게 보일지에 대한 예시입니다:

![이미지](/assets/img/2024-06-20-TheTypeScriptTax_11.png)

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

TypeScript는 여전히 1,000개 중 38개의 잠재적 버그만을 잡아내지만, 대부분의 잠재적 버그는 TypeScript보다 이전 단계에서(예를 들어 모형을 개발자가 적용하기 전에 검토하는 사람들 등) 잡힐 수 있기 때문에 TypeScript는 남은 버그의 큰 부분을 처리할 수 있습니다. 이 경우, Airbnb의 추가 코드 품질 조치를 놓친 팀들보다 18개의 버그가 더 발견되었어요.

점차적인 반환 수치의 수학적 분석은 TypeScript가 모든 버그 중 훨씬 더 많은 비율을 잡아낼 수 있는 경우에만 완전히 무효화될 수 있습니다: 약 75% 이상까지, 그 단계에서 다른 비용이 많이 드는 품질 관리 프로세스 부분이나 코드 리뷰 또는 TDD를 대체할 수 있을 수도 있습니다.

TypeScript로 전환하면서 Airbnb가 정확히 몇 개의 버그를 잡았는지, TypeScript가 막지 못한 버그의 분류를 배우는 것, 버그 밀도(그리고 어떻게 계산했는지), 그리고 이미 적용하고 있는 다른 품질 관리 조치에 대해 배울 수 있다면 흥미로울 것입니다.

수백만 달러 규모의 대규모 개발 프로젝트에 품질 관리 시스템을 구현한 경험으로 보면, 비용이 많이 드는 시스템 구현의 효율성에 대한 내 기대는 30% ~ 80%의 감소라는 영역에 있습니다. 이러한 종류의 숫자들은 다음 중 어느 것이든 얻을 수 있습니다:

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

- 디자인 및 명세 검토 (최대 80% 감소)
- TDD (남은 버그의 40-80% 감소)
- 코드 검토 (코드 검토 1시간 당 유지보수 시간 33시간 감소)

결과가 명확하게 나타나는데, 타입 오류는 가능한 버그의 작은 부분에 불과하며, 타입 오류를 잡는 다른 방법들도 있습니다. TypeScript가 버그로부터 당신을 보호해주지는 않는다는 것이 밝혀졌습니다. 최상의 경우, 아주 조금의 감소만 얻을 수 있을 뿐이며, 여전히 모든 품질 측정이 필요합니다.

TypeScript의 혜택이 별로 크지 않다는 것 같습니다. 하지만 이것만큼의 혜택이 없다면 다른 혜택이 없을까요?

새로운 JavaScript 기능 및 크로스 브라우저 JavaScript로 컴파일: Babel은 네이티브 JavaScript를 위해 둘 다 제공합니다.

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

이점에 대한 설명이 끝났어요. 제 기분은 조금 실망스럽군요. 다른 도구를 사용하여 원시 JavaScript의 경우에도 타입 힌트, 자동 완성 및 큰 버그 감소를 얻을 수 있다면, TypeScript의 차이로 인한 투자 대비가 가치 있는지에 대해 알아봐야 합니다.

그것을 알아내기 위해서 TypeScript의 비용을 자세히 살펴봐야 합니다.

채용: JavaScript 상태 조사 응답자의 거의 절반은 TypeScript를 사용했으며 다시 사용할 의향이 있습니다. 또한 33.7%는 배우고 싶어하지만, 5.4%는 TypeScript를 사용했지만 다시 사용하지 않고, 13.7%는 TypeScript를 배우는 것에 관심이 없습니다. 이로 인해 거의 20%에 해당하는 인원이 인적자원 확보 풀에서 제외되며, 이는 많은 인재 채용이 필요한 팀에게 상당한 비용이 될 수 있습니다. 채용은 몇 달 동안 지속되고 다른 개발자들의 생산성 시간을 소모할 수 있는 비용이 크기 때문입니다. (그리고 대부분의 경우, 기존 개발자가 새로운 후보자의 기술을 가장 잘 판단할 수 있는 사람입니다.)

반면, 개발자 한두 명만 채용해야 한다면, TypeScript를 사용하는 것은 거의 절반이 넘는 후보자 풀에게 더욱 흥미로운 공고를 만들 수 있습니다. 소규모 프로젝트의 경우, 중립적이거나 미세하게 긍정적일 수 있습니다. 수백 또는 수천명의 팀의 경우, ROI 오차 마진의 부정적인 쪽으로 기울 것입니다.

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

설치, 초기 교육: 한 번 들어가는 비용이므로 비교적 낮습니다. 자바스크립트에 익숙한 팀은 보통 2~3개월 내에 TypeScript에서 생산성을 띄우고, 6~8개월 이내에는 상당히 숙달합니다. 채용보다는 비용이 높지만, 이 비용만 고려한다면 노력을 들여야하는 가치가 충분합니다.

미지원 기능 - HOFs, 합성, 높은 종류의 일반화 타입 등: TypeScript는 관용적인 자바스크립트와 완전히 연동되지 않습니다. TypeScript에서의 가장 큰 도전 중 하나이기도 합니다. 숙달된 자바스크립트 개발자들은 종종 TypeScript로 표현하기 어려운 또는 불가능한 상황을 자주 겪을 수 있지만, 성실한 개발자들은 올바르게 작업하고 싶어 할 것입니다. TypeScript에서 제대로 타이핑할 수 없는 것들을 타이핑하는 방법을 배우려고 구글링하는 데 시간을 보낼 것입니다.

TypeScript는 현재의 한계를 더 잘 설명하고 발견할 수 있도록 좋은 문서 및 자료를 제공함으로써 이 비용을 줄일 수 있습니다. 여러분들은 고차 함수, 선언적 함수 합성, 트랜스듀서 등에서 TypeScript를 잘 사용하도록 시간을 낭비하지 않도록 해야 합니다. 많은 경우, 잘 행동하고 가독성이 높고 유지보수가 용이한 TypeScript 타이핑을 갖추는 것은 불가능할 수 있습니다. 개발자들은 더 생산적인 일에 시간을 소비할 수 있도록 이를 빨리 발견해야 합니다.

지속적인 지도: 사람들은 TypeScript에서 생산적으로 될 수 있지만, 자신감을 갖는 데는 상당히 많은 시간이 걸립니다. 아직도 많은 것을 배워야 한다고 느낍니다. TypeScript에서는 동일한 것을 타이핑하는 다양한 방법이 있으며, 각각의 장단점을 이해하고 최선의 방법을 찾아내는 것은 초기 학습 곡선보다 시간이 더 오래 걸릴 수 있습니다.

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

예를 들어, 새로운 TypeScript 개발자들은 주석과 인라인 타입을 지나치게 사용하는 경향이 있습니다. 반면 더 경험이 있는 TypeScript 개발자들은 인터페이스를 재사용하고 인라인 주석의 구문 혼란을 줄이기 위해 별도의 타입을 만들어 사용하고 있습니다. 더 경험이 있는 개발자들은 또한 타입을 정교하게 조정하여 컴파일 시간에 더 나은 오류를 발견하게 됩니다.

타입에 대한 이러한 추가 관심은 새로운 개발자를 합류시킬 때마다 발생하는 비용이지만, 경험 있는 TypeScript 개발자가 팀 전체와 새로운 팁을 공유하며 배우기 시작할 때마다 발생하는 비용입니다. 이러한 지속적인 멘토가 협력의 정상적인 부산물일뿐이며, 다른 부분에 적용할 때 장기적으로 비용을 절약할 수 있는 건강한 습관입니다. 그러나 이에는 비용이 들어가며 TypeScript는 이를 크게 증가시킵니다.

타이핑 오버헤드: 타이핑 오버헤드 비용에는 추가 시간을 들여 타이핑, 테스트, 디버깅 및 유지 관리하는 모든 비용이 포함됩니다. 디버깅 타입은 종종 간과되는 비용입니다. 타입 주석은 자체 버그 클래스를 가지고 있습니다. 너무 엄격하거나 너무 느슨하거나 그저 잘못된 타입을 갖는 경우가 있습니다.

이 비용 부문은 처음 탐색했을 때보다는 줄어들었는데, 이제 많은 써드파티 라이브러리가 타입을 포함하고 있어서 자체로 추적하거나 만들어야 하는 일이 줄었습니다. 그러나 이러한 타입 중 여전히 많은 부분이 잘못되었거나 최신이 아닌 경우가 많아서, 여전히 타입 힌트가 필요한 써드파티 라이브러리에 대해 타입을 보충해야 할 것입니다. 종종 개발자들은 이러한 타입을 상류로 추가하려고 하며, 그 결과는 다양합니다.

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

마크다운 형식으로 테이블 태그를 변경해주시면 더 많은 문법 소음이 줄어듭니다. 하스켈 같은 언어에서는 타입이 일반적으로 간단한 한 줄짜리로 함수 정의 위에 나열됩니다. TypeScript에서는 특히 제네릭 함수의 경우, 기본적으로 삽입적이고 정의되어 있습니다.

함수 시그니처의 가독성을 높이는 대신 TypeScript 타입들은 종종 함수 시그니처를 이해하기 어렵게 만들 수 있습니다. 이것이 경험 많은 TypeScript 개발자들이 보통 재사용 가능한 타입 및 인터페이스를 더 많이 사용하고 함수 구현에서 타입을 분리하여 선언하는 이유 중 하나입니다. 대규모 TypeScript 프로젝트는 종종 프로젝트 어디에서나 가져와 사용할 수 있는 재사용 가능한 타입 라이브러리를 개발하며, 그러한 라이브러리의 유지 보수는 추가로 처리해야 할 일이 될 수 있지만 가치 있는 작업이 됩니다.

문법 소음은 여러 이유로 문제가 됩니다. 코드를 무너지지 않게 유지하고 싶은 이유가 집을 정리해서 깔끔하게 보관하는 이유와 같습니다:

- 더 많은 돌출 = 버그가 숨을 수 있는 더 많은 곳 = 더 많은 버그.
- 더 많은 돌출은 찾고 있는 정보를 찾기 어렵게 만듭니다.

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

정리는 정말 중요하죠. 잡음 없애는 행위는 시그널을 더 잘 들을 수 있게 해줘요. TypeScript의 구문 잡음은 상당한 비용 중 하나니까요. 더 나은 방법을 통해 개선할 수 있습니다:

- 고차형 타입을 사용한 제네릭에 대한 더 나은 지원으로, 템플릿 구문 잡음을 줄일 수 있습니다. (참고: Haskell의 타입 시스템)
- 디폴트로 인라인 타입을 사용하는 대신 따로 구분 가능하도록 장려합니다. 인라인 타입을 피하는 것이 좋은 방법으로 인식되면, 타이핑 구문이 함수 구현과 겹치지 않아 읽기 쉬워질 거에요. Stack Overflow에서 홍보하는 동안 일부 문서 개선을 통해 구현될 수 있습니다.

# 결론

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

Typescript에 대해 여전히 많이 좋아합니다. 더 나아지길 희망하고 있습니다. 앞으로 새로운 기능을 추가하고 문서를 개선하여 이러한 비용 문제를 충분히 해결할 수 있을 것으로 기대합니다.

그러나 이러한 문제를 외면하거나 Typescript의 혜택을 과대평가하는 것은 책임있지 않습니다.

Typescript는 타입 추론, 고계 함수 및 제네릭의 측면에서 더 나아질 수 있고, Typescript 팀은 튜토리얼, 비디오, 최선의 사례, 그리고 Typescript의 제한 사항을 쉽게 찾을 수 있도록 개선하는 큰 기회가 있습니다. 이는 Typescript 개발자들이 시간을 절약하고 사용 비용을 크게 줄일 수 있게 해줄 것입니다.

Typescript가 계속 성장함에 따라, 사용자들이 여전히 애정의 단계를 넘어서 비용과 현재의 한계를 깨닫기를 희망합니다. 더 많은 사용자가 늘어날수록, 더 많은 창의적인 사고가 해결책에 집중할 수 있을 것입니다.

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

TypeScript에 있어서, 작은 오픈 소스 라이브러리에서는 분명히 다시 사용할 것입니다. 이는 다른 TypeScript 사용자들을 위해 삶을 더 쉽게 만들기 위함입니다. 그러나 다음 대규모 응용 프로그램에서는 현재 TypeScript 버전을 사용하지 않을 것입니다. 왜냐하면 프로젝트가 클수록 TypeScript를 사용하는 비용이 증가하기 때문입니다.

이 결론은 기이한 것입니다. 왜냐하면 TypeScript의 슬로건은 "확장 가능한 JavaScript"이기 때문입니다. 더 솔직한 슬로건은 다음과 같이 수정될 수 있을 것입니다: "어색하게 확장되는 JavaScript".

Eric Elliott는 분산 시스템 전문가이자 "Composing Software"와 "Programming JavaScript Applications"의 저자입니다. DevAnywhere.io의 공동 창업자로서, 개발자들에게 원격으로 일하고 업무/생활 균형을 맞추기 위해 필요한 기술을 가르칩니다. 그는 암호화 프로젝트를 위해 개발 팀을 구축하고 자문하며, Adobe Systems, Zumba Fitness, The Wall Street Journal, ESPN, BBC 및 Usher, Frank Ocean, Metallica 등의 최고 음악가를 포함한 소프트웨어 경험을 개선했습니다.

그는 세계에서 가장 아름다운 여자와 함께 원거리 생활을 즐깁니다.
