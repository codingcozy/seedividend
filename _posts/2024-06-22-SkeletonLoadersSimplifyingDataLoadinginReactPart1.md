---
title: "Skeleton Loaders React 데이터 로딩 쉽게 하기 - 1부"
description: ""
coverImage: "/assets/img/2024-06-22-SkeletonLoadersSimplifyingDataLoadinginReactPart1_0.png"
date: 2024-06-22 02:58
ogImage:
  url: /assets/img/2024-06-22-SkeletonLoadersSimplifyingDataLoadinginReactPart1_0.png
tag: Tech
originalTitle: "Skeleton Loaders: Simplifying Data Loading in React: Part 1"
link: "https://medium.com/@topeogunleye1/skeleton-loaders-simplifying-data-loading-in-react-part-1-945f50b4d2fd"
isUpdated: true
---

![이미지](/assets/img/2024-06-22-SkeletonLoadersSimplifyingDataLoadinginReactPart1_0.png)

# 파트 원: 우리의 리액트 앱 만들기

이 두 파트 시리즈에 오신 것을 환영합니다. 우리는 Skeleton Loaders에 대해 살펴보며 React에서 데이터 로딩을 간소화하는 방법에 대해 알아볼 것입니다. 첫 번째 파트에서는 새로운, 현대적인 React 애플리케이션을 처음부터 설정할 것입니다. 그런 다음 일부 데이터를 가져와 스타일링을 추가할 것입니다.

## Skeleton Loading 화면의 파워를 이해하기

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

대부분의 최신 웹 사이트는 데이터를 서버 측이 아닌 브라우저에서 가져옵니다. 사용자가 콘텐츠를 서버에서로드하기까지 기다릴 필요가 없어서 이는 장점이 될 수 있었지만, 그러면 브라우저에서 데이터를 가져와야 하므로 기다려야 하는 상황이 발생했습니다. 이 데이터 가져오기 이벤트를 처리하고 사용자가 애플리케이션 또는 웹 사이트와 상호 작용하도록 유지하기 위해 일반적으로 어떤 종류의 로더나 스피너가 표시됩니다. 매우 실용적이고 점점 일반적인 접근 방법은 스켈레톤 로딩 화면을 사용하는 것입니다. 이는 콘텐츠의 레이아웃을 반영하는 플레이스홀더 요소를 추가하여 들어오는 데이터를 나타냅니다. Facebook 및 LinkedIn과 같은 주요 웹 사이트에서 사용되는 스켈레톤 로딩 화면은 이 상황에 대한 해결책입니다.

전제 조건

- React의 기본 지식.
- React Hooks에 익숙함.

# 프로젝트 설정하기

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

먼저 새로운 리액트 애플리케이션을 생성하세요:

```js
npx create-react-app react-skeleton-screens
```

프로젝트 디렉토리로 이동하세요:

```js
cd react-skeleton-screens
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

Visual Studio Code에서 프로젝트를 열어보세요:

```js
code .
```

## 보일러플레이트 코드 제거

create-react-app으로 생성된 기본 파일들을 정리해보세요.

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

- `src` 폴더를 열어서 다음 파일들을 삭제해주세요:
  — App.css
  — App.test.js
  — logo.svg
  — setupTests.js

2. index.js 파일 내에서 service worker의 import 및 호출을 제거해주세요.

3. App.js 파일 내에서 logo.svg와 App.css의 import를 제거해주세요.

`App.js`에 다음 코드를 넣어주세요:

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
import React from "react";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <header>
        <h1>식단 레시피</h1>
      </header>
      <div className="content">
        <Home />
      </div>
    </div>
  );
}
export default App;
```

## 컴포넌트 생성

src 폴더 안에 components라는 새 폴더를 만들어주세요. 이 폴더 안에 Home.jsx 파일을 만들어주세요:

```js
import React from "react";
const Home = () => {
  return <div className="home"></div>;
};
export default Home;
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

## 애플리케이션에 스타일 추가하기

우리 애플리케이션의 외관을 개선하기 위해 App.js의 헤더에 일부 스타일을 적용할 거에요.

index.css 업데이트

`index.css`의 내용을 다음 스타일로 대체해 주세요:

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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header {
  font-size: 1.5rem;
  font-weight: 900;
  display: grid;
  align-items: center;
}
header h1 {
  max-width: 1200px;
  margin: 0 auto;
}
.container {
  background-color: #6b7280;
  color: #ffffff;
  min-height: 100vh;
  transition: all 1s ease-out;
}
.meals {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 1.25rem;
  transition: all 1s ease-out;
  padding: 10px 50px;
}
@media (min-width: 640px) {
  .meals {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 768px) {
  .meals {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1280px) {
  .meals {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
.meal {
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  position: relative;
  height: 15rem;
  width: 15rem;
}
.meal-img:hover {
  box-shadow: 0 10px 15px -3px rgba(147, 102, 102, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 1s ease-out;
}
.meal-img {
  width: 100%;
  height: 100%;
  border: solid 4px #ffffff;
}
```

이 스타일은 애플리케이션 헤더가 깔끔하고 시각적으로 매력적으로 보이도록 보장합니다.

## 애플리케이션 실행하기

변경 사항을 확인하려면 개발 서버를 시작하세요:

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
yarn dev
```

브라우저에서 http://localhost:3000 으로 이동하여 새로운 스타일이 적용된 업데이트된 페이지를 확인할 수 있어요.

데이터 가져오기

MealDB API(https://www.themealdb.com/api.php)를 사용하여 데이터를 가져올 거에요.

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

App.js에서 데이터를 저장할 상태를 생성해보세요:

```js
const [meals, setMeals] = useState(null);
```

컴포넌트가 렌더링될 때 데이터를 가져오기 위해 useEffect 훅을 사용해보세요:

```js
import { useState, useEffect } from "react";
import Home from "./components/Home";
function App() {
  const [meals, setMeals] = useState(null);
  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");
      const data = await res.json();
      setMeals(data);
    }, 5000);
  }, []);
  return (
    <div className="App">
      <header>
        <h1>Meal Recipes</h1>
      </header>
      <div className="content">
        <Home meals={meals} />
      </div>
    </div>
  );
}
export default App;
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

Home.js 파일에서 조건부 렌더링을 사용하여 식사 레시피 결과를 표시하십시오:

```js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [meals, setMeals] = useState(null);
  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");
      const meals = await res.json();
      setMeals(meals);
    }, 5000);
  }, []);
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="m-auto max-w-3xl flex flex-col items-center justify-center text-center">
        <div id="meals" className="meals">
          {meals &&
            meals.meals.map((meal) => (
              <div className="meal" key={meal.idMeal}>
                <Link to={`/MealInfo/${meal.idMeal}`}>
                  <img className="meal-img" src={meal.strMealThumb} alt={meal.strMeal} />
                  <div className="meal-info" data-mealid={meal.idMeal}>
                    <h3>{meal.strMeal}</h3>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
```

## React Router 추가

react-router-dom 설치하기:

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
npm install react-router-dom
```

react-router-dom에서 BrowserRouter을 사용하여 main.js에 App을 감싸세요:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

## 결론

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

이번 시리즈의 첫 번째 파트에서는 리액트 애플리케이션에 스켈레톤 로딩 화면을 구현하는 기초 작업을 마무리지었습니다. 기본적인 React 프로젝트를 설정하고 컴포넌트를 생성하며, 스타일을 추가하고 API에서 데이터를 가져오면서 우리는 애플리케이션에 스켈레톤 로딩 화면을 통합할 기초를 마련했습니다.

두 번째 파트에서는 스켈레톤 로딩 화면의 구현 세부사항에 더 깊이 파고들 것입니다. 재사용 가능한 스켈레톤 컴포넌트를 생성하는 방법, 로딩 애니메이션을 사용자 정의하는 방법, 그리고 다양한 로딩 시나리오를 효율적으로 처리하는 방법을 살펴볼 것입니다. PART 2로 이동하여 스켈레톤 로딩 화면을 더 발전시키는 방법을 확인해보세요!
