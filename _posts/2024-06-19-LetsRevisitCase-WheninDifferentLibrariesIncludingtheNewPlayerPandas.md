---
title: "팬더스를 포함한 다양한 라이브러리에서 Case-When 다시 살펴보기"
description: ""
coverImage: "/assets/img/2024-06-19-LetsRevisitCase-WheninDifferentLibrariesIncludingtheNewPlayerPandas_0.png"
date: 2024-06-19 23:17
ogImage: 
  url: /assets/img/2024-06-19-LetsRevisitCase-WheninDifferentLibrariesIncludingtheNewPlayerPandas_0.png
tag: Tech
originalTitle: "Let’s Revisit Case-When in Different Libraries Including the New Player: Pandas"
link: "https://medium.com/towards-data-science/lets-revisit-case-when-in-different-libraries-including-the-new-player-pandas-8c4febb979ba"
---



![이미지](/assets/img/2024-06-19-LetsRevisitCase-WheninDifferentLibrariesIncludingtheNewPlayerPandas_0.png)

데이터 분석, 데이터 정리 또는 심지어 피처 엔지니어링을 할 때, 다른 열의 값에 기반한 새로운 열을 만드는 것은 자주 수행되는 작업입니다.

나는 데이터 정리 및 조작에 사용한 모든 도구들이 이 작업을 위한 함수를 가지고 있었다 (예: SQL, R 데이터 테이블, PySpark). 이제 우리에게 새로운 플레이어가 등장했습니다: Pandas.

그런데, Pandas로 조건부 열을 만드는 것은 가능했지만, 전용 case-when 함수는 없었습니다.


<div class="content-ad"></div>

판다 2.2.0에서 case_when 함수가 도입되어 한 개 이상의 조건에 기반한 Series 객체를 생성할 수 있습니다.

이 유용한 작업을 어떻게 수행하는지 다시 살펴봅시다. 이것은 데이터 분석 및 조작 도구로 널리 사용되는 방법입니다.

도구 간 차이를 쉽게 식별하고 일관성 있게 유지하기 위해 작은 데이터셋을 사용하겠습니다.

## SQL

<div class="content-ad"></div>

다음은 'mytable'이라는 작은 SQL 테이블입니다.

```js
|           a |        b |       c |
|-------------|----------|---------|
|           0 |        5 |       1 |
|           1 |       -1 |       0 |
|           5 |       20 |       0 |
|           4 |        8 |       1 |
|           4 |        4 |       1 |
|          10 |        7 |       0 |
|           4 |        2 |       1 |
```

기존 열의 값에 따라 새로운 열을 생성할 것입니다. 다음은 조건입니다:

- a 열이 b 열보다 크면 a 열의 값이 사용됩니다.
- a 열이 b 열보다 작으면 a 열과 c 열의 곱이 사용됩니다.
- 그렇지 않은 경우 (즉, a 열이 b 열과 같은 경우), a 열과 b 열의 합이 사용됩니다.

<div class="content-ad"></div>

필요에 따라 여러 조건을 만들고, 그것들을 훨씬 복잡하게 만들 수 있지만, 이 세 가지 조건은 논리를 배울 때 충분합니다.

새 열을 "d" 라고 부르고, 위 두 조건에 기반한 이 열을 생성하기 위한 SQL 코드는 다음과 같습니다:

```js
select 
  (case 
     when a > b then a
     when a < b then a * c
     else a + b end
  ) as d
from mytable
```

이 SQL 코드는 "mytable"에서 열 d만 생성하고 선택합니다. 열 a, b, c를 함께 반환하도록 필요하다면, select 문에 해당 열을 작성해주세요.

<div class="content-ad"></div>

```R
select 
  a,
  b,
  c,
  (case 
     when a > b then a
     when a < b then a * c
     else a + b end
  ) as d
from mytable
```

## R data table

데이터 테이블 패키지는 R 프로그래밍 언어를 위한 매우 효율적인 데이터 분석 및 조작 도구입니다.

이제 이 패키지를 사용하여 조건부 열 d를 생성하는 방법을 배워보겠습니다. 먼저 SQL 테이블과 동일한 열을 포함하는 데이터 테이블을 만들어봅시다.

<div class="content-ad"></div>

```js
mytable <- data.table(
      a=c(0, 1, 5, 4, 4, 10, 4), 
      b=c(5, -1, 20, 8, 4, 7, 2), 
      c=c(1, 0, 0, 1, 1, 0, 1)
)
```

데이터 테이블에서 조건에 맞는 경우 fcase 함수를 사용하여 구현할 수 있습니다. 조건을 작성하고 해당하는 값들을 쉼표로 구분하여 입력할 수 있습니다.

다음은 주어진 조건에 따라 열 d를 만드는 방법입니다:

```js
mytable[, d := (fcase(a > b, a, a < b, a*c, a==b, a+b))]
```

<div class="content-ad"></div>

fcase 함수 내부의 첫 번째 표현식(a ` b)은 첫 번째 조건이며, 두 번째 표현식(a)은 해당 값을 나타냅니다. 세 번째 표현식(a ` b)은 두 번째 조건이며, 네 번째 표현식(a*c)은 해당 값을 의미합니다. 그리고 이어서 계속됩니다.

이제 데이터 테이블 "mytable"은 다음과 같습니다:

```js
    a  b c  d
1:  0  5 1  0
2:  1 -1 0  1
3:  5 20 0  0
4:  4  8 1  4
5:  4  4 1  8
6: 10  7 0 10
7:  4  2 1  4
```

## PySpark

<div class="content-ad"></div>

파이스파크는 대규모 데이터 처리에 사용되는 분석 엔진인 Spark를 위한 Python API입니다. 수십억 개의 행을 가진 데이터셋 작업에는 보통 Spark가 선호되는 도구입니다.

PySpark API는 매우 직관적이며 이해하기 쉬운 구문을 가지고 있습니다. 먼저 이전과 동일한 열과 값이 포함된 Spark DataFrame을 만들어 봅시다.

```python
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
spark = SparkSession.builder.getOrCreate()

data = [
    {"a": 0, "b": 5, "c": 1},
    {"a": 1, "b": -1, "c": 0},
    {"a": 5, "b": 20, "c": 0},
    {"a": 4, "b": 8, "c": 1},
    {"a": 4, "b": 4, "c": 1},
    {"a": 10, "b": 7, "c": 0},
    {"a": 4, "b": 2, "c": 1}
]

mytable = spark.createDataFrame(data)
```

우리는 먼저 spark 세션을 시작하고 그 후에 DataFrame을 만들었습니다. Databricks와 같은 개발 환경에서 작업하는 경우에는 명시적으로 spark 세션을 생성할 필요가 없다는 점에 유의하세요.

<div class="content-ad"></div>

withColumn 함수를 사용하여 새 열을 생성하고 여러 조건에 따라 값을 결정하기 위해 when 함수를 사용할 수 있습니다.

```js
mytable = (
    mytable
    .withColumn("d",
                F.when(F.col("a") > F.col("b"), F.col("a"))
                 .when(F.col("a") < F.col("b"), F.col("a") * F.col("c"))
                 .otherwise(F.col("a") + F.col("b")))
)

mytable.show()

+---+---+---+---+
|  a|  b|  c|  d|
+---+---+---+---+
|  0|  5|  1|  0|
|  1| -1|  0|  1|
|  5| 20|  0|  0|
|  4|  8|  1|  4|
|  4|  4|  1|  8|
| 10|  7|  0| 10|
|  4|  2|  1|  4|
+---+---+---+---+
```

이전 도구와 마찬가지로 필요한만큼 많은 조건을 결합할 수 있습니다. 각 조건은 자체 when 함수를 가지고 있고 최종 조건의 값 (이전 조건 중 어느 것도 충족되지 않을 경우)은 otherwise 함수를 사용하여 지정됩니다.

## 판다스

<div class="content-ad"></div>

팬더스는 데이터 분석 및 조작 작업 중 가장 자주 사용되는 도구일 수 있습니다. 버전 2.2.0 이전에는 팬더스에 case_when 함수가 없었습니다. 그러나 다른 함수들을 사용하여 작업을 처리할 수 있었습니다. 예를 들어, 팬더스의 where 함수나 NumPy의 where 및 select 함수를 사용할 수 있었습니다. 그러나 지금은 팬더스에 case_when 함수가 있으니 다른 도구들로 작업하던 것을 이 함수를 사용하여 보겠습니다.

먼저 팬더스 데이터프레임을 생성해보겠습니다.

```python
import pandas as pd

mytable = pd.DataFrame(
    {
        "a": [0, 1, 5, 4, 4, 10, 4],
        "b": [5, -1, 20, 8, 4, 7, 2],
        "c": [1, 0, 0, 1, 1, 0, 1]
    }
)
```

case_when 함수는 조건 및 해당 값을 튜플로 포함하는 케이스 리스트를 인수로 사용합니다.

<div class="content-ad"></div>

```js
caselist = [
    (mytable["a"] > mytable["b"], mytable["a"]),
    (mytable["a"] < mytable["b"], mytable["a"] * mytable["c"]),
    (mytable["a"] == mytable["b"], mytable["a"] + mytable["b"])
]

mytable.loc[:, "d"] = mytable["a"].case_when(caselist)

mytable

    a  b  c  d
0   0  5  1  0
1   1 -1  0  1
2   5 20  0  0
3   4  8  1  4
4   4  4  1  8
5  10  7  0 10
6   4  2  1  4
```

caselist의 각 튜플은 조건과 해당하는 값이 포함되어 있어요. DataFrame의 열에 대해 case_when 함수를 적용할 때 중요한 점이에요. 주어진 조건 중 어느 조건도 충족되지 않는 행이 있는 경우, 새 열의 해당 행은 원래 열의 값을 가져와요.

위의 예시에서, 만약 그러한 행이 있다면, 열 d의 해당 값은 열 a에서 가져오게 될 거에요. caselist의 마지막 조건을 제거하여 시도해보겠어요.

```js
caselist = [
    (mytable["a"] > mytable["b"], mytable["a"]),
    (mytable["a"] < mytable["b"], mytable["a"] * mytable["c"])
]

mytable.loc[:, "d"] = mytable["a"].case_when(caselist)

mytable

    a  b  c  d
0   0  5  1  0
1   1 -1  0  1
2   5 20  0  0
3   4  8  1  4
4   4  4  1  4
5  10  7  0 10
6   4  2  1  4
```

<div class="content-ad"></div>

4번 행의 값들을 확인해 보세요. 열 d의 값은 열 a의 값과 같습니다.

## 마지막으로

데이터 정리, 분석 및 조작을 위한 많은 도구와 라이브러리가 있습니다. 대부분의 경우 사용할 도구는 선택의 문제입니다. 이러한 도구들은 일반적인 작업을 효율적으로 수행할 수 있는 능력을 갖추고 있습니다. 그러나 여전히 다양한 도구를 사용하여 특정 작업을 수행하는 방법을 알고 있는 것이 좋습니다.

이 글에서는 SQL, PySpark, R 데이터 테이블 및 Pandas를 사용하여 조건부 열을 생성하는 방법에 대해 배웠습니다.

<div class="content-ad"></div>

읽어 주셔서 감사합니다. 피드백이 있으시면 언제든 알려주세요!