---
title: "마이크로 프론트엔드의 미래"
description: ""
coverImage: "/assets/img/2024-06-20-TheFutureofMicroFrontends_0.png"
date: 2024-06-20 01:27
ogImage:
  url: /assets/img/2024-06-20-TheFutureofMicroFrontends_0.png
tag: Tech
originalTitle: "The Future of Micro Frontends"
link: "https://medium.com/better-programming/the-future-of-micro-frontends-2f527f97d506"
isUpdated: true
---

## 나는 이 퍼즐의 빠진 조각이 무엇인지 이해하고, 이 아키텍처 접근 방식을 더 개선할 수 있는 방법을 상상해 봐야겠어요

![이미지](/assets/img/2024-06-20-TheFutureofMicroFrontends_0.png)

2021년 말부터 2022년 초까지, 나는 미니 프론트엔드 여정이 현재까지 어디까지 왔는지 살펴보았어요.
팀이 고민하는 다양한 도전 과제, 장기적으로 결합을 일으키는 안티 패턴, 그리고 이를 해결하기 위해 사용되는 반복 패턴들을 분석했어요.

우리는 미니 프론트엔드가 팀이 독립적으로 작업하고 중대형 규모 애플리케이션에 기여하도록 가능하게 했으며, 우리의 애플리케이션을 진화시키며 잠재적인 문제의 영향 범위를 줄이는 방식을 발견했어요.

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

하지만, 현재까지 이룩한 것으로 분석이 끝나지 않았어요.

나는 앞으로 나아가야 했어요, 미래로 한 발짝 내딛어.

이 흥미로운 퍼즐의 빠진 조각들이 무엇인지 이해해야 하고, 이 아키텍처 접근 방법을 더욱 개선할 수 있는 방안을 상상해 봐야 했어요.

이 글에서는 마이크로 프론트엔드 커뮤니티에서 흥미로운 대화를 일으킬 수도 있는 아이디어와 트렌드를 공유하고 싶어요. 다루는 주제는 이 아키텍처의 클라이언트 측, 서버 측, 그리고 엣지 측 구현을 고려하고 있어요.

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

마침내, 2022년에 저의 초점이 될 마이크로 프론트엔드 생태계에 대해 공유하려고 합니다.

# 보다 철저한 디자인

마이크로 프론트엔드 아키텍처의 주요 과제 중 하나는 "마이크로"가 얼마나 되어야 하는지에 대한 질문에 대답하는 것입니다.

이 질문에 직면하는 많은 조직이 있습니다. 실제로, 하나의 답변만 있는 것이 아니라, 맥락, 조직 구조와 규모, 그리고 팀 간의 커뮤니케이션 흐름을 이해해야 합니다.

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

여러 팀이 분산 아키텍처에 대해 여러 차례 소통한 후에 저는 '분산 컴포넌트'가 '마이크로 프론트엔드' 구현보다 더 많이 나타났다는 것을 많이 보았어요.

분산 컴포넌트를 사용하면 도메인 지식이 컨테이너와 '마이크로 프론트엔드' 또는 컨테이너와 여러 '마이크로 프론트엔드' 사이에 공유되었어요.

우리는 여전히 올바른 경계를 찾기 어려워하고 때로는 구현할 때 마이크로 프론트엔드를 어떻게 해석해야 하는지에 대한 이해가 부족한 경우가 있어요.

저는 이해가 성숙해지는 방향으로 나아가는 필수적인 단계라고 생각해요. 응용 프로그램 비즈니스 하위 도메인을 정복하는 것은 쉬운 작업이 아니며 빌드하는 응용 프로그램에 대한 심층적인 지식이 필요해요.

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

그러나 이 문제를 완화할 잠재적인 해결책이 있다고 생각합니다.

사용자 경험을 저해하지 않으면서 비즈니스 도메인을 어떻게 분리할지 여러 부서와 함께 화이트보드를 통해 더 많은 시간을 투자하는 것이 중요합니다.

이러한 회의를 마칠 때 우리는 프로젝트를 자신 있게 시작하고 처음에 설정한 전제가 목표를 달성하는 데 여전히 유효한지 확인하기 위해 우리의 결정을 지속적으로 검토할 수 있어야 합니다.

모든 것을 처음부터 포착할 수는 없다는 것을 기억해야 합니다. 비즈니스와 조직은 6개월 또는 12개월 후에 변할 수 있으므로 정기적으로 우리의 마이크로 프론트엔드 경계를 다시 검토해야 합니다.

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

또한, 조직 구조와 소프트웨어 아키텍처 간의 연결 링크를 잊지 마세요. 이를 인식하고 설계 결정에 고려하는 것이 중요합니다.

# 마이크로 프론트엔드 통신

같은 뷰에서 여러 마이크로 프론트엔드를 가지고 있을 때, 어느 순간에는 서로 통신해야 합니다.

저가 마이크로 프론트엔드를 설계하기 위해 만든 정신 모델에서는, 마이크로 프론트엔드 간의 통신을 촉진하기 위해 게시-구독 패턴을 사용하는 것이 권장됩니다. 이는 마이크로 프론트엔드 간의 경계를 강화하고, 디자인 시점 결합을 피하거나 최소화하여 더 자율적인 팀을 이끄는 데 도움이 됩니다.

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

기술적으로 이 패턴을 구현하는 데는 사용자 정의 이벤트, 이벤트 에미터 라이브러리 또는 반응형 스트림과 같은 여러 옵션이 있습니다.

지난 몇 달 동안 중요한 요구 사항이 나왔는데, 처음에는 그다지 강조하지 않은 것 같습니다. 아마 당연시 여겼기 때문일 것 같아요, 그러나 분명히 주의해야 할 부분입니다.

백엔드에서 이벤트 주도 아키텍처와 마찬가지로, 이벤트에 대한 명확한 스키마를 갖는 것은 통합 단계에서 실수를 피하는 데 도움이 됩니다. 더불어 스키마는 코드베이스에 직접 작업하지 않는 기술 직군들에게도 특정 애플리케이션 내에서 무슨 일이 일어나고 있는지 명확히 이해할 수 있도록 돕습니다.

내가 팔로우하는 많은 Slack 채널 중 하나에서 발견한, 느슨하게 결합된 요소 간(마이크로 프론트엔드뿐만 아니라) 보다 구조화된 커뮤니케이션을 달성하는 데 도움이 되는 이 이벤트 버스 라이브러리가 있습니다: [링크](https://www.npmjs.com/package/@trutoo/event-bus).

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

![이미지](/assets/img/2024-06-20-TheFutureofMicroFrontends_1.png)

마이크로 프론트엔드는 분산 아키텍처이기 때문에 더 형식적인 API나 이벤트 관리가 필요합니다.

API나 이벤트는 팀이 상호 작용하는 방법입니다. 마이크로 프론트엔드뿐만 아니라 중요합니다.
이러한 사례들은 이벤트가 전송될 때 개발자가 실수를 피할 뿐만 아니라 팀 간 토론을 용이하게 하고 의도를 명확히 하는 데 도움이 됩니다.

미래에는 잘 연결된 통신 전략을 대규모로 사용하는 대규모 애플리케이션에서 개발자 경험을 더 간단하게 만드는 데 더 많은 노력이 기울여졌으면 좋겠습니다.

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

안녕하세요! 새로운 마이크로 프런트엔드 간 상호 작용을 개발할 때마다 참고할 수 있는 이벤트 레지스트리가 있다면 얼마나 좋을까요?

마이크로 프런트엔드 간 통신에 대해 PayPal이 무엇을 하고 있는지 아직 확인해보지 못했다면, 이 멋진 비디오를 꼭 시청하도록 권장드립니다!

# 서버 측 렌더링 (SSR)

서버 측 렌더링 아키텍처는 지난 몇 달 동안 혁신을 이루고 있는데, Next.js나 React 18 팀이 서버 구성 요소에 투자한 것을 생각해보세요.

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

우리는 Next.js, Piral, TailorX, ILC 등의 마이크로 프론트엔드에 대한 흥미로운 솔루션도 갖고 있어요.

SSR 마이크로 프론트엔드 애플리케이션에 대해 더 자세히 살펴봐야 할 몇 가지 주제가 있어요.

지금까지 발견한 공백은 다음과 같아요:

- 마이크로 프론트엔드 검색: 마이크로서비스를 위한 서비스 검색 패턴과 유사하지만 프론트엔드에 적용된 것입니다. 이 패턴을 사용하면 시스템의 엔드포인트에 대한 정적 참조없이 동적으로 마이크로 프론트엔드를 구성할 수 있어요. 마이크로 프론트엔드 인프라가 검색 서비스에 자체 등록되고 UI 컴포저가 마이크로 프론트엔드 자체보다는 검색 서비스에서 마이크로 프론트엔드를 검색할 수 있다면 어떨까요? 🤯
- 클라우드에서의 참조 아키텍처: 인기 있는 클라우드 제공업체를 사용하여 SSR 마이크로 프론트엔드 아키텍처를 구축하는 방법에 대한 지침이 부족합니다. 이는 비교적 빨리 해결할 수 있는 마찰점이며 최대한 도와드리고 싶어요.
- 마이크로 프론트엔드에서 서버리스 패러다임 활용하기: 서버리스가 인프라 관리를 클라우드 제공업체에 위임하여 개발 속도를 높일 수 있다고 믿어요. 동시에 우리는 어떤 서비스를 특정 워크로드에 활용해야 하는지 이해하는 마인드셋을 가져야 해요. 예를 들어, AWS Step Functions와 같은 서비스를 사용하여 마이크로 프론트엔드의 생성을 단순화하는 가치를 보고 있습니다. AWS 생태계 전체와의 통합이 훌륭하기 때문에 저희는 오랜 기간에 걸쳐 유지보수를 단순화할 수 있는 로우코드 모델을 채택할 수 있어요.
  이것은 클라우드에서 사용할 수 있는 많은 패턴 중 하나이며, 마이크로 프론트엔드와 함께 이러한 패턴을 탐색하는 것은 매우 매혹적일 수 있어요 (적어도 제겐).

- 프레임워크에 중립적인 React 서버 컴포넌트 접근 방식: 백엔드 데이터가 변경될 때 뷰의 일부를 서버사이드 렌더링을 통해 원자적으로 다시로드하고 클라이언트 마이크로 프론트엔드와 시티 파트를 연결하는 메커니즘이 있는 것이 좋아요. 이를 통해 CSR과 SSR을 혼합하는 하이브리드 아키텍처를 사용하여 모든 마이크로 프론트엔드에 대해 올바른 접근 방식을 사용할 수 있을 거예요. 아마도 우리는 오늘 이러한 메커니즘을 만들어낼 수 있겠지만, React 18처럼 매끄러운 구현을 갖게 되는 것이 최종 목표일 거에요.

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

위에서 보시는 것처럼, 저희 앞에 많은 기회가 있습니다. 몇 가지는 더 구체적인 기회인 레퍼런스 아키텍처 같은 것이 있고, 어떤 것은 보다 장기적인 시각에 있는 React 서버 컴포넌트 접근 방식 같은 것도 있습니다.
이 목록 중에서 저의 초점은 레퍼런스 아키텍처 및 서버리스 패러다임을 이용한 마이크로 프론트엔드에 대한 조사에 있을 것입니다. 이미 레퍼런스 아키텍처에 대한 프로토타입 작업을 시작했고, 서버리스 측면에서도 몇 가지 흥미로운 프로토타입이 있습니다. 계속해서 업데이트를 기대해 주세요.

# 부분 수화

성능은 모든 프론트엔드 응용프로그램에 중요한 요소입니다. 마이크로 프론트엔드를 포함한 모든 것에 대한 것입니다. "아일랜드 아키텍처" 개념에 대해 들은 지 어느 정도 시간이 지났습니다. 그러나 이 아키텍처는 원칙과 특성 때문에 마이크로 프론트엔드 범주에 속할 수 있다고 믿습니다.

아일랜드 아키텍처가 소개한 흥미로운 기술은 부분 수화를 통해 서버 측 렌더링 응용프로그램의 성능을 향상시킬 수 있는 가능성을 제시한다는 것입니다.

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

부분 수분화는 새로운 기술이 아니며, 2019년 이후로 사용 가능합니다(기억이 맞다면). 그러나 나는 마이크로 프론트엔드 응용 프로그램에서 이 기술에 대한 어떠한 언급도 보지 못했습니다.

마이크로 프론트엔드의 성격과 부분 수분화의 작동 방식을 고려할 때, 이 기술이 SSR 마이크로 프론트엔드 응용 프로그램을 더욱 최적화하는 데 더 많은 인기를 얻어야 한다고 생각합니다.

이 게시물에서 Addy Osmani는 이 개념을 더 잘 이해할 수 있는 유용한 리소스를 제공합니다:

마지막으로, 만약 이 주제에 관심이 있다면, 부분 수분화를 사용할 수 있는 UI 프레임워크 목록이 포함된 이 게시물을 읽어보는 것을 적극 권장합니다.

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

저는 현재 Preact를 사용하여 마이크로프론트엔드 Proof of Concept를 실험 중입니다. 곧 더 많은 통찰을 공유할 수 있기를 희망합니다.

# 마이크로프론트엔드와 엣지 컴퓨팅

마이크로프론트엔드와 엣지에 대해 이야기할 때 자주 Edge-Side Includes (ESI) 마크업 언어를 생각합니다.

이번에는 AWS Lambda at the edge나 Cloudflare workers와 같은 많은 CDN에서 제공하는 컴퓨팅 기능을 가리키고 있습니다.

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

최신 기술들이 빠르게 발전하고 있기 때문에 응용 프로그램의 일부분을 엣지로 옮길 수 있어 지연 시간과 솔루션의 확장성을 향상시킬 수 있습니다.

그러나 많은 웹 애플리케이션에서는 여러 개의 마이크로 프론트엔드를 사용하여 HTML 페이지를 생성하는 계산 노력만을 고려할 수는 없으며 전체 애플리케이션의 복잡성도 고려해야 합니다.

현재 계산 문제는 해결하기 "쉬운" 문제가 되었지만, 데이터 중력(데이터베이스, 다중 지역 데이터 복제, 글로벌 인프라에서의 쓰기 대 읽기, 데이터 복제 지연 등) 또는 일반적으로 중앙 집중화되고 안전한 인증(클라우드 인프라의 특정 지역이나 온프레미스 데이터 센터)과 같은 문제는 그렇지 않습니다.

SSR 마이크로 프론트엔드 애플리케이션은 엣지 컴퓨팅에서 이점을 얻을 수 있지만, 아직 완전히 엣지에서 사용할 수 없는 기타 리소스(데이터, 인증, 캐시 등)에 액세스해야 합니다.
외부 종속성이 전혀 필요하지 않은 매우 잘 캡슐화된 워크로드가 있는 경우가 아니라면 엣지의 전체 성능을 이용할 수 없습니다.

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

미래에는 엣지 기술의 채택이 더 많아질 것 같아요. 그런데 동시에 '멋지다'는 이유만으로가 아닌, 엣지 기술이 어떻게 실제 업무에 영향을 미칠 수 있는지 더 잘 이해해야 한다고 생각해요. 엣지 노드와 함께 작업하는데, "하이프 주도 개발 anyone?" 같은 용어는 크게 듣고 싶지 않을 거예요.

내 의견으로는 엣지 컴퓨팅이 미래에는 마이크로 프론트엔드에 많은 영향을 미치고, 특히 응용 프로그램의 성능을 향상시키는 데 중요하다고 생각해요. 그러나 현재보다 그렇게 쉽지 않을 거에요.

# 배포

마이크로서비스에서는 특성 플래그, 블루-그린 배포, 카나리아 출시와 같은 새로운 마이크로서비스 버전의 배포를 위한 안전한 실천 방법이 있어요.

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

지난 12개월 동안, 저는 마이크로 프론트엔드에 유사한 기법을 구현하기 위한 노력을 볼 수 없었어요. 기능 플래그 이외의 것들은 많은 팀에서 잘 알려진 패턴으로 보입니다.

개발 팀에 신뢰감을 주는 배포 전략이 반드시 필요하다고 생각해요.

분산 시스템에서는 종종 지속적인 배포가 현실이기 때문에, 개발자들이 코드를 빠르게 반복하며 랩톱에서 프로덕션 환경으로 이동시키는 동안 모든 사용자에 의해 경험되는 버그를 도입할 위험이 없도록 안전망을 만들어야 해요.

SSR(서버 측 렌더링) 마이크로 프론트엔드의 경우, 기존 도구와 관행을 쉽게 재활용할 수 있으며, 이러한 메커니즘 중 하나를 활용하여 인프라를 출시하는 데 사용할 수 있어요. 그러나 클라이언트 측 렌더링 마이크로 프론트엔드 애플리케이션에는 종종 이러한 전략이 수용되지 않는 경우가 많습니다.

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

우리는 그것들을 구현할 수 있는 여러 가지 방법이 있습니다, 클라이언트 측, 서버 측 또는 심지어 엣지에서도요.

제 추천은 가능한 한 빨리 이러한 전략 중 하나를 구현하는 것입니다. 그것들은 당신의 팀에 대한 안전한 환경을 만들어주고 결과가 놀라울 수도 있습니다... 긍정적으로요.

# 라우팅

배포 전략과 엄격하게 연관된 것으로, 클라이언트 측 렌더링 마이크로 프론트엔드 응용 프로그램은 견고한 라우팅 전략이 부족합니다.

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

모든 구현은 단일체 아키텍처를 구현하는 데 사용하는 라우팅 라이브러리를 사용하고 있습니다.

대신, 우리는 이것보다 더 잘할 수 있다고 믿습니다!

이전에 설명한 배포 전략과 함께 라우팅 라이브러리를 혼합하면 더 똑똑한 라우팅을 구현할 수 있습니다. 이를 통해 더 신규한 마이크로프론트엔드 버전, 다양한 환경 또는 사용자 역할을 고려할 수 있습니다.

또한 트래픽을 점진적으로 증가시키고 버전에 대한 롤백을 수행하는 도구도 사용할 수 있습니다.

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

예를 들어, AWS에서 컨테이너 또는 서버리스 워크로드를 개발할 때 선호하는 배포 전략을 몇 줄의 구성으로 쉽게 설정할 수 있습니다.

![이미지](/assets/img/2024-06-20-TheFutureofMicroFrontends_2.png)

애플리케이션 쉘의 라우팅은 외부 JSON을 통해 쉽게 조정할 수 있으며, 응용프로그램 로직에 이 정보를 통합할 필요가 없이 가능한 다양한 옵션을 제공합니다.

마지막으로, 이 정적 JSON이 배포 로직과 결합될 때, 새 버전의 위험을 줄이고 비즈니스가 구현하고자 하는 로직에 따라 동적 설정이 가능해져서 많은 가치를 제공할 수 있다고 생각합니다.

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

라우팅과 배포는 제가 흥미를 느끼는 분야입니다. 다음 몇 달 동안 시간을 투자하여 일반적인 번거로움을 없애고 팀이 배포 및 라우팅을 더 잘 제어할 수 있게 하려고 합니다. 이 두 주제에 대해 매우 흥분하고 있는 작업 그룹 때문에 가능한 한 빨리 제가 진행 중인 작업을 공유할 수 있기를 희망합니다 🚀

# 마이크로 프론트엔드 관리

아직 이 영역을 탐험하지는 않았지만, 마이크로 프론트엔드의 PROs와 CONs를 이해하기 위해 시도할 도구 목록을 가지고 있습니다.

제 주요 관심사는 모노 레포에 중점을 두는 것입니다. 제 생각에는 다른 프로젝트가 같은 저장소에 독립적으로 존재할 때와 같이 코드를 관리하는 추가 도구가 필요하지 않습니다. 현재 제 관심을 끄는 도구 목록은:

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

- Turborepo
- PNPM
- Projen

내 생각에는 이들 모두 몇 가지 기능을 가지고 있어 개발자 경험을 향상시키는 모노 레포 전략을 구축하는 데 도움이 될 것입니다.

올해의 목표는 조금 벗어나 있는 것 같아요. 모든 도구를 검토하는 데 충분한 시간을 투자할 수 있는지 확신이 안 서지만, 개발자 경험을 더욱 개선할 미개척된 기회가 있다고 믿기 때문에 이 분야를 주의 깊게 지켜보겠어요.

시도해 볼 도구에 대한 제안은 언제든 환영이에요. 특히 도구를 테스트하고 경험을 공유할 때 간단한 리뷰를 제공해주신다면 더욱 환영합니다.

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

보시다시피, 마이크로 프론트엔드 생태계에서 아직 해결해야 할 문제가 많지만, 지난 몇 년 동안 큰 발전을 이루었습니다.

저에게는 기업 조직 전반에서 성공을 거두고 있는 "젊은" 아키텍처의 여러 개선 영역을 만들어나가는 것이 매우 흥미로운 기회입니다.

더 많은 발견이 있을 것이며, 이 빠른 채택이 분산 UI 아키텍처에서 무엇이 동작하고 동작하지 않는지에 대한 새로운 통찰을 가져다 줄 것이라고 기대합니다.

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

웹어셈블리(WASM), 클라이언트 측 보안 강화, 개발자 경험을 더욱 효율적으로 만드는 작업 등 다른 주제도 제가 주시하고 있어요. 하지만 이 글에서 나열된 주제들은 애플리케이션과 조직을 다음 몇 달 동안 확장하는 차세대 방법을 개선하는 데 고민거리를 제공해줄 거예요. 함께 토론해보면 좋을 것 같아요.
