---
title: "TypeScript의 Record 타입 완벽 마스터하기"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-MasteringTypeScriptsRecordType_0.png"
date: 2024-07-13 20:36
ogImage: 
  url: /TIL/assets/img/2024-07-13-MasteringTypeScriptsRecordType_0.png
tag: Tech
originalTitle: "Mastering TypeScript’s Record Type"
link: "https://medium.com/@awwwesssooooome/mastering-typescripts-record-type-e47bba9029f4"
---



![Record Type](/TIL/assets/img/2024-07-13-MasteringTypeScriptsRecordType_0.png)

TypeScript의 Record 타입은 우리가 key-value 쌍 타입을 정의하는 데 도움이 되는 매우 유용한 도구입니다. 이 기사에서는 Record 타입의 다양한 응용 시나리오를 탐구하고, 코드 품질과 유지 관리성을 향상시킬 수 있는 방법에 대해 알아보겠습니다.

# 1. Record Type이란 무엇인가요?

Record 타입은 TypeScript에서 내장된 일반적인 제네릭 타입으로, 키와 값이 지정된 타입인 객체 타입을 구성하는 데 사용됩니다. 다음과 같이 정의됩니다:


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
유형 레코드`K, T`는 그 키가 유형 K이고 값이 유형 T인 개체를 나타냅니다. 간단한 예제를 살펴봅시다:

유형 사용자 = {
  이름: 문자열;
  나이: 숫자;
};

유형 사용자레코드 = 레코드 <문자열, 사용자>;

상수 사용자: 사용자레코드 = {
  사용자1 : { 이름: "앨리스", 나이: 25 },
  사용자2 : { 이름: "밥", 나이: 30 },
};

이 예제에서 UserRecord는 키가 문자열 형식이고 값이 사용자 형식인 개체를 나타냅니다.

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

# 2. 레코드와 튜플의 차이

레코드와 튜플은 TypeScript에서 객체 구조를 정의하는 데 사용되는 도구입니다. 그러나 사용 용도와 특성이 다릅니다.

- 레코드: 키-값 쌍을 정의하는 데 사용되며, 키와 값의 타입이 임의적일 수 있습니다.
- 튜플: 고정된 길이와 타입의 배열을 정의하는 데 사용됩니다.

## 코드 예제:

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

type UserTuple = [string, number]; // 튜플 타입

const userTuple: UserTuple = ["Alice", 25]; // 유효함
// const invalidUserTuple: UserTuple = [25, "Alice"]; // 오류: 타입 불일치

type UserRecord = Record<string, number>;

const userRecord: UserRecord = {
  Alice: 25,
  Bob: 30,
};

# 3. Record과 Map의 차이점

Record와 Map은 모두 키-값 쌍을 저장하는 데 사용될 수 있지만, 중요한 차이점이 있습니다:

- Record: 컴파일 시간에 타입 체크를 위해 사용되는 타입 정의 도구.
- Map: ES6에서 소개된 데이터 구조로, 런타임에서 키-값 쌍을 저장하는 데 사용됨.

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

## 코드 예시:

// Record를 사용
type UserAges = Record<string, number>;

const userAges: UserAges = {
  Alice: 25,
  Bob: 30,
};

// Map 사용
const userAgeMap = new Map<string, number>();
userAgeMap.set("Alice", 25);
userAgeMap.set("Bob", 30);

console.log(userAgeMap.get("Alice")); // 결과: 25

# 4. 모든 경우 다루기

Record 타입을 사용할 때, 모든 가능한 경우를 다루도록 하여 모든 경우에 대해 처리하도록 할 수 있습니다. 특히 유니언 타입을 다룰 때 유용합니다.

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

## 코드 예시:

type Status = "success" | "error" | "loading";

const statusMessages: Record<Status, string> = {
  success: "작업이 성공적으로 완료되었습니다",
  error: "오류가 발생했습니다",
  loading: "로딩 중...",
};

// getStatusMessage 함수를 사용할 때 모든 경우의 수를 처리하도록 보장
function getStatusMessage(status: Status): string {
  return statusMessages[status];
}

이 예제에서 Record`Status, string`은 statusMessages 객체에서 모든 가능한 Status 값이 처리되도록 보장하며, getStatusMessage 함수에서 각 상태 메시지에 안전하게 접근할 수 있게 합니다.

# 5. 제네릭 애플리케이션에서 타입 체킹 강제화

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

Record 유형은 일반 프로그래밍에서 매우 유용하며 키와 값 사이의 일관성을 보장하고 유형 검사를 강제할 수 있게 해줍니다.

## 코드 예시:

function createRecord<K extends string, T>(keys: K[], value: T): Record<K, T> {
  const record: Partial<Record<K, T>> = {};
  keys.forEach(key => {
    record[key] = value;
  });
  return record as Record<K, T>;
}

const record = createRecord(["Alice", "Bob"], 25);
console.log(record); // 결과: { Alice: 25, Bob: 25 }

이 예시에서 createRecord 함수는 키 배열과 값을 가져와 Record 유형을 사용하여 생성된 객체의 키와 값이 일관되도록 보장합니다.

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

# 6. 선택적 타입 매핑을 위해 Pick 타입과 Record 사용하기

특정 속성만 포함된 객체 타입을 만들기 위해 Pick과 Record 타입을 결합할 수 있습니다.

## 코드 예시:

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

type UserInfo = Pick<User, "id" | "name">;

type UserInfoRecord = Record<string, UserInfo>;

const userInfo: UserInfoRecord = {
  user1: { id: 1, name: "Alice" },
  user2: { id: 2, name: "Bob" },
};

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

이 예시에서는 사용자 인터페이스에서 id와 name 속성을 선택하기 위해 Pick 타입을 사용하고, Record 타입을 사용하여 이러한 속성을 포함하는 객체 타입을 생성합니다.

# 7. Record를 사용한 동적 Key-Value 사전 구현

Record 타입은 동적 키-값 사전을 구현하기에 적합하며, 특히 동적 키와 값이 필요할 때 유용합니다.

## 코드 예시:

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

type Dictionary<T> = Record<string, T>;

const stringDictionary: Dictionary<string> = {
  key1: "value1",
  key2: "value2",
};

const numberDictionary: Dictionary<number> = {
  key1: 1,
  key2: 2,
};

이 예시에서 Dictionary 타입은 어떤 타입의 key-value 쌍을 저장하는 데 사용할 수 있어 코드를 더 유연하고 일반적으로 만들어줍니다.

# 8. Record와 함께 ReadOnly 사용하기

ReadOnly와 Record 타입을 함께 사용하여 수정할 수 없는 key-value 쌍 객체를 만들 수 있습니다. 이를 통해 객체의 프로퍼티가 수정될 수 없도록 보장합니다.

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

## 코드 예시:

type ReadOnlyUserRecord = Readonly<Record<string, User>>;

const readOnlyUsers: ReadOnlyUserRecord = {
  user1: { name: "Alice", age: 25 },
  user2: { name: "Bob", age: 30 },
};

// readOnlyUsers.user1 = { name: "Charlie", age: 35 }; // 오류: 'user1'에 할당할 수 없습니다. 읽기 전용 속성이기 때문에

이 예시에서는 Readonly와 Record 타입을 결합하여 수정할 수 없는 사용자 레코드 객체를 만들어 객체의 속성을 수정할 수 없도록 보장합니다.

# 9. Record와 Partial 함께 사용하기

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

부분 및 레코드 유형을 결합하여 모든 속성이 선택적인 객체를 만들 수 있어요.

## 코드 예시:

type PartialUserRecord = Partial<Record<string, User>>;

const partialUsers: PartialUserRecord = {
  user1: { name: "Alice", age: 25 },
  user2: undefined, // 속성이 선택적이므로 유효합니다
};

이 예시에서 Partial 및 Record의 결합을 통해 속성이 선택적인 객체를 정의할 수 있어서 부분적인 데이터를 처리하는 데 매우 유용합니다.

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

# 10. Record를 사용하여 모든 속성을 필수로 강제하는 방법

어떤 경우에는 객체의 모든 속성이 필수임을 보장해야 할 수도 있습니다. Required와 Record 타입을 결합하여 이를 달성할 수 있습니다.

## 코드 예시:

interface Config {
  host?: string;
  port?: number;
}

type RequiredConfig = Required<Config>;

type ConfigRecord = Record<string, RequiredConfig>;

const configs: ConfigRecord = {
  dev: { host: "localhost", port: 8080 },
  prod: { host: "example.com", port: 80 },
};

// 'port'가 필수이기 때문에 에러가 발생합니다
// const invalidConfigs: ConfigRecord = {
//   dev: { host: "localhost" }
// };

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

이 예시에서는 Config 객체의 모든 속성이 필수로 입력되도록 Required 및 Record 유형을 사용하여 구성 객체의 완성도를 보장합니다.

이 글을 통해 TypeScript의 Record 유형의 다양한 응용 프로그램 시나리오를 자세히 살펴보았습니다. Record 유형의 기본 정의, Tuple 및 Map과의 차이점, 그리고 실제 응용프로그램에서 코드 가독성과 유지 관리성을 향상시키기 위해 Record 유형을 사용하는 방법에 대해 배웠습니다. 이러한 예시들이 Record 유형을 더 잘 이해하고 적용할 수 있도록 도와드리고 TypeScript 코드를 더 효율적이고 신뢰할 수 있게 만들기를 바랍니다.