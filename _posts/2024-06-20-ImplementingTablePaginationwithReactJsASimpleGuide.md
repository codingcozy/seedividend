---
title: "ReactJs를 사용한 테이블 페이지네이션 구현하기 간단한 안내"
description: ""
coverImage: "/assets/img/2024-06-20-ImplementingTablePaginationwithReactJsASimpleGuide_0.png"
date: 2024-06-20 00:59
ogImage:
  url: /assets/img/2024-06-20-ImplementingTablePaginationwithReactJsASimpleGuide_0.png
tag: Tech
originalTitle: "Implementing Table Pagination with ReactJs : A Simple Guide"
link: "https://medium.com/@imPradhyumn/implementing-table-pagination-with-reactjs-a-simple-guide-ed36469b26e9"
isUpdated: true
---

<img src="/assets/img/2024-06-20-ImplementingTablePaginationwithReactJsASimpleGuide_0.png" />

안녕하세요!

개발자로서 모두가 여행 중에 이러한 시나리오를 만난 적이 있을 거에요. 오랜 데이터가 있고 웹 페이지에 표시할 공간이 제한되어 있거나 표시해도 UI가 약간 느립니다. 그래서, 우리는 이 상황을 다루기 위해 Pagination이라는 기술을 사용합니다.

Pagination이란 무엇인가요?

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

대부분의 UI 프레임워크에서는 테이블과 페이지네이션 기능을 제공하며, 이 포스트에서는 우리만의 방법으로 구현해보고 있습니다. 또한 페이지네이션은 기계 코딩 면접에서 자주 묻는 질문 중 하나입니다.

요구 사항: React 및 CSS의 기본 지식

그러니 이 데모를 만들어 봅시다! (이 GIF에서는 마우스 클릭이 보이지 않습니다)

![데모](https://miro.medium.com/v2/resize:fit:1200/0*EkEwLTBUF_iIa5nL.gif)

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

1. 에디터를 열고 터미널에서 아래 명령을 사용하여 'pagination-demo' 라는 리액트 앱을 생성하세요.

```js
npx create-react-app pagination-demo
```

2. 폴더 구조에서 불필요한 파일을 모두 제거하고 메인 파일인 App.jsx만 남도록 하세요.

3. components라는 폴더를 만들고 그 안에 Demo.jsx, Table.jsx 및 Demo.css 파일을 각각 생성할 수 있습니다.

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

우리는 표를 다른 구성 요소로 분리했습니다.

우리의 데모에서는 https://jsonplaceholder.typicode.com/todos 와 같이 알려진 가짜 REST API에서 데이터를 가져올 것입니다. 해당 API는 길이가 200인 객체 배열을 반환할 것입니다.

- Demo.css

```js
#container {
  display: flex;
  flex-direction: column;
  width: 900px;
  align-items: flex-end;
  gap: 1rem;
  margin-top: 3rem;
  margin-left: 5rem;
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

css
table {
border: 1px solid black;
width: 100%;
}
table tr td {
max-width: 100%;
white-space: nowrap;
overflow: hidden;
}
td,
th {
padding: 5px;
border: 1px solid black;
text-align: center;
}
td:nth-child(2) {
width: 70% !important;
}
#page-no-dropdown {
width: fit-content;
border: 1px solid black;
padding: 2px;
}
select:focus-visible {
outline: none;
border: none;
}
button {
border: 1px solid black;
padding: 2px;
}

2. Table.jsx

이 컴포넌트에서는 부모 컴포넌트로부터 dataToDisplay를 받아옵니다.

테이블 헤더에는 (userId)를 제외한 3가지 헤더 값을 표시합니다. (포함하려면 포함할 수 있습니다). 테이블 본문에는 해당 값들을 표시합니다.

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
export default function Table({ dataToDisplay }) {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(dataToDisplay[0]).map((key) => {
            if (key != "userId") return <th key={key}>{key.toUpperCase()}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataToDisplay.map((obj) => {
          return (
            <tr key={obj.id}>
              <td>{obj.id}</td>
              <td>{obj.title}</td>
              <td>{obj.completed.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
```

3. Demo.jsx.

- 이 컴포넌트에서는 두 개의 버튼을 포함하고 있습니다. 한 버튼은 다음 페이지로 이동하고 다른 하나는 이전 페이지로 이동합니다. 또한 특정 페이지로 이동할 수 있는 셀렉트 드롭다운을 만들었습니다.
- 앞서 말했듯이 API에서 데이터를 가져올 것이기 때문에 useEffect()에서 해당 호출을 수행했으며 모든 값은 setData()를 사용하여 data 변수에 저장됩니다.
- 또한 페이지당 10개의 값만 표시할 것이기 때문에 응답 배열을 0부터 10까지 슬라이스하여 dataToDisplay 변수가 길이가 10인 배열을 가지게 합니다.

```js
const [data, setData] = useState([]);
const [currentPageNumber, setCurrentPageNumber] = useState(1);
const [dataToDisplay, setDataToDisplay] = useState([]);
const TOTAL_VALUES_PER_PAGE = 10;
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

```js
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((res) => {
      setData(res);
      setDataToDisplay(res.slice(0, TOTAL_VALUES_PER_PAGE));
    });
}, []);
```

- 여기에는 총 3개의 함수가 있어요 = `goOnPrevPage(), goOnNextPage(), handleSelectChange()

```js
const goOnPrevPage = () => {
  if (currentPageNumber === 1) return;
  setCurrentPageNumber((prev) => prev - 1);
};
```

```js
const goOnNextPage = () => {
  if (currentPageNumber === data.length / TOTAL_VALUES_PER_PAGE) return;
  setCurrentPageNumber((prev) => prev + 1);
};
const handleSelectChange = (e) => {
  setCurrentPageNumber(e.target.value);
};
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

여기에 또 다른 useEffect가 있어요. currentPageNumber가 의존성으로 설정되어 있어서 페이지 번호가 변경될 때마다 이 블록이 실행되고 데이터 배열을 잘라내어 dataToDisplay를 업데이트할 거예요.

```js
useEffect(() => {
  const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
  const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
  setDataToDisplay(data.slice(start, end));
}, [currentPageNumber]);
```

그리고 마지막으로 렌더링될 UI 코드가 있어요. 여기서 데이터가 가져오는 중이면 '로딩 중...'을 보여주는 조건이 추가되어 있어요.

```js
if (data.length == 0) return <div>Loading...</div>;
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

```js
return (
  <div id="container">
    <div id="page-no-dropdown">
      <select name="page-number" onChange={handleSelectChange} value={currentPageNumber}>
        {Array.from(Array(data.length / TOTAL_VALUES_PER_PAGE))
          .map((e, i) => i + 1)
          .map((val) => {
            return <option key={val}>{val}</option>;
          })}
      </select>
    </div>
    <Table dataToDisplay={dataToDisplay} />
    <div id="btn-container">
      <button onClick={goOnPrevPage}>Prev</button>
      <button onClick={goOnNextPage}>Next</button>
    </div>
  </div>
);
```

```js
{
  Array.from(Array(data.length / TOTAL_VALUES_PER_PAGE))
    .map((e, i) => i + 1)
    .map((val) => {
      return <option key={val}>{val}</option>;
    });
}
```

이 블록은 데이터가 페이지로 나뉘어진 개수만큼 1부터 페이지 번호까지의 배열을 생성합니다.

데모에서 데이터 길이가 200이고 페이지 당 10개의 행을 표시하므로, totalPages = 200/10이므로 20이 됩니다. 따라서 [1,2,3……20]과 같은 배열이 생성되며, 이를 매핑하여 선택 드롭다운의 옵션을 생성합니다.

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

위의 코드를 Markdown 형식으로 변경한 것입니다!

```js
import React, { useEffect, useState } from "react";
import Table from "./Table";
import "./table.css";
```

```js
export default function HomeDashboard() {
  const [data, setData] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 10;
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    if (currentPageNumber === data.length / TOTAL_VALUES_PER_PAGE) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  const handleSelectChange = (e) => {
    setCurrentPageNumber(e.target.value);
  };
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(data.slice(start, end));
  }, [currentPageNumber]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setDataToDisplay(res.slice(0, TOTAL_VALUES_PER_PAGE));
      });
  }, []);
  if (data.length == 0) return <div>Loading...</div>;
  return (
    <div id="container">
      <div id="page-no-dropdown">
        <select name="page-number" onChange={handleSelectChange} value={currentPageNumber}>
          {Array.from(Array(data.length / TOTAL_VALUES_PER_PAGE))
            .map((e, i) => i + 1)
            .map((val) => {
              return <option key={val}>{val}</option>;
            })}
        </select>
      </div>
      <Table dataToDisplay={dataToDisplay} />
      <div id="btn-container">
        <button onClick={goOnPrevPage}>Prev</button>
        <button onClick={goOnNextPage}>Next</button>
      </div>
    </div>
  );
}
```

즐겁게 코딩하고 계속 배워 나가세요!!

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

읽어 주셔서 감사합니다! 좋아요와 댓글 부탁드려요...
