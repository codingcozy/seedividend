---
title: "1줄짜리 SQL로 스테이징 테이블 데이터를 프로덕션 데이터로 이동하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-GoFromStagingTableToProductionDataWith1StupidSimpleSQLLine_0.png"
date: 2024-07-13 19:37
ogImage: 
  url: /TIL/assets/img/2024-07-13-GoFromStagingTableToProductionDataWith1StupidSimpleSQLLine_0.png
tag: Tech
originalTitle: "Go From Staging Table To Production Data With 1 Stupid Simple SQL Line"
link: "https://medium.com/pipeline-a-data-engineering-resource/go-from-staging-table-to-production-data-with-1-stupid-simple-sql-line-79ddf31c5129"
---


취업을 찾고 계신가요? 무료 5페이지 프로젝트 아이데이션 가이드를 활용하여 개인 프로젝트를 개발하여 경쟁력을 확보하세요.

데이터 엔지니어링 튜토리얼에서 s-단어에 대해 충분히 다루지 않습니다. 제안을 제출하고 잘못 처리되면 반사적으로 터지는 네 글자의 욕설을 말하는 것이 아닙니다. 또는 스키마가 대상 테이블과 일치하지 않을 때 중얼거리는 말을 의미하지 않습니다.

저는 스테이징에 대해 이야기합니다.

왜냐하면 "언제 (데이터 소스)가 프로덕션에서 이용 가능해질까요?" 라는 스테이크홀더들로부터 받는 모든 질문에 대해 멈추고 "먼저 스테이징 테이블로 로드되어야 합니다." 라고 말하기 때문입니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

그리고 지나치게 명료해질 위험이 있지만, 스테이징 환경이란 단순히 당신의 코드를 테스트하는 모래 상자가 아닙니다. 이것은 데이터 페이로드가 "스위치를 누르고" 제품 끝점, 테이블 및 대시보드를 가리키는 우리의 파이프 라인을 향하는 마지막 과정입니다.

이상적으로, 당신의 스테이징 환경은 생산 테이블을 흉내 내며 다음과 같은 높은 데이터 엔지니어링 표준을 유지해야 합니다:

- 클러스터링
- 파티셔닝
- 중복 제거

이런 식으로 스테이징 테이블은 당신의 관리자, 팀 리더 또는 이해 관계자가 "이 데이터가 이 형식으로 제공될 수 있다고 자신 있습니다." 라고 말하기 전에 검토할 최종 초안을 나타냅니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

무대 테이블을 세심하게 조사하는 동안에는 스키마와 파이프라인 기준을 세련된 상태로 개선하는 기회가 될 수 있지만, 그보다 중요한 것은 스위치를 뒤집는 시점에 발생하는 오류를 최소화하는 시간입니다.

무대 테이블에 대해 800단어를 더 읽고 싶어할지도 모르겠지만, 저의 목표는 스테이징→프로덕션 전환을 원활하게 만들 수 있는 전략을 공유하는 것입니다.

그리고 당신이 아마 존재한다는 명령어와 함께 빅쿼리 SQL의 1줄만 있을 뿐입니다.

참고: 아래 과정은 특정 시나리오에 해당합니다 - 기존 테이블의 스키마를 편집하여 어떤 이유로든 끝에 추가할 수 없는 필드를 추가하는 것입니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


<img src="/TIL/assets/img/2024-07-13-GoFromStagingTableToProductionDataWith1StupidSimpleSQLLine_0.png" />

저는 새로운 직업에서 3년이 지난 지금도 데이터 엔지니어링 분야에 관심을 가지고 있는 행운아라 생각합니다. 이야기하고자 하는 것은 앞으로 하지 않으면 안 될 작업이 없다는 것은 아니라는 점입니다.

그 중 한 가지 작업이 데이터 엔지니어링의 기초에 관련되어 있습니다: 프로덕션 테이블을 덮어씌우는 것입니다.

명확하게 말하면, 저는 테이블에 DML을 사용하는 것을 두렵게 여기지는 않습니다. 단지 파괴를 최소화하는 방법을 사용하려고 노력하는 것 뿐입니다.


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

일반적으로 테이블 중간에 새 열을 삽입해야 한다면, 다음 단계를 따릅니다:

- 기존 열을 모두 선택합니다.
- 모든 열이 포함되었는지 확인하기 위해 UNION ALL 문을 작성합니다.
- 새 열(또는 유형 변경을 위해 기존 열을 CAST())을 SELECT 문에 추가합니다.
- BigQuery UI의 설정으로 전환합니다.
- "테이블 덮어쓰기"를 선택합니다.
- 원본 테이블의 데이터셋/이름을 입력합니다.
- 실행합니다.
- 변경 사항을 확인합니다.

이렇게 들리겠지만, 조금의 연습을 통해 이 과정은 5분 이하로 완료할 수 있습니다.

하지만, 전 상사에 따르면 더 짧게 할 수 있다고 하네요.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

생산 테이블의 구조를 편집하는 대신에는 위험이 따르므로 스테이징 테이블을 만들고 그 스테이징 테이블을 생산 테이블의 이름으로 다시 별칭을 지정해야 합니다.

만약 이 최종 결과물을 생성하기 위해 테이블을 생성/대체하거나 삭제해야 한다고 생각한다면, 예의를 갖추어 말씀드리면 틀린 판단일 것입니다.

BigQuery는 다양한 유용한 DML 함수를 제공하는데, 그 중에서도 잘 알려지지 않은 함수 중 하나는 ALTER와 함께 사용되는 RENAME 명령입니다.

이것을 함께 사용하면 다음과 같습니다:

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


ALTER TABLE `dataset.table` RENAME TO table

스키마를 건드리지 않은 채 이 프로세스는 다음과 같습니다:

- 스테이징 테이블을 생성합니다 (이미 생성된 경우 제외)
- 전환할 준비가 되면 원본 테이블의 이름을 다르게 변경하여 두 개의 테이블을 가지고 있도록 합니다. 두 테이블 중 하나도 원본 테이블 이름을 가지지 않도록 합니다. 일반적으로 "og"를 추가하여 태그를 달아요. 예를 들어, financial_data_eom 테이블의 경우 financial_data_eom_og 및 financial_data_eom_test를 사용하겠습니다.

3. 변경사항에 대해 자신감을 갖고 (이와 같이 이해 관계자들도) 된다면 ALTER TABLE 문을 실행합니다:


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


ALTER TABLE financial_data_eom_test RENAME TO financial_data_eom

4. Run a few quality assurance (QA) queries and merge the PR that contains a pipeline with the updated schema

Functionally, this provides you the ability to not only assure you’ve tested your changes, but also to preserve your original data and schema, should you need to revert to the “_og” table.

Think of it like a save point or respawn in a video game. Or, if you want a more developer-centric explanation: The “_og” table contains your version history.


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

스테이징 테이블에서 전환하는 것이 위험이 적지만, 위험이 없다는 뜻은 아닙니다.

다음 사항을 염두에 두시기 바랍니다:

- 스테이징 테이블을 생성할 때, 프로덕션 테이블과 동일한 클러스터링/파티셔닝 사양이 있어야 합니다.
- 원본 테이블에서 데이터를 보존했더라도 업데이트된 테이블은 새로운 테이블입니다. 생성 시 메타데이터에는 새로운 생성 날짜와 최종 수정 날짜가 표시됩니다.
- 새 테이블을 생성하면 추가 비용이 발생합니다. 이 방법을 시도할 경우 크기와 보관 기간을 고려해야 합니다.

이 방법은 꽤 복잡한 것에 초보적으로 보일 수 있지만, 제 경험 상 스테이징 테이블을 통해 주요 변경 사항을 푸시하는 것이 프로덕션 편집보다 훨씬 편하고 확실하다고 느꼈습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 팁을 배운 지 얼마 지나지 않아서 역으로 해야 할 일이 발생했습니다. 코드가 불완전한 스키마를 포함하여 받은 후에 밤늦게 이전 버전의 테이블로 되돌려야 했죠.

제출 마감이 몇 분 남았음에도 압박을 느꼈지만, 백업할 스테이징 테이블 덕분에 전환이 매우 원활하게 진행되었습니다. 테이블 이름 변경과 레포지토리의 커밋 이력에서 코드를 다시 커밋하는 사이에 3분만에 작업이 완료되었습니다.

생산 스위치를 뒤집을 때는 두 가지 위치가 있는 것이 정말 다행입니다.

도와주셔야 해요. 이 블로그 외에 어떻게 도와드릴 수 있는지 말씀해 주실 3가지 질문 설문에 응해주세요. 응답한 모든 분들께 무료 선물을 보내드릴게요.