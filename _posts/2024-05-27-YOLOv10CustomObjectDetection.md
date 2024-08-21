---
title: "YOLOv10 Custom Object Detection"
description: ""
coverImage: "/assets/img/2024-05-27-YOLOv10CustomObjectDetection_0.png"
date: 2024-05-27 18:31
ogImage:
  url: /assets/img/2024-05-27-YOLOv10CustomObjectDetection_0.png
tag: Tech
originalTitle: "YOLOv10 Custom Object Detection"
link: "https://medium.com/@batuhansenerr/yolov10-custom-object-detection-bd7298ddbfd3"
isUpdated: true
---

YOLOv10 및 사용자 지정 데이터로 모델 학습 개요

![YOLOv10CustomObjectDetection_0.png](/assets/img/2024-05-27-YOLOv10CustomObjectDetection_0.png)

## 개요

Ultralytics Python 패키지를 사용하여 개발된 YOLOv10은 실시간 객체 검출을 위한 새로운 접근 방식을 제공합니다. Qinghua 대학 연구원들이 개발한 이 모델은 모델 아키텍처 개선과 non-maximum suppression (NMS) 제거를 통해 성능을 향상시켰습니다. 이러한 최적화로 인해 더 낮은 계산 요구사항으로 최신 기술 성능을 제공합니다. YOLOv10은 다양한 모델 규모에 대해 우수한 정확도-대기간 교환을 제공하는 것으로 실험 결과 보여졌습니다.

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

내 이전 기사를 읽은 사람들은 알겠지만, YOLO 모델을 사용한 다양한 프로젝트를 공유해 왔습니다. 사전 학습된 모델 중에서 성능과 효율성 면에서 두드러지는 YOLO 모델입니다. 그러나 실시간 객체 감지는 비최대 억제 (NMS)와 구조적 비효율성에 의해 도전을 겪어왔습니다. YOLOv10은 이러한 문제를 해결하기 위해 NMS를 제거하고 효율성과 정확도 양쪽을 모두 고려한 설계 전략을 채택했습니다.

## 구조

![YOLOv10CustomObjectDetection_1](/assets/img/2024-05-27-YOLOv10CustomObjectDetection_1.png)

- 백본: 특징 추출을 담당하는 백본은 CSPNet (Cross Stage Partial Network)의 향상된 버전을 사용하여 기울기 흐름을 개선하고 계산 중복성을 줄였습니다.
- 넥: 다양한 스케일의 특징을 집계하고 헤드로 전달하는 넥은 효과적인 다중 스케일 특징 퓨전을 위해 PAN (Path Aggregation Network) 레이어를 포함하고 있습니다.
- One-to-Many 헤드: 훈련 중 하나의 객체에 대해 여러 예측을 생성하여 풍부한 지도 신호를 제공하고 학습 정확도를 향상시킵니다.
- One-to-One 헤드: 추론 중 하나의 객체에 대해 최상의 예측을 생성하여 NMS의 필요성을 제거하고 지연 시간을 줄이며 효율성을 향상시킵니다.

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

## 모델 변형과 성능

YOLOv10은 여섯 가지 모델로 제공됩니다:

- YOLOv10-N: 매우 자원이 제한된 환경을 위한 나노 버전.
- YOLOv10-S: 속도와 정확도를 균형있게 유지한 작은 버전.
- YOLOv10-M: 일반적인 용도를 위한 중간 버전.
- YOLOv10-B: 정확도를 높이기 위해 넓이를 증가시킨 균형잡힌 버전.
- YOLOv10-L: 컴퓨팅 자원을 늘리는 대가로 더 높은 정확도를 가진 대형 버전.
- YOLOv10-X: 최대 정확도와 성능을 위한 초대형 버전

![이미지](/assets/img/2024-05-27-YOLOv10CustomObjectDetection_2.png)

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

## 비교

서로 다른 모델 간의 지연 시간과 정확도에 대한 비교를 살펴봅시다. 이는 COCO와 같은 표준 벤치마크에서 테스트되었습니다.

![Image 1](/assets/img/2024-05-27-YOLOv10CustomObjectDetection_3.png)

![Image 2](/assets/img/2024-05-27-YOLOv10CustomObjectDetection_4.png)

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

YOLOv10은 실시간 객체 검출 애플리케이션에 대한 첨단 기술로, 더 적은 매개변수로 더 높은 정확도와 속도 성능을 제공합니다.

## 사용자 정의 객체 검출을 위한 YOLOv10 훈련

먼저, 공식 YOLOv10 GitHub 저장소를 복제하여 필요한 yolov10n 모델을 다운로드하세요.

```js
!pip install -q git+https://github.com/THU-MIG/yolov10.git

!wget -P -q https://github.com/jameslahm/yolov10/releases/download/v1.0/yolov10n.pt
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

로보플로 유니버스에서 원하는 사용자 정의 프로젝트를 실험하고, 직접 데이터셋을 생성하며, 인텔이 후원하는 RF100 데이터셋을 사용할 수 있어요. 이 게시물에서는 X-레이 이미지에서 위험한 항목을 감지하기 위해 준비된 데이터셋을 사용할 거에요.

로보플로 API를 사용하여 YOLOv8 형식으로 모델을 다운로드하세요.

```python
!pip install -q roboflow
from roboflow import Roboflow
rf = Roboflow(api_key="your-api-key")
project = rf.workspace("vladutc").project("x-ray-baggage")
version = project.version(3)
dataset = version.download("yolov8")
```

매개변수와 파일 경로를 지정한 다음, 모델 훈련을 시작하세요.

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

!yolo task=detect mode=train epochs=25 batch=32 plots=True \
model='/content/-q/yolov10n.pt' \
data='/content/X-Ray-Baggage-3/data.yaml'

예시 data.yaml 파일

names:

- Gun
- Knife
- Pliers
- Scissors
- Wrench

nc: 5

roboflow:
license: CC BY 4.0
project: x-ray-baggage
url: https://universe.roboflow.com/vladutc/x-ray-baggage/dataset/3
version: 3
workspace: vladutc

test: /content/X-Ray-Baggage-3/test/images
train: /content/X-Ray-Baggage-3/train/images
val: /content/X-Ray-Baggage-3/valid/images

결과를 살펴봅시다.

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

md
![Training results](/content/runs/detect/train/results.png){width=1000}

![Prediction results](/assets/img/2024-05-27-YOLOv10CustomObjectDetection_5.png)

테스트 데이터를 예측하고 결과를 5x2 그리드로 표시합니다.

```python
from ultralytics import YOLOv10

model_path = '/content/runs/detect/train/weights/best.pt'
model = YOLOv10(model_path)
results = model(source='/content/X-Ray-Baggage-3/test/images', conf=0.25, save=True)
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

```js
import glob
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

images = glob.glob('/content/runs/detect/predict/*.jpg')

images_to_display = images[:10]

fig, axes = plt.subplots(2, 5, figsize=(20, 10))

for i, ax in enumerate(axes.flat):
    if i < len(images_to_display):
        img = mpimg.imread(images_to_display[i])
        ax.imshow(img)
        ax.axis('off')
    else:
        ax.axis('off')

plt.tight_layout()
plt.show()
```

<img src="/assets/img/2024-05-27-YOLOv10CustomObjectDetection_6.png" />

## 결론 및 권장 사항

- 이 글을 작성하는 동안 여러 데이터셋에서 YOLOv10n 모델을 학습하여 Colab의 15GB 무료 T4 GPU 한도를 고갈시켰습니다. Colab 환경에서 모델을 학습할 때 한도를 초과하면 T4 GPU에 제한이 있습니다. 이 문제를 해결하기 위해 다른 구글 계정으로 로그인할 수 있습니다.
- 기술이 빠르게 발전함에 따라 컴퓨터 비전과 대형 언어 모델 양쪽에서 단일 기술에 갇히지 않고 주요 개념을 배우는 것이 유익하다고 생각됩니다. 이를 적응하기 위해 이러한 기술의 개발자들로부터 배우는 것이 도움이 됩니다. Ultralytics와 Roboflow의 콘텐츠는 이 분야에서 매우 가치 있으며, 그들을 팔로우하는 것이 바람직합니다.

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

## 참고 자료

- 공식 레포: https://github.com/THU-MIG/yolov10
- 울트라리틱스 (Ultralytics)
- 로보플로우 (Roboflow)

```js
@article{THU-MIGyolov10,
  title={YOLOv10: 실시간 엔드 투 엔드 객체 검출},
  author={Ao Wang, Hui Chen, Lihao Liu 등},
  journal={arXiv 사전 인쇄 arXiv:2405.14458},
  year={2024},
  institution={Tsinghua University},
  license={AGPL-3.0}
}
```

```js
@misc{
x-ray-baggage_dataset,
title={X-레이 수하물 데이터셋},
type={오픈 소스 데이터셋},
author={vladutc},
howpublished={\url{ https://universe.roboflow.com/vladutc/x-ray-baggage }},
url={https://universe.roboflow.com/vladutc/x-ray-baggage},
journal={Roboflow Universe},
publisher={Roboflow},
year={2024},
month={5},
note={방문일: 2024년 5월 26일},
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

저는 청화 대학교의 연구원들, Ultralytics와 Roboflow 팀, 그리고 오픈 소스 커뮤니티의 모든 기여자들에게 감사드립니다.
