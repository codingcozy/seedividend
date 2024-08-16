---
title: "React Hook Form과 Zod를 사용하여 React에서 양식 유효성 검사 다루기"
description: ""
coverImage: "/assets/img/2024-05-14-HandlingFormValidationsinReactwithReactHookFormandZod_0.png"
date: 2024-05-14 10:34
ogImage: 
  url: /assets/img/2024-05-14-HandlingFormValidationsinReactwithReactHookFormandZod_0.png
tag: Tech
originalTitle: "Handling Form Validations in React with React Hook Form and Zod"
link: "https://medium.com/@olaishola/handling-form-validations-in-react-with-react-hook-form-and-zod-18e070bbdda6"
isUpdated: true
---




<img src="/assets/img/2024-05-14-HandlingFormValidationsinReactwithReactHookFormandZod_0.png" />

# 소개

웹 애플리케이션에서 폼 유효성 검사는 데이터 무결성을 보장하고 일관된 사용자 경험을 제공하는 데 중요합니다. React에서 폼 유효성을 처리하는 것은 때때로 복잡하고 시간이 많이 소요될 수 있습니다. 그러나 적절한 도구와 라이브러리를 사용하면 이 과정을 간단화하고 효율적으로 만들 수 있습니다.

이 글에서는 React Hook Form, Zod, 그리고 TypeScript를 활용하여 React에서 폼 유효성을 처리하는 방법을 살펴볼 것입니다. React Hook Form은 폼 상태와 유효성을 관리하기 위한 사용하기 쉬운 API를 갖춘 가벼운 조절 가능한 폼 라이브러리입니다. Zod는 스키마 유효성 검사 라이브러리로 데이터 구조를 정의하고 유효성을 검사하는 것을 간단하게 만들어줍니다.



React Hook Form과 Zod를 결합하여 React 애플리케이션에서 강력하고 신뢰할 수 있는 폼 유효성 검사 시스템을 만들 수 있습니다. 시작해보고 폼 유효성을 효과적으로 다루는 주요 개념, 기술 및 코드 예제를 살펴보겠습니다.

데모에서는 Sass를 사용하여 유효성 검사 및 기본 스타일이 적용된 기본 양식을 만들어 보겠습니다(아래 이미지 참조). 이 데모는 React의 새로운 앱을 만들기 위해 React가 커뮤니티에서 인기 있는 React 기반 프레임워크를 사용할 것을 권장하는 Nextjs React 프레임워크를 사용하여 앱을 생성합니다. 자세한 내용은 여기를 참조하세요.

![이미지](/assets/img/2024-05-14-HandlingFormValidationsinReactwithReactHookFormandZod_1.png)

# React Hook Form과 Zod 설정



폼 유효성 검사를 처리하기 전에, 프로젝트에 React Hook Form과 Zod를 설치해야합니다. 이미 React 또는 Next.js 프로젝트가 설정되어 있고 폼이 생성되어 있다고 가정하고, 다음 단계를 따라 진행하세요:

- 필요한 종속성 설치:

```js
npm install react-hook-form zod @hookform/resolvers
```

2. 필요한 컴포넌트와 훅을 가져옵니다:



```js
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
```

3. Zod을 사용하여 폼 스키마를 정의하세요:

저희의 유효성 검사 스키마는 새로운 사용자를 등록하는 폼을 유효성 검사하기 위해 사용자명, 이메일, 비밀번호, 그리고 비밀번호 확인을 포함할 것입니다.

```js
 const schema = z.object({
    username: z.string().min(3, {message: '사용자 이름은 최소 3자 이상이어야 합니다'}),
    email: z.string().min(1, {message: '이메일은 필수 항목입니다'}).email('유효하지 않은 이메일 주소입니다'),
    password: z.string().min(6, {message: '비밀번호는 최소 6자 이상이어야 합니다'}),
    confirmPassword: z.string().min(6, {message: '비밀번호는 최소 6자 이상이어야 합니다'})
  })

//스키마에서 유추된 타입 추출하기
type ValidationSchemaType = z.infer<typeof schema>
```



4. 양식과 유효성 해결 프로그램을 설정하십시오:

```js
 const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });
```

React Hook Form과 Zod를 설정했으니, 이제 React 애플리케이션에서 양식 유효성 검사를 처리할 준비가 되었습니다.

# 기본 양식 유효성 검사



React Hook Form 및 Zod를 사용한 폼 유효성 검사의 기본 사항부터 시작해 봅시다. 개별 폼 필드의 유효성을 검사하고 오류 메시지를 표시하며, 폼 제출을 처리하는 방법을 살펴보겠습니다.

- 폼 필드 등록:

React Hook Form의 register 함수는 폼 필드를 등록하는 데 사용되며, 폼 필드의 속성 이름 또는 스키마 이름을 인수로 취합니다.

```js
<input type="text" {...register('name')} />
```



```js
"use client";

import React from 'react'
import styles from './form.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const Form = () => {

  const schema = z.object({
    username: z.string().min(3, {message: 'Username must be at least 3 characters'}),
    email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters'})
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

  //extract the inferred type from schema
  type ValidationSchemaType = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  return (
    <form className={styles.form_main}>
      <label htmlFor="username">
        Username:
        <input type="text" placeholder='username goes here...' {...register('username')} />
      </label>
      <label htmlFor="email">
        Email:
        <input type="email" placeholder='email goes here...' {...register('email')} />
      </label>

      <label htmlFor="password">
        Password:
        <input type="password" placeholder='password goes here...' {...register('password')} />
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password:
        <input type="password" placeholder='Confirm password' {...register('confirmPassword')} />
      </label>
      <button type='submit'>Login</button>
    </form>
  )
}

export default Form
```

2. Displaying error messages:

React Hook Form은 errors 객체를 반환하는데, 이 객체는 formState에서 비구조화된 것입니다. errors를 통해 우리는 양식 오류에 접근할 수 있고 각 등록된 양식 필드에 대한 지정된 유효성 제약 메시지를 반환합니다.

```js
const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });
```



그럼 각 폼 필드에 대한 유효성 검사 스키마에서 선언된 오류 메시지를 조건부로 렌더링할 수 있어요. 또한, 잘못된 정보를 입력했을 때 입력란 테두리를 빨간색으로 만들기 위해 error_input이라는 CSS 클래스도 만들었어요.

```js
{errors.username && <span>{errors.username.message}</span>}
```

```js
<form className={styles.form_main}>
      <label htmlFor="username">
        Username:
        <input type="text" placeholder='사용자명을 입력해주세요...' {...register('username')} className={errors.username && styles.error_input}/>
        {errors.username && (
          <span className={styles.error}>{errors.username?.message}</span>
        )}
      </label>
      <label htmlFor="email">
        Email:
        <input type="email" placeholder='이메일을 입력해주세요...' {...register('email')}  className={errors.email && styles.error_input}/>
        {errors.email && (
          <span className={styles.error}>{errors.email?.message}</span>
        )}
      </label>


      <label htmlFor="password">
        Password:
        <input type="password" placeholder='비밀번호를 입력해주세요...' {...register('password')}  className={errors.password && styles.error_input}/>
        {errors.password && (
          <span className={styles.error}>{errors.password?.message}</span>
        )}
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password:
        <input type="password" placeholder='비밀번호를 확인해주세요' {...register('confirmPassword')}  className={errors.confirmPassword && styles.error_input}/>
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword?.message}</span>
        )}
      </label>
      <button type='submit'>로그인</button>
    </form>
```

3. 폼 제출 처리:



우리는 onSubmit이라는 사용자 정의 폼 제출 핸들러 함수를 생성하고, 폼 데이터를 콘솔에 출력합니다.

```js
const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
    console.log(data)
}
```

그런 다음, React Hook form에서 제공하는 handleSubmit 함수에 전달합니다.

```js
"use client";

import React from 'react'
import styles from './form.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const Form = () => {

  const schema = z.object({
    username: z.string().min(3, {message: 'Username must be at least 3 characters'}),
    email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters'})
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

  type ValidationSchemaType = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  // Form submit handler
  const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <form className={styles.form_main} onSubmit={handleSubmit(onSubmit)}>
      // 다른 코드
    </form>
  )
}

export default Form
```



이 예시에서는 React Hook Form에서 제공하는 register 함수를 사용하여 '사용자 이름', '이메일" 및 "비밀번호" 필드를 등록합니다. 그런 다음 필드에 오류가 있는 경우 오류 메시지를 표시합니다. 마지막으로, 폼 제출은 제출된 폼을 처리하는 onSubmit 함수를 호출하여 처리합니다. 아래 데모를 확인해보세요.

# 일부 고급 폼 유효성 검사 기술

다음 기술들 중 일부를 살펴보겠습니다:

- Cross-Field Validation:



리파인 커스텀 유효성 검사기는 비밀번호와 확인 비밀번호를 상호 검증하는 데 사용할 수 있습니다. 유효성 검사 함수와 양식 데이터를 가져와 비밀번호가 확인된 비밀번호와 동일한지 확인하고 오류 경로를 확인 비밀번호로 설정합니다.

```js
// 비밀번호와 확인 비밀번호를 상호 검증
const schema = z.object({
    username: z.string().min(3, {message: '사용자 이름은 최소 3자 이상이어야 합니다'}),
    email: z.string().min(1, {message: '이메일이 필요합니다'}).email('잘못된 이메일 주소입니다'),
    password: z.string().min(6, {message: '비밀번호는 최소 6자 이상이어야 합니다'}),
    confirmPassword: z.string().min(6, {message: '비밀번호는 최소 6자 이상이어야 합니다'})
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다'
  })
```

이 예시에서는 '확인 비밀번호' 필드가 '비밀번호' 필드와 일치하는지 확인합니다. 값이 일치하지 않으면 오류 메시지가 표시됩니다.

2. 비동기 유효성 검사:



```js
const schema = z.object({
  email: z.string().email("유효하지 않은 이메일 주소").refine(async (value) => {
    // 비동기 유효성 검사 로직 수행 (예: 데이터베이스에 이메일이 있는지 확인)
    // 유효성이 통과되면 true를 반환하고 그렇지 않으면 false를 반환합니다.
  }, '이메일이 이미 존재합니다'),
});
```

이는 데이터를 외부 소스와 대조하여 유효성을 검사해야 할 때 유용합니다. 이메일이 이미 데이터베이스에 존재하는지 확인하는 것과 같은 상황에서 유용합니다.

# 결론

React에서 양식 유효성을 처리하는 것은 견고하고 사용자 친화적인 웹 애플리케이션을 구축하는 데 필수적입니다. React Hook Form과 Zod의 조합으로 프로세스를 간소화하고 효율적으로 사용하는 방법에 대해 살펴보았습니다. React Hook Form과 Zod를 구성하는 방법, 기본 및 고급 양식 유효성 검사 수행, 복잡한 유효성 시나리오 다루기, 사용자 경험 향상 방법 등을 배웠습니다.



귀하가 원하는 기준에 따라 사용자 입력을 유효성 검사할 수 있도록 React Hook Form과 Zod의 강력함과 유연성을 활용할 수 있습니다. 이를 통해 데이터 무결성이 향상되고 오류가 줄어들며 더 쾌적한 사용자 경험을 제공할 수 있습니다. 다음 React 프로젝트에서 이러한 기술과 라이브러리를 실험하여 양식 유효성을 효과적이고 효율적으로 처리해 보세요.

더 많은 정보를 원하시면 React hook form 및 Zod 공식 문서를 참조하여 해당 라이브러리 및 고급 개념에 대해 더 많이 알아보세요.

데모의 GitHub 저장소는 여기에서 확인할 수 있습니다. 전체 코드와 CSS 스타일링을 확인할 수 있습니다.

즐거운 코딩 되세요!