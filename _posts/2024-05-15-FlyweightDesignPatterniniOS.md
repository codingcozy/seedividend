---
title: "iOS에서의 Flyweight 디자인 패턴"
description: ""
coverImage: "/assets/img/2024-05-15-FlyweightDesignPatterniniOS_0.png"
date: 2024-05-15 15:39
ogImage: 
  url: /assets/img/2024-05-15-FlyweightDesignPatterniniOS_0.png
tag: Tech
originalTitle: "Flyweight Design Pattern in iOS"
link: "https://medium.com/@thekrazyjames/flyweight-design-pattern-in-ios-e5666433cd08"
---


<img src="/assets/img/2024-05-15-FlyweightDesignPatterniniOS_0.png" />

Flyweight는 여러 객체의 메모리 사용량을 줄일 수 있는 구조적 디자인 패턴입니다. 이 패턴은 몇 가지 속성 또는 상태를 완벽히 외부로 공유하는 객체들의 메모리 사용을 줄일 수 있게 해줍니다.

# 구현

우선, 먼저 다음 두 가지 개념, 내재 상태와 외재 상태를 이해하는 것이 필요합니다.



## 내재 상태

내재 상태란 물체의 속성 중에서 불변인 것들을 말합니다. 즉, 이들은 시간이 지나도 변하지 않는 속성들로 운전 면허증 사용자의 출생 날짜나 국적 등이 이에 해당합니다.

## 외재 상태

반면, 외재 상태는 모두 가변 속성을 의미합니다. 즉, 언젠가는 변할 속성들로 여권의 만료 날짜나 발급 장소 등이 이에 해당합니다.



이 패턴을 구현하려면 객체의 본질적 상태와 외부적 상태를 구분하기 위해 식별해야 합니다.

예를 들어 기관이나 정부 의존성은 운전 면허증 정보를 모두 기록할 수 있고 다른 종속성은 모든 여권 정보를 가질 수 있습니다.

```js
import Foundation

enum State: String { ... }
enum Nationality: String { ... }
enum BloodType: String { ... }

struct Address: Identifiable {
  let mainStreet: String
  let number: String
  let zipCode: String
  // ...
}

class DriverLincense {
  let nationalID: UUID
  let name: String
  let surname: String
  let birthDate: Date
  let nationality: Nationality
  let bloodType: BloodType
  var state: State
  var expedition: Date
  var expiration: Date
  var address: Address
  // ...
}

//... 다른 종속성

enum StateCode: String { ... }

class PassportInfo {
  let passportID: UUID
  let nationalID: UUID
  let name: String
  let surname: String
  let birthDate: Date
  let birthPlace: String
  let nationality: Nationality
  let bloodType: BloodType
  var expedition: Date
  var expiration: Date
  var stateCode: StateCode
}
```

이 예시에서, 특정 정보가 반복될 수 있고 변경되지 않을 때 추출하여 사용할 수 있음을 알 수 있습니다. 이를 내적(본질적) 상태라고 합니다.



```js
// 내재 상태
class PersonalInfo {
  let nationalID: UUID
  let name: String
  let surname: String
  let birthDate: Date
  let birthPlace: String
  let nationality: Nationality
  let bloodType: BloodType
}
```

이렇게 함으로써, 실제 유형은 메모리에 두 번 저장하는 대신 단일 내재 상태를 가리킬 수 있습니다.

```js
class DriverLincense {
  let personalInfo: PersonalInfo

  // 외부 상태
  var state: State
  var expedition: Date
  var expiration: Date
  var address: Address
}

class PassportInfo {
  let personalInfo: PersonalInfo

  // 외부 상태
  let stateCode: StateCode
  var expedition: Date
  var expiration: Date
}
```

그리고 이제 이러한 객체들은 동일한 불변 상태를 공유하고 메모리를 절약할 수 있습니다.




```js
// 공유 정보
let myInfo = PersonalInfo( ... )

let myDriverLicense = DriverLicense(personalInfo: myInfo, ... )
let myPassportInfo = PassportInfo(personalInfo: myInfo, ... )
```

## 장점

이 구조적 패턴은 동시에 로딩하는 데 시간이 많이 걸리거나 여러 인스턴스를 관리할 때 리소스를 절약하는 데 중점을 둡니다.

- 메모리 사용량을 절약합니다. 공통 상태를 공유하므로 메모리 사용량이 줄어듭니다. 해당 상태는 변경되지 않습니다.



## 일반적인 실수

- 동일한 속성과 값으로 동일한 객체의 여러 내재 상태를 사용하는 것입니다. 이 문제를 회피하려면 싱글톤 또는 플라이웨이트 팩토리를 이용하여 각 객체가 하나씩만 있도록 합니다.

# 결론

이 패턴은 여러 객체가 공통 데이터를 공유하며 개별적으로 처리될 때 정말 유용해집니다. 예를 들어 비디오 게임은 여러 객체를 렌더링하기 위해 일괄적으로 로드해야 하지만, 텍스처는 메모리를 절약하기 위해 한 번만 로드되고, 필요할 때 객체를 표시할 모든 인스턴스에서 공유될 것입니다.