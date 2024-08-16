---
title: "스트림을 사용하여 Nextjs에서 라이브 스트림 채팅 구축하기"
description: ""
coverImage: "/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_0.png"
date: 2024-05-14 12:09
ogImage: 
  url: /assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_0.png
tag: Tech
originalTitle: "Using Stream to Build a Livestream Chat in Next.js"
link: "https://medium.com/nerd-for-tech/using-stream-to-build-a-livestream-chat-in-next-js-e23ca1fe29ec"
isUpdated: true
---




다음.js, Stream 및 Chatscope를 사용하여 매력적이고 인터랙티브한 라이브 스트리밍 채팅 앱을 만드는 방법을 배워보세요.

![이미지](/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_0.png)

언제나 YouTube와 같은 라이브 스트리밍에서 발견되는 다이나믹한 채팅 경험을 어떻게 만들 수 있을지 궁금해했는데, 누구나 로그인 없이 참여할 수 있는 편리함을 더한 기능을 추가하고 싶었습니다.

Next.js와 Stream을 사용하여 그 경험을 성공적으로 만들어냈습니다. 이 튜토리얼에서는 사용자 권한에 대한 세밀한 제어를 통해 실시간 상호작용을 보다 접근하기 쉽게 만드는 라이브 스트리밍 채팅 환경을 만드는 간단한 방법을 다루고 있습니다.



# 데모

기술적인 내용에 들어가기 전에, 이 튜토리얼에서 무엇을 만들게 될지 간단히 소개해 드릴게요 👇🏻

# 준비물

구현을 시작하기 위해 다음이 필요합니다:



- Node.js 18 또는 그 이후 버전
- Stream 계정
- Vercel 계정

# 새 Stream 애플리케이션 설정하기

이 섹션에서는 새 Stream 애플리케이션을 생성하고, 인증 없이 사용자를 활성화하며, 사용자 권한을 정의하여 채널에 대한 읽기 및 게시를 설정하는 방법을 배울 수 있습니다. 시작해봅시다.

Stream 계정을 만들고 로그인한 후, + 앱 만들기를 클릭하여 Stream 채팅 애플리케이션 생성을 시작해보세요.



<img src="/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_1.png" />

어플리케이션 이름을 입력해주세요. 또한, 웹사이트 배포 지역/기능 근처의 채팅 저장 위치를 선택해주세요. 저는 인도에 있으므로 뭄바이로 설정했습니다.

<img src="/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_2.png" />

설정이 완료되면 채팅 개요 화면으로 이동합니다. API 키를 복사하고, 안전한 장소에 저장하여 Next.js 애플리케이션에서 NEXT_PUBLIC_STREAM_API_KEY로 계속 사용할 수 있도록 해주세요.



![이미지](/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_3.png)

권한 확인 없이 방문자가 채팅 메시지를 게시할 수 있도록 하려면 아래로 스크롤하여 "인증 확인 비활성화" 토글 버튼을 활성화하세요. 변경 사항을 동기화하려면 제출을 클릭하세요.

![이미지](/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_4.png)

방문자가 특정 채널의 사용자로서 메시지를 게시할 수 있도록 하려면 그들을 위해 읽기 및 게시 권한을 활성화해야 합니다. 방문자가 채팅 애플리케이션에서 가정할 수 있는 역할과 권한을 구성할 수 있도록 하는 것이 매우 유용합니다.



사용자 역할을 선택하고 메시징을 스코프로 선택한 다음 편집 버튼을 클릭하여 방문자의 권한을 구성하실 수 있습니다.

![이미지](/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_5.png)

방문자가 메시지를 게시할 수 있도록 하려면 메시지 생성을 검색하고 "메시지 생성" 권한을 활성화하여 채널의 모든 사용자가 메시지를 보낼 수 있도록 허용할 수 있습니다.

![이미지](/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_6.png)



방문자들이 채팅 기록을 읽을 수 있도록 하려면 'read channel'을 검색하여 Read Channel 및 Read Channel Members를 활성화하세요. 이렇게 하면 방문자가 메시지를 읽을 뿐만 아니라 해당 메시지를 게시한 사용자도 확인할 수 있습니다.

![이미지](/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_7.png)

마지막으로 변경 사항을 동기화하려면 저장을 클릭하세요.

![이미지](/assets/img/2024-05-14-UsingStreamtoBuildaLivestreamChatinNextjs_8.png)



이제 방문자가 할 수 있는 것들의 권한과 범위를 구성하는 것을 마쳤습니다. 이제 Chatscope UI Kit을 사용하여 Next.js에서 채팅 사용자 인터페이스를 구축해 봅시다.

# 새 Next.js 애플리케이션 설정

이 섹션에서는 새로운 Next.js 애플리케이션을 생성하는 방법, shadcn/ui를 설정하는 방법, 해당 애플리케이션의 요구 사항을 파악하여 빠른 구현을 위해 관련 라이브러리를 설치하는 방법을 배우게 될 것입니다.

새로운 Next.js 프로젝트를 생성하는 것으로 시작해 봅시다. 터미널을 열고 다음 명령을 실행하세요:



```js
npx create-next-app@latest my-chat-app
```

진행할 때, 다음을 선택하세요:

- TypeScript를 사용할 것인지 물으면 "Yes"를 선택하세요.
- ESLint를 사용할 것인지 물으면 "No"를 선택하세요.
- Tailwind CSS를 사용할 것인지 물으면 "Yes"를 선택하세요.
- src/ 디렉토리를 사용할 것인지 물으면 "No"를 선택하세요.
- App Router를 사용할 것인지 물으면 "Yes"를 선택하세요.
- 기본 import alias를 맞춤 설정할 것인지 물으면 "No"를 선택하세요.

위 과정을 마치면 프로젝트 디렉토리로 이동하여 다음 명령어를 실행하여 개발 모드에서 앱을 시작할 수 있습니다:



```js
cd my-chat-app
npm run dev
```

앱은 localhost:3000에서 실행 중이어야 합니다.

이제 프로젝트의 루트에 .env 파일을 만드세요. 위 섹션에서 저장한 항목들을 추가할 것입니다.

다음과 같이 보여야 합니다:



```js
# .env

# 스트림 환경 변수
NEXT_PUBLIC_STREAM_API_KEY="..."

```

## shadcn/ui 컴포넌트 통합

채팅 사용자 인터페이스를 빠르게 프로토타입화하기 위해 Next.js와 함께 shadcn/ui를 설정할 것입니다. shadcn/ui는 아름답게 디자인된 컴포넌트들의 모음으로, 여러분의 애플리케이션에 복사하여 붙여넣을 수 있습니다. 아래 명령어를 실행하여 shadcn/ui를 설정하세요:

```js
npx shadcn-ui@latest init
```



구성 파일 components.json을 구성하는 몇 가지 질문에 답해야합니다. 다음을 선택하세요:

- TypeScript를 사용하것이라고 하면 "예"를 선택하세요.
- 사용할 스타일을 선택하라는 프롬프트가 나오면 "기본"을 선택하세요.
- 기본 색상으로 선택하라는 프롬프트가 나오면 "Slate"를 선택하세요.
- 색상에 CSS 변수를 사용하냐고 묻힐 경우 "예"를 선택하세요.

위 작업이 완료되면, Next.js 애플리케이션에 React 구성 요소를 쉽게 추가할 수 있는 CLI가 설정됩니다. 아래 명령어를 실행하여 버튼, 입력란, 그리고 텍스트영역 요소를 가져올 수 있습니다.

```js
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
```



그것이 끝나면 이제 app/components 디렉토리 안에 ui 디렉토리가 보일 것입니다. 그 안에 button.tsx, input.tsx, textarea.tsx 파일이 있습니다.

## Chatscope 및 Stream UI Kit를 React에 설치하기

구현을 더 쉽게 만들기 위해 필요한 작업을 이제 알아봅시다.

먼저, 각 방문자가 익명 사용자로 취급되므로 임의로 생성된 이름(id)으로 그들을 식별해야 합니다. 또한 채널에서 받은 각 메시지는 실시간으로 모든 방문자에게 전파되어야 합니다. 마지막으로, 모든 메시지가 채널로 들어오는 메시지로 표시되도록 해야 합니다.



위의 요구 사항을 충족하기 위해 다음 명령을 실행하여 필요한 라이브러리를 설치하세요:

```js
npm install @chatscope/chat-ui-kit-react
npm install stream-chat stream-chat-react
npm install unique-username-generator
```

다음 라이브러리가 설치됩니다:

- unique-username-generator: 고유한 사용자 이름을 생성하는 패키지입니다.
- stream-chat: Stream의 JavaScript API 클라이언트입니다.
- stream-chat-react: Stream Chat을 위한 React 훅(그리고 컴포넌트) 라이브러리입니다.
- @chatscope/chat-ui-kit-react: 채팅 UI의 프로토타입을 위한 React 컴포넌트 라이브러리입니다.



자, 이제 반응형 채팅 사용자 인터페이스를 만들어 봅시다.

# ChatScope와 Stream을 사용하여 채팅 사용자 인터페이스 만들기

이 섹션에서는 방문자를 특정 채널에 연결하고, 채팅 기록을 렌더링하고, 메시지를 게시할 수 있도록 하는 React 컴포넌트를 구축하는 방법을 배우게 될 것입니다.

먼저, 채팅 메시지 목록을 동적으로 렌더링하는 React 컴포넌트를 만들어 봅시다. Stream 및 Chatscope 라이브러리에서 컴포넌트를 사용할 것입니다.



앱 디렉토리에 Messages.tsx 파일을 만들어서 아래 코드를 넣어주세요:

```js
import { cn } from "@/lib/utils";
import { useChannelStateContext } from "stream-chat-react";
import { Message, MessageList } from "@chatscope/chat-ui-kit-react";

export default function () {
  const { messages } = useChannelStateContext();
  return (
    <MessageList>
      {messages?.map((i, index: number) => (
        <Message
          key={i.id}
          model={{
            position: "normal",
            sender: i.user?.id,
            direction: "incoming",
            message: `${i.user?.id}: ${i.text}`,
            sentTime: i.created_at?.toString(),
          }}
          className={cn(
            "bg-white rounded text-black py-2 text-xs",
            index !== messages.length - 1 && "border-b"
          )}
        />
      ))}
    </MessageList>
  );
}
```

`useChannelStateContext` 훅을 사용하여 채팅 기록을 가져오고 새로운 메시지를 수신할 수 있습니다. `MessageList` 및 `Message` Chatscope UI 구성 요소를 사용하여 모든 메시지를 채널로 수신하도록 표시하고, 발신자 정보, 메시지 내용 및 타임스탬프와 매핑할 수 있습니다.

이제 사용자가 채팅 기록을 볼 수 있고 메시지를 동시에 게시할 수 있는 경로를 작성해봅시다. 앱 디렉토리의 page.tsx 파일을 아래 코드로 업데이트해주세요:



```js
"use client";

import { useState } from "react";
import Messages from "./Messages";
import { Button } from "@/components/ui/button";
import { Channel, Chat } from "stream-chat-react";
import { Textarea } from "@/components/ui/textarea";

export default function () {
  const [channel, setChannel] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  return (
    <div className="flex max-w-[300px] flex-col gap-y-3 p-5">
      <div className="flex w-[300px] flex-col gap-y-3">
        <span className="border-b border-gray-100 font-semibold">채팅</span>
        {channel && (
          <Chat client={chatClient}>
            <Channel channel={channel}>
              <Messages />
            </Channel>
          </Chat>
        )}
        <Textarea
          id="message_text"
          name="message_text"
          placeholder="메시지..."
          className="min-h-[100px] w-full"
        />
        <Button className="max-w-max">
          메시지 보내기 &rarr;
        </Button>
      </div>
    </div>
  );
}
```

이제 새 메시지 렌더링 및 방문자로부터 입력을 받을 수 있는 textarea 요소가 있는 인덱스 라우트를 볼 수 있습니다. 메시지를 게시하는 기능을 구현하기 전에 해당 메시지를 고유한 ID와 연결하려고 할 것입니다. 다음과 같이 코드를 업데이트하십시오:

```js
"use client";

import Messages from "./Messages";
+ import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Channel, Chat } from "stream-chat-react";
+ import { DevToken, StreamChat } from "stream-chat";
import { Textarea } from "@/components/ui/textarea";
+ import { generateUsername } from "unique-username-generator";

export default function () {
  const [channel, setChannel] = useState(null);
  const [chatClient, setChatClient] = useState(null);
+ const loadChatClient = async () => {
+   const newChatClient = new StreamChat(
+     process.env.NEXT_PUBLIC_STREAM_API_KEY,
+     {
+       enableWSFallback: true,
+     }
+   );
+    if (newChatClient.user) await newChatClient.disconnectUser();
+   const localUser = localStorage.getItem("local_user");
+   if (!localUser) localStorage.setItem("local_user", generateUsername());
+   const id = localStorage.getItem("local_user");
+   const userToConnect = { id };
+   await newChatClient.connectUser(userToConnect, DevToken(userToConnect.id));
+   setChatClient(newChatClient);
+ };
+ useEffect(() => {
+   loadChatClient();
+ }, []);
  return (
    <div className="flex max-w-[300px] flex-col gap-y-3 p-5">
      {/* 나머지 컴포넌트는 그대로 유지 */}
    </div>
  );
}
```

이제 loadChatClient 함수를 한 번 호출하여 웹소켓 연결을 Stream의 메시징 채널로 활성화했습니다. 그런 다음 세션과 연관된 사용자를 연결 해제합니다. 마지막으로, 방문자를 위해 고유한 사용자명을 생성합니다 (localStorage에 없는 경우). 이러한 단계를 통해 방문자가 고유하게 식별됨을 보장합니다.



특정 채널의 메시지를 청취하려면 다음과 같이 코드를 업데이트하세요:

```js
"use client";

// Imports as is

export default function () {
  const [channel, setChannel] = useState(null);
  const [chatClient, setChatClient] = useState(null);
+  const watchChannel = () => {
+    const channel = chatClient.channel("messaging", "livestreaming_chat", {
+      name: "실시간 스트리밍 채팅",
+    });
+    channel.watch().then(() => setChannel(channel));
+  };
  const loadChatClient = async () => {
    const newChatClient = new StreamChat(
      process.env.NEXT_PUBLIC_STREAM_API_KEY,
      {
        enableWSFallback: true,
      }
    );
    if (newChatClient.user) await newChatClient.disconnectUser();
    const localUser = localStorage.getItem("local_user");
    if (!localUser) localStorage.setItem("local_user", generateUsername());
    const id = localStorage.getItem("local_user");
    const userToConnect = { id };
    await newChatClient.connectUser(userToConnect, DevToken(userToConnect.id));
    setChatClient(newChatClient);
  };
  useEffect(() => {
    loadChatClient();
  }, []);
+  useEffect(() => {
+    if (chatClient) watchChannel();
+  }, [chatClient]);
  return (
    <div className="flex max-w-[300px] flex-col gap-y-3 p-5">
      {/* 나머지 컴포넌트는 동일한 상태로 유지 */}
    </div>
  );
}
```

방문자는 이제 livestreaming_chat 고유 ID로 식별되는 Live Stream Chat 채널에 연결되었습니다. 그런 다음 watch() 유틸리티를 사용하여 수신된 메시지를 청취하고 컨텍스트를 업데이트합니다.

채널에 메시지를 게시하려면 다음과 같이 코드를 업데이트하세요:



```js
"use client";

// 그대로 가져오기

export default function () {
  // 변수, 훅 그대로
  return (
    <div className="flex max-w-[300px] flex-col gap-y-3 p-5">
      <div className="flex w-[300px] flex-col gap-y-3">
        {/* 컴포넌트 나머지 */}
        <Button
          className="max-w-max"
          onClick={() => {
            if (channel) {
              channel.sendMessage({
                text: document.getElementById("message_text").value,
              });
              document.getElementById("message_text").value = "";
            }
          }
        >
          Send Message &rarr;
        </Button>
      </div>
    </div>
  );
}
```

onClick 이벤트에서 sendMessage 유틸리티를 사용하여 방 정보에 메시지를 게시할 수 있습니다. 깔끔하게 구현했네요!

이제 손님이 방문자를 위해 고유한 ID를 무작위로 생성하고 메시지 목록을 동적으로 렌더링하며 메시지를 게시할 수 있는 반응형 채팅 인터페이스를 완성했습니다. 이제 Next.js 애플리케이션을 Vercel에 배포합시다.

# Vercel에 배포하기



이제 코드를 Vercel에 배포할 준비가 되었습니다. 아래 단계를 따라 배포하세요:

- 먼저 앱 코드가 포함된 GitHub 저장소를 만듭니다.
- 그런 다음 Vercel 대시보드로 이동하여 새 프로젝트를 만듭니다.
- 새 프로젝트를 방금 만든 GitHub 저장소에 연결합니다.
- 설정에서 환경 변수를 로컬 .env 파일과 일치하도록 업데이트합니다.
- 배포를 클릭합니다.

# 마치며

요약하면, 이 튜토리얼은 Next.js와 Stream을 통합하여 동적 실시간 채팅 환경을 구축하는 방법에 대한 포괄적인 안내를 제공합니다. 사용자가 인증 없이 참여할 수 있도록 허용하고 권한을 세밀하게 제어하여 실시간 상호작용을 보다 쉽게 만드는 방법을 배웠습니다.



# 더 많은 정보

더 자세한 통찰력을 얻으려면 이 게시물에서 인용된 참고 자료를 살펴보세요.

- GitHub 저장소
- 챗스코프 UI 킷
- 인증되지 않은 사용자 - 스트림
- 채널 시청 - 스트림