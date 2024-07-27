---
title: "API 데이터를 데이터베이스에 통합하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-IntegrateAPIDatatoaDatabase_0.png"
date: 2024-07-09 09:12
ogImage:
  url: /assets/img/2024-07-09-IntegrateAPIDatatoaDatabase_0.png
tag: Tech
originalTitle: "Integrate API Data to a Database"
link: "https://medium.com/python-in-plain-english/integrate-api-data-to-a-database-48150d1c0093"
---

DLT, Postgres 및 Python을 사용합니다.

![이미지](/TIL/assets/img/2024-07-09-IntegrateAPIDatatoaDatabase_0.png)

오늘의 블로그 포스트에서는 데이터 원본으로서 API(Application Programming Interface)를 사용하는 방법을 살펴보겠습니다. 우리의 데이터 중심 세계에서는 다양한 소스에서 데이터를 통합하는 것이 정보 기반 의사결정에 중요합니다. 이 중요한 데이터 소스 중 하나는 환율 정보 API인데, 이는 금융 분석과 보고서 작성에 중요합니다. ExchangeRate-API.com에서 환율 데이터를 가져와 PostgreSQL 데이터베이스에 통합하는 방법을 설명하겠습니다.

이 튜토리얼을 통해 다음을 완료할 수 있습니다:

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

- Postgres 데이터베이스에 API 데이터를 통합합니다.
- Python을 사용하여 DLT 데이터 파이프라인을 생성합니다.
- JSON 데이터를 DLT 호환 데이터 세트로 변환합니다.
- 코드 전체는 GitHub에서 확인할 수 있습니다. 동반되는 비디오 튜토리얼은 YouTube에서 제공됩니다.

# 개요

ExchangeRate-API.com을 사용합니다. 이 사이트는 JSON 형식으로 환율 정보를 제공합니다. 우리의 작업은 이 JSON 데이터를 데이터베이스 투입에 적합한 형식으로 변환하여 Data Load Tool (DLT)을 사용하여 PostgreSQL 데이터베이스에 로드하는 것입니다. 시작해봅시다!

# 필수사항

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

- DLT 라이브러리: DLT 라이브러리를 설치하고 구성하는 것을 잊지 마세요. 자세한 안내는 여기 링크된 비디오를 참조해주세요.
- PostgreSQL: 데이터를 영구적으로 저장하기 위해 PostgreSQL을 설정하거나 다른 방법으로 데이터를 파일로 저장할 수 있습니다.

# 단계별 구현

# 환경 설정

먼저, 선호하는 코드 편집기(예: VS Code)에서 새로운 Python 파일을 열고 필요한 라이브러리를 가져오세요.

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

```js
import dlt
from dlt.sources.helpers import requests
import requests
import pandas as pd
import json
from datetime import date
from datetime import datetime
from uuid import uuid4
```

# API Interaction

환율 API와 상호 작용하려면 API 키가 필요합니다. 가입하여 무료 API 키를 생성하세요. 키를 가지고 있으면 API 키로 URL을 작성하고 기본 통화를 USD로 설정하세요. 요청 라이브러리를 사용하여 API를 호출하고 JSON 응답을 구문 분석하세요.

```js
key = 'Your-API-Key'
# API 호출
url = f'https://v6.exchangerate-api.com/v6/{key}/latest/USD'
# 요청 보내기
response = requests.get(url)
data = response.json()
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

# 데이터 변환

데이터베이스로 데이터를 로드하기 전에 적절한 형식으로 변환하세요. JSON 데이터를 DLT가 쉽게 수용할 수 있는 딕셔너리 형식으로 변환하세요.

- 변환율 추출:

```js
df = pd.json_normalize(data["conversion_rates"]);
df = df.melt().reset_index();
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

2. 로드 날짜 열을 추가해주세요:

```js
df["index"] += 1;
df["date"] = date.today();
df = df.rename((columns = { index: "id", variable: "currencycode", value: "fxrate" }));
```

3. DLT를 위한 데이터프레임을 준비해주세요:

```js
# DLT 형식을 위해 API 데이터 변환
records = df.to_dict(orient="records")
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

# DLT를 사용한 데이터 수집

DLT를 사용하여 데이터셋을 처리하고 PostgreSQL 데이터베이스에로드하는 파이프라인을 생성합니다.

- 파이프라인 생성:

```js
pipeline = dlt.pipeline(
  (pipeline_name = "fxrate_pipeline"),
  (destination = "postgres"),
  (dataset_name = "incremental")
);
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

2. 파이프라인 실행하기:

```js
# 파이프라인 실행
load_info = pipeline.run(
        records,
        write_disposition="merge",
        primary_key=("currencycode", "date"),
        table_name="fxrates")
```

# 파이프라인 실행하기

스크립트를 저장하고 실행하세요. 모든 설정이 올바르게 완료되었다면, 파이프라인이 성공적으로 실행되고 환율 데이터가 PostgreSQL 데이터베이스에 로드될 것입니다.

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

# 데이터 확인하기

PostgreSQL 데이터베이스를 열고 대상 스키마를 확장하여 fx_rates 테이블을 찾으세요. 테이블을 쿼리하여 환율 데이터가 포함되어 있는지 확인하세요. API 소스와 데이터를 확인하여 로직의 정확성을 확인하세요.

```js
SELECT * FROM fxrates;
```

# 결론

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

이 블로그 포스트에서는 API를 데이터 소스로 통합하고 데이터를 변환하여 DLT를 사용하여 PostgreSQL 데이터베이스에 로드하는 방법을 보여드렸습니다. 이 방법을 사용하면 중요한 데이터 소스를 시스템에 원활하게 통합하여 더 많은 정보를 바탕으로 결정을 내릴 수 있습니다. 제공된 스크립트와 방법을 사용하여 귀하의 특정 요구 사항과 도구에 맞게 적응시키십시오.

데이터 통합 및 자동화에 관한 더 많은 자습서 및 통찰력을 기대해 주세요!

# 쉽게 설명하기 🚀

In Plain English 커뮤니티의 일원으로 함께 해 주셔서 감사합니다! 떠나시기 전에:

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

- 작가를 박수로 격려하고 팔로우 해주세요! 👏️️
- 저희를 팔로우해주세요: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: CoFeed | Differ
- 더 많은 콘텐츠: PlainEnglish.io
