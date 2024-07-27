---
title: "파이썬  데이터 분석 프로젝트 1 15개의 해결된 질문 포함"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_0.png"
date: 2024-07-07 02:26
ogImage:
  url: /assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_0.png
tag: Tech
originalTitle: "Python — Data Analysis Project 1 … With 15 Solved Questions"
link: "https://medium.com/@datasciencelovers/this-one-project-earned-me-1100-from-youtube-ads-35667f359d76"
---

## 날씨 데이터 분석

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_0.png)

이 글에서는 날씨 데이터셋을 활용한 데이터 분석을 배워보겠습니다. 주어진 질문을 해결하기 위해 Python 프로그래밍 언어를 사용할 것입니다. 이곳에서 사용하는 IDE는 Jupyter Notebook입니다. Jupyter Lab, Google Colab 등 다른 IDE도 사용할 수 있습니다.

날씨 데이터셋은 특정 위치에서 발생한 날씨 조건에 대한 시계열 데이터 세트입니다. 온도, 이슬점 온도, 상대 습도, 풍속, 가시성, 압력 및 조건을 기록합니다. 이 데이터는 CSV 파일로 제공됩니다.

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

이 데이터셋을 기반으로 여러 질문이 제시되었고, 우리는 Python의 Pandas 라이브러리를 사용하여 하나씩 해결할 것입니다. Pandas 라이브러리는 데이터 분석을 위한 최고의 라이브러리입니다.

우선 Pandas 라이브러리를 설치하겠습니다.

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_1.png)

다음으로, 날씨 데이터셋을 가져올 것입니다. 데이터셋이 csv 형식이므로, 구문은 다음과 같을 것입니다: pd.read_csv("..데이터셋 파일 경로..")

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

<img src="/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_2.png" />

여기서부터는 데이터 집합을 'df'로 참조할 것입니다. 코드에서 'r'을 써서 유니코드 오류를 제거하였습니다. 'r' 다음에는 우리 데이터 집합 파일의 경로를 따옴표로 전달할 것입니다.

따라서 위의 코드를 실행한 후에 우리 데이터 집합은 이렇게 보일 것입니다.

<img src="/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_3.png" />

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

이제 몇 가지 기본 Pandas 명령을 사용하여 데이터 세트를 탐색해 보겠습니다.

## 1. head( )

이렇게 하면 데이터의 첫 N개의 행을 표시합니다 (기본값은 N=5). 즉, 상위 5개 행을 보여줍니다.

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_4.png)

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

## 2. 형태

데이터셋(데이터프레임)의 총 행 수와 열 수를 보여줍니다.

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_5.png)

## 3. 인덱스

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

이 속성은 데이터프레임의 인덱스 범위를 제공합니다. 인덱스는 0부터 8784까지 시작합니다. 여기서 step=1은 인덱스가 0, 1, 2, 3, 4, 5, ... 와 같이 1씩 증가하는 것을 나타냅니다.

![image](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_6.png)

## 4. columns

데이터프레임에 있는 각 열의 이름을 보여줍니다. 여기서 8개의 열 이름이 모두 표시됩니다.

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

![image](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_7.png)

## 5. dtypes( )

각 열의 데이터 유형을 보여줍니다. 여기서 두 개의 열은 'object' (문자열) 형식이며, 네 개의 열은 'float' 형식이며, 두 개의 열은 'integer' 형식입니다.

![image](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_8.png)

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

## 6. unique( )

한 열에서 모든 고유한 값을 표시합니다. 이 함수는 전체 데이터프레임이 아니라 단일 열에만 적용할 수 있습니다.

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_9.png)

여기서 Weather 열의 모든 고유한 값을 표시하고 있습니다. 고유한 값이 너무 많아서 그 수를 세는 것이 어려울 수 있습니다. 다음으로 열의 고유한 값의 총 개수를 표시하는 함수를 사용할 것입니다.

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

## 7. nunique( )

각 열의 고유한 값의 총수를 보여줍니다. 단일 열 뿐만 아니라 전체 데이터프레임에도 적용할 수 있습니다.

![테이블 이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_10.png)

해당 열인 Weather에 50개의 고유한 값이 있다는 것을 보여줍니다.

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

이제 데이터프레임의 각 열에 있는 고유 값의 수를 확인하려면 어떻게 해야 할까요? 그러려면 열이 아닌 전체 데이터프레임에 nunique()를 적용하면 됩니다.

![image](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_11.png)

그래서 한 번에 각 열의 고유 값 수를 얻을 수 있습니다.

## 8. count()

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

각 열의 전체 비 널 값 수를 보여줍니다. 단일 열뿐만 아니라 전체 데이터프레임에도 적용할 수 있습니다.

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_12.png)

데이터프레임의 모든 열에 8784개의 비 널 값을 가지고 있으며, 이는 데이터프레임의 총 행 수와 같습니다. 따라서 어떤 열에도 널 값이 없습니다.

## 9. value_counts( )

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

한 열에서 고유 값과 해당 개수가 모두 표시됩니다. 단일 열에만 적용할 수 있습니다.

![image](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_13.png)

## 10. info( )

데이터프레임에 대한 기본 정보를 제공합니다. 범위 인덱스, 모든 열 이름 및 비널 값 수와 해당 데이터 유형이 표시됩니다.

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

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_14.png)

다시 한 번 데이터프레임을 살펴보겠습니다.

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_15.png)

데이터프레임의 상위 2개 레코드가 표시됩니다. 참고용으로만 확인해주세요.

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

먼저 '풍속' 열의 고유한 값 개수를 nunique 함수를 사용하여 확인할 수 있습니다.

![image](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_16.png)

이 열에는 34개의 고유한 값이 있습니다. 이제 이 값들이 무엇인지 확인해보겠습니다. unique 함수를 사용하면 됩니다.

![image](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_17.png)

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

그래서, 'Wind Speed_km/h' 열의 모든 고유한 값이 여기 있습니다.

이 질문을 해결하는 데 두 가지 방법을 사용할 것입니다. 첫 번째는 필터링이고, 두 번째는 Groupby 함수입니다.

먼저 value_count 함수를 사용하여 각 열의 고유한 값 수를 확인해 봅시다.

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_18.png)

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

이 열에서 '맑음'의 수는 1326입니다. 따라서 날씨가 맑았던 횟수는 1326번이라는 뜻입니다.

이제 필터링을 사용하여 이 1326개의 레코드를 표시할 것입니다.

![image](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_19.png)

질문에서 요청한 대로 날씨가 '맑음'인 모든 레코드(행)가 여기에 있습니다.

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

그룹화( ) 함수를 사용하여 출력을 얻을 수 있는 또 다른 함수는 groupby( ) 입니다. groupby 함수를 사용하여 날씨 열(weather column)의 각 고유한 값들을 그룹화하고 '맑음(clear)'에 대한 출력을 얻을 것입니다. get_group( )를 사용합니다.

![이미지](/TIL/assets/img/2024-07-07-PythonDataAnalysisProject1With15SolvedQuestions_20.png)

# 계속됩니다 ….
