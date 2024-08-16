---
title: "Nextjs 프로젝트에서 ApexCharts를 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowToUseApexChartsinaNextjsProject_0.png"
date: 2024-05-12 22:10
ogImage: 
  url: /assets/img/2024-05-12-HowToUseApexChartsinaNextjsProject_0.png
tag: Tech
originalTitle: "How To Use ApexCharts in a Next.js Project"
link: "https://medium.com/@farrel.abyansyah/how-to-use-apexcharts-in-a-next-js-project-96e413bc9b31"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-HowToUseApexChartsinaNextjsProject_0.png)

Next.js는 확실히 프런트엔드 랜드스케이프에서 주요 메타 프레임워크 중 하나입니다. 그러나 인기 있는 차트 라이브러리인 ApexCharts를 Next.js와 함께 사용할 때 특정 문제가 발생하는 것 같습니다. 이 글에서는 그 문제가 무엇인지와 해결 방법에 대해 논의하겠습니다.

# 새 프로젝트를 초기화하는 방법을 살펴봅시다

다음은 새 Next.js 프로젝트를 초기화하는 명령 프롬프트입니다(이미 초기화하는 방법을 잘 알고 계실 것 같지만, 문서를 열 필요 없이 편리하게 확인하실 수 있도록 제공드립니다)



```js
#npm
npx create-next-app@latest

#pnpm
pnpm create next-app
```

ApexCharts를 위한 필요한 의존성을 모두 설치하는 것을 잊지 마세요. 리액트 래퍼를 포함하면 됩니다.

```js
#npm
npm i react-apexcharts apexcharts

#pnpm
pnpm i react-apexcharts apexcharts
```

우리는 기존의 신뢰받는 페이지와 새롭고 반짝이는 앱 디렉토리를 함께 사용할 것입니다. 두 가지의 구현 차이는 크지 않으니 시작해 봅시다.



두 가지 디렉토리 유형 중에서, 저는 개인적으로 폴더 구조를 이렇게 선호합니다 (특히 components 폴더 위치). 여러분은 자신의 구조 선호도에 맞게 조정하시면 됩니다.

```js
nextjs_project
├── node_modules
├── public
└── src
    ├── components
    └── pages/app
```

# 그래프 컴포넌트 만들기

components 폴더 안에, charts.tsx/jsx 파일을 만들어 보겠습니다.



```js
// charts.tsx/jsx

'use client' // 앱 디렉토리를 사용한다면, 이 줄을 빼먹지 마세요

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export function ExampleChart(){

    const option = {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      }

    const series = [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }]

    return(
        <>
            <ApexChart type="line" options={option} series={series} height={200} width={500} />
        </>
    )
    
}
```

만약 react-apexcharts — npm (npmjs.com)에서 아래와 같이 가져오려고 한다면

```js
import Chart from 'react-apexcharts'
```

아마도 이런 에러를 마주하게 될 것입니다



마크다운 형식을 사용하면 더 좋을 것 같아요.

![HowToUseApexChartsinaNextjsProject_1](/assets/img/2024-05-12-HowToUseApexChartsinaNextjsProject_1.png)

혹은 터미널에서는 이렇게 보일지도 몰라요.

![HowToUseApexChartsinaNextjsProject_2](/assets/img/2024-05-12-HowToUseApexChartsinaNextjsProject_2.png)

이 에러는 Next.js의 자동 프리랜더링(렌더링: 자동 정적 최적화 | Next.js (nextjs.org)) 때문에 발생한 것 같아요. ApexChart 라이브러리는 클라이언트 쪽에 있는 window 인터페이스에 의존하기 때문에 본문 작성 시점에는 서버에서 프리랜더링할 수 없는 것으로 보입니다.



그래서 Next.js가 이 경우를 해결하기 위해 제공한 솔루션은 내장된 next/dynamic을 사용하여 동적 가져오기를 수행하고 서버 측 사전 렌더링을 중지하도록 명시적으로 구성하는 것입니다.

```js
'use client' // 전체 파일을 클라이언트 측 컴포넌트로 표시하려면 앱 디렉터리를 사용하는 경우 이 부분을 잊지 마세요

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
```

# 직접 해 보세요!

이것은 페이지 디렉터리를 위한 것입니다.



그리고 이것은 앱 디렉토리를 위한 것입니다.

지금까지 제가 전달할 내용은 여기까지입니다. 읽어 주셔서 감사합니다!