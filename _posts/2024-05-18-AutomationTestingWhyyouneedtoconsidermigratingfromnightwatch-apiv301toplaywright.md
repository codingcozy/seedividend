---
title: "nightwatch-api v301에서 playwright로 이주를 고려해야 하는 이유"
description: ""
coverImage: "/assets/img/2024-05-18-AutomationTestingWhyyouneedtoconsidermigratingfromnightwatch-apiv301toplaywright_0.png"
date: 2024-05-18 21:51
ogImage:
  url: /assets/img/2024-05-18-AutomationTestingWhyyouneedtoconsidermigratingfromnightwatch-apiv301toplaywright_0.png
tag: Tech
originalTitle: "Automation Testing: Why you need to consider migrating from nightwatch-api v3.0.1 to playwright?"
link: "https://medium.com/@akarshseggemu/automation-testing-why-you-need-to-consider-migrating-from-nightwatch-api-v3-0-1-to-playwright-414beb9d29ff"
isUpdated: true
---

Nightwatch.js v1.7은 JavaScript를 위해 고안된 것이기 때문에 TypeScript을 지원했습니다. Igor Bari가 nightwatch-api를 만들어 TypeScript을 지원했습니다. Igor Bari에게 nightwatch-api를 만들어주어서 정말 감사해야 합니다. Nightwatch.js v1.7 npm 패키지는 TypeScript 개발자들이 Nightwatch.js v1.7을 편리하게 제어할 수 있도록 제공했습니다.

## nightwatch-api와 Nightwatch.js v1.7의 관계는 무엇인가요?

nightwatch-api는 TypeScript를 지원하기 위해 만들어진 래퍼이며 Nightwatch.js v1.7과 관련이 있습니다.

## Nightwatch.js v1.7의 인기는 어떤가요?

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

많은 개발자들이 Nightwatch.js 프로젝트에서 nightwatch-api npm 패키지를 사용해 왔습니다. 여전히 매주 다운로드되고 있어요.

![이미지](/assets/img/2024-05-18-AutomationTestingWhyyouneedtoconsidermigratingfromnightwatch-apiv301toplaywright_0.png)

# Nightwatch.js v2.0 릴리스 이후 어떤 일이 있었나요?

Nightwatch.js v2.0 릴리스부터는 Cucumber.js를 지원합니다. Nightwatch 엔지니어링 블로그에서 Nightwatch로 Cucumber 테스트를 실행하는 데 관한 상세한 블로그 포스트가 있습니다.

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

2022년 3월 16일에 Igor Bari가 경고 메시지를 포함하여 README.md를 업데이트했습니다.

![이미지](/assets/img/2024-05-18-AutomationTestingWhyyouneedtoconsidermigratingfromnightwatch-apiv301toplaywright_1.png)

# Nightwatch v1.x에서 Nightwatch v2.x로의 이주는 무엇이 발생했나요?

Nightwatch.js는 v1.x에서 v2.x로의 마이그레이션을 돕기위한 마이그레이션 가이드를 만들었습니다. 그러나 이 가이드는 nightwatch-api npm 패키지 사용자에게 도움이 되지 않습니다. Nightwatch.js는 JavaScript를 사용할 때만 cucumber.js를 지원하기 때문에 TypeScript 사용자는 마이그레이션에서 제외됩니다.

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

## 다음 단계는 무엇이 있을까요?

- 누군가가 nightwatch-api 프로젝트를 포크하고 Nightwatch.js v2.0을 지원하도록 만들어야합니다.
  답변: 아직 누구도 프로젝트를 포크하지 않았습니다. 포크를 확인했는데 https://github.com/mucsi96/nightwatch-api/forks?include=active&page=1&period=&sort_by=stargazer_counts Nightwatch.js v2.0이상을 지원하기 위해 작업한 프로젝트를 찾지 못했습니다.
- cucumber.js를 사용하고 TypeScript로 테스트를 작성할 수 있는 다른 테스팅 프레임워크로 이동하십시오. 또한 새로운 테스팅 프레임워크로의 이전을 지원하기 위해 Nightwatch.js v1.7의 다양한 기능을 지원해야합니다.
  답변: Nightwatch.js와 주요 두 가지 테스팅 프레임워크를 비교할 수 있는 방법을 확인해보실 수 있습니다. Nightwatch.js에서 제공한 것으로 두 테스팅 프레임워크 중 어떤 것이 좋은 대안이 될지 보여주었습니다.

# nightwatch-api v3.0.1에서 playwright로 이주를 고려해야 하는 이유

내 관점으로 볼 때, Nightwatch.js 및 주요 두 가지 테스팅 프레임워크를 읽은 후, playwright가 좋은 대안이 될 것으로 판단했습니다.

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

![image](/assets/img/2024-05-18-AutomationTestingWhyyouneedtoconsidermigratingfromnightwatch-apiv301toplaywright_2.png)

고려 사항

- 테스트 시작 전에 AUT를 실행할 수 있는 지원. 사용자가 특정 포트에서 테스트 시작 전에 AUT를 시작할 수 있습니다.
- Visual Studio Code와 확장 프로그램 형태로 통합되어 있습니다.
- 다양한 언어 지원 - Javascript, Typescript, Java, Python, .NET.

나는 이러한 세 가지 고려 사항으로 Nightwatch.js v1.7에서 Playwright로 테스트를 이전하려고 합니다.

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

내 글을 좋아하신다면, 제 Medium 팔로우하기를 눌러주세요. 또한 YouTube에서 제 영상을 시청하실 수도 있고, 커피 한 잔 사주는 걸로도 저를 응원할 수 있어요.
