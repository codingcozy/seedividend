---
title: "iFrame가 리스너를 제거하고 React는 알지 못한다 "
description: ""
coverImage: "/assets/img/2024-05-12-iFramewipesoutlistenersandReactdoesnotknowaboutit_0.png"
date: 2024-05-12 18:44
ogImage: 
  url: /assets/img/2024-05-12-iFramewipesoutlistenersandReactdoesnotknowaboutit_0.png
tag: Tech
originalTitle: "iFrame wipes out listeners and React does not know about it 🤔"
link: "https://medium.com/@manansharma18_22712/iframe-wipes-out-listeners-and-react-does-not-know-about-it-7c5aa069691a"
---


# 개요

이 기사에서는 부모 창과 자식 iFrame 간에 메시지를 보내는 방법을 보여드리고 싶어요. 이 과정에서 iFrame이 리스너를 어떻게 지우는지에 대해 흥미로운 점을 발견했어요. 걱정하지 마세요, 나아가면서 스크린샷을 게시할 거에요. [GitHub 링크](https://github.com)

즐겁게 공부하세요!

# iFrame이란 무엇인가요?



iFrame 또는 인라인 프레임은 부모 웹페이지 내에 다른 문서를 로드하는 HTML 요소입니다.

# iFrame을 사용하는 곳은 어디인가요?

iFrame은 이미 있는 HTML 안에 HTML을 포함시키고 싶을 때나 신뢰할 수 없거나 제3자 스크립트를 백그라운드에서 실행하고 싶을 때 사용합니다. 즉, 광고 섹션을 웹사이트에 표시하거나 YouTube 비디오를 넣고 싶을 때 iFrame을 사용할 수 있습니다. 주로 iFrame을 사용하는 경우는 제3자 사이트/콘텐츠를 호스팅하는 것입니다.

# iFrame 생성하기



제가 만든 프로젝트는 간단한 React 앱(v18.2.0)입니다. 부모 위젯(App.tsx)은 iFrame 컴포넌트(IFrame.tsx)를 로드합니다. 두 컴포넌트가 마운트될 때 모두 메시지 이벤트를 수신하기 위해 이벤트 리스너를 추가합니다. 이벤트 리스너는 컴포넌트가 마운트 해제될 때 제거됩니다. 부모 컴포넌트는 자바스크립트의 postMessage 함수를 사용하여 iFrame에 메시지를 보냅니다.

App.tsx

```js
import React, { useEffect, useRef } from "react";
import IFrame from "./iFrame";

const App: React.FC = () => {
 const refs = useRef<HTMLIFrameElement>(null);

 useEffect(() => {
   window.addEventListener("message", processMessage, false);
   return () => window.removeEventListener("message", processMessage);
 }, []);


 const processMessage = (event: MessageEvent) => {
   if (event.origin !== "http://localhost:8080") {
     return;
   }
   console.log("parent Event Listener", event);
 };


 const buttonClick = (event: React.MouseEvent) => {
   event.stopPropagation();
   if (refs.current === null) {
     return;
   }

   refs?.current?.contentWindow?.postMessage("부모에서 보낸 메시지", "*");
 };
 return (
   <div>
     <button
       style={ margin: "10px", marginLeft: "0px" }
       onClick={buttonClick}
     >
       자식에게 메시지 보내기
     </button>
     <IFrame ref={refs} />
   </div>
 );
};

export default App;
```

IFrame.tsx



```js
import React, { useEffect, useState, forwardRef, ForwardedRef } from "react";


interface IFrameProps {
 ref: ForwardedRef<HTMLIFrameElement>;
}

const IFrame = forwardRef<HTMLIFrameElement, IFrameProps>((prop, ref) => {
 const [message, setMessage] = useState('');
 const iframeRef = ref as React.MutableRefObject<HTMLIFrameElement>;
 useEffect(() => {
   console.log("mounted");
   iframeRef?.current?.contentWindow?.addEventListener(
     "message",
     processMessage,
     false
   );
   return () => {
     console.log("unmounted");
     iframeRef?.current?.contentWindow?.removeEventListener(
       "message",
       processMessage,
       false
     );
   };
 }, [iframeRef?.current]);


 const processMessage = (event: MessageEvent) => {
   console.log("iFrame Event Listener");
   if (event.origin !== "http://localhost:8080") {
     return;
   }


  const newMessage = message.concat(event?.data)
  setMessage(newMessage);


 };


 return (
   <div>
     <iframe id="1" {...prop} ref={ref} srcDoc={message}></iframe>
   </div>
 );
});


export default IFrame;
```

리스너가 올바르게 마운트되었는지 확인하기 위해 iFrame에서 getEventListeners(window)을 실행했습니다. iFrame에서 'message' 이벤트를 수신 대기하는 리스너를 확인할 수 있었습니다. 보안 대책으로 악의적인 사용자로부터의 메시지를 무시하도록 origin을 확인해야 합니다.

<img src="/assets/img/2024-05-12-iFramewipesoutlistenersandReactdoesnotknowaboutit_0.png" />

# 화면에서 보이는 모습




<img src="/assets/img/2024-05-12-iFramewipesoutlistenersandReactdoesnotknowaboutit_1.png" />

버튼을 클릭하면 메시지가 iFrame 안에 나타납니다.

<img src="/assets/img/2024-05-12-iFramewipesoutlistenersandReactdoesnotknowaboutit_2.png" />

이 모든 것이 정말 기뻤어요. 그러나 이곳에서 문제가 발생했습니다. 다시 메시지를 iFrame으로 보내려고 시도했을 때 iFrame UI가 변경되지 않았습니다. iFrame 안에서 "부모로부터 온 메시지"를 여러 번 보기를 기대했는데 그런 일은 일어나지 않았습니다. 버튼 클릭 시 UI가 매번 업데이트되지 못했다는 것 같았어요.



<img src="/assets/img/2024-05-12-iFramewipesoutlistenersandReactdoesnotknowaboutit_3.png" />

내 콘솔 로그를 확인해 보니, 이벤트 리스너를 언마운트한 후에 출력하는 `unmounted`가 아무런 발생하지 않았어. 이것은 React가 버튼 클릭 후 iFrame의 이벤트 리스너를 제대로 언마운트하지 않았음을 확인했어. (재표현)

useEffect의 의존성 배열을 건드리면서 리스너를 다시 마운트해 보았지만, 모든 시도가 실패했어. 자식에게 메시지를 여러 번 보내도, 자식은 첫 번째 메시지만 듣더라고.

# 그래서 어떻게 하면 제대로 동작시킬 수 있을까?



더 궁금해져서, 처음 메시지가 도착한 후에 다시 이벤트 리스너를 확인해 봤어요. 여기서 문제를 발견했어요.

![이미지](/assets/img/2024-05-12-iFramewipesoutlistenersandReactdoesnotknowaboutit_4.png)

첫 번째 메시지가 도착한 후에 iFrame에는 어떠한 리스너도 연결되어 있지 않았어요. 마치 어떻게든 첫 번째 메시지가 도착한 후에 리스너들이 제거된 것처럼 보였어요.

조금 더 실험해 본 결과, srcDoc 요소에 문제가 있는 것을 발견했어요. 따라서, 상태가 변경될 때 srcDoc 요소가 iFrame의 새 메시지를 가리키게 되었어요. 이 변경으로 인해 iFrame은 iFrame과 관련된 모든 이벤트 리스너를 모두 제거하고 리액트는 아무것도 모르게 되었어요 🫢.



그래서 React는 iFrame이 그것을 하는지 모릅니다. 왜냐하면 React에게는 iFrame에 대한 참조가 추가/제거되어야 하는데, 참조가 절대 변경되지 않기 때문에 React는 이벤트 리스너를 마운트하거나 언마운트하지 않습니다.

이 문제를 해결하기 위해 iFrame에 정적 HTML을 추가했으며, 메시지가 도착할 때마다 기존 HTML에 추가합니다. 이는 srcDoc가 새 HTML이 아니기 때문에 iFrame에 첨부된 이벤트 리스너를 지우지 않습니다.

```js
import React, { useEffect, forwardRef, ForwardedRef } from "react";


interface IFrameProps {
  ref: ForwardedRef<HTMLIFrameElement>;
}


const html = `<html>
<body>
<div id="changeText" value="changeText">Hello Div</div>
<button value="replyButton" id="replyButton">Reply to parent</button>
<script>
// Get the button element
var button = document.getElementById("replyButton");


// click event listener
button.addEventListener("click", function() {
  console.log('sending message to parent');
  window.parent.postMessage('Message from Child. Listen to me!');
});
</script>
</body>
</html>`;


const IFrame = forwardRef<HTMLIFrameElement, IFrameProps>((prop, ref) => {
  const iframeRef = ref as React.MutableRefObject<HTMLIFrameElement>;
  useEffect(() => {
    console.log("mounted");
    iframeRef?.current?.contentWindow?.addEventListener(
      "message",
      processMessage,
      false
    );
    return () => {
      console.log("unmounted");
      iframeRef?.current?.contentWindow?.removeEventListener(
        "message",
        processMessage,
        false
      );
    };
  }, [iframeRef?.current]);


  const processMessage = (event: MessageEvent) => {
    console.log("iFrame Event Listener");
    if (event.origin !== "http://localhost:8080") {
      return;
    }


    const node = document.createElement("div");
    const textNode = document.createTextNode(event?.data);
    node.appendChild(textNode);
    iframeRef?.current?.contentWindow?.document.body.appendChild(textNode);
  };


  return (
    <div>
      <iframe id="1" {...prop} ref={ref} srcDoc={html}></iframe>
    </div>
  );
});


export default IFrame;
```

# 요약



- 부모와 자식 간의 간단한 메시지 통신이 작동하지 않는 이유에 대해 공유했어요. iFrame에서 srcDoc 요소를 변경할 경우 작동하지 않아요.
- 이를 해결하기 위해 iFrame에 HTML을 삽입하고 지속적으로 추가하면 됩니다. 이렇게 하면 iFrame이 이벤트 리스너를 지워 버리는 것을 방지할 수 있어요.