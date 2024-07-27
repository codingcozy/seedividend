---
title: "1921680024 이해하기 - 30초만에 설명"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-The24in1921680024Explainedin30Seconds_0.png"
date: 2024-07-06 02:32
ogImage:
  url: /assets/img/2024-07-06-The24in1921680024Explainedin30Seconds_0.png
tag: Tech
originalTitle: "The “ 24” in “192.168.0.0 24” Explained in 30 Seconds"
link: "https://medium.com/gitconnected/the-24-in-192-168-0-0-24-explained-in-30-seconds-b0ed6cb635c7"
---

/assets/img/2024-07-06-The24in1921680024Explainedin30Seconds_0.png

저는 지금 직장에서 이 문제를 다루고 있는데, 처음에는 이게 너무 직관적이지 않았어요 (사이버 보안 경험이 제한된 사람으로서)

그래서 여기서 IP 주소에 익숙하지 않은 분들을 위해 최대한 간단하게 설명하려고 해봤어요.

# 192.168.0.0

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

192.168.0.0은 단일 IP 주소입니다. 간단하지요!

# IP 주소에 /와 숫자를 추가하는 방법

- 192.168.0.0/32는 IP 주소 범위입니다.
- 192.168.0.0/31도 IP 주소 범위입니다.
- 192.168.0.0/30도 IP 주소 범위입니다.
- 192.168.0.0/29도 IP 주소 범위입니다.
- 192.168.0.0/28도 IP 주소 범위입니다.
- 그리고 그렇게 계속됩니다.

/ 뒤에 붙이는 숫자는 0부터 32까지입니다.

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

# 이 범위 내의 IP를 찾기

먼저 이 범위 내의 IP 주소 개수를 찾아 봅시다.

예를 들어 192.168.0.0/30이 있다고 해봅시다:
