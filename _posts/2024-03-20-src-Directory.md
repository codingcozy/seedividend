---
title: "Nextjs 14 저장소 src 디렉토리 특징"
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

# Nextjs 14 저장소 src 디렉토리 특징

당신의 프로젝트 루트에 특별한 Next.js 앱 또는 페이지 디렉토리를 갖는 대신, Next.js는 또한 src 디렉토리 아래에 애플리케이션 코드를 배치하는 일반적인 패턴을 지원합니다.
이는 대부분 프로젝트 루트에 위치하는 프로젝트 구성 파일과 애플리케이션 코드를 분리하며, 일부 개인 및 팀에서 선호하는 방식입니다.

src 디렉토리를 사용하려면, 앱 라우터 폴더 또는 페이지 라우터 폴더를 각각 src/app 또는 src/pages로 이동시키세요.

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

<img src="/assets/img/src-Directory_0.png" />

> 중요 정보

- /public 디렉토리는 프로젝트의 루트에 유지되어야 합니다.
- package.json, next.config.js 및 tsconfig.json과 같은 구성 파일은 프로젝트의 루트에 유지되어야 합니다.
- .env.\* 파일들은 프로젝트의 루트에 유지되어야 합니다.
- 루트 디렉토리에 app 또는 pages가 있는 경우 src/app 또는 src/pages은 무시됩니다.
- src를 사용하는 경우, /components 또는 /lib와 같은 다른 응용프로그램 폴더를 이동해야 합니다.
- Middleware를 사용하는 경우, 해당 Middleware를 src 디렉토리 안에 배치해야 합니다.
- Tailwind CSS를 사용하는 경우, tailwind.config.js 파일의 내용 섹션에 /src 접두사를 추가해야 합니다.
- TypeScript 경로를 사용하여 @/\*와 같이 가져오는 경우, tsconfig.json의 경로 객체를 업데이트하여 src/을 포함해야 합니다.

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
