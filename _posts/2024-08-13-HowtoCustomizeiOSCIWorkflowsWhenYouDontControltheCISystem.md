---
title: "CI 시스템을 제어하지 않을 때 iOS CI 워크플로우 커스터마이징 하는 방법"
description: ""
coverImage: "/assets/img/2024-08-13-HowtoCustomizeiOSCIWorkflowsWhenYouDontControltheCISystem_0.png"
date: 2024-08-13 12:11
ogImage: 
  url: /assets/img/2024-08-13-HowtoCustomizeiOSCIWorkflowsWhenYouDontControltheCISystem_0.png
tag: Tech
originalTitle: "How to Customize iOS CI Workflows When You Dont Control the CI System"
link: "https://medium.com/gitconnected/how-to-customize-ios-ci-workflows-when-you-dont-control-the-ci-system-7fd971adc4e0"
isUpdated: true
updatedAt: 1723864003889
---


![image](/assets/img/2024-08-13-HowtoCustomizeiOSCIWorkflowsWhenYouDontControltheCISystem_0.png)

# 배경

저희의 모바일 팀은 지난 2년 동안 빠르게 성장했습니다. 현재는 피처 팀으로 나뉜 250명 이상의 엔지니어가 있습니다. 매일 수백 개의 커밋을 만들어 PM/QA가 버그 수정이나 새로운 기능을 확인할 수 있도록 많은 빌드를 생성합니다.

그러나 CI 자원은 한정되어 있습니다. 그래서 모바일 인프라 팀은 현재 CI 워크플로우를 제어할 수 있는 유일한 팀입니다. 안타깝게도 현재는 각 프로젝트마다 CI 워크플로우를 맞춤화할 자원이 부족합니다.

<div class="content-ad"></div>

CI 작업에서 스크립트를 실행할 수 없어서 짜증나죠. 그래서 개발 워크플로우를 우리만의 방법으로 조정할 아이디어를 생각해냈어요.

# Xcode 빌드 단계 사용자 정의

CI 구성 파일을 제어할 수 있다면 파이프라인에서 몇 가지 스크립트를 실행하는 것이 쉬워집니다:

```js
// CI 구성 파일

stages:
  - build

build_project:
  stage: build  
  script:
    - your_custom_script.sh
```

<div class="content-ad"></div>

CI 구성 파일을 사용자 정의할 수있는 권한이 없기 때문에 CI에서 스크립트를 실행하는 다른 방법을 찾아야합니다.

Xcode 빌드 단계를 사용하면 이를 해결할 수 있습니다.

현재 풀 리퀘스트를 만들거나 업데이트 할 때마다 단위 테스트 작업이 실행됩니다 (네, 인프라 팀에서 설정되었습니다). Xcode 빌드 단계를 사용하면 빌드 중에 사용자 정의 스크립트를 주입 할 수 있으며 CI 실행기가 해당 스크립트를 실행하는 데 도움을줍니다 😛

예를 들어, CI에서 사용되지 않는 코드를 확인하려면 다음과 같이 빌드 단계를 설정했습니다:


| Step              | Script                   |
|-------------------|--------------------------|
| Pre-compile       | sh ci-scripts/check.sh    |
| Post-compile      | sh ci-scripts/report.sh   |


<div class="content-ad"></div>

<img src="/assets/img/2024-08-13-HowtoCustomizeiOSCIWorkflowsWhenYouDontControltheCISystem_1.png" />

그리고 제 스크립트에는 결과를 회사의 워크 채널로 보내는 논리를 추가했어요:

<img src="/assets/img/2024-08-13-HowtoCustomizeiOSCIWorkflowsWhenYouDontControltheCISystem_2.png" />

이 논리로 엔지니어가 PR을 생성/업데이트할 때, 러너가 유닛 테스트를 실행한 후에 내 사용자 정의 스크립트를 실행하고 우리에게 자동으로 알려줄 거에요 🥳

<div class="content-ad"></div>

# 우리가 스케줄된 파이프라인을 직접 만들어 봅시다

Xcode 빌드 단계 트릭은 잘 작동하지만, 승인 없이 프로젝트에서 스케줄된 파이프라인을 만들기 위해 위코드 빌드 단계 트릭은 잘 작동하지만, 대신 주 당 한 번의 실행을 어떨까요? 

"우리가 러너를 직접 설정하는 건 어때요?" — 그래서 생각했어요.

실현 가능하다고 생각해서, 저는 내 맥북에 로컬 러너를 설정했습니다.

<div class="content-ad"></div>

![3번 이미지](/assets/img/2024-08-13-HowtoCustomizeiOSCIWorkflowsWhenYouDontControltheCISystem_3.png)

![4번 이미지](/assets/img/2024-08-13-HowtoCustomizeiOSCIWorkflowsWhenYouDontControltheCISystem_4.png)

좋아요, 작동합니다. 이 방법은 간단한 사용 사례 중 일부를 해결할 수 있습니다. 그러나 몇 가지 단점이 있습니다:

- 내 노트북이 많은 무거운 작업을 할 것입니다: 무거운 프로젝트를 가져오고, 테스트를 실행하고, 사용자 지정 스크립트를 실행하는 등은 내 일상 업무에 영향을 줄 것입니다.
- 인프라 팀에서 제공하는 미리 정의된 작업을 활용할 수 없습니다: 지정된 모듈의 테스트 커버리지 수집, 성능 분석 등.

<div class="content-ad"></div>

이러한 단점을 극복하기 위해 제 간단한 아이디어는:

- Python 스크립트를 개발하여 Python-Jenkins 패키지를 사용하여 미리 정의된 작업을 cURL을 트리거하도록합니다.
- 작업의 로그를 진행하여 원하는 정보를 얻습니다.
- webhook을 사용하여 최종 결과를 작업 채널로 보냅니다.

![이미지](/assets/img/2024-08-13-HowtoCustomizeiOSCIWorkflowsWhenYouDontControltheCISystem_5.png)

이 접근 방식을 통해 우리는 미리 정의된 작업을 활용할 수 있을 뿐만 아니라 인프라 팀의 러너도 모두를 대신하여 무거운 작업을 수행할 수 있습니다 😛

<div class="content-ad"></div>

결과가 완벽하네요:

# 결론

이 게시물이 귀하가 CI를 사용자 정의할 때 발생하는 어떤 문제든 극복하는 방법에 대해 흥미로운 아이디어를 제공했으면 좋겠습니다.

만약 이 게시물이 도움이 되었다면, 좋아요 버튼을 눌러 주시고 Medium에서 다른 사람들에게 이 글을 추천하도록 남겨 주시기 바랍니다.

<div class="content-ad"></div>

Thanks for reading.

![Image](https://miro.medium.com/v2/resize:fit:1200/1*r7pFoxeHxjyrCMX9KgM9MA.gif)