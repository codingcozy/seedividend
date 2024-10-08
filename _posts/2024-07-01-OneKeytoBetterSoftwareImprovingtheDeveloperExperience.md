---
title: "소프트웨어 품질 향상의 열쇠 개발자 경험 개선하는 방법"
description: ""
coverImage: "/assets/img/2024-07-01-OneKeytoBetterSoftwareImprovingtheDeveloperExperience_0.png"
date: 2024-07-01 16:57
ogImage:
  url: /assets/img/2024-07-01-OneKeytoBetterSoftwareImprovingtheDeveloperExperience_0.png
tag: Tech
originalTitle: "One Key to Better Software: Improving the Developer Experience"
link: "https://medium.com/@dangoslen/one-key-to-better-software-improving-the-developer-experience-8965cf9b44fb"
isUpdated: true
---

![OneKeytoBetterSoftwareImprovingtheDeveloperExperience](/assets/img/2024-07-01-OneKeytoBetterSoftwareImprovingtheDeveloperExperience_0.png)

페어 프로그래밍 세션은 잘 진행되지 않았어요. 까다로운 버그의 근원을 찾으려고 노력했지만 전혀 진전이 없었어요. 계속 발전이 없다는 느낌이 난 것이 참으로 좌절스러웠어요.

하지만, 진전이 없던 것보다 더 좌절스러운 것은 진전이 없는 이유였어요.

관찰자로 차례가 돌아왔을 때, 동료들이 자신들의 코드를 로컬에서 실행시키지 못하고 있음을 깨달았어요. 그들은 앱을 디버그할 수 있는 재현 가능한 방법을 설정하지 못했고 (IDE나 다른 방법으로), 코드 전체에 프린트 문을 넣은 것으로 타협해야 했어요. 테스트를 신뢰할 수 없었기 때문에 테스트를 믿을 수 없었어요. 때로는 테스트가 실패하고 예상치 못하게 실패하기도 했어요. 더 나빠진 것은, Docker 컨테이너의 혼란스러운 무리와 화면에 텍스트를 흘리는 네 개 이상의 터미널 창을 이용해 싸운다는 것이었어요.

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

진행을 못한 이유는 애플리케이션을 독립적으로 쉽고 신뢰성 있게 실행하거나 디버깅할 수 없었기 때문이었습니다. 코드는 바로 있었지만 접근하기 어려웠습니다.

이 짧은 이야기에 대해 이야기할 것이 많습니다. 하지만 분명히 확인된 큰 문제 중 하나는 이 코드베이스가 개발자 경험에 투자 부족으로 인해 고통받았다는 것입니다.

오늘의 글에서는 카이제니(Kaizen) 개념을 적용하고 지속적으로 개발자 경험을 개선하는 방법에 대해 이야기하고 싶습니다. 새로운 경로나 기술을 발표하기 위한 새로운 방법은 없습니다(이미 많은 것들이 존재합니다). 대신, 왜 일상적인 작업의 개선을 가장 중요한 작업으로 만들고 시작하는 방법에 대해 전달하고 싶습니다.

# 가장 중요한 작업

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

피닉스 프로젝트를 처음 읽고 나서 멈출 수가 없었어요. 나 같이 느리게 읽는 사람이 이 책을 일주일도 안에 다 읽는 거야. 등장인물과 분위기에 공감할 수 있는 느낌이 짙었어요. 사실, 몇 부분은 읽는 게 힘들 정도로 공감이 느껴졌어요.

유니콘 프로젝트도 집어들고 나서 비슷한 반응을 보였어요. 젠 킴(Gene Kim) 작가는 나의 개발 경력 중 겪은 모든 고통을 잘 표현해 냈어요! 막신이 코드와 정치적 지뢰의 복잡함을 인내심과 기술로 넘어가는 것을 보면서 환성을 질렀었어요(소리 내어).

이 책들과 다른 책들은 조직 구조, 실험, 그리고 개발자와 관련된 여러 아이디어에 대한 나의 시각을 크게 바꿔 놨어요. 하지만 가장 중요한 것은 개발자로서 가장 중요한 일이 무엇인가에 대해 다짐해 줬던 것이죠: 매일 작업을 개선하는 것.

젠의 삼 가지 방법과 다섯 가지 이상(Three Ways and Five Ideals)이 이것에 관해 날보다 더 잘 설명해 주지만, 이 아이디어와 매일 개선에 대한 요약은 이렇습니다: 안전하고 쉽게 코드를 팀의 코드베이스에 기여하는 데 어떤 개선도 시간이 지남에 따라 누적된 혜택을 가져다줄 것이라는 거예요.

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

만약 오늘 코드 작성 능력을 5% 향상시킨다면, 내일은 팀 전체가 그 5%의 향상을 경험할 것입니다. 그 5%의 향상은 다음주에 개발자 경험을 개선하는 중요한 단계를 더 쉽게 만들어줍니다.

기술 부채를 상환하거나 메이크 또는 Ansible 스크립트를 통해 환경 설정을 자동화하는 등 개선 작업이 모두 쌓여서 비교적 빨리 눈에 띕니다.

# 개선된 개발자 경험이 더 좋은 코드로 이어집니다

개발자가 빠르고 안전하게 코드를 기여할 수 없을 때에는 코드에 여러 문제가 발생하기 시작합니다.

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

- 테스트가 너무 어려워서 건너뛰기 시작합니다.
- 좋은 코드 구조가 없기 때문에 팀이 같은 작업을 반복적으로 다시 작성하기 시작합니다.
- 무엇이 깨질지 두려워해서 대부분 미미한 변화만 제외하고는 아무것도 변경하고 싶어하지 않습니다.

시간이 흐름에 따라 이러한 패턴들은 부정적인 상황으로 이어집니다. 팀이 코드를 빠르고 안전하게 기여할 수 없기 때문에 개선을 하지 않습니다. 아무도 코드를 개선하거나 이를 세심히 다루길 원하지 않아서 코드는 부패됩니다. 이제 어제보다 변경하기가 더 어려워집니다.

반면에, 매일 일을 개선하기 위해 투자하는 것은 반대 효과를 가져옵니다. 팀이 신뢰할 수 있는 테스트를 작성하고 자주 실행하는 데 에너지를 투자했기 때문에 테스트를 쉽게 작성할 수 있습니다. 일반적인 패턴이 식별되고 재사용성과 효율적인 코딩을 위해 추상화됩니다. 모든 사람은 변화를 자신 있게 만들 수 있습니다. 테스트와 코드를 믿기 때문에 어디를 놓칠지를 알려줄 것이라고 믿기 때문입니다.

이러한 패턴은 매일 변경하기가 더 쉬워지는 선순환을 만듭니다. 이는 더 나은 코드, 더 빠른 제품 출시 시간(코드가 더 이상 방해가 되지 않습니다) 및 종종 제품의 더 적은 버그를 유발합니다.

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

그러나 코드를 보다 쉽게 기여할 수 있게 하는 것은 코드에만 도움이 되는 것이 아닙니다. 팀에 상당한 혜택이 됩니다.

# 개선된 개발자 경험은 더 나은 팀 동료 의욕으로 이어집니다

코드를 빠르고 안전하게 기여하는 능력은 코드나 제품 전달 속도에 도움이 되는 것 이상의 의미를 갖습니다. 이는 팀 동료들의 의욕을 높입니다.

SPACE 프레임워크와 다른 연구에서 언급한 것처럼, 개발자들은 작업에 즐거움이 있을 때 가장 효과적입니다. 이 때의 '즐거움'은 개발자가 일상적인 업무에 만족하고 기쁨을 느끼는 것을 의미합니다.

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

개발자들이 자신의 일을 즐기면 팀이 자신들의 일, 팀 그리고 방향에 대해 긍정적이고 자신감을 느끼는 데 훨씬 더 수월해집니다.

일반적으로 팀이 어려운 코드베이스에서 기능을 배포해야 하는 상황을 고려해보세요. 테스트는 부서지기 쉽고, 로컬 환경 설정은 고통스럽고, 문서화가 거의 없습니다. 팀은 프로젝트의 처음 몇 주를 모든 사람이 진입하도록 하는 데 집중하며 보내게 됩니다.

프로젝트가 진행되고 마감일이 다가올수록, 이 코드베이스에서 작업하는 어려움이 영향을 미치기 시작합니다. 팀은 코드에 짜증을 내며 마감일의 압박을 느끼게 됩니다. 그리고 얼마 지나지 않아 팀 내에서 스트레스가 높아지고 모두에게 느껴집니다. 이러한 스트레스 상황에서 실력 좋은 팀조차도 고생할 것입니다.

이제 이 프로젝트 전에 코드베이스를 개선할 시간을 가져주었다면 팀은 어땠을지 상상해보세요. 기능을 출시하는 데 초점을 맞추기보다는 코드베이스를 개선하는 데 시간을 할애했다면 어땠을까요. 부서지기 쉬운 테스트를 수정하거나, 환경 설정을 자동화하거나, 단순히 코드의 결합된 부분을 리팩토링하기 시작했을 수도 있습니다. 혹은 이 모든 것을 약간씩 할 수도 있겠죠.

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

이 경우에는 일상적인 업무의 개선이 팀에 큰 영향을 미쳤을 것입니다. 팀은 코드베이스에 대한 소유감을 느끼고 긍정적인 흐름을 타고 있으며, 전반적으로 높은 사기를 가지게 될 것입니다. 이러한 사기와 긍정적인 마음가짐은 더 많은 가치를 창출하며 일상적인 업무를 개선하는 데 큰 역할을 합니다.

우리는 훌륭한 코드를 작성하는 능력을 향상시킴으로써 팀이 운영하는 방식을 변화시킬 수 있습니다.

# 개선 방법

만약 이것이 중요한 아이디어라고 확신한다면, 아마도 이미 "하지만 어떻게하면 일상적인 업무를 개선할 수 있을까?"라고 물을 수도 있습니다. 좋은 질문입니다. 코드베이스를 살펴보고 어떠한 개선을 해야할지 알아내는 것은 어려운 일입니다. 하나의 개선을 하기도 어려운데 더 말이죠.

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

제가 작업한 코드베이스를 개선하는 데 도움이 된 몇 가지 지침이 여기 있습니다.

# 옵저버가 되세요

어떤 개선을 하려면 먼저 개선이 필요한 것을 찾아야 합니다. "문제가 없다면 고치지 마세요"는 여기에 너무 강한 표현이지만, 긍정적인 영향을 미치고 싶다는 열망으로 지나치게 급해질 수 있습니다. 모든 클래스, 모듈 또는 명령을 리팩토링할 필요는 없습니다. 모든 단계를 자동화할 필요도 없습니다 (적어도 즉시는).

어떤 경우에도, 코드 내에서 올바른 지렛대 지점을 식별해야 합니다. 이를 위해 옵저버가 되어야 합니다.

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

코드와 상호작용하는 방식에 주의를 기울이세요. 테스트를 실행하는 방법은 무엇인가요? 자동화된 테스트의 결과를 어떻게 확인하나요? 비유적으로 문에 "들어오지 마세요!"라는 표시가 붙은 코드 부분은 있나요? 사용하고 이해하기 어려운 추상화가 있나요?

이들은 모두 노력과 시간을 할 가치가 있는 부분에 대한 신호들입니다. 경험하는 것에 대해 일부 정신적인 노트(또는 실제 노트)를 유지해보세요. 그러면 집중해야 할 올바른 영역을 찾을 수 있을 겁니다.

# 판단을 보류하세요

어떤 것에 객관적으로 대할 때 판단하기는 쉽습니다. 정치부터 스포츠(쇼파에서의 수비수들)에 이르기까지, 다른 사람에 대해 판단을 내리는 것은 멀리 떨어져 있을 때 쉽게 할 수 있습니다.

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

코드베이스에도 동일한 것이 적용될 수 있습니다. 우리는 코드를 파헤치기 시작하면서 모든 결함을 볼 수 있고 코드와 기여한 개발자들을 비판하기 시작할 수 있습니다. "도대체 왜 그렇게 했을까?" 라는 생각을 머릿속에 하게 됩니다.

해당 코드베이스 내에서 개발자 경험을 향상시키기 위해 어떠한 진전을 이루기 위해서는 이 심사를 보류해야 합니다. 특히 새로 합류하는 팀에서는 이것이 매우 중요합니다.

발견한 것을 비판하는 대신, 코드가 현재의 상태로 이끈 힘과 결정을 이해하려고 노력해야 합니다. 코드베이스는 종종 서비스하는 제품이 변경됨에 따라 많은 변형을 겪습니다. 이러한 변경은 때로 갑작스럽거나 너무 빨리 발생할 수 있습니다. 팀은 빠르게 작동하여 뭔가를 만들어내야 합니다.

이러한 변형은 종종 코드에 이상한 "공백"을 생성하는데, 이를 코드가 작동하기 위해 메꿔지거나 덮어야 합니다. 이는 너무 빨리 추가가 이루어진 집에 대한 일어나는 현상과 유사합니다. 방들이 이상하게 느껴지고 레이아웃이 이해되지 않을 수 있으며 (문자 그대로) 실제적인 공백과 갈라진 곳이 시멘트나 페인트로 가려져 있을 수 있습니다.

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

맥락을 이해하면 코드가 문제가 있을 수 있지만 그 목적을 충족했다는 것을 기억할 수 있습니다. 이 마음가짐을 갖게 되면 코드를 즉시 수정하는 대신 어디로 코딩을 이끌어야 하는지에 대해 더 나은 질문을 하게 될 것입니다. 아이러니하게도, 즉행으로 변화를 주는 것이 바로 그런 코드의 처음 되는 방식일 수 있네요 :)

코드에 대한 판단을 유보함으로써 더 나은 세상으로 향할 수 있는 방법을 더 잘 이해할 수 있습니다.

# 작은 시작

개선할 점을 식별하기 시작하면, 바로 뛰어들고 싶어질 것입니다.

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

그러나 조심해야 해요. 대규모 리팩토링과 거대한 재작성은 비참하게 실패하는 경향이 있어요. 많은 경우, 그 이유는 단순히 변경이 너무 커서 그렇습니다.

대신, 작은 개선을 목표로 삼아보세요. 일반적인 작업을 위한 npm 스크립트를 추가하는 것조차도 큰 이점을 가진 작은 변경일 수 있어요(터미널 히스토리를 Ctrl+r로 계속 찾느라 낭비하는 시간이 줄어듭니다). 여러분의 문제의 규모에 따라 중요하지 않아 보일 수도 있지만, 작은 승리가 복리 효과를 만드는 중요한 부분이랍니다.

작은 개선에 집중함으로써 여러분은 그 작업을 다른 작업에 조화롭게 결합할 수 있는 능력을 얻게 됩니다. 예를 들어, 구현하는 데 두-세 시간밖에 걸리지 않는 작업이라면 특별한 권한이 필요하지 않을 거예요. 이런 식으로 더 많은 개선을 할 수 있게 되는 것이죠. 또 다른 이점은 일상적인 작업에 개선 사항을 편집할 수 있다는 점입니다. 매일 코드를 다루면서 비로소 그 클래스에 대한 이상한 API를 발견할 수 있습니다.

물론, 더 많은 사고, 계획, 시간이 필요한 변경이 있을 수 있어요. 이런 경우에는 코드와 개발자 경험에 대한 개선의 영향을 추정하기 위해 최선을 다하셔야 해요. "왜 이것을 하죠?"와 "지금 이걸 왜 하죠?"에 대한 좋은 답변을 가지는 것이 중요합니다. 달러로 표기하거나 구체적인 시간 추정을 할 수 없을 수도 있지만, 지연된 프로젝트, 장애, 또는 지속적인 긴급 호출 문제를 지적할 수 있다면 그런 곳을 시작 지점으로 삼아보세요.

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

# 함께 이야기하기

마지막으로, 다른 사람들을 함께 이끄는 것을 잊지 말아주세요. '다른 사람들을 함께 이끄는 것'이라고 말하는 내 의미는 미래의 세상이 어떻게 변화할 수 있는지 보기 위해 그들을 초대하는 것입니다. 그들을 당신의 작업에 참여시키고 팀원들과 아이디어를 공유하세요. 그들이 모두 참여한다면 어느 정도 나아질 수 있는지 보여주세요.

만약 이를 올바르게 수행한다면, 다른 사람들이 개선할 수 있는 다른 장소를 알게 되고, 이를 실현시키는 데 도움을 제안해 줄 것입니다. 사람들은 의미 있는 일에 기여하는 것을 좋아합니다. 팀원들이 시간을 투자할 가치가 있는 것을 찾아내고 이를 실현하기 위해 노력해주세요.

물론 모두가 동의할 수 있는 것은 아닙니다. 모든 팀에는 회의론자나 냉소주의자들이 있습니다. 그들은 당신의 진전에 어려운 장애물을 제공할 수 있습니다. 우리는 그들을 완전히 배척하길 원하지는 않지만, 팀이 흥분할만한 좋은 일을 방해하는 것을 허용하고 싶지도 않습니다.

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

아직 배우는 중이지만, 효과가 있을 것 같은 몇 가지 조합을 본 적이 있어요.

먼저, 그들을 퇴짜냅니다 마세요. 그들을 무시하지 말아주세요. 그 행동은 팀 내에 건설되고 이겨가는 엄청난 격차와 긴장을 야기할 것입니다.

둘째, 공통 분모를 찾으려고 노력해보세요. 그들이 당신의 아이디어 중 80%에 동의하지 않을 수도 있지만, 만약 20%에 동의한다면, 먼저 그 20%를 어떻게 실행할지 집중해보세요. 이 방법으로 관계를 구축하면 서로 어떤 문제에 대해 어떻게 생각하는지 알 수 있습니다. 또한 여기서 그들이 동의하는 부분이 있는 경우 그 공통 분모를 가진 그들의 아이디어에도 도움을 줄 의향이 있음을 보여줄 수 있습니다.

마지막으로, 모든 변경 사항이나 개선 사항에 대해 합의를 반드시 이룰 필요는 없다는 것을 기억하세요. 팀 중 나머지가 찬성을 할 때 일관적으로 한 명만 반대하는 경우 — 이루세요. 악의적인 방식으로 하거나 어떤 사람의 견해를 무시하게 되는 방식으로 하지는 마세요. 그러나 코드를 병합하는 데 너무 겁먹지도 마세요. 항상 누구든지 만족시킬 수는 없습니다.

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

오늘 요약은 명확합니다: 일상 업무의 개선을 일상 업무에 통합하는 데 노력하세요.

올바른 방향으로 조정하는 데 시간이 걸리고, 다른 개발자들에게 협력을 부탁하기 위해 몇 가지 설득이 필요할 수도 있지만, 이것은 이기고 싶어하는 팀에게 필수적입니다.

이것은 개발자로서 우리가 할 수 있는 가장 중요한 일이죠: 다른 모든 사람이 보다 효과적인 개발자가 되도록 돕는 것입니다.

즐거운 코딩되세요!

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

만약 이 기사를 즐겼다면, 제 뉴스레터에 가입해보세요! 매주 화요일마다, 저는 여러분에게 훌륭한 소프트웨어를 만드는 멋진 팀을 구축하는 데 도움이 되는 도구, 자료 및 새로운 기사를 보내드립니다.

https://dangoslen.me에서 최초 발행되었습니다.
