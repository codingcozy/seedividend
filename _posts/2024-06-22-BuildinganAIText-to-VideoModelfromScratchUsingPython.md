---
title: "파이썬으로 AI 텍스트-비디오 모델 처음부터 구축하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-BuildinganAIText-to-VideoModelfromScratchUsingPython_0.png"
date: 2024-06-22 04:36
ogImage: 
  url: /assets/img/2024-06-22-BuildinganAIText-to-VideoModelfromScratchUsingPython_0.png
tag: Tech
originalTitle: "Building an AI Text-to-Video Model from Scratch Using Python"
link: "https://medium.com/gitconnected/building-an-ai-text-to-video-model-from-scratch-using-python-35b4eb4002de"
---


![Building an AI Text-to-Video Model from Scratch Using Python](/assets/img/2024-06-22-BuildinganAIText-to-VideoModelfromScratchUsingPython_0.png)

애정하는 여러분, 반가워요!

오픈AI의 Sora, 안정성 AI의 Stable Video Diffusion 등 2024년에 가장 인기 있는 인공지능 트렌드 중 하나인 텍스트-비디오 모델들이 대규모 언어 모델 이후 많이 등장하고 있습니다. 이 블로그에서는 제가 직접 작성한 작은 규모의 텍스트-비디오 모델을 만들어보려고 해요. 텍스트 프롬프트를 입력하면 학습된 모델이 해당 프롬프트를 기반으로 비디오를 생성할 거예요. 여기서는 이론적 개념을 이해하는 것부터 전체 아키텍처 코딩하고 최종 결과물을 생성하는 과정까지 모두 다루고 있어요.

저는 고급 GPU를 갖고 있지 않아서 작은 규모 아키텍처를 코딩했어요. 다양한 프로세서에서 모델을 학습하는데 걸리는 시간을 비교해보겠습니다:

CPU에서 실행하면 모델 학습에 훨씬 오랜 시간이 걸릴 거예요. 코드 변경을 빠르게 테스트하고 결과를 확인하려면 CPU는 최적의 선택이 아닙니다. 더 효율적이고 빠른 학습을 위해 Colab이나 Kaggle의 T4 GPU를 사용하는 것을 권장해요.

더 궁금한 점이 있으시면 언제든지 물어주세요!

<div class="content-ad"></div>

이 블로그에서 코드를 복사하여 붙여 넣는 것을 피하려면 GitHub 저장소에 노트북 파일과 모든 코드 및 정보가 포함되어 있습니다.

여기에는 처음부터 Stable Diffusion을 만드는 방법을 안내하는 블로그 링크가 있습니다:

# 목차

- 무엇을 만들고 있는가
- 필수 조건
- GAN 아키텍처 이해하기
∘ GAN이란?
∘ 실세계 응용
∘ GAN이 어떻게 작동하는가?
∘ GAN 훈련 예제
- 준비 단계 설정
- 훈련 데이터 코딩
- 교육 데이터 전 처리
- 텍스트 임베딩 레이어 구현
- Generator 레이어 구현
- Discriminator 레이어 구현
- 교육 매개변수 코딩
- 훈련 루프 코딩
- 훈련된 모델 저장
- AI 비디오 생성
- 빠진 것은 무엇일까?
- 나에 대해

<div class="content-ad"></div>

# 무엇을 구축하고 있는가

우리는 전통적인 기계 학습 또는 딥 러닝 모델과 유사한 방식을 따를 것입니다. 데이터 세트에서 훈련을 받은 후 보이지 않는 데이터에서 테스트하는 것이 기본적인 접근 방식입니다. 텍스트에서 비디오로 변환하는 맥락에서, 우리는 10만 개의 비디오 데이터 세트를 사용하여 개가 공을 가져오고 고양이가 쥐를 쫓는 내용을 가르치겠습니다. 우리 모델을 훈련시켜서 고양이가 공을 가져오거나 개가 쥐를 쫓는 비디오를 생성하도록 할 것입니다.

이러한 훈련 데이터 세트는 인터넷에서 쉽게 이용할 수 있지만, 필요한 컴퓨팅 파워는 극히 높습니다. 따라서 우리는 Python 코드에서 생성된 움직이는 물체들의 비디오 데이터 세트를 사용할 것입니다.

저희는 OpenAI Sora가 사용하는 확산 모델 대신 GAN(생성 적대적 신경망) 아키텍처를 사용하여 모델을 만들 것입니다. 확산 모델을 사용하려고 했지만, 메모리 요구 사항 때문에 그 기능이 중단되었습니다. GAN은 반면에 훈련과 테스트가 더 쉽고 빠릅니다.

<div class="content-ad"></div>

# 사전 요구 사항

우리는 OOP (Object-Oriented Programming)을 사용할 것이기 때문에, 기본적인 이해를 갖고 있어야 하며 뉴럴 네트워크에 대한 이해도 필요합니다. GANs (Generative Adversarial Networks)에 대한 지식은 필수는 아니지만, 여기서 그 아키텍처를 다룰 것이므로 참고하시면 좋습니다.

# GAN 아키텍처 이해

GAN을 이해하는 것은 중요합니다. 우리의 아키텍처의 많은 부분이 이에 의존하기 때문입니다. 무엇인지, 그 구성 요소는 무엇인지 등을 탐구해 보겠습니다.

<div class="content-ad"></div>

## GAN이란 무엇인가요?

Generative Adversarial Network (GAN)은 주어진 데이터셋으로부터 새로운 데이터(예: 이미지 또는 음악)를 생성하는 하나의 신경망과 그 데이터가 실제인지 가짜인지 구별하려는 다른 신경망이 경쟁하는 딥 러닝 모델입니다. 이 과정은 생성된 데이터가 원본과 구별할 수 없을 때까지 계속됩니다.

## 실제 세계 응용

- 이미지 생성: GAN은 텍스트 프롬프트로 현실적인 이미지를 생성하거나 기존 이미지를 수정하여 해상도를 향상시키거나 흑백 사진에 색상을 추가합니다.
- 데이터 증강: 다른 기계 학습 모델을 훈련하기 위해 합성 데이터를 생성하며, 예를 들어 사기 탐지 시스템을 위해 사기 거래 데이터를 생성합니다.
- 누락된 정보 완성: GAN은 누락된 데이터를 채울 수 있으며, 에너지 응용 프로그램에 대한 지형 지도에서 장력 이미지를 생성하는 등의 작업을 수행할 수 있습니다.
- 3D 모델 생성: 2D 이미지를 3D 모델로 변환하여, 수술 계획을 위해 현실적인 장기 이미지를 생성하는 의료 분야와 같은 분야에서 유용합니다.

<div class="content-ad"></div>

## GAN이 작동하는 방식은?

GAN은 생성자(generator)와 판별자(discriminator) 두 개의 딥 뉴럴 네트워크로 구성되어 있습니다. 이 두 네트워크는 적대적인 설정에서 함께 훈련되며, 하나는 새로운 데이터를 생성하고 다른 하나는 데이터가 진짜인지 가짜인지 판별합니다.

다음은 GAN 작동 방식의 간단한 개요입니다:

- 훈련 데이터 분석: 생성자는 훈련 데이터를 분석하여 데이터 특성을 식별하고, 판별자는 독립적으로 동일한 데이터를 분석하여 해당 특성을 학습합니다.
- 데이터 수정: 생성자는 데이터의 일부 특성에 잡음(랜덤 변경)을 추가합니다.
- 데이터 전달: 수정된 데이터는 그런 다음 판별자에게 전달됩니다.
- 확률 계산: 판별자는 생성된 데이터가 원본 데이터셋에서 온 확률을 계산합니다.
- 피드백 루프: 판별자는 생성자에게 피드백을 제공하여 다음 주기에서 잡음을 줄이도록 안내합니다.
- 적대적 훈련: 생성자는 판별자의 오류를 최대화하려고 하고, 판별자는 자신의 에러를 최소화하려고 합니다. 많은 훈련 반복을 통해 두 네트워크는 개선되고 발전합니다.
- 평형 상태: 판별자가 더 이상 진짜와 생성된 데이터를 구별하지 못할 때까지 훈련이 계속되며, 이는 생성자가 현실적인 데이터를 생성하는 것을 성공적으로 배웠음을 나타냅니다. 이 시점에서 훈련 과정이 완료됩니다.

<div class="content-ad"></div>

## GAN 훈련 예시

이미지 간 변환을 예로 들어 GAN 모델을 설명해 보겠습니다. 이때는 인간의 얼굴을 수정하는 데 초점을 맞춥니다.

- 입력 이미지: 입력은 실제 인간 얼굴 이미지입니다.
- 속성 수정: 생성자는 눈에 선글라스를 추가하는 등 얼굴의 속성을 수정합니다.
- 생성된 이미지: 생성자는 선글라스가 추가된 이미지 세트를 생성합니다.
- 판별자의 역할: 판별자는 실제 이미지(선글라스를 쓴 사람)와 생성된 이미지(선글라스가 추가된 얼굴)의 혼합을 받습니다.
- 평가: 판별자는 실제 이미지와 생성된 이미지를 구별하려고 합니다.
- 피드백 루프: 만약 판별자가 가짜 이미지를 올바르게 식별하면 생성자는 더 현실적인 이미지를 만들기 위해 매개변수를 조정합니다. 생성자가 판별자를 성공적으로 속이면 판별자는 감지를 개선하기 위해 매개변수를 업데이트합니다.

이 적대적 프로세스를 통해 두 네트워크가 계속해서 발전합니다. 생성자는 현실적인 이미지를 만드는 데 더 잘해지고 판별자는 가짜를 식별하는 데 더 잘해지며 균형이 이루어질 때까지 계속 발전합니다. 판별자가 더 이상 실제 이미지와 생성된 이미지를 구별하지 못할 정도로 적절한 평형점에 도달하면 GAN이 성공적으로 현실적인 수정을 만들기 위해 배웠다고 볼 수 있습니다.

<div class="content-ad"></div>

# 무대를 준비합니다

파이썬 라이브러리 그룹과 작업할 것입니다. 그러니, 이제 그들을 가져오겠습니다.

```python
# 운영 체제와 상호 작용하기 위한 운영 체제 모듈
import os

# 무작위 숫자 생성을 위한 모듈
import random

# 숫자 연산을 위한 모듈
import numpy as np

# 이미지 처리를 위한 OpenCV 라이브러리
import cv2

# 이미지 처리를 위한 Python Imaging Library
from PIL import Image, ImageDraw, ImageFont

# 딥 러닝을 위한 PyTorch 라이브러리
import torch

# PyTorch에서 사용자 정의 데이터셋 만들기 위한 Dataset 클래스
from torch.utils.data import Dataset

# 이미지 변환을 위한 모듈
import torchvision.transforms as transforms

# PyTorch의 신경망 모듈
import torch.nn as nn

# PyTorch의 최적화 알고리즘
import torch.optim as optim

# PyTorch에서 시퀀스를 패딩하는 함수
from torch.nn.utils.rnn import pad_sequence

# PyTorch에서 이미지 저장하는 함수
from torchvision.utils import save_image

# 그래프 및 이미지 플로팅을 위한 모듈
import matplotlib.pyplot as plt

# IPython 환경에서 풍부한 콘텐츠 표시를 위한 모듈
from IPython.display import clear_output, display, HTML

# 이진 데이터를 텍스트로 인코딩 및 디코딩하는 모듈
import base64
```

모든 라이브러리를 가져왔으니, 다음 단계는 GAN 아키텍처를 훈련할 때 사용할 훈련 데이터를 정의하는 것입니다.

<div class="content-ad"></div>

# 훈련 데이터 코딩하기

적어도 10,000개의 비디오가 훈련 데이터로 필요해요. 왜냐하면 작은 숫자로 테스트해봤더니 결과가 매우 좋지 않았어요. 거의 아무것도 보이지 않았죠. 다음으로 중요한 질문은 무엇일까요? 이 비디오들은 무엇에 관한 걸까요? 우리의 훈련 비디오 데이터셋은 서로 다른 방향으로 움직이는 원을 포함해요. 그래서 이제 코드를 작성하고 10,000개의 비디오를 생성해보죠.

```js
# 'training_dataset'이름의 디렉토리 생성
os.makedirs('training_dataset', exist_ok=True)

# 데이터셋을 생성할 비디오 수 정의
num_videos = 10000

# 비디오 당 프레임 수 정의 (1초 비디오)
frames_per_video = 10

# 데이터셋 내 각 이미지의 크기 정의
img_size = (64, 64)

# 모양의 크기 정의 (원)
shape_size = 10
```

기본 매개변수를 설정한 후, 다음은 훈련 데이터셋의 텍스트 프롬프트를 정의해야해요.

<div class="content-ad"></div>

```js
# 원에 대한 텍스트 프롬프트와 해당 움직임을 정의합니다.
prompts_and_movements = [
    ("circle moving down", "circle", "down"),  # 원을 아래로 움직입니다
    ("circle moving left", "circle", "left"),  # 원을 왼쪽으로 움직입니다
    ("circle moving right", "circle", "right"),  # 원을 오른쪽으로 움직입니다
    ("circle moving diagonally up-right", "circle", "diagonal_up_right"),  # 원을 대각선으로 위쪽 오른쪽으로 움직입니다
    ("circle moving diagonally down-left", "circle", "diagonal_down_left"),  # 원을 대각선으로 아래쪽 왼쪽으로 움직입니다
    ("circle moving diagonally up-left", "circle", "diagonal_up_left"),  # 원을 대각선으로 위쪽 왼쪽으로 움직입니다
    ("circle moving diagonally down-right", "circle", "diagonal_down_right"),  # 원을 대각선으로 아래쪽 오른쪽으로 움직입니다
    ("circle rotating clockwise", "circle", "rotate_clockwise"),  # 원을 시계방향으로 회전시킵니다
    ("circle rotating counter-clockwise", "circle", "rotate_counter_clockwise"),  # 원을 반시계방향으로 회전시킵니다
    ("circle shrinking", "circle", "shrink"),  # 원을 축소시킵니다
    ("circle expanding", "circle", "expand"),  # 원을 확대시킵니다
    ("circle bouncing vertically", "circle", "bounce_vertical"),  # 원을 수직으로 튕기게 합니다
    ("circle bouncing horizontally", "circle", "bounce_horizontal"),  # 원을 수평으로 튕기게 합니다
    ("circle zigzagging vertically", "circle", "zigzag_vertical"),  # 원을 수직으로 지그재그로 움직입니다
    ("circle zigzagging horizontally", "circle", "zigzag_horizontal"),  # 원을 수평으로 지그재그로 움직입니다
    ("circle moving up-left", "circle", "up_left"),  # 원을 왼쪽 위로 움직입니다
    ("circle moving down-right", "circle", "down_right"),  # 원을 오른쪽 아래로 움직입니다
    ("circle moving down-left", "circle", "down_left"),  # 원을 왼쪽 아래로 움직입니다
]
```

이제 이러한 프롬프트를 사용하여 원의 여러 움직임을 정의했습니다. 다음으로 프롬프트를 기반으로 이 원을 움직이는 수학적 방정식을 코딩해야 합니다.

```js
# 매개변수가 있는 함수 정의
def create_image_with_moving_shape(size, frame_num, shape, direction):
  
    # 특정 크기와 흰색 배경으로 새로운 RGB 이미지를 생성합니다
    img = Image.new('RGB', size, color=(255, 255, 255))  

    # 이미지에 대한 그리기 컨텍스트를 생성합니다
    draw = ImageDraw.Draw(img)  

    # 이미지의 중앙 좌표를 계산합니다
    center_x, center_y = size[0] // 2, size[1] // 2  

    # 모든 움직임의 중심으로 위치를 초기화합니다
    position = (center_x, center_y)  

    # 각 방향을 해당 위치 조정이나 이미지 변환으로 매핑하는 딕셔너리를 정의합니다
    direction_map = {  
        # 프레임 번호에 따라 아래로 위치 조정
        "down": (0, frame_num * 5 % size[1]),  
        # 프레임 번호에 따라 왼쪽으로 위치 조정
        "left": (-frame_num * 5 % size[0], 0),  
        # 프레임 번호에 따라 오른쪽으로 위치 조정
        "right": (frame_num * 5 % size[0], 0),  
        # 대각선 위 오른쪽으로 위치 조정
        "diagonal_up_right": (frame_num * 5 % size[0], -frame_num * 5 % size[1]),  
        # 대각선 아래 왼쪽으로 위치 조정
        "diagonal_down_left": (-frame_num * 5 % size[0], frame_num * 5 % size[1]),  
        # 대각선 위 왼쪽으로 위치 조정
        "diagonal_up_left": (-frame_num * 5 % size[0], -frame_num * 5 % size[1]),  
        # 대각선 아래 오른쪽으로 위치 조정
        "diagonal_down_right": (frame_num * 5 % size[0], frame_num * 5 % size[1]),  
        # 프레임 번호에 따라 이미지를 시계방향으로 회전
        "rotate_clockwise": img.rotate(frame_num * 10 % 360, center=(center_x, center_y), fillcolor=(255, 255, 255)),  
        # 프레임 번호에 따라 이미지를 반시계방향으로 회전
        "rotate_counter_clockwise": img.rotate(-frame_num * 10 % 360, center=(center_x, center_y), fillcolor=(255, 255, 255)),  
        # 상하로 튕기는 효과를 위해 위치 조정
        "bounce_vertical": (0, center_y - abs(frame_num * 5 % size[1] - center_y)),  
        # 좌우로 튕기는 효과를 위해 위치 조정
        "bounce_horizontal": (center_x - abs(frame_num * 5 % size[0] - center_x), 0),  
        # 상하로 지그재그 효과를 위해 위치 조정
        "zigzag_vertical": (0, center_y - frame_num * 5 % size[1]) if frame_num % 2 == 0 else (0, center_y + frame_num * 5 % size[1]),  
        # 좌우로 지그재그 효과를 위해 위치 조정
        "zigzag_horizontal": (center_x - frame_num * 5 % size[0], center_y) if frame_num % 2 == 0 else (center_x + frame_num * 5 % size[0], center_y),  
        # 프레임 번호에 따라 오른쪽 위로 위치 조정
        "up_right": (frame_num * 5 % size[0], -frame_num * 5 % size[1]),  
        # 프레임 번호에 따라 왼쪽 위로 위치 조정
        "up_left": (-frame_num * 5 % size[0], -frame_num * 5 % size[1]),  
        # 프레임 번호에 따라 오른쪽 아래로 위치 조정
        "down_right": (frame_num * 5 % size[0], frame_num * 5 % size[1]),  
        # 프레임 번호에 따라 왼쪽 아래로 위치 조정
        "down_left": (-frame_num * 5 % size[0], frame_num * 5 % size[1])  
    }

    # direction_map에 방향이 있는지 확인합니다
    if direction in direction_map:  
        # 방향이 위치 조정에 매핑되는지 확인합니다
        if isinstance(direction_map[direction], tuple):  
            # 조정에 따라 위치를 업데이트합니다
            position = tuple(np.add(position, direction_map[direction]))  
        else:  # 방향이 이미지 변환에 매핑되는 경우
            # 변환에 따라 이미지를 업데이트합니다
            img = direction_map[direction]  

    # 이미지를 numpy 배열로 반환합니다
    return np.array(img)
```

위 함수는 선택한 방향에 따라 각 프레임마다 원을 움직이는 데 사용됩니다. 모든 비디오를 생성하기

<div class="content-ad"></div>

```js
# 비디오 수만큼 반복하여 생성
for i in range(num_videos):
    # 미리 정의된 목록에서 무작위로 프롬프트와 이동 선택
    prompt, shape, direction = random.choice(prompts_and_movements)
    
    # 현재 비디오를 위한 디렉터리 생성
    video_dir = f'training_dataset/video_{i}'
    os.makedirs(video_dir, exist_ok=True)
    
    # 선택된 프롬프트를 비디오 디렉터리 내의 텍스트 파일에 작성
    with open(f'{video_dir}/prompt.txt', 'w') as f:
        f.write(prompt)
    
    # 현재 비디오의 프레임 생성
    for frame_num in range(frames_per_video):
        # 현재 프레임 번호, 모양, 방향을 기반으로 이동 모양이 있는 이미지 생성
        img = create_image_with_moving_shape(img_size, frame_num, shape, direction)
        
        # 생성된 이미지를 비디오 디렉터리에 PNG 파일로 저장
        cv2.imwrite(f'{video_dir}/frame_{frame_num}.png', img)
```

위의 코드를 실행하면 전체 훈련 데이터 세트를 생성합니다. 훈련 데이터 세트 파일 구조는 다음과 같습니다.

![Training Dataset Structure](/assets/img/2024-06-22-BuildinganAIText-to-VideoModelfromScratchUsingPython_1.png)

각 훈련 비디오 폴더에는 프레임과 텍스트 프롬프트가 포함되어 있습니다. 훈련 데이터세트 샘플을 살펴보겠습니다.


<div class="content-ad"></div>


![https://miro.medium.com/v2/resize:fit:1400/1*mzizetR6zOyIheNFtKpo0A.gif](https://miro.medium.com/v2/resize:fit:1400/1*mzizetR6zOyIheNFtKpo0A.gif)

훈련 데이터셋에서 원이 위로 올라가고 오른쪽으로 이동하는 동작을 포함시키지 않았습니다. 이것을 보고 우리가 훈련한 모델을 보지 않은 데이터에서 테스트하는 프롬프트로 사용할 것입니다.

한 가지 더 중요한 점은 우리의 훈련 데이터에는 장면에서 멀어지는 물체나 카메라 앞에 부분적으로 나타나는 많은 샘플이 포함되어 있다는 것입니다. 이는 OpenAI 소라 데모 비디오에서 관찰한 것과 유사합니다.

![https://miro.medium.com/v2/resize:fit:1400/1*RP5M_TEt2H4Mo6OhnlcRLA.gif](https://miro.medium.com/v2/resize:fit:1400/1*RP5M_TEt2H4Mo6OhnlcRLA.gif)


<div class="content-ad"></div>

우리가 교육 데이터에 이러한 샘플을 포함시킨 이유는 우리의 모델이 원이 극단적인 구석에서 장면에 들어오더라도 모양을 유지할 수 있는지 테스트하기 위해서입니다.

이제 교육 데이터가 생성되었으므로 교육 비디오를 PyTorch와 같은 딥 러닝 프레임워크에서 주로 사용되는 기본 데이터 유형인 텐서로 변환해야 합니다. 또한, 정규화와 같은 변환 작업을 수행하여 데이터를 더 작은 범위로 스케일링하여 교육 아키텍처의 수렴과 안정성을 개선하는 데 도움이 됩니다.

# 교육 데이터 전처리

텍스트-비디오 작업을 위한 데이터 세트 클래스를 작성해야 합니다. 이 클래스는 교육 데이터 세트 디렉토리에서 비디오 프레임과 해당 텍스트 프롬프트를 읽어 PyTorch에서 사용할 수 있도록 만들어야 합니다.

<div class="content-ad"></div>

```python
# torch.utils.data.Dataset 클래스를 상속받아 데이터셋 클래스 정의
class TextToVideoDataset(Dataset):
    def __init__(self, root_dir, transform=None):
        # 루트 디렉토리와 옵션으로 주어진 변형(transform)으로 데이터셋 초기화
        self.root_dir = root_dir
        self.transform = transform
        # 루트 디렉토리의 모든 하위 디렉토리 나열
        self.video_dirs = [os.path.join(root_dir, d) for d in os.listdir(root_dir) if os.path.isdir(os.path.join(root_dir, d))]
        # 프레임 경로와 해당 프롬프트를 저장할 리스트 초기화
        self.frame_paths = []
        self.prompts = []

        # 각 비디오 디렉토리마다 반복
        for video_dir in self.video_dirs:
            # 비디오 디렉토리에 있는 모든 PNG 파일 나열하고 파일 경로 저장
            frames = [os.path.join(video_dir, f) for f in os.listdir(video_dir) if f.endswith('.png')]
            self.frame_paths.extend(frames)
            # 비디오 디렉토리에 있는 프롬프트 텍스트 파일 읽어서 내용 저장
            with open(os.path.join(video_dir, 'prompt.txt'), 'r') as f:
                prompt = f.read().strip()
            # 각 프레임에 해당하는 프롬프트를 반복해서 prompts 리스트에 저장
            self.prompts.extend([prompt] * len(frames))

    # 데이터셋 전체 샘플 수 반환
    def __len__(self):
        return len(self.frame_paths)

    # 주어진 인덱스에 해당하는 샘플 반환
    def __getitem__(self, idx):
        # 주어진 인덱스에 해당하는 프레임 경로 가져오기
        frame_path = self.frame_paths[idx]
        # PIL (Python Imaging Library)을 사용하여 이미지 열기
        image = Image.open(frame_path)
        # 주어진 인덱스에 해당하는 프롬프트 가져오기
        prompt = self.prompts[idx]

        # 지정된 경우 변형 적용
        if self.transform:
            image = self.transform(image)

        # 변형된 이미지와 프롬프트 반환
        return image, prompt
```

코드 아키텍처를 작성하기 전에 훈련 데이터를 정규화해야 합니다. 배치 크기는 16으로 설정하고 데이터를 섞어 더 많은 무작위성을 도입할 것입니다.

```python
# 데이터에 적용할 변형 세트 정의
transform = transforms.Compose([
    transforms.ToTensor(),  # PIL 이미지 또는 numpy.ndarray를 텐서로 변환
    transforms.Normalize((0.5,), (0.5,))  # 평균과 표준편차를 사용하여 이미지 정규화
])

# 정의된 변형을 사용하여 데이터셋 로드
dataset = TextToVideoDataset(root_dir='training_dataset', transform=transform)
# 데이터셋을 반복할 데이터로더 생성
dataloader = torch.utils.data.DataLoader(dataset, batch_size=16, shuffle=True)
```

# 텍스트 임베딩 레이어 구현하기


<div class="content-ad"></div>

트랜스포머 아키텍처에서 본 적이 있을 수 있어요. 텍스트 입력을 임베딩으로 변환하고 멀티 헤드 어텐션에서 추가로 처리할 수 있어요. 여기서는 텍스트 임베딩 레이어를 코드로 작성해야 합니다. 이 레이어를 기반으로 GAN 아키텍처 훈련이 임베딩 데이터와 이미지 텐서에서 이루어질 거에요.

```js
# 텍스트 임베딩을 위한 클래스 정의
class TextEmbedding(nn.Module):
    # vocab_size와 embed_size 매개변수를 사용하는 생성자 메서드
    def __init__(self, vocab_size, embed_size):
        # 슈퍼 클래스 생성자 호출
        super(TextEmbedding, self).__init__()
        # 임베딩 레이어 초기화
        self.embedding = nn.Embedding(vocab_size, embed_size)

    # 순전파 메서드 정의
    def forward(self, x):
        # 입력의 임베딩 표현 반환
        return self.embedding(x)
```

어휘 사전 크기는 훈련 데이터에 기반하여 결정될 거에요. 임베딩 크기는 10일 거에요. 더 큰 데이터셋을 다룬다면 Hugging Face에서 제공하는 임베딩 모델을 선택해서 사용할 수도 있어요.

# 생성자 레이어 구현하기

<div class="content-ad"></div>

이제 GANs에서 생성자가 하는 역할을 이미 알고 있기 때문에, 이 층을 코딩하고 내용을 이해해봅시다. 

```python
class Generator(nn.Module):
    def __init__(self, text_embed_size):
        super(Generator, self).__init__()
        
        # 노이즈와 텍스트 임베딩을 입력으로 받는 완전 연결층
        self.fc1 = nn.Linear(100 + text_embed_size, 256 * 8 * 8)
        
        # 입력을 업샘플링하는 전치 합성곱층
        self.deconv1 = nn.ConvTranspose2d(256, 128, 4, 2, 1)
        self.deconv2 = nn.ConvTranspose2d(128, 64, 4, 2, 1)
        self.deconv3 = nn.ConvTranspose2d(64, 3, 4, 2, 1)  # RGB 이미지에 대한 출력은 3채널이 됩니다
        
        # 활성화 함수
        self.relu = nn.ReLU(True)  # ReLU 활성화 함수
        self.tanh = nn.Tanh()       # 최종 출력을 -1과 1 사이의 값으로 만들기 위한 Tanh 활성화 함수

    def forward(self, noise, text_embed):
        # 채널 차원을 따라 노이즈와 텍스트 임베딩을 연결합니다
        x = torch.cat((noise, text_embed), dim=1)
        
        # 완전 연결층 다음에 4D 텐서로 재구성합니다
        x = self.fc1(x).view(-1, 256, 8, 8)
        
        # ReLU 활성화를 사용하여 전치 합성곱층을 통한 업샘플링
        x = self.relu(self.deconv1(x))
        x = self.relu(self.deconv2(x))
        
        # 최종 층에서 출력 값을 -1과 1 사이로 만들기 위해 Tanh 활성화를 사용합니다 (이미지용)
        x = self.tanh(self.deconv3(x))
        
        return x
```

이 생성자 클래스는 무작위 노이즈와 텍스트 임베딩의 결합에서 비디오 프레임을 생성하는 역할을 합니다. 목표는 주어진 텍스트 설명에 조건부로 현실적인 비디오 프레임을 생성하는 것입니다. 네트워크는 노이즈 벡터와 텍스트 임베딩을 하나의 특성 벡터로 결합하는 완전 연결층 (nn.Linear)으로 시작합니다. 이 벡터는 재구성되고, 레이어는 원하는 비디오 프레임 크기로 특성 맵을 점진적으로 업샘플링하는 일련의 전치 합성곱층 (nn.ConvTranspose2d)을 통해 전달됩니다.

이 레이어들은 비선형성을 위해 ReLU 활성화 함수(nn.ReLU)를 사용하고, 최종 레이어는 출력을 [-1, 1] 범위로 스케일링하기 위해 Tanh 활성화(nn.Tanh)를 사용합니다. 따라서 생성자는 추상적이고 고차원의 입력을 시각적으로 입력 텍스트를 잘 나타내는 일관된 비디오 프레임으로 변환합니다.

<div class="content-ad"></div>

# 판별자 레이어 구현
제너레이터 레이어를 코딩한 후에는 이제 판별자 부분을 구현해야 합니다.

```js
class Discriminator(nn.Module):
    def __init__(self):
        super(Discriminator, self).__init__()
        
        # 입력 이미지를 처리하기 위한 합성곱 레이어
        self.conv1 = nn.Conv2d(3, 64, 4, 2, 1)   # 3개의 입력 채널 (RGB), 64개의 출력 채널, 커널 크기 4x4, 스트라이드 2, 패딩 1
        self.conv2 = nn.Conv2d(64, 128, 4, 2, 1) # 64개의 입력 채널, 128개의 출력 채널, 커널 크기 4x4, 스트라이드 2, 패딩 1
        self.conv3 = nn.Conv2d(128, 256, 4, 2, 1) # 128개의 입력 채널, 256개의 출력 채널, 커널 크기 4x4, 스트라이드 2, 패딩 1
        
        # 분류를 위한 완전 연결 레이어
        self.fc1 = nn.Linear(256 * 8 * 8, 1)  # 입력 크기 256x8x8 (마지막 컨볼루션 레이어의 출력 크기), 출력 크기 1 (이진 분류)
        
        # 활성화 함수
        self.leaky_relu = nn.LeakyReLU(0.2, inplace=True)  # 음의 기울기 0.2를 가지는 Leaky ReLU 활성화 함수
        self.sigmoid = nn.Sigmoid()  # 최종 출력을 위한 시그모이드 활성화 함수 (확률)

    def forward(self, input):
        # LeakyReLU 활성화 함수를 사용하여 입력을 합성곱 레이어를 통과시킴
        x = self.leaky_relu(self.conv1(input))
        x = self.leaky_relu(self.conv2(x))
        x = self.leaky_relu(self.conv3(x))
        
        # 컨볼루션 레이어의 출력을 펼침
        x = x.view(-1, 256 * 8 * 8)
        
        # 이진 분류를 위해 시그모이드 활성화 함수를 사용하는 완전 연결 레이어를 통과시킴
        x = self.sigmoid(self.fc1(x))
        
        return x
```

판별자 클래스는 실제 및 생성된 비디오 프레임을 구별하는 이진 분류기로 작동합니다. 비디오 프레임의 신뢰성을 평가하여 생성기가 더 현실적인 출력물을 생성할 수 있게 안내하는 것이 목적입니다. 이 네트워크는 입력 비디오 프레임에서 계층적 특성을 추출하는 합성곱 레이어(nn.Conv2d)로 구성되어 있으며, Leaky ReLU 활성화(nn.LeakyReLU)가 음의 값에 대해 작은 경사도를 허용하면서 비선형성을 추가합니다. 특성 맵은 그 후 펼쳐지고 완전 연결 레이어(nn.Linear)를 통과한 후 시그모이드 활성화(nn.Sigmoid)로 끝나며, 이는 프레임이 실제인지 가짜인지를 나타내는 확률 점수를 출력합니다.

<div class="content-ad"></div>

판별자를 올바르게 분류하도록 훈련함으로써 생성자는 더 설득력있는 비디오 프레임을 만들기 위해 동시에 훈련됩니다. 이것은 생성자가 판별자를 속이려고 할 때 발생합니다.

# 코딩 훈련 매개변수

GAN을 훈련하기 위해 손실 함수, 옵티마이저 등과 같은 기본 구성 요소를 설정해야 합니다. 

```js
# GPU 사용 가능 여부 확인
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 텍스트 프롬프트를 위한 간단한 어휘 생성
all_prompts = [prompt for prompt, _, _ in prompts_and_movements]  # prompts_and_movements 리스트에서 모든 프롬프트 추출
vocab = {word: idx for idx, word in enumerate(set(" ".join(all_prompts).split()))}  # 각 고유 단어에 인덱스가 할당된 어휘 사전 생성
vocab_size = len(vocab)  # 어휘 크기
embed_size = 10  # 텍스트 임베딩 벡터 크기

def encode_text(prompt):
    # 주어진 프롬프트를 어휘를 사용하여 인덱스의 텐서로 인코딩
    return torch.tensor([vocab[word] for word in prompt.split()])

# 모델, 손실 함수, 옵티마이저 초기화
text_embedding = TextEmbedding(vocab_size, embed_size).to(device)  # vocab_size 및 embed_size로 TextEmbedding 모델 초기화
netG = Generator(embed_size).to(device)  # embed_size로 Generator 모델 초기화
netD = Discriminator().to(device)  # Discriminator 모델 초기화
criterion = nn.BCELoss().to(device)  # 이진 교차 엔트로피 손실 함수
optimizerD = optim.Adam(netD.parameters(), lr=0.0002, betas=(0.5, 0.999))  # 판별자에 대한 Adam 옵티마이저
optimizerG = optim.Adam(netG.parameters(), lr=0.0002, betas=(0.5, 0.999))  # 생성자에 대한 Adam 옵티마이저
```

<div class="content-ad"></div>

이 부분은 사용 가능한 GPU에서 코드를 실행할 수 있도록 변환해야 하는 부분입니다. 우리는 vocab_size를 찾기 위해 코드를 작성했고, 생성자와 구분자 모두 ADAM 옵티마이저를 사용하고 있습니다. 원하는 경우 자체 옵티마이저를 선택할 수 있습니다. 여기서 학습률을 0.0002와 같이 작은 값으로 설정하고, 임베딩 크기는 다른 Hugging Face 모델과 비교했을 때 훨씬 작은 10으로 설정하였습니다.

# 훈련 루프 코딩

다른 모든 신경망과 마찬가지로 GAN 아키텍처 훈련을 유사한 방식으로 코딩할 것입니다.

```js
# 에폭 수
num_epochs = 13

# 각 에폭을 반복
for epoch in range(num_epochs):
    # 각 데이터 배치를 반복
    for i, (data, prompts) in enumerate(dataloader):
        # 실제 데이터를 장치로 이동
        real_data = data.to(device)
        
        # 프롬프트를 리스트로 변환
        prompts = [prompt for prompt in prompts]

        # 구분자 업데이트
        netD.zero_grad()  # 구분자의 기울기를 0으로 초기화
        batch_size = real_data.size(0)  # 배치 크기 가져오기
        labels = torch.ones(batch_size, 1).to(device)  # 실제 데이터용 레이블 생성 (1)
        output = netD(real_data)  # 실제 데이터를 구분자를 통과시키면서 순전파
        lossD_real = criterion(output, labels)  # 실제 데이터에 대한 손실 계산
        lossD_real.backward()  # 기울기 계산을 위한 역전파
       
        # 가짜 데이터 생성
        noise = torch.randn(batch_size, 100).to(device)  # 임의의 노이즈 생성
        text_embeds = torch.stack([text_embedding(encode_text(prompt).to(device)).mean(dim=0) for prompt in prompts])  # 프롬프트를 텍스트 임베딩으로 변환
        fake_data = netG(noise, text_embeds)  # 노이즈와 텍스트 임베딩으로부터 가짜 데이터 생성
        labels = torch.zeros(batch_size, 1).to(device)  # 가짜 데이터용 레이블 생성 (0)
        output = netD(fake_data.detach())  # 가짜 데이터를 구분자를 통과시키면서 순전파 (detached를 사용하여 생성자로 그라디언트가 흐르는 것을 방지)
        lossD_fake = criterion(output, labels)  # 가짜 데이터에 대한 손실 계산
        lossD_fake.backward()  # 기울기 계산을 위한 역전파
        optimizerD.step()  # 구분자 매개변수 업데이트

        # 생성자 업데이트
        netG.zero_grad()  # 생성자의 기울기를 0으로 초기화
        labels = torch.ones(batch_size, 1).to(device)  # 구분자를 속이기 위한 가짜 데이터용 레이블 생성 (1)
        output = netD(fake_data)  # 가짜 데이터(이제 업데이트됨)를 구분자를 통과시키면서 순전파
        lossG = criterion(output, labels)  # 생성자의 손실 계산 (구분자의 반응에 따른)
        lossG.backward()  # 기울기 계산을 위한 역전파
        optimizerG.step()  # 생성자 매개변수 업데이트
    
    # 에폭 정보 출력
    print(f"에폭 [{epoch + 1}/{num_epochs}] 손실 D: {lossD_real + lossD_fake}, 손실 G: {lossG}")
```

<div class="content-ad"></div>

백프로패게이션을 통해 생성자와 식별자의 손실이 조정될 것입니다. 우리는 훈련 루프에 13개의 에포크를 사용했습니다. 다양한 값을 테스트해 보았지만, 에포크를 13보다 높게 설정해도 결과에 큰 차이가 나타나지 않았습니다. 게다가, 과적합의 위험이 있습니다. 더 많은 움직임과 모양을 포함하는 더 다양한 데이터셋이 있다면 더 높은 에포크 값을 사용할 수 있겠지만, 현재 상황에서는 그렇지 않습니다.

이 코드를 실행하면 훈련이 시작되고 각 에포크 이후에 생성자와 식별자의 손실이 출력됩니다.

```js
## 출력 ##

에포크 [1/13] 손실 D: 0.8798642754554749, 손실 G: 1.300612449645996
에포크 [2/13] 손실 D: 0.8235711455345154, 손실 G: 1.3729925155639648
에포크 [3/13] 손실 D: 0.6098687052726746, 손실 G: 1.3266581296920776

...
```

# 훈련된 모델 저장하기

<div class="content-ad"></div>

훈련이 완료되면 훈련된 GAN 아키텍처의 판별자와 생성자를 저장해야 합니다. 이 작업은 단 두 줄의 코드로 간단히 수행할 수 있습니다.

```js
# 생성자 모델의 상태 사전을 'generator.pth'라는 파일로 저장합니다
torch.save(netG.state_dict(), 'generator.pth')

# 판별자 모델의 상태 사전을 'discriminator.pth'라는 파일로 저장합니다
torch.save(netD.state_dict(), 'discriminator.pth')
```

# AI 비디오 생성

토론한 바와 같이, 훈련되지 않은 데이터에 모델을 테스트하는 접근 방식은 개가 공을 던지고, 고양이가 쥐를 쫓는 훈련 데이터의 예와 비교됩니다. 따라서 테스트 프롬프트는 고양이가 공을 던지거나, 개가 쥐를 쫓는 등의 시나리오를 포함할 수 있습니다.

<div class="content-ad"></div>

특정 경우에서, 원이 위로 움직이고 오른쪽으로 이동하는 움직임은 우리의 훈련 데이터에 포함되어 있지 않아서 모델은 이 특정 움직임을 모르고 있습니다. 그러나, 다른 움직임에는 훈련을 받았습니다. 이 움직임을 사용하여 훈련된 모델을 테스트하고 성능을 관찰할 수 있습니다.

```js
# 주어진 텍스트 코멘트를 기반으로 비디오를 생성하는 추론 함수
def generate_video(text_prompt, num_frames=10):
    # 텍스트 코멘트를 기반으로 생성된 비디오 프레임을 담을 디렉토리 생성
    os.makedirs(f'generated_video_{text_prompt.replace(" ", "_")}', exist_ok=True)
    
    # 텍스트 코멘트를 텍스트 임베딩 텐서로 인코딩
    text_embed = text_embedding(encode_text(text_prompt).to(device)).mean(dim=0).unsqueeze(0)
    
    # 비디오 프레임 생성
    for frame_num in range(num_frames):
        # 임의의 노이즈 생성
        noise = torch.randn(1, 100).to(device)
        
        # Generator 네트워크를 사용하여 가짜 프레임 생성
        with torch.no_grad():
            fake_frame = netG(noise, text_embed)
        
        # 생성된 가짜 프레임을 이미지 파일로 저장
        save_image(fake_frame, f'generated_video_{text_prompt.replace(" ", "_")}/frame_{frame_num}.png')

# 특정 텍스트 코멘트와 함께 generate_video 함수 사용 예시
generate_video('circle moving up-right')
```

위의 코드를 실행하면 생성된 비디오의 모든 프레임을 포함한 디렉토리가 생성됩니다. 이러한 프레임을 모두 하나의 짧은 비디오로 합치기 위해 약간의 코드를 사용해야 합니다.

```js
# PNG 프레임을 포함한 폴더 경로 정의
folder_path = 'generated_video_circle_moving_up-right'

# 폴더 내 모든 PNG 파일 목록 가져오기
image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]

# 이름을 기준으로 이미지 정렬 (순차적 번호로 가정)
image_files.sort()

# 프레임을 저장할 리스트 생성
frames = []

# 각 이미지를 읽어서 frames 리스트에 추가
for image_file in image_files:
  image_path = os.path.join(folder_path, image_file)
  frame = cv2.imread(image_path)
  frames.append(frame)

# 편리한 처리를 위해 frames 리스트를 넘파이 배열로 변환
frames = np.array(frames)

# 프레임 속도 정의 (초당 프레임 수)
fps = 10

# 비디오 작성자 객체 생성
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('generated_video.avi', fourcc, fps, (frames[0].shape[1], frames[0].shape[0]))

# 각 프레임을 비디오에 작성
for frame in frames:
  out.write(frame)

# 비디오 작성자 해제
out.release()
```

<div class="content-ad"></div>

새로 생성된 비디오가 있는 폴더 경로로 가리키도록 해주세요. 이 코드를 실행한 후에는 AI 비디오가 성공적으로 생성되었습니다. 어떻게 보이는지 함께 확인해봅시다.

![AI 동영상](https://miro.medium.com/v2/resize:fit:1400/1*AUioBh9zHkh2c3f3nGtpsQ.gif)

동일한 에포크 횟수로 여러 번 훈련을 수행했습니다. 양쪽 경우 모두 원이 반 이상 나타나면서 아래에서 시작합니다. 좋은 점은 우리 모델이 양쪽 경우 모두 오른쪽 위로 이동을 시도했다는 것입니다. 예를 들어, 시도 1에서는 원이 대각선으로 위로 이동한 다음 위로 이동했으며, 시도 2에서는 크기가 작아지면서 대각선으로 이동했습니다. 원이 왼쪽으로 이동하거나 완전히 사라지는 경우는 없었습니다. 이것은 좋은 조짐입니다.

# 무엇이 부족할까요?

<div class="content-ad"></div>

저는 이 아키텍처의 다양한 측면을 테스트해본 결과, 훈련 데이터가 중요하다는 것을 발견했습니다. 데이터셋에 더 많은 동작과 모양을 포함시키면 변별성을 높이고 모델의 성능을 향상시킬 수 있습니다. 데이터가 코드를 통해 생성되기 때문에 더 다양한 데이터를 생성하는 데 많은 시간이 걸리지 않습니다. 대신에 논리를 정제하는 데 집중할 수 있습니다.

뿐만 아니라, 이 블로그에서 논의된 GAN 아키텍처는 비교적 직관적입니다. 고급 기술을 통합하거나 기본 신경망 임베딩 대신 언어 모델 임베딩(LLM)을 사용함으로써 보다 복잡하게 만들 수 있습니다. 또한, 임베딩 크기와 같은 매개변수를 조정하는 것이 모델의 효과를 크게 좌우할 수 있습니다.

# 나에 대해

저는 데이터 과학 석사 학위를 가지고 있으며 NLP와 AI 분야에서 두 년 이상 일해왔습니다. 저를 고용하거나 AI 관련 문의 사항이 있으면 언제든지 저에게 물어보세요! 모든 질문에 대해 이메일로 답변드립니다.

<div class="content-ad"></div>

제 LinkedIn 프로필에 연락하세요: [링크](https://www.linkedin.com/in/fareed-khan-dev/)

이메일로 연락하세요: fareedhassankhan12@gmail.com