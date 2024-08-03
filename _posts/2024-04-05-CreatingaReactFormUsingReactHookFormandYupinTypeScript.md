---
title: "타입스크립트로 리액트 폼 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Creating a React Form Using React Hook Form and Yup in TypeScript"
link: "https://medium.com/@msgold/creating-a-react-form-using-react-hook-form-and-yup-in-typescript-640168c5ed57"
---



![이미지](/assets/img/CreatingaReactFormUsingReactHookFormandYupinTypeScript_0.png)

# 소개

이 글에서는 React 폼 처리에 대해 깊이 파헤쳐보겠습니다. React Hook Form과 Yup과 같은 인기 있는 효율적인 라이브러리를 사용할 것입니다. 이 라이브러리들이 처음이라면, React Hook Form은 폼 상태를 관리하는 성능 최적화된, 유연하며 쉽게 사용할 수 있는 라이브러리입니다. 반면 Yup은 JavaScript 스키마를 작성하여 데이터를 구문 분석하고 유효성을 검사할 수 있는 강력한 도구입니다.

이 라이브러리들의 기능을 최대한 활용하기 위해 사용자 친화적인 폼을 생성하여 사용자의 이름, 주소, 도시, 주, 전화번호 및 우편번호와 같은 중요한 세부 정보를 캡처할 것입니다. 이 폼을 만들 때 우리는 Yup의 스키마 빌더를 사용하여 사용자 입력값을 유효성 검사하여 데이터 무결성을 확보하고 사용자에게 만족스러운 경험을 제공할 것입니다.

<div class="content-ad"></div>

타입 안전성과 깨끗하고 관리하기 쉬운 코드에 관심이 있는 분들을 위해 준비했습니다. 우리의 구현은 TypeScript로 작성될 것이며, 이는 JavaScript의 정적 타입이 추가된 유형의 슈퍼셋으로 선택적인 유형 등 다른 기능을 추가합니다. TypeScript를 사용하여 잠재적인 실행 시간 오류를 최소화하고 코드베이스의 유지 관리성을 높일 것입니다.

마지막으로, 저희 양식이 기능적일 뿐만 아니라 시각적으로 매력적이기도 하도록 보장할 것입니다. CSS를 사용하여 양식을 스타일링하며, 직관적인 레이아웃과 시각적으로 매력적인 디자인을 만들기에 초점을 맞출 것입니다. 우리의 양식은 UI 디자인에서 양식과 기능을 균형 있게 고려하여 사용성과 스타일을 모두 고려합니다.

본 튜토리얼을 마칠 때쯤에는 React Hook Form, Yup, 및 TypeScript를 사용하여 양식을 생성, 유효성 검사, 및 스타일링하는 방법에 대한 solide한 이해를 가지게 될 것입니다. React 툴킷을 강화하려는지 아니면 처음부터 시작하는지에 상관없이, 이 튜토리얼은 직접 여러분의 프로젝트에 적용할 수 있는 실용적인 통찰력과 지식을 제공할 것입니다. 그러니 말이 많않고 시작해 봅시다!

# 준비 사항

<div class="content-ad"></div>

- Node.js가 설치되어 있어야 합니다
- React.js와 TypeScript에 대한 기본적인 이해
- CSS에 익숙해야 합니다

먼저 TypeScript로 새로운 React 앱을 만드세요:

```js
npx create-react-app form-app --template typescript
```

# 종속 항목 설치

<div class="content-ad"></div>

먼저 필요한 종속 항목 (react-hook-form, yup, 그리고 hookform resolver)을 설치해 보세요:

```js
npm install react-hook-form yup @hookform/resolvers
```

# 파일 구조

간편함을 위해, 주로 npx 템플릿에 의해 생성된 다음 파일 구조를 사용합시다:

<div class="content-ad"></div>

```js
/src
  /components
    Form.tsx
  App.tsx
  index.tsx
  styles.css
```

# Form 만들기

react-hook-form으로 폼을 만들어 봅시다.

Form.tsx 파일에 다음과 같이 작성하세요:

<div class="content-ad"></div>

```js
import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

interface IFormInput {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  zipcode: string;
}

export const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register("name")} />

      <label>Address</label>
      <input {...register("address")} />

      <div className="input-group">
        <div className="input-field">
          <label>City</label>
          <input {...register("city")} />
        </div>
        <div className="input-field">
          <label>State</label>
          <input {...register("state")} />
        </div>
        <div className="input-field">
          <label>ZIP Code</label>
          <input {...register("zipcode")} />
        </div>
      </div>
      <label>Phone</label>
      <input {...register("phone")} />

      <input type="submit" />
    </form>
  );
};
```

이 코드는 TypeScript로 작성된 React 함수형 컴포넌트인 Form입니다. 이 컴포넌트는 react-hook-form 라이브러리를 사용하여 폼을 처리합니다. 코드를 살펴보겠습니다:

- import React from "react";: 이 줄은 React 라이브러리를 가져와서 React 컴포넌트를 정의하고 사용하는 데 필요합니다.
- import { useForm } from "react-hook-form";: 이 줄은 react-hook-form 라이브러리에서 useForm 훅을 가져옵니다. useForm 훅은 폼 처리를 단순화하기 위해 폼 상태를 관리하고 유틸리티 함수를 제공합니다.
- import "./Form.css";: 이 줄은 Form.css라는 CSS 파일을 가져와서 폼에 스타일을 적용합니다. 이 파일은 이 React 컴포넌트가 있는 파일과 동일한 디렉토리에 있어야 합니다.
- interface IFormInput {...}: 이 부분은 폼의 데이터 모양을 지정하는 TypeScript 인터페이스인 IFormInput을 정의합니다. 폼에는 이름, 주소, 도시, 주, 전화번호, 우편번호의 필드가 모두 문자열로 예상됩니다.
- export const Form: React.FC = () = {...}: Form에 대한 주요 함수형 컴포넌트 정의입니다. React.FC 유형을 사용하여 컴포넌트와 해당 props를 유형 검사합니다.
- const { register, handleSubmit } = useForm`<IFormInput>`();: 이 줄은 useForm 훅을 호출하고 폼 상태로부터 반환된 register, handleSubmit 메서드를 구조분해합니다. register는 입력 필드를 폼에 등록하고 handleSubmit는 폼 제출을 처리하는 함수입니다. 훅은 IFormInput 유형으로 호출되어 폼 데이터의 모양을 지정합니다.
- const onSubmit = (data: IFormInput) => console.log(data);: 폼을 제출할 때 호출되는 함수입니다. 폼 데이터는 IFormInput 유형이며 콘솔에 로깅됩니다.
- 컴포넌트 함수 내의 return 문은 Form 컴포넌트가 렌더링해야 하는 JSX를 설명하는 것을 반환합니다. 이는 이름, 주소, 도시, 주, 전화번호, 우편번호에 대한 레이블과 입력 필드, 제출 버튼이 포함된 폼 요소입니다. 입력 필드는 useForm 훅을 사용하여 폼에 등록되고, 폼의 onSubmit 핸들러는 useForm에서 제공하는 handleSubmit 함수로 설정됩니다.
- 도시, 주, 우편번호 필드는 "input-group" 클래스를 가진 div에 포함되어 있으며 이 세 필드 각각은 "input-field" 클래스를 가진 div로 더 포장되어 있습니다. 이 구성은 CSS에서 지정된 대로 이 세 필드를 동일한 수평 줄에 정렬하기 위한 것입니다.
- 전화번호 입력 필드와 제출 버튼은 그룹화된 필드 이후에 배치됩니다. 제출 버튼은 “submit” 유형이므로 클릭하면 폼이 제출됩니다.
- 이 코드는 이름, 주소, 도시, 주, 전화번호, 우편번호 필드가 있는 폼을 만듭니다. 폼이 제출되면 폼 데이터가 콘솔에 로깅됩니다. 이 코드 버전에서는 폼이 유효성 검사를 수행하지 않습니다.

# 폼 스타일링

<div class="content-ad"></div>

components 폴더에 Form.css라는 새 파일을 만들고 다음 CSS를 붙여넣으세요. 이 CSS는 우리의 양식을 위한 입력 필드를 레이아웃합니다.

```js
form {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

label {
  font-size: 16px;
  color: #333;
  margin-top: 15px;
  margin-bottom: 5px;
}

.input-group {
  display: flex;
  justify-content: space-between;
}

.input-field {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-top: 20px;
}

.input-field input {
  margin-top: 5px;
}

input {
  height: 35px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input[type="submit"] {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border: none;
}

input[type="submit"]:hover {
  background-color: #0056b3;
}

p {
  color: red;
  margin: 5px 0 0 0;
}
```

# 앱 실행하기

App.tsx를 다음 코드로 변경하세요:

<div class="content-ad"></div>

```js
import React from "react";
import "./App.css";
import { Form } from "./components/Form";

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
```

위 코드는 우리의 App 페이지를 방금 만든 폼 컴포넌트로 바꿉니다. 이제 React 응용 프로그램을 실행해 봅시다:

```js
npm run start
```

이 명령을 실행하면 브라우저에서 다음 페이지가 열립니다:

<div class="content-ad"></div>

![CreatingaReactFormUsingReactHookFormandYupinTypeScript_1.png](/assets/img/CreatingaReactFormUsingReactHookFormandYupinTypeScript_1.png)

이제 양식에 데이터를 입력하고 제출 버튼을 누릅니다. 콘솔은 다음과 같이 보입니다:

![CreatingaReactFormUsingReactHookFormandYupinTypeScript_2.png](/assets/img/CreatingaReactFormUsingReactHookFormandYupinTypeScript_2.png)

보통이라면 데이터를 콘솔에 표시하지 않을 것이고, 아마도 REST 서비스나 GraphQL과 같은 서비스에 AJAX 호출을 할 것입니다. 그러한 경우에는 onSubmit을 변경하여 axios와 같은 라이브러리를 사용하여 원격으로 양식 데이터를 전송할 수 있습니다.

<div class="content-ad"></div>

# 초기 폼 값 설정

만약 페이지가 로드될 때 상태 값을 '텍사스'로 미리 채워 사용자 경험을 향상시키고 싶다면 어떻게 할까요? React Hook Form에서 제공되는 useForm 훅에 포함된 setValue 함수를 사용하면 이를 수월하게 구현할 수 있습니다. 이 함수를 사용하면 등록된 입력 필드(여기서는 "state" 필드)에 초기값을 할당할 수 있습니다.

효율적인 구현을 위해 useEffect 훅을 활용할 수 있습니다. React의 useEffect 훅을 사용하면 함수 컴포넌트에서 데이터 가져오기나 수동 DOM 조작과 같은 사이드 이펙트를 수행할 수 있습니다. 여기서는 useEffect를 사용하여 컴포넌트가 마운트될 때 "state" 필드의 초기값을 설정할 수 있습니다.

이 접근 방식을 통해 방문자가 폼에 진입할 때 이미 '텍사스'가 "state" 필드에 채워져 있게 됩니다. setValue는 모든 필드에 대한 기존 정보를 채우기 위해 초기 정보를 데이터베이스에서 읽고 싶은 경우에도 유용할 수 있습니다.

<div class="content-ad"></div>

```js
const {
  setValue,
  register,
  handleSubmit,
  formState: { errors },
} = useForm < IFormInput > { resolver: yupResolver(schema) };

useEffect(() => {
  setValue("state", "Texas");
}, [setValue]);
```

<img src="/assets/img/CreatingaReactFormUsingReactHookFormandYupinTypeScript_3.png" />

# Yup을 사용하여 데이터 유효성 검사하기

Yup은 양식 유효성 검사를 간단하게 처리할 수 있도록 개발된 매우 유용한 라이브러리입니다. Yup의 핵심은 아래 예제에서 보여지는 유효성 스키마입니다. 이 스키마는 양식 필드의 유효성을 검사하고, 필드가 유효성 기준을 충족하지 않을 때 사용자에게 에러 메시지를 통해 적절하게 통신하는데 사용됩니다.

<div class="content-ad"></div>

저희 스키마에는 존재 테스트와 형식 테스트 두 가지 카테고리의 테스트를 통합했어요. 존재 테스트는 특정 필드가 채워졌는지 여부를 간단히 확인하며 필수 필드의 개념을 구현해요. 반면 형식 테스트는 입력의 구조를 유효성 검사할 때 사용돼요. 전화번호나 우편번호와 같이 특정 형식이 있는 필드들에 특히 중요하죠.

우리는 Yup에서 정규 표현식을 활용해 이러한 형식을 유효성 검사해요. 정규 표현식은 사용자의 입력과 일치시키기 위해 검색 패턴을 형성하는 문자의 일렬이에요. 예를 들어 전화번호가 올바른 전화번호 패턴과 일치하는지 확인할 거예요.

사용자가 양식을 제출하면 Yup은 스키마에 따라 양식 필드를 평가해요. 만약 어떤 필드도 유효성 검사에 실패하면, Yup은 useForm 후크에서 제공되는 오류 객체 내에 해당 오류 메시지를 채워요. 제출을 따라서, 양식은 다시 렌더링되며 오류 객체가 평가돼요. 기존의 오류 메시지가 있으면 사용자에게 자신의 실수를 바로 잡도록 빨간색으로 잘 강조해서 표시돼요. 이렇게 하면 직관적이고 반응성 있는 사용자 경험을 제공할 수 있어요.

<div class="content-ad"></div>

우리가 전화번호를 제외한 모든 필드를 채우고 제출을 누르면, 전화번호 필드 아래에 빨간 글씨로 "필수 입력 사항입니다" 라는 메시지가 표시됩니다.

![이미지](/assets/img/CreatingaReactFormUsingReactHookFormandYupinTypeScript_4.png)

전화번호 필드는 존재 여부와 형식 두 가지 유효성 검사를 가지고 있습니다. 그러나 먼저 필수 체크에서 유효성 검사가 실패하므로 사용자에게 해당 메시지가 표시됩니다.

그리고 잘못된 전화번호를 입력하고 제출을 누르면, 형식 유효성 검사 실패 메시지가 나타납니다.

<div class="content-ad"></div>

![이미지](/assets/img/CreatingaReactFormUsingReactHookFormandYupinTypeScript_5.png)

참고: 유효성 검사를 실패하면 onSubmit이 호출되지 않습니다. 따라서 제출 버튼을 누른 후 콘솔에 양식 객체가 표시되지 않습니다.

전화 번호를 수정하고 제출하면 다시 한 번 onSubmit이 호출되고 양식 객체가 콘솔에 출력됩니다.

![이미지](/assets/img/CreatingaReactFormUsingReactHookFormandYupinTypeScript_6.png)

<div class="content-ad"></div>

# 결론

마무리하면, React Hook Form과 Yup을 활용하여 React에서 효과적인 폼을 만드는 방법을 탐구해보았습니다. TypeScript를 사용하여 향상된 유형 안전성을 제공했습니다. 이러한 도구를 결합하면 견고하고 쉽게 구현할 수 있는 포괄적인 폼 유효성 검사 솔루션을 제공할 수 있음을 보여드렸습니다.

React Hook Form은 폼 생성 프로세스를 크게 단순화시키고 작성해야 하는 코드 양을 줄이며 불필요한 다시 렌더링을 줄여 성능을 향상시킵니다. 폼 상태, 유효성 검사 및 폼 제출을 원활하게 처리하는 방법을 확인했습니다. 다른 라이브러리와 잘 작동하여 더 고급화된 유효성 검사 기능을 제공하는 Yup과 잘 연계됩니다.

Yup을 사용하여 폼 입력의 구조와 요구 사항을 규정하는 유효성 검사 스키마를 정의했습니다. 이 스키마를 사용하여 정규 표현식을 활용한 형식 유효성 검사와 같은 복잡한 유효성 검사 작업을 손쉽게 수행할 수 있었습니다. 이는 Yup이 폼 유효성 검사 라이브러리로서의 강력함을 보여줍니다.

<div class="content-ad"></div>

비록이 글은 주로 폼 유효성 검사 및 스타일링에 중점을 두었지만, React Hook Form은 몇 가지 유용한 기능을 제공합니다. 예를 들어, 특정 필드를 모니터링하는 watch를 사용하여 폼 데이터 조작을 할 수 있고, 필드를 지우거나 기본값으로 설정하는 reset을 통해 작업을 수행할 수도 있습니다. 또한 useFieldArray로 폼 배열을 처리하거나, useFormContext로 폼 위저드 시나리오를 관리할 수도 있습니다.

React Hook Form을 TypeScript와 Yup과 통합하면 React 애플리케이션에서 폼 처리를 강력하고 안정적이며 효율적으로 수행할 수 있습니다. 이러한 라이브러리를 계속 탐험하면 웹 개발 프로젝트를 크게 향상시킬 수 있는 더 많은 기능들을 발견할 수 있습니다.

React와 TypeScript에 대해 예제로 더 배우고 싶으신가요? React 및 TypeScript에서 Wordle 게임 만들기 책을 확인해보세요.

![React Hook Form과 Yup을 사용한 React에서 TypeScript로 폼 만들기](/assets/img/CreatingaReactFormUsingReactHookFormandYupinTypeScript_7.png)
