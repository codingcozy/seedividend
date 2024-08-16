---
title: "실제 데이터를 사용하는 Kafka, Spark, Airflow, Postgres, Docker 기반의 종단 간 데이터 엔지니어링 시스템 구축 방법"
description: ""
coverImage: "/assets/img/2024-07-06-End-to-EndDataEngineeringSystemonRealDatawithKafkaSparkAirflowPostgresandDocker_0.png"
date: 2024-07-06 03:25
ogImage: 
  url: /assets/img/2024-07-06-End-to-EndDataEngineeringSystemonRealDatawithKafkaSparkAirflowPostgresandDocker_0.png
tag: Tech
originalTitle: "End-to-End Data Engineering System on Real Data with Kafka, Spark, Airflow, Postgres, and Docker"
link: "https://medium.com/towards-data-science/end-to-end-data-engineering-system-on-real-data-with-kafka-spark-airflow-postgres-and-docker-a70e18df4090"
isUpdated: true
---




이 글은 두 단계로 나누어진 프로젝트의 일환입니다. 첫 번째 단계는 데이터 파이프라인 구축에 초점을 맞춥니다. 이는 API에서 데이터를 가져와 PostgreSQL 데이터베이스에 저장하는 과정을 포함합니다. 두 번째 단계에서는 이 데이터베이스와 상호 작용하는 언어 모델을 활용한 응용 프로그램을 개발할 예정입니다.

데이터 시스템이나 언어 모델 응용 프로그램에 처음 접하는 사람들을 위한 이 프로젝트는 다음과 같은 두 부분으로 구성되어 있습니다:

- 이 첫 번째 글에서는 Kafka를 사용한 스트리밍, Airflow를 사용한 오케스트레이션, 데이터 변환을 위한 Spark, 그리고 저장을 위한 PostgreSQL을 활용한 데이터 파이프라인 구축을 안내합니다. 이러한 도구들을 설정하고 실행하기 위해 Docker를 사용할 것입니다.
- 두 번째 글은 나중에 업데이트될 예정인데, LangChain과 같은 도구를 사용하여 외부 데이터베이스와 통신하는 에이전트를 생성하는 것을 다룰 것입니다.

이 프로젝트의 첫 부분은 데이터 엔지니어링을 처음 시작하는 사람들뿐만 아니라 데이터 과학자와 머신러닝 엔지니어들에게도 적합합니다. 이러한 데이터 엔지니어링 도구를 직접 사용하는 것이 도움이 됩니다. 기계 학습 모델의 생성 및 확장을 미화하며, 이를 효율적으로 실제 환경에서 수행되도록 보장하는 데 도움이 됩니다.

<div class="content-ad"></div>

이 기사는 논의된 도구들의 이론적 측면보다는 실제 적용에 초점을 맞춥니다. 이 도구들이 내부적으로 어떻게 작동하는지 자세히 이해하려면 온라인으로 많은 우수 자료들이 있습니다.

# 개요

데이터 파이프라인 과정을 단계별로 살펴봅시다:

- 데이터 스트리밍: 먼저, 데이터가 API에서 Kafka 토픽으로 스트리밍됩니다.
- 데이터 처리: 그런 다음 Spark 작업이 이어서 Kafka 토픽에서 데이터를 소비하고 PostgreSQL 데이터베이스로 전송합니다.
- Airflow를 이용한 스케줄링: 스트리밍 작업과 Spark 작업은 모두 Airflow를 사용하여 조율됩니다. 실제 시나리오에서 Kafka 프로듀서는 API를 계속 감청할 것이지만, 데모로써 우리는 Kafka 스트리밍 작업을 매일 실행하도록 예약할 것입니다. 스트리밍이 완료되면 Spark 작업이 데이터를 처리하여 LLM 애플리케이션이 사용할 준비를 합니다.

<div class="content-ad"></div>

이 모든 도구는 도커를 사용하여 구축 및 실행되며 더 구체적으로 도커-컴포즈를 사용합니다.

![이미지](/assets/img/2024-07-06-End-to-EndDataEngineeringSystemonRealDatawithKafkaSparkAirflowPostgresandDocker_0.png)

이제 우리의 파이프라인 청사진이 준비되었으니, 기술적인 세부사항을 자세히 살펴보겠습니다!

# 로컬 설정

<div class="content-ad"></div>

먼저 아래 명령을 사용하여 로컬 머신에 Github 리포지토리를 복제할 수 있어요:

```js
git clone https://github.com/HamzaG737/data-engineering-project.git
```

프로젝트 전체 구조는 다음과 같아요:

```js
├── LICENSE
├── README.md
├── airflow
│   ├── Dockerfile
│   ├── __init__.py
│   └── dags
│       ├── __init__.py
│       └── dag_kafka_spark.py
├── data
│   └── last_processed.json
├── docker-compose-airflow.yaml
├── docker-compose.yml
├── kafka
├── requirements.txt
├── spark
│   └── Dockerfile
└── src
    ├── __init__.py
    ├── constants.py
    ├── kafka_client
    │   ├── __init__.py
    │   └── kafka_stream_data.py
    └── spark_pgsql
        └── spark_streaming.py
```

<div class="content-ad"></div>

- airflow 디렉토리에는 airflow를 설정하는 사용자 정의 Dockerfile과 작업을 생성하여 스케줄하는 dags 디렉토리가 포함되어 있습니다.
- data 디렉토리에는 Kafka 스트리밍 작업에 중요한 last_processed.json 파일이 포함되어 있습니다. 이 파일의 역할에 대한 자세한 내용은 Kafka 섹션에서 제공됩니다.
- docker-compose-airflow.yaml 파일에는 airflow를 실행하는 데 필요한 모든 서비스가 정의되어 있습니다.
- docker-compose.yaml 파일에는 Kafka 서비스가 정의되어 있으며 docker-proxy가 포함되어 있습니다. 이 프록시는 Airflow의 docker-operator를 통해 Spark 작업을 실행하는 데 필수적이며, 이에 대한 개념은 나중에 자세히 다룰 것입니다.
- spark 디렉토리에는 spark 설정을 위한 사용자 정의 Dockerfile이 포함되어 있습니다.
- src에는 애플리케이션을 실행하는 데 필요한 파이썬 모듈이 포함되어 있습니다.

로컬 개발 환경을 설정하려면 먼저 필요한 Python 패키지를 설치하세요. 꼭 필요한 패키지는 psycopg2-binary뿐입니다. 이 패키지만 설치하거나 requirements.txt 파일에 나열된 모든 패키지를 설치할 수 있습니다. 모든 패키지를 설치하려면 다음 명령을 사용하세요:

```js
pip install -r requirements.txt
```

이제 프로젝트 세부 정보를 단계별로 살펴보겠습니다.

<div class="content-ad"></div>

# API 소개

API는 프랑스 공공 서비스의 RappelConso입니다. 이 API를 통해 프랑스의 전문가들이 선언한 제품 회수와 관련된 데이터에 액세스할 수 있습니다. 데이터는 프랑스어로 제공되며 처음에는 31개의 열(또는 필드)이 있습니다. 가장 중요한 몇 가지는 다음과 같습니다:

- reference_fiche(참조 시트): 회수된 제품의 고유 식별자입니다. 나중에 당사의 Postgres 데이터베이스의 기본 키로 작용할 것입니다.
- categorie_de_produit(제품 범주): 예를 들어 식품, 가전제품, 도구, 운송 수단 등이 있습니다.
- sous_categorie_de_produit(제품 하위 범주): 예를 들어 식품 범주의 하위 범주로 고기, 유제품, 곡물이 있을 수 있습니다.
- motif_de_rappel(회수 사유): 납득할 만한 사항으로서 가장 중요한 필드 중 하나입니다.
- date_de_publication(게시 날짜): 발표 날짜를 번역한 필드입니다.
- risques_encourus_par_le_consommateur(소비자가 제품을 사용할 때 마주치는 위험): 제품을 사용할 때 소비자가 마주칠 수 있는 위험을 포함합니다.
- 제품 이미지 링크, 유통업체 목록 링크 등 다양한 링크에 해당하는 필드도 있습니다.

이 링크를 통해 몇 가지 예시를 확인하고 데이터 집합 레코드를 수동으로 조회할 수 있습니다.

<div class="content-ad"></div>

우리는 몇 가지 중요한 방식으로 데이터 열을 정제했습니다:

- 프로젝트에 필요 없는 버전 시스템의 일부인 ndeg_de_version 및 rappelguid와 같은 열을 제거했습니다.
- 소비자 위험과 관련된 열 — risques_encourus_par_le_consommateur 및 description_complementaire_du_risque — 를 합쳐 제품 위험의 명확한 개요를 얻을 수 있도록 했습니다.
- 마케팅 기간을 나타내는 date_debut_fin_de_commercialisation 열을 두 개의 별도 열로 나누었습니다. 이 분할은 제품의 마케팅 시작 또는 종료에 대한 쿼리를 쉽게 할 수 있게 해줍니다.
- 링크, 참조 번호 및 날짜를 제외한 모든 열에서 악센트를 제거했습니다. 이는 일부 텍스트 처리 도구가 악센트 문자에 어려움을 겪는 문제 때문에 중요합니다.

이러한 변경 사항에 대한 자세한 내용은 src/kafka_client/transformations.py의 변환 스크립트를 확인해보세요. 업데이트된 열 목록은 DB_FIELDS 아래의 src/constants.py에서 확인할 수 있습니다.

# 카프카 스트리밍

<div class="content-ad"></div>

스트리밍 작업을 실행할 때마다 API에서 모든 데이터를 보내는 것을 피하기 위해, 최신 스트리밍의 마지막 게시 날짜를 포함하는 로컬 json 파일을 정의합니다. 그런 다음 이 날짜를 새로운 스트리밍 작업의 시작 날짜로 사용할 것입니다.

예를 들어, 최신 리콜 제품의 게시 날짜가 2023년 11월 22일인 경우를 가정해 봅시다. 이 날짜 이전에 있는 모든 리콜 제품 정보가 이미 우리의 Postgres 데이터베이스에 저장되어 있다고 가정하면, 우리는 이제 11월 22일부터 데이터를 스트리밍할 수 있습니다. 11월 22일의 데이터를 처리하지 못한 시나리오가 발생할 수 있으므로 일정 부분 중복될 수 있습니다.

이 파일은 ./data/last_processed.json에 저장되며 다음과 같은 형식을 갖습니다:

```js
{last_processed: "2023-11-22"}
```

<div class="content-ad"></div>

기본적으로 파일은 빈 json이며, 이는 우리의 첫 번째 스트리밍 작업이 약 10,000개의 API 레코드를 모두 처리할 것을 의미합니다.

프로덕션 환경에서는 지난 처리 날짜를 로컬 파일에 저장하는 이 접근 방식이 실용적이지 않으며, 외부 데이터베이스나 객체 저장 서비스를 활용하는 등 다른 방법이 더 적합할 수 있습니다.

카프카 스트리밍을 위한 코드는 ./src/kafka_client/kafka_stream_data.py 에 있으며, 주로 API에서 데이터를 쿼리하고 변환을 수행하며, 잠재적인 중복을 제거하고 최신 발행 날짜를 업데이트하고 카프카 프로듀서를 통해 데이터를 제공하는 것이 포함됩니다.

다음 단계는 아래에 정의된 docker-compose의 카프카 서비스를 실행하는 것입니다.

<div class="content-ad"></div>

```yaml
버전: '3'

서비스:
  kafka:
    이미지: 'bitnami/kafka:latest'
    포트:
      - '9094:9094'
    네트워크:
      - airflow-kafka
    환경:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093,EXTERNAL://:9094
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092,EXTERNAL://localhost:9094
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
    볼륨:
      - ./kafka:/bitnami/kafka

  kafka-ui:
    컨테이너_이름: kafka-ui-1
    이미지: provectuslabs/kafka-ui:latest
    포트:
      - 8800:8080  
    디펜즈_온:
      - kafka
    환경:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: PLAINTEXT://kafka:9092
      DYNAMIC_CONFIG_ENABLED: 'true'
    네트워크:
      - airflow-kafka

네트워크:
  airflow-kafka:
    외부: true
```

이 파일의 주요 내용은 다음과 같습니다:

- kafka 서비스는 bitnami/kafka 이미지를 사용합니다.
- 우리의 작은 프로젝트에는 충분한 한 개의 브로커로 서비스를 구성합니다. Kafka 브로커는 데이터의 원본인 프로듀서로부터 메시지를 수신하고 저장하여 소비자에게 전달하는 역할을 합니다. 브로커는 클러스터 내부 통신을 위해 포트 9092에서, 외부 통신을 위해 포트 9094에서 들어오는 클라이언트 연결을 허용합니다.
- 볼륨 부분에서는 로컬 디렉토리 kafka를 도커 컨테이너 디렉토리 /bitnami/kafka에 매핑하여 데이터 지속성과 호스트 시스템에서 Kafka 데이터를 검사할 수 있게 합니다.
- provectuslabs/kafka-ui:latest 이미지를 사용하는 kafka-ui 서비스를 설정합니다. 이는 Kafka 클러스터와 상호작용하는 사용자 인터페이스를 제공합니다. 이는 Kafka 토픽과 메시지를 모니터링하고 관리하기 위해 특히 유용합니다.
- kafka와 airflow 간의 통신을 보장하기 위해 외부 네트워크 airflow-kafka를 사용할 것입니다.

kafka 서비스를 실행하기 전에 다음 명령어를 사용하여 airflow-kafka 네트워크를 생성해봅시다:

<div class="content-ad"></div>

```js
도커 네트워크 airflow-kafka를 생성하세요.

이제 kafka 서비스를 시작할 준비가 모두 끝났어요!

도커 컴포즈를 실행하세요.

서비스가 시작되면 http://localhost:8800/에서 kafka-ui를 방문해주세요. 일반적으로 이런 모습을 볼 수 있을 거에요:
```

<div class="content-ad"></div>


/assets/img/2024-07-06-End-to-EndDataEngineeringSystemonRealDatawithKafkaSparkAirflowPostgresandDocker_1.png

이제 API 메시지를 포함할 topic을 생성할 차례입니다. 왼쪽의 Topics를 클릭한 후 왼쪽 상단에 있는 Add a topic을 클릭하세요. 저희 topic은 rappel_conso로, 브로커가 하나뿐이기 때문에 복제 요소를 1로 설정합니다. 우리가 동시에 하나의 소비자 스레드만 가지게 될 것이기 때문에 파티션 수도 1로 설정할 겁니다. 마지막으로, 카프카 토픽에서 데이터를 보관할 시간을 한 시간과 같은 짧은 시간으로 설정할 수 있습니다. 스파크 작업을 카프카 스트리밍 작업 바로 다음에 실행할 것이기 때문에 데이터를 오랫동안 보관할 필요가 없을 겁니다.

# Postgres 설정

스파크와 에어플로우 구성을 설정하기 전에, API 데이터를 저장할 Postgres 데이터베이스를 만들어봅시다. 이 작업을 위해 저는 pgadmin 4 도구를 사용했지만, 다른 Postgres 개발 플랫폼을 사용해도 됩니다.


<div class="content-ad"></div>

포스트그레와 PGAdmin을 설치하려면 이 링크를 방문하세요: [https://www.postgresql.org/download/](https://www.postgresql.org/download/) 이 링크에서 운영 체제에 맞는 패키지를 다운로드하세요. 포스트그레를 설치할 때는 나중에 스파크 환경에서 데이터베이스에 연결할 때 필요한 비밀번호를 설정해야 합니다. 포트 번호는 5432로 남겨둘 수도 있습니다.

설치가 완료되면 PGAdmin을 시작하고 이와 같은 창이 나타나야합니다:

![창 예시](/assets/img/2024-07-06-End-to-EndDataEngineeringSystemonRealDatawithKafkaSparkAirflowPostgresandDocker_2.png)

우리가 만들고자 하는 테이블에 많은 열이 있기 때문에, 우리는 Python용 PostgreSQL 데이터베이스 어댑터인 psycopg2를 사용하여 스크립트로 테이블을 만들고 열을 추가하기로 했습니다.

<div class="content-ad"></div>

위의 텍스트를 친절한 톤으로 한글로 번역하면 다음과 같습니다:

안녕하세요! 세계 여행 전문가 여러분! 이 스크립트를 실행하려면 아래 명령어를 사용하세요:

```js
python scripts/create_table.py
```

스크립트에서는 postgres 비밀번호를 환경 변수로 저장하고 'POSTGRES_PASSWORD'라고 명명했습니다. 다른 방법으로 비밀번호에 접근하는 경우에는 스크립트를 그에 맞게 수정해야 합니다.

# Spark 설정

<div class="content-ad"></div>

우리의 PostgreSQL 데이터베이스를 설정한 후, 스파크 작업의 세부 사항을 탐구해 보겠습니다. 목표는 Kafka 주제 rappel_conso에서 데이터를 스트리밍하여 Postgres 테이블 rappel_conso_table로 전송하는 것입니다.

```js
from pyspark.sql import SparkSession
from pyspark.sql.types import (
    StructType,
    StructField,
    StringType,
)
from pyspark.sql.functions import from_json, col
from src.constants import POSTGRES_URL, POSTGRES_PROPERTIES, DB_FIELDS
import logging

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s:%(funcName)s:%(levelname)s:%(message)s"
)

def create_spark_session() -> SparkSession:
    spark = (
        SparkSession.builder.appName("PySpark를 사용한 PostgreSQL 연결")
        .config(
            "spark.jars.packages",
            "org.postgresql:postgresql:42.5.4,org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.0",

        )
        .getOrCreate()
    )

    logging.info("Spark 세션을 성공적으로 생성했습니다.")
    return spark

def create_initial_dataframe(spark_session):
    """
    스트리밍 데이터를 읽고 해당에 맞는 초기 데이터프레임을 생성합니다.
    """
    try:
        # topic random_names에서 스트리밍 데이터를 가져옵니다.
        df = (
            spark_session.readStream.format("kafka")
            .option("kafka.bootstrap.servers", "kafka:9092")
            .option("subscribe", "rappel_conso")
            .option("startingOffsets", "earliest")
            .load()
        )
        logging.info("초기 데이터프레임을 성공적으로 생성했습니다.")
    except Exception as e:
        logging.warning(f"예외로 인해 초기 데이터프레임을 생성할 수 없습니다: {e}")
        raise

    return df

def create_final_dataframe(df):
    """
    초기 데이터프레임을 수정하고 최종 데이터프레임을 만듭니다.
    """
    schema = StructType(
        [StructField(field_name, StringType(), True) for field_name in DB_FIELDS]
    )
    df_out = (
        df.selectExpr("CAST(value AS STRING)")
        .select(from_json(col("value"), schema).alias("data"))
        .select("data.*")
    )
    return df_out

def start_streaming(df_parsed, spark):
    """
    PostgreSQL의 테이블 spark_streaming.rappel_conso로 스트리밍을 시작합니다.
    """
    # PostgreSQL에서 기존 데이터 읽기
    existing_data_df = spark.read.jdbc(
        POSTGRES_URL, "rappel_conso", properties=POSTGRES_PROPERTIES
    )

    unique_column = "reference_fiche"

    logging.info("스트리밍 시작 중...")
    query = df_parsed.writeStream.foreachBatch(
        lambda batch_df, _: (
            batch_df.join(
                existing_data_df, batch_df[unique_column] == existing_data_df[unique_column], "leftanti"
            )
            .write.jdbc(
                POSTGRES_URL, "rappel_conso", "append", properties=POSTGRES_PROPERTIES
            )
        )
    ).trigger(once=True) \
        .start()

    return query.awaitTermination()

def write_to_postgres():
    spark = create_spark_session()
    df = create_initial_dataframe(spark)
    df_final = create_final_dataframe(df)
    start_streaming(df_final, spark=spark)

if __name__ == "__main__":
    write_to_postgres()
```

주요 강점과 스파크 작업의 기능을 살펴보겠습니다:
- 먼저, Spark 세션을 생성합니다.

<div class="content-ad"></div>

```python
def create_spark_session() -> SparkSession:
    spark = (
        SparkSession.builder.appName("PySpark을 사용한 PostgreSQL 연결")
        .config(
            "spark.jars.packages",
            "org.postgresql:postgresql:42.5.4,org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.0",

        )
        .getOrCreate()
    )

    logging.info("스파크 세션을 성공적으로 생성했습니다")
    return spark
```

2. create_initial_dataframe 함수는 Spark의 구조적 스트리밍을 사용하여 Kafka 주제에서 스트리밍 데이터를 수집합니다.

```python
def create_initial_dataframe(spark_session):
    """
    스트리밍 데이터를 읽어 초기 데이터 프레임을 생성합니다.
    """
    try:
        # random_names 주제에서 스트리밍 데이터 가져오기
        df = (
            spark_session.readStream.format("kafka")
            .option("kafka.bootstrap.servers", "kafka:9092")
            .option("subscribe", "rappel_conso")
            .option("startingOffsets", "earliest")
            .load()
        )
        logging.info("초기 데이터 프레임을 성공적으로 생성했습니다")
    except Exception as e:
        logging.warning(f"예외로 인해 초기 데이터 프레임을 생성할 수 없습니다: {e}")
        raise

    return df
```

3. 데이터가 수집되면 create_final_dataframe이 데이터를 변환합니다. 이 함수는 들어오는 JSON 데이터에 DB_FIELDS 열로 정의된 스키마를 적용하여 데이터를 구조화하고 추가 처리를 위해 준비합니다.

<div class="content-ad"></div>

```python
def create_final_dataframe(df):
    """
    초기 데이터프레임을 수정하고 최종 데이터프레임을 생성합니다.
    """
    schema = StructType(
        [StructField(field_name, StringType(), True) for field_name in DB_FIELDS]
    )
    df_out = (
        df.selectExpr("CAST(value AS STRING)")
        .select(from_json(col("value"), schema).alias("data"))
        .select("data.*")
    )
    return df_out
```

4. start_streaming 함수는 데이터베이스에서 기존 데이터를 읽어들이고 들어오는 스트림과 비교하여 새 레코드를 추가합니다.

```python
def start_streaming(df_parsed, spark):
    """
    postgres의 spark_streaming.rappel_conso 테이블로 스트리밍을 시작합니다.
    """
    # PostgreSQL에서 기존 데이터 읽기
    existing_data_df = spark.read.jdbc(
        POSTGRES_URL, "rappel_conso", properties=POSTGRES_PROPERTIES
    )

    unique_column = "reference_fiche"
 
    logging.info("스트리밍 시작 중...")
    query = df_parsed.writeStream.foreachBatch(
        lambda batch_df, _: (
            batch_df.join(
                existing_data_df, batch_df[unique_column] == existing_data_df[unique_column], "leftanti"
            )
            .write.jdbc(
                POSTGRES_URL, "rappel_conso", "append", properties=POSTGRES_PROPERTIES
            )
        )
    ).trigger(once=True) \
        .start()

    return query.awaitTermination()
```

Spark 작업의 전체 코드는 src/spark_pgsql/spark_streaming.py 파일에 있습니다. 다음 섹션에서 설명할대로 Airflow DockerOperator를 사용하여이 작업을 실행할 예정입니다.


<div class="content-ad"></div>

우리 스파크 작업을 실행하기 위해 필요한 Docker 이미지를 생성하는 과정을 살펴봅시다. 아래는 참고용 Dockerfile입니다:

```js
FROM bitnami/spark:latest

WORKDIR /opt/bitnami/spark

RUN pip install py4j

COPY ./src/spark_pgsql/spark_streaming.py ./spark_streaming.py
COPY ./src/constants.py ./src/constants.py

ENV POSTGRES_DOCKER_USER=host.docker.internal
ARG POSTGRES_PASSWORD
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
```

이 Dockerfile에서는 bitnami/spark 이미지를 기반으로 시작합니다. 이는 사용 준비가 된 Spark 이미지입니다. 그런 다음에는 Spark가 Python과 함께 작동할 수 있는 도구인 py4j를 설치합니다.

환경 변수 POSTGRES_DOCKER_USER와 POSTGRES_PASSWORD는 PostgreSQL 데이터베이스에 연결하기 위해 설정됩니다. 우리 데이터베이스가 호스트 머신에 있기 때문에 사용자로 host.docker.internal을 사용합니다. 이를 통해 Docker 컨테이너가 호스트 상의 서비스에 액세스할 수 있도록합니다. PostgreSQL의 비밀번호는 빌드 인자로 전달되므로 이미지에 하드 코딩되지 않습니다.

<div class="content-ad"></div>

프로덕션 환경에서는 데이터베이스 암호를 빌드 시에 전달하는 것이 보안상 취약할 수 있음을 유념해야 합니다. 민감한 정보를 노출시킬 수 있습니다. 이러한 경우에는 Docker BuildKit과 같이 더 안전한 방법을 고려해야 합니다.

이제 Spark용 Docker 이미지를 빌드해 봅시다:

```js
docker build -f spark/Dockerfile -t rappel-conso/spark:latest --build-arg POSTGRES_PASSWORD=$POSTGRES_PASSWORD  .
```

이 명령어는 rappel-conso/spark:latest 이미지를 빌드합니다. 이 이미지에는 Spark 작업을 실행하는 데 필요한 모든 것이 포함되어 있으며, Airflow의 DockerOperator에서 작업을 실행하는 데 사용될 것입니다. 이 명령을 실행할 때 $POSTGRES_PASSWORD를 실제 PostgreSQL 암호로 교체해 주세요.

<div class="content-ad"></div>

# Airflow

앞서 언급한 대로, Apache Airflow는 데이터 파이프라인에서 조정 도구로 작용합니다. 작업의 일정을 관리하고 워크플로를 관리하여 지정된 순서로 실행되고 정의된 조건하에서 실행되도록합니다. 우리 시스템에서 Airflow는 Kafka를 통한 스트리밍 데이터의 처리부터 Spark 처리를 자동화하는 데 사용됩니다.

## Airflow DAG

Airflow에서 작업의 시퀀스와 종속성을 개요로 설명하는 Directed Acyclic Graph (DAG)를 살펴보겠습니다. 이를 통해 Airflow가 작업의 실행을 관리할 수 있습니다.

<div class="content-ad"></div>

```python
start_date = datetime.today() - timedelta(days=1)

default_args = {
    "owner": "airflow",
    "start_date": start_date,
    "retries": 1,  # 작업이 실패하기 전 재시도 횟수
    "retry_delay": timedelta(seconds=5),
}

with DAG(
    dag_id="kafka_spark_dag",
    default_args=default_args,
    schedule_interval=timedelta(days=1),
    catchup=False,
) as dag:

    kafka_stream_task = PythonOperator(
        task_id="kafka_data_stream",
        python_callable=stream,
        dag=dag,
    )

    spark_stream_task = DockerOperator(
        task_id="pyspark_consumer",
        image="rappel-conso/spark:latest",
        api_version="auto",
        auto_remove=True,
        command="./bin/spark-submit --master local[*] --packages org.postgresql:postgresql:42.5.4,org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.0 ./spark_streaming.py",
        docker_url='tcp://docker-proxy:2375',
        environment={'SPARK_LOCAL_HOSTNAME': 'localhost'},
        network_mode="airflow-kafka",
        dag=dag,
    )

    kafka_stream_task >> spark_stream_task
```

위 설정에서 주요 요소들을 살펴보면
- 작업은 매일 실행됩니다.
- 첫 번째 작업은 Kafka 스트림 작업입니다. PythonOperator를 사용하여 구현되었습니다. 이 작업은 RappelConso API에서 데이터를 Kafka 주제로 스트리밍하여 데이터 처리 워크플로우를 시작합니다.
- 다음 작업은 Spark 스트림 작업입니다. DockerOperator를 사용하여 실행됩니다. 우리의 사용자 정의 Spark 이미지가 담긴 Docker 컨테이너를 실행하며, Kafka로부터 수신한 데이터를 처리하는 역할을 맡습니다.
- 작업은 순차적으로 구성되어 있으며, Kafka 스트리밍 작업이 Spark 처리 작업보다 우선하여 데이터가 먼저 Kafka에 스트리밍 및 로드된 후 Spark에서 처리되도록합니다.

## DockerOperator에 대해


<div class="content-ad"></div>

도커 오퍼레이터를 사용하면 작업에 해당하는 도커 컨테이너를 실행할 수 있습니다. 이 방식의 주요 장점은 패키지 관리가 더 쉽고, 더 나은 격리 및 향상된 테스트 용이성입니다. 스파크 스트리밍 작업에서 이 오퍼레이터의 사용법을 알려드리겠습니다.

스파크 스트리밍 작업용 도커 오퍼레이터에 관한 중요한 세부 정보는 다음과 같습니다:

- Spark 설정 섹션에서 지정된 rappel-conso/spark:latest 이미지를 사용할 것입니다.
- 명령은 컨테이너 내부에서 Spark submit 명령을 실행하고, 마스터를 local로 지정하며 PostgreSQL 및 Kafka 통합을 위해 필요한 패키지를 포함하고, Spark 작업을 위한 로직을 담은 spark_streaming.py 스크립트를 가리킵니다.
- docker_url은 도커 데몬을 실행하는 호스트의 url을 나타냅니다. 자연스러운 해결책은 unix://var/run/docker.sock로 설정하고, airflow 도커 컨테이너에 var/run/docker.sock를 마운트하는 것입니다. 이 접근 방식으로 발생한 문제 중 하나는 airflow 컨테이너 내에서 소켓 파일을 사용할 수 없는 권한 오류였습니다. 일반적인 해결책으로는 chmod 777 var/run/docker.sock을 사용하여 권한을 변경하는 것이지만, 이는 상당한 보안 위험을 가지고 있습니다. 이를 우회하려고 bobrik/socat을 사용한 더 안전한 솔루션을 구현했습니다. Docker Compose 서비스에 정의된 이 프록시는 TCP 포트 2375에서 수신하고 해당 요청을 도커 소켓으로 전달합니다:

```js
  docker-proxy:
    image: bobrik/socat
    command: "TCP4-LISTEN:2375,fork,reuseaddr UNIX-CONNECT:/var/run/docker.sock"
    ports:
      - "2376:2375"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - airflow-kafka
```

<div class="content-ad"></div>

DockerOperator에서 호스트 도커의 /var/run/docker.sock에는 여기와 여기에 설명된대로 tcp://docker-proxy:2375 URL을 통해 액세스할 수 있습니다.

- 마지막으로 우리는 네트워크 모드를 airflow-kafka로 설정합니다. 이렇게 하면 프록시와 카프카가 실행되는 도커와 동일한 네트워크를 사용할 수 있습니다. spark 작업이 카프카 토픽에서 데이터를 소비하기 때문에 두 컨테이너가 통신할 수 있도록 해야 합니다.

DAG의 로직을 정의한 후에 이제 docker-compose-airflow.yaml 파일에서 airflow 서비스 구성을 이해해 봅시다.

## Airflow Configuration

<div class="content-ad"></div>

The compose file for airflow was adapted from the official Apache Airflow Docker Compose file. You can check out the original file by visiting this [link](link). 

As mentioned in this article, the proposed version of Airflow is quite resource-intensive because it uses the CeleryExecutor, which is more suitable for distributed and large-scale data processing tasks. Since we have a small workload, using a single-noded LocalExecutor is sufficient.

Here's a summary of the changes we made to the Docker Compose configuration for Airflow:

- We set the environment variable AIRFLOW__CORE__EXECUTOR to LocalExecutor.
- We removed the services airflow-worker and flower as they are only necessary for the Celery executor. We also removed the Redis caching service since it acts as a backend for Celery. Additionally, we won't utilize the airflow-triggerer, so we removed it as well.
- For the remaining services, mainly the scheduler and the webserver, we replaced the base image $'AIRFLOW_IMAGE_NAME:-apache/airflow:2.7.3' with a custom image that we will build when running the Docker Compose.

<div class="content-ad"></div>

```yaml
버전: '3.8'
x-airflow-common:
  &airflow-common
  build:
    context: .
    dockerfile: ./airflow_resources/Dockerfile
  image: de-project/airflow:latest
```

- Airflow가 필요로 하는 필요한 볼륨을 마운트했습니다. AIRFLOW_PROJ_DIR은 나중에 정의할 Airflow 프로젝트 디렉토리를 가리킵니다. 또한 캐프카 부트스트랩 서버와 통신할 수 있도록 airflow-kafka 네트워크를 설정했습니다.

```yaml
볼륨:
  - ${AIRFLOW_PROJ_DIR:-.}/dags:/opt/airflow/dags
  - ${AIRFLOW_PROJ_DIR:-.}/logs:/opt/airflow/logs
  - ${AIRFLOW_PROJ_DIR:-.}/config:/opt/airflow/config
  - ./src:/opt/airflow/dags/src
  - ./data/last_processed.json:/opt/airflow/data/last_processed.json
사용자: "${AIRFLOW_UID:-50000}:0"
네트워크:
  - airflow-kafka
```

다음으로 docker-compose에서 사용될 환경 변수들을 만들어야 합니다.

<div class="content-ad"></div>

```bash
echo -e "AIRFLOW_UID=$(id -u)\nAIRFLOW_PROJ_DIR=\"./airflow_resources\"" > .env
```

여기서 AIRFLOW_UID은 Airflow 컨테이너에서의 사용자 ID를 나타내며, AIRFLOW_PROJ_DIR은 Airflow 프로젝트 디렉토리를 나타냅니다.

이제 모든 준비가 끝났습니다. Airflow 서비스를 실행하려면 다음 명령어를 사용하면 됩니다:

```bash
docker-compose -f docker-compose-airflow.yaml up
```

<div class="content-ad"></div>

에어플로우 사용자 인터페이스에 액세스하려면 다음 URL을 방문해주세요 http://localhost:8080 .

![이미지](/assets/img/2024-07-06-End-to-EndDataEngineeringSystemonRealDatawithKafkaSparkAirflowPostgresandDocker_3.png)

기본적으로 사용자 이름과 비밀번호는 둘 다 airflow입니다. 로그인 후, 에어플로우와 함께 제공되는 DAG 목록이 표시됩니다. 프로젝트 kafka_spark_dag의 dag를 찾아 클릭해주세요.

![이미지](/assets/img/2024-07-06-End-to-EndDataEngineeringSystemonRealDatawithKafkaSparkAirflowPostgresandDocker_4.png)

<div class="content-ad"></div>

DAG: kafka_spark_dag 옆에 있는 버튼을 클릭하여 작업을 시작할 수 있습니다.

다음으로, 그래프 탭에서 작업 상태를 확인할 수 있습니다. 작업이 완료되면 초록색으로 변합니다. 그래서 모든 작업이 완료되면 아래처럼 보일 것입니다:

![Image](/assets/img/2024-07-06-End-to-EndDataEngineeringSystemonRealDatawithKafkaSparkAirflowPostgresandDocker_5.png)

rappel_conso_table이 데이터로 채워져 있는지 확인하려면 pgAdmin Query Tool에서 다음 SQL 쿼리를 사용하십시오:

<div class="content-ad"></div>

```sql
SELECT count(*) FROM rappel_conso_table
```

2024년 1월에 이 쿼리를 실행했을 때, 총 10022개의 행이 반환되었습니다. 여러분도 이 정도의 결과가 나와야 합니다.

# 결론

본문은 Kafka, Airflow, Spark, PostgreSQL, 그리고 Docker를 사용하여 기본적이면서도 실용적인 데이터 엔지니어링 파이프라인을 구축하는 과정을 성공적으로 보여주었습니다. 데이터 엔지니어링 분야에 입문한 초보자와 초심자들을 대상으로 핵심 개념을 이해하고 구현하는 데에 실용적인 지침을 제공했습니다.

<div class="content-ad"></div>

이 가이드에서는 데이터 스트리밍을 위해 Kafka를 설정하고 작업 조작을 위해 Airflow를 사용하는 것에서부터 Spark를 사용한 데이터 처리와 PostgreSQL에 데이터를 저장하는 것까지 세부적으로 다루었습니다. 이 프로젝트 전반에 걸쳐 Docker의 사용은 설정을 단순화하고 다양한 환경 사이의 일관성을 보장합니다.

학습과 소규모 프로젝트에 이 설정을 사용하는 것은 이상적이지만, 실제 운영 환경에 확장하기 위해서는 추가적인 고려 사항이 필요할 수 있습니다. 특히 보안 및 성능 최적화 측면에서 추가적인 작업이 필요할 수 있습니다. 미래에는 더 고급 데이터 처리 기술을 통합하거나 실시간 분석을 탐구하거나 더 복잡한 데이터 원본을 통합할 수 있는 파이프라인을 확장할 수도 있습니다.

본질적으로 이 프로젝트는 데이터 엔지니어링에 입문하려는 사람들에게 실용적인 시작점을 제공합니다. 기초를 이해하는 데 기초를 마련하며 해당 분야에서의 더 깊은 탐구를 위한 튼튼한 기반이 마련됩니다.

다음 부분에서는 PostgreSQL 데이터베이스에 저장된 데이터를 효과적으로 활용하는 방법을 살펴볼 것입니다. 우리는 대형 언어 모델(Large Language Models, LLMs)로 구동되는 에이전트와 자연어 질의를 사용하여 데이터베이스와 상호 작용할 수 있는 다양한 도구들을 소개할 것입니다. 그러니 많은 관심 부탁드립니다!

<div class="content-ad"></div>

# 연락하기

- LinkedIn : [햄자 가르비](https://www.linkedin.com/in/hamza-gharbi-043045151/)
- Twitter : [햄자 가르비](https://twitter.com/HamzaGh25079790)