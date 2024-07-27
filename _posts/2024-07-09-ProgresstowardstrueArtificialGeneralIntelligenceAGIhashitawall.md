---
title: "진정한 인공지능의 벽에 부딪힌 AGI의 발전 현황"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_0.png"
date: 2024-07-09 19:38
ogImage:
  url: /assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_0.png
tag: Tech
originalTitle: "Progress towards true Artificial General Intelligence (AGI) has hit a wall."
link: "https://medium.com/generative-ai/progress-towards-true-artificial-general-intelligence-agi-has-hit-a-wall-80a35c048f41"
---

![image](/TIL/assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_0.png)

인공 일반 지능(AGI)을 향한 탐구는 몇십 년 동안 연구 커뮤니티의 관심을 사로 잡아 왔습니다.

AGI는 인간이 하는 것과 비슷하게 프로그래밍되지 않은 상태에서도 다양한 작업을 수행할 수 있는 AI 시스템의 능력을 나타냅니다. 이는 우리가 학습, 추론 및 새로운 상황에 적응할 수 있는 능력을 갖춘 시스템을 찾고 있다는 것을 의미합니다.

그러나 분야에서 중요한 발전이 있었음에도 불구하고, 대부분의 AI 시스템은 아직도 좁은 작업과 영역에 제한되어 있어 AGI는 여전히 애매한 목표로 남아 있습니다.

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

`<table>`태그를 Markdown 형식으로 변경해 주세요.

그 이유가 무엇인가요?

# 인공지능이 잘하지 못하는 것

AGI에 대한 주요 장애물 중 하나는 현대 인공지능 시스템이 추론보다는 기억에 의존하고 있다는 것입니다. 우리가 모두 아는 이 시스템들인 Language Large Models (LLMs)는 학습 데이터의 패턴을 암기하고 인접한 맥락에서 적용하는 데 능숙합니다.

하지만 새로운 경우를 바탕으로한 새로운 추론을 생성하는 능력이 부족합니다.

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

LLM은 독창적이거나 혁신적인 상황에 기반한 새로운 추론을 생성할 수 없으며 기억에 의존한다는 제한이 있습니다.

또 다른 문제는 AI 시스템이 학습 데이터를 넘어서 일반화할 수 없는 점입니다. 예를 들어, 체스를 하는 방법을 학습한 AI 시스템은 사람들보다 더 잘 체스를 둘 수 있지만, 체커 또는 바둑과 같은 다른 보드 게임에 해당 지식을 전이시키는 것은 불가능합니다.

이러한 일반화 실패는 AGI를 달성하는 데 중요한 장애물이며, 시스템이 새로운 상황에 지식을 적용하는 능력을 제한합니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*_LbxAoOCs7Ed8ThxzsC_eQ.gif)

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

# 새로운 패러다임과 새로운 기준

2019년, Keras의 창시자 인 프랑수아 쇌레(François Chollet)는 2.5백만 명 이상의 개발자가 채택한 오픈 소스 딥 러닝 라이브러리인 Keras의 창시자이자 Google의 소프트웨어 엔지니어 및 AI 연구원으로서, 영향력 있는 논문 "지능의 측정에 관하여"을 발표했습니다. 이 논문에서 그는 알려지지 않은 작업에 대한 AI 기술 습득의 효율을 측정하기 위한 기준인 추상화 및 추론 코퍼스(ARC-AGI)를 소개했습니다.

마침내, 모든 좋은 과학이 해야 할 것처럼, 우리는 정의로부터 시작해야 합니다. AGI에 대한 일반적인 합의는 "경제적 가치가 있는 작업의 대부분을 자동화할 수 있는 시스템"으로 정의된다는 것입니다. 이것이 유용한 목표로 간주될 수 있지만... 이것은 지능의 부정확한 측정입니다.

보다 지능적이고 인간과 유사한 시스템을 위한 고의적인 진보를 이루기 위해, 우리는 적절한 피드백 신호를 따라야 합니다: 우리는 지능을 정의하고 평가해야 합니다.

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

## 기술, 암기 및 지능

기술은 이전 지식과 경험에 크게 영향을 받습니다. 무제한의 사전 지식이나 무제한의 교육 데이터는 개발자들에게 시스템의 기술 수준을 "구매"할 수 있는 기회를 제공합니다. 이것은 시스템 자체의 일반화 능력을 가리게 합니다.

현대 인공지능 (LLM)은 뛰어난 암기 엔진으로 입증되었습니다. 그들은 훈련 데이터에서 고차원의 패턴을 기억하고 해당 패턴을 인접한 문맥에 적용할 수 있습니다.

이것은 그들의 겉보기 추론 능력이 작동하는 방식입니다. LLM은 실제로 추론하지 않습니다. 대신, 그들은 추론 패턴을 암기하고 해당 추론 패턴을 인접한 문맥에 적용합니다. 그러나 그들은 새로운 상황에 기반한 새로운 추론을 만들어 내지 못합니다.

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

지능은 넓거나 일반적인 능력에 있습니다; 훈련 데이터 외에도 새로운 기술을 효율적으로 습득할 수 있는 시스템으로 AGI를 정의하는 방식을 조정해야 합니다. 아니, 더 나아가...

![이미지](/TIL/assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_1.png)

# 이러한 종류의 지능을 어떻게 측정할 수 있을까요?

대부분의 AI 벤치마크는 기술을 측정합니다. 하지만 기술은 지능이 아니라는 것을 방금 보았죠?

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

2019년 같은 연구에서 탄생한 **인공 일반 지능(AGI)**을 위한 추상화 및 추론 말뭉치 (ARC-AGI)는 AGI의 유일한 공식 벤치마크로 여겨집니다.

**추상화 및 추론 말뭉치(ARC)**는 AI 시스템의 작업 범위에 걸쳐 습득 능률을 테스트하도록 특별히 설계된 벤치마크입니다.

![이미지](/TIL/assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_2.png)

이는 추론과 추상화가 필요한 이미지 작업들을 포함한 과제 모음처럼 보입니다.

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

여기에는 명확한 의도가 있습니다. 즉, AI 시스템이 예시로부터 학습하고 그 지식을 새로운, 보지 못한 문제를 해결하는 데 적용할 수 있는 능력을 검증하는 것입니다. 이는 인간과 유사한 지능의 중요한 측면으로, 종종 "유동적 지능"이라고 합니다.

ARC 벤치마크는 중요한 이유가 있습니다.

- 이는 이러한 추상적 추론을 필요로 하는 작업에 어려움을 겪는 현재의 기계 학습 방법에 도전합니다.
- 이것은 연구자들이 인간 수준의 지능을 달성하기에 더 가까운 AI 시스템을 개발하는 데 도움이 됩니다.

![이미지](/TIL/assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_3.png)

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

# 다분야 접근

인공 일반 지능(AGI)으로 나아가는 진전이 멈춰있습니다. 엄청나게 방대한 양의 데이터로 훈련된 LLM은 그럼에도 불구하고, 훈련받지 않은 간단한 문제에 적응하거나 새로운 발명을 할 수 없는 상황입니다.

Chollet이 만든 2019년 Abstraction and Reasoning Corpus for Artificial General Intelligence (ARC-AGI)는 AGI의 유일한 공식적인 벤치마크입니다.

최근 NYU 교수이자 Meta의 최고 AI 과학자인 야얀 르쿤은 AGI 분야에서 진전하려면 LLM에 집중해서는 안된다고 공개적으로 언급했습니다...

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

![image](/TIL/assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_4.png)

저는 이 도발을 좋아하고, 모든 AI 연구자가 이 도전에 대해 잘 알고 있다고 믿습니다. 대학 연구자들이 이 분야에서 몇 발자국 앞서 나가야 한다고 생각합니다. 학계는 보통 문제에 대해 다학제적 접근에 숙달되어 있지만, 그들은 자금과 컴퓨팅 파워 등 자원이 부족합니다.

그러나 현재 AI 연구의 추세는 소스코드를 공개하지 않는 연구 방향으로 이동하고 있어서 아이디어와 지식의 공유를 제한하고 있습니다. 이 추세는 "스케일만 있으면 충분하다"는 믿음과 경쟁 우위를 보호하려는 욕심에서 나온 것이죠. 이 방식은 혁신을 억불하며 AGI로의 진전속도를 제한합니다.

언제나 예외는 있습니다...

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

오픈 소스 연구는 협력과 지식 공유를 촉진하여 AGI로의 진전 속도를 가속화합니다. 연구를 공개로 접근 가능하게 함으로써 전 세계의 연구자들이 더 지능적인 AI 시스템의 개발에 기여할 수 있으며, 다양한 시각에서 새로운 아이디어와 혁신이 탄생할 수 있습니다.

AI 연구에서의 투명성 부족과 협력은 AGI가 임박했다는 오도된 인식에 기여하고 있으며, 이는 AI 규제 환경에 영향을 미치고 있습니다. 규제 당국은 AGI가 임박했다는 잘못된 가정 하에 길잡이 AI 연구에 대한 장애물을 고려하고 있습니다.

오픈 소스 연구는 더 지능적인 AI 시스템의 개발을 이끌어주고 일반 지능의 더 정확한 측정 지표를 제공할 수 있습니다.

ARC Challenge는 대규모 경쟁을 진행하는 역사가 있으며, 2020년 Kaggle에서 시작된 첫 번째 ARC-AGI 대회를 시작으로 2022년과 2023년에는 ARCathon이 열렸으며, 가장 최근에는 상금 총액이 1.1백만달러가 넘는 ARC Prize 2024가 있습니다.

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

![2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_5.png](/TIL/assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_5.png)

# 결론…

AGI를 위한 탐험은 복잡하고 도전적인 목표이지만 불가능한 것은 아닙니다.

현대 AI의 제한을 극복하고 AGI를 준비하기 위해, 우리는 오픈소스 연구의 적극적 지지자가 되어야 합니다.

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

하지만 그보다 중요한 것은 우리가 어떤 지적인 것이란 것에 대한 오픈 토론의 일부가 되어야 한다는 것입니다. 다양한 분야의 시각에서 바라봤을 때 어떤 지능인지에 대한 토론을 펼쳐야 합니다.

그렇게 함으로써 누구라도 프로그래밍 전문가가 아니더라도 더 지적인 AI 시스템의 개발에 기여할 수 있게 되어 AGI로의 발전속도를 높일 수 있습니다.

만약 이 이야기가 가치있었다면 조금이라도 지원을 보여주고 싶다면 다음과 같은 방법을 사용할 수 있습니다:

- 이 이야기에 대해 많이 박수를 치기
- 기억하기에 더 중요한 부분을 강조하기 (나중에 그것들을 찾는 데 더 편리하고 나에게는 더 나은 기사를 쓸 수 있습니다)
- '자체 AI 구축하기' 시작하는 방법 배우기, 무료 eBook 다운로드하기
- 저를 Medium에서 팔로우하기
- 내 최신 기사 읽기 https://medium.com/@fabio.matricardi

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

자료 및 참고 자료:

![Generative AI](/TIL/assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_6.png)

이 이야기는 Generative AI에서 게시되었습니다. LinkedIn에서 저희와 연락을 유지하고 최신 AI 이야기에 대해 최신 정보를 얻으려면 Zeniteq를 팔로우하세요.

저희의 뉴스레터를 구독하여 generative AI의 최신 뉴스와 업데이트를 받아보세요. 함께 AI의 미래를 함께 만들어가요!

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

![Image](/TIL/assets/img/2024-07-09-ProgresstowardstrueArtificialGeneralIntelligenceAGIhashitawall_7.png)
