---
title: "우리가 알고 있는 프론트엔드 개발의 종말 2024년 최신 동향 분석"
description: ""
coverImage: "/assets/img/2024-06-22-TheFront-EndDevelopmentwereusedtoisdying_0.png"
date: 2024-06-22 05:20
ogImage:
  url: /assets/img/2024-06-22-TheFront-EndDevelopmentwereusedtoisdying_0.png
tag: Tech
originalTitle: "The Front-End Development we’re used to is dying"
link: "https://medium.com/@maks-dolgikh/the-front-end-development-were-used-to-is-dying-5e8e9ec99951"
isUpdated: true
---

![image](/assets/img/2024-06-22-TheFront-EndDevelopmentwereusedtoisdying_0.png)

# 소개

SPA가 등장하기 전에 웹 애플리케이션은 일반적으로 다중 페이지로 이루어져 있었습니다. 사용자가 애플리케이션과 상호 작용할 때마다 서버가 새로운 전체 페이지를 보내고 브라우저가 다시로드하는 방식이었습니다. 사용자가 페이지 간을 이동할 때마다 완전한 페이지 재로드가 발생했고, 이로 인해 속도가 느려지고 부자연스러운 사용자 경험이 발생할 수 있었습니다. 비슷한 애플리케이션들은 주로 PHP, Ruby on Rails, ASP.NET 등과 같은 서버 측 기술을 사용하여 구축되었는데, 이들은 서버 측에서 HTML 코드를 생성하여 브라우저로 보냈습니다.

![image](/assets/img/2024-06-22-TheFront-EndDevelopmentwereusedtoisdying_1.png)

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

웹 개발자들은 만능 전문가였어요. 그들은 프론트엔드와 백엔드 부분을 동시에 책임지고 있었어요. 웹 기술의 발전과 사용자의 요구에 따라, 문제없이 상호작용 인터페이스로 작업할 수 있는 새로운 솔루션이 필요했죠.

그래서 BackboneJs나 AngularJs를 사용한 SPA의 최초 솔루션이 나타났어요. 그것들은 서버 부하를 줄이고 상호작용을 제공함으로써 서버의 제한된 자원을 고려한 적이 없는 웹 페이지와 함께 새로운 페이지를 기다리지 않아도 됐답니다.

이렇게 프론트엔드와 백엔드 부분으로의 분리가 나타났어요. 순수한 프론트엔드 개발자의 역할은 더욱 필요하고 다양해졌어요. 그들은 사용자 인터페이스 생성, HTML, CSS, JavaScript와 상호작용하는 API 및 서버와 작업하는 기술을 전문화하기 시작했어요. 그 반대로 백엔드 개발자들은 데이터 처리, 응용 프로그램 비즈니스 로직, 데이터베이스와 서버 API 생성에 더 집중했어요.

그래서 React, Angular2, Vue 및 기타 웹 애플리케이션 개발 도구 시대로 진입했어요. 단순한 양식과 목록을 만드는 대신, js-routing, 상태 관리, 브라우저 API, 요청에 권한 토큰 바인딩, 데이터 매핑 등의 작업이 가능해졌어요.

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

이 접근 방식의 결과로 문제점이 발생했습니다:

- 커뮤니케이션과 조정에 대한 어려움. Api 계약 및 통신 방법 — HTTP 1.1, Websocket, GraphQL. JSON 파싱과 유효성 검사.
- 이해와 지식의 차이. 예를 들어, 여러 쿼리를 생성하는 프론트엔드 애플리케이션을 개발하고 일반적 및 최적화된 SPA로 간주할 수 있습니다. 그러나 백엔드에서는 데이터베이스 액세스가 많이 필요하고 이 데이터의 적절한 집계가 필요하므로 성능 및 유지 관리에 영향을 줄 수 있습니다.
- 작업의 중복. 대부분의 CRUD 작업은 프론트엔드에서 동일한 동작을 가졌습니다. 이제 단순히 서버에서 목록을 가져오는 것이 아니라 store()에 넣었습니다. 각 사용자 작업은 dispatch()를 통해 처리되고 요청이 실행되기를 기다리며, 그 후에 결과에 따라 reducer()를 통해 store를 업데이트합니다. — 데이터베이스에서 백엔드가 수행하는 모든 작업을 프론트엔드에서 반복합니다. (페이지 다시로드 및 서버에서 현재 상태로 SPA를 복원하는 것도 언급할 가치가 있습니다 — 현재 별도의 고통입니다)
- 디버깅 및 테스트의 어려움. 이제 가능한 통합 문제를 고려하고 응용 프로그램의 양쪽 컨텍스트에서 테스트해야 합니다. 네, 프론트엔드 애플리케이션에 대해 격리된 e2e-tests을 만들 수 있지만 제품 생산성을 보장할 수 없습니다. 네, ZoD가 서버 응답을 유효성 검사하기 위한 것이 있지만, 그 사용 비율은 얼마나 되는지요?
- 개발 시간 및 비용 증가. API 계약에 대한 변경 사항은 동시에 두 명의 사람이 필요합니다. 서버로 직접 템플릿을 변경할 수 없습니다. 변경을 원활히 수행하려면 럴리를 필요로하고, 개별 작업으로 분할되며, 비즈니스 분석 전문가 등등이 필요합니다.
- SEO. 우리 앱은 JS를 통해 완전히 형성되므로 검색 엔진은 앱 콘텐츠와 적절히 인덱싱 및 내비게이션 할 수 없기 때문에 SSR 및 SSG 솔루션이 필요했습니다.
- 보안. 페이지에 입력된 모든 중요 데이터는 서버로 전달되기 전에 숨겨야 합니다. 또한 애플리케이션을 위해 서버로부터 많은 개인 정보를 요청해야하므로 액세스 토큰이 공개됩니다.

# 그래서, 왜 보통의 프론트엔드가 사라지고 있는 걸까요?

어떤 리소스로 가든 공고가 얼마나 많이 열려 있는지 확인할 수 있습니다:

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

- Python + Django
- PHP + Laravel
- NextJs + React
- Nuxt + Vue

이것들은 모두 서버 기반 웹 애플리케이션 개발을 위한 번들입니다. 수분화와 재개성 접근 방식 덕분에 서버는 페이지를 다시로드하지 않고 인터페이스의 수정된 부분만 렌더링할 수 있습니다.

그들이 제공하는 것들:

- 이제 서버 애플리케이션은 복잡한 HTTP 또는 WS 계약이 필요하지 않으며 양쪽에서 지원해야 하는 것들을 사용하지 않아도 됩니다. gRPC와 같은 다른 서비스와의 정보 교환에 대해 더 나은 방법을 사용할 수 있게 됩니다.
- 변경 사항을 만드는 과정이 중간 승인 없이 빨라져 1명의 사람이 사용자가 바로 변화를 볼 수 있습니다.
- 테스트를 통해 애플리케이션을 종합적으로 확인할 수 있어 통합 테스트를 없애고 오류를 줄일 수 있습니다.
- HTML 마크업만 교환하므로 모든 "요청-응답" 로직이 사용자에게 숨겨집니다.
- SPA를 올바른 상태로 복원하기 위해 JSON으로 많은 데이터를 전달할 필요가 없습니다. 이미 준비된 템플릿을 전달할 수 있습니다.
- 페이지의 JS 코드가 최소화되므로 babel 및 기타 도구를 사용하여 브라우저 호환성에 대해 걱정할 필요가 없습니다.

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

노코드 솔루션의 등장, 인공지능을 활용한 템플릿 생성, 거대한 서버 자원, 그리고 SEO 요구사항으로 인해 현재는 프론트엔드 개발자 수와 도구들이 전체 애플리케이션을 개발하는 데 필요하지 않은 상황입니다.

사업주들은 타당한 질문을 하고 있습니다. "왜 단순한 애플리케이션을 개발하려면 순수한 프론트엔드 개발자와 백엔드 개발자를 고용해야 하죠?"

풀스택 개발자는 인력 비용을 절약하는 관리 쇼파로 여겨질 수 없습니다. 지금은 필수적인 존재입니다. 순수한 프론트엔드 개발자가 아니라, 데이터베이스에서 직접 간단한 작업을 수행하고 결과를 표시할 수 있는 개발자가 필요합니다.

그렇습니다, 복잡하거나 헤드리스 애플리케이션은 프론트엔드와 백엔드를 분리해서 사용해야 할 것입니다. 그러나 대부분의 애플리케이션은 SPA에서 멀어져가고 이미 존재했던 방식으로 나아가게 될 것입니다. 지금은 그러한 문제들에 대한 해결책이 있습니다. HTMX의 등장으로 어떤 백엔드 개발자도 기본 지식만 있으면 웹 애플리케이션을 만들 수 있습니다. 이제는 조금의 논리를 사용하여 싱글 페이지 앱을 만들 때 심지어 JS를 알 필요가 없습니다.

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

앞단 개발자는 JS 로직 뿐만 아니라 CSS 및 적절한 선택자, HTML 및 그 의미론에도 책임이 있었는데, 이제 백엔드 개발자가 그것을 알아야 할까요? — 아니요, 이제는 인공지능 또는 "HTML 레이아웃 디자이너"가 Figma 레이아웃을 기반으로 템플릿 생성을 처리할 수 있습니다. HTML 템플릿의 로직과 상호작용은 이제 서버에서 정의됩니다.

# 결론

지금은 모든 이러한 정교한 프론트엔드 개발 도구가 실제로 필요한지, 순수한 프론트엔드 개발자로 남아야 할지를 고민할 때입니다.

현재의 프론트엔드 개발자들이 60% 프론트엔드, 40% 백엔드로 분할된 풀스택 자격으로 이동해야 하는 것이 바람직합니다. HTMX는 시작에 불과하며, NextJs 또는 Nuxt 도구를 향한 벡터가 성장할 것이며, Angular 유형의 프레임워크는 새로운 구현에 적응할 수 없다면 죽을 것입니다. 물론 Angular 생태계에는 이미 AnalogJs에서 프로토타입이 있습니다.

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

# 자원

"프론트 엔드 개발자" 역할로 취업 정보 검색

"풀 스택 개발자" 역할로 취업 정보 검색
