---
title: "제발 코드를 미래지향적으로 작성하지 마세요"
description: ""
coverImage: "/assets/img/2024-05-18-Dontfuture-proofyourcode_0.png"
date: 2024-05-18 21:18
ogImage:
  url: /assets/img/2024-05-18-Dontfuture-proofyourcode_0.png
tag: Tech
originalTitle: "Don’t future-proof your code"
link: "https://medium.com/developer-purpose/dont-future-proof-your-code-aad04ef75584"
isUpdated: true
---

<img src="/assets/img/2024-05-18-Dontfuture-proofyourcode_0.png" />

당신이 생각하는 일이 일어날지 여부는 중요하지 않아요.

개발자들은 미래를 대비하기를 좋아해요. 미래의 필요에 맞춰 코드를 작성하고 싶어해요. 하지만 좋은 소식은: 인간들은 미래를 예측하는 데 그리 능하진 않아요.

이것은 중요한 교훈이에요. 미래 예측에 따른 코딩은 종종 시간 낭비일 수 있어요.

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

# 함정이에요!

경험이 풍부한 엔지니어든 초보 엔지니어든 함정에 걸리기 쉽습니다.

그들은 다음에 무엇이 올지를 추측하려고 합니다. 그들은 현재의 디자인에 이러한 변화를 작업합니다.

실제로 이는 데이터베이스에 몇 가지 추가 필드를 추가하거나, 기존 로직을 성능을 높이기 위해 리팩토링하거나, 미래 요청을 대비하여 재사용 가능한 리소스를 생성하는 것을 의미합니다.

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

여기가 중요한 거야...

그 추가 필드, 논리 변경, 그리고 재사용 가능한 자원들은 무료로 제공되지 않아.

시간과 노력이 소요될 거야. 예상되는 요구 사항을 보상하기 위해 디자인을 계속 수정하면서 처음 버전을 전달하는 데 더 많은 시간이 걸릴 거야.

안타깝게도, 그 추가적인 노력은 아마도 낭비될 거야.

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

# 당신이 생각하는 것을 알고 있지 않아요

지금 당신은 아마도 미래에 비즈니스가 필요로 할 것을 이해했다고 생각할지도 모르겠어요.

하지만 제가 말해드릴게요, 아무리 당신이 이해하고 있다고 생각해도, 실제로는 그렇지 않아요.

운이 좋다면, 앞으로 필요한 것을 예측하는 데에 성공하실 수 있을지도 모르지만, 그 가능성은 10회 중 1회일 뿐이에요.

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

다른 9번의 경우에는 노력을 낭비하고 복잡성을 늘렸는데, 그러한 설계는 변경되거나 필요하지 않을 수 있다.

이는 배워야 할 어려운 교훈입니다. 많은 시니어 엔지니어조차도 이를 내재화하지 못합니다. 우리는 다시 빠져드는 함정에 자꾸 빠져들곤 합니다. 어떤 미래상을 예측하며 코드를 작성합니다.

절대 실현되지 않을 상상 속 미래입니다.

# 어떻게 전개될지 혹시 살펴봅시다

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

당신이 아름다운 내구성 있는 기능을 개발했거나, 아니면 미완료된 엔드포인트 세트로 미래 기능에 대한 기반을 마련했을지도 몰라요.

모든 것이 그 방향으로 향하는 것 같습니다. 그렇게 완벽히 해냈습니다! 미래 필요성을 예측하고 그를 우아하게 처리해 준 것으로 당신은 영웅이 될 거예요.

하지만 갑자기 비즈니스 우선 순위가 바뀌었어요.

- 회사 회의에서 CEO가 최신 대규모 이니셔티브를 발표했어요. 앞으로 미래를 대비하여 작성한 코드가 필요해 질 것 같은 제품을 단종할 거예요.
- 아니면, 고객이 제품 팀에 피드백을 공유했을 때, 당신이 구축하고 있는 기능이 실제로 필요 없다면서요. 그들은 내부 도구로 처리할 수 있어요.
- 아마도 판매 팀이 당신이 구축한 기능이 유용하지만 좋은 방법이 없어 이에 대한 요금을 지불하려고 하지 않는다면서 발견했다면, 그 기능에 대한 개발은 우선순위가 낮아져야 해요.
- 다른 팀이 비슷한 기능 세트를 가지고 있어요. 당신이 자체 버전을 구축하고 있는 것을 알게 되면, 그들은 기능 세트를 통합하려고 할 거예요. 기존 사용 사례와 처음에 계획한 것과 다른 다양한 요구 사항을 지원해야 할 거예요.
- 현재 프로젝트에 문제가 없는 경우도 있을 수 있지만, 더 시급한 다른 문제가 발생했을 수도 있어요. 몇 달 동안 팀이 집중해야 할 긴급 문제가 생기고, 솔루션을 완전히 구축할만큼의 힘을 다시 모으기 어려울 수 있어요. 항상 미완성 상태로 남아 있을 거예요.

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

그러나 미래를 위한 아름다운 코드와 디자인은 막상 현실로 구현되지 못할 수도 있어요.

# YAGNI!

You aren’t gonna need it — 그것이 당신의 자조가 되어야 합니다.

너무 멀리 앞서 계획하려고 하면 위험하고 비생산적일 수 있어요. 그 코드가 정말 유용할지도 의문일 거예요.

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

그것은 기술적 부채가 될 것입니다. 당신의 팀이 한동안 반만 유지될 수밖에 없는 낡은 부분입니다.

유혹적일 수 있지만, 제발! 아무도 요청하지 않는 것을 만들지 마십시오.

요구 사항에 맞게만 빌드하고 그만두세요.

# 대신 해야 할 일

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

한 번 더 내 생각을 말해볼게요:

작은 변경 사항을 빠르게 배포하는 것이 최선의 방법입니다.

무엇인가를 미래 대비할 때, 스스로에게 물어보세요. "어떻게 하면 이것을 더 간단하게 만들 수 있을까?" "나중에 x가 필요하게 될 것이다..." 라고 생각하게 되면, 바로 당신의 미래 자신이 간단한 코드 베이스를 원할 것이라는 것을 깨닫게 될 겁니다.

가장 중요한 것은 간단한 것을 만드는 것입니다.

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

미래의 나는 아직 요구 사항을 이해하지 못한 사람이 작성한 과장된 가짜 해결책을 원하지 않을 것입니다.

시간 여행 기계가 없다면 미래 요구 사항을 완전히 알 수 없어요!

그러니, 오늘 가지고 있는 요구 사항에 맞게 개발하세요. 그리고 멈추세요.

# 간단하다고 쉬운 게 아니에요

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

위 요구사항을 충족시키는 가장 간단한 코드를 작성하는 것은 속기 하지만 어렵습니다.

해당 문제를 깔끔하게 모델링하고 각 솔루션의 각 부분을 이해하기 쉽게 해야 합니다. 우아한 코드는 명확해 보이지만 실제론 많은 고민이 필요합니다.

코드를 미래에 대비해 작성하는 대신, 확장 가능한 코드를 작성하는 것이 최선입니다.

이는 단순한 함수, 명확히 정의된 클래스 및 포괄적인 테스트를 의미합니다. 미래에 새로운 기능이 필요할 때는 어디에 어떻게 추가해야 할지 명확해야 합니다.

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

단순함이 해답이에요.

미래를 예측할 순 없으니 시도조차 하지 마세요. 대신, 오늘의 요구사항을 가능한 단순하게 충족시키기 위해 최선을 다하세요.

# 일일 목록

여기서 읽으신 내용이 마음에 드셨나요? 매일 아침 2,000명의 소프트웨어 개발자들을 위해 새로운 글을 쓰고 있어요.

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

매일 업데이트를 받아보세요!
