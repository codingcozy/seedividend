---
title: "이미지에서 표를 JSON으로 추출하는 GPT-4 사용 방법"
description: ""
coverImage: "/assets/img/2024-06-23-ExtractingTablesfromImagestoJSONUsingGPT-4_0.png"
date: 2024-06-23 13:17
ogImage: 
  url: /assets/img/2024-06-23-ExtractingTablesfromImagestoJSONUsingGPT-4_0.png
tag: Tech
originalTitle: "Extracting Tables from Images to JSON Using GPT-4🖐️"
link: "https://medium.com/@akashkhurana28/extracting-tables-from-images-to-json-using-gpt-4-%EF%B8%8F-2a2cbbbf1773"
---


<img src="/assets/img/2024-06-23-ExtractingTablesfromImagestoJSONUsingGPT-4_0.png" />

OpenAI는 모든 인류에 이익을 제공하는 인공 일반 지능(AGI)을 보장하기 위해 헌신하는 선구적인 인공 지능 연구 기관입니다. 2015년 12월 일론 머스크, 샘 알트만, 그리고 다른 유명한 기술 리더들에 의해 설립된 OpenAI는 안전하고 높은 능력을 가진 AI 시스템을 만드는 것을 목표로 합니다.

GPT(생성 사전 학습 트랜스포머)는 OpenAI가 개발한 일련의 언어 모델로, 인간과 유사한 텍스트를 이해하고 생성하는 데 사용됩니다. GPT-1부터 시작해 각 버전은 규모, 정확도, 성능 면에서 점진적으로 개선되었습니다. GPT-2는 더 긴 단락을 통해 일관된 및 맥락에 맞는 텍스트를 생성할 수 있는 능력을 보여주었으며, GPT-3는 1750억 개의 매개변수로 이를 크게 확장하여 극소량의 훈련으로 여러 언어 작업을 수행할 수 있는 능력을 가졌습니다.

최신 버전인 GPT-4는 더 높은 정확도, 일관성, 다재다능성을 가진 이러한 능력을 더욱 향상시킵니다. 이는 콘텐츠 생성부터 고객 서비스, 복잡한 문제 해결까지 다양한 응용 분야에서 뛰어난 성과를 내며, AI 기술의 주요 발전을 대표합니다.

<div class="content-ad"></div>

## 실제 시나리오

우리의 목표는 이미지에서 테이블 데이터를 읽어와 Node.js를 사용하여 JSON으로 변환하는 것입니다.

입력:

![이미지](/assets/img/2024-06-23-ExtractingTablesfromImagestoJSONUsingGPT-4_1.png)

<div class="content-ad"></div>

이상적인 결과는

```js
 message: {
      role: 'assistant',
      content: "이미지에서 인간이 읽을 수 있는 JSON 형식으로 상세 정보를 보여드립니다:\n" +
        '\n' +
        'json\n' +
        '{\n' +
        '  "transactions": [\n' +
        '    {\n' +
        '      "date": "01-04-2023",\n' +
        '      "particulars": "B/F",\n' +
        '      "cheque_no": "",\n' +
        '      "withdrawals": 0.00,\n' +
        '      "deposits": 0.00,\n' +
        '      "autosweep": 0.00,\n' +
        '      "reverse_sweep": 0.00,\n' +
        '      "balance": "35,024.54 잔액"\n' +
        '    },\n' +
        ...
        '    {\n' +
        '      "date": "29-04-2023",\n' +
        '      "particulars": "UPI/311976583935/Net Bank/8460615089@ybI/Karur Vysya",\n' +
        '      "cheque_no": "",\n' +
        '      "withdrawals": 0.00,\n' +
        '      "deposits": 5,000.00,\n' +
        '      "autosweep": 0.00,\n' +
        '      "reverse_sweep": 0.00,\n' +
        '      "balance": "21,104.54 잔액"\n' +
        '    }\n' +
        '  ],\n' +
        '  "totals": {\n' +
        '    "withdrawals": 27600.00,\n' +
        '    "deposits": 13680.00,\n' +
        '    "autosweep": 0.00,\n' +
        '    "reverse_sweep": 0.00,\n' +
        '    "balance": "21,104.54 잔액"\n' +
        '  }\n' +
        '}\n' +
        ''
    },
```

단계별로 진행해 봅시다:

단계 1: 시스템에 Node.js를 설치하세요.

<div class="content-ad"></div>

Step 2: 새 디렉토리를 만들고 프로젝트를 설정하십시오.

```js
mkdir image-analysis
cd image-analysis
npm init -y
npm install openai
```

Step 3: 새 파일 index.js를 만드세요.

```js
const fs = require("fs");
const OpenAI = require("openai");
//더 나은 보안을 위해 API 키는 .env 파일에 보관하십시오.
const OPENAI_API_KEY = "your-api-key";
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// 이미지를 base64 문자열로 읽는 함수
function encodeImage(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  return imageData.toString('base64');
}

async function main() {
  const imagePath = "path-of-your-image";
  const base64Image = encodeImage(imagePath);

  const response = await openai.chat.completions.create({
    model: "gpt-4o", 
    messages: [
      {
        role: "system",
        content: "이미지의 각 행과 열의 자세한 정보를 인간이 읽기 쉬운 형식의 멋진 JSON 형식으로 공유해 주세요.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: "이 이미지를 분석해 주세요:" },
          { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } },
        ],
      },
    ],
  });

  console.log(response.choices);
}
```

<div class="content-ad"></div>

4단계: 스크립트 실행하기

```js
node index.js
```

출력:

<img src="/assets/img/2024-06-23-ExtractingTablesfromImagestoJSONUsingGPT-4_2.png" />

<div class="content-ad"></div>

최종 솔루션에 도달하기 전 직면한 문제들:

문제 1 - openai.createImage이(가) 함수가 아닙니다
이 문제는 GPT-4에서 createImage 메서드가 사용되지 않기 때문에 발생합니다. OpenAI API에서는 더 이상 이미지를 처리하거나 생성하기 위해 이 메서드를 지원하지 않습니다. 대신, createCompletion 또는 createChatCompletion과 같은 다른 메서드를 사용하여 GPT-4 모델과 상호 작용할 수 있습니다. 이러한 메서드를 사용하면 이미지 데이터를 base64 문자열로 인코딩하여 텍스트 프롬프트 내에서 전달할 수 있습니다.

```js
const response = await openai.createImage({
^

TypeError: openai.createImage is not a function
```

문제 2: openai 버전 4 변환.

<div class="content-ad"></div>

오픈AI의 버전 4 변환 문제와 이전 버전 방법이 작동하지 않는 문제는 버전 간의 기반이 되는 아키텍처 및 API 기능에 중요한 변화가 있기 때문에 발생합니다. 이러한 변화로 인해 호환성 문제가 발생할 수 있으며, 이전 버전과 작동했던 기존 방법 및 통합이 버전 4에서 작동하지 않을 수 있습니다. 결과적으로 개발자들은 기존 방법을 사용하려고 할 때 오류나 예상치 못한 동작을 만날 수 있으며, 이에 대응하기 위해 코드를 업데이트하고 새 버전의 사양 및 모범 사례에 적응해야 할 수도 있습니다.

```js
const { Configuration, OpenAIApi } = require("openai");

// const readline = require("readline");

const configuration = new Configuration({
apiKey: "API_KEY",
});

TypeError: Configuration is not a constructor
at Object. (D:\nodeJS-chatBot\index.cjs:5:23)
at Module._compile (node:internal/modules/cjs/loader:1226:14)
at Module._extensions…js (node:internal/modules/cjs/loader:1280:10)
at Module.load (node:internal/modules/cjs/loader:1089:32)
at Module._load (node:internal/modules/cjs/loader:930:12)
at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
at node:internal/main/run_main_module:23:47
```

이 문제에 대한 해결책을 오픈AI 커뮤니티에서 찾았습니다
https://chatgpt.com/share/b175130a-0d77-465e-8187-59b92590df8b

문제점 3- gpt-4-vision-preview 모델이 더 이상 사용되지 않습니다

<div class="content-ad"></div>


![이미지 추출 표](/assets/img/2024-06-23-ExtractingTablesfromImagestoJSONUsingGPT-4_3.png)

문제 4 - GPT-4로 이미지를 직접 업로드할 수 없어 GPT-3.5-turbo로 전환해야 하는 이유는, GPT-4가 이미지 데이터 입력을 처리하는 현재 능력 부족 때문입니다. 이 제한으로 인해 GPT-4를 통해 포괄적인 데이터 처리에 의존하는 개발자는 직접 이미지 업로드가 필요한 작업에는 모델을 전환해야 합니다. 이러한 전환은 작업 흐름을 복잡하게 만들고 개발 복잡성을 증가시키며 두 모델 간 데이터 처리 및 응답 생성에 불일치 가능성을 가져올 수 있습니다. 이러한 중단은 지연을 유발하고 원활한 사용자 경험을 유지하는 데 노력이 더 필요할 수 있습니다.

```js
return new BadRequestError(status, error, message, headers); ^ BadRequestError: 400 'image'가 잘못된 값입니다. 지원되는 값은 'text', 'image_url', 'audio_url'입니다.
const fs = require("fs"); const OpenAI = require("openai");
const OPENAI_API_KEY = ""; const openai = new OpenAI({ apiKey: OPENAI_API_KEY, });
async function main() { const imageData = fs.readFileSync("/home/akash/Downloads/test.png");
const response = await openai.chat.completions.create({ model: "gpt-4o", instructions: "이미지의 각 행과 열에 대한 자세한 정보를 아름답게 JSON 형식으로 공유해주세요.", messages: [ { role: "user", content: [ { type: "text", text: "이 이미지를 분석해주세요:" }, { type: "image", image: imageData }, ], }, ], });
console.log(response.data.result); }
main();
경로 대신 이미지 URL을 제공하십시오: https://www.perfectxl.com/wp-content/uploads/2020/07/pivot-table-excel-source-data.png.webp
```

문제 5: 이미지에서 JSON으로 변환하기 위해 GPT-3.5-turbo를 사용하는 것은 여러 문제를 발생시킬 수 있습니다. 이미지 데이터 처리에 대한 이 모델의 본래 한계로 인해 변환 과정에서 정확성 문제가 발생할 수 있어 JSON 출력물이 불완전하거나 잘못될 수 있습니다.


<div class="content-ad"></div>

# 5 문제 1 해결책

**L’Oreal Paris❌**

**gpt-4o✅**

GPT-4은 로컬 이미지를 효율적으로 Base64 인코딩으로 변환한 다음 데이터를 구문 분석하여 이미지를 JSON으로 변환하는 도구입니다. Base64 인코딩을 사용함으로써 GPT-4은 이미지 데이터가 텍스트 친화적 형식으로 정확하게 표현되어 후속 처리 단계가 간단해지도록 보장합니다. 이 방법을 통해 다른 모델 간 전환을 줄이고 개발 워크플로우를 최적화하여 일관성을 향상시킵니다. 또한 GPT-4의 강건성은 변환 프로세스의 신뢰성과 정확성을 향상시켜 보다 정확한 JSON 출력물을 제공합니다. 이 방식은 코드 유지보수를 간편화할 뿐만 아니라 응용 프로그램 내에서 이미지 데이터를 처리하는 효율성과 효과성을 향상시킵니다.

<div class="content-ad"></div>

GitHub에서 예제 프로젝트를 찾을 수 있어요.

제 글을 읽어 주셔서 감사합니다. 추가로 더 얘기 나 질문이 있으시면 언제든지 연락해 주세요!