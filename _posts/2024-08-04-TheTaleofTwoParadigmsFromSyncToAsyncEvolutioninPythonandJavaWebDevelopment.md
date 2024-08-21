---
title: "동기식 vs 비동기식 Python과 Java 웹 개발의 진화 이야기"
description: ""
coverImage: "/assets/img/2024-08-04-TheTaleofTwoParadigmsFromSyncToAsyncEvolutioninPythonandJavaWebDevelopment_0.png"
date: 2024-08-04 18:59
ogImage:
  url: /assets/img/2024-08-04-TheTaleofTwoParadigmsFromSyncToAsyncEvolutioninPythonandJavaWebDevelopment_0.png
tag: Tech
originalTitle: "The Tale of Two Paradigms  From Sync To Async Evolution in Python and Java Web Development"
link: "https://medium.com/@juliastolin/the-tale-of-two-paradigms-the-sync-to-async-evolution-python-vs-java-web-development-01d8134ce304"
isUpdated: true
---

<img src="/assets/img/2024-08-04-TheTaleofTwoParadigmsFromSyncToAsyncEvolutioninPythonandJavaWebDevelopment_0.png" />

# 소개

이 블로그 포스트에서는 간단한 작업에 대한 성능을 측정하여 Python 및 Java에서 동기 및 비동기 처리를 탐구할 것입니다. Python의 Flask와 Sanic, 그리고 Java의 Spring Boot을 비교하고, 내부 서버로는 Tomcat 및 Netty를 사용합니다. 이러한 다른 프레임워크가 JSON POST 요청을 처리하는 방식에 초점을 맞추어 지연 시간 및 처리량에 유의하면서 성능을 비교할 것입니다. 웹 서버 성능에서 동기 및 비동기 접근의 효율성과 속도에 대한 통찰을 발견하는 과정에 참여해 주세요.

파이썬은 계속 변화하는 웹 개발 환경에서 간단함과 강력함의 상징이 되었습니다. 이러한 환경의 핵심에는 웹 애플리케이션 아키텍처를 결정하는 중요한 선택이 있습니다: 동기식 또는 비동기식 접근 방식을 사용할 것인가. 이 결정은 Java 생태계에서 Jetty와 Netty 간의 선택과 같이 다른 경로를 나타내며, 각각은 웹 요청을 처리하는 방식에서 다른 방향을 나타냅니다.

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

# 동기식 Python: 전통적인 길

동기식 세계에서 Python의 간결함이 빛을 발합니다. 동기식 접근 방식은 간단합니다 - 각 단계는 다음 단계가 시작되기 전에 완료되어야 합니다. 이는 순차적인 진행을 의미하며, 페이지를 건너뛰지 않고 처음부터 끝까지 책을 읽는 것과 유사합니다. Flask와 같은 웹 서버가 요청을 받으면 해당 요청을 순차적으로 처리합니다. 서버가 데이터베이스를 쿼리하거나 파일에 액세스해야 하는 경우, 작업이 완료될 때까지 기다리거나 ("차단") 다음 작업으로 넘어가기 전까지 기다립니다. 이 차단 동작은 이해하기 쉽고 따르기 쉽지만 비용이 발생합니다. 서버가 대기하는 동안 다른 작업을 수행할 수 없습니다 - 다른 요청을 처리하거나 다른 작업을 수행할 수 없습니다. 고트래픽 시나리오에서는 수신된 요청이 차례를 기다리면 병목 현상이 발생할 수 있습니다.

# 비동기식 Python: 동시 실행 편년

비동기식 접근 방법은 작업을 조율하는 다른 방법입니다. Sanic과 같은 프레임워크가 보여주는 비동기식 Python은 각 작업이 완료될 때까지 기다리지 않고 여러 작업을 동시에 실행할 수 있도록 합니다. 이는 점프하는 사람이 여러 공을 동시에 공중에 유지하는 것과 유사합니다. 비동기 서버가 일반적으로 차단될 것으로 예상되는 데이터베이스 액세스와 같은 작업을 만나면 해당 작업을 한쪽에 두고 다른 작업으로 넘어갑니다. 기다리는 동안 미사용 시간을 활용하여 다른 요청을 처리하는 것이 아닙니다. 이러한 비차단 동작은 특히 I/O에 바운드된 애플리케이션에서 자원을 효율적으로 활용할 수 있도록 해줍니다.

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

동기식에서 비동기식으로의 전환이 단순히 기술적인 변화만이 아니라 패러다임의 전환이기 때문에 개발자들에게 코드의 흐름에 대해 다르게 생각하고 동시성의 힘을 받아들이며, 그에 따라 발생하는 복잡성을 관리해야 합니다. 그러나 이를 받아들일 용의가 있는 사람들에게는 상당한 보상이 있을 수 있습니다 - 더 빠른 응답 시간, 더 나은 확장성, 그리고 높은 부하를 우아하게 처리할 수 있는 능력 등이 있습니다.

# 구현

우리는 동기식과 비동기식 작업 사이의 개념적 차이를 탐구했습니다. 이제 실제 서버 구현에 이러한 개념이 어떻게 변환되는지 살펴보겠습니다. 먼저, POST 요청을 통해 JSON 데이터를 받아들이고 호출자에게 반환하는 간단한 웹 서버를 정의하는 것으로 시작하겠습니다.

수신된 JSON을 클라이언트로 다시 에코하는 서비스를 상상해 보세요. 이 예는 단순화된 예시지만, 더 복잡한 시나리오를 위한 준비를 합니다. 실제 응용 프로그램에서 요청 처리는 CPU 집약적인 계산, 데이터베이스 상호 작용, 네트워크 IO 또는 외부 서비스 호출을 포함할 수 있습니다. 이러한 작업에 소요되는 시간은 크게 달라질 수 있으며, 여기서 동기식과 비동기식 아키텍처 중 어떤 것을 선택하는지가 중요합니다.

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

우리가 동기 서버(Flask를 사용)와 비동기 서버 (Sanic을 사용)의 기본 구현을 스케치하는 것으로 시작해 봅시다.

## Flask: 동기 서버 예시

Flask는 기본적으로 각 요청을 동기적으로 처리합니다. 이는 서버가 한 번에 하나의 요청을 처리하며, 현재 요청이 완전히 처리될 때까지 다음 요청으로 넘어가지 않음을 의미합니다.

```js
from flask import Flask, request, jsonify

app = Flask(__name__)
default_context = "bench"

@app.route('/')
def home():
    return 'Hello From Flask Server'

@app.route(f'/{default_context}/receive_data', methods=['POST'])
def receive_data():
    received_data = request.get_json()
    # 실제 작업이 여기서 수행됩니다
    return jsonify({'received': True, 'data': received_data})

if __name__ == '__main__':
    app.run()
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

네, 당신이 하는 방법으로 네 개의 코어를 사용하고 네 개의 CPU 코어에 작업 부하를 효율적으로 분산시킬 수 있습니다. 다음 명렁어로 서버를 시작하세요:

```js
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## Sanic: 비동기 서버 예제

반면에 Sanic은 요청을 비동기적으로 처리하도록 설계되었습니다. 이는 여러 요청을 동시에 처리하고 모든 요청이 서로 차단되지 않고 이벤트 루프에서 처리할 수 있습니다.

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
from sanic import Sanic, text
from sanic import json

app = Sanic("bench")
default_context = "ybench"

@app.route('/')
async def test(request):
    return 'Hello From Sanic Server'

@app.route(f"/{default_context}/receive_data", methods=['POST'])
async def receive_data(request):
    received_data = request.json
    # here actual work will happen
    return json({'received': True, 'data': received_data})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, workers=4)
```

이것은 4개의 CPU에 대한 워크로드가 있는 Sanic 웹 서버를 실행하는 명령줄입니다:

```python
sanic app:app --host=0.0.0.0 --port=8000 --workers=4
```

이 구현에는 async 키워드가 포함되어 있음을 알 수 있습니다.

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

일반적으로, async는 Python에서 함수를 정의하는 중단 및 재개가 가능한 키워드입니다. async로 정의된 함수는 "비동기 함수"로, 전체 프로그램을 멈추지 않고 시간이 오래 걸릴 수 있는 작업을 수행할 수 있습니다.

클라이언트가 /ybench/receive_data 엔드포인트로 POST 요청을 보내면, Sanic은 receive_data 메서드를 호출하여 이 요청을 처리합니다. 비동기 함수이기 때문에 이 내부의 작업이 상대적으로 오랜 시간이 걸리면(예: 데이터베이스에 액세스하거나 외부 API를 호출하는 경우), Sanic은 모든 것을 차단하지 않고 이 작업이 완료될 때까지 기다릴 수 있습니다. 대기하는 동안 Sanic은 다른 요청을 처리할 수 있어 서버를 더 효율적이고 빠르게 만들어 줍니다.

# 벤치마크

벤치마크를 측정하는 여러 가지 가능성이 있으며 결과는 하드웨어 사양 및 사용하려는 리소스에 따라 달라집니다. 두 웹 서버를 동일한 기기에 설정하여 규모와 성능의 초기 모습을 얻은 후, 명령줄 합성 생성 도구를 사용하여 서버에 부하를 보내고 처리하는 레이턴시와 처리량을 확인할 수 있습니다.

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

기계 사양은 다음과 같습니다:

- CPU: Intel® Core™ i7-8700 @ 3.20GHz
- 코어: 96 (논리적 코어, 하이퍼스레딩을 포함하면)
- RAM: 190GB

외부 추가 부하는 없습니다.
Flask 서버 및 Sanic을 순차적으로 트래픽을 보내서 벤치마킹할 것입니다.

REST API 벤치마크를 위해 wrk, ab (Apache Bench), 또는 hey와 같은 도구를 사용할 수 있습니다. 이번 벤치마크에는 최신이자 쉬운 사용성을 갖춘 hey를 사용할 것입니다.

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

예를 들어, 5분 동안 20개의 동시 연결을 사용하여 서버에 특정 JSON 요청을 보내는 로드가 실행될 때 어떻게 보이는지 살펴봅시다.

```js
hey -z 5m -c 20 -m POST -T "application/json" -D request.json http://bench_server:8000/bench/receive_data
```

이것은 이 벤치마킹에 사용된 간단한 request.json 파일입니다:

```js
{
    "1": {
        "adId": "1",
        "adTitle": "Boost Your Backend: See How Sanic Outperforms Flask in Our Latest Benchmarks!",
        "campaignId": "123"
    },
    "2": {
        "adId": "2",
        "adTitle": "Get Ahead in Web Development: Embrace Asynchrony with Sanic – The Flask Alternative!",
        "campaignId": "124",
        "audience": "python dev developers"
    }
}
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

다음 설정을 사용하여 Flask와 Sanic을 비교한 결과를 살펴봅시다:

- 벤치마킹 머신에 외부 부하가 없습니다.
- 웹 서버는 4개의 워커로 구성된 머신에서 실행 중입니다.
- hey 스크립트는 다른 머신에서 실행됩니다.
- 모든 벤치마크에 사용된 hey 명령줄은 다음과 같습니다:

```js
hey -z 5m -c 20 -m POST -T "application/json" -D request.json \
http://bencmark_server:8000/bench/receive_data
```

# 결과:

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

| Sanic (async)             | Flask (sync)              |
| ------------------------- | ------------------------- |
| Summary:                  | Summary:                  |
| Total: 300.0055 secs      | Total: 300.0064 secs      |
| Slowest: 0.2099 secs      | Slowest: 1.0335 secs      |
| Fastest: 0.0002 secs      | Fastest: 0.0007 secs      |
| Average: 0.0060 secs      | Average: 0.0060 secs      |
| Requests/sec: 33593.4268  | Requests/sec: 7191.2708   |
|                           |                           |
| Latency distribution:     | Latency distribution:     |
| 10% in 0.0004 secs        | 10% in 0.0020 secs        |
| 25% in 0.0004 secs        | 25% in 0.0022 secs        |
| 50% in 0.0005 secs        | 50% in 0.0025 secs        |
| 75% in 0.0007 secs        | 75% in 0.0028 secs        |
| 90% in 0.0008 secs        | 90% in 0.0032 secs        |
| 95% in 0.0009 secs        | 95% in 0.0036 secs        |
| 99% in 0.0015 secs        | 99% in 0.0054 secs        |
|                           |                           |
| Status code distribution: | Status code distribution: |
| [200] 1000000 responses   | [200] 1000000 responses   |

top 명령어를 실행할 때 CPU 사용량이 어떻게 보이는지 확인할 수 있습니다:

벤치마크 결과를 살펴보면, 4개의 CPU 코어를 할당하고 동시성 수준을 20개 요청으로 설정했을 때, Sanic이 Flask보다 상당한 여유를 가지고 속도를 약 4배 빠르게 운영하는 것을 명확하게 알 수 있습니다.

또한 Gunicorn이 Flask의 성능에 어떤 영향을 미치는지 주목할 가치가 있습니다. Flask는 본질적으로 동기적이지만 Gunicorn으로 배포하면 비동기성의 모습을 얻을 수 있습니다. Gunicorn은 여러 프로세스를 생성하여 각각 한 번에 하나의 요청을 처리할 수 있는 상태를 만들어 동시에 요청을 처리할 수 있게 합니다. 이 설정은 Flask를 비동기 프레임워크로 전환하지는 않지만, Sanic과 같이 비동기 작업을 위해 처음부터 설계된 프레임워크를 사용하는 것보다 효율적이지 않습니다.

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

이 발견은 흥미로운데, 온라인 서빙 시나리오에서의 Python 성능에 대한 선입견을 도전합니다. Python이 고성능 웹 서비스에 최적의 선택이 아닐 수도 있다는 대중적인 견해가 이제 논의의 여지가 있습니다. 적절한 프레임워크와 구성을 갖추면 Python이 빠르고 효율적일 수 있다는 것을 입증했습니다.

자바 배경에서 나온 이 연구 결과는 당연히 나를 유도하여 Java Spring Boot와 Python을 비교한 결과에 대해 생각하게 했습니다. Java 기반의 웹 서버가 동시 요청과 처리 속도를 어떻게 다루는지 궁금해요.

하지만 Java 대 Python 대전에, Java Tomcat (Blocking IO) 대 Netty (Non-Blocking IO)의 성능부터 확인해봅시다.

# Java 구현

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

호기심을 충족시키기 위해 기본 Java Spring Boot 구현을 살펴봤어요.

```java
package com.bench.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {

  public static void main(final String[] args) {
    SpringApplication.run(App.class, args);
  }
}
```

```java
package com.bench.boot;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
public class MyController {

  @PostMapping("/bench/receive_data")
  public CompletableFuture<ResponseEntity<?>> receiveData(@RequestBody final Map<String, Map<String, Object>> jsonData) {
    // 비동기 처리 수행
    return CompletableFuture.supplyAsync(() -> {
      // 일부 처리 시뮬레이션
      // 예를 들어 받은 것 그대로 전송
      return ResponseEntity.ok(Map.of("received", "True", "data", jsonData));
    });
  }
}
```

SpringBoot를 Tomcat 서버로 빌드하기 위한 의존성입니다.

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
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
</dependencies>
```

이것은 Netty 서버와 함께 SpringBoot를 빌드하는 데 필요한 종속성입니다:

```js
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
  </dependency>
</dependencies>
```

자바는 특정 CPU 코어 수에 Java 애플리케이션을 제한하는 직접적인 명령줄 옵션을 제공하지 않습니다. JVM은 호스트 운영 체제에서 실행되며 CPU 리소스의 할당을 관리합니다. 그러나 특정 프로세스가 실행할 수있는 코어를 제어하는 운영 체제 수준에서 프로세서 집약성을 설정할 수 있습니다.

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

리눅스에서는 taskset 명령어를 사용하여 JVM 프로세스에 프로세서 어피니티를 설정할 수 있습니다. 아래는 자바 응용 프로그램을 실행하고 4개의 특정 코어만 사용하도록 제한하는 예시입니다:

```js
taskset -c 0,1,2,3 java -cp bench-trunk.jar com.bench.MyApp
```

# 성능 평가

서버는 이전 파이썬 테스트와 동일한 머신에서 실행되었고 외부 부하 없이 동일한 hey 명령어를 사용했습니다.

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

SpringBoot Tomcat 대 Netty를 비교한 내용입니다:

```js
╔═══════════════════════════╦════════════════════════════╗
║   Java Tomcat (Sync)      ║    Java Netty (Async)      ║
╠═══════════════════════════╬════════════════════════════╣
║ Summary:                  ║ Summary:                   ║
║ Total:  300.0018 secs     ║   Total:  300.0036 secs    ║
║ Slowest:  5.0007 secs     ║   Slowest:  0.2070 secs    ║
║ Fastest:  0.0003 secs     ║   Fastest:  0.0002 secs    ║
║ Average:  0.0060 secs     ║   Average:  0.0060 secs    ║
║ Requests/sec: 12555.1880  ║   Requests/sec: 37822.5925 ║
║                           ║                            ║
║ Latency distribution:     ║ Latency distribution:      ║
║ 10% in 0.0008 secs        ║   10% in 0.0003 secs       ║
║ 25% in 0.0010 secs        ║   25% in 0.0004 secs       ║
║ 50% in 0.0013 secs        ║   50% in 0.0005 secs       ║
║ 75% in 0.0018 secs        ║   75% in 0.0006 secs       ║
║ 90% in 0.0025 secs        ║   90% in 0.0009 secs       ║
║ 95% in 0.0031 secs        ║   95% in 0.0011 secs       ║
║ 99% in 0.0072 secs        ║   99% in 0.0026 secs       ║
║                           ║                            ║
║ Status code distribution: ║ Status code distribution:  ║
║ [200] 1000000 responses   ║   [200] 1000000 responses  ║
╚═══════════════════════════╩════════════════════════════╝
```

Java에서 Tasklet을 사용하여 4개의 CPU에 바인딩하였기 때문에 htop 시각화를 사용하면 top보다 더 나은 자원 활용 메트릭이 표시됩니다.

다음은 htop 명령을 사용하여 CPU 사용량이 어떻게 보이는지에 대한 내용입니다:

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

![이미지](/assets/img/2024-08-04-TheTaleofTwoParadigmsFromSyncToAsyncEvolutioninPythonandJavaWebDevelopment_1.png)

우리의 벤치마킹 연습을 통해 두 종류의 Java 서버 간에 주목할만한 성능 차이가 나타났습니다: Jetty와 유사한 전통적인 동기식 Tomcat 서버와 Netty로 구동되는 현대적인 비동기식 서버입니다. 구체적으로 동기식 Tomcat 서버의 처리량은 비동기식 Netty 서버의 약 1/3 정도입니다. 이 성능 차이는 지연 시간도 반영되며, 두 서버 간의 지연 시간 비율은 처리량의 차이와 밀접하게 일치합니다.

우리의 테스트에서 흥미로운 점은 Sanic를 사용한 비동기식 Python의 경쟁력 있는 성능입니다. Spring Boot와 Netty의 비동기 기능과 대결할 때 Python의 지연 시간이 거의 Java Netty와 유사하며 획기적으로 비슷한 처리량을 달성한다는 것이 특히 주목할 만합니다. 이것은 Python의 비동기식 웹 프레임워크의 발전을 입증하며, 이들이 속도와 효율성에서 기존의 Java 솔루션과 경쟁할 수 있는 잠재력을 보여줍니다.

```js
╔═══════════════════════════╦════════════════════════════╗
║   Java Netty (Async)      ║     Python Sanic (Async)   ║
╠═══════════════════════════╬════════════════════════════╣
║ Summary:                  ║ Summary:                   ║
║ Total:  300.0036 secs     ║   Total:   300.0055 secs   ║
║ Slowest:  0.2070 secs     ║   Slowest:  0.2099 secs    ║
║ Fastest:  0.0002 secs     ║   Fastest:  0.0002 secs    ║
║ Average:  0.0060 secs     ║   Average:  0.0060 secs    ║
║ Requests/sec: 37822.5925  ║   Requests/sec: 33593.4268 ║
║                           ║                            ║
║ Latency distribution:     ║ Latency distribution:      ║
║ 10% in 0.0003 secs        ║   10% in 0.0004 secs       ║
║ 25% in 0.0004 secs        ║   25% in 0.0004 secs       ║
║ 50% in 0.0005 secs        ║   50% in 0.0005 secs       ║
║ 75% in 0.0006 secs        ║   75% in 0.0007 secs       ║
║ 90% in 0.0009 secs        ║   90% in 0.0008 secs       ║
║ 95% in 0.0011 secs        ║   95% in 0.0009 secs       ║
║ 99% in 0.0026 secs        ║   99% in 0.0015 secs       ║
║                           ║                            ║
║ Status code distribution: ║ Status code distribution:  ║
║ [200] 1000000 responses   ║   [200] 1000000 responses  ║
╚═══════════════════════════╩════════════════════════════╝
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

# 개요

다양한 웹 서버 프레임워크의 성능을 탐색한 결과에는 몇 가지 유익한 통찰이 도출되었습니다. 제어된 조건 하에 실행된 벤치마킹 연구에 따르면, 4개 CPU 코어를 처리하며 20개 동시 요청을 처리하는 기기에서 비동기 Python 프레임워크인 Sanic이 동기 Flask 프레임워크보다 우수한 성능을 보였습니다. 이 결과는 Python이 고성능 온라인 서빙 시스템에 적합하지 않을 수 있다는 전통적인 견해에 도전하며, 적절한 설정을 통해 Python이 속도와 효율성을 제공할 수 있다는 것을 입증했습니다.

동기 및 비동기 웹 프레임워크의 기본 측면에 대해 살펴본 것에 주목해야 합니다. 우리가 본 것은 단순한 뼈대 설정을 기반으로 한 측정된 성능일 뿐입니다. 일반적으로 계산 및/또는 IO 요구가 많은 실제 응용 프로그램은 동기 및 비동기 서버 간의 차이를 더욱 부각시킬 수 있습니다.

이 초기 비교는 조사를 확장할 수 있는 기준을 제공합니다. 다음 블로그 포스트에서는 더 복잡한 시나리오를 탐구하여 각 서버 유형이 실제 업무 부하에 어떻게 대처하는지 살펴볼 수 있을 것입니다. 동기 및 비동기 처리가 응용프로그램 성능에서 중요한 역할을 하는 깊은 탐구를 기대해주시기 바랍니다.
