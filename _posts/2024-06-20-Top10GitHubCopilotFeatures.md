---
title: "GitHub Copilot의 탑 10 기능"
description: ""
coverImage: "/assets/img/2024-06-20-Top10GitHubCopilotFeatures_0.png"
date: 2024-06-20 01:18
ogImage: 
  url: /assets/img/2024-06-20-Top10GitHubCopilotFeatures_0.png
tag: Tech
originalTitle: "Top 10 GitHub Copilot Features"
link: "https://medium.com/itnext/top-10-github-copilot-features-1cfb39778a10"
isUpdated: true
---




## 더 행복하고 생산적인 개발자가 되어보세요

![이미지](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_0.png)

GitHub Copilot은 인공 지능 기술을 활용한 페어 프로그래밍 도구로, 빠르게 코딩하고 생산성을 향상시킬 수 있습니다.

이 글에서는 GitHub Copilot의 최고 10가지 기능에 대해 이야기해볼 것입니다.

<div class="content-ad"></div>

# 1. 워크스페이스 에이전트

Copilot @workspace agent은 우리의 코드를 강화하여 워크스페이스의 전체 맥락을 분석하고 이해함으로써 프로젝트의 아키텍처와 의존성과 일치하는 권장 사항을 제공할 수 있습니다.

![이미지](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_1.png)

# 2. 코딩 질문하기

<div class="content-ad"></div>

만약 확실하지 않거나 기억하지 못하는 경우, 문서를 찾아보거나 구글 검색하지 않고도 Copilot에게 문법이나 일반 프로그래밍 개념에 대해 물어보세요. Copilot은 자연어나 코드 스니펫 형식으로 답변을 제공합니다. 예를 들어, 배열의 합을 계산하는 방법에 대해 물어보는 등의 질문을 할 수 있습니다.

![이미지](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_2.png)

또한, 코드의 동작이나 작동 방식을 이해하고 싶은 경우, 설명을 요청할 수 있습니다.

![다른 이미지](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_3.png)

<div class="content-ad"></div>

# 3. 코드 완성

코딩을 시작하면 Copilot은 파일의 컨텍스트를 분석하고 편집기에서 제안을 제공합니다. 예를 들어, arraySum이라는 메서드 이름을 입력하면 Copilot이 코딩 스타일과 일치하는 구현을 제안합니다:

![image](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_4.png)

# 4. 코드 리팩터링 및 개선

<div class="content-ad"></div>

Copilot에 선택한 코드를 리팩토링하거나 개선할 것을 요청할 수 있습니다. 이는 우리 코드베이스의 맥락을 활용하여 리팩터링이나 개선 사항을 분석하고 제안할 것입니다.

![이미지](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_5.png)

## 5. 수정해주세요

코드에 오류나 경고가 있는 경우, Copilot은 오류 메시지, 코드 구문 및 주변 코드를 기반으로 가능한 수정 사항을 제안할 수 있습니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_6.png)

# 6. 유닛 테스트 케이스 생성

Copilot은 우리의 테스트 프레임워크와 코딩 스타일을 식별하고 오류, 널 값 또는 예기치 않은 입력 데이터 유형을 다루기 위한 테스트 케이스를 제안합니다.

이전 arraySum 함수에 대한 테스트 케이스를 생성해 보겠습니다:


<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-Top10GitHubCopilotFeatures_7.png" />

생성된 테스트 케이스:

<img src="/assets/img/2024-06-20-Top10GitHubCopilotFeatures_8.png" />

# 7. 커밋 메시지 생성

<div class="content-ad"></div>

만약 커밋 메시지를 작성하기 귀찮다면, Copilot이 우리를 위해 작성해줄 거예요. VS Code에서 커밋 메시지 텍스트 상자 옆의 화문 아이콘을 클릭해보세요.

![이미지](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_9.png)

# 8. 언어 번역

이제 다른 프로그래밍 언어를 배울 필요가 없어졌어요. Copilot은 선택한 코드를 다른 언어로 번역할 수 있어요.

<div class="content-ad"></div>

이전 arraySum JavaScript 함수를 Python으로 번역해 보겠습니다:

![image](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_10.png)

## 9. 이름 바꾸기 제안

코드에서 심볼의 이름을 변경할 때 Copilot은 해당 심볼의 문맥을 기반으로 새 이름을 제안합니다.

<div class="content-ad"></div>

이전의 arraySum 함수의 이름을 바꾸어 봅시다:

![이미지](/assets/img/2024-06-20-Top10GitHubCopilotFeatures_11.png)

# 10. VSCode Agent

만약 VS Code 기능을 수행하거나 상호 작용할 방법을 찾고 계시다면, Copilot @vscode 에이전트가 원하시는 기능에 대해 자세히 설명하거나 명확히 해주는 데 도움이 될 수 있습니다. 예를 들어, 우리가 기능을 설명하면, Copilot이 VS Code에서 해당하는 기능을 결정하는 데 도움을 줄 것입니다. 파일을 저장할 때 끝에 새로운 라인을 추가하도록 요청해 봅시다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-Top10GitHubCopilotFeatures_12.png" />

# 결론

이제 GitHub Copilot의 최고 10가지 기능을 알았으니, 더 행복하고 생산적인 개발자가 되실 수 있습니다.

읽어주셔서 감사합니다. 유용한 정보였기를 바라며, 즐겁게 코딩하세요!

<div class="content-ad"></div>

# 자원