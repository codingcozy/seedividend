---
title: "시스템 엔지니어로 해결책을 제공하면서 배운 교훈들"
description: ""
coverImage: "/assets/img/2024-07-14-LessonsfromDeliveringSolutionsasaSystemsEngineer_0.png"
date: 2024-07-14 00:32
ogImage:
  url: /assets/img/2024-07-14-LessonsfromDeliveringSolutionsasaSystemsEngineer_0.png
tag: Tech
originalTitle: "Lessons from Delivering Solutions as a Systems Engineer"
link: "https://medium.com/@dmosyan/lessons-from-delivering-solutions-as-a-systems-engineer-048bc6827a5f"
isUpdated: true
---

안녕하세요! 👋 이 기사를 봐 주셔서 감사합니다. 여기서는 특정 기술에 대해 깊게 다루지는 않겠지만, Kubernetes에 대한 언급을 몇 번 볼 수 있을 겁니다. 이러한 교훈 대부분은 서로 다른 회사들에서 Kubernetes로의 이주 프로젝트를 진행하면서 배웠어요. 5년간 시스템 엔지니어로 일한 경험을 토대로 다양한 통찰을 얻었는데, 함께 나누고 싶어하네요. 여러분의 관점이 다르다면, 의견을 나누고 싶어요.

# 📝 설계 문서부터 시작하세요

간단히 말해서, 문제를 어떻게 해결할지 설명해야 합니다. 현재 문제점을 수집하고 이해하며, 그 문제들을 바탕으로 해결 방법을 설계하는 것을 포함합니다. 예를 들어, 귀하의 소프트웨어에 확장성 문제가 없을 수 있지만, Kubernetes의 첫 번째 장점 중 하나는 확장성이라고 생각할 수 있어요. "그 문제를 해결해야 할까요?"

설계 문서를 가지고 누군가에게 가르칠 필요는 없으니, 목표, 현존하는 문제, 연구, 제안된 해결책에 집중하는 것이 좋습니다. 그리고 해결하지 않을 것들에 대해 명확히 알려주는 것을 잊지 마세요.

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

# 🔍👀 문서를 검토해보세요

![image](/assets/img/2024-07-14-LessonsfromDeliveringSolutionsasaSystemsEngineer_0.png)

구현을 시작하기 전에, 팀 (또는 적어도 주요 인원)이 문서를 검토했는지 확인하세요. 내가 한 실수는 단순히 문서를 Teams/Slack을 통해 보냈고 팀이 검토할 것이라고 기대한 것이었습니다. 이것은 설계 문서 검토를 잘 다루는 관행에 관한 것인데, 팀이 작다면 그렇지 못할 수도 있습니다.

검토자 이름이 문서에 추가되었는지 확인하세요. 누군가 잘못될 경우를 대비해서가 아닙니다. 검토자 이름이 언급되면 문서를 읽는 사람에게 재고를 하도록 강요할 뿐입니다. 제 느낌 상, 이름이 언급되면 더 많은 피드백과 질문을 받게 되실 겁니다. 이 문서 또한 "제품"이기 때문에 가능한 많은 피드백을 받으시고 싶으실 것입니다.

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

# ☑️ 시작은 작게 하고 빠르게 실행하세요

![image](/assets/img/2024-07-14-LessonsfromDeliveringSolutionsasaSystemsEngineer_1.png)

보통은 단계별로 빨리 제품을 출시하는 것이 좋습니다. 오늘 프로젝트가 승인되었다고 해서 비즈니스가 여러 달동안 작업할 수 있도록 허용한다는 것은 아닙니다. (재정적 이유나 다른 중요한 프로젝트들이 더 많은 엔지니어링 자원을 필요로 하거나, 클라이언트가 만족스럽지 않을 때 등) 그러므로 최대한 빨리 제품을 출시하는 것이 좋습니다. 최악의 경우에도 작은 부분에 대한 피드백을 오랜 시간동안 받게 될 뿐이니까요.

예를 들어, 수십 개의 마이크로서비스를 Kubernetes로 이주해야 하는 경우, 한 서비스부터 이주 작업을 시작하세요. Dockerfile, 인프라, CI/CD 작업을 하고 처음에는 1개의 파드/컨테이너만 실행하세요. 비즈니스가 프로젝트를 연기하기로 결정한다면, 적어도 1개의 마이크로서비스가 Kubernetes에서 실행 중입니다. 설계 문서를 작성할 때 고려하지 않았던 문제들이 시간이 지남에 따라 발생하기 시작할 겁니다.

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

# 💻 매 번 이터레이션을 끝낸 후 카오스 엔지니어링을 실시해보세요

해법을 이해하는 것이 중요한데, 설계하고 구현한 사람이기 때문에 이해하는 것이라고 다른 사람들도 매일 업데이트된 문서를 리뷰하거나 받았다고 동일하게 이해할 수 있는 것은 아닙니다. 제 매니저와 함께 팀 전체가 실제 경험을 터득하도록 '강제'로 카오스 엔지니어링을 도입해보았어요.

카오스 엔지니어링에 대해 아무것도 알지 못한다면, 꼭 알아보시기를 추천합니다. 여기서 시작해서 책들도 읽어보세요. 그냥 설정을 바꾸고 시스템을 망가뜨리기 쉬운 것이 아니에요.

# 💡 피드백을 받아보세요

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

이미 몇 번 언급한 적이 있지만, 이 부분을 강조하기에는 충분하지 않을 정도입니다. 어떤 피드백을 받아야 할까요? 칭찬을 받는 것이 중요한 게 아니라, 문제를 해결하는 데 집중해야 합니다. 많은 엔지니어들이 피드백을 기능 요청 형태로 제공할 수 있습니다. 모든 의견을 듣되, 특수한 경우에 대한 해결책까지 반드시 구현할 필요는 없습니다.

이 시점에서 빠르게 "MVP"(Minimum Viable Product)에 도달하는 것이 중요합니다. 예를 들어, 쿠버네티스로의 이주 일부를 자동화해달라는 요청을 받았습니다. 엔지니어들이 다른 긴급한 기능에 바빠서 그 일을 자동화하는 데 한 달이 걸렸습니다 (물론 그것이 저의 유일한 작업이 아니었습니다). 그러나 그 이후로 그것을 별로 사용하지 않았습니다.

MVP에서는 확장 가능하고 안전하며 (이에 대한 추가 설명은 나중에 할 것입니다) 신뢰할 수 있는 해결책이 필요하지 않습니다. 문제를 해결하는 데 집중하면 됩니다. 그리고 품질 좋은 피드백을 빠르게 수집할수록 더 빨리 성장할 수 있을 것입니다.

# 작업 분배

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

저희 팀 내에서 혼자가 아니라서 다행이에요 :) 가까운 동료들도 경험을 쌓을 수 있어야 해요. 작은 업무라도 프로젝트 업무를 분배하는 것이 장기적으로 가장 좋은 선택일 거예요. 몇 시간 안에 다 할 수 있을거라고 생각할 수도 있지만, 다른 사람에게 맡기면 며칠이 걸릴지 모르죠. 짧은 기간에는 맞겠지만, 프로젝트가 몇 달 걸린다면 오늘 분배하는 게 좋을 거예요.

# 보안을 잊지 마세요

보안은 개발 프로세스의 일부이며 무시하고 싶지 않아요. 어렵고 속도를 늦추는 부분이겠죠. 하지만 당신의 솔루션으로 보안 위반 사고가 발생하는 것은 최악일 거예요. 설정, 비밀 정보 또는 권한을 올바르게 관리하지 않는다면 MVP를 전달해서는 안돼요.

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

한 번의 이주 과정에서 엔지니어들에게 모든 쿠버네티스 API 액세스를 제공해줬었는데, 왜냐하면 그랬다고요? 그 후 클러스터에 배포하기 전에 컨테이너 이미지 취약점 스캐너를 사용하지 않았습니다. 스캐너를 도입한 후 고수준 취약점 문제가 많이 발견되었고, 그것들을 고치는 데 시간이 걸렸어요.

이 밖에도 더 많은 "교훈"이 있지만 여기까지 하겠습니다. 이 내용이 마음에 드신다면 👏과 구독 부탁드립니다.

참고로, 여러분의 경험과 회사 프로세스는 다를 수 있습니다. 우리 모두에게 소중한 학습 기회인 실수에 감사드립니다.

읽어주셔서 감사합니다.
