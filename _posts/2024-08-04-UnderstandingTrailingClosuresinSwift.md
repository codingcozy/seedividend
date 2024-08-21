---
title: "Swift에서 트레일링 클로저 이해하기"
description: ""
coverImage: "/assets/img/2024-08-04-UnderstandingTrailingClosuresinSwift_0.png"
date: 2024-08-04 19:27
ogImage:
  url: /assets/img/2024-08-04-UnderstandingTrailingClosuresinSwift_0.png
tag: Tech
originalTitle: "Understanding Trailing Closures in Swift"
link: "https://medium.com/@harshaag99/understanding-trailing-closures-in-swift-2525e2ea793a"
isUpdated: true
---

<img src="/assets/img/2024-08-04-UnderstandingTrailingClosuresinSwift_0.png" />

이전 글인 "Swift에서 클로저 이해하기"에서는 클로저의 기본을 살펴보았어요. 오늘은 Swift에서의 클로저 중 하나인 trailing closures에 대해 알아볼게요.

# Trailing Closure란?

Trailing closure는 함수 호출의 괄호 외부 및 뒤에 작성된 클로저 표현식입니다. 함수의 마지막 매개변수가 클로저인 경우, 이를 trailing closure로 작성할 수 있어요.

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

# 실제 예시

식당에 있는 상황을 상상해봅시다. 음식을 주문할 때는 보통 웨이터에게 이렇게 주문합니다:

```js
orderFood(item: "피자", completion: {
    // 주문 후에는 이 클로저가 실행됩니다
    print("식사를 즐기세요!")
})
```

하지만 만약 주문의 마지막 부분이 항상 "식사를 즐기세요!"와 같다면, 이를 trailing closure로 생각하여 주문을 더 간단하게 할 수 있습니다:

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

```swift
orderFood(item: "피자") {
    print("식사를 즐겨주세요!")
}
```

# 간단한 코드 예시

다음은 이를 설명하는 간단한 예시입니다:

```swift
func fetchData(url: String, completion: (String) -> Void) {
    // 데이터를 가져오는 시뮬레이션
    let data = "주소에서 데이터 가져오기: \(url)"
    completion(data)
}

// 후행 클로저 없이
fetchData(url: "www.example.com", completion: { data in
    print(data)
})

// 후행 클로저 사용
fetchData(url: "www.example.com") { data in
    print(data)
}
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

위의 예제에서 fetchData 함수는 URL과 데이터를 가져온 후 호출되는 완료 closure를 가져옵니다. trailing closure syntax를 사용하면 함수 호출이 더 가독성이 좋아집니다.

# 특별한 경우

- 다중 Closure: 함수에 둘 이상의 closure 매개변수가 있는 경우, 마지막 하나만 trailing closure로 작성할 수 있습니다.

```js
func downloadFile(url: String, progress: (Double) -> Void, completion: (String) -> Void) {
    // 다운로드 시뮬레이션
    progress(0.5) // 50% 완료
    completion("다운로드 완료")
}

downloadFile(url: "www.example.com", progress: { percent in
    print("진행 상황: \(percent * 100)%")
}) { result in
    print(result)
}
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

2. 선택적 클로저: 클로저가 선택적인 경우에도 후행 클로저 구문을 사용할 수 있습니다.

```js
func performTask(action: (() -> Void)?) {
    action?()
}

performTask {
    print("작업 수행!")
}
```

# 코너 케이스

1. Swift 5.3+에서 여러 후행 클로저 사용: Swift 5.3부터 여러 후행 클로저를 사용할 수 있으므로 여러 클로저를 허용하는 함수의 가독성을 향상시킬 수 있습니다.

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
func animate(duration: Double, animations: () -> Void, completion: (() -> Void)?) {
    // 애니메이션 수행
    animations()
    // 애니메이션 완료 후
    completion?()
}

animate(duration: 1.0) {
    print("애니메이션 진행 중...")
} completion: {
    print("애니메이션이 완료되었습니다!")
}
```

2. Using Trailing Closures with Map: 배열의 map 함수를 사용하는 일반적인 사례입니다.

```js
let numbers = [1, 2, 3, 4, 5]

// trailing closure를 사용하지 않은 경우
let squares = numbers.map({ number in
    number * 2
})

// trailing closure를 사용한 경우
let doubled = numbers.map { number in
    number * 2
}
```

# 결론

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

스위프트의 트레일링 클로저는 함수가 클로저 매개변수를 사용할 때 특히 코드를 더 깔끔하고 가독성있게 만들어 줍니다. 이를 통해 보다 간결하고 표현력 있는 코드를 작성할 수 있습니다. 더 자세한 내용은 Apple 문서를 참조해 주세요.

클로저에 대한 이전 글을 확인하고 기초를 더 잘 파악해 보세요.

즐거운 코딩되세요!
