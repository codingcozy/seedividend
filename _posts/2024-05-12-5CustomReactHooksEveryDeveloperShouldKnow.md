---
title: "모든 개발자가 알아야 할 5가지 커스텀 React Hooks"
description: ""
coverImage: "/assets/img/2024-05-12-5CustomReactHooksEveryDeveloperShouldKnow_0.png"
date: 2024-05-12 19:25
ogImage: 
  url: /assets/img/2024-05-12-5CustomReactHooksEveryDeveloperShouldKnow_0.png
tag: Tech
originalTitle: "5 Custom React Hooks Every Developer Should Know"
link: "https://medium.com/stackademic/5-custom-react-hooks-every-developer-should-know-4183af96cecc"
isUpdated: true
---




경력 있는 ReactJS 개발자로서, 애플리케이션을 개발하는 동안 다양한 도전과 성공을 경험해왔어요. 여행을 하면서 저는 코드의 재사용성과 효율성을 향상시키기 위해 사용자 정의 React 훅에 많은 의존을 하게 되었어요. 이 글에서는 모든 개발자가 알아야 할 다섯 가지 사용자 정의 React 훅을 공유하고 싶어요. 각 훅을 하나씩 살펴보며 예시를 제시하고 제 경험도 함께 공유할 거에요.

![이미지](/assets/img/2024-05-12-5CustomReactHooksEveryDeveloperShouldKnow_0.png)


# useLocalStorage

브라우저 스토리지 관리는 React 애플리케이션에서 흔한 요구사항입니다. useLocalStorage 훅을 사용하면 값을 localStorage와 동기화할 수 있어요. 최근 프로젝트에서 이를 어떻게 활용했는지 예시를 보여드릴게요:



```js
import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
```

이 훅 안에서는 상태 값을 로컬 스토리지에 저장된 값이나 제공된 기본 값으로 초기화합니다. 값이 변경될 때마다 스토리지를 업데이트하기 위해 useEffect를 사용합니다. 컴포넌트에서 이렇게 사용할 수 있습니다:

```js
const App = () => {
  const [name, setName] = useLocalStorage('name', 'John Doe');

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hello, {name}!</p>
    </div>
  );
};
```

# useMediaQuery




지금은 애플리케이션을 반응형으로 만들어서 다양한 화면 크기에 적응하는 것이 중요합니다. useMediaQuery 훅을 사용하면 리액트에서 미디어 쿼리를 쉽게 처리할 수 있습니다. 저는 이를 어떻게 활용했는지의 예시를 보여드리겠습니다:

```js
import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);
  return matches;
};
```

이 예시에서는 이벤트 리스너와 matchMedia를 사용하여 미디어 쿼리의 변경 사항을 추적하고 있습니다. 다음은 컴포넌트에서 이를 사용하는 방법입니다:

```js
const App = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <h1>{isMobile ? '모바일 뷰' : '데스크톱 뷰'}</h1>
    </div>
  );
};
```



# useDebounce

Debouncing은 일정 시간 동안의 작업 실행을 지연시키는 기술입니다. useDebounce 훅을 사용하면 어떤 값을 디바운스할 수 있습니다. 아래는 예시입니다:

```js
import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};
```

이 훅을 사용하면 사용자 입력, API 요청 등을 디바운스할 수 있습니다. 다음은 실용적인 예시입니다:



```js
상태로써 App을 만들었어요. 
searchTerm이란 상태와 setSearchTerm 함수를 만들었고, debouncedSearchTerm은 searchTerm을 500 밀리초로 지연시키는 함수를 사용하고 있어요.

useEffect 안에서는 debouncedSearchTerm을 감시하며 API 호출을 수행합니다.

<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

# useFetch

비동기적으로 데이터를 가져오는 것은 현대 웹 개발에서 흔한 작업입니다. 이를 간단하게 처리해주는 useFetch 훅을 알아봅시다.

import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, error, loading };
};



이 훅은 fetch 요청의 복잡성을 추상화하고 응답, 오류 및 로딩 상태를 제공합니다. 이 훅을 사용하는 방법은 다음과 같습니다:

const App = () => {
  const { data, error, loading } = useFetch('https://api.example.com/data');

  if (loading) {
    return <p>데이터 불러오는 중...</p>;
  }
  if (error) {
    return <p>오류 발생: {error.message}</p>;
  }
  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

# useToggle

토글 및 부울 상태를 관리하는 것은 때로는 복잡해질 수 있습니다. useToggle 훅을 사용하면 부울 상태를 쉽게 다룰 수 있습니다. 여기에 간단한 구현 방법이 있습니다:



import { useState } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };
  return [value, toggle];
};

이 훅은 상태를 토글하는 프로세스를 간단하게 해줍니다. 아래는 사용 예시입니다:

const App = () => {
  const [isModalOpen, toggleModal] = useToggle(false);

  return (
    <div>
      <button onClick={toggleModal}>모달 토글</button>
      {isModalOpen && <Modal />}
    </div>
  );
};

# 결론



커스텀 React 훅은 개발 경험을 혁신적으로 향상시킬 수 있는 강력한 도구입니다. 이 글에서는 useLocalStorage, useMediaQuery, useDebounce, useFetch, 그리고 useToggle이라는 다섯 가지 커스텀 훅을 탐구했습니다. 이러한 훅을 활용하여 제 코드베이스를 최적화하고 코드 재사용성을 높이며 고품질 애플리케이션을 제공할 수 있었습니다. 여러분이 이 훅들을 저만큼 유용하게 느끼셨으면 좋겠네요. 즐거운 코딩 되세요!

이 문서가 유용하다고 생각되면 박수를 치는 것을 고려해보세요. 한 번에 50번까지 박수를 칠 수 있어요!

# Stackademic 🎓

끝까지 읽어주셔서 감사합니다. 떠나기 전에:



- 작가를 박수로 격려해주세요! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Venture | Cubed
- Stackademic.com에서 더 많은 콘텐츠를 만나보세요