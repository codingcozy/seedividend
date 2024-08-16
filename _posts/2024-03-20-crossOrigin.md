---
title: "Nextjs 14 crossOrigin 사용 방법"
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





# Nextjs 14 crossOrigin 사용 방법

`next/script` 컴포넌트에서 생성된 모든 `script` 태그에 크로스오리진 속성을 추가하고, 크로스 도메인 요청을 처리하는 방법을 정의하기 위해 crossOrigin 옵션을 사용하세요.

```js
module.exports = {
  crossOrigin: "anonymous",
};
```

## 옵션

<div class="content-ad"></div>

- `anonymous`: crossOrigin="anonymous" 속성을 추가합니다.
- `use-credentials`: crossOrigin="use-credentials" 속성을 추가합니다.

<div class="content-ad"></div>
