---
title: "Nextjs 14 devIndicators란"
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

# Nextjs 14 devIndicators란?

코드를 편집하는 동안 Next.js가 애플리케이션을 컴파일하면 페이지 오른쪽 하단에 컴파일 지시기가 표시됩니다.

> 알아두면 좋아요: 이 지시기는 개발 모드에만 존재하며 프로덕션 모드에서 앱을 빌드하고 실행할 때 나타나지 않습니다.

일부 경우에는 이 지시기가 페이지에서 잘못된 위치에 있을 수 있습니다. 예를 들어, 채팅 런처와 충돌할 때가 있습니다. 위치를 변경하려면 next.config.js을 열고 devIndicators 객체 내의 buildActivityPosition을 bottom-right(기본값), bottom-left, top-right 또는 top-left로 설정하세요:

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

```js
module.exports = {
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
};
```

가끔 이 표시기가 유용하지 않을 수도 있어요. 그럴 때에는 next.config.js 파일을 열고 devIndicators 객체 내의 buildActivity 구성을 비활성화하면 됩니다:

```js
module.exports = {
  devIndicators: {
    buildActivity: false,
  },
};
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
