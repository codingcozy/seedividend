---
title: "GRASP 원칙 견고하고 유지보수 가능한 코드의 기초"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-GRASPPrinciplesTheFoundationofRobustandMaintainableCode_0.png"
date: 2024-07-09 14:55
ogImage:
  url: /assets/img/2024-07-09-GRASPPrinciplesTheFoundationofRobustandMaintainableCode_0.png
tag: Tech
originalTitle: "GRASP Principles: The Foundation of Robust and Maintainable Code"
link: "https://medium.com/@okanyenigun/grasp-principles-the-foundation-of-robust-and-maintainable-code-eb014711e60b"
---

## 일반 책임 할당 소프트웨어 패턴

![그림](/TIL/assets/img/2024-07-09-GRASPPrinciplesTheFoundationofRobustandMaintainableCode_0.png)

GRASP(일반 책임 할당 소프트웨어 패턴) 원칙은 객체지향 설계에서 객체와 클래스에 책임을 할당하는 데 도움이 되는 지침 세트입니다.

이러한 원칙은 처음으로 Craig Larman이 그의 책 "UML과 패턴 적용"에서 소개했습니다. 그 책 정말 좋아요; 이전에 읽지 않았다면 읽어보시기를 추천합니다.

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

<img src="/TIL/assets/img/2024-07-09-GRASPPrinciplesTheFoundationofRobustandMaintainableCode_1.png" />

이러한 패턴들은 개발자가 핵심 객체 지향 설계 원칙을 이해하고 적용하는 데 도움이 되는 교육 도구입니다. 이 패턴들은 개발자들이 책임을 클래스와 객체에 체계적으로 할당하고, 잘 구조화되고 유지보수 가능한 소프트웨어를 촉진하는 데 도움을 줍니다.

GRASP를 따르면, 개발자들은 합리적이고 설명 가능한 설계 결정을 내릴 수 있도록 하여, 시스템의 각 구성 요소가 명확하고 정당화된 역할을 갖도록 보장할 수 있습니다.

## 책임 주도 설계

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

RDD는 소프트웨어 설계 방법으로, 소프트웨어 구성 요소에 명확한 책임을 할당하는 것을 강조합니다. 각 구성 요소(일반적으로 객체 또는 클래스)는 잘 정의된 역할과 다른 구성 요소와의 상호 작용을 갖습니다.

GRASP 패턴의 주요 원칙은 역할을 찾아 객체에 할당하는 것입니다. 즉, 이러한 할당을 안내하는 원칙 세트를 제공합니다.

Larman의 책에서 역할을 두 가지 주요 유형으로 나눕니다:

역할 인식: 객체는

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

- 그 데이터 또는 상태 (캡슐화)입니다.
- 그 주변의 기타 관련된 객체들 (결합 등). 누구와 협력하나요?
- 비즈니스. 무슨 일을 할 건가요? 어떻게 할 건가요?

기능 책임: 객체가 하는 일

- 비즈니스 계산 수행 또는 객체 생성과 같은 동작을 수행합니다. (원자적 작업)
- 다른 객체에게 작업을 수행하도록 유발합니다.
- 다른 객체들에서 작업 (비즈니스 프로세스)을 조정합니다. (조정 작업)

GRASP 원칙:

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

- 정보 전문가
- 생성자
- 높은 응집도
- 낮은 결합도
- 컨트롤러
- 다형성
- 순수한 가공물
- 간접성
- 보호된 변화

## 정보 전문가

해당 작업을 수행하는 데 필요한 정보를 갖고 있는 클래스에 책임을 할당해야 합니다. 가장 관련성 있는 데이터를 갖고 있는 클래스가 관련된 동작을 처리하는 책임을 져야 합니다.

이는 캡슐화를 강조하고 데이터 결합을 피하기 위한 것입니다.

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

예를 들어, 작업을 수행하는 메서드를 가지고 있다고 가정해보겠습니다. 이 메서드가 데이터를 사용한다면, 해당 메서드는 데이터가 포함된 클래스에 배치되어야 합니다.

![이미지](/TIL/assets/img/2024-07-09-GRASPPrinciplesTheFoundationofRobustandMaintainableCode_2.png)

제품에 대한 할인을 계산하려고 합니다.

좋지 않은 예: DiscountCalculator 클래스가 제품 클래스에서 데이터를 사용하여 할인 가격을 계산합니다.

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

```python
class Product:
    def __init__(self, name: str, price: float, discount: float):
        self.name = name
        self.price = price
        self.discount = discount

class Order:
    def __init__(self, product: Product, quantity: int):
        self.product = product
        self.quantity = quantity

    def calculate_total_price(self) -> float:
        return self.product.price * self.quantity

class DiscountCalculator:
    def calculate_discounted_price(self, order: Order) -> float:
        discount = order.product.price * (order.product.discount / 100)
        return order.product.price - discount
```

DiscountCalculator 클래스가 필요한 정보를 스스로 캡슐화하지 않고 외부 데이터에 의존합니다.

Product는 책임이 없습니다. 실제 클래스가 아닙니다.

좋은 점: 할인을 계산하는 메서드가 필요한 데이터를 포함한 클래스에 위치합니다.

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
class Product:
    def __init__(self, name: str, price: float, discount: float):
        self.name = name
        self.price = price
        self.discount = discount

    def calculate_discounted_price(self) -> float:
        discount = self.price * (self.discount / 100)
        return self.price - discount

class Order:
    def __init__(self, product: Product, quantity: int):
        self.product = product
        self.quantity = quantity

    def calculate_total_price(self) -> float:
        return self.product.calculate_discounted_price() * self.quantity
```

Product 클래스에는 할인 가격을 계산하는 calculate_discounted_price 메서드가 있습니다. 이 메서드는 가격과 할인율과 같은 필요한 정보를 포함하는 Product 클래스 내에 위치합니다. 이렇게 함으로써 관련된 동작을 다루는 관련 데이터를 포함하는 클래스가 해당 동작을 처리하므로 정보 전문가 원칙을 따르며 캡슐화를 촉진하고 데이터 결합을 줄입니다.

## Creator

다른 클래스의 인스턴스를 생성하는 책임이 있는 클래스에 대한 지침을 제공합니다.

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

창작자 원칙에 따르면 클래스 B는 다음 조건 중 하나 이상이 참일 때 클래스 A의 인스턴스를 생성하는 역할을 수행해야 합니다:

- 집약: B가 A 객체를 집약함.
- 합성: B가 A 객체를 포함함.
- 초기화: B가 A 객체를 밀접하게 사용함.
- 연관: B가 A 객체를 생성하기 위한 초기화 데이터를 가짐.
- 의존성: B가 A 객체의 인스턴스를 기록함.

이러한 관계를 기억하는 데 도움이 될 수 있습니다:

여러 옵션이 적용되는 경우 집약 또는 포함 (우선 순위가 높음)하는 클래스 B를 선호합니다.

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
# Class B는 클래스 A의 객체들을 모으는 역할을 합니다.

class A:
    def __init__(self, value):
        self.value = value

class B:
    def __init__(self):
        self.a_objects = []

    def add_a(self, value):
        a = A(value)  # B가 A를 생성합니다
        self.a_objects.append(a)
```

```js
# Class B는 클래스 A의 객체들을 포함합니다.

class A:
    def __init__(self, value):
        self.value = value

class B:
    def __init__(self, value1, value2):
        self.a1 = A(value1)  # B가 A를 생성합니다
        self.a2 = A(value2)  # B가 A를 생성합니다
```

```js
# Class B는 클래스 A의 객체들을 밀접하게 사용합니다.

class A:
    def __init__(self, value):
        self.value = value

class B:
    def __init__(self, value):
        self.a = A(value)  # B가 A를 생성합니다

    def get_a_value(self):
        return self.a.value
```

```js
# Class B는 클래스 A의 객체를 만들기 위한 초기화 데이터를 갖습니다.

class A:
    def __init__(self, value):
        self.value = value

class B:
    def __init__(self, value):
        self.a = self.create_a(value)  # B가 A를 생성합니다

    def create_a(self, value):
        return A(value)
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

```js
# Class B은 Class A의 인스턴스를 기록합니다.

class A:
    def __init__(self, value):
        self.value = value

class B:
    def __init__(self):
        self.a_objects = []

    def add_a(self, value):
        a = A(value)  # B가 A를 생성
        self.a_objects.append(a)
```

위 내용에서 알 수 있듯이, 이 원리는 객체 지향 설계에서 객체를 생성하는 데 특히 책임이 있는 생성 디자인 패턴과 관련이 있습니다.

예를 들어, Factory 디자인 패턴은 슈퍼클래스에서 객체를 생성하는 인터페이스를 제공합니다.

Factory 디자인 패턴에서는 세부 사항을 알 필요가 없습니다. 이 패턴은 "필요한 데이터를 제공하면 객체를 생성할 테니까"라고 합니다. 그것은 객체를 만드는 방법을 알지만 그것을 사용하지는 않습니다. 그저 생성합니다.

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

## 높은 응집도 & 낮은 결합도

낮은 결합도는 클래스 간의 의존성을 줄여 시스템을 더 모듈화하고 유지 관리하기 쉽게 만듭니다.

높은 응집도는 각 클래스가 명확한 목적을 갖도록 합니다.

이 두 가지 개념에 대해 이미 다른 게시물에서 설명했기 때문에 여기서 다시 설명하지는 않겠습니다.

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

## Controller

입력 시스템 이벤트가 발생했을 때(예: 사용자가 버튼을 클릭하거나 타이머가 만료되거나 센서가 변경을 감지한 경우), Controller 원칙은 어떤 클래스가 이벤트를 처리해야 하는지 결정하는 데 도움을 줍니다. Controller는 필요한 조치를 조정하고 다른 객체에 작업을 위임할 것입니다.

Controller는 전체 시스템, 특정 장치 또는 서브시스템을 나타내는 퍼사드 컨트롤러로 작용할 수 있습니다. 이 퍼사드 컨트롤러는 시스템 이벤트를 처리하기 위한 중앙 진입점 역할을 하며, 시스템 내에서 상호 작용을 조정하고 고수준 작업을 관리하는 단순화된 일관된 인터페이스를 제공합니다.

```python
class User:
    def __init__(self, username):
        self.username = username
        self.logged_in = False

    def login(self):
        self.logged_in = True
        print(f"{self.username} 님이 로그인했습니다.")

    def logout(self):
        self.logged_in = False
        print(f"{self.username} 님이 로그아웃했습니다.")

class SystemController:
    def __init__(self):
        self.users = {}

    def handle_input(self, action, username):
        if action == "login":
            self.login_user(username)
        elif action == "logout":
            self.logout_user(username)
        else:
            print("알 수 없는 동작입니다.")

    def login_user(self, username):
        if username not in self.users:
            self.users[username] = User(username)
        user = self.users[username]
        user.login()

    def logout_user(self, username):
        user = self.users.get(username)
        if user and user.logged_in:
            user.logout()
        else:
            print(f"{username} 님은 로그인되어 있지 않거나 존재하지 않습니다.")
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

SystemController은 퍼사드 컨트롤러 역할을 하며 사용자 로그인 및 로그아웃 작업을 단일화하여 처리합니다. 사용자 사전을 유지하고 시스템 입력의 로그인 및 로그아웃 작업을 처리하는 메서드를 제공합니다.

컨트롤러를 구현하는 다른 방법은 특정 사용 사례나 시나리오를 나타내는 곳에서 시스템 이벤트가 발생하는 것을 나타내는 것입니다. 이 유형의 컨트롤러는 종종 `UseCaseName`Handler, `UseCaseName`Coordinator 또는 `UseCaseName`Session으로 참조됩니다.

이 사용 사례 또는 세션 컨트롤러는 특정 사용 사례와 관련된 작업과 상호 작용의 순서를 관리하여 모든 필요한 단계가 올바르게 실행되고 올바른 순서대로 실행되도록 보장합니다.

```js
class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.logged_in = False

    def check_password(self, password):
        return self.password == password

    def login(self):
        self.logged_in = True
        print(f"{self.username}님이 로그인하였습니다.")

    def logout(self):
        self.logged_in = False
        print(f"{self.username}님이 로그아웃하였습니다.")

class LoginSession:
    def __init__(self, users):
        self.users = users

    def handle_login(self, username, password):
        user = self.users.get(username)
        if user and user.check_password(password):
            user.login()
        else:
            print("유효하지 않은 사용자 이름 또는 비밀번호.")

    def handle_logout(self, username):
        user = self.users.get(username)
        if user and user.logged_in:
            user.logout()
        else:
            print(f"{username}님은 로그인되어 있지 않거나 사용자가 존재하지 않습니다.")
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

로그인 세션은 로그인 시나리오를 위한 유즈 케이스 컨트롤러 역할을 합니다. 로그인 및 로그아웃 프로세스를 처리하며 적절한 단계(예: 비밀번호 확인 및 로그인 상태 업데이트)가 따라지도록 합니다.

일반적으로 컨트롤러는 수행해야 하는 작업을 다른 객체에게 위임해야 합니다. 주요 역할은 활동을 조정하거나 관리하는 것입니다. 컨트롤러 자체가 방대한 업무를 수행해서는 안 됩니다.

```js
class Worker:
    def perform_task(self, task_name):
        print(f"Worker is performing task: {task_name}")

class TaskController:
    def __init__(self):
        self.worker = Worker()

    def handle_task(self, task_name):
        # 컨트롤러는 실제 작업을 Worker에 위임합니다
        self.worker.perform_task(task_name)
```

컨트롤러 클래스가 담당해야 할 책임이 너무 많아지고 논리와 기능을 더 다루게 되면 컨트롤러가 부풀어 오르는 상황이 발생합니다. 보통 이런 상황은 컨트롤러가 다른 객체나 클래스에 효과적으로 작업을 위임하지 않아서 발생하며, 관심사의 명확한 분리가 이루어지지 않는 것이 일반적입니다.

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

- 과도한 책임
- 부적절한 위임
- 복잡성
- 유지 관리 도전
- 재사용성 감소

```js
class TaskController:
    def __init__(self):
        self.tasks = []
        self.users = {}
        self.logged_in_user = None

    # 사용자 관리 메서드
    def register_user(self, username, password):
        if username in self.users:
            print(f"'{username}' 사용자는 이미 존재합니다.")
        else:
            self.users[username] = password
            print(f"'{username}' 사용자가 등록되었습니다.")

    def login_user(self, username, password):
        if username in self.users and self.users[username] == password:
            self.logged_in_user = username
            print(f"'{username}' 사용자가 로그인되었습니다.")
        else:
            print("유효하지 않은 사용자 이름 또는 비밀번호입니다.")

    def logout_user(self):
        if self.logged_in_user:
            print(f"'{self.logged_in_user}' 사용자가 로그아웃되었습니다.")
            self.logged_in_user = None
        else:
            print("로그인된 사용자가 없습니다.")

    # 업무 관리 메서드
    def add_task(self, task_name):
        if self.logged_in_user:
            self.tasks.append((task_name, self.logged_in_user))
            print(f"'{task_name}' 작업이 {self.logged_in_user}에 의해 추가되었습니다.")
        else:
            print("로그인된 사용자가 없습니다.")

    def remove_task(self, task_name):
        if self.logged_in_user:
            task = next((t for t in self.tasks if t[0] == task_name and t[1] == self.logged_in_user), None)
            if task:
                self.tasks.remove(task)
                print(f"'{task_name}' 작업이 {self.logged_in_user}에 의해 제거되었습니다.")
            else:
                print(f"'{task_name}' 작업을 {self.logged_in_user} 사용자가 찾을 수 없습니다.")
        else:
            print("로그인된 사용자가 없습니다.")

    ...

    # 작업 스케줄링 메서드
    def schedule_task(self, task_name, time):
        if self.logged_in_user:
            print(f"'{task_name}' 작업이 {self.logged_in_user}에 의해 {time}에 예약되었습니다.")
        else:
            print("로그인된 사용자가 없습니다.")
```

TaskController는 사용자 인증, 작업 관리 및 스케줄링을 처리하므로 지나치게 복잡합니다. (과도한 책임)

모든 로직이 컨트롤러 내에서 처리되어 서로 강하게 결합되어 유지 관리하기 어려운 코드로 이어집니다. (부적절한 위임)

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

컨트롤러의 메서드는 관련 없는 여러 작업을 처리하므로 오류 발생 및 코드 이해가 어려워질 수 있습니다. (높은 복잡성)

사용자 관리, 작업 처리 또는 일정 로직에 대한 변경은 TaskController 수정을 필요로 하여 유지 관리를 복잡하게 하고 기능을 확장합니다. (유지보수 도전)

리팩토링:

```js
class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.logged_in = False

    def check_password(self, password):
        return self.password == password

    def login(self):
        self.logged_in = True
        print(f"{self.username} 로그인되었습니다.")

    def logout(self):
        self.logged_in = False
        print(f"{self.username} 로그아웃되었습니다.")

class Task:
    def __init__(self, name):
        self.name = name

    def perform(self):
        print(f"작업 수행 중: {self.name}")

class TaskManager:
    def __init__(self):
        self.tasks = {}

    def add_task(self, task, username):
        self.tasks[(task.name, username)] = task
        print(f"작업 '{task.name}'가 {username}에 의해 추가되었습니다.")

    def remove_task(self, task_name, username):
        if (task_name, username) in self.tasks:
            del self.tasks[(task_name, username)]
            print(f"작업 '{task_name}'가 {username}에 의해 제거되었습니다.")
        else:
            print(f"사용자 {username}에 대한 작업 '{task_name}'을 찾을 수 없습니다.")

    def get_task(self, task_name, username):
        return self.tasks.get((task_name, username), None)

class UserController:
    def __init__(self):
        self.users = {}
        self.logged_in_user = None

    def register_user(self, username, password):
        if username in self.users:
            print(f"'{username}' 사용자가 이미 존재합니다.")
        else:
            self.users[username] = User(username, password)
            print(f"'{username}' 사용자가 등록되었습니다.")

    def login_user(self, username, password):
        user = self.users.get(username)
        if user and user.check_password(password):
            self.logged_in_user = user
            user.login()
        else:
            print("유효하지 않은 사용자 이름 또는 비밀번호입니다.")

    def logout_user(self):
        if self.logged_in_user:
            self.logged_in_user.logout()
            self.logged_in_user = None
        else:
            print("로그인된 사용자가 없습니다.")

    def get_logged_in_user(self):
        return self.logged_in_user

class TaskScheduler:
    def schedule_task(self, task_name, time, username):
        print(f"'{task_name}' 작업이 {username}에 의해 {time}에 예약되었습니다.")

class TaskController:
    def __init__(self, user_controller, task_manager, task_scheduler):
        self.user_controller = user_controller
        self.task_manager = task_manager
        self.task_scheduler = task_scheduler

    def handle_add_task(self, task_name):
        user = self.user_controller.get_logged_in_user()
        if user:
            task = Task(task_name)
            self.task_manager.add_task(task, user.username)
        else:
            print("로그인된 사용자가 없습니다.")

    def handle_remove_task(self, task_name):
        user = self.user_controller.get_logged_in_user()
        if user:
            self.task_manager.remove_task(task_name, user.username)
        else:
            print("로그인된 사용자가 없습니다.")

    def handle_perform_task(self, task_name):
        user = self.user_controller.get_logged_in_user()
        if user:
            task = self.task_manager.get_task(task_name, user.username)
            if task:
                task.perform()
                self.task_manager.remove_task(task_name, user.username)
            else:
                print(f"사용자 {user.username}에 대해 작업 '{task_name}'을 찾을 수 없습니다.")
        else:
            print("로그인된 사용자가 없습니다.")

    def handle_schedule_task(self, task_name, time):
        user = self.user_controller.get_logged_in_user()
        if user:
            self.task_scheduler.schedule_task(task_name, time, user.username)
        else:
            print("로그인된 사용자가 없습니다.")
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

각 클래스는 하나의 명확한 책임을 갖습니다.

## 다형성

다형성은 OOP의 기본 개념으로, 다른 클래스의 객체를 공통 상위 클래스의 객체로 처리할 수 있게 해줍니다.

## 순수 가공

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

가끔은 우리의 문제 도메인에 직접적으로 대응되지 않지만 코드를 더 잘 관리하기 위해 만든 클래스가 필요할 수 있습니다. 이러한 클래스들은 우리의 주요 클래스를 복잡하게 만들지 않고 원활하게 작동하도록 도와주는 편리한 도구들과 같습니다.

```js
class Resource:
    def __init__(self):
        print("리소스를 로딩 중입니다...")
        # 리소스 집약 작업을 시뮬레이션합니다
        import time
        time.sleep(2)
        print("리소스가 로딩되었습니다.")

    def use(self):
        print("리소스를 사용 중입니다.")
```

이 예시에서 Resource 클래스는 리소스를 로딩하기 위해 과도한 시간이 소요될 수 있습니다. Resource 객체를 생성할 때마다 리소스 집약적인 작업을 즉시 수행하며, 실제로 사용하지 않아도 됩니다.

이제 Resource 객체가 필요한 경우에만 생성되도록 액세스를 제어하는 ResourceProxy 클래스를 소개해보겠습니다.

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

```python
class Resource:
    def __init__(self):
        print("리소스를 불러오는 중...")
        # 리소스 집약적인 작업을 시뮬레이션합니다
        import time
        time.sleep(2)
        print("리소스가 불러졌습니다.")

    def use(self):
        print("리소스를 사용 중입니다.")

class ResourceProxy:
    def __init__(self):
        self._resource = None

    def use(self):
        if self._resource is None:
            self._resource = Resource()  # 게으른 초기화
        self._resource.use()
```

`ResourceProxy`는 `Resource` 객체에 대한 프록시 역할을 하며, 액세스를 제어하고 필요할 때만 생성되도록 보장합니다(게으른 초기화).

원본 클래스를 복잡하게 만들지 않으면서도 가치를 더하는 도우미 클래스를 소개했습니다.

`순수 가상화`는 문제 도메인 내에서 실제 세계 개념을 나타내지 않는 인공 클래스를 생성하는 디자인 원칙입니다. 이 클래스는 고유한 디자인 목표인 높은 응집력, 낮은 결합도, 재사용성을 달성하기 위해 도입됩니다.

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

기본적으로 "상상의 산물"이며, 이는 깔끔하고 효율적인 설계를 유지하는 데 도움이 되는 발명된 구조라는 뜻입니다. 이 상상한 클래스에 할당된 책임은 다른 클래스와 높은 응집성을 유지하고 최소한으로 결합되도록 보장하여 모듈식이고 유지보수가 쉬운 코드베이스를 유지하는 데 도움이 되어야 합니다.

목표는 각 클래스가 집중된 목적을 가지고 있으며 최소한의 의존성을 갖도록하여 전체적으로 깔끔한 아키텍처를 유발하는 시스템을 설계하는 것입니다. 순수한 가공은 때로 디자이너가 시스템의 복잡성을 효과적으로 관리해야 할 때 창의적인 솔루션으로 사용됩니다.

```js
# 나쁜 예

class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def save_to_database(self):
        # 데이터베이스에 저장하는 것을 모의로 시뮬레이션
        print(f"{self.name} 고객을 데이터베이스에 저장합니다.")

# 좋은 예
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class CustomerRepository:
    def save(self, customer):
        # 데이터베이스에 저장하는 것을 모의로 시뮬레이션
        print(f"{customer.name} 고객을 데이터베이스에 저장합니다.")
```

## 간접성

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

간접 역참조의 원칙은 다른 구성 요소 사이에 중간 클래스를 생성하는 것을 포함합니다. 이 중간 클래스는 클래스들을 분리하여 시스템에서 유연성과 재사용성을 촉진하는 데 도움이 됩니다.

```js
class Database:
    def save_user(self, username):
        print(f"사용자 {username}을(를) 데이터베이스에 저장했습니다.")

class UserRepository:
    def __init__(self, database):
        self.database = database

    def save(self, username):
        self.database.save_user(username)

class User:
    def __init__(self, username, user_repository):
        self.username = username
        self.user_repository = user_repository

    def save(self):
        self.user_repository.save(self.username)
```

UserRepository는 User와 Database 클래스 간의 상호 작용을 추상화하는 중개자 역할을 합니다. 이 리포지토리는 통신을 중재하고 데이터 작업을 관리합니다.

User 클래스는 Database 클래스와 직접 상호 작용하지 않으므로 종속성이 줄어듭니다.

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

## 보호된 변이

Protected Variations은 시스템의 요소들을 안정적인 인터페이스 뒤에 변경 또는 다른 요소의 변화로부터 보호하는 것을 목표로 합니다.

본질적으로, 이는 우리 시스템에서 변경될 가능성이 높거나 불안정할 수 있는 부분을 식별하고, 이러한 부분 주변에 안정적인 인터페이스를 생성하여 이러한 변경으로부터 시스템의 나머지 부분을 보호하는 것입니다.

이 원칙을 구현하기 위해 우리는 먼저 시스템 내에서 변경이 가장 가능성이 높은 지점을 식별합니다. 이를 "변이 지점"이라고 합니다.

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

그럼, 우리는 이러한 가변 부분과 상호 작용하는 안정적이고 일관된 방법을 제공하는 인터페이스나 추상 클래스를 생성합니다.

이를 통해 시스템을 통해 전파되는 잠재적인 변경사항이나 불안정성을 방지하여 버그를 도입하는 위험을 최소화하고 광범위한 리팩터링이 필요한 필요성을 줄입니다.

간단한 예제를 통해 **보호된 변형** 원칙을 보여줍시다. 여기서는 다양한 결제 방법을 지원해야 할 수 있는 결제 시스템을 가정합니다.

```python
class CreditCardPayment:
    def process_payment(self, amount):
        print(f"금액 ${amount}의 신용카드 결제 처리중")

class PayPalPayment:
    def process_payment(self, amount):
        print(f"금액 ${amount}의 PayPal 결제 처리중")

class Order:
    def __init__(self, amount):
        self.amount = amount

    def process_payment(self, payment_method):
        if payment_method == "credit_card":
            payment = CreditCardPayment()
            payment.process_payment(self.amount)
        elif payment_method == "paypal":
            payment = PayPalPayment()
            payment.process_payment(self.amount)
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

Order 클래스는 특정 결제 방법 구현과 직접 상호 작용합니다.

이제 결제 방법의 변화를 캡슐화하기 위한 안정적인 인터페이스를 소개합시다.

```python
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

class CreditCardPayment(PaymentMethod):
    def process_payment(self, amount):
        print(f"카드로 ${amount} 결제 진행 중")

class PayPalPayment(PaymentMethod):
    def process_payment(self, amount):
        print(f"PayPal로 ${amount} 결제 진행 중")

class Order:
    def __init__(self, amount, payment_method):
        self.amount = amount
        self.payment_method = payment_method

    def process_payment(self):
        self.payment_method.process_payment(self.amount)
```

결제 처리 로직은 특정 결제 방법 클래스 내에 캡슐화되어 있습니다. 새로운 결제 방법이 도입되면 Order 클래스를 수정하지 않고 PaymentMethod 인터페이스를 구현하는 새 클래스를 생성하여 추가할 수 있습니다.

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

## 더 읽어보기

## 출처

Applying UML and Patterns, Craig Larman

https://www.geeksforgeeks.org/grasp-design-principles-in-ooad/

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

위키백과 링크의 표를 마크다운 형식으로 변경하세요.
