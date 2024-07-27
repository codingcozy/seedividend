---
title: "Create-React-App과 react-beautiful-dnd를 사용하여 간단한 드래그 앤 드롭을 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_0.png"
date: 2024-05-14 10:17
ogImage: 
  url: /assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_0.png
tag: Tech
originalTitle: "How to implement a simple drag-and-drop using Create-React-App and react-beautiful-dnd?"
link: "https://medium.com/codex/how-to-implement-a-simple-drag-and-drop-using-create-react-app-and-react-beautiful-dnd-4e6e57a2299f"
---


오늘은 개인 프로젝트를 진행하면서 애플리케이션 내에서 더 많은 사용자 정의를 가능하게하기 위해 드래그 앤 드롭 기능을 구현해야 했어요. 문서, 공식 문서 및 YouTube 비디오를 많이 살펴보느라 많은 시간을 보냈죠. 공부하고 구현을 시도한 깁ㄴ 긴 과정 끝에, 마침내 작동하게 만들었어요. 그런데 어떻게 하느냐구요? 그러기 전에, React 앱을 만들어 봐요!

```js
npx create-react-app dnd-example
cd dnd-example
npm start
```

축하해요! 이제 React 앱을 만들었어요.

![드래그 앤 듭 구현 방법](/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_0.png)



하지만 이것은 시작에 불과해요. 오늘 사용할 패키지를 설치해봅시다.

npm i react-beautiful-dnd

react-beautiful-dnd가 무엇인지 모른다면 괜찮아요. Atlassian 팀에서 개발한 라이브러리인데, Jira를 만든 회사입니다. 또한 완전히 오픈 소스이며 프로젝트는 여기에서 확인할 수 있어요. 그리고 우리는 앱을 DragDropContext 컴포넌트 사이에 감싸야 해요. 기억하세요, DragDropContext는 하나만 가질 수 있어요. 그래서 권장하는 공식 문서의 사용 방법을 따르면 전체 앱을 이 사이에 감싸는 것이 좋은 아이디어에요. 현재 내 App.js 파일은 이렇게 생겼어요.



드래그 앤 드롭 기능을 사용하기 위해서는 react-beautiful-dnd가 제공하는 DragDropContext가 필요합니다. 우리가 사용하는 라이브러리는 중첩된 DragDropContext를 지원하지 않습니다. 그러나 DragDropContext는 onDragEnd 콜백이 필요합니다. 이 콜백은 요소를 드래그한 후에 호출됩니다. 간단하게 하기 위해 함수를 사용할 것입니다. 제가 코드를 복사하여 붙여넣을 수 있는 형식으로 제공하지는 않겠습니다. 연습이 중요하다고 생각하기 때문입니다. 지금까지 우리 앱이 어떻게 보이는지 살펴봅시다:

![이미지](/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_2.png)

하나씩 살펴보겠습니다.

우리는 handleOnDragEnd라는 함수를 정의했고, result라는 매개변수를 받는데, 현재 중요하지 않습니다. 드래그 앤 드롭 기능이 작동하려면 DragDropContext 구성 요소로 둘러싸여야 합니다. 많은 사용 가능한 속성과 콜백이 있지만 onDragEnd를 제외하고는 필수 사항이 없습니다. 따라서 핸들러 함수를 DragDropContext 구성 요소의 속성으로 추가했습니다. 웹 사이트에 드래그 앤 드롭할 항목(빨간색 상자 목록)을 추가해보겠습니다. HTML 및 CSS 코드에 대해서는 HTML이나 CSS 튜토리얼이 아니기 때문에 코드를 제공하겠습니다. App.js 파일에는 DragDropContext 태그 내의 드래그 가능한 콘텐츠가 필요합니다. 그러므로 다음을 수행하겠습니다:




![이미지](/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_3.png)

```js
<ul>
<li><div className="box red"></div></li>
<li><div className="box green"></div></li>
</ul>
```

그리고 App.css 파일에서 다음을 수행할 거예요:

![이미지](/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_4.png)




```jsx
ul {
list-style: none;
padding-left: 5px;
}
.box {
width: 200px;
height: 50px;
margin-bottom: 5px;
}
.red {
background: red;
}
.green {
background: green;
}
```

이 내용에 대해 자세히 언급하지 않겠습니다. 여러분은 여전히 상자를 끌어다 놓거나 드롭할 수 없다는 것을 알 수 있을 겁니다. 먼저 상자를 놓기에 집중해 보겠습니다. 이를 위해 Droppable이라는 다른 구성 요소를 가져와야 합니다. Droppable은 요소를 놓을 수 있는 영역을 정의하는 데 도움이 됩니다. 현재 사용 중인 경우 ul 요소 전체를 놓을 수있는 영역으로 하고 싶습니다.

<img src="/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_5.png" />

좋아요, 쉬운 부분이죠? 그런데, Droppable 구성 요소에도 droppableId라는 속성이 필요합니다. 왜 그런지 궁금할 수 있습니다. HTML 페이지 전체에는 1개 이상의 놓을 수있는 영역이 있을 수 있으며 react-beautiful-dnd는 무슨일이든 요소를 놓는 지점을 식별해야 합니다. 그래서 id를 추가해 보겠습니다. 이는 문자열이면 무엇이든 상관없습니다. 저는 "boxes"라고 부를 것입니다.




![이미지](/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_6.png)

더 많은 속성이 있습니다. 'type', 'isDropDisabled' 등이 있지만 이번에는 간단한 드래그 앤 드롭을 할 것입니다. 더 자세히 살펴보고 싶다면 여기에서 공식 문서를 확인할 수 있어요. 이제 우리의 Droppable 구성 요소도 두 개의 인수가 있는 함수가 필요합니다. 이러한 인수들은 provided와 snapshot입니다. 이 예시에서는 provided만 사용하고 이것만 필요한 매개변수입니다. provided를 통해 중요한 3가지를 얻을 수 있습니다; provided.innerRef, provided.placeholder, provided.droppableProps입니다. 간단히 말하면 provided.innerRef를 가능한 높은 DOM 노드에 바인딩해야 합니다. 이것은 ReactDOM을 사용하지 않고도 DOM 노드를 찾을 수 있게 도와줍니다. provided.placeholder는 요소를 드래그할 때 플레이스홀더 공간을 만듭니다. 중요한 점은 provided.innerRef에 바인딩한 구성 요소 내에 플레이스홀더를 두어야 합니다. 마지막 props인 provided.droppableProps는 전개 연산자입니다. react-beautiful-dnd가 필요로 하는 모든 데이터와 스타일을 포함합니다. 이러한 props를 모두 동일한 요소에 넣어야 합니다. 인라인 스타일이 있는 경우, provided.droppableProps를 먼저 입력해야 합니다. provided.droppableProps에 스타일도 포함되어 있어 인라인 스타일이 덮어씁니다. 이제 실습해 봅시다:

![이미지](/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_7.png)

지금 웹사이트를 확인해보면 아무 변화가 없을 것입니다. 그 이유는 무엇일까요? 우리의 요소들은 아직 드래그할 수 없기 때문입니다! 이제 이 문제를 해결해 봅시다. 먼저 Draggable을 가져와야 합니다. Draggable은 Droppable과 많은 경우 비슷하지만 요소를 드래그할 수 있게 만듭니다. DragDropContext와 달리, 여러 개의 Droppable과 Draggable을 가질 수 있습니다. Draggable은 항상 하나의 Droppable 내에 포함되어야 하고 Droppable은 항상 DragDropContext 내에 포함되어야 합니다. Droppable과 마찬가지로 Draggable도 동일한 문서에서 여러 개를 사용할 수 있기 때문에 ID가 필요합니다. 그러나 더 나아가기 전에, 여기서 배열을 사용하고 수동으로 작성된 div가 아닌 배열과 함께 사용할 것이므로 코드를 리팩토링하고 싶습니다. 또한 그 논리를 설명할 것이므로, 수동으로 작성된 div와 함께 사용한다 해도 잘 이해할 수 있도록 하겠습니다. 함께 따라오신다면, App 구성 요소 내에서 다음과 같이 객체들의 간단한 배열을 정의할 것입니다:



아주 명확하지요. 이제 div를 표시하는 방법을 개선해 봅시다:

이 기사는 적어도 React의 기본 지식이 있음을 가정하므로 map에 대해 자세히 설명하지는 않겠습니다. 배열을 해체하고 목록 항목에 키 값을 할당했습니다. 클래스에는 템플릿 리터럴이라는 것을 사용했습니다. 이게 무엇인지 모르겠다면 여기에서 내 기사를 읽어보세요. 페이지를 새로 고쳐도 아무것도 바뀌지 않을 겁니다. 이제 웹사이트에 드래그 기능을 추가해 봅시다. 먼저, 드래그 가능한 내용을 감싸는 데 필요한 것은 Draggable 컴포넌트입니다. 제 경우에는 li 요소가 됩니다.



<img src="/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_10.png" />

드래그 가능한 항목을 만들려면 index와 ID가 필요합니다. ID는 다시 한 번 문자열이어야 합니다. 여기서는 map 함수에서 받은 index를 사용할 것입니다. 그런데 문제는 ID가 숫자인데, 그래서 우리는 그 아주 오래된 toString() 함수를 사용할 겁니다. 시작해 봅시다!

<img src="/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_11.png" />

좋아요, 여기서부터는 좀 더 가까워졌네요. Droppable과 유사하게, Draggable 컴포넌트도 두 가지 인수를 받는 함수가 필요합니다. 이 인수들은 우리 친구인 provided와 snapshot입니다. 다시 한 번, 우리는 provided만 사용할 것이고, 이것이 유일한 필수 인수입니다. Droppable과 마찬가지로, provided.innerRef, provided.draggableProps, provided.dragHandleProps라는 3가지 중요한 것을 얻습니다. 이들을 다시 동일한 요소에 할당해야 합니다. 이것들이 하는 일은 Droppable과 유사합니다. 우리는 리스트 요소에 이것들을 추가할 것입니다. 왜냐하면 우리는 이것이 드래그 가능하도록 하고 싶기 때문이죠.



![이미지](/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_12.png)

하지만 조금 변경을 해줘야 해요. key prop을 Draggable 컴포넌트로 옮기겠어요. 각 draggable 요소에는 key가 필요해요.

![이미지](/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_13.png)

좋아요, 멋지죠! 이제 페이지를 새로 고치면 요소를 드래그 앤 드롭할 수 있어요. 와아아!



<img src="https://miro.medium.com/v2/resize:fit:638/1*QSGvvVpg3ZwZF1ecxNeB3g.gif" />

알겠어요, 그거 좋은데 이건 의미가 없어요. 드래그앤드랍하는 동안 저장조차 안돼있네요. 이러한 경우에는 상태(states)를 사용할 거예요. 먼저 useState를 import해보죠.

<img src="/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_14.png" />

다음으로, 상태(states)를 정의할거예요. 저는 이를 박스(boxes)라고 부를거에요. 그리고 시작할 때 배열을 삭제하고 상태로 할당할거에요.



<img src="/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_15.png" />

알겠어요, 페이지를 새로고침하면... 아무것도 변하지 않을 거예요! 그건, 드래그가 끝났을 때 어떻게 동작하는지 다뤄주지 않았기 때문이죠. 그래서 handleonDragEnd를 정의했던 거예요, 맞죠? 그럼, 그걸 처리해 볼게요! 일단 결과가 무엇인지 간단히 console.log로 확인해 볼 거예요.

<img src="/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_16.png" />

알겠어요, 그것은 우리가 사용할 수 있는 여러 멋진 요소들을 가진 객체네요. 그 중에서도 destination과 source에 관심이 있지만요. Source는 우리가 드래그한 요소에 대한 정보를 가지고 있고, destination은 우리가 그것을 끌어다 놓은 위치에 대한 정보를 가지고 있어요. 이 지식을 바탕으로, box 배열에서 새 배열을 만들어 볼게요.



<img src="/assets/img/2024-05-14-Create-React-App와 react-beautiful-dnd를 사용하여 간단한 드래그 앤 드롭을 구현하는 방법_17.png" />

좋아요. 다음으로, 새 배열에서 드래그 된 요소를 제거하고 이동한 위치에 추가하려고 합니다. 이를 위해 다음과 같이 소스와 대상의 인덱스를 사용해야합니다.

<img src="/assets/img/2024-05-14-Create-React-App와 react-beautiful-dnd를 사용하여 간단한 드래그 앤 드롭을 구현하는 방법_18.png" />

좋아요, 그런데 그것만으로는 의미가 없어요, 맞죠? 우리는 그냥 새 배열을 만드는 것 뿐이에요. 그래 놓은 새 배열을 우리의 상태로 설정해야 해요.



<img src="/assets/img/2024-05-14-Create-React-App와-react-beautiful-dnd를 사용하여 간단한 드래그 앤 드롭을 구현하는 방법_19.png" />

자, 이제 웹사이트를 다시 확인해 봅시다!

<img src="https://miro.medium.com/v2/resize:fit:596/1*6BHSxIDCCkGF_gQq3sl5Ew.gif" />

잘 작동하네요! 하지만 작은 버그가 있네요. 만약 박스를 우리가 Droppable을 정의하지 않은 곳에 끌어다 놓으면 어떻게 될까요? 한번 시도해 보죠:



<img src="/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_20.png" />

음, 예상대로 제 상자가 원래 위치로 돌아가고 이 오류가 발생했어요. 해결 방법은 간단해요. 목적지가 null이면 간단히 리턴하면 돼요:

<img src="/assets/img/2024-05-14-Howtoimplementasimpledrag-and-dropusingCreate-React-Appandreact-beautiful-dnd_21.png" />

이제 Atlassian의 react-beautiful-dnd를 사용하여 완벽하게 작동하는 간단한 드래그 앤 드롭 기능이 준비됐어요! 이 기사를 위해 작성한 코드를 검토하려면 아래에 GitHub repo 링크를 추가하겠습니다.



언제나 이 코드에 대해 개선 사항이나 질문이 있으면 아래 댓글을 남겨 주세요. 또한 제 일일 학습 루틴에서 더 많은 글을 보고 싶다면 제 팔로우를 고려해 주세요. 그렇다면, 다음 글에서 만나요!

깃허브 저장소