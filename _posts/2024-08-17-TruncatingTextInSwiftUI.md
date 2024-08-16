---
title: "SwiftUI에서 텍스트를 자르는 방법"
description: ""
coverImage: "/assets/img/2024-08-17-TruncatingTextInSwiftUI_0.png"
date: 2024-08-17 01:35
ogImage: 
  url: /assets/img/2024-08-17-TruncatingTextInSwiftUI_0.png
tag: Tech
originalTitle: "Truncating Text In SwiftUI"
link: "https://medium.com/@gabth/truncating-text-in-swiftui-4e6e2e555dbd"
isUpdated: false
---



![Truncating text in SwiftUI](/assets/img/2024-08-17-TruncatingTextInSwiftUI_0.png)

텍스트는 앱이 포함하는 가장 일반적인 콘텐츠 유형입니다. 우리는 매일 다양한 길이의 텍스트를 다루지만, 텍스트가 너무 길 때 종종 일부를 잘라내고 일부만 표시해야 합니다. 이와 함께, 사용자는 일반적으로 긴 텍스트를 확장하여 보거나 축소하여 트랜케이션된 상태로 유지할 수 있는 옵션을 얻습니다.

이 게시물에서는 쉽게 트랜케이션을 구현할 수 있는 두 가지 방법을 보여드리고, 원래 문자열의 하위 문자열을 가져와 제한적으로 표시함으로써 (가짜) 트랜케이션을 시뮬레이션할 수 있는 추가적인 접근 방식을 소개하겠습니다. 추가 장으로, 텍스트의 트랜케이션 및 확장이 주된 앱 기능으로 간주되기 때문에 텍스트 확장 및 축소 방법도 함께 보여드리겠습니다.

# 행 수에 따라 텍스트를 자르기


<div class="content-ad"></div>

먼저, 작은 코드 예시로 시작해봅시다. 몇 가지 긴 텍스트를 표시하는 TextView 입니다.

```js
struct ContentView: View {
    let longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    
    var body: some View {
        VStack {
            Text(longText)
        }
        .padding()
    }
}
```

이 간단한 뷰는 다음 결과를 보여줍니다:

<img src="/assets/img/2024-08-17-TruncatingTextInSwiftUI_1.png" />

<div class="content-ad"></div>

가장 빠른 텍스트를 자르고 일부만 표시하는 방법은 lineLimit(_:) 뷰 수정자를 사용하는 것입니다. 그 이름이 전부를 말해줍니다. 주어진 줄 수만큼만 보여주고, 그에 맞지 않는 모든 텍스트는 잘라냅니다. 예를 들어, 텍스트를 두 줄로 제한해 봅시다:

```js
Text(longText)
    .lineLimit(2)
```

![이미지](/assets/img/2024-08-17-TruncatingTextInSwiftUI_2.png)

앞서 언급한 대로, 이 텍스트를 자르는 방법이 가장 유연합니다. 그 이유는 텍스트 뷰에 제공된 사용 가능한 영역에 따라 표시되는 텍스트의 양이 달라지기 때문입니다. 따라서 위의 lineLimit(_:) 뷰 수정자 추가로 가로 방향에서 더 많은 텍스트가 표시됩니다. 세로 방향에서보다 더 많은 텍스트가 보여집니다.

<div class="content-ad"></div>


아래 스크린샷을 참조하세요. 텍스트 끝에 있는 세 개의 점(이중점 기호)이 절삭 표시임을 알 수 있습니다. 이 기호는 기본적으로 추가되지만, truncationMode(_:) 뷰 수정자를 사용하여 이중점을 표시할 위치를 선택할 수 있습니다. head, middle, tail 세 가지 옵션 중에서 선택할 수 있습니다. 다음은 truncation mode를 middle로 설정하는 방법입니다:

```js
Text(longText)
    .lineLimit(2)
    .truncationMode(.middle)
```

<img src="/assets/img/2024-08-17-TruncatingTextInSwiftUI_4.png" />

<div class="content-ad"></div>

# 프레임을 사용한 텍스트 자르기

가끔은 편리하고, 다른 때에는 그렇지 않은 텍스트를 자르는 방법 중 하나는 Text 뷰나 해당 컨테이너 뷰의 프레임을 제어하고 제한하는 것입니다. 특정 너비, 높이 또는 둘 다를 지정할 수 있습니다. 다음 코드에서는 Text 뷰의 높이를 100 포인트로 설정하고 결과적으로 텍스트의 일부만 얻을 수 있습니다:

```js
Text(longText)
    .frame(height: 100)
```

![이미지](/assets/img/2024-08-17-TruncatingTextInSwiftUI_5.png)

<div class="content-ad"></div>

한 번 더 말씀드리지만, truncationMode(_:) 뷰 수정자를 사용하여 생략된 텍스트의 외관과 생략 부호의 위치를 제어할 수 있습니다.

# 표시되는 문자 수 제한

이전에 읽은 내용은 텍스트가 줄 수나 프레임에 기반하여 잘린 것을 야기하지만, 표시 가능한 문자 수를 제한함으로써 텍스트를 가짜로 잘랍니다. 다시 말해, 원래의 긴 문자열의 부분 문자열만을 표시함으로써 이를 관리하는 방법은 보이길 원하는 문자열의 부분에 따라 다릅니다. 가장 쉬운 방법은 문자열의 시작 또는 끝 부분일 수 있습니다.

예를 들어, 문자열의 처음 80개의 문자만을 표시하고 싶다고 가정해 보겠습니다. 다음과 같이 prefix(_:) 뷰 수정자를 사용할 수 있습니다:

<div class="content-ad"></div>

다른 한편으로, 마지막 80자를 얻으려면 대신 suffix(_:) 뷰 수정자를 적용하면 됩니다:

```js
Text(longText.suffix(80))
```

참고: 위에 설명된 두 뷰 수정자의 변형이 있습니다. 어떤 것이 가장 적합한지 확인해보세요.

<div class="content-ad"></div>

특정 문자열에서 시작이나 끝이 아닌 부분 문자열을 추출하려면 일반적으로 복잡해집니다. 이런 경우에는 우리가 얻고 싶은 부분 문자열의 범위를 명시적으로 지정해야 합니다. Swift에서는 startIndex, endIndex 및 여러 가지 형태의 인덱스 String 인스턴스 메서드를 사용하여 부분 문자열의 범위를 생성합니다.

예를 들어, 원래 문자열에서 20번째 위치부터 시작하여 80자를 가져와야 한다고 가정해 보겠습니다. 가독성과 명확성을 위해 먼저 다음 코드 세그먼트에서 범위의 한계를 지정하고 해당 부분 문자열을 가져오기 위해 사용합니다:

```js
let from = longText.index(longText.startIndex, offsetBy: 20)
let to = longText.index(from, offsetBy: 80)
Text(longText[from...to])
```

문자열에서 부분 문자열을 가져오는 것은 단순한 자르기가 아닙니다. 그 이유로 결과 문자열의 끝(또는 어디에서든)에 자동으로 줄임표(…)가 나타나지 않습니다. 그럼에도 불구하고 우리는 텍스트에 수동으로 추가할 수 있으며, 그렇게 함으로써 자른 텍스트의 동작을 모방할 수 있습니다:

<div class="content-ad"></div>

```js
Text(longText[from…to] + “…”)
```

<img src="/assets/img/2024-08-17-TruncatingTextInSwiftUI_6.png" />

# 보너스 콘텐츠 — 펼쳐지고 접히는 줄임 텍스트

일반적으로 줄임 텍스트를 제공하는 것은 의미가 없습니다(일부 특수한 경우를 제외하고), 대부분의 경우에는 확장하고 축소할 수 있는 메커니즘이 필요합니다. 이를 관리하는 전략은 우리가 어떻게 줄임 표시를 선택하고 사용할지에 따라 달라집니다. 다음 예시에서는 원본 문자열의 일부를 사용하여 줄임 표시된 텍스트를 펼치는 방법을 보여줍니다. 다른 경우에도 비슷한 방식으로 처리할 수 있습니다.

<div class="content-ad"></div>

우리가 먼저 필요한 것은 텍스트의 확장 또는 축소 상태를 제어할 상태 속성입니다:

```js
@State private var expandText = false
```

또한 위의 속성을 토글할 버튼이 필요합니다:

```js
Button(!expandText ? “텍스트 확장” : “텍스트 축소”) {
    expandText.toggle()
}
.buttonStyle(.borderedProminent)
.padding(.top)
```

<div class="content-ad"></div>

마침내 expandText 속성의 값에 따라 lineLimit(_:) 뷰 수정자의 인수를 업데이트할 것입니다:

```swift
Text(longText)
    .lineLimit(!expandText ? 2 : nil)
```

텍스트가 확장되지 않으면 Text 뷰는 두 줄만 표시됩니다. nil 값은 표시된 줄에 적용되는 제한이 없음을 의미합니다. 여기에 모든 예제 뷰와 여기에 제시된 단계를 함께 표시하겠습니다:

```swift
struct ContentView: View {
    let longText = “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”
    
    @State private var expandText = false
    
    var body: some View {
        VStack {
            Text(longText)
                .lineLimit(!expandText ? 2 : nil)
            
            Button(!expandText ? “Expand Text” : “Collapse Text”) {
                expandText.toggle()
            }
            .buttonStyle(.borderedProminent)
            .padding(.top)
        }
        .padding()
    }
}
```

<div class="content-ad"></div>

<img src="/assets/img/2024-08-17-TruncatingTextInSwiftUI_7.png" />

# 결론

텍스트를 자르는 것은 SwiftUI에서 쉬운 작업이며, 이제 그것을 필요로 할 때 어떻게 하는지 알게 되었습니다. 또한, 본 글에서는 원래 문자열의 일부만 표시함으로써 가짜 자르기를 하는 방법에 대해서도 알아보았습니다. 이는 특정 시나리오에서 유용할 수 있는 방법입니다. 그리고 추가로, 대부분의 경우 텍스트 자르기 이후에는 텍스트를 확장하고 축소하는 방법에 대해서도 알아보았습니다. 이 모든 것이 유용하게 느껴지고 여러분의 프로젝트에서 성공적으로 적용되기를 바랍니다.

읽어 주셔서 감사합니다!