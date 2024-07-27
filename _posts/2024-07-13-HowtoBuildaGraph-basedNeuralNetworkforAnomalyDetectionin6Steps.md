---
title: "6단계로 그래프 기반 이상 탐지 신경망 만드는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-HowtoBuildaGraph-basedNeuralNetworkforAnomalyDetectionin6Steps_0.png"
date: 2024-07-13 19:22
ogImage: 
  url: /TIL/assets/img/2024-07-13-HowtoBuildaGraph-basedNeuralNetworkforAnomalyDetectionin6Steps_0.png
tag: Tech
originalTitle: "How to Build a Graph-based Neural Network for Anomaly Detection in 6 Steps"
link: "https://medium.com/towards-data-science/how-to-build-a-graph-based-neural-network-for-anomaly-detection-in-6-steps-a7dc47723788"
---



![이미지](/TIL/assets/img/2024-07-13-HowtoBuildaGraph-basedNeuralNetworkforAnomalyDetectionin6Steps_0.png)

본 글은 그래프 데이터를 활용한 이상 감지 모델을 구축하는 방법에 대해 자세히 설명한 기술적인 내용입니다. 이 모델은 다른 유형의 엔티티가 포함된 그래프 데이터(이질적 그래프 데이터)를 다룰 수 있습니다.

이 글에서 다룰 모델은 Grab이라는 아시아 기술 회사가 2023년 IJCNN(IJCNN) 국제 합동 신경망 회의에서 발표한 "Interaction-Focused Anomaly Detection on Bipartite Node-and-Edge-Attributed Graphs"라는 논문에 기반합니다.

이 Graph Convolutional Network (GCN) 모델은 이질적 그래프 데이터를 처리할 수 있어 노드와 엣지가 다른 유형일 수 있습니다. 이 그래프는 서로 다른 유형의 엔티티 또는 노드 간의 관계를 나타내므로 구조적으로 복잡합니다.


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

이를 Markdown 형식으로 변경하실 수 있으시다: 

GCNs가 이질적 그래프 데이터를 처리할 수 있는 것은 활발한 연구 분야입니다. 모델의 합성 연산은 다른 노드 유형과 이들 간의 관계를 처리하는 데 도전을 해소하기 위해 수정되었습니다.

반면에 동질적 그래프는 동일한 유형의 노드와 엣지를 포함합니다. 이 유형의 그래프는 구조적으로 더 간단합니다. 동질적 그래프의 예로는 LinkedIn 연결이 있습니다. 여기서 모든 노드는 개인을 나타내고, 노드 간에 연결이 있습니다.

여기서 볼 예제는 Grab의 GraphBEAN 모델(이분 그래프 노드 및 엣지 속성 네트워크)을 건강 보험 공급자 사기에 관한 Kaggle 데이터 세트에 적용합니다. (이 데이터 세트는 현재 Kaggle에서 CC0: Public Domain 라이선스로 사용 가능합니다. 이 데이터 세트가 정확하지 않을 수 있으니, 이 기사에서는 단순히 시연 목적으로 사용하였음을 주의하십시오). 해당 데이터 세트에는 입원 데이터, 외래 데이터, 수혜자 데이터의 청구 및 인사이트를 담은 여러 csv 파일이 포함되어 있습니다.

저는 입원 데이터 세트를 사용하여 건강 보험 공급자 사기를 예측하기 위해 GCN을 구축하고, ProviderID와 레이블 열 (PotentialFraud)이 포함된 학습 세트를 사용하는 방법을 보여드리겠습니다.

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

그래프 데이터는 표 형태로 시각화하기 어려울 수 있지만 csv 파일과 같은 형식으로 표현할 수 있습니다. 노드 간의 관계를 보여주는 흥미로운 대화형 시각화를 만들 수 있습니다. 제 이전 블로그 포스트인 '파이썬을 사용한 시계열 네트워크 그래프 시각화 방법'을 확인해보세요.

# 그래프 컨볼루션 네트워크(GCN)의 활용

이종 그래프를 사용한 GCN의 다양한 응용 분야는 서로 다른 엔티티 간의 복잡한 관계를 포착하고 모델링할 수 있기 때문에 다양합니다. 많은 사용 사례가 있으며 여기에 몇 가지 흥미로운 예시가 있습니다:

- 사기 탐지: Grab은 사용자, 거래, 상인 등 사이의 관계를 모델링하여 의심스러운 거래를 식별하는 데 사용합니다.
- 추천 시스템: 전자 상거래 플랫폼은 사용자와 제품 간의 관계를 모델링하여 개인화된 추천을 제공하기 위해 이종 그래프를 활용할 수 있습니다.

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

지도 학습 방법과 대조적으로, GCN은 이전에 본 적이 없는 이상 징후를 감지할 수 있어 사기 공격에 강하고 새로운 관계에 적응할 수 있습니다.

# 모델 아키텍처

이 모델은 노드와 엣지의 서로 다른 유형을 갖는 이분 그래프를 사용하고 각 노드와 엣지에 대한 이상 점수를 출력합니다.

기본 모델 구조는 이종 그래프 데이터를 다루기 위해 인코더와 디코더에 맞춤형 아키텍처를 갖춘 오토인코더와 유사한 모델입니다.

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

입력 그래프는 노드 및 엣지 피쳐의 특성을 캡처하는 인코더로 전달됩니다. 다음으로, 이를 학습한 표현을 취하는 피쳐 디코더를 거쳐 노드 피쳐를 재구성합니다. 그런 다음 구조 디코더로 전달되는데, 이는 여러 개의 다중 레이어 퍼셉트론(MLP) 레이어로 구성되어 그래프 구조를 재구성하고 노드 사이에 엣지의 존재를 예측합니다.

실제 대 재구성된 노드 및 엣지 어트리뷰트 간의 오류가 계산되고, 재구성된 오류는 각 노드 및 엣지에 대한 이상치 점수를 계산하는 데 사용됩니다.

이제 고수준 모델 아키텍처에 대한 개괄을 이해했으니, 의료 공급자 사기 예측 모델을 구축하기 위한 여섯 단계를 자세히 알아봅시다.

# 1) 데이터로부터 이분 그래프 생성

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

첫 번째 단계는 이분 그래프 형식으로 탭 데이터를 인코딩하는 것입니다. 결과 그래프에는 노드, 엣지 및 이들의 속성에 대한 데이터가 포함됩니다.

우리의 결과 그래프는 수혜자가 노드 u로, 의사가 노드 v로 인코딩되어야 하며, 엣지 e는 의사에 의해 수혜자를 위해 서비스를 제공하기 위해 청구된 경우에 존재합니다. 아래는 csv 파일을 이분 그래프로 준비, 생성 및 변환하는 단계입니다:

## 1.1 데이터 준비

이 함수는 세 개의 데이터프레임을 생성합니다:

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

- 첫 번째 테이블은 수혜자를 노드 u로 한 집합의 데이터를 포함하고 있습니다. 집계 통계로 선택한 항목은 청구 건수, 병원을 방문한 의사 수, 총 보상액, 평균 보상액, 그리고 각 수혜자의 사기 비율을 인코딩했습니다.

```js
df_bene = df.groupby("BeneID").agg(
  count_claims=("ClaimID", "nunique"),
  count_physicians=("AttendingPhysician", "nunique"),
  count_providers=("Provider", "nunique"),
  total_reimbursed=("InscClaimAmtReimbursed", "sum"),
  avg_reimbursed=("InscClaimAmtReimbursed", "mean"),
  pct_fraud=("PotentialFraud", lambda x: round(x.mean() * 100))
).reset_index()
```

- 두 번째 데이터프레임은 다른 노드 데이터인 의사를 노드 v로 포함하고 있습니다. 노드 속성에는 청구 건수, 병원을 방문한 수혜자 수, 제공한 서비스가 있는 병원 수, 총 보상액, 평균 보상액, 그리고 각 의사의 사기 비율이 포함되어 있습니다.

```js
df_physician = df.groupby("AttendingPhysician").agg(
    count_claims=("ClaimID", "nunique"),
    count_beneficiaries=("BeneID", "nunique"),
    count_providers=("Provider", "nunique"),
    total_reimbursed=("InscClaimAmtReimbursed", "sum"),
    avg_reimbursed=("InscClaimAmtReimbursed", "mean"),
    pct_fraud=("PotentialFraud", lambda x: round(x.mean() * 100))
).reset_index()
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

- 마지막 데이터프레임에는 엣지 데이터가 포함되어 있습니다 — 수혜자와 의사 간 상호 작용을 캡처하며 총계 통계를 나타내는 엣지 속성을 갖습니다. 이러한 속성에는 각 수혜자와 의사 쌍에 대한 청구 횟수, 제공자 수, 총 환급액, 평균 환급액, 사기 비율이 포함됩니다.

```js
df_edge = df.groupby(["BeneID", "AttendingPhysician"]).agg(
    count_claims=("ClaimID", "nunique"),
    count_providers=("Provider", "nunique"),
    total_reimbursed=("InscClaimAmtReimbursed", "sum"),
    avg_reimbursed=("InscClaimAmtReimbursed", "mean"),
    pct_fraud=("PotentialFraud", lambda x: round(x.mean() * 100))
).reset_index()
```

## 1.2 Create_graph

이 함수는 바이파티트 그래프를 생성하며 노드 및 엣지 데이터가 포함된 인접 행렬을 출력합니다.

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

먼저, 수혜자 ID를 행으로, 의사 ID를 열로 하는 희소 행렬로 노드 데이터를 인코딩하세요.

```js
# 노드 데이터프레임에 ID로 인덱싱 설정
df_bene["bid"] = df_bene.index
df_physician["pid"] = df_physician.index

# 수혜자 및 의사 노드에 대한 ID를 엣지 데이터프레임에 추가
df_edge_2 = df_edge.merge(
  df_bene[["BeneID", "bid"]],
  on="BeneID",
).merge(
  df_physician[["AttendingPhysician", "pid"]], 
  on="AttendingPhysician"
)

# 수혜자 및 의사 ID를 텐서로 인코딩
bid = torch.tensor(df_edge_2["bid"].to_numpy())
pid = torch.tensor(df_edge_2["pid"].to_numpy())

# 노드 데이터로 인접 행렬 생성
adj = SparseTensor(row=bid, col=pid)
```

다음 단계는 노드와 엣지 속성을 추가하는 것인데, 이러한 속성은 sklearn의 표준 스케일러를 사용하여 표준화되었습니다. 이는 GCN 모델이 후속 단계에서 더 잘 학습할 수 있도록 도와줍니다. 이러한 속성들은 다음과 같이 텐서로 인코딩되어 있습니다:

```js
# 수혜자의 노드 속성을 텐서로 인코딩
bene_attr = torch.tensor(
  standardize(
    # 관련 노드 속성이 있는 열을 선택합니다
    df_bene.iloc[:, 1: -1].to_numpy() 
  )
).float()

# 의사의 노드 속성을 텐서로 인코딩
physician_attr = torch.tensor(
  standardize(
    # 관련 노드 속성이 있는 열을 선택합니다
    df_physician.iloc[:, 1: -1].to_numpy() 
  )
).float()

# 엣지 속성을 텐서로 인코딩
edge_attr = torch.tensor(
  standardize(
    # 관련 엣지 속성이 있는 열을 선택합니다
    df_edge_2.iloc[:, 2: -2].to_numpy() 
  )
).float()
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

마침내 이중 부분 데이터 집합이 생성되었습니다. 이는 인접 행렬, 노드 속성 및 엣지 속성을 저장하는 사용자 지정 데이터 클래스로, Pytorch Geometric의 그래프 데이터 객체에서 상속받습니다.

```js
from models.data import BiPartiteData

data = BiPartiteData(
  adj, 
  xu=bene_attr, 
  xv=physician_attr, 
  xe=edge_attr
)
```

## 1.3 Inject_random_block_anomaly

마지막이자 더 복잡한 단계는 이중 부분 그래프에 이상을 삽입하여 다양성을 더하는 것입니다. 이에 대해 다음 섹션에서 설명하겠습니다.

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

# 2 데이터에 무작위 이상 현상 주입하기

데이터에 이상 현상을 주입하여 이를 통해 데이터의 변동성을 높일 수 있습니다. 모델을 훈련시키기 위해 더 다양한 데이터셋을 보유하면 모델이 이상 현상을 식별하는 방법을 더 잘 학습할 수 있습니다.

복잡해보일 수 있지만, 데이터에 무작위 이상 현상을 삽입하는 함수는 다음과 같은 3가지 주요 단계로 나뉠 수 있습니다:

2.1) 이상 현상 주입을 위한 매개변수 무작위화하기,

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

2.2) 무작위 매개변수에 기반한 이상 삽입,

2.3)원본 그래프 및 이상에서 얻은 데이터를 결합하여 새로운 이분 그래프 생성.

## 2.1 이상 삽입을 위한 매개변수 무작위화

본 단계는 데이터에 삽입될 이상의 유형을 선택하기 위해 사용될 매개변수를 선택하는 것을 포함합니다.

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

다음은 다른 종류의 블록 이상, 특징 이상, 노드 및 엣지 특징 이상을 나타내는 문자열 목록을 초기화하고, 각 이상의 가중치를 담은 부동소수점 목록을 초기화하는 것으로 시작합니다.

```js
block_anomalies = ["full_dense_block", "partial_full_dense_block"]
feature_anomalies = ["outside_ci", "scaled_gaussian", "none"]
node_edge_feat_anomalies = ["node_only", "edge_only", "node_edge"]

block_anomalies_weight = [0.2, 0.8]
feature_anomalies_weight = [0.5, 0.4, 0.1]
node_edge_feat_anomalies_weight = [0.1, 0.3, 0.6]
```

다음으로, 이상을 주입할 그룹의 수에 대해 반복합니다. 이는 num_group 매개변수로 지정됩니다 (여기서는 20으로 선택했습니다).

각 그룹에 대해, 블록, 특징, 노드 및 엣지 특징 이상에 대한 이전에 정의된 이상 유형 및 각 유형의 가중치에 기초하여 무작위로 매개변수 집합을 선택합니다.

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

## 2.2 이상 주입

그 다음으로, num_node_range (나의 경우 1부터 20)와 num_node_range2 (나의 경우 1부터 6) 매개변수의 튜플 범위에 따라 삽입할 노드 수를 계산합니다.

그런 다음 밀집 블록 함수를 호출하여 다음 중 하나의 조합을 주입합니다 —

- 밀집 블록 및 특성 이상
- 밀집 블록 이상만
- 특성 이상만

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

밀집 블록 이상

밀집 블록은 각 레이어가 정보 흐름을 강화하기 위해 각 후속 레이어에 직접 연결된 신경망 아키텍처로, 다층으로부터 정보를 효과적으로 제공하여 모델 훈련을 강화합니다.

밀집 블록 이상 주입 함수는 입력 그래프와 지정된 매개변수를 매개변수로 사용하고 수정된 인접 행렬, 엣지 기능 및 레이블을 반환합니다.

레이블은 그래프의 엣지가 여러 밀집 행렬의 일부인지를 나타내는 이진 레이블입니다. 각 엣지가 인접 행렬에서 발생하는 횟수를 세어, 그 엣지가 한 번 이상 발생하면 레이블 1을 부여하며, 그렇지 않으면 0을 부여합니다.

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

다수의 밀집 블록 내 에지를 분석하면 네트워크 내 정보 흐름에 관한 중요한 정보를 알 수 있습니다.

라벨이 1인 에지는 서로 다른 서브그래프의 특정 노드들 사이에 높은 연결성을 가지며, 이러한 노드들은 그래프 내에서 서로 다른 커뮤니티를 연결하는 중요한 역할을 합니다. 다수의 밀집 블록에 속한 노드들은 네트워크에서 정보 흐름을 중계하는 연결 요소로 작용하여 그래프의 여러 부분 간에 정보를 교환합니다.

특징 이상 현상

특징 이상 현상 매개변수가 활성화된 경우 (이는 단계 2.1에서 선택한 임의의 매개변수에 따라 달라집니다), 통계적 방법을 사용하여 엣지 특징에 특징 이상 현상을 주입하는 함수가 호출됩니다. 이 때, outside_confidence_interval() 또는 scaled_gaussian_noise() 방법을 선택합니다.

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

이상점은 그 후 엣지 피처에 주입되어 새로운 수정된 그래프에 통합됩니다.

## 2.3 새 이분 그래프 생성

매 반복마다 새로운 이분 그래프가 생성됩니다. 새 그래프에는 새로운 인접행렬 엣지, 수정된 엣지 피처 xe_new, 결합된 엣지 레이블 ye_new, 그리고 엣지가 원래 그래프에서 온 것인지 이상점인지를 나타내는 이상점 레이블이 포함됩니다.

# 3 모델 설정

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

다음 단계는 모델을 초기화하는 것입니다. GraphBEAN 클래스는 다음 파라미터를 사용하는 사용자 정의 그래프 기반 신경망입니다:

- In_channels: 사용자 노드 u, 상품 노드 v 및 엣지 e의 입력 채널 수를 지정하는 u_ch, v_ch, e_ch 요소가 있는 튜플입니다. 이는 입력 그래프의 각 노드 및 엣지 유형의 특징 공간 크기 또는 차원을 정의합니다.
- Hidden_channels, latent_channels: 이 두 인수는 모델 아키텍처의 인코더 및 디코더 구성 요소 내의 숨겨진 채널 및 잠재 채널의 차원을 지정합니다.
- Edge_pred_latent: 엣지 예측을 위한 잠재 공간의 크기 또는 차원을 나타내는 정수입니다. 이 값은 32로 설정했습니다. 다시 말해, 이는 엣지 예측을 위한 학습된 표현을 포착하는 길이가 32인 벡터입니다.
- N_layers_encoder, n_layers_decoder, n_layers_mlp: 모델의 인코더, 디코더 및 다중 레이어 퍼셉트론(MLP) 레이어 구성 요소의 층 수입니다. MLP는 각 뉴런이 다음 레이어의 각 뉴런과 연결되는 다중 완전 연결 레이어로 구성됩니다.
- Dropout_prob: 드롭아웃은 신경망에서 일반적으로 사용되는 정칙화를 위한 하이퍼파라미터입니다. 과적합을 방지하기 위해 훈련 과정 중에 개별 뉴런을 무작위로 삭제하거나 값을 0으로 만들 확률을 나타냅니다.

이 Graph Convolutional Network는 오토인코더와 유사한 모델 아키텍처를 갖고 있습니다. 데이터의 차원을 낮은 차원의 표현으로 출력하는 인코더 부분(encoder_convs)과 데이터를 원래의 특징 공간으로 재구성하려는 디코더 부분(decoder_convs, u_mlp_layers 및 v_mlp_layers)으로 구성됩니다.

인코더와 특징 디코더 내에서 모델은 이질적 데이터에서 작동하도록 설계된 사용자 정의 그래프 컨볼루션 레이어인 BeanCONV를 생성합니다.

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

이 오토인코더 유형의 아키텍처는 명시적 레이블을 제공하지 않고도 데이터로부터 복잡한 구조와 패턴을 학습할 수 있어서 비지도 학습 작업에서 뛰어납니다.

`forward` 메서드는 신경망의 순전파를 정의합니다. 이 메서드는 기본적으로 입력 데이터가 훈련 및 추론 동안 네트워크의 다른 레이어를 통해 어떻게 처리되어 출력을 생성해야 하는지를 지정합니다.

모델 아키텍처의 다른 부분을 살펴보며 모델이 입력 데이터를 학습하고 변환하는 방식을 이해해 봅시다.

## 인코더

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

인코더는 사용자 노드 xu, 항목 노드 xv 및 엣지 xe로 구성된 입력 그래프를 가져와 그래프 합성 작업을 수행하여 잠재적 표현을 생성합니다.

인코더는 BEANConv 레이어의 시리즈인 Pytorch 신경망 모듈이며, 이는 커스텀 그래프 합성 레이어입니다. BEANConv 레이어는 이웃 노드 및 엣지 사이에서 평균 및 최대 작업과 같은 데이터 집계를 수행하여 이질적 데이터(다른 유형의 데이터)에 작용하도록 설계되었습니다.

인코더는 각 레이어에서 얼마나 많은 채널을 가지고 있고 각 레이어 내에서 어떤 작업을 수행할지를 정의하도록 구성됩니다. GraphBEAN에서의 코드 스니펫은 이 프로세스를 보여줍니다:

```js
def create_encoder(self): 
  # 인코더는 일련의 레이어를 포함하는 Pytorch 신경망 모듈입니다.
  self.encoder_convs = nn.ModuleList()

  # 각 레이어를 생성합니다.
  for i in range(self.n_layers_encoder):
    # 첫 번째 레이어의 채널 정의
    if i == 0: 
       in_channels = self.in_channels
       out_channels = self.hidden_channels

    # 마지막 레이어의 채널 정의
    elif i == self.n_layers_encoder - 1:
       in_channels = self.hidden_channels
       out_channels = self.latent_channels

    # 중간 레이어의 채널 정의
    else:
       in_channels = self.hidden_channels
       out_channels = self.hidden_channels

    # 각 레이어를 인코더 모듈 리스트에 추가합니다.
    # 마지막 레이어
    if i == self.n_layers_encoder - 1:
        self.encoder_convs.append(
            BEANConv(in_channels, out_channels, node_self_loop=False)
        )
    # 마지막 레이어를 제외한 모든 레이어는 합성 작업을 수행합니다.
    else:
        self.encoder_convs.append(
            BEANConv(in_channels, out_channels, node_self_loop=True)
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

각 BEANConv 레이어의 출력은 원래의 feature space 로 매핑하기 위해 선형 변환을 거칩니다. 입력 피쳐에서 고차원 공간으로의 이 학습된 선형 매핑은 사실상 학습된 가중치와 편향의 집합입니다.

그런 다음, 각 인코더 레이어의 출력에는 ReLU(Recitified Linear Unit) 활성화 함수와 드롭아웃이 적용됩니다. ReLU 활성화의 목적은 모델에 비선형성을 도입하여 더 복잡한 표현을 학습하고 데이터의 비선형적 패턴을 잡을 수 있도록 하는 것입니다.

BeanCONV 레이어의 출력은 입력 데이터의 구조적 정보와 관계를 포착하는 낮은 차원의 학습된 표현입니다. 노드의 원시 잠재 변수를 나타내는 텐서를 반환합니다 (xu 및 xv).

전진 패스의 인코더 부분은 아래와 같이 정의됩니다:

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
# 인코더 내의 각 합성곱 레이어를 순환합니다.
for i, conv in enumerate(self.encoder_convs):

    # 인풋 텐서는 인코더 내 각 합성곱 레이어를 통과합니다.
    (xu, xv), xe = conv((xu, xv), adj, xe=xe)

    # ReLU 활성화 및 드롭아웃을 각 인코더 레이어에 적용하지만 마지막 레이어가 아닙니다.
    if i != self.n_layers_encoder - 1:
        xu = apply_relu_dropout(xu, self.dropout_prob, self.training)
        xv = apply_relu_dropout(xv, self.dropout_prob, self.training)
        xe = apply_relu_dropout(xe, self.dropout_prob, self.training)
```

마지막 합성곱 연산에서 얻은 결과 `xu`와 `xv`는 잠재 변수로 간주됩니다. 이는 인코더에서 학습한 정보를 담고 있습니다.

## 특징 디코더

특징 디코더는 그래프 내 노드 특징을 재구성하는 데 중점을 둡니다. 인코더의 출력을 인풋으로 삼는데, 이는 노드의 잠재 표현(`xu`와 `xv`)입니다.

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

인코더와 유사하게, 피쳐 디코더는 노드 간의 관계를 캡처하기 위해 컨볼루션 작업을 수행하는 일련의 BEANConv 레이어 및 사용자 지정 컨볼루션 레이어로 구성됩니다. GraphBEAN에서 코드 스니펫은 다음과 같습니다:

```js
def create_feature_decoder(self):
  # 디코더는 일련의 레이어를 포함하는 Pytorch 신경망 모듈입니다
  self.decoder_convs = nn.ModuleList()

  # 각 레이어 생성
  for i in range(self.n_layers_decoder):
    # 첫 번째 레이어의 채널 정의
    if i == 0:
       in_channels = self.latent_channels
       out_channels = self.hidden_channels

    # 마지막 레이어의 채널 정의
    elif i == self.n_layers_decoder - 1:
       in_channels = self.hidden_channels
       out_channels = self.in_channels

    # 중간 레이어의 채널 정의
    else:
       in_channels = self.hidden_channels
       out_channels = self.hidden_channels

    # 각 레이어를 모듈 목록에 추가
    self.decoder_convs.append(BEANConv(in_channels, out_channels))
```

이와 같이 각 디코더 레이어의 출력에는 비선형 변환과 정규화를 위해 ReLU 활성화 및 드롭아웃이 적용되지만, 출력 레이어는 제외됩니다.

해당 신경망의 forward 메서드의 피쳐 디코더 부분은 아래에 정의되어 있습니다:

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


# 디코더 내 각 합성 층을 반복합니다.
for i, conv in enumerate(self.decoder_convs):
  
  # 피쳐 디코더의 입력으로 인코더의 출력을 사용합니다.
  # 각 디코더 내 합성 층을 통과하는 입력 텐서입니다.
  (xu, xv), xe = conv((xu, xv), adj, xe=xe)

  # ReLU 활성화 및 드롭아웃을 적용합니다. 단, 마지막 디코더 층 제외
  if i != self.n_layers_decoder - 1:
    xu = apply_relu_dropout(xu, self.dropout_prob, self.training)
    xv = apply_relu_dropout(xv, self.dropout_prob, self.training)
    xe = apply_relu_dropout(xe, self.dropout_prob, self.training)


피쳐 디코더의 출력은 이질 그래프에서 재구성된 노드 피쳐를 나타내는 텐서 쌍(zu 및 zv)입니다.

## 구조 디코더

구조 디코더는 에지 피쳐를 재구성하고 노드 사이에 존재하는 에지의 확률을 예측하기 위해 설계되었습니다. 재구성된 노드 피쳐 또는 피쳐 디코더의 출력(zu 및 zv)이 입력됩니다.


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

구조 디코더는 입력된 잠재 노드 표현을 처리하여 엣지 예측을 생성하기 위한 Multi-Layer Perceptron (MLP) 레이어 (u_mlp_layers와 v_mlp_layers) 시리즈로 구성되어 있습니다. GraphBEAN에서 다음 코드 스니펫은 이를 보여줍니다:

```js
def create_structure_decoder(self):
  # MLP 레이어는 일련의 레이어를 포함하는 Pytorch 신경망 모듈입니다.
  self.u_mlp_layers = nn.ModuleList()
  self.v_mlp_layers = nn.ModuleList()

  # 각 레이어 생성
  for i in range(self.n_layers_mlp):
    # 첫 번째 레이어의 채널 정의
    if i == 0:
        in_channels = self.latent_channels

    # 첫 번째 레이어를 제외한 모든 레이어의 채널 정의
    else:
        in_channels = (self.edge_pred_latent, self.edge_pred_latent)
        out_channels = self.edge_pred_latent
  
    # 각 레이어를 MLP 모듈 리스트에 추가
    self.u_mlp_layers.append(Linear(in_channels[0], out_channels))
    self.v_mlp_layers.append(Linear(in_channels[1], out_channels))
```

각 MLP 레이어의 출력은 선형 변환을 거친 후 ReLU 활성화 함수를 통해 비선형성을 도입합니다. 과적합을 방지하고 정칙화하기 위해 드롭아웃도 적용됩니다.

포워드 패스의 구조 디코더 부분은 아래와 같이 정의됩니다:

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
# 피처 디코더에서 출력된 잠재 변수 가져오기
zu2, zv2 = zu, zv

# 각 MLP 레이어별로 반복
for i, layer in enumerate(self.u_mlp_layers):
  
  # u 노드용 출력 잠재 변수는 
  # 스트럭처 디코더의 각 MLP 레이어를 통과합니다
  zu2 = layer(zu2)

  # ReLU 활성화 함수와 드롭아웃을 적용합니다. 마지막 레이어 제외
  if i != self.n_layers_mlp - 1:
    zu2 = apply_relu_dropout(zu2, self.dropout_prob, self.training)

# 각 MLP 레이어별로 반복
for i, layer in enumerate(self.v_mlp_layers):
  
  # v 노드용 출력 잠재 변수는 
  # 스트럭처 디코더의 각 MLP 레이어를 통과합니다
  zv2 = layer(zv2)

  # ReLU 활성화 함수와 드롭아웃을 적용합니다. 마지막 레이어 제외
  if i != self.n_layers_mlp - 1:
    zv2 = apply_relu_dropout(zv2, self.dropout_prob, self.training)
```

마지막으로 MLP 레이어에서 반환된 변환된 잠재 변수 (zu2 및 zv2)은 시그모이드 활성화 함수를 통해 0에서 1까지의 출력 값을 생성합니다.

```python
# 변환된 잠재 변수에서 행과 열 가져오기
zu2_edge = zu2[edge_pred_samples.storage.row()]
zv2_edge = zv2[edge_pred_samples.storage.col()]

# 엣지 확률을 계산하기 위해 시그모이드 변환을 적용합니다
eprob = torch.sigmoid(torch.sum(zu2_edge * zv2_edge, dim=1))
```

이러한 출력은 노드 간 엣지의 예측 확률 (eprob)입니다.

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

## 옵티마이저 및 학습률

모델을 정의한 후, 학습 과정 중에 모델 파라미터를 업데이트하는 Adam 옵티마이저를 구성합니다.

게다가, 학습률 스케줄러를 설정하여 각 이정표에서 학습률을 조정하는 방식을 지정합니다 (0.2의 배율로 감소하도록 설정).

```js
# Adam 옵티마이저 정의
optimizer = torch.optim.Adam(params=model.parameters(), lr=lr)

# 학습률 스케줄러 정의
scheduler = torch.optim.lr_scheduler.MultiStepLR(
  optimizer, milestones=[], gamma=0.2
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

# 4) 네거티브 클래스에서의 샘플 데이터

Grab은 사기 탐지를 위해 GCN을 사용하며, 클래스 불균형은 이 분야에서 흔한 문제입니다. 이를 극복하기 위해, 음성 클래스의 샘플링을 통해 음성 및 양성 클래스의 비율을 더 잘 균형있게 맞춰 모델이 보다 효과적으로 학습하고 수렴 문제를 극복할 수 있도록 합니다.

EdgePredictionSampler 클래스는 엣지 예측을 위한 음성 샘플을 생성하는 데 사용됩니다. 이를 위해 존재하지 않는 엣지를 무작위로 샘플링하여 음성 샘플로 만들고, 이를 기존 엣지의 양성 샘플과 연결하여 새로운 희소 텐서를 생성합니다.

이러한 새로운 텐서의 값은 양성 샘플을 나타내는 1 또는 음성 샘플을 나타내는 -1입니다 (즉, 이 노드들 간에 엣지가 존재하지 않음). 생성된 희소 텐서인 edge_pred_samples는 모델 훈련 과정에서 사용됩니다.

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

# 5) 모델 훈련

모델 훈련 과정에서는 다음 단계를 거칩니다:

- 부정 클래스를 샘플링하고 샘플된 부정 클래스와 양성 클래스를 연결하여 새로운 텐서를 생성합니다.
- 옵티마이저 텐서의 그래디언트를 0으로 초기화합니다.
- 모델 훈련 과정을 안내하기 위해 재구성 손실을 계산합니다.

재구성 손실은 실제 입력과 예측 출력 간의 차이를 측정하며, 특징 손실과 구조 손실 두 가지 구성 요소로 구성됩니다.

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

실제 피처와 예측된 피처 간의 차이를 포착하는 피처 손실은 모델이 그래프 내의 노드와 엣지 피처를 얼마나 잘 재구성할 수 있는지를 살펴봅니다.

이 예제에서는 손실 함수로 MSE(평균 제곱 오차)를 사용하며, 피처 손실은 노드와 엣지에서 실제와 예측된 피처 간의 MSE 합입니다.

엣지 손실의 MSE는 가중치(xe_loss_weight)가 적용됩니다. 엣지에 더 중요성을 두거나 덜 두고 싶은 경우를 위해 설정됩니다. 그러나 이 예제에서는 1로 설정되어 있습니다.

```js
# 노드 및 엣지 피처의 MSE 계산
xu_loss = nn.functional.mse_loss(xu, out["xu"])
xv_loss = nn.functional.mse_loss(xv, out["xv"])
xe_loss = nn.functional.mse_loss(xe, out["xe"]) 

# 피처 손실 계산을 위해 구성 요소를 합산
feature_loss = xu_loss + xv_loss + xe_loss_weight * xe_loss
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

구조 손실은 예측된 엣지의 확률과 실제 엣지 레이블 간의 차이를 측정합니다. 다시 말해, 모델이 그래프 구조와 엣지 연결을 얼마나 잘 재구성할 수 있는지를 캡처하는 것입니다.

구조 손실에 사용된 손실 함수는 이진 교차 엔트로피이며, 큰 오차가있는 예측을 작은 오차보다 더 엄격하게 패널티를 주게 됩니다.

```js
# 실제 엣지 레이블 가져오기
edge_gt = (edge_pred_samples.storage.value() > 0).float()

# 예측된 확률과 실제 엣지 레이블 사이의 이진 교차 엔트로피 측정
structure_loss = nn.functional.binary_cross_entropy(out["eprob"], edge_gt)
```

재구성 손실은 피처 손실과 구조 손실의 합이며, 각 손실의 중요성에 따라 가중치를 조절할 수 있습니다. 모델은 학습 과정에서 이 결합된 손실에 최적화됩니다.

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
손실 = 피처 손실 + 구조 손실 가중치 * 구조 손실
```

다음으로, backpropagation이 수행되어 모델 매개변수에 관한 그래디언트가 계산되고, 옵티마이저는 계산된 그래디언트를 사용하여 모델 매개변수를 조정하여 손실을 최소화합니다.

학습률은 필요에 따라 미리 정의된 스케줄러에 따라 조정됩니다. 스크립트에서는 학습률이 일정한 횟수 거칠 때마다 0.2 배로 감소하도록 설정됩니다.

이 프로세스의 마지막 단계는 엣지 예측과 지면 실제 엣지 레이블을 비교하여 메트릭을 계산하는 것입니다. 스크립트에서 계산된 메트릭은 정확도, 정밀도, 재현율 및 F1 점수를 포함합니다.


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
acc = accuracy_score(edge_gt, edge_pred)
prec = precision_score(edge_gt, edge_pred)
rec = recall_score(edge_gt, edge_pred)
f1 = f1_score(edge_gt, edge_pred)
```

# 6) 모델 평가

모델을 훈련한 후, 마지막 단계는 성능을 평가하는 것입니다. 예측을 하기 전에 편향되지 않도록 모델 매개변수가 업데이트되지 않도록 경사 하강이 비활성화됩니다.

그런 다음 예측을 하고, 모델이 엣지 예측에 얼마나 잘하는지 측정하기 위해 재구성 손실과 지표가 함께 계산됩니다.

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

평가 단계에는 학습 과정에서 사용되는 메트릭 이외에 더 포괄적인 오류 메트릭 계산이 포함됩니다. 이는 다음을 포함합니다:

- 원본 그래프와 재구성된 출력 사이의 노드 (xu 및 xv) 및 엣지 (xe) 피처에 대한 RMSE,
- 존재하는 ground truth 엣지 레이블의 음의 자연 로그를 취한 Cross-entropy 손실 (edge_ce) 및 이들 엣지를 예측하면서 예측된 확률을 비교,
- 엣지 피처 RMSE (xe_error) 및 엣지 예측 크로스 엔트로피 손실 (edge_ce)의 가중 조합인 엣지 점수,
- 각 노드에 대한 집계된 엣지 점수로, 해당 노드에 연결된 엣지의 최대값, 최소값 및 합계를 가져옵니다.

# 결론

GraphBEAN은 이상 감지를 위해 Grab에서 설계한 그래프 컨볼루션 네트워크입니다. 이 강력한 모델은 이종 데이터를 처리할 수 있어 노드와 엣지에서 서로 다른 유형의 데이터를 캡처할 수 있습니다. 이 문서는 링크 예측 GCN 모델을 구축하는 6단계를 설명했습니다.

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

모델은 오토인코더와 유사한 아키텍처를 가지고 있습니다. 이는 인코더, 피처 디코더, 그리고 구조 인코더로 구성되어 있습니다.

인코더는 입력된 그래프 데이터를 받아서, 더 낮은 차원의 공간에 학습된 표현을 출력합니다. 피처 디코더는 인코더에서 출력된 값을 사용하여 노드의 피처를 원래의 특징 공간으로 재구성합니다. 구조 디코더는 피처 디코더에서 출력된 값을 사용하여 엣지를 재구성합니다.

재구성된 그래프 구조는 링크 예측에 사용되며, 시그모이드 변환을 거쳐 노드 쌍 사이에 엣지가 존재하는지 여부의 확률을 0부터 1 사이로 출력합니다.

모델 예측은 그라운드 트루스 엣지 레이블과 비교되어 일련의 에러 메트릭을 계산하고, 이를 통해 이상을 식별하는 데 사용됩니다.

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

이제 이질적 데이터를 처리할 수 있는 GCN을 구축하는 방법을 알았으니, 이 모델을 적용할 수 있는 사용 사례에 대해 어떤 것이 생각나시나요? 실제 세계에서 GCN이 어떻게 활용되었는지 본 적이 있나요?

## 인용문

R. Fathony, J. Ng and J. Chen, “Interaction-Focused Anomaly Detection on Bipartite Node-and-Edge-Attributed Graphs,” 2023 International Joint Conference on Neural Networks (IJCNN), Gold Coast, Australia, 2023, pp. 1–10, doi: 10.1109/IJCNN54540.2023.10191331.

## 리소스

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

- 노트북

안녕하세요! 다른 사람들에게 이 주제를 가르치는 데 열정을 가진 데이터 과학자입니다. 주로 Medium에서 파이썬을 사용한 머신러닝, 데이터 과학 및 프로그래밍에 관해 꾸준히 글을 씁니다. 또한 Real Python의 기술 작가입니다.

제 글을 지속적으로 확인하려면 Medium(@ds_claudia_)에서 저를 팔로우하고 무료 이메일 뉴스레터를 구독해주세요. 함께 공부하고 지식을 공유해요! 🚀