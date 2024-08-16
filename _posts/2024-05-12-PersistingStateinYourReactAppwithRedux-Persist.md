---
title: "리덕스-퍼시스트로 React 앱의 상태 유지하기"
description: ""
coverImage: "/assets/img/2024-05-12-PersistingStateinYourReactAppwithRedux-Persist_0.png"
date: 2024-05-12 20:05
ogImage: 
  url: /assets/img/2024-05-12-PersistingStateinYourReactAppwithRedux-Persist_0.png
tag: Tech
originalTitle: "Persisting State in Your React App with Redux-Persist"
link: "https://medium.com/@xbstrxct/persisting-state-in-your-react-app-with-redux-persist-1e7dd877c58a"
isUpdated: true
---




프런트엔드 개발 세계에서 React는 주요한 역할을 하는 기술로 떠올랐어요. 컴포넌트 기반 아키텍처와 가상 DOM을 통해 사용자 인터페이스를 구축하는 데 강력한 도구로 작용해요. React 애플리케이션의 상태를 관리할 때 Redux는 예측 가능성과 디버깅의 용이성으로 인해 인기 있는 선택지에요. 그렇다면 Redux 상태를 페이지 새로고침이나 앱 재시작에 걸쳐 유지하려면 어떻게 해야 할까요? 이때 "redux-persist"가 등장해요.

Redux-persist는 Redux와 완벽하게 통합되어 애플리케이션의 상태를 유지하도록 돕는 라이브러리에요. 이 글에서는 실용적인 코드 조각을 활용해 React 앱에서 redux-persist를 사용하는 방법을 살펴볼 거예요.

# 상태 유지의 필요성

redux-persist에 대해 자세히 알아보기 전에 React 애플리케이션에서 상태 유지가 필요한 이유를 이해하는 것이 중요해요. 대부분의 경우, 애플리케이션의 상태는 메모리에 저장되며 페이지를 새로고침하거나 앱을 닫았다가 다시 열 때 재설정돼요. 일부 애플리케이션에서는 이러한 동작이 수용 가능할 수 있지만, 사용자가 페이지를 떠나거나 새로고침한 후에도 사용자 데이터, 설정 또는 세션 정보를 저장하고 로드해야 하는 경우도 많아요.



리덕스-퍼시스트는 이 문제에 간편한 해결책을 제공합니다. 이를 통해 Redux 스토어의 상태를 로컬 스토리지나 AsyncStorage(React Native 애플리케이션의 경우)와 같은 영구 저장 매체에 저장한 다음 앱을 로드할 때 해당 상태로 스토어를 재생성할 수 있습니다.

이제 여러분의 리액트 애플리케이션에 이를 구현하는 방법을 살펴보겠습니다.

# 시작하기

먼저, 리액트 프로젝트에 리덕스가 설정되어 있는지 확인하세요. 아직 설정하지 않았다면 Redux를 설치하고 애플리케이션을 위한 스토어를 만들어야 합니다. 이번 시연을 위해 이미 준비된 리덕스 스토어가 있다고 가정하겠습니다.



다음으로 redux-persist 라이브러리를 설치해야 합니다. npm 또는 yarn을 사용하여 다음과 같이 설치할 수 있습니다:

```js
npm install redux-persist
# 또는
yarn add redux-persist
```

이제 redux-persist를 설치했으므로 Redux 스토어와 함께 작동하도록 구성할 수 있습니다.

# 구성



당신의 Redux 스토어 구성 파일에서 redux-persist로부터 persistReducer를 import하여 상태의 원하는 부분을 지속적으로 저장하도록 구성하세요. 어떤 리듀서와 그 리듀서의 어떤 속성을 지속적으로 저장할지 선택할 수 있습니다.

```js
// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 사용할 저장 엔진 선택
import rootReducer from './reducers'; // 루트 리듀서 import
const persistConfig = {
  key: 'root',
  storage,
  // 지속적으로 저장하려는 리듀서 지정
  whitelist: ['user'], // 이 예시에서는 'user' 리듀서를 지속적으로 저장합니다
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
```

이 예시에서는 redux-persist를 사용하여 `user` 리듀서를 지속적으로 저장하도록 구성했지만, 이를 애플리케이션의 요구에 맞게 사용자 정의할 수 있습니다.

# 앱 감싸기



이제 Redux 스토어를 redux-persist로 구성했으니, redux-persist에서 제공하는 PersistGate 컴포넌트로 앱을 감싸야 합니다. 이 컴포넌트는 영속 상태가 검색되기 전에 앱이 렌더링되도록 보장합니다.

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // PersistGate 가져오기
import { store, persistor } from './store';
import App from './App';
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
```

# 사용법

redux-persist가 설정된 상태에서는 React 컴포넌트에서 Redux를 평소처럼 사용할 수 있습니다. persistConfig에서 지정한 모든 상태는 자동으로 지속될 것이며 다시 수분화될 것입니다.



```js
// userReducer.js
const initialState = {
  username: '',
  email: '',
  // ... other user-related properties
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    // ... other reducer cases
    default:
      return state;
  }
};
export default userReducer;
```

위 예에서 'user' 리듀서에 대한 모든 변경 사항은 앱이 다시 시작되거나 페이지가 새로고침될 때 자동으로 유지되고 다시로드됩니다.

# 결론

Redux-persist는 React 애플리케이션의 상태 지속성을 제공하여 애플리케이션을 강화하는 강력한 라이브러리입니다. 이는 사용자가 로그인해야 하는 애플리케이션이나 사용자 선호 설정 및 세션 데이터를 저장하려는 애플리케이션에 매우 유용할 수 있습니다.




이 문서에 설명된 단계를 따라 하면 Redux를 사용하는 React 애플리케이션에 redux-persist를 쉽게 통합할 수 있습니다. 이를 통해 사용자들이 세션 및 페이지 새로고침 간에 데이터 지속성을 즐길 수 있게 되어, 더 견고하고 사용자 친화적인 애플리케이션을 만들 수 있습니다.