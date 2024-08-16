---
title: "Reactjs에서 데이터를 Excel XLSX로 내보내는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoexportdatatoExcelXLSXinReactjs_0.png"
date: 2024-05-12 22:45
ogImage: 
  url: /assets/img/2024-05-12-HowtoexportdatatoExcelXLSXinReactjs_0.png
tag: Tech
originalTitle: "How to export data to Excel XLSX in React.js"
link: "https://medium.com/@gb.usmanumar/how-to-export-data-to-excel-xlsx-in-react-js-8f3ccccba875"
isUpdated: true
---




# 소개

웹 개발의 동적 풍경에서 React.js는 강력한 라이브러리로 강력한 사용자 인터페이스를 구축하는 데 뛰어납니다. 많은 웹 애플리케이션에서 일반적인 요구 사항 중 하나는 데이터를 Excel 형식으로 내보내는 기능입니다. 이 안내서에서는 React.js와 SheetJS 및 File-Saver 라이브러리를 함께 사용하여 이를 원활하게 수행하는 방법을 살펴보겠습니다.

![이미지](/assets/img/2024-05-12-HowtoexportdatatoExcelXLSXinReactjs_0.png)

## SheetJS와 File-Saver를 사용해야 하는 이유?



SheetJS는 엑셀을 포함한 다양한 스프레드시트 형식의 데이터를 구문 분석, 조작 및 작성하는 데 사용할 수 있는 높은 수준의 기능을 제공하는 자바스크립트 라이브러리입니다. 반면에 File-Saver는 브라우저에서 자바스크립트로 생성된 파일을 저장하는 프로세스를 간단하게 만들어 줍니다. 이 두 라이브러리를 함께 사용하면 React.js 애플리케이션에서 데이터를 엑셀 형식으로 직접 내보내는 강력한 솔루션을 제공할 수 있습니다.

## 설치

시작하려면 SheetJS와 File-Saver를 설치해 보겠습니다:

```js
npm install xlsx file-saver
```



## 실행

의존성을 설치한 후 구현부로 넘어가봅시다. "ExcelExport.jsx" 파일을 만들고 아래 코드를 추가해주세요:

```js
import React from 'react';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

const ExcelExport = ({ data, fileName }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <button onClick={exportToExcel}>Excel로 내보내기</button>
  );
}

export default ExcelExport;
```

## 사용법



ExcelExport 컴포넌트를 사용하려면 내보내려는 데이터를 props로 전달하면 됩니다:

```js
import React from 'react';
import ExcelExport from './ExcelExport';

const data = [
  { id: 1, name: 'John Doe', age: 30, profession: 'Developer' },
  { id: 2, name: 'Jane Smith', age: 25, profession: 'Designer' }
];

const App = () => {
  return (
    <div>
      <h1>데이터를 Excel로 내보내기</h1>
      <ExcelExport data={data} fileName="employees" />
    </div>
  );
}

export default App;
```

## 사용자 정의

SheetJS가 제공하는 다양한 기능을 사용하여 워크시트 오브젝트를 조작하여 워크북에 추가하는 전에 Excel 시트를 더 자세히 사용자 정의할 수 있습니다. 이는 추가 시트 추가, 셀 스타일링 및 기타 작업을 포함하며, SheetJS가 제공하는 다양한 기능을 사용하여 가능합니다.



## 결론

React.js 애플리케이션에서 데이터를 Excel 형식으로 내보내는 것은 많은 프로젝트에서 흔한 요구사항입니다. SheetJS와 File-Saver 라이브러리의 기능을 활용하면 이 작업을 매우 간단하게 수행할 수 있습니다. 이 안내서에서 안내된 단계를 따르면 Excel 내보내기 기능을 React.js 애플리케이션에 원활하게 통합하여 사용자가 데이터를 분석하고 조작하는 편리한 방법을 제공할 수 있습니다. 그러니 사용자에게 권한을 부여하고, SheetJS와 File-Saver 라이브러리의 강력한 조합을 통해 개발 워크플로를 간소화하세요!