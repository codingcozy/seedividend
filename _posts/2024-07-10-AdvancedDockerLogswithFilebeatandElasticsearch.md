---
title: "Filebeat과 Elasticsearch를 사용한 고급 Docker 로그 관리 방법"
description: ""
coverImage: "/assets/img/2024-07-10-AdvancedDockerLogswithFilebeatandElasticsearch_0.png"
date: 2024-07-10 02:03
ogImage:
  url: /assets/img/2024-07-10-AdvancedDockerLogswithFilebeatandElasticsearch_0.png
tag: Tech
originalTitle: "Advanced Docker Logs with Filebeat and Elasticsearch"
link: "https://medium.com/@vosarat1995/advanced-docker-logs-with-filebeat-and-elasticsearch-30073166a68e"
isUpdated: true
---

시스템 내에서 무슨 일이 일어나고 있는지 추적하고 싶다면 아마 애플리케이션 로그를 관측 스택에 연결하는 것부터 시작할 것입니다. 우리의 애플리케이션 로그는 아마 이미 도커에 저장되어 있고 가장 견고한 기술을 지향한다면 아마 엘라스틱 스택을 선택할 것입니다. 그렇다면 양쪽을 연결하는 것이 과제입니다. 저는 이를 위해 Filebeat를 사용할 것을 제안합니다.

그래서 이 글에서는 완전한 스택을 활성화하여 도커에서 로그를 엘라스틱서치로 내보내고 관측 가능성 솔루션의 간단하면서도 강력한 기반을 구축해 볼 것입니다. 그러니, 비트를 시작해 보죠!

![Advanced Docker Logs with Filebeat and Elasticsearch](/assets/img/2024-07-10-AdvancedDockerLogswithFilebeatandElasticsearch_0.png)

# 기반 활성화하기

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

"기본 설정부터 시작해보겠습니다. Elasticsearch, Kibana 및 Filebeat을 실행하겠습니다. 각각이 별도의 filebeat.yml 파일에서 구성되어 있습니다. 아래 구성을 확인하고 이해하기 어려운 부분이 있으면 이전 글을 참조해주세요. 여기서 기다리겠습니다.

compose.yaml

```js
services:
  elasticsearch:
    image: elasticsearch:7.17.3
    environment:
      - discovery.type=single-node

  kibana:
    image: kibana:7.17.3
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - 5601:5601

  shipper:
    image: docker.elastic.co/beats/filebeat:8.14.0
    user: root
    volumes:
      - /var/lib/docker:/var/lib/docker:ro
      - ./filebeat.yml:/usr/share/filebeat/filebeat.yml
      - /var/run/docker.sock:/var/run/docker.sock
```

filebeat.yml"

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

파일비트.inputs:

- 타입: 컨테이너
  경로:
  - '/var/lib/docker/containers/_/_.log'

프로세서:

- 도커 메타데이터 추가:
  호스트: "unix:///var/run/docker.sock"

출력.elasticsearch:
호스트: elasticsearch:9200
인덱스: - 인덱스: "docker-logs"

이 설정을 사용하면 다음과 같은 로그 데이터가 생성됩니다:

{
"\_index": "docker-logs",
"\_type": "\_doc",
"\_id": "kafMFZABr1cUle7yj2na",
"\_version": 1,
"\_score": 1,
"\_ignored": [
"message.keyword"
],
"\_source": {
"@timestamp": "2024-06-14T08:10:41.019Z",
"input": {
"type": "container"
},
"ecs": {
"version": "8.0.0"
},
"host": {
"name": "56438defcbd0"
},
"agent": {
"id": "5c4d1557-269c-49ff-a0b8-ac8915a6af8f",
"name": "56438defcbd0",
"type": "filebeat",
"version": "8.14.0",
"ephemeral_id": "d849fdeb-6afc-4a12-8242-0788015b2d44"
},
"container": {
"id": "56438defcbd0d0bc1cfc28a3ae145a73e4745473ca0a0bc2af2f0f437c8bbbb2",
... 이하 생략

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

위의 로그에는 몇 가지 불만스러운 점이 있습니다. 먼저, 모든 컨테이너의 로그가 단일 Elasticsearch "인덱스"로 (관계형 데이터베이스의 테이블과 대략적으로 유사한 개념) 모아지는 점입니다. 이로 인해 우리는 인덱스를 실제로 유용하게 활용할 수 없게 됩니다. 이 문제를 해결해 봅시다! 다음은 인덱스명에서 알고 싶은 내용에 대한 몇 가지 아이디어입니다:

- 로그를 생성한 서비스. 특정 서비스가 생성한 로그를 볼 수 있도록 하려면 필요합니다. container.name이 이 용도에 가장 적합해 보입니다. 인스턴스 인덱스(-1)가 추가되긴 하지만, 인덱스 패턴 생성 시 이 점을 고려해주기만 하면 됩니다.
- 로그를 생성한 서비스의 유형. 예를 들어, 유사한 로그를 생성하는 여러 서비스가 있다고 가정해봅시다, 예를 들어 HTTP API 서비스. 이러한 서비스들의 성능을 종합적으로 파악하려면 어떤 공통 인덱스 패턴으로 필터링할 수 있어야 합니다. Docker 라벨을 사용하여 이러한 서비스를 식별할 수 있습니다. 이를 family라고 부르겠습니다.
- 로그 생성 일자. 로그는 많은 공간을 차지하며 어느 정도 시간이 지난 후에는 더 이상 사용할 필요가 없어질 수 있습니다. 인덱스명에 날짜를 제공하면 인덱스 수명 주기 관리를 크게 단순화할 수 있습니다. 예전 인덱스를 삭제하는 등의 작업도 보다 간편해집니다.

다행히도, filebeat를 사용하면 %'[필드-이름]'과 같은 패턴을 사용하여 로그 필드를 기반으로 인덱스명을 동적으로 설정할 수 있습니다. 또한 현재 날짜를 사용할 수 있는 특수한 패턴도 있습니다: %'+yyyy.MM.dd'. 방금 논의한 부분을 포함한 샘플 인덱스 템플릿은 다음과 같습니다:

```js
docker-logs-%{[container.labels.family]}-%{[container.name]}-%{+yyyy.MM.dd}
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

그러나 당신이 주목할 수 있는 점은 우리의 로그에는 field container.labels.family가 없다는 것입니다. 따라서 우리가 가진 로그에 대해 템플릿이 "실패"할 것입니다. 그것을 어떻게 해결할까요? 인덱스가 작동하는 방식은 인덱스를 하나씩 적용해보는 것입니다. 그래서 우리는 쉽게 대체 템플릿을 제공할 수 있습니다. 아래는 최종 구성이 될 것입니다.

```js
output.elasticsearch:
  hosts: elasticsearch:9200
  indices:
    - index: "docker-logs-%{[container.labels.family]}-%{[container.name]}-%{+yyyy.MM.dd}"
    - index: "docker-logs-nofamily-%{[container.name]}-%{+yyyy.MM.dd}"
```

또한 단 하나의 컨테이너에만 family를 제공해보겠습니다. 예를 들어, kibana에 ui family를 부여해봅시다. 아래는 그 코드입니다.

```js
kibana:
    image: kibana:7.17.3
    labels:
      - family=ui
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - 5601:5601
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

그러면, docker-logs-ui-_ 인덱스 패턴을 사용하여 모든 UI 패밀리 로그, _-elasticsearch-\*를 사용하여 모든 엘라스틱서치 서비스 로그 등을 볼 수 있게 됩니다.

# 핵심 내용만 가져오기

우리가 배포한 모든 서비스가 단순한 텍스트 로그뿐만 아니라 JSON을 생성하는 것을 알 수 있습니다. 이것이 우리 스택에서 가장 강력한 능력일 것입니다: 구조화된 로깅. 이것은 메시지 JSON에서 필드를 추출하고 이를 대부분의 분석에 사용할 수 있다는 것을 의미합니다. 이것은 decode_json_fields라 불리는 프로세스에 의해 가능해집니다. 우리는 단순함을 위해 메시지 필드에서 JSON을 문서 루트("")로 디코딩할 것입니다. 아래는 구성 스니펫입니다:

yaml

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

여기서는 레코드에 더 유용한 필드가 많이 추가되었습니다. 그러나 일반적으로 많은 필드가 있기도 합니다. 솔직히 말해서 대부분은 유용하지 않아 보입니다. 다행히도, filebeat은 drop_fields라는 또 다른 유용한 프로세서를 제공합니다. 이를 사용하면 정확한 필드와 /regex/ 구문을 사용하여 필드 패턴을 지정할 수 있습니다. 아마도 로그를 가장 혼란스럽게 만드는 구성 요소는 컨테이너 레이블일 것입니다. 실제로 사용하는 'family' 레이블을 제외하고 모두 삭제해 보겠습니다.

이를 위한 정규 표현식은 container\.labels\..*\_.*입니다. 또한 에이전트 정보는 유용하지 않아 보입니다. 그에 대한 정규 표현식은 agent.\*입니다. 이 정리가 충분할 것 같습니다. 정규 표현식을 사용하지 않고 하나의 쓸모없는 필드를 제거해 보겠습니다. 'stream' 필드는 충분히 중복될 것 같습니다. 문서에 이미 해당 필드가 없는 경우에도 오류를 원하지 않을 것입니다. 따라서 ignore_missing을 true로 설정합니다. 그리고 이것이 우리가 얻은 구성입니다:

```js
- drop_fields:
    fields:
      - "/container\\.labels\\..*_.*/"
      - "/agent.*/"
      - "stream"
    ignore_missing: true
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

```yaml
# Wrapping It Up!

로그는 여전히 상당히 크지만, 이제는 주로 쓸모없는 도커 메타데이터가 아닌 실제 로그 메시지에서 유용한 데이터를 포함하고 있습니다. 우리가 가한 변화 이후의 compose.yaml 및 filebeat.yml의 내용은 다음과 같습니다:
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

```js
services:
  elasticsearch:
    image: elasticsearch:7.17.3
    environment:
      - discovery.type=single-node

  kibana:
    image: kibana:7.17.3
    labels:
      - family=ui
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - 5601:5601

  shipper:
    image: docker.elastic.co/beats/filebeat:8.14.0
    user: root
    volumes:
      - /var/lib/docker:/var/lib/docker:ro
      - ./filebeat.yml:/usr/share/filebeat/filebeat.yml
      - /var/run/docker.sock:/var/run/docker.sock
```

yaml

```js
filebeat.inputs:
- type: container
  paths:
    - '/var/lib/docker/containers/*/*.log'

processors:
- add_docker_metadata:
    host: "unix:///var/run/docker.sock"
- decode_json_fields:
    fields: ["message"]
    target: "x"
- drop_fields:
    fields:
      - "/container\\.labels\\..*_.*/"
      - "/agent.*/"
      - "stream"
    ignore_missing: true
output.elasticsearch:
  hosts: elasticsearch:9200
  indices:
    - index: "docker-logs-%{[container.labels.family]}-%{[container.name]}-%{+yyyy.MM.dd}"
    - index: "docker-logs-nofamily-%{[container.name]}-%{+yyyy.MM.dd}"
```

이런 설정을 통해 우리는 구조화된 로그를 Elasticsearch로 내보내어 제공된 로그로부터 상상할 수 있는 어떤 지표든 생성할 수 있게 되었습니다. 이를 통해 다양한 사용 사례를 위해 다양한 인덱스 패턴을 생성할 수 있게 되었습니다. 그리고 여기에 더하여, 쓸모 없는 데이터가 포함된 로그를 정리했습니다.

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

# 간편하게 해결할 수도 있어요...

만약 filebeat.yml 파일을 들고 다니기 귀찮다면 더 해줄 게 있어요! 비슷한 구성 파일이 포함된 도커 이미지를 만들었어요. 몇 가지 추가 혜택이 있는데요. el-shof라는 이미지를 만들었어요 (로그를 운반한다는 의미로 shippy와 docker와 연결되어 있어요, 즉 ship과 elastic에서 el을 딴 이름이에요). 아래에 있는 compose.yml 파일은 위의 두 파일과 거의 똑같은 스택을 배포하는 데 사용될 거예요.

```js
services:
  elasticsearch:
    image: elasticsearch:7.17.3
    environment:
      - discovery.type=single-node

  kibana:
    image: kibana:7.17.3
    labels:
      - family=ui
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - 5601:5601

  shipper:
    image: vosarat/el-shippy
    user: root
    environment:
      - ES_HOSTS=elasticsearch:9200
    volumes:
      - /var/lib/docker:/var/lib/docker:ro
      - /var/run/docker.sock:/var/run/docker.sock
```

읽어 주셔서 감사해요! 그리고요... 👉👈 박수는 환영이에요!
