---
title: "Flexbox 완벽 가이드 상세 이해하기"
description: ""
coverImage: "/assets/img/2024-07-07-UnderstandingFlexboxAComprehensiveGuide_0.png"
date: 2024-07-07 21:19
ogImage:
  url: /assets/img/2024-07-07-UnderstandingFlexboxAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Understanding Flexbox: A Comprehensive Guide"
link: "https://medium.com/@MakeComputerScienceGreatAgain/understanding-flexbox-a-comprehensive-guide-992bcd5f04de"
---

![Understanding Flexbox](/assets/img/2024-07-07-UnderstandingFlexboxAComprehensiveGuide_0.png)

플렉스박스는 Flexible Box Layout의 약자로, 강력하고 다재다능한 CSS 레이아웃 모델로, 복잡하고 반응형 웹 레이아웃을 쉽게 디자인할 수 있게 해줍니다. 웹 개발자에게 필수 도구가 된 플렉스박스는 요소들을 컨테이너 내에서 더 효율적이고 직관적인 방법으로 배치할 수 있게 해줍니다. 이 기사에서는 플렉스박스의 기본을 탐구하고 그 능력을 활용하여 유연하고 반응형 웹 디자인을 만드는 방법을 알아보겠습니다.

# 플렉스박스란?

플렉스박스는 요소들의 크기가 알 수 없거나 동적인 경우에도 컨테이너 내에서 공간을 분배하고 요소들을 정렬할 수 있는 레이아웃 모델입니다. 부유(floating)와 위치 지정(positioning)과 같은 전통적인 레이아웃 모델과 달리, 플렉스박스는 요소들을 컨테이너 내에서 배치하는 더 예측 가능하고 유지보수가 쉬운 방법을 제공하여 복잡한 인터페이스를 구축하는 데 이상적입니다.

<div class="content-ad"></div>

# 주요 용어

Flexbox에 대해 더 알아보기 전에 몇 가지 주요 용어를 이해하는 것이 중요합니다:

1. 컨테이너: Flex 항목을 보유하는 상위 요소입니다. `display: flex` 또는 `display: inline-flex`를 사용하여 컨테이너를 플렉스 컨테이너로 정의합니다.

2. Flex 항목: 플렉스 컨테이너 내부의 자식 요소로, 컨테이너의 규칙에 따라 정렬 및 분배됩니다.

<div class="content-ad"></div>

3. Main Axis: flex 아이템이 분배되는 주축입니다. `flex-direction` 속성을 사용하여 수평(행) 또는 수직(열)을 지정할 수 있습니다.

4. Cross Axis: 주축에 수직인 축입니다. 다차원 레이아웃을 다룰 때 정렬과 분배를 제어하는 데 사용됩니다.

5. Main Start 및 Main End: 주축의 시작 및 끝 위치를 나타냅니다.

6. Cross Start 및 Cross End: 교차 축의 시작 및 끝 위치를 나타냅니다.

<div class="content-ad"></div>

# Flex Container Properties

요소를 플렉스 컨테이너로 만들려면 `display: flex` 또는 `display: inline-flex` 속성을 적용해야 합니다. 여기에는 플렉스 컨테이너에 적용할 수 있는 몇 가지 기본 속성이 있습니다:

1. flex-direction: 이 속성은 주 축 방향을 결정하여 플렉스 항목의 흐름을 행 또는 열로 설정할 수 있습니다. 주요 값으로 `row`, `row-reverse`, `column`, `column-reverse` 등이 있습니다.

2. justify-content: 주 축을 따라 플렉스 항목의 정렬을 제어합니다. 시작점, 끝점, 중앙 또는 공평하게 간격을 두고 분산되도록 설정할 수 있습니다.

<div class="content-ad"></div>

3. align-items: 이 속성은 플렉스 항목들을 교차 축을 따라 정렬합니다. 이를 사용하여 항목들을 컨테이너의 중앙에 정렬하거나 시작 또는 끝에 정렬할 수 있습니다.

4. align-content: 여러 행 또는 열의 플렉스 항목이 있는 경우, 이 속성은 그들이 교차 축에서 어떻게 정렬되는지 정의합니다.

# 플렉스 항목 속성

이제 개별 플렉스 항목에 적용할 수 있는 몇 가지 속성을 살펴보겠습니다:

<div class="content-ad"></div>

1. flex: `flex` 속성은 `flex-grow`, `flex-shrink`, 그리고 `flex-basis`를 하나로 묶은 단축 속성입니다. 이 속성은 flex 항목들이 서로에 비해 어떻게 확장 또는 축소되는지를 결정합니다.

2. order: `order` 속성을 사용하면 flex 항목이 컨테이너 내에서 나타나는 순서를 지정할 수 있습니다.

3. align-self: `align-items`가 컨테이너 내 모든 flex 항목에 적용되는 반면, `align-self`는 특정 flex 항목에 대한 정렬을 재정의할 수 있게 해줍니다.

# 코드 예시

<div class="content-ad"></div>

## 1. 기본 Flex 컨테이너 및 Flex 항목 만들기:

```js
<!DOCTYPE html>
<html>
<head>
    <style>
        .flex-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .flex-item {
            flex: 1; /* 모든 항목에 동일한 너비 설정 */
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="flex-container">
        <div class="flex-item" style="background-color: #3498db;">항목 1</div>
        <div class="flex-item" style="background-color: #e74c3c;">항목 2</div>
        <div class="flex-item" style="background-color: #27ae60;">항목 3</div>
    </div>
</body>
</html>
```

이 예제에서는 세 개의 플렉스 항목이 있는 플렉스 컨테이너를 만듭니다. display: flex 속성을 사용하여 컨테이너를 플렉스 컨테이너로 만듭니다. justify-content를 사용하여 항목을 서로 간에 공백을 유지하고 align-items를 사용하여 항목을 수직으로 중앙에 정렬합니다.

## 2. Flex 방향 변경하기:

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html>
<head>
    <style>
        .flex-container {
            display: flex;
            flex-direction: column; /* 방향을 세로로 변경합니다 */
        }

        .flex-item {
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="flex-container">
        <div class="flex-item" style="background-color: #3498db;">Item 1</div>
        <div class="flex-item" style="background-color: #e74c3c;">Item 2</div>
        <div class="flex-item" style="background-color: #27ae60;">Item 3</div>
    </div>
</body>
</html>
```

이 예제에서는 flex-direction을 "column"으로 변경하여 flex 항목이 수직으로 쌓이도록 설정했습니다.

## 3. 교차 축을 따라 Flex 항목 정렬하기:

```js
<!DOCTYPE html>
<html>
<head>
    <style>
      .flex-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* 교차 축의 시작 부분에 항목을 정렬합니다 */
      }

      .flex-container2 {
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* 교차 축의 시작 부분에 항목을 정렬합니다 */
      }

      .flex-item {
        padding: 20px;
        text-align: center;
      }
    </style>
</head>
<body>
    <div class="flex-container">
        <div class="flex-item" style="background-color: #3498db;">Item 1</div>
        <div class="flex-item" style="background-color: #e74c3c;">Item 2</div>
        <div class="flex-item" style="background-color: #27ae60;">Item 3</div>
    </div>
</body>
</html>
```

<div class="content-ad"></div>

여기서는 align-items를 사용하여 flex 항목을 교차 축의 시작점에 정렬하여 컨테이너의 맨 위로 이동합니다.

이 예시들은 Flexbox와 그 특성에 대한 기본적인 이해를 제공합니다. 이 특성들을 실험해보고 레이아웃을 사용자 지정하여 특정 디자인 요구에 맞게 조정할 수 있습니다.

# Flexbox의 장점

Flexbox를 이해하면 웹 디자인 작업을 크게 향상시키고 반응형 디자인을 더 쉽게 만들 수 있습니다. 여기에 몇 가지 주요 장점이 있습니다:

<div class="content-ad"></div>

1. 간편한 레이아웃: Flexbox는 요소를 배열하는 일을 간편하고 직관적으로 만들어 복잡한 레이아웃을 생성하는 과정을 단순화합니다.

2. 효율적인 간격 조절: Flexbox는 컨테이너 내에서 공간을 효율적으로 분배하여 요소가 사용 가능한 공간에 맞게 자동으로 크기를 조정할 수 있게 합니다.

3. 반응형 디자인: Flexbox를 사용하면 다양한 화면 크기와 방향에 맞춰 쉽게 반응형 디자인을 구축할 수 있습니다.

4. 해킹 필요성 감소: Flexbox를 사용하면 원하는 레이아웃을 구현하기 위해 CSS 해킹이나 해결책을 더 적게 필요로 하는 경우가 발생합니다.

<div class="content-ad"></div>

# 결론

Flexbox는 현대 웹 개발에 필수적인 도구로, CSS를 사용하여 반응형이고 복잡한 레이아웃을 쉽게 만들 수 있게 해줍니다. Flexbox의 기본 개념과 속성을 이해함으로써, 웹 디자인 스킬을 한 단계 업그레이드하고 더 유연하고 사용자 친화적인 웹사이트를 구축할 수 있습니다. Flexbox에 익숙해질수록, 디자인 프로세스를 최적화하고 사용자 경험을 개선하는 데 그 힘을 발견하게 될 것입니다. 그러니 프로젝트에서 Flexbox를 탐구하고 구현하여 그 전체 잠재력을 발휘해보세요.

더 많은 자료를 찾으시려면:
