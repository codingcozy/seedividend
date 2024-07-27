---
title: "인과 검증과 인과 추론에서 V-구조의 중요성과 그 역할 이해하기"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_0.png"
date: 2024-07-09 20:40
ogImage:
  url: /assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_0.png
tag: Tech
originalTitle: "Understanding V-Structures and the Critical Role They Play in Causal Validation and Causal Inference"
link: "https://medium.com/towards-data-science/understanding-v-structures-and-the-role-they-play-in-causal-validation-and-causal-infrence-7e7910200f9f"
---

<img src="/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_0.png" />

# 소개

인과 추론은 머신 러닝 내에서 부상하고 있는 분야로, 무엇이 발생할 수 있을지 예측하는 것을 넘어서 왜 그렇게 일어날 것인지 설명할 수 있어서 잠재적인 파급 효과를 다루는 것보다 기본적인 문제를 영구적으로 해결하는 약속을 제공합니다.

인과 추론 문제를 해결하려면 “Directed Acyclic Graph” 또는 DAG에 인과 요소들을 시각화하는 것이 필요하며, 일반적으로 체계나 프로세스의 인과 관계에 대한 정보를 갖춘 도메인 전문가가 개발합니다.

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

이 방식의 한 가지 난제는 도메인 전문가들의 견해가 부정확하거나 편향될 수 있다는 것입니다. 정확한 DAG가 없으면 인과 모델의 결과와 출력물이 부정확해져서 효과적이지 않을 수 있습니다. 따라서 DAG가 원인 관계를 정확히 나타낼 수 있도록 하는 과정을 '인과 유효성 검증'이라고 합니다.

인과 유효성 검증 내에서 특정한 문제는 두 변수 사이의 인과 관계 방향을 감지하는 것입니다. 예를 들어, 경영 자격증 공부가 승진을 "유발"하지만, 신규로 승진한 매니저들이 기술을 향상시키기 위해 자격증을 취득하기 시작할 수도 있습니다.

실제 세계에서 사건의 시기나 순서를 확립하는 것이 도움이 될 수 있습니다. 예를 들어, 직원 중 90%가 먼저 공부하고 나중에 승진했다면 인과 관계가 명확해질 것입니다. 하지만 오직 상관 관계를 나타내는 과거 데이터만 있는 경우, 인과 관계 방향이 명확하지 않을 수 있습니다.

## 문제점

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

인과 관계 링크의 방향성을 확인하는 것은 어려우며 보기에 불가능해 보입니다.

## 기회

인과 관계 링크의 방향을 확인할 수있는 알고리즘이 있다면, DAG의 정확성을 향상시키고 이로 인해 인과 모델의 예측에 대한 신뢰를 제공하여 중요한 가치를 더할 수 있습니다.

## 계획

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

DAG(Directed Acyclic Graph) 내에서 특정 종류의 결합인 v-structure은 DAG 내에 존재하는 연결을 나타내는 데 사용할 수 있습니다. 이를 통해 방향이 잘못된 화살표가 있음을 나타내고 이를 수정하기 위해 DAG 내에서 뒤집어져야 하는 위치를 제안하는 데 사용할 수 있습니다.

# 시작하기

## 방향성 비순환 그래프 선택

먼저 기사 전체에서 사용될 완전히 가상의 DAG(Directed Acyclic Graph)를 선택하는 것으로 시작해 보겠습니다. 저는 이 DAG가 테스트에 사용하기 충분히 간단하지만 보다 복잡한 예제에서 발견되는 모든 변형을 포함할 만큼 복잡하다는 이유로 이 DAG가 제일 좋아하는 DAG 중 하나입니다.

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

![Understanding V-Structures and the Critical Role They Play in Causal Validation and Causal Inference](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_1.png)

X는 "치료" 또는 원인이고 Y는 "결과" 또는 효과이며 인과 추론의 목표는 다른 변수들의 효과와 독립적으로 치료가 결과에 미치는 진정하고 고립된 효과를 확인하는 것입니다.

실제 세계에서 X는 새로운 약을 복용하는 것을 나타낼 수 있고, W는 혈압에 미치는 약의 효과일 수 있으며, Y는 환자 결과의 개선일 수 있지만, 예시의 목적을 위해 제가 단순히 문자를 선택했습니다.

## 테스트 데이터 생성

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

실제 예제에서는 데이터 세트로 시작하고 도메인 전문가들이 자신의 전문지식을 활용하여 후보 DAG를 작성하지만, 테스트와 예제에서는 그 반대가 참입니다.

먼저 예제를 설명하는 데 적합한 DAG가 선택되고, 각 노드 사이의 가중치를 무작위로 선택한 다음 해당 가중치를 기반으로 데이터를 생성하여 DAG에 맞게 생성된 데이터 세트가 형성됩니다.

다음은 데이터를 생성하기 위해 선택된 가중치입니다 -

![Data Weightings](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_2.png)

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

다음은 각 노드에 대한 하나의 방정식이 생성되는 구조 방정식 집합을 얻게 됩니다 -

![structural equations](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_3.png)

설명을 완성하기 위해서는 외생 노드/변수와 내생 변수/노드 사이의 구분을 이해하는 것만으로 충분합니다. 외생 노드는 수용하는 인과 화살표가 없습니다. 따라서 위 예제 DAG에서 외생 변수는 Z1과 Z2이며 내생 변수는 X, W, Y, 그리고 Z3입니다. 외생 변수는 값이 무작위로 할당되어야 하며, 일반적으로 분포 규칙을 따라 할당됩니다.

따라서 DAG의 각 노드에 대한 6개의 구조 방정식은 다음과 같이 완전히 설명되고 이해될 수 있습니다..

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

- Z1은 입력이 없는 외생 변수입니다. 평균은 4.75이며 표준 편차는 1.72입니다.
- Z2는 외생 변수로, 평균은 3.29이고 표준 편차는 1.88입니다.
- Z3 = 3 X Z1 + 1.5 x Z2 + 오차 항
- X = 2 x Z1 + 2.5 x Z3 + 오차 항
- W = 3 x X + 오차 항
- Y = 2 x W + 2 x Z2 + 3 x Z3 + 오차 항

이것은 합성으로 생성된 데이터의 미리보기입니다…

![이미지](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_4.png)

# 인과성의 방향을 감지하는 것의 겉으로는 불가능함

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

최근에 쓴 기사에서는 DAG를 통해 되풀이된 경로의 개념을 탐구하고 설명했습니다. 접점으로 이루어진 경로에 대한 개념이 익숙하지 않다면 V-구조의 완전한 이해를 위해 반드시 읽어보세요...

그 토론에서는 "포크" 접점의 탐구와 시작 노드에서 끝 노드까지 메시지가 전달되는 방법에 대해 다루었습니다. 아래 DAG에서 X에서 Y로 Z3를 통해 하이라이트된 접점을 고려해보세요...

![DAG 이미지](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_5.png)

분명히 "메시지"가 Z3에서 Y로 흐를 수 있습니다(Z3의 변화가 Y의 변화를 일으킵니다) 왜냐하면 Y = 3 x Z3입니다. 하지만 접점에 대한 기사에서 설명한대로 X에서도 Z3로 메시지가 흐를 수 있다는 것을 알아두세요.

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

만약 X = 2.5 x Z3이면, Z3 = 1 / 2.5 x X가 되어 X를 해결하기 위해 방정식 양쪽을 2.5로 나눌 수 있습니다.

그러므로 변수 V1과 V2 사이의 관계 또는 승수가 V2와 V1 사이의 승수의 역수일 때, 실제 세계에서 발생하는 어떤 원인 문제에서도 DAG보다 항상 먼저 나오는 데이터만 있을 때 방향을 찾기는 불가능한 것 같습니다.

나는 매우 오랜 시간동안 이 결론에 도달했습니다. 누락된 링크와 잘못된 방향에 있는 DAG의 엣지를 식별하는 데 사용할 수 있는 일부 유효성 검사 규칙을 해결했지만, 링크의 방향성을 증명하기는 불가능하다고 생각했습니다.

V-구조를 사용한 문헌에서 해결책의 깜박거림이 있지만, 그것들은 복잡하고 항상 불완전합니다.

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

이 글의 나머지 부분은 부분적인 해결책들을 탐구하고 결합하여 알고리즘이 개발될 수 있는 지점에 이르기까지, DAG에서 데이터셋과 비교했을 때 잘못된 방향을 가리키는 방향 링크를 감지하는 Python 알고리즘을 개발하는 것을 목표로 합니다.

# 데이터에서 Collider 및 V-구조 식별 (DAG 참조 없이)

교차로에 관한 글에서는 시작 노드와 끝 노드가 중간 노드를 가리키는 교차로들을 설명했으며 예시 DAG의 모든 교차로들을 식별하는 것은 쉽다고 합니다...

![이미지](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_6.png)

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

콜라이더는 특별한 속성을 갖고 있어 이론적으로 독립성 검정을 수행하여 데이터에서 감지할 수 있습니다. 데이터에서 DAG가 표시하는 위치에 콜라이더가 발견되면 DAG의 일부가 올바르다는 것을 증명한 것입니다.

이 아이디어는 통계식으로 표현할 수 있습니다…

![링크](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_7.png)

이 표현은 위의 최종 콜라이더를 살펴보고 다음을 진술하고 있습니다.

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

- 표현 1은 그래프 / DAG에서 Z1이 Z2와 독립적이라고 하는 것은 Z1이 데이터에서도 Z2와 독립적이라는 것을 의미합니다 (G 아래첨자로 표시됨).
- 표현 2는 그래프 / DAG에서 Z2가 Z1과 독립적이라고 하는 것은 Z2가 데이터에서도 Z1과 독립적이라는 것을 의미합니다.

양 측정 ⓵ 및 ⓶이 모두 참이어야 합니다. 왜냐하면 콜라이더는 대칭적이어야 하기 때문입니다. 즉, 메시지는 시작 노드에서 끝 노드로 전달될 수 없으며, 끝 노드에서 시작 노드로 메시지를 전달할 수도 없습니다. 이 조건이 데이터에서 탐지되면 이론적으로 콜라이더가 식별됩니다.

다음 파이썬 코드는 의존성 확인을 수행하며, .dependence() 데이터프레임 확장 메서드의 전체 구현 세부 사항은 해당 기사에서 찾을 수 있습니다...

```js
{'Z1': 'treatment', 'Z3': 'collider', 'Z2': 'outcome'}
데이터에서 V-구조 발견: True
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

이 소식 정말 좋네요! 우리의 DAG는 Z1 -`Z3`- Z2에서 콜라이더 접점이 있어야한다는 것을 나타내고, 간단한 Python 코드 스니펫이 DataFrame 확장 메서드를 사용하여 이것이 사실임을 증명했습니다!

그러나 데이터에서 콜라이더를 감지하는 여정은 여기서 끝나는 것이 아니라 시작입니다.

이론적으로 데이터에 종속성 테스트를 적용하여 DAG에 나타나는 모든 콜라이더를 식별할 수 있어야하지만 항상 그렇지는 않습니다.

시작과 끝 노드가 추가 연결을 가지고 있는 콜라이더가 포함된 다음 간단한 DAG를 고려해보세요...

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

<img src="/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_8.png" />

Y가 X와 독립적일 수 없는 것은 직관적으로 명백합니다. 그들 사이에 콜라이더가 있더라도 "메시지"가 X에서 Y로 직접 흘러갈 수 있기 때문이며, 이 직관적인 결론은 위의 코드를 다시 실행하여 증명할 수 있습니다...

```js
{'X': 'treatment', 'Z': 'collider', 'Y': 'outcome'}
데이터에서 콜라이더 찾음: False
```

콜라이더의 시작 노드와 끝 노드가 양 방향으로 연결된 상황에서는 데이터에 대한 종속성 테스트로 콜라이더의 존재를 증명하거나 반박할 수 없으며, 이로 인해 인접성과 V 구조의 개념이 생기게 됩니다.

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

충돌체는 시작 노드와 끝 노드 사이에 직접 연결이 있는 경우 근접성을 나타내며, 접합부가 연결되지 않은 경우인 극성을 가진 콜라이더로 분류됩니다.

우리의 예제 DAG를 검토해 보면, 5개의 콜라이더 중 2개가 "인접"하며 데이터에서 신뢰할 수 없이 감지할 수 없습니다...

<img src="/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_9.png" />

이로써 이제 근접성을 나타내지 않는 3개의 콜라이더가 남아 있습니다(이를 이제 v-구조체로 알고 있습니다) 이론상 이러한 콜라이더를 데이터에서 의존성 테스트를 사용하여 감지할 수 있습니다...

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

![Here is the output table for the test harness](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_11.png)

위의 Python 코드에서 이미 데이터에서 1번째 v-구조 Z1 -`Z3`- Z2가 식별될 수 있다는 것이 보여졌습니다. 그렇다면 나머지 두 개에 대해서는 어떨까요?

아래 표는 예제 DAG의 모든 접점에 대해 대칭적 종속성 테스트를 적용하는 테스트 해네스의 출력입니다...

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

이 실험 결과에서는 데이터 종속성 테스트가 신뢰할 수 있는 것은 Z1 - Z3 - Z2라는 유일한 v-구조임을 보여줍니다. 우리는 인접한 2개의 콜라이더 및 체인 및 포크에서 테스트가 실패할 것으로 예상했지만, 이 테스트의 예상 결과는 3개의 v-구조를 식별하는 것이었습니다.

이 결과를 이해하기 위해서는 데이터에서 올바르게 식별되지 않은 2개의 v-구조를 더 자세히 조사하고, 그들이 직접적으로 연결되어 있지 않음에도 불구하고 (즉, 인접하지 않음), 오픈 백도어 경로를 통해 간접적으로 연결되어 있음을 깨닫는 것이 필요합니다.

W - Y - Z3에서의 콜라이더를 살펴보고, 시작 노드 W와 끝 노드 Z3 사이의 백도어 경로를 검토해 봅시다...

![이미지](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_12.png)

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

W -`Y`- Z3는 충돌체이며 또한 v-구조체입니다. 이는 인접하지 않지만 시작 노드와 끝 노드 사이에 2 개의 백도어 경로가 존재하기 때문입니다. 따라서 이러한 노드 간에 "메시지"가 유출되어 데이터에서 이 v-구조체를 감지하기가 불가능하게 만듭니다 (또는 적어도 일관성이 없고 신뢰할 수 없게 만듭니다).

W -`Y`- Z2는 W `- X `- Z3 -` Z2로부터 백도어 경로로 인해 정확히 동일한 문제가 발생합니다.

현재 충돌체, v-구조체 및 인과 유효성 검사 여정에서 거의 포기할 뻔했지만, 데이터에서 v-구조체를 감지할 수 없다면 신뢰할만한 유효성 검사를 구축할 수 없습니다.

그러나 이 문제에 대한 해결책이 있습니다. 이것은 사용 가능하고 유용한 정확성 및 신뢰성을 갖춘 알고리즘을 생성하는 궁리의 방법입니다…

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

# 인과 링크 방향 감지를 위한 알고리즘 정의

다음과 같은 v-구조의 정의가 주어졌을 때...

...데이터에 존재하는 링크를 식별하기 위한 알고리즘은 다음과 같이 정의될 수 있다...

- DAG 내 모든 엣지 주변을 반복하고 각 엣지에 대해...
- 현재 엣지를 뒤집어 새로운 DAG를 생성합니다.
- v-구조가 파괴되었고 해당 v-구조가 데이터에 존재하지 않으면 현재 DAG가 잘못되었고 엣지를 뒤집어야 합니다.
- v-구조가 생성되었고 해당 v-구조가 데이터에 존재하면 현재 DAG가 잘못되었고 엣지를 뒤집어야 합니다.

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

## 단계 1: 모든 간선을 반복하는 중

알고리즘의 첫 단계는 DAG(Directed Acyclic Graph; 방향성이 있는 비순환 그래프)의 모든 간선을 반복할 것입니다. 이는 다음과 같이 시각화될 수 있습니다...

![DAG](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_13.png)

## 단계 2: 현재 간선을 뒤집어 새 DAG 만들기

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

가정하에 여러분이 첫 번째 반복 단계에 있다고 가정합니다 (Z2 -` Z3의 엣지를 뒤집는 경우). 이 엣지를 역전시킨 결과, 원본 및 뒤집기로 인해 생성된 변형 2개의 DAGs가 생깁니다...

<img src="/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_14.png" />

## 단계 3: V-구조가 파괴된 경우...

Z2 -` Z3를 뒤집는 것은 원래 DAG에 존재하는 V-구조를 파괴(또는 제거)했다는 것을 의미합니다. 왜냐하면 V-구조인 Z1 -` Z3 `- Z2가 Z1 -` Z3 -` Z2 체인에 의해 대체되었기 때문입니다.

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

파괴된 v-구조 Z1 -`Z3`- Z2은 데이터에서 종속성 테스트를 사용하여 지금 테스트 될 수 있습니다.

- 데이터에서 해당 v-구조를 발견하면 Z2 -` Z3의 방향성이 DAG에서 올바르다.
- 데이터에서 해당 v-구조를 찾을 수 없으면 Z2 -` Z3의 방향성이 DAG에서 잘못되었으며 뒤집어져야 합니다.

이 파이썬으로 구현된 테스트입니다...

```python
v-structure found in data: True
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

데이터에서 충돌체인 Z1 -`Z3`-Z2가 확인되었습니다. 따라서 Z2 -`Z3의 역전 제안은 잘못되었습니다. 알고리즘은 이제 다음 단계로 진행됩니다...

## 단계 4: V-구조가 생성된 경우...

첫 번째 반복 즉, 엣지 Z2 -` Z3의 반전은 새로운 v-구조를 만들지 않기 때문에, 이제 X -` W 엣지를 반전하는 두 번째 반복으로 빨리 진행하겠습니다...

![이미지](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_15.png)

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

X -` W를 반전한 결과 새로운 DAG에 두 개의 v-structure가 생성되었습니다...

- Z1 -` Z -` W 체인은 Z1 -`X`- W v-structure로 대체되었습니다.
- Z3 -` X -` W 체인은 Z3 -`X`- W v-structure로 대체되었습니다.

이러한 새로운 v-structure들을 테스트해보고 데이터에서 식별된다면, DAG의 기존 엣지 X -`W가 잘못된 방향으로 되어있으며 변경하여 X`- W로 수정되어야 합니다.

```js
데이터에서 발견된 v-structure: False
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
데이터에서 발견된 V-구조: 거짓
```

데이터에서 V-구조가 발견되지 않아 X-W의 방향성에 대한 기존 DAG가 정확하다는 증거를 제공했으며, 이는 예상된 결과입니다.

## 반복 작업 완료

우리는 데이터가 DAG와 일치함을 알고 있습니다. 이 데이터는 합성되어 DAG와 일치하도록 생성되었기 때문에 각 edge reversal 테스트가 DAG가 올바른지 확인해야 합니다.

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

현재 완전히 작동한 두 가지 에지가 이를 증명했는데, 이것은 알고리즘이 작동 중이며 방향성을 증명하는 목표에 도달했다는 것을 의미합니까?

## 생성 / 파괴된 V-구조 알고리즘의 주요 문제

이 목표가 달성되었는지 확인하려면 알고리즘을 사용하여 생성 / 파괴된 v-구조 규칙을 사용하여 각 에지의 반전을 테스트해야 합니다.

안타깝게도 알고리즘이 모든 에지를 돌 때 예상대로 작동하지 않습니다. 에지 W - Y에 도달하면 방향성이 잘못되었다고 오해하고 뒤집어야 한다 판단합니다...

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

첫 번째 단계, 즉 생성된 v-structures를 고려하는 단계가 예상대로 작동합니다...

![image](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_16.png)

이 새로운 v-structure는 데이터에서 감지되지 않기 때문에 알고리즘의 이 단계는 데이터가 현재 DAG와 일치한다고 정확히 예측합니다.

알고리즘의 다음 단계는 W -` Y를 역전시키면 W -` Y `- Z2와 W -` Y `- Z3 두 개의 v-structure가 파괴된다는 사실을 확인합니다...

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

```json
{
  "dependency_tests_results": [
    {
      "description": "When the dependency tests are executed on the data for these two destroyed v-structures the actual results do not match the expected results",
      "v_structure_found_in_data": "False"
    },
    {
      "v_structure_found_in_data": "False"
    }
  ]
}
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

## 문제에 대한 제안된 해결책

두 경우 모두 v-구조가 데이터에 존재하는 것으로 알려져 있지만 의존성 테스트는 이를 찾지 못해 알고리즘이 W -` Y의 제안된 반전이 유지되어야 하며 현재 상황에서 DAG가 잘못되었다고 결론을 이끌었습니다.

결과를 더 자세히 살펴보면 두 경우 모두 독립성이 한 방향으로 발견되었지만, 다른 방향으로는 발견되지 않았으며, v-구조가 대칭이어야 함이 밝혀졌으므로 테스트가 실패했습니다.

테스트 실패의 근본적인 이유는 이미 위 섹션에서 탐구되고 설명되었으며, 시작 및 종단 노드 사이에 backdoor 경로가 존재하여 메시지가 누출되어 독립성 테스트에 실패한다는 것이었습니다.

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

처음으로 이 결론을 도출했을 때는 Directed Acyclic Graphs에서 반대 방향 링크를 감지하는 유용한 알고리즘을 설계하고 개발할 시도에 거의 포기할 뻔했습니다. 그때는 이게 가능한 일처럼 보이지 않았어요.

현재 정의된 알고리즘은 손상된 v-구조가 백도어 경로를 가지고 있을 경우 유효한 DAG(데이터와 일치하는)임을 증명하지 못할 것이며, DAG를 확인할 수 없다면 알고리즘은 분명히 쓸모가 없을 것입니다.

"파괴된 v-구조"의 정의를 바꿔서 백도어 경로가 존재하는 경우를 제외해 보았는데, 처음에는 유망해 보였지만 유효한 DAG가 유효하다는 것을 입증하는 데에는 작동하지만, 유효하지 않은 DAG가 유효하지 않다는 것을 증명할 때 전혀 작동하지 않았습니다. 불허용할 만큼 많은 거짓 양성을 감지했죠.

결국 저는 사용 가능한 문헌들에서 인과 발견에 관해 읽고 기반을 두기로 결심했습니다.

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

인과적 검증이 어려울 때, 인과 관계 발견은 더 어렵습니다. 인과적 검증은 데이터셋에 대한 DAG를 검증하려는 시도이며, 도메인 전문가들이 높은 수준의 전문 지식을 갖고 있다고 가정한다면 DAG는 올바를 가능성이 높고, 과제는 잠재적인 오류를 식별하는 것뿐입니다.

그러나 인과 관계 발견의 아이디어는 어떤 DAG도 시작하지 않고 데이터셋만으로 역공학을 시도하는 것입니다. 이는 많은 순열을 포함하는 복잡한 과제이며, 문헌에서 설명된 전략 중 하나는 완전히 빈 DAG로 시작하는 대신 도메인 전문가들이 확신을 갖고 있는 일부 엣지를 확인함으로써 발견 알고리즘이 수행해야 할 작업을 줄이는 것입니다.

예를 들어, DAG의 노드는 완전히 가공된 것이지만 X가 새 약인 것으로 가정하고, W가 혈압의 긍정적인 변화이며, Y가 환자 발견인 것으로 생각한다면 이러한 노드의 방향이 잘못되었을 가능성은 낮습니다.

예를 들어, 환자의 회복이 혈압의 변화를 유발할 수 있습니까? (가능성은 낮지만 불가능하지는 않음) 혈압이 환자가 약을 복용하도록 유도할 수 있습니까? (매우 낮음)

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

그리고 합리적으로 추론할 수 있는 다른 결론들이 있습니다. 변수 B가 변수 A보다 나중에 발생하는 시간(또는 시간)적 측면이 있는 곳에서는 그것의 원인이 될 수 없습니다.

예를 들어, 운동 빈도수가 하나의 데이터 포인트고 다른 하나는 일반 건강이라면 더 건강한 사람들이 더 많은 운동을 했는지 또는 더 많이 운동하는 사람이 더 건강해졌는지에 대한 논의가 있을 수 있습니다. 그러나 운동 빈도가 건강이 개선되기 전에 증가했다는 명백한 증거가 기록되어 있다면 방향성이 입증됩니다.

또한 치료와 결과에 대한 추론을 할 수 있습니다. 일반적으로 치료가 사건을 발생시키고 효과는 사건에 의해 발생됩니다 (그렇지 않을 때도 있음).

따라서 데이터에서 backdoor 경로를 갖는 v-구조를 식별할 수 없는 능력의 문제는 알고리즘에게 몇 가지 엣지의 확실성에 대해 지시하여 올바르다고 가정되는 엣지들 중 일부에 대해 테스트되지 않을 것이기 때문에 최소화될 수 있다는 결론입니다.

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

위의 변경 사항을 적용하고 알고리즘에 W -` Y가 정확하다는 힌트를 제공하여 결과가 극적으로 개선되었습니다.

예제 DAG와 일치하는 100개의 데이터 세트를 무작위로 생성하는 테스트 하네스는, 알고리즘이 탐색을 시작하기 전에 W -` Y가 힌트로 제공되었다면 100%의 경우에 DAG가 데이터와 일치한다고 정확하게 식별했습니다.

# 검증 알고리즘의 추가 테스트

따라서 동일한 예제 DAG에 대해 수행된 테스트는, 알고리즘이 지나치게 높거나 낮은 성능을 발휘하는 원인이 되는 몇 가지 특이한 특징이 포함되어 있을 수 있을 것입니다. 여기에는 테스트 결과를 확대하는 알고리즘의 정의가 있습니다...

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

- DAG를 테스트하려고 선택하세요.
- 엣지 가중치와 구조 방정식을 사용하여 데이터와 일치하는 인과 관계를 갖는 합성 데이터 세트를 생성하세요.
- 에지 확정이 없는 상태에서 검증 알고리즘을 실행하세요 (즉, 해당 데이터와 DAG가 일치하는지 올바르게 확인하는 원형 형태로).
- 2단계로 돌아가서 DAG와 일치하는 100개의 서로 다른 데이터 세트의 무작위 생성을 반복하세요.
- 알고리즘이 DAG가 데이터와 일치함을 올바르게 확인한 경우에 해당하는 테스트 통과의 총합을 합산하세요.
- 결과를 백분율로 표시하세요.

기본 DAG

![기본 DAG 이미지](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_18.png)

저는 "삼각형 DAG", "사다리꼴 DAG", "E-모양 DAG"라고 하는 추가 테스트 DAG들이 모두 추가 힌트 없이 100%의 테스트 케이스에서 추가 테스트를 통과했다고 말할 수 있습니다.

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

복잡한 DAG

![Complex DAG](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_19.png)

이 더 복잡한 DAG는 테스트 케이스의 90%를 통과하지만 약 10%에서 Z - W 및 Uw - W 엣지가 잘못된 방향으로 식별된다.

그러나 이 두 엣지를 힌트로 설정하면 테스트 통과율이 100%로 돌아갑니다.

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

DAG 복잡도 증가하기

![DAG 복잡도 증가하기](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_20.png)

추가 노드/변수 (Ut 및 T) 및 추가 경로를 추가하여 복잡성을 증가하면 테스트 결과가 저하될 수 있습니다.

알고리즘은 테스트 케이스의 30%에서 유효성을 올바르게 판단하며 Z -` W, Uw -` W, T -` Y 및 Uy -` Y의 간선이 다양한 테스트에서 잘못 식별되어 뒤집어져야 한다고 나타났습니다.

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

다시 한 번 이러한 4가지 엣지가 힌트로 주어지면 모든 테스트가 100% 통과됩니다.

최대 DAG 복잡성

![image](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_21.png)

마지막 테스트는 9개의 노드/변수, 16개의 엣지, 모든 유형의 접점 및 관측되지 않은 혼입 변수 (노드 C)를 포함한 가장 복잡한 예제 DAG입니다.

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

이 DAG의 테스트 중 100%가 실패합니다. 테스트는 위 다이어그램의 엣지 중 하나 (B -` X, G -` X, 또는 E -` X)를 역전해야 한다고 식별합니다.

그러나 이러한 3개의 엣지가 힌트로 주어지면 이렇게 복잡한 DAG도 100%의 테스트 케이스를 통과할 수 있습니다.

## 테스트에서 배운 점

테스트에는 패턴이 분명히 있습니다. 간단한 DAG는 100% 신뢰성으로 실행되며, DAG가 더 복잡해지면 역전이 필요한 잘못된 엣지를 식별하기 시작하고 알고리즘에 힌트를 제공하여 더 많은 도움이 필요합니다.

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

결과에 따르면 알고리즘이 완벽하지는 않지만 성능은 충분히 높아 유용하고 사용하기에 적합합니다. 특히, 도메인 전문가들이 도와 만든 DAG의 맥락에서 힌트가 제공되는 경우에 특히 그렇습니다.

그렇다면 이제 끝인가요? 데이터의 역방향 엣지를 표현하는 DAG가 올바르게 나타내는지 감지할 수 있는 알고리즘의 탐색에서 승리를 선언할 수 있을까요?

아쉽지만, 실제로는 아직 절반도 되지 않았습니다. 지금까지 이룩된 것은 데이터와 일치하는 DAG를 (수용할 만한 정확도로) 감지하는 알고리즘이지만, 더 어려운 도전은 DAG가 데이터와 일치하지 않는 경우의 알고리즘을 테스트하는 것입니다.

# 데이터를 정확하게 반영하지 않는 DAG의 오류 감지

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

이 사용 사례를 설명하기 위해 원래의 예제 DAG를 검토해 보겠습니다. 도메인 전문가들이 W - Y 엣지에 대해 충분한 확신을 제공했지만 Z1-Z3 엣지를 잘못 식별했다고 가정하겠습니다.

다음은 알고리즘의 테스트 결과입니다...

![Test Results](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_22.png)

이는 매우 유망한 시작입니다. 알고리즘은 데이터와 일치하지 않는 DAG를 올바르게 식별했으며 어떤 엣지가 잘못되었는지도 정확히 식별했습니다!

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

알고리즘이 이 반전을 올바르게 식별한 것은 놀라운 일이 아닙니다. 왜냐하면 DAG(Directed Acyclic Graph)에서 유일한 백도어 경로가 없는 단일 v-structure인 Z1 -`Z3`- Z2를 찾을 수 있기 때문입니다. 따라서 "작성된 v-structure" 테스트는 이 데이터를 올바르게 작동하도록 바운드(제한)되어 있습니다.

다음 단계는 DAG의 모든 엣지를 반전하여 알고리즘의 성능을 관찰하는 것입니다.

Z1 -` X, Z2 -` Y, Z3 -` Y 엣지는 테스트되지 않았음을 유의해 주세요. 이러한 반전은 각각 순환을 가진 DAG를 생성하므로(즉, 치료로 되돌아가는 루프가 있는) 이는 정의상 허용되지 않습니다.

다음은 남은 테스트로, 이미 Z1 -` Z3가 테스트되었음을 유의하십시오. 3가지 테스트는 비순환 DAG를 생성하고 W -` Y는 알고리즘에 올바르다고 암시되었기 때문에 제외됩니다.

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

- Reverse X -` W
- Reverse Z2 -` Z3
- Reverse Z3 -` X

![image](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_23.png)

결과는 혼재되어 있습니다. 이 알고리즘은 데이터의 유효한 표현이 아님을 올바르게 식별하고, 테스트 케이스의 100%에서 의도적으로 반전된 엣지를 선택합니다.

안타깝게도 알고리즘은 항상 과대식별을 합니다. 즉, 반전되어야 하는 엣지를 선택하는 것 외에도 사실 올바른 엣지를 식별합니다.

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

다른 테스트 DAG들과 유사한 이야기입니다.

의도적으로 뒤집힌 엣지가 발견되었습니다만 유효한 다른 엣지들도 발견되었습니다. 과도한 식별이 발생하는 이유는 단일 엣지가 잘못된 방향으로 되어있는 경우, 전체 DAG가 균형을 잃게 되어 데이터와 만들어진 엣지 테스트가 잘못 실행될 수 있기 때문입니다

그렇다면 이 모든 노력 끝에 우리는 여전히 DAG에서 잘못된 엣지를 식별할 수 없다는 의미일까요?

# "하이브리드 엣지 뒤집기 탐지 알고리즘"에 대한 제안

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

먼저 여기서 포기하기 전에 명백한 사실 몇 가지가 있습니다...

- 알고리즘은 DAG가 유효한지 인식하는 데 뛰어나며 (복잡한 DAG의 경우 높은 신뢰도 링크에 대한 힌트를 제공해야 할 수 있음에 유의해야 합니다).
- 알고리즘은 역전된 엣지를 감지하는 데 능숙하며 (다른 유효한 링크도 역전되어야 한다고 제안할 수 있음에 유의해야 합니다).

따라서 해결책은 기본 알고리즘을 확장하여 내가 '하이브리드 엣지 역전 감지 알고리즘'이라고 부르는 것으로 만드는 것입니다.

- 기본 알고리즘을 통과하면 (즉, DAG가 데이터와 일치한다고 결론 지었을 때) 여기서 멈춥니다.
- 기본 알고리즘이 실패하면 (즉, DAG가 유효하지 않다고 선언했을 때) 역전된 엣지의 모든 가능한 순열을 반복하고 각 순열을 테스트하여 기본 알고리즘이 통과되는지 확인합니다.
- 알고리즘이 유효하다고 결론 내린 각 DAG를 DAG에서 오류가 있는 것으로 알려진 DAG에 대한 가능한 수정 사항으로 제시합니다.

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

인과 문헌에서 이 방법을 본 적이 없습니다. 이것은 저의 결론으로, 수많은 시간을 투자하여 테스트 결과를 분석한 결과입니다. 이 방법은 100% 정확하지는 않지만 명확하게 사용 가능하고 유용한 결과를 얻을 수 있습니다.

이 결과는 매우 유용하며, 인과 모델의 입력으로 잘못된 DAG가 사용되어 모델링 및 머신러닝 결과와 결론이 무효화될 가능성을 방지했습니다.

## 혼합 에지 역전 감지 알고리즘 평가

V-구조를 이해하는 데서부터 관련 데이터셋과 비교했을 때 DAG에서 역전된 엣지를 감지하는 사용 가능한 알고리즘을 만드는 데의 오랜 여정이 이제 완료되었습니다. 이제 남은 일은 하이브리드 알고리즘을 테스트하여 어떻게 수행되는지 확인하는 것뿐입니다.

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

표준 예제 DAG

![image](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_24.png)

먼저 테스트할 DAG는 이 기사의 주요 내용으로 사용된 우리의 옛 친구입니다.

가장자리 W -` Y가 암시되었으며 몇 가지 가장자리는 역을 취해도 비순환 그래프가 생성되지 않기 때문에 테스트할 수 없습니다 (Z1 -` X, Z2 -` Y 및 Z3 -` Y). 그렇게 되어 데이터에서 역전시킬 수 있는 4개의 가장자리가 남는데, 그것은 (X -` W, Z1 -` Z3, Z2 -` Z3 및 Z3 -` X)입니다.

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

다음은 결과입니다 -

- DAG가 4개 중 4개의 테스트에서 올바르게 무효로 식별되었습니다 (100.0%).
- 4개 중 4개의 테스트에서 모든 역전파가 발견되었습니다 (100.0%).
- 4개 중 1개의 테스트에서 잘못된 양성이 발견되었습니다 (25.0%).

이러한 결과는 매우 유망합니다. 역전된 엣지는 모든 경우의 100%에서 정확하게 식별되었지만, 알고리즘은 테스트 중 하나에서 잘못된 양성을 과도하게 식별했습니다.

다음 단계는 데이터에서 2개의 엣지 조합을 임의로 선택하여 역전시킨 뒤 알고리즘이 DAG에서 여러 오류를 감지할 수 있는지 확인하는 것입니다. 다음은 결과입니다 -

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

- 8/10 테스트에서 올바른 DAG를 80.0%로 정확하게 식별했습니다.
- 모든 반전이 6/10 테스트에서 발견되었습니다 (70.0%).
- 7/10 테스트에서 잘못된 양성 결과가 발견되었습니다 (70.0%).

2개의 엣지가 반전되어 성능이 저하되었지만 결과는 여전히 데이터 팀에게 DAG가 올바르지 않음을 알려 주며 오류가 어디에 있는지 소중한 지표를 제공할 것입니다.

3개의 엣지를 반전해도 유용하고 활용도 높은 결과가 생성됩니다...

- 15개 중 14개 테스트에서 올바른 DAG를 93.3%로 정확하게 식별했습니다.
- 15개 중 7개 테스트에서 모든 반전이 발견되었습니다 (46.7%).
- 15개 중 14개 테스트에서 잘못된 양성 결과가 발견되었습니다 (93.3%).

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

다음은 트라페조이드 DAG에 대한 정보입니다.

![Trapezium DAG](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_25.png)

트라페조이드 DAG에는 3개의 단일 엣지 반전이 있습니다(즉, 다른 경우는 acyclic DAG를 생성합니다). 시험 결과는 다음과 같습니다.

- DAG는 3개의 테스트 중 2개에서 올바르게 유효하지 않음으로 식별되었습니다(66.7%).
- 모든 반전은 3개 테스트 중 2개에서 발견되었습니다(66.7%).
- 잘못된 양성 결과는 3개 중 1회에서 발견되었습니다(33.3%).

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

이 결과들은 표준 예시 DAG만큼 좋지 않지만, 알고리즘은 여전히 테스트 케이스 중 66.7%에서 엣지를 잘못된 방향으로 식별합니다.

다트형태 DAG에서 2개의 엣지를 뒤집는 테스트 결과는 다음과 같습니다 -

- DAG가 5개 중 4개의 테스트에서 올바르게 무효로 식별됨 (80.0%)
- 모든 역전이 5개 테스트 중 0개에서 발견됨 (0.0%)
- 거짓 양성이 5/5 테스트에서 발견됨 (100.0%)

E-자형태 DAG

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

![image](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_26.png)

7개의 가능한 단일 엣지 반전 테스트가 있고, 테스트 결과는 다음과 같습니다...

- DAG는 7개 중 6개에서 올바르게 무효로 식별됨 (85.7%)
- 7개 중 6개에서 모든 반전 찾음 (85.7%)
- 거짓 양성은 7개 중 1개에서 발견됨 (14.3%)

이 DAG에는 이전 예제보다 적은 인접 및 백도어 콜라이더가 있습니다. 따라서 더 나은 성능을 기대할 수 있으며 테스트 결과는 정말로 매우 좋습니다!

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

2개의 엣지 역전을 감지하는 결과도 매우 좋습니다...

- DAG는 10/10 테스트에서 올바르게 잘못된 것으로 식별되었습니다 (100.0%)
- 모든 역전은 10개 중 8개의 테스트에서 발견되었습니다 (80.0%)
- 거짓 양성은 10개 중 2개의 테스트에서 발견되었습니다 (20.0%)

The Complex Exogenous DAG

![Complex Exogenous DAG](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_27.png)

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

다음은 단일 엣지 반전에 대한 테스트 결과이며, 외생적인 "inputs"이 힌트로 제공됩니다 (연한 파란색으로 표시됨).

- DAG는 6개 중 6개의 테스트에서 올바르게 식별됨 (100.0%)
- 모든 역전이 6개 중 6개의 테스트에서 발견됨 (100.0%)
- 거짓 양성은 6개 중 0개의 테스트에서 발견됨 (0.0%)

2개의 역전 결과:

- DAG는 10개 중 10개의 테스트에서 올바르게 식별됨 (100.0%)
- 모든 역전이 10개 중 10개의 테스트에서 발견됨 (100.0%)
- 거짓 양성은 10개 중 0개의 테스트에서 발견됨 (0.0%)

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

그리고 역방향 간선이 3개인 경우에는...

- DAG는 10/10 개의 테스트에서 올바르게 무효로 식별됨 (100.0%)
- 모든 역전이 10/10 개의 테스트에서 발견됨 (100.0%)
- 거짓 양성 0/10 개의 테스트에서 발견됨 (0.0%)

이 DAG에 대한 테스트 결과는 놀라운데요; 알고리즘이 1, 2 또는 3개의 방향성 오류가 있는 DAG의 경우 100% 정확도로 오류를 올바르게 식별합니다!

그러나 3개의 역전 테스트의 실행 속도가 문제가 됩니다. 최종 테스트에서 상세히 다룰 예정이니 기대해주세요...

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

슈퍼 복잡한 현실 세계 DAg

![image](/TIL/assets/img/2024-07-09-UnderstandingV-StructuresandtheCriticalRoleTheyPlayinCausalValidationandCausalInference_28.png)

슈퍼 복잡한 DAG는 B -` X, E-` X 및 G -` X로 테스트되기 전에 힌트가 있었습니다.

단일 엣지 전환 테스트 결과는 다음과 같습니다...

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

- DAG이 2/3 테스트에서 올바르게 무효로 식별되었습니다 (66.7%)
- 2/3 테스트에서 모든 반전이 발견되었습니다 (66.7%)
- 거짓 양성이 1/3 테스트에서 발견되었습니다 (33.3%)

2개 엣지 반전에 대한 결과:

- DAG이 5/5 테스트에서 올바르게 무효로 식별되었습니다 (100.0%)
- 1/5 테스트에서 모든 반전이 발견되었습니다 (20.0%)
- 거짓 양성이 4/5 테스트에서 발견되었습니다 (80.0%)

그리고 3개 엣지 반전에 대해서...

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

- DAG이 6개 중 5개(83.3%)의 테스트에서 올바르게 식별되지 않음을 발견했습니다.
- 모든 반전은 6개 중 1개(16.7%)의 테스트에서 발견되었습니다.
- 거짓 양성은 6개 중 5개(83.3%)의 테스트에서 발견되었습니다.

이 DAG에 대한 결과가 그다지 유망하지 않았으며, 테스트 속도도 우려스러웠습니다.

# 결론 — 무엇을 배웠는가?

제안된 데이터 집합을 표현하는 DAG에서 화살표의 올바른 방향을 자동으로 감지하기 어려웠습니다. 왜냐하면 y = 3x이면 x = 1/3y이므로 양방향에 계수 / 기울기 (3 또는 1/3)가 있기 때문에 올바른 방향을 감지하는 것이 불가능합니다.

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

DAG는 처리와 결과 사이의 경로로 구성되어 있으며, 각 경로는 chain(연쇄), fork(포크) 및 collider(충돌체) 중 하나에 해당하는 접합체로 이루어져 있어요.

v-구조는 서로 인접하지 않는 collider의 부분 집합이라는 것이 보여지며, 이 구조는 데이터에서 종속성 테스트를 사용하여 (독특하게) 식별될 수 있다는 것이 증명되었습니다. 이는 방향성 감지 문제를 해결하는 열쇠를 제공하지만, back-door paths(보조 경로)는 모순된 결과를 초래할 수 있어요.

따라서, 전통적인 Pearlean 역방향 검출 알고리즘이 일관되고 신뢰할 수 없다는 것이 밝혀졌어요. DAG가 데이터와 일치하지 않을 때 정확하게 식별할 수 있으며, 하나의 엣지가 잘못된 경우 그 역방향 엣지를 가리킬 때 성공을 얻을 수도 있어요. 하지만, 2개 이상의 엣지가 올바르지 않은 방향 또는 DAG가 복잡한 경우 올바르게 잘못된 엣지를 식별하지 못해 사용할 수 없는 것처럼 보이기도 해요.

전통적인 Pearlean 알고리즘은 잘못된 DAG를 감지하는 데 사용하는 것으로 개선될 수 있으며, 그런 다음 유효한 DAG를 생성하는 데 필요한 최소 역전을 찾기 위해 모든 역전을 시도할 수 있는 하이브리드 알고리즘과 결합하여 오류의 위치를 정확히 파악할 수 있는 좋은 지표를 제공할 수 있어요.

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

알고리즘은 완벽하지 않지만 일부 엣지에 대한 확실성 힌트(즉, 확실하게 알려진 일부 엣지)가 제공된다면 정확도(즉, 역전된 엣지를 정확하게 식별하는 퍼센트)는 충분히 높아서 도메인 전문가들이 제안한 DAG를 확인하고 분석하며 수정하는 데 사용할 수 있습니다.

역전된 엣지를 감지하는 어떤 알고리즘도 절대 완벽할 수 없습니다. 데이터 집합을 정확하게 나타낼 수 있는 여러 개의 DAG가 있으며 또한 알고리즘의 기초가 되는 의존성 테스트가 100% 정확하지 않기 때문입니다.

정확도 이상으로, 퍼포먼스 면에서 하이브리드 알고리즘의 처리 시간이 기하급수적으로 저하됩니다.

5개의 엣지를 가진 DAG는 2의 5승 또는 32개의 역전 조합을 탐색할 수 있지만 16개의 엣지는 2의 16승 또는 65,536개의 역전 가능한 조합이 있습니다. Python은 해석 방식의 프로그래밍 언어이므로 이러한 많은 조합을 실행하는 데 많은 시간이 걸릴 수 있습니다.

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

위 단점을 감안해도, 제안된 DAG의 역방향 엣지를 데이터셋과 비교하여 감지하는 것이 절대적으로 정확하지는 않을 수 있다는 점을 받아들이더라도, 혼합 알고리즘은 사용 가능하고 유용한 수준의 정확성을 갖추고 있습니다.

마지막으로 혼합 엣지 역전파 감지 알고리즘은 인과적 검증의 중요한 부분인 신뢰할 수 있는 결과물을 얻는 데 큰 가치가 있는 도구입니다. 이를 통해 인과 추론 모델의 결과가 정확하며 조직적 영향과 결과에 자신감을 갖고 활용할 수 있습니다.

# 소통하고 연결하세요...

이 기사를 즐겼다면 앞으로의 기사 소식을 받아보기 위해 저를 팔로우해주세요.

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

만약 인과 추론과 데이터 과학의 이 흥미로운 새로운 분야에 대한 생각이나 의견이 있다면, 알려주세요. 메시지를 남겨주시면 연락드리도록 하겠습니다.

내 이전 기사를 확인하려면 내 연구와 인과 추론에 관한 모든 것을 하나로 모아놓은 이 웹사이트의 이전 기사를 빠르게 살펴보세요 — 데이터 블로그.
