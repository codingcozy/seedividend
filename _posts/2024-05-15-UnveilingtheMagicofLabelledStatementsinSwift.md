---
title: "타입스크립트에서 레이블 문의 마법을 공개합니다"
description: ""
coverImage: "/assets/img/2024-05-15-UnveilingtheMagicofLabelledStatementsinSwift_0.png"
date: 2024-05-15 11:10
ogImage: 
  url: /assets/img/2024-05-15-UnveilingtheMagicofLabelledStatementsinSwift_0.png
tag: Tech
originalTitle: "Unveiling the Magic of Labelled Statements in Swift"
link: "https://medium.com/@navinsamuel26/unveiling-the-magic-of-labelled-statements-in-swift-a4adc8873331"
isUpdated: true
---




라벨 지정문은 다른 Swift 기능들만큼 화려하지는 않지만, 코드 가독성과 흐름 제어를 크게 향상시킬 수 있는 독특한 유연성을 지니고 있어요.

라벨 지정문을 사용하면 if, switch 또는 do 문과 같이 코드의 특정 부분에 이름을 지정할 수 있어요. 이는 중첩된 루프를 벗어나는 데 도움을 줄 수 있어요.

아래에는 라벨이 지정된 루프의 기본 예제가 있어요.

아래 코드에서는 제곱했을 때 4가 되는 첫 번째 숫자를 찾으려고 해요.



```js
let numbers = 1...50

for number1 in numbers {
    for number2 in numbers {
        if number1 == number2 && number1 * number2 == 4  {
            print(number1)
            break // 외부 루프를 종료시키지 않습니다
        }
    }
}
```

라벨을 사용하면 많은 도움을 받을 수 있습니다.

```js
let numbers = 1...50

outerLoop: for number1 in numbers {
    for number2 in numbers {
        if number1 == number2 && number1 * number2 == 4  {
            print(number1)
            break outerLoop // 외부 루프를 종료시킵니다
        }
    }
}
```