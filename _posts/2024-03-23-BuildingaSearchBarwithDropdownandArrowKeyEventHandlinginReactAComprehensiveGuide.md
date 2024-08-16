---
title: "React에서 자동완성이 있는 검색창 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Building a Search Bar with Dropdown and Arrow Key Event Handling in React A Comprehensive Guide"
link: "https://medium.com/@adi8090808766/building-a-search-bar-with-dropdown-and-arrow-key-event-handling-in-react-a-comprehensive-guide-084440ffe017"
isUpdated: true
---





![image](https://miro.medium.com/v2/resize:fit:1400/1*b1MmVu5Ivb6BgNhzESNO2g.gif)

# 요구 사항과 전제 조건

React에 초심자가 아니라고 가정하고 있습니다. 제어 컴포넌트, 라이프사이클, 훅, 조건부 렌더링 및 상태를 다루는 컴포넌트에 익숙하다고 가정하고 있습니다.

이외에도 React 전문 개발자이신 경우 의견을 환영합니다.

<div class="content-ad"></div>

준비 사항

- React 앱이 생성되고 브라우저에서 렌더링되는 IDE
- App.jsx와 CSS 파일과 같은 React의 보일러플레이트 코드 지우기
- 주어진 디펜던시 설치하기: npm i react-router-dom
- 해당 파일 및 경로에 스타터 코드 복사하기
- 필요한 경우 파일 생성하기

스타터 코드

```js
//경로: src/index.css
body {
  background-color: blanchedalmond;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.App {
  font-family: sans-serif;
  text-align: center;
}

a {
  text-decoration: none;
  color: rebeccapurple;
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: blueviolet;
}

a:active {
  color: red;
}

.search-container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
}

.search-container input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin: auto 0;
}

.search-container ul {
  list-style-type: none;
  padding: 0 0 0 0;
  margin: 0;
  text-align: left;
}

.search-container li {
  padding: 10px;
  margin-left: 0;
  cursor: pointer;
}

.search-container .active {
  font-weight: bold;
  background-color: yellow;
  color: black;
}

.search-container .active:hover {
  background-color: gray;
}

.search-container li:hover {
  background-color: gray;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}

.user-card {
  border: 1px solid gray;
  padding: 10px;
  margin: 10px;
  width: 300px;
  border-radius: 16px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card-title {
  font-weight: bold;
}

.card-text {
  font-style: italic;
}
```

<div class="content-ad"></div>

```js
// 경로: src/components/Search.jsx
// 주로 이 파일에 초점을 맞출 거에요
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="search-container">
      <input type="text" placeholder="검색..." value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

export default Search;
```

```js
// 경로: src/components/Dashboard.jsx
import React from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  // useParams를 사용하여 URL에서 id와 name을 추출
  // useParams는 URL 매개변수의 키/값 쌍 객체를 반환합니다.
  // 예: { id: '123', name: 'John Doe' }
  // API 호출로 대시보드 표시하는 데 사용합니다
  const { id, name } = useParams();
  return (
    <div>
      <h1>대시보드</h1>
      <p>ID: {id}</p>
      <p>이름: {name}</p>
    </div>
  );
};

export default Dashboard;
```

```js
// 경로: src/App.jsx
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Search />} />
        {/* id와 name을 매개변수로 전달 */}
        <Route path="/user/:id/:name" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
```

```js
// 경로: src/index.jsx 또는 main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

<div class="content-ad"></div>

서버를 실행하면 입력란으로 검색 상자가 나타납니다.

# 1. Filter Data onChange

여기서 우리는 간단한 것을 만들 것입니다.

- 사용자가 검색 상자에 무언가를 입력할 때 해당 입력 값을 캡처합니다.
- 입력 값을 가져와 데이터 배열을 필터링합니다.
- 검색 값과 일치하는 처음 6개 항목을 반환합니다.
- 현재, 우리는 "id"와 "name"이 키인 색을 나타내는 객체 배열을 사용하고 있습니다.
- 마지막으로 이러한 필터링된 결과를 사용자에게 드롭다운으로 표시합니다.

<div class="content-ad"></div>

```js
//경로: src/components/Search.jsx
import { useState } from "react";
import { colors } from "../lib/data";

const Search = () => {
  const [search, setSearch] = useState("");
  const [firstSixMatching, setFirstSixMatching] = useState([]);

  // 변경 이벤트 처리
  const handleChange = (e) => {
    setSearch(e.target.value);
    // 검색 값에 따라 색상 배열 필터링
    if (e.target.value.length > 0) {
      const matchingColors = colors.filter((color) =>
        // 색상 이름이 검색 값을 포함하는지 확인 (대소문자 구분 없음)
        color.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      // 마지막으로, 첫 6개의 일치하는 색상 설정
      setFirstSixMatching(matchingColors.slice(0, 6));
    } else {
      // 검색 값이 비어 있으면, 처음 6개의 일치하는 색상 초기화
      setFirstSixMatching([]);
    }
  };
  return (
    <div className="search-container">
      <input type="text" placeholder="검색..." value={search} onChange={handleChange} />
      <ul>
        {/* 검색 기준으로 필터링된 것을 드롭다운으로 표시 */}
        {firstSixMatching &&
          firstSixMatching.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSearch(item.name);
              }}
              className={search === item.name ? "active" : ""}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
```

```js
// 경로: src/lib/data.js
export const colors = [
  { id: 1, name: "red", hex: "#f00" },
  { id: 2, name: "green", hex: "#0f0" },
  { id: 3, name: "blue", hex: "#00f" },
  { id: 4, name: "cyan", hex: "#0ff" },
  { id: 5, name: "magenta", hex: "#f0f" },
  { id: 6, name: "yellow", hex: "#ff0" },
  { id: 7, name: "black", hex: "#000" },
  { id: 8, name: "white", hex: "#fff" },
  { id: 9, name: "purple", hex: "#800080" },
  { id: 10, name: "brown", hex: "#a52a2a" },
  { id: 11, name: "pink", hex: "#ffc0cb" },
  { id: 12, name: "orange", hex: "#ffa500" },
  { id: 13, name: "gray", hex: "#808080" },
  { id: 14, name: "lime", hex: "#00ff00" },
  { id: 15, name: "teal", hex: "#008080" },
  { id: 16, name: "navy", hex: "#000080" },
  { id: 17, name: "silver", hex: "#c0c0c0" },
  { id: 18, name: "gold", hex: "#ffd700" },
  { id: 19, name: "indigo", hex: "#4b0082" },
  { id: 20, name: "maroon", hex: "#800000" },
  { id: 21, name: "olive", hex: "#808000" },
  { id: 22, name: "aqua", hex: "#00ffff" },
  { id: 23, name: "violet", hex: "#ee82ee" },
  { id: 24, name: "coral", hex: "#ff7f50" },
  { id: 25, name: "sky blue", hex: "#87ceeb" },
];
```

이 설정 후 브라우저에서 다음과 같은 것을 찾을 수 있습니다

<img src="https://miro.medium.com/v2/resize:fit:1400/1*F9v4zCtWJddPW_QHgAf9Ng.gif" />

<div class="content-ad"></div>

# 2. Key Down 이벤트 리스너 및 "ENTER" 키에서 함수 실행

현재는 필터링 및 표시가 가능하지만, 화살표 키를 사용하여 입력 상태를 변경할 수도 있으면 좋겠습니다. 현재는 아래 화살표 키를 위해 이 기능을 구현하는 데 집중하고 있지만, 위 화살표 키를 지원하도록 조건문을 쉽게 수정할 수 있습니다.

주어진 주석에 맞게 코드를 수정하는 데 필요한 변경 사항은 다음과 같습니다.

```js
//pautth : src/components/Search.jsx
  const handleKeyDown = (e) => {
    if (e.target.value.length === 0) {
      setIndex(0);
      return;
    }
    if (e.key === "Enter") {
      console.log("Enter 키가 눌렸습니다: 이 로그 문 대신 함수를 실행할 수 있습니다.");
    }
    if (e.key === "ArrowDown") {
      // index를 1씩 증가시키고 해당 인덱스에서의 컬러 이름으로 검색 값을 설정합니다.
      setSearch(firstSixMatching[index].name);
      setIndex(index + 1);
      if (index === firstSixMatching.length - 1) {
        // 리스트의 끝에 도달하면, 다시 처음부터 시작하도록 인덱스를 0으로 재설정합니다.
        setIndex(0);
      }
    }
    return;
  }
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="검색..."
        value={search}
        onChange={handleChange}
        // keydown 이벤트 처리
        onKeyDown={handleKeyDown}
      />
```

<div class="content-ad"></div>

![Image](https://miro.medium.com/v2/resize:fit:1400/1*eK3gk3QV0ZwFVqDJOQUbqg.gif)

# 3. API 통합 및 대시보드 페이지로 이동

이제 로직을 이해하고 엔터키에서 작동하는 함수를 실행했으니, 준비가 되셨다면 떠나는 시간이군요. 하지만, 아직 저의 카드 속에 숨겨진 것들이 있습니다.

이제 실제 API를 사용하여 테스트하고 사용자를 대시보드 페이지로 이동하도록 안내할 것입니다. 또한 필터링된 컴포넌트를 표시할 것이기 때문에 속도가 조금 빨라질 것입니다. 빠르게 진행되므로 놓친 부분이나 이해하지 못한 부분에 대해 댓글을 남겨주시고 걱정하지 마세요. 주석이 달린 코드도 준비되어 있을 겁니다.

<div class="content-ad"></div>

```js
// 경로: src/lib/hooks/useFetch.jsx
import { useState, useEffect, useMemo } from "react";

const useFetch = (url) => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            `문제 발생 ${res.status} ${() => {
              switch (res.status) {
                case 404:
                  return "찾을 수 없음";
                case 500:
                  return "내부 서버 오류";
                case 403:
                  return "금지됨";
                case 401:
                  return "인증되지 않음";
                case 400:
                  return "잘못된 요청";
                default:
                  return "알 수 없는 오류";
              }
            }`,
          );
        }
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => console.log("취소");
  }, []);

  return useMemo(() => [data, error, isLoading], [data, error, isLoading]);
};

export default useFetch;
```

```js
// 경로: src/components/Search.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "../lib/hooks/useFetch";

const Search = () => {
  // useFetch로 API에서 데이터, 오류 및 로딩 상태 가져오기
  const [data, error, isLoading] = useFetch("https://jsonplaceholder.typicode.com/users");
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [firstSixMatching, setFirstSixMatching] = React.useState([]);
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      const matching = data.filter((item) => item.name.includes(e.target.value));
      setFirstSixMatching(matching.splice(0, 6));
    } else {
      setFirstSixMatching([]);
    }
  };

  const handleKeyDown = (e) => {
    if (search === "") {
      setIndex(0);
    }
    if (e.key === "Enter" && search !== "" && firstSixMatching[index - 1] !== undefined) {
      navigate(`/user/${firstSixMatching[index - 1].id}/${firstSixMatching[index - 1].name}`);
    }
    if (e.key === "ArrowDown") {
      setSearch(firstSixMatching[index].name);
      setIndex(index + 1);
      if (index >= firstSixMatching.length - 1) {
        setIndex(0);
      }
    }
    return;
  };

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." value={search} onChange={handleChange} onKeyDown={handleKeyDown} />
      <ul>
        {firstSixMatching &&
          firstSixMatching.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                navigate(`/user/${item.id}/${item.name}`);
                setSearch(item.name);
              }}
              className={search === item.name ? "active" : ""}
            >
              {item.name}
            </li>
          ))}
      </ul>
      {firstSixMatching.length > 0 && <h1>Users List based on search</h1>}

      {firstSixMatching.length === 0 && search !== "" && <h1>No Users Found</h1>}
      <section className="card-container">
        {firstSixMatching.map((item) => (
          <Link key={item.id} to={`/user/${item.id}/${item.name}`}>
            <div className="user-card">
              <h1 className="card-title">{item.name}</h1>
              <p className="card-text">{item.email}</p>
              <p className="card-text">{item.phone}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Search;
```

우리가 가진 내용을 검토해보고 궁금한 점이 있으면 알려주세요. 그리고 마음에 드신다면 기립 박수를 추가해 주세요.

<img src="https://miro.medium.com/v2/resize:fit:904/1*6h2-hGeAdwENKl2c5cXCTg.gif" />  


<div class="content-ad"></div>
