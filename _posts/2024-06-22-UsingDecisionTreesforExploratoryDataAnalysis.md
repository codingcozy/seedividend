---
title: "결정 트리Decision Trees를 사용한 탐색적 데이터 분석 방법"
description: ""
coverImage: "/assets/img/2024-06-22-UsingDecisionTreesforExploratoryDataAnalysis_0.png"
date: 2024-06-22 02:31
ogImage:
  url: /assets/img/2024-06-22-UsingDecisionTreesforExploratoryDataAnalysis_0.png
tag: Tech
originalTitle: "Using Decision Trees for Exploratory Data Analysis"
link: "https://medium.com/towards-data-science/using-decision-trees-for-exploratory-data-analysis-1d03558930d3"
isUpdated: true
---

![Decision Tree](/assets/img/2024-06-22-UsingDecisionTreesforExploratoryDataAnalysis_0.png)

# 소개

의사 결정 트리(DT)는 가장 직관적인 머신러닝 알고리즘입니다.

내 의견이죠. 하지만 데이터 과학 분야에서도 흔히 느껴지는 감정이라고 확신합니다.

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

운영 연구와 데이터 과학 분야에서 매우 활용되는 DT(의사 결정 트리)의 성공 요인은 인간의 의사 결정 과정과 유사한 프로세스를 따라가기 때문입니다. 이 과정은 각 노드가 주어진 변수에 대해 간단한 이진 결정을 갖는 플로 차트에 기반하며, 최종 결정에 이르기까지 계속됩니다.

간단한 예를 들어, 티셔츠 구매. 저는 셔츠를 사려고 할 때 가격, 브랜드, 사이즈, 색상과 같은 몇 가지 변수를 고려할 수 있습니다. 따라서 저는 결정 프로세스를 예산에서 시작합니다:

- 가격이 $30 이상이면 구매하지 않을 것입니다. 그렇지 않은 경우에는 구매할 것입니다.
- $30 미만으로 무언가를 찾으면 좋아하는 브랜드의 제품이어야 합니다. 그렇다면 결정 과정을 계속합니다.
- 이제, 제 사이즈에 맞는지 확인해보죠. 맞다면 계속 진행합니다.
- 마지막으로, $30 미만, 브랜드 X, 사이즈 S인 검은색 티셔츠라면 구매할 것이고, 그렇지 않다면 계속 찾거나 "구매하지 않을 것"으로 결정 프로세스를 마칠 수 있습니다.

![의사 결정 트리 샘플](/assets/img/2024-06-22-UsingDecisionTreesforExploratoryDataAnalysis_1.png)

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

이 프로세스는 매우 논리적이고 간단하여 모든 종류의 데이터에 적용할 수 있습니다. 이 알고리즘의 단점은 데이터 세트의 변화에 매우 민감하여 특히 데이터가 작을 때 민감하다는 것입니다. 따라서 데이터의 작은 변동성을 쉽게 학습하여 기계 학습 모델을 과적합시킬 수 있습니다.

이러한 결정 트리(DT)의 이러한 특성은 예측에 위협이 될 수 있지만 탐색적 데이터 분석 과정 중에 이를 활용하고자 하는 것입니다.

이 게시물에서는 데이터에서 더 나은 통찰력을 추출하기 위해 DT의 힘을 어떻게 활용하는지 배워보겠습니다. 계속 진행합시다.

# EDA란 무엇인가요?

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

탐색적 데이터 분석 또는 EDA는 데이터 과학 프로젝트의 단계 중 하나로, 데이터 세트를 가져와 변수를 탐색하여 대상 변수에 가장 큰 영향을 미치는 요소를 최대한 파악하려는 과정입니다.

이 단계에서 데이터 과학자는 데이터를 이해하고 분포가 어떤지, 오류나 누락된 데이터가 있는지, 데이터의 첫 인사이트를 추출하고 설명 변수가 대상 변수에 어떻게 영향을 미치는지 시각화하여 학습하고자 합니다.

# 결정 트리 사용하기

DT가 데이터의 가장 작은 변동을 포착할 수 있는 능력 때문에, 변수 간 관계를 이해하는 데 도움이 됩니다. 여기서는 데이터를 탐색 중이므로 데이터 분할이나 알고리즘 세밀 조정에 대해 신중할 필요가 없습니다. 우리는 그저 최상의 통찰을 얻기 위해 DT를 실행하기만 하면 됩니다.

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

그것을 어떻게 하는지 봅시다.

## 데이터셋

이 연습에 사용될 데이터셋은 Paulo Cortez가 작성한 UCI Repository의 학생 성적 데이터입니다. 이 데이터셋은 크리에이티브 커먼즈 저작자표시 4.0 국제 라이선스(CC BY 4.0) 하에 배포됩니다.

```python
# 라이브러리 불러오기
import pandas as pd
import seaborn as sns
sns.set_style()
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.tree import plot_tree

# 데이터셋 불러오기
from ucimlrepo import fetch_ucirepo

# 데이터셋 가져오기
student_performance = fetch_ucirepo(id=320)

# 데이터 (판다스 데이터프레임 형식)
X = student_performance.data.features
y = student_performance.data.targets

# 시각화를 위해 X와 Y 모으기
df = pd.concat([X,y], axis=1)

df.head(3)
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

![image](/assets/img/2024-06-22-UsingDecisionTreesforExploratoryDataAnalysis_2.png)

이 데이터에서 어떤 변수가 최종 성적 G3에 더 큰 영향을 미치는지 결정하려고 합니다.

## 회귀 DT로 탐색하기

이제 실패, 결석 및 공부 시간이 G3에 미치는 영향을 확인하기 위해 DT를 생성해보겠습니다.

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
# 탐색할 컬럼
cols = ['failures', 'absences', 'studytime']

# X & Y 분리
X = df[cols]
y = df.G3

# 의사결정트리 학습
dt = DecisionTreeRegressor().fit(X, y)

# 의사결정트리 그리기
plt.figure(figsize=(20,10))
plot_tree(dt, filled=True, feature_names=X.columns, max_depth=3, fontsize=8);
```

이것이 생성된 의사결정트리입니다.

<img src="/assets/img/2024-06-22-UsingDecisionTreesforExploratoryDataAnalysis_3.png" />

이제 우리는 나열한 변수들 간의 관계를 이해하기 위한 좋은 시각화가 있습니다. 이 트리에서 얻을 수 있는 인사이트는 다음과 같습니다:

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

- 각 상자 안의 첫 번째 줄의 조건에 따라 왼쪽이 "예"를, 오른쪽이 "아니오"를 의미한다는 것을 알고 계셔야 합니다.
- 실패 횟수가 적은 학생들(0.5 또는 0이라고 말해야 할 정도)이 더 높은 성적을 받습니다. 왼쪽 상자의 값이 오른쪽보다 높은 것을 관찰할 수 있습니다.
- 실패한 학생들 중 공부 시간이 2.5 미만인 학생들이 더 높은 성적을 받습니다. 값이 거의 1점 더 높습니다.
- 실패 횟수와 공부 시간이 1.5 미만, 그리고 결석이 22회 미만인 학생들은 공부 시간이 적고 결석률이 높은 학생들보다 더 높은 최종 성적을 받습니다.

## 여유 시간과 외출

여가 시간의 양과 외출 빈도에 기반하여 더 높은 성적을 받는 학생들을 알아보고 싶다면 여기에 있는 코드입니다.

```js
# 탐색할 열
cols = ['여가시간', '외출']

# X와 Y 분리
X = df[cols]
y = df.G3

# 의사결정 트리 피팅
dt = DecisionTreeRegressor().fit(X,y)

# DT 플롯
plt.figure(figsize=(20,10))
plot_tree(dt, filled=True, feature_names=X.columns, max_depth=3, fontsize=10);
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

![Decision Trees for Exploratory Data Analysis](/assets/img/2024-06-22-UsingDecisionTreesforExploratoryDataAnalysis_4.png)

goout와 freetime 변수는 1= 매우 낮음부터 5= 매우 높음까지의 척도로 조정되어 있습니다. 자주 외출하지 않는 사람들(1.5)과 여가 시간이 없는 사람들(1.5)은 많이 외출하고 어느 정도 여가 시간이 있는 사람들과 마찬가지로 낮은 성적을 받을 수 있음을 주목해주세요. 가장 높은 성적을 받는 사람들은 외출과 여가 시간이 균형을 이루고 있습니다(외출 1.5, 여가 시간 1.5에서 2.5 사이).

## Classification DT로 탐색하기

동일한 연습을 Classification Tree 알고리즘을 사용해 할 수 있습니다. 논리와 코딩은 동일하지만, 결과 값은 이제 값이 아닌 예측된 클래스를 보여줍니다. Seaborn 패키지(3-Clause BSD License)에서 가져온 뉴욕 시티의 택시 운행 데이터셋을 사용한 간단한 예제를 살펴봅시다.

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

만약 우리가 런 총액과 결제 방법 간의 관계를 탐구하고 싶다면, 다음 코드를 확인해보세요.

```js
# 데이터셋 로드
df = sns.load_dataset('taxis').dropna()

# 탐색할 열
cols = ['total']

# X & Y 분리
X = df[cols]
y = df['payment']

# 의사결정 트리 적합
dt = DecisionTreeClassifier().fit(X,y)

# 트리 시각화
plt.figure(figsize=(21,10))
plot_tree(dt, filled=True, feature_names=X.columns, max_depth=3,
          fontsize=10, class_names=['cash', 'credit_card']);
```

<img src="/assets/img/2024-06-22-UsingDecisionTreesforExploratoryDataAnalysis_5.png" />

결과 트리를 눈으로 확인해본 결과, 총액이 낮은 경우 현금으로 결제하는 가능성이 훨씬 높다는 것을 알 수 있습니다. $9.32 미만의 총액은 일반적으로 현금으로 결제됩니다.

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

좋죠, 그렇죠?

# 이제 가기 전에

이 튜토리얼에서는 데이터셋 내 변수들 간의 관계를 탐색하는 빠른 방법인 결정 트리를 사용하는 방법에 대해 배웠습니다.

이 알고리즘은 처음에 쉽게 찾아지지 않는 패턴을 빠르게 포착할 수 있습니다. 우리는 데이터의 그 절삭을 찾기 위해 결정 트리의 힘을 활용하여 거기서 훌륭한 통찰을 얻을 수 있습니다.

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

빠른 코드에 대한 노트하나: plot_tree() 함수에서 max_depth 기능을 사용하여 원하는 수준을 설정할 수 있습니다. 또한 sklearn의 DT 인스턴스에서 해당 하이퍼파라미터를 설정할 수도 있습니다. 선택은 당신의 몫입니다. plot_tree에서 사용하는 장점은 모델을 다시 훈련시킬 필요 없이 다양한 깊이를 빠르게 테스트할 수 있다는 것입니다.

```js
plot_tree(dt, (filled = True), (feature_names = X.columns), (max_depth = 3));
```

만약 이 내용을 좋아하신다면, 더 많은 내용을 위해 저를 팔로우해주세요.

LinkedIn에서 저를 찾아서 연결해요. 함께해요!

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

# 참고 자료

제가 소개하고 싶은 좋은 참고 자료가 있어요. 이 기술은 멋진 브라질 데이터 과학자 Teo Calvo로부터 배웠어요. 그는 Teo Me Why 채널에서 매일 생방송으로 멋진 프로그램을 제공하고 계세요. 포르투갈어를 구사하신다면, 그의 작품에 대해 더 알아보세요.
