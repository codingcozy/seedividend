---
title: "Kafka Streams  여러 데이터 스트림을 마법처럼 조인하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_0.png"
date: 2024-07-09 21:34
ogImage: 
  url: /assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_0.png
tag: Tech
originalTitle: "Kafka Streams — How to magically join multiple data streams"
link: "https://medium.com/@gavinklfong/kafka-streams-marvellous-real-time-multiple-data-streams-processing-cf30327aa515"
---


![image](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_0.png)

현대 소프트웨어 아키텍처에서 데이터 스트리밍은 중요한 역할을 합니다. 데이터 분석과 보고서 생성뿐만 아니라 데이터 스트림을 소비하고 처리하여 실시간으로 출력물을 생성하는 시스템 프로세스 실행의 흐름을 나타냅니다.

카프카 덕분에 실시간 데이터 스트림 처리를 손쉽게 구축할 수 있습니다. 또한 여러 데이터 스트림을 결합하여 복잡한 데이터 처리를 할 수 있습니다.

빠른 연습을 해봅시다.

<div class="content-ad"></div>

대출 심사 로직은 고객이 충분한 잔고 금액을 갖고 있는 경우 대출 요청을 승인합니다. 그렇지 않으면 요청은 거부됩니다.

계좌 잔액과 대출 요청의 데이터 스트림이 주어졌을 때, 요청을 실시간으로 처리하는 로직을 어떻게 구현하나요?

새로운 대출 요청이 제출되면 시스템 로직이 트리거되어 즉시 평가 결과를 실시간으로 출력합니다. 즉시 대출 승인은 많은 금융 기관에서 고객을 유치하기 위해 광고하는 강력한 기능이자 장점입니다. 우리가 해결하려는 문제는 다중 데이터 스트림에서 시스템 로직 출력을 처리하는 방법입니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_1.png)

단순히 데이터 스트림을 병합하는 것은 쉽지만 작동하지 않습니다. 계좌 잔액 데이터 스트림은 계좌 잔액의 변경 사항을 기록한 것입니다. 대출 요청이 제출되면 데이터 스트림에서 최신 잔액 레코드를 검색해야 하지만 최신 값을 어떻게 얻을 수 있을까요?

![이미지](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_2.png)

일반적인 방법은 계좌 잔액 데이터 스트림을 로컬 데이터베이스 테이블로 구성하여 최신 계좌 잔액의 사본을 유지하는 것입니다. 새로운 대출 요청이 제출될 때마다 평가 로직은 처리를 위해 잔액을 조회합니다.


<div class="content-ad"></div>


![이미지](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_3.png)

싱크 커넥터의 사용은 데이터 스트림을 로컬 데이터 저장소에 자료화시키는 편리한 방법입니다. 로컬 데이터 테이블에 데이터를 로드함으로써 시스템 로직을 데이터 스트림과 분리하는 이점을 얻을 수 있습니다. 계좌 잔고의 데이터 소스를 유연하게 전환할 수 있으며 대출 평가 로직에 영향을 미치지 않습니다.

![이미지](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_4.png)

이전에 작성한 글 'Kafka Streams - 카프카 데이터 스트림을 이용해 마이크로 서비스를 유연하게 연결하는 방법'에서는 대출 평가 로직을 위한 싱크 커넥터 설정의 단계별 구현 방법을 보여줍니다.


<div class="content-ad"></div>

이해하려고 하고 계신 것 같아요! 싱크 커넥터와 로컬 데이터 테이블 사용 없이 이 문제를 간단하게 처리할 수 있는 방법이 있을까요?

싱크 커넥터를 사용하지 않고도 데이터 스트림을 소재화할 수 있는 방법으로, Kafka Streams API를 사용하여 KTable로 변환하는 방법이 있습니다. Kafka Streams는 실시간 데이터 스트림 처리를 위한 고급 시스템 로직 구현을 지원하는 강력한 프레임워크입니다.

Kafka Streams를 사용하여 데이터 스트림을 처리하는 애플리케이션을 토폴로지라고 합니다. 아래 다이어그램은 대출 심사를 위한 KTable 및 Join 작업을 사용하는 Loan Evaluation Topology에서 대출 요청과 계좌 잔액 데이터 스트림을 결합하는 방법을 보여줍니다.

본 문서에서는 여러 데이터 스트림을 처리하고 결합하는 Kafka 토폴로지를 구축하는 방법을 안내해 드리겠습니다.

<div class="content-ad"></div>

![image](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_5.png)

카프카 스트림을 처음 시작하는 경우, 먼저 주식 가격 처리를 위해 카프카 스트림을 구축하는 6가지 단계를 살펴보는 것을 추천드립니다. 이를 통해 카프카 스트림의 기본 개념과 실제 예제를 얻을 수 있습니다.

# 데모 환경 설정

대출 요청 평가를 위한 카프카 토폴로지 구현을 살펴보기 전에, 계정 잔액을 생성하는 트랜잭션 데이터 흐름을 시뮬레이션하는 로컬 환경을 먼저 설정합니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_6.png" />

카프카 시작

```js
docker run -e ADV_HOST=127.0.0.1 -e SAMPLEDATA=0 \
-e RUNTESTS=0 -p 3030:3030 -p 9092:9092 \
--rm landoop/fast-data-dev:latest
```

거래 데이터 스트림을 기반으로 계정 잔액이 생성됩니다. 따라서 다음 단계는 거래 프로듀서를 시작하는 것입니다.

<div class="content-ad"></div>

```js
도커를 실행하여 트랜잭션 프로듀서를 시작하십시오.

도커 실행 --rm --net=host \
--name transaction-producer \
whalebig27/transaction-producer:latest

그런 다음, 계정 잔액 계산 토폴로지를 시작하십시오.

도커 실행 --rm --net=host \
--name account-balance-calculation-topology \
whalebig27/account-balance-calculation-topology:latest

마지막으로, 대출 요청 API를 실행하여 REST 요청 시 Kafka 토픽으로 대출 요청을 발행하십시오.  

<div class="content-ad"></div>

docker run --rm --net=host \
--name loan-request-api \
whalebig27/loan-request-api:latest

모든 도커 컨테이너가 실행되면 Kafka 웹 UI (http://localhost:3030/kafka-topics-ui/#/)로 이동하시면 3개의 Kafka 토픽이 생성되어 있고 transactions 및 account-balances 토픽에 레코드가 있는 것을 확인할 수 있습니다.

![이미지](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_7.png)

# 대출 평가 토폴로지
```

<div class="content-ad"></div>

그럼 대출 평가 토폴로지 내에서 데이터 흐름을 살펴보겠습니다. 이는 카프카 토픽 loan-requests와 account-balances에서 2개의 데이터 스트림을 사용합니다.

계정 잔액 데이터 스트림은 최신 계정 잔액을 저장하는 KTable로 구성됩니다. 이어서 대출 요청 데이터 스트림은 계정 잔액 KTable과 left join을 수행하고 대출 평가를 진행합니다. 평가 결과는 loan-evaluation-results 카프카 토픽으로 출력됩니다.

만약 KTable과 join 연산에 익숙하지 않다면 걱정하지 마세요. 다음 섹션에서 자세히 설명해 드리겠습니다.

<div class="content-ad"></div>

# KTable이란?

KTable은 데이터 스트림의 추상화이며 레코드 키별로 최신 레코드를 저장합니다. 로컬 데이터 저장소로의 데이터 싱크와 유사하게, KTable은 데이터 스트림의 재료화된 뷰입니다. 새로운 계좌 잔고가 도착할 때마다, 최신 값이 KTable에 업데이트됩니다. 데이터 스트림 프로세서는 레코드 키(즉, 계좌 번호)를 통해 최신 잔고를 찾아볼 수 있습니다.

아래 다이어그램은 Kafka 주제에 새 계좌 잔액이 발행될 때 KTable에서 레코드 업데이트를 보여줍니다.

![다이어그램](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_9.png)

<div class="content-ad"></div>

## KTable의 데이터 저장

싱크 커넥터는 데이터 스트림을 외부 데이터 저장소로 구현하는 반면, KTable은 Topology 인스턴스의 로컬 디스크인 RocksDB에 지속되며 내부 Kafka 토픽에도 저장됩니다.

로컬 디스크는 일시적일 수 있지만, 토폴로지 인스턴스가 다시 시작되면 내부 Kafka 토픽에서 데이터를 복구할 수 있습니다. RocksDB에 데이터를 저장하는 것 외에도, 메모리 저장소나 외부 데이터 저장소와 같은 다른 데이터 저장 옵션이 있습니다.

Kafka의 고도로 확장 가능한 기능을 상속받았기 때문에, 레코드는 키별로 파티셔닝됩니다. 파티션은 Kafka 스트림 토폴로지 인스턴스에 할당됩니다. 각 토폴로지 인스턴스의 KTable은 전체 토픽의 샤드를 저장합니다.

<div class="content-ad"></div>

예를 들어, 계정 잔액은 2개의 파티션을 가진 account-balances Kafka 주제를 위해 별도의 2개의 토폴로지 인스턴스로 구현될 수 있습니다.

![이미지](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_10.png)

# 데이터 스트림 소비

Kafka 주제에 메시지가 발행되면 레코드는 바이트 배열로 직렬화됩니다. 주제에서 데이터를 소비할 때는 바이트 배열을 원래 데이터 객체로 변환하기 위해 역직렬화가 필요합니다.

<div class="content-ad"></div>

예를 들어, 레코드는 Kafka 토픽에 발행될 때 JSON 문자열로 직렬화됩니다. 반대로, 소비자가 레코드를 읽을 때 JSON 데이터는 데이터 객체로 구문 분석되어야 합니다.

따라서 Kafka 스트림에서 데이터를 소비하기 위해 Serde(직렬화/역직렬화)가 Consumed.with()를 사용하여 지정된 것을 볼 수 있습니다. 샘플 구현은 AVRO 형식을 사용하여 데이터를 형식화하며, 작동 방식에 관심이 있는 경우 전체 소스 코드를 확인해보세요.

다음의 샘플 코드는 Kafka 토픽 loan-requests 및 account balances를 소비합니다.

loan-requests 토픽을 소비하는 KStream을 정의하세요.

<div class="content-ad"></div>


KStream<Account, LoanRequest> loanRequests = 
     builder.stream("loan-requests",
       Consumed.with(TransactionSerdes.accountKey(), 
                     TransactionSerdes.loanRequest()))


계정 잔액 토픽을 소비하고 toTable() 작업을 사용하여 KTable로 변환합니다. Kafka Streams에서는 Kafka 토픽의 데이터를 읽고 쓸 수 있도록 SerDe의 정의가 필요합니다.

changelogs를 위해 내부 Kafka 토픽이 생성되므로 Materialize.as()를 사용하여 메시지 키 및 값에 대해 SerDe가 지정됩니다.


KTable<Account, AccountBalance> accountBalanceTable = 
    builder.stream("account-balances",
      Consumed.with(TransactionSerdes.accountKey(), 
                    TransactionSerdes.accountBalance()))
      .toTable(Materialized.<Account, AccountBalance, 
               KeyValueStore<Bytes, byte[]>>as("account-balances-table")
               .withKeySerde(TransactionSerdes.accountKey())
               .withValueSerde(TransactionSerdes.accountBalance()))


<div class="content-ad"></div>

# 데이터 스트림을 함께 조인하기

조인 작업은 Kafka Streams의 재미있는 기능 중 하나로, 놀랍도록 2개의 데이터 스트림을 레코드 키로 조합하여 새로운 출력을 생성하는 시스템 로직을 실행합니다.

이 아이디어는 SQL 문에서의 테이블 조인과 유사합니다. Kafka Streams는 내부 조인, 왼쪽 조인 및 외부 조인을 지원합니다. 조인 작업은 레코드 키를 기반으로 하며, 레코드가 동일한 레코드 키를 가진 데이터끼리 조인됩니다.

거래 내역이 없는 새로 개설된 계정의 계정 잔액은 사용할 수 없습니다. 따라서, 해당 계정에 대한 계정 잔액 KTable에는 항목이 없습니다.

<div class="content-ad"></div>

대출 요청이 위 계정에 제출된 경우 어떻게 될까요? 안내 조인을 적용하면 카프카 스트림이 KTable에서 계정 잔고 항목을 찾지 못하여 대출 요청이 거부되기 대신 대기 중이 됩니다.

따라서 이 예에서는 대출 평가를 위해 왼쪽 조인을 사용해야 합니다. 아래 SQL 문을 적용하여 조인 작업을 수행할 수 있습니다.

```js
SELECT *
FROM Loan Request (KStream) as loan
LEFT OUTER JOIN Account Balance (KTable) as balance 
ON loan.key = balance.key
```

거래가 게시되고 계정 잔고가 생성된 경우 대출 요청과 계정 잔고를 결합하여 대출 평가 논리에 입력할 수 있습니다.

<div class="content-ad"></div>


![Kafka Streams Image 11](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_11.png)

계좌 잔액이 존재하지 않는 경우, Left Join을 사용하여 출력을 null 값으로 생성할 수 있습니다.

![Kafka Streams Image 12](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_12.png)

Kafka Streams에서 leftJoin()을 사용하여 Left Join 작업을 수행하세요. 출력은 다른 메소드 호출 LoanEvaluationTopology:evaluate로 전달되어 대출 평가를 수행합니다.


<div class="content-ad"></div>

Kafka Streams는 KStream-KTable 조인에 추가로 KStream-KStream 및 KTable-KTable 조인도 지원합니다.

결과는 `to()` 작업을 사용하여 Kafka 주제 `loan-evaluation-results`에 출력됩니다. 토픽 소비를 위해 `Consumed.with()` 사용 방식과 유사하게, 데이터 직렬화를 위해 Kafka에 메시지를 발행할 때 SerDe가 `Produced.with()`에 제공됩니다.

```js
loanRequests.leftJoin(accountBalanceTable, 
                      LoanEvaluationTopology::evaluate)
       .to("loan-evaluation-results",
                Produced.with(
                          TransactionSerdes.accountKey(), 
                          TransactionSerdes.loanResponse()));
```

전체 소스 코드는 해당 GitHub 저장소를 방문하여 확인하세요.

<div class="content-ad"></div>

# 데모 환경에서 대출 평가 토폴로지 실행하기

이제 이 도커 이미지를 실행하여 대출 평가 토폴로지를 시작하세요:

```js
docker run --rm --net=host \
--name loan-evaluation-topology \
whalebig27/loan-evaluation-topology:latest
```

그런 다음, $100 및 $90,000의 금액에 대한 2개의 대출 요청을 제출하여 대출 평가 논리를 테스트해 보겠습니다.

<div class="content-ad"></div>

```js
curl --request POST \
  --url http://localhost:8004/loans \
  --header 'Content-Type: application/json' \
  --data '{
    "account": "001-00101",
    "amount": 100
}'

curl --request POST \
  --url http://localhost:8004/loans \
  --header 'Content-Type: application/json' \
  --data '{
    "account": "001-00101",
    "amount": 90000
}'
```

대출 심사 결과는 대출-심사-결과 주제에 표시됩니다. $100 대출 신청은 승인되었고 $90,000은 거부되었습니다.

Amount 필드는 BigDecimal 데이터 타입 때문에 표시할 수 없는 문자로 표시됩니다.

<img src="/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_13.png" />


<div class="content-ad"></div>

`account-balances-table`이란 이름의 KTable이 지정되었습니다. 이 네이밍 규칙에 따라 내부 Kafka 토픽이 생성될 것입니다: `topology name`-`KTable name`-changelog. KTable 소개 부분에서 언급했듯이, 이 토픽의 목적은 필요한 경우 토폴로지 인스턴스의 로컬 KTable을 복구하는 것입니다.

![이미지](/assets/img/2024-07-09-KafkaStreamsHowtomagicallyjoinmultipledatastreams_14.png)

## 마무리

Kafka Streams는 데이터 처리를 위한 개발자 친화적인 DSL을 제공합니다. 이 글은 데이터 스트림을 구현하고 여러 스트림을 결합하여 고급 로직을 구현하는 기술을 보여줍니다.

<div class="content-ad"></div>

토폴로지에서 KTable 및 Join 사용은 싱크 커넥터 및 로컬 데이터 스토어보다 간단한 솔루션입니다. 그러나 데이터를 특정 시나리오에 따라 로컬 데이터베이스로 싱크해야 할 수도 있습니다. 예를 들어 데이터에서 복잡한 쿼리를 실행해야 하는 경우입니다.

더 많은 Kafka Streams 예제를 찾고 있다면, Kafka Streams — 실시간 주식 가격의 이동 평균을 계산하는 방법을 살펴보세요. 이 예제는 Kafka Streams에서 KTable, 데이터 그룹화 및 시간 윈도우를 보여줍니다.

전체 소스 코드는 이 GitHub 저장소를 방문하시기 바랍니다.