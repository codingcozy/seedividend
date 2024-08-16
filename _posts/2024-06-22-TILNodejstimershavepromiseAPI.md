---
title: "오늘 배운 것 Nodejs 타이머의 Promise API 사용 방법"
description: ""
coverImage: "/assets/img/2024-06-22-TILNodejstimershavepromiseAPI_0.png"
date: 2024-06-22 13:58
ogImage: 
  url: /assets/img/2024-06-22-TILNodejstimershavepromiseAPI_0.png
tag: Tech
originalTitle: "TIL: Node.js timers have promise API"
link: "https://medium.com/@salimbinusman/til-node-js-timers-have-promise-api-ff9dc9124ca1"
isUpdated: true
---




안녕하세요! 코드 개발자 여러분!

혹시 자바스크립트/타입스크립트를 사용하여 기능을 코딩하면서 "오 이 코드에 2초의 인위적인 지연을 추가해야겠네"라고 깨달은 적이 있나요? 그럴 땐 아래와 같이 코드를 작성해야겠지요:

```js
// 처음에 프로미스가 아닌 것을 프로미스화하기
await new Promise<void>((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 2_000)
})
```

저는 저런 경우를 참 많이 겪었어요. 특히 직장에서 코드를 작성할 때죠. 때로는 그런 게 간단하지 않다는 건 거니까요.

<div class="content-ad"></div>

노드.js는 setTimeout, setInterval 및 setImmediate 같은 모든 타이머에 대한 프로미스 API를 이미 제공했으므로 기뻐해야 합니다.

그냥 timers/promises에서 해당 set 함수를 가져와서 사용할 수 있습니다.

```js
// 프로미스를 사용한 정확히 2초의 지연
import { setTimeout } from 'timers/promises'

await setTimeout(2_000, 'success')
```

그리고 두 번째 인자로 전달한 값으로 2초 후에 프로미스가 해결됩니다. 멋지죠!

<div class="content-ad"></div>

오늘 새로운 것을 배우셨으면 좋겣습니다.

즐거운 학습 되세요.

안녕히 가세요~