---
title: "리액트 상태를 Reducer로 관리하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Manage React State With Reducer"
link: "https://medium.com/stackademic/manage-react-state-with-reducer-ed0a2eff0ace"
isUpdated: true
---





<img src="/assets/img/ManageReactStateWithReducer_0.png" />

리액트에서 상태 관리는 동적 및 대화형 애플리케이션을 구축하는 중요한 측면입니다. 리액트의 내장 useState 훅은 로컬 컴포넌트 상태를 관리하는 데 일반적으로 사용됩니다. 그러나 더 복잡한 상태 로직은 리듀서의 사용으로 이점을 얻을 수 있습니다.

중급 멤버십이 없는 경우, 유료 구독 없이 이 링크를 사용하여 기사에 액세스할 수 있습니다.

## 리듀서란 무엇인가요?

<div class="content-ad"></div>

리듀서는 애플리케이션의 상태를 결정하는 함수입니다. 현재 상태와 액션을 인수로 받아 새로운 상태를 반환합니다. 이 패턴은 Redux에서 영감을 받았습니다. 개발자들은 React의 useReducer 훅과 함께 자주 사용합니다.

## 리듀서 사용의 장점:

- 예측 가능한 상태 업데이트: 리듀서는 상태 전이가 명시적이고 예측 가능하도록 보장합니다. 특정 액션을 정의하고 그것이 상태에 어떻게 영향을 주는지를 정의함으로써, 개발자는 상태 변경에 대해 더 명확하게 제어할 수 있습니다.
- 중앙집중식 로직: 리듀서는 상태 업데이트를 위한 로직을 중앙집중화합니다. 이로써 상태가 다른 액션에 응답하여 어떻게 변경되는지를 이해하고 디버그하기 쉬워집니다.
- 복잡한 상태에 적합: 상태 로직은 양식, 쇼핑 카트, 또는 다단계 마법사와 같이 더 복잡해질 수 있습니다. 리듀서는 이러한 경우에 대해 더 깨끗하고 확장 가능한 해결책을 제공합니다.

# 구현

<div class="content-ad"></div>

## 인터페이스

다음으로 두 개의 인터페이스가 정의됩니다: FormState 및 Action. 이러한 인터페이스는 리듀서에서 사용되는 상태(state)와 액션(actions)의 모양을 설명합니다.

```js
interface FormState {
  name: string;
  email: string;
  phoneNumbe: string;
  address: string;
}

interface Action {
  type: string;
  value?: any;
}
```

- FormState: 이름, 이메일, 전화번호 및 주소의 모양을 나타내는 상태 객체의 모양을 설명합니다. 모두 string 타입입니다.
- Action: 액션 객체의 모양을 설명합니다. 타입 및 선택적 값(value)을 포함합니다. 타입은 액션 유형을 나타내는 문자열입니다. 값은 특정 필드에 대한 새 값의 표현입니다.

<div class="content-ad"></div>

## 초기 상태 및 리듀서 함수

폼의 초기 상태가 정의되었습니다.

```js
const initialState: FormState = {
  email: "",
  name: "",
  phoneNumber: "",
  address: "",
};
```

다음으로, 리듀서 함수가 정의되었습니다. 리듀서는 현재 상태와 액션을 받아들이고, 액션 유형에 기반하여 새로운 상태를 반환합니다.

<div class="content-ad"></div>

```js
const reducer = (state: FormState, action: Action) => {
  if (action.type === "reset") {
    return initialState;
  }
  const result: FormState = { ...state };
  result[action.type] = action.value;
  return result;
};
```

- 리듀서는 action.type을 확인합니다:
- 만약 타입이 "reset"이라면 초기 상태(initial state)를 반환하여 효과적으로 폼을 재설정합니다.
- 그렇지 않으면, 현재 상태(...state)를 복사하여 새 상태(result)를 생성합니다. 그 후 action.type이 가리키는 필드를 새로운 action.value로 업데이트합니다.

## 함수형 컴포넌트(Functional Component)

이제, 주요 컴포넌트가 함수형 컴포넌트(FC)로 정의되었습니다:

<div class="content-ad"></div>

```js
export const Form: FC = (props) => {
    const [state, dispatch] = useReducer<Reducer<FormState, Action>, FormState>(
        reducer,
        initialState,
        () => initialState
    );
    const { name, email, phoneNumber, address } = state;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 기타 작업 처리

        // 상태 초기화
        dispatch({ type: "reset" });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: name, value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    이름:
                    <input value={name} name="name" onChange={onChange} />
                </label>
            </div>
            <div>
                <label>
                    이메일:
                    <input value={email} name="email" onChange={onChange} />
                </label>
            </div>
            <div>
                <label>
                    전화번호:
                    <input
                        value={phoneNumber}
                        name="phoneNumber"
                        onChange={onChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    주소:
                    <input
                        value={address}
                        name="address"
                        onChange={onChange}
                    />
                </label>
            </div>
            <button>제출</button>
        </form>
    );
};
```

# Form 컴포넌트 설명:

- useReducer: 이는 상태 관리에 사용되는 React 훅입니다. reducer 함수, initialState 및 선택적 초기화 함수 (() = initialState)를 입력으로 받습니다. 현재 상태(state) 및 reducer에 액션을 디스패치하는 dispatch 함수를 반환합니다.
- const { name, email, phoneNumber, address } = state;: 구조 분해 할당을 사용하여 상태 개체에서 상태 변수를 추출합니다.
- handleSubmit: 이 함수는 양식이 제출될 때 호출됩니다. 기본 양식 제출 동작을 방지합니다 (e.preventDefault()). 일반적으로 API 요청을 만드는 등 양식 제출 로직을 처리할 것입니다. 이 경우 "reset" 액션을 디스패치하여 양식을 지웁니다.
- onChange: 입력 필드 중 하나가 변경될 때 호출됩니다. 입력 요소에서 이름과 값을 추출합니다. 그런 다음 이름을 유형으로하고 값을 새 값으로 하는 작업을 디스패치합니다. 이렇게 하면 사용자가 양식 필드에 타이핑하는 대로 상태가 동적으로 업데이트됩니다.
- return 문 안에서:
- form 요소는 handleSubmit에 설정된 onSubmit 이벤트 핸들러를 가지고 있습니다. 양식이 제출될 때 트리거됩니다.
- 각 입력 요소는 해당 상태 변수 (name, email, phoneNumber, address)와 연결되어 있습니다. onChange 이벤트 핸들러가 onChange으로 설정되어 있습니다. 이렇게하면 입력 값이 변경될 때 onChange 함수가 상태를 해당하는 방식으로 업데이트합니다.

전반적으로, 이 Form 컴포넌트는 이름, 이메일, 전화번호 및 주소에 대한 필드가 있는 양식을 생성합니다. 사용자가 양식과 상호 작용하는 동안 useReducer 훅과 reducer 함수를 통해 상태가 업데이트됩니다. React에서 제어된 양식 동작을 제공합니다. 양식이 제출되면 양식 필드가 지워집니다.

<div class="content-ad"></div>

여기 또 다른 reduce의 예제가 있어요. 이것은 Form 컴포넌트보다 복잡해요.

```js
import React, { FC, useReducer, useState } from "react";

// 상태의 형태를 정의해요
interface ShoppingCartState {
    items: CartItem[];
    formData: {
        name: string;
        price: string;
    };
}

// CartItem의 형태를 정의해요
interface CartItem {
    id: number;
    name: string;
    price: number;
}

// 액션의 형태를 정의해요
interface IAction {
    type: string;
    item?: CartItem;
    formData?: {
        name?: string;
        price?: string;
    };
}

// 쇼핑 카트의 초기 상태
const initialState: ShoppingCartState = {
    items: [],
    formData: {
        name: "",
        price: "",
    },
};

// 상태 변경을 관리하는 리듀서 함수
const reducer = (state: ShoppingCartState, action: IAction) => {
    switch (action.type) {
        case "ADD_ITEM":
            const newItem: CartItem = {
                id: state.items.length + 1,
                name: state.formData.name,
                price: parseFloat(state.formData.price) || 0,
            };
            return {
                ...state,
                items: [...state.items, newItem],
                formData: {
                    name: "",
                    price: "",
                },
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.item!.id),
            };
        case "RESET":
            return initialState; // 초기 상태로 재설정
        case "UPDATE_FORM_DATA":
            return {
                ...state,
                formData: {
                    ...state.formData,
                    ...action.formData!,
                },
            };
        default:
            return state;
    }
};

// ShoppingCart의 함수형 컴포넌트
export const ShoppingCart: FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleAddItem = () => {
        dispatch({ type: "ADD_ITEM" });
    };

    const handleRemoveItem = (item: CartItem) => {
        dispatch({ type: "REMOVE_ITEM", item });
    };

    const handleReset = () => {
        dispatch({ type: "RESET" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({ type: "UPDATE_FORM_DATA", formData: { [name]: value } });
    };

    const totalPrice = state.items.reduce((acc, curr) => acc + curr.price, 0);

    return (
        <div>
            <h2>장바구니</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddItem(); }>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={state.formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={state.formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        required
                    />
                </label>
                <button type="submit">상품 추가</button>
            </form>
            <button onClick={handleReset}>장바구니 초기화</button>
            <ul>
                {state.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price}{" "}
                        <button onClick={() => handleRemoveItem(item)}>삭제</button>
                    </li>
                ))}
            </ul>
            <p>총 가격: ${totalPrice.toFixed(2)}</p>
        </div>
    );
};
```

액션 타입을 열거형으로 변환하고 더 많은 제한을 추가함으로써 이 예제를 향상시킬 수 있어요. 하지만 주요 아이디어는 동일해요.

요약하면, 리듀서는 React 응용 프로그램에서 상태를 관리하는 구조적이고 확장 가능한 접근 방식을 제공해요. 개발자들은 명확한 액션을 정의하고 리듀서 함수에서 이를 처리함으로써 유지보수 가능하고 이해하기 쉬운 상태 논리를 만들 수 있어요.

<div class="content-ad"></div>

쇼핑 카트, 폼 처리 또는 기타 복잡한 상태 요구 사항에 대해서 리듀서를 사용하면 더 예측 가능하고 관리할 수 있는 코드를 작성할 수 있습니다.

프로젝트에서는 애플리케이션 상태 논리가 복잡해지기 시작할 때 상태 관리를 위해 리듀서를 사용하는 것을 고려해보세요. 이들은 상태 변경을 예측 가능하고 조직적으로 처리할 수 있는 강력한 도구를 제공합니다.

👏 읽어 주셔서 감사합니다!

👨‍💼 귀하의 시간에 감사드리며 이 이야기를 유익하게 여기셨기를 바랍니다. 즐겁게 읽으셨다면, 열심히 일한 작가를 칭찬하기 위해 👏 클랩으로 감사를 표현해주세요!

<div class="content-ad"></div>

📰 기사를 공유하여 지식을 공유해 주세요!

✍ 이야기에 대한 피드백이나 의견을 자유롭게 공유해 주세요. 여러분의 의견은 저의 성장과 더 가치 있는 콘텐츠 제작에 도움이 됩니다.

✌ 연결 유지하기! 🚀 보다 매력적인 기사를 원하신다면 소셜 미디어에서 저를 팔로우해 주세요:

- Twitter
- Instagram

<div class="content-ad"></div>

🔍 더 알아보기! 📖 코디미스에서 지식의 보물 창고로 빠져들어보세요. 배울 것이 더 많고, 발견하는 여정에서 도와드릴 준비가 되어있습니다.

# 스택더믹 🎓

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가를 칭찬하고 팔로우해 주시면 감사하겠습니다! 👏
- 팔로우하기: X | 링크드인 | 유튜브 | 디스코드
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Venture | Cubed
- Stackademic.com에서 더 많은 콘텐츠 만나보세요
