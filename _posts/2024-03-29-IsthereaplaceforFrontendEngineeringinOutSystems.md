---
title: "아웃시스템즈에서 프론트엔드 엔지니어링에 장소가 있을까요"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Is there a place for Frontend Engineering in OutSystems"
link: "https://medium.com/itnext/is-there-a-place-for-frontend-engineering-in-outsystems-7e1ebbdef900"
isUpdated: true
---

![이미지](/assets/img/IsthereaplaceforFrontendEngineeringinOutSystems_0.png)

OutSystems를 처음 설치한 지 두 해가 지났습니다. OutSystems와 함께한 저의 여정이었습니다.

가장 중요한 것은 저는 프론트엔드 엔지니어이며, 처음에는 여정이 조금 험난했지만 조정을 거쳐 실질적인 진전을 이루었고, 제가 믿는 바에 따르면, OutSystems의 로우코드 개발 시 프론트엔드 엔지니어링에도 장소가 있다는 것을 믿습니다.

## 안녕 OutSystems, 만나서 반가워요

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

친구의 초대를 받아 로우코드를 받아들이기로 결정했어요. 시작부터 전통적인 하이코드 소프트웨어 개발과 비교했을 때 이점을 명확히 볼 수 있었어요.

OutSystems는 이 분야의 발전기일 수도 있지만, 다른 회사도 따를 것이며 로우코드는 미래입니다. 그래서 2019년에 이것이 방향이라고 결정했어요 🤖

행운이 따라, 훌륭한 선생님이 될 프로젝트에 합류하게 되었어요. 약 30명의 엔지니어, 수백 개의 응용 프로그램 및 모듈로 이루어진 의료 산업 제품이 이미 운영 중이었어요. 이를 통해 아키텍처 캔버스, 층간 참조 및 종속성, 그리고 테마, 웹 블록, 레이아웃이 어떻게 상호 작용하는지 분명히 이해할 수 있었어요.

프로젝트에 합류하게 된 이유는, 프론트엔드 문제가 지속적으로 발생하여 팀이 새로운 기능을 구현하는 것을 방해했기 때문이었어요. OutSystems에 익숙하지는 않았지만, 프론트엔드 개발 경험이 유용할 것이라고 생각되었어요.

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

오 좋아요... 그들이 알지 못했던 것들이 있었어요.

## 아이스버그인가요? 아니면 코끼리인가요?

주간이 지남에 따라 CSS와 JavaScript 코드베이스에 익숙해지면서, 계속해서 "이게 뭐하는 거지" 라는 순간들이 있었어요.

CSS는 어디로든 흩어져 있었고, 여러 테마에서 복사하여 붙여넣었어요. 하나의 패턴을 변경해야 할 때 마다, 여러 곳에서 문제가 발생했답니다. CSS 아키텍처에 대한 개념이 없었고, 무작위로 덮어쓰여진 수많은 스파게티 CSS 줄들만 존재했어요.

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

자바스크립트는 전역 네임스페이스에 있었습니다. 똑같은 변수와 함수 정의가 우연히 덮어씌워졌고, 웹 블록의 순서를 바꿔보면 때때로 작동하다가 때때로 동작하지 않을 때도 있었습니다. 캡슐화, 상속과 같은 개념은 전혀 찾을 수 없었습니다. 물론 아코디언, 팝업, 날짜 선택기, 아이프레임, 드롭다운 등 다양한 문제가 있었습니다.

가끔은 작동했고, 때때로는 작동하지 않았습니다. 이유를 아무도 모르는 상황이었죠.

저는 상급 직원과 경영진으로부터 계속해서 들었습니다: "이것은 거대한 프로젝트이다", "우리에겐 수 년의 레거시 코드가 있다", "아직 전체 그림을 보지 못했으니 아이스버그처럼 크다"...

하지만 사실은 현실은 훨씬 명확합니다.
방 안에는 큰 코끼리가 있었습니다: 기술적 지식의 부재였죠. 🐘
이 정도 나쁜 코드 중 일부는 이전 몇 달 동안 인증된 아웃시스템즈 기술 리드들이 만들었습니다.

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

몇 달 후, 나는 총괄 매니저를 설득해서 실제로 HTTP 요청의 응답 및 브라우저 내에서 어떤 일이 일어나는지를 아는 더 많은 프론트엔드 엔지니어가 필요하다고 생각했습니다. 이 관리 승인은 어떤 일이 벌어질 것인지에 있어서 매우 중요했어요.

Low-code 개발에 목숨을 걸 것 같은 프론트엔드 엔지니어를 모집해 보신 적이 있나요? 쉽지 않았어요, 인터뷰가 많았지만 두 명 더 찾았어요.

프로젝트를 이해하고 플랫폼이 작동하는 방식을 이해하기 위해 몇 주 동안 러프업을 진행했어요. 그 때 나는 아웃시스템즈를 경험한 지 6개월이 되었고, 그들은 0년차였는데, 그 초반 주간들은 재미있었어요... 웃음과 절망이 어우러진 시간이었죠. 우리 세 명 중 하나는 Angular, React, Vue 경험이 있었어요. Nodejs, Webpack, SASS를 사용하는 등 몇 가지 트렌디한 용어로, 우리는 전체 애플리케이션을 재구성하고 코드를 절반으로 줄일 수 있었어요.
UI 결함이 크게 감소되었고 응답 시간이 즉각적으로 줄었습니다. 우리는 애플리케이션 행동, 글꼴 및 색상을 실시간으로 변경할 수 있었죠 (관리팀이 몇 년 동안 하고 싶어했지만 달성하지 못했던 것들이었죠).

프론트엔드 엔지니어 중 한 명은 스핀오프 프로젝트에 집중할 수 있게 되었고, 이제 우리는 비즈니스 가치가 높은 새로운 기능에 전념할 수 있게 되었어요.
그들이 온보딩을 마치고 3개월 후, 나는 부모휴가를 나갔는데 누구도 그걸 실제로 못 눈치챘어요. 스스로 불필요해지는 것을 경험해 보는 거야 😂

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

어떻게 가능했던 걸까요? 무슨 일이 있었나요?
아니요, 프론트엔드 엔지니어들은 천재가 아닙니다.
아니요, 인증된 OutSystems 기술 리드들은 무능한 사람들이 아닙니다.

## 개발자란 무엇인가

가장 흔한 비기술적 대화 중 하나는 아마도 프론트엔드 엔지니어 역할에 관한 것이겠죠.

오늘날의 프로젝트에서는 데이터 과학자, 데브옵스 전문가, UI 디자이너, UX 연구원, 제품 디자이너, 데이터/비즈니스 분석가, 제품 소유자, 프로그램 매니저, 엔지니어링 매니저가 있습니다... 아마도 빠진 역할이 몇 개 더 있을 겁니다. 모두 자신의 역할과 기술 세트에 집중합니다.

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

그럼요… 여러분이 찾는 것을 가지고 있는 개발자, 일명 아웃시스템즈 개발자, 일명 풀스택 개발자가 있습니다. 타이머 및 SQL 및 JavaScript 및 CSS를 알고 있는 그 사람 혹은 그 여자… 정말요? 😒

만약 DOM 및 CSSOM을 이해하지 못한다면...
만약 JavaScript 이벤트 루프가 무엇인지 이해하지 못한다면...
만약 모델-뷰 개념을 이해하지 못한다면...
만약 ECMAScript, 캡슐화, 상속, 네임스페이스를 이해하지 못한다면...

자신을 아웃시스템즈 풀스택 개발자라고 부르면 안 된다고 생각해요.

하지만 그래도 될까요?

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

## 모든 것은 앞으로 나아가는 가운데 달려있습니다

아마도 이 기사의 전체 의도는 이 질문을 논박하거나 대답하는 데 있지 않을 것입니다. 오히려 내가 생각하는 몇 가지 반성을 섞은 발작 같은 것입니다.

집을 짓는 경험이 있나요? 모든 것을 다 다루는 만능의 계약업자 🤑를 고용하는 상상을 해보세요. 석축, 전기 시설, 배관, 석고공사 등을 처리할 거예요. 그리고 마지막까지 모든 것이 완료되고 전기 가전제품을 연결하면 전기 패널이 폭발합니다. 전기 기사를 불러… 그가 관찰한 후 "전체 전기 시설을 교체해야 합니다. 코드에 맞게 되어 있지 않았어요. 세탁기와 온수기를 동시에 연결하려면 일부 벽을 부숴 다시 배선해야 합니다. 그리고 건조기를 작동할 때는 다른 장비를 연결할 수 없습니다."

저는 지난 2년동안 전기 기술자와 같은 기분입니다:
누군가: "제발, 몇 가지 프론트엔드 문제를 해결할 수 있는 솔루션을 제안해주세요!"
저: "처음에 프론트엔드 전문가를 고용하지 않았던 이유가 뭔가요?" 🤷
(종교적인 언급은 신경쓰지 마세요, 지중해 문화입니다)

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

아웃시스템즈 웹사이트의 가이드 경로 비디오로 만든 프로젝트와 공개용 맞춤형 B2C 솔루션 사이에 명확한 차이가 있습니다.

어떤 것에 목표를 두고 있나요?

## 아웃시스템즈의 방식. 당신의 충성심은 어디에 있을까요?

저는 많은 해역에서 계약자로 활동해 왔습니다. 인기 있는 믿음과 달리 현역자는 더 높은 급여에 충성하는 용병이 아닙니다.

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

내가 충실하게 지키는 것들이 많아! (특정한 순서는 없어!)

- 내 지도 아래나 내 옆에 있는 팀
- 내게 월급을 주고 내 성과에 의지하는 비즈니스와 회사
- 일의 질

세 번째 항목이 문제야. 👌

Frontend 개발에 대한 내 원하는 방향이 OutSystems 방식이 아니라는 얘기를 듣면 짜증이 나.

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

OutSystems 방식이 품질을 제공하지 않는다면, 다른 방법을 찾아야겠어요.

웹 개발 세계는 Flash가 사라지고 첫 JavaScript 프레임워크가 등장하면서 많이 변화했어요, 브라우저도 많이 발전했죠. 브라우저는 .Net Core, Java 또는 로우 코드로 작성된 코드인지 신경쓰지 않아요. 브라우저가 이해하는 것은 HTML + CSS + JavaScript뿐이죠.

지금까지 프론트엔드에서는 GitHub, npm, Node.js, SASS, Webpack, TypeScript와 같은 기술이 필수품이었어요... 만약 후처리기와 적절한 병합 기능이 없는 1000줄 이상의 CSS 코드를 관리해야 하거나 JavaScript가 여기저기 흩어져 있다면, 당신은 스스로에게 생각해 봐야 할 것이 있어요: 반드시 다른 방법이 있을 거라고.

## 결론

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

로우 코드가 미래입니다. 전통 기술에서 개발한 사람은 보일러플레이트 코드, 데이터베이스 처리 및 연결, 사용자 처리에 대한 이점을 이해합니다. 이 모든 것이 분산 아키텍처와 컨테이너화 위에 있습니다.

그러나 브라우저는 그 모든 것에 무관합니다. HTTP 요청의 반환 측면에 있는 모든 것은 클라이언트 측에서 처리되고 브라우저에 의해 렌더링됩니다: 이미지, 폰트, HTML, JavaScript 파일, CSS 파일...

모든 팀은 우리 모두가 의존하는 기술과 도구를 제대로 이해하고 스킬 세트를 갖추어야 합니다.

프론트엔드 엔지니어링을 위한 공간이 있습니다. 🤘

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
