---
title: "아직 잘 알려지지 않은 5가지 파이썬 데이터 시각화 기법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_0.png"
date: 2024-07-12 20:09
ogImage: 
  url: /TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_0.png
tag: Tech
originalTitle: "Top 5 Python Data Visualization Techniques You Probably Aren’t Using"
link: "https://medium.com/top-python-libraries/top-5-python-data-visualization-techniques-you-probably-arent-using-ecde053f578b"
---



![이미지](/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_0.png)

## 이 5가지 고급 시각화 차트를 마스터하세요

이 다섯 가지 고급 시각화 차트를 마스터하면 데이터 시각화가 쉬워집니다. 이 라이브러리들은 서로 보완하여 데이터 표현을 극대화합니다.

# 1. 화음도표

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

Chord Diagram(코드 다이어그램)은 데이터 포인트 간의 복잡한 관계를 창조적으로 보여줍니다. 노드들이 원 주위에 배열되어 아크로 연결됩니다. 아크의 길이는 연결 값을 반영하며 두께는 관계의 중요도를 나타냅니다. 색상은 데이터를 분류하여 비교를 쉽게 만듭니다. 유전자 데이터 시각화를 위해 특히 다양한 분야에서 널리 사용됩니다.

![Chord Diagram example](/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_1.png)

![Chord Diagram example 2](/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_2.png)

다음은 Holoviews 및 Bokeh를 사용하여 다섯 개국 간의 무역 관계를 보여주는 코드 다이어그램 예시입니다.

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
import holoviews as hv
from holoviews import opts
import pandas as pd
import numpy as np
hv.extension('bokeh')

# 5개 국가 간의 수출량을 나타내는 표본 행렬
export_data = np.array([[0, 50, 30, 20, 10],   
                        [10, 0, 40, 30, 20],   
                        [20, 10, 0, 35, 25],   
                        [30, 20, 10, 0, 40],   
                        [25, 15, 30, 20, 0]]) 

labels = ['USA', 'China', 'Germany', 'Japan', 'India']

# 판다스 데이터프레임 생성
df = pd.DataFrame(export_data, index=labels, columns=labels)
df = df.stack().reset_index()

df.columns = ['source', 'target', 'value']

# Chord 객체 생성
chord = hv.Chord(df)

# Chord 다이어그램 스타일링
chord.opts(
    opts.Chord(
        cmap='Category20', edge_cmap='Category20', 
        labels='source', label_text_font_size='10pt',  
        edge_color='source', node_color='index', 
        width=700, height=700 
    )
).select(value=(5, None)) 

# 플롯 출력
chord
```

![Chord Diagram](/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_3.png)

- [Chord 호환성](https://holoviews.org/reference/elements/matplotlib/Chord.html)
- [pyCirclize GitHub](https://github.com/moshi4/pyCirclize)


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

# 2. 썬버스트 차트

썬버스트 차트는 계층적 데이터를 명확하게 표시하여 전통적인 원형 및 링 차트를 능가합니다. 각각 계층을 나타내는 동심원을 사용합니다. 중심은 루트이며 세그먼트는 노드를 나타냅니다. 각 세그먼트의 크기는 해당 값을 반영하여 데이터의 중요성을 직관적으로 이해하게 합니다. 파일 시스템 계층 구조, 사용자 탐색 경로, 시장 세분화 및 유전 데이터의 시각화에 유용합니다.

다음은 Plotly 라이브러리를 사용하여 썬버스트 차트를 만드는 예시입니다.

```js
import plotly.express as px
import numpy as np

df = px.data.gapminder().query("year == 2007")

fig = px.sunburst(df, path=['continent', 'country'], 
                  values='pop',
                  color='lifeExp', 
                  hover_data=['iso_alpha'],
                  color_continuous_scale='RdBu',
                  color_continuous_midpoint=np.average(df['lifeExp'], weights=df['pop']))
fig.show()
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


[그림](https://plotly.com/python/sunburst-charts/)

# 3. Hexbin Plot

[그림](/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_5.png)


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

헥스빈 플롯 또는 육각형 바이닝은 데이터 점이 밀집되어 있을 때 특히 2D 데이터 분포를 시각화하는 데 효과적입니다. 데이터 공간을 육각형 바인으로 분할하며 색상은 각 바인 내의 점 수를 나타내어 데이터 분포를 명확하게 표현합니다.

Python과 Matplotlib을 사용하여 공기 품질 지수(AQI)와 병원 방문 간의 상관 관계를 시연한 헥스빈 플롯을 만드는 예제를 보여드릴게요.

```js
import numpy as np
import matplotlib.pyplot as plt
from mplhexbin import HexBin

# 시뮬레이션 데이터
np.random.seed(0)  # 재현성 확보
n_points = 10000
x = np.random.rand(n_points) * 100  # 공기 품질 지수(AQI) 범위: 0에서 100
y = 5 * np.sin(x * np.pi / 50) + np.random.randn(n_points) * 15  # 시뮬레이션된 병원 방문, AQI와 관련 있지만 잡음이 있음

# 새로운 그림 생성
fig, ax = plt.subplots(figsize=(10, 8))

# HexBin을 사용하여 육각형 바인 플롯 생성
hb = HexBin(ax, gridsize=20, cmap='viridis', extent=[0, 100, -30, 50])  # 그리드 크기, 색상 지도 및 범위 설정
hb.hexbin(x, y, mincnt=1)  # 육각형 바인 플롯 그리기, mincnt는 최소 카운트 임계값을 설정합니다

# 제목 및 축 레이블 추가
ax.set_title('공기 품질 지수(AQI)와 병원 방문 간의 관계')
ax.set_xlabel('공기 품질 지수(AQI)')
ax.set_ylabel('병원 방문')

# 그림 표시
plt.colorbar(hb.cmap, ax=ax, label='데이터 포인트 수')  # 컬러바 추가 및 레이블 설정
plt.show()
```

<img src="/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_6.png" />

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

https://matplotlib.org/stable/gallery/statistics/hexbin_demo.html

# 4. 샌키 다이어그램

샌키 다이어그램은 엔터프라이즈 시스템과 시계열 데이터의 흐름을 시각적으로 보여주는 차트입니다. 데이터의 유입과 유출을 보여주며 주로 에너지, 재료, 금융 데이터에 사용됩니다. 매튜 헨리 핀리어스 릴 샌키(Mattew Henry Phineas Riall Sankey)의 이름을 따와 만들어졌습니다. 다이어그램은 시스템의 단계들 간의 데이터 양을 바로 알 수 있게 해줍니다. 노드의 너비는 흐름의 양과 비례하기 때문에 데이터의 규모와 방향을 이해하기 쉽습니다.

<img src="/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_7.png" />

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

아래는 파이썬을 사용하여 생산원에서 작은 도시 소비자에게 에너지 흐름을 보여주는 샌키 다이어그램을 생성하는 예제입니다.

```python
import plotly.graph_objects as go

labels = ["Coal", "Solar", "Wind", "Nuclear", "Residential", "Industrial", "Commercial"]

source = [0, 1, 2, 3, 0, 1, 2, 3] 
target = [4, 4, 4, 4, 5, 5, 5, 5] 
value = [25, 10, 40, 20, 30, 15, 25, 35] 

# 샌키 다이어그램 객체 생성
fig = go.Figure(data=[go.Sankey(
    node=dict(
        pad=15,  
        thickness=20, 
        line=dict(color="black", width=0.5),
        label=labels 
    ),
    link=dict(
        source=source,  
        target=target, 
        value=value  
    ))])

fig.update_layout(title_text="모델 도시의 에너지 흐름", font_size=12)
fig.show()
```

[이미지 바로가기](/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_8.png)

[Plotly 샌키 다이어그램 자세히 보기](https://plotly.com/python/sankey-diagram/)

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

# 5. 스트림 그래프 (테마 리버)

스트림 그래프는 변화를 나타내는 강을 닮았습니다. 색상이 카테고리를 구분하며, "강"의 너비는 각 카테고리의 값으로 나타냅니다. 데이터 동태를 이해하기 쉽게 보여주며, 추세와 관계를 시각적으로 표현합니다.

![Stream Graph](/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_9.png)

여기에는 Altair 라이브러리를 사용하여 스트림 그래프를 만드는 예시가 있습니다.

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
import altair as alt
from vega_datasets import data

source = data.unemployment_across_industries.url

alt.Chart(source).mark_area().encode(
    alt.X('yearmonth(date):T',
        axis=alt.Axis(format='%Y', domain=False, tickSize=0)
    ),
    alt.Y('sum(count):Q', stack='center', axis=None),
    alt.Color('series:N',
        scale=alt.Scale(scheme='category20b')
    )
).interactive()
```

<img src="/TIL/assets/img/2024-07-12-Top5PythonDataVisualizationTechniquesYouProbablyArentUsing_10.png" />

https://altair-viz.github.io/gallery/streamgraph.html

최신 AI 이야기를 계속 읽으려면 Substack에서 저희와 함께하세요. 우리 함께 AI의 미래를 모습을 만들어 봅시다!


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

파이썬 이야기를 업데이트 받으려면 Substack에서 저희와 함께 연락하십시오. 함께 파이썬을 배워봐요!