---
title: "대기 시간을 통해의 신비로운 여행"
description: ""
coverImage: "/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_0.png"
date: 2024-05-17 20:39
ogImage: 
  url: /assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_0.png
tag: Tech
originalTitle: "A Whimsical Journey Through Wait Times"
link: "https://medium.com/towards-data-science/a-whimsical-journey-through-wait-times-b02a41d337fc"
isUpdated: true
---




## 파이썬을 사용하여 전자레인지 카운트다운부터 끝나지 않는 전화 대기 시간까지

![image](/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_0.png)

전자레인지 오븐의 카운트다운이 빠르게 0으로 수렴하는 것을 본 적이 있나요? 반면 전화 대기시간은 영원처럼 늘어날까요?

한가지 생각해 보세요. 포플콘을 전자레인지에 넣어 가열한 지 겨우 1분 지난 때에는 그릇을 준비하고 서빙할 준비를 합니다. 하지만 전화 대기 중에 1분이 지난다면? 다시 사람과 대화를 나눌 수 있을지 의문이 들 정도입니다. 10분 후, 포플콘을 즐기는 중이겠죠. 하지만 전화는? 대기 음악이 끝도 없는 연옥의 배경음악이 되고 있습니다.

<div class="content-ad"></div>

그리고 팝콘을 기다리는 사이와 전화 대기를 이어가는 서사 속을 맴도는 … 주간 복권. 승리를 기다립니다. 매주 새로운 티켓은 이전 주의 실망과는 거리가 먼 신선한 약속을 간직하고 있습니다.

요약하자면, 세 가지 다른 종류의 대기가 나타납니다:

- “대기 전화”형 — 기다린 시간이 오래 될수록 더 오랫동안 기다릴 것으로 기대합니다.
- “팝콘”형 — 기다린 시간이 길어질수록 더 짧게 기다릴 것으로 기대합니다.
- “복권 당첨”형 — 지금까지 기다린 것과 관계없이 예상 대기 시간은 변하지 않습니다.

이 대기 시간의 차이는 실제로 존재하는 것일까요, 아니면 마음의 장난일까요? 이 질문에 대한 대답은 두 부분으로 나누어 알아보겠습니다.

<div class="content-ad"></div>

- 부분 1 — 데이터 분석
- 부분 2 — 데이터 모델링

각 부분에서 대기 시간 유형을 각각 살펴보겠습니다. 자세한 Python 코드와 설명이 번갈아 나옵니다. Python에 관심이 있다면 코드 부분을 읽어보세요. 대기 시간에 대해 배우고 싶다면 코드를 건너뛰어도 됩니다.

# "대기 중" 유형 대기 시간 — 기다린 시간이 길수록 더 오래 기다리게 됩니다.

데이터로 시작하고 싶지만 "대기 중" 시간에 대한 데이터가 없습니다. 대신 컴퓨터 파일의 편집 사이의 시간에 대해서 어떠세요? 그런 편집 시간을 보는 곳 한 곳이 바로 위키피디아입니다.

<div class="content-ad"></div>

위키피디아 페이지에서 마지막 편집 이후의 시간을 보고 다음 편집까지 얼마나 남았는지 예측할 수 있을까요?

위키피디아 페이지 편집에 대한 다음 편집까지의 시간을 어떻게 예측할 수 있을까요? 다음 편집이 언제 발생할지 정확히 예측해 보세요: "저는 이 페이지가 정확히 5일 3시간 20분 후에 편집될 것으로 예측합니다." 하지만 그렇게 구체적으로 예측하는 것은 너무 정확성이 떨어질 것입니다.

시간 범위를 예측할 수도 있습니다: "저는 이 페이지가 다음 100년 이내에 언제든지 편집될 것으로 예측합니다." 이렇게 하면 거의 항상 맞을 수 있겠지만, 너무 모호하고 흥미롭지 않습니다.

더 실용적인 예측은 "중위 다음 편집 시간"의 형태입니다. 이렇게 말할 수 있습니다: "저는 이 페이지가 다음 5일 3시간 20분 이내에 50% 확률로 편집될 것으로 예측합니다." 저, 당신의 적,는 "이전" 또는 "이후"를 선택할 것입니다. 만약 실제 중위 다음 편집 시간이 3일이라고 가정하면, "이전"을 선택할 것입니다. 그럼 우리는 최대 5일 3시간 20분까지 기다립니다. 그 동안 누군가(다시 말해서, 우리 둘을 제외한 누군가) 페이지를 편집하면 상대방이 점수를 획들하고, 그렇지 않으면 당신이 점수를 획득합니다. 이러한 점수 체계를 통해, 만약 제가 당신보다 더 좋은 예측자라면 더 많은 점수를 획득해야 할 것입니다.

<div class="content-ad"></div>

파이썬에 대해 알아보고 이러한 예측을 어떻게 할 수 있는지 살펴봅시다:

## “대기 중” 유형의 대기 시간 — Python

아티스트 Marie Cochran에 관한 위키피디아 문서를 살펴보겠습니다. 문서의 개정 내역을 살펴볼 수 있습니다:

![image](/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_1.png)

<div class="content-ad"></div>

다양한 위키피디아 문서에서 데이터를 수집하기 위해 작은 파이썬 스크립트를 작성했어요. 다음과 같은 작업을 합니다:

- https://en.wikipedia.org/wiki/Special:Random을 통해 랜덤한 영어 위키백과 페이지를 선택합니다.
- 해당 페이지의 편집 이력으로 이동합니다. 예를 들어, https://en.wikipedia.org/w/index.php?title=Marie_Cochran&action=history.
- (최대) 최근 50회 편집의 날짜와 시간을 추출합니다. 시간은 분 단위로 표시됩니다.
- 문서 제목, 수정 시간, 스크립트 실행 시간으로 구성된 줄을 생성합니다. 모든 시간은 UTC 시간대를 사용합니다. 탭으로 열을 구분합니다.
- 줄을 파일에 추가합니다.

편집 시간 데이터 일부를 보여드리겠습니다:

```js
Marie_Cochran 01:20, 8 January 2024 01:16, 08 February 2024
Marie_Cochran 01:10, 27 September 2023 01:16, 08 February 2024
Marie_Cochran 00:59, 12 September 2023 01:16, 08 February 2024
Marie_Cochran 11:43, 2 November 2022 01:16, 08 February 2024
...
Marie_Cochran 19:20, 10 March 2018 01:16, 08 February 2024
Peter_Tennant 15:03, 29 July 2023 01:16, 08 February 2024
Peter_Tennant 21:39, 15 April 2022 01:16, 08 February 2024
...
```

<div class="content-ad"></div>

```python
import pandas as pd

# 데이터 읽기
wiki_df = pd.read_csv("edit_history.txt", sep='\t', header=None, names=["Title", "Edit DateTime", "Probe DateTime"], usecols=["Title", "Edit DateTime"])
wiki_df['Edit DateTime'] = pd.to_datetime(wiki_df['Edit DateTime']) # 텍스트를 날짜 및 시간으로 변환

# 'Title' 및 'Edit DateTime'을 기준으로 DataFrame 정렬하여 시간 간격이 올바르게 계산되도록 함
wiki_df.sort_values(by=['Title', 'Edit DateTime'], inplace=True)

# 동일한 제목 내에서 연속해서 편집한 경우의 시간 간격 계산
wiki_df['Time Delta'] = wiki_df.groupby('Title')['Edit DateTime'].diff()
wiki_df.head()
```

결과로 나온 Pandas 데이터프레임은 샘플된 기사 중 알파벳상으로 가장 빠른 기사(제목 기준)로 시작합니다. 이 기사는 몽골 출신인 매우 키가 큰 사람 인 Öndör Gongor에 대해 독자들에게 알려줍니다:

![image](/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_2.png)


<div class="content-ad"></div>

해당 기사의 마지막 50개의 편집 중 첫 번째 편집은 2008년 1월 27일 오후 3시 13분 (UTC)에 이루어졌습니다. 다음 편집은 16분 후에 이루어졌습니다. 그 다음 편집은 데이터의 해상도 한계로 인해 1분 내로 발생하여 0일 00:00:00으로 표시됩니다.

계속 처리하면, 각 기사 맨 처음에 나타나는 NaT (not-a-time) 행을 제거해 보겠습니다. 또한 대기 시간에 따라 정렬하고 판다의 인덱스를 재설정할 것입니다:

```js
# 'Time Delta' 열에서 NaT(시간이 아님) 값이 포함된 행 제거
wiki_df.dropna(subset=['Time Delta'], inplace=True)
# 시간 간격으로 정렬 및 인덱스 재설정
wiki_df.sort_values(by='Time Delta', inplace=True)
wiki_df.reset_index(drop=True, inplace=True)
display(wiki_df)
wiki_df['Time Delta'].describe()
```

이를 통해 다음과 같이 시작하고 끝나는 데이터프레임이 생성됩니다:

<div class="content-ad"></div>

아래는 통계 요약입니다.

```js
count                          36320
mean      92 days 13:46:11.116189427
std      195 days 11:36:52.016155110
min                  0 days 00:00:00
25%                  0 days 00:27:00
50%                 15 days 05:41:00
75%                100 days 21:45:45
max               4810 days 17:39:00
```

조사 결과, 샘플링된 대기 시간은 0일 00:00:00(즉, 1분 미만)부터 13년 이상까지 다양합니다. (13년 편집 대기는 버지니아 대학교의 건물에 관한 기사였습니다.) 편집의 1/4은 이전 편집 후 27분 이내에 발생합니다. 편집 간 중위값은 약 15일을 조금 넘습니다.

<div class="content-ad"></div>

조금 더 발전하기 전에, 웨이팅 시간을 향상시키고 싶은데요. 다음과 같이 작은 함수를 사용해서 웨이팅 시간을 표시할 수 있습니다:

```js
def seconds_to_text(seconds):
    seconds = round(seconds)
    result = []
    for unit_name, unit_seconds in [('y', 86400 * 365.25),('d', 86400),('h', 3600),('m', 60),('s', 1)]:
        if seconds >= unit_seconds:
            unit_value, seconds = divmod(seconds, unit_seconds)
            result.append(f"{int(unit_value)}{unit_name}")
    return ' '.join(result) if result else "<1s"

seconds_to_text(100)
```

위의 `seconds_to_text` 함수는 100초를 `1m 40s`로 표시합니다.

이제 위키피디아 데이터를 위한 "웨이팅 테이블"을 만들 수 있습니다. 기존에 기사의 다음 편집을 기다린 시간을 주면, 이 테이블은 중간 추가로 기다려야 할 시간을 알려줍니다. ("중간값"은 이 시간보다 덜 기다릴 확률이 50%이고, 시간이 더 걸리는 확률이 50%라는 것을 의미합니다.)

<div class="content-ad"></div>

```js
import numpy as np

def wait_wait_table(df, wait_ticks):
    sorted_time_deltas_seconds = df['Time Delta'].dt.total_seconds()
    results = []
    for wait_tick in wait_ticks:
        greater_or_equal_values = sorted_time_deltas_seconds[sorted_time_deltas_seconds >= wait_tick]
        median_wait = np.median(greater_or_equal_values)
        additional_wait = median_wait - wait_tick
        results.append({"Wait So Far": seconds_to_text(wait_tick), "Median Additional Wait": seconds_to_text(additional_wait)})
    return pd.DataFrame(results)

wiki_wait_ticks = [0, 60, 60*5, 60*15, 3600, 3600*4, 86400, 86400 * 7,86400 * 30, 86400 * 100, 86400 * 365.25, 86400 * 365.25 * 5, 86400 * 365.25 * 10]
wiki_wait_tick_labels = [seconds_to_text(wait_tick) for wait_tick in wiki_wait_ticks]
wait_wait_table(wiki_df, wiki_wait_ticks).style.hide(axis="index")
```

이제 이 표의 출력에 대해 알아보겠습니다.

## "대기 중" 유형의 대기 - 토론

앞의 파이썬 코드는 이 표를 생성합니다. 이것을 "대기-대기" 표라고 부르죠.

<div class="content-ad"></div>

![image](/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_4.png)

만약 아무도 기다리지 않았다면(다시 말해, 누군가가 페이지를 편집했다) 다음 편집은 15일이 넘게 기다릴 것으로 예상됩니다. 그러나 1분 후에도 누군가 기사를 편집하지 않았다면, 19일을 기다려야 할 것으로 예상됩니다. 따라서 1분 기다리면 예상 추가 대기 시간이 거의 4일 더 늘어납니다. 한 시간 후에도 누구도 기사를 편집하지 않았다면, 예상 추가 대기 시간은 47일로 두 배 넘게 늘어납니다.

이 현상을 생각하는 한 가지 방법은 다음 편집을 기다리기 시작할 때 우리가 어떤 종류의 페이지에 있는지 모르는 것입니다. 이것이 테일러 스위프트와 같은 핫 팝컬쳐 주제의 기사인가요? 아니면 5000명 대학의 건물인 '로턴다(The Rotunda)'와 같은 니치하고 느린 주제인가요? 수정이 일어나지 않는 매 분이 지날수록, 확률은 이것이 테일러 스위프트와 같은 기사에서 '로턴다(The Rotunda)'와 같은 기사로 이동합니다.

마찬가지로, 고객 서비스에 전화하고 대기시간이 발생할 때 - 처음에는 어떤 종류의 고객 서비스를 기다리고 있는지 모릅니다. 그러나 매 분이 지날 때마다, 우리는 서서히 나쁜, 느린 고객 서비스를 기다리고 있다는 것을 알게 됩니다. 따라서 예상 추가 대기 시간은 늘어납니다.

<div class="content-ad"></div>

지금까지는 데이터를 직접 사용했습니다. 데이터를 확률 분포로 모델링해 볼 수도 있습니다. 그러나 모델링으로 넘어가기 전에 다른 두 예제인 마이크로파 팝콘 요리와 복권 당첨을 살펴보겠습니다.

# "팝콘"형 기다림 - 기다릴수록 덜 기다리는 것을 기대합니다.

위키피디아 편집을 기다리는 기법을 마이크로파 팝콘 조리를 기다리는 것에 적용해 봅시다. (매력적일지도 모르는) 실제 데이터를 수집하는 대신 모의 데이터를 시뮬레이션하는 것으로 만족합니다. 난수 생성기를 사용할 것입니다. 요리 시간은 센서를 기반으로 하는 것이라 가정하며, 5분에서 15초 차이가 날 수 있다고 가정합니다.

## "팝콘"형 기다림 - 파이썬

<div class="content-ad"></div>

파이썬에서 특히:

```python
seed = 0
rng = np.random.default_rng(seed)
sorted_popcorn_time_deltas = np.sort(rng.normal(5*60, 15, 30_000))
popcorn_df = pd.DataFrame(pd.to_timedelta(sorted_popcorn_time_deltas, unit="s"), columns=["Time Delta"])
print(popcorn_df.describe())
```

이 코드는 다음과 같은 통계 요약이 포함된 판다 데이터프레임을 생성합니다:


                      Time Delta
count                      30000
mean   0 days 00:05:00.060355606
std    0 days 00:00:14.956424467
min    0 days 00:03:52.588244397
25%    0 days 00:04:50.011437922
50%    0 days 00:04:59.971380399
75%    0 days 00:05:10.239357827
max    0 days 00:05:59.183245298


<div class="content-ad"></div>

예상대로, 이 정규 분포에서 데이터를 생성할 때 평균은 5분이고 표준 편차는 약 15초입니다. 우리가 시뮬레이션한 대기 시간은 3분 52초에서 6분까지 범위에 있습니다.

이제 "대기-대기" 테이블을 생성할 수 있습니다:

```js
wait_wait_table(popcorn_df, [0, 10, 30, 60, 2*60, 3*60, 4*60, 5*60]).style.hide(axis="index")
```

## "팝콘" 형태의 대기 시간 — 토론

<div class="content-ad"></div>

우리의 "기다려-기다려" 소프트웨어는 팝콘 테이블을 아래와 같이 보여줍니다:

![팝콘 대기 시간](/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_5.png)

우리의 테이블에 따르면, 처음에는 5분 기다림을 예상합니다. 그리고 10초를 기다린 후에는 추가로 기대되는 대기 시간이 정확히 10초 줄어듭니다 (4분 50초로). 1분을 기다린 후에는 추가 대기 시간이 4분으로 줄어들고, 그러한 식으로 이어집니다. 5분에 이르러서도 추가 대기 시간은 계속해서 줄어들지만 0으로는 안 줄어듭니다.

나중에 데이터 모델링 하는 방법을 보게 될 것입니다. 지금은 복권 당첨을 기다리는 것에 대해 다음으로 살펴봅시다.

<div class="content-ad"></div>

# “로또 당첨” 스타일 대기 시간 — 지금까지 기다린 시간과는 무관하게, 예상 대기 시간은 동일합니다.

로또 데이터에 대해서는 다시 시뮬레이션된 데이터를 생성하는 것이 편합니다. 워싱턴 주의 로또는 당첨 확률을 1 대 27.1로 제공합니다. (가장 흔한 당첨은 $1 베팅에 $3를 지불합니다.) 100만 주 (약 1만 9천 년) 동안 로또를 플레이하고 당첨 사이의 대기 시간에 대한 데이터를 수집해 봅시다.

## “로또 당첨” 스타일 대기 시간 — 파이썬

우리는 100만 주 동안의 로또 플레이를 시뮬레이션합니다.

<div class="content-ad"></div>

```js
시드 = 0
rng = np.random.default_rng(시드)
지난주_당첨 = None
로또_대기 = []
for 주차 in range(1_000_000):
    if rng.uniform(high=27.1) < 1.0:
        if 지난주_당첨 is not None:
            로또_대기.append(주차 - 지난주_당첨)
        지난주_당첨 = 주차
정렬된_로또_시간_간격 = np.sort(np.array(로또_대기) * 7 * 24 * 60 * 60)
lotto_df = pd.DataFrame(pd.to_timedelta(정렬된_로또_시간_간격, unit="s"), columns=["시간 간격"])
print(lotto_df.describe())
```

```js
                        시간 간격
count                        36773
mean   190 days 08:21:00.141951976
std    185 days 22:42:41.462765808
min                7 days 00:00:00
25%               56 days 00:00:00
50%              133 days 00:00:00
75%              259 days 00:00:00
max             2429 days 00:00:00
```

우리의 최단 가능한 당첨 간격은 7일입니다. 가장 긴 시뮬레이션된 건조 기간은 6년 이상입니다. 중앙값 대기 시간은 133일입니다.

우리는 "대기-대기" 테이블을 생성합니다.

<div class="content-ad"></div>

```js
lotto_days = [0, 7, 7.00001,  2*7, 4*7, 183, 365.25, 2*365.25, 5*365.25]
lotto_waits = [day * 24 * 60 * 60 for day in lotto_days]
wait_wait_table(lotto_df, lotto_waits).style.hide(axis="index")
```

## "로또 당첨" 스타일 대기 시간 — 토론

여기 "대기-대기" 테이블이 있습니다:

<img src="/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_6.png" />

<div class="content-ad"></div>

다음은 Markdown 형식으로 작성된 텍스트입니다.

테이블에 따르면 복권은 우리가 이기기까지 얼마나 기다렸는지에 신경을 쓰지 않습니다. 우리가 방금 이겼던지 (지금까지 기다린 시간 ` 1초) 아니면 1년 동안 이기지 못했던지, 우리가 다음 승리까지 기다려야 하는 예상 추가 기다림은 대부분 항상 126일부터 133일 사이입니다.

표의 세 항목은 이상할 수 있습니다. 7일과 7일 1초에서 무슨 일이 일어나는지 생각해보세요. 추가 기다림이 126일에서 거의 즉시 133일 정도로 급격히 증가하는 이유는 무엇일까요? 답은 매주 추첨하는 시점에서 승리까지의 최소 기다림이 0일에서 7일로 변경되기 때문입니다. 그리고 5년은 어떻게 되는 걸까요? 5년을 기다린다면 보통 133일이 걸리는 대신 단지 50일만에 승리를 기대할 수 있는 것일까요? 안타깝게도 아닙니다. 오히려 이는 우리 데이터의 한계를 보여줍니다. 데이터에서는 5년을 기다리는 경우를 세 번만 볼 수 있습니다:

```js
lotto_df[lotto_df["Time Delta"] > pd.to_timedelta(24*60*60 * 365.25 * 5, unit="s")]
```

<img src="/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_7.png" />

<div class="content-ad"></div>

삼 가지 값은 중위수의 노이즈 추정치로 이어집니다.

지금까지 실제 및 모의 데이터에서 본 것을 요약해보면:

- 위키피디아 편집 — 기다릴수록 기대하는 대기 시간이 길어집니다.
- 팝콘 — 기다릴수록 기대하는 대기 시간이 줄어듭니다.
- 복권 당첨 — 지금까지의 대기 시간과 관계없이 기대 대기 시간은 동일합니다.

다음 섹션에서는 모델링의 방법과 그 이유에 대해 살펴보겠습니다. 미국 로또 데이터부터 시작하겠습니다.

<div class="content-ad"></div>

이 부분에서는 대기 시간 예측을 위한 간단한 표현을 찾아보겠습니다. 예측에는 이러한 간소화가 필요하지 않습니다. 우리가 지금까지 만든 것은 경험적 분포라고 불리며 잘 작동합니다. 그러나 더 간단한 표현은 더 편리할 수 있습니다. 또한 다른 종류의 대기를 이해하기 쉽게 비교할 수 있게 해줄 수도 있습니다.

우리는 세 가지 예제를 살펴보면서 진행할 것입니다. 가장 간단한 것부터 시작하여 (복권 당첨) 가장 복잡한 것(Wikipedia 편집)으로 넘어갈 것입니다. 이전과 마찬가지로 Python 코드(건너뛸 수 있는)와 토론 사이를 오가겠습니다.

먼저 대기 시간 데이터프레임에 누적 분포 열을 추가하는 것부터 시작하겠습니다. 이전에 데이터프레임을 시간 딜타로 정렬했음을 기억해주세요.

```python
wiki_df['CDF'] = wiki_df['Time Delta'].rank(pct=True)
popcorn_df['CDF'] = popcorn_df['Time Delta'].rank(pct=True)
lotto_df['CDF'] = lotto_df['Time Delta'].rank(pct=True)
wiki_df
```

<div class="content-ad"></div>

CDF 컬럼은 누적 분포 함수(Cumulative Distribution Function)를 나타내며, 가장 짧은 대기 시간에는 0.0에 가까운 값이 있고, 가장 긴 대기 시간에는 1.0이 있습니다. 다시 말해, 각 행의 순위가 분수로 나타난 것입니다. 위키피디아 데이터프레임은 이제 다음과 같습니다:


| Time Delta  |  CDF  |
|-------------|-------|
| 0 days 00:00:10 | 0.1 |
| 0 days 00:00:30 | 0.3 |
| 0 days 00:01:00 | 0.5 |
| 0 days 00:02:00 | 0.7 |
| 0 days 00:05:00 | 0.9 |
| 0 days 00:10:00 | 1.0 |


이제 CDF(누적 분포 함수)를 대기 시간 Time Delta(x-축)에 대해 그릴 수 있습니다. 파이썬에서 다음과 같은 플로팅 코드를 사용할 수 있습니다:

```python
import matplotlib.pyplot as plt

def wait_cdf(title, sorted_df, wait_ticks, dist=None, dist_label=None, left=None, right=None, xscale='linear'):
    wait_seconds = sorted_df['Time Delta'].dt.total_seconds() # x values
    cdf = sorted_df['CDF'] # y values

    left = left or wait_seconds.min()
    right = right or wait_seconds.max()

    plt.figure(figsize=(10, 6))
    plt.title(title + ' 누적 분포 함수(CDF)')
    plt.plot(wait_seconds, cdf, marker='.', linestyle=" ", label='경험적인 CDF')

    if dist is not None:
        dist_x = np.logspace(np.log10(left), np.log10(right), 100) if xscale == 'log' else np.linspace(left, right, 100)
        dist_y = dist.cdf(dist_x)
        plt.plot(dist_x, dist_y, label = dist_label)

    plt.xlabel('대기 시간')
    plt.ylabel('CDF')
    plt.xscale(xscale)
    plt.xticks(wait_ticks, [seconds_to_text(wait_tick) for wait_tick in wait_ticks], rotation=45)
    plt.xlim(left=left, right=right)
    plt.grid(True, which="both", ls="--")
    plt.legend(loc='upper left')
    plt.show()

wait_cdf("로또 당첨", lotto_df, wiki_wait_ticks, xscale='log')
```

<div class="content-ad"></div>

로또 당첨과 대기 시간의 CDF 플롯을 로그 스케일로 표시하였습니다:

![Lottery Wins CDF Plot](/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_9.png)

곡선이 간단해 보이니 이에 간단한 곡선을 적합해보려고 합니다. 가장 적합한 곡선은 지수 분포입니다. 이는 대기 시간과 관련된 가장 간단한 일반 함수입니다.

Python의 scipy.stats 패키지를 사용하면 데이터에 지수 곡선을 맞추고 해당 결과 곡선을 Python 객체로 표현하는 것이 쉽습니다. 여기서는 lotto_expon_dist라는 이름으로 이를 표현했습니다.

<div class="content-ad"></div>

```python
from scipy.stats import expon

_, lotto_e_scale = expon.fit(lotto_df['Time Delta'].dt.total_seconds(), floc=0)
lotto_expon_dist = expon(scale=lotto_e_scale)
print(f"복권 당첨 지수 중앙값은 {seconds_to_text(lotto_expon_dist.median())} 입니다. 스케일 매개변수는 {seconds_to_text(lotto_e_scale)} 입니다.")
```

이 코드는 출력합니다:

복권 당첨 지수 중앙값은 131일 22시간 32분 20초 입니다. 스케일 매개변수는 190일 8시간 21분 입니다.

적합된 곡선의 중앙값은 약 132일로, 경험적인 중앙값인 133일과 근접합니다. 지수곡선을 관행적으로 스케일이라는 단일 숫자로 매개변수화하는데, 이것은 분포의 평균에 해당하지만 평균에서 중앙값을 쉽게 계산하거나 그 반대로 할 수 있습니다.


<div class="content-ad"></div>

로또 당첨금에 대한 경험적 누적 분포(EMCDF) 및 적합 누적 분포(FCDF) 플롯입니다:

```js
lotto_expon_label = f'ExponentialDistribution(scale={seconds_to_text(lotto_e_scale)})'
wait_cdf("당첨금", lotto_df, wiki_wait_ticks, dist=lotto_expon_dist, dist_label=lotto_expon_label, xscale='log')
```

<img src="/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_10.png" />

둘이 꽤 근접합니다. 왼쪽의 약간의 불일치는 복권 추첨시 모멘트의 즉시 7일 점프에 의해 발생합니다. 이 글에서는 이 작은 불일치를 무시하겠습니다.

<div class="content-ad"></div>

우리 (모의) 복권 당첨 데이터에 지수 함수가 잘 작동합니다. Popcorn과 Wikipedia 데이터에도 어떻게 작동하는지 살펴봅시다. 다음은 이러한 데이터프레임에 지수 분포를 맞추는 코드입니다.

```js
_, popcorn_e_scale = expon.fit(popcorn_df['Time Delta'].dt.total_seconds(), floc=0)
popcorn_expon_dist = expon(scale=popcorn_e_scale)
print(f"Popcorn exponential median is {seconds_to_text(popcorn_expon_dist.median())}")
popcorn_expon_label = f'ExponentialDistribution(scale={seconds_to_text(popcorn_e_scale)})'
wait_cdf("Popcorn", popcorn_df, popcorn_ticks, dist=popcorn_expon_dist, dist_label=popcorn_expon_label, left=10, right=6*60, xscale='linear' )

_, wiki_e_scale = expon.fit(wiki_df['Time Delta'].dt.total_seconds(), floc=0)
wiki_expon_dist = expon(scale=wiki_e_scale)
print(f"Wiki exponential median is {seconds_to_text(wiki_expon_dist.median())}")
wiki_expon_label = f'ExponentialDistribution(scale={seconds_to_text(wiki_e_scale)})'
wait_cdf("Wiki Edits", wiki_df, wiki_wait_ticks, dist=wiki_expon_dist, dist_label=wiki_expon_label, xscale='log', left=60)
```

그리고 여기가 그림들입니다:

<img src="/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_11.png" />

<div class="content-ad"></div>


![이미지](/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_12.png)

이런, 이 곡선 맞추기 결과는 정말 최악이네요! 문제는 지수 분포가 "복권 당첨"과 유사한 데이터만 모델링한다는 것입니다. 구체적으로 말하면, 대기 시간이 이전 대기 시간에 관계없이 기대 대기 시간이 동일한 경우에 해당합니다. 이전 대기 시간을 무시하는 대기 시간에 대해 좌우되는 경우, 이것이 메모리리스(exponential)이라고 불립니다. 또한 연속 분포 중에서 지수 분포는 유일한 메모리리스 분포입니다.

그렇다면 분포에 메모리가 필요하다면 어떨까요? 다음으로 시도할 수 있는 가장 간단한 분포는 와이블(Weibull) 분포입니다.

와이블 분포는 형태(shape)와 척도(scale) 두 매개변수로 매개화됩니다. 복권 데이터로 시작해 보죠:


<div class="content-ad"></div>


from scipy.stats import weibull_min

lotto_shape, _, lotto_w_scale = weibull_min.fit(lotto_df['Time Delta'].dt.total_seconds(), floc=0)
lotto_weibull_dist = weibull_min(c=lotto_shape,scale=lotto_w_scale)

print(f"복권 당첨 위블 중앙값은 {seconds_to_text(lotto_weibull_dist.median())}")
lotto_weibull_label = f'WeibullDistribution(shape={lotto_shape:.3},scale={seconds_to_text(lotto_w_scale)})'
wait_cdf("복권 당첨", lotto_df, wiki_wait_ticks, dist=lotto_weibull_dist, dist_label=lotto_weibull_label, xscale='log')


이는 지수함수와 유사한 장착 곡선을 생성합니다. 실제로 형태가 1일때 위블 분포는 지수 분포입니다. 여기서 형태는 1.06입니다.

<img src="/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_13.png" />

팝콘 데이터에 위블을 적합하려고 하면 무엇이 발생하나요?


<div class="content-ad"></div>

```python
popcorn_shape, _, popcorn_w_scale = weibull_min.fit(popcorn_df['Time Delta'].dt.total_seconds(), floc=0)
popcorn_weibull_dist = weibull_min(c=popcorn_shape, scale=popcorn_w_scale)
print(f"Popcorn Weibull median is {seconds_to_text(popcorn_weibull_dist.median())}")
popcorn_df_weibull_label = f'Weibull(shape={popcorn_shape:.3}, scale={seconds_to_text(popcorn_w_scale)})'
wait_cdf("Popcorn", popcorn_df, popcorn_ticks, dist=popcorn_weibull_dist, dist_label=popcorn_df_weibull_label, left=3*60, right=7*60, xscale='linear')
```

![Image](/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_14.png)

안전하진 않지만, 이 적합은 지수 함수의 적합보다 훨씬 낫습니다. 모양 모수의 값이 20임을 주목하세요. Weibull의 모양 모수가 1보다 큰 경우 "대기 시간이 길수록 대기 시간을 기대하는 것이 줄어든다"를 나타냅니다.

마지막으로, 위키피디아 데이터에 Weibull을 시도해보겠습니다.


<div class="content-ad"></div>

```js
wiki_shape, _, wiki_w_scale = weibull_min.fit(wiki_df['Time Delta'].dt.total_seconds(), floc=0)
wiki_weibull_dist = weibull_min(c=wiki_shape, scale=wiki_w_scale)
print(f"위키 위불 중앙값은 {seconds_to_text(wiki_weibull_dist.median())}")
wiki_df_weibull_label = f'위불(모양={wiki_shape:.3},스케일={seconds_to_text(wiki_w_scale)})'
wait_cdf("위키 편집", wiki_df, wiki_wait_ticks, dist=wiki_weibull_dist, dist_label=wiki_df_weibull_label, xscale='log', left=60)
```

<img src="/assets/img/2024-05-17-AWhimsicalJourneyThroughWaitTimes_15.png" />

이 곡선 맞춤은 완벽하지 않지만, 지수함수의 맞춤보다 훨씬 좋습니다. 모양 모수값인 0.292에 주목해보세요. 위불의 모양 모수가 1보다 작을 때는 "기다린 시간이 길수록 더 기다려야 한다"는 것을 나타냅니다. 그러나 위불만이 이 특성을 갖고 있는 것은 아닙니다. 이 특성을 갖는 무수히 많은 분포들도 있습니다. 실제로 위키피디아 분포는 이 특성을 갖지만 위불 분포가 아닙니다.

# 결론

<div class="content-ad"></div>

결론적으로, 당신과 나는 미친 것이 아닙니다(필요에 따라).

우리는 정말 기다린 시간이 길수록 더 기다려야 할 상황이 있는 것을 보았습니다. 위키피디아 편집 사이의 시간 간격에서 경험적으로 확인할 수 있습니다. 또한 Weibull 분포에서 형태 매개변수가 1보다 작은 경우에도 확인할 수 있습니다.

똑같이, 다른 몇 가지 대기 시간에는 "기다린 시간이 길수록 더 적게 기다리게 된다"는 규칙이 적용됩니다. 팝콘에서 이 현상을 확인할 수도 있습니다. 또한 Weibull 분포에서 형태 매개변수가 1보다 큰 경우에도 이를 확인할 수 있습니다.

마지막으로, 세 번째 종류의 대기 시간인 "메모리리스"도 존재합니다. 이 경우, 지금까지 기다린 시간에 상관없이 기대 대기 시간은 동일합니다. 복권 당첨 간의 시간에서 이를 확인했습니다. 이는 형태 매개변수가 1인 Weibull 분포(지수 분포와 동일)와 관련이 있습니다.

<div class="content-ad"></div>

데이터를 분석할 때 기다릴 데이터가 있는 경우, Weibull 분포를 시도하는 것을 권장합니다. Python을 사용하면 이러한 곡선을 fitting하는 것이 쉽습니다. 그러나 데이터가 Weibull 분포와 잘 맞지 않는 경우에는 Weibull을 사용하지 않는 것이 좋습니다. 대신, 자료 분포를 직접 사용하여 데이터가 스스로 말하도록하십시오.

기다림 시간에 대한 이 여정에 참여해 주셔서 감사합니다. 이제 기다림 시간과 그 분석에 대해 더 잘 이해하게 되었으면 좋겠습니다.

칼을 Medium에서 팔로우해 주세요. 저는 Rust 및 Python에서의 과학적 프로그래밍, 머신러닝 및 통계에 대해 씁니다. 월 한 번 정도 기사를 씁니다.