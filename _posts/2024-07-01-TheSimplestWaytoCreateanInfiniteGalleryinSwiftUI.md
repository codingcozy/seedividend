---
title: "SwiftUI에서 무한 갤러리를 쉽게 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-01-TheSimplestWaytoCreateanInfiniteGalleryinSwiftUI_0.png"
date: 2024-07-01 17:01
ogImage:
  url: /assets/img/2024-07-01-TheSimplestWaytoCreateanInfiniteGalleryinSwiftUI_0.png
tag: Tech
originalTitle: "The Simplest Way to Create an Infinite Gallery in SwiftUI"
link: "https://medium.com/@max00d/the-simplest-way-to-create-an-infinite-gallery-in-swiftui-b8b202c480c8"
isUpdated: true
---

안녕하세요 여러분! iOS 앱에서 무한 갤러리를 만들어야 하는 일이 있었나요? 사진 목록이나 배송 앱에서 제품 목록을 만들 때 이런 필요성을 마주할 수 있습니다. 이 짧은 글에서는 가장 정확하고 간단한 방법을 보여드리겠습니다.

![간단한 무한 갤러리를 만드는 가장 간단한 방법](/assets/img/2024-07-01-TheSimplestWaytoCreateanInfiniteGalleryinSwiftUI_0.png)

SwiftUI는 UIKit 시대에는 꿈에도 못 꾸던 많은 것들을 구현할 수 있는 강력한 프레임워크입니다. 이 글에서는 SwiftUI의 내부 API인 PagingView를 사용할 것인데, 이 뷰는 문서화되어 있지 않지만 iOS 14부터 사용할 수 있는 매우 강력한 뷰입니다.

우선, 빈 ContentView를 메인 화면으로 하는 SwiftUI 프로젝트를 만들어봅시다.

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
import SwiftUI

@main
struct InfiniteGalleryApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

좋은 작업이에요! ContentView에서는 우리의 데이터 배열을 생성할 거예요 - 세 가지 색상(빨강, 초록, 파랑) - 이를 무한 갤러리에 배치할 거에요.

```js
import SwiftUI

struct ContentView: View {
    let colors: [Color] = [.red, .green, .blue]

    var body: some View {
        // some body
    }
}
```

뷰의 본문에는 \_PagingView의 인스턴스를 하나 넣을 거예요.

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
let colors: [Color] = [.red, .green, .blue]
@State private var currentCard: Int = 0

var body: some View {
    _PagingView(
        config: .init(direction: .horizontal, margin: 8, spacing: 8),
        page: $currentCard,
        views: cards
    )
}

private var cards: [AnyView] {
    // 우리의 색깔을 뷰 배열로 매핑합니다.
}
```

\_PagingView는 이 코드의 가장 흥미로운 부분입니다. 수평 또는 수직 방향으로 카드 세트를 분배하고 간격 및 정렬을 관리하며 심지어 페이지네이션도 제공합니다. SwiftUI의 ScrollView에서 iOS 17부터 사용 가능한 기능 중 하나입니다.

이제 cards 속성을 정의해 보겠습니다. 단순히 우리의 색깔을 색칠된 직사각형 배열로 매핑합니다.

```js
private var cards: [AnyView] {
    colors.map { color in
        AnyView(
            Rectangle()
                .fill(color)
                .frame(height: 72)
        )
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

이 코드로 인해 갤러리가 이미 잘 작동합니다. 그러나 우리는 무한 스크롤 효과를 얻을 수 없습니다. \_PagingView에 유한한 배열을 제공했기 때문에 그러합니다. 마지막 요소 이후에 아무것도 없기 때문에 \_PagingView 내부의 ScrollView는 간단히 콘텐츠 가장자리를 향해 튕겨져 다시 돌아올 뿐입니다.

<img src="https://miro.medium.com/v2/resize:fit:1200/1*tqZDRqYekPSCW1IPBcDzRg.gif" />

진정한 무한 행동을 달성하기 위해 \_PagingView는 views의 RandomAccessCollection을 인자로 받는다는 것을 기억해야 합니다. 우리는 이를 활용해서 무한 반복되는 사용자 정의 컬렉션을 만들어야 합니다. 마지막 요소 이후에 첫 번째 요소로 다시 돌아가는 InfiniteArray라는 컬렉션을 만들어 무한 행동을 보장할 수 있습니다. 이것을 살펴보세요:

```js
final class InfiniteArray<Content>: RandomAccessCollection {
    private var elements: [Content]

    init(elements: [Content]) {
        self.elements = elements
    }

    var startIndex: Int { Int.min }
    var endIndex: Int { Int.max) }

    subscript(position: Int) -> Content {
        let index = (elements.count + (position % elements.count)) % elements.count
        return elements[index]
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

우리가 반복하고 싶은 요소 배열에서 초기화할 수 있으며, n번째 요소 다음에 (n+1)번째 요소를 생성할 수 있습니다. 이제 cards 속성을 이 새로운 컬렉션을 사용하도록 수정해봅시다.

```js
private var cards: InfiniteArray<AnyView> {
    InfiniteArray(elements: colors.map { color in
        AnyView(
            Rectangle()
                .fill(color)
                .frame(height: 72)
        )
    )
}
```

이 수정으로 갤러리가 어떻게 변화되었는지 확인할 수 있습니다. 이제 우리가 원했던 무한한 동작을 갖고 있습니다!

<img src="https://miro.medium.com/v2/resize:fit:1200/1*y49T8uq9HNmc30b10WNoCg.gif" />

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

여러분, 이 글을 여기까지 읽어주셔서 감사합니다. 이 포스트에서는 40줄의 코드로 무한 페이징 갤러리를 구현했습니다. 이 프로젝트의 전체 코드에 관심이 있다면 여기에서 찾을 수 있어요 — https://github.com/maxoog/InfiniteGallery.
