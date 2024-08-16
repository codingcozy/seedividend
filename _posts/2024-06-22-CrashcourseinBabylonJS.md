---
title: "BabylonJS 급속 교정 코스 빠르게 배우는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-CrashcourseinBabylonJS_0.png"
date: 2024-06-22 02:10
ogImage: 
  url: /assets/img/2024-06-22-CrashcourseinBabylonJS_0.png
tag: Tech
originalTitle: "Crash course in BabylonJS"
link: "https://medium.com/dev-jam/crash-course-in-babylonjs-88f9aa8bc22e"
isUpdated: true
---




이 가이드와 함께 사용할 수 있는 GitHub 저장소가 있습니다. 저장소는 여기에서 찾을 수 있습니다. GitHub 페이지에서 호스팅 된 라이브 앱은 여기에서 볼 수 있습니다.

# Babylon.js란?

Babylon.js는 웹 브라우저 내에서 3D 그래픽을 실시간으로 렌더링할 수 있는 강력한 오픈 소스 3D 엔진입니다. 플러그인이 필요하지 않고 WebGL, WebXR 등의 웹 표준을 활용하여 웹 환경에서 풍부하고 상호 작용적이며 몰입적인 경험을 제공합니다. Babylon.js는 초심자도 쉽게 사용할 수 있도록 설계되었지만, 숙련된 개발자가 복잡하고 고성능의 3D 애플리케이션을 만들기 위해 필요한 심도와 기능을 제공합니다. 이 가이드에서 언제든지 문서를 더 자세히 살펴보고 싶다면 여기에서 찾을 수 있습니다.

![BabylonJS 이미지](/assets/img/2024-06-22-CrashcourseinBabylonJS_0.png)

<div class="content-ad"></div>

# 기본 개발 환경 설정하기

Babylon.js로 몰입형 3D 애플리케이션을 만들기 위해서는 적절한 개발 환경을 설정해야 합니다. 이 설정을 통해 Babylon.js 프로젝트를 효율적으로 개발, 테스트, 배포할 수 있는 필수 도구와 소프트웨어를 갖추게 됩니다. 아래에서 시작하는 데 필요한 주요 사항을 살펴보겠습니다.

소스 파일을 보관할 새 폴더를 만드세요. 이 폴더를 src로 이름 짓을 수 있습니다. 해당 폴더에 다음 내용을 가진 index.html을 추가하세요:

```html
<html>
    <head>
        <title>BabylonJS</title>
        <!-- 스타일 가져오기 -->
        <link rel="stylesheet" href="./index.css">
    </head>
    <body>
        <canvas id="main"></canvas>
        <!-- 스크립트 가져오기 -->
        <!-- 스크립트 태그에 type="module"을 추가하는 것을 잊지 마세요 -->
        <script type="module" src="./index.js"></script>
    </body>
</html>
```

<div class="content-ad"></div>

알림: BabylonJS에서 제공하는 CDN 배포를 사용할 수 있습니다. NPM에서 설치하려면 npm install --save babylonjs 명령을 실행한 다음 import * as BABYLON from `babylonjs`; 를 사용하여 자바스크립트 파일에서 가져와야 합니다.

이제 src 디렉토리에 index.css라는 css 파일을 만들어 보겠습니다. 다음 내용을 포함하도록 합니다 (이 파일은 선택 사항이지만 기본 패딩 및 여백과 같은 항목을 제거하여 애플리케이션을 깔끔하게 유지하는 데 도움이 됩니다):

```js
html, body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
#main {
    width: 100%;
    height: 100%;
}
```

이제 흥미로운 부분, index.js 파일을 만들어 기본 씬을 생성해 보겠습니다. 기본 씬을 생성하는 내용을 파일에 추가해주세요. (지금은 씬이로드되는 것만 확인하려고 합니다. 세부 정보는 나중에 다룰 예정입니다.)

<div class="content-ad"></div>

```js
var createScene = function () {
    // 기본 Babylon Scene 객체를 생성합니다.
    var scene = new BABYLON.Scene(engine);
    // 자유 카메라를 생성하고 위치를 조절합니다.
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // 카메라를 씬의 원점으로 이동시킵니다.
    camera.setTarget(BABYLON.Vector3.Zero());
    // 카메라를 캔버스에 부착합니다.
    camera.attachControl(canvas, true);
    // 하늘을 향하도록 조명을 생성합니다.
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // 기본 강도는 1입니다. 조명을 약간 어두운 양으로 설정합니다.
    light.intensity = 0.7;
    // 구 모양을 생성합니다.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    // 구를 높이의 반만큼 위로 이동시킵니다.
    sphere.position.y = 1;
    // 바닥 모양을 생성합니다.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    return scene;
};

var canvas = document.getElementById("main"); // 캔버스 요소를 가져옵니다.
var engine = new BABYLON.Engine(canvas, true); // BABYLON 3D 엔진을 생성합니다.
var scene = createScene(); // createScene 함수를 호출합니다.
// 씬을 반복적으로 렌더링하는 렌더 루프를 등록합니다.
engine.runRenderLoop(function () {
    scene.render();
});

// 브라우저/캔버스 크기 조정 이벤트를 감지합니다.
window.addEventListener("resize", function () {
    engine.resize();
});
```

지금 Parcel로 앱을 실행하면, `npx parcel src/index.html` 명령어로 실행할 수 있습니다. 그러면 구면이 평평한 표면 위에 있는 기본 3D 환경이 출력될 것입니다. BabylonJS 애플리케이션을 만들어서 축하드립니다!

# Babylon.js 애플리케이션 구조 이해

Babylon.js 애플리케이션은 몇 가지 핵심 개념을 중심으로 구성됩니다: 엔진, 씬, 카메라, 조명 및 메쉬입니다. 이러한 요소를 이해하는 것은 Babylon.js 개발을 탐색하고 마스터하는 데 중요합니다. 이 구성 요소가 Babylon.js 애플리케이션의 전체 구조에 어떻게 맞는지 더 자세히 살펴보겠습니다.


<div class="content-ad"></div>

# 엔진

엔진은 Babylon.js 애플리케이션의 핵심입니다. 브라우저의 캔버스 요소에 그려지는 그래픽을 렌더링하는 역할을 합니다. 엔진은 WebGL과의 인터페이싱과 렌더링 프로세스의 최적화와 같은 복잡한 작업들을 처리합니다.

# 씬

씬은 모든 객체, 조명, 카메라 등을 담는 컨테이너입니다. 3D 세상이 존재하는 가상 공간을 나타냅니다. 씬은 3D 객체가 배치되고 상호 작용하는 무대로 생각할 수 있습니다. Babylon.js에서 씬을 만드는 것은 간단합니다. 엔진을 초기화한 후에는 카메라, 조명, 객체를 모두 포함할 씬 객체를 만들면 됩니다.

<div class="content-ad"></div>

```js
var scene = new BABYLON.Scene(engine);
```

"scene"은 여러분이 객체를 추가하고 물리학을 정의하며 안개나 배경색과 같은 환경 조건을 설정할 곳입니다. 이것은 여러분이 3D 세계를 그릴 캔버스입니다. 여기서 Babylon.js 문서에서 Scene에 대해 더 알아볼 수 있습니다.

# Camera

카메라는 장면을 렌더링할 시점을 정의합니다. Babylon.js는 다양한 유형의 카메라를 제공하여 여러 요구 사항을 충족하며, 예를 들어 첫 번째 시점 시점의 자유 카메라나 물체 주위를 공전하는 Arc Rotate Camera와 같은 카메라가 있습니다. 카메라를 설정하는 것은 장면을 보는 데 중요합니다. 간단한 Arc Rotate 카메라를 설정하면 사용자가 한 지점 주위를 공전할 수 있습니다.

<div class="content-ad"></div>

```js
var camera = new BABYLON.ArcRotateCamera("카메라", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);
```

이 카메라는 장면의 중심을 중심으로 회전하며 사용자 상호 작용을 위한 컨트롤이 있습니다. 자세한 내용은 여기에서 카메라에 대한 설명서를 확인하세요.

# 빛

빛은 장면의 객체를 조명합니다. 간단한 포인트 라이트는 다음과 같이 생성하고 배치할 수 있습니다:

<div class="content-ad"></div>

```js
var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 10, 0), scene);
light.intensity = 0.95;
```

이 빛은 공간의 한 점에서 빛을 쏘아 객체에 깊이를 줄 것입니다. Babylon.js 문서에서 더 많은 정보를 찾을 수 있어요.

# 렌더 루프

렌더 루프는 장면을 지속적으로 업데이트하고 렌더링하는 역할을 합니다. 이것은 당신의 Babylon.js 애플리케이션의 게임 루프로, 애니메이션과 상호작용을 펼쳐지게 합니다:

<div class="content-ad"></div>

```js
engine.runRenderLoop(function () {
    // 상자를 y축을 중심으로 회전시킵니다.
    scene.getMeshByName("box").rotation.y += 0.01;
    scene.render();
});
```

# 도형 및 모델 작업

Babylon.js는 기본적인 기하학적 도형부터 다양한 형식에서 가져온 복잡한 3D 모델까지 다룰 수 있는 포괄적인 기능 세트를 제공합니다. 이 섹션에서는 기본 도형을 만들고 모델을 가져오며 변환 및 애니메이션을 적용하는 방법을 안내합니다.

Babylon.js에는 다양한 미리 정의된 도형이 포함되어 있어 쉽게 장면에 추가할 수 있습니다. 이러한 기본 도형에 대해 자세히 알아보려면 **[Babylon.js documentation](https://doc.babylonjs.com/)**를 확인하십시오.

<div class="content-ad"></div>

간단한 도형을 만드는 방법을 알려드릴게요:

## 구:

```js
var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
sphere.position = new BABYLON.Vector3(0, 1, 0);
```

<div class="content-ad"></div>

```js
var box = BABYLON.MeshBuilder.CreateBox("box", {height: 2, width: 2, depth: 2}, scene);
box.position = new BABYLON.Vector3(5, 1, 0);
```

# Cylinder:

```js
var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 3, diameter: 2}, scene);
cylinder.position = new BABYLON.Vector3(-5, 1.5, 0);
```

이 도형들은 position 속성을 사용하여 월드 공간에 배치되며, 이 속성은 BABYLON.Vector3를 사용하여 X, Y 및 Z축에서의 위치를 지정합니다.

<div class="content-ad"></div>

복잡한 모델로 장면을 풍부하게 만들기 위해서는 그것들을 가져와야 할 것입니다. Babylon.js는 원활한 사용자 경험을 보장하기 위해 비동기 모델 로딩을 지원합니다. .glb, .gltf, .obj 등 다양한 형식의 모델을 가져올 수 있습니다. Babylon.js 문서에서 모델 가져오기에 대해 더 알아보세요.

다음은 ImportMeshAsync를 사용하여 모델을 가져오는 방법입니다:

# 단일 모델 로드:

```js
BABYLON.SceneLoader.ImportMeshAsync("", "/models/", "house.glb", scene).then((result) => {
    const house = result.meshes[0];
    house.position = new BABYLON.Vector3(0, 0, 0);
});
```

<div class="content-ad"></div>

# 여러 모델 불러오기:

```js
BABYLON.SceneLoader.ImportMeshAsync(["model1", "model2"], "/models/", "town.glb", scene).then((result) => {
    result.meshes.forEach(mesh => {
        if (mesh.name === "model1") {
            mesh.position.x = 20;
        }
    });
    const model2 = scene.getMeshByName("model2");
    if (model2) {
        model2.rotation.y = Math.PI / 4;
    }
});
```

예제에서 모델을 로드한 후 위치를 변경하려면 Promises를 사용하여 변형을 수행합니다. 그러나 렌더링 루프에서 모델을 변형하려면 모델이 이미 로드되었는지 확인한 후에 변경을 가해야 합니다.

```js
var createScene = function () {
    …
    BABYLON.SceneLoader.ImportMeshAsync("semi_house", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon");
    …
}
…
engine.runRenderLoop(function () {
    // 집을 y축 주위로 회전시킵니다
    if (scene.getMeshByName("semi_house")) {
        scene.getMeshByName("semi_house").rotation.y -= 0.01;
    }
    scene.render();
});
```

<div class="content-ad"></div>

# 모델 로딩 및 애니메이션

바빌론.js 프로젝트에 복잡한 모델과 애니메이션을 통합하려면, 모델의 파일 형식에 따라 추가적인 로더를 사용해야 할 수도 있습니다. 바빌론.js는 다양한 파일 유형을 지원하며, 각각의 파일 형식에 따라 해당 로더를 사용해야 할 수 있습니다. 지원되는 파일 유형에 대한 자세한 정보와 해당 로더를 사용하는 방법은 모델 가져오기에 관한 바빌론.js 문서에서 확인할 수 있습니다.

이러한 모델을 처리할 수 있도록 프로젝트에 필요한 로더 스크립트를 HTML에 포함시키세요. .glb 및 .gltf를 포함한 대부분의 3D 모델 형식의 경우, 일반 로더 스크립트가 필요합니다:

```js
<script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
```

<div class="content-ad"></div>

적절한 로더를 통합하면 Babylon.js 씬 내에서 모델을 가져와 애니메이션을 적용할 수 있습니다. 다음 예시는 .glb 모델을 로드하고, 크기를 조정하며, 미리 정의된 애니메이션을 시작하는 방법을 보여줍니다.

다음 예시는 여기에서 찾을 수 있는 Babylon.js 문서에 있는 모델 가져오는 예시를 기반으로 합니다.

```js
BABYLON.SceneLoader.ImportMesh("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
 var hero = newMeshes[0];
 // 모델 크기 축소
 hero.scaling.scaleInPlace(0.1);
 // 옵션: 캐릭터에 카메라 고정
 // 씬 내에 'camera1'라는 카메라가 있는 경우, 로드된 모델에 초점을 맞추려면 다음 줄의 주석을 해제하세요
 // camera1.target = hero;
 // 'Samba'라는 이름의 특정 애니메이션 그룹을 가져옵니다
 const sambaAnim = scene.getAnimationGroupByName("Samba");
 // 'Samba' 애니메이션 실행
 sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
});
```

이 예시는 지정된 URL에서 "HVGirl.glb"라는 모델을 로드하고, 적절한 씬 크기를 위해 크기를 축소한 후 "Samba"라는 이름의 애니메이션 그룹을 찾아 재생하는 과정을 보여줍니다. 씬의 상세 정보와 카메라 설정, 모델과 연관된 애니메이션의 이름과 유형에 맞게 예시를 수정하는 것이 중요합니다. 로딩 과정은 비동기적으로 진행되므로 응용 프로그램이 로드되는 중에도 반응성을 유지할 수 있습니다.

<div class="content-ad"></div>

# 카메라와 조명

Babylon.js에서 몰입감 있는 3D 장면을 만들기 위해 카메라와 조명을 이해하는 것이 중요합니다. 이러한 요소들은 뷰어가 볼 수 있는 것뿐만 아니라 장면을 어떻게 인식하는지도 제어합니다. 이 섹션에서는 Babylon.js에서 제공되는 다양한 종류의 카메라와 조명을 소개하고 그림자와 반사를 구현하는 기술을 소개하여 장면의 현실성과 깊이를 높이는 방법을 알려드리겠습니다.

다양한 종류의 카메라 및 사용 시기

- FreeCamera: 첫인칭 또는 탐험 중심 경험에 이상적인 FreeCamera는 사용자가 키보드와 마우스 입력으로 장면을 자유롭게 탐색하고 뷰를 제어할 수 있습니다.

<div class="content-ad"></div>

```js
var camera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 5, -10), scene);
camera.attachControl(canvas, true);
```

- ArcRotateCamera: 특정 지점이나 객체 주변을 공전하기에 가장 적합한 ArcRotateCamera는 제품 쇼케이스나 주제가 중심에 남아 있고 카메라가 그 주제 주변을 공전하는 경우에 자주 사용됩니다.

```js
var camera = new BABYLON.ArcRotateCamera("arcCamera", Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);
```

- UniversalCamera: FreeCamera와 TouchCamera의 기능을 결합한 UniversalCamera는 입력 방법(키보드, 마우스, 터치)을 지원하는 다용도 카메라로 다양한 응용 분야에 유용합니다.

<div class="content-ad"></div>

```js
var camera = new BABYLON.UniversalCamera("universalCamera", new BABYLON.Vector3(0, 5, -10), scene);
camera.attachControl(canvas, true);
```

- FollowCamera: 물체가 움직일 때 일정한 거리와 각도를 유지하면서 카메라를 따라가야 할 때 FollowCamera를 사용하세요. 게임이나 시뮬레이션에서 써드-퍼슨 시점에 적합합니다.

```js
var camera = new BABYLON.FollowCamera("followCamera", new BABYLON.Vector3(0, 5, -10), scene);
camera.lockedTarget = movingObject; // 따라다닐 오브젝트
```

# 기본 조명 기법과 광원 종류

<div class="content-ad"></div>

바빌론.js의 조명은 장면의 분위기, 톤 및 현실감에 극적인 영향을 미칠 수 있습니다. 여기에는 사용할 수있는 기본 조명 유형이 있습니다:

- PointLight: 단일 지점에서 모든 방향으로 빛을 발산합니다. 전구 또는 양초와 같은 광원을 시뮬레이션하는 데 유용합니다.

```js
var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 10, 0), scene);
```

- DirectionalLight: 특정 방향으로 발산되는 평행한 빛 선. 해나 기타 먼 거리의 방향성 있는 광원을 시뮬레이션하는 데 이상적입니다.

<div class="content-ad"></div>

```js
var light = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(0, -1, 0), scene);
```

- SpotLight: 특정 지점부터 특정 방향으로 광선을 방출하는 라이트입니다. 무대 공연이나 객체 강조와 같이 특정 장면 요소에 초점을 맞출 때 사용하기 좋습니다.

```js
var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 10, 0), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 2, scene);
```

- HemisphericLight: 하늘에 비춰지는 듯한 방향에서 모든 객체를 동일하게 조명하여 주변 빛을 모방합니다.

<div class="content-ad"></div>

```js
var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
```

카메라와 조명을 사용하여 Babylon.js 씬을 만들면 시각적으로 매력적이고 적절한 분위기와 심도를 전달하여 3D 프로젝트를 훨씬 몰입적이고 매력적으로 만들 수 있습니다.

# 소재와 텍스처

소재와 텍스처는 3D 그래픽에서 중요한 구성 요소로서 씬에 현실감과 깊이를 더해줍니다. Babylon.js에서 소재는 메시의 색상, 광택, 투명도 및 질감과 관련된 시각적 외관을 정의합니다. 반면에 텍스처는 이러한 소재의 표면에 매핑된 이미지로, 목재 무늬, 금속 또는 직물과 같은 자세한 외관을 제공합니다.

<div class="content-ad"></div>

Babylon.js에서 재료와 질감에 대해 더 자세히 알고 싶다면 이 문서를 확인해보세요.

# 객체에 재료 적용하기

Babylon.js에서 재료는 빛을 반사하고 색상을 표시하는 방식을 지정하는 데 사용됩니다. StandardMaterial은 다양한 시각 효과를 제공하는 다재다능한 재료 유형입니다. StandardMaterial을 생성하고 속성을 구성하는 방법은 다음과 같습니다:

```js
var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene); // 상자 생성
var material = new BABYLON.StandardMaterial("standardMaterial", scene);
material.diffuseColor = new BABYLON.Color3(1, 0, 0); // 빨간색
material.specularColor = new BABYLON.Color3(0, 1, 0); // 녹색 하이라이트
material.emissiveColor = new BABYLON.Color3(0, 0, 1); // 파란색 빛
material.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5); // 중간 회색 주변광
box.material = material;
```

<div class="content-ad"></div>

- diffuseColor: 백색 광선에 밝혀진 재료의 기본 색상을 정의합니다.
- specularColor: 광선이 재료에서 반사될 때 생성되는 하이라이트의 색상과 강도를 결정합니다.
- emissiveColor: 재료가 방출하는 것처럼 보이는 색상을 나타냅니다. 이 색상은 조명의 영향을 받지 않고 재료의 전체 색상에 추가됩니다.
- ambientColor: 장면의 주변 조명에 따라 재료의 색상에 영향을 미치며, 전체 색상에 더해집니다.

# 재료에 이미지 적용하기

텍스처를 사용하면 재료의 표면에 이미지를 적용하여 현실감을 더할 수 있습니다. 이미지로 재료에 텍스처를 적용하는 방법은 다음과 같습니다:

```js
var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene); // 상자 생성
var material = new BABYLON.StandardMaterial("textureMaterial", scene);
material.diffuseTexture = new BABYLON.Texture("이미지/경로/여기에/입력.png", scene);
box.material = material;
```

<div class="content-ad"></div>

이 예시에서는 텍스처가 재질의 diffuseTexture로 적용되어, 직접 빛 아래 재질의 색상과 모양에 영향을 줍니다. 이는 현실적인 표면을 만들거나 물체에 브랜드나 스티커를 적용하는 데 특히 유용할 수 있습니다.

텍스처는 diffuse 맵에만 국한되지 않습니다. Babylon.js는 표면 불규칙을 시뮬레이션하는 bum maps, 투명도를 위한 opacity maps, 그리고 반사 면을 만들기 위한 reflection maps를 포함한 다양한 텍스처 유형을 지원합니다. 각 텍스처 유형은 장면을 보다 동적이고 시각적으로 복잡하게 만드는 데 기여합니다.

# 상호작용과 사용자 입력

상호작용적인 3D 장면을 만들기 위해서는 키보드 입력과 마우스 클릭과 같은 사용자 입력에 반응하고, 물체를 조작하거나 장면을 탐색해야 합니다. Babylon.js는 사용자 입력을 처리하는 간단하고 강력한 시스템을 제공하여, 동적이고 상호작용적인 경험을 만들 수 있습니다. 이 섹션은 키보드와 마우스 입력을 다루는 기본 사항을 다루며, Babylon.js 프로젝트 내에서 물체를 상호작용적으로 만드는 방법을 보여줍니다. 더 많은 내용은 여기의 문서에서 확인할 수 있습니다.

<div class="content-ad"></div>

# 키보드 입력 처리

키보드 이벤트에 반응하려면 scene의 onKeyboardObservable 이벤트를 사용할 수 있습니다. 이 observable을 사용하면 키보드 이벤트를 청취하고 눌린 키 또는 해제된 키에 따라 코드를 실행할 수 있습니다. 다음은 특정 키가 눌렸을 때 객체를 이동시키는 예제입니다:

```js
scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
            console.log("KEY DOWN: ", kbInfo.event.key);
            // 앞으로 이동
            if (kbInfo.event.key === "w" || kbInfo.event.key === "W") {
                box.position.z -= 0.1;
            }
            // 뒤로 이동
            if (kbInfo.event.key === "s" || kbInfo.event.key === "S") {
                box.position.z += 0.1;
            }
            // 왼쪽으로 이동
            if (kbInfo.event.key === "a" || kbInfo.event.key === "A") {
                box.position.x -= 0.1;
            }
            // 오른쪽으로 이동
            if (kbInfo.event.key === "d" || kbInfo.event.key === "D") {
                box.position.x += 0.1;
            }
            break;
        case BABYLON.KeyboardEventTypes.KEYUP:
            console.log("KEY UP: ", kbInfo.event.key);
            break;
    }
});
```

이 코드는 방향 키 눌림을 청취하고 WASD 키를 누르면 상자 객체를 해당 방향으로 이동시킵니다. 이를 통해 당신의 scene 내에서 키보드로 조작되는 네비게이션 또는 움직임을 만드는 간단한 방법을 보여줍니다.

<div class="content-ad"></div>

# 마우스 클릭 처리

마우스 입력을 캡처하여 선택, 드래그 또는 객체와 상호 작용과 같은 작업을 구현할 수 있습니다. Babylon.js 씬은 자동으로 캔버스에서 마우스 이벤트를 캡처하며, 이러한 이벤트를 사용하여 상호 작용을 트리거할 수 있습니다. 예를 들어, 메시가 클릭되었을 때 작업을 수행하려면 ActionManager와 ExecuteCodeAction을 활용할 수 있습니다:

```js
var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene); // 상자 만들기
box.actionManager = new BABYLON.ActionManager(scene);
box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (evt) {
    // 상자가 클릭됐을 때 수행할 작업
    box.scaling.x *= 1.1;
    box.scaling.y *= 1.1;
    box.scaling.z *= 1.1;
}));
```

# 마우스 드래그 처리

<div class="content-ad"></div>

Babylon.js에서 상자(또는 어떤 메쉬든)를 드래깅하는 기능을 구현하려면 PointerDragBehavior를 사용할 수 있어요. 이 행동은 몇 줄의 코드로 씬 내에서 객체를 드래그할 수 있도록 쉽게 만들어줍니다. 다음은 그 방법이에요:

메쉬에 PointerDragBehavior를 연결합니다: 먼저 PointerDragBehavior의 인스턴스를 생성하고 메쉬에 연결해야 해요. 이 행동은 필요한 모든 이벤트를 처리하고 메시를 마우스로 드래그할 때 업데이트할 거에요.

```js
var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene); // 상자 생성
var dragBehavior = new BABYLON.PointerDragBehavior({dragPlaneNormal: new BABYLON.Vector3(0,1,0)});
box.addBehavior(dragBehavior);
```

이 예제에서 dragPlaneNormal은 (0, 1, 0)으로 설정되어 있어요. 이는 드래그 평면이 Y축과 수직이라는 뜻이에요. 이를 통해 상자를 땅 평면을 따라 드래그할 수 있어요. 이 벡터를 조정하여 필요에 맞게 드래깅 평면을 변경할 수 있어요.

<div class="content-ad"></div>

# 웹XR

웹XR는 개발자가 외부 소프트웨어나 앱 없이 웹 브라우저에서 직접 VR(가상 현실) 및 AR(증강 현실) 체험을 만들 수 있도록 하는 산업 수준 기술입니다. Babylon.js는 WebXR을 효과적으로 지원하여 3D 프로젝트에 몰입형 경험을 통합하기 쉽게 만들어줍니다. 이 섹션에서는 Babylon.js를 사용하여 WebXR을 통해 기본 AR 세션을 설정하는 방법에 대해 알아보겠습니다. 자세한 내용은 여기를 확인하세요.

# 웹XR AR 세션 설정

Babylon.js에서 웹XR을 시작하려면 VR/AR 하드웨어 액세스와 관련된 브라우저 보안 제약 사항 때문에 프로젝트가 서버에서 실행 중인지 확인해야 합니다. 그런 다음 createDefaultXRExperienceAsync 메서드를 사용하여 WebXR 경험을 시작할 수 있습니다. 이 메서드는 장면에서 WebXR을 위해 필요한 구성 요소를 설정합니다.

<div class="content-ad"></div>

다음 예제는 몰입형 AR 세션을 시작하는 방법을 보여줍니다:

```js
var xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: "immersive-ar",
    },
    optionalFeatures: true,
});
```

createDefaultXRExperienceAsync를 사용하면 AR 경험을 향상시키는 기능과 옵션을 구성할 수 있습니다. hit testing 및 plane detection과 같이 AR 경험을 향상시키는 옵션을 선택할 수 있습니다. sessionMode는 "immersive-ar"로 설정되어 브라우저로부터 AR 세션을 요청합니다.

- uiOptions: WebXR 세션에 대한 사용자 인터페이스 옵션을 정의합니다. sessionMode를 “immersive-ar”로 설정하면 브라우저로부터 AR 세션을 요청합니다.
- optionalFeatures: 이 옵션을 활성화하면 Babylon.js가 hit testing, plane detection 등의 AR 경험을 향상시키는 추가 WebXR 기능을 요청할 수 있습니다.
- Babylon.js의 WebXR의 주요 개념
- 몰입형 AR: 이 모드는 장치 카메라를 통해 본 실제 세계 위에 디지털 콘텐츠를 오버레이하여 완전히 몰입형 AR 경험을 제공합니다.
- 세션 관리: WebXR 세션을 조작하는 것은 중요합니다. Babylon.js는 WebXR 세션을 쉽게 시작, 관리 및 종료할 수 있는 방법을 제공합니다.
- 사용자 상호작용: AR에서 가상 객체와 상호작용하는 것은 전통적인 3D 씬과 다른 방식이 필요합니다. Babylon.js는 WebXR을 위한 다양한 상호작용 모델을 지원합니다.
- 성능 고려사항: AR 및 VR 경험은 요구가 많을 수 있습니다. 모델 및 논리를 성능 최적화하여 원활한 사용자 경험을 보장하는 것이 중요합니다.

<div class="content-ad"></div>

# 여정을 계속하세요

Babylon.js에 대한 이 간략한 과정을 성공적으로 마친 것을 축하드립니다! 지금쯤이면, 3D 장면 작성, 사용자 입력 처리, WebXR 통합 등에 대한 견고한 기초를 쌓았을 것입니다. 그러나 3D 웹 개발로의 여정은 여기서 끝나지 않아요. Babylon.js는 방대하고 다재다능한 엔진으로, 이 입문 과정에서 자세히 다루지 못한 많은 기능과 능력을 제공합니다. 프로젝트와 기술을 더욱 향상시키기 위해 Babylon.js의 추가 측면을 탐험하는 것이 중요합니다. 이어서 파고들어볼 핵심 영역 몇 가지를 살펴보겠습니다:

# 그림자와 반사

그림자와 반사를 추가하면 장면의 현실감을 크게 높일 수 있습니다. Babylon.js는 빛이 물체에 드리우는 동적 그림자와 물, 거울, 광택이 있는 금속과 같은 표면에 현실적인 반사를 만들기 위한 정교한 도구를 제공합니다. 이러한 기능을 숙달하면 시각적 프레젠테이션을 다음 차원으로 끌어올릴 수 있습니다.

<div class="content-ad"></div>

# 물리와 충돌

Babylon.js 씬에 물리를 통합하면 더 많은 상호 작용성과 현실감이 추가됩니다. 이 엔진은 중력, 충돌 및 물체 간의 복잡한 상호 작용을 지원합니다. 게임 또는 대화형 시뮬레이션을 개발하고 있다면, 물리를 적용하고 충돌을 관리하는 방법을 이해하는 것이 중요합니다.

# 성능 최적화

시각적으로 멋진 씬을 만드는 것은 흥미진진하지만, 다양한 기기에서 원활하게 실행되도록 보장하는 것은 성능 최적화에 주의를 기울여야 합니다. Babylon.js는 LOD(레벨 오브 디테일), 메시 인스턴싱 및 텍스처 압축과 같은 여러 도구와 기술을 제공하여 씬을 최적화하는 데 도움을 줍니다. 이러한 도구를 효과적으로 활용하는 방법을 배우면 아름답고 성능이 우수한 복잡한 씬을 만들 수 있게 됩니다.

<div class="content-ad"></div>

# 디버깅 및 도구

Babylon.js는 프로젝트를 해결하고 세부 조정하는 데 도움이 되는 강력한 디버깅 및 진단 도구 세트를 갖추고 있습니다. 예를 들어 Babylon.js Inspector는 실시간으로 장면의 속성을 검사하고 수정하는 데 유용한 도구입니다. 이러한 도구에 익숙해지면 개발 프로세스를 크게 가속화하고 프로젝트의 품질을 향상시킬 수 있습니다.

# 마치며

공식 Babylon.js 문서는 이러한 고급 기능 및 그 이상을 탐색하기에 훌륭한 자원입니다. 튜토리얼, API 참조 및 엔진의 모든 측면을 다루는 예제가 정기적으로 업데이트됩니다. 또한 Babylon.js 커뮤니티는 다른 개발자들로부터 배우고 프로젝트를 공유하며 질문하는 데 도움이 되는 활발하고 지원적인 공간입니다.

<div class="content-ad"></div>

새로운 기능을 탐험하며 기술을 키워 나가는 동안, 연습과 실험은 중요하답니다. 프로젝트에 새로운 요소를 통합해 보거나, 더 복잡한 씬에 도전해 보며, Babylon.js로 만들어낼 수 있는 가능성을 넓혀보세요.

이번 빠른 코스에 참여해 주셔서 감사합니다. Babylon.js를 활용한 3D 웹 개발 세계로의 여정이 시작이니, 상상이 가능한 한계 없는 가능성을 느껴보시기 바랍니다.