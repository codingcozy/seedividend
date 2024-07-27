---
title: "상태 관리의 잠금 해제 리액트 컨텍스트에 대한 심층 분석"
description: ""
coverImage: "/assets/img/2024-05-12-UnlockingStateManagementADeepDiveintoReactContext_0.png"
date: 2024-05-12 21:30
ogImage: 
  url: /assets/img/2024-05-12-UnlockingStateManagementADeepDiveintoReactContext_0.png
tag: Tech
originalTitle: "Unlocking State Management: A Deep Dive into React Context"
link: "https://medium.com/@saha.poulami91/unlocking-state-management-a-deep-dive-into-react-context-f261595f3346"
---


React Context은 React 애플리케이션 내의 컴포넌트 트리를 통해 데이터를 수동으로 props를 전달하지 않고 전달할 수 있는 방법을 제공합니다. Props Drilling이라고도 합니다. 이것의 목적은 React 애플리케이션 내에서 상태 관리를 단순화하고 컴포넌트 간에 전역 데이터 공유를 활성화하는 것입니다.

# 시작해봅시다:

이제 우리가 React Context가 무엇인지 알았으니, 언제 사용할지 알아봅시다:
- 애플리케이션이 UI 테마, 언어 설정 또는 사용자 인증 상태와 같은 비교적 간단한 상태 관리 요구사항을 갖고 있거나, 사이드 드로어의 현재 상태 또는 상태 값의 수가 적은 경우, Redux의 복잡성 없이 React Context가 가벼운 솔루션을 제공할 수 있습니다.
- Redux와 비교하여 보일러플레이트 코드가 줄어들 수 있으며, 특히 상태 관리 요구사항이 간단한 프로젝트나 작은 프로젝트의 경우에 해당합니다.
- 의존성 주입에 사용될 수 있으며, 의존성 (서비스 또는 구성 객체와 같은)을 컴포넌트에 수동으로 전달하지 않고 주입할 수 있습니다. 이는 특히 테스트와 컴포넌트를 구체적인 구현과 분리하는 데 유용할 수 있습니다.



이제 React Context를 피해야 할 때를 확인해 봅시다:

- React Context는 강력하지만, 특히 실제로 전역적이지 않은 데이터에는 신중하게 사용해야 합니다.
- React Context를 과도하게 사용하면 불필요한 다시 렌더링과 성능 하락을 초래할 수 있습니다.
- 상태 값이 매우 빈번하게 변경될 때에는 React Context가 Redux만큼 효율적이지 않습니다.
- 컴포넌트 재구성도 React Context의 사용을 현명하게 피할 수 있습니다.

# 한번 만들어 봅시다

온라인 쇼핑 애플리케이션을 고려해 봅시다. 여기서는 장바구니 값을 처리하는 온라인 쇼핑 애플리케이션을 생각해 보겠습니다. React Context를 활용하는 것은 4가지 간단한 단계로 이루어질 수 있습니다.



스텝 1:

애플리케이션의 컨텍스트를 createContext 메서드를 사용하여 생성합니다. 컨텍스트를 생성하는 동안 객체 매개변수로 공유해야 하는 값과 메서드를 전달합니다. 이렇게 하면 컨텍스트 값을 사용할 때 자동 완성에 도움이 됩니다.

```js
import React, { createContext } from 'react';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});
```

스텝 2:



다음으로, 방금 생성한 컨텍스트의 Provider 구성 요소로 구성 요소를 래핑해야 합니다. 컨텍스트 값을 액세스할 모든 컴포넌트는 Provider 구성 요소로 둘러싸야 합니다. 예를 들어, 아래 예제에서 Header 컴포넌트는 현재 장바구니 아이템 수를 표시하기 위해 장바구니 심볼을 액세스합니다. 각 제품의 클릭 이벤트는 항목을 추가하여 장바구니를 업데이트하고 장바구니 항목 수도 업데이트합니다.

```js
import React, { useState } from 'react';
import { CartContext } from "../store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContext.Provider>
      <Header/>
      <Shop>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}
```

3단계:

Provider에는 컨텍스트가 사용할 기본 값을 전달해야 합니다.



현재 항목 상태 값을 전달했습니다. 또한 addItemToCart와 updateCartItemQuantity 두 공유 메소드의 참조를 전달했습니다.

```js
import React, { useState } from 'react';
import { CartContext } from "../store/shopping-cart-context.jsx";

function App() {
  const [items, setItems] = useState([]);
  const handleAddingItemToCart = (id) => {
      ...
  }
  const handleUpdateCartItemQuantity = () => {
      ...
  }

  const defaultCartValue = {
      items: items,
      addItemToCart: handleAddingItemToCart,
      updateCartItemQuantity: handleUpdateCartItemQuantity,
  }

  return (
    <CartContext.Provider value={defaultCartValue}>
      <Header />
      <Shop>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}
```

Step 4:

이제 자식 컴포넌트에서 컨텍스트 값을 사용할 때입니다.



첫 번째로 useContext 후크를 사용하여 현재 컨텍스트에 액세스합니다. 여기서는 해당 컴포넌트가 필요로하는 컨텍스트 속성 및 메서드를 구조 분해할 수 있습니다.

```js
import React, { useContext } from 'react';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const cartItemsCount = cartCtx.items.length;
  // OR
  const { items } = useContext(CartContext);
  const cartItemsCount = items.length;
  ...
  return (
    <div>
        <Logo/>
        <p>온라인 쇼핑</p>
        <button>장바구니 ({cartItemsCount})</button>
    </div>
  )
}
```

```js
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Product({ image, title, price, description }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => addItemToCart(id)}>장바구니에 추가</button>
        </p>
      </div>
    </article>
  );
}
```

# 꿀팁



- 메인 App 컴포넌트에 너무 많은 메소드가 있으면 컴포넌트가 과부하될 수 있어요. 이를 해소하기 위해 공유 메소드와 상태 값을 모두 사용자 정의 후크로 추출할 수 있어요.
- Context API를 과도하게 사용하면 상태 값이 변경될 때마다 다시 렌더링되어 성능에 영향을 줄 수 있어요.
- 여러 개의 컨텍스트 프로바이더가 있을 때는 코드 유지보수를 쉽게하기 위해 하나로 결합하여 슬라이스를 만들어야 해요.
- 컨텍스트는 별도의 파일에서 처리되어야 해요.

# 결론

React Context를 상태 관리 도구로서의 개념, 사용 사례, 이용 방법 및 주의 사항에 대해 쉽게 이해하는 데 도움이 되었으면 좋겠어요.

즐거운 코딩하세요!!!