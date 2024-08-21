---
title: "바닐라 JS로 만들어진 웹캠 인피니티 미러"
description: ""
coverImage: "/assets/img/2024-05-27-MirrorMirrorAWebcamInfinityMirrorwithVanillaJS_0.png"
date: 2024-05-27 19:14
ogImage:
  url: /assets/img/2024-05-27-MirrorMirrorAWebcamInfinityMirrorwithVanillaJS_0.png
tag: Tech
originalTitle: "MirrorMirror — A Webcam Infinity Mirror with Vanilla JS"
link: "https://medium.com/gitconnected/mirrormirror-a-webcam-infinity-mirror-with-vanilla-js-82eb4bbc7a40"
isUpdated: true
---

<img src="/assets/img/2024-05-27-MirrorMirrorAWebcamInfinityMirrorwithVanillaJS_0.png" />

# 소개

프로그래머로서, 종종 기술 스택 레이어, 복잡한 구조 및 다양한 통합이 포함된 대규모 프로젝트에 참여합니다. 때로는 기본으로 돌아가 간단한 것을 만드는 것도 재미있죠.

이 프로젝트에서는 HTML 및 JavaScript만 사용하여 브라우저 기반 웹 애플리케이션을 만들어 실시간 인피니티 미러를 생성하고 이미지 뒤집기/회전/저장 버튼을 추가합니다.

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

지금까지 데스크톱, iOS 및 안드로이드 브라우저에서 작동하는 것으로 확인했습니다.

## 컨셉

아이디어는 간단합니다: 웹캠 피드를 사용하여 브라우저에서 직접 시각적으로 매력적인 효과를 만드는 것입니다. 프로젝트는 비디오 피드를 수평으로 뒤집는, 회전하는, "무한 거울" 효과를 적용하는 및 현재 뷰를 이미지 파일로 저장하는 기능을 구현하는 것을 목표로 했습니다. 이는 HTML5 비디오 요소와 캔버스 API의 응용을 현실세계 시나리오에서 탐색하는 간단한 방법을 제공합니다.

## 도구 및 기술

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

- HTML5: 비디오 표시 및 제어 요소를 구성하는 데 사용됩니다.
- CSS3: 웹 페이지를 스타일링하여 요소가 시각적으로 매력적이고 기능적으로 배치되도록 합니다.
- JavaScript: 상호작용의 핵심으로 웹캠 액세스를 처리하고 실시간으로 비디오 피드를 조작합니다.
- Bootstrap: 빠르고 반응형 버튼 스타일링을 위해 Bootstrap을 조금 사용합니다.
- WebRTC(웹 실시간 통신): 이 기술은 사용자 카메라에서 비디오를 직접 캡처하고 스트리밍하는 수단을 제공합니다.

## 레이아웃 설정

HTML 페이지는 비디오 요소와 캔버스를 호스팅하도록 설정되었습니다. 비디오 요소는 웹캠 피드를 캡처하고, 캔버스는 다양한 그래픽 변환을 적용하는 데 사용됩니다.

```js
<div class="title">Mirror Mirror</div>
<div class="btn-group" role="group">
    <button id="btnToggle" class="btn btn-success">켜기</button>
    <button id="btnEffect" class="btn btn-warning">무한 효과</button>
    <button id="btnEdge" class="btn btn-dark">가장자리 감지</button>
    <button id="btnFlip" class="btn btn-primary">수평 뒤집기</button>
    <button id="btnRotate" class="btn btn-secondary">회전</button>
    <button id="btnSave" class="btn btn-info">사진 저장</button>
</div>
</div>
<div id="canvas-container">
    <canvas id="canvas"></canvas>
</div>
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

## 자바스크립트에서 제어 버튼 설정하기

사용자 클릭을 감지하고 기능을 선택하려면 각 버튼에 대한 클릭 핸들러를 추가합니다. 이 버튼들은 비디오 피드를 켜고 끄거나, 무한 거울 또는 가장자리 감지와 같은 특수 효과를 적용하고, 이를 모바일 기기나 태블릿에서 사용하는 경우 뒤집거나 회전할 수 있습니다.

만약 비디오 피드가 일시 중지된 경우 이미지는 마지막 이미지를 유지합니다. 언제든지 save 버튼을 사용하여 장치의 로컬 파일 시스템에 마지막 사진을 저장할 수 있습니다.

```js
 document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  let videoStream = null;
  let video = document.createElement('video');
  let flipHorizontal = false;
  let infinityEffect = false;
  let rotationAngle = 0;
  let edgeDetectionEnabled = false;

  const btnToggle = document.getElementById('btnToggle');
  const btnFlip = document.getElementById('btnFlip');
  const btnEffect = document.getElementById('btnEffect');
  const btnRotate = document.getElementById('btnRotate');
  const btnSave = document.getElementById('btnSave');

  document.getElementById('btnEdge').addEventListener('click', function () {
      edgeDetectionEnabled = !edgeDetectionEnabled;
  });

  btnToggle.addEventListener('click', function () {
      if (videoStream) {
          videoStream.getTracks().forEach(track => track.stop());
          videoStream = null;
          btnToggle.textContent = 'Turn On';
          btnToggle.classList.replace('btn-danger', 'btn-success');
      } else {
          navigator.mediaDevices.getUserMedia({ video: true })
              .then(stream => {
                  videoStream = stream;
                  video.srcObject = stream;
                  video.play();
                  btnToggle.textContent = 'Turn Off';
                  btnToggle.classList.replace('btn-success', 'btn-danger');
                  draw();
              })
              .catch(error => {
                  console.error('Error accessing the camera: ', error);
              });
      }
  });

  btnFlip.addEventListener('click', function () {
      flipHorizontal = !flipHorizontal;
  });

  btnEffect.addEventListener('click', function () {
      infinityEffect = !infinityEffect;
  });

  btnRotate.addEventListener('click', function () {
      rotationAngle = (rotationAngle + 90) % 360;
      canvas.style.transform = `rotate(${rotationAngle}deg)`;
  });

  btnSave.addEventListener('click', function () {
      if (canvas) {
          const link = document.createElement('a');
          link.download = 'infinity-mirror.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
      }
  });
```

**이 상태유지 메시지가 도움이 돼셨나요?**

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

## 카메라 접근하기

`navigator.mediaDevices.getUserMedia` API를 사용하여 웹캠 피드를 설정했어요. 이 API는 간단해서 미디어 입력을 사용할 수 있는 방법을 제공해요. 카메라를 사용할 권한을 요청하는 대화 상자가 나타날 거예요.

```js
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();
  })
  .catch((error) => {
    console.error("카메라에 접근하는 중 오류 발생: ", error);
  });
```

## 미러 효과를 위한 비디오 피드 조작

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

비디오 피드를 다루는 것이 더 재미있어질 때입니다. 저는 비디오를 수평으로 뒤집거나 회전하거나 무한 거울 효과를 적용하는 함수를 작성했습니다. 이 효과는 비디오 피드의 여러 배율 및 반투명 복사본을 생성하여 거울 효과를 만듭니다. scaleFactor 및 alphaFactor 변수로 거울 이미지의 인스턴스 수나 안쪽 여백을 변경할 수 있습니다. 제 데스크탑에서 실행 속도가 얼마나 빠른지 고려할 때, 나중에 업데이트에서 해당 슬라이더를 추가할 수도 있겠죠. 이에 관심이 있다면 GitHub 레포지토리에 이슈를 남겨주세요.

```js
function applyInfinityEffect(context, width, height) {
  const numberOfReflections = 5;
  let scaleFactor = 0.5;
  let alphaFactor = 0.9;

  for (let i = 0; i < numberOfReflections; i++) {
    context.globalAlpha = Math.pow(alphaFactor, i + 1);
    const newWidth = width * Math.pow(scaleFactor, i + 1);
    const newHeight = height * Math.pow(scaleFactor, i + 1);
    const dx = (width - newWidth) / 2;
    const dy = (height - newHeight) / 2;

    context.drawImage(canvas, 0, 0, width, height, dx, dy, newWidth, newHeight);
  }

  context.globalAlpha = 1.0;
}
```

## 소벨 필터를 사용한 에지 검출

이미지 처리에 익숙한 사람을 위해 비디오의 각 프레임을 가져와 "에지" 또는 각 객체의 경계를 탐지하는 필터를 실행할 수 있습니다. 이 작업은 각 프레임에 2D 그라디언트를 적용하는 소벨 연산자를 사용하여 수행됩니다. 우리는 이를 보여주기 위해 회색조로 변환합니다. 소벨 연산자에 대한 추가 배경 정보는 여기서 볼 수 있습니다. 코드를 수정하고 다른 이미지 처리 작업을 추가할 수도 있습니다. 추가할 수 있는 많은 고전적인 신호 처리 필터가 있지만 UI 컨트롤의 수가 상당히 늘어날 것입니다.

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
function applyEdgeDetection(context, width, height) {
  const imageData = context.getImageData(0, 0, width, height);
  const grayScaled = grayscale(imageData.data, width, height);
  const edgeData = sobelFilter(grayScaled, width, height);
  context.putImageData(new ImageData(edgeData, width, height), 0, 0);
}

function grayscale(data, width, height) {
  const result = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    const avg = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    result[i] = avg; // red
    result[i + 1] = avg; // green
    result[i + 2] = avg; // blue
    result[i + 3] = 255; // alpha
  }
  return result;
}

function sobelFilter(data, width, height) {
  const kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ];
  const kernelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ];

  const sobelData = new Uint8ClampedArray(width * height * 4); // Correctly sized array

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let px = (y * width + x) * 4;
      let gx = 0;
      let gy = 0;

      for (let cy = -1; cy <= 1; cy++) {
        for (let cx = -1; cx <= 1; cx++) {
          const cpx = ((y + cy) * width + (x + cx)) * 4;
          gx += data[cpx] * kernelX[cy + 1][cx + 1];
          gy += data[cpx] * kernelY[cy + 1][cx + 1];
        }
      }

      const magnitude = Math.sqrt(gx * gx + gy * gy);
      sobelData[px] = sobelData[px + 1] = sobelData[px + 2] = magnitude;
      sobelData[px + 3] = 255; // alpha
    }
  }
  return sobelData;
}
```

## Canny Filter를 사용한 Edge Detection

Sobel은 그 연산 부하가 비교적 적은 편이기 때문에 인기 있는 선택지입니다. Canny Filter 또한 엣지 검출을 제공하지만 이미지를 그라디언트를 취하기 전에 블러처리하여 연산량이 많이 필요합니다. 이로 인해 라인 드로잉 형식의 효과를 더 많이 만들어 냅니다. Canny Filter에 대해 더 알고 싶다면 여기를 참고하세요. Canny Filter (및 해당 파생)는 콘크리트 입자나 작은 직물 패턴과 같은 '질감있는' 가장자리보다는 덜 민감합니다.

코드에서 Canny 필터를 활성화하는 방법은 아래에 나와 있습니다.

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
function applyCannyEdgeDetection(context, width, height) {
  const imageData = context.getImageData(0, 0, width, height);
  const grayScaled = grayscale(imageData.data, width, height);
  const blurred = gaussianBlur(grayScaled, width, height);
  const edgeData = cannyFilter(blurred, width, height);
  context.putImageData(new ImageData(edgeData, width, height), 0, 0);
}

function grayscale(data, width, height) {
  const result = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    const avg = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    result[i] = avg; // red
    result[i + 1] = avg; // green
    result[i + 2] = avg; // blue
    result[i + 3] = 255; // alpha
  }
  return result;
}

function gaussianBlur(data, width, height) {
  const kernel = [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1],
  ];
  const kernelWeight = 16;
  const blurredData = new Uint8ClampedArray(width * height * 4);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sum = 0;
      let sumAlpha = 0;

      for (let cy = -1; cy <= 1; cy++) {
        for (let cx = -1; cx <= 1; cx++) {
          const pixel = ((y + cy) * width + (x + cx)) * 4;
          const weight = kernel[cy + 1][cx + 1];
          sum += data[pixel] * weight;
          sumAlpha += data[pixel + 3];
        }
      }

      const pixelIndex = (y * width + x) * 4;
      blurredData[pixelIndex] = sum / kernelWeight;
      blurredData[pixelIndex + 1] = sum / kernelWeight;
      blurredData[pixelIndex + 2] = sum / kernelWeight;
      blurredData[pixelIndex + 3] = sumAlpha / kernelWeight;
    }
  }
  return blurredData;
}

function cannyFilter(data, width, height) {
  // Simplified Canny edge detection
  const sobelData = sobelFilter(data, width, height);
  const result = new Uint8ClampedArray(width * height * 4);

  for (let i = 0; i < sobelData.length; i += 4) {
    const magnitude = sobelData[i];
    if (magnitude > 50) {
      result[i] = result[i + 1] = result[i + 2] = 255; // white
      result[i + 3] = 255; // alpha
    } else {
      result[i] = result[i + 1] = result[i + 2] = 0; // black
      result[i + 3] = 255; // alpha
    }
  }

  return result;
}
```

## 결론

이 프로젝트는 간단한 웹 기술을 사용하여 얼마나 많은 작업을 수행할 수 있는지를 상기시켜주는 것이었습니다. HTML5, JavaScript 및 최신 웹 기술을 사용하면 비디오 스트림을 실시간으로 프레임별로 처리할 수 있습니다.

이를 통해 재미있는 경험을 할 수 있기를 바라며, 웹 기술 선택에 대한 의견을 주시면 감사하겠습니다.
