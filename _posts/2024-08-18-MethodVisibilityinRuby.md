---
title: "루비에서 메소드 가시성 설정하기 public, private, protected"
description: ""
coverImage: "/assets/img/2024-08-18-MethodVisibilityinRuby_0.png"
date: 2024-08-18 11:39
ogImage: 
  url: /assets/img/2024-08-18-MethodVisibilityinRuby_0.png
tag: Tech
originalTitle: "Method Visibility in Ruby"
link: "https://medium.com/@patrykrogedu/method-visibility-in-ruby-cc4038804210"
isUpdated: false
---


![MethodVisibilityinRuby_0](/assets/img/2024-08-18-MethodVisibilityinRuby_0.png)

루비 온 레일즈 백앤드 개발자로 활동 중이신 분이시라면, 루비로 코드를 개발할 때 메소드 가시성에 대해 걱정할 필요 없이 쉽게 개발을 진행할 수 있다는 것에 익숙할 것입니다. 그러나 메소드 가시성을 현명하게 활용하지 않으면 장기적인 유지보수 작업에 도전을 야기할 수 있습니다. 이 블로그 글에서는 루비에서 메소드 가시성의 중요성, 코드 유지보수에 미치는 영향, 그리고 효과적으로 구현하는 가장 좋은 방법에 대해 알아보겠습니다.

# 메소드 가시성 이해

루비에서는 세 가지 수준의 메소드 가시성이 있습니다:

<div class="content-ad"></div>

- 공개(Public)
- 보호(Protected)
- 비공개(Private)

기본적으로 루비의 모든 메소드는 명시적으로 지정하지 않은 경우 공개(public)입니다. 왜 이 문제가 중요한지, 코드 유지보수에 어떤 영향을 미치는지 살펴봅시다.

# 메소드 가시성의 중요성

# 공개 메소드: 지원되는 인터페이스

<div class="content-ad"></div>

퍼블릭 메서드는 사용자에게 해당 객체의 지원 인터페이스의 일부라는 신호를 보냅니다. 이것은 다음을 의미합니다:

- 라이브러리의 주요 업데이트에서만 변경해야 합니다
- 코드와 사용자 간의 계약을 형성합니다

# 프로텍티드 및 프라이빗 메서드: 구현 세부 정보

프로텍티드 및 프라이빗 메서드는 구현 세부 정보임을 나타내며 언제든지 변경될 수 있습니다. 이 차이는 장기 유지에 중요합니다.

<div class="content-ad"></div>

# 유지보수에 미치는 영향

두 가지 시나리오를 고려해보세요:

- 100개의 공개 메서드를 가진 객체
- 1개의 공개 메서드와 99개의 비공개 메서드를 가진 객체

두 번째 시나리오가 유지보수하기 훨씬 쉬운 이유는:

<div class="content-ad"></div>

- 한 공개 메서드의 동작 일관성을 유지해야 합니다
- 99개의 비공개 메서드를 필요에 맞게 변경하거나 제거할 수 있습니다. 이때 공개 인터페이스를 깨뜨리지 않아야 합니다.

## 메서드 가시성에 대한 최상의 실천 방법

- 기본적으로 비공개로 설정: 의심스러울 때, 메서드를 비공개로 만드세요. 지원 인터페이스의 일부가 될 필요가 확실한 경우에만 공개로 설정하세요.
- 공개 메서드 최소화: 유지 보수 부담을 줄이기 위해 가능한 한 적은 공개 메서드를 가지도록 노력하세요.
- 보호된 것은 조심스럽게 사용: 내부적으로 라이브러리 내에서 메서드를 호출해야 하는 경우에만 성능 오버헤드를 피하기 위해 보호된 가시성을 유지하세요.
- 상수 가시성 검토: 사용자에 노출하고 싶지 않은 상수에 대해 private_constant를 사용하세요.

## 가시성 실수 수정하기

<div class="content-ad"></div>

만약 실수로 메서드를 공개(public)로 지정했지만 사실은 비공개(private)로 설정해야 한다면, 점진적으로 가시성(visibility)을 변경하는 다음 방법을 사용할 수 있습니다:

```js
class MethodVis
  private def method_missing(sym, ...)
    if sym == :foo
      warn("foo는 보호된 메서드입니다. 호출 중지하세요!", uplevel: 1)
      return foo(...)
    end
    super
  end
end
```

상수(constant)의 경우:

```js
class ConstantVis
  def self.const_missing(const)
    if const == :PRIVATE
      warn("ConstantVis::PRIVATE는 비공개 상수입니다. 액세스 중지하세요!", uplevel: 1)
      return PRIVATE
    end
    super
  end
end
```

<div class="content-ad"></div>

# 위임 처리

위임은 루비에서 흔히 사용되는 패턴으로, 메서드 호출을 래핑하여 동작을 추가하는 데 자주 사용됩니다. 여기 위임 처리에 대한 몇 가지 모범 사례가 있습니다:

## deprecation 경고와 함께 메서드 이름 변경

```js
def foo(...)
  warn("foo가 bar로 이름이 변경되고 있습니다", uplevel: 1)
  bar(...)
end
```

<div class="content-ad"></div>

# 다른 객체로 위임하기

간단한 위임을 위해:

```js
class A
  def foo(...)
    b.foo(...)
  end
end
```

여러 개의 위임을 하려면 forwardable 라이브러리를 사용하세요:

<div class="content-ad"></div>

```js
require 'forwardable'

class A
  extend Forwardable
  def_delegators :b, :foo, :bar, :baz
end
```

# 결론

메소드 가시성은 Ruby에서 강력한 도구로, 현명하게 사용할 경우 코드의 장기간 유지보수성을 크게 향상시킬 수 있습니다. 어떤 메소드가 공개(public)되어야 하는지와 어떤 메소드가 비공개(private)되어야 하는지 신중히 고려함으로써 Ruby 라이브러리와 애플리케이션을 위한 더 깔끔하고 견고한 API를 만들 수 있습니다.

# 용어 해설


<div class="content-ad"></div>

- 메소드 가시성: 루비에서 메소드에 적용되는 액세스 제어 수준 (public, protected, 또는 private).
- 위임: 한 메소드에서 다른 메소드로 메소드 인수를 전달하는 실천 방법으로, 종종 메소드 호출을 래핑하거나 동작을 추가하는 데 사용됩니다.
- Forwardable: 메소드 위임을 단순화하는 루비 표준 라이브러리입니다.