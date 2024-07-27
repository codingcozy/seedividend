---
title: "React 및 Framer Motion을 사용하여 무한 아이콘 슬라이더 구현하기"
description: ""
coverImage: "/assets/img/2024-05-12-ImplementinganInfiniteIconSliderinReactwithFramerMotion_0.png"
date: 2024-05-12 19:21
ogImage: 
  url: /assets/img/2024-05-12-ImplementinganInfiniteIconSliderinReactwithFramerMotion_0.png
tag: Tech
originalTitle: "Implementing an Infinite Icon Slider in React with Framer Motion"
link: "https://medium.com/@caden0002/implementing-an-infinite-slider-in-react-with-tailwind-css-and-framer-motion-69173adb31a3"
---


무한 슬라이더는 웹 개발에서 인기 있는 UI 패턴으로, 이미지나 기타 미디어와 같은 콘텐츠를 연속적인 루프로 표시하는 데 사용됩니다. 무한 슬라이더의 핵심 원칙은 콘텐츠 항목의 집합을 중단 또는 간격 없이 매끄럽게 순환하면서 부드럽고 중단되지 않는 뷰잉 경험을 만드는 것입니다.

잘 디자인된 슬라이더는 멋진 모던한 미적 감각을 유지하면서 상당한 양의 정보를 단일 구성 요소로 압축할 수 있습니다. 이는 사용자 참여를 향상시키고 웹 페이지에서 공간을 최적화하는 데 탁월한 도구로, 특히 시각적 영향이 필수적인 포트폴리오, 전자 상거래 사이트 및 뉴스 플랫폼에서 매우 유용합니다.

![image](https://miro.medium.com/v2/resize:fit:1200/1*fEvCBFUBUUM-HggRUqK1tQ.gif)

![image](https://miro.medium.com/v2/resize:fit:1400/1*Nz6dhLM2nwazz_7vTR_2rg.gif)



<img src="https://miro.medium.com/v2/resize:fit:1200/1*XQuY6aY78mpNcJ7C8mtZ4Q.gif" />

이 글은 무한 슬라이더를 만드는 기초와 기본 사항을 안내합니다. 30분 이상 YouTube 비디오를 시청하는 것보다 더 효율적인 학습 방법을 제공합니다. 이 튜토리얼을 마치면 이 기능을 구현하는 방법 뿐만 아니라 코드를 선호에 따라 사용자 정의하고 향상시킬 수 있는 방법을 이해할 수 있습니다.

# 전제 조건

시작하기 전에 다음 사항을 준비해야 합니다:



- 리액트 프로젝트 설정이 완료되었습니다.
- Tailwind 의존성이 설치되었습니다. npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
- Framer Motion 이 설치되었습니다. npm install framer-motion
- Radix 아이콘 패키지가 설치되었습니다. npm install @radix-ui/react-icons

![Icon Slider](/assets/img/2024-05-12-ImplementinganInfiniteIconSliderinReactwithFramerMotion_0.png)

# 무한 슬라이더 구현하기

# 단계 1: 기본 슬라이더 만들기



SliderNumber.jsx

```js
import React from 'react';
import { motion } from 'framer-motion';

// 숫자로 된 슬라이드 배열 정의
const slides = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
];

const SliderNumber = () => {
    // 신속한 루핑을 보장하기 위해 슬라이드 배열을 복제합니다.
    const duplicatedSlides = [...slides, ...slides];

    return (
        <div className="relative w-full overflow-hidden">
            {/* 신속한 루핑을 위한 래핑 div */}
            <motion.div
                className="flex"
                animate={{
                    x: ['-100%', '0%'],
                    transition: {
                        ease: 'linear',
                        duration: 5,
                        repeat: Infinity,
                    },
                }}
            >
                {/* 복제된 슬라이드 렌더링 */}
                {duplicatedSlides.map((slide, index) => (
                    <div key={index} className="flex-shrink-0" style={{ width: `${100 / slides.length}%` }}>
                        <div className="flex flex-col items-center justify-center h-full text-6xl">
                            {slide.number}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default SliderNumber;
```

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*gFdYciuJgTYyJj2evLgauw.gif)

Framer Motion의 강력한 애니메이션 기능과 몇 줄의 코드만으로 무한 슬라이더의 기반을 마련했습니다.



해설:

- 슬라이드 배열: 표시할 슬라이드를 나타내는 간단한 배열입니다. 각 슬라이드는 숫자를 포함하는 객체입니다.
- 중복된 슬라이드: 무한 루프 효과를 얻기 위해 슬라이드 배열이 복제됩니다. 이 복제는 한 세트의 슬라이드가 보이는 영역을 벗어나면 동일한 세트가 나타나도록하여 끝없는 싸이클을 만드는 환상을 창출합니다.
- Motion Div: Framer Motion에서 제공하는 애니메이션을 담당하는 래퍼 div입니다. animate 속성은 콘텐츠를 100% (오른쪽에서 약간 벗어난 위치에서 시작)에서 0% (뷰포트를 채우는 위치)로 수평으로 이동하도록 구성되어 있습니다. 전환은 선형 팽창으로 설정되며, 반복 횟수는 무한대(Infinity)이며, 지속 시간은 5초입니다.
- 슬라이드 렌더링: 각 슬라이드(원본 및 복제본 모두)는 자체 div 내에 렌더링되며, 전체 슬라이드 수에 대한 비율에 따라 너비가 제어됩니다. 이를 통해 슬라이더 내에서 각 슬라이드가 수평 공간의 동일한 부분을 차지하도록 합니다.

이 기본 설정은 추가 스타일, 상호작용 요소 또는 다양한 콘텐츠 유형과 함께 확장하고 사용자 참여를 향상시킬 수 있는 다양한 애플리케이션에 적합한 다목적 구성 요소로 사용할 수 있습니다. 이미지, 텍스트 또는 동적 콘텐츠를 표시하든, 이 무한 슬라이더는 사이트에서 사용자 참여를 높이는 현대적이고 세련된 솔루션으로 제공됩니다.

더 멋진 것을 만들어 봅시다!



<img src="https://miro.medium.com/v2/resize:fit:1200/1*fEvCBFUBUUM-HggRUqK1tQ.gif" />

# 단계 2: 고급 아이콘 슬라이더 생성하기

슬라이더에 깊이와 주목을 끌기 위한 효과적인 방법 중 하나는 아이콘이 뷰포트에 들어오거나 빠져나갈 때 페이드 인 및 페이드 아웃 효과를 적용하는 것입니다. 이는 슬라이더 구성 요소의 가장자리에 흐릿한 효과를 적용하여 달성할 수 있습니다.

SliderDesign2.jsx



```js
import React from 'react';
import { motion } from 'framer-motion';
import {
    FigmaLogoIcon,
    FramerLogoIcon,
    SketchLogoIcon,
    TwitterLogoIcon,
    GitHubLogoIcon,
    VercelLogoIcon,
    NotionLogoIcon,
    DiscordLogoIcon,
    InstagramLogoIcon,
    LinkedInLogoIcon,
} from "@radix-ui/react-icons";

const slides = [
    { icon: <FigmaLogoIcon /> },
    { icon: <TwitterLogoIcon /> },
    { icon: <GitHubLogoIcon /> },
    { icon: <InstagramLogoIcon /> },
    { icon: <LinkedInLogoIcon /> },
    { icon: <DiscordLogoIcon /> },
    { icon: <SketchLogoIcon /> },
    { icon: <NotionLogoIcon /> },
    { icon: <VercelLogoIcon /> },
];



const SliderDesign2 = () => {
    const duplicatedSlides = [...slides, ...slides];

    return (
        <div className="relative h-full overflow-hidden py-12 bg-white mx-auto" style={ width: "50%" }>

            <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:filter after:blur-3"></div>

            <motion.div
                className="flex"
                animate={
                    x: ['0%', '-100%'],
                    transition: {
                        ease: 'linear',
                        duration: 15,
                        repeat: Infinity,
                    }
                }
            >
                {duplicatedSlides.map((slide, index) => (
                    <div key={index} className="flex-shrink-0" style={ width: `${100 / slides.length}%` }>
                        <div className="flex items-center justify-center h-full">
                            {slide.icon}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default SliderDesign2;
```

이 고급 슬라이더 설정은 웹페이지에서 로고나 아이콘을 더 상호작용적이고 시각적으로 매력적으로 표현하는 방법을 제공하여, 포트폴리오, 회사 페이지 또는 브랜드 가시성이 중요한 모든 응용 프로그램에 이상적입니다.

이제 무한 슬라이더가 작동하는 방법을 이해했으니, 여러분들만의 디자인을 시작해보세요!

전체 디자인을 다운로드할 수 있는 GitHub을 확인해보세요!
