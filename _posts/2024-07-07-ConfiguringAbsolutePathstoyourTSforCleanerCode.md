---
title: "코드를 깔끔하게 만드는 TypeScript 절대 경로 설정 방법"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-07 19:25
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "Configuring Absolute Paths to your TS for Cleaner Code"
link: "https://medium.com/@akhshyganesh/configuring-absolute-paths-your-ts-for-cleaner-code-bdaf81e01736"
---


안녕하세요, 이 DIY 프로젝트에 오신 것을 환영합니다,

시작하기 전에, 제 소개를 드리겠습니다. 전 저는 풀 스택 개발자입니다.

그럼, 이 작업에 필요한 사전 준비물을 살펴봅시다.

- 노드가 설치되어 있어야 합니다. (설치되어 있지 않다면 여기를 클릭해주세요)

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

위에서 언급한 요구 사항을 확인해주세요.

Hapi와 함께 TypeScript 프로젝트에서 절대 경로를 설정하려면 TypeScript 및 모듈 해결 설정을 구성해야 합니다. 다음은 단계별 안내서입니다:

- TypeScript 경로 구성:

tsconfig.json을 수정하여 baseUrl 및 paths 속성을 포함시킵니다. 이는 TypeScript에게 지정된 기본 URL을 기준으로 모듈을 해결하도록 지시합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@controllers/*": ["src/controllers/*"],
      "@models/*": ["src/models/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

2. Import 문 업데이트:

이제 정의된 별칭을 import 문에서 사용할 수 있습니다. 예를 들어:

```js
import { SomeController } from '@controllers/SomeController';
import { SomeModel } from '@models/SomeModel';
import { SomeUtil } from '@utils/SomeUtil';
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

3. Node.js를 위한 모듈 해석 설정:

Node.js는 기본적으로 TypeScript 경로 별칭을 이해하지 못합니다. 이를 처리하기 위해 `tsconfig-paths`와 같은 패키지를 사용할 수 있습니다. 다음 명령어를 사용하여 설치하세요:

```js
npm install tsconfig-paths - save-dev
```

4. Node.js 진입점 업데이트:

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

tsconfig-paths를 사용하여 tsconfig.json에 정의된 모듈 경로를 로드한 후 애플리케이션을 시작하십시오. package.json의 `start` 스크립트를 업데이트하거나 새로운 진입점 파일을 만들어주세요:

```js
{
  "scripts": {
    "start": "ts-node -r tsconfig-paths/register src/server.ts"
  }
}
```

또는 새로운 진입점 파일 start.ts를 만들어주세요:

```js
import 'tsconfig-paths/register';
import './src/server';
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

패키지 파일(package.json)을 아래와 같이 엔트리 포인트를 변경해주세요:

```js
{
  "scripts": {
    "start": "ts-node start.ts"
  }
}
```

5. 선택 사항: Babel 사용하기 (고급 설정을 위해):

프로젝트에서 Babel을 사용 중이라면, 경로 별칭을 인식하도록 Babel을 구성해야 할 수 있습니다. babel-plugin-module-resolver 플러그인을 사용할 수 있습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

플러그인을 설치해 보세요:

```js
npm install babel-plugin-module-resolver --save-dev
```

귀하의 .babelrc 또는 babel.config.js를 업데이트하세요:

```js
{
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@/*": "./src/*"
      }
    }]
  ]
}
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

위 단계를 완료하면 프로젝트가 tsconfig.json에서 정의한 별칭을 기반으로 한 절대 경로를 사용하도록 설정됩니다. 이는 import를 더 효율적으로 관리하고 상대 경로 문제를 줄이는 데 도움이 될 것입니다.

만약 이 블로그를 읽어오면 새로운 것을 성공적으로 배웠을 것입니다. 

모두 좋은 결과를 얻길 바라며 코딩을 하시고, 이 블로그에 박수를 보내거나 팔로우 버튼을 눌러주시면 더 많은 블로그를 작성하게 도와주세요.

만약 이 블로그를 좋아하셨다면 커피 한 잔 사주실 수도 있습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

노드 체크 업데이트: 버전 악몽을 해결하는 완벽한 방법 | Akhshy Ganesh 저 | 2024년 7월 | Medium

주니어 개발자가 하는 React useEffect 실수 | Akhshy Ganesh 저 | 2024년 6월 | Medium

React, MFE 웹팩 모듈 연합 생성하기 | Akhshy Ganesh 저 | 2024년 6월 | Medium