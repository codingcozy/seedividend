---
title: "Formik과 Yup 라이브러리로 React 폼 유효성 검사를 간편하게 하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-SimplifyReactFormValidationsUsingFormikandYupLibraries_0.png"
date: 2024-06-22 01:59
ogImage: 
  url: /assets/img/2024-06-22-SimplifyReactFormValidationsUsingFormikandYupLibraries_0.png
tag: Tech
originalTitle: "Simplify React Form Validations Using Formik and Yup Libraries"
link: "https://medium.com/@codewithadurintiashok/simplify-react-form-validations-using-formik-and-yup-libraries-4f6571fe111f"
isUpdated: true
---




가끔 React 애플리케이션에서 유효성 검사를 구현하는 것은 꽤 짜증날 수 있어요. 최근 이 분야를 탐험해본 결과, Formik과 Yup이라는 두 라이브러리를 발견했어요.

**Formik**: Formik은 상태를 관리하는 데 도움이 되는 오픈 소스 라이브러리에요 (이렇게 생각해보세요: 필드 내용을 수정할 때, 필드 값이 자동으로 업데이트됩니다) 그리고 폼 제출을 처리합니다.

**Yup**: Yup은 검사를 효율적으로 간단하게 만드는 또 다른 오픈 소스 라이브러리에요.

유효성을 갖춘 어떤 형식으로든 폼을 만들 때, 최소한의 코드를 사용하여 이것을 달성하는 것은 다른 방법에 비해 불가능하다고 느낄 수 있어요. 이러한 라이브러리를 사용하는 목표는 기존 솔루션을 활용하는 것에요. 누군가 이미 작업을 완료했다면, 왜 우리는 처음부터 시작해야 할까요? 이 도구들을 사용해서 프로세스를 더 간단하고 정확하게 만들어봐요.

<div class="content-ad"></div>

위에 나온 사용자 작성 코드를 통해 회원 가입 페이지에 대해 설명해 드리겠습니다:

Formik 태그는 모든 코드를 감싸고 그 안의 각 필드 상태를 관리합니다. initialValues는 모든 필드의 기본값을 설정합니다. validationSchema은 Yup을 사용하여 각 필드를 유효성 검사합니다. 요구 사항에 따라 로직을 작성하는 스키마를 정의합니다. handleSubmit 함수는 폼이 제출될 때 트리거됩니다. isSubmitting 속성은 폼에 문제가 있거나 필드가 제대로 입력되지 않았을 때 버튼을 비활성화하는 데 도움을 줍니다. setSubmitting 함수는 제출 버튼이 활성화되거나 비활성화되는지 제어하는 상태를 변경하는 데 사용됩니다.

<div class="content-ad"></div>


![image](/assets/img/2024-06-22-SimplifyReactFormValidationsUsingFormikandYupLibraries_0.png)

참고: 오픈 소스를 활용하고, 그들의 신뢰성을 확인하고 적용하세요.
