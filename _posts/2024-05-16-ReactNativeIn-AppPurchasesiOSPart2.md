---
title: "리액트 네이티브 인앱 구매 iOS - 2부"
description: ""
coverImage: "/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_0.png"
date: 2024-05-16 03:53
ogImage: 
  url: /assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_0.png
tag: Tech
originalTitle: "React Native In-App Purchases (iOS) — Part 2"
link: "https://medium.com/simform-engineering/react-native-in-app-purchases-ios-part-2-9ac7ce752105"
---


## iOS에서 인앱 구매 구성

![image](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_0.png)

Part 1에서는 인앱 구매, 그 유형 및 그 이점에 대해 배웠습니다.

이 블로그에서는 인앱 구매의 유형을 구독과 인앱 구매로 분류합니다.



구독에는 자동 갱신 및 비갱신 타입 두 가지가 있습니다.

![Auto-Renewable Subscriptions](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_1.png)

## 자동 갱신 구독



다시 마켓에서 구독 그룹을 설정해야 합니다.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_2.png)



2. 구독 만들기

그룹을 형성한 후 제품을 만듭니다. 그룹으로 이동하여 "생성" 버튼이나 이미 구독이 있는 경우 플러스 (+) 아이콘을 클릭합니다.

![image](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_3.png)

구독을 성공적으로 생성한 후에는 필요한 정보를 제공하세요. 이 정보에는 다음이 포함됩니다:



구독 기간: 구독 만료 전에 기간을 지정합니다.

가족 공유: 이를 활성화하면 다른 가족 구성원이 구독을 다시 구매하지 않고 사용할 수 있습니다. 한 번 활성화되면 비활성화할 수 없음을 유념하세요.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_4.png)

3. 가능 여부



App Store에서 지원하는 175개 국가나 지역에서 구독을 이용할 수 있습니다.

![image](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_5.png)

4. 구독 가격

국가별로 가격을 구성하세요. 국가를 선택한 다음 목록에서 가격을 선택합니다. 가격은 수동으로 추가할 수 없습니다.



<img src="/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_6.png" />

"다음"을 클릭한 후에는 필요에 따라 각 국가의 비용을 확인하고 조정할 수 있습니다.

5. 세금 카테고리 설정

앱의 카테고리에 해당하는 세금 카테고리를 선택하여 구독 가격에 영향을 미칩니다.



마크다운 형식으로 표 태그를 변경해주세요.


<img src="/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_7.png" />

6. App Store Localization

다른 지역이나 국가의 사용자를 위해 로컬화된 제품 정보를 제공하세요. 디스플레이 이름과 설명을 포함합니다.

<img src="/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_8.png" />




7. 앱 스토어 프로모션 및 리뷰 정보

프로모션을 위해, 고객이 제공 코드를 교환할 때 앱 제품 페이지에 나타날 이미지(1024 x 1024 픽셀 이하)를 업로드하십시오.

리뷰 섹션의 스크린샷은 애플 리뷰 전용이며 앱 스토어에 표시되지 않습니다.

<img src="/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_9.png" />



위 단계를 완료한 후 "저장"을 눌러 제품을 추가하세요.

## 비갱신 구독

비갱신 구독은 기간이 끝나면 만료됩니다. 계속 사용하려면 다시 구매해야 합니다. 예시로는 Weather Underground, Pocket Casts, Nova Launcher 등이 있습니다.

비갱신 구독을 추가하려면:



1. 구독 관리
"관리"를 클릭하여 대시보드에 액세스하면 비갱신 구독을 추가할 수 있습니다.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_10.png)

2. 비갱신 구독 생성
플러스 (+) 아이콘을 선택하여 새 구독을 위한 참조 이름 및 제품 ID를 추가하십시오. 제품을 만든 후에는 해당 정보를 볼 수 있고 수정할 수 있습니다.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_11.png)



제품을 생성한 후에는 해당 정보를 확인하고 수정할 수 있습니다.

![product_image](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_12.png)

3. 가용성

App Store에서 지원하는 175개 국가나 지역에서 구독을 이용할 수 있습니다.



이미지 태그를 Markdown 형식으로 변경해주세요.

md
![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_13.png)


4. 가격 일정

가격을 구독과 국가 요율에 기반하여 설정하세요.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_14.png)



5. 세금 카테고리 설정

구독 가격에 영향을 미치는 앱에 적합한 세금 카테고리를 선택하세요.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_15.png)

6. 앱스토어 지역화



구독을 위한 표시 이름과 설명을 제공해주세요. 구독 구매 팝업 상자에 표시됩니다.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_16.png)

7. 앱 스토어 프로모션 및 리뷰 정보

앱 스토어 프로 motion을 위한 이미지를 업로드하고, Apple 리뷰를 위한 스샷을 제공해주세요.




![Image](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_17.png)

# 앱 내 구매

앱 내 구매에는 소비 가능 및 비소비 가능 두 가지 유형이 있습니다.

- 소비 가능은 사용 후 사라지고 다시 구매해야하는 항목을 구매하고 사용할 수 있는 것을 의미합니다.
- 비소비 가능은 사용자가 한 번 구매하면 영구적으로 사용할 수 있는 것을 의미합니다.




앱 스토어 커넥트 계정으로 이동해서 앱을 선택하고 MONETIZATION 아래의 In-App Purchases 섹션으로 이동해주세요.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_18.png)

1. 인앱 구매 생성하기

제품을 추가하려면 플러스(+) 아이콘을 클릭하고, 소비형 또는 비소비형 중에서 선택해주세요. 참조 이름과 제품 ID를 입력해주세요.




![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_19.png)

2. Family Sharing and Availability

For non-consumable items, you can enable Family Sharing, allowing users to share the purchase across family members’ accounts. Once enabled, this cannot be disabled.

You can also choose to make your in-app purchases available in any supported country or region.




<img src="/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_20.png" />

3. 인앱 구매 가격 설정

가격을 설정하려면 먼저 나라를 선택하세요. 가격은 수동으로 설정할 수 없고 드롭다운 목록에서 선택해야 합니다. 필요에 따라 다른 국가에 대한 가격을 조정하세요.

<img src="/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_21.png" />



4. 세금 카테고리 설정

앱의 세금 카테고리를 선택하여 인앱 구매 가격에 영향을 줍니다.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_22.png)

5. 앱 스토어 로컬라이제이션



만약 당신의 앱이 다른 지역이나 국가의 사용자를 대상으로 한다면, 디스플레이 이름과 설명을 포함한 현지화된 제품 정보를 제공해주세요.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_23.png)

6. 앱 스토어 홍보 및 리뷰 정보

프로모션을 위해, 고객이 할인 코드를 교환할 때 당신의 앱 제품 페이지에 나타날 이미지(1024 x 1024 픽셀 이하)를 업로드해주세요.



리뷰 섹션에 표시되는 스크린샷은 Apple 리뷰 전용이며 앱 스토어에는 표시되지 않습니다.

![Image](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_24.png)

인앱 구매를 성공적으로 정의한 후, 빌링 라이브러리가 포함된 빌드를 업로드하여 이를 활성화하세요.

# 빌링 용서 기간



결제 유예 기간은 구독자가 선택한 기간 동안 요금 청구 문제로 구독이 만료되더라도 당신의 앱의 유료 콘텐츠에 액세스할 수 있도록 합니다.

![이미지](/assets/img/2024-05-16-ReactNativeIn-AppPurchasesiOSPart2_25.png)

# 결론

이 섹션에서는 구독 및 인앱 구매 제품을 만드는 단계와 결제 실패에 대한 유예 기간 설정에 대해 개요를 제시했습니다.



제 3부에서는 안드로이드 앱 내 구매 및 구독을 통합하는 단계를 다룰 것입니다.