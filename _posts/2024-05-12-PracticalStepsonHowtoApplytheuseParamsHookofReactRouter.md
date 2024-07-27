---
title: "React Router의 useParams 훅을 적용하는 실용적인 단계"
description: ""
coverImage: "/assets/img/2024-05-12-PracticalStepsonHowtoApplytheuseParamsHookofReactRouter_0.png"
date: 2024-05-12 22:03
ogImage: 
  url: /assets/img/2024-05-12-PracticalStepsonHowtoApplytheuseParamsHookofReactRouter_0.png
tag: Tech
originalTitle: "Practical Steps on How to Apply the useParams() Hook of React Router"
link: "https://medium.com/stackademic/practical-steps-on-how-to-apply-the-useparams-hook-of-react-router-5cd43a2106b2"
---


![이미지](/assets/img/2024-05-12-PracticalStepsonHowtoApplytheuseParamsHookofReactRouter_0.png)

useParams 훅은 React에서 친숙한 사용자 인터페이스를 개발하는 데 필수적입니다. 따라서 React 개발자가 익숙해져야 할 중요한 지식입니다. useParams 훅을 사용하면 전자 상거래 및 블로깅 웹 사이트와 같은 다중 매개변수를 가진 복잡한 React 인터페이스를 개발할 수 있습니다.

이 튜토리얼은 React 애플리케이션에서 useParams 훅을 적용하는 방법에 대한 실용적인 단계와 지식을 제공하는 데 초점을 맞춥니다. 이 튜토리얼에서는 다음 주제를 다룰 것입니다:

1. useParams 훅이란 무엇인가요?



2. `useParams` 훅을 적용하기 위한 요구 사항

3. `useParams` 훅을 사용하는 장점

4. `useParams` 훅을 적용하는 실제적인 단계

# 전제 조건:



이것은 React와 React-router의 useParams 훅을 배우고 적용하는 것에 관심 있는 초보자를 위한 친절한 튜토리얼입니다. 이 튜토리얼에서 최대한 많은 도움을 받으려면 몇 가지 기본적인 React와 JavaScript 도구에 익숙해져야 합니다. 이러한 도구로는 다음이 포함됩니다:

- React Routing,
- Map 함수, 그리고
- 구조 분해.

또한 HTML 및 CSS에 익숙해져 있어야 합니다. 따라서 이 튜토리얼을 진행하기 전에 위의 개념들을 먼저 익히는 것을 권장합니다.

# useParams 훅이란 무엇인가요?



`useParams` 훅은 웹사이트의 여러 매개변수를 생성하고 액세스하는 데 사용되는 React 라우터 훅입니다. 본질적으로 `useParams` 훅은 동일한 URL 경로에서 여러 콘텐츠에 액세스할 수 있도록 해줍니다. `useParams` 훅을 통해 각 매개변수에 고유한 식별자를 부여할 수 있습니다. 이 고유한 식별자를 통해 동일한 URL 경로에서 각 매개변수에 액세스하고 렌더링할 수 있습니다.

전자 상거래 및 블로그 앱은 여러 매개변수가 있는 애플리케이션의 예시입니다. `useParams` 훅이 적용되는 다른 예시로는 학습 관리 시스템(LMS) – 즉, 온라인 튜토리얼 사이트, 웹사이트의 검색 버튼, 기사/신문 웹사이트 등이 있습니다.

예를 들어, 블로그 앱에는 여러 블로그가 포함되어 있습니다. 각 블로그에는 고유한 ID가 있어서 각 블로그에 접근할 수 있습니다.

# `useParams` 훅을 적용하는 요구 사항



React 앱에서 useParams 훅을 적용하려면 몇 가지 기본 도구와 라이브러리가 필요합니다. 이 섹션에서는 이러한 기본 요구 사항을 살펴볼 것입니다.

## 1. React-router-dom

react-router-dom은 React 애플리케이션에서 라우팅을 제공하는 외부 React 라이브러리입니다. react-router-dom에는 useParams 훅이 함께 제공됩니다. 따라서 useParams 훅을 적용하려면 react-router-dom을 React 앱에 설치해야 합니다. 아래 섹션에서는 react-router-dom을 설치하는 방법을 안내합니다.

## 2. Component



컴포넌트는 HTML 요소를 반환하는 JavaScript 코드 집합입니다. React의 컴포넌트는 브라우저에 표시할 내용을 결정합니다.

useParams 훅을 적용하려면 컴포넌트를 만들고 해당 컴포넌트로 useParams를 가져와야 합니다. 그런 다음 객체 비구조화를 사용하여 useParams 메서드에 변수를 할당하세요. 아래 코드 예시를 참고하세요.

```js
import { useParams } from 'react-router-dom';

function Blog(){
  let { blogid } = useParams();
  return<p>내 고유 ID는 {blogid}입니다.</p>
}
```

### 3. Route 태그



Route 태그는 브라우저의 URL 경로를 나타냅니다. Route 태그는 두 가지 속성을 받습니다. path 속성과 element 속성이 포함되어 있습니다. path 속성은 URL 경로에 할당됩니다. element 속성은 렌더링할 컴포넌트에 할당됩니다.

useParams 훅을 적용하려면 path 속성에도 자리 표시자가 포함되어야 합니다. 자리 표시자의 역할은 해당 값을 기반으로 동적 콘텐츠를 반환하는 것입니다. 아래 예제를 참조해보세요.

```js
<Routes>
    <Route path='/blog/:blogid' element={<Blog />}></Route>
</Routes>
```

다음 사항을 주의하십시오:



- blogid은 플레이스홀더이며 임의의 이름을 사용할 수 있습니다.
- 일반적으로 플레이스홀더는 값 이전에 `:`를 포함합니다.
- 플레이스홀더 이름은 컴포넌트의 useParams 메서드에 할당된 값과 일치해야 합니다.
- 따라서 URL 경로인 /blog/2는 id 번호가 2인 블로그 콘텐츠를 반환합니다.

# useParams 훅을 사용하는 장점

useParams 훅을 사용하는 것은 React 개발자와 사용자 양쪽에 많은 이점이 있습니다. useParams 훅을 사용하는 장점 중 일부는 다음과 같습니다.

- 다중 매개변수: useParams 훅은 동적 콘텐츠를 포함하는 여러 매개변수를 만드는 데 사용됩니다. 따라서 응용 프로그램에서 useParams 훅을 사용하면 사용자에게 친숙한 방식으로 다양한 정보를 제공할 수 있습니다.
- 앱 성능 향상: useParams 훅은 동적 콘텐츠를 동일한 URL 경로에 렌더링합니다. 이는 앱의 성능을 향상시키고로딩 시간을 줄입니다.
- 쉬운 접근성: useParams 훅은 사용자 친화적인 도구로, 다중 매개변수와 콘텐츠에 쉽게 접근할 수 있습니다.
- 더 적은 코드: useParams 훅을 사용하면 몇 줄의 코드로 여러 매개변수를 만들 수 있습니다. 결국, 이는 불필요한 반복을 제거하고 작성해야 하는 코드 양을 줄여줍니다.



# React에서 useParams 훅을 적용하는 실용적인 단계

이 섹션에서는 여러 제품을 표시하는 간단한 전자 상거래 인터페이스를 구축하는 방법을 살펴볼 것입니다. 각 제품은 고유한 ID를 갖고 있어 해당 ID를 통해 액세스할 수 있습니다.

이 섹션은 세 부분으로 나뉘어집니다.

- 첫 번째 부분에서는 React 앱을 만드는 방법을 안내합니다.
- 두 번째 부분에서는 간단한 전자 상거래 인터페이스를 만드는 방법을 안내합니다.
- 세 번째 부분에서는 프로젝트에서 useParams 훅을 적용하는 방법을 안내합니다.



시작해 봅시다.

# 첫 번째 부분 — React 프로젝트 생성

아래 단계는 React 앱을 생성하고 react-router-dom을 설치하는 데 도움이 됩니다.

## 단계 1: React 앱 생성



React 앱을 만들려면 아래 지시사항을 따라주세요.

- 터미널을 열고 React 앱을 위한 새 폴더를 만드세요.
- 새롭게 만든 폴더로 이동한 후 React 앱을 만드세요. 아래 명령어 중 하나를 사용하세요.

```js
C:\Users\Username\Desktop>mkdir react-app
C:\Users\Username\Desktop>cd react-folder
C:\Users\Username\Desktop\react-folder>npx create-react-app my-app
```



```js
C:\Users\Username\Desktop\react-folder>npm init react-app my-app
```

또는

```js
C:\Users\Username\Desktop\react-folder>yarn create react-app my-app
```

다음 사항을 주의하십시오:



- 리액트 앱을 만들기 전에 시스템에 node.js가 설치되어 있어야 합니다. 시스템에 node.js가 없는 경우 https://node.js.org를 방문하여 설치하세요.
- react-app과 my-app은 각각 폴더와 리액트 앱의 이름입니다. 이름은 원하는 대로 지정할 수 있습니다.

## 단계 2: React-router-dom 설치

아래 지시 사항은 우리의 리액트 프로젝트에 React-router-dom을 설치하는 방법을 안내합니다.

- 터미널에서 앱 디렉토리로 이동합니다.
- npm이나 yarn을 사용하여 react-router-dom을 설치하세요.



아래의 코드 예시를 확인해보세요.

```js
C:\Users\사용자명\Desktop\react-folder>cd my-app
C:\Users\사용자명\Desktop\react-folder\my-app>npm install react-router-dom
```

## 단계 3: 서버 시작

여전히 앱 디렉토리 안에 있는 경우, 아래의 코드와 같이 React 앱 서버를 시작하세요.



```js
C:\Users\사용자명\Desktop\react-folder\my-app>npm start
```

Yarn 사용자:

```js
C:\Users\사용자명\Desktop\react-folder\my-app>yarn start
```

참고: React 앱을 만들 때 사용하는 npm 또는 yarn을 사용하여 React 종속성을 설치하고 React 스크립트를 실행하세요. 원하는 방법에 따라 npm이나 yarn을 사용하세요.



시작 스크립트는 로컬호스트 3000번 포트에서 React 앱 서버를 실행합니다.

# 두 번째 파트 — 간단한 전자 상거래 인터페이스 설정

우리는 React 앱을 성공적으로 생성하고 react-router-dom을 설치했습니다. 이제 간단한 전자 상거래 인터페이스를 만들어볼 수 있습니다.

## 단계 1: index.js 파일 수정



React 앱을 선택한 코드 편집기로 열고 아래 지침을 따라 index.js 파일을 수정하십시오.

- src 디렉토리에서 index.js 파일을 엽니다.
- 객체 비구조화를 사용하여 react-router-dom에서 BrowserRouter를 가져옵니다.
- App 컴포넌트를 BrowserRouter 태그로 둘러싸는 방식으로 root const를 업데이트합니다.

최종 index.js 파일의 코드는 아래 예시와 같이 보여야 합니다.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```



## 단계 2: 제품 컴포넌트 만들기

이 컴포넌트는 제품 데이터를 보유할 것입니다. 하지만 제품 컴포넌트를 만들기 전에 먼저 src 디렉토리에 이미지 폴더를 생성하세요. 이미지 폴더에는 사용할 모든 필요한 이미지가 포함되어야 합니다. 그리고 아래 지침을 따라 제품 컴포넌트를 만드세요.

- src 디렉토리에 components 폴더를 생성하세요.
- components 폴더에 Products.js 파일을 만드세요.
- Products.js 파일을 열고 Products 변수를 만드세요.
- Products 변수를 객체 배열에 할당하세요. 각 객체는 고유한 id, 타이틀, 설명, 이미지를 포함해야 합니다.
- Products 컴포넌트를 내보내세요.

아래 코드 예시를 참고하세요.



```js
const Products = [
    {
        id: 1,
        title: "제품 이름",
        description: "이것은 id가 1인 상품의 설명입니다. Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur. ",
        image: require('../images/product-1.png')
    },
    {
        id: 2,
        title: "제품 이름",
        description: "이것은 id가 2인 상품의 설명입니다. Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur. ",
        image: require('../images/product-2.png')
    },
    {
        id: 3,
        title: "제품 이름",
        description: "이것은 id가 3인 상품의 설명입니다. Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur. ",
        image: require('../images/product-3.png')
    }
]

export default Products;
```

## Step 3: 카드 컴포넌트 생성

카드 컴포넌트의 본질은 제품들을 순회하고 조직적인 방식으로 렌더링하는 것입니다. 다음 지침은 카드 컴포넌트를 만드는 방법을 안내합니다.

- components 디렉토리에 Card.js 파일을 생성합니다.
- Card.js 파일을 열고 Products 컴포넌트를 import합니다.
- return 메소드를 가진 Card 함수를 생성합니다.
- 카드 함수 내에 return 메소드 전에 productItems 변수를 생성합니다.
- productItems 변수를 우리 Products를 순회하는 map 함수에 할당합니다. map 함수는 아래 코드 예시와 같아야 합니다.




```js
const productItems = Products.map(store =>{
    const {id, title, description, image} = store;
    return(
      <div key={ id } className="card">
        <img src={image} alt=""></img>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    )
})
```

6. Card 함수의 return 메소드 안에 section 태그를 생성하세요. section 태그 사이에는 중괄호 안에 productItems가 들어가야 합니다.

7. Card 컴포넌트를 export하세요.

Card.js 파일의 최종 코드는 아래의 코드 예시와 같을 것입니다.



```js
import Products from "./Products";

function Card(){

    const productItems = Products.map(store =>{
        const {id, title, description, image} = store;
        return(
            <div key={ id } className="card">
                <img src={image} alt=""></img>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        )
    })

    return (
        <>
            <section className="card-section">
                {productItems}
            </section>
        </>
    );
};

export default Card;
```

## 단계 4: 카드 컴포넌트 스타일링

index.css 파일에 Card 컴포넌트에 CSS 스타일을 추가하십시오.

참고: Card 컴포넌트 내부의 div 태그와 section 태그에는 className 속성이 포함되어 있습니다. 이 className 속성은 목적에 맞게 CSS 스타일링을 위해 만들어졌습니다.



src 폴더 내의 index.css 파일을 열고 아래 CSS 스타일을 적용하세요.

```js
.card-section{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 40px;
}

.card{
  padding: 1.2rem;
  font-size: 1.2rem;
  border: 1px solid rgb(104, 101, 101);
}
```

## 단계 5: 홈 페이지 만들기

홈 페이지는 앱의 기본 페이지로 사용되며 카드 컴포넌트를 렌더링할 것입니다. 아래 안내 사항을 따라 홈 페이지를 만들어 보세요.



- src 디렉토리에 페이지 폴더를 생성하세요.
- 페이지 폴더 안에 Home.js 파일을 만들어주세요.
- Home.js 파일을 열고 Card 컴포넌트를 import 해주세요.
- return 메소드를 포함하는 Home 함수를 생성해주세요. return 메소드는 Card 요소를 포함해야 합니다.
- Home.js 파일을 export 해주세요.

아래 코드를 참조해주세요.

```js
import Card from "../components/Card"

function Home(){
    return (
        <>
            <h1>Home Page</h1>
            <Card />
        </>
    )
}

export default Home;
```

## 단계 6: App.js 파일 수정하기



App.js 파일은 브라우저에 무엇을 렌더링할지를 결정하는 루트 컴포넌트입니다. 이 단계에서는 App.js 파일을 수정하여 페이지를 렌더링하겠습니다. 아래 지시사항을 따라 App.js 컴포넌트를 수정해봅시다.

- App.js 파일을 열고 Home 컴포넌트를 import 합니다.
- App.js 파일의 return 메서드를 아래 코드에서와 같이 Home 엘리먼트를 포함하도록 업데이트합니다.

```js
import React from 'react';
import './App.css';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
```

모든 파일을 저장하고 브라우저에서 localhost:3000 으로 이동해보세요. 결과는 아래 스크린샷과 같을 것입니다.



<img src="/assets/img/2024-05-12-PracticalStepsonHowtoApplytheuseParamsHookofReactRouter_1.png" />

저희 이커머스 인터페이스를 만드는 데 정말 멋진 작업을 했네요. 하지만 아직 해야 할 작업이 많습니다. 예를 들어, 제품 설명은 더 적은 단어로 작성되어야 하며 각 카드에 제품별로 이동할 수 있는 링크가 있어야 합니다. 그래서 useParams 훅을 적용할 것입니다.

# 세 번째 부분 — useParams 훅 적용하기

useParams 훅을 사용하면 각 제품에 대한 고유 ID를 통해 액세스 권한을 갖는 친숙한 인터페이스를 만들 수 있습니다. useParams 훅은 React-router-dom 패키지와 함께 제공됩니다. 따라서 우리는 이를 적용하기 전에 react-router-dom에서 useParams 훅을 가져와야 합니다. 시작해봅시다.



## 단계 1: 제품 상세 페이지 만들기

제품 상세 페이지는 각 제품의 고유 ID에 따라 완전한 세부 정보를 포함하고 렌더링할 것입니다. 아래 지침은 제품 상세 페이지를 만드는 데 도움이 됩니다.

- 페이지 폴더에 ProductDetail.js 파일을 만듭니다.
- ProductDetail.js 파일을 열고 다음 내용을 가져옵니다:

- component 폴더에서 Products 컴포넌트
- 객체 비구조화를 사용하여 react-router-dom에서 useParams.



3. return 메소드가 있는 ProductDetail 함수를 생성하세요.

4. ProductDetail 함수 내에서 return 메소드 이전에 useParams 메소드에 `id` 를 할당하세요. 아래 코드 예시를 참고해보세요.

```js
let { id } = useParams()
```

5. product 변수를 생성하고 find 메소드에 할당하세요. 예시:



```js
const product = Products.find(product => String(product.id) === id);
```

여기서 find 메서드를 사용하여 각 제품의 id를 일치시켜 제품의 다른 세부 정보에 액세스할 수 있습니다.

6. ProductDetails 함수의 return 메서드에서 섹션 태그를 만드세요. 섹션 태그는 중괄호 안에 id에 할당된 키 속성을 포함해야 합니다.

7. 코드 아래처럼 다른 태그를 만드세요.



8. ProductDetail.js 파일을 내보내기하세요.

ProductDetail.js 파일의 최종 코드는 아래 예시 코드와 같이 될 것입니다.

```js
import { useParams } from "react-router-dom";
import Products from "../components/Products";

function ProductDetail() {
 
   let { id } = useParams();
    const product = Products.find(product => String(product.id) === id);

    return (
        <>
            <section key={id} className="details-section">
                <img src={product.image} alt=""></img>
                <div>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                </div>
            </section>
       </>
    )
}

export default ProductDetail;
```

## 단계 2: productDetail 페이지 스타일링




```css
.details-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin: 90px;
  font-size: 1.3rem;
}
```

## 단계 3: 라우트 생성

라우트는 URL 경로로 콘텐츠에 액세스하는 것을 안내합니다. App.js 파일에 모든 필요한 라우트를 생성할 것입니다. 아래 지침은 라우트를 생성하는 데 도움이 됩니다.



- App.js 파일을 열고 다음을 가져와주세요:
  - 페이지 폴더에서 ProductDetail,
  - react-router-dom에서 Routes 및 Route.

- App.js 함수의 반환 방법을 다음과 같이 업데이트하세요:
  1. Routes 태그를 만드세요.
  2. Routes 태그 사이에 두 개의 Route 태그를 생성하세요. Routes와 Route의 차이를 알아두어 혼동하지 않도록 주의하세요.
  3. 각 Route 태그에는 path와 element 속성이 포함되어야 합니다.

아래 코드 예시를 참고하세요.

```js
import React from 'react';
import './App.css';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (

    <div className="App">

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product/:id' element={<ProductDetails />}></Route>
      </Routes>

    </div>

  );
}

export default App;
```

주의할 점:



- 첫 번째 Route 경로는 `/`에 할당되어 있으며, 기본 URL 경로를 나타냅니다. 기본 URL 경로는 Home 컴포넌트를 표시합니다.
- 두 번째 Route 경로는 product로 할당되어 있으며, 플레이스홀더 :id를 가지고 있습니다.

## 단계 4: card.js 컴포넌트 수정

아래 지침은 card 컴포넌트를 수정하는 방법을 안내합니다.

- Card.js 파일을 열고 react-router-dom에서 Link를 import합니다.
- card 컴포넌트의 return 메소드 안에 p 태그 사이에 Link 태그를 삽입합니다. Link 태그는 to 속성을 포함해야 합니다. 아래 코드 예시를 참고하세요.



```js
<Link to={`/product/${id}`}>자세히 보기</Link>
```

우리 `to` 속성의 값은 backtick (` )과 템플릿 리터럴 ( `$''` )을 사용하여 id의 값을 포함합니다. 각 매개변수의 URL 경로에 접근하는 표준 방법입니다.

3. 슬라이스(Slice) 메서드를 사용하여 설명 단어를 줄입니다.

최종 카드 컴포넌트 코드는 아래의 코드 예시와 같이 되어야 합니다.



```js
import { Link } from "react-router-dom";
import Products from "./Products";

const Card = () => {

   const productItems = Products.map(store =>{
        const {id, title, description, image} = store;
        return(
            <div key={ id } className="card">
                <img src={image} alt=""></img>
                <h3>{title}</h3>
                <p>{description.slice(0, 100)}<Link to={`/product/${id}`}>더 보기</Link></p>
            </div>
        )
    })

    return (
        <>
            <section className="card-section">
                {productItems}
            </section>
        </>
    );
};

export default Card;
```

모든 파일을 저장하고 브라우저로 이동하세요. 아래의 gif 이미지는 프로젝트 결과물을 보여줍니다. 이제 각 제품은 고유한 ID를 통해 액세스할 수 있습니다.

<img src="https://miro.medium.com/v2/resize:fit:1380/0*_YFGAyjrfYyg-Q7b.gif" />

# 결론



이 문서는 useParams 훅에 대한 포괄적인 지식을 제공합니다. useParams 훅은 여러 매개변수가 필요한 React 애플리케이션을 만드는 데 필수적입니다. 따라서 사용자 친화적인 방식으로 각 매개변수에 쉽게 액세스할 수 있습니다.

독서해 주셔서 감사합니다. 이 튜토리얼이 유용하게 활용되기를 바랍니다.

# 추가 자료

- React Router: useParams() 훅 사용법
- React Router에서 useParams 훅 사용 방법



감사합니다. 끝까지 읽어주셔서 감사합니다. 저와 이 출판물을 팔로우해 주시기를 고려해 주세요. 전 세계적으로 무료 프로그래밍 교육을 더 democrazing 하고 있는 Stackademic을 방문하여 더 많은 정보를 얻어보세요.