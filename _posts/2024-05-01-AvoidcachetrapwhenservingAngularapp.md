---
title: "앵귤러로 웹사이트 만들 때 캐시 함정을 피하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-AvoidcachetrapwhenservingAngularapp_0.png"
date: 2024-05-01 23:52
ogImage:
  url: /assets/img/2024-05-01-AvoidcachetrapwhenservingAngularapp_0.png
tag: Tech
originalTitle: "Avoid cache trap when serving Angular app"
link: "https://medium.com/@elelad/avoid-cache-trap-when-serving-angular-app-c5981653d156"
isUpdated: true
---

![이미지](/assets/img/2024-05-01-AvoidcachetrapwhenservingAngularapp_0.png)

가장 이상한 버그 중 하나는 대규모 디자인 변경 후 발생했어요. 매일 아침마다 문제가 생기는 건데, 왜 그런 걸까요? 이 기사 제목을 보셨으니 이미 캐시와 관련이 있다는 건 알겠죠. 그렇다면 이런 문제가 왜 발생하는 걸까요, 그리고 어떻게 예방할 수 있을까요?

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

우리는 모두 캐시를 좋아합니다, 맞지요? 캐시는 앱을 더 빨리 로드하는 데 도움을 주고, 서버로부터 일부 부하를 줄여 주며, 사용자들이 우리 앱에서 좋은 사용자 경험을 느낄 수 있도록 합니다.

하지만 때로는 이 캐시가 우리에게 반대로 작용하고 사용자들이 앱의 최신 버전을 얻지 못하도록 할 수 있습니다. 이는 아마도 서버의 잘못된 캐시 구성 때문인 경우가 많습니다.

우리 Angular 애플리케이션에서 캐시 문제를 피하고 앱 버전 관리하기 위해서, 우리가 ng build --prod로 프로덕션용 앱을 빌드할 때 Angular는 (기본적으로) 우리의 js 파일에 해시를 추가하고 index.html 파일을 해시 파일을 참조하도록 업데이트합니다. 새 버전을 배포하면 해시 키가 변경되고 사용자가 사이트를 다시 요청하면 index.html은 서버에서 새 파일을 로드하도록 요청합니다. 브라우저에는 이러한 파일이 캐시되어 있지 않기 때문에 서버에서 파일을 받아옵니다.

그래서 Angular 덕분에 문제가 해결됐다고 할 수 있을까요? 음, 완전히 그렇지는 않습니다. 문제는 index.html 파일이 캐시될 때 발생합니다. 새로운 앱 버전을 디플로이했고 정적 파일과 index.html 파일이 캐시되어 있는 상황에서 사용자가 메인 URL에서 앱을 시작하면 캐시된 index.html은 이전 js 파일을 로드하도록 요청할 것이고, 이 파일들은 브라우저 캐시로부터 로드될 수 있습니다.

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

하지만 시나리오를 계속 진행하면서 약간 복잡해집니다. 사용자는 우리 앱을 사용하며(기억하세요 - 이전 버전으로), 화면 간 이동을 하고 몇 가지 작업을 합니다. 어느 시점에서 새로고침을 하기로 결정했는데, 이제 새 앱 버전을 받게 되었습니다.

기다려주세요, 새 버전? 하지만 왜요? index.html이 캐시에 있고, 왜 새 버전을 받고 있을까요? 이는 SPA를 서버에서 제공할 때 리다이렉트하는 방식과 관련이 있습니다.

SPA는 클라이언트 측에서 앱 내비게이션을 처리하며, Angular 라우터를 통해 새 경로로 이동할 때마다 주소 표시줄의 URL을 동적으로 변경합니다. 사용자가 브라우저 주소 표시줄에 앱의 루트를 입력하고, 예를 들어 https://some-domain.com/home을 입력하고 엔터를 클릭하면, 실제로 서버에 이 루트가 없지만, 404를 반환하는 대신 서버에서 index.html을 반환하도록 구성되어 있습니다. Angular 라우터가 작업을 수행하고 사용자를 올바른 화면으로 이동시킵니다.

이제 우리 시나리오에서 무슨 일이 일어나고 있는지 이해할 수 있습니다. 메인 URL에서 앱에 접속하면 캐시에 이 엔드포인트가 있기 때문에 이전 버전을 받게 됩니다. 그러나 특정 경로를 요청하는 경우, 항상 서버에서 index.html을 받고 캐시에서가 아닌 새 버전을 보게 됩니다 - 따라서 새로 고침 후에 새 버전이 나타날 것입니다.

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

좋죠, 그렇죠? 덕분에 캐시에 있는 하나의 index.html 때문입니다.

## index.html 파일이 캐시되었는지 확인하는 방법

index.html 파일이 캐시되어 있는지 확인하는 것은 매우 쉽습니다.

- 브라우저 개발 도구를 엽니다.
- 네트워크 탭으로 이동합니다.
- 캐시 사용 확인란이 선택되지 않았는지 확인합니다.
- 문서로 필터링합니다.
- 화면을 새로 고칩니다.
- 첫 번째 문서를 클릭합니다.
- 캐시 제어 헤더를 확인합니다.

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

예를 들어 angular.io/docs 사이트를 살펴봅시다:

![이미지](/assets/img/2024-05-01-AvoidcachetrapwhenservingAngularapp_1.png)

캐시 제어 헤더를 보면 no-cache로 설정되어 있습니다. 캐시 제어 헤더에서 어떤 값이 우리에게 좋은지 알아봅시다.

- no-cache — 이 값을 사용하면 index.html 파일이 캐시되지만, 캐시 시스템이 서버에 더 새로운 버전이 있는지 확인하도록 합니다. 우리에게 적합합니다.
- no-store — 이 값을 사용하면 캐시 시스템이 index.html 파일을 캐시하지 않도록 합니다. 좋은 방법입니다.
- max-age=0 — 이 값 또한 index.html을 캐시하지 않습니다.
- max-age=31536000 — 이 값은 좋지 않습니다. max-age의 값은 초로 표현되며, index.html이 1년 동안 캐시됩니다. 어떤 값이 적합한지는 본인의 의견에 따라 다를 수 있지만, index.html을 1년 동안 캐시하고 싶지 않을 것이라는 점에 동의할 수 있을 것 같습니다.

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

그것들은 cache-control 헤더에 대한 인기있는 값들이에요; 응답에서 다른 것을 본다면, 여기서 확인해보실 수 있어요.

## cache-control 헤더를 제공하지 않았을 경우에는 어떻게 될까요?

음, 지금은 "무인도" 영역에 있다고 할 수 있어요.

![이미지](/assets/img/2024-05-01-AvoidcachetrapwhenservingAngularapp_2.png)

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

이 문구는 w3.org 섹션 13.2.2에서 인용한 것입니다:

여기서 몇 가지 종류의 캐시를 언급하는 것이 좋을 것 같습니다. 우리 브라우저의 캐시는 우리 브라우저에서만 우리에게 서비스하는 개인 캐시입니다. 그러나 여러 가지 가능성으로 사용자 간에 공유되는 공개 캐시도 있습니다: 프록시 캐시, 게이트웨이 캐시, CDN, 역방향 프록시 캐시 및 로드 밸런서 등이 있습니다.

따라서, 우리는 indx.html을 캐시하는 방법에 대한 구체적인 지시를 제공하지 않았을 때 어떻게 캐시를 처리해야 하는지에 대한 명세가 없음을 이해했습니다. 기본적으로 모든 캐시나 브라우저는 우리가 제공하거나 제공하지 않는 다른 헤더에 기반한 자체 알고리즘을 적용하고 여전히 index.html을 캐시 할 수 있습니다. 게다가, 이러한 종류의 것들은 테스트할 수 없습니다. 사용자들이 사설 네트워크나 캐시 알고리즘을 적용하는 ISP에서 앱에 접속할 수 있으며 당신은 그 사실조차 알지 못할 수 있습니다. 이것이 W3가 적용을 권장하는 이유입니다. 우리가 명시적인 만료 시간을 제공하도록 하는 것입니다.

따라서, index.html에 올바른 캐시 제어 헤더가 함께 제공되는지 확인하세요.

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

## 캐시 함정

cached index.html의 실제 문제는 캐시에 이미 파일을 받은 사용자들이 캐시된 파일로 갇혀 있을 수 있는 점입니다. 이 상황이 해결되는 방법은 두 가지 중 하나가 발생할 때까지 기다려야 합니다:

- 사용자가 캐시를 수동으로 지우는 경우(브라우저 캐시에 파일이 캐시된 경우를 가정함).
- 캐시 만료일이 도래하는 경우.

걱정하지 마세요; 이러한 index.html 문제는 상당히 드뭅니다. 대부분의 호스팅 서비스들은 기본적으로 오랜 캐시 구성이 있는 정적 파일을 제공하지 않습니다. 그러나 Angular 앱을 제공하는 서버가 이미 존재하고 동적 파일을 제공하는 경우에는 이 문제가 발생할 수 있습니다.

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

## index.html 폼이 캐싱되는 것을 방지하는 방법

아마도 HTML 메타 태그로 캐시를 제어하려고 시도하라는 StackOverflow 답변을 몇 가지 찾을 수 있을 겁니다. 심지어 이를 테스트해 볼 수 있고, 브라우저에서 작동할 수도 있습니다. 하지만 좀 더 조사해 보면, 이는 캐시를 방지하는 효과적인 방법이 아님을 알게 될 것입니다. 이러한 태그들은 일부 브라우저에 의해 존중될 수 있지만 다른 유형의 캐시에는 존중되지 않을 수 있습니다.

가장 좋은 방법은 서버의 index.html에 캐시 제어 헤더를 설정하는 것입니다. 이를 위해 서버 구성에 일부 변경이 필요하지만 이것이 캐시를 방지하는 가장 간단하고 효과적인 방법입니다.

## 서비스 워커를 사용하고 있어요; 모두 좋아요!

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

죄송하지만 아니에요.

angular.io의 예제에서 서비스 워커에서 서비스되는 파일을 주목했을 수 있습니다. 그러나 Angular 팀은 여전히 이 파일을 캐시 제어=no-cache 헤더와 함께 서버에서 보냅니다.

서비스 워커는 멋져요! 풀 컨트롤을 제공하는 동시에 파일을 캐싱합니다. 그러나 이전에 언급한 대로 몇 가지 캐시 유형이 있죠. 서비스 워커는 그 중 하나일 뿐입니다. 요청이 통과하는 레이어 중 하나인 서비스 워커는 HTTP 캐시(브라우저 캐시)나 공용 캐시는 대신하지 않습니다. 서비스 워커가 서버에서 파일을 가져오기로 결정하면 브라우저는 여전히 해당 헤더를 확인하여 캐시에서 제공할지 여부를 결정할 것입니다.

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

몇 가지 캐시 문제는 디버그하기 어렵고 재현하기 어렵며 쉽게 코드 문제로 오해될 수 있습니다. 보통 우리 앱의 최종 사용자로부터 발생하며 새 버전을 얼마나 자주 릴리스하는지에 따라 달라집니다. 일부 사용자는 문제가 있다고 신고하지 않을 수도 있고, 그냥 "새로고침하면 사라지는 이상한 동작"으로만 설명할 수도 있습니다.

우리 모두는 사용자들을 위해 최상의 경험을 원합니다 — 자신이 확신이 없다면, 오늘은 캐시를 확인해보세요! 😏
