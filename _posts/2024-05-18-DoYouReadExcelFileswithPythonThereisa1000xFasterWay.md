---
title: "아직도 파이썬으로 엑셀 파일을 읽으세요? 1000배 더 빠른 방법이 있어요"
description: ""
coverImage: "/assets/img/2024-05-18-DoYouReadExcelFileswithPythonThereisa1000xFasterWay_0.png"
date: 2024-05-18 21:32
ogImage:
  url: /assets/img/2024-05-18-DoYouReadExcelFileswithPythonThereisa1000xFasterWay_0.png
tag: Tech
originalTitle: "Do You Read Excel Files with Python? There is a 1000x Faster Way"
link: "https://medium.com/python-in-plain-english/do-you-read-excel-files-with-python-there-is-a-1000x-faster-way-72a15964d30a"
isUpdated: true
---

## 전문 기술로 번개처럼 빠른 데이터 처리 능력을 발휘하세요

![이미지](/assets/img/2024-05-18-DoYouReadExcelFileswithPythonThereisa1000xFasterWay_0.png)

파이썬 사용자로써 비즈니스 전문가들이 종종 정보를 Excel 또는 CSV 형식으로 공유하기 때문에 엑셀 파일을 처리하는 데 자주 사용됩니다. 그러나 파이썬은 엑셀 파일을 다룰 때 속도가 느릴 수 있다는 점에 유의해야 합니다.

본 글에서는 Python에서 데이터를 로드하는 다섯 가지 방법을 소개하겠습니다. 이 토론이 끝나면 속도가 세 개의 자릿수가 높아져, 프로세스가 엄청나게 빨라질 것입니다.

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

# 실험 설정

10개의 엑셀 파일을 로드해야 한다고 가정해 봅시다. 각 파일은 20,000개의 행과 25개의 열을 포함하며, 총 약 70MB의 데이터가 있습니다. 이 시나리오는 SAP와 같은 ERP 시스템에서 트랜잭션 데이터를 Python으로 분석하기 위해 전송할 때 일반적으로 발생하는 상황입니다.

먼저, 이 더미 데이터를 생성하고 필요한 라이브러리를 가져와 환경을 설정할 것입니다 (이후 피클 및 joblib와 같은 라이브러리 사용의 구체적인 내용에 대해 나중에 논의할 것입니다).

```js
import pandas as pd
import numpy as np
from joblib import Parallel, delayed
import time

for file_number in range(10):
    values = np.random.uniform(size=(20000, 25))
    pd.DataFrame(values).to_csv(f"더미 {file_number}.csv")
    pd.DataFrame(values).to_excel(f"더미 {file_number}.xlsx")
    pd.DataFrame(values).to_pickle(f"더미 {file_number}.pickle")
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

# Python에서 데이터를로드하는 5 가지 방법

# 1: Pandas를 사용하여 Excel 파일로드

가장 간단한 방법으로 Excel 파일을로드하는 방법부터 시작하겠습니다. Pandas DataFrame을 초기화하고 각 Excel 파일을 순차적으로 추가합니다. 이 접근 방식은 여러 소스에서 데이터를 컴파일하여 분석을 위한 단일 구조로 제공합니다.

```python
start = time.time()
df = pd.read_excel("Dummy 0.xlsx")
for file_number in range(1,10):
    df.append(pd.read_excel(f"Dummy {file_number}.xlsx"))
end = time.time()
print("Excel:", end - start)
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

약 50초 정도 소요됩니다. 상당히 느린 속도네요.

저희 Excel 파일을 CSV 형식으로 변환한 후, 로딩 시간이 크게 개선되어 0.63초로 단축되었습니다. 이는 이전보다 거의 10배 빠른 속도입니다. Python은 일반적으로 CSV 파일을 Excel 파일보다 빠르게 처리하며, 종종 100배까지 빠를 수 있습니다. 따라서 CSV 파일을 사용하면 대규모 데이터셋을 처리하는 데 매우 효율적인 전략일 수 있습니다.

그러나 주목할 만한 단점은 CSV 파일이 일반적으로 .xlsx 파일보다 큰 파일 크기를 갖는다는 것입니다. 예를 들어, 우리의 예제에서 CSV 파일은 각각 9.5MB이지만, .xlsx 파일은 단 6.4MB밖에 되지 않습니다.

# 3: Pandas 데이터프레임의 더 똑똑한 생성

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

저희 데이터 로딩 프로세스를 더 향상시키기 위해, Pandas DataFrames를 만드는 방식을 최적화할 수 있습니다. 기존 DataFrame에 각 파일을 직접 추가하는 대신에, 시간이 많이 소요될 수 있으므로:

1. 각 Excel 또는 CSV 파일을 별도의 DataFrame으로 로드합니다.
2. 이러한 DataFrames를 리스트에 저장합니다.
3. 마지막으로, 리스트의 모든 DataFrames를 단일 DataFrame으로 연결(concatenate)합니다.

이 방법은 DataFrame을 반복적으로 확장하는 데 따른 오버헤드를 줄이기 때문에 일반적으로 파일마다 점진적으로 추가하는 것보다 빠릅니다.

```python
start = time.time()
df = []
for file_number in range(10):
    temp = pd.read_csv(f"Dummy {file_number}.csv")
    df.append(temp)
df = pd.concat(df, ignore_index=True)
end = time.time()
print("CSV2:", end - start)
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

작업 테이블을 Markdown 형식으로 변경하면 됩니다.

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
start = time.time()
def loop(file_number):
    return pd.read_csv(f"Dummy {file_number}.csv")
df = Parallel(n_jobs=-1, verbose=10)(delayed(loop)(file_number) for file_number in range(10))
df = pd.concat(df, ignore_index=True)
end = time.time()
print("CSV//:", end - start)
```

한 개의 코어 버전과 비교했을 때 속도가 두 배로 증가했습니다. 그러나 코어 수를 늘릴수록 성능이 선형적으로 증가하지는 않는다는 점을 명심해야 합니다. 예를 들어, M1 칩을 장착한 Mac Air에서 8개의 코어를 사용하는 경우, 속도가 2배 증가하는 것을 확인했습니다. 8배가 아닙니다.

## Joblib을 사용한 간단한 병렬화

Joblib은 병렬 처리를 위해 설계된 간단한 Python 라이브러리입니다. 리스트 내포와 유사하게 작동하지만 한 가지 중요한 차이가 있습니다. 각 반복이 별도의 스레드에서 실행된다는 것입니다. 이 접근 방식을 통해 작업을 동시에 처리할 수 있습니다. 다음은 이를 구현하는 방법입니다:

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
def loop(file_number):
    return pd.read_csv(f"Dummy {file_number}.csv")
df = Parallel(n_jobs=-1, verbose=10)(delayed(loop)(file_number) for file_number in range(10))

#위 코드와 동일한 기능
df = [loop(file_number) for file_number in range(10)]
```

## 5: Pickle 파일 활용하기

데이터 저장 및 검색 프로세스를 더 빠르게 하려면 pickle 파일을 사용하는 것을 고려해보세요. Pickle은 Python 전용 형식으로, 객체를 직렬화하고 역직렬화하는 데 사용되며, .csv 파일보다 빠른 데이터 로드를 가능하게 합니다.

그러나 pickle 파일의 중요한 단점은 사람이 읽을 수 없다는 것입니다. .csv 파일과 달리 pickle 파일을 텍스트 편집기나 스프레드시트 프로그램으로 열어 직접 내용을 볼거나 수정할 수 없습니다.

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
start = time.time()
def loop(file_number):
    return pd.read_pickle(f"Dummy {file_number}.pickle")
df = Parallel(n_jobs=-1, verbose=10)(delayed(loop)(file_number) for file_number in range(10))
df = pd.concat(df, ignore_index=True)
end = time.time()
print("Pickle//:", end - start)
```

우리는 처리 시간을 성공적으로 80% 줄였어요!

전반적으로, 피클 파일로 작업하는 것이 `.csv` 파일을 사용하는 것보다 훨씬 빠릅니다. 하지만 이 특정 예제에서는 그렇게 많은 저장 공간을 차지하지 않습니다.

실제로 시스템은 일반적으로 데이터를 피클 형식으로 직접 내보내지 않아요. 다음 상황에서 피클 파일을 사용하는 것을 권장합니다:

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

1. 내부 파이썬 사용을 위한 정보: 파이썬 프로세스에서 데이터를 저장하고 해당 데이터를 엑셀이나 다른 파이썬이 아닌 환경에서 열 필요가 없는 경우, 데이터프레임을 피클 파일로 저장하세요. 이는 파이썬 스크립트나 응용 프로그램 내에서 재사용할 데이터에 이상적입니다.

2. 빈번한 파일 액세스를 위한 정보: 동일한 파일을 반복적으로 로드하는 경우, 초기 로드 후에 해당 파일을 피클로 저장하는 것이 효율적입니다. 향후 프로세스에서는 .csv 파일을 로드하는 느린 과정을 건너뛰고 피클 파일로 직접 로드할 수 있습니다.

예시: 매달 업데이트되는 거래 데이터를 관리할 때, 첫 번째 로드 이후 각 달의 데이터를 .csv에서 .pickle로 변환할 수 있습니다. 이를 통해 매달 새로운 데이터가 도착할 때마다 피클 형식의 기존 데이터에 빠르게 액세스할 수 있어서 워크플로우를 간소화할 수 있습니다.

# 추가 정보: 병렬로 엑셀 파일 로드하기

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

Excel 파일을 받은 상황에서 직접 작업해야 할 때, 병렬 처리를 사용하여 효율성을 높일 수 있습니다. 다른 형식과 마찬가지로 `joblib` 라이브러리를 사용하여 이러한 파일을 병렬로 로드할 수 있습니다.

이를 구현하려면 루프 내에 있는 함수를 Excel 파일을 처리할 수 있도록 조정해야 합니다. 이 수정은 Excel 파일을 로드하는 함수를 사용하고, 그런 다음 이러한 작업을 `joblib`을 사용하여 여러 프로세서에 분산하는 것을 포함합니다. 이 방식을 사용하면 여러 Excel 파일을 동시에로드하는 데 걸리는 시간을 크게 줄일 수 있습니다.

```js
start = time.time()
def loop(file_number):
    return pd.read_excel(f"Dummy {file_number}.xlsx")
df = Parallel(n_jobs=-1, verbose=10)(delayed(loop)(file_number) for file_number in range(10))
df = pd.concat(df, ignore_index=True)
end = time.time()
print("Excel//:", end - start)
```

로딩 시간을 70% 줄여 50초에서 13초로 단축했습니다.

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

아울러 병렬 로딩 프로세스를 활용하여 필요할 때마다 pickle 파일을 실시간으로 생성할 수도 있습니다. 이렇게 함으로써 파일을 다시 로드해야 하는 경우에 pickle 파일이 제공하는 크게 빠른 로딩 시간을 활용하여 데이터에 거의 즉각적으로 액세스할 수 있습니다. 이 방법은 초기 로딩 프로세스를 최적화하는 데 그치지 않고 동일한 데이터셋과의 미래 상호작용을 간소화합니다.

# 요약

다양한 데이터 로딩 방법을 통해 대규모 데이터셋을 처리하는 데 걸리는 시간을 크게 단축했습니다:

- Excel 파일: 초기 로딩에는 50초가 걸렸습니다.
- CSV 파일: 0.63초로 개선되었습니다.
- 더 스마트한 CSV 로딩: 0.62초로 더욱 개선되었습니다.
- 병렬 CSV 로딩: 0.34초로 줄었습니다.
- 병렬 Pickle 로딩: 0.07초로 급격하게 줄었습니다, 1초의 1/10 이하입니다.
- 병렬 Excel 로딩: 13.5초로 줄었습니다.

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

이러한 결과들은 Python에서 데이터 로딩 작업의 성능을 향상시키기 위해 파일 형식을 최적화하고 병렬 처리를 활용하는 이점을 강조합니다.

# 쉽게 이해할 수 있는 용어로 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 필자를 박수 치고 팔로우하기 꼭 잊지마세요! ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼에서도 만나보세요: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루는 블로깅 플랫폼에 지치셨나요? Differ를 시도해보세요.
- 더 많은 콘텐츠는 PlainEnglish.io에서 확인하세요.
