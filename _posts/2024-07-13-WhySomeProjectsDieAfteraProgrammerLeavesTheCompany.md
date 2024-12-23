---
title: "프로그래머가 회사를 떠난 후 프로젝트가 죽는 5가지 이유"
description: ""
coverImage: "/assets/img/2024-07-13-WhySomeProjectsDieAfteraProgrammerLeavesTheCompany_0.png"
date: 2024-07-13 21:05
ogImage:
  url: /assets/img/2024-07-13-WhySomeProjectsDieAfteraProgrammerLeavesTheCompany_0.png
tag: Tech
originalTitle: "Why Some Projects “Die” After a Programmer Leaves The Company"
link: "https://medium.com/python-in-plain-english/why-some-projects-die-after-a-programmer-leaves-the-company-361e55dd44ba"
isUpdated: true
---

이 글에서는 프로그래머가 회사를 떠난 후 프로젝트가 종료되는 주요 이유 중 하나에 대해 이야기하겠습니다. 여기에 언급된 몇 가지 이유를 피할 수 있도록 좋고 나쁜 실제 사례를 함께 살펴보겠습니다.

![프로젝트 종료 이미지](/assets/img/2024-07-13-WhySomeProjectsDieAfteraProgrammerLeavesTheCompany_0.png)

# 소개

특정 회사에서 근무하는 동안 작업한 프로젝트가 무슨 일이 있었는지 궁금했던 적이 있나요?

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

항상 그렇게 하고 있어요. 예전 동료들과 프로젝트가 여전히 사용되고 유지되고 있는지 확인하려고 노력해요.

자만심 때문이 아니에요. 제가 많은 시간을 투자한 프로젝트가 번성하고 목적을 잘 이루는 걸 보고 싶어요.

최근에는 몇몇 '코드 리팩터링'에 책임이 있었는데요, '리팩터링이 필요함'으로 표시된 프로젝트에 대해 설명하고 싶어요.

이 글에서 다룰 내용이에요.

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

- "프로젝트를 '리팩터링이 필요한' 상태로 만드는 것은 무엇인가요?"

이것은 개인적인 통찰력이며 개인적인 경험과 프로젝트 구조화 및 유지 보수에 대한 귀하의 회사의 작동 방식과 일치해야 합니다.

프로그래머로서 귀하의 역할은 작업할 수 있는 최상의 코드를 작성하여 기능적이면서도 장기적으로 작업할 수 있는 코드로 만드는 것입니다.

## "리팩터링이 가능한" 프로젝트의 특징

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

이것은 돌에 새겨진 것이 아니며, 프로젝트에 "리팩토링이 필요하다"로 표시될 수 있는 다양한 이유가 있습니다.

최근에 리팩토링한 프로젝트를 기반으로, 우리 스스로 피할 수 있도록 이유들을 분석해 보겠습니다:

- 코드가 동작하는데만 집중하는 경우

코드가 예상대로 동작하는 것에는 문제가 없습니다. 말 그대로, 첫 번째 목표는 시스템이 예상대로 동작하도록 하는 것이죠.

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

새로운 기능이 필요할 때 문제가 발생합니다. 우리 시스템을 살아있는 존재라고 생각할 수 있는데, 변화는 항상 뒤따릅니다.

우리 코드는 우리의 요구에 맞게 변경하고 성장할 준비가 되어 있어야 합니다. 그렇지 않으면 다시 구조화되거나 더 나쁜 경우에는 폐기될 운명입니다.

-- 혼돈스러운 이름을 가진 조직화되지 않은 프로젝트

“그 사람”이 되지 마세요.

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

코드를 읽는 것은 무서운 경험일 필요는 없어요. 그러나 몇몇 프로젝트의 패키지와 폴더를 탐색하는 것은 공포 영화를 보는 것 같아서, 일이 어떻게 이루어지는지 이해하기 어려울 수 있어요.

의존성이 섞이거나 제대로 구조화되지 않은 프로젝트는 100% "리팩토링 필요"로 표시될 거예요.

제 코드를 정리할 때는 누군가의 입장에 서보려고 노력해요. 내가 모듈과 패키지를 어떻게 구성하는지 이해하기 쉬운가요? 휴가 중이라면 제 동료가 쉽게 따라갈 수 있을까요?

이 질문에 대답하는 것은 어려운 일이에요. 사람들이 다르게 생각하고, 각 프로그래머가 자신만의 방식을 갖고 있기 때문이죠.

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

— 문서화되지 않은 프로젝트 또는 부실한 문서

이 문제에서 나는 악당입니다.

내 프로젝트가 아직 사용되고 있는지 전사를 확인하기로 했다고 말한 이유 중 하나는 문서화에 대해 더 나은 작업을 할 수 있었기 때문입니다.

우리의 코드를 문서화하는 것은 다양한 형태를 갖을 수 있습니다. 전체 시스템 작동 방식에 대한 end-to-end 문서를 생성할 수도 있습니다.

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

해당 문서 유형에는 플로우차트, 요구 사항 등이 포함됩니다.

그러나 우리의 프로젝트에서 다른 프로그래머가 작업하는 것을 확실하게 하려면, 우리가 회사를 떠나거나 동료로서 작업하더라도, 코드에 주석을 다는 것이 좋은 시작점이 될 수 있습니다.

일부 도구를 사용하면 코드 내 주석을 기반으로 문서를 생성할 수 있습니다.

- 하드코딩된 값 및 데이터 구조의 미비함

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

가끔은 일부 값을 하드코딩하는 것도 괜찮다는 것을 이해합니다.

그러나 프로젝트가 하드코딩된 값으로 가득 차 있으면 무엇이 깨질까 두렵기 때문에 확장하기가 굉장히 어려워집니다.

하드코딩된 값이 무엇인지 모르겠다면 설명드리겠습니다.

프로그래머가 코드 내부에 값을 명시적으로 넣는 것을 의미하며 환경 변수를 사용하거나 외부 독립적인 소스에서 값을 가져오는 대신 값을 하드코딩하는 것입니다.

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

```js
username = "yanick_user" # username에 대한 하드코딩 값
role = "admin" # role에 대한 하드코딩 값
```

요렇게 하는 것은 좋은 방법이 아닙니다! 만약 사용자 이름이 변경된다면 어떻게 되겠습니까? 사용자가 회사를 떠나서 사용자 이름이 비활성화된다면 어떻게 될까요? 역할 이름이 변경되었을 때는 어떡하죠?

이런 경우마다 코드를 계속 변경해야 합니다. 의존성이 연쇄적으로 발생하는 시나리오를 상상해보세요.

문제가 쉽게 발생할 수 있습니다.

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

```js
import os

username = os.getenv("USERNAME")
role = os.getenv("ADMIN_ROLE")
```

또 하나 자주 보이는 것은 더 나은 데이터 구조(Data Structure, DS)의 필요성입니다. 데이터 구조에 대한 좋은 이해는 우리의 코드에 많은 도움이 될 수 있습니다.

시스템이 다룰 데이터를 안다면, 이것은 여러분, 인터프리터 및 여러분의 프로젝트에 참여할 수 있는 사람들의 삶을 더 쉽게 만들 수 있습니다. 좋은 데이터 구조를 만드세요.

```js
def do_something(args):
    if args.get("some_key") == "admin":
        user = args.get("user_key")
        ...
```

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

내가 어떻게 생각하는지는 모르겠지만, 나에게는 이 코드가 너무 엉망이고 따라가기 어려운 것 같아. args가 뭐지? args에서 어떤 다른 키들을 가져올 수 있고, 어떤 키가 필수인지 아닌지 알 수 있을까?

Python에서는 dataclass를 사용해 객체의 구조를 알고 있다면 매우 쉽게 객체를 표현할 수 있어:

```python
from dataclasses import dataclass

@dataclass
class Myclass:
    user_key: str
    some_key: str
```

그렇게 하면 이전의 do_something 함수를 리팩터링하고 더 쉽게 따라갈 수 있게 만들 수 있어:

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

```js
import os

ADMIN_ROLE = os.getenv("ADMIN_ROLE")

def do_something(args: Myclass):
    if args.some_key == ADMIN_ROLE:
        user = args.user_key
        ...
```

- 테스트 부재 또는 전혀 테스트가 없음

다시 말하지만, 이 문제는 나의 탓입니다.

정직하게 말하자면, 현재 회사로 이직한 후에 테스트를 적극적으로 작성하기 시작했습니다.

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

실전에서 테스트 작성의 중요성을 이해했어요. 테스트를 작성함으로써, 우리는 우리의 코드가 예상대로 작동하는지만 확인하는 것뿐만 아니라 시스템과 상호작용하고 사용하는 방법의 안내서 및 예시로도 사용할 수 있어요.

그러니 가능한 경우 테스트를 꼭 작성해 보세요.

## 결론

어떻게 피할 수 있을까요?

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

이 질문은 조금 까다로운 문제인 것 같아요. 제가 정확하게 답변할 수 있는지 모르겠거나 이 질문에 100% 확신을 가진 누군가가 있는지도 모르겠어요.

하지만 저는 방금 전 설명한 몇 가지 사항을 피하고 자신의 경험을 더 많이 살펴본다면, 올바른 길을 가고 있다고 확신해요.

저는 가능한 한 시스템 디자인의 최상의 실천 방법을 따르려고 노력하고 있어요.

Python Enhancement Proposals (PEP)를 가끔씩 읽으려고 노력하고 있어요. 항상 새로운 것을 배울 수 있는 것이 있고, Python은 빠르게 성장하는 프로그래밍 언어이기 때문에 우리는 최신 정보를 유지해야 해요.

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

"‘Needs refactoring’로 표시되지 않도록 프로젝트를 개선하는 데 도움이 될 만한 개인적인 경험을 추가할 수 있는 것이 있다면 공유해주세요.

만약 있다면, 공유해주세요.

이 글을 즐겨 읽으셨다면 아마 이 글도 좋게 여기실 것입니다:

더 알고 싶다면, 저는 여러분의 성장을 돕기 위해 Python에 대해 쓰고 있으니 많은 관심 부탁드립니다."

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

표 태그를 Markdown 형식으로 변경하세요.
