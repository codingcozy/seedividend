---
title: "리덕스 사가 사용하는 방법(기초)"
description: ""
coverImage: "/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_0.png"
date: 2024-05-01 17:33
ogImage:
  url: /assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_0.png
tag: Tech
originalTitle: "Getting Started with Redux Saga Tutorial"
link: "https://medium.com/@ibjects/getting-started-with-redux-saga-tutorial-740954fc9e49"
isUpdated: true
---

## 리덕스 기초를 제공하는 새가 튜토리얼입니다. 기초부터 고급 수준까지의 예제를 통해 리덕스 사가를 배워보세요. 리덕스 사가 개념을 활용하여 블로그 앱을 만들어보세요.

![](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_0.png)

## 배경:

약 2개월 전에 리덕스 사가를 배우기 시작했고, 리덕스에 대한 이해도가 조금밖에 없었습니다. 처음에는 혼란스러울 수 있지만, 한번 감을 잡게 되면 코드가 더 깔끔해지고 앱도 더 나아질 것입니다.

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

이 기사에서는 일반적으로 하는 것과는 다른 방식으로 정보를 공유해보려고 노력했습니다. 여러 작은 앱을 만들어 한 가지 또는 여러 개념을 이해하는 데 중점을 두었습니다. 이 기사가 여러분이 실용적인 방식으로 개념을 이해하는 데 도움이 되기를 바랍니다.

## 어떻게 진행할 것인가요?

리덕스에 대해 간단히 다시 설명한 후 리덕스 사가의 다양한 개념을 예제와 함께 이해하는 데 도움이 될 것입니다.

## 설치하기:

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

필요한 라이브러리는 다음과 같습니다:

```js
yarn add @reduxjs/toolkit@1.8.3
yarn add react-redux@8.0.2
yarn add redux-saga@1.1.3
//선택 사항
yarn add axios@0.27.2
```

연습용으로 새 리액트 또는 리액트 네이티브(원하는 대로 선택) 프로젝트를 만들고 위의 패키지를 설치하세요. 저는 'redux-saga-tutorial'이라는 프로젝트를 만들었습니다:

```js
npx create-react-app redux-saga-tutorial
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

![이미지](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_1.png)

# Redux 간단 안내:

리덕스의 몇 가지 개념을 빠르게 되새겨 보겠습니다. 이 섹션 끝에는 기본적인 리덕스 예제가 풀코드로 제공됩니다.

초기 상태 / 전역 상태:
초기 상태는 앱의 모든 초기 값이 있는 일반 JS 객체입니다. 모든 최신 값이 포함된 전역 상태라고도 할 수 있습니다.

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

예를 들어, 앱 전체가 숫자를 증가 및 감소하는 데 관한 것이라면 초기 상태는 `value: 0, name: ''`와 같은 객체여야 합니다. API에서 아직 로드되지 않은 데이터와 같은 추가적인 사항이 있다면 초기 상태는 `allUserChats: [], allUsers: [], isLoggedIn: false...`와 같이 정의할 수 있습니다. 앱에서 필요한 모든 것들의 기본값을 가진 초기 상태를 사용할 수 있습니다.

최신 업데이트된 초기 상태의 값은 저장소에 유지될 것입니다. 저장소를 진실의 단일 출처로 생각하고 redux가 제공하는 저장소에서 값을 읽고 업데이트할 것입니다.

액션:
액션은 일반적인 JS 문자열입니다. 일반적으로 `domain/eventName`와 같은 형태로 선언합니다. 이러한 상수는 `profile/updateName`과 같은 고유한 액션의 이름입니다. 모든 것에는 액션 변수가 있어야 합니다.

액션은 앱에서 일어날 수 있는 모든 것으로 생각할 수 있습니다. 예를 들어, 앱에서 특정 API를 호출한다면 해당 API를 호출하는 액션이 있어야하며, 성공한 경우의 다른 액션 및 데이터를 검색하는 데 실패한 경우의 다른 액션이 있어야 합니다.

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

액션 크리에이터:
우리는 const SOME_ACTION_NAME = `domain/eventName`과 같이 액션 문자열을 만들고, 데이터를 전달할 수 있는 함수인 액션 크리에이터를 생성합니다. 보통, 액션 크리에이터에는 두 가지가 있습니다. 첫 번째는 우리가 만든 변수를 전달할 수 있는 액션의 이름인 type이고, 두 번째는 데이터를 보내는 payload입니다. payload라는 이름은 아무것이나 될 수 있습니다.

```js
function someActionCreator(text) {
  return { type: SOME_ACTION_NAME, payload: text };
}
```

만약 const NAME_UPDATED = `profile/updateName`와 같은 이름의 액션이 있다면, 해당 액션 크리에이터는 다음과 같을 것입니다:

```js
function updateProfile(text) {
  return { type: NAME_UPDATED, payload: text };
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

payload과 type은 원하는 대로 이름을 지을 수 있어요. 대부분의 개발자들이 사용하는 규칙이죠.

Reducer:
Reducer는 두 가지를 받는 함수에요:

- 초기 상태의 현재 상태
- 액션 객체 (기본적으로 액션 생성자)

```js
const initialState = { name: "" };
function myReducer(state = initialState, action) {
  switch (action.type) {
    case NAME_UPDATED:
      return { ...state, name: action.payload };
    default:
      return state;
  }
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

switch 문이 있다. 이 switch 문은 NAME_UPDATED 액션을 찾는데, 보통 상수로 선언된 별도의 파일에 있을 것입니다. 예를 들어, const NAME_UPDATED = `profile/updateName` 같은 식으로 선언될 것입니다.

어떤 액션이 취해지면 해당 리듀서를 호출하고, 리듀서는 취해진 액션을 확인하고 초기 상태를 업데이트할 겁니다. 이러한 요소를 아직 연결하지는 않았지만요.

이제 받게 될 액션은 state와 action 두 가지를 가질 겁니다. action은 우리가 위에서 액션 생성기 섹션에서 본 것처럼 객체일 겁니다. 그리고 우리는 보내는 type과 payload를 사용할 겁니다.

Provider / Redux를 주요 애플리케이션에 연결하기:
Redux 레이어 안에 우리 앱을 래핑하는 방법을 빠르게 살펴볼게요. 이를 통해 store 객체를 앱 전반에 걸쳐 접근 가능하게 만들 수 있습니다. index.js 같은 주 파일에서, 우리는 Provider를 가져와서 앱을 감싸는데, 이것은 접근이 필요한 모든 중첩된 컴포넌트에 store를 사용할 수 있게 합니다.

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
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { myReducer } from "../reducers";
const root = ReactDOM.createRoot(document.getElementById("root"));
// const rootReducer = combineReducers({myFirstReducer}); //in case you have more than one reducer. Don't forget to import it from @reduxjs/toolkit
const store = configureStore({ reducer: myReducer });
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

위의 코드에서는 하나의 reducer와 하나의 액션을 갖는 스토어 내에 전체 `App /`을 감쌌습니다. 이제 앱에서 디스패치가 발생하면 Provider가 해당 디스패치를 캐치하고 스토어에 전달합니다. 그런 다음 스토어는 리듀서로 이동하여 함수를 실행합니다.

디스패치:
어떻게 액션을 트리거할까요? 현재 액션은 한 파일에 있고 리듀서는 다른 파일에 있습니다. Redux가 리듀서로 이동하고 올바른 작업을 수행하도록 액션이 트리거되어야 합니다. 이때 디스패치(dispatch)가 필요합니다. `react-redux`에서 import useDispatch를 사용하여 가져올 수 있고, 다음과 같이 변수를 만들어서 액션의 디스패처로 사용할 수 있습니다: const dispatch = useDispatch();. 버튼이 있고 그 버튼의 onPress에서 dispatch(type: NAME_UPDATED, payload: input.text); 같은 작업을 할 수 있지만, 앞서 updateProfile와 같은 액션 생성자를 만든 경우 다음과 같이 호출할 수 있습니다:

```js
import { useDispatch } from 'react-redux';
function example() {
    const myDispatch = useDispatch();
    return (
        <Button title='Update Name' onPress={() => {
            myDispatch(updateProfile('input.text'))
        } />
    )
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

사용자가 버튼을 눌렀거나 앱을 통해서도 동작을 수행할 수 있습니다. API 응답을 통해 작업을 트리거할 수 있습니다.

선택기:
선택기를 사용하면 리덕스 스토어에서 데이터를 추출할 수 있습니다. useDispatch와 마찬가지로 선택기에도 useSelector라는 훅이 있습니다.

```js
import { useSelector } from "react-redux";
function example() {
  const mySelector = useSelector((store) => store);
  return <Text>{mySelector.name}</Text>;
}
```

useSelector()는 뷰를 다시 렌더링하도록 강제하지만, 선택기 결과가 마지막 결과와 다른 것처럼 보일 때에만 다시 렌더링을 수행합니다. 전체 스토어를 반환하며, 초기 상태에 있는 것들에 접근할 수 있지만 업데이트된 값을 얻을 수 있습니다.

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

모든 것을 함께 해보자!
위의 예제를 다음 보일러플레이트 코드에 결합한 것을 살펴봅시다:

위의 코드 예제에서는 App.js에서 액션을 디스패치했으며(useDispatch), App.js에서 이를 소비하고 있습니다(useSelector). 앱은 단순히 값을 업데이트하여 보이는 것을 빠르게 확인할 수 있습니다.

이것은 리덕스가 어떻게 작동하는지에 대한 매우 간단한 예시입니다. 동일한 개념을 사용하여 다른 작업들을 구축할 수 있습니다. 예를 들어, API 데이터를 상태로 로드하는 경우에는 name 대신에 다른 이름을 사용할 수 있습니다. 예를 들어 allProductsData 또는 allUser 등이 될 것입니다. 그리고 이것은 문자열(string) 유형이 아니라 객체 또는 배열 [] 또는 객체들의 배열 또는 그 외의 것들이 될 것입니다. 따라서 다음과 같은 경우에는 액션을 생성하고 리듀서에서 처리할 수 있습니다. API 호출의 경우, 이 튜토리얼에서 이전에 작성한 파이어베이스 예시를 참조할 수 있습니다.

이 내용이 유익하게 느끼는 분들을 위해, 새 페이지를 추가해보고 해당 페이지로 이동하여 선택기(selector)만 호출해보세요. 그러면 값이 업데이트된 것을 확인할 수 있습니다.

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

![Redux Saga](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_2.png)

# Redux Saga:

가장 쉽게 설명하는 방법은 redux-saga는 비즈니스 로직을 프론트엔드로부터 분리한다는 것입니다. Saga는 이벤트 기반 솔루션이라고 언급할 수 있으며, 이벤트를 발생시키고 해당 이벤트에 대해 실행되어야 하는 로직을 처리합니다.

Redux-saga가 어떻게 작동하는지 이해하려면 redux-saga의 개념을 이해한 후에 명확해질 수 있는 다양한 플로우 다이어그램을 찾을 수 있습니다. 여기에 하나의 다이어그램이 있습니다. 전반적인 아이디어를 얻을 수 있습니다.

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

![Getting Started with Redux Saga Tutorial](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_3.png)

위 다이어그램에서 사용자가 'Get Users' 버튼을 누르면 액션이 발생합니다. 이 액션은 사가로 전송되고, 사가 파일에서는 특정 액션이 취해졌을 때 어떻게 할지를 정의합니다. 특정 액션이 발생했을 때 우리 앱이 수행하길 원하는 API 또는 다른 유형의 기능을 의미합니다. 따라서 API 호출 / 결과 대기 단계는 사용자 액션이 발생했을 때 수행할 기능의 일부입니다. 이 단계가 점선으로 표시되는 이유는, 이것이 필수 단계가 아니며 사가가 직접적으로 리듀서로 이동할 수 있지만, 리듀서 확인은 과정에서 필수적인 단계이고, 리듀서는 필요에 따라 상태를 업데이트하거나 동일한 상태를 반환할 것입니다. 아래 GIF 이미지는 인터넷에서 발견한 것입니다. developpaper 웹사이트에서 찾았던 것 같은데, 리덕스 사가 환경에서 $10을 입금하는 액션이 어떻게 발생하는지 보여줍니다. GIF 아래의 미들웨어를 사가로 생각해보세요.

![Redux Saga Tutorial GIF](https://miro.medium.com/v2/resize:fit:1400/1*AyYYoeDMTTK_7J7aCeaIUA.gif)

위의 플로우를 기억하며, 사가 학습을 시작해봅시다.

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

리덕스-사가의 개념을 이해하려면 API를 호출하는 간단한 예제를 살펴보는 것이 도움이 됩니다. 따라서 사가를 사용하여 이를 수행하는 프로그램을 작성해 보겠습니다. 그러나 그 전에 리덕스-사가를 이해하는 데 도움이 될 두 가지 JavaScript 관련 사항이 있습니다:

- 제너레이터 함수
- 제너레이터 함수에서의 yield 키워드

제너레이터 함수에 대한 간단한 개관을 작성했는데 여기에는 yield 부분도 포함되어 있습니다.

그래서 이 튜토리얼에서는 제너레이터 함수 및 yield에 대해 자세히 다루지는 않겠지만 사가를 배우려면 위의 JavaScript 개념을 알고 있어야 합니다.

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

이제 첫 번째로 우리 이야기를 시작하는 데 필요한 고수준의 설정을 해 봅시다. 우리가 store를 설정할 때 index.js 파일에서 한 것과 같이요.

```js
// ... 다른 imports
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { myReducer } from "./reducers";
import App from "./App";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({ reducer: myReducer, middleware: [sagaMiddleware] });
// TODO: 곧 여기서 saga를 실행해야 합니다
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

위 코드에서 세 가지를 했어요:

- 이름에 명시된대로 우리 앱에서 saga를 생성하는 데 도움이 될 createSagaMiddleware를 가져왔어요.
- 우리가 모든 saga의 기능에 액세스할 수 있게 해주는 변수 sagaMiddleware를 생성했어요.
- 변수 sagaMiddleware을 store에 포함시켜 reducer를 다룬 것과 같이 앱 전체에서 액세스할 수 있도록 했어요.

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

그러니까 세 가지 작업을 수행해서 saga가 앱 전반에 걸쳐 사용할 수 있도록 준비할 거에요. 저는 saga를 메시지를 지속적으로 수신 대기하면서 실행되는 서비스로 생각해요. 메시지가 시작되면 그 다음에 뭘 해야 하는지 알고 있어요.

이 세 가지 작업을 actions.js에 추가해볼까요?

```js
export const GET_USERS_FETCH = "GET_USERS_FETCH";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"; // API 호출을 성공적으로 완료할 때 호출될 거에요
export const GET_USERS_FAILURE = "GET_USERS_FAILURE"; // API 호출을 실패로 완료할 때 호출될 거에요
```

액션을 생성할 때 대부분의 경우 액션 크리에이터도 함께 만듭니다. 여기서는 GET_USERS_FETCH에 대한 액션 크리에이터만 필요할 거에요. dispatch와 함께 호출될 것이기 때문에 useDispatch가 인자로 객체를 가져야 하며, saga 이펙트를 사용할 때 문자열을 전달할 수 있어서 그에 대한 액션 크리에이터가 필요하지 않을 거에요. 그러니까 actionCreators.js에 해당 액션 크리에이터를 만들어봅시다.

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
import { GET_USERS_FETCH } from "./actions";
export function takeGetUserFetchAction() {
  return { type: GET_USERS_FETCH };
}
```

매개변수가 필요하지 않기 때문에 단순히 타입만 반환하는 간단한 자바스크립트 객체입니다. 그러나 필요한 경우 매개변수를 전달해야 할 때는 redux 리프레셔 섹션에서 updateProfile(text)를 참조하십시오.

이제 sagas.js라는 새 파일을 만들고 세 부분으로 이 파일을 만들어 보겠습니다:

PART 1 — sagas를 사용하여 API를 호출하는 것이 목표이므로 먼저 API를 호출하고 응답을 반환하는 일반 함수를 추가합니다.

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
import axios from "axios";
function userFetch() {
  // 만약에 axios를 사용하고 싶지 않은 경우
  //return.fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}
```

위의 부분에서는 간단히 res.data;를 반환하는 함수를 만들었으며, 성공적으로 검색하고 오류가 발생할 경우 err을 throw합니다.

파트 2 — 이제 사용자가 호출되고 응답에 따라 작업을 트리거하는 제너레이터 함수를 작성할 것입니다.

```js
import { call, put } from "redux-saga/effects";
import { GET_USERS_SUCCESS, GET_USERS_FAILURE } from "./actions";
// ... axios와 같은 다른 import
// ... userFetch 함수와 같은 다른 코드
function* getUsersFetch() {
  try {
    const users = yield call(userFetch);
    //yield는 다음 줄로 넘어가기 전에 이 호출이 완료되기를 기다릴 것입니다.
    yield put({ type: GET_USERS_SUCCESS, users });
  } catch (error) {
    yield put({ type: GET_USERS_FAILURE, error });
  }
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

사용자 호출(fetch)을 하는 매우 직관적인 제너레이터 함수가 있습니다. 사용자 호출(fetch)로부터 응답이나 오류가 반환될 때까지 기다리도록 yield를 사용하였습니다. redux-saga/effects에서 call은 함수를 호출하는 데 사용되며 결과를 users 변수에 저장합니다. 다음으로, put은 미들웨어에 action을 스토어에 디스패치(dispatch)할 것을 예약하는 효과 설명을 생성합니다. 이 디스패치는 즉시 이루어지지 않을 수 있으며, Saga 작업 큐에서 다른 작업이나 진행 중인 작업이 있을 수 있습니다. 그래서 디스패치가 완료되면 결과를 성공 또는 실패로 전달할 것입니다.

제 3부 — Redux 프레임워크에서는 액션이 중요한 역할을 합니다. 각각이 다른 목적을 가진 앱에서 실행되는 고유한 프로세스입니다. 따라서 채워야 할 액션이 하나 남았는데, 바로 GET_USERS_FETCH입니다. 이 액션을 디스패치할 때마다 getUsersFetch를 호출할 것입니다.

```js
import { call, put, take } from "redux-saga/effects";
import { GET_USERS_FETCH } from "./actions";
// ... axios, actions 등의 다른 import들
// ... userFetch, getUsersFetch 함수 등의 다른 코드
function* mySaga() {
  while (true) {
    yield take(GET_USERS_FETCH);
    yield call(getUsersFetch);
  }
}
export default mySaga;
```

위의 코드에서 GET_USERS_FETCH 액션이 발생할 때마다, saga는 getUsersFetch 제너레이터 함수를 호출하여 API에 대한 호출을 수행하고 성공 또는 실패 시 액션을 트리거하는 동작을 합니다.

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

`take`는 미들웨어에게 Store에서 특정 액션을 기다리라는 Effect 설명을 만듭니다. 즉, 버튼을 누를 때 이를 듣고 있을 것이며, 우리가 액션을 디스패치할 때 take(GET_USERS_FETCH)가 이 액션을 알거나 이를 듣고 있는 상태이며, 이 액션이 발생하면 getUsersFetch 제너레이터 함수를 호출합니다. 따라서 yield는 매우 중요한 개념으로, 이것은 일시중지/재개를 담당하는 문 앞의 가드와 같습니다. 즉, yield take(GET_USERS_FETCH)는 GET_USERS_FETCH 액션이 발생할 때까지 대기 상태에 있을 것입니다. 해당 액션이 발생하면 그 yield는 완료되고, 그런 다음 yield call이 작동하며 getUsersFetch로부터 응답이 올 때까지 더 이상 실행되지 않게 됩니다.

이 제너레이터 함수의 이름은 mySaga이며 이것은 루트 또는 메인 리듀서에서 본 것과 같이 우리의 주요 사가가 될 것입니다. 우리는 모두를 사용하여 사가를 결합할 수 있지만, 이 특정 예제에서는 하나만 있을 것입니다.

이게 sagas.js 파일에 있는 모든 내용입니다.

다음으로 우리는 액션을 수행할 reducer.js 파일을 준비할 것입니다.

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
import { GET_USERS_FAILURE, GET_USERS_SUCCESS } from "./actions";
const initialState = {};
const myReducer = (state = initialState, action) => {
switch (action.type) {
case GET_USERS_SUCCESS: return { ...state, payload: action.users };
case GET_USERS_FAILURE: return { ...state, payload: action.error };
default: return state;
};
export default myReducer;
```

이 리듀서는 성공 또는 실패 이벤트가 발생했을 때 호출됩니다. 이제 할 일이 두 가지만 남았어요. 하나는 API가 반환할 데이터를 표시할 수 있도록 App.js를 변경하는 것이고, 두 번째는 우리가 index.js에 // TODO:를 추가한 sage를 실행하는 것입니다. 먼저 sage를 실행한다는 것이 무엇을 의미하는지 살펴보겠습니다.

sage를 백그라운드에서 계속 실행되는 서비스로 생각해보세요. 사용자가 취한 동작의 수를 넣으면 적절히 처리하여 성공 또는 실패를 반환합니다. 기다렸다가 현재 것을 해결한 다음 다음 동작을 수행합니다. 그러므로 루트 파일에서 실행할 필요가 있습니다. index.js를 열고 다음 한 줄의 코드(사실상 2줄)를 추가하세요:

```js
import mySaga from "./sagas";
// ... 모든 다른 import 및 코드 위에
sagaMiddleware.run(mySaga);
// ... 루트에 render(...와 같은 다른 코드
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

런은 앱이 실행 중이라면 작업이 발행될 때마다 우리의 사가를 시작합니다. 그 다음으로, 정확히 그것을 할 거에요. App.js를 열고 버튼을 누르면 fetch 작업이 트리거되는 UI를 만들어볼 거에요.

```js
import { useDispatch, useSelector } from "react-redux";
import { takeGetUserFetchAction } from "./actionCreators";

function App() {
  const myDispatch = useDispatch();
  const retrivedData = useSelector((state) => {
    return state.myReducer;
  });

  return (
    <div className="App">
      <h1>Users</h1>
      <button onClick={() => myDispatch(takeGetUserFetchAction())}>Call API</button>
      <hr />
      <div>
        {retrivedData?.users && retrivedData.users.map((user) => <div key={user.id}>{user.name}</div>)}
        {retrivedData?.error && <p>{retrivedData.error.message}</p>}
      </div>
    </div>
  );
}

export default App;
```

useSelector에서 전체 상태를 반환할 수도 있었지만, 관심 있는 reducer만 선택했어요. 사용자 또는 오류가 발생할 것이므로 데이터를 그에 맞게 렌더링하고 있습니다. 지금 실행하고 버튼을 클릭하면 데이터가 표시될 거에요. 그러나 사가 파일의 URL을 https://jsonplaceholder.typicode.com/user로 변경하면 오류가 출력될 거에요.

따라서 사가를 사용하여 간단한 API 요청을 만들었습니다. 여기 모든 주제에 대한 실행 예시를 보여주는 코드가 있어요:

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

## 위 예제를 더 간단하게 만드는 방법

위 예제에서 우리는 목표를 달성했습니다. 그러나 여러분이 redux 훅들을 사용하여 매우 쉽게 작업할 수 있음을 알 수 있기 때문에 더 간단하게 만들 수 있습니다. createAction, createReducer 등의 많은 훅들이 있으며 우리가 살펴볼 것입니다.

가능한 한 더 많은 부분을 순수 JS로 유지하여 뒷단을 이해할 수 있도록 기본적인 접근 방식을 취했습니다. 그래서 이제 우리가 할 일은 몇 가지 더 많은 훅과 효과를 사용하여 위 예제를 간소화하고 그것이 어떻게 간단해지는지 확인하는 것입니다.

지금쯤에 혹시 saga가 어떻게 작동하는지 주목하지 못했다면, saga를 백그라운드에서 실행되는 서비스로 생각할 수 있습니다. 지속적으로 액션을 수신하며 해당 액션이 트리거되면 즉시 작동하여 액션을 수행하고 다른 쓰레드에서 다른 함수를 실행하고 다양한 작업을 완전 비동기적으로 수행 할 수 있는 기능을 제공합니다.

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

우리가 해야 할 첫 번째 일은 actions.js 파일과 actionCreators.js 파일 두 개 대신에 actions.js 파일 하나만 필요할 것이라는 것이에요. 그리고 아래 코드를 추가할 거에요:

```js
import { createAction } from "@reduxjs/toolkit";
export const GET_USERS_FETCH = createAction("GET_USERS_FETCH");
export const GET_USERS_SUCCESS = createAction("GET_USERS_SUCCESS");
export const GET_USERS_FAILURE = createAction("GET_USERS_FAILURE");
```

이것은 각각에 대한 action과 action 생성자를 만들었기 때문에, 많은 시간을 절약할 수 있고 actions를 생성하고 사용하는 복잡성을 줄일 수 있어요. 또한, 디스패치(dispatch), 선택자(selector), 또는 리듀서(reducer)에 전달할 때 문자열(action) 또는 객체(action 생성자)가 어디로 갈지 걱정할 필요가 없어요. 이를 전달하면 createAction이 대신 책임지고 필요한 대로 사용되고 자동으로 반환할 거라는 거죠.

createAction을 사용해 매개변수를 전달하고 다양한 작업을 할 수도 있고, 간단하게 action을 생성하는 법도 확인할 수 있어요.

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

다음으로 createReducer에 대해 살펴보겠습니다. 이름에서 알 수 있듯, 여러 귀찮은 일을 덜어주는 reducer를 만들어줄 겁니다. createReducer(INITIAL_STATE, 빌더 콜백 함수)라는 두 가지 매개변수를 사용합니다. (빌더 함수는 .을 사용하여 조인 가능한 체인 구조를 계속하여 만들 수 있는 함수입니다.)

그래서 우리는 reducer.js 파일을 다시 작성할 거에요:

```js
import { createReducer } from "@reduxjs/toolkit";
import { GET_USERS_FAILURE, GET_USERS_SUCCESS } from "./actions";
const initialState = {};
const myReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_USERS_SUCCESS, (state, action) => {
      state.users = action.users;
    })
    .addCase(GET_USERS_FAILURE, (state, action) => {
      state.error = action.error;
    })
    .addDefaultCase(() => {});
});
export default myReducer;
```

위의 코드에서, switch 문에서 했던 것과 유사한 작업을 했지만 여기서는 빌더 함수 접근 방식을 사용했습니다. 우리는 .addCase를 원하는 만큼 사용할 수 있고, 그 후 .addDefaultCase(선택사항)를 사용하여 기본 문을 처리할 수 있어서 builder.addCase(...).addCase(...).addCase(...)….addDefaultCase(...)과 같은 체인 빌더를 생성할 수 있습니다. 모든 case는 상태와 액션을 가지며, 상태/초기 상태를 업데이트할 수 있도록 지정할 수 있습니다. 이것을 스위치 문 형식으로 생각한다면 매우 간단합니다.

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

그래서 "createAction"과 "createReducer"을 사용하면 코드의 복잡성을 줄일 수 있다는 것을 보았어요. 위의 변경 사항을 적용하려면 'App.js'에서 액션을 디스패치하는 부분에 작은 변경 한 가지를 해야 해요. 다음과 같이 바꿔 주세요:

```js
// ... 다른 import들
import { GET_USERS_FETCH } from "./actions";
// ... 다른 코드
<button onClick={() => dispatch(GET_USERS_FETCH())}>API 호출</button>;
```

GET_USERS_FETCH는 createAction을 사용하여 생성되었기 때문에 액션 생성자가 자동으로 생성되어 있으므로 GET_USERS_FETCH()와 같이 호출할 수 있고, 이렇게 하면 액션이 트리거되어요. 사가에 변경 사항이 없었기 때문에 액션이 캐치될 것이며, 나머지 플로우도 그에 따라 작동할 거에요. 우리의 리듀서도 예상대로 작동할 거에요.

![이미지](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_4.png)

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

우리가 예전 예제를 확장해서 일을 더 쉽게 만들기로 했으니, 사가를 사용하는 앱에서 널리 사용되는 또 다른 것을 다루는 것이 좋겠죠. 아래에는 이 세 가지에 대한 간단한 설명이 있고, 그 후에 우리가 만드는 앱에서 이들을 사용하는 방법을 살펴볼 거에요.

- take
  yield take(pattern)의 결과는 디스패치된 액션 객체입니다. 이는 미들웨어 (saga)에게 특정 액션이 저장소에서 취해질 때까지 기다리라고 알려줍니다. take는 한 번만 액션을 취하기 때문에 버튼을 클릭할 때마다 작업을 하려면 while(true) ... 안에 넣어야 합니다. 또는 use case에 따라 takeEvery나 takeLatest를 사용할 수도 있어요.
- takeEvery
  GET_USERS_FETCH 액션을 동시에 호출하도록 가능하게 합니다. 주어진 순간에 우리는 아직 종료되지 않은 하나 이상의 이전 GET_USERS_FETCH 작업이 있을 때, 새로운 GET_USERS_FETCH 작업을 시작할 수 있습니다. GET_USERS_FETCH 액션을 실행하면 이를 버튼에서 디스패치합니다. takeEvery는 동시 작업을 처리할 수 있게 해줍니다. 위의 예에서 GET_USERS_FETCH 액션이 디스패치되면, 이전 GET_USERS_FETCH가 아직 종료되지 않은 상태여도(예를 들어, 사용자가 빠르게 두 번 연속 'API 호출' 버튼을 클릭한다면, 두 번째 클릭에서는 fetchUser가 아직 종료되지 않았더라도 GET_USERS_FETCH 액션이 디스패치됩니다)
- takeLatest
  한 번에 하나의 GET_USERS_FETCH 작업만 활성화될 수 있습니다. 또한, 가장 최근에 시작된 작업이 될 것입니다. 이전 작업이 계속 진행 중일 때 새로운 GET_USERS_FETCH 작업이 시작된다면, 이전 작업은 즉시 중단됩니다. takeEvery와는 반대로, takeLatest는 동일하게 실행 중인 작업을 중지하고 새 작업을 시작합니다. 각 액션이 저장소에 디스패치될 때마다. 액션이 패턴과 일치하면 takeLatest가 백그라운드에서 새로운 saga 작업을 시작합니다. 이전에 시작된 saga 작업이 있었다면(실제 액션이 디스패치되기 전의 마지막 액션에서 시작된 경우), 그 작업이 계속 실행 중이었다면, 해당 작업은 취소될 것입니다.

take, takeEvery, takeLatest의 실제 예제를 보려면 이를 시도해 보세요:

그러니 sagas.js 파일을 열어서 take와 call 라인을 다음과 같이 바꿔주세요:

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
import { call, put, takeEvery } from "redux-saga/effects";
function* mySaga() {
  yield takeEvery(GET_USERS_FETCH, getUsers);
}
```

매우 간단한 방법으로, GET_USERS_FETCH가 실행될 때마다 getUsers 함수를 실행하라는 것을 나타내는 것이다. 이전과 똑같이 작동하는 것을 확인할 수 있을 것이다. 이제 takeEvery를 사용하는 이유와 takeLatest 또는 take를 사용하지 않는 이유는 사용 사례에 따라 달라진다.

따라서 기본적으로 이전에 작성한 앱을 변환한 것입니다. 이번에는 간단하게 만드는 데 집중했습니다. createAction, createReducer, takeEvery 등의 사용법을 배웠습니다.

지금까지 한 모든 변경 내용이 반영된 코드는 다음과 같습니다:

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

# 고급 개념을 간단하게

여기서는 고급으로 간주되는 몇 가지 개념을 다룰 것입니다. 그러나 그 본질을 이해한다면 실은 간단한 경우도 있습니다. 이전 섹션에서 본 것처럼, 여기서도 상황은 비슷할 것입니다. 모든 것을 다 다룰 수는 없겠지만, 가능한 많은 개념을 사용하는 예시를 살펴볼 것입니다. fork, cancel, createSelector 등 몇 가지 주제를 다룰 예정입니다.

플로우를 차단할 것인지 말 것인지, 그리고 기대만들 것인지 여부를 이해하는 것이 중요한 포인트가 될 것입니다. 이는 yield가 다음 코드 줄을 실행하기 전에 기다릴 것인지 여부가 우리가 사용하는 효과에 따라 다르다는 것을 의미합니다. 그래서, 간단하고 명확한 설명은 다음과 같습니다:

## 차단/비차단 효과

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

저희는 테이크(take), 콜(call), 푸트(put) 등 사가의 다양한 효과를 보았어요. 이를 두 가지 범주로 분류할 수 있어요:

- 블로킹(Blocking)
- 논블로킹(Non-Blocking)

블로킹 호출은 사가가 효과를 생성하고, 해당 실행 결과를 기다린 다음에야 생성기 안에서 다음 명령을 재개할 것을 의미해요.

논블로킹 호출은 사가가 효과를 생성한 후 즉시 재개될 것을 의미해요. 즉, 호출자는 작업을 시작하고 완료를 기다리지 않고 실행을 계속할 거에요.

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

TLDR; Blocking은 흐름을 차단하고 non-blocking은 길을 막지 않습니다. 우리가 배운 대로, yield는 응답/에러가 제공되거나 현재 작업에서 해결/거부될 때까지 실행을 일시 중단하지만 어떤 사가 효과는 과정을 일시 중단시키지 않는 non-blocking이며 실행 중인 작업 기능을 백그라운드에서 실행하면서 코드가 다음 줄을 실행할 수 있게 합니다. 예시가 있습니다:

다른 많은 것들이 있고 앱에서 모두 사용하지 않을 수 있지만 어떤 것이 차단 또는 비차단 호출인지 알아두는 것이 좋습니다. 다음은 효과 목록이며 차단/비차단 여부입니다:

차단/비차단 설명에서 알 수 있듯이, 사가를 사용함으로써 우리는 시스템을 통해 논리가 어떻게 흐를지를 많이 제어하고 데이터 흐름과 각 효과가 다양한 사용 사례에서 유용한 기능을 갖습니다.

# Fork & Cancel

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

fork()은 (일종의 takeEvery와 비슷하게) 병렬로 작업을 실행하는 데 사용되지만 흐름을 차단하지 않습니다. 비차단 작업을 시작해야 할 때 사가가 유용합니다.

fork()을 프로세스를 가져와서 별도의 스레드에서 별도로 실행하는 것으로 생각할 수 있습니다. 작업을 완료하거나 거부할 때 해당 작업을 실행하던 함수가 알림을 받아서 컴파일러는 해당 함수를 종료합니다. 이 개념은 많은 개념과 비슷할 수 있지만, 핵심적인 차이점은 fork가 다음 코드 줄을 실행하는 것을 막지 않지만, 현재 있던 함수를 종료하지 않는다는 점입니다. 즉, 컴파일러는 fork가 모두 완료되거나 응답하면 해당 함수를 종료합니다. 이 개념을 실제로 이해하려면 아래 예제를 살펴보세요.

## 예제

앱에서 사용자가 다음 작업을 수행할 수 있는 화면에 있다고 가정해보세요:

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

- 사용자 목록을 가져오는 API를 호출합니다.
- 게시물을 가져오는 API를 호출합니다.
- 댓글을 가져오는 API를 호출합니다.
- 앱을 종료하는 것은 이전 화면으로 돌아가는 것을 의미합니다.

먼저 사가의 fork를 사용하여 게시물을 가져오는 API를 호출할 것입니다.

모든 작업은 서로 의존하지 않습니다. 이들은 사용자가 언제든지 화면에서 수행할 수있는 네 개의 독립적인 예상 작업입니다.

actions.js에 다음과 같은 작업이 있습니다.

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
export const GET_POSTS_FETCH = createAction("GET_POSTS_FETCH");
export const GET_POSTS_SUCCESS = createAction("GET_POSTS_SUCCESS");
export const GENERAL_FAILURE = createAction("GENERAL_FAILURE");
export const EXIT_APP = createAction("EXIT_APP");
```

대부분의 생성된 액션은 어떤 작용을 하는지 명확하지만, EXIT_APP은 사용할 효과를 보여주기 위해 추가한 액션입니다. 사용자가 화면을 떠날 때 또는 뒤로 돌아갈 때를 생각해보면, 사가를 깨끗하게 정리하기 위해 exit 함수를 호출합니다. API를 호출하고 결과를 가져오고자 할 때는 Post fetch를 사용합니다. API 호출 시 오류가 발생한 경우 General failure을 사용하고, 데이터를 성공적으로 가져온 경우에는 success가 트리거됩니다.

이제 sagas.js를 세 부분으로 나누어 만들어봅시다:

```js
// PART 1
function getPosts() {
  console.log("Now calling getPosts API");
  return axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
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

위의 코드는 간단한 JS 함수를 호출하여 결과를 반환하는 것뿐입니다. 다음으로, 우리는 아래에 있는 사가를 추가할 것입니다.

- getPosts API 호출하기
- 응답이나 오류 가져 오기

```js
import { call, put, take } from 'redux-saga/effects';
// PART 2
function* getPostsSaga() {
while (true) {
try {
console.log("getPosts action ready...");
yield take(GET_POSTS_FETCH);
console.log("getPosts action started...");
const posts = yield call(getPosts);
console.log("getPosts action fetched...");
yield put({type: GET_POSTS_SUCCESS, posts: posts});
console.log("getPosts action finished...");
} catch (error) {
console.log("getPosts action failed...");
yield put({type: GENERAL_FAILURE, error: error});
console.log("getPosts action error finished...");
}}
```

위 코드에 콘솔 로그를 추가하여 코드가 멈추는 지점과 대기하는 지점을 효율적으로 확인할 수 있도록 했습니다. 위 코드는 GET_POSTS_FETCH 액션을 받고 API를 호출하고 응답이나 오류를 받은 후에 작업을 수행하도록 되어 있습니다.

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

자, 이제 우리는 방금 생성한 getPostsSaga를 호출할 메인 Saga가 필요합니다. 그러니 이렇게 만들어 봅시다:

```js
import { call, put, take, fork, cancel } from "redux-saga/effects";
// PART 3
export default function* mySaga() {
  const posts = yield fork(getPostsSaga);
  console.log("이제 사용자의 작업을 기다리고 있습니다...");
  yield take(EXIT_APP);
  console.log("앱을 종료 중입니다...");
  yield cancel(posts);
  console.log("종료가 완료되었습니다...");
}
```

fork가 블로킹되지 않는 호출이기 때문에 call(...)과 같은 기대값이나 take와 같은 기다림이 필요하지 않습니다. 위의 코드에서는 실제로 이야기를 전달하고 있는데, 즉시 Saga가 시작되면 getPostsSaga를 fork했음을 의미합니다. 즉, getPostsSaga 함수를 완료할 때까지 기다리지 않고 별도의 스레드에서 실행합니다.

getPostsSaga의 첫 줄이 take 이펙트인데, 이는 GET_POSTS_FETCH 액션을 '청취'하거나 '감시'하기 시작하게 됩니다. 이 액션이 실행될 때가지 즉시 take를 수행합니다. getPostsSaga에서 take와 같은 블로킹 호출이 없으면 전체 함수를 실행하게 되므로, 사용자가 이 작업을 취할 때마다 Saga는 별도의 스레드에서 이를 실행하기 위해 기다리게 됩니다(즉, 앱의 현재 흐름을 방해하지 않는 상태).

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

그럼 mySaga로 돌아가서 사용자의 동작을 기다리는 중일 것이에요... 지금 파일에서는 여기까지에요. 이제 yield take(EXIT_APP) 부분에 대해 곧 설명할게요. (console.log로 실행하면 훨씬 더 명확해질 거예요.)

따라서 우리는 sagas.js에서 API에서 게시물을 가져오는 기능을 달성하기 위해 세 가지를 했어요.

- 최신 게시물을 API에서 가져오기 위한 getPosts 함수를 생성함
- 응답, 오류 및 API 호출을 처리하는 getPosts를 위한 generator 함수를 작성함
- sagas에 대한 주 generator 함수를 생성해서 getPostsSaga를 분기함

지금은 이게 sagas 파일에서 우리가 할 일 전부에요. 다음으로 reducers.js를 설정할 건데요.

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
import { createReducer } from "@reduxjs/toolkit";
import { GET_POSTS_SUCCESS, GENERAL_FAILURE } from "./actions";
const initialState = {};
const myFirstReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_POSTS_SUCCESS, (state, action) => {
      state.posts = action.posts;
    })
    .addCase(GENERAL_FAILURE, (state, action) => {
      state.error = action.error;
    })
    .addDefaultCase(() => {});
});
export default myFirstReducer;
```

우리는 앱이 특정 동작을 취하기 위해 사용되지 않을 작업만 처리하려고 합니다. 사용자가 실제로 보고 싶어하는 데이터를 검색하지 않을 것이므로 그래서 이 두 작업만 추가되었습니다.

마지막으로, 이 작업을 시험할 화면인 App.js에서 열어서 다음을 추가하세요:

```js
{
  /* ...다른 코드... */
}
<button onClick={() => myDispatch(GET_POSTS_FETCH())}> 포스트 API </button>;
{
  /* ...다른 코드... */
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

버튼을 누르면 우리는 지켜보고 있는 SAGA에서 작업을 수행하도록 GET_POST_FETCH 액션을 취하고 싶습니다. 따라서 이 작업을 수행하자마자 getPosts 함수가 정상적으로 실행될 것입니다. 먼저 실행한 후 결과를 확인하고 무슨 일이 일어나는지 살펴보겠습니다:

![image](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_5.png)

앱이 로드되자마자 fork 때문에 getPostsSaga로 이동되었음을 볼 수 있습니다. 이는 이미 준비되어 있다는 것을 알기 때문에 GET_POST_FETCH 액션이 발생할 때마다 getPostsSaga의 나머지 부분을 실행하도록 준비되어 있을 것입니다. 다시 돌아와서 앱이 메서드를 fork했고 사용자가 필요한 작업을 언제든지 수행할 수 있도록 기다리고 있다고 출력합니다. 지금까지 사용자가 수행할 수 있는 작업은 두 가지 뿐입니다:

- API에서 게시물 가져오기
- 앱 종료하기

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

먼저 '게시물 API' 버튼을 클릭해 봅시다:

![게시물 API](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_6.png)

행동을 취하자마자 API를 호출하기 시작할 것이며, 데이터를 가져오면 완료됩니다. 계속해서 while(true)를 사용하므로 다시 준비됩니다. '게시물 API' 버튼을 다시 누르면 API가 다시 호출됩니다:

![게시물 API](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_7.png)

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

이제 "exit" 버튼을 누르면 어떻게 될까요? 우리가 "이제 사용자의 조치를 기다리고 있습니다…"를 출력했던 것을 기억하십니까? 바로 이후에는 yield take(EXIT_APP)를 수신하고 있음을 의미합니다. 총으로 보면, 포스트 API를 호출하는 블로킹 콜과 exit를 수신하고 있습니다. Saga는 두 가지를 동시에 수신하고 있는데, 이 둘 중 하나의 작업이 수행될 때마다 saga는 해당 지점에서 흐름을 계속합니다.

그래서 지금 "exit" 버튼을 클릭하면 콘솔에 우리가 가진 console.log가 인쇄됩니다.

![이미지](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_8.png)

"exit"가 호출되면 cancel(posts)가 실행되는데, 이는 saga에게 GET_POST_FETCH 액션을 듣는 것을 중단하라는 것입니다. 그래서 지금 "포스트 API" 버튼을 누르면 아무 일도 일어나지 않을 것입니다. 이것이 앱에서 흐름을 제어하는 방법이며, 필요한 것에만 집중할 수 있습니다. 해당 작업을 다시 열려면 사용자가 화면에 다시 입력하거나 재시작해야 합니다. 따라서 fork 사용을 신중하게 계획해야 하며, 이를 올바르게 활용하면 매우 유용하고 삶을 더 쉽게 만들어줄 것입니다.

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

## 현재 예제 확장하기 (블로그 앱)

createSelector, fork 및 기타 개념들을 학습하기 위해 위 예제를 확장해보겠습니다. 두 개의 새 버튼, 즉 Comments API 및 UsersAPI를 추가하여 동일하게 API를 호출하고 결과를 검색할 것입니다. 포스트와 동일한 방법으로 수행됩니다.

그러므로, 해당 액션들을 추가해 시작해봅시다:

```js
import { createAction } from "@reduxjs/toolkit";
export const GET_POSTS_FETCH = createAction("GET_POSTS_FETCH");
export const GET_COMMENTS_FETCH = createAction("GET_COMMENTS_FETCH");
export const GET_USERS_FETCH = createAction("GET_USERS_FETCH");
export const GET_POSTS_SUCCESS = createAction("GET_POSTS_SUCCESS");
export const GET_COMMENTS_SUCCESS = createAction("GET_COMMENTS_SUCCESS");
export const GET_USERS_SUCCESS = createAction("GET_USERS_SUCCESS");
export const EXIT_APP = createAction("EXIT_APP");
export const GENERAL_FAILURE = createAction("GENERAL_FAILURE");
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

이제 이 예제에 필요한 모든 작업이 준비되었습니다. 이제 우리의 리듀서를 업데이트하여 GET_USERS_SUCCESS, GET_POSTS_SUCCESS 두 가지 새로운 성공 경우를 처리해봅시다.

```js
import { createReducer } from "@reduxjs/toolkit";
import { GET_USERS_SUCCESS, GET_POSTS_SUCCESS, GET_COMMENTS_SUCCESS, GENERAL_FAILURE } from "./actions";
const initialState = {};
const myReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_POSTS_SUCCESS, (state, action) => {
      state.posts = action.posts;
    })
    .addCase(GET_COMMENTS_SUCCESS, (state, action) => {
      state.comments = action.comments;
    })
    .addCase(GET_USERS_SUCCESS, (state, action) => {
      state.users = action.users;
    })
    .addCase(GENERAL_FAILURE, (state, action) => {
      state.error = action.error;
    })
    .addDefaultCase(() => {});
});
export default myReducer;
```

그다음, 사용자가 코멘트나 사용자 데이터를 가져오고 싶을 때 어떻게 처리할지 정의해야 합니다. 따라서 우리는 sagas.js 파일에 API 호출 함수를 작성할 것입니다. 비즈니스 로직을 처리하는 곳입니다.

```js
function getComments() {
  console.log("Now calling getComments API");
  return axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}
function getUsers() {
  console.log("Now calling getUsers API");
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
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

getPosts 함수처럼 우리는 두 개의 새로운 API 호출 함수를 추가했습니다. 이제 두 함수에 대한 사가를 추가해야 하는데, 이는 특정 액션이 발생할 때 대기하고 실행하고 결과를 반환하는 것을 의미합니다. getPostsSaga와 유사하게 getCommentsSaga와 getUsersSaga를 추가할 것입니다.

![이미지](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_9.png)

console.log 함수를 제거하면 매우 간단합니다. take 때문에 이 액션을 청취하기 시작합니다. 해당 액션이 발생하자마자 사가가 API 함수를 호출하고 성공하면 성공 액션을 호출하여 데이터를 리듀서에 넣습니다. 리듀서는 이를 초기 상태나 초기화된 상태에 추가할 것입니다.

새롭게 추가된 두 사가를 루트 수준에서 실행 중인 주 사가인 mySaga에 바인딩해야 합니다.

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
import { call, cancel, fork, put, take, all } from "redux-saga/effects";
//... other code
export default function* mySaga() {
  const posts = yield fork(getPostsSaga);
  const comments = yield fork(getCommentsSaga);
  const users = yield fork(getUsersSaga);
  console.log("이제 사용자의 조치를 기다리고 있습니다...");
  yield take(EXIT_APP); // 조치가 취해질 때까지 대기
  console.log("앱을 종료합니다...");
  yield all([cancel(posts), cancel(comments), cancel(users)]);
  console.log("종료가 완료되었습니다...");
}
```

우리는 fork를 사용하여 세 가지 모두에 대해 saga에게 듣도록 지시했습니다. fork는 비차단적이므로 세 가지 모두와 EXIT_APP까지 등록한 다음에 네 가지 조치 중 어느 것이든 취해질 때까지 기다립니다. fork는 기본적으로 getCommentsSaga 및 getUsersSaga 생성기 함수 내부로 들어가며 그 안에 차단 take가 있으므로 해당 saga가 GET_POSTS_FETCH, GET_COMMENTS_FETCH, GET_USERS_FETCH 및 EXIT_APP(종료 앱)를 대기하도록 등록한 방법입니다. 성공한 조치(GET_COMMENTS_SUCCESS 등)는 아직 등록되지 않았으며, 그런 경우 해당 동작이 취해지면 아무 일도 일어나지 않습니다. EXIT_APP이 취해질 때 댓글 및 사용자 리스너도 취소합니다.

이제 버튼 클릭으로 fetch 동작을 호출해야 하므로 App.js 또는 index.js를 업데이트하세요:

```js
//... other imports
import {
GET_POSTS_FETCH,
GET_COMMENTS_FETCH,
GET_USERS_FETCH,
EXIT_APP
} from "./actions";
//... other UI
<button onClick={() => myDispatch(GET_POSTS_FETCH())}>
게시물 API
</button>{" "}
<button onClick={() => myDispatch(GET_COMMENTS_FETCH())}>
댓글 API
</button>{" "}
<button onClick={() => myDispatch(GET_USERS_FETCH())}>사용자 API</button>{" "}
<button onClick={() => myDispatch(EXIT_APP())}>앱 종료</button>
<hr />
//... other UI after rendering posts
        {retrivedData?.comments &&
{retrivedData?.comments &&
retrivedData.comments.map((comment) => (
<div key={comment.id}>
   <p style={ fontWeight: "bold" }>{comment.name}</p>
   <p style={ fontSize: 12, marginTop: -16, marginBottom: -10 }>
      {comment.email}
   </p>
   <p>{comment.body}</p>
</div>
))}
{retrivedData?.users &&
retrivedData.users.map((user) => (
<div key={user.id}>
<p style={ fontWeight: "bold" }>
   {user.name} ({user.company.name})
</p>
<p style={ fontSize: 12, marginTop: -16, marginBottom: -10 }>
   {user.email} | {user.phone}
</p>
<p>
   {user.address.suite} {user.address.street}, {user.address.city}, {user.address.zipcode}
</p>
</div>
))}
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

위의 코드는 검색한 데이터를 출력할 것입니다. 이를 확인하는 가장 좋은 방법은 앱을 실행하는 것입니다.

![이미지](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_10.png)

한 번 실행하면, 우리 프로그램이 모든 세 가지 액션을 계속 지켜보고 있음을 볼 수 있고 사용자가 세 가지 액션 중 아무 것이라도 취할 수 있습니다. 먼저 Users API 액션을 취해 봅시다.

![이미지](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_11.png)

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

사용자 API에서 데이터를 가져와서 멋진 형식으로 렌더링되는 것을 볼 수 있습니다. 이제 다른 작업을 수행해 봅시다. 한 번의 포스트, 게시물 가져오기 또는 사용자들을 다시 가져올 수 있습니다. 계속해서 while(true) 문을 사용했기 때문에 다시 준비된 것을 볼 수 있습니다. 다음으로 댓글 API를 살펴보겠습니다:

![이미지](/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_12.png)

댓글이 가져와지고 맨 아래로 스크롤하면 사용자 데이터도 확인할 수 있습니다. UI에서는 댓글 후에 사용자 데이터가 렌더링됩니다.

지금까지 우리는 이전 섹션에서 한 것과 똑같은 방식으로 두 개의 사가 함수를 더 만들었습니다. 그 코드는 아래에 있습니다:

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

자, 좀 더 많은 훅을 살펴보도록 합시다. 기본적으로 블로그 앱의 형태 예시를 시작할 준비가 되었습니다.

## createSelector

이제, createSelector라는 편리한 훅을 어떻게 사용할 수 있는지 살펴보겠습니다. 아래 패키지를 설치하여 사용해 보세요:

```js
yarn add reselect *OR* npm i reselect
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

리덕스 복습 섹션에서 살펴본 대로 셀렉터(selector)는 객체에서 값을 선택하는 데 사용됩니다. 셀렉터는 단순히 더 큰 데이터 컬렉션에서 데이터 하위 집합을 선택하는 데 사용되는 함수입니다.

이 예시에서는 댓글, 사용자 및 포스트와 같은 데이터가 있고, 셀렉터를 사용하여 데이터를 슬라이스해서 사용자 id가 1인 사용자의 댓글을 선택하거나 id가 5인 사용자의 포스트를 선택할 수 있습니다. 기본적으로 데이터를 모두 페치한 블로그를 가정하고 이를 표시합니다. 이상적인 시나리오에서는 사용자를 위한 특정 포스트를 얻을 수 있는 API가 있을 것이며, 거기서부터 사용자의 상위 5개 포스트를 표시하는 셀렉터를 생성할 수 있습니다. 시나리오에 따라 셀렉터를 사용하고, 이 예시를 위해 모든 댓글, 사용자 및 포스트를 가져왔으므로 블로그 응용 프로그램에서 데이터를 필요에 맞게 구성할 수 있도록 필요한 만큼 많은 셀렉터를 만들어갈 것입니다.

우리의 블로그 앱에서는 다음과 같이 진행합니다:

- 앱을 시작할 때 모든 데이터를 가져오도록 3개의 fetch API 액션을 모두 트리거합니다. (실제 세계에서는 좋은 방법이 아니지만 이 튜토리얼을 위해서만 수행합니다.)
- 그런 다음 사용자에게 포스트 목록만 표시합니다. 이 목록은 클릭할 수 있습니다.
- 사용자는 어떤 포스트도 선택할 수 있습니다. 포스트를 선택하면 해당 사용자에 대한 댓글 및 사용자 정보를 가져오는 다른 액션을 트리거합니다. (여기서 createSelector를 사용할 것입니다)
- 다시 모든 포스트로 돌아갑니다.

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

## 블로그 게시물 목록 표시:

첫 번째로 할 일은 필요한 모든 데이터를 가져오는 것입니다. "Posts API", "Comments API" 등의 버튼을 제거하겠습니다. 앱을 시작하면 이러한 작업이 트리거될 것이기 때문입니다. 그래서 App.js에 다음을 추가하세요:

```js
import { useEffect } from "react";
//... 기타 imports
function App() {
  const myDispatch = useDispatch();
  useEffect(() => {
    // 시작 시 모든 데이터 가져오기. 데이터를 슬라이스하고 표시하기 위해 selector를 사용할 것입니다.
    myDispatch(GET_POSTS_FETCH());
    myDispatch(GET_COMMENTS_FETCH());
    myDispatch(GET_USERS_FETCH());
  }, [myDispatch]);
  //... 기타 코드
}
```

위 코드에서 세 가지 액션을 디스패치하여 모든 데이터를 가져왔습니다. 리듀서와 사가는 그대로이며, 이전 예제에서 만든 selector로 확인한 데이터가 있다는 것을 알고 있습니다.

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

약간 정리를 해보려고 합니다. sagas.js 파일에서 getPosts, getComments, 그리고 getUsers 함수를 apis.js라는 새 파일로 이동하고 거기에 붙혀보세요. 기본적으로, 제너레이터 함수만을 사가 파일에 유지하는 것으로 합니다.

```js
// apis.js
import axios from "axios";

export async function getPosts() {
  console.log("getPosts API를 호출 중입니다.");
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export async function getComments() {
  console.log("getComments API를 호출 중입니다.");
  return await axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export async function getUsers() {
  console.log("getUsers API를 호출 중입니다.");
  return await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}
```

위의 apis.js 파일에는 세 가지 API 함수를 추가하고, sagas.js 파일에서 이들을 제거했습니다.

이제 UI (App.js)를 수정해봅시다. 메인 return(...) 안의 모든 내용을 제거하고 다음 코드를 추가하세요:

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
return (
<div className="App">
   <h3>블로그 앱</h3>
   <div>
     <p>
      <b>더 많은 내용을 보려면 아래에서 블로그 글을 선택하세요:</b>
     </p>
     <hr />
     {retrivedData?.posts && retrivedData.posts.map((post) => (
           <a href={`/#${post.id}`} onClick={() => {
                 console.log(post);
              } key={post.id}>
              {post.id}: {post.title}
           </a>
           <br />
     ))}
   </div>
</div>
)
```

이 UI에는 링크 `a`만 있습니다. href는 링크처럼 느껴지게하는데 추가되었습니다. 앱을 실행하고 포스트를 선택하십시오. 콘솔에 출력되는 것을 볼 수 있습니다.

<img src="/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_13.png" />

그래서, 우리의 로직이 작동합니다. 이러한 변경만으로 우리가 위에서 논의한 총 4가지 중 처음 두 가지를 완료했습니다.

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

번호 3은 사용자가 이 게시물 중 하나를 선택할 때 해당 게시물, 댓글 및 작성자를 표시해야 하는 곳입니다. 이미 모든 데이터를 가지고 있기 때문에 우리가 해야 하는 것은 적절한 것을 필터링하고 표시하는 것 뿐입니다. 예를 들어, 사용자가 게시물 번호 31을 선택하면 31번 id를 가진 게시물에 대한 댓글과 해당 게시물을 작성한 사용자 이름을 가져와야 합니다. 그것이 바로 우리가 선택자를 생성할 곳입니다. 'Selectors'는 그 이름 그대로 데이터를 선택합니다. 그러니 새 파일을 만들어 selectors.js로 이름을 붙이고 첫 번째 선택자를 추가해 봅시다.

```js
export const allPosts = (state) => state.myReducer.posts;
const allComments = (state) => state.myReducer.comments;
const allUsers = (state) => state.myReducer.users;
```

위 코드에서는 가져온 전역 상태에서 allPosts를 간단히 내보냈습니다. 그것이 목록에 모든 게시물을 표시하는 데 필요한 유일한 것이기 때문에 내보내야 하는 것입니다. 다른 두 allComments 및 allUsers는 단순히 모든 데이터를 가져오기 위해 존재하며 다음으로 필요한 선택자를 만들 것입니다.

createSelector의 문서를 보면 3개의 매개변수를 받는다는 것을 알 수 있지만 아래에서보면 필요한 것은 첫 두 가지입니다.

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

<img src="/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_14.png" />

우리가 한 코드에는 입력 셀렉터로 사용할 수 있는 세 개의 데이터 객체가 있습니다. 입력 셀렉터란 선택하려는 데이터를 의미합니다. resultFunc는 원하는 방식으로 데이터를 잘라내고 반환할 수 있는 함수입니다. 여러 입력 셀렉터가 있을 수 있다는 점에 유의하세요 (곧 보게 될 것입니다). 이는 해당 데이터의 선택기를 만들어 데이터를 혼합하고 일치시킬 수 있다는 것을 의미합니다.

우리의 목표는 사용자가 게시물을 선택할 때 선택한 게시물, 해당 댓글 및 저자 정보를 가져와야 한다는 것입니다. 이를 위해 사용자가 선택해야 하는데, 이는 사용자가 ACTION을 취해야 한다는 의미입니다.

그래서 actions.js에 다음 액션을 추가해주세요:

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
//... 다른 작업들
// post를 매개변수로 받는 액션
export const SELECTED_POST = createAction("SELECTED_POST", (post) => {
  return {
    payload: {
      selectedPost: post,
    },
  };
});
```

우리는 이번에 createAction을 사용하여 매개변수를 받는 액션을 처음 만들었습니다. 이것은 이 액션을 전달할 때 우리가 post 객체를 전달할 것을 의미합니다. 그리고 저는 payload: selectedPost: post; (원하는 대로 구조화할 수 있습니다).

이 post 객체를 전역 상태에 저장해서 selector 및 다른 곳에서 액세스할 수 있도록 하려고 합니다. 따라서 reducers.js 파일로 이동하여 createReducer에 이 케이스를 추가해 보겠습니다.

```js
//... 다른 임포트들
import {
GET_USERS_SUCCESS,
GET_POSTS_SUCCESS,
GET_COMMENTS_SUCCESS,
GENERAL_FAILURE,
SELECTED_POST
} from "./actions";
//... 다른 코드
.addCase(SELECTED_POST, (state, action) => {
state.selectedPost = action.payload.selectedPost;
})
//... 다른 코드
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

그래서 전역 상태에서 selectedPost로 저장하고 있어요. 이제 selectors로 돌아가볼게요. 선택된 게시물의 댓글을 선택하는 selector를 만들 준비가 되었어요. selectors.js 파일을 열어서 다음 코드를 추가해주세요:

```js
import { createSelector } from "reselect";
//...other code
export const selectedPost = (state) => state.myReducer.selectedPost;
export const getCommentsForPost = createSelector(allComments, selectedPost, (c, p) => {
  if (c && p) {
    const filteredComments = c.filter((comment) => {
      return comment.postId === p.id;
    });
    return filteredComments;
  }
});
```

위 코드에서는 createSelector을 import하고, allPosts 등과 마찬가지로 전역 상태에서 selectedPost를 가져왔어요. 그리고 getCommentsForPost에서는 allComments와 selectedPost를 입력 selector로 제공했어요. (여러 입력 selector를 제공하는 방법이에요.) 그런 다음에 c와 p를 사용하여 모든 댓글(allComments)에서의 객체와 선택된 게시물 데이터 객체를 나타내는 필터링된 댓글을 반환하는 resultFunc 함수를 추가했어요.

또 다른 selector가 필요한데, 그것은 선택된 게시물의 작성자로 표시할 사용자 이름을 가져오는 것이에요. 선택된 블로그 게시물의 작성자를 선택할 selector를 만들어봅시다:

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
export const getAuthorForPost = createSelector(
allUsers, selectedPost,
(u, p) => {
if (u && p) {
const author = u.find((user) => {
   return p.userId === user.id;
});
   return author;
});
```

이전과 마찬가지로 두 개의 입력 선택기를 추가했고 결과 함수를 사용하여 allUsers에서 p.userId와 일치하는 객체를 찾고 있습니다.

이제 선택기를 설정했으니, 이를 어떻게 사용하는지 확인해보는 시간입니다. 이제 남은 일은 UI를 그려서 모든 이벤트 변경을 표시하는 것뿐입니다. 그러니 App.js를 열어서 다음 수정 사항을 적용하세요:

```js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_POSTS_FETCH, GET_COMMENTS_FETCH, GET_USERS_FETCH, SELECTED_POST, EXIT_APP } from "./actions";
import { allPosts, selectedPost, getCommentsForPost, getAuthorForPost } from "./selectors";
//... other code function App() {...
const retrivedPosts = useSelector(allPosts);
const selPost = useSelector(selectedPost);
const selPostComments = useSelector(getCommentsForPost);
const selPostAuthor = useSelector(getAuthorForPost);
// 이 useState는 게시물 선택에 따라 UI를 숨기거나 보여주기 위한 것입니다.
const [selectedPostModeOn, setSelectedPostModeOn] = useState(false);
function postSelected(selectedPost) {
  myDispatch(SELECTED_POST(selectedPost));
}
//... More code
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

우리 UI에 대한 첫 번째 변경 사항에서, 필요한 모든 작업과 필요한 모든 셀렉터를 먼저 import 했습니다. 저희는 하나의 view만 있기 때문에 선택된 모드에 따라 UI 요소를 숨기거나 표시할 것입니다. 즉, 게시물이 선택되었을 때와 그렇지 않을 때를 나타내는 상태를 컨트롤하기 위해 useState를 추가했습니다. 선택된 게시물이 있을 때 호출되는 postSelected 함수가 있으며, 게시물이 선택되었을 때 선택된 게시물 객체와 함께 SELECTED_POST 액션을 dispatch하고 나머지는 이미 처리되었습니다.

그 다음, App.js의 return(...)에서 두 개의 div가 있을 것입니다:

- 첫 번째 div에는 이미 표시된 모든 게시물이 표시됩니다.
- 두 번째 div에는 선택한 게시물, 해당 댓글 및 작성자의 이름이 표시됩니다.

언제든지 위의 div 중 하나만 표시되며, 선택된 게시물 모드를 사용하여 컨트롤할 것입니다.

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

메인 div 안에 있는 `div className="App"` 안에 다음 코드를 추가해주세요:

```js
{selectedPostModeOn && (
<div>
{/* 뒤로 가기 버튼 */}
<button
onClick={() => {
   myDispatch(EXIT_APP());
   setSelectedPostModeOn(false);
}> 뒤로 </button>
<br /> <hr />
{/* 글 */}
<div>
  <code>글 ID: {selPost ? selPost.id : "선택된 글 없음"}</code>
  <h1>{selPost.title}</h1>
  <p>{selPost.body}</p>
  <p>
    <i>작성자: {selPostAuthor.name}</i>
  </p>
</div> <hr />
{/* 댓글 */}
<p style={{ fontSize: 12, fontWeight: "bold" }}> 댓글 ({selPostComments.length}):</p>
{selPostComments && selPostComments.map((comment) => (
<div key={comment.id} style={{
     backgroundColor: "#e8e8e8",
     padding: 8,
     marginBottom: 8,
     borderRadius: 8
}}>
<p style={{ fontSize: 12, color: "#7d7d7d" }}>
   {comment.name} <br /> {comment.email}
</p>
<p style={{ fontSize: 12, fontWeight: "bold" }}>
   {comment.body}
</p>
</div>))}
</div>
)}
```

위 컴포넌트는 글 내용과 저자의 이름 그리고 마지막으로 모든 댓글을 표시하는 div입니다.

나머지 return 부분은 동일하지만 모든 글을 표시하는 div를 `selectedPostModeOn`으로 묶어주세요:

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
{!selectedPostModeOn && (
<div>
<p>
  <b>블로그 게시물을 선택하여 더 많은 내용을 읽어보세요:</b>
</p>
<hr />
{retrivedPosts && retrivedPosts.map((post) => (
<a href={`/#${post.id}`} onClick={() => {
   postSelected(post);
   setSelectedPostModeOn(true);
  }
  key={post.id}>
{post.id}: {post.title}
<br />
</a>))}
</div>
)}
```

동일한 내용이지만 두 가지 미세한 변경 사항이 있습니다. 첫째, 더 이상 필요하지 않아 retrivedData를 제거하고 retrivedPosts를 사용하여 렌더링합니다.

앱을 실행하면 이렇게 작동해야 합니다:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*Ve1TEwbgQTZwb_e6JFcVTg.gif" />

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

블로그 앱의 완전한 작동 코드가 준비되어 있습니다:

# 결론:

이 튜토리얼에서 진행한 샘플 프로젝트와 마찬가지로, 프로젝트에 따라 redux-saga를 활용하여 더 이벤트 중심의 아키텍처로 프로젝트를 구성할 수 있습니다. 필요한 모든 작업과 사가가 처리할 모든 기능을 계획할 수 있습니다. 전역 상태에 데이터를 저장해야 할 경우에는 리듀서에서 처리해야 하며, createReducer, createSelector와 같은 내장 훅, 그리고 saga의 call, put, take, fork 등의 효과를 사용함으로써 redux-saga를 간소화하는 방법을 살펴보았습니다. useSelector 대신 sagas에서 사용하는 select(SELECTOR_NAME)와 같은 방법도 있습니다. 이 예시에서는 사용하지 않았지만, race, spawn 등 많은 다른 효과들도 있습니다. 이제 이러한 훅 중 어떤 것을 사용하여 사가를 더 효율적으로 만들 수 있는지 알아보고 탐험해보세요.

언제나 새롭게 배운 지식을 테스트해볼 만한 것들에 대해 안내해 드리겠습니다:

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

- 블로그 앱을 확장해 보세요 (해당 코드 샌드박스에 가서 포크하세요) 그리고 작성자: ...를 클릭하면 사용자 프로필 (모든 사용자 데이터)과 해당 사용자가 작성한 게시물이 표시되도록 확장하세요. UI를 사용자의 소셜 미디어 프로필처럼 보이도록 만들어보세요.
- 이 글은 읽어보세요. https://redux-saga.js.org/docs/advanced/RacingEffects/ 그리고 기사에 제시된 일부 효과를 사용하여 블로그를 확장할 수 있는지 확인해보세요.

이게 도움이 되었다면 공유하고 👏🏻 버튼을 눌러서 다른 사람들도 찾을 수 있게 도와주세요. 오타를 발견하거나 잘못된 점이 있다면 강조하여 알려주시고, 크레딧과 함께 업데이트하겠습니다. 난감하거나 도움이 필요하다면 댓글 남겨주세요. 최선을 다해 도와드리겠습니다.

<img src="/assets/img/2024-05-01-GettingStartedwithReduxSagaTutorial_15.png" />

내 모든 자습서는 무료입니다. 지원하고 싶다면 buymeacoffee.com/chaudhrytalha에서 커피를 사줄 수 있어요.

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

행복한 코딩 👨🏻‍💻

![Image](https://miro.medium.com/v2/resize:fit:292/1*V30UUCfEIck3Fjt3EJdfLg.gif)
