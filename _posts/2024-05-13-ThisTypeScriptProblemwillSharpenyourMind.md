---
title: "TypeScript 문제 하나로 똑똑해지는 시간을 가져보세요"
description: ""
coverImage: "/assets/img/2024-05-13-ThisTypeScriptProblemwillSharpenyourMind_0.png"
date: 2024-05-13 00:18
ogImage: 
  url: /assets/img/2024-05-13-ThisTypeScriptProblemwillSharpenyourMind_0.png
tag: Tech
originalTitle: "This TypeScript Problem will Sharpen your Mind"
link: "https://medium.com/gitconnected/this-typescript-problem-will-challenge-your-mind-87142e0401fe"
---



![이미지](/assets/img/2024-05-13-ThisTypeScriptProblemwillSharpenyourMind_0.png)

TypeScript는 데이터를 강화하고 깨끗한 코드를 개발할 수 있게 해 주는 환상적인 도구입니다.

오늘은 Mapped Types의 사용을 통해 현실적인 문제를 해결해 보겠습니다.

그럼, 더 이상 미루지 말고 지금 바로 시작해 보겠습니다!



## 문제

여기서는 국가 코드와 통화 간의 매핑을 나타내기 위해 country-to-currency 패키지를 사용하고 있습니다. 다음과 같이 국가 코드와 통화 간의 매핑을 표현합니다:

```js
import countryToCurrency, {
  Currencies,
  // 이것은 이해하기 쉬워 보이기 때문에
  // `CountryCodes`로 이름 변경되었습니다.
  Countries as CountryCodes,
} from "country-to-currency"

// 가독성을 위해 정의됨
type CountryToCurrency = typeof countryToCurrency

// type Currencies = "GBP" | "USD" ...
// type CountryCodes = "GB" | "US" ...
// type CountryToCurrency = { GB: "GBP", US: "USD" ... }
```

입력 통화에 따라 특정 국가 코드를 반환하고, 동시에 유형 안전성을 유지할 수 있으면 좋을 것 같습니다.



내가 무슨 말을 하는지 아래 코드를 통해 설명해보겠어:

```js
type Result = CountryCodesFromCurrency<"GBP">

// 결과 타입: "GB" | "GG" | "IM" | "JE"
```

더 잘 이해할 수 있도록 문제를 다이어그램을 이용해 시각화해볼게:

![이 타입스크립트 문제가 당신의 머리를 더 날카롭게 만들 것입니다](/assets/img/2024-05-13-ThisTypeScriptProblemwillSharpenyourMind_1.png)



우리는 기본적으로 통화를 해당 국가 코드로 역지도하는 작업을 하고 있어요.

## 해결책

이 작업을 Mapped Types를 사용하여 우아하게 처리할 수 있는 해결책이 있다는 것을 알게 되었어요.

```js
// 여기에 `Mapped Type`의 기본 예제가 있어요
// 이것은 타입을 가져와서 모든 값을 부울 값으로 변경할 거에요.
// 키는 그대로 유지한 채로요.

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
```



화폐에서 국가 코드로의 역매핑을 달성하려면 다음과 같은 논리를 따라야 합니다:

- Mapped 형식을 정의합니다.
- CountryToCurrency 매핑에서 각 키 (국가 코드)에 대해 값을 우리의 입력 ThisCurrency와 일치하는지 확인합니다.
- 일치하는 경우 해당 속성을 유지합니다.
- 일치하지 않는 경우 키 유형을 never로 설정하여 이 속성을 제거합니다.

그리고 이 작업을 수행하기 위한 코드는 다음과 같습니다:

```js
// 이해하지 못하면 아래에서 설명하는 코드 블록을 참조하세요.
type FilterMappingsFor<ThisCurrency extends Currencies> = {
  [CountryCode in keyof CountryToCurrency 
    as CountryToCurrency[CountryCode] extends ThisCurrency 
    ? CountryCode : never]: CountryToCurrency[CountryCode]
}
```



- 이통화에 대한 국가 코드를 원하는 필터 매핑을 정의하였습니다.
- 각 CountryCode 키를 반복합니다.
- 각 CountryCode에 대해 해당하는 통화(CountryToCurrency[CountryCode])와 입력값 ThisCurrency를 비교합니다.
- 통화가 일치하는 경우 현재 속성을 유지합니다.
- 일치하지 않는 경우 해당 키를 never로 설정하여 현재 속성을 효과적으로 제거합니다.

거의 다 왔어요!

현재 FilterMappingsFor`ThisCurrency` 유형은 올바른 매핑을 반환하지만 우리는 국가 코드만 필요합니다.

이제 새로운 유형 CountryCodesFromCurrency를 정의하여 필터된 매핑에서 모든 키를 추출합시다:



```js
// FilterMappingsFor 함수는 나라 코드와 통화에 대한 올바른 키-값 쌍을 반환하기 때문에,
// 이 새로운 타입은 우리가 원하는 것만 추출할 것입니다; 나라 코드입니다.
type CountryCodesFromCurrency<ThisCurrency extends Currencies> =
  keyof FilterMappingsFor<ThisCurrency>
```

마지막으로, 다음과 같이 새로운 타입 Result1과 Result2를 정의하여 이를 테스트할 수 있습니다:

```js
type Result1 = CountryCodesFromCurrency<"GBP">
type Result2 = CountryCodesFromCurrency<"NIO">

// 결과1: "GB" | "GG" | "IM" | "JE"
// 결과2: "NI"
```

# 추천 기사




# 제휴사

- Figma 홈: 제 모든 프로젝트에서 사용하는 UI 디자인 도구입니다.
- Figma 프로페셔널: 필요한 모든 UI 디자인 도구가 모두 이곳에 있습니다.
- FigJam: 직관적인 다이어그램 및 브레인스토밍으로 마음을 자유롭게 펼쳐보세요.

- Notion: 제 인생 전체를 조직하는 데 사용하는 도구입니다.
- Notion AI: ChatGPT를 능가하는 AI 도구로 Notion 작업을 최적화해줍니다.

# 참고문헌



- TypeScript Mapped Types 문서
- country-to-currency package