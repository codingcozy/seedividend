---
title: "줄리아Julia로 할 수 있는 기상천외한 일들"
description: ""
coverImage: "/assets/img/2024-07-13-WEIRDThingsYouCanDoInJulia_0.png"
date: 2024-07-13 21:14
ogImage: 
  url: /assets/img/2024-07-13-WEIRDThingsYouCanDoInJulia_0.png
tag: Tech
originalTitle: "WEIRD Things You Can Do In Julia"
link: "https://medium.com/chifi-media/weird-things-you-can-do-in-julia-3f10cacb8ef4"
---


# Julia은 이상하다

나는 항상 Julia 프로그래밍 언어가 상당히 독특하다고 평가해왔어. 빠르고 사용하기 쉬운 다른 언어들도 있지만, 그런 언어들 중에서도 다중 디스패치를 프로그래밍 패러다임으로 채택한 언어는 많지 않아. 게다가, 그 언어들 중에서도 해당 언어로 작성된 패키지를 다중 디스패치로 확장할 수 있는 언어는 드물어. 이 언어에 대한 가능성은 다양하게 느껴질 거야.

Julia의 흥미로운 그리고 다소 독특한 프로그래밍 패러다임으로 인해, 몇몇 흥미로우면서 때로는 의도치 않은 결과들이 나타날 때가 있어 여러분들이 진짜 흥미로운 코드를 만들 수 있게 된다. Julia의 어떤 이상한 점은 분명히 사용 케이스가 없거나 사용해서는 안 되는데, 이 언어에서 가능한 몇몇 이상한 것들은 정말 값어치가 있어. 오늘은 이러한 낯설거나 이상한 기법을 사용하여 작업할 수 있는 언어의 흥미로운 구문 및 API 디자인을 살펴볼 거야.

## 분산 디스패치:

<div class="content-ad"></div>

줄리아 언어의 가장 멋진 기능 중 하나는 새로운 방법을 추가하여 함수를 가져오고 확장하는 능력입니다. 이 기술을 사용하면 정의된 메소드를 가져와서 새로운 맥락에서 작동하도록 확장할 수 있습니다. 예를 들어, 우리는 Base에서 length를 가져와서 이를 확장하여 새로 만든 타입의 맥락에서 작동하도록 만들 수 있습니다...

```js
import Base: length

mutable struct MyRange{T <: Real} 
    x::T 
    y::T 
end

length(mr::MyRange) = length(mr.x:mr.y)
```

이를 사용하면 우리는 우리의 타입 시스템을 줄리아의 Base와 다른 줄리아 패키지의 함수 시스템과 통합할 수 있습니다. 비트 연산자도 이와 마찬가지로 확장할 수 있지만, 이 경우에도 몇 가지 예외 사항이 있습니다. 예외의 하나는 서브타입 연산자인 ':' 입니다. 이 연산자는 Core에서 가져온 것이기 때문에 가져와서 확장할 수 없는 유일한 줄리아 부분입니다. 놀랍게도 확장할 수 있는 줄리아의 기호 중 하나는 ':' 입니다. 줄리아에서 콜론은 몇 가지 다른 맥락에서 사용됩니다. 먼저, `using DataFrames: DataFrame`와 같이 직접 가져오는 데 콜론이 사용됩니다.

<div class="content-ad"></div>

마지막으로 콜론은 1씩 증가하는 범위를 만들 때 사용됩니다.

```js
1:10
```

<div class="content-ad"></div>

이 함수에 새로운 메소드를 추가함으로써 정말 독특한 구문을 만들 수 있어요. 실제로 제가 자체 소프트웨어에서 이 연산자를 확장한 한 곳은 Toolips의 CSS 스타일 클래스에 서브 스타일을 추가하는 능력입니다. 말씀드린 구문의 예시는 다음과 같아요,

```js
function filec_style()
    s = Style("div.file-cell", "padding" => 10px,
    "background-color" => "gray","overflow" => "show", "cursor" => "pointer", "overflow-x" => "hidden",
    "padding" => 4px, "transition" => "0.5s")
    s:"hover":["border" => "1px solid magenta", "transform" => "scale(1.02)"]
    s::Style
end
```

:를 사용해서 흥미로운 구문을 만들기 위한 첫 번째 단계는 이를 가져와야 한다는 것이에요. 이 함수를 가져오기 위해서는 이 이름 주위에 괄호를 제공해야 해요 — 이는 주리아에게 우리의 :이 구문이 아닌 함수 이름임을 알려주는 흥미로운 주요 사항이에요.

```js
import Base: (:)
(:)(x::String, n::Number) = begin [println(x) for i in 1:n]; nothing end
```

<div class="content-ad"></div>

이 새로운 디스패치는 문자열과 숫자를 가져와 문자열을 n번 출력합니다. 한 번 해보죠.

```js
"hello":5
hello
hello
hello
hello
hello
```

더 이상한 일도 가능합니다…

```js
(:)(vec::Vector{<:Any}, f::Function) = [f(x) for x in vec]

[5]:x -> x += 5

1-element Vector{Int64}:
 10

# 이 문법이 맘에 들어요 :)
```

<div class="content-ad"></div>

## 쉬운 기능 인덱싱

벡터(Vector)의 다양한 구조물들과 함께 작업할 때, 종종 그 종류에 맞는 특정 인덱싱이 필요할 때가 있습니다. 주리아(Julia)는 기본적으로 우리에게 Int64 인덱싱만 제공하는데요 — 요소 열거를 통해. 구조물에서 값을 꺼내기 위해 getindex에 새로운 메서드를 바인딩하는 것은 좋지만, 우리의 사용 사례에 항상 그렇게 하고 싶은 것은 아닐 수 있습니다. 제가 주리아 세션에서 가끔 사용하는 한 가지 방법은 다음과 같은 벡터 인덱싱을 위한 getindex 바인딩입니다.

```js
import Base: getindex
getindex(vec::Vector{<:Any}, f::Function) = begin
    vec[findfirst(f, vec)]
end
```

이 결과는 어떤 속성에 의해 결정된 결과를 빠르게 얻을 수 있는 유용한 인덱싱 구문입니다. 여기서, 이 함수를 사용하여 'String' 유형의 벡터에서 특정한 String에 기반한 문자열을 가져오는 데 사용합니다.

<div class="content-ad"></div>


```js
x[s -> s == "hi"]
"hi"
```

## 파라미터 추상화

여러 디스패치는 그 자체로 매우 강력한 개념이지만, Julia는 또한 파라메트릭 다중 디스패치를 제공하여 더욱 중요한 단계로 나아갑니다. 이 방법론에 따르면, 타입은 구성 방법의 측면으로 더 세분화될 수 있습니다. 이것의 가장 유명한 예는 단순한 Vector 일 것입니다. Int64로 구성된 Vector를 생성하면 Vector{Int64}가 생성됩니다.

```js
vec = [1, 2]
2-element Vector{Int64}:
 1
 2
```

<div class="content-ad"></div>

이 글을 통해 특정 매개 변수에 대해 추상화 계층을 만드는 기술을 사용하여 다양한 수준에서 Model을 디스패치할 수 있었습니다. 이 기술에 대해 더 자세히 알아보고 싶다면, 이 프로젝트에 대해 작성한 글 링크를 확인해보세요:

이제 매개 변수에서 추상 타입 계층을 사용하는 디스패치를 작성할 수 있게 되었습니다!

<div class="content-ad"></div>

```js
show_data(m::Model{<:Continuous}) = show(m.data)
```

## 익명.. 데이터 구조?

줄리아 언어의 유용한 특징 중 하나는 익명 함수를 만들 수 있다는 점입니다. 소프트웨어에서는 작은 함수를 필요로 하는 여러 상황이 있습니다. 이를 통해 어떤 데게든 해당 함수를 제공할 수 있습니다. 과학 계산 분야의 응용 프로그램에서 특히 이러한 경우가 흔한데, 여러 이유로 함수를 통해 모음 요소를 처리해야 할 때가 자주 있습니다.

줄리아의 익명 함수 능력은 정말 강력하지만, 이 논리 오른쪽 연산자(-`)의 유일한 능력은 아닙니다. 이 연산자로 가능한 또 다른 흥미로운 기능은 익명 데이터 구조를 만들 수 있다는 점입니다. 이는 타입이 없는 데이터 구조를 만들 수 있음을 의미합니다. 이렇게 하면 변수 이름이 필드 이름이 되어 여러 값으로 구조를 빠르게 구성할 수 있습니다. 이것에 더해 반환을 위해 해당 함수를 제공해야 한다는 이상한 점이 있습니다. 이를 가능하게 하려면, 그냥 괄호 뒤에 논리 오른쪽 연산자를 제공하고, 그 뒤에 세미콜론으로 구분된 필드가 있는 또 다른 괄호를 제공하세요...

<div class="content-ad"></div>

```js
function example()
    x = 5
    y = 2
    ()->(x;y)
end
```

그리고 결과는…

```js
stuff = example()
#111 (1개의 메소드를 가진 일반 함수)
stuff.x
5
stuff.y
2
```

이 기능에 대한 사용 사례가 있는지 여부에 대해서, 분명 그런 것이 있을 것 같아요. 대부분의 경우에는 새 데이터 구조를 만드는 것이 더 나은 선택일 수도 있어요. 그래도, Julia의 이 흥미로운 기능을 더 많은 사용자가 알게 되었으면 하는 생각이에요.

<div class="content-ad"></div>

## bitmask search an array

소프트웨어에서 자주 발생하는 프로그래밍 문제 중 하나는 다음과 같습니다: 어떤 기능이 실행되는데 — 예를 들어, 버튼이 눌릴 때 — 그 기능은 구조에 요소를 추가합니다. 중요한 점은, 해당 요소가 추가된 후에 버튼이 다시 눌릴 경우, 구조에 해당 요소를 중복으로 추가하고 싶지 않다는 것입니다. 이런 경우에는 구조 안에 해당 요소가 있는지 확인해야 합니다. 대부분의 경우에는 이 작업이 간단합니다 — in을 사용하여 Bool 값을 반환합니다.

```js
x = [5, 10, 15]

if 5 in x
    println("it's in")
end
```

이 기술은 많은 경우에 동작하지만, 예외가 발생할 수 있습니다. 예를 들어, id 필드를 포함하는 구조를 담고 있는 Vector가 있다면 어떻게 할까요? 이 경우, 구조의 ID가 우리의 ID와 일치하는지 확인해야 합니다. 이 문제에 접근하는 간단한 방법은 find 함수를 사용하는 것입니다. Julia의 find 함수는 대부분의 알고리즘이나 구문 분석을 작성하는 데 필수적입니다. 이러한 중요한 함수들을 다양한 맥락에서 사용하는 정보가 필요하시다면, 해당 함수들 사용에 대한 제 전체 기사를 작성했으니, 링크를 확인해보세요:

<div class="content-ad"></div>

다음과 같은 예제 구조를 고려해보세요:

```js
mutable struct Example
    id::String
end
```

다양한 ID를 가진 예제 벡터가 있다고 가정해봅시다.

```js
vec = [Example("1"), Example("2"), Example("3")]
```

<div class="content-ad"></div>

가정하에, 우리가 id가 "3"인 Example을 찾고자 한다고 상상해 봅시다. 만약 아무것도 찾을 수 없다면 find 함수는 아무 것도 반환하지 않으므로, 이를 사용하여 Example이 있는지 여부를 판단하는 조건으로 사용할 수 있습니다.

```js
found = findfirst(example::Example -> example.id == "3", vec)
if ~(isnothing(found))
    println("3 is in the Vector!")
end
```

Julia에서는 이러한 알고리즘을 여러 개 만들어 기본으로 바인딩할 수 있습니다. 예를 들어, 위의 함수를 확장하여 in 함수로 만들겠습니다.

```js
import Base: in

in(id::String, exvec::Vector{Example}) = begin
    ~(isnothing(findfirst(e -> e.id == id, exvec)))
end
```

<div class="content-ad"></div>

```js
"3" in vec
true
```

## baremodules

줄리아의 모듈은 값들을 포함하고 모듈화하는 객체입니다. 모듈은 모듈 키워드를 제공하고 모듈 이름을 따라 만들어집니다.

```js
module Examp

end
```

<div class="content-ad"></div>

Julia에서 모듈을 만들 때마다 몇 가지 내용이 함께 제공됩니다. 이러한 내용은 Julia가 제대로 작동하기 위한 필수 구성 요소입니다. 가장 중요한 것은 Julia의 Base 모듈과 eval 함수입니다. 대부분의 Julia 사용자들은 이와 같은 모듈을 만드는 방법을 잘 알고 있지만, 맨 끝에 불러온 모듈에 대해 알고 있는 것은 그리 흔하지 않을 수 있습니다. 모듈은 Base와 함께 패키징되며, baremodule은 그렇지 않습니다. 물론 Eval 또한 이 모듈 내부에 들어 있지 않을 것입니다. baremodule 키워드를 사용하여 baremodule을 만들 수 있습니다.

```js
baremodule Examp

end
```

예를 들어, 이러한 bare 모듈에는 Example.eval 함수가 존재하지 않습니다. 마찬가지로, 연산자, getindex 및 그 외 많은 Base의 개체를 사용하고 싶더라도 해당 모듈에는 포함되어 있지 않습니다. 이 모듈에는 더 적은 메모리를 사용하는 모듈을 만들기 위한 사용 사례가 확실히 있습니다.

```js
Examp.Vector
UndefVarError: `Vector`가 정의되지 않았습니다.
```

<div class="content-ad"></div>

```js
module Normal

end

Normal.Vector
Vector (alias for Array{T, 1} where T)
```

## 메소드 삭제

줄리아 개발자를 통해 가능한 것 중 몇 가지는 메소드 삭제입니다. 이 개념에는 무한한 응용 프로그램이 있지는 않지만, 몇 가지는 있습니다. 메소드 삭제는 정확히 안전한 것은 아니지만, 재미있는 시도가 될 수도 있습니다. 또는 예를 들어, 우리만의 동등한 메소드로 베이스 메소드를 삭제하고자 하는 경우가 있을 수 있습니다. 비록 이렇게 하면 메소드의 성격이 변경되고 예측할 수없는 결과를 초래할 수 있지만, 이를 수행할 수 있는 능력만 있다면 정말 멋진 기능이라고 할 수 있습니다.

```js
import Base: println
methods(Base.println)

Base.delete_method(methods(println)[1])
```

<div class="content-ad"></div>

## 문자열 매크로

얘기할 주제 중 마지막 줄리아 구문 트릭은 문자열 매크로입니다. 문자열 매크로는 문자열만을 인수로 하는 매크로입니다. 매크로는 문자열 구분자 외부에 빨리 제공되며 매크로를 사용할 것임을 나타냅니다. 이 예시로는 Markdown.MD가 좋은 예시입니다.

```js
using Markdown
md"# 안녕하세요 세계!"
```

<img src="/assets/img/2024-07-13-WEIRDThingsYouCanDoInJulia_0.png" />

<div class="content-ad"></div>

이런 종류의 매크로를 만들려면 간단히 String을 인수로 받고 그 끝에 _str을 붙인 매크로를 만들면 됩니다.

```js
macro hello_str(s::String)
    println("hello $s !")
end
```

```js
hello"world"

hello world !
```

## 결론

<div class="content-ad"></div>

다양한 패러다임 언어가 존재하는 세상에서, Julia는 고유한 패러다임과 문법적 능력으로 돋보입니다. 표준 Julia 배열의 다중 디스패치와 추상화가 강력한데다, Julia는 언어를 더욱 흥미롭게 만드는 독특한 도구와 능력을 제공합니다. 제가 느낀 몇 가지 패러다임 중에는 매개변수 다중 디스패치만큼 강력한 것은 거의 없다고 생각해요. 읽어 주셔서 감사합니다. 즐거운 하루 되세요!