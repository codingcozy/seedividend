---
title: "Docker Compose를 사용한 현지 MongoDB 복제 세트 가이드 이거 하나면 OK"
description: ""
coverImage: "/assets/img/2024-07-10-TheonlylocalMongoDBreplicasetwithDockerComposeguideyoulleverneed_0.png"
date: 2024-07-10 02:37
ogImage: 
  url: /assets/img/2024-07-10-TheonlylocalMongoDBreplicasetwithDockerComposeguideyoulleverneed_0.png
tag: Tech
originalTitle: "The only local MongoDB replica set with Docker Compose guide you’ll ever need!"
link: "https://medium.com/workleap/the-only-local-mongodb-replica-set-with-docker-compose-guide-youll-ever-need-2f0b74dd8384"
---


![이미지](/assets/img/2024-07-10-TheonlylocalMongoDBreplicasetwithDockerComposeguideyoulleverneed_0.png)

이 블로그 포스트에서는 로컬에서 MongoDB 레플리카 셋을 실행할 수 있는 다양한 Docker Compose 설정을 살펴볼 것입니다. 레플리카 셋은 MongoDB의 강력한 기능인 트랜잭션, 변경 스트림 또는 oplog에 액세스하는 것을 원하는 사람에게 필수적입니다. 로컬에서 MongoDB 레플리카 셋을 실행하면 이러한 기능들에 액세스할 뿐만 아니라 복제 메커니즘과 장애 허용성을 실험할 수 있는 일회용 샌드박스로도 활용할 수 있습니다. 더 이상 기다리지 말고 시작해봅시다!

# 단일 노드 레플리카 셋 설정

첫 번째 설정은 MongoDB 단일 노드 레플리카 셋을 몇 초 만에 실행할 수 있는 준비된 Docker Compose 파일입니다. 클라우드 환경에서는 고가용성 및 장애 허용성을 보장하기 위해 여러 노드가 필요합니다. 그러나 로컬 개발 환경에서는 단일 노드 레플리카 셋이 충분하며 트랜잭션 및 변경 스트림에 액세스할 수 있습니다. 이렇게 하면 MongoDB 인스턴스를 로컬에서 실행하는 데 필요한 CPU 및 메모리 리소스의 양을 줄일 수 있어 Google Chrome이 더욱 잘 작동합니다. 여기 단일 노드 레플리카 셋 rs0를 실행하는 docker-compose.yml 파일이 있습니다:

<div class="content-ad"></div>

```js
버전: "3.8"

서비스:
  mongo1:
    이미지: mongo:7.0
    명령: ["--replSet", "rs0", "--bind_ip_all", "--port", "27017"]
    포트:
      - 27017:27017
    추가_호스트:
      - "host.docker.internal:host-gateway"
    헬스체크:
      테스트: echo "try { rs.status() } catch (err) { rs.initiate({_id:'rs0',members:[{_id:0,host:'host.docker.internal:27017'}]}) }" | mongosh --port 27017 --quiet
      간격: 5초
      제한시간: 30초
      시작_기간: 0초
      시작_간격: 1초
      재시도: 30
    볼륨:
      - "mongo1_data:/data/db"
      - "mongo1_config:/data/configdb"

볼륨:
  mongo1_data:
  mongo1_config:
```

여기에 무슨 일이 일어나고 있는지 이해하는 데 시간을 투자해 봅시다. 먼저, 우리는 이 글을 작성할 당시의 최신 MongoDB Community Edition 이미지인 mongo:7.0 이미지를 사용하고 있습니다. 또한 --replSet 플래그를 사용하여 레플리카 셋의 이름인 rs0을 지정하고 있습니다. --bind_ip_all 플래그는 MongoDB 인스턴스를 모든 IPv4 주소에 바인딩하기 위해 사용되었고, --port 플래그는 MongoDB 인스턴스가 수신 대기할 포트를 지정하기 위해 사용되었습니다. 27017은 MongoDB의 기본 포트입니다. 또한, 컨테이너 포트 27017을 호스트 포트 27017에 매핑하여 호스트 머신에서 MongoDB 인스턴스에 연결할 수 있도록 하고 있습니다. extra_hosts 섹션은 host.docker.internal 호스트 이름을 호스트 머신의 IP 주소로 매핑하는 데 사용되었습니다.

헬스체크 기능은 우리의 설정에서 레플리카 셋을 초기화하는 데 재사용되었습니다. 레플리카 셋은 rs.initiate() mongosh 명령을 사용하여 초기화되어야 합니다 (이는 replSetInitiate 데이터베이스 명령의 동등한 역할을 합니다). 이 작업은 MongoDB 인스턴스가 시작되는 동안 실패할 수 있기 때문에 헬스체크 기능을 사용하여 작업이 성공할 때까지 재시도하고 있습니다. Docker의 헬스체크는 시작 단계에서 약간 더 공격적일 수 있도록 해줍니다. 따라서 start_interval은 1초로 설정되어 있습니다. 안타깝게도 start_interval은 아직 Docker Compose에서 지원되지 않았으나 사양의 일부입니다. 이 기능에 대한 진행 상황은 해당 GitHub 이슈에서 확인할 수 있습니다. 그동안 일반적인 간격을 5초로 설정하였는데, 이는 너무 공격적이지 않으면서도 너무 오랜 시간을 기다리지 않는 중간 단계입니다. 그러나 start_interval이 구현되면 간격 값을 몇 분 동안 높일 수 있습니다.

여기서는 rs.status()를 사용했습니다. 왜냐하면 레플리카 셋이 초기화되지 않은 경우 예외를 throw하기 때문에 이를 이용하여 레플리카 셋을 초기화할 때까지 rs.initiate()를 호출하는 데 편리합니다. 이후에는 주기적으로 rs.status()를 호출해도 비용이 많이 들지 않습니다. 또한 여기에서 의도한 대로 헬스체크가 작동하는 이유는 우리가 bash 명령이 성공적인 종료 코드를 반환할 것으로 예상하기 때문에, 이는 처음으로 레플리카 셋을 초기화하거나 이미 초기화된 상태일 때에만 발생합니다.


<div class="content-ad"></div>

마지막으로, 우리는 mongo1_data라는 Docker 볼륨에 데이터를 지속합니다. 이것은 컨테이너가 중지될 때 데이터가 손실되지 않도록 하는 가장 좋은 방법입니다. 또 다른 볼륨 mongo1_config는 복제 세트 구성을 지속하는 데 사용됩니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*4FJZGrr5m7VuvOk-SmYxcg.gif)

이 싱글 노드 MongoDB 복제 세트에 액세스하기 위한 연결 문자열은 다음과 같습니다:

```js
mongodb://127.0.0.1:27017/?replicaSet=rs0
```

<div class="content-ad"></div>

# 쓰리 노드 복제 세트 설정

이전에 언급했듯이 싱글 노드 복제 세트는 로컬 개발에는 충분합니다. 그러나 고가용성 및 내결함성 실험을 하려면 여러 노드가 필요합니다. MongoDB 문서에서는 프로덕션 환경에서 적어도 세 개의 노드를 추천합니다. 첫 번째 컨테이너는 주 노드가 되고, 다른 두 컨테이너는 보조 노드가 될 것입니다. 여기 rs0라는 이름의 쓰리 노드 복제 세트를 사용할 수 있게 해주는 docker-compose.yml 파일이 있습니다:

```js
version: "3.8"

services:
  mongo1:
    image: mongo:7.0
    command: ["--replSet", "rs0", "--bind_ip_all", "--port", "27017"]
    ports:
      - 27017:27017
    extra_hosts:
      - "host.docker.internal:host-gateway"
    healthcheck:
      test: echo "try { rs.status() } catch (err) { rs.initiate({_id:'rs0',members:[{_id:0,host:'host.docker.internal:27017',priority:1},{_id:1,host:'host.docker.internal:27018',priority:0.5},{_id:2,host:'host.docker.internal:27019',priority:0.5}]}) }" | mongosh --port 27017 --quiet
      interval: 5s
      timeout: 30s
      start_period: 0s
      start_interval: 1s
      retries: 30
    volumes:
      - "mongo1_data:/data/db"
      - "mongo1_config:/data/configdb"

  mongo2:
    image: mongo:7.0
    command: ["--replSet", "rs0", "--bind_ip_all", "--port", "27018"]
    ports:
      - 27018:27018
    extra_hosts:
      - "host.docker.internal:host-gateway"
    volumes:
      - "mongo2_data:/data/db"
      - "mongo2_config:/data/configdb"

  mongo3:
    image: mongo:7.0
    command: ["--replSet", "rs0", "--bind_ip_all", "--port", "27019"]
    ports:
      - 27019:27019
    extra_hosts:
      - "host.docker.internal:host-gateway"
    volumes:
      - "mongo3_data:/data/db"
      - "mongo3_config:/data/configdb"

volumes:
  mongo1_data:
  mongo2_data:
  mongo3_data:
  mongo1_config:
  mongo2_config:
  mongo3_config:
```

이 구성에서 주 노드를 중지시켜서 보조 노드가 새 주 노드를 선택하는 과정을 확인해 볼 수 있습니다. 여기서 mongo1 컨테이너에 대해 다른 두 컨테이너보다 우선순위를 조금 더 부여했습니다. 이렇게 함으로써 레플리카 세트가 완전히 기능할 때 mongo1 컨테이너가 주 노드로 선출되도록 보장합니다.

<div class="content-ad"></div>

보조 노드 중 하나를 중지시켜도 레플리카 세트가 계속 작동하는지 확인할 수 있어요. 또한 모든 노드를 중지시켜 레플리카 세트가 어떻게 작동을 멈추는지 확인할 수도 있어요. 이것은 내구성과 고가용성을 실험해 볼 수 있는 좋은 방법이에요. `rs.status()` 명령을 이용하여 레플리카 세트 상태를 조회하고 주(primary) 노드가 어느 것인지 확인하세요.

![image](https://miro.medium.com/v2/resize:fit:1400/1*w9Oxx6FtrIJ4SMj2ySOApA.gif)

세 노드 레플리카 세트 연결 문자열은:

```js
mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/?replicaSet=rs0
```

<div class="content-ad"></div>

# 연결 문제 해결하기

![이미지](/assets/img/2024-07-10-TheonlylocalMongoDBreplicasetwithDockerComposeguideyoulleverneed_1.png)

만약 MongoDB 레플리카 셋에 연결하는 데 문제가 있다면, Docker가 실행 중인지 확인해주세요. 또한 host.docker.internal 호스트 이름이 호스트 컴퓨터의 IP 주소로 해석되는지도 확인해주세요.

Windows에서는 호스트 파일에 *.docker.internal 호스트 이름을 자동으로 추가하는 설정이 있습니다.

<div class="content-ad"></div>

만일 Linux에서 host.docker.internal을 해석할 수 없을 때, host.docker.internal을 IP 주소 127.17.0.1로 매핑하기 위해 /etc/hosts 파일에 라인을 추가해야 합니다.

# healthcheck에 대한 추가 노트

여기서 레플리카 세트를 초기화하는 데 healthcheck을 사용하는 장점은 docker-compose.yml 파일이 자체 포함되어 있다는 것입니다. 레플리카 세트를 수동으로 초기화하는 것을 선호한다면, healthcheck 섹션을 제거하고 rs.initiate() mongosh 명령을 사용하여 레플리카 세트를 초기화할 수 있습니다.

```js
docker compose exec mongo1 mongosh --port 27017 --quiet --eval "rs.initiate({...})" --json relaxed
```

<div class="content-ad"></div>

그러나 docker-compose.yml 파일을 사용할 모든 개발자들은 이 작업을 최소 한 번씩은 기억해야 할 것입니다.