---
title: "Pandas DataFrame에 데이터 로드하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-PandasLoadingdataintoaDataFrame_0.png"
date: 2024-07-12 20:58
ogImage: 
  url: /TIL/assets/img/2024-07-12-PandasLoadingdataintoaDataFrame_0.png
tag: Tech
originalTitle: "Pandas: Loading data into a DataFrame"
link: "https://medium.com/coinmonks/pandas-loading-data-into-a-dataframe-4ca57442744e"
---


<img src="/TIL/assets/img/2024-07-12-PandasLoadingdataintoaDataFrame_0.png" />

판다스는 파이썬 데이터 라이브러리 중 주축에 서 있으며, 데이터 조작을 위한 다양한 함수 보물 묶음을 제공합니다. 핵심은 데이터프레임(DataFrame)으로, 이를 사용하여 테이블 형식의 데이터를 쉽게 저장하고 조작할 수 있습니다.

## 타이타닉 데이터셋 불러오기

다음은 캐글(Kaggle)에서 다운로드할 수 있는 데이터셋 링크입니다. [링크 바로가기](https://www.kaggle.com/competitions/titanic/data?select=train.csv)

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


![Pandas Loading Data into a DataFrame](/TIL/assets/img/2024-07-12-PandasLoadingdataintoaDataFrame_1.png)

타이타닉 데이터셋은 카글에서 제공하는 클래식한 챌린지로, 비극적인 타이타닉 호에 탑승한 승객들에 대한 데이터를 제공합니다. 이 데이터셋을 Pandas DataFrame으로 로드해보겠습니다:

```python
import pandas as pd
# 타이타닉 데이터셋 로드
titanic_df = pd.read_csv('train.csv')
# 처음 몇 행 확인
print(titanic_df.head())
```

이 코드 조각은 타이타닉 CSV 파일을 DataFrame으로 읽어와 우리가 분석할 데이터를 엿볼 수 있도록 해줍니다.


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

더 깊게 파기

이제, 판다스를 사용하여 타이타닉 데이터셋에서 수행할 수 있는 몇 가지 더 많은 작업을 살펴봅시다:

생존율 분석

타이타닉에 관한 가장 감동적인 질문 중 하나는 생존과 관련이 있습니다. 우리는 판다스를 사용하여 다양한 기능에 기반한 생존율을 분석할 수 있습니다:

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
# 클래스별 생존률 계산
생존률 = titanic_df.groupby('Pclass')['Survived'].mean()
print(생존률)
```

이 코드는 승객 클래스별로 데이터를 그룹화하고 각 클래스의 평균 생존률을 계산합니다.

기능 엔지니어링: 가족 규모 열 생성

기존 데이터에서 새로운 기능을 만들어 추가 정보를 얻을 수 있습니다. 예를 들어 'FamilySize' 열을 만들어보겠습니다:


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
# Create a new column for family size
titanic_df['FamilySize'] = titanic_df['SibSp'] + titanic_df['Parch'] + 1
# Analyze survival rates by family size
family_survival = titanic_df.groupby('FamilySize')['Survived'].mean()
print(family_survival)
```

이 코드 블록은 DataFrame에 새 열을 추가하고, 그런 다음 가족 규모별로 데이터를 그룹화하여 생존율에 영향을 미쳤는지 확인합니다.

로딩 매개변수 조정

데이터를 로드하는 방식을 더 세밀하게 조정해야 할 때가 있습니다. Pandas는 이 과정을 세밀하게 조정할 수 있는 많은 매개변수를 제공합니다.

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
# 행을 건너뛰고 누락된 값 설정 및 열 제한을 위한 매개변수 조정
df = pd.read_csv('train.csv', skiprows=4, na_values=['?'], usecols=['Name', 'Sex', 'Age'])
```

여러분은 행을 건너뛰고 누락된 값 처리를 할 수 있으며 특정 열만을 선택하여 로드할 수 있습니다.

DataFrame 미리보기

로드된 후에는 모든 것이 올바르게 보이는지 확인하기 위해 DataFrame을 미리보는 것이 좋습니다.

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

```python
# DataFrame의 첫 몇 행 미리보기
print(df.head())
# DataFrame의 마지막 몇 행 미리보기
print(df.tail())
```

이러한 방법들은 데이터를 로드한 후 빠르게 데이터의 개요를 제공해줍니다.

요약 통계량 사용하기

판다스는 요약 통계량을 통해 데이터의 포괄적인 개요를 제공하는 데 뛰어납니다.

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


# Get summary statistics for numerical columns
print(df.describe())
# Get summary statistics for all columns including categorical
print(df.describe(include='all'))


이 명령어들은 데이터셋의 중심 경향성, 분산 및 형태를 요약하는 기술통계를 생성합니다.

# 동물원 프로젝트의 더 많은 예제

배운 내용을 더 실용적으로 적용해 보겠습니다 — 동물원 프로젝트입니다. 데이터를 로드하고 정리한 다음, 각 동물 종에 대한 평균 식량 필요량을 계산해 봅시다:


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
# 동물원 데이터 분석
zoo_df = pd.read_csv('zoo_data.csv')
# 데이터 정제
zoo_df.dropna(inplace=True)
# 종 별 평균 사료 소비량 계산
average_food = zoo_df.groupby('species')['food_per_day'].mean()
print(average_food)
```

메소드 체이닝: 코드를 더 깔끔하게 작성하는 방법

판다스의 메소드 체이닝을 사용하면 한 줄 안에 여러 작업을 쉽게 수행할 수 있습니다. 각 메소드가 다음으로 자연스럽게 이어지는 책의 장이라고 생각해보세요.

```js
import pandas as pd
# 샘플 동물원 데이터
data = {
    'Animal': ['사자', '호랑이', '곰', '얼룩말'],
    '이름': ['레오', '줄무늬', '발루', '자라'],
    '나이': [5, 7, 3, 4],
    '무게': [250, 220, 350, 380]
}
zoo_df = pd.DataFrame(data)
# 메소드 체이닝 예시
zoo_df.assign(월령=lambda x: x['나이'] * 12).sort_values(by='나이')
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

위의 예에서 우리는 먼저 나이를 월로 변환한 다음 나이를 기준으로 DataFrame을 정렬합니다. 이 모든 작업을 한 표현식으로 처리합니다. 이렇게 하면 코드가 더 깔끔해지고 더 효율적으로 됩니다. 

```js
결과
  동물 이름   나이   무게  월 단위 나이
2 Bear   Baloo   3   350       36
3 Zebra  Zara    4   380       48
0 Lion   Leo     5   250       60
1 Tiger  Stripes 7   220       84
```

데이터 정렬 및 순위 매기기: 데이터 조직화

데이터를 정렬하는 것은 가장 중요한 항목이나 덜 중요한 항목을 분석할 때 중요합니다. 판다스는 이러한 작업을 위해 sort_values() 및 sort_index()를 제공합니다. 반면에 순위 매기기는 데이터에 순위를 할당하여 리더보드와 유사하게 만듭니다.

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
# 체중순으로 정렬
sorted_zoo = zoo_df.sort_values(by='Weight', ascending=False)
# 나이순으로 동물 순위 매기기
zoo_df['Age_rank'] = zoo_df['Age'].rank(method='min', ascending=False)
```

데이터 걸러내기 및 그룹화: 데이터 살펴보기

필터링을 통해 특정 기준을 충족하는 데이터만 볼 수 있습니다. groupby()와 함께 사용되는 그룹화로 카테고리화된 데이터에 대한 작업을 수행할 수 있습니다.

```js
# 300 파운드 이상의 동물 필터링
heavy_animals = zoo_df[zoo_df['Weight'] > 300]
# 동물 종류별로 그룹핑하여 평균 체중 계산
avg_weight_by_animal = zoo_df.groupby('Animal')['Weight'].mean()
우리의 동물 데이터셋에 대한 통찰을 제공하기 위해 동물공원 프로젝트를 위한 복잡한 코드 예제를 함께 구성해 보겠습니다. 동물원 주민을 필터링, 정렬, 순위 매기는 메소드를 연쇄적으로 적용하여 데이터를 처리할 것입니다.
# 동물원 프로젝트를 위한 복잡한 메소드 체이닝
(zoo_df
  .query('Weight >= 200')
  .assign(Age_in_months=lambda x: x['Age'] * 12)
  .sort_values(by=['Animal', 'Age_in_months'], ascending=[True, False])
  .groupby('Animal')
  .agg({'Name': 'first', 'Age_in_months': 'max', 'Weight': 'mean'})
  .rename(columns={'Name': 'Oldest_Animal', 'Age_in_months': 'Oldest_Age', 'Weight': 'Avg_Weight'})
  .reset_index()
)
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

```js
결과
    동물      가장 나이 많은 동물    가장 나이     평균 무게
0    곰       발루           36            50.0
1    사자      레오           60           250.0
2    호랑이    스트라이프     84           220.0
3    얼룩말    자라           48           380.0
```

이 블록에서는 200 파운드보다 무겁지 않은 동물을 걸러내고, 나이를 개월로 변환하며, 동물 유형과 나이순으로 정렬하여 동물 유형별로 그룹화한 다음, 가장 나이 많은 동물과 평균 무게를 찾기 위해 집계합니다. 이를 통해 데이터를 명확하고 조직적으로 볼 수 있으며, 추가 분석이나 보고에 이상적입니다.

계속해서 찾아주시기 바랍니다 (-̀ᴗ-́ )و

이전 포스트: `- Pandas: 파이썬에서 데이터 분석의 중추`

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

다음 - Pandas: 데이터 정리 및 변형