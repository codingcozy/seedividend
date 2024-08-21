---
title: "React Conf 2024에서 새롭게 소개된 내용들"
description: ""
coverImage: "/assets/img/2024-05-20-WhatsNewatReactConf2024_0.png"
date: 2024-05-20 21:45
ogImage:
  url: /assets/img/2024-05-20-WhatsNewatReactConf2024_0.png
tag: Tech
originalTitle: "What’s New at React Conf 2024"
link: "https://medium.com/gitconnected/whats-new-at-react-conf-2024-376e509a172b"
isUpdated: true
---

## 빠르게 따라잡는 빠른 안내서

![React Conf 2024](/assets/img/2024-05-20-WhatsNewatReactConf2024_0.png)

내 무료 뉴스레터에서 원본으로 작성되었습니다.

React 개발자들은 모두 2024년 5월 15일에 공식적으로 시작된 React Conf 2024에 집중하고 있습니다. 여기 8시간의 비디오 다시보기: [React Conf 2024 Video](링크).

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

아래는 제가 강조해야 한다고 생각하는 몇 가지 주요 사항을 빠르게 요약한 글입니다. 이를 통해 빠르게 최신 정보를 파악할 수 있습니다.

# React Router와 Remix의 통합

Remix가 React Router와 통합을 발표했습니다. 다가오는 React Router v7에서는 모든 Remix 기능이 포함될 것입니다. Remix 사용자는 import 문을 변경하면 됩니다:

```js
- import { Link } from `@remix-run/react`
+ import { Link } from `react-router`
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

리액트 라우터 사용자들을 위해, 이제 SSR, prefetching 또는 Vite 플러그인을 포함한 Remix 기능을 React 프로젝트에서 직접 사용할 수 있습니다.

![이미지](/assets/img/2024-05-20-WhatsNewatReactConf2024_1.png)

Remix는 항상 React Router 위에 있는 레이어에 불과했으며 시간이 지남에 따라 이 레이어가 줄어들고 있습니다. 이제 그 크기가 매우 작아져서 예정된 Remix v3 릴리스가 이제 React Router v7로 출시될 예정입니다.

사실 이렇게 말해도 될 것 같습니다:

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

<img src="/assets/img/2024-05-20-WhatsNewatReactConf2024_2.png" />

# React 19에서 새로운 기능 소개

여기에 빠르게 코드 중심의 요약이 있고, 좀 더 간략한 내용은 여기에 있습니다:

## Actions 기능

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

개선된 비동기 작업 및 상태 업데이트 처리를 위한 useTransition 및 useOptimistic과 같은 훅을 사용하여 suspense, 오류 처리 및 낙관적 업데이트의 관리를 간편화했습니다.

## 서버 구성 요소:

- 서버 구성 요소: React 19에서 공식적으로 서버 구성 요소 통합을 지원하며, 빌드 시간 이전에 구성 요소를 사전 렌더링하도록 허용하며, 빌드 시간 실행 및 실시간 요청 처리 두 가지 모드가 있습니다.
- 서버 액션: 클라이언트 측 구성 요소가 “use server” 지시어를 사용하여 서버에서 비동기 함수를 호출하고 실행할 수 있으며, 프레임워크가 서버 함수에 대한 참조를 생성합니다.

## 기능 최적화:

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

- Ref 로 속성 전달: ref를 함수 컴포넌트 인수로 직접 전달할 수 있어서 forwardRef가 필요하지 않게 되었습니다.
- 향상된 수분 공급 오류 보고: 클라이언트 측 렌더링이 서버 측 렌더링된 콘텐츠와 일치하지 않을 때 개선된 오류 보고로 더 명확한 오류 메시지를 제공합니다.
- 공급자 최적화: 기존의 'Context.Provider'가 필요하지 않도록 'Context'를 직접 공급자로 사용합니다.
- Ref 정리 함수: 컴포넌트가 언마운트될 때 정리를 처리하기 위해 ref 콜백 함수에서 정리 함수를 반환하는 지원이 추가되었습니다.
- useDeferredValue의 초기 값: 컴포넌트의 초기 렌더링에 값을 지정할 수 있습니다.
- 문서 메타데이터 지원: React를 사용하여 컴포넌트 내에서 'title', 'link', 'meta' 태그를 직접 정의하고 자동으로 이를 문서 'head'로 승격시켜 줍니다.
- 스타일시트 지원: 컴포넌트 트리 내에서 스타일시트를 관리하는 기능이 내장되어 있으며, 로딩 순서를 자동으로 처리합니다.
- 비동기 스크립트 지원: 컴포넌트 트리 어디에서든 비동기 스크립트를 렌더링하여 스크립트 관리를 간소화합니다.
- 리소스 프리로딩 지원: prefetchDNS, preconnect, preload, preinit과 같은 사전로드 API를 도입하여 리소스 로딩을 최적화합니다.
- 타사 스크립트 및 브라우저 익스텐션 호환성: 타사 스크립트 및 브라우저 익스텐션과의 호환성이 개선되었습니다.
- 더 나은 오류 보고: 오류 처리를 향상시키기 위한 다양한 옵션이 추가되었습니다.
- 사용자 정의 요소 지원 (웹 컴포넌트): 사용자 정의 요소에 대한 지원이 개선되었습니다.

# React 컴파일러

React 컴파일러인 Forget으로도 알려진 React 컴파일러가 이제 오픈 소스입니다. 여기에서 찾아볼 수 있습니다. Rust로 작성되었으며 React 19 베타 또는 온라인 Playground에서 사용해 볼 수 있습니다:

<img src="/assets/img/2024-05-20-WhatsNewatReactConf2024_3.png" />

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

개발자들에 미치는 영향은 useMemo, useCallback, React.memo API를 사용하여 수동으로 최적화를 할 필요가 없어졌다는 점입니다. 이는 현재 이에 한정되어 있으며 useEffect와 같은 의존성 규칙에는 영향을 미치지 않습니다. 현재도 여전히 React 훅 규칙 (예: 훅을 최상위 레벨에서만 호출하는 것과 같은)을 따라야 합니다.

컴파일러에 의해 최적화된 컴포넌트는 React Devtools (v5.0+)에서 "Memo ✨" 배지가 표시됩니다:

![Memo Badge](/assets/img/2024-05-20-WhatsNewatReactConf2024_4.png)

# 두 대의 컴퓨터를 위한 리액트

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

Dan Abramov가 React 클라이언트 컴포넌트와 서버 컴포넌트의 각각의 장점을 소개했고, 어떻게 선택해야 하는지에 대해 설명했습니다. 여기에 간략하게 정리해보겠습니다:

## 서버 사이드 컴포넌트의 장점

- 데이터 접근: 서버 사이드 컴포넌트는 서버의 데이터와 파일에 접근할 수 있어 데이터 집약적인 애플리케이션에 유용합니다.
- 데이터 전처리: 서버 사이드 컴포넌트는 데이터를 읽고 전처리한 후 클라이언트로 보내는데 유용합니다.
- 빌드 시 렌더링: 서버 사이드 컴포넌트는 빌드 시 실행하여 정적 UI를 생성할 수 있어 SEO 및 초기 로드 성능에 도움이 됩니다.
- 클라이언트 단순화: 서버에서 복잡한 데이터 로직을 처리함으로써 (UI = f(데이터)), 클라이언트 부담을 줄일 수 있으며, 클라이언트는 필요한 UI 데이터만 받아 보여줍니다.

## 클라이언트 사이드 컴포넌트의 장점:

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

- 즉시 피드백: 사용자가 UI와 상호 작용할 때(예: 버튼 클릭), 서버 응답을 기다리지 않고 즉시 피드백을 받을 수 있습니다.
- 서버 폴링 없음: 사용자 작업 중 일부(슬라이더 드래깅 또는 버튼 클릭 등)에 대해 서버로부터 추가 요청이나 데이터 다운로드가 필요하지 않습니다.
- 더 나은 사용자 경험: 직접적인 상호 작용 반응은 사용자 경험을 향상시켜 응용 프로그램이 더 반응적이고 부드러워지도록 합니다.
- 클라이언트 측 상태 사용: 컴포넌트는 클라이언트 측 상태(UI = f(상태))를 사용하여 매우 상호 작용적이고 반응성이 좋은 사용자 인터페이스를 구축할 수 있습니다.

# React Server Components in Expo Router

Expo Router는 React Native 및 웹 애플리케이션용 파일 기반 라우터입니다. 이를 통해 응용 프로그램의 화면 간 탐색을 관리하고 Android, iOS 및 웹과 같은 여러 플랫폼에서 사용자가 응용 프로그램 UI의 다른 부분을 매끄럽게 이동할 수 있도록 합니다.

서버 구성 요소의 장점은 클라이언트에 완전히 상호 작용적인 동적 UI를 전송할 수 있다는 것입니다. 이는 응용 프로그램이 다른 사용자 작업에 기반한 복잡한 UI 요소를 제공할 수 있음을 의미합니다.

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

# React 규칙 어기기

React에는 몇 가지 규칙이 있어요:

![React Rules](/assets/img/2024-05-20-WhatsNewatReactConf2024_5.png)

Charlotte은 이러한 규칙에 대한 이유를 논의하여 React의 내부 메커니즘을 더 깊이 이해하려고 합니다.

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

최근에 React 아래의 내부를 더 깊이 이해하기 위해 기사를 썼어요. 간소화된 Fiber 아키텍처와 동시 모드를 사용하여 렌더링 중에 메인 스레드를 차단하지 않도록 했죠. 여기서 이 지침을 어기면 안 되는 이유도 이해할 수 있어요.

# React 서버 구성 요소로 RedwoodJS

RedwoodJS는 포함된 배터리를 갖춘 또 다른 풀스택 JavaScript 애플리케이션 프레임워크에요. 주로 스타트업을 대상으로 하고 있습니다.

높은 수준에서, 이는 사용자 정의 GraphQL API와 통신하는 React 프런트엔드입니다. API는 데이터베이스와 상호 작용하기 위해 Prisma를 사용합니다. 기본 설정으로는 테스트에 Jest, 로깅에 Pino, UI 구성 요소 목록에 Storybook을 사용할 수 있어요. 인증(Auth0 같은) 또는 CSS 프레임워크(Tailwind CSS 같은) 설정은 명령줄 호출만으로도 간단하게 할 수 있어요. 게다가 Redwood의 아키텍처를 통해 서버리스 공급자(Netlify, Vercel 등) 또는 전통적인 서버 및 컨테이너 공급자(AWS, Render 등)로 배포할 수 있습니다.

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

# 결론

이것은 주로 웹 개발에 중점을 둔 Day 1에서의 최신 정보이다. Day 2는 React Native에 관한 것입니다.

가장 기대되는 것은 React 컴파일러입니다. 아직 실험 중이지만, 현재 제품에서 시도해보고 싶다면 피드백을 제공하는 것을 도와주기 위해 작업 그룹에 참여할 수 있습니다.

만약 이 글이 도움이 된다면, 더 많은 웹 개발 통찰력을 위해 구독을 고려해 주세요. 읽어 주셔서 감사합니다!
