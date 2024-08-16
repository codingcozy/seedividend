---
title: "리액트에서 API를 이용하여 PDF 다운로드하기 (Axios, blobs)"
description: ""
coverImage: "/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_0.png"
date: 2024-05-01 17:30
ogImage: 
  url: /assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_0.png
tag: Tech
originalTitle: "Download PDF from API in React (Using Axios and blobs)"
link: "https://medium.com/javascript-in-plain-english/download-pdf-from-api-in-reactjs-using-axios-and-blobs-699be8a27ca7"
isUpdated: true
---




<img src="/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_0.png" />

리액트를 시작한 초보자이든 전문가이든 새로운 기능을 추가하려는 경우, 이 문서는 "Axios를 사용하여 ReactJS에서 API에서 PDF를 다운로드 하는 방법"을 배우는 데 도움이 될 것입니다. 5 단계로 진행하여 진행하도록 하겠습니다!

추신 : 전체 코드를 보려면 끝 부분으로 건너뛸 수 있습니다. 도움이 되었다면 박수를 눌러주세요 💙

<img src="/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_1.png" />

<div class="content-ad"></div>

현대 웹 애플리케이션에서는 API에서 PDF를 다운로드해야 하는 경우가 많습니다. 사실, 이것은 많은 일상 애플리케이션의 핵심 기능입니다.

Uber를 통해 최근 여행의 청구서를 다운로드하거나 온라인 이력서 템플릿, 이메일에서 노트를 받는 것과 같이 가능합니다.

PayPal은 청구서를 다운로드할 수 있게 해주고, Dropbox은 클라우드 저장소에서 파일을 다운로드할 수 있게 해줍니다. 대학 노트에 대해 이미 알고 계시죠!

![PDF 다운로드하기](/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_2.png)

<div class="content-ad"></div>

ReactJS는 사용자 인터페이스를 구축하기 위한 인기 있는 JavaScript 라이브러리로써 이 프로세스를 용이하게 할 수 있는 다양한 도구와 라이브러리를 제공합니다. HTTP 요청을 보다 간단히 만들어주는 "axios" 라이브러리를 사용하는 것이 일반적입니다.

파일 다운로드에 관한 ReactJS의 강력한 기능 중 하나는 blobs(Binary Large Objects)입니다. Blobs를 사용하면 파일과 같은 이진 데이터를 더 효율적으로 처리할 수 있습니다. Blobs를 활용함으로써 API에서 파일을 쉽게 다운로드하고 원활한 사용자 경험을 제공할 수 있습니다.

이 글에서는 axios와 blobs를 사용하여 ReactJS에서 API로부터 파일을 다운로드하는 단계별 방법을 살펴보겠습니다. 다룰 내용은:

<div class="content-ad"></div>

- 필요한 설정,
- API 요청 만들기,
- 응답 처리,
- 파일 다운로드 트리거 및
- 다운로드 후 정리

이 자습서를 마치면 ReactJS 애플리케이션에서 파일 다운로드 기능을 구현하는 방법에 대해 확실하게 이해하게 될 것입니다. 사용자에게 원활하고 효율적인 파일 다운로드 경험을 제공할 수 있도록 도와줄 것입니다.

# 필요한 설정

프로젝트를 설정하는 것은 axios와 blobs를 사용하여 ReactJS에서 API에서 파일을 다운로드하는 첫 번째 단계입니다. 시작하려면 아래를 따라해주세요:

<div class="content-ad"></div>

- 새로운 ReactJS 프로젝트를 만들거나 기존 프로젝트 디렉토리로 이동하세요.
- 터미널을 열고 다음 명령을 실행하여 axios를 설치하세요:

```js
npm install axios
```

3. axios가 설치되면 React 컴포넌트 파일에서 다음과 같이 import할 수 있습니다:

```js
import axios from 'axios';
```

<div class="content-ad"></div>

4. 다음으로 프로젝트를 위한 기본 파일 구조를 만들어 보겠습니다. 여러분의 요구에 맞게 파일을 조직화할 수 있지만, 간단한 예제를 확인해보세요:

```js
   src/
   ├── components/
   │   └── PDFDownloader.js
   └── App.js
```

이 예에서는 PDF 다운로드 기능을 처리할 FileDownloader 컴포넌트가 있습니다.

5. FileDownloader.js 파일을 열고 컴포넌트를 만들어봅시다. 함수형 컴포넌트를 사용한 예제가 여기 있습니다:

<div class="content-ad"></div>

<img src="/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_4.png" />

원하는 대로 컴포넌트를 사용자 정의해보세요.

이러한 단계를 통해 ReactJS 프로젝트의 기본 구조를 설정하고 axios 라이브러리를 가져왔습니다. 이제 axios와 블롭을 사용하여 API 요청을 보내고 파일을 다운로드할 준비가 되었습니다.

# API 요청 보내기

<div class="content-ad"></div>

API 요청을 하려면 axios.get() 메서드를 사용할 수 있어요. 파일을 blob 객체로 받기 위해 responseType 옵션을 ‘blob’으로 설정해주세요. 예시를 보여드릴게요:

![Download PDF](/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_5.png)

위의 코드 스니펫에서는 downloadPDF라는 비동기 함수를 만들어 GET 요청을 ‘https://ExampleAPI.com/getFile`로 보내고 responseType을 ‘blob’로 지정해요. 응답은 then 블록에서 접근할 수 있고, 파일 데이터를 적절히 처리할 수 있어요. 오류가 발생하면 catch 블록에서 잡을 수 있어요.

이제 파일 데이터가 준비되었으니 API 응답을 처리하고 파일을 다운로드할 준비를 마치면 돼요.

<div class="content-ad"></div>

# API 응답 처리

ReactJS에서 파일 다운로드를 위한 API 응답을 처리할 때, 파일 데이터에 액세스하고 해당 데이터로 blob URL을 생성해야 합니다. 다음은 이를 수행하는 방법입니다:

- 먼저 axios를 사용하여 API 요청을 만들 때 responseType을 'blob'으로 설정한 후, "response.data"를 사용하여 응답의 파일 데이터에 액세스할 수 있습니다. 이를 통해 파일을 나타내는 blob 객체를 얻을 수 있습니다.

![이미지](/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_6.png)

<div class="content-ad"></div>

- 다음으로, URL.createObjectURL() 메서드를 사용하여 파일 데이터에서 blob URL을 생성할 수 있습니다. 이 URL은 React 구성 요소에서 다운로드 링크나 버튼을 생성하는 데 사용할 수 있습니다.

![image](/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_7.png)

- 이러한 단계를 따르면 API 응답을 효과적으로 처리하고 ReactJS에서 파일 데이터에 액세스할 수 있습니다. 따라서 우리의 함수는 이제 다음과 같습니다:

![image](/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_8.png)

<div class="content-ad"></div>

# 파일 다운로드 트리거

- 파일을 다운로드하기 위해 버튼을 만들겠습니다. 사용자가 클릭하면 pdf가 사용자의 시스템으로 다운로드됩니다. 다음과 같이 할 수 있습니다:

```js
<button onClick={downloadPDF}>Download PDF</button>
```

- 이제 임시 URL을 만들고 다운로드를 트리거할 `a` 태그를 만들어봅시다. 여기서 파일에 동적 이름이나 제네릭 파일 이름을 줄 수도 있습니다. 그런 다음 `a` 태그를 버튼에 추가하고 클릭을 활성화해야 합니다.

<div class="content-ad"></div>

![그림 1](/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_9.png)

- 메모리가 해제되도록 링크와 URL을 제거하세요. 그렇지 않으면 더 많은 파일을 추가할수록 웹사이트가 느려질 수 있습니다.

![그림 2](/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_10.png)

# 보너스: 전체 코드

<div class="content-ad"></div>

기사를 건너뛰지 않고 여기로 바로 넘어오지는 않았겠죠? 그렇다면 왜 이렇게 했는지 이해할 수 없으실 거에요 😂

만약 건너뛰셨다면 괜찮아요, 중요한 건 이해하시는 거니까요. 그럼, 여기 있어요:

![이미지](/assets/img/2024-05-01-DownloadPDFfromAPIinReactUsingAxiosandblobs_11.png)

```js
import react from 'react';
import axios from 'axios';

const FileDownloader = () => {

  const downloadPdf = async () => {
      try {
        const response = await axios.get(
          "https://ExampleAPI.com/getFile",
          {
            responseType: "blob", 
          }
        );

        const pdfBlob = new Blob([response.data], { type: "application/pdf" });

        const url = window.URL.createObjectURL(pdfBlob);

        const tempLink = document.createElement("a");
        tempLink.href = url;
        tempLink.setAttribute(
          "download",
          `bill_${User_Id}_${date}.pdf`
        );

        document.body.appendChild(tempLink);
        tempLink.click();

        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };

  return (
      <button onClick={downloadPDF}>PDF 다운로드</button>
  );
}

export default FileDownloader;
```

<div class="content-ad"></div>

이제 이 컴포넌트를 원하는 곳에 렌더링할 수 있습니다. 앞서 언급한 파일 구조에 따라 App.js에서 렌더링하면 잘 작동할 것입니다!

# 결론

본 문서에서는 ReactJS에서 axios와 블롭을 사용하여 API에서 PDF를 다운로드하는 방법에 대한 포괄적인 안내를 제공했습니다.

프로젝트 설정, API 요청 만들기, 응답 처리, 파일 다운로드 트리거, 그리고 다운로드 후 정리하는 단계별 프로세스를 다루었습니다.

<div class="content-ad"></div>

위에서 제공된 코드 조각과 설명을 따라하면 ReactJS 애플리케이션에서 파일 다운로드 기능을 구현하는 방법에 대해 확실한 이해를 얻을 수 있을 것입니다. axios와 blobs의 조합을 사용하면 사용자에게 원활하고 효율적인 파일 다운로드 경험을 제공할 수 있습니다.

더 탐구하고 파일 다운로드 프로세스를 향상시키기 위한 다양한 방법을 실험해 보기를 권장합니다. 오류 처리 구현, 최선의 방법 적용, 스트리밍 또는 청크 다운로드를 탐색하여 응용 프로그램의 성능을 최적화하는 등을 고려해 보세요.

질문이 있거나 다른 기능에 대한 안내를 요청하고 싶으시면 아래에 댓글을 남겨주세요. 여러분의 피드백은 귀중하며, 여러분의 요구를 충족하는 콘텐츠를 제공하기 위해 항상 열려 있습니다.

읽어 주셔서 감사합니다. 즐거운 코딩되세요!

<div class="content-ad"></div>

환호 🥂

# 쉽게 이해하는 영어로 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 저자를 클랩하고 팔로우해주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기