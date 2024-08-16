---
title: "자체제작 스파이 군사 작전에서 YOLOv8 객체 검출 활용하기"
description: ""
coverImage: "/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_0.png"
date: 2024-05-15 04:57
ogImage: 
  url: /assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_0.png
tag: Tech
originalTitle: "DIY for a Spy: Utilizing YOLOv8 Object Detection in Military Operations"
link: "https://medium.com/ai-advances/diy-for-a-spy-utilizing-yolov8-object-detection-in-military-operations-053d787b6f62"
isUpdated: true
---




적군 항공기를 계산하기 위해 YOLOv8 Object Detection과 정찰 드론에서 촬영한 항공 영상을 활용하여 군사 작전을 계획하기 위해서 지리공간 정보를 활용하세요.

![image](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_0.png)

몇몇 분들께서는 이전에 작성한 제 글 중 하나인 "마음대로 쓰는 이용사나 ‘머신’에 대해 읽으셨을 것입니다. 그 글에서는 '머신'이라고 하는 세계 감시 복합체의 다양한 구성 요소를 소개했습니다. 이 인프라는 전 세계에 배치된 다양한 수단을 포함하여 정부가 개인, 사회 행동 및 심지어 전 세계의 군사 시설을 모니터링할 수 있게 해주는 종합 감시를 가능하게합니다. 지리공간 정보(GEOINT)는 이러한 노력에서 중요한 역할을 합니다.

이 글에서는 적대적 군사 비행기 기지를 추적하는 도구로서의 지리공간 정보(GEOINT)에 대해 다뤄보겠습니다. 이러한 위치와 그들의 비행기를 효과적으로 모니터링함으로써 그들에 대한 전투 작전 계획을 철저히 준비할 수 있습니다.



## YOLOv8 Object Detection

YOLOv8는 Ultralytics에서 개발한 유명한 실시간 객체 검출 시스템으로, 광범위한 응용 분야에서 널리 사용되고 있습니다. 군사 감시 및 정찰을 포함한 다양한 분야에서 사용되며, 이미지나 비디오 프레임 내의 객체를 실시간으로 감지하기 위해 설계되었습니다. 차량, 인원 또는 장비와 같은 객체들을 신속하고 정확하게 특정하여 상황 인식 및 대상 추적에 중요한 역할을 합니다.

딥러닝과 합성곱 신경망(CNN)과 함께 PyTorch를 활용함으로써, YOLOv8은 한 장면 내에서 여러 객체를 동시에 감지하는 능력을 보여주며 높은 속도와 정확도를 달성합니다. 이것이 바로 저희 미션에서 사용하기로 결정한 이유입니다.

## Prerequisites



우선, 코드 실행을 위해 Google Compute Engine 백엔드에 Python 3을 사용하기로 결정했고, Google Colab을 사용할 것입니다. 따라서 우리는 먼저 의존성을 설치해야 합니다.

```js
!pip install ultralytics
```

이 설치 중에는 opencv-python, torch, pandas 및 이 패키지에서 사용해야 하는 기타 필수 의존성들이 설치됩니다.

```js
import cv2
import urllib.request

from ultralytics import YOLO, checks, hub
from google.colab.patches import cv2_imshow
```



위 목록에서 볼 수 있듯이, 실험 중에 사용될 모든 필요한 라이브러리를 가져옵니다. 울트랠라틱스 모듈 외에도 Google Colab에서 올바르게 작동하는 cv2의 핫픽스인 cv2_imshow도 포함됩니다. urllib.request는 공개 저장소에서 이미지 예제를 다운로드하는 데 사용됩니다.

## YOLOv8 모델

객체 감지를 위해 설계된 딥 러닝 모델 YOLOv8는 입력 이미지를 그리드로 분할하여 작동합니다. 그런 다음 각 그리드 셀 내의 객체에 대한 바운딩 박스와 클래스 확률을 예측합니다. 이 모델의 효율성은 신경망을 통한 전체 이미지의 단일 피드포워드 패스를 처리할 수 있는 능력에서 나옵니다.

일반적으로 모델을 만들려면 각 이미지에 대한 이미지와 레이블을 추가하여 데이터 세트를 올바르게 준비해야 합니다. 그러나 초기 단계 프로젝트에 필요한 대부분의 데이터 세트를 포함하는 데이터베이스가 이미 존재합니다. 오늘은 이를 실험에 활용할 것입니다. Roboflow 웹사이트로 이동해봅시다.



![DIY for a Spy: Utilizing YOLOv8 Object Detection in Military Operations - Image 1](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_1.png)

위의 그림에서 보는 것처럼 프로젝트를 위한 적합한 DataSet를 찾아야 합니다. 이 예시에서는 모델 유형으로 yolov8를 선택했고, 프로젝트 유형으로 객체 감지를 선택하고, 검색어로 공중을 입력했습니다. 시스템은 다양한 데이터 세트 목록을 제공하며, 이미지 수가 1192개이고 클래스가 1개인 것을 고려하여 우리의 요구에 더 잘 맞는 하나를 선택했습니다.

![DIY for a Spy: Utilizing YOLOv8 Object Detection in Military Operations - Image 2](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_2.png)

데이터 세트가 미션에 적합하다고 판단했다면, 적절한 내보내기 형식을 선택하여 다운로드해야 합니다. 우리의 시나리오에서는 이미 사용하기로 한 YOLOv8 형식을 선택했습니다.




아래의 표를 Markdown 형식으로 변경하세요.



위의 그림에서 볼 수 있듯이, 저는 프로젝트 이름 AER_AIR_04s, 항공 기지에서 항공기 감지하는 짧은 설명, 심지어 샘플 이미지까지 입력했습니다. 다른 프로젝트들 중에서도 이 프로젝트를 쉽게 식별할 수 있도록 도와주죠. 

다음 단계로 진행할 때는 '데이터 세트'로 이동하셔서 다음과 같이 Detect 데이터 세트 유형, 데이터 세트 이름, 그리고 설명을 선택해야 합니다.

![image](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_5.png)



'Create' 버튼을 클릭한 후 파일 업로드가 완료되면 데이터 세트 목록 중에 새로운 데이터 세트가 표시됩니다.

![image1](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_6.png)

그냥 들어가서 이미지와 라벨을 확인하고 '모델 훈련' 버튼을 눌러 YOLOv8 모델 훈련을 계속하세요.

![image2](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_7.png)



다음 창에서는 목록에서 프로젝트를 선택하고, 예제에서 나온 모델명 YOLOv8sAir을 입력하고, 속도 최적화된 YOLOv8 아키텍처 YOLOv8를 선택한 후 '계속' 버튼을 클릭해야 합니다.

![이미지](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_8.png)

Ultralytics Hub에는 모델을 훈련하는 데 사용할 수 있는 다양한 옵션이 있지만, 우리는 다음을 활용할 것입니다 - 'Google Colab'.

![이미지](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_9.png)



위의 그림과 같이 모델 훈련을 위한 인증 키와 URL(https://hub.ultralytics.com/models/BN8V8tA1pOt6thjZKq6V)이 제공됩니다.

그냥 전체 코드를 복사해서 Google Colab에 붙여넣기하세요.

```js
hub.login('[YOUR_AUTH_KEY]')

model = YOLO('https://hub.ultralytics.com/models/BN8V8tA1pOt6thjZKq6V')
results = model.train()
```

그런 다음 '런타임' 메뉴로 이동하여 '런타임 유형 변경'을 선택하고 'T4 GPU'를 선택하여 NVIDIA T4 GPU 가속기로 훈련을 가속화하세요.




![image](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_10.png)


번역:
이미지 태그를 Markdown 형식으로 변경해주세요.

작업이 완료되었으면, Google Colab 스크립트에서 일반적으로 하는 것처럼 YOLOv8 모델 훈련 프로세스를 시작할 수 있습니다.


![image](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_11.png)


해당 큰 데이터 세트에 대한 훈련 프로세스는 대략 3-4시간이 소요될 것입니다. 그러나 진행 상황은 Google Colab 목록에서만 확인하는 것이 적합하지 않을 수 있기 때문에 YOLOv8 모델 웹페이지의 특별 진행률 표시줄을 사용하여 모니터링할 수 있습니다.



<img src="/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_12.png" />

이미 이전에 말씀드렸듯이, 시간이 걸릴 수 있습니다. 완료되면 '배포' 탭으로 이동하여 최종 모델 (*.pt) 파일을 다운로드하세요. 이 모델을 활용하여 라즈베리 파이를 비롯한 모든 기기에서 YOLOv8 패키지를 사용하여 물체를 감지할 수 있습니다. 공군기지나 전술에서 또는 요청된 작전을 위해 정찰 드론에서 공중 또는 지면의 물체를 인지할 수 있습니다.

## YOLOv8 사용법

이 시점에서 이미 원하는 PyTorch (*.pt) 파일과 YOLOv8 모델의 가중치를 갖고 있는 상태입니다. 이 파일은 예시에서 21.4MB 크기입니다. 몇 줄의 코드만 추가하면 어떤 애플리케이션에서도 사용할 수 있게 됩니다.



편의를 위해 PT 파일과 실험 중에 사용할 이미지 및 비디오 소스를 지속적인 블록체인 저장소 Arweave에 업로드했습니다. 이 세 개의 파일을 다운로드하여 Google Compute Engine의 작업 디렉토리에 저장하려면 다음 코드를 작성하고 실행해야 합니다.

```js
yolov8sair_url = 'https://6bq43uyscbhniu4kvl6hayy3zosqjnl5x2v2jm7zlfse6nnqrqsa.arweave.net/8GHN0xIQTtRTiqr8cGMby6UEtX2-q6Sz-VlkTzWwjCQ'
urllib.request.urlretrieve(yolov8sair_url, 'yolov8sair.pt')

source_file = 'https://6x77tjsjpqn6ze2k7izx36xgtipzff6yi2jfnp2xxf6lvmtyy7oa.arweave.net/9f_5pkl8G-yTSvozffrmmh-Sl9hGkla_V7l8urJ4x9w'
urllib.request.urlretrieve(source_file, 'Aerial_AirBase.jpg')

source_video = 'https://3tghzdwlhmyajv5eadufzesdo7epc5queknepym6hv2p737mgvxa.arweave.net/3Mx8jss7MATXpADoXJJDd8jxdhQimkfhnj10_-_sNW4'
urllib.request.urlretrieve(source_video, 'airport_video_source.mp4')
```

세 개의 파일이 있음을 알아차릴 수 있을 것입니다: yolov8sair.pt는 모델 가중치 파일, Aerial_AirBase.jpg는 정찰 드론에서 가져온 예제 이미지로 객체 감지에 사용될 것이며, airport_video_source.mp4는 추후 객체 인식을 위해 사용할 비디오 소스의 예제입니다.

```js
model = YOLO('yolov8sair.pt')

results = model.predict('Aerial_AirBase.jpg')
annotated_frame = results[0].plot()
cv2_imshow(annotated_frame)
```



위에 표시된 이미지에서, 다양한 확률로 각각 약 84% 정도의 신뢰 수준을 나타내며, 세 대의 비행기가 감지되었습니다. 이와 같은 상황에서는 결과[] 배열의 객체 목록을 자동으로 계산하여 손쉽게 수를 세어볼 수 있습니다.

신뢰도와 확률 수준은 날씨 조건에 따라 다를 수 있습니다. 그러나 구리게 날씨 같은 명시적 단점에도 불구하고, 이 정찰 방법은 군사 작전을 계획하고 전투 활동을 지원하는 데 중요하다는 것이 증명되었습니다.



방금 보신 것처럼 몇 줄의 코드만으로 사용하기 쉬운 것이 이 기술의 장점입니다. 이를 활용하여 소형 비행 컨트롤러를 갖춘 자율 비행 드론을 포함한 다양한 애플리케이션에 적용할 수 있습니다.

이 객체 감지 메커니즘을 통합하여 만들 수 있는 스마트 애플리케이션을 상상해보세요. 비행 경로를 추적하고 목표물을 감지하여 파괴하는 자동 비행기와 같은 전투 드론을 생각해보세요. 상상력을 발휘해 보세요.

군사 솔루션에 활용할 수 있는 또 다른 좋은 예시인데요:

```js
model = YOLO('yolov8sair.pt')

# 비디오 스트림 내 객체 감지
cap = cv2.VideoCapture(f"airport_video_source.mp4")
img_array = []

while cap.isOpened():
    success, frame = cap.read()

    if success:
        results = model(frame)
        annotated_frame = results[0].plot()
        img_array.append(annotated_frame)
    else:
        break

cap.release()

# 출력 비디오 파일로 저장
size = img_array[0].shape[1], img_array[0].shape[0]  # (384, 640)
writer = cv2.VideoWriter(f"airport_video_output.mp4", cv2.VideoWriter_fourcc(*"mp4v"), 25, size)
for frame in img_array:
    img_n = cv2.resize(frame, size)
    writer.write(img_n)
writer.release()
```



이 문제는 비디오 스트림에서 Object Detection이 포함되어 있으며, 여기서는 airport_video_source.mp4 파일에서 추출됩니다. 그런 다음 비디오를 프레임으로 나누어 각 프레임에서 항공기를 감지하고 이를 airport_video_output.mp4 파일로 편집합니다.

Google Compute Engine의 작업 디렉토리에서이 파일을 다운로드 할 수 있습니다. 이미 이에 익숙한 것으로 알고 있습니다.

![이미지](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_14.png)

위의 비디오 파일을 확인해보세요. 비행기 대부분이 감지되었지만 일부는 인식되지 않았습니다. 모델의 정확도를 향상시킬 방법에 대해 고려하고, 의견을 공유하려면 아래의 댓글란을 이용해 주세요.



## X-Files

이 기사에서 시연 목적으로 사용한 YOLOv8 Object Detection의 모든 파일 목록은 아래에 나와 있습니다.

PyTorch 모델: YOLOv8sAir

드론 소스:



- 정적 이미지: Aerial_AirBase.jpg
- 공항 동영상: AirBase_Video.mp4

소스 코드: 구글 연구 Colab

당신의 상상력을 발휘하여 놀라운 솔루션을 만들어보세요!

## 연락처



이 기사에서 설명된 내용 또는 다른 아이디어에 대해 궁금한 점이 있으면 — 트위터에서 언제든지 저에게 질문해주세요.

트위터: https://twitter.com/dmytro_sazonov

![image](/assets/img/2024-05-15-DIYforaSpyUtilizingYOLOv8ObjectDetectioninMilitaryOperations_15.png)