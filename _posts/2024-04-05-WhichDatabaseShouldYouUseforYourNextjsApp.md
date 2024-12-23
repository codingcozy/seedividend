---
title: "Nextjs 앱의 데이터베이스를 고르는 기준"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Which Database Should You Use for Your Nextjs App"
link: "https://medium.com/javascript-in-plain-english/which-database-should-you-use-for-your-next-js-app-f667e63677ce"
isUpdated: true
---

## 포스트그레SQL, 파우나, 몽고디비, WunderBase. 선택할 수 있는 옵션이 많습니다. 성능, 가격, 확장성 및 개발자 경험을 기준으로 적절한 데이터베이스를 선택하는 방법은 무엇인가요?

![이미지](/assets/img/WhichDatabaseShouldYouUseforYourNextjsApp_0.png)

2022년에 풀스택 앱을 개발 중이라면, 인기 있는 선택인 Next.js를 사용하는 것이 좋습니다. 이는 ~95% 정도까지 원하는 방향으로 나아갈 수 있으며, 상당히 좋은 개발자 경험을 제공합니다. Next.js는 하이브리드 정적 및 서버 사이드 렌더링을 사용하여 좋은 결과를 보여주며, UI, 인증 및 필요한 모든 것에 대해 항상 서드파티 라이브러리를 추가할 수 있습니다.

하지만 아직 끝나지 않았습니다.

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

간단한 ToDo 앱조차도 정보를 지속시키기 위해 데이터베이스가 필요하며, 프로젝트에 알맞은 데이터베이스를 선택하는 것은 여러 변수에 따라 다를 것입니다. 가장 인기 있는 선택만 하는 것이 오히려 앱의 성능과 성장을 방해할 수도 있습니다.

그렇다면 어떤 데이터베이스를 선택해야 할까요?

내 능력을 총동원하여 일부 옵션들을 설명하고, 시작하는 방법 그리고 가장 중요한 것은 무엇이 실제로 개발자로서 사용하는 데 어떤지에 대해 알아볼게요.

# 1. PostgreSQL

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

## PostgreSQL이란?

네, 웹 개발 세계의 바닐라 아이스크림이죠.

1996년부터 있는 무료이자 오픈 소스인 엔터프라이즈급 관계형 데이터베이스로, 세계에서 가장 신뢰할 수 있고 성능이 우수한 RDBMS로 평가되며, JSON(비관계형)과 SQL(관계형) 데이터를 모두 지원합니다.

## 시작하는 방법은 무엇인가요?

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

만약 이미 서버를 소유하고 있다면, 아마도 거기에서도 포스트그레스를 실행할 수 있을 거예요 - 대부분의 호스트는 제1티어부터 포스트그레SQL을 제공합니다.

## 개발 경험은 어떨까요?

저는 거의 모든 사양의 상자에서 포스트그레스를 잘 실행했고, 설정하는 것도 간단했어요. 운영 측면에서 복잡하고 성능 문제가 많을까요? 그럼 맞아요. 하지만 문제는 결코 버그가 아니며, 만약 어려움이 생긴다면 온라인에서 해결 방법을 찾을 수 있을 거예요. 포스트그레스 오픈 소스 커뮤니티는 경험이 풍부하고 헌신적이며 열정적입니다.

## 개발을 위해 알아야 할 것들

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

장점

- 동시성을 갖춘 뛰어난 성능과 방대한 기능 세트(임의의 JSON 필드에서 JOIN을 수행할 수 있습니다... 즉 REST API 데이터에서 작동하는 추출-변환-로드 루프를 완전히 데이터베이스에서 수행할 수 있습니다! 얼마나 멋진가요 ?!)
- CRUD 애플리케이션을 넘어 구체적인 요구에 대해(예: 재귀 쿼리, 윈도우 함수, 부분 인덱스, 확장 가능한 데이터 유형) 더 좋은 선택지는 없습니다.
- 훌륭한 문서

단점

- 정확히 필요한 데이터를 받는 최적화된 쿼리를 작성하는 것이 중요합니다.
- 연결 당 하나의 프로세스 아키텍처는 TCP 연결을 유지하는 것이 비용이 많이 드는 작업이 됨을 의미합니다(postgREST 서버를 사용하여 REST API를 생성합니다)
- EC2와 같은 곳에 직접 Postgres를 호스팅하는 것은 곧 너무 비실시될 것입니다.

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

# 서버리스 데이터베이스

## 서버리스 데이터베이스란 무엇인가요?

만일 PostgreSQL 같은 완전한 RDBMS가 혼란스럽거나 비용이 부담된다면, 관리되는 서버리스 데이터베이스를 서비스로 제공받는 것이 당신에게 맞을 수 있습니다. 이러한 관계형 데이터베이스는 요구 사항의 변동에 대응하기 위한 자동 확장 및 보장된 운영 시간 + 내결함성을 제공해줍니다. 당신이 해야 할 일은 코드를 가져오는 것뿐이며, 지불해야 하는 것도 당신이 사용한 만큼입니다.

## 시작하는 방법은 무엇인가요?

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

모든 것은 이 How-to와 같아요. 가입하고, 요금제를 선택하고 (모두 무료 티어가 있어요), 데이터베이스를 프로비저닝하고, 연결 문자열을 가져오면 끝이죠.

그럼 이만큼 하고, 서버리스 데이터베이스 몇 가지에 대해 이야기해봅시다.

## WunderBase란 무엇인가요?

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

정말이지? 모든 데이터베이스 요구 사항에 대한 '쉬운 모드'입니다. 여기 TL;DR입니다:

- 무료이며 오픈 소스인 서버리스 SQLite(!) 데이터베이스,
- ...스키마를 사용한 이므스마 ORM을 사용한 마이그레이션,
- ... GraphQL API(따라서 실시간 구독 기능을 기본 제공받음),
- ... REST API가 탑재된 Fly Machine( Firecracker VM)에서 실행됨,
- ... 네트워크 요청을 받았을 때 Golang으로 작성된 우아하고 가벼운 프록시를 통해 VM을 시작하고, 마지막 요청 후 10초(설정 가능) 자동으로 종료됩니다.

## 어떻게 시작하나요?

매우 간단합니다. 볼륨이 연결된 fly.io 머신에 Docker 이미지를 배포하거나 여기에서 가져와야 할 겁니다. 로컬에서 사용해보는 방법은 여기에서 확인할 수 있습니다.

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

WunderBase는 GraphQL API를 제공하지만 공개하는 것은 보안/성능 문제가 될 수 있습니다. 대신 API 게이트웨이를 사용하세요. (이전에 언급한 대로, 동일한 개발자가 만든 Wundergraph는 완벽하게 작동합니다.)

## DevEx는 어떤가요?

우선 솔직히 말하자면, SQLite를 사용한 풀스택 개발에 대해 약간 회의적이었습니다. 그러나 WunderBase를 시도해보고 LiteStream 제작자인 @benbjohnson의 이 기사를 읽은 후로 마음이 바뀌었습니다. 대부분의 웹 앱은 쓰기보다 읽기에 더 중점을 두기 때문에 SQLite - 그에 따라 WunderBase도 손에 잘 맞고 독자적이며 Zero 구성 및 프로세스 내 SQL "서버"로 실행됩니다.

WunderBase는 아이디어 프로토타입 작성이나 개인 주말 프로젝트를 (드디어!) 구현할 때 훌륭하다는 것을 발견했습니다. 로컬 및 프로덕션 환경 모두 빠르고 쉽게 설정할 수 있습니다. (스토리지 요구: 1GB; 저 트래픽 용)

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

가장 흥미로운 점은 WunderBase가 Fly Machines + SQLite의 유일한 실제 '서버리스' 데이터베이스를 활용하는 방식입니다. 거의 모든 서버리스 관계형 DB는 사용하지 않아도 최소 월별 비용이 발생하지만 SQLite 데이터베이스는 볼륨에있는 이진 파일일 뿐이므로, 요청을 처리하지 않을 때 Fly.io VM을 단순히 종료함으로써 WunderBase를 0으로 확장 할 수 있습니다. 비용은 항상 고려해야 할 요소이며, 이 방법으로 Wunderbase를 지원하는 앱을 가능한 한 무료로 유지할 수 있습니다.

## 개발에 필요한 사항

장점

- 빨리 설정할 수 있음; 읽는 횟수가 쓰는 횟수보다 몇 배 많이 필요한 사용 사례에 특화되어 있습니다.
- fly.io의 Firecracker VM에서 실행되므로 TCP 연결을 유지하는 대신 상태가 없는 HTTP를 다루게됩니다. 세계 각지의 여러 엣지 위치에 WunderBase를 지원하는 앱을 배포할 수 있어 응답 시간이 `100 ms로 최적화됩니다.
- 실제로 0으로 확장 가능합니다 — fly.io의 가격은 사용하지 않는 경우 아무것도 지불할 필요가 없습니다.
- 네이티브 GraphQL API.
- Wunderbase는 Prisma를 ORM으로 사용하므로 prisma.schema 파일을 수정하여 SQLite를 다른 관계형 DB로 교체할 수 있습니다.

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

단점

- SQLite의 단일 작성자-다중 독자 모델은 여러 사용자가 상호 작용하고 변경을 수행하는 웹앱에 이상적이지 않습니다.
- 데이터 양이 많거나 고 트래픽을 필요로하는 경우 저렴하지 않게 될 수 있습니다.
- 아직 기본 백업이 없지만, 항상 LiteStream을 사용하여 SQLite 변경 사항을 AWS S3, Azure Blob Storage, Google Cloud Storage, SFTP 또는 NFS로 스트리밍할 수 있습니다.

# 3. 플래닛스케일

PlanetScale은 MySQL을 사용한 관계형 데이터베이스로, YouTube가 샤딩을 통해 확장하기 위해 Vitess(유튜브도 사용)를 안전하게 사용하며, 데이터베이스 브랜칭이라고 불리는 혁신적인 기술을 활용합니다. Git 스타일의 브랜치와 머지를 스키마 마이그레이션에 적용합니다. MySQL 대 PostgreSQL 논쟁에 대해 너무 걱정하지 마세요 : 둘 다 잘 수행될 것입니다.

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

## 개발 경험이 어떤가요?

개발자로서 PlanetScale의 중요한 기능은 분기 기능입니다. 데이터베이스를 코드처럼 다룰 수 있어서 변경하고 기능/테스트 분기를 만들고 코드처럼 롤아웃할 수 있다면, 제 주목을 끕니다. 처음에는 머리가 조금 아프겠지만, Git 워크플로우를 사용해본 적이 있다면 빠르게 익숙해질 것입니다.

외래 키 제약이 없다는 것은 놀라웠고 제한적이었습니다. 하지만 이를 해결하기 위한 안내서는 있었습니다. 더 큰 문제는 TCP 연결만 가능하다는 것이었고, PlanetScale이 MySQL이기 때문에 postgREST를 사용하여 RESTful API를 생성할 수 없었던 점이 아쉬웠습니다.

## 개발을 위해 알아야 할 사항

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

장점

- 매우 성능이 우수하고 매우 탄력적입니다. 앱 코드에 집중하고 확장에 대해 걱정하지 않아도 됩니다.
- 분기 메커니즘을 통해 스키마를 버전 관리하는 것이 코드를 관리하는 것과 직관적이었습니다.

단점

- 외래 키가 없습니다. 아예 없어요.
- TCP 연결만 지원되어 Cloudflare Workers/Vercel Edge 플랫폼에서 사용할 수 없습니다.
- 한정된 무료 티어를 넘어서면 매달 최소 요금이 청구되는데, 읽기/쓰기 작업을 하지 않는 경우에도요.

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

# 4. 생태계

Fauna는 SQL(관계형 모델링)과 NoSQL(유연성, 속도) 세계의 장점을 모두 제공하려는 분산 문서 관계형 데이터베이스입니다. 기본적으로 GraphQL을 제공하며 복잡한 조건부 트랜잭션/읽기를 한 번에 처리할 수 있는 프로프리터리 쿼리 언어인 FQL도 제공합니다.

## DevEx는 어떤가요?

FQL 자체(특정 언어의 DSL)는 제가 사랑했던 RethinkDB를 떠올리게 했지만, Fauna에서 가장 흥미로운 점은 지리적으로 분산된 데이터베이스라는 점이었습니다. 데이터를 자동으로 분할 및 여러 지역에 분산할 수 있어 내 앱이 있는 곳과 사용자들이 가장 가까울 수 있게 데이터를 설정할 수 있었습니다. Vercel과 Netlify의 서버리스/엣지 시대에 딱 맞는 솔루션입니다.

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

전체적으로 함께 작업하는 데 매우 즐거운 경험이지만, 여전히 쿼리를 작성하는 사람의 관점에서 보면, 표준 SQL을 사용하지 않기 때문에 초록밭 프로젝트가 아닌 곳에 통합하는 데는 두 번 생각해야 할 것 같아요.

## 개발 시 알아야 할 사항

먼저: Fauna는 기본 GraphQL API를 제공하지만, 클라이언트에 직접 노출한다면 성능/보안 측면에서 좋지 않은 아이디어일 수 있습니다. 대신 API 게이트웨이와 함께 사용하세요. (Wundergraph와 같은 것이 잘 작동하며, 모든 RDBMS, PlanetScale, Fauna, MongoDB 등과 아주 잘 맞습니다.)

장점

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

- Fauna는 네이티브 GraphQL API를 제공하여 JAMStack 개발자에게 좋은 선택지입니다. 많은 SSGs가 GraphQL을 데이터 레이어로 사용하기 때문에 (Gatsby, RedwoodJS)
- 분산 데이터베이스와 Vercel 및 Netlify에 대한 네이티브 통합으로 Fauna는 서버리스 / 엣지 시대에 데이터베이스를 쉽게 처리할 수 있게 해줍니다.

단점

- 이미 SQL을 사용하고 있는 프로젝트라면 Fauna의 고유한 쿼리 언어인 FQL(그리고 GraphQL 옵션)을 사용하기 때문에 통합이 어려울 수 있습니다. 하지만 WunderGraph를 사용하면 모든 데이터 소스를 단일 가상 그래프 레이어로 통합하여 클라이언트 측에서 안전하고 유형 안전한 JSON-over-RPC API를 통해 액세스할 수 있습니다.
- 또한, 무료 티어 이상의 월간 최소 요금이 있습니다.

# 5. SupaBase

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

SupaBase는 "오픈 소스 Firebase 대안"을 지향하며, 데이터 스토어로는 Postgres, RESTful API를 위한 postgREST, 인증을 위한 GoTrue(Netlify에서 제공) 등이 포함된 개발 도구 세트입니다. 또한, 웹소켓을 통한 실시간 업데이트를 위한 오픈 소스 서버, S3 호환 객체 스토리지, 그리고 Deno 서버를 통한 엣지 함수도 제공되며, 통합 대시보드를 통해 편리하게 사용할 수 있습니다.

## 개발 경험은 어떤가요?

Firebase 대안으로서 잘 작동하지만, 기능적으로는 아직 약간 부족하며, Firebase와 SupaBase 데이터 간에는 교차 호환성이 없습니다. 내장 REST API는 매우 유용하며, 대부분의 작업을 Vercel/Netlify에 호스팅하기 때문에 저에게 적합합니다.

하지만, JS 클라이언트에서 타입 안전성에 대한 문제가 있습니다. 스키마에서 타입을 생성하기 위해서는 제3자 CLI 도구가 필요합니다. 내장 형식 생성이 나올 때까지, Prisma + tRPC와 함께 사용하여 엔드 투 엔드 타입 안전성을 보장하겠습니다.

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

## 개발에 대해 알아야 할 사항

장점

- 데이터베이스 이외에도 많은 기능을 제공합니다.
- postgREST를 사용하여 RESTful API를 제공하며, 서버리스/클라우드 함수에서 SupaBase를 사용하고 싶다면 매우 유용합니다.
- 현재는 조금 복잡하지만, 자체 호스팅이 가능합니다. (문서가 명확하지 않음)

단점

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

- 유형 안전성이 문제가 될 수 있습니다. (향후 v2 클라이언트와 함께 더 나을 수도 있음)
- 다시 한 번, 한정된 무료 티어 이상의 최소 월별 요금이 있습니다.

## MongoDB

### 몽고디비란 무엇인가요?

대부분의 사람들에게는 사실상 NoSQL 옵션인 MERN 스택은 대부분의 사람들이 웹 개발을 시작하는 방법입니다. 만능적인 M(MongoDB)은 테이블 간 관계 대신 JSON 문서로 데이터를 저장하는 크로스 플랫폼, 소스 이용 가능한\* 데이터베이스입니다.

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

## 어떻게 시작하나요?

VPS에서 직접 호스팅하거나 관리형 MongoDB Atlas 옵션을 선택하세요.

## DevEx는 어떤가요?

몇 년 동안 MongoDB를 사용해온 경험이 있지만, 실제로 데이터가 항상 CSV 파일로 표현될 수 있다고 확신한다면 관계형 데이터베이스보다 빠릅니다. 추가 기능이 필요하다면 이론적으로 무한하게 확장 가능한 능력과 같은 기능이 필요할 때 더욱 좋습니다.

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

JavaScript와 JSON과도 잘 통합되어 있어 웹 개발자에게 필수입니다. 개인적인 취향이지만, 예를 들어 — db.collection().find({}) — 이런 문법은 IDE와 Shell 사이에서 테스트할 때 복사 및 붙여넣기에 아주 편리합니다. 심지어 Mongoose를 사용할 필요도 없었어요.

## 개발에 대해 알아두어야 할 사항

장점

- 비관계형 데이터를 위한 문서 저장소로 사용할 때 완벽한 선택입니다.
- 활발한 커뮤니티가 있어 다양한 튜토리얼과 자료가 많이 있습니다. 필요하다면 ORM (Mongoose)도 사용할 수 있어요.
- 운영 옵션인 Atlas에는 오퍼레이션별 지불이 가능한 서버리스 플랜이 있어, 사용하지 않을 경우에는 제로로 스케일링하고 비용을 부담하지 않을 수 있습니다.
- Out-of-the-box 실시간 업데이트, 로그 기록 및 자동화가 가능합니다.

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

단점

- 관계형이 아님.
- 특정 지역에서는 Atlas가 느릴 수 있음.
- 완전 오픈 소스가 아님; 소스 코드를 비상업용으로 사용하려면, 사용한 다른 서비스의 코드를 포함하여 완전한 코드를 공개해야 할 수도 있어서 시작하기가 어려울 수 있음.

# 7. Redis/Workers KV

## Redis와 Workers KV란?

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

이들은 키/값 데이터만 저장할 수 있는 극한 속도의 특별한 데이터베이스입니다. 기본적으로는 네트워크에 연결된 매우 큰 해시 테이블로, 모두 메모리에 저장될 수 있지만 필요하다면 연결된 볼륨에 지속될 수 있는 장점이 있습니다.

## 시작하는 방법은 무엇인가요?

Cloudflare Workers KV를 이용하려면 여기에서 가입하세요. Redis의 경우, DigitalOcean / Vultr / Upstash로부터 관리되는 Redis-as-a-service를 선택하거나 VPS에 공식 Redis 도커 이미지를 올리고 직접 호스트하는 것이 가능합니다.

## 개발자 경험이 어떤가요?

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

특정한 사용 사례에 최적화된 키-값 저장소입니다. 모든 것보다 낮은 대기 시간을 우선시하는 경우에 사용하세요. 데이터가 해시 테이블로 표현할 수 있는 경우에 사용됩니다 (예: 사용자 ID를 소셜 미디어 프로필 URL에 매핑). 그렇다면 축하합니다! 이제 검색이 O(log(n)) 또는 O(1) 작업이 되었습니다. 엄청난 일이죠.

바로 알고 싶은 것은 Bob이 Alice를 팔로우하는지 여부? 사이트에서 매번 API/RSS 피드에서 쿼리하지 않고 최신 게시물 목록을 유지하고 싶으신가요? PayPal/Stripe의 IPN 확인까지 고객 ID → 상품 ID 매핑으로 주문을 지속하고 싶으신가요?

이러한 고성능 + 낮은 대기 시간 키-값 저장소 — 특히 엣지 위치에서 서비스로 제공하는 공급 업체들은 딱 맞는 선택입니다.

## 개발 시 알아야 할 사항

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

여기서는 장단점을 건너뛰겠습니다. K/V 저장소는 매우 간단하기 때문에, 하지만 주의해야 할 점이 있습니다. 관리되는 Redis-로-서비스를 사용한다면 먼저 Redis API의 일부와 호환되는지 확인해야 합니다 (예를 들어, 많은 제공업체들이 아직 Geo 코어를 지원하지 않는 경우가 많습니다).

# 결론

이 글을 읽으면서 '어떤 데이터베이스가 최고일까?'라는 질문보다는 '어떤 데이터베이스가 내가 가진 구체적인 문제를 가장 잘 해결할 것인가?'에 집중하여 의사결정 피로감을 극복하는 데 도움이 되었기를 바랍니다.

그러므로 이런 접근 방식을 염두에 둔다면, 아래 내용을 확인해보세요:

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

- "빠르고 쉽고 비용 효율적이면서 `1 and 0`까지 확장 가능한 것이 필요해요." → Wunderbase.
- "실제 세계 데이터를 모델링해야 해요." → 관계형 DB가 필요할 거예요. PlanetScale / Fauna / SupaBase를 사용하거나 이미 전문지식/자원이 있는 경우에는 포스트그레스를 호스팅해보세요.
- "실시간 업데이트가 필요해요." → WunderBase(GraphQL Subscriptions를 통해), SupaBase, Fauna(Event Streaming을 통해) 및 MongoDB는 모두 이 기능을 제공해요. 키-값 쌍만 필요한 경우 Redis에는 내장된 발행/구독 기능이 있어요.
- "저렴한 대기 시간이 제 사용 사례에 중요해요." → Upstash(Redis와 같은)과 같은 엣지에서 제공되는 KV 저장소 또는 Cloudflare Workers KV가 필요할 거예요.
- "GraphQL에 큰 투자를 했어요." → Fauna 또는 WunderBase — WunderGraph를 사용하는 API 게이트웨이를 사용하는 것이 좋아요. 이렇게 하면 공개 GraphQL 엔드포인트를 노출하지 않아도 돼요.

Prithwish Nath를 대신해서 게시함.

## 더 읽어보기
