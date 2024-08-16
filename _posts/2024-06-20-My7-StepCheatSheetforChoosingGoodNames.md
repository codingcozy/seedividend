---
title: "좋은 이름을 선택하기 위한 7단계 치트 시트"
description: ""
coverImage: "/assets/img/2024-06-20-My7-StepCheatSheetforChoosingGoodNames_0.png"
date: 2024-06-20 04:06
ogImage: 
  url: /assets/img/2024-06-20-My7-StepCheatSheetforChoosingGoodNames_0.png
tag: Tech
originalTitle: "My 7-Step Cheat Sheet for Choosing Good Names"
link: "https://medium.com/gitconnected/my-7-step-cheat-sheet-for-choosing-good-names-6137bcdbb2f4"
isUpdated: true
---




뭔가 이름 짓기는 결코 쉬운 일이 아니었죠. 특히 개발자들에게!

![이미지](/assets/img/2024-06-20-My7-StepCheatSheetforChoosingGoodNames_0.png)

변수, 클래스, 함수 및 기타 코드 요소에 선택한 이름은 의미 있는, 정확한 및 쉽게 이해할 수 있는 이름이어야 하기 때문에 이름 짓는 것은 어려운 작업으로 간주될 수 있습니다.

코드베이스를 깨끗하고 유지보수 가능하게 유지하기 위해서는 좋고 일관된 이름 규칙이 필수적입니다. 시스템이 커짐에 따라 새로운 이름이 기존 이름과 충돌하지 않도록 보장하는 것이 어려울 수 있기 때문에 이것은 도전적일 수 있습니다.

<div class="content-ad"></div>

이 기사에서는 코드 이름을 선택할 때 고려해야 할 사항에 대한 체크리스트를 살펴보겠습니다. 이 목록에는 저의 개인적인 통찰과 Uncle Bob 및 Eric Evans와 같은 유명한 저자들의 아이디어가 포함되어 있습니다.

## 1. 의도 및 측정 단위

선택한 이름은 요소의 의도 및 기능뿐만 아니라 해당되는 측정 단위도 명확히 전달해야 합니다. 이렇게 함으로써 코드를 작성하는 사람뿐만 아니라 나중에 코드를 읽거나 수정해야 하는 다른 사람에게도 코드를 이해하고 유지할 수 있도록 도와줄 것입니다.

반면에 지나치게 짧은 변수 이름이나 믿을 수 없는 약어의 사용은 관련된 모든 사람들에게 코드의 가독성과 이해도를 크게 해치게 될 수 있습니다.

<div class="content-ad"></div>

```js
public double calculateBmi(double m, double h) {
    double sh = h * h;
    double mKg = m * 0.453d;
    return mKg / sh;
}
```

위 코드 스니펫을 보기 좋게 개선할 수 있습니다. 변수에 적절한 이름을 선택하면 코드의 가독성이 크게 향상됩니다:

```js
public static final double LBS_TO_KG = 0.453d;

public double calculateBmi(double massInLbs, double heightInMeters) {
    double squaredHeight = heightInMeters * heightInMeters;
    double massInKg = massInLbs * LBS_TO_KG;
    return massInKg / squaredHeight;
}
```

## 2. Avoid Noise Words


<div class="content-ad"></div>

한번 웃어보세요! 자바 애플리케이션을 위한 클래스 이름을 생성해주는 재밌는 웹사이트가 있어요. "enterprisify"를 몇 번 클릭해보세요! 이런 생성된 이름들은 '소음 단어'로 이루어져 있어요. 이것은 의도를 표현하지 않는 기술 용어들이에요.

클래스 이름에 소음 단어를 사용하면 코드를 이해하기 어려울 수 있어요. AccountData와 Account 클래스와 다른 점을 알고 계신가요?

그러면 AccountSummary가 더 나은 선택이 될 수도 있어요.

그리고 AccountDto나 AccountEntity는 어떨까요?

<div class="content-ad"></div>

“Data”라는 노이즈 단어는 추가 정보를 제공하지 않아요. 하지만 때로는 클래스 이름을 지을 때 기술 용어를 사용해서 클래스의 위치나 구현을 나타낼 수 있어요. 예를 들어, Service, Dto, Entity, Repository와 같은 접미사를 사용할 수 있어요.

![이미지](/assets/img/2024-06-20-My7-StepCheatSheetforChoosingGoodNames_1.png)

## 3. 데이터 유형 및 키워드 피하기

데이터 유형 역시 "노이즈 단어"로 간주될 수 있어요. 몇 가지 예시는 다음과 같아요:

<div class="content-ad"></div>

```js
기록 PromotionRecord (
    // ...
){}

추상 클래스 AbstarctPromotion {
  // ...
}

OffsetDateTime startOffsetDateTime;

List<Account> listOfAccounts;
```

동일하게 인터페이스와 그 구현에 대한 특별한 명명 패턴은 안티 패턴으로 간주될 수 있습니다. 흔히 사용되는 방법은 인터페이스에 "I"를 접두사로 붙이고 클래스에 "Impl" 접미사를 붙이는 것입니다:

```js
interface ICustomerDetailsProvider {}

class CustomerDetailsProviderImpl implements ICustomerDetailsProvider {}
```

그럼 정말 인터페이스가 필요한 이유는 무엇일까요? 대부분의 경우 인터페이스를 두 가지 경우 중 하나에서 사용할 것입니다:

<div class="content-ad"></div>

- 의존 역전(Dependency Inversion): 인터페이스는 도메인 레이어의 일부이며 구현은 인프라스트럭처 레이어의 코드를 사용하는 어댑터처럼 작동합니다.
예를 들어, 도메인 레이어의 일부로 CustomerDetailsProvider 인터페이스를 가질 수 있고, 해당 구현은 네트워크 호출을 통해 고객에 대한 특정 데이터를 가져옵니다. 만약 해당 구현을 "CustomerDetailsProviderImpl"이라고 명명한다면 "Impl" 접미사는 가치를 추가하지 않을 것입니다. 대신, "CustomerDetailsApiClient" 또는 "CustomerApiAdapter"와 같이 데이터가 어떻게 가져와지는지에 대한 힌트를 제공해줄 것입니다.
- 다형성(Polymorphism): 다형성을 위해 인터페이스를 사용한다면, 최소 두 가지 이상의 명확히 구분된 구현이 있어야 합니다. 예를 들어, "Payment" 인터페이스와 다른 결제 방법을 위한 다양한 구현이 있다면 구현은 매우 다르며 의미 있는 이름을 가져야 합니다: "CashPayment", "VisaPayment", "OnlinePayment" 등.

## 4. 길이 대 무게

변수 이름을 짓는 경우, 이름의 길이는 변수의 범위와 직접적으로 비례해야 합니다. 따라서 작은 범위의 경우, 단일 작은 단어나 약어가 충분합니다. Uncle Bob은 더 나아가서 매우 작은 범위(한 줄짜리 코드와 같은)에는 하나의 글자 이름조차 충분하다고 말합니다.

```js
// 작은 범위
for(Employee employee : employeesEligibleForPromotion) {
    // 4-5 줄의 코드
}

// 매우 작은 범위
employeesEligibleForPromotion.stream()
    .map(e -> e.getName().toLowerCase())
    .forEach(this::sendNotificationToHrDepartment);
```

<div class="content-ad"></div>

더 긴 범위에 따라, 변수 이름도 길어집니다. 하지만 변수 이름이 너무 길어진다면, 이는 코드 향기의 지표일 수 있습니다: 함수가 너무 커졌다는 것을 의미할 수 있습니다.

예를 들어, 위의 코드 스니펫에서 직원 목록에 대해 꽤 긴 이름을 사용했죠: employeesEligibleForPromotion. 이는 함수의 범위가 크거나 동일한 범위 내에 다른 직원 목록이 있음을 의미할 수 있습니다. 어쨌든, 기능을 추출할 수 있습니다:

```js
public void sendNotificationToHrForEmployees(List<Employees> employees) {
    employees.stream()
      .map(e -> e.getName().toLowerCase())
      .forEach(this::sendNotificationToHrDepartment);
}
```

우리가 볼 수 있듯이, 함수를 추출하고 변수의 범위를 작게 만들면 이름을 줄일 수 있습니다.

<div class="content-ad"></div>

함수를 명명할 때는 범위가 길수록 이름을 작고 추상적으로 지어야 합니다. 이는 우리가 상위 수준의 함수가 구현 세부 정보를 누설하지 않도록 원하기 때문입니다. 따라서 범위가 작은 함수는 이름이 더 길어질 것입니다.

## 5. 일관성

일관된 명명 규약은 다른 사람들이 작성한 코드를 탐색하고 이해하기 쉽게 만들어줍니다. 특히 대규모 공동 작업 프로젝트에서 이는 중요합니다. 또한, 일관성은 명명 충돌을 방지하고 코드에 버그나 오류가 도입되는 가능성을 줄일 수 있습니다.

동일한 작업에 대해 다른 동사를 사용하지 않도록 주의하세요: 구현이 동일한 경우 fetch, retrieve, get 및 find를 서로 교차적으로 사용하지 마세요. 동시에 다른 구현이나 개념에 대해 서로 다른 단어를 선택해야 합니다. 예를 들어, "find" 동사를 사용하여 Optional 또는 nullable 데이터를 반환할 수 있지만, 데이터가 누락된 경우에는 "get"이 항상 예외를 throw합니다.

<div class="content-ad"></div>

## 6. 비즈니스 용어 vs. 기술 용어

비즈니스 용어와 기술 용어는 우리에게 적절한 이름을 선택하는 데 도움을 줄 수 있습니다. Clean Code에서 Uncle Bob은 기술 용어가 다른 개발자들에 의해 쉽게 이해될 수 있기 때문에 우선적으로 고려해야 한다고 제안합니다. Adapter, Builder, Repository, Dto와 같은 용어는 컴포넌트의 구현이나 위치를 나타낼 수 있습니다.

반면에 Eric Evan의 도메인 주도 설계는 비즈니스 언어를 받아들이는 것이 복잡한 도메인 모델을 가진 대규모 시스템에서 도움이 된다고 가르쳐줍니다. 이는 개발자와 비즈니스 담당자 간의 커뮤니케이션 간극을 크게 줄일 수 있습니다.

전반적으로, 컴포넌트에 이름을 선택할 때 비즈니스 용어와 기술 용어 모두 좋은 후보가 될 수 있습니다.

<div class="content-ad"></div>

## 7. 동사 vs. 명사

약칭으로는, 함수에는 동사를 사용하고 필드 및 변수에는 명사를 사용해야 합니다.

대부분의 경우 클래스에는 명사를 사용할 것이지만 몇 가지 특별한 경우가 있을 수 있습니다. 예를 들어, "세로 슬라이스" 디자인을 사용하는 경우 사용 사례를 나타내는 클래스를 가질 수 있습니다. 이러한 클래스는 CreateAccount, DisableAcount, ApplyPromotion과 같은 이름을 가질 것입니다.

인터페이스는 모두 메서드와 동작에 관한 것입니다. 인터페이스 이름을 정할 때에는 명사를 사용해야 하지만, 동시에 그들이 가능하게 하는 행동을 명확하게 표현해야 합니다. 예를 들어 Clonable, Runnable, Executable, DataProvider 등이 있습니다.

<div class="content-ad"></div>

## 결론

이 글에서는 좋은 이름을 선택하기 위한 7단계 체크리스트를 살펴보았습니다. 우리는 의도 표현, 측정 단위, 그리고 "잡음 단어" 피하기에 대해 처음에 논의했습니다. 그 후에는 이름의 길이, 일관성, 그리고 사용할 수 있는 단어 유형에 대해 배웠습니다.

![링크](/assets/img/2024-06-20-My7-StepCheatSheetforChoosingGoodNames_2.png)

# 감사합니다!

<div class="content-ad"></div>

기사를 읽어 주셔서 감사합니다! 의견을 주시면 감사하겠습니다. 어떠한 피드백이든 환영입니다.

프로젝트 이름을 선택할 때 꼭 지켜야 할 사항과 지켜야 할 규칙에 대한 .svg 치트 시트를 만들었습니다. 이 글에서 논의한 내용을 간결하게 요약한 것입니다. 제 콘텐츠가 마음에 들고, 이 치트 시트를 이메일로 받고 싶다면, 이메일 구독을 고려해 주세요.

즐거운 코딩 시간 보내세요!

# 레벨업 코딩

<div class="content-ad"></div>

우리 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 👏 스토리에 박수를 보내고 저자를 팔로우하세요 👉
- 📰 Level Up Coding 게시물에서 더 많은 콘텐츠를 확인하세요
- 🔔 팔로우하기: Twitter | LinkedIn | Newsletter

🚀👉 Level Up 재능 동호회에 가입하여 멋진 취업 기회를 찾아보세요