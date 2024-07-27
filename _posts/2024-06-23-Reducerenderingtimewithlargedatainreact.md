---
title: "React로 대용량 데이터를 빠르게 렌더링하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-Reducerenderingtimewithlargedatainreact_0.png"
date: 2024-06-23 13:42
ogImage: 
  url: /assets/img/2024-06-23-Reducerenderingtimewithlargedatainreact_0.png
tag: Tech
originalTitle: "Reduce rendering time with large data in react"
link: "https://medium.com/@shivanggarg48/reduce-rendering-time-with-large-data-in-react-274778adbe09"
---



![img](/assets/img/2024-06-23-Reducerenderingtimewithlargedatainreact_0.png)

# 소개

현대 웹 개발에서 성능이 매우 중요합니다. 웹 애플리케이션이 복잡해지고 데이터 양이 증가함에 따라 효율적인 렌더링을 관리하는 것이 중요해집니다. React 애플리케이션의 성능을 개선하기 위한 한 가지 효과적인 기술은 가상화입니다. 이 글에서는 가상화가 무엇인지, 왜 중요한지, React 애플리케이션에서 어떻게 구현하는지 알아보겠습니다.

# 가상화란 무엇인가?


<div class="content-ad"></div>

웹 개발에서 가상화는 DOM에서 보이는 부분만 렌더링하고 나머지는 메모리에 유지하는 기술을 말합니다. 이 접근 방식은 DOM 노드의 수를 크게 줄여 렌더링 성능을 향상시키고 전체 사용자 경험을 향상시킵니다.

# 왜 가상화인가요?

# 성능 상의 이점

- 메모리 사용량 감소: 일부 항목만 렌더링하므로 메모리 소비를 최소화할 수 있습니다.
- 렌더링 시간 단축: 더 적은 DOM 노드는 더 빠른 렌더링 시간을 의미하며, 반응이 더 빠른 UI를 제공합니다.
- 부드러운 스크롤링: 가상화를 통해 대용량 데이터 세트에서도 부드러운 스크롤링 경험을 유지할 수 있습니다.

<div class="content-ad"></div>

# 사용 사례

- 대량 목록 또는 테이블: 어드민 대시보드나 데이터 분석 도구와 같이 대량의 테이블 데이터를 표시하는 애플리케이션.
- 무한 스크롤링: 사용자가 스크롤할 때 계속로드되는 콘텐츠가 있는 소셜 미디어 피드나 뉴스 웹사이트.

# React에서 가상화 구현하기

# 프로젝트 설정하기

<div class="content-ad"></div>

가상화를 보여주기 위해, react-virtualized 라이브러리를 사용하여 간단한 리액트 애플리케이션을 만들어보려고 합니다.

## 단계 1: 리액트 애플리케이션 생성

```js
npx create-react-app react-virtualization-example
cd react-virtualization-example
npm install react-virtualized
```

## 단계 2: 기본 컴포넌트 설정

<div class="content-ad"></div>

가상 목록을 표시하는 컴포넌트를 만들어보세요.

```js
// src/VirtualizedList.js
import React from 'react';
import { List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // 한 번만 가져오면 됩니다.
```

```js
const VirtualizedList = ({ items }) => {
  const rowRenderer = ({ key, index, style }) => (
    <div key={key} style={style} className="list-item">
      {items[index]}
    </div>
  );
  return (
    <List
      width={300}
      height={600}
      rowCount={items.length}
      rowHeight={50}
      rowRenderer={rowRenderer}
    />
  );
};
export default VirtualizedList;
```

# 가상 컴포넌트 통합

<div class="content-ad"></div>

## 단계 3: 앱에서 가상화된 컴포넌트 사용하기

```js
// src/App.js
import React from 'react';
import VirtualizedList from './VirtualizedList';
```

```js
const App = () => {
  const items = Array.from({ length: 1000 }, (_, index) => `아이템 ${index + 1}`);
  return (
    <div className="App">
      <h1>가상화된 목록 예제</h1>
      <VirtualizedList items={items} />
    </div>
  );
};
export default App;
```

# 가상화된 목록 향상하기

<div class="content-ad"></div>

## 단계 4: 스타일 추가하기

시각화를 더 향상시키기 위한 기본적인 스타일을 추가해보세요.

```js
/* src/App.css */
.list-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
```

# 고급 사용법

<div class="content-ad"></div>

## 단계 5: 가상 목록 커스터마이징하기

react-virtualized의 고급 기능인 동적 행 높이, 무한 스크롤 등을 탐색해보세요.

```js
import React from 'react';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
```

```js
const InfiniteVirtualizedList = ({ loadMoreRows, isRowLoaded, rowCount }) => {
  const rowRenderer = ({ key, index, style }) => (
    <div key={key} style={style} className="list-item">
      {`아이템 ${index + 1}`}
    </div>
  );
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              rowCount={rowCount}
              rowHeight={50}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};
export default InfiniteVirtualizedList;
```

<div class="content-ad"></div>

# 결론

가상화는 대량 데이터 집합을 다루는 리액트 애플리케이션의 성능을 향상시키는 강력한 기술입니다. 보이는 항목만 렌더링함으로써 앱의 효율성과 응답성을 크게 향상시킬 수 있습니다. react-virtualized와 같은 도구를 사용하면 이 기술을 구현하기 쉽고 다양한 사용 사례에 맞는 기능을 제공합니다.

# 참고 자료

- react-virtualized 문서
- React 공식 문서