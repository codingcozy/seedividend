---
title: "리플렛js와 리액트로 시작하기 간단한 지도 렌더링하기"
description: ""
coverImage: "/assets/img/2024-05-12-GettingStartedwithLeafletjsandReactRenderingaSimpleMap_0.png"
date: 2024-05-12 19:34
ogImage: 
  url: /assets/img/2024-05-12-GettingStartedwithLeafletjsandReactRenderingaSimpleMap_0.png
tag: Tech
originalTitle: "Getting Started with Leaflet.js and React: Rendering a Simple Map"
link: "https://medium.com/@timndichu/getting-started-with-leaflet-js-and-react-rendering-a-simple-map-ef9ee0498202"
isUpdated: true
---




![Leaflet.js와 React를 사용하여 간단한 지도 렌더링 시작하기](/assets/img/2024-05-12-GettingStartedwithLeafletjsandReactRenderingaSimpleMap_0.png)

# 소개

이 시리즈에서는 강력한 오픈 소스 JavaScript 라이브러리인 Leaflet.js를 활용하여 React, HTML 및 CSS로 Google 지도 대안으로 상호 작용하는 지도를 생성하는 방법을 살펴볼 것입니다. 주니어 또는 중급 개발자라면 Leaflet.js 사용 방법을 이해함으로써 위치 데이터를 표시하고 사용자 정의 맵 기반 애플리케이션을 쉽게 구축할 수 있습니다. 이 첫 번째 글에서는 개발 환경을 설정하고 기본적인 지도를 렌더링하는 것부터 시작하겠습니다.

이후의 글에서는 대화식 맵핑의 세계로 더욱 깊이 파고들어, 마커 추가, 부드러운 확대 기능 활성화, 클릭 이벤트 처리, 외부 데이터 작업 및 다각형 및 팝업 사용자 정의 등의 주제를 다룰 것입니다.



이 튜토리얼과 더 나아가기 위해 다음 도구들을 활용할 것입니다:

- Leaflet
인터랙티브 지도를 생성하는 JavaScript 라이브러리
- React
사용자 인터페이스를 구축하는 JavaScript 라이브러리
- React-Leaflet
Leaflet 지도용 React 컴포넌트들

# Leaflet은 무엇인가요?

Leaflet.js는 오픈 소스이며 가벼운 JavaScript 라이브러리로, 웹을 위한 인터랙티브 지도를 손쉽게 만들 수 있습니다.



약 38,000개의 스타를 보유한 Leaflet.js는 휴대폰 친화적 대화형 지도를 위한 주요 오픈 소스 JavaScript 라이브러리 중 하나입니다.

만약 "Leaflet"이라는 이름의 유래에 대해 궁금하다면, 이것은 단편적이고, 표시하고, 지도를 손쉽게 탐색할 수 있도록 도와주는 편리한 도구로 생각해보세요 - 마치 바람에 흩날리는 나뭇잎처럼 손쉽게 움직일 수 있습니다.

Leaflet을 선택하는 이유는?

- 가볍고 빠름: 개발자들이 Leaflet을 좋아하는 주요 이유 중 하나는 가벼운 무게에 있습니다 - 약 42KB의 무게를 상하. 웹 페이지가 무거운 스크립트에 늘어지지 않도록 보장하여 부드럽고 신속한 사용자 경험을 제공합니다.
- 사용자 친화적이고 직관적: Leaflet의 API는 명쾌하고 직관적이어서 모든 수준의 개발자에게 완벽히 적합합니다. 경험이 풍부한 전문가든 막 시작한 초심자든 쉽게 이해하고 구현할 수 있을 것입니다.
- 사용자 정의 가능 및 다재다능: Leaflet은 가볍지만 강력한 기능을 제공합니다! 당신의 특정 요구에 맞게 지도를 맞춤화하기 위해 원활하게 통합할 수 있는 다양한 플러그인과 확장기능을 제공합니다. 마커 및 폴리곤 표시부터 상호작용 처리까지, 가능성은 거의 무한합니다.
- 크로스 플랫폼 호환성: Leaflet으로 생성한 지도는 다양한 플랫폼과 장치에서 어려움 없이 볼 수 있습니다. 사용자가 데스크톱, 스마트폰 또는 태블릿에서 애플리케이션을 접근하더라도, 지도는 아름답게 작동할 것입니다.
- 활발한 커뮤니티 및 지속적인 개발: 열정적이고 활발한 개발자 및 기여자들의 커뮤니티로 Leaflet은 계속 발전하고 개선되고 있습니다. 업데이트, 버그 수정 및 흥미로운 새로운 기능이 정기적으로 출시되어 당신이 최신의 지도 기술을 선도하도록 보장합니다.



리플렛은 웹 페이지에서 지도를 렌더링하기 위해 HTML, CSS, 및 JavaScript를 조합하여 사용합니다. 최신 브라우저의 강력한 기능을 활용하며 OpenStreetMap, Mapbox 및 기타 인기 있는 맵 제공업체를 활용하여 다양한 스타일과 데이터 오버레이를 가진 지도를 표시할 수 있습니다.

재미있는 사실: 리플렛의 "잎" 로고!

리플렛의 재미있는 잎 로고를 본 적이 있을 지도 모릅니다. 귀여운 외양 뿐만 아니라 라이브러리의 가벼운 특성을 상징합니다. 마치 단 한 잎이 바람에 가볍게 나부끼는 것처럼, 리플렛의 최소주의 디자인은 사용자에게 부드럽고 빠른 지도 상호작용을 제공합니다.



이제 Leaflet.js의 마법을 소개했으니, 소마건을 걸고 React와 함께 재미있는 상호작용 맵핑의 흥미진진한 세계에 뛰어들어 봅시다. 함께 멋진 지도 애플리케이션을 만들어 사용자에게 오랫동안 기억에 남는 경험을 선사하며 이 학습 여정을 즐겨봅시다!

멋진 모험을 지도에 표현할 준비가 되셨나요? 시작해 봅시다!

그런데..

React로 들어가기 전에, 일반적인 html, css 및 js를 통해 Leaflet의 기본을 이해해 봅시다. 이를 위해 Leaflet 지도를 설정하고, 마커 및 팝업을 사용하는 간단한 예제를 만들 것입니다.



# Leaflet 라이브러리로 단순한 HTML, CSS 및 JS 예제 만들기

이 섹션에서는 Leaflet.js 라이브러리를 포함한 간단한 HTML 페이지를 만들고, 기본 지도를 렌더링하고 마커 및 팝업을 추가하는 방법을 보여줄 것입니다.

단계 1: HTML 구조 설정

좋아하는 텍스트 편집기를 열고 새 HTML 파일(예: index.html)을 만들고 기본 구조를 설정하세요:



```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>간단한 Leaflet 지도</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
  <style>
    /* 지도 컨테이너 크기 설정 */
    #map {
      height: 400px;
      width: 100%;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

Step 2: JavaScript 파일 생성 (app.js)

다음으로, HTML 파일과 동일한 디렉토리에 'app.js'라는 새 JavaScript 파일을 만듭니다. 여기에 지도를 렌더링하고 마커 및 팝업을 추가하는 코드를 작성할 것입니다.

```js
// 문서가 준비되기를 기다립니다.
document.addEventListener('DOMContentLoaded', function () {
  // 맵 인스턴스를 생성하고 초기 뷰 좌표 및 확대 수준을 설정합니다.
  var map = L.map('map').setView([51.505, -0.09], 13);

  // OpenStreetMap으로부터 지도에 타일 레이어 추가
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // 팝업이 있는 마커를 생성하고 지도에 추가합니다.
  var marker = L.marker([51.505, -0.09]).addTo(map);
  marker.bindPopup("안녕하세요, 저는 마커입니다!").openPopup();
});
```

| Name      | Age | Location |
|-----------|-----|----------|
| John      | 25  | New York |
| Emily     | 28  | Paris    |
| Matthew   | 23  | London   |


지도 만들기 및 타일 레이어 추가하기

```js
// 지도 인스턴스 생성 및 초기 보기 좌표 및 확대 수준 설정
var map = L.map('map').setView([51.505, -0.09], 13);
```

여기서 `L.map()` 메서드를 사용하여 새 지도 인스턴스를 생성하고 우리의 지도가 렌더링될 `div` 요소의 ID를 전달했습니다.

`setView()` 메서드는 맵의 초기 보기를 지정한 위도(51.505) 및 경도(-0.09)와 확대 수준 13으로 설정합니다. 확대 수준이 높을수록 지도가 더 가깝게 표시됩니다.



```js
// 지도에 OpenStreetMap에서 타일 레이어 추가
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
타일 레이어의 attribution 옵션은 OpenStreetMap 기여자들에게 크레딧을 주기 위해 사용됩니다. 제3자 소스에서 지도 데이터를 사용할 때 적절한 소유권을 제공하는 것이 중요합니다.
```

위 코드에서 L.tileLayer() 메서드를 사용하여 타일 레이어를 생성했습니다.

타일 레이어는 지도의 시각적 표현을 구성하는 이미지 타일 세트입니다. 이 예에서는 https://'s'.tile.openstreetmap.org/'z'/'x'/'y'.png로 제공되는 OpenStreetMap 타일 레이어를 사용하고 있습니다. 's', 'z', 'x', 'y'는 서브도메인, 줌 레벨 및 타일 좌표를 나타내는 자리 표시자입니다. Leaflet은 자동으로 이러한 자리 표시자를 교체하여 지도를 이동하고 확대/축소할 때 올바른 타일을 로드합니다.

타일 레이어의 attribution 옵션은 OpenStreetMap 기여자들에게 크레딧을 주기 위해 사용됩니다. 제3자 소스에서 지도 데이터를 사용할 때 적절한 소유권을 제공하는 것이 중요합니다.



팝업이 달린 마커 추가하기

```js
// 팝업이 달린 마커를 생성하고 맵에 추가하기
var marker = L.marker([51.505, -0.09]).addTo(map);
marker.bindPopup("안녕하세요, 저는 마커입니다!").openPopup();
```

맵에 마커를 추가하려면 L.marker() 메소드를 사용하고 위도와 경도를 배열 [51.505, -0.09]로 전달합니다. 이로 인해 마커가 맵의 해당 위치에 배치됩니다.

그런 다음 bindPopup() 메소드를 사용하여 마커에 팝업을 추가합니다. 팝업 내용은 "안녕하세요, 저는 마커입니다!" 라는 문자열입니다. 그리고 openPopup() 메소드를 사용하여 팝업을 마커가 맵에 추가된 직후에 바로 표시합니다.



다른 타일 레이어 사용하기

Leaflet은 지도의 외관과 스타일을 변경할 수 있는 다양한 타일 레이어를 제공합니다. OpenStreetMap 이외에도 Mapbox, Stamen, Esri 등 다른 제공 업체를 사용할 수 있습니다.

Mapbox 타일 레이어를 사용하는 예시입니다:

```js
// Mapbox 타일 레이어 사용하기
L.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
  mapId: 'your-mapbox-map-id', // 여러분의 Mapbox 맵 ID로 대체해주세요
  accessToken: 'your-mapbox-access-token' // 여러분의 Mapbox 액세스 토큰으로 대체해주세요
}).addTo(map);
```



Mapbox 타일 레이어를 사용하려면 Mapbox 계정에 가입하고 액세스 토큰과 맵 ID를 획득해야 합니다. 'your-mapbox-map-id'와 'your-mapbox-access-token'을 실제 Mapbox 자격 증명으로 대체해주세요.

# React-Leaflet

이제 Leaflet과 순수 JavaScript를 사용하여 지도를 생성하고 마커를 추가하는 방법을 알게 되었습니다. React를 사용하여 동일한 결과를 어떻게 얻을 수 있는지 알아봅시다.

필수 전제 조건



리액트 구현에 들어가기 전에 컴퓨터에 다음이 설치되어 있는지 확인하세요:

- Node.js (최신 LTS 버전) 및 npm (Node Package Manager)
- 선호하는 코드 편집기 (예: Visual Studio Code, Sublime Text, 또는 Atom)

개발 환경 설정하기

먼저 터미널이나 명령 프롬프트를 열고 다음 단계를 따르세요:



- Create React App을 사용하여 새로운 React 프로젝트를 만들어보세요:


npx create-react-app leaflet-map-app

cd leaflet-map-app


2. 필요한 종속성을 설치하세요:



npm install leaflet

npm install react-leaflet

3. 이제 코드 편집기에서 프로젝트를 엽니다.

간단한 지도 컴포넌트 생성



프로젝트의 'src' 폴더에 'SimpleMap.js'라는 새 파일을 만들어 주세요. 이 파일은 맵을 렌더링하는 주요 리액트 컴포넌트가 될 거에요.

맵 설정하기

SimpleMap.js 안에서 필요한 모듈을 먼저 import 하는 것으로 시작해요:

```js
import React, { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
```



지도 렌더링하기

이제 SimpleMap 컴포넌트를 구현하고 지도를 렌더링합시다:

```js
const SimpleMap = () => {
  const mapRef = useRef(null);
  const latitude = 51.505;
  const longitude = -0.09;

  return ( 
    // 지도 컨테이너의 높이와 너비를 설정해야지만 지도가 표시됩니다.
      <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 추가 지도 레이어나 컴포넌트를 이곳에 추가할 수 있습니다 */}
      </MapContainer>
  );
};

export default SimpleMap;
```

중요 사항!




MapContainer center='[위도, 경도]' zoom='13' ref='mapRef' style='높이: "100vh", 너비: "100vw"'

MapContainer의 높이와 너비를 설정하지 않으면 지도가 렌더링되지 않습니다.

mapRef 사용 이유:

useRef로 mapRef를 사용하면 React-Leaflet이 관리하는 Leaflet 지도 인스턴스에 직접 액세스할 수 있습니다. 이는 표준 속성이나 이벤트 처리의 범위를 벗어나야 하는 작업을 수행해야 할 때 특히 유용합니다. 예를 들어 지도와 상호 작용하거나 지도의 중심을 동적으로 업데이트하거나 Leaflet의 기본 API에 직접 액세스해야 할 수 있습니다.




mapRef을 사용하면 맵 인스턴스를 더 많은 제어력과 유연성을 가질 수 있어요. 이는 응용 프로그램에서 더 고급 맵 기능이나 상호 작용을 구현할 때 유용해요.

다음 기사에서 더 자세히 살펴보겠습니다.

MapContainer 구성 요소

MapContainer는 첫 번째 예제와 같이 맵을 위한 `div` 요소 컨테이너를 렌더링합니다.



MapContainer이 DOM에 렌더링되는 방법:

JSX 코드에 MapContainer 컴포넌트를 포함하면, 다른 React 컴포넌트와 마찬가지로 DOM에 렌더링됩니다. 그러나 MapContainer와 일반 HTML 요소 사이에 중요한 차이가 있습니다:

React-Leaflet은 내부적으로 Leaflet의 코어 라이브러리를 사용하여 DOM을 직접 조작하여 지도를 렌더링합니다. MapContainer 컴포넌트가 DOM에 렌더링되면, 지정된 높이와 너비로 `div` 요소가 생성되는데, 이는 지도의 컨테이너 역할을 합니다.

초기 렌더링 후에 React가 가상 DOM의 변경 사항을 조정할 때, Leaflet의 코어 라이브러리가 제어를 가져와 맵의 모양과 업데이트를 효율적으로 관리하면서 React 컴포넌트를 전체 재렌더링시키지 않습니다. 이 접근 방식은 상호작용 형식의 맵을 다룰 때 빈번한 업데이트가 필요한 경우에 최적의 성능을 보장합니다.



모든 것을 함께 적용하기

App.js 파일에서 SimpleMap 컴포넌트를 import하여 주요 응용 프로그램에서 사용합니다:

```js
import React from 'react';
import SimpleMap from './SimpleMap';

function App() {
  return (
    <div>
      <h1>내 Leaflet.js 및 React 지도</h1>
      <SimpleMap />
    </div>
  );
}
export default App;
```

프로젝트 디렉토리에서 npm install을 실행하여 필요한 패키지를 설치해야 합니다. 모든 것이 설정되면 npm start로 개발 서버를 실행하고 브라우저에서 http://localhost:3000을 방문하여 지도를 확인할 수 있습니다.



아래는 Markdown 형식으로 테이블을 변경한 결과입니다.


<img src="/assets/img/2024-05-12-GettingStartedwithLeafletjsandReactRenderingaSimpleMap_2.png" />

# React-Leaflet의 한계

React-Leaflet은 상호작용적 지도를 만드는 데 훌륭한 도구이지만 몇 가지 재미있는 한계가 있습니다.




Leaflet은 로드될 때 DOM에 직접 호출을 하기 때문에 React Leaflet은 서버 측 렌더링과 호환되지 않습니다.

노출된 구성 요소는 Leaflet 레이어의 추상화이며 DOM 요소가 아닙니다. 일부 구성 요소는 Leaflet에서 노출된 세터를 호출하여 직접 업데이트할 수 있는 프로퍼티를 가지고 있으며, 다른 구성 요소는 key 프로퍼티에 고유한 값이 설정되어 React의 알고리즘이 정확히 처리할 수 있도록 완전히 대체되어야 합니다.

이러한 도전을 극복하기 위해 개발자들은 다양한 접근 방식을 사용해 왔습니다. 예를 들어:

- 조건부 렌더링: 일반적인 접근 방식 중 하나는 Leaflet 구성 요소를 클라이언트 측에서만 조건부로 렌더링하는 것입니다. 동적 임포트 또는 useEffect 훅과 같은 기술을 사용하여 초기 렌더링 후 클라이언트에서만 실행되도록 보장합니다.
- Leaflet-Headless: 일부 개발자들은 Leaflet의 headless 버전인 "leaflet-headless"와 같이 Leaflet의 headless 버전을 만들어 왔습니다. 이를 통해 DOM 없이 서버에서 Leaflet 지도를 렌더링할 수 있습니다. 그러나 이러한 해결책은 제한 사항을 가질 수 있으며 Leaflet의 모든 기능을 제공하지 않을 수도 있습니다.



Next.js에서 조건부 렌더링의 예 및 간단한 해결책입니다:

```js
import dynamic from 'next/dynamic'

function HomePage() {
  const Map = dynamic(
    () => import('@components/map'), // 컴포넌트 위치인 '@components/map'을 교체해주세요
    { 
      loading: () => <p>지도를 불러오는 중입니다</p>,
      ssr: false // 이 줄이 중요합니다. 서버 측 렌더링을 막습니다
    }
  )
  return <Map />
}

export default HomePage
```

# 공식 문서 자세히 살펴보기

더 많은 고급 사용 사례를 탐색하거나 React-Leaflet 컴포넌트의 속성과 기능에 대해 더 깊이 파고들고 싶다면, 공식 문서를 참조해보세요! 이 문서에는 Leaflet을 React 애플리케이션 내에서 최대한 활용할 수 있도록 가능한 모든 컴포넌트, 옵션, 특징에 대한 포괄적인 정보가 제공되어 있습니다.



문서 링크: React-Leaflet 공식 문서

# GitHub에서 코드 살펴보기

코드를 탐험하고 지도 뒤에 숨겨진 마법을 확인하고 싶다면, 이 기사 시리즈의 전체 소스 코드가 GitHub에서 사용 가능합니다! 🚀🔍

GitHub에서 코드를 확인해보세요



자유롭게 살펴보고 실험하며 예제를 활용해보세요. 코딩 즐기세요! 🌟🖥️

# 결론

이 시리즈의 첫 번째 기사를 완료한 것을 축하합니다! 저는 개발자 기사를 쓰고 지식을 공유하는 이 여정에 기쁨을 느낍니다. Leaflet.js와 React를 함께 사용하면 쉽게 대화형 지도를 생성할 수 있어 구글 맵에 대한 무료이면서 강력한 대안을 제공합니다.

다음 기사에서는 지도에 마커 추가 및 부드러운 확대 기능을 가능하게 함으로써 대화형 매핑의 세계로 더 깊이 들어갈 것입니다. 함께 하면 주니어 및 중급 개발자가 지도 시각화 기술을 마스터하기 위해 가치 있는 풍부한 애플리케이션을 만들 수 있을 것입니다.



우리가 다룰 다가오는 주제들에 대해 정말 기대돼요. 여러분들도 마찬가지겠죠? 이 시리즈를 통해, 개발자들이 새로운 기술을 탐험하고 창의력을 발휘하여 멋진 애플리케이션을 만들도록 돕고 영감을 주는 것이 제 목표입니다.

이 여정에 함께해 주셔서 감사드리고, 다음 시리즈를 여러분과 함께 나누는 것을 기대할 뿐입니다. 즐겁게 코딩하시고, 다음에 뵙겠습니다!