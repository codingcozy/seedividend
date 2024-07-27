---
title: "인공지능 기술을 활용한 코드 문서화 및 분석 방법"
description: ""
coverImage: "/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_0.png"
date: 2024-05-17 03:30
ogImage: 
  url: /assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_0.png
tag: Tech
originalTitle: "AI-Powered Code Documentation and Analysis"
link: "https://medium.com/@The_GreatBonnie/ai-powered-code-documentation-and-analysis-690fd514ad57"
---


<img src="/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_0.png" />

# TL;DR

이 기사에서는 Mimrr을 사용하여 코드에 대한 문서를 생성하는 방법을 배우게 될 것입니다. 또한 다음과 같은 목적으로 Mimrr을 사용하여 코드를 분석하는 방법을 배우게 될 것입니다:

- 버그
- 유지보수 문제
- 성능 문제
- 보안 문제
- 최적화 문제

<div class="content-ad"></div>

Mimrr 코드 문서 및 분석 기능을 활용하면 코드 변경이 정기적으로 발생할 때도 최신 코드 문서를 만들고 유지할 수 있습니다.

그 결과로 코드 문서를 수동으로 작성하고 유지하는 데 소요되는 많은 시간을 절약할 수 있습니다.

# Mimrr 시작하기

이 섹션에서는 Mimrr 계정을 만드는 방법을 배울 수 있습니다.

<div class="content-ad"></div>

1. 민르(Mimrr)로 이동하고 무료 시작 버튼을 클릭하세요.

![image](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_1.png)

2. 그런 다음 Google, Microsoft 또는 GitHub 계정을 사용하여 민르(Mimrr) 계정을 만드세요.

![image](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_2.png)

<div class="content-ad"></div>

세 번째 단계: 그 다음으로, 조직 이름과 설명을 추가하여 조직을 생성합니다. 그런 다음 아래 그림처럼 '조직 생성' 버튼을 클릭하세요.

![Organization Creation](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_3.png)

그러고 나면 코드 문서를 생성하려는 코드베이스 저장소를 연결하기 위해 Mimrr 대시보드로 리디렉션됩니다.

![Mimrr Dashboard](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_4.png)

<div class="content-ad"></div>

축하합니다! Mimrr 계정을 성공적으로 생성했습니다.

## Mimrr에 코드베이스 저장소 연결하여 코드 문서 생성하기

이 섹션에서는 코드베이스 GitHub 저장소를 Mimrr에 연결하여 해당 문서 및 분석을 생성하는 방법을 배우게 됩니다.

단계 1: 대시보드로 이동하여 "Mimrr에 코드 연결" 드롭다운 메뉴를 엽니다. 그런 다음 "연결" 버튼을 클릭하세요.

<div class="content-ad"></div>


![AI-Powered Code Documentation and Analysis](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_5.png)

Step 2: Then you will be redirected to choose a repository provider. In this case, I will select GitHub as my code provider.

![AI-Powered Code Documentation and Analysis](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_6.png)

Step 3: Next, go to your Mimrr dashboard and open the projects section to add your codebase repository by clicking the Add Project button. Once your project is added, it should look as shown below.


<div class="content-ad"></div>


Step 4: 해당 프로젝트를 클릭하여 생성된 문서를 확인하세요.

축하합니다! 이제 코드베이스를 위한 코드 문서를 성공적으로 생성했습니다.

<div class="content-ad"></div>

# 코드 분석 보기

이 섹션에서는 버그, 냄새, 성능, 보안 및 리팩터링 문제를 강조하는 코드 분석 결과를 확인하는 방법을 배울 수 있습니다.

단계 1: Mimrr 대시 보드에서 선택한 프로젝트로 이동하여 분석 섹션을 엽니다. 그러면 코드베이스 건강에 대한 개요가 표시됩니다.

![이미지](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_9.png)

<div class="content-ad"></div>

Step 2: 요약된 섹션 중 하나를 클릭하세요. 그럼 아래와 같이 이슈에 대한 더 많은 세부 정보를 보기 위해 Details 드롭다운 메뉴를 클릭하세요.

![image](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_10.png)

Step 3: 코드 유지 관리 문제를 분석하려면 아래와 같이 드롭다운 메뉴에서 Code Smell을 선택하세요. 그럼 각 유지 관리 문제에 대한 더 많은 세부 정보를 확인할 수 있습니다.

![image](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_11.png)

<div class="content-ad"></div>

Step 4: 코드 성능 문제를 분석하려면 아래에 나와 있는 드롭다운 메뉴에서 Performance를 선택하세요. 그런 다음 각 성능 문제에 대한 더 많은 세부 정보를 확인하세요.

![Performance](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_12.png)

Step 5: 코드 보안 문제를 분석하려면 아래에 나와 있는 드롭다운 메뉴에서 Security를 선택하세요. 그런 다음 각 취약점 문제에 대한 더 많은 세부 정보를 확인하세요.

![Security](/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_13.png)

<div class="content-ad"></div>

단계 6: 코드 리팩터링 문제를 분석하려면 아래와 같이 드롭다운 메뉴에서 Refactor를 선택하십시오. 그런 다음 각 유연성 문제에 대한 자세한 내용을 확인하십시오.

<img src="/assets/img/2024-05-17-AI-PoweredCodeDocumentationandAnalysis_14.png" />

축하합니다! 버그, 냄새, 성능, 보안 및 리팩터링 문제에 대해 성공적으로 분석하셨습니다.

# 결론

<div class="content-ad"></div>

요약하자면, Mimrr은 코드 문서를 생성하는 및 코드의 문제를 분석하는 프로세스를 자동화하는 데 훌륭한 도구입니다. Mimrr을 사용함으로써 기술 부채 없이 기능을 신속하게 출시할 수 있습니다.