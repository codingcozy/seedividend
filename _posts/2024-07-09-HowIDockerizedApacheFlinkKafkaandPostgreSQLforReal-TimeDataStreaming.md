---
title: "실시간 데이터 스트리밍을 위한 Apache Flink, Kafka, PostgreSQL Dockerize 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_0.png"
date: 2024-07-09 11:00
ogImage: 
  url: /assets/img/2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_0.png
tag: Tech
originalTitle: "How I Dockerized Apache Flink, Kafka, and PostgreSQL for Real-Time Data Streaming"
link: "https://medium.com/towards-data-science/how-i-dockerized-apache-flink-kafka-and-postgresql-for-real-time-data-streaming-c4ce38598336"
---


## 파이플링크, 카프카, 포스트그레SQL을 Docker를 활용해 통합하기

![이미지](/assets/img/2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_0.png)

# 이 글을 읽는 이유?

- 현실 세계의 통찰: 저의 통합 장벽을 극복하는 개인 여정에서 실용적인 팁을 얻어보세요.
- 완전한 설정: Docker-Compose를 사용하여 Flink, Kafka, PostgreSQL을 원활하게 통합하는 방법을 배워보세요.
- 단계별 가이드:  데이터 스트리밍 스택을 최적화하려는 초보자와 경험이 풍부한 개발자 모두에게 완벽한 가이드입니다.

<div class="content-ad"></div>

# 씬 구성 

Apache Flink을 Kafka와 PostgreSQL과 Docker를 통합하는 작업을 시작했습니다. 이 노력을 더욱 흥미롭게 만드는 것은 Flink의 파이썬 버전인 pyFlink를 사용하는 것입니다. pyFlink는 강력하면서도 상대적으로 드물기 때문에 특히 흥미롭습니다. 이 설정은 실시간 데이터 처리와 저장을 효율적으로 다루기 위한 목적으로 하는 것입니다. 아래에서는 이 작업을 어떻게 달성했는지, 마주한 어려움들 그리고 어떻게 극복했는지에 대해 설명하겠습니다. 또한 여러분이 이 스트리밍 파이프라인을 만들고 실험할 수 있도록, 단계별 가이드로 마무리하겠습니다.

우리가 만들 인프라는 아래에 시각화되어 있습니다. 외부에는 이전 게시물에서 논의된 것과 유사한 방식으로 IoT 센서 메시지를 시뮬레이션 하는 발행자 모듈이 있습니다. Docker 컨테이너 내부에는 두 개의 Kafka 토픽을 생성할 것입니다. 첫 번째 토픽인 sensors는 실시간으로 IoT 기기에서 들어오는 메시지를 저장할 것입니다. 그런 다음 Flink 애플리케이션은 이 토픽에서 메시지를 소비하여 30°C 이상의 온도를 가진 데이터를 걸러내고, alerts라는 두 번째 토픽에 발행할 것입니다. 게다가 Flink 애플리케이션은 소비된 메시지를 이 목적을 위해 특별히 생성된 PostgreSQL 테이블에 삽입할 것입니다. 이 설정을 통해 센서 데이터를 구조화된 표 형식으로 영구 저장할 수 있으며, 추가적인 변환과 분석 기회를 제공할 것입니다. Tableau 또는 Power BI와 같은 시각화 도구를 이 데이터에 연결하여 실시간 플로팅 및 대시보드를 만들 수 있을 것입니다.

또한, alerts 토픽은 이를 보유하고 있는 다른 클라이언트들에 의해 메시지에 기반한 작업을 개시하기 위해 소비될 수 있습니다. 이는 에어컨 시스템을 활성화하거나 소방 안전 프로토콜을 트리거하는 등의 작업이 가능합니다.

<div class="content-ad"></div>

![2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_1.png](/assets/img/2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_1.png)

위 자습서를 따라가기 위해서는 다음 저장소를 복제할 수 있습니다. 프로젝트의 루트에 docker-compose.yml 파일이 있으므로 멀티 컨테이너 애플리케이션을 초기화할 수 있습니다. 또한 README 파일에서 자세한 지침을 찾을 수 있습니다.

## docker-compose.yml에서 Kafka 포트 문제

처음에는 confluentinc Kafka Docker 이미지를 사용할 때 Kafka의 포트 구성에 관한 문제를 겪었습니다. 이 문제는 로그를 통해 명확히 드러났으며, 초기 설정 및 문제 해결 단계에서 docker-compose up을 백그라운드 모드(-d)로 실행하지 않는 것이 중요하다는 것을 강조했습니다.

<div class="content-ad"></div>

문제의 이유는 내부 및 외부 호스트가 동일한 포트를 사용하여 연결 문제가 발생했기 때문입니다. 내부 포트를 19092로 변경하여 이 문제를 해결했습니다. 이 블로그 포스트는 꽤 명쾌한 것 같아요.

```js
KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:19092,PLAINTEXT_HOST://localhost:9092
```

## 세션 모드에서 Flink 구성하기

Flink를 세션 모드로 실행하려면(단일 클러스터에서 여러 작업 허용), docker-compose.yml에 다음 지시문을 사용하고 있어요.

<div class="content-ad"></div>

## 파이플링크를 위한 커스텀 도커 이미지

기본 Apache Flink 도커 이미지의 한계로 인해 Python 지원이 포함되어 있지 않아서, 저는 pyFlink를 위한 커스텀 도커 이미지를 만들었습니다. 이 커스텀 이미지를 사용하면 Flink가 Python 작업을 실행할 수 있고 Kafka 및 PostgreSQL과의 통합에 필요한 종속성이 포함됩니다. 이 작업에 사용된 Dockerfile은 pyflink 하위 디렉토리에 위치해 있습니다.

- 베이스 이미지: 공식 Flink 이미지로 시작합니다.
- Python 설치: Python과 pip가 설치되며, pip는 최신 버전으로 업그레이드됩니다.
- 종속성 관리: requirements.txt를 통해 종속성이 설치됩니다. 또는 인터넷에 연결되지 않은 환경에서 배포할 때 필요한 종속성을 수동으로 설치하는 방법을 보여주기 위해 라인이 주석 처리되어 있습니다.
- 커넥터 라이브러리: Kafka 및 PostgreSQL에 대한 커넥터가 Flink 라이브러리 디렉토리로 직접 다운로드됩니다. 이를 통해 Flink가 작업 실행 중에 Kafka 및 PostgreSQL과 상호 작용할 수 있습니다.
- 스크립트 복사: 저장소에서 스크립트를 /opt/flink 디렉토리로 복사하여 Flink 태스크 매니저에서 실행할 수 있도록 합니다.

이 커스텀 도커 이미지를 사용하여, 우리는 pyFlink가 카프카와 PostgreSQL과 원활하게 상호 작용하는 데 필요한 라이브러리가 장착된 상태로 도커 컨테이너 내에서 올바르게 실행될 수 있도록 합니다. 이 접근 방식은 유연성을 제공하며 개발 및 프로덕션 환경 모두에 적합합니다.

<div class="content-ad"></div>

**주의**: 배포 환경 정책에 따라 커넥터 및 기타 종속성을 다운로드하는 네트워크 및 보안 고려 사항을 확인하십시오.

## PostgreSQL 통합

아파치 Flink를 PostgreSQL 데이터베이스에 연결하려면 적절한 JDBC 커넥터가 필요합니다. pyFlink용 사용자 지정 Docker 이미지는 PostgreSQL 16과 호환되는 JDBC 커넥터를 다운로드합니다.

이 프로세스를 간소화하기 위해 저장소에는 Flink Docker 컨테이너에서 수행된 작업을 반영하는 download_libs.sh 스크립트가 포함되어 있습니다. 이 스크립트는 필요한 라이브러리를 자동으로 다운로드하여 Docker 및 로컬 환경 간의 일관성을 보장합니다.

<div class="content-ad"></div>

“노트: 커넥터는 일반적으로 두 가지 버전을 가지고 있습니다. 특히 여기서는 Flink 1.18을 사용하고 있는데, 최신 안정 버전으로 3.1.2-1.18을 다운로드했습니다. 첫 번째 버전이 여러 데이터베이스의 JDBC 구현을 추적하는 것으로 보입니다. 이들은 메이븐 디렉토리에서 사용할 수 있습니다.

```js
env.add_jars(
  f"file://{current_dir}/flink-connector-jdbc-3.1.2-1.18.jar",
  f"file://{current_dir}/postgresql-42.7.3.jar"
)
```

JDBC Sink 정의

우리의 Flink 작업에서 usr_jobs/postgres_sink.py 파일에 있는 configure_postgre_sink라는 중요한 함수가 있습니다. 이 함수는 일반적인 PostgreSQL 싱크를 구성하는 역할을 합니다. 이 함수를 효과적으로 사용하기 위해서는 SQL 데이터 조작 언어(DML)문과 해당 값의 유형을 제공해야 합니다. 스트리밍 데이터에서 사용하는 유형은 TYPE_INFO에 정의되어 있습니다... 올바른 선언을 생각해 내는 데 시간이 좀 걸렸어요 😅.”

<div class="content-ad"></div>

JdbcSink은 ExecutionOptions를 정의하는 선택적 매개변수가 있는 것을 알 수 있어요. 이 특정 경우에, 1초의 업데이트 간격과 최대 200개의 행을 제한으로 사용할 거예요. 더 많은 정보는 공식 문서에서 찾아볼 수 있어요. 네, 맞아요. 간격을 정의하고 있으니, 이것은 마이크로 배치 ETL로 간주될 수 있어요. 그러나, Flink의 병렬 처리 덕분에 여러 스트림을 한 번에 처리할 수 있어요. 그리고 이건 동시에 간단한 스크립트로 따라가기 쉬워요.

참고: Postgres에 raw_sensors_data 테이블을 생성하는 걸 잊지 마세요. 이 테이블은 IoT 센서에서 받은 원시 데이터가 저장될 거예요. 이 부분은 아래 섹션의 단계별 안내서에 다루어져 있어요.

## Kafka로 데이터 싱킹

이전 토론에서 Kafka 주제에서 데이터를 소비하는 방법을 다루었어요. 그러나 아직 싱크를 구성하지 않았죠. 이 설정에는 몇 가지 복잡성이 있고, Posgres 싱크와 비슷하게 함수로 정의돼 있어요. 게다가, Kafka로 싱킹하기 전에 데이터 스트림의 유형을 정의해야 해요. alarms_data 스트림은 Kafka로 싱킹하기 전에 output_type=Types.STRING()으로 문자열로 적절하게 캐스팅되어 있어야 해요. 왜냐하면 직렬화 프로그램을 SimpleStringSchema()로 선언했기 때문이죠.

<div class="content-ad"></div>

다음은 알림 주제에서 데이터를 가져오는 방법을 안내해 드리겠습니다.

## 로컬 또는 컨테이너 구성

이 도커 구성의 가장 멋진 점 중 하나는 Flink를 로컬 또는 컨테이너 안에서 관리되는 작업으로 실행할 수 있다는 것입니다. 아래 그림에서 볼 수 있듯이 로컬 Flink 설치는 도커 컨테이너에서 분리된 Flink 애플리케이션을 보여줍니다. 이는 Flink를 문제 해결하는 데 도움이 될 수 있습니다. Flink는 뛰어난 네이티브 관측 도구 모음이 없기 때문입니다. 사실, 우리는 Flink를 모니터링하는 데 매우 유망한 datorios 도구들을 시도해 보고 싶어합니다.

![Flink Docker화 및 실시간 데이터 스트리밍을 위한 Apache Flink, Kafka 및 PostgreSQL 도커화하는 방법](/assets/img/2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_2.png)

<div class="content-ad"></div>

Flink 앱을 로컬에서 시도하고 싶다면 실제로 사용되는 스크립트에서 두 상수를 올바르게 정의해야 합니다. usr_jobs/postgres_sink.py 파일에서 두 상수는 호스트 및 포트를 나타냅니다:

컨테이너 실행 시 사용하세요:

```js
KAFKA_HOST = "kafka:19092"
POSTGRES_HOST = "postgres:5432"
```

로컬 실행 시에는:

<div class="content-ad"></div>

기본적으로 리포지토리는 Flink 애플리케이션을 컨테이너 내에서 실행하도록 설정합니다. 웹 UI를 사용하여 실행 중인 작업을 모니터링할 수 있으며, http://localhost:8081에서 접속할 수 있습니다. 작업을 로컬로 실행하는 경우에는 볼 수 없습니다.

![이미지](/assets/img/2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_3.png)

참고: 작업을 로컬에서 실행하는 경우 requirements.txt에 있는 Flink 종속성을 설치해야 합니다. 또한 poetry를 사용하여 환경을 설정하고 싶다면 pyproject.toml 파일도 제공됩니다.

<div class="content-ad"></div>

# 스트리밍 파이프라인 실행하는 단계별 안내

## 단계 1: 멀티 컨테이너 애플리케이션 시작하기

도커 컴포즈를 실행하여 컨테이너를 시작합니다. 저는 분리 모드 없이 실행하여 컨테이너가 시작되고 실행되는 동안 로그를 확인하기를 선호합니다.

```bash
docker-compose up
```

<div class="content-ad"></div>

로그를 확인하여 서비스가 올바르게 작동하는지 확인해주세요.

## 단계 2: Kafka 토픽 생성

이제 IoT 센서로부터 데이터를 수신하고 Flink 어플리케이션에 의해 필터링된 경고를 저장할 토픽을 생성할 것입니다.

```js
docker-compose exec kafka kafka-topics \
 --create --topic sensors \
 --bootstrap-server localhost:9092 \
 --partitions 1 \
 --replication-factor 1

docker-compose exec kafka kafka-topics \
 --create --topic alerts \
 --bootstrap-server localhost:9092 \
 --partitions 1 \
 --replication-factor 1
```

<div class="content-ad"></div>

다음 명령어를 실행하여 주제가 올바르게 생성되었는지 확인할 수 있습니다.

```shell
docker-compose exec kafka kafka-topics \
--bootstrap-server localhost:9092 \
--list
```

## 단계 3: Postgres 테이블 생성

포스트그레스 콘솔에 로그인하세요.

<div class="content-ad"></div>

```js
psql -h localhost -U flinkuser -d flinkdb
```

포스트그리스 콘솔에 로그인하려면 암호 flinkpassword를 입력하십시오. 이 로컬 구성은 기본 액세스가 도커 컴포즈.yml에서 구성되어 있으므로 기본 로그인 정보를 사용할 수 있습니다. 그런 다음 테이블을 만들어 보세요.

```js
CREATE TABLE raw_sensors_data (
message_id VARCHAR(255) PRIMARY KEY,
sensor_id INT NOT NULL,
message TEXT NOT NULL,
timestamp TIMESTAMPTZ NOT NULL
);
```

아래와 같이 테이블이 올바르게 생성되었는지 확인할 수 있습니다.

<div class="content-ad"></div>

```js
flinkdb=# \d raw_sensors_data
```

위 명령어를 입력하면 다음과 같은 결과가 나타납니다:

![How I Dockerized Apache Flink, Kafka, and PostgreSQL for Real-Time Data Streaming](/assets/img/2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_4.png)

## Step 4: Kafka 프로듀서 실행하기

<div class="content-ad"></div>

콘다 또는 포에트리를 사용하여 로컬 환경을 설정하고 파이썬 카프카 패키지를 설치해주세요:

```shell
pip install kafka-python
```

그런 다음 IoT 센서 메시지를 모방하고 센서 토픽으로 메시지를 발행하는 카프카 프로듀서를 실행해주세요.

```shell
python pyflink/usr_jobs/kafka_producer.py
```

<div class="content-ad"></div>

나머지 튜토리얼은 계속 실행하도록 두세요.

## 단계 5: Flink 작업 초기화하기

우리는 컨테이너 내부에서 Flink 애플리케이션을 실행할 것이기 때문에 localhost:8081을 통해 웹 UI에서 모니터링할 수 있습니다. 리포지토리 루트에서 다음 명령을 실행하세요:

```js
docker-compose exec flink-jobmanager flink run \
  -py /opt/flink/usr_jobs/postgres_sink.py
```

<div class="content-ad"></div>

로그를 확인하면 추가적으로 알림이 flink-jobmanager 컨테이너 로그에도 표시됩니다. 또한 Flink 웹 UI(http://localhost:8081/#/job/running)에서 작업이 실행 중인지 확인할 수도 있습니다.

![이미지](/assets/img/2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_5.png)

검사 결과, Flink 작업을 통해 메시지가 전달되지 않았다고 나오지만 실제로는 그렇지 않습니다. 도커 로그에 알림이 표시되고 있습니다.

![이미지](/assets/img/2024-07-09-HowIDockerizedApacheFlinkKafkaandPostgreSQLforReal-TimeDataStreaming_6.png)

<div class="content-ad"></div>

우리는 이 목적을 위해 만들어진 Postgres 테이블을 사용하여 메시지를 확인할 것입니다.

## 단계 6: Kafka 토픽에서 알림 읽기

알림 토픽의 데이터를 읽으려면 다음 명령을 실행할 수 있습니다:

```js
docker-compose exec kafka kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic alerts \
  --from-beginning
```

<div class="content-ad"></div>

그럼 이제까지 해당 주제가 받은 모든 메시지를 가져올 거에요.

## 7단계: Postgres 테이블에서 raw 데이터 읽기

또한 IoT 센서에서 메시지를 쿼리하고 PostgreSQL에서 JSON 데이터를 파싱할 수도 있어요:

```js
SELECT
  *,
  (message::json->>'temperature')::numeric as temperature
FROM raw_sensors_data
LIMIT 10;
```

<div class="content-ad"></div>

## 단계 8: 서비스 중지

도커 터미널에서 ctrl-c를 눌러 모든 작업을 쉽게 중지할 수 있습니다. 만약 적절한 종료를 원한다면 다음 단계를 따라 진행하세요:

- 웹 UI의 작업 세부 정보 우측 상단에서 클릭하여 Flink 작업을 취소합니다.
- 로컬에서 실행 중이던 kafka_producer.py 스크립트를 중지합니다.
- 서비스를 중지하려면 도커 터미널에서 ctrl-c를 누릅니다.

서비스가 실행 중일 때 교환된 정보는 영구적으로 저장됩니다. 따라서 포스트그레스 테이블이나 카프카 토픽을 쿼리하고 싶은 경우 데이터가 여전히 유지됩니다.

<div class="content-ad"></div>

# PyFlink 작업에서 여러 개의 싱크 사용에 대한 통찰

데모용으로 사용된 Flink 작업에서, 동일한 작업에서 2개의 데이터 스트림을 동시에 처리하고 있습니다. 센서 주제(IoT 장치)에서 오는 원시 데이터를 쓰는 것과 다른 주제로 설정된 필터링된 경고를 쓰는 것입니다. 이에는 몇 가지 장단점이 있습니다. 간단히 요약하면 다음과 같습니다:

여러 개의 싱크가 있는 단일 작업의 장점:

- 자원 관리의 간단함.

<div class="content-ad"></div>

- 데이터 흐름의 일관성 유지

단일 작업의 단점:

- 논리가 커질수록 복잡해질 수 있습니다.

- 확장성이 문제가 될 수 있습니다.

<div class="content-ad"></div>

다중 작업의 장점:

- 더 나은 결함 분리.

- 집중된 최적화.

다중 작업의 단점:

<div class="content-ad"></div>

- 자원 소모가 많습니다.

- 협조 복잡성입니다.

# 결론

본 설정은 Flink, Kafka 및 PostgreSQL을 효과적으로 통합하여 실시간 데이터 스트리밍 및 처리에 견고한 해결책을 제공합니다. Postgres를 루프 내에서 사용하는 주요 목적은 IoT 기기에서 오는 원시 메시지를 주제 자체의 쿼리에 의존하지 않고 확인하는 것입니다. 또한 JDBC 커넥터를 사용하여 데이터를 싱크하는 방법을 보여주는 데 도움이 되었습니다. 메시지 변환은 DataStream API를 사용하여 수행되었습니다. SQL API를 더 심층적으로 알아보고자 하며, 더 사용하기 쉬운 인터페이스를 도입합니다. 마지막으로, 데이터 스트림을 관리하는 방법에 대해 언급하자면, 특정 요구 사항에 따라 확장성과 유지 관리 가능성을 보장하도록 단일 또는 다중 작업 중 선택하십시오.

<div class="content-ad"></div>

# 다음 단계

1. SQL API를 사용하여 변환 작업을 수행합니다.

2. 작업 복잡성에 따라 리소스 사용량을 최적화합니다.

3. 복잡한 데이터 처리 작업을 위해 고급 Flink 기능을 탐색해보세요.

<div class="content-ad"></div>

즐거운 스트리밍하세요! 🚀

도커를 활용하여 데이터 엔지니어링 솔루션을 통합하고 확장하는 방법에 관한 더 많은 자습서를 기다려주세요!

댓글로 질문이나 제안이 있으면 언제든지 망설이지 마세요!

# 스트리밍 데이터 애플리케이션을 최적화할 준비가 되셨나요?

<div class="content-ad"></div>

데이터를 완전히 활용할 수 있는 전문 컨설팅 서비스를 소개합니다. 이 서비스는 스트리밍 데이터 애플리케이션을 위해 맞춤화되어 있어요. 실시간 분석을 강화하거나 데이터 파이프라인을 최적화하고자 한다면, 또는 성능을 향상시키고 싶다면, 우리가 도와드리겠습니다.

**참고 자료**

- [Kafka client cannot connect to broker on AWS on Docker, etc.](https://www.confluent.io/blog/kafka-client-cannot-connect-to-broker-on-aws-on-docker-etc/)
- [mvnrepository.com](https://mvnrepository.com/)

<div class="content-ad"></div>

**아파치 Flink JDBC 커넥터 문서**  
https://nightlies.apache.org/flink/flink-docs-master/docs/connectors/datastream/jdbc/

**아파치 Flink 배포: 세션 모드 개요**  
https://nightlies.apache.org/flink/flink-docs-master/docs/deployment/overview/#session-mode

**독립형 도커 환경에서 Flink Python 사용하기**  
https://nightlies.apache.org/flink/flink-docs-master/docs/deployment/resource-providers/standalone/docker/#using-flink-python-on-docker

**Flink 도커 환경 및 Kafka 설정**  
https://medium.com/@sant1/flink-docker-kafka-faee9c0f1580