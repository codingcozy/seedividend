---
title: "React Select 구현 및 커스터마이징 종합 안내서"
description: ""
coverImage: "/assets/img/2024-06-22-ImplementingandCustomizingReactSelectAComprehensiveGuide_0.png"
date: 2024-06-22 03:57
ogImage: 
  url: /assets/img/2024-06-22-ImplementingandCustomizingReactSelectAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Implementing and Customizing React Select: A Comprehensive Guide"
link: "https://medium.com/@walidkabou/implementing-and-customizing-react-select-a-comprehensive-guide-92d696ea5c35"
isUpdated: true
---




# React Select 구현 및 사용자 정의: 포괄적인 안내서

React Select은 React 애플리케이션에서 일반적인 선택 입력의 대체로 적응 가능하고 유연한 기능을 제공합니다. 이는 검색, 다중 선택, 그룹화 등 다양한 기능을 제공합니다. 이 안내서에서는 React Select를 React 컴포넌트에 구현하고 사용자 정의 스타일을 적용하는 단계를 안내합니다.

# React Select 설치

구현에 들어가기 전에 프로젝트에 React Select를 설치해보겠습니다. npm 또는 yarn을 사용하여 설치할 수 있습니다. 터미널을 열고 프로젝트 디렉토리로 이동한 다음 다음 명령 중 하나를 실행하십시오:

<div class="content-ad"></div>

```js
npm install react-select
```

또는

```js
yarn add react-select
```

React Select를 설치했으므로 이제 프로젝트에서 사용할 수 있습니다.

<div class="content-ad"></div>

# React Select 사용하기

React Select를 사용하려면 먼저 드롭다운 메뉴에 표시될 옵션을 정의해야 합니다. 각 옵션은 값(value)과 라벨(label)을 포함한 객체여야 합니다. 값은 옵션을 선택할 때 저장되는 값이고, 라벨은 드롭다운 메뉴에 표시되는 내용입니다.

옵션을 정의하는 예시는 다음과 같습니다:

```js
const options = [
    {
      value: "google",
      label: (
        <div>
          <FcGoogle className="mr-2 text-xl" />
        </div>
      ),
    },
    {
      value: "bing",
      label: (
        <div>
          <BiLogoBing className="mr-2 text-xl text-red-500" />
        </div>
      ),
    },
    {
      value: "yahoo",
      label: (
        <div>
          <BiLogoYahoo className="mr-2 text-xl text-yellow-500" />
        </div>
      ),
    },
];
```

<div class="content-ad"></div>

다음으로, React Select에서 Select 컴포넌트를 사용하고 옵션을 전달할 수 있습니다. 또한 옵션 선택을 처리하는 onChange 프롭에 함수를 전달해야 합니다. 이 함수는 선택한 옵션의 값을 컴포넌트의 상태로 업데이트해야 합니다.

다음은 Select 컴포넌트를 사용하는 예시입니다:

```js
const select = {
  <Select
    value={options.find((option) => option.value === selectedEngine)}
    options={options}
    styles={customStyles}
    isSearchable={false}
   />
}
```

# React Select 스타일링

<div class="content-ad"></div>

Select 컴포넌트의 외관을 사용자 정의하려면 styles 속성을 전달하면 됩니다. styles 속성은 각 키가 Select 컴포넌트의 일부에 해당하고 값이 해당 부분에 대한 스타일을 반환하는 함수인 객체입니다.

다음은 사용자 지정 스타일을 정의하는 예제입니다:

```js
const customStyles = {
    control: (provided) => ({
      ...provided,
      background: 'transparent',
      display: 'flex',
      flexWrap: 'nowrap',
      borderColor: 'hsl(0deg 78.56% 55.56%);',
      width: '7em'
    }),
    menu: (provided) => ({
      ...provided,
      background: 'transparent',
      width: '4em'
    }),
};
```

이 예에서 control 및 menu는 Select 컴포넌트의 일부에 해당하는 키입니다. 제공된 인수는 해당 부분의 기본 스타일이며 사용자 정의 스타일로 재정의할 수 있습니다.

<div class="content-ad"></div>

# React-Select에서 스타일링:

- HTML의 class 속성을 검사하기 위해 개발자 도구를 사용해보세요. 그런 다음 아래와 같이 스타일을 변경하기 위해 해당 속성을 대상으로 지정하세요:

```js
const customStyles = {
    control: (provided) => ({ // class 속성: class=" css-i32vvf-control"
      ...provided,
      background: 'transparent',
      display: 'flex',
      flexWrap: 'nowrap',
      borderColor: 'hsl(0deg 78.56% 55.56%);',
      width: '7em'
    }),
    menu: (provided) => ({ // 'menu'는 div의 class에서도 가져왔습니다.
      ...provided,
      background: 'transparent',
      width: '4em'
    }),
  };
```

함수 이름을 선택 기준으로 사용하려면 Select 속성에 포함하세요.

<div class="content-ad"></div>

```js
<Select
            styles={customStyles}
/>
```

# 결론

React Select는 많은 유연성과 사용자 정의 기능을 제공하여 React 애플리케이션에서 선택 입력을 구현하는 완벽한 선택입니다. 이 가이드를 통해 프로젝트에서 React Select를 구현하고 사용자 정의하는 방법을 배웠을 것입니다. 잘 디자인된 UI는 사용자 경험을 크게 향상시킬 수 있으며 React Select와 같은 컴포넌트는 그것을 달성하는 데 도움이 될 것입니다.

즐거운 코딩하세요!