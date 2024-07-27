---
title: "React를 사용하여 파일 업로더 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingaFileUploaderwithReact_0.png"
date: 2024-05-12 18:54
ogImage: 
  url: /assets/img/2024-05-12-BuildingaFileUploaderwithReact_0.png
tag: Tech
originalTitle: "Building a File Uploader with React"
link: "https://medium.com/@blessingmba3/building-a-file-uploader-with-react-11dba6409480"
---


<img src="/assets/img/2024-05-12-BuildingaFileUploaderwithReact_0.png" />

파일 업로드는 이미지, 비디오 및 파일을 웹 서버에 올리는 과정입니다. 이는 클라이언트 기기의 사용자가 파일을 서버에 업로드하려는 것을 의미합니다. 파일을 웹 애플리케이션에 신속하고 효율적으로 업로드하는 능력은 중요합니다.

React는 개발자가 상호 작용적이고 원활한 웹 애플리케이션을 구축하는 데 도움이 되는 인기 있는 JavaScript 프레임워크입니다. 이 글은 React를 사용하여 파일을 업로드하는 방법에 대한 단계별 가이드를 제공할 것입니다.

파일 업로드의 중요성



- 파일 업로드는 데이터 수집을 효율적이고 편리하게 해주는 과정을 제공합니다.
- 페이스북, 트위터, 인스타그램 등 소셜 미디어 플랫폼들은 사용자 생성 콘텐츠에 크게 의존하고 있습니다. 파일 업로더 없이는 사용자가 사진, 비디오 및 기타 파일을 업로드할 수 없어 이러한 플랫폼이 상호작용이 적고 따분하며 매력이 부족해질 것입니다.
- 파일 업로드는 오류 발생 가능성이 있고 수동 데이터 수집 및 처리와 비교하여 시간을 절약합니다.
- 파일 업로드 기능이 없다면 Dropbox 및 Google 드라이브와 같은 클라우드 저장소 서비스가 존재하지 않았을 것입니다. 이러한 애플리케이션들은 사용자가 파일을 원활하게 업로드, 저장 및 공유할 수 있도록 돕습니다.

문서 공유, 이력서 업로드, 데이터 가져오기 또는 내보내기, 미디어 공유, 클라우드 저장소 서비스 등에서 파일 업로더가 사용됩니다.

React.js에서 기본 파일 업로드 구성 요소 만들기

이는 'file' 유형의 입력을 포함한 양식을 생성하는 것을 포함합니다. 간단한 예제는 아래에 표시되어 있습니다.



```js
import React from 'react';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    // formData 객체 생성
    const formData = new FormData();

    // formData 객체 업데이트
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // 업로드된 파일의 세부 정보 출력
    console.log(this.state.selectedFile);

    // 백엔드 API로 요청 전송
    // formData 객체 전송
    // axios.post("api/uploadfile", formData);
  };

  render() {
    return (
      <div>
        <h3>React를 이용한 파일 업로드!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            업로드!
          </button>
        </div>
      </div>
    );
  }
}

export default FileUpload;
```

이 예제에서는 컴포넌트의 selectedFile 상태가 사용자 입력으로부터 파일 객체를 보유합니다. 사용자가 파일을 선택하면 onFileChange 함수가 트리거되어 선택한 파일로 selectedFile 상태를 업데이트합니다.

사용자가 `업로드` 버튼을 클릭하면 onFileUpload 함수가 트리거됩니다. 이 함수는 FormData 객체를 생성하고 선택한 파일을 추가합니다. FormData 객체는 그 후 HTTP 요청을 사용하여 서버에 전송할 수 있습니다.

이 예제에서는 파일 세부 정보를 콘솔에 로깅하는 것만 있습니다. 실제 시나리오에서는 formData를 서버로 전송하기 위해 axios.post 함수를 사용할 것입니다.



# 파일 업로더 핸들러

React 파일 업로더 핸들러를 작성하는 것은 몇 가지 단계를 포함합니다. 이러한 단계는 다음과 같습니다:

- 파일 입력 요소(`input type="file"`)를 포함하는 컴포넌트를 만듭니다. 이 컴포넌트를 통해 사용자가 업로드하려는 파일을 선택할 수 있습니다.

```js
import React from 'react';

function FileUploadHandler() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // 파일 처리
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default FileUploadHandler;
```



위 코드에서 `FileUploadHandler` 컴포넌트는 파일 입력 요소를 포함하고 있습니다. onChange 이벤트 핸들러는 사용자가 파일을 선택했을 때 트리거됩니다.

- 파일 변화 이벤트 처리

필요한 경우 유효성 검사를 이 지점에서 수행할 수 있습니다. 이벤트를 통해 선택한 파일에는 event.target.files[0]로 액세스할 수 있습니다. 이 예제에서는 이미지는 PNG 또는 JPEG여야 하며 1MB를 초과해서는 안 되며, 그렇지 않으면 경고 메시지가 표시되거나 일찍 반환됩니다.

```js
const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    alert('PNG 또는 JPEG 이미지 파일을 선택해주세요.');
    return;
  }

  if (file.size > 1024 * 1024) {
    alert('파일 크기는 1MB를 초과할 수 없습니다.');
    return;
  }

  // 추가 처리 또는 파일 업로드 수행
};
```



- 파일 업로드하기 (백엔드 연동)

서버에 파일을 업로드하기 위해 HTTP 요청을 보내야 합니다. Fetch API나 Axios 라이브러리를 사용하여 요청을 처리할 수 있습니다. 이 예시에서는 Axios를 사용할 것입니다.

- 아래 명령어를 실행하여 Axios를 설치하세요

```js
npm install axios --save
```



- 이 예제에서는 선택한 파일을 FormData 객체에 래핑하여 /api/upload 엔드포인트로 POST 요청을 보내는 데 Axios를 사용하고 있습니다. 이를 통해 파일 및 기타 양식 데이터를 전송할 수 있습니다. /api/upload 엔드포인트의 서버 측 구현은 백엔드 기술에 따라 다를 것입니다.

```js
import axios from 'axios';

// ...

const handleFileChange = (event) => {
  const file = event.target.files[0];
  
  // FormData 객체 생성
  const formData = new FormData();
  formData.append('file', file);

  // 파일 서버로 전송
  axios.post('/api/upload', formData)
    .then((response) => {
      // 파일 업로드 성공
      console.log(response.data);
    })
    .catch((error) => {
      // 파일 업로드 실패
      console.log(error);
  });
};
```