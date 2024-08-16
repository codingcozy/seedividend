---
title: "TypeScript 인덱스 시그니처에 대한 설명"
description: ""
coverImage: "/assets/img/2024-05-14-TypeScriptIndexSignatureExplained_0.png"
date: 2024-05-14 12:59
ogImage: 
  url: /assets/img/2024-05-14-TypeScriptIndexSignatureExplained_0.png
tag: Tech
originalTitle: "TypeScript Index Signature Explained"
link: "https://medium.com/gitconnected/typescript-index-signature-explained-b040a78a0467"
isUpdated: true
---




<img src="/assets/img/2024-05-14-TypeScriptIndexSignatureExplained_0.png" />

TypeScript의 인덱스 시그니처는 객체의 속성이 미리 알려지지 않았지만 속성의 유형이 알려진 경우 동적 데이터 구조를 정의하는 방법을 제공합니다. 이들은 동적 속성 액세스를 허용하며 키의 변수 집합을 가진 객체와 작업할 때 특히 유용합니다.

이 게시물에서는 인덱스 시그니처에 대해 자세히 알아보고, TypeScript에서 사용하는 방법 및 사용 시기에 대해 설명할 것입니다.

## 인덱스 시그니처란 무엇인가요?



인덱스 시그니처는 대괄호 []와 키에 대한 유형, 콜론 및 해당 값에 대한 유형을 사용하여 정의됩니다. 이를 통해 TypeScript는 객체의 예상 구조를 이해하고 강제할 수 있게 됩니다.

```js
interface MyStats {
  [key: string]: number;
}
const scores: MyStats = {
  total: 50,
  average:80
}
// 인덱스 시그니처는 유형 제약을 강제합니다
// 여기서 값은 반드시 숫자여야 합니다
const scores2: MyStats = {
  total: "50", // 'string' 유형은 'number' 유형에 할당할 수 없습니다.(2322)
  average: 80
}
```

이 예에서 MyStats는 어떤 문자열 키도 가질 수 있고, 해당 키와 연관된 값은 반드시 숫자형이어야 합니다.

인덱스 시그니처의 구문은 인터페이스나 유형 선언 내에서 [] 표기법을 사용하는 것을 포함합니다. 아래 예시는 인터페이스와 유형에 대한 동일한 인덱스 시그니처를 보여줍니다.




인덱스 시그니처는 다양한 키 유형을 사용할 수 있으며 연관 값 유형은 유효한 TypeScript 유형일 수 있음에 유의하세요.

## 인덱스 시그니처를 명시적 멤버와 섞어 사용하기

TypeScript에서 인덱스 시그니처를 명시적 멤버 선언과 혼합할 수 있습니다. 알려진 및 동적 속성을 조합해야 하는 경우에 유용합니다.




```js
인터페이스 자동차구성 {
  [기능: 문자열]: 숫자;
  가격: 숫자;
}
```

인덱스 시그니처와 명시적 멤버를 섞을 때는 모든 명시적 멤버가 인덱스 시그니처 유형을 준수해야 합니다.

```js
// 유효하지 않은 경우
인터페이스 자동차구성 {
  [기능: 문자열]: 숫자;
  가격: 숫자;
  모델: 문자열; // 오류: '모델' 속성의 '문자열' 유형은 '숫자' 인덱스 유형에 할당할 수 없습니다.
}

// 유효한 경우
인터페이스 자동차구성 {
  [기능: 문자열]: 숫자 | 문자열;
  가격: 숫자;
  모델: 문자열;
}
```

## 읽기 전용 인덱스 시그니처



인덱스 시그니처는 읽기 전용 수정자를 지원합니다. 읽기 전용 수정자를 적용하면 객체 내의 속성이 변경 불가능해집니다.

```js
interface Car {
  readonly [key: string]: boolean;
}

const toyota: Car = {hybrid: true, luxury: false};
toyota.hybrid = false; //에러: 'Car' 타입의 인덱스 시그니처는 오직 읽기만 허용됩니다.(2542)
```

위 예시에서 'hybrid' 속성을 수정하려고 하면 오류가 발생합니다. 왜냐하면 인터페이스가 읽기만 허용하기 때문이죠.

## 인덱스 시그니처 사용 방법



실제로 인덱스 시그니처가 어떻게 사용될 수 있는지에 대한 실제 예시를 살펴봅시다. 여러 기능을 포함하는 웹 애플리케이션을 개발하고 있다고 상상해보세요. 각 기능은 해당하는 설정을 가지고 있으며, 이를 활성화하거나 비활성화할 수도 있습니다.

```js
interface FeatureConfig {
  [feature: string]: {
    enabled: boolean;
    settings: Record<string, boolean>;
  }
}
```

이 예시에서는 FeatureConfig라는 인터페이스를 정의합니다. 이 인터페이스는 문자열 타입의 동적 속성 이름을 허용하도록 인덱스 시그니처를 사용하며, 해당 속성과 설정 객체와 연결된 enabled 불리언 속성이 포함되어 있습니다. 동적 기능 이름과 관련된 설정을 나타내는 데 유용합니다. 예를 들어, 다음과 같은 객체에 이 인터페이스를 적용할 수 있습니다.

```js
const features: FeatureConfig = {
  profile: {
    enabled: true,
    settings: {
      showPhoto: true,
      allowEdit: false,
    },
  },
  notification: {
    enabled: false,
    settings: {
      richText: true,
      batchMode: true
    },
  }
};
```



기능 객체에서는 기능 이름이 달라질 수 있지만, 각 기능의 구조는 일관적으로 유지됩니다. 각 기능은 활성화된 부울 값과 설정 객체가 있어야 합니다.

위 인터페이스에서 기능 이름에 유니언 타입 제약을 적용할 수 있을까요?

만약 애플리케이션에서 사용하는 기능 집합이 알려져 있다면, 문자열 리터럴의 유니언인 FeatureType을 정의할 수 있습니다.

```js
type FeatureType = '프로필' | '알림' | '리포팅';
```



색인 시그니처 키는 유니언 타입을 지원하지 않지만, 맵드 타입을 사용하여 해결할 수 있습니다.

```js
type FeatureConfig2 = {
  [feature in FeatureType]: {
    enabled: boolean;
    settings: Record<string, boolean>;
  }
}
```

[feature in FeatureType]는 유니온 타입 FeatureType(프로필, 알림 및 보고서를 포함)의 각 문자열 리터럴을 반복하는 맵드 타입이며, 각 값을 결과 타입의 속성 이름으로 사용합니다.

다음은 사용 예시입니다:



```js
const allFeatures: FeatureConfig2 = {
   profile: {
      enabled: true,
      settings: {
         showPhoto: true,
         allowEdit: false,
      },
   },
   notification: {
      enabled: false,
      settings: {
         richText: true,
         batchMode: true
      },
   },
   reporting: {
      enabled: true,
      settings: {
         template: false,
         advanceExport: true
      },
   },
};
```

모든 기능이 FeatureType에 정의된 모든 기능과 일치해야 합니다.

만약 일부 기능을 허용하려면 색인 서명 유형을 "?"를 선택적 플래그로 하는 형태로 수정해야 합니다. 그런 다음, FeatureConfig2 유형을 사용하여 일부 기능만 포함하는 객체를 만들 수 있습니다.

```js
type FeatureType = 'profile' | 'notification' | 'reporting';

type FeatureConfig2 = {
  [feature in FeatureType]?: {
    enabled: boolean;
    settings: Record<string, boolean>;
  }
}

const subsetFeatures: FeatureConfig2 = {
   profile: {
      enabled: true,
      settings: {
         showPhoto: true,
         allowEdit: false
      },
   }
};
```



## 인덱스 시그니처를 효과적으로 사용하는 방법

일반적으로 사용되는 시나리오에는 다음이 포함됩니다:

- 설정 객체: 위 예제에서 보듯, 인덱스 시그니처는 설정 객체가 동적 키와 관련 값이 있을 수 있는 시나리오에서 뛰어난 성능을 발휘합니다.
- 데이터 변환: 데이터 변환이나 구문 분석을 다룰 때 인덱스 시그니처는 유용할 수 있습니다. 입력 데이터의 구조가 다양한 경우 유연하게 처리할 수 있습니다.
- 확장성: 플러그인 아키텍처나 모듈식 시스템과 같이 확장성이 중요한 프로젝트에서는 새 구성 요소를 추가할 때 기존 코드를 수정하지 않고 인덱스 시그니처를 이용할 수 있습니다.

인덱스 시그니처는 강력하지만 남용해서는 안 됩니다. 인덱스 시그니처를 구현하기 전에 데이터 구조를 더 명시적인 인터페이스나 타입 정의로 대체할 수 있는지 고려해야 합니다, 특히 키가 특정 의미를 가질 때입니다.



다른 고려 사항은 인덱스 시그니처를 엄격하게 테스트하는 것입니다. 이는 동적 구조의 특성이 예기치 못한 문제를 발생시키지 않도록 다양한 키-값 조합을 테스트하여 확인하는 것을 포함합니다.

흔한 실수를 피하고 최선의 방법을 따르면 TypeScript 코드를 더 유연하고 탄력적으로 만드는 데 인덱스 시그니처를 사용할 수 있습니다.

즐거운 프로그래밍 되세요!