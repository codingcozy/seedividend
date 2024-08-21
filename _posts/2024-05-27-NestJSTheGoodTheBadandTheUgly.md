---
title: "네스트JS 좋은 점, 나쁜 점, 그리고 추천하지 않는 이유"
description: ""
coverImage: "/assets/img/2024-05-27-NestJSTheGoodTheBadandTheUgly_0.png"
date: 2024-05-27 18:21
ogImage:
  url: /assets/img/2024-05-27-NestJSTheGoodTheBadandTheUgly_0.png
tag: Tech
originalTitle: "NestJS: The Good, The Bad, and The Ugly"
link: "https://medium.com/better-programming/nestjs-the-good-the-bad-and-the-ugly-d51aea04f267"
isUpdated: true
---

## 다음 프로젝트에 NestJS를 선택하시겠습니까?

![이미지](/assets/img/2024-05-27-NestJSTheGoodTheBadandTheUgly_0.png)

지난 몇 년 동안 수백, 수천, 심지어 수백만 명의 유럽 고객에 의해 활용된 여러 애플리케이션을 NestJS를 사용하여 개발했습니다. 이러한 애플리케이션은 다양한 규모의 팀(스타트업, 스케일업, 기업 조직)에서 구축되었습니다. 모듈화된 단일체에서 이벤트 기반 마이크로서비스, GraphQL 및 REST까지 NestJS를 사용하여 개발했습니다. 그러나 모든 좋은 면이 있는 동시에 나쁜 면과 심지어 추악한 면이 있습니다.

본 기사에서는 이 기간 동안 NestJS를 사용한 후 내 생각을 공유하려고 합니다. 개발자, 기술 리더 및 팀 리더가 NestJS 사용 중 발생할 수 있는 잠재적인 문제를 예상하고 해결하는 데 필요한 도구를 제공하는 것이 목표입니다.

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

# 좋은 점

다양한 크기의 팀에서 깨끗한 코드에 대한 다른 의견과 응용프로그램이 완료되었을 때의 정의에 대한 다른 의견을 가지고 일해 왔습니다. 회사마다, 팀마다, 심지어 사람마다 다르게 다양합니다. 팀 내 개인의 의견은 종종 주관적이며, 이로 인해 개발 가이드라인과 코딩 스타일을 형성하기 어렵게 만들 수 있습니다. 실제로, 모든 팀이 언젠가는 다이어그램이 나타내는 것처럼 동일한 학습 곡선 단계를 따릅니다.

![Diagram](/assets/img/2024-05-27-NestJSTheGoodTheBadandTheUgly_1.png)

여기서 Nest가 실제로 가치를 증명합니다. Nest는 팀을 특정 방향으로 안내하고 이미 작업을 대부분 처리하는 디자인 패턴을 제공합니다. Nest는 매우 주관적이며, 그것이 좋은 것입니다.

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

팀용 Nest의 가치는 팀 간 일관성 및 코드베이스의 일관성에서 그 자체를 입증합니다. 프레임워크를 사용하면 GraphQL 애플리케이션에 실제로 참여할 수 있으며, 내부를 깊이 파악할 필요 없이 즉시 사용할 수 있습니다. Nest는 훌륭한 코드 예제들을 제공하여 이를 가능하게 만듭니다.

비즈니스가 빠르게 움직이는 가운데, 비즈니스 방향성에 따라 유연하게 이동할 수 있는 개발 프레임워크를 사용하는 것은 큰 장점입니다. Nest를 사용하면 팀이 온보딩 프로세스보다는 제품 출시에 집중할 수 있습니다. 새로운 개발자를 쉽게 통합할 수 있으며, 훌륭한 문서와 발전하는 커뮤니티 덕분에 신입 개발자도 즉시 기여하기 시작할 수 있습니다.

# 아쉬운 점

좋은 것과 함께 항상 나쁜 점이 있습니다. 솔직히 말해서 이것은 프레임워크 자체보다는 종종 팀 또는 개인이 프레임워크 내에서 개념을 오용하거나 오해하는 데 직접적으로 책임이 있는 경우가 많습니다. 하지만 내가 경험한 Nest의 몇 가지 부분에서 어떤 팀들이 반복해서 고민하는 부분을 지적하고 싶습니다.

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

## 원형 의존성 문제

Sooner or later each NestJS project will face the moment that circular dependencies are introduced. Not only can I relate from experience, but also Nest elaborates on this common issue and the community-built package nestjs-spelunker identifies similar problems as well (even though it’s focused a bit more on the dependency injection tree in general).

The circular dependency issue is quite a nasty one, that could potentially slow down the entire development team in the long run — if not solved properly. Fortunately, quite recently an article about circular dependencies was published by Trilon, where a core contributor of Nest points out a tool, called Madge, to identify circular dependencies early.

## Swallowed logs on application startup

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

서로 의존하는 문제가 발생하는 경우 종종 나타나는 또 다른 문제는 시작 시 오류가 발생할 때 로그가 소진되는 것입니다. 이로 인해 개발자들이 실제로 무슨 일이 발생했는지 이해하기가 매우 어려워집니다.

오류를 식별하기 위한 일반적인 접근 방식은 오류 발생 시 중단을 비활성화하고 오류 메시지를 다시 던지는 것입니다.

이제 콘솔에 실제 오류가 기록됩니다.

# 실망하기 쉬운 부분

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

좋은 것과 나쁜 것이 있는 것처럼 추악한 면도 존재합니다. 솔직히 말해서, 이것은 항상 프레임워크가 직접 책임지는 것은 아니라, 그보다는 팀 또는 개인들이 프레임워크 내의 개념을 오용하거나 오해하는 경우가 많습니다. 저는 함께 일한 팀들이 Nest의 일부 영역에서 여러 번 고민을 겪었다는 점을 지적하고 싶습니다.

## 단위 테스트

Nest에서의 단위 테스트는 프레임워크 자체와 매우 통합되어 있습니다. 단위와 통합 테스트 사이의 차이를 정의하는 것은 팀마다, 심지어 사람마다 달라집니다. Nest 내에서 가장 작은 단위를 테스트하려면 상당한 부가 코드와 다양한 기술에 대한 지식이 필요합니다. 특히 새로운 개발자들에게는 테스트 작성이 복잡할 수 있습니다. 왜냐하면 Nest가 어떻게 의존성 주입 트리를 해결하는지에 대한 지식이 필요하기 때문입니다.

간단한 애플리케이션을 테스트하려고 하면 아래와 비슷한 테스트 파일에 맞닥뜨리게 되실 것입니다:

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

대부분의 실제 응용 프로그램에서 하나의 제공 업체에 대해 여러 종속성이 있을 것이며, 이로 인해 단위 테스트의 복잡성이 심각하게 증가할 것입니다. 시간이 지남에 따라 이러한 테스트는 팀이 단위 자체를 테스트하는 대신 어떻게 테스트를 작성하고 종속성 주입 트리를 구축할지에 더 많은 주의를 기울이면서 병목 현상이 될 수도 있습니다.

다르게 할 수 있을까요? 물론, 테스트의 복잡성을 해결하는 팀들을 본 적이 있습니다. 클래스 메소드에 구현하는 대신 별도의 함수에 로직을 구현함으로써 테스트의 복잡성에 대응합니다. 이 접근 방식의 장점은 테스트가 간편해지고, 새로운 개발자가 JavaScript를 알고 있기 때문에 더 쉽게 익힐 수 있다는 것입니다. 다음을 고려해 보세요:

모든 좋은 면에는 단점이 따르지만, 이러한 접근 방식의 구현으로 단위 테스트의 복잡성을 해결할 수 있을 뿐 아니라 다른 일면에서도 타협 사항이 있을 수 있습니다.

## 동적 컨트롤러의 부재

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

Nest에는 강력한 프로바이더 개념이 함께 제공됩니다. 이러한 프로바이더는 사용자 정의된 것이며 어떤 형태든 될 수 있습니다. 프로젝트가 더 성숙해지면 이러한 프로바이더는 매우 유용해집니다. 하지만 Nest의 의존성 주입 트리를 해결하는 방법에 대해 알아야 하는 개발자들에게는 어느 정도의 지식이 필요합니다.

어쨌든, 실제로 필요한 것은 이러한 사용자 정의 프로바이더에 해당하는 사용자 정의 컨트롤러의 대응물입니다. Nest의 창시자에 따르면 이러한 컨트롤러는 Nest의 아이디어와 완전히 반대되지만, 프로젝트가 성장할 때 실제로 매우 유용합니다. Nest의 한계를 극복하기 위해 이러한 접근 방식을 구현할 수 있습니다. GitHub 쓰레드에 설명된 factory 접근 방식으로 구현할 수 있습니다:

(하지만 오직 이것만이 아닌) Dynamic Modules를 통해 이 factory를 사용할 수 있습니다.

하지만 모든 것은 좋음으로 이어지는 나쁨이 따르며, 이러한 접근 방식을 구현하면 동적 컨트롤러를 다루게 되는 반면에 한편으로는 Nest의 컨트롤러에 대한 의견이 있는 패턴을 포기하게 됩니다.

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

# 결론

Nest는 Node 랜드스케이프 내에서 정말 성숙하고 잘 문서화되어 있어서 많은 사람들이 선택하는 프레임워크입니다. 하지만 모든 것에는 좋은 점뿐만 아니라 나쁜 점과 가장 나쁜 점 등도 있습니다. 그러니 NestJS와 같은 프레임워크를 선택할 때 팀이 직면할 수 있는 잠재적인 문제점을 식별하는 것이 중요합니다.

마지막 질문은 — 다음 프로젝트에 NestJS를 선택할 것인가. 음, 항상 그렇지만, 상황에 따라 다를거에요 ;)!
