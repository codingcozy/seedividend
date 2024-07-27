---
title: "루비에서 Proc, Block, Lambda를 혼동하는 이유는"
description: ""
coverImage: "/assets/img/2024-07-02-RubyProcBlockLambdaWhatstheConfusion_0.png"
date: 2024-07-02 22:14
ogImage: 
  url: /assets/img/2024-07-02-RubyProcBlockLambdaWhatstheConfusion_0.png
tag: Tech
originalTitle: "Ruby — Proc, Block , Lambda — What’s the Confusion?"
link: "https://medium.com/@rajputlakhveer/ruby-proc-block-lambda-whats-the-confusion-8d624f67a37a"
---


이 기사에서는 Ruby에서 블록, 프록 및 람다에 대해 이해할 것입니다. 기사를 통해 그들이 무엇인지, 어떻게 작동하는지, 그리고 그들 간의 차이나 유사성에 대해 더 잘 알 수 있을 것입니다.

블록은 메서드에 전달되는 작은 익명 함수입니다. 헷갈리지 마세요. 이것들은 메서드에 인수로 전달되고 yield 키워드를 사용하여 메서드에서 호출되는 코드 몇 줄만 괄호('')나 do-end로 둘러 싸여 있습니다. 예를 보겠습니다:

```js
def simple_block
    puts "Inside Method"
    yield 1
    yield 2
    puts "After the Block Call"
end

simple_block { |a| puts "Hey Block Called #{a} time" }
# Inside Method
# Hey Block Called 1 time
# Hey Block Called 2 time
# After the Block Call

# 변수로 사용된 명시적 블록
def simple_block(&name)
    puts "Inside Method"
    yield 1
    yield 2
    name.call(3)
    puts "After the Block Call"
end

simple_block { |a| puts "Hey Block Called #{a} time" } 

# Inside Method
# Hey Block Called 1 time
# Hey Block Called 2 time
# Hey Block Called 3 time
# After the Block Call
```

위의 예제에서 블록이 실제로 어떻게 작동하는지 매우 명확해질 것입니다. 블록을 두 가지 방법으로 메서드에 전달했습니다 - 명시적(변수 이름 사용) 및 암시적(이름 없이 직접).

<div class="content-ad"></div>

프록은 작업에서 블록과 유사하지만 블록은 변수에 할당될 수 없는 반면, 프록은 변수에 할당될 수 있습니다. 블록 클래스를 보면 프록 클래스에 속하는 경향이 있어 더 명확해집니다. 이는 모든 블록이 단순 블록, 프록 인스턴스 또는 람다인 동일한 클래스인 Proc에 속함을 의미합니다. 우선 예제를 통해 프록을 살펴보겠습니다:

```js
def proc_blocks(proc_block)
    puts "메서드 안"
    # 우리가 Proc라고 부르는 다양한 유형
    proc_block.call 1
    proc_block.(2)
    proc_block.[] 3
    proc_block.===4
    # 변수로 전달되었기 때문에 블록으로 Yield를 사용할 수 없음
    puts "블록 호출 이후"
end

p1 = Proc.new { |a|  puts "블록이 호출됨 #{a} 번째" }
proc_blocks(p1)

# 메서드 안
# 블록이 호출됨 1 번째
# 블록이 호출됨 2 번째
# 블록이 호출됨 3 번째
# 블록이 호출됨 4 번째
# 블록 호출 이후

def simple_block(&name)
    puts "메서드 안"
    puts name.class
    puts "블록 호출 이후"
end

simple_block { |a| puts "블록이 호출됨 #{a} 번째" } 

# 메서드 안
# Proc
# 블록 호출 이후
```

이 예제에서 블록이 Proc의 인스턴스임이 명확해졌습니다.

람다도 Proc 클래스의 인스턴스로 정의되는 자체 구문을 갖고 있습니다. 람다도 변수에 할당되고 Proc처럼 호출될 수 있습니다. 람다 구문과 예제를 먼저 살펴보고 그들 사이의 차이를 알아보겠습니다:

<div class="content-ad"></div>

```js
def lambda_blocks(lambda_block)
    puts "메소드 내부"
    # 우리가 Lambda로 불러오는 다른 타입
    lambda_block.call 1
    lambda_block.(2)
    lambda_block.[] 3
    lambda_block.===4
    # 블록이 변수로 전달되었기 때문에 블록을 사용할 수 없음
    puts "블록 호출 이후"
end

p1 = -> (a) { puts "블록 호출됨 #{a} 번" }
lambda_blocks(p1)

# 메소드 내부
# 블록 호출됨 1 번
# 블록 호출됨 2 번
# 블록 호출됨 3 번
# 블록 호출됨 4 번
# 블록 호출 이후
```

문제는 lambda, Block 및 Proc가 모두 같은 이유인데 블록 기능이 서로 다른 버전이 있을까요?

- Proc 및 Block은 전달된 인수에 대해 고려하지 않지만, lambda는 잘못된 인수의 수가 전달되면 인수 오류를 throw합니다.
- Proc에 return이 포함되어 있으면 해당 메소드의 나머지 부분을 실행하지 않고 동일한 위치에서 전체 메소드를 반환하지만, lambda는 자체에서 반환하고 나머지 메소드 코드를 실행합니다.

```js
lambda_block = -> (a){   puts "블록 호출됨 #{a} 번" }
lambda_block.call
# 에러 발생 - 잘못된 인수의 수

proc_block = Proc.new { |a| puts "블록 호출됨 #{a} 번" }
proc_block.call
# 블록 호출됨  번

# 전체 메소드를 실행한 후 반환 - Lambda
def differntiate_block(lambda_block)
    puts "메소드 내부"
    lambda_block.call 1
    puts "블록 호출 이후"
end

lambda_block = -> (a) do  puts "블록 호출됨 #{a} 번"
    return 2
end

# 메소드 내부
# 블록 호출됨  번
# 블록 호출 이후

# Proc return 문 실행 후 반환
def differntiate_block(proc_block)
    puts "메소드 내부"
    proc_block.call 1
    puts "블록 호출 이후"
end

proc_block = Proc.new do |a|  puts "블록 호출됨 #{a} 번"
    return 2
end

# 메소드 내부
# 블록 호출됨  번
```

<div class="content-ad"></div>

Block, Proc 및 Lambda의 작동 방식은 유사하지만 위에 언급된 특정 차이로 인해 각각의 타입에서 사용 사례가 더 구체적이 됩니다. 그러므로 우리가 어떻게 사용할 수 있는지 주의 깊게 살펴보세요.