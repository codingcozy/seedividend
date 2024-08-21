---
title: "Promiseall을 직접 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "I Lost a Job Opportunity Just Because of Promiseall"
link: "https://medium.com/@fatfish/i-lost-a-job-opportunity-just-because-of-promise-all-28cf5d399cae"
isUpdated: true
---

<img src="/assets/img/ILostaJobOpportunityJustBecauseofPromiseall_0.png" />

요즘 친구에게 일어난 면접 경험 이야기야. 면접관은 그에게 Promise.all 함수를 구현해보라고 했어. 안타깝게도, 친구는 현장에서 잘 놀고 있지 못해 그 질문에 대답할 수 없었어.

면접 후에 면접관은 그에게 무례하게 이렇게 말했어: "네 JavaScript 기초가 충분히 탄탄하지 않고, 많은 JavaScript 원칙에 대한 지식도 부족한 것 같아."

사실, 나는 이 면접관의 행동에 어리둥절해. Promise.all을 구현할 수 없다는 게 기초를 제대로 확립하지 못했다는 걸 의미하는 걸까? 이상하지 않아?

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

다음에서 Promise.all 및 다른 중요한 Promise 메서드에 대해 이해하기 쉽게 설명하려고 노력했습니다. 그러니 시작해 봅시다.

## 1. Promise.all

MDN에서:

“Promise.all() 메서드는 promises의 iterable을 입력으로 받아들이고, 입력 promises의 결과 배열로 해결되는 단일 Promise를 반환합니다.

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

이 반환된 Promise는 입력된 모든 Promise가 이행되었을 때 또는 입력된 반복 가능(iterable)이 약속을 포함하지 않을 때 이행될 것입니다.

입력된 Promise 중 하나라도 거부되거나 비-Promise가 오류를 throw할 때 즉시 거부되며, 이 첫 번째 거부 메시지/오류와 함께 거부됩니다."

예시

Promise.all을 사용하는 방법을 검토하기 위해 몇 가지 예제를 작성해 보겠습니다.

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

이 시점에서 이미 구현하는 방법을 알고 계실 거예요. 정말 쉽죠?

코드

시험해보세요

Promise.myAll이 Promise.all과 똑같이 작동하는 것을 확인할 수 있어요.

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

# 2. Promise.resolve

친구야, 읽어 주셔서 감사합니다. 계속해서 읽으러 초대하고 싶어요. Promise.resolve를 다시 구현해 봅시다.

MDN에서:

“Promise.resolve() 메소드는 주어진 값(value)을 Promise로 "해결(resolve)"합니다. 값이 promise인 경우 해당 promise가 반환되고, 값이 thenable인 경우 Promise.resolve()는 미리 준비된 두 개의 콜백을 사용하여 then() 메소드를 호출할 것이고, 그렇지 않은 경우 반환된 프로미스는 값으로 완료될 것입니다.”

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

예시

코드

Promise.resolve가 이렇게 쉬울 줄 몰랐어요.

테스트 해보세요

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

# 3. Promise.reject

Promise.reject를 구현해보는 건 어떨까요?

MDN에 따르면:

“Promise.reject() 메서드는 지정된 이유로 거부된 Promise 객체를 반환합니다.”

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

예제

코드

Promise.reject를 구현하는 것은 매우 쉽습니다. 해야 할 일은 새 Promise를 반환하고 결과 상태를 reject로 설정하는 것뿐입니다.

테스트를 해보세요

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

# 4. Promise.race

MDN에서:

"Promise.race() 메서드는 iterable에서 하나의 promise가 이행되거나 거부될 때 즉시 이행하거나 거부하는 promise를 반환합니다."

예제

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

안녕하세요!

아래와 같이 Markdown 형식으로 변경해보겠습니다.

변경된 텍스트:

코드

이를 구현하는 방법을 알아야 합니다. 첫 번째 변경 사항이 무엇인지 알기만 하면, Promise.race는 이 결과를 따라가며 다음 코드를 작성할 수 있습니다:

테스트 코드

# 5. Promise.allSettled

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

이것은 우리가 구현할 Promise의 마지막 API이며, 실제로 거의 사용되지 않습니다.

다음은 MDN에서 온 내용입니다:

“Promise.allSettled() 메서드는 주어진 프로미스들이 모두 이행되었거나 거부됐을 때 이행되는 프로미스를 반환하며, 각각의 프로미스 결과를 설명하는 객체 배열과 함께 이행됩니다.

일반적으로 서로에게 의존하지 않는 여러 비동기 작업을 성공적으로 완료하거나 각 프로미스의 결과를 항상 알고 싶을 때 사용됩니다.”

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

약속.all()에 의해 반환된 약속은, 작업들이 서로 의존적이거나 그 중 하나가 거부될 경우 즉시 거부하고 싶을 때 더 적합할 수 있습니다."

예시

코드

내 친구야, 잠시만 기다려. 글이 곧 끝나갑니다.

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

위의 예제를 통해 우리는 그 규칙을 요약합니다.

- Promise가 완전히 성공하거나 부분적으로 실패하더라도, 결국 Promise.allSettled의 .then 콜백으로 진입합니다.
- 최종 반환 값에는 성공과 실패한 항목 모두 status 속성이 있으며, 성공 시 값은 fulfilled이고 실패 시 rejected입니다.
- 최종 반환 값에서 성공은 value 속성을, 실패는 reason 속성을 포함합니다.

테스트를 해보세요!

# 마지막으로

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

감사합니다. 저의 팔로우와 높은 품질의 더 많은 글을 읽기를 기대하고 있습니다.
