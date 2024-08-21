---
title: "실력이 늘고싶다면 바꿔야하는 나쁜 React 습관 9가지"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "9 Bad React Habits to Avoid in Your Daily Work"
link: "https://medium.com/javascript-in-plain-english/9-bad-react-habits-to-avoid-in-your-daily-work-2151f804a3d8"
isUpdated: true
---

<img src="https://miro.medium.com/v2/resize:fit:1200/0*tJn1_UxyRe9tN0Q5.gif" />

# 서문

React는 프론트엔드 개발 세계에서 가장 인기 있는 JavaScript 라이브러리 중 하나입니다. 하지만 때로는 React를 사용하면서 애플리케이션을 작성하는 동안 일부 나쁜 습관과 잘못된 관행에 빠질 수 있습니다. 이러한 부정적인 습관은 성능 저하, 유지보수가 어려운 코드 및 기타 문제로 이어질 수 있습니다. 이 글에서는 일상적인 업무에서 피해야 할 9가지 나쁜 습관을 살펴보고, 이러한 문제를 설명하고 이를 피하는 방법을 보여주는 관련 샘플 코드를 제시할 것입니다.

1. 속성 전달 문제 (Prop Drilling)

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

부모 구성 요소에 불필요하게 네스트된 하위 구성 요소로 속성을 전달하는 것은 일반적인 나쁜 버릇입니다. 이는 성능 문제와 코드 가독성 저하로 이어질 수 있습니다. 이상적으로, 2단계 이상으로 속성을 전달하는 것은 피해야 합니다. 아래는 예시입니다:

```js
// 부모 구성 요소
function ParentComponent() {
  const data = "일부 데이터";
  return <ChildComponent data={data} />;
}
// 하위 구성 요소
function ChildComponent({ data }) {
  return <GrandchildComponent data={data} />;
}
// 손자 구성 요소
function GrandchildComponent({ data }) {
  // 데이터 사용
  return <div>{data}</div>;
}
```

위의 예시에서 데이터 속성이 여러 중첩 수준을 통해 전달되며, 이는 성능 문제와 가독성 문제를 일으킬 수 있습니다. 이 문제를 해결하는 한 가지 방법은 React context(컨텍스트)를 사용하여 데이터를 공유하거나 구성 요소 구조를 재조정하는 것입니다.

2. 필요한 컨텐츠를 지나치게 가져오는 경우

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

React 어플리케이션에서 너무 많은 종속성을 가져오면 패키지가 무거워져서 로드 시간이 길어질 수 있습니다. 일상적인 작업에서 필요한 종속성만 가져오도록 하세요. 예를 들어 전체 라이브러리를 가져오지 말고 필요한 기능만 가져오는 것이 좋습니다.

```js
// 안좋은 예 - 전체 라이브러리 가져오기
import _ from "lodash";

// 좋은 예 - 필요한 함수만 가져오기
import { someFunction } from "lodash";
```

이렇게 하면 데이터 크기가 줄어들고 애플리케이션 성능이 향상됩니다.

3. 비즈니스 로직과 컴포넌트 로직 분리하지 않기

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

리액트에서는 코드의 가독성과 유지 관리성을 향상시키기 위해 비즈니스 로직과 UI 컴포넌트 로직을 분리하려고 노력해보세요. 컴포넌트를 간단하게 유지하기 위해 비즈니스 로직을 별도의 서비스 파일이나 모듈로 추출하세요. 다음은 예시입니다:

```js
// 나쁜 예 - 비즈니스 로직이 컴포넌트에 섞여 있는 경우
function UserProfile() {
  const user = getUserData(); // API에서 사용자 데이터 가져오기
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
// 좋은 예 - 비즈니스 로직 분리
function UserProfile() {
  const user = useUserData(); // 독립적인 서비스에서 사용자 데이터 가져오기
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

4. 각 렌더링마다 작업을 반복하지 않기

리액트 컴포넌트는 다양한 시기에 다시 렌더링될 수 있으며, 신중하지 않다면 일부 작업이 각 렌더링마다 반복되어 성능이 저하될 수 있습니다. 이를 피하기 위해 useMemo와 useCallback을 사용하여 작업을 메모이제이션하여 각 렌더링마다 재계산되지 않도록 할 수 있습니다. 다음은 예시입니다:

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
function List({ items }) {
  // useMemo를 사용하지 않으면 필터링이 매 렌더링마다 다시 필터링됩니다
  const filteredItems = items.filter((item) => item.active);

  // useMemo를 사용할 때는 items가 변경될 때만 다시 필터링됩니다
  const filteredItems = useMemo(() => items.filter((item) => item.active), [items]);
}
```

5. useEffect 훅의 부적절한 사용

useEffect 훅은 사이드 이펙트를 처리하는 데 사용됩니다. 그러나 부적절하게 사용하면 여러 이벤트 리스너가 생성되어 문제를 일으킬 수 있습니다. 올바른 useEffect 방법에는 클린업 함수를 반환하여 구독 해지 및 한 번만 실행되도록 빈 의존성 배열을 사용하는 방법이 포함됩니다. 예시는 다음과 같습니다:

```js
// 잘못된 예 - 매 렌더링마다 새 이벤트 리스너가 생성됩니다
useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
});

// 좋은 예 - 컴포넌트가 마운트될 때만 이벤트 리스너가 생성됩니다
useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []); // 빈 의존성 배열
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

빈 종속성 배열을 사용하여 컴포넌트가 마운트될 때 이벤트 리스너가 한 번만 만들어진다는 것을 보장합니다.

6. 부정확한 불리언 연산자의 사용

React 컴포넌트에서는 종종 조건에 따라 다른 콘텐츠를 렌더링해야 할 필요가 있습니다. 그러나 잘못된 불리언 연산자의 사용은 예기치 않은 문제를 일으킬 수 있습니다. 예를 들어:

```js
// 나쁜 예 - && 연산자 사용
function ShoppingCart({ items }) {
  return <div>{items.length && <p>장바구니에 있는 항목 수: {items.length}</p>}</div>;
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

위 예제에서는 요소가 렌더링 되지 않습니다. 이 상황은 원하는 결과가 아닐 수 있습니다. 이를 피하기 위해서는 조건을 불리언 값으로 변환하는 것이 더 좋습니다.

```js
// 좋은 예 - 조건을 불리언 값으로 변환하기
function ShoppingCart({ items }) {
  return <div>{Boolean(items.length) && <p>장바구니에 담긴 상품 수: {items.length}</p>}</div>;
}
```

조건을 불리언 값으로 변환함으로써 요소가 원하는 대로 렌더링될 수 있습니다.

7. 조건부 렌더링을 위해 삼항 표현식을 어디서든 사용하기

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

삼항 표현식은 강력한 조건부 렌더링 도구이지만 오용할 경우 코드가 읽기 어려워질 수 있습니다. 특히 여러 삼항 표현식이 중첩되어 있는 경우 코드가 복잡해집니다. 다음 예시를 살펴보세요:

```js
// 나쁜 예시 - 다수의 중첩된 삼항 표현식
function UserProfile({ user, isAdmin, isOwner }) {
  return <div>{isAdmin ? <p>Admin</p> : isOwner ? <p>Owner</p> : <p>User</p>}</div>;
}
```

위 예시에서는 다수의 삼항 표현식이 중첩되어 있어 코드를 이해하기 어렵습니다. 가독성을 높이기 위해 삼항 표현식 대신 함수 또는 컴포넌트를 사용하는 것을 고려해보세요. 다음은 개선된 예시입니다:

```js
// 좋은 예시 - 삼항 표현식 대신 함수 사용
function UserProfile({ user, isAdmin, isOwner }) {
  function getUserRole() {
    if (isAdmin) {
      return "Admin";
    } else if (isOwner) {
      return "Owner";
    } else {
      return "User";
    }
  }

  return (
    <div>
      <p>{getUserRole()}</p>
    </div>
  );
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

함수를 사용하여 코드를 더 읽기 쉽고 유지 관리하기 쉽게 만들 수 있어요.

8. 속성 유형을 정의하지 않거나 속성을 비구조화하지 않은 경우

컴포넌트의 속성에 대한 유형을 정의하고 속성을 비구조화하는 것은 좋은 실천 방법이며 코드의 유지 관리 및 안정성을 향상시킵니다. 일상적인 작업에서는 PropTypes 또는 TypeScript와 같은 도구를 사용하여 속성에 유형 정의를 추가하고 속성을 비구조화하여 더욱 명확하게 만들어야 합니다. 다음은 예시입니다:

```js
// 나쁜 예 - 정의하지 않은 속성 유형 및 비구조화되지 않은 속성
function Person(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

// 좋은 예 - 속성 유형 정의 및 속성 비구조화
import PropTypes from "prop-types";
function Person({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
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

부동산 유형을 정의하고 속성을 해체함으로써 코드의 가독성을 높이고 잘못된 유형의 속성을 사용할 때 경고를 받을 수 있습니다.

9. 대규모 애플리케이션에는 코드 분할을 사용하지 마세요

대규모 React 애플리케이션에 대해 초기 로드 성능을 향상시키기 위해 코드 분할(코드 분할)을 고려해야 합니다. 코드 분할을 사용하면 코드가 필요할 때로 나눠져 더 작은 청크로 로드되어 초기 번들 크기가 줄어듭니다. 다음은 예시입니다:

```js
import Loadable from "react-loadable";

const AsyncComponent = Loadable({
  loader: () => import("./AsyncComponent"),
  loading: () => <div>Loading...</div>,
});
function App() {
  return (
    <div>
      <AsyncComponent />
    </div>
  );
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

표를 Markdown 형식으로 변경하면 더 보기 편한데요.

코드 분할을 이용하면 특히 대규모 애플리케이션의 로딩 속도를 개선할 수 있어요.

# 결론

React 개발에서 이 아홉 가지 나쁜 습관을 피함으로써 코드 품질, 성능, 유지보수성을 향상시킬 수 있어요. React는 문제를 설명하고 그것들을 피하는 방법에 대한 샘플 코드를 사용하여 일상적인 작업에서 더 높은 품질의 애플리케이션을 만들 수 있도록 도와줄 거예요.

# 쉽게 이해하기 🚀

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

각각의 In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 필자를 갈켜주고 팔로우해주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 확인하세요
