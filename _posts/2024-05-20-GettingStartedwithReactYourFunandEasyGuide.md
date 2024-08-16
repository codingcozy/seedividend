---
title: "리액트 시작하는 개발자가 봐야하는 글"
description: ""
coverImage: "/assets/img/2024-05-20-GettingStartedwithReactYourFunandEasyGuide_0.png"
date: 2024-05-20 22:08
ogImage: 
  url: /assets/img/2024-05-20-GettingStartedwithReactYourFunandEasyGuide_0.png
tag: Tech
originalTitle: "Getting Started with React: Your Fun and Easy Guide”?"
link: "https://medium.com/@akashkhandelwal1999/getting-started-with-react-your-fun-and-easy-guide-c4d9ed374953"
isUpdated: true
---




- HTML: 웹페이지의 기본 구조를 이해합니다.
- CSS: 스타일을 적용하여 웹페이지를 멋지게 만듭니다.
- JavaScript: 웹페이지를 인터랙티브하게 만드는 코딩 언어를 배웁니다.
- DOM 조작: 웹페이지를 동적으로 변경하는 방법에 익숙해집니다.

- TODO 앱 만들기: 간단한 할 일 목록을 만들면서 배운 것을 연습해보세요!

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>나의 TODO 앱</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="todo-container">
    <input type="text" id="todo-input" placeholder="새로운 할 일 추가">
    <button id="add-btn">추가</button>
    <ul id="todo-list"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

```css
/* styles.css */
.todo-container {
  max-width: 400px;
  margin: 0 auto;
}
```

<div class="content-ad"></div>

```js
// script.js
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    const todoItem = document.createElement('li');
    todoItem.textContent = todoText;
    todoList.appendChild(todoItem);
    todoInput.value = '';
  }
});
```

- Components: 요소들을 웹페이지 구성의 빌딩 블록으로 생각해보세요.
- Props: 이것들은 요소들이 서로 대화할 때 사용하는 메시지와 같습니다.
- UseState: 웹페이지에서 무슨 일이 일어나고 있는지 추적하는 데 도움을 줍니다.
- UseEffect: 이것은 웹페이지가 서로 다른 액션에 대응하는 방법을 관리합니다.

- Create Components: 할 일 목록을 재사용할 수 있는 작은 부분들로 나누세요.
- Use Props: 할 일 목록의 다른 부분들 사이에 정보를 전달하세요.
- Manage State: useState로 할 일 목록에서 무슨 일이 일어나고 있는지 추적하세요.
- Handle Side Effects: useEffect를 사용하여 새로운 할 일 항목을 가져오거나 무언가 변경될 때 페이지를 업데이트하는 등의 작업을 수행하세요.

```js
// script.js
const TodoApp = () => {
  const [todos, setTodos] = React.useState([]);
  const [todoText, setTodoText] = React.useState('');

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, todoText]);
      setTodoText('');
    }
  };

  return (
    <div className="todo-container">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<TodoApp />, document.getElementById('root'));
```

<div class="content-ad"></div>

## 이제 React에 익숙해졌으니 창의력을 발휘해보세요! 무엇이든 시작해보고 어떤 놀라운 것들을 만들어낼 수 있는지 확인해보세요. 기억하세요, 모든 위대한 프로젝트는 간단한 아이디어로 시작됩니다. 여러분은 할 수 있어요!