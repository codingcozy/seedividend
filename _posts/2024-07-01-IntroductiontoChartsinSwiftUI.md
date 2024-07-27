---
title: "SwiftUI에서 차트 쉽게 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-01-IntroductiontoChartsinSwiftUI_0.png"
date: 2024-07-01 20:07
ogImage: 
  url: /assets/img/2024-07-01-IntroductiontoChartsinSwiftUI_0.png
tag: Tech
originalTitle: "Introduction to Charts in SwiftUI"
link: "https://medium.com/@blorenzop/swiftui-charts-b6fa4aca46db"
---


![Introduction to Charts in SwiftUI](/assets/img/2024-07-01-IntroductiontoChartsinSwiftUI_0.png)

사용자에게 정보를 제공할 때, 간편한 것이 더 좋습니다.

특히 큰 데이터 세트를 다룰 때는 그렇습니다. 사용자 정의 뷰, 테이블, 요약 등 다양한 옵션이 있지만, 좀 더 풍부한 경험을 제공하고자 그래픽 표현을 활용할 수 있습니다.

차트를 사용하면 사용자는 제시된 데이터에 대한 이해를 확장할 수 있습니다. 처음 봤을 때, 사용자는 데이터를 더 잘 파악할 수 있습니다.

<div class="content-ad"></div>

만약 앱의 참여를 높이고 싶다면, 차트를 활용하는 방법에 대한 빠르고 쉽게 따라할 수 있는 가이드를 보여드릴게요.

![차트](https://miro.medium.com/v2/resize:fit:592/1*7d3jOjvtUsl06TJrvp3q8w.gif)

# 기본 사항

차트를 만들 때는 차트 요소들을 조합하여 만듭니다. 이러한 요소들은 ChartContent 프로토콜을 준수해야 하며, 차트 범위 내에서 그려질 수 있는 유형을 나타내야 합니다.

<div class="content-ad"></div>

차트를 만들려면 init(content:) 메서드를 사용합니다. ViewBuilder 클로저에서 필요한 모든 시각적 요소를 추가합니다.

```js
struct ChartView: View {
  var body: some View {
    ChartView {
      // 차트 요소
    }
  }
}
```

## 알겠어요, 그런데 어떤 요소들을 추가할 수 있나요?

Charts framework에는 Marks라고 불리는 사용 준비된 ChartContent 세트가 있습니다. Mark는 데이터를 표현하는 그래픽 요소로 볼 수 있습니다.

<div class="content-ad"></div>


![image](/assets/img/2024-07-01-IntroductiontoChartsinSwiftUI_1.png)

## 차트에서 3가지 종류의 데이터를 사용할 수 있습니다.

- 양적 데이터: Int, Double, Float와 같은 수치 값.
- 명목 데이터: 이산적인 범주 또는 그룹.
- 시간적 데이터: 시점.

사용하는 데이터 유형에 따라 차트 UI를 조작하는 데 적용할 수 있는 구성 요소가 달라집니다.


<div class="content-ad"></div>

# 코드를 보여주겠어요 🤓

우리의 데모에서는 사용자가 latte, cappuccino, cortado, 그리고 flat white 유형에 대해 시간에 따라 소비한 커피의 수를 나타내고 싶어해요.

그래서 간단한 막대 차트를 만들어 총 커피 수를 보여줄까요?

```js
struct CoffeeData: Identifiable {
  typealias CoffeeDetails = (type: Coffee, amount: Int)
  let id = UUID()
  let date: Date
  let details: [CoffeeDetails]
  
  static func mockData() -> [CoffeeData] { ... }
}

struct DemoChart: View {
  @State private var coffeeData = CoffeeData.mockData()
  
  var body: some View {
    Chart {
      ForEach(coffeeData, id: \.id) { coffeeInfo in
        BarMark(
          x: .value("Date", coffeeInfo.date),
          y: .value("Coffee", totalCoffees(in: coffeeInfo.details))
        )
      }
    }
    .frame(height: 300)
    .padding()
  }
  
  func totalCoffees(in details: [CoffeeData.CoffeeDetails]) -> Int {
    return details.map({$0.amount}).reduce(0, +)
  }
}
```

<div class="content-ad"></div>


![Chart](/assets/img/2024-07-01-IntroductiontoChartsinSwiftUI_2.png)

## 차트 사용자 정의하기

커피 유형별 데이터를 구분하려면 CoffeeDetails를 추가 반복하고 foregroundStyle(by:) 수정자를 사용하여 정보를 그룹화해야 합니다.

```swift
struct DemoChart: View {
  @State private var coffeeData = CoffeeData.mockData()
    
  var body: some View {
    Chart {
      ForEach(coffeeData, id: \.id) { coffeeInfo in
        ForEach(coffeeInfo.details, id: \.type) { coffeeDetails in
          BarMark(
              x: .value("Date", coffeeInfo.date),
              y: .value("Coffee", coffeeDetails.amount)
          )
          .foregroundStyle(by: .value("Coffee Type", coffeeDetails.type))
        }
      }
    }
    .frame(height: 300)
    .padding()
  }
}
```


<div class="content-ad"></div>

<img src="/assets/img/2024-07-01-IntroductiontoChartsinSwiftUI_3.png" />

이 작은 변화로 데이터를 그룹화했습니다. 그러나 이 유형의 차트는 주로 특정 값의 진행 상황을 보여줄 때 사용됩니다.

우리의 경우, 각 커피 종류에 대해 한 막대 막대가 필요하기 때문에 각 X-값(즉, 월)에 대해 4개의 막대(라떼/카푸치노/코르타도/플랫화이트)가 필요합니다. 이를 위해 두 가지 변경 사항이 필요합니다:

- X-축 값에서 unit 옵션을 사용하여 월별로 값을 그룹화하려고 한다는 것을 표시합니다.
- 실제로 그룹화된 막대를 만들기 위해 position(by:axis:span:) 수정자를 사용합니다.

<div class="content-ad"></div>

```swift
struct DemoChart: View {
  @State private var coffeeData = CoffeeData.mockData()
    
  var body: some View {
    Chart {
      ForEach(coffeeData, id: \.id) { coffeeInfo in
        ForEach(coffeeInfo.details, id: \.type) { coffeeDetails in
          BarMark(
              x: .value("날짜", coffeeInfo.date, unit: .month),
              y: .value("커피 양", coffeeDetails.amount)
          )
          .foregroundStyle(by: .value("커피 종류", coffeeDetails.type))
          .position(by: .value("커피 종류", coffeeDetails.type))
        }
      }
    }
    .frame(height: 300)
    .padding()
  }
}
```

<img src="/assets/img/2024-07-01-IntroductiontoChartsinSwiftUI_4.png" />

# 차트를 우리의 요구에 맞게 계속 수정할 수 있습니다

## 사용자 정의 막대 색상


<div class="content-ad"></div>

chartForegroundStyleScale(_:) 수정자를 사용하세요. 그룹화에 사용하는 모든 옵션에 값을 지정해야 합니다. 우리 경우에는 Latte, Cappuccino, Cortado, FlatWhite을 사용하면 됩니다.

## 스케일 변경

차트 표식을 더 크거나 작게 만들기 위해 축에 표시되는 값들을 제어하려면 chartYScale(domain:type:) 및 chartXScale(domain:type:) 수정자를 사용할 수 있습니다. 도메인은 양적 및 날짜 유형에는 닫힌 범위(예: 0에서 15까지)이거나 이산 유형에는 값들의 배열이 될 수 있습니다.

## 축 레이블 구성

<div class="content-ad"></div>

우리 경우에는 X 축에 월과 연도를 함께 표시하는 것이 좋을 것 같아요, 예를 들면, 2023년 8월처럼요. chartXAxis(content:) 수정자를 사용하면 이를 할 수 있어요.

## 주석 추가

가끔은 차트의 표식에 추가 정보를 포함하여 더 읽기 쉽게 만들어야 할 때가 있어요. annotation(position:alignment:spacing:content)을 사용하면 어떤 보기든 표식과 함께 배치할 수 있어요.

```js
struct DemoChart: View {
  @State private var coffeeData = CoffeeData.mockData()
  
  var body: some View {
    Chart {
      ForEach(coffeeData, id: \.id) { coffeeInfo in
        ForEach(coffeeInfo.details, id: \.type) { coffeeDetails in
          BarMark(
            x: .value("날짜", coffeeInfo.date, unit: .month),
            y: .value("커피", coffeeDetails.amount)
          )
          .annotation(position: .위, alignment: .가운데) {
            Text("\(coffeeDetails.amount)")
          }
          .foregroundStyle(by: .value("커피 종류", coffeeDetails.type))
          .position(by: .value("커피 종류", coffeeDetails.type))
          .cornerRadius(12)
        }
      }
    }
    .chartForegroundStyleScale([
      Coffee.latte: Color.accentColor,
      Coffee.cappuccino: Color.accentColor.opacity(0.7),
      Coffee.cortado: Color.accentColor.opacity(0.5),
      Coffee.flatwhite: Color.accentColor.opacity(0.3),
    ])
    .chartXAxis {
      AxisMarks(values: .stride(by: .month, count: 1)) { _ in
        AxisValueLabel(format: .dateTime.month(.abbreviated).year(.twoDigits), centered: true)
      }
    }
    .chartScrollableAxes(.수평)
    .chartYScale(domain: 0 ... 15)
    .frame(height: 300)
    .padding()
  }
}
```

<div class="content-ad"></div>


<img src="/assets/img/2024-07-01-IntroductiontoChartsinSwiftUI_5.png" />

# Composing & Interactivity

내가 차트를 만들 때 다른 ChartComponent를 추가해서 만든다고 했던 걸 기억하는가? 이러한 구성 요소들은 꼭 동일한 유형이어야 하는 것은 아니다.

<img src="/assets/img/2024-07-01-IntroductiontoChartsinSwiftUI_6.png" />


<div class="content-ad"></div>

라인마크와 에어리아마크를 결합하여 이 UI를 구현할 수 있습니다. 

```js
struct OverallData: Identifiable {
    let id = UUID()
    let date: Date
    let coffee: Int
    
    static func mockData() -> [OverallData] {
        
        return [
            .init(date: Date(year: 2023, month: 08), coffee: 12),
            .init(date: Date(year: 2023, month: 09), coffee: 15),
            .init(date: Date(year: 2023, month: 10), coffee: 8),
            .init(date: Date(year: 2023, month: 11), coffee: 18),
            .init(date: Date(year: 2023, month: 12), coffee: 14),
            .init(date: Date(year: 2024, month: 01), coffee: 22),
        ]
    }
}

struct DemoChart: View {
  @State private var overallData = OverallData.mockData()

  private var areaBackground: Gradient {
    return Gradient(colors: [Color.accentColor, Color.accentColor.opacity(0.1)])
  }

  var body: some View {
    Chart(overallData) {
      LineMark(
        x: .value("월", $0.date, unit: .month),
        y: .value("양", $0.coffee)
      )
      .symbol(.circle)
      .interpolationMethod(.catmullRom)
      
      AreaMark(
        x: .value("월", $0.date, unit: .month),
        y: .value("양", $0.coffee)
      )
      .interpolationMethod(.catmullRom)
      .foregroundStyle(areaBackground)
    }
    .chartXAxis {
      AxisMarks(values: .stride(by: .month, count: 1)) { _ in
        AxisValueLabel(format: .dateTime.month(.abbreviated).year(.twoDigits), centered: true)
      }
    }
    .chartYScale(domain: 0 ... 30)
    .frame(height: 300)
    .padding()
  }
}
```

이 조합을 계속해서 룰마크를 추가하고 사용자가 특정 지점을 선택하여 값을 볼 수 있는 사용자 정의 뷰를 주석으로 추가할 수 있습니다.

<img src="https://miro.medium.com/v2/resize:fit:592/1*J24NHU32eh38kMeASpLt1A.gif" />

<div class="content-ad"></div>

```swift
struct DemoChart: View {
  @Environment(\.calendar) var calendar
  @State private var coffeeData = CoffeeData.mockData()
  @State private var overallData = OverallData.mockData()
  @State private var chartSelection: Date?
    
  private var areaBackground: Gradient {
      return Gradient(colors: [Color.accentColor, Color.accentColor.opacity(0.1)])
  }

  var body: some View {
    Chart(overallData) {
      LineMark(
        x: .value("Month", $0.date, unit: .month),
        y: .value("Amount", $0.coffee)
      )
      .symbol(.circle)
      .interpolationMethod(.catmullRom)
      
      if let chartSelection {
        RuleMark(x: .value("Month", chartSelection, unit: .month))
          .foregroundStyle(.gray.opacity(0.5))
          .annotation(
            position: .top,
            overflowResolution: .init(x: .fit, y: .disabled)
          ) {
            ZStack {
              Text("\(getCoffee(for: chartSelection)) coffees")
            }
            .padding()
            .background {
              RoundedRectangle(cornerRadius: 4)
                .foregroundStyle(Color.accentColor.opacity(0.2))
            }
          }
      }
      
      AreaMark(
        x: .value("Month", $0.date, unit: .month),
        y: .value("Amount", $0.coffee)
      )
      .interpolationMethod(.catmullRom)
      .foregroundStyle(areaBackground)
    }
    .chartXAxis {
      AxisMarks(values: .stride(by: .month, count: 1)) { _ in
          AxisValueLabel(format: .dateTime.month(.abbreviated).year(.twoDigits), centered: true)
      }
    }
    .chartYScale(domain: 0 ... 30)
    .frame(height: 300)
    .padding()
    .chartXSelection(value: $chartSelection)
  }
}
```

# 배울 점

- 그래픽 요소를 고려하기 전에 사용자에게 보여주고 싶은 내용을 고려해보세요. 어떤 정보를 전달하고 싶으신가요?
- 데이터 모델링에 집중하세요. 데이터를 어떻게 모델링하느냐가 차트를 작업하기 쉽게 할 것입니다.
- 그룹화된 정보를 제공하여 사용자에게 차트에서 발견할 데이터의 일부를 미리 보여줍니다.
- 차트 작업을 시작하는 데 도움이 되는 몇 가지 기본 사항을 보여드렸습니다. 그러나 차트를 더욱 효과적으로 만들기 위해 사용할 수 있는 많은 구성 및 조정 사항이 있습니다. 공식 Apple 차트 문서를 자세히 살펴보고 WWDC 세션을 시청하는 것을 추천드립니다.

질문이 있으신가요? 언제든지 메시지 남겨주세요! 🙂


<div class="content-ad"></div>

- 🤓 iOS 개발 팁과 통찰을 정기적으로 공유하는 X에서 저와 함께하세요
- 🚀 제 GitHub에서 내 예제 프로젝트들을 확인해보세요