---
title: "Matplotlib를 사용한 데이터 시각화 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-DataVisualizationwithMatplotlib_0.png"
date: 2024-07-13 20:32
ogImage: 
  url: /TIL/assets/img/2024-07-13-DataVisualizationwithMatplotlib_0.png
tag: Tech
originalTitle: "Data Visualization with Matplotlib"
link: "https://medium.com/coinmonks/data-visualization-with-matplotlib-9d4847d9f3d5"
---


![이미지](/TIL/assets/img/2024-07-13-DataVisualizationwithMatplotlib_0.png)

데이터 시각화는 데이터 작업을 하는 사람들에게 매우 중요한 기술입니다. 이를 통해 복잡한 데이터 세트를 이해하고 결과를 효과적으로 전달할 수 있습니다. Python에서 데이터 시각화에 가장 인기 있는 라이브러리 중 하나인 Matplotlib을 살펴보겠습니다. 동물원 프로젝트와 관련된 코드 예제들은 이러한 개념을 더 잘 이해할 수 있도록 도와줍니다.

# Matplotlib 개요

Matplotlib은 Python 프로그래밍 언어를 위한 플로팅 라이브러리입니다. 일반 GUI 툴킷인 Tkinter, wxPython, Qt 또는 GTK를 사용하여 응용 프로그램에 플롯을 임베딩하기 위한 객체 지향 API를 제공합니다. Matplotlib은 또한 Python에서 정적, 애니메이션 및 대화형 시각화를 만드는 데 인기 있는 라이브러리입니다. 차트나 그래프를 만드는 것이 얼마나 쉬운지 알아보기 위해 몇 가지 코드 예제를 살펴봅시다.

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
# 간단한 그래프 예제
x = np.linspace(0, 10, 100)
y = np.sin(x)
plt.plot(x, y)
plt.show()
```

출력

<img src="/TIL/assets/img/2024-07-13-DataVisualizationwithMatplotlib_1.png" />

이 간단한 예제는 Matplotlib을 사용하여 기본 선 그래프를 만드는 방법을 보여줍니다. 그러나 Matplotlib의 강점은 그 유연성과 복잡한 그래프를 만들 수 있는 능력에서 나옵니다.

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

## 그림과 축

Matplotlib에서 그림은 플롯을 구성하는 모든 요소를 포함하는 컨테이너로 생각할 수 있습니다. 축은 '플롯'으로 일반적으로 생각되는 요소로, 데이터 공간을 나타냅니다.

그림

Matplotlib에서 그림은 모든 것이 그려지는 전체 창 또는 페이지입니다. 이 그림에는 서브 축, 제목, 범례 및 레이블이 포함됩니다.

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
fig = plt.figure()  # 아무 축이 없는 빈 그림
fig, ax = plt.subplots()  # 하나의 축이 있는 그림
fig, axs = plt.subplots(2, 2)  # 2x2 격자 형태의 축이 있는 그림
```

축

이것은 우리가 '플롯'이라고 생각하는 것으로, 데이터 공간이 있는 이미지의 영역입니다. 하나의 그림에는 여러 축이 포함될 수 있지만, 특정 축 객체는 하나의 그림에만 있을 수 있습니다.

```js
fig = plt.figure()
ax1 = fig.add_subplot(211)  # 2행 1열로 구성된 그림에 서브플롯 추가 및 첫 번째 플롯 참조
ax2 = fig.add_subplot(212)  # 2행 1열로 구성된 그림에 서브플롯 추가 및 두 번째 플롯 참조
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

이제 동물원 프로젝트를 고려해보겠습니다. 다양한 동물과 그 특성에 관한 데이터가 있습니다. 우리는 Matplotlib을 사용하여 이 데이터를 시각화하고 싶습니다.

```js
import pandas as pd
# 동물원 프로젝트용 DataFrame 'df'가 있다고 가정
import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame({
    'animal': ['lion', 'tiger', 'bear', 'zebra', 'giraffe'],
    'count': [5, 4, 6, 8, 2],
    'average_weight': [190, 220, 300, 250, 800]
})
fig, ax = plt.subplots()
# 동물 수에 대한 막대 그래프
ax.bar(df['animal'], df['count'], color='blue', alpha=0.7, label='Count')
# 평균 무게에 대한 선 그래프, 보조 y-축 사용
ax2 = ax.twinx()
ax2.plot(df['animal'], df['average_weight'], color='red', label='Average Weight')
# 라벨 및 제목
ax.set_xlabel('동물')
ax.set_ylabel('수')
ax2.set_ylabel('평균 무게 (kg)')
plt.title('동물원 동물 통계')
# 범례 표시
fig.legend(loc="upper left", bbox_to_anchor=(0,1), bbox_transform=ax.transAxes)
plt.show()
```

출력

<img src="/TIL/assets/img/2024-07-13-DataVisualizationwithMatplotlib_2.png" />

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

이 예제에서는 각 동물의 수를 나타내는 막대 플롯과 각 동물의 평균 체중을 나타내는 라인 플롯을 만들었습니다. 두 가지 다른 양을 나타내기 위해 두 개의 y-축을 사용했습니다.

## 서브플롯 이해하기

서브플롯(subplots)은 동일한 그림 안에 여러 플롯을 만드는 방법입니다. 이것은 그리드 시스템과 같이 생각해볼 수 있습니다. 각 셀에는 플롯이 들어갈 수 있는 격자가 있습니다. 같은 그림 내에서 다수의 플롯을 구조적으로 표시하고 싶을 때 매우 유용합니다. Matplotlib에서는 plt.subplots() 함수를 사용하여 서브플롯을 만듭니다. 전달한 두 인수는 우리의 그리드의 행과 열의 수입니다. 예를 들어, plt.subplots(2, 3)은 2개의 행과 3개의 열을 가진 그리드를 만들어 총 6개의 서브플롯을 얻게 됩니다.

```js
fig, axs = plt.subplots(2, 3)  # 2행 3열의 그리드를 생성합니다
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

이제 axs는 우리가 조작할 수있는 축 (개별 플롯)를 보유하고있는 2D 배열입니다. 예를 들어, axs[0, 1]은 첫 번째 행과 두 번째 열의 서브플롯에 액세스할 수 있습니다.

## 여러 축

가끔은 서로 다른 스케일이나 단위를 가진 서로 다른 데이터 세트를 동일한 플롯에 그리고 싶을 수 있습니다. 그럴 때 다중 축이 유용합니다.

Matplotlib에서는 twinx() 또는 twiny() 메서드를 사용하여 플롯에 두 번째 축을 추가할 수 있습니다. twinx()는 두 번째 y 축을, twiny()는 두 번째 x 축을 생성합니다.

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
fig, ax1 = plt.subplots()
# 첫 번째 y축에 그리기
ax1.plot(x, y1, color='blue')
ax1.set_ylabel('Y1', color='blue')
# 두 번째 y축 생성 및 그리기
ax2 = ax1.twinx()
ax2.plot(x, y2, color='red')
ax2.set_ylabel('Y2', color='red')
```

결과

<img src="/TIL/assets/img/2024-07-13-DataVisualizationwithMatplotlib_3.png" />

이 예시에서는 y1과 y2가 동일한 그래프에 표시되지만 각자의 y축을 가지고 있어 서로 다른 척도로 측정할 수 있습니다.

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

## 파이플롯 인터페이스

맷플롯립의 파이플롯 인터페이스는 많은 사람들에게 플로팅의 세계로 들어가는 게이트웨이입니다. MATLAB의 플로팅 기능에서 영감을 받아 직관적이고 사용하기 쉽도록 설계되었습니다. 파이플롯을 사용하면 요소에 대한 정교한 제어가 중요하지 않은 빠르고 간단한 플로팅에 적합한 방식으로 도형과 축을 암시적으로 생성할 수 있습니다.

```python
import matplotlib.pyplot as plt
# 간단한 파이플롯 예시
plt.figure()
plt.plot([1, 2, 3, 4], [10, 20, 25, 30])
plt.title('간단한 플롯')
plt.show()
```

이 코드 조각은 최소한의 번거로움으로 기본 선 플롯을 생성합니다. 그러나 플로팅 요구 사항이 더 복잡해지면 파이플롯 인터페이스의 제약을 느낄 수 있습니다.

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

## 객체 지향 접근 방식

객체 지향(OO) 접근 방식을 소개합니다. 이 방법론은 우리에게 자유를 주며, 플롯의 세부적인 사용자 정의가 가능합니다. Pyplot의 상태 지향에 의존하는 대신, figure 및 axes 객체와 직접 작업합니다. 이는 여러 개의 플롯을 다루거나 플롯 요소를 정확하게 제어해야 할 때 특히 유리합니다.

```js
import matplotlib.pyplot as plt
# 객체 지향 예시
fig, ax = plt.subplots()
ax.plot([1, 2, 3, 4], [10, 20, 25, 30])
ax.set_title('OO 접근 방식 플롯')
plt.show()
```

이 코드 조각에서 우리는 명시적으로 figure와 axes 객체를 생성하여 플롯의 모든 측면을 조정할 수 있습니다.

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

## 왜 Pyplot보다 객체 지향을 선택해야 하는가?

OO 접근 방식은 프로젝트가 더 높은 수준의 정교함을 요구할 때 빛을 발합니다. 예를 들어, 서로 다른 동물들의 식이 요구사항을 시각화해야 하는 동물원 프로젝트에서는 OO 접근 방식을 통해 하위그림을 생성하고 범례를 사용자 정의하며 주석을 쉽게 추가할 수 있습니다.

또한 OO 접근 방식은 확장 가능합니다. 프로젝트가 성장함에 따라 시각화를 유지하고 업데이트하는 것이 더 관리하기 쉬워집니다. 우리는 플롯을 포함한 함수를 만들 수 있고, GUI 애플리케이션에 플롯을 삽입할 수 있으며 등등 많은 기능들을 추가할 수 있습니다.

## Matplotlib의 API: 중추부분

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

Matplotlib의 API는 시각화를 만들기 위한 유연한 접근 방식을 제공하는 클래스의 집합입니다. 객체 지향적이기 때문에 플롯을 마치 작업실의 물리적 객체처럼 거의 그대로 조작할 수 있습니다. 우리는 조정하고 세밀하게 다듬을 수 있어서, 정보를 전달하는 데 그치지 않고 매력적인 시각화를 만들 수 있습니다.

API는 방대하지만, 핵심은 Figure와 Axes 클래스입니다.

가상의 동물원 프로젝트에서 Matplotlib의 API를 적용해 보겠습니다. 다양한 동물들의 일주일 동안의 급식 일정을 시각화해야 한다고 상상해 보세요. 이 작업은 다수의 데이터 시리즈를 처리하고 한눈에 통찰을 제공할 수 있는 세심한 접근이 필요합니다.

Matplotlib의 API로 무대를 설정해 봅시다.

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

우리는 우선적으로 필요한 모듈을 가져와서 데이터를 설정합니다. 동물들의 목록과 일주일 동안의 식량 소비량을 나타내는 배열이 있을 것입니다.

```js
import matplotlib.pyplot as plt
import numpy as np
animals = ['사자', '코끼리', '기린', '원숭이']
consumption = np.array([
    [30, 35, 28, 40, 42, 37, 35],  # 사자
    [50, 55, 52, 58, 56, 60, 59],  # 코끼리
    [20, 22, 25, 23, 26, 24, 22],  # 기린
    [10, 15, 12, 17, 16, 14, 13]   # 원숭이
])
```

시각화 만들기

데이터가 준비되었으면, subplots 함수를 사용하여 Figure 및 여러 Axes를 만듭니다. 각 Axes는 일주일의 하루를 나타내며, 각 동물의 식량 소비량을 플롯합니다.

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


fig, axs = plt.subplots(1, 7, figsize=(20, 5), sharey=True)
days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
colors = ['red', 'green', 'blue', 'orange']
for i, ax in enumerate(axs):
    for j, animal in enumerate(animals):
        ax.bar(animal, consumption[j][i], color=colors[j])
    ax.set_title(days[i])
fig.suptitle('Zoo Animal Feeding Schedule')
plt.show()


위 코드 블록에서는 매일의 동물별 소비량을 보여주는 막대 차트를 작성했습니다. 공유 y축을 통해 플롯 간 일관성을 유지하고 색상을 사용하여 동물을 구분합니다.

마무리

시각화를 눈에 띄게 만들기 위해 레이블, 범례, 그리고 디자인을 미세조정합니다. Matplotlib의 API를 사용하여 이 작업을 수행할 수 있습니다.


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
# y 축 레이블 추가
fig.text(0.04, 0.5, '음식 소비량 (kg)', va='center', rotation='vertical')
# 범례 추가
fig.legend(animals, loc='upper right')
# 가독성을 위한 레이아웃 조정
plt.tight_layout(rect=[0.03, 0.03, 1, 0.95])
# 최종 플롯 표시
plt.show()
```

출력

<img src="/TIL/assets/img/2024-07-13-DataVisualizationwithMatplotlib_4.png" />

더 많은 기사: Seaborn으로 데이터 시각화