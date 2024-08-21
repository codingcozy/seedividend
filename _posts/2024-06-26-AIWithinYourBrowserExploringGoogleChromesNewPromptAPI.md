---
title: "브라우저에서 AI 활용하기 2024년 Google Chrome의 새로운 Prompt API 탐구"
description: ""
coverImage: "/assets/img/2024-06-26-AIWithinYourBrowserExploringGoogleChromesNewPromptAPI_0.png"
date: 2024-06-26 12:20
ogImage:
  url: /assets/img/2024-06-26-AIWithinYourBrowserExploringGoogleChromesNewPromptAPI_0.png
tag: Tech
originalTitle: "AI Within Your Browser: Exploring Google Chrome’s New Prompt API"
link: "https://medium.com/@muthuishere/ai-within-your-browser-exploring-google-chromes-new-prompt-api-a5c2c6bd5b4c"
isUpdated: true
---

브라우저에서 강력한 AI를 직접 사용할 수 있다면 어떻겠어요? WebGPU와 유사하지만 크롬이 모든 것을 처리해줍니다. 외부 서비스에 의존하거나 서버를 설정하거나 대용량 파일을 다운로드할 필요가 없어요. 이겔 시작하려고 600MB 모델을 다운로드하는 것이 아니에요. 이것은 브라우저에서 직접할 수 있는 것을 재정의하는 혁신적인 방법입니다.

구글 크롬의 새로운 실험적 기능인 Gemini Nano용 Prompt API는 브라우저 내 AI 도구의 미래를 엿보게 해줍니다. 텍스트 요약, 문장 재구성, 정보 분류 등의 빠르고 간편한 작업에 뛰어나며 온라인에서 읽는 모든 것에 빠르게 통찰을 추가하는 데 완벽합니다. 그러나 이 도구는 코드를 다른 프로그래밍 언어로 변환하는 등 더 복잡한 작업을 위해 만들어진 것이 아닙니다. 더 간단한 응용에 대한 기능은 인상적이지만, 보다 요구되는 도전에는 한계가 있습니다.

다음은 설정하는 방법입니다:

- 최신 버전의 Google Canary를 다운로드합니다.
- 주소 표시줄에 `chrome://flags`를 입력합니다.
- "Prompt API for Gemini Nano"를 찾은 후 설정을 'Enabled'로 변경합니다.

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

<img src="/assets/img/2024-06-26-AIWithinYourBrowserExploringGoogleChromesNewPromptAPI_0.png" />

- "Enables optimization guide on device"을 검색하여 'Enabled'로 설정하세요.

<img src="/assets/img/2024-06-26-AIWithinYourBrowserExploringGoogleChromesNewPromptAPI_1.png" />

- '다시 시작' 버튼을 클릭하여 브라우저를 다시 시작하세요.
- 브라우저를 다시 열면 주소 표시줄에 `chrome://components/`을 입력한 후 "Optimization Guide On Device Model"을 찾고 '업데이트 확인'을 클릭하세요.

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

아래의 코드를 Markdown 포맷으로 변경하였습니다.

![이미지](/assets/img/2024-06-26-AIWithinYourBrowserExploringGoogleChromesNewPromptAPI_2.png)

이미지가 다운로드를 시작하는 것을 확인할 수 있습니다. 다운로드가 완료될 때까지 기다려주세요.

지금 모든 것이 작동되는 것을 보려면:

- 개발자 도구를 여는 방법: 웹페이지에서 개발자 도구를 열고, 프롬프트를 사용할 세션을 설정하세요.

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
const session = await window.ai.createTextSession();
```

- 질문을 해주세요

```js
session.prompt("아재 개그 하나 알려줄래?").then(console.log);
```

웃음이 절로 나올 수도 있어요.

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

<img src="/assets/img/2024-06-26-AIWithinYourBrowserExploringGoogleChromesNewPromptAPI_3.png" />

우리는 이러한 함수로 우리의 JS 앱을 통합할 수 있어요

```js
async function getAnswer(question) {
  try {
    const session = await window.ai.createTextSession();

    const aiResponse = await session.prompt(question);

    return aiResponse;
  } catch (e) {
    throw new Error("세션 생성 중 오류 발생, AI가 활성화되지 않았습니다.");
  }
}
```

작은 Next.js 앱은 https://chrome-llm-local-nextjs-git-main-muthukumaran-ns-projects.vercel.app/ 에서 이용 가능합니다.

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

<img src="/assets/img/2024-06-26-AIWithinYourBrowserExploringGoogleChromesNewPromptAPI_4.png" />

깃허브에서 소스 코드를 확인하세요: https://github.com/muthuishere/chrome-llm-local-nextjs

현재 Gemini Nano용 Prompt API는 Google Chrome Canary에서 실험적인 기능으로 제공됩니다. 더 넓은 Chrome 릴리스로 넘어가거나 그렇지 않을 수도 있지만, 이 이니셔티브는 더욱 개인 정보 보호가 강화된 효율적인 웹 상호작용을 위한 중요한 한 걸음입니다. Google은 브라우저 내에서 AI를 직접 실행함으로써, 데이터가 기기를 벗어나지 않고도 유용한 AI 기반 통찰력을 생성하는 미래로 향하는 길을 열어두고 있습니다. 이는 개인 정보 보호를 향상시키는 것뿐만 아니라 더 빠른 응답 시간을 보장하기도 합니다. 이 기능을 오늘 실험해 보면 브라우저 능력의 잠재력을 보다 명확하게 볼 수 있을 것입니다. 로컬 모델이 매일의 디지털 상호작용을 혁신시키면서도 데이터 보안을 희생하지 않을 수 있는 브라우저 능력의 잠재적 미래를 엿볼 수 있습니다.
