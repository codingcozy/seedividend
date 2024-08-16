---
title: "최신 업데이트 이후에도 LangChain 사용 시 주의해야 하는 이유"
description: ""
coverImage: "/assets/img/2024-08-17-WhyYouShouldBeCautiousAboutUsingLangChainEvenAfterItsLatestUpdates_0.png"
date: 2024-08-17 01:33
ogImage: 
  url: /assets/img/2024-08-17-WhyYouShouldBeCautiousAboutUsingLangChainEvenAfterItsLatestUpdates_0.png
tag: Tech
originalTitle: "Why You Should Be Cautious About Using LangChain Even After Its Latest Updates"
link: "https://medium.com/ai-advances/why-you-should-be-cautious-about-using-langchain-even-after-its-latest-updates-b84dae6639a4"
isUpdated: false
---



![LangChain](/assets/img/2024-08-17-WhyYouShouldBeCautiousAboutUsingLangChainEvenAfterItsLatestUpdates_0.png)

## 먼저, 일부 맥락

LangChain은 2022년 10월 대형 언어 모델 (LLM)에 대한 응용 프레임워크 분야에서 주목할만한 선수로 등장했습니다. Robust Intelligence에서 일하던 Harrison Chase는 챗봇, 문서 요약, 코드 분석과 같은 다양한 응용 프로그램을 위해 LLM과 상호 작용을 간단하게 하는 프레임워크를 만드는 비전으로 LangChain을 개발했습니다.

이 프레임워크는 오픈 소스 특성과 GitHub에서 개발자들의 적극적인 기여로 빠르게 주목을 받았습니다. 2023년 초까지, LangChain은 소셜 미디어에서의 논의, 번창하는 Discord 커뮤니티, 그리고 YouTube와 같은 플랫폼에서의 교육 콘텐츠를 통해 인기가 상당히 성장했습니다.


<div class="content-ad"></div>

2023년 4월, LangChain은 스타트업으로 전환하여 Sequoia Capital 및 Benchmark를 포함한 벤처 투자 기관으로부터 2천만 달러 이상의 자금을 확보했습니다. 이번 자금 지원으로 랑체인 프레임워크를 둘러싼 높은 기대가 부각되었는데, 특히 ChatGPT의 널리 퍼진 사용 이후 발생한 생성형 인공지능 기술에 대한 강한 관심이 있던 시기에 높아졌습니다.

이후 2023년, LangChain은 LangChain 표현 언어(LCEL) 및 LangServe와 같은 새로운 기능을 소개하여 개발자들을 위한 기능을 향상시키고 응용 프로그램의 배포를 간소화하는 데 주력했습니다. 이른바 연말까지, LangChain은 인공지능 애플리케이션 개발 도구로 자리를 잡았으며, 계속 발전하는 AI 환경에서 중요한 역할을 했습니다.

# 최신 LangChain 업데이트

2024년 5월, LangChain은 버전 0.2를 출시하여 이전에 받은 비판을 해소하고 사용자 경험을 개선하는 중요한 업데이트를 소개했습니다. 이 버전에는 기능을 최적화하고 통합 기능을 향상시키기 위한 파손 변경 사항과 사용 안내가 포함되었습니다.

<div class="content-ad"></div>

주요 업데이트 사항은 다음과 같습니다:

- LangChain 표현 언어 (LCEL) 도입으로, 작업 체인 정의에 보다 선언적인 스타일을 가능하게 함
- 레거시 체인의 쉬운 이관을 위한 langchain-cli 업데이트
- 향상된 보안 조치 및 개선된 오류 처리
- LCEL 코드를 프로덕션에 적합한 API로 호스팅하기 위한 LangServe 출시

이번 업데이트는 LangChain이 언어 모델 프레임워크의 경쟁적 환경에서의 중요성을 유지하고, AI 기반 애플리케이션 개발자들에게 더 강력한 도구를 제공하는 것을 목표로 합니다.

# 사용 편의성 및 복잡성 문제

<div class="content-ad"></div>

인기가 있지만 LangChain은 사용성과 복잡성에 대해 비판을 받아왔습니다. 많은 개발자들이 이 프레임워크의 구조가 혼동스러울 수 있고, 지나치게 추상화된 수준으로 핵심 기능을 이해하기 어렵다고 보고했습니다.

일반적인 불만사항은 다음과 같습니다:

- 종종 표준 Python 기능을 감싼 '도우미' 함수에 많은 의존
- 예상치 못한 동작과 일관성 부족으로 이어지는 높은 추상화 수준
- 복잡한 계층 때문에 맞춤화에 대한 도전
- 명확하지 않은 문서와 숨겨진 복잡성으로 인한 문제 해결의 어려움

이러한 문제들로 일부 개발자들은 LangChain이 프로젝트에 가장 적합한 도구인지에 대해 의문을 제기하고 있습니다, 특히 보다 간단한 대안들과 비교했을 때.

<div class="content-ad"></div>

# 운영 중 성능

LangChain의 실제 응용 프로그램에서의 성능이 일부 개발자들 사이에서 우려를 불러 일으켰습니다. 느린 속도와 높은 자원 소비에 관한 보고서가 나왔는데, 이는 이 프레임워크를 사용하는 응용 프로그램의 효율에 영향을 줄 수 있습니다.

구체적으로 다음과 같은 문제점이 있습니다:

- 예상보다 더 많은 시간이 소요되는 작업
- ConversationRetrievalChain이 사용자 입력을 다시 정리하는 경향이 있는 것으로, 때로는 대화의 흐름을 방해합니다.
- 특정 산업 분야에서 정확한 용어가 중요한 경우에 한정된 적응성

<div class="content-ad"></div>

LangChain은 학습과 프로토타이핑에 유용할 수 있지만, 이러한 성능 이슈로 인해 일부 개발자들이 프로덕션 환경에 대비하지 않았다는 점을 의심하고 있습니다. 특히 특정 어휘 또는 고위험 시나리오를 다루는 산업에서는 더욱 그렇습니다.

# 문서 및 커뮤니티 지원

LangChain의 문서는 많은 사용자들 사이에서 논란의 여지가 있습니다. 일부 경쟁 프레임워크와 비교했을 때, LangChain의 문서 품질은 부적절하다는 비판을 받고 있습니다. 다음과 같은 문제점이 보고되었습니다:

- 완전하지 않은 안내 및 명확하지 않은 설명
- 오래된 정보 및 링크 오류
- 잘못된 코드 예제

<div class="content-ad"></div>

이러한 문서화 문제는 새로운 사용자들이 플랫폼을 효과적으로 활용하는 것을 방해하고, 신뢰할 수 있는 리소스가 중요한 프로덕션 환경에서의 널리 퍼지는 채택을 방해할 수 있습니다.

LangChain은 지원 및 지식 공유를 위한 커뮤니티를 구축했지만, 이 커뮤니티의 견고성은 문서화 문제로 인해 어느 정도 제약을 받습니다. 개발자들은 공식 문서에서 남은 빈 곳을 채우기 위해 커뮤니티 포럼에 의존해야 하는 경우가 많은데, 이는 받는 지원의 일관성에 불일치를 초래할 수 있습니다.

# LangChain의 대체 솔루션

LangChain 대안을 고려할 때, 다른 라이브러리들을 탐색해보는 것이 좋을 수 있습니다. 그 중 하나가 Kenny Vaneetvelde가 개발한 Atomic Agents입니다 (네 맞아요, 바로 저입니다!).

<div class="content-ad"></div>

Atomic Agents는 LangChain 및 기타 유사한 프레임워크와 관련된 일부 단점을 해결하기 위해 설계되었습니다. 다음은 Atomic Agents의 주요 기능 및 철학입니다:

- 모듈성과 확장성: 이 프레임워크는 UI 개발의 Atomic Design 개념과 유사한 작은 단일 목적 구성 요소를 만드는 원칙에 기반을 두고 있습니다. 이 접근 방식은 프레임워크를 보다 유연하고 이해하기 쉽도록 만드는 것을 목표로 합니다.
- Instructor 및 Pydantic 기반: Atomic Agents는 언어 모델과 상호 작용하기 위해 Instructor의 기능과 데이터 유효성 검사 및 직렬화를 위해 Pydantic를 활용하여 AI 응용 프로그램을 구축하는 견고한 기반을 제공합니다.
- 모델 호환성: Instructor에 의존하므로 Atomic Agents는 OpenAI 외에도 Cohere, Anthropic, Gemini와 같은 Instructor에서 지원하는 여러 AI 모델과 호환됩니다.
- 사용 편의성: 이 프레임워크는 사용자 친화적으로 설계되었으며 빠르게 시작할 수 있도록 명확한 문서와 예제에 집중합니다.
- 유연성: Atomic Agents는 Ollama 또는 LMStudio와 같은 플랫폼을 통해 로컬 모델과 작동할 수 있어 로컬 배포를 선호하거나 필요로 하는 개발자들을 위한 옵션을 제공합니다.

이러한 측면에 중점을 두어, Atomic Agents는 AI 모델과 작업하는 개발자들에게 더 간소화되고 직관적인 경험을 제공하려는 목표를 가지고 있으며, LangChain과 관련된 일부 복잡성 및 사용 용이성 문제를 피하려고 합니다.

Atomic Agents의 창시자로서, 다른 프레임워크에서 관찰된 제한 사항을 해결하기 위해 특별히 설계했습니다. 그러나 모든 도구와 마찬가지로 해당 도구의 적합성은 특정 프로젝트 요구 사항과 선호도에 따라 다를 것임을 감안해야 합니다.

<div class="content-ad"></div>

# 결론

LangChain은 인기를 얻으며 여러 문제에 대한 업데이트를 소개했지만, 생산 환경에서의 효율에 영향을 줄 수 있는 여러 제약 요소가 여전히 존재합니다:

- ConversationRetrievalChain과 같은 자연어 처리 작업에 대한 문제, 입력 질문을 재구성하는 경향으로 대화 흐름을 방해할 수 있음
- 표준화된 상호 운용 가능한 데이터 유형이 없어 통합에 대한 어려움
- 문맥과 용어의 미묘한 이해가 필요한 전문 분야에서의 제한된 효과
- 문서 품질 및 사용 편의성에 대한 계속되는 우려

이러한 요인들은 LangChain이 교육 자료 및 프로토타입 도구로 유용할 수 있지만, 더 전문화되고 사용자 친화적인 대안이 더 많이 나타남에 따라 관련성을 유지하는 데 어려움을 겪을 수 있다는 것을 시사합니다.

<div class="content-ad"></div>

# 작가 지원하기

만약 이 글이 유용했다면, 자유롭게, 의무는 없지만, 제 PayPal.me 팁 보관함으로 적절한 금액을 기부해주세요!

여러분의 지원은 큰 도움이 되며, 계속해서 글을 쓰고 자습서를 만들 수 있도록 해줍니다.

감사합니다!

<div class="content-ad"></div>

경험 많은 프리랜서 건축가/개발자/리드를 찾고 계시거나 개념 증명을 개발하려는 경우, 심지어 AI 구현에 대한 전략적 조언이 필요한 경우, 제가 바로 그 분입니다!

LinkedIn에서 연락하시거나 kenny.vaneetvelde@gmail.com으로 이메일을 보내주셔도 좋습니다. 제가 참여하고 싶은 프로젝트가 있다면 망설이지 마세요.

![이미지](/assets/img/2024-08-17-WhyYouShouldBeCautiousAboutUsingLangChainEvenAfterItsLatestUpdates_1.png)