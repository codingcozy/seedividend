---
title: "React 컴파일러 발견 최적화된 React 마법 탐험하기"
description: ""
coverImage: "/assets/img/2024-06-22-DiscoveringtheReactCompilerAFunJourneyintoOptimizedReactMagic_0.png"
date: 2024-06-22 03:09
ogImage: 
  url: /assets/img/2024-06-22-DiscoveringtheReactCompilerAFunJourneyintoOptimizedReactMagic_0.png
tag: Tech
originalTitle: "Discovering the React Compiler: A Fun Journey into Optimized React Magic"
link: "https://medium.com/@jason13201/discovering-the-react-compiler-a-fun-journey-into-optimized-react-magic-cce65d9a6c06"
---


안녕하세요, React 열정가 여러분! 오늘은 새로운 React 컴파일러에 관한 흥미로운 소식을 공유하려고 해요. React 팀에서 나온 이 편리한 도구는 React 앱을 자동으로 최적화해줍니다. 함께 React 컴파일러가 무엇인지, 시작하는 방법, 그리고 한번 시도해볼 가치가 있는 이유에 대해 알아보려고 해요.

# 공사 중 🚧

우선, React 컴파일러에 대한 문서 작업은 아직 진행 중입니다. 자세한 내용은 React 컴파일러 작업 그룹 레포를 확인해주세요. 하지만 지금은 전반적인 내용을 살펴볼까요?

# React 컴파일러란?

<div class="content-ad"></div>

React Compiler은 빌드 시간에 React 앱을 최적화하기 위해 설계된 실험적인 도구입니다. 커뮤니티로부터 피드백을 모으기 위해 오픈 소스로 제공되며 일반 JavaScript와 완벽하게 작동합니다. 최고의 점은 기존 코드를 다시 작성할 필요가 없다는 것입니다.

그러나 React Compiler를 사용하려면 React 19 RC가 필요합니다. 이전 버전에 머물러 있으면 해결책이 있지만 업그레이드하는 것이 가장 좋습니다.

# 컴파일러는 무엇을 하는가?

간단히 말해, React Compiler는 코드를 자동으로 메모이즈합니다. useMemo, useCallback 또는 React.memo를 사용해 본 적이 있다면 메모이제이션의 강력함을 알고 있을 것입니다. 컴파일러는 이를 자동으로 수행하여 효율적인 업데이트를 보장하며 별다른 노력없이 처리합니다.

<div class="content-ad"></div>

# Vite를 이용한 React 컴파일러 설정:

React 컴파일러를 Vite와 통합하는 것은 프로젝트의 성능을 크게 향상시킬 수 있는 간단한 과정입니다. 이 설정에서는 React 컴파일러를 쉽게 통합할 수 있는 방법을 보여주기 위해 샘플 프로젝트를 만들 것입니다. 이 설정은 Vite로 구동되는 React 앱에 React 컴파일러가 가져다주는 효율성과 속도 향상의 잠재적인 개선 사항을 보여줄 것입니다.

# 필수 조건

이전 버전과 호환되지 않으니 React 19 RC 이상을 사용하는지 확인해주세요.

<div class="content-ad"></div>

# 설치 및 설정

- 새로운 Vite 프로젝트를 만들기:

가장 먼저, 새로운 Vite 프로젝트를 만들어 봅시다. 터미널을 열고 다음 명령을 실행해 주세요:

```js
npm create vite@latest react-beta-test
```

<div class="content-ad"></div>

2. React 19 Beta 설치하기:

이제 방금 만든 디렉토리로 이동해서 React 19 Beta를 설치해봅시다.

```js
cd react-beta-test
npm install react@beta react-dom@beta
```

<div class="content-ad"></div>

TypeScript 팬 여러분, 여기 한 가지 팁이 있습니다. 모든 것이 조화롭게 맞물리도록 package.json 파일을 조금 조정해야 합니다.

```js
"dependencies": {
  "@types/react": "npm:types-react@alpha",
  "@types/react-dom": "npm:types-react-dom@alpha",
  "react": "^19.0.0-beta-94eed63c49-20240425",
  "react-dom": "^19.0.0-beta-94eed63c49-20240425"
},
"overrides": {
  "@types/react": "npm:types-react@alpha",
  "@types/react-dom": "npm:types-react-dom@alpha"
}
```

- Babel Plugin 설치:
- 다음으로, React 컴파일러를 활성화할 Babel 플러그인을 설치해야 합니다. 다음 명령어를 실행해주세요:

```js
npm install babel-plugin-react-compiler
```

<div class="content-ad"></div>

2. Vite 구성에 React 컴파일러 플러그인을 추가해보세요:

마지막으로, Vite가 React 컴파일러 플러그인을 사용하도록 구성해 봅시다. vite.config.js 파일을 열고 다음 구성을 추가하세요:

```js
// vite.config.js
ReactCompilerConfig = {};

export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler", ReactCompilerConfig],
          ],
        },
      }),
    ],
  };
});
```

# 파트 1: 컴파일러 및 useMemo 없이

<div class="content-ad"></div>

간단한 앱을 두 가지 상태로 가정해 봅시다: 숫자(n)와 카운터. 1부터 n까지 숫자의 합을 계산할 겁니다. useMemo 없이 이 계산은 컴포넌트가 다시 렌더링될 때마다 발생하게 됩니다. 카운터만 변경된 경우에도 그렇죠. 무엇이 발생하는지 확인해 볼까요? 함께 알아봐요!

# 컴포넌트 설정하기

우선, 두 개의 상태와 합을 계산하는 함수로 컴포넌트를 설정해 보겠습니다. App.jsx 파일의 코드를 바꿔서 결과를 확인해 보세요. ("use no memo"를 사용해서 컴파일러가 자동으로 메모이제이션하지 않게 합니다)

```js
"use no memo";
import React, { useState } from 'react';
const App = () => {
  const [number, setNumber] = useState(1);
  const [counter, setCounter] = useState(0);
  const calculateSum = (n) => {
    console.log('합을 계산 중...');
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };
  const sum = calculateSum(number);
  return (
    <div>
      <h1>1부터 {number}까지의 합: {sum}</h1>
      <button onClick={() => setNumber(number + 1)}>숫자 증가</button>
      <button onClick={() => setCounter(counter + 1)}>카운터 증가</button>
      <p>카운터: {counter}</p>
    </div>
  );
};
export default App;
```

<div class="content-ad"></div>

# 불필요한 재렌더링 관찰

이 설정에서는 "Increment Counter" 버튼을 클릭할 때마다 숫자가 변경되지 않았음에도 불구하고 calculateSum 함수가 실행됩니다. 콘솔을 확인해보세요 - 매번 "Calculating sum..."이 기록되는 것을 볼 수 있을 겁니다. 이것은 비효율적입니다! 숫자가 변경되지 않았다면 sum을 다시 계산하고 싶지 않습니다.

# 파트 2: 컴파일러 없이 useMemo 사용하기

여기서 마법이 벌어집니다. 숫자를 종속성으로 전달하여 calculateSum 호출을 useMemo로 감싸겠습니다.

<div class="content-ad"></div>

# useMemo 추가하기

컴포넌트를 최적화해보죠. number가 변경될 때에만 계산이 발생하도록 useMemo를 사용해보세요.

```js
"use no memo";
import React, { useState, useMemo } from 'react';
const App = () => {
  const [number, setNumber] = useState(1);
  const [counter, setCounter] = useState(0);
  const calculateSum = (n) => {
    console.log('계산 중...');
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };
  const sum = useMemo(() => calculateSum(number), [number]);
  return (
    <div>
      <h1>1부터 {number}까지의 합: {sum}</h1>
      <button onClick={() => setNumber(number + 1)}>숫자 증가</button>
      <button onClick={() => setCounter(counter + 1)}>카운터 증가</button>
      <p>카운터: {counter}</p>
    </div>
  );
};
export default App;
```

# 최적화 즐기기

<div class="content-ad"></div>

이제 useMemo가 적용되어 있어서 calculateSum 함수는 숫자가 변경될 때만 실행됩니다. 한 번 시도해보세요! "Increment Counter" 버튼을 클릭하고 콘솔을 확인해보세요. 불필요한 "Calculating sum..." 메시지가 사라졌죠. 높은 다섯! 🖐

# 파트 3: 컴파일러와 함께

상상해보세요: 프로젝트를 작업 중인데 useMemo를 추가하는 것을 깜빡했습니다. 걱정하지 마세요! 우리 마법같은 React 컴파일러가 자동으로 추가해 줍니다. 어떻게 작동하는지 보겠습니다. (우리는 "use no memo"를 사용하지 않기 때문에 컴파일러가 자체적으로 동작합니다)

# 마법 같은 컴파일러 동작 방식

<div class="content-ad"></div>

리액트 컴파일러를 사용하면, useMemo 없이 코드를 작성해도 컴포넌트가 자동으로 최적화됩니다. 다시 원본 코드를 확인해보겠습니다:

```js
import React, { useState } from 'react';
const SumComponent = () => {
  const [number, setNumber] = useState(1);
  const [counter, setCounter] = useState(0);
  const calculateSum = (n) => {
    console.log('Calculating sum...');
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };
  const sum = calculateSum(number);
  return (
    <div>
      <h1>Sum from 1 to {number}: {sum}</h1>
      <button onClick={() => setNumber(number + 1)}>Increment Number</button>
      <button onClick={() => setCounter(counter + 1)}>Increment Counter</button>
      <p>Counter: {counter}</p>
    </div>
  );
};
export default SumComponent;
```

# 최고 수준의 자동 최적화

![image](/assets/img/2024-06-22-DiscoveringtheReactCompilerAFunJourneyintoOptimizedReactMagic_0.png)

<div class="content-ad"></div>

컴파일러의 마법 덕분에 이 코드는 자동으로 변경되어 useMemo을 포함하여 효율적인 다시 렌더링을 보장해줍니다. 우리는 손가락 한 번 까딱하지 않아도 됩니다! 컴파일러는 필요한 곳에 useMemo를 추가하여 컴포넌트를 최적화합니다. 콘솔을 다시 확인해보세요 – "Calculating sum..." 메시지가 필요없어졌죠. 마치 성능 요정이 어깨에 앉아 있는 느낌이에요! 🧚‍♂️

# 해볼 가치가 있을까요?

React 컴파일러는 아직 실험 단계이며 베타 버전으로, 완전히 제품으로 출시되지는 않았습니다. Meta에서 이미 사용 중이지만, 여러분의 앱에 적합한지 여부는 코드가 React의 규칙을 얼마나 잘 준수하는지에 달려 있습니다.

컴파일러를 더 작은 프로젝트나 앱의 일부분에서 실험하는 것이 전체 앱에서 시도하는 것보다 좋은 아이디어입니다.

<div class="content-ad"></div>

# 마무리하며

React 컴파일러는 React 앱의 성능을 최적화해줄 것으로 기대되는 흥미로운 새로운 도구입니다. 아직 개발 중이고 베타 버전이지만, 앱 성능을 향상시키려는 열정을 가지고 있다면 탐색할 가치가 있습니다. 한번 시도해보고 생각을 공유해보세요!

이 개요가 React 컴파일러에 대해 흥미를 느끼게 해주기를 바랍니다. 궁금한 점이나 의견이 있으시면 언제든 댓글로 남겨주세요. 즐거운 코딩 되세요! 🎉