---
title: "당신만의 개인 복사 편집기 LangChainjs와 일렉트론을 이용해 LLM 지원 앱 만들기"
description: ""
coverImage: "/assets/img/2024-05-14-YourPersonalCopyEditorBuildaLLM-backedAppUsingLangChainjsandElectron_0.png"
date: 2024-05-14 15:17
ogImage: 
  url: /assets/img/2024-05-14-YourPersonalCopyEditorBuildaLLM-backedAppUsingLangChainjsandElectron_0.png
tag: Tech
originalTitle: "Your Personal Copy Editor: Build a LLM-backed App Using LangChain.js and Electron"
link: "https://medium.com/better-programming/llm-backed-desktop-app-from-poc-to-mvp-843d71061e45"
isUpdated: true
---




![이미지](/assets/img/2024-05-14-YourPersonalCopyEditorBuildaLLM-backedAppUsingLangChainjsandElectron_0.png)

자바스크립트를 사용하여 LLM을 백엔드로 지원하는 앱을 작성한다니, 미친 생각일 수도 있죠? 사실 LangChain과 같은 외부 API와 라이브러리에 크게 의존하는 앱에는 파이썬 대신 자바스크립트를 사용하는 것이 혜택이 있습니다. 기존의 웹 앱 모델에서는 HTML/CSS/JS 프론트엔드와 원하는 서버 측 언어를 사용한 백엔드를 개발해야 합니다. 그러나 LangChain과 js-tiktoken과 같은 LLM을 다루는 자바스크립트 라이브러리들이 등장하면서, 이제는 백엔드 계층 없이 AI 기능이 탑재된 앱을 만들 수 있습니다.

객관적으로 말하자면, 완전한 클라이언트 측 접근 방식을 선택하면 기능이 제한될 수 있습니다. 하지만 완전한 클라이언트 측 응용프로그램을 견고한 Electron 데스크톱 프레임워크와 결합하면, 이러한 제약이 많이 해결됩니다. Electron을 사용하면 프론트엔드 웹 앱을 크로스 플랫폼 데스크톱 앱으로 패키징할 수 있고, 여러 플랫폼의 앱 스토어에 배포할 수 있습니다.

일반적으로 웹 앱에서 기대되는 계정 관리와 같은 기능들은 데스크톱 공간에서 선택사항이 됩니다. 게다가 호스트 운영 체제와 상호 작용하는 네이티브 플러그인에 액세스할 수 있어, 일반적인 웹 앱의 한계를 벗어나 앱을 확장할 수 있습니다.



이 기사에서는 LLM을 백업하는 응용 프로그램의 자바스크립트 POC(Concept(POC)) 구현물을 포괄적인 데스크톱 경험으로 전환하는 과정을 살펴볼 것입니다. 이 기사에서 논의된 코드는 오픈 소스이며 MIT 라이선스에 따라 라이선스가 부여되었으므로 자유롭게 사용하거나 더 나아가 포크하고 개선 또는 향상시킬 수 있습니다.

이 아이디어가 발생한 것은 ChatGPT에 기사를 수동으로 복사하고 붙여넣기 하는 것에 지쳤을 때였습니다. Python에서 LangChain을 사용해본 경험이 있었기 때문에 간단한 단일 페이지 React 앱을 만들어 보았습니다. 이 앱은 입력된 텍스트를 가져와 JS로 LangChain을 통해 처리하고 편집된 텍스트를 반환할 수 있는 앱이었습니다. LangChain의 API는 Python 및 JavaScript 구현 간에 매우 유사하여 한 언어에 익숙한 사람이 다른 언어를 탐색하기 쉽습니다. 흥미로운 점은 LangChain 코드가 POC의 가장 쉬운 부분이었습니다. 아래에 LLM 상호작용을 위한 코드가 제공되었습니다.

```js
const openAIApiKey = process.env.REACT_APP_OPENAI_API_KEY;
const modelName =  "gpt-4";
const enc = encodingForModel(modelName);
const chunk_token_size = 1000;
const llm = new ChatOpenAI({modelName: modelName, temperature: 0, openAIApiKey: openAIApiKey});
const promptTemplate = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are an expert copy editor. It is your task to take a piece of an article and proof-read it for grammar and style. Provide a rewritten copy of the article portion back to the human."
    ),
    HumanMessagePromptTemplate.fromTemplate("{input}")
  ])
const chain = new ConversationChain({prompt: promptTemplate, llm: llm});

...

const openAICalls = chunks.map((chunk, idx) => chain.call({input: chunk}));
```

그 다음으로, 나는 사용자 정의 텍스트 청크 알고리즘을 개발했습니다. 문단 중간에 텍스트를 분할하는 것을 피하고 싶었기 때문에 내장된 분할 방법을 활용하여 새 줄을 기준으로 텍스트를 분할했습니다. 이는 문단을 분할하는 대략적인 근사치지만 merseured 분할을 위해 spaCy나 NLTK와 같은 도구에 액세스할 수 없었기 때문에 최선의 선택이었습니다. 그런 다음 분할된 각 문자열을 검토하고 js-tiktoken을 사용하여 토큰 카운트를 계산했습니다. 이 카운트는 분할을 최대 토큰 수로 결합하는 데 사용되었습니다. 이 방법을 통해 문단을 분할하지 않으면서 LLMChain에 개별 호출할 수 있었으며 나중에 완전히 편집된 텍스트로 재조립할 수 있었습니다.



지금까지 총 24시간 동안 자바스크립트 코드를 약 250줄 작성하여 POC를 완성했습니다. 최신 미디엄 기사를 사이트에 붙여넣고 한 번의 버튼 클릭으로 교정된 복사본을 받았을 때, 공유할 가치가 있는 것이 느껴졌어요.

운이 좋게도 제게는 미디엄에 글을 쓰는 친구들이 있어요. 제 간단한 POC를 그들과 공유했는데, 그들은 흥미로워 했어요! 하지만 리액트 코드베이스를 다운로드하고 종속성을 설치하고 적절한 환경 변수로 실행하는 기술적 전문성이 부족했어요. 자체 호스팅 웹 앱보다 더 사용하기 쉬운 제품이 필요했죠.

AI를 기반으로 한 제품을 개발할 때, 초기에 사용자당 비용을 고려하는 게 중요해요. AI 앱에 대한 인기 있는 모델인 소프트웨어 서비스(SaaS)는 사용자 계정을 쉽게 활용할 수 있어서 AI 앱의 경우 효율적이에요. 게다가 사용자가 지불한 것만 액세스 할 수 있도록 보장하는 것도 간단해요. 하지만, 구독의 단점 중 하나는 많은 사용자들이 매달 새로운 앱을 구매해야 할 때 느끼는 피로감이에요.

이 문제를 회피하기 위해 사용자들로부터 자신의 OpenAI API 키를 제공해 달라고 결정했어요. 이 방식이 NextCloud와 같은 다른 오픈 소스 프로젝트에서 성공적으로 작동하고 있다는 것을 봤어요. 이러면 사용자의 AI 사용에 대한 지불을 피할 수 있어요. 또한 API는 사용량에 따라 지불하는 방식으로 운영되어 사용자들이 많은 AI 기반 웹 앱들에서 요구되는 가짜 돈 토큰을 구매할 필요가 없어지는 소비자를 위한 움직임이에요.



내 다른 동료 Medium 작가들이 이 앱을 사업으로 전환하는 기회를 왜 잡지 않았느냐고 의문을 제기했습니다. 컨셉은 탄탄하고 효과적했는데, 왜 나만의 사장이 되지 않았느냐고요? 제 다소 부끄러운 대답은 비즈니스보다 오픈 소스 프로젝트를 관리하는 것이 더 낫다고 느끼기 때문이라고 했습니다. 하지만 이것이 전부가 아니에요. 더 나아가 사용자들이 매월 구독을 해야 하는 것 없이 강력한 AI 작성 능력에 접근할 수 있는 도구를 제공하기를 목표로 했습니다. 2008년 이후로 오픈 소스 소프트웨어의 능동적인 사용자로서, 개인이나 소규모 그룹이 중요한 영향력을 행사하기 위한 최상의 방법이라고 단정했습니다.

비즈니스 고려는 뒷전으로, 지금은 이 POC를 완전한 OSS 데스크탑 앱으로 발전시키는 방법에 대해 생각할 때입니다. 주로 백엔드 Python 코드를 작성하거나 가끔 JavaScript로 웹 앱을 만드는 개발자로서 Electron은 자연스러운 선택이었습니다. 익숙한 웹 기술로 작업할 수 있을 뿐만 아니라, 리눅스를 포함한 주요 플랫폼에 쉽게 배포할 수 있도록 도와줍니다.

조사를 한 결과, Electron 앱을 만드는 방법이 웹 앱을 만드는 방법만큼 다양하다는 것을 빨리 깨달았습니다. POC는 React와 Material UI 컴포넌트를 사용하여 작성되어 있어서, Electron을 사용하기로 선택한 솔루션에서 계속 사용할 수 있는지가 중요했습니다. 몇 가지 다른 옵션을 테스트한 후, Electron과 React를 사용하여 빌드하기 위한 최상의 해결책은 Electron-React-Boilerplate임을 자신 있게 말할 수 있습니다.

이 프로젝트는 포괄적인 기본 GitHub 저장소를 제공합니다. 추가 개발을 위해 준비된 간단한 웹 앱뿐만 아니라, 각 지원 OS에 대한 코드베이스 테스트를 위한 GitHub Actions, 결과 이진 파일을 빌드하고 게시하는 GitHub 릴리스, 코드 취약점을 스캔하는 등이 포함되어 있습니다. 개발적인 측면에서, 종속성을 설치한 후 npm start 명령어 하나로 프로젝트를 실행시킬 수 있습니다. Electron-React-Boilerplate를 사용하면 훌륭하게 구성된, 견해가 명확한 설정을 채택하고 내 앱을 구축하는 데 집중할 수 있습니다.



다음 단계는 모든 하드 코딩된 매개변수를 React 상태로 변환하여 나중에 설정 패널에 포함할 것입니다. 이에는 이전에 환경 변수를 사용하여 웹 앱으로 전달했던 OpenAI API 키도 포함됩니다. 나는 사용자들이 혼란스러워하지 않도록 설정을 "일반"과 "고급"으로 분류하기로 결정했습니다. 참고용으로 아래 스크린샷을 확인해주세요.

![이미지](/assets/img/2024-05-14-YourPersonalCopyEditorBuildaLLM-backedAppUsingLangChainjsandElectron_1.png)

기본 설정이 정해지면, 나의 초점은 코딩에서 프로젝트의 다른 측면으로 옮겼습니다. 첫 번째 작업은 앱 로고를 만드는 것이었습니다. 예술가는 아니지만, 빠르게 DALL-E에게 로고를 생성하도록 요청하는 OpenAI API 키가 있었기 때문에 로고를 만들었습니다. 그 후 간단한 README를 작성하고 새 로고를 저장소에 추가했습니다.

추가 조정을 통해, 내 POC(Concept화된 개념)를 베타 품질의 데스크탑 앱으로 성공적으로 변형했습니다. 간단한 아이디어를 가져와 사용 가능한 제품으로 발전시켰습니다. POC(Proof of Concept)를 제품으로 발전하는 과정은 절대적으로 간단하지 않지만, 적절한 도구를 갖추면 프로세스를 크게 용이하게 할 수 있습니다. 만약 Python과 JavaScript로 오픈 소스 프로젝트에 작업을 한다면, 유지해야 하는 코드 베이스 수가 두 배로 증가하고 웹 앱을 자체 호스팅하려는 사람들로만 구성되는 대상으로 제한될 것입니다. 그러나 Electron을 이용하면 사람들이 쉽게 다운로드하고 사용할 수 있는 앱을 만들고 배포할 수 있었습니다.



![사진](/assets/img/2024-05-14-YourPersonalCopyEditorBuildaLLM-backedAppUsingLangChainjsandElectron_2.png)

내가 만든 프로젝트는 "편집장(Editor in Chief)"입니다. 많은 사람들에게 정말 유용할 수 있는 잠재력이 있다고 생각해요.

다음 수준으로 나아가는 데 도와주고 싶으세요? 사용해보고 버그 보고서를 제출하고 코드 및 문서를 기여하세요. 어떤 방식으로 상호 작용하든 상관없어요. 꼭 당신을 환영할 거예요.

GPT-4를 활용한 기사 편집과 인공지능 기술을 활용한 작성을 위한 FOSS 솔루션인 '편집장(Editor in Chief)'을 이용해보세요.