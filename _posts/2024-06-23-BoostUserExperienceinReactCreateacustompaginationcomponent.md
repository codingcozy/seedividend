---
title: "React에서 사용자 경험 향상하기  커스텀 페이지네이션 컴포넌트 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-BoostUserExperienceinReactCreateacustompaginationcomponent_0.png"
date: 2024-06-23 13:39
ogImage:
  url: /assets/img/2024-06-23-BoostUserExperienceinReactCreateacustompaginationcomponent_0.png
tag: Tech
originalTitle: "Boost User Experience in React : Create a custom pagination component"
link: "https://medium.com/@ichrak.azzouz/boost-user-experience-in-react-create-a-custom-pagination-component-d63de35b0af3"
isUpdated: true
---

<img src="/assets/img/2024-06-23-BoostUserExperienceinReactCreateacustompaginationcomponent_0.png" />

## 소개:

페이지네이션은 대규모 데이터를 처리하는 웹 앱에서 반드시 필요합니다. 사용자가 정보를 쉽게 탐색하도록 도와주어 경험을 향상시킵니다.

React는 미리 제작된 페이지네이션 라이브러리를 제공하지만, 사용자 정의 컴포넌트를 만들면 더 많은 제어력과 유연성을 얻을 수 있습니다. 이 단계별 튜토리얼은 React에서 자체 페이지네이션 컴포넌트를 구축하는 방법을 안내해주어 내부 작업과 구현 능력에 대한 견고한 이해를 제공합니다.

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

## 프로젝트 설정

먼저 React 프로젝트를 설정해 봅시다. 시스템에 Node.js와 npm이 설치되어 있는지 확인해 주세요. 그런 다음 Create React App을 사용하여 새 React 앱을 만들어 봅시다:

```js
npx create-react-app custom-pagination
cd custom-pagination
```

## 페이지네이션 컴포넌트 구축

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

이제 우리가 만든 사용자 정의 페이지네이션 컴포넌트를 만들 차례입니다. Pagination.js로 이름을 지을 거에요. 첫 번째 컴포넌트 코드는 여기 있어요:

```js
// Pagination.js

import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { OPTIONSROWPERPAGESUSERS } from "../config/constants";

function Pagination({
  currentPage,
  totalPages,
  handleChangeRowsPerPage,
  handleChangePage
}) {
  const paginationRange = () => {
      // 페이지네이션 로직
  };

  return (
    <Container fluid id="custom-pagination">
      <Row>
          <Col md={"auto"}>
            <Form.Select size="md" onChange={handleChangeRowsPerPage}>
              {OPTIONSROWPERPAGESUSERS.map((elem) => {
                return (
                  <option key={elem.value} value={elem.value}>
                    {elem.label}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
        <Col md={"auto"}>
          <Button
            className={currentPage === 1 ? "disable page-item" : "page-item"}
            disabled={currentPage === 1}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            Prev
          </Button>
          {paginationRange().map((pageNumber, index) => (
            <Button
              key={index}
              active={pageNumber === currentPage}
              disabled={pageNumber === "..."}
              className={
                pageNumber === currentPage
                  ? "isActive page-item"
                  : pageNumber !== "..."
                  ? "page-item"
                  : "disable page-item"
              }
              onClick={() => pageNumber !== "..." && handleChangePage(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            className={
              currentPage === totalPages ? "disable page-item" : "page-item"
            }
            disabled={currentPage === totalPages}
            onClick={() => {
              handleChangePage(currentPage + 1);
            }
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Pagination;
```

## 페이지네이션 로직 구현

이제 Pagination 컴포넌트 내부에 페이지네이션 로직을 구현할 차례입니다. 현재 페이지와 전체 페이지 수에 기반하여 표시할 페이지 번호를 결정하는 이 로직을 구현할 거에요.

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
const paginationRange = () => {
  const pages = [];

  if (currentPage > 1) {
    pages.push(1);
    if (currentPage > 2) {
      pages.push("...");
    }
  }

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  if (prevPage > 1) {
    pages.push(prevPage);
  }

  pages.push(currentPage);
  if (nextPage <= totalPages) {
    pages.push(nextPage);
  }
  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  return pages;
};
```

## 구성 요소 스타일링

이제 페이지 구성 요소에 기본 스타일을 추가하여 시각적으로 매력적으로 만들어 보겠습니다:

```js
/* styles.css */

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007bff;
  color: #fff;
}

.pagination button.disable {
  pointer-events: none;
  opacity: 0.5;
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

## 통합 및 사용

우리의 사용자 정의 페이징 컴포넌트를 사용하기 위해서는 데이터 및 페이징 상태를 관리하는 부모 컴포넌트에 통합해야 합니다. 이를 보여주기 위해 간단한 예제를 만들어보겠습니다.

App.js 파일을 만들고 상태와 데이터 처리를 설정해보세요.

```js
// App.js

import React, { useState } from "react";
import Pagination from "./Pagination";

const data = [...Array(100).keys()].map((i) => `아이템 ${i + 1}`);

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="App">
      <ul>
        {paginatedData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default App;
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

## 테스트 및 최적화

마무리하기 전에, 페이지네이션 구성 요소를 철저히 테스트하고 성능을 최적화하는 것이 중요합니다. React Developer Tools 및 Lighthouse와 같은 도구를 사용하여 테스트하고 최적화할 수 있습니다.

## 결론

축하합니다! ReactJS에서 사용자 정의 페이지네이션 구성 요소를 성공적으로 구축했습니다. 프로젝트 설정부터 페이지네이션 로직 구현 및 구성 요소 스타일링까지 모두 다루었습니다. 필요에 맞게 구성 요소를 더 맞춤화하여 자유롭게 사용해보세요.

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

이제 여러분 차례입니다! 여러분의 프로젝트에서 이를 시도해보세요. 즐겁게 코딩하세요!

## 도움이 되셨나요? 그렇다면:

아래 👏 버튼을 눌러주셔서 더 많은 사람들이 이를 볼 수 있도록 도와주세요.

## 궁금한 점이 있으신가요?

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

제안이나 개선 사항이 있으시면 언제든지 Medium에 의견을 남겨주세요. 또는 Linkedin에서 제게 연락해 주세요. 항상 당신의 의견을 듣고 싶어합니다. 👩‍💻
