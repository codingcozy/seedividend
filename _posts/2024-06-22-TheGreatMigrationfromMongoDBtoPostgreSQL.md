---
title: "MongoDB에서 PostgreSQL로 대규모 전환 가이드"
description: ""
coverImage: "/assets/img/2024-06-22-TheGreatMigrationfromMongoDBtoPostgreSQL_0.png"
date: 2024-06-22 05:24
ogImage:
  url: /assets/img/2024-06-22-TheGreatMigrationfromMongoDBtoPostgreSQL_0.png
tag: Tech
originalTitle: "The Great Migration from MongoDB to PostgreSQL"
link: "https://medium.com/@tony.infisical/the-great-migration-from-mongodb-to-postgresql-fa3978bc143b"
isUpdated: true
---

![이미지](/assets/img/2024-06-22-TheGreatMigrationfromMongoDBtoPostgreSQL_0.png)

지난 해에 Infisical은 급속히 성장하여 플랫폼이 매일 5000만 개 이상의 비밀을 처리하고 있습니다. 이 비밀은 애플리케이션 구성 및 비밀 데이터를 필요로 하는 팀, CI/CD 파이프라인 및 서버/애플리케이션으로 전송됩니다.

사용량이 계속 증가함에 따라 계속해서 스택을 업그레이드해야 했습니다. 더 최근에 Infisical은 MongoDB에서 PostgreSQL로의 전체 데이터베이스 이전을 진행했습니다. 이 프로세스에는 계획 수립, 새 기술 도입, 새 데이터베이스 스키마 생성, 로직 연결 변경, 쿼리 재작성 및 수십억 개 이상의 데이터베이스 레코드를 PostgreSQL로 마이그레이션하는 작업이 포함되었습니다. 복잡한 프로세스였지만, 플랫폼의 발전을 위해 필요한 작업이었습니다.

이는 MongoDB에서 PostgreSQL로 이동한 이유와 그 과정에 대한 우리의 의사결정 이야기입니다. 아마도 이 글은 흥미로운 내용으로, 그 어느 날 비슷한 데이터베이스 이전을 고려할 여러분들에게 유용할 것입니다.

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

# 시작점

인피시컬(Invisical)을 처음 만들 때, 팀이 가장 익숙한 스택으로 만들었습니다. 그 스택 중 하나로 MongoDB + Mongoose ORM을 선택한 이유는 해당 조합이 최소한의 오버헤드를 제공하고 품질있는 기능을 빠르게 출시할 수 있었기 때문입니다. Tony Hoare 선생이 말하듯이 "조기 최적화는 모든 악의 근원이다," 그 때는 확실히 더 나은 최적화가 필요하지 않았습니다.

그 당시에는 인피시컬 클라우드를 구축하는 데 더 주력했었고, 이 중점 때문에 제품을 직접 호스팅하는 사용자가 많을 것이라고 예상하지 않았으므로 해당 사용 사례를 염두에 두지 않고 설계되지는 않았습니다.

# 왜 MongoDB가 아닌가요?

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

몽고DB가 초기에 인피지칼에 잘 도움이 되었지만, 제품의 사용 사례가 관리 서비스를 넘어선 경우에 한계를 보이기 시작했습니다. 시간이 지남에 따라, 특히 규정 준수와 보안이 교차하는 기업들 중 많은 조직이 인피지칼을 자체 호스팅하는 것을 선호했으며, 다른 일부는 만족해야 하는 온프렘 요구 사항이 있었습니다.

인피지칼의 자체 호스팅 수요가 증가함에 따라, 우리는 인피지칼을 자체 호스팅하는 데 필요한 학습 곡선을 줄이기 위해 여러 기능을 제공하고, 이 과정에서 몽고DB를 포스트그리스로 전환했습니다.

실제로, 우리와 고객들은 자주 몽고DB의 기능과 사용성과 관련된 제약사항에 부딪히곤 했습니다. 트랜잭션 지원 부족, 정리, 클라우드 제공 업체의 관리 서비스 간 불일치한 버전 관리, 그리고 스키마 없는 데이터베이스 설계 구조와 관련된 문제 등이 있었습니다.

위 몇 가지 도전 과제에 대해 자세히 설명하겠습니다:

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

- 데이터베이스 트랜잭션 구성의 어려움: MongoDB에서는 트랜잭션을 설정하는 것이 쉽지 않았습니다. 클러스터 모드에서 MongoDB를 실행해야 했으며 다양한 구성 오버헤드가 필요했습니다. 이로 인해 고객이 Infisical의 간단한 POC를 실행하기가 굉장히 어렵게 되었는데, 이는 MongoDB의 프로덕션 환경 설정을 필요로 했기 때문입니다. 데이터 무결성이 반드시 유지되어야 하는 매우 민감한 데이터를 다루는 제품에서는 적합하지 않았습니다.

- 관계형 기능 부재: MongoDB에서는 선택할 수 있는 CASCADE와 같은 관계형 세계의 많은 편리한 기능을 잃게 되었습니다. 이 기능은 목표 리소스를 삭제할 때 다른 테이블을 통해 참조된 모든 리소스를 삭제합니다. 우리의 데이터가 매우 관계적이었기 때문에 특히 아플 정도였습니다. 그 결과, 우리는 이전 코드베이스에서 완전히 수행되지 않았고 MongoDB 데이터베이스에 매달려있는 리소스를 남기는 무거운 삭제 기능을 사용했습니다.

- 클라우드 제공자 간 지원 부족: MongoDB의 라이선스 변경(SSPL) 이후 많은 클라우드 제공 업체가 MongoDB의 이전 버전을 제공하기 시작했습니다. 결과적으로, MongoDB의 최신 안정 버전 이외의 버전을 실행 중인 고객을 위해 Infisical의 기능의 가용성을 보장하는 것이 어렵다는 것을 깨달았습니다.

- MongoDB 경험 부족: 더 많은 사람들이 SQL 기반 데이터베이스를 배포하는 데 친숙했기 때문에 MongoDB를 확장하고 적절히 구성하는 데 어려움을 겪기도 했습니다. 이로 인해 MongoDB에 익숙하지 않았기 때문에 특히 고객들에게 제공해야 하는 서비스 양이 불균형하게 증가했습니다.

여러 이유 중에서 우리는 Infisical을 전 세계의 팀과 조직에 더욱 접근 가능하게 만들기 위해 궁극적인 기능으로 더욱 보편적인 것으로의 완전한 데이터베이스 이전이 필요하다는 깨달음을 얻었습니다.

# 왜 PostgreSQL을 선택했는가?

새 데이터베이스를 찾을 때, 우리는 우리에게 가장 중요한 측면을 나열하여 시작했습니다: 관리의 용이성(즉, 구성, 배포 및 확장 포함), 트랜잭션을 위한 내장 지원 및 관계적 기능. 논의의 일환으로, 우리는 직접 통합 저장소를 구축할지 외부 저장소 솔루션을 추구할지에 대해 고민하기도 했습니다.

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

각 옵션에 대한 의미는 다음과 같습니다:

- 통합 스토리지: 우리는 SQLite와 같은 데이터베이스 시스템을 직접 Infisical에 포함시키고 추가 네트워크 합을 피해 지연 시간을 줄이기 위해 수평 복제 전략을 채택할 수 있었습니다. 이 모델에서 시스템의 확장은 Infisical의 여러 인스턴스를 배포하고 Raft와 같은 일치 알고리즘을 통해 서로 통신하도록 하는 것을 의미했습니다. 고객이 Infisical을 실행하기 위해 종속성을 연결할 필요가 없다는 점이 훌륭한 해결책으로 보였지만, 이 비전을 실행하기 위한 도구 생태계는 미숙하게 느껴지고, 그에 필요한 공학 노력은 어마어마한 것으로 느껴졌습니다.
- 외부 스토리지: 우리는 단순히 MongoDB를 PostgreSQL이나 MySQL과 같은 다른 데이터베이스로 교체하고 내장된 확장 능력을 사용할 수 있었습니다. 이 해결책은 Infisical을 사용하기 위해 외부 종속성이 필요하다는 마찰을 완전히 제거하지는 않았지만, MongoDB가 아니라는 점만으로도 중요한 혜택을 제공한다고 느꼈습니다. 하나 이상의 데이터베이스를 지원하는 데 있어서 여러 데이터베이스를 지원한다면 각 솔루션의 고유한 장점을 놓칠 수 있을 뿐만 아니라 엔지니어링 부담도 증가할 것으로 판단했습니다.

신중한 고려 끝에, 우리는 PostgreSQL을 선택했습니다. 활기찬 커뮤니티, 방대한 문서화, 다양한 솔루션과 확장 프로그램이 제공되는 것을 넘어서, 우리는 PostgreSQL의 오픈 소스 특성과 대부분의 클라우드 제공업체에서 PostgreSQL의 관리 서비스를 제공한다는 점을 가장 감사했습니다.

이 모든 선택은 Infisical의 사용자들이 어떤 클라우드 제공 업체에서도 우리 플랫폼을 쉽게 자체 호스팅하고 해당 관리형 PostgreSQL 서비스와 함께 사용할 수 있음을 의미합니다. 더욱이, 이 데이터베이스가 널리 채택되었다는 점을 고려할 때, 사용자들이 Infisical을 사용할 때 데이터베이스를 운영하는 데 더 적은 문제가 있을 것으로 확신했습니다.

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

# ORM은 어떻게 됐나요?

PostgreSQL을 선택한 후, 어플리케이션이 데이터베이스와 상호작용하는 방법을 결정해야 했습니다. MongoDB에서 Mongoose ORM을 사용한 경험과 유사한 것을 원했기에 즉시 Drizzle ORM, Prisma ORM, TypeORM 및 질의 빌더인 Knex.js를 중점적으로 검토하기 시작했습니다.

결국, 우리는 더 좋은 데이터베이스 제어를 위해 ORM 대신 쿼리 빌더인 Knex.js를 사용하기로 결정했습니다. 말은 듣기 어려워서 작업 유지가 어렵고, 특히 적절한 TypeScript 지원 없이는 실수하기 쉬울 것 같은 생각이 들었기 때문입니다. 게다가 Knex.js는 순수 SQL에 가깝지만 시드 및 마이그레이션을 위한 도구가 탑재되어 있었으며, 훌륭한 문서와 거의 모든 쿼리에 대한 답변을 갖춘 성숙한 생태계를 갖췄습니다. 몇 가지 사용자 정의 Zod 통합 작업과 결합하여 TypeScript 지원을 만족스러운 수준으로 유지할 수 있었습니다.

데이터베이스와 ORM을 결정한 후, 이어지는 과정에서 수십 개의 데이터 구조 및 수백 개의 쿼리를 어플리케이션 전반에 걸쳐 다시 작성하는 작업을 시작했습니다.

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

# 마이그레이션 계획은 어떻게 세웠나요?

코드 재작성이 끝나가는 시점에, 우리는 MongoDB 데이터를 PostgreSQL로 매핑하는 마이그레이션 작업을 수행하는 방법에 대해 고민하기 시작했습니다. 이 작업은 Infisical Cloud 플랫폼에 최소한의 방해를 주며 실시하는 것이 목표였습니다.

Infisical이 고객 인프라에서 중대한 역할을 하는 점을 감안하여 절대 다운타임은 허용할 수 없다는 결론을 즉시 도출했습니다. 마이그레이션 기간 동안 쓰기 작업을 금지하는 것으로 일시적으로 타협해야 했지만(즉, 고객이 응용 프로그램 구성을 생성하거나 업데이트할 수 없는 경우), 더 높은 데이터 무결성을 보장하는 대신 이를 선택한 것이었습니다. 이러한 트레이드오프는 고객이 주로 Infisical에서 시크릿을 검색하고, 그 다음으로 두 번째로 응용 프로그램 구성을 초 단위로 업데이트하는 경우에 수용 가능해 보였습니다.

이어서 실제 마이그레이션 작업에 대해 고민할 때 MongoDB에서 데이터를 덤프하고 신중히 변환한 후 PostgreSQL로 다시 삽입해야 했습니다. 마이그레이션 순서를 심사하면서, NoSQL에서 가져온 다양한 트리 형태의 구조를 관련된 상대적인 구조로 올바르게 변환해야 하는 등 다양한 어려움을 겪었습니다; 특히 재귀적인 고려가 필요한 폴더와 같은 데이터 구조에 대해 민감했습니다. 또한, MongoDB에서 PostgreSQL로 식별자를 저장하고 매핑하는 지속적인 방법이 필요하다는 사실을 발견했으며, 메모리에 저장하면 처리할 데이터 양을 고려할 때 동작하지 않을 것 같았습니다. 결과적으로, 우리는 식별자 저장 및 조회 작업을 돕기 위해 LevelDB 키-값 저장소를 사용하기로 결정했습니다. 이를 통해 결과적으로 각 테이블을 순차적으로 PostgreSQL로 이동할 것입니다.

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

# 위대한 이주

드디어, 우리는 이주를 진행할 준비가 되었습니다. 이 시점에서 코드베이스 재작성에 직접 관여하지 않은 사람들은 Infisical의 기타 측면을 개선하는 데 매우 중요한 한 분기를 보내었는데, 프런트엔드 변경사항을 만들고 유지 관리 패치를 수행하며 클라이언트 기능을 확장하고 더 나은 문서를 작성했습니다. 이제 이주 자체를 준비하기 위해 모두가 모여 새로운 애플리케이션 코드베이스로 교체하고 데이터를 MongoDB에서 PostgreSQL로 이전하는 작업을 시작했습니다.

준비과정에서 우리는 예상 일정을 포함한 자세한 이주 체크리스트를 작성했습니다.

전반적으로 계획은 다음과 같습니다:

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

- 이주 동안 이주를 준비하는 동안, 사용자들에게 장기적인 데이터베이스 업그레이드에 대해 미리 이메일과 앱 내 배너를 통해 통지하겠습니다. 플랫폼의 모든 기능 flow에 대한 철저한 테스트를 수행하고, 이주를 위한 시범 운영도 진행할 것입니다.
- 이주 자체는 단순히 소요되는 6시간 동안에만 읽기 작업만 허용되는 창을 통해 진행됩니다. 이 기간 동안 MongoDB에서 PostgreSQL로 데이터를 이동하는 이주 스크립트를 실행하고, 데이터 손실이 없는지 확인한 후 성공적으로 DNS를 새 인스턴스로 전환할 것입니다. 물론, 상황이 역행할 경우를 대비한 백업 계획도 마련되어 있습니다.
- 마침내 이주 후, 어떠한 잔여 문제도 해결하고 Infisical과 PostgreSQL을 사용하여 새로운 문서를 점차 배포할 것입니다.

계획이 준비되어 있다면, 실행으로 나아갑시다.

# 결과

다행히도, 이주 실행은 원활하게 진행되어 데이터 손실이 없었고, 몇 가지 중요하지 않은 기능 장애 사례만 발생했습니다. 이러한 버그는 소비자에게 미미한 영향을 미친 채 36시간 이후에 해결하였습니다.

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

이주 후에 우리는 많은 이점을 발견했습니다:

- 쿼리 최적화와 조인을 통한 성능 향상으로 인해 플랫폼이 상당한 성능 향상을 경험했습니다. MongoDB를 사용할 때, 필요한 기능을 얻기 위해 종종 비효율적인 집계 쿼리와 여러 네트워크 항해를 거쳐야 했었습니다. 핵심 데이터의 관계적 특성으로 인해 SQL에서 조인을 모방하려면 많은 $lookup 작업을 수행해야 했는데, 이러한 작업은 비효율적이었고 데이터베이스와 응용 프로그램 인스턴스를 모두 확장해야 했습니다. PostgreSQL로 이전하면서 이러한 비효율적인 작업을 피하고 데이터베이스 청구서 비용을 50% 절감했습니다.
- 플랫폼은 이제 어플리케이션 레벨이 아닌 데이터베이스 레벨에서 더 나은 데이터 유효성 검사를 하게 되었습니다. MongoDB는 설계상 스키마가 없기 때문에 데이터 유형, 필수 필드 및 유효성 규칙을 정의하기 위해 Mongoose 프레임워크에 의존했습니다. PostgreSQL이 구축된 상태로 데이터 불일치를 더 이상 경험하지 않았으며, Mongoose 판권 범위를 벗어난 데이터베이스에 액세스하거나 수정시 발생하던 문제를 더 이상 겪지 않았습니다.
- 마지막으로 매우 중요한 점은 고객이 MongoDB의 복제 집합을 다루는 추가 구성 부담 없이 증명 사례를 수행할 수 있는 등 Infisical이 이제 훨씬 쉽게 자체 호스팅될 수 있다는 것입니다.

전체적으로, 목표, 업무 범위 및 실행 결과를 고려할 때, 이 이니셔티브를 매우 성공적으로 평가했습니다. 미래에 더 많은 데이터를 보유할 때 구체적인 결과를 발표할 계획입니다.

# 결론

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

몽고디비에서 포스트그레스큐엘로 이전하기로 한 결정은 처음부터 쉬운 일은 아니었습니다. 모든 과정을 신중하게 계획하고 논의한 후, 우리는 이 일을 수행하기 위해 3~4개월이 걸렸습니다. 왜 이렇게 해야 하는지, 어떻게 실행할 것인지에 대해 심도있게 고민한 끝에 모든 것을 신중히 실행할 수 있었습니다. 이 글을 읽는 누구에게든, 이러한 큰 작업에 속해들기 전에 사용 사례와 구현을 심각하게 고려하는 것을 강력히 권장합니다. 결국 모든 것이 계획대로 진행되어 매우 만족스럽습니다. 앞으로 인피지컬 사용자들에게 큰 변화를 가져다 줄 이런 거대한 업데이트를 성공적으로 전달할 수 있어 기쁩니다.

몽고디비에서 포스트그레스큐엘로의 이주 계획을 완벽히 수행한 Akhil Mohan과 인피지컬의 다른 모든 분들께 감사드립니다.

# 인피지컬 - 오픈 소스 시크릿 관리 플랫폼

![이주 이미지](/assets/img/2024-06-22-TheGreatMigrationfromMongoDBtoPostgreSQL_1.png)

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

Infisical (11.6K+ ⭐️)은 수천 개의 팀과 조직이 팀 및 인프라 전반에 걸쳐 비밀을 저장하고 동기화하는 데 도움을 줍니다.

GitHub 저장소: https://github.com/Infisical/infisical
