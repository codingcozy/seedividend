---
title: "React Hook Form vs Formik 비교 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "React Hook Form vs Formik A Friendly Comparison"
link: "https://medium.com/@louis.young0420/react-hook-form-vs-formik-a-friendly-comparison-d2fc0650f1e3"
isUpdated: true
---

<img src="/assets/img/ReactHookFormvsFormikAFriendlyComparison_0.png" />

리액트 애플리케이션에서 양식을 처리할 때, 우리의 삶을 더 쉽게 만들어 주는 몇 가지 인기 있는 라이브러리가 있습니다. React Hook Form과 Formik는 커뮤니티에서 큰 인기를 얻고 있는 두 가지 라이브러리입니다. 이 블로그 포스트에서는 React Hook Form과 Formik를 비교하여 당신의 다음 프로젝트에서 어느 것을 사용할지 결정하는 데 도움을 드리겠습니다. 주요 기능, 사용 사례를 다루고, 작동 방식을 더 잘 이해할 수 있도록 몇 가지 샘플 코드를 제공할 예정입니다.

# 소개

React Hook Form은 React 훅의 힘을 받아 양식 유효성 검사와 상태 관리를 다루는 가벼운 라이브러리입니다. 불필요한 다시 렌더링을 최소화하고 코드를 단순화하여 성능을 향상시키기 위해 설계되었습니다.

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

Formik은 React 애플리케이션에서 폼을 처리하는 데 인기 있는 라이브러리입니다. 폼을 구축하는 데 유용한 유틸리티 및 컴포넌트 집합이 제공되며, 유효성 검사, 오류 처리 등을 내장으로 지원합니다.

이 라이브러리들이 실제로 어떻게 작동하는지 보기 위해 몇 줄의 샘플 코드를 살펴봅시다.

![이미지](/assets/img/ReactHookFormvsFormikAFriendlyComparison_1.png)

# 샘플 코드

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

## React Hook Form

이 예시에서는 useForm 훅을 사용하여 폼 상태와 유효성을 처리했습니다. 또한 register 함수를 사용하여 입력 필드를 폼과 등록하고 이메일 주소가 필수이며 유효한 형식임을 확인하는 등의 유효성 규칙을 적용했습니다. 마지막으로 오류가 있을 경우 errors 객체를 사용하여 유효성 오류를 표시했습니다.

```js
import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
```

## Formik

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

이 예시에서는 Formik 컴포넌트로 양식을 감싸고 Field 및 ErrorMessage 컴포넌트를 사용하여 입력 필드를 처리하고 유효성 검사 오류를 표시했습니다. 또한 이메일 필드에 대한 사용자 정의 유효성 검사 함수를 정의했습니다.

```js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function App() {
  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "이메일을 입력해주세요";
    } else if (!/^\S+@\S+$/i.test(value)) {
      error = "유효하지 않은 이메일 형식입니다";
    }
    return error;
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik initialValues={{ email: "" }} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="email">이메일:</label>
          <Field id="email" type="email" name="email" validate={validateEmail} />
          <ErrorMessage name="email" component="span" />
          <button type="submit" disabled={isSubmitting}>
            제출하기
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default App;
```

![ReactHookForm vs Formik](/assets/img/ReactHookFormvsFormikAFriendlyComparison_2.png)

# 비교

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

React Hook Form과 Formik은 각각의 강점과 약점을 가지고 있어요. 이제 주요 기능들을 비교해봅시다:

![React Hook Form vs Formik](/assets/img/ReactHookFormvsFormikAFriendlyComparison_3.png)

## 1. 성능

React Hook Form과 Formik은 폼 상태 처리 및 폼 입력 컴포넌트 관리 방법에 차이가 있지만, 두 라이브러리 모두 성능을 최적화하기 위한 방법을 제공해요.

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

React Hook Form은 미제어 컴포넌트를 사용하고 input 컴포넌트를 register 메서드로 등록함으로써 양식의 필요없는 부분을 다시 렌더링하지 않습니다. 양식 입력 값이 변경되면 React Hook Form은 전체 양식을 다시 렌더링하지 않고 양식 상태를 업데이트합니다. 특히 많은 입력이 있는 대규모 양식의 경우 성능이 향상될 수 있습니다.

한편 Formik은 제어 컴포넌트를 사용하는데, 이는 양식 상태가 React Hook Form의 미제어 컴포넌트에 의존하는 대신 컴포넌트에 의해 관리된다는 것을 의미합니다. 양식 상태가 변경될 때 추가적인 다시 렌더링이 발생할 수 있지만 Formik은 성능을 최적화하는 방법을 제공합니다. 예를 들어 Formik의 shouldUpdate 속성을 사용하면 양식 컴포넌트가 언제 다시 렌더링되어야 하는지 제어할 수 있어서 불필요한 다시 렌더링을 줄일 수 있습니다.

성능적인 측면에서 React Hook Form과 Formik은 각각의 장단점을 제공합니다. React Hook Form의 미제어 컴포넌트는 대형 양식의 성능이 더 좋아질 수 있지만 양식 상태를 관리하는 다른 방법이 필요할 수 있습니다. Formik의 제어 컴포넌트는 양식 상태에 더 많은 제어를 제공하지만 불필요한 다시 렌더링을 피하기 위해 추가적인 최적화가 필요할 수 있습니다. 최종적으로 두 라이브러리 간의 선택은 프로젝트의 특정 요구사항에 따라 달라지며, 양식의 복잡성과 성능 요구 사항을 고려해야 합니다.

![React Hook Form vs. Formik Friendly Comparison](/assets/img/ReactHookFormvsFormikAFriendlyComparison_4.png)

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

## 2. 학습 곡선

React Hook Form과 Formik은 양식 상태 및 입력 구성 요소를 관리하는 다른 방식을 가지고 있으며, 이는 그들의 사용 편의성과 학습 곡선에 영향을 미칠 수 있습니다.

React Hook Form은 더 작은 API를 가지고 있으며 React 훅에 많이 의존하므로, 훅에 익숙한 개발자들에게 학습과 사용이 쉬울 수 있습니다. React Hook Form의 API는 간단하고 직관적으로 설계되어 있으며, register, handleSubmit, setValue와 같은 메서드를 사용하여 양식 상태 및 입력 구성 요소를 명확하고 간결하게 관리할 수 있습니다.

반면에 Formik은 높은 수준의 추상화로 인해 다소 더 높은 학습 곡선을 가지고 있습니다. Formik은 유효성 검사, 오류 처리, 양식 제출과 같은 더 포괄적인 기능 세트를 제공하는데, 이는 학습과 사용이 더 복잡해질 수 있습니다. 그러나 Formik의 높은 수준의 추상화는 복잡한 양식을 위해 더 많은 편의성과 유연성을 제공할 수도 있습니다.

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

최종적으로 React Hook Form과 Formik 중에서 어떤 것을 선택할지는 여러분의 특정 필요와 선호에 따라 다를 것입니다. React 훅에 많이 의존하는 간단하고 가벼운 솔루션을 선호한다면 React Hook Form이 더 나은 선택일 수 있습니다. 더 포괄적인 기능 세트가 필요하고 살짝 더 가파른 학습 곡선이 괜찮다면 Formik이 더 적합할 수 있습니다.

![React Hook Form vs Formik: 친화적인 비교](/assets/img/ReactHookFormvsFormikAFriendlyComparison_5.png)

## 3. 오류 처리

React Hook Form과 Formik은 모두 훌륭한 오류 처리 및 유효성 검사 지원을 제공하여 양식을 작성하는 중요한 측면을 다룹니다.

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

React Hook Form의 문법은 오류 처리 및 유효성 검사를 간결하고 직관적으로 처리할 수 있습니다. register 메서드는 폼 유효성 검사 규칙을 설정하는 쉬운 방법을 제공하며, errors 객체는 유효성 검사 오류를 확인하고 표시하는 명확한 방법을 제공합니다. React Hook Form은 Yup, Joi와 같은 인기 있는 유효성 검사 라이브러리를 내장 지원합니다.

반면에 Formik은 사용자 정의 유효성 검사 함수를 사용한 선언적 접근 방식을 제공합니다. Formik의 validationSchema 속성을 사용하면 Yup 또는 다른 유효성 검사 라이브러리를 사용하여 유효성 규칙을 정의할 수 있으며, validate 속성을 사용하면 사용자 정의 유효성 검사 함수를 정의할 수 있습니다. Formik은 errors 및 touched 속성을 통해 간편한 오류 처리를 제공하여 사용자에게 유효성 검사 오류를 표시하는 데 도움을 줍니다.

React Hook Form과 Formik 모두 강력하고 유연한 유효성 검사 지원을 제공하며, 두 가지 중 선택은 특정 요구 사항과 선호도에 따라 다를 수 있습니다. 더 간결하고 가벼운 문법을 선호하는 경우 React Hook Form이 더 적합할 수 있습니다. 사용자 정의 유효성 검사 함수와 함께 선언적 접근 방식을 선호하는 경우 Formik이 더 나은 선택일 수 있습니다.

![React Hook Form vs Formik Friendly Comparison](/assets/img/ReactHookFormvsFormikAFriendlyComparison_6.png)

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

## 4. 생태계

Formik은 오랜 기간 동안 존재해 왔으며 React Hook Form과 비교했을 때 더 큰 커뮤니티와 생태계를 갖고 있습니다. 이는 Formik을 위한 리소스, 서드파티 통합 및 커뮤니티 지원이 풍부하다는 것을 의미합니다.

Formik은 2016년부터 사용 가능하며 몇 년 동안 주요 릴리즈를 여러 차례 진행했습니다. Formik에는 크고 활발한 커뮤니티가 있으며 이는 Formik의 성장과 인기에 기여했습니다. 결과적으로 Formik은 문서, 튜토리얼 및 커뮤니티 포럼을 포함한 다양한 리소스를 제공하고 있습니다.

반면에 React Hook Form은 2019년에 릴리스된 비교적 새로운 라이브러리입니다. 비교적 신규로 출시되었음에도 불구하고 많은 인기를 얻고 개발자 커뮤니티가 성장하고 있습니다. 이미 React Hook Form을 위한 문서, 튜토리얼 및 커뮤니티 포럼이 많이 제공되고 있습니다.

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

Formik은 더 큰 커뮤니티와 생태계를 가지고 있을지 모르지만, React Hook Form은 빠르게 성장하고 강력한 커뮤니티를 갖고 있습니다. 두 라이브러리 모두 폼 상태와 입력 컴포넌트를 효과적으로 관리할 수 있는 우수한 기능과 성능을 제공하며, 어떤 것을 선택할지는 당신의 특정한 요구 사항과 선호에 따라 다를 것입니다.

[React Hook Form vs Formik 친근한 비교](/assets/img/ReactHookFormvsFormikAFriendlyComparison_7.png)

# 결론

최종적으로, React Hook Form과 Formik 중 어떤 것을 선택할지는 여러분의 요구 사항과 선호에 따라 다를 것입니다. React Hook Form은 더 나은 성능과 더 간단한 API를 제공하여 성능을 우선시하는 개발자들과 hook에 익숙한 사람들에게 좋은 선택지입니다. 반면 Formik은 더 선언적인 접근 방식과 고수준의 추상화를 제공하여 폼과 작업을 보다 구조적으로 처리하고 싶은 개발자들에게 좋은 선택지입니다.

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

두 라이브러리를 실험해보고 어떤 것이 당신의 작업 흐름과 요구 사항에 가장 잘 맞는지 결정해보세요. 어떤 방법을 선택하든 React 애플리케이션에서 강력하고 많은 기능을 제공하는 양식을 만들 준비가 되어 있을 겁니다. 즐거운 코딩하세요! 😉
