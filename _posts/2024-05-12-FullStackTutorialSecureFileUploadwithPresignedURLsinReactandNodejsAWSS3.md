---
title: "풀 스택 튜토리얼 React와 NodejsAWS S3에서 사전 서명된 URL로 안전한 파일 업로드하기"
description: ""
coverImage: "/assets/img/2024-05-12-FullStackTutorialSecureFileUploadwithPresignedURLsinReactandNodejsAWSS3_0.png"
date: 2024-05-12 19:03
ogImage: 
  url: /assets/img/2024-05-12-FullStackTutorialSecureFileUploadwithPresignedURLsinReactandNodejsAWSS3_0.png
tag: Tech
originalTitle: "Full Stack Tutorial: Secure File Upload with Presigned URLs in React and Node.js (AWS S3)"
link: "https://medium.com/dev-genius/full-stack-tutorial-secure-file-upload-with-presigned-urls-in-react-and-node-js-aws-s3-2eb2643b168c"
---


안녕하세요! 안전한 파일 업로드 시스템을 구축하는 방법에 대한 포괄적인 자습서에 오신 것을 환영합니다. 이 가이드에서는 React 프런트엔드 설정부터 Node.js 백엔드(Express 사용) 생성 및 안전한 저장소로 AWS S3를 활용하는 전체 프로세스를 안내해 드릴 것입니다.

![이미지](/assets/img/2024-05-12-FullStackTutorialSecureFileUploadwithPresignedURLsinReactandNodejsAWSS3_0.png)

## 왜 Presigned URLs를 사용해야 하는가?

기존 파일 업로드 시스템에서는 클라이언트가 서버를 통해 파일을 전달하고, 서버가 해당 파일을 저장소에 업로드하는 방식으로 작동합니다. 이 방법은 작동은 하지만 대용량 파일 처리 시 효율적이거나 안전하지 않을 수 있습니다. 여기서 Presigned URLs가 등장합니다.



**사전 서명된 URL**을 사용하면 클라이언트가 스토리지 제공 업체, 이 경우 AWS S3와 직접 상호 작용할 수 있습니다. 백엔드는 클라이언트에게 시간 제한이 있는 안전한 링크인 사전 서명된 URL을 생성하여 전달합니다. 클라이언트는 서버가 파일 데이터를 처리하지 않고도 파일을 S3에 직접 업로드할 수 있습니다. 이는 서버 부하를 줄이는 것뿐만 아니라 스토리지 자격 증명의 노출을 제한하여 보안을 강화하는 데 도움이 됩니다.

## 사용된 기술

프론트엔드: React, 백엔드: Node.js와 Express, 스토리지: AWS S3.

## 앞으로의 여정



이 강좌에는 프론트엔드, 백엔드 및 AWS S3 세 가지 주요 섹션이 있습니다.
먼저 프론트엔드 설정부터 시작하여 React 및 AWS S3의 사전 서명 된 URL을 사용하여 강력한 파일 업로드 솔루션을 구축해 보겠습니다!

# 프론트엔드 설정-( 파트 1 )

## 단계 1: React 앱 설정

먼저 Create React App을 사용하여 새 React 앱을 만들어 보겠습니다:



```js
npx create-react-app presigned-url-upload
cd presigned-url-upload
```

## 단계 2: 종속 항목 설치

파일 업로드 처리를 위해 필요한 패키지를 설치하세요:

```js
npm install aws-amplify aws-amplify-react axios react-dropzone
```



## 단계 3: AWS Amplify 구성

프로젝트에 AWS Amplify를 초기화합니다:

```js
amplify init
```

## 단계 4: FileUpload 컴포넌트 생성



새로운 FileUpload.js 컴포넌트를 생성하여 파일 업로드를 처리하세요. 파일 선택을 간단하게 하기 위해 react-dropzone 라이브러리를 사용할 거에요:

```js
// FileUpload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileSelected }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onFileSelected(acceptedFiles[0]);
  }, [onFileSelected]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>여기로 파일을 드래그하거나 클릭하여 파일을 선택하세요</p>
    </div>
  );
};

export default FileUpload;
```

## 단계 5: 사전 서명 URL 로직 구현

백앤드로부터 사전 서명 URL을 가져오는 서비스를 생성하세요. api.js 파일을 업데이트하세요:



```js
// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // 귀하의 백엔드 서버 URL로 변경해주세요

export const getPresignedUrl = async (fileName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/getPresignedUrl`, {
      fileName,
    });
    return response.data.url;
  } catch (error) {
    console.error('사전 서명된 URL을 가져오는 중 오류 발생:', error);
    throw error;
  }
};
```

## 단계 6: 파일 업로드 및 사전 서명된 URL 로직 통합

메인 컴포넌트(App.js)를 업데이트하여 파일 업로드 컴포넌트와 사전 서명된 URL 로직을 통합하세요:

```js
// App.js
import React from 'react';
import FileUpload from './FileUpload';
import { Storage } from 'aws-amplify';
import { getPresignedUrl } from './api';

const App = () => {
  const handleFileUpload = async (file) => {
    try {
      const presignedUrl = await getPresignedUrl(file.name);

      // 사전 서명된 URL을 사용하여 파일을 S3에 업로드
      await Storage.put(file.name, file, {
        contentType: file.type,
        customPrefix: { public: 'public/' },
        level: 'public',
      });

      console.log('파일이 성공적으로 업로드되었습니다!');
    } catch (error) {
      console.error('파일 업로드 처리 중 오류 발생:', error);
    }
  };

  return (
    <div className="App">
      <h1>AWS S3와 함께 사전 서명된 URL 파일 업로드</h1>
      <FileUpload onFileSelected={handleFileUpload} />
    </div>
  );
};

export default App;
```



# 백엔드 설정 - (파트 2)

## 단계 1: Node.js 프로젝트 설정

이제 백엔드 설정으로 전환해 볼까요? 백엔드를 위한 새 디렉토리를 만들어보세요:

```js
mkdir backend
cd backend
npm init -y
npm install express aws-sdk
```



## 단계 2: AWS SDK 구성하기

AWS SDK를 구성하기 위해 awsConfig.js라는 새 파일을 생성하세요. `YOUR_ACCESS_KEY`와 `YOUR_SECRET_KEY`를 여러분의 AWS 액세스 키와 시크릿 키로 교체하세요. `YOUR_ACCESS_KEY`와 `YOUR_SECRET_KEY`를 어떻게 생성하는 지는 이후 Part -3에서 다룰 예정입니다.

```js
// awsConfig.js
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_KEY',
  region: 'us-east-1', // 원하는 지역으로 교체하세요
});

module.exports = AWS;
```

## 단계 3: Express 서버 생성하기



새 파일을 만들어서 server.js라고 이름 짓고 Express 서버를 설정하고 사전 서명된 URL 요청을 처리하세요.

```js
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { S3 } = require('./awsConfig');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// 실제 S3 버킷 이름으로 'your-bucket-name'을(를) 바꿔주세요.
const BUCKET_NAME = 'your-bucket-name';

app.post('/getPresignedUrl', (req, res) => {
  const { fileName } = req.body;

  const s3 = new S3();
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: 'application/octet-stream', // 파일 유형에 따라 콘텐츠 유형을 조정하세요
    Expires: 60, // 사전 서명 URL 만료 시간(초) 설정
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error('사전 서명된 URL 생성 중 오류 발생:', err);
      return res.status(500).json({ error: '사전 서명된 URL 생성 실패' });
    }

    res.json({ url });
  });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
```

## 단계 4: 백엔드 서버 시작하기

다음 명령을 사용하여 백엔드 서버를 실행하세요.



```js
node server.js
```

서버가 http://localhost:3001에서 실행 중이에요. 서버 파일에서 `your-bucket-name`을 실제 S3 버킷 이름으로 교체해주세요.

# AWS S3 설정 - 3부

## 단계 1: AWS 계정 생성하기



AWS 계정이 없으신 경우, 새로 만드셔야 해요. AWS 가입 페이지로 이동하여 계정을 생성해보세요.

## 단계 2: AWS 관리 콘솔에 액세스하기

AWS 관리 콘솔에 로그인해주세요.

## 단계 3: S3으로 이동하기



AWS 관리 콘솔에서 "서비스" 드롭다운을 찾아 클릭해주세요. "저장소" 아래에서 "S3"를 클릭하여 간편 저장소 서비스에 액세스할 수 있어요.

## 단계 4: 새 버킷 만들기

- S3 대시보드에서 "버킷 생성" 버튼을 클릭해주세요.

2. 버킷 구성:
- 이름과 지역: 버킷에 전 세계적으로 고유한 이름을 선택해주세요. 이름은 DNS 호환성이 있어야하며 선택한 이름이 이미 사용 중이면 AWS가 알려줄 거예요. 사용자에게 더 나은 대기 시간을 제공하기 위해 지리적으로 가장 가까운 지역을 선택해주세요.
- 저장 클래스: 요구 사항에 따라 저장 클래스를 선택해주세요. 일반 목적 저장소에 대한 기본 설정이 일반적으로 적합합니다.



3. 설정 옵션 구성하기 (선택사항):
- 사용자의 선호 및 프로젝트 요구에 맞게 버전 관리, 로깅 및 태그 설정을 구성합니다.

4. 권한 설정:
- 버킷에 액세스할 수 있는 사용자를 정의합니다. 간단히 하려면 현재 기본 설정을 유지할 수 있습니다.

5. 검토:
- 설정을 검토하고 "버킷 생성" 버튼을 클릭합니다.

## 단계 5: 버킷 정책 (선택사항)



만약 테스트 목적으로 버킷을 공개하려면 공개 액세스를 허용하는 버킷 정책을 추가할 수 있습니다. 그러나 프로덕션 환경에서는 권장되지 않으므로 데이터 노출의 위험이 있습니다.

- 버킷의 "Permissions" 탭으로 이동합니다.
- "Bucket Policy"를 클릭하고 아래와 유사한 정책을 추가합니다. your-bucket-name을 실제 버킷 이름으로 바꿔주세요.

```js
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

필요에 따라 권한을 조정하여 사용 사례에 맞게 설정하세요.



## 6단계: 액세스 자격 증명

S3 버킷과 프로그래밍적으로 상호 작용하려면 AWS 액세스 키와 비밀 키 자격 증명이 필요합니다.

- AWS 관리 콘솔에서 “Services"를 선택한 후 “IAM"(Identity and Access Management)을 클릭합니다.
- IAM 대시 보드에서 왼쪽 탐색 창에서 “Users"를 클릭합니다.
- 새 사용자를 만들려면 “Add user"를 클릭합니다. 사용자 이름을 제공하고 “Programmatic access"를 선택합니다.
- 사용자에게 “AmazonS3FullAccess" 정책을 부여합니다 (또는 필요에 따라 더 제한적인 정책을 선택할 수 있습니다).
- 사용자를 검토하고 만듭니다. 제공된 액세스 키 ID와 비밀 액세스 키를 저장하세요. 이러한 자격 증명을 안전하게 보관하세요.

이제 AWS에서 S3 버킷을 성공적으로 설정했으며 애플리케이션과 통합하거나 S3 저장소를 활용한 자습서를 따라 진행할 준비가 되었습니다.



# 결론

축하합니다! 안전하게 파일을 AWS S3에 업로드하기 위한 프로젝트의 전체적인 솔루션을 성공적으로 구현했습니다. 이 튜토리얼에서는 React 프론트엔드와 Node.js 백엔드를 AWS S3와 함께 설정하는 방법을 다뤘습니다. 코드를 프로젝트 요구에 맞게 사용자 정의하고, 안전한 파일 업로드 시스템을 배포할 준비가 된 것입니다. 즐거운 코딩하세요.....