---
title: "파이썬과 Redpanda를 사용하여 실시간 센서 데이터 집계하기"
description: ""
coverImage: "/assets/img/2024-05-27-AggregatingReal-timeSensorDatawithPythonandRedpanda_0.png"
date: 2024-05-27 18:35
ogImage:
  url: /assets/img/2024-05-27-AggregatingReal-timeSensorDatawithPythonandRedpanda_0.png
tag: Tech
originalTitle: "Aggregating Real-time Sensor Data with Python and Redpanda"
link: "https://medium.com/towards-data-science/aggregating-real-time-sensor-data-with-python-and-redpanda-30a139d59702"
isUpdated: true
---

## 간단한 Python을 사용한 스트림 처리 및 tumbling windows

![이미지](/assets/img/2024-05-27-AggregatingReal-timeSensorDatawithPythonandRedpanda_0.png)

이 튜토리얼에서는 Python(및 메시지 브로커로 Redpanda)만 사용하여 센서 데이터 스트림을 다운샘플링하는 방법을 보여드리고 싶습니다. 목표는 스트림 처리가 얼마나 간단할 수 있는지를 보여주는 것이며, 시작하기 위해 무겁고 복잡한 스트림 처리 프레임워크가 필요하지 않다는 것을 보여주고 싶습니다.

최근까지 스트림 처리는 일반적으로 Java 전문 지식이 필요했던 복잡한 작업이었습니다. 그러나 Python 스트림 처리 생태계가 점차 성숙해지면서 Faust, Bytewax 및 Quix와 같은 Python 개발자에게 더 많은 옵션이 있어졌습니다. 나중에는 이러한 라이브러리가 기존의 Java 중심 옵션과 경쟁하기 위해 등장한 이유에 대해 조금 더 배경을 제공할 것입니다.

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

하지만 먼저 일을 시작해 보겠습니다. 우리는 스트림 프로세서로 Quix Streams 라이브러리를 사용할 것입니다. Quix Streams는 Faust와 매우 유사하지만 구문이 더 간결하고 StreamingDataframes라는 Pandas와 유사한 API를 사용하도록 최적화되었습니다.

다음 명령어로 Quix Streams 라이브러리를 설치할 수 있습니다:

```js
pip install quixstreams
```

무엇을 구축할 것인가

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

간단한 애플리케이션을 개발하게 될 거에요. 이 애플리케이션은 다양한 센서에서 수신되는 온도 측정값의 롤링 집계를 계산할 거예요. 온도 측정값은 비교적 높은 빈도로 들어오며, 이 애플리케이션은 이를 집계하여 낮은 시간 해상도(10초마다)로 출력할 거에요. 너무 높은 해상도의 데이터로 작업하고 싶지 않아서 이를 압축한 것으로 생각할 수 있어요.

이 GitHub 저장소에서 완성된 코드에 접근할 수 있어요.

이 애플리케이션에는 합성 센서 데이터를 생성하는 코드가 포함되어 있지만, 실제 시나리오에서 이 데이터는 차량 편대나 기계가 가득한 창고와 같은 다양한 종류의 센서에서 나올 수 있어요.

기본 아키텍처의 개략적인 그림을 아래에서 확인할 수 있어요:

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

<img src="/assets/img/2024-05-27-AggregatingReal-timeSensorDatawithPythonandRedpanda_1.png" />

# 스트림 처리 파이프라인의 구성 요소

이전 다이어그램은 스트림 처리 파이프라인의 주요 구성 요소를 나타냅니다. 데이터 생산자인 센서, 스트리밍 데이터 플랫폼으로 Redpanda, 그리고 스트림 프로세서인 Quix가 있습니다.

데이터 생산자

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

이 코드 조각들은 ECU(Engine Control Units)의 펌웨어, 클라우드 플랫폼의 모니터링 모듈 또는 사용자 활동을 기록하는 웹 서버와 같은 데이터를 생성하는 시스템에 연결되어 있습니다. 이러한 코드는 원시 데이터를 가져와 해당 플랫폼이 이해할 수 있는 형식으로 스트리밍 데이터 플랫폼으로 보냅니다.

스트리밍 데이터 플랫폼

여기서는 스트리밍 데이터를 저장합니다. 정적 데이터에 대한 데이터베이스가 하는 역할과 거의 동일한 역할을 합니다. 그러나 테이블 대신 토픽을 사용합니다. 그렇지 않으면 정적 데이터베이스와 유사한 기능을 갖추고 있습니다. 데이터를 소비하고 생성할 수 있는 사용자, 데이터가 준수해야 하는 스키마 등을 관리해야 합니다. 그러나 데이터베이스와는 달리 데이터가 끊임없이 변하기 때문에 쿼리할 목적으로 설계되지 않습니다. 일반적으로 데이터를 변환하고 데이터 과학자가 탐색할 수 있는 데 옮기거나 RisingWave나 Apache Pinot과 같은 스트리밍 데이터에 최적화된 쿼리 가능 시스템에 원시 데이터를 넣기 위해 스트림 프로세서를 사용합니다. 그러나 스트리밍 데이터의 패턴에 의해 트리거된 자동화 시스템(추천 엔진과 같은)의 경우에는 이것이 이상적인 해결책이 아닙니다. 이 경우 전용 스트림 프로세서를 사용하는 것이 확실합니다.

스트림 프로세서

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

이러한 엔진들은 데이터가 도착하는 대로 계속적으로 작업을 수행하는 엔진들입니다. 이들은 어플리케이션 백엔드에서 데이터를 처리하는 일반적인 마이크로서비스들과 비교될 수 있습니다. 하지만 한 가지 큰 차이가 있습니다. 마이크로서비스의 경우 데이터가 비아주로 도착하며, 각 "물방울"이 개별적으로 처리됩니다. 비가 많이 내려도 서비스가 "물방울"을 넘치지 않고 따라잡는 것은 그리 어렵지 않습니다 (물에서 불순물을 거르는 필터 시스템을 생각해보세요).

스트림 프로세서의 경우 데이터가 연속적이고 넓은 물줄기로 도착합니다. 필터 시스템은 빠르게 압도되며 디자인을 변경하지 않는 이상 물줄기를 분할하고 작은 스트림을 여러 필터 시스템으로 보내야 합니다. 이것이 바로 스트림 프로세서가 작동하는 방식입니다. 그들은 수평적으로 확장 가능하게 설계되어 있으며 병렬로 작동하고 있습니다. 그리고 절대 멈추지 않고 계속해서 데이터를 처리하며, 걸러진 데이터를 스트리밍 데이터 플랫폼에 출력하는데, 이것은 스트리밍 데이터의 저장지 역할을 합니다. 조금 더 복잡하게 만들기 위해, 스트림 프로세서들은 종종 여기서 시도해볼 창 기능 예제와 같이 이전에 받았던 데이터를 추적해야 할 수도 있습니다.

또한 "데이터 컨슈머"와 "데이터 싱크"라는 것도 있습니다. 처리된 데이터를 사용하는 시스템(프론트엔드 어플리케이션 및 모바일 앱과 같은)이나 오프라인 분석을 위해 데이터를 저장하는 시스템(스노우플레이크나 AWS 레드시프트와 같은 데이터 웨어하우스)이 있습니다. 이 튜토리얼에서는 이들을 다루지 않을 것이므로 일단은 생략하겠습니다.

# 로컬 스트리밍 데이터 클러스터 설정하기

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

이 튜토리얼에서는 로컬 설치된 Redpanda를 활용하여 스트리밍 데이터를 관리하는 방법을 보여드릴 거에요. Redpanda를 선택한 이유는 로컬에서 쉽게 실행할 수 있기 때문이에요.

먼저 도커 컴포즈를 사용하여 Redpanda 콘솔을 포함한 클러스터를 빠르게 생성할 거에요. 그러니 먼저 도커를 설치해야 해요.

# 스트리밍 애플리케이션 생성

먼저 스트리밍 데이터를 생성하고 처리할 개별 파일을 만들 거에요. 이렇게 하면 실행 중인 프로세스를 독립적으로 관리하기 쉬워져요. 즉, 프로듀서를 중지하더라도 스트림 프로세서를 중지하지 않아도 되요. 이제 만들 파일의 개요를 살펴보겠어요:

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

- 스트림 프로듀서: sensor_stream_producer.py
  가상 온도 데이터를 생성하고 해당 데이터를 Redpanda의 "raw data" 소스 토픽에 씁니다. Faust 예제와 마찬가지로 약 5초마다 약 20개의 측정 값을 생성하거나 초당 약 4개의 측정 값을 생성합니다.
- 스트림 프로세서: sensor_stream_processor.py
  "source" 토픽에서 원시 온도 데이터를 소비하고 데이터의 해상도를 줄이기 위해 텀블링 윈도우 계산을 수행합니다. 10초 간격의 창에서 받은 데이터의 평균 값을 계산하여 각 10초마다 한 번의 측정 값을 얻습니다. 그런 다음 이 집계된 측정 값을 Redpanda의 agg-temperatures 토픽에 생성합니다.

스트림 프로세서가 대부분의 작업을 처리하고이 튜토리얼의 핵심입니다. 스트림 프로듀서는 적절한 데이터 수집 프로세스의 대리인입니다. 예를 들어, 프로덕션 시나리오에서는 MQTT 커넥터와 같은 것을 사용하여 센서에서 데이터를 가져와 토픽에 생성할 수 있습니다.

- 간단한 예제를 위해 데이터를 시뮬레이션하는 것이 더 간단하므로 먼저 설정해 봅시다.

# 스트림 프로듀서 생성

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

새로운 파일인 sensor_stream_producer.py를 생성하고 주요 Quix 애플리케이션을 정의하세요. (이 예제는 Python 3.10에서 개발되었지만, Python 3의 다른 버전도 pip install quixstreams을 실행할 수 있다면 작동해야 합니다.)

sensor_stream_producer.py 파일을 만들고 필요한 종속 항목(Quix Streams 포함)을 모두 추가하세요.

```python
from dataclasses import dataclass, asdict # 데이터 스키마를 정의하는 데 사용됩니다.
from datetime import datetime # 타임스탬프를 관리하는 데 사용됩니다.
from time import sleep # 데이터 생성기를 느리게 만드는 데 사용됩니다.
import uuid # 메시지 ID 생성에 사용됩니다.
import json # 데이터 직렬화에 사용됩니다.

from quixstreams import Application
```

그런 다음, Quix 애플리케이션 및 데이터를 보낼 대상 토픽을 정의하세요.

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
app = Application(broker_address='localhost:19092')

destination_topic = app.topic(name='raw-temp-data', value_serializer="json")
```

`value_serializer` 매개변수는 예상 소스 데이터의 형식을 정의합니다 (바이트로 직렬화될 데이터). 이 경우 JSON을 보낼 것입니다.

온도 데이터에 대한 매우 기본적인 스키마를 정의하고 JSON으로 직렬화하는 함수를 추가하기 위해 dataclass 모듈을 사용해봅시다.

```python
@dataclass
class Temperature:
    ts: datetime
    value: int

    def to_json(self):
        # 데이터 클래스를 사전으로 변환
        data = asdict(self)
        # datetime 객체를 문자열로 변환
        data['ts'] = self.ts.isoformat()
        # 사전을 JSON 문자열로 직렬화
        return json.dumps(data)
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

다음으로, 가짜 온도 센서 데이터를 Redpanda 소스 토픽으로 보내는 코드를 추가해보세요.

```js
i = 0
with app.get_producer() as producer:
    while i < 10000:
        sensor_id = random.choice(["Sensor1", "Sensor2", "Sensor3", "Sensor4", "Sensor5"])
        temperature = Temperature(datetime.now(), random.randint(0, 100))
        value = temperature.to_json()

        print(f"생성된 값 {value}")
        serialized = destination_topic.serialize(
            key=sensor_id, value=value, headers={"uuid": str(uuid.uuid4())}
        )
        producer.produce(
            topic=destination_topic.name,
            headers=serialized.headers,
            key=serialized.key,
            value=serialized.value,
        )
        i += 1
        sleep(random.randint(0, 1000) / 1000)
```

이 코드는 0부터 1초 사이의 랜덤한 시간 간격으로 분리된 1000개의 레코드를 생성합니다. 또한 5가지 옵션 중에서 센서 이름을 무작위로 선택합니다.

이제 명령줄에서 다음을 실행하여 프로듀서를 테스트해보세요.

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

```js
python sensor_stream_producer.py
```

이렇게 로되 데이터를 콘솔에 확인할 수 있어요:

```js
[데이터 생성됨]
```

작동하는 것을 확인하면 일단 프로세스를 중지해주세요 (나중에 스트림 처리 프로세스와 함께 실행할 거에요).

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

# 스트림 프로세서 생성

스트림 프로세서는 세 가지 주요 작업을 수행합니다: 1) 소스 토픽에서 원시 온도 데이터를 소비, 2) 데이터를 지속적으로 집계하고, 3) 집계된 결과를 싱크 토픽으로 전송합니다.

각 작업에 대한 코드를 추가해 보겠습니다. IDE에서 sensor_stream_processor.py라는 새 파일을 만들어 주세요.

먼저, 이전과 같이 종속성을 추가해주세요:

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

```js
import os
import random
import json
from datetime import datetime, timedelta
from dataclasses import dataclass
import logging
from quixstreams import Application

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

그리고 스트림 처리 응용 프로그램에서 필요한 몇 가지 변수를 설정해보겠습니다:

```js
TOPIC = "raw-temperature" # 입력 토픽을 정의합니다
SINK = "agg-temperature"  # 출력 토픽을 정의합니다
WINDOW = 10  # 시간 창의 길이를 초 단위로 정의합니다
WINDOW_EXPIRES = 1 # 데이터가 창에서 제외되기 전에 도착할 수 있는 시간을 초 단위로 정의합니다
```

나중에 창 변수가 무엇을 의미하는지 자세히 살펴보겠지만, 지금은 주요 Quix 애플리케이션을 정의하는 데 집중해 보겠습니다.

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

```js
app = Application(
  (broker_address = "localhost:19092"),
  (consumer_group = "quix-stream-processor"),
  (auto_offset_reset = "earliest")
);
```

지금은 몇 가지 더 많은 애플리케이션 변수들이 있는데요, consumer_group와 auto_offset_reset이 그 중 일부에요. 이러한 설정 사이의 상호작용에 대해 더 알아보려면 "카프카의 auto offset reset 구성 이해: 사용 사례 및 함정"이라는 기사를 확인해 보세요.

다음으로, 코어 스트림 처리 함수의 양쪽에 입력 및 출력 토픽을 정의하고, 들어오는 데이터를 DataFrame에 넣는 함수를 추가하세요.

```js
input_topic = app.topic(TOPIC, value_deserializer="json")
output_topic = app.topic(SINK, value_serializer="json")

sdf = app.dataframe(input_topic)
sdf = sdf.update(lambda value: logger.info(f"Input value received: {value}"))
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

우리는 들어오는 데이터가 손상되지 않았는지 확인하기 위해 로깅 라인을 추가했습니다.

다음으로, 메시지 페이로드에서 Kafka 타임스탬프 대신 사용할 사용자 정의 타임스탬프 추출기를 추가해봅시다. 집계를 위해 이것은 기본적으로 읽기가 생성된 시간을 사용하고 Redpanda가 수신한 시간이 아닌 것을 의미합니다. 더 간단하게 설명하면 "Redpanda의 수신된 시간이 아닌 센서의 시간 정의를 사용하세요".

```js
def custom_ts_extractor(value):

    # 센서의 타임스탬프를 추출하여 datetime 객체로 변환
    dt_obj = datetime.strptime(value["ts"], "%Y-%m-%dT%H:%M:%S.%f") #

    # 효율적인 Quix 처리를 위해 Unix epoch부터의 밀리초로 변환
    milliseconds = int(dt_obj.timestamp() * 1000)
    value["timestamp"] = milliseconds
    logger.info(f"새로운 타임스탬프 값: {value['timestamp']}")

    return value["timestamp"]

# 이전에 정의된 input_topic 변수를 덮어쓰어 사용자 정의 타임스탬프 추출기를 사용하도록 설정
input_topic = app.topic(TOPIC, timestamp_extractor=custom_ts_extractor, value_deserializer="json")
```

왜 이렇게 하는 걸까요? 처리에 사용할 시간에 대해 철학적인 논쟁으로 빠져들 수 있겠지만, 그건 다른 기사의 주제입니다. 사용자 정의 타임스탬프로 하고자 한 것은 실시간 처리에서 시간을 해석하는 다양한 방법이 있고, 데이터 도착 시간을 반드시 사용할 필요는 없다는 것을 보여주고 싶었습니다.

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

새 창이 시작될 때 집계를 위한 상태를 초기화하세요. 창에 첫 번째 레코드가 도착할 때 집계를 준비합니다.

```js
def initializer(value: dict) -> dict:

    value_dict = json.loads(value)
    return {
        'count': 1,
        'min': value_dict['value'],
        'max': value_dict['value'],
        'mean': value_dict['value'],
    }
```

이것은 창을 위한 초기 값들을 설정합니다. 최솟값, 최댓값 및 평균의 경우, 처음의 센서 리딩을 시작점으로 삼기 때문에 모두 동일합니다.

이제 "리듀서" 함수 형태로 집계 로직을 추가해보겠습니다.

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

def reducer(aggregated: dict, value: dict) -> dict:
aggcount = aggregated['count'] + 1
value_dict = json.loads(value)
return {
'count': aggcount,
'min': min(aggregated['min'], value_dict['value']),
'max': max(aggregated['max'], value_dict['value']),
'mean': (aggregated['mean'] \* aggregated['count'] + value_dict['value']) / (aggregated['count'] + 1)
}

이 기능은 창에서 여러 집계를 수행할 때만 필요합니다. 우리의 경우 각 창에 대해 count, min, max 및 mean 값을 생성하기 때문에 이러한 값을 미리 정의해야 합니다.

다음으로, 중요한 부분입니다 - tumbling window 기능 추가:

### 창 유형 및 길이와 같은 창 매개변수 정의

sdf = ( # 10초의 텀블링 창 정의
sdf.tumbling_window(timedelta(seconds=WINDOW), grace_ms=timedelta(seconds=WINDOW_EXPIRES))

    # 'reducer' 및 'initializer' 함수로 'reduce' 집계 생성
    .reduce(reducer=reducer, initializer=initializer)

    # 닫힌 10초 창에 대해서만 결과 발생
    .final()

)

### 스트리밍 DataFrame에 창 적용 및 출력에 포함할 데이터 포인트 정의

sdf = sdf.apply(
lambda value: {
"time": value["end"], # 'agg-temperature' 토픽으로 보낼 메시지의 타임스탬프로 윈도우 종료 시간 사용
"temperature": value["value"], # 온도 매개변수에 대한 {count, min, max, mean} 값을 포함하는 사전 전송
}
)

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

스트림 처리가 가능한 DataFrame을 정의하는데, 이는 텀블링 윈도우를 기반으로 한 집계의 집합입니다 — 시간의 10초간의 겹치지 않는 세그먼트에 대해 수행되는 집계의 집합입니다.

팁: 다양한 윈도우 계산 유형에 대해 다시 알아보려면 다음 기사를 확인해보세요: “스트림 처리에서 윈도우링하는 방법 안내”.

마지막으로 결과를 다운스트림 출력 주제로 내보냅니다:

```js
sdf = sdf.to_topic(output_topic)
sdf = sdf.update(lambda value: logger.info(f"생성된 값: {value}"))

if __name__ == "__main__":
    logger.info("애플리케이션 시작")
    app.run(sdf)
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

알림: 생산자 코드가 합성 온도 데이터를 전송하는 데 사용된 생산자 코드와 매우 다르게 보일 수 있습니다 (with app.get_producer() as producer()을 사용하는 부분). 이는 Quix가 변환 작업을 위해 다른 생산자 함수를 사용하기 때문입니다 (즉, 입력 및 출력 주제 사이에 위치한 작업).

따라오시면서 알게 되겠지만, 우리는 Streaming DataFrame인 sdf 변수를 최종 형태로 바꿀 때까지 반복적으로 변경합니다. 따라서 sdf.to_topic 함수는 Streaming DataFrame의 최종 상태를 단순히 출력 주제로 스트리밍하여 행 단위로 돌려줍니다.

반면에 생산자 함수는 CSV 파일, MQTT 브로커 또는 우리의 경우와 같이 외부 소스에서 데이터를 수집하는 데 사용됩니다, 생성기 함수가 있습니다.

# 스트리밍 애플리케이션 실행

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

마침내, 스트리밍 애플리케이션을 실행하고 모든 부분들이 원활하게 작동하는지 확인할 수 있게 되었네요.

먼저 터미널 창에서 다시 프로듀서를 실행해주세요:

```js
python sensor_stream_producer.py
```

그런 다음, 두 번째 터미널 창에서 스트림 프로세서를 시작하세요:

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

```js
python sensor_stream_processor.py
```

각 창에서 로그 출력을 주의 깊게 확인하여 모든 것이 원할하게 실행되는지 확인하세요.

또한 집골 토픽에 집계된 데이터가 올바르게 스트리밍되는지 확인하려면 Redpanda 콘솔을 확인할 수 있습니다(주소: http://localhost:8080/topics).

<img src="/assets/img/2024-05-27-AggregatingReal-timeSensorDatawithPythonandRedpanda_2.png" />

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

# 마무리

여기서 시도한 것은 스트림 처리를 수행하는 하나의 방법에 불과합니다. 당연히 Apache Flink 및 Apache Spark Streaming과 같은 강력한 도구들도 있습니다. 그러나 이 도구들은 주로 Java 기반입니다. Python 래퍼를 사용할 수 있지만 문제가 발생하면 여전히 Python 오류가 아닌 Java 오류를 디버깅해야 합니다. Java 기술은 데이터 엔지니어들과 함께 작업하는 소프트웨어 엔지니어들 사이에서 점점 더 중요해지는 데이터 분석가에게 일반적으로 보급되어 있는 기술은 아닙니다.

이 튜토리얼에서는 스트림 처리 알고리즘으로 간단한 집계를 실행했지만, 실제로 이러한 알고리즘들은 주로 기계 학습 모델을 활용하여 데이터를 변환합니다. 또한, 기계 학습을 위한 소프트웨어 생태계는 주로 Python으로 이루어져 있습니다.

자료 전문가, 기계 학습 엔지니어 및 소프트웨어 엔지니어들이 함께 작업할 때 Python이 선호되는 언어임을 자주 간과합니다. 이는 SQL보다도 더 효율적입니다. 왜냐하면 Python을 사용하여 데이터와 관련 없는 작업(예: API 호출 및 웹훅 트리거)을 수행할 수 있기 때문입니다. 이것이 Faust, Bytewax, Quix와 같은 라이브러리들이 발전해 나간 이유 중 하나입니다. 즉, 이러한 다양한 분야 사이의 임피던스 갭을 줄이기 위해 만들어졌다는 것입니다.

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

희망을 가지고, 파이썬이 스트림 처리에 적합한 언어임을 보여드릴 수 있었으면 좋겠고, 파이썬의 스트림 처리를 위한 생태계가 꾸준히 성숙해지고 있으며, 기존의 Java 기반 생태계에 버금가는 성능을 보여줄 수 있음을 보여드릴 수 있었기를 희망합니다.

- 이 튜토리얼의 모든 코드는 이 GitHub 저장소에서 확인하실 수 있습니다.
