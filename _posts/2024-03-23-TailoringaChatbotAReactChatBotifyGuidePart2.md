---
title: "자주 묻는 질문 대답해주는 React 챗봇 만들기 파트 2"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Tailoring a Chatbot A React ChatBotify Guide Part 2"
link: "https://tjtanjin.medium.com/tailoring-a-chat-bot-a-react-chatbotify-guide-part-2-97ae8914b80c"
---



<img src="/assets/img/Tailoring-a-Chatbot:-A-React-ChatBotify-Guide-(Part-2)_0.png" />

# 소개

React ChatBotify를 사용하여 챗봇을 만드는 자습서 시리즈의 두 번째 시간에 오신 것을 환영합니다. 아직 챗봇을 설정하지 않은 경우 설정 가이드를 확인해보세요. 이제 더 맞춤화된 경험을 위해 챗봇의 외관과 대화를 커스터마이징하는 흥미로운 영역에 대해 알아보겠습니다.

# 준비 단계 설정

<div class="content-ad"></div>

이전 가이드에서는 작동하는 챗봇을 구축하기 위한 기반을 마련했습니다. 이번 시리즈의 두 번째 부분에 돌입하면서, 고유한 사용자 경험을 만들 때 맞춤화가 하는 중요한 역할을 이해하는 것이 중요합니다. 외모와 대화를 맞춤화함으로써 사용자의 기대를 충족뿐만 아니라 초과할 수 있습니다. 이 맞춤화 여정은 단순한 미적인 면에 그치지 않고, 챗봇과 상호작용하는 각 사용자에게 상호작용하고 기억에 남을 만남을 만드는 것에 관한 것입니다.

1부에서 설정한 기반을 토대로, 챗봇 외모와 대화를 보다 자세히 맞춤화하는 흥미로운 영역을 탐험해보겠습니다. 여기서 우리는 평범한 것을 특별한 것으로 바꿀 것입니다!

# 테마 맞춤화

챗봇의 일반적인 테마는 사용자에게 강력한 첫인상을 전달합니다. 종종, 챗봇이 웹사이트의 나머지 테마와 일관성 있게 스타일이 입혀져 있는지 확인하고 싶을 것입니다. 이는 색상 구성표, 글꼴, 또는 챗봇 창 레이아웃일 수 있습니다.

<div class="content-ad"></div>

우선, 챗봇 테마를 조정하는 가장 빠르고 권장되는 방법은 테마 옵션의 primaryColor와 secondaryColor 속성을 통해 조절하는 것입니다. 예를 들어, primaryColor를 #F4B41A로 설정하고 secondaryColor를 #143D59로 설정하면 아래와 같이 챗봇 창이 테마화됩니다:

![Chatbot Theme](/assets/img/Tailoring-a-Chatbot:-A-React-ChatBotify-Guide-(Part-2)_1.png)

위의 테마 변경에 대한 실시간 예시는 [여기](링크)에서 확인할 수 있습니다. 그렇지만, 챗봇의 외관에 세부적인 변경이 필요하다면, 챗봇은 꿈꾸던 외관으로 변형할 수 있는 다른 다양한 속성을 노출합니다!

# 세부적인 외관 규모 조절

<div class="content-ad"></div>

더 야심 있는 사용자들을 위해, 챗봇의 외관을 더 세밀하게 제어하고 싶을 수 있습니다. 이렇게 하면 챗봇이 웹사이트에 가장 잘 맞도록 완전히 스타일링됩니다. 이러한 목적을 달성하기 위해 챗봇은 여러 가지 스타일을 노출하며 여기에 문서화되어 있습니다.

이전 예시를 사용하여, 이제 한 걸음 더 나아가서 글꼴, 색상 구성 및 테두리 반지름을 조정하여 챗봇에 다른 모양을 줄 수 있는 방법을 살펴볼 것입니다:

![이미지](/assets/img/Tailoring-a-Chatbot:-A-React-ChatBotify-Guide-(Part-2)_2.png)

스타일 외에도 챗봇에서 사용된 CSS 스타일을 덮어쓸 수도 있습니다. 관련 스타일을 식별하기 쉽게 하기 위해 챗봇에서 사용된 스타일은 "rcb"로 접두사가 붙습니다.

<div class="content-ad"></div>

# 대화 만들기

대화는 상호 작용에서 사용자가 느끼는 경험을 정의하는 데 중요한 역할을 합니다. 챗봇을 가지려는 목적에 따라 대화는 FAQ 봇이 될 수도 있고 대화형 챗봇이 될 수도 있습니다. FAQ 또는 대화형 챗봇을 만드는 데 관심이 있다면 각각을 위한 별도의 가이드가 작성될 것입니다. 이 간단한 튜토리얼에서는 대화를 사용자 정의하는 방법에 대해 간단히 살펴보겠습니다!

시작하려면 아래 예제 대화처럼 간단한 플로우를 정의해야 합니다:

```js
// MyChatBot.js
import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";

const MyChatBot = () => {
  const flow = {
    start: {
      message: "안녕, 무엇을 좋아하는 음식이 있나요?",
      path: "end",
    },
    end: {
      message: "그렇군요, 안녕히 가세요!",
      chatDisabled: true,
    },
  };

  return <ChatBot />;
};

export default MyChatBot;
```

<div class="content-ad"></div>

위의 짧은 코드 스니펫에서는 2개의 블록을 포함하는 플로우를 정의합니다. 시작 블록에서는 사용자에게 먹고 싶은 음식에 대해 묻습니다. 사용자로부터 입력을 받은 후에는 종료 블록으로 이동하여 사용자에게 작별 인사를 건넨 다음, 사용자가 텍스트 상자와 상호 작용하지 못하도록 채팅 입력을 비활성화합니다.

이 간단한 예제만으로도 여러분은 자신만의 대화 흐름을 봇에 추가한 것입니다. 그러나 이는 봇이 할 수 있는 가능성 중 한 부분에 불과합니다. 여러분이 가질 수 있는 다양한 종류의 대화 흐름에 대한 더 많은 예시를 보려면 여기에서 시작하는 모든 예시를 살펴보세요.

# 결론

이 튜토리얼에서는 챗봇의 외관을 만들고 사용자와 대화할 수 있는 기능을 갖추는 방법을 살펴보았습니다. 다음 섹션에서는 주요 사용 사례 중 하나인 FAQ 봇을 만들어 공통 질문에 답변하는 방법을 자세히 살펴볼 것입니다.
