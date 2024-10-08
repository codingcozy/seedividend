---
title: "Remix를 Vite로 이전하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Migrating Remix to Vite"
link: "https://medium.com/@fernandoabolafio/migrating-remix-to-vite-0fc96c183f2d"
isUpdated: true
---

도전, 배운 점 및 스크립트 - 아직 끝나지 않았어요 😰

Growblocks에서는 여전히 Remix 애플리케이션을 Vite로 마이그레이션 중입니다. 쉽지 않았지만 열심히 싸우고 있어요.

![이미지](/assets/img/MigratingRemixtoVite_0.png)

# 약간의 배경

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

저희 Remix 애플리케이션은 약 2.5년 정도 된 앱이에요. 때문에 이 동안 프레임워크의 많은 변화(양성)를 경험했고 이겨냈어요.

이 앱으로 여러 고객을 서비스하고 여러 명의 개발자가 작업하고 있어요. 전반적으로 저희는 선택에 만족하며 후회하지 않아요.

하지만 새로운 프레임워크를 사용하면 초기 큰 변화를 겪는 것이 단점 중 하나에요. 그것이 바로 Vite Migration에 뛰어들게 된 이유예요.

# Remix meets Vite

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

2023년 10월, Remix는 공식적으로 Vite의 불안정한 지원을 발표했어요. 링크에서 전문 기사를 읽어볼 수 있지만, 그 이유는 다음과 같아요:

Remix는 빠른 개발, 풍부한 플러그인 생태계 및 개선된 속도를 위해 Vite로 이전 중이에요. 10배 빠른 HMR 및 5배 빠른 HDR과 같은 기능을 통해 Vite의 설계는 Remix가 Vite 플러그인으로 전환할 수 있게 하여 개발 프로세스를 단순화하고 있어요. 이 전략적인 이동은 Remix 사용자들에게 효율성과 유연성을 향상시키며, 웹 개발의 큰 한 발짝을 나아가게 되었어요.

# 이제 이주해 보세요

![이미지](https://miro.medium.com/v2/resize:fit:960/1*D1PiCt9inwoJukLgDBjVig.gif)

2024년 2월로 시간이 흘러보면, Vite는 이제 Remix의 눈에 안정화된 상태로 떠올랐어요 🎉.

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

거의 동시에 커뮤니티에서 좋은 Remix 저장소의 주요 참조 중 하나인 Epic Stack이 Vite로 이전했습니다. 그리고 꽤 간단해 보였어요.

그래서 우리는 "한번 시도해보자"라고 말했어요. 잘 될 거예요.

이제 거의 한 달이 지났어요. 솔직히 말해서, 이 마이그레이션에 많은 시간을 투자하지는 않았지만 원활한 진행은 아니었어요.

# 마주한 문제들

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

이전 가이드는 명확해서 분명하지만, 새 프레임워크에서 레거시 같은 프로젝트만이 가질 수 있는 어렵고 숨겨진 문제에 대해서만 다뤄볼 거에요. 네, 이상하게 들리죠?

## 요청한 모듈 ‘/app/root.tsx’은 ‘default’라는 이름의 내보낼 항목을 제공하지 않습니다

이런 건 우리가 가장 숨겨진 💩 한 가지에요.

우리는 브라우저에서 이 이상한 오류를 계속해서 받았어요; JS가 로드될 때마다, 이 메시지가 표시되면서 실행되지 않았어요. 내보내기 줄조차 지정되지 않을 뿐더러 루트 파일의 임의의 위치를 가리키는 것이었어요.

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

우리는 상상할 수 있는 모든 디버깅 방법을 시도해봤어요. 우리의 첫 의심거리는 서버와 클라이언트 코드의 잘못된 분리였는데, Vite에서는 절대로 그런 방식으로 처리할 수 없어요.

바로 이때 갑자기 기적이 일어났어요:

vite-plugin-inspect 덕분에 remix-react-refresh-babel에 의해 처리된 코드의 vite 처리 과정에 문제가 있음을 관찰했어요

![이미지](/assets/img/MigratingRemixtoVite_2.png)

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

제 생각 속에 그게 있었고, 그런 다음에 우리의 epic-stack 브라우저 코드의 루트 파일에서 나오는 익스포트를 비교해 보았어요.

음, 꽤 다른 것들이었어요. 그래서, 어떤 일이 일어났던 것 같아요.

거기서 우리의 jest가 TypeScript를 처리하는 데 사용된 babel.config.json 파일을 쉽게 알아냈어요.

해결책: babel 파일을 삭제하세요. ✅ 😮‍💨

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

## 서버 및 클라이언트 코드 분리

예상대로, 저희 코드베이스 대부분이 Vite의 서버 및 클라이언트 코드 분리 기대에 맞지 않았습니다. 먼저 해결해야 할 큰 문제가 두 가지 있었습니다:

rmx-cli 종속성 제거

우리는 rmx-cli를 사용하여 모든 remix 패키지를 한 번에 내보내는 단일 remix 파일을 생성했습니다. @remix-run/node, @remix-run/react, remix-typedjson 등에서 이 파일을 불러오는 방식을 오랜 시간 전에 선택했고 당시에는 필요한 목적을 잘 수행했습니다. 그러나 이 파일에서 모든 것을 불러오는 것은 모든 곳에서 @remix-run/node의 서버 코드를 로드하는 것을 의미했습니다. 따라서 이를 되돌리고 원래 패키지에서 직접 불러와야 했습니다.

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

해당 작업을 위해 다음 스크립트를 작성했어요.
다음과 같은 작업을 수행했습니다:

![Migrating Remix to Vite](/assets/img/MigratingRemixtoVite_3.png)

해결책: 모든 임포트를 되돌리고 rmx-cli 종속성을 제거하는 스크립트를 작성했어요.

어디서든지 임포트 유형

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

서버 코드를 클라이언트에서 더 이상 불러오지 않도록 하기 위해 일관된 형식의 linter rule인 consistent-type-imports를 추가했어요. 이를 통해 모듈을 가져올 때 type이 필요한 경우 접두사로 사용하도록 강제합니다. 이는 Vite와 같은 번들러가 세이킹 프로세스 중에 해당 모듈을 가져옵니다. 여기서 모듈이 type만 가져올 때에는 해당 모듈을 삭제할 수 있습니다. 이외에도 다른 이점이 있습니다. 자세한 내용은 여기에서 읽을 수 있어요.

그래서 이 문제를 해결하기 위해 이 linter rule을 추가했고 코드 전반에 걸쳐 모든 문제를 수정했어요. ✅

# 다음 단계

아직 끝나지 않았어요. HMR이 제대로 작동하지 않고 클라이언트에서 많은 JS 코드가 다운로드되는 것을 볼 수 있어요. 이제 Babel 구성이 사라졌으니 Jest를 고쳐야 해요. 하지만 이 모든 것들이 여기 나열된 것보다 달성 가능해 보이네요. 그래서 현재로서는 미래가 밝아 보입니다.

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

Remix가 우리에게 많은 도움을 주었고, 이 초기 프레임워크 이주에서 많은 공로가 있다는 것을 인정해야 합니다. 솔직히 최선의 선택이었습니다. Remix 팀은 훌륭한 일을 해 왔고 우리는 그것에 감사합니다. 결국에는 Vitest를 실행할 때 더 빠른 빌드 시간과 테스트 실행으로 만족할 것이라 확신합니다.

현대 웹 스택을 다루는 것은 상당히 어려울 수 있습니다, 특히 번들러에 관해 이야기할 때. 예측할 수 없는 프로세스로 때때로 꽤 복잡할 수 있지만, 이러한 도전에 뛰어들고 그것으로부터 배우는 것이 중요합니다. 고통스러운 경험이 될 수 있지만, 프레임워크와 애플리케이션의 성장을 위해서는 필수적입니다.
