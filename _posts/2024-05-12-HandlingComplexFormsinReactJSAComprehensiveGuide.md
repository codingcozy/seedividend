---
title: "복잡한 형식을 다루는 방법 ReactJS에서의 종합 안내"
description: ""
coverImage: "/assets/img/2024-05-12-HandlingComplexFormsinReactJSAComprehensiveGuide_0.png"
date: 2024-05-12 23:10
ogImage: 
  url: /assets/img/2024-05-12-HandlingComplexFormsinReactJSAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Handling Complex Forms in ReactJS: A Comprehensive Guide"
link: "https://medium.com/@mudassar0920/handling-complex-forms-in-reactjs-a-comprehensive-guide-40bcb5c89ac0"
isUpdated: true
---




저는 React에서 양식 데이터를 쉽게 처리하는 기술에 대해 공유할 예정이에요.

![ReactJs에서 복잡한 양식 다루기 - 포괄적 가이드](/assets/img/2024-05-12-HandlingComplexFormsinReactJSAComprehensiveGuide_0.png)

저는 React에서 양식 데이터를 쉽게 처리하는 기술에 대해 공유할 예정이에요.

웹 애플리케이션을 구축할 때 양식을 효율적으로 처리하는 것은 중요합니다, 특히 양식이 복잡할 경우에요. 인기 있는 JavaScript 라이브러리인 ReactJS는 여러 입력 유형, 유효성 검사, 동적 양식 필드를 관리하기 위한 강력한 솔루션을 제공합니다. 이 가이드는 React에서 복잡한 양식을 효과적으로 처리하는 데 가장 좋은 방법과 방법론에 대해 안내해 드릴 거에요.



# 단계 1: 상태 초기화

복잡한 양식을 다룰 때 상태를 올바르게 구조화하는 것이 중요합니다. 각 키가 양식의 필드나 섹션에 해당하는 구조화된 객체를 사용하는 것을 고려해보세요. 예를 들어:

```js
const [formData, setFormData] = React.useState({
  fullName: '',
  age: null,
  skills: [],
  preferences: {},
  profileImage: null
});
```

# 단계 2: 필드에 [name] 속성 추가



영화 및 가격 필드에 [name] 속성을 추가해주세요.

영화 필드에는 [name] 속성의 값으로 'movie'를 넣어주세요.

가격 필드에는 [name] 속성의 값으로 'price'를 넣어주세요.

```js
<input name='movie' />
<input name='price' />
```



# 단계 3: 상태를 업데이트하는 함수 생성하기

여러 필드가 있는 양식의 경우, 입력 필드의 name 속성을 활용하여 일반적인 방법으로 변경 사항을 처리하세요:

```js
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};
```

## 동적 양식 필드



동적 섹션 관리를 위해서, 확장 가능한 기술 또는 경험 목록과 같은 데이터를 제어하려면 상태 안에 배열을 유지하고 이 배열을 기반으로 입력을 렌더링하면 됩니다. 아이템을 추가하거나 제거하는 함수를 제공하세요:

```js
const handleAddSkill = () => {
  setFormData(prevState => ({
    ...prevState,
    skills: [...prevState.skills, '']
  }));
};

const handleRemoveSkill = index => {
  setFormData(prevState => ({
    ...prevState,
    skills: prevState.skills.filter((_, i) => i !== index)
  }));
};
```

# 단계 4: 제출과 서버 상호작용

비동기 함수를 사용하여 양식 데이터를 서버로 보내는 양식 제출을 처리하세요:



```js
const handlePostData = async (e) => {
    e.preventDefault();
    let formD = new FormData();

    // 문자열, 숫자 및 기타 스칼라 값은 직접 추가합니다.
    formD.append('fullName', formData.fullName);
    formD.append('age', String(formData.age));  // 숫자를 문자열로 변환하여 FormData에 추가합니다.
    formD.append('volume', String(formData.volume));
    formD.append('startDate', formData.startDate);

    // 배열 요소를 개별적으로 추가합니다.
    formData.skills.forEach(skill => {
        formD.append('skills', skill.toString());
    });

    // 객체를 JSON 문자열로 추가합니다.
    formD.append('preferences', JSON.stringify(formData.preferences));

    // 파일을 직접 추가합니다.
    if (formData.profileImage instanceof File) {
        formD.append('profileImage', formData.profileImage, formData.profileImage.name);
    }
    if (formData.document instanceof File) {
        formD.append('document', formData.document, formData.document.name);
    }

    // fetch API 또는 유사한 방법으로 FormData를 전송합니다.
    try {
        const response = await fetch('/your-endpoint', {
            method: 'POST',
            body: formD,
            // FormData에 대해 Content-Type 헤더를 설정하지 마세요. 올바른 경계를 사용하는 'multipart/form-data'를 사용합니다.
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || '문제가 발생했습니다');
        }

        // 성공 처리
        console.log('양식이 성공적으로 제출되었습니다:', result);
        // 필요에 따라 양식을 재설정하거나 이동합니다.
    } catch (error) {
        console.error('제출 오류:', error.message);
    }
};
```

양식 필드는 onChange 이벤트를 통해 handleChange 함수를 호출해야 합니다.

```js
<input name='fullname' onChange={handleChange} />
<input name='age' onChange={handleChange} />
```

# React Component 라이브러리:




리액트 폼 생성은 프레임워크에 새롭다면 압도적으로 느껴질 수 있어요. 상태를 관리하고 입력을 처리하며 입력 데이터를 유효성 검증하는 등의 작업을 해야 해요.

하지만 제3자 라이브러리 덕분에 이러한 작업들을 쉽게 처리할 수 있어요. 이러한 라이브러리들은 폼 생성 과정을 간단하게 도와주는 다양한 기능들을 제공해요. 폼 유효성 검사, 입력 마스킹, 제출 처리, 오류 처리 등의 기능을 포함하고 있어요. 이를 통해 사용자 친화적이면서 기능적인 폼을 간편하게 작성할 수 있어요.

일부 인기 있는 폼 라이브러리로는 다음과 같은 것들이 있어요:

- Formik
- Redux Form
- React Hook Form
- Yup.



# 결론:

효율적인 웹 애플리케이션을 만들기 위해서는 React.js 폼 처리에 대한 전문 지식이 필수적입니다. 제 3자 라이브러리를 사용하든 React의 내장 기능을 사용하든, 이 매뉴얼에서 설명된 개념과 전략에 익숙해지면 React 앱을 위한 신뢰할 수 있고 사용자 친화적인 폼을 디자인할 수 있습니다.

이 글이 도움이 되었기를 바랍니다!

이메일: mudassar0920@gmail.com