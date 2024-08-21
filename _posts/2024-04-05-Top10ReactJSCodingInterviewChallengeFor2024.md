---
title: "2024년, ReactJS 코딩 면접 과제 10개 소개"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Top 10 ReactJS Coding Interview Challenge For 2024"
link: "https://medium.com/javascript-in-plain-english/top-10-reactjs-coding-interview-challenge-for-2024-c1e591f9384c"
isUpdated: true
---

<img src="/assets/img/Top10ReactJSCodingInterviewChallengeFor2024_0.png" />

이 기사는 코딩 도전 과제를 탐구하고 ReactJS 인터뷰에서 성공하기 위한 필수적인 모베스트 프랙티스를 제공하는 것을 목표로 합니다. 핵심 개념과 실전 시나리오를 탐구함으로써 독자들은 ReactJS 코딩 인터뷰에서 무엇을 기대해야 하는지에 대한 포괄적인 이해를 얻을 것입니다.

## 작업-1: 사용자 목록 가져와서 표시

오픈 소스 REST 엔드포인트에서 사용자의 세부 정보를 가져오고 테이블에서 적절한 스타일로 사용자의 세부 정보를 중앙에 표시하는 코드를 작성하세요.

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
import React, { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((result) => result.json())
      .then((data) => {
        console.log("users", data);
        setUsers(data);
      })
      .catch((error) => console.error("사용자 데이터를 불러오는 중 오류 발생:", error));
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>사용자 세부 정보 테이블</h1>
      <table
        style={{
          borderCollapse: "collapse",
          margin: "auto",
          width: "60%",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr
            style={{
              border: "1px solid #ddd",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {users.length &&
            users.map((item) => (
              <tr
                style={{
                  border: "1px solid #ddd",
                  backgroundColor: "gray",
                  color: "white",
                }}
              >
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default App;
```

## 다른 방법:

만약 Axios 라이브러리를 사용하여 사용자 세부 정보를 불러오고 싶다면?

```js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserTable.css";

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users") // Axios를 사용하여 사용자 세부 정보 불러오기
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("사용자 데이터를 불러오는 중 오류 발생:", error);
      });
  }, []);

  return (
    <div className="user-table-container">
      <h2>사용자 세부 정보</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>웹사이트</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
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

## 작업-2: 검색 기능 구현

사용자 세부 정보를 가져와 사용자 이름을 표시합니다. 또한 사용자 이름에 대한 검색 기능을 구현하세요.

```js
import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users") // 주어진 엔드포인트에서 사용자 세부 정보 가져오기
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("사용자 데이터 가져오기 오류:", error));
  }, []);

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>사용자 목록</h2>
      <input
        type="text"
        placeholder="사용자 이름으로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
```

## 작업-3: 디바운스와 취소 가능 기술을 사용한 최적화된 검색

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

테이블 태그를 Markdown 형식으로 변경하실래요.

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
import { useState, useEffect } from "react";

const App = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const handleAscendingSort = () => {
    const users = [...usersData].sort((a, b) => a.username.localeCompare(b.username));
    setUsersData(users);
  };

  const handleDescendingSort = () => {
    const users = [...usersData].sort((a, b) => b.username.localeCompare(a.username));
    setUsersData(users);
  };

  return (
    <div className="App">
      <h1>사용자 이름으로 정렬하는 예시</h1>
      <button onClick={() => handleAscendingSort()}>오름차순 정렬</button>
      <button onClick={() => handleDescendingSort()}>내림차순 정렬</button>
      {usersData &&
        usersData.map((user) => (
          <div key={user.id}>
            <p>{user.username}</p>
          </div>
        ))}
    </div>
  );
};

export default App;
```

## Task-5: 회원 가입 양식 제어 구성 요소 만들기

사용자 등록 양식을 만들고 사용자 이름, 이메일 및 비밀번호 필드를 포함하도록 해주세요. 입력값을 유효성 검사하고 적절한 오류 메시지를 표시하세요. (입력값을 관리하는 상태를 가진 제어된 양식 컴포넌트를 만드세요.)

```js
import React, { useState } from "react";
import * as Yup from "yup"; // Form validation을 위해 Yup 가져오기
import "./UserRegistrationForm.css"; // 컴포넌트용 CSS 파일 가져오기

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const schema = Yup.object().shape({
    firstName: Yup.string().required("이름을 입력해주세요"),
    lastName: Yup.string().required("성을 입력해주세요"),
    email: Yup.string().email("유효하지 않은 이메일입니다").required("이메일을 입력해주세요"),
    password: Yup.string().required("비밀번호를 입력해주세요").min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
  });

  const validateField = async (name, value) => {
    try {
      await schema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    await validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await schema.validate(formData, { abortEarly: false });
      // 지연을 추가하여 API 호출 시뮬레이션
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage("등록 완료!");
      }, 2000);
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((fieldError) => {
        validationErrors[fieldError.path] = fieldError.message;
      });
      setErrors(validationErrors);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>사용자 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        <div>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
        <div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "제출 중..." : "제출"}
        </button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default UserRegistrationForm;
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

## 작업-6: 다크 모드 및 라이트 모드

컨텍스트 API를 사용하여 앱 표시 모드를 변경하는 로직을 구현하세요.

- DisplayModeContext.js 파일

```js
import React, { createContext, useState, useContext } from "react";

// 표시 모드를 위한 컨텍스트 생성
const DisplayModeContext = createContext();

// 표시 모드 컨텍스트를 사용하는 사용자 정의 훅 생성
export const useDisplayMode = () => {
  return useContext(DisplayModeContext);
};

// 표시 모드 컨텍스트를 위한 프로바이더 컴포넌트 생성
export const DisplayModeProvider = ({ children }) => {
  const [displayMode, setDisplayMode] = useState("light"); // 기본 표시 모드는 'light'입니다

  const toggleDisplayMode = () => {
    setDisplayMode((prevMode) => (prevMode === "light" ? "dark" : "light")); // 'light'와 'dark' 모드를 토글합니다
  };

  return (
    <DisplayModeContext.Provider value={displayMode, toggleDisplayMode}>
      {children}
    <DisplayModeContext.Provider/>
  );
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

- App.js 파일

```js
import "./styles.css";
import { useDisplayMode } from "./DisplayModeContext";

export default function App() {
  const { displayMode, toggleDisplayMode } = useDisplayMode();

  const appStyle = {
    background: displayMode === "light" ? "#ffffff" : "#333333",
    color: displayMode === "light" ? "#333333" : "#ffffff",
    padding: "5px",
  };

  return (
    <div style={appStyle}>
      <h3>디스플레이 모드를 변경하려면 아래 버튼을 누르세요</h3>
      <button onClick={() => toggleDisplayMode()}>{displayMode === "light" ? "다크 모드" : "라이트 모드"}</button>
    </div>
  );
}
```

- index.js 파일

```js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { DisplayModeProvider } from "./DisplayModeContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <DisplayModeProvider>
      <App />
    </DisplayModeProvider>
  </StrictMode>
);
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

## 태스크-7: 할 일 목록

할 일 목록을 추가하고 삭제할 수 있는 간단한 할 일 목록 애플리케이션을 만드세요.

```js
import { useState } from "react";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskDetail, setTaskDetail] = useState("");

  const handleAddTask = () => {
    setTaskList([...taskList, taskDetail]);
    setTaskDetail("");
  };

  const handleRemoveTask = (index) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };

  const handleTaskUpdate = (value) => {
    setTaskDetail(value);
  };

  return (
    <div>
      <>
        <h3>ToDO 목록</h3>
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={taskDetail}
          onChange={(e) => handleTaskUpdate(e.target.value)}
        />
        <button onClick={() => handleAddTask()}>추가</button>
      </>
      <>
        <ul>
          {taskList &&
            taskList.map((item, index) => (
              <div key={index}>
                <li>
                  {item} <button onClick={() => handleRemoveTask(index)}>삭제</button>
                </li>
              </div>
            ))}
        </ul>
      </>
    </div>
  );
}
```

## 태스크-8: 쇼핑 카트 컴포넌트

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

```json
{
  "items": [
    {
      "id": 1,
      "name": "티셔츠",
      "price": 20
    },
    {
      "id": 2,
      "name": "청바지",
      "price": 50
    },
    {
      "id": 3,
      "name": "신발",
      "price": 80
    }
  ]
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

```js
import { useState } from "react";
import "./styles.css";
import itemsData from "./items.json";

export default function App() {
  const [items, setItems] = useState(itemsData.items);
  const [cart, setCart] = useState([]);

  const addToCart = (itemId) => {
    const selectedItem = items.find((item) => item.id === itemId);
    const itemInCart = cart.find((item) => item.id === itemId);

    if (itemInCart) {
      const updatedCart = cart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...selectedItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity > 5) {
      return; // 5개를 초과하는 수량 업데이트 방지
    }
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  return (
    <div>
      <h1>장바구니</h1>
      <h2>사용 가능한 상품</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => addToCart(item.id)}>장바구니에 추가</button>
          </li>
        ))}
      </ul>
      <h2>카트 총액</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} -
            <select value={item.quantity || 1} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}>
              {[...Array(5).keys()].map((number) => (
                <option key={number + 1} value={number + 1}>
                  {number + 1}
                </option>
              ))}
            </select>
            <button onClick={() => removeFromCart(item.id)}>제거</button>
          </li>
        ))}
      </ul>
      <h2>총액: ${calculateTotal()}</h2>
    </div>
  );
}
```

## Task-9: 페이징 컴포넌트

API에서 데이터를 가져와 고정된 페이지 당 항목 수를 보여주는 페이징 컴포넌트를 구축하십시오

-paginated.js

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
import React, { useState, useEffect } from "react";

const PaginationComponent = ({ apiUrl, itemsPerPage }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}?_page=${currentPage}&_limit=${itemsPerPage}`);
        // API가 JSON 데이터로 응답한다고 가정
        const jsonData = await response.json();
        setData(jsonData);
        // API 응답 헤더에서 항목의 총 수를 가져옵니다.
        const totalCount = response.headers.get("X-Total-Count");
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, [apiUrl, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <ol>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li> // 'name'이 화면에 표시할 속성임을 가정
        ))}
      </ol>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        <span>
          현재 {currentPage} 페이지 / 총 {totalPages} 페이지
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
```

-App.js

```js
import PaginationComponent from "./paginated";

const App = () => {
  return (
    <div>
      <h1>페이징 예제</h1>
      <PaginationComponent apiUrl="https://jsonplaceholder.typicode.com/posts" itemsPerPage={10} />
    </div>
  );
};

export default App;
```

## Task-10: 무한 스크롤 갤러리와 지연 로딩

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

페이지를 스크롤할 때 사용자가 스크롤하면 추가 이미지를 불러오는 이미지 갤러리를 만들어보세요. 성능을 높이기 위해 lazy loading을 구현해보세요.

```js
import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      // 앤스플래쉬에서 개발자 계정을 등록하고 앱을 만든 후에 클라이언트 ID를 사용하세요.
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=weJDI4C21OzgEkJD2ZSkb5yt1aBQwiuHh2tVK4tvS5w&page=${page}`
      );
      if (!response.ok) {
        throw new Error("불러오기 실패");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setImages((prevImages) => [...prevImages, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.error("잘못된 데이터 형식:", data);
      }
    } catch (error) {
      console.error("이미지 불러오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading)
      return;
    fetchImages();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div>
      <h1>이미지 갤러리</h1>
      <div className="image-gallery">
        {images.map((image) => (
          <img key={image.id} src={image.urls.small} alt={image.alt_description} />
        ))}
        {loading && <p>로딩 중...</p>}
      </div>
    </div>
  );
};

export default App;
```

이 글이 마음에 드시길 바라며, 감사합니다.

Medium에서 더 많은 흥미로운 글을 확인하세요.

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

다른 플랫폼:

LinkedIn에서 나를 팔로우하세요: [https://www.linkedin.com/in/ravics09/](https://www.linkedin.com/in/ravics09/)

X에서 나를 팔로우하세요: [https://twitter.com/JS_Centric?t=nyKrM6oaUigAUYNtsWkuUw&s=09](https://twitter.com/JS_Centric?t=nyKrM6oaUigAUYNtsWkuUw&s=09)

내 YouTube 채널을 구독하세요: [https://www.youtube.com/channel/UC9MmyicGIveu0AId8OFAOmQ](https://www.youtube.com/channel/UC9MmyicGIveu0AId8OFAOmQ)

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

# 쉽게 이해하는 영어 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 저자를 클랩하고 팔로우해주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요
