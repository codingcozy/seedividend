---
title: "1억 행 파이썬 처리 도전  10분에서 4초로 줄이는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-PythonOneBillionRowChallengeFrom10Minutesto4Seconds_0.png"
date: 2024-07-09 09:21
ogImage:
  url: /assets/img/2024-07-09-PythonOneBillionRowChallengeFrom10Minutesto4Seconds_0.png
tag: Tech
originalTitle: "Python One Billion Row Challenge — From 10 Minutes to 4 Seconds"
link: "https://medium.com/towards-data-science/python-one-billion-row-challenge-from-10-minutes-to-4-seconds-0718662b303e"
---

![Python One Billion Row Challenge](/TIL/assets/img/2024-07-09-PythonOneBillionRowChallengeFrom10Minutesto4Seconds_0.png)

요즘에는 프로그래밍 언어가 10억 행의 데이터를 통합하는 속도에 대한 문제가 주목을 받고 있습니다. 성능이 가장 우수하지 않은 Python은 당연히 특히 현재 최상위 성능을 발휘하는 Java 구현이 단 몇 초(1.535초)만에 처리 가능하다는 점에서 거의 기회가 없습니다!

도전의 근본적인 규칙은 외부 라이브러리를 사용하지 않는 것입니다. 오늘의 목표는 규칙을 준수한 후에 외부 라이브러리와 더 적합한 파일 형식을 사용했을 때 결과가 어떻게 나오는지 살펴보는 것입니다.

모든 스크립트를 5회 실행하여 결과를 평균화했습니다.

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

하드웨어로는 12개 CPU 코어와 36 GB RAM이 장착된 16인치 M1 Pro MacBook Pro를 사용하고 있습니다. 코드를 실행할 경우 결과가 다를 수 있지만, 구현 사이에는 비슷한 백분율 차이를 볼 수 있을 것입니다.

## 코드

- GitHub 저장소 — Python으로 10억 행 도전

# 10억 행 도전이란 무엇인가요?

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

1 Billion Row Challenge (1BRC)의 아이디어는 간단합니다 - .txt 파일을 통해 10억 행의 데이터를 처리하는 것입니다.
