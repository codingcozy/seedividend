---
title: "파이썬에서 데이터 정제하기"
description: ""
coverImage: "/assets/img/2024-05-20-DATACleaninginPython_0.png"
date: 2024-05-20 21:54
ogImage: 
  url: /assets/img/2024-05-20-DATACleaninginPython_0.png
tag: Tech
originalTitle: "DATA Cleaning in Python"
link: "https://medium.com/@studyjiger/data-cleaning-in-python-cd8abb81f6e4"
isUpdated: true
---




요구 사항: - Python3, 판다 라이브러리

파이썬에서 데이터 클린업을 위한 몇 가지 미리 정의된 메서드가 있어요

예: — dropna(), fillna(), duplicated(), loc()

1. Dropna : 빈 행을 제거하는 데 사용돼요

<div class="content-ad"></div>


![image](/assets/img/2024-05-20-DATACleaninginPython_0.png)

제가 데이터 세트를 가지고 있는데 빈 셀을 제거하고 싶어요 (제 경우 (5. 2015)) 빈 셀이 포함된 행을 제거할 수 있어요.

![image](/assets/img/2024-05-20-DATACleaninginPython_1.png)

2. Fillna() : 빈 값을 fillna 메서드로 대체할 수 있어요.


<div class="content-ad"></div>

<img src="/assets/img/2024-05-20-DATACleaninginPython_2.png" />

이제 빈 값을 숫자 90으로 바꿀 수 있어요!

<img src="/assets/img/2024-05-20-DATACleaninginPython_3.png" />

그리고 빈 값을 평균, 최빈값, 중앙값으로 대체할 수도 있어요.

<div class="content-ad"></div>


![Image 1](/assets/img/2024-05-20-DATACleaninginPython_4.png)

![Image 2](/assets/img/2024-05-20-DATACleaninginPython_5.png)

3. Duplicate(): it can remove duplicate rows from our dataset

![Image 3](/assets/img/2024-05-20-DATACleaninginPython_6.png)


<div class="content-ad"></div>

4. `loc()`: `loc`은 location을 의미하며 이 함수를 사용하여 값을 바꿀 수 있습니다. 예를 들어, 데이터 세트에 잘못된 값이 들어가 있을 때 이 값을 변경하고 싶다면 `loc()`를 사용할 수 있습니다 :

![파일](/assets/img/2024-05-20-DATACleaninginPython_7.png)

이제 5번째 행의 값을 98로 바꾸고 싶다면 :

![파일](/assets/img/2024-05-20-DATACleaninginPython_8.png)

<div class="content-ad"></div>


![image](/assets/img/2024-05-20-DATACleaninginPython_9.png)
