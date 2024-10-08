---
title: "이미지 선명도를 평가하여 OCR 정확도 향상 기술"
description: ""
coverImage: "/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_0.png"
date: 2024-05-15 15:24
ogImage: 
  url: /assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_0.png
tag: Tech
originalTitle: "Techniques for enhancing OCR accuracy by assessing image sharpness"
link: "https://medium.com/data-science-at-microsoft/techniques-for-enhancing-ocr-accuracy-by-assessing-image-sharpness-10b6cea60e8f"
isUpdated: true
---





![Image](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_0.png)

광학 문자 인식(OCR) 기술은 이미지에서 텍스트를 디지털화하는 방법을 혁신적으로 바꿨습니다. 그러나 OCR 시스템이 직면한 지속적인 어려움 중 하나는 흐린 이미지에서 텍스트를 정확하게 해독하는 것입니다. 흐림은 OCR 정확도를 심각하게 저하시켜 추출된 텍스트에서 해석 오류를 일으킬 수 있습니다. 이 기사에서는 OCR 애플리케이션용 이미지의 흐림 문제를 제시하고 이미지 선명도를 평가하기 위한 세 가지 기술을 탐색하여 OCR 정확도를 향상시키겠습니다.

# 이미지에서의 흐림이란?

이미지에서의 흐림은 모션 블러, 초점이 맞지 않은 블러 또는 낮은 이미지 해상도와 같은 다양한 요인 때문에 발생합니다. 이러한 요인은 텍스트의 세부사항과 가장자리를 왜곡시켜 OCR 시스템이 문자를 정확하게 인식하고 추출하는 것을 어렵게 만듭니다.




# OCR은 기업에 어떤 이점을 줄까요?

OCR은 많은 다른 용도 중에서도 기업에서 널리 사용되는 다음과 같은 응용 프로그램에 사용됩니다:

- 문서 디지털화: 인쇄 또는 손으로 쓴 문서, 양식 및 영수증을 디지털 텍스트로 변환하는 작업입니다.
- 데이터 추출: 금융, 소매 및 의료 분야와 같은 산업에서, OCR은 양식, 가격표 및 처방전에서 데이터나 중요 정보를 자동으로 추출합니다.
- 접근성 및 보조 기술: 텍스트 인식 소프트웨어는 인쇄된 텍스트를 청각적 발음이나 점자 출력으로 변환하여 시각 장애가 있는 사용자가 텍스트 콘텐츠에 접근하고 상호 작용할 수 있도록 합니다.

# 왜 OCR 모델의 데이터 정확도가 매우 중요한가요?



흐려진 이미지에서 모델을 평가하면 모델의 정확도를 잘못 나타낼 수 있습니다. 정확도는 다음과 같은 이유로 매우 중요합니다:

- 데이터 신뢰성: 높은 정확도는 추출된 텍스트가 원본 콘텐츠를 정확하게 반영하여 기업이 데이터 분석, 의사 결정 및 규정 준수에 OCR 출력에 의존할 수 있도록 보장합니다.
- 오류 최소화: 부정확한 OCR 결과는 데이터 입력, 문서 처리 및 정보 검색에서 오류를 초래할 수 있으며, 이는 재정적 손실, 규정 위반, 명예 훼손 및 법적 책임으로 이어질 수 있습니다.
- 효율성: OCR 출력의 수동 확인 및 수정 필요성을 제거함으로써 기업에 시간과 자원을 절약시킵니다.

OCR 기술을 도입하면 많은 기업이 추가 수익을 창출할 가능성이 높습니다. 또한 자원 활용의 효율화를 통해 더 나은 비용 절감 효과를 가져오며, 데이터 오류나 준수 위반으로 인한 벌금, 처벌 및 법적 책임 위험을 줄입니다.

# 이미지 선명도 평가 기술




200개의 텍스트를 포함한 잘린 이미지 샘플을 대상으로 이미지의 선명도를 결정하는 최상의 메트릭을 정하는 실험을 진행했습니다. 샘플 이미지에는 일부 흐린 이미지와 카메라 농도가 많이 섞인 이미지도 포함되어 있습니다. 여기서 OpenCV를 사용하여 이미지의 흐림을 식별하는 세 가지 기술을 탐색했습니다: 라플라시안 연산자, 그래디언트 크기법 및 고속 푸리에 변환입니다. 다양한 기술을 비교하기 위해 각 기술에 대한 가장 날카로운 이미지와 가장 흐린 이미지를 참조로 추가했습니다.

이 섹션에서는 다음 기술을 자세히 살펴봅니다.

## 라플라시안 연산자 방법

라플라시안 연산자는 이미지 처리에서 가장자리를 감지하고 이미지의 선명도를 평가하는 데 사용되는 고전적인 기술입니다. 이미지의 두 번째 도함수를 계산하여 가장자리를 감지하고 이미지의 선명도를 평가합니다.



수학적으로 라플라스 연산자 ∇²은 이미지 함수 f(x, y)의 그래디언트의 발산으로 정의됩니다. 여기서 (x, y)는 이미지의 공간 좌표를 나타냅니다:

![image](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_1.png)

라플라스 연산자는 각 픽셀에서 이미지 강도 함수의 지역 곡률을 측정합니다. 높은 양수 값은 빠른 강도 변화(가장자리)를 나타내며, 낮은 값은 부드러운 영역을 나타냅니다.

라플라스 연산자의 분산을 계산함으로써 이미지의 선명도를 측정할 수 있습니다. 더 높은 분산 값은 더 날카로운 가장자리와 뚜렷한 특징을 나타냅니다.



다음은 라플라시안 연산자를 구현한 Python 코드입니다:


![Code](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_2.png)


이 기술을 샘플 데이터셋에 적용하면 Figure 1의 이미지가 날카로운 점수가 가장 낮지만 더 선명하게 보이고, 실제로 왜곡된 Figure 2의 이미지가 더 높은 날카로운 점수를 가지게 됨을 관찰할 수 있습니다.


![Sample Dataset](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_3.png)




![이미지](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_4.png)

노이즈에 민감한 한계: 노이즈가 많은 이미지에서는 라플라시안 연산자가 노이즈를 가장자리로 감지할 수 있으므로 높은 분산과 오해가능한 선명도 측정을 야기할 수 있습니다. 결과적으로 선명한 이미지와 흐린 이미지는 대부분 잘못 분류됩니다.

# 그래디언트 크기 방법

가장자리 감지는 이미지의 구조 정보를 공개하는 이미지의 가장자리를 찾는 과정입니다. Sobel 필터는 이미지 처리에서 일반적으로 사용되는 가장자리 검출 필터 유형입니다. 그들은 이미지 내에서 그래디언트 크기를 계산하여 이미지의 가장자리를 감지하는 데 자주 사용됩니다.



그라디언트는 이미지에서 픽셀 강도의 변화율을 나타냅니다. 그라디언트 크기는 이 그라디언트 벡터의 크기로, 이미지에서 한 지점에서 다른 지점으로 픽셀 강도가 얼마나 빨리 변하는지를 나타냅니다.

수학적으로, 이미지 함수 f(x, y)의 그라디언트는 공간 좌표 (x, y)에 대한 픽셀 강도의 변화율을 나타냅니다:

![그래픽](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_5.png)

그라디언트의 크기 ∥∇f(x, y)∥는 그라디언트 벡터의 유클리드 노름으로 계산됩니다:




![Sobel Operator](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_6.png)

이 값은 각 픽셀에서 모든 방향으로 픽셀 강도의 변화율을 나타냅니다. 높은 값은 가장자리와 질감과 같은 빠른 강도 변화 영역을 나타내고, 낮은 값은 부드러운 영역을 나타냅니다.

그런 다음 전체 이미지에서 이러한 그래디언트 크기의 평균(평균) 값을 계산합니다. 이 평균 그래디언트 크기는 이미지의 선명도나 가장자리의 존재를 전반적으로 측정하는 지표를 제공합니다. 높은 평균 또는 합계 값은 더 날카로운 가장자리와 뚜렷한 특징을 나타냅니다.

다음은 Sobel 연산자를 구현하는 Python 코드입니다:




![image1](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_7.png)

본 기술을 샘플 데이터셋에 적용하면, 아래 그림 3에 있는 이미지가 실제로 왜곡되었을 때 더 높은 선명도 점수를 갖는 반면, 선명도 점수가 가장 낮은 이미지들은 정확하게 식별됨을 관찰할 수 있습니다.

![image2](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_8.png)

![image3](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_9.png)



제한 사항: 균일한 영역이나 낮은 대비 특징을 가진 이미지의 경우, 그레디언트 크기는 낮은 크기의 값으로 나타날 수 있어 날카로움을 과소평가할 수 있습니다. 반면 복잡한 질감이나 높은 대비 가장자리를 가진 이미지의 경우, 그레디언트 크기는 더 높은 크기의 값을 생성할 수 있습니다. 따라서 전체적으로 이미지가 깨끗하다고 해도 높은 크기의 값이 나타날 수 있습니다.

# Fast Fourier Transformation 방법

푸리에 변환은 이미지의 주파수 성분을 분석하기 위해 사용되는 수학적 기술입니다.

이미지 함수 f(x, y)의 푸리에 변환 F(u, v)는 다음과 같이 정의됩니다:




![image](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_10.png)

(u, v)은 주파수 도메인의 공간 주파수 좌표를 나타냅니다.

Fourier 변환의 크기 스펙트럼 |F(u, v)|은 이미지에 존재하는 공간 주파수의 분포를 나타냅니다. 높은 크기 값은 가장자리 및 질감과 같은 고주파 구성 요소에 해당하고, 낮은 값은 부드러운 영역과 같은 저주파 구성 요소에 해당합니다.

고속 푸리에 변환(FFT) 방법을 사용하여 이미지 선명도를 평가할 때, 일반적으로 크기 스펙트럼을 분석하고 관련 통계량(평균과 같은)을 계산하여 이미지 전체에서 고주파 콘텐츠의 분포를 양적으로 측정합니다. 높은 통계량 값은 더 날카로운 가장자리와 뚜렷한 특징을 나타냅니다.




여기에 Fourier 변환을 구현하는 Python 코드가 있습니다:


![Python code](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_11.png)


이 기술을 샘플 데이터 집합에 적용한 결과, Figure 5의 이미지는 낮은 선명도 점수로 흐린 것으로 올바르게 식별되었으며 Figure 6의 이미지는 높은 선명도 점수로 날카로운 것으로 올바르게 식별되었습니다.


![Sample dataset application](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_12.png)




![이미지](/assets/img/2024-05-15-TechniquesforenhancingOCRaccuracybyassessingimagesharpness_13.png)

# 우리의 비즈니스 문제에서 가장 잘 작동한 방법은 무엇인가요?

사용된 이미지 샘플에서 Fast Fourier 변환은 다음과 같은 이유로 가장 잘 작동했습니다:

- 고주파 요소에 대한 민감도: Fast Fourier Transform은 고주파 요소에 매우 민감하여 날카로운 이미지 특징을 탐지하는 데 특히 효과적입니다. 고주파 요소는 푸리에 변환의 크기 스펙트럼에 상당한 기여를 하기 때문에 이미지의 날카로움을 정확하게 식별하고 측정할 수 있습니다.
- 이동 불변성 특성: 이미지의 위치나 방향에 상관없이 푸리에 변환은 일관되게 주파수 내용을 캡처하므로 이미지의 날카로움을 평가하는 강력하고 안정적인 방법입니다.



# 임계값을 결정하는 방법

임계값은 이미지의 선명도 점수를 기반으로 선명하고 흐린 이미지를 구별하는 기준점 역할을 합니다. 이미지의 품질, 텍스트의 특성(글꼴 크기, 스타일, 배경과의 대비) 및 애플리케이션의 특정 요구 사항 등 여러 요소에 따라 이미지 내 텍스트가 선명한지 흐린지를 결정하기 위한 이상적인 임계값이 달라집니다. 임계값을 초과하는 선명도 점수를 가진 이미지는 선명하다고 간주되며, 임계값 이하의 이미지는 흐린 것으로 간주됩니다. 임계값을 조정하면 OCR 처리에 적합한 선명도 수준을 유연하게 결정할 수 있습니다.

임계값을 결정하는 몇 가지 방법은 다음과 같습니다:

- 시각적 검사: 선명한 이미지와 흐린 이미지를 분리하는 방법으로 이미지를 검사하여 임계값을 찾아보는 것.
- 경험적 테스트: 선명한지 흐린지를 나타내는 진실 레이블이 있는 이미지 세트로 테스트 하는 것.
- 반복적 개선: 보수적 임계값부터 시작하여 성능에 따라 임계값을 조정하는 것을 통해 개선하는 것이 있습니다.



# 결론

결론적으로, 이미지에서의 흐림은 OCR 시스템에 중요한 도전 과제를 제공합니다. 이미지 처리의 기본 원리를 활용하고 임계값 기술을 통합함으로써, 푸리에 변환 방법은 이미지 선명도를 평가하는 믿을 수 있는 방법을 제공하여 OCR 정확성과 성능을 향상시킬 수 있습니다.

Monica Kadlay는 LinkedIn에서 활동 중입니다.