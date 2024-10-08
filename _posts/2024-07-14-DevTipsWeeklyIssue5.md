---
title: " 개발자 팁 주간지  제5호"
description: ""
coverImage: "/assets/img/2024-07-14-DevTipsWeeklyIssue5_0.png"
date: 2024-07-14 00:28
ogImage:
  url: /assets/img/2024-07-14-DevTipsWeeklyIssue5_0.png
tag: Tech
originalTitle: "🗞️ DevTips Weekly — Issue #5"
link: "https://medium.com/@zarinfam/%EF%B8%8F-devtips-weekly-issue-5-3fe204e25a6e"
isUpdated: true
---

이번 주의 데브팁 주간 이슈에 오신 것을 환영합니다! 📰 이번 주에는 최신 기술 소식을 담은 몇 가지 선별된 기사와 리소스가 포함되어 있습니다. 지난 주에 발표된 이 기사들을 함께 살펴보세요:

![DevTipsWeeklyIssue5_0](/assets/img/2024-07-14-DevTipsWeeklyIssue5_0.png)

# 오픈 소스 LLM을 활용한 클라우드 호스팅 RAG 앱 개발

이 안내서는 BentoML, LangChain 및 MyScaleDB를 사용하여 사용자 지정 🤖 AI 애플리케이션을 만드는 방법을 설명합니다. ☁️ 클라우드 호스팅 오픈 소스 LLM을 사용하는 이점과 💸 비용 절감 및 확장성을 강조합니다. 이 튜토리얼은 Wikipedia에서 데이터를 추출하고 텍스트를 관리 가능한 청크로 분할하고 임베딩을 생성하는 과정을 안내합니다. 또한 BentoML에서 모델을 배포하고 MyScaleDB에 데이터를 저장하며 검색 증진 생성(RAG) 작업을 수행하는 방법을 다룹니다. 이 안내서는 머신 러닝 모델을 배포하는 데 유연성과 간편성을 강조하며, 벡터 데이터를 관리하는 데 MyScaleDB의 뛰어난 성능을 소개합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![image](/assets/img/2024-07-14-DevTipsWeeklyIssue5_1.png)

# 클라우드 앱을 위해 Docker 컨테이너 대신 VM을 사용해야 하는 이유

이 기사는 매우 간단한 방식으로 클라우드 애플리케이션에 Docker 컨테이너 대 VM을 사용하는 장점을 설명합니다. 간단히 말하자면, 다음과 같은 장점이 있습니다:

- ⏩ 속도: 컨테이너는 초 단위로 배포되며 가상 머신에 비해 적은 메모리를 사용합니다.
- 🚀 확장성: 컨테이너는 특히 Kubernetes와 같은 도구로 관리될 때 동적으로 확장할 수 있습니다.
- 💰 비용 효율성: 스케일링을 자동화하고 리소스 사용량을 최소화함으로써, 컨테이너는 운영 비용을 줄입니다.
- 🌐 이식성: Docker 컨테이너는 매우 휴대 가능하며 다양한 환경에서 일관되게 실행됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/assets/img/2024-07-14-DevTipsWeeklyIssue5_2.png)

# 가장 많이 사용되는 분산 시스템 디자인 패턴

대사관 🛡️, 서킷 브레이커 🔌, CQRS 📊와 같은 분산 시스템 디자인 패턴은 신뢰성이 있고 효율적인 분산 애플리케이션을 만들기 위한 필수적인 프레임워크를 제공합니다.

예를 들어, 대사관 패턴은 로깅 및 모니터링과 같은 보조 작업을 분담하여 주 애플리케이션이 비즈니스 로직에 집중할 수 있게 하며, 서킷 브레이커 패턴은 서비스가 이용 불가능해질 때 요청을 중지하여 계단식 실패를 방지합니다. CQRS 패턴은 읽기 및 쓰기 작업을 별도의 데이터베이스로 분리함으로써 성능을 향상시킵니다. 또한, 이벤트 소싱과 같은 패턴은 이벤트의 자세한 기록을 유지하여 감사 및 디버깅을 더 잘할 수 있게 하며, 사이드카 패턴은 보조 구성 요소를 주요 서비스 컨테이너 옆에 배치함으로써 다방면에서 발생하는 문제를 관리합니다. 리더 선출, 발행자/구독자, 샤딩 등의 패턴은 조정된 활동, 비동기 통신 및 효율적인 데이터 분배를 통해 시스템의 견고성을 더욱 향상시킵니다. 마지막으로, 버크헤드 패턴은 시스템 구성 요소를 격리하여 내결함성을 향상시키고, 캐시-옆 패턴은 데이터를 전략적으로 캐시에로드하여 읽기 성능을 개선합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이러한 패턴들은 분산 컴퓨팅의 복잡성을 다루며, 확장 가능하고 견고한 시스템 구조를 보장합니다. 이러한 패턴들에 대해 더 알고 싶다면, 이 기사를 꼭 읽어보세요.

![이미지](/assets/img/2024-07-14-DevTipsWeeklyIssue5_3.png)

# 8가지 이유로 개발자들이 Go를 좋아하고 8가지 이유로 좋아하지 않는 이유

Go(Golang)는 2007년 Google에 의해 대규모 데이터 및 네트워크 문제를 해결하기 위해 만들어졌습니다. 2009년 공식적으로 데뷔했으며, 2012년 버전 1.0이 출시되었습니다. 🚀

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

고(Go)는 그 간결함과 학습 용이성으로 주목 받고 있어요. 이것은 새 프로그래머들에게도 숙련된 프로그래머들에게도 접근하기 쉽게 만들어 주죠. 👩‍💻👨‍💻

고에 대한 개발자들의 반응은 분분해요. 누구는 그 간결함을 감사히 받아들이고 있고, 반면에 다른 언어에서 찾을 수 있는 고급 기능을 놓친다는 것을 느끼는 사람들도 있어요. 🤔

고에서 강조되는 한 가지 측면은 함수 내 명시적인 오류 처리 방식입니다. 이는 계획 및 탄력성에 도움이 되는 것으로 여기는 사람들도 있지만, 다른 사람들은 이를 번거로운 것으로 여기기도 해요. 🙌🤷‍♂️

이 글에서는 고의 장단점과 프로그래머들이 이 언어를 선택하거나 싫어하는 이유에 대해 논의할 거에요!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/assets/img/2024-07-14-DevTipsWeeklyIssue5_4.png)

# 2024년에 데이터 과학은 여전히 가치 있을까요?

데이터 과학의 중요성은 논쟁의 주제입니다. 어떤 사람들은 그것이 구식이라고 생각하고 다른 사람들은 발전 중이라고 생각합니다. 이 기사는 이러한 관점에서 이 질문에 대해 검토합니다:

🌐 산업 수요: 금융, 건강 보험, 제조업과 같은 기술 중심 업종들은 여전히 데이터 과학에 많이 의존하며 분석적 기술의 필요성을 강조합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

🚀 커리어 기회: 데이터 과학은 여전히 매우 인기 있는 직업으로, 성장 가능성과 전문화 기회를 제공합니다.

🎓 교육과 인증: DataCamp의 데이터 과학자 인증과 같이 접근 가능한 온라인 과정을 통해 해당 분야로 진출하고 기술을 개발할 수 있는 길이 열립니다.

![이미지](/assets/img/2024-07-14-DevTipsWeeklyIssue5_5.png)

🙏 읽어주셔서 감사합니다. 저와 연락하려면:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

중간 🖊️ | 트위터 🐦

🗞️ DevTips Weekly 이전 이슈들
