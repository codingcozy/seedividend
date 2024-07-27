---
title: "최신 파이썬 멀티페이지 Streamlit 애플리케이션으로 올림픽 결과 분석하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-ATimelyPythonMulti-pageStreamlitApplicationonOlympicResults_0.png"
date: 2024-07-06 10:27
ogImage:
  url: /assets/img/2024-07-06-ATimelyPythonMulti-pageStreamlitApplicationonOlympicResults_0.png
tag: Tech
originalTitle: "A Timely Python Multi-page Streamlit Application on Olympic Results"
link: "https://medium.com/gitconnected/a-timely-python-multi-page-streamlit-application-on-olympic-results-fb6d63c14ddd"
---

/assets/img/2024-07-06-ATimelyPythonMulti-pageStreamlitApplicationonOlympicResults_0.png

Streamlit은 데이터 과학자들이 쉽게 대화형 웹 애플리케이션을 만들 수 있도록 하는 오픈 소스 응용 프로그램 프레임워크입니다.

파이썬 몇 줄만 사용하면 데이터 스크립트를 공유 가능한 웹 앱으로 변환할 수 있습니다.

Plotly와 같은 데이터 시각화 라이브러리와 결합하면 몇 줄의 코드로 아름다운 차트와 지도를 만들 수 있습니다.

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

이 글에서는 Streamlit을 사용하여 올림픽 메달 데이터를 시각화하는 멀티페이지 대화형 애플리케이션을 만드는 방법을 안내하겠습니다.

이 애플리케이션은 세 가지 페이지로 구성될 것입니다:

- 메달 수에 대한 개요,
- 특정 국가 분석, 그리고
- 전 세계 메달 분포를 보여주는 코로플레스 맵.

시작해봅시다!

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

# 데이터 세트

이 작업을 수행하는 데 사용된 데이터는 "국가별 올림픽 메달" 데이터 세트입니다. Kaggle에서 이용할 수 있습니다.

이 데이터 세트에는 연도, 국가 및 "Gold", "Silver" 및 "Bronze" 메달의 수가 포함되어 있습니다. 데이터 세트의 처음 15행을 캡처한 화면은 다음과 같습니다:
