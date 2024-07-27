---
title: "유지보수성을 높이는 5가지 TypeScript 실천법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-5TypescriptPracticesforImprovedMaintainability_0.png"
date: 2024-07-07 19:20
ogImage:
  url: /assets/img/2024-07-07-5TypescriptPracticesforImprovedMaintainability_0.png
tag: Tech
originalTitle: "5 Typescript Practices for Improved Maintainability"
link: "https://medium.com/@davislaura/5-typescript-practices-for-improved-maintainability-cd52bc5c8eda"
---

![이미지](/TIL/assets/img/2024-07-07-5TypescriptPracticesforImprovedMaintainability_0.png)

아래의 권장 사항은 Typescript를 사용하여 더 유지보수가 용이한 코드를 만드는 데 도움이 되었던 몇 가지 조언에 대한 것입니다. 이 조언들은 새로운 구성 요소에서 Typescript를 사용하고 기존 페이지에서는 여전히 순수 JavaScript를 사용하는 프런트엔드 코드 베이스에서 특히 유용했습니다. 여러분에게도 조금 도움이 되기를 바랍니다.

다음 섹션에서는 제가 제공하는 제안의 요약과 각 포인트가 더 유지보수가 용이한 코드를 만드는 데 왜 도움이 되는지에 대한 몇 가지 핵심 요점에 대해 설명한 후, 이러한 조언을 실제로 어떻게 실천할 수 있는지를 보여주는 몇 가지 예제를 제시할 것입니다.

# 팁 #1: 난해한 API 값 해결 및 타입의 힘을 활용하여 이름 변경하기

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

가끔 우리가 작업하는 API는 매우 약어화된 또는 난해한 값 이름을 포함한 데이터 본문을 제공할 수 있습니다. 백엔드와 프론트엔드 사이의 분리 정도에 따라, 이는 코드가 어떤 작업을 수행하고 어떻게 상호 작용해야 하는지 이해하는 데 문제가 될 수 있습니다. 이 문제를 해결하기 위해 API 데이터를 새 객체로 해석하고 더 나은 명명 규칙으로 유형을 지정할 수 있습니다.

## 왜 해야 하나요?

- 다른 사람들과 미래의 자신이 코드를 읽고 이해하기 쉽게 만듭니다.
- 사용 사례를 명확히 설명합니다 (특히 난해한 이름을 가진 부울 값의 경우).
- 코드와 API 설명서 간을 계속 왔다갔다해야 하거나 과도한 콘솔 로깅을 하지 않아도 됩니다.

## 예시

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
// API에서 수신된 데이터
// `f_n`은 `firstName`이 됩니다.
// `l_n`은 `lastName`이 됩니다.
// `users`는 `canEditUsers`가 됩니다.
const rawUserData = [
  {
    id: 1654,
    f_n: "Jose",
    l_n: "Sanchez",
    users: true,
  },
  {
    id: 3297,
    f_n: "Bob",
    l_n: "Richards",
    users: false,
  },
  {
    id: 4572,
    f_n: "Janet",
    l_n: "Wong",
    users: true,
  },
];

const UsersPage = () => {
  // 원시 데이터 값을 더 쉽게 사용할 수 있는 키로 해석합니다.
  const resolvedUserData = rawUserData.map((userData) => ({
    id: userData.id,
    firstName: userData.f_n ?? "",
    lastName: userData.l_n ?? "",
    canEditUsers: Boolean(userData.users),
  })) as Users[];

  // 해석된 데이터로 UsersList를 렌더링합니다.
  return <UsersList users={resolvedUserData} />;
};

export default UsersPage;

// 다른 파일에서...

// API에서 원시 키 이름을 알려주는 JSDoc을 추가했음에 주목하세요.
// GraphQL 또는 Prisma와 같은 프론트엔드와 API 사이의 레이어가 있는 경우 특히 중요합니다.
/**
 * @type firstName: Raw `f_n`
 * @type lastName: Raw `l_n`
 * @type canEditUsers: Raw `users`
 */
type Users = {
  id: number;
  firstName: string; // 원시: f_n
  lastName: string; // 원시: l_n
  canEditUsers: boolean; // 원시: users
};

// 원시 API 키와 비교했을 때 가독성이 향상되는 점에 주목하세요.
// UsersList 구성 요소가 부모로부터 추상화되고 입력을 사용하여 사용자 데이터를 업데이트하기 시작할 때
// 이 사항은 점점 더 중요해집니다.
const UsersList = ({ users }: { users: Users[] }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>
            이름: {user.firstName} {user.lastName}
          </div>
          <div>사용자 수정 가능? {`${user.canEditUsers}`}</div>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};
```

# 팁 #2: 모든 하드코딩된 문자열 값을 enum, object 또는 string 리터럴 유니온으로 대체하세요 (사용 사례에 따라 다름)

기능을 처음 구현할 때는 단순한 로직을 수행하기 위해 문자열 값과 같은 기본 유형을 하드코딩하는 것이 더 쉬울 수 있습니다.
그러나 코드베이스가 커지고 여러 컴포넌트로 분할되면, 이는 많은 중복을 야기하고 유지 관리의 어려움을 증가시킬 수 있습니다.
이 문제를 해결하기 위해 이러한 분산된 하드코딩된 문자열을 재사용 가능한 enum, object 또는 유니언으로 통합할 수 있습니다.

## 왜 이렇게 해야 하나요?

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

- 코드 완성 기능을 사용하여 유형을 사용할 수 있게 해서 더 많이 추측할 필요가 없도록 합니다
- 구성 요소를 더 재사용 가능하게 만듭니다
- 리듀서와 컨텍스트 또는 상태 관리자와 유형을 사용하는 것을 더 간단하게 만듭니다
- 서로 다른 함수와 구성 요소 사이에서 상태를 전달하는 것을 간단하게 만듭니다
- 잘못된 입력 및 유형을 검출하는 데 도움이 됩니다
- 기본값으로 사용할 "unknown"과 같은 예외 유형을 추가할 수 있도록 합니다

## 예시

```js
/**
* 예시 1: 열거형
* 사용 시기:이 것을 사용할 모든 파일이 ts인 경우
* 장점: 변경할 수 없는 상수
  더 나은 형식 안전성, 유형으로 더 쉽게 작업할 수 있음
  사용자 정의 로직에 대한 switch 케이스 사용이 쉬움
* 단점: 바닐라 js와 사용할 수 없음
*/
enum Fruits {
  APPLE = "Apple",
  ORANGE = "Orange",
  BANANA = "Banana",
}

export const FruitsFromEnumDropdown = () => {
  type FruitOptionsFromEnum = {
    label: Fruits;
    value: keyof typeof Fruits;
  };

  const fruitOptions = Object.entries(Fruits).map(
    ([value, label]) =>
      ({
        label: label,
        value: value,
      } as FruitOptionsFromEnum)
  );

  const [selectedFruit, setSelectedFruit] = React.useState(
    fruitOptions[0].value
  );

  const onSelectFruit = (selectedFruit: FruitOptionsFromEnum["value"]) => {
    const selectedOption = fruitOptions.find(
      (fruit) => fruit.value === selectedFruit
    );
    if (selectedOption) {
      setSelectedFruit(selectedOption?.value);
    }
  };

  return (
    <>
      <div>열거형에서 선택한 과일 : {selectedFruit}</div>
      <select
        onChange={(e) =>
          onSelectFruit(e.target.value as FruitOptionsFromEnum["value"])
        }
      >
        {fruitOptions.map((fruit) => (
          <option key={fruit.value} value={fruit.value}>
            {fruit.label}
          </option>
        ))}
      </select>
    </>
  );
};

/**
* 예시 2: 객체 사용하기
* 사용 시기: 코드 베이스의 일부가 아직 바닐라 js를 사용하는 경우
* 장점: 복사하거나 'let' 및 'as const'가 아닌 경우 할당 가능
  ts 및 js 파일 간에 사용 가능
* 단점: enums보다 유형을 사용하기 어려울 수 있음, 'as const'조차도
*/
const FruitsObject = {
  APPLE: "Apple",
  ORANGE: "Orange",
  BANANA: "Banana",
} as const;

export const FruitsFromObjectDropdown = () => {
  type FruitOptionsFromObject = {
    label: (typeof FruitsObject)[keyof typeof FruitsObject];
    value: keyof typeof FruitsObject;
  };

  const fruitOptions = Object.entries(FruitsObject).map(
    ([v, k]) =>
      ({
        label: k,
        value: v,
      } as FruitOptionsFromObject)
  );

  const [selectedFruit, setSelectedFruit] = React.useState(
    fruitOptions[0].value
  );

  const onSelectFruit = (selectedFruit: FruitOptionsFromObject["value"]) => {
    const selectedOption = fruitOptions.find(
      (fruit) => fruit.value === selectedFruit
    );
    if (selectedOption) {
      setSelectedFruit(selectedOption?.value);
    }
  };

  return (
    <>
      <div>객체에서 선택한 과일 : {selectedFruit}</div>
      <select
        onChange={(e) =>
          onSelectFruit(e.target.value as FruitOptionsFromObject["value"])
        }
      >
        {fruitOptions.map((fruit) => (
          <option key={fruit.value} value={fruit.value}>
            {fruit.label}
          </option>
        ))}
      </select>
    </>
  );
};

/**
* 예시 3: 문자열 유니언
* 사용 시기: 백엔드에서 유형을 확장해야하거나 대안으로 enums를 대체해야할 때
* 장점: 쉽게 확장 가능
  ts 및 js 간에 재사용 가능
  사용자 정의 로직에 대한 switch 케이스 사용이 쉬움
* 단점: enums와 같이 할당할 수 없으며, 문자열은 순수한 리터럴임
*/
type StatusStringUnion = "saved" | "saving" | "standby" | "error" | "unknown";
export const FormStatus = () => {
  const [currentStatus, setCurrentStatus] =
    React.useState<StatusStringUnion>("unknown");

  return (
    <StatusRow>
      상태: <Label>{currentStatus}</Label>
      <Dot status={currentStatus} />
    </StatusRow>
  );
};

//다른 파일에서는 ...
const StatusRow = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Label = styled.div`
  margin-left: 0.25rem;
  font-size: 12pt;
  font-weight: 600;
`;

//사용자 정의 StyledComponents 로직 사용 예시
//enum 또는 문자열 유니언은 이러한 경우에 가장 적합합니다
const Dot = styled.div<{ status: StatusStringUnion }>`
  display: flex;
  justify-content: center;
  align-content: start;
  clip-path: circle(5px);
  width: 1rem;
  background: ${({ status }) => {
    switch (status) {
      case "saved":
        return "green";
      case "saving":
        return "yellow";
      case "error":
        return "red";
      case "standby":
        return "none";
      case "unknown":
        return "gray";
      default:
        return "gray";
    }
  };
  margin-left: 0.25rem;
`;



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

내가 작업한 많은 코드에서, 유형은 일반적으로 변경할 수 없는 값을 나타내는 비-nullable로 기본 설정됩니다. 그러나 값은 때로 바뀔 수 있고, 앱의 내부 논리 구조가 복잡해지면 예기치 않은 null 또는 undefined 값이 발생하여 프로덕션 코드에서 유형 오류를 발생시키기 쉬워집니다. 이를 피하는 한 가지 방법은 다른 방향으로 기본값을 nullable 값으로 설정하는 것입니다. 기본적으로, 이 값이 어떤 상황에서 null 또는 undefined가 될 수 있는 경우(또는 확실하지 않은 경우), 선택 사항 유형으로 만드는 것입니다.

## 이유

- 백엔드와 프론트엔드가 강하게 결합되어 있지 않은 경우(즉, 풀스택 개발자가 아닌 경우), 두 계약 사이의 값 유형이 제대로 문서화되지 않을 수 있음
- 데이터베이스가 커지고 복잡해지면 예상치 못한 값(예: null 및 undefined)이 부정적으로 발생할 확률이 높아집니다
- 앱이 사용자 입력을 수락하는 경우, 프론트엔드와 백엔드의 유효성 검사 엣지 케이스가 데이터베이스에 이상한 값이 저장되도록 할 수 있음
- 나중에 요구 사항이 변경되어 null/undefined 값을 허용하는 경우가 생길 수 있음
- null/undefined이면 명시적으로 기본값을 설정할 수 있어, 문자열이 항상 " "와 같은 문자열이 되도록 보장할 수 있음
- 입력 값에 일부 값을 필수로 만들면, 유효성 검사의 추가 계층을 추가하고 부정적인 값이 백엔드로 전송되지 않도록 보장할 수 있음

## 예시

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

/**
 * @type firstName: Raw `f_n`
 * @type lastName: Raw `l_n`
 * @type canEditUsers: Raw `users`
 */
type Users = {
  id: number;
  firstName?: string; //Raw: f_n
  lastName?: string; //Raw: l_n
  canEditUsers?: boolean; //Raw: users
};

//만약 아래의 사용자(user)를 접근하려고 할 때 값 중 하나라도 null이 허용되지 않는
//즉, 필수값이면 타입 오류를 발생시키고 렌더를 충돌시킬 수 있습니다.
//이는 널 병합 연산자를 사용할 수 있게 하여 Typescript가
//해당 사용법을 강제하는 것을 가능하게 합니다.
const UsersList = ({ users }: { users: Users[] }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>
            Name: {user?.firstName} {user?.lastName}
          </div>
          <div>Can edit users? {`${user?.canEditUsers}`}</div>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

# 팁 #4: 일반적으로 재사용되는 유형을 제네릭을 사용하여 유틸 파일에 저장하기

코드 베이스가 커지면 앱 전반에서 유사한 유형을 재사용해야 할 수 있습니다. 가장 일반적으로 재사용되는 유형을 제네릭의 힘을 이용하여 더 재사용할 수 있게 할 수 있으며, 이는 기본 유형이 완벽하게 일치하지 않을 때도 유형이 여러 컨텍스트에서 재사용될 수 있음을 의미합니다. 이러한 접근 방식을 사용하면 재사용 가능한 유틸 함수가 Typescript의 모든 기능을 최대한 활용할 수 있음을 의미합니다.

## 왜 이것을 하는가
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

- 수동으로 모든 사용법을 입력할 필요가 없다는 것을 의미합니다.
- 한 곳에서 유형을 업데이트하는 것이 더 쉽습니다.
- 재사용 가능하고 매우 복잡한 유형을 만들 수 있습니다.
- 코드 베이스의 라이브러리에서 기초로 하는 유형을 만들 수 있습니다(예: Relay).
- 해당 유형을 사용하는 구성 요소를 지저분하게 만들지 않고 찾기, 문서화, 사용하기가 더 쉽습니다.

## 예시

```js
/** Example 1: 제네릭을 사용한 재사용 가능한 유형 */
// `utils/reusableTypes.ts` 파일 내에서
import React from "react";
import { Disposable, UseMutationConfig } from "react-relay";
import { MutationParameters } from "relay-runtime";

/**
 * @description 주어진 유형에서 값을 가져오는 유형
 * @example { fieldName: FormProps, value: ValueOf<FormProps> }
 */
export type ValueOf<T> = T[keyof T];

/**
 * @description Relay 변경 사항으로부터 유형 만들기
 * @example type UserContextTypes = {
 *   createUser: MutationTypeOf<createUserMutation>
 * }
 */
export type MutationTypeOf<T extends MutationParameters> = (
  config: UseMutationConfig<T>
) => Disposable;

//다른 파일에서 ...
import React from "react";
import { ValueOf } from "../utils/reusableTypes";

enum Fruits {
  APPLE = "Apple",
  ORANGE = "Orange",
  BANANA = "Banana",
}

export const GenericFruitsFromEnumDropdown = () => {
  const fruitOptions = Object.entries(Fruits).map(([value, label]) => ({
    label: label,
    value: value,
  }));

  const [selectedFruit, setSelectedFruit] = React.useState(
    fruitOptions[0].value
  );

//거의 모든 다른 데이터 유형과 함께`ValueOf`의 제네릭 유형을 사용할 수 있습니다.
//단, Fruits 열거형을 포함한다.
  const onSelectFruit = (selectedFruit: ValueOf<Fruits>) => {
    const selectedOption = fruitOptions.find(
      (fruit) => fruit.value === selectedFruit
    );
    if (selectedOption) {
      setSelectedFruit(selectedOption?.value);
    }
  };

  //ValueOf를 사용하면 열거형 값과의 비교를 수행할 수 있습니다.
  console.log(selectedFruit === Fruits.APPLE);

  return (
    <>
      <div>선택된 열거형 과일: {selectedFruit}</div>
      <select onChange={(e) => onSelectFruit(e.target.value)}>
        {fruitOptions.map((fruit) => (
          <option key={fruit.value} value={fruit.value}>
            {fruit.label}
          </option>
        ))}
      </select>
    </>
  );
};
```

```js
/** Example 2: 제네릭을 사용한 재사용 가능한 함수 */
// `utils/reusableFunctions.ts` 파일 내에서
import React from "react";

/**
 * @description 주어진 기본 값이 배열에서 중복되는지 여부를 확인합니다.
 * @example
 * const myNumberArray = [4, 5, 5, 1, 6, 3];
 * primitiveIsDuplicatedInArray(3, myNumberArray); //false
 * primitiveIsDuplicatedInArray(5, myNumberArray); //true
 *
 * const myStringArray = ['z', 'b', 'b', 'a', 'f', 'd'];
 * const isADuplicated = primitiveIsDuplicatedInArray(3, myStringArray); //3은 숫자이므로 TypeScript 오류가 발생합니다.
 */
export const primitiveIsDuplicatedInArray = <T>(givenValue: T, arr: T[]) =>
  arr.filter((value) => value === givenValue).length > 1;

//다른 파일에서 ...
import React from "react";
import { primitiveIsDuplicatedInArray } from "../utils/reusableFunctions";

const GenericFunctions = () => {
  //`primitiveIsDuplicatedInArray`에서 제네릭 유형을 사용하면
  //숫자, 문자열 및 다른 기본 유형을 가진 배열에서 중복 항목을 찾을 수 있습니다.
  const myNumberArray = [4, 5, 5, 1, 6, 3];
  const isThreeDuplicated = primitiveIsDuplicatedInArray(3, myNumberArray);
  const isFiveDuplicated = primitiveIsDuplicatedInArray(5, myNumberArray);

  const myStringArray = ["z", "b", "b", "a", "f", "d"];
  const isBDuplicated = primitiveIsDuplicatedInArray("b", myStringArray);
  const isFDuplicated = primitiveIsDuplicatedInArray("f", myStringArray);

  return (
    <div>
      <div>내 숫자 배열: {`[${myNumberArray}]`}</div>
      <div>3이 중복되었나요? {`${isThreeDuplicated}`}</div>
      <div>5가 중복되었나요? {`${isFiveDuplicated}`}</div>
      <br />
      <br />
      <div>내 문자열 배열: {`[${myStringArray}]`}</div>
      <div>b가 중복되었나요? {`${isBDuplicated}`}</div>
      <div>f가 중복되었나요? {`${isFDuplicated}`}</div>
    </div>
  );
};

export default GenericFunctions;
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

# 팁 #5: 암시적 타입 및 구조 분해에 의존하기보다 함수 props를 명시적으로 입력하세요

함수와 컴포넌트에 props를 전달하는 방식은 최종적으로 개인의 선택이지만, 명시적 props를 사용하는 것이 동료들이 이해하기 쉽고 유지 보수하기 쉽도록 코드를 만드는 데 도움이 된다고 주장합니다. 기능적인 측면에서 컴포넌트와 함수를 이해하기 쉽게 만들며, 암시적 타입의 한계에서 발생하는 실제 버그를 줄여줍니다.

- 암시적 타입은 함수나 컴포넌트를 검사하는 요구가 있지만, 명시적 타입은 최신 편집기에서 코드 완성을 제공합니다
- 여러 컴포넌트나 함수에 대한 재사용 가능한 타입을 만들 수 있으며 Partial 및 Omit과 같은 고급 타입을 사용할 수 있게 합니다
- 여러 파일을 통해 props를 추적하는 것이 훨씬 쉽습니다 (특히 다중 하위 컴포넌트로 prop을 전달하는 경우)
- 함수와 재사용 가능한 컴포넌트를 문서화하기가 훨씬 더 쉽습니다
- props에 대한 암시적 타입은 함수로 전달된 props가 잘못된 순서로 전달되거나 prop이 생략될 때 버그를 발생시킵니다

## 예시들

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
/** 예제 1: 컴포넌트에 속성(props) 전달하기 */
import React from "react";

type FormStatus = "saved" | "saving" | "standby" | "error" | "unknown";

type User = {
  id: number;
  firstName?: string;
  lastName?: string;
};

/** 예제 A: 속성(props) 구조 분해하기 */
type DestructuringProps = {
  users: User[];
  formStatus: FormStatus;
};

// `props`를 그냥 전달하는 것은 특히 재사용되는 고도로 추상화된 컴포넌트에서 prop 추적을 매우 어렵게 만들 수 있습니다. 심지어 타입을 지정해도요
const Destructuring = (props: DestructuringProps) => {
  // 이렇게 구조 분해할 때, 이 prop들은 모두 널이 아니라는 것을 주목하세요
  const { users, formStatus } = props;

  return (
    <div>
      <div>상태: {formStatus}</div>
      {users.map((user) => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
};

/** 예제 B: 명시적인 속성(props) */
type ExplicitProps = {
  users: User[];
  formStatus: FormStatus;
};

// 속성을 명시적으로 전달하고 타입을 지정하는 것은 추적을 훨씬 간단하게 만듭니다
const Explicit = ({ users, formStatus }: ExplicitProps) => {
  return (
    <div>
      <div>상태: {formStatus}</div>
      {users.map((user) => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
};

const DifferentPropTypes = () => {
  const users = [
    {
      id: 1654,
      firstName: "Jose",
      lastName: "Sanchez",
    },
    {
      id: 3297,
      firstName: "Bob",
      lastName: "Richards",
    },
    {
      id: 4572,
      firstName: "Janet",
      lastName: "Wong",
    },
  ];

  const formStatus = "standby" as FormStatus;

  const props = {
    users,
    formStatus,
  };

// 여기서 `props`가 상위 레벨에서 스프레드 연산자를 통해 전달되었다고 상상해보세요.
// 최상위 레벨까지 거슬러 올라가지 않고 그 당시의 props가 무엇인지 추적할 수 있을까요?
  return (
    <div>
      <Destructuring {...props} />
      <br />
      <br />
      <Explicit users={users} formStatus={formStatus} />
      <br />
      <br />
    </div>
  );
};

export default DifferentPropTypes;
```

```js
/** 예제 2: 함수에 속성(props) 전달하기 */

import React from "react";

// 예제 A: 구조 분해는 사용 방법을 애매하게 만들 수 있습니다
type DestructuredProps = {
  userName: string,
  userNamesArray: string[],
};

export const userNameIsDuplicatedDestructuredProps = (props: DestructuredProps) => {
  // 이렇게 구조 분해할 때, 이 prop들은 모두 널이 아니라는 것을 주목하세요
  const { userName, userNamesArray } = props;
  return userNamesArray.filter((value) => value === userName).length > 1;
};

// 예제 B: 암시적인 속성은 전달 순서에 의존하고 타입 완성도가 낮아서 버그를 유발할 수 있습니다
export const userNameIsDuplicatedImplicitProps = (userName: string, userNamesArray: string[]) =>
  userNamesArray.filter((value) => value === userName).length > 1;

// 예제 C: 명시적 속성은 속성 순서와 타입을 강제화합니다
type ExplicitProps = {
  userName: string,
  userNamesArray: string[],
};

export const userNameIsDuplicatedExplicitProps = ({ userName, userNamesArray }: ExplicitProps) =>
  userNamesArray.filter((value) => value === userName).length > 1;

// 데이터
export const TypingFnProps = () => {
  const users = [
    {
      id: 1654,
      firstName: "Jose",
      lastName: "Sanchez",
    },
    {
      id: 3297,
      firstName: "Bob",
      lastName: "Richards",
    },
    {
      id: 4572,
      firstName: "Janet",
      lastName: "Wong",
    },
    {
      id: 8725,
      firstName: "Janet",
      lastName: "Wong",
    },
  ];

  const userNamesArray = users.map(({ firstName, lastName }) => `${firstName} ${lastName}`);

  const props = {
    userNamesArray,
    userName: "Janet Wong",
  };

  const isJanetDuplicatedDestructuredProps = userNameIsDuplicatedDestructuredProps(props);

  const isJanetDuplicatedImplicitProps = userNameIsDuplicatedImplicitProps("Janet Wong", userNamesArray);

  const isJanetDuplicatedExplicitProps = userNameIsDuplicatedExplicitProps({
    userName: "Janet Wong",
    userNamesArray,
  });

  // 이것을 변경해가며 출력과 타입 체크 차이를 관찰해보세요
  return (
    <div>
      <div>Janet이 중복되었나요? {`${isJanetDuplicatedDestructuredProps}`}</div>
      <br />
      <br />
      <div>Janet이 중복되었나요? {`${isJanetDuplicatedImplicitProps}`}</div>
      <br />
      <br />
      <div>Janet이 중복되었나요? {`${isJanetDuplicatedExplicitProps}`}</div>
    </div>
  );
};

export default TypingFnProps;
```

안내드린 내용 외에도 TypeScript로 유지보수 가능한 코드를 작성하는 더 많은 팁이 있지만, 이 중에서 저가 일반적으로 사용하는 팁들이었습니다.

전체 소스 코드: [https://github.com/lbd1607/ts-blog](https://github.com/lbd1607/ts-blog)

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

행복한 코딩하세요 :)
