---
title: "Agora 라이브 비디오 스트림에 실시간 3D 아바타 추가하기"
description: ""
coverImage: "/assets/img/2024-06-20-AddRealtime3DAvatarstoAgoraLiveVideoStreams_0.png"
date: 2024-06-20 04:18
ogImage:
  url: /assets/img/2024-06-20-AddRealtime3DAvatarstoAgoraLiveVideoStreams_0.png
tag: Tech
originalTitle: "Add Realtime 3D Avatars to Agora Live Video Streams"
link: "https://medium.com/agora-io/add-realtime-3d-avatars-to-live-video-streams-61dd5d122cd6"
isUpdated: true
---

현재 급속히 변화하는 디지털 환경에서 라이브 스트림 비디오가 주도를 차지하고 있어요. 사용자들은 이제 더 몰입적이고 맞춤형 스트리밍 옵션을 기대하고 있어요. 콘텐츠 크리에이터들은 점점 더 창의적인 방법으로 스트리밍을 하기 위해 노력하고 있어요. 이로 인해 자신의 움직임과 표현을 반영하는 동적 3D 아바타에 대한 수요가 늘어나고 있어요.

![image](https://miro.medium.com/v2/resize:fit:1400/1*dbCqUb7N3awHxQP4xj3ZXA.gif)

실시간 가상 아바타는 전통적으로 복잡한 모션 캡처 장비와 정교한 소프트웨어가 필요했기 때문에 보통 일반 사용자나 독립적인 크리에이터들에게는 접근하기 어려웠어요. 그러나 이 역시 인공지능이 상황을 바꾸는 분야 중 하나에요. 컴퓨터 비전의 발전으로 장치에서 정교한 AI 알고리즘을 실행해서 인간의 얼굴 제스처를 실시간으로 정확하게 캡처하고 디지털 형태로 번역할 수 있게 된 거예요.

이 가이드에서는 MediaPipe와 ReadyPlayerMe의 3D 아바타를 사용해 Agora 라이브 스트림에 3D 가상 아바타를 통합하는 방법을 살펴볼 거예요. 관객 참여도를 높이거나 앱의 비디오 통화/라이브 방송에 창의적 요소를 추가하는 것이 목표라면, 이 안내서는 3D 가상 페르소나를 구현하는 데 필요한 단계를 제공할 거예요.

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

# 전제 조건

- Node.JS
- Agora 개발자 계정
- HTML/CSS/JS의 기본 지식
- ThreeJS의 기본 이해
- Agora - Web QuickStart의 기본 이해
- 코드 편집기 (저는 VSCode를 사용합니다)
- ReadyPlayerMe에서 3D 아바타

# Agora + MediaPipe 프로젝트

이 안내서를 간결하게 유지하기 위해 Agora Video SDK를 웹 앱에 구현하는 방법을 이해한다고 가정합니다. 알지 못한다면, 'Building a Group Video Chat Web App' 안내서를 확인해보세요.

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

시작하려면 데모 프로젝트를 다운로드하세요. 코드를 다운로드한 후 터미널에서 프로젝트 폴더로 이동하여 npm을 사용하여 노드 패키지를 설치하십시오.

```js
git clone git@github.com:digitallysavvy/agora-mediapipe-readyplayerme.git
cd agora-mediapipe-readyplayerme
npm i
```

# 핵심 구조 (HTML)

index.html의 HTML 구조에서 시작해보겠습니다. 본문에서 "call" UI 요소가 있는 맨 위에, 원격 비디오를 담을 컨테이너, 로컬 사용자를 담을 컨테이너(음소거 및 음소거 해제를 위한 버튼 포함), 채팅에서 떠나기 위한 버튼이 포함되어 있습니다.

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

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/agora-box-logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <title>Agora Live Video Demo</title>
  </head>
  <body>
    <div id="container"></div>
    <div id="local-user-container"></div>
    <div id="local-media-controls">
      <button id="mic-toggle" class="media-active">Mic</button>
      <button id="video-toggle" class="media-active">Video</button>
      <button id="leave-channel" class="media-active">Leave</button>
    </div>
    <div id="overlay" class="modal">
      <div id="form-container">
        <h1 id="form-header">Avatar Video Chat</h1>
        <form id="join-channel-form">
          <div id="form-body">
            <div class="form-group">
              <label for="form-rpm-url">Ready Player Me URL</label>
              <input type="text" id="form-rpm-url" placeholder="http://models.readyplayer.me/<MODEL-ID>.glb" class="form-control">
            </div>
            <div id="form-footer">
              <button type="submit" id="join-channel-btn">Join Channel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <script type="module" src="/main.js"></script>
  </body>
</html>

투사 UI 외에도 사용자가 아바타 URL을 입력할 수 있는 오버레이 화면과 채널에 참여하는 버튼이 필요합니다.

# Agora Client 및 데이터 저장소

main.js에 우리는 Agora 클라이언트를 생성하여 Agora의 SDK를 사용하고 로컬 미디어를 사용하여 오디오, 비디오 및 캔버스 트랙과 활성 상태에 대한 참조를 유지합니다. MediPipe의 컴퓨터 비전에서 얻은 데이터를 저장하기 위해 headRotation과 blendShapes가 필요합니다.

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
// Agora 클라이언트 생성
const client = AgoraRTC.createClient({
  codec: "vp9",
  mode: "live",
  role: "host",
});

const localMedia = {
  audio: {
    track: null,
    isActive: false,
  },
  video: {
    track: null,
    isActive: false,
  },
  canvas: {
    track: null,
    isActive: false,
  },
};

// 원격 스트림을 저장할 컨테이너
let remoteUsers = {};

// 얼굴 특징점 데이터 저장
let headRotation;
let blendShapes;
```

# DOMContentLoaded 및 이벤트 리스너

페이지가 로드될 때, Agora 이벤트, 미디어 컨트롤, 그리고 폼 제출을 위한 리스너를 추가합니다. 리스너가 준비되면, 오버레이 폼을 보여줄 준비가 되었습니다.

```js
// DOM이 로드될 때까지 기다립니다
document.addEventListener("DOMContentLoaded", async () => {
  // Agora 이벤트 리스너 추가
  addAgoraEventListeners();
  // 로컬 미디어 버튼에 대한 리스너 추가
  addLocalMediaControlListeners();
  // 채널 참여 폼 가져오기 & 폼 제출 처리
  const joinform = document.getElementById("join-channel-form");
  joinform.addEventListener("submit", handleJoin);
  // 오버레이 폼 보이기
  showOverlayForm(true);
});
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

# 3D & 아바타 설정

이 가이드의 선행 요건 중 하나는 ReadyPlayerMe의 3D 아바타입니다. ReadyPlayerMe는 Apple의 ARKit ARFaceAnchor 위치에 대한 이름 규칙을 준수하는 3D 파일을 제공합니다. 이러한 정의는 산업 표준이며 MediaPipe의 출력과 일치합니다.

코드로 돌아와서, 사용자가 "참가" 버튼을 클릭하면 ThreeJS 씬을 초기화하고 `canvas`를 localUserContainer에 추가합니다.

```js
// 로컬 사용자 컨테이너 div 가져오기
const localUserContainer = document.getElementById("local-user-container");

// 씬을 만들고 canvas를 localUserContainer에 추가
const { scene, camera, renderer } = await initScene(localUserContainer);
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

새로 생성된 씬을 사용하여 glbURL을 통해 사용자의 ReadyPlayerMe 아바타를 로드하세요. glbURL에는 URL 매개변수가 추가됩니다. 이는 blend shapes가 ReadyPlayerMe에서 제공하는 기본 .glb 파일의 일부가 아니기 때문입니다. 이러한 매개변수는 ReadyPlayerMe RESTful API의 일부이며, 아바타용입니다.

3D 아바타를 로드한 후, 해당 씬 그래프를 탐색하고 모든 노드를 사용하여 빠르게 headMesh에 액세스할 수 있는 객체를 생성합니다.

```js
// glb url에 url 매개변수 추가 - morphTargets를 사용하여 ReadyPlayerMe 아바타 로드
const rpmMorphTargetsURL = glbURL + "?morphTargets=ARKit&textureAtlas=1024";
let nodes;
// morph targets가 포함된 GLB 로드
const loader = new GLTFLoader();
loader.load(
  rpmMorphTargetsURL,
  async (gltf) => {
    const avatar = gltf.scene;
    // 아바타 노드 그래프 작성
    nodes = await getGraph(avatar);
    const headMesh = nodes["Wolf3D_Avatar"];
    // 위치 조정
    avatar.position.y = -1.65;
    avatar.position.z = 1;

    // 씬에 아바타 추가
    scene.add(avatar);
  },
  (event) => {
    // 로딩 세부 정보 출력
    console.log(event);
  }
);
```

씬이 초기화되는 시점과 3D 아바타가 로드되는 시점 간의 지연 시간을 고려하기 위해, 3D 아바타가 씬에 추가되기 전에 모델이 로드 중임을 사용자에게 알리기 위해 로딩 애니메이션을 표시하는 것이 좋은 실천법입니다.

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
// 로딩 애니메이션 표시
const loadingDiv = document.createElement("div");
loadingDiv.classList.add("lds-ripple");
loadingDiv.append(document.createElement("div"));
localUserContainer.append(loadingDiv);

/* loader.load - 성공 시 콜백 */
loadingDiv.remove(); // 로딩 스피너 삭제
```

# Agora로 비디오 엘리먼트 초기화

<img src="/assets/img/2024-06-20-AddRealtime3DAvatarstoAgoraLiveVideoStreams_0.png" />

카메라 액세스를 받고 비디오 및 오디오 트랙을 만드는 데 Agora를 사용합니다. 비디오 엘리먼트의 소스로 카메라의 비디오 트랙을 사용할 것입니다. 더 자세한 설명이 필요하면 Agora를 사용하여 사용자 정의 비디오 엘리먼트를 사용하는 방법에 대한 내 안내서를 확인해주세요.

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
// 로컬 마이크와 카메라 초기화
await initDevices("music_standard", "1080_3");
// 비디오 요소 생성
const video = document.createElement("video");
video.setAttribute("webkit-playsinline", "webkit-playsinline");
video.setAttribute("playsinline", "playsinline");
// 카메라 트랙을 사용하여 새 MediaStream 생성하고 비디오의 소스로 설정
video.srcObject = new MediaStream([localMedia.video.track.getMediaStreamTrack()]);
```

# 미디어파이프 설정

얼굴과 제스처를 인식하기 전에, 미디어파이프의 컴퓨터 비전 기술을 위한 최신 웹어셈블리(WASM) 파일을 먼저 다운로드해야 합니다. 이 파일들은 FaceLandmarker 작업을 설정하는 데 필수적입니다. FaceLandmarker는 비디오 스트림에서 사용자 얼굴의 특정 "관심 지점"을 식별하는 컴퓨터 비전 알고리즘입니다. 이 정밀도는 인공지능이 얼굴 특징을 효과적으로 추적할 수 있게 합니다.

컴퓨터 비전에서 작업을 실행하는 것은 AI에 요청을 보내고, AI가 자신감 수준인 예측을 반환하는 것을 의미합니다. 우리는 각 비디오 프레임에 대해 이 작업을 계속 반복적으로 실행할 것이며, 이를 predictionLoop이라고 이름 붙였습니다.

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

얼굴 랜드마크 구성에서는 FaceLandmarker를 설정하여 두 가지 중요한 데이터 유형을 생성합니다: outputFacialTransformationMatrixes와 outputFaceBlendshapes: true. outputFacialTransformationMatrixes는 얼굴 위치, 회전 및 크기의 추정을 제공하여 머리 움직임을 추적하는 데 필수적입니다. 반면 outputFaceBlendshapes는 즉시 명확하지 않을 수 있습니다. 이는 블렌드 모양 또는 모양 키프라는 3D 모델링 기술을 포함합니다. 이를 통해 3D 메시가 "닫힘" (0으로 표시)에서 "열림" (1로 표시)으로 부드럽게 전환할 수 있습니다. 이 방법은 모든 가능한 얼굴 움직임을 모델링하는 것을 피할 수 있어 효율적입니다. 대신 렌더링 엔진이 이러한 상태를 보간합니다.

이러한 설정은 머리 회전 및 위치를 모니터링하기 위해 변환 행렬을 사용하고, 블렌드 모양 예측은 ARKit 표준 블렌드 모양에 대해 0에서 1 범위를 제공하여 52가지 다른 얼굴 움직임을 다룹니다.

```js
// 미디어파이프 비전 작업 초기화
const faceLandmarker = await initVision();

// 미디어파이프 비전 초기화
const initVision = async () => {
  // 최신 비전 WASM 파일 로드
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  // 얼굴 랜드마크 트래커 구성
  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
    },
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true,
    runningMode: "VIDEO",
  });
  return faceLandmarker;
};
```

# 컴퓨터 비전 예측 루프

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

faceLandmarker와 `video/`을 설정하고 나면, 우리는 모든 비디오 프레임에 MediaPipe의 컴퓨터 비전 작업을 실행하는 예측 루프를 시작할 수 있습니다. 예측 결과를 반환하면 facialTransformationMatrixes에 접근할 수 있어 headRotation을 계산할 수 있게 됩니다. 또한, 예측 결과는 얼굴 메시의 블렌드 형태에 대한 추정 가중치를 제공합니다.

```js
video.addEventListener("loadeddata", () => {
  video.play(); // 비디오 재생 시작
  initPredictLoop(faceLandmarker, video); // 얼굴 랜드마킹 예측 루프 시작
});

const initPredictLoop = (faceLandmarker, video) => {
  // 스트림 재생 시간을 추적하는 플래그
  let lastVideoTime = -1;
  // 예측 루프
  const predict = () => {
    // 타임스탬프 생성
    const timeInMs = Date.now();
    // 비디오 재생 중일 때
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      // 비디오 프레임에서 얼굴을 감지하는 비전 작업 실행
      const result = faceLandmarker.detectForVideo(video, timeInMs);
      // 얼굴 1에 대한 얼굴 매트릭스 변환 정보 가져오기
      const faceMatrix = result.facialTransformationMatrixes;
      if (faceMatrix && faceMatrix.length > 0) {
        const matrix = new THREE.Matrix4().fromArray(faceMatrix[0].data);
        headRotation = new THREE.Euler().setFromRotationMatrix(matrix);
      }
      // 얼굴 1에 대한 블렌드 형태 예측 가져오기
      const blendShapePredictions = result.faceBlendshapes;
      if (blendShapePredictions && blendShapePredictions.length > 0) {
        blendShapes = blendShapePredictions[0].categories;
      }
    }
    // 모든 프레임 업데이트에서 예측하기
    requestAnimationFrame(predict);
  };
  // 루프 시작
  requestAnimationFrame(predict);
};
```

# 컴퓨터 비전 + 3D 아바타

ThreeJS 씬을 렌더링하려면 렌더 루프를 사용합니다. 렌더 루프를 초기화할 때, 예측 루프의 결과를 사용하여 머리 회전과 블렌드 형태 강도를 업데이트하는 함수를 전달할 것입니다.

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
// 렌더 루프 만들기
const initRenderLoop = (scene, camera, renderer, sceneUpdates) => {
  const render = (time) => {
    // 씬 업데이트하기
    sceneUpdates(time);
    // 카메라를 사용하여 씬 렌더링
    renderer.render(scene, camera);
    // 렌더를 호출 스택에 추가
    requestAnimationFrame(render);
  };
  // 렌더 루프 시작
  requestAnimationFrame(render);
};

initRenderLoop(scene, camera, renderer, (time) => {
  // 노드 또는 헤드 회전이 null이면 빨리 반환하기
  if (!nodes || !headRotation) return;
  // 헤드, 목, 어깨 본에 회전 데이터 적용하기
  nodes.Head.rotation.set(headRotation.x, headRotation.y, headRotation.z);
  nodes.Neck.rotation.set(headRotation.x / 2, headRotation.y / 2, headRotation.z / 2);
  nodes.Spine1.rotation.set(headRotation.x / 3, headRotation.y / 3, headRotation.z / 3);
  // 블렌드 쉐이프 반복하기
  blendShapes.forEach((blendShape) => {
    const headMesh = nodes.Wolf3D_Avatar;
    const blendShapeIndex = headMesh.morphTargetDictionary[blendShape.categoryName];
    if (blendShapeIndex >= 0) {
      headMesh.morphTargetInfluences[blendShapeIndex] = blendShape.score;
    }
  });
});
```

기본적으로 입 움직임이 표정을 과장할 때만 보입니다. 말할 때 사람 얼굴이 일반적으로 움직이는 방식은 아닙니다. 이를 보상하기 위해 블렌드 쉐이프 점수를 과장하여 아바타의 입이 더 반응적으로 보이도록 할 수 있습니다.

타겟으로 정할 모든 블렌드 쉐이프를 나열하고 기본 점수에 대한 배수를 설정합시다. 입이 움직이지 말아야 할 때나 과장해서 나타내지 않도록, 상한선과 하한선을 설정해보겠습니다.

```js
// 입 블렌드 쉐이프
const mouthBlendShapes = [
  "mouthSmile_L",
  "mouthSmile_R",
  "mouthFrown_L",
  "mouthFrown_R",
  "mouthOpen",
  "mouthPucker",
  "mouthWide",
  "mouthShrugUpper",
  "mouthShrugLower",
];
// 입 움직임 강조를 위한 배수
const exagerationMultiplier = 1.5;
const threshold = { min: 0.25, max: 0.6 };
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

멀티플라이어를 적용하려면 mouthBlendShapes 목록에서 특정 키를 확인해야 합니다. 이 작업은 점수를 적용하는 루프 내에서 처리할 수 있습니다. mouth 블렌드 모양을 식별할 때 동시에 그것들이 임계값 내에 있는지도 확인할 것입니다.

```js
// 블렌드 모양 반복
blendShapes.forEach((blendShape) => {
  const headMesh = nodes.Wolf3D_Avatar;
  const blendShapeIndex = headMesh.morphTargetDictionary[blendShape.categoryName];
  if (blendShapeIndex >= 0) {
    // mouth 블렌드 모양에 대한 점수를 과장
    if (
      mouthBlendShapes.includes[blendShape.categoryName] &&
      blendShape.score > threshold.min &&
      blendShape.score < threshold.max
    ) {
      blendShape.score *= exagerationMultiplier;
    }
    headMesh.morphTargetInfluences[blendShapeIndex] = blendShape.score;
  }
});
```

# ThreeJS에서 Agora 비디오 스트림으로

![이미지](/assets/img/2024-06-20-AddRealtime3DAvatarstoAgoraLiveVideoStreams_1.png)

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

렌더 루프는 3D 씬을 캔버스에 렌더링합니다. `canvas`에서 Agora로 씬을 전송하려면 captureStream을 생성하고 비디오 트랙을 사용하여 사용자 지정 비디오 트랙을 초기화하십시오.

더 자세한 설명이 필요하시다면 캔버스 엘리먼트를 사용하여 Agora 비디오 트랙을 생성하는 방법을 안내하는 내 안내서를 확인해보세요.

```js
// 캔버스 가져오기
const canvas = renderer.domElement;
// 프레임 속도 설정
const fps = 30;
// captureStream 생성
const canvasStream = canvas.captureStream(fps);
// 캔버스 스트림으로부터 비디오 트랙 가져오기
const canvasVideoTrack = canvasStream.getVideoTracks()[0];
// canvasVideoTrack을 사용하여 사용자 지정 Agora 비디오 트랙 생성
const customAgoraVideoTrack = AgoraRTC.createCustomVideoTrack({
  mediaStreamTrack: canvasVideoTrack,
  frameRate: fps,
});
localMedia.canvas.track = customAgoraVideoTrack;
localMedia.canvas.isActive = true;
// 캔버스 트랙을 채널에 게시
await client.publish([localMedia.audio.track, localMedia.canvas.track]);
```

로컬 클라이언트가 채널에 참여하면, 이전에 설정한 이벤트 리스너가 동작합니다. 사용자가 채널에 참여할 때마다 그들의 비디오 스트림이 #container에 표시됩니다.

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

# 테스트

Vite를 사용하고 있으므로 로컬에서 테스트하기 쉽습니다. 터미널에서 프로젝트 폴더로 이동하고 npm을 사용하여 코드를 실행하세요.

```js
npm run dev
```

로컬 서버가 실행되면 코드를 테스트할 시간입니다. ReadyPlayer.Me로 이동하여 아바타의 URL을 복사하세요. URL을 양식에 붙여넣고 "가입"을 클릭하세요.

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

채널에서 여러 사용자를 시뮬레이션하려면 첫 번째 탭에서 URL을 복사한 다음 다른 브라우저 창을 열고 URL을 붙여넣으세요. URL을 복사하는 것은 동일한 채널에 참여할 수 있도록 돕습니다. 두 창을 사용하면 각 캔버스가 보이게 됩니다. 이는 브라우저가 웹사이트의 탭이 초점을 잃으면 AnimationFrame 요청을 일시 중지하기 때문에 중요합니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*TVz9rtnQHNU4yDco9nH6BQ.gif)

여러 기기로 테스트하려면 프로젝트를 안전한 https 연결로 실행해야 합니다. 이를 설정하려면 두 가지 옵션이 있습니다: 로컬 장치에 사용자 정의 SSL 인증서를 구성하거나 ngrok와 같은 서비스를 사용하여 로컬 기기에서 나가는 터널을 생성하고 https URL을 제공합니다.

# 끝.

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

여기에 Agora의 Video SDK를 사용하여 MediaPipe의 컴퓨터 비전을 활용하여 사용자 정의 3D 아바타를 만드는 방법이 있습니다. 웨비나, 대화형 교육 플랫폼 또는 라이브 비디오가 핵심 역할을 하는 다른 어플리케이션을 위해 이 예시는 훌륭한 기반입니다. 이 코드를 조정하고 사용하여 현실을 확장하는 더 복잡한 AI 기반 기능을 만들어 보세요.

이 안내서는 Agora의 Raw Video와 Custom Video와 같은 두 가지 고급 비디오 주제를 다룹니다. Agora Video for Web 문서에서 고급 비디오 주제를 더 깊이 파고들어 보세요.
