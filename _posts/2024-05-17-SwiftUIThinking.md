---
title: "SwiftUI 간단하게 시작하기"
description: ""
coverImage: "/assets/img/2024-05-17-SwiftUIThinking_0.png"
date: 2024-05-17 03:53
ogImage:
  url: /assets/img/2024-05-17-SwiftUIThinking_0.png
tag: Tech
originalTitle: "SwiftUI Thinking"
link: "https://medium.com/innovance-company-blog/swiftui-thinking-69a7f2d74d79"
isUpdated: true
---

<img src="/assets/img/2024-05-17-SwiftUIThinking_0.png" />

SwiftUI가 우리의 백로그에 올라온 지 어느 정도 되었네요. iOS 개발자로서, 우리는 SwiftUI를 기다리며 올바른 시기에 빠져들기를 기다리고 있었어요.

여기에 SwiftUI에 대한 간략한 소개가 있습니다!

SwiftUI의 시작점을 찾고 있다면, 여기서 시작하시면 됩니다!

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

# 일반적인 뷰 구성 요소와 속성들

SwiftUI에는 UIKit과 유사하게 사용되는 몇 가지 인기 있는 UI 구성 요소가 있습니다.

## Text

Text는 UILabel과 동일합니다.

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
Text("Hello World!")
    .font(.title.bold())
    .foregroundStyle(.blue)
```

![SwiftUI Thinking](/assets/img/2024-05-17-SwiftUIThinking_1.png)

## 버튼

예상했던대로, Button은 UIButton에 해당합니다.

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
Button {
    print("Button Action")
} label: {
    Text("Hello World!")
        .font(.title.bold())
        .foregroundStyle(.white)
        .padding()
        .background(.blue)
        .clipShape(RoundedRectangle(cornerRadius: 16))
}
```

![Image](/assets/img/2024-05-17-SwiftUIThinking_2.png)

## 이미지

Image는 UIImageView와 같다고 생각하면 됩니다.

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

![시스템 이름을 사용한 이미지](Image(systemName: "house.fill")
.resizable()
.scaledToFit()
.foregroundStyle(.blue)
)

![SwiftUI를 학습하는 이미지](/assets/img/2024-05-17-SwiftUIThinking_3.png)

## TextField

TextField은 UITextField와 동일합니다.

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

TextField("placeholder", text: .constant(""))
.textFieldStyle(.roundedBorder)

![SwiftUIThinking_4](/assets/img/2024-05-17-SwiftUIThinking_4.png)

# HStack & VStack

앱의 UI를 구조화할 때는 뷰를 서로 정렬하는 것이 중요합니다.

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

SwiftUI에서는 이를 위한 두 가지 주요 레이아웃 빌더가 있습니다: HStack과 VStack.

이러한 레이아웃 빌더를 사용하면 각각 뷰를 수평 및 수직으로 정렬할 수 있습니다.

보다 복잡한 레이아웃을 구현하기 위해 이들을 결합할 수도 있습니다.

## HStack

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

`HStack`은 뷰를 수평으로 정렬합니다.

```js
HStack {
    Text("Leading Text")
        .font(.body.bold())
        .foregroundStyle(.blue)

    Text("Trailing Text")
        .fonts(.caption.bold())
        .foregroundStyle(.orange)
}
```

![SwiftUIThinking_5](/assets/img/2024-05-17-SwiftUIThinking_5.png)

## VStack

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

뷰를 수직으로 정렬합니다.

```js
VStack {
    Text("상단 텍스트")
        .font(.body.bold())
        .foregroundStyle(.blue)

    Text("하단 텍스트")
        .font(.caption.bold())
        .foregroundStyle(.orange)
}
```

<img src="/assets/img/2024-05-17-SwiftUIThinking_6.png" />

# 뷰 간의 관계: Spacer로 유연한 UI

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

Spacer는 SwiftUI의 가벼우면서 강력한 구성 요소로 유연한 UI를 구축하는 데 사용됩니다.

원하는 뷰를 다른 뷰에 일정한 여백(leading, top, trailing, bottom)을 사용하여 정렬하는 것은 지루할 수 있습니다.

```swift
HStack {
    Text("Leading Text")
        .font(.body.bold())
        .foregroundStyle(.blue)

    Spacer()

    Text("Trailing Text")
        .font(.caption.bold())
        .foregroundStyle(.orange)
}
```

![SwiftUIThinking_7](/assets/img/2024-05-17-SwiftUIThinking_7.png)

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

Spacer가 HStack 안의 두 개의 Text 사이에 배치되면, 디자인된대로 Text를 가장자리쪽으로 밀어냅니다.

```js
HStack {
    Spacer()

    Text("Leading Text")
        .font(.body.bold())
        .foregroundStyle(.blue)

    Spacer()

    Text("Trailing Text")
        .font(.caption.bold())
        .foregroundStyle(.orange)

    Spacer()
    Spacer()
}
```

Leading Text 앞에 Spacer를 하나 추가하고, Trailing Text 뒤에 Spacer를 두 개 더 추가했어요.

<img src="/assets/img/2024-05-17-SwiftUIThinking_8.png" />

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

스페이서를 추가할 때, 선두 텍스트는 선도를 기준으로 한 스페이서 만큼 멀어지고, 추적 텍스트는 후도를 기준으로 두 스페이서 만큼 멀어집니다.

그 결과로, 추적 텍스트는 선두 텍스트에 비해 기기 가장자리로부터 더 멀리 떨어지게 됩니다.

# 데이터 목록 다루기

데이터 목록에 대해, SwiftUI에는 List 또는 Foreach라는 두 가지 옵션이 있습니다.

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

## 목록

목록은 UIKit의 UITableView와 같습니다.

```swift
var numbers = [1, 2, 3, 4, 5]

List(numbers, id: \.self) { number in
    Text("\(number)")
}
```

<img src="/assets/img/2024-05-17-SwiftUIThinking_9.png" />

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

안녕하세요!

Markdown 형식으로 표를 변환하려면 다음과 같이 해보세요.

List에는 구분선, 카드 모양 등과 같은 준비된 UI가 포함되어 있습니다. 쉽죠!

## Foreach

```js
var numbers = [1, 2, 3, 4, 5]

VStack {
    ForEach(numbers, id: \.self) { number in
        Text("\(number)")
    }
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

![image](/assets/img/2024-05-17-SwiftUIThinking_10.png)

The Foreach construct offers a leaner alternative to the List component. With Foreach, you have full control over building your list UI, resulting in a simpler and more customizable approach.

## Updating UI with Observable Property

SwiftUI differs from UIKit by embracing the Declarative Programming approach.

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

선언적 프로그래밍에서 UI는 Observable 값이나 속성의 변경을 관찰합니다.

값이 변경될 때마다 UI는 동적으로 변경 사항을 반영합니다.

SwiftUI의 기본 속성 래퍼(State 및 Binding)는 관찰 가능성을 활성화합니다:

State: 단방향 연결을 용이하게 해 주며 주로 연결된 뷰 내에서 사용됩니다.

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

바인딩: 양방향 연결을 수립하고 상태 속성을 다른 뷰로 전송하는 데 사용됩니다.

## 지금은 상태에 집중해 보겠습니다

```js
@State var text: String = "초기 텍스트"

VStack(spacing: 32) {
    Button {
        text = "수정된 변경"
    } label: {
        Text("텍스트 변경")
            .font(.title.bold())
            .foregroundStyle(.white)
            .padding()
            .background(.blue)
            .clipShape(RoundedRectangle(cornerRadius: 16))
    }

    Text(text)
        .font(.body.bold())
        .foregroundStyle(.blue)
}
```

![이미지](https://miro.medium.com/v2/resize:fit:590/1*UAzw-1G__azlbNUSfevu9Q.gif)

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

변경 텍스트 버튼 액션은 observable text 속성을 수정합니다. UI는 텍스트 속성의 변경 사항을 듣도록 설계되어 있으므로 자동으로 업데이트됩니다. 이 기능은 State 프로퍼티 래퍼로 가능해졌습니다.

# 뷰

모든 SwiftUI 뷰는 View 프로토콜을 준수하는 구조체입니다.

구조체는 클래스 상속을 허용하지 않으므로 SwiftUI 뷰는 프로토콜에만 준수할 수 있습니다.

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

위 특성들은 SwiftUI에서 뷰를 독립적이고 고유하게 보는 방식을 채택해야 함을 필요로 합니다.

UIKit에서는 UIViewController 및 UITableViewController와 같은 특정 뷰를 위한 기본 클래스를 생성하는 것이 일반적입니다. 이 습관에서 벗어나는 것은 어려울 수 있지만, 마음가짐을 바꿈으로써 가능합니다!

# 유용한 구성 요소

SwiftUI의 핵심 원칙 중 하나는 작성 코드를 줄이고 더 많은 작업을 하는 것입니다.

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

뒤에 표식을 확인 해주세요.

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

![Image](/assets/img/2024-05-17-SwiftUIThinking_11.png)

## Picker

It is a combination of UISegmentedControl and UIPickerView.

It provides various styles such as wheel, inline, segmented, and palette.

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
let numbers = [1, 2, 3, 4, 5]
@State var selection: Int = 0

Picker("Select", selection: $selection) {
    ForEach(numbers, id: \.self) { number in
        Text("\(number)")
    }
}
.pickerStyle(.inline)
```

![Image Scale](https://miro.medium.com/v2/resize:fit:590/1*fy8_zvsJAsM7_4dQB4QgdA.gif)

# 이미지 크기 조절

SwiftUI가 처음 나온 이후, Apple은 이미지 라이브러리인 SF Symbols를 제공해 왔습니다. Image 뷰를 사용하여 이 라이브러리의 이미지에 쉽게 액세스할 수 있습니다.

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

또한, Text 뷰의 글꼴 설정과 유사하게 이미지 크기를 조절할 수 있는 font 기능을 사용해 이미지의 크기를 조절할 수 있습니다.

```js
Image(systemName: "house.fill")
    .font(.largeTitle)
```

SwiftUI는 Apple 환경에서 프로젝트를 개발하는 새로운 방법입니다.

SwiftUI의 방식에 대해 생각을 조정하면 됩니다.

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

한번 그것을 할 수 있다면, SwiftUI의 문들이 완전히 열릴 것입니다!
