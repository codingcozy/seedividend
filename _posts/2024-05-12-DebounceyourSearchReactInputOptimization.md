---
title: "검색 기능을 최적화하자  React 입력 최적화"
description: ""
coverImage: "/assets/img/2024-05-12-DebounceyourSearchReactInputOptimization_0.png"
date: 2024-05-12 22:27
ogImage: 
  url: /assets/img/2024-05-12-DebounceyourSearchReactInputOptimization_0.png
tag: Tech
originalTitle: "Debounce your Search | React Input Optimization"
link: "https://medium.com/nerd-for-tech/debounce-your-search-react-input-optimization-fd270a8042b"
isUpdated: true
---




<img src="/assets/img/2024-05-12-DebounceyourSearchReactInputOptimization_0.png" />

디바운싱은 작업이 발생하는 횟수를 제한하는 최적화 기법입니다. React에서 검색 기능을 구현했을 때 사용자가 각 문자를 입력할 때마다 목록을 자동으로 필터링하거나 fetch 요청을 보내는 경우,이 기술은 응용 프로그램의 효율성을 크게 향상시킬 수 있는 기술입니다.

# 설정 / 설치

이 예제에서는 고유틸리티 라이브러리인 lodash에서 debounce 함수를 가져와 사용할 것입니다. 이를 위해 필터링 작업을 처리할 구성요소의 맨 위에 다음 코드 줄을 추가하면 됩니다.



```js
import debounce from 'lodash.debounce';
```

다음으로는 사용 중인 것에 따라 npm 또는 yarn으로 종속성을 설치해야 합니다.

npm install lodash.debounce

또는



yarn add lodash.debounce

# 예시 분석

위의 CodeSandbox 예시에서 간단한 앱을 만들어 보았어요. 해당 앱은 과일 목록을 표시하고, 입력란에 텍스트를 입력할 때마다 목록이 필터링되는 기능을 가지고 있어요.

입력란은 제어 폼(Controlled Form)이에요. 표시되는 값은 상태(state)에서 가져오며, 입력란은 onChange 이벤트를 통해 상태와 연결되어 있어요.



```js
const [searchTerm, setSearchTerm] = useState("");

const handleChange = (e) => {
  setSearchTerm(e.target.value);
};
```

```js
<input type="text" value={searchTerm} onChange={handleChange} />
```

사용자가 입력하는 문자마다 과일 목록이 필터링되고 사용자가 볼 수 있는 목록이 업데이트됩니다.

```js
let listToDisplay = fruits;
if (searchTerm !== "")
  listToDisplay = fruits.filter((fruit) => {
    return fruit.includes(searchTerm);
  });
}
```  



# 문제

이 예시는 작동이 잘되지만, 목록의 크기가 커질수록 각 검색에 걸리는 시간이 길어질 것을 상상할 수 있습니다. 또 다른 시나리오는 각 문자열을 검색할 때마다 API 요청을 보내는 것일 수 있습니다. 어느 쪽이든, 이 구현은 애플리케이션을 느리게 만들 수 있고 이를 어떻게 해결해야 할지 고민에 빠질 수 있습니다. 여기서 debounce가 등장합니다.

# Debounce

```js
_.debounce(func, [wait=0], [options={}])
```



디바운스가 3개의 인수를 사용하지만, 우리는 첫 두 인수를 사용할 것입니다. 실행하고 싶은 함수와 기다리고 있는 시간입니다.

또한 나중에 정리에 도움이 되는 debounce에 내장된 .cancel 함수도 사용할 것입니다.

디바운스 함수에 대한 더 많은 정보는 공식 설명서를 참조해주세요.

# 구현



첫 번째 단계는 useMemo을 사용하여 debounce 함수에서 반환 값을 메모이즈하는 작업입니다. 이 반환된 값은 다시 렌더링 사이에 유지됩니다. 이 단계는 필수적입니다. 왜냐하면 이 데이터를 다시 렌더링 사이에서 지속하지 않으면 debounce의 다른 구현이 모든 다시 렌더링마다 발생하게 되고, 본질적으로 우리의 초기 예제를 가지고 있는 셈이 됩니다. 즉, 마지막 문자 입력 후 일정 시간이 지난 후에 한 문자씩 목록을 필터링하는 상태가 될 것입니다.

```js
const debouncedResults = useMemo(() => {
  return debouce(handleChange, 300);
}, []);
```

다음으로 useEffect를 사용하여 컴포넌트가 언마운트될 때 debounce에서 발생하는 부작용을 정리할 것입니다. 더 이상 해당 페이지나 뷰에 나 있지 않을 때는 검색을 실행할 이유가 없습니다. 여기서는 메모이즈된 반환 값을 사용하여 .cancel 함수를 호출할 것입니다.

```js
useEffect(() => {
  return () => {
    debouncedResults.cancel();
  };
});
```



마침내 이전 작업 중 일부를 취소할 차례입니다. `value` 속성을 삭제하여 폼을 비제어 상태로 만들고 `onChange`를 `debouncedResults`를 호출하도록 설정합니다. 이렇게 하면 입력이 변경될 때마다 폼이 디바운스되도록 할 수 있습니다.

```js
<input type="text" onChange={debouncedResults} />
```

그리고 이렇게 완료되었습니다. 디바운싱이 적용된 입력 상자가 완성되었습니다!

# 작업 예시