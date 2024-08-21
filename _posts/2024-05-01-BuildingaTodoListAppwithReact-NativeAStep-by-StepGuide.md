---
title: "React-Native로 투두 앱 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-BuildingaTodoListAppwithReact-NativeAStep-by-StepGuide_0.png"
date: 2024-05-01 18:04
ogImage:
  url: /assets/img/2024-05-01-BuildingaTodoListAppwithReact-NativeAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Building a Todo List App with React-Native: A Step-by-Step Guide"
link: "https://medium.com/@worachote/building-a-todo-list-app-with-react-native-a-step-by-step-guide-7ed7871d3f98"
isUpdated: true
---

<img src="/assets/img/2024-05-01-BuildingaTodoListAppwithReact-NativeAStep-by-StepGuide_0.png" />

React-Native를 이용한 Todo List 애플리케이션 만들기에 대한 포괄적인 안내서에 오신 것을 환영합니다!

React-Native는 페이스북에서 개발한 강력한 프레임워크로, React의 익숙한 구문을 사용하여 크로스 플랫폼 모바일 애플리케이션을 개발할 수 있습니다. 이 튜토리얼에서는 컴포넌트, 상태 관리, 기본적인 스타일링을 포함한 React-Native의 필수 개념을 다룰 것입니다. 이 가이드의 끝에는 모바일 기기용 완전히 기능하는 Todo List 앱을 만들 준비가 될 것입니다.

# 준비물

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

할 일 목록 앱을 만들기 전에 다음 사전 준비 사항이 갖춰져 있는지 확인해주세요:

- JavaScript와 React 개념에 대한 기본 지식
- 컴퓨터에 Node.js 및 npm이 설치되어 있어야 합니다.
- Expo CLI가 npm install -g expo-cli 명령을 사용하여 전역으로 설치되어 있어야 합니다.
- Visual Studio Code와 같은 코드 편집기
- 테스트를 위해 Expo Go 앱이 설치된 모바일 기기

# 단계 1: 프로젝트 설정하기

첫 번째 작업은 Expo를 사용하여 React-Native 프로젝트를 설정하는 것입니다. 터미널을 열고 다음 명령을 실행해주세요:

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

## 1) React-Native 앱 만들기

```js
expo init todo-app
```

## 2) 프로젝트 디렉토리로 이동

```js
cd todo-app
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

## 3) 개발 서버 시작하기

```js
expo start
```

이 명령어를 입력하면 새로운 React-Native 프로젝트인 "todo-app"이 생성되고 개발 서버가 시작됩니다.

# 단계 2: 앱 컴포넌트 생성

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

이제 우리의 할 일 목록 애플리케이션의 진입점인 App 컴포넌트를 만들어 봅시다.

```js
// App.js
import React from "react";
import TodoList from "./components/TodoList";

export default function App() {
  return <TodoList />;
}
```

# 단계 3: TodoList 컴포넌트 만들기

이 단계에서는 작업 목록을 관리하고 작업 관련 기능을 처리할 TodoList 컴포넌트를 만들 것입니다.

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
// components/TodoList.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import TodoItem from './TodoItem';

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([
    { id: 1, text: '의사 예약', completed: true },
    { id: 2, text: '학교 회의', completed: false },
  ]);
  const [text, setText] = useState('');
  // Function to Add Task
  function addTask() {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
  }
  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }
  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
  }
  // Render TodoList Component
  return (
    <View>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="새 작업"
      />
      <Button title="추가" onPress={addTask} />
    </View>
  );
}
```

# 설명:

- 필요한 모듈 가져오기: TodoList 컴포넌트에 필요한 모듈을 가져오는 것부터 시작합니다.
- TodoList 컴포넌트 정의: 우리는 할 일 목록을 관리하는 중심 컴포넌트인 TodoList 함수형 컴포넌트를 선언합니다.
- State Hooks: useState 훅을 사용하여 두 가지 상태 변수를 초기화합니다. tasks는 작업 목록을 관리하고, text는 새 작업을 추가하는 데 사용되는 입력 텍스트를 처리합니다. tasks 상태는 초기에 두 가지 예제 작업으로 설정됩니다.
- 작업 추가 함수: addTask 함수는 고유 ID와 입력 텍스트, 완료 상태가 false로 설정된 새 작업 객체를 생성합니다. 그런 다음 새 작업을 추가하고 입력 텍스트를 재설정하여 tasks 상태를 업데이트합니다.
- 작업 삭제 함수: deleteTask 함수는 주어진 ID를 가진 작업을 tasks 상태에서 제거합니다.
- 작업 완료 토글 함수: toggleCompleted 함수는 주어진 ID를 가진 작업의 완료 상태를 토글합니다. map 메서드를 사용하여 대상 작업의 완료 상태가 뒤바뀐 새로운 작업 배열을 생성합니다.
- TodoList 컴포넌트 렌더링: TodoList 컴포넌트는 map 메서드를 사용하여 작업 목록을 렌더링하며, 각 작업을 TodoItem 컴포넌트에 전달합니다. 또한 새 작업을 입력하는 TextInput과 addTask 함수를 트리거하는 Button을 포함합니다.

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

이제 TodoList에서 개별 작업을 나타내는 TodoItem 컴포넌트를 생성할 차례입니다.

```js
// components/TodoItem.js
import React from "react";
import { View, Text, CheckBox, Button } from "react-native";

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View>
      <CheckBox value={task.completed} onValueChange={() => toggleCompleted(task.id)} />
      <Text style={{ textDecorationLine: task.completed ? "line-through" : "none" }}>{task.text}</Text>
      <Button title="X" onPress={() => deleteTask(task.id)} />
    </View>
  );
}
```

# 설명:

- CheckBox: CheckBox 컴포넌트는 작업의 완료 상태를 나타냅니다. 그 값은 작업의 완료 상태에 따라 결정되며, onValueChange는 체크박스와 상호작용할 때 toggleCompleted 함수를 호출합니다.
- 스타일이 적용된 Text: Text 컴포넌트는 작업 텍스트를 표시합니다. 작업이 완료되었을 경우 라인 스타일을 줄 긋게 만드는 스타일이 적용됩니다.
- 삭제 버튼: Button 컴포넌트는 "X" 레이블이 있는 삭제 버튼을 제공합니다. 버튼을 누르면 deleteTask 함수가 호출됩니다.

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

# 단계 5: 스타일링

할 일 목록을 시각적으로 더 매력적으로 만들기 위해, 기본적인 스타일을 적용해 보겠습니다. 프로젝트에서 styles.css라는 파일을 생성하고 아래 스타일을 추가해주세요:

```js
/* styles.css */
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 아이템을 수직으로 중앙 정렬합니다 */
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.todo-item-text {
  flex: 1; /* 텍스트가 남은 공간을 차지할 수 있도록 설정합니다 */
  margin-right: 8px;
  color: #333;
}
.completed {
  text-decoration: line-through;
  color: #888;
}
.delete-button {
  background-color: #ff6347; /* 토마토 색 */
  color: #fff;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

이제, TodoItem.js 파일에서 styles.css를 import하여 로컬에서 스타일을 적용해보겠습니다:

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
// components/TodoItem.js
import React from "react";
import { View, Text, CheckBox, TouchableOpacity } from "react-native";
import styles from "./styles"; // 스타일 가져오기

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View style={styles.todo - item}>
      <CheckBox value={task.completed} onValueChange={() => toggleCompleted(task.id)} />
      <Text style={[styles.todo - item - text, task.completed && styles.completed]}>{task.text}</Text>
      <TouchableOpacity style={styles.delete - button} onPress={() => deleteTask(task.id)}>
        <Text style={{ color: "#fff" }}>삭제</Text>
      </TouchableOpacity>
    </View>
  );
}
```

# 설명:

- .todo-item : 각 할 일 항목에 플렉스 레이아웃을 적용하고 항목을 가로로 정렬하여 간격을 두고 깔끔한 외관을 위해 패딩, 테두리 및 테두리 반경을 추가합니다.
- .todo-item-text : 텍스트가 나머지 공간을 차지하도록 하며 오른쪽 여백을 추가하고 텍스트 색상을 변경합니다.
- .completed : 완료된 작업에 대해 가로 줄 꾸미기 및 텍스트 색상 변경을 추가합니다.
- .delete-button : 빨간색 배경, 흰색 텍스트, 패딩 및 테두리 반경으로 삭제 버튼을 스타일링합니다. 또한 상호 작용을 위해 커서 포인터를 제공합니다.

여기까지 완료되었습니다! React-Native를 사용하여 직접 Todo List 앱을 만들었다니 축하드립니다. 이 안내서를 통해 React-Native 컴포넌트, 상태 관리, 훅, 프롭스, 이벤트 처리를 이해하고 스타일링을 향상시켰습니다. 이제 당신이 이룬 것을 되돌아보고 다음 단계를 생각해봅시다.

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

# 마지막으로

할 일 목록 앱을 만드는 것은 단지 React-Native 여행의 일부에 불과해요. 닦은 토대 위에, 어디로 나아갈지 고민할 때입니다. 할 일 편집, 드래그 앤 드롭으로 재정렬, 또는 백엔드 통합에 대해 고려해보세요. 이러한 기능을 추가하여 앱을 더욱 발전시켜보세요.

그리고 여기서 멈추는 것은 왜 그런가요? 도전을 받아들이고, 실시간 채팅과 소셜 기능을 탐험하여 앱을 더욱 상호작용적으로 만들어 보세요. Amity의 채팅 및 소셜 SDK가 제공하는 것을 한 번 살펴보세요. 다음 큰 프로젝트에 빠진 퍼즐 조각이 될 지도 모릅니다. 또한, 채팅, 소셜 및 라이브 스트리밍에 대한 완성된 솔루션이 비즈니스 목표와 일치한다면, 주저하지 말고 Amity에 연락하여 일을 가속화하세요.

코딩과 학습을 계속하면서, 코드 한 줄이 한 걸음을 의미한다는 것을 기억하세요. 따라서 계속 전진하고 새로운 지평을 탐험하며, React-Native 개발의 흥미로운 세계를 받아들이세요. 당신의 코딩 여행에 건배합니다!
