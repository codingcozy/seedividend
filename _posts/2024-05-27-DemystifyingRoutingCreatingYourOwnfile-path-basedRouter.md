---
title: "Routing으로 나만의 파일 경로 기반 라우터 만들기"
description: ""
coverImage: "/assets/img/2024-05-27-DemystifyingRoutingCreatingYourOwnfile-path-basedRouter_0.png"
date: 2024-05-27 18:24
ogImage:
  url: /assets/img/2024-05-27-DemystifyingRoutingCreatingYourOwnfile-path-basedRouter_0.png
tag: Tech
originalTitle: "Demystifying Routing: Creating Your Own file-path-based Router"
link: "https://medium.com/bitsrc/demystifying-routing-creating-your-own-file-path-based-router-e5f7245a4925"
isUpdated: true
---

## 모든 현대 프레임워크에서 사용하는 기능, 왜 비밀로 유지해야합니까?

![image](/assets/img/2024-05-27-DemystifyingRoutingCreatingYourOwnfile-path-basedRouter_0.png)

대부분의 JavaScript 프레임워크가 채택하고 있는 한 가지 트렌드는 경로 기반 라우팅을 제공하는 것입니다. 이는 방문하려는 URL과 프로젝트 내의 특수 폴더 사이에 1:1 관계가 있다는 의미입니다. 이 특수 폴더에는 라우트 핸들러 함수들이 포함되어 있습니다.

즉, http://`호스트`/users/list를 방문한다면 users/list.js 파일(또는 사용자의 선호에 따라 users/list/index.js 내부에 있을 수도 있음) 내에 핸들러 함수가 있을 것입니다.

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

이것은 정말 멋진 기능이에요. Next, Fresh 또는 다른 프레임워크와 같이 당연하게 사용하는 기능 중 하나에요.

하지만, 저는 당연한 것을 싫어해요. 그래서 이 기능이 어떻게 작동하는지 역공학을 시도해 보겠어요.

Express를 사용하여 경로 기반 라우팅의 자체 버전을 구현하는 방법을 살펴보겠어요.

# 이 작업을 하는 이유?

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

거의 모든 현대 프레임워크에 깊게 자리한 기능을 명확히 설명하는 데 있어서 이것은 개발 경험을 향상시키는 매우 좋은 기능입니다. 이 형식은 라우트 핸들러를 설정하는 방법을 단순화하며 이전에 사용했던 단일 라우트 매핑 파일과 같은 하위 최적화 방법 대신 새로운 방식을 제공합니다.

이전에는 모든 라우트와 해당 핸들러 파일을 포함하는 단일 라우트 매핑 파일을 사용하여 해결책을 찾았습니다. 이런 식으로:

그것은 작은 앱과 몇 개의 라우트만 있는 경우 좋은 해결책이었습니다. 심지어 라우트 핸들러를 다른 위치에 저장할 수 있는 유연성을 가지고도 했습니다. 그러나 반면에 대규모 기업 애플리케이션을 작업 중이라면 이 파일 내에 수백 줄에 달하는 코드를 다뤄야 할 수도 있습니다. 아마도 짐작할 수 있겠지만, 그런 파일을 유지하는 것은 아무도 원치 않았고 그것에 버그를 추가하는 것은 너무 쉬웠습니다.

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

우리는 여기서 "구성보다 규약"을 사용하여 우리의 코드가 어떤 라우트를 처리하는지 정의하는 "더 간단한" 방법을 유지할 필요가 없게 되었어요. 이것은 또 다른 파일을 유지할 필요없이 코드의 어느 부분이 어떤 라우트를 처리하는지 정의하는 "더 단순한 방법"을 제공합니다. 이 부분을 유지하는 것이 승리라고 생각해요!

저는 이러한 유형의 기능이 개발자 경험(DX)을 향상시키기 때문에 정말 좋아해요.

물론, 이를 수행하는 것은 웹 프로젝트의 구조에 대해 많은 것을 결정할 수 있지만, 라우터를 직접 구축하는 경우에는 필요한 수정 사항을 정확히 필요한 대로 수행할 수도 있어요.

그럼 이 구현이 어떻게 보이는지 살펴봅시다.

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

# 우리만의 라우터 구현하기

이 예제에서는 ExpressJS를 사용할 것입니다. 하지만 ExpressJS의 기본 라우터를 사용하는 것은 말이 안 되기 때문에 사용하지 않을 것입니다. 대신에 웹 서버를 생성하는 과정을 좀 더 간단하게 추상화해주니까, 이것이 주된 목적은 아니지만 여러분들이 일을 더 쉽게 처리할 수 있게 해줄 겁니다.

우리가 만들고자 하는 라우터는 다음과 같은 구조를 다룰 수 있도록 하는 것이 목표입니다:

![라우터 구조](/assets/img/2024-05-27-DemystifyingRoutingCreatingYourOwnfile-path-basedRouter_1.png)

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

라우트 폴더의 내용을 확인해보세요:

- 우리는 앱의 주요 라우트에 해당해야 할 index.js 파일이 있습니다.
- 파일 이름을 사용하여 핸들러를 가질 수 있습니다. users.js는 /users로의 요청을 처리하고, books/index.js 파일은 /books로의 요청을 처리할 것입니다.
- /books/addresses URL을 처리하는 books/addresses/index.js와 같이 더 깊게 중첩된 라우트도 있습니다.
- 마지막으로, /books/[book].js 파일 덕분에 동적 라우트를 사용할 수도 있습니다. 해당 파일은 루트나 /books/addresses가 아닌 /books 내의 모든 경로를 처리할 것입니다.

총평하자면 매우 완벽한 구조이며, 보다시피, 동적 라우트를 처리하는 유일한 복잡한 로직이 있고, 나머지는 상당히 간단합니다.

## 파일 경로 기반 라우팅 추가하기

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

먼저 간단한 논리를 살펴봅시다: 동적 경로를 제외한 모든 것입니다.

ExpressJS를 설치한 후에는 all 메서드를 사용하여 catch-all 핸들러를 설정해 봅시다:

이 코드는 모든 라우트를 캐치하고(all 메서드 덕분) 모든 HTTP 동사를 다루고(\*/ 라우트 덕분) 있습니다.

이 핸들러에 의해 요청이 캐치될 때마다 URL을 가져와 routes 폴더 안에 .js 확장자가 있는 파일이 있는지 확인합니다. 파일이 없으면 폴더로 가정하고 해당 폴더 안에 있는 index.js 파일을 찾습니다.

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

해결되었으니, executeRoute 함수를 호출하고 결과 값을 얻겠습니다. 만약 false이면, 파일을 찾을 수 없어 실행에 실패한 것으로 간주하겠습니다. 그래서 그 오류를 "404 — 찾을 수 없음 응답"으로 변환하겠습니다.

이 퍼즐의 빠진 조각 executeRoute 함수는 다음과 같이 생겼습니다:

동적 import 함수를 사용하고 있는데, 찾고 있는 파일이 존재한다면 계속 진행하고 요청에 사용된 HTTP 동사를 얻습니다. 이렇게 하면 catch-all 핸들러인 handler(네, 정말 좋은 이름!)를 정의하거나 동사의 이름을 메서드 이름으로 사용할 수 있습니다. 정의하면 코드가 대신 사용하겠죠.

만약 import에 실패한다면(예외를 발생시킨다면) 그것은 가져올 파일이 없기 때문이며, 이는 해당 경로가 매핑되어 있지 않다는 의미입니다. 결과적으로 404 오류를 반환해야 합니다.

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

믿든지 말든지, 파일 경로 라우팅을 달성하는 데 거의 필요한 것이 전부입니다.

물론, 이전에 보여준 것처럼 동적 라우팅을 지원하려면 "약간"의 추가 코드가 필요합니다.

# 동적 라우팅 지원 추가

이제 URL에 따라 라우트 핸들러를 가져오는 방법을 알았으므로 executeRoute 함수가 false를 반환하는 시나리오에 대한 몇 가지 로직을 추가해야 합니다. 결국, 이는 라우트가 파일과 직접 매핑되지 않음을 의미하지만 "와일드카드" 파일을 지원하고자 하는 것이기도 합니다.

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

다음과 같은 로직을 추가하는 것이 좋습니다:

- 직접 매핑된 파일이 없다면, 우선 동적 매개변수의 이름과 값을 추출합니다.
- URL에서 이름을 제거하여 특수 파일이 있는 폴더를 이해합니다.
- 동적 매개변수의 이름을 대괄호로 묶어 새 파일의 이름을 만듭니다.
- 새 파일을 가져와서 executeRoute를 호출하려고 합니다.

다음 예시를 상상해보세요:

- 경로 /api/users/donald를 요청했습니다.
- 파일 /routes/api/users/donald.js 또는 /routes/api/users/donald/index.js를 찾았지만 그 안에 아무 것도 없습니다.
- 그래서 우리는 URL에서 "donald"를 제거하고, /routes/api/users 폴더 안에서 대괄호로 묶인 이름을 가진 파일을 찾아냅니다. 그리고 [user].js 파일을 찾습니다.
- 이제 동적 매개변수가 "user"라는 것과 그 값이 "donald"인 것을 알게 되었습니다.
- 이제 동적 파일을 가져와서 매개변수를 Request 객체에 추가하여 동적 핸들러가 그것을 사용할 수 있게 됩니다.

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

상기는 우리 서버의 전체 코드입니다. 이미 알고 있는 부분은 무시하셔도 괜찮지만, 58번 줄에 추가한 false 절 내부의 논리를 살펴보세요. 이미 설명한 내용을 따르고 있습니다.

파일 이름과 매개변수 이름의 결합을 “동적 핸들러”라고 부르며, URL에서 그것을 가져오는 함수를 작성했습니다.

상기 코드 상단에 있는 getDynamicHandler 함수는 “특별” 파일이 있어야 하는 폴더를 탐색합니다. 그 폴더 안의 모든 파일을 읽고, 이름에 괄호가 있는 파일을 찾습니다. 루트 당 하나의 동적 핸들러만 갖는 것이 합리적이므로, 한 번 찾으면 더 이상 찾지 않습니다.

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

정말 깔끔한 정규 표현식을 사용하면 파일 이름에서 대괄호로 둘러싸인 매개변수 이름도 캡처할 수 있어요.

이제 매개변수의 이름과 핸들러 코드를 포함한 파일 이름을 모두 반환할 수 있어요. 기억해요, 매개변수의 실제 값은 URL에서 직접 가져와요.

그게 바로 동적 라우터가 간단한 라우트, 다양한 HTTP 동사, 그리고 특별히 명명된 핸들러 파일을 사용하는 동적 라우트를 처리할 수 있게 한 거에요.

이 모든 것이 100줄 미만의 단일 파일 안에 포함되어 있답니다.

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

물론, 제 비슷한 실험들과 마찬가지로, 이것은 학습용 연습입니다. 이 코드를 제품 환경으로 가져가려면 조금 정리하는 것과 아마도 동적 요청마다 디스크에서 읽는 것을 피하기 위해 캐싱을 추가하는 것을 권장합니다. 마지막으로 유닛 테스트를 추가하는 것이 좋습니다.

그럼에도 불구하고, 이 글이 유용했기를 바라며, 이전에 자체 파일 경로 라우터를 작성한 경험이 있다면 댓글에 어떻게 했는지 알려주세요. 노트를 비교해보고 싶습니다!

# 레고와 같은 재사용 가능한 구성 요소로 앱 만들기

![이미지](/assets/img/2024-05-27-DemystifyingRoutingCreatingYourOwnfile-path-basedRouter_2.png)

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

비트의 오픈 소스 도구는 25만 명 이상의 개발자들이 컴포넌트로 앱을 빌드할 수 있도록 도와줍니다.

어떤 UI, 기능 또는 페이지든 재사용 가능한 컴포넌트로 변환하고, 여러 애플리케이션들 간에 공유하세요. 협업하고 더 빠르게 빌드하는 것이 더 쉬워집니다.

→ 더 알아보기

앱을 컴포넌트로 분할하여 앱 개발을 더 쉽게 만들고, 원하는 워크플로에 대해 최상의 경험을 즐기세요:

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

## → 마이크로 프론트엔드

## → 디자인 시스템

## → 코드 공유 및 재사용

## → 모노 레포(repository)

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

# 더 알아보기
