---
title: "이미지를 최적화하는 Express 미들웨어 코드 작성법 성능 향상 방법"
description: ""
coverImage: "/assets/img/2024-06-27-Codeanexpressmiddlewaretooptimizeyourimages_0.png"
date: 2024-06-27 17:38
ogImage: 
  url: /assets/img/2024-06-27-Codeanexpressmiddlewaretooptimizeyourimages_0.png
tag: Tech
originalTitle: "Code an express middleware to optimize your images"
link: "https://medium.com/@sina-byn/code-an-express-middleware-to-optimize-your-images-c9225308e4ba"
isUpdated: true
---





![이미지](/assets/img/2024-06-27-Codeanexpressmiddlewaretooptimizeyourimages_0.png)

이 게시물에서는 이미지를 최적화하기 위해 sharp 패키지를 활용하는 express.js 미들웨어를 구현할 것입니다.

중요 사항 요약; 이 스토리의 끝에 코드 전체가 gist로 제공됩니다.

초기화


<div class="content-ad"></div>

```js
mkdir express-image-opt-middleware
cd express-image-opt-middleware
npm init -y
touch index.js
touch utils.js
```

이제 의존성을 설치해 봅시다:

```js
npm i express sharp
npm i -D nodemon
```

npm 스크립트를 구성하세요:

<div class="content-ad"></div>

```json
// package.json
{
  ...,
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  ...
}
```

Express 서버를 초기화합니다:

```js
// index.js

const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

app.listen(8080, () => {
  console.log("서버가 http://localhost:8080에서 실행 중입니다.");
});
```

보통 express를 통해 정적 자산을 제공하려면 내장된 express.static 미들웨어를 사용합니다:

<div class="content-ad"></div>

```js
app.use(express.static('public'));
```

이 미들웨어는 사용하지 않아도 됩니다. 왜냐하면 우리가 직접 구현할 것이기 때문입니다. 이미지를 표시하려고 할 때 이해해야 할 첫 번째 것은 이미지를 표시하려면 특정 URL로 GET 요청을 하는데, 서버에서 이미지를 가져와 표시하는 것입니다. 여기서 우리가 하는 일은 이 요청을 가로채서 URL에 제공된 쿼리 매개변수를 기반으로 필요할 때 최적화된 이미지를 제공하는 것입니다.

```js
// index.js

app.get('*', async (req, res, next) => {
  const storagePath = path.join(__dirname, 'public');
  const fileName = req.params[0] ?? '';
  const filePath = path.join(storagePath, fileName);

  try {
    const stats = await fs.stat(filePath);
    if (!stats.isFile()) return next();

    // * 여기에 코드를 추가합니다
  } catch(err) {
    console.error(err);
    res.status(404).send('파일을 찾을 수 없습니다');
  }
});
```

요청된 이미지에 기반하여 적절한 Content-Type 헤더를 설정해야 합니다.

<div class="content-ad"></div>

```js
// utils.js
const path = require('path');

exports.getContentType = fileName => {
  const ext = path.extname(fileName).slice(1);
  let contentType;
  
  switch (ext) {
    case 'jpg':
    case 'jfif':
    case 'jpeg':
      contentType = 'image/jpeg';
      break;
    case 'png':
      contentType = 'image/png';
      break;
    case 'webp':
      contentType = 'image/webp';
      break;
    case 'svg':
      contentType = 'image/svg+xml';
      break;
    default:
      contentType = 'application/octet-stream';
  }

  return contentType;
};
```

```js
// index.js

// * setting the Content-Type
// * make sure to require getContentType
const contentType = getContentType(fileName);
res.setHeader('Content-Type', contentType);
  
// * serve svg and unknown files as they are
if (['image/svg+xml', 'application/octet-stream'].includes(contentType)) {
  const readStream = createReadStream(filePath);
  readStream.pipe(res);
  readStream.on('error', next);
  return;
}
```

fs/promises API는 createReadStream 함수를 제공하지 않습니다. 두 방법을 모두 활용하려면 다음과 같이 사용하십시오:

```js
const { createReadStream } = require('fs');
const fs = require('fs/promises');
```

<div class="content-ad"></div>

이 미들웨어는 다음 쿼리 매개변수를 이해합니다:

- q — 품질
- w — 너비
- h — 높이

모든 이 매개변수들이 선택 사항임을 유의하세요.

w 또는 h 중 하나만 지정된 경우, 이미지의 원래 종횡비가 다른 차원을 계산하는 데 사용됩니다.

<div class="content-ad"></div>

```js
// index.js

// * sharp 패키지를 포함해야 합니다
const image = sharp(filePath);
const metadata = await image.metadata();
const aspectRatio = metadata.width / metadata.height;
const quality = Math.trunc(+(req.query.q ?? 100));
let width = Math.trunc(+(req.query.w ?? 0));
let height = Math.trunc(+(req.query.h ?? 0));

// * 너비만 지정된 경우
if (width && !height) {
  height = Math.round(width * (1 / aspectRatio));

  // * 높이만 지정된 경우
} else if (height && !width) {
  width = Math.round(height * aspectRatio);

  // * 둘 다 지정되지 않은 경우
} else {
  width = metadata.width;
  height = metadata.height;
}

const stream = image
  .resize({ width, height })
  .jpeg({ quality, progressive: true, force: false })
  .webp({ quality, progressive: true, force: false })
  .png({ quality, progressive: true, force: false });

stream.pipe(res);
stream.on('error', next);
```

Middleware의 전체 코드는 다음 gist에 있습니다: [link](gist 주소)
