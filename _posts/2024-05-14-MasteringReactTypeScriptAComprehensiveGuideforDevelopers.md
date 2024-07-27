---
title: "React TypeScript 마스터하기 개발자를 위한 포괄적인 가이드"
description: ""
coverImage: "/assets/img/2024-05-14-MasteringReactTypeScriptAComprehensiveGuideforDevelopers_0.png"
date: 2024-05-14 11:54
ogImage: 
  url: /assets/img/2024-05-14-MasteringReactTypeScriptAComprehensiveGuideforDevelopers_0.png
tag: Tech
originalTitle: "Mastering React TypeScript: A Comprehensive Guide for Developers"
link: "https://medium.com/@aiden.web/mastering-react-typescript-a-comprehensive-guide-for-developers-d676312d847c"
---


![이미지](/assets/img/2024-05-14-MasteringReactTypeScriptAComprehensiveGuideforDevelopers_0.png)

React 능력을 더 높이고 싶은 개발자이신가요? TypeScript로 React를 마스터하려면 더 이상 찾을 필요가 없어요. 이 포괄적인 안내서는 React 응용 프로그램을 TypeScript로 구축하는 데 필요한 모든 것을 알려줄 거에요. 처음 시작하는 중이거나 React를 한동안 사용해온 분이더라도, 이 안내서는 깨끗하고 효율적이며 확장 가능한 코드를 작성하는 데 필요한 도구와 지식을 제공할 거예요. 그러니 함께 React TypeScript의 세계를 탐험해 봐요!

# 1. 함수 컴포넌트

## 1.1 외부 선언



저희 컴포넌트의 props에 대한 타입을 정의하기 위해 인터페이스를 사용하세요.

```js
interface GreetingProps {
  name: string;
}

const Greeting = ({ name }: GreetingProps) => <div>Hello, {name}!</div>;
```

## 1.2 Inline Declaration

조금 더 간단한 props를 가진 컴포넌트의 경우, 인라인으로 선언할 수 있습니다.



```js
const Greeting = ({ name }: { name: string }) => <div>환영합니다, {name}님!</div>;
```

## 1.3 제네릭 사용하기

제네릭은 컴포넌트 props의 유연성을 향상시킵니다.

```js
// 제네릭 타입 정의
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// 그 제네릭 타입을 사용하여 함수 컴포넌트 생성
const List: React.FC<ListProps<string>> = ({ items, renderItem }) => (
  <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>
);

const UserList = () => {
  const users = ["Alice", "Bob", "Charlie"];
  return <List items={users} renderItem={(user) => <strong>{user}</strong>} />;
};
```



# 2. 훅

## 2.1 useState

간단히 초기값을 제공하면 TypeScript가 해당 유형을 자동으로 유추해줍니다.

```js
const [counter, setCounter] = useState(0);
// 'counter'는 숫자로 추론됩니다
// 'setCounter'는 숫자나 숫자를 반환하는 함수를 입력으로 받는 함수입니다
```



초기 상태가 정의되지 않을 수 있는 경우에는 상태의 타입을 명시적으로 정의할 수 있습니다.

```js
interface User {
  name: string;
  id: number;
  email: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | undefined>();

  // 'user'은 User 객체이거나 undefined일 수 있습니다.
}
```

`User | undefined`와 같이 undefined일 수 있는 제네릭을 사용할 때, 객체가 undefined일 수 있다는 오류가 발생할 수 있습니다. 이 경우 다음 두 가지 방법으로 처리할 수 있습니다:

- 옵셔널 체이닝 연산자 `?.`을 사용하는 것입니다.



```js
function UserProfile() {
  const [user, setUser] = useState<User | undefined>();

  return (
    <div>
      Name: {user?.name} {/* 여기서 선택적 체이닝을 사용했습니다. */}
    </div>
  );
}
```

- 초기값으로 빈 객체 제공 및 타입 어설션 사용

```js
const [user, setUser] = useState<User>({} as User);
// 여기서 우리는 빈 객체가 실제로 User 객체라고 말하고 있습니다.
```

## 2.2 useCallback




위의 텍스트를 부탁하신 대로 친절하게 한국어로 번역해 드리겠습니다.

함수의 타입은 첫 번째 인수에서 추론됩니다.

버튼이 클릭될 때 작업을 수행해야 하는 함수가 있고, 그러나 이 함수가 컴포넌트가 렌더링될 때마다 재생성되지 않도록 하고 싶다면 useCallback을 사용할 수 있습니다.

```js
const saveUser = useCallback(
  (id: number, userData: User) => {
    // 이 함수가 사용자 데이터를 서버로 보내는 상황을 상상해보세요
    api.updateUser(id, userData);
  },
  [],
); // 의존성 배열이 비어 있으므로, 이 함수는 한 번 생성되고 재생성되지 않음

// 'saveUser'는 다음과 같이 추론됩니다: (id: number, userData: User) => void
```

## 2.3 useMemo



제공된 첫 번째 인수의 반환 값을 기반으로 유형이 추론됩니다.

카트에 있는 항목들의 총 가격을 계산하는 시나리오를 고려해 보세요. 세금을 포함한 가격을 계산하려면:

```js
const totalPrice = useMemo(() => {
  const price = items.reduce((total, item) => total + item.price, 0);
  return (price * (1 + taxRate)).toFixed(2);
}, [items, taxRate]); // 'totalPrice'은 toFixed로 인해 문자열로 추론됩니다
```

값의 반환 유형을 명시적으로 지정할 수도 있습니다.



그러나 제네릭을 사용하여 명시적으로 잘못된 유형을 설정하려고하면 TypeScript에서 경고가 발생할 것입니다:

```js
// toFixed로 인해 반환 유형이 문자열인 경우 오류가 발생합니다.
const totalPrice = useMemo<number>(() => {
  const price = items.reduce((total, item) => total + item.price, 0);
  return (price * (1 + taxRate)).toFixed(2);
}, [items, taxRate]); // 오류: 'string' 형식은 'number' 형식에 할당할 수 없습니다.
```

## 2.4 useRef

DOM 노드에 액세스하려면 null의 초기값을 제공할 수 있습니다.



페이지가 로드될 때 텍스트 입력란에 초점을 맞추어야 할 때:

```js
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  // 컴포넌트가 마운트된 후 입력 요소에 초점을 맞춥니다
  inputRef.current?.focus();
}, []);
```

useRef는 업데이트되어도 다시 렌더링을 발생시키지 않는 타이머 참조와 같은 변경 가능한 값을 저장하는 데에도 사용할 수 있습니다.

2초마다 메시지를 기록하는 타이머를 설정하고 싶다고 가정해봅시다:



```js
const timerRef = useRef<NodeJS.Timer>();

useEffect(() => {
  timerRef.current = setInterval(() => {
    console.log("Timer tick");
  }, 2000);

  // 컴포넌트가 언마운트 될 때 interval을 정리합니다.
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
}, []);
```

## 2.5 useImperativeHandle

useImperativeHandle은 ref를 사용할 때 노출되는 인스턴스 값을 사용자 정의하는 데 사용됩니다. 타입은 forwardRef 지점에서 정의되며, 제네릭이 전달되는 순서를 주의해야 합니다—ref는 props 앞에 옵니다.

부모 컴포넌트에서 리셋할 수 있는 사용자 정의 입력 컴포넌트가 있는 시나리오를 상상해봅시다.



```js
import { useRef, forwardRef, useImperativeHandle, useState } from "react";

// 사용자 정의 ref 타입 정의
interface CustomInputHandle {
  clear: () => void;
}

const Form = () => {
  // null로 초기화
  const inputRef = useRef<CustomInputHandle>(null);

  const handleClearClick = () => {
    inputRef.current?.clear();
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleClearClick}>Clear Input</button>
    </div>
  );
};

// props와 ref 타입 정의의 역순에 유의하세요
const CustomInput = forwardRef<CustomInputHandle, {}>((props, ref) => {
  const [text, setText] = useState("");

  useImperativeHandle(ref, () => ({
    clear: () => {
      setText("");
    },
  }));

  return (
    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
  );
});

export default Form;
```

## 2.6 useContext

useContext를 사용하면 컴포넌트에서 context 객체를 소비할 수 있습니다. 자동으로 타입이 유추되므로 createContext 단계에서 타입을 정의하는 것이 중요합니다.

초기 값 설정이 가능하며 TypeScript가 자동으로 타입을 추론합니다.
  



```js
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// 'ThemeContext'는 다음과 같이 추론됩니다:
// const ThemeContext: React.Context<{
//   theme: string;
//   toggleTheme: () => void;
// }>
```

만약 컨텍스트 타입을 더 엄격하게 보장하고 싶다면, 빈 객체와 타입 어순화를 사용하여 제네릭을 사용할 수 있습니다.

```js
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

// 'ThemeContext'는 이제 'theme'와 'toggleTheme'을 갖는 객체를 엄격하게 요구합니다.
```

## 2.7 useReducer




useReducer은 React에서 상태 관리에 사용되는 훅으로, 여러 하위 값이 관련되거나 다음 상태가 이전 상태에 의존하는 복잡한 상태 논리가 있는 경우 특히 유용합니다. TypeScript는 상태와 액션에 대한 타입을 제공하여 useReducer를 매우 효과적으로 활용할 수 있습니다.

예를 들어, 항목을 추가하거나 제거할 수 있는 쇼핑 카트를 관리하는 경우:

```js
import { useReducer } from "react";

const initialCart = {
  items: [],
  total: 0,
};

// 1. 초기 상태 타입 정의
type CartState = typeof initialCart;

// 2. 액션 타입 정의
type CartActionType =
  | { type: "addItem"; payload: { item: string; price: number } }
  | { type: "removeItem"; payload: { index: number } };

function cartReducer(state: CartState, action: CartActionType) {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        items: [...state.items, action.payload.item],
        total: state.total + action.payload.price,
      };
    case "removeItem":
      const newItems = state.items.filter((_, index) => index !== action.payload.index);
      return {
        ...state,
        items: newItems,
        total: state.total - state.items[action.payload.index].price,
      };
    default:
      throw new Error();
  }
}

const ShoppingCart = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  return (
    <>
      총액: {cart.total}
      <button onClick={() => dispatch({ type: "addItem", payload: { item: 'Apple', price: 1 } })}>
        사과 추가
      </button>
      <button onClick={() => dispatch({ type: "removeItem", payload: { index: 0 } })}>
        항목 제거
      </button>
      {/* 상품 목록 */}
      {cart.items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </>
  );
};

export default ShoppingCart;
```

## 2.8 useEffect / useLayoutEffect



useEffect와 useLayoutEffect은 함수 컴포넌트에서 부작용을 수행하는 데 사용되는 훅입니다. 이들은 componentDidMount, componentDidUpdate 및 componentWillUnmount과 같은 클래스 컴포넌트의 라이프사이클 메서드와 유사합니다. TypeScript에서 이러한 훅에 대한 타입을 명시적으로 정의할 필요가 없는 이유는 이러한 훅이 타입 정의를 필요로 하는 것이 없기 때문입니다.

다음은 API에서 사용자 데이터를 가져와야 하는 애플리케이션에서 useEffect를 사용한 실제 예시입니다:

```js
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("https://api.example.com/user");
      const userData: User = await response.json();
      setUser(userData);
    };

    fetchUserData();
  }, []); // 의존성 배열이 비어 있으면, 이 효과는 componentDidMount와 유사하게 한 번만 실행됩니다.

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
```

# 3. 내장 타입



## 3.1 스타일 속성 유형

React에서 자식 컴포넌트에 인라인 스타일을 전달하려면 React.CSSProperties를 사용할 수 있습니다.

```js
interface Props {
  style?: React.CSSProperties;
}
```

## 3.2 자식 요소 유형



3.2.1 React.ReactNode

JSX에서 렌더링할 수 있는 모든 유형의 연합체입니다. 문자열, 숫자, React 엘리먼트 및 이러한 유형의 배열이 포함됩니다.

```js
interface Props {
  children?: React.ReactNode;
}
```

이 유형을 사용하면 children prop이 JSX에서 렌더링할 수 있는 어떤 유형이든 될 수 있음을 TypeScript에 알리는 것입니다. 매우 유연합니다.



3.2.2 React.ReactElement

이 유형은 문자열이나 숫자와 같은 JavaScript 기본 유형을 제외하고 JSX 요소만 포함합니다. 이는 주로 함수 컴포넌트의 반환 유형을 정의하는 데 사용됩니다.

```js
interface Props {
  children?: React.ReactElement;
}
```

## 3.3 컴포넌트 속성 유형 가져오기



만약 자식 컴포넌트가 인라인으로 props를 정의하고 부모 컴포넌트가 자식의 props 유형을 참조해야 할 경우, React.ComponentProps를 사용하여 자식 컴포넌트의 props 유형을 추론할 수 있습니다.

```js
const ChildComponent = ({ message }: { message: string }) => <div>{message}</div>;

type ChildPropsType = React.ComponentProps<typeof ChildComponent>;

// ChildPropsType는 다음과 같이 추론됩니다:
// type ChildPropsType = {
//   message: string;
// }
```

# 4. 이벤트 처리

## 4.1 이벤트 유형



리액트에서 이벤트를 다룰 때는 이벤트 핸들러 내에서 예상한 속성에 액세스할 수 있도록 올바른 이벤트 유형을 지정하는 것이 중요합니다.

### 4.1.1 onClick 이벤트

버튼 요소에서 마우스 이벤트를 처리할 때, React.MouseEvent에 HTMLButtonElement를 제네릭 매개변수로 전달하세요.

```js
interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
```  



4.1.2 onChange 이벤트

입력 요소에서의 변경 이벤트에 대해 React.ChangeEvent에 HTMLInputElement를 일반적인 매개변수로 전달하십시오.

```js
function App() {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <input value={value} onChange={handleChange} />;
}
```

4.1.3 공통 이벤트 유형



가장 일반적인 몇 가지입니다:

- React.MouseEvent: 클릭이나 마우스 이동과 같은 마우스 이벤트에 사용됩니다.
- React.ChangeEvent: 값이 변경될 때 주로 폼 요소에서 변경 이벤트에 사용됩니다.
- React.KeyboardEvent: 키 입력을 캡처하는 키보드 이벤트에 사용됩니다.
- React.DragEvent: 드래그 앤 드롭 상호작용에 사용됩니다.
- React.FocusEvent: onFocus 및 onBlur와 같은 포커스 관련 이벤트에 사용됩니다.
- React.FormEvent: 관련된 모든 폼 상호작용을 포함하는 폼 이벤트에 사용됩니다.
- React.WheelEvent: 스크롤링과 같은 마우스 휠 이벤트에 사용됩니다.
- React.TouchEvent: 터치 기능 장치에서 터치 이벤트에 사용됩니다.
- React.ClipboardEvent: 복사 및 붙여넣기와 같은 클립보드 이벤트에 사용됩니다.
- React.AnimationEvent: CSS 애니메이션 이벤트에 사용됩니다.
- React.TransitionEvent: CSS 전환 이벤트에 사용됩니다.

4.1.4 HTML 태그 및 유형 매핑

React와 TypeScript를 함께 사용할 때 이벤트를 처리하거나 참조를 만들 때 HTML 태그를 해당 유형으로 매핑하는 것이 중요합니다. 이러한 매핑을 통해 이벤트 핸들러나 참조가 해당 요소에 특정한 속성과 메서드에 액세스할 수 있도록 보장됩니다. TypeScript에서 일반적인 HTML 태그와 해당 유형은 다음과 같습니다:



```js
인터페이스 HTMLElementTagNameMap {
  "a": HTMLAnchorElement;
  "article": HTMLElement;
  "aside": HTMLElement;
  "body": HTMLBodyElement;
  "br": HTMLBRElement;
  "button": HTMLButtonElement;
  "canvas": HTMLCanvasElement;
  "div": HTMLDivElement;
  "dl": HTMLDListElement;
  "dt": HTMLElement;
  "dd": HTMLElement;
  "em": HTMLElement;
  "footer": HTMLElement;
  "form": HTMLFormElement;
  "h1": HTMLHeadingElement;
  "h2": HTMLHeadingElement;
  "h3": HTMLHeadingElement;
  "h4": HTMLHeadingElement;
  "h5": HTMLHeadingElement;
  "h6": HTMLHeadingElement;
  "head": HTMLHeadElement;
  "header": HTMLElement;
  "html": HTMLHtmlElement;
  "iframe": HTMLIFrameElement;
  "img": HTMLImageElement;
  "input": HTMLInputElement;
  "label": HTMLLabelElement;
  "link": HTMLLinkElement;
  "main": HTMLElement;
  "nav": HTMLElement;
  "p": HTMLParagraphElement;
  "picture": HTMLPictureElement;
  "section": HTMLElement;
  "select": HTMLSelectElement;
  "span": HTMLSpanElement;
  "strong": HTMLElement;
  "table": HTMLTableElement;
  "tbody": HTMLTableSectionElement;
  "textarea": HTMLTextAreaElement;
  "tfoot": HTMLTableSectionElement;
  "thead": HTMLTableSectionElement;
  "title": HTMLTitleElement;
  "tr": HTMLTableRowElement;
  "ul": HTMLUListElement;
  "li": HTMLLIElement;
  "video": HTMLVideoElement;
}
```

## 4.2 Event Handler Function Types

React는 이벤트 핸들러 함수 유형을 제공하여 이벤트 핸들러의 타입을 지정할 수 있습니다. 이러한 유형은 요소 유형을 매개변수로 사용할 수 있는 제네릭입니다.

4.2.1 onChange 이벤트




이벤트 유형을 직접 사용하는 것 외에도 React의 이벤트 핸들러 유형을 사용할 수 있습니다. 이전에 언급한 input의 change 이벤트에 대해:

```js
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};
```

React.ChangeEventHandler 유형을 사용하여 다시 작성할 수 있습니다:

```js
const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  setValue(event.target.value);
};
```



이벤트 객체는 자동으로 `React.ChangeEvent<HTMLInputElement>` 유형으로 추론됩니다.

4.2.2 일반 이벤트 핸들러 함수 유형

이벤트의 유형에 따라 React는 사용할 수 있는 다양한 이벤트 핸들러 함수 유형을 제공합니다:

- React.MouseEventHandler: 클릭 또는 마우스 이동과 같은 마우스 이벤트에 대해.
- React.ChangeEventHandler: 값이 변경될 때 주로 폼 요소 내의 변경 이벤트에 대해.
- React.KeyboardEventHandler: 키 누름을 캡처하는 키보드 이벤트에 대해.
- React.DragEventHandler: 드래그 앤드 드롭 상호작용에 대해.
- React.FocusEventHandler: onFocus 및 onBlur와 같은 포커스 관련 이벤트에 대해.
- React.FormEventHandler: 모든 관련 폼 상호작용을 아우르는 폼 이벤트에 대해.
- React.WheelEventHandler: 스크롤링과 같은 마우스 휠 이벤트에 대해.
- React.TouchEventHandler: 터치 기능 장치에서 터치 이벤트에 대해.
- React.ClipboardEventHandler: 복사 및 붙여넣기와 같은 클립보드 이벤트에 대해.
- React.AnimationEventHandler: CSS 애니메이션 이벤트에 대해.
- React.TransitionEventHandler: CSS 전환 이벤트에 대해.



위의 특정 함수 유형을 사용함으로써 이벤트 핸들러가 처리하는 이벤트 유형에 따라 올바르게 입력된 것을 보장하여 타입 안전성을 높이고 이벤트 처리 로직에서 잠재적인 버그를 방지할 수 있습니다.

# 5. 유틸리티 타입

TypeScript는 타입을 쉽게 조작할 수 있도록 도와주는 여러 유틸리티 타입을 제공하며, 수많은 타입을 수동으로 정의할 필요 없이 코드를 유연하고 재사용 가능하게 만들어줍니다.

다음은 일반적으로 사용되는 유틸리티 타입에 대한 간단한 개요입니다:



- Partial`T`: 이 유틸리티 타입은 타입 T를 가져와서 그 모든 속성을 옵션으로 만듭니다. 원본 타입의 모든 속성을 포함하지 않는 객체를 만들고 싶을 때 유용합니다.
- Required`T`: Partial의 반대로, 이 유틸리티 타입은 타입 T를 가져와서 그 모든 속성을 필수로 만듭니다.
- Readonly`T`: 이 유틸리티 타입은 타입 T를 가져와서 그 모든 속성을 읽기 전용으로 만듭니다. 즉, 값이 변경될 수 없습니다.
- Record`K, T`: 이 유틸리티 타입은 타입 T의 일련의 속성 K를 가진 타입을 생성합니다. 고정된 키 집합으로 객체 타입을 만드는 데 유용합니다.
- Pick`T, K`: 이 유틸리티 타입은 타입 T에서 속성 K 집합을 선택하여 타입을 생성합니다.
- Omit`T, K`: 이 유틸리티 타입은 타입 T에서 속성 K 집합을 제외하여 타입을 생성합니다.
- ReturnType`T`: 이 유틸리티 타입은 함수 타입을 가져와서 해당 반환 타입을 생성합니다.
- InstanceType`T`: 이 유틸리티 타입은 생성자 함수 타입을 가져와서 해당 생성자에 의해 만들어진 인스턴스의 타입을 생성합니다.

더 자세한 정보를 원하시면 이전의 기사를 참고해주세요:

# 결론

요약하면, TypeScript는 React 개발 경험을 향상시키는 강력한 기능 세트를 제공합니다. 엄격한 타입을 사용하여 컴포넌트의 속성과 상태를 정의하고 이벤트를 처리하며 유틸리티 제너릭을 활용하면 TypeScript는 코드 신뢰성과 유지 관리성을 보장합니다. 이 개념을 숙지하면 개발자는 더 예측 가능하고 오류에 강한 응용 프로그램을 만들 수 있습니다. TypeScript의 다양한 타입 및 유틸리티를 탐험하여 버그를 줄이고 팀원 간 협업을 개선할 수 있습니다. 즐거운 코딩 하세요!



# 친절하게 말해보자 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수로 격려하고 팔로우하세요 ️👏️️
- 팔로우해요: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루도록 강요하는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요