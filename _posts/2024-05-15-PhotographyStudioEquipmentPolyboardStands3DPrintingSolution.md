---
title: "사진 스튜디오 장비 - 폴리보드 스탠드 3D 프린팅 솔루션"
description: ""
coverImage: "/assets/img/2024-05-15-PhotographyStudioEquipmentPolyboardStands3DPrintingSolution_0.png"
date: 2024-05-15 16:14
ogImage: 
  url: /assets/img/2024-05-15-PhotographyStudioEquipmentPolyboardStands3DPrintingSolution_0.png
tag: Tech
originalTitle: "Photography Studio Equipment — Polyboard Stands 3D Printing Solution"
link: "https://medium.com/@xiaobo_fu/photography-studio-equipment-polyboard-stands-3d-printing-solution-d103ed6ff0a3"
---


# 폴리보드를 세우는 방법은?

사진 스튜디오에서 빛을 튕기거나 흡수하기 위해 폴리보드를 세우는 것은 일반적인 필수 작업입니다. 대형 폴리보드를 창고에서 구입하여 한 쪽을 검정색으로 칠하고 다목적 스튜디오 소품을 만들 수 있습니다. 그러나 2.4x1.2m의 폴리보드를 설치하는 것은 도전적일 수 있습니다.

많은 사진 스튜디오에서는 시중에서 구할 수 있는 금속 스탠드를 선택하지만, 이러한 제품들은 보통 비싸(일반적으로 £30-50), 볼품없고, 다양한 보드 두께에 적응하기 어려울 수 있다고 생각합니다. 또한, 여러 개를 보유하고 있다면 보관하기 불편할 수 있습니다.



위 단점들에 영감을 받아 나는 나만의 폴리보드 스탠드를 디자인하고 3D 프린트하기로 결정했어. 내가 생각하기에 이것이 현재 가장 최고일 수도 있을 거야.

관심 있는 사람들을 위해, 이 디자인의 STL 파일을 이 포스트의 끝에 공유할게.

# 초기 디자인 생각

스탠드의 주요 기능은 큰 폴리보드를 지지하는 거야. 스탠드의 다리는 보드의 중력 중심이 스탠드의 베이스 안에 떨어지도록 충분히 넓게 퍼져야 해. 대부분의 상업용 스탠드는 최대 50cm까지 퍼진다고 해.




![image1](/assets/img/2024-05-15-PhotographyStudioEquipmentPolyboardStands3DPrintingSolution_1.png)

여기서 나는 첫 번째 디자인 과제를 만났어. 내가 소유한 프린터는 프루사 미니인데, 그 프린터가 인쇄할 수 있는 최대 크기는 18x18x18cm이야. 그건 50cm보다 훨씬 작아. 그래서 디자인을 세 부분으로 나눠서 만들기로 했어. 그리고 그 부분들을 목재 공작에서 빌린 도비테일 조인트라는 조인 기술로 결합하기로 계획했지.

![image2](/assets/img/2024-05-15-PhotographyStudioEquipmentPolyboardStands3DPrintingSolution_2.png)

이점은 부품을 함께 유지하기 위해 추가 너트나 볼트가 필요 없다는 거야. 단순히 두 다리 부분을 중앙의 메인 부분에 넣으면 돼.




주요 부분은 보드의 하단을 집는 큰 개구부를 가지고 있어요. 전체 스탠드는 54cm에 이르며, 우리는 보드 양쪽 끝에 각각 하나씩 부착하여 안정하게 고정할 수 있어요. 미니멀한 디자인은 스튜디오 환경과 잘 어울리면서도 보관하기가 훨씬 쉽게 만들어 줘요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*w5hrWjFOsm_x7wo1CFHbJQ.gif)

## 결함 및 추가 개선

초기 디자인을 사용한 후 몇 가지 결함을 발견했어요. 주요 부분의 개구부 크기가 5cm로 설정되어 있어요. 그러나 폴리보드의 두께는 제작 오류로 4.5에서 5.5cm까지 다양할 수 있어요. 보드 두께가 개구부보다 작을 경우, 전체 세트를 이동할 때 스탠드가 자주 떨어지곤 하죠. 반면 보드 두께가 더 클 경우, 개구부에 강제로 밀어 넣을 때 일부 사용 후 플라스틱 스탠드가 파손되기도 해요.



개선을 위해 나사 구멍 부분에 유연한 기구를 추가하여 보드의 두께에 따라 크기가 조절되고 보드를 들거나 옮길 때 약간의 그립을 제공할 수 있도록 했어요.

나사 구멍에 '직선 모양' 패턴을 추가했는데, 이는 다양한 두께에 맞게 연질되는 스프링 역할을 합니다.

보드를 끼울 때, 변형이 주로 '직선 모양'의 굽힘 부위에서 발생하며, 이것은 연신류로 인해 빠르게 소재가 마모된다는 것을 의미해요. 결국, 이 기구는 스프링이 사라지고 디자인이 무의미해지게 됩니다. 

<img src="/assets/img/2024-05-15-PhotographyStudioEquipmentPolyboardStands3DPrintingSolution_3.png" />



수직으로 대륙을 인쇄하기로 선택하여 세 구성 요소를 동시에 인쇄할 수 있도록하였습니다. 그러나이 인쇄 방향은 구조의 강도를 향상시키지 않았습니다. 층을 평행하게 놓고 응력을 가할 때, 파란색 섹션에서 토크가 발생하여 결국 레이어가 찢어지게 되었습니다(그림 6 참조).

<img src="/assets/img/2024-05-15-PhotographyStudioEquipmentPolyboardStands3DPrintingSolution_4.png" />

그래서 모델을 "옆으로" 출력할 수 있도록 재배치했습니다. 또한, 도비테일 슬롯도 재배치하여 인쇄할 때 추가 지원이 필요하지 않습니다.

<img src="/assets/img/2024-05-15-PhotographyStudioEquipmentPolyboardStands3DPrintingSolution_5.png" />



"테이블" 태그를 마크다운 형식으로 변경했습니다.



다음은 최종 결과입니다: 쌓거나 보관하기 쉽고, 보드 두께가 4.5에서 5.5cm까지 맞는 미니멀 디자인입니다. 각 스탠드는 203g의 PLA를 사용하며, 재료 비용은 각각 약 £3입니다.

![이미지](/assets/img/2024-05-15-PhotographyStudioEquipmentPolyboardStands3DPrintingSolution_7.png)

디자인을 좋아하시고 유용하다고 생각하시면, 여기에서 사진 스튜디오 폴리보드 스탠드의 STL 파일을 다운로드할 수 있습니다.