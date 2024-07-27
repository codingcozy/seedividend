---
title: "파이썬에서 SOLID 원칙 적용하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-SOLIDprinciplesinPython_0.png"
date: 2024-07-09 14:45
ogImage:
  url: /assets/img/2024-07-09-SOLIDprinciplesinPython_0.png
tag: Tech
originalTitle: "SOLID principles in Python"
link: "https://medium.com/@tai.him18/solid-principles-in-python-0e01b66c1afe"
---

![SOLID principles in Python](/TIL/assets/img/2024-07-09-SOLIDprinciplesinPython_0.png)

# SOLID이란 무엇인가요?

객체 지향 프로그래밍은 모든 프로그래머의 도구 상자에서 매우 유용한 도구입니다. 그러나 사용할 때 대부분의 사람들이 빠지는 흔한 함정이 있습니다.

SOLID 원칙은 이러한 함정을 피하고 깔끔하고 유지보수 가능한 코드를 작성하는 데 도움이 되는 일련의 지침입니다.

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

"SOLID"은 다음을 나타내는 머리글자입니다:

- 단일 책임 원칙 (SRP)
- 개방/폐쇠 원칙 (OCP)
- 리스코프 치환 원칙 (LSP)

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

- 인터페이스 분리 원칙

- 의존성 역전 원칙

## 1. 단일 책임 원칙 (SRP)

로버트 C. 마틴 (a.k.a 아저씨 밥)이 "OOD의 원칙"이라는 기사에서 만들어진 단일 책임 원칙은 다음과 같습니다.

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

한 클래스는 한 가지 책임만 가져야 합니다. 한 클래스가 여러 가지 일을 한다면, 여러 클래스로 분리해야 합니다.

간단한 예를 통해 이를 설명해보겠습니다. 우리가 Google 드라이브 또는 Dropbox에서 객체를 읽고 쓰는 클래스가 있다고 가정해 봅시다.

```js
class StorageClient:
    _instance = None
    _google_client = None
    _dropbox_client = None

    def __init__(self, google_credentials, dropbox_credentials) -> None:
        self._google_client = "Google 클라이언트"
        self._dropbox_client = "Dropbox 클라이언트"

    @classmethod
    def get_or_create_instance(cls, google_credentials, dropbox_credentials) -> "StorageClient":
        if not cls._instance:
            cls._instance = StorageClient(google_credentials, dropbox_credentials)

        return cls._instance

    def read_from_google(self, key):
        ...

    def upload_to_google(self, key, value):
        ...

    def read_from_dropbox(self, key):
        ...

    def upload_to_dropbox(self, key, value):
        ...
```

이 클래스의 문제는 두 가지 책임을 가지고 있다는 점입니다. Google 드라이브 및 Dropbox에서 객체를 읽고 쓰는 데에 대한 별도의 로직을 구현해야 합니다. SRP를 준수하기 위해 이 클래스를 GoogleStorageClient와 DropboxStorageClient로 분리할 수 있습니다.

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
class GoogleStorageClient:
    _instance = None
    _google_client = None

    def __init__(self, google_credentials) -> None:
        self._google_client = "Google client"

    @classmethod
    def get_or_create_instance(cls, google_credentials) -> "GoogleStorageClient":
        if not cls._instance:
            cls._instance = GoogleStorageClient(google_credentials)

        return cls._instance

    def read(self, key):
        ...

    def upload(self, key, value):
        ...


class DropboxStorageClient:
    _instance = None
    _dropbox_client = None

    def __init__(self, dropbox_credentials) -> None:
        self._dropbox_client = "Dropbox client"

    @classmethod
    def get_or_create_instance(cls, dropbox_credentials) -> "DropboxStorageClient":
        if not cls._instance:
            cls._instance = DropboxStorageClient(dropbox_credentials)

        return cls._instance

    def read(self, key):
        ...

    def upload(self, key, value):
        ...
```

조금 더 상세하게 작성하더라도, 두 클라이언트를 개별적으로 개발하고 코드를 더 유지보수하기 쉽게 만듭니다. 예를 들어 Google 클라이언트를 작업하는 사람은 Dropbox 클라이언트의 작동 방식을 알 필요가 없으며 그 반대도 마찬가지입니다.

## 2. 개방/폐쇄 원칙 (OCP)

버트랜드 메이어는 1988년 저술한 "객체지향 소프트웨어 구성"에서 개방-폐쇄 원칙을 처음 제안한 것으로 일반적으로 알려져 있습니다. 그러나 1990년대에 이 원칙은 언클 밥이 1996년에 발표한 "개방-폐쇄 원칙"으로 현재의 형태로 재정의되었습니다.

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

개방/폐쇄 원칙은 다음을 의미합니다:

클래스에 새 기능을 추가할 수 있어야 하며 기존 코드를 변경하지 않아도 됩니다.

예를 들어, 다음 클래스는 개방/폐쇄 원칙을 위반합니다:

```js
class Vehicle:
    def __init__(self, vehicle_type, **kwargs) -> None:
        self.vehicle = vehicle_type
        if self.vehicle_type == "car":
            self.tires = kwargs["tires"]
            self.mode = kwargs["mode"]
        elif self.vehicle_type == "boat":
            self.motors = kwargs["motors"]
            self.mode = kwargs["mode"]

    def get_specifications(self) -> str:
        if self.vehicle_type == "car":
            return f"This {self.vehicle_type} has {self.tires} tires and can drive on {self.mode}."
        elif self.vehicle_type == "boat":
            return f"This {self.vehicle_type} has {self.motors} motors and can float on {self.mode}."
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

이 클래스의 문제점은 새로운 차량, 예를 들어 비행기를 추가하려면 기존 클래스를 수정해야 한다는 것입니다.

기존 코드를 수정하는 것은 위험할 수 있으며 버그를 도입할 수도 있고 유닛 테스트를 실패할 수도 있습니다.

대신 추상 기본 클래스를 정의하고 상속을 사용하여 클래스가 개방/폐쇄 원칙을 따르도록 할 수 있습니다.

```js
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, mode) -> None:
        self.mode = mode

    @abstractmethod
    def get_specifications(self) -> str:
        ...

class Car(Vehicle):
    def __init__(self, tires) -> None:
        super().__init__("lane")
        self.tires = tires

    def get_specifications(self) -> str:
        return f"This car has {self.tires} tires and can drive on {self.mode}."

class Boat(Vehicle):
    def __init__(self, motors) -> None:
        super().__init__("water")
        self.motors = motors

    def get_specifications(self) -> str:
        return f"This boat has {self.motors} motors and can float on {self.mode}."

class Plane(Vehicle):
    def __init__(self, engines) -> None:
        super().__init__("air")
        self.engines = engines

    def get_specifications(self) -> str:
        return f"This plane has {self.engines} engines and can fly through the {self.mode}."
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

이제 새 차량을 추가하고 싶다면, 단순히 Vehicle 클래스를 상속하고 get_specifications 메서드를 구현하는 새 클래스를 생성하면 됩니다.

## 3. 리스코프 치환 원칙 (LSP)

리스코프 치환 원칙은 1987년 OOPSLA 컨퍼런스에서 Barbara Liskov에 의해 소개되었습니다. 이 원칙은 다음과 같습니다:

다시 말해, 만약 `S`가 `T`의 서브 클래스라면, `T` 타입의 객체를 `S` 타입의 객체로 대체할 수 있어야 하며, 프로그램의 기능을 변경하지 않아야 합니다.

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

예를 들어, 다음과 같은 클래스를 고려해보세요:

```python
class Person:
    def __init__(self, name, age) -> None:
        self.name = name
        self.age = age

    def get_name(self) -> str:
        return self.name

    def vote(self, give_vote) -> int:
        if give_vote:
            return 1
        return 0

class Child(Person):
    def __init__(self, name, age) -> None:
        super().__init__(name, age)

    def vote(self) -> None:
        raise NotImplementedError("어린이는 투표할 수 없습니다.")
```

이 코드의 문제는 Child 클래스가 리스코프 치환 원칙을 위반한다는 것입니다. Person 타입의 객체를 Child 타입의 객체로 대체하려고 하면, 예를 들어 vote 메서드를 사용하려고 할 때 프로그램이 예상대로 동작하지 않을 것입니다.

이 문제를 해결하기 위해서는 Person을 추상 기본 클래스로 변환하고, 그것을 상속하는 Child와 Adult 두 클래스를 만들면 됩니다.

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

from abc import ABC, abstractmethod

class Person(ABC):
def **init**(self, name, age) -> None:
self.name = name
self.age = age

    def get_name(self) -> str:
        return self.name

class Child(Person):
def **init**(self, name, age) -> None:
super().**init**(name, age)

    def go_to_school(self) -> None:
        print(f"{self.name} is going to school.")

class Adult(Person):
def **init**(self, name, age) -> None:
super().**init**(name, age)

    def vote(self) -> int:
        return 1

이제 프로그램의 정확성에 영향을 주지 않고 Person 유형의 객체를 Child 또는 Adult 유형의 객체로 대체할 수 있습니다.

## 4. Interface Segregation Principle (ISP)

인터페이스 분리 원칙(Interface Segregation Principle, ISP)은 Uncle Bob이 만들었습니다. 이 원칙은 다음과 같이 설명합니다:

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

큰 인터페이스를 피해야 합니다. 이는 모든 클라이언트가 구현하는 인터페이스 메서드를 사용하지 않는 대규모 인터페이스를 의미합니다.

예를 들어, 다음과 같은 인터페이스를 고려해 보세요:

```python
from abc import ABC, abstractmethod

class Printer(ABC):
    def scan(self) -> None: ...

    def fax(self) -> None: ...

    def print(self) -> None: ...


class SimplePrinter(Printer):
    def scan(self) -> None:
        raise NotImplementedError("This printer cannot scan.")

    def fax(self) -> None:
        raise NotImplementedError("This printer cannot fax.")

    def print(self) -> None:
        print("Printing...")


class AdvancedPrinter(Printer):
    def scan(self) -> None:
        print("Scanning...")

    def fax(self) -> None:
        print("Faxing...")

    def print(self) -> None:
        print("Printing...")
```

이 경우, SimplePrinter 클래스는 scan 및 fax 메서드가 필요하지 않지만, Printer 인터페이스를 구현하므로 이들을 구현해야 합니다. 이는 인터페이스 격리 원칙을 위반하는 것입니다.

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

그 대신, Printer 인터페이스를 Scanner, Fax 및 Printer 세 개의 별도의 인터페이스로 분리할 수 있습니다.

```js
from abc import ABC, abstractmethod


class Scanner(ABC):
    @abstractmethod
    def scan(self) -> None:
        ...


class Fax(ABC):
    @abstractmethod
    def fax(self) -> None:
        ...


class Printer(ABC):
    @abstractmethod
    def print(self) -> None:
        ...


class SimplePrinter(Printer):
    def print(self) -> None:
        print("Printing...")


class AdvancedPrinter(Scanner, Fax, Printer):
    def scan(self) -> None:
        print("Scanning...")

    def fax(self) -> None:
        print("Faxing...")

    def print(self) -> None:
        print("Printing...")
```

이제 SimplePrinter 클래스는 Printer 인터페이스만 구현하면 되고, AdvancedPrinter 클래스는 세 인터페이스를 모두 구현할 수 있습니다.

이 방식을 통해 코드를 이해하기 쉽게 만들고 SimplePrinter 클래스에 불필요한 메서드가 필요 없어졌습니다.

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

## 5. 의존성 역전 원칙

언클 밥이 만든 의존성 역전 원칙은 다음과 같습니다:

이 원칙은 고수준 모듈과 저수준 모듈을 결합을 느슨하게 하기 위해 그들 사이에 추상화 계층을 도입하는 것에 관한 것입니다. 이를 통해 결합이 적고 유연한 시스템을 만들 수 있습니다.

다음은 의존성 역전 원칙을 위반하는 예시입니다. 고수준 모듈인 PaymentService가 저수준 모듈인 PaypalProcessor에 직접 의존하는 것입니다:

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
class PaypalProcessor:
    def process_payment(self, amount):
        print(f"Processing payment of ${amount} via PayPal")


class PaymentService:
    def __init__(self) -> None:
        self.payment_processor = PaypalProcessor()

    def perform_payment(self, amount):
        self.payment_processor.process_payment(amount)


payment_service = PaymentService()
payment_service.perform_payment(100)
```

만약 다른 결제 게이트웨이로 전환하고 싶다면, PaymentService 클래스를 수정해야 하는데 이는 개방-폐쇄 원칙을 위배합니다.

대신, 우리가 결제를 처리하는 PaymentService 고수준 모듈과 PayPal, Stripe와 같은 다른 결제 게이트웨이와 상호 작용할 수 있는 추상 인터페이스인 PaymentProcessor가 있는 것으로 가정해 봅시다.

```python
from abc import ABC, abstractmethod


class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass


class PayPalPaymentProcessor(PaymentProcessor):
    def process_payment(self, amount):
        print(f"Processing payment of ${amount} via PayPal")


class StripePaymentProcessor(PaymentProcessor):
    def process_payment(self, amount):
        print(f"Processing payment of ${amount} via Stripe")


class PaymentService:
    def __init__(self, payment_processor):
        self.payment_processor = payment_processor

    def perform_payment(self, amount):
        self.payment_processor.process_payment(amount)


paypal_processor = PayPalPaymentProcessor()
payment_service = PaymentService(paypal_processor)
payment_service.perform_payment(100)
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

이렇게하면 PaymentService 클래스는 특정 결제 프로세서 구현에 의존하지 않습니다. 대신 PaymentProcessor 인터페이스에 의존하고 있어서 PaymentService 클래스를 수정하지 않고도 다양한 결제 프로세서 간에 전환할 수 있습니다.

# 결론

SOLID 원칙은 깨끗하고 유지보수 가능하며 유연한 코드를 작성하는 데 도움이 되는 일련의 지침입니다. 이러한 원칙을 따르면 이해하기 쉬우며 테스트하고 유지하기 쉬운 코드를 만들 수 있습니다. 이러한 원칙에 적응하는 데는 시간이 걸릴 수 있지만, 확실히 더 나은 프로그래머가 되고 더 나은 소프트웨어를 만들 수 있도록 도와줄 것입니다. 이들은 가이드라인이며 절대적인 규칙이 아니므로 현명하게 사용하고 특정 요구사항에 맞게 적용하십시오.
