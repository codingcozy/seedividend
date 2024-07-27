---
title: "포켓몬은 몇 마리나 들어갈까요"
description: ""
coverImage: "/assets/img/2024-06-19-HowManyPokmonFit_0.png"
date: 2024-06-19 23:30
ogImage: 
  url: /assets/img/2024-06-19-HowManyPokmonFit_0.png
tag: Tech
originalTitle: "How Many Pokémon Fit?"
link: "https://medium.com/towards-data-science/how-many-pok%C3%A9mon-fit-84f812c0387e"
---


<img src="/assets/img/2024-06-19-HowManyPokmonFit_0.png" />

이 게시물에서는 PuLP 라이브러리를 사용하여 Python에서 최적화 문제를 모델링하고 해결하는 방법을 보여드리고 포켓몬 데이터를 활용하여 프로세스를 설명하겠습니다. Python에서 최적화 문제를 해결하는 방법에 대해 더 배우고 싶으시거나 포켓몬을 좋아하시는 분이면, 이 튜토리얼을 통해 쉽게 이해할 수 있는 단계를 안내받을 수 있습니다.

그럼 출발해봅시다! 🚀

# 포켓몬 역사를 조금 알아보기

<div class="content-ad"></div>

오리지널 포켓몬의 제1세대는 1996년에 일본에서 발매된 포켓몬 레드와 그린 게임에 소개된 151마리의 포켓몬으로 구성되어 있어요. 이후 여러 세대와 버전의 포켓몬이 추가로 출시되어 1,000여 마리가 넘는 포켓몬이 생성되었는데, 전자 게임, 애니메이션, 트레이딩 카드, 상품 등에서 포켓몬은 문화적 상징으로 자리매김했습니다. 그럼에도 불구하고, 이 튜토리얼에서는 제1세대의 원래 151마리 포켓몬 데이터만 사용할 거에요.

원래의 포켓몬 게임에서는 두 가지 주요 목표가 있습니다 — 포켓몬 챔피언이 되는 것과 전국도감을 완성하는 것입니다. 포켓몬 챔피언이 되기 위해서는 여덟 개의 체육관 리더를 이기고 해당하는 여덟 개의 체육관 뱃지를 획득해야 합니다. 그런 다음 엘리트 포와 현재의 포켓몬 챔피언을 물리칠 때 될 수 있는 포켓몬 챔피언이 될 수 있어요! 전국도감을 완성하기 위해서는 야생에서 잡거나 전투에서 얻거나 교환하여 151마리의 포켓몬을 모두 포함해야 해요.

게임의 주요 제한 사항 중 하나는 결투 중에 활성 팀에 포켓몬을 최대 6마리 밖에 가지고 다닐 수 없다는 것이에요. 그렇다면, 만약 151마리 포켓몬을 모두 잡았다면, 어떤 6마리의 포켓몬을 팀에 포함해야 할지 고를 때 관련 질문이 생기죠. 어떤 6마리의 포켓몬을 선택할지 결정하려면, 먼저 각 포켓몬의 전투에서의 효과를 평가하기 위해 측정 지표(즉, 목표 함수)를 선택해야 합니다. 그런 다음 목표는 정의된 목표 함수를 최대화하는 포켓몬 팀을 선택하는 것이 되겠죠.

각 포켓몬은 게임 플레이 메카닉을 형성하는 여러 독특한 특성을 가지고 있어요. 게임을 즐기고 다양한 환경에서 포켓몬 결투의 승자를 결정하도록 도와주죠. 각 포켓몬에는 HP(체력), 공격력, 방어력, 특수공격력, 특수방어력, 스피드와 같은 6가지 기본 통계가 있어요. 기본 통계 외에도 화재, 물, 전기 등 포켓몬 타입, 포켓몬 기술, 현재 포켓몬 레벨 등과 같은 다양한 특성이 포켓몬의 효과성에 기여합니다. 그래도, 포켓몬 커뮤니티에서 효과성을 평가하는 인기 지표는 포켓몬의 총 기본 통계(BST)입니다. BST는 포켓몬의 기본 통계의 총합이라고 생각하시면 됩니다!

<div class="content-ad"></div>

만약 우리가 선택해야 할 포켓몬이 6마리뿐이라는 단 하나의 제약 조건만 있다면, 문제는 비교적 쉽고 명백한 해결책을 갖게 됩니다. 즉, 각 후보 포켓몬의 BST를 계산하고, 그 중에서 가장 효과적인 상위 6마리의 포켓몬을 우리 팀에 포함시키는 것입니다.

본 게시물에서 최적화 문제의 좀 더 세밀한 버전을 탐색하기 위해 추가적인 제약 조건을 가정할 것입니다. 구체적으로, 선택한 포켓몬들의 총 무게에 제한이 있다고 가정할 것입니다. 즉, 선택한 포켓몬들의 총 무게는 1,000kg 이하이어야 합니다. 이 추가적인 제약 조건은 우리에게 포켓몬 데이터를 사용한 가상의 난쟁이 문제(knapsack problem)를 구성할 수 있게 해줍니다.

# 난쟁이 문제에 대해 어떻게 생각하시나요?

난쟁이 문제는 다음과 같이 표현될 수 있는 고전적인 결합 최적화 문제입니다:

<div class="content-ad"></div>

다시 말해, 낙석 문제에서는 특정 가치와 크기를 가진 항목 집합을 일정 크기의 낙석가방에 담아야 합니다. 문제는 총 항목 중에서 낙석가방에 맞게 최대 총 가치를 얻을 수 있는 부분집합을 찾는 것입니다.

가장 흔한 낙석 문제의 경우는 0/1 낙석 문제인데, 각 항목에 대해 하나의 인스턴스만 있는 문제입니다. 다시 말해, 0/1 낙석 문제에서 각 항목은 고유하며 낙석가방에 포함시킬지 여부를 한 번 선택하거나 아예 선택하지 않습니다. 유사하게, 포켓몬 문제에서는 151가지의 고유한 포켓몬이 있으며, 각각의 포켓몬은 우리의 활약팀에 한 번 포함되거나 전혀 포함되지 않을 것입니다.

![포켓몬이 맞게 들어가는지 확인할 수 없습니다.](/assets/img/2024-06-19-HowManyPokmonFit_1.png)

0/1 낙석 문제는 바이너리 정수 프로그래밍(BIP) 문제로서 이렇게 정식으로 정의할 수 있습니다, 좀 멋있게 말하면:

<div class="content-ad"></div>

특히:

- υi는 항목 i의 가치입니다.
- wi는 항목 i의 무게입니다.
- W는 배낭의 총 무게 수용량이며,
- i는 항목 i가 배낭에 포함되는지 여부를 나타내는 결정 변수로, 각각 1 또는 0입니다.

배낭 문제의 다른 변형들도 있습니다. 예를 들어, 제한된 배낭 문제(각 항목을 주어진 숫자까지 여러 번 선택할 수 있는 문제)와 무제한 배낭 문제(각 항목을 원하는 만큼 여러 번 선택할 수 있는 문제)가 있습니다.

배낭 문제는 NP-어려운 문제로 알려져 있지만, 작은 경우에는 정확한 알고리즘을 사용하여 효율적으로 해결할 수 있습니다. 따라서, 이 게시물에서는 PuLP Python 라이브러리를 사용하여 PokeAPI 데이터를 활용하여 0/1 배낭 문제를 모델링하고 해결합니다.

<div class="content-ad"></div>

# 모두 잡기!

저는 Jupyter Lab 노트북을 사용하여 PokeAPI 데이터를 가져오고, PuLP로 최적화 문제를 모델링하고 해결하며, 데이터의 간단한 Plotly 시각화를 만들 것입니다.

## PokéAPI에서 데이터 가져오기

분석에 필요한 다양한 포켓몬 특성을 획득하기 위해 PokeAPI에서 제공하는 데이터를 사용할 것입니다. 더 구체적으로, requests 라이브러리를 이용하여 Python에서 PokeAPI에 접근할 수 있습니다. 'limit = 151'을 설정하여 PokeAPI에서 1세대의 처음 151마리 포켓몬과 그 URL을 쉽게 얻을 수 있습니다.

<div class="content-ad"></div>

```js
import requests

url = "https://pokeapi.co/api/v2/pokemon?limit=151"
response = requests.get(url)
data = response.json()
pokemon_urls = [pokemon['url'] for pokemon in data['results']]
```

그런 다음 URL을 반복하면서 각 항목에 대해 API를 호출하여 151마리의 포켓몬의 속성도 가져올 수 있습니다. 각 포켓몬에 대해 BST 계산에 필요한 기본 통계 및 포켓몬 유형을 가져오겠습니다. pokemon_data라는 딕셔너리에 각각의 151마리 포켓몬 이름과 해당 속성을 저장합니다.

```js
counter = 0
pokemon_data = []
for url in pokemon_urls:
    response = requests.get(url)
    pokemon = response.json()
    base_stats = {stat['stat']['name']: stat['base_stat'] for stat in pokemon['stats']}
    pokemon_data.append({
        'name': pokemon['name'],
        'weight': pokemon['weight'],
        'hp': base_stats.get('hp', 0),
        'attack': base_stats.get('attack', 0),
        'defense': base_stats.get('defense', 0),
        'special_attack': base_stats.get('special-attack', 0),
        'special_defense': base_stats.get('special-defense', 0),
        'speed': base_stats.get('speed', 0),
        'type': [t['type']['name'] for t in pokemon['types']],
    })
    counter += 1
```

데이터프레임 형식으로 데이터셋을 살펴볼 수도 있습니다:

<div class="content-ad"></div>

```python
import pandas as pd 
df = pd.DataFrame(pokemon_data)
df
```

![Pokemon Image](/assets/img/2024-06-19-HowManyPokmonFit_2.png)

그리고 이제 PuLP로 배낭 문제를 모델링할 준비가 되었습니다!

## PuLP을 사용하여 문제 모델링하기

<div class="content-ad"></div>

최적화 문제를 구조화하는 매우 첫 번째 단계는 결정 변수를 정의하는 것입니다. 우리의 경우, 우리가 결정하려고 하는 것은 어떤 포켓몬을 팀에 포함할 것인지입니다. 다시 말해, 151마리의 포켓몬 각각에 대해 그 포켓몬을 팀에 포함할지(따라서 이 포켓몬에 대한 결정 변수는 1이 될 것) 아닐지를 결정하려고 합니다(따라서 결정 변수는 0이 될 것). 결과적으로, 이 문제의 결정 변수는 이 문제에서 포켓몬이 우리 팀에 포함되어 있는지 여부를 나타내는 이진 결정 변수 x입니다.

결정 변수 x를 정의한 후, 우리는 문제의 목적 함수도 정할 수 있습니다. 즉, 우리가 최적화하려는 대상은 무엇인가요. 여기서 우리는 포켓몬 팀의 총 BST를 최적화하려고 하며, 더 구체적으로 그 값을 최대화하려고 합니다. 따라서, 문제의 목적 함수는 다음과 같이 표현할 수 있습니다:

![식](/assets/img/2024-06-19-HowManyPokmonFit_3.png)

마지막으로, 우리는 문제의 제약 조건도 정해야 합니다. 이는:

<div class="content-ad"></div>

- 결정 변수 x는 바이너리(0 또는 1)여야 합니다.
- 우리의 포켓몬 팀의 총 무게는 1,000kg 이하이어야 합니다.
- 선택된 포켓몬의 총 수는 정확히 6마리여야 합니다.

![이미지](/assets/img/2024-06-19-HowManyPokmonFit_4.png)

파이썬으로 이를 작성하려면, 우선 PuLP 라이브러리를 가져와 최적화 문제의 인스턴스를 초기화합니다.

```python
import pulp

prob = pulp.LpProblem("포켓몬 팀 최적화", pulp.LpMaximize)
```

<div class="content-ad"></div>

그런 다음, 결정 변수를 정의합니다. 여기에는 바이너리 변수 제약 조건이 직접 통합됩니다.

```js
x = pulp.LpVariable.dicts("x", range(len(pokemon_data)), cat='Binary')
```

그리고 목적 함수는 다음과 같습니다.

```js
prob += pulp.lpSum(
    (pokemon['hp'] + pokemon['attack'] + pokemon['defense'] + pokemon['special_attack'] + pokemon['special_defense'] + 
     pokemon['speed']) * x[i] for i, pokemon in enumerate(pokemon_data)
), "Total Combat Effectiveness"
```

<div class="content-ad"></div>

…그리고 문제 제약 사항입니다.

```js
# 총 무게 제약 사항
max_weight_capacity = 1000
prob += pulp.lpSum(pokemon['weight'] * x[i] for i, pokemon in enumerate(pokemon_data)) <= max_weight_capacity, "무게 한도"

# 포켓몬 총 수 제약 사항
prob += pulp.lpSum(x[i] for i in range(len(pokemon_data))) == 6, "팀 크기"
```

이렇게 하면 파이썬에서 최적화 문제의 모델을 완전히 정의하였으며, 이제 해결할 준비가 되었습니다.

## 포켓몬 드림 팀

<div class="content-ad"></div>

아래와 같이 Markdown 형식으로 변경할 수 있습니다:


The defined problem can be solved simply by:

```js
prob.solve()
```

… which returns ‘1’, meaning that the status of our problem is ‘LpStatusOptimal’, meaning the problem has an optimal solution. prob.solve() may also return other outputs, as for instance ‘-1’ (LpStatusInfeasible), meaning that there is no feasible solution for the problem given the constraints, or ‘-2’ (LpStatusUnbounded), indicating that the solution is unbounded.

In any case, given that our problem has an optimal solution, we can display it by:


<div class="content-ad"></div>

```js
선택된_포켓몬 = [포켓몬_데이터[i]['이름'] for i in range(len(포켓몬_데이터)) if pulp.value(x[i]) == 1]
print("선택된 포켓몬:", 선택된_포켓몬)
```

![이미지](/assets/img/2024-06-19-HowManyPokmonFit_5.png)

그리고 ✨보세요✨

우리의 포켓몬 드림 팀을 얻었어요!

<div class="content-ad"></div>

문제의 제약 조건(허용 중량 및/또는 포켓몬 수 변경, 포켓몬 유형 추가 등), 다른 목적 함수 정의 또는 기본 통계 중 하나에 대한 다른 계수 할당으로 인해 서로 다른 팀을 얻을 수 있다고 하는 것 같아요.

이 문제의 맥락에서는 포켓몬의 BST가 포켓몬의 무게와 어떻게 관련되는지 확인하는 것도 흥미롭고, 전체 151마리 포켓몬 중에서 선택 가능한 포켓몬 팀의 시각적 표현도 가질 수 있어요. Plotly 산점도 차트로 이를 할 수 있어요:

```js
# 모든 포켓몬의 BST 계산
for pokemon in pokemon_data:
    pokemon['BST'] = (pokemon['hp'] + pokemon['attack'] + pokemon['defense'] +
                                             pokemon['special_attack'] + pokemon['special_defense'] + 
                                             pokemon['speed'])
    
all_pokemon_df = pd.DataFrame(pokemon_data)
selected_df = pd.DataFrame(selected_pokemon_data)

# 산점도 생성
fig = go.Figure()

# 모든 포켓몬 추가
fig.add_trace(go.Scatter(
    x=all_pokemon_df['weight'],
    y=all_pokemon_df['BST'],
    mode='markers',
    name='모든 포켓몬',
    marker=dict(size=10, color='blue', opacity=0.6),
    text=all_pokemon_df['name']
))

# 선택된 포켓몬 추가
fig.add_trace(go.Scatter(
    x=selected_df['weight'],
    y=selected_df['total_combat_effectiveness'],
    mode='markers',
    name='선택된 포켓몬',
    marker=dict(size=12, color='red', opacity=0.9),
    text=selected_df['name']
))

# 제목 및 레이블, 크기 조정
fig.update_layout(
    title="포켓몬 선택 최적화",
    xaxis_title="무게 (kg)",
    yaxis_title="BST",
    legend_title="범례",
    width=1000, 
    height=600,
    showlegend=True
)

# 플롯 표시
fig.show()
```

# 제 생각

<div class="content-ad"></div>

포켓몬 챔피언십을 위해 팀을 구성하는 것 외에도 배낭 문제는 여러 다양한 분야에서 실제 결정 과정에서 발생합니다. 이러한 실제 상황에는 예산 할당, 화물/트럭 적재, 투자 포트폴리오 최적화, 의약품 제조 또는 식단 계획 등이 포함됩니다. 이러한 문제를 프로그래밍적으로 인식, 모델링 및 해결하는 것은 어떤 조직에게도 중요한 통찰력을 제공할 수 있습니다. PuLP는 파이썬 환경에서 효율적으로 최적화 문제를 모델링하고 해결할 수 있는 강력한 라이브러리이며, 이는 파이썬의 다재다능성을 완전하게 보여줍니다.

# 출처

데이터는 포켓몬 API에서 수집되었습니다. © 2013–2023 Paul Hallett 및 포켓몬 API 기여자에 의해 제공되며, 3-Clause BSD 라이선스 하에 공개되었습니다. 전체 라이선스 세부 정보는 포켓몬 API GitHub 페이지를 방문해 주세요.

✨읽어 주셔서 감사합니다!✨

<div class="content-ad"></div>

이 게시물을 즐겼나요? 친구가 되어요!

💌 제 Medium 또는 LinkedIn에 함께해요!

💼 Upwork에서 저와 함께 일해요!