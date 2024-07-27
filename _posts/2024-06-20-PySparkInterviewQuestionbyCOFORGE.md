---
title: "파이스파크 인터뷰 질문 by COFORGE"
description: ""
coverImage: "/assets/img/2024-06-20-PySparkInterviewQuestionbyCOFORGE_0.png"
date: 2024-06-20 01:48
ogImage: 
  url: /assets/img/2024-06-20-PySparkInterviewQuestionbyCOFORGE_0.png
tag: Tech
originalTitle: "PySpark Interview Question by COFORGE"
link: "https://medium.com/@bvsarathc06/pyspark-interview-question-by-coforge-88fbf8bb7339"
---


이 글에서는 고객 거래 데이터 세트를 사용하여 PySpark를 사용하여 데이터 변환 및 분석을 수행하는 방법을 살펴보겠습니다.

문제 명시:

-PySpark 코드를 작성하여 $10,000보다 큰 고객 거래를 필터링하고, 고객 이름을 첫 글자는 대문자로 변환하고 나머지는 소문자로 변환하고, 각 제품 카테고리별 평균 거래 금액을 계산하십시오.

해결책:

<div class="content-ad"></div>

PySpark 스크립트는 네 가지 주요 단계에서 다음 작업을 수행합니다:

1. **데이터 수집 및 변환:**
- 샘플 고객 거래 데이터를 Spark DataFrame으로 읽어옵니다.
- 고객 이름을 `initcap` 형식으로 변환합니다 (첫 글자를 대문자로 변환하고 나머지는 소문자로 변환).

2. **데이터 필터링:**
- 거래를 10,000 이상인 것만 포함하도록 필터링합니다.

3. **집계:**
- 각 제품 카테고리별 평균 거래 금액을 계산합니다.

<div class="content-ad"></div>

4. **결과 표시:**
- 제품 카테고리별 평균 거래액과 함께 변환된 고객 데이터를 표시합니다.

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, initcap

# SparkSession 생성
spark = SparkSession.builder \
    .appName("CustomerTransactionAnalysis") \
    .getOrCreate()

# 대문자로 된 고객 이름이 포함된 고객 거래의 샘플 데이터
data = [
    (1, "ALICE", 12000, "전자제품"),
    (2, "BOB", 9000, "가전제품"),
    (3, "CHARLIE", 15000, "패션"),
    (4, "DANIEL", 8000, "전자제품"),
    (5, "EMMA", 11000, "패션"),
    (6, "FRANK", 13000, "가전제품"),
    (7, "GINA", 10000, "전자제품"),
    (8, "HENRY", 14000, "패션"),
    (9, "ISABELLA", 9500, "가전제품"),
    (10, "JACK", 10500, "전자제품")
]

# 샘플 데이터로부터 DataFrame 생성
customer_df = spark.createDataFrame(data, ["customer_id", "customer_name", "transaction", "product_category"])

# 초기 데이터 표시
print("초기 데이터:")
customer_df.show()

# 고객 이름을 initcap 형식으로 변환
transformed_df = customer_df.withColumn("customer_name_transformed", initcap(col("customer_name")))

# 10,000보다 큰 고객 거래 필터링
filtered_transactions = transformed_df.filter(col("transaction") > 10000)

# 각 제품 카테고리별 평균 거래액 계산
avg_transaction_by_category = filtered_transactions.groupBy("product_category") \
    .agg(avg("transaction").alias("avg_transaction"))

# 평균과 함께 변환된 데이터 표시
print("\n평균이 포함된 변환된 데이터:")
result = filtered_transactions.select("customer_name_transformed", "product_category", "transaction") \
    .join(avg_transaction_by_category, "product_category") \
    .orderBy("product_category")

result.show(truncate=False)

# SparkSession 중지
spark.stop()
```

출력:

<img src="/assets/img/2024-06-20-PySparkInterviewQuestionbyCOFORGE_0.png" />