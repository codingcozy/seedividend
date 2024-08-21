---
title: "리액트에서 여러 파일 업로드를 구현하기(코드 있음)"
description: ""
coverImage: "/assets/img/2024-05-02-HowtoimplementmultiplefileuploadsinReact_0.png"
date: 2024-05-02 00:23
ogImage:
  url: /assets/img/2024-05-02-HowtoimplementmultiplefileuploadsinReact_0.png
tag: Tech
originalTitle: "How to implement multiple file uploads in React?"
link: "https://medium.com/gitconnected/how-to-implement-multiple-file-uploads-in-react-4cdcaadd0f6e"
isUpdated: true
---

<img src="/assets/img/2024-05-02-HowtoimplementmultiplefileuploadsinReact_0.png" />

요즘 많은 웹사이트들이 파일을 업로드할 수 있는 옵션을 가지고 있어요. 대부분은 폼을 통해 이루어져요. 만약 여러분도 이런 기능을 여러분의 웹사이트에 추가하고 싶다면, 여기 왔습니다! 이 글에서는 React에서 여러 파일을 업로드하는 방법을 보여드릴거에요.

이 글에서는 React의 기본 지식을 이미 가지고 있다고 가정하고 설명할 거에요. 그렇지 않다면, React 문서를 참고해서 시작해보세요.

# 설정하기

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

먼저 다음 명령어로 React 앱을 만들어주세요.

```js
create-react-app multiple-file-upload
```

프로젝트에 Bootstrap을 사용했으니 index.html 파일에 다음 CDN을 추가해주세요.

```js
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
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

또는 여기서 부트스트랩 소스 파일을 다운로드할 수도 있습니다.

# 업로드 버튼 생성하기

먼저, 여러 파일을 업로드할 수 있는 파일 형식의 입력란을 만들어보세요. 특정 파일 유형만 허용하려면 accept 속성을 사용하여 허용하려는 파일 유형을 지정할 수 있습니다.

```js
<input id="fileUpload" type="file" multiple accept="application/pdf, image/png" />
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

![이미지](/assets/img/2024-05-02-HowtoimplementmultiplefileuploadsinReact_1.png)

그러나 여러분만의 스타일과 파일 표시 방식을 가진 버튼을 가지는 것이 좋습니다. 따라서 입력란에 display: none 속성을 추가하고 레이블을 사용하여 레이블을 입력란과 바인딩하여 그 기능을 복제할 수 있도록 하세요.

```js
<label htmlFor="fileUpload">
  <a className="btn btn-primary"> 파일 업로드 </a>
</label>
```

이 레이블 내에서 원하는 내용을 표시할 수 있습니다. 이 경우에는 간단한 버튼을 사용했습니다. 제가 버튼 대신 a를 사용하고 bootstrap 클래스를 적용했음을 유의하세요.

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

지금, 입력을 숨기고 파일을 표시하는 고유한 방식을 채택한 이유는 기본 기능에 일부 제한이 있기 때문입니다. 여러 파일을 업로드할 때, 파일 수만 표시되며 다시 업로드하려고 하면 업로드된 파일들이 대체됩니다.

# 여러 파일 업로드 다루기

지금까지 위에서 설명한 제한 사항을 가지고 여러 파일을 업로드할 수 있는 정적 업로드 버튼이 있습니다.

어떤 경우에는 문제가 되지 않을 수 있지만, 사용자가 한꺼번에 모든 파일을 선택할 수 없는 경우는 어떻게 할까요? 모든 파일이 서로 다른 폴더에 있는 경우는 어떻게 할까요?

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

상기한 제약사항에 따라 사용자는 먼저 모든 파일을 동일한 폴더로 가져와 한꺼번에 모두 업로드해야 합니다. 이것은 귀찮은 작업이며, 우리의 임무는 최종 사용자를 위해 일을 더 쉽게 만드는 것입니다. 어떻게 그것을 할 수 있는지 살펴보겠습니다.

## 파일 업로드 이벤트 처리

파일 업로드 이벤트를 처리하려면 onChange 속성을 추가하여 콜백 함수 handleFileEvent를 사용하는 입력란에 추가하십시오.

```js
const handleFileEvent =  (e) => {
    --- 여기서 파일 업로드 이벤트 처리 ---
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

이 함수는 이벤트 객체를 인수로 사용하며 이벤트의 여러 속성을 포함합니다. 또한 이벤트에 업로드된 파일도 포함됩니다. 이 파일들은 e.target.files를 사용하여 액세스할 수 있습니다.

이 파일들은 배열과 비슷한 객체 형태로 저장됩니다.

![이미지](/assets/img/2024-05-02-HowtoimplementmultiplefileuploadsinReact_2.png)

## 업로드된 파일을 상태로 저장하기

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

현재 업로드된 파일 목록을 저장하기 위한 상태 uploadedFiles를 생성하세요. 처음에는 빈 상태여야 합니다.

```js
const [uploadedFiles, setUploadedFiles] = useState([]);
```

저희의 상태 uploadedFiles는 배열이지만 event.target.files는 객체이기 때문에 이를 배열로 변환해야 합니다. 배열 모양의 객체를 배열로 변환하는 방법이 있습니다. handleFileEvent 메서드 내에서 이 작업을 수행해주세요.

```js
const chosenFiles = Array.prototype.slice.call(e.target.files);
handleUploadFiles(chosenFiles);
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

현재 이벤트에서 업로드되고 있는 파일이 chosenFiles에 포함되어 있습니다.

이제 handleUploadFiles 메서드 내에서 선택한 파일을 인수로 받아 상태에 이 파일들을 추가해보겠습니다.

```js
const handleUploadFiles = files => {
   --- 상태에 파일 추가하기 ---
}
```

우선, 상태 배열의 사본을 만들어 현재 선택된 파일을 해당 배열에 추가해주세요. 이유를 설명하기 위해 forEach 대신 some() 메서드를 사용했습니다.

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
const uploaded = [...uploadedFiles];
files.some((file) => {
  uploaded.push(file);
});
```

반복문이 끝나면 상태 배열을 업데이트합니다. 비동기 작업이므로 상태 업데이트는 마지막에 수행됩니다.

```js
setUploadedFiles(uploaded);
```

## 파일이 이미 존재하는지 확인하기

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

동일한 파일을 여러 번 업로드하는 것을 원치 않는다면, 파일을 업로드된 목록에 추가할 때 다음 조건을 추가하세요.

```js
if (uploaded.findIndex((f) => f.name === file.name) === -1) {
  uploaded.push(file);
}
```

findIndex 메서드는 현재 추가되고 있는 파일과 같은 이름을 가진 파일을 uploaded 내에서 찾습니다.

## 업로드할 파일 수 제한

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

가끔 사용자가 업로드할 수있는 파일 수를 제한해야하는 상황이 발생할 수 있습니다. 선택된 파일의 수를 확인하는 것은 업로드 이벤트 중이나 양식을 제출하는 동안에도 수행할 수 있습니다. 저는 업로드 이벤트 중에이 작업을 수행하는 방법을 안내해 드리겠습니다.

먼저, 사용자가 파일 업로드 제한에 도달했는지를 나타내는 상태 변수를 만듭니다. 기본값은 false입니다.

```js
const [fileLimit, setFileLimit] = useState(false);
```

이제 handleUploadFiles 함수 내에서 로컬 변수 limitExceeded를 만들고 false로 초기화하세요.

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

파일을 업로드된 배열에 푸시하는 동안 다음 조건을 추가하세요.

```js
if (uploaded.length === MAX_COUNT) setFileLimit(true);
if (uploaded.length > MAX_COUNT) {
    --- 제한이 초과된 경우 ---
}
```

현재 최대 제한은 MAX_COUNT = 5 입니다. 업로드된 파일의 수가 이 제한에 도달하면 상태를 업데이트해야 합니다. 그러나 여기에 그치지 말고, 사용자가 언제든지 여러 파일을 업로드할 수 있기 때문에 제한 초과 조건도 추가해야 합니다.

이미 업로드된 파일 수와 현재 선택한 파일 수가 제한을 초과하는 상황을 위한 논리는 다음과 같습니다.

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
setFileLimit(false);
limitExceeded = true;
return true;
```

제한을 초과했을 경우, 사용자가 단일 파일을 추가하지 못하도록 합니다. 제한이 이전 상태로 돌아간 것이므로 fileLimit를 false로 설정합니다.

forEach 대신에 some을 사용한 이유는 선택한 파일의 수가 제한을 초과할 경우 사용자가 파일을 업로드하는 것을 허용하고 싶지 않기 때문입니다. 이를 위해 반복문을 이 시점에서 중단해야 했습니다. forEach 루프를 중단하는 것은 거의 불가능하기 때문에 some 메서드를 사용했습니다.

some() 메서드는 배열의 요소 중 일정 조건을 충족하는지 확인하는 데 사용됩니다. 만약 요소가 조건을 충족하면 true를 반환하고 루프를 중단합니다. 따라서 루프를 중단하기 위해 함수에서 true를 반환했습니다.

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

만약 파일을 과도하게 업로드하는 것을 방지하기 위한 다른 로직을 떠올릴 수 있다면 아래 댓글로 남겨주세요.

업로드된 파일 상태를 업데이트할 때, 한도를 초과했는지 확인하세요.

```js
if (!limitExceeded) setUploadedFiles(uploaded);
```

한도에 도달하면 버튼을 비활성화하려면 입력 필드에 disabled = fileLimit를 설정하고 버튼에 disabled 클래스를 추가하세요.

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
<a className={`btn btn-primary ${!fileLimit ? "" : "disabled"} `}>업로드 파일</a>
```

# 업로드된 파일 표시

이 부분은 매우 간단합니다. 업로드 버튼 이후에 파일 이름을 표시하기만 하면 됩니다.

```jsx
<div className="uploaded-files-list">
  {uploadedFiles.map((file) => (
    <div>{file.name}</div>
  ))}
</div>
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

파일을 아이콘과 스타일된 텍스트를 사용하여 다양한 방식으로 표시할 수 있어요. 지금은 파일 이름 목록만 간단히 표시했답니다. 또한 div 요소에 key prop을 추가하지 않았어요. React가 경고를 표시하니, 요소 목록을 렌더링할 때 꼭 추가해 주세요.

# 마무리

마침내, 이렇게 생긴 App 컴포넌트가 되었어요.

![App Component](/assets/img/2024-05-02-HowtoimplementmultiplefileuploadsinReact_3.png)

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

이 프로젝트는 GitHub에서 확인하실 수 있습니다. 위 구현은 해당 프로젝트의 수정본입니다. 꼭 확인해보세요.

# 결론

양식을 구현하는 동안 웹사이트에서 사용자로부터 파일을 받아야 할 수도 있습니다. 때로는 기본 기능만으로 요구 사항을 충족시키기 어려울 수 있습니다. 그래서 귀하만의 기능을 추가해야 합니다.

이 글에서 React에서 이를 구현하는 방법을 안내했습니다. 구현의 각 단계를 설명했습니다. 이것이 귀하의 미래 프로젝트에 도움이 되기를 바라겠습니다. 물론 이 기능을 구현하는 다양한 방법이 있을 수 있습니다. 이 구현에 개선할 점이 있다면 아래에 의견을 남겨주십시오.

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

만약 내용을 이해하지 못하거나 설명이 마음에 들지 않는다면 의견을 남겨주세요. 새로운 아이디어는 언제나 환영합니다! 이 게시물이 마음에 들었다면 박수 👏👏를 보내주세요. 매주 업데이트되는 컨텐츠를 위해 구독하고 팔로우해주세요. 논의할 주제가 있다면 트위터에서 연락해주세요. 그럼, 안녕히 계세요!!
