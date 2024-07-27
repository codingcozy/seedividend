---
title: "다음은 Nextjs 및 GSAP를 사용하여 간단한 패럴랙스 효과를 만드는 방법입니다"
description: ""
coverImage: "/assets/img/2024-05-16-CreateSimplifiedParallaxEffectsUsingNextjsGSAP_0.png"
date: 2024-05-16 16:28
ogImage: 
  url: /assets/img/2024-05-16-CreateSimplifiedParallaxEffectsUsingNextjsGSAP_0.png
tag: Tech
originalTitle: "Create Simplified Parallax Effects Using Next.js + GSAP"
link: "https://medium.com/@mitra.abhirupa/create-simplified-parallax-effects-using-next-js-gsap-in-10-mins-82d4d60cd15f"
---


<img src="/assets/img/2024-05-16-CreateSimplifiedParallaxEffectsUsingNextjsGSAP_0.png" />

나는 전에 패럴랙스에 초점을 맞춘 디자인에 대해 걱정했었어. 시각적으로 매력적이라고 생각했지만, 모든 요소들을 함께 동작시키는 것이 어려울 것이라고 생각했어. 그러나 지난 주말, Next.js와 GSAP를 사용하여 다시 한 번 시도하기로 결정했어.

모든 것이 얼마나 쉽게 맞물려 있는지에 놀랐어. 모바일 화면을 위해 디자인을 적응시키는 것은 여전히 어려웠지만, 다른 구름 세트를 만들어야 했지만, 그 외에는 모든 것이 그대로 유지되었어.

# GSAP이란 무엇인가요?

<div class="content-ad"></div>

GSAP(Greensock Animation Platform)은 개발자들이 구성 객체, 트윈 및 타임라인을 제공하여 고성능 애니메이션 웹사이트를 만들 수 있도록 돕는 JavaScript 라이브러리입니다.

트윈: 트윈은 원하는 개체, 지속 시간 및 애니메이션을 적용하려는 속성(예: 축)을 가져가는 애니메이션 속성 세터입니다.

타임라인: 타임라인은 여러 트윈을 순차적으로 배치하고 애니메이션을 배치하고 아름다운 애니메이션 순서를 만들 수 있도록 도와주는 시퀀싱 도구입니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*xmynutJ-2WQjKwB00KD34Q.gif)

<div class="content-ad"></div>

# 5분 이내에 패럴랙스 파워 페이지를 만드는 방법

## 단계 1 :

NextJs, TailWind CSS 및 GSAP가 주로 필요한 모든 종속성을 설치합니다.

먼저 시스템에 Node.js 18.17 이상이 설치되어 있는지 확인하세요.

<div class="content-ad"></div>

- 새로운 Next.js 앱을 생성하려면 터미널을 열고 다음 명령을 실행하세요: npx create-next-app@latest
- 프로젝트를 구성하기 위해 프롬프트에 따라 따라가세요 (예: 프로젝트 이름, TypeScript, ESLint, Tailwind CSS 등). Next.js는 이제 TypeScript, ESLint 및 Tailwind CSS를 기본으로 제공합니다.

GSAP를 설치하려면 npm install gsap 또는 yarn add gsap을 실행하세요

## 단계 2:

Figma에서 디자인을 만드세요. 매혹적인 Parallax를 만들려면 여러 구성 요소가 동시에 작동해야 하며, 진행하기 전에 디자인을 확인하는 것이 좋습니다. Figma의 Pen 도구를 사용하면 기본 디자인을 쉽게 만들 수 있습니다 (위에서 만든 것과 같이). 또는 제가 만든 이미지를 재사용할 수도 있습니다 (링크는 끝에 공유됩니다).

<div class="content-ad"></div>

Figma Pen Tool 비디오: `add_link_here`

이미지를 NextJs 컴포넌트로 가져와서 position: absolute로 층을 만들어보세요.

```js
const parallaxCloudBackgroundStyles = 'z-10 absolute bottom-[0vw] w-[100vw]';
const parallaxCloudForegroundStyles = 'z-30 absolute bottom-[0vw] w-[100vw]';    
const parallaxCloudTopLayerStyles = 'z-30 absolute bottom-[-5vw] w-[100vw]';
const parallaxStarStyles = 'absolute top-0 w-[100vw]';
const parallaxSunStyles = 'z-0 absolute top-[30%] left-[35%] right-[35%] w-[30%]';
const parallaxFlightStyles = 'z-20 rotate-45 absolute bottom-[-15%] left-[5%] w-[30vw]';

<img ref={sun} src="./img/Sun.png" className={parallaxSunStyles}/>
<img ref={cloudlayer1} src="./img/Wave L1.png" className={parallaxCloudBackgroundStyles}/>            
<img ref={flight} src="./img/Designer.png" className={parallaxFlightStyles}/>
<img ref={cloudlayer2} src="./img/Wave L2.png" className={parallaxCloudForegroundStyles}/>
<img ref={cloudlayer3} src="./img/Wave L3.png" className={parallaxCloudForegroundStyles}/>
<img ref={cloudlayer4} src="./img/Wave L4.png" className={parallaxCloudTopLayerStyles}/>
<img ref={starrySky} src="./img/Starry Sky.png" className={parallaxStarStyles}/>
```

## z-index란 무엇인가요?

<div class="content-ad"></div>

웹 디자인에서는 z-index라는 유사한 것이 있습니다. 이는 이미지, 버튼 또는 텍스트와 같은 요소가 웹페이지에 나타나는 순서를 제어하는 데 도움을 줍니다.

Tailwind CSS는 요소에 적용할 수 있는 일련의 미리 정의된 z-index 클래스를 제공합니다. 이러한 클래스는 z-0(뒷배경의 z-index를 0으로 설정)부터 z-50(뒷배경의 z-index를 50으로 설정)까지 다양합니다. 위 코드에서는 z-index를 사용하여 컴포넌트를 층으로 구분했습니다. 가장 아래층은 z-0이어야 하며 위로 올라갈수록 증가해야 합니다.

## 단계 3: 각 요소에 대한 Refs 만들기

각 요소에 대한 Ref를 생성하고 해당 Ref를 요소에 부착해야 합니다. 이렇게 하면 각 층의 애니메이션을 제어할 수 있습니다.

<div class="content-ad"></div>

```js
const parallaxRef = useRef(null);
const cloudlayer1 = useRef(null);
const cloudlayer2 = useRef(null);
const cloudlayer3 = useRef(null);
const cloudlayer4 = useRef(null);   
const flight = useRef(null); 
const sun = useRef(null);
const starrySky = useRef(null);   
```

## 단계 4: 타임라인에 모든 애니메이션 시퀀스 추가하기

GSAP의 힘을 발휘할 시간입니다.

- GSAP 콘텍스트 설정:
gsap.context(() =` ' ... ')를 사용하여 GSAP 콘텍스트를 만들기 시작합니다. 콘텍스트를 사용하면 특정 범위 내에서 애니메이션 및 플러그인을 정의할 수 있습니다.
- ScrollTrigger 플러그인 등록: gsap.registerPlugin(ScrollTrigger)를 사용하여 ScrollTrigger 플러그인을 등록합니다. ScrollTrigger 플러그인은 스크롤 위치를 기반으로 애니메이션을 만드는 데 필수적입니다.
- 타임라인 생성: 이후, gsap.timeline(' ... ')를 사용하여 타임라인을 만듭니다.
타임라인은 여러 애니메이션을 순차적으로 배치하고 제어하는 컨테이너입니다. defaults 객체는이 타임라인 내 모든 애니메이션에 대한 기본 속성을 지정합니다(이 경우 1초의 지속 시간).
- ScrollTrigger 구성: 타임라인에 대한 ScrollTrigger를 설정합니다:

<div class="content-ad"></div>

- 트리거(trigger): 애니메이션을 트리거하는 요소(이 경우 parallaxRef.current).
- 시작(start): 애니메이션이 시작되는 트리거 요소의 위치("top top"은 트리거 요소의 맨 위가 뷰포트의 맨 위에 닿을 때를 의미합니다).
- 끝(end): 애니메이션이 끝나는 트리거 요소의 위치("5000 bottom"은 트리거 요소의 맨 아래가 뷰포트의 맨 위에서 5000픽셀 떨어진 지점에 닿을 때를 의미합니다).
- scrub: 스크롤할 때 애니메이션 진행을 부드럽게 합니다.
- pin: 애니메이션 중에 트리거 요소를 고정시킵니다.
- onUpdate: 스크롤 위치가 업데이트될 때마다 실행되는 콜백 함수입니다. 여기서는 스크롤 진행에 따라 배경을 조정합니다.

```js
useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            var timeline = gsap.timeline({
                defaults: { duration: 1},
                scrollTrigger: {
                    trigger: parallaxRef.current,
                    start: "top top",
                    end: "5000 bottom",
                    scrub: true,
                    pin: true,
                    onUpdate: (self) => {
                        setBackground(Math.ceil(self.progress * 100 + 30))
                        console.log(Math.ceil(self.progress * 100))
                    },
                },
            });
      });
});
```

## STEP 5 : 애니메이션 적용
요소 애니메이션:

- 타임라인 내부에서 애니메이션 정의:
timeline.to (flight.current, ' y: "-=1500", x: "+=1500" ', 0): 이 코드는 flight 요소를 위(y: "-=1500")로 이동하고 대각선(x: "+=1500")으로 애니메이션합니다.
- 제로 옵셋으로 시작합니다(마지막 인수가 0인 이유는 애니메이션이 즉시 시작됨을 의미합니다).

<div class="content-ad"></div>

다른 요소들도 비슷하게 애니메이션을 줄 수 있어요. 여기 한 가지 팁은 양의 값과 음의 값의 최종 오프셋 값을 섞어서 더 좋은 효과를 얻을 수 있다는 거예요.

```js
timeline.to(
    flight.current,
    {
        y: "-=1500",
        x: "+=1500"
    },
    0
);
timeline.to(
    sun.current,
    {
        y: "-=400"
    },
    0
);
timeline.to(
    starrySky.current,
    {
        y: "-=150"
    },
    0
);
```

## 단계 5: 웹사이트를 실행하세요

npm run dev — 코드를 실시간으로 확인해보세요

<div class="content-ad"></div>

여기서 작동 코드를 찾을 수 있어요: [Github.com/abhirupa-tech](Github.com/abhirupa-tech)
1대1 통화하고 싶나요? 저와 연락하려면 [여기를 클릭](https://example.com)

좋은 코딩되세요!