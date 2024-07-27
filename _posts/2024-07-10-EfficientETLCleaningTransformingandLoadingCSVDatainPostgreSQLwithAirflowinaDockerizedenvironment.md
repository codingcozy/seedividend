---
title: "효율적인 ETL Docker 환경에서 Airflow를 사용해 PostgreSQL로 CSV 데이터 정리, 변환 및 적재하는 방법"
description: ""
coverImage: "/assets/img/2024-07-10-EfficientETLCleaningTransformingandLoadingCSVDatainPostgreSQLwithAirflowinaDockerizedenvironment_0.png"
date: 2024-07-10 02:38
ogImage: 
  url: /assets/img/2024-07-10-EfficientETLCleaningTransformingandLoadingCSVDatainPostgreSQLwithAirflowinaDockerizedenvironment_0.png
tag: Tech
originalTitle: "Efficient ETL: Cleaning, Transforming, and Loading CSV Data in PostgreSQL with Airflow in a Dockerized environment"
link: "https://medium.com/@rajatbelgundi/efficient-etl-cleaning-transforming-and-loading-csv-data-in-postgresql-with-airflow-in-a-0bf062a0ed41"
---


데이터 엔지니어링이 현재 데이터 산업에서 화두입니다. 기업들이 데이터 엔지니어링 측면에 초점을 맞추기 시작했습니다. 최근에는 체계적인 데이터 파이프라인 구축이 주요 관심사입니다. 효율적인 데이터 파이프라인을 통해 품질 높은 데이터를 조직 내 다양한 팀에게 제공할 수 있습니다. 데이터 엔지니어들은 데이터 과학 프로젝트를 효율적으로 진행할 수 있는 이러한 파이프라인을 설계하는 데 도움을 줍니다. 이러한 파이프라인은 데이터 분석가와 비즈니스 분석팀이 데이터 시각화와 대시보드를 생성하여 비즈니스 결정을 지원하는 데 활용할 수도 있습니다.

![이미지](/assets/img/2024-07-10-EfficientETLCleaningTransformingandLoadingCSVDatainPostgreSQLwithAirflowinaDockerizedenvironment_0.png)

문제 설명:

구조화된 원시 데이터가 CSV 파일에 저장되어 있습니다. 이 데이터를 사전 처리하고 정제한 후 데이터베이스에 저장하고 싶습니다. 이 경우 데이터베이스는 PostgreSQL입니다. 많은 상황에서 데이터가 지속적으로 변경되거나 새 데이터가 시스템에 추가됩니다. 이러한 경우에는 CSV 파일도 새 데이터가 들어오는 빈도와 동일한 빈도로 변경됩니다. 그러면 데이터 전처리 스크립트를 실행하고 데이터를 대상 데이터 저장소(PostgreSQL)에 로드해야 합니다.

<div class="content-ad"></div>

위에서 언급된 모든 작업은 잘 조정되고 예약되어 실행되어야 합니다. 이를 위해 저희는 Apache Airflow와 같은 오케스트레이션 도구를 사용합니다. 이러한 모든 도구를 사용하고 작업을 수행하기 위해서는 호스팅 환경이 필요합니다. 이 프로젝트에서는 호스팅 환경으로 Docker를 사용할 것입니다. 모든 도구는 Docker 컨테이너로 실행될 것입니다. 모든 코드는 Python으로 작성될 것입니다.

구현

단계:

- 데이터 클리닝, 품질 검사 및 데이터 변환을 위한 Python 스크립트를 개발합니다.
- 처리된 데이터 파일이 다른 CSV 파일에 저장되었는지 확인합니다.
- 모든 도구가 docker-compose 파일에 서비스로 나열된 docker-compose 파일을 개발합니다.
- 사용될 도구: Apache Airflow, PostgreSQL
- 모든 서비스가 포함된 Docker 환경을 설정하기 위해 docker-compose 파일을 실행합니다.
- Airflow의 Directed Acyclic Graphs (DAGs)을 위한 Python 스크립트를 개발하여 데이터 파이프라인을 오케스트레이션합니다.
- 클린업된 CSV 파일을 PostgreSQL 데이터베이스 테이블로 로드하는 코드를 포함합니다.
- 저희 설정이 완료되었습니다.

<div class="content-ad"></div>

**단계 1:**

아래 표시된 데이터 정리 스크립트는 파이썬 스크립트, 데이터 및 데이터베이스를 사용하여 데이터 파이프라인을 모방하는 방법을 보여줍니다. 실제 데이터 파이프라인에서는 더 복잡해질 수 있습니다. 저는 머신러닝 알고리즘을 실행하는 한 예제를 더 시도해봤는데, 이 경우에는 더 많은 시간과 세부사항이 필요합니다.

```python
# 라이브러리 가져오기
import numpy as np
import pandas as pd
pd.set_option('display.max_columns', 100)

# 데이터 읽기
df = pd.read_csv('/opt/airflow/dags/Wine.csv')
# print(df.head()) # 성공

# 데이터 품질 분석

### 데이터 유형 확인
print('데이터프레임 차원:', df.shape)
print(df.info())

### 1. 결측값 분석
# print(df.isna().sum())

# 데이터 분석
print(df.describe())

# 인덱스 열 추가
df['id'] = [i for i in range(len(df))]
print(df.info())

# 새로운 CSV 파일을 dags 디렉토리에 저장
df.to_csv('/opt/airflow/dags/wine_cleaned.csv', index=False)
```

**단계 3: Docker Compose 파일**

<div class="content-ad"></div>

a. 공식 Airflow 문서에서 airflow 도커 서비스를 이용할 수 있어요.

b. PostgreSQL의 경우, docker-compose에서 다른 서비스와 마찬가지로 서비스를 만들어요.

c. 어떤 서비스든 이미지 버전, 설정해야 하는 환경 변수, 로컬 파일 시스템에 매핑할 볼륨, 서비스가 도커 컨테이너 포트에서 실행될 포트 - 로컬 포트에서 도커 컨테이너 포트로 매핑하는 등을 염두에 두어야 해요. (PostgreSQL은 보통 5432:5432 포트에서 실행돼요)

```js
# Apache Software Foundation (ASF)의 라이선스 하에 사용 허가된 몇 가지 도움을 받은 레이아웃에 관한 추가 정보는 ASF의 NOTICE 파일에 포함되어 있습니다.
# 이 설정은 마찬가지로 default인 .env 파일이나 환경 변수를 사용하는 기본 설정을 지원합니다.
# 다음과 같은 변수를 지원합니다.

# AIRFLOW_IMAGE_NAME           - Airflow를 실행하는 데 사용되는 도커 이미지 이름
#                                Default: apache/airflow:2.8.0
# AIRFLOW_UID                  - Airflow 컨테이너 내의 사용자 ID
#                                Default: 50000
# AIRFLOW_PROJ_DIR             - 모든 파일이 볼륨 연결될 기본 경로
#                                Default: .
# 이러한 설정은 대개 독립 테스트/시도 용으로 Airflow 실행시 사용됩니다

# 이 파일을 귀하의 요구에 맞게 수정하십시오.
---
x-airflow-common:
  &airflow-common
  # 사용자 지정 종속성을 추가하거나 제공자 패키지를 업그레이드하기 위해 확장 이미지를 사용할 수 있습니다.
  # 이미지 줄을 주석 처리하고 Dockerfile을 docker-compose.yaml 파일이 있는 디렉토리에 배치하고
  # 아래 "build" 줄을 주석 처리 해제하고, 실행을 위해 'docker-compose build'를 실행하십시오.
  image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:2.8.0}
  # build: .
  environment:
    &airflow-common-env
    AIRFLOW__CORE__EXECUTOR: CeleryExecutor
    AIRFLOW__DATABASE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__RESULT_BACKEND: db+postgresql://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__BROKER_URL: redis://:@redis:6379/0
    AIRFLOW__CORE__FERNET_KEY: ''
    AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: 'true'
    AIRFLOW__CORE__LOAD_EXAMPLES: 'true'
    AIRFLOW__API__AUTH_BACKENDS: 'airflow.api.auth.backend.basic_auth,airflow.api.auth.backend.session'
    AIRFLOW__SCHEDULER__ENABLE_HEALTH_CHECK: 'true'
    _PIP_ADDITIONAL_REQUIREMENTS: ${_PIP_ADDITIONAL_REQUIREMENTS:-}
  volumes:
    - ${AIRFLOW_PROJ_DIR:-.}/dags:/opt/airflow/dags
    - ${AIRFLOW_PROJ_DIR:-.}/logs:/opt/airflow/logs
    - ${AIRFLOW_PROJ_DIR:-.}/config:/opt/airflow/config
    - ${AIRFLOW_PROJ_DIR:-.}/plugins:/opt/airflow/plugins
    # - ${AIRFLOW_PROJ_DIR:-.}/phase1:/opt/airflow/phase1   
  user: "${AIRFLOW_UID:-50000}:0"
  depends_on:
    &airflow-common-depends-on
    redis:
      condition: service_healthy
    postgres:
      condition: service_healthy

services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: airflow
      POSTGRES_PASSWORD: airflow
      POSTGRES_DB: airflow
    volumes:
      - postgres-db-volume:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "airflow"]
      interval: 10s
      retries: 5
      start_period: 5s
    restart: always

  ...
```


<div class="content-ad"></div>

**STEP 6: Airflow에서 DAG 작성**

이 스크립트에서는 표를 데이터베이스에서 이미 생성했기 때문에 대부분의 create_table 메서드 부분을 주석 처리했습니다. 이 프로젝트의 단계를 보여주기 위해 이렇게 작업했습니다.

```python
import psycopg2
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow import DAG
from datetime import datetime
import subprocess

# 의존성 설치
def install_dependencies():
    subprocess.run(['pip','install','numpy'])
    subprocess.run(['pip','install','psycopg2'])

# PostgreSQL에 연결
def connect_to_db():
    conn = psycopg2.connect(database="postgres", user="user", password="Password@9876", host="postgres-sql-db", port="5432")
    conn.close()
    print('DB에 성공적으로 연결되었습니다.')

def create_table_db():
    print('테이블이 성공적으로 생성되었습니다.')

def copy_csv_to_table():
    conn = psycopg2.connect(database='postgres', user='user', password='Password@9876', host='postgres-sql-db', port='5432')
    conn.autocommit = True
    cursor = conn.cursor()
    copy_csv = '''
               COPY wine_data (Alcohol, Malic_Acid, Ash, Ash_Alcanity, Magnesium, Total_Phenols,
               Flavanoids, Nonflavanoid_Phenols, Proanthocyanins, Color_Intensity, Hue,
               OD280, Proline, Customer_Segment, id)
               FROM '/opt/airflow/dags/wine_cleaned.csv'
               DELIMITER ','
               CSV HEADER;
               '''
    cursor.execute(copy_csv)
    conn.close()

# DAG 정의
data_ingestion_dag = DAG(dag_id='data-ingestion',
                         description='CSV에서 PostgreSQL DB로 데이터 적재 DAG',
                         schedule_interval='@daily',
                         start_date=datetime(2024, 1, 4))

# 작업 정의
task0 = PythonOperator(task_id='의존성-설치',
                       python_callable=install_dependencies,
                       dag=data_ingestion_dag)
task1 = BashOperator(task_id='데이터-클리닝',
                     bash_command='python '+'/opt/airflow/dags/data_cleaning.py',
                     dag=data_ingestion_dag)
task2 = PythonOperator(task_id='PostgreSQL-DB-연결',
                       python_callable=connect_to_db,
                       dag=data_ingestion_dag)
task3 = PythonOperator(task_id='테이블-생성',
                       python_callable=create_table_db,
                       dag=data_ingestion_dag)
task4 = PythonOperator(task_id='CSV-테이블로-복사',
                       python_callable=copy_csv_to_table,
                       dag=data_ingestion_dag)

task0 >> task1 >> task2 >> task3 >> task4

print('완료')
```

위 코드의 마지막 부분에 나타난 것처럼 총 다섯 가지 작업이 수행됩니다. 여기서는 data_ingestion_dag라는 단일 DAG를 사용하여 작업을 실행합니다.

<div class="content-ad"></div>

Airflow DAG (data_ingestion_dag):

Airflow 작업 상태 및 실행

[Efficient ETL: Cleaning, Transforming, and Loading CSV Data in PostgreSQL with Airflow in a Dockerized environment](/assets/img/2024-07-10-EfficientETLCleaningTransformingandLoadingCSVDatainPostgreSQLwithAirflowinaDockerizedenvironment_1.png)

가장 최근 Airflow DAG 실행:

<div class="content-ad"></div>

![link](/assets/img/2024-07-10-EfficientETLCleaningTransformingandLoadingCSVDatainPostgreSQLwithAirflowinaDockerizedenvironment_2.png)
  
클린업되지 않은 CSV 파일을 이용해 테이블이 채워졌습니다.

![link2](/assets/img/2024-07-10-EfficientETLCleaningTransformingandLoadingCSVDatainPostgreSQLwithAirflowinaDockerizedenvironment_3.png)
  
프로젝트에 대해 더 자세히 알아보려면 [GitHub 링크](GitHub 링크)를 참조하세요.