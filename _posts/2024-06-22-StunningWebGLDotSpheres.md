---
title: "경이로운 WebGL 점 구체 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-StunningWebGLDotSpheres_0.png"
date: 2024-06-22 13:43
ogImage: 
  url: /assets/img/2024-06-22-StunningWebGLDotSpheres_0.png
tag: Tech
originalTitle: "Stunning WebGL Dot Spheres"
link: "https://medium.com/@whwrd/stunning-dot-spheres-with-webgl-4b3b06592017"
isUpdated: true
---





![Image](/assets/img/2024-06-22-StunningWebGLDotSpheres_0.png)

최근에 Stripe와 GitHub에서 WebGL 지구 모형이 눈에 띄게 사용되면서 많은 관심을 받았습니다. 둘 다 자사 홈페이지에서 그것들을 주목적으로 활용했고, 이에 관한 블로그 포스트를 작성했습니다(Stripe의 포스트는 [여기](Stripe's link)에서 확인할 수 있고, GitHub의는 [여기](GitHub's link)에서 확인할 수 있습니다).

두 지구 모형은 대부분 점들로 이루어져 있는데, 이것이 저에게 구체 표면에 점들을 분산시키는 다양한 방법에 대해 생각해보게 했습니다. 구 형태에 대한 점 배치는 수학자들이 적극적으로 고민하는 복잡한 퍼즐로, 이 기사를 위해서 제가 몇 가지 기본적인 방법을 소개하고 WebGL에서 어떻게 구현할 수 있는지에 대해 제한했습니다.

# 씬 설정하기


<div class="content-ad"></div>

현재 진행하기 전에, 구를 만들 WebGL 씬을 구축하는 것이 필요합니다. WebGL API와 상호 작용하기 위한 주요 프레임워크로 Three.js를 사용하고 있어요. 이 글의 코드 스니펫은 간결하고 관련성이 높도록 유지하고 있으니, 전체 코드를 확인하려면 포함된 샌드박스를 살펴보세요.

씬을 생성한 후, 모든 점에 대한 geometries를 포함할 dotGeometries 배열을 정의합니다. 그런 다음, 씬 내의 공간에 빈 벡터, 즉 3D 포인트를 생성하며, 해당 위치는 각각의 점을 만들 때마다 재할당됩니다.

```js
// 씬을 설정합니다.
const scene = new THREE.Scene();

// 모든 점의 geometries를 보관할 배열을 정의합니다.
const dotGeometries = [];

// 점에서 사용할 빈 벡터를 생성합니다.
const vector = new THREE.Vector3();

// 이곳에서 점을 생성하고 위치를 지정합니다!
```

점을 생성하고 그 geometries를 dotGeometries 배열에 넣은 후, mergeBufferGeometries 유틸리티를 사용하여 이를 하나의 geometry로 병합할 수 있습니다. 그런 다음, dot geometries에서 mesh를 생성하고, 이에 재질을 부여하고 씬에 추가하면 됩니다.

<div class="content-ad"></div>

```js
// 모든 점 지오메트리를 하나의 버퍼 지오메트리로 병합합니다.
const mergedDotGeometries = BufferGeometryUtils.mergeBufferGeometries(
  dotGeometries
);

// 점을 위한 재질을 정의합니다.
const dotMaterial = new THREE.MeshBasicMaterial({
  color: DOT_COLOR,
  side: THREE.DoubleSide
});

// 점 지오메트리와 재질에서 점 메시를 생성합니다.
const dotMesh = new THREE.Mesh(mergedDotGeometries, dotMaterial);

// 점 메시를 씬에 추가합니다.
scene.add(dotMesh);
```

이제 어떻게 점을 생성하고 배치할지 살펴봅시다.

# 기본적인 접근 방법

구에 점을 추가하는 가장 쉬운 방법은 단순히 구가 갖도록 원하는 위도 선 및 경도 선의 수를 정의한 다음 해당 선들에 따라 점을 배치하는 것입니다. 여기에는 몇 가지 중요한 사항이 있습니다.


<div class="content-ad"></div>

먼저, 각 점에 대해 phi와 theta 각도를 정의합니다. 이러한 각도는 구 좌표계의 일부로, 점이 3D 공간에서 원점과의 관계를 정확히 나타내는 시스템입니다 (우리의 경우에는 구의 중심).

두 번째로, phi와 theta는 모두 라디안으로 측정됩니다. 핵심은 180º에 π 라디안이 있다는 것을 기억하는 것입니다. 여기서 phi를 찾기 위해선 단순히 π를 위도 주선 수로 나누면 됩니다. 그러나 theta를 찾기 위해서는 경도 주선 수로 2 * π를 나누어야 합니다. 왜냐하면 경도 주선이 구의 전체 360º를 계속 감싸도록 하기 때문입니다.

```js
// 위도를 반복합니다.
for (let lat = 0; lat < LATITUDE_COUNT; lat += 1) {
  // 경도를 반복합니다.
  for (let lng = 0; lng < LONGITUDE_COUNT; lng += 1) {
    // 점에 대한 geometry를 생성합니다.
    const dotGeometry = new THREE.CircleGeometry(DOT_SIZE, 5);
    // 점을 위한 phi와 theta 각도를 정의합니다.
    const phi = (Math.PI / LATITUDE_COUNT) * lat;
    const theta = ((2 * Math.PI) / LONGITUDE_COUNT) * lng;

    // 구 반지름, phi 및 theta에서 생성된 구 좌표를 사용하여 벡터를 설정합니다.
    vector.setFromSphericalCoords(SPHERE_RADIUS, phi, theta);

    // 점이 올바른 방향을 향하도록 합니다.
    dotGeometry.lookAt(vector);

    // 점 geometry를 올바른 위치로 이동합니다.
    dotGeometry.translate(vector.x, vector.y, vector.z);

    // 위치 지정 geometry를 배열에 추가합니다.
    dotGeometries.push(dotGeometry);
  }
}
```

이렇게 해서 다음 결과를 얻을 수 있습니다:

<div class="content-ad"></div>

만약 구를 회전시키면, 맨 위와 맨 아래의 고리가 가운데보다 훨씬 더 밀집되어 있는 것을 알게 될 거에요. 이는 각 위도선에 있는 점들의 개수를 다양하게 하지 않았기 때문입니다. 여기서 구 패킹이 필요한 때입니다.

# 실로택시스 방법론

해바라기 꽃의 머리나 솔방울의 바닥을 본 적이 있다면, 이상하고 독특한 패턴을 알아차릴 수 있을 겁니다. 이 패턴은 피보나치 수열을 기반으로 하는 배열에 의해 만들어져, 실로택시스로 알려져 있습니다. 이를 이용하여 점들을 구의 표면 위에 더 균일하게 위치시켜 보이도록 할 수 있습니다.

이번에는 위도와 경도 선의 개수를 정의하는 대신, 단순히 구에 나타나길 원하는 총 점의 수를 정의합니다. 위도 선을 가로지르는 대신, 점들은 구의 한 극에서 다른 극까지 단일하고 연속적인 나선 형태로 렌더링될 것입니다.

<div class="content-ad"></div>

```js
// 점의 개수만큼 반복합니다.
for (let dot = 0; dot < DOT_COUNT; dot += 1) {
  // 점을 위한 geometry를 생성합니다.
  const dotGeometry = new THREE.CircleGeometry(DOT_SIZE, 5);

  // 각 점의 구면 좌표를 계산하여 피로태시스 패턴으로 만듭니다.
  const phi = Math.acos(-1 + (2 * dot) / DOT_COUNT);
  const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

  // 구의 반지름, phi 및 theta에서 생성된 구면 좌표를 사용하여 벡터를 설정합니다.
  vector.setFromSphericalCoords(SPHERE_RADIUS, phi, theta);

  ...

}
```

위와 같은 결과가 나타납니다.

이 방법은 훨씬 더 만족스럽습니다. 그러나 가능한 한 점들을 골고루 배치하고 싶지만 자유롭게 위도 선 수를 정의하고 싶다면 어떻게 해야 할까요?

# 선형 접근법


<div class="content-ad"></div>

이번에는 필요한 위도선 수를 정의하되, 점의 수도 위치한 위도선의 둘레에 기반하여 조절됩니다. 간격에 대한 더 큰 제어를 위해 점 밀도 매개변수도 정의할 것입니다.

여기서 까다로운 부분은 각 위도선의 반지름을 계산하는 것입니다. 일단 그것을 구했다면, 얼마나 많은 점을 표시해야 하는지 간단히 알아내고, 각각에 대해 첫 번째 방법과 유사한 방식으로 파이와 세타를 찾는 것도 상대적으로 간단합니다.

```js
// 위도 선을 가로지르는 루프
  for (let lat = 0; lat < LATITUDE_COUNT; lat += 1) {
    // 위도선의 반지름 계산
    const radius =
      Math.cos((-90 + (180 / LATITUDE_COUNT) * lat) * (Math.PI / 180)) *
      SPHERE_RADIUS;
    // 위도선의 둘레 계산
    const latitudeCircumference = radius * Math.PI * 2 * 2;
    // 해당 위도선에 필요한 점의 수 계산
    const latitudeDotCount = Math.ceil(latitudeCircumference * DOT_DENSITY);

    // 해당 위도선의 점 수에 대해 루프 수행
    for (let dot = 0; dot < latitudeDotCount; dot += 1) {
      const dotGeometry = new THREE.CircleGeometry(DOT_SIZE, 5);
      // 점을 위한 파이와 세타 각도 계산
      const phi = (Math.PI / LATITUDE_COUNT) * lat;
      const theta = ((2 * Math.PI) / latitudeDotCount) * dot;

      ...

    }
  }
```

이로써 매우 만족스러운 점 배치가 됩니다:

<div class="content-ad"></div>

저희는 구체에 점들이 표시되는 방법에 대해 다루었습니다. 그렇다면 더 복잡한 효과를 얻을 수는 없을까요?

# 모양 마스킹

더 복잡한 패턴으로 점을 표시하는 방법을 알아내려면 수학적인 두통으로 빠르게 빠질 수 있습니다. 그러나 위의 포장 배치 중 하나와 마스크 이미지를 결합하여 일부 특별한 효과를 얻을 수 있습니다.

이를 위해 먼저 HTML 캔버스 요소를 만들고 마스크 이미지를 그려야 합니다. 이 요소는 실제로 화면에 렌더링되지 않습니다. 이미지에서 픽셀 데이터를 추출하는 편리한 방법 뿐입니다. 이 일은 한 번만 해야하므로 미리 수행한 다음 추출된 이미지 데이터를 renderScene 함수로 전달하면 됩니다.

<div class="content-ad"></div>

```js
// 이미지 로더를 초기화합니다.
const imageLoader = new THREE.ImageLoader();

// 점이 표시되는 위치를 결정하는 이미지를 로드합니다. 이 작업이 완료되기 전에 구 cannot be initialised until this is complete.
imageLoader.load(MASK_IMAGE, (image) => {
    // HTML 캔버스를 생성하고 해당 캔버스의 컨텍스트를 가져와 이미지를 그립니다.
    const tempCanvas = document.createElement("canvas");

    tempCanvas.width = image.width;
    tempCanvas.height = image.height;

    const ctx = tempCanvas.getContext("2d");

    ctx.drawImage(image, 0, 0);

    // 캔버스 컨텍스트에서 이미지 데이터를 읽어옵니다.
    const imageData = ctx.getImageData(0, 0, image.width, image.height);

    renderScene(imageData);
});
```

이제 이미지 데이터를 사용할 수 있으므로 몇 가지 유틸리티 함수를 추가해야 합니다. 첫 번째 함수는 구의 한 점을 가져와 해당 점이 구에 매핑된 경우 mask 이미지에서의 UV 좌표를 반환합니다.

```js
// 구의 한 점을 가져와 해당 점이 사각 텍스처 또는 이미지에서 UV 포인트로 변환하는 유틸리티 함수입니다.
const spherePointToUV = (dotCenter, sphereCenter) => {
    // 구의 중심에서 점의 중심 방향을 나타내는 새로운 벡터를 만듭니다.
    const newVector = new THREE.Vector3();
    newVector.subVectors(sphereCenter, dotCenter).normalize();

    // 점의 UV 좌표를 계산해서 벡터로 반환합니다.
    const uvX = 1 - (0.5 + Math.atan2(newVector.z, newVector.x) / (2 * Math.PI));
    const uvY = 0.5 + Math.asin(newVector.y) / Math.PI;

    return new THREE.Vector2(uvX, uvY);
};
```

두 번째 함수는 주어진 UV 좌표에서 mask 이미지의 픽셀 데이터를 반환합니다.


<div class="content-ad"></div>

```js
// 이미지에서 특정 지점의 데이터를 샘플링하는 유틸리티 함수입니다. imageData 객체가 필요합니다.
const sampleImage = (imageData, uv) => {
  // UV 좌표를 기반으로 점의 데이터를 계산하고 반환합니다.
  const point =
    4 * Math.floor(uv.x * imageData.width) +
    Math.floor(uv.y * imageData.height) * (4 * imageData.width);

  return imageData.data.slice(point, point + 4);
};
```

이제 마스킹 효과를 적용하는 데 필요한 모든 것을 갖추었습니다. 각 점의 위치를 계산한 후에 해당 점의 경계 구를 계산합니다. 이후에 이를 사용하여 dot의 중심점을 spherePointToUV 함수에 전달할 수 있습니다. 이후에는 sampleImage 함수를 사용하여 해당 지점의 특정 픽셀 데이터를 찾을 수 있습니다. 픽셀이 투명하지 않으면 도트를 포함하고, 투명하면 도트를 제외합니다.

```js
// 도트 geometry를 위치로 이동합니다.
dotGeometry.translate(vector.x, vector.y, vector.z);

// 도트의 경계 구를 찾습니다.
dotGeometry.computeBoundingSphere();

// 랜드 이미지에서 도트의 UV 위치를 찾습니다.
const uv = spherePointToUV(
  dotGeometry.boundingSphere.center,
  new THREE.Vector3()
);

// 주어진 UV 위치에서 랜드 이미지의 픽셀을 샘플링합니다.
const sampledPixel = sampleImage(imageData, uv);

// 픽셀에 색상 값이 포함되어 있으면 (다시 말해, 투명하지 않으면),
// 도트를 생성합니다. 그렇지 않으면 건너뜁니다.
if (sampledPixel[3]) {
  // 위치 지정 geometry를 배열에 추가합니다.
  dotGeometries.push(dotGeometry);
}
```

실제로는 투명 배경을 가진 png 이미지를 마스크로 지정할 수 있습니다. 도트는 이미지의 해당 점이 투명하지 않은 경우에만 구로 렌더링됩니다. 간단한 다이아몬드 패턴을 가진 이미지로부터 이 멋진 결과를 얻을 수 있습니다:


<div class="content-ad"></div>

더 복잡한 마스크 이미지를 사용하여 이 지구 효과와 같은 모양을 얻을 수 있어요:

또한 텍스트를 렌더링할 수도 있어요:

# 여기까지!

이러한 구 형상 기법들을 WebGL 쇼피스의 기초로 여러 곳에서 사용했어요. 이를 통해 여러분도 같은 작업을 해볼 수 있기를 바랄게요. 만약 이 기사를 즐겨보았거나 어떤 면에서 도움이 되었다면 꼭 알려주세요! 제 웹사이트는 여기 있어요.