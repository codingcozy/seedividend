---
title: "Java 성능 향상 키워드 완벽 이해하기"
description: ""
coverImage: "/assets/img/2024-07-28-UnderstandingJavaperformanceKeywords_0.png"
date: 2024-07-28 14:02
ogImage: 
  url: /assets/img/2024-07-28-UnderstandingJavaperformanceKeywords_0.png
tag: Tech
originalTitle: "Understanding Java performance Keywords"
link: "https://medium.com/@vikas.taank_40391/understanding-java-performance-keywords-c48a0bc5e81d"
---


![image](/assets/img/2024-07-28-UnderstandingJavaperformanceKeywords_0.png)

# 성능 용어: 몇 가지 기본 정의

# 대기 시간 (Latency):

대기 시간은 주어진 작업 부하에서 단일 작업 단위를 처리하는 데 걸리는 종단 간 시간입니다. 종종 대기 시간은 "정상" 작업 부하에 대해서만 언급되지만, 종종 증가하는 작업 부하의 함수로 나타낸 대기 시간 그래프가 유용한 성능 측정 방법입니다.

<div class="content-ad"></div>


# Throughput

Throughput is the number of units of work that a system can perform in some time period with given resources. One commonly quoted number is transactions per second on some reference platform (e.g., a specific brand of server with specified hardware, OS, and software stack).

# Utilization


<div class="content-ad"></div>

활용도는 작업 단위를 처리하는 데 사용되는 사용 가능한 자원의 백분율을 나타냅니다. 관리 작업 대신에 활용되거나 아무 것도 하지 않는 것입니다. 사람들은 서버를 10% 활용되었다고 자주 언급하는데, 이는 정상 처리 시간 동안 CPU가 작업 단위를 처리하는 백분율을 의미합니다. CPU 및 메모리와 같은 다른 리소스의 활용도 수준 간에는 매우 큰 차이가 있을 수 있음에 유의해야 합니다.