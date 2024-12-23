---
title: "Nodejs 19가 출시, 새로운 기능 및 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-27-Nodejs19isOutHerearetheNewUpdates_0.png"
date: 2024-05-27 18:29
ogImage:
  url: /assets/img/2024-05-27-Nodejs19isOutHerearetheNewUpdates_0.png
tag: Tech
originalTitle: "Node.js 19 is Out! Here are the New Updates"
link: "https://medium.com/bitsrc/node-js-19-is-out-here-are-the-new-updates-291beb89ba7f"
isUpdated: true
---

## 노드 v19의 새로운 기능을 강조한 릴리스 노트의 친숙한 버전

![Node v19](/assets/img/2024-05-27-Nodejs19isOutHerearetheNewUpdates_0.png)

보통 런타임의 새 버전을 위한 릴리스 노트가 나오면, 사용자들로서는 꽤 내부적이고 투명한 부분들에 대한 업데이트가 많이 포함되어 있습니다.

그러나 Node.js 19의 릴리스 노트에서는 세부적으로 살펴보지 않는다면 발표 공지에서 놓칠 수 있는 흥미로운 정보가 몇 가지 있습니다.

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

그럼 이제 우리가 가장 기대되는 것들을 살펴보겠습니다. 우리가 좋아하는 JavaScript 런타임의 버전 19에서 발표된 변경 사항 중에서 어떤 것들이 있는지요?

# 이제 WATCH 플래그가 있습니다

비록 실험적인 모드에 있지만, 적어도 워치 플래그의 초석이 있다고 말할 수 있습니다. 이것이 의미하는 바가 무엇인가요? Node가 Deno 팀에서 몇 가지 아이디어를 천천히 받아들이고 있는 것일까요?

Deno가 CLI를 설계할 때 Node와 다른 접근 방식을 취했습니다. 그들의 사용자들에게 스크립트를 실행하는 간소화된 방법을 제공하는 대신에, Deno 팀은 모든 필요한 것을 단일 실행 파일로 제공합니다.

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

이는 파일 감시자, 테스트 러너, 코드 포멧터 등을 의미합니다. 지난 10년간 노드가 수행해온 것과는 확실히 다른 접근 방식이지만 작동하는 것으로 보입니다. Deno 개발자들과 대화를 나눈 후, 이 도구들이 한 곳에서 제공된다는 매력을 느낄 수 있었습니다.

그러니까, 이것이 자체 CLI 도구로 커뮤니티에 의해 개발된 다양한 도구들을 통합하는 과정에서 한 발자국 중 하나라고 안전하게 말할 수 있을까요?

확실한 것은 말할 수 없습니다. 비슷한 접근 방식을 살펴볼 수 있지만, 한 번에 한 번 일어날 수도 있습니다.

특히 이 플래그는 흥미롭습니다. 기본적으로 진입점 파일과 필요한 또는 가져온 종속성을 모두 감시합니다. 특정 폴더에서 변경 사항을 감시하려면(구성 파일 변경 사항을 감시하는 것과 유사한지 상정합니다), 실험 단계에 있는 watch-path 플래그를 명시해야 합니다.

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

지금은 "감시 모드"에서 변경이 감지되면 Node.js 프로세스가 다시 시작될 뿐, 할 일이 많지 않아요.

제가 잘못 이해시킨게 아니에요. 이미 많은 일을 하는 것이긴 하지만, 이벤트에 연결하여 추가적인 흥미로운 작업을 수행할 수 있다면 더 좋을 것 같아요.

그래도 아쉽네요. 아마 다음 버전에는 가능할지도 몰라요!

# 사용자 정의 ESM 해상도 조정 (이것을 빠트리지 마세요!)

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

이 제목을 보고 나는 처음에 그냥 내부 플래그가 제거된 것 같다고 생각해서 건너뛰었어요. 정말 별로 관심이 없었거든요.

그러다가 몇 가지 링크를 따라가서 이 변화가 어떤 것인지 읽어봤어요.

사실 이름이 Node.js 핵심 개발자가 아니라면 약간 암호적일 수도 있지만, 기능은 그렇지 않아요. Node에서 파일을 이렇게 require 해본 적이 몇 번이나 있었나요?

```javascript
const myPkg = require("./folder/file");
```

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

폴더에 확장자가 없다는 점에 주목하세요. 노드는 포기하기 전에 여러 가지 대안을 찾기 때문에 확장자를 생략한 것입니다.

또는 이렇게 폴더를 직접 참조할 수도 있어요:

```javascript
const myPkg = require("./my-folder");
```

이 폴더 안에 index.js 파일이 있다면 동작할 거예요. 노드가 자동으로 해당 파일을 찾아줄 거에요.

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

하지만 동일한 패키지를 가져오려고 시도하면 그렇지 않습니다. 노드의 "ESM specifier resolution"은 해당 추가 동작을 지원하지 않습니다. 올바른 확장명을 직접 지정하지 않는다면 파일을 찾을 수 없습니다.

--experimental-specifier-resolution=node 플래그를 사용하여 CommonJS 동작을 모방할 수 있습니다. 하지만 그렇다고 해도 이것은 "실험적"인 단어가 들어간 긴 지저분한 플래그입니다. 사용자들에게 이것이 실행해도 안전하다고 설득하는 데 행운을 빕니다!

다행히도 이제 Node.js 19에서는 이 문제가 더 이상 발생하지 않습니다. 새로운 로더로 이와 같은 작업을 수행할 수 있습니다:

import file from `./file` // "file"에 올바른 확장명이 있으면 동작합니다

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

아니요

import myFile from `./폴더` //만약 "폴더" 안에 "index.js"가 있다면

보셨나요? 이 업데이트의 이름 때문에 다른 걸로 생각할 수도 있겠지만, 실제로는 매우 좋고 환영받는 개선 사항이죠.

읽은 내용이 마음에 드셨나요? IT 산업에서 2 10년 간의 지혜를 모두와 공유하는 무료 뉴스레터를 구독해 보세요. “늙은 개발자의 혼잣말”에 가입해 보세요!

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

# 우리는 V8의 새 버전을 사용 중입니다

우리는 10.2 버전에서 10.7 버전으로 넘어갔어요

누가 관심 있겠어요?

하지만 당신도 모를까봐요! 이번에 이루어진 이 업데이트는 Node.js가 런타임의 최신 릴리스를 사용하도록 유지시키고 우리가 뒤쳐지지 않게 하는 것 외에도, 특정 버전이 ECMAScript의 Stage 3 제안으로부터 새로운 업데이트를 소개하게 됐다는 사실이요: Intl.numberFormat API의 업데이트입니다.

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

언어의 새로운 기능을 사용해볼 때 항상 흥분되는데요, 특히 프로젝트에서 숫자를 다루는 경우에는 이 기능이 매우 흥미로울 거에요.

기존 메소드들의 정밀도가 향상되고 새로운 형식 옵션이 추가되는 등 여러 가지 면에서 이 기능은 매우 흥미로운 것들을 제공해줍니다. 아직은 공식적인 3단계 단계에 있지만, 이 제안은 이미 Node의 최신 버전을 이용하여 시도하고 테스트할 수 있으니 한 번 시도해보세요!

# DTrace/SystemTap/ETW 지원이 사라지고 있어요

알지 못하셨다면, DTrace, SystemTap 및 ETW는 각각 다른 OS에서 작동하는 프로파일링 도구이며, Node.js 팀 내부에서 런타임이 모두와 호환되도록 유지되고 작동할 수 있도록 노력했습니다.

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

이제 이 외부 도구를 사용하여 프로필을 만들고 Node.js 기반 코드가 다른 상황에서 어떻게 실행되는지 이해할 수 있게 되었습니다.

하지만 발표에 따르면, 이러한 도구를 유지하고 업데이트하는 노력은 노드 사용자들에게 가져다 주는 이익 대비 너무 컸던 것 같아요.

그래서 이 도구들은 더 이상 지원되지 않게 되었습니다.

과거에 이를 활용하셨나요? 이제는 어떻게 할 건가요?

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

다른 업데이트도 공지를 확인하면 찾을 수 있어요, 그런데 솔직히 이것들이 제 눈길을 사로잡았어요. 특히 조금 더 파헤쳐봐야 이해할 수 있는 부분들이요.

Node.js 19의 변경 사항에 대해 기대되시나요? 어떻게 당신에게 영향을 미치는지 댓글로 남겨주세요! 다른 분들이 Node를 어떻게 사용하는지 읽어보는 건 항상 기쁘답니다!

# 레고처럼 재사용 가능한 컴포넌트로 앱을 제작하세요

![Node.js 19 업데이트 이미지](/assets/img/2024-05-27-Nodejs19isOutHerearetheNewUpdates_1.png)

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

Bit의 오픈 소스 도구는 25만 명 이상의 개발자들이 구성 요소를 활용하여 앱을 구축할 수 있도록 도와줍니다.

모든 UI, 기능 또는 페이지를 재사용 가능한 구성 요소로 변환하고 애플리케이션 전체에 공유할 수 있습니다. 협업하고 더 빠르게 개발하는 것이 더 쉬워집니다.

→ 더 알아보기

앱을 구성 요소로 분할하여 앱 개발을 더 쉽게 만들고 원하는 작업 흐름에 대한 최상의 경험을 누릴 수 있습니다:

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
