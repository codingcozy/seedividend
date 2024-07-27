---
title: "스파크 최적화 집중 강좌 최고의 성능을 위한 단계별 가이드"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-IntensiveSparkOptimizationCourse_0.png"
date: 2024-07-09 20:14
ogImage:
  url: /assets/img/2024-07-09-IntensiveSparkOptimizationCourse_0.png
tag: Tech
originalTitle: "Intensive Spark Optimization Course"
link: "https://medium.com/@kevinchwong/intensive-spark-optimization-course-082bdd0592bc"
---

![Intensive Spark Optimization Course](/TIL/assets/img/2024-07-09-IntensiveSparkOptimizationCourse_0.png)

# 로컬에서 플레이그라운드 설정하기

- Docker Desktop을 설치합니다.
- `docker run -p 8888:8888 jupyter/pyspark-notebook`을 실행합니다.
- 다음 메시지가 표시되면 브라우저에서 주피터 랩을 열기 위해 URL 중 하나를 붙여넣습니다.

```js
서버에 액세스하려면 브라우저에서 이 파일을 엽니다:
    file:///home/jovyan/.local/share/jupyter/runtime/jpserver-7-open.html
또는 다음 URL 중 하나를 복사하여 붙여넣습니다:
    http://3c331b638888:8888/lab?token=a88888b6aa6620fc976588ba58817f3b14ea0674bdc77f72
    http://127.0.0.1:8888/lab?token=a88888b6aa6620fc976588ba58817f3b14ea0674bdc77f72
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# SparkSession 초기화하기

```js
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("Spark Test").getOrCreate()
```

# 데이터프레임

## 1. 데이터프레임 생성하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 컬럼 사용

```js
from pyspark.sql.types import StructType, IntegerType, StringType

# 데이터를 튜플의 리스트로 정의
data = [("James", 34), ("Anna", 20), ("Lee", 30)]

# 컬럼 사용
columns = ["Name", "Age"]
df = spark.createDataFrame(data, schema=columns)
```

- 스키마 사용

```js
from pyspark.sql.types import StructType, IntegerType, StringType

# 데이터를 튜플의 리스트로 정의
data = [("James", 34), ("Anna", 20), ("Lee", 30)]

# 스키마 사용
schema = StructType([
    StructField("Name", StringType(), True),
    StructField("Age", IntegerType(), True)
])
df = spark.createDataFrame(data, schema=schema)
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- RDD 사용

```js
from pyspark.sql.types import StructType, IntegerType, StringType

# 데이터를 튜플의 리스트로 준비
data = [("James", 34), ("Anna", 20), ("Lee", 30)]

# RDD 사용
rdd = spark.sparkContext.parallelize(data)
schema = StructType([
    StructField("이름", StringType(), True),
    StructField("나이", IntegerType(), True)
])
df = spark.createDataFrame(rdd, schema=schema)
```

```js
df.show()

# 출력
+-----+---+
| 이름|나이|
+-----+---+
|James| 34|
| Anna| 20|
|  Lee| 30|
+-----+---+
```

## 2. 데이터프레임 표시

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
df.printSchema();
print(df.schema);
print(df.columns);
df.describe().show();
```

```js
#결과

## df.printSchema()
root
 |-- Name: string (nullable = true)
 |-- Age: long (nullable = true)

## print(df.schema)
StructType([
  StructField(‘Name’, StringType(), True),
  StructField(‘Age’, LongType(), True)
])

## print(df.columns)
[‘Name’, ‘Age’]

## df.describe().show()
+-------+----+-----------------+
|summary|Name|              Age|
+-------+----+-----------------+
|  count|   3|                3|
|   mean|NULL|             28.0|
| stddev|NULL|7.211102550927978|
|    min|Anna|               20|
|    max| Lee|               34|
+-------+----+-----------------+
```

## 3. 컬럼 선택

```js
df.select(df[0]).show();
df.select(df.Name).show();
df.select(df["Name"]).show();
df.select("Name").show();
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
#Output
+-----+
| Name|
+-----+
|James|
| Anna|
|  Lee|
+-----+
```

## 4. 데이터 필터링

```js
# 데이터 필터링
df.filter(df[1] > 25).show()
df.filter(df.Age > 25).show()
df.filter(df["Age"] > 25).show()
```

```js
#Output
+-----+---+
| Name|Age|
+-----+---+
|James| 34|
|  Lee| 30|
+-----+---+
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 5. 파일에 DataFrame 작성하기

```js
# JSON 파일 작성
df.write.json("test123.json")

# Parquet 파일 작성
df.write.parquet("test123.parquet")
```

## 6. 파일을 DataFrame으로 읽기

```js
# JSON 파일 읽기
df_json = spark.read.json("test123.json")
# Parquet 파일 읽기
df_parquet = spark.read.parquet("test123.parquet")
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 7. 새로운 복합 데이터 유형을 포함한 새로운 열 추가

```js
from pyspark.sql.functions import struct
df2 = df.withColumn("NameAndAge", struct(df.Name, df.Age))
df2.show()
df2.printSchema()
```

```js
# 출력
+-----+---+-----------+
| Name|Age| NameAndAge|
+-----+---+-----------+
|James| 34|{James, 34}|
| Anna| 20| {Anna, 20}|
|  Lee| 30|  {Lee, 30}|
+-----+---+-----------+

# 스키마 출력
root
 |-- Name: string (nullable = true)
 |-- Age: long (nullable = true)
 |-- NameAndAge: struct (nullable = false)
 |    |-- Name: string (nullable = true)
 |    |-- Age: long (nullable = true)
```

# 쿼리: 그룹화 및 집계

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 1. count()

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import count

# 스파크 세션 초기화
spark = SparkSession.builder.appName("그루핑 및 집계").getOrCreate()

# 데이터프레임 생성
data = [("James", "Sales", 3000),
        ("Michael", "Sales", 4600),
        ("Robert", "Sales", 4100),
        ("Maria", "Finance", 3000),
        ("James", "Sales", 3000),
        ("Scott", "Finance", 3300),
        ("Jen", "Finance", 3900),
        ("Jeff", "Marketing", 3000),
        ("Kumar", "Marketing", 2000),
        ("Saif", "Sales", 4100)]
columns = ["employee_name", "department", "salary"]
df = spark.createDataFrame(data, schema=columns)

# 그룹화 및 count 수행
grouped_df = df.groupBy("department").count()
grouped_df.show()
```

```python
# 결과

+----------+-----+
|department|count|
+----------+-----+
|     Sales|    5|
|   Finance|    3|
| Marketing|    2|
+----------+-----+
```

## 2. max(), min(), avg(), sum()

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 그룹별로 그룹화 및 최댓값 찾기
max_df = df.groupBy("department").max("salary").alias("max_salary")
max_df.show()
```

```js
# 결과

+----------+-----------+
|department|max(salary)|
+----------+-----------+
|     Sales|       4600|
|   Finance|       3900|
| Marketing|       3000|
+----------+-----------+
```

## 3. agg() + F.max(), F.count() 등…

```js
from pyspark.sql import functions as F

# 여러 가지 집계 동작 수행
agg_df = df.groupBy("department").agg(
    F.count("salary").alias("count"),
    F.max("salary").alias("max_salary"),
    F.min("salary").alias("min_salary"),
    F.sum("salary").alias("total_salary"),
    F.avg("salary").alias("average_salary")
)
agg_df.show()
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 결과
+----------+-----+----------+----------+------------+--------------+
|department|count|max_salary|min_salary|total_salary|average_salary|
+----------+-----+----------+----------+------------+--------------+
|     Sales|    5|      4600|      3000|       18800|        3760.0|
|   Finance|    3|      3900|      3000|       10200|        3400.0|
| Marketing|    2|      3000|      2000|        5000|        2500.0|
+----------+-----+----------+----------+------------+--------------+
```

## 4. agg() + collect_list() 및 collect_set()

```js
from pyspark.sql.functions import collect_list

# GroupBy 및 리스트 수집 수행
collected_list_df = df.groupBy("department").agg(
  collect_list("salary"),
  collect_set("salary")
)
collected_list_df.show(truncate=False)
```

```js
# 결과
+----------+------------------------------+-------------------+
|department|collect_list(salary)          |collect_set(salary)|
+----------+------------------------------+-------------------+
|Sales     |[3000, 4600, 4100, 3000, 4100]|[4600, 3000, 4100] |
|Finance   |[3000, 3300, 3900]            |[3900, 3000, 3300] |
|Marketing |[3000, 2000]                  |[3000, 2000]       |
+----------+------------------------------+-------------------+
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 5. agg() + 사용자 정의 집계 함수 (UDAF)

- 때로는 내장 함수만으로 복잡한 집계를 수행하기에 충분하지 않을 수 있습니다. Spark를 사용하면 사용자 정의 집계 함수를 만들 수 있습니다.

```js
# 초기 데이터
|부서     |직원 이름        |급여    |
|----------|-------------|------|
|Sales    |James        |3000  |
|Sales    |Michael      |4600  |
|Sales    |Robert       |4100  |
|Finance  |Maria        |3000  |
|Sales    |James        |3000  |
|Finance  |Scott        |3300  |
|Finance  |Jen          |3900  |
|Marketing|Jeff         |3000  |
|Marketing|Kumar        |2000  |
|Sales    |Saif         |4100  |
```

```js
from pyspark.sql.functions import pandas_udf, PandasUDFType
from pandas import DataFrame

@pandas_udf("double")
def mean_salary(s: pd.Series) -> float:
 return s.mean()
udaf_df = df.groupBy("department").agg(
  mean_salary(df["salary"]).alias("average_salary")
)
udaf_df.show()
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 결과
+----------+--------------+
|department|average_salary|
+----------+--------------+
|   Finance|        3400.0|
| Marketing|        2500.0|
|     Sales|        3760.0|
+----------+--------------+

## 6. agg() + 복잡한 조건: when()

- 때로는 조건에 따른 합계나 평균과 같은 복잡한 조건이 집계 중에 필요할 수 있습니다.

# 초기 데이터
+----------+-------------+------+
|department|employee_name|salary|
+----------+-------------+------+
|     Sales|        James|  3000|
|     Sales|      Michael|  4600|
|     Sales|       Robert|  4100|
|   Finance|        Maria|  3000|
|     Sales|        James|  3000|
|   Finance|        Scott|  3300|
|   Finance|          Jen|  3900|
| Marketing|         Jeff|  3000|
| Marketing|        Kumar|  2000|
|     Sales|         Saif|  4100|
+----------+-------------+------+

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

from pyspark.sql.functions import when

# 조건부 집계
conditional_agg_df = df.groupBy("department").agg(
    sum(when(df["salary"] > 3000, df["salary"])).alias("sum_high_salaries")
)
conditional_agg_df.show()

# 결과

+----------+-----------------+
|department|sum_high_salaries|
+----------+-----------------+
|     Sales|            12800|
|   Finance|             7200|
| Marketing|             NULL|
+----------+-----------------+

## 6. agg() 이후 GroupBy에서 RDD Map 함수 사용하기

- 경우에 따라 매핑 함수를 GroupBy와 결합하여 집단화된 데이터에 대한 직접적인 집계가 아닌 작업을 수행할 수 있습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```

# 데이터

| department | employee_name | salary |
| ---------- | ------------- | ------ |
| Sales      | James         | 3000   |
| Sales      | Michael       | 4600   |
| Sales      | Robert        | 4100   |
| Finance    | Maria         | 3000   |
| Sales      | James         | 3000   |
| Finance    | Scott         | 3300   |
| Finance    | Jen           | 3900   |
| Marketing  | Jeff          | 3000   |
| Marketing  | Kumar         | 2000   |
| Sales      | Saif          | 4100   |

# GroupBy 후 map 작업 적용

```python
result_rdd = df.groupBy("department").agg(
  collect_list("salary")
).rdd.map(
  lambda x: (x[0], max(x[1]))
)

result_df = spark.createDataFrame(result_rdd, ["department", "max_salary"])
result_df.show()
```

# 결과

| department | max_salary |
| ---------- | ---------- |
| Sales      | 4600       |
| Finance    | 3900       |
| Marketing  | 3000       |

# 조회: 다른 것

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 1. rollup()과 cube()

- Rollup()은 다차원 집계를 생성하고 Excel의 소계와 유사한 계층적 요약을 제공합니다.

```js
# 초기 데이터
|department|employee_name|salary|
|----------|-------------|------|
| Sales    | James       | 3000 |
| Sales    | Michael     | 4600 |
| Sales    | Robert      | 4100 |
| Finance  | Maria       | 3000 |
| Sales    | James       | 3000 |
| Finance  | Scott       | 3300 |
| Finance  | Jen         | 3900 |
| Marketing| Jeff        | 3000 |
| Marketing| Kumar       | 2000 |
| Sales    | Saif        | 4100 |
```

```js
from pyspark.sql.functions import sum

# Rollup 예제
rollup_df = df.rollup("department", "employee_name").sum("salary")
rollup_df.show()
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 결과
+----------+-------------+-----------+
|department|employee_name|sum(salary)|
+----------+-------------+-----------+
|     Sales|        James|       6000|
|      NULL|         NULL|      34000|
|     Sales|         NULL|      18800|
|     Sales|      Michael|       4600|
|     Sales|       Robert|       4100|
|   Finance|         NULL|      10200|
|   Finance|        Maria|       3000|
|   Finance|        Scott|       3300|
|   Finance|          Jen|       3900|
| Marketing|         NULL|       5000|
| Marketing|         Jeff|       3000|
| Marketing|        Kumar|       2000|
|     Sales|         Saif|       4100|
+----------+-------------+-----------+
```

- Cube(): Cube는 다차원 집계를 생성하고 지정된 그룹화 열의 다중 조합을 통해 통찰을 제공합니다.

```js
# 초기 데이터
+----------+-------------+------+
|department|employee_name|salary|
+----------+-------------+------+
|     Sales|        James|  3000|
|     Sales|      Michael|  4600|
|     Sales|       Robert|  4100|
|   Finance|        Maria|  3000|
|     Sales|        James|  3000|
|   Finance|        Scott|  3300|
|   Finance|          Jen|  3900|
| Marketing|         Jeff|  3000|
| Marketing|        Kumar|  2000|
|     Sales|         Saif|  4100|
+----------+-------------+------+
```

```js
from pyspark.sql.functions import sum

# Cube 예시
cube_df = df.cube("department", "employee_name").sum("salary")
cube_df.show()
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 결과

+----------+-------------+-----------+
|부서      |직원명         |급여합계   |
+----------+-------------+-----------+
|      NULL|        James|       6000|
|     판매 |        James|       6000|
|      NULL|         NULL|      34000|
|     판매 |         NULL|      18800|
|      NULL|      Michael|       4600|
|     판매 |      Michael|       4600|
|     판매 |       Robert|       4100|
|      NULL|       Robert|       4100|
|   재무   |         NULL|      10200|
|   재무   |        Maria|       3000|
|      NULL|        Maria|       3000|
|      NULL|        Scott|       3300|
|   재무   |        Scott|       3300|
|      NULL|          Jen|       3900|
|   재무   |          Jen|       3900|
| 마케팅  |         NULL|       5000|
| 마케팅  |         Jeff|       3000|
|      NULL|         Jeff|       3000|
| 마케팅  |        Kumar|       2000|
|      NULL|        Kumar|       2000|
+----------+-------------+-----------+
상위 20개 행만 표시
```

## 2. groupBy() + pivot()

- Pivoting을 사용하면 행을 열로 변환하여 피벗 테이블과 유사한 방식으로 데이터를 요약할 수 있습니다. 종종 두 열 간의 관계를 이해하는 데 사용됩니다.

```js
# 초기 데이터
+----------+-------------+------+
|부서     |직원명        |급여   |
+----------+-------------+------+
|     판매 |        James|  3000|
|     판매 |      Michael|  4600|
|     판매 |       Robert|  4100|
|   재무  |        Maria|  3000|
|     판매 |        James|  3000|
|   재무  |        Scott|  3300|
|   재무  |          Jen|  3900|
| 마케팅  |         Jeff|  3000|
| 마케팅  |        Kumar|  2000|
|     판매 |         Saif|  4100|
+----------+-------------+------+
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# Pivot 예시
pivot_df = df.groupBy("department").pivot("employee_name").sum("salary")
pivot_df.show()
```

```js
# 결과
+----------+-----+----+----+-----+-----+-------+------+----+-----+
|department|James|Jeff| Jen|Kumar|Maria|Michael|Robert|Saif|Scott|
+----------+-----+----+----+-----+-----+-------+------+----+-----+
|     Sales| 6000|NULL|NULL| NULL| NULL|   4600|  4100|4100| NULL|
|   Finance| NULL|NULL|3900| NULL| 3000|   NULL|  NULL|NULL| 3300|
| Marketing| NULL|3000|NULL| 2000| NULL|   NULL|  NULL|NULL| NULL|
+----------+-----+----+----+-----+-----+-------+------+----+-----+
```

## 3. 윈도우 함수: partitionBy() + row_number()/rank().over(w)

- 윈도우 함수는 현재 행과 관련된 "윈도우"에 대해 계산을 수행할 수 있어 전통적인 group-by 작업보다 더 유연성을 제공합니다. 이는 러닝 토탈, 이동 평균 또는 이전 및 다음 행에 액세스하는 데 특히 유용합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 초기 데이터
| 부서      | 직원 이름       | 급여  |
|----------|---------------|------|
| Sales    | James         | 3000 |
| Sales    | Michael       | 4600 |
| Sales    | Robert        | 4100 |
| Finance  | Maria         | 3000 |
| Sales    | James         | 3000 |
| Finance  | Scott         | 3300 |
| Finance  | Jen           | 3900 |
| Marketing| Jeff          | 3000 |
| Marketing| Kumar         | 2000 |
| Sales    | Saif          | 4100 |

```

```js
from pyspark.sql.window import Window
from pyspark.sql.functions import col, row_number

windowSpec = Window.partitionBy("department").orderBy(col("salary").asc())
df_with_row_number = df.withColumn("row_number", row_number().over(windowSpec))
df_with_row_number.show()
```

```js
# 결과
| 직원 이름      | 부서        | 급여  | row_number |
|---------------|------------|------|------------|
| Maria         | Finance    | 3000 |      1     |
| Scott         | Finance    | 3300 |      2     |
| Jen           | Finance    | 3900 |      3     |
| Kumar         | Marketing  | 2000 |      1     |
| Jeff          | Marketing  | 3000 |      2     |
| James         | Sales      | 3000 |      1     |
| James         | Sales      | 3000 |      2     |
| Robert        | Sales      | 4100 |      3     |
| Saif          | Sales      | 4100 |      4     |
| Michael       | Sales      | 4600 |      5     |

```

- Rank() 함수를 위해

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
from pyspark.sql.window import Window
from pyspark.sql.functions import rank, col

windowSpec = Window.partitionBy("department").orderBy(col("salary").desc())
df_with_rank = df.withColumn("rank", rank().over(windowSpec))
df_with_rank.show()
```

```js
# 출력
+-------------+----------+------+----------+
|employee_name|department|salary|      rank|
+-------------+----------+------+----------+
|          Jen|   Finance|  3900|         1|
|        Scott|   Finance|  3300|         2|
|        Maria|   Finance|  3000|         3|
|         Jeff| Marketing|  3000|         1|
|        Kumar| Marketing|  2000|         2|
|      Michael|     Sales|  4600|         1|
|       Robert|     Sales|  4100|         2|
|         Saif|     Sales|  4100|         2|
|        James|     Sales|  3000|         3|
|        James|     Sales|  3000|         3|
+-------------+----------+------+----------+
```

# 최적화 I: 무게 감소

## 0. 불필요한 원시 데이터 제거

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 1. DataFrame이 여러 번 액세스 될 때 캐시합니다.

```js
df.cache();
df.count();
```

```js
#출력
3
```

## 2. 적절한 파일 형식 사용하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 압축 파일은 파일의 입출력 및 메모리를 절약할 수 있어요.
- 압축 해제된 파일은 CPU를 절약할 수 있어요.

```js
df.write.parquet("output.parquet");
```

## 3. 스키마 수동 지정하기

```js
from pyspark.sql.types import StructType, StructField, IntegerType, StringType
schema = StructType([
    StructField("id", IntegerType(), True),
    StructField("name", StringType(), True),
    StructField("age", IntegerType(), True)
])
df = spark.read.schema(schema).csv("path/to/file.csv")
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 4. 조기에 필요한 열 선택하기

데이터 처리 파이프라인에서 메모리 사용량을 줄이기 위해 필요한 열만 미리 선택하세요.

```js
df.select("dept_name", "name").filter("dept_id >= 102").show();
df.select("dept_name", "name")
  .filter(df.dept_id >= 102)
  .show();
```

```js
#출력
+---------+----+
|dept_name|name|
+---------+----+
|Marketing|Jane|
|  Finance| Joe|
+---------+----+
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 5. 필터를 조인이나 집계 전에 빠르게 적용하세요.

```js
df.filter("age > 25").join(df_other, "id").show();
```

## 6. 큰 데이터셋 수집 방지를 위해 limit() 사용하기

- 큰 데이터셋에 collect()를 사용하지 않도록 주의하여 메모리 부족 오류를 방지하세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
df.filter("age > 30").limit(100).collect();
```

## 7. Using spark.sql(): Catalyst optimizer for Complex Queries

- Leverage Spark SQL for complex queries, which might be more readable and can benefit from the Catalyst optimizer.

```js
df.createOrReplaceTempView("table");
spark.sql("SELECT id, sum(value) FROM table GROUP BY id").show();
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 8. RDD 사용: reduceByKey를 사용한 집계

- 집계 작업을 수행할 때 reduceByKey를 사용하는 것이 groupBy보다 더 효율적일 수 있습니다.

```python
rdd = df.rdd.map(lambda x: (x[0], x[1]))
reduced = rdd.reduceByKey(lambda a, b: a + b)
reduced.toDF(["key", "value"]).show()
```

# 최적화 II: 파티션 없이 병렬화 없음

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 1. 테이블 분할: partitionBy()

- 데이터프레임을 디스크에 저장할 때 빠른 후속 읽기를 위해 분할을 사용하세요.

```js
df.write.partitionBy("year", "month").parquet("path/to/output");
```

## 2. 스튜 관리를 위한 Salting 키

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 조인 연산 중 데이터 스큐가 발생하는 경우, 하나 이상의 키 값이 다른 것들보다 훨씬 더 많은 데이터를 가지고 있을 때 발생합니다.
- 예를 들어 "customer_id"를 기준으로 조인을 수행하고, 대부분의 거래가 소수의 고객에 속해 있다면 이러한 소수의 키는 다른 키들에 비해 훨씬 많은 양의 데이터를 가지고 있을 것입니다. 이로 인해 일부 작업(큰 키를 처리하는 작업)이 훨씬 더 오랜 시간이 걸리고 병목 현상이 발생할 수 있습니다.
- 이 문제를 해결하는 방법은 skewed 데이터를 관리하기 위해 키에 임의의 접두사를 추가하는 것입니다.

```js
from pyspark.sql.functions import monotonically_increasing_id, expr
df.withColumn("salted_key",
    expr("concat(name, '_', (monotonically_increasing_id() % 10))")
).groupBy("salted_key").count().select(sum("count")).show()
```

```js
# 결과
+----------+
|sum(count)|
+----------+
|         3|
+----------+
```

- 데이터 로딩의 균형을 어떻게 맞출까요?

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
from pyspark.sql.functions import monotonically_increasing_id, expr
df.withColumn("salted_key",
    expr("concat(name, '_', (monotonically_increasing_id() % 10))")
).groupBy("salted_key").count().show()
```

```js
# 결과
+----------+-----+
|salted_key|count|
+----------+-----+
|   James_6|    1|
|   James_4|    1|
|   James_0|    1|
+----------+-----+
```

# 최적화 III: Shuffling을 최소화하는 전략

```js
### Shuffling 최소화 전략
- **Broadcast 변수 사용**
  - 데이터셋이 작은 경우 Shuffling을 피하기 위해 모든 노드에 브로드캐스트합니다.
- **파티션 튜닝**
  - 작업 및 데이터 규모에 맞게 파티션 수를 조정합니다.
- **변환 최적화**
  - Shuffling을 필요로 하는 넓은 변환을 최소화하기 위해 작업을 계획합니다.
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 섞기

- 섞기는 데이터가 서로 다른 파티션에 재분배되는 과정입니다.
- 이는 데이터를 실행자 간이나 심지어 기계 간에 이동하는 것을 포함합니다.
- 네트워크 및 디스크 I/O 측면에서 가장 비용이 많이 드는 작업 중 하나입니다.

## 섞기의 목적

- 데이터 재분배: 조인, 그룹화, 집계 및 재분할과 같은 넓은 변환을 용이하게 합니다.
- 부하 분산: 클러스터 전체에 데이터와 작업 부담을 균등하게 분배합니다.
- 동시성: 병렬 처리를 강화하고 리소스 활용을 최적화합니다.
- 데이터 지역성 최적화: 데이터가 처리될 위치에 가까이 이동하도록 합니다. 네트워크 트래픽을 줄입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 셔플링의 고민거리

- 자원 소모가 많음: 상당한 네트워크 대역폭과 디스크 I/O를 사용합니다.
- 지연 시간 증가: 특히 대량의 데이터셋인 경우 처리 시간이 상당히 증가합니다.
- 병목 현상 발생 가능성: 적절히 관리되지 않으면 전체 시스템 성능을 느리게 만들 수 있습니다.

## 1. 작은 DataFrame과 큰 DataFrame을 조인할 때 데이터 셔플링을 최소화하기 위해 브로드캐스트 조인을 사용합니다.

```js
from pyspark.sql import SparkSession
from pyspark.sql.functions import broadcast

# 스파크 세션 초기화
spark = SparkSession.builder.appName("브로드캐스트 조인 예제").getOrCreate()
# 직원용 큰 DataFrame 생성
data_employees = [(1, "John", 101),
                  (2, "Jane", 102),
                  (3, "Joe", 103),
                  (4, "Jill", 101),
                  # 더 많은 레코드가 있다고 가정
                  ]
columns_employees = ["emp_id", "name", "dept_id"]
df_employees = spark.createDataFrame(data_employees, columns_employees)
# 부서용 작은 DataFrame 생성
data_departments = [(101, "인사"),
                    (102, "마케팅"),
                    (103, "금융"),
                    (104, "IT"),
                    (105, "지원")
                    ]
columns_departments = ["dept_id", "dept_name"]
df_departments = spark.createDataFrame(data_departments, columns_departments)
# 브로드캐스트 조인 수행
df_joined = df_employees.join(broadcast(df_departments), "dept_id")
df_joined.show()
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
#출력
+-------+------+----+---------+
|dept_id|emp_id|  이름|dept_name|
+-------+------+-----+--------+
|    101|     1| 존|       인사|
|    102|     2| 제인|     마케팅|
|    103|     3| 조|     금융|
|    101|     4| 질|       인사|
+-------+------+-----+--------+
```

- 직원 — 직원 세부 정보를 담은 작은 데이터셋입니다.
- 부서 — 부서 세부 정보를 담은 큰 데이터셋입니다.

두 데이터셋을 부서 ID를 기준으로 조인하되, 부서 데이터셋을 크게 섞지 않도록 하는 것이 목표입니다.

## 2. 파티션 조정: 병렬성 증가를 위한 다시 분할

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 데이터 프레임의 파티션을 재분할하여 병렬성을 높이거나 셔플 비용을 줄일 수 있습니다.
- 그러나 여전히 전체 셔플을 유발할 수 있습니다.

```js
# 병렬성을 높이기 위한 재분할 예제
df = spark.createDataFrame([
  (1, 'foo'), (2, 'bar'), (3, 'baz'), (4, 'qux')
], ["id", "value"])
df_repartitioned = df.repartition(10)  # 파티션 수 증가
```

## 3. 파티션 튜닝: 파티션 감소를 위한 Coalesce

- 전체 셔플 피하기: coalesce는 대규모 데이터 세트를 필터링한 후 파티션 수를 줄이고 싶을 때 셔플 비용을 피해야 할 때 최적입니다.
- 전형적인 사용 사례: 많은 파티션이 부분적으로 채워지거나 비어있는 상태로 남을 수 있는 대규모 DataFrame을 필터링한 후 사용됩니다. coalesce는 네트워크 오버헤드를 줄이고 비용 효율적으로 리소스를 관리하는 데 도움이 됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 대규모 셔플링 없이 파티션 수를 줄이기 위한 코어스 예시
df_filtered = df.filter("id > 1")
df_coalesced = df_filtered.coalesce(2)  # 파티션 수 줄이기

```

## 4. 변환 최적화를 통해 데이터 셔플링 최소화하기

- 최적화된 변환을 통해 Apache Spark에서 셔플링을 최소화하는 것은 Spark 애플리케이션의 성능을 향상시키는 중요한 측면입니다.
- 변환 최적화는 데이터 처리 작업을 구조화하여 클러스터 전체에서 불필요한 데이터 이동을 줄이는 것을 포함하며, 이는 리소스를 많이 사용하고 실행 속도를 늦출 수 있습니다.
- 이를 달성하는 방법을 보여주는 몇 가지 전략과 코드 예제는 다음과 같습니다:

## 4–1. 일찍 필터링하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 데이터 처리 파이프라인에서 조인 또는 집계와 같은 후속 작업에서 나중에 섞어야 하는 데이터 양을 줄이기 위해 필터를 가능한 한 빨리 적용하세요.

```python
from pyspark.sql import SparkSession

# 스파크 세션 초기화
spark = SparkSession.builder.appName("Shuffling 최소화").getOrCreate()

# DataFrame 생성
data = [("John", "금융", 3000), ("Jane", "마케팅", 4000), ("Joe", "마케팅", 2800), ("Jill", "금융", 3900)]
columns = ["이름", "부서", "연봉"]
df = spark.createDataFrame(data, schema=columns)

# 넓은 변환 전에 미리 필터링
filtered_df = df.filter(df["연봉"] > 3000)

# 이제 집계 수행
aggregated_df = filtered_df.groupBy("부서").avg("연봉")
aggregated_df.show()
```

```python
# 출력
+----------+-----------+
|부서      |avg(연봉)  |
+----------+-----------+
| 마케팅  |     4000.0|
| 금융    |     3900.0|
+----------+-----------+
```

## 4-2. 가능한 경우 RDD/넓은 변환 사용하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 좁은 변환, 예를 들어 `map` 및 `filter`와 같은 작업은 개별 파티션에서 작동하며 데이터 셔플을 필요로하지 않습니다. 가능한 경우 이러한 작업을 넓은 변환 대신 사용하십시오.

```js
# 셔플을 발생시키지 않고 새로운 열을 만들기 위해 map을 사용합니다
rdd = df.rdd.map(lambda x: (x.Name, x.Salary * 1.1))
updated_salaries_df = spark.createDataFrame(
  rdd, schema=["Name", "UpdatedSalary"]
)
updated_salaries_df.show()
```

```js
# 결과
+----+------------------+
|Name|     UpdatedSalary|
+----+------------------+
|John|3300.0000000000005|
|Jane|            4400.0|
| Joe|3080.0000000000005|
|Jill|            4290.0|
+----+------------------+
```

## 4-3. Boardcasting join으로 불필요한 셔플을 피하세요

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 조인 작업시, 한 데이터셋이 다른 데이터셋보다 현저히 작을 때 브로드캐스트 조인을 사용하여 큰 데이터셋을 셔플링하지 않도록 합니다.

```js
from pyspark.sql.functions import broadcast
# df_small이 df_large보다 훨씬 작다고 가정합니다
df_small = spark.createDataFrame(
  [(1, "HR"), (2, "마케팅")], ["id", "부서"]
)
df_large = spark.createDataFrame(
  [(1, "존"), (2, "제인"), (1, "조"), (2, "질")],
  ["부서ID", "이름"]
)
# 조인 최적화를 위해 작은 DataFrame을 브로드캐스트합니다
optimized_join_df = df_large.join(broadcast(df_small), df_large.부서ID == df_small.id)
optimized_join_df.show()
```

```js
# 결과

+------+----+---+------+
|부서ID|이름| id|  부서|
+------+----+---+------+
|     1| 존|  1|   HR|
|     2|제인|  2|마케팅|
|     1| 조|  1|   HR|
|     2| 질|  2|마케팅|
+------+----+---+------+
```

## 4-4. 전략적으로 파티션 나누기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 만약 넓은 변환을 사용해야 한다면, 나중에 조인 또는 집계할 키를 기반으로 데이터를 파티션으로 나누세요. 이 전략을 사용하면 동일한 키를 가진 행을 동일한 파티션에 함께 두어 셔플링을 줄일 수 있습니다.

```js
# 셔플링 최소화를 위해 집계 전에 파티션 재분배
repartitioned_df = df.repartition("Department")
aggregated_df = repartitioned_df.groupBy("Department").avg("Salary")
aggregated_df.show()
```

```js
# 결과
+----------+-----------+
|Department|avg(Salary)|
+----------+-----------+
|   Finance|     3450.0|
| Marketing|     3400.0|
+----------+-----------+
```

# 성능 모니터링 및 세부 조정

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 1. 메모리 관리

```js
spark.conf.set(“spark.executor.memory”, “4g”)
spark.conf.set(“spark.driver.memory”, “2g”)
```

## 2. 작업 및 스테이지 모니터링

- Spark UI를 사용하여 응용 프로그램 내의 작업 및 스테이지의 성능을 모니터링합니다.
- Spark UI에 액세스하려면 다음으로 이동하십시오: http://[your-spark-driver-host]:4040
- Executor 메트릭 분석: 각 executor의 메트릭을 모니터링하여 메모리 사용, 디스크 스피릴 및 가비지 수집에 대한 통찰을 얻을 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 자세한 실행자 지표를 수집하도록 Spark를 구성합니다
spark.conf.set("spark.executor.metrics.pollingInterval", "5000")
```

## 3. SQL 성능 튜닝

- SQL 실행 계획을 이해하고 최적화하기 위해 `EXPLAIN` 계획을 활용하세요.

```js
df.explain(“formatted”)
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
== 물리적인 계획 ==
* 기존 RDD 스캔 (1)


(1) 기존 RDD 스캔 [코드 생성 ID : 1]
출력 [3]: [이름 #4628, 부서 #4629, 급여 #4630L]
인수: [이름 #4628, 부서 #4629, 급여 #4630L],
 applySchemaToPythonRDD에 있는 MapPartitionsRDD[693]에서
                       at <알 수 없음>:0, ExistingRDD, UnknownPartitioning(0)
```

## 4. 동적 할당

- 워크로드에 따라 스파크가 실행자 수를 동적으로 조정할 수 있도록 동적 할당을 활성화합니다.

```js
spark.conf.set("spark.dynamicAllocation.enabled", "true");
spark.conf.set("spark.dynamicAllocation.minExecutors", "1");
spark.conf.set("spark.dynamicAllocation.maxExecutors", "20");
spark.conf.set("spark.dynamicAllocation.executorIdleTimeout", "60s");
spark.conf.set("spark.shuffle.service.enabled", "true");
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 5. 데이터 지역성

- 저장 및 처리 장치 간에 데이터가 이동해야 하는 거리를 최소화하여 데이터 지역성을 최적화합니다.

```js
spark.conf.set("spark.locality.wait", "300ms");
```

## 6. Garbage Collection Tuning

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
- 가비지 컬렉터 설정을 조정하여 메모리 관리를 최적화하고 일시 중지 시간을 줄일 수 있습니다.

# 더 나은 지연 시간을 위해 G1GC 사용
spark.conf.set("spark.executor.extraJavaOptions", "-XX:+UseG1GC")
# 짧은 일시 중지를 위해 명시적인 GC 설정 구성
spark.conf.set("spark.executor.extraJavaOptions", "-XX:MaxGCPauseMillis=100")

## 7. 데이터 직렬화 세부 조정

- 데이터 직렬화는 분산 애플리케이션의 성능에 중요한 역할을 합니다. Spark는 두 가지 직렬화 도구를 지원합니다:
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 더 나은 성능과 효율성을 위해 Kryo 직렬화 프로그램 사용
spark.conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
spark.conf.set("spark.kryo.registrationRequired", "true")

# Kryo와 사용자 정의 클래스 등록
class MyClass:
    def __init__(self, name, id):
        self.name = name
        self.id = id
spark.sparkContext.getConf().registerKryoClasses([MyClass])
```

## 8. 네트워크 구성 최적화

- 네트워크 설정은 특히 대규모 배포에서 성능에 중대한 영향을 미칠 수 있습니다:

```js
# 네트워크 타임아웃 설정을 조정하여 대규모 클러스터에서 불필요한 작업 실패를 피하십시오
spark.conf.set("spark.network.timeout", "800s")
spark.conf.set("spark.core.connection.ack.wait.timeout", "600s")
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 9. 고급 Spark SQL 튜닝

- Catalyst 옵티마이저 및 Tungsten 실행 엔진을 활용하면 Spark SQL의 성능을 향상시킬 수 있습니다:

```js
# 직렬 처리를 위한 전체 단계 코드 생성 활성화
spark.conf.set("spark.sql.codegen.wholeStage", "true")

# 조인 최적화에 유용한 테이블 브로드캐스트를 위한 최대 바이트 수 증가
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "10485760")  # 10 MB
```

## 10. 데이터 파티셔닝 최적화

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

데이터 분배를 세밀하게 조정하여 쿼리 성능을 향상시키고 셔플 오버헤드를 줄일 수 있어요:

```js
# 데이터 크기 및 작업을 기준으로 수동으로 셔플 파티션 수 설정

spark.conf.set("spark.sql.shuffle.partitions", "200")
# 클러스터 크기 및 데이터에 맞게 조정하세요
```

## 11. 적응형 쿼리 실행 활성화

- 적응형 쿼리 실행 (AQE)는 실행 중에 쿼리 계획을 조정함으로써 Spark SQL 쿼리를 더 빠르고 데이터 스쿠 및 기타 이슈에 더 강건하게 만드는 기능이에요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 쿼리 실행을 적응적으로 조정하는 AQE를 활성화합니다. 이는 구성을 간소화하고 성능을 향상시킬 수 있습니다.
spark.conf.set("spark.sql.adaptive.enabled", "true")
```

- AQE는 실제 데이터에 적응해 셔플 파티셔닝을 조정하고, 불균형 조인을 처리하며, 정렬을 최적화할 수 있습니다.

## 12. 메모리 관리 지정

- 적절한 메모리 관리는 메모리 집약적인 작업에서 특히 효과적인 성능 개선을 위해 스파이지를 방지할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# RDD 저장소에 예약된 메모리 분수를 구성합니다.

spark.conf.set(“spark.memory.fraction”, “0.6”)
spark.conf.set(“spark.memory.storageFraction”, “0.5”)

이러한 설정은 실행 메모리와 저장소 메모리 사이의 균형을 맞추어 셔플 및 캐싱 중 디스크 스파일을 줄이는 데 도움이 됩니다.

# 읽어 주셔서 감사합니다

이 글이 마음에 드시면:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 👏 여러 번 박수로 지지를 보여주세요!
- 이 안내서를 친구들과 공유해도 좋아요.
- 여러분의 피드백은 소중합니다. 앞으로의 글에 영감을 주고 안내해 줍니다.
- 또는 메시지를 남겨주세요: https://www.linkedin.com/in/kevinchwong
