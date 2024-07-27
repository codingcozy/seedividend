---
title: "NanoLlava 가장 작은 시각적 언어란"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-NanoLlavaisthesmallestVisualLanguage_0.png"
date: 2024-07-09 15:02
ogImage:
  url: /assets/img/2024-07-09-NanoLlavaisthesmallestVisualLanguage_0.png
tag: Tech
originalTitle: "NanoLlava is the smallest Visual Language"
link: "https://medium.com/generative-ai/nanollava-is-the-smallest-visual-language-9b89b139eadf"
---

![이미지](/TIL/assets/img/2024-07-09-NanoLlavaisthesmallestVisualLanguage_0.png)

요즘 뉴스에는 시각 언어 모델이 많이 등장하고 있어요. 지난 몇 일간의 발표 속에 믿기 어려운 소식이 많았는데, 이미지를 통해 대화를 하려면 돈을 내야 할까요?

GPT-4o, Gemini-flash, PaliGemma, Copilot+PC… 이 모든 것이 1주일 안에 나왔어요!

아무도 알지 못했지만 Abetlen이 GGUF 버전의 가장 작은 언어 모델인 TINIEST을 출시했다는 사실이죠.

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

전체 모델은 NanoLlava를 만나실 수 있는 컴퓨터의 2GB 하드 디스크 공간에 저장됩니다.

이 기사에서는 모델을 양자화하여 어떤 컴퓨터에서도 실행하는 방법을 배우게 될 것입니다. 전용 GPU 없이도 작업을 완료할 수 있습니다.

```js
# 목차
---
작고 강력한 모델
모델을 시각적으로 만드는 것은 무엇인가요?
PC에서 NanoLlava
 - 환경 설정
Inference call - textual
Streamlit Application
```

# 작고 강력한

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

나노라바는 Sub 1B 비전-언어 모델입니다. 네, 정확히 들으셨어요! GPT-4o 수행능력을 기대하지 마세요 (그렇게 할 수는 있지만, ...혹은 소유중인 경우에만 가능합니다.)
