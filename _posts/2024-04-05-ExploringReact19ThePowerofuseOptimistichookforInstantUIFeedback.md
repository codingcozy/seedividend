---
title: "React 19 - 즉각적인 UI 피드백을 위한 useOptimistic 훅 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Exploring React 19 The Power of useOptimistic hook for Instant UI Feedback"
link: "https://medium.com/javascript-in-plain-english/exploring-react-19-the-power-of-useoptimistic-hook-for-instant-ui-feedback-993fa3ca28e0"
isUpdated: true
---





React 19에서는 많은 훌륭한 기능과 기능이 소개되었는데 그 중 useOptimistic 후크가 눈에 띕니다.

useOptimistic 후크는 비동기 작업 중 UI 상태를 관리하는 원활한 방법을 제공하여 원하는 상태가 UI에 즉시 반영되도록 하여 실제 작업이 완료되기 전에도 UI에서 상태를 즉시 확인할 수 있게 합니다.

저는 작은 채팅 애플리케이션을 구현하여 이 기능을 탐험해보았습니다. 여기에는 useOptimistic가 실제로 어떻게 작동하는지에 대한 요지가 포함되어 있습니다:

- 현재 상태와 동작 입력을 가져와서 "낙관적" 상태 버전을 반환하며 해당 동작의 실제 결과가 확정될 때까지 계속 유지됩니다.
- 이 "낙관적" 상태는 동작의 결과를 사용자에게 즉시 제공하여 실제 프로세스가 더 오래 걸리더라도 즉각적인 피드백의 환상을 제공합니다.

<div class="content-ad"></div>

내 구현에서:

- 우리는 useOptimistic을 사용하여 메시지에 대한 낙관적인 상태를 관리합니다 (optimisticMessages).
- 메시지를 제출하면 addOptimisticMessage를 사용하여 "전송 중..." 상태로 추가하여 UI를 낙관적으로 업데이트합니다.
- sendMessage 함수를 호출하여 실제 메시지를 보냅니다.
- 메시지가 성공적으로 전송되면 실제 내용과 "전송 완료!" 상태를 포함하여 메시지 상태를 업데이트하여 낙관적인 상태를 대체합니다.

```js
// 예제 시연을 위한 코드
import { useState, useRef, useOptimistic } from "react";

function Thread({ messages, sendMessage }) {
  const formRef = useRef();
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    [],
    (state, newMessage) => [...state, newMessage]
  );

  const handleSubmit = async (event) => {
    // 일부 폼 제출 로직

    const messageId = Date.now();
    const optimisticMessage = {
      text: messageText,
      id: messageId,
      status: "전송 중...",
      sentByUser: true,
    };

    addOptimisticMessage(optimisticMessage);

    const sentMessage = await deliverMessage(messageText);

    sendMessage({
      text: sentMessage,
      id: messageId,
      status: "전송 완료!",
      sentByUser: true,
    });

    formRef.current.reset();
  };

  // ... 구성 요소의 나머지 부분

  return <div>{/* ... 메시지 렌더링 로직 */}</div>;
}
```

어때요?

<div class="content-ad"></div>

리액트 프로젝트에서 useOptimistic를 사용해보셨나요? 아래 댓글란에 사용해본 경험과 생각을 공유해주세요!

참고:
📌 [React 공식 레퍼런스 - useOptimistic](https://react.dev/reference/react/useOptimistic)

# 요약

간단한 예시이지만, React 폼을 개선하기 위해 다양한 시나리오에 useOptimistic를 사용할 수 있습니다. 🚀

<div class="content-ad"></div>

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클랩하고 팔로우해 주세요! ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요.
