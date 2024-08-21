---
title: "무료로 Spark 클러스터 만드는 5분 가이드 단계별로 쉽게 따라하기"
description: ""
coverImage: "/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_0.png"
date: 2024-07-06 03:22
ogImage:
  url: /assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "5 minutes to create your own Spark Cluster for free: A Step-by-Step Guide"
link: "https://medium.com/@bricefotzo/5-minutes-to-create-your-own-spark-cluster-a-step-by-step-guide-31afe5f84641"
isUpdated: true
---

/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_0.png

데이터 애플리케이션을 개발하거나 Spark 작업을 테스트하거나 Spark를 배우고 있다면, 도커를 사용하여 로컬 클러스터를 설정하면 개발 프로세스가 간소화되고 오버헤드가 줄어듭니다. 이 튜토리얼은 도커를 사용하여 로컬 Spark 클러스터를 생성하는 단계를 안내합니다. 이를 통해 다음과 같은 일들이 가능해집니다:

- 로컬에서 개발하고 테스트: 완전한 규모의 클러스터를 필요로 하지 않고 로컬 머신에서 Spark 작업을 실행하고 테스트할 수 있어, 개발 및 예비 테스트에 적합합니다.
- 프로덕션 환경 시뮬레이션: 로컬 클러스터를 프로덕션 설정과 동일하게 구성하여 개발과 배포 간 일관성을 보장합니다.
- 학습과 실험: 새로운 학습자들이 기능적인 Spark 환경을 구성하고 그 기능을 실험하며 리소스나 설정을 많이 필요로 하지 않고 개발을 연습하는 접근 가능한 방법을 제공합니다.

도커 볼륨을 사용하여 데이터와 설정이 다시 시작할 때 유지되도록 하여 로컬 클러스터가 지속적인 개발과 테스트에 견고한 도구가 되도록 할 것입니다. 시작해보고 도커가 Spark를 이용하는 것을 더 쉽고 효율적으로 만들어주는지 보겠습니다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 준비 사항

로컬 Spark 클러스터를 Docker를 사용하여 설정하기 전에 다음 사항을 확인해주세요 :

- Docker: 컴퓨터에 Docker가 설치되어 있어야 합니다. Docker는 Docker의 공식 사이트에서 다운로드할 수 있습니다.
- Docker와 Spark에 대한 기본 지식: Docker 명령에 익숙하고 Apache Spark의 기본적인 이해가 있다면, 이 튜토리얼을 더욱 효과적으로 따라갈 수 있을 것입니다. 필요하다면 명령어를 실행해 보는 것만으로도 충분합니다.

# 환경 설정하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 도커 네트워크 생성하기

컨테이너간 통신을 가능하게 하기 위해 도커 네트워크를 설정해보겠습니다. 이 네트워크를 통해 Spark 마스터와 워커 컨테이너가 원활하게 통신할 수 있습니다. 터미널을 열고 새로운 도커 네트워크를 생성해보세요:

```bash
docker network create spark-network
```

![Docker Network](/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_1.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 명령은 Spark 컨테이너를 연결하는 데 사용할 spark-network라는 네트워크를 생성합니다.

## Docker 볼륨 생성

이제 노드간에 입력 데이터를 지속적으로 공유하기 위해 Docker 볼륨을 생성할 것입니다. 이 볼륨을 사용하면 컨테이너가 다시 시작되어도 입력 데이터가 유지됩니다. 출력 결과물은 로컬에 저장하기 위해 볼륨을 사용할 것이며 입력 데이터와는 다른 방식으로 저장될 것입니다.

Spark 입력 데이터를 위한 볼륨을 생성하세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
docker volume create spark-inputs
```

![Creating the Spark Cluster](/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_2.png)

# Spark 클러스터 생성

## Spark 마스터 설정하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

먼저, Docker 컨테이너를 사용하여 Spark 마스터 노드를 설정해보겠습니다. 이 마스터 노드는 워커 노드를 관리하고 작업을 분산시킵니다.

## 루트가 아닌 컨테이너를 사용하는 이유는?

루트가 아닌 컨테이너 이미지를 사용하면 보안에 추가적인 층이 더해지며 일반적으로 프로덕션 환경에서 권장됩니다. 그러나 루트가 아닌 사용자로 실행되기 때문에 특권 작업에 대해서는 일반적으로 접근이 제한됩니다.

## 구성

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

환경 변수 설정

- SPARK_MODE: 실행할 Spark 클러스터 모드 (master 또는 worker로 지정할 수 있습니다).
- SPARK_MASTER_URL: worker가 마스터를 찾을 수 있는 URL. worker로 설정한 경우에만 필요합니다.

Spark 도커 이미지 빌드하기

다음 내용을 포함하는 Dockerfile이라는 새 파일을 만듭니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# bitnami Spark 이미지를 사용하면 필요한 Spark 구성 요소가 사전 구성되어 있습니다

FROM bitnami/spark:latest

# 애플리케이션을 실행할 사용자를 추가합니다

RUN useradd -ms /bin/bash spark

# 데이터 및 작업을 위한 디렉터리를 생성합니다

RUN mkdir -p /data/inputs /data/outputs /jobs

# 디렉터리 소유권을 spark 사용자로 설정합니다

RUN chown -R spark:spark /opt/bitnami/spark /data /jobs

# 애플리케이션을 실행할 사용자를 설정합니다

USER spark

애플리케이션이 루트 사용자가 아닌 다른 사용자로 실행되도록 하기 위해 새로운 사용자인 spark를 생성하고 설정합니다.

다음 명령을 실행하여 spark 사용자 지정 Docker 이미지를 만듭니다:

docker build -t custom-spark .

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래 명령어는 스파크 마스터 컨테이너를 실행하고, 데이터 영속성을 위해 spark-inputs 볼륨을 연결합니다:

```js
docker run -d \
  --name spark-master \
  --hostname spark-master \
  --network spark-network \
  -p 8080:8080 \
  -p 7077:7077 \
  -v spark-inputs:/data/inputs \
  -v ./data/outputs:/data/outputs \
  -v ./jobs:/jobs \
  -e SPARK_MODE=master \
  custom-spark
```

이 명령은 Spark 마스터 컨테이너를 실행하며, 필요한 포트를 매핑하고 데이터 저장을 위해 spark-inputs 볼륨에 연결합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

컨테이너 상태를 확인하세요:

```js
docker ps
```

![이미지](/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_4.png)

볼륨에 대해 알아보기:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- spark-inputs: Spark 작업의 입력 데이터를 저장하는 데 사용됩니다. 이 볼륨은 마스터 노드와 워커 노드 사이에서 공유됩니다.
- data/outputs: Spark 작업의 결과 출력을 저장하는 데 사용됩니다. 이 볼륨은 결과를 호스트 머신에 저장하여 쉽게 액세스할 수 있도록 로컬로 마운트됩니다.
- jobs: 클러스터에서 실행하려는 PySpark 스크립트를 저장하는 데 사용됩니다. 이 볼륨은 로컬로 마운트되어 호스트 머신에서 스크립트를 편집하고 관리할 수 있습니다.

아래는 명령에 대한 설명입니다:

```js
--name spark-master: 컨테이너에 spark-master라는 이름을 할당합니다.
--hostname spark-master: 컨테이너의 호스트 이름을 spark-master로 설정합니다.
--network spark-network: 컨테이너를 spark-network에 연결합니다.
-p 8080:8080: 호스트의 포트 8080을 Spark 마스터 웹 UI의 포트 8080으로 매핑합니다.
-p 7077:7077: 호스트의 포트 7077을 Spark 마스터 서비스의 포트 7077로 매핑합니다.
-v spark-inputs:/data/inputs:ro: 데이터 지속성을 위해 spark-inputs 볼륨을 컨테이너에 연결합니다.
-v ./data/outputs:/data/outputs: 출력 저장을 위해 데이터/outputs 디렉토리를 컨테이너에 연결합니다.
-v ./jobs:/jobs: 작업 저장을 위해 jobs 디렉토리를 컨테이너에 연결합니다.
-e SPARK_MODE=master: 노드가 마스터인지 워커인지를 정의하는 Bitnami 환경 변수입니다. 컨테이너를 마스터 모드로 실행합니다.
custom-spark: 컨테이너에 사용할 사용자 지정 Spark 이미지를 지정합니다.
```

## Spark 워커 노드 추가하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

메인 서버가 가동되면 워커 노드를 연결할 수 있습니다. 스파크 워커 컨테이너를 시작해보세요:

docker run -d \
 --name spark-worker-1 \
 --hostname spark-worker-1 \
 --network spark-network \
 -e SPARK_MASTER=spark://spark-master:7077 \
 -e SPARK_MODE=worker \
 -v spark-inputs:/data/inputs \
 -v ./data/outputs:/data/outputs \
 -v ./jobs:/jobs \
 custom-spark

이 명령은 스파크 워커 컨테이너를 실행하여 spark-network에 연결하고 입력 데이터를 영속화하기 위해 spark-inputs 볼륨을 부착합니다.

컨테이너 상태를 확인하세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

위에서 보는 것처럼, spark-worker-1 컨테이너가 spark-master 컨테이너와 함께 실행되고 있습니다.

## Spark 작업 실행하기

- 폴더 구조를 준비하세요

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래 명령어를 사용하여 입력, 출력 및 작업 스크립트를 저장할 디렉토리를 생성해 주세요:

```bash
mkdir -p ./data/inputs ./data/outputs ./jobs
```

- 스크립트 생성

간단한 PySpark 스크립트를 만들어보겠습니다. 이 스크립트는 Iris 데이터셋을 읽고 기본 데이터 조작을 수행한 뒤 결과를 spark-data 볼륨에 다시 저장합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래와 같이 내용이 포함된 spark_job.py라는 새 파일을 생성해보세요:

```js
from pyspark.sql import SparkSession
# 스파크 세션 초기화
spark = SparkSession.builder.appName("IrisDataProcessing").getOrCreate()
# 데이터셋 읽기
df = spark.read.csv("/data/inputs/iris.csv", inferSchema=True, header=False)
# 컬럼 이름 변경
columns = ["sepal_length", "sepal_width", "petal_length", "petal_width", "species"]
df = df.toDF(*columns)
# 기본 데이터 조작 수행: 품종별 꽃 받침 길이 평균 계산
avg_sepal_length = df.groupBy("species").avg("sepal_length")
# 결과를 도커 볼륨에 다시 쓰기
avg_sepal_length.write.csv("/data/outputs/avg_sepal_length_by_species")
# 스파크 세션 종료
spark.stop()
```

- 데이터 획득

UCI 기계 학습 리포지토리 또는 원하시는 다른 출처에서 Iris 데이터셋을 다운로드해보세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
wget https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data -O data/inputs/iris.csv
```

![Image](/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_6.png)

- 클러스터에 데이터와 스크립트 복사하기

입력 데이터: Iris 데이터셋을 Spark 마스터 컨테이너로 복사합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

위에 제시된 명령어를 실행하면 아래와 같은 출력이 나타납니다:

![Spark cluster creation guide](https://www.travelblog.com/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_7.png)

PySpark 스크립트 : 마스터 컨테이너로 스크립트를 복사할 필요가 없습니다. 이미 마스터 컨테이너에 연결된 jobs 폴더로 이동하기만 하면 됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```python
cp spark_job.py .jobs/spark_job.py
```

데이터 접근성 확인 데이터 접근이 가능한지 확인하려면 Spark 마스터 컨테이너에서 인터랙티브 세션을 시작할 수 있습니다:

```python
docker exec -it spark-master ls /data/inputs /jobs
```

컨테이너 내에서 /data/inputs 및 /jobs 디렉토리의 내용을 나열하여 데이터 세트가 있는지 확인합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래 결과를 보셔야 합니다:

`/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_8.png`

## 작업 실행

스파크 마스터 컨테이너를 사용하여 스크립트를 실행하세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```shell
docker exec -it spark-master spark-submit \
  --master spark://spark-master:7077 \
  --deploy-mode client /jobs/spark_job.py
```

이 명령은 Spark 클러스터에서 PySpark 스크립트를 실행하여 볼륨에서 데이터 세트를 읽고 처리한 후 결과를 다시 볼륨에 쓰게 됩니다.

결과는 다음과 같이 나올 것입니다:

![2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_9](/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_9.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

작업이 완료되면 결과를 확인할 수 있습니다:

```js
docker exec -it spark-master ls /data/outputs/avg_sepal_length_by_species
```

avg_sepal_length_by_species 디렉토리에 출력 파일이 표시됩니다.

![이미지](/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_10.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

스파크 작업 결과가 포함된 출력 파일은 각 종에 따른 평균 꽃받침 길이를 보여줍니다. 결과를 확인하려면 출력 파일 내용을 표시할 수 있습니다:

```js
docker exec -it spark-master cat /data/outputs/avg_sepal_length_by_species/part-00000-9b270837-872e-4a34-bb5b-4cb6d52044be-c000.csv
```

# 추가 Worker 노드

클러스터에 더 많은 Worker 노드를 추가하려면 추가 컨테이너를 실행하고 이를 Spark 마스터 노드에 연결하면 됩니다. 이를 위해 Worker 노드를 클러스터에 추가하는 프로세스를 자동화하는 스크립트를 사용해보겠습니다. 추가할 노드의 수를 지정할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
#!/bin/bash
# 추가할 워커 노드 수
NUM_WORKERS=$1
# 워커 노드 시작
for i in $(seq 1 $NUM_WORKERS)
do
  docker run -d \
    --name spark-worker-$i \
    --hostname spark-worker-$i \
    --network spark-network \
    -e SPARK_MASTER=spark://spark-master:7077 \
    -e SPARK_MODE=worker \
    -v spark-inputs:/data/inputs \
    -v ./data/outputs:/data/outputs \
    -v ./jobs:/jobs \
    custom-spark
done
```

이 스크립트를 add_workers.sh로 저장하고 실행 가능하게 만듭니다.

```bash
chmod +x add_workers.sh
```

클러스터에 추가적인 워커 노드를 추가하기 위해 스크립트를 실행하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
./add_workers.sh 2
```

이 명령은 스파크 마스터 노드에 연결하여 클러스터에 두 개의 워커 노드를 추가합니다.

# 팁과 트릭

- spark-submit 명령에 별칭 지정하기: Spark 작업을 간단히 실행하려면 spark-submit 명령에 대한 별칭을 만들 수 있습니다. 예를 들어 다음 줄을 .bashrc 또는 .bash_profile 파일에 추가할 수 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
alias spark-submit='docker exec -it spark-master spark-submit --master spark://spark-master:7077 --deploy-mode client'
```

클러스터가 가동 중에 있다면, 아래 명령어를 실행해보세요:

```bash
spark-submit /jobs/spark_job.py
```

이렇게 하면 매번 마스터 URL을 지정하지 않고도 클러스터에서 Spark 작업을 실행할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 정리하기

컨테이너를 중지하고 삭제하려면 다음 명령어를 사용할 수 있어요:

```js
docker stop spark-master spark-worker-1 spark-worker-2
docker rm spark-master spark-worker-1 spark-worker-2
```

도커 네트워크와 볼륨을 제거하려면 다음 명령어를 사용할 수 있어요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
도커 네트워크 삭제 spark-network
도커 볼륨 삭제 spark-inputs
```

모든 것이 잘 작동하고 있지만, 클러스터를 확장하는 데 최상의 방법은 아닙니다. 도컴포즈를 사용하여 더 나은 방법을 공유하겠습니다.

이 방법은 상당히 수동적이며 클러스터를 확장하기에 최상의 방법은 아닙니다. 로컬 개발용으로는 도컴포즈를 사용하는 것이 더 나은 옵션입니다.

# 도커-컴포즈 사용하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

도커 컴포즈는 멀티 컨테이너 도커 애플리케이션을 정의하고 실행하는 도구입니다. YAML 파일을 사용하여 애플리케이션의 서비스, 네트워크 및 볼륨을 구성하므로 애플리케이션을 더 쉽게 관리하고 확장할 수 있습니다.

다음 내용을 포함하여 docker-compose.yml이라는 새 파일을 만드십시오.

```js
services:
  spark-master:
    image: custom-spark
    container_name: spark-master
    hostname: spark-master
    networks:
      - spark-network
    ports:
      - "8080:8080"
      - "7077:7077"
    volumes:
      - spark-inputs:/data/inputs
      - ./data/outputs:/data/outputs
      - ./jobs:/jobs
    environment:
      - SPARK_MODE=master
  spark-worker:
    image: custom-spark
    hostname: spark-worker
    networks:
      - spark-network
    environment:
      - SPARK_MASTER=spark://spark-master:7077
      - SPARK_MODE=worker
    volumes:
      - spark-inputs:/data/inputs
      - ./data/outputs:/data/outputs
      - ./jobs:/jobs
networks:
  spark-network:
    driver: bridge
volumes:
  spark-inputs:
```

이 구성 파일은 두 개의 서비스를 정의합니다: spark-master와 spark-worker가 각각 custom-spark 이미지를 실행합니다. spark-master 서비스는 master 모드에서 실행되고, spark-worker 서비스는 worker 모드에서 실행되며 spark-master 서비스에 연결됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Docker Compose를 사용하여 Spark 클러스터를 시작하려면 다음 명령을 실행하세요:

```js
docker-compose up -d
```

이 명령은 docker-compose.yml 파일에서 정의된 구성을 사용하여 Spark 클러스터를 시작합니다.

마스터만 시작하려면 다음 명령을 사용할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
docker-compose up -d spark-master
```

![Step-by-step guide](/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_11.png)

워커만 시작하려면 시작하려는 워커 수를 지정하여 다음 명령을 사용할 수 있습니다:

```bash
docker-compose up -d --scale spark-worker=2
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_12.png

이 명령어는 Spark 클러스터에서 두 개의 워커 노드를 시작합니다.

이렇게 클러스터를 시작한 후에는 이전과 마찬가지로 작동하며 Spark 작업을 보통대로 실행할 수 있습니다. 새로운 Spark 작업을 실행하려면 아래와 같이 하면 됩니다:

- 스크립트를 로컬 jobs 폴더에 추가합니다: ./jobs
- 필요한 경우 입력 데이터를 spark-inputs 볼륨에 복사합니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
docker cp data/inputs/new_data.csv spark-master:/data/inputs/new_data.csv
```

- 알리아스로 지정된 스파크-서브미트(spark-submit) 명령어를 사용하여 작업 실행:

```bash
spark-submit /jobs/new_job.py
```

# 클러스터 중지하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

스파크 클러스터를 중지하려면 다음 명령어를 사용할 수 있어요:

```js
docker-compose down
```

![Image](/assets/img/2024-07-06-5minutestocreateyourownSparkClusterforfreeAStep-by-StepGuide_13.png)

도커를 사용하여 로컬 스파크 클러스터를 설정하면 개발 프로세스를 간소화할 수 있어요. 스파크 작업을 테스트하고 프로덕션 환경을 시뮬레이션하며 스파크 기능을 제어된 환경에서 실험할 수 있어요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

도커 볼륨을 사용하면 로컬 클러스터가 계속해서 개발 및 테스트할 수 있는 견고한 도구가 되도록 데이터와 설정이 유지될 수 있습니다.

이 접근 방식은 데이터 엔지니어 뿐만 아니라 Scala 또는 PySpark와 함께 작업하는 데이터 과학자들에게도 유용합니다. 이를 통해 기존 직장에서처럼 클라우드 플랫폼의 실제 클러스터 자원을 많이 사용하지 않고 점진적으로 개발할 수 있습니다.

전체 코드는 여기에서 확인하실 수 있습니다.
