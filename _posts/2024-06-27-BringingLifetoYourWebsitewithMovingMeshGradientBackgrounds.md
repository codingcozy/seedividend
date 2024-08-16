---
title: "움직이는 메쉬 그라데이션 배경으로 웹사이트에 생명을 불어넣는 방법"
description: ""
coverImage: "/assets/img/2024-06-27-BringingLifetoYourWebsitewithMovingMeshGradientBackgrounds_0.png"
date: 2024-06-27 18:24
ogImage: 
  url: /assets/img/2024-06-27-BringingLifetoYourWebsitewithMovingMeshGradientBackgrounds_0.png
tag: Tech
originalTitle: "Bringing Life to Your Website with Moving Mesh Gradient Backgrounds"
link: "https://medium.com/design-bootcamp/bringing-life-to-your-website-with-moving-mesh-gradient-backgrounds-20b7e26844a2"
isUpdated: true
---




요즘에는 메쉬 그라데이션 디자인이 점점 더 인기를 끌고 있는 것 같아요.

이것이 저에게 궁금증을 일으켰는데, 만약 이 그라데이션을 애니메이션화해서 더 생동감 있게 만들 수 있을까요?

![이미지](/assets/img/2024-06-27-BringingLifetoYourWebsitewithMovingMeshGradientBackgrounds_0.png)

본문에서는 움직이는 메쉬 그라디언트 배경을 애니메이션화하여 웹사이트에 다이내미즘과 생동감을 더해주는 방법을 배워보겠어요.

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1400/1*PL_QXqTv_ibiPlDv9Ux1NQ.gif" />

# 준비물

시작하기 전에 다음 사항을 준비해주세요:

- React 프로젝트가 설정되어 있어야 합니다.
- Tailwind 종속성이 설치되어 있어야 합니다. npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-27-BringingLifetoYourWebsitewithMovingMeshGradientBackgrounds_1.png)

# Mesh Gradient 배경 구현하기

## 단계 1: Mesh Gradient Generator 찾기

먼저, 우리는 애니메이션할 수 있는 mesh gradient를 생성해야 합니다. 빠른 구글 검색으로 몇 가지 훌륭한 mesh gradient 생성기를 찾을 수 있습니다. 이 기사에서는 CSS 형식으로 mesh gradient를 출력할 수 있는 것이 필요합니다. https://csshero.org/mesher/ 이 사이트를 사용해보세요.


<div class="content-ad"></div>

<img src="/assets/img/2024-06-27-BringingLifetoYourWebsitewithMovingMeshGradientBackgrounds_2.png" />

## 단계 2: 메시 그라디언트 CSS를 배경으로 추가하기

생성기에서 CSS 코드를 복사하여 React 컴포넌트에 추가해보세요. 그러면 배경이 메시 그라디언트로 변경될 것입니다.

MeshGradientBackground.jsx

<div class="content-ad"></div>

```js
import React from 'react';

function MeshGradientBackground(props) {
    return (
        <div style={ {position: 'relative', height: '100vh'} }>
            {/* Background using ::before pseudo-element */}
            <div style={
                {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1, // Ensure background is behind content
                    backgroundColor: '#ff99df',
                    backgroundImage: `
                        radial-gradient(circle at 52% 73%, hsla(310, 85%, 67%, 1) 0px, transparent 50%),
                        radial-gradient(circle at 0% 30%, hsla(197, 90%, 76%, 1) 0px, transparent 50%),
                        radial-gradient(circle at 41% 26%, hsla(234, 79%, 69%, 1) 0px, transparent 50%),
                        radial-gradient(circle at 41% 51%, hsla(41, 70%, 63%, 1) 0px, transparent 50%),
                        radial-gradient(circle at 41% 88%, hsla(36, 83%, 61%, 1) 0px, transparent 50%),
                        radial-gradient(circle at 76% 73%, hsla(346, 69%, 70%, 1) 0px, transparent 50%),
                        radial-gradient(circle at 29% 37%, hsla(272, 96%, 64%, 1) 0px, transparent 50%)`,
                    backgroundSize: '100% 100%',
                    filter: 'blur(80px)',
                }
            }></div>
  
        </div>
    );
}

export default MeshGradientBackground;
```

![Moving Mesh Gradient Background](/assets/img/2024-06-27-BringingLifetoYourWebsitewithMovingMeshGradientBackgrounds_3.png)

## 단계 3: 메쉬 그라디언트 배경 애니메이션화

메쉬 그라디언트를 애니메이션화하는 것은 그라디언트 색상을 직접적으로 애니메이션화하는 것이 지원되지 않기 때문에 까다로울 수 있습니다. 이 문제를 해결하기 위해 배경 크기를 애니메이션화하여 움직임의 환상을 만들 수 있습니다.

<div class="content-ad"></div>

업데이트한 내용이 있는 MeshGradientBackground.jsx 파일을 수정해주세요.

```js
import React from 'react';
import '../../styles.css'; // 이 파일에 @keyframes 정의가 포함되어 있는지 확인해주세요

function MeshGradientBackground(props) {
    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            {/* ::before 가상 요소를 사용한 배경 */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, // 배경이 내용 뒤에 있도록 함
                backgroundColor: '#ff99df',
                backgroundImage: `
                    radial-gradient(circle at 52% 73%, hsla(310, 85%, 67%, 1) 0px, transparent 50%),
                    radial-gradient(circle at 0% 30%, hsla(197, 90%, 76%, 1) 0px, transparent 50%),
                    radial-gradient(circle at 41% 26%, hsla(234, 79%, 69%, 1) 0px, transparent 50%),
                    radial-gradient(circle at 41% 51%, hsla(41, 70%, 63%, 1) 0px, transparent 50%),
                    radial-gradient(circle at 41% 88%, hsla(36, 83%, 61%, 1) 0px, transparent 50%),
                    radial-gradient(circle at 76% 73%, hsla(346, 69%, 70%, 1) 0px, transparent 50%),
                    radial-gradient(circle at 29% 37%, hsla(272, 96%, 64%, 1) 0px, transparent 50%)`,
                backgroundSize: '150% 150%',
                filter: 'blur(80px)',
                animation: 'moveBackground 10s linear infinite',
            }}></div>
  
        </div>
    );
}

export default MeshGradientBackground;
```

styles.css 파일을 추가해주세요.

```css
@keyframes moveBackground {
    0% { background-size: 100% 100%; }
    10% { background-size: 120% 80%; }
    20% { background-size: 190% 140%; }
    30% { background-size: 130% 110%; }
    40% { background-size: 150% 120%; }
    50% { background-size: 180% 100%; }
    60% { background-size: 220% 80%; }
    70% { background-size: 100% 50%; }
    80% { background-size: 120% 70%; }
    90% { background-size: 110% 90%; }
    100% { background-size: 100% 100%; }
}
```

<div class="content-ad"></div>


![Background Animation](https://miro.medium.com/v2/resize:fit:1400/1*GURQVNHCw-MtVgHjeS4GcQ.gif)

The background should move like this.

Explanation:

The moveBackground animation is applied to this div, making the background size change over time, which gives the illusion of movement.


<div class="content-ad"></div>

요렇게 하면 됩니다 — 메쉬 그라데이션 배경을 애니메이션화하는 간단한 키프레임 애니메이션이 완성되었어요.

하지만 여기서 멈출 수 없었어요. 이 아름다운 배경의 매력을 전시하는 전체 랜딩 페이지로 만들고 싶었거든요. 그래서 Figma에서 디자인을 만들고 코드로 구현했어요.

![GIF](https://miro.medium.com/v2/resize:fit:1400/1*PL_QXqTv_ibiPlDv9Ux1NQ.gif)

전체 구성 요소를 다운로드하려면 제 GitHub를 확인해주세요!