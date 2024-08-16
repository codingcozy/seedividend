---
title: "Reactjs에서 Excel XLSX에서 데이터를 가져오는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoimportdatafromExcelXLSXinReactjs_0.png"
date: 2024-06-20 02:15
ogImage: 
  url: /assets/img/2024-06-20-HowtoimportdatafromExcelXLSXinReactjs_0.png
tag: Tech
originalTitle: "How to import data from Excel “XLSX” in React.js"
link: "https://medium.com/@gb.usmanumar/how-to-import-data-from-excel-xlsx-in-react-js-f486a600dc9f"
isUpdated: true
---





![이미지](/assets/img/2024-06-20-HowtoimportdatafromExcelXLSXinReactjs_0.png)

React.js 애플리케이션에서 .xlsx 파일에서 데이터를 가져오려면 JavaScript에서 엑셀 파일을 읽고 쓰는 인기 있는 라이브러리 인 xlsx 를 사용할 수 있습니다. 이 안내서에서는 React.js 애플리케이션에서 .xlsx 파일에서 데이터를 가져 오는 단계를 안내합니다.

## 단계 1: 새로운 React.js 애플리케이션 생성

아직 React.js 애플리케이션을 생성하지 않았다면 Create React App 을 사용하여 새로 만들 수 있습니다.


<div class="content-ad"></div>

```js
npx create-react-app react-xlsx-import
```

## 단계 2: xlsx 라이브러리 설치

프로젝트 디렉토리로 이동하여 xlsx 라이브러리를 설치하세요:

```js
cd react-xlsx-import
npm install xlsx
```

<div class="content-ad"></div>

## 단계 3: 파일 입력 컴포넌트 생성

src 디렉토리에 FileInput.js 파일을 만들고 아래 코드를 추가하여 파일 입력 컴포넌트를 생성하세요:

```js
// src/FileInput.js

import React from 'react';
import * as XLSX from 'xlsx';

function FileInput() {
  const [data, setData] = React.useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      setData(sheetData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {data && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FileInput;
```

## 단계 4: App 컴포넌트 업데이트

<div class="content-ad"></div>

src 디렉토리의 App.js 파일을 업데이트하여 FileInput 컴포넌트를 포함시킵니다:

```js
// src/App.js

import React from 'react';
import './App.css';
import FileInput from './FileInput';

function App() {
  return (
    <div className="App">
      <h1>React.js에서 Excel 데이터 가져오기</h1>
      <FileInput />
    </div>
  );
}

export default App;
```

## 단계 5: 애플리케이션 실행하기

다음 명령어를 사용하여 React.js 애플리케이션을 실행하세요:

<div class="content-ad"></div>

```js
npm start
```

웹 브라우저를 열고 http://localhost:3000 으로 이동하세요. 파일 입력 컴포넌트가 나타날 것입니다. 여기서 .xlsx 파일을 업로드할 수 있습니다. .xlsx 파일을 선택한 후, 가져온 데이터가 파일 입력란 아래에 표시됩니다.

# 결론

React.js 애플리케이션에서 xlsx 라이브러리를 사용하여 .xlsx 파일에서 데이터를 성공적으로 가져왔습니다. 이제 이 예제를 확장하여 가져온 데이터를 처리하고, 테이블에 표시하거나 추가적인 데이터 조작 및 분석을 수행하여 보다 구조화되고 사용자 친화적인 방식으로 표시할 수 있습니다.

<div class="content-ad"></div>

파일 유형을 처리하기 전에 파일 유형을 확인하고, 대용량 파일을 효율적으로 처리하며, 파일 업로드 및 데이터 처리 단계에서 사용자에게 피드백을 제공하는 등 오류와 예외 상황을 적절하게 처리해야 합니다.