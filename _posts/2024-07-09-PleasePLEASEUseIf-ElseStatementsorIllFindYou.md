---
title: "제발, 제발 If-Else 문 사용하기, 아니면 후회할 거예요"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-PleasePLEASEUseIf-ElseStatementsorIllFindYou_0.png"
date: 2024-07-09 14:51
ogImage:
  url: /assets/img/2024-07-09-PleasePLEASEUseIf-ElseStatementsorIllFindYou_0.png
tag: Tech
originalTitle: "Please, PLEASE Use If-Else Statements, or I’ll Find You"
link: "https://medium.com/@jakemer10/please-please-use-if-else-statements-or-ill-find-you-4e4c6af38912"
---

![이미지](/TIL/assets/img/2024-07-09-PleasePLEASEUseIf-ElseStatementsorIllFindYou_0.png)

프로그래밍 세계에서 명확한 조건문이 없는 코드는 미치도록 짜증이 납니다. 교통 부호 없는 도시를 운전하는 것과 같습니다. 난잡하고 혼란스럽고 정말 위험합니다. 그래서 논리적으로 생각한다면, if-else 문을 사용해주세요. 그렇지 않다면, 당신을 찾아가서 강제로 코드 리팩토링을 시킬지도 몰라요.

# 조건문의 아름다움

if-else 문은 프로그래밍에서 의사 결정을 하는 데 중추적인 역할을 합니다. 다양한 조건에 따라 코드가 가지를 치거나 다른 경로를 따라갈 수 있습니다. 이렇게 함으로써 코드가 유연하고 가독성이 좋아지며 유지보수하기 쉬워집니다. 간단한 예제로 설명해보겠습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

만약 온도가 30도를 넘으면:
print("뜨거운 날씨네요, 수분을 충분히 섭취하세요!")
그렇지 않으면:
print("날씨가 좋고 시원해요.")

이 구조를 사용하면 코드를 읽는 사람이 각 메시지가 출력되는 조건을 즉시 이해할 수 있습니다. 명확하고 간결하며 효율적입니다.

# 중첩된 삼항 연산자의 공포

이제 중첩된 삼항 연산자의 공포를 상상해보세요. 다음의 혼돈스러운 예제를 해독하려고 노력하는 것을 상상해보세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

message = "기온이 30도를 넘는 더운 날씨네요! 수분을 충분히 섭취하세요." if temperature > 30 else "날씨가 시원해서 좋네요."

이것은 코드를 간결하게 줄이는 똑똑한 방법인 것 같지만, 조건이 더 복잡해지면 읽기가 굉장히 어려워집니다. 중첩된 삼항 연산자는 마침표가 없는 소설을 읽는 것과 같습니다. 뜻을 이해할 수는 있겠지만, 고통스러운 경험이 될 것입니다.

# 명확성을 위한 이유

명확한 코드는 예의뿐만 아니라 필수적입니다. 깨끗하고 이해하기 쉬운 코드를 작성할 때, 당신뿐만 아니라 미래에 프로젝트에 참여할 수 있는 모든 개발자들에게 도움이 됩니다. 복잡하고 따라가기 어려운 로직이 가득한 코드베이스를 상속받는 상황을 상상해보세요. 당신은 당혹스럽고 오류가 발생하기 쉬운 상황에 처할 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

if-else문을 사용하면 당신의 의도를 명확하게 전달할 수 있습니다. 코드를 읽는 사람에게 로드맵을 제공하여 디버깅, 수정 및 확장을 쉽게 만들 수 있습니다. 아래에는 차이를 보여주기 위한 더 복잡한 예제가 있습니다:

# If-Else 방식

```js
if user.is_logged_in:
    if user.has_permission("admin"):
        display_admin_panel()
    else:
        display_user_dashboard()
else:
    prompt_login()
```

# Ternary 방식

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
display_admin_panel() if user.is_logged_in and user.has_permission("admin") else display_user_dashboard() if user.is_logged_in else prompt_login()
```

어떤 방법을 유지하시겠습니까?

# 개발자들에게 호소

저와 같은 개발자 여러분들에게 작은 부탁이 있습니다. 제 정신 건강과 여러분의 것을 위해, if-else 문을 사용해 주세요. 이것은 좋은 습관뿐만 아니라 생명줄이기도 합니다. 당신의 논리를 하나의 난해한 줄로 압축하려는 유혹이 들 때, 이 글을 기억해 주세요. 언젠가 여러분의 코드를 읽게 될 개발자가 여러분을 감사하며 명료함을 선택했음을 기억해 주세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

그게 만족스럽지 않다면, 기억해둬 — 내가 널 찾을 수 있는 곳을 알고 있다니까.
