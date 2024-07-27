---
title: "컴퓨터 비전으로 파이썬을 사용해 녹색 배경을 다른 이미지로 교체하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-UsingPythontoconvertGreenbackgroundwithanotherImageComputerVision_0.png"
date: 2024-07-09 14:37
ogImage:
  url: /assets/img/2024-07-09-UsingPythontoconvertGreenbackgroundwithanotherImageComputerVision_0.png
tag: Tech
originalTitle: "Using Python to convert Green background with another Image | Computer Vision"
link: "https://medium.com/@maria-asghar/using-python-to-convert-green-background-with-another-image-computer-vision-acb0f70419d4"
---

디지털 이미지 처리 및 비디오 편집에서 특정 색상(일반적으로 녹색 또는 파랑)을 다른 이미지 또는 비디오 시퀀스로 대체하는 기술은 염색 키 또는 그린 스크린이라고 일반적으로 알려져 있습니다. 이 기술은 영화 제작, 텔레비전 제작 및 소셜 미디어 플랫폼에 매력적인 콘텐츠를 만드는 데 널리 사용됩니다. 이 기술은 파이썬을 사용하여 구현할 수 있습니다.

이제 파이썬 코드의 각 단계를 분해하여 녹색 배경을 이미지에서 제거하고 다른 이미지로 대체하는 방법을 이해해 보겠습니다:

```python
# 필요한 라이브러리 가져오기

코드는 필요한 라이브러리를 가져오는 것으로 시작합니다. OpenCV 함수를 위해 cv2를, 숫자 연산을 위해 numpy를 가져옵니다.
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import cv2
import numpy as np
```

# 이미지 읽기 및 크기 조정

두 개의 이미지, greenscreen01.jpg(녹색 배경을 가진 주 이미지)와 scenic04.jpg(대체 이미지)를 읽습니다. 두 이미지 모두 균일한 크기로 조정됩니다(이 경우 500x500 픽셀) 이후의 처리를 위해 호환성을 보장합니다.

```js
# 주 이미지(녹색 배경)와 대체 이미지를 읽기
main_image = cv2.imread('greenscreen01.jpg')
replacement_image = cv2.imread('scenic04.jpg')

main_image = cv2.resize(main_image, (500, 500))
replacement_image = cv2.resize(replacement_image, (500, 500))
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image](/TIL/assets/img/2024-07-09-UsingPythontoconvertGreenbackgroundwithanotherImageComputerVision_0.png)

## HSV로 변환

주 이미지 (main_image)는 BGR (기본 OpenCV 색상 형식)에서 HSV (색조, 채도, 값) 색 공간으로 변환됩니다. HSV는 색상 기반 세분화에 유용합니다.

```js
# 주 이미지를 HSV 색 공간으로 변환
hsv_main = cv2.cvtColor(main_image, cv2.COLOR_BGR2HSV)
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 색상 범위 정의

HSV 공간에서 녹색 색상의 범위는 하한 및 상한 임계값 (lower_green 및 upper_green)을 사용하여 정의됩니다. 이러한 값은 주 이미지에 나타난 녹색 음영의 범위를 커버하도록 경험적으로 조정됩니다.

```js
# HSV 색 공간에서 녹색 색상 범위 정의
lower_green = np.array([35, 50, 50])
upper_green = np.array([85, 255, 255])
```

# 마스크 생성 및 녹색 픽셀 대체

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이진 마스크(mask)는 cv2.inRange()을 사용하여 생성됩니다. 이는 메인 이미지 내에서 지정된 녹색 색상 범위 내에 속하는 픽셀을 식별합니다. 마스크(mask) 내에서 0이 아닌 값에 해당하는 메인 이미지의 픽셀(즉, 녹색 픽셀)은 대체 이미지의 픽셀로 대체됩니다.

```python
# 정의된 범위 내의 녹색 픽셀에 대한 마스크 생성
mask = cv2.inRange(hsv_main, lower_green, upper_green)

# 대체 이미지에서 해당 픽셀로 녹색 픽셀 교체
modified_main_image = main_image.copy()
modified_main_image[mask > 0] = replacement_image[mask > 0]
```

# 결과 표시

수정된 이미지(modified_main_image)는 cv2.imshow()를 사용하여 표시되며, 초록 배경 제거 효과를 시각적으로 확인할 수 있습니다. cv2.waitKey(0)는 이미지 창을 닫기 위해 키 입력을 기다리며, cv2.destroyAllWindows()는 모든 OpenCV 창을 정상적으로 닫습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 수정된 메인 이미지 표시
cv2.imshow('수정된 메인 이미지', modified_main_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

![2024-07-09-UsingPythontoconvertGreenbackgroundwithanotherImageComputerVision_1](/TIL/assets/img/2024-07-09-UsingPythontoconvertGreenbackgroundwithanotherImageComputerVision_1.png)

# 결론

이러한 몇 가지 단계를 사용하면 Python과 OpenCV를 활용하여 이미지에서 녹색 배경을 효과적으로 제거할 수 있습니다. 이미지를 HSV 색 공간으로 변환하고, 녹색 색상 범위를 정의하고, 마스크를 생성하고, 픽셀을 대체함으로써, 이 코드는 녹색 배경을 다른 이미지로 대체하는 원하는 효과를 제공합니다. 이 기술은 비디오 시퀀스를 처리하고 비디오 편집 및 특수 효과 제작에서 만날 수 있는 더 복잡한 시나리오를 처리하기 위해 더 확장될 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 참고 자료

https://opencv.org/
