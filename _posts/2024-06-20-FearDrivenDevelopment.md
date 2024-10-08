---
title: "공포 주도 개발"
description: ""
coverImage: "/assets/img/2024-06-20-FearDrivenDevelopment_0.png"
date: 2024-06-20 05:05
ogImage:
  url: /assets/img/2024-06-20-FearDrivenDevelopment_0.png
tag: Tech
originalTitle: "Fear Driven Development"
link: "https://medium.com/israeli-tech-radar/fear-driven-development-c6b427521f14"
isUpdated: true
---

"Why Frontend Tech Choices Are Not Only Driven By Merit?

어떻게 프론트엔드 프레임워크나 라이브러리를 선택하시나요?

사실은, 프론트엔드 비즈니스는 매우 무자비한 곳이에요:

계속해서 변화에 대해 인식하고 적절한 시점에 말을 바꾸지 않으면, 죽거나 거의 움직이지 않는 말과 함께 측면에 남게 될 수도 있어요.

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

"헛소리!"라고 말할 수 있겠죠... 하지만 저는 여러분이 이야기 속에 있는 것일 수도 있기 때문에 무서운 이야기를 하나 들려드리겠습니다:

<img src="/assets/img/2024-06-20-FearDrivenDevelopment_0.png" />

안녕하세요, Tikal의 기술 리더인 Roy Kass입니다. 프론트엔드 산업에서 16년 이상의 경험이 있습니다.

옛날 옛적에, 프론트엔드 산업이 매우 어렸던 때, 아름다운 기술인 Adobe Flex가 있었습니다.
Flex는 Flash 인프라 위에서 동작하는 화려한 기술이었는데, 브라우저에 설치하여 작동하는 벡터 드로잉 플러그인을 사용했습니다. 가장 유명한 3버전은 2007년에 소개되었고, 그것은 혁명이었습니다. Flex는 가상 스크롤링, 동적 라이브러리, 전체 정적 타이핑 및 컴파일 중 트리 쉐이킹과 같은 이전에 존재하지 않았던 다양한 기능들을 소개했습니다. Flex 개발자들은 산업에서 가장 소중한 자산이었죠. 그러나 그의 종주인 스티브 잡스, 애플의 CEO가 Adobe Flash 플러그인을 iOS 하드웨어에서 허용하지 않겠다는 편지를 써서 이 모든것이 바뀌었습니다. 결과적으로, Adobe는 Flex를 커뮤니티에 전달했고(이름은 "Apache Flex"로 변경되었습니다) 플러그인은 프로프리에터리로 유지했습니다. 이는 그 기술의 버려짐을 의미했습니다. 2012년, 기술이 쇠퇴의 길을 걷고 있다는 사실이 명확해졌습니다.

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

Flex에 대한 높은 관심을 받던 개발자들이 AngularJS와 같은 다른 기술로 전환해야 했어요.

이 모든 걸 어떻게 알게 되었냐구요? 제가 그 Flex 개발자 중 한 명이었거든요. Flex에서 HTML5 및 AngularJS로 이동하는 것은 힘든 일이었어요.

"하지만, 그건 한 가지 사례 뿐이잖아요!" 라고 말할 수도 있겠죠.

음, 이런 일이 또 일어난 건 AngularJS에서 Angular 2로의 이동 때도 있었어요.

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

AngularJS가 어느 정도로 느려지고 낡아졌을 때가 오게 되었습니다. 구글은 breaking changes가 있는 Angular 2를 만들었습니다. 여러분은 그 이동을 하는 데 시간을 투자할지, 다른 기술(예: React)을 찾을지, 아니면 쇠말에 머물러있는 대가를 치를지를 결정해야 했습니다.
AngularJS에 오래 머무른 회사가 많았는데, 그 결과 아주 늦은 시간에 기술 전환이 이루어진 엄청난 노력을 하게 되었죠. 머무르는 것은 어렵기만 한 게 아니었어요 — 기술이 폐기된 상태여서 보안 리스크가 발생했습니다.

그리고 얼마 지나지 않아, Angular 2(이젠 몇 버전 앞으로 나가 있는)가 시장에서 소멸하기 시작했습니다. 선택의 실수(예를 들면 매우 오랜 베타로 인한 버그와 성능 저하, 많은 breaking changes, 그리고 블랙 박스 형태의 복잡함) 때문이었습니다.

곧, React가 시장을 석권했습니다. 대다수의 회사들이 React를 사용하고 있었죠.

React가 배우고 사용하기 더 간단하다는 이유 때문이라고 주장하는 사람들도 있습니다. Angular 애호가들은 더 구조화된 프레임워크가 필요한 대형 규모의 프로젝트에서 실패한다고 말할 것입니다.

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

그것은 중요하지 않았어요 — 왜냐면 결국 Meta(React)가 올바른 정치 결정들을 내려 시장에서 승리했기 때문이었어요. React와 Angular 중 뭘 선택할지에 대한 토론은 시간이 지남에 따라 사그라들었고, React가 즐겨찾기가 되었어요. Angular는 아직 살아있지만, 커뮤니티 크기는 React보다 훨씬 작아졌어요.

그리고 이 글을 읽으면서 머리를 흔드는 모든 Angular 팬 여러분들께 — 저도 예전에 당신들 중 한 명이었기 때문에 정말 동정합니다.

저는 JQuery, Ember, Haxe, CoffeeScript와 같은 기술들에 대해 언급하지도 않았는데, 이들도 비슷한 길을 걸어왔다는 것을 말씀드리고 싶어요. 그것들이 정말 수많다는 것을 기억해주세요.

최종적으로, 이러한 프론트엔드 기술들은 오픈 소스입니다. 이는 만약 커뮤니티의 관심을 잃는다면, 지원이 줄어든다는 것을 의미해요. 토론은 더 인기 있는 라이브러리들로 방향을 전환할 것이에요. 여러분의 지식들은 새 달의 우물처럼 말라버릴 거에요. 마침내 업데이트를 받지 못할 뿐만 아니라 보안 문제도 발생할 수 있어요.

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

그리고 — 보다 인기 있는 기술에 대해서 높은 자격을 갖춘 인력을 채용하는 것이 훨씬 쉽습니다.

![FearDrivenDevelopment_1](/assets/img/2024-06-20-FearDrivenDevelopment_1.png)

프론트엔드 기술은 오래가지 않습니다. 시기를 맞추거나 큰 대가를 치르게 될지도 모릅니다.

리액트는 이런 면에서 어딘가 이상한 존재이며, 곧 코쿤에 들어가 다음JS로 부활할 것입니다 (이에 관한 더 많은 정보는 다음 기사에서 소개될 예정입니다).

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

제가 이 상황을 좋아하지 않는다는 것을 말씀드릴 필요가 있습니다. 이것은 기술의 장점에 대한 냉정한 토론에서 인기로 물을 끓게 하는 선택으로 이어진다는 점이 제게 중요합니다. 일부 인기가 없는 기술은 그들의 능력만을 고려할 때 더 나은 선택일 수 있습니다. 또한 이 주제가 얼마나 논란이 많은지 이해하고 있습니다.

하지만 — 이 "공포로 이끌리는 선택"이라는 것이 프론트엔드 분야가 15년 이상 진화해 온 방식입니다. 이를 다르게 하려면 매우 중요한 변화가 필요하며, 그 동안 이러한 고려를 주요하게 여겨야 합니다.

# 그렇다면 기술의 인기를 어떻게 확인할까요?

먼저, NPM Trends 웹사이트로 가서 관심 있는 기술을 해당 분야의 경쟁 상대와 비교해보세요.

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

예를 들어, React, Angular 및 Vue를 테스트해 보겠습니다. 2022년 말에 Vue에 이상한 "불일치"가 있어서 무시할 필요가 있습니다. 아마 버그인 것 같아요.

![그림](/assets/img/2024-06-20-FearDrivenDevelopment_2.png)

그래프를 보면 React가 다운로드 측면에서 Vue와 Angular보다 훨씬 앞서 있다는 것을 알 수 있습니다. 이는 사용 범위를 파악하는 데 좋은 KPI입니다.

이제 GitHub 통계를 비교해 봅시다:
React:

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

![Angular](/assets/img/2024-06-20-FearDrivenDevelopment_3.png)

![Vue(core)](/assets/img/2024-06-20-FearDrivenDevelopment_4.png)

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

![이미지](/assets/img/2024-06-20-FearDrivenDevelopment_5.png)

패턴을 볼 수 있나요?
리액트는 다른 2개와 합친 것보다 훨씬 더 많은 트래픽을 갖고 있습니다. 더 많은 사람들이 관심을 가지고 있고, 별표를 찍고, 관심을 갖고 있습니다!

더 흥미로운 체크 방법은 최근 커밋이 언제, 어디서 이루어졌는지 보는 것입니다 (왜 그런지까지).

이것은 새로운 코드가 라이브러리에 삽입되었는지, 아니면 실제로 정체되어 있는지 보는 좋은 테스트입니다.

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

React:

![React](/assets/img/2024-06-20-FearDrivenDevelopment_6.png)

Angular:

![Angular](/assets/img/2024-06-20-FearDrivenDevelopment_7.png)

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

# Vue:

![FearDrivenDevelopment](/assets/img/2024-06-20-FearDrivenDevelopment_8.png)

우리가 원하는 최상의 경우는 몇 일 이내입니다. 몇 주에서 최대 1~3개월 정도면 받아들일 수 있습니다. 하지만, 4개월 이상이 보인다면, 이 라이브러리의 유지보수에 문제가 있는 것을 의미합니다.

이 경우, 모두가 최근 커밋에 따르면 (1~2일 전), 반응(React)이 다른 모든 측면에서 인기를 이끌고 있다는 것은 명확합니다. Vue와 Angular보다 인기가 더 많다는 것을 알 수 있습니다.
그런데, 모든 면에서 절대로 더 나은 것을 의미합니까? 아닙니다.

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

하지만 주요 고려 사항 인가요? 프론트엔드 세계에서는 — 대답은 반가운 YES 입니다.

프론트엔드 기술을 검토할 때, 구성 요소 라이브러리 시스템이나 심지어 단일 구성 요소와 같이 작은 것들도 선택한 것이 가능한 살아있고 인기있는 것인지 확인하세요.

인기도가 프론트엔드 기술의 생존과 지속 가능성에 대한 주요 KPI로 남아 있는 한, 기술을 선택할 때 이는 주요 고려 사항이어야 합니다.

죽거나 쇠약한 말은 당신을 멀리 몰아가지 않으므로 가장 활발한 것을 선택하세요 — 그리고 인기 순위에서 2위 또는 3위에 근접해 있으면 주기적으로 활발성과 인기도를 확인하세요. 이것은 궁극적으로 교육된 내기일 뿐이라고 하더라도, 가끔은 갑작스러운 변화가 발생할 수 있습니다. 단지 그러한 변화에 대해 경계를 지켜야 합니다.

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

다음 기사에서는 왜 NextJS가 여러분이 선택해야 할 다음 필수 도구일 수 있는지 보여드릴게요.

![Image](/assets/img/2024-06-20-FearDrivenDevelopment_9.png)
