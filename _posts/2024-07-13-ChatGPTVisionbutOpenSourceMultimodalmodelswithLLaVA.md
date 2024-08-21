---
title: "ChatGPT Vision 오픈소스 대안 LLaVA로 멀티모달 모델 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-07-13-ChatGPTVisionbutOpenSourceMultimodalmodelswithLLaVA_0.png"
date: 2024-07-13 21:22
ogImage:
  url: /assets/img/2024-07-13-ChatGPTVisionbutOpenSourceMultimodalmodelswithLLaVA_0.png
tag: Tech
originalTitle: "ChatGPT Vision but Open Source: Multimodal models with LLaVA"
link: "https://medium.com/generative-ai/chatgpt-vision-but-open-source-multimodal-models-with-llava-70f7e584fe7a"
isUpdated: true
---

![image](/assets/img/2024-07-13-ChatGPTVisionbutOpenSourceMultimodalmodelswithLLaVA_0.png)

안녕하세요!

큰 언어 모델(LLMs)의 세계는 매우 빠르게 발전하고 있으며, 다중 모달 모델이 가장 유망한 전망 중 하나입니다. 가장 흥미로운 도구 중 하나는 현재 Plus 및 Enterprise 사용자를 대상으로 롤아웃 중인 ChatGPT Vision입니다. 그러나 오픈에어이가 가지고 있는 제한 사항에 모두가 호의적이라고 할 수는 없습니다. 이 게시물은 LLM 영역의 최신 진전 사항에 대해 탐구하고, 이미지 상호 작용을 원활하게 제공하는 오픈 소스 경쟁자인 LLaVA를 소개합니다.

## 지금까지의 과정

이제 대부분의 사람들은 2022년 11월 30일에 프로토 타입으로 출시된 ChatGPT의 탁월한 성공 이야기에 익숙해졌습니다. 2023년 1월까지 1억 명 이상의 사용자를 확보했습니다*. 2023년 3월에는 GPT-4 개발자 라이브 스트림에서도 LLM이 이미지와 상호 작용할 수 있는 방법을 소개했습니다. 이로써 다중 모달성의 뚜렷한 잠재력이 밝혀졌습니다. 그 이후로 사람들은 비전 기능을 차분히 기다렸습니다. 9월 25일부터 이제 "ChatGPT는 이제 보고, 듣고, 말할 수 있습니다"*.

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

트위터에서 검색하면 이 기술을 활용한 가장 인기 있는 실험 중 일부는 주차 규칙 이해(6.7 백만 조회), 디자인에서 인터페이스용 코드 생성(1.3 백만 조회), 또는 수학 공식을 코드로 변환(2.6 백만 조회)하는 것이었습니다. 여기에는 또 다른 사용 사례 컴필레이션이 있습니다. 이러한 쇼케이스를 단순히 단계별 진전만 있는 좋은 실험으로 여기기 쉽지만, 작업에 맞게 조정된 딥러닝 이미지 모델은 매우 오랜 시간 동안 초인적 정확도로 특징 지은 바 있었으며, 어떤 사용자 경험 디자이너라도 매끄러운 경험을 만드는 데 추가 작업이 얼마나 필요한지 얘기할 수 있습니다.

그러나 ChatGPT Vision을 통해 쉬운 채팅 인터페이스로 이 기술에 넓은 사용자에게 접근할 수 있습니다. 더욱 중요한 장점 중 하나는 이미지가 이제 LLM에 의미론적으로 부호화된 방대한 지식 체계와 얽혀 있다는 것입니다. 아래에서는 다이스의 점들을 세는 예시를 보여줍니다. 다섯 년 전에는 OpenCV, 컴퓨터 비전 라이브러리를 쇼케이스하고 원을 감지하는 블로그 게시물이었지만, 오늘날에는 모델에게 완전히 명확히 주사위 이미지가 표시되었음을 알려줬습니다.

또 다른 주목할 만한 관측 결과는 LLM이 이미지의 언어 지침을 추가할 때 사용하는 경우, 즉, 삽입의 가능성이 드러납니다.

명백하게, ChatGPT Vision에는 환상적인 가능성이 있습니다. 그러나 OpenAI에 의존하는 것에는 비용, 프라이버시 및 사용자 정의 옵션과 같은 몇 가지 단점이 있습니다. 작성 시점에서는 웹사이트를 통해서만 사용할 수 있고 API를 통해 사용할 수 없습니다.

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

## LLaVA 소개

LLaVA (Large Language-and-Vision Assistant)는 위스콘신 대학-매디슨, Microsoft Research, 그리고 콜럼비아 대학의 Haotian Liu, Chunyuan Li, Qingyang Wu, Yong Jae Lee가 개발한 다중 모달 모델로, 시각 인코더와 Vicuna를 결합하여 일반적인 시각 및 언어 이해를 제공합니다. Vicuna 자체가 Meta(Facebook)의 대형 언어 모델인 LLaMA를 기반으로 한 모델입니다. 모든 이 새로운 이름들이 조금 복잡하게 느껴진다면, 이번 발전에 대한 내 글을 확인해보세요. 중요한 점 하나는 오픈소스 커뮤니티가 빠르게 성장하고 있다는 것입니다. 이를 위한 한 가지 요인은 GPT-4와 같은 폐쇄된 모델들이 오픈 모델들의 훈련 데이터 생성에 사용된다는 것입니다. LLaVA에도 동일한 이유가 적용됩니다.

LLaVA의 첫 릴리즈는 이미 올해 4월 17일에 있었습니다. 10월 5일에는 1.5 버전이 릴리즈되었는데, 이 버전은 상당히 적은 양의 공개 데이터를 활용하여 다양한 벤치마크에서 최신 성능을 보여주었습니다. 이에 대한 관심이 상당히 크게 일어났는데, 아래의 Star History에서 확인할 수 있습니다:

![LLaVA 발표](/assets/img/2024-07-13-ChatGPTVisionbutOpenSourceMultimodalmodelswithLLaVA_1.png)

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

LLaVA를 실행 중입니다. 저자들은 멋진 gradio 인터페이스를 제공하고 온라인에서 호스팅하여 직접 시도할 수 있게 했습니다. 데모 목적으로, 아래에 사진을 시도해 보았어요. 앞서 말한 대로, 이는 다섯 년 전에 작성된 다른 블로그 글에서의 내용으로, 주사위의 무작위성을 분석하고 여러 이미지 조작을 포함했던 것입니다.

![image](/assets/img/2024-07-13-ChatGPTVisionbutOpenSourceMultimodalmodelswithLLaVA_2.png)

모델은 이미지에서 무엇인지 감지하는 데는 꽤 잘하나, 정확한 점 수를 제공하지 못하고 주사위를 중앙이 아닌 왼쪽에 위치시키는 데 실패했습니다.

비교를 위해 동일한 질문을 제기할 때, GPT-4는 올바른 숫자를 식별하여 뚜렷한 품질차를 강조했습니다.

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

설치. 만약 자체 하드웨어에서 작업을 실행하고 싶다면, GitHub의 설치 지침은 비교적 직관적입니다. 하지만 실행하는 데는 제 경우에 3번의 시도가 필요했습니다.

첫 번째 시도에서 M1-Mac에서는 설치가 완료되었고 서버를 시작할 수 있었지만 추론 중에 문제가 발생했습니다. ' — device mps'로 장치를 설정했음에도 불구하고 CUDA 지원과 관련이 있는 것 같아요.

그리고 Windows에서는 Microsoft의 DeepSpeed 의존성을 설치하지 못했습니다. 이것은 아직도 꽤 부서지기 쉬워 보입니다. 네, 이것은 Windows보다 Linux에서 더 잘 작동하는 것 같은 Microsoft의 라이브러리입니다.

세 번째로, Windows의 WSL (Ubuntu-22.04)을 통해 일부 조정을 통해 마침내 작동했습니다. 간단히 말해서, WSL 내에서 CUDA 드라이버를 설치해야 하며, 여기를 참고하십시오. 그리고 libcuda를 찾을 수 없어 오류가 발생하면 여기를 참고하십시오.

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

그라디오 서버를 시작할 때는 반드시 동시에 실행되는 세 가지 스크립트를 시작해야 합니다. (1) 컨트롤러, (2) 웹 서버, 그리고 (3) 추론을 수행하는 모델 워커입니다. Windows에서는 WSL을 위해 세 개의 명령 창이 필요합니다. 각각에서는 콘다 환경이 활성화되어 있어야 합니다. 제 경우에는 2080 Ti GPU(16GB VRAM)를 사용하는 4비트 양자화된 버전을 사용했습니다. LLaVA는 양자화된 비트로 시작할 수 있으며, 전체 모델에 충분한 메모리가 없는 경우 GPU 메모리를 적게 차지하는 축소된 모델을 사용할 수 있습니다. 마지막으로, 다음과 같은 시작 명령을 사용했습니다:

```js
python -m llava.serve.model_worker --host 0.0.0.0 --controller http://localhost:10000 --port 40000 --worker http://localhost:40000 --model-path liuhaotian/llava-v1.5-13b --load-4bit
```

서버를 시작할 때, Weight를 다운로드하게 되는데 시간이 걸릴 수 있음을 유의하십시오.

그리고 이제 Colab 노트북을 제공하는 GitHub도 있습니다.

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

CLI 인터페이스. LLaVA에는 명령 줄 인터페이스가 있고, 이것은 정말 유용합니다. 아래는 문서에서 가져온 일부 코드입니다:

```js
python -m llava.serve.cli \
    --model-path liuhaotian/llava-v1.5-7b \
    --image-file "https://llava-vl.github.io/static/images/view.jpg" \
    --load-4bit
```

이것은 정말 멋진데, 이를 서브프로세스로 실행하고 Slack 웹훅에 연결해 로컬 ChatGPT-Vision 클론을 만들어볼 수도 있습니다.

사용자 정의성. 저자들은 사용자 정의 데이터로 훈련하는 방법에 대한 지침을 공유하기도 해서 여러분의 데이터에 맞게 맞춤화할 수 있는 많은 공간을 제공합니다. 이는 허용적인 Apache 2.0 라이선스로 이루어져 있어 LLaVA로 무언가를 만드는 데 즉각적인 제약이 없습니다.

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

## 기술적인 측면

그렇다면, 커튼 뒤에서 무슨 일이 벌어지고 있을까요? 아키텍처 관점에서, 하나는 컴퓨터 비전 변형기 CLIP ViT-L/336px와 언어 모델인 Vicuna 1.5 13 B를 MLP 기반의 비전-언어 커넥터를 통해 결합합니다.

중요한 도전 과제는 이미지를 LLM에서 인식 가능한 시퀀스로 인코딩하는 것에 있습니다. 논문에서 이것은 시각적 지시 조정으로 설명됩니다. 먼저 이미지를 가져와 이미지의 캡션 및 이미지 내부 객체 및 각각의 경계 상자와 같은 두 가지 유형의 맥락을 추출합니다. 논문의 표 1은 이렇게 보이는 예시를 제공합니다. 이를 통해 이미지가 텍스트로 전환되고 해당 텍스트를 사용하여 언어 모델을 프롬프트할 수 있습니다. 이 경우 GPT-4가 텍스트-이미지와 대화하고 사진에 대한 질문을 하도록 사용됩니다.

저자들은 수동으로 설계된 초기 예제를 시작으로, GPT-4로 데이터 수집 과정을 확장하기 위한 프롬프트 엔지니어링 기술인 인-컨텍스트 학습을 사용합니다. 이를 통해 대화, 상세 설명 및 복잡한 추론의 세 가지 유형을 가진 158,000개의 고유한 이미지-텍스트 지시-따르기 샘플이 생성됩니다.

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

마지막으로, LLaVA는 ~6시간의 사전 학습과 ~20시간의 시각 지시 조정을 8대의 A100에서 진행했습니다. Computcost 측면에서는 예를 들어 8대의 A100 (80GB)이 시간당 $12에 비용이 들었던 Lambda Labs에서 수백 달러 정도밖에 들지 않을 것입니다.

## 요약

적합한 하드웨어가 제공되면 LLaVA는 사용 준비된 멀티모달 모델을 제시합니다. 이 소규모 테스트에서 ChatGPT Visual만큼 성능이 좋지 않았지만 직접 실행하고 학습할 수 있는 기회와 CLI 인터페이스로 인해 흥미로운 대안이 될 것입니다.

LLM 분야에서 LLaVA는 폐쇄 소스 모델이 오픈 소스 상대 모델용 훈련 데이터를 효율적으로 생성하는 방법을 보여주는 사례입니다.

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

<img src="/assets/img/2024-07-13-ChatGPTVisionbutOpenSourceMultimodalmodelswithLLaVA_3.png" />

이 이야기는 Generative AI에서 발행되었습니다. LinkedIn에 연결하여 최신 AI 이야기와 통찰력을 피드에서 받아보세요. 함께 AI의 미래를 함께 만들어요!

<img src="/assets/img/2024-07-13-ChatGPTVisionbutOpenSourceMultimodalmodelswithLLaVA_4.png" />
