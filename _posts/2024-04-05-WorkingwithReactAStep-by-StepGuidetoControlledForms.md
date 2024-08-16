---
title: "리액트 사용하기 제어된 폼에 대한 단계별 안내"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Working with React A Step-by-Step Guide to Controlled Forms"
link: "https://medium.com/@ianflurkey/working-with-react-a-step-by-step-guide-to-controlled-forms-253723dde858"
isUpdated: true
---





리액트를 학습 중인 학생으로서 여러 가지 다양한 도전에 직면해 왔어요. 이 중에서 가장 큰 도전 중 하나는 제어 폼이 어떻게 작동하는지 이해하는 것이었어요. 이 블로그 포스트에서 나는 제어 폼을 생성하는 과정을 안내하면서, 제 자신의 학습 여정에서 얻은 통찰과 팁을 공유할 거예요.

"제어 폼(controlled form)"에서는 React가 폼의 입력 필드(텍스트 상자, 체크박스 등)에서 일어나는 모든 변경 사항을 추적해요. 각 입력 필드가 자체 상태를 관리하는 대신, React가 이러한 입력 필드의 상태를 당신을 대신으로 제어하고 관리해 주는 거죠.

제어 폼을 사용하는 것에는 여러 이점이 있어요. React 상태를 통해 폼 데이터를 관리함으로써, 제어 폼은 예측 가능한 상태 처리를 제공해주며, 상태를 기반으로 폼 구성 요소가 예상대로 작동하도록 보장해요. 또한, 실시간 유효성 검사를 가능하게 하여 사용자가 데이터를 입력하는 대로 즉각적인 피드백을 제공해요. 제어 폼은 또한 폼 데이터에 대한 단일 진실의 소스를 정립하여, 구성 요소 또는 컨텍스트 간 데이터 동기화를 간단하게 만들어 줘요. 제어 폼을 만드는 데 필요한 단계는 다음과 같아요.

- JSX로 초기 폼 생성하기

<div class="content-ad"></div>

JSX를 컴포넌트에 통합하는 것부터 시작해봅시다. JSX는 자바스크립트에서 HTML과 유사한 코드를 작성할 수 있게 해주는 구문 확장입니다. 먼저 form 컴포넌트의 반환 값에 `form` 요소를 만들어 보겠습니다.

```js
import { useState } from "React";
function myForm() {
  return (
    <div>
      <form></form>
    </div>
  );
}

export default myForm;
```

2. 입력 추가하기

이제 form에 입력 필드를 넣어봅시다. 이 예제에서는 텍스트 입력 필드를 사용할 것이지만, 체크박스부터 드롭다운 메뉴까지 가능한 다양한 입력 유형에 개념이 적용됩니다.

<div class="content-ad"></div>

```js
<form>
  <input type="text" />
</form>
```

3. useState Hook 호출하기

다음으로, React의 useState 훅을 사용하여 상태 관리를 설정해야 합니다. React에서 useState 훅을 사용할 때, 두 가지 요소(state 및 상태를 업데이트하는 함수)를 포함한 배열이 반환됩니다. 이 배열을 비구조화하여 상태와 함수를 변수에 할당합니다. 상태 변수를 제공된 함수를 사용하여 업데이트할 때, React는 자동으로 구성 요소를 다시 렌더링하여 변경 사항을 반영합니다. 또한, React에서 상태 변수를 업데이트하는 작업은 비동기적으로 발생하기 때문에 업데이트가 즉시 상태 변수에 반영되지 않을 수 있습니다. useState에 초기 값을 제공하여 구성 요소 렌더링 시 상태 변수의 기본 상태를 설정함으로써 기억해 주세요.

```js
const [myStateVariable, setMyStateVariable] = useState("");
```

<div class="content-ad"></div>

4. 값 바인딩

JSX에서는 입력 요소와 상태 변수 간에 직접적인 연결을 설정합니다. 상태 제어를 통해 입력 값은 상태 변수와 직접적으로 바인딩되어, 둘 사이에 원활한 동기화가 보장됩니다. 이로써 입력 필드의 변경 사항이 지연 없이 상태 변수에 반영되는 제어된 환경을 만들어냅니다.

```js
<input type="text" value={myVariable} />
```

5. 변경 처리

<div class="content-ad"></div>

현재, 필드에 텍스트를 입력해도 어떤 시각적 변화도 보이지 않습니다. 이 문제를 해결하기 위해 사용자 입력을 캡처하고 예상 데이터 형식과 일치하는지 확인하는 기능이 필요합니다. 여기서 handleChange 함수가 필요합니다. 이 함수는 매우 중요한 역할을 합니다. 사용자 입력을 캡처하고 상태 변수를 적절하게 업데이트하여 효과적인 상태 관리를 보장합니다. useState 덕분에 setMyVariable을 호출할 때마다 컴포넌트가 다시 렌더링되어 폼이 반응적이고 사용자 친화적인 상태를 유지합니다.

```js
const handleChange = (e) => {
  const inputValue = e.target.value;
  setMyVariable(inputValue);
};
```

6. 다시 입력에 돌아가기

이제 우리는 폼, 입력, 입력 값으로 설정된 상태 변수 및 상태 수정 함수를 제어하는 변경 처리 함수를 갖추었습니다. 하지만 입력 필드에 텍스트를 입력해도 아무 변화도 일어나지 않습니다. 입력 필드에는 한 가지 더 중요한 측면이 있습니다: onChange 속성이 필요하며 그 속성은 handleChange 함수로 설정되어야 합니다.

<div class="content-ad"></div>

```js
<input type="text" value={myStateVariable} onChange={handleChange} />
```

7. 양식 제출 처리

기본 작업이 준비되었으니, 이제 양식 제출을 다룰 차례입니다. 이를 처리하는데는 handleSubmit 함수가 사용됩니다. 기본 양식 제출 동작을 가로채고 사용자 지정 로직을 실행함으로써, 제출 프로세스를 완전히 제어할 수 있습니다.

```js
const handleSubmit = (e) => {
  e.preventDefault();
  // 양식 제출시 실행할 코드
};
```

<div class="content-ad"></div>

우리는 onSubmit 속성을 사용하여 이를 양식과 연결합니다.

```js
<form onSubmit={handleSubmit}>
```

모든 것을 감싸기 위해 부품을 하나로 조립해 봅시다. JSX 구문과 React 훅을 사용하여 쉽게 제어할 수 있는 제어된 양식을 만들기 위한 재사용 가능한 템플릿을 만듭니다. 양식 생성부터 제출까지, 각 단계가 React와 함께 작업할 때 개발자들에게 도움이 될 수 있도록 만들어졌습니다.

```js
import { useState } from "React";

function myForm() {
  const [myStateVariable, setMyStateVariable] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 양식 제출 시 실행할 코드
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setMyVariable(inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={myStateVariable} onChange={handleChange} />
      </form>
    </div>
  );
}
```

<div class="content-ad"></div>

결론

끊임없이 변화하는 웹 개발 환경에서 React를 마스터하는 것은 도전과 보상으로 가득합니다. 제어 폼은 이 방대한 생태계의 한 측면일 뿐이지만, 그 중요성은 과장할 수 없습니다. React의 이 요소를 배우는 것은 꽤 어려웠지만, 최종적으로 의미 있는 여정이었으며, 이것이 어떻게 작동하는지 명확히 정립하는 데 도움이 되었기를 바랍니다!
