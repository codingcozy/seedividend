---
title: "내 경험 없이 AI 스타트업을 처음 구축한 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-HowIBuiltMyFirstAIStartupWithNoExperience_0.png"
date: 2024-07-06 10:31
ogImage:
  url: /assets/img/2024-07-06-HowIBuiltMyFirstAIStartupWithNoExperience_0.png
tag: Tech
originalTitle: "How I Built My First AI Startup (With No Experience)"
link: "https://medium.com/python-in-plain-english/how-i-built-my-first-ai-startup-with-no-experience-2b676f3768da"
---

제 첫 AI 스타트업을 어떻게 구축했는지에 대한 자세한 여정(스타트업을 만들기 위한 조언 포함).

/assets/img/2024-07-06-HowIBuiltMyFirstAIStartupWithNoExperience_0.png

# 소개

먼저, 제 소개를 간략히 하겠습니다. 저는 상업 경험이 2년 이상, Python 코딩 경험이 5년 이상인 데이터 과학자입니다. 주로 백엔드와 AI 작업을 맡고 있습니다. 저는 일반적으로 프로젝트 전체를 혼자 만들어본 적은 없지만, 대신 보통 작업을 맡아 왔습니다.

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

하지만 시간이 지난 후, 나는 스스로 무언가를 만들어보려는 충분한 지식이 있다고 느끼기 시작했습니다. 그리고 그것을 만들었어요. 제 기대와는 반대로, 그렇게 어렵지 않았죠. 더구나, 창업 동료와 함께 1개월 만에 만들어내기도 했고, 이미 어떤 이익을 올려 1000명 이상의 방문자도 끌어 모았어요. 광고 비용을 내지 않았답니다.

그럼 — 여러분은 이미 한 적이 없다면 왜 스타트업을 만들고 싶어할까요?

나는 그렇게 많은 것을 가르쳐주는 단일한 수업이나 프로젝트는 없었습니다. 수업을 마치면 특정한 기술을 배우지만 제품 전체에 대해 작업할 때는 전체 개발 주기를 이해하기 시작합니다. 디자인부터 빌드까지, 배포까지 말이에요. 제 기존 기술을 연마하고 새로운 것을 배우기도 했으며, 프론트엔드와 백엔드가 실제로 상호 작용하는 방법 및 파이썬 개발자로써 프론트엔드 동료가 더 쉽게 사용할 수 있는 API를 작성하는 법을 이해하기 시작했습니다.

또 다른 이유는 이력서에 좋은 추가입니다. 스타트업에 투입한 시간만큼은 상업적인 근무 경험으로 인정받을 뿐 아니라 포트폴리오에서도 큰 장점이 됩니다 (특히 일부 인사팀이 방문할 수 있는 웹사이트인 경우).

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

마침내 마지막이자 주요한 이유는 돈입니다. 당신의 스타트업이 SaaS(소프트웨어서비스)인 경우, 이를 사실상 수동 소득원으로 생각할 수 있습니다. 그리고 여러 개의 작은 SaaS 웹사이트를 구축하면 더 많은 속도, 전문성 및 경험을 얻을 수 있습니다. 즉, 새 제품을 만드는 데 매우 적은 시간이 걸리면서 더 많은 수익을 창출할 수 있습니다.

이 글에서는 내가 스타트업을 구축하면서 얻은 경험과 구체적인 팁과 조언을 공유하겠습니다.

# 아이디어 찾기

/assets/img/2024-07-06-HowIBuiltMyFirstAIStartupWithNoExperience_1.png

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

당신은 제품에 대한 아이디어가 있을 수도 있고, 없을 수도 있습니다. 아니면 수백 가지 아이디어가 있을 수도 있습니다. 브레인스토밍은 창의적인 과정이기 때문에 새로운 아이디어를 발생시키는 표준화된 프로세스는 실제로 존재하지 않습니다.

그러나 아이디어를 검증하는 프로세스는 존재합니다:

- 관련 시장을 확인하세요. 책 대여 웹사이트를 만들고 싶나요? 책, 대여 서비스와 같은 시장 규모를 확인하고, 작년에 판매된 책의 양 등을 찾아보세요. 최근 이러한 시장 중 일부가 하락 추세를 보이고 있다면, 이것이 문제가 될 수 있습니다. 예를 들어, 전자책, 책 앱 등의 등장으로 책이 점점 더 인기가 떨어지고 있습니다.
- 경쟁사를 확인하세요. 경쟁사가 많다면, 당신의 솔루션이 최소 5배에서 10배 정도 더 나은지 확인해야 합니다. 경쟁사가 적다면, 여전히 긍정적인 신호입니다 — 이 제품을 통해 배울 수 있고, 수익을 내는지 확인할 수 있으며, 시장 적합성이 있는지 확인할 수 있습니다. 그러나 경쟁사가 없다면 — 상황이 복잡해집니다. 이는 아이디어가 너무 혁신적이라 아직 아무도 생각하지 못했을 수도 있고, 아니면 당신의 아이디어가 이른바 "잡초 구덩이" 아이디어일 수도 있습니다. 많은 사람들이 시도해봤지만 아무도 성공하지 못했다는 뜻입니다. 이 경우, 가능한 한 이 아이디어에서 멀리 떨어져야 합니다.
- 당신이 해결하려는 문제와 고객을 분석하세요. 당신의 타깃 대상은 누구인가요? 그들은 얼마나 지불하려고 할까요? 이 문제가 얼마나 자주 발생하는가요? 이를 피할 수 있을까요?

그리고 이제 제 스타트업을 소개할 때가 딱인 시점입니다 — https://validator.yazero.io. 우리는 인공지능, 웹 스크레이핑, 다양한 API, 그리고 측정 가능한 피드백을 활용하여 검증 프로세스를 돕습니다.

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

아이디어를 찾을 때 하나 더 조언 드릴게요 — "개인적인 장점"을 활용해보세요. 물리학 같은 특정 분야의 학위가 있나요? 해당 분야에서 지식을 활용해보세요. 로펌에서 친구가 있는가요? 그의 직면한 문제, 프로세스 최적화 방법 등을 물어보는 방법을 시도해보세요.

그리고 아이디어에 대해 더 알고 싶다면 이전 기사를 확인해보세요. 해당 기사는 기술적인 사람들을 대상으로 한 창업 가이드에요.

# 공동창업자 찾기

/assets/img/2024-07-06-HowIBuiltMyFirstAIStartupWithNoExperience_2.png

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

창업 중에서 마케팅이나 프론트엔드, 판매 등 하기 싫은 일이 있나요? 그렇다면, 공동 창업자를 찾는 것이 가장 좋은 해결책입니다. 그들은 해당 분야에서 보다 더 경험이 있을 뿐만 아니라 그 일에 흥미를 가지고 일할 의지를 갖게 될 것입니다. 자신만의 제품을 개발하는 것은 개인적으로 흥미롭고 즐거워야 합니다. 그러니 싫어하는 부분이 있다면 그 부분을 위임하는 것을 시도해보세요.

공동 창업자를 찾는 또 다른 이유는 추가적인 검증입니다. 그들은 항상 여러분이 좋지 않을 수도 있는 아이디어에 너무 깊게 빠지지 않도록 도와줄 것입니다. 제품에 대한 피드백을 제공해 주고, 마지막으로는 여러분만큼 제품 구축에 관심이 있습니다. 이는 여러분이 스타트업을 더 빠르고 더 나은 방향으로 운영할 수 있음을 의미합니다. 때로는 그 이상으로 빠르게 할 수도 있습니다.

예를 들어, 프론트엔드 경험이 없다면 새로운 프레임워크를 배우는 것은 정말 어려울 수 있습니다. 많은 시간이 소요될 뿐만 아니라, 여러분에게 가장 소중한 자원인 동기부여를 앗아갈 수도 있습니다. 그러나 공동 창업자에게 위임하면 그들은 무시무시하게 끝내고 더 높은 품질의 결과물을 제공할 것이며, 여러분은 자신에게 흥미로운 일에 집중할 수 있을 것입니다.

YCombinator 공동 창업자 매칭 플랫폼과 같은 플랫폼에서 첫 번째 공동 창업자를 찾을 수 있습니다. 저는 거기에서 제 공동 창업자를 찾았고, 그 결정에 매우 만족하고 있습니다.

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

또한, 일부 협업 도구들 — 저희의 업무 흐름에서는 할 일을 할당하고 진행 상황을 추적하기 위해 Todoist를 사용하며, 버전 관리와 자동 배포를 위해 Github를 사용하고, 디자인 및 개념 브레인스토밍을 위해 Figma를 사용합니다.

/assets/img/2024-07-06-HowIBuiltMyFirstAIStartupWithNoExperience_3.png

# 프론트엔드

마지막으로, 우리는 기술적 부분부터 시작합니다.

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

프론트엔드에 대한 주요 조언(만약 당신이 스스로 구현하기로 결정했다면)은 당신이 알고 있는 프레임워크를 사용하는 것입니다. 그것이 구식이든, 다른 개발자들이 싫어하든 상관없이, 당신이 안다면 사용하세요. 중요한 것은 최종 사용자에게 솔루션을 제공하는 것입니다. 그들에게 작동한다면, 당신에게도 작동합니다.

초보 프론트엔드 개발자들 사이에 종종 발생하는 문제는 항상 최신 트렌드를 따르고, 유명한 유튜버가 추천하는 "최고"의 프레임워크를 사용하려고 하며, 결국 모든 새 프로젝트에서 모든 것을 다시 배우는 것입니다.

당신이 알고 있는 프레임워크를 계속 사용하고 그 사용 방법에 대한 기술을 연마하는 것이 훨씬 나은 방법입니다. 이렇게 하면 버그를 수정하는 방법을 알게 되며, 더 빨리 개발할 수 있으며, 다음에 시작할 때 몇 가지 템플릿이 준비되어 있을 것입니다.

파이썬 애호가라면, 나의 파이썬에서의 최상위 5개 프론트엔드 라이브러리 및 파이썬에서의 최상위 5개 프론트엔드 라이브러리 파트2를 확인하는 것을 추천합니다. 나는 가장 많이 사용되는 파이썬 라이브러리들에 대한 포괄적인 개요를 제공하고 그들의 장단점을 비교했습니다. 파이썬에 대한 경험이 있는 경우, 이러한 라이브러리를 사용하는 것이 더 쉬울 것이므로 제품을 빨리 개발할 수 있을 것입니다.

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

/assets/img/2024-07-06-HowIBuiltMyFirstAIStartupWithNoExperience_4.png

배포하는 방법은 두 가지입니다:

- Vercel, Netlify 및 AWS Amplify와 같은 기존 솔루션을 사용하는 것입니다. 특히 NextJS와 React와 같은 인기 있는 프레임워크를 사용하는 경우에는 이 방법이 가장 쉽습니다. 다만, 대부분의 이러한 솔루션은 상용으로 무료 배포를 제공하지 않습니다. 예를 들어, Vercel에서는 20달러를 지불해야 합니다. AWS Amplify는 무료 상용 플랜이 있지만, 콜드 스타트(웹사이트가 충분히 자주 방문되지 않으면 다음 방문 시 약 4초가 소요됩니다)가 있습니다.
- 자체 호스팅 솔루션을 이용하여 Hetzner, AWS, Google Cloud 등의 공급업체를 사용하는 것입니다. 한쪽에서는 무료 티어가 종종 없습니다. 다른 한쪽에서는 가장 저렴한 솔루션이 종종 매우 저렴합니다. 예를 들어, Hetzner에서는 5유로에 2 VCPU 4GB RAM 전용 서버를 구할 수 있습니다(대부분의 경우 100명 이하의 동시 사용자/계산량이 적은 웹사이트에 충분합니다). 자체 호스팅 솔루션을 사용하면 앱에 대한 제어 및 투명성이 많이 제공됩니다. 자체 호스팅 솔루션을 사용하는 장점 중 하나는 DNS, SSL, Docker 등을 설정하는 방법을 배울 수 있어서 이력서와 기술력을 크게 향상시킬 수 있다는 것입니다.

# Backend

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

나는 우리 스타트업에서 주로 백엔드 부분에 작업을 많이 하기 때문에 이 부분을 좀 더 자세히 설명하겠습니다.

가끔 의문이 듭니다 — 왜 백엔드가 필요한 거죠? 모든 것을 사용자 측에서 처리할 수 없는 이유가 뭡니까?

답은 더 나은 보안, 감시 가능성, 파이프라인 제어 권한, 더 나은 로깅 그리고 더 큰 계산 성능을 사용할 수 있는 능력 때문입니다. 큰 머신러닝 모델을 호스팅 중이라면 사용자에게 보내고 그들 쪽에서 계산을 수행하는 것은 종종 좋지 않은 아이디어일 수 있습니다. 더 나은 해결책은 사용자가 사용하는 프론트엔드를 위한 개인 서버와 GPU, API를 사용하는 것입니다.

내가 우리 스타트업의 백엔드에서 사용한 주요 도구는 FastAPI with Pydantic, Gunicorn, Docker, Docker Compose 그리고 Nginx 입니다. Docker를 좋아하는 이유는 OS, 환경 등에 상관없이 항상 작동하는 솔루션을 제공하기 때문입니다. 또한 앱의 여러 구성 요소를 동시에 실행해야 하는 경우 — 예를 들어 백엔드와 병렬로 데이터베이스 등을 실행해야 하는 경우 — 매우 유용합니다.

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

백엔드에서 필요한 중요한 것 중 하나는 모니터링입니다. 이 목표를 위해 두 가지 별도의 솔루션을 찾았습니다 — 프로메테우스(prometheus)와 FastAPI-analytics입니다. 이 두 가지 솔루션은 API가 요청을 성공적으로 처리하는지, 응답 시간은 어떠한지, 가장 많이 사용되는 엔드포인트는 무엇인지 등을 확인할 수 있는 멋진 대시보드를 제공합니다.

/assets/img/2024-07-06-HowIBuiltMyFirstAIStartupWithNoExperience_5.png

백엔드를 모니터링하는 장점은 문제/버그가 있는지 또는 예를 들어 더 많은 RAM/CPU 파워를 가진 더 좋은 서버가 필요하다는 지표를 인식할 수 있다는 것입니다.

제가 보통 Hetzner의 VPS에 솔루션을 배포하는데, 그것이 가장 저렴한 옵션이기 때문입니다.

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

마침내, "파이썬은 프로덕션에서 사용하기에 너무 느리고 무겁다"고 말하는 사람들이 많습니다. 그러나 이는 99%의 경우 사실이 아닙니다.

우선, 사용자에게는 1밀리초 대신 5밀리초가 걸려도 별 차이가 없습니다. 하지만 해결책을 개발하는 데 몇 주가 아닌 며칠이 걸릴 경우, 이것은 큰 장점이 됩니다.

둘째, 대부분의 라이브러리는 충분히 최적화되어 있거나 베이스로 포트란/C/Rust 등의 언어를 사용하므로 최종적으로 동일한 속도를 얻을 수 있습니다.

마지막으로, AI 앱을 구축하고 특히 LLMs를 사용하는 경우, 응답 생성이 몇 초가 걸릴 수 있습니다(이는 프로그래밍 언어가 아닌 계산 능력/API/기타 요소에 의존합니다). 따라서 요청이 20초 걸린다면, 파이썬 계산이 0.1초 걸리는 것이 중요할까요?

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

# 요약

이 글에서는 자신의 스타트업을 만드는 주요 부분들에 대해 다루었습니다 — 왜 필요한지, 그 한 가지 완벽한 아이디어를 찾는 방법, 프론트엔드와 백엔드를 구축하는 방법, 그리고 이를 서비스로 제공하는 방법에 대해 이야기했습니다.

만약 이 내용이 유용했다면 알려주세요. 그리고 제가 두 번째 부분(생산에 AI 활용, MLOps, 마케팅, 출판, 판매, 광고, 가격 모델 등)을 쓰는 것이 좋을지 댓글로 의견을 남겨주시면 감사하겠습니다.

또한 백엔드의 상용화에 대해 더 깊이 들어가서 실제 예제와 안내를 제공할 수도 있습니다. 그러니 이 글 아래에 댓글을 달아서 피드백을 주시면 감사하겠습니다!

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

위 내용을 읽어주셔서 감사합니다! 즐거운 코딩하세요!
업데이트: 다음 글이 이미 공개되었어요. 거기에서 더 많은 인사이트를 파이썬, 데이터 과학 그리고 기업가 정신에 대해 공유했어요!

# 참고 자료

- https://validator.yazero.io
- https://yazero.io
- https://shelamanov.medium.com/starting-a-startup-guide-for-techies-d220119c0b07
- https://www.ycombinator.com/cofounder-matching
- https://python.plainenglish.io/top-5-python-frontend-libraries-for-data-science-91261a65e366
- https://medium.com/python-in-plain-english/top-5-python-frontend-libraries-for-data-science-part-2-4d07a48d2fde
- https://solara.dev/
- https://github.com/trallnag/prometheus-fastapi-instrumentator
- https://github.com/tom-draper/api-analytics

# In Plain English 🚀

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

인 플레인 영어 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 칭찬하고 팔로우 해주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기
