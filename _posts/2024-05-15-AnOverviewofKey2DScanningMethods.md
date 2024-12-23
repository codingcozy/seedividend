---
title: "2D 스캐닝 방법 개요"
description: ""
coverImage: "/assets/img/2024-05-15-AnOverviewofKey2DScanningMethods_0.png"
date: 2024-05-15 04:23
ogImage: 
  url: /assets/img/2024-05-15-AnOverviewofKey2DScanningMethods_0.png
tag: Tech
originalTitle: "An Overview of Key 2D Scanning Methods"
link: "https://medium.com/3dprintjunction/an-overview-of-key-2d-scanning-methods-7d23f5ab28d1"
isUpdated: true
---




<img src="/assets/img/2024-05-15-AnOverviewofKey2DScanningMethods_0.png" />

3D 스캔은 실제 세계의 물체나 환경을 분석하여 모양, 색상 및 잠재적으로 외관이나 다른 표면 특성에 대한 데이터를 수집하는 과정입니다. 수집된 데이터는 이후 제조, 품질 관리 및 문화 유산 보존과 같은 다양한 응용 분야에서 사용하기 위해 디지털 3D 모델을 구축하는 데 사용될 수 있습니다.

오늘날 많은 기술이 있으며, 이러한 기술은 물리적 물체를 정확하게 2차원으로 스캔하는 데 다른 원리를 이용합니다. 이 문서는 다섯 가지 주요 방법을 비교하여 M - 각 방법이 기본적으로 어떻게 작동하는지 설명하고 상대적인 장단점을 강조합니다.

목차



- 레이저 삼각측량
- 사진측량
- 구조빛
- 레이저 펄스 거리측정
- 접촉 수치화
- 스캔 방법의 트레이드오프 정리:
- 결론

# 레이저 삼각측량

![이미지](/assets/img/2024-05-15-AnOverviewofKey2DScanningMethods_1.png)

레이저 삼각측량 스캐너는 오늘날 매우 흔한 유형의 2D 스캐닝 하드웨어입니다. 이름에서 알 수 있듯이, 이 스캐너는 삼각측량을 통해 표면을 분석하기 위해 레이저 빔을 활용합니다.



개발자이시군요. 위의 텍스트를 친근한 톤으로 한국어로 번역해 드리겠습니다.

물체를 스캔할 때 단일 레이저 점 또는 선이 물체에 투사됩니다. 이 레이저 광선은 표면에서 반사되어 센서에 의해 이미지화됩니다. 반사된 광선의 각도는 원래 방향과의 상대적인 각도를 인코딩하여 표면을 매핑하는 데 사용할 수 있는 거리 정보를 부호화합니다. 이 프로세스는 2D 스캔을 구축하기 위해 물체 전체에 걸쳐 반복됩니다.

장점:
- 복잡한 물체 세부 정보를 캡처하는 데 매우 높은 해상도와 스캔 정확도
- 빠른 스캔 속도

제한 사항:



- 다양한 표면 특성에 민감함 - 투명 또는 광택 마무리는 문제가 될 수 있음
- 한 줄의 레이저만 있어서 스캔 시간이 길어짐

전체적으로 레이저 삼각측량은 구현이 쉬우면서도 정밀도가 높습니다. 이는 제조된 부품을 CAD 모델과 비교하는 품질 보증 작업과 같은 작업에 이상적으로 적합합니다.

# 사진측량

![image](/assets/img/2024-05-15-AnOverviewofKey2DScanningMethods_2.png)



포토그램메트리는 2D 사진으로부터 측정을 하는 과학이에요. 특히 표면 점들의 정확한 위치를 재구성하기 위해 사용돼. 이 원칙은 서로 다른 각도에서 주제물을 촬영한 사진들의 시리즈로부터 완전한 2D 모델을 만들 수 있는 포토그램메트리 스캐닝 시스템에 의해 활용돼.

전문 알고리즘이 여러 사진에서 공통 점을 분석해. 초점 거리와 같은 카메라 파라미터 정보를 이용하여 수십만 개의 표면 점이 물리적으로 접촉하지 않고도 높은 정확도로 표시될 수 있어.

장점:

- 완전 비접촉 프로세스로 소박하거나 원격으로 스캔 가능
- 복잡한 기하학을 가진 물체에 대해 다른 기술들보다 우수한 성과를 보여줘.



제약 사항:

- 0.1mm보다 더 높은 정밀도 달성이 어려움
- 계산 집약적인 분석은 스캔 소프트웨어/하드웨어에 높은 수요를 야기함

사진측량은 삼각측량 스캔의 정확도에는 미치지 못하지만, 컴퓨터 비전과 계산 파워의 지속적인 향상으로 이러한 제약을 덜 제한적으로 만들고 있습니다.

# 구조물 조명




![Image](/assets/img/2024-05-15-AnOverviewofKey2DScanningMethods_3.png)

The structured light scanning approach is similar to laser triangulation, but substitutes the single laser with a structured pattern of light projected onto objects. This pattern might be bars, grids, or other shapes that establish a frame of reference.

The way that these shapes deform when striking surfaces encodes detailed information about the surface itself. This allows for reconstructing the surface geometry in fine detail. Common light patterning techniques include digital light processing (DLP) projectors or laser speckle projectors if coherent laser light is preferred.

Benefits:




- 빠른 비접촉 스캔 방법
- 로봇 레이저 스팟과 다르게 표면 색상/질감도 포착함

한계:

- 주변 조명 조건에 민감함
- 그림자 효과가 데이터 수집에 방해할 수 있음

구조광 시스템의 속도와 다용도성은 인라인 산업 스캔 응용에 적합합니다. 또한 마이크로소프트 키넥트와 같은 소비자 기기를 통해 대중에 널리 보급되고 있습니다.



# 레이저 펄스 거리 측정

![image](/assets/img/2024-05-15-AnOverviewofKey2DScanningMethods_4.png)

레이저 펄스 거리 측정은 레이저 펄스의 시간을 측정하는 방식으로 작동합니다. 핵심 원리는 레이저 빛이 방출된 후 반사된 빛을 감지하는 사이의 시간 지연을 측정하는 것입니다. 빛의 속도가 알려진 상수이기 때문에 이 시간 간격을 계산하면 이동한 거리를 예측할 수 있습니다.

스캐너는 초점을 맞춘 레이저 펄스의 회전을 대상물에 걸쳐 휘게 하여, 정밀한 시간-비행 거리 측정값을 수백만 개 만들어냅니다. 이 데이터는 주제 표면의 상세한 3D 지도로 변환됩니다.



혜택:

- 약 0.3mm 정밀도까지 극도의 높은 정확성
- 수백 미터 범위에 이르는 큰 스캔 거리

제한 사항:

- 레이저 에너지를 너무 많이 흡수하는 어두운 물체에 대한 어려움
-비용 증가와 빠른 처리가 필요합니다.



레이저 펄스 거리 측정의 뛰어난 정확성과 범위는 건물 현장을 측량하여 항공 스캔에서 디지턤 지형지도를 만드는 등 다양한 대규모 스캔 요구에 적합합니다.

# 연락처 디지타이징

![이미지](/assets/img/2024-05-15-AnOverviewofKey2DScanningMethods_5.png)

이름 그대로 연락처 디지타이징은 계측 장치와 대상 표면 간의 물리적 접촉을 기반으로 하는 방식으로서 치수 데이터를 수집합니다. 이는 터치 프로브, 계측 팔, 또는 표면에 XYZ 좌표를 플로팅할 수 있는 다른 장치를 활용할 수 있습니다.



컨택 디지타이저는 손으로 윤곽을 따를 때, 밀리미터의 작은 부분까지 정밀하게 측정할 수 있습니다. 연속 스캔 과정을 통해 광택이나 투명한 재질과 같이 이미지 촬영이 어려운 표면도 정확히 잡을 수 있습니다.

장점:

- 약 0.05mm까지의 정밀도로 골드 스탠다드 제공
- 투명/반사/볼록한 표면에 효과적

제한사항:



- 수작업 시간이 많이 소모됩니다.
- 표면 접근이 필요하기 때문에 대상 크기/기하학이 제한됩니다.

치과 임플란트나 조각물 복제와 같은 특수 응용에 적합한 맞춤형 접촉 디지타이징 방식은 서브밀리미터 수준의 완벽함이 중요합니다.

# 스캔 방법의 대안들을 요약하면:

![image](/assets/img/2024-05-15-AnOverviewofKey2DScanningMethods_6.png)



위의 비교를 통해 특정 스캐닝 기술이 다른 경우에 비해 어떻게 높은 성능을 발휘하는지 알 수 있어요 — 각 접근 방식에 내재된 장단점을 잘 활용하고 있거든.

# 요약

이것은 우리의 능력을 확장시키는 2D 스캐닝을 통해 물리적 객체와 장면을 디지털화하는 다양하고 널리 사용되는 5가지 방법에 대한 짧은 소개였어요. 레이저 거리측정, 카메라 이미지, 투사된 빛 패턴 등을 활용한 방법을 통해 과학자들은 전문적인 용도에 사용되는 고상세 연락처 디지털화와 다재다능한 비접촉 스캐닝을 만들어 냈어요.

자동 스캐닝은 수동 측정보다 수백 배 빠를 뿐만 아니라 더 뛰어난 정확도를 제공하기도 해요. 이를 통해 품질 보증, 아카이빙, 제품 설계에 대한 효율성이 증대되며, 레이저 삼각측량과 사진측량과 같은 현재의 기술을 향상시키는 노력이 계속되고 있어요. 실제로, 정밀도, 작업 공간 크기, 획득 속도의 한계를 넘어서 물리적 세계를 디지털 세계로 끌어오는 최첨단 기술이 형성되고 있어요.



산업, 유산, 또는 창의적 목적으로 2D 스캔 어플리케이션을 사용해본 경험이 있나요? 의견란에서 여러분의 직접적인 시각을 공유해주세요!

이 게시물은 원문이 3dprintjunction.com에 게시되었습니다.
저희의 작업을 지원해주신 모든 분들께 감사드리며, 더 많은 유사한 기사들을 확인하시려면 3dprintjunction.com을 방문해주시기를 부탁드립니다.