---
title: "잠시만, 종 TypeScript를 잘못 사용하는 이유입니다"
description: ""
coverImage: "/assets/img/2024-05-14-ZodWhyyoureusingTypeScriptwrong_0.png"
date: 2024-05-14 13:35
ogImage: 
  url: /assets/img/2024-05-14-ZodWhyyoureusingTypeScriptwrong_0.png
tag: Tech
originalTitle: "Zod: Why you’re using TypeScript wrong"
link: "https://medium.com/ekino-france/zod-why-youre-using-typescript-wrong-b0c1583df089"
---


![이미지](/assets/img/2024-05-14-ZodWhyyoureusingTypeScriptwrong_0.png)

간략 요약: 런타임에서 외부 데이터를 검증해야 합니다.

웹 개발 경험이 있다면, API에서 외부 데이터를 다룰 때 런타임 오류를 반드시 마주쳐보았을 것입니다. TypeScript를 사용하면 애플리케이션 전체에서 모든 데이터의 구조와 유형을 상기시켜 주어 이러한 오류를 크게 줄일 수 있습니다. 그러나 TypeScript는 컴파일 중에 알려진 데이터에 대한 불가능한 작업을 방지하는 데 강점을 가지고 있지만, 외부(다른 말로, 알 수 없는) 데이터에 대해서는 너무 관대할 수 있습니다.

본 문서에서는 TypeScript를 사용하여 런타임에서 실패할 수 있는 코드를 작성할 수 있게 하는 이유와 Zod가 이러한 데이터 관련 오류를 방지할 수 있는 방법에 대해 설명하겠습니다.



# TypeScript의 목표

소개에서 말했듯이, TypeScript의 아이디어는 전체 코드에서 모든 데이터의 구조와 유형을 추적하는 것입니다. 이는 IDE에서 자동완성을 제공하는 데 도움이 되는 것뿐만 아니라 런타임 중에 오류를 일으킬 수있는 유효하지 않은 작업을 방지하기도 합니다. 이론적으로 TypeScript 컴파일 중에 발생할 수 있는 모든 런타임 오류를 예측하고 식별할 수 있습니다. 그러나 실제론 그렇지 않습니다.

## TypeScript는 목표를 달성하지 못했을까요?

실제로 TypeScript의 주요 목표는 생산성을 향상시키는 것입니다. 이것은 TypeScript가 언제나 "안전"보다는 생산성을 선택한다는 것을 의미합니다.



있는 것은 any 타입입니다. 그러나 널리 받아들여지는 것은 사용하지 말아야 한다는 것입니다. 그러나 우리 코드에서 any를 하나도 쓰지 않는다고 해서 우리 애플리케이션이 런타임 오류에 면역이라는 뜻은 아닙니다. 다음 스니펫을 살펴보세요:

```js
const obviouslyAnArticle: Article = JSON.parse(input); // input is a string
```

JSON.parse의 반환 타입이 any인데, 이는 명시적으로 타입이 지정된 변수(이 예에서는 Article)와 연관시킬 수 있습니다. 우리 자신으로부터 명시적으로 작성하지 않아도 TypeScript에게 우리가 any로 작성하지 않고도 파싱된 내용이 Article 타입을 충족하지 않을 수 있는 런타임 가능성을 무시하도록 알려주고 있는 것입니다.

## unknown 및 단언(assertions)



만약 '어느' 대신 '모든'이 사용되었다면 위 조각을 만들 수 없었을 것입니다. 대신 as 키워드를 사용하여 명시적인 주장을 작성해야 합니다:

```js
const shouldBeAnArticle = JSON.parse(input) as Article;
```

이 구문을 사용하면 TypeScript에게 명시적으로 경계를 낮추도록 지시합니다. 여전히 좋지 않지만 숨겨지지 않았어요!

## 유형 좁히기 식



위험한 유형 단언을 의존하는 대신, 유형 축소 표현식을 사용할 수 있어요.

예를 들어, JavaScript에서 제공하는 typeof 연산자는 객체의 유형을 런타임 중에 결정할 수 있어요.

```js
console.log(typeof 42);
// 기대하는 출력: "number"
```

조건문에서 사용되면 TypeScript는 객체의 유형을 축소할 수 있어요.



```js
if(typeof input === "string") {
    // input이 문자열 형식으로 좁혀졌습니다.
    submit(input.toLowerCase());
}
```

이 표현은 TypeScript에게 해당 범위에서 input이 문자열만 가능함을 예측할 수 있도록 해줍니다.

## 타입 추론

TypeScript는 다른 표현식들로 타입을 좁힐 수 있지만, 이는 보통 유니언 혹은 원시 타입을 구체화할 때 의미가 있습니다. 이를 "타입의 차별"이라고 부릅니다.



```js
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    // input is narrowed to the type Fish
    return animal.swim();
  }
  // input is narrowed to the type Bird
  return animal.fly();
}
```

위 예제에서 키워드 in은 TypeScript가 animal 객체의 유형을 식별하도록 합니다.

알 수 없는 데이터의 경우, 유형 판별은 시간 낭비일 수 있습니다:

```js
if(typeof input !== "string") {
    // input is still unkown
}
```



외부 데이터에 대해 유형 좁히기 표현식에만 의존할 수 없다는 뜻이에요. 유형을 좁히기 위한 또 다른 방법이 필요합니다: 데이터 유효성 검사.

# Zod가 도와줍니다

Zod는 기본적으로 객체 스키마 유효성 검사 도구입니다. 이는 정의된 스키마를 가진 모든 객체의 유효성을 런타임에서 보장할 수 있다는 뜻이에요.

## 스키마 선언



Zod을 사용할 때 첫 번째 할 일은 스키마를 정의하는 것입니다.

```js
import * as z from "zod";

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number().optional()
}).strict();
```

만약 이전에 yup이나 joi와 같은 유효성 검사 도구를 사용해본 적이 있다면, 이 방법에 익숙할지도 모릅니다. Zod은 object(), string()과 같은 여러 함수를 제공하며, 각 함수는 Zod 스키마를 반환하고 이를 조합하여 더 큰 스키마를 만들 수 있습니다.

각 스키마 조각은 .optional()과 같은 메소드를 사용하여 "새롭게 정의"될 수 있으며, 이를 통해 복잡한 유효성 검사 규칙을 얻을 수 있습니다.



## 스키마 사용하기

스키마는 데이터를 유효성 검사하는 두 가지 방법을 제공합니다. .parse() 메서드는 에러를 throw할 수 있고, .safeParse() 메서드도 그렇습니다:

```js
const result = userSchema.safeParse(input);
if (!result.success) {
  result.error;
} else {
  result.data; // 데이터 유형은 userSchema에서 유추됩니다
}
```

파싱이 실패하거나 정의된 유효성 검사 스키마와 일치하는 객체가 반환됩니다. 이 경우 객체는 스키마 구조에서 추론된 유형을 상속받습니다.



## 스키마로부터 타입 추론하기

일반적으로 데이터는 여러 범위와 문맥에서 공유됩니다. 이러한 이유로 우리는 보통 한번만 타입 별칭을 선언하고 나서 데이터가 전달되는 모든 곳에서 사용합니다. Zod는 z.infer`` 제네릭을 제공하여 스키마에서 추론된 타입에 액세스할 수 있습니다.

```js
type Article = z.infer<typeof articleSchema>;
```

# Zod 실용적 사용법



따라서, TypeScript 프로젝트에서 Zod를 사용하는 경우는 어디인가요?

## API 응답 구문 분석

알 수 없거나 예측할 수 없는 데이터의 주요 원천은 API 응답입니다. fetch promise에서 오는 데이터를 수동으로 유효성을 검사할 수 있습니다.

```js
fetch(getArticle)
  .then((response) => response.json())
  .then((data) => {
    return articleSchema.parse(data);
  })
  .catch(console.error);
```



테이블 태그를 Markdown 형식으로 변경할 수도 있어요. 

## 양식 데이터 유효성 검사

사용자 입력 또한 외부 데이터의 하나이죠. Zod는 문자열 유효성 검사를 위한 내장 유틸리티를 제공해요. 물론, .refine() 메서드를 사용하여 자신만의 규칙을 구현할 수도 있어요.

```js
const myString = z.string().refine((val) => val.length <= 255, {
  message: "문자열은 255자를 초과할 수 없어요",
});
```



만약 React를 사용 중이라면, React Hook Form에서 양식 유효성 검사를 위해 Zod 스키마를 사용할 수 있어요.

## 구분하는 유형?

저는 버전 1부터 Zod를 사용하기 시작했어요. 이 버전에는 .check() 메서드가 포함되어 스키마를 유형 가드로 사용할 수 있게 되었는데, 이는 유형을 구분하는 조건으로 사용될 수 있었어요.

이 기능 때문에 “full-schema" 접근 방식을 선택하고 Zod를 유효성 검사 및 유형 구분 모두에 사용하게 되는 것이 유혹스러웠어요. 그러나 이 방식을 취하는 것은 빠르게 시간이 낭비되는 것으로 나타났어요.



해당 메서드는 라이브러리의 다음 버전에서 삭제되었습니다. 이것은 좋은 일이에요. 왜냐하면 Zod는 이제 외부 데이터 유효성 검사에 집중하고 있거든. 타입 축소 표현은 대부분의 상황에서 충분히 유용해서 타입 판별에 좋은 도구가 됐어요.

# 요약

TypeScript는 기본적으로 너무 관대해요. 더 안전한 코드를 작성하려면 외부 데이터(본질적으로 알 수 없는 데이터)를 Zod와 같은 도구로 유효성을 검사해야 해요. Zod는 폼 입력이나 API 응답과 같이 예측할 수 없는 데이터를 유효성 검사하는 데 가장 유용해요. 그 외의 대부분의 시나리오에서는 타입 축소 표현만으로 충분할 거에요.