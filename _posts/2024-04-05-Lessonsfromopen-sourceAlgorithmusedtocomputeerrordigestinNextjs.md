---
title: "Nextjs에서 errordigest를 계산하는 알고리즘"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Lessons from open-source Algorithm used to compute errordigest in Nextjs"
link: "https://medium.com/towardsdev/lessons-from-open-source-algorithm-used-to-compute-error-digest-in-next-js-018523030dfc"
---



이 강의는 Next.js 소스 코드에서 선택되었습니다. 이 문서에서는 Next.js에서 error.digest가 어떻게 계산되는지에 대해 배우게 될 것입니다.

# Error.digest

문서에는 "서버 구성 요소에서 throw된 오류의 자동으로 생성된 해시입니다. 서버 측 로그에서 해당 오류를 일치시키는 데 사용할 수 있습니다."라고 설명되어 있습니다.

이 digest를 서버 로그에서 매칭할 수 있습니다. Next.js는 민감한 정보가 클라이언트 측으로 유출되는 것을 막기 위해 digest만 보여줍니다.

<div class="content-ad"></div>

다음 Stackoverflow 질문을 확인해보세요:

- Next.js 프로덕션 모드에서 발생하는 오류 — Digest: 1782794309
- https://stackoverflow.com/questions/76713709/what-is-a-digest-property

다음 코드 스니펫에서 확인할 수 있듯이, 이 오류를 자동으로 생성하는 방법은 Next.js가 어떻게 이 해시를 생성하는지 확인하는 것입니다.

위 코드 스니펫에서 확인할 수 있듯이, 이는 create-error-handler.tsx의 맨 위에서 가져온 'stringHash'라는 함수를 사용합니다.

<div class="content-ad"></div>

```js
import stringHash from "next/dist/compiled/string-hash";
```

Next.js에는 compiled라는 폴더에 번들로 포함된 패키지들이 많이 있어요. string-hash는 npm 패키지에요.

저는 string-hash 소스 코드를 확인해봤어요.

```js
"use strict";

function hash(str) {
  var hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

module.exports = hash;
```

<div class="content-ad"></div>

해당 알고리즘은 Dan Bernstein의 djb2와 매우 유사하며 여기에서 사용할 수 있습니다.

NPM에서 매주 170만 회 다운로드됩니다. 언젠가 이만큼 다운로드 받는 라이브러리를 작성하고 싶네요.

# 결론

Next.js 문서에 따르면 error.digest에 대해 다음과 같이 설명합니다. "서버 구성 요소에서 throw된 오류의 자동으로 생성된 해시입니다. 해당 오류를 서버 측 로그에서 매치하는 데 사용할 수 있습니다." 소스 코드를 살펴보니 string-hash 알고리즘을 사용하는 것을 알았습니다.

<div class="content-ad"></div>

더 깊이 파다 보니 string-hash는 NPM에서 주간 170만 다운로드를 기록하며 약 17줄의 코드로 이루어져 있다는 것을 알게 되었어요. 언젠가는 나도 이렇게 많은 다운로드를 받는 라이브러리를 만들고 싶네요. 제가 만든 몇 개의 npm 패키지는 그리 인기가 없었지만 말이죠.
