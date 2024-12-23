---
title: "서버리스에 대한 고찰 현재 상황, 커뮤니티 의견, 그리고 미래 전망"
description: ""
coverImage: "/assets/img/2024-08-19-ReflectingonServerlessCurrentStateCommunityThoughtsandFutureProspects_0.png"
date: 2024-08-19 03:12
ogImage:
  url: /assets/img/2024-08-19-ReflectingonServerlessCurrentStateCommunityThoughtsandFutureProspects_0.png
tag: Tech
originalTitle: "Reflecting on Serverless Current State, Community Thoughts, and Future Prospects"
link: "https://medium.com/@isenberg-ran/reflecting-on-serverless-current-state-community-thoughts-and-future-prospects-174670a65a88"
isUpdated: true
updatedAt: 1724032955771
---

<img src="/assets/img/2024-08-19-ReflectingonServerlessCurrentStateCommunityThoughtsandFutureProspects_0.png" />

요즘 온라인에서 많은 서버리스 관련 소식과 다양한 의견을 보았어요. 이것들은 커뮤니티를 활기차게 만들고 토론을 촉진했는데, 이는 항상 좋은 일이죠.

이 게시물에서는 서버리스의 현재 상태를 되짚어보고, 커뮤니티에서 나온 서버리스 관련 글에 대한 생각을 나누며, 서버리스의 미래에 대해 논의할 거에요.

<img src="/assets/img/2024-08-19-ReflectingonServerlessCurrentStateCommunityThoughtsandFutureProspects_1.png" />

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

이 블로그 글은 내 웹사이트 "Ran The Builder"에 원래 게시되었습니다.

# 목차

- 소개
- 웹 상의 서버리스 독서
- 교묘한 클릭베이트 기사
- 서버리스 & 인공지능
- 서버리스는 하이퍼으로나 효과적인 제품으로
- 서버리스의 도전
- 서버리스가 마법처럼 모든 문제를 해결해 주지는 않는다
- 개발자들이 데브옵스와 플랫폼 엔지니어링을 하는 것
- 미흡한 개발자 경험과 너무 많은 옵션
- 문제는 해결될 수 있다
- 서버리스 커뮤니티
- 서버리스의 미래
- 요약

# 소개

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

서버리스를 사용하기 시작한지 거의 다섯 년이 다 되어간다고 해도, 그래도 여전히 마법 같습니다. 기반이 되는 인프라를 관리하지 않고 코드를 배포하는 것은 자유롭다는 느낌이 들어요.

게다가 AWS가 관리하는 리소스나 직접 통합을 통해 만들어지는 이벤트 주도 아키텍처를 구축하는 능력은 마음이 놀라워요. 몇 년이 걸릴 서비스를 단 몇 분만에 구축할 수 있어요. 여전히 DynamoDB의 글로벌 테이블과 지역 간 복제 성능에 놀랍습니다.

사실 서버리스는 더 이상 최신 트렌드가 아니에요 (네, GenAI, 널 향해서 말하는 거죠). 올해 Lambda가 출범 10주년을 맞았어요. 미친 일이네요 — 벌써 10년이나 됐다니! 게다가 첫 서버리스 서비스라고 말할 수 있는 SQS는 20년 전에 출시되었어요! 관심사가 바뀌어서 그게 당연한 일이죠.

어떤 기술도 시간이 흘러 성숙해져요. Kubernetes도 더 이상 "새로운" 게 아니에요. 게다가 ChatGPT조차도 더 이상 "새로운" 것이 아니에요. 직전에 어머니께서 그것을 사용하고 싶어하셨던 일년 전에 포스트를 작성했죠.

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

어떤 시점에서 기술과 제품은 성숙 단계에 이를 때가 있습니다. 우리는 현재 그 지점에 있습니다. 저는 Serverless가 진정한 클라우드 "일마감"으로 성숙해왔다고 생각합니다. 이 기술은 많은 문제를 해결해 주는 놀라운 확장 가능하고 신뢰할 수 있는 기술이지만 (다른 것들처럼) 자체적인 한계와 배움이 따르고 있다는 점도 명심해야 합니다.

# 웹에서 Serverless에 관한 글들

최근 몇 달 동안 많은 Serverless 관련 글들과 다양한 의견들을 본 적이 있습니다. 그 글들은 커뮤니티를 환영하고 토론을 시작했는데, 이것은 언제나 좋은 일이죠.

지난 몇 달 동안 보았던 Serverless 관련 글들에 관한 제 생각을 공유하고 싶습니다.

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

## 클릭베이트 기사들

요즘 인터넷에서 많은 서버리스에 대한 의견이 얽히고 설킨 것 같아요. 이것들이 커뮤니티를 자극하고 토론을 시작했는데, 항상 좋은 일이죠.

지난 몇 달 동안 보았던 몇 가지 서버리스에 대한 의견을 공유하고 싶어요.

# 클릭베이트 기사들

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

이런 기사 트렌드를 종합하면 "팀 X가 서버리스 사용을 중단했고, 지금은 1000% 더 좋아졌다"라는 것이 있어요.

서버리스에 대한 많은 오해와 오견이 있어요. 보통 이런 기사에서는 람다에만 언급되곤 해요.

이미 2024년이고 아직도 사람들이 서버리스를 람다만으로 보는 경우가 많아요 (_이태박수_).

S3, SNS, SQS, DynamoDB, EventBridge와 같은 주요 서비스로 이루어진 아름다운 서버리스 세계가 있어요. 여러분의 K8S 클러스터와 함께 사용할 수 있고 사용해야 해요! MSK나 SQS로 유지보수 비용 없이 또는 그 이상의 경험을 얻을 수 있는데 Kafka를 운영해야 할 이유가 있을까요?

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

두 번째로, Lambda는 다른 기술과 마찬가지로 모든 문제에 대한 마법 해결책이 아닙니다. Lambda가 적합하지 않거나 적절하지 않은 문제들도 있습니다. 괜찮아요!

때로는 15분을 넘는 긴 세션을 필요로 하거나 GPU를 사용해야 할 때도 있습니다. 또는 예측 가능한 트래픽 패턴을 다루거나 ECS Fargate에서 작업을 구축하는 것에 만족할 수도 있습니다. 컨테이너는 멋지고, 기반이 되는 인프라를 관리할 필요가 없는 것은 더욱 좋습니다.

이 문서들이 놓치는 주요한 점은 Lambda가 특정 사용 사례에서 사용되지 않았다고 해서 Lambda가 결함이 있는 기술이라는 것이 아니다. 그저 해당 서비스의 요구 사항에 맞지 않았다는 것을 의미합니다.

그리고, 혼합해서 사용해도 괜찮아요. 나는 Lambda와 컨테이너의 일부분을 사용한 서비스를 디자인했어요. 당신이 알고 있고 항상 해왔던 방식 때문에 솔루션을 선택할 필요는 없습니다. Werner Vogels은 AWS re:Invent 2023에서 이에 대해 논의했어요. 문제 요구 사항과 제약 조건에 가장 잘 맞는 해결책을 선택하고, 여태껏 익숙한 방법과는 다른 방식을 시도하는 것을 두려워하지 마세요.

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

## Serverless & AI

과거 한 달 동안 바위 밑에 살았다면 Luc van Donkersgoed의 서버리스와 AI에 관한 글을 봤을 것입니다. 만약 그 글을 놓치셨다면, 제가 ChatGPT에게 그 내용을 요약해달라고 부탁해봤어요:

엔지니어로서, 그리고 아키텍트로서, 나는 더 많은 AI 기능보다는 덜 AI 기능과 더 많은 서버리스 또는 인프라 기능을 보고 싶어해요. 새로운 AI 기능에 대한 소식을 듣는 것에 지치지만, GenAI가 나를 더 나은 엔지니어로 만들었음을 인정할 수 없어요. 일부는 정말 멋지고 놀라운 잠재력을 가지고 있음을 부정할 수 없어요, 예를 들어 Bedrock 에이전트가 API를 호출하는 것과 같은 기능들을 보면요(제 포스트와 소감은 여기서 확인하세요).

이제 AWS의 고객 중심 측면과 그들의 비즈니스 요구 사항에 관해 이야기해볼게요. 나는 AWS 고객이 아니에요; 우리 회사가 그렇지요, 그것은 상당한 차이점이에요. CyberArk의 엔터프라이즈 고객들은 우리에게 AI 기능들을 구축해달라고 요청하고 많이도 하죠. 실제로 수요가 있으며, 그 중 일부는 고객들의 삶을 개선하고 있어요. 그런 면에서 보면, AWS는 고객이 원하는 대로 행동하고 있죠. 그러나 AWS가 게임에 뒤떨어졌기 때문에 우리는 계속해서 AI 기능의 물결을 보고 있습니다.

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

기대해봅니다. AWS AI 열풍이 1~2년 안에 수그러들 것이라고 믿어요. 적어도 다음 행진이 시작될 때까지는 말이에요.

## 서버리스: 하론 제품으로서

Gregor Hohpe가 발표한 또 다른 흥미로운 글이 있어요. "AWS Lambda가 하론 제품인가요? — 눈부시고 선두, 강력한 팬층, 하지만 주류 채택이 부족한 — 하론 제품의 특징. AWS Lambda 같나요?".

일부 타당한 의견도 있고, 제가 개인적으로 다른 의견을 가지는 부분도 있어요.

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

주요 측면에 대해 이야기해봐요. 이게 정말 무슨 뜻일까요? 대중적으로 알려지고 사용되는 걸까요, 아니면 순수한 시장 점유율 숫자일까요?

Lambda가 ECS나 EC2를 완전히 대체하지는 않을 거예요. 그것이 그 목적은 아니었거든요.

제가 위에서 언급한대로, 각각의 역할이 있어요. 주류에 속하나요? 네. 사람들은 알고 있고 대규모 기업에서 사용하고 있어요.

나는 사실이라고 자신있게 말할 수 있어요. 왜냐하면 나는 CyberArk에서 개발자 직책에 지원하는 면접자 이력서를 보면 Lambda, SQS, DynamoDB 및 기타 서버리스 서비스를 안다고 주장하는 엔지니어들의 이력서를 받아요 — 그들은 실제로 그것들을 알고 있기 때문이죠.

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

계속 진행합시다.

“나는 주로 데모용으로 서버리스를 사용한다”나 “EC2는 신뢰할만하다”와 같은 문구에는 동의하지 않아요 (Lambda가 아닌가요?); 맨 처음에 썼던 것처럼, 서버리스는 람다뿐만이 아니에요. 다른 서버리스는 EC2나 쿠버네티스를 실행하고 있어도 유용해요.

게다가 많은 대기업이 서버리스를 본연의 목적으로 사용하며, 매우 신뢰할 뿐만 아니라, 효율적이에요. 사실, 지난 13년간의 AWS 사고 후 기록에 따르면, EC2는 작년에 4차례의 특정 장애가 있었지만, Lambda는 단 한 번 뿐이에요.

다음 인용구에 대해 이야기해봐요:

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

DataDog의 클라우드 비용 현황 보고서의 항목 4에 따르면 다음과 같습니다. 인용하자면:

다시 한 번 읽어볼까요: 80%! 와우, 얼마나 많은 자원과 돈이 낭비되는지 놀랍죠. 아마 컨테이너 기반 솔루션과 Kubernetes를 호스팅하는 EC2들이 그리 이해되지 않은 것일지도 모르겠네요?

서버리스를 사용하면 대기 중인 자원에 대한 비용을 지불할 필요가 없고 인프라를 관리할 필요도 없어서 비용이 크게 절감됩니다 — 서버리스에게 큰 승리죠.

지속적인 유지보수에 대해 토의해봅시다.

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

EC2를 시간이 흐를수록 안전하게 유지하는 것은 쉽지 않아요. OS 및 라이브러리 업그레이드를 다루는 것은 종종 전혀 간단하지 않을 수도 있어요. 저희는 정말 큰 장애를 겪었었어요 지난 주 — CrowdStrike 님, 땡큐하네요! 예측 가능한 유지 보수 비용에 대해 이야기해 봐요.

K8s도 한번 살펴보세요. 버전 업그레이드, 클러스터 구성 또는 서비스 메시 설정 및 기타 문제에 대한 많은 호러 스토리를 들어봤죠. 그래서 왜 서버리스가 많은 관심을 받을까요? 그 이유는 K8s로, 인프라 팀이 그 부분을 처리해 주기 때문이죠.

서버리스로, 모든 개발자들은 개념을 배우고 이해하며, 서버리스 아키텍처를 구축하는 IaC를 작성해야 해요.

이 주제에 대해 더 자세히 알아보죠.

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

# 서버리스 도전 과제

그레고르도 좋은 점을 말했어. 서버리스와 그 일부인 람다는 독특하고 (헤일로 같은), 그에 따라 기술을 배워야 하고, 정말로 이를 잘 이해해야 합니다. 이에 대해 Sheen Brisals가 서버리스가 어려운지 여부를 논의한 기사를 발견했는데, 꼭 읽어보는 것을 추천합니다.

우리는 서버리스 도전 과제의 현재 상태에 대해 자세히 이야기해보겠습니다. 분명히 말씀드리겠습니다: 어떤 기술이든 독특한 도전 과제가 따라옵니다. 제가 언급하는 모든 서버리스 도전 과제는 해결 가능합니다; 이는 비용, 지식, 그리고 조직 내부에서 기술을 추진할 수 있는 적절한 인재가 있는지 여부에 달려 있습니다.

## 서버리스는 마법의 해결책이 아닙니다

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

서버리스의 큰 장점은 시작부터 생산적이 되는 것이 훨씬 쉽다는 것입니다. Lambda나 Kubernetes를 본 적이 없는 개발자가 두 가지를 모두 사용하여 Hello World 백엔드를 공개 API로 배포하는 데 얼마나 걸릴지 상상해보세요. 보다 현실적인 프로덕션 애플리케이션을 구축하기 시작하면 복잡성이 증가합니다. 관측성, 보안, 비용 최적화, 실패 처리 등을 주의 깊게 챙겨야 합니다. 서버리스를 사용하지 않을 때, 이 책임은 보통 운영팀에게 있습니다. 서버리스를 사용하면 책임은 주로 개발자에게 있으며, 혼란이 많이 있습니다.

제가 사용한 면접 예시로 돌아가 봅시다. 개발자들은 서버리스 개념을 알고 있었습니다. 그러나 대부분의 사람들이 테스트 기술이나 DLQ와 재시도를 통한 실패 처리에 대해 물었을 때 어리둥절해하거나 실패했습니다.

서버리스는 클라우드 애플리케이션을 구축하고 실행하는 복잡성을 제거하는 마법같은 해결책은 아닙니다. 인프라 유지 관리의 복잡성을 크게 줄여주고 애플리케이션 계층에 집중할 수 있게 도와줄 수는 있지만, 새로운 복잡성도 따라옵니다. DLQ 사용, 이벤트 기반 아키텍처 개념 적용 등과 같은 서버리스 애플리케이션 패턴을 이해하고 적용해야 합니다.

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

## 데브옵스 및 플랫폼 엔지니어링을 하는 개발자들

어떤 회사들은 변화를 두려워하거나 비용을 들이지 않으려고 합니다. 서버리스는 문화 변화가 필요하며, 더 나은 개발자 온보딩이 필요하며, 그리고 모베스트 프랙티스와 거버넌스를 이끄는 사람이 필요합니다. 제 회사에서는 이것이 플랫폼 엔지니어링의 책임이었습니다. 이것은 제 일의 일부였습니다. 그러나 많은 회사들은 플랫폼 엔지니어링을 서버리스와 연결시키지 않습니다. 규모가 커지면 반드시 필요합니다. 거버넌스, 보안, FinOps 최적화, 일반적인 모베스트 프랙티스, 그리고 이를 소유할 사람이 필요합니다.

구체적인 소유자가 없다면, 모든 개발자의 책임으로 돌아가고, 그것은 그냥 너무 많은 일입니다.

## 부족한 개발자 경험 및 너무 많은 옵션

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

만약 서버리스를 사용하는 게 정말 쉽고 명백하다면, 저는 50편 이상의 기사를 쓰거나 제 도둑질 파트너 헤이토르 레사와 함께 AWS re:Invent 2023에서 서버리스 감성을 공유할 필요가 없었을 텐데요.

서버리스 테스팅, 서버리스 관찰 가능성, 올바른 람다 핸들러 작성 방법 배우기, 테넌트 격리 다루기, 인프라스트럭처 코드 도구 사용하기(너무 많은 AWS 옵션 - SAM, CDK, Chalice, 어떤 것을 선택해야 할까요?), 모든 최선의 방법 숙지하기 등의 문제들이 개발자와 매니저들을 아슬아슬하게 만듭니다.

AWS는 대부분의 주제에 대해 기사를 게시했지만, 많은 의견, 6개월 내에 더 이상 사용되지 않는 'hello world' 프로젝트들, 그리고 충분히 심화된 사용 사례가 부족합니다.

AWS는 개발자가 이런 주제들을 걱정할 필요 없이 비즈니스 로직 작성에 집중할 수 있는 더 나은 개발자 경험을 제공해야 합니다.

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

## 해결 가능합니다

문제는 해결 가능하지만 새로운 기술을 도입하는 것은 항상 투자가 필요합니다. CyberArk에서는 자체 서비스 블루프린트를 만들고 아키텍처 블루프린트와 패턴을 코드화하여, 개발자들이 최상의 사례들을 즉시 사용할 수 있도록 도와 이러한 도전을 극복했습니다. 그에 내부 워크샵과 지식 공유를 더하면 올바른 길로 나아갈 것입니다. 저희는 10명의 서버리스 개발자로부터 수백 명의 개발자로 성장했습니다.

가능합니다.

저는 AWS 서버리스 오피스 아워 웨비나와 AWS 기사에서 많은 통찰을 공유했으며, 이번 9월 뮌헨에서 개최되는 AWS 커뮤니티 데이 DACH에서 우리의 여정을 공유할 예정입니다.

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

# 서버리스 커뮤니티

서버리스 커뮤니티는 정말 놀라운 것이 있어요.

전세계적인 이벤트, 서버리스 데이, CDK 데이, AWS 커뮤니티 데이와 풍부한 서버리스 콘텐츠, AWS 서버리스 개발자 대행, 서버리스 분야 전문가인 AWS 커뮤니티 빌더, AWS 서버리스 히어로, 서버리스 뉴스레터 등이 있어요.

전문가들이 지식을 공유하는 정도는 전에 없었던 것 같아요. 심지어 AWS의 문서도 더 향상되었어요. 또한 AI 혁명으로 인해 서버리스 코드 작성이 더 쉬워졌어요.

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

4년 전에는 이렇지 않았어요.

AWS 람다를 위한 Powertools와 같은 오픈 소스 라이브러리들이 산업을 바꿨어요. 최근에는 매주 1000억 개의 API 통합을 넘어섰어요. Powertools는 전 세계 고객들의 삶을 훨씬 쉽게 만들고 있어요.

Discord에서 'Believe in Serverless'라는 새로운 서버리스 커뮤니티가 생겼어요. 여기서는 쉽게 서버리스 전문가들과 연결하고 기술에 대해 토론할 수 있어요. 실제로 기술을 사용하는 사람들로부터 실용적인 조언에 접근하는 것은 전례가 없어요.

# 서버리스의 미래

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

이 섹션을 명확히 해 봅시다. 저는 예언자가 아니에요; 이것은 단지 소망 목록일 뿐이에요.

서버리스의 미래는 밝을 거예요; 서버리스는 사라지지 않을 것이며 사멸하지도 않을 거예요.

하지만, AWS가 채택률을 높이고 싶다면 다음 문제들을 개선해야 해요:

- 현재와 새로운 기능에 대한 개발자 경험에 집중하세요. 디버깅 로그 없이 서비스를 출시하지 말아주세요 (제가 시점 까보는 중입니다, 1년이 걸렸던 EventBridge 파이프 등).
- AWS Powertools를 더 많이 제공해주세요! 런타임 지원을 더 확대하고 (RUST, Golang), 모든 기능이 Python과 동등하게 되도록 하세요. 람다뿐만 아니라 컨테이너까지 확장해주세요. 이 멋진 AWS DevEx 팀에 투자해주세요.
- '서버리스' 태그를 정말로 서버리스가 아닌 서비스에 붙이지 마세요. VPC를 설정하거나 유휴 시간을 지불해야 한다면 서버리스가 아닙니다. 이 조건을 충족하는 새로운 서비스(예: Verified Permissions)를 장려해주세요.
- 모든 새로운 비컴퓨팅 서비스는 서버리스여야 합니다. 저는 다시는 인프라를 관리하고 싶지 않아요, 그래서 서버리스가 표준이 되어야 해요.
- 하나의 IaC 도구에 중점을 두고 가능한 최선을 다해주세요. 제게는 명백한 선택인 CDK입니다. 더 나은 CDK L2, L3 constructs 출시에 집중하세요. 이러한 constructs를 제품화된 패턴으로 변경하여 최선의 실천 방법과 보안을 구현하는 것도 중요해요.
- 스텝 함수 테스트와 정의 - 아직 너무 어려운 부분이에요. 이것을 바꾸어 봅시다. 개발자들로부터 이 DevEx가 좋지 않다고 비판받는 필수 서비스에요.
- 발표된 후 최소 2년 동안 GitHub 샘플 프로젝트를 유지하고 관리되지 않는 프로젝트는 폐기해주세요.
- 더 실용적이 되어주세요. AWS Summit 세션부터 AWS re:Invent까지 이어져야 해요. 기술적인 고객 사용 사례를 더 많이 제공해주세요. 우리는 이론뿐만 아니라 실제 제품 환경에서 배우고 싶어요.
- 제가 만든 AWS Lambda Handler Cookbook과 유사한 안전한 블루프린트 및 권장 프로젝트 설정을 제공해주세요. 용량 부족으로 만들기 어려운 경우, 커뮤니티 프로젝트를 보증해주세요.
- 테넌트 격리 문제를 더 보편적이고 안전하게 해결할 수 있도록 도와주세요. 각 기업이 다르게 처리하며 매우 오류가 발생하기 쉬운 부분이에요.
- AI가 서버리스에 새롭게 적용될 것이며, 이는 좋은 일이에요. 아직 AWS App Studio를 시도해보지 않았는데요. (Luc가 쓴 대로) 지나치게 하지 말아주세요.
- 기능을 투명하게 만드는 데 노력해주세요 - 예를 들어 Lambda Insights, 사용자로서 Lambda 확장을 추가하고 버전을 관리하는 것이 아니라, CDK flag로 Lambda construct를 제공하면 AWS가 내부에서 확장을 추가하고 관리해주는 것이 좋을 거에요.
- 서버리스와 EDA로 대규모로 계정간 액세스하기는 어려운 부분이에요; 이를 단순화해야 합니다. 이 아키텍처에서 오는 일부 도전 과제이에요. 이에 대해 제가 보안 게시물에서 논의할게요.

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

# 요약

온라인에서는 많은 서버리스 관련 의견이 나왔고, 이에 대한 반응이 엇갈리고 있습니다. 이는 커뮤니티를 자극하고 토론을 시작했는데, 항상 좋은 일입니다. 현재 상태에 대해 생각하고 내 생각을 정리하는 시간을 가져보게 되었습니다.

내 비전을 읽어주셔서 감사합니다. 시간이 지나면 내 생각이 맞았는지 아닌지 알게 될 것입니다.

이 게시물을 검토하고 통찰을 제공해 준 안톤 알렉산드로프, 빌 타르, 요헤네스 코흐에게 감사드립니다.
