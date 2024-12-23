---
title: "V8 엔진 시리즈 I 아키텍처"
description: ""
coverImage: "/assets/img/2024-06-20-TheV8EngineSeriesIArchitecture_0.png"
date: 2024-06-20 04:04
ogImage:
  url: /assets/img/2024-06-20-TheV8EngineSeriesIArchitecture_0.png
tag: Tech
originalTitle: "The V8 Engine Series I: Architecture"
link: "https://medium.com/@braineanear/the-v8-engine-series-i-architecture-ba08a38c54fa"
isUpdated: true
---

![V8 Engine Series Architecture](/assets/img/2024-06-20-TheV8EngineSeriesIArchitecture_0.png)

# 소개

V8은 현대 웹 브라우저에서 JavaScript와 WebAssembly을 실행하기 위해 Google에서 개발한 오픈 소스 고성능 엔진입니다. 현대 웹에서는 Google Chrome과 Node.js에서 사용되며, 클라이언트 및 서버 측에서 JavaScript가 빠르게 실행되도록 보장합니다. C++로 작성되어 있으며, 코드 실행 속도를 현저히 향상시킵니다. 최신 및 고급 Just-In-Time (JIT) 컴파일 기술의 도움을 받아 JavaScript 코드를 컴파일하여 빠른 시작과 높은 실행 속도를 결합하는 방법을 제공합니다. 이 논문에서는 V8 아키텍처와 운영 측면을 설명하여 추가로 이해할 수 있도록 합니다.

이 시리즈에서는 V8 엔진의 내부 아키텍처를 탐구하며, 개요부터 시작하여 각 구성 요소를 자세히 살펴보고 기술적 세부 사항을 설명할 것입니다. 시리즈가 끝나면 V8 엔진을 사용하여 Node.js와 유사한 것을 간소화된 버전으로 만들 것입니다. V8를 통해 정보를 얻고 실용적인 여정을 계속 따라와 주세요!

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

# V8 아키텍처의 주요 구성 요소

## 1. 파서

V8 아키텍처의 첫 번째 구성 요소는 파서입니다. 이는 JavaScript 소스 코드를 가져와서 추상 구문 트리(Abstract Syntax Tree, AST)로 변환합니다. 이 트리는 코드의 구조에 따라 계층적으로 표현되며, V8에서 코드를 쉽게 조작하고 최적화할 수 있도록 합니다.

## 2. 이그니션 인터프리터

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

이그니션은 V8 내부의 낮은 수준에서 작동하는 가벼운 인터프리터입니다. 이는 AST를 바이트코드로 컴파일하여 자바스크립트 소스 코드의 고효율 표현으로 작용합니다. 이것은 고수준 자바스크립트와 저수준 머신 코드 사이의 다리 역할을하며 보다 효율적으로 실행됩니다.

## 3. TurboFan 컴파일러

TurboFan은 V8의 최적화 컴파일러입니다. 이는 Ignition에서 생성된 바이트 코드를 고도로 최적화 된 머신 코드로 컴파일합니다. 따라서 TurboFan은 런타임 피드백을 기반으로 여러 최적화를 수행하여 더 높은 성능을 제공하기 위해 함수 인라인화 및 죽은 코드 제거 등의 최적화를 더 고급 수준에서 수행합니다.

# 자세한 V8 아키텍처

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

## 1. 파싱

자바스크립트 코드를 실행하기 전에 V8 파서가 동작합니다. 파싱은 소스 코드를 추상 구문 트리 (AST) 구조로 변환하는 과정으로, 소스 코드의 구문을 유지합니다.

![이미지](/assets/img/2024-06-20-TheV8EngineSeriesIArchitecture_1.png)

이는 사람이 읽을 수 있는 코드를 엔진이 올바르고 효과적으로 사용할 수 있도록 만들기 때문입니다. V8는 JavaScript를 해석하지 않습니다. V8와 같은 엔진에서 제대로 실행되려면 이 형태여야 합니다.

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

AST는 여러 이유로 필수입니다:

- 코드 이해: 소스 코드의 구조화된 트리 형태 표현은 V8가 코드를 더 쉽게 이해하고 조작할 수 있도록 돕습니다.
- 최적화: V8의 이 측면은 상수 폴딩, 죽은 코드 제거, 또는 함수 인라인 등의 다양한 최적화 기술을 적용하여 더 나은 성능을 지원합니다.
- 도구 및 분석: JavaScript 코드를 분석하고 변환하여 개발 도구가 효율적이고 유지보수 가능한 코드를 작성할 수 있도록 돕습니다.

다음 JavaScript 코드를 참고하십시오:

```js
const chk = "have it";
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

이 코드는 다음과 같이 시각적으로 AST로 구문 분석됩니다:

![image](/assets/img/2024-06-20-TheV8EngineSeriesIArchitecture_2.png)

## 2. 바이트 코드 생성 (Ignition)

![image](/assets/img/2024-06-20-TheV8EngineSeriesIArchitecture_3.png)

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

AST가 형성되면 Ignition은 이를 바이트코드로 컴파일합니다. 바이트코드는 원래의 JavaScript 소스보다 더 빠르게 실행되는 중간 코드 표현입니다. Ignition은 이 바이트코드를 계속 실행하여 V8의 최적화 컴파일러 TurboFan 내에서 효과적인 최적화를 위해 필요한 런타임 정보를 수집할 수 있게 합니다.

Ignition은 V8와 JavaScript 함수를 짧고 매우 최적화된 바이트코드로 컴파일합니다. 이 바이트코드는 동등한 기본 기계 코드의 크기의 50~25% 사이입니다. 그런 다음 이 바이트코드는 고성능 인터프리터에 의해 실행되어 실제 웹사이트에서 V8의 기본 컴파일러가 생성한 코드에 근접한 실행 속도를 제공합니다.

AST를 바이트코드로 변환하는 과정은 다음과 같습니다:

- Traversal: Ignition은 AST를 통과하며 각 노드를 방문하여 해당하는 바이트코드 명령을 생성합니다.
- 명령어 집합: 바이트코드는 V8에서 실행을 위해 최적화된 명령어 집합으로 구성됩니다.
- 효율성: 바이트코드는 더 작고 더 효율적이므로 고수준 JavaScript 코드를 실행하는 것보다 더 빠르게 실행됩니다.

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

바이트코드 생성 후에 Ignition이 실행을 시작합니다. 이는 몇 가지 이유로 매우 중요한 실행 단계입니다:

- 런타임 정보: Ignition은 바이트코드를 실행하는 동안 자주 호출되는 함수나 자주 액세스되는 속성 등의 런타임 정보를 수집합니다. 이 정보는 더 많은 최적화를 수행하는 데 매우 중요합니다.
- 빠른 시작: Ignition은 원래 JavaScript 대신 바이트코드를 실행하므로 시작 속도가 더 빨라집니다. 빠른 시작은 사용자에게 즉시 반응해야 하는 앱에 대해 굉장히 중요합니다, 특히 브라우저나 서버 공간에서.

바이트코드가 생성된 후 인라인 최적화를 거칩니다. 이러한 최적화는 코드의 바이트 스트림에서 단순 분석을 수행하며 일반적인 패턴을 더 빠른 시퀀스로 대체하고 중복된 작업을 제거하며 불필요한 레지스터로드 및 전송을 최소화합니다. 이러한 최적화는 바이트 코드의 크기를 줄이고 성능을 향상시킵니다. Ignition이 바이트코드를 실행하는 동안 캡처된 모든 정보는 최적화 단계에서 매우 중요합니다. 이에는 가장 자주 호출되는 함수, 반복적으로 액세스되는 속성, 그리고 서로 다른 객체가 사용되는 방식 등이 포함됩니다.

## 3. 최적화 (TurboFan)

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

```html
<img src="/assets/img/2024-06-20-TheV8EngineSeriesIArchitecture_4.png" />
```

TurboFan는 JavaScript를 더 효율적으로 최적화된 기계 코드로 생성하기 위해 설계되었습니다. 이는 오래된 CrankShaft JIT 컴파일러를 대체하고 훨씬 더 복잡한 최적화를 제공합니다. TurboFan을 위한 두 가지 중요한 혁신은 중간 표현(IR) 사용과 다중 계층 최적화 파이프라인을 이용하는 것입니다.

## TurboFan 작동 방식

## 1. JavaScript에서 IR(Intermediate Representation)로

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

JavaScript 코드가 실행되면 먼저 AST가 파생됩니다. 그런 다음 TurboFan은 이 AST를 더 유연한 IR 구조로 변환하는데, 이를 "노드의 바다"라고 합니다. 이는 그래프 기반 IR이며, 따라서 TurboFan에서는 연산 간 복잡한 관계를 표현함으로써 많은 최적화를 수행할 수 있습니다.

## 2. 최적화

TurboFan 컴파일러는 IR에 여러 고급 최적화를 적용합니다:

- 숫자 범위 분석: 이것은 TurboFan이 숫자 연산을 올바르게 이해하고, 불필요한 체크를 줄여 더 효율적으로 만듭니다.
- 제어 흐름 최적화: 코드를 재배치하고 불필요한 명령을 제거하여, 루프 밖에서 자주 실행되지 않는 경로로 코드를 이동합니다.
- 인라인 캐싱: 첫 번째 참조 후 객체 유형 및 속성을 캐싱하여 속성 액세스 속도를 높이며, 반복 액세스 시 유형 검사 및 찾아보기를 우회합니다.
- 숨겨진 클래스: 숨겨진 클래스를 제공하여 객체의 속성 액세스를 매우 효율적으로 만들며, 속성이 추가될 때 객체를 변환합니다. 메모리 레이아웃을 예측하고 예측을 바탕으로 최적화된 코드를 생성합니다.

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

## 3. IR(Intermediate Representation)에서 머신 코드로

TurboFan은 최적화된 IR을 가져와 머신 코드를 생성합니다. 이것은 CPU가 직접 실행하는 저수준 코드입니다. x86, ARM 및 MIPS와 같은 여러 하드웨어 아키텍처에서 효율적으로 실행되도록 코드를 만들기 위해 여러 컴파일 단계가 필요합니다.

TurboFan의 컴파일은 다음 단계로 진행됩니다:

- 명령 선택: TurboFan은 IR의 고수준 작업을 특정 머신 명령에 매핑합니다. 이 단계에서 생성된 코드가 대상 아키텍처의 명령 집합을 활용하도록 보장합니다.
- 레지스터 할당: TurboFan은 변수에 대한 CPU 레지스터를 할당하여 메모리 접근을 최소화하고 그 과정에서 실행 시간을 가속화합니다. 사용 패턴 및 가용성에 따라 변수 저장을 위한 최상의 레지스터를 선택합니다.
- 코드 생성: 이것이 이전 단계에서의 모든 최적화 및 적응을 포함한 결과 머신 코드일 것입니다. 따라서 이것이 CPU가 실행하는 실제 머신 코드입니다.

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

런타임 시, V8은 자바스크립트 코드 동작을 모니터링하여 자주 호출되는 함수 및 자주 액세스되는 속성에 대한 데이터를 수집합니다. 이 런타임 프로파일링을 통해 TurboFan은 최적화된 핫 코드 경로를 결정하고 가능한 한 효율적인 기계 코드로 변환합니다.

함수 인라인화는 TurboFan에 의해 수행되는 강력한 최적화입니다. 자주 호출되는 함수일 경우 TurboFan은 해당 함수를 인라인으로 바꾸어 함수 호출을 실제 함수 본문으로 대체함으로써 호출 오버헤드를 제거하고 성능을 향상시킬 수 있습니다.

또한 TurboFan은 런타임 프로파일링을 사용하여 실행되지 않은 코드를 제거함으로써 죽은 코드를 제거합니다. 이러한 코드를 제거함으로써 TurboFan은 생성된 기계 코드의 크기를 줄이고 실행 속도를 향상시킵니다.

## TurboFan의 중요성

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

- 성능: TurboFan의 정교한 최적화로 JavaScript 코드가 더 빠르게 실행됩니다. 이는 웹 응용 프로그램에서 응답성이 중요한 경우와 효율성이 확장성과 비용에 중요한 영향을 미치는 서버 측 응용 프로그램에서 모두 중요합니다.
- 최신 JavaScript 기능 지원: TurboFan은 모든 최신 JavaScript 기능 (ES6 이상)을 지원하도록 설계되었습니다. 유연한 설계로 새로운 언어 기능을 추가할 때 많은 아키텍처별 코드를 다시 작성할 필요가 없습니다.
- 유지 관리성: TurboFan의 계층화된 아키텍처는 고수준 및 저수준 최적화를 분리함으로써 컴파일러의 설계를 간단하게 하고 유지 관리 및 확장을 용이하게 합니다.

## TurboFan의 계층화된 아키텍처

컴파일러는 새로운 기능을 지원하고 최적화를 추가하며 다른 아키텍처를 대상으로 할수록 복잡해집니다. TurboFan의 계층화된 아키텍처는 JavaScript(소스 레벨 언어), VM 기능(V8), 아키텍처 세부 사항(예: x86, ARM, MIPS) 사이에 명확한 분리를 만들어 이러한 요구 사항을 효과적으로 해결합니다.

이러한 분리로 인해 최적화 및 기능 구현 시 엔지니어가 지역적으로 사고할 수 있어 더 견고하고 유지 보수가 쉬운 코드를 작성할 수 있습니다. 계층화된 접근 방식은 플랫폼별 코드가 필요한 양을 줄입니다. TurboFan이 지원하는 일곱 가지 대상 아키텍처 각각은 CrankShaft의 13,000-16,000 줄에 비해 3,000 줄 미만의 플랫폼별 코드를 필요로 합니다. 이 간소화된 설계는 ARM, Intel, MIPS, IBM 등의 엔지니어가 더 효과적으로 기여할 수 있도록 했습니다.

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

TurboFan은 CrankShaft보다 더 강력한 최적화를 구현하는 여러 가지 고급 기술을 통해 성능을 향상시킵니다. JavaScript는 최적화되지 않은 형태로 컴파일러 파이프라인에 들어가며 점진적으로 번역되어 낮은 형태로 최적화됩니다. TurboFan의 핵심은 코드의 조합을 더 효과적으로 재정렬하고 최적화할 수 있는 내부 표현(IR)인 '노드 바다'입니다.

- 수치 범위 분석: 이 기능을 통해 TurboFan은 숫자 연산 코드를 더 잘 이해하여 보다 정확한 최적화를 수행할 수 있습니다.
- 그래프 기반 IR: 대부분의 최적화는 간단한 지역적 축소로 표현되어 코드 작성 및 독립적 테스트가 더 쉬워집니다. 최적화 엔진은 이러한 지역 규칙을 체계적으로 적용합니다.
- 혁신적인 스케줄링 알고리즘: 이 알고리즘은 코드를 루프에서 이탈하여 덜 자주 실행되는 경로로 이동할 수 있는 재정렬 자유도를 활용합니다.
- 아키텍처별 최적화: 각 대상 플랫폼의 기능을 활용한 복잡한 명령 선택은 최상의 품질 코드를 생성합니다.

## 현대 JavaScript 기능 지원

TurboFan은 ES5에서 사용 가능한 모든 JavaScript 기능을 최적화하기 위해 설계되었으며 ES2015 및 이후 계획된 기능을 수용합니다. 계층별 컴파일러 설계는 고수준 및 저수준 컴파일러 최적화 사이에 깔끔한 분리를 제공하여 새로운 언어 기능을 추가할 때 아키텍처별 코드를 변경하지 않고 간단화합니다. TurboFan은 명시적 명령 선택 컴파일 단계를 도입하여 아키텍처별 코드가 더 필요하지 않도록 하며 컴파일러를 모든 지원되는 아키텍처에서 유지 관리 및 확장 가능하도록 만듭니다.

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

이러한 개념을 이해한다면, 개발자는 현대 JavaScript 엔진의 복잡성을 인지하고 V8의 기능을 완전히 활용하는 코드를 작성할 수 있습니다. TurboFan의 혁신과 최적화는 V8 엔진의 필수 구성 요소로, 오늘날과 미래의 JavaScript 애플리케이션의 성능과 효율성을 촉진합니다.

## 상세한 디옵티마이제이션

디옵티마이제이션은 V8 엔진의 중요한 기능으로, 초기 가정이 변경되더라도 코드 실행이 올바른 상태로 유지되도록 보장합니다. 이것은 다음과 같은 과정을 포함합니다:

- 모니터링: V8는 최적화된 머신 코드의 실행을 지속적으로 모니터링합니다.
- 디옵티마이제이션 트리거: 런타임 환경이 변경되면(새로운 객체 유형을 만나거나 예상치 못한 실행 경로를 만나면), V8는 디옵티마이제이션의 필요성을 인식합니다.
- 바이트코드로 되돌리기: V8는 그런 다음 Ignition에 의해 생성된 일반 바이트코드로 실행을 되돌립니다. 이는 안전하며 무효화된 가정에 기반하지 않습니다.
- 재최적화: 되돌린 후에 새로운 패턴이 나타난 경우, V8는 코드를 다시 최적화할 수 있으며, 필요에 따라 최적화와 디옵티마이제이션의 사이클을 계속합니다.

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

## V8 프로세스 흐름

![V8 엔진 시리즈I 아키텍처](/assets/img/2024-06-20-TheV8EngineSeriesIArchitecture_5.png)

- 코드 로딩: 엔진은 JavaScript 또는 WebAssembly 코드를 로드하여 시작합니다.
- 구문 분석: 구문 분석기가 소스 코드를 AST로 변환합니다.
- AST 변환: AST가 처리되고 Ignition에 전달됩니다.
- 바이트코드 생성: Ignition이 AST를 바이트코드로 컴파일합니다.
- 초기 실행: Ignition이 바이트코드를 실행하여 빠른 시작과 실행 시간 정보 수집을 보장합니다.
- 런타임 피드백: 자주 사용되는 코드 경로 및 기타 런타임 데이터에 대한 정보가 수집됩니다.
- 피드백 레이어: 런타임 피드백을 분석하여 최적화 기회를 결정합니다.
- 최적화: TurboFan은 피드백 레이어의 정보를 사용하여 바이트코드를 머신 코드로 최적화합니다.
- 실행: 최적화된 머신 코드가 실행되어 효율적이고 빠른 성능을 제공합니다.
- 비최적화: 런타임 조건이 변경되어 최적화된 코드가 무효화되면 V8은 올바른 상태를 유지하기 위해 보다 최적화되지 않은 버전으로 되돌아갑니다.

요약하면, V8 엔진의 아키텍처는 오늘날의 웹 애플리케이션에 중요한 빠른 시작과 고속 실행이 결합된 것을 보여줍니다. V8의 구성 요소와 상호 작용을 이해하면 엔진의 기능에 대한 소중한 통찰력을 제공받아 효율적이고 고성능의 JavaScript 코드를 작성하며 이 정교한 엔진의 가능성을 최대한 활용할 수 있습니다.

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

이 기사를 읽어 주셔서 감사합니다. 유익하고 흥미로운 내용이었기를 바랍니다. 이 시리즈에서 더 많은 내용이 기대되니 기대해 주세요.

![image](/assets/img/2024-06-20-TheV8EngineSeriesIArchitecture_6.png)

질문이나 의견이 있으시면 언제든지 말씀해 주세요! 도와드리기 위해 언제나 준비되어 있으며 여러분의 생각을 듣고 싶습니다. 😊
