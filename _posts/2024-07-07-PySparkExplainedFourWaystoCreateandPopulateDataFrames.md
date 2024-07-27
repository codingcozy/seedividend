---
title: "PySpark 완벽 가이드 DataFrame 생성과 데이터를 채우는 네 가지 방법"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-07 21:43
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "PySpark Explained: Four Ways to Create and Populate DataFrames"
link: "https://medium.com/towards-data-science/pyspark-explained-four-ways-to-create-and-populate-dataframes-31f3e4322ad9"
---


파이스파크를 사용할 때 특히 SQL에 백그라운드를 가지고 있다면, 처리할 데이터를 데이터프레임으로 가져오는 것이 처음으로 해야 할 일 중 하나일 것입니다. 데이터가 데이터프레임에 들어있으면, 데이터프레임에서 임시 뷰(또는 영구 테이블)를 쉽게 생성할 수 있습니다. 그 순간부터, PySpark SQL의 다양한 연산 명령이 데이터를 더 탐색하고 처리할 수 있도록 사용 가능해집니다.

표준 SQL 기술이 PySpark SQL로 쉽게 전이 가능하기 때문에, 데이터를 처리 파이프라인에서 가능한 한 빠르게 PySpark SQL과 직접적으로 사용할 수 있도록 준비하는 것이 중요합니다. 효율적인 데이터 처리 및 분석을 위해 이 작업을 최우선 순위로 두어야 합니다.

물론 이렇게 할 필요는 없습니다. PySpark SQL에서 뷰나 테이블을 사용할 수 있는 모든 작업은 API를 사용하여 데이터프레임에서도 직접 수행할 수 있습니다. 그렇지만, DataFrame API보다 SQL을 사용하는 것이 더 편한 사람으로써, 나의 스파크 사용 방법은 항상 다음과 같습니다.

이 과정을 돕기 위해, 이 글에서는 파이프라인의 첫 단계인 데이터를 데이터프레임에 넣는 과정을 설명하여 네 가지를 한눈에 알려드릴 것입니다...