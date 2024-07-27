---
title: "코스 파이썬으로 퀀트 트레이더 되기 - 최고 품질 데이터 얻는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-CourseBecomeaQuantTraderwithPythonHowtoGetTopQualityData_0.png"
date: 2024-07-07 12:49
ogImage:
  url: /assets/img/2024-07-07-CourseBecomeaQuantTraderwithPythonHowtoGetTopQualityData_0.png
tag: Tech
originalTitle: "Course: Become a Quant Trader with Python — How to Get Top Quality Data"
link: "https://medium.com/modern-ai/course-become-a-quant-trader-with-python-chapter-1-how-to-get-top-quality-data-bbbd5798f86a"
---

![이미지](/TIL/assets/img/2024-07-07-CourseBecomeaQuantTraderwithPythonHowtoGetTopQualityData_0.png)

주식 거래를 위해 Python으로 알고리즘을 코딩하기 시작하는 경우, 가장 중요한 질문은 무엇을 찾고 어디서 찾을지입니다. 저는 정확히 그것을 연구하는 데 상당한 시간을 할애했고 도움을 줄 수 있습니다.

이 기사에서는 승리를 창출하는 알고리즘을 만들기 위해 필요한 모든 것을 담은 매우 포괄적인 데이터프레임을 구축할 것입니다. 그리고 더 중요한 점은 여기에서 공유하는 코드가 데이터의 다른 시간대를 가져오기에 매우 쉽게 적응할 수 있도록 설계된 것입니다. 따라서 필요할 때 작업을 가속화하는 데 도움이 될 것입니다.

우선, 주식 데이터를 가지고 있는 다양한 API가 있지만, 양적 분석을 위해 알파베티지(https://www.alphavantage.co/)를 추천할 것입니다. 왜냐하면 이미 다양한 지표가 계산되어 있고 1분 단위의 투자자에게 필요한 내부 시장성에 대한 데이터도 제공하기 때문입니다.

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

## 데이터 가져오기

다음 코드 조각은 선택한 티커에 대한 데이터를 자동으로 가져와 데이터프레임으로 연결합니다:

```js
!pip install alpha_vantage
from datetime import datetime
from datetime import timedelta

from alpha_vantage.timeseries import…
```
