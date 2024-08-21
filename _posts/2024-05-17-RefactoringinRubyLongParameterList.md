---
title: "루비에서  긴 매개변수 목록 리팩터링 하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-RefactoringinRubyLongParameterList_0.png"
date: 2024-05-17 03:28
ogImage:
  url: /assets/img/2024-05-17-RefactoringinRubyLongParameterList_0.png
tag: Tech
originalTitle: "Refactoring in Ruby | Long Parameter List"
link: "https://medium.com/@kroolar/refactoring-in-ruby-long-parameter-list-001a78264a02"
isUpdated: true
---

긴 매개변수 목록(Long Parameter List)은 작업을 수행하기 위해 많은 수의 매개변수가 필요한 경우 발생합니다. 일반적으로 두 개 이상의 매개변수를 사용하지 않는 것이 좋습니다.

![image](/assets/img/2024-05-17-RefactoringinRubyLongParameterList_0.png)

루비 언어에 관심이 있다면, 이 언어에서 리팩터링과 디자인 패턴에 대해 더 많이 알아볼 수 있습니다: [RubyHub](https://www.rubyhub.io/). 현재 웹사이트는 개설 중이지만, 미래에 더 다양한 주제가 등장할 것입니다.

# 문제들

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

- 가독성 감소 — 긴 매개변수 목록은 메소드 호출 정의를 읽고 이해하기 어렵게 만들 수 있습니다. 특히 매개변수가 잘 명명되지 않았거나 문서화가 충분하지 않은 경우 더욱 그렇습니다.
- 복잡성 증가 — 많은 매개변수는 종종 메소드나 함수가 너무 많은 작업을 시도하고 단일 책임의 원칙을 위반할 가능성을 나타냅니다.
- 유지보수 도전 — 긴 매개변수 목록은 코드 유지보수를 어렵게 만듭니다. 메소드의 시그니처를 변경할 때 개발자는 해당 메소드의 모든 호출을 업데이트해야 하므로 오류나 일관성 문제가 발생할 수 있습니다.
- 순서 의존성 — 긴 매개변수 목록은 올바른 매개변수 순서에 의존할 수 있으며, 매개변수가 잘못 배치되거나 누락된 경우 오류를 발생시킬 수 있습니다.
- 유연성 제한 — 긴 매개변수 목록에서 매개변수를 추가하거나 제거하는 것은 어려울 수 있는데, 특히 메소드가 코드베이스 전체에서 여러 곳에서 사용되는 경우에 해당됩니다.
- 테스트 복잡성 — 긴 매개변수 목록을 갖는 메소드를 테스트하는 것은 귀찮을 수 있습니다. 가능한 모든 매개변수 조합을 포함하는 다수의 테스트 케이스를 생성하고 관리해야 합니다.

# 해결책

- 옵션 해시 — 관련된 매개변수를 옵션 해시 매개변수로 통합하세요. 이 접근 방식은 메소드 호출을 더 간결하고 유연하게 만들어줍니다. 매개변수를 추가하거나 제거해도 메소드 시그니처를 변경할 필요가 없도록 합니다. 또한 명명된 매개변수를 제공하여 가독성을 향상시킵니다.
- 매개변수 객체 — 관련된 매개변수를 하나의 객체로 묶어주세요. 매개변수 객체는 그들의 동작을 캡슐화하여 메소드 시그니처의 복잡성을 줄이고 코드 가독성을 높이는 데 도움이 됩니다.
- 기본 및 명명된 매개변수 활용 — 기본 매개변수 값과 명명된 매개변수를 활용하여 메소드 호출을 간소화하세요. 기본 값은 매개변수에 논리적인 기본값을 제공하며, 명명된 매개변수는 전달되는 인수를 명시적으로 지정하여 메소드의 명확성을 향상시킵니다.
- 더 작은 함수로 리팩토링 — 함수에 너무 많은 매개변수가 있다면, 너무 많은 작업을 수행할 수 있습니다. 더 작고 집중된 함수로 함수를 리팩토링하는 것을 고려해 보세요.

# 실제 예제

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

루비에서 코드 예제를 살펴보겠습니다. 매개변수 목록이 긴 update_user 메서드가 있고, 이를 옵션 해시 기술을 사용하여 리팩터링할 것입니다.

```js
def update_user(id, first_name, last_name, age, address, is_admin)
  user = User.find(id)

  user.update(
    first_name: first_name,
    last_name: last_name,
    age: age,
    address: address,
    is_admin: is_admin
  )
end

update_user(1, "John", "Doe", 25, "Baker Street", false)
```

이 리팩터링된 코드에서는 매개변수를 params 해시로 통합했습니다. 이렇게 하면 메서드 호출이 더 가독성 있어지고 매개변수를 유연하게 제공할 수 있습니다. is_admin 매개변수가 제공되지 않으면 기본값이 할당됩니다.

```js
def update_user(params = {})
  user = User.find(params[:id])

  user.update(
    first_name: params[:first_name],
    last_name: params[:last_name],
    age: params[:age],
    address: params[:address],
    is_admin: params.fetch(:is_admin, false)
  )
end

user_params = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  age: 25,
  address: "Baker Street"
}

update_user(user_params)
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

# 장단점

## 장점

- 향상된 가독성 — 옵션 해시를 사용하면 메소드 호출이 이름있는 매개변수를 제공하여 더 읽기 쉽습니다. 개발자는 각 매개변수가 무엇을 나타내는지 쉽게 이해할 수 있어, 매개변수의 위치에 의존하지 않아도 됩니다.
- 유연성 — 옵션 해시 접근 방식을 통해 매개변수를 제공하는 데 유연성을 가질 수 있습니다. 매개변수를 추가, 제거 또는 수정하더라도 메소드 서명을 변경하지 않아도 되므로 코드를 변경에 더 적응 가능합니다.
- 기본 매개변수 값 — 기본 매개변수 값을 메소드 내에서 쉽게 정의할 수 있어, 메서드 호출을 간단하게 만들고 필수 매개변수가 제공되지 않은 경우 합리적인 기본값을 갖게 할 수 있습니다.
- 인지 부담 감소 — 이름있는 매개변수와 선택적 기본값을 사용함으로써 개발자는 매개변수의 순서나 기본값을 기억할 필요가 없어지며, 인지 부담이 줄어들고 잠재적인 오류를 줄일 수 있습니다.
- 더 쉬운 유지 보수 — 긴 매개변수 목록을 옵션 해시로 리팩토링함으로써 메소드 서명을 단순화하여 코드를 보다 쉽게 유지보수할 수 있습니다. 개발자들은 많은 매개변수를 관리하는 대신 메소드의 로직에 집중할 수 있습니다.

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

- 추가 복잡성— 옵션 해시 기법은 메소드 서명을 간소화하지만 메소드 구현 내에서 추가적인 복잡성을 도입합니다. 개발자는 옵션 해시에서 매개변수 추출을 처리해야 하며, 이는 보일러플레이트 코드를 추가할 수 있습니다.
- 스펠링 오류가 발생할 수 있는 가능성— 옵션 해시는 심볼 키에 의존하기 때문에 매개변수 이름을 철자를 틀리게 쓸 위험이 있습니다. 이는 런타임 오류로 이어질 수 있으며, 디버깅하기 어려운 문제가 발생할 수 있습니다.
- 덜 엄격한 매개변수 유효성 검사— 누락된 매개변수가 오류를 유발하는 명시적인 매개변수 목록과는 달리, 옵션 해시 접근 방식은 누락된 매개변수가 nil 또는 기본값으로 설정되는 것을 허용합니다. 이러한 유연성은 덜 엄격한 매개변수 유효성 검사를 유발할 수 있으며, 예상치 못한 동작을 초래할 수 있습니다.
- 기본값의 남발— 기본 매개변수 값은 유연성을 제공하지만, 기본값에 과도하게 의존하면 메소드의 의도가 모호해지고 메소드 구현을 검사하지 않고는 동작을 이해하기 어려워질 수 있습니다.

![이미지](/assets/img/2024-05-17-RefactoringinRubyLongParameterList_1.png)

저는 루비에서 리팩터링에 대한 책을 작업하고 있습니다. 이 주제에 관심이 있으시면, 제 뉴스레터에 가입하실 수 있습니다 📪️: https://mailchi.mp/e3dd49dfada1/medium. 구독자분들은 출판 후 즉시 제 이북 링크를 무료로 받아보실 수 있습니다. 🆓
