---
title: "Python의 가장 강력한 데코레이터"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-PythonsMostPowerfulDecorator_0.png"
date: 2024-07-13 20:21
ogImage: 
  url: /TIL/assets/img/2024-07-13-PythonsMostPowerfulDecorator_0.png
tag: Tech
originalTitle: "Python’s Most Powerful Decorator"
link: "https://medium.com/towards-data-science/pythons-most-powerful-decorator-6bc39e6a8dd8"
---


![파이썬의 강력한 데코레이터](/TIL/assets/img/2024-07-13-PythonsMostPowerfulDecorator_0.png)

@property는 파이썬에서 제일 좋아하는 데코레이터입니다. 여러 해 동안 파이썬을 사용해왔는데, 매년마다 언어에 대한 전문 지식과 편안함이 조금씩 쌓여왔어요. 이렇게 오랜 기간 동안 배운 기술과 트릭 가운데, property 데코레이터는 두드러지는 효과를 발휘했습니다. 이 데코레이터는 복잡한 문제 해결을 도와주고 깔끔하고 효율적이며 우아한 코드를 작성하는 데 지속적으로 도움을 주고 있어요.

@property 데코레이터는 클래스 속성과 상호작용하는 방식을 향상시키는 엄청난 기능입니다. 속성을 연결하고 의존성을 만드는 강력한 방법이 될 수 있어요. 이 초보자 친화적인 안내서에서 속성의 기본 개념을 탐구하고 클래스를 강화하기 위해 5가지 다른 방법에 대해 알아볼 거에요. 또한 데이터 과학과 기계 학습 분야의 실용적인 예제를 통해 이해를 더욱 견고하게 할 거예요.

팁: 파이썬 애호가에게 처음으로 속성을 소개할 때 그들 눈 속에서 반짝임을 볼 때 너무 흥분돼요. 처음 알게 될 때도 그대로 반짝이길 바래요! 이미 경험 많은 개발자이고 개념에 익숙하다면, 이 포스트에서 새로운 것을 발견했으면 좋겠어요. 어찌되었든, 설명이 더 잘 될 수 있는 부분이 있거나 놓칠법한 중요한 사용 사례가 있다면 댓글에서 알려주시면 감사하겠습니다.

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

# 속성 간단 안내서

한 마디로 말하자면, 파이썬에서 속성(property)은 객체의 특정 측면에 대한 제어된 액세스를 허용하는 특수한 속성입니다. 다음과 같이 이름과 클래스라는 두 가지 간단한 속성을 정의하는 학생(Student) 클래스를 고려해보십시오. 우리는 인스턴스화하고 다음과 같이 이름 속성에 액세스할 수 있습니다:

학생의 이름을 요청하고 이름 속성에 액세스하여 출력할 수 있습니다. 모두 좋습니다! 이제 학생들에게 이름을 요청할 때마다 일어서도록 강제하고 싶다고 상상해보십시오. 다음과 같이 속성 데코레이터를 사용하여 코드를 다시 포매팅함으로써 쉽게 이를 달성할 수 있습니다:

여기서 @property를 사용하여 이름 속성에 액세스하기 전에 추가 작업을 할 수 있었습니다! 이름 속성의 기술용어는 getter입니다: 속성을 "가져오기"하기 전에 작업을 수행할 수 있는 방법이라고 생각해보세요.

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

기본적으로 속성은 Python에서 getter 메서드를 생성할 수 있게 해주는 바로가기로 생각할 수 있어요. 객체에 대한 정보를 안전하게 접근할 수 있는 방법을 제공해줍니다. @property를 통해 구현된 getter 메서드를 통해 비공개 또는 보호된 속성에 안전하게 접근할 수 있게 됩니다. 위 예시에서 볼 수 있듯이, "비공개" 속성 _name을 정의하고 getter 메서드인 name 속성을 통해 접근하고 있어요.

속성의 가장 중요한 기능은 속성을 읽기 전용으로 만들어 값을 덮어쓰기하는 것을 막는다는 점이에요. 아래 예시를 살펴보세요:

name이 속성으로 설정되어 있기 때문에 보통의 속성처럼 어떤 값을 간단히 덮어쓸 수 없어요. 이렇게 함으로써 속성의 무결성과 기능성이 애플리케이션 전반에 걸쳐 유지되도록 보장할 수 있어요.

요약하자면, 속성은 속성을 읽기 전용으로 만들어주고 실제 속성에 접근하기 전에 다른 작업을 수행할 수 있도록 해줍니다. 실제 예시를 통해 자세히 살펴보겠지만, 지금은 속성 데코레이터가 어떻게 작동하는지에 대한 대략적인 개념을 이해하셨으면 좋겠어요. 계속 진행하기 전에 한 가지 알아보고 넘어가기 위해 속성이 어떻게 작동하는지와 속성이 작동하는 기본 개념인 디스크립터에 대해 간단히 살펴보겠습니다.

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

# 뒷면에서: 속성과 디스크립터

속성은 속성이 어떻게 접근, 수정 또는 삭제되는지를 결정하는 객체인 디스크립터 개념과 밀접한 관련이 있습니다. 여기서는 "접근" 부분에만 초점을 맞춥니다. 디스크립터는 클래스 내의 속성에 대한 특정 규칙과 조건을 정의할 수 있습니다. 일반적으로 이를 통해 코드와 객체/클래스의 동작을 더 잘 제어하고 유연하게 조작할 수 있습니다. 속성은 내부적으로 디스크립터를 활용하여 클래스에 이를 녹여내어 객체/클래스의 기능을 향상시킬 수 있습니다.

메소드에 @property 데코레이터를 사용하면 getter 디스크립터가 생성됩니다. 속성에 접근할 때 디스크립터의 __get__ 메소드가 호출되어 속성 값을 반환하기 전에 추가 동작을 수행할 수 있습니다. 실제로 @property 데코레이터는 getter 디스크립터를 만드는 간편한 방법입니다.

디스크립터의 작동 방식에 대한 자세한 내용은 이 글의 범위를 벗어나지만, 파이썬 참조 문서와 Real Python의 훌륭한 기사를 참조하여 더 자세히 알아볼 수 있습니다.

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

이제 데이터 처리 및 기계 학습의 맥락에서 속성을 사용하는 5가지 다른 방법을 살펴보겠습니다.

# 1. 데이터 또는 모델 속성이 덮어쓰기되는 것으로부터 보호하기

![이미지](/TIL/assets/img/2024-07-13-PythonsMostPowerfulDecorator_1.png)

우리가 토론한 대로, 속성은 직접 할당을 제한하여 클래스 속성이 덮어쓰기되는 것을 방지하는 강력한 메커니즘을 제공합니다. 이 기능은 데이터 과학 및 기계 학습 응용 프로그램에서 데이터 및 모델의 무결성이 중요한 경우에 특히 가치가 있습니다. @property 데코레이터를 활용하여 읽기 전용 속성을 생성할 수 있으며, 이를 통해 속성에 액세스할 수 있지만 수정할 수는 없습니다. 이는 우연한 오류 발생 가능성이 적은 견고한 데이터 및 모델 객체를 생성하는 데 매우 유용할 수 있습니다.

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

클래스 속성이 데이터셋을 나타낼 때는 덮어쓰기를 방지하는 것이 매우 중요합니다. 이렇게 함으로써 데이터의 일관성과 신뢰성을 보장할 수 있습니다. 데이터 과학과 기계 학습 워크플로우에서 데이터셋은 종종 외부 소스에서 로드되거나 복잡한 계산을 통해 생성됩니다. 한 번 데이터가 로드되거나 계산된 후에는 그 무결성을 유지하는 것이 중요합니다. 이를 통해 후속 분석이나 모델에서 오류나 불일치를 방지할 수 있습니다.

예를 들어, 간단한 데이터 로더 클래스를 고려해 보겠습니다. 이 클래스는 경로를 입력으로 받아들이고 해당 경로에 포함된 데이터를 로드합니다(간소화된 예시로 Parquet 파일을 가정합니다).

여기서 주된 문제는 예시에서 보여준 것처럼 데이터셋 속성을 덮어쓸 수 있다는 것입니다. 데이터를 실수로 수정하여 원본 경로에 더 이상 해당하지 않음을 깨닫지 못한 채로 파이프라인에 문제가 발생할 수 있습니다. 게다가 클래스에서 다른 속성(카운트 또는 평균 및 통계와 같은 일반 통계치)을 계산하고 있고 데이터가 실수로 덮어써진 경우, 여전히 통계치가 데이터에 해당한다고 잘못 가정할 수 있습니다.

이 문제를 개선하기 위해 dataset을 호출할 때 경로를 로드하는 메서드로 변환하는 방법이 있습니다.

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

혹시 load_dataset() 메서드를 호출하기 위해 seemingly redundant 한 dataset() 메서드를 정의하는지 혼란스러워 하신다면, 곧 알게 될 거예요.

여기서 전체 아이디어는 이제 file_path 속성 대신 데이터가 항상 dataset() 메서드를 통해 가져와진다는 것입니다. 이것은 완벽한 해결책은 아니지만, dataset() 메서드가 속성이 아닌 메서드이기 때문에 (1) 그렇게 완벽하지는 않고, (2) 여전히 실수로 덮어쓸 수 있습니다. @property 데코레이터를 사용하면 이 두 문제를 동시에 해결할 수 있어요.

매직! 이전 코드 스니펫과 거의 동일하지만 데코레이터 하나를 추가함으로써 두 문제를 해결했어요. dataset은 이제 사실상 읽기 전용 속성이 됐어요.

지금까지 좋아요, 하지만 또 다른 문제가 생겼어요. 이 특정 구현은 데이터셋 속성을 호출할 때마다 데이터를 불러오기 위해 pd.read_parquet() 함수를 호출합니다. 이것은 매우 비효율적일 수 있으며, 중대한 크기의 데이터셋에도 적합하지 않을 수 있어요. 데이터셋 메서드에 캐싱을 구현해야 합니다. 이것이 다음 세그먼트의 주제입니다.

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

작업을 계속하기 전에, 이 세그먼트를 요약해보겠습니다. 클래스 속성이 덮어쓰여지는 것을 방지하는 속성을 사용함으로써, 데이터 과학과 머신 러닝 애플리케이션에서 데이터의 일관성과 신뢰성을 보장할 수 있습니다. 이는 모델의 무결성을 유지하고 오류를 방지하며 정확한 분석과 예측을 촉진하는 데 도움이 됩니다.

이제 @property를 사용하여 클래스를 강화할 수 있는 몇 가지 다른 방법을 살펴보겠습니다.

# 2. 비싼 속성의 캐싱 및 최적화

![이미지](/TIL/assets/img/2024-07-13-PythonsMostPowerfulDecorator_2.png)

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

속성은 성능을 최적화하고 런타임을 줄이는 캐싱 메커니즘으로 사용할 수 있습니다. 이는 특히 속성의 계산이 자원을 많이 사용하고 결과가 자주 변하지 않는 시나리오에서 이점을 제공합니다.

이전 세그먼트에서는 데이터셋 속성을 호출할 때마다 클래스가 디스크에서 데이터프레임을 로드하는 문제가 발생했습니다. 그러나 최초로 로드된 후 데이터셋을 캐시하기 위해 프라이빗 속성 _dataset을 추가함으로써 이를 완화할 수 있습니다.

이 업데이트로 데이터셋이 처음 호출될 때 데이터는 한 번 파일에서 내부 _dataset 속성으로 로드됩니다. 데이터셋을 이후에 사용할 때는 간단히 메모리에서 데이터를 로드합니다.

더 안전하게 하기 위해 file_path도 속성으로 변경할 수 있지만, 실제 사용 사례에 따라 달라집니다. 각 로더 인스턴스가 특정 파일 경로 또는 데이터셋에만 해당하도록 하려면 file_path를 읽기 전용으로 만들어야 합니다. 그렇지 않으면 파일 경로가 동적으로 변경될 수 있는 더 유연한 범용 데이터 로딩 클래스가 필요한 경우, 그대로 두면 됩니다.

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

완전성을 위해 머신 러닝과 관련된 예제도 고려해 봅시다. 하이퍼파라미터를 갖지 않고 피쳐와 타겟 데이터셋을 입력으로 받아 모델을 훈련하는 간단한 머신 러닝 모델을 구축해 봅시다. 아래 구현은 두 가지 속성을 갖고 있습니다: trained는 모델이 훈련되었는지 여부를 나타내며 model_parameters는 훈련 후에 모델 파라미터를 "캐싱"하여 덮어쓰기 방지 기능을 제공합니다.

여기서는 trained 상태와 모델 파라미터를 읽기 전용 속성으로 변환하기 위해 속성을 사용하고 있습니다. 이 접근 방식을 통해 모델의 훈련 여부를 쉽게 확인하고, 훈련된 파라미터를 검색할 수 있습니다.

요약하자면: 자원 집약적인 계산 결과를 캐싱함으로써, 속성은 불필요한 계산을 피하고 코드 실행 효율성을 향상시켜줍니다. 특히 속성의 결과가 자주 변경되지 않을 때 특히 유용합니다. 예시로는 대규모 데이터셋부터 ML 모델 파라미터까지 다양한 경우가 있습니다.

# 3. 자주 사용되는 속성의 동적 계산

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

![그림](/TIL/assets/img/2024-07-13-PythonsMostPowerfulDecorator_3.png)

속성은 동적 계산에 사용될 수 있으며, 속성 값의 계산을 실시간으로 가능하게 합니다. 특히 속성 값이 다른 속성이나 외부 요인에 의존하는 경우에 유용합니다. 다음과 같은 간단하고 흔한 예제를 고려해보세요:

면적(area) 및 둘레(circumference) 속성은 현재 반지름 속성의 값에 기초하여 면적 및 둘레를 동적으로 계산합니다. 이는 속성이 계산을 속성 내부에 캡슐화할 수 있도록 하여, 추가적인 메서드를 정의하고 실행한 다음 출력을 변수에 할당하지 않아도 되게 합니다.

데이터 처리 문맥에서 더 실용적인 예제는 다음과 같이 설명됩니다:

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

이 예에서 DataProcessor 클래스는 팬더스 DataFrame을 입력으로 받아 "계산"에 대한 속성을 제공합니다. 동적 계산을 위해 속성을 사용하면 데이터에 대한 정보를 수동으로 매번 계산할 필요 없이 쉽게 가져올 수 있습니다. 이는 특히 대규모 데이터셋을 처리하거나 반복적인 계산을 수행할 때 시간과 노력을 절약하는 데 도움이 됩니다.

계산이 비용이 많이 드는 경우 해당 계산을 변수에 캐싱하여 속성에 대한 긴 액세스 시간을 방지하는 것이 좋습니다. 반면에 계산 결과가 많고 많은 메모리를 차지할 경우, 해당 결과를 속성에 보유하면 불필요한 메모리 오버로드를 유발할 수 있으므로 캐싱할 내용에 대해 주의해야 합니다.

요약하면: 속성을 사용하여 계산을 속성 내에 캡슐화하면 다른 속성이나 외부 요인을 기반으로 값의 동적 계산이 가능해지며 별도의 메서드를 연쇄적으로 실행하고 결과를 변수에 할당할 필요가 없어집니다.

# 4. Setter와 결합하여 새 값 할당의 유효성 검사하기

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


![image](/TIL/assets/img/2024-07-13-PythonsMostPowerfulDecorator_4.png)

속성 데코레이터를 추가하여 속성을 읽기 전용으로 만드는 이유는 변수에 getter 메서드를 도입하고 setter 메서드를 도입하지 않기 때문입니다. 따라서 해당 속성은 새 값으로 "설정"될 수 없습니다. 그러나 단순히 @`속성`.setter를 추가함으로써 변수에 setter 메서드를 도입할 수 있으며, 이를 통해 속성에 새 값 할당 전에 추가 코드(예: 정상성 검사 또는 다른 수동 개입)를 실행할 수 있습니다.

@property와 @`속성`.setter의 조합은 Python에서 속성의 값 설정 시 사용자 지정 유효성 검사를 가능하게 하는 강력한 기능을 제공합니다. 이 조합을 활용하면 속성에 할당되는 데이터가 유효하고 적절한 데이터만 할당되도록 한 클래스의 견고성과 신뢰성을 향상시킬 수 있습니다. 이렇게하면 코드베이스의 전반적인 무결성이 향상되며 잠재적인 버그나 잘못된 데이터가 속성에 할당되는 것을 방지할 수 있습니다. 다음 예제를 확인해보세요:

scaling_factor 속성은 이제 setter 메서드가 정의되어 있기 때문에 더 이상 읽기 전용이 아닙니다. 그러나 긍정적인 측면은 이제 속성에 할당하기 전에 체크를 수행하여 새 값을 유효한지 확인할 수 있다는 것입니다. 예를 들어, 여기서 스케일 요인에 할당된 값을 항상 양수인지 확인하는 것을 보여드리겠습니다.


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

위 예제에서 확인할 수 있듯이, 유효하지 않은 (0 또는 음수) 값을 할당하려고 하면 ValueError가 발생합니다. 이는 클래스 속성에 문제가 있는 값을 실수로 할당하여 발생하는 오류를 찾는 데 매우 유용할 수 있습니다.

요약하자면: 게터와 세터를 최대한 활용하면 클래스를 더 견고하고 임의의 값이 아닌 에러에 덜 민감하게 만드는 데 매우 강력할 수 있습니다. 또한 이를 사용하여 값뿐만 아니라 데이터 유형인지도 확인할 수 있습니다.

# 5. 무거운 속성들의 지연로딩 및 메모리 최적화

![image](/TIL/assets/img/2024-07-13-PythonsMostPowerfulDecorator_5.png)

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

속성은 클래스 내에서 메모리 집중형 에셋 및 속성을 게으르게 로드할 수 있는 방법을 제공하여, 필요한 시점까지 미루는 것을 가능하게 합니다. 이 기능은 방대한 데이터 세트나 자원 집약적인 작업을 다룰 때 특히 유용합니다. 이러한 자원들을 실제로 필요한 시점까지 로드를 미룸으로써, 시스템의 전반적인 성능과 효율성을 크게 향상시킬 수 있습니다. 게으르게 로딩을 통해 오직 필요한 자원만 필요한 시점에 메모리에 로드되므로, 불필요한 오버헤드를 줄일 수 있어 메모리를 절약하고 자원 할당을 최적화할 수 있습니다.

저희는 이미 이를 섹션 2의 예제에서 수동으로 구현했습니다. 데이터는 DataLoader 클래스에 초기화 시 로딩되는 것이 아니라 데이터셋 속성에 처음 접근할 때 로드됩니다. 캐싱을 위해 우리는 비공개 속성 _dataset을 정의하고 None으로 인스턴스화하고, 처음으로 접근할 때 이 데이터를로드하도록했습니다. 너무 많은 단계처럼 들립니다. functools 라이브러리는 @property 대신 @cached_property 데코레이터를 사용하여 모든 보일러플레이트 코드를 간단히 없애는 편리한 방법을 제공합니다. 예시를 보겠습니다:

훨씬 깔끔하죠! 누구나 보일러플레이트 코드를 좋아하지 않아요.

게으르게 로드되는 속성들은 데이터 클래스를 보다 메모리 효율적으로 만들 수 있습니다. Python에서 메모리 효율적인 클래스를 작성하는 다른 방법에 대해 자세히 알아보려면 이 글을 확인해보세요.

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

요약하자면: 속성의 게으른 로딩 활용은 성능 향상, 리소스 사용 최적화 및 코드의 전반적 효율성 향상 이점을 제공합니다. @cached_property 데코레이터를 사용하여 이를 쉽게 달성할 수 있습니다.

오늘은 속성에 대해 많은 것을 배웠습니다 (또는 저처럼 느린 독자라면 여러 날 동안). 파이썬의 속성은 설명자의 기본 개념을 기반으로 한 clean하고 유연한 방식으로 클래스에서 속성 액세스를 관리합니다. 속성은 코드 가독성을 향상시키며 변수 보호, 동적 계산, 유효성 검사, 캐싱 및 게으른 로딩을 위한 다양한 기능을 제공합니다. 데이터 과학 및 머신 러닝에서 파이썬 개발을 계속하면 속성 습득이 확실히 프로그래밍 도구 상 중요한 기술이 될 것입니다.

자 이제 멋진 것을 만들어 보고 그것에 대해 여기나 LinkedIn에서 저에게 알려주세요!