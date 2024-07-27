---
title: "멋진 데이터 시각화를 위한 최고의 10가지 Python 도구"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-Top10PythonToolsforStunningDataVisualizations_0.png"
date: 2024-07-07 02:27
ogImage:
  url: /assets/img/2024-07-07-Top10PythonToolsforStunningDataVisualizations_0.png
tag: Tech
originalTitle: "Top 10 Python Tools for Stunning Data Visualizations"
link: "https://medium.com/top-python-libraries/top-10-python-tools-for-stunning-data-visualizations-e51a8e96c03a"
---

## 파이썬 시각화

오늘은 독특하고 인상적인 열 가지 파이썬 시각화 도구를 소개하겠습니다.

### Matplotlib

Matplotlib은 고품질의 선 그래프, 산점도, 막대 그래프 등을 생성할 수 있는 파이썬 플로팅 라이브러리입니다. 다른 많은 시각화 라이브러리들의 기반입니다.

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
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.show()
```

![Image](/TIL/assets/img/2024-07-07-Top10PythonToolsforStunningDataVisualizations_0.png)

# Seaborn

Seaborn은 Matplotlib을 기반으로 한 Python 데이터 시각화 라이브러리로, 히트맵, 바이올린 플롯, 오차 막대를 사용한 선 그래프와 같은 통계 그래픽을 위해 설계되었습니다.

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
import pandas as pd

df = pd.read_csv('data.csv')

sns.boxplot(x='day', y='total_bill', data=df)
```

# Plotly
