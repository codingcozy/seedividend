---
title: "리액트 JS에서 리액트 폼 훅과 useFieldArray 훅을 함께 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoUsetheuseFieldArrayHookwithReactFormHookinReactJS_0.png"
date: 2024-05-12 22:08
ogImage: 
  url: /assets/img/2024-05-12-HowtoUsetheuseFieldArrayHookwithReactFormHookinReactJS_0.png
tag: Tech
originalTitle: "How to Use the useFieldArray Hook with React Form Hook in React JS"
link: "https://medium.com/@jagadeeshgade008/how-to-use-the-usefieldarray-hook-with-react-form-hook-in-react-js-7b420e7c0cd9"
---


소프트웨어 개발자로서, React Form Hook에서 useFieldArray 훅을 사용하는 방법에 대해 여러분과 공유할 수 있어서 정말 기쁩니다. 이 훅은 동적으로 폼 필드를 추가하거나 제거할 수 있는 강력한 도구로, 다수의 입력 필드가 있는 복잡한 폼을 쉽게 관리할 수 있게 해줍니다.

먼저, 필요한 종속성을 설치하는 방법부터 시작해보겠습니다. React Hook Form 라이브러리와 useFieldArray 훅을 설치해야 합니다. 터미널에서 다음 명령을 실행하여 이 작업을 수행할 수 있습니다:

```js
npm install react-hook-form
```

의존성을 설치했다면, React 폼에서 useFieldArray 훅을 구현할 수 있습니다. 이 훅을 사용하는 예시를 보여드리겠습니다:



```js
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

function MyForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ name: 'item1' }, { name: 'item2' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`items.${index}.name`)}
            defaultValue={field.name}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '' })}>
        Add Item
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
```

이 예제에서는 useForm 훅을 사용하여 기본값으로 form을 초기화했습니다. 또한 useFieldArray 훅을 사용하여 "items" 필드 배열을 관리했습니다. "control" 속성은 useForm 훅과 상호 작용할 수 있도록 useFieldArray 훅에 전달됩니다.

fields.map 함수는 "items" 배열의 각 입력 필드를 렌더링하는 데 사용됩니다. "Remove" 버튼을 클릭하면 제거 함수가 호출되고, "Add Item" 버튼을 클릭하면 추가 함수가 호출됩니다.

useFieldArray 훅을 사용하면 form의 상태를 수동으로 관리하지 않고도 form에서 필드를 쉽게 추가하거나 제거할 수 있습니다. 이를 통해 동적 입력이 있는 복잡한 form을 쉽게 생성할 수 있습니다.




하지만 "items" 배열에서 더 많은 필드를 사용하고 싶다면 어떻게 해야 할까요? 걱정하지 마세요! 단순히 양식에 더 많은 입력을 추가하면 됩니다. "name"과 "quantity" 두 필드를 "items" 배열에 포함한 예제를 보여드리겠습니다:

```js
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

function MyForm() {
 const { register, control, handleSubmit } = useForm({
 defaultValues: {
 items: [{ name: 'item1', quantity: 1 }, { name: 'item2', quantity: 2 }],
 },
 });
 
 const { fields, append, remove } = useFieldArray({
 control,
 name: 'items',
 });

 const onSubmit = (data) => console.log(data);

 return (
 <form onSubmit={handleSubmit(onSubmit)}>
 {fields.map((field, index) => (
 <div key={field.id}>
 <input
 {…register(`items.${index}.name`)}
 defaultValue={field.name}
 />
 <input
 {…register(`items.${index}.quantity`)}
 defaultValue={field.quantity}
 />
 <button type="button" onClick={() => remove(index)}>
 Remove
 </button>
 </div>
 ))}
 <button type="button" onClick={() => append({ name: '', quantity: 0 })}>
 Add Item
 </button>
 <button type="submit">Submit</button>
 </form>
 );
}

export default MyForm;
```

이 업데이트된 예제에서 "quantity"에 대한 두 번째 입력 필드가 추가되었습니다. 여전히 "items" 배열의 각 입력 필드를 렌더링하는 데 이전과 동일한 접근 방식을 사용하고 있습니다. "Remove" 버튼을 클릭하면 여전히 remove 함수가 호출되고, "Add Item" 버튼을 클릭하면 여전히 append 함수가 호출됩니다.

useForm 및 useFieldArray 훅을 함께 사용하면 React JS에서 여러 입력을 가진 복잡한 양식을 쉽게 관리할 수 있습니다. useFieldArray 훅은 폼에서 동적으로 필드를 추가하거나 제거할 수 있는 강력한 도구로, 동적이고 사용자 친화적인 양식을 만드는 데 도움이 됩니다.