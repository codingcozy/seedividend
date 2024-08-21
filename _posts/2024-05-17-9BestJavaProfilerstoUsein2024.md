---
title: "2024년에 가장 인기 있는 최고의 자바 프로파일러 9가지"
description: ""
coverImage: "/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_0.png"
date: 2024-05-17 03:16
ogImage:
  url: /assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_0.png
tag: Tech
originalTitle: "9 Best Java Profilers to Use in 2024"
link: "https://medium.com/javarevisited/9-best-java-profilers-to-use-in-2024-cc5d21f46f00"
isUpdated: true
---

<img src="/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_0.png" />

요즘에는 제가 써오던 서드파티 리눅스 애플리케이션에서 내 애플리케이션이 메모리 누수를 일으켰을 것으로 생각되는 경우가 발생하여 메모리 부족 예외를 계속 받게 되었어요.

그래서 서드파티 애플리케이션을 모니터링하기 위해 프로파일러를 시작하기로 결정했어요. 이 아이디어는 실행 중인 Java 프로세스에 프로파일러를 연결하고 할당 호출 트리 보기를 사용하여 호출되는 메서드 및 관련 클래스를 기록하는 것이었죠.

도와줄 Java 프로파일러를 찾기 시작했을 때 여러 가지가 있음을 깨달았고, 그 중 YourKit을 시도하기로 결정했어요. YourKit은 인기 있는 강력한 프리미엄 Java 프로파일러로 Java 애플리케이션을 위해 설계되었답니다. 프로파일러 설정은 그동안 들었던 소문과는 달리 꽤 쉬웠어요.

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

프로파일러를 시작하여 어떤 애플리케이션이 내 앱을 느리게 만드는지 알아보려고 했어요. 도구가 정말 잠재력이 있는 것을 깨달았지만 문제가 어디인지 실제로 정확히 파악하는 데 많은 시간이 걸리고 정말 어렵다는 걸 깨달았어요. 데이터를 받은 후에는 호출 트리를 직접 살펴보고 결론을 내려야 해서 분석하기가 어려웠어요.

![image](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_1.png)

최적화된 SQL 쿼리에 대한 이 글을 읽은 후 새로운 멋진 도구를 발견했다는 걸 기억했어요. 이 도구는 전통적인 의미의 프로파일러는 아니지만 관측 가능한 데이터를 분석할 수 있어 프로파일링 노력에 도움이 될 것 같았어요. Digma Continuous Feedback 도구가 프로파일러 결과를 분석하여 결론에 도달하고 프로파일러에서 무엇을 찾아야 하는지 도와줄 수 있을 것 같아요. 그래서 YourKit 프로파일러와 함께 Digma를 열었어요.

이 블로그에서는 왜 프로파일러를 시작하기로 결정했는지, 자바 앱을 프로파일링하기에 적합한 프로파일러 목록, 그리고 Digma Continuous Feedback이 프로파일러의 데이터를 분석하고 결론을 도출하는 데 어떻게 도움이 되었는지를 공유할 거예요.

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

# 자바 프로파일러란?

자바 프로파일러는 자바 애플리케이션의 성능을 측정하고 분석하는 도구입니다. 각 함수의 소요 시간, 메모리 사용량 및 함수 호출 빈도를 포함하여 프로그램 실행에 대한 데이터를 수집합니다.

자바 프로파일링은 소프트웨어 애플리케이션에서 성능 병목 현상을 찾는 데 유용합니다. 프로파일러가 수집한 데이터를 분석하면, 코드에서 가장 주목할 만한 지연 또는 자원 소비에 책임 있는 부분을 식별할 수 있습니다. 이 데이터는 코드를 개선하고 성능을 향상시키며 자원 소비를 감소시킬 수 있습니다.

그러므로 자바 프로파일러는 JVM 수준에서 자바 바이트 코드 구조와 작업을 확인하는 도구입니다. 이 프로그래밍 구조와 작업에는 객체 생성, 프로세스 반복(재귀적 함수 호출 포함), 메소드 실행, 스레드 실행 및 가비지 수집이 포함됩니다.

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

# Java Profiler 종류

- 샘플링 프로파일러: 이러한 프로파일러는 주기적으로 실행 중인 프로그램의 스냅샷을 찍고 콜 스택을 분석하여 핫스팟을 식별합니다.

- Instrumentation 프로파일러: 이러한 프로파일러는 프로그램의 코드를 수정하여 좀 더 자세한 성능 데이터를 수집합니다.

# Java 프로파일러의 사용 사례

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

Java 프로파일링 도구는 기본적으로 세 가지 방법으로 사용할 수 있어요:

성능 최적화: 개발자들은 Java 프로파일러를 사용하여 성능 문제를 일으키는 코드 부분을 파악할 수 있어요. 예를 들어 느린 함수 호출이나 높은 메모리 사용량 등이 있어요. 이 데이터를 활용하여 코드를 개선하여 성능을 향상시킬 수 있어요.

메모리 관리: Java 프로파일러는 메모리 누수를 감지하는 데 도움이 될 수 있어요. 프로그램이 사용하지 않는 메모리를 해제하지 못할 때 발생하는 메모리 누수가 있어요. 이러한 누수로 인해 메모리가 부족해져 프로그램이 다운될 수 있어요. 개발자들은 메모리 누수를 파악하여 더 이상 필요하지 않은 메모리를 해제하도록 코드를 수정할 수 있어요.

테스트: Java 프로파일러는 다양한 시나리오에서 프로그램 성능을 평가할 수 있어요. 예를 들어 다양한 입력 크기나 사용자 수를 고려한 테스트에 사용할 수 있어요. 이를 통해 프로그램이 출시되기 전에 잠재적인 성능 문제를 인식할 수 있어요.

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

# 자바 프로파일러는 어떻게 작동하나요?

JVM은 자바 개발자가 실행 중인 JVM(Java Virtual Machine)에 에이전트를 연결할 수 있도록 합니다. 개발자가 JVM에 에이전트를 연결하면, JVM은 에이전트에게 클래스를 로드하기 전에 클래스를 제공합니다. 그런 다음, 에이전트는 클래스를 변환합니다. 에이전트는 어떤 클래스의 코드를 변경할 수 있습니다.

자바 프로파일러는 기본적으로 에이전트입니다. 그들은 메소드의 시작과 끝에 계측 코드를 추가하여 해당 작업 시간을 추적합니다. 또한 모든 클래스의 생성자와 종료 메소드에 코드를 추가하여 사용된 메모리량을 추적합니다.

자바에서 코드 프로파일링은 내장 도구와 제3자 도구를 포함한 다양한 도구를 통해 달성할 수 있습니다. 애석하게도 인기 있는 일부 도구는 다음과 같습니다:

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

- JVM 도구
- Digma
- VisualVM
- YourKit
- JProfiler
- NetBeans Profiler
- IntelliJ Profiler
- Async Profiler
- Arthas

OpenTelemetry와 Java Flight Recorder (JFR)는 대부분의 경우를 커버합니다. 자동으로 instrumentation을 원하는 경우 OpenTelemetry Java 에이전트를 사용하거나 직접 instrumentation을 수행하려면 API만 사용하십시오.

# 1. JVM 도구

이 Java 프로파일링 도구는 표준 JDK와 함께 제공되어 별도의 설치나 설정이 필요하지 않습니다. 대략 다섯 가지가 있습니다: jstat, jmap, jcmp, jhat 및 hprof.

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

a. jstat
이 내장 명령줄 도구는 표준 JDK와 함께 제공되며 설치나 설정이 필요하지 않습니다. 명령줄을 통해 JVM 메모리, 힙 크기, 그리고 가비지 수집 활동을 모니터링하는 것은 매우 유익합니다.

이 도구는 JVM의 기본으로 활성화된 내장 계측을 활용하여 JVM을 시작하는 데 특별한 명령이 필요하지 않은 가상 머신 식별자 (VMID)를 통해 대상 Java 프로세스를 식별합니다.

다음은 jstat을 사용하는 세 가지 방법입니다:

미리 정의된 성능 제약 조건을 사용하여 Java 프로그램을 실행합니다.

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
java -Xmx125m -Xms25m -Xmn15m -XX:PermSize=30m -XX:MaxPermSize=30m -XX:+UseSerialGC HelloWorld
```

아래 명령어를 사용하여 프로세스 ID를 얻을 수 있습니다.

```js
ps aux | grep java
```

JVM Heap Memory 사용량을 모니터링하려면 터미널에서 jstat을 -gc 옵션과 함께 실행하세요.

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
jstat -gc 98132 17527
```

![이미지](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_2.png)

b. jmap

이 명령줄 도구는 표준 JDK에 포함되어 있습니다. 라이브 VM 또는 코어 파일에 대한 메모리 관련 데이터(heap summary, java object heap histogram, class loader stats, finalization queue info, dump of Java heap in hprof binary format)를 표시합니다.

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

기본 구성 및 알고리즘을 분석하는 것은 특히 유익합니다.

성능을 향상시키고 진단을 개선하기 위해 JDK 8부터 사용할 수 있는 새로운 유틸리티인 jcmd를 jmap 유틸리티 대신 사용하는 것을 제안합니다.

터미널에서 jmap을 사용하는 방법은 다음과 같습니다.

jhsdb jmap –-heap `JAVA_PID`

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

해당 명령을 사용하여 힙 덤프(heap dump)를 생성할 수도 있어요.

jhsdb jmap — -dump:file=`FILE` `JAVA_PID`

c. jcmp
이 명령행 도구는 표준 JDK와 함께 제공되며 별도의 설치나 설정 절차가 필요하지 않아요. JVM에 진단 명령을 보내는 데 사용됩니다.

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

jcmd `JAVA_PID` GC.heap_dump filename=`FILE`

- jhat

이 명령줄 도구는 표준 JDK에 미리 설치되어 있으며 설치나 설정이 필요하지 않습니다. 힙 스냅샷(또는 힙 덤프)의 객체 구조를 탐색하는 데 사용됩니다.

이 도구는 Heap Analysis Tool (HAT)을 대신합니다. jcmd에 의해 생성된 힙 덤프와 같은 이진 형식의 힙 덤프를 처리합니다.

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

이 도구는 Java의 메모리 누수와 유사한 의도하지 않은 객체 연결을 식별하는 데도 도움을 줄 수 있습니다. (루트셋에서 참조되어 있는 객체)

예를 들어, hprof

이 기본 명령줄 도구는 표준 JDK와 함께 제공됩니다. 힙 및 CPU 프로파일링, 락 경합, 메모리 누수 및 기타 문제를 분석하여 성능을 조사합니다. JVMTI(JVM 도구 인터페이스)를 통해 JVM과 통신하는 동적 링크 라이브러리(DLL)입니다.

프로파일링 데이터를 파일이나 소켓을 통해 ASCII 또는 이진 형식으로 기록합니다. 힙 할당 통계, 힙 덤프, CPU 사용량, JVM 내의 모든 모니터 및 스레드의 상태, 경합 프로필에 대한 정보를 제공할 수 있습니다.

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
java –agentlib:hprof HelloWorld
```

아래 명령을 사용하여 hprof를 사용하여 힙 할당 프로필을 얻을 수 있습니다.

```js
javac –J-agentlib:hprof=heap=sites HelloWorld.java
```

아래 명령을 사용하여 힙 덤프를 생성할 수 있습니다.

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
javac -J-agentlib:hprof=heap=dump HelloWorld.java
```

# 2. Digma Continuous Feedback

Digma는 OTEL을 사용하여 자동으로 수집한 관측 데이터에 의존합니다. 다른 프로파일링 도구와 마찬가지로 코드가 런타임에서 어떻게 작동하는지 분석하고 문제점을 찾는 것이 목적입니다. 유일한 차이점은 Digma가 자체적으로 이러한 문제점을 계속해서 찾는다는 것입니다.

몇 가지 예시를 살펴보겠습니다:

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

- 앱에 가장 많은 영향을 미치는 코드/쿼리를 찾아보세요(성능 영향).

a. 가장 성능에 영향을 많이 주는 코드를 찾으려면 자산 탭에서 "Performance Impact"로 정렬할 수 있습니다:

![이미지](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_3.png)

이 뷰는 개발자에게 가치 있는 정보를 제공합니다. 성능 문제로 최적화가 필요할 수 있는 엔드포인트를 빠르게 파악할 수 있습니다. 실행 시간과 성능 영향의 조합을 통해 문제 해결에 우선순위를 두고 개발에 집중할 수 있어 전체 애플리케이션의 성능과 신뢰성을 향상시킬 수 있습니다.

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

b. 또는 대시보드를 여시고, 클라이언트 스팬 성능 영향 위젯을 사용해보세요:

![위젯](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_4.png)

이 위젯은 개발자들이 애플리케이션의 어떤 부분이 성능 문제에 기여할 수 있는지 빠르게 식별할 수 있게 해줍니다. 성능에 미치는 영향이 큰 엔드포인트부터 시작해 디버깅과 최적화 노력을 우선 순위에 따라 할 수 있습니다.

2. 최근 커밋에서 성능 저하 식별하기 ― 지속 시간의 변화

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

![Image](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_5.png)

코드 성능의 최근 변경 사항을 추적하는 또 다른 방법은 기간 통찰력입니다. 이는 특정 범위의 호출 기간 분포를 시각적으로 나타냅니다.

최근 호출 성능: 위젯은 가장 최근 호출의 기간을 보여줍니다(91.95밀리초), 이를 일반적인 성능과 즉시 비교하여 예상 범위 내인지 아니면 이상값인지 확인할 수 있습니다.

중앙값 기간: 중앙값 기간이 최근 변경되었습니다(16.19밀리초 증가). 빨간색은 최근 변경 사항을 나타내며, 이는 성능의 저하 또는 개선을 나타낼 수 있습니다.

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

성능 분포: 히스토그램 자체는 호출 지속 시간의 빈도를 표시하여 개발자가 다양한 성능 시간의 공통성을 빠르게 파악할 수 있습니다. 특정 호출 지속 시간 범위가 얼마나 자주 발생하는지 보여줍니다.

가장 느린 5%: 호출의 가장 느린 5%를 나타내는 히스토그램의 부분이 강조됩니다. 이는 평균이나 중앙값 통계로는 명백하지 않은 장기적인 성능 문제를 식별하는 데 중요합니다.

이 통찰력을 활용하여 개발자는 코드의 성능을 시간이 지남에 따라 추적할 수 있습니다. 시각화는 증가하는 지연과 같은 트렌드를 식별하는 데 도움이 되며, 이는 메모리 누수, 비효율적인 데이터베이스 쿼리 또는 다른 리소스 충돌 문제와 같은 잠재적인 문제를 나타낼 수 있습니다. 최근 변경 사항을 나타내는 빨간 블록은 최근 코드 변경이나 배포 업데이트와 성능 변화를 상관시켜 주어 더 즉각적인 조사를 유도하는 데 특히 유용합니다.

3. 스케일링 문제 찾기를 위한 프로파일링 - 스케일링 통찰력
   Digma는 코드의 확장성에 대한 통찰력을 제공하여, 응용프로그램의 확장 가능성을 방해할 수 있는 잠재적인 문제를 식별합니다.

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

![Java Profiler](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_6.png)

예를 들어, 스케일링 문제 통찰력을 통해 개발자는 동시성 처리 및 요청 처리 시간과 관련된 성능 병목 현상을 빠르게 파악할 수 있습니다.

성능 저하 메트릭은 성능이 하락하는 부하 수준을 식별하는 데 도움이 됩니다. 이 메트릭은 이러한 트랜잭션 중에 실행된 코드 경로를 확인하여 비효율성이나 리소스 경합을 찾도록 개발자를 안내할 수 있습니다.

동시성 정보는 시스템이 동시적인 프로세스나 스레드를 처리할 때 문제가 발생하는 것을 개발자에게 알립니다. 이는 응용프로그램이 병렬 처리를 처리하거나 응용프로그램이 이 수준의 동시성에서 최적으로 작동하도록 필요한 리소스가 할당되지 않는 문제를 시사할 수 있습니다.

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

시간 소요: 넓은 범위는 일부 조건에서 응답 시간이 크게 증가할 수 있는 것을 시사합니다. 이는 처리 병목, 비효율적인 알고리즘, 데이터베이스 쿼리 성능 또는 다른 시스템 제약 때문일 수 있습니다.

이 정보를 종합함으로써, 개발자는 주의를 요하는 응용 프로그램 요소로 유도되고 비효율적인 코드, 데이터베이스 병목 현상, 부적절한 하드웨어 자원 또는 최적화되지 않은 아키텍처 결정과 같은 문제의 원인을 가정하기 시작할 수 있습니다. 목표는 이러한 영역을 조사하고 개선하여 응용 프로그램의 확장성을 향상시키는 것입니다.

# 3. VisualVM

이 도구는 Java Development Kit (JDK)의 일부였지만 JDK 8에서 제거되었으며, 현재는 별도의 도구로 제공됩니다.

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

이 Java 프로파일러는 CPU 샘플링, 메모리 샘플링, 가비지 수집 실행, 힙 오류 분석, 스냅샷 촬영 및 그래픽 사용자 인터페이스를 위해 편리합니다.

이 Java 프로파일러는 로컬 및 원격 프로파일링을 지원하지만 SSH 터널링을 통한 프로파일링은 지원하지 않습니다. 원격 프로파일링을 위해 JMX 포트를 구성해야 합니다.

VisualVM은 프로파일링 세션의 스냅샷을 나중에 분석할 수 있도록 촬영하는 기능을 제공합니다.

VisualVM은 JConsole, jstat, jinfo, jstack 및 jmap과 같은 JDK와 함께 제공되는 독립적인 도구에 의존합니다.

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

![VisualVM](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_7.png)

다음은 VisualVM을 사용하는 세 가지 방법입니다:

1. 미리 정의된 성능 제약 조건을 사용하여 Java 프로그램 실행하기

```bash
java -Xmx125m -Xms25m -Xmn15m -XX:PermSize=30m -XX:MaxPermSize=30m -XX:+UseSerialGC HelloWorld
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

터미널에서 jvisualvm을 실행하여 JVM 힙 메모리 사용량을 모니터링해보세요.

jvisualvm

다음으로, Java VisualVM 프로그램이 실행됩니다. Tools > Plugins로 이동하여 Visual GC 플러그인을 다운로드하세요. (다른 플러그인들도 표시될 것입니다. 필요한 것들을 사용할 수 있습니다.)

# 4. Yourkit

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

YourKit Java Profiler은 다양한 플랫폼과 호환되며 Windows, MacOS, Linux, Solaris 및 FreeBSD와 같은 각 지원 운영 체제에 대한 구별된 설치를 제공합니다.

JProfiler와 마찬가지로 YourKit에는 스레드, 가비지 수집, 메모리 사용량 및 메모리 누수를 표시하는 핵심 기능이 포함되어 있습니다. SSH 터널링을 통해 로컬 및 원격 프로파일링을 지원합니다.

당신의 계획은 비즈니스 목적을 위한 유료 라이선스를 제공하며, 무료 평가판 및 개인 사용을 위한 할인된 또는 무료 허가권을 포함합니다.

![](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_8.png)

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

당신의 킷은 발생한 예외를 분석하는 데도 유용합니다. 발생한 예외를 식별하고 빈도를 파악하는 것은 간단합니다.

당신의 킷은 특정 부분인 메서드나 스레드 내의 브랜치와 같은 코드에 초점을 맞춘 독특한 CPU 프로파일링 기능을 제공합니다. 이 기능은 조건부 프로파일링을 가능하게 함으로써 유용합니다.

당신의 킷은 SQL 및 NoSQL 데이터베이스 호출을 프로파일링할 수도 있습니다.

# 5. JProfiler

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

Markdown 형식은 JProfiler을 사용하여 Java 애플리케이션의 프로파일링을 수행할 수 있는 ej-technologies의 도구입니다. JProfiler에는 메모리 사용량, 시스템 성능, 잠재적인 메모리 누수, 그리고 스레드 프로파일링을 모니터링하기 위한 인터페이스가 제공되며 사용자 친화적인 사용자 인터페이스를 통해 제공됩니다.

이 정보를 통해 시스템의 기초에서 최적화, 제거 또는 수정할 부분을 쉽게 식별할 수 있습니다.

JProfiler은 Java 애플리케이션의 프로파일링 도구이며 ej-technologies가 개발했습니다. JProfiler은 메모리 사용량, 시스템 성능, 잠재적인 메모리 누수, 그리고 스레드 프로파일링을 모니터링하기 위한 인터페이스가 제공되며 사용자 친화적인 사용자 인터페이스를 통해 제공됩니다.

이 정보를 통해 시스템의 기초에서 최적화, 제거 또는 수정할 부분을 쉽게 식별할 수 있습니다.

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

<img src="/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_9.png" />

이 Java Profiler는 라이선스를 구매해야하지만 무료 평가판을 제공합니다. 주요 초점은 네 가지 핵심 영역을 다룹니다:

- 메서드 호출: 메서드 호출을 분석하면 응용 프로그램의 기능에 대한 통찰력을 제공하고 전반적인 성능을 향상시킬 수 있습니다.
- 할당: 힙에 저장된 항목, 참조 연결 및 쓰레기 수집 관리를 조사함으로써 메모리 누수를 해결하고 메모리 효율성을 향상할 수 있습니다.
- 스레드 및 락: JProfiler는 다양한 스레드 및 락 분석 관점을 제공하여 멀티스레딩 문제를 식별하는 데 도움을 줍니다.
- 고급 서브시스템: 고급 의미 수준에서 다양한 성능 문제가 발생합니다. Java 데이터베이스 연결(JDBC)의 JDBC 호출에서 가장 느린 SQL 문을 식별하는 것이 중요합니다. JProfiler를 사용하면 이러한 서브시스템을 통합적으로 조사할 수 있습니다.

JProfiler는 IntelliJ IDEA, 이클립스, NetBeans와 같은 잘 알려진 IDE와 통합될 수 있습니다. 사용자는 스냅샷에서 실제 소스 코드로 이동할 수도 있습니다.

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

# 6. NetBeans Profiler

넷빈스는 주로 우수한 디버깅 기능으로 알려져 있지만, 놀랍게도 최고의 자바 프로파일러 중 하나로 부상합니다. 오라클의 오픈 소스 넷빈스 IDE에는 NetBeans Profiler가 번들의 일부로 포함되어 있습니다. 쉬운 개발과 프로파일링에 대한 우수한 선택지이기도 합니다.

![이미지](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_10.png)

프로파일러와 디버거의 기능을 결합하면 코드 실행 시간 및 런타임 동작을 모니터링하고 멀티스레딩과 같은 디버깅 방법의 효율을 향상시킬 수 있습니다. 넷빈스 프로파일러는 응용 프로그램의 속도를 향상시키고 메모리 효율성을 향상시킵니다. 무료로 해당 웹사이트에서 다운로드할 수 있다는 것이 멋집니다.

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

Java VisualVM과 Netbeans Profiler은 기능 면에서 유사하며 둘 다 무료입니다. 그러나 Netbeans는 IDE와 함께 모든 기능을 제공하는 번들 프로그램으로 더 뛰어납니다.

# 7. IntelliJ Profiler

IntelliJ Profiler는 CPU 및 메모리 할당 프로파일링을 위한 간편하면서도 강력한 도구입니다. 두 가지 잘 알려진 Java 프로파일러인 JFR과 Async 프로파일러의 기능을 통합합니다.

일부 고급 기능이 제공되지만, 기본적으로 간편함에 중점을 둡니다. IntelliJ Profiler는 설치 없이 쉽게 시작할 수 있는 간단한 방법을 제공하며 일상적인 개발 작업에 유용한 도구를 제공합니다.

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

![Java Profiler](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_11.png)

IntelliJ IDEA Ultimate에서 IntelliJ Profiler를 Java 프로세스에 쉽게 연결할 수 있어요. 스냅숏과 소스 코드 사이를 쉽게 이동할 수 있어서 매끄럽게 작업할 수 있어요. 독특한 flame graph와 같은 다른 측면을 통해 시각적으로 다양한 메소드의 효과를 평가하고 런타임 프로세스를 신속하고 효과적으로 이해할 수 있어요.

# 8. Async Profiler

이 Java 프로파일링 도구는 최소한의 오버헤드가 있으며 Safepoint 편견 문제를 회피할 수 있어요. HotSpot을 위한 스택 추적 및 메모리 할당 모니터링을 위한 특정 API가 포함되어 있어요. 이 프로파일러는 HotSpot JVM을 사용하는 OpenJDK 및 다른 Java 런타임과 호환되어요.

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

async-profiler은 다양한 유형의 이벤트를 모니터링할 수 있습니다.

- 중앙 처리 장치 작업
- 캐시 미스, 브랜치 미스, 페이지 폴트 및 컨텍스트 전환과 같은 성능 카운터를 통해 하드웨어 및 소프트웨어 성능을 모니터링합니다.
- Java 힙 내의 메모리 분배
- Java 객체 모니터 및 ReentrantLocks의 locked contention 등의 locked contention 실험

현재 Async Profiler는 Linux 및 Mac 운영 체제만 지원합니다. IntelliJ IDEA를 사용한다면 별도로 설치할 필요가 없습니다. 통합 기능이 미리 설치되어 있으며 다음을 포함합니다.

- 프로파일링 세션 시작 및 종료
- 이미 진행 중인 프로세스에 연결
- 프로파일 평가 검사

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

![image](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_12.png)

# 9. Arthas

앨리바바 아르타스는 Java 애플리케이션을 진단하는 데 사용되는 도구로, 문제를 추적, 분석 및 해결할 수 있는 기능을 제공합니다. Arthas를 활용하는 주요 장점은 코드를 수정하거나 모니터링 중인 Java 서비스를 다시 시작할 필요가 없다는 것입니다.

![image](/assets/img/2024-05-17-9BestJavaProfilerstoUsein2024_13.png)

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

# 다른 실력 있는 자바 프로파일러

일부 주목할 만한 프로파일러로는 Java Mission Control, New Relic, Glowroot, JMH, Arthas, XRebel/JRebel, JProbe, Pinpoint 및 Stackify Prefix가 있습니다. 시장 점유율은 낮지만 분명 인정받을 가치가 있습니다.

Digna Continuous Feedback 다운로드: 여기

# 결론

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

그래서, YourKit과 Digma를 결합하는 것이 최상의 최적화 결과를 가져옵니다. Grafana는 애플리케이션 로그를 시각화하기 위해 사용되며, YourKit은 잠재적인 병목 현상을 찾기 위해 애플리케이션을 프로파일링하고, Digma는 잠재적인 문제가 있는 코드 조각에 대한 원활한 통찰력을 제공합니다.

# 자주 묻는 질문:

JProfiler는 자바 프로파일러인가요?

JProfiler는 강력한 프리미엄 자바 프로파일러로, Java 응용 프로그램용으로 설계되었습니다. 10일간의 완전한 평가판을 제공합니다.

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

자바 메모리 프로파일러란 무엇인가요?
자바 메모리 프로파일러는 자바 애플리케이션이 어떻게 메모리를 활용하는지를 분석하여 성능 문제를 확인하고 메모리 누수를 수정하는 데 도움을 줍니다.

자바에서 CPU 프로파일링이란 무엇인가요?

CPU 프로파일링은 CPU 사용량을 분석함으로써 애플리케이션의 효율성을 평가하고 개선하는 방법입니다. 이는 코드 내의 핫스팟, 병목 현상 및 효율성 문제를 식별하여 CPU 사용량의 증가나 부적절한 성능으로 이어질 수 있는 문제를 해결하는 데 도움이 됩니다.
