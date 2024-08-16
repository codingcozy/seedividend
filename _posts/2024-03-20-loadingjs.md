---
title: "Nextjs 14 로딩 화면을 위한 loadingjs 사용 방법"
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





# Nextjs 14 로딩 화면을 위한 loading.js 사용 방법

로딩 파일은 Suspense를 기반으로 즉시 로딩 상태를 생성할 수 있습니다.

기본적으로 이 파일은 서버 컴포넌트입니다 - 그러나 "use client" 지시문을 통해 클라이언트 컴포넌트로도 사용할 수 있습니다.

```typescript
export default function Loading() {
  // 또는 사용자 정의 로딩 스켈레톤 컴포넌트
  return <p>Loading...</p>;
}
```

<div class="content-ad"></div>

로딩 UI 컴포넌트는 어떤 매개변수도 받지 않습니다.

> 참고사항
> 로딩 UI를 디자인할 때 React Developer Tools를 사용하여 수동으로 Suspense 경계를 전환하는 것이 도움이 될 수 있습니다.

## 버전 기록

| Version   | Changes                     |
| --------- | --------------------------- |
| `v13.0.0` | `loading`이 도입되었습니다. |

<div class="content-ad"></div>
