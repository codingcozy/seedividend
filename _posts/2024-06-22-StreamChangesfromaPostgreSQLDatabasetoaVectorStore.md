---
title: "PostgreSQL 데이터베이스 변경 사항을 벡터 스토어로 스트리밍하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_0.png"
date: 2024-06-22 05:42
ogImage:
  url: /assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_0.png
tag: Tech
originalTitle: "Stream Changes from a PostgreSQL Database to a Vector Store"
link: "https://medium.com/ai-advances/stream-changes-from-a-postgresql-database-to-a-vector-store-83df7adc0bfa"
isUpdated: true
---

## CDC (Change Data Capture)를 사용하여 벡터 저장소를 최신 상태로 유지하는 방법, Python 및 Redpanda

![Image](/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_0.png)

벡터 데이터베이스와 의미론적 검색의 등장으로 많은 애플리케이션의 검색 결과 품질이 향상되었습니다. 그러나 전통적인 인덱스 유지 보수 문제는 여전히 존재합니다. "검색 가능한 콘텐츠"(제품 설명, 웹 페이지, 연구 논문 요약)가 지속적으로 업데이트될 때 사용자의 검색 경험을 방해하지 않고 검색 인덱스를 새로 고치는 방법은 무엇일까요? 많은 팀은 이 문제를 점진적 색인화로 해결합니다.

예를 들어, DoorDash 엔지니어링 팀이 2021년에 점진적 색인화에 대해 쓴 글에서는 CDC와 Apache Kafka를 사용하여 색인을 점진적으로 업데이트하는 방법을 설명했습니다.

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

이 글에서는 일반적인 검색 인덱스보다 계산량이 많을 수 있는 벡터 데이터베이스로 동일한 작업을 수행하는 방법을 보여드리려고 합니다.

# 점진적 인덱싱을 위한 지속적인 이벤트 기반 벡터 입력 사용하기

CDC를 기반으로 한 인덱싱 파이프라인의 간소화된 버전을 살펴봅시다. 데이터베이스에 새 제품 항목이 추가되는 즉시, 변경 내용의 세부 정보와 함께 이벤트가 Redpanda(카프카와 유사한 메시지 브로커)로 전송됩니다. 소비자 프로세스는 이벤트가 도착하는 즉시 이를 임베딩 모델에 전달합니다. 임베딩이 생성되고 세부 정보가 관련 벡터로 보강됩니다. 이 데이터는 다른 Kafka 토픽으로 스트리밍되어 인계 처리 프로세스가 이를 소비하고 벡터 데이터베이스가 처리할 수 있는 속도에 맞춰 벡터를 업서트합니다.

저는 여러분이 직접 복제할 수 있는 프로토타입 애플리케이션을 작성했습니다. 메시지 브로커로 Redpanda의 로컬 설치를 사용합니다. 파이프라인의 각 단계는 각각의 Docker 컨테이너에서 실행되며, 각 컨테이너는 Quix Streams의 인스턴스를 실행합니다. Quix Streams는 Kafka 프로듀서/컨슈머(예: kafka-python)와 강력한 스트림 처리 라이브러리(예: Faust)인 오픈소스 파이썬 라이브러리입니다.

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

아래 다이어그램은 파이프라인의 구성 요소를 보여줍니다.

![다이어그램](/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_1.png)

이 파이프라인은 Qdrant(벡터 저장소)와 PostgreSQL(소스 데이터베이스)의 로컬 인스턴스를 사용하며, Redpanda의 토픽을 통해 Quix Streams를 사용하여 변경 사항을 스트리밍합니다.

이 프로토타입의 전체 코드는 동봉된 GitHub 저장소에서 확인할 수 있습니다.

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

# 준비물

- 파이프라인을 시도하려면 도커가 설치되어 있어야 합니다. 이를 설치하는 가장 간단한 방법은 Linux, Windows 또는 Mac에 Docker Desktop Docker를 설치하는 것입니다.
- 또한 Git도 필요합니다. 이미 Git이 없다면 Git 웹 사이트에서 다운로드할 수 있습니다.

먼저, 파이프라인을 실행하고 데이터를 입력하고 검색에 미치는 영향을 관찰하는 방법을 안내해 드리겠습니다. 그 후에는 파이프라인을 구동하는 코드를 안내해 드리겠습니다.

# 코드 가져오기

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

터미널에서 다음 Git 명령을 실행하여 코드를 가져올 수 있어요.

```js
git clone https://github.com/quixio/template-vector-cdc-local
```

그런 다음, Docker Compose를 실행하세요:

```js
docker compose up -d
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

이 명령은 8080, 8082 및 5050 포트를 필요로 하는 여러 서비스를 시작합니다. 해당 포트에서 실행 중인 애플리케이션이 있으면 먼저 중지해야 합니다.

콘솔에 다음 예제와 유사한 출력이 표시됩니다:

```js
[+] Running 10/10
 ✔ Network template-vector-cdc-local_default               Created                                                 0.0s
 ✔ Container template-vector-cdc-local-console-1           Started                                                 0.1s
 ✔ Container template-vector-cdc-local-redpanda-1          Started                                                 0.1s
 ✔ Container postgresdb                                    Started                                                 0.1s
 ✔ Container qdrant                                        Started                                                 0.1s
 ✔ Container create_embeddings                             Started                                                 0.0s
 ✔ Container template-vector-cdc-local-postgresql_cdc-1    Started                                                 0.0s
 ✔ Container streamlit_search                              Started                                                 0.0s
 ✔ Container template-vector-cdc-local-postgresql_admin-1  Started                                                 0.0s
 ✔ Container ingest_to_qdrant                              Started                                                 0.0s
```

# 데이터베이스 설정

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

먼저, 기본 테스트 데이터벤스에 테이블을 생성하고 일부 데이터를 추가하겠습니다.

전자 상거래에 중점을 두고 있으므로 온라인 서점을 운영하고 있으며 도서 카탈로그를 지속적으로 업데이트하고 있습니다. 새로운 책이 추가될 때마다 최신 책 설명에 대한 임베딩이 있는 벡터 저장소를 확인해야 합니다.

여기서 책 카탈로그 업데이트를 시뮬레이션하기 위해 pgAdmin을 사용하여 쿼리를 실행할 것입니다. 이는 PimCore와 같은 "실제" PIM(Product Information Management) 시스템을 대신하는 역할을 할 것입니다.

먼저, demo PostgreSQL DB에 pgAdmin을 연결해 보겠습니다.

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

## pgAdmin에 로그인하기

- 브라우저에서 http://localhost:5050으로 접속하여 pgAdmin UI를 엽니다.
- 사용자 이름 "admin@admin.com"과 비밀번호 "root"로 pgAdmin에 로그인합니다.

## PostgreSQL 데이터베이스에 대한 연결 구성

- `Servers`를 클릭하고 `Register` 서버를 선택합니다.

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

![이미지](/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_2.png)

- 나타나는 대화 상자에서 "일반" 탭에 이름을 입력한 후, 호스트를 "postgresdb"로 설정하고 "root"를 사용자 이름과 암호로 설정하고 저장을 클릭하세요.

![이미지](/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_3.png)

# 데이터 추가

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

저희 데모 Postgresql 데이터베이스에는 “books” 테이블이 미리 구성되어 있어서 데이터를 추가하기만 하면 됩니다.

- 서버 ' postgresdb ' 데이터베이스로 이동하여 test_db를 마우스 오른쪽 버튼으로 클릭하고 '쿼리 도구'를 선택합니다.

![이미지](/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_4.png)

- 나타나는 쿼리 도구에 다음 쿼리를 붙여넣고 실행하여 첫 번째 일괄 Sci-fi 책을 추가합니다:

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
INSERT INTO books (name, description, author, year) VALUES
('The Time Machine', 'A man travels through time and witnesses the evolution of humanity.', 'H.G. Wells', 1895),
('Brave New World', 'A dystopian society where people are genetically engineered and conditioned to conform to a strict social hierarchy.', 'Aldous Huxley', 1932),
('An Absolutely Remarkable Thing', 'A young woman becomes famous after discovering a mysterious alien artifact in New York City.', 'Hank Green', 2018),
('Dune', 'A desert planet is the site of political intrigue and power struggles.', 'Frank Herbert', 1965),
('Foundation', 'A mathematician develops a science to predict the future of humanity and works to save civilization from collapse.', 'Isaac Asimov', 1951),
('Snow Crash', 'A futuristic world where the internet has evolved into a virtual reality metaverse.', 'Neal Stephenson', 1992),
('The War of the Worlds', 'A Martian invasion of Earth throws humanity into chaos.', 'H.G. Wells', 1898),
('The Hunger Games', 'A dystopian society where teenagers are forced to fight to the death in a televised spectacle.', 'Suzanne Collins', 2008);
```

위 내용대로 변경하면 자동으로 채택되고 데이터는 파이프라인을 통해 전송됩니다.

로컬 Redpanda 인스턴스에서 Redpanda 콘솔로 확인할 수 있습니다: http://localhost:8080/overview

Topics로 이동하여 `postgres-cdc-data`를 확인하세요.

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

“OFFSET” 드롭다운에서 “Newest”를 선택하면 메시지가 들어오기 시작해야 해요:

<img src="/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_5.png" />

이제 벡터가 제대로 소화되었는지 확인해봐요.

# Streamlit Vector Search UI 사용하기

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

데모 애플리케이션에는 벡터 검색을 테스트할 수 있는 간단한 검색 UI(스트림릿으로 구축됨)가 포함되어 있어요.

다음 URL을 통해 액세스할 수 있어요: http:// localhost:8082

검색 UI에서 "battle in space"를 검색해보세요 — 최상위 결과는 "The War of the Worlds"여야 해요. 지금은 지구에서 벌어지는 전투에 관한 책이지만, 우리 도서 카탈로그에서 현재 최고의 배치로 보여요.

![이미지](/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_6.png)

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

우리는 "화성"이 "우주"와 의미적으로 가깝고 "침공"이 "전투"와 의미적으로 가깝기 때문에 상위 결과와 일치했을 가능성이 있다고 추측할 수 있습니다. 그러나 문장 임베딩 모델 같이 더 정교한 모델을 사용하면 결과가 다를 수 있습니다. 그러나 그 모델은 꽤 무거운 라이브러리이기 때문에 이 프로토타입에서는 제외했습니다.

이제 목록에 몇 권의 책을 추가하고 검색 결과를 개선할 차례입니다.

pgAdmin (http://localhost:5050/)로 돌아가서 다음 SQL 쿼리를 실행하세요.

```js
INSERT INTO books (name, description, author, year) VALUES
('Childhood''s End', '평화로운 외계 침공으로 인해 인류의 어린 시절이 종말을 맞이한다.', '아서 C. 클라크', 1953),
('The Day of the Triffids', '유성우로 대부분의 인구가 실명하면서 공격적인 식물이 지배를 시작한다.', '존 윈덤', 1951),
('The Three-Body Problem', '인류가 위기의 먼 외계 문명으로부터 가능한 침공을 직면한다.', '류씬', 2008),
('The Puppet Masters', '찐렁이 모양의 외계인이 지구를 침공하여 인간에 붙어 그들의 마음을 통제한다.', '로버트 A. 하인라인', 1951),
('The Kraken Wakes', '해양 심층에서 나오는 외계 생명체가 인류를 공격하기 시작한다.', '존 윈덤', 1953),
('The Invasion of the Body Snatchers', '작은 마을이 주민 중 일부가 식물과 같은 씨앗에서 나오는 완벽한 물리적 사본에 교체되는 것을 발견한다.', '잭 핀니', 1955),
('Out of the Dark', '외계종족이 지구를 침공하여 인류의 생존 의지를 과소평가한다.', '데이비드 웨버', 2010),
('Old Man''s War', '지구의 노인들이 별간 전쟁에 참전하게 되며 새로운 외계 문화와 위협을 발견한다.', '존 스캘지', 2005);
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

만약 이것이 프로덕션 상황이었다면, 새로운 제목은 책 카탈로그에 등록될 수 있지만 벡터 DB에는 등록되지 않을 수 있어요. 이 때문에 재고 팀에게 정기적으로 책 카탈로그의 스냅샷을 내보내서 벡터 스토어로 가져와야 할지도 모를 거예요. 한편으로, "우주 전투"에 관한 책을 찾는 사용자들은 그냥 기다려야 할 수도 있어요. 이건 그냥 안돼요! 그럼 그들이 카탈로그에 등록되면 바로 제목을 찾을 수 있게 해주는게 어때요?

첫 번째 단계에서 한 것과 이번에 두 번째 단계에서 다시 한 것입니다. 벡터 DB를 책 카탈로그와 실시간으로 동기화했어요.

우리의 유사성 검색 결과에 이 업데이트가 어떤 영향을 미쳤는지 확인해보세요.

Streamlit 검색 UI에서 다시 "우주 전투"를 검색해보세요 - 이제 상위 결과는 "Old man's war"가 될 거예요 - 더 적절한 매치겠죠.

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

![StreamChangesfromaPostgreSQLDatabasetoaVectorStore_7](/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_7.png)

"The War of the Words"이 상위 자리에서 밀려난 이유는 새로 추가된 용어가 의미론적으로 더 관련된 설명을 갖고 있기 때문이다: 설명에서 "전쟁"이라는 용어는 의미에서 "전투"에 더 가깝고, "국제 우주"는 "화성"보다 "우주"라는 검색어에 의미론적으로 더 가까워진다.

# 하드웨어 하에서 작동하는 방식

이제 이 프로토타입이 무엇을 하는지 이해했으니, 어떻게 작동하는지 살펴보겠습니다.

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

먼저, 아키텍처 다이어그램의 처리 부분에 초점을 맞춰 봅시다.

![이미지](/assets/img/2024-06-22-StreamChangesfromaPostgreSQLDatabasetoaVectorStore_8.png)

세 개의 서비스를 볼 수 있어요(메시지 브로커는 물론) — 각각은 작고 계속 실행 중인 파이썬 애플리케이션입니다: "CDC", "임베딩 생성", "벡터 DB로 업서트"

각 애플리케이션은 데이터를 수신하고 처리한 후 Kafka 토픽으로 보내거나 어떠한 형태의 싱크에 쓰기 위해 Quix Streams 파이썬 라이브러리를 사용합니다.

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

각 응용 프로그램의 소스 코드를 함께 살펴봅시다.

## CDC 구성

CDC 프로세스 뒤의 코드로 들어가기 전에, 자체 PostgreSQL 데이터베이스에서 CDC를 수행하려면 몇 가지 추가 전제 조건을 언급하는 것이 좋습니다:

1. Write Ahead Log를 논리적으로 설정해야 합니다.

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

- "SHOW wal_level;" SQL 쿼리를 실행하여 현재 설정을 확인할 수 있어요.
- 이미 "logical"로 설정이 되어 있지 않다면, postgresql.cong 파일을 업데이트하고 wal_level을 wal_level=logical로 설정해 주세요.

2. PostgreSQL이 실행 중인 서버 또는 컨테이너에 wal2json 플러그인을 설치해야 해요.

이 튜토리얼의 PostgreSQL 데이터베이스에는 이미 이러한 선행 조건이 준비되어 있어요. Debezium Source PostgreSQL Connector 대신 Quix Python CDC 커넥터를 사용합니다. 전체 CDC 코드 파일은 이 GitHub 폴더에서 찾을 수 있어요.

## PostgreSQL 데이터베이스에 연결

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

포스트그레SQL 연결은 환경 변수를 통해 postgres_helper.py 파일에서 정의됩니다. 따라서, 여러분이 자신의 데이터베이스에 연결하고 싶다면, 관련 변수를 변경하기만 하면 됩니다.

```js
import psycopg2
import os

def connect_postgres():
    # PostgreSQL 상수
    PG_HOST = os.environ["PG_HOST"] # 기본값은 localhost
    PG_PORT = os.environ["PG_PORT"] # 기본값은 ??
    PG_USER = os.environ["PG_USER"] # 기본값은 ??
    PG_PASSWORD = os.environ["PG_PASSWORD"] # 기본값은 ??
    PG_DATABASE = os.environ["PG_DATABASE"] # 기본값은 ??

    conn = psycopg2.connect(
        database=PG_DATABASE, user=PG_USER, password=PG_PASSWORD, host=PG_HOST, port=PG_PORT
    )
    return conn
…
```

## 카프카로 변경 로그 항목 생성하기

글을 간결하게 유지하기 위해서, 이 기사에서는 변경 데이터가 어떻게 캡처되는지에 대해 다루지 않겠습니다. 그러나 변경 사항을 캡처하는 데 write-ahead log가 어떻게 사용되는지에 대한 자세한 내용은 postgres_helper.py 파일을 확인해주세요.

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

여기서는 데이터의 구조와 Kafka로 생성되는 방법에 초점을 맞춰 봅시다.

먼저, Kafka 프로듀서를 초기화합니다. 저희는 프로듀서로 Quix Streams Python 라이브러리를 사용합니다. 이 라이브러리는 Streaming Dataframes 개념을 사용하여 데이터를 처리하고 정적 데이터셋에 대해 작성된 Pandas 코드를 재사용하기 쉽게 만들어줍니다.

Quix Streams를 사용하여 main.py에서 어플리케이션 및 초기 출력 토픽을 정의합니다:

```js
from quixstreams import Application
...
app = Application(broker_address=os.environ['BROKER_ADDRESS']) # Redpanda의 기본값은 'localhost:19092'입니다.
...
output_topic = app.topic(output_topic_name) # 토픽 이름은 환경 변수에 정의되어 있으며, 기본값은 "posgres-cdc-source"입니다.
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

그런 다음 최신 데이터베이스 변경 사항을 가져와 버퍼에 추가하고, 버퍼를 반복하여 결과를 출력 Kafka 주제로 전송하는 함수를 추가합니다.

```js
...
# 네트워크 트래픽을 줄이기 위해 메시지를 100밀리초 동안 버퍼링합니다
def main():
    buffer = []
    last_flush_time = time.time()

    while run:
        records = get_changes(conn, PG_SLOT_NAME)
        for record in records:
            changes = json.loads(record[0])
            for change in changes["change"]:
                buffer.append(change)

        # 100밀리초가 지났는지 확인
        current_time = time.time()
        if (current_time - last_flush_time) >= 0.5 and len(buffer) > 0:
           # 500밀리초가 지났다면, 버퍼에 있는 모든 메시지 전송
    with app.get_producer() as producer:
            for message in buffer:
                producer.produce(topic=output_topic.name,
                                    key=PG_TABLE_NAME,
                                    value=json.dumps(message))
                print("Kafka로 메시지 전송 완료")
                # 생산자를 플러시하여 메시지 전송

            # 버퍼 비우기
            buffer = []
            # 마지막 플러시 시간 업데이트
            last_flush_time = current_time
        time.sleep(WAIT_INTERVAL) # main.py의 전역 변수로 정의된 대기 간격(현재 0.1초)
```

결과 payload는 다음 구조를 가지고 있습니다:

```js
{
  "kind": "insert",
  "schema": "public",
  "table": "books",
  "columnnames": [
    "id",
    "name",
    "description",
    "author",
    "year"
  ],
  "columntypes": [
    "integer",
    "character varying(255)",
    "text",
    "character varying(255)",
    "integer"
  ],
  "columnvalues": [
    60,
    "Old Man's War",
    "지구의 어르신들이 화성간 전쟁에 참전하게 되어, 새로운 외계 문화와 위협을 발견하게 되는 이야기입니다.",
    "John Scalzi",
    2005
  ]
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

나중에는 이 구조를 간단하게 만들어서 처리하기 쉽게 할 거예요.

# 임베딩 생성

이것이 우리가 "변환" 프로세스라고 부르는 것인데, 다른 말로 하면 두 개의 Kafka 토픽 사이에 위치하여 한 쪽에서 읽고 다른 쪽으로 쓰는 역할을 합니다. 전체 소스 코드 파일은 이 GitHub 폴더에 있습니다.

Quix Streams 라이브러리는 변환을 구현하는 간단한 프로세스를 제공합니다. 다른 라이브러리와 달리 생산자와 소비자를 정의하는 대신, 관련 설정을 Application 생성자에 넣어주고 app 인스턴스를 통해 입력 및 출력 토픽을 정의합니다.

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

예시:

```js
from quixstreams import Application
...
app = Application(
    broker_address=os.environ['BROKER_ADDRESS'],
    consumer_group="vectorsv1",
    auto_offset_reset="earliest",
    auto_create_topics=True,  # Quix 앱은 아직 존재하지 않는 경우 주제를 자동으로 생성하는 옵션이 있습니다
)

# JSON 변환기를 사용하여 입력 및 출력 주제 정의
input_topic = app.topic(os.environ['input'], value_deserializer="json")
output_topic = app.topic(os.environ['output'], value_serializer="json")
```

아래에서는 app.dataframe 메서드를 사용하여 데이터를 생산하고 소비하는 방법을 볼 수 있지만 먼저 데이터에 적용할 함수를 정의합니다.

첫 번째 함수는 변경 데이터 캡처 페이로드의 구조를 압축합니다.

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
def simplify_data(row):

    # 새로운 딕셔너리를 생성하여 'kind' 및 zips 열 이름과 값으로 구성
    new_structure = {"kind": row["kind"],"table": row["table"]}
    new_structure.update({key: value for key, value in zip(row["columnnames"], row["columnvalues"])})

    # 선택적으로 정수를 문자열로 변환
    new_structure["year"] = str(new_structure["year"])

    return new_structure
```

다음과 같은 페이로드 구조를 얻게 됩니다:

```python
{
 "kind": "insert",
 "table": "books",
 "id": 60,
 "name": "Old Man's War",
 "description": "Earth's senior citizens are recruited to fight in an interstellar war, discovering new alien cultures and threats.",
 "author": "John Scalzi",
 "year": 2005
}
```

두 번째 함수는 단순화된 페이로드의 "description" 필드에 대한 임베딩을 생성하기 위해 Qdrant의 FastEmbed 라이브러리를 사용합니다.

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
# 기존 모델 다운로드 및 초기화가 트리거됩니다.
embedding_model = TextEmbedding()
print("모델 BAAI/bge-small-en-v1.5을 사용할 준비가 되었습니다.")

...

# 임베딩 함수 정의
def create_embeddings(row):
    text = row['description']
    embeddings = list(embedding_model.embed([text]))
    embedding_list = [embedding.tolist() for embedding in embeddings]
    finalembedding = embedding_list[0]
    print(f'벡터 생성됨: "{finalembedding}"')

    return finalembedding
```

마지막으로 데이터를 소비하고 함수를 적용하여 데이터를 downstream Kafka 주제로 생성합니다.

```js
# 입력 주제의 메시지 스트림을 기반으로 스트리밍 데이터프레임 초기화:
sdf = app.dataframe(topic=input_topic)

sdf = sdf.filter(lambda data: data["table"] == targettable) # "books" 테이블의 변경 사항만 필터링합니다.

sdf = sdf.apply(simplify_data)

sdf = sdf.update(lambda val: logger.info(f"수신된 업데이트: {val}"))

# 필터링된 SDF에서 감지된 새 메시지(행)에 대해 임베딩 함수 트리거
sdf["embeddings"] = sdf.apply(create_embeddings, stateful=False)

# 타임스탬프 열을 현재 시간(나노초 단위)으로 업데이트합니다.
sdf["Timestamp"] = sdf.apply(lambda row: time.time_ns())
```

sdf.apply()과 sdf.update()의 차이점에 유의하세요.

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

`apply()`은 콜백 함수의 결과를 하류로 전달합니다. 원본 데이터를 가져와 처리하여 새 데이터를 생성합니다. 이 메서드는 원본 데이터 자체를 변경하지 않고 대신 원본을 기반으로 새 버전을 생성합니다.

- 예를 들어, apply()를 사용하여 사전에 새 키를 추가하면 실제로 해당 추가가 포함된 새 사전이 생성됩니다.
- 우리의 경우, sdf.apply(simplify_data)를 사용하여 CDC 페이로드를 간단한 사전으로 변환하고 sdf.apply(create_embeddings)를 사용하여 벡터를 계산하고 해당 사전 내의 새로운 "embeddings" 필드에 기록합니다.

`update()`는 실제 콜백 인수를 하류로 전달합니다. 원본 데이터를 직접 수정하거나 사용할 수 있게 합니다. 그러나 주로 콘솔에 데이터를 기록하거나 외부 데이터베이스에 쓰는 데 사용됩니다(Kafka Streams의 peek() 메서드와 유사합니다).

마지막으로, 우리는 sdf.to_topic을 사용하여 변환된 데이터를 하류 토픽으로 생성합니다.

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
sdf = sdf.to_topic(output_topic);
app.run(sdf);
```

# 벡터 DB에 Upserting

이 프로세스는 sdf.update() 방법을 다시 사용하지만 먼저 sdf.update()에 전달 할 함수를 정의해야합니다. 즉, 들어오는 벡터와 메타데이터를 벡터 DB에 입력하는 함수를 정의해야합니다. 전체 코드는 이 GitHub 폴더에서 찾을 수 있습니다.

여기서는 환경 변수를 사용하여 벡터 DB에 연결을 정의하고, 스트리밍 데이터프레임 행에서 관련 데이터를 추출하며, upload_points() 메서드를 사용하여 벡터 DB(이 경우 로컬 Qdrant DB)에 항목을 추가합니다.

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
from quixstreams import Application
from qdrant_client import models, QdrantClient
import os

host = os.getenv("qd_host", "")
port = os.getenv("qd_port", "")
collection = os.getenv("qd_collection", "")

qdrant = QdrantClient(host=host, port=port)
collection = collection

# Create collection to store items
if not qdrant.collection_exists(collection):
    # Define the collection parameters
    vector_size = 384
    # Create the collection
    qdrant.create_collection(
        collection_name=collection,
        vectors_config=models.VectorParams(
            size=vector_size,  # Vector size is defined by used model
            distance=models.Distance.COSINE
        )
    )
    print(f"Collection '{collection}' created.")
else:
    print(f"Collection '{collection}' already exists.")

# Define the ingestion function
def ingest_vectors(row):

  single_record = models.PointStruct(
    id=row['id'],
    vector=row['embeddings'],
    payload={key: row[key] for key in ['name', 'description', 'author', 'year']}
    )

  qdrant.upload_points(
      collection_name=collection,
      points=[single_record]
    )

  print(f'Ingested vector entry id: "{row["id"]}"...')

app = Application(
    consumer_group="ingesterV1",
    auto_offset_reset="earliest",
    auto_create_topics=True,  # Quix app has an option to auto create topics
)
```

마지막으로, 입력 토픽에서 읽어와서 `ingest_vectors` 함수를 `sdf.update()`에 전달합니다. 상기한 바와 같이, 우리는 파이프라인의 종점에 도달했기 때문에 `sdf.update()`를 사용합니다. 데이터를 전달할 다운스트림 토픽이 없으므로 데이터를 "위치에" 업데이트하고(즉, 벡터 DB로 보내는 것) 있습니다.

```python
# JSON 디시리얼라이저와 함께 입력 토픽 정의
input_topic = app.topic(os.environ['input'], value_deserializer="json")

# 입력 토픽의 메시지 스트림을 기반으로 스트리밍 데이터프레임을 초기화합니다:
sdf = app.dataframe(topic=input_topic)

# 데이터 삽입이 이곳에서 발생합니다
sdf = sdf.update(lambda row: ingest_vectors(row))
app.run(sdf)
```

# 배운 점

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

기본 데이터를 신선하게 유지하는 것은 검색 품질의 중요한 구성 요소입니다. 제품 카탈로그에 새로운 항목이 도착할 때마다 벡터 저장소를 업데이트하여 사용자에게 의미론적으로 정확한 검색 결과를 제공할 수 있었음을 보았습니다.

우리는 데이터베이스에서 데이터를 내보내어 일괄적으로 벡터 저장소에 쓰는 것과 같이 벡터 저장소를 수동으로 업데이트할 수 있었을 것입니다. 그러나 이렇게 하면 제품 카탈로그가 계속 변경되는 프로덕션 전자 상거래 시나리오에서 어떻게 작동하는지, 배치를 어떻게 조직화하며 제품이 카탈로그에 도착한 후에 사용자 검색 쿼리에 포함되기까지 허용할 수 있는 지연 시간이 어떻게 되는지와 관련된 여러 질문이 생깁니다.

데이터가 입력됨과 동시에 임베딩이 생성되고 흡수되는 이벤트 기반 시스템을 설정하면(CDC를 통해), 이러한 질문들을 처리할 필요가 없습니다. 이것이 카프카 기반 아키텍처가 인기 있는 이유입니다.

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

많은 대규모 기업이 이미 DoorDash 예제에서 본 것처럼 전통적인 검색 색인 작업을 위해 Apache Kafka와 같은 이벤트 기반 솔루션을 사용하고 있습니다. 텍스트 임베딩을 최신 상태로 유지하는 데 관련된 도전 과제는 비슷하기 때문에 텍스트 임베딩에도 동일한 접근을 적용하는 것이 합리적입니다.

프로덕션에서 점진적으로 데이터를 수집하는 경우 한 가지 주의할 점은 벡터 인덱스를 다시 완전히 계산해야 할 수도 있다는 것입니다. "6 hard problems scaling vector search" 라는 기사는 이 문제에 대해 자세히 다루고 있으며 규모에 맞게 이를 수행하려면 좋은 참고 자료가 될 것입니다. 서로 다른 벡터 데이터베이스는 이 문제를 다르게 해결합니다. 예를 들어 특정 벡터 저장소 세그먼트만 다시 계산함으로써 이 문제를 해결합니다. 따라서 프로덕션용 벡터 데이터베이스를 선택할 때 그들의 색인 전략을 고려하는 것이 중요합니다.

그래도 이 간단한 프로토타입이 외부 소스에서 주기적으로 업데이트되는 신선한 데이터에 의존하는 검색 애플리케이션에 벡터 기반 검색을 통합하는 데 출발점을 제공했기를 희망합니다.

- 만약 프로토타입을 작동시키는 데 문제가 있었다면, Quix Streams 사용자를 위한 Slack 커뮤니티에서 내게 메시지를 보내 주시기 바랍니다: https://stream-processing.slack.com/.
