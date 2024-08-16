---
title: "Apple처럼 애니메이션 설정하기 웹 인터페이스용 복잡한 애니메이션을 코딩하는 React와 Framer-Motion 사용하기"
description: ""
coverImage: "/assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_0.png"
date: 2024-06-20 02:27
ogImage: 
  url: /assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_0.png
tag: Tech
originalTitle: "Animating Like Apple: Using React and Framer-Motion to Code Complex Animations for Web Interfaces"
link: "https://medium.com/design-bootcamp/animating-like-apple-using-react-and-framer-motion-to-code-complex-animations-for-web-interfaces-c391d6e113e7"
isUpdated: true
---





![Link](https://miro.medium.com/v2/resize:fit:1200/1*VEU7TCQhdrDbzHhlzGHBPg.gif)

This article is a continuation of Animating Like Apple: Using Figma and Jitter to Design Complex Animations for Web Interfaces. We will explore how to utilize the useAnimate function from Framer Motion to execute complex animations, specifically focusing on the sequential and simultaneous animation of multiple elements and SVGs.

![Link](https://miro.medium.com/v2/resize:fit:1400/1*0Ztl6bGF41txECfcoY9vvw.gif)

# Prerequisites


<div class="content-ad"></div>

시작하기 전에 다음 사항을 확인해주세요:

- React 프로젝트가 설정되어 있어야 합니다.
- Tailwind 종속성이 설치되어 있어야 합니다. `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
- Framer Motion 패키지가 설치되어 있어야 합니다. `npm i framer-motion`

![이미지](/assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_0.png)

SVG.svg

<div class="content-ad"></div>


<svg width="244" height="84" viewBox="0 0 244 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="121.5" cy="40.5" r="40.5" fill="#0171E2"/>
    <circle cx="121.5" cy="40.5" r="22.5" fill="#EFEFF2"/>
    <rect y="18" width="244" height="45" rx="22.5" fill="#EFEFF2"/>
    <g clip-path="url(#clip0_49_269)">
        <circle cx="121.528" cy="40.4722" r="16.5278" fill="#0171E2"/>
        <path d="M129.083 39.5278H123.511V33.9556C123.511 33.1056 122.85 32.4444 122 32.4444C121.15 32.4444 120.583 33.1056 120.583 33.8611V39.4333H115.011C114.161 39.4333 113.5 40.0944 113.5 40.9444C113.5 41.7944 114.161 42.3611 114.917 42.3611H120.489V47.9333C120.489 48.7833 121.15 49.35 121.906 49.35C122.756 49.35 123.322 48.6889 123.322 47.9333V42.3611H128.894C129.744 42.3611 130.311 41.7 130.311 40.9444C130.5 40.1889 129.839 39.5278 129.083 39.5278Z" fill="white"/>
    </g>
    <defs>
        <clipPath id="clip0_49_269">
            <rect width="34" height="34" fill="white" transform="translate(105 23)"/>
        </clipPath>
    </defs>
</svg>


<img src="/assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_1.png" />

이 디자인은 Figma에서 만들었고 SVG로 내보냈습니다.

<img src="/assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_2.png" />


<div class="content-ad"></div>

다음 요소들로 구성된 SVG입니다:

```js
<circle cx="121.5" cy="40.5" r="40.5" fill="#0171E2"/>
```

![image](/assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_3.png)

```js
<circle cx="121.5" cy="40.5" r="22.5" fill="#EFEFF2"/>
```

<div class="content-ad"></div>



![Image](/assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_4.png)

```js
<rect y="18" width="244" height="45" rx="22.5" fill="#EFEFF2"/>
```

![Image](/assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_5.png)

```js
<g clip-path="url(#clip0_49_269)">
    <circle cx="121.528" cy="40.4722" r="16.5278" fill="#0171E2"/>
    <path d="M129.083 39.5278H123.511V33.9556C123.511 33.1056 122.85 32.4444 122 32.4444C121.15 32.4444 120.583 33.1056 120.583 33.8611V39.4333H115.011C114.161 39.4333 113.5 40.0944 113.5 40.9444C113.5 41.7944 114.161 42.3611 114.917 42.3611H120.489V47.9333C120.489 48.7833 121.15 49.35 121.906 49.35C122.756 49.35 123.322 48.6889 123.322 47.9333V42.3611H128.894C129.744 42.3611 130.311 41.7 130.311 40.9444C130.5 40.1889 129.839 39.5278 129.083 39.5278Z" fill="white"/>
</g>
``` 


<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_6.png" />

이전 글에서 Jitter를 사용하여 각 요소를 따로 애니메이션했듯이, 이번에는 코드를 사용하여 동일한 작업을 할 것입니다.

<img src="https://miro.medium.com/v2/resize:fit:1200/1*zDS9431MMEDiTLBOut0gzw.gif" />

# Framer Motion의 useAnimate 함수 이해하기

<div class="content-ad"></div>

UseAnimateExample.jsx

```js
import { useAnimate } from "framer-motion";
import React, {useState} from "react";

const UseAnimateExample = () => {
    const [scope, animate] = useAnimate();

    const startAnimation = async () => {
        // Decrease the radius of the pink circle to 0
        await animate("#pink-circle", { r: 0 }, { duration: 0.5 });

        // Increase the radius of the pink circle to 22.5
        await animate("#pink-circle", { r: 22.5 }, { duration: 0.5 });

        // Move the pink circle horizontally to x-coordinate 400
        await animate("#pink-circle", { cx: 400 }, { duration: 0.5 });

        // Move the pink circle vertically to y-coordinate 400
        await animate("#pink-circle", { cy: 400 }, { duration: 0.5 });

        // Move the pink circle horizontally to x-coordinate 50
        await animate("#pink-circle", { cx: 50 }, { duration: 0.5 });

        // Move the pink circle vertically to y-coordinate 250
        await animate("#pink-circle", { cy: 250 }, { duration: 0.5 });

        // Move the pink circle horizontally to x-coordinate 250
        await animate("#pink-circle", { cx: 250 }, { duration: 0.5 });

        // Increase the radius of the pink circle to 50
        await animate("#pink-circle", { r: 50 }, { duration: 0.5 });

        // Combine one or more animations
        // Simultaneously move the pink circle vertically and change its radius
        const animation1 = animate("#pink-circle", { cy: 200 }, { duration: 0.5 });
        const animation2 = animate("#pink-circle", { r: 40 }, { duration: 0.5 });
        await Promise.all([animation1, animation2]); // Execute both animations at the same time

        // Another set of animations after the first set completes
        // Move the pink circle back down and increase its radius
        const animation3 = animate("#pink-circle", { cy: 250 }, { duration: 0.5 });
        const animation4 = animate("#pink-circle", { r: 50 }, { duration: 0.5 });

    };


    return (
        <div ref={scope} className="h-screen bg-black flex flex-col justify-center items-center">
            <svg width="500" height="500" viewBox="0  0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle id="pink-circle" cx="250" cy="250" r="50" fill="#F3B7B7"/>
            </svg>
            <button onClick={startAnimation} className="bg-white text-black mt-12 px-4 py-2 rounded-md">애니메이션 시작</button>
        </div>
    );
};

export default UseAnimateExample;
```

<img src="https://miro.medium.com/v2/resize:fit:1200/1*QLr4XCq2EjNQ2TsrxSCJ7A.gif" />

이 간단한 예시는 Framer Motion의 useAnimate 함수가 어떻게 작동하는지 보여줍니다. 다음에는 이 개념을 SVG 내의 여러 요소에 적용하여 포괄적인 애니메이션을 만들어보겠습니다.

<div class="content-ad"></div>

# 단계 1: SVG를 포함한 컴포넌트 생성

AppleButton.jsx

```js
import { useAnimate } from "framer-motion";
import React, {useState} from "react";

const AppleButton = () => {
    const [scope, animate] = useAnimate();

    const EntryAnimation = async () => {


    };

    const ExitAnimation = async () => {


    };


    return (
        <div ref={scope} className="h-screen bg-black flex flex-col justify-center items-center">
            <svg width="244" height="84" viewBox="0 0 244 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="121.5" cy="40.5" r="40.5" fill="#0171E2"/>
                <circle cx="121.5" cy="40.5" r="22.5" fill="#EFEFF2"/>
                <rect y="18" width="244" height="45" rx="22.5" fill="#EFEFF2"/>
                <g clip-path="url(#clip0_49_269)">
                    <circle cx="121.528" cy="40.4722" r="16.5278" fill="#0171E2"/>
                    <path d="M129.083 39.5278H123.511V33.9556C123.511 33.1056 122.85 32.4444 122 32.4444C121.15 32.4444 120.583 33.1056 120.583 33.8611V39.4333H115.011C114.161 39.4333 113.5 40.0944 113.5 40.9444C113.5 41.7944 114.161 42.3611 114.917 42.3611H120.489V47.9333C120.489 48.7833 121.15 49.35 121.906 49.35C122.756 49.35 123.322 48.6889 123.322 47.9333V42.3611H128.894C129.744 42.3611 130.311 41.7 130.311 40.9444C130.5 40.1889 129.839 39.5278 129.083 39.5278Z" fill="white"/>
                </g>
            </svg>

            <button onClick={EntryAnimation} className="bg-white text-black mt-12 px-4 py-2 rounded-md">입장</button>
            <button onClick={ExitAnimation} className="bg-white text-black mt-4 px-4 py-2 rounded-md">나가기</button>

        </div>
    );
};

export default AppleButton;
```

<img src="/assets/img/2024-06-20-AnimatingLikeAppleUsingReactandFramer-MotiontoCodeComplexAnimationsforWebInterfaces_7.png" />

<div class="content-ad"></div>

# 단계 2: 각 SVG 요소에 ID 할당하기.

```js
<svg width="244" height="84" viewBox="0 0 244 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle id="blue-circle" cx="121.5" cy="40.5" r="40.5" fill="#0171E2"/>
    <circle id="gray-circle" cx="121.5" cy="40.5" r="22.5" fill="#EFEFF2"/>
    <rect id="expanded-gray-circle" y="18" width="244" height="45" rx="22.5" fill="#EFEFF2"/>
    <g clip-path="url(#clip0_49_269)">
        <circle id="blue-inner-circle" cx="121.528" cy="40.4722" r="16.5278" fill="#0171E2"/>
        <path id="plus-sign" d="M129.083 39.5278H123.511V33.9556C123.511 33.1056 122.85 32.4444 122 32.4444C121.15 32.4444 120.583 33.1056 120.583 33.8611V39.4333H115.011C114.161 39.4333 113.5 40.0944 113.5 40.9444C113.5 41.7944 114.161 42.3611 114.917 42.3611H120.489V47.9333C120.489 48.7833 121.15 49.35 121.906 49.35C122.756 49.35 123.322 48.6889 123.322 47.9333V42.3611H128.894C129.744 42.3611 130.311 41.7 130.311 40.9444C130.5 40.1889 129.839 39.5278 129.083 39.5278Z" fill="white"/>
    </g>
</svg>
```

# 단계 3: useAnimate를 사용하여 애니메이션 코딩 시작하기

초기 상태에서 SVG가 보이지 않도록 하려면 불투명도 및 크기가 0으로 설정되어야 하므로 해당 속성을 조정하여 초깃값에서 애니메이션이 작동되도록 해야 합니다.

<div class="content-ad"></div>

또한, 우리는 각 애니메이션 세그먼트의 정확한 지속 시간을 결정하기 위해 Jitter 파일을 참조할 수 있습니다.

사각형 SVG의 x 좌표를 이동하는 등의 일부 애니메이션은 useAnimate로 직접 수행할 수 없습니다. 이러한 작업에 대해서는 React의 인라인 스타일링을 활용하여 애니메이션을 적용할 것입니다.

AppleButton.jsx

```js
import { useAnimate } from "framer-motion";
import React, {useState} from "react";

const AppleButton = () => {
    const [scope, animate] = useAnimate();

    const [expandedStyle, setExpandedStyle] = useState({width: '45px', x: '99.5', transition: 'all 0.5s cubic-bezier(0.5, 1.25, 0.3, 1)', fill: '#EFEFF2', opacity: 0});
    const [gTransform, setGTransform] = useState('');
    const [textPosition, setTextPosition] = useState({ x: 109.5, y: 41.5 });
    const textContent = "Go deeper on design";


    const EntryAnimation = async () => {
        const animation1 = animate("#blue-circle", { r: 40.5, opacity: 1 }, { duration: 0.5 });
        const animation2 = animate("#gray-circle", { r: 22.5, opacity: 1 }, { duration: 0.5 });
        await Promise.all([animation1, animation2]);
        await animate("#blue-circle", { r: 22.5, opacity: 1, cy: 40.5 }, { delay: 0.1, duration: 0.25, ease: "easeOut" });
        const animation3 = animate("#blue-inner-circle", { r: "16.5278", opacity: 1, cy: "40.4722" }, { duration: 0.25, ease: "easeOut" });
        const animation4 = animate("#plus-sign", { opacity: 1 }, { duration: 0.25, ease: "easeOut" });
        await Promise.all([animation3, animation4]);
        setExpandedStyle({width: '244px', x: '0', transition: 'all 0.5s cubic-bezier(0.5, 1.25, 0.3, 1)', fill: '#EFEFF2', opacity: 1});
        setGTransform('translateX(100px)');
        await animate("#text", { opacity: 1 }, { duration: 0.5});
    };


    const ExitAnimation = async () => {
        const animation5 = animate("#plus-sign", { opacity: 0}, { duration: 0.25});
        const animation6 = animate("#blue-inner-circle", { r: 0, cy: 40.5 }, {duration: 0.25, delay:0.1});
        const animation7 = animate("#text", { opacity:0 }, { duration: 0.2 });
        const animation8 = animate("#blue-circle", { r: 0, opacity: 0, cy: 40.5 }, {});
        await Promise.all([animation5, animation6, animation7, animation8]);
        setExpandedStyle({width: '45px', x: '99.5', transition: '0.5s', fill: '#EFEFF2',});
        const animation9 = animate("#gray-circle", { r: 0, opacity: 1 }, {delay: 0.5, duration: 0.25, ease: "easeOut"});
        setGTransform('translateX(0px)');
        const animation10 = animate("#expanded-gray-circle", { opacity: 0,}, {delay: 0.5});
        await Promise.all([animation9, animation10]);
    };


    return (
        <div ref={scope} className="h-screen bg-black flex flex-col justify-center items-center">
            <svg width="244" height="84" viewBox="0 0 244 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle id="blue-circle" cx="121.5" cy="40.5" r="0" fill="#0171E2"/>
                <circle id="gray-circle" cx="121.5" cy="40.5" r="0" fill="#EFEFF2"/>
                <rect id="expanded-gray-circle" x={expandedStyle.x} y="18" width={expandedStyle.width} height="45"
                      rx="22.5" style={expandedStyle}/>
                <text id="text" x={textPosition.x} y={textPosition.y} fill="black" textAnchor="middle"
                      alignmentBaseline="middle" fontWeight="600" opacity="0">
                    {textContent}
                </text>
                <g style={transform: gTransform, transition: 'transform 0.5s cubic-bezier(0.5, 1.25, 0.3, 1)'}> clip-path="url(#clip0_49_269)">
                    <circle id="blue-inner-circle" cx="121.528" cy="40.4722" r="0" fill="#0171E2" opacity="0"/>
                    <path id="plus-sign" d="M129.083 39.5278H123.511V33.9556C123.511 33.1056 122.85 32.4444 122 32.4444C121.15 32.4444 120.583 33.1056 120.583 33.8611V39.4333H115.011C114.161 39.4333 113.5 40.0944 113.5 40.9444C113.5 41.7944 114.161 42.3611 114.917 42.3611H120.489V47.9333C120.489 48.7833 121.15 49.35 121.906 49.35C122.756 49.35 123.322 48.6889 123.322 47.9333V42.3611H128.894C129.744 42.3611 130.311 41.7 130.311 40.9444C130.5 40.1889 129.839 39.5278 129.083 39.5278Z"
                          fill="white" opacity="0"/>
                </g>
            </svg>

            <button onClick={EntryAnimation} className="bg-white text-black mt-12 px-4 py-2 rounded-md">Entry</button>
            <button onClick={ExitAnimation} className="bg-white text-black mt-4 px-4 py-2 rounded-md">Exit</button>

        </div>
    );
};

export default AppleButton;
```

<div class="content-ad"></div>


![Animated Button](https://miro.medium.com/v2/resize:fit:1400/1*eNwg7lM93XU13vBp9aGt1w.gif)

# 결론

그럼 이제 해냈습니다! 이제 이 애니메이션 버튼을 웹사이트에 통합할 수 있습니다. 더 많은 효과를 주고 싶다면, 스크롤-보기 효과로 더욱 향상시킬 수 있습니다. 버튼이 보이게 될 때 Entry Animation을 시작하도록 스크롤 이벤트를 링크하고, 버튼이 뷰를 벗어날 때 Exit Animation을 시작하도록 설정하세요.

이 프로젝트의 완성된 코드를 다운로드하려면 꼭 제 GitHub를 방문해주세요.
