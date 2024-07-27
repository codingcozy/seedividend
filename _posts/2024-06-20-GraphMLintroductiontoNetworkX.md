---
title: "그래프 ML NetworkX 소개"
description: ""
coverImage: "/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_0.png"
date: 2024-06-20 04:49
ogImage: 
  url: /assets/img/2024-06-20-GraphMLintroductiontoNetworkX_0.png
tag: Tech
originalTitle: "Graph ML: introduction to NetworkX"
link: "https://medium.com/ai-advances/graph-ml-introduction-to-networkx-73e29a9bf40a"
---


## | GRAPH| GRAPH ML| NETWORKX| PYTHON|

![NetworkX](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_0.png)

NetworkX는 Python에서 그래프를 분석, 시각화 및 표현하는 주요 라이브러리입니다. NetworkX에는 많은 함수 모음이 포함되어 있으며, 본 튜토리얼에서는 Python에서 그래프를 시작하고 조작하는 기본 기능을 소개하겠습니다. 다음 튜토리얼에서는 더 복잡한 기능 및 그래프를 더 잘 시각화하는 방법을 살펴볼 예정이지만, 일단은 기초부터 단계별로 시작하는 것이 좋습니다.

이 글에서는 다음을 논의할 것입니다:

<div class="content-ad"></div>

- NetworkX를 사용하여 그래프를 다루는 방법
- 다양한 유형의 그래프 생성 방법
- 그래프를 그리는 방법

이 자습서의 코드는 Google Colab에서 작성되었으며 테스트되었으며 컴퓨터에 별도로 설치할 필요없이 어떤 Colab 노트북에서도 실행할 수 있습니다.

# NetworkX 소개

NetworkX에서 그래프는 일반적으로 객체(클래스)이며 이러한 객체에 적용할 수 있는 다양한 메서드와 함수가 있습니다. 또한 NetworkX는 그래프 데이터 세트를 읽고 객체를 저장하며 다양한 형식으로 저장하는 기능을 제공합니다. 라이브러리는 일부 고전적인 데이터 세트도 제공하여 사용하여 놀 수 있습니다(예: 카라테 클럽 데이터 세트).

<div class="content-ad"></div>

또한 NetworkX를 설치하고 사용하는 것이 실제로 쉽다는 것을 알 수 있을 것입니다 (Python의 기본 지식이 필요합니다). NetworkX는 확장성과 이식성으로 유명하며 이러한 이유로 Python에서 그래프를 처리하는 데 가장 많이 사용되는 라이브러리입니다. 이는 NetworkX와 호환되는 다른 데이터 과학자가 작성한 확장 프로그램의 생생한 생태계를 만들어냈습니다 (또는 NetworkX 그래프의 기반으로 사용됩니다).

![그림](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_1.png)

어떻게 시작할까요?

첫 번째 단계는 라이브러리를 가져오는 것입니다 (이미 설치했다고 가정하거나 Colab을 사용 중이면 이미 설치되어 있을 것입니다).

<div class="content-ad"></div>

```js
import networkx as nx
import matplotlib.pyplot as plt
```

그리고 이제는 어떻게 해야 할까요? 이전 튜토리얼에서 말했듯이 그래프는 단순히 객체(노드 또는 정점)들이 엣지를 통해 연결된 모음일 뿐입니다. 그래프는 이러한 노드들 사이의 관계를 나타내며, 이를 어떻게 표현할지 결정해야 합니다. 우리는 그래프가 직접적인 연결을 가지고 있는지, 또는 링크의 방향을 신경 쓰지 않는지를 결정해야 합니다.

예를 들어, 한 그룹 내에서 다른 사람들 간의 우정 관계를 표현하고 싶다고 가정해 봅시다. 이 경우 A가 B의 친구라면 B가 A의 친구라고 가정할 수 있으며 따라서 관계를 표시할 필요가 없습니다. 만약 A에서 B로 소포가 이동하는 운송 그래프를 표현하고 있다면, 방향성 있는 그래프를 사용하는 것이 좋습니다.

Networkx에서 방향성 있는 그래프나 무방향 그래프를 구축하는 것은 매우 쉽습니다:

<div class="content-ad"></div>


# 무방향 그래프 G 생성
G = nx.Graph()
print("그래프 G는 방향이 지정되어 있습니다: {}".format(G.is_directed()))

# 유방향 그래프 H 생성
H = nx.DiGraph()
print("그래프 H는 방향이 지정되어 있습니다: {}".format(H.is_directed()))

# 엣지와 노드 수 얻기
G.number_of_nodes(), G.number_of_edges()


![이미지](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_2.png)

그래프를 구축한 후 추가 데이터를 수집하여 그래프를 업데이트해야 할 수 있습니다. NetworkX를 사용하면 노드를 추가하거나 다른 그래프를 직접 추가하기 쉽습니다.


# 노드 추가
G.add_node(1)
G.add_nodes_from([2, 3])
# 다른 그래프에서 추가할 수도 있습니다
H = nx.path_graph(3)
G.add_nodes_from(H)
# 또는 그래프를 직접 추가할 수도 있습니다
G.add_node(H)
G.number_of_nodes(), G.number_of_edges()


<div class="content-ad"></div>


![Graph](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_3.png)

당연히 A가 B와 친구이고 나중에 C와도 친구가 될 수 있으므로, 또 다른 링크를 추가하려고 합니다.

```js
#엣지 추가하기
G.add_edge(1, 2)
e = (2, 3)
G.add_edge(e)
G.add_edges_from([(1, 2), (1, 3)])
G.add_edges_from(H.edges())
```

지금까지 그래프를 요소와 관계의 집합으로 삼았습니다. 노드는 모두 같았고, 관계도 단순한 연결이었습니다. 실제로 이는 축소된 것이며, 노드와 연결은 레이블 또는 기능과 연관될 수 있습니다.


<div class="content-ad"></div>

예를 들어, 소셜 네트워크를 만들 때 각 노드에 이름(label, 예: "Bob")을 부여하거나 클래스("스팸" 또는 "스팸 아님")를 지정할 수 있지만 특성(키, 나이, 관심사)도 부여할 수 있습니다. 앞으로 볼 것처럼 노드의 특성은 다양한 알고리즘에서 사용됩니다.

```js
# 무향 그래프 G를 생성합니다
G = nx.Graph() # 비어 있습니다
# 첫 번째 노드에 노드 레벨 속성 추가
G.add_node(0, feature=3, label=0)

# 노드 0의 속성을 가져옵니다
attr = G.nodes[0]
print("노드 0은 다음과 같은 속성을 가지고 있습니다: {}".format(attr))
```

![image](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_4.png)

이 경우 몇 개의 노드가 있는 그래프가 있지만, 종종 수천 개 또는 수백만 개의 노드가 있는 경우가 많으므로 더 효율적인 시스템이 필요할 수 있습니다. NetworkX를 사용하면 딕셔너리를 사용할 수 있습니다:

<div class="content-ad"></div>

```js
# 여러 노드에 속성을 포함한 노드를 추가할 수 있습니다
G.add_nodes_from([
  (1, {"feature": 1, "label": 1}),
  (2, {"feature": 2, "label": 2})
]) 

# 노드를 순회할 수 있습니다
# 속성을 반환하려면 data=True 인수를 사용합니다
for node in G.nodes(data=True):
  print(node)

# 노드 수를 얻을 수 있습니다
n_nodes = G.number_of_nodes()
print("G에는 {}개의 노드가 있습니다".format(n_nodes))
```

![Graph](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_5.png)

앞서 말했듯이, 관계에는 다양한 특성이 있을 수 있습니다. 가장 흔한 경우는 서로 다른 연결에 값을 (또는 가중치) 연결하는 것입니다. 예를 들어, 교통 네트워크에서 노드는 장소를 나타내고 연결은 도로를 나타낼 수 있으며, 가중치는 거리나 이동 시간을 나타낼 수 있습니다. 이는 노드 A와 B 사이의 최단 경로를 찾고 싶은 경우에 중요한 정보입니다 (나중에 이를 계산하는 알고리즘이 있다는 것을 볼 것입니다).

```js
# 가중치가 0.5인 하나의 엣지를 추가합니다
G.add_edge(0, 1, weight=0.5)

# 엣지 (0, 1)의 속성을 가져옵니다
edge_0_1_attr = G.edges[(0, 1)]
print("(0, 1) 엣지는 다음과 같은 속성을 가지고 있습니다: {}".format(edge_0_1_attr))
```

<div class="content-ad"></div>

당연히 노드 단위로 작업할 필요는 없어요:

```js
# 엣지 가중치를 가진 여러 엣지 추가
G.add_edges_from([
  (1, 2, {"weight": 0.3}),
  (2, 0, {"weight": 0.1})
])

# 모든 엣지들에 루프 적용
# 여기서 data=True가 없으므로 엣지만 반환됩니다
for edge in G.edges():
  print(edge)

# 엣지의 수 구하기
num_edges = G.number_of_edges()
print("G에는 {}개의 엣지가 있습니다".format(num_edges))
```

<img src="/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_7.png" />

<div class="content-ad"></div>

좋아요, 이제 멋진 그래프가 있어요! 그래프를 시각화해 보는 건 어떨까요?

```js
# 그래프 그리기
nx.draw(G, with_labels=True)
```

![Graph](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_8.png)

노드가 몇 개의 이웃을 가지고 있는지 알아내는 것은 종종 중요한 정보입니다. 예를 들어, 우리는 그래프를 플로팅하지 않고도 노드가 연결된 다른 노드 수를 알고 싶어합니다.

<div class="content-ad"></div>

```js
node_id = 1

# 노드 1의 차수
print("노드 {}의 차수는 {}".format(node_id, G.degree[node_id]))

# 노드 1의 이웃 가져오기
for neighbor in G.neighbors(node_id):
  print("노드 {}의 이웃은 {}".format(node_id, neighbor))
```

<img src="/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_9.png" />

# 서로 다른 그래프 유형

이전 튜토리얼에서 우리는 그래프 유형이 다양하다는 것을 알 수 있었고 이러한 정보의 많은 부분이 인접 행렬에 요약되어 있다는 것을 알았습니다. 이제 이러한 그래프를 표현하고 시각화할 수 있는 모든 요소를 갖췄습니다.

<div class="content-ad"></div>

예를 들어, 가장 간단한 경우인 무방향 그래프로 시작해 보겠습니다:

```js
G = nx.Graph()
G.add_nodes_from([
  (1, {"feature": 1, "label": 1}),
  (2, {"feature": 2, "label": 2}),
  (3, {"feature": 2, "label": 3}),
  (4, {"feature": 1, "label": 4})
]) 
G.add_edges_from([(2, 1), (1, 4), (4, 2), (4,3)])
# 그래프 그리기
nx.draw(G, with_labels = True)
A = nx.adjacency_matrix(G)
print(A.todense())
```

<img src="/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_10.png" />

<img src="/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_11.png" />

<div class="content-ad"></div>

다이렉트 그래프는 다양한 응용 분야에서 사용됩니다. 소셜 네트워크(예: A가 B에게 돈을 빌려줌), 전기 회로, 프로젝트 일정, 운송 등등.

화살표는 일반적으로 관계의 방향을 나타내는 데 사용됩니다. 보시다시피 행렬도 다릅니다. 기술적으로 들어오는 간선과 나가는 간선을 나타내기 위해 두 개의 다른 행렬을 가져야합니다. 일반적으로, 우리는 나가는 간선을 나타내는 것을 사용합니다. 예를 들어, 여기서 간선을 시작하는 노드 1이 있고 이를 노드 4에 연결하는 간선이 있다면, 행렬에서 이 연결을 1로 나타냈습니다(위치는 1행 4열).

```python
G = nx.DiGraph()
G.add_nodes_from([
  (1, {"feature": 1, "label": 1}),
  (2, {"feature": 2, "label": 2}),
  (3, {"feature": 2, "label": 3}),
  (4, {"feature": 1, "label": 4})
]) 
G.add_edges_from([(2, 1), (1, 4), (4, 2), (4,3)])
# 그래프 그리기
A = nx.adjacency_matrix(G)
print(A.todense())
nx.draw(G, with_labels = True)
```

<img src="/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_12.png" />

<div class="content-ad"></div>


![그래프](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_13.png)

앞서 언급했듯이 가중 그래프를 사용하는 경우가 있습니다. 예를 들어, 2D 매트릭스 게임, 그래프에 제약 조건을 적용해야 하는 경우 (제품 설계, 회로 설계). 또한 가중 그래프는 우선 순위 흐름을 지정하는 의존성 그래프와 같이 가중할 수도 있습니다.

```js
G = nx.Graph()
G.add_nodes_from([
  (1, {"feature": 1, "label": 1}),
  (2, {"feature": 2, "label": 2}),
  (3, {"feature": 2, "label": 3}),
  (4, {"feature": 1, "label": 4})
]) 
G.add_edges_from([(2, 1, {"weight": 0.5}),
                  (1, 4, {"weight": 4}), 
                  (4, 2, {"weight": 0.5}), 
                  (4,3,  {"weight": 1})])
# 그래프 그리기
# 노드
pos = nx.spring_layout(G, seed=7) 
A = nx.adjacency_matrix(G)
print(A.todense())
nx.draw_networkx_nodes(G, pos, node_size=50)
width = []
for node1, node2, data in G.edges(data=True):
    width.append(data['weight'])
nx.draw_networkx_edges(G, pos,  width =width)
```

![그래프](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_14.png)


<div class="content-ad"></div>


![image](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_15.png)

지금까지 우리는 자체 루프(노드가 자기 자신과 연결될 때)가 없다고 결론 지었습니다. 그러나 화학, 유전학, 게임, 대기 이론 등에서 유용한 경우도 있습니다. 이전에 대각선에 1이 없었는데 이제 있습니다(노드가 실제로 자기 자신과 연결되어 있음을 볼 수 있습니다).

```js
G = nx.Graph()
G.add_nodes_from([
  (1, {"feature": 1, "label": 1}),
  (2, {"feature": 2, "label": 2}),
  (3, {"feature": 2, "label": 3}),
  (4, {"feature": 1, "label": 4})
]) 
G.add_edges_from([(2, 1), (1, 4), (4, 2), (4, 3), (4, 4), (2, 2)])
# 그래프를 그립니다.
A = nx.adjacency_matrix(G)
print(A.todense())
nx.draw(G, with_labels=True)
```

![image](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_16.png)


<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_17.png" />

지금까지 각 노드 쌍 간에 하나의 연결만 있을 수 있다고 생각했지만, 이론적으로는 두 노드 사이에 더 많은 링크를 나타내야 할 수도 있습니다. 이 경우, Multigraph가 필요합니다.

```js
G = nx.MultiGraph()
G.add_nodes_from([
  (1, {"feature": 1, "label": 1}),
  (2, {"feature": 2, "label": 2}),
  (3, {"feature": 2, "label": 3}),
  (4, {"feature": 1, "label": 4})
]) 
G.add_edges_from([(2, 1), (2, 1), (1, 4), (4, 2), (4,3), (4,3), (4,3)])
A = nx.adjacency_matrix(G)
print(A.todense())
# Draw the graph
pos = nx.random_layout(G)
nx.draw_networkx_nodes(G, pos, node_color = 'r', node_size = 100, alpha = 1)
ax = plt.gca()
for e in G.edges:
    ax.annotate("",
                xy=pos[e[0]], xycoords='data',
                xytext=pos[e[1]], textcoords='data',
                arrowprops=dict(arrowstyle="->", color="0.5",
                                shrinkA=5, shrinkB=5,
                                patchA=None, patchB=None,
                                connectionstyle="arc3,rad=rrr".replace('rrr',str(0.3*e[2])
                                ),
                                ),
                )
plt.axis('off')
```

<img src="/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_18.png" />

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_19.png)

양 부분 그래프(또는 이분 그래프)는 그래프 이론에 따르면 그래프의 꼭짓점을 두 가지 서로 다른 및 독립적인 집합으로 나눌 수 있는 그래프이며 각 간선이 꼭짓점을 서로 연결합니다. 양 부분 그래프는 암 검출, 전자 상거래 및 매칭 문제 등에서 사용됩니다.

```js
B = nx.Graph()
# 노드 속성 "bipartite"를 가진 노드 추가
B.add_nodes_from([1, 2, 3, 4], bipartite=0)
B.add_nodes_from(["a", "b", "c"], bipartite=1)
# 서로 다른 노드 집합 간에만 엣지 추가
B.add_edges_from([(1, "a"), (1, "b"), (2, "b"), (2, "c"), (3, "c"), (4, "a")])
# 그룹별로 분리
l, r = nx.bipartite.sets(B)
pos = {}

# 각 그룹에서 노드를 위한 위치 업데이트
pos.update((node, (1, index)) for index, node in enumerate(l))
pos.update((node, (2, index)) for index, node in enumerate(r))

nx.draw(B, pos=pos)
plt.show()
```

![이미지](/assets/img/2024-06-20-GraphMLintroductiontoNetworkX_20.png)


<div class="content-ad"></div>

이전 글은 여기에서 찾을 수 있어요. 이 튜토리얼에서 사용된 모든 코드는 여기에서 찾을 수 있어요. 모든 튜토리얼 링크와 코드도 여기에 모아져 있을 거예요.

# 결론

이 튜토리얼에서는 NetworkX를 사용하여 그래프를 생성하고 노드와 엣지를 추가하고 피처를 할당하는 방법을 알아봤어요.
다양한 종류의 그래프가 있고 NetworkX를 통해 파이썬에서 이를 정의하고 시각화할 수 있다는 것을 보았어요.
다음 튜토리얼에서는 더 복잡한 경우와 추가적인 기능을 살펴볼 거예요. 또한, 노드를 분류하고, 노드 간 새로운 연결을 예측하거나, 노드를 커뮤니티로 그룹화하는 방법, 그래프 신경망 등을 적용하는 방법에 대해 논의할 거예요. 계속해서 주시길 바래요!

# 이 내용이 흥미로웠다면:

<div class="content-ad"></div>

다른 기사를 찾아보거나 LinkedIn에서 저와 연락할 수도 있어요. 매주 업데이트되는 기계 학습 및 인공 지능 뉴스가 포함된 이 저장소를 확인해보세요. 협업과 프로젝트에 열려 있고 LinkedIn을 통해 저에게 연락할 수 있습니다. 새 이야기를 게시할 때 알림을 받고 싶다면 무료로 구독할 수도 있어요.

여기 GitHub 저장소 링크입니다. 기계 학습, 인공 지능 및 기타 관련 자원을 수집하고 있어요.

또는 제 최근 기사 중 하나에 관심이 있을지도 모릅니다: