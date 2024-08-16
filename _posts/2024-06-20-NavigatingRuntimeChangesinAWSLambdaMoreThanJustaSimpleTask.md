---
title: "AWS Lambda에서 런타임 변경 처리하기 단순한 작업 이상"
description: ""
coverImage: "/assets/img/2024-06-20-NavigatingRuntimeChangesinAWSLambdaMoreThanJustaSimpleTask_0.png"
date: 2024-06-20 01:34
ogImage: 
  url: /assets/img/2024-06-20-NavigatingRuntimeChangesinAWSLambdaMoreThanJustaSimpleTask_0.png
tag: Tech
originalTitle: "Navigating Runtime Changes in AWS Lambda: More Than Just a Simple Task"
link: "https://medium.com/@bloggeraj392/navigating-runtime-changes-in-aws-lambda-more-than-just-a-simple-task-7541ed222d8e"
isUpdated: true
---




## 소개

AWS Lambda의 빠르게 발전하는 세계에서 런타임을 변경하는 것은 드롭다운 메뉴에서 새로운 옵션을 선택하는 문제 이상이 아닙니다. 이 작업은 기본 운영 체제를 이해하고 기존 라이브러리와의 호환성, 그리고 성능 및 보안에 미치는 잠재적인 영향을 고려해야 합니다. 특히 Python 및 Node.js와 같은 인기있는 런타임을 사용할 때 이 seemingly straightforward(보통으로 여겨지는) 작업이 왜 복잡성으로 가득 차 있는지 알아봅시다.

## 람다 런타임과 그 환경 이해하기

AWS Lambda는 여러 런타임을 지원하며, 각각이 특정 버전의 Amazon Linux에 연결되어 있는 여러 버전의 Python 및 Node.js를 포함합니다. 이 연관성은 람다 함수가 실행되는 환경을 결정하는 중요한 요소이며, 종속성을 어떻게 관리할지에서부터 응용 프로그램의 보안 포지션에 이르기까지 모든 것에 영향을 미칩니다.

<div class="content-ad"></div>

파이썬의 경우, AWS는 현재 다음을 제공합니다:

- Amazon Linux 2023에서 Python 3.12
- Amazon Linux 2에서 Python 3.11
- Amazon Linux 2에서 Python 3.10
- Amazon Linux 2에서 Python 3.9
- Amazon Linux 2에서 Python 3.8

마찬가지로, Node.js의 경우 다음을 제공합니다:

- Amazon Linux 2023에서 Node.js 20.x
- Amazon Linux 2에서 Node.js 18.x
- Amazon Linux 2에서 Node.js 16.x

<div class="content-ad"></div>

Amazon Linux 2에서 Amazon Linux 2023으로 최신 버전으로 전환하는 것은 큰 변화를 야기합니다. 이 변경 사항은 운영 체제의 최신 버전뿐만 아니라 라이브러리의 호환성 확인, 기존 레이어의 이전 및 네이티브 이진 파일의 재 컴파일도 포함됩니다.

## 올바른 환경에서 빌드 및 배포하기

호환성과 성능을 보장하기 위해 배포 패키지 및 레이어를 Lambda의 런타임 환경과 일치하는 환경에서 빌드하는 것이 중요합니다. Amazon Linux 2023을 사용하는 Python 3.12 및 Node.js 20.x의 경우, 개발자는 이러한 리소스를 Amazon Linux 2023을 실행하는 EC2 인스턴스 또는 Cloud9 환경을 사용하여 만들어야 합니다.

아직 Amazon Linux 2에 있던 이전 버전을 위해선 해당 EC2 또는 Cloud9 환경을 사용해야 합니다. 이 접근 방식은 배포 후 귀찮은 런타임 오류의 주요 원인인 바이너리 호환성과 라이브러리 종속성과 관련된 문제를 최소화합니다.

<div class="content-ad"></div>

## 의존성 처리에 대한 실용적인 팁

Python 라이브러리를 다룰 때, Lambda 실행 환경과 유사한 환경에서 pip install 명령을 실행해야 합니다. 이 전략은 Lambda 런타임의 기반이 되는 운영 체제와 호환되는 네이티브 이진 파일을 컴파일하는 데 중요합니다. 이와 관련된 의존성 문제를 처리하기 위한 실용적인 지침을 얻으려면 AWS는 Lambda에서 모듈을 가져올 때 발생하는 일반적인 오류와 해결책을 다루는 이러한 지식 센터 기사와 같은 리소스를 제공합니다.

## 왜 중요한가요?

Amazon Linux의 올바른 버전에서 함수가 실행되도록 보장하는 것은 런타임 오류를 피하는 데만 중요한 것이 아닙니다. 그것은 또한 다음과 같은 영향을 미칩니다:

<div class="content-ad"></div>

- 성능: 대상 환경에 맞게 의존성을 빌드하고 최적화하는 경우 최상의 성능이 보장됩니다.
- 보안: 각 버전의 Amazon Linux에는 해당 보안 기능과 패치가 함께 제공되므로 특히 프로덕션 환경에서는 최신 지원 버전과 함께 정렬하는 것이 중요합니다.

## 결론

AWS는 Lambda를 계속 발전시키는 동안 런타임 변경에 적응하기 위해서는 환경과 의존성에 대한 세심한 이해가 필요합니다. 이러한 측면을 꼼꼼히 관리함으로써 개발자는 클라우드에서 원활하고 안전하며 효율적인 함수 실행을 보장할 수 있습니다. 이러한 복잡한 프로세스는 빠르게 진보하는 기술적 환경에서 AWS Lambda의 모든 잠재력을 활용하는 데 중요합니다.

## 참고 문헌

<div class="content-ad"></div>

- AWS Lambda Runtimes: AWS 문서
- 람다에서의 Python 종속성 처리: AWS 지식 센터