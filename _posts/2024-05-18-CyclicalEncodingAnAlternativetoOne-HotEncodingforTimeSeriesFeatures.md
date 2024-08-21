---
title: "주기 코딩 시계열 피처에 대한 원-핫 인코딩 대안"
description: ""
coverImage: "/assets/img/2024-05-18-CyclicalEncodingAnAlternativetoOne-HotEncodingforTimeSeriesFeatures_0.png"
date: 2024-05-18 21:30
ogImage:
  url: /assets/img/2024-05-18-CyclicalEncodingAnAlternativetoOne-HotEncodingforTimeSeriesFeatures_0.png
tag: Tech
originalTitle: "Cyclical Encoding: An Alternative to One-Hot Encoding for Time Series Features"
link: "https://medium.com/towards-data-science/cyclical-encoding-an-alternative-to-one-hot-encoding-for-time-series-features-4db46248ebba"
isUpdated: true
---

시계열을 위한 머신러닝 모델을 훈련할 때는 대개 다음과 같은 시간 특성들을 사용하게 됩니다:

- 시간
- 요일
- 월
- 주 또는 연도의 일
- 기타

타임스탬프 열을 이러한 종류의 특성으로 변환하는 것은 꽤 쉽습니다. 시간 열을 datetime 객체로 변환한 후 (pd.to_datetime을 사용하여), .dt를 사용하여 여러 시계열 특성을 추출할 수 있습니다.

```js
df["Hour"] = df["Datetime"].dt.hour;
df["Month"] = df["Datetime"].dt.month;
df["Dayofweek"] = df["Datetime"].dt.dayofweek;
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

참고로, 이 예제에서 사용할 데이터셋은 CC0 공개 도메인 라이선스이며 시간당 전기 사용량 데이터셋입니다. 에너지 소비 데이터셋은 일반적으로 시계열 데이터이며, 최종 목표는 과거 데이터를 사용하여 미래의 소비를 예측하는 것이므로 이것은 좋은 사용 사례입니다. 온도, 습도 및 바람 세기와 같은 기타 외부 기능도 에너지 소비에 영향을 미칠 수 있지만, 여기서는 시계열 기능을 추출하고 변환하는 데 초점을 맞출 것입니다.

![Image](/assets/img/2024-05-18-CyclicalEncodingAnAlternativetoOne-HotEncodingforTimeSeriesFeatures_0.png)

멋지죠! 이제 사용 가능한 기능이 0에서 3개로 늘었습니다.

하지만 너무 빨리 생각하지 마세요! ML에서는 이러한 기능을 그대로 모델에 전달할 수 없다는 것을 알고 있습니다. 대부분의 모델은 이러한 입력을 숫자 기능으로 해석할 것이며, 시계열 기능은 숫자가 아니라 범주형이라는 사실입니다.

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

에너지 소비에 관한 경우, 하루 중 특정 피크 시간에는 더 높은 소비가 발생할 가능성이 높습니다. 또한 소비가 낮은 특정 시간대도 있습니다. 각 시간은 어떤 의미에서 자체적인 카테고리입니다.

이 데이터셋의 특정 부분을 자세히 살펴보면 이를 확인할 수 있습니다. 하루 내내 소비 패턴이 명확히 나타납니다 — 사용량은 동일한 시간대(오후 5-6시)에 피크를 찍고, 새벽 5-7시에 가장 낮습니다.

![image](/assets/img/2024-05-18-CyclicalEncodingAnAlternativetoOne-HotEncodingforTimeSeriesFeatures_1.png)

물론, 이러한 패턴은 다른 요소들과의 복잡한 상호작용이 있습니다. 예를 들어, 연도별/월별 시간 및 요일 등의 특징을 모델에 최대한 많이 포함하려고 노력합니다.

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

저는 일반적인 방법처럼 표를 Markdown 형식으로 변경할 수 있어요.

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Apple    | Orange   | Banana   |
| Car      | Book     | Tree     |
| Sun      | Moon     | Star     |

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
columns_to_encode = ["Hour", "Month", "Dayofweek"];

df = pd.get_dummies(df, (columns = columns_to_encode));
```

새로운 특성 집합이 생성됩니다.

![이미지](/assets/img/2024-05-18-CyclicalEncodingAnAlternativetoOne-HotEncodingforTimeSeriesFeatures_2.png)

볼 수 있듯이, 많은 특성들이 생성되었습니다. 우리는 3개의 열 (시간, 월, 요일)에서 40개가 넘게 되었습니다. 시간 시리즈 특성을 인코딩해야 하는 경우 더 많은 특성을 추가하면서 점점 더 복잡해질 수 있습니다. 이러한 많은 특성을 추적하기 어려워질 수 있으며, 특히 데이터베이스에 특성을 저장하거나 특성 중요도를 시각화하려는 경우 (매우 난잡한 그래프를 원치 않는 경우)에 더 어려워질 수 있습니다.

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

## 대안: 순환 인코딩

시계열 피처는 본질적으로 주기적입니다. 시계가 24:00(자정)을 가르킬 때 새로운 날이 시작되고 다음 시간은 1:00(오전 1시)입니다. 숫자 1과 24는 사실적으로 숫자 차이가 가장 큽니다만, 1은 24에 가까운 것처럼 23과 같은 사이입니다. 왜냐하면 이들은 주기적인 관계에 있기 때문입니다.

그래서 시계열 피처를 수치적으로 표현하는 또 다른 방법은 타임스탬프를 사인과 코사인 변환으로 변환하는 것입니다. 이를 통해 결과적으로 하루 중 시간, 한 주 중 시간 또는 연도 중 시간을 알 수 있습니다.

우리가 one-hot 인코딩으로 하는 것처럼 날짜 및 시간 값을 범주형 피처로 변환하는 대신, 일부 값은 가깝게 유지되고(예: 자정과 새벽 1시), 다른 값은 멀어집니다(예: 자정과 정오). 이러한 유형의 정보는 one-hot 인코딩을 할 때 손실됩니다.

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

사인과 코사인은 단위 원에서 나온 것이며, 아이디어는 타임스탬프가 사인 및 코사인 좌표로 표현되는 이 원 위에 어디에 있는지 매핑하는 것입니다. 원의 오른쪽 부분을 참조로 생각해봅시다 (아래 차트에서 0으로 표시됩니다) 또는 실제 24시간 시간대의 00:00(자정)을 나타내는 것, 이를 4개의 6시간 기준점으로 나누어 원에 시간을 매핑할 수 있도록 합니다.

단위 원을 반시계 방향으로 이동할수록 값이 증가되고 pi/2(또는 90도)인 지점은 6:00 오전과 같고, pi(180도) 또는 12:00 오후 및 3pi/2 또는 6:00 오후 및 마지막으로 다시 자정의 0으로 돌아갑니다. 이러한 각각의 기준점 사이의 각 시점에는 고유한 좌표가 있습니다. 이렇게 하면 24시간의 일일 주기를 사인과 코사인을 사용하여 표현할 수 있습니다.

다른 주기, 예를 들어 주간이나 연간 시간에도 똑같이 적용될 수 있습니다.

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

Python에서 이 작업을 수행하려면 먼저 datetime을(제 경우에는 시간별 타임스탬프) 숫자 변수로 변환해야 합니다. 이 열을 pd.Timestamp.timestamp 객체로 변환하여 각 타임스탬프를 유닉스 시간(1970년 1월 1일 이후 경과한 초 수)으로 변환합니다.

이제 이 숫자 열을 사인 및 코사인 기능으로 변환할 수 있습니다.

```python
# Convert datetime into a numerical seconds timestamp object
# (tells you the date/time in seconds)
timestamp_s = df['Datetime'].map(pd.Timestamp.timestamp)

# Get the number of seconds for each time period
day = 24*60*60
week = day*7
year = day*(365.2425)

# Transform using sin and cos
# Time of day
df['Day_sin'] = np.sin(timestamp_s * (2 * np.pi / day))
df['Day_cos'] = np.cos(timestamp_s * (2 * np.pi / day))

# Time of week
df['Week_sin'] = np.sin(timestamp_s * (2 * np.pi / week))
df['Week_cos'] = np.cos(timestamp_s * (2 * np.pi / week))

# Time of year
df['Year_sin'] = np.sin(timestamp_s * (2 * np.pi / year))
df['Year_cos'] = np.cos(timestamp_s * (2 * np.pi / year))
```

넓게 볼 때 이런 과정이 진행됩니다: 우선, 타임스탬프를 초에서 라디안으로 변환합니다. 2 _ np.pi 부분은 전체 원/주기에 2 _ pi 라디안이 있다는 이유입니다. 이 변환 후에 나누는 주기는 초 단위의 사이클 기간(하루, 일주일 또는 연도)입니다. 다음으로, 이 변환된 값과 사인 및 코사인을 사용하여 각 타임스탬프를 주기 내에서의 위치를 나타내는 고유한 각도로 매핑합니다.

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

예를 들어, 기간이 하루인 경우, 하루의 시작에 대한 타임스탬프는 0 라디안으로 매핑되고, 하루의 중간에 있는 타임스탬프는 np.pi 라디안으로 매핑되며, 하루의 끝에 있는 타임스탬프는 2 \* np.pi 라디안으로 매핑됩니다.

마지막으로, 결과적인 계산에 대해 사인과 코사인을 취하여 단위 원 위의 실제 x 및 y 좌표 값을 얻습니다. 이 값들은 항상 -1과 1 사이에 있을 것입니다.

이 접근 방식을 통해 각 원래 시계열 특성(예: 하루의 시간, 요일, 연의 월)이 이제 해당 원래 특성의 삼각함수값 (사인 및 코사인)으로만 매핑되어, 24개, 7개, 12개 등이 아니라 오직 2개의 새로운 특성으로만 매핑됩니다.

## 이 접근 방식의 단점

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

이 방법을 사용할 때 주의해야 합니다. 매우 편리하고 효율적이지만, 몇 가지 단점과 주의사항이 있습니다:

- 시간, 월 등 특정 시간대 값이 일관되게 다른 데이터셋에 대해 원-핫 인코딩이 더 잘 작동할 수 있습니다. 예를 들어, 사용량이 지나치게 높아지는 12PM이나 특정 달에 높은 물량이 발생하는 데이터셋이 있습니다. 12PM-2PM과 같이 범위가 있는 데이터셋에서는 순환 인코딩과 같은 유연한 방법이 더 정확할 수 있습니다.
- 이러한 유형의 인코딩은 딥 러닝/신경망에는 잘 작동하지만, 랜덤 포레스트와 같은 트리 분할 알고리즘에는 적합하지 않을 수 있습니다. 그 이유는 보통 1개의 특성을 나타내는 단일 타임스탬프가 2개의 특성으로 분할되고, 트리 기반 알고리즘은 한 번에 한 특성씩 분할 결정을 내립니다. 따라서 모델은 실제로 1개의 원래 특성에 대응하는 좌표 쌍인데도 불구하고 2개의 특성을 별도로 처리할 것입니다.

그러나 이는 결코 트리 기반 알고리즘에 순환 인코딩을 사용하지 말아야한다는 뜻은 아닙니다. 실제로 저는 랜덤 포레스트 모델에서 이 유형의 인코딩을 사용하고 좋은 결과를 얻었습니다. 데이터셋에 따라 다를 것이기 때문에 여전히 교차 검증 및 최종 홀드아웃 테스트 세트에서 메트릭을 실행하여 확신할 필요가 있습니다.

게다가, 사용하기 전에 원-핫 인코딩 결과를 순환 인코딩 결과와 비교하는 것이 중요합니다.

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

## 참고 자료

- P. Bescond, 주기적인 특성 인코딩, 시간 문제입니다! (2020), Towards Data Science
- R. Mulla, 시간당 에너지 소비 (2022년 8월), Kaggle에서 2024년 5월에 조회
- TensorFlow, 시계열 예측 (2024), TensorFlow Core
