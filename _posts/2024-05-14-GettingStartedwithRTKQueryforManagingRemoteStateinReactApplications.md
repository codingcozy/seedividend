---
title: "리액트 애플리케이션에서 원격 상태 관리를 위한 RTK Query 시작하기"
description: ""
coverImage: "/assets/img/2024-05-14-GettingStartedwithRTKQueryforManagingRemoteStateinReactApplications_0.png"
date: 2024-05-14 12:20
ogImage: 
  url: /assets/img/2024-05-14-GettingStartedwithRTKQueryforManagingRemoteStateinReactApplications_0.png
tag: Tech
originalTitle: "Getting Started with RTK Query for Managing Remote State in React Applications"
link: "https://medium.com/@aren.talb00/efficiently-managing-state-in-todo-applications-with-redux-toolkit-query-4ec744bf9881"
isUpdated: true
---




현대 웹 애플리케이션에서 상태를 관리하는 것은 종종 복잡하고 번거로울 수 있습니다, 특히 API 요청과 같은 비동기 데이터를 처리할 때. 그러나 Redux Toolkit Query (RTK Query)를 사용하면 데이터 가져오기, 캐싱 및 상태 관리가 간소화되어 개발자들이 더 적은 코드로 성능 최적화된 애플리케이션을 작성할 수 있습니다. 이 기사에서는 RTK Query를 사용하여 Todo 애플리케이션 설정하는 방법을 안내하며, 그 강력함과 효율성을 소개하겠습니다.

# 프로젝트 구조 설정하기

먼저 React 프로젝트를 구성하여 시작하고 Redux Toolkit 및 RTK Query가 설치되어 있는지 확인하세요. 프로젝트 구조에는 주 진입 파일, API 서비스 슬라이스 및 Todo 컴포넌트가 포함됩니다.

```js
//main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import apiSlice from "./feature/todo/todoAPI/apiSlice.js";

// 루트 엘리먼트를 설정하고 전체 애플리케이션을 RTK Query용으로 ApiProvider로 랩합니다
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
        <App />
    </ApiProvider>
  </React.StrictMode>,
);
```



# API 서비스 슬라이스 구성하기

API 슬라이스는 RTK Query를 사용하여 할 일을 가져오고 추가하고 업데이트하고 삭제하는 방법을 정의하는 곳입니다.

```js
//apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todoApi = createApi({
    reducerPath: "api", // API 상태 슬라이스를 위한 고유한 키
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050" }), // 가져오기 로직을 처리하는 기본 쿼리
    tagTypes: ["TODOS"], // 자동 캐시 다시 가져오기를 위한 태그
    endpoints: (builder) => ({
        getTodos: builder.query({ // 할 일을 가져오는 엔드포인트
            query: () => "/todos",
            providesTags: ["TODOS"]
        }),
        addTodo: builder.mutation({ // 새로운 할 일 추가하는 엔드포인트
            query: (todo) => ({
                url: "/todos",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ["TODOS"]
        }),
        updateTodo: builder.mutation({ // 기존 할 일을 업데이트하는 엔드포인트
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: "PATCH",
                body: todo
            }),
            invalidatesTags: ["TODOS"]
        }),
        deleteTodo: builder.mutation({ // 할 일을 삭제하는 엔드포인트
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TODOS"]
        })
    })
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi;

export default todoApi;
```

# 할 일 컴포넌트 구성하기



Todo 컴포넌트에서 할 일을 표시하고 관리하는 기능을 구현해보세요.

```js
//TodoApp.jsx
import { useState } from 'react';
import styles from './TodoApp.module.css';
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "./todoAPI/apiSlice.js";

function TodoApp() {
    const [task, setTask] = useState('');
    const { data: todos, isLoading, isError, isSuccess, error } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    // 할 일 추가를 처리하는 함수
    function addTodoHandler() {
        const newTodo = { id: Math.random(), task: task, isCompleted: false };
        addTodo(newTodo);
        setTask('');
    }

    // 할 일 완료 상태 전환을 처리하는 함수
    function toggleCompletion(todo) {
        updateTodo({ ...todo, isCompleted: !todo.isCompleted });
    }

    // 할 일 삭제를 처리하는 함수
    function deleteTodoHandler(todo) {
        deleteTodo(todo);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>할 일 목록</h1>
            <input
                type="text"
                placeholder="새로운 작업 추가"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className={styles.todoInput}
            />
            <button className={styles.button} onClick={addTodoHandler}>할 일 추가</button>
            <ul className={styles.todoList}>
                {isLoading && <p>로딩 중...</p>}
                {todos && <>
                    {todos.map((todo) => (
                        <li key={todo.id} className={styles.todoItem}>
                            <span
                                className={styles.todoTask}
                                style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                                onClick={() => toggleCompletion(todo)}
                            >
                              {todo.task}
                            </span>
                            <button className={`${styles.button} ${styles.delete}`} onClick={() => deleteTodoHandler(todo)}>삭제</button>
                        </li>
                    ))}
                </>}
            </ul>
        </div>
    );
}

export default TodoApp;
```

참고: 코드샌드박스 링크에는 컴포넌트를 스타일링하는 CSS 파일도 제공됩니다.

# 마무리



RTK Query는 Redux 애플리케이션에서 서버 측 데이터를 효율적으로 관리할 수 있는 강력한 솔루션을 제공합니다. 데이터 가져오기 및 상태 관리 로직을 추상화함으로써, 개발자들이 기능 구축에 집중할 수 있도록 도와줍니다. React 개발자들에게 꼭 필요한 도구가 될 수 있습니다.

[여기를 클릭하여 데모 사이트에서 확인해보세요!](https://codesandbox.io/p/devbox/rtk-query-r8ttsh?embed=1&file=%2Fsrc%2Ffeatures%2Ftodo%2FtodoAPI%2FapiSlice.js)