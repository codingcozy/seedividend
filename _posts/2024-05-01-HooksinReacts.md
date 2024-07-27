---
title: "리액트에서의 훅(Hooks)을 제대로 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-HooksinReacts_0.png"
date: 2024-05-01 18:08
ogImage: 
  url: /assets/img/2024-05-01-HooksinReacts_0.png
tag: Tech
originalTitle: "Hooks in Reacts"
link: "https://medium.com/@utkcha1205/hooks-in-reacts-8a3db53d5785"
---


현대 웹 개발 분야에서는 React의 Hooks 도입이 개발자들이 사용자 인터페이스를 구축하는 방식에 상당한 변화를 가져왔어요. Hooks는 클래스를 작성하지 않고도 상태 및 기타 React 기능을 활용할 수 있게 해주는 함수들이에요. 이를 통해 개발 프로세스가 간소화되고 코드베이스를 더 잘 관리하고 가독성있게 만들 수 있어요. Hooks를 사용하면 useState를 활용하여 컴포넌트 상태를 쉽게 관리하고, useEffect로 부수 효과를 처리하며, useContext를 사용하여 컴포넌트 내에서 컨텍스트에 접근할 수 있어요.

# useReducer

useReducer는 컴포넌트 내에서 복잡한 상태 로직을 관리하기 위해 사용되는 React 훅이에요. 특히 이전 상태에 따라 상태 전이가 발생하는 경우에 유용해요. 여기서 useReducer가 적용될 수 있는 몇 가지 다른 사용 사례들을 제공할게요.

```js
import React, { useReducer } from "react";
function reducer(state, action) {
switch (action.type) {
case "LOGIN":
return { …state, user: action.payload.user, isLoggedIn: true };
case "LOGOUT":
return { …state, user: null, isLoggedIn: false };
default:
return state;
}
}
function Auth() {
const [state, dispatch] = useReducer(reducer, {
user: null,
isLoggedIn: false,
});
const handleLogin = () => {
// 로그인 처리 로직
const fakeUser = { username: "user", email: "user@example.com" };
dispatch({ type: "LOGIN", payload: { user: fakeUser } });
};
const handleLogout = () => {
// 로그아웃 처리 로직
dispatch({ type: "LOGOUT" });
};
return (
<div>
{state.isLoggedIn ? (
<div>
<p>환영합니다, {state.user.username}님!</p>
<button onClick={handleLogout}>로그아웃</button>
</div>
) : (
<button onClick={handleLogin}>로그인</button>
)}
</div>
);
}
export default Auth;
```

<div class="content-ad"></div>

# useContext

useContext은 함수형 컴포넌트 내에서 컨텍스트를 소비하는 데 사용되는 React 훅입니다. 이를 통해 React.createContext() 함수에 의해 생성된 컨텍스트 객체의 값을 액세스할 수 있습니다. useContext의 몇 가지 다른 사용 사례와 여러 값을 처리하는 방법에 대해 살펴보겠습니다:

```js
import React, { createContext, useContext, useState } from 'react';
const UserContext = createContext();
const UserProvider = ({ children }) => {
const [user, setUser] = useState(null);
const login = (userData) => {
setUser(userData);
};
const logout = () => {
setUser(null);
};
return (
<UserContext.Provider value={ user, login, logout }>
{children}
</UserContext.Provider>
);
};
const Profile = () => {
const { user, logout } = useContext(UserContext);
return (
<div>
{user ? (
<div>
<p>Welcome, {user.name}!</p>
<button onClick={logout}>Logout</button>
</div>
) : (
<p>Please log in</p>
)}
</div>
);
};
const LoginForm = () => {
const { login } = useContext(UserContext);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const handleLogin = () => {
// perform login logic
const userData = { name: username }; // Example data
login(userData);
};
return (
<div>
<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
<button onClick={handleLogin}>Login</button>
</div>
);
};
const App = () => {
return (
<UserProvider>
<Profile />
<LoginForm />
</UserProvider>
);
};
export default App;
```

# useRef

<div class="content-ad"></div>

useRef은 주로 React 훅으로 사용되며, 다시 렌더링을 유발하지 않고 렌더링 간 지속되는 가변 값에 액세스하고 저장하는 데 주로 사용됩니다. 이는 DOM 요소에 액세스하거나 렌더링 간 값 추적 또는 가변 변수 저장에 흔히 사용됩니다. useRef의 다양한 사용 사례와 여러 값 처리 방법은 다음과 같습니다:

```js
import React, { useRef } from "react";
function MutableValues() {
const counterRef = useRef(0);
const incrementCounter = () => {
counterRef.current += 1;
console.log('Current value of counter:', counterRef.current);
};
return (
<div>
<button onClick={incrementCounter}>Increment Counter</button>
</div>
);
}
export default MutableValues;
```

# useCallback

useCallback은 함수를 메모이제이션하는 데 사용되는 React 훅입니다. 자식 컴포넌트에 콜백을 전달할 때 불필요한 다시 렌더링을 방지하는 데 특히 유용합니다. useCallback의 다양한 사용 사례와 여러 값을 처리하는 방법은 다음과 같습니다:

<div class="content-ad"></div>

```js
import React, { useState, useCallback } from 'react';
import ChildComponent from './ChildComponent';
function ParentComponent() {
const [count, setCount] = useState(0);
// count를 의존성으로 갖는 메모이제이션된 콜백 함수
const handleClick = useCallback(() => {
console.log('버튼이 클릭되었습니다! Count:', count);
}, [count]);
return (
<div>
<ChildComponent onClick={handleClick} />
<button onClick={() => setCount(count + 1)}>증가</button>
</div>
);
}
export default ParentComponent;
```

# useMemo

useMemo는 비용이 많이 드는 계산을 메모이제이션하기 위해 사용되는 React 훅입니다. 값들의 불필요한 다시 계산을 피하고 성능을 최적화해야 하는 경우에 특히 유용합니다. useMemo의 다양한 사용 사례와 여러 값들을 다루는 방법은 다음과 같습니다:

```js
import React, { useState, useMemo } from "react";
function ProductList() {
const [products] = useState([
{ id: 1, name: "제품 1", price: 10 },
{ id: 2, name: "제품 2", price: 20 },
{ id: 3, name: "제품 3", price: 30 },
{ id: 4, name: "제품 4", price: 30 },
{ id: 5, name: "제품 5", price: 30 },
]);
const [selectedProducts, setSelectedProducts] = useState([]);
const handleToggleProduct = (productId) => {
setSelectedProducts((prevSelectedProducts) => {
const isSelected = prevSelectedProducts.includes(productId);
if (isSelected) {
return prevSelectedProducts.filter((id) => id !== productId);
} else {
return [...prevSelectedProducts, productId];
}
});
};
// 총 가격 메모이제이션된 계산
const totalPrice = useMemo(() => {
console.log("총 가격 계산 중...");
return selectedProducts.reduce((total, productId) => {
const selectedProduct = products.find(
(product) => product.id === productId
);
return total + (selectedProduct ? selectedProduct.price : 0);
}, 0);
}, [selectedProducts, products]);
return (
<div>
<h2>제품 목록</h2>
<ul>
{products.map((product) => (
<li key={product.id}>
<label>
<input
type="checkbox"
checked={selectedProducts.includes(product.id)}
onChange={() => handleToggleProduct(product.id)}
/>
{product.name} - ${product.price}
</label>
</li>
))}
</ul>
<h3>총 가격: ${totalPrice}</h3>
</div>
);
}
export default ProductList;
```

<div class="content-ad"></div>

# useImperativeHandle

useImperativeHandle은 React 훅으로, React.forwardRef를 사용할 때 부모 컴포넌트가 자식 컴포넌트에 노출하는 인스턴스 값을 사용자 정의하는 데 사용됩니다. 부모 컴포넌트의 부모에게 액세스 가능한 함수 또는 값들을 정의하고, 직접 자식 컴포넌트에 노출되지 않도록 합니다. useImperativeHandle의 몇 가지 사용 사례 및 여러 값 처리 방법은 다음과 같습니다:

```js
import React, { useState, useImperativeHandle, forwardRef } from 'react';
const ChildComponent = forwardRef((props, ref) => {
const [count, setCount] = useState(0);
useImperativeHandle(ref, () => ({
getCount: () => count
}));
return (
<div>
<p>Count: {count}</p>
<button onClick={() => setCount(count + 1)}>Increment</button>
</div>
);
});
function ParentComponent() {
const childRef = useRef(null);
const handleGetCount = () => {
alert(`Count from child component: ${childRef.current.getCount()}`);
};
return (
<div>
<ChildComponent ref={childRef} />
<button onClick={handleGetCount}>Get Count from Child</button>
</div>
);
}
export default ParentComponent;
```

# useLayoutEffect

<div class="content-ad"></div>

useLayoutEffect은 useEffect와 유사한 React 훅이지만, 모든 DOM 변이 후 동기적으로 실행됩니다. 브라우저가 화면을 그리기 전에 반드시 DOM 명령을 실행하거나 DOM에서 레이아웃 정보를 읽어야 하는 경우에 유용합니다. useLayoutEffect의 몇 가지 사용 사례와 다중 값 처리 방법은 다음과 같습니다:

```js
import React, { useState, useLayoutEffect, useRef } from 'react';
function ComponentWithLayoutEffect() {
const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
const elementRef = useRef(null);
useLayoutEffect(() => {
const { current: element } = elementRef;
if (!element) return;
const { width, height } = element.getBoundingClientRect();
setDimensions({ width, height });
}, [elementRef]);
return (
<div ref={elementRef}>
<p>Width: {dimensions.width}px</p>
<p>Height: {dimensions.height}px</p>
</div>
);
}
export default ComponentWithLayoutEffect;
```

# useDeferredValue

useDeferredValue는 React 18에서 도입된 React 훅으로, 일정 시간이 지난 후 컴포넌트 내의 값을 업데이트를 지연시킵니다. 부드러운 사용자 상호작용을 우선시하거나 빠른 상태 변경으로 인한 불필요한 다시 렌더링을 줄이는 경우에 유용합니다. useDeferredValue의 몇 가지 사용 사례와 다중 값 처리 방법은 다음과 같습니다:

<div class="content-ad"></div>

```js
import React, { useState, useDeferredValue } from 'react';
function TextInput() {
const [text, setText] = useState('');
const deferredText = useDeferredValue(text, { timeoutMs: 1000 });
const handleChange = (e) => {
setText(e.target.value);
};
return (
<div>
<input type="text" value={text} onChange={handleChange} />
<p>Deferred Value: {deferredText}</p>
</div>
);
}
export default TextInput;
```

# useTransition

useTransition은 React 18에서 도입된 React 훅입니다. 애플리케이션에서 애니메이션과 업데이트를 조정할 수 있게 해줍니다. 특히 원활한 전환을 통해 특정 작업을 수행하고 싶을 때 유용합니다. useTransition의 몇 가지 유즈 케이스와 여러 값 처리 방법은 다음과 같습니다:

```js
import React, { useState, useTransition } from "react";
function AnimatedList() {
const [items, setItems] = useState([]);
const [isPending, startTransition] = useTransition({ timeoutMs: 300 });
const addItem = () => {
startTransition(() => {
setItems((prevItems) => […prevItems, Date.now()]);
});
};
const removeItem = (timestamp) => {
startTransition(() => {
setItems((prevItems) => prevItems.filter((item) => item !== timestamp));
});
};
return (
<div>
<button onClick={addItem}>Add Item</button>
{isPending && <p>Loading…</p>}
<ul>
{items.map((item) => (
<li key={item}>
<button onClick={() => removeItem(item)}>Remove</button>
Item {item}
</li>
))}
</ul>
</div>
);
}
export default AnimatedList;
```

<div class="content-ad"></div>

# useId

useId은 내장된 React 훅이 아닙니다. 하지만 React 컴포넌트 내에서 고유한 식별자를 생성하는 데 사용되는 사용자 정의 훅 또는 유틸리티 함수로 종종 구현됩니다. 이러한 식별자는 목록 항목에 고유한 키 속성을 설정하거나 고유한 HTML id 속성을 생성하거나 양식 입력란과 라벨을 연결하는 등 다양한 목적으로 유용합니다. useId의 몇 가지 사용 사례와 여러 값을 처리하는 방법에 대해 설명합니다:

```js
import React from 'react';
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={useId()}>{item}</li>
      ))}
    </ul>
  );
}
export default List;
```