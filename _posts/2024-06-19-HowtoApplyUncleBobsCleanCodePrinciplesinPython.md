---
title: "파이썬에서 Uncle Bob의 Clean Code 원칙 적용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-19-HowtoApplyUncleBobsCleanCodePrinciplesinPython_0.png"
date: 2024-06-19 23:23
ogImage: 
  url: /assets/img/2024-06-19-HowtoApplyUncleBobsCleanCodePrinciplesinPython_0.png
tag: Tech
originalTitle: "How to Apply Uncle Bob’s Clean Code Principles in Python"
link: "https://medium.com/@denis-learns-tech/how-to-apply-uncle-bobs-clean-code-principles-in-python-6a34e4465d10"
---


![이미지](/assets/img/2024-06-19-HowtoApplyUncleBobsCleanCodePrinciplesinPython_0.png)

온클 밥, 모든 코더의 아버지,는 2008년에 '클린 코드'라는 책을 출판했습니다. 소프트웨어 엔지니어링에 진지하다면, 꼭 이 책을 읽어야 합니다. 이 글에서는 이 책을 요약하고 그 원칙들을 우리의 파이썬 코드에 어떻게 적용할 수 있는지 살펴보겠습니다. 이는 책에서 논의된 SOLID 원칙이 아니라, 코드베이스에서 그것을 따라야 하는 실제 상황에 대한 이야기입니다.

로버트 마틴이 논의한 이 원칙들은 어떤 프로그래밍 언어에도 적용 가능하므로, 내 생각에는 모든 소프트웨어 개발자에게 필수적입니다. 나쁜 코드는 아무도 도와준 적이 없습니다.

이 원칙들이 어떻게 작용하는지 확인하고 싶으신가요? 여기서 제 YouTube 비디오를 확인해보세요: [YouTube 비디오 링크](링크 주소)

<div class="content-ad"></div>

## 깔끔한 코드란 무엇인가요?

로버트 C. 마틴이 쓴 'Clean Code: Agile Software Craftsmanship'에서 소개한 깔끔한 코드란 쉽게 읽고 이해하며 유지보수할 수 있는 코드를 말합니다. 가독성, 간결함, 유지보수성을 강조합니다. 깔끔한 코드는 잘 구조화되어 있고 표준 규칙을 따르며 불필요한 복잡성이 없습니다. 또한 모듈화되어 있고 테스트 가능하며, 단일 책임을 갖는 함수와 메소드를 가지고 있어 코드 수정 및 확장이 쉽게 가능하며 버그를 도입하지 않도록 설계되어 있습니다. 깔끔한 코드의 궁극적인 목표는 견고하고 유연하며 작업하기 즐거운 코드베이스를 만드는 것입니다.

## 깔끔한 코드의 주요 원칙

이러한 일반 규칙은 간단하지만 강력합니다. 자세한 내용을 살펴보고 즐겨 사용하는 프로그래밍 언어인 Python에서 명확한 예제와 함께 이를 어떻게 구현하는지 알아봅시다.

<div class="content-ad"></div>

- 표준 규칙 준수하기

표준 규칙을 따르는 것은 깔끔하고 유지보수가 쉬운 코드를 작성하는 데 중요합니다. Python에서는 PEP 8에 따르는 것이 중요합니다. PEP 8는 일관된 Python 코드를 작성하는 데 대한 가이드라인과 모범 사례를 제공합니다.

- KISS 원칙 준수하기

디자인 시에 간결함을 중요시해야 합니다. 간단한 코드는 보다 쉽게 읽고 이해할 수 있으며 유지보수하기도 쉽습니다.

<div class="content-ad"></div>

이 책의 SOLID 원칙과는 논란이 될 수 있습니다. 적용하는 것이 그렇지 않을 때보다 쉽다고 말할 순 없지만 결국 그들이 당신의 삶을 더 나아지게 만들 수 있다는 것은 사실입니다.

- 보이 스카우트 규칙

보이 스카우트 규칙은 항상 코드를 발견한 것보다 깨끗하게 남겨야 한다고 제안합니다. 이것은 지저분한 코드를 발견하면 변경 사항을 가입하는 동안 정리해야 한다는 것을 의미합니다.

- 항상 근본 원인을 찾으세요

<div class="content-ad"></div>

문제의 원인을 항상 찾아보고, 단기적인 해결책을 찾는 대신에 해결하시는 것이 좋습니다. 이렇게 하면 반복되는 문제가 발생하지 않고 시스템의 무결성을 유지할 수 있습니다.

그렇다면, 이제 우리의 Python 코드에 깔끔한 코드 원칙을 적용하는 방법을 살펴보겠습니다.

## if/else 대신 다형성 선호

간단히 말해 다형성은 서로 다른 객체가 동일한 클래스의 인스턴스로 보일 수 있는 능력입니다. 이는 동일한 작업을 서로 다른 클래스에서 다르게 동작하도록 하는 것을 허용합니다. 예를 들어, 다른 클래스가 동일한 이름의 메소드를 가지고 있는 경우, 다형성을 통해 해당 메소드를 각 클래스의 객체에 대해 호출하고 그 클래스의 구현에 따라 특정 결과를 얻을 수 있습니다. 이는 코드에서 유연성과 재사용을 가능하게 합니다.

<div class="content-ad"></div>

다형성을 활용하면 상속과 메서드 재정의를 통해 복잡한 조건 로직을 피할 수 있습니다. 이 접근 방식은 개방/폐쇄 원칙과 일치합니다.

- if/else를 사용한 나쁜 예시

```js
def get_discount(customer_type): 
    if customer_type == "regular": 
        return 0.1 
    elif customer_type == "premium": 
        return 0.2 else: 
    return 0.0
```

- 다형성을 활용한 좋은 예시

<div class="content-ad"></div>

```python
class Customer:
    def get_discount(self):
        return 0.0

class RegularCustomer(Customer):
    def get_discount(self):
        return 0.1

class PremiumCustomer(Customer):
    def get_discount(self):
        return 0.2

def get_customer_discount(customer):
    return customer.get_discount()
```

## Use Dependency Injection

의존성 주입(Dependency Injection, DI)은 클래스에 의존성을 주입할 수 있도록 하는 디자인 패턴으로, 클래스 간의 결합도를 줄이고 테스트 용이성과 유지보수성을 향상시킵니다.

클래스가 자체적으로 의존성을 내부적으로 생성하는 경우, 해당 클래스는 해당 의존성에 강하게 결합됩니다. 이는 클래스가 의존성의 특정 구현에 대해 직접적으로 알고 있고 의존하고 있다는 것을 의미하며, 이를 수정하지 않고는 의존성을 변경하거나 대체하기가 어려워집니다. 이는 의존성 역전 원칙(Dependency Inversion Principle)을 위반하는 것으로, 고수준 모듈이 저수준 모듈에 의존하지 않고, 둘 다 추상화에 의존해야 한다는 원칙에 어긋납니다.


<div class="content-ad"></div>

한편, 의존성 주입은 외부에서 클래스로 의존성을 주입할 수 있게 합니다. 이는 클래스가 의존성을 어떻게 생성해야 하는지 알 필요가 없다는 것을 의미합니다. 그 대신 외부에서 제공되는 의존성에 의존하는 방식입니다. 이는 클래스 간의 느슨한 결합을 촉진하는데, 클래스는 구체적인 구현이 아닌 추상화(인터페이스 또는 추상 클래스)에만 의존합니다. 또한 클래스를 테스트하기가 더 쉬우며, 의존성을 테스트 중에는 목업 또는 테스트용 대체품으로 교체할 수 있습니다.

총론적으로, 의존성 주입은 더 유연하고 유지보수하기 쉬운 코드를 이끌며, 객체지향 설계 원칙을 더 잘 준수하게 만듭니다.

- 의존성 주입이 없는 경우

```js
class Service: 
    def init(self): 
        self.repository = Repository()
```

<div class="content-ad"></div>

```python
    def perform_action(self):
        data = self.repository.get_data()
```

- DI

```js
class Service: 
    def init(self, repository): 
        self.repository = repository
    def perform_action(self):
        data = self.repository.get_data()
        # perform action with data

repository = Repository() 
service = Service(repository)
```

## Prevent Over-Configurability and Don’t Use Flag Arguments

<div class="content-ad"></div>

소프트웨어를 간단하게 유지하는 것은 불필요한 설정이나 옵션을 추가하지 않는 것을 의미합니다. 플래그 인수는 함수를 복잡하고 이해하기 어렵게 만들 수 있습니다.
코드에서 과도한 구성 가능성은 복잡성, 유지 관리 부담 증가, 코드 냄새, 가독성 저하와 같은 문제를 일으킬 수 있습니다. 함수가 너무 많은 구성 옵션을 가지고 있는 경우, 단일 책임 원칙(SRP)을 위반하고 있는 것으로, 책임이 불명확하고 코드 구성이 떨어지게 됩니다. 또한, 긴 복잡한 구성이 코드를 읽고 이해하기 어렵게 만들 수 있습니다.

- 플래그 인수를 사용한 나쁜 예시

```js
def create_user(name, email, is_admin=False): 
    user = User(name, email) 
    if is_admin: 
        user.set_admin_permissions() 
    return user
```

- 플래그 인수를 사용하지 않은 좋은 예시

<div class="content-ad"></div>

```js
def create_user(name, email): 
    return User(name, email)

def create_admin_user(name, email): 
    user = User(name, email) 
    user.set_admin_permissions() 
    return user
```

## Law of Demeter를 따르세요

클래스는 직접적인 의존성만을 알아야 합니다. 이는 느슨한 결합과 캡슐화를 장려하여 코드를 모듈화하고 유지보수하기 쉽게 만듭니다.

- Law of Demeter를 위반하는 나쁜 예

<div class="content-ad"></div>

```python
def get_user_info(user): 
    address = user.get_address() 
    city = address.get_city() 
    return city
```

- 지데르 법칙을 잘 따른 좋은 예시

```python
def get_user_info(user): 
    return user.get_city()
```

## 논리적 의존성 회피하기

<div class="content-ad"></div>

클래스 내의 메서드는 동일한 클래스 내의 다른 메서드의 내부 상태나 동작에 의존해서는 안 됩니다. 각 메서드는 독립적이고 독립적이어야 합니다.

- 논리적 의존성이 있는 나쁜 예시

```js
class Calculator: 
    def init(self): 
        self.result = 0
    def add(self, number):
        self.result += number
    
    def subtract(self, number):
        self.result -= number
    
    def get_result(self):
        return self.result
```

- 논리적 의존성이 없는 좋은 예시

<div class="content-ad"></div>


class Calculator: 
    def add(self, a, b): 
        return a + b
    def subtract(self, a, b):
        return a - b


## 부작용 방지

부작용이 없는 함수는 예측 가능하고, 테스트하기 쉽고, 모듈화되어 있으며, 병렬 실행에 안전하며, 일반적으로 유지보수가 용이하고 가독성이 좋은 코드로 이어집니다. 이러한 함수들은 입력에만 의존하고 외부 상태를 수정하지 않고 출력을 생성해야 합니다.

이것은 또한 SOLID의 "단일 책임 원칙"의 예입니다. 함수는 한 가지 일만 수행해야 합니다. 즉, 부작용을 발생시키면 안 됩니다. 변수 2개를 더한 함수라면 콘솔에 뭔가를 로깅해서는 안 됩니다. 데이터베이스에서 사용자를 생성하는 함수라면 검증을 수행해서도 안 됩니다.


<div class="content-ad"></div>

- 부작용이 있는 안좋은 예시

```python
def add_to_list(item, item_list=[]): 
    item_list.append(item) 
    return item_list
```

- 부작용이 없는 좋은 예시

```python
def add_to_list(item, item_list=None): 
    if item_list is None: 
        item_list = [] 
    
    new_list = item_list + [item] 
    return new_list
```

<div class="content-ad"></div>

## 깨끗한 코드를 읽는 가치가 있을까요?

절대로요. 로버트 C. 마틴의 Clean Code는 소프트웨어 개발에 진지한 사람에게 꼭 필요한 책입니다. 이 책은 읽기 쉽고 유지보수가 쉽며 효율적인 코드 작성에 대한 실용적인 조언을 제공하여 더 나은 소프트웨어 품질과 더 쉬운 유지보수를 이루어냅니다. 이 책에 투자하는 시간은 귀하의 코딩 스킬과 전문 실무 방법을 크게 향상시킬 것입니다.

## 결론

요약하면, 우리는 Uncle Bob의 Clean Code에서 여러 원칙을 다뤄보았고 파이썬에서의 적용 방법을 보여주었습니다. 이 책을 꼭 읽어보시기를 강력히 추천합니다. 서로의 코드 품질을 높이는 데 노력합시다.

<div class="content-ad"></div>

클린 코드 책 요약 페이지를 보려면 GitHub 페이지를 확인해보세요.

코딩 즐기세요!