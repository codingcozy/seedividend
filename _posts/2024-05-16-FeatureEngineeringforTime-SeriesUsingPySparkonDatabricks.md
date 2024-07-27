---
title: "타임 시리즈에 대해 PySpark와 Databricks를 사용한 피처 엔지니어링"
description: ""
coverImage: "/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_0.png"
date: 2024-05-16 03:43
ogImage: 
  url: /assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_0.png
tag: Tech
originalTitle: "Feature Engineering for Time-Series Using PySpark on Databricks"
link: "https://medium.com/towards-data-science/feature-engineering-for-time-series-using-pyspark-on-databricks-02b97d62a287"
---


대규모 데이터 세트에서 고속 쿼리 및 분석에 대한 수요가 증가함에 따라 Apache Spark는 최근 몇 년간 가장 인기 있는 분석 엔진 중 하나로 돌아서고 있습니다. 그것은 분산 데이터 처리에서 강력한데, 마스터-워커 아키텍처 때문에 그렇습니다. 이에는 클러스터 매니저(마스터)와 협력하고 작은 작업을 워커 노드로 분배하는 실행을 제어하는 드라이버 프로그램이 포함되어 있습니다. 게다가, 내부 메모리 데이터 처리 엔진으로 설계된 Spark는 데이터를 저장하고 조작할 때 주로 RAM을 사용하여 디스크 저장소에 의존하는 것 대신 데이터를 더 빨리 처리할 수 있게 도와줍니다.

![이미지](/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_0.png)

## Apache Spark: 낮은 수준에서 높은 수준까지

낮은 수준에서는 그 아키텍처가 두 가지 주요 추상화를 기반으로 설계되어 있습니다.



- Resilient Distributed Dataset (RDD) - 각 데이터 세트를 논리적 부분으로 분할하고 클러스터 작업자 노드에서 실행하여 병렬 프로그래밍을 지원하는 저수준 데이터 추상화입니다.
- Directed Acyclic Graph (DAG) - 작업의 종속성과 순서를 최적화하고 예약하는 표현을 의미합니다.

더 높은 수준에서는 Scala, Python 또는 R과 같은 언어를 사용하여 다양한 고수준 도구를 활용할 수 있습니다. 도구 예시로는 SQL 및 데이터프레임 용 Spark SQL, Pandas 작업을 위한 Spark Pandas API, 스트림 처리를 위한 구조적 스트리밍 등이 있습니다.

하지만 이러한 기능을 즐기기 전에는 인프라 설정 및 다양한 복잡한 도구들을 통해 Spark 클러스터를 자체 관리해야 할 수 있으며, 이는 머리를 아프게 만들 수 있습니다.

## Databricks에서 PySpark



이러한 도전에 대응하기 위해 Databricks에서 PySpark를 최근 산업의 고수준 솔루션 중 하나로 소개하고 있습니다. PySpark는 Spark용 Python API이며, Databricks는 Spark를 기반으로 한 완전한 소프트웨어 플랫폼입니다. 노트북, 인프라 오케스트레이션(자동 프로비저닝 및 스케일링), 프로세스 오케스트레이션(작업 제출 및 예약), 관리 클러스터 및 소스 제어까지 모두 포함하고 있습니다.

Databricks에서 PySpark API를 사용하여 시계열 데이터에 대한 특성 엔지니어링 프로젝트를 시연하고 수행할 것입니다. 이 실습 여정에서는 Pandas 라이브러리가 일반적으로 데이터 처리에 사용되는 방식을 시뮬레이션하되, 확장성과 병렬성의 추가 혜택을 누릴 수 있습니다.

아래와 같은 시나리오를 고려해 보세요. 2006년 12월부터 2010년 11월까지 1분 간격으로 샘플링된 가정용 전기 사용 데이터가 있습니다. 저희의 목표는 데이터를 수집하고 조작하며 특성을 추출하고 시각화를 생성하는 것입니다.

![Link text](/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_1.png)



데이터셋 [라이센스: 데이터베이스 오픈 데이터베이스, 콘텐츠: 데이터베이스 콘텐츠]은 Kaggle에서 얻은 것으로서 날짜, 시간, 글로벌 전력 (유효 및 무효), 전압, 글로벌 강도 및 서브미터링 (1, 2 및 3)과 같은 다양한 필드가 포함되어 있습니다. 이제 분석을 시작할 수 있습니다.

## 초기 설정

시작하려면 Databricks Community Edition을 위한 사용자 계정을 만들어야 합니다. 이것은 우리의 개념 증명을 위한 적합한 Databricks 환경을 제공합니다. 그 다음으로 입력 데이터 파일을 FileStore로 업로드해야 합니다. FileStore는 Databricks 전용 경로입니다. "노트북에 테이블 생성"을 클릭하면 데이터 수집을 시작하는 코드 템플릿이 제공됩니다.

![이미지](/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_2.png)




![이미지](/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_3.png)

## 피처 엔지니어링 프로젝트 생성

### 1. 데이터 가져오기

- 정적 데이터




우리는 데이터 소스를 읽고 DataFrame, 즉 관계형 테이블을 반환하는 spark.read() 메서드를 사용합니다. CSV, JSON, Parquet 등 다양한 데이터 소스를 지원합니다. 이 경우에는 첫 번째 행이 헤더 역할을 하고 ";"를 구분자로 사용하는 정의된 스키마로 CSV 형식의 전력 소비 데이터를 읽습니다.

```js
# 파일 위치 및 유형
file_location = "/FileStore/tables/household_power_consumption.csv"
file_type = "csv"

# CSV 옵션
schema = "Date STRING, Time STRING, Global_active_power DOUBLE, Global_reactive_power DOUBLE, Voltage DOUBLE, Global_intensity DOUBLE, Sub_metering_1 DOUBLE, Sub_metering_2 DOUBLE, Sub_metering_3 DOUBLE"
first_row_as_header = "true"
delimiter = ";"

# CSV 파일 읽기
org_df = spark.read.format(file_type) \
.schema(schema) \
.option("header", first_row_as_header) \
.option("delimiter", delimiter) \
.load(file_location)

display(org_df)
```

DataFrame의 몇 가지 첫 행 출력:

<img src="/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_4.png" />



- 데이터 스트리밍

데이터가 지속적으로 생성되는 시나리오에서는 스트림 처리 기술을 사용하여 데이터를 점진적으로 읽습니다. Spark의 동작을 보여주기 위해 원본 데이터 세트를 10개의 하위 집합으로 분할하고 미리 "/FileStore/tables/stream/" 경로에 저장했습니다. 그리고 나서 다른 메서드인 spark.readStream()을 사용하여 데이터를 스트리밍합니다.

```js
sourceStream=spark.readStream.format("csv") \
.option("header",True) \
.schema(schema) \
.option("mode","dropMalformed") \
.option("maxFilesPerTrigger",1) \
.option("ignoreLeadingWhiteSpace",True) \
.load("dbfs:/FileStore/tables/stream") \
```

"dropMalformed"로 설정된 모드 설정은 손상된 레코드를 방지하기 때문에 구조적 불일치로 인한 손상이든 다른 사용할 수 없는 요소로 인한 손상이든 상관없이 해당 레코드를 폐기합니다. 또한 트리거 이벤트 당 하나의 파일만 처리하도록 선택했습니다.



데이터를 수신하고 10초마다 레코드 수를 확인하여 스트리밍 데이터가 계속 도착하는 것을 관찰할 수 있습니다.

```js
import time

# DataFrame 내용을 스트리밍
query = sourceStream.writeStream \
.queryName("count") \
.format("memory") \
.outputMode("append") \
.start()

# 행 수를 표시
for _ in range(10):
  spark.sql("SELECT COUNT(*) AS no_of_rows FROM count").show()
  time.sleep(10)
```

#2 데이터 조작 및 탐색

- 데이터 변환



결측값이 포함된 행의 수가 상대적으로 미비하기 때문에 해당 행을 삭제하는 것으로 결정했습니다. 게다가 시간 관련 특성을 추출하여 나중에 더 높은 차원에서 패턴을 관찰할 수 있을 것으로 기대됩니다.

```python
from pyspark.sql.functions import col, concat_ws, to_date

# 결측값이 포함된 행 삭제
df = org_df.na.drop()

# "Date"와 "Time" 열을 새로운 "DateTime" 열로 변환
df = df.withColumn("Date", to_date(col("Date"),"d/M/y"))
df = df.withColumn("Date", df["Date"].cast("date"))
df = df.select(concat_ws(" ", to_date(col("Date"),"d/M/y"), col("Time")).alias("DateTime"), "*")
df = df.withColumn("DateTime", df["DateTime"].cast("timestamp"))

# 시간 관련 특성 추가
df = df.withColumn("year", year("DateTime"))
df = df.withColumn("month", month("DateTime"))
df = df.withColumn("week_num", weekofyear("DateTime"))
df = df.withColumn("hour", hour("DateTime"))
```

- 데이터 탐색

다양한 PySpark 기본 메서드로 데이터를 탐색할 수 있습니다.



(1) 선택하기

"select" 메소드를 사용하면 데이터 프레임에서 열 단위로 하위 집합을 만들 수 있습니다. 이 예시에서는 글로벌 액티브 전력의 내림차순으로 열을 선택합니다.

```js
df.select("DateTime", "Global_active_power", "Global_intensity").sort("Global_active_power", ascending=False).show(5)
```

<img src="/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_5.png" />



(2) 필터

이 필터는 열 값에 따라 데이터 포인트를 필터링합니다. 이 예에서는 "year"와 "Global_intensity" 열 두 개에 대해 필터링합니다.

```js
df.filter(
    (col("year") == 2009) &
    (col("Global_intensity") > 40)
).count()

# 출력: 10
```

(3) 그룹화



우리는 집계 작업도 수행할 수 있어요. 데이터셋에서 다양한 월에 대한 전역 활성 전력 및 서브 미터링의 평균을 계산해 봅시다.

```js
df.groupby("month").agg(
     round(mean("Global_active_power"), 2).alias("평균_전역_활성_전력"),
     round(mean("Sub_metering_1"), 2).alias("평균_서브_미터링_1"),
     round(mean("Sub_metering_2"), 2).alias("평균_서브_미터링_2"),
     round(mean("Sub_metering_3"), 2).alias("평균_서브_미터링_3"),
).sort(["month"]).show(5)
```

![그림](/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_6.png)

#3 창 함수를 사용하여 특성 추출



위의 기본 PySpark 메소드와 함수에 추가로 Window 함수를 활용하여 시고열 데이터에서 시간적 종속성과 관계를 캡처할 추가적인 피처를 생성할 수 있습니다. 하루 단위로 집계된 전체 글로벌 활성 전력이 변환된 데이터 세트("df2")를 가정해 봅시다. 이러한 피처들을 어떻게 얻을 수 있는지 알아보겠습니다.

(1) Lag features

이는 이전 날짜의 지표 값들을 나타내며, 모델이 과거 데이터로부터 학습하고 추세를 식별하는 데 도움이 됩니다.

```python
from pyspark.sql.window import Window
from pyspark.sql.functions import lag, round

# 'Date' 열을 기반으로 Window 명세 생성
windowSpec = Window.orderBy("Date")

# 'Total_global_active_power'의 이전 값 계산
df2 = df2.withColumn("power_lag1", round(lag(col("Total_global_active_power"), 1).over(windowSpec), 2))

display(df2)
```



<img src="/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_7.png" />

(2) Delta features

이는 원 데이터 필드와 랙 데이터 간의 차이를 계산하여 짧은 기간 내의 변화나 변동을 캡처하기 위한 차후 단계를 거치는 것입니다.

```js
# 열 간의 차이를 계산합니다
df2 = df2.withColumn("power_lag1_delta", round(col("power_lag1") - col("Total_global_active_power"), 2))

display(df2)
```



<img src="/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_8.png" />

(3) 창 평균 피처

이러한 기능은 슬라이딩 윈도우 내에서 대상 데이터 필드의 평균 값을 계산하여 매끄러운 패턴과 상대적으로 장기적인 추세를 포착할 수 있도록 합니다. 여기서 창 크기를 14 (2 주)와 30 (대략 1 개월)로 선택했습니다.

```js
# 지정된 창 크기에 대한 데이터프레임에 창 평균 필드 추가
def add_window_avg_features(df, window_sizes):
    for window_size in window_sizes:
        window_col_name = f"avg_power_l{window_size}"
        windowSpec = Window.orderBy("Date").rowsBetween(-window_size, 0)
        df = df.withColumn(window_col_name, round(avg(col("Total_global_active_power")).over(windowSpec), 2))
    return df

window_sizes = [14, 30]
df2 = add_window_avg_features(df2, window_sizes)

df2.select("Date", "Total_global_active_power", "avg_power_l14", "avg_power_l30").sort("Date", ascending=False).show(5)
```



<img src="/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_9.png" />

(4) 지수 가중 이동 평균 (EWMA) 피처

EWMA 피처는 최근 데이터에 더 많은 가중치를 할당하여 과거 데이터에 덜 주의를 기울이는 창 평균 피처의 보정 버전입니다. 더 높은 가중치(알파) 값은 EWMA 피처가 원래 시계열에 더 밀접하게 추적하는 것을 의미합니다. 여기서는 0.2와 0.8이라는 두 가지 별도의 가중치를 선택했습니다.

```python
import pyspark.pandas as ps

# 데이터프레임에 지정된 알파 값의 EWMA 피처를 추가합니다
def add_ewma_features(df, alphas):
    for alpha in alphas:
        ewma_col_name = f"ewma_power_w{str(alpha).replace('.', '')}"
        windowSpec = Window.orderBy("Date")
        df[ewma_col_name] = df.Total_global_active_power.ewm(alpha=alpha).mean().round(2)
    return df

alphas = [0.2, 0.8]
# EWM 함수를 사용하기 위해 pandas-on-Spark 데이터프레임으로 변환합니다
df2_pd = df2.pandas_api()
df2_pd = add_ewma_features(df2_pd, alphas)
# 다시 Spark 데이터프레임으로 변환합니다
df2 = df2_pd.to_spark()

df2.select("Date", "Total_global_active_power", "ewma_power_w02", "ewma_power_w08").sort("Date", ascending=False).show(5)
```



<img src="/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_10.png" />

#4 Notebook에서 시각화 생성하기

다양한 PySpark 함수와 메소드를 사용하여 시간 관련 데이터와 특성을 추출한 후, Databricks의 내장 지원을 활용하여 효율적으로 시각화를 생성할 수 있습니다. 이는 시각화 편집기에서 데이터 필드를 끌어다 놓고 시각적 설정을 구성함으로써 작동합니다. 아래는 몇 가지 예시입니다.

- 산점도: 글로벌 활성 전력과 글로벌 강도 간의 관계



해석: 두 분야 사이에는 매우 강한 양의 상관 관계가 있습니다.

![그림](/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_11.png)

- 상자 그림: 시간대별 글로벌 활성 전력 분포

해석: 7:00부터 21:00까지 글로벌 활성 전력에 상대적으로 큰 변동이 있습니다.




![Line Chart](/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_12.png)

- Line chart: The changes in total global active power, EWMA with alpha 0.2, and EWMA with alpha 0.8 from Jan 2008 to Mar 2008

Interpretation: EWMA with alpha 0.8 sticks more closely to the original time series than EWMA with alpha 0.2.

![Line Chart](/assets/img/2024-05-16-FeatureEngineeringforTime-SeriesUsingPySparkonDatabricks_13.png)




또한, 기본 데이터 프로필을 생성하여 요약 통계량(개수, 누락된 값의 %, 데이터 분포 등)을 표시할 수 있습니다. 이를 통해 특성 엔지니어링 프로세스 전반에 걸쳐 데이터 품질을 보장할 수 있습니다. 위 시각화는 Databricks SQL을 사용하여 쿼리 출력으로 대체적으로 생성할 수도 있습니다.

## 마무리

저희는 Databricks 플랫폼을 활용하여 시계열 데이터의 피처 엔지니어링을 위해 PySpark를 사용한 실습을 진행했습니다:

- 정적 및 스트리밍 데이터 수집은 각각 spark.read() 및 spark.readStream() 메서드를 사용합니다.
- 기본 PySpark 함수(pyspark.sql.functions) 및 DataFrame 메서드를 활용하여 데이터 조작 및 탐색이 이루어집니다.
- trend 관련 피처 추출은 pyspark.sql.Window를 사용하여 데이터 그룹 내의 관계를 계산합니다.
- 내장된 Databricks Notebook 기능을 활용하여 시각화를 수행합니다.



대규모 데이터셋을 다룰 때는 PySpark가 Pandas보다 확장성과 성능 능력으로 인해 자주 선호됩니다. PySpark의 지연 평가 지원 덕분에 계산은 필요할 때만 수행되어 오버헤드가 줄어듭니다. 그러나 때로는 Scala가 더 나은 선택일 수도 있습니다. 왜냐하면 Spark 자체가 Scala로 작성되었기 때문에 최신 기능을 적극적으로 활용할 수 있기 때문입니다. 또한 변경할 수 없는 객체를 사용하여 오류가 덜 발생하는 시스템을 설계할 수 있습니다. 각각의 언어나 라이브러리는 그들만의 장점을 갖고 있습니다. 궁극적으로 선택은 기업 요구 사항, 개발자들의 학습 곡선 및 다른 시스템과의 통합에 달려 있습니다.

## 계속 진행하기 전에

이 글을 즐겨 보셨다면, 제 Medium 페이지와 LinkedIn 페이지를 팔로우해 주시기를 초대합니다. 이렇게 하면 데이터 과학 사이드 프로젝트 관련 흥미로운 콘텐츠 및 머신 러닝 운영(MLOps) 방법론에 관한 데모를 최신 상태로 유지할 수 있습니다.