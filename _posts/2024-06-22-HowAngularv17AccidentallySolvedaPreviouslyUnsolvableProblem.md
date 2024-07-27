---
title: "Angular v17이 해결한 이전에는 해결 불가능했던 문제"
description: ""
coverImage: "/assets/img/2024-06-22-HowAngularv17AccidentallySolvedaPreviouslyUnsolvableProblem_0.png"
date: 2024-06-22 05:02
ogImage:
  url: /assets/img/2024-06-22-HowAngularv17AccidentallySolvedaPreviouslyUnsolvableProblem_0.png
tag: Tech
originalTitle: "How Angular v17 Accidentally Solved a Previously Unsolvable Problem"
link: "https://medium.com/javascript-in-plain-english/how-angular-v17-accidentally-solved-a-previously-unsolvable-problem-14777e78916d"
---

## 도커 빌드에 간단한 유니코드 문자가 문제를 일으킨 방법

# 소개

소프트웨어 엔지니어로서, 소프트웨어 문제가 발생할 때, 그 원인을 파악하는 것을 좋아합니다. 따라서, 우리가 실행 중인 시스템을 소유하거나 제어하지 못하여 충분히 파고들기 어렵다면, 해결할 수 없는 문제나 설명할 수 없는 문제는 없다고 말할 수 있습니다.

이 기사에서는 간단한 유니코드 문자가 문제를 일으킨 방법을 분석하겠습니다. 이 문제는 해결하기 위해 많은 시간을 투자했지만, 해결할 수 없었던 것처럼 보였습니다. 걱정하지 마세요, 여전히 해결책을 찾아가겠지만, 다른 문제를 일으킬 수 있다는 주의를 요청드립니다.

<div class="content-ad"></div>

문제에 직면하기 전에, Angular, Azure Container Registry 및 Azure Pipelines Windows 에이전트가 어떻게 연관되는지 이해해야 합니다.

![이미지](/assets/img/2024-06-22-HowAngularv17AccidentallySolvedaPreviouslyUnsolvableProblem_0.png)

## Azure 파이프라인 에이전트

Azure 파이프라인은 마이크로소프트에서 제공하는 솔루션이며, 코드 프로젝트를 자동으로 빌드하고 테스트합니다. 지속적 통합 및 지속적 전달 (CI/CD) 관행을 결합하여 응용 프로그램을 어떠한 대상에도 빌드, 테스트 및 릴리스할 수 있습니다.

<div class="content-ad"></div>

Azure 파이프라인 에이전트는 한 번에 하나의 작업을 실행하는 에이전트 소프트웨어가 설치된 컴퓨팅 인프라(컴퓨터)입니다. CI/CD 작업은 이러한 작업 내에서 수행됩니다.

Azure 파이프라인은 두 가지 주요 유형의 에이전트를 제공합니다:

- Microsoft 호스팅 에이전트(마이크로소프트에 의해 클라우드에서 호스팅되고 완전히 관리됨)
- 자체 호스팅 에이전트(온프레미스 인프라에서 호스팅됨)

Azure 파이프라인 에이전트는 여러 유형의 기계에 설치할 수 있습니다:

<div class="content-ad"></div>

- macOS 에이전트
- Linux 에이전트
- Windows 에이전트
- Docker 에이전트

이게 왜 중요한지 조금 뒤에 알아보겠습니다.

## az acr build 명령어란?

익숙한 docker build 형식을 사용하여 Azure CLI의 az acr build 명령은 프로젝트를 압축하고 임시 blob 저장소로 업로드한 다음 Microsoft 호스팅 에이전트 중 하나가 이를 가져와 docker build를 수행합니다.

<div class="content-ad"></div>

빌드 과정 중에 빌드 에이전트는 로그를 우리에게 스트리밍합니다 (나중에 이것이 왜 중요한지 알게됩니다). 작업이 완료되면 빌드된 이미지가 Microsoft Azure 클라우드에 호스팅된 관리형 Docker 레지스트리 서비스인 Azure Container Registry에 푸시됩니다.

## Angular에 대하여

Angular는 인기있는 오픈 소스 프론트엔드 웹 애플리케이션 프레임워크로, 동적인 단일 페이지 웹 애플리케이션(SPA) 및 점진적 웹 애플리케이션(PWA)을 구축하는 데 사용됩니다.

# Angular이 책임을 집니까?

<div class="content-ad"></div>

저희 Angular 애플리케이션의 Dockerfile을 살펴봅시다.

Angular 프로젝트는 ng build 명령어를 사용하여 빌드됩니다. 이 명령어는 npm run build명령어에 의해 백그라운드에서 호출됩니다.

버전 17 이전의 모든 Angular 버전에서는 완료 후에 npm run build명령에 대한 출력으로 다음 텍스트가 표시됩니다:

![Angular output](/assets/img/2024-06-22-HowAngularv17AccidentallySolvedaPreviouslyUnsolvableProblem_1.png)

<div class="content-ad"></div>

녹색 체크 표시는 "✔"가 유니코드 문자 (코드 U+2714)인 것이 문제를 만드는 원인이 됩니다.

# Azure DevOps 에이전트가 잘못되었다

다음과 같은 YAML 파이프라인 정의를 사용하여 Azure 파이프라인에서 az acr 빌드 명령을 Windows 에이전트에서 실행해 봅시다 (Windows OS가 중요한 이유를 조금 후에 알게 될 것입니다):

Python을 사용하여 Windows OS 기계에서 다음 명령을 실행함으로써 동일한 오류를 재현할 수 있습니다.

<div class="content-ad"></div>

```js
(파이썬 -c "print('\u2714')") >> output.txt
```

# 발생하는 위치와 이유

만약 자체 호스팅된 에이전트를 사용한다면, 파이프라인 로그 중에 하나도 에이전트의 컴퓨터에 저장되지 않음을 알 수 있습니다. 대신, 저희가 사용하는 파이프라인 에이전트는 모든 로그를 Azure DevOps 서버로 보내어 저장합니다.

문제는 '체크 마크'로 알려진 '\u2714' 문자가 파이프라인 에이전트에서 디코딩을 시도할 때 발생합니다. 이는 colorama/ansitowin32.py 스크립트 파일 내에서 다음과 같은 에러 로그 부분에서 확인할 수 있습니다:

<div class="content-ad"></div>

```js
D:\a\_work\1\s\build_scripts\windows\artifacts\cli\Lib\site-packages\colorama/ansitowin32.py
```

플로우 다이어그램을 살펴보고 모든 구성 요소가 서로 어떻게 대화하는지 살펴봅시다.

![이미지](/assets/img/2024-06-22-HowAngularv17AccidentallySolvedaPreviouslyUnsolvableProblem_2.png)

기술적으로, 2단계와 3단계의 경우 우리의 압축된 프로젝트는 Azure Blog 스토리지에 업로드되며, ACR 빌드 에이전트에 의해 가져옵니다. 마찬가지로 ACR 빌드 에이전트는 Azure Blog 스토리지에 로그를 저장한 후 az acr 명령어의 일부로 스트리밍됩니다.

<div class="content-ad"></div>

Azure 파이프라인 빌드 에이전트에서 오류가 발생했습니다. 단계 3과 4 사이에서 발생한 오르로, Azure 블로그 스토리지에서 로그를 스트리밍하고 stdout로 출력하는 과정 중에 발생했습니다.

Azure CLI 서버는 터미널에 색상이 있는 텍스트를 생성하기 위해 colorama(파이썬 패키지)를 사용합니다. 이를 위해 stdout을 래핑하여 찾은 ANSI 시퀀스를 제거하고(결과물로 나타나는 의미없는 문자열을) 해당 시퀀스를 수정하는 적절한 Win32 API 호출로 변환합니다.

## Azure CLI 소스 코드 심층 분석

Azure CLI에서 발생한 오류는 command_modules/acr/\_stream_utils.py 파일의 143번째 줄에 있습니다.

<div class="content-ad"></div>

```js
import colorama
.
.
colorama.init()
.
.
print(flush.decode('utf-8', errors='ignore'))
```

이 줄은 단순히 UTF-8 디코딩된 바이트 스트링을 출력합니다 (블롭 스토리지에서 검색된 로그 데이터). 그러나 colorama 패키지가 가져와서 초기화되었으므로 다음 print 명령은 텍스트에 색상 또는 스타일을 추가하는 colorama의 기능을 활용할 것입니다.

Colorama는 Win32 API 호출을 사용하여 터미널 상태를 수정하며, Win32 API는 기본적으로 Unicode-특정 문자를 지원하지 않는 ANSI 코드 페이지를 사용합니다. 이는 Unicode 문자열을 표시하려고 시도하는 동안 Unicode 코드 페이지를 지원하지 않는 API를 사용하려는 것이 우리 문제의 근본 원인입니다.

이제 우리는 백그라운드에서 무슨 일이 일어나는지 이해하기 시작합니다. 그러나 실제 솔루션을 살펴보기 전에 다른 가능한 어정쩡한 솔루션을 확인해 보겠습니다.

<div class="content-ad"></div>

# 로그 없이도 문제 없을까요?

로그를 비활성화하면 문제가 해결될 것으로 생각할 수 있습니다. 비록 그게 맞긴 하지만, 더 나은 방법이 있습니다. 로그를 비활성화하는 방법은 두 가지가 있습니다:

- -- no-logs 인수를 추가하여 az acr build 명령에서 로그 스트리밍을 완전히 비활성화합니다. 이것은 빌드 로그를 완전히 잃어버리기 때문에 이 방법은 최악의 해결책입니다.

```js
az acr build --no-logs --registry $(Registry) --image "$(image):$(tag)" .
```

<div class="content-ad"></div>

- `ng build` 명령어의 진행 로그를 `--progress=false` 인수로 비활성화하세요. 진행과 관련된 로그의 일부를 여전히 잃게 되어 이는 이상적인 해결책은 아닙니다.

```js
RUN npm run build -- --progress=false
```

# 진짜 해결책

해결책을 살펴보기 전에, 인코딩과 문자 집합(코드 페이지)이 어떻게 작동하는지에 대해 이해해야 합니다. Unicode와 문자 집합에 관해 꼭 알아야 할 절대 최소한의 정보 - 모든 소프트웨어 개발자가 반드시 알아야 할 것 (변명 금지!) -이라는 글을 읽는 것을 강력히 권장합니다.

<div class="content-ad"></div>

- ACP은 ANSI (American National Standards Institute) 코드 페이지를 나타내며, 미국 및 서유럽 지역의 기본값은 Windows-1252 문자 세트로 설정됩니다. 이는 레거시 GUI 애플리케이션에서 사용됩니다.
- OEMCP는 제조업체 코드 페이지를 의미하며, 기본값은 437 (원래 IBM PC의 문자 세트)로 설정됩니다. 이는 레거시 콘솔 애플리케이션에서 사용됩니다.

PowerShell을 통해 다음 레지스트리 경로를 확인하여 Windows 레지스트리에서 현재 정의된 ANSI 코드 페이지와 OEM 코드 페이지를 확인할 수 있습니다:

```shell
Get-ItemProperty HKLM:\SYSTEM\CurrentControlSet\Control\Nls\CodePage `
  | Select-Object OEMCP, ACP
```

<img src="/assets/img/2024-06-22-HowAngularv17AccidentallySolvedaPreviouslyUnsolvableProblem_3.png" />

<div class="content-ad"></div>

지역 설정에 따라이 값은 코드 페이지 식별자 목록에서 어느 것이든 취할 수 있습니다. 가장 일반적인 것은 다음과 같습니다:

- 874-태국어
- 932-ShiftJIS — 일본어
- 936-GBK — 중국어 (중국 본토, 싱가포르)
- 949-한국 통합 한글
- 950-Big5 Extended — 중국어 (대만, 홍콩)
- 1250-중앙 유럽
- 1251-키릴 자모
- 1252-미국 (ANSI)
- 1253-그리스어
- 1254-터키어
- 1255-히브리어
- 1256-아랍어
- 1257-발트 어

cmd.exe 및 powershell.exe에서 텍스트는 현재 지정된 ANSI 코드 페이지를 사용하여 작성하고 읽습니다.

유니코드 특수 문자 인코딩을 지원하기 위해 Windows 레지스트리 항목을 변경하여 Windows가 UTF-8 인코딩 (코드 페이지 65001)을 사용하도록 설정해야 합니다.

<div class="content-ad"></div>


New-ItemProperty -LiteralPath 'HKLM:\SYSTEM\CurrentControlSet\Control\Nls\CodePage' -Name 'ACP' -Value '65001' -PropertyType String -Force;


전 세계 언어 지원을 위해 유니코드 UTF-8 사용 베타 기능을 활성화함으로써 비슷한 결과를 얻을 수 있습니다.

- intl.cpl을 실행합니다.
- "관리자" 탭을 엽니다.
- "시스템 로캘 변경"을 엽니다.
- "베타: 전 세계 언어 지원을 위한 유니코드 UTF-8 사용"을 활성화합니다.

![이미지](/assets/img/2024-06-22-HowAngularv17AccidentallySolvedaPreviouslyUnsolvableProblem_4.png)

<div class="content-ad"></div>

## 이 솔루션으로 다른 문제가 발생하는 방법

그러나 이것은 오래된 Windows 버전에서 부팅 문제를 일으키며, PowerShell을 작은 글꼴 크기로 고정시키고 텍스트가 올바르게 표시되지 않는 등의 문제를 일으킵니다. 따라서 이 문제를 해결함으로써 다른 문제가 발생할 수 있습니다.

그래서 우리는 여기서 덜 나쁜 것을 선택하는 것 뿐입니다.

## Linux 에이전트

<div class="content-ad"></div>

이제 질문이 생깁니다. Linux 기반 Azure DevOps 에이전트에서도 동일한 오류가 발생하는가요? 답은 아니오, 왜냐하면 colorama가 터미널 출력을 변경하기 위해 Win32 API 호출을 하지 않기 때문입니다.

# Angular 버전 17.x가 이 문제를 어떻게 해결했는지

실은 매우 간단합니다. Angular 버전 17부터는 'ng build' 명령어의 빌드 출력에 '✔' (유니코드 문자)는 더 이상 표시되지 않으며, 따라서 Win32 API와의 인코딩 문제를 일으키지 않게 되었습니다. 그게 다에요.

![이미지](/assets/img/2024-06-22-HowAngularv17AccidentallySolvedaPreviouslyUnsolvableProblem_5.png)

<div class="content-ad"></div>

# 결론

처음에 해결할 수 없는 것 같은 코딩 문제는 먼저는 좀 짜증이 나겠지만, 이를 해결해내는 것이 우리 소프트웨어 엔지니어들이 하는 일입니다. 우리의 인내와 끈기를 시험하며, 해결되면 귀중한 경험을 안겨주고 배경에서 어떻게 작동하는지에 대한 자세한 통찰력을 제공합니다.

명확한 해결책이 없는 도로 봉쇄물에 부딪힌 것은 좌절스러울 수 있지만, 그러한 도로 봉쇄물이 우리에게 성장과 학습 기회를 제공하는 것을 기억하는 것이 중요합니다. 궁극적으로, 이들은 우리를 다른 소프트웨어 엔지니어들과 깊이 이해차로 만들어 줍니다.

그러니 이것이 지나가고 과거에 겪었던 해결이 어렵다고 여겼던 코딩 문제를 다시 시도해 보는 동기가 되길 바랍니다.

<div class="content-ad"></div>

이 글에서 사용된 모든 소스 코드는 제 GitHub 저장소에 있습니다.

# 쉽게 이해할 수 있는 용어로 🚀

In Plain English 커뮤니티에 함께 해주셔서 감사합니다! 떠나시기 전에:

- 작성자를 박수로 격려하고 팔로우해주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기
