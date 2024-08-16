---
title: "TypeScript에서 Type과 Interface 중 어떤 것을 선택해야 할까요 상세 안내"
description: ""
coverImage: "/assets/img/2024-06-20-ChoosingBetweenTypeandInterfaceinTypeScriptADetailedGuide_0.png"
date: 2024-06-20 01:33
ogImage: 
  url: /assets/img/2024-06-20-ChoosingBetweenTypeandInterfaceinTypeScriptADetailedGuide_0.png
tag: Tech
originalTitle: "Choosing Between Type and Interface in TypeScript: A Detailed Guide"
link: "https://medium.com/@jatin.jain_69313/choosing-between-type-and-interface-in-typescript-a-detailed-guide-4b25330a5e1d"
isUpdated: true
---




Node.js에서 TypeScript로 작업할 때, 종종 객체의 모양을 정의해야 합니다. 여기서 TypeScript의 타입과 인터페이스가 등장합니다. 두 가지 모두 객체의 구조를 설명하는 데 사용되지만, 어떤 것을 선택할지는 여러 요소에 따라 결정됩니다. 정보를 참고하여 신중한 결정을 내리는 데 도움이 되는 자세한 가이드가 여기 있습니다.

## 1. 사용 의도

- 인터페이스: 객체와 클래스의 구조를 정의하는 데 가장 적합합니다. 특정 형태에 대한 클래스나 객체의 준수를 보장하는 계약 역할을 합니다.
- 타입: 기본 타입, 유니언 타입, 튜플 타입 및 더 복잡한 유형 표현에 대한 별칭을 만드는 데 이상적입니다.

## 2. 확장성

<div class="content-ad"></div>

- 인터페이스: extends 키워드를 사용하여 확장 가능합니다. 이 기능은 계층적이고 유연한 디자인을 지원하여 기존 인터페이스를 기반으로 새로운 인터페이스를 쉽게 만들 수 있습니다.
- 타입: & 연산자를 사용하여 교차 타입을 확장할 수 있습니다. 이는 여러 타입을 결합하여 하나의 타입으로 만듭니다.

```js
interface User {
    id: number;
    username: string;
    email: string;
}

interface Admin extends User {
    adminLevel: number;
}
```

```js
type User = {
    id: number;
    username: string;
    email: string;
};

type Admin = User & {
    adminLevel: number;
};
```

## 3. 선언 병합

<div class="content-ad"></div>

- 인터페이스: 선언 병합을 지원합니다. 따라서 동일한 인터페이스를 여러 번 정의할 수 있으며 TypeScript에서 이를 단일 정의로 병합합니다.
- 타입: 선언 병합을 지원하지 않습니다. 타입 별칭을 다시 정의하려고 하면 오류가 발생합니다.

```js
interface User {
    id: number;
    username: string;
}

interface User {
    email: string;
}

// 병합된 User 인터페이스: { id: number; username: string; email: string; }
```

```js
type User = {
    id: number;
    username: string;
};

type User = {
    email: string;
}; // 오류: 중복 식별자 'User'
```

## 4. 복잡한 유형

<div class="content-ad"></div>

- 유형: 연합 유형, 교차 유형 또는 튜플과 같은 복잡한 유형을 정의하는 데 더 강력합니다.

```js
type User = {
    id: number;
    username: string;
    email: string;
};

type ApiResponse = User | { error: string };
```

# 실제 예제

- 인터페이스 예제:

<div class="content-ad"></div>

```js
interface User {
    id: number;
    username: string;
    email: string;
}

function getUserById(id: number): User {
    return { id, username: "john_doe", email: "john@example.com" };
}
```

유형 예시:

```js
type User = {
    id: number;
    username: string;
    email: string;
};

function getUserById(id: number): User {
    return { id, username: "john_doe", email: "john@example.com" };
}
```

# 각각을 사용하는 경우

<div class="content-ad"></div>

인터페이스를 사용하는 경우:

- 객체나 클래스의 모양을 정의할 때
- 다른 유형에 의해 확장되거나 구현될 것으로 예상될 때
- 선언 병합을 활용할 때

타입을 사용하는 경우:

- 복잡한 유형을 정의할 때 (예: 연합, 교차, 튜플)
- 기본값, 연합 및 교차 유형을 위한 타입 별칭을 생성할 때
- 타입 추론을 광범위하게 활용할 때

<div class="content-ad"></div>

# 결론

TypeScript에서 다양한 기능을 제공하는 type과 interface는 모두 중요한 도구입니다. 각각의 고유한 장점을 가지고 있습니다. interface는 객체 형태를 정의하고 확장성 및 선언 병합을 지원하는 데 뛰어나며, type은 복잡한 유형을 생성하고 TypeScript 강력한 유형 추론을 활용하는 데 우수합니다. 이러한 차이를 이해하면 더 견고하고 유지보수 가능하며 확장 가능한 TypeScript 코드를 작성하는 데 도움이 될 것입니다.

구체적인 사용 사례를 기반으로 현명하게 선택하고 TypeScript의 유형 시스템의 모든 장점을 활용하려면 적절한 곳에 양쪽을 모두 사용하는 것이 좋습니다. 즐거운 코딩되세요!