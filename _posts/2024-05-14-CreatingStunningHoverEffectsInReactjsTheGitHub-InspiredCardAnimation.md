---
title: "Reactjs에서 멋진 호버 효과 만들기 GitHub을 영감받은 카드 애니메이션"
description: ""
coverImage: "/assets/img/2024-05-14-CreatingStunningHoverEffectsInReactjsTheGitHub-InspiredCardAnimation_0.png"
date: 2024-05-14 11:08
ogImage: 
  url: /assets/img/2024-05-14-CreatingStunningHoverEffectsInReactjsTheGitHub-InspiredCardAnimation_0.png
tag: Tech
originalTitle: "Creating Stunning Hover Effects In Reactjs: The GitHub-Inspired Card Animation"
link: "https://medium.com/@sajjadjavadi/creating-stunning-hover-effects-in-reactjs-the-github-inspired-card-animation-f85bae6dc226"
---



![Card Hover Effect](https://miro.medium.com/v2/resize:fit:1200/1*Cm18EAy6mzdv8N4iOpm1mA.gif)

이 글에서는 React를 사용하여 매혹적인 카드 호버 효과를 구현하는 방법을 살펴봅니다. 커서를 따라 움직이는 동적 라이트 효과를 추가하는 과정부터 사용자 경험을 몰입적이고 시각적으로 매력적으로 만드는 것까지 다룰 것입니다. 마우스 이벤트 처리부터 부드러운 애니메이션 및 성능 최적화까지, 웹 프로젝트를 높이는 눈에 띄는 카드 상호작용을 만드는 데 필요한 모든 것을 다룰 것입니다.

먼저, CardWithAnimationComponent 라는 컴포넌트를 생성합니다:

```js
function CardWithAnimationComponent({children}: { children: ReactNode }) {
    return (
        <div className={styles.main_div_card_with_animation}>
            {children}
        </div>
    );
}
```   
  



안녕하세요! 보시다시피, children이라는 하나의 prop을 가져와요. 이 prop은 ReactNode 타입이에요. 컴포넌트 내부에서는 스타일시트에서 CSS 클래스인 main_div_card_with_animation을 가진 `div` 요소를 렌더링하고 이 `div` 내에 children을 렌더링해요.

다음 단계에서 화면에서 커서 위치를 가져오기 위해 이 코드를 작성했어요:

```js
function CardWithAnimationComponent({children}: { children: ReactNode }) {
    const [hoverPosition, setHoverPosition] = useState({x: 0, y: 0});

    const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        setHoverPosition({x, y});
    };

    return (
        <div className={styles.main_div_card_with_animation}
             onMouseMove={handleMouseMove}>
            {children}
        </div>
    );
}
```

컴포넌트 내부에서 useState 훅을 사용하여 hoverPosition이라는 상태 변수를 초기화하고, 이 변수는 x와 y라는 속성을 갖는 객체이며, 초기값은 모두 0으로 설정돼요. 그런 다음 MouseEvent를 인수로하여 handleMouseMove 함수를 정의했어요. 이 함수는 마우스가 컴포넌트 내에서 움직일 때마다 현재 마우스 좌표 (clientX 및 clientY)로 hoverPosition 상태를 업데이트해요.



이제 커서를 따라 이동하는 라이트를 만들기 위해 또 다른 div를 추가할 시간입니다:

```js
<div className={styles.main_div_card_with_animation}
     onMouseMove={handleMouseMove}>
    {children}
    <div
      className={styles.light}
        style={
          left: hoverPosition.x,
          top: hoverPosition.y,
          zIndex: -1,
         }/>
</div>
```

```js
.main_div_card_with_animation {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgb(0, 0, 0);
}

.light {
    position: absolute;
    width: 50%;
    aspect-ratio: 1;
    border-radius: 50%;
    filter: blur(100px);
    -webkit-filter: blur(100px);
    background-color: rgba(255, 39, 223, 0.51);
}
```

이 CSS 코드는 .light 클래스를 만들어서 position을 absolute로, width를 50%로 설정하고, filter 속성을 사용하여 요소에 매우 강한 blur 효과를 적용합니다.




![이미지](https://miro.medium.com/v2/resize:fit:1200/1*Q9mUuviNZgZdAB_iUsmfkg.gif)

마우스 커서를 따라 이동하는 빛이 있지만 2 가지 문제가 있습니다. 먼저, 빛이 커서의 중심이 아니며 둘째로 마우스가 div 영역을 벗어나면 빛이 사라지지 않습니다.

## 빛의 위치 수정하기

이 문제를 해결하기 위한 아이디어 중 하나는:
  



```js
function CardWithAnimationComponent({children}: { children: ReactNode }) {
    const [hoverPosition, setHoverPosition] = useState({x: 0, y: 0});
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const lightSize = rect.width * 0.5; // 50% of container's width, equal to light size in css file
        const x = e.clientX - rect.left - lightSize / 2;
        const y = e.clientY - rect.top - lightSize / 2;
        setHoverPosition({x, y});
    };
    return (
        <div className={styles.main_div_card_with_animation}
             onMouseMove={handleMouseMove}
             ref={containerRef}>
            {children}
            <div
                className={styles.light}
                style={{
                    left: hoverPosition.x,
                    top: hoverPosition.y,
                    zIndex: -1,
                }}
            />
        </div>
    );
}
```

저는 containerRef를 추가했고 handleMouseMove 함수도 변경했습니다. containerRef는 useRef 훅을 사용하여 생성된 참조 객체입니다. 이 객체는 카드의 컨테이너 div 요소에 할당됩니다. React에서 Refs는 렌더 메서드에서 생성된 DOM 노드나 React 요소에 액세스하는 방법을 제공합니다. 이 경우 containerRef는 handleMouseMove 함수에서 컨테이너와 마우스 위치를 계산하는 데 사용됩니다.

handleMouseMove 함수에서 x와 y 좌표가 어떻게 계산되는지 살펴보겠습니다:

- 마우스 이동 이벤트가 발생하면 clientX 및 clientY 속성이 제공됩니다. 이는 브라우저 창의 클라이언트 영역에 대한 마우스 포인터의 수평 및 수직 좌표를 나타냅니다.
- 직사각형과 오프셋: getBoundingClientRect() 메서드는 요소의 크기와 뷰포트에 대한 위치를 반환합니다. 여기서 containerRef로 참조된 컨테이너 div에 대해 호출됩니다. rect 객체에는 요소의 상하좌우 위치를 나타내는 top, left, right, bottom과 같은 속성이 포함됩니다.
- 빛 크기 조정: lightSize는 컨테이너 너비의 반( rect.width * 0.5 )로 계산됩니다. 이는 CSS 파일에서 빛의 크기에 해당합니다.
- X와 Y 계산: x와 y 좌표를 컨테이너에 대해 계산하기 위해 마우스의 clientX 및 clientY 위치에서 컨테이너의 left 및 top 위치를 각각 빼줍니다. 추가로 lightSize의 절반을 빼서 x와 y 좌표가 마우스 포인터를 중심으로 정렬되도록 합니다.



<img src="https://miro.medium.com/v2/resize:fit:1200/1*juNu5QaGs6gO0FmqX4jQDA.gif" />

## 마우스가 div를 벗어났을 때 가시성 수정

```js
function CardWithAnimationComponent({children}: { children: ReactNode }) {
    const [hoverPosition, setHoverPosition] = useState({x: 0, y: 0});
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const lightSize = rect.width * 0.5; // container 너비의 50%, CSS 파일에서 빛 크기와 동일
        const x = e.clientX - rect.left - lightSize / 2;
        const y = e.clientY - rect.top - lightSize / 2;
        setHoverPosition({x, y});
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div className={styles.main_div_card_with_animation}
             onMouseMove={handleMouseMove}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
             ref={containerRef}>
            {children}
            <div
                className={styles.light}
                style={{
                    left: hoverPosition.x,
                    top: hoverPosition.y,
                    zIndex: -1,
                    opacity: isHovering ? '1' : '0',
                    transition: 'opacity 500ms ease',
                }}
            />
        </div>
    );
}
```

여기에는 빛의 투명도를 설정하고 애니메이션과 함께 보여주기 위해 isHovering 및 handleMouseEnter 및 handleMouseLeave를 추가했습니다. 그리고 끝났어요!




![image](https://miro.medium.com/v2/resize:fit:1200/1*Fu0K11BdC_r-j1gLHidQfA.gif)

❤️ 이 기사를 읽어 주셔서 감사합니다. 여러분의 생각을 듣고 싶습니다. 저에 대해 더 알고 싶으시면 제 웹사이트를 방문해주세요:
