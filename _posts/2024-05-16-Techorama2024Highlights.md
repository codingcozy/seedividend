---
title: "테크오라마 2024 하이라이트"
description: ""
coverImage: "/assets/img/2024-05-16-Techorama2024Highlights_0.png"
date: 2024-05-16 03:49
ogImage: 
  url: /assets/img/2024-05-16-Techorama2024Highlights_0.png
tag: Tech
originalTitle: "Techorama 2024: Highlights"
link: "https://medium.com/kapuani/techorama-2024-highlights-2eeba3e9aff2"
isUpdated: true
---




지난 주에 Kapuani를 대표하여 동료 Jan과 함께 Antwerp의 Kinepolis에서 개최된 Techorama 2024에 참석한 경험은 대단했어요. 이곳에서 내가 가장 좋아하는 발표 몇 가지를 소개하려고 해요 (특정한 순서는 없어요).

## Azure 아키텍처: 현명하게 선택하기

— Rik Hepworth

하루를 멋지게 시작했어요. Rik의 무기는 화이트보드이었어요. 이 매우 인터랙티브한 세션에서 우리는 데이터부터 호스팅, 보안 등 모든 측면을 다뤘어요. 저는 상상 속 애플리케이션을 Azure Container Apps에 호스팅하는 건의를 했는데, Rik도 매우 좋아했던 아이디어였어요.



대부분의 내용을 알고 있었지만, 다시 확인하고 커뮤니티 동료들과 확인하여 올바른 방향으로 나아가고 있는지 확인하는 것은 좋은 일이에요. Rik이 우리에게 제안해 준 새로운 시각 중 하나는 API 관리를 사용하여 외부 서비스로의 요청을 프록시하는 것인데, 우리는 이를 곧 구현할 예정입니다.

## 안녕하세요 Azure Kubernetes Service! 어서오세요 Azure Container Apps!

— Johnny Hooyberghs 작성

처음부터 Azure Container Apps 플랫폼을 지원하고 채택해 왔습니다. Johnny도 마찬가지로 이를 수용하고 훌륭한 서비스에 대해 깊이 파고들어 이야기했어요. 그는 매우 중요한 질문을 던졌습니다:



팀의 소형부터 중간 규모까지 다양한 팀이 쿠버네티스를 채택하지만 그 결정의 결과를 충분히 고려하지 않고 있습니다. 쿠버네티스 플랫폼을 사랑하고 많은 전문 지식을 쌓아왔지만, 우리는 고객들에게 먼저 대안을 고려할 것을 권장합니다.

Johnny가 제안한 것처럼, Azure Container Apps는 쿠버네티스에 좋은 대안입니다. 이 서비스는 쿠버네티스 플랫폼 위에 구축된 추상화 계층이며, KEDA, Dapr, Envoy 등의 기타 오픈 소스 도구들과 통합되어 있습니다. 비교적 간단하며 팀의 속도를 가속화시키며 기본 인프라의 유지보수가 필요하지 않습니다.

심지어 .Net Aspire에 대해 자세히 살펴보았는데, 로컬 개발에 적합한 훌륭한 도구이며, Azure 개발자 CLI(azd)를 사용하여 Azure Container Apps로 배포할 수 있습니다(비 프로덕션 환경에서). 데모/콘셉트 증명 시나리오에서 매우 편리합니다.

Markdown 포맷의 표는 아래와 같습니다:

| 기존 방식 | Kubernetes | Azure Container Apps |
|--------------|--------------|---------------------|
| 특징 | 복잡함, 전문 지식 필요 | 간단함, 유지보수 필요 X |
| 통합된 도구 | KEDA, Dapr, Envoy 등 | - |



## 남은 부분 이론 소개

— Barry O'Reilly

남은 부분 이론은 우리에게 소프트웨어 시스템을 과학적 방법으로 설계하고 복잡성 과학을 활용하여 불확실성을 관리하는 것을 디자인 프로세스의 기본 요소로 만드는 새로운 관점을 제공했습니다.

결국 이 설계자들도 그것을 몰랐지만, Barry가 조사한 결과, 그들을 다른 사람들과 구분 짓는 요소를 발견했습니다. 바로 그들이 복잡성과 불확실성에 접근하는 방식이었습니다.



이론적 배경 이후에, 그는 전기 자동차 충전소 형태의 훌륭한 예시를 제시했습니다. 이 예시에서 그는 몇 가지 간단한 질문이 시스템에 영향을 미칠 수 있는 특정 `스트레서스(stressors)`를 밝힐 수 있다는 것을 보여주었습니다. 더 많은 스트레서스에 대처할수록 시스템이 더 강건해지고, 미래에 문제가 발생해도 이미 해결책이 있을 수 있다는 점을 깨달을 겁니다.

## Microsoft Azure API Management을 활용한 견고한 API Landscape 구축

— Tom Kerkhove 작성

우리는 Tom Kerkhove를 오랫동안 큰 팬으로 지내 왔습니다. 그는 Kubernetes 이벤트 중심 자동 확장(KEDA) 오픈 소스 프로젝트를 유저들이 일상적으로 사용합니다. 따라서, Techorama에서 그를 발표하고 있는 걸 보게 되어 기쁩니다.



이번 실습에서 Tom은 Azure Api Management가 제공하는 복원력 기능에 대해 깊이 파고들었습니다. 그는 여러 지역을 지원하는 APIM 인스턴스를 설정하는 방법과, 여러 지역에 걸쳐 Azure가 제공하는 로드 밸런싱을 사용하거나 트래픽 관리자 인스턴스와 각 배포된 게이트웨이 인스턴스의 지역 엔드포인트를 결합하여 사용자 정의 규칙 또는 가중치를 생성할 수 있다는 것을 보여 주었습니다.

Tom은 Api Management 정책 내의 속도 제한 및 회로 차단 기능을 보여 주었으며, Azure Load Testing 도구를 사용하여 수백만 건의 요청을 몇 분 동안 시뮬레이션하는 데모를 제공했습니다.