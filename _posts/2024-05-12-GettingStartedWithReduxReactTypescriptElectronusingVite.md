---
title: "Redux, React Typescript, Electron 및 Vite로 시작하기"
description: ""
coverImage: "/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_0.png"
date: 2024-05-12 21:36
ogImage: 
  url: /assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_0.png
tag: Tech
originalTitle: "Getting Started With Redux, React Typescript, Electron using Vite"
link: "https://medium.com/@tweiss747/getting-started-with-redux-react-typescript-electron-using-vite-ffed63074602"
---


![Vite](/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_0.png)

안녕하세요

Vite는 새 프론트엔드 프로젝트를 빠르게 시작할 수 있는 놀라운 방법입니다. Vanilla JS, Vue, React 등 다양한 템플릿을 지원합니다. 빌드 시간이 빠르고 빠르게 작동하는 개발 서버도 기본 제공됩니다. Vite는 또한 Electron을 사용하여 새 프로젝트를 만드는 것도 지원합니다. Electron은 크로미움 기반의 프레임워크로, HTML, CSS 및 Javascript만을 사용하여 여러 플랫폼용 데스크톱 앱을 빌드하는 데 사용됩니다. Redux는 리액트 프로젝트에서 사용되는 상태 관리 도구 및 라이브러리로, 애플리케이션 전체에서 컴포넌트 주변에 있는 기존 상태를 추적하는 데 사용됩니다. 이 블로그에서는 React, Redux, Typescript 및 Electron을 사용하여 Vite를 사용하여 스타터 프로젝트를 빠르게 설정하는 방법을 살펴볼 것입니다. 이 튜토리얼은 문서에서 Redux를 사용하는 방법을 따릅니다.

설정



첫 번째로 터미널을 열고 데스크탑이나 프로젝트를 보관하는 폴더 중 하나로 이동해야 해요. 거기서 다음 명령어를 실행할 거예요.

```js
yarn create vite .
```

이렇게 하면 현재 디렉토리에 Vite 프로젝트가 생성되고 어떻게 프로젝트를 구성할지 물어볼 거예요.



![이미지](/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_1.png)

위의 스크린샷에서 프로젝트에 패키지 이름을 지정하고 싶습니다. 이것이 우리 프로젝트의 이름이 될 것입니다. 이름을 비워두지 않고 디렉토리 안에 다른 이름을 지정하면 현재 디렉토리 내에 별도의 폴더 안에 프로젝트가 생성됩니다.

Vite 설정 cli에서 다음 단계는 어떤 프레임워크를 사용할지 선택하는 것입니다. Others로 이동하여 Enter 키를 눌러주세요. create-electron-vite를 선택하세요.

![이미지](/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_2.png)



다시 패키지 이름을 입력하라는 프롬프트가 나타날 것입니다. 이번 단계는 간단하게 Enter 키를 눌러 건너뛰세요. 마지막 단계는 프로젝트 템플릿을 선택하는 것입니다. React를 선택해주세요.

![이미지](/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_3.png)

이렇게 하면 src, electron 및 public 폴더가 포함된 Vite 프로젝트가 Electron, Typescript 및 React를 사용하여 생성되며, Typescript, Vite 및 Electron용 구성 파일도 함께 제공됩니다.

```js
.
├── electron
│   ├── electron-env.d.ts
│   ├── main.ts
│   └── preload.ts
├── electron-builder.json5
├── index.html
├── package.json
├── public
│   ├── electron-vite.animate.svg
│   ├── electron-vite.svg
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```



위의 표를 마크다운 형식으로 변경하세요.


공정하고 깔끔하게 나왔습니다. 위의 표를 마크다운 형식으로 변경하겠습니다.



전주가전격 스타터 앱을 띄울 새 창이 열립니다. 앱에는 데모 카운터가 포함되어 있습니다.

![Getting Started with Redux React TypeScript Electron using Vite](/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_4.png)

기존 프로젝트에 Redux 통합하기

Redux의 시작 가이드에 따르면 Redux 프로젝트를 시작할 때 Vite의 공식 템플릿을 사용하는 것이 최선의 방법입니다. 그러나 우리의 기존 일렉트론 프로젝트에 Redux를 통합하는 것은 간단합니다. 다음 종속성을 프로젝트에 설치해야 합니다.



```js
yarn add @reduxjs/toolkit  
yarn add react-redux                        
yarn add redux
```

위 명령을 실행하면 redux의 기본 기능, react에 대한 바인딩 및 redux toolkit을 위한 필수 종속성이 설치됩니다. 이러한 패키지를 설치한 후에는 첫 번째 Redux 스토어를 생성할 수 있습니다.

첫 번째 Redux 스토어 생성하기

Redux 스토어를 생성하기 전에 slice를 정의해야 합니다. slice는 Redux 스토어의 독립된 모듈입니다. 프로젝트의 src 폴더로 이동하여 slices라는 폴더를 만듭니다. 이 폴더는 redux 스토어의 독립된 모듈 또는 slice를 보관할 것입니다. 나중에 이를 redux 스토어에 삽입할 것입니다.




![GettingStartedWithReduxReactTypescriptElectronusingVite_5](/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_5.png)

다음 코드를 `counterSlice.ts` 파일에 추가하세요.

```js
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type CounterState = {
   value: number
}

const initialState: CounterState = {
   value: 0
}

const counterSlice = createSlice({
   name: 'counter',
   initialState: initialState,
   reducers: {
      increment: (state) => {
         state.value += 1
      },
      decrement: (state) => {
         state.value -= 1
      },
      incrementByValue: (state, action: PayloadAction<number>) =>{
         state.value = action.payload
      }
   }
})

export const { increment, decrement, incrementByValue } = counterSlice.actions
export default counterSlice.reducer
```

코드를 분석해 봅시다.



```js
export type CounterState = {
   value: number
}
```

친구야, 저희는 카운터 상태에 대한 유형을 만들었어요. 여기서 카운트에 대한 유형은 숫자입니다.

```js
const initialState: CounterState = {
   value: 0
}
```

여기서 count의 초기 상태를 CounterState 유형으로 정의한 초기 상태입니다. 초기 상태는 slice를 정의할 때 전달되는 매개변수 중 하나에요.



```js
const counterSlice = createSlice({
   name: 'counter',
   initialState: initialState,
   reducers: {
      increment: (state) => {
         state.value += 1
      },
      decrement: (state) => {
         state.value -= 1
      },
      incrementByValue: (state, action: PayloadAction<number>) =>{
         state.value = action.payload
      }
   }
})
```

우리는 createSlice()를 사용하여 슬라이스가 생성되고 저장되는 상수를 정의합니다. createSlice()는 자체 포함 모듈 또는 redux 스토어의 슬라이스를 만들 수 있게 하는 redux 함수입니다. 이 슬라이스는 생성된 액션 유형을 이름 공간화하기 위해 사용되는 슬라이스의 이름, 상태 값을 초기화하는 초기 상태 및 리듀서 함수 또는 상태 조작을 허용하는 액션을 유지합니다.

첫 번째 슬라이스를 정의한 후에는 이 슬라이스를 보유하는 store를 생성합니다. 이를 프로젝트에서 만들어 봅시다. src 폴더 안에 stores라는 새 폴더를 만들어주세요. 그 안에 store.ts라는 새 파일을 만드세요.

<img src="/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_6.png" />




store.ts 파일에 다음 코드를 추가하겠습니다.

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";

export const store = configureStore({
   reducer: {
      counter: counterReducer
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

각 코드 조각을 자세히 살펴보겠습니다.

```js
export const store = configureStore({
   reducer: {
      counter: counterReducer
   }
})
```



`configureStore()`은 React 앱 전반에서 참조할 수 있는 store를 구축하는 데 사용되는 또 다른 Redux 함수입니다. 이 store는 생성된 모든 slice의 저장소 역할을 합니다. 안에는 우리가 이전에 counterSlice.ts 파일에서 내보낸 counterReducer를 저장합니다. 나중에는 루트 컴포넌트에서 provider 태그를 통해 우리의 store를 주입할 것입니다.

```js
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

Redux 문서에 따르면 redux toolkit은 추가적인 typings가 필요 없지만, 우리가 필요할 때 참조할 수 있도록 RootState와 AppDispatch를 추출해야 합니다. 우리의 store가 커지고 더 많은 slice가 추가될수록, 이러한 유형을 추론하는 것은 이들이 정확히 업데이트되도록 하기 위함입니다.

또한 Redux 문서는 TypeScript와 작업할 때 useDispatch()와 useSelector()에 대한 사용자 정의 타입된 훅을 정의하는 것이 최선의 실천 방법임을 강조합니다. 이러한 함수들은 컴포넌트에서 상태 값을 청취하고 상태 값을 업데이트하는 데 사용될 것이며, 이렇게 함으로써 값이 업데이트 될 때 store 내에서 업데이트된 내용이 반영되도록 합니다. 각 훅이 하는 일에 대한 간단한 개요는 다음과 같습니다.




`useSelector()`은 리덕스 스토어에서 값을 가져오고 구독할 수 있게 해주는 훅 함수입니다. 해당 값에 구독된 모든 컴포넌트는 그 값을 현재 값과 업데이트된 변경 사항을 반영합니다.

`useDispatch()`는 사용자가 스토어의 값을 변경할 이벤트를 트리거할 수 있게 해주는 훅 함수입니다. useSelector()를 통해 스토어의 값을 참조하는 모든 컴포넌트도 마찬가지로 그 값이 업데이트됩니다.

src 폴더 안에 우리의 훅을 위한 폴더를 만들고 storeHooks.ts 파일을 생성합니다. 이 파일은 useDispatch()와 useSelector()를 위한 사용자 정의 훅을 보유할 것입니다.

타입스크립트와 리덕스를 통합하는 자세한 방법은 Redux 문서의 타입스크립트 퀵 스타트 가이드를 참조해주세요.



<img src="/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_7.png" />

```js
import { AppDispatch, RootState } from './../stores/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

마지막으로, 컴포넌트들이 스토어에 액세스할 수 있도록 하려면, Provider 태그 내에서 스토어를 주입해야 합니다. Provider에 등록된 모든 컴포넌트는 스토어 내의 값을 액세스하고 수정할 수 있습니다.

```js
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
)
```



# Counter 컴포넌트 생성하기

이제 우리가 스토어, 슬라이스를 정의하고 스토어를 프로바이더에 주입했으니, 카운터 컴포넌트를 생성할 시간입니다.

src로 이동하여 Counter.tsx 컴포넌트를 생성하세요.

```js
import { useAppDispatch } from "./hooks/storeHooks";
import { increment, decrement } from "./slices/counterSlice";
import { Row, Col, Button } from "antd";

export default function Counter() {
  const dispatch = useAppDispatch();

  function incrementCounter() {
    dispatch(increment());
  }

  function decrementCounter() {
    dispatch(decrement());
  }

  return (
    <>
      <Row>
        <Col>
          <Button type="primary" onClick={incrementCounter}>
            Increment +
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={decrementCounter}>
            Decrement -
          </Button>
        </Col>
      </Row>
    </>
  );
}
```



이 컴포넌트에서는 incrementCounter 및 decrementCounter 함수를 사용하여 카운터를 증가 및 감소시키는 컴포넌트를 만듭니다.

useAppDispatch() 훅을 사용하여 사용자 지정 형식의 디스패치 함수를 저장합니다. 이 함수는 구독 중인 컴포넌트가 변경 사항을 이에 따라 수정할 수 있도록 저장소의 값 변경을 담당합니다. incrementCounter 및 decrementCounter는 모두 전달된 슬라이스의 리듀서 함수를 사용하여 디스패치를 호출합니다. UI 컴포넌트로 ANTD를 사용하고 있지만 React용 다른 UI 라이브러리에서도 작동합니다.

ANTD 라이브러리를 더 알아보고 싶다면 문서를 확인해보세요. ANTD를 프로젝트에 통합하는 것은 간단하며, 라이브러리는 Vue.js 및 Angular에도 제공됩니다.

이제 카운트를 수정하는 컴포넌트를 정의했으므로 App.tsx로 이동하여 Vite 프로젝트를 처음 설정할 때 생성된 코드를 제거하는 시간입니다.



<img src="/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_8.png" />

우리가 useSelector()에 대한 사용자 정의된 타입된 후크를 호출할 때, Typescript는 우리가 counter를 위한 상태를 생성했다는 것을 감지하고 initialState에서 정의된 값의 자동완성을 제공합니다. 이는 redux 스토어로부터 상태 구조를 추론하여 유형 안전성을 제공할 수 있습니다. 이것이 Typescript와 함께 redux를 사용하는 아름다움입니다.

<img src="/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_9.png" />

여기가 최종 코드 조각입니다.



```js
import { useAppSelector } from "./hooks/storeHooks"
import Counter from "./Counter";
import { useAppSelector } from "./hooks/storeHooks";
import { Row, Col } from "antd";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  return (
    <Row justify={'center'}>
      <Col>
        <Row justify={"center"}>
          <Col>
            <h1>카운트는 {count} 입니다. </h1>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col>
            <Counter />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default App;
```

터미널에서 다시 yarn dev를 실행하면 아래와 같은 결과를 얻을 수 있습니다.

<img src="/assets/img/2024-05-12-GettingStartedWithReduxReactTypescriptElectronusingVite_10.png" />

결론



축하합니다! React, Vite, Typescript 및 Redux를 사용하여 기본 전자 앱을 만들었습니다. 우리는 카운터의 초기 상태를 보유하는 slice를 작성했고, 카운터를 증가 및 감소시키는 reducer 함수를 만들었습니다. 또한 store를 생성하여 모든 slice를 보관하고, store 내의 값을 조작하는 기본 컴포넌트를 생성했고 App.tsx 컴포넌트에서 store 내의 값에 구독했습니다. 이는 Redux를 사용한 기본 사용 사례이며, Redux를 실제 프로젝트에 적용하는 다른 예시로는 인증 상태 구독, 다크 모드 설정, 사용자 데이터 변경을 감시하는 것 등이 있습니다.

Electron, Vite 및 Redux에 대해 더 자세히 알아보려면 다음 문서 링크를 확인해보세요.

- Redux — https://redux.js.org/
- Vite — https://vitejs.dev/
- Electron — https://www.electronjs.org/