---
title: "웹사이트 만들 때 HTML-우선 백엔드 개발을 해야하는 이유"
description: ""
coverImage: "/assets/img/2024-05-20-WhyHTML-FirstBackendDevelopmentisStillaSmartChoiceforWebApps_0.png"
date: 2024-05-20 23:10
ogImage:
  url: /assets/img/2024-05-20-WhyHTML-FirstBackendDevelopmentisStillaSmartChoiceforWebApps_0.png
tag: Tech
originalTitle: "Why HTML-First Backend Development is Still a Smart Choice for Web Apps"
link: "https://medium.com/@cannon_circuit/why-html-first-backend-development-is-still-a-smart-choice-for-web-apps-6a129a46e4f9"
isUpdated: true
---

![image](/assets/img/2024-05-20-WhyHTML-FirstBackendDevelopmentisStillaSmartChoiceforWebApps_0.png)

웹 개발에서 간단함과 효과적인 기능 사이의 균형을 찾는 것이 중요합니다.

개발자로서, 우리는 프로세스를 최적화하고 우수한 결과를 제공하는 방법을 계속해서 찾고 있습니다.

HTML을 우선으로 한 백엔드 개발은 웹 애플리케이션 분야에서 그 가치를 입증해온 실증된 접근 방식으로 부상했습니다.

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

# HTML-First로 간단하게 유지하는 것이 왜 중요한가요

기본 웹 애플리케이션을 구축해야 한다고 상상해보세요. 간단한 필터 옵션으로 데이터를 표시하는 테이블과 같은 웹 애플리케이션입니다.

일반적으로 개발자들은 React 또는 Vue와 같은 복잡한 프론트엔드 프레임워크를 사용하여 이러한 작업을 수행할 수 있습니다.

하지만, 이러한 프레임워크는 사용자 입력 이벤트를 듣는다거나 일반적으로 JSON 형식의 데이터를 가져와서 이 데이터를 동적으로 HTML로 렌더링하는 등 복잡한 단계들이 많이 포함되어 있습니다.

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

하지만 잠시 멈추어서 스스로에게 물어보세요. 사용자에게 구조화된 HTML을 제시하는 것이 최종 목표인데, 왜 이 복잡한 JSON 중간 매개체를 통해 탐색해야 하는 걸까요?

HTML 중심 접근 방식을 채택함으로써, 우리는 불필요한 복잡성을 우회하고 더 직접적인 경로를 택하게 됩니다.

라라벨, 장고, 루비 온 레일스와 같이 널리 사용되는 백엔드 프레임워크들은 템플릿을 사용하여 구조화된 HTML을 생성하는 강력한 기능을 제공합니다. 이것은 개발 프로세스를 간단하게 만들뿐만 아니라 성능을 향상시킴으로써 큰 장점을 제공합니다.

# 팬시한 프론트엔드 프레임워크 없이 간소화하기

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

테이블 내에서 드롭다운 필터를 구현한다고 상상해보세요.

프론트엔드 프레임워크의 복잡성에 의존하는 대신에 기본 HTML 폼 입력과 전통적인 폼 제출 메커니즘을 활용할 수 있습니다.

아래는 작동 방식입니다:

- 백엔드가 필요한 모든 데이터를 포함한 초기 뷰로 작동합니다.
- 사용자가 필터와 상호 작용하면 폼이 데이터를 백엔드로 제출하고, 그러면 백엔드가 필터링된 데이터셋으로 페이지를 다시로드합니다.

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

이 방식은 전체 페이지 다시로드를 필요로 할 수 있지만, 상당한 이점을 제공합니다.

특히, 현재 상태(적용된 필터와 같은)를 URL에 직접 인코딩함으로써, 응용 프로그램의 특정 뷰를 공유하고 재현하는 것을 간단하게 만든다는 점이 두드러집니다.

또한 별도의 API 계층이 필요하지 않아 응용 프로그램 아키텍처를 간소화하고 전반적인 복잡성을 줄이는 효과가 있습니다.

# 최신 JavaScript로 사용자 경험을 더 나은 방향으로 만들기

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

이제 사용자 경험 문제를 다루어보겠습니다. 특히 전체 페이지 새로 고침 상황에서 말이죠. 전통적인 HTML 중심 접근 방식은 단숨함과 신뢰성을 제공하지만, 쾌적한 사용자 경험을 제공하는 데는 부족할 수 있습니다.

이를 해소하기 위해 현대적인 JavaScript 기술을 도입하여 단순함을 희생하지 않고 상호 작용성을 향상시킬 수 있습니다:

- JavaScript를 사용하여 양식 제출을 가로채서 기본 동작을 방지합니다.
- 백엔드로부터 업데이트된 데이터를 비동기적으로 요청하기 위해 fetch API를 활용합니다.
- 새로 가져온 데이터로 테이블과 같은 페이지의 해당 부분만 동적으로 교체합니다.

이 방식은 현대적인 프론트엔드 관행을 통합하면서 HTML 중심 개발의 핵심 원칙을 보존합니다. URL을 동적으로 업데이트함으로써 응용 프로그램이 단순함을 희생하지 않고 사용자 친화적이고 효율적으로 유지되도록 합니다.

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

# HTMX를 사용하여 멋진 상호 작용

HTML-중심 애플리케이션에서 더 많은 유연성과 동적 성을 찾는 개발자들을 위해, HTMX와 같은 도구는 매력적인 해결책을 제공합니다.

HTMX를 사용하면 특별 속성을 HTML에 추가하여 동적 콘텐츠 업데이트를 용이하게 할 수 있습니다.

다음 기능을 고려해보세요:

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

- 데이터를 가져오기 위해 GET 요청을 트리거하는 hx-get 활용하기.
- 가져온 콘텐츠가 삽입될 위치를 정의하는 hx-target 사용하여 대상 요소 지정하기.
- 상호 작용성을 향상시키기 위해 특정 이벤트에 따라 업데이트를 트리거하는 hx-trigger 활용하기.

HTMX를 HTML을 우선으로 한 개발 워크플로에 통합함으로써, 개발자는 동적 상호 작용성의 힘을 활용하면서 백엔드에서 렌더링된 HTML의 간결함과 효율성을 유지할 수 있습니다.

**실무에 적용하기: 다단계 폼**

HTML을 우선으로 한 개발의 실용적인 적용을 설명하기 위해 다단계 폼을 구축하는 시나리오를 살펴보겠습니다.

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

HTMX의 도움을 받아 개발자들은 전체 페이지 새로 고침 없이 동적인 양식 제출 및 유효성 처리를 구현할 수 있습니다:

- 각 양식 단계는 백엔드에서 별도의 HTML 엔드포인트로 제공됩니다.
- 양식 제출은 후속 단계 로딩이나 동적 유효성 오류 표시를 트리거하며, 전체 페이지 새로 고침이 필요하지 않습니다.

이 접근 방식은 HTML 중심 개발이 복잡한 상호 작용을 수용하면서도 간결함과 효율성을 유지하는 우아함을 보여줍니다.

# 결론

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

프론트엔드 프레임워크는 의심의 여지없이 고급 기능과 기능을 제공하지만, 모든 웹 애플리케이션에 항상 최적의 선택은 아닙니다.

많은 프로젝트가 HTML 기반 백엔드 접근 방식의 간결함과 효율성을 크게 누릴 수 있습니다.

최신 JavaScript 기술을 통합하고 HTMX와 같은 도구를 선택적으로 통합함으로써, 개발자는 사용자 경험에 중점을 두면서 강인하고 유지보수 가능한 웹 애플리케이션을 만들 수 있습니다.

HTML 기반 방식은 간결성, 효율성 및 효과적인 요소의 매력적인 혼합물을 제공하는 단단한 선택이 계속되고 있습니다.

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

이 글은 스타일을 위해 AI 도움을 받아 작성되었고, 내용은 정보를 제공하기 위한 것으로 제시된 아이디어에 대해 비판적으로 참여할 것을 촉구합니다.

이 글이 마음에 들었다면 👏 로 박수를 보내고 팔로우해 주세요! 가장 좋아하는 부분을 강조해도 좋습니다. 당신의 참여가 저를 영감을 주어요!
