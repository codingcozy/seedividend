---
title: "AWS Glue로 다수의 CSV 파일을 처리하는 ETL 단계별 팁"
description: ""
coverImage: "/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_0.png"
date: 2024-05-17 20:37
ogImage: 
  url: /assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_0.png
tag: Tech
originalTitle: "Step-by-Step ETL Tips with AWS Glue: Handling Multiple CSV Files from S3"
link: "https://medium.com/@lintang-gilang01/step-by-step-etl-tips-with-aws-glue-handling-multiple-csv-files-from-s3-75e69e0a55ca"
isUpdated: true
---




이건 훌륭한 이미지입니다! 이 디지털 시대에 데이터는 기업에게 귀중한 자산이 되었습니다. 데이터를 효과적으로 처리하고 분석하는 것이 유용한 통찰력을 얻고 스마트한 의사결정을 하는 데 중요합니다. AWS Glue는 데이터를 쉽고 효율적으로 관리하고 분석하는 데 도움이 되는 포괄적인 솔루션이 됩니다.

이 세션에서는 AWS Glue, 데이터 카탈로그, 및 크롤러가 하나의 버킷에 있는 여러 CSV 파일을 단일 데이터 세트로 읽는 방법에 대해 논의할 것입니다. 아래는 아키텍처 요약입니다:

![아키텍처 이미지](/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_1.png)

<div class="content-ad"></div>

# S3 버킷 준비하기

처리하려는 모든 CSV 파일이 아마존 S3의 단일 버킷에 저장되어 있는지 확인하세요.

![이미지](/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_2.png)

# AWS Glue 데이터 카탈로그에서 데이터베이스 생성하기

<div class="content-ad"></div>

AWS Management Console에서 AWS Glue를 열고, "데이터베이스" 섹션으로 이동하여 메타데이터를 저장할 새 데이터베이스를 생성하세요.

![이미지](/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_3.png)

# 크롤러 생성

이전에 생성한 데이터베이스를 선택하여 크롤러에 의해 생성된 테이블을 저장하세요. 크롤러를 사용하여 테이블 추가를 선택하세요. 크롤러에 이름을 지정하고 CSV 파일을 포함하는 S3 버킷 위치를 선택하여 데이터 원본을 지정하세요. S3의 데이터 원본에 액세스할 수 있는 IAM 역할을 지정하고 Glue 데이터 카탈로그에 항목을 생성할 수 있는 권한이 있는 IAM 역할을 지정하세요. 필요에 따라 크롤러 옵션을 구성하세요. 크롤러를 주기적으로 실행하려면 빈도를 설정하세요. 구성을 완료한 후 크롤러를 실행하세요. 크롤러는 지정된 버킷의 모든 CSV 파일을 읽고 Glue 데이터 카탈로그에 하나 이상의 테이블을 생성합니다.

<div class="content-ad"></div>


![Step-by-Step ETL Tips with AWS Glue: Handling Multiple CSV Files from S3](/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_4.png)

![Step-by-Step ETL Tips with AWS Glue: Handling Multiple CSV Files from S3](/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_5.png)

Once the crawler status is complete you can preview the table data that has been created using Athena

![Step-by-Step ETL Tips with AWS Glue: Handling Multiple CSV Files from S3](/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_6.png)


<div class="content-ad"></div>

# AWS Glue에서 ETL 작업 만들기

![ETL image](/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_7.png)

AWS Glue은 데이터 변환의 핵심 프로세스인 ETL(추출, 변환, 로드)을 수행하는 다양한 방법을 제공합니다. 시각적 ETL, 주피터, 또는 스크립팅을 통해 가장 적합한 방법을 선택할 수 있습니다.

## 시각적 ETL

<div class="content-ad"></div>

<img src="/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_8.png" />

기술적 배경이 없는 분들에게 시각적 ETL은 이상적인 선택지입니다. 직관적인 드래그 앤 드롭 인터페이스를 통해 코드 작성 없이도 ETL 워크플로를 구축할 수 있습니다. 다양한 데이터 원본을 쉽게 연결하고 데이터 변환을 적용하며 처리된 데이터를 원하는 대상에로 로드할 수 있습니다.

여기 AWS Glue로 Data Catalog에서 S3로 시각적 ETL을 구축하는 단계별 안내서가 있습니다.

- AWS Glue Studio에 액세스
- 새 워크플로 생성
- 데이터 원본 선택
- 변환 추가
- 데이터 대상 선택
- 작업 구성
- 작업 검토 및 실행

<div class="content-ad"></div>

## Jupyter Notebook

![Image](/assets/img/2024-05-17-Step-by-StepETLTipswithAWSGlueHandlingMultipleCSVFilesfromS3_9.png)

보다 경험 많은 데이터 전문가들에게 Jupyter는 더 많은 유연성과 파워를 제공합니다. Jupyter 노트북을 사용하면 Python 코드와 텍스트, 시각화를 결합하여 복잡한 데이터 분석을 수행할 수 있습니다.

다음은 AWS Glue를 사용하여 Jupyter Notebook을 사용하는 단계입니다. Data Catalog에서 S3로 콘솔에서 사용하세요.

<div class="content-ad"></div>

- AWS Glue Studio를 열어주세요.
- 새로운 주피터 노트북을 생성해주세요.
- 주피터 노트북에 파이썬 코드를 작성해주세요.
- 작성한 파이썬 코드를 실행해주세요.
- 주피터 노트북을 저장하고 공유해주세요.

## 스크립팅

ETL 프로세스를 완전히 제어하고 싶은 경우, AWS Glue를 사용하여 Python 및 Scala와 같은 다양한 프로그래밍 언어로 스크립트를 작성할 수 있습니다. 이러한 스크립트는 귀하의 특정 요구에 맞게 설계된 복잡한 데이터 변환을 수행하는 데 사용될 수 있습니다.

아래는 데이터 카탈로그부터 S3까지 콘솔에서 AWS Glue를 스크립팅과 함께 사용하는 단계입니다.

<div class="content-ad"></div>

- AWS Glue 콘솔을 열어주세요.
- 좌측 탐색 패널에서 Glue를 선택합니다.
- 메인 패널 상단에서 Jobs를 선택합니다.
- 'Create job'을 클릭합니다.
- 작업의 이름을 입력해주세요. 예를 들어 "TransferDataFromCatalogToS3"와 같이 지정합니다.
- Script location 섹션에서 Glue 스크립트를 선택합니다.
- Glue 스크립트 상자에 다음과 같은 Python 스크립트를 입력하세요. 이는 예시입니다.

```js
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
  
sc = SparkContext.getOrCreate()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)

# Read
dyf = glueContext.create_dynamic_frame.from_catalog(database='db-s3-glue ', 
                                                    table_name='1_source'
                                                   )

# Store
output_dyf = glueContext.write_dynamic_frame.from_options(frame=dyf, 
                                                          connection_type="s3", 
                                                          format="glueparquet", 
                                                          connection_options={"path": "s3://s3-glue/2-target/", "partitionKeys": []}, 
                                                          format_options={"compression": "uncompressed"}
                                                         )

job.commit()
```

# 다음은 무엇이 있을까요?

- MySQL, SQL Server, Aurora와 같은 RDBMS 소스 탐색하기.
- Redshift와 같은 데이터 웨어하우스로의 대상 데이터 탐색하기.
- Workflows(오케스트레이션)를 사용하여 작업 자동화하기.
- 스트림 처리.

<div class="content-ad"></div>

## 최선의 인사

린탕 길랑