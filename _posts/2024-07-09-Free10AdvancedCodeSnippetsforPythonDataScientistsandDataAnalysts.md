---
title: "데이터 과학자와 데이터 분석가를 위한 10개의 고급 파이썬 코드 조각 모음"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_0.png"
date: 2024-07-09 09:15
ogImage:
  url: /assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_0.png
tag: Tech
originalTitle: "Free 10++ Advanced Code Snippets for Python Data Scientists and Data Analysts"
link: "https://medium.com/@andreastegusks/free-10advanced-code-snippets-for-python-data-scientists-and-data-analysts-49b2fe3fec59"
---

매수 분석가 또는 분석가로 활동할 때 효과적인 데이터 분석과 통찰을 얻기 위해서는 고급 코딩 기술을 배우는 것이 중요합니다. 이 게시물에서는 타이타닉 데이터셋을 중심으로 15가지 고급 Python 코드 조각을 살펴보겠습니다. 데이터 조작, 시각화, 머신러닝과 같은 분석 능력을 향상시키는데 도움이 될 것입니다.

![Image](/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_0.png)

## 1. 타이타닉 데이터셋 불러오기

먼저, Seaborn 라이브러리를 사용하여 타이타닉 데이터셋을 불러오고 데이터셋의 처음 몇 줄을 보여줍시다.

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
import seaborn as sns

# 타이타닉 데이터셋을 불러옵니다
titanic = sns.load_dataset('titanic')

# 데이터셋의 처음 몇 행을 출력합니다
print(titanic.head())
```

이 코드 조각은 타이타닉 데이터셋을 판다스 DataFrame으로 불러와서 처음 몇 행을 출력하여 데이터의 구조를 살펴볼 수 있게 해줍니다.

# 2. 누락된 값 처리

누락된 값을 처리하는 것은 데이터 분석에서 흔한 작업입니다. 'age' 열의 누락된 값을 중앙값으로 채워봅시다.

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
# 'age' 열의 누락된 값을 중위 연령으로 채우기
titanic['age'].fillna(titanic['age'].median(), inplace=True)
```

이 코드 스니펫은 'age' 열의 누락된 값을 탑승객들의 중위 연령으로 대체하여 데이터를 완전하게 유지하여 추가 분석을 수행합니다.

# 3. Feature Engineering

피처 엔지니어링은 모델 성능을 향상시키기 위해 새로운 피처를 생성하거나 기존 피처를 변환하는 작업을 포함합니다. 승객이 어린이인지 성인인지를 나타내는 새로운 피처를 만들어 보겠습니다:

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
# 새로운 기능 'is_child'를 생성합니다
titanic['is_child'] = titanic['age'] < 18
```

이 스니펫은 데이터셋에 새로운 이진 기능 'is_child'를 추가합니다. 이 기능은 승객이 어린이인지(나이 < 18) 성인인지를 나타냅니다.

# 4. Seaborn을 활용한 데이터 시각화

Seaborn은 Python에서 데이터 시각화를 위한 강력한 라이브러리입니다. 승객 클래스의 분포를 시각화하기 위해 카운트 플롯을 생성해봅시다:

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
import matplotlib.pyplot as plt

# 승객 클래스에 대한 카운트 플롯
plt.figure(figsize=(8, 5))
sns.countplot(x='pclass', data=titanic, color='skyblue')
plt.title('승객 클래스 분포')
plt.xlabel('클래스')
plt.ylabel('카운트')
plt.show()
```

이 코드 스니펫은 승객 클래스의 분포를 보여주는 카운트 플롯을 생성하며, 아름다움을 위해 하늘색을 사용했습니다.

<img src="/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_1.png" />

# 5. 상관 분석

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

변수 간의 관계를 이해하는 것은 데이터 분석에서 중요합니다. 수치형 특성에 대한 상관 행렬을 계산하고 시각화해 보겠습니다:

```js
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 범주형 열을 원-핫 인코딩을 사용하여 수치형으로 변환합니다
titanic_numeric = pd.get_dummies(titanic, drop_first=True)

# 상관 행렬을 계산합니다
correlation_matrix = titanic_numeric.corr()

# Matplotlib 피겨 설정
plt.figure(figsize=(12, 10))

# 적절한 가시성과 비율로 heatmap을 그립니다
sns.heatmap(correlation_matrix, annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1, linewidths=.5, annot_kws={"size": 7})

# 플롯 스타일을 조정합니다
plt.xticks(rotation=45, ha='right', fontsize=8)
plt.yticks(fontsize=8)
plt.title('상관 행렬', fontsize=15)
plt.tight_layout()

# 플롯을 보여줍니다
plt.show()
```

이 코드 스니펫은 상관 행렬을 계산하고, 수치형 특성 간의 상관 관계를 시각화하는 heatmap을 생성합니다. 쿨 웜 컬러를 사용하며, 빨간색은 양의 상관 관계를 나타냅니다.

<img src="/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_2.png" />

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

# 6. 각 클래스별 운임 분포를 시각화하는 상자 그림

여기 각 승객 클래스별 운임 분포를 시각화하기 위한 상자 그림을 만들어봅시다:

```js
# 클래스별 운임 분포를 위한 상자 그림
plt.figure(figsize=(8, 6))
sns.boxplot(x='pclass', y='fare', data=titanic, color='green')
plt.title('클래스별 운임 분포')
plt.xlabel('클래스')
plt.ylabel('운임')
plt.show()
```

이 코드 스니펫은 서로 다른 승객 클래스 간의 운임 분포를 보여주는 상자 그림을 생성합니다. 여기서는 미적 요소로 녹색 색상을 사용했습니다.

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

![image](/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_3.png)

# 7. Distribution of Age by Survival Status

생존자와 비생존자의 연령 분포를 시각화하면 연령이 생존에 미치는 영향에 대한 통찰력을 얻을 수 있습니다:

```js
# 생존 상태별 연령 분포
plt.figure(figsize=(8, 6))
sns.histplot(x='age', hue='survived', data=titanic, multiple='stack', palette='Set2')
plt.title('Distribution of Age by Survival Status')
plt.xlabel('Age')
plt.ylabel('Count')
plt.show()
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

이 코드 스니펫은 생존자와 비생존자의 연령 분포를 보여주는 히스토그램을 생성하며, 서바이벌 상태를 나타내는 다른 색상을 사용합니다.

| Age | Survived |
| --- | -------- |
| 22  | 1        |
| 30  | 0        |
| 25  | 1        |
| 40  | 0        |
| 35  | 1        |

# 8. Fare vs. Age에 대한 산점도 그래프

요금과 연령 간의 관계를 시각화하기 위해 산점도 그래프를 생성해 봅시다.

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
# 요금 대 나이 산점도
plt.figure(figsize=(8, 6))
sns.scatterplot(x='나이', y='요금', data=타이타닉, color='green')
plt.title('요금 대 나이')
plt.xlabel('나이')
plt.ylabel('요금')
plt.show()
```

이 코드 조각은 나이와 요금 사이의 관계를 보여주는 산점도를 생성하며, 시각적으로 녹색을 사용합니다.

<img src="/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_5.png" />

# 9. 클래스별 생존율 막대 그래프

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

생존율을 각 클래스별로 시각화하면 클래스에 따른 생존 가능성에 대한 통찰을 제공할 수 있습니다.

```js
# 클래스별 생존율 막대 그래프
plt.figure(figsize=(8, 6))
sns.barplot(x='pclass', y='survived', data=titanic, ci=None, color='하늘색')
plt.title('클래스별 생존율')
plt.xlabel('클래스')
plt.ylabel('생존율')
plt.show()
```

이 코드 조각은 각 승객 클래스의 생존율을 보여주는 막대 그래프를 생성하며, 아름다운 하늘색을 사용했습니다.

![생존율](/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_6.png)

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

# 10. 숫자 변수에 대한 쌍 플롯

쌍 플롯을 사용하면 데이터셋의 숫자 변수 쌍 간의 관계를 시각화할 수 있습니다:

```js
# 숫자 변수에 대한 쌍 플롯
sns.pairplot(titanic[['age', 'fare', 'pclass']], diag_kind='kde', palette='Set3')
plt.title('숫자 변수에 대한 쌍 플롯')
plt.show()
```

이 코드 조각은 'age', 'fare', 'pclass' 변수에 대한 쌍 플롯을 생성하며, 대각선에 커널 밀도 추정(KDE) 플롯이 포함되어 있습니다.

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

![image](/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_7.png)

# 11. 승선 도시 분포를 위한 막대 그래프

승선 도시에 따른 승객 분포를 시각화해보겠습니다. 다음은 막대 그래프를 사용한 코드입니다:

```python
# 승선 도시 분포를 위한 막대 그래프
plt.figure(figsize=(8, 6))
sns.countplot(x='embark_town', data=titanic, color='skyblue')
plt.title('승선 도시별 승객 분포')
plt.xlabel('승선 도시')
plt.ylabel('인원 수')
plt.show()
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

이 코드 스니펫은 승선한 마을별 승객 분포를 보여주는 막대 플롯을 만듭니다. 시각적인 아름다움을 위해 하늘색이 사용되었습니다.

![Distribution of passengers by embarked town](/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_8.png)

# 12. 함께 탑승한 형제/배우자의 분포

함께 탑승한 형제/배우자의 분포를 시각화하면 승객들 사이의 가족 구성원 크기에 대한 통찰을 얻을 수 있습니다.

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

# 함께 탑승한 형제자매/배우자 분포

plt.figure(figsize=(8, 6))
sns.histplot(x='sibsp', data=titanic, bins=range(0, 9), color='skyblue', discrete=True)
plt.title('함께 탑승한 형제자매/배우자 분포')
plt.xlabel('형제자매/배우자 수')
plt.ylabel('수량')
plt.show()

이 코드 스니펫은 함께 탑승한 형제자매/배우자 수에 대한 분포를 보여주는 히스토그램을 생성합니다. 아름다운 목적으로 하늘색을 사용했어요.

<img src="/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_9.png" />

# 13. 성별 분포를 보여주는 파이 차트

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

여행객의 성별 분포를 파이 차트로 시각화해보세요:

```js
# 성별 분포 파이 차트
gender_counts = titanic['sex'].value_counts()
plt.figure(figsize=(6, 6))
plt.pie(gender_counts, labels=gender_counts.index, colors=['#66c2a5', '#fc8d62'], autopct='%1.1f%%', startangle=140)
plt.title('Gender Distribution')
plt.show()
```

이 코드 스니펫은 성별에 따른 탑승객 분포를 보여주는 파이 차트를 생성하며, 남성과 여성을 나타내기 위해 서로 다른 색상을 사용합니다.

<img src="/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_10.png" />

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

# 14. 성별에 따른 연령 분포를 시각화하는 스왐 플롯

스왐 플롯은 성별에 따른 연령 분포를 시각화하는 데 사용될 수 있습니다:

```js
# 성별에 따른 연령 분포를 나타내는 스왐 플롯
plt.figure(figsize=(10, 6))
sns.swarmplot(x='sex', y='age', data=titanic, color='skyblue')
plt.title('성별에 따른 연령 분포')
plt.xlabel('성별')
plt.ylabel('연령')
plt.show()
```

이 코드 조각은 남성과 여성 승객의 연령 분포를 보여주는 스왐 플롯을 생성하며, 시각적으로 아름다운 하늘색을 사용합니다.

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

![이미지](/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_11.png)

# 15. 클래스 및 성별별 요금 분포에 대한 바이올린 플롯

승객 클래스 및 성별에 따른 요금 분포를 시각화하기 위해 바이올린 플롯을 만들어봅시다:

```python
# 클래스 및 성별에 따른 요금 분포에 대한 바이올린 플롯
plt.figure(figsize=(10, 6))
sns.violinplot(x='pclass', y='fare', hue='sex', data=titanic, split=True, palette='Greens')
plt.title('클래스 및 성별별 요금 분포')
plt.xlabel('클래스')
plt.ylabel('요금')
plt.show()
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

이 코드 스니펫은 각 승객 클래스별로 성별로 나누어 지불요금의 분포를 보여주는 바이올린 플롯을 생성합니다. 이 때, 시각적으로 녹색 색상을 사용합니다.

![Violin Plot](/TIL/assets/img/2024-07-09-Free10AdvancedCodeSnippetsforPythonDataScientistsandDataAnalysts_12.png)

이러한 고급 코드 스니펫은 파이썬을 사용한 데이터 조작, 시각화 및 분석의 다양한 측면을 다룹니다. 이 기술들을 숙달함으로써 우리는 복잡한 데이터셋을 처리하고 데이터에서 의미 있는 통찰을 얻는 데 더 잘 대비할 수 있습니다.
