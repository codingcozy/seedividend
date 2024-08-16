---
title: "인프라스트럭처의 코드화"
description: ""
coverImage: "/assets/img/2024-05-17-InfrastructureasCode_0.png"
date: 2024-05-17 03:50
ogImage: 
  url: /assets/img/2024-05-17-InfrastructureasCode_0.png
tag: Tech
originalTitle: "Infrastructure as Code"
link: "https://medium.com/@kernelv5/infrastructure-as-code-c68df4a4dcb3"
isUpdated: true
---





![Infrastructure as Code 0](/assets/img/2024-05-17-InfrastructureasCode_0.png)

![Infrastructure as Code 1](/assets/img/2024-05-17-InfrastructureasCode_1.png)

# Infrastructure as Code (IaC)이란

Infrastructure as Code 또는 IaC는 코드와 스크립트를 사용하여 인프라를 자동으로 프로비저닝하고 구성하는 것을 말합니다. IaC를 사용하면 환경을 생성하여 인프라 구성 요소를 자동화할 수 있으므로 필요한 시스템 및 장치를 수동으로 설정하는 대신 시스템과 장치를 설정할 수 있습니다.


<div class="content-ad"></div>

# IaC 사용의 장점

비즈니스가 성장함에 따라 인프라 및 구성은 점점 복잡해지고 있습니다. 매우 상세한 문서를 유지하고 수동으로 구현하는 것은 언제나 확약할 수 없습니다. 우리는 인간이기 때문에 항상 100%의 오류를 보장할 수 없습니다. 똑같이 감사, 업데이트 구현 등은 인력과 시간이 필요하며, 요구되는 빈도 및 해당 사람이 IT 배경이 필요한지 여부에 따라 인력 및 기간이 달라집니다. 업데이트를 진행할 새 시스템 또는 여러 DR 환경을 유지하기 위해 회사들은 많은 비용을 지출합니다.

인프라스트럭처( IaC )는 이러한 개념을 기반으로 개발되었습니다. 이는 회사가 위 언급된 도전에 대처할 수 있도록 돕습니다. 애플리케이션처럼, 인프라는 코드로 작성되며, IaC 코드는 리소스를 여러 번 구축하고 감사, 개선 등을 지속적으로 수행할 수 있도록 도와줍니다.

IaC는 인프라스트럭처의 프로비저닝을 더 쉽고 빠르며 확장 가능하게 만들어줌으로써 중요합니다. IaC는 조직에 다양한 이점을 제공합니다.

<div class="content-ad"></div>

## 투명성 및 보안

- 인프라 및 인프라 관련 구성 요소 구성의 진실의 원천 및 IaC 코드 자체가 문서로 작용합니다.
- 모든 수동 또는 무단 변경 사항과 감사를 추적할 수 있습니다.
- 안전하게 관리되는 인프라 비밀 및 구현 준수/표준.

## 안정성 및 생산성

- 일관된 구성: IaC는 일관된 설정을 강제하므로 불안정성 위험을 줄입니다.
- 오류 최소화: IaC의 자동화를 통해 인간 오류를 줄이고 인프라 안정성을 향상시킵니다.
- 신속한 복구: IaC를 사용하여 재해 후 빠른 시스템 복구가 가능하며 안정성을 유지할 수 있습니다.
- 버전 제어 롤백: IaC의 버전 제어를 통해 문제 발생 시 안정적인 상태로 빠르게 롤백할 수 있습니다.
- 동시 배포: IaC를 사용하여 동시 환경 프로비저닝을 할 수 있어 안정성이 향상됩니다.

<div class="content-ad"></div>

# 비즈니스 가치

- IT 시스템에서 '주요 인물 리스크' 감소
- IT 종속성 감소
- 더 빠르고 유연한 성과 달성
- 비용 절감 및 예산 편성
- 보안 및 준수 강화
- 향상된 협업과 팀워크
- 지속적인 개선 및 피드백 루프
- 미래를 대비하고 확장성 확보

# IaC의 원칙

- 모든 인프라 구성 요소의 구축/재구축은 쉽고 효율적이어야 합니다. 쉽다는 것은 구성 요소를 재구축하는 방법에 대한 중요한 결정을 내릴 필요가 없다는 것을 의미합니다. 구성 요소를 선택하는 것부터 매개 변수를 구성하고 구성 요소 수를 결정하는 등의 결정은 스크립트를 통해 자동화될 것입니다. 이러한 스크립트는 필요한 입력을 동적으로 획득하며 그 안에 정적이거나 하드코딩된 값이 없습니다.
- 항등성은 IaC를 실행하는 횟수나 시작 상태에 관계 없이 최종 상태가 동일하게 됩니다. 이는 인프라 프로비저닝을 단순화하고 일관되지 않은 결과의 가능성을 줄입니다.
- 동적 입력을 고려하여 동일한 리소스에 대한 재사용성을 보장하며 인프라가 계속 변화할 것임을 주의하세요. 서버가 사라지고 나타나고 크기가 조정되더라도 애플리케이션이 계속 실행될 수 있습니다.
- 일회성으로 구현합니다. 솔루션이 계층의 일부인 경우 최상위 층이 제거될 때 쉽게 파괴될 수 있어야 합니다.
- 모든 변경 이력을 추적하고 코드와 실행 중인 인프라의 차이를 비교할 수 있는 방법을 마련하세요.

<div class="content-ad"></div>

# IaC 원칙에 따른 코딩 표준.

## - IaC 모듈 표준

- 코드는 변경 추적 및 무단 액세스 또는 수정을 방지하기 위해 버전 관리되어야 합니다.
- 각 클라우드 제공업체에 대해 별도의 프로젝트를 유지합니다.
- 각 모듈에 대한 별도의 저장소를 유지합니다.
- 리소스 그룹, 가상 머신, 서브넷, VPC, 보안 그룹, SQL 데이터베이스 및 스토리지와 같은 클라우드 개체를 위해 별도의 모듈을 개발합니다.
- 모듈 저장소는 공통 네이밍 표준을 준수해야 합니다.
- 모듈은 최대 재사용성을 활용하도록 개발되어야 합니다.

- 가능한 경우 함수형(true | false) 또는 컬렉션 유형 (리스트, 맵)을 사용하세요.
- 시퀀스 블록을 참조하는 count 변수를 사용하세요. 대안으로 다중/대량 실행을 위한 옵션을 열어 두세요.
- 동적 리소스 이름을 사용하세요. 이는 리소스 이름이 접미사와 입력을 — 또는 _로 구분하여 생성됨을 의미합니다.

<div class="content-ad"></div>

예시: 리소스 그룹에 대한 템플릿

```js
{surfix}-{business_unit}-{application_type}-{subscription}-{env}-{region}-{sequence}
rg-mark-k8-001-dev-eas-01
```

- 임시 버그 수정이 아닌 한 모듈은 여러 목적으로 개발되어야 합니다.
- 모듈 버전 관리는 자동화된 프로세스를 따르고 의미 있는 버전 형식을 사용해야 합니다.
- 고정된 파일 구조를 따르거나 도구별 표준 파일과 폴더를 사용해야 합니다.
- 모듈은 CHANGELOG.md와 readme.md를 가져야 하며 명확한 지침과 자동으로 파이프라인을 통해 업데이트할 수 있는 방법이 있어야 합니다.
- 코딩 내에서 정적이거나 하드 코딩된 값은 명확한 설명이나 승인이 없는 경우 사용하면 안 됩니다.
- 변수 유형은 모듈 내에서 변수가 결정될 때 선언되어야 합니다.
- 모듈은 배열이나 변수를 통해 다른 모듈로 값을 전달하고 출력을 생성할 수 있어야 합니다.

# - IaC 솔루션 표준 설정

<div class="content-ad"></div>

- 코드는 변경을 추적하고 무단 액세스나 수정을 방지하기 위해 버전 제어되어야 합니다.
- 각 클라우드 제공업체마다 별도의 프로젝트를 유지하세요.
- 클라우드별 프로젝트 하위에 각 솔루션을 위한 별도의 저장소를 유지하세요.
- 솔루션은 여러 개체의 조합 또는 단일 개체일 수 있습니다.

예시:

- 단일 데이터베이스를 배포하는 것은 솔루션입니다 (단일 개체)
- K8를 배포하는 것은 솔루션입니다 (클러스터, 네트워킹, 스토리지 등과 같은 여러 항목)

- 해결책 그룹 표를 따라 어떤 항목을 포함하고 공유하고 피해야 하는지 정의하세요.
- 솔루션 저장소는 공통 네이밍 표준을 따라야 합니다.
- 고정된 파일 구조나 특정 도구 표준 파일 및 폴더를 준수해야 합니다.
- 솔루션은 재사용성을 활용할 수 있는 방식으로 개발되어야 합니다.

<div class="content-ad"></div>

동일한 배포의 예로는 여러 지역에 같은 구성 요소나 클러스터, 다른 이름을 가진 동일한 지역, 또는 다른 입력 세트를 가진 여러 배포 등이 있습니다.

- 코딩 내부에 정적 또는 하드 코딩 값이 없습니다.
- ENV 변수, 인수 및 파일 기반 입력과 같은 다양한 방식의 입력 프로세스 기능을 사용합니다. 비밀/자격 증명의 경우 항상 ENV 변수를 사용하며 보호는 로그 또는 다른 방법에 의해 공개됩니다.
- 도구/코딩 관점에서 버전 번호는 고정되어야 하며 솔루션별입니다.
- 전역 변수를 제외하고, 상태 관리, 변수 또는 변수 그룹, 입력 등과 같은 솔루션 관련 사항은 솔루션 저장소에 한정됩니다.

솔루션 그룹 표

![Solution Group Table](/assets/img/2024-05-17-InfrastructureasCode_2.png)

<div class="content-ad"></div>

# 인프라스트럭처의 코드화 (IaC) 구현

프로세스를 두 개의 독립적인 부분으로 나누는 것은 매우 효과적입니다. 이 방법을 통해 의존성을 피하고 코드 재사용성을 높이며 프로그래밍 구조를 정리하고 릴리스 관리를 간소화할 수 있습니다.

두 독립적인 부분은 다음과 같습니다:

1. 모듈 개발: 이 부분은 원하는 인프라를 만들기 위해 결합할 수 있는 개별 모듈을 개발하는 데 중점을 둡니다.

<div class="content-ad"></div>

2. IaC 프로젝트 코딩 및 구현: 이 파트에서 팀은 첫 번째 파트에서 개발된 모듈을 사용하여 IaC 프로젝트를 코딩하고 구현하는 데 초점을 맞춥니다.

프로세스를 두 부분으로 나눔으로써 팀은 IaC의 원활하고 성공적인 구현을 달성할 수 있습니다. 이는 구현 프로세스의 서로 다른 부분 사이에 발생할 수 있는 충돌과 의존성을 방지하여 지연 및 기타 복잡성을 방지하는 데 도움이 됩니다.

게다가, 산업 표준 최상의 관행 및 보안 프로토콜의 준수를 강제하기 위해 다양한 도구 및 프로세스를 구현하는 것이 중요합니다.

![InfrastructureasCode_3](/assets/img/2024-05-17-InfrastructureasCode_3.png)

<div class="content-ad"></div>


![Infrastructure as Code Image](/assets/img/2024-05-17-InfrastructureasCode_4.png)

Code Sample: [tf-sample-project-demo/main.tf](https://github.com/kernelv5/tf-sample-project-demo/blob/master/main.tf)

Project: [tf-sample-project-demo](https://github.com/kernelv5/tf-sample-project-demo)

![Infrastructure as Code Image](/assets/img/2024-05-17-InfrastructureasCode_5.png)


<div class="content-ad"></div>

예시 코드: https://github.com/kernelv5/tf-sample-project-demo 이 링크에서 두 모듈을 사용하여 리소스 그룹을 생성하고 스토리지 계정을 배포하세요.

모듈 링크: https://github.com/kernelv5?submit=Search&q=+az-tf-&tab=stars&type=&sort=&direction=&submit=Search

![이미지](/assets/img/2024-05-17-InfrastructureasCode_6.png)

파일 구조: https://github.com/kernelv5/az-tf-storageaccount

<div class="content-ad"></div>


![image](/assets/img/2024-05-17-InfrastructureasCode_7.png)

# Auto-Generated Readme.md

[Link to GitHub Repository with Terraform Documentation](https://github.com/kernelv5/tf-sample-project-demo)

![image](/assets/img/2024-05-17-InfrastructureasCode_8.png)


<div class="content-ad"></div>

# Auto Version & Release

[Semantic Release](https://github.com/semantic-release/semantic-release) 
[Commit Convention](https://www.conventionalcommits.org/en/v1.0.0/) 
[Example GitHub Action Workflow](https://github.com/kernelv5/tf-module-model-pipeline/blob/master/.github/workflows/main.yaml)

[azure-tf-storage-account v1.1.0 release](https://github.com/kernelv5/az-tf-storage-account/releases/tag/v1.1.0) 
[azure-tf-resource-group v1.1.0 release](https://github.com/kernelv5/az-tf-resource-group/releases/tag/v1.1.0)

![Image](/assets/img/2024-05-17-InfrastructureasCode_9.png)

<div class="content-ad"></div>

![Infrastructure as Code](/assets/img/2024-05-17-InfrastructureasCode_10.png)