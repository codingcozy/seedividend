---
title: "내 인생을 구한 6가지 Pandas 테크닉"
description: ""
coverImage: "/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_0.png"
date: 2024-06-22 06:04
ogImage: 
  url: /assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_0.png
tag: Tech
originalTitle: "6 Pandas Techniques that Saved My Life"
link: "https://medium.com/@derekmeegan/6-pandas-techniques-that-saved-my-life-0d8fcf7d2c26"
---



![img](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_0.png)

만약 귀하가 직장이나 사이드 프로젝트에서 데이터 작업을 한다면, 실제로 대부분의 시간을 데이터를 정리, 조작 및 변환하는 데 쓸 것입니다. 사실 데이터 과학자들 사이에서 80%의 시간이 데이터를 다루는 데 소요된다는 것은 인기 있는 트로프입니다.

이 현실을 감안하면, 데이터 조작을 위한 필수적인 Python 라이브러리인 판다스를 이미 사용해 보셨을 것입니다. 저는 판다스를 광범위하게 사용하여 즉석 분석부터 제품 수준의 데이터 파이프라인 구축에 이르기까지 모든 일에 활용했습니다. 제 경험을 통해, 제 워크플로우를 크게 단순화하고 코드 품질을 향상시킨 6가지 주요 기술을 수집했습니다.

이 글에서는 해당 기술들을 탐구하고, 상징적인 Titanic 데이터셋을 사용하여 효과적으로 적용하는 방법을 보여드릴 것입니다.


<div class="content-ad"></div>

## 연쇄

아래에 설명된 모든 기술의 중심에는 연쇄(Chaining)가 있습니다. 이는 데이터에 여러 작업을 한 번에 연속적으로 적용할 수 있는 방법으로, 개별적인 단계들이 아니라 하나의 순차적인 파이프라인처럼 보이는 효율적인 절차를 만들어냅니다. 이 스타일은 맷 해리슨(Matt Harrison)로 인해 pandas에서 인기를 얻었으며, 그는 파이썬 및 데이터 과학 교육자이자 Effective Pandas의 저자입니다(강력 추천).

연쇄는 연산을 독립적으로 만들고 함수를 작고 간단하게 유지하는 기존 프로그래밍과는 다른 방식입니다. 대신, 연쇄는 데이터를 점진적으로 정리하거나 보강하는 연산들의 시리즈를 통해 데이터 중심적인 워크플로우를 더 현실적으로 나타냅니다. 이 접근 방식은 초심자에게는 워크플로우의 잠재적인 길이와 복잡성 때문에 위협적일 수 있습니다. 그러나 연쇄는 몇 가지 기본 원칙을 이해하고 워크플로우를 단계별로 쪼개면서 견고한 데이터 파이프라인을 만드는 간단하고 직관적인 방법이 됩니다.

아래에서 데이터셋에 대해 일반적인 작업 세트를 수행하는 샘플 워크플로우를 생성했습니다. 첫 번째 스니펫에서 변수 재할당을 사용하고, 두 번째에서는 연쇄를 사용했습니다. 두 가지 중 어떤 것이 더 깔끔해 보이나요?

<div class="content-ad"></div>


![링크1](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_1.png)

![링크2](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_2.png)

체인 방식으로 변수를 생성할 필요가 없다는 것을 주목하세요! 만약 주피터 노트북에서 이 파이프라인을 실행하고 있다면 셀을 직접 실행하여 결과를 확인할 수 있습니다. 프로덕션에서는 결과를 변수에 저장해야 하지만, 다른 네 개의 변수 인스턴스화를 제거하여 코드를 더 깨끗하고 유지보수하기 쉽게 만듭니다.

체이닝 시 시각적 명확성을 유지하려면 각 인덴트가 파이프라인의 더 깊은 수준에 해당하도록 코드를 계층적으로 배치하세요. 이는 워크플로가 더 복잡해질수록 점점 더 중요해집니다. 또한, .assign 메소드에서 "lambda" 함수의 사용에 주목하세요. 처음에는 복잡해 보일 수 있지만, 이 람다는 간단히 앞서 언급된 DataFrame을 참조하는 것뿐입니다. 그룹화된 또는 필터된 데이터에 변환을 적용하거나 여러 의존하는 열을 생성할 때 특히 유용합니다.


<div class="content-ad"></div>

이제 우리가 체이닝의 중요성과 이점을 이해했으니, 이 접근 방식을 활용하여 복잡한 작업을 쉽게 처리하는 몇 가지 기술을 살펴보겠습니다.

## 중복 행 검사

Pandas의 내장 drop_duplicates 함수는 중복 행을 제거하는 데 유용하지만, 중복된 행 자체를 보여주지는 않습니다. 중복을 식별하려면 .duplicated 메서드를 사용하며, 이 메서드는 중복되는 행에 대한 boolean 시리즈를 반환합니다. 여기서 행이 이전 행의 중복인 경우 해당 행은 True가 됩니다. 그러나 이렇게 하면 종종 코드가 복잡해질 수 있습니다:

<div class="content-ad"></div>

우리가 목적을 달성했지만, 접근 방식을 개선할 수 있어요. 먼저 바닐라 불리언 인덱싱을 .loc로 대체하여 동적 필터링 표현을 만들 수 있습니다.

![이미지](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_4.png)

그리고 완성! 변수 재할당 없이 중복된 행을 필터링했어요. 위에서 언급한 것처럼 .drop_duplicates를 사용하여 중복된 행을 삭제할 수 있지만, 동일한 표현을 사용하여 이전에 행 중복 필터에 ~ 연산자를 추가하여 필터링할 수도 있어요.

![이미지](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_5.png)

<div class="content-ad"></div>

The ~ operator reverses the boolean conditions of the filter statement, so that only rows that were not duplicated would be returned. This is useful when you want to examine your data and quickly look at the duplicated and non-duplicated rows.

## Value selection using .loc

One aspect of pandas I found challenging is accessing a specific value in a cell. While we often work with rows or columns in pandas, sometimes we need to retrieve individual values. The typical approach to doing this looks something like the following:

![Value selection using .loc](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_6.png)

<div class="content-ad"></div>

이 방법은 정말 좋지만, .iloc 속성은 조금 강제로 느껴질 수 있어요. 다행히 .loc 메소드를 사용하기 전에 조금의 준비를 해두면 값을 직접적으로 접근할 수 있어요. 중요한 것은 DataFrame의 색인을 필터링할 때 사용하는 열로 설정하는 것이에요. 이렇게 하면 .loc 문에서 이름을 첫 번째 액세서로 사용하고 원하는 열을 두 번째 액세서로 지정할 수 있어요.

![2024-06-22-6PandasTechniquesthatSavedMyLife_7](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_7.png)

다음 기술들은 모두 .pipe을 중심으로 돌아간답니다. 이는 판다스에서 가장 편리한 메소드 중 하나예요. 이를 사용하면 DataFrame이나 series에 미리 정의되거나 lambda를 통해 표현된 사용자 정의 함수를 연속해서 체인할 수 있어요. 하지만 주의해야 할 점은, pipe 함수를 통해 전달된 DataFrame의 결과는 항상 DataFrame이 되는 것은 아니라는 점이에요. 함수가 반환하는 방식에 따라, 추가적인 판다스 변환이 어려울 수도 있어요. 어떻게 작동하는지 살펴봅시다.

## Pipe Ternary

<div class="content-ad"></div>

판다는 데이터의 행, 열 및 테이블 지향 변환을 수행하는 데 탁월하지만, 조건부 작업을 지원하는 데는 한계가 있다는 게 엽기적이에요. 저는 해결책 중 하나로 .pipe 메소드 내부의 람다 함수에서 삼항 연산자를 사용하는 방법을 활용해왔어요. 가령, 타이타닉 데이터셋을 위한 파이프라인을 생성하는 경우를 생각해보죠. "Cabin"이라는 열이 있는 것을 보장할 수 없을 때도 있어요. 이럴 때, 아래와 같은 방법을 사용할 수 있어요:

<img src="/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_8.png" />

이 방법은 동작하지만, 체인이 끊어진다는 문제점이 있어요! 일회성 작업으로는 수용할만한 방법이겠지만, 대규모 파이프라인에서 여러 번 이런 상황이 발생하면 가독성이 떨어질 수 있어요. 대신, 파이프 내부에 간단한 람다 함수를 정의하여 삼항 연산자를 수행할 수 있어요:

<img src="/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_9.png" />

<div class="content-ad"></div>

.pipe을 사용하여 DataFrame의 열에서 “Cabin”이 이미 존재하는지를 확인하는 사용자 정의 삼항 함수를 생성합니다. 만약 존재한다면, 함수는 DataFrame을 바로 반환하고, 그렇지 않다면 열을 할당합니다. 이제 조금 더 화려한 것을 살펴보겠습니다...

## 열의 일부에 변환 적용하기

이 기술은 저의 일상 업무에서 가장 유용한 기법으로, 종종 비슷한 열들이 동일한 변환을 필요로 하는 다양한 데이터 유형으로 구성된 데이터 세트를 다룹니다. 예를 들어 타이타닉 데이터 세트를 살펴봅시다. 각 열에는 널 값이 있지만 “Age”와 “Sex” 열만 forward-fill 하려고 합니다. 이를 어떻게 할 수 있을까요? .assign 메서드와 람다 함수를 사용하여 원래 열을 덮어쓰는 방법 중 하나는 다음과 같습니다:

![image](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_10.png)

<div class="content-ad"></div>

하지만 만약 두 개의 열을 변환하는 대신에 열 개를 변환하고 싶다면 어떻게 해야 할까요? 동일한 변환을 반복해서 입력하는 것은 지루해지며, 변환을 변경해야 하는 경우 열 번 수정해야 합니다. 다행히 .pipe, lambda, 그리고 약간의 파이썬 언패킹 마법을 사용하여 더 나은 방법이 있습니다:

![image](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_11.png)

처음에는 혼란스러워 보일 수 있지만, 다른 연결된 흐름과 마찬가지로 한 단계씩 나누어 살펴봅시다. 먼저, .pipe 메서드의 람다 함수는 DataFrame을 새로운 흐름으로 전달합니다 (네, 흐름 내의 또 다른 흐름입니다). 이 흐름에서 우리는 원하는 열만 포함한 작은 DataFrame을 원본 DataFrame에서 언패킹합니다. 이 기술을 사용하면 작은 DataFrame에만 .ffill을 적용하여 원하는 열에만 집중한 다음, 이 열을 직접 원본 DataFrame에 다시 언패킹할 수 있습니다. 이 접근 방식은 구문적으로 더 명확할 뿐만 아니라 .ffill이 한 번만 호출되므로 성능 최적화도 제공합니다!

다음으로, .pipe가 어떻게 사용되어 준비된 데이터를 시각화 라이브러리로 직접 전달하는 데 도움이 되는지 살펴보겠습니다.

<div class="content-ad"></div>

## Plotly로 변환된 데이터를 바로 시각화하기

나는 직관성과 시각적 매력 때문에 Plotly를 선호하지만, 이 전략은 Matplotlib, Seaborn 및 pandas DataFrame과 NumPy 시리즈와 직접 통합되는 기타 그래프 라이브러리와도 작동합니다. 보통은 데이터 조작을 먼저 수행한 다음 결과를 시각화하는 두 번째 기능을 생성합니다. 그러나 데이터 작업을 진행할 때 반복 속도가 중요합니다. 이상적으로는 시각화를 연쇄적 흐름에 직접 추가하여 분석 결과를 더 잘 검토할 수 있어야 합니다. .pipe 메서드를 사용하면 이를 할 수 있습니다. 예를 들어, 타이타닉의 티켓 가격 분포를 간단히 살펴보고 싶다면:

![image](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_12.png)

이 흐름에서는 람다 함수 대신에 원하는 함수를 .pipe 메서드의 첫 번째 인수로 직접 전달하고 있습니다. 그 후속 인수들은 px.histogram 함수와 관련이 있으며, 판다스가 이들을 추가 키워드 인수로 전달합니다. .pipe 메서드의 결과는 Plotly 차트이며, 이를 통해 연쇄에 직접 Plotly 메서드를 추가하여 파이프라인과 시각화를 효율적으로 통합할 수 있습니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-22-6PandasTechniquesthatSavedMyLife_13.png)

여기 여러분을 위한 것입니다 — 더 나은 그리고 더 효율적인 판다 코드를 작성하는데 도움이 되는 여섯 가지 생명을 구하는 기술입니다. 각 예제에서, 전체 데이터셋으로 흐름을 시작했습니다. 이것은 의도적입니다. 분석할 때마다 데이터를 직접 소스에서 읽는 것이 일반적으로 더 좋기 때문입니다, 특히 노트북 환경에서. 이 방법을 통해 이전 데이터 변환으로 인해 파이프라인 결과가 변경되는 것을 방지하고, 노트북 출력이 새로 고쳐지거나 삭제되어도 파이프라인을 재현 가능하게 유지할 수 있습니다.

위에서 언급한 코드 예제들을 실험해 보고 싶다면, 제 GitHub의 이 기사의 노트북 버전을 확인해보세요. 저에 대해 더 알고 싶거나, 제 프로젝트와 다른 작업에 대해 더 알고 싶다면, 제 웹사이트를 방문해주세요.