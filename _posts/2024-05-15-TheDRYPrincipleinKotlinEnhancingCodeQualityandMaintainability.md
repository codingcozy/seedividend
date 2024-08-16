---
title: "코틀린에서의 DRY 원칙 코드 품질과 유지보수성 향상"
description: ""
coverImage: "/assets/img/2024-05-15-TheDRYPrincipleinKotlinEnhancingCodeQualityandMaintainability_0.png"
date: 2024-05-15 10:46
ogImage: 
  url: /assets/img/2024-05-15-TheDRYPrincipleinKotlinEnhancingCodeQualityandMaintainability_0.png
tag: Tech
originalTitle: "The DRY Principle in Kotlin: Enhancing Code Quality and Maintainability"
link: "https://medium.com/stackademic/the-dry-principle-in-kotlin-enhancing-code-quality-and-maintainability-608c362e64a3"
isUpdated: true
---




![image](/assets/img/2024-05-15-TheDRYPrincipleinKotlinEnhancingCodeQualityandMaintainability_0.png)

DRY(반복하지 말 것) 원칙은 코드 중복을 피하고 코드 재사용을 촉진하는 소프트웨어 개발의 기본 개념입니다. 이 원칙은 시스템 내의 모든 지식 요소가 단일하고 명확한 표현을 가져야 한다고 주장합니다. 간단히 말하면, 동일한 논리 또는 정보가 코드베이스의 여러 위치에 중복되어 나타나지 않아야 한다는 것을 의미합니다.

DRY 원칙은 공통 기능을 함수, 클래스 또는 모듈과 같은 재사용 가능한 구성 요소로 추상화하는 것을 개발자에게 권장합니다. 이렇게 함으로써, 개발자는 변경이나 업데이트를 한 곳에서만 수행하면 되므로 유지보수가 쉬운 코드를 작성할 수 있습니다. 이는 일관성과 오류 발생 가능성을 감소시키면서 코드의 가독성과 이해도를 향상시킵니다.

DRY 원칙을 준수하면 모듈성, 캡슐화, 추상화와 같은 더 나은 소프트웨어 디자인 관행을 촉진합니다. 이는 유지보수와 확장, 디버그 및 협업이 쉬운 더 깔끔하고 관리하기 쉬운 코드베이스를 만드는 데 도움이 됩니다.



## DRY 원칙이 필요한 이유는 무엇인가요?

- 코드 유지보수성: 코드 중복은 유지보수 부담을 증가시킵니다. 동일한 코드 논리가 여러 곳에 복사되면 해당 논리를 수정하거나 업데이트해야 하는 경우 여러 위치에서 변경이 필요하며, 일관성 및 오류 발생 위험이 증가합니다. Kotlin에서 DRY 원칙을 준수하면 변경 사항을 하나의 위치에서만 수행해야 하므로 코드 유지보수가 더 쉬워집니다.
- 버그와 오류 감소: 중복된 코드는 버그와 오류 발생 가능성을 증가시킵니다. 중복된 코드의 한 부분에서 버그가 수정되지만 다른 곳에서는 수정되지 않으면 일관성 문제가 발생하여 예기치 않은 동작을 야기할 수 있습니다. Kotlin 코드에서 DRY 원칙을 준수하면 코드 논리를 중앙 집중화하여 일관성 문제로 인한 버그 발생 가능성을 최소화합니다.
- 가독성 및 이해도 향상: 중복된 코드는 코드의 가독성과 이해도를 저해합니다. 동일한 논리가 코드베이스 전체에 흩어져 있으면 시스템의 전반적인 기능과 목적을 파악하기가 어려워집니다. DRY 원칙을 따르고 논리를 통합함으로써 Kotlin 코드를 더 읽기 쉽고 이해하기 쉽게 만듭니다.
- 모듈성과 재사용성 촉진: DRY 원칙을 준수하면 모듈화되고 재사용 가능한 구성 요소를 생성하는 것을 촉진합니다. 동일한 논리를 여러 곳에 반복하는 대신 Kotlin 개발자들은 공통 기능을 별도의 모듈, 함수 또는 클래스로 추출하도록 권장받습니다. 이는 구성 요소가 코드베이스 전반에서 재사용될 수 있는 모듈화 아키텍처를 촉진합니다.

## Kotlin에서 DRY 원칙 적용 예:

1. 공통 기능을 함수나 확장 함수로 추출하기



```kotlin
// DRY 원칙 없이: 특정 모양에 대한 함수
fun calculateCircleArea(radius: Double): Double {
    return Math.PI * radius * radius
}

fun calculateRectangleArea(width: Double, height: Double): Double {
    return width * height
}

// DRY 원칙을 적용한 경우: 면적을 계산하는 일반적인 함수
fun calculateArea(shape: Shape): Double {
    return when (shape) {
        is Circle -> Math.PI * shape.radius * shape.radius
        is Rectangle -> shape.width * shape.height
    }
}
```

서로 다른 모양의 면적을 계산하기 위해 별도의 함수를 갖는 대신, 입력으로 Shape 객체를 받아 해당 형태의 면적을 계산하는 calculateArea라는 단일 함수를 생성합니다. 이 접근 방식은 코드 중복을 제거하고 재사용성을 증진시킵니다.

2. 고차 함수 활용:

```kotlin
// DRY 원칙 없이
fun applyOperationTwice(value: Int, operation: (Int) -> Int): Int {
    return operation(operation(value))
}

// DRY 원칙을 적용한 경우
fun applyOperationTwice(value: Int, operation: (Int) -> Int): Int {
    return operation(value).let(operation)
}
```



applyOperationTwice 함수에서는 DRY 원칙을 사용하여 let 함수를 사용하여 처음 호출 결과에 작업을 호출합니다. 이 접근법은 가독성을 향상시키고 작업이 적용되는 방식을 일관성있게 유지합니다.

3. 상수 공유:

```js
// DRY 원칙 미적용: 전역으로 상수 선언
const val MAX_RETRIES = 3
const val TIMEOUT = 5000

// DRY 원칙 적용: 상수를 객체에 그룹화
object Constants {
    const val MAX_RETRIES = 3
    const val TIMEOUT = 5000
}
```

전역으로 상수를 선언하는 대신, 관련 있는 상수를 객체 내에 그룹화하여 DRY 원칙을 적용합니다. 이 접근법은 상수를 논리적으로 구성하고 네임스페이스 오염을 방지합니다.



4. 재사용 가능한 데이터 구조:

```js
// DRY 원칙 없이: 각 모양에 대한 별도의 클래스
class Rectangle(val width: Double, val height: Double)

class Circle(val radius: Double)

// DRY 원칙을 적용한 경우: 공유된 베이스 클래스와 데이터 클래스
sealed class Shape

data class Rectangle(val width: Double, val height: Double) : Shape()

data class Circle(val radius: Double) : Shape()
```

공유된 베이스 클래스 Shape를 정의하고 이를 기반으로 Rectangle 및 Circle과 같은 특정 모양을 파생시킴으로써 DRY 원칙이 적용됩니다. 이 접근 방식은 코드 재사용을 촉진하고 모양이 어떻게 표현되는지에 일관성을 유지합니다.

5. 비즈니스 로직 공유:



```js
// DRY 원칙을 적용한 예시: 공통 구현 로직을 캡슐화한 베이스 매니저 클래스
class BaseManager<T>(private val repository: BaseRepository<T>) {
    fun addItem(item: T) {
        if (repository.getItemById(item.id) == null) {
            repository.addItem(item)
        }
    }
}

// UserManager과 ProductService와 같은 특정 매니저 클래스들은 BaseManager를 상속하여 이 공통 로직을 재사용하며, 코드 중복을 줄이고 일관성을 유지합니다.

# DRY 사용 시 고려할 점:

- 너르 도구 되기 전에: 코드 중복과 추상화 사이의 균형을 맞추는 것이 중요합니다. 때때로 일반 로직을 너무 이르게 추출하면 이해하기 어렵고 유지보수하기 어려운 지나치게 복잡한 추상화로 이어질 수 있습니다. 진정으로 재사용 가능한 경우에만 코드를 추상화해야 합니다.
- 의미 있는 명명: 재사용 가능한 구성요소로 코드를 추출할 때, 함수, 클래스 또는 모듈에 서술적이고 의미 있는 이름을 선택해야 합니다. 명확한 명명은 다른 개발자가 코드의 의도와 목적을 이해하기 쉽도록 도와줍니다.
- 함수 일관성 유지: 재사용 가능한 함수 또는 클래스를 작성할 때, 단일 책임을 갖고 명확한 작업을 수행하는지 확인해야 합니다. 하나의 함수 또는 클래스에 관련 없는 기능을 섞는 것은 혼란을 초래하고 단일 책임 원칙(SRP)을 위반할 수 있습니다.
- 트레이드오프 고려: 중복을 줄이는 것은 일반적으로 유익하지만, 때로는 더 명확하고 유지보수가 쉬운 코드를 만들기 위해 약간의 중복이 허용될 수 있습니다. DRY성과 단순성 및 명료성과 같은 다른 소프트웨어 설계 원칙 간의 트레이드오프를 고려해야 합니다.
- 문서화와 주석: 재사용 가능한 구성 요소의 목적과 사용법을 문서화하여 다른 개발자가 올바르게 사용하는 데 도움을 줄 수 있습니다. 또한 코드 내 복잡하거나 명확하지 않은 로직을 설명하는 주석을 제공해야 합니다.
```



# Stackademic 🎓

끝까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 작가를 칭찬하고 팔로우해주시면 좋겠어요! 👏
- 저희를 팔로우해주세요 X | 링크드인 | 유튜브 | 디스코드
- 다른 플랫폼도 방문해보세요: In Plain English | CoFeed | Venture | Cubed
- 알고리즘적 콘텐츠를 다루어야 하는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요
- Stackademic.com에서 더 많은 콘텐츠를 만나보세요