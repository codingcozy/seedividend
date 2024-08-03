---
title: " Redux Toolkit, Reselect, Thunk, Saga로 Redux 사이트 최적확 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Optimizing Redux Applications Leverage Redux Toolkit, Reselect, Thunk, Saga and Effective Debugging"
link: "https://medium.com/stackademic/optimizing-redux-applications-leverage-redux-toolkit-reselect-thunk-saga-and-effective-7fc4d4a27546"
---



## 비동기 작업 및 고급 Redux\*\*

![이미지](/assets/img/OptimizingReduxApplicationsLeverageReduxToolkitReselectThunkSagaandEffectiveDebugging_0.png)

# Redux Thunk와 비동기 작업 이해하기

## 소개

<div class="content-ad"></div>

여러분 안녕하세요! 다시 오신 것을 환영합니다! 오늘의 레시피를 시작하기 전에, 지난 수업에서 배웠던 주요 재료들을 상기해 봅시다. 우리는 Redux가 잘 정리된 부엌과 같다고 말했죠. 액션(야채를 다듬는 것처럼), 리듀서(섞어 놓는 것처럼), 그리고 스토어(모든 것이 신선하게 보관되는 냉장고)가 있어요.

이것은 우리가 맛있는 애플리케이션(깔끔하고 확장 가능한 코드를 유지하는)을 요리할 수 있게 해 주며, 이는 더 크게 성장할 수 있는(복잡한 프로젝트들) 재료입니다. 오늘은 인터넷에서 데이터를 가져오는 것(API 호출)이나 사용자 액션이 완료될 때까지 기다리는 것과 같이 준비하는 시간이 오래 걸리는 특별한 요리를 다루는 방법을 배울 거예요.

Redux는 우리가 이러한 비동기 작업을 원활하게 처리하는 데 도움이 되며, 마치 좋은 요리사가 모든 것의 시간을 완벽하게 조절하여 맛있는 식사를 제공하는 것처럼, 반응적이고 효율적인 애플리케이션을 만들 수 있게 합니다.

이를 돕기 위해, "Redux Toolkit을 활용한 React 상태 관리"라는 제목의 멋진 레시피(자원)를 Stackademic에서 찾았어요.

<div class="content-ad"></div>

이 레시피에서는 비동기 작업을 효과적으로 처리하기 위해 특수 도구 세트인 Redux Toolkit을 사용하는 방법을 보여줍니다. 그러면 당신의 요리모자를 쓰고 현대적이고 견고한 웹 애플리케이션을 만드는 방법을 배워볼 준비가 되셨나요? 시작해봅시다!

# **동기 대. 비동기 상태 업데이트.**

소프트웨어 개발에서 특히 Redux와 같은 상태 관리 시스템의 맥락에서 동기 및 비동기 상태 업데이트의 차이를 이해하는 것이 중요합니다. 이러한 개념을 자세히 살펴보겠습니다:

## 동기 상태 업데이트:

<div class="content-ad"></div>

동기 상태 업데이트는 응용 프로그램 상태의 변경을 바로 발생시켜 결정론적 순서를 따라 순차적으로 일어나는 것을 의미합니다. 좀 더 간단히 말하면, 작업이 발생하면 리듀서가 상태를 즉시 동기적으로 업데이트합니다. 이 과정은 직관적이고 예측 가능하여 응용 프로그램 내 데이터 흐름을 이해하기 더 쉽게 만듭니다.

## 동기 상태 업데이트의 특성:

- 즉각적 실행: 작업이 발생한 후 상태 변경이 즉시 발생합니다.
- 연속적 순서: 상태 업데이트는 디스패치된 순서대로 발생하여 결정론적 동작을 보장합니다.
- 예측 가능성: 동기 업데이트는 작업에 대한 응답으로 응용 프로그램 상태가 어떻게 변할지 예측하기 쉽게 만듭니다.

동기 상태 업데이트의 예시: Redux 응용 프로그램에서 사용자가 카운터를 증가시키는 버튼을 클릭하면 동기 작업이 디스패치되고, 해당 리듀서에 의해 상태에서 카운터 값이 즉시 업데이트됩니다.

<div class="content-ad"></div>

## 비동기 상태 업데이트:

반면에, 비동기 상태 업데이트는 애플리케이션 상태에 발생하는 변화로, 지연되거나 순차적이 아닌 순서로 발생합니다. 이러한 업데이트는 일반적으로 네트워크 요청, 타이머 또는 완료에 시간이 필요한 사용자 상호작용과 같은 비동기 작업에서 비롯됩니다. 비동기 업데이트는 복잡성을 도입하는데, 이는 액션이 디스패치된 후 즉시 발생하지 않을 수 있으며 순서에 상관없이 발생할 수 있습니다.

## 비동기 상태 업데이트의 특성:

- 지연된 실행: 상태의 변경은 액션이 디스패치된 직후에 즉시 발생하지 않을 수 있으며 대신 비동기 작업이 완료된 후에 발생합니다.
- 순차적이 아닌 순서: 비동기 업데이트는 비동기 작업의 완료 시간에 따라 순서에 상관 없이 발생할 수 있습니다.
- 복잡성: 비동기 업데이트를 처리하기 위해서는 부작용을 관리하고 상태 일관성을 보장해야 하며 이는 도전적일 수 있습니다.

<div class="content-ad"></div>

비동기 상태 업데이트 예시: Redux 애플리케이션에서 사용자가 양식을 제출하면 API 호출을 트리거하여 데이터를 가져오는 경우, 가져온 데이터로 인한 상태 업데이트는 비동기적으로 이루어집니다. 데이터 검색 작업은 어느 정도 시간이 소요될 수 있으며, 작업이 완료되고 응답이 수신된 후에 상태가 업데이트됩니다.

## **Redux 셰프들! 날선 칼이 필요해요: Redux Thunk **

## Redux Thunk가 무엇이며 왜 필요한가:

당신의 Redux 주방은 야채를 손질(액션)하고 섞어(리듀서) 맛있는 요리(애플리케이션 상태)를 만드는 데 좋을지 모릅니다. 그러나 배달을 기다리는 것과 같이 시간이 걸리는 고급 요리(비동기 작업)는 어떻게 처리해야 할까요?

<div class="content-ad"></div>

Redux Thunk은 시간이 많이 소요되는 작업을 처리하는 데 도움이 되는 특별한 요리사 도구 같아요. 이를 통해 API 호출을 통한 테이크아웃 주문, 전달을 기반으로 하는 여러 요리 준비, 대기 중에 소스를 끓이는 등의 레시피(액션 크리에이터)를 작성할 수 있어요.

Redux Thunk 동작 방식: 부엌에서의 협업

- 레시피(Thunk 함수): 소요 시간이 걸리는 부분을 포함한 전체 요리에 대한 지시사항을 포함한 특별한 레시피를 작성해요.
- 주방장(미들웨어): 주방장은 요리사(리듀서)에게 도착하기 전에 레시피를 가로챌 수 있어요.
- 재료 확인(함수 vs. 객체): 주방장은 레시피가 일반적인 지시사항(액션 객체)인지, 추가적인 단계가 있는 특별한 요리인지 확인해요.
- 전문가 소환(Thunk 실행): 특별한 레시피라면, 주방장은 전문가들을 소환하고(함수를 호출) 두 가지 도구를 제공해요.

<div class="content-ad"></div>

- 식자재 목록(현재 상태 확인을 위한 getState)
- 추가로 필요한 물건을 주문하기 위해 배달 앱(dispatch) 사용(dispatch additional actions)

5. 레시피 따라하기(비동기 논리): 전문가들은 당신의 레시피를 따릅니다. 이 과정은 다음을 포함할 수 있습니다:

- 외식 주문(API 호출 만들기)
- 배송을 기다리기(비동기 작업 수행)

모두 함께 넣기: 예제 레시피(데이터 가져오기)

<div class="content-ad"></div>

이상한 재료(API의 데이터)로 요리를 해보려고 하는군요. Redux Thunk를 사용한 특별 레시피가 준비되어 있어요:

```js
// Redux Thunk를 사용한 레시피 (액션 생성자)
const fetchData = () => {
  return async (dispatch, getState) => {
    // 준비 중이라고 알리기 (FETCH_DATA_REQUEST 디스패치)
    dispatch({ type: "FETCH_DATA_REQUEST" });
    try {
      // 재료를 주문하기 (API에서 데이터 가져오기)
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      // 요리 완성! (데이터와 함께 FETCH_DATA_SUCCESS 디스패치)
      dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
    } catch (error) {
      // 응앙, 요리를 태웠군요! (에러와 함께 FETCH_DATA_FAILURE 디스패치)
      dispatch({ type: "FETCH_DATA_FAILURE", error: error.message });
    }
  };
};
```

이제 이 레시피를 호출하여 (fetchData() 디스패치) 아무 곳에서나 시작할 수 있어요. 부엌(component)에서 비동기 데이터를 가져오기 위한 프로세스가 시작됩니다!

## 연습: Redux Thunk 구현

<div class="content-ad"></div>

리덕스 애플리케이션에 Redux Thunk를 통합하는 간단한 예제입니다.

API에서 데이터를 가져오는 비동기 작업을 수행하기 위해 thunk 함수를 구현합니다.

thunk 함수를 생성하고 기존 Redux 애플리케이션에 통합합니다.

## ** Redux Thunk 구현하기**

<div class="content-ad"></div>

간단한 예제로 Redux Thunk를 Redux 애플리케이션에 통합하는 방법을 살펴보겠습니다. API에서 데이터를 가져오는 것과 같은 비동기 액션을 위해 thunk 함수를 구현하는 방법을 안내해 드릴 거에요. 이후에는 자체 thunk 함수를 만들고 기존 Redux 애플리케이션에 통합하는 실습 기회가 주어질 거예요.

## 단계 1: Redux Thunk 미들웨어 설정

먼저, Redux 스토어에 Redux Thunk 미들웨어가 설정되어 있는지 확인해주세요. 이미 설정하지 않은 경우, Redux 스토어를 생성할 때 다음과 같이 추가할 수 있어요.

Redux Thunk 설정 (store.js):

<div class="content-ad"></div>

```javascript
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // 실제 리듀서 파일로 대체

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

- 이 파일은 비동기 작업을 처리하기 위해 thunk 미들웨어가 활성화된 Redux 스토어를 설정합니다.

2. 리듀서 (reducers/kitchenReducer.js):

```javascript
const initialState = {
  kitchenItems: {
    loading: false,
    error: null,
    items: [],
  },
};

const kitchenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_KITCHEN_ITEMS_REQUEST":
      return {
        ...state,
        kitchenItems: {
          ...state.kitchenItems,
          loading: true,
          error: null,
        },
      };
    case "FETCH_KITCHEN_ITEMS_SUCCESS":
      return {
        ...state,
        kitchenItems: {
          loading: false,
          error: null,
          items: action.payload,
        },
      };
    case "FETCH_KITCHEN_ITEMS_FAILURE":
      return {
        ...state,
        kitchenItems: {
          loading: false,
          error: action.error,
          items: [],
        },
      };
    default:
      return state;
  }
};

export default kitchenReducer;
```

<div class="content-ad"></div>

reducer 함수인 kitchenReducer를 만들어주세요. 리듀서는 현재 상태와 액션을 전달받아 해당 액션에 기반한 업데이트된 상태를 반환하는 순수 함수입니다.

- initialState: 애플리케이션 상태의 kitchenItems 슬라이스의 초기 상태를 정의합니다. 세 가지 속성을 포함합니다:
- loading: 현재 주방 아이템을 가져오는 중인지(true) 아닌지(false)를 나타내는 부울 값입니다.
- error: 가져오는 중에 에러가 발생한 경우의 에러 메시지 문자열 또는 그 외에는 null입니다.
- items: 가져온 주방 아이템을 담을 빈 배열([])입니다.
- switch (action.type): 디스패치된 액션의 type 속성을 확인합니다. 액션 타입에 따라 리듀서가 상태를 업데이트합니다.
- 사용 가능한 액션 타입:
- FETCH_KITCHEN_ITEMS_REQUEST: 주방 아이템을 가져오는 요청이 시작될 때 loading을 true로 설정하고 error를 null로 설정합니다.
- FETCH_KITCHEN_ITEMS_SUCCESS: 가져온 데이터로 items를 업데이트하고 성공적으로 검색한 경우 loading을 false로 설정합니다.
- FETCH_KITCHEN_ITEMS_FAILURE: 가져오기가 실패한 경우 에러 메시지로 error를 설정하고 loading을 false로 설정합니다.

3. 액션 생성자 (actions.js):

```js
export const fetchKitchenItemsRequest = () => ({
  type: "FETCH_KITCHEN_ITEMS_REQUEST",
});

export const fetchKitchenItemsSuccess = (data) => ({
  type: "FETCH_KITCHEN_ITEMS_SUCCESS",
  payload: data,
});

export const fetchKitchenItemsFailure = (error) => ({
  type: "FETCH_KITCHEN_ITEMS_FAILURE",
  error: error.message,
});

export const fetchKitchenItems = () => {
  return async (dispatch) => {
    dispatch(fetchKitchenItemsRequest()); // 요청 액션 디스패치

    try {
      const response = await fetch("https://api.example.com/kitchen-items"); // 실제 엔드포인트로 교체
      const data = await response.json();
      dispatch(fetchKitchenItemsSuccess(data)); // 데이터와 함께 성공 디스패치
    } catch (error) {
      dispatch(fetchKitchenItemsFailure(error)); // 오류와 함께 실패 디스패치
    }
  };
};
```

<div class="content-ad"></div>

- 이 파일은 아래와 같은 작업 생성기를 정의합니다:
- fetchKitchenItemsRequest: 데이터를 가져오기 전에 요청이 시작되었음을 나타내는 디스패치.
- fetchKitchenItemsSuccess: 데이터 검색에 성공했을 때 검색된 데이터와 함께 디스패치됨.
- fetchKitchenItemsFailure: 실패한 경우에 오류 메시지와 함께 디스패치됨.
- fetchKitchenItems: API에서 주방 아이템을 가져 오고 결과에 따라 적절한 작업을 디스패치하는 비동기 함수입니다.

4. 주방 컴포넌트 (Kitchen.js):

```js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKitchenItems } from "./actions";

const Kitchen = () => {
  const dispatch = useDispatch();
  const kitchenItems = useSelector((state) => state.kitchenItems); // 상태 이름 업데이트
  const [imageLoading, setImageLoading] = useState({}); // 이미지 로딩 상태

  useEffect(() => {
    dispatch(fetchKitchenItems());
  }, [dispatch]);

  const handleImageLoad = (itemId) => {
    setImageLoading((prevLoading) => ({ ...prevLoading, [itemId]: false }));
  };

  const handleImageError = (itemId) => {
    setImageLoading((prevLoading) => ({ ...prevLoading, [itemId]: false }));
  };

  const renderItem = (item) => (
    <li key={item.id}>
      <div
        className={`image-container ${imageLoading[item.id] ? "loading" : ""}`}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          onLoad={() => handleImageLoad(item.id)}
          onError={() => handleImageError(item.id)}
        />
      </div>
      {item.name} - {item.quantity} (Category: {item.category})
    </li>
  );

  return (
    <div className="kitchen-container">
      {kitchenItems.loading && <p>주방 아이템 가져오는 중...</p>}
      {kitchenItems.error && <p>오류: {kitchenItems.error}</p>}
      {kitchenItems.items && kitchenItems.items.length > 0 && (
        <ul className="kitchen-items-list">
          {kitchenItems.items.map(renderItem)}
        </ul>
      )}
      {!kitchenItems.items && !kitchenItems.loading && !kitchenItems.error && (
        <p>주방 아이템을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default Kitchen;
```

. 주방 컴포넌트 (Kitchen.js):

<div class="content-ad"></div>

이 코드는 Kitchen이라는 React 구성 요소를 정의하고 주방 항목을 표시합니다. 이 코드가 하는 일은 다음과 같습니다:

- useDispatch: 이 React 훅은 구성 요소가 Redux 스토어로 작업을 보내도록 허용합니다.
- useSelector: 이 React 훅은 구성 요소가 Redux 상태의 특정 부분에 액세스할 수 있도록 합니다. 이 경우에는 상태의 kitchenItems 부분을 선택합니다.
- useEffect: 이 훅은 구성 요소가 마운트된 후(또는 디스패치 함수가 변경될 때) 효과(주방 항목 가져오기)를 실행합니다. 효과 내에서:
- dispatch(fetchKitchenItems()): fetchKitchenItems 액션 생성자를 디스패치하여 데이터 가져오기 프로세스를 시작합니다.
- renderItem: 이 함수는 주방 항목 객체를 가져와 이름, 수량, 범주와 같은 항목 세부 정보를 표시하는 목록 항목 요소(JSX)를 반환합니다(데이터 구조에 이러한 속성이 있다고 가정).
- 구성 요소는 kitchenItems의 상태에 기반하여 렌더링됩니다:
- 로딩이 true인 경우 "주방 항목 가져오는 중..." 메시지가 표시됩니다.
- 오류가 null이 아닌 경우 오류 메시지가 표시됩니다.
- 항목이 데이터를 가지고 있는 경우 map을 사용하여 각 항목을 반복하고 renderItem 함수를 사용하여 각 항목 세부 정보를 표시합니다.

## 연습 문제:

- 다른 비동기 작업을 위한 사용자 고유의 thunk 액션을 만들어보세요.
- 기존 Redux 애플리케이션에 Redux Thunk를 통합해보세요.
- 구성 요소에서 thunk를 디스패치하고 UI에서 로딩/오류 상태를 처리하는 방법을 기억하세요.

<div class="content-ad"></div>

요약하자면:

Redux Thunk를 사용하면 Redux 주방에서 시간이 오래 걸리는 작업을 처리하는 유연한 레시피(청크 함수)를 작성할 수 있어요. 미들웨어인 주방장과 함께 작업하여 이 레시피는 기다리거나 추가 단계를 포함할 때도 완벽하게 요리가 준비될 수 있어요!

## ** 고급 Redux 패턴과 모범 사례 **

이 세션에서는 보통의 고급 Redux 패턴인 정규화, 메모이제이션 및 쓰기/기다리기(비동기/대기)와 함께 청크를 사용한 살펴볼 거에요. 이러한 패턴의 이점, 타협점에 대해 논의하고 각 패턴에 대한 코드 예제를 제공하여 그 구현을 설명할 거에요.

<div class="content-ad"></div>

## 정규화

정규화는 중첩된 데이터 구조를 평면화된 정규화된 형태로 재구성하여 데이터를 저장하고 관리하는 효율성을 향상시키는 과정입니다.

중첩된 재료(중첩 데이터)를 포함하는 레시피(데이터 구조)를 상상해보세요. 정규화는 해당 재료들을 분리하여 조각내고 구성(평면화된 데이터)하여 더 쉽게 접근하고 처리할 수 있도록 하는 것을 의미합니다.

## 장점:

<div class="content-ad"></div>

- 중복을 줄이고 데이터 일관성을 향상시킵니다.
- 데이터 검색 및 업데이트를 간소화합니다.

## 트레이드 오프:

- 초기 설정 복잡성이 높을 수 있습니다.
- 엔티티 간의 관계를 주의 깊게 관리해야 합니다.

## 예제

<div class="content-ad"></div>

```js
// 정규화 전 (중첩된 재료)
const initialState = {
  recipes: {
    chickenCurry: {
      id: 1,
      name: 'Chicken Curry',
      spices: [
        { id: 'garamMasala', ingredients: ['cumin', 'coriander', '...] },
        { id: 'tandooriMasala', ingredients: [...] }
      ]
    }
  }
};

// 정규화 후 (분리된 향신료 엔티티)
const initialState = {
  recipes: {
    chickenCurry: { id: 1, name: 'Chicken Curry', spiceIds: [1, 2] }
  },
  spices: {
    1: { id: 1, name: 'Cumin' },
    2: { id: 2, name: 'Coriander' },
    // ...다른 향신료들
  }
};
```

실제 예시:

- 문제: 전자 상거래 애플리케이션이 제품 데이터를 중첩된 정보와 함께 저장합니다. 제품 객체에는 작성자 이름이 포함된 중첩 리뷰 객체 배열이 있습니다. 이는 중복(반복된 작성자 데이터)과 특정 리뷰 검색의 어려움으로 이어질 수 있습니다.
- 해결책: 데이터 구조를 정규화합니다. 제품 및 리뷰를 별도의 엔티티로 저장합니다. 각 리뷰 객체는 해당하는 제품 ID를 참조합니다. 이렇게 함으로써 중복을 줄이고 제품의 특정 리뷰를 검색하기가 간단해집니다.

## 메모이제이션

<div class="content-ad"></div>

메모이제이션은 순수 함수에 대한 결과를 캐싱하여 불필요한 다시 계산을 방지하여 리듀서를 최적화합니다.

이 기술은 자주 사용하는 레시피(리듀서)를 위해 특정 재료(함수 결과 사전 계산)를 미리 준비하는 방법을 사용합니다. 당신은 이러한 미리 준비된 재료(캐시된 결과)를 저장하여 같은 요리(동일한 입력 데이터)를 위해 다시 준비할 필요 없이 타이밍을 절약합니다.

## 혜택:

- 중복 계산을 피해 성능을 향상시킵니다.
- 복잡한 캐싱 메커니즘의 필요성을 줄입니다.

<div class="content-ad"></div>

## 트레이드오프:

- 결과를 캐싱할 때 메모리 사용량이 증가할 수 있습니다.
- 메모이제이션된 결과가 여전히 유효한지 확인해야 합니다.

## 예시

```js
// 메모이제이션 이전 (매번 저장소에서 가져오기)
const fetchShoppingListBeforeMemoization = createAsyncThunk(
  "shoppingList/fetch",
  async () => {
    const response = await fetch("your-shopping-list-api.com");
    const list = await response.json();
    return list;
  }
);

// 메모이제이션 후 (우선 캐시 확인)
const fetchShoppingList = createAsyncThunk("shoppingList/fetch", async () => {
  // 캐시된 목록 확인
  const cachedList = getCachedShoppingList();

  if (cachedList && isListValid(cachedList)) {
    // 유효한 경우 캐시된 목록 사용
    return cachedList;
  }

  // 캐시되지 않았거나 유효하지 않은 경우 저장소에서 가져옴
  const response = await fetch("your-shopping-list-api.com");
  const list = await response.json();

  // 새 목록으로 캐시 업데이트
  storeCachedShoppingList(list);

  return list;
});
```

<div class="content-ad"></div>

실제 예시:

- 문제: 소셜 미디어 응용 프로그램은 친구 ID 목록을 기반으로 사용자의 친구 수를 계산합니다. 이 기능이 중첩된 친구 목록을 가진 다른 사용자의 리듀서에서 반복적으로 호출되면, 일부 친구가 동일한 경우에도 각 사용자의 카운트를 다시 계산합니다.
- 해결책: 친구 수 함수에 Memoization을 적용합니다. 친구 수를 계산할 때 캐시를 먼저 확인합니다. 특정 사용자 ID의 카운트가 있는 경우 해당 카운트를 사용하고, 그렇지 않으면 카운트를 계산하여 미래 사용을 위해 캐시에 저장합니다. 이렇게 함으로써 중복된 계산을 피하고 성능을 최적화할 수 있습니다.

## Thunk를 사용한 Async/Await

- Thunk 내에서 async/await 구문을 사용하면 Redux 애플리케이션에서 더 깔끔한 비동기 처리가 가능합니다.

<div class="content-ad"></div>

Async/await은 주방(Redux 애플리케이션)에서 뜸들이는 일들(비동기 작업)을 처리해 주는 대리 요리사(펑크)가 있는 것과 같습니다. 그들은 시장(API)에서 재료(데이터)를 효율적으로 가져와서 준비가 되면 알려주거나 문제가 생기면(에러 처리) 알려줍니다.

## 장점:

- 비동기 코드의 가독성과 유지보수를 향상시킵니다.
- try/catch 블록을 활용하여 에러 처리를 간소화합니다.

## 교환 조건:

<div class="content-ad"></div>

- 썽크 내에서 비동기 작업을 처리할 수 있는 것이 제한됩니다.
- 더 복잡한 비동기 플로우에 적합하지 않을 수 있습니다.

## 예시

```js
// 기본 Thunk 접근 방식 (최선의 실천 전)
const fetchDataBasic = () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_DATA" }); // 요청과 응답을 위한 단일 작업

    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "FETCH_DATA_SUCCESS", payload: data }))
      .catch((error) => dispatch({ type: "FETCH_DATA_ERROR", error }));
  };
};

// createAsyncThunk를 사용한 접근 방식 (최선의 실천)
const fetchData = createAsyncThunk(
  "data/fetch",
  async () => {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  },
  {
    // createAsyncThunk의 선택적 에러 처리 구성
  }
);

// 애플리케이션 컴포넌트에서 선호하는 방식 활용:
// createAsyncThunk로 fetchData를 사용하는 예시:
dispatch(fetchData());
```

실제 예시:

<div class="content-ad"></div>

- 문제: 할 일 목록 애플리케이션이 서버에서 작업을 가져와 Redux 상태를 업데이트해야 합니다. Promise와 함께 전통적인 Redux를 사용하면 중첩된 콜백이 발생하여 코드가 복잡해질 수 있습니다.
- 해결책: 쓰기 thunk와 함께 async/await를 구현합니다. thunk 액션 크리에이터는 async/await를 사용하여 서버에서 작업을 가져와 응답(성공 또는 오류)에 따라 액션을 디스패치합니다. 이 접근 방식은 코드 가독성을 향상시키고 try/catch 블록을 사용하여 오류 처리를 간소화합니다.

## Redux Sagas:

- Redux Sagas는 Redux에서 사이드 이펙트를 관리하는 미들웨어 라이브러리입니다. 제너레이터 함수를 사용하여 비동기 플로우를 더 쉽게 읽고 쓰고 테스트할 수 있습니다.
- 적합한 사용 사례: Redux Sagas는 다음과 같은 복잡한 비동기 논리를 처리할 때 이상적입니다:
- 여러 비동기 작업 조정.
- 긴 실행 작업 관리.
- 복잡한 데이터 흐름 요구 사항 처리.

혜택:

<div class="content-ad"></div>

- 부수 효과를 관리하는 중앙 직선 및 선언적 방식 제공
- 부수 효과를 쉽게 분리하여 테스트를 단순화함
- 취소, 재시도 및 디바운스와 같은 강력한 기능 제공

## 교환:

- 제너레이터 함수 및 Redux Saga의 API를 배우고 이해해야 함
- 특히 더 단순한 응용 프로그램의 경우 코드베이스에 추가 복잡성 도입할 수 있음

## 예제

<div class="content-ad"></div>

sagas.js:

```js
import { takeEvery, put, call } from "redux-saga/effects";
import { fetchDataSuccess, fetchDataFailure } from "./actions";

/**
 * 지정된 API 엔드포인트에서 데이터를 가져옵니다.
 *
 * @param {string} url API 엔드포인트의 URL입니다.
 *
 * @returns {Promise<any>} 가져온 데이터로 해결되는 프라미스입니다.
 */
function* fetchDataSaga(url = "https://api.example.com/data") {
  // URL을 동적으로 만드는 것을 고려하세요
  try {
    const response = yield call(fetch, url);
    const data = yield call([response, "json"]);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

/**
 * 'FETCH_DATA_REQUEST' 액션을 감시하고 fetchDataSaga를 트리거합니다.
 */
export function* watchFetchData() {
  yield takeEvery("FETCH_DATA_REQUEST", fetchDataSaga);
}
```

rootSaga.js:

```js
import { all } from "redux-saga/effects";
import { watchFetchData } from "./sagas";

// 루트 사가를 제너레이터 함수로 정의합니다.
export default function* rootSaga() {
  // `all` 이펙트를 사용하여 모든 감시 사가를 동시에 실행합니다.
  yield all([
    watchFetchData(),
    // 필요한 경우 여기에 다른 감시 사가를 추가합니다.
  ]);
}
```

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경하면 다음과 같습니다:

actions.js:

```js
export const fetchDataRequest = () => ({
  type: "FETCH_DATA_REQUEST",
});

export const fetchDataSuccess = (data) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: "FETCH_DATA_FAILURE",
  error,
});
```

reducers.js:

```js
const initialState = {
  data: null,
  error: null,
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };
    default:
      return state;
  }
};

export default dataReducer;
```

<div class="content-ad"></div>

store.js:

```js
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
```

## Redux Observable:

- Redux Observable은 반응형 프로그래밍 패러다임을 채택하며 비동기 작업을 처리하기 위해 Observables를 사용합니다. 이는 RxJS를 활용하여 비동기 데이터 스트림을 조합하고 관리하는 라이브러리입니다.

<div class="content-ad"></div>

적절한 사용 사례:

Redux Observable은 다음과 같은 애플리케이션에 적합합니다:

- 복잡하고 동적인 데이터 흐름을 갖는 애플리케이션.
- Observable로 매핑된 액션 및 연산자를 사용하여 변환하는 경우.

장점:

<div class="content-ad"></div>

- 비동기 작업을 강력하고 유연하게 관리할 수 있는 방법을 제공합니다.
- 함수형 및 선언적 접근을 사용하여 복잡한 비동기 흐름을 구성할 수 있습니다.
- Redux와 매끄럽게 통합되어 Redux 구조에 자연스러운 확장을 제공합니다.

**탐색해야 할 사항:**

- 반응형 프로그래밍 개념과 RxJS 라이브러리에 대한 이해가 필요합니다.
- 반응형 프로그래밍에 익숙하지 않은 개발자들에게는 가파른 학습 곡선일 수 있습니다.

## 예제

<div class="content-ad"></div>

dataEpic.js:

```js
import { ofType } from "redux-observable";
import { mergeMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { fetchDataSuccess, fetchDataFailure } from "./actions";

/**
 * 지정된 API 엔드포인트에서 데이터를 가져오는 Epic.
 *
 * @param {Observable} action$ 저장소에 전송된 액션의 스트림입니다.
 * @param {StateObject} state$ Redux 저장소의 현재 상태입니다.
 * @returns {Observable} 전송할 액션의 Observable 스트림입니다.
 */
export const fetchDataEpic = async (action$, state$) => {
  return action$.pipe(
    ofType("FETCH_DATA_REQUEST"),
    mergeMap(async () => {
      const url = "https://api.example.com/data"; // URL을 동적으로 만드는 것을 고려해보세요.
      try {
        const response = await fetch(url);
        const data = await response.json();
        return of(fetchDataSuccess(data));
      } catch (error) {
        return of(fetchDataFailure(error.message));
      }
    }),
    catchError((error) => of(fetchDataFailure(error.message)))
  );
};
```

rootEpic.js:

```js
import { combineEpics } from "redux-observable";
import { fetchDataEpic } from "./dataEpic"; // 보다 구체적인 파일 이름 사용

export const rootEpic = combineEpics(
  fetchDataEpic
  // 필요한 경우 다른 에픽을 여기에 추가
);
```

<div class="content-ad"></div>

store.js

```js
// store.js
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "./reducers";
import { rootEpic } from "./rootEpic";

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
```

## Redux Toolkit:

- Redux Toolkit은 Redux 팀에서 제공하는 공식 패키지로, Redux 개발을 간소화하기 위한 유틸리티 및 추상화를 제공합니다. createSlice, createAsyncThunk, configureStore와 같은 유틸리티를 포함하며, 일반적인 Redux 패턴과 보일러플레이트를 간소화하기 위해 사용됩니다.

<div class="content-ad"></div>

적절한 사용 사례:

Redux Toolkit은 Redux 애플리케이션에 적합하며 특히 다음을 목표로 하는 경우에 유용합니다:

- 보일러플레이트 코드를 줄입니다.
- 개발자 경험을 향상시킵니다.
- Redux 팀에서 추천하는 모범 사례를 채용합니다.

혜택:

<div class="content-ad"></div>

- 보일러플레이트 코드를 줄이고 코드 가독성을 향상시킵니다.
- 불변성, 구조화된 상태 관리, 정규화된 상태 모양과 같은 최상의 관행을 장려합니다.
- 기존 Redux 애플리케이션 및 미들웨어와 원활하게 통합됩니다.

격차:

- 기존 Redux 코드베이스를 Redux Toolkit의 규칙과 유틸리티를 채택하도록 이주해야 할 수 있습니다.
- 개발자는 Redux Toolkit의 API 및 패턴에 익숙해져야 할 수 있습니다.

## 예제

<div class="content-ad"></div>

slice.js

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const url = "https://api.example.com/data"; // URL을 동적으로 설정하는 것을 고려해보세요
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
```

store.js (Redux Toolkit):

```js
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
```

<div class="content-ad"></div>

## Redux 셀렉터 (Reselect):

- Redux 셀렉터(Reselect 라이브러리에서 제공)는 Redux 스토어에서 효율적으로 데이터를 파생하는 함수들입니다. 불필요한 전체 상태 탐색을 방지하여 성능과 코드 유지보수성을 향상시킵니다.

장점:

- 중복 상태 탐색을 피해 성능을 향상시킵니다.
- 애플리케이션의 다른 부분에서 셀렉터를 사용할 수 있도록 코드 재사용성을 촉진합니다.
- 스토어 상태를 기반으로 파생 데이터를 메모이제이션하는 것을 간단하게 만듭니다.

<div class="content-ad"></div>

## 예시

slice.js:

```js
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // 에러 알림을 위한 토스트 라이브러리를 사용한다고 가정

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const fetchKitchenData = createAsyncThunk("data/fetchData", async () => {
  const url = "https://api.example.com/data"; // URL을 동적으로 만들 수 있도록 고려
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch kitchen data");
  }
  const data = await response.json();
  return data;
});

const selectKitchenData = (state) => state.data.data;

const selectKitchenItems = createSelector(
  selectKitchenData,
  (data) => data && data.map((item) => ({ id: item.id, name: item.name })) // 필요에 맞게 데이터 포맷 변경
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKitchenData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKitchenData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchKitchenData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Error fetching kitchen data"); // 에러 알림 표시
      });
  },
});

export const { fetchKitchenData } = dataSlice.actions;
export { selectKitchenItems };
export default dataSlice.reducer;
```

Component.js:

<div class="content-ad"></div>

```js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchKitchenData } from "./slice"; // 액션 생성자와 셀렉터를 가져옵니다
import { selectKitchenItems } from "./slice";

const KitchenComponent = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectKitchenItems);
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);

  React.useEffect(() => {
    dispatch(fetchKitchenData()); // 컴포넌트 마운트 시 데이터 가져오기
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>주방 데이터를 불러오는 중입니다...</p>
      ) : error ? (
        <p>오류 발생: {error}</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KitchenComponent;
```

설명:

- createSelector가 가져와집니다: 메모이제이션된 셀렉터를 만들기 위해 createSelector를 가져옵니다.
- selectKitchenData 셀렉터: selectKitchenData라는 새로운 셀렉터가 정의되어 상태에서 데이터에 접근할 수 있습니다.
- selectKitchenItems 셀렉터: selectKitchenData를 가지고 있는 selectKitchenItems 셀렉터는 데이터에 대해 매핑하여 주방 아이템으로 포맷합니다 (데이터가 주방 아이템을 나타낸다고 가정).
- 액션 내보내기: 데이터를 가져오기 위한 썽크를 디스패치하기 위해 액션 생성자 fetchKitchenData를 내보냅니다.
- 셀렉터 내보내기: 컴포넌트에서 사용하기 위해 selectKitchenItems 셀렉터를 내보냅니다.

## Redux Persist:

<div class="content-ad"></div>

리덕스 Persist는 Redux 상태를 페이지 새로 고침이나 애플리케이션 재시작 간에 유지하도록 허용하는 라이브러리입니다. 이는 사용자 데이터나 환경 설정을 보존하고 사용자 경험을 향상시키는 데 유용할 수 있습니다.

장점:

- 세션 간 데이터를 유지함으로써 사용자 경험을 향상시킵니다.
- 애플리케이션이 새로 고침이나 재시작 시 사용자 상태를 복원할 수 있도록 합니다.

단점:

<div class="content-ad"></div>

- 추가 구성 및 설정이 필요합니다.
- 민감한 데이터가 지속되면 보안 문제가 발생할 수 있습니다.

## 예시

configureStore.js:

```js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 기본적으로 localStorage 사용

import dataReducer from "./slice"; // reducer가 slice.js 파일에 있다고 가정

const blacklist = ["error"]; // 에러 상태를 지속시키지 않음 (예시)

const persistConfig = {
  key: "root", // 지속 상태의 키 접두사
  storage, // Storage 엔진 (기본적으로 localStorage)
  blacklist, // 오류 상태를 지속에서 제외 (선택 사항)
};

const persistedReducer = persistReducer(persistConfig, dataReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); // 수동 지속 제어를 위한 Persistor
export default store;
```

<div class="content-ad"></div>

재수분화 (옵션):

리덕스 퍼시스트는 앱 시작 시 자동 재수분화를 처리하지만, 복잡한 애플리케이션의 경우 추가적인 제어가 필요할 수 있습니다:

- 수동 재수분화:

```js
import { persistor } from "./configureStore";

persistor
  .restore()
  .then(() => {
    // 수분화 후 애플리케이션 로직
  })
  .catch((error) => {
    // 재수분화 오류 처리
  });
```

<div class="content-ad"></div>

- `persistor.restore()`를 사용하여 rehydration을 수동으로 트리거할 수 있고, 발생할 수 있는 오류를 처리할 수 있습니다.

2. 사용자 정의 Rehydration 로직:

- 복잡한 시나리오의 경우, 충돌 또는 특정 작업을 처리하기 위해 사용자 정의 로직을 생성할 수 있습니다. 이는 리듀서나 미들웨어를 수정하여 rehydration 프로세스를 관리하는 것을 포함합니다.

## 대형 응용 프로그램을 위한 최상의 실천 방법:

<div class="content-ad"></div>

- 모듈화 및 기능 기반 접근: Redux 코드를 모듈화하여 각 기능이 자체 상태 슬라이스와 해당 리듀서를 가지도록 구성합니다.
- 단일 책임 원칙: 리듀서가 하나의 상태 슬라이스만 처리하고 액션이 하나의 상태 변이에 대응하는지 확인합니다.
- 정규화된 데이터 구조: Redux 스토어에서 복잡한 데이터를 정규화하여 상태 업데이트를 단순화하고 성능을 향상시킵니다.
- 단위 테스트: 리듀서, 액션 생성자 및 비동기 로직에 대한 단위 테스트를 작성하여 코드 신뢰성과 유지보수성을 보장합니다.
- Redux DevTools: 개발 중에 애플리케이션 상태 변경을 디버깅하고 모니터링하기 위해 Redux DevTools를 도입합니다.
- 지속적인 리팩토링: Redux 코드를 지속적으로 리팩토링하고 최적화합니다.

## **효과적인 디버깅의 중요성:**

디버깅은 Redux 애플리케이션이 의도대로 작동하고 사용자 경험을 원할하게 제공하는 데 중요한 역할을 합니다. 효과적인 디버깅이 Redux 애플리케이션에서 왜 중요한지 몇 가지 이유를 살펴보겠습니다:

<div class="content-ad"></div>

- 상태의 정확성과 일관성을 보장합니다.
- 올바른 및 시기 적절한 작업 전파를 추적합니다.
- 비동기 작업을 효과적으로 처리합니다.

일반적인 문제:

- 복잡한 작업 및 리듀서(시각화를 위해 Redux DevTools를 사용).
- 비동기 작업(로그 기록 및 중단점을 전략적으로 활용).
- 상태 변이(Redux DevTools 또는 Redux Immer를 사용하여 방지).
- 성능 최적화(디버깅을 통해 병목 현상 식별).

버그가 포함된 샘플 응용 프로그램:

<div class="content-ad"></div>

## 샘플 Redux 애플리케이션: 버그가 있는 카운터

간단한 카운터 애플리케이션을 Redux를 사용하여 구현한 것을 시작해보겠습니다. 그러나 이 애플리케이션에는 수정해야 할 의도적인 버그가 있습니다.

## 1. 버그 1: 카운터가 올바르게 증가하지 않음

이 예제는 의도적인 버그가 포함된 카운터 애플리케이션을 보여줍니다. 증가, 감소 및 초기화 기능에서 버그가 있습니다.

<div class="content-ad"></div>

```js
// actions.js
export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

// reducers.js
const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export default counterReducer;
```

디버깅 단계:

- Redux DevTools를 사용하여 상태 변화와 액션 디스패치를 검사합니다.
- increment 액션에 문제가 있는지 확인하기 위해 액션 생성자와 리듀서를 확인합니다.
- console.log 문장이나 debugger를 사용하여 액션과 상태 변화의 흐름을 추적합니다.

일반 디버깅 단계:```

<div class="content-ad"></div>

- Redux DevTools를 사용하여 상태 변경 및 액션 전송을 검사하세요.
- 특정 액션에 문제가 있는지 확인하기 위해 액션 생성자와 리듀서를 검사하세요.
- 액션 흐름과 상태 업데이트를 추적하기 위해 console.log 문이나 디버거를 사용하세요.

결론:

- Redux 애플리케이션에 대한 효과적인 디버깅은 중요합니다.
- 디버깅 기술을 향상시키기 위해 샘플 애플리케이션을 활용하세요.
- 효율적인 디버깅을 위한 도구와 기술을 활용하세요.

## ** 요약 **

<div class="content-ad"></div>

Redux Core:

- 중앙 집중식 상태 관리
- 액션과 리듀서를 통한 상태 업데이트
- 예측 가능한 불변 상태

Redux Toolkit 향상:

- createSlice로 리듀서 생성 간단화
- createAsyncThunk로 비동기 작업 처리
- 코드 구성 및 유지 관리 개선

<div class="content-ad"></div>

🌟 성능을 위한 재선택:

- 선택기(selector) 내의 메모이제이션은 컴포넌트 렌더링을 최적화합니다.
- 불필요한 재계산을 피합니다.

💾 Redux Persist (선택 사항):

- 세션/페이지 다시로드 사이에 상태를 지속시킵니다.
- 데이터 보존으로 사용자 경험을 향상시킵니다.
- 민감한 데이터에 대한 보안 고려 사항.

<div class="content-ad"></div>

디버깅:

- 상태 문제 식별 및 수정에 중요
- 일반적인 과제: 복잡한 작업, 비동기 작업, 상태 변이
- 도구: Redux DevTools, 콘솔 로그, 디버거

최상의 실첵:

- 명확한 리듀서를 위해 createSlice 사용
- createAsyncThunk로 비동기 데이터 관리
- Reselect로 메모이제이션 구현
- 상태 지속성을 위해 Redux Persist 고려
- 튼튼한 애플리케이션을 위한 효율적인 디버깅 활용

<div class="content-ad"></div>

# 스택데미ック 🎓

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가를 응원하고 팔로우해 주시기 바랍니다! 👏
- 저희를 팔로우해 주세요 X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Venture | Cubed
- 스택데미크 닷컴에서 더 많은 콘텐츠를 만나보세요
