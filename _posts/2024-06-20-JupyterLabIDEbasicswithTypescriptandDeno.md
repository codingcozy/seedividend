---
title: "주피터 랩 IDE 기본기 TypeScript와 Deno"
description: ""
coverImage: "/assets/img/2024-06-20-JupyterLabIDEbasicswithTypescriptandDeno_0.png"
date: 2024-06-20 00:13
ogImage: 
  url: /assets/img/2024-06-20-JupyterLabIDEbasicswithTypescriptandDeno_0.png
tag: Tech
originalTitle: "Jupyter Lab IDE basics with Typescript and Deno"
link: "https://medium.com/gitconnected/jupyter-lab-ide-basics-with-typescript-and-deno-a4255f2b36f1"
isUpdated: true
---




## TypeScript 개발자를 위한 단계별 가이드

![Image](/assets/img/2024-06-20-JupyterLabIDEbasicswithTypescriptandDeno_0.png)

이 시리즈의 시작 부분에서는 최근 변경 사항을 요약하여 Typescript로 AI 앱을 쉽게 프로토타입 및 개발할 수 있는 내용을 소개했습니다.

첫 번째 부분을 아직 읽지 않으셨나요? 이 프로젝트가 무엇인지 확인해보세요. 다가오는 몇 달, 아마도 몇 년 동안 새 AI 모델과 도구를 실험해가며 그 과정에서 배우는 모든 것을 여러분에게 보여줄 것입니다. 대중을 상대로 “공개로 빌드”하며 여정의 중요한 이정표를 여러분에게 보여줄 것입니다. 결과적으로 여러분은 이 지식을 실무에 적용할 수 있을 것입니다.

<div class="content-ad"></div>

두 번째 글에서는 Jupyter Lab IDE를 설치하는 방법과 빠른 프로토타이핑 환경을 위한 모든 필수 도구를 설명했습니다:

- Jupyter Lab 웹 기반 대화형 개발 환경
- Jupyter 노트북에서 Typescript로 Jupyter 노트북을 생성할 수 있게 해주는 Deno Typescript/Javascript 커널
- LLMs를 로컬에서 실행할 수 있는 Ollama
- 언어 모델을 활용하여 애플리케이션을 개발하는 프레임워크인 Langchain

두 번째 글의 단계를 따라오셨다면, 이제 Typescript 지원을 갖춘 작동 중인 Jupyter Lab 환경과 로컬 LLMs 실행을 위한 Ollama 설치가 완료되었습니다.

이 글에서는 Jupyter Lab의 사용 방법을 설명하고, 기본적인 코딩 워크플로우를 소개하겠습니다.

<div class="content-ad"></div>

모든 예제가 포함된 샘플 노트북을 다운로드할 수 있어요.

# 주피터 랩 기초

주피터 랩은 주피터 노트북, 코드 및 데이터 작업을 위한 통합 개발 환경(IDE)입니다. 주피터 노트북에는 코드, 출력물, 시각화 및 설명 텍스트가 포함되어 있어요.

주피터 랩의 사용자 인터페이스는 VSCode 또는 JetBrains IDE와 유사해요. "파일 브라우저"와 파일이 열린 주 작업 영역으로 구성되어 있어요:

<div class="content-ad"></div>


![JupyterLab IDE Basics](/assets/img/2024-06-20-JupyterLabIDEbasicswithTypescriptandDeno_1.png)

“File browser”에서 원본 파일을 열고 편집할 수 있습니다. “File browser”의 루트 디렉터리는 Jupyter Lab을 시작한 디렉터리입니다.

“File browser” 위에 있는 플러스 아이콘 버튼은 “Launcher”입니다. 새 노트북, 텍스트 파일, 터미널, 콘솔 및 기타 도구를 생성할 수 있는 바로 가기를 제공합니다:

![Launcher](/assets/img/2024-06-20-JupyterLabIDEbasicswithTypescriptandDeno_2.png)


<div class="content-ad"></div>

왼쪽 사이드바에는 다음과 같은 도구들이 있습니다:

- 파일 브라우저: 파일을 탐색하고 관리합니다
- 실행 중인 터미널 및 커널: 현재 실행 중인 터미널과 커널 목록
- 확장 관리자: Jupyter Lab 기능을 향상시키는 확장 관리
- 명령 팔레트: 명령에 빠르게 액세스하고 Ctrl+Shift+C로 열기

"명령 팔레트"에서는 모든 Jupyter Lab 명령과 단축키를 볼 수 있습니다:

![Command Palette](/assets/img/2024-06-20-JupyterLabIDEbasicswithTypescriptandDeno_3.png)

<div class="content-ad"></div>

# 주피터 랩에서의 코딩 워크플로우

## 새 노트북 만들기

왼쪽 사이드바에 있는 + 아이콘을 클릭하여 "런처"를 엽니다. "Notebook" 아래에서 TypeScript(또는 JavaScript)용 새 노트북을 만들기 위해 "Deno"를 선택합니다. Ctrl+S로 노트북을 저장합니다. "파일 브라우저"에서 파일을 우클릭하여 "이름 바꾸기"를 선택하여 파일 이름을 변경합니다(F2를 눌러도 됨).

## 코드 작성 및 실행

<div class="content-ad"></div>

새 노트북에서는 코드 셀 내에서 TypeScript 코드를 작성하고 실행할 수 있어요. 각 코드 셀을 사용하여 코드 스니펫을 입력하고 실행할 수 있어요. 예를 들어, 메시지를 표시하려면 다음과 같이 작성하세요:

```js
console.log('Hello Deno!')
```

Shift+Enter를 눌러 코드를 실행하세요. 결과는 셀 아래에 바로 나타날 거예요:

![이미지](/assets/img/2024-06-20-JupyterLabIDEbasicswithTypescriptandDeno_4.png)

<div class="content-ad"></div>

# 커널

커널은 주피터 노트북에서 코드를 실행합니다. 각 노트북은 자체 커널을 가지며, 변수, 가져오기 및 셀 실행 사이의 다른 런타임 정보를 유지합니다.

# 커널 재시작

노트북의 커널 메모리는 이전 실행에서 온 변수들로 어지럴 수 있습니다. 커널을 다시 시작하면 이 메모리가 지워지며 깨끗한 상태를 제공합니다. 또한 업데이트된 모듈도 다시 불러옵니다.

<div class="content-ad"></div>

"Kernel" 메뉴에서 커널을 재시작할 수 있어요.

# 마크다운 셀

마크다운 셀은 노트북에 텍스트와 문서를 추가하여 정보 전달을 도와줘요. 마크다운 셀을 추가하려면 툴바의 + 버튼을 클릭하여 새 셀을 삽입한 후, 드롭다운 메뉴를 사용하거나 Esc + M을 눌러 셀 유형을 "Markdown"으로 변경하세요. 제목과 형식화된 텍스트를 만들려면 다음과 같이 작성하세요:

```js
### 출력

JavaScript의 표준 출력 함수인 `console.log`을 사용하여 출력 셀에 쓸 수 있어요.
```

<div class="content-ad"></div>

마크다운으로 표를 변환하려면, Shift+Enter를 누르세요.

![image](/assets/img/2024-06-20-JupyterLabIDEbasicswithTypescriptandDeno_5.png)

# Deno에서 패키지 가져오기

Deno에서는 패키지를 가져오는 데 URL 기반 구문을 사용합니다.

<div class="content-ad"></div>

```js
import { escape } from "https://deno.land/std/html/mod.ts";
```

Deno에는 https://deno.land/std에서 사용 가능한 표준 라이브러리가 있습니다. 위 줄은 std 라이브러리에서 escape() 함수를 가져옵니다. 버전을 지정하려면 다음을 사용하세요:

```js
import { escape } from "https://deno.land/std@0.224.0/html/mod.ts";
```

또한 Deno에는 서드 파티 모듈을 위한 저장소가 https://deno.land/x에 있습니다. html() 함수를 가져오려면 다음을 사용하세요:

<div class="content-ad"></div>

```js
import { html } from "https://deno.land/x/display/mod.ts";
```

Deno는 npm 모듈을 npm: 접두사를 사용하여 가져올 수 있습니다. 예를 들어 zod를 가져오기 위해서는 다음과 같이 합니다:

```js
import { z } from "npm:zod";
```

# 결과 셀에 입력하는 방법

<div class="content-ad"></div>

다음은 코드 셀에서 출력할 수 있는 방법입니다:

- console.* 함수 사용
- html 함수 사용 (HTML 출력)
- md 함수 사용 (Markdown 출력)

예시:

<img src="/assets/img/2024-06-20-JupyterLabIDEbasicswithTypescriptandDeno_6.png" />

<div class="content-ad"></div>

# 환경 변수

Deno 또는 Node에서는 설정을 위해 환경 변수를 사용합니다. 예를 들어, Langchain의 OpenAI 래퍼는 OPENAI_API_KEY에서 키를 가져옵니다. .env 파일에 설정하세요:

```js
OPENAI_API_KEY=[여기에 키를 입력하세요]
```

다음 명령으로 이 파일을 불러옵니다:

<div class="content-ad"></div>

```js
import "https://deno.land/std@0.215.0/dotenv/load.ts";
```

아래 코드를 사용하여 값을 표시해보세요:

```js
console.log(Deno.env.get("OPENAI_API_KEY"));
```

# 로컬 파일 가져오기

<div class="content-ad"></div>

Deno는 로컬 파일 임포트를 지원합니다. 외부 파일을 변경한 후에는 커널을 다시 시작하여 다시로드하세요:

```js
import { f1 } from './1.ts';

f1();
```

Deno는 JSON 파일을 불러오는 것도 지원합니다:

```js
import jsonData from "./data.json" with { type: "json" };
console.log(jsonData);
```

<div class="content-ad"></div>

# 요약

이 작은 튜토리얼을 완료한 것을 축하드립니다! 우리는 주피터 랩의 기본을 다뤘으니, 앞으로는 AI 관련 주제에 중점을 둘 수 있을 것입니다. 다음 글에서는 "텍스트 리뷰어 앱" 프로토타입을 어떻게 만들었는지 설명할 것입니다. 흥미로운 내용이니까 구독 부탁드립니다!

# 👨‍💻저자 소개

내 이름은 Gergely Szerovay이며, 많은 해간 데이터 과학자이자 풀스택 개발자로 일해왔습니다. 최근에는 Angular 기반 프론트엔드 개발에 중점을 둔 프론트엔드 기술 리드로 일하고 있습니다. 제 역할의 일환으로 Angular와 프론트엔드 개발 환경이 어떻게 발전하고 있는지 꾸준히 주시하고 있습니다.

<div class="content-ad"></div>

지난 몇 년 동안 Angular는 매우 빠르게 발전해 왔습니다. 특히 작년에는 생성 모델 AI의 등장과 함께 소프트웨어 개발 워크플로가 급속히 발전했습니다. AI 지원 소프트웨어 개발의 발전을 밀접히 따라가기 위해, 나는 공개적으로 AI 도구를 만들기로 결심했고 진행 상황은 AIBoosted.dev 에 게시할 것입니다. 구독하시려면 여기를 눌러주세요 🚀

Angular에 대해 더 알고 AI, Typescript, React, 그리고 Angular로 AI 앱을 만드는 방법을 배우고 싶다면 Substack (Angular Addicts), Substack (AIBoosted.dev), Medium, Dev.to, X, 또는 LinkedIn에서 저를 팔로우해주세요!