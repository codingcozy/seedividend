---
title: "Julia의 슈퍼타입 파워 활용법"
description: ""
coverImage: "/assets/img/2024-07-13-UnleashingthePoweroftheJuliaSuperType_0.png"
date: 2024-07-13 21:28
ogImage: 
  url: /assets/img/2024-07-13-UnleashingthePoweroftheJuliaSuperType_0.png
tag: Tech
originalTitle: "Unleashing the Power of the Julia SuperType"
link: "https://medium.com/towards-data-science/unleashing-the-power-of-the-julia-supertype-bb369209efca"
---


![Julia Super Type](/assets/img/2024-07-13-UnleashingthePoweroftheJuliaSuperType_0.png)

## 소개

다양한 프로그래밍 언어를 탐험하는 데 흥미로운 것 중 하나는 다른 패러다임이 다른 유형의 문제를 해결하는 방식입니다. 프로그래밍에서는 현대 프로그래밍 언어에서 기대할 수 있는 기능이 많이 있습니다. 예를 들어, 범위, 다형성, 추상화 등이 있습니다. 특정 분야에서 특정 응용프로그램에서 뚜렷한 사용 사례를 가지는 패러다임이 있습니다. 이러한 기능은 다양한 접근 방식을 사용하여 프로그래밍 패러다임의 스펙트럼 전체에 구현됩니다. 특이한 패러다임을 가진 언어가 이러한 일반적인 프로그래밍 개념을 구현할 때 관심을 끌기 시작합니다. 그 중 하나가 Julia 프로그래밍 언어입니다.

Julia 프로그래밍 언어는 최근 몇 년 동안 프로그래밍 세계에 등장한 가장 흥미로운 발전 중 하나입니다. 프로그래밍의 세계는 수십 년 동안 다양한 문제를 해결하는 데 매우 효과적인 이념적 접근 방식을 만들기 위해 연마된 선택적 패러다임 몇 가지에 익숙해져 있습니다. Julia는 작업을 완료하는 데 일반적인 프로그래밍 개념을 많이 활용하지만, 언어의 패러다임 자체가 극도로 독특하며 종종 다른 방식으로 작업을 수행하게 됩니다. 이것을 다중 디스패치 프로그래밍 패러다임이라고 부릅니다. 이 패러다임은 데이터 과학자들이 하는 것과 정확히 일치하는 프로그래밍 패러다임입니다.

<div class="content-ad"></div>

이 프로그래밍 패러다임 관계로, Julia는 일반적인 프로그래밍 개념을 구현하기 위해 조금 기어들었습니다. 이는 Julia 전반에 걸쳐 다양한 용량에서 나타납니다. 이러한 모든 개념들은 다중 디스패치 패러다임의 강력한 능력으로 돌아갑니다. 숙련된 프로그래머들에게는 이것이 놀랍도록 강력한 패러다임일 수 있다고 생각합니다! 그러나, 어떤 패러다임이든 활용할 수 있는 도구를 알아내는 것이 중요합니다. Julian 패러다임에 훌륭하게 적합한 기법 중 하나는 추상화의 Julian 구현입니다.

데이터 과학에서 추상화는 핵심적인 기법이 될 것입니다. 데이터 과학에서 관측치는 다양한 유형으로 나타날 수 있으며, 이러한 다양성을 고려할 때 다형성 같은 요소가 매우 효과적일 수 있습니다.

예상대로, Julian 추상화는 다중 디스패치를 사용하여 구현됩니다. 그러나, 이 방식으로 다중 디스패치를 사용하는 데 있어서 몇 가지 세심한 점이 있고 이러한 점들은 주목할 가치가 있습니다. 그래서, 더 이상 두고 볼 것 없이 Julia에서 추상화의 내부와 외부를 검토해 보겠습니다!

## 수퍼 타입 기본.subplots of abstraction in Julia!

<div class="content-ad"></div>

우리만의 슈퍼 타입을 생성하기 위해 시작할 때, 추상 타입 구문에 친숙해지려고 합니다. 추상 타입은 필드가 전혀 없이 이름만으로 존재하는 모호하게 정의된 타입입니다. 이러한 이름들을 서로 다른 조직으로 사용하여 타입 계층 구조의 제한된 수준에 메소드를 적용할 수 있습니다. 좋은 예로는 숫자가 있습니다.

Julia에서 숫자는 몇 가지 다른 실용적인 범주에 따라 구성됩니다. 서로 다른 숫자 타입을 계층적으로 구성하는 결과 구조는 타입 계층 구조라고 합니다. Julia에서 이 타입 계층 구조는 항상 Any로 시작합니다. Any는 Julia의 모든 타입이 하위 타입인 추상 타입입니다. 이 계층 구조의 숫자 부분은 Number로 시작하여 Real numbers로 진행됩니다. 이어서 Integers와 같은 작업을 진행합니다.

![타입 계층 구조 이미지](/assets/img/2024-07-13-UnleashingthePoweroftheJuliaSuperType_1.png)

Julia 내에서 추상화와 상호 작용하기 위한 주요 도구는 서브 타입 연산자, `:`입니다. 이것은 비트별 부울 연산자로, 두 피연산자에 따라 true 또는 false를 반환하는 것을 의미합니다. 이 조건은 첫 번째 피연산자가 두 번째 피연산자의 하위 타입인 경우에 true가 됩니다. 이 경우 첫 번째 피연산자는 타입 또는 추상 타입이 될 것입니다. 두 번째 피연산자는 항상 추상 타입이 됩니다. 왜냐하면 무언가는 추상 타입의 하위 타입일 수밖에 없기 때문입니다.

<div class="content-ad"></div>

```js
# 모든 것 <: 아무거나!
숫자 <: 아무거나
참

Int64 <: 숫자
참

Int64 <: AbstractString
거짓
```

이 연산자는 또 다른 두 가지 상황에서도 사용됩니다. 이 중 하나는 다중 디스패치이고, 다른 하나는 타입을 하위 타입으로 할당하는 것입니다. 후자는 슈퍼 타입 또는 일반 타입을 대상으로 할 수 있습니다. 이것은 정의 뒤에 하위 타입 연산자를 제공하고 그 아래에 원하는 타입을 지정하여 수행됩니다.

```js
# Any로 <: 할 필요는 없습니다. 이것은 단지 예제로만 넣은 것입니다.
# 어떻게 이루어지는지 보여주기 위함입니다.

abstract type AbstractExample <: 아무거나 끝

struct Example <: AbstractExample

end
```

## 슈퍼 타입 디스패치


<div class="content-ad"></div>

이러한 유형의 등위 구조를 만드는 것은 좋지만, 이를 여러 디스패치와 함께 활용하는 것이 훨씬 더 좋습니다. 여러 디스패치를 사용하면 우리가 원하는 정확한 레벨로 디스패치할 수 있어서 특정 카테고리만 포괄하는 함수를 생성할 수 있습니다. 다음의 경우, 임의의 정수 또는 부동 소수점 숫자는 이 함수 내에서 다르게 처리됩니다:

```js
remainder(x::Integer) = 0

remainder(x::AbstractFloat) = x - floor(x)
```

마찬가지로, 이러한 함수의 기능이 동일한 경우에는 레벨을 올려 Real을 디스패치하고 한 함수를 생성할 수 있습니다. 이것은 작업을 완벽하게 처리하는 매우 간단한 구현입니다.

이 문맥에서 디스패치를 사용할 때의 한 가지 주의점은 하위 유형을 매개변수로 사용하는 것입니다. 예를 들어, 경우에 따라 다음과 같이 보이는 인수가 있을 수 있습니다:

<div class="content-ad"></div>

```js
funcexamp(x::Vector{Number}) = begin

end
```

이 경우에는 숫자가 들어있는 어떤 벡터에도 이 함수가 디스패치되길 원했습니다. 그러나 우리가 작성한 함수는 아닙니다. 대신 'Number' 벡터가 디스패치되었습니다...

```js
julia> myvec = [5, 10]
2-element Vector{Int64}:
  5
 10

julia> funcexamp(myvec)
ERROR: MethodError: no method matching funcexamp(::Vector{Int64})

Closest candidates are:
  funcexamp(::Vector{Number})
   @ Main REPL[1]:1

Stacktrace:
 [1] top-level scope
   @ REPL[3]:1

julia> myvec = Vector{Number}([5, 10])
2-element Vector{Number}:
  5
 10

julia> funcexamp(myvec)
```

여기서의 해결책은 조금 이상한 방법으로 파라미터를 이 디스패치하는 것입니다. 해당 서브타입 연산자를 사용하여 이루어집니다.

<div class="content-ad"></div>

```js
funcexamp(x::Vector{<:Number}) = begin

end
```

놀랍게도 이는 이 연산자의 단항 사용 방식입니다. 이것은 분명히 이상하긴 하지만, 잘 동작하며 논리적으로 다른 방법에서 의미를 갖고 있습니다. 이것은 분명히 주목할 점이지만요.

## 필드

줄리아에서 추상화에 관한 이야기에서 중요한 것 중 하나인 필드에 대해 이야기해 보겠습니다. 간단히 말해, 줄리아는 추상 타입이 필드로 사용되지 않을 것을 선호합니다. 이유는 타입의 필드가 여러 다른 타입일 수 있을 때 줄리아가 성능에 심각한 타격을 입기 때문입니다. 이는 다중 디스패치에도 좋지 않은 실천 방식일 수 있습니다. 아마도 일반적인 함수 생성자를 사용하는 것이 일반적인 구조를 사용하는 것보다 나을 것입니다. 예를 들어, 다음 구조는 아마 좋지 않은 아이디어일 것입니다.

<div class="content-ad"></div>

```js
mutable struct Calculator
   x::Real
   y::AbstractString
end
```

이 경우, Real과 AbstractString 둘 다 애매모호한 필드 유형이에요. 더 나은 필드나 필드 유형을 결정하거나 매개변수를 사용하여 이를 쉽게 해결할 수 있어요. 매개변수를 사용할 때는 해당 매개변수가 될 수 있는 각 항목에 대해 새로운 유형을 만들어요. 다시 말해서, Calculator'Float64'은 Calculator'Int64'와 다른 유형이며 이들 모두의 x 필드는 항상 해당 매개변수 유형이에요. 이를 재구성하기 위해 생성자에 매개변수를 추가하고 필드를 해당 매개변수로 변경해요.

```js
mutable struct Calculator{T}
    x::T
    y::AbstractString
end
```

이 매개변수를 하위 유형으로 지정하여 이 필드에 예상하는 것을 명시적으로 만들 수도 있어요.

<div class="content-ad"></div>

```js
mutable struct Calculator{T <: Real}
    x::T
    y::AbstractString
end
```

y에 대한 경우, 여기에서는 다른 유형을 사용하는 것이 더 나을 수 있는 예시일 수 있습니다. 대부분의 경우, AbstractString 대신에 간단한 String이 더 나을 수 있습니다.

```js
mutable struct Calculator{T <: Real}
    x::T
    y::String
end
```

누군가가 이 Calculator를 생성하는 데 필요한 이 파라미터를 제공해야 합니다. 우리는 내부 생성자를 사용하여 새로운 디스패치를 만들어 이를 변경할 수 있습니다.

<div class="content-ad"></div>

```js
mutable struct Calculator{T <: Real}
    x::T
    y::String
    function Calculator(x::Real, y::AbstractString)
        new{typeof(x)}(x, string(y))
    end
end
```

## 슈퍼타입 내부검사

슈퍼타입 개요에서 마지막으로 언급하고 싶은 것은 슈퍼타입을 내부적으로 살펴볼 수 있는 기능입니다. 이는 Julia에서 다른 내부검사 형태만큼 유용하지는 않지만, 특히 몇 가지를 알아내는 데 유용할 수 있습니다. 가장 명백한 내부검사 형태는 이전에 언급된 것이며, 이는 타입이 추상 타입의 서브타입인지 여부를 구분할 수 있는 능력입니다.

```js
Int64 <: Integer
true
```

<div class="content-ad"></div>

아쉽게도 Julia는 이를 넘어서는 많은 옵션을 제공하지 않습니다. 특정 유형에 대한 좋은 출력물을 얻을 수 있도록하는 것이 가치 있는 작업일 수도 있습니다. Julia 커뮤니티에서 유행한 예쁜 함수가 있습니다.

```js
function subtypetree(t, level=1, indent=4)
    level == 1 && println(t)
    for s in subtypes(t)
        println(join(fill(" ", level * indent)) * string(s))
        subtypetree(s, level+1, indent)
    end
end
subtypetree (generic function with 3 methods)
```

```js
julia> subtypetree(Number)
Number
    Complex
    Real
        AbstractFloat
            BigFloat
            Float16
            Float32
            Float64
        AbstractIrrational
            Irrational
        Integer
            Bool
            Signed
                BigInt
......
```

## 결론

<div class="content-ad"></div>

추상화는 현대 고수준 프로그래밍 언어에서 매우 중요한 도구입니다. 동일한 기능을 여러 곳에서 생성하는 것은 지루하며, 프로그래머들은 이를 파악했습니다. 많은 언어가 극명하게 다른 패러다임을 가지고 있고, 결과적으로 이러한 프로그래밍 개념을 달성하는 데 사용되는 기술은 매우 흥미로울 수 있습니다. 이러한 경우 중 하나는 Julia 언어와 해당 유형 계층 구조입니다.

Julia의 이 문제에 대한 접근 방식은 약간 독특하지만, 이러한 비정상성은 놀랍도록 강력함으로 보완됩니다. 이 추상화 형식을 사용하면 각 매개변수의 정확한 유형으로 구체적이거나, 메서드를 통해 Any를 통과시킬 정도로 모호할 수도 있습니다. 전반적으로 이것은 확실히 매우 강력하며 알아야 할 가치가 있습니다. 읽어 주셔서 감사합니다!