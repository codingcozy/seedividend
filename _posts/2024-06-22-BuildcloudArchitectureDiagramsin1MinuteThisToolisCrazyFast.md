---
title: "1분 만에 클라우드 아키텍처 다이어그램 만들기 이 도구 정말 빠름"
description: ""
coverImage: "/assets/img/2024-06-22-BuildcloudArchitectureDiagramsin1MinuteThisToolisCrazyFast_0.png"
date: 2024-06-22 02:46
ogImage: 
  url: /assets/img/2024-06-22-BuildcloudArchitectureDiagramsin1MinuteThisToolisCrazyFast_0.png
tag: Tech
originalTitle: "Build cloud Architecture Diagrams in 1 Minute (This Tool is Crazy Fast!)"
link: "https://medium.com/gitconnected/build-cloud-architecture-diagrams-in-1-minute-this-tool-is-crazy-fast-c4b4561d4c6a"
---


차트태그를 마크다운 형식으로 변경해주세요.

<div class="content-ad"></div>

스위치를 바꾸는 것은 무거운, 불편한 수트에서 매끄럽고 재빠른 도구 세트로 변하는 것 같았어요. 그래서 제가 경험한 것은:

- 그리지 말고 다이어그램을 쓰기: 코드로 다이어그램을 만드는 것이 자연스럽고 빠르게 느껴졌어요. 까다로운 사용자 인터페이스와 씨름하지 않고 관계와 레이아웃을 정확하게 정의할 수 있었고, ChatGPT, BARD와 같은 생성적인 AI 도구들에게도 코드 생성을 요청할 수 있어요.
- 재사용성: 다음 프로젝트에도 일부 요소를 재사용할 수 있어요.
- 코드처럼 다이어그램 버전 관리: Git에 내 애플리케이션 코드와 함께 다이어그램을 저장하면 변경 사항을 추적하고 필요할 때 이전 버전으로 돌아가기 쉬워져요.
- 다이어그램 생성 자동화: CI/CD 파이프라인에 다이어그램 생성을 추가하면 항상 최신의 다이어그램을 유지할 수 있어요. 이렇게 하면 수동 작업을 줄이고 오류를 감소시킬 수 있어요.
- 다이어그램 쉽게 사용자 정의하기: 다이어그램 스타일과 요소를 손쉽게 조정하여 제 취향과 프로젝트 요구에 맞출 수 있었어요.

# 준비 사항:

## 1: Github에서 Diagrams 패키지 복제하기

<div class="content-ad"></div>

```js
pip install diagrams 
```

## 2: Graphviz 설치하기 (다이어그램 렌더링) 및 확인

여기에서 Graphviz를 다운로드하고 설치하세요.

# AI 사용 방법 (1분만에):

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1400/1*2Zkdp3uGTEiSgChrGVw8cA.gif" />

## 단계 1: ChatGPT AI에게 다이어그램 코드를 생성해 달라고 요청하세요.

해결책 세부 정보를 복사하여 붙여넣기하거나

설명만 제공해주세요

<div class="content-ad"></div>

## 지시 사항

## 단계 2: 필요에 따라 AI가 제공한 코드를 수정하기

AI가 제공한 코드 중 두 가지 오류를 수정해야 했습니다.

- diagrams.aws.management 대신 diagrams.aws에서 KMS를 가져 오려고 했습니다.

<div class="content-ad"></div>

보안.

```js
diagrams.aws.management 모듈에서 KMS만 가져오셨네요.
diagrams.aws.general 모듈에서 InternetGateway, S3Bucket을 가져오셨네요.
```

```js
diagrams.aws.security 모듈에서 KMS를 가져오셨네요.
diagrams.aws.storage 모듈에서 S3를 가져오셨네요.
```

2. diagrams.aws.network에서 S3VPCEndpoint를 import하려고 했지만 S3VPCEndpoint가 존재하지 않아 Endpoint를 사용했습니다. 그리고 NatGateway에 관한 대소문자 문제가 있었습니다.

<div class="content-ad"></div>

```js
from diagrams.aws.network import VPC, PrivateSubnet, S3VPCEndpoint, NatGateway
s3_endpoint = S3VPCEndpoint("S3 Gateway Endpoint")
```

```js
from diagrams.aws.network import VPC, PrivateSubnet, Endpoint, NATGateway

s3_endpoint = Endpoint("S3 Gateway Endpoint")
```

당신이 필요한 서비스가 패키지 내 어디에 정확히 위치하는지 확인할 수 있습니다.

## 단계 3: 프로그램 실행하기

<div class="content-ad"></div>

```bash
python `filename`.py

# 코드를 수동으로 작성하는 단계

다이어그램 패키지를 배우고 수동으로 다이어그램을 만드는 것은 매우 쉽습니다. Diagram, Cluster, Edge 및 몇 가지 기호 등 약 6가지 항목에 대해 알고 있기만 하면 됩니다.

“Diagram” — 당신의 다이어그램의 최상위 컨테이너
```  

<div class="content-ad"></div>

```js
다음 코드에서,

S3 to RDS는 저장할 이미지 파일의 이름을 나타냅니다

direction — 왼쪽에서 오른쪽으로(LR), 오른쪽에서 왼쪽으로, 위에서 아래로 컨테이너를 만들기 시작합니다. 필요한 경우 사용할 수 있는 옵션입니다.
```

<div class="content-ad"></div>

"png", "jpg", "svg", "pdf", "dot" 형식이 현재 지원됩니다.

"Cluster" — 두 번째 수준 컨테이너(컨테이너의 이름 또는 레이블을 지정할 수 있습니다)

```js
with Cluster("AWS"):
```

Edge

<div class="content-ad"></div>

"``" - 오른쪽으로 향하는 화살표 또는 가장자리

```js
event_bridge >> Edge(label="triggers") >> lambda1
```

"``" - 왼쪽으로 향하는 화살표 또는 가장자리

"-" - 방향이 없는 엣지 또는 양방향

<div class="content-ad"></div>


s3_raw_layer - Edge(label="push") - lambda1


# 샘플 출력:

<img src="/assets/img/2024-06-22-BuildcloudArchitectureDiagramsin1MinuteThisToolisCrazyFast_0.png" />

# 다음 단계

<div class="content-ad"></div>

잊지말고!

![image](https://miro.medium.com/v2/resize:fit:960/0*BstxtFTCD4r-65Sd.gif)

그리고,

![image](/assets/img/2024-06-22-BuildcloudArchitectureDiagramsin1MinuteThisToolisCrazyFast_1.png)

<div class="content-ad"></div>

그리고 만약 내 작업을 정말 좋아하신다면 커피 한 잔 사주실 수도 있어요 :).