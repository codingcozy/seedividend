---
title: "Microsoft Fabric를 위한 확장 가능한 데이터 수집 프레임워크 구축하기"
description: ""
coverImage: "/assets/img/2024-05-16-BuildingascalabledataingestionframeworkforMicrosoftFabric_0.png"
date: 2024-05-16 17:14
ogImage:
  url: /assets/img/2024-05-16-BuildingascalabledataingestionframeworkforMicrosoftFabric_0.png
tag: Tech
originalTitle: "Building a scalable data ingestion framework for Microsoft Fabric"
link: "https://medium.com/@piethein/building-a-scalable-data-ingestion-framework-for-microsoft-fabric-9f2985a1e2f3"
isUpdated: true
---

이 기사는 고객 교류 중 자주 논의되는 주제인 데이터 엔지니어링 확장에 대해 다룹니다. 데이터 수집 및 유효성 검사 프로세스를 간소화하기 위한 방법을 어떻게 향상시킬 수 있을까요? 이 질문은 복잡하며, 원하는 대상 아키텍처, 데이터 품질 및 모델링 요구 사항, 메타데이터 관리 등과 같은 다양한 측면과 얽힌 문제입니다.

데이터 엔지니어링 확장의 주요 도전 과제 중 하나는 코드 작성, 매개변수 설정, 파이프라인 테스트 및 성능 모니터링과 같은 반복적이고 종종 지루한 작업을 처리하는 out-of-the-box 솔루션이 부재한 점입니다. 이 문제는 서로 다른 조직들 사이에 요구 사항의 크고 다양한 변화 때문에 주로 발생합니다. 어떤 회사들은 원본 시스템에 대해 기술 표준을 매우 다양화시키지만, 다른 회사들은 공급업체가 적고 복잡한 원본 시스템을 유지합니다. 어떤 회사들은 데이터를 광범위하게 층으로 나누는 것을 선호하지만, 다른 회사들은 권장하는 3단계 Medallion Architecture로 충분히 만족합니다. 어떤 회사들은 다른 팀 간에 데이터 큐레이션을 민주화하는 것보다 중앙 통제를 선호합니다.

복잡성과 다양성과 무관하게, 대부분의 기업의 목표는 데이터 엔지니어링을 간소화하기 위한 확장 가능한 수집 프레임워크를 구축하는 것입니다. Microsoft Fabric을 위한 최소한의 실용 제품을 만들면서 이 작업이 어떻게 이루어지는지 알아봅시다.

주의! 이 글은 깊이 있는 포괄적인 블로그 글입니다. Microsoft Fabric를 직접 다뤄보고 데이터 파이프라인을 시작하고, 메타데이터 중심의 수집 프레임워크를 구현하고, 모든 것을 매력적이고 유익하게 통합해 보겠습니다. 서로 다른 섹션 간에 추가적인 고려 사항을 제공할 것입니다.

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

## 모든 공학 작업을 표준화할 수는 없습니다

확장성의 핵심은 메타데이터 중심의 수집 프레임워크를 구축하는 데 있습니다. 이를 통해 대부분의 작업을 자동화할 수 있습니다. 그러나 데이터 수집 또는 추출의 모든 단계를 쉽게 표준화하거나 동일한 수준의 자동화를 달성할 수 있다고 이해하는 것이 중요합니다. 이러한 과정을 자세히 살펴보고 왜 복잡성이 다양한지 이해해보겠습니다.

여러 단계와 우리가 구현할 수 있는 자동화와 표준화의 정도를 설명하는 시각화를 만들었습니다. 왼쪽에는 추출 및 수집 과정이 있습니다. 데이터 엔지니어링의 첫 번째 단계는 기술과 공급업체 솔루션의 다양성 때문에 복잡합니다.

예를 들어, 일부 공급업체는 고유한 API (Application Programming Interfaces) 또는 고유의 데이터 형식을 사용하여 데이터 추출을 수행합니다. 공급업체가 CSV 내보내기 형식 만 지원하는 경우, 여러분은 이에 맞게 프로세스를 조정해야 합니다. 한 번 이 장벽을 극복하고 데이터가 표준화 (Delta) 형식으로 제공되면, 더 많은 표준화와 자동화를 진행할 수 있습니다.

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

우리 다이어그램으로 돌아와서, 브론즈(원시 데이터)에서 실버(정제 및 히스토라이즈된 데이터)로의 전환은 상당히 더 직관적으로 보입니다. 이 단계에서의 변환은 일반적으로 예측 가능하고 비교적 간단하여, 컬럼 이름 변경, 필터 적용, 데이터 기본값 설정 등의 작업을 포함합니다. 보다 예측 가능한 성격 때문에, 데이터 엔지니어링의 이 단계는 매개변수화하기가 더 쉽고 효율적이며 관리하기 용이합니다.

데이터 엔지니어링 프로세스의 마지막 단계는 정제된 데이터를 소비자에게 전달하는 것을 포함합니다. 이 단계는 통합에 필요한 까다로운 비즈니스 로직 때문에 주로 매개변수화하기가 어렵습니다. 이 로직은 메타데이터만을 사용하여 쉽게 설명하기 어렵습니다. 그러나 우리는 워크플로우에 표준화 수준을 도입할 수 있습니다. 템플릿과 서비스를 활용하여 프로세스를 최적화하여 효율성을 높이고 더 효율적이고 관리하기 쉽도록 만들 수 있습니다.

따라서 데이터 엔지니어링의 다른 단계들의 변화를 이해하고 관리하는 것은 확장 가능한 데이터 수집 프레임워크를 구축하는 데 중요합니다. 이제 손을 댄 예제를 사용하여 구체적인 내용으로 살펴봅시다.

## MVP의 사전 요구 사항

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

저는 제안하는 해결책이 Microsoft Fabric을 사용한다고 합니다. Microsoft Fabric에 익숙하지 않다면, 최신 데이터 솔루션을 구축하기 위해 설계된 클라우드 네이티브 플랫폼으로 Lakehouse 아키텍처를 활용하는 강력한 하이브리드 솔루션입니다. 이는 데이터 웨어하우스와 데이터 레이크의 기능을 결합한 것입니다.

이 블로그 포스트에서는 Azure SQL에 호스팅된 AdventureWorks 샘플 데이터베이스를 활용하고, 모든 메타데이터를 저장하기 위해 또 다른 Azure SQL 데이터베이스를 활용할 것입니다. 따라서 이 글에서 안내하는 작업을 복제하려면 먼저 이러한 서비스를 배포해야 합니다.

Microsoft Fabric을 구성하려면 적어도 하나의 워크스페이스, Bronze, Silver 및 Gold라는 세 개의 Lakehouse, 그리고 비어 있는 데이터 파이프라인을 생성해야 합니다. 이 기본 설정은 데이터 엔지니어링 프로세스를 더 발전시키고 정제하는 데 필요한 토대를 마련할 것입니다.

## 구성 — Copy Data 도구를 사용하여 파이프라인 생성하기

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

데이터 파이프라인 설계의 초기 단계는 데이터를 플랫폼으로 가져오는 것입니다. 이를 위해 우리는 Out-of-the-Box 커넥터를 활용할 것입니다. 저희 프로젝트에서는 다양한 데이터베이스 및 시스템을 지원하는 Data Factory를 사용할 것입니다. 우리의 데이터 소스는 AdventureWorks 샘플 데이터베이스를 호스팅하는 Azure SQL 서비스입니다.

모든 데이터를 복사하는 대신, 관련 기능 테이블만 선택하기로 결정했습니다. Microsoft Fabric에서 새 데이터 파이프라인 항목을 정의하면, 첫 번째 단계는 Lookup 활동을 끌어다 놓는 것입니다. 설정으로 이동하여 외부를 선택하고 새로 만들어서 데이터 소스에 연결을 설정하기 위한 모든 필요한 정보를 입력하십시오. 원하는 테이블을 검색하기 위해 쿼리를 사용하십시오. 저는 그 목적으로 다음 문을 사용하고 있습니다:

```js
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = 'SalesLT'
```

또한, '첫 번째 행만'을 선택 해제해 주세요. 이러한 단계를 따르면 나머지 파이프라인을 설계할 준비가 됩니다.

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

각 데이터 원본이 다르게 작동한다는 점을 염두에 두는 것이 중요합니다. 따라서 작업 중인 원본에 따라 파이프라인의 초기 부분이 달라질 수 있습니다. 이것을 기억하며 파이프라인 디자인을 진행해 주세요.

## Parquet 파일과 폴더를 사용한 스냅샷의 히스토라이징

수집할 데이터를 결정한 후, 다음 단계는 이를 데이터 플랫폼으로 전송하는 것인데, 여기서는 Microsoft Fabric을 사용합니다. Medallion 아키텍처의 맥락에서, 이 데이터를 Bronze이라는 첫 번째 레이어에 저장할 것입니다. 이를 위해 두 가지를 달성하고자 합니다: 먼저, 파일 섹션에서 Parquet을 사용하여 모든 스냅샷의 히스토리를 만들 것이고, 두 번째로, 가장 최근 데이터를 Delta 테이블로 승격시킬 것입니다.

이 두 가지 작업을 왜 수행하는 걸까요? 첫째, 히스토리컬 아카이브를 생성하면 어떤 손상된 레이어든 복구할 수 있습니다. 가장 최근 복사본만 유지했다면 오류 발생 시 데이터를 복구할 수 없었을 것입니다. 그래서, 시간을 되돌아가 데이터셋을 다시 처리할 수 있습니다. 둘째, 가장 최근 데이터를 Delta 파일로 승격시킴으로써 기계 학습이나 리포팅과 같은 서비스를 사용한 아훕적인 발견이 쉬워집니다.

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

두 가지 목표를 달성하기 위해 모든 필수 단계를 포함하는 ForEach 활동을 만들 것입니다. 이미 최종 결과를 보여줬지만, 이 작업을 복제하려면 ForEach 작업 내 첫 번째 활동은 Copy Data Activity가 될 것입니다.

소스 파일을 선택하려면 소스 섹션으로 이동하세요. 이미 설정한 기존 연결을 재사용하세요. 테이블에 대해 두 가지 인수를 사용하겠습니다:

```js
@item().table_schema
@item().table_name
```

대상으로는 Bronze Lakehouse를 사용할 것입니다. 워크스페이스에 아직 Bronze Lakehouse 항목을 만들지 않았다면 먼저 생성해야 합니다. 위치로는 Root Folder를 Files로 선택하세요. 그런 다음 파일 경로에 다음 식을 사용하세요. 저는 간단한 yyyyMMdd 분할 방식을 사용하고 있지만, 더 많은 데이터를 저장하려면 타임스탬프 또는 다른 방식을 사용해도 괜찮습니다.

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
@formatDateTime(utcnow(), 'yyyyMMdd')
@concat(item().table_schema,'.',item().table_name,'.parquet')
```

위 단계를 완료하신 후에는 파이프라인을 실행하고 브론즈 레이어를 확인하여 결과를 유효성 검사하세요. 제 경우에는 결과가 다음과 같이 나타납니다. 즉시 다양한 폴더가 많이 보입니다. 각 폴더는 전달 날짜별로 구성되어 해당 일의 모든 기능 데이터를 포함합니다. 이 접근 방식은 데이터를 깔끔하고 연대적으로 배치하여 특정 정보를 찾기 쉽게 만듭니다.

한 번 더 강조하자면, 채택된 방법론은 다루고 있는 소스 시스템의 종류에 크게 의존합니다. 이 시나리오에서는 Parquet 파일을 사용하여 데이터를 일괄 적재합니다. 그러나 형식은 CSV, XML, JSON 등 다양할 수 있습니다. 또한 적재 방법도 달라질 수 있습니다. 완전한 로드를 사용하는 대신 델타를 로드하거나 실시간 적재를 선택할 수도 있습니다.

## 최신 Parquet 파일을 Delta 테이블로 승격하기

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

다음 단계는 가장 최근 파일들을 Delta 테이블로 프로모션하는 것입니다. 이렇게 하면 이전에 처리된 데이터셋이 그대로 유지됩니다. 노트북을 사용하여 모든 것을 Bronze으로 프로모션할 것입니다. 따라서 파이프라인으로 돌아가서 ForEach 활동을 열고 노트북 활동을 드래그하여 Copy 활동에 연결하세요. "새로 만들기" 버튼을 클릭하여 하나를 생성해주세요.

그 다음, 아래 제공된 내용을 새롭게 생성된 노트북에 복사하여 붙여넣으세요. 첫 번째 셀은 인수 셀이어야 하므로 해당 설정을 조정해야 할 수 있습니다. 또한 출력 위치를 변경하는 것을 기억하세요. 아래 코드에서 OneLake 위치를 하드코딩했지만, 실제 제품 환경에서는 해당 인수를 전달하려고 할 것입니다. 동일한 메타스토어 구성을 사용하고 소스 시스템을 대상 워크스페이스 및 레이크하우스 위치에 링크하는 방법을 고려할 수 있습니다.

작업을 완료하면 노트북 옵션으로 돌아가세요. cw_table 및 cw_location 매개변수를 설정하고 준비가 되면 파이프라인을 실행하세요.

```js
@item().table_name
@formatDateTime(utcnow(), 'yyyyMMdd')
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

만약 모든 것이 원활하게 진행된다면, 브론즈 레이어 내에 새로 생성된 델타 테이블이 표시될 것입니다. 모든 테이블을 삭제하고 다시 구축하고 있음을 알려드립니다. 델타의 테이블 히스토리 기능을 활용할 필요가 없으니, 모든 데이터의 이전 복사본을 테이블 섹션에서 유지하고 있기 때문입니다.

지금까지 추출 및 적재 접근 방식은 작업 중인 소스 시스템에 따라 달라질 수 있음을 염두에 두는 것이 중요합니다. 우리의 경우, 프로세스는 비교적 간단했습니다. 그러나 다른 상황에서는 데이터가 임시 위치나 랜딩 존에 착륙하거나 다른 형식으로 제공될 수 있습니다. 확장성을 보장하기 위해, 기술적 파일 형식 변환, 복잡한 구조의 해제, 추가 작업 등을 위한 반복 가능한 스크립트를 개발하는 것을 제안합니다. 또한 가능한 경우 최선의 방법을 채택하세요.

## 메타데이터 저장소 구현

이 글의 두 번째 부분에 도달했습니다. 이제 표준 파일 형식을 사용하여 브론즈 레이어에 데이터를 성공적으로 착륙시킨 상태에서 우리는 실버 레이어로 모든 것을 유효성 검사하고 히스토라이징하여 확장성을 더욱 강화하기 ready합니다. 이 부분은 더 간단하고 예측 가능합니다. 필터링, 열 이름 바꾸기, 데이터 비교와 같은 변환 작업은 비교적 간단하기 때문에 이러한 단계를 더 쉽게 자동화할 수 있습니다. 이를 위해 모든 중요한 구성을 보유하는 메타데이터 저장소를 사용할 것입니다.

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

두 번째 Azure SQL 데이터베이스에는 모든 메타데이터를 보유하는 테이블을 생성하는 스크립트를 사용할 것입니다. 따라서 Azure SQL 데이터베이스로 이동하여 아래 제공된 스크립트를 실행하십시오. 제 목표는 철저한 접근 방식을 제공하는 것이 아니라 일반적인 개념을 설명하는 것이므로 참고해 주세요.

```js
CREATE TABLE SchemaMetadata
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    TableName NVARCHAR(128),
    ColumnName NVARCHAR(128),
    DataType NVARCHAR(128),
    CharacterMaximumLength INT,
    NumericPrecision INT,
    NumericScale INT,
    IsNullable NVARCHAR(3),
    DateTimePrecision INT,
    IsPrimaryKey BIT DEFAULT 0
)
GO
```

다음으로는 AdventureWorks 예제 데이터베이스에서 스키마 메타데이터를 검색해야 합니다. 이를 위해 정보 스키마에서 모든 메타데이터를 읽는 간단한 스크립트를 개발했습니다. 이 스크립트는 메타데이터 저장소에 대한 INSERT 문을 생성하는 데 사용될 수 있습니다. 이 예에서는 하나의 테이블로 설명하고 있음을 참고해 주세요.

```js
SELECT
    TABLE_NAME as 'TableName',
    COLUMN_NAME as 'ColumnName',
    DATA_TYPE as 'DataType',
    CHARACTER_MAXIMUM_LENGTH as 'CharacterMaximumLength',
    NUMERIC_PRECISION as 'NumericPrecision',
    NUMERIC_SCALE as 'NumericScale',
    IS_NULLABLE as 'IsNullable',
    DATETIME_PRECISION as 'DateTimePrecision',
    COLUMNPROPERTY(OBJECT_ID(TABLE_NAME), COLUMN_NAME, 'IsIdentity') as 'IsPrimaryKey'
FROM
    INFORMATION_SCHEMA.COLUMNS
WHERE
    TABLE_NAME = 'Address'
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

수집한 스키마 메타데이터를 활용하여 저희 메타데이터 저장소의 Azure SQL 데이터베이스로 돌아가서 모든 레코드를 삽입해주세요. 아래는 참고용 예시입니다.

```js
INSERT INTO SchemaMetadata
(TableName, ColumnName, DataType, CharacterMaximumLength, NumericPrecision, NumericScale, IsNullable, DateTimePrecision, IsPrimaryKey)
VALUES
('Address', 'AddressID', 'int', NULL, 10, 0, 'NO', NULL, 1),
('Address', 'AddressLine1', 'nvarchar', 60, NULL, NULL, 'NO', NULL, 0),
('Address', 'AddressLine2', 'nvarchar', 60, NULL, NULL, 'YES', NULL, 0),
('Address', 'City', 'nvarchar', 30, NULL, NULL, 'NO', NULL, 0),
('Address', 'StateProvince', 'int', NULL, 10, 0, 'NO', NULL, 0),
('Address', 'PostalCode', 'nvarchar', 15, NULL, NULL, 'NO', NULL, 0),
('Address', 'CountryRegion', 'geography', NULL, NULL, NULL, 'YES', NULL, 0),
('Address', 'rowguid', 'uniqueidentifier', NULL, NULL, NULL, 'NO', NULL, 0),
('Address', 'ModifiedDate', 'datetime', NULL, NULL, NULL, 'NO', 3, 0);
GO
```

아래에 최종 결과가 표시됩니다.

지금까지 수집한 메타데이터는 테이블 이름, 열, 데이터 형식, 널 가능 속성, 기본 키 등을 포함한 기본적인 내용뿐입니다. 계속해서 특정 도메인 정보, 여러 소스에 대한 메타데이터, 민감도 레이블과 같은 보안 메타데이터, 행 필터링을 위한 메타데이터 등으로 확장할 수 있습니다. 또한 소스 열을 대상 열로 이름 바꾸기, 간단한 조인 또는 연합 실행, 관련 없는 데이터 필터링 등과 같은 더 복잡한 처리 로직에 대한 메타데이터도 통합할 수 있습니다. 최종적으로 메타데이터의 범위는 특정 요구 사항 및 미래 사용 사례에 따라 다를 것입니다.

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

저희 실습 예제로 돌아가 봅시다. 준비가 되셨다면 ForEach 활동으로 돌아가세요. 여기에 새 Lookup 활동을 추가해 보세요. 이 작업은 워크플로에 끌어다 놓으면 새 연결을 설정하여 메타데이터 저장소에서 읽어옵니다. 호출을 만들기 위해 테이블 이름을 입력으로 사용할 것이기 때문에 다음 표현식을 사용하세요:

```js
@concat('SELECT * FROM [dbo].[SchemaMetadata] WHERE TableName=''',item().table_name,'''')
```

이 설정에서는 table_name 인수만 전달하고 있음을 유의해 주세요. 보다 상세한 설정에서는 데이터베이스 이름과 버전 등 추가 인수를 사용할 것으로 예상합니다.

## Great Expectations을 활용한 데이터 품질 검증하기

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

다음으로 데이터 처리 및 처리에 자동화 기능을 도입해 보겠습니다. 브론즈 단계의 데이터를 메타스토어의 메타데이터를 사용하여 유효성을 검사하는 것이 첫 번째 단계입니다. 이를 위해 새 'If Condition' 활동을 끌어다 놓으세요.

조건을 설정하기 위해 LookupMetadata 활동의 수를 검증하는 식을 사용할 것입니다. 수가 0을 초과하면 처리할 메타데이터가 있는 것을 나타냅니다.

```js
@greater(activity('LookupMetadata').output.count, 0)
```

이제 앞으로 나아가서 워크스페이스 내에서 Fabric 환경을 설정해야 합니다. 이 환경에는 데이터 유효성을 검사하는 데 필요한 패키지가 포함될 것입니다. 이번 데모에서는 데이터 품질 검증을 위한 인기 있는 오픈 소스 도구인 'Great Expectations'를 사용할 것입니다.

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

시작하려면 작업 공간으로 이동한 후 상단의 '새로 만들기'를 클릭하십시오. 드롭다운에서 '새 환경'을 선택하십시오. 이 작업으로 대화 상자가 나타납니다. 여기서 공개 라이브러리 아래에 'great-expectations'를 추가해야 합니다. 이 작업을 완료한 후 '게시'를 클릭하십시오. 새 환경을 사용할 준비가 될 때까지 시간이 걸릴 수 있다는 점을 참고해 주세요.

이후에는 데이터로 돌아가 'If Condition' 내부에 새로운 'Notebook' 활동을 추가하십시오. '설정 및 매개변수' 섹션에 'metadata'라는 새 매개변수를 추가해야 합니다. 해당 표현식을 사용하여 다음과 같이 입력하십시오.

```js
@string(activity('LookupMetadata').output.value)
```

이제 Python 스크립트 아래에서 제공된 내용을 사용하여 새로운 Notebook을 작성할 시간입니다. 이 스크립트에서는 우선 'metadata' 매개변수를 확인하고 JSON 형식으로 변환합니다. 그런 다음, 메타데이터를 반복하면서 데이터 품질 규칙을 작성합니다. 게다가, 데이터가 잘못된 경우 프로세스를 중지할 것입니다.

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

노트북 자체에 대해: 새로 생성한 환경을 노트북 환경 내에서 선택해야 합니다.

모든 단계를 완료한 후에 데이터 파이프라인을 시작하세요. 모든 것이 원활하게 진행되면, 메타데이터가 사용되어 데이터 품질을 동적으로 검증합니다. 이 유효성 검사는 기본적이며 현재는 열 이름만을 확인합니다. 그러나 이 스크립트는 기본 키 확인, 널 값 허용 여부, 고유성 등을 포함하여 얼마든지 확장할 수 있습니다.

## Silver에 처리된 데이터의 히스토라이징

데이터 파이프라인 생성의 이 부분에서는 Slowly Changing Dimensions(Type 2)를 사용하여 데이터를 히스토라이징할 것입니다.

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

형태를, 친절한 톤으로 번역하겠습니다.

SCDs(Slowly Changing Dimensions)는 현재 및 과거 데이터를 시간이 지남에 따라 단일 테이블에 통합합니다. 이 접근 방식은 여러 가지 이유로 중요합니다. 먼저, SCD는 데이터 진화의 전체적인 관점을 제공하여 트렌드 분석을 수행하고 머신러닝 모델을 구축하는 데 중요합니다. 이 과정은 데이터 진행을 시간에 따라 이해하는 데 도움이 됩니다. 둘째, SCD는 데이터 무결성과 일관성을 유지하는 데 도움이 됩니다. 마지막으로, SCD를 사용하면 효율성이 향상됩니다. 특정 시간대의 필요한 데이터만 추출하여 수백 개의 파일을 다시 처리할 필요가 없어집니다. 아래는 SCD 테이블이 어떻게 보이는지의 결과를 보실 수 있습니다.

데이터 품질 유효성 검사와 마찬가지로, 이 파이프라인의 이 부분도 자동화할 수 있습니다. 데이터를 비교하고 히스토리를 저장하기 위한 또 다른 노트북 활동을 추가해 봅시다.

이 작업을 위해 조금의 메타데이터를 사용할 것입니다. 'LookupMetadata' 활동으로부터 테이블 이름과 메타데이터를 제공하겠으며, 다른 노트북에 전달하여 아래와 같이 공유될 것입니다.

```js
@item().table_name
@string(activity('LookupMetadata').output.value)
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

위의 스크립트에 대해 이야기해 봐요. 메타데이터 내에 기본 키가 제공된 경우, 해당 키는 비교를 위한 기능 키로 사용됩니다. 그렇지 않은 경우, 행 내의 모든 값들을 입력으로 사용하여 고유 해시 값을 생성합니다. 저는 MERGE SQL 문을 사용하지 않기로 결정했는데요, 이전 데이터셋에서 같은 데이터를 다시 제출하거나 이전 데이터를 삭제해도 레코드를 완전히 제어하고 닫고 다시 열기를 원하기 때문입니다.

실버 레이어에서는 Delta Lake의 시간 여행 기능을 활용합니다. 따라서 테이블 자체에 기능적인 히스토리 데이터를 저장하는 것 외에도 트랜잭션 로그에서 변경 사항을 기록합니다. 이 접근 방식은 잘못 처리된 데이터셋을 지우는 유연성을 제공합니다. 예를 들어, 같은 이름을 공유하는 모든 고객을 포함하는 고객 파일이 제공되었다고 가정해 보세요. 기술적 데이터 품질 유효성 검사는이 문제를 감지하지 못할 수도 있으며, 결과적으로 이 데이터가 실버 레이어로 침투할 가능성이 높아집니다. 그러면 이전 레코드가 모두 업데이트되고 닫힐 것입니다. 이 문제를 해결하기 위해 시간 여행을 사용하여 이전 상태로 되돌릴 수 있습니다. 그런 다음 원본 시스템에 보정된 전달을 요청하고, 유효성을 검사하고 검토하여 보정된 데이터를 실버 레이어에 다시 통합시킬 수 있습니다.

## 실버 레이어를 위한 몇 가지 고려 사항

위에서 언급한 전략을 구현하면, 실버 레이어까지 데이터는 여전히 소스 중심입니다. 이러한 모범 사례를 따르는 것이 좋습니다. 실버 레이어에서 소스 중심 데이터를 유지하면 데이터 소유권을 결정하는 데 도움이 됩니다. 소스와 일치하는 데이터 제품을 관리하고 구축하는 것이 목표라면 엔지니어들에게 다른 도메인 애플리케이션 간에 데이터를 교차 조인하지 않도록 안내하는 것이 중요합니다. 더 엄격한 설계 접근 방식은 각 소스 시스템을 자체 Lakehouse 엔터티와 일치시키는 것입니다. 이렇게 하면 더 깨끗하고 효율적인 데이터 관리 전략을 보장하며, 데이터 중심 프로젝트를 감독하고 실행하기가 더 쉬워집니다.

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

실버 레이어를 계산 또는 비즈니스 로직과 같은 요소로 강화하는 계획을 세울 때 고려해야 할 사항이 몇 가지 있어요. 이러한 변환은 쉽게 매개변수화할 수 없어요. 그 결과, 이전 자동화된 단계를 기반으로하는 추가적인 실버 레이어를 만들어야 할지 고민해보실 필요가 있을지도 모르겠네요. 이 전략은 느슨한 결합과 유연성을 촉진하여 효율적인 데이터 관리를 위한 필수 구성 요소를 제공해요. 이 추가 레이어를 설정하는 데 더 많은 노력이 필요할 수 있지만, 제공하는 유연성은 투자의 가치가 있답니다. 이 접근 방식은 데이터 시스템의 기능을 향상시킬 뿐만 아니라 (원본에 맞게 정렬된) 데이터 제품을 비즈니스 요구 사항에 추가로 적응시킬 수 있는 것을 보장해요.

## 실버에서 골드로 처리하기

메달리온 아키텍처에서 골드 레이어는 "프로젝트별" 또는 "사용 사례별" 데이터로 구성되어 있어서 즉시 사용할 수 있는 데이터를 보관하고 있어요. 이 통합 단계는 복잡하며 특정 요구 사항에 매우 의존하고 있기 때문에 이전에 언급한 대로 복잡한 비즈니스 규칙을 포함할 가능성이 있어요. 변환에는 후속 처리 단계, 계산, 보강, 사용 사례별 최적화 등이 포함될 수 있어요.

골드 레이어는 아키텍처의 범위에 크게 의존하기 때문에 가장 복잡한 부분을 제공할 가능성이 높아요. 가장 간단한 설정에서는 골드 레이어가 통합과 사용 사례 레이어로 모두 작동할 수 있어요. 즉, 데이터를 먼저 통합한 다음 조직의 고유한 사용 사례에 따라 특정 하위 집합을 선택하여 맞춤화하여 구조화할 수 있어요. 이 맞춤화된 접근 방식은 데이터 아키텍처가 견고하며 조직의 특정 요구 사항과 목표에 최적으로 정렬되어 있는 것을 보장해줘요.

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

여러 도메인을 포함하는 아키텍처를 사용한다면, 골드 계층은 여러 하위 계층으로 나눌 수 있습니다. 예를 들어, 하나의 계층은 다양한 소스 시스템에서 초기 데이터 통합에 특화될 수 있습니다. 이어지는 계층은 특정 사용 사례를 위해 설계되며, 따라서 특정 요구 사항을 충족하기 위해 하위 집합을 맞춤화할 수 있습니다. 또 다른 계층은 새로운 데이터 제품을 개발하기 위해 할당될 수 있습니다. 이러한 계층들은 집계로 통칭되는 것을 형성하게 됩니다. 이에 대해 더 알고 싶다면, 메달리온 아키텍처의 층화에 관한 다른 블로그 포스트를 참조해 주세요.

다음 블로그 포스트에서는 Microsoft Fabric 내에서 DBT를 사용하여 실버와 골드 간의 데이터 변환과 통합을 표준화하는 방법을 시연할 예정입니다. DBT는 템플릿과 명령줄 인터페이스를 활용하는 데이터 변환 도구로, 프로세스를 간단하게 만들어 줍니다.

## 결론

메타데이터 기반의 수집 프레임워크 없이 수십 개 또는 수백 개의 소스 시스템을 도입하는 것은 어려운 작업일 수 있습니다. 복잡성은 각 소스 시스템을 모든 스크립트, 파이프라인, 활동 등을 수동으로 관리해야 한다는 점에서 발생합니다. 이는 시간이 많이 소요되며 오류가 발생하기 쉽고 표준화가 부족합니다.

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

메타데이터 주도 방식은 이 프로세스를 간소화합니다. 전통적인 코드 기반 전략에 비해 여러 가지 장점을 제공합니다:

- 메타데이터 주도 방식을 채택함으로써 파이프라인의 다양성과 적응성을 향상시킬 수 있습니다. 이를 통해 다양한 데이터 원본과 목적지를 지원할 수 있으며, 서로 다른 형식, 스키마 및 빈도에 맞도록 할 수 있습니다. 또한, 처리 기술을 조정함으로써 전체 로드, 증분 로드 또는 전체 덮어쓰기와 같은 여러 흡수 패턴을 수용할 수 있습니다.
- 메타데이터 주도 프레임워크는 작성하고 유지해야 하는 코드 양을 크게 줄일 수 있습니다. 여러 노트북을 작성하는 대신, 메타데이터를 기반으로 다양한 데이터 원본 및 목적지를 처리할 수 있는 통합 파이프라인을 생성하면 됩니다.
- 이 방식을 통해 개발 및 배포 프로세스가 크게 단순화되고 표준화됩니다. 메타데이터를 사용하여 손쉽게 검증 및 수정을 추가할 수 있어 코드를 변경하거나 파이프라인을 재배포할 필요가 없습니다.
- 파이프라인 설계에 따라 병렬 처리와 동시성을 달성하여 여러 복사 또는 노트북 활동을 동시에 실행할 수 있습니다. 이렇게 하면 파이프라인의 성능과 효율성을 최적화할 수 있습니다.

이 글이 도움이 되었기를 바랍니다. 데이터 품질, Microsoft Fabric, Microsoft Purview 등에 관한 기사를 더 많이 게시했음을 유의해 주세요! 또한, 이 블로그 게시물의 일부 내용은 "대규모 데이터 관리"이라는 책에서 인용되었음을 참고해 주세요.
