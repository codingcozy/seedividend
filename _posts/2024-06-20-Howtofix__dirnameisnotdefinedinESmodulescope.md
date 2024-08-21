---
title: "ES 모듈 범위에서 __dirname이 정의되지 않았습니다 오류를 해결하는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-Howtofix__dirnameisnotdefinedinESmodulescope_0.png"
date: 2024-06-20 01:34
ogImage:
  url: /assets/img/2024-06-20-Howtofix__dirnameisnotdefinedinESmodulescope_0.png
tag: Tech
originalTitle: "How to fix “__dirname is not defined in ES module scope”"
link: "https://medium.com/@iamwebwiz/how-to-fix-dirname-is-not-defined-in-es-module-scope-34d94a86694d"
isUpdated: true
---

## 상황

난 예전 프로젝트를 CommonJS에서 ES 모듈로 이주하려고 할 때 이 오류를 만났어. 그리고 진입 파일이 전역 변수인 \_\_dirname을 사용해. 이런 에러 메시지를 봤어:

Node 스크립트에서 \_\_dirname을 사용하면 현재 JavaScript 파일을 포함하는 디렉토리 경로를 받을 수 있어. 많은 Node.js 애플리케이션들이 이 전역 변수를 사용해.

CommonJS 모듈에서 사용할 때(당신의 애플리케이션의 package.json 파일에 "type": "module"이 정의되지 않았을 때), **dirname은 문제없이 작동하겠지만, ES 모듈에서 사용하면 "ES 모듈 스코프에서 **dirname이 정의되지 않았습니다"라는 에러가 나타나.

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

## 해결책

저는 ES 모듈에 관한 Node.js 문서를 살펴봤어요. 특히 import.meta 객체에 대해요. 또한, 필요한 것은 현재 스크립트/모듈이 포함된 디렉토리의 이름이니, Node.js의 path 모듈을 활용할 수 있어요. 또한 url 모듈에는 파일의 완전히 해결된 경로를 반환해주는 fileURLToPath 함수가 있어요.

그래서, path 모듈과 url 모듈에서 fileURLToPath 함수를 함께 import 해야 해요:

```js
import path from "path";
import { fileURLToPath } from "url";
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

CommonJS의 \_\_dirname 기능을 복제하려면 다음을 수행하기만 하면 됩니다:

```js
const __filename = fileURLToPath(import.meta.url); // 파일까지의 경로를 가져옵니다
const __dirname = path.dirname(__filename); // 디렉토리 이름 가져옵니다
```

이제 \_\_dirname 변수가 스크립트에서 원하는 대로 작동할 것입니다. 스크립트에서 이를 확인하려면 정의 바로 다음에 로그를 남기면 됩니다:

```js
console.log(__dirname);
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

여기 있어요! 도움이 되었으면 좋겣습니다.

연결하고 싶다면, X 또는 LinkedIn에서 연락할 수 있어요.

건배하며, 계속해서 해킹해보세요!!! 🥂
