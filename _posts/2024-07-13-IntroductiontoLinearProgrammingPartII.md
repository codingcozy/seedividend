---
title: "선형 프로그래밍 개론  2부"
description: ""
coverImage: "/assets/img/2024-07-13-IntroductiontoLinearProgrammingPartII_0.png"
date: 2024-07-13 20:51
ogImage: 
  url: /assets/img/2024-07-13-IntroductiontoLinearProgrammingPartII_0.png
tag: Tech
originalTitle: "Introduction to Linear Programming — Part II"
link: "https://medium.com/towards-data-science/introduction-to-linear-programming-part-ii-4fa9521ac3a7"
---


작년에 작은 가족 소유 철강 및 금속 사업에서 일하는 친구에게 접근 받았습니다. 그는 철강 빔을 절단할 때 낭비를 최소화하는 데 도움이 되는 무언가를 만들 수 있는지 궁금해 했습니다. 선형 프로그래밍을 활용한 문제 해결 같네요!

제가 처음 시작했을 때는 R을 사용한 선형 프로그래밍 방법에 대한 초보자를 위한 기사가 많지 않았습니다. 선형 프로그래밍을 R에서 사용하는 방법에 대해 수학에 익숙하지 않은 분들에게 적합한 가이드도 드문 듯 했어요. 또한 2023년 초반에는 ChatGPT가 선형 프로그래밍 관련 정보를 잘 제공하지 않아, 제가 가이드를 바라게 되기도 했습니다.

이 시리즈는 그런 가이드가 되기 위한 제 노력의 일환입니다. 누군가에게 도움이 되길 바래봅니다.

이 글은 시리즈의 두 번째 부분이며, R에서 선형 프로그래밍에 대한 소개를 찾고 계시다면 첫 번째 부분을 참조해 주세요.

<div class="content-ad"></div>

# 수학을 잘 못해서 조금 헷갈리는데요..!?

선형 프로그래밍 또는 선형 최적화 이론을 읽으면, 많은 수학적인 내용을 마주하게 됩니다. 만약에 수학 배경이 부족하다면, 이 부분이 조금 거부감을 일으킬 수 있습니다(저도 그렇습니다). 저는 수학 수업을 충분히 듣지 않아서 심볼들을 많이 이해하지 못하기 때문에 어렵게 느꼈습니다. 하지만, 이 글에서 코드 원리를 적용하는 데 수학 내용을 이해할 필요는 없습니다.

![이미지](/assets/img/2024-07-13-IntroductiontoLinearProgrammingPartII_0.png)

# 문제 정의하기

<div class="content-ad"></div>

나머지 부분에서는 각 부분마다 두 가지 소목을 설정하겠습니다: 수학식을 설명하고 코드와 어떻게 관련이 있는지를 설명하는 부문과, 코드에만 초점을 맞춘 부문입니다.

이렇게 하면 도움이 될 것 같아요 — 만약 코드만 필요한 경우에는 수학 부분을 건너뛰세요.

이 경우에는 제 친구가 생산 계획을 책임지고 있었고, 자르기 후 남은 폐기물이 종종 많다는 것을 알았어요. 생산 계획을 수동으로 하다보니 시간이 많이 걸리는 문제점을 발견했고, 우리는 함께 몇 가지 문제 정의를 생각해냈어요:

- 생산 계획의 각 작업 항목은 정확히 한 번 자르기 (작은 자르기를 용접해야 하는 일을 피하기 위해)
- 자를 길이의 합은 재고에서 사용 가능한 길이를 초과해서는 안 됨
- 선택한 빔은 작업 지시서의 차원과 일치해야 함
- 선택된 빔은 작업 지시서의 표면 처리와 일치해야 함

<div class="content-ad"></div>

이 기사를 위해 데이터 구조 중 일부를 단순화하고, 코드를 제공하여 모델을 만들 수 있도록 할 것입니다. 작업 항목은 workTable이라는 데이터 프레임에 보관되었고, 비슷하게 재고는 inventoryTable이라는 데이터 프레임에 보관되었습니다.

코드를 좀 더 명확하게 만들기 위해 추가적인 도우미 변수가 정의되었습니다. 예를 들어, numberOfWorkItems와 numberOfInventoryItems와 같은 변수들입니다. 또 다른 유용한 변수는 Big M 숫자입니다. 이 기술은 MILP 모델의 논리적 조건을 활성화할 수 있게 합니다. Big M을 선택하는 코드는 다음과 같습니다:

bigMNumber `- sum(workTable$Length)

코드로 이동할 때 Big M의 역할이 더 분명해질 것입니다. 하지만 이 모델에서 우리는 새로운 재고 항목을 가져올 때 모델이 그것을 인식하는 시기를 알기 위해 이를 사용합니다.

<div class="content-ad"></div>

# 인수 (수학)

모델의 인수는 다음과 같습니다 (다시 말하지만, Medium은 수학식의 형식을 잘 표현하지 못합니다):

![수식](/assets/img/2024-07-13-IntroductiontoLinearProgrammingPartII_1.png)

# 결정 변수 (수학)

<div class="content-ad"></div>


![image](/assets/img/2024-07-13-IntroductiontoLinearProgrammingPartII_2.png)

# The constraints (math)

And the constraints can be expressed as follows:

![image](/assets/img/2024-07-13-IntroductiontoLinearProgrammingPartII_3.png)


<div class="content-ad"></div>

# 매개변수 (코드)

위에서는 수학적 문제 정의를 코드로 표현하였습니다. 이제 코드로 해결해 봅시다. 아래는 사용한 모의 작업과 재고를 포함한 데이터의 간소화된 버전입니다.

```js
# 모의 데이터 생성
inventoryTable <- data.frame(
    ID =  sapply(1:10, function(x) paste(sample(0:9, 5, replace = TRUE), collapse = "")),
    Dimension = c(rep("HUP 120x120x5", 5), rep("HUP 150x150x5", 5)),
    Length = c(1000, 2000, 3000, 4000, 5000, 1000, 2000, 3000, 4000, 5000),
    Surface = c(rep("Black", 5), rep("Primed", 5))
)

workTable <- data.frame(
    JobName = c("Job 1", "Job 2", "Job 3", "Job 4", "Job 5"),
    Dimension = c("HUP 120x120x5", "HUP 120x120x5", "HUP 150x150x5", "HUP 150x150x5", "HUP 150x150x5"),
    Surface = c("Black", "Black", "Primed", "Primed", "Primed"),
    Length = c(500, 1000, 1500, 750, 2000)
)
```

위 코드는 길이가 다른 10개의 보를 포함하는 재고 테이블을 생성하고, 작업 테이블은 우리가 계획해야 할 다섯 개의 작업을 포함하고 있습니다.

<div class="content-ad"></div>

```js
# 모델 매개변수 정의
workTable의 행 수를 numberOfWorkItems에 할당
inventoryTable의 행 수를 numberOfInventoryItems에 할당
bigMNumber를 sum(as.numeric(workTable$Length)) * 1.1로 계산
```

```js
결정 변수 (코드)
```

이제 결정 변수와 제한 조건, 그리고 목적 함수로 모델을 정의하기 시작합니다. 모델의 전체 코드는 기사의 끝에 제공될 예정이며, 아래는 코드의 단계별 설명입니다:

```js
library(ompr)
# 모델 정의

MIPModel() |>
    # 어떤 작업 항목이 어느 재고 항목에서 잘렸는지를 나타내는 이진 결정 변수 추가
    add_variable(cutSteel[work, inventory],
        work = 1:numberOfWorkItems,
        inventory = 1:numberOfInventoryItems,
        type = "binary"
    ) |>
    # 새 항목을 재고에서 가져오게 하는 이진 결정 변수 추가
    add_variable(takeItem[inventory],
        inventory = 1:numberOfInventoryItems,
        type = "binary"
    ) |>
    # 작업 항목과 재고 항목의 유형이 일치하는지를 나타내는 이진 변수 추가
    add_variable(typeMatch[work, inventory],
        work = 1:numberOfWorkItems,
        inventory = 1:numberOfInventoryItems,
        type = "binary"
    ) |>
    # 작업 항목과 재고 항목의 표면이 일치하는지를 나타내는 이진 변수 추가
    add_variable(surfaceMatch[work, inventory],
        work = 1:numberOfWorkItems,
        inventory = 1:numberOfInventoryItems,
        type = "binary"
    )
```

<div class="content-ad"></div>

저희의 첫 번째 결정 변수는 어떤 작업 항목이 어떤 재고 항목에서 잘릴지를 나타냅니다. 인덱스 work는 잘릴 작업 항목을 나타내며, inventory는 잘릴 보름가능한 보들을 나타냅니다. 결정 변수는 바이너리이며, cutSteel[1,1] = 1은 작업 항목 1이 재고 항목 1에서 잘렸을 때를 의미합니다. 이 변수를 통해 어떤 작업 항목이 어떤 재고 항목에 할당되었는지 추적할 수 있으며, 이후에 매우 중요해집니다.

두 번째 변수는 재고에서 또 다른 보를 가져와야하는지 여부를 추적합니다. 이 변수는 일차원이며, 인덱스는 재고만 해당됩니다.

세 번째와 네 번째 결정 변수는 선택된 작업 항목의 치수 및 표면 처리가 선택된 재고 항목과 일치하는지 확인하는 데 사용됩니다.

# 제약 조건 (코드)

<div class="content-ad"></div>

총 여섯 가지 제약 조건이 있습니다:

```js
# 제약 조건 1: workTable에 있는 각 항목은 정확히 한 번 잘려야 합니다
    add_constraint(
        sum_over(cutSteel[work, inventory],
            inventory = 1:numberOfInventoryItems
        ) == 1,
        work = 1:numberOfWorkItems
    ) |>
    # 제약 조건 2: 잘려진 각 항목의 합계가 잘리기 위해 필요한 항목보다 크거나 같아야 함 #nolint
    add_constraint(
        sum_over(cutSteel[work, inventory] * workTable$Length[work],
            work = 1:numberOfWorkItems
        ) <= inventoryTable$Length[inventory],
        inventory = 1:numberOfInventoryItems
    ) |>
    # 제약 조건 3: 길이가 잘릴 때마다 takeItem을 활성화하는 bigMNumber 제약 조건 #nolint
    add_constraint(
        sum_over(cutSteel[work, inventory],
            work = 1:numberOfWorkItems
        ) <= bigMNumber * takeItem[inventory],
        inventory = 1:numberOfInventoryItems
    ) |>
    # 제약 조건 4: types가 일치할 때 typeMatch는 1이어야 함
    add_constraint(
        typeMatch[work, inventory] == (workTable$Dimension[work] == inventoryTable$Dimension[inventory]), # nolint
        work = 1:numberOfWorkItems, inventory = 1:numberOfInventoryItems
    ) |>
    # 제약 조건 5: surfaces가 일치할 때 surfaceMatch는 1이어야 함
    add_constraint(
        surfaceMatch[work, inventory] == (workTable$Surface[work] == inventoryTable$Surface[inventory]), # nolint
        work = 1:numberOfWorkItems, inventory = 1:numberOfInventoryItems
    ) |>
    # 제약 조건 6: typeMatch와 surfaceMatch가 1인 경우에만 cutSteel은 1이어야 함 #nolint
    add_constraint(
        cutSteel[work, inventory] <= typeMatch[work, inventory],
        work = 1:numberOfWorkItems, inventory = 1:numberOfInventoryItems
    ) |>
    add_constraint(
        cutSteel[work, inventory] <= surfaceMatch[work, inventory],
        work = 1:numberOfWorkItems, inventory = 1:numberOfInventoryItems
    )
```

첫 번째 제약 조건은 각 항목이 한 조각에서 잘려야 한다는 것을 나타냅니다. 즉, 4000mm 빔에 대한 주문이 있다면 이는 재고에서 한 조각의 빔에서 나와야 합니다(이는 고객 요구사항으로, 이들은 이를 잘라서 다시 용접할 필요가 없다고 했습니다).

중요: 재고 및 작업 정의의 배치 차이에 유의해야 합니다. 결정 변수에서는 둘 다 동일한 괄호 안에 정의했지만, 여기서는 inventory를 sum_over() 함수 내에서, work는 바깥쪽에서 정의했습니다. 왜 그럴까요? inventory는 총 재고 항목에 대한 총합 인덱스로 사용되기 때문입니다. 그에 반해 work는 제약 조건의 적용 가능성을 지정하는 데 사용되며, 즉 제약 조건이 모든 작업 항목에 대해 참이어야 합니다. 정의의 위치를 혼란스럽게 섞어 넣으면 버그 수정하는 데 시간이 많이 소비되고 머리카락을 추억하게 될 수도 있습니다(들어본 바가 있습니다…).

<div class="content-ad"></div>

두 번째 제약 조건은 상당히 명백하며, 재고에서 선택된 항목이 충분히 긴지를 보장하기 위해 사용됩니다 (`= inventoryTable$Length[inventory]` 여기서 재고가 있습니다). 이 제약 조건은 재고에 있는 모든 항목에 적용되므로 sum_over() 함수 외부에 정의된 인덱스입니다.

세 번째 제약 조건은 이 글 초반에서 언급한 "Big M"과 관련이 있습니다. 이 제약 조건은 특정 재고 항목이 사용되면 해당 항목이 '사용된 것' 또는 '활성화된 것'임을 보장합니다. "Big M" 숫자의 역할은 조건을 켜거나 끌 수 있는 상수를 가지고 있다는 것입니다. 이것은 논리적 조건을 MILP 모델로 변환할 수 있는 기술입니다. 작동 방식은 takeItem[inventory]이 0인 한, 우변이 0이 되어 그 항목의 cutSteel 합계가 0이어야 한다는 것입니다(즉, 활성화되지 않음). takeItem[inventory]이 1이되면, 우변은 sum of cutSteel이 사실상 무한대가 되도록 충분히 큰 bigNumber로 변환됩니다. 이를 통해 이 제약 조건이 논리적 ON/OFF 스위치로 작동할 수 있게 됩니다.

네 번째, 다섯 번째, 여섯 번째 제약 조건은 동일한 목적을 달성합니다. 즉, 작업 큐에 있는 항목의 치수 및 표면 처리와 재고에서 선택된 빔 간에 일치하는지를 확인하는 것입니다. 표면적으로 여섯 번째 제약 조건은 불필요해 보일 수 있지만, 실제로 논리적 AND 조건으로 작동합니다.

# 목적 함수 (수학)

<div class="content-ad"></div>

![image](/assets/img/2024-07-13-IntroductiontoLinearProgrammingPartII_4.png)

문제 정의에는 두 부분이 있습니다. 하나씩 하나씩 살펴보겠습니다:

![image](/assets/img/2024-07-13-IntroductiontoLinearProgrammingPartII_5.png)

간단히 말해서, 사용된 모든 재고 품목의 총 길이를 계산하라는 뜻입니다. 순서대로 진행하겠지만, 예제부터 시작해봅시다.

<div class="content-ad"></div>

우리가 자르는 필요가 있는 빔이 세 개 있습니다. 길이가 1000mm, 1500mm 및 2000mm입니다 (이것이 우리의 생산 계획 또는 W입니다). 우리의 재고 빔은 길이가 3000mm, 4000mm 및 2000mm입니다 (이것이 우리의 재고 또는 I입니다). 실제로 자르기 치수, 표면 처리 또는 자르기 실제 크기를 고려하지는 않지만, 이 상당히 간단한 예제는 쉽게 해결할 수 있습니다. 우리는 최적의 해결책이 3000mm 빔을 사용하여 1000mm 및 2000mm인 빔을 자르고, 1500mm 주문은 2000mm인 빔으로 충족될 수 있다는 것을 알 수 있습니다.

우선 생소할 수 있는 일부 기호의 번역을 시작하겠습니다:
 
- 크기가 큰 이상한 E는 “합계”를 의미합니다.
- 합계 기호 아래에는 세 가지 기호, i, ∈ 및 I가 있습니다. ∈는 집합 소속을 나타내며 "소속 요소"로 해석할 수 있습니다. 소문자 i는 항목(빔)을 의미하고 대문자 I는 재고 물품의 집합을 나타냅니다.
- takeItem은 이항 의사결정 변수이며, 항목(i)이 재고에서 꺼내져 사용되어 작업 항목을 자를 경우 1과 같고, 그렇지 않으면 0입니다.
- 소문자 l은 길이를 의미하며, 아래 첨자가 있는 소문자 i는 항목 i의 길이를 의미합니다. 위의 예에서 예를 들어, 이는 재고에서 꺼낸 빔 중 하나의 길이가 2000mm일 것입니다.

종합적으로, 이 공식 일부를 해석하면:

<div class="content-ad"></div>

모든 사용된 재고 품목의 총 길이를 계산하세요. 위의 예시에서, 만약 재고 보딩이 A(3000mm), B(4000mm), C(2000mm)로 표시되어 있다면, 우리는 A와 C를 사용하게 됩니다. 따라서 합계 결과는 6000mm이 될 것입니다(4000 x 1 + 2000 x 1).

![이미지](/assets/img/2024-07-13-IntroductiontoLinearProgrammingPartII_6.png)

문제 정의의 두 번째 부분은 첫 번째와 유사합니다. 실제로 절단된 보딩들의 총 길이를 계산합니다. 이진 결정 변수인 cutSteel은 해당 품목의 길이가 포함되는지 아닌지를 나타냅니다.

한데 정리하면, 두 부분은 먼저 재고에서 사용된 보딩들의 총 길이를 계산한 후, 절단된 강철의 길이를 뺍니다. 그러면 어떤 재료 양이 남게 되는데, 이 양을 최소화하고 싶어합니다.

<div class="content-ad"></div>

# 목적 함수 (코드)

```js
# 몰딩체 / 낭비량을 최소화하도록 목적 함수 설정
    set_objective(
        sum_over(
            takeItem[inventory] * inventoryTable$Length[inventory],
            inventory = 1:numberOfInventoryItems
        )
        - sum_over(cutSteel[work, inventory] * workTable$Length[work],
                work = 1:numberOfWorkItems,
                inventory = 1:numberOfInventoryItems
            ),
        sense = "min"
    )
```

만일 목적 함수의 수학 부분을 읽어보았다면, 코드가 익숙할 것입니다. 그렇지 않다면, 위의 코드에는 두 가지 합이 있습니다:

첫째로, 재고에서 사용된 전체 보 길이를 요약합니다. takeInventory가 1인 (즉, 항목이 사용된 경우) 재고 항목마다 해당 길이와 곱함입니다. 따라서 3000mm 길이의 보를 가져오면, 1 * 3000 = 3000이 됩니다. 1:numberOfInventoryItems 인덱스는 이것이 inventoryTable의 모든 항목에 대해 이루어져야 한다는 것을 나타냅니다. 가져오지 않은 항목에 대해서 3000mm 보를 사용하는 경우, 공식은 0 * 3000 = 0이 됩니다.

<div class="content-ad"></div>

두 번째 부분은 동일한 작업을 수행하지만, 이번에는 결정 변수 cutSteel에 대해 진행합니다. 이 변수는 생산 계획에서 어떤 빔이 어떤 재고 항목에서 잘렸는지를 나타냅니다. 이 변수도 이진값을 가지며, 생산 계획의 빔 1이 재고의 빔 4에서 자르는 경우 cutSteel[1,4]라고 표기됩니다. 이때, 빔 1이 4000mm일 경우 1 * 4000 = 4000이 됩니다. 우리는 작업 및 재고 인덱스를 모두 정의하면서도 실제로 관심 있는 것은 생산 계획 항목의 길이입니다.

그런 다음 첫 번째에서 두 번째를 빼서 선택한 빔에서 발생하는 초과 재료를 계산합니다. 매개변수 sense = "min"은 최적화 방향을 나타냅니다. 즉, 남은 재료 양을 최소화하려는 것입니다.

제약 조건을 모두 충족하는 두 가지 구성을 고려할 때:

옵션 1: 1000mm(A), 2000mm(B), 4000mm(C)의 빔을 1000mm(1), 2000mm(2), 3000mm(3), 5000mm(4), 6000mm(5)의 빔 재고에서 잘라냅니다. A를 1에서, B를 2에서, C를 5에서 잘랐습니다. 선택된 항목의 길이 총합(목적 함수의 첫 번째 부분)은 1000 + 2000 + 6000 = 9000입니다. 잘린 재료의 총합(목적 함수의 두 번째 부분)은 1000 + 2000 + 4000 = 7000입니다. 그 결과, 두 값의 차인 9000 - 7000 = 2000이 됩니다.

<div class="content-ad"></div>

옵션 2: 길이가 1000mm(A), 2000mm(B), 그리고 4000mm(C)인 보들을 1000mm(1), 20000mm(2), 3000mm(3), 5000mm(4), 6000mm(5)로 이루어진 재고에서 잘라내었습니다. A는 1에서, B는 2에서, C는 4에서 잘라냈습니다. 선택한 항목들의 길이 합은 1000 + 2000 + 5000 = 8000입니다. 잘라낸 재료의 총량은 1000 + 2000 + 4000 = 7000입니다. 두 합의 차이는 9000 - 7000 = 1000입니다. 

남은 재료를 최소화하고 싶다면, 최적화 엔진은 옵션 2를 가장 좋은 선택으로 판단할 것입니다.

# 모델 해결(코드만)

모델을 갖게 되면, 우리는 이를 솔버에 전달할 수 있습니다. 앞서 말한 바와 같이, 여러 상업용 솔버가 있지만, 이 문제에는 여전히 무료로 사용할 수 있는 "glpk" 솔버를 사용할 것입니다. 모델이라는 모델이 존재할 때, 다음은 결과와 해를 얻는 방법입니다:

<div class="content-ad"></div>

```js
# 모델 해결하기
result <- solve_model(model, with_ROI(solver = "glpk"))

# 솔루션 가져오기
solution <- get_solution(result, cutSteel[work, inventory])
```

get_solution() 함수로부터 얻은 결과 데이터프레임은 꽤 크므로 읽기가 조금 어려울 수 있습니다. cutSteel 변수를 행렬로 정의했으므로 workTable(5행)과 inventoryTable(10행)의 행렬에서 나오는 데이터프레임은 50행이 됩니다. workTable의 각 항목에 대해 엔진은 인벤토리의 10개 항목 중 어떤 것에서 잘라야 하는지 확인합니다. 어떤 항목이 어떤 인벤토리 항목에서 잘려야 하는지에 관심이 있으므로 사용되지 않은 항목을 필터링하려면 다음 코드를 추가합니다:

```js
# 모델 해결하기
result <- solve_model(model, with_ROI(solver = "glpk"))

# 솔루션 가져오기
solution <- get_solution(result, cutSteel[work, inventory]) %>%
    filter(value > 0)
```

이렇게하면 다음과 같은 5행 데이터프레임을 얻을 수 있습니다:

<div class="content-ad"></div>

```js
변수 작업 재고 값
1 cutSteel 1 2 1
2 cutSteel 2 2 1
3 cutSteel 3 10 1
4 cutSteel 4 10 1
5 cutSteel 5 10 1
```

여전히 사람이 읽기에는 다소 번잡스러울 수 있지만, 이후에 정리할 예정이에요. 하지만 이 표는 다음과 같이 읽을 수 있어요:

- 작업 항목 1과 2는 재고 항목 2에서 잘렸어요
- 작업 항목 3, 4, 5는 재고 항목 10에서 잘렸어요

좀 더 유용한 정보를 추가하면서 보기 좋은 생산 계획을 만들려면 다음과 같이 할 수 있어요:

<div class="content-ad"></div>

```js
# 문제 해결 방법 가져오기
solution <- get_solution(result, cutSteel[work, inventory])  |>
    filter(value > 0)  |>
    mutate(cutLength = workTable$Length[work])
```

먼저 솔루션에 cutLength라는 변수를 추가하여 자른 양을 알 수 있습니다.

다음으로, dplyr 함수 mutate() 및 select()를 사용하여 workTable 및 inventoryTable의 일부 정보를 다시 추가합니다.

```js
productionPlan <- solution |>
    select(-c(variable, value)) |>
    arrange(work) |>
    mutate(
        JobName = workTable$JobName[work],
        Dimension = workTable$Dimension[work],
        Surface = workTable$Surface[work],
        Length = workTable$Length[work],
        InventoryID = inventoryTable$ID[inventory],
        `Start length` = inventoryTable$Length[inventory],
        `Cut length` = cutLength,
        `Leftover` = inventoryTable$Length[inventory] - cutLength,
    ) |>
    select(-c(work, inventory, cutLength))
```

<div class="content-ad"></div>

다음과 같은 정보를 얻을 수 있습니다:

```js
작업명   치수   표면   길이   재고ID   시작 길이   자른 길이   잉여
1   작업 1 HUP 120x120x5   블랙   500   84508   2000   500   1500
2   작업 2 HUP 120x120x5   블랙   1000   84508   2000   1000   1000
3   작업 3 HUP 150x150x5   프라임드   1500   48222   5000   1500   3500
4   작업 4 HUP 150x150x5   프라임드   750   48222   5000   750   4250
5   작업 5 HUP 150x150x5   프라임드   2000   48222   5000   2000   3000
```

이제 어떤 작업이 어떤 항목에서 잘라져야 하는지 확인할 수 있습니다 (재고ID는 무작위로 생성되므로 제공된 코드를 사용하면 ID가 달라지지만 선택된 소재는 동일합니다). 제공할 다른 정보는 당신에게 달려 있으며, 이 경우에는 몇 가지 예를 들었습니다. 예를 들어, 생산 계획은 시작 시 사용 가능한 길이, 자른 양 및 자르고 남은 양에 대한 정보를 제공합니다. 여러 번 자른 보륜의 경우 각각의 자르기마다 "잉여"가 변경됨을 주목하세요.

이러한 정보를 다시 추가할 때, 모델에서 제공된 동일한 매트릭스를 사용합니다. 이를 통해 [work] 및 [inventory] 인덱스를 사용하여 각 작업의 이름을 얻을 수 있습니다.

<div class="content-ad"></div>

# 요약

시리즈의 두 번째 파트는 선형 프로그래밍에 대해 더 자세히 소개하는 것을 목표로 했습니다. 실제 예시를 사용했고 수학적 개념에 대해 언급했지만, 맨 처음에 말했듯이, 수학을 이해하거나 읽을 수 있어야만 솔루션을 코딩할 필요는 없습니다.

그렇다고 해도, 선형 프로그래밍에 시간을 투자할 계획이 있다면, 적어도 수식을 읽을 정도로 충분히 숙지하는 것을 추천합니다. 많은 이론과 문서에서 이를 참조하기 때문입니다.

이 글에서 사용된 코드는 프로젝트의 일환으로 작성되었으며 (일부를 문서에 맞게 수정했습니다), Shiny 앱에서 사용되었습니다. 그러나 이 앱은 실제 문제를 다루기 때문에 훨씬 복잡합니다. 작업 계획, 자재 예약, 계획된 자재의 재고로의 반납, 배치 등 실제 문제도 다루고 있습니다. 충분한 관심이 있다면, 이 경험에 대한 글을 작성할 수도 있겠지만, 우리가 보겠습니다.

<div class="content-ad"></div>

흥미로운 두 번째 설치가 되었으면 좋겠습니다. 궁금한 사항이나 의견이 있으면 언제든지 문의해주세요.

약속한 대로 전체 코드는 제 GitHub에서 확인하실 수 있습니다.