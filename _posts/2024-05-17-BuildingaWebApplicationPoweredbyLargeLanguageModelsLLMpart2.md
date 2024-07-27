---
title: "대형 언어 모델LLM을 활용한 웹 어플리케이션 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-BuildingaWebApplicationPoweredbyLargeLanguageModelsLLMpart2_0.png"
date: 2024-05-17 20:49
ogImage: 
  url: /assets/img/2024-05-17-BuildingaWebApplicationPoweredbyLargeLanguageModelsLLMpart2_0.png
tag: Tech
originalTitle: "Building a Web Application Powered by Large Language Models (LLM): part 2"
link: "https://medium.com/@pyrosv/building-a-web-application-powered-by-large-language-models-llm-part-2-2429755c182f"
---


<img src="/assets/img/2024-05-17-BuildingaWebApplicationPoweredbyLargeLanguageModelsLLMpart2_0.png" />

이전 글인 Building a Web Application Powered by Large Language Models (LLM): part 1에서는 ASP.NET Core API를 사용하여 CV 리뷰어 애플리케이션을 위한 견고한 백엔드를 개발했습니다. 웹 스크래핑을 위해 Azure Function을 활용하고 GPT 모델을 통합하여 이력서를 채용 공고와 관련하여 분석했습니다. 이번 글에서는 React 템플릿과 TypeScript를 사용하여 애플리케이션의 프론트엔드를 구축하는 데 초점을 맞출 것입니다. Bootstrap을 사용하여 애플리케이션을 스타일링하여 반응형이며 사용자 친화적인 인터페이스를 제공할 것입니다.

# 요구 사항

- Node.js와 npm이 컴퓨터에 설치되어 있어야 합니다.
- React 및 TypeScript의 기본적인 이해가 필요합니다.
- Bootstrap 스타일링에 대한 이해가 있으면 도움이 됩니다.

<div class="content-ad"></div>

# React 프로젝트 설정하기

Vite를 사용하여 React 프로젝트 초기화: Vite는 React 애플리케이션을 위한 빠르고 최적화된 설정을 제공합니다. TypeScript 템플릿을 이용하여 Vite로 새로운 React 프로젝트를 생성하세요.

```js
npm create vite@latest cv.reviewer.frontend -- --template react-ts
cd cv.reviewer.frontend
```

Bootstrap 설치하기: 프로젝트에 스타일링을 위해 Bootstrap을 추가하세요.

<div class="content-ad"></div>

```js
npm install bootstrap@5.3.0
npm install @types/bootstrap
```

프로젝트 구조: 프로젝트를 컴포넌트, 서비스 및 스타일 폴더로 구성하여 관리를 더욱 편리하게 합니다.

# 부트스트랩 및 전역 스타일 설정

main.tsx에 부트스트랩을 가져오세요: 메인 엔트리 파일에 부트스트랩 CSS를 추가하세요.

<div class="content-ad"></div>

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

글로벌 스타일: styles 폴더에 global.css 파일을 만들어 추가적인 글로벌 스타일을 적용하세요.

```js
body {
  background-color: #f8f9fa;
}
```

# 주요 컴포넌트 구축하기


<div class="content-ad"></div>

FormComponent.tsx를 만들어보세요: 이 컴포넌트는 파일 업로드와 작업 URL 입력을 처리할 겁니다.

```js
import React, { useState } from "react";
import apiClient from "../services/apiClient";

const FormComponent: React.FC = () => {
  const [jobUrl, setJobUrl] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [review, setReview] = useState<string | null>(null);
  const [adSource, setAdSource] = useState<string | null>(null);
  const [title, setJobTitle] = useState<string | null>(null);
  const [description, setJobDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobUrl || !cvFile) {
      alert("작업 URL과 이력서 파일을 모두 제공해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("JobUrl", jobUrl);
    formData.append("CvFile", cvFile);

    setLoading(true);
    try {
      const response = await apiClient.post("/reviewcv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.isSuccess) {
        setReview(response.data.review);
        setJobTitle(response.data.jobDetail.title);
        setJobDescription(response.data.jobDetail.raw);
        setAdSource(response.data.jobDetail.domain);
      }
    } catch (error) {
      console.error("양식 제출 중 오류 발생:", error);
      alert("양식 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">이력서 리뷰어</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jobUrl" className="form-label">
            작업 광고 URL
          </label>
          <input
            type="url"
            className="form-control"
            id="jobUrl"
            value={jobUrl}
            onChange={handleUrlChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cvFile" className="form-label">
            이력서 업로드
          </label>
          <input
            type="file"
            className="form-control"
            id="cvFile"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "처리 중..." : "제출"}
        </button>
      </form>
      {review && (
        <div className="row mt-4">
          <div className="col-md-6 pt-3 border">
            <h2>작업 세부 정보</h2>
            <p>
              <strong>작업 제목:</strong> {title}
            </p>
            <p>
              <strong>광고 출처:</strong> {adSource}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: description || "" }}
              className="border"
            />
          </div>
          <div className="col-md-6 pt-3 border">
            <div dangerouslySetInnerHTML={{ __html: review || "" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
```

주 애플리케이션 컴포넌트 (App.tsx): 주 애플리케이션에 폼 컴포넌트를 통합해보세요

```js
import React from 'react';
import FormComponent from './components/FormComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <FormComponent />
    </div>
  );
};

export default App;
```

<div class="content-ad"></div>

액시오스 서비스를 만들어보세요: 코드 구조화와 재사용성을 위해 apiClient.tsx와 같은 서비스 파일에 API 호출을 중앙 집중화하세요.

```js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
```

# 애플리케이션 테스트 및 실행

개발 서버 실행: 프로젝트 루트 디렉토리 내에서 터미널에서 아래 명령어를 실행하여 리액트 개발 서버를 시작하세요.

<div class="content-ad"></div>

```js
npm run dev
```

애플리케이션 테스트: 브라우저를 열고 http://localhost:5173 또는 터미널에서 제공된 엔드포인트로 이동합니다.

![이미지](/assets/img/2024-05-17-BuildingaWebApplicationPoweredbyLargeLanguageModelsLLMpart2_1.png)

작업 URL을 입력하고 이력서 파일을 업로드한 후 제출 버튼을 클릭하여 테스트해보세요.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-17-BuildingaWebApplicationPoweredbyLargeLanguageModelsLLMpart2_2.png" />

애플리케이션은 백엔드 서비스에 요청을 보내 작업 세부 정보와 이력서 검토를 가져옵니다.

<img src="/assets/img/2024-05-17-BuildingaWebApplicationPoweredbyLargeLanguageModelsLLMpart2_3.png" />

# 결론

<div class="content-ad"></div>

이 기사에서는 React, TypeScript 및 Bootstrap을 사용하여 CV Reviewer 애플리케이션의 프론트엔드를 성공적으로 구축했습니다. 이 애플리케이션은 현대 웹 기술의 통합뿐만 아니라 백엔드 서비스 및 API를 활용하여 원활한 사용자 경험을 만드는 방법을 보여줍니다. 애플리케이션은 사용자 인증, 오류 처리 개선, 여러 이력서 검토용 대시보드 추가 또는 구직 지원서용 커버 레터 생성 기능과 같은 기능을 추가하여 향상 및 확장될 수 있습니다.