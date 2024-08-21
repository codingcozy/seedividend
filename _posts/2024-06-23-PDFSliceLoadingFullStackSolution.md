---
title: "PDF 분할 로드  풀스택 솔루션 안내"
description: ""
coverImage: "/assets/img/2024-06-23-PDFSliceLoadingFullStackSolution_0.png"
date: 2024-06-23 14:32
ogImage:
  url: /assets/img/2024-06-23-PDFSliceLoadingFullStackSolution_0.png
tag: Tech
originalTitle: "PDF Slice Loading — Full Stack Solution"
link: "https://medium.com/@ggluopeihai/pdf-slice-loading-full-stack-solution-89c12d92a2a4"
isUpdated: true
---

# 서문

본 문서는 PDF 파일을 로딩하는 최적화 솔루션에 대해 풀 스택 관점에서 설명합니다. 서버인 NestJS를 통해 PDF 파일을 업로드하고 노드를 통해 PDF를 이미지로 나누는 과정을 거칩니다. 그 후, 모바일 H5는 원본 PDF 파일 자원이 로드될 때까지 이미지를 우선적으로 로딩합니다. 그 이후에 PDF 소스 파일이 표시되며 사용자 제스처 확대/축소 및 복사 기능을 지원합니다.

# 배경

전반적으로 프런트엔드 페이지에서 PDF 파일을 로드해야 하는 필요성이 종종 발생합니다, 특히 정부 기관, 금융 업계 등에서 많이 발생합니다. PDF 파일은 여러 객체(텍스트, 이미지, 폰트 등)를 포함하는 컨테이너로, 파일 내부에는 어떤 순서로든 저장될 수 있습니다. 전체 PDF 파일은 네트워크로부터 다운로드된 후 파싱되어 렌더링되어야 페이지에 올바르게 표시됩니다. PDF 파일이 수십 메가바이트 또는 수백 메가바이트일 때, 사용자들은 PDF 파일 콘텐츠를 보기 위해 오랜 시간을 기다려야 합니다. 모바일 기기에서 PDF 파일을 여는 데 필요한 대기 시간은 더욱 길어질 수 있습니다.

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

# 스키마 비교

- HTTP Range Requests 헤더
- PDF 조각 잘라내기

솔루션 1: 프론트 엔드는 PDF 파일에 대한 네트워크 페이징 요청을 생성하며, 네트워크 병렬 요청은 리소스 다운로드 과정을 가속화합니다. 서버는 이 Content-Range을 지원하도록 수정되어야 하지만, 이 방법은 가시 범위 내의 우선 순위로 페이지 로드를 제어하기 어려운 문제가 있습니다.

솔루션 2: 이것은 이 장에서 소개하는 주요 내용입니다. 이 방법의 장점은 가시 범위 내의 PDF 콘텐츠를 먼저 로드할 수 있어 첫 화면에서 PDF 콘텐츠를 렌더링하는 시간을 크게 단축할 수 있다는 것입니다. 그러나 이 방법의 단점은 조각으로 표시된 PDF 이미지가 확대 및 복사를 지원하지 않는다는 것입니다. 제스처 확대 및 복사는 원본 PDF 파일이 로드될 때까지 지원되지 않습니다.

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

# PDF 분할 솔루션 비교

운영 환경: Chrome 브라우저에서 모바일 기기로 PDF를 로드하는 시뮬레이션, 네트워크는 4G로 설정

로드된 PDF 파일: NVIDIA 2024년 제1분기 재무 보고서 PDF 파일, 페이지 번호 183, 파일 크기: 34.8MB

이 그림은 원본 PDF 로딩 효과를 보여줍니다.

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

![이미지](https://miro.medium.com/v2/resize:fit:480/1*6z6XdVED9HwQ4lBWiqjwMA.gif)

이 그림은 슬라이싱 솔루션로딩 효과를 보여줍니다

![이미지](https://miro.medium.com/v2/resize:fit:480/1*Cgp-GrVHbvSPYaunMduhZQ.gif)

# 사용된 환경과 기술적인 포인트

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

- 서버: 노드, 네스트져스, MulterModule, ServeStaticModule, FileInterceptor, postman 도구
- 프론트엔드: http-server (글로벌로 설치), pdfjs, pdfh5

# 노드 서버

서버는 업로드된 PDF 리소스를 페이지 번호에 따라 여러 이미지로 분할하고, 로딩된 PDF API를 요청하는 것을 주로 담당합니다. 인터페이스는 PDF 리소스 주소와 분할로 생성된 이미지 리소스 주소를 반환하며, nestjs 프레임워크를 사용합니다.

# 1. 네스트져스 프로젝트 생성 및 종속성 설치

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

우선, NestJS 프로젝트를 빠르게 만들고 `upload` 모듈을 업로드해 보세요. 자세한 내용이 필요하시면 NestJS 시작하기 (파트 2): 사진 업로드를 꼭 읽어보세요. `upload.module`을 수정하여 PDF 형식의 업로드를 허용하도록 변경하세요.

```js
// src/upload/upload.module.ts

fileFilter: (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || +file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only images (JPEG, PNG) and PDF files are allowed..."), false);
  }
};
```

PDF 자르기에 필요한 도구를 설치해보세요:

- pdfjs-dist: 새 버전의 사용 방법을 피하기 위해 pdf 파일 도구킷(문서 주소)을 사용하세요. 이 글은 아래와 같은 고정된 패키지를 설치합니다. @2.7.570
- canvas: canvas를 통해 pdf 스트림을 읽어 이미지를 생성하세요.
- @types/pdfjs-dist: pdfjs-dist 데클레어션 파일 패키지

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
npm install pdfjs-dist@2.7.570 canvas @types/pdfjs-dist --save
```

## 2. PDF 파일의 각 페이지를 이미지로 잘라내기

PDF 파일을 페이지 번호에 따라 사진으로 자릅니다. 각 페이지는 한 장의 사진에 해당합니다. 잘린 사진은 루트 디렉토리 uploads/images/에 저장됩니다. 시작 파일에서 uploads/images/ 디렉토리가 있는지 확인해야 합니다. 디렉토리가 없으면 생성해야 합니다.

```js
// src/main.ts

async function bootstrap() {
...
+ const imagesDir = join(process.cwd(), 'uploads/images');
+  if (!existsSync(imagesDir)) {
+    mkdirSync(imagesDir);
+  }
...
}
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

캔버스Create a class to convert PDF stream to image

```js
// src/upload/node-canvas-factory.ts

import { Canvas, createCanvas, CanvasRenderingContext2D } from "canvas";

export class NodeCanvasFactory {
  create(width: number, height: number) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    return {
      canvas,
      context,
    };
  }

  reset(canvasAndContext: { canvas: Canvas, context: CanvasRenderingContext2D }, width: number, height: number) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(canvasAndContext: { canvas: Canvas, context: CanvasRenderingContext2D }) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}
```

Create a basic class for reading PDF and generating imagesupload.service

```js
// src/upload/upload.service.ts

import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { NodeCanvasFactory } from './node-canvas-factory';

// 使用 require 语句导入 pdfjs-dist
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");

@Injectable()
export class UploadService {
    async convertPdfToImages(pdfPath: string, outputDir: string): Promise<string[]> {
        const pdfBuffer = await fs.readFile(pdfPath);
        const pdfDocument = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
        const numPages = pdfDocument.numPages;
        const imageUrls = [];
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const imageUrl = await this.processPage(pdfDocument, pageNum, outputDir);
            imageUrls.push(imageUrl);
        }
        return imageUrls;
    }

    private async processPage(pdfDocument, pageNumber: number, outputDir: string): Promise<string> {
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.8 });
        const canvasFactory = new NodeCanvasFactory();
        const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);

        const renderContext = {
            canvasContext: canvasAndContext.context,
            viewport: viewport,
            canvasFactory: canvasFactory,
        };

        const renderTask = page.render(renderContext);
        await renderTask.promise;

        const imageBuffer = canvasAndContext.canvas.toBuffer();
        const outputFileName = path.join(outputDir, `output_page_${pageNumber}.png`);
        await fs.writeFile(outputFileName, imageBuffer);

        return `http://localhost:3000/uploads/images/output_page_${pageNumber}.png`;
    }
}
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

The `convertPdfToImages` 함수는 PDF 파일을 읽고 슬라이싱하여 생성된 이미지의 주소를 반환합니다. `processPage` 함수는 PDF의 각 페이지를 이미지로 변환합니다.

이제 해당 업로드 PDF 리소스 인터페이스를 추가해야 합니다: `uploadPdf`

```js
// src/upload/upload.controller.ts

...
export class UploadController {
    ...

+    @Post('/uploadPdf')
+    @UseInterceptors(FileInterceptor('file'))
+    async uploadPdf(@UploadedFile() file) {
+       const outputDir = join(process.cwd(), 'uploads/images');
+        const filePath = join(process.cwd(), 'uploads', file.filename);
+        const imageUrls = await this.uploadService.convertPdfToImages(filePath, outputDir);
+        return { urls: imageUrls };
+    }

}
```

이제 Postman을 사용하여 2024년 첫 번째 분기 NVIDIA 재무 보고서를 업로드 PDF 파일로 제출해주세요. 페이지 수는 183페이지이고 파일 크기는 34.8MB입니다. 업로드 프로세스 중 PDF 슬라이싱 과정을 확인할 수 있습니다.

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

![Image](https://miro.medium.com/v2/resize:fit:1400/1*I0SxO90cmJAwt4rxlvYcHA.gif)

# 3. PDF 및 해당 슬라이스 이미지 주소를 얻기 위한 API 인터페이스 생성

pdf 및 해당 슬라이스 이미지 주소를 얻기 위한 메소드를 생성합니다. 간편함을 위해, 단계 2에서 생성된 정적 리소스 주소를 지정합니다. upload.controller.ts.Get

```js
// src/upload/upload.controller.ts

import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Get
} from '@nestjs/common';
...
export class UploadController {
    ...

    @Get()
    async getPdf() {
        const baseUrl = 'http://localhost:3000/uploads/';
        const pdf = `${baseUrl}1718437748872.pdf`;
        const images = [] // Slice image storage
        // There are 187 images
        for (let i = 0; i < 187; i++) {
            images.push(`${baseUrl}images/output_page_${i}.png`);
        }
        return { pdf, images };
    }
}
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

PostmanGet 요청: localhost:3000/upload

리턴 형식:

```js
{
   "pdf": "http://localhost:3000/uploads/1718437748872.pdf",
   "images": [
        "http://localhost:3000/uploads/images/output_page_0.png",
        "http://localhost:3000/uploads/images/output_page_1.png",
        "http://localhost:3000/uploads/images/output_page_2.png",
        .....
   ]
}
```

# 4. 서버는 CORS를 시작하여 인터페이스에 대한 크로스도메인 액세스를 허용합니다

주로 나중을 위해, 프런트엔드 프로젝트 서비스는 포트 8080이며, 해당 서비스 포트 3000에 대해 크로스도메인 문제가 있습니다. 여기서 main.ts를 업로드 인터페이스에 대한 크로스도메인 액세스를 허용하도록 설정해야 합니다:

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
// src/main.ts

+ app.use('/uploads', (req, res, next) => {
+   res.header("Access-Control-Allow-Origin", "*");
+   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
+   next();
+ });

app.use('/uploads', express.static(join(process.cwd(), 'uploads'));

// Enable CORS
+ app.enableCors({
+    origin: '*', // Front-end address allowed
+    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
+    credentials: true,
+ });
```

마침내 서버가 이미지를 성공적으로 자르고 정적 리소스 디렉터리에 저장합니다. 다음으로는 PDF 슬라이스 이미지의 프론트엔드 분할 렌더링을 소개하겠습니다.

# Front End

본 문서에서는 H5 모바일 터미널에서 PDF 로드 속도를 최적화하는 해결책을 주로 다루므로, H5 터미널에서는 오픈 소스 프레임워크인 pdfh5를 사용하여 PDF 파일을 표시합니다. 이 문서에서는 HTML을 사용하여 pdfh5를 실행합니다. React, Vue에서 실행해야 하는 경우 저자의 해당 프레임워크 예제를 참조할 수 있습니다.

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

# 1. 프론트엔드 프로젝트 웹 만들기 및 로컬 서비스 시작하기

프론트엔드 프로젝트 웹을 만들고 index.html을 생성해주세요.

```js
// index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>H5 성능을 고려한 PDF 뷰어 로딩</title>
  </head>
  <body>
    <h2>H5 성능을 고려한 PDF 뷰어 로딩</h2>
  </body>
</html>
```

프론트엔드는 순수한 Html 페이지이므로 로컬로 서비스를 시작해야합니다. 여기서 http-server을 사용하여 먼저 전역으로 설치해주세요.

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
 npm i http-server -g
```

폴더를 열고 다음 명령어로 서비스를 시작해보세요

```js
 cd web
 http-server ./ -p 8080
```

브라우저에서 localhost:8080으로 접속하면 화면이 보일 거에요:

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

![이미지](/assets/img/2024-06-23-PDFSliceLoadingFullStackSolution_0.png)

## 2. 웹 프로젝트에 pdfh5 통합하기

pdfh5 프로젝트 다운로드

```js
git clone https://github.com/gjTool/pdfh5.git
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

프론트엔드 웹 프로젝트에 CSS와 JS 파일을 복사하고, index.html 코드를 수정하여 이전에 작성한 서버 인터페이스인 localhost:3000/upload 를 요청하도록 변경해보세요.

아래는 수정된 index.html 코드입니다.

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <title>PDFH5</title>
    <link rel="stylesheet" href="css/pdfh5.css" />
    <style>
      html, body {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="demo"></div>
    <script src="js/pdf.js"></script>
    <script src="js/pdf.worker.js"></script>
    <script src="js/jquery-3.6.0.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/pdfh5.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
      var pdfh5;
      $(function () {
        // AJAX GET 요청을 수행하여 PDF URL을 가져옵니다.
        $.get('http://localhost:3000/upload', function(response) {
          if (response && response.pdf) {
            var pdfUrl = response.pdf;
            pdfh5 = new Pdfh5("#demo", {
              pdfurl: pdfUrl,
              pageNum: false,
              URIenable: false,
              lazy: false,
            });

            // PDF 렌더링의 성공 이벤트 처리
            pdfh5.on("success", function (time) {
              time = time / 1000;
              console.log("pdf rendering completed, total time taken: " + time + " seconds");
            });

          } else {
            console.error('PDF URL을 검색하는 데 실패했습니다.');
          }
        }).fail(function() {
          console.error('GET 요청 수행에 실패했습니다.');
        });
      });
    </script>
  </body>
</html>
```

브라우저가 H5 모드로 전환되었음을 확인하고, http://127.0.0.1:8080/ 로 이동하여 서버 인터페이스에 요청을 보내고, 반환된 PDF 주소가 성공적으로 로드되었습니다:

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

![이미지](/assets/img/2024-06-23-PDFSliceLoadingFullStackSolution_1.png)

# 3. 우선 PDF 조각 렌더링하기

PDF 표시에는 레이어를 다운로드한 후 렌더링이 필요하기 때문에 PDF 파일이 큰 경우 사용자는 대기해야 하는 경우가 많습니다. 이 기다리는 동안에 조각 이미지를 먼저 렌더링한 다음 네트워크를 이용하여 PDF 파일을 조각화합니다. 이렇게 하면 사용자에게 더 친화적입니다. 사용자는 원본 PDF 파일을 표시하며, 복사, 확대 등의 상호 작용을 지원합니다.

slice 맵 컨테이너를 추가하고 .image-list를 만들어 서비스 인터페이스 이미지의 배열에서 가져온이미지 노드 src를 생성하십시오. 먼저 첫 번째 맵을로드한 다음 로드가 성공하면 순서대로 조각 맵을로드하십니다.

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
// index.html

...
<style>
+ .이미지-리스트 {
+       패딩: 12px 8px;
+       z-인덱스: 999;
+     }
+     .이미지-리스트 img {
+       상자-사이징: 테두리-박스;
+       테두리: 없음;
+       패딩: 0;
+       마진: 0;
+       너비: 100%;
+       마진-바텀: 8px;
+       박스-그림자: 어두운회색 0px 1px 3px 0px;
+      }
</style>
...
+  <div class="이미지-리스트"></div>
   <div id="demo"></div>

...
 <script type="text/javascript">
+ const imageList = $(".이미지-리스트");

    $.get("http://localhost:3000/upload", function (response) {
          if (response && response.pdf) {
            var pdfUrl = response.pdf;
+            var images = response.images;
+            loadImageSequentially(images);
...


+function loadImageSequentially(images) {
+        let index = 1;
+        function loadNextImage() {
+          if (index < images.length + 1) {
+            const img = new Image();
+           img.src = images[index];
+           img.onload = function () {
+              index++;
+             loadNextImage(); // 다음 이미지 로드
+            };
+            img.onerror = function (error) {
+             console.error("이미지 로드 실패:", img.src, error);
+             index++;
+              loadNextImage(); // 다음 이미지로 건너뜀
+            };
+           imageList.append(img);
+         }
+        }
+        loadNextImage();
+      }
```

참고: .image-list 노드는 #demo 노드앞에 있어야 첫 화면에서 먼저 PDF 자른 이미지 자원을 볼 수 있습니다. loadImageSequentially 함수는 자른 이미지 자원을 재귀적으로 로드하는 기능을 합니다.

이미지를 로드할 때, 노드는 삭제해야 합니다. image-list

```js
// index.html

pdfh5.on("success", function (time) {
  +imageList.remove();
  time = time / 1000;
  console.log("렌더링 완료: " + time + "초");
});
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

효과:

![이미지](https://miro.medium.com/v2/resize:fit:400/1*vDNwCJmngtkbiZQO6Pu0ZA.gif)

위의 효과를 보면, PDF가 성공적으로 로드되면 분할 이미지가 제거되면서 맨 위로 호출되는 것을 볼 수 있습니다. 이러한 상호 작용은 매우 사용자 친화적이지 않습니다. 이 전환 과정은 스크롤 바 위치를 변경하지 않고 유지해야 합니다:

```js
// index.html

pdfh5.on("success", function (time) {
  const scrollTop = $(window).scrollTop();
  imageList.remove();
  document.querySelector(".viewerContainer").scrollTo(0, scrollTop);
  time = time / 1000;
  console.log("pdf 렌더링 완료, 총 걸린 시간: " + time + "초");
});
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

마지막 효과:

![final effect](https://miro.medium.com/v2/resize:fit:480/1*pgy_ZFs9x3PQwi0V9s_d6g.gif)

마침내 효과를 확인할 수 있습니다. PDF 원본 파일이 PDF 슬라이스 이미지로 대체되면, 프로세스가 매우 부드럽고 사용자는 전환을 거의 느낄 수 없습니다. 이것으로 고성능 PDF 로딩 풀스택 솔루션에 대한 예비 소개를 마칩니다.

# 요약

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

PDF 슬라이스 솔루션에 대한 많은 기사가 있지만, 그 중에서도 다양한 관점에서 자세히 설명하는 것은 많지 않아서 이 기사를 쓰게 되었습니다. 이 기사는 프론트엔드와 백엔드 솔루션 및 공동 디버깅 단계를 주로 설명합니다. 현재 솔루션의 많은 세부 사항이 더 최적화될 수 있습니다. 예를 들어: 슬라이스의 압축, PDF의 총 폭과 높이에 대한 사전 페이지 높이 획득, 이미지의 가상 목록, 애플리케이션의 네이티브 측에서의 로컬 로드, pdfh5 종속성 패키지... 등이 있습니다. 나중에 최적화 솔루션 기사가 공개될 예정이니 기대해 주세요!

소스 코드 주소
