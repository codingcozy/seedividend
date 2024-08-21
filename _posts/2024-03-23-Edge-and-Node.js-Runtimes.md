---
title: "Nextjs 13의 nodejs 런타임 내용 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "에지와 노드js 실행 환경"
link: "undefined"
isUpdated: true
---

# 엣지 및 Node.js 런타임

Next.js의 맥락에서 런타임이란 실행 중에 코드에서 사용할 수 있는 라이브러리, API 및 일반 기능 세트를 의미합니다.

서버에서 사용되는 런타임에는 응용 프로그램 코드의 일부를 렌더링할 수 있는 두 가지 런타임이 있습니다:

- Node.js 런타임(기본값)은 모든 Node.js API 및 생태계에서 호환되는 패키지에 액세스할 수 있습니다.
- Edge 런타임은 Web API를 기반으로 합니다.

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

## 런타임 차이점

런타임을 선택할 때 고려해야 할 사항이 많습니다. 이 표는 주요 차이점을 한 눈에 쉽게 확인할 수 있습니다. 더 자세한 분석을 원하시면 아래 섹션을 확인해보세요.

|                                                                                                                                       | Node   | Serverless | Edge             |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------- | ---------------- |
| Cold Boot                                                                                                                             | /      | Normal     | Low              |
| [HTTP Streaming](/docs/app/building-your-application/routing/loading-ui-and-streaming)                                                | Yes    | Yes        | Yes              |
| IO                                                                                                                                    | All    | All        | `fetch`          |
| Scalability                                                                                                                           | /      | High       | Highest          |
| Security                                                                                                                              | Normal | High       | High             |
| Latency                                                                                                                               | Normal | Low        | Lowest           |
| npm Packages                                                                                                                          | All    | All        | A smaller subset |
| [Static Rendering](/docs/app/building-your-application/rendering/server-components#static-rendering-default)                          | Yes    | Yes        | No               |
| [Dynamic Rendering](/docs/app/building-your-application/rendering/server-components#dynamic-rendering)                                | Yes    | Yes        | Yes              |
| [Data Revalidation w/ `fetch`](/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) | Yes    | Yes        | Yes              |

### Edge 런타임

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

Next.js에서 경량 Edge Runtime은 사용 가능한 Node.js API의 하위 집합입니다.

Edge Runtime은 낮은 대기 시간으로 동적이고 개인화된 콘텐츠를 제공해야 하는 경우에 이상적입니다. Edge Runtime의 속도는 리소스를 최소한으로 사용하기 때문에 빠릅니다. 그러나 이는 여러 상황에서 제한적일 수 있습니다.

예를 들어, Vercel의 Edge Runtime에서 실행되는 코드는 1MB와 4MB 사이여야 합니다. 이 한계에는 가져온 패키지, 폰트 및 파일이 포함되며, 배포 인프라에 따라 달라집니다. 게다가 Edge Runtime은 모든 Node.js API를 지원하지 않으므로 일부 npm 패키지가 작동하지 않을 수 있습니다. 예를 들어, "모듈을 찾을 수 없음: `fs` 해결할 수 없음"과 같은 오류가 발생할 수 있습니다. 이런 API나 패키지를 사용해야 할 경우 Node.js Runtime을 사용하는 것을권장합니다.

### Node.js Runtime

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

Node.js 런타임을 사용하면 모든 Node.js API에 액세스할 수 있고 그에 의존하는 모든 npm 패키지에도 액세스할 수 있어요. 그러나 Edge 런타임을 사용하는 라우트에 비해 시작 속도가 느릴 수도 있어요.

Next.js 애플리케이션을 Node.js 서버에 배포하려면 인프라를 관리하고 확장하고 구성해야 합니다. 또는 Vercel과 같은 서버리스 플랫폼에 Next.js 애플리케이션을 배포하는 것을 고려할 수도 있어요. Vercel은 이 모든 것을 대신 다루어 줄 거에요.

### 서버리스 Node.js

서버리스는 Edge 런타임보다 복잡한 계산 부하를 처리할 수 있는 확장 가능한 솔루션이 필요한 경우에 이상적이에요. 예를 들어 Vercel의 서버리스 함수를 사용하면 가져온 패키지, 폰트, 파일을 포함해 전체 코드 크기가 50MB이에요.

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

Edge를 사용한 라우팅과 비교해서 Serverless Functions가 요청을 처리하기 전에 부팅하는 데 수백 밀리초가 걸릴 수 있다는 단점이 있습니다. 사이트가 받는 트래픽 양에 따라, 이는 함수가 자주 "워밍 업"되지 않기 때문에 빈번히 발생할 수 있습니다.

> Node.js 문서와 Edge 문서를 참조하여 사용 가능한 API의 전체 목록을 확인해주세요. 배포 인프라에 따라 런타임은 스트리밍도 지원할 수 있습니다.

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
