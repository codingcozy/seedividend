---
title: "플러터의 로컬 데이터베이스 비교하기"
description: ""
coverImage: "/assets/img/2024-05-17-ComparingFluttersLocalDatabases_0.png"
date: 2024-05-17 21:40
ogImage:
  url: /assets/img/2024-05-17-ComparingFluttersLocalDatabases_0.png
tag: Tech
originalTitle: "Comparing Flutter’s Local Databases"
link: "https://medium.com/@nandhuraj/comparing-flutters-local-databases-cb6bc7709316"
isUpdated: true
---

![Comparison of local database options](/assets/img/2024-05-17-ComparingFluttersLocalDatabases_0.png)

Flutter 앱 개발에서 로컬 데이터를 효율적으로 관리하는 것은 원활한 사용자 경험을 만들기 위해 중요합니다. 로컬 데이터베이스는 앱 내에서 데이터를 저장, 검색 및 관리하는 데 중요한 역할을 합니다. Flutter에서 로컬 데이터베이스를 구현하는 여러 옵션이 있으며, 각각의 기능, 장단점을 가지고 있습니다. 인기있는 로컬 데이터베이스 옵션인 SQLite, Hive, ObjectBox, Isar, FLor, Drift, Sembast, Couchbase Lite (CBL), Realm을 자세히 비교해보겠습니다.

# SQLite 🗃️

특징:

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

- SQLite는 널리 사용되는 관계형 데이터베이스 관리 시스템입니다.
- 자기 포함형이며 서버가 필요하지 않으며 설정이 필요하지 않은 트랜잭션 SQL 데이터베이스 엔진입니다.
- ACID (원자성, 일관성, 고립성, 내구성) 트랜잭션을 제공합니다.
- 트리거, 뷰 및 복잡한 쿼리를 포함한 다양한 SQL 기능을 제공합니다.

장점:

- 성숙하며 잘 지원되며 방대한 문서와 커뮤니티 자원이 있습니다.
- 대규모 데이터 세트에 적합한 고성능 및 효율성을 제공합니다.
- 플러터(sqflite와 같은 플러그인과 함께 사용하여 통합이 쉽습니다.

단점:

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

- 복잡하고 오류가 발생하기 쉬운 원시 SQL 쿼리를 작성해야 합니다.
- 객체-관계 매핑(ORM)을 지원하지 않습니다.
- 플랫폼별 구현이 다를 수 있습니다.

# Hive 🐝

특징:

- Hive는 Dart로 작성된 가벼운 키-값 데이터베이스입니다.
- 빠른 읽기 및 쓰기 작업을 제공합니다.
- 리스트, 맵, 중첩 객체와 같은 복잡한 데이터 구조를 지원합니다.
- 데이터는 이진 형식으로 저장되어 성능을 향상시킵니다.

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

장점:

- 간단한 API로 배우고 사용하기 쉽습니다.
- 내장 암호화 및 압축 지원을 제공합니다.
- 플러터와 잘 작동하여 모바일 기기에서 성능이 우수합니다.

단점:

- 키-값 저장소에 제한되어 복잡한 관계형 데이터에는 부적합할 수 있습니다.
- SQL 쿼리를 지원하지 않습니다.
- 더 확립된 옵션에 비해 커뮤니티 지원이 제한적입니다.

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

# ObjectBox 📦

특징:

- ObjectBox는 Flutter용 고성능 NoSQL 데이터베이스입니다.
- Dart 객체를 데이터베이스 엔티티에 직접 매핑하는 객체지향 접근 방식을 활용합니다.
- ObjectBox Sync를 통한 자동 동기화를 제공하여 실시간 데이터 업데이트가 가능합니다.

장점:

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

- 개발 시간을 단축시키는 간단하고 직관적인 API.
- 읽기 중심 작업에 특히 뛰어난 성능.
- 객체 간 관계 및 복잡한 쿼리 지원.

단점:

- 다른 옵션에 비해 한정된 문서 및 커뮤니티 리소스.
- 현재 전체 텍스트 검색과 같은 고급 기능이 부족.
- ObjectBox Sync는 추가 설정이 필요하며 추가 비용이 발생할 수 있습니다.

# Isar 🌀

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

특징:

- 이사르(Isar)는 플러터(Flutter)용 빠르고 가벼우며 타입 안전한 NoSQL 데이터베이스입니다.
- 자동 스키마 이전과 내장 암호화를 제공합니다.
- 부드러운 Dart API를 통해 쿼리를 지원합니다.

장점:

- 플러터에 특화된 디자인으로 매끄러운 통합을 제공합니다.
- 복잡한 쿼리에 특히 우수한 성능을 제공합니다.
- 데이터 보안을 위한 내장 암호화를 제공합니다.

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

단점:

- 다른 선택지에 비해 비교적 새로운 기술로, 일부 기능이 부족할 수 있습니다.
- 커뮤니티 지원과 문서화가 제한적일 수 있습니다.
- 규모가 크고 확장성이 필요한 프로젝트에는 적합하지 않을 수 있습니다.

# FLor 🌸

특징:

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

- FLor은 Firestore에 영감을 받은 Flutter에 최적화된 NoSQL 데이터베이스입니다.
- 실시간 데이터 동기화 및 오프라인 지원을 제공합니다.
- 복잡한 쿼리와 페이지네이션을 지원합니다.

장점:

- Flutter에 특별히 설계되어 원할한 개발 경험을 제공합니다.
- 협업 앱에 적합한 실시간 데이터 업데이트를 제공합니다.
- 인터넷 연결 없이 작업할 수 있는 오프라인 지원을 제공합니다.

단점:

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

- 더 확립된 옵션들과 비교하여 문서화 및 커뮤니티 지원이 제한적입니다.
- 상대적으로 신규 제품이므로 일부 고급 기능이 부족할 수 있습니다.
- 효율적인 쿼리를 위해 데이터 구조를 신중하게 고려해야 합니다.

# Drift 🛶

특징:

- Drift는 Diesel.rs를 영감으로 한 Flutter용 SQLite ORM입니다.
- 타입 안전한 쿼리 및 마이그레이션을 제공합니다.
- 테이블 간 관계와 복잡한 데이터 모델을 지원합니다.

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

장점:

- SQL 데이터베이스에 익숙한 개발자들에게 익숙한 ORM 접근 방식을 제공합니다.
- 런타임 오류를 줄이는 타입 안전성을 제공합니다.
- 데이터베이스 스키마 변경을 위한 마이그레이션을 지원합니다.

단점:

- 대량의 데이터셋에 대한 성능에 영향을 줄 수 있는 ORM 오버헤드가 발생할 수 있습니다.
- SQL 개념과 구문을 이해해야 합니다.
- 다른 ORM에 비해 커뮤니티 지원과 문서화가 제한적일 수 있습니다.

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

# Sembast 📦

특징:

- Sembast는 플러터를 위한 NoSQL 내장 데이터베이스입니다.
- JSON 직렬화 및 역직렬화가 빠릅니다.
- 트랜잭션, 정렬, 필터링을 지원합니다.

장점:

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

- 가볍고 사용하기 쉽며 간단한 API를 제공합니다.
- 소규모에서 중간 규모의 데이터셋에 대해 잘 작동합니다.
- 읽기 및 쓰기 작업에 대해 좋은 성능을 제공합니다.

단점:

- 대규모 데이터셋에 대한 확장성이 제한됩니다.
- 복잡한 쿼리에 대한 내장 지원이 없습니다.
- 전체 텍스트 검색과 같은 고급 기능이 필요한 프로젝트에는 적합하지 않을 수 있습니다.

# Couchbase Lite (CBL) 🛋️

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

기능:

- Couchbase Lite은 모바일 및 IoT 애플리케이션용 강력한 NoSQL 데이터베이스입니다.
- Couchbase Server와의 신속한 동기화를 제공합니다.
- 복잡한 쿼리, 전체 텍스트 검색 및 오프라인 우선 아키텍처를 지원합니다.

장점:

- 기업급 애플리케이션에 적합한 우수한 확장성과 성능을 제공합니다.
- 실시간 데이터 동기화 및 충돌 해결 기능을 제공합니다.
- 암호화, 복제, 클라우드 통합 등의 포괄적인 기능을 제공합니다.

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

단점:

- 복잡한 설정 및 구성, 특히 동기화에는 특히 그러하다.
- 광범위한 기능 세트 때문에 학습 곡선이 필요하다.
- 소규모 및 중규모 프로젝트에는 과잉일 수 있다.

# Realm 🏰

특징들:

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

- Realm은 모바일 앱을 위한 빠르고 가벼우며 크로스 플랫폼 데이터베이스입니다.
- 데이터의 자동 동기화 및 충돌 해결 기능을 제공합니다.
- 복잡한 쿼리, 암호화 및 오프라인 우선 아키텍처를 지원합니다.

장점:

- 뛰어난 성능과 확장성으로 고트래픽 애플리케이션에 적합합니다.
- Real Cloud를 사용한 데이터의 실시간 동기화 기능을 제공합니다.
- 암호화, 쿼리 언어 및 플랫폼별 API를 포함한 풍부한 기능 세트를 제공합니다.

단점:

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

- 프로프리어터리 기술, 오픈 소스 옵션과 비교해 유연성이 제한될 수 있습니다.
- Realm 특정 개념과 API를 학습해야 합니다.
- 고급 기능과 클라우드 동기화를 위해 추가 비용이 발생할 수 있습니다.

# 결론

플러터 앱에 적합한 로컬 데이터베이스를 선택하는 것은 프로젝트 요구 사항, 성능 고려 사항, 확장성 및 개발자 익숙도와 같은 여러 가지 요소에 달려 있습니다. SQLite는 성숙성과 성능 때문에 여전히 인기 있는 선택지입니다. 그 외에도 Hive, ObjectBox, Isar와 같은 새로운 옵션이 심플함과 Flutter 통합을 제공합니다. SQL 경험이 있는 개발자에게는 Drift와 같은 ORM이 익숙한 접근 방식을 제공하고, FLor, Sembast, Couchbase Lite, Realm과 같은 NoSQL 데이터베이스는 확장성과 실시간 동기화 능력을 제공합니다. 마지막으로, 제약 조건과 특정 요구 사항을 기반으로 각 옵션을 평가하여 신중한 결정을 내리는 것이 중요합니다.
