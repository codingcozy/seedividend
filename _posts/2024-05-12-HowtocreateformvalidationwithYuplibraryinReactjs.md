---
title: "Reactjs에서 Yup 라이브러리를 사용하여 양식 유효성 검사를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtocreateformvalidationwithYuplibraryinReactjs_0.png"
date: 2024-05-12 20:07
ogImage: 
  url: /assets/img/2024-05-12-HowtocreateformvalidationwithYuplibraryinReactjs_0.png
tag: Tech
originalTitle: "How to create form validation with Yup library in Reactjs"
link: "https://medium.com/@olivier.trinh/how-to-create-form-validation-with-yup-library-in-reactjs-4846f045957a"
isUpdated: true
---




폼 유효성 검사는 모든 웹 애플리케이션의 중요한 부분입니다. 사용자가 입력한 데이터가 올바르고 완전한지 확인하는 데 도움이 됩니다. Yup은 Reactjs의 인기있는 유효성 검사 라이브러리로, 폼 유효성을 쉽게 만들고 관리할 수 있습니다.

![Yup 라이브러리를 사용하여 어떻게 Reactjs에서 폼 유효성을 만들 수 있는지](/assets/img/2024-05-12-HowtocreateformvalidationwithYuplibraryinReactjs_0.png)

Yup을 사용하려면 먼저 npm을 사용하여 설치해야 합니다: npm install yup

Yup을 설치한 후에는 유효성 검사 스키마를 작성할 수 있습니다. 유효성 검사 스키마는 폼의 데이터를 유효성 검사하는 규칙을 정의하는 객체입니다.



예를 들어, 다음 스키마는 사용자 이름과 비밀번호를 유효성 검사합니다:

```js
const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().minLength(8),
});
```

required() 규칙은 필드가 필수임을 나타냅니다. minLength() 규칙은 필드가 적어도 8자여야 함을 나타냅니다.

그런 다음 validate() 메서드를 사용하여 폼 데이터를 유효성 검사할 수 있습니다.



```js
const formData = {
  username: "user123",
  password: "password123",
};

const errors = schema.validate(formData);

if (errors.length > 0) {
  // 폼 데이터에 오류가 있습니다
} else {
  // 폼 데이터가 유효합니다
}
```

만일 폼 데이터가 유효하지 않을 경우, errors 객체는 오류 메시지의 배열을 포함하게 됩니다.

Yup은 email(), url(), number() 등 다양한 다른 유효성 검사 규칙도 제공합니다. Yup 문서에서 사용 가능한 유효성 검사 규칙의 전체 목록을 찾을 수 있습니다.

다음은 사용자가 새 계정을 만들 수 있는 폼을 유효성 검사하기 위해 Yup을 사용하는 예시입니다:




```js
const schema = Yup.object().shape({
  username: Yup.string().required().minLength(3).maxLength(25),
  email: Yup.string().email().required(),
  password: Yup.string().required().minLength(8).maxLenght(25),
});

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };

  const errors = schema.validate(formData);

  if (errors.length > 0) {
    // 양식 데이터에 오류가 있음
    alert(errors.join("\n"));
  } else {
    // 양식 데이터가 유효함, 처리할 작업 수행
  }
};

const App = () => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="사용자 이름" />
      <input type="email" name="email" placeholder="이메일" />
      <input type="password" name="password" placeholder="비밀번호" />
      <button type="submit">계정 생성</button>
    </form>
  );
};
```

이 예시는 사용자가 제출 버튼을 클릭할 때 onSubmit 이벤트 핸들러를 사용하여 양식 데이터를 유효성 검사합니다. 양식 데이터가 유효하면 코드는 해당 데이터를 처리합니다. 그렇지 않으면 오류 메시지가 표시됩니다.
