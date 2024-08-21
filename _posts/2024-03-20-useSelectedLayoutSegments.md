---
title: "Nextjs 14 현재 경로 세그먼트들 전부 가져오는 방법useSelectedLayoutSegments"
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

# Nextjs 14 현재 경로 세그먼트들 전부 가져오는 방법(useSelectedLayoutSegments)

useSelectedLayoutSegments는 클라이언트 컴포넌트 훅으로, 호출된 레이아웃 아래의 활성 경로 세그먼트를 읽을 수 있게 해줍니다.

브레드크럼과 같은 활성 자식 세그먼트의 정보가 필요한 부모 레이아웃에서 UI를 생성하는 데 유용합니다.

```typescript
"use client";

import { useSelectedLayoutSegments } from "next/navigation";

export default function ExampleClientComponent() {
  const segments = useSelectedLayoutSegments();

  return (
    <ul>
      {segments.map((segment, index) => (
        <li key={index}>{segment}</li>
      ))}
    </ul>
  );
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

> 알고 계셔야 할 사항:
> useSelectedLayoutSegments는 클라이언트 컴포넌트 후크이며, 레이아웃은 기본적으로 서버 컴포넌트이므로 useSelectedLayoutSegments는 일반적으로 레이아웃으로 가져온 클라이언트 컴포넌트를 통해 호출됩니다.
> 반환된 세그먼트에는 루트 그룹이 포함되어 있으며, UI에 포함하고 싶지 않을 수도 있습니다. 대괄호로 시작하는 항목을 제거하려면 filter() 배열 메서드를 사용할 수 있습니다.

## 매개변수

```js
const segments = useSelectedLayoutSegments(parallelRoutesKey?: string)
```

useSelectedLayoutSegments는 선택적으로 parallelRoutesKey를 허용하며, 해당 슬롯 내에서 활성 루트 세그먼트를 읽을 수 있습니다.

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

## 반환값

useSelectedLayoutSegments 함수는 호출된 레이아웃에서 한 수준 낮은 수준의 활성 세그먼트를 포함하는 문자열 배열을 반환합니다. 해당하는 세그먼트가 없는 경우 빈 배열을 반환합니다.

예를 들어, 다음과 같은 레이아웃 및 URL이 주어졌을 때 반환되는 세그먼트는 다음과 같습니다:

| 레이아웃                  | 방문한 URL            | 반환되는 세그먼트           |
| ------------------------- | --------------------- | --------------------------- |
| `app/layout.js`           | `/`                   | `[]`                        |
| `app/layout.js`           | `/dashboard`          | `['dashboard']`             |
| `app/layout.js`           | `/dashboard/settings` | `['dashboard', 'settings']` |
| `app/dashboard/layout.js` | `/dashboard`          | `[]`                        |
| `app/dashboard/layout.js` | `/dashboard/settings` | `['settings']`              |

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

## 버전 기록

| 버전      | 변경 내용                        |
| --------- | -------------------------------- |
| `v13.0.0` | `useSelectedLayoutSegments` 도입 |

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
