---
title: "리액트 라우터를 사용하여 페이지간 데이터 전달하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React Router to pass data between pages"
link: "https://medium.com/@codingscenes/react-router-to-pass-data-between-pages-6ee22fdf2dfa"
isUpdated: true
---





React Router은 특정 사용 사례에 따라 페이지간에 데이터를 전달하는 여러 가지 방법을 제공합니다. 일반적인 접근 방법은 다음과 같습니다:

- URL 매개변수: URL 매개변수를 사용하여 페이지간에 데이터를 전달할 수 있습니다. 보내는 페이지에서 데이터를 매개변수로 URL에 추가하고, 받는 페이지에서는 props.match.params 객체에서 해당 매개변수에 접근할 수 있습니다.

다음은 페이지 간 데이터 전달에 URL 매개변수를 사용하는 예시입니다:

```js
// 보내는 페이지
import { Link } from "react-router-dom";

function MyComponent() {
  const data = { name: "John", age: 30 };

  return <Link to={`/my-page/${data.name}/${data.age}`}>내 페이지로 이동</Link>;
}

// 받는 페이지
function MyPage(props) {
  const { name, age } = props.match.params;

  return (
    <div>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
    </div>
  );
}
```

<div class="content-ad"></div>

이 예시에서 MyComponent 컴포넌트는 데이터 객체의 name 및 age 속성을 URL에 매개변수로 추가합니다. Link 컴포넌트는 URL에 /my-page/John/30과 같은 MyPage 컴포넌트로의 링크를 생성합니다.

MyPage 컴포넌트에서는 name 및 age 매개변수를 props.match.params 객체에서 액세스합니다.

2. 쿼리 매개변수: 쿼리 매개변수를 사용하여 페이지 간에 데이터를 전달할 수도 있습니다. 보내는 페이지에서 데이터를 URL에 쿼리 매개변수로 추가하고, 받는 페이지에서는 props.location.search 문자열에서 해당 매개변수에 액세스할 수 있습니다.

다음은 페이지 간 데이터 전달에 쿼리 매개변수를 사용하는 예시입니다:

<div class="content-ad"></div>

```js
// 페이지 전송
import { Link } from "react-router-dom";

function MyComponent() {
  const data = { name: "John", age: 30 };

  return (
    <Link to={`/my-page?name=${data.name}&age=${data.age}`}>
      내 페이지로 가기
    </Link>
  );
}

// 페이지 수신
function MyPage(props) {
  const searchParams = new URLSearchParams(props.location.search);
  const name = searchParams.get("name");
  const age = searchParams.get("age");

  return (
    <div>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
    </div>
  );
}
```

이 예제에서 MyComponent 컴포넌트는 데이터 객체의 name과 age 속성을 URL의 쿼리 매개변수로 추가합니다. Link 컴포넌트는 URL /my-page?name=John&age=30으로 MyPage 컴포넌트로 이동하는 링크를 생성합니다.

MyPage 컴포넌트에서는 name과 age 매개변수를 props.location.search 문자열을 URLSearchParams API를 사용하여 액세스합니다.

3. State: 상태를 사용하여 페이지 간 데이터를 전달할 수도 있습니다. 전송 페이지에서는 데이터를 history 객체의 state 객체에 추가하고 수신 페이지에서는 location.state 객체에서 데이터에 액세스할 수 있습니다.

<div class="content-ad"></div>

여기 데이터를 페이지 간에 전달하는 방법 예제가 있어요:

```js
// 보내는 페이지
import { useHistory } from "react-router-dom";

function MyComponent() {
  const history = useHistory();
  const data = { name: "John", age: 30 };

  function handleClick() {
    history.push("/my-page", { data });
  }

  return <button onClick={handleClick}>My 페이지로 이동</button>;
}

// 받는 페이지
function MyPage(props) {
  const { data } = props.location.state;

  return (
    <div>
      <p>이름: {data.name}</p>
      <p>나이: {data.age}</p>
    </div>
  );
}
```

이 예제에서 MyComponent 컴포넌트는 push 메서드를 사용하여 데이터 객체를 history 객체의 state 객체에 추가합니다. handleClick 함수는 버튼을 클릭할 때 호출되며, 데이터 객체를 포함한 상태 객체로 MyPage 컴포넌트로 이동합니다.

MyPage 컴포넌트에서는 데이터 객체를 location.state 객체에서 가져올 수 있어요. 사용자가 history.push 메서드를 사용하여 받는 페이지로 이동한 경우에만 작동한다는 것을 유의하세요. 직접 주소 표시줄에 URL을 입력하여 이동하는 경우에는 작동하지 않습니다.
