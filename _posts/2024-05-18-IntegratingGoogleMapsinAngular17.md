---
title: "Angular 17에서 Google 지도 통합하기"
description: ""
coverImage: "/assets/img/2024-05-18-IntegratingGoogleMapsinAngular17_0.png"
date: 2024-05-18 22:02
ogImage: 
  url: /assets/img/2024-05-18-IntegratingGoogleMapsinAngular17_0.png
tag: Tech
originalTitle: "Integrating Google Maps in Angular 17"
link: "https://medium.com/@selsa-pingardi/integrating-google-maps-in-angular-17-66487ed2238c"
---


만약 당신이 Angular에서 Google 지도 컴포넌트를 사용해 왔다면, 2024년 2월 21일부로 Marker가 사용 중단되었다는 경고를 받은 적이 있을 것입니다. 새롭고 더 사용자 정의할 수 있는 Advanced Marker를 사용하도록 권장되었습니다.

안타깝게도, Angular에서의 Advanced Marker 사용 방법에 대한 가이드나 정보가 많이 없으며, 대부분의 문서들은 여전히 구식 Marker를 사용하고 있습니다.

그러나 이 기사에서는 기존 Angular 프로젝트를 업데이트해야 하는 경우든, 처음부터 해당 컴포넌트를 시도해보는 경우든 새로운 Advanced Marker를 어떻게 사용할 수 있는지 공유하겠습니다.

그러면 시작해봅시다!

<div class="content-ad"></div>

# 준비물

Angular 프로젝트를 생성하기 전에 Google Maps JavaScript API를 사용하기 위한 유효한 API 키가 있는지 확인해주세요. 추가 지침은 아래 링크를 참조해주세요:
https://developers.google.com/maps/documentation/javascript/get-api-key

또한, 이 컴포넌트에 필요한 맵 ID도 필요합니다. 다음 링크를 따라서 얻을 수 있습니다:
https://developers.google.com/maps/documentation/get-map-id

만일 맵 ID를 가지고 있지 않거나 얻을 수 없다면, 구글에서 제공한 개발용 맵 ID를 사용할 수 있습니다:

<div class="content-ad"></div>

- Map ID = DEMO_MAP_ID

# 설정 단계

새 프로젝트를 시작하고 이미 Angular v17이 설정되어 있다고 가정하면 새 앱을 만듭니다:

```js
ng new angular-google-maps
cd angular-google-maps
```

<div class="content-ad"></div>

Google Maps 모듈을 설치하려면 다음 명령어를 실행하세요:

```js
npm i @angular/google-maps
```

Angular v17에서는 새 응용 프로그램이 기본적으로 독립적인 프로젝트로 생성됩니다. 컴포넌트가 독립적인지 여부는 src/app/app.component.ts 파일의 standalone 속성을 확인하여 알 수 있습니다. 컴포넌트가 독립적인 경우 해당 속성은 true로 표시됩니다.

독립적인 컴포넌트의 경우 모듈을 src/app/app.component.ts 파일에 다음과 같이 가져옵니다:

<div class="content-ad"></div>

```js
...
import { GoogleMapsModule } from "@angular/google-maps";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
...
```

만약 해당 컴포넌트가 독립적이지 않다면 모듈을 src/app/app.module.ts 파일로 가져오세요:

```js
...
import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
  declarations: [...],
  imports: [..., GoogleMapsModule],
  ...
})
export class AppModule {}
```

다음 스크립트를 애플리케이션의 src/index.html 파일에 추가하고 YOUR_API_KEY를 해당하는 API 키로 교체하세요:

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<head>
  ...
</head>
<body>
  ...
  <script>
    (g => {
        var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}),
            r = new Set,
            e = new URLSearchParams,
            u = () => h || (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => h = n(Error(p + " could not load."));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a)
          }));
        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
      })({
        v: "weekly",
        key: "YOUR_API_KEY"
      });
  </script>
</body>
</html>
```

스크립트는 닫히는 body 태그 이전에 위치하고 head 태그 사이에 있지 않아야 합니다.

# 지도 추가하기

이제 맵의 높이와 너비를 추가하고, 옵션을 설정하여 구글 지도 컴포넌트를 애플리케이션에 추가할 수 있습니다:

<div class="content-ad"></div>

- 지도가 렌더링된 맵의 ID를 나타냅니다
- center는 맵의 중심 (위도 및 경도)
- zoom은 맵의 줌 레벨

```js
<!-- app.component.html -->
<h1>Angular 17에서 Google 지도</h1>
<google-map height="600px" width="800px" [options]="options"> </google-map>
```

```js
// app.component.ts
...
export class AppComponent {
  ...
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };
}
```

이제 다음 명령을 사용하여 응용 프로그램을 실행하실 수 있습니다:

<div class="content-ad"></div>

```js
ng serve
```

해당 이미지와 비슷한 지도를 얻어야 합니다:

<img src="/assets/img/2024-05-18-IntegratingGoogleMapsinAngular17_0.png" />

# 고급 마커 추가하기

<div class="content-ad"></div>

먼저, 마커의 위치(위도 및 경도)를 정의해야 합니다. 다음 변수를 app.component.ts 파일에 선언해주세요:

```js
export class AppComponent {
  ...
  nzLocations: any[] = [
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -43.999792, lng: 170.463352 },
  ];
  auLocations: any[] = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
  ];
}
```

다음으로, app.component.html 파일에서 for-loop를 사용하여 지도에 Advanced Markers를 추가할 것입니다.

```html
<google-map height="600px" width="800px" [options]="options">
  @for (location of nzLocations; track location) {
  <map-advanced-marker
    #markerElem="mapAdvancedMarker"
    [position]="{ lat: location.lat, lng: location.lng }"
  />
  } @for (location of auLocations; track location) {
  <map-advanced-marker
    #markerElem="mapAdvancedMarker"
    [position]="{ lat: location.lat, lng: location.lng }"
  />
  }
</google-map>
```

<div class="content-ad"></div>

지금은 파일을 저장할 수 있고, 지도에 여러 호주 및 뉴질랜드 위치 표시기가 삽입된 것을 확인할 수 있습니다.

![Google Map with location markers](/assets/img/2024-05-18-IntegratingGoogleMapsinAngular17_1.png)

# 고급 마커 사용자 정의

이제 우리가 지도를 성공적으로 초기화하고 표시기를 추가했으므로, 사용자 정의 이미지로 그들을 계속하여 사용자 정의할 수 있습니다.

<div class="content-ad"></div>

## 인라인 SVG 사용하기

기본 마커를 변경하려면 먼저 DOMParser를 추가하여 SVG 문자열을 DOM 요소로 변환해야 합니다. app.component.ts 파일에서 파서와 사용하려는 SVG 문자열을 초기화합니다:

```js
...
ngOnInit() {
  const parser = new DOMParser();
  // 이것은 집 아이콘의 SVG 문자열입니다. 사용하고 싶은 SVG 아이콘을 자유롭게 사용해주십시오.
  const svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5733" stroke="#FFFFFF" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                    </svg>`;
}
```

다음으로, 우리의 뉴질랜드 마커를 루프하여 원하는 이미지로 설정합니다. forEach 루프를 사용하여 각 위치의 내용 속성을 파서를 사용하여 문서 요소로 설정합니다. 위 코드에 이어 ngOnInit() 함수 내에서 이 작업을 수행하세요.

<div class="content-ad"></div>

```js
this.nzLocations.forEach((location) => {
  location.content = parser.parseFromString(svgString, "image/svg+xml").documentElement;
});
```

모든 위치의 내용이 설정된 후에는 New Zealand 위치의 `map-advanced-marker` 태그의 내용 속성을 app.component.html 파일에서도 추가하고 수정해야 합니다.

```html
...
@for (location of nzLocations; track location) {
<map-advanced-marker
  #markerElem="mapAdvancedMarker"
  [position]="{ lat: location.lat, lng: location.lng }"
  [content]="location.content"
/>
}
...
```

다음 이미지는 마커의 기본 핀 모양을 변경한 후 현재 지도가어떻게 보여야하는지 보여줍니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-18-IntegratingGoogleMapsinAngular17_2.png" />

## PNG 이미지 사용하기

PNG 이미지를 사용하려면 이미지를 참조하고 해당 요소를 위치 내용 태그에 설정해야 합니다.

app.component.ts 파일에서 먼저 PNG 이미지에 대한 링크를 정의합니다:

<div class="content-ad"></div>

```js
ngOnInit() {
  ...
  // 예시로 구글의 비치 플래그 이미지를 사용할 것이지만, 마음에 드시는 이미지를 자유롭게 사용해도 괜찮습니다
  const beachFlag = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
}
```

그런 다음, 우리는 ngOnInit() 함수 안에서 위 코드 이후에 오스트레일리아 마커들에 대해 forEach 루프를 사용하여 인라인 SVG 섹션에서 했던 것과 유사하게 각 위치의 내용으로 전달될 img 요소를 생성할 것입니다.

```js
this.auLocations.forEach((location) => {
  let imgTag = document.createElement("img");
  imgTag.src = beachFlag;
  location.content = imgTag;
});
```

한번 더, app.component.html 파일에서 오스트레일리아 위치들의 `map-advanced-marker` 태그의 내용 속성을 추가 및 수정해야 합니다.

<div class="content-ad"></div>


```js
@for (location of auLocations; track location) {
<map-advanced-marker
  #markerElem="mapAdvancedMarker"
  [position]="{ lat: location.lat, lng: location.lng }"
  [content]="location.content"
/>
}
```


The final result should look like the following image:

![Integrating Google Maps in Angular](/assets/img/2024-05-18-IntegratingGoogleMapsinAngular17_3.png)

## Adding a Title


<div class="content-ad"></div>

마커 위로 마우스를 올리면 제목 텍스트가 나타나며, 이는 `map-advanced-marker` 태그의 title 속성을 수정하여 설정합니다. 아래 코드에서는 각 위치의 인덱스 번호를 기반으로 제목을 추가했지만, 원하는 대로 변경할 수 있습니다.


따라서 마커 위로 커서를 올리면 해당 위치 번호가 나타나는 작은 텍스트가 표시됩니다.

<img src="/assets/img/2024-05-18-IntegratingGoogleMapsinAngular17_4.png" />

<div class="content-ad"></div>

## 정보 창 추가하기

정보 창은 마커에 대한 자세한 정보를 제공할 수 있으며, 일반적으로 마커를 클릭할 때 표시됩니다. 우리는 고급 마커를 사용하고 있기 때문에 Advanced Marker에서 제공되는 새로운 기능인 openAdvancedMarkerElement()를 활용할 수 있습니다.

먼저, imports를 업데이트하고 app.component.ts 파일에서 infoWindow의 ViewChild를 정의해야 합니다.

```js
import { Component, ViewChild } from "@angular/core";
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from "@angular/google-maps";
...
export class AppComponent {
...
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
...
}
```

<div class="content-ad"></div>

그럼, 마커를 클릭했을 때 실행될 AppComponent 클래스의 함수를 작성할 수 있어요:

```js
...
export class AppComponent {
...
  onMarkerClick(marker: MapAdvancedMarker) {
    this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, marker.advancedMarker.title);
  }
...
}
```

`openAdvancedMarkerElement()` 함수의 첫 번째 매개변수는 정보 창이 열릴 마커 요소의 위치를 나타내고, 두 번째 매개변수는 정보 창에 표시될 내용으로 사용될 null이 가능한 문자열 또는 Element를 받아요.

이제 할 일은 만들어둔 onMarkerClick 함수와 `map-info-window` 태그를 app.component.html 파일에 추가하는 거에요.

<div class="content-ad"></div>

파일을 저장하고 이제 마커를 클릭하면 마커 제목이 나타나는 정보 창이 표시됩니다.

<img src="/assets/img/2024-05-18-IntegratingGoogleMapsinAngular17_5.png" />

# 결론


<div class="content-ad"></div>

지금까지 따라오신 여러분, 축하드립니다! 구글 지도를 구현하여 클릭 시 정보 창이 열리는 사용자 정의 고급 마커가 포함된 지도를 성공적으로 만들었습니다.

위 코드에 문제가 있거나 전체 코드를 보고 싶은 경우, 이 GitHub 저장소로 방문하여 프로젝트를 확인할 수 있습니다. 꼭 API 키를 교체해 주세요!

이번 글은 여기까지입니다! 아래 댓글에 의견을 자유롭게 나눠주세요. 도움이 되었고 쉽게 따라올 수 있었기를 바라며, 저의 첫 Medium 글에 클랩 몇 개 부탁 드리겠습니다. 감사합니다! 😄