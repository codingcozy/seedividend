---
title: "오늘 React 컴파일러를 사용해 봤는데, 결과가 "
description: ""
coverImage: "/assets/img/2024-06-22-ItriedReactCompilertodayandguesswhat_0.png"
date: 2024-06-22 04:52
ogImage: 
  url: /assets/img/2024-06-22-ItriedReactCompilertodayandguesswhat_0.png
tag: Tech
originalTitle: "I tried React Compiler today, and guess what… 😉"
link: "https://medium.com/@adevnadia/i-tried-react-compiler-today-and-guess-what-c0570ce10ecc"
isUpdated: true
---




<img src="/assets/img/2024-06-22-ItriedReactCompilertodayandguesswhat_0.png" />

이것은 아마도 내가 만든 가장 클릭베이트 스러운 제목일 것 같아요. 그러나 요즘의 React 커뮤니티에서 가장 혹평 받는 주제 중 하나에 대한 글은 이렇게 만들어야 한다고 느껴요 😅.

지난 두 년 반 동안, 리렌더링과 메모이제이션과 관련된 패턴을 언급하는 내용을 게시한 후에, 미래에서 온 방문자들이 댓글 섹션으로 내려와서 React Forget(지금은 React Compiler로 알려져 있음) 때문에 이전에 말한 내용이 더 이상 관련이 없다고 친절히 알려주곤 했어요.

이제 우리의 시간표가 그들의 시간표에 따라잡혔고, React Compiler가 실험적인 기능으로 실제로 일반 대중에게 출시되었으니, 앞으로 리액트에서는 메모이제이션을 잊을 수 있는지 여부를 조사해 봐야 할 때입니다.

<div class="content-ad"></div>

# 리액트 컴파일러란?

하지만 먼저, 매우 간단히 말하면, 이 컴파일러는 무엇이며 어떤 문제를 해결하며 어떻게 시작할 수 있는지에 대해 알아보겠습니다.

문제: 리액트에서의 다시 렌더링은 연쇄적입니다. 리액트 컴포넌트의 상태를 변경할 때마다 해당 컴포넌트의 다시 렌더링이 트리의 끝까지 도달할 때까지 해당 컴포넌트 내, 그 안에 있는 컴포넌트, 이와 같은 컴포넌트들의 컴포넌트 등이 다시 렌더링됩니다.

![이미지](/assets/img/2024-06-22-ItriedReactCompilertodayandguesswhat_1.png)

<div class="content-ad"></div>

만약 하위 다시 렌더링이 무겁거나 너무 자주 발생하면, 앱의 성능 문제를 야기할 수 있습니다.

이러한 성능 문제를 해결하는 한 가지 방법은 그 다시 렌더링 체인을 방지하는 것이며, 이를 위한 한 가지 방법은 메모이제이션을 사용하는 것입니다: React.memo, useMemo, 그리고 useCallback. 보통, 우리는 React.memo로 컴포넌트를 래핑하고, 모든 프롭스를 useMemo와 useCallback으로 감싸며, 부모 컴포넌트가 다음번 다시 렌더링될 때, 메모로 래핑된 컴포넌트는 다시 렌더링되지 않습니다.

그러나 이러한 도구를 올바르게 사용하는 것은 어렵습니다. 정말로 어렵습니다. 이 주제에 대해 몇 가지 기사를 작성하고 몇 개의 비디오를 제작했습니다. 만일 여러분이 지식을 시험해보고 싶다면 (How to useMemo and useCallback: you can remove most of them, Mastering memoization in React — Advanced React course, Episode 5).

여기서 React 컴파일러가 등장합니다. 컴파일러는 React 코어 팀에 의해 개발된 도구입니다. 이 도구는 빌드 시스템에 통합되어 원본 컴포넌트 코드를 가져와 컴포넌트, 그 프롭스, 그리고 훅의 의존성이 기본적으로 메모이제이션되도록 코드로 변환하려고 노력합니다. 최종 결과는 모든 것을 memo, useMemo 또는 useCallback으로 감싸는 것과 유사합니다.

<div class="content-ad"></div>

이것은 단지 그것을 이해하기 위해 대략적인 것일 뿐이에요. 실제로는 훨씬 더 복잡한 변환을 합니다. Jack Herrington이 최근 비디오에서 이에 대한 좋은 개요를 제시했어요(React Compiler: In-Depth Beyond React Conf 2024), 실제 세부 내용을 알고 싶다면 보는 것을 권해드려요. 혹은, 굉장히 복잡한 것을 체감하고 싶다면 "React Compiler Deep Dive" 토크에서 Sathya Gunasekaran이 컴파일러를 설명하고 Mofei Zhang이 20분 동안 실시간 코딩하는 것을 보세요. 🤯

만약 여러분이 직접 컴파일러를 시도해 보고 싶다면, 문서를 따라가보세요: https://react.dev/learn/react-compiler. 이미 충분히 잘 작성되어 있고 필요한 모든 내용과 어떻게 해야 하는지 담겨 있어요. 기억하세요: 이것은 아직 실험 단계인 것으로, React의 캐너리 버전을 설치하는 것을 기반으로 하고 있으니 조심하세요.

준비는 여기까지에요. 이제 이것이 무엇을 할 수 있는지 그리고 실제로 어떻게 작동하는지 살펴봐 볼까요?

# 컴파일러 시도하기

<div class="content-ad"></div>

저에게 이 기사의 주요 목적은 컴파일러에 대한 우리의 기대가 현실과 일치하는지 조사하는 것이었습니다. 현재의 약속은 무엇인가요?

- 컴파일러는 플러그 앤 플레이입니다: 설치하고 그냥 작동합니다. 기존 코드를 다시 작성할 필요가 없습니다.
- React.memo, useMemo 및 useCallback에 대해 설치한 후에는 다시 생각할 필요가 없습니다: 필요가 없을 것입니다.

이러한 가정을 테스트하기 위해 제가 몇 가지 간단한 예제를 독립적으로 컴파일러를 테스트하는 데 구현하고, 그런 다음 사용 가능한 세 가지 다른 앱에서 실행했습니다.

## 단순 예제: 독립적으로 컴파일러 테스트하기

<div class="content-ad"></div>

간단한 예제의 전체 코드는 여기에서 확인할 수 있습니다: https://github.com/developerway/react-compiler-test

컴파일러를 처음부터 시작하는 가장 쉬운 방법은 Next.js의 캐너리 버전을 설치하는 것입니다. 기본적으로 이 작업은 필요한 모든 것을 제공할 것입니다:

```js
npm install next@canary babel-plugin-react-compiler
```

그런 다음, next.config.js에서 컴파일러를 켤 수 있습니다.

<div class="content-ad"></div>

```js
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
};

module.exports = nextConfig;
```

그리고 와라! React Dev Tools 에서 자동으로 메모이제이션된 컴포넌트를 즉시 볼 수 있습니다.

<img src="/assets/img/2024-06-22-ItriedReactCompilertodayandguesswhat_2.png" />

지금까지의 가정이 맞았습니다: 설치는 매우 간단하고 그냥 작동합니다.

<div class="content-ad"></div>

코드 작성을 시작해봅시다. 컴파일러가 어떻게 처리하는지 확인해 봅시다.

## 첫 번째 예시: 간단한 상태 변경.

```js
const SimpleCase1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        다이얼로그 전환
      </button>
      {isOpen && <Dialog />}
      <VerySlowComponent />
    </div>
  );
};
```

우리는 modal dialog가 열려 있는지 여부를 제어하는 isOpen 상태 변수를 가지고 있으며, 동일한 컴포넌트에서 렌더링된 VerySlowComponent가 있습니다. 일반 React 동작은 isOpen 상태가 변경될 때마다 VerySlowComponent를 다시 렌더링하므로, dialog가 지연되어 팝업하는 것을 볼 수 있습니다.

<div class="content-ad"></div>

일반적으로 이러한 상황을 메모이제이션을 사용하여 해결하려면 (물론 다른 방법도 있지만), React.memo로 VerySlowComponent를 감싸야 합니다:

```js
const VerySlowComponentMemo = React.memo(VerySlowComponent);

const SimpleCase1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      ...
      <VerySlowComponentMemo />
    </>
  );
};
```

컴파일러를 사용하면 순수한 마법입니다: React.memo를 제거해도 개발 도구에서 VerySlowComponent가 메모이제이션되어 있고 딜레이가 사라지며, VerySlowComponent 내부에 console.log를 넣으면 상태 변경시 다시 렌더링되지 않음을 확인할 수 있습니다.

[이 예제의 전체 코드는 여기에서 확인할 수 있습니다.](링크)

<div class="content-ad"></div>

## 두 번째 예시: 느린 컴포넌트의 속성(props).

지금까지는 잘 진행되었지만, 이전 예시는 가장 간단한 것이었습니다. 조금 더 복잡하게 만들어서 등식에 props을 소개해 봅시다.

아주 느린 컴포넌트인 VerySlowComponent가 함수를 기대하는 onSubmit prop과 배열을 수용하는 data prop을 가지고 있다고 가정해 봅시다:

```js
const SimpleCase2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = () => {};
  const data = [{ id: 'bla' }];

  return (
    <>
      ...
      <VerySlowComponent onSubmit={onSubmit} data={data} />
    </>
  );
};
```

<div class="content-ad"></div>

지금 수동 메모이제이션의 경우에는 React.memo로 VerySlowComponent를 감싸는 것 외에도 배열을 useMemo로 감싸고 (어떤 이유로 이를 바깥쪽으로 옮기지 못한다는 것을 가정해 봅시다) onSubmit을 useCallback으로 감싸야 합니다:

```js
const VerySlowComponentMemo = React.memo(VerySlowComponent);

export const SimpleCase2Memo = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 여기에 메모이제이션
  const onSubmit = useCallback(() => {}, []);

  // 여기에 메모이제이션
  const data = useMemo(() => [{ id: 'bla' }], []);

  return (
    <div>
      ...
      <VerySlowComponentMemo
        onSubmit={onSubmit}
        data={data}
      />
    </div>
  );
};
```

그러나 Compiler를 사용하는 경우에는 그렇게 할 필요가 없습니다! VerySlowComponent는 여전히 React 개발 도구에서 메모이제이션된 상태로 표시되며, 그 안에 있는 "control" console.log가 여전히 실행되지 않습니다.

이 저장소에서 이러한 예제를 로컬에서 실행할 수 있습니다.

<div class="content-ad"></div>

## 세 번째 예시: 자식 요소로 요소들.

알겠어요, 세 번째 예시입니다. 실제 앱을 테스트하기 전에 처리할 내용입니다. 거의 아무도 제대로 메모이즈를 할 수 없는 경우는 어떻게 할까요? 만약 우리의 느린 컴포넌트가 자식 요소를 받는다면 어떨까요?

```js
export const SimpleCase3 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      ...
      <VerySlowComponent>
        <SomeOtherComponent />
      </VerySlowComponent>
    </>
  );
};
```

머릿속으로 바로 VerySlowComponent를 올바르게 메모이즈하는 방법을 기억할 수 있나요?

<div class="content-ad"></div>

대부분의 사람들은 VerySlowComponent와 SomeOtherComponent를 모두 React.memo로 감싸야 한다고 생각할 것입니다. 하지만 이것은 틀렸어요. 우리는 대신에 `SomeOtherComponent /` 요소를 useMemo로 감싸야 합니다. 아래처럼요:

```js
const VerySlowComponentMemo = React.memo(VerySlowComponent);

export const SimpleCase3 = () => {
  const [isOpen, setIsOpen] = useState(false);

  // React.memo 대신 useMemo를 사용하여 자식 요소 메모이제이션
  const child = useMemo(() => <SomeOtherComponent />, []);

  return (
    <>
      ...
      <VerySlowComponentMemo>{child}</VerySlowComponentMemo>
    </>
  );
};
```

만약 왜 이렇게 하는지 확신이 들지 않는다면, 이 비디오를 시청해보세요. 이 비디오에서 메모이제이션에 대해 자세히 설명하고, 이 패턴도 다루고 있어요: Mastering memoization in React — Advanced React course, Episode 5. 또한 이 글도 유용할 것입니다: The mystery of React Element, children, parents and re-renders

다행히 React 컴파일러는 여기서도 마법을 부릅니다 ✨! 모든 것이 메모이제이션되어, 매우 느린 컴포넌트는 다시 렌더링되지 않습니다.

<div class="content-ad"></div>

세 번의 시도 가운데 세 번 모두 성공하셨네요, 인상적입니다! 하지만 그 예시들은 매우 간단했죠. 현실에서는 쉬운 것이 그렇게 많지 않죠? 이제 진짜 도전을 해보겠습니다.

# 실제 코드에서 컴파일러 테스트하기

컴파일러에 진짜 도전을 주기 위해, 저는 제가 가지고 있는 세 개의 코드베이스에서 테스트를 진행했습니다.

- 앱 하나: 몇 년 전에 만들어진 상당히 큰 React, React Router & Webpack 기반 앱으로, 여러 사람이 작성한 코드입니다.
- 앱 둘: 조금 더 최근에 만들어진데도 여전히 상당히 큰 React & Next.js 앱으로, 여러 사람이 작성한 코드입니다.
- 앱 셋: 제 개인 프로젝트로, 매우 최근에 시작했고, 최신 Next.js를 사용하며, 아주 작습니다 — 몇 개의 CRUD 작업을 수행하는 화면이 몇 개 있습니다.

<div class="content-ad"></div>

각 앱에 대해 다음을 수행했습니다:

- 초기 건강 점검을 통해 컴파일러를 위한 앱의 준비 상태를 확인했습니다.
- Compiler의 eslint 규칙을 활성화하고 전체 코드베이스에서 실행했습니다.
- React 버전을 19 canary로 업데이트했습니다.
- 컴파일러를 설치했습니다.
- 컴파일러를 켜기 전에 불필요한 다시 렌더링의 몇 가지 명백한 경우를 식별했습니다.
- 컴파일러를 켜고 해당 불필요한 다시 렌더링이 해결되었는지 확인했습니다.

## App One에서 Compiler를 테스트한 결과

이 앱은 아마도 React 부분의 전체 코드의 약 15만 줄 정도일 것으로 예상됩니다. 이 앱에는 10 개의 명확한 불필요한 다시 렌더링 사례를 식별했습니다. 그 중 일부는 전체 헤더 구성 요소를 전체 다시 렌더링하는 것과 같이 매우 사소한 것이었습니다. 또 다른 것은 입력 필드에 타이핑할 때 전체 페이지를 다시 렌더링하는 것과 같이 좀 더 큰 사례였습니다.

<div class="content-ad"></div>

- 초기 건강 진단: 구성 요소의 97.7%가 컴파일될 수 있었습니다! 호환되지 않는 라이브러리는 없습니다.
- Eslint 체크: 규칙 위반이 20건 발견되었습니다.
- React 19 업데이트: 몇 가지 사소한 문제가 발생했지만 주석 처리한 후에는 앱이 잘 작동하는 것 같았습니다.
- 컴파일러 설치: 이 과정에서 몇 가지 문제가 발생하여 ChatGPT의 도움이 필요했습니다. 오랜만에 Webpack이나 Babel과 관련된 것을 다루어 본 것이라 그런 것 같아요. 하지만 결국 성공했습니다.
- 앱 테스트: 10가지 불필요한 재랜더링 중... 컴파일러가 해결한 것은 2가지뿐이네요 😢

10가지 중 2가지만 해결된 결과는 상당히 실망스러웠습니다. 그런데 이 앱에는 아직 수정하지 않은 eslint 위반이 있습니다. 그게 그 이유일까요? 다음 앱을 살펴보겠습니다.

## 두 번째 앱에서 컴파일러 테스트 결과

이 앱은 훨씬 작아요, 대략 30,000줄 정도의 React 코드로 이루어져 있습니다. 여기에서도 10가지 불필요한 재랜더링을 확인했어요.

<div class="content-ad"></div>

- 초기 건강 확인: 동일 결과, 97.7% 구성 요소가 컴파일될 수 있었습니다.
- Eslint 확인: 단 하나의 규칙 위반만 발견되었어요! 🎉 완벽한 후보입니다.
- React 19 업데이트 및 Compiler 설치: 이를 위해 Next.js를 canary 버전으로 업데이트해야 했는데, 그 외는 Next.js가 해결해주었습니다. 설치 후에는 바로 작동되었고, Webpack 기반 앱을 업데이트하는 것보다 훨씬 쉬웠어요.
- 앱 테스트: 불필요한 재랜더링 10가지 중 2가지만 구체적으로 컴파일러에 의해 수정되었습니다 😢

10가지 중 2가지 또한! 완벽한 후보겠죠… 다소 실망스럽네요. 실제 상황과 합성 “카운터” 예제의 대립입니다. 문제를 해결하기 전에 세 번째 앱을 살펴보겠습니다.

## 세 번째 앱에서 Compiler 테스트: 결과

이것은 모두 중에서 가장 작은 앱이며, 주말 또는 몇 주 동안 작성되었습니다. 데이터 테이블이 있는 몇 개 페이지와 테이블에서 엔티티를 추가/편집/제거할 수 있는 기능만 있어요. 앱 전체가 아주 작고 간단해서, 내가 식별한 불필요한 재랜더링이 8가지뿐이었습니다. 모든 상호작용에 대해 모든 것이 다시 렌더링되며, 어떠한 최적화 역시 하지 않았습니다.

<div class="content-ad"></div>

리액트 컴파일러에게 재랜더링 상황을 크게 개선할 수 있는 좋은 주제네요!

- 초기 건강 점검: 100%의 컴포넌트가 컴파일될 수 있습니다.
- Eslint 점검: 어긋남이 없어요 🎉
- 리액트 19 업데이트 & 컴파일러 설치: 이전 것보다 놀랍게도 더 나빠졌어요. 사용한 몇 가지 라이브러리가 아직 리액트 19와 호환되지 않아서 경고를 무시하기 위해 종속성을 강제로 설치해야 했어요. 하지만 실제 앱과 모든 라이브러리는 여전히 작동했으므로 큰 문제는 없었어요, 아마도요.
- 앱 테스트: 불필요한 재랜더링 8건 중에, 리액트 컴파일러가 고칠 수 있었던 것은… 덩실 덩실… 하나. 딱 하나! 🫠 이 시점에서 거의 울고 싶어진 건 이 테스트를 위해서 큰 희망을 품었었기 때문이었어요.

이건 예전 냉소적인 성향이 예상했지만, 어린애 같은 내면은 기대하지 않았던 것이에요. 아마 난 리액트 코드를 잘못 작성하고 있는 걸까요? 컴파일러의 메모이제이션 결과를 조사하고, 어떻게 고칠 수 있는지 알아볼까요?

# 컴파일러에 의한 메모이제이션 결과 조사

<div class="content-ad"></div>

이슈를 유용하게 디버그하기 위해 세 번째 앱의 페이지 중 하나를 별도의 저장소로 추출했습니다. 여기서 확인할 수 있습니다: (https://github.com/developerway/react-compiler-test/) 제 생각을 따라가보고 코드 실습도 해보고 싶다면 들어가보세요. 세 번째 앱의 페이지 중 하나와 거의 동일한데, 가짜 데이터와 몇 가지 제거된 부분(SSR과 같은 것)이 있어서 디버깅 경험을 간소화했습니다.

UI는 매우 간단합니다. 국가 목록이 있는 테이블, 각 행마다 "삭제" 버튼, 그리고 테이블 아래에 있는 입력 컴포넌트로 새로운 국가를 목록에 추가할 수 있습니다.


![테이블](/assets/img/2024-06-22-ItriedReactCompilertodayandguesswhat_3.png)


코드적으로는 하나의 컴포넌트만 있는데, 상태, 쿼리 및 뮤테이션도 있습니다. 전체 코드는 여기 있습니다. 조사에 필요한 필수 정보만 있는 간소화된 버전은 다음과 같습니다:

<div class="content-ad"></div>

```js
export const Countries = () => {
  // input에서 입력한 내용을 저장합니다
  const [value, setValue] = useState("");

  // react-query를 사용하여 국가 전체 목록을 가져옵니다
  const { data: countries } = useQuery(...);

  // react-query를 사용하여 국가를 삭제하는 뮤테이션
  const deleteCountryMutation = useMutation(...);

  // react-query를 사용하여 국가를 추가하는 뮤테이션
  const addCountryMutation = useMutation(...);

  // "delete" 버튼에 전달되는 콜백
  const onDelete = (name: string) => deleteCountryMutation.mutate(name);

  // "add" 버튼에 전달되는 콜백
  const onAddCountry = () => {
    addCountryMutation.mutate(value);
    setValue("");
  };

  return (
    ...
      {countries?.map(({ name }, index) => (
        <TableRow key={`${name.toLowerCase()}`}>
          ...
          <TableCell className="text-right">
            <!-- onDelete이 여기에 있습니다 -->
            <Button onClick={() => onDelete(name)} variant="outline">
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    ...
    <Input
      type="text"
      placeholder="새로운 국가 추가"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    <button onClick={onAddCountry}>추가</button>
  );
};
```

이 컴포넌트는 로컬 상태와 쿼리/뮤테이션 업데이트가 모두 있는 하나의 컴포넌트이기 때문에 모든 상호작용 시마다 다시 렌더링됩니다. 앱을 시작하면 다음과 같이 불필요한 다시 렌더링이 발생합니다:

- "새로운 국가 추가" 입력란에 입력하는 동안 모든 것이 다시 렌더링됩니다.
- "삭제"를 클릭하면 모든 것이 다시 렌더링됩니다.
- "추가"를 클릭하면 모든 것이 다시 렌더링됩니다.

이런 간단한 컴포넌트의 경우, 컴파일러가 이를 모두 해결해 줄 것으로 기대됩니다. 특히 React Dev Tools에서 모든 것이 메모이제이션되어 있는 것을 고려할 때요.

<div class="content-ad"></div>


![React Compiler](/assets/img/2024-06-22-ItriedReactCompilertodayandguesswhat_4.png)

하지만 "컴포넌트 렌더링 시 업데이트 강조" 설정을 활성화해보고 멋진 빛쇼를 즐기세요.

![Light Show](https://miro.medium.com/v2/resize:fit:1076/0*XrqU0579UN-SXWgm.gif)

테이블 내 모든 컴포넌트에 console.log를 추가하면 헤더 컴포넌트를 제외한 모든 것이 모든 원천에서 상태 업데이트 시 다시 렌더링됩니다.


<div class="content-ad"></div>

왜 그러한지 조사하는 방법은 무엇인가요? 🤔

리액트 개발 도구에서 추가 정보를 제공하지 않습니다. 저는 그 컴포넌트를 Compiler Playground로 복사하여 무슨 일이 일어나는지 확인할 수 있겠죠… 하지만 결과를 보세요! 😬 그건 잘못된 방향으로 나아가는 것 같고, 솔직히 말해서, 가장 할 일이 아닌 것 같아요.

머릿속에 떠오르는 유일한 방법은 테이블을 점진적으로 메모화하고 컴포넌트나 종속성에 이상이 있는지 확인하는 것입니다.

# 수동 메모화를 통한 조사

<div class="content-ad"></div>

이 부분은 모든 수동 메모이제이션 기술이 어떻게 작동하는지 완전히 이해하는 사람을 대상으로 합니다. React.memo, useMemo 또는 useCallback에 대해 불편하게 느낀다면, 먼저 이 비디오를 시청하는 것을 추천합니다.

또한, 코드를 로컬로 열고(https://github.com/developerway/react-compiler-test) 코드 연습을 해보는 것을 추천드립니다. 이렇게 하면 아래의 사고 과정을 더 쉽게 따를 수 있습니다.

## 입력란에 타이핑해 보면서 렌더링을 조사하기

우리는 다시 테이블을 자세히 살펴보겠습니다:

<div class="content-ad"></div>

```js
<Table>
  <TableCaption>지원되는 국가 목록.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[400px]">이름</TableHead>
      <TableHead className="text-right">동작</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {countries?.map(({ name }, index) => (
      <TableRow key={`${name.toLowerCase()}`}>
        <TableCell className="font-medium">
          <Link href={`/country/${name.toLowerCase()}`}>
            {name}
          </Link>
        </TableCell>
        <TableCell className="text-right">
          <Button
            onClick={() => onDelete(name)}
            variant="outline"
          >
            삭제
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

헤더 컴포넌트가 메모이즈되어 있어서, 컴파일러가 무슨 일을 했는지 알 수 있었습니다: 아마도 모든 컴포넌트를 React.memo와 같은 방식으로 감쌌을 것이고, TableBody 내부의 일부는 useMemo와 유사한 것으로 메모이즈되었을 것입니다. 그리고 useMemo와 비슷한 것이 그 종속성 중 하나가 모든 다시 렌더링 때마다 업데이트되어 TableBody 내의 모든 것을 다시 렌더링하도록 유도했을 거라고 생각됩니다. 최소한 테스트해볼만한 가설입니다.

만약 해당 내용 부분을 메모이제이션한다면 어떤 단서를 제공할 수 있을지 확인해보겠습니다:

```js
// TableBody의 전체 내용을 메모이즈
const body = useMemo(
  () =>
    countries?.map(({ name }, index) => (
      <TableRow key={`${name.toLowerCase()}`}>
        <TableCell className="font-medium">
          <Link href={`/country/${name.toLowerCase()}`}>
            {name}
          </Link>
        </TableCell>
        <TableCell className="text-right">
          <Button
            onClick={() => onDelete(name)}
            variant="outline"
          >
            삭제
          </Button>
        </TableCell>
      </TableRow>
    )),
  // 이 부분은 그 코드 덩어리에서 사용되는 종속성들입니다.
  // eslint를 감사하게 생각합니다!
  [countries, onDelete],
);
```

<div class="content-ad"></div>

이제 전체 부분이 데이터의 countries 배열과 onDelete 콜백에 의존함을 명확히 알 수 있습니다. countries 배열은 쿼리에서 가져오기 때문에 매번 다시 렌더링될 수 없습니다. 이를 캐싱하는 것이 라이브러리의 주요 책임 중 하나입니다.

onDelete 콜백은 다음과 같이 생겼습니다:

```js
const onDelete = (name: string) => {
  deleteCountryMutation.mutate(name);
};
```

이것이 의존성으로 들어가려면 memoized 되어야 합니다:

<div class="content-ad"></div>

```js
const onDelete = useCallback(
  (name: string) => {
    deleteCountryMutation.mutate(name);
  },
  [deleteCountryMutation],
);
```

그리고 deleteCountryMutation은 다시 react-query의 뮤테이션입니다, 그러니까 괜찮습니다:

```js
const deleteCountryMutation = useMutation({...});
```

마지막 단계는 TableBody를 메모이즈하고 메모이즈된 자식을 렌더링하는 것입니다. 모든 것이 올바르게 메모이즈되었다면, 입력란에 타이핑할 때 행과 셀의 재렌더링이 멈추어야 합니다.

<div class="content-ad"></div>

```js
const TableBodyMemo = React.memo(TableBody);

// Countries 내부에서 이것을 렌더링하세요
<TableBodyMemo>{body}</TableBodyMemo>;
```

그리고 안 됐네요 🤦🏻‍♀️ 이제 좀 진전이 있네요 — 의존성에서 무언가를 엉망으로 만들어놨나 봅니다, 아마 컴파일러도 똑같이 한게겠죠. 그런데 무엇이 문제일까요? 국가들 이외에 제가 가진 유일한 의존성은 deleteCountryMutation 이에요. 그것을 사용하는 게 안전하다고 가정했는데, 정말일까요? 실체가 무엇인지 알아야겠네요. 다행히 소스 코드를 확인할 수 있어요. useMutation 은 많은 일을 하는 후크로서 다음을 반환합니다:

```js
const mutate = React.useCallback(...);

return { ...result, mutate, mutateAsync: result.mutate };
```

반환값은 memoized되지 않은 객체야요!! 단순히 의존성으로 사용할 수 있다고 가정했던 것이 잘못된 판단이었네요.

<div class="content-ad"></div>

mutate 함수 자체가 기억화(memoized)되어 있습니다. 이론상으로는, 의존성에 전달하는 것만으로 충분할 것 같아요:

```js
// 반환된 객체에서 mutate 추출하기
const { mutate: deleteCountry } = useMutation(...);

// 의존성으로 전달하기
const onDelete = useCallback(
  (name: string) => {
    // 여기서 바로 사용
    deleteCountry(name);
  },
  // 안녕, memoized 의존성
  [deleteCountry],
);
```

위 단계를 거치면, 우리의 수동 메모화가 최종적으로 작동합니다.

이제 이 단계를 거치면, 이론상으로 모든 수동 메모화를 제거하고 mutate 수정만 남기면, React 컴파일러가 이를 인식할 수 있어야 합니다.

<div class="content-ad"></div>

정말 그렇죠! 이제 텍스트를 입력할 때 테이블 행과 셀이 더 이상 다시 렌더링되지 않네요 🎉

<img src="https://miro.medium.com/v2/resize:fit:800/0*6EAVCBR4lWCY3mQE.gif" />

하지만 "추가" 및 "삭제"를 할 때 재렌더링이 여전히 발생합니다. 이 부분도 수정해봐요.

## "추가" 및 "삭제" 재렌더링 조사하기

<div class="content-ad"></div>

테이블 태그는 다음과 같이 Markdown 형식으로 변경해보겠습니다.


| TableBody |
| --- |
| {countries?.map(({ name }, index) => ( |
|   | <TableRow key={index}> |
|   |   <TableCell className="font-medium"> |
|   |     <Link href={`/country/${name.toLowerCase()}`}> |
|   |       {name} |
|   |     </Link> |
|   |   </TableCell> |
|   |   <TableCell className="text-right"> |
|   |     <Button |
|   |       onClick={() => onDelete(name)} |
|   |       variant="outline"|
|   |     > |
|   |       Delete |
|   |     </Button> |
|   |   </TableCell> |
|   </TableRow> |
| ))} |


<div class="content-ad"></div>

먼저, "key" 속성을 배열의 위치가 아니라 국가와 일치하도록 확인하세요. 인덱스는 사용하지 마세요. 목록의 처음에서 국가를 제거하면 아래의 모든 행의 인덱스가 변경되어 메모이제이션이 강제로 다시 렌더링되게 됩니다. 실제로는 각 국가를 위한 어떤 종류의 ID를 도입해야 할 것입니다. 우리 간소화된 경우에서는 이름을 사용하고 중복 이름을 추가하지 않도록 해야 합니다. 키는 고유해야 합니다.

```js
{
  countries?.map(({ name }) => (
    <TableRow key={name}>...</TableRow>
  ));
}
```

둘째, TableRow를 React.memo로 래핑하세요. 쉽죠.

```js
const TableRowMemo = React.memo(TableRow);
```

<div class="content-ad"></div>

TableRow의 자식 요소를 useMemo로 메모이제이션하세요:

```js
{
  countries?.map(({ name }) => (
    <TableRow key={name}>
      ... // 여기 안의 모든 것을 useMemo로 메모이제이션해야 합니다
      with useMemo
    </TableRow>
  ));
}
```

렌더 함수 내부에 있기 때문에 불가능합니다: 훅은 컴포넌트의 맨 위에서 render 함수 외부에서만 사용할 수 있습니다.

이를 해결하기 위해 TableRow 전체 내용을 컴포넌트로 추출해야 합니다:

<div class="content-ad"></div>

```js
const CountryRow = ({ name, onDelete }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link href={`/country/${name.toLowerCase()}`}>
          {name}
        </Link>
      </TableCell>
      <TableCell className="text-right">
        <Button
          onClick={() => onDelete(name)}
          variant="outline"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
```

다음과 같이 props를 통해 데이터를 전달해주세요:

```js
<TableBody>
  {countries?.map(({ name }) => (
    <CountryRow
      name={name}
      onDelete={onDelete}
      key={name}
    />
  ))}
</TableBody>
```

그리고 CountryRow를 React.memo로 감싸주세요. onDelete은 이미 메모이제이션되어 있습니다 - 우리가 이미 수정했어요.


<div class="content-ad"></div>

매뉴얼 메모이제이션을 구현할 필요가 없었어요. 그 행들을 컴포넌트로 추출하기만 하자마자 컴파일러가 즉시 이를 감지하여 다시 렌더링이 멈춰버렸어요 🎉. 인간 대 기계 전투에서 2 대 0!

재미있게도, 컴파일러는 CountryRow 컴포넌트 내부의 모든 것을 감지할 수 있지만 컴포넌트 자체는 감지하지 못해요. 매뉴얼 메모이제이션을 제거하지만 키와 CountryRow 변경은 유지하면, 셀과 행은 추가/삭제 시 더 이상 다시 렌더링되지 않지만 CountryRow 컴포넌트 자체는 여전히 다시 렌더링돼요.

이 시점에서는 컴파일러로 이 문제를 해결할 아이디어가 부족하고, 이미 충분한 자료가 되었으니 그냥 다시 렌더링하도록 할게요. 내부의 모든 것은 메모이제이션되어 있으니 큰 문제는 아니에요.

# 그럼 판단은 뭘까요?

<div class="content-ad"></div>

컴파일러는 간단한 경우와 구성 요소에서 놀라운 성능을 보여줍니다. 3번 시도 중 3번 모두 맞았어요! 하지만 현실은 조금 더 복잡해요.

제가 시도한 3개 앱 모두에서 컴파일러가 불필요한 다시 렌더링 여부를 판단한 8-10개의 경우 중 1-2개만 고칠 수 있었어요.

하지만 추론력과 짐작으로 결과를 개선할 수 있을 것으로 보이며, 코드를 약간 수정함으로써 가능합니다. 하지만 이를 조사하는 것은 매우 어렵고 창의적인 사고와 React 알고리즘 및 기존 메모이제이션 기술에 대한 숙련이 요구돼요.

컴파일러의 동작을 개선하기 위해 기존 코드를 수정해야 했던 변경 사항:

<div class="content-ad"></div>

- useMutation 훅의 반환 값에서 mutate를 추출하여 코드에 직접 사용하십시오.
- TableRow 및 내부 모든 것을 분리된 컴포넌트로 추출하십시오.
- "key"를 index에서 name으로 변경하십시오.

코드 변화를 확인하고 앱을 직접 체험해보세요.

제가 조사한 가정에 대해:

그냥 작동합니까? 기술적으로, 네. 그냥 켜놓기만 하면 깨진 것 같지 않습니다. 그러나 React Dev Tools에서 메모이즈된 것처럼 보이지만 모든 것을 올바르게 메모이즈하지는 않습니다.

<div class="content-ad"></div>

컴파일러를 설치한 후 메모, useMemo, useCallback을 잊어버릴 수 있을까요? 절대 그렇지 않아요! 적어도 현재 상태에서는 아닌 것 같아요. 실제로, 지금보다 더 잘 알아야 할 필요성이 있고, 컴파일러에 최적화된 컴포넌트를 작성할 수 있는 감각을 키워나가야 해요. 또는 디버그할 때 다시 렌더링을 고치려는 상황에서 사용할 수 있어요.

물론, 그것들을 고치려는 의지가 있다고 가정하면요. 제 생각에는 이런 일이 벌어질 거예요: 우리 모두가 제품 출시 준비가 완료된 시점에 컴파일러를 켤 거예요. 개발 도구에서 "memo ✨"가 보이면 우리는 안심을 느낄 거예요. 그래서 모두 다시 렌더링에 대해 여유롭게 생각하고 기능 구현에 집중할 거예요. 대부분의 다시 렌더링이 성능에 미치는 영향이 무시할 만하다는 점 때문에 아마도 아무도 그저 어려워하지 않을 거예요.

실제로 다시 렌더링이 성능에 영향을 미치는 경우에는 상태를 아래로 내리거나 자식 요소나 props로 전달하거나 데이터를 Context로 추출하거나 분할된 공급자로 이동시키는 합성 기법과 같은 방법을 사용해 쉽게 수정할 수 있게 될 거에요. 그리고 가끔씩은 — 수동으로 React.memo와 useCallback을 사용할 거에요.

미래에서 온 방문자들에 대해서는, 저는 그들이 병렬 우주에서 왔다고 확신해요. React가 유연성이 높은 JavaScript보다 구조화된 언어로 작성되었고, 컴파일러가 그런 이유로 100%의 경우를 해결하는 놀라운 곳이죠.

<div class="content-ad"></div>

원문은 https://www.developerway.com에서 확인하실 수 있어요. 해당 웹사이트에는 이와 유사한 더 많은 기사가 있습니다. 😉

React 실력을 더 향상시키기 위해 Advanced React 책을 확인해보세요.

다음 기사가 게시되는 즉시 알림을 받으려면 뉴스레터를 구독하거나 LinkedIn에서 연결하거나 Twitter를 팔로우하세요.