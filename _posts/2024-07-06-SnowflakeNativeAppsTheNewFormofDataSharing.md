---
title: "Snowflake 네이티브 앱 2024년 데이터 공유의 혁명"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-SnowflakeNativeAppsTheNewFormofDataSharing_0.png"
date: 2024-07-06 10:33
ogImage:
  url: /assets/img/2024-07-06-SnowflakeNativeAppsTheNewFormofDataSharing_0.png
tag: Tech
originalTitle: "Snowflake Native Apps: The New Form of “Data Sharing”"
link: "https://medium.com/snowflake/snowflake-native-apps-the-new-form-of-data-sharing-c1033650a620"
---

/assets/img/2024-07-06-SnowflakeNativeAppsTheNewFormofDataSharing_0.png

스노우플레이크 네이티브 앱은 스노우플레이크의 데이터 공유에 대한 새로운 접근 방식을 나타냅니다.

본 문서는 데이터 공유의 역사와 스노우플레이크에 대한 심층적인 이해를 목표로 합니다.

# 데이터 공유의 과제

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

현대에서는 데이터가 새로운 "석유"로 인식되고 있습니다. 그러나 데이터의 가치는 소유물에서만 나오는 것이 아닙니다. 진정으로 필요로 하는 사람들에게 전달되고 적절히 분석될 때에만 가치를 발휘합니다. Snowflake가 등장하기 전에는 다른 회사와 데이터를 공유하거나 판매하는 것이 굉장히 어려웠습니다.

# 모든 데이터를 사고 팔 수 있는 세상을 만들어가는 과정

Snowflake는 이 데이터 공유 도전에 도전했습니다. "모든 데이터를 사고 팔 수 있는 세상을 만들어가는" 비전을 가지고, Snowflake는 점진적으로 혁신적인 기능을 추가해 왔습니다. 첫 번째 추가된 것은 Direct Share 기능이었습니다.

Direct Share는 데이터베이스를 한 계정에서 다른 특정 계정으로 공유할 수 있는 기능입니다. 이 기능은 Share 객체라는 객체를 활용하여 데이터를 덤프하거나 복사하지 않고 제3자 계정과 안전하게 데이터를 공유할 수 있도록 합니다.

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

## 4단계에서 직접 공유 이해

공급자 계정의 SHARE 개체로 데이터를 "패키징"하고, 소비자 계정의 DB 개체로 "언패킹"하는 것으로 생각할 수 있습니다.

1. 공유 개체 생성

```js
CREATE SHARE TEST_SHARE
```

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

2. 데이터베이스/테이블에 대한 읽기 권한을 공유 개체 (패키징)에 부여하세요.

```js
GRANT USAGE ON DATABASE DB TO SHARE TEST_SHARE;
GRANT USAGE ON SCHEMA DB.SCHEMA TO SHARE TEST_SHARE;
GRANT SELECT ON TABLE DB.SHARE.TABLE TO SHARE TEST_SHARE;ｓｑ
```

3. 공유 개체의 대상 계정을 지정하세요.

```js
ALTER SHARE TEST_SHARE ADD ACCOUNTS=TEST_ORG.TEST_ACCOUNT;
```

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

4. 소비자 계정의 공유 객체에서 데이터베이스 만들기 (언 패킹)

```js
CREATE DATABASE TEST_SHARE FROM SHARE TEST_ORG.TEST_ACCOUNT.TEST_SHARE
```

## 직접 공유의 문제

그러나 직접 공유에는 중요한 도전 과제가 있었습니다: 다른 클라우드 공급업체나 지역 간에 공유할 수 없었습니다. 예를 들어, AWS 일본 지역 계정 간에는 공유가 가능했지만, AWS 일본 지역 계정과 AWS 미국 지역 계정 또는 AWS 일본 지역 계정과 Azure 일본 지역 계정 간에는 공유할 수 없었습니다.

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

만약 다른 제공업체나 지역 간에 꼭 공유가 필요한 경우, 소비자와 동일한 클라우드 제공업체 및 지역에 계정을 열어야 했고, 공유 개체와 데이터를 수동으로 복제한 다음 공유해야 했습니다. 이 과정은 번거롭고 비효율적이었습니다.

## 리스트팅 소개

다른 제공업체 및 지역 간 직접 공유 문제를 해결하기 위해 리스트팅 기능이 도입되었습니다. 리스트팅은 공유 개체를 래핑하고 공유 개체를 자동으로 복제하는 기능입니다. 이를 통해 수동 작업이 필요없이 소비자 요구를 충족할 수 있었습니다.

/assets/img/2024-07-06-SnowflakeNativeAppsTheNewFormofDataSharing_1.png

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

## 모든 데이터가 거래될 수있는 세상

직접 공유 및 목록 기능을 통해 데이터 제공 업체는 더 이상 어떠한 작업도 수행할 필요가 없었습니다. 이를 통해 시장에서 데이터를 자동으로 판매할 수 있게 되었습니다.

## 공유 객체의 문제점

그러나 공유 객체는 "데이터 처리 프로세스"를 저장할 수 없는 단점이 있었습니다. 예를 들어, Python 저장 프로시저를 사용하여 GA4에서 데이터를 가져오는 프로세스와 같은 프로세스는 기업간에 공통되어야하지만 이러한 데이터 처리 프로세스를 공유할 수있는 방법이 없었습니다.

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

# 모든 데이터 및 데이터 처리 프로세스를 거래할 수 있는 세계로

## 스노우플레이크 네이티브 앱의 등장

2023 년 6 월, 스노우플레이크 네이티브 앱이 등장하여 공유 객체의 문제를 해결하였습니다. 스노우플레이크 네이티브 앱은 본질적으로 응용 프로그램 패키지 객체입니다. 이들은 진화된 공유 객체로 간주될 수 있습니다. 제공 업체 계정에서 "데이터 처리 프로세스"를 "포장"하고 소비자 계정에서 "풀기"위한 컨테이너입니다. 공유 객체 대신 응용 프로그램 패키지 객체를 목록에 나열함으로써, Python 저장 프로 시저 및 기타 프로세스를 마켓플레이스에서 배포할 수 있습니다.

## Secure Data Share와 Snowflake 네이티브 앱의 비교

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

Secure Data Share 및 Snowflake Native Apps은 명령어만 다르고 거의 동일하게 작동합니다. 주요 차이점은 다음과 같습니다:

- 공유 방법: Secure Data Share는 쉐어 객체 및 목록을 사용하고, Snowflake Native Apps은 애플리케이션 패키지 객체 및 목록을 사용합니다.
- 저장 가능한 객체: Secure Data Share는 테이블, 뷰, SQL UDF를 저장할 수 있지만, Snowflake Native Apps는 테이블, 뷰, 모든 유형의 UDF, 모든 파일(스테이지), 저장 프로시저를 저장할 수 있습니다.
- Secure Data Share의 컨테이너는 SHARE이며, Snowflake Native Apps의 컨테이너는 APPLICATION PACKAGE입니다.
- Secure Data Share의 콘텐츠는 DATABASE이며, Snowflake Native Apps의 콘텐츠는 APPLICATION입니다.
- Secure Data Share의 패키지 생성 명령어는 CREATE SHARE `name`이며, Snowflake Native Apps의 패키지 생성 명령어는 CREATE APPLICATION PACKAGE `name`입니다.
- Secure Data Share의 언패킹 명령어는 CREATE DATABASE FROM SHARE `name`이며, Snowflake Native Apps의 언패킹 명령어는 CREATE APPLICATION FROM APPLICATION PACKAGE `name`입니다.

## Application Package Objects와 Share Objects의 차이점

애플리케이션 패키지 객체를 설치하면 애플리케이션 객체가 언패킹됩니다. Share 객체에 의해 언패킹되는 데이터베이스 객체와 애플리케이션 객체 사이의 주요 차이점은 다음과 같습니다.

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

- 항상 단계가 하나 있습니다. 해당 단계에는 항상 특정 구조가 있습니다 (루트에 manifest.yml이 있어 하나의 설정 스크립트(setup.sql)를 가리킵니다).
- 설정 스크립트는 풀어푸는 동안 실행될 수 있습니다.
- App 탭에 표시되는 Streamlit 개체를 지정할 수 있습니다.
- 애플리케이션 내에 사용자 정의 역할을 정의할 수 있습니다.

## Snowflake Native Apps의 문제점

그러나 Snowflake Native Apps는 도전 과제를 안고 있었습니다. 기존 데이터 처리 프로세스 자산을 재사용할 수 없었습니다. Snowflake Native Apps에서는 SQL, Python 또는 Java만 사용하여 데이터 처리 프로세스를 구현할 수 있었습니다. 실제로 데이터 처리 프로세스는 Rust, Javascript, R 등으로 작성될 수 있으므로 기존 데이터 처리 프로세스를 공유하고 이주하는 것이 진전되지 않았습니다.

# Snowflake Native Apps 확장하기

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

이러한 문제에도 불구하고, 이 문제들을 해결하기 위한 기능 세트가 2024년 Data Cloud Summit에서 발표되었습니다.

## Snowpark 컨테이너 서비스와의 통합 (Public Preview)

Snowflake Native Apps가 Snowpark 컨테이너 서비스와 통합되었습니다. 이 통합을 통해 어떤 UI나 언어로 작성된 데이터 처리 프로세스를 Snowflake로 배포할 수 있습니다.

/assets/img/2024-07-06-SnowflakeNativeAppsTheNewFormofDataSharing_2.png

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

## Snowflake Trail (공개 미리보기)

Snowflake 내 데이터 처리 프로세스가 더 복잡해지면서 비용 관리 및 설명가능성을 위한 관찰성이 점점 더 중요해지고 있습니다. Snowflake Trail은 Event Tables와 Open Telemetry를 사용하여 로그를 집계합니다.

/assets/img/2024-07-06-SnowflakeNativeAppsTheNewFormofDataSharing_3.png

Snowflake는 매년 데이터 공유에서 데이터 처리 프로세스 공유로의 비전을 지속적으로 발전시키고 있습니다.
