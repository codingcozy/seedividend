---
title: "TypeScript에서 함수형 프로그래밍 금융 데이터 흐름 적용 방법"
description: ""
coverImage: "/assets/img/2024-06-23-FunctionalProgramminginTypeScriptAFinancialDataFlow_0.png"
date: 2024-06-23 13:56
ogImage:
  url: /assets/img/2024-06-23-FunctionalProgramminginTypeScriptAFinancialDataFlow_0.png
tag: Tech
originalTitle: "Functional Programming in TypeScript: A Financial Data Flow"
link: "https://medium.com/@rasool.rahmanzade/functional-programming-in-typescript-a-financial-data-flow-033e0ede3b93"
isUpdated: true
---

![Functional Programming in TypeScript](/assets/img/2024-06-23-FunctionalProgramminginTypeScriptAFinancialDataFlow_0.png)

함수형 프로그래밍 (FP)은 코드 품질, 유지 보수성, 효율성을 크게 향상시킬 수 있습니다. 특히 데이터 조작이 높은 복잡한 도메인에서는 더 그렇습니다. TypeScript의 경우, 강력한 유형 시스템을 통해 고급 FP 기술을 처리할 수 있어 데이터의 모델링과 처리를 정확하고 효율적으로 수행할 수 있습니다. 금융 응용 프로그램을 예로 들어 주요 FP 개념을 살펴보겠습니다.

# 주요 함수형 프로그래밍 원칙

- 순수 함수: 동일한 입력에 대해 동일한 출력을 생성하며 부작용이 없는 함수입니다. 순수 함수는 동일한 입력을 사용하면 일관성있게 동일한 출력을 반환하며 범위 외부의 상태를 변경하지 않고 가변 상태에 의존하지 않습니다. 이러한 예측 가능성으로 순수 함수는 테스트 가능하고 신뢰할 수 있으며 프로그램 동작에 대한 추론을 용이하게 하고 디버깅을 단순화합니다.
- 불변성: 데이터 구조를 변경하지 않고 새로운 구조를 생성해야 합니다. 데이터 구조의 불변성은 한 번 생성된 데이터 구조를 변경할 수 없음을 보장합니다. 기존 구조를 수정하는 대신 새 구조를 만듭니다. 불변성은 상태 관련 문제를 피하면서 동시성을 향상시킵니다.
- 일급 및 고차 함수: 함수를 인수로 전달하거나 다른 함수로부터 반환하고 변수에 할당할 수 있습니다. 이 기능은 모듈화와 코드 재사용을 도와주며 더 추상적이고 유연한 코드를 만들 수 있습니다. 고차 함수를 사용하여 개발자는 표현적인 방식으로 복잡한 작업을 수행하여 더 깨끗하고 유지보수가 쉬운 코드베이스를 만들 수 있습니다.
- 함수 합성: 더 간단한 함수들을 결합하여 복잡한 함수를 구축합니다. 이 기술을 사용하면 기본 작업을 연결하여 복잡한 기능을 만들 수 있으며 고수준의 추상화를 유지할 수 있습니다. 함수 합성은 코드 재사용과 명확성을 촉진하며 각 함수를 단독으로 테스트하고 이해하고부터 큰 워크플로에 통합되기 전까지 더 자세히 이해할 수 있습니다.
- 선언적 코드: 제어 흐름을 명시적으로 설명하지 않고 로직을 표현합니다. 선언적 코드는 계산 논리를 세세하게 설명하지 않고 제어 흐름을 자세히 설명하지 않습니다. 명령형 프로그래밍과 달리 목표를 달성하기 위한 명시적 단계를 지정하는 대신 선언적 프로그래밍은 프로그램이 달성해야 하는 것을 기술합니다.

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

# 함수형 프로그래밍을 위한 TypeScript 기능들

- 정적 타입 및 타입 추론: 컴파일 시에 정확성을 보장하고 오류를 감지합니다.
- 제너릭: 유연하고 재사용 가능한 데이터 구조와 함수를 생성할 수 있습니다.
- 합집합 및 교집합 타입: 정확한 타입 정의를 가능하게 하며 복잡한 데이터를 조합할 수 있습니다.
- 맵핑 타입 및 조건부 타입: 데이터 변환 및 타입 조작에 강력한 도구를 제공합니다.

# 모델링에서의 대수형 데이터 타입 (ADTs)

ADTs는 복잡한 데이터 구조를 효과적으로 표현하며 각각의 독특한 특성과 행위를 포착할 수 있습니다.

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

```js
type Currency = "EUR" | "USD";

interface Cash {
  type: "cash";
  amount: number;
  currency: Currency;
}

interface Stock {
  type: "stock";
  ticker: string;
  quantity: number;
}

interface Credit {
  type: "credit";
  isin: string;
  maturity: Date;
  faceValue: number;
  interestRate: number;
}

type Element = Cash | Stock | Bond;

const calculateValue = (instrument: Element, exchangeRates: Record<Currency, number>): number => {
  switch (instrument.type) {
    case "cash":
      return instrument.amount * exchangeRates[instrument.currency];
    case "stock":
      // Some complex value calcuation
      return instrument.quantity * 100;
    case "credit":
      // Some complex value calcuation
      return instrument.faceValue * (1 + instrument.interestRate / 100);
    default:
      throw new Error("Unknown financial instrument");
  }
};
```

## 재미있는터와 모나드를 활용한 금융 계산

재미있는터와 모나드(부작용 핸들러)는 금융 데이터를 처리하고 선택적 값, 오류 및 비동기 작업을 다루는 계산을 관리합니다.

```js
type Option<T> = None | Some<T>;

class None {
    readonly tag = 'None';
}

class Some<T> {
    readonly tag = 'Some';
    constructor(public value: T) {}
}

const none = new None();
const some = <T>(value: T): Option<T> => new Some(value);

const mapOption = <T, U>(opt: Option<T>, fn: (value: T) => U): Option<U> =>
    opt instanceof Some ? some(fn(opt.value)) : none;

const flatMapOption = <T, U>(opt: Option<T>, fn: (value: T) => Option<U>): Option<U> =>
    opt instanceof Some ? fn(opt.value) : none;

const calculateInterest = (amount: number, rate: number): Option<number> =>
    rate >= 0 ? some(amount * rate) : none;

const result = flatMapOption(some(1000), amount => calculateInterest(amount, 0.05));
console.log(result);
// Should be....
// Some { tag: 'Some', value: 50 }
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

# 금융 데이터 조작을 위한 렌즈

렌즈는 데이터 구조의 일부에 초점을 맞추어 조작 가능한 데이터를 제공합니다.

```js
type Lens<S, A> = {
  get: (s: S) => A,
  set: (a: A, s: S) => S,
};

const lens = <S, A>(getter: (s: S) => A, setter: (a: A, s: S) => S): Lens<S, A> => ({
  get: getter,
  set: setter,
});

type Portfolio = {
  owner: string,
  instruments: FinancialInstrument[],
};

const instrumentsLens = lens(
  (p: Portfolio) => p.instruments,
  (instruments, p) => ({ ...p, instruments })
);

const addInstrument = (portfolio: Portfolio, instrument: FinancialInstrument): Portfolio => {
  const instruments = instrumentsLens.get(portfolio);
  return instrumentsLens.set([...instruments, instrument], portfolio);
};

const myPortfolio: Portfolio = { owner: "Rass", instruments: [] };
const updatedPortfolio = addInstrument(myPortfolio, { kind: "cash", amount: 1000, currency: "USD" });
console.log(updatedPortfolio);
// 예상 출력 결과...
// 현금 계기가 추가된 포트폴리오
```

# 실용적 예시: 금융 데이터 처리 파이프라인

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

여러 소스에서 금융 데이터를 가져 와서 처리하고 리스크 분석을 수행해야 하는 작업을 고려해 보세요.

## 금융 데이터 가져오기

```js
const fetchStockPrices = async (): Promise<Option<Record<string, number>>> => {
  return some({ AAAA: 150, BBBB: 2800 });
};

const fetchExchangeRates = async (): Promise<Option<Record<Currency, number>>> => {
  return some({ EUR: 1.2, USD: 1 });
};
```

## 데이터 처리와 결합하기

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

여러 소스에서 데이터를 결합합니다.

```js
const processFinancialData = async (): Promise<
  Option<{ stocks: Record<string, number>, rates: Record<Currency, number> }>
> => {
  const stockPrices = await fetchStockPrices();
  const exchangeRates = await fetchExchangeRates();

  return flatMapOption(stockPrices, (stocks) => mapOption(exchangeRates, (rates) => ({ stocks, rates })));
};

processFinancialData().then((data) => console.log(data));
```

## 위험 분석

결합된 데이터에 대한 위험 분석을 처리합니다.

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

```js
const analyzeRisk = (data: { stocks: Record<string, number>, rates: Record<Currency, number> }): string => {
  const totalValue = Object.values(data.stocks).reduce((acc, price) => acc + price, 0);
  return totalValue > 5000 ? "High Risk" : "Low Risk";
};

const performRiskAnalysis = async () => {
  const data = await processFinancialData();
  const riskLevel = mapOption(data, analyzeRisk);
  // The riskLevel variable here is an option holding the result.
  console.log(riskLevel);
};

performRiskAnalysis();
```

함수형 프로그래밍 개념인 ADT, 펑터, 모나드, 렌즈와 같은 것들을 사용하여 가독성이 좋고 확장 가능한 금융 애플리케이션을 만들 수 있습니다.
