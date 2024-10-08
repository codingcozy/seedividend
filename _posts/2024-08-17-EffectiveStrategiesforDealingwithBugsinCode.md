---
title: "코드 버그를 쉽게 발견하는 7가지 방법"
description: ""
coverImage: "/assets/img/2024-08-17-EffectiveStrategiesforDealingwithBugsinCode_0.png"
date: 2024-08-17 01:31
ogImage:
  url: /assets/img/2024-08-17-EffectiveStrategiesforDealingwithBugsinCode_0.png
tag: Tech
originalTitle: "Effective Strategies for Dealing with Bugs in Code"
link: "https://medium.com/@stevenpcurtis/effective-strategies-for-dealing-with-bugs-in-code-8eb9341243c"
isUpdated: true
updatedAt: 1723864174368
---

![2024-08-17-EffectiveStrategiesforDealingwithBugsinCode_0.png](/assets/img/2024-08-17-EffectiveStrategiesforDealingwithBugsinCode_0.png)

We use the squash, splat and crush analogy from insects when talking about bugs. This is with good reason: Thomas Edison wrote about bugs during his hardware engineering travails and this means the term is probably here to stay.

# Approaches to dealing with bugs

## Clean your area

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

코드를 버그 없이 만드는 한 가지 방법은 처음부터 버그를 작성하지 않는 것입니다!

- 테스트
- 모듈화
- 간결성과 명확성

테스트를 통해(예를 들어 TDD 또는 단위 테스트 사용) 코드는 프로덕션에 가까워지기 전에 테스트되기 때문에 버그가 발생할 가능성이 훨씬 적습니다. 이는 모듈화와 함께 작동하여 코드가 분리되고 테스트 가능한 청크로 작성되도록 보장합니다.

잘 작성된 버그 없는 코드의 세 번째 기둥은 간단하고 명료한 코드입니다. 이 간소한 코드는 다른 프로그래머(즉, 다른 프로그래머가 코드를 직관적으로 이해할 수 있어야 함)를 염두에 두고 작성되어야 합니다.

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

`// TODO`를 사용하여 미구현된 기능을 표시하는 것은 괜찮지만, 완전히 구현되지 않은 코드는 체크인해서는 안 됩니다.

## 경고 메시지를 무시하지 마세요

경고 메시지는 이유가 있는 것입니다. 린터를 사용하면 릴리스를 막거나 금요일 밤 늦게까지 작업해야 할 수도 있는 실제 문제가 되기 전에 오류를 지적하는 데 도움이 됩니다.

다른 말로 하면:

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

당신은 개발자이십니다. 위의 텍스트를 친근한 어조로 한국어로 번역해드리겠습니다.

제가 모르는 사람이 아니라는 걸 확신해요. 물론 첫 번째 경고를 무시하지는 않겠죠, 맞죠?

## 문제를 무시하는 것을 고려해보세요

직관적으로 보기에는 이상하겠지만, 문제 중 일부를 무시하고 그냥 사라지기를 기대할 수도 있어요. 전문적으로 안 되는 행동일까요? 그저 그렇죠. 비추천하는 행동일까요? 이건 조심스러운 문제죠.

매우 소수의 사용자에게 영향을 미치는 버그가 있고 그것을 고치는 데 막대한 시간이 필요하다면, 이 버그를 그냥 둘 수도 있을지도 모릅니다(심지어 프로덕션 코드에서도).

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

올바른 결정을 내리는 접근 방식은 개발자의 역량을 넘어설 수도 있어요. 이것은 팀으로 결정해야 할 사항이며, 팀원들이 굉장히 어려운 버그를 수정하기 불가능하다고 여기면... 그만큼 어려운 일일 수 있습니다.

개인 개발자로서 반복적인 전략으로 부정적인 코드를 무시한다면 무능한 행동으로 여겨질 수 있어요. 따라서 이 기술은 주의해서 사용하는 게 좋을 거예요.

## 이슈 추적 도구 사용하기

팀과 조직에서 사용할 수 있는 다양한 이슈 추적 도구가 있어요. 이를 통해 이슈를 분류하고 중요도와 긴급도에 따라 계층화하여 가장 긴급하고 중요한 이슈가 먼저 확인될 수 있도록 해요.

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

버그(단위 테스트에서 발견된 초기 버그를 넘어서 발생한 것들)는 기록되어야 합니다. 그렇게 하면 문제들이 발생하는 시기와 이유에 대한 이해가 형성될 수 있습니다.

혼자 작업 중이더라도, 마주한 문제들을 로그로 유지하는 것이 유용할 수 있습니다. 게다가 GitHub에는 도와줄 수 있는 기능들이 있습니다!

## 가정 확인하기

코딩에서 가장 중요한 것 중 하나는 여러분이 가진 아이디어와 작동해야 한다고 생각하는 방식이 정확한지 확인하는 것입니다. 이것은 말하기보다는 실천하기가 간단해 보일 수 있지만, 장기적으로는 사용 기술의 기능부터 구현까지의 이해가 필요합니다. 단기적으로는 가벼운 러버 덕 디버깅을 해보세요.

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

다음과 같은 작업을 하시면 좋을 수 있어요 - 각 문제에 대한 가정과 이론을 기록해두고, 필요한 시기에 테스트해보세요. 어떻게요? 여기에 정의들이 있어요:

- 가정: 문제의 전제조건

- 이론: 해결책 모색을 위해 순차적으로 테스트할 수 있는 아이디어

## 문제를 좁혀나가는 블록 (문제를 구체화해요)

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

대부분의 IDE는 코드 내에서 무슨 일이 일어나고 있는지에 대한 감을 제공합니다. 중단점을 사용하여 특정 문제를 따라가거나, 코드에서 문제가 발생한 곳을 찾는 데 도움이 되는 기능을 사용할 수도 있습니다.

TDD를 사용하는 경우 이미 잘 테스트된 코드를 함께 조합하여 완성품을 만들고 있을 것입니다. 당신의 단위들이 충분히 테스트되었는지 확신하시나요? 지금 이를 살펴볼 때입니다. 디버거를 사용하여 변수가 예상대로 작동하는지 확인하세요.

가장 중요한 것은, 발생 가능한 오류를 일반적으로 규정하고 구체적인 조사 기회로 좁히세요. 이 격리-테스트-수정 전략은 시작할 때보다 해결책에 더 가까워지도록 도와줄 것입니다.

## 모든 것이 잘 되던 시기로 돌아가기 (버전 컨트롤)

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

당신은 GIT을 사용하고 있나요? 그렇지 않다면 버전 관리 방법이 있나요? 이 문제가 처음 발생한 날짜는 언제인가요? 문제가 발생한 시기를 좁히면 조사를 더 향상시킬 수 있어요. 에러의 원인에 대해 알고 있다면 이를 활용하여 해결책을 찾을 수 있어요. 새 브랜치를 만들고 원하는대로 코드를 추가해 보세요. 당신은 이 문제를 해결하고 정답을 찾을 거에요!

## MVP 만들기

에러를 재현할 테스트 프로그램을 만들어보세요. 이것은 (안타깝게도) 모듈화된 테스트 가능한 코드가 없는 경우에 유용할 수 있어요. 그런 다음 문제를 일으킬 가능성이 높은 코드를 분리하고, 문제가 나타날 때까지 프로그램에 섹션을 다시 추가하세요. 이는 오리지널 문제를 발견했음을 의미하며 이를 수정할 수 있게 된 것을 의미해요!

## 기본 디자인 확인

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

이것은 아마 가장 아픈 결론일 것입니다. 프로젝트는 좋은 기반 위에 구축되지 않았을 뿐만 아니라 초기 디자인 전체가 프로젝트에 적합하지 않을 수도 있습니다. 이는 프로젝트가 실행 단계에서 변경되고, 본질적으로 개발자의 잘못이 아니라고 말할 수 있을 때 발생할 수도 있습니다.

그래도 어떤 경우에도 이 문제를 수정해야 합니다. 기본적인 디자인이 문제라면 변경되어야 할 수도 있지만, 이에 대한 비용이 많을 수 있으므로 이 문제를 해결하는 데 들인 시간이 최종적으로 다시 작성하는 가치가 있는지 확신해야합니다.

이런 상황에 있다면, 이를 일찍 발견했으면 좋겠습니다...

## 버그 기록

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

위에서 설명한 방법을 따라도 여전히 코드에서 문제와 이슈(그리고 우리가 말하고 싶지 않지만 버그까지도)를 만날 확률이 높습니다.

이를 기록하기 위해서는 몇 가지 미장센스와 소프트웨어 개발 방법에 대한 이해가 필요합니다.

많은 버그 수정 도구들은 그들의 인터페이스에 통합된 작업 흐름을 갖고 있지만, 다음을 기록하는 것을 잊지 마세요:

- 재현 가능성: 재현할 수 있나요?
- 심각성: 버그를 고치는 것이 얼마나 중요한가요?

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

당신은 충돌 로그를 저장할 수 있는 능력을 가지고 있을 수도 있습니다. 이것은 방금 발생한 문제를 해결할 때 도움이 될 수 있습니다. 결국, 당신은 문제에 대한 명확한 정보를 가지고 있을 때 문제를 해결하는 작업이 더 쉬워질 것입니다.

# 모든 것이 잃어 봤을 때

가장 위대한 문제 해결 전략 중 하나는 다음과 같습니다:

- 휴식을 취한다.
- 스트레스가 없는 숙면을 한다.

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

거의 우스꽝스러운 일 같지만, 쉬고 나면 당신의 머리는 훨씬 더 잘 작동합니다. 따라서 이를 활용하여 문제 해결 여정을 더욱 효과적으로 할 수 있습니다. 마치 집중이 다른 곳에 있는 동안 머릿속이 생각에 잠길 수 있다는 사실을 이용하면 해결이 불가능해 보이던 문제의 해결에 좋은 전략이 될 수 있습니다.

# 버그 물리쳐라

우리 모두는 항상 완벽한 코드를 써야 합니다. 어떤 버그도 없어야 하며, 소프트웨어는 요구 사항을 준수하고 처음에 사용자 테스트를 통과해야 합니다.

하지만, 소프트웨어 개발은 본질적으로 인간적인 과정이며, 인간들은 실수를 할 수밖에 없습니다. 우리는 개발자로서 그러한 버그를 찾아내어 짓눌러야 하는 책임이 있습니다 — 가능하다면 이를 그 버그가 생기기 전에 처리하는 것이 좋습니다.

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

프로페셔널 환경에서 어떻게 이런 일이 발생하는지에 대한 아이디어를 얻게 되었으면 좋겠네요!

이 링크를 사용하여 Medium에 가입하면 일부 수익이 제게 공유됩니다. 아니면 아래 큰 배너를 클릭해 주세요! 수익이 있으면 더 많은 글을 작성할 동기를 얻어요. 많은 글이 있지만 그 중 일부는 1달러 미만을 벌어요. 가족과 떨어져 글을 쓸 시간을 정당화하기가 어려울 때가 많아 지원이 필요해요.

대신 커피 한 잔 사주는 걸로 도와줄 수도 있어요 https://www.buymeacoffee.com/stevenpcuri.

질문, 댓글이나 제안이 있으면 언제든지 트위터에서 연락 주세요!
