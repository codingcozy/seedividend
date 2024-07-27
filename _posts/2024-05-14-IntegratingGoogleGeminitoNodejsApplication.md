---
title: "Google Gemini을 Nodejs 애플리케이션에 통합하는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-IntegratingGoogleGeminitoNodejsApplication_0.png"
date: 2024-05-14 10:56
ogImage: 
  url: /assets/img/2024-05-14-IntegratingGoogleGeminitoNodejsApplication_0.png
tag: Tech
originalTitle: "Integrating Google Gemini to Node.js Application"
link: "https://medium.com/@rajreetesh7/integrating-google-gemini-to-node-js-application-e45328613130"
---


<img src="/assets/img/2024-05-14-IntegratingGoogleGeminitoNodejsApplication_0.png" />

# 구글 젬이니란?

구글 젬이니는 구글 AI가 개발한 강력하고 다양한 AI 모델입니다. 젬이니는 텍스트뿐만 아니라 코드, 오디오, 이미지 및 비디오와 같은 다양한 형식에서 작동하고 이해할 수 있습니다. 이는 Node.js 프로젝트에 대한 흥미로운 가능성을 열어줍니다.

이 기사에서는 구글 젬이니를 Node.js 애플리케이션에 통합하는 방법을 안내하겠습니다. 우리는 구글 젬이니 SDK를 사용할 것입니다.



## 준비물

- 개인 컴퓨터에 Node.Js가 설치되어 있어야 합니다.
- API 키 생성을 위한 Google AI Platform 계정이 있어야 합니다.

- Node.Js 버전 18 이상이 필요합니다.
- Node.Js에서 import를 사용하려면 package.json 파일에 "type": "module"을 추가해야 합니다.

# 시작하기



새로운 Node.js 프로젝트를 만들어봅시다. 터미널을 열고 다음 명령어를 실행해주세요:

```js
mkdir google-gemini-nodejs
cd google-gemini-nodejs
npm init -y
```

다음으로, Google Gemini SDK와 dotenv 패키지를 설치해주세요:

```js
npm install @google/generative-ai dotenv
```



## 구글 AI 플랫폼 계정 생성하기

Google Gemini SDK를 사용하려면 API 키가 필요합니다. 구글 AI 플랫폼 웹사이트를 방문하여 새 API를 생성할 수 있습니다.

새 API 키를 만들려면 "Get API Key" 버튼을 클릭하세요. API 키를 획득한 후에는 프로젝트의 루트에 있는 .env 파일에 저장하세요.

```js
API_KEY=YOUR_API_KEY
```



# Google Gemini SDK 설정하기

이제 API 키를 가지고 있으니 Google Gemini SDK를 설정해 봅시다. 프로젝트의 루트에 index.js라는 새 파일을 만들고 아래 코드를 추가해주세요:

## Google Gemini Pro 모델

```js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

const generate = async () => {
  try {
    const prompt = "Tell me about google.";
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    console.log(response.text());
  } catch (error) {
    console.log("response error", error);
  }
};

generate();
```



위 코드에서는 텍스트 생성, 번역, 그리고 멀티턴 텍스트 및 코드 채팅과 같은 자연어 작업을 처리하는 데 뛰어난 성능을 발휘하는 Google Gemini Pro 모델을 사용했습니다. 이는 사용자와 자연어로 상호 작용하는 지능형 시스템을 구축하기에 완벽한 모델입니다.

## Google Gemini Vision Model

```js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();
 
const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.4,
  topP: 1,
  topK: 32,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro-vision",
  geminiConfig,
});
 
const generate = async () => {
  try {
    // 이미지 파일 읽기
    const filePath = "some-image.jpeg";
    const imageFile = await fs.readFile(filePath);
    const imageBase64 = imageFile.toString("base64");
 
    const promptConfig = [
      { text: "이 이미지에 대해 무슨 일이 일어나고 있는지 알려줄 수 있나요?" },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64,
        },
      },
    ];
 
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: promptConfig }],
    });
    const response = await result.response;
    console.log(response.text());
  } catch (error) {
    console.log("응답 오류", error);
  }
};
 
generate();
```

위 코드에서는 이미지의 내용을 기반으로 전체 이미지를 분류하고 이미지에 대한 캡션을 생성하는 Google Gemini Vision 모델을 사용했습니다. 이는 사용자와 자연어로 상호 작용하는 지능형 시스템을 구축하기에 완벽한 모델입니다.



## 어플리케이션 실행하기

어플리케이션을 실행하려면 터미널을 열고 다음 명령어를 실행하세요:

```js
node index.js
```

## 결론



이 글에서는 Google Gemini를 Node.js 어플리케이션에 통합하는 방법에 대해 배웠습니다. 또한 Google Gemini Pro와 Vision 모델을 사용하여 텍스트 및 이미지 캡션을 생성하는 방법도 배웠습니다. GitHub에서 전체 소스 코드를 찾을 수 있습니다.

여기까지입니다. 이 글이 유용했으면 좋겠습니다. 궁금한 점이나 피드백이 있으시다면 댓글 섹션에 공유해주세요. 기꺼이 답변해 드리겠습니다.