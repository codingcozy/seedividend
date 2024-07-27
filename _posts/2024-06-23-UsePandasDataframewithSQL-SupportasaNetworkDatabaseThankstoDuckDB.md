---
title: "DuckDB를 사용해 SQL 지원 네트워크 데이터베이스로 Pandas DataFrame 활용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-UsePandasDataframewithSQL-SupportasaNetworkDatabaseThankstoDuckDB_0.png"
date: 2024-06-23 13:37
ogImage: 
  url: /assets/img/2024-06-23-UsePandasDataframewithSQL-SupportasaNetworkDatabaseThankstoDuckDB_0.png
tag: Tech
originalTitle: "Use Pandas Dataframe with SQL-Support as a Network Database — Thanks to DuckDB"
link: "https://medium.com/@thoren.lederer/use-pandas-dataframe-with-sql-support-as-a-network-database-thanks-to-duckdb-2a46e1f88b66"
---


만약 대규모 데이터셋을 생성하거나 수정한 다음 SQL 준비 데이터로 공유해야 하는 데이터 과학자라면 ChipmunkDB가 답입니다.

![ChipmunkDB](/assets/img/2024-06-23-UsePandasDataframewithSQL-SupportasaNetworkDatabaseThankstoDuckDB_0.png)

# 대부분의 데이터베이스가 시계열 데이터에 취약한 이유

일단 역사적 주식 데이터의 대규모 데이터셋을 다운로드하여 데이터를 수정하고 일부 지표를 추가한 다음 그 중에서 일부만 쿼리하여 프론트엔드에 표시하려고 할 때 상황을 가정해 봅시다.

<div class="content-ad"></div>

다음은 최소 요구 사항입니다:

- 초당 50MB에서 500MB를 저장할 수 있는 매우 빠른 읽기 및 쓰기 데이터베이스가 필요합니다.
- 모든 시계열에 대한 새 열을 추가하는 데 초단위로 작업이 완료되어야 하며, 모든 행을 반복하지 않아야 합니다.
- SQL을 통해 시간 범위 내의 3개 열에 대한 쿼리만 가능해야 합니다.
- 네트워크 데이터베이스여야 합니다.

위에서 설명한 문제를 해결하기 위해 수백 개의 데이터베이스를 시도했지만, 이 중에서 모든 요구 사항을 충족하는 것은 없었습니다.

# DuckDB는 좋은 솔루션입니다.

<div class="content-ad"></div>

어느 날 DuckDB (https://duckdb.org/)을 우연히 발견했는데, 정말 놀라웠어요. 판다스 데이터프레임을 쉽게 SQL 데이터베이스로 변환할 수 있어요. 또한, 로컬 디스크에 저장하고 로드하는 속도도 숨막히게 빠릅니다.

DuckDB의 유일한 단점은 시계열 데이터에 좀 부족한 부분이 있고, 네트워크 솔루션이 아니다.

그래서 저는 ChipmunkDB를 시작했어요.

# ChipmunkDB가 시계열 데이터에 강력한 이유의 예시입니다

<div class="content-ad"></div>

yahofinance에서 DataFrame 몇 개를 다운로드합시다.

```js
import yfinance as yf

# 작은 데이터셋 다운로드
prices_df = yf.download(tickers=["QQQ", "NVDA", "AMD", "AAPL", "TSLA", "MSFT"], period='60d', interval='5m')
prices_df = prices_df.stack()
prices_df.index.names = ['date', 'symbol']

# 이제 28037행과 6열을 가진 데이터프레임을 가지고 있습니다
```

이제 이 데이터를 데이터베이스에 매우 빠르게 저장하거나 기존의 시간 범위에 "첨부"하고 싶습니다.

```js
import time
from chipmunkdb.ChipmunkDb import ChipmunkDb
chipmunkDb = ChipmunkDb("localhost")

# 데이터프레임을 chipmunkdb에 저장하는 데 걸린 시간 계산해 봅시다
start = time.time()
chipmunkDb.save_as_pandas(prices_df, "stock_prices")
print("저장하는 데 걸린 시간: ", time.time()-start, " 초")
```

<div class="content-ad"></div>

와! 놀라울 정도로 빠릅니다! 데이터를 저장하는 데 190ms밖에 걸리지 않는군요. 다시 실행하면 새로운 행만 추가하기 때문에 60ms만 소요됩니다.

이제 전체 DataFrame을 새로운 판다스 DataFrame으로 다시 읽어봅시다.

```js
# chipmunkdb에서 DataFrame을 읽어봅시다
import time
from chipmunkdb.ChipmunkDb import ChipmunkDb
chipmunkDb = ChipmunkDb("localhost")

# DataFrame을 다시 로드하고 시간을 측정해봅시다
start = time.time()
df = chipmunkDb.collection_as_pandas("stock_prices")
print("로드 시간: ", time.time()-start, " 초")
```

전체 DataFrame을 로드하는 데 73ms가 소요됩니다. 이제 전체 DataFrame을 사용할 수 있고 새로운 열을 추가할 수 있습니다.

<div class="content-ad"></div>

```js
# 새 열을 추가합시다
df["Volume_Quote"] = df["Volume"] * df["Close"]

# 다시 chipmunkdb에 데이터프레임을 저장하는 데 걸리는 시간을 계산해봅시다
start = time.time()
chipmunkDb.save_as_pandas(prices_df, "stock_prices")
print("저장하는 데 걸린 시간: ", time.time()-start, " 초")

```

새로운 "Volume_Quote" 열을 추가했고, 이를 ChipmunkDB에 저장했습니다.

# 이제 멋진 DuckDB 지원이 됩니다

하지만 이것은 ChipmunkDB의 많은 멋진 기능 중 하나에 불과합니다. 이제 위에서 생성한 DataFrame의 일부분만 쿼리합니다.

<div class="content-ad"></div>

```python
from chipmunkdb.ChipmunkDb import ChipmunkDb
# "NVDA" 및 "AAPL" 심볼에 대한 마지막 10행만 쿼리하겠습니다.
start = time.time()
results = chipmunkDb.query("select index_symbol, LAST(Close) from stock_prices WHERE index_symbol IN ('AAPL', 'NVDA') group by index_symbol ")
print("쿼리 시간: ", time.time()-start, " 초")
```

덕DB의 지원으로 ChipmunkDB 내부 데이터 프레임에서 SQL 쿼리를 실행할 수 있습니다.

# 현재 클라이언트 라이브러리는 NodeJS 및 Python입니다

2개의 클라이언트 라이브러리를 구축했습니다.


<div class="content-ad"></div>

NodeJS 클라이언트 라이브러리는 ChipmunkDB에서 데이터를 쿼리하는 데 중점을 두고 있습니다. pandas DataFrame은 NodeJS에서 지원되지 않기 때문입니다.

Python 클라이언트 라이브러리는 pandas 및 쿼리 기능의 전체 목록을 지원합니다.

Python 클라이언트는 또한 SQL Alchemy 네트워크 기능을 지원합니다. 예를 들어 SuperSet 또는 기타 BI 시스템에서 pandas에서 데이터를 쿼리하는 데 사용할 수 있습니다. (가까운 미래에 관련 이야기를 쓸 예정입니다)

# Docker, ContainerD 또는 Kubernetes에서 실행하세요.

<div class="content-ad"></div>

당신의 환경 안에서 ChipmunkDB를 데이터베이스 저장소로 사용할 수 있는 클라우드 컨테이너를 몇 개 만들었어요.

여기서 헬름 차트를 찾을 수 있어요:

그리고 여기서 도커 컨테이너를 찾을 수 있어요:

# ChipmunkDB의 개발 계획

<div class="content-ad"></div>

길고도 험난한 여정이긴 하겠지만, 다음 기능 업데이트 계획이 있어. 

- 클라이언트 라이브러리 업데이트
- 컬렉션에 스키마 지원으로 JOIN 지원
- 컬렉션 업데이트를 받기 위한 웹훅 지원 추가
- 인증 지원 추가
- 컬렉션에서 변경 사항을 찾기 위한 로그 엔진 지원
- PgAdmin 지원 추가