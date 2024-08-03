---
title: "Nextjs14 정적public 파일 적용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs14 정적(public) 파일 적용 방법

Next.js는 루트 디렉토리에있는 public이라는 폴더 아래에있는 이미지와 같은 정적 파일을 제공할 수 있습니다. public 폴더 내의 파일은 기본 URL(/)부터 코드에서 참조할 수 있습니다.
예를 들어, public/avatars/me.png 파일은 /avatars/me.png 경로를 방문하여 볼 수 있습니다. 해당 이미지를 표시하는 코드는 아래와 같을 수 있습니다:

```js
import Image from "next/image";

export function Avatar({ id, alt }) {
  return <Image src={`/avatars/${id}.png`} alt={alt} width="64" height="64" />;
}

export function AvatarOfMe() {
  return <Avatar id="me" alt="내 초상화" />;
}
```

<div class="content-ad"></div>

## 캐싱

Next.js는 public 폴더의 에셋을 안전하게 캐시할 수 없습니다. 해당 폴더의 파일들은 변경될 수 있기 때문입니다. 기본 캐싱 헤더는 다음과 같습니다:

```js
Cache-Control: public, max-age=0
```

## 로봇, 파비콘, 기타 파일들

<div class="content-ad"></div>

정적 메타데이터 파일(예: robots.txt, favicon.ico 등)의 경우, 앱 폴더 내에 특별한 메타데이터 파일을 사용해야 합니다.

> 알아 두면 좋아요:
> 디렉토리 이름은 public이어야 합니다. 이름을 바꿀 수 없으며 이 디렉토리만 정적 자산을 서빙하는 데 사용됩니다.
> Next.js는 빌드 시에 public 디렉토리에 있는 자산만 제공합니다. 요청 시에 추가된 파일은 사용할 수 없습니다. 지속적인 파일 저장을 위해 Vercel Blob과 같은 타사 서비스를 사용하는 것을 권장합니다.

<div class="content-ad"></div>
