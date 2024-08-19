---
title: "Golang Defer 힙 할당 Defer, 스택 할당 Defer, 그리고 오픈 코드 Defer"
description: ""
coverImage: "/assets/img/2024-08-18-GolangDeferHeap-allocatedDeferStack-allocatedDeferandOpen-codedDefer_0.png"
date: 2024-08-18 11:45
ogImage: 
  url: /assets/img/2024-08-18-GolangDeferHeap-allocatedDeferStack-allocatedDeferandOpen-codedDefer_0.png
tag: Tech
originalTitle: "Golang Defer Heap-allocated Defer, Stack-allocated Defer and Open-coded Defer"
link: "https://medium.com/@func25/golang-defer-heap-allocated-defer-stack-allocated-defer-and-open-coded-defer-5a91fad480f2"
isUpdated: true
updatedAt: 1724032746387
---


<img src="/assets/img/2024-08-18-GolangDeferHeap-allocatedDeferStack-allocatedDeferandOpen-codedDefer_0.png" />

디퍼(defer) 문은 Go를 배우기 시작할 때 가장 흥미로운 부분 중 하나인 것 같아요, 그렇죠?

하지만 많은 사람들을 혼란스럽게 만드는 부분들이 많고, 사용할 때 종종 다뤄지지 않는 매력적인 측면들도 많아요.

예를 들어, 디퍼(defer) 문에는 실제로 3가지 유형이 있습니다 (Go 1.22 기준으로, 나중에 변경될 수도 있습니다): 오픈 코딩된 디퍼, 힙 할당된 디퍼, 스택 할당된 디퍼가 있어요. 각각은 다른 성능과 최적 사용 시나리오를 가지고 있어요. 성능을 최적화하려면 이를 알면 좋겠죠.

<div class="content-ad"></div>

이 토론에서는 기초부터 고급 사용법까지 모두 다룰 것이며, 심지어 내부 세부 사항 중 일부도 조금씩 파헤쳐보겠습니다.

# defer는 무엇인가요?

너무 깊이 파고들기 전에 defer를 간단히 살펴봅시다.

Go에서 defer는 주변 함수가 종료될 때까지 함수의 실행을 지연시키기 위해 사용되는 키워드입니다.

<div class="content-ad"></div>

```js
func main() {
  defer fmt.Println("hello")
  fmt.Println("world")
}

// 출력:
// world
// hello
```

이 코드 조각에서 defer 문은 fmt.Println("hello")를 main 함수의 맨 끝에 실행할 것으로 예약합니다. 그래서 fmt.Println("world")는 즉시 호출되어 "world"가 먼저 출력됩니다. 그 다음에는 defer를 사용했기 때문에 main이 끝나기 전에 "hello"가 마지막 단계로 출력됩니다.

함수가 종료되기 직전에 나중에 실행할 작업을 설정하는 것과 마찬가지입니다. 이것은 데이터베이스 연결을 닫거나 뮤텍스를 해제하거나 파일을 닫는 것과 같은 정리 작업에 매우 유용합니다:

```js
func doSomething() error {
  f, err := os.Open("phuong-secrets.txt")
  if err != nil {
    return err
  }
  defer f.Close()
  // ...
}
```

<div class="content-ad"></div>

위의 코드는 defer가 어떻게 작동하는지 잘 보여주는 좋은 예제이지만, defer를 사용하는 나쁜 방법이기도 합니다. 다음 섹션에서 그에 대해 더 자세히 알아보겠습니다.

이에 대한 몇 가지 좋은 이유가 있습니다:

- 우리는 닫는 작업을 열리는 곳 근처에 두었기 때문에 논리를 따르고 파일을 닫는 것을 잊지 않도록 할 수 있습니다. 함수를 스크롤해서 파일이 닫혔는지 확인해야 하는 귀찮음을 느끼고 싶지 않습니다. 그런거 보다는 주요 로직에 집중하고 싶습니다.
- 함수가 반환될 때에도 지연된 함수는 호출됩니다. 런타임 오류(panic)가 발생하더라도요.

패닉이 발생하면, 스택이 해제되고 지연된 함수가 특정한 순서대로 실행됩니다. 다음 섹션에서 이에 대해 자세히 다룰 예정입니다.

<div class="content-ad"></div>

# Defer 문은 쌓입니다

함수 내에서 여러 개의 defer 문을 사용할 때, last-in-first-out(`stack`) 순서로 실행됩니다. 즉, 마지막으로 선언된 defer 문이 가장 먼저 실행됩니다.

```js
func main() {
  defer fmt.Println(1)
  defer fmt.Println(2)
  defer fmt.Println(3)
}

// 출력:
// 3
// 2
// 1
```

defer 문을 호출할 때마다 해당 함수가 현재 고루틴(linked list)의 맨 위에 추가되어 스택에 쌓이게 됩니다.

<div class="content-ad"></div>

아래 이미지에 나타난 순서대로 링크드 리스트를 통해 각 defer를 실행합니다.

하지만 기억하세요, 고루틴의 링크드 리스트에 있는 모든 defer를 실행하는 것이 아니라 반환된 함수에서만 defer를 실행합니다. 왜냐하면 우리의 defer 링크드 리스트에는 여러 다른 함수에서 온 다양한 defer가 포함될 수 있기 때문입니다.

```js
func B() {
  defer fmt.Println(1)
  defer fmt.Println(2)
  A()
}

func A() {
  defer fmt.Println(3)
  defer fmt.Println(4)
}
```

<div class="content-ad"></div>

요즘에 현재 함수(또는 현재 스택 프레임)에서만 지연된 함수들이 실행됩니다.

![이미지](/assets/img/2024-08-18-GolangDeferHeap-allocatedDeferStack-allocatedDeferandOpen-codedDefer_2.png)

하지만 패닉이 발생할 때 현재 고루틴의 모든 지연 함수가 추적되고 실행되는 전형적인 경우가 하나 있습니다.

# 지연 실행, 패닉 및 복구

<div class="content-ad"></div>

컴파일 시간 오류 외에도 런타임 오류가 많이 발생합니다: 0으로 나누기(정수만), 배열 범위를 넘어가는 경우, nil 포인터를 역참조하는 경우 등이 있습니다. 이러한 오류로 인해 어플리케이션이 패닉 상태가 될 수 있습니다.

패닉은 현재의 고루틴 실행을 중단하고 스택을 되감아(defer) 현재 고루틴에서 지연된 함수를 실행시킨 후, 어플리케이션이 충돌하게 됩니다.

예기치 못한 오류를 처리하고 어플리케이션이 충돌하는 것을 방지하기 위해, recover 함수를 사용하여 패닉 상태에 있는 고루틴을 제어할 수 있습니다. 다음은 패닉을 핸들링하는 예시 코드입니다.

```go
func main() {
  defer func() {
    if r := recover(); r != nil {
      fmt.Println("Recovered:", r)
    }
  }()

  panic("이것은 패닉입니다")
}
```

<div class="content-ad"></div>

```js
// 출력:
// 복구됨: This is a panic
```

보통 사람들은 패닉 상태에서 에러를 설정하고 recover(..)로 해당 에러를 잡지만, 다른 형식의 값도 가능합니다: 문자열, 정수 등.

위 예제에서는 지연 실행 함수 내부가 recover를 사용할 수 있는 유일한 장소입니다. 좀 더 자세히 설명해 드리겠습니다.

여기에 나열할 수 있는 몇 가지 실수가 있습니다. 실제 코드에서 이와 유사한 세 개 이상의 코드 문단을 봤습니다.

<div class="content-ad"></div>

첫 번째 방법은 recover를 직접적으로 defer 함수로 사용하는 것입니다:

```js
func main() {
  defer recover()
  panic("This is a panic")
}
```

위의 코드는 여전히 패닉을 발생시키지만, 이는 Go 런타임의 의도대로입니다.

recover 함수는 패닉을 잡기 위해 사용되지만, 올바르게 작동하려면 defer 함수 내에서 호출되어야 합니다.

<div class="content-ad"></div>

배경에서, 우리의 회복 호출은 사실 runtime.gorecover이며, 회복 호출이 올바른 컨텍스트에서 발생하는지 확인하고 패닉이 발생했을 때 활성화된 올바른 지연 함수에서 호출되는지 확인합니다.

```js
func myRecover() {
  if r := recover(); r != nil {
    fmt.Println("Recovered:", r)
  }
}

func main() {
  defer func() {
    myRecover()
    // ...
  }()
  panic("This is a panic")
}
```

맞아요, 위 코드는 기대한 대로 작동하지 않을 겁니다. 왜냐하면 recover가 직접 지연 함수에서 호출되는 것이 아니라 중첩 함수에서 호출되기 때문입니다.

그리고 또 다른 실수는 다른 고루틴에서의 패닉을 잡으려고 하는 것입니다.

<div class="content-ad"></div>

```js
func main() {
  defer func() {
    if r := recover(); r != nil {
      fmt.Println("Recovered:", r)
    }
  }()

  go panic("This is a panic")
  time.Sleep(1 * time.Second) // Wait for the goroutine to finish
}
```

이해가 되시죠? 이미 알고 계시듯이 defer 체인은 특정 고루틴에 속해 있습니다. 각 고루틴은 자체 스택을 가지고 있기 때문에 한 고루틴이 다른 고루틴에 개입하여 패닉을 처리하는 것은 어렵습니다.

아쉽게도 이 경우에는 그 고루틴에서 패닉을 처리하지 않으면 응용 프로그램이 충돌하는 것이 유일한 방법입니다.

# 수신자를 포함한 Defer 인수는 즉시 평가됩니다


<div class="content-ad"></div>

안녕하세요! 이전에도 일어났던 문제인데, 예전 데이터가 분석 시스템에 전달되어 낡은 데이터로 분석하는 상황이 발생했을 때 어떻게 처리해야 할지 고민이 많이 되었죠.

다음은 제가 말하고 싶은 것입니다:

```js
func pushAnalytic(a int) {
  fmt.Println(a)
}

func main() {
  a := 10
  defer pushAnalytic(a)
  a = 20
}
```

어떻게 생각하시나요? 결과물은 무엇일까요? 10이 나옵니다. 결과는 10이 나오고 20은 나오지 않습니다.

<div class="content-ad"></div>

그것은 defer 문을 사용할 때 값을 즉시 가져오기 때문입니다. 이를 "값으로 캡처"라고 합니다. 그래서 defer가 예약될 때 pushAnalytic에 전달되는 a의 값은 나중에 변경되더라도 10으로 설정됩니다.

이 문제를 해결하는 두 가지 방법이 있습니다.

...