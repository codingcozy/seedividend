---
title: "스타일 시트 리팩터링의 기본적인 사항"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Common Sense of Style Sheets Refactoring"
link: "https://medium.com/@bseleng/common-sense-of-style-sheets-refactoring-f901f524d0dd"
isUpdated: true
---

당신의 팀에게는 비교적 한적한 주가 있습니다. 다가오는 기능 요청이 없고, 마감 기한이 목도하고 있지 않으며, 제품 소유자가 전략 계획에 참여하고 있습니다. 기술부채와 관련된 문제를 처리할 수 있는 좋은 기회가 있습니다. 예를 들어, 이전 것이 폐지되기 때문에 스타일시트를 @import에서 @use 문으로 이주시키는 경우를 생각해봅시다.

만약 당신이 명령줄 도구의 팬이고, 당신의 프로젝트가 아직 @import 규칙 대신 @use를 사용하도록 이상적이고 직관적인 구조를 가지고 있다면, 공식 마이그레이션 도구를 활용하도록 초대합니다. 그리고...

![이미지](/assets/img/CommonSenseofStyleSheetsRefactoring_0.png)

여전히 여기 계시다면, 상황은 아마도 일시적으로 대부분 휴무 상태일 것입니다. 따라서 이번에 우리가 접근할 일을 좀 더 실용적으로 다루는 제 글에 다루어지는 더 많은 팁, 트릭, 현실 세계에서의 책에는 없는 결정 및 그들의 훌륭한 동기부여가 함께하기 전에 일반적인 아이디어를 공유하겠습니다.

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

당신이 "안전 기준은 피로 쓰여진다"는 말을 들어본 적이 있을 것이라고 가정해 봅니다. 우리에게는 CSS 관점에서 행동이 훨씬 더 폭력적하지 않지만 우리의 경우에는 "스타일 시트 리팩토링 규칙은 git 리셋에 쓰여 있다"라는 말로 바꿀 수 있습니다. 여기에 나의 목록이 있습니다:

- 목표를 기억하세요
- 초점을 낭비하지 마세요
- 프로젝트 전체에서 찾아 바꾸기에 크게 의존하지 마세요. 한 번에 해서도 안 되요.
- 증분하세요
- 반복하세요

이러한 명언들을 하나씩 모두 이해해보겠습니다. 각각 짧은 주석과 함께 중첩 목록으로 설명하겠습니다. 이를 통해 저 스스로 피해야 할 몇 가지 함정을 요약해 보겠습니다.

# 목표를 기억하세요

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

우선 무엇을 하고 있는지 절대 잊지 마세요. 결국 리팩터링하고 기술 부채를 줄이는 이야기를 하는 것이니, 개선할 여지가 있을 것이라는 것은 불가피할 거예요 (적어도 제 경우엔 많아요). 위험한 부분은 작아 보일 때 입니다. 그것들에 손대지 마세요, 정말로 절대로요.

![CommonSenseofStyleSheetsRefactoring_1.png](/assets/img/CommonSenseofStyleSheetsRefactoring_1.png)

- 코드 검토가 어려워집니다. 변경 사항의 범위를 지속적으로 확장하면 PR을 따라가기 어려워질 뿐더러, 갑작스럽고 랜덤하게 바뀐 변경 사항의 논리도 곧 잊게 될 거예요.
- 집중력이 떨어집니다. 범위를 벗어난 변경 사항은 새로운 도전을 제기하며, 초기 작업에서 멀어지게 됩니다.
- 계획이 충분하지 않은 채 작업하면 실수할 확률이 높아집니다. "개선의 여지"를 발견했더라도 아예 다른 작업을 하고 있는 상황에서 이를 수정한다면, 아직 패턴을 보지 못했거나 일관성이 없어서 제대로 수정할 기회가 거의 없을 거에요.
- 노드 버전과 같은 중요한 방해요인들을 만날 수도 있습니다. 버전 방해요인들이 최악이죠: 업데이트가 작동 중인 부분에 영향을 주지 않을 것을 확신할 수 없으며, 다른 의존성에 영향을 주지 않도록 패키지의 여러 버전을 사용해야 할 수도 있어요.
- 그리고 무엇보다도, 한 번에 여러 문제에 대한 해결책을 섞으면 아주 작은 이득을 보기 어려울 거예요 (해결 방법이 있다면 댓글에 알려주세요).

# 집중력을 흔들지 마세요

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

집중력을 유지하는 중요성은 위의 내용을 일부 다루고 있지만, 이 조언을 따른다면 무엇을 얻게 될지 소개해 드릴게요.

![이미지](/assets/img/CommonSenseofStyleSheetsRefactoring_2.png)

- 초기 작업을 할 때, 준비가 되어 있어요. 가정하는 바로는, 여러분이나 다른 분이 숙제를 제대로 해오셨을 것이고 시행 계획이 마련되어 있어 따르기 쉽습니다.
- 이러한 종류의 작업은 이동이나 지루해서 재미있는 일이 아니에요. 진지할 때, 주의를 기타 요인들에게 돌리지 않고 일관되게 유지하면 프로젝트를 통해 자연스럽게 빨리 전진할 거에요. 나중에 사용할 내용을 기억해 두세요.
- 진행하면서 머리 속에 추가 정보가 필요하지 않아요. 무언가 발생하면, 메모에 추가하거나 추가로 처리할 사항이 있는지 또는 진행 중인 작업과 직접 관련된 문제를 해결하세요.

# FIND & REPLACE에 지나치게 의존하지 마세요

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

음, 지금 모든 것이 잘 되고 있는 것 같아요. 당신은 코드를 한 번에 하나씩 처리하고 패턴을 완벽하게 이해하고 있어요. 우리는 결국 프로그래머니까요, 우리 아름다운 IDE를 사용해서 정규 표현식을 적용하고 자동으로 처리하면 되지 않을까요?

![이미지](/assets/img/CommonSenseofStyleSheetsRefactoring_3.png)

그 이유는 우리가 인간이고 우리의 코드가 완벽하지 않기 때문이죠. 하지만 여기에 있는 위험을 살펴볼게요:

- 문제가 생기면(그리고 생길 거에요), 변경사항을 되돌려놔야 할 수도 있어요. 문제가 발생한 시점을 추측할 방법이 없기 때문이죠.
- 어떤 페이지나 조각들은 다양한 이유로 이상적인 정규 표현식 패턴에서 벗어날 수 있어요. 심지어 어떤 마법 같은 이유로 모든 것이 정상으로 보일지라도 누락된 부분을 찾는 것이 굉장히 어려울 거에요.
- 이전에 추천된 것을 무시했다면, 아마 다른 변경 사항을 수행해 왔을 거에요. 그런데 다시 되돌릴 예정이라면 놓치기가 어렵습니다. 왜냐하면 실제로 좋은 변경 사항일 수 있기 때문이죠.
- 리팩토링을 파일별로 검토한 후에 FIND & REPLACE 체크를 다양한 정규 표현식 패턴으로 실행해 주세요. 다시 한번, 우리는 완벽하지 않기 때문이에요.

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

# 증가

위에 대부분이 DON’Ts로 채워져 있으니, 여기에는 읽었던 내용을 기반으로 한 몇 가지 DOs가 있습니다:

- 각 파일 그룹마다 변경 사항을 시각적으로 확인하고 리뷰어를 위해 매핑하십시오. @import에서 @use로의 이주 시나리오에는 해당되지 않습니다. 모든 스타일이 기본적으로 영향을 받기 때문입니다. 이 경우 가장 많이 방문되는 페이지 및 가장 많은 영향을 받는 구성 요소를 알아내십시오.
- 리팩토링하는 동안 추가 개선 사항에 대해 물리적인 노트를 작성하십시오. 정신적인 노트가 아닙니다. 지침을 따르고 있고 해결하고 싶어하는 결함이 명백하더라도, 현재 작업이 끝날 때까지 그것들을 잊을 가능성이 높습니다.
- 추가 개선 사항 및 패턴에 대해 정보를 수집하지만 그것들에 집중하지 말고, 한 번에 한 작업에 집중하십시오. 기억하시나요?
- 무시될 가능성이 가장 높은 작은 부분을 목표로 삼으십시오. 그리고 그것들이 쉬운 부분이라고 희망하지 마십시오.

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

# 이터레이트

축하해요! 프로젝트에서 100개 이상의 파일을 변경한 작은 개선 작업을 완료했군요. 그 다음 단계는 무엇일까요?

![이미지](/assets/img/CommonSenseofStyleSheetsRefactoring_5.png)

- 프로젝트 일부를 새롭게 살펴보거나 처음부터 참여하지 않았을 경우 몇 가지 통찰을 얻을 수 있었을 거에요.
- 다음에 뭘 할지에 대한 아이디어를 얻었고, 다음 단계를 위해 더 많은 정보를 얻게 되었을 거에요.
- 리뷰 과정에서 다른 사람들의 삶을 과도하게 복잡하게 만들지 않아서 (또는 적어도 그렇게 느끼지 않게 해서) 사람들이 다음 프로젝트를 흔들 수 있는 풀 리퀘스트에 대비할 준비가 되어 있어요.
- 기술 부채를 실제로 줄이고 당면한 작업을 해결했어요.

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

# 마무리로

그 추천들이 전부 상식적이고 모든 상황에 적용되는 것은 아님을 깨달았어요. 몇 가지가 엄청나게 분명한 것들도 있죠!

![이미지](/assets/img/CommonSenseofStyleSheetsRefactoring_6.png)

하지만, 부디 친절하게 도와주세요. 다음에 이따금 미약하고 작고 사소한 작업을 너무 기능 중심적인 개발자에게 부탁할 때, 혹은 최근에 프로젝트에 합류한 개발자에게 부탁할 때, 혹은 그냥 충분히 시니어가 아닌 경우... 이 기사를 그들에게 보내주시고 여러분의 의견을 추가해주시면, 그들이 전문가로서의 청년 시기를 힘든 방법으로 경험하지 않도록 도와주세요.

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

그리고 기억하세요, 비즈니스가 리팩터링에서 즉각적인 이익을 보지 못하더라도, 여러분은 그곳에서 돈을 조금 절약하여 프로젝트를 더 현대적이고 가독성이 좋은 상태로 만들었습니다.
