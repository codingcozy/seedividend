---
title: "대용량 언어 모델을 제공하는 도커 이미지 크기를 줄이기 파트 1"
description: ""
coverImage: "/assets/img/2024-05-15-ReducingtheSizeofDockerImagesServingLargeLanguageModelspart1_0.png"
date: 2024-05-15 11:42
ogImage: 
  url: /assets/img/2024-05-15-ReducingtheSizeofDockerImagesServingLargeLanguageModelspart1_0.png
tag: Tech
originalTitle: "Reducing the Size of Docker Images Serving Large Language Models (part 1)"
link: "https://medium.com/towards-data-science/reducing-the-size-of-docker-images-serving-llm-models-b70ee66e5a76"
isUpdated: true
---




<img src="/assets/img/2024-05-15-ReducingtheSizeofDockerImagesServingLargeLanguageModelspart1_0.png" />

# 소개

BERT, RoBERTa 또는 T5와 같은 Transformer 기반 모델은 자연어 처리에서 맞춤 문제에 대한 최신 솔루션을 제공합니다. 제품에서 모델을 제공하는 보편적인 방법은 모델에 대한 API를 제공하는 Docker 이미지를 빌드하는 것입니다. 이미지는 필요한 종속성, 모델 자체 및 모델로 입력 데이터를 처리하는 코드를 캡슐화합니다. 큰 생성 모델 (GenAI)과 비교하면, 이러한 모델은 상대적으로 작아서 0.5~2GB 정도입니다. 그러나 모델을 Docker 이미지로 배포하는 간단한 방법을 따를 때, 이미지 크기가 8GB에 이를 수 있음에 놀랐을 수도 있습니다. 대상 이미지가 왜 그렇게 큰지, 그리고 이미지 크기를 줄일 수 있는 방법이 있는지 궁금했던 적이 있나요? 이 이야기에서는 Docker 이미지가 왜 그렇게 큰지 설명하고 그 크기를 줄이는 방법에 대해 논의하겠습니다.

이 이야기에서 사용된 Python 스크립트 및 Docker 파일의 예시는 [1]에서도 확인할 수 있습니다:



# 기본 도커 이미지

언어 감지 모델을 위한 간단한 도커 이미지를 만들어 봅시다. 모델을 구축하기 위한 몇 가지 전제사항은 다음과 같습니다:

- 훈련된 모델을 사용할 것입니다: papluca/xlm-roberta-base-language-detection [2].
- 가능한 최상의 성능을 얻기 위해 GPU를 활용할 것입니다.
- 단일 텍스트를 처리하는 간단한 엔드포인트를 제공하기 위해 FastAPI를 사용할 것입니다.

다음은 이미지를 빌드하기 위한 Dockerfile입니다:



모델을 로드하고 추론을 수행하는 데 사용된 코드는 다음과 같습니다:

다음은 이미지를 빌드하는 데 사용된 명령어입니다:

```js
docker build -t language_detection_cuda . -f Dockerfile_cuda
```

... 그리고 이미지를 실행하세요.



```js
도커 실행 --gpus 0 -p 8000:8000 language_detection_cuda
```

... 엔드포인트를 테스트해 보겠습니다:

```js
시간 curl -X 'POST'   'http://localhost:8000/process'   -H 'accept: application/json'   -H 'Content-Type: application/json'   -d '{
  "text": "Certo ci sono stati dei problemi - problemi che dovremo risolvere in vista, per esempio, dell'\''ampliamento - ma a volte ne esageriamo il lato negativo."
}'
```

다음 출력을 받았습니다:



```js
"it"
```

지금까지 특별한 것은 없어요. 엔드포인트가 할 일을 잘 수행하고 있어요.

모델의 크기는 1.11GB입니다 (model.safetensors 파일), 토크나이저를 위한 추가 10MB가 있어요. 이제 도커 이미지의 크기를 보겠습니다:

```js
docker images | grep language_detection_cuda
```



… 출력물은:

```js
language_detection_cuda    최신 버전   47f4c1c0de2d   33분 전   7.05GB
```

도커 이미지의 총 용량은 7.05GB입니다. 와우, 상당히 많죠? 하지만 왜 이미지가 그렇게 큰 걸까요? 이제 컨테이너로 들어가서 내부를 확인해 보겠습니다.

```js
docker run -it --gpus 0 -p 8000:8000 --entrypoint "/bin/bash"  language_detection_cuda
```



이미지 크기를 분석하기 위해 du명령어를 사용하고 가장 큰 폴더를 추적할 것입니다.

```shell
du -h --max-depth 1 /
```

루트 디렉토리의 출력을 포함하여 가장 큰 폴더들:

```shell
5.9G    /usr
1.1G    /workspace
 ...
```



Workspace 폴더에는 모델과 Python 스크립트가 포함되어 있으며, 주로 model.safetensors 파일의 크기입니다. 여기서 놀라운 점은 없어요.

usr 폴더에는 Python 코드를 실행하는 데 필요한 종속성이 포함되어 있어요. 폴더 안에 무엇이 있는지 살펴보겠습니다.


- 5.3G /usr/local/lib/python3.9/dist-packages/
- 2.9G /usr/local/lib/python3.9/dist-packages/nvidia
- 1.6G /usr/local/lib/python3.9/dist-packages/torch
- 439M /usr/local/lib/python3.9/dist-packages/triton
- 77M /usr/local/lib/python3.9/dist-packages/transformers
- 53M /usr/local/lib/python3.9/dist-packages/sympy
- ...


5.9G 중 5.3G는 Python 모듈을 위한 것입니다. 가장 큰 패키지는 다음과 같습니다:



- 3.0 GB — nvidia (cuda, cudnn, cublas, 등)
- 1.6 GB — torch
- 0.4 GB — triton

nvidia와 triton 모듈은 torch에 종속됩니다. GPU에서 추론을 실행하려면 nvidia 모듈이 필요합니다. 다시 말해, transformers 모듈을 실행하기 위해서 torch 모듈이 필요합니다. 아래 다이어그램은 언급된 모듈이 전체 이미지에 기여하는 방식을 보여줍니다.

![Diagram](/assets/img/2024-05-15-ReducingtheSizeofDockerImagesServingLargeLanguageModelspart1_1.png)

GPU에서 추론을 실행하려면 이미지 크기를 크게 줄일 수 있는 방법은 없습니다. 그러나 GPU 추론 대신 ONNX [4] 및 양자화를 사용하여 Docker 이미지 크기를 최대 10배 줄일 수 있습니다.



# ONNX 모델을 포함한 Docker 이미지

int8 양자화가 적용된 ONNX는 성능 손실이 거의 없는 채 모델 크기를 4배로 축소할 수 있습니다 [5]. 다른 장점은 Docker 이미지의 크기를 최대 10배 줄일 수 있다는 것입니다. 이것이 어떻게 가능한 걸까요? ONNX 모델의 Docker 이미지를 빌드하는 데 필요한 작업을 살펴보겠습니다:

다음은 onnxruntime을 사용하여 추론을 실행하는 Python 코드입니다:

먼저, 이미지를 빌드하고 크기를 비교해 보겠습니다. 그런 다음, 이와 이전 이미지 간의 차이를 분석하겠습니다.



```js
도커 빌드 -t language_detection_onnx . -f Dockerfile_onnx
```

… 그리고 이미지를 실행하세요:

```js
도커 실행 -p 8000:8000 language_detection_onnx
```

이미지의 크기를 비교해봅시다:



```js
도커 이미지 | grep language_detection
```

출력:

```js
language_detection_cuda    latest   47f4c1c0de2d   33분 전   7.05GB
language_detection_onnx    latest   3086089bd994   9시간 전    699MB
```

7.05 GB 대 699 MB — 이것은 정말로 10배 작은 도커 이미지입니다. 이게 어떻게 가능했을까요?



세 이미지 사이에는 세 가지 주요 차이점이 있습니다.

## 1. 베이스 도커 이미지

대신 nvidia/cuda:11.8.0-base-ubuntu22.04를 사용하는 대신에 훨씬 작은 베이스 도커 이미지 python:3.9-slim을 사용했습니다. 첫 번째 이미지에는 GPU에서 추론을 실행하는 데 필요한 모든 Nvidia 라이브러리가 포함되어 있습니다 (CUDA, cuDNN, cuBLAS). ONNX 및 양자화된 모델로 추론을 실행하기 위해서는 GPU가 필요하지 않습니다. 따라서 Nvidia 라이브러리가 필요하지 않습니다.

## 2. Python 모듈



토치 대신 NVIDIA와 Triton 모듈이 필요 없는 ONNX Runtime을 사용했습니다. 이렇게 하면 세 개의 큰 Python 모듈을 제거할 수 있었어요.

## 3. ONNX 형식의 양자화된 모델

마지막으로 중요한 차이점은 ONNX 형식으로 변환된 양자화된 모델을 사용했다는 것입니다 [3]. model_quantized.onnx 파일은 279 MB로, 원본 모델 크기의 4분의 1 크기입니다.

# 결론



양자화된 ONNX를 사용하면 제품 이미지의 크기를 최대 10배까지 줄일 수 있어요.

어떤 경우에는 제품 모델의 크기가 과도한 모델 성능보다 중요할 수 있어요. 그런 경우에는 모델 양자화와 ONNX 형식으로 전환하는 것이 도움이 될 수 있어요. 양자화는 Docker 이미지의 크기를 줄일 뿐만 아니라 CPU를 사용하는 인스턴스보다 GPU를 사용하는 인스턴스보다 비용을 줄일 수 있어요. 그럼에도 결정은 여러 요인에 기반해야 해요 - 해결해야 하는 문제, 예상 성능, 예상 추론 시간, 양자화된 모델에 대한 성능 손실, 그리고 제품 환경의 구성 등을 고려해야 해요.

# 문제 해결

도커 이미지를 --gpus 매개변수와 함께 실행하는 중 문제가 발생하면 다음을 확인해보세요:



- Nvidia 컨테이너 툴킷 설치

```js
sudo apt install nvidia-container-toolkit
```

2. 도커 서비스 재시작

```js
sudo systemctl restart docker
```



다음 명령은 GPU에 관한 정보를 출력해야 합니다:

```js
docker run --gpus all nvidia/cuda:11.8.0-base-ubuntu22.04 nvidia-smi
```

# 참조

[1] https://github.com/CodeNLP/codenlp-docker-ml



[2] [papluca/xlm-roberta-base-language-detection](https://huggingface.co/papluca/xlm-roberta-base-language-detection)

[3] [protectai/xlm-roberta-base-language-detection-onnx](https://huggingface.co/protectai/xlm-roberta-base-language-detection-onnx)

[4] [ONNX](https://onnx.ai/)

[5] [Reducing Inference Time of T5 Models](https://medium.com/codenlp/reducing-inference-time-of-t5-models-76e996523fb2?sk=f02379f5a8363d2de73a332fcef55f78)