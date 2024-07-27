---
title: "Jupyter Lab IDE에서 Typescript, LangChainjs, Ollama를 사용하여 AI 프로토타입 환경 빠르게 구축하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-02-CreateanAIprototypingenvironmentusingJupyterLabIDEwithTypescriptLangChainjsandOllamaforrapidAIprototyping_0.png"
date: 2024-07-02 21:45
ogImage:
  url: /TIL/assets/img/2024-07-02-CreateanAIprototypingenvironmentusingJupyterLabIDEwithTypescriptLangChainjsandOllamaforrapidAIprototyping_0.png
tag: Tech
originalTitle: "Create an AI prototyping environment using Jupyter Lab IDE with Typescript, LangChain.js and Ollama for rapid AI prototyping"
link: "https://medium.com/itnext/create-an-ai-prototyping-environment-using-jupyter-lab-ide-with-typescript-langchain-js-7b395dae3f09"
---

## TypeScript 개발자를 위한 단계별 안내서

![Image](/TIL/assets/img/2024-07-02-CreateanAIprototypingenvironmentusingJupyterLabIDEwithTypescriptLangChainjsandOllamaforrapidAIprototyping_0.png)

# 소개

이 글은 AI 지원 개발에 대한 나의 여정을 설명한 글 시리즈의 두 번째 부분입니다.

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

이 시리즈의 소개 부분에서는 최근 변경 사항을 요약하여 Typescript로 AI 앱을 프로토 타입 및 개발할 수 있도록 하는 내용을 설명했습니다.

첫 번째 부분을 읽지 않으셨나요? 이 프로젝트에 대해 간략히 설명하겠습니다. 앞으로 몇 달 동안 그리고 아마도 몇 년 동안 새로운 AI 모델 및 도구들을 실험하고 배우는 모든 것을 여러분께 보여드리겠습니다. 여러분이 게시물을 통해 제 작업의 중요한 단계를 보고, 이 지식을 여러분의 실무에 적용할 수 있게 될 것입니다.

이 문서에서는 Jupyter Lab IDE를 설치하고 빠른 프로토타이핑 환경을 위한 모든 필수 도구를 설치하는 방법을 안내합니다. 한 번만 설정하면 되며, 모든 단계를 차근차근 설명해드리겠습니다. 이 설정을 마치면 제 미래 실험을 모두 따라할 수 있게 됩니다. (그래서 노력할 가치가 있습니다 :) ).

예를 들어, 이 시리즈의 다음 부분에서는 "텍스트 리뷰어 앱"을 만드는 과정을 자세히 설명할 예정입니다:

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

![image](/TIL/assets/img/2024-07-02-CreateanAIprototypingenvironmentusingJupyterLabIDEwithTypescriptLangChainjsandOllamaforrapidAIprototyping_1.png)

# 내 작업 흐름과 도구

AI 도구 개발을 위해 다음과 같은 작업 흐름을 사용합니다:

- 빠르게 AI 도구를 프로토타입하는 데 사용되는 Typescript 및 Jupyter Lab 기반의 AI 도구 프로토타이핑 환경
- 프로토타입의 코드를 확장하고 이를 기반으로 스토어를 생성합니다. React 앱에서는 Zustand React 스토어를 사용하고, Angular에서는 NgRx의 SignalStore를 사용하며, Jupyter Lab에서는 Zustand Vanilla 스토어를 사용합니다. 이러한 스토어 솔루션들은 많은 공통점을 가지고 있어서 동일한 선택자, 이펙트 및 업데이터 코드를 재사용할 수 있습니다.
- Angular 또는 React 앱 또는 Nx 모노레포에서 스토어를 사용하는 스마트 컴포넌트를 구축합니다. React 앱에서는 Shadcn UI를 사용하고, Angular 앱에서는 Shadcn 기반의 spartan/ui를 사용하여 Angular 및 React 모두에서 거의 동일한 앱 아키텍처를 사용할 수 있습니다.

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

제 Typescript 기반 AI 도구 프로토타이핑 환경에서 가장 중요한 도구들은 다음과 같아요:

- Jupyter Lab: 웹 기반 대화형 개발 환경
- Deno Typescript/Javascript 커널: Jupyter 노트북에서 Typescript로 Jupyter 노트북을 생성할 수 있게 해줘요
- Ollama: 로컬로 LLMs 실행할 수 있는 도구
- Langchain: 언어 모델을 활용한 응용 프로그램을 개발할 수 있는 프레임워크

아래의 패키지 관리자를 설치하고 가장 중요한 명령어를 설명할거에요:

- Chocolatey: Windows 소프트웨어 관리 솔루션, Python과 Deno를 설치하는 데 사용됩니다
- Python 패키지 설치 관리자 (pip): Python 기반 패키지를 설치하는 데 사용되며, Jupyter Lab과 같은 Python 기반 도구 및 Chroma DB 벡터 데이터베이스와 같은 다른 Python 기반 도구를 설치하는 데 사용할 거에요

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

이 글의 단계를 따르면 로컬 Jupyter Lab IDE(다운로드 가능한 Jupyter 노트북)에서 "텍스트 리뷰어 앱" 프로토 타입을 실행하고 나의 예시를 기반으로 자신의 앱 프로토 타입을 만들 수 있게 될 거예요:

![이미지](/TIL/assets/img/2024-07-02-CreateanAIprototypingenvironmentusingJupyterLabIDEwithTypescriptLangChainjsandOllamaforrapidAIprototyping_2.png)

# 부가정보: 타입스크립트를 통한 Jupyter 노트북 사용의 장점은 무엇인가요?

처음 실험을 시작했을 때, 간단한 Angular 앱을 만들고 실험용 AI 코드를 주 컴포넌트의 생성자에 작성하고 콘솔에 출력했습니다. 단순한 실험에는 이 방식이 잘 작동했지만, 어떤 것을 구축할 방법에 대한 명확한 계획이 있고 여러 가지 모델, 프롬프트 또는 에이전트 네트워크를 실험하고 싶지 않을 때입니다. 그러나 더 복잡한 실험의 경우, 이 간단한 방법에는 제약이 있어요:

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

- 전체 실험 코드는 한꺼번에 모두 실행됩니다. 만약 여러 부분으로 나누어 실행하고 싶다면, UI 컨트롤이 필요하거나 코드 일부를 주석 처리/해제해야 합니다. Jupyter에서는 코드를 여러 셀로 나누고, 모든 셀 또는 일부 셀을 별도로 실행할 수 있습니다.
- 패키지 관리: Deno에서는 이 과정이 자동으로 이루어집니다. import 문을 작성하면 Deno가 NPM 또는 Deno 패키지를 백그라운드에서 자동으로 다운로드하고 저장합니다. package.json이나 node_modules 디렉토리가 필요하지 않습니다. Deno에서 특정 버전의 패키지를 다운로드하면 모든 Jupyter 노트북에서 해당 패키지를 사용할 수 있습니다.
- Jupyter에서는 노트북을 간단히 복사할 수 있습니다. 새로운 AI 도구를 실험할 때는 노트북을 복제하고 예를 들어 프롬프트나 모델을 변경하면 됩니다. 그러면 노트북을 병렬로 실행하고 결과를 나란히 비교할 수 있습니다.
- Jupyter에서는 RAG(검색 보강 생성)을 사용하는 사용자 정의 에이전트가 필요한 경우 해당 추가 지식이 포함된 로컬 파일에 직접 액세스할 수 있습니다. Angular/React 앱에서도 이 작업이 가능하지만, 로컬 파일에 액세스하기 위해 서버와 같은 것이 필요하여 조금 더 어려울 수 있습니다.
- Jupyter/Deno로 생성하는 TypeScript 코드는 휴대성이 좋습니다. 프론트엔드 프로젝트에서 사용할 수 있을 뿐만 아니라 백엔드에서도 코드를 사용할 수 있습니다. 실험 목적으로는 Jupyter와 Deno가 완벽한 반면, 프로토타입 단계에서는 Angular 또는 React 앱을 생성해야 합니다. 이러한 프로토타입은 단일 사용자 또는 작은 팀의 작업을 효과적으로 지원할 수 있습니다. 그러나 프로토타입을 실제 서비스로 전환하려면 리소스와 비용을 관리하기 위해 코드 일부를 백엔드로 이동해야 합니다(API 액세스와 요금 등).
- 마지막으로, 내가 생각하기에 Jupyter 노트북을 사용하는 가장 큰 장점은 상호 작용적인 기사를 가지고 있는 것입니다. 코드 자체, 코드의 출력 및 설명(Markdown으로)이 한 곳에 모여 있어 ML/AI 개념을 다른 개발자들에게 전달하기에 완벽합니다.

이제 우리의 빠른 프로토타이핑 환경 구축을 시작해봅시다! 기억하세요, 이 설정은 한 번만 해주시면 됩니다 :)

# 설정: Chocolatey

# Chocolatey CLI 설치 (Windows)

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

앞서 말씀드린대로 Chocolatey는 Windows용 소프트웨어 관리 솔루션으로, Python 및 Deno를 설치하는 데 사용됩니다. Jupyter Lab IDE를 설치하고 실행하기 위해 Python이 필요하며, Deno는 Jupyter Lab를 위한 Typescript 언어 지원을 제공합니다.

만약 리눅스를 사용 중이라면 이러한 단계를 건너뛰고 Python 및 Deno를 설치하는 "리눅스에서" 섹션으로 이동하십시오.

Chocolatey를 설치하려면 다음 명령을 관리자 권한으로 실행하십시오(출처):

```js
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

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

이 명령은 원격 설치1.ps 스크립트를 다운로드하여 컴퓨터에서 실행하므로 실행하기 전에 안전을 확인하려면 내용을 확인해야합니다.

관련 기사: Chocolatey 문서: Chocolatey CLI 설치

# 가장 중요한 Chocolatey CLI 명령어

- choco list -localonly: 로컬로 설치된 패키지를 나열합니다.
- choco install PackageName: 패키지를 설치합니다 (Community Package Repository에서 사용 가능한 패키지를 검색할 수 있습니다).
- choco upgrade PackageName: 패키지를 업그레이드합니다.
- choco uninstall PackageName: 패키지를 제거합니다.
- choco outdated: 새로운 버전이 있는 로컬로 설치된 패키지를 나열합니다.

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

# 설정: Python 및 Deno 설치

# Windows

관리자 권한으로 실행된 명령 프롬프트에서 Python을 설치하려면 choco install python를 실행하세요. 그런 다음 refreshenv 명령을 실행하여 PATH 및 기타 환경 변수를 새로 고쳐주세요. 이제 python --version을 실행하면 Python의 버전이 표시됩니다.

Python 패키지 관리자(pip) 버전을 업그레이드하려면 python -m pip install -U pip을 실행하세요.

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

다음으로 Deno Typescript Kernel을 설치하세요:

```js
choco install deno
```

# 리눅스에서

리눅스에서는 배포판의 패키지 관리자를 사용하여 Python을 설치할 수 있습니다. 그런 다음 python -m pip install -U pip 명령을 사용하여 Python 패키지 관리자(pip)를 업그레이드할 수 있습니다.

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

그럼 Deno Typescript Kernel과 Pnpm 패키지 관리자를 설치하세요:

```js
curl -fsSL https://deno.land/install.sh | sh
```

이 원격 스크립트 파일의 내용을 실행하기 전에 안전을 확인해야 합니다.

관련 기사:

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

- Deno 설치

# Python 가상 환경(venv) 생성

이후부터는 Windows와 Linux에서 설치 단계가 매우 유사합니다. 홈 디렉토리로 C:\Users\YourUser\ 대신 /home/YourUser/를 사용해주세요.

가상 환경은 설치된 패키지 집합을 포함합니다. 컴퓨터의 각 Python 기반 프로젝트를 위해 별도의 가상 환경을 만드는 것을 권장합니다. 따라서 JupyterLab과 Deno를 위한 새 가상 환경을 만듭니다. 나중에 추가적인 가상 환경을 생성할 수도 있습니다.

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

명령 프롬프트(관리자 권한 없는 상태에서)를 열고 가상 환경을 위한 새 디렉토리를 만들어주세요: mkdir C:\Users\YourUser\venv. 그리고 다음 명령어로 새 가상 환경을 생성해주세요: python -m venv C:\Users\YourUser\venv\jupyter-deno

가상 환경을 활성화한 후 C:\Users\YourUser\venv\jupyter-deno\Scripts\activate 명령어로 패키지를 설치하기 전에 활성화해야 합니다. 이 스크립트를 실행한 후 프롬프트가 (jupyter-deno) C:\로 변경됩니다.

관련 문서: Python 문서: 가상 환경 만들기

# 가장 중요한 Python 패키지 관리자 (pip) 명령어

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

- pip list: 현재 설치된 패키지 목록을 확인합니다.
- pip install PackageName: 패키지를 설치합니다 (Python Package Index에서 사용 가능한 패키지를 확인할 수 있습니다).
- pip install --upgrade PackageName: 패키지를 업그레이드합니다.
- pip uninstall PackageName: 패키지를 제거합니다.
- pip list --outdated: 최신 버전이 있는 현재 설치된 패키지 목록을 확인합니다.

# 설정: Deno 커널을 사용한 JupyterLab 설치

활성화된 환경 안에서 Jupyter Lab를 설치합니다: pip install jupyterlab. 그 후, deno jupyter --unstable --install 명령을 사용하여 Jupyter에 Deno 커널을 추가합니다.

Jupyter Lab에서는 기본적으로 숨김 파일을 표시하지 않습니다. 예를 들어, Jupyter Lab에서 .env 파일을 볼 수 없습니다. OpenAI의 API 키와 같은 정보를 .env 파일에 저장할 수 있습니다. 이러한 파일을 Jupyter Lab의 파일 관리자에서 표시하려면 다음 명령으로 새 Jupyter 구성 파일을 생성해야 합니다:

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

```js
mkdir C:\Users\YourUser\.jupyter
cd C:\Users\YourUser\.jupyter
jupyter server --generate-config
```

마지막 명령어는 C:\Users\YourUser\.jupyter\jupyter_server_config.py 파일을 생성합니다. 이 파일을 열어 ContentsManager.allow_hidden = True로 설정해주세요. Jupyter Lab을 다시 시작하면 이제 뷰 메뉴의 Show Hidden Files 항목을 사용하여 Jupyter Lab에서 숨겨진 파일을 표시하거나 숨길 수 있습니다.

설치 프로세스의 마지막 단계로, Jupyter 노트북을 위한 디렉토리를 만들고 Jupyter Lab을 시작해주세요:

```js
mkdir C:\Users\YourUser\jupyter
cd C:\Users\YourUser\jupyter
jupyter lab
```

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

관련 기사:

- Jupyter Notebook에 현대 JavaScript 가져오기
- JupyterLab 문서: 숨겨진 파일 표시

# 설정: Ollama 설치 및 사용

# Ollama 및 모델 설치

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

이전에 언급했듯이, 로컬 LLM 모델을 실행할 때 Ollama를 사용합니다.

Windows용 Ollama를 여기서 다운로드하고 모델 라이브러리는 여기에서 찾을 수 있습니다. Ollama를 설치한 후에는 테스트 목적으로 좋은 codellama:7b-code 모델을 다운로드하는 것을 제안합니다: ollama pull codellama:7b-code. 이는 약 4GB의 RAM을 필요로 하는 소형 모델입니다. 저는 이 모델을 RAM이 16GB이고 듀얼 코어 CPU를 가진 오래된 노트북에서 사용하며, 수용 가능한 속도로 응답을 제공합니다. 또한 "텍스트 리뷰어 앱" 프로토타입에서도 이 로컬 모델을 사용합니다.

# 가장 중요한 Ollama 명령어:

- ollama list: 다운로드된 모델을 나열합니다.
- ollama pull ModelName:version: LLM 모델을 다운로드합니다.
- ollama serve: 백그라운드에서 Ollama 서버를 실행합니다.

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

# 로컬 모델로 첫 번째 AI 프로토 타입을 시도해보세요

만약 아직 주피터 랩을 시작하지 않았다면, 가상 환경을 활성화하고 해당 가상 환경 내에서 주피터 랩을 시작하는 `jupyter lab` 명령어를 실행하세요. 브라우저에서 UI를 열 수 있습니다: http://localhost:8888/. Ollama를 실행하려면 `ollama serve`를 사용하세요.

앱 프로토 타입이 포함된 노트북을 C:\Users\YourUser\jupyter 디렉토리로 다운로드하세요. JupyterLab 파일 브라우저(화면의 왼쪽 패널)에서 다운로드 된 노트북을 선택한 후 "Edit" 메뉴에서 "Clear Outputs of All Cells"를 선택하여 셀에 저장된 모든 출력을 제거하고, "Run" 메뉴에서 "Run all cells" 메뉴 항목을 클릭하세요. 일부 처리 후, 비교 결과가 마지막 셀 위에 표시될 것입니다:

![AI 프로토타입 환경 설정 이미지](/TIL/assets/img/2024-07-02-CreateanAIprototypingenvironmentusingJupyterLabIDEwithTypescriptLangChainjsandOllamaforrapidAIprototyping_3.png)

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

# 다음 단계

내 기사 시리즈의 다음 부분에서는 다음을 보여 드릴 것입니다:

- Jupyter Lab IDE 및 Deno Javascript/Typescript 런타임을 사용하는 방법 (노트북에서 Typescript 코드를 실행하는 방법)
- "Text reviewer app" 프로토타입 (위의 스크린샷)의 작동 방법
- LLMs 및 LangChain.js의 기본 개념 (LangChain은 다양한 LLM 모델 및 제공자 API 사이를 쉽게 전환할 수 있도록 지원하며, OpenAI 플랫폼 API 또는 로컬 Ollama API와 같은 API를 사용할 수 있게 합니다.)
- 프로토타입을 기반으로 한 "Text reviewer app"의 상태 및 저장소 생성 방법, 그리고 코드 생성을 위해 AI 사용하는 방법
- 위에서 언급한 저장소를 사용하는 React 및 Angular 앱을 만드는 방법

# 요약

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

이 작은 튜토리얼을 완료한 것을 축하해요! 알겠지만, 지금까지 따라온 것 중에 가장 흥미로운 과정은 아니었을 거야. 하지만 신뢰해줘, 이제 AI 도구를 구축해보며 실험할 수 있는 강력한 프로토타이핑 환경을 갖게 됐어. 거기에 이는 대단한 식사를 위한 모든 재료를 얻는 것과 같아 (동시에 주방도 짓는 느낌이지 :D). 다음 글에서 요리를 시작할 텐데, 즐거운 파트를 기대해!

다음 두 글에서, JupyterLab IDE와 Deno Javascript / Typescript 런타임을 사용하는 방법을 설명하고, "텍스트 리뷰어 앱" 프로토타입이 어떻게 작동하는지 자세히 보여줄 거야.

# 👨‍💻저자 소개

내 이름은 Gergely Szerovay이고, 많은 해 동안 데이터 과학자와 풀스택 개발자로 일했어. 최근에는 Angular 기반 프론트엔드 개발에 중점을 둔 프론트엔드 테크 리드로 일하고 있어. 나의 역할의 일환으로, Angular 및 프론트엔드 개발 분야가 어떻게 진화하고 있는지를 지속적으로 추적하고 있어.

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

지난 몇 년 동안 Angular은 매우 빠르게 발전해 왔고, 작년에는 AI 활용이 늘어나면서 소프트웨어 개발 워크플로우도 빠르게 진화했습니다. AI 지원 소프트웨어 개발의 진화를 밀접히 따라가기 위해, 저는 공개적으로 AI 도구를 개발하기로 결심했고, 진행 상황을 AIBoosted.dev에서 공개할 것입니다. 여기 구독하기 🚀

Angular 및 AI, Typescript, React, Angular와 함께 AI 앱을 구축하는 방법에 대해 더 알아보려면 Substack (Angular Addicts), Substack (AIBoosted.dev), Medium, Dev.to, X 또는 LinkedIn에서 제 팔로우 해주세요!
