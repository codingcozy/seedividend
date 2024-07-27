---
title: "파이썬 데이터 시각화 Seaborn 라이브러리 사용법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_0.png"
date: 2024-07-09 20:10
ogImage:
  url: /assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_0.png
tag: Tech
originalTitle: "Data Visualization in Python: Seaborn Library"
link: "https://medium.com/@pythonfundamentals/data-visualization-in-python-seaborn-library-be9febe601bc"
---

시각화는 데이터에서 통찰을 전달하는 강력한 방법입니다. 파이썬의 Seaborn 라이브러리는 Matplotlib을 기반으로 한, 시각적으로 매력적이고 정보를 제공하는 높은 수준의 인터페이스를 제공합니다. 이 기사에서는 Seaborn 라이브러리를 자세히 살펴보며 그 기능을 탐구하고 다양성을 보여주는 실용적인 코드 예제를 제시할 것입니다.

![image](/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_0.png)

## Seaborn이란

Seaborn은 복잡하고 아름다운 시각화를 만드는 과정을 단순화하는 데이터 시각화 라이브러리입니다. 시각적 경험을 향상하기 위해 내장된 테마와 색 팔레트를 제공합니다. Seaborn은 통계적 시각화를 생성하는 데 특히 적합하며 변수 간의 관계를 시각화하는 데 자주 사용됩니다.

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

# Seaborn을 이용한 시각화 생성

Seaborn의 주요 기능과 기능을 몇 가지 코드 예제와 함께 살펴보겠습니다.

## 1. 산점도

- a) 기본 산점도

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
import matplotlib.pyplot as plt
```

```js
# 샘플 데이터
x = [1, 2, 3, 4, 5]
y = [3, 5, 8, 6, 7]
```

```js
# Seaborn을 사용하여 기본 산점도 그리기
sns.scatterplot(x=x, y=y)
plt.xlabel('X축')
plt.ylabel('Y축')
plt.title('Seaborn을 사용한 기본 산점도')
plt.show()
```

<img src="/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_1.png" />

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

- b) 색상과 색조를 가진 산점도

```python
import seaborn as sns
import matplotlib.pyplot as plt
```

```python
# 샘플 데이터
x = [1, 2, 3, 4, 5]
y = [3, 5, 8, 6, 7]
categories = ['A', 'B', 'A', 'B', 'A']
```

```python
# Seaborn을 사용하여 색상과 색조를 가진 산점도 생성
sns.scatterplot(x=x, y=y, hue=categories, palette='Set1')
plt.xlabel('X-축')
plt.ylabel('Y-축')
plt.title('색상과 색조를 가진 산점도')
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

<img src="/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_2.png" />

## 2. 상자 그림

- a) 기본 상자 그림

```js
import seaborn as sns
import matplotlib.pyplot as plt
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
# 샘플 데이터
data = sns.load_dataset('iris')
```

```js
# Seaborn을 사용하여 기본 상자 그림 생성
sns.boxplot(x='species', y='sepal_length', data=data)
plt.xlabel('종류')
plt.ylabel('꽃 받침 길이')
plt.title('Seaborn을 사용한 기본 상자 그림')
plt.show()
```

<img src="/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_3.png" />

- b) 색상 팔레트를 사용한 가로 상자 그림

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
import matplotlib.pyplot as plt
```

```js
# 샘플 데이터
data = sns.load_dataset('titanic')
```

```js
# Seaborn을 사용하여 색상 팔레트를 이용한 수평 상자 그림 생성
sns.boxplot(x='age', y='class', data=data, orient='h', palette='Set2')
plt.xlabel('나이')
plt.ylabel('등급')
plt.title('색상 팔레트를 이용한 수평 상자 그림')
plt.show()
```

<img src="/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_4.png" />

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

- c) 그룹화된 상자 그림

```js
import seaborn as sns
import matplotlib.pyplot as plt
```

```js
# 샘플 데이터
data = sns.load_dataset('tips')
```

```js
# Seaborn을 사용하여 그룹화된 상자 그림 생성
sns.boxplot(x='day', y='total_bill', data=data, hue='sex', palette='Set3')
plt.xlabel('요일')
plt.ylabel('총 계산')
plt.title('그룹화된 상자 그림')
plt.legend(title='성별')
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

<img src="/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_5.png" />

- d) Notched Box Plot

```js
import seaborn as sns
import matplotlib.pyplot as plt
```

```js
# Sample data
data = sns.load_dataset('diamonds')
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
# Seaborn을 사용하여 notch가 있는 상자 그림 만들기
sns.boxplot(x='cut', y='price', data=data, notch=True, palette='pastel')
plt.xlabel('Cut')
plt.ylabel('Price')
plt.title('Notched Box Plot')
plt.show()
```

<img src="/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_6.png" />

- e) 사용자 정의 상자 그림

```js
import seaborn as sns
import matplotlib.pyplot as plt
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
# 샘플 데이터
data = sns.load_dataset('mpg')
```

```js
# Seaborn을 사용하여 사용자 정의 상자 그림 만들기
sns.boxplot(x='origin', y='mpg', data=data, hue='cylinders', palette='Set2')
plt.xlabel('Origin')
plt.ylabel('Miles per Gallon')
plt.title('Customized Box Plot')
plt.legend(title='Cylinders')
plt.show()
```

<img src="/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_7.png" />

## 3. Pair Plot

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

- a) 기본 Pair Plot

```js
import seaborn as sns
import matplotlib.pyplot as plt
```

```js
# 샘플 데이터
data = sns.load_dataset('iris')
```

```js
# Seaborn을 사용하여 기본 Pair Plot 생성
sns.pairplot(data, hue='species')
plt.title('Seaborn을 사용한 기본 Pair Plot')
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

![image](/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_8.png)

- b) Pair Plot with Custom Color Palette

```js
import seaborn as sns
import matplotlib.pyplot as plt
```

```js
# Sample data
data = sns.load_dataset('tips')
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
# Seaborn을 사용하여 사용자 정의 색상 팔레트로 pair plot 만들기
sns.pairplot(data, hue='sex', palette='Set2')
plt.title('사용자 정의 색상 팔레트로 Pair Plot 만들기')
plt.show()
```

<img src="/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_9.png" />

- c) 다른 플롯 유형을 사용한 Pair Plot

```js
import seaborn as sns
import matplotlib.pyplot as plt
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
# 샘플 데이터
data = sns.load_dataset('penguins')
```

```js
# Seaborn을 사용하여 다른 종류의 플롯을 사용하여 페어 플롯 생성
g = sns.PairGrid(data)
g.map_upper(sns.scatterplot)
g.map_lower(sns.kdeplot)
g.map_diag(sns.histplot, kde_kws={'color': 'k'})
plt.title('다른 플롯 유형을 사용한 페어 플롯')
plt.show()
```

<img src="/TIL/assets/img/2024-07-09-DataVisualizationinPythonSeabornLibrary_10.png" />

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

시본은 파이썬에서 정보를 전달하고 미적으로 매력적인 데이터 시각화를 생성하는 강력한 라이브러리입니다. 산점도, 상자 그림, 쌍 플롯 또는 더 복잡한 시각화를 만들 때 시본의 우아한 구문과 내장 테마가 과정을 단순화합니다.

# 파이썬 기초

소중한 시간 내어 주셔서 감사합니다! 🚀
더 많은 콘텐츠는 "Python Fundamentals"에서 찾아보실 수 있어요! 💫
