---
title: "Nextjs 14 draftMode 사용 방법 정리"
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

# Nextjs 14 draftMode 사용 방법 정리

draftMode 함수를 사용하면 서버 구성 요소 내에서 Draft Mode를 감지할 수 있습니다.

```js
import { draftMode } from "next/headers";

export default function Page() {
  const { isEnabled } = draftMode();
  return (
    <main>
      <h1>내 블로그 포스트</h1>
      <p>Draft Mode는 현재 {isEnabled ? "활성화됨" : "비활성화됨"}</p>
    </main>
  );
}
```

## 버전 히스토리

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

아래는 Markdown 형식으로 변경한 표입니다.

| Version | Changes                 |
| ------- | ----------------------- |
| v13.4.0 | `draftMode` introduced. |

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
