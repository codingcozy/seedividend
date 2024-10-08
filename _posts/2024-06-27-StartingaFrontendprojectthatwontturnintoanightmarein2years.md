---
title: "2년 후에도 고통스럽지 않은 프론트엔드 프로젝트 시작하는 방법"
description: ""
coverImage: "/assets/img/2024-06-27-StartingaFrontendprojectthatwontturnintoanightmarein2years_0.png"
date: 2024-06-27 18:26
ogImage:
  url: /assets/img/2024-06-27-StartingaFrontendprojectthatwontturnintoanightmarein2years_0.png
tag: Tech
originalTitle: "Starting a Frontend project that won’t turn into a nightmare in 2 years"
link: "https://medium.com/@miladd3/starting-a-frontend-project-that-wont-turn-into-a-nightmare-in-2-years-cbe5b5509386"
isUpdated: true
---

새 프로젝트를 시작하면 항상 세상에서 가장 기분 좋은 순간 중 하나입니다. 새로운 시작에는 신선함과 훌륭한 아이디어가 넘쳐납니다. 이번에는 회사에 여러 해 동안 도움이 되는 깨끗하고 유지보수가 용이하며 확장 가능한 프로젝트가 될 것이라고 자신과 팀원들에게 이야기합니다.

하지만 일이 벌어지면! 기능을 계속해서 추가하다 보면 처음에는 그렇게 나쁘지 않다고 생각할 수 있습니다. 그러나 시간이 흐른 뒤에 이 프로젝트가 과거 프로젝트에서 싫어하던 모든 것으로 변해버렸다는 것을 깨닫게 됩니다!

이런 일이 발생하지 않도록 프로젝트의 위험을 최소화하는 방법이 있습니다. 제가 몇 가지 예시를 vue를 사용해서 만들어보았습니다(내 경험이 더 풍부하기 때문에), 하지만 모든 종류의 프론트엔드 프로젝트에 적용됩니다:

# 더 적은 라이브러리는 프로젝트의 장수와 단순함을 의미합니다

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

프로젝트의 스택과 라이브러리를 선택할 때 조심해야 해요. 각 라이브러리는 일정 시간을 절약할 수 있는 기능을 가지고 있을 수 있지만 프로젝트에 복잡성을 추가할 수도 있어요. 게다가 그 라이브러리에 의존하게 되면 유지보수되지 않는다면 문제가 생길 수 있어요.

특히 프로젝트 구문 전반에 영향을 주는 라이브러리와 도구들인 Tailwind CSS, SCSS, CSS-in-JS 라이브러리, 그리고 TypeScript은 특히 중요해요.

이러한 라이브러리 각각이 훌륭할 수 있지만, 팀에 따라 선택해야 하며 우리가 언급한 단점을 상쇄할 가치가 있는지 확인해야 해요. 특히 이제 HTML/CSS에 CSS 변수, calc 및 다른 새로운 HTML 기능과 기술이 추가되면서 더 많은 일을 할 수 있어요.

두 가지 프로젝트를 상상해봐요:

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

- 프로젝트 원: Vue.js만 사용하여 일반 CSS와 HTML 템플릿을 사용합니다.
- 프로젝트 투: Vue.js, SCSS, Tailwind CSS, 그리고 PrimeVue를 사용합니다.

# 1년 후 유지보수 시나리오

물론 사람들은 각양각색이고 어떤 사람들은 이러한 기술을 좋아할 수도 있고 내가 쓴 것과 다를 수 있지만, 내가 상상한 것은 다음과 같습니다:

## 프로젝트 원:

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

새로운 팀원 온보딩:

- 간단한 프로세스입니다.
- HTML, CSS 및 기본 Vue.js 구문을 알고 있으면 충분합니다.
- 주로 프로젝트 코드베이스 및 비즈니스 로직에 중점을 두고 있습니다.

유지보수 및 업데이트:

- 컴포넌트를 만드는 데 더 많은 시간이 필요할 수 있습니다.
- 개발자들은 잘 알려진 컴포넌트 라이브러리를 참고하여 영감을 얻고 빠르게 컴포넌트를 만들 수 있습니다.
- 1년 후에는 대부분의 기본 컴포넌트가 이미 구축되어 있습니다.
- Vue.js를 업데이트할 때 의존성에 대해 크게 걱정할 필요가 없습니다.

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

## 두 번째 프로젝트:

신규 팀원 온보딩:

- 모든 템플릿에서 Tailwind CSS 구문을 사용하므로 신규 멤버는 이를 배워야 합니다.
- PrimeVue 및 SCSS에 대한 지식 또한 필요합니다.
- Tailwind CSS, PrimeVue 및 SCSS에 대한 문서를 검토하고 이해해야 합니다.

유지 보수 및 업데이트:

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

- 새로운 Vue 버전(e.g., Vue 4)로 업데이트하려면 PrimeVue 컴포넌트와의 호환성을 확인해야 합니다.
- 라이브러리(Tailwind CSS, PrimeVue, SCSS) 중 하나라도 사용 중지되면, 코드를 상당히 리팩토링하거나 다시 작성해야 할 수도 있습니다.

프로젝트의 수명을 연장하는 데 중요한 것은 최소한의 종속성(특히 전체 프로젝트를 변경할 수 있는 종속성)을 가지고 있는 것을 알 수 있습니다.

# 종속성 감싸기

프론트엔드 개발자로서 모든 것을 처음부터 쓰는 것은 불가능합니다. 그러나 한 라이브러리와 영원히 결혼하길 원하지도 않습니다. 라이브러리의 API가 프로젝트와 일치하지 않을 수도 있습니다.

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

판단력이 중요하죠! 제가 도와드릴 수 있는 게 있으면 언제든 말해주세요!

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

# 프레임워크 가이드라인을 준수하고 만들어진 표준을 사용하세요

사용 중인 프레임워크에는 가이드라인, 네이밍 규약 및 권장 구조가 있다면 정말 좋은 일입니다!

왜냐하면 여러분은 바퀴를 다시 발명할 필요가 없을 뿐더러(아마도 최악의 바퀴), 모든 규칙을 문서화할 필요가 없고 프레임워크 문서에 링크만 걸어놓으면 됩니다.

![2024-06-27-StartingaFrontendprojectthatwontturnintoanightmarein2years_0.png](/assets/img/2024-06-27-StartingaFrontendprojectthatwontturnintoanightmarein2years_0.png)

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

팀 내에서 자전거 건물 토론을 피하고 중요한 부분에 집중할 수 있어요.

Vue.js 스타일 가이드는 큰 프로젝트를 깔끔하게 유지하는 데 도움이 되는 많은 좋은 컨벤션들을 이미 갖고 있어 좋은 예시에요. 또한, Vue가 권장하는 폴더 구조와 함께 보일러플레이트를 생성하는 방식도 맘에 들어요.

# SOLID 원칙 사용하기

프런트엔드를 하다보면 다른 소프트웨어 엔지니어링 문화와는 별개로 따로 있는 것처럼 생각할 때가 있지만, 사실은 기계가 실행할 코드를 작성하고 있기 때문에 수년간의 소프트웨어 엔지니어링 경험을 활용하는 것이 프런트엔드에 유익하답니다.

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

여러 프론트엔드 프로젝트에서 SOLID를 사용하는 데 도움이 되는 좋은 기사들이 많이 있어요. 예를 들어,

- React에 SOLID 적용하기
- 미치지 않고 Vue.js 컴포넌트 라이브러리 만들기

그리고 검색을 통해 더 많은 정보를 얻을 수 있어요.

# 가이드라인 페이지가 있어요

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

프로젝트 기술 스택을 설명하는 다양한 하위 페이지가 포함된 가이드 라인 페이지가 있도록 해주세요. Vue 스타일 가이드와 같은 모든 관련 온라인 문서 및 가이드라인에 대한 링크가 포함되어야 합니다. 이 포괄적인 리소스는 기술 프레임워크와 모범 사례의 중심 허브로 작용할 것입니다.

또한, 가이드라인은 철학을 상세히 설명하고 프로젝트가 확장 가능하고 유지 보수가 용이하도록하는 데 필요한 모든 정보를 제공해야 합니다. 이는 개발 프로세스 전반에 걸쳐 일관성과 품질을 유지하는 데 도움이 될 것입니다.

기억하세요. 초기 선택 사항은 초기 개발뿐만 아니라 향후 확장성과 유지 보수의 용이성에도 영향을 줍니다.

귀하의 프론트엔드 프로젝트를 유지 가능하고 확장 가능하게 유지하는 데 효과적인 전략은 무엇인가요? 아래 댓글에서 귀하의 생각과 경험을 들어보고 싶습니다.
