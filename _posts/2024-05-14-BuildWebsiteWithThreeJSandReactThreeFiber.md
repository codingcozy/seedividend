---
title: "Three JS와 React Three Fiber를 사용하여 웹사이트를 만들어보세요"
description: ""
coverImage: "/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_0.png"
date: 2024-05-14 11:45
ogImage: 
  url: /assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_0.png
tag: Tech
originalTitle: "Build Website With Three JS and React Three Fiber."
link: "https://medium.com/@wuzsamie/build-website-with-three-js-and-react-three-fiber-488c73e982dd"
isUpdated: true
---




Three JS와 React Three Fiber(R3F)를 사용하여 웹사이트를 만드는 단계별 튜토리얼.

참고: 저처럼 조금 게을러진 분들을 위해 😎, 최종 코드에 액세스하려면 이 링크를 따르는 게 좋아요. 코드는 아마 있을 거에요, 하지만 완벽하게 이해하지 못할 거에요 🤣. 믿어봐요 !!!. 복사/붙여넣기도 좋지만, 과정을 이해하는 게 더 낫죠 😉 그리고 빨간 선이 나오면 뭐라도 소리 내 면 안 된답니다 😂.

# 단계 1: Vite를 사용하여 새 React 프로젝트 설정하기.

터미널을 열고 다음 명령을 실행하여 Vite를 사용하여 새 React 프로젝트를 생성하세요:



```js
npm create vite@latest
```

<img src="/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_0.png" />

프로젝트 이름을 작성하고 ENTER를 누르세요.

<img src="/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_1.png" />




Vite는 선택할 수 있는 다양한 프레임워크를 제공합니다. 이 프로젝트에서는 React를 사용하고 있으니 React로 이동하려면 아래 방향키를 누르고 ENTER 키를 누르세요.

![React](/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_2.png)

React에서는 TypeScript 또는 JavaScript를 사용할 수 있습니다. 저희는 JavaScript를 사용할 예정이므로 아래 방향키를 사용하여 JavaScript를 선택하세요. ENTER 키를 누르세요.

![JavaScript](/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_3.png)



위의 이미지에서 보이는 폴더 구조를 얻을 수 있습니다. 아직 종속성이 설치되지 않았으므로 먼저 설치해야 합니다. VS 코드 터미널에서 다음 명령어를 입력해주세요:

```js
cd project-name 
```

여기서 cd는 디렉토리 변경을 의미합니다. 'project-name'을 여러분의 프로젝트 이름으로 바꾼 후 ENTER 키를 눌러주세요.

그런 다음 VS 터미널에서 다음 몤령어를 입력하세요.



```js
npm 설치
```

![Three JS and React Three Fiber](/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_4.png)

# 단계 2: 필수 종속성 설치하기.

이제 종속성을 설치했으니 프로젝트에 Three JS, React Three Fiber 및 React Three Drei를 추가해야 합니다.



터미널에 다음 명령어를 입력해주세요:

```js
npm i three @react-three/fiber @types/three @react-three/drei
```

참고: npm i는 npm install의 약식 표현입니다.

# 단계 3: 프로젝트 실행하기. 



이제 필요한 모든 종속 항목을 갖췄으니 브라우저에서 React 앱을 확인할 수 있습니다. 터미널에 다음 명령을 입력하세요:

```js
npm run dev
```

![이미지](/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_5.png)

링크 위로 마우스를 올리고 링크를 ctrl 키를 누른 채 클릭하면, 브라우저가 열립니다.



<img src="/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_6.png" />

"축하합니다" React 앱을 만들었어요 😁.

# 단계 4: 코드 정리.

웹사이트는 이미 좋아 보이지만 우리가 원하는 것은 아닙니다. 코드를 정리할 시간입니다.



App.js 파일에서 다음 코드를 모두 제거해주세요:

```html
<img src="/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_7.png" />
```

그리고 App.css와 index.css에서 모든 CSS 코드도 제거해주세요.

이제 브라우저를 확인하면 하얗게 보일 거예요. 이제 "멋진 웹사이트"를 만들기 시작할 수 있습니다.



# 단계 5: 장면 생성하기.

리액트 앱에서 Three JS 장면을 사용하려면 캔버스를 만들어야 합니다. 물론 `canvas` HTML 태그를 사용할 수 있지만, 대신 React Three Fiber (R3F) 패키지를 설치했습니다. 이 패키지는 Three.js를 React 애플리케이션에 원활하게 통합할 수 있는 방법을 제공합니다.

아래 코드를 App.js에 작성해주세요:

```js
import * as THREE from "three"
import './App.css'
import { Canvas } from "@react-three/fiber"

function App() {

  return (
    <>
      <Canvas></Canvas>
    </>
  )
}

export default App
```



여기에서는 "three"로부터 세 개의 JS와 "React Three Fiber"로부터 Canvas를 가져왔습니다. 이제 모든 것을 Canvas 안에서 처리할 거에요. Canvas는 Three JS를 사용하여 3D 캔버스를 생성하기 위해 React Three Fiber에서 제공하는 구성 요소입니다.

이제 Canvas에 속성을 추가해보세요 :

```js
function App() {

  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        
      </Canvas>
    </>
  )
}
```

여기서 :
gl=' antialias: false ' : 이 속성은 WebGL(웹 그래픽 라이브러리) 렌더러 설정을 Canvas 구성 요소에 전달하는 데 사용됩니다. 이 경우에는 antialias 속성을 false로 설정합니다. 안티앨리어싱은 컴퓨터 그래픽의 날카로운 가장자리를 부드럽게 만드는 기술입니다. 이를 false로 설정하면 성능이 향상됩니다.



<img src="/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_8.png" />

dpr='[]' : 이 속성은 캔버스의 장치 픽셀 비율(device pixel ratio, dpr)을 설정합니다. 장치 픽셀 비율은 장치 화면의 물리적 픽셀과 논리적 픽셀의 비율입니다. 이 경우 배열 [1, 1.5]로 설정되어 있습니다. 이는 캔버스가 윈도우가 고해상도(DPI, 인치 당 점)가 아닐 때 장치 픽셀 비율이 1이 되고, 고해상도일 때 1.5가 됨을 의미합니다. 이는 고해상도 디스플레이에서 선명한 그래픽을 렌더링하는 데 도움이 될 수 있습니다.

# 단계 6: 캔버스에 큐브 렌더링하기.

이제 브라우저에 무언가를 표시해 봅시다.



```js
  function App() {
  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <mesh>
          <boxGeometry />
        </mesh>
      </Canvas>
    </>
  );
}
```

위의 코드를 App.js에 추가하고 저장해주세요. 또한, 이 프로젝트에서는 mesh와 geometry를 사용하지 않기 때문에 Three JS 문서를 확인하여 더 자세한 내용을 알아보세요. 이제 브라우저를 확인해보면 다음과 같이 작은 사각형이 보입니다 :

<img src="/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_9.png" />

이것은 우리의 코드가 작동 중이라는 것을 의미합니다 😳. 이제 사각형을 더 크게 만들기 위해 다음 CSS 코드를 App.css에 추가해주세요 :



```js
* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
```

여기서는 Canvas에 100%의 높이와 너비를 제공하여 캔버스가 전체 화면을 차지할 수 있도록합니다. 또한 페이지의 모든 기본 여백과 간격을 제거합니다. 이제 브라우저에서 이렇게 나타날 것입니다.

<img src="/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_10.png" />

# 단계 7: 텍스트 추가하기.



이제 캔버스에 텍스트를 추가할 시간입니다. 이전에 사용한 코드 대신에 다음 코드를 App.js에 추가해보세요:

```js
import * as THREE from "three";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas gl={ antialias: false } dpr={[1, 1.5]}>
        <ScrollControls damping={2} pages={5}>
          <Scroll html>
            <h1 style={ position: "absolute", top: "60vh", left: "0.2em" }>
              Make
            </h1>
            <h1 style={ position: "absolute", top: "120vh", left: "60vw" }>
              Scroll
            </h1>
            <h1
              style={
                position: "absolute",
                top: "210.5vh",
                left: "0.5vw",
                fontSize: "20vw",
              }
            >
              Creative
            </h1>
            <h1
              style={
                position: "absolute",
                top: "330.5vh",
                left: "50rem",
                fontSize: "10vw",
              }
            >
              And Flawless
            </h1>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
```

우리는 React Three Drei에서 scrollControls를 사용하고 있습니다. scrollControls는 캔버스 앞에 HTML 스크롤 컨테이너를 만듭니다. `Scroll` 컴포넌트에 추가하는 모든 것에 영향을 줄 것입니다.

이제 props에 대해 이야기해볼까요:



damping='2' : 이 속성은 스크롤의 감쇠 계수를 제어합니다.

감쇠는 물리학과 애니메이션에서 자주 사용되는 수학적 개념으로, 움직임이나 진동이 서서히 감소되는 것을 시뮬레이션하는 데 사용됩니다.

pages='5' : 이 속성은 사용자가 탐색할 수 있는 "페이지" 또는 스크롤 섹션의 총 수를 설정합니다. 콘텐츠의 여러 섹션을 제어하기 위해 사용될 스크롤 값의 범위를 결정합니다.

또한 이 CSS를 App.css에 추가하세요:



```js
@import url('https://rsms.me/inter/inter.css'); /* 최상단에 이것을 추가하세요 */

body {
  overscroll-behavior: none;
  background: #efefef;
  font-family: 'Inter var', sans-serif;
  cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTAiIGZpbGw9ImJsYWNrIi8+PC9zdmc+'),
    auto; /* 커스텀 커서 불러오기 */
}

h1 {
  font-size: 10rem;
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 9rem;
  margin: 0;
  padding: 0;
}
```

이제 브라우저에서 확인하면 텍스트가 나타날 것이며 스크롤할 때 애니메이션이 적용됩니다. 스크롤 애니메이션을 느낄 수 있을 것입니다. 따라서 우리는 잘 진행 중이랍니다.

# 단계 8: 이미지 추가

이 프로젝트의 가장 어려운 부분입니다. 하지만 이해해 보도록 해봅시다. 여기서는 이미지를 추가하고 스크롤 시에 애니메이션을 적용해야 합니다. 이미지가 확대되고 스크롤 시 줌인되는 것을 확인했다면 이를 만들어야 합니다. 이를 작은 작업으로 나누어 보겠습니다.




- 이미지 추가
- 스크롤할 때 애니메이션 효과 적용
- 줌 애니메이션 추가

## 이미지 추가:

먼저 프로젝트에 추가할 이미지가 필요합니다. 리액트에서 이미지를 사용하는 여러 가지 방법이 있습니다. 저는 content.js에서 이미지를 내보내는 방법을 사용하고 있습니다. 이 방법을 사용하면 프로젝트 어디에서든 이미지를 가져올 수 있습니다.

content라는 폴더를 생성하고, 해당 폴더에 content.js라는 파일을 추가해주세요:




![Screenshot](/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_11.png)

이제 content.js 파일에 다음 코드를 추가해주세요:

```js
export const image1 = "https://images.pexels.com/photos/7631166/pexels-photo-7631166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image2 = "https://images.pexels.com/photos/15955004/pexels-photo-15955004/free-photo-of-a-man-walking-down-a-narrow-alleyway-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image3 = "https://images.pexels.com/photos/15876173/pexels-photo-15876173/free-photo-of-sunrise-from-currumbin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image4 = "https://images.pexels.com/photos/15861750/pexels-photo-15861750/free-photo-of-sky-sunset-airplane-flight-background-wallpaper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image5 = "https://images.pexels.com/photos/19864134/pexels-photo-19864134/free-photo-of-two-horses-standing-in-a-field-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image6 = "https://images.pexels.com/photos/16791339/pexels-photo-16791339/free-photo-of-man-standing-on-terrace-of-resort-apartment-with-swimming-pool.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image7 = "https://images.pexels.com/photos/19882770/pexels-photo-19882770/free-photo-of-surfur-with-a-surfboard-walking-on-the-beach.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image8 = "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image9 = "https://images.pexels.com/photos/925683/pexels-photo-925683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image10 = "https://images.pexels.com/photos/15627686/pexels-photo-15627686/free-photo-of-a-velha-cabra.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
export const image11 = "https://images.pexels.com/photos/10850828/pexels-photo-10850828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
```

저는 pixels.com에서 이미지를 사용하고 있어요.




- 먼저 이미지 주소를 복사하세요.
- 상수를 만드세요.
- 상수의 이름을 지으세요.
- 이미지 주소를 " " (문자열) 안에 넣으세요.
- 시작 부분에 export를 추가하세요.

이제 App.js 파일에서 가져와야 합니다.

```js
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
} from "./content/content";
```

지금까지의 코드는 :



```js
const { height, width } = useThree((state) => state.viewport);
const data = useScroll();
```

useThree는 React Three Fiber에서 제공하는 훅으로 Three.js 상태에 접근할 수 있게 해줍니다. 이 경우에는 뷰포트의 높이와 너비를 얻기 위해 사용되었습니다.



useScroll은 React Three Drei에서 가져올 수 있는 사용자 정의 후크(custom hook)로, 스크롤 관련 데이터를 제공합니다. 반환된 데이터 객체는 애니메이션 로직에 사용됩니다.

```js
const group = useRef();
```

useRef() 후크는 수정 가능한 객체(group)를 만들기 위해 사용되며, 이 객체는 Three.js 그룹 객체에 첨부될 것입니다. 이 ref는 애니메이션 루프에서 그룹의 자식들을 조작하는 데 사용될 것입니다.

```js
useFrame(() => {
  // 스크롤 데이터를 기반으로 한 애니메이션 로직
  // 그룹 내 각 자식의 재질(zoom 속성)을 조정
  // 애니메이션 로직은 스크롤 위치를 기반으로 하는 것으로 보입니다.
  // `data.range` 메서드는 지정된 범위 내에서 값을 계산하는 데 사용됩니다.
});
```



React Three Fiber의 useFrame 훅은 애니메이션 루프를 정의하는 데 사용됩니다. 이 루프 안에서 그룹 내 각 자식의 재질의 줌 속성이 스크롤 데이터(data)에 기반하여 조정됩니다.

```js
group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
```

group.current:

group은 useRef 훅을 사용하여 생성된 ref입니다. current는 ref의 현재 값에 액세스하는 데 사용되며 이 경우에는 Three.js 그룹을 가리켜야 합니다.



group.current.children[0]:

이 명령은 Three.js 그룹(group)의 첫 번째 자식에 액세스합니다. 이 그룹은 여러 자식을 가지고 있다고 가정합니다.

group.current.children[0].material:

이 명령은 첫 번째 자식의 재질(material)에 액세스합니다. Three.js에서 재질은 객체의 외관을 정의합니다.



group.current.children[0].material.zoom:

이는 첫 번째 자식의 재료의 줌 속성에 액세스하거나 설정하는 것입니다. 줌 속성은 Three.js 재료의 표준 속성이 아니므로 사용자 정의 속성이거나 사용자 정의 셰이더 데이터를 통해 추가된 속성인 것 같습니다.

data.range(0, 1 / 3) / 3

data는 scroll 관련 데이터를 제공하는 useScroll 훅에서 얻은 객체로 가정됩니다.

data.range(0, 1 / 3)는 현재 스크롤 위치를 기반으로 [0, 1/3] 범위 내에서 값을 계산합니다.



결과는 그 후에 3으로 나누어져서 값이 축소될 수 있습니다.

1 + data.range(0, 1 / 3) / 3:

최종 값은 스크롤 범위에서 얻은 값의 축척된 값에 1을 더하여 계산됩니다. 이는 줌 요소가 적어도 아래에 있는 것을 보장하기 위해 사용될 수 있습니다.

```js
return (
  <group ref={group}>
    {/* 서로 다른 위치, 스케일 및 URL을 가진 Image 구성 요소의 여러 인스턴스 */}
    <Image position={[-1, 0, 0]} scale={[4, height, 1]} url={image1} />
    {/* ... (다른 이미지에 대해서도 유사하게) */}
  </group>
);
```



이미지 컴포넌트는 이미지 컴포넌트의 여러 인스턴스를 포함하는 `group` 컴포넌트를 반환합니다.

각 이미지 컴포넌트는 특정 매개변수를 기반으로 위치 지정, 크기 조정 및 이미지 URL(url)가 할당됩니다.

이미지 컴포넌트는 사용자 상호작용 또는 애니메이션 처리와 관련된 추가 기능을 제공하기 위해 Three.js 객체를 감싸는 사용자 정의 컴포넌트입니다.

이제 브라우저에서 이미지를 확인하면 화면에 표시되고 스크롤할 때 애니메이션될 것입니다.



노트: 값을 조정해 보면 무슨 일이 일어나는지 확인해보세요.

![이미지](/assets/img/2024-05-14-BuildWebsiteWithThreeJSandReactThreeFiber_12.png)

모든 것이 완료되었지만 몇 가지 추가 스타일을 추가해 보겠습니다. 호버 시 이미지를 밝게 만들어 보겠습니다. 그러려면 이 코드 라인을 추가하세요:

```js
import { useRef, useState } from "react";
import { Scroll, ScrollControls, useScroll, Image as ImageImpl } from "@react-three/drei";
```



앱 함수에 다음 코드 라인을 추가하세요 :

```js
 function Image({ c = new THREE.Color(), ...props }) {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    useFrame(() => {
      ref.current.material.color.lerp(
        c.set(hovered ? "white" : "#ccc"),
        hovered ? 0.4 : 0.05
      );
    });
    return (
      <ImageImpl
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}
      />
    );
  }
```

이제 이 코드를 분석해봅시다 :

```js
function Image({ c = new THREE.Color(), ...props }) {
```



이것은 Image라는 기능적 React 컴포넌트를 선언합니다.

기본값이 있는 객체 비구조화 인자를 가져옵니다. 여기에는 새로운 THREE.Color() 인스턴스로 기본값으로 설정된 c 속성이 포함되어 있습니다.

...props 구문은 컴포넌트에 전달된 추가 props를 수집하는 데 사용됩니다.

```js
const ref = useRef();
const [hovered, hover] = useState(false);
```



`useRef()`은 `ImageImpl` 컴포넌트에 연결될 변경 가능한 객체(ref)를 생성하는 데 사용됩니다. 이를 통해 Three.js의 기본 객체에 액세스하고 상호 작용할 수 있습니다.

`useState(false)`는 상태 변수 `hovered`를 초기화하고 해당 값을 업데이트할 함수 `hover`를 생성하는 데 사용됩니다. 기본값은 false로 설정됩니다.

```js
useFrame(() => {
  ref.current.material.color.lerp(
    c.set(hovered ? "white" : "#ccc"),
    hovered ? 0.4 : 0.05
  );
});
```

`useFrame`은 Three.js 씬에서 애니메이션을 실행하기 위해 React Three Fiber 라이브러리에서 제공하는 사용자 정의 후크입니다. 각 프레임마다 실행될 콜백 함수를 인수로 전달합니다.



이 콜백에서 ref.current는 ref로 참조된 Three.js 객체에 액세스하는 데 사용됩니다. 그런 다음 Three.js 객체의 재질 색상을 업데이트합니다.

색상은 두 개의 색상 사이를 선형 보간하는 lerp 메서드를 사용하여 업데이트됩니다. 보간되는 색상은 hovered의 값에 따라 결정됩니다. hovered가 true이면 색상이 흰색으로 설정되고, 그렇지 않으면 회색(#ccc)의 음영이 설정됩니다.

보간 계수(0.4 또는 0.05)는 색상 전환 속도를 결정합니다. 더 높은 값은 객체 위에 마우스가 있을 때(즉, hovered가 true인 경우) 더 빠른 전환을 의미합니다.

```js
return (
  <ImageImpl
    ref={ref}
    onPointerOver={() => hover(true)}
    onPointerOut={() => hover(false)}
    {...props}
  />
);
```



여기에는 이미지 컴포넌트가 ref 객체를 전달하여 `ImageImpl` 컴포넌트를 반환합니다. 이를 통해 useFrame 훅이 기본 Three.js 객체와 상호 작용할 수 있게 됩니다.

`ImageImpl` 컴포넌트에는 이벤트 핸들러(onPointerOver 및 onPointerOut)가 제공되며, 이를 통해 마우스 상호작용에 따라 hover 상태가 트리거됩니다.

이미지 컴포넌트로 전달되는 추가적인 속성은 '…props'를 사용하여 전달됩니다.

이제 suspense와 preload를 추가해야 합니다:



```js
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Scroll,
  ScrollControls,
  useScroll,
  Image as ImageImpl,
  Preload,
} from "@react-three/drei";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
} from "./content/content";
import "./App.css";
function App() {
  function Image({ c = new THREE.Color(), ...props }) {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    useFrame(() => {
      ref.current.material.color.lerp(
        c.set(hovered ? "white" : "#ccc"),
        hovered ? 0.4 : 0.05
      );
    });
    return (
      <ImageImpl
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}
      />
    );
  }

  function Images() {
    const { height, width } = useThree((state) => state.viewport);
    const data = useScroll();
    const group = useRef();

    useFrame(() => {
      group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
      group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
      group.current.children[2].material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
      group.current.children[3].material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 2;
      group.current.children[4].material.zoom =
        1 + data.range(1.25 / 3, 1 / 3) / 1;
      group.current.children[5].material.zoom =
        1 + data.range(1.8 / 3, 1 / 3) / 3;
      group.current.children[6].material.zoom =
        1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
      group.current.children[7].material.zoom =
        1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
      group.current.children[8].material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
      group.current.children[9].material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
    });

    return (
      <group ref={group}>
        <Image position={[-1, 0, 0]} scale={[4, height, 1]} url={image1} />
        <Image position={[4, 0, 1]} scale={5} url={image2} />
        <Image position={[-3, -height, 2]} scale={[2, 3, 1]} url={image3} />
        <Image position={[-0.6, -height, 3]} scale={[1, 2, 1]} url={image4} />
        <Image position={[0.75, -height, 3.5]} scale={1.5} url={image5} />
        <Image
          position={[0, -height * 1.5, 2.5]}
          scale={[1.5, 3, 1]}
          url={image6}
        />
        <Image
          position={[0, -height * 2 - height / 4, 0]}
          scale={[width, height / 2, 1]}
          url={image7}
        />
        <Image
          position={[-5, -height * 2.7 - height / 3, 0]}
          scale={[5, height, 1]}
          url={image8}
        />
        <Image
          position={[-2, -height * 3 - height, 2]}
          scale={[3, 3, 1]}
          url={image9}
        />
        <Image
          position={[1.5, -height * 3 - height, 2]}
          scale={[3, 3, 1]}
          url={image10}
        />
      </group>
    );
  }
  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
          <ScrollControls damping={2} pages={5}>
            <Scroll>
              <Images />
            </Scroll>
            <Scroll html>
              <h1 style={{ position: "absolute", top: "60vh", left: "0.2em" }}>
                Make
              </h1>
              <h1 style={{ position: "absolute", top: "120vh", left: "60vw" }}>
                Scroll
              </h1>
              <h1
                style={{
                  position: "absolute",
                  top: "210.5vh",
                  left: "0.5vw",
                  fontSize: "20vw",
                }}
              >
                Creative
              </h1>
              <h1
                style={{
                  position: "absolute",
                  top: "330.5vh",
                  left: "50rem",
                  fontSize: "10vw",
                }}
              >
                And Flawless
              </h1>
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
```

위의 코드는 최종 코드입니다. 이제 suspense와 preload에 대해 배우겠습니다.

```jsx
<Suspense fallback={null}>
  {/* ... */}
</Suspense>
```

Suspense 컴포넌트는 내장 React 컴포넌트로, 컴포넌트가 렌더링되기 전에 무언가를 기다리도록 허용하는 것입니다. 보통 데이터 가져오기나 코드 분할과 같은 비동기 작업을 처리하는 데 사용됩니다.




fallback 속성은 비동기 작업이 진행 중일 때 렌더링할 내용을 지정합니다. 이 경우에는 null로 설정되어 있어서 아무것도 렌더링되지 않아야 함을 나타냅니다.

Suspense는 아마초 또는 컴포넌트의 비동기 로딩을 처리하기 위해 사용되며, 내부 컨텐츠(ScrollControls, Scroll, Images 및 텍스트 요소를 포함한)가 비동기 작업이 완료될 때까지 렌더링되지 않도록 보장합니다.

```js
<Preload />
```

Preload 컴포넌트는 아마도 react-three/drei 라이브러리의 일부일 것입니다. 이는 실제로 씬에서 사용되기 전에 텍스처 또는 모델과 같은 에셋을 미리로딩하는 데 사용됩니다.



프리로딩은 필요한 경우에 자산이 필요하기 전에 메모리로 로드되어 있는지 확인하여 도움이 됩니다. 이는 사용되는 자산이 처음 사용될 때 런타임 중에 로딩 지연을 피하고 더 부드러운 사용자 경험을 제공합니다.

리액트 쓰리 파이버로 웹사이트를 만들어 축하드립니다👏.

![이미지](https://miro.medium.com/v2/resize:fit:600/1*Qo5FVr1hxVphASfQwIyd0Q.gif)

이것은 무수히 많은 복잡하고 창의적인 아이디어를 위한 시작에 불과합니다. 계속해서 배우고 발전해나가세요.



이 글을 읽어주셔서 마지막으로 "감사합니다." 새로운 것을 배우셨기를 바라요. 만약 이 글을 좋아하셨다면 댓글을 남겨주시면 제가 더 이런 글을 작성할 수 있어요.