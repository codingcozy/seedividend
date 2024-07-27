---
title: "오픈 과학 실습 및 출판을 위한 플랫폼 LeapFROGS 소개"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-IntroducingLeapFROGSaplatformforopensciencepracticeandpublishing_0.png"
date: 2024-07-09 09:17
ogImage:
  url: /assets/img/2024-07-09-IntroducingLeapFROGSaplatformforopensciencepracticeandpublishing_0.png
tag: Tech
originalTitle: "Introducing LeapFROGS: a platform for open science practice and publishing"
link: "https://medium.com/cyberpaleo/introducing-leapfrogs-a-platform-for-open-science-practice-and-publishing-c4c47f591ec4"
---

요약: Python과 R을 이용한 LeapFROGS는 과학 응용 프로그램 및 시계열 분석을 위한 비동기 플랫폼으로, 여러분의 과학을 공유하고 공개 및 재현 가능하게 만들기 위해 개발되었습니다. 이 플랫폼은 비동기식 학습 활동과 교육 워크샵을 지원합니다.

![이미지](/TIL/assets/img/2024-07-09-IntroducingLeapFROGSaplatformforopensciencepracticeandpublishing_0.png)

작년 가을에 발표된 최신 LinkedEarth 프로젝트는 오픈 지구과학 연구 및 게재 영역에서 동기식 및 비동기식 학습 활동으로 구성되어 있습니다. 이 블로그 포스트는 LeapFROGS (Python 및 R) 비동기 플랫폼을 소개합니다.

# 왜 FROGS를 선택했나요?

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

연구 데이터, 소프트웨어 및 워크플로우를 공유하는 것은 Findable, Accessible, Interoperable, and Reusable (FAIR) 오픈 사이언스 생태계를 구축하는 데 필수적입니다. 실제로 지난 10년 동안 후원자와 출판사들은 재현성을 강조하며 재현 가능한 과학 제품의 공유를 지원하는 프레임워크를 인정하는 오픈 사이언스 정책을 도입했습니다. 다음 논리적인 단계는 과학 문제를 해결하면서 이러한 프레임워크의 사용법을 공동체에게 가르치는 것입니다.

FROGS는 인원 중 절반의 국적에 대한 존경의 표시입니다.

# LeapFROGS

LeapFROGS의 목표는 Python, R, 시계열 분석 및 오픈 사이언스 출판의 비동기 학습을 위한 플랫폼을 제공하는 것입니다. 이 플랫폼에는 해당 주제에 대한 짧은 텍스트 소개와 주제에 대해 더 자세히 배울 수 있는 관련 자료로의 링크가 혼합되어 있으며, 주제 이해도를 테스트하는 코딩 연습 및 객관식 문제가 포함되어 있습니다. 2024년 7월 현재, 이 플랫폼에는 다음 모듈이 포함되어 있습니다:

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

- 파이썬 또는 R 소개. 이 모듈은 이 두 언어에 대한 기본적인 프로그래밍 소개에 초점을 맞춥니다. 주요 데이터 유형부터 루프 및 조건문까지 다룹니다. 또한 함수 작성에 대해서도 소개합니다.

![이미지](/TIL/assets/img/2024-07-09-IntroducingLeapFROGSaplatformforopensciencepracticeandpublishing_1.png)

2. 과학 애플리케이션을 위한 Python/R. 두 번째 모듈은 Python/R을 과학 분야에서 사용하는 방법을 다룹니다. Python의 경우, 이 모듈은 NumPy, Pandas, Matplotlib 및 지도를 위한 Cartopy와 같은 라이브러리를 포함한 과학 Python 스택의 기본을 다룹니다. R의 경우, 해당 모듈은 R 데이터 프레임 및 dplyr, tidyr, tibble 및 ggplot2와 같은 tidyverse의 유용한 패키지를 다룹니다.

![이미지](/TIL/assets/img/2024-07-09-IntroducingLeapFROGSaplatformforopensciencepracticeandpublishing_2.png)

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

3. 시계열 분석. 이 모듈은 시계열 분석을 위한 데이터 처리, 연관성 측정, 가설 검정을 위한 대리자 사용 및 스펙트럼 및 웨이블릿 분석을 다룹니다. 이 모듈과 관련된 강의는 Figshare에서 확인할 수 있습니다. 연습문제는 Python용 [여기](링크)와 R용 [여기](링크)에서 확인할 수 있습니다. LeapFROGS에는 학습 내용 이해도를 평가하는 객관식 퀴즈도 포함되어 있습니다.

4. 미래의 과학 논문. 이 모듈은 공개과학 발간의 기본 원칙을 제공하며 데이터, 소프트웨어 및 작업흐름을 공유하는 방법에 대한 모범 사례를 안내합니다. Yolanda Gil과 동료들이 모은 원래 논문 자료를 기반으로 하여 Binder와 같은 새로운 기술을 위해 업데이트하였습니다. 새 자료는 Figshare에 있으며 LeapFROGS에 요약되어 재료 이해도를 테스트하는 퀴즈가 있습니다.

![이미지](/TIL/assets/img/2024-07-09-IntroducingLeapFROGSaplatformforopensciencepracticeandpublishing_3.png)

5. Github 소개. 이 모듈은 연구를 공유하고 협업하기 위한 GitHub 플랫폼 소개를 제공합니다.

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

# 누가 LeapFROGS를 사용할 수 있나요?

누구나 이 플랫폼을 사용할 수 있으며, Python 및/또는 R을 사용하여 자신의 분석에 사용하는 과학자 커뮤니티를 위한 자원이 되기를 희망합니다. 오픈 사이언스에 관심이 있고 연구 결과물을 재현 가능하고 공정하게 만들기를 원하는 분들을 위한 것입니다.

지금까지 LeapFROGS는 18명의 지구과학자를 위한 대면 해커톤(PyRATES) 행사를 지원해 왔습니다.
