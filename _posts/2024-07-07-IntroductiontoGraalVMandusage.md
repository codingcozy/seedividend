---
title: "GraalVM 소개와 사용 방법 모던 자바 가상 머신의 이해 및 활용법"
description: ""
coverImage: "/assets/img/2024-07-07-IntroductiontoGraalVMandusage_0.png"
date: 2024-07-07 19:28
ogImage:
  url: /assets/img/2024-07-07-IntroductiontoGraalVMandusage_0.png
tag: Tech
originalTitle: "Introduction to GraalVM, and usage"
link: "https://medium.com/@alxkm/introduction-to-graalvm-and-usage-105f30a30de3"
isUpdated: true
---

GraalVM 탐험: 그 능력을 활용하는 안내서 및 실용적인 가이드

![GraalVM 소개 및 사용법](/assets/img/2024-07-07-IntroductiontoGraalVMandusage_0.png)

본 안내서에서는 GraalVM이 무엇인지, 어떻게 작동하는지, 그리고 Just-In-Time (JIT) 컴파일과 Ahead-Of-Time (AOT) 컴파일 간의 차이를 살펴볼 것입니다. 이에 관심이 있다면, 이 안내서가 여러분에게 도움이 될 것입니다.

GraalVM은 자바 및 기타 언어로 작성된 애플리케이션에 대한 상당한 이점을 제공하는 고성능 런타임입니다. Oracle에 의해 개발되었으며, 고급 최적화 및 독특한 아키텍처를 활용하여 애플리케이션을 더 빠르고 효율적으로 실행할 수 있습니다.

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

그라얄VM의 역사

개발 발원지:

- 그라얄VM 프로젝트는 2011년 오라클 연구소에서 시작되었으며 자바 컴파일러 최적화 연구의 일환으로 개발되었습니다.
- 목표는 기존 HotSpot C2 컴파일러를 대체할 수 있는 새로운 고성능 JIT 컴파일러인 Graal 컴파일러를 만드는 것이었습니다.

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

- 2012-2013년: 초기 개발은 중요한 성능 향상을 보여줄 수 있는 연구용 컴파일러를 만드는 데 초점을 맞추었습니다.
- 2014년: Graal 컴파일러의 첫 번째 공개 릴리즈로, 주로 JVM 성능 향상에 관심 있는 연구자와 초기 채용자를 대상으로 합니다.
- 2017년: 여러 언어의 코드를 실행할 수 있는 Truffle 프레임워크를 소개하여, JVM 상에서 언어 인터프리터를 효율적으로 구현할 수 있도록 합니다.
- 2018년: 여러 언어 지원과 네이티브 이미지 기능을 포함한 GraalVM 1.0의 공식 릴리즈로, GraalVM이 궁극적으로 사용할 수 있는 대중적인 도구로 등장한 중요한 이정표입니다.
- 2019-2020년: 성능, 언어 지원, 개발자 도구를 지속적으로 향상시키며, 성능 이점과 Polyglot 능력으로 인해 더 많은 기업이 채택함에 따라 GraalVM이 산업에서 주목받기 시작합니다.
- 2021년-현재: 더 많은 언어와 프레임워크 지원을 확대하기 위한 최적화 및 안정성 개선 작업 수행 중입니다. GraalVM 주변 커뮤니티가 성장하며, 클라우드 컴퓨팅, 마이크로서비스, 기업 애플리케이션과 같은 여러 분야에서의 적용과 생태계에 기여하고 있습니다.

## 다중 언어 가상 머신으로서의 GraalVM

GraalVM은 다중 프로그래밍 언어로 작성된 응용 프로그램을 실행할 수 있는 다중 언어 가상 머신입니다. 일반적으로 GraalVM과 관련된 모든 안내가 그럴듯한 사실들의 번역으로 쉽게 구성될 것입니다. 아마도 이럴 것입니다:

- GraalVM은 Oracle이 지원하는 Java (바이트) 코드를 실행할 수 있는 JAVA 가상 머신 (JVM)이며, Kotlin, Scala, Groovy와 같은 JVM 기반 언어 (like Kotlin, Scala, Groovy)를 실행할 수 있습니다.
- Truffle 프레임워크를 통해 GraalVM은 Java뿐만 아니라 JS, Python, Ruby, R, 그리고 기억하기 어려운 C, C++, Rust 등 LLVM 기반 언어를 실행할 수 있습니다.
- GraalVM은 Ahead-of-Time (AOT)로 생성된 네이티브 이미지(Native Image)를 지원합니다.
- Graal 컴파일러는 Just-In-Time (JIT) 컴파일러입니다.

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

## GraalVM은 다음과 같은 주요 기능을 제공합니다

- 고성능 JIT 컴파일러: GraalVM에는 Just-In-Time (JIT) 컴파일러가 포함되어 있어 Java 애플리케이션의 성능을 향상시킵니다. 이 컴파일러는 바이트코드를 최적화된 기계 코드로 동적으로 컴파일하여 런타임에 성능을 향상시킵니다.
- 네이티브 이미지: 이 기능은 Java 애플리케이션을 네이티브 실행 파일로 미리 컴파일할 수 있게 해줍니다. 기존 JVM 기반 애플리케이션보다 더 빠르게 시작되고 적은 메모리를 사용합니다.
- 다양한 언어 지원: GraalVM은 다른 프로그래밍 언어 간의 원활한 상호 운용성을 제공하여 개발자가 단일 애플리케이션 내에서 각 언어의 최상의 기능을 활용할 수 있게 합니다.
- 도구 지원: GraalVM은 다양한 개발 도구와 프레임워크와 통합되어 디버깅, 모니터링 및 프로파일링 기능을 향상시킵니다.

그러므로 GraalVM을 사용하면 가장 좋은 도구일 것입니다. 모든 Java 애플리케이션에 대해 왜 어디서나 사용하지 않을까요? 그러므로 이를 조사해보겠습니다.

# Javac

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

우선 이 질문에 대한 답변을 하기 위해서는 우선 javac JIT 컴파일을 알아보고 그 강력한 면을 이해해야 합니다.

기본 Java 컴파일러 인 javac은 Java 소스 코드 (.java 파일)를 Java 바이트 코드로 변환하여 클래스 파일 (.class 파일)을 생성합니다. 이러한 클래스 파일은 Java 가상 머신 (JVM)이 설치된 모든 기계에서 실행할 수 있습니다.

## 바이트코드 이해하기

Java 클래스 또는 애플리케이션을 실행하려고 시도하면 이전에 생성된 바이트코드가 아직 기계 코드로 컴파일되지 않았다는 것을 알 수 있습니다. JVM은 이 바이트코드를 TemplateInterpreter를 사용하여 해석합니다.

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

## TemplateInterpreter는 무엇을 하는가?

기본적으로 TemplateInterpreter는 바이트 코드 명령을 하나씩 처리하여 사용 중인 특정 운영 체제 및 아키텍처에 따라 필요한 작업을 결정합니다.

## JIT 컴파일러란 무엇인가요?

JVM은 단순히 바이트 코드를 끊임없이 해석하지 않습니다. 대신, 자주 실행되는 코드 (핫 패스로 알려진)를 식별하고 해당 바이트 코드를 직접 기계 코드로 컴파일합니다. 이 과정에는 성능을 최적화하는 Just-In-Time (JIT) 컴파일러가 관여하여 핫 패스를 기계 코드로 번역함으로써 성능을 최적화합니다.

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

궁금해하시는 분들을 위해 Java C1 및 C2 컴파일러와 계층 컴파일의 개념을 탐구하는 것도 좋은 아이디어에요.

## JIT 컴파일러 최적화

정적 코드 분석과 실행 프로필링을 통해 JIT 컴파일러는 특정 플랫폼에 대해 정교하게 최적화된 기계 코드를 생성할 수 있어요.

## JIT의 장점

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

"한 번 작성하고 어디서든 실행" - 이것은 자바의 근본적인 약속이었습니다. JVM이 설치되어 있다면 Java는 항상 이를 실현해 왔습니다. 초기 해석 시간을 통해, Java는 Just-In-Time (JIT) 컴파일을 통해 좋은 런타임 성능을 제공합니다.

## Ahead-Of-Time (AOT) 컴파일러

지금까지 JIT가 무엇인지 알았으니, 이제 어떤 것이 AOT 컴파일인지 이해할 수 있습니다.

Ahead-Of-Time (AOT) 컴파일러는 애플리케이션이 실행되기 전에 Java 바이트코드를 네이티브 머신 코드로 번역합니다. 이는 런타임이 아닌 빌드 단계에서 애플리케이션을 컴파일하고, 구체적인 운영체제 및 아키텍처에 맞는 실행 바이너리를 생성하는 과정을 포함합니다."

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

AOT 컴파일러는 Java 소스 코드를 가져와 바이트코드로 컴파일합니다. 그런 다음에는 이 바이트코드를 네이티브 머신 코드로 번역합니다. 마지막으로 특정 플랫폼에서 직접 실행할 수 있는 실행 가능한 이진 파일을 생성합니다.

AOT 컴파일러는 기본적으로 빌드 시간에 정적 코드 분석을 하고 특정 플랫폼(Windows, Mac, Linux, x64, ARM 등)을 위한 네이티브 실행 파일을 생성합니다. 예를 들어, .exe 파일이라는 파일을 받게 됩니다. 이는 프로그램 시작 후에 바이트코드 해석이나 컴파일이 발생하지 않으므로 가장 빠른 응용 프로그램 실행이 가능합니다. 그러나 특정 플랫폼 및 아키텍처의 각 조합에 대해 해당되는 실행 파일을 만들어야 하며, 이외에도 조만간 논의할 다른 제약 사항이 있습니다. 이 접근 방식은 '한 번 작성하면 어디서나 실행한다'는 Java의 핵심 약속과 대조적입니다.

## AOT 컴파일의 장점

코드가 이미 컴파일되어 있기 때문에 애플리케이션은 거의 즉시 시작됩니다. AOT 컴파일된 애플리케이션은 JIT 컴파일러와 런타임 최적화가 필요하지 않으므로 메모리를 적게 사용합니다. 컴파일러는 대상 플랫폼에 특화된 포괄적인 최적화를 수행할 수 있습니다. JIT 컴파일 오버헤드가 없어져 성능이 더 일관되고 예측 가능해집니다. AOT 컴파일은 런타임 코드 생성이 필요 없어져 공격 표면을 줄일 수 있습니다.

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

전반적으로 AOT 컴파일은 부팅 시간, 메모리 사용량 및 일관된 성능이 중요한 환경에서 상당한 이점을 제공합니다.

GraalVM 방식

GraalVM은 코드 실행에 대해 두 가지 접근 방식을 지원합니다: Just-In-Time (JIT) 및 Ahead-Of-Time (AOT) 컴파일.

JIT 컴파일은 실행 시 자주 실행되는 바이트코드를 최적화된 머신 코드로 동적으로 컴파일하여 부팅 시간과 최고 성능을 균형있게 유지함으로써 성능을 향상시킵니다. C2 컴파일러를 대체하기 위해 개발된 AOT (Native Image) 컴파일은 실행 전에 바이트코드를 네이티브 머신 코드로 번역하여 부팅 시간을 빠르게 하고 메모리 사용량을 낮춥니다. 이러한 접근 방식을 통해 Java 응용 프로그램을 다양한 사용 사례와 환경에서 최적화하는 데 유연하고 강력한 옵션을 제공합니다.

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

## 네이티브 이미지를 사용하는 경우

네이티브 실행 파일로 컴파일되고 실행되면 응용 프로그램은 몇 밀리초 내에 시작될 수 있습니다. 이 빠른 시작 시간은 네이티브 이미지가 람다 또는 CLI 응용 프로그램과 같은 사용 사례에 특히 적합하다는 것을 의미합니다. 이러한 시나리오에서 프로젝트의 규모는 일반적으로 Ahead-Of-Time (AOT) 컴파일과 관련된 잠재적인 제약 사항을 완화시킬 수 있습니다.

# GraalVM의 Closed-World 가정에 대한 제한

CWA에 대해 이야기해봅시다. GraalVM의 Closed-World 가정(CWA)은 프로그램 전체와 해당 종속성이 컴파일 시점에 알려져야 한다는 요구사항을 의미합니다. 이 가정은 Ahead-Of-Time (AOT) 컴파일 중에 더 강력한 최적화를 가능하게 합니다. 컴파일러는 실행 시 클래스나 메서드의 동적 로딩을 고려할 필요 없이 정확한 결정을 내릴 수 있습니다.

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

다시 말하자면, CWA는 우리 프로그램에 제한을 가하는 것입니다. 이는 실행하기 전에 모든 코드를 컴파일해야 한다는 것을 의미합니다. 따라서 Java Reflection, 동적 프록시 및 그 밖의 모든 것이 작동을 멈춥니다.

## Closed-World 가정의 주요 측면:

- 전체 프로그램 분석: AOT 컴파일러는 전체 프로그램과 의존성을 분석하여 철저한 최적화를 가능하게 합니다.
- 동적 클래스 로딩 없음: 컴파일러가 모든 코드를 알고 있다고 가정하기 때문에 동적 클래스 로딩을 처리할 필요가 없어 더 간단하고 효율적인 코드를 얻을 수 있습니다.
- 최적화된 실행 파일: 컴파일러가 더 동적인 환경에서는 불가능한 고급 최적화를 수행할 수 있기 때문에 실행 가능한 파일은 성능을 위해 매우 최적화되어 있습니다.
- 플랫폼별: 실행 파일은 특정 플랫폼과 아키텍처에 맞게 제작되어 최적의 성능을 보장하지만 각 대상 환경마다 별도의 이진 파일이 필요합니다.
- 오버헤드 감소: 런타임 해석이나 JIT 컴파일이 필요하지 않기 때문에 애플리케이션은 빠른 시작 시간과 줄어든 메모리 사용량을 달성할 수 있습니다.

혜택:

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

- 더 빠른 시작 시간: 사전 컴파일된 코드는 런타임 컴파일이 필요하지 않음을 의미합니다.
- 더 낮은 메모리 사용량: JIT 컴파일러나 런타임 최적화 데이터 구조가 필요하지 않습니다.
- 더 나은 성능: 공격적인 최적화로 뛰어난 실행 파일을 만듭니다.

타협점:

- 플랫폼 특정성: 각 대상 환경에는 별도의 실행 파일이 필요합니다.
- 덜 유연함: 런타임에 새로운 클래스나 메소드를 로드할 수 없어 동적 기능이 제한됩니다.
- 빌드 복잡성: 코드와 종속성이 모두 포함되도록 하기 위한 보다 복잡한 빌드 프로세스가 필요합니다.

이해하면, GraalVM의 클로즈드 월드 가정은 AOT 컴파일을 통해 상당한 성능 향상을 가능하게 하여 시작 시간과 메모리 효율성이 중요한 시나리오에 적합합니다.

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

## GraalVM Spring 한계

Spring 애플리케이션의 주요 한계는 주로 Spring 프레임워크 내에서 널리 사용되는 반사(reflection) 및 동적 프록시 사용과 관련이 있습니다.

## Reflection 한계:

- 동적 빈 로딩: Spring의 동적 빈 로딩 메커니즘은 주로 reflection에 의존하며, 네이티브 이미지 컴파일링에 문제가 될 수 있습니다. Spring의 빈 생성 프로세스에서 필요로 하는 반사적 액세스는 네이티브 이미지 환경에서 완전히 지원되지 않거나 최적화되어 있지 않을 수 있습니다.
- 구성 메타데이터: Spring은 주석과 XML 설명자와 같은 구성 메타데이터를 구문 분석하고 처리하기 위해 reflection을 사용합니다. GraalVM의 네이티브 이미지는 reflection 구성을 지원하지만, 최적의 성능 및 호환성을 달성하려면 추가 구성 및 맞춤이 필요할 수 있습니다.

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

## 동적 프록시 제한 사항:

- AOP 및 프록시 기반 메커니즘: Spring의 Aspect-Oriented Programming (AOP) 및 프록시 기반 메커니즘은 개관적 관심사에 대해 동적 프록시에 의존합니다. GraalVM의 네이티브 이미지 컴파일은 동적 프록시 생성을 제한하여 Spring의 AOP 기능과 성능에 영향을 줍니다.
- 트랜잭션 및 보안 프록시: Spring의 트랜잭션 및 보안 프록시는 선언적 트랜잭션 관리 및 보안 강화에 사용되며, 네이티브 이미지로 컴파일되었을 때 제한 사항을 만날 수 있습니다. 이러한 프록시의 동적 성격이 GraalVM의 미리 컴파일하는 모델과 충돌합니다.

SpringBoot를 사용하는 표준 예제를 살펴보겠습니다. 매우 자주 SpringBoot 애플리케이션을 실행하면 특정 속성이나 프로파일에 따라 다른 빈들이 실행 중에로드 될 수 있습니다.

예를 들어 AutoConfiguration은 특정 속성이 설정된 경우에만 빈을 생성하게됩니다. 애플리케이션이 시작될 때(ConditionalOnProperties).

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

그런 경우에 GraalVM 컴파일러는 어떤 매개변수가 로드될지 모릅니다.

따라서 SpringBoot는 고유 이미지를 위해 @Profiles 및 @ConditionalOnProperties를 전혀 지원하지 않습니다. 그리고 다른 메커니즘들도 아닙니다.

## 해결책:

- 명시적인 Reflection 구성: Spring 개발자는 중요한 클래스 및 메서드에 대한 명시적인 reflection 구성을 제공하여 reflection 관련 문제를 완화할 수 있습니다. 이는 원활한 런타임 동작을 보장하기 위해 네이티브 이미지 구성에서 reflection 메타데이터를 지정하는 것을 포함합니다.
- 정적 분석 도구: Spring Native 및 GraalVM의 네이티브 이미지 에이전트와 같은 정적 분석 도구를 활용하여 개발 중에 reflection 및 프록시 관련 문제를 식별하고 해결할 수 있습니다. 이러한 도구는 문제가 되는 코드 패턴에 대한 통찰력을 제공하고 GraalVM 호환성을 위한 최적화를 제안합니다.
- 대체 구현: 경우에 따라 개발자는 reflection 및 동적 프록시에 대한 의존을 최소화하는 대체 구현이나 디자인 패턴을 탐색해야 할 수도 있습니다. 이 접근 방식은 코드를 컴파일 시점 계기 또는 정적 조직 기법을 사용하도록 리팩토링하는 것을 포함할 수 있습니다.

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

Spring의 기능이 풍부한 생태계는 개발자의 생산성과 응용 프로그램 확장성을 향상시키지만, GraalVM의 네이티브 이미지 컴파일과의 원활한 호환성 달성에는 reflection 및 동적 프록시 사용에 대한 신중한 고려가 필요합니다. 이러한 제약 사항을 선제적인 구성 및 최적화를 통해 해결함으로써, 개발자들은 효율적이고 성능이 우수한 응용 프로그램을 구축하기 위해 Spring과 GraalVM의 혜택을 동시에 활용할 수 있습니다.

GraalVM은 현대적인 응용 프로그램을 위한 다목적 및 고성능 런타임 환경을 제공하여 가상 머신 기술의 중요한 발전을 나타냅니다. 한 플랫폼에서 여러 언어를 실행하고 상호 운용할 수 있는 능력과 고급 컴파일 기술을 결합한 것은 효율적이고 확장 가능한 응용 프로그램을 구축하려는 개발자들에게 강력한 도구로 작용합니다.
