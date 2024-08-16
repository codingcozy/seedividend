---
title: "리액트와 리덕스 툴킷으로 할 일 앱 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingaTodoAppwithReactandReduxToolkit_0.png"
date: 2024-05-12 22:09
ogImage: 
  url: /assets/img/2024-05-12-BuildingaTodoAppwithReactandReduxToolkit_0.png
tag: Tech
originalTitle: "Building a Todo App with React and Redux Toolkit"
link: "https://medium.com/@kmraman11011/title-building-a-todo-app-with-react-and-redux-toolkit-5ae2740048c3"
isUpdated: true
---




<img src="/assets/img/2024-05-12-BuildingaTodoAppwithReactandReduxToolkit_0.png" />

# 소개:

이 튜토리얼에서는 React와 Redux Toolkit을 사용하여 간단한 할 일 앱을 구축할 것입니다. Redux Toolkit은 유틸리티 함수와 추상화를 제공하여 Redux에서 상태 관리를 간소화하는 강력한 라이브러리입니다. 이 튜토리얼을 마치면 React 애플리케이션에서 상태를 관리하는 데 Redux Toolkit을 사용하는 방법에 대해 확고한 이해를 얻을 것입니다.

## 전제 조건:



시작하기 전에 컴퓨터에 Node.js와 npm이 설치되어 있는지 확인해 주세요. React 기초 지식이 있다면 더 좋습니다.

## 단계 1: 프로젝트 설정하기

시작하려면 Create React App을 사용하여 새 React 프로젝트를 만들어야 합니다. 터미널을 열고 다음 명령어를 실행해주세요:

```js
npx create-react-app todo-app
```



## 단계 2: 의존성 설치

프로젝트 디렉토리로 이동하여 다음 명령어를 실행하여 필요한 의존성을 설치하세요:

```js
cd todo-app
npm install @reduxjs/toolkit react-redux
```

## 단계 3: Redux 슬라이스 이해하기



코딩에 들어가기 전에 Redux 슬라이스 개념을 간단히 이해해 봅시다. 슬라이스는 애플리케이션의 상태와 연결된 리듀서의 논리적인 부분입니다. 초기 상태를 포함하고 상태가 액션에 응답하여 업데이트되는 방법을 정의합니다.

## 단계 4: Redux 슬라이스 생성

`src` 디렉토리에서 `todoSlice.js`라는 새 파일을 생성하세요. 이 파일은 할 일 관리를 위한 Redux 슬라이스를 담고 있을 것입니다. `todoSlice.js` 안에서 `@reduxjs/toolkit`에서 `createSlice` 함수를 가져와서 할 일 슬라이스의 초기 상태와 리듀서를 정의하세요.

```js
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
```



## 단계 5: Redux 스토어 구성하기

이제 우리의 애플리케이션 상태를 보유할 Redux 스토어를 생성해 봅시다. `src` 디렉토리 내에 `store.js`라는 새 파일을 생성하세요. 이 파일 안에서 `@reduxjs/toolkit`에서 `configureStore` 함수와 `todoSlice` 리듀서를 import합니다. 그 후 `configureStore`를 사용하여 Redux 스토어를 생성하세요.

```js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const store = configureStore({
 reducer: {
 todos: todoReducer,
 },
});

export default store;
```

## 단계 6: Todo 컴포넌트 구성하기



이제 `src` 디렉토리에 `Todo.js` 파일을 만들어 봅시다. 이 파일에는 할 일 리스트의 표시 및 관리를 처리할 `Todo` 컴포넌트가 포함됩니다. `Todo.js` 내에서 React, `react-redux`에서 필요한 훅 및 컴포넌트, 그리고 `todoSlice`에서 액션을 import하세요.

```js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo } from "./todoSlice";

const Todo = () => {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAddTodo = () => {
    if (text) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleInputChange} />{" "}
      <button onClick={handleAddTodo}> 할 일 추가 </button>{" "}
      <ul>
        {" "}
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}{" "}
            <button onClick={() => handleToggleComplete(todo.id)}>
              {" "}
              {todo.completed ? "미완료 처리" : "완료 처리"}{" "}
            </button>{" "}
            <button onClick={() => handleDeleteTodo(todo.id)}> 삭제 </button>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
};

export default Todo;
```

## Step 7: App 컴포넌트 업데이트하기

`Todo` 컴포넌트를 렌더링하려면 `App.js` 파일을 약간 수정해야 합니다. React, `react-redux`의 `Provider` 컴포넌트, 그리고 `store.js` 파일에서 `store`를 import하세요. 그런 다음, `Todo` 컴포넌트를 `Provider` 컴포넌트로 감싸고 store를 prop으로 전달하세요.



```js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Todo from "./Todo";

const App = () => {
  return (
    <Provider store={store}>
       <Todo /> 
    </Provider>
  );
};

export default App;
```

## 단계 8: 앱 실행하기

이제 할 일 앱을 실제로 실행해보는 시간입니다! 터미널에서 다음 명령어를 실행해주세요:

```js
npm start
```



브라우저에서 http://localhost:3000을 방문하면 할 일 앱이 정상적으로 작동하는 것을 확인할 수 있습니다. 할 일을 추가하고 완료로 표시하거나 삭제할 수 있습니다. Redux Toolkit은 상태 관리를 효율적이고 쉽게 처리하게 해줍니다.

![이미지](/assets/img/2024-05-12-BuildingaTodoAppwithReactandReduxToolkit_1.png)

# 결론:

이 튜토리얼에서 React와 Redux Toolkit을 사용하여 할 일 앱을 만드는 방법을 배웠습니다. Redux 슬라이스의 개념을 살펴보고 Redux Toolkit의 `createSlice` 함수를 사용하여 할 일을 관리하는 상태와 리듀서를 정의했습니다. 이 튜토리얼을 따라하면 Redux Toolkit을 사용해 React 애플리케이션의 상태를 관리하는 뛰어난 기초를 마련할 수 있을 것입니다.



더 많은 기능을 추가하여 할 일을 편집하거나 완료 상태에 따라 필터링하는 등 앱을 사용자 정의하고 향상시키는 것에 자유롭게 도전해보세요. 즐거운 코딩되세요!