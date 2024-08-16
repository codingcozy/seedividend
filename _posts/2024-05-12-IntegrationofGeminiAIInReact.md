---
title: "리액트에서 Gemini AI 통합"
description: ""
coverImage: "/assets/img/2024-05-12-IntegrationofGeminiAIInReact_0.png"
date: 2024-05-12 23:05
ogImage: 
  url: /assets/img/2024-05-12-IntegrationofGeminiAIInReact_0.png
tag: Tech
originalTitle: "Integration of Gemini AI In React"
link: "https://medium.com/@codewithadurintiashok/integration-of-gemini-ai-in-react-8872025088de"
isUpdated: true
---




여러분은 Gemini AI 도구에 대해 알고 계시죠. 친숙하지 않은 분들을 위해 간단히 소개하면, Gemini AI는 Google에서 개발한 AI 도구에요. 이 기사에서는 React 애플리케이션에 Gemini AI를 통합하는 과정을 안내해 드릴게요.

단계 1: React 애플리케이션에 다음 npm 패키지를 설치해 주세요.

```js
npm i @google/generative-ai
```

우리는 응용 프로그램에서 Gemini AI를 사용하기 위해 개발자 API 키가 필요해요. 개발자 API 키를 생성하려면 다음 링크를 클릭하여 한 개 만들어 주세요. 생성되면 애플리케이션에서 더 사용할 수 있도록 안전한 위치에 복사해 두세요.



aistudio.google.com

```js
import { GoogleGenerativeAI } from '@google/generative-ai';
```

위 모듈을 컴포넌트의 최상위 수준에서 가져와서 다음 코드 스니펫을 컴포넌트 내에 붙여넣고 API 키를 전달해주세요.

```js
 const genAI = new GoogleGenerativeAI(
    "API 키"
  );
```



제공된 코드 스니펫에서 우리는 API 키를 전달하여 GoogleGenerativeAI의 인스턴스를 초기화하고 있습니다. 객체를 생성하면 제공하는 기능에 액세스할 수 있습니다.

저희 Gemini AI는 우리의 질문에 답변하고 응답하는 기능을 제공합니다. Gemini AI와 소통하기 위해 간단히 입력 메시지, 즉 프롬프트를 제공하면 됩니다.

```js
  const [inputValue, setInputValue] = useState(''); 


   const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

<input
       type="text"
       value={inputValue}
       onChange={handleInputChange}
       placeholder="Ask Me Something You Want"
       className="input-field"
     />
```

위 코드 스니펫에서는 사용자로부터 입력을 받아와서 변수처럼 상태로 업데이트하는 inputValue라는 것을 읽고 있습니다.



```js
const [promptResponses, setPromptResponses] = useState([]);

const getResponseForGivenPrompt = async () => {
try{
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(inputValue);
  const response = await result.response;
  const text = await response.text();
  setPromptResponses([
    ...promptResponses,
    text
  ]);
}
catch(error){
  console.log("Something Went Wrong");
}
};

<button onClick={getResponseForGivenPrompt}>Send</button>
```

'전송' 버튼을 클릭하면 inputMessage 또는 Your Prompt를 입력한 후 getResponseForGivenPrompt라는 함수가 호출됩니다. 이 함수에서는 모델을 얻고 generateContent 메소드를 호출하여 해당 메소드에 프롬프트 또는 inputMessage를 전달합니다. 이 메소드는 우리의 Prompt 또는 input Message에 대한 내용이나 답변을 생성합니다. 그 결과는 promptResponses라는 상태 변수에 업데이트됩니다.

```js
{promptResponses.map((promptResponse, index) => (
  <div key={index} >
    <div >{promptResponse}</div>
  </div>
))}
```

위 코드 스니펫은 `promptResponses` 배열을 반복하며 각 응답을 UI에 표시합니다.




여기에 완전한 코드가 있어요.

```js
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function GeminiInReact() {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setpromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(
    "API KEY"
    // 여기에 당신의 API 키를 넣어주세요
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true)
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      setInputValue('')
      const response = result.response;
      const text = response.text();
      console.log(text)
      setpromptResponses([...promptResponses, text]);

      setLoading(false)
    } catch (error) {
      console.log(error)
      console.log("문제가 생겼어요");
      setLoading(false)
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="물어보고 싶은 것을 말해주세요"
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <button onClick={getResponseForGivenPrompt} className="btn btn-primary">전송</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">로딩중...</span>
            // 당신의 질문에 대한 답변이 생성되는 동안에 표시되는 메시지
          </div>
        </div>
      ) : (
        promptResponses.map((promptResponse, index) => (
          <div key={index}>
            <div className={`response-text ${index === promptResponses.length - 1 ? 'fw-bold' : ''}`}>{promptResponse}</div>
            // 가장 최근 응답이 굵게 표시됩니다
          </div>
        ))
      )}
    </div>
  );
}

export default GeminiInReact;
```

<img src="/assets/img/2024-05-12-IntegrationofGeminiAIInReact_0.png" />

의문점이 있으시면 이 게시물에 댓글을 달아주세요, 답변해 드릴게요 :)



---Ashok Adurinti