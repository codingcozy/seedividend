---
title: "UUID7이 RDBMS에서 클러스터드 인덱스로 UUID4보다 더 나은 이유"
description: ""
coverImage: "/assets/img/2024-06-22-WhyUUID7isbetterthanUUID4asclusteredindexinRDBMS_0.png"
date: 2024-06-22 05:23
ogImage:
  url: /assets/img/2024-06-22-WhyUUID7isbetterthanUUID4asclusteredindexinRDBMS_0.png
tag: Tech
originalTitle: "Why UUID7 is better than UUID4 as clustered index in RDBMS"
link: "https://medium.com/itnext/why-uuid7-is-better-than-uuid4-as-clustered-index-edb02bf70056"
isUpdated: true
---

데이터베이스 색인 소개 기사에서는 데이터베이스 인덱스, 그 종류, 표현 방법 및 사용 사례에 대해 논의했습니다.

이 기사에서는 클러스터링된 인덱스로서 더 나은 성능을 발휘하는지 확인하기 위해 UUID 버전 4 대 UUID 버전 7 또는 6의 실험을 진행할 것입니다. 그런 다음 그 이유에 대해 논의할 것입니다.

# UUID 버전 4란?

UUID는 `Universally Unique Identifier`의 약자로, 대시로 구분된 문자와 숫자의 32자 시퀀스로 표현되는 128비트 식별자입니다. '8-4-4-4-12' 형식으로 포맷되며, "123e4567-e89b-12d3-a456-426655440000"와 같이 UUID 버전 4의 구조는 각 문자가 '1'에서 'f'까지의 16진수 값을 보여줍니다. 완전히 무작위로 생성되었던지 아니면 유사 난수 생성기를 통해 생성되었던지에 관계없이, UUID 버전 4는 그 독특한 고유성을 유지합니다.

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

참고 자료 #2에서 자세한 계산 내용을 찾을 수 있어요.

# UUID 버전 7이 무엇인가요?

UUID v7은 UUID v4와 유사한 128비트 식별자로, 문자와 숫자의 32글자 시퀀스로 표시되며, 8-4-4-4-12 형식으로 구성됩니다. UUID v7의 독특한 특징은 Unix 타임스탬프를 밀리초 단위로 가장 유의미한 48비트에 인코딩하는 시간순서 UUID로 있는 것입니다. UUID 형식에 따라 4비트는 UUID 버전을 지정하고, 2비트는 변형을 나타냅니다. 나머지 74비트는 무작위로 생성되어 이 식별자의 고유성에 기여합니다.

![이미지](/assets/img/2024-06-22-WhyUUID7isbetterthanUUID4asclusteredindexinRDBMS_0.png)

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

# 왜 UUID를 사용해야 할까요?

UUID와 연속적인 ID를 비교한 장단점을 알아보겠습니다.

- 장점:

1. 충돌 확률 낮음: UUID는 구조상 충돌 확률이 매우 낮아서 서버가 레코드 삽입 전에 ID를 생성할 수 있습니다.
2. 분산 시스템에 적합: UUID는 분산 데이터베이스 및 시스템에 적합하며 서버에서 독립적으로 생성할 수 있습니다.
3. 향상된 보안: UUID는 레코드를 익명으로 유지하여 사용자(또는 악성 주체)가 레코드 생성 순서에 대한 정보를 유추하는 것을 방지하여 데이터베이스 보안에 기여합니다.

- 단점:

1. 저장 공간 증가: UUID는 전통적인 ID(예: INT에 4바이트 또는 BIGINT에 8바이트)보다 더 많은 공간(16바이트)을 차지합니다.
2. 수동 데이터 입력의 어려움: UUID의 복잡성으로 인해 수동 데이터 입력이 어려울 수 있습니다.
3. 쿼리 성능 감소: 큰 UUID 크기는 쿼리 성능을 감소시킵니다. 레코드 크기의 증가로 인해 데이터베이스 페이지 당 저장되는 레코드가 줄어들어 I/O 작업이 늘어나고 전체적인 성능이 감소합니다.
4. 인덱스와 데이터 단편화: UUID는 인덱스 및 데이터 단편화에 영향을 줄 수 있어 데이터베이스 효율성에 영향을 미칠 수 있습니다.

# 실험을 시작해봅시다!

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

## 개요:

이 실험에서는 MySQL, Docker, Node 및 Go를 사용합니다.
MySQL을 실행하고 구성하며 데이터를 볼륨에 저장하는 docker-compose 파일을 만들었습니다 (이 실험 후에는 이 볼륨을 자동으로 정리합니다).

참고: MySQL은 기본적으로 기본 키에 대해 클러스터화된 인덱싱을 사용하므로 PostgreSQL에는 없는 기능이기 때문에 MySQL을 선택했습니다.

노드.js 스크립트와 Go를 사용하여 100만 개의 레코드를 하나씩 삽입하여 삽입 성능을 테스트할 것입니다 (대량 사용 시 DB 엔진이 레코드를 정렬하고 실험을 망칠 수 있습니다). Go와 고루틴을 사용하여 여러 서버가 하나의 DB에 연결하여 200만 개의 레코드를 삽입하는 시나리오를 시뮬레이션할 것입니다. 코어 당 1개의 스레드를 실행하여 7개의 스레드를 실행합니다. 도커 데몬을 실행할 코어는 1개가 남도록합니다.

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

실험에서는 채팅 데이터베이스를 시뮬레이션했습니다. "chat_messages"라는 테이블 하나만 가지고 있으며 id, chat_id, sender_id, message 및 created_at이라는 열이 있습니다. id, chat_id 및 sender_id의 유형은 데이터를 Integer 또는 UUID v4 또는 UUID v7로 입력하는 방식에 따라 INT에서 BINARY(16)으로 다양합니다.

## 메모:

- 저는 삽입 시간을 애플리케이션 수준에서 측정했습니다. 이 방법이 가장 정확한 방법은 아니며 트리거 또는 저장 프로시저를 사용할 수도 있지만, 이 방법이 더 빨랐습니다. 실험을 한 번 이상 반복하고 서로 다른 기계 및 프로그램(node 및 go)에서 수행하여 결과가 유사한 것으로 확인했습니다.
- 실험은 전용 기계에서 진행되었으며 실험 과정 중 시스템 자원이 동시에 사용되지 않도록 보장했습니다. 이러한 의도적인 격리는 측정된 삽입 시간에 영향을 줄 수 있는 외부 요소를 최소화하여 결과의 신뢰성을 향상시킵니다.

## 단계:

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

위 실험의 개요를 아래와 같이 정리해 봤어요:

- 도커 컴포즈 파일 실행
- 데이터베이스에 연결
- chat_messages 테이블 생성 (UUID v4)
- 레코드 삽입 및 시간 측정 (모든 삽입의 합) (UUID v4)
- 도커 중지 및 볼륨 삭제 (UUID v7 삽입에 영향을 주지 않기 위해 매우 중요)
- 이후 1초 대기 (시스템이 메모리와 스왑을 청소할 수 있도록)
- chat_messages 테이블 생성 (UUID v7)
- 레코드 삽입 및 시간 측정 (UUID v7)
- 도커 중지 및 볼륨 삭제
- 이후 1초 대기
- chat_messages 테이블 생성 (정수)
- 레코드 삽입 및 시간 측정 (정수)
- 도커 중지 및 볼륨 삭제
- 이후 1초 대기

만약 원하신다면 이 리포지토리를 복제하고 실험을 직접 실행해 보실 수 있어요.

## 결과:

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

노드 프로세스가 100만 개의 레코드를 삽입하는 중입니다:
UUIDV4: 24345338.406382076
UUIDV7: 23579840.35688359
INT: 23678315.194741927
UUID V4 / UUID V7 비율: 1.0324640895745087

여기서도 UUID V4가 UUID V7보다 3% 더 많은 시간을 소요한 것을 볼 수 있어요.

GoLang 프로세스가 100만 개의 레코드를 삽입 중입니다:
UUIDV4: 2.6320770985406373e+07
UUIDV7: 2.5592608053863425e+07
INT: 2.5759889825318027e+07
UUID V4 / UUID V7 비율: 1.0284520799916297

여기서도 UUID V4가 UUID V7보다 3% 더 많은 시간을 소요한 것을 볼 수 있어요.

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

7개의 스레드로 5백만 개의 레코드를 삽입하는 MultiThreaded Go 프로그램:
8개의 코어를 사용하기 때문에 각 스레드를 하나의 코어에 고정시키려고 시도했습니다.

UUID V4: 20634873.5100111 밀리초
UUID V7: 16750775.02223781 밀리초
INT: 164567295.36401817 밀리초
UUID V4 / UUID V7 백분율: 1.2318757479947573

여기서 UUID v4가 UUID v7보다 약 23.1% 더 오래 걸렸음을 볼 수 있습니다.
그리고 정수보다 약 25.3% 더 오랜 시간이 걸렸습니다. (결과가 한 번 실행에서 다른 결과가 나올 수 있다는 점을 유의해 주세요)

# UUID v7이 UUID v4보다 왜 더 빨랐을까요?

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

## 인덱스 지역화:

공유된 이해를 확립하기 위해, 참조된 기사에서 이전에 소개된 개념인 클러스터형 인덱스를 다시 살펴보겠습니다. 클러스터형 인덱스의 저장 메커니즘은 결과를 이해하는 데 중요합니다.

클러스터형 인덱스는 어떻게 저장되나요?

각 데이터 조각이 페이지에 저장된다고 언급했습니다. 그런 다음 인덱스는 페이지 내에 b+ 트리로 저장됩니다. 이것은 인덱스 내의 키가 정렬되어 있다는 것을 의미합니다. 따라서 새 키를 기존 키 사이에 삽입하는 경우에는 저장된 인덱스의 재조직이 필요합니다. 이 재조직 프로세스에는 여러 페이지를 검색하고 해당 페이지를 읽은 다음 새 페이지를 삽입하면서 다음 및 이전 포인터를 조정하는 작업이 포함될 수 있습니다 (페이지를 분할하는 대신).

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

![Link to WhyUUID7isbetterthanUUID4asclusteredindexinRDBMS_1.png](/assets/img/2024-06-22-WhyUUID7isbetterthanUUID4asclusteredindexinRDBMS_1.png)

![Link to WhyUUID7isbetterthanUUID4asclusteredindexinRDBMS_2.png](/assets/img/2024-06-22-WhyUUID7isbetterthanUUID4asclusteredindexinRDBMS_2.png)

새 레코드 ID 8이 추가되었음을 알 수 있습니다. Figure 4에서 10, 15, 및 20을 포함하는 페이지가 분할되었습니다. 이 과정에서 데이터 페이지도 분할되었음을 강조해야 합니다.

![Link to WhyUUID7isbetterthanUUID4asclusteredindexinRDBMS_3.png](/assets/img/2024-06-22-WhyUUID7isbetterthanUUID4asclusteredindexinRDBMS_3.png)

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

앞서 말한 대로, 비순서화된 ID가 성능에 어떤 영향을 미칠 수 있는지 짐작할 수 있게 되었습니다.

UUID v4 ID는 서로 상관관계가 없어서, 완전히 무작위한 성격 때문에 인덱스 지역성이 떨어집니다. 따라서 새로 생성된 UUID v4가 이전 것보다 낮은 Hex 값일 수 있습니다. 클러스터 인덱스를 사용하고 있기 때문에, 원하는 순서를 유지하기 위해 새로 생성된 UUID v4를 이전 것보다 앞에 위치시키는 것이 필요합니다.

UUID v7와 달리, 시간 기반 성격으로 내재적으로 정렬되어 있습니다. 이것은 값이 거의 순차적으로 생성되어 마지막 페이지 끝에 일관되게 삽입된다는 것을 의미합니다(모든 서버가 동기화되어 있다면). 이 특성은 인덱스 지역성 문제를 효과적으로 해결합니다.

## 버퍼 풀:

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

만약 이 개념이 처음이라면 빠르게 소개해 드리겠습니다.
데이터베이스 엔진은 우리의 기기에서 다른 실행 중인 프로세스와 마찬가지로 무한한 메모리를 갖고 있지 않습니다. 그들은 OS로부터 고정 크기의 메모리를 요청합니다. 데이터베이스 엔진은 쿼리 최적화, 레코드 구문 분석, 레코드 정렬, 레코드 조인 등 다양한 작업을 수행하는 데 사용됩니다. 하지만 중요한 것은 우리에게 있어서, 이 메모리 위치 중에는 저장소에서 읽은 페이지를 유지하거나 새 레코드를 삽입하기 위한 새 페이지를 생성하는 메모리 파티션인 "버퍼 풀"이 있습니다.

이것은 읽기(선택) 작업에서 페이지를 저장하는 데만 사용되지 않습니다. 삽입, 업데이트 및 삭제 작업에도 사용됩니다. 데이터베이스 엔진은 대상 레코드가 존재하는 페이지를 가져오거나 삽입, 업데이트 또는 삭제해야 하는 페이지를 가져와야 합니다.

우리 문제와 어떤 관련이 있을까요?

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

UUID v4의 병목 현상 핵심입니다. 문제는 ID가 매우 무작위이며 버퍼 풀이 빠르게 가득 차서 매번 레코드가 다른 페이지에 저장됩니다. 따라서 데이터베이스 엔진은 해당 레코드를 가져와야 하는데 버퍼 풀이 가득 찬 경우 몇 개의 페이지를 디스크로 다시 기록하여 공간을 확보해야 합니다. 그리고 바로 옆에 있는 다음 레코드가 방금 기록한 페이지와 다를 수도 있기 때문에 이 작업이 계속 반복됩니다.

그러나 UUID v7 또는 Serial Integer의 경우에는 이러한 일이 발생하지 않습니다. 왜냐하면 레코드의 ID가 증가하는 순서로 부여되기 때문입니다. 따라서 페이지 제한에 도달하면 레코드가 마지막 페이지에 추가될 것이고 데이터베이스 엔진은 새 페이지를 만들게 됩니다. 이전 페이지를 디스크에 기록할지 여부는, 버퍼 풀이 가득 차기를 기다릴지 아니면 WAL에만 쓸지를 결정할 것입니다.

# 마지막 질문은 왜 Serial이 UUID보다 빨랐을까요?

이제 이 질문은 매우 쉽게 대답할 수 있는 질문입니다. 데이터베이스에 각 레코드가 페이지에 삽입되고 페이지의 기본 크기는 16 KByte (MySQL) 및 8 KByte (PostgreSQL)로 고정됩니다. INT ID의 경우 레코드 크기는 271 바이트(4 + 4 + 4 + 255 + 4)(INT, INT, INT, VARCHAR(255), TIMES...)입니다. 그러나 UUID의 경우 레코드 크기는 307 바이트(16 + 16 +16 + 255 + 4)입니다.
페이지 당 더 많은 레코드가 포함될 수 있다는 가정하에, INT ID의 페이지에는 더 많은 레코드가 포함되어 있기 때문에 IO가 적고 속도가 더 빠릅니다.

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

한 가지 작은 참고사항을 드리자면 타임스탬프 GUID를 추가하는 아이디어는 새로운 것이 아닙니다. UUID v1이 이를 수행했지만 단점이 있었고, Instagram의 ShardingID, Shopify는 UUID v4 대신 ULID를 사용하며, MongoDB ObjectID도 비슷한 방식을 사용합니다.

마지막으로, 이 기사를 즐겁게 읽으셨기를 바랍니다. 새로운 것을 배우셨다면 좋겠습니다. 더 개선할 부분이 있다면 언제든지 알려주세요.

# 향후 작업:

- Rust로 테스트해 보고 싶습니다.
- 각 인덱스 유형별로 인덱스 B+ 트리의 크기를 확인하고 싶습니다.
- 단일 연결 대신 데이터베이스 연결 풀을 사용하고 싶습니다.

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

# 참고 자료:

- 비슷한 아이디어를 설명하는 멋진 동영상
- UUID 버전 4 형식
- UUID 고유성
- UUID RFC
- UUID와 ID에 대한 더 많은 정보
- UUID v7
- 잘못된 분할
- 정수 작별. UUIDv7 안녕하세요! 훌륭한 기사.
