---
title: "React로 챗봇 만들기 - 파트 3"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Building a FAQ Bot A React ChatBotify Guide Part 3"
link: "https://tjtanjin.medium.com/building-a-faq-bot-a-react-chatbotify-guide-part-3-7ce13d09933e"
isUpdated: true
---

![FAQ Chatbot](</assets/img/Building-a-FAQ-Bot:-A-React-ChatBotify-Guide-(Part-3)_0.png>)

# 소개

우리의 포괄적인 안내서 시리즈인 "FAQ Bot 구축: React ChatBotify 가이드"의 세 번째 편에 오신 것을 환영합니다. 만약 당신이 반복되는 사용자 질문에 고민하는 일이 있다면, FAQ 챗봇의 혜택에 대해 고민한 적이 있을 것입니다. 이 부분에서는 사용자에게 자주 요청되는 정보를 전달하기 위한 맞춤형 FAQ 챗봇을 구축하는 방법을 살펴보겠습니다!

# 빠른 요약

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 시리즈의 이전 부분에서는 제1부에서 설정 안내서를 제공하고 제2부에서 챗봇의 기본 외관 및 대화 구조를 설정하는 방법을 안내했습니다. 저희에 합류한 지 얼마 안 된 경우거나 이러한 기본 단계를 다시 확인해야 하는 경우 이전 단계를 확인해 주세요. 이 세그먼트는 이미 React ChatBotify 챗봇 설정이 되어 있다고 가정합니다. 설정이 되어 있지 않은 경우에는 먼저 해당 안내서를 방문해 주세요.

3부로 나아가면 챗봇의 가장 일반적인 사용 사례 중 하나인 FAQ 봇을 만드는 방법에 대해 살펴보겠습니다. 이 FAQ 봇은 응답을 체계화할 뿐만 아니라 사용자 만족도와 운영 효율성을 향상시킵니다. 이 안내서를 마치면 React ChatBotify를 사용하여 지능적인 FAQ 봇을 구현하는 방법에 대한 지식과 도구를 모두 갖추게 될 것입니다.

# 옵션 만들기

React ChatBotify를 사용하여 FAQ에 답변하는 챗봇을 만드는 것은 매우 쉽습니다. 사실, 이미 이전 안내서에서 챗봇을 설정한 경우에는 이어서 쉽게 구축할 수 있습니다! 그러나 이 튜토리얼을 완료하기 위해 사용자를 맞이하는 챗봇이 있는 깨끗한 설정을 가정해 봅시다! 다음 코드 스니펫을 사용하여 이것을 달성할 수 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// MyChatBot.js
import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";

const MyChatBot = () => {
  const flow = {
    start: {
      message: "안녕하세요, FAQ 봇입니다!",
      options: ["예시", "깃허브", "디스코드"],
    },
  };

  return <ChatBot />;
};

export default MyChatBot;
```

지금은 인사말만 하는 매우 단조로운 챗봇이 만들어졌습니다. 사용자에게 옵션을 제시하도록 챗봇을 개선해보겠습니다. 옵션 속성과 옵션 배열을 추가함으로써 사용자에게 빠르게 예시, 깃허브, 디스코드 세 가지 옵션을 보여줄 수 있습니다.

```js
// MyChatBot.js
import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";

const MyChatBot = () => {
  const flow = {
    start: {
      message: "안녕하세요, FAQ 봇입니다!",
      options: ["예시", "깃허브", "디스코드"],
    },
  };

  return <ChatBot />;
};

export default MyChatBot;
```

단 한 가지 간단한 변경으로 챗봇이 사용자에게 클릭할 수 있는 옵션을 제공하도록 지시했습니다. 그러나 옵션을 클릭해도 챗봇에서 응답을 받지 못한다는 것을 알 수 있습니다. 이제 챗봇 응답을 어떻게 작성할 수 있는지 알아보겠습니다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 응답 작성하기

응답을 제공하기 위해 먼저 사용자가 선택한 옵션을 처리해야 합니다. 사용자가 선택한 옵션을 처리하고 제일 처음 블록에서 경로가 지정되었는지 확인하기 위해 두 번째 process_options 블록을 생성하세요. 아래 코드 스니펫은 완전한 두 번째 블록을 보여줍니다. 걱정하지 마세요, 자세히 설명해 드릴 거에요:

```js
// MyChatBot.js
import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";

const MyChatBot = () => {
  const flow = {
    start: {
      message: "안녕, FAQ 봇이에요!",
      options: ["예시", "깃헙", "디스코드"],
      path: "process_options",
    },
    process_options: {
      message: (params) => {
        let link = "";
        switch (params.userInput) {
          case "예시":
            link = "https://react-chatbotify.tjtanjin.com/docs/examples/basic_form";
            break;
          case "깃헙":
            link = "https://github.com/tjtanjin/react-chatbotify/";
            break;
          case "디스코드":
            link = "https://discord.gg/6R4DK4G5Zh";
            break;
          default:
            return "unknown_input";
        }
        setTimeout(() => {
          window.open(link);
        }, 1000);
        return `${params.userInput}로 보냈어요! 잠시 기다려 주세요!`;
      },
    },
  };

  return <ChatBot />;
};

export default MyChatBot;
```

위의 process_options 블록에서 메시지 속성을 정의합니다. 그러나 메시지는 첫 블록에서 사용자가 선택한 입력에 따라 동적으로 결정됩니다. 먼저 메시지 속성이 params를 가져와서 애플리케이션 논리에 사용될 수 있는 값을 포함한다는 점을 주목하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

API 문서에는 어떤 값들에 접근할 수 있는지에 대한 전체 목록이 있습니다. 이 예시에서는 사용자가 시작 블록에서 선택한 옵션을 포함하는 userInput 값을 사용하고 있습니다. 위 예시에서는 userInput을 사용하여 사용자가 어떤 링크를 방문할지 결정하고, 사용자에게 잠시 기다리라고 안내한 후 1초의 지연 시간을 두고 해당 링크로 사용자를 보내고 있습니다.

또한, 챗봇을 루프시키려면 루프 블록을 간단히 추가하여 챗봇이 자체적으로 반복하도록 할 수 있습니다:

```js
// MyChatBot.js
import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";

const MyChatBot = () => {
  const flow = {
    start: {
      message: "안녕, 여기는 FAQ 봇이야!",
      options: ["예시", "깃허브", "디스코드"],
      path: "process_options",
    },
    process_options: {
      message: (params) => {
        let link = "";
        switch (params.userInput) {
          case "예시":
            link = "https://react-chatbotify.tjtanjin.com/docs/examples/basic_form";
            break;
          case "깃허브":
            link = "https://github.com/tjtanjin/react-chatbotify/";
            break;
          case "디스코드":
            link = "https://discord.gg/6R4DK4G5Zh";
            break;
          default:
            return "unknown_input";
        }
        setTimeout(() => {
          window.open(link);
        }, 1000);
        return `잠시만 기다려! ${params.userInput} 페이지로 안내할게!`;
      },
      transition: { duration: 1 },
      path: "loop",
    },
    loop: {
      message: "더 도움이 필요하신가요?",
      options: ["예시", "깃허브", "디스코드"],
      path: "process_options",
    },
  };

  return <ChatBot />;
};

export default MyChatBot;
```

간단히 상기시켜 드리자면, 시작 블록을 제외한 다른 블록들은 원하는 대로 이름을 지을 수 있습니다. 그렇지만 위에서 보여준 process_options 및 loop 블록과 같이 설명적인 이름을 사용하는 것이 권장됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

지금까지 안내를 면밀히 따라 왔다면, 라이브 예시에 표시된 것과 비슷한 FAQ 봇이 만들어진 상태일 것입니다:

![FAQ 봇 라이브 예시](</assets/img/Building-a-FAQ-Bot:-A-React-ChatBotify-Guide-(Part-3)_1.png>)

라이브 예시와 차이점을 알 수 있겠지만, 이는 예시가 더 상세하고 동일한 결과를 얻기 위한 다양한 방법이 있기 때문입니다. 그러니 플레이그라운드를 활용하여 여러분에게 가장 적합한 방법을 찾아보세요!

# 결론

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 가이드에서는 React ChatBotify를 사용하여 FAQ 챗봇을 만드는 방법을 간단히 살펴보았어요. 다음 가이드에서는 챗봇과 Gemini 통합을 통해 동적 대화를 만드는 또 다른 흥미로운 사용 사례를 살펴볼 거에요!
