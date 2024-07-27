---
title: "한 번의 클릭으로 LLMs가 현실이 되다 - 휴대 가능한 AI로 가는 길 두 번째 이야기"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-One-clickLLMsarenowarealityRoadtoportableAIpart2_0.png"
date: 2024-07-09 14:52
ogImage:
  url: /assets/img/2024-07-09-One-clickLLMsarenowarealityRoadtoportableAIpart2_0.png
tag: Tech
originalTitle: "One-click LLMs are now a reality. Road to portable — AI part 2"
link: "https://medium.com/generative-ai/one-click-llm-are-now-reality-road-to-portable-ai-part-2-04e54702a195"
---

두 가지 이전 기사에서는 특정 버전의 이식 가능한 Python을 만드는 방법과 LlamaFile을 사용하는 방법에 대해 알아보았어요.

그런데 LlamaFile에는 GGUF 모델과 런타임을 함께 패키지로 묶는 것을 가능케 하는 몇 가지 특별한 기능이 있어요.

이 기사에서는 Method 2를 사용하는 방법을 배워보려고 해요— 아주 작지만 매우 강력한 qwen-1.5-chat-0.5b의 .exe 파일을 생성하는 방법을 배울 거예요. Qwen05.exe를 실행하면 기존 애플리케이션에 대해 준비된 OpenAI 호환 API 서버가 시작돼요!

![이미지](/TIL/assets/img/2024-07-09-One-clickLLMsarenowarealityRoadtoportableAIpart2_0.png)

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

여기에서 다루게 될 내용입니다:

```js
사용 사례
필요한 도구
Qwen05.exe 만들기 및 실행하기
기존 파이썬 사용하여 실행하기
Streamlit GUI?
```

# 사용 사례

제가 LlamaFile을 파헤치기 시작한 이유는 회사에서 거의...
