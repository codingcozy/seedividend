---
title: "Nextjs 14에서 다른 URL로 리디렉션 하는 방법permanentRedirect"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---

# Nextjs 14에서 다른 URL로 리디렉션 하는 방법(permanentRedirect)

permanentRedirect 함수를 사용하면 사용자를 다른 URL로 리디렉션할 수 있습니다. permanentRedirect는 서버 구성 요소, 클라이언트 구성 요소, 라우트 핸들러 및 서버 액션에서 사용할 수 있습니다.

스트리밍 컨텍스트에서 사용될 때 클라이언트 측에서 리디렉션을 발생시키는 메타 태그를 삽입합니다. 서버 액션에서 사용되는 경우 호출자에게 303 HTTP 리디렉션 응답을 제공합니다. 그렇지 않으면 호출자에게 308 (영구) HTTP 리디렉션 응답을 제공할 것입니다.

리소스가 없는 경우 notFound 함수를 대신 사용할 수 있습니다.

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

> 유용한 정보: 영구적인 308 HTTP 리디렉션이 아닌 임시적인 307 HTTP 리디렉션을 선호하는 경우, 대신 리디렉션 함수를 사용할 수 있습니다.

## 매개변수

permanentRedirect 함수는 두 개의 인수를 받습니다:

```js
permanentRedirect(path, type);
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

표를 Markdown 형식으로 변경하겠습니다.

| Parameter | Type                                                        | Description                                              |
| --------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| path      | `string`                                                    | 리디렉트할 URL입니다. 상대 또는 절대 경로일 수 있습니다. |
| type      | `'replace'` (기본값) 또는 `'push'`(Server Actions의 기본값) | 수행할 리디렉트 유형입니다.                              |

기본적으로 permanentRedirect는 Server Actions에서 push(브라우저 히스토리 스택에 새 항목 추가)를 사용하고, 다른 곳에서는 replace(브라우저 히스토리 스택에 현재 URL을 대체)를 사용합니다. 이 동작은 type 매개변수를 지정하여 재정의할 수 있습니다.

type 매개변수는 Server Components에서 사용할 때 아무 효과가 없습니다.

## 반환값

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

permanentRedirect 함수는 어떤 값도 반환하지 않습니다.

## 예시

permanentRedirect() 함수를 호출하면 NEXT_REDIRECT 오류가 발생하고 throw된 루트 세그먼트의 렌더링이 중단됩니다.

```js
import { permanentRedirect } from "next/navigation";

async function fetchTeam(id) {
  const res = await fetch("https://...");
  if (!res.ok) return undefined;
  return res.json();
}

export default async function Profile({ params }) {
  const team = await fetchTeam(params.id);
  if (!team) {
    permanentRedirect("/login");
  }

  // ...
}
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

> 좋은 정보: `permanentRedirect`를 사용할 때는 `return permanentRedirect()`를 사용할 필요가 없습니다. TypeScript `never` 타입을 사용합니다.

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
