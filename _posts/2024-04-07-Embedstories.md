---
title: "Storybook embed로 삽입해서 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Embed stories"
link: "https://storybook.js.org/docs/sharing/embed"
isUpdated: true
---






동료 및 개발자 커뮤니티에 작업물을 소개하기 위해 이야기를 임베드하여 삽입하세요. 임베드를 사용하려면 Storybook이 게시되어 공개적으로 접근 가능해야 합니다.

Storybook은 `iframe` 임베드를 기본적으로 지원합니다. Chromatic을 사용하여 Storybook을 게시하는 경우, oEmbed 표준을 지원하는 Notion, Medium 및 무수히 많은 다른 플랫폼에서도 이야기를 임베드할 수 있습니다.

## 툴바로 이야기 임베드

툴바로 이야기를 임베드하려면 게시된 이야기 URL을 붙여 넣으세요. 예시로:



```js
https://5ccbc373887ca40020446347-wtuhidckxo.chromatic.com/?path=/story/shadowboxcta--default

// iframe 삽입
<iframe
  src="https://5ccbc373887ca40020446347-wtuhidckxo.chromatic.com/?path=/story/shadowboxcta--default&full=1&shortcuts=false&singleStory=true"
  width="800"
  height="260"
></iframe>
```

## 툴바 없이 이야기 삽입

Storybook 툴바 없이 간단한 이야기를 삽입하려면, Storybook 오른쪽 상단의 "open canvas in new tab" 아이콘을 클릭하여 캔버스 URL을 얻으세요. 예를 들어:

```js
https://5ccbc373887ca40020446347-wtuhidckxo.chromatic.com/iframe.html?id=/story/shadowboxcta--default&viewMode=story

// iframe 삽입
<iframe
  src="https://5ccbc373887ca40020446347-wtuhidckxo.chromatic.com/iframe.html?id=shadowboxcta--default&viewMode=story&shortcuts=false&singleStory=true"
  width="800"
  height="200"
></iframe>
```



## 문서 삽입

스토리 카드에 대해 생성된 독특한 자동 생성 문서 항목으로 viewMode=story를 대체하여 문서 페이지를 삽입하십시오.

```js
https://5ccbc373887ca40020446347-wtuhidckxo.chromatic.com/iframe.html?id=shadowboxcta--docs&viewMode=docs&shortcuts=false&singleStory=true

// iframe 삽입
<iframe
  src="https://5ccbc373887ca40020446347-wtuhidckxo.chromatic.com/iframe.html?id=shadowboxcta--docs&viewMode=docs&shortcuts=false&singleStory=true"
  width="800"
  height="400"
></iframe>
```

## 다른 플랫폼에 스토리 삽입



모든 플랫폼마다 임베드 지원 수준이 다릅니다. 외부 콘텐츠를 임베드하는 방법에 대한 권장사항은 해당 서비스의 문서를 확인해보세요.