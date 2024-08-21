---
title: "가디언이 Deno를 사용해 270만 개 기사에서 접근성과 성능을 감사하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowtheGuardianusesDenotoauditaccessibilityandperformanceacrosstheir27millionarticles_0.png"
date: 2024-06-22 04:56
ogImage:
  url: /assets/img/2024-06-22-HowtheGuardianusesDenotoauditaccessibilityandperformanceacrosstheir27millionarticles_0.png
tag: Tech
originalTitle: "How the Guardian uses Deno to audit accessibility and performance across their 2.7 million articles"
link: "https://medium.com/@denoland/how-the-guardian-uses-deno-to-audit-accessibility-and-performance-across-their-2-7-million-articles-97bff7edc22f"
isUpdated: true
---

![Image](/assets/img/2024-06-22-HowtheGuardianusesDenotoauditaccessibilityandperformanceacrosstheir27millionarticles_0.png)

(원래 deno.com/blog에 게시됨.)

독립 매체인 가디언은 자사의 기사의 성능과 접근성을 감사하기 위한 가벼운 유지보수 솔루션이 필요했습니다. 가디언이 Deno를 핵심 인프라에서 이용하여 270만 개의 기사 전반에 걸쳐 접근성과 성능을 감사하는 방법을 알아보세요.

# 과제

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

가디언 웹사이트는 매달 3억 5천만 개 이상의 고유 페이지 조회수를 기록합니다. 독자들의 기대를 충족하기 위해서는 웹사이트가 성능에 최적화되어 있고 콘텐츠를 최대한 빨리 제공할 뿐만 아니라 다양한 웹 접근성 요구사항을 지원해야 합니다.

대형 매체 사이트로서 각 밀리초가 중요합니다. BBC에 따르면 페이지 로딩에 추가된 1초가 사용자의 10%를 이탈시킨다고 합니다. 웹사이트의 고객 소프트웨어 엔지니어인 맥스 듀발은 "웹사이트에 발행된 자산이 최적화되었는지를 보장하기 위한 방법이 필요했습니다"라고 말합니다.

성능 이외에도 엔지니어들은 독자들이 웹사이트에서 콘텐츠를 소비할 때 다양한 보조 기술을 사용하는 사실을 인지하고 있습니다. 자신들의 이야기가 널리 읽히도록 하려면 웹 접근성 요구사항을 준수해야 합니다. 맥스는 "수동 감사를 통해 일부 기사에 중요 속성이 누락된 HTML 요소가 포함되어 있는 것이 밝혀졌습니다. 새로운 기사는 최상의 접근성 규칙을 준수하도록 하고 싶었으나, 이러한 불일치 사항을 대규모로 발견하는 시스템화된 자동 접근 방법이 없었습니다"라고 말합니다.

# 해결책

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

팀은 접근성 및 성능 불일치를 평가하기 위한 자동화 시스템을 구축해야 한다는 것을 알았습니다. 먼저 Node를 시도했지만 복잡성 문제에 직면했습니다. Max는 "페이지를 다운로드하고 살펴보는 것과 같이 간단한 작업에 Node를 사용하는 것은 매우 복잡했다"고 말합니다. "GET 요청 수행, URL 구문 분석, 리다이렉션 해결은 모두 라이브러리를 평가하고 설치하는 것이 필요했습니다." 그러나 웹 표준 API를 네이티브로 지원하는 Deno를 사용하면 동일한 스크립트가 훨씬 간단해집니다. Max는 "Deno에는 의존성 부풀림 위험이 없으므로 Node 및 npm에서 발생하는 문제가 없습니다."

또한 Deno를 사용해 네이티브 TypeScript 지원을 즐겼습니다. Max는 "가디언은 서버 코드의 대부분을 전통적으로 스칼라로 사용해왔는데 강한 유형화가 되어 있습니다. TypeScript는 꾸준히 인기를 얻고 있지만 번들되지 않은 애플리케이션에 사용하기 어려웠습니다. 설정 없이 TypeScript를 작성하고 실행할 수 있는 것은 우리 팀이 빠르게 움직이는 데 도움이 되었습니다,"라고 말합니다.

자동화된 시스템은 GitHub Actions에서 매일 Deno 스크립트를 실행하여 누락된 HTML 속성 및 이미지, 폰트, 기타 미디어와 같은 에셋 크기를 확인하여 접근성 및 성능을 평가합니다. 작업에 의해 나타난 어떤 차이점이라도 팀이 조사할 수 있도록 GitHub 이슈를 업데이트합니다.

"우리의 이야기들이 가능한 많은 독자들에 의해 소비될 수 있도록 하는 것에 도움이 되도록 기반을 설치하는 것이 우리에게 쉬웠다,"고 Max는 말합니다.
