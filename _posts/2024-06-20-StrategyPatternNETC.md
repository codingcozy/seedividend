---
title: "전략 패턴 NET C"
description: ""
coverImage: "/assets/img/2024-06-20-StrategyPatternNETC_0.png"
date: 2024-06-20 04:08
ogImage:
  url: /assets/img/2024-06-20-StrategyPatternNETC_0.png
tag: Tech
originalTitle: "Strategy Pattern .NET (C#)"
link: "https://medium.com/codenx/strategy-pattern-net-c-ea0d122f60c4"
isUpdated: true
---

전략(pattern) 패턴은 알고리즘의 동작을 런타임(runtime)에서 선택할 수 있게 해주는 행동 디자인 패턴입니다. 주요 아이디어는 알고리즘의 집합을 정의하고 각각을 캡슐화하여 상호 교환 가능하게 만드는 것입니다. 전략(pattern) 패턴은 알고리즘을 사용하는 클라이언트로부터 독립적으로 알고리즘을 변경할 수 있게 합니다.

## 구성 요소

- 컨텍스트(Context): Strategy 인스턴스에 대한 참조를 포함하는 클래스입니다. 이는 전략(strategy)이 작동하는 방법의 세부 정보를 이해하지 않고도 작업의 실행을 전략(strategy)의 구현에 위임합니다.
- 전략(strategy) 인터페이스: 이는 모든 구체적인 전략(strategy)들을 위한 공통 인터페이스를 정의합니다. 컨텍스트가 전략을 실행하는 데 사용하는 메서드를 선언합니다.
- 구체적인 전략(strategy): 전략(strategy) 인터페이스를 구현하는 개별 클래스입니다. 각각은 다른 알고리즘이나 작업 수행 방법을 나타냅니다.

## 원칙과 정책

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 변이의 캡슐화: 전략 패턴은 알고리즘의 변하는 부분을 유지되는 부분과 캡슐화합니다. 이는 알고리즘의 변경이 클라이언트 코드에 영향을 미치지 않는다는 것을 의미합니다.
- 인터페이스에 프로그래밍, 구현에 프로그래밍하지 말기: 클라이언트는 구현이 아닌 인터페이스를 통해 전략과 상호작용합니다. 이는 클라이언트 코드가 인터페이스를 구현하는 어떤 전략과도 작동할 수 있다는 것을 의미합니다.
- 상속보다 구성을 선호: 상속하는 대신 전략 패턴은 구성을 사용하여 책임을 전략 객체에 위임합니다. 이는 적절한 동작을 선택하는 더 많은 유연성을 제공합니다.
- 개방/폐쇄 원칙: 시스템은 확장을 위해 열려 있지만 수정에 대해 폐쇄되어야 합니다. 새로운 전략을 추가할 때 콘텍스트나 클라이언트 코드가 시스템을 사용하는 방식을 변경하지 않아도 됩니다.
- 단일 책임 원칙: 각 전략 클래스는 특정 알고리즘이나 동작을 나타내는 단일 책임이 있습니다. 이로 인해 이해하기 쉽고 구현하고 테스트하기 쉽습니다.

이러한 원칙을 따르면 전략 패턴은 다양한 알고리즘이나 동작을 처리하는 유연한 구조를 제공하여 애플리케이션의 기능적 부분을 관리, 확장 및 수정하기 쉽도록 만들어줍니다.

# 결제 처리 시스템

크레딧 카드, PayPal 또는 암호화폐와 같이 다양한 결제 전략이 필요한 결제 처리 시스템을 고려해 봅시다. 결제 전략은 종종 변경되거나 추가가 필요할 수 있어 전략 패턴에 적합한 사용 사례입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/assets/img/2024-06-20-StrategyPatternNETC_0.png" />

# 전략 패턴 없이

초기에 시스템은 신용카드 결제만 지원할 수 있으므로 직접 클래스 내에 구현할 수 있습니다.

```js
public class PaymentProcessor
{
    public void ProcessPayment(decimal amount, string method)
    {
        if (method == "CreditCard")
        {
            // 신용카드 결제 처리 로직
            Console.WriteLine($"신용카드를 통한 {amount} 처리 중");
        }
    }
}

// 사용법
var paymentProcessor = new PaymentProcessor();
paymentProcessor.ProcessPayment(100.00m, "CreditCard");
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 PayPal을 결제 방법으로 추가해야 한다고 가정해 보겠습니다. PaymentProcessor 클래스를 수정하여 다른 if-else 조건을 추가해야 할 수 있습니다.

```js
public class PaymentProcessor
{
    public void ProcessPayment(decimal amount, string method)
    {
        if (method == "CreditCard")
        {
            // 신용카드 결제 처리 로직
            Console.WriteLine($"신용카드로 {amount} 처리중");
        }
        else if (method == "PayPal")
        {
            // PayPal 결제 처리 로직
            Console.WriteLine($"PayPal로 {amount} 처리중");
        }
        // 새 결제 방법을 추가할 때마다 더 많은 if-else 문이 여기에 추가됩니다.
    }
}

// 사용 예
var paymentProcessor = new PaymentProcessor();
paymentProcessor.ProcessPayment(100.00m, "CreditCard");
paymentProcessor.ProcessPayment(75.50m, "PayPal");
```

## 이 접근 방식의 문제점

- 확장성: 새 결제 방법마다 ProcessPayment 메서드에 더 많은 if-else 조건을 추가해야 하므로, 메서드는 무한정으로 커지게 됩니다.
- 유지보수성: 시간이 흐르면서 ProcessPayment 메서드는 점점 복잡해지고 관리하기 어려워집니다.
- 개방/폐쇄 원칙 위반: 이 클래스는 수정을 열어둔 상태입니다. 새로운 결제 유형을 추가할 때마다 이 클래스를 수정해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 전략 패턴 사용하기

자, 이제 코드를 전략 패턴을 사용하도록 리팩토링해보겠습니다. 이렇게 하면 더 유연하고 유지보수하기 쉬워집니다.

## 전략 인터페이스

```js
public interface IPaymentStrategy
{
    void ProcessPayment(decimal amount);
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 구체적인 전략

```js
public class CreditCardPaymentStrategy : IPaymentStrategy
{
    public void ProcessPayment(decimal amount)
    {
        // 신용 카드 결제 처리 로직
        Console.WriteLine($"신용 카드로 {amount} 처리 중");
    }
}

public class PayPalPaymentStrategy : IPaymentStrategy
{
    public void ProcessPayment(decimal amount)
    {
        // PayPal 결제 처리 로직
        Console.WriteLine($"PayPal로 {amount} 처리 중");
    }
}
```

## 컨텍스트 클래스

```js
public class PaymentProcessor
{
    private IPaymentStrategy _paymentStrategy;

    public PaymentProcessor(IPaymentStrategy paymentStrategy)
    {
        _paymentStrategy = paymentStrategy;
    }

    public void SetPaymentStrategy(IPaymentStrategy paymentStrategy)
    {
        _paymentStrategy = paymentStrategy;
    }

    public void ProcessPayment(decimal amount)
    {
        _paymentStrategy.ProcessPayment(amount);
    }
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 사용법

```js
var creditCardPayment = new PaymentProcessor(new CreditCardPaymentStrategy());
creditCardPayment.ProcessPayment(100.0m);
// 출력: 신용 카드로 100.00 처리 중

var payPalPayment = new PaymentProcessor(new PayPalPaymentStrategy());
payPalPayment.ProcessPayment(75.5m);
// 출력: PayPal로 75.50 처리 중
```

전략 패턴의 맥락에서 새 결제 방법을 추가하는 것은 간단한 프로세스이며 기존 코드를 변경할 필요가 없기 때문에 이 패턴의 주요 이점 중 하나입니다.

기존 시스템에 새로운 암호화폐 결제 전략을 추가하는 방법을 살펴보고 이 접근 방식이 기능 확장을 어떻게 단순화하는지 비교해봅시다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 암호화폐 결제 전략 추가하기

IPaymentStrategy 인터페이스를 구현하는 클래스를 생성하여 새로운 구체적인 전략을 정의하세요.

```js
public class CryptoPaymentStrategy : IPaymentStrategy
{
    public void ProcessPayment(decimal amount)
    {
        Console.WriteLine($"암호화폐를 통한 {amount} 처리 중");
        // 실제 암호화폐 처리 로직
    }
}
```

새 전략을 사용하는 방법은 새 CryptoPaymentStrategy로 PaymentProcessor를 인스턴스화하는 것만으로 간단합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```javascript
var cryptoPayment = new PaymentProcessor(new CryptoPaymentStrategy());
cryptoPayment.ProcessPayment(50.0m);
// 출력: 50.00을(를) 암호화폐를 통해 처리 중
```

전략 패턴의 맥락에서 새로운 지불 전략을 추가함으로써, 해당 패턴이 변경과 확장을 효율적으로 다루는 능력을 보여줍니다. 이를 통해 새로운 기능을 기존 코드베이스에 영향을 주지 않고 매끄럽게 추가할 수 있어서 버그 도입 위험을 크게 줄이고 시스템을 더 관리 가능하고 확장 가능하게 만들 수 있습니다.

## 전략 패턴 사용의 장점

- 확장 용이성: IPaymentStrategy 인터페이스를 구현하는 새 클래스를 만들기만 하면 됩니다. 기존 코드를 수정할 필요가 없습니다.
- 개방/폐쇄 원칙 준수: 시스템은 확장을 위해 열려 있지만 수정은 닫혀 있습니다. 기존 클래스를 변경하지 않고 새로운 지불 전략을 추가할 수 있습니다.
- 간결함과 유지보수성: PaymentProcessor 클래스는 간단한 상태를 유지하며 새 지불 방법이 추가될수록 복잡성이 증가하지 않습니다. 각 지불 방법은 자체 클래스에 캡슐화되어 있어 시스템을 이해하고 유지하기 쉬워집니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 정보가 유용했길 바랍니다. 🌟 즐거우면서도 풍부한 학습 여정을 희망합니다!

📚 이와 같은 통찰력을 더 원하신다면, 자유롭게 👉 Merwan Chinta를 팔로우해 주세요.
