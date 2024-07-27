---
title: "마무리는 제대로 했나요 컴포넌트 라이프사이클에서 오류가 발생하지 않게 하는 비동기 작업"
description: ""
coverImage: "/assets/img/2024-05-12-DoyoucleanupafteryouruseEffectErrorproofasynctasksincomponentslifecycle_0.png"
date: 2024-05-12 23:20
ogImage: 
  url: /assets/img/2024-05-12-DoyoucleanupafteryouruseEffectErrorproofasynctasksincomponentslifecycle_0.png
tag: Tech
originalTitle: "Do you clean up after your useEffect? Errorproof async tasks in components lifecycle"
link: "https://medium.com/@renashen_28351/do-you-clean-up-after-your-useeffect-errorproof-async-tasks-in-components-lifecycle-83b9cb19b89e"
---


React의 useEffect 훅은 함수 컴포넌트에서 부작용을 관리하는 강력한 도구입니다. 하지만 적절한 처리 없이 사용하면 코드베이스의 최악의 악몽이 될 수 있습니다. 오늘은 제가 즐겨 사용하는 API 중 하나인 TheCatAPI를 사용하여, useEffect에서 비동기 작업을 정리하는 방법에 초점을 맞추어 React 컴포넌트를 가능한 깨끗하고 효율적으로 유지하는 방법을 살펴보겠습니다.

![이미지](/assets/img/2024-05-12-DoyoucleanupafteryouruseEffectErrorproofasynctasksincomponentslifecycle_0.png)

## useEffect에서 정리 작업이 중요한 이유

React 컴포넌트는 마운트되고 업데이트되며 마침내 언마운트됩니다. useEffect 훅을 사용하면 이러한 단계를 우회하여 코드를 실행할 수 있습니다. DOM을 조작하거나 서비스에 구독하거나 타이머를 설정하거나 데이터를 가져오는 등의 작업을 수행할 수 있습니다. 그러나 중요한 건 이러한 작업을 설정하는 것뿐 아니라 그것들을 언제, 어떻게 해제해야 하는지를 알고 있는 것입니다.



적절한 정리가 없으면 애플리케이션이 더는 필요하지 않은 효과를 계속 실행하거나, 더 나쁜 경우에는 DOM에서 사라진 구성 요소를 참조할 수 있습니다. 이러한 문제는 성능 문제, 메모리 누수 및 디버깅하기 어려운 오류로 이어질 수 있습니다.

# 먼저, 고양이 사진을 가져와 봅시다

아마도 많은 분들이 이 고양이 서비스 API를 이미 알고 있을 겁니다. 이 글에서는 이미지 엔드포인트만 사용할 것입니다. 만약 이 API에 대해 더 알고 싶다면, 이 링크를 확인해보세요:

프로그램이 초기 페이지 로드 시 10개의 고양이 사진을 표시하도록 해 봅시다.



```js
import { useState, useEffect } from "react";

function App() {
  const [catImageUrl, setCatImageUrl] = useState([]);

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=10&api_key=${APIKEY}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const imageURLS = data.map((obj) => obj.url);
          setCatImageUrl(imageURLS); // 첫 번째 이미지 URL을 설정하려 가정합니다
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCatImage();
  }, []); // 의존성 배열이 비어 있어서 효과가 한 번만 실행됩니다

  return (
    <>
      <h1>당신의 하루 고양이 사진</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {catImageUrl.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="랜덤한 고양이"
            style={{ flex: "0 0 200px", height: "200px" }}
          />
        ))}
      </div>
    </>
  );
}
```

<img src="/assets/img/2024-05-12-DoyoucleanupafteryouruseEffectErrorproofasynctasksincomponentslifecycle_1.png" />

아주 좋아요, 의도한 대로 10개의 고양이 사진을 요청했지만 잠재적인 문제가 있습니다: 데이터 가져오기가 비동기적인 것으로 인해 작업이 완료되기 전에 컴포넌트가 언마운트될 수 있습니다 (예: 경로 변경 또는 DOM에서 컴포넌트가 제거되는 경우). 그런 경우에 컴포넌트가 언마운트된 상태에서 상태를 업데이트하려고 하면 "Can’t perform a React state update on an unmounted component"와 같은 오류가 발생할 수 있습니다.

useEffect 내에서 데이터를 가져올 때 주요 도전 과제는 컴포넌트의 라이프사이클을 처리하는 것입니다.




그러니까, 코드에 버그가 없도록 정리를 해봅시다!

# 효과에서 직접 함수를 반환하기

React의 useEffect 훅을 사용할 때, 정리를 처리하는 일반적이고 권장되는 방법은 효과에서 직접 함수를 반환하는 것입니다.

```js
useEffect(() => {
  // 코드 로직

  return () => {
    // 정리 작업 
  };
}, []); //효과가 한 번만 발생해야 하는 경우, 의존성을 비워둡니다
```



# 효율적인 데이터 가져오기 정리를 위해 AbortController 사용

AbortController는 현대 브라우저와 node-fetch를 사용하는 Node.js 환경에서 널리 지원되지만, 모든 환경에서 지원되지 않을 수 있다는 점을 고려하는 것이 중요합니다 (예: IE의 모든 버전이나 일부 오래된 브라우저).

AbortController를 사용하면 fetch가 시작된 시점에 컨트롤러 신호를 추가하여 fetch 요청을 취소할 수 있습니다. isMounted 플래그를 사용하는 것과 비교해 (곧 다룰 예정), fetch 요청과 같은 비동기 작업을 취소하는 표준화된 방법을 제공합니다.

먼저, 새 AbortController를 만들어야 합니다:



```js
const controller = new AbortController();
const { signal } = controller;
```

AbortController 인스턴스를 생성하면 signal 속성을 포함한 객체가 반환됩니다. 이 signal은 fetch 요청이 중단되어야 함을 신호하는데 사용되는 AbortSignal의 인스턴스입니다.

그런 다음 signal을 옵션 객체로 fetch 요청에 전달할 수 있습니다. 이를 통해 컨트롤러의 signal을 fetch 요청과 연결할 수 있습니다.

```js
const fetchCatImage = async () => {
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=10&api_key=${APIKEY}`, { signal } // 이곳에 signal 전달
      );
        const data = await response.json();
        if (data.length > 0) {
          const imageURLS = data.map((obj) => obj.url);
          setCatImageUrl(imageURLS);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted"); // fetch가 중단된 경우 처리
        } else {
          console.error("데이터를 불러오는 중 오류 발생:", error); // 다른 오류 처리
        }
      }
    };
    
    fetchCatImage();

    return () => {
      controller.abort(); // 컴포넌트가 언마운트 될 때 fetch 요청 중단
    };
  }, []);
```



"AbortError"은 AbortController에서 abort() 함수가 호출될 때 발생하는 고유한 오류 객체입니다. catch 블록에서 AbortError에 대한 특정 메시지를 추가할 수 있습니다.

이제 각 새로운 효과가 발생하기 전이나 컴포넌트가 마운트 해제되기 바로 전에 fetch 요청이 즉시 취소됩니다.

AbortController를 useEffect 정리 함수와 함께 사용하면 React에서 비동기 작업을 처리하는 견고한 해결책을 제공할 수 있습니다. 이 패턴을 사용하면 컴포넌트가 마운트 해제된 후에 상태를 업데이트하려고 시도하지 않도록 보장할 수 있습니다.

# IsMounted 플래그 설정:



오래된 브라우저나 제한된 JavaScript 환경에서 개발 중이라면 IsMounted 플래그를 사용하면 간단한 대안이 될 수 있습니다.

컴포넌트가 초기에 마운트될 때 isMounted를 true로 설정합니다. 컴포넌트가 여전히 마운트된 상태인 경우에만 상태를 업데이트합니다. 마지막으로 useEffect에서 반환된 정리 함수에서 컴포넌트가 마운트 해제되면 isMounted를 false로 설정하여 컴포넌트가 마운트 해제된 후 데이터 가져오기가 완료된 경우 상태 업데이트를 방지합니다.

```js
  useEffect(() => {
    let isMounted = true; // 컴포넌트가 마운트된 상태를 추적하는 플래그

    const fetchCatImage = async () => {
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=10&api_key=${APIKEY}`
        );
        const data = await response.json();
        if (isMounted && data.length > 0) {
          const imageURLS = data.map((obj) => obj.url);
          setCatImageUrl(imageURLS);
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCatImage();

    return () => {
      isMounted = false; // 컴포넌트가 언마운트될 때 isMounted를 false로 설정하여 정리
    };
  }, []);
```

그러니, 간략히 정리하면:



- useEffect 정리: 권장하는 방법은 정리를 수행하는 함수를 직접 반환하는 것입니다.
- AbortController 사용: 대부분의 경우에 해당합니다. 주요 비동기 작업(예: 데이터 가져오기)에 신호를 첨부하고 정리 함수에서 컨트롤러를 중지합니다.
- isMounted 플래그 사용: 일부 오래된 환경이나 제한적인 환경에서 AbortController을 지원하지 않을 때

여기까지 하면 useEffect가 스스로 정리할 수 있어요! 고양이 사진을 즐기세요!

이 게시물을 읽어주셔서 감사합니다!! 💜

게시물이 마음에 들었다면 👏 또는 댓글을 남겨주세요.



질문이나 제안이 있으시거나 저와 함께 일하고 싶으시다면 언제든지 연락해 주세요:

- 이메일: renashen314@gmail.com
- LinkedIn