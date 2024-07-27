---
title: "스크롤이 맨 아래로 도착했는지 감지하기"
description: ""
coverImage: "/assets/img/2024-05-12-Detectscrollreachesthebottom_0.png"
date: 2024-05-12 21:44
ogImage: 
  url: /assets/img/2024-05-12-Detectscrollreachesthebottom_0.png
tag: Tech
originalTitle: "Detect scroll reaches the bottom"
link: "https://medium.com/@alan.nguyen2050/detect-scroll-reaches-the-bottom-acb315824214"
---


안녕하세요, 오늘은 사용자가 페이지 맨 아래로 스크롤할 때 감지하는 방법을 알려 드리겠습니다.

코딩에 들어가기 전에 계산에 필요한 몇 가지 중요한 정보를 이해하는 것이 중요합니다:

- window.innerHeight: 보이는 콘텐츠의 높이입니다.
- document.body.scrollHeight: 보이는 부분과 숨겨진 부분을 모두 포함한 전체 콘텐츠의 총 높이입니다.
- window.scrollY: 사용자가 스크롤한 위치를 나타냅니다.

명확히 이해하기 위해 예제를 드리겠습니다:



먼저, NextJS와 TypeScript를 사용하여 소스 코드를 초기화하고, 익숙한 다른 프레임워크를 사용할 수도 있어요.

다음으로 각각 높이가 500px인 `div`를 3개 추가할 거에요.

<img src="/assets/img/2024-05-12-Detectscrollreachesthebottom_0.png" />

이렇게 하면 전체 콘텐츠의 높이가 1500px가 됩니다.




![이미지](https://miro.medium.com/v2/resize:fit:1200/1*Qocsql64DWbgFLXBqug2SA.gif)

윈도우 높이를 500px로 조정하면 다음과 같이 됩니다:

![이미지](/assets/img/2024-05-12-Detectscrollreachesthebottom_1.png)

innerHeight는 빨간색 상자 영역이고, outerHeight에는 주소 표시줄과 탭 표시줄이 포함됩니다.



좋아요, 이제 document.body.scrollHeight와 window.innerHeight를 확인할 거예요.

그럼 이제 scrollY를 확인해볼게요.

![image](https://miro.medium.com/v2/resize:fit:1200/1*tSttaLTndCd9JLMhdbz29A.gif)

동영상을 보시면 알 수 있지만, 페이지에 처음 접속했을 때 scrollY 값은 0일 거에요. 왜냐하면 아직 스크롤하지 않았기 때문이죠. 그런 다음 페이지를 스크롤하기 시작하면, 스크롤한 거리에 따라 scrollY 값이 적절하게 변경될 거에요.



그리고 페이지를 맨 아래로 스크롤하면 scrollY = scrollHeight - innerHeight가 됩니다.

아래는 해당하는 공식입니다.

```js
const scrolledTo = window.scrollY + window.innerHeight
const isReachBottom = document.body.scrollHeight === scrolledTo
```

이제 한번 시도해 봅시다!



```js
useEffect(() => {
    const onscroll = () => {
        const scrolledTo = window.scrollY + window.innerHeight;
        const isReachBottom = document.body.scrollHeight === scrolledTo;
        if (isReachBottom) alert("맨 아래에 도달했습니다!");
    };
    window.addEventListener("scroll", onscroll);
    return () => {
        window.removeEventListener("scroll", onscroll);
    };
}, []);
```

<img src="https://miro.medium.com/v2/resize:fit:1200/1*Vv4q8HBbBSC6n32NRV97cQ.gif" />

좋아요! 작동합니다!

하지만 무한 스크롤을 위해 직장에서 사용하면 좋은 방법은 아닙니다. 스크롤이 맨 아래에 도달할 때까지 API를 호출하는 것은 좋지 않습니다. 이렇게 하면 사용자 경험이 나빠집니다. 대신, 스크롤이 맨 아래에서 일정 거리(예: 맨 아래에서 300px)를 벗어나면 API 호출을 트리거하고 새 콘텐츠가 로드되어 문서에 추가됩니다. 이렇게 하면 사용자가 기다리는 시간이 줄어듭니다.




위의 공식은 다음과 같습니다:

```js
const scrolledTo = window.scrollY + window.innerHeight
const threshold = 300
const isReachBottom = document.body.scrollHeight - threshold === scrolledTo
```

잘 보이지만 여기 작은 문제가 있어요. 사용하는 것이 있습니다. 동등성 연산자 ===을 사용하면 scrollY가 사용자가 스크롤할 때마다 1픽셀씩 증가하지 않기 때문에 isReachBottom이 여러 번 false가 될 가능성이 높습니다. 사용자가 얼마나 빨리 스크롤하는지에 따라 달라집니다.

이 문제를 해결하려면 `(=`를 사용하면 됩니다:



```js
const isReachBottom = document.body.scrollHeight - threshold <= scrolledTo
```

좋아요, 새로운 것을 테스트해볼까요:

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*d6GdJZpt4RNPfe-03diBfQ.gif)

좋아요, 성공했어요!



이제 스크롤이 맨 아래에 도달하는 방법을 배웠어요!

데모 코드는 여기에서 확인할 수 있어요: [https://github.com/alanng2050/medium-demo-scroll-to-bottom](https://github.com/alanng2050/medium-demo-scroll-to-bottom)

읽어 주셔서 감사합니다!

즐거운 코딩하세요!