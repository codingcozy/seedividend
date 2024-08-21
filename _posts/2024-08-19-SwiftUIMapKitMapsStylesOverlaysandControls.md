---
title: "SwiftUI와 MapKit을 활용한 지도, 스타일, 오버레이, 그리고 컨트롤"
description: ""
coverImage: "/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_0.png"
date: 2024-08-19 03:25
ogImage:
  url: /assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_0.png
tag: Tech
originalTitle: "SwiftUIMapKit Maps, Styles, Overlays and Controls"
link: "https://medium.com/gitconnected/swiftui-mapkit-maps-styles-overlays-and-controls-09610da2195c"
isUpdated: true
updatedAt: 1724032974335
---

![Map](/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_0.png)

지도는 일반 어플리케이션부터 위치 공유, 주차장 찾기, 포켓몬 GO 등 다양한 앱의 기반입니다. 뭐든 불러보세요!

읽기 시작하기 전에 SwiftUI를 실제로 사용할 것인지 고려해야 합니다! UIKit에서 사용할 수 있는 API 중 일부만 SwiftUI에서 사용할 수 있습니다. 원하는 것을 달성하기 위해 MKMapView를 감싸는 UIViewRepresentable을 만들어야 할 수도 있습니다.

그게 괜찮다면 시작해봅시다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

---

이 기사에서는 지도를 만드는 데 초점을 맞출 것입니다. 다음을 포함합니다.

- 경계 설정
- 초기 위치 및 확대 설정
- 일부 초기 내용 추가
- 상호 작용 유형 제한
- 사용자가 랜드마크를 선택할 수 있도록 함

그런 다음 적용할 수 있는 다양한 지도 스타일을 살펴보고 다른 구성 간의 차이를 확인해보겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Hybrid
- Imaginary
- Standard

저희는 지도를 더 풍부하게 만들기 위해 모든 주석, 오버레이 및 컨트롤을 사용하는 방법을 살펴볼 예정입니다!

---

MapKit을 사용하는 방법에 대해 더 많이 다루고 있으며, 이를 CoreLocation과 결합하여 사용자의 위치를 얻고 추적하는 방법, 사용자 상호작용에 반응하여 맵 위치를 가져오고 설정하는 방법 등에 대해 더욱 상세히 다룰 예정입니다! 관심이 있으시다면 추가 업데이트를 기다려주시기 바랍니다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 지도

우리는 한 줄로 지도를 만들 수 있어요! 네, WWDC23에서 엄청난 업데이트 덕분이죠!

```js
import SwiftUI
import MapKit

struct MapBaseView: View {
    var body: some View {
        Map()
    }
}
```

<img src="/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_1.png" />

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

전체 국가를 보여 주기 위한 지도 확대? 아마 99.999%(?)의 경우에는 원하는 바가 아닐 겁니다!

설정해 봅시다!

## 초기 위치와 초기 확대

가장 먼저, 지도의 초기 위치와 확대를 설정해 봅시다! 초기Position: MapCameraPosition을 지도를 만들 때 전달하여 이를 달성할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

MapCameraPosition을 만드는 여러 가지 방법이 있습니다.

예를 들어, MapCamera에서 가상 뷰포인트를 정의하는 구조체로부터 MapCameraPosition을 생성할 수 있습니다. 이를 위한 정적 함수 camera(MapCamera) - MapCameraPosition을 사용할 수 있습니다. 다른 방법으로 MapCameraPosition을 생성하는 경우에도 이 방법이 필요하기 때문에 이 방법을 자세히 살펴보겠습니다. 예를 들어, static func userLocation(followsHeading: Bool, fallback: MapCameraPosition) - MapCameraPosition과 같은 다른 방법을 사용하여 MapCameraPosition을 생성할 때 이 방법이 필요합니다.

MapCamera를 사용하여 다음을 지정할 수 있습니다.

- centerCoordinate: 지도상의 카메라 위치
- heading: 카메라의 보는 방향을 나타내는 나침반 헤딩
- pitch: 지도 수직에 대한 카메라의 피치
- distance: 미터 단위의 대상 지점으로부터의 카메라 거리. 이 값을 설정함으로써 맵이 초기에 얼마나 확대되길 원하는지를 제어할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 카메라에서 생성된 MapCameraPosition의 예시입니다. Aspen, 콜로라도에 중심을 둔 카메라가 1000 미터 떨어진 위치에 있습니다.

```js
let initialPosition = MapCameraPosition.camera(
    MapCamera(
        centerCoordinate: CLLocationCoordinate2D(latitude: 39.1911, longitude: -106.817535),
        distance: 1000,
        heading: 0,
        pitch: 0
    )
)
```

이를 사용하여 지도를 생성합니다.

```js
Map(initialPosition: initialPosition)
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![SwiftUIMapKitMapsStylesOverlaysandControls_2](/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_2.png)

또 다른 MapCameraPosition 생성 방법으로 유용한 것을 찾을 수도 있습니다. 이미 약간 언급했지만, static func userLocation(followsHeading: Bool, fallback: MapCameraPosition) -` MapCameraPosition입니다. 이 메서드는 현재 사용자 위치를 중심으로 설정된 특정 대체 위치와 선택적으로 사용자의 헤딩을 따를 수 있는 카메라 위치를 생성합니다.

```js
let userLocation = MapCameraPosition.userLocation(fallback: MapCameraPosition.camera(
    MapCamera(
        centerCoordinate: CLLocationCoordinate2D(latitude: 39.1911, longitude: -106.817535),
        distance: 1000,
        heading: 0,
        pitch: 0)))
```

참고로, 이를 사용하려면 info.plist에 Privacy — Location When In Use Usage Description를 추가하고 사용자의 허가를 받으려면 CLLocationManager().requestWhenInUseAuthorization을 호출해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

안녕하세요!

참고: Usage 키 NSLocationAlwaysAndWhenInUseUsageDescription과 항상 인가를 요청한 경우 앱에서 사용자의 위치를 표시할 수 없습니다.

## 바운드 설정

지도의 중심이 유지되어야 하는 영역의 선택적 경계를 정의하려면 bounds: MapCameraBounds 매개변수를 사용할 수 있습니다.

예를 들어, 디즈니랜드 지도를 만드는 경우 사용자가 경계를 벗어나거나 확대하지 않도록 하려면 이 기능이 정말 유용합니다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

MapCameraBounds를 만드는 방법은 init(centerCoordinateBounds: MKCoordinateRegion, minimumDistance: Double?, maximumDistance: Double?)을 사용할 수 있습니다.

- centerCoordinateBounds: 지도의 중심이 유지되어야 하는 영역의 경계입니다.
- minimumDistance: 중심점을 기준으로 지도에서 축소할 수 있는 최소 거리(미터 단위).
- maximumDistance: 중심점을 기준으로 지도에서 확대할 수 있는 최대 거리(미터 단위).

원하는 대로 가장 잘 맞는 이니셜라이저를 선택할 수도 있습니다!

한 번 더 말씀드리면, Aspen 예시를 사용해보겠습니다. 먼저, 지정된 좌표와 거리 값에서 새로운 MKCoordinateRegion을 생성합니다. 그런 다음, 축소 및 확대 양을 제한하기 위해 minimumDistance와 maximumDistance를 설정합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// 아스펜, 콜로라도
let bounds = MapCameraBounds(
    centerCoordinateBounds: MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 39.1911, longitude: -106.817535),
        latitudinalMeters: 1000,
        longitudinalMeters: 1000),
    minimumDistance: 1000,
    maximumDistance: 10000
)

var body: some View {
    Map(bounds: bounds)
}
```

<img src="/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_3.png" />

## 초기 콘텐츠 추가

트레일링 클로저를 전달하여 일부 기존 마커 및 주석이 있는 지도를 생성할 수도 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

예를 들어, 법정 패스에서 마커와 주석을 추가하는 방법을 보여드리겠습니다.

```js
var body: some View {
    Map(initialPosition: initialPosition) {

        Annotation("법정 패스", coordinate: CLLocationCoordinate2D(latitude: 39.191, longitude: -106.817535)) {
            Circle()
                .fill(Color.green.opacity(0.3))
                .frame(width: 100, height: 100)
        }

        Marker("법정 패스", coordinate: CLLocationCoordinate2D(latitude: 39.191, longitude: -106.817535))
            .tint(.red)

    }
}
```

<img src="/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_4.png" />

마커 및 주석에 대해 자세히 다루는 내용은 나중에 다른 기사에서 소개하겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 사용자 상호작용 제한

매개변수 interactionModes를 사용하여 사용자들이 지도와 상호작용할 수 있는 방법을 제한하는 사용자 정의 MapInteractionModes 집합을 선택적으로 정의할 수 있습니다.

예를 들어, 회전 및 피칭만 허용하려면 interactionModes 매개변수를 [.rotate, .pitch]로 설정할 수 있습니다.

```js
Map(initialPosition: initialPosition, interactionModes: [.rotate, .pitch])
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![image](https://miro.medium.com/v2/resize:fit:500/1*OCoFeifYRwBiUnF3_jDzRw.gif)

You can find the entire list of MapInteractionModes you get to control [here](link).

Also, if you don’t want your user to interact with the map AT ALL, simply set the collection to be an empty array!

## Enable Selection

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

사용자가 터치 가능한 MapFeature에서 선택할 수 있도록 하려면 selection: Binding`MapFeature?` 바인딩을 전달할 수 있습니다.

```js
@State private var selection: MapFeature? = nil

var body: some View {
    Map(initialPosition: initialPosition, selection: $selection)
    .onChange(of: selection) {
        print(selection?.coordinate)
    }
}
```

![image](https://miro.medium.com/v2/resize:fit:500/1*Tdn8UVvKMYIm_mIYA-m_Hw.gif)

주의할 점은 marker(핀)이 선택 가능하지 않다는 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

추가된 사용자 정의 마커 및 주석을 선택할 수 있도록 Binding`SelectedValue?`를 사용하여 태그를 추가할 수 있습니다.

다음은 간단한 예시입니다.

```js
@State private var selectedTag: Int?
var body: some View {
    Map(initialPosition: initialPosition, selection: $selectedTag) {

        Marker("Orange", coordinate: CLLocationCoordinate2D(latitude: 39.19, longitude: -106.817535))
            .tint(.orange)
            .tag(1)

        Marker("Red", coordinate: CLLocationCoordinate2D(latitude: 39.191, longitude: -106.817535))
            .tint(.red)
            .tag(2)

    }
    .mapStyle(.standard(pointsOfInterest: []))
}
```

(여기서 mapStyle은 무시하고, 곧 자세히 다룰 예정입니다. 다른 MapFeatures의 마커/주석을 숨기게 설정되어 있어 우리 마커를 쉽게 인식할 수 있습니다.)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![image](https://miro.medium.com/v2/resize:fit:500/1*fsua5TWMI2__bbFwBA-wVQ.gif)

안녕하세요! 위의 gif에서 알아보기 힘들도록 다른 기능을 숨겼습니다. 그러나 제가 사용자 정의 태그와 함께 Binding`SelectedValue?`를 사용하면 내장 MapFeatures를 선택할 수 없게 됩니다!

만약 MapFeatures와 우리의 콘텐츠에 대한 선택을 모두 지원하려면 어떻게 해야 할까요?

이를 위해 WWDC24에서 소개된 베타 기능을 사용해야 합니다. 자세한 내용은 다른 제 블로그 SwiftUI+MapKit: Support User Selection for Both Pre-defined Map Features and Our Own Contents를 확인해보세요!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# MapStyle

진짜 긴 한 줄이지만, 이제 우리는 MapKit의 다음 주요 부분인 MapStyle로 넘어가 준비가 된 것 같아요!

세 가지 다른 스타일이 있고 각 스타일마다 추가적인 사용자 정의를 위해 정의할 수 있는 매개변수 세트가 제공됩니다.

## 이미지 설정

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이미지는 지도 스타일로, 표시되는 지도 영역의 위성 이미지를 나타냅니다. 고도 매개변수를 설정하여 지도가 고도를 렌더링하는 방식을 제어할 수 있습니다.

- automatic: 평면 2D 지도를 렌더링하는 기본 고도 스타일입니다.
- flat: 평면 2D 지도를 렌더링하는 값입니다.
- realistic: 현실적인 3D 지도를 렌더링하는 값입니다.

```js
Map(initialPosition: initialPosition)
        .mapStyle(.imagery(elevation: .realistic))
```

![이미지](/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_5.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Hybrid

하이브리드 스타일은 이미지 스타일의 확장으로 생각합니다. 지역의 위성 이미지뿐만 아니라 도로 경로와 이름이 겹쳐져 있는 스타일입니다.

고도뿐만 아니라 다음을 설정할 수도 있습니다.

- pointsOfInterest: map이 표시하는 PointOfInterestCategories의 컬렉션입니다.
- showsTraffic: map이 교통 상황을 표시하는지 여부를 나타내는 부울 값입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

예를 들어, 공원과 주차장만 표시하려면 다음과 같이 설정하실 수 있습니다.

```js
Map(initialPosition: initialPosition)
    .mapStyle(.hybrid(elevation: .realistic, pointsOfInterest: [.park, .parking], showsTraffic: true))
```

<img src="/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_6.png" />

## 표준

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이름대로라면, 이것은 기본 지도 표현을 나타내는 맵 스타일입니다. 이는 도로의 위치와 일부 도로 이름을 보여주는 거리 지도입니다. 맵의 확대 수준에 따라 다릅니다.

표준 스타일을 구성할 때, 하이브리드 스타일과 마찬가지로 구성할 수 있습니다.

- 고도: 프레임워크가 지도 고도를 렌더링하는지를 결정하는 MapStyle.Elevation 값 중 하나입니다.
- 관심지점: 맵이 표시하는 관심지점 카테고리의 컬렉션입니다.
- 교통 표시: 맵이 교통 상황을 표시하는지 여부를 나타내는 부울 값입니다.

또한, 프레임워크가 지도 특징을 강조하는 방법을 제어하기 위해 MapStyle.StandardEmphasis 값 중 하나가 되도록 강조를 구성할 수도 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

예를 들어, 우리가 강조를 'muted'로 설정했을 때 지도의 이미지를 강조하지 않는 스타일로 설정한 경우, 지도는 다음과 같이 보일 것입니다.

```js
Map(initialPosition: initialPosition)
    .mapStyle(.standard(emphasis: .muted))
```

<img src="/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_7.png" />

# 주석 및 오버레이

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리는 이미 초기 지도 콘텐츠를 설정하는 동안 사용했지만, 이제 우리가 지도에 추가할 수 있는 멋진 기능들을 좀 더 자세히 살펴보도록 해요!

여기 우리가 MapContentBuilder에 추가할 수 있는 MapContent 유형들이 있어요:

- Annotation
- UserAnnotation
- Marker
- MapCircle
- MapPolygon
- MapPolyline

모두 살펴봐요!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Annotation, Marker, MapCircle

```js
var body: some View {
    Map(initialPosition: .camera(MapCamera(
        centerCoordinate: CLLocationCoordinate2D(latitude: 39.1911, longitude: -106.817535),
        distance: 1000,
        heading: 0,
        pitch: 0
    ))) {
        Annotation("Annotation", coordinate: CLLocationCoordinate2D(latitude: 39.191, longitude: -106.817)) {
            Image(systemName: "flag")
                .padding(.all, 8)
                .background(RoundedRectangle(cornerRadius: 5).fill(.yellow))
        }

        Marker("Marker", coordinate: CLLocationCoordinate2D(latitude: 39.191, longitude: -106.817535))
            .tint(.red)

        MapCircle(center: CLLocationCoordinate2D(latitude: 39.191, longitude: -106.817535), radius: 100)
            .foregroundStyle(.red.opacity(0.2))

    }
    .mapStyle(.standard(pointsOfInterest: []))
    .onAppear {
        print(CLLocationManager().authorizationStatus.rawValue)
    }
}
```

<img src="/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_8.png" />

## MapPolygon

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
MapPolygon(coordinates: [
    CLLocationCoordinate2D(latitude: 39.190, longitude: -106.8175),
    CLLocationCoordinate2D(latitude: 39.193, longitude: -106.8175),
    CLLocationCoordinate2D(latitude: 39.193, longitude: -106.8165),
    CLLocationCoordinate2D(latitude: 39.190, longitude: -106.8165)
])
.foregroundStyle(.brown)
```

<img src="/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_9.png" />

## MapPolyline

```js
MapPolyline(coordinates: [
    CLLocationCoordinate2D(latitude: 39.191, longitude: -106.817),
    CLLocationCoordinate2D(latitude: 39.193, longitude: -106.817535)
])
.stroke(.blue, lineWidth: 8)
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_10.png)

## UserAnnotation

```js
let initialPosition = MapCameraPosition.userLocation(
    fallback: .camera(MapCamera(
        centerCoordinate: CLLocationCoordinate2D(latitude: 39.1911, longitude: -106.817535),
        distance: 1000,
        heading: 0,
        pitch: 0
    ))
)

var body: some View {
    Map(initialPosition: initialPosition) {
        UserAnnotation(anchor: .center, content: { location in
            Text("UserAnnotation")
                .padding(.all, 8)
                .background(RoundedRectangle(cornerRadius: 5).fill(.yellow))
        })
    }
    .mapStyle(.standard(pointsOfInterest: []))
}
```

![이미지](/assets/img/2024-08-19-SwiftUIMapKitMapsStylesOverlaysandControls_11.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이전에 MapCameraPosition.userLocation을 사용했을 때처럼 UserAnnotation을 사용하기 위해선 info.plist에 Privacy — Location When In Use Usage Description을 추가하고, CLLocationManager().requestWhenInUseAuthorization을 호출하여 사용자의 허락을 받아야 합니다.

솔직히 말해서, UserAnnotation 대신 현재 위치를 가져와서 내 어노테이션을 추가하는 CoreLocation을 사용하는 편이 더 매력적일 것 같아요.

이유는 지도를 이동하거나 위치를 변경하는 등 지도와 상호작용을 할 때, 어노테이션이 사라질 수 있기 때문입니다.

## 참고!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

오버레이의 색상은 서로 다른 수정자를 사용하여 적용됩니다. 어떤 것은 tint를 사용하고, 어떤 것은 foregroundStyle을 사용하며, 어떤 것은 stroke를 사용합니다!

# 지도 컨트롤

오늘 하루를 마무리하면 지도의 축척을 변경하거나 장치의 현재 위치를 표시하거나 숨기는 등 사용자가 상호작용할 수 있는 컨트롤을 추가할 수 있습니다. 여기에서 사용할 수 있는 것들은 다음과 같습니다.

- MapCompass
- MapPitchToggle
- MapPitchSlider (Mac 전용)
- MapScaleView
- MapUserLocationButton
- MapZoomStepper (Mac 전용)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## MapCompass

MapCompass Control을 사용하는 두 가지 방법이 있습니다.

첫째로, 독립된 뷰로 사용할 수 있습니다.

```js
@Namespace var mapScope

var body: some View {

    ZStack {
        Map(initialPosition: initialPosition, scope: mapScope)
            .mapStyle(.standard(pointsOfInterest: []))
        MapCompass(scope: mapScope)
    }
    .mapScope(mapScope)

}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

위와 같이, Map 및 MapCompass가 동일한 네임스페이스에 속한다는 것을 프레임워크에 알려주기 위해 scope 매개변수를 지정해야 합니다!

![이미지](https://miro.medium.com/v2/resize:fit:500/1*h2Suxs99H3Bj1wYiqzLhsA.gif)

두 번째로, mapControls(\_:) 수정자를 사용하여 다음과 같이 처리할 수 있습니다.

```js
Map(initialPosition: initialPosition)
      .mapControls {
          MapCompass()
      }
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](https://miro.medium.com/v2/resize:fit:500/1*gz47I46XaZsINfu_SnA-Yw.gif)

위의 GIF에서 이미 알 수 있지만, 여전히 강조하고 싶은 점이 있어요!

우선, 만약 우리가 이미 북쪽을 향하고 있으면 맵 컴파스가 나타나지 않을 거예요, 즉 초기 맵이 보일 때. 저는 맵과 컨트롤에 .mapControlVisibility(.visible)를 추가하여 처음부터 컨트롤을 표시하려고 해봤지만, 잘 작동하지 않았어요.

둘째, 컴파스를 탭하면 맵을 다시 조정하여 북쪽이 Map 뷰의 맨 위에 오게 만들어요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## MapPitchToggle

이 컨트롤을 사용하면 연결된 지도의 피치를 설정하여 2D 및 3D 뷰 사이를 전환할 수 있습니다.

다시 한 번, 여기에서는 위와 똑같은 방식으로 단독 뷰로 사용하거나 수정자로 사용하는 선택이 가능합니다. 여기서는 수정자를 사용하는 방법만을 시연하겠습니다.

```js
Map(initialPosition: initialPosition)
    .mapControls {
        MapPitchToggle()
    }
.mapStyle(.standard(pointsOfInterest: []))
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![](https://miro.medium.com/v2/resize:fit:500/1*47ULWSRoJKq4WXi2bT-lLA.gif)

## MapScaleView

We can use it to display a legend with distance information for the associated map in the upper left corner.

```js
Map(initialPosition: initialPosition)
    .mapControls {
        MapScaleView()
    }
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="https://miro.medium.com/v2/resize:fit:500/1*hBwzXOKx3PBYSU3CfhvFaw.gif" />

이 view는 스케일링을 시작할 때에만 보입니다.

## MapUserLocationButton

사용자의 위치를 표시하는 지도의 프레임을 설정하는 버튼입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
.mapControls {
    MapUserLocationButton()
 }
```

![image](https://miro.medium.com/v2/resize:fit:500/1*cCLAKqAe4P37Zg-L1tMQxg.gif)

이미 아시겠지만, 제가 다시 한 번 반복하겠습니다!

우리는 Privacy - Location When In Use Usage Description을 info.plist에 추가하고 CLLocationManager().requestWhenInUseAuthorization을 호출하여 사용자의 허락을 받아야 합니다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

오늘은 여기까지입니다!

읽어주셔서 감사합니다!

곧 MapKit 관련 더 멋진 정보가 올 예정이에요! 관심이 있으시다면 기대해 주세요!

즐거운 맵핑 되세요!
