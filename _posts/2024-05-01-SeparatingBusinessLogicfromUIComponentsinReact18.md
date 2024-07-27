---
title: "리액트 18에서 비즈니스 로직과 UI 컴포넌트를 분리하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-SeparatingBusinessLogicfromUIComponentsinReact18_0.png"
date: 2024-05-01 18:15
ogImage: 
  url: /assets/img/2024-05-01-SeparatingBusinessLogicfromUIComponentsinReact18_0.png
tag: Tech
originalTitle: "Separating⛓️ Business Logic 🧠from UI Components 🔡 in React 18"
link: "https://medium.com/design-bootcamp/separating-%EF%B8%8F-business-logic-from-ui-components-in-react-18-aa1775b3caba"
---



![이미지](/assets/img/2024-05-01-SeparatingBusinessLogicfromUIComponentsinReact18_0.png)

# 소개

React는 사용자 인터페이스를 만들기 위한 인기있는 JavaScript 라이브러리이며, 최근 버전에서 상당한 개선을 거쳤습니다. React 18을 통해 개발자들은 이제 비즈니스 로직을 UI 구성 요소에서 효과적으로 분리하는 더 강력한 도구를 갖게 되었습니다. 이 글에서는 비즈니스 로직과 UI 구성 요소를 분리하는 장점을 탐구하고, React 18의 새로운 기능을 사용하여 이를 어떻게 달성할 수 있는지 보여줄 것입니다.

# 목차

<div class="content-ad"></div>

- 비즈니스 로직과 UI 구성 요소를 왜 분리해야 할까요?
- 비즈니스 로직 분리를 위한 React 18의 새로운 기능들
- 비즈니스 로직 분리하기: 단계별 안내서
- React 18에서 비즈니스 로직 분리를 위한 고급 기술
- 결론
- 참고 자료

# 비즈니스 로직과 UI 구성 요소를 왜 분리해야 할까요?

- 코드 재사용성: 비즈니스 로직이 분리되면 응용 프로그램의 다른 부분이나 다른 프로젝트에서도 쉽게 구성 요소를 재사용할 수 있습니다.
- 테스트: 비즈니스 로직과 UI 구성 요소를 독립적으로 단위 테스트할 수 있으므로 테스트가 더 간단해집니다. 이는 테스트 범위와 전체 코드 품질을 향상시킵니다.
- 가독성 및 유지보수성: 비즈니스 로직을 UI 구성 요소에서 분리하면 더 깨끗하고 유지보수가 쉬운 코드가 됩니다. 각 부분의 책임을 이해하기 쉬워집니다.
- 확장성: 응용 프로그램이 성장함에 따라 관심을 분리하면 충돌 없이 개발자가 코드베이스의 다른 부분에 동시에 작업할 수 있습니다.

# React 18의 비즈니스 로직 분리를 위한 새로운 기능들

<div class="content-ad"></div>

## 리액트 훅

리액트 16.8에서 소개된 리액트 훅은 클래스 컴포넌트를 작성하지 않고도 상태 및 다른 리액트 기능을 사용할 수 있는 방법을 제공합니다. useState 및 useEffect와 같은 훅을 사용하면, 개발자는 비즈니스 로직을 캡슐화하고 컴포넌트 간에 재사용할 수 있습니다.

## 동시 모드의 서스펜스

리액트 18에서는 동시 모드와 서스펜스에서 개선 사항을 가져왔습니다. 동시 모드를 통해 리액트가 동시에 여러 작업을 처리하여 더 나은 성능을 제공합니다. 서스펜스는 선언적 데이터 가져오기와 코드 분할을 가능하게 하여 비동기 작업을 쉽게 다룰 수 있도록 합니다.

<div class="content-ad"></div>

# 비즈니스 로직 분리하기: 단계별 안내

## 단계 1: 비즈니스 로직 식별

컴포넌트에서 데이터, 상태를 관리하거나 API 호출을 수행하는 작업과 관련된 부분을 식별합니다.

## 단계 2: 커스텀 훅 생성

<div class="content-ad"></div>

지정된 비즈니스 로직을 캡슐화하기 위해 사용자 정의 훅을 생성하세요. 사용자 정의 훅은 use로 시작하는 함수입니다. 내부적으로 다른 훅을 사용할 수 있습니다.

코드 예시 (사용자 정의 훅):

```js
// useUserData.js
import { useState, useEffect } from 'react';

export function useUserData() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // API에서 사용자 데이터를 가져와 상태를 업데이트합니다.
    fetch('https://api.example.com/users')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('데이터를 가져오는 중 오류 발생:', error));
  }, []);

  return userData;
}
```

## 단계 3: 컴포넌트에서 사용자 정의 훅 사용하기

<div class="content-ad"></div>

UI 컴포넌트 내에서 비즈니스 로직과 데이터에 접근하기 위해 사용자 정의 후크를 활용하세요. 이렇게 하면 컴포넌트가 렌더링에 집중하고, 후크가 내부 로직을 처리합니다.

코드 예시 (컴포넌트에서 사용자 정의 후크 사용):

```js
// UserList.js
import React from 'react';
import { useUserData } from './useUserData';

function UserList() {
  const userData = useUserData();

  return (
    <div>
      <h1>사용자 목록</h1>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 단계 4: Suspense를 사용한 코드 분할

<div class="content-ad"></div>

Suspense를 사용하면 비동기 데이터 가져오기나 계산이 많이 필요한 컴포넌트를 코드로 나누고 지연로드할 수 있어요. 이렇게 하면 관심사를 분리하고 애플리케이션의 성능을 향상시킬 수 있어요.

코드 예시 (Suspense를 사용한 코드 분할):

```js
// App.js
import React, { Suspense } from 'react';
const UserList = React.lazy(() => import('./UserList'));

function App() {
  return (
    <div>
      <h1>나의 앱</h1>
      <Suspense fallback={<div>로딩 중...</div>}>
        <UserList />
      </Suspense>
    </div>
  );
}
```

# 리액트 18에서 비즈니스 로직 분리를 위한 고급 기술

<div class="content-ad"></div>

## 1. 커스텀 훅 조합

커스텀 훅의 강력한 측면 중 하나는 더 복잡한 로직을 만들기 위해 조합할 수 있다는 것입니다. 여러 커스텀 훅을 결합함으로써, 복잡한 비즈니스 로직을 구축하면서 UI 컴포넌트를 깔끔하고 집중적으로 유지할 수 있습니다.

코드 예시 (커스텀 훅 조합):

```js
// useUserData.js
import { useState, useEffect } from 'react';

export function useUserData() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // API에서 사용자 데이터를 가져와 상태를 업데이트합니다
    fetch('https://api.example.com/users')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('데이터를 불러오는 중 오류 발생:', error));
  }, []);

  return userData;
}

// useFilteredUserData.js
import { useUserData } from './useUserData';

export function useFilteredUserData(searchTerm) {
  const userData = useUserData();

  // 검색어를 기반으로 사용자 데이터 필터링
  const filteredData = userData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredData;
}
```

<div class="content-ad"></div>

`useFilteredUserData` 훅을 사용하면 검색어에 기반을 둔 필터링된 사용자 데이터를 가져올 수 있으며, `useUserData`에서 가져오는 로직을 재사용할 수 있습니다. 이 합성 접근 방식은 로직을 모듈식으로 유지하고 컴포넌트 간에 재사용할 수 있도록 합니다.

## 2. 부수효과를 위한 커스텀 훅

가끔 비즈니스 로직에는 데이터 가져오기 이상의 부수효과가 필요할 수 있습니다. 예를 들어 타이머 관리나 외부 API와의 상호작용과 같은 것들이 있습니다. 커스텀 훅은 이러한 부수효과를 캡슐화하여 컴포넌트 간에 일관되게 처리되도록 보장합니다.

코드 예시 (타이머용 커스텀 훅):

<div class="content-ad"></div>

```js
// useTimer.js
import { useState, useEffect } from 'react';

export function useTimer(initialTime = 0) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
```

이제 인터벌을 관리할 걱정 없이 타이머 기능을 모든 컴포넌트에 쉽게 통합할 수 있습니다.

## 3. 전역 상태 관리를 위한 컨텍스트

여러 컴포넌트 간에 공유해야 하는 상태 관리를 위해 React 18의 Context API를 활용할 수 있습니다. 비즈니스 로직에 대한 컨텍스트를 생성함으로써 어떤 컴포넌트에서든 해당 상태와 액션에 접근할 수 있습니다.

<div class="content-ad"></div>

코드 예제 (상태 관리를 위해 컨텍스트 사용):

```js
// UserDataContext.js
import React, { createContext, useContext } from 'react';
import { useUserData } from './useUserData';

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const userData = useUserData();

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserDataContext);
}
```

UserDataContext와 useUserDataContext 훅을 사용하여 UserDataProvider 내의 모든 컴포넌트에서 프롭 전달 없이 사용자 데이터에 액세스할 수 있습니다.

## 4. Cross-Cutting Concerns을 위한 Higher-Order Components (HOCs)

<div class="content-ad"></div>

여러 컴포넌트에 특정 로직을 적용해야 하는 경우, 고차 컴포넌트(Higher-Order Components, HOCs)를 사용할 수 있어요. HOCs는 컴포넌트를 가져와서 추가 프롭이나 로직이 포함된 새로운 컴포넌트를 반환하는 함수들이에요.

코드 예시 (스타일링을 위한 HOC):

```js
// withStyles.js
import React from 'react';

function withStyles(WrappedComponent) {
  return function WithStyles(props) {
    return (
      <div style={{ color: 'blue' }}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// 사용 예시
const MyComponent = ({ name }) => <div>Hello, {name}!</div>;
const StyledComponent = withStyles(MyComponent);
```

이제 StyledComponent는 MyComponent에 정의된 스타일들을 자동으로 적용해요. 여러 곳에서 스타일 선언을 반복할 필요가 없어졌어요.

<div class="content-ad"></div>

# 결론

React 18의 새로운 기능을 활용하여 사용자 정의 훅, Suspense 및 Context API를 포함한 고급 기술을 효과적으로 구현할 수 있습니다. 이를 통해 비즈니스 로직과 UI 구성 요소를 보다 효과적으로 분리할 수 있습니다. 사용자 정의 훅 조합, 부작용 처리, 전역 상태 관리를 위한 Context API, 그리고 고차 컴포넌트를 활용하여 개발자는 모듈화되고 유지보수가 용이한 React 애플리케이션을 만들 수 있습니다.

이러한 기술을 적용함으로써 개발자는 코드 구성을 개선하고 성능을 향상시키면서 더욱 확장 가능하고 유지보수가 쉬운 애플리케이션을 구축할 수 있습니다.

# 참고 문헌

<div class="content-ad"></div>

- React 문서
- React에서 Hooks 소개
- React 18 알파 - 동시 모드
- 상태 Hook 사용하기
- 데이터 가져오기용 서스펜스
- React 커스텀 훅 - 구성
- React 컨텍스트
- React 고차 컴포넌트

이러한 참고 자료는 React 18의 새로운 기능과 비즈니스 로직을 UI 컴포넌트에서 분리하기 위한 모베스트 프랙티스에 대한 심도 있는 정보를 제공합니다.

![이미지](/assets/img/2024-05-01-SeparatingBusinessLogicfromUIComponentsinReact18_1.png)

이 글이 도움이 되셨나요? 좋아요나 코멘트를 남겨주세요. 고맙습니다 🙏.