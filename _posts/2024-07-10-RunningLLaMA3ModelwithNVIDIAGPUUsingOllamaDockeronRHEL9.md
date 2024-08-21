---
title: "NVIDIA GPU로 Ollama Docker를 사용해 RHEL 9에서 LLaMA 3 모델 실행하는 방법"
description: ""
coverImage: "/assets/img/2024-07-10-RunningLLaMA3ModelwithNVIDIAGPUUsingOllamaDockeronRHEL9_0.png"
date: 2024-07-10 02:42
ogImage:
  url: /assets/img/2024-07-10-RunningLLaMA3ModelwithNVIDIAGPUUsingOllamaDockeronRHEL9_0.png
tag: Tech
originalTitle: "Running LLaMA 3 Model with NVIDIA GPU Using Ollama Docker on RHEL 9"
link: "https://medium.com/@blackhorseya/running-llama-3-model-with-nvidia-gpu-using-ollama-docker-on-rhel-9-0504aeb1c924"
isUpdated: true
---

![이미지](/assets/img/2024-07-10-RunningLLaMA3ModelwithNVIDIAGPUUsingOllamaDockeronRHEL9_0.png)

NVIDIA GPU의 성능을 활용하여 AI 및 머신러닝 작업을 수행하면 성능을 크게 향상시킬 수 있습니다. 본 안내서에서는 Ollama Docker를 사용하여 Red Hat Enterprise Linux (RHEL) 9 시스템에서 LLaMA 3 모델을 실행하고 NVIDIA GPU를 활용하여 처리 성능을 향상시키는 방법에 대해 안내합니다.

# 소개

NVIDIA 드라이버와 CUDA 툴킷을 포함한 적절한 설정을 통해 GPU에서 대규모 언어 모델(LLMs)을 실행할 수 있습니다. 이 글에서는 RHEL 9.3 워크스테이션에서 이를 어떻게 구현할 수 있는지 자세히 안내합니다.

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

# 준비 사항

다음 사항이 준비되어 있는지 확인하세요:

- NVIDIA 드라이버 및 CUDA 툴킷이 설치되어 있어야 합니다.

워크스테이션 사양:

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

- OS: RHEL 9.3
- RAM: 128GB
- CPU: i9-12900K (16 cores, 24 threads)
- GPU: NVIDIA RTX 4060 Ti 16GB

이 세팅에서는 MacBook에서 SSH를 통해 워크스테이션에 액세스할 예정입니다.

# 단계별 안내

# 1. 환경 준비하기

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

먼저, NVIDIA 드라이버와 CUDA 툴킷이 설치되어 있는지 필요한 요구 사항을 충족시키는지 확인하세요.

## 2. Ollama 도커 실행

Ollama 도커 컨테이너는 CPU 또는 GPU를 활용하고자 하는지에 따라 다양한 모드에서 실행할 수 있습니다. 시작하는 방법은 다음과 같습니다:

### CPU 전용 버전으로 시작하기

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

일단 모든 것이 올바르게 설정되었는지 확인하기 위해 CPU 전용 버전을 실행하는 것이 좋을 수 있어요:

```js
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

이 명령은 Docker 컨테이너를 데몬 모드로 실행하고, 모델 저장을 위한 볼륨을 마운트하며, 포트 11434를 노출합니다.

환경을 깔끔하게 유지하고 초기에 볼륨을 마운트하지 않으려면 다음을 사용할 수 있어요:

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

```shell
도커 명령을 수정하여 GPU를 활용하여 성능을 향상시키려면 다음과 같이 변경하실 수 있어요:

docker run -it --rm --gpus=all -v /home/ollama:/root/.ollama:z -p 11434:11434 --name ollama ollama/ollama

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

이 명령은 도커 컨테이너가 사용 가능한 모든 GPU에 액세스하고 SELinux 권한을 처리하기 위해 /home/ollama 디렉토리를 모델 저장소로 마운트합니다.

# 3. 모델 다운로드 및 실행

Ollama 도커 컨테이너가 작동 중인 상태에서, 다음 단계는 LLaMA 3 모델을 다운로드하는 것입니다:

docker exec -it ollama ollama pull llama3

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

다운로드를 완료한 후에는 사용 가능한 모델을 나열하고 원하는 모델을 실행할 수 있어요:

docker exec -it ollama ollama list
docker exec -it ollama ollama run llama3

# 4. 세팅 테스트

모델을 테스트하려면 curl 명령어를 사용하여 API에 요청을 보낼 수 있어요:

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

curl http://localhost:11434/api/generate -d '{
"model": "llama3",
"prompt": "다음은 대만의 다섯 가지 맛있는 음식을 나열해주세요.",
"stream": true,
"options": {
"seed": 123,
"top_k": 20,
"top_p": 0.9,
"temperature": 0
}
}'

# 요약

이러한 단계를 따르면 NVIDIA GPU 가속을 사용하여 RHEL 9 시스템에 LLaMA 3 모델을 실행할 수 있습니다. 이 설정은 AI 및 기계 학습 작업에서 GPU를 활용할 때 성능 향상 가능성을 보여줍니다. CLI 명령 또는 API 호출을 통해 추가 응용 프로그램 및 통합을 탐색할 수 있게 되었습니다.
```
