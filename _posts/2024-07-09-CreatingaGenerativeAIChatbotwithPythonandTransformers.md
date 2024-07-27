---
title: "파이썬과 트랜스포머로 생성형 AI 챗봇 만들기 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_0.png"
date: 2024-07-09 19:40
ogImage:
  url: /assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_0.png
tag: Tech
originalTitle: "Creating a Generative AI Chatbot with Python and Transformers"
link: "https://medium.com/@tc2017057888/creating-a-generative-ai-chatbot-with-python-and-transformers-1b1353ae91ff"
---

요즘의 디지털 시대에, 챗봇은 간단한 자동응답 도구에서 복잡하고 맥락을 이해하는 대화를 수행할 수 있는 가상 보조로 진화했습니다. 이 글에서는 파이썬과 허깅페이스의 트랜스포머 라이브러리를 사용하여 생성 모델인 GPT-2와 같은 고급 모델을 활용해 AI 챗봇을 구축하는 방법을 살펴보겠습니다.

# 생성식 AI 챗봇 소개

생성식 AI 챗봇은 인공 지능의 중요한 발전을 나타내며, 기업이 고객 지원을 자동화하고 사용자-시스템 상호작용을 향상시키는 데 기여합니다. 미리 정의된 응답에 제한된 규칙 기반 챗봇과는 달리, 생성식 챗봇은 자연어를 이해하고 생성하는 더 현실적인 대화를 할 수 있습니다.

# 사용된 도구 및 라이브러리

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 프로젝트에서는 다음 도구 및 라이브러리를 활용할 예정입니다:

- Python: 다재다능하고 배우기 쉬운 프로그래밍 언어.
- Transformers: 사전 학습된 언어 모델 구현을 제공하는 허깅페이스 라이브러리.
- Flask: Python으로 웹 응용 프로그램을 구축하기 위한 가볍고 효율적인 웹 프레임워크.
- PyTorch: 인공지능 모델을 훈련하고 평가하는 데 사용되는 머신러닝 라이브러리.

# 단계 1: 환경 설정

시작하기 전에 시스템에 Python과 pip이 설치되어 있는지 확인하세요. 그런 다음 터미널에서 다음 명령을 실행하여 필요한 라이브러리를 설치하세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_0.png](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_0.png)

# Step 2: Loading GPT-2 Model and Tokenizer

To begin, import the required libraries and load the pretrained GPT-2 model and its corresponding tokenizer:

![2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_1.png](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_1.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 단계 3: 응답 함수 생성

사용자 입력을 가져와 인코딩하고 GPT-2 모델을 사용하여 응답을 생성하는 함수를 정의하세요:

![image](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_2.png)

# 단계 4: Flask 어플리케이션 설정

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음으로 웹 요청을 처리하고 챗봇을 위한 직관적 인터페이스를 제공하기 위해 Flask 애플리케이션을 설정하세요:

![image1](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_3.png)

![image2](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_4.png)

![image3](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_5.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![사진](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_6.png)

# 단계 5: Flask 앱 실행 및 상호 작용

챗봇 애플리케이션을 실행하려면:

- 위의 Python 코드를 파일에 저장하세요. 예를 들어, chatbot_app.py로 저장합니다.
- 터미널이나 명령 프롬프트를 엽니다.
- chatbot_app.py 파일이 위치한 디렉토리로 이동합니다.
- Flask 애플리케이션을 시작하려면 다음 명령을 실행하세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_7.png)

- 어플리케이션이 시작되면 웹 브라우저를 열고 챗봇과 상호 작용하기 위해 http://127.0.0.1:5000/ 로 이동하세요.

![Image](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_8.png)

![Image](/TIL/assets/img/2024-07-09-CreatingaGenerativeAIChatbotwithPythonandTransformers_9.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 결론

생성형 AI 챗봇은 기업과 사용자가 상호 작용하는 방식을 혁신하고 있습니다. Hugging Face의 Transformers와 같은 고급 도구를 활용하면 자연스럽고 맥락 있는 대화를 이어나갈 수 있는 챗봇을 만들 수 있으며, 이는 사용자 경험을 크게 향상시킵니다.
