---
title: "데이터 시각화 상사를 놀라게 할 Python으로 인터랙티브 그래프 만드는 3가지 비밀 팁"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-DataVisualisation3SecretTipsonPythontoMakeInteractiveGraphsandImpressYourBoss_0.png"
date: 2024-07-12 19:54
ogImage: 
  url: /TIL/assets/img/2024-07-12-DataVisualisation3SecretTipsonPythontoMakeInteractiveGraphsandImpressYourBoss_0.png
tag: Tech
originalTitle: "Data Visualisation: 3 Secret Tips on Python to Make Interactive Graphs and Impress Your Boss"
link: "https://medium.com/gitconnected/data-visualisation-3-secret-tips-on-python-to-make-interactive-graphs-and-impress-your-boss-761f090cf339"
---


<img src="/TIL/assets/img/2024-07-12-DataVisualisation3SecretTipsonPythontoMakeInteractiveGraphsandImpressYourBoss_0.png" />

해당 글과 함께, 그래프를 인터랙티브하게 만들어 보여줌으로써 Python의 가능성을 향상시킬 것이고, 당신의 상사를 감명시킬 것입니다. 이 팁들의 목표는 더 나은 인상을 주고 사용자/고객 경험을 향상하는 데 있습니다. 효과가 있습니다!

요약하자면, 3가지 목표는 다음과 같습니다:

- 1. 상호작용 (팁 #1, #2 및 #3)
- 2. 멋진 그래프 (팁 #3)
- 3. 상사를 감명시키기 (팁 #1, #2 및 #3)

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

3년간 데이터 과학자로 근무하고 2년간 헤지펀드 매니저로 일한 경험을 토대로 고객들 앞에서 얻은 세 가지 조언이에요. 다른 아이디어가 있으면 댓글로 자유롭게 공유해 주세요.

이 글에서는 1번과 2번 팁을 다룰 거예요.

시작해 보죠.

## 0. 준비 사항

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

시작하기 전에 Python3 버전과 다음 패키지들이 설치되어 있는지 확인해 주세요:

- Pandas
- Plotly
- Pandas DataReader

위의 패키지들이 설치되어 있는지 확인했다면, Pandas DataReader를 사용하여 시장 데이터를 가져올 것입니다. 이 경우, Tesla의 데이터를 가져올 것입니다.

만약 위의 패키지 중 어떤 것이 이미 설치되어 있지 않다면, 아래와 같이 pip 명령어를 사용할 수 있습니다.

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


pip install pandas-datareader
pip install DateTime


더 많은 알고리즘 트레이딩 및 시장 데이터 획득에 대해 더 읽고 싶다면, 이 훌륭한 기사를 강력히 추천합니다.

읽기 귀찮다면, 아래 코드 라인을 찾을 수 있습니다:

테슬라에서 데이터를 업로드한 후, 다음과 같은 출력물 및 사용될 데이터세트는 다음과 같습니다:


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

<img src="/TIL/assets/img/2024-07-12-DataVisualisation3SecretTipsonPythontoMakeInteractiveGraphsandImpressYourBoss_1.png" />

이제 전제 조건이 해결되었으니, 첫 번째 팁부터 시작할 수 있어요.

## 팁 1: 범위 슬라이더 추가

나누고 싶은 첫 번째 팁은 범위 슬라이드 셀렉터입니다. 한 줄의 코드로 이미 그래프에 상당한 상호작용성을 불러올 수 있다는 사실에 믿음이 가시나요.

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

아래와 같이 코드를 입력해보세요:


정적 그래프 대신 사용자가 특정 시간 범위를 선택하고 확대할 수 있습니다.

아래 예시에서는 재정 그래프를 기준으로 하겠지만, 시계열과 같은 데이터를 사용하면 언제든지 사용할 수 있습니다.

예를 들어, 마케팅에서는 시간에 따른 판매량을 플로팅하거나, 의료 공학에서 회복 진행 상황을 플로팅하는 데 사용할 수 있습니다. 다양한 분야를 모두 다룰 순 없지만, 응용 가능성에 대한 제 언급에 대해 이해하셨을 것입니다.

아래 코드를 입력해보죠:


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

아이디어가 인상적이지 않니?

위 그래프를 살펴보면 그래프에 범위 슬라이드 셀렉터가 추가되었음을 알 수 있어요. 이를 통해 사용자/클라이언트가 그래프의 특정 부분을 쉽게 확대 또는 축소할 수 있을 거예요.

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

다른 예시로 여러 주식을 여러 개 가져올 수 있는 경우가 있습니다. 그리고 이러한 주식을 동일한 척도에 맞추어 인덱싱할 수도 있습니다 (출처 1). 아래는 결과입니다: 

![image](/TIL/assets/img/2024-07-12-DataVisualisation3SecretTipsonPythontoMakeInteractiveGraphsandImpressYourBoss_3.png)

## 팁 2: 대화형 버튼 추가하기

두 번째 팁은 대화형 필터링 버튼을 공유하고 싶습니다.

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

그러나, 이것에 대해 들어보신 적이 없을 것 같아요.

하지만, 제가 발견하고 나서, 제 삶은 급부상했어요.

상호 작용 필터링은 고객/사용자가 직관적으로 데이터를 필터링하거나 강조하려는 특정 시간이나 그래프 부분에 직접 확대하는 것을 도와줍니다.

![그래프 이미지](/TIL/assets/img/2024-07-12-DataVisualisation3SecretTipsonPythontoMakeInteractiveGraphsandImpressYourBoss_4.png)

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

다시 말씀드리지만 이 도표는 금융 데이터용으로 만들어졌지만 시계열 데이터의 모든 유형을 보여줄 수 있습니다.

위의 그래프를 만들기 위해 그래프에 추가해야 할 솔 코드의 라인은 다음과 같습니다:

```js
fig.update_layout(
    xaxis=dict(rangeselector=dict(
        buttons=list([
                dict(count=1, label="1 개월", step="month", stepmode="backward"),
                dict(count=6,label="6 개월", step="month", stepmode="backward"),
                dict(count=1,label="연간 데이터", step="year",stepmode="backward"),
                dict(count=1,label="1 년 데이터",step="year",stepmode="backward"),
                dict(step="all",label="전체 데이터")
            ]))))
```

조밀하게 보일 수 있지만 한 번 입력하면 이제 그래프에 모두 재사용할 수 있어 즐겁게 복사하여 붙여넣기만 하면 됩니다.

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

한 번 코드 블록을 가지고 있으면 변경할 수 있는 변수는 다음과 같습니다:

![이미지](/TIL/assets/img/2024-07-12-DataVisualisation3SecretTipsonPythontoMakeInteractiveGraphsandImpressYourBoss_5.png)

심지어 첫 번째 팁과 함께 혼합하여 청중을 황홀하게 만들 수도 있어요.

아래 이미지에서는 원하는 기간에 맞게 이름을 맞추었고, 레인지 선택기와 결합된 최종 결과가 이와 유사하게 표시됩니다:

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


![image](https://miro.medium.com/v2/resize:fit:1200/1*KXVXwd9Y9XOvuauDPta1wQ.gif)

다음과 같은 코드 한 줄로 HTML로 내보낼 수도 있어요. 이렇게 하면 해당 파일을 고객이나 친구에게 보낼 수 있어요.

```js
fig.write_html("/Users/Desktop/MyGraph.html")
```

A부터 Z까지 직접 만드는 방법이 궁금하시면 다음 스텝별 영상을 따라해보세요. 실시간으로 확인하실 수 있어요:


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

질문이 있거나 데이터 시각화의 특정 부분을 다루길 원하시는 경우, 언제든지 Q&A에 댓글을 남겨주세요.

좋은 코딩 되세요

사지드 레살니

# 출처:

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

Learn Algo Trading in One Day(Module 3):

[Python for Algorithmic Trading](https://www.udemy.com/course/python-for-algorithmic-trading)