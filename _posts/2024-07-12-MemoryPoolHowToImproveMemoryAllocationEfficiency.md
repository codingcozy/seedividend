---
title: "메모리 풀 메모리 할당 효율성을 높이는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-MemoryPoolHowToImproveMemoryAllocationEfficiency_0.png"
date: 2024-07-12 21:25
ogImage:
  url: /assets/img/2024-07-12-MemoryPoolHowToImproveMemoryAllocationEfficiency_0.png
tag: Tech
originalTitle: "Memory Pool: How To Improve Memory Allocation Efficiency?"
link: "https://medium.com/@cstoppgmr/memory-pool-how-to-improve-memory-allocation-efficiency-57723c8d8630"
isUpdated: true
---

![Memory Pool](/assets/img/2024-07-12-MemoryPoolHowToImproveMemoryAllocationEfficiency_0.png)

리눅스 시스템에서 JVM의 최대 힙 메모리는 Xmx를 사용하여 8GB로 설정되었지만, 거의 100개의 동시 스레드에서 Java 프로세스가 14GB의 메모리를 차지하는 것을 관찰했습니다. 왜 그럴까요?

이는 Java를 포함한 대부분의 고수준 언어가 C로 작성되었기 때문입니다. 메모리 할당은 C 라이브러리를 통해 진행되어야 하며, 이는 메모리 풀로 더 큰 공간을 사전 할당하여 이후의 메모리 할당을 가속화합니다. 따라서 C 라이브러리에 의해 사전 할당된 6GB의 메모리 풀이 JVM에 의해 사전 할당된 8GB 메모리 풀과 겹쳐져 Java 프로세스의 메모리 사용량이 예상을 초과하게 됩니다.

메모리 풀의 특성을 이해하면 프로그램 작성 시 과도한 메모리 사용을 피할 수 있으며, 이는 서버 성능 저하나 OOM(Out Of Memory)으로 인한 시스템에 의해 프로세스가 종료되는 사태를 막을 수 있습니다. 또한 메모리 할당 속도를 향상시킬 수 있습니다. 시스템이 유휴 시간에 메모리를 할당하는 데는 그다지 많은 시간이 걸리지 않지만, 분산 환경에서 바쁜 멀티스레드 서비스의 경우 메모리를 확보하는 시간이 수십 배 증가할 수 있습니다.

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

한편, memory pool은 매우 저수준 기술입니다. 이해하면 응용 프로그램 시나리오에 적합한 memory pool로 교체할 수 있습니다. 여러 프로그래밍 언어가 공존하는 분산 시스템에서는 memory pool이 다양하게 활용됩니다. memory pool을 최적화하여 가져온 미세한 성능 향상은 분산 클러스터의 호스트 규모로 인해 상당한 전체적인 이점을 얻을 수 있습니다.

다음으로, memory pool을 공부함으로써 메모리 할당의 효율성을 어떻게 향상시킬 수 있는지 살펴보겠습니다.

# 숨겨진 memory pool

사실, 비즈니스 코드와 시스템 커널 사이에 종종 두 단계의 memory pool이 존재하는데, 특히 C 라이브러리 memory pool을 쉽게 간과하기 쉽습니다.

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

코드가 메모리를 요청할 때, 먼저 애플리케이션 레이어 메모리 풀에 도달합니다. 애플리케이션 레이어 메모리 풀에 충분히 사용 가능한 메모리가 있다면, 비즈니스 코드로 직접 반환됩니다. 그렇지 않다면, 더 깊은 C 라이브러리 메모리 풀에서 메모리를 요청합니다. 예를 들어, Apache나 Nginx와 같은 서비스 위에 모듈을 개발 중이라면, 해당 서비스는 독립적인 메모리 풀을 보유하고 있습니다. 또한 Java도 메모리 풀을 가지고 있습니다. Xmx 시작 매개변수를 사용하여 JVM 힙 메모리 크기를 8GB로 지정하면, JVM 힙 메모리 풀의 크기를 설정하는 것입니다.

Google의 TCMalloc이나 Facebook의 JEMalloc과 같은 것들도 C 라이브러리 메모리 풀입니다. C 라이브러리 메모리 풀이 메모리 요청을 충족시킬 수 없을 때는 운영 체제 커널로부터 메모리를 요청합니다. 다음 다이어그램에서 보여지는 것처럼:

![Memory Pool Diagram](/assets/img/2024-07-12-MemoryPoolHowToImproveMemoryAllocationEfficiency_1.png)

Java는 이미 애플리케이션 레이어 메모리 풀을 가지고 있기 때문에 C 라이브러리 메모리 풀의 영향을 받는 이유가 무엇일까요? JVM이 관리하는 힙 메모리 외에도 Java에는 오프-힙 메모리가 있습니다. JVM의 가비지 컬렉션 메커니즘을 사용하지 않기 때문에 더 안정적이고, 지속적이며, IO 작업을 빠르게 처리합니다. 이 오프-힙 메모리는 C 라이브러리 메모리 풀에 의해 할당되므로, Java가 C 라이브러리 메모리 풀의 영향을 받는 것입니다.

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

사실 자바뿐만 아니라 거의 모든 프로그램은 C 라이브러리 메모리 풀에서 할당된 메모리를 사용합니다. C 라이브러리 메모리 풀은 시스템 내에서 이에 종속된 모든 프로세스에 영향을 미칩니다. 특히 리눅스의 기본 C 라이브러리 메모리 풀인 Ptmalloc2를 분석하여 성능에 미치는 영향을 이해해보겠습니다.

C 라이브러리 메모리 풀이 작동 중일 때, 요청된 바이트 크기보다 큰 공간을 메모리 풀로 미리 할당합니다. 예를 들어, 메인 프로세스가 1바이트의 메모리를 요청하면 Ptmalloc2는 132KB의 메모리를 미리 할당합니다(Ptmalloc2에서 Main Arena로 참조됨). 응용 프로그램 코드가 다시 메모리를 요청하면, 이 미리 할당된 132KB에서 계속해서 할당합니다.

아래에 보여지는 대로(주소 단위가 16진수임을 참고하세요):

```js
# cat /proc/2891/maps | grep heap
01643000-01664000 rw-p 00000000 00:00 0     [heap]
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

이 1 바이트의 메모리를 해제할 때, Ptmalloc2는 운영 체제에 그것을 반환하지 않습니다. 대신에 Ptmalloc2는 그것을 메모리 풀에 보관하는 것을 선호합니다. 운영 체제에 돌려주는 대신에 메모리 풀에 그것을 유지함으로써, 프로세스가 다음번에 1 바이트의 메모리를 요청할 때 재사용할 수 있으며, 이는 훨씬 더 빠릅니다.

이 섹션의 시작 부분에서 언급한 Java 프로세스에 할당된 몇 기가바이트의 메모리와 비교했을 때 132KB가 작아 보일 수도 있습니다. 그 이유는 멀티스레딩과 싱글 스레딩에 대한 사전 할당 전략의 차이에 있습니다.

각 자식 스레드의 사전 할당된 메모리는 64MB입니다(Ptmalloc2에서 알려진 쓰레드 아레나; 32비트 시스템에서 1MB, 64비트 시스템에서 64MB). 만약 100개의 스레드가 있다면, 메모리 풀은 6GB의 메모리를 차지할 것입니다. 물론, 1000개의 스레드를 설정하면 60GB의 메모리를 사전 할당하지 않습니다. 스레드 메모리 풀은 CPU 코어 수의 8배까지만 커질 수 있습니다. 예를 들어, 32코어 서버의 경우, 최대 256개의 스레드 메모리 풀이 있을 것이며, 여전히 상당한 16GB의 메모리 할당을 가져올 수 있습니다 (64MB \* 256 = 16GB).

이 글의 초기 질문으로 돌아가면, Linux의 기본 JVM은 Ptmalloc2 메모리 풀을 사용하여, 각 스레드마다 64MB를 사전 할당합니다. 수백 개의 Java 스레드가 있을 때 이렇게함으로써 JVM은 추가적인 6GB의 메모리를 사용합니다. 대부분의 경우, 이 사전 할당은 후속 메모리 할당의 성능을 향상시킬 수 있습니다.

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

그러나 자바의 JVM 메모리 풀이 대부분의 메모리를 관리하기 때문에 추가 6GB는 허용되지 않습니다. 어떻게 해야 할까요? Ptmalloc2 메모리 풀에 대해 알고 있는 것 두 가지 솔루션을 제공합니다:

첫째, Ptmalloc2의 동작을 조정할 수 있습니다. MALLOC_ARENA_MAX 환경 변수를 설정하여 최대 쓰레드 메모리 풀 수를 제한할 수 있습니다. 쓰레드 메모리 풀의 수를 줄이면 Ptmalloc2의 메모리 할당 속도에 영향을 미칠 수 있지만, 이 영향은 미미합니다. 왜냐하면 자바는 주로 객체 관리를 위해 JVM 메모리 풀을 사용하기 때문입니다.

둘째, Ptmalloc2를 Google의 TCMalloc과 같이 미리 할당된 메모리보다 적게 할당하는 다른 메모리 풀로 교체할 수 있습니다. 이는 TCMalloc이 반드시 Ptmalloc2보다 좋다는 것을 의미하는 것이 아니라, 서로 다른 시나리오에 따라 다른 선택이 필요할 수 있다는 것을 의미합니다. 무분별하게 TCMalloc을 선택하면 성능이 저하될 수 있으며, 그렇지 않은 경우 Linux는 오래 전에 기본 메모리 풀을 TCMalloc로 전환했을 것입니다.

오늘날 가장 대중적인 두 개의 메모리 풀인 TCMalloc과 Ptmalloc2에 대해 다음으로 TCMalloc과 Ptmalloc2를 비교하여 올바른 메모리 풀을 선택하는 방법에 대해 안내하겠습니다.

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

# Ptmalloc2와 TCMalloc 중에서 선택하는 방법?

우선, TCMalloc이 특히 멀티 스레드 환경에서 작은 메모리 할당에서 뛰어난 성능을 보이는 시나리오를 살펴봅시다.

예를 들어, 2GHz CPU에서 256KB 메모리를 할당하고 해제하는 경우 Ptmalloc2는 32 나노초가 걸리는 반면, TCMalloc은 단 10 나노초만 소요됩니다. 이 차이는 세 배 이상 빠릅니다. 그 이유는 무엇일까요? 이는 Ptmalloc2가 스레드 A가 메모리를 할당하고 해제하면 스레드 B도 비슷한 메모리를 요청할 수 있다고 가정하기 때문에 스레드 간에 메모리 풀을 재사용하여 성능을 향상시킨다는 점에서 비롯됩니다.

따라서 메모리가 할당될 때마다 Ptmalloc2는 공유 자원의 상호 배타적인 처리를 위해 잠금 메커니즘을 사용해야 합니다. 그러나 잠금은 상당한 비용을 발생시킵니다. 할당 속도를 모니터링하면, 단일 스레드 서비스에서 100개 스레드로 전환하면 Ptmalloc2의 메모리 할당 속도가 10배 정도 떨어지는 것을 발견할 수 있습니다. 그에 비해 TCMalloc은 작은 메모리 할당에 대해 많은 최적화를 수행하여 각 스레드가 잠금이 필요 없이 독립적으로 메모리를 할당하므로 더 빠른 성능을 제공합니다!

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

또한, 스레드 수가 증가할수록 Ptmalloc2에서 락 경합의 가능성도 높아집니다. 예를 들어, 동일한 테스트에서 40개의 스레드를 사용할 경우, TCMalloc의 성능은 10 나노초에서 25 나노초로 증가하는 데에 그쳐서 1.5배 증가하지만, Ptmalloc2의 성능은 32 나노초에서 137 나노초로 하락하여 3배 이상 증가합니다.

TCMalloc의 저자들이 제공한 성능 테스트 데이터에 따르면, 스레드 수가 증가함에 따라 두 할당기 사이의 성능 차이가 벌어집니다. 따라서, 여러 동시 스레드를 포함하는 애플리케이션을 개발할 때는 TCMalloc 라이브러리 사용이 더욱 유리할 수 있습니다!

![Memory Pool How To Improve Memory Allocation Efficiency](/assets/img/2024-07-12-MemoryPoolHowToImproveMemoryAllocationEfficiency_2.png)

그렇다면 왜 GlibC는 기본 메모리 풀을 Ptmalloc2에서 TCMalloc로 변경하지 않을까요? 이것은 Ptmalloc2가 큰 메모리 할당을 처리하는 데 뛰어나기 때문입니다.

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

예를 들어, 단일 스레드 환경에서 257KB의 메모리를 할당할 때, Ptmalloc2는 안정적으로 32 나노초가 소요되지만, TCMalloc의 시간은 10 나노초에서 64 나노초로 증가하며 5배 이상 증가했습니다! 이제 TCMalloc은 실제로 Ptmalloc2보다 1.5배 더 느립니다! 이는 TCMalloc이 작은 메모리 할당에 특히 최적화되어 있기 때문입니다.

"작은 메모리"는 무엇을 의미할까요? TCMalloc은 메모리를 세 가지 등급으로 분류합니다. 256KB 이하의 메모리는 작은 메모리로 분류되며, 256KB에서 1MB 사이의 메모리는 중간으로 간주되며, 1MB보다 큰 메모리는 큰 메모리로 분류됩니다. TCMalloc은 중간 및 큰 메모리 할당에 대한 성능이 비교적 느립니다. 예를 들어, 단일 스레드 환경에서 2MB의 메모리를 할당할 때, Ptmalloc2는 여전히 안정적으로 32 나노초가 소요되지만, TCMalloc의 시간은 86 나노초로 늘어나 7배 이상 증가했습니다.

따라서, 주로 256KB 이하의 메모리를 할당하는 경우, 특히 멀티스레드 환경에서는 TCMalloc을 선택해야 합니다. 그렇지 않으면, Ptmalloc2가 보다 다용도이며 일반적인 용도에 적합합니다.

# 힙 대 스택 할당: 어떤 것을 사용해야 할까요?

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

저희가 방금 한 메모리 풀 토론에서 메모리 할당이 모두 힙에서 이루어진 것을 눈치채셨을지도 모르겠어요. 하지만 객체를 힙이 아닌 스택에 할당해본다면 속도가 두 배 정도 더 빨라질 수도 있어요! 그 이유가 뭘까요?

만약 힙과 스택 메모리 할당 방식에 대해 친숙하지 않다면 간단히 소개해드릴게요.

정적으로 타입이 지정된 언어에서는 new 키워드를 사용하지 않고 할당되는 대부분의 객체가 스택에 생성됩니다. 예를 들어:

```js
C/C++/Java: int a = 10;
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

그 이외에 new 또는 malloc 키워드를 사용하여 할당된 객체는 힙(heap)에 할당됩니다:

```js
C 언어: int * a = (int*) malloc(sizeof(int));
C++ 언어: int * a = new int;
Java 언어: int a = new Integer(10);
```

또한, 동적으로 타입이 지정된 언어의 경우 new 키워드를 사용하든 말든 항상 힙(heap)에서 메모리가 할당됩니다.

이를 이해하면, 왜 스택에서의 메모리 할당이 더 빠를 수 있는지 살펴보도록 하겠습니다.

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

각 스레드가 독립적인 스택을 갖기 때문에 메모리 할당을 보호하기 위한 잠금 메커니즘이 필요하지 않으며, 스택 객체의 크기는 컴파일 시 실행 파일에 이미 기록되어 있어 실행이 더 효율적입니다! 성능 중심 언어인 Go(Golang)는 이 원칙을 기반으로 설계되었습니다: 힙 메모리를 할당하기 위해 new 키워드를 사용하더라도, 컴파일러는 기능적 의미에 영향을 미치지 않는다고 판단하면 스택에 자동으로 메모리를 할당합니다.

그러나 스택 메모리 할당에는 단점도 있으며, 일부 기능적 제한이 따릅니다. 첫째, 스택 메모리의 수명이 제한되어 함수 호출이 종료되면 자동으로 해제됩니다. 반면 힙에 할당된 메모리는 함수 호출이 종료되어도 해제되지 않으므로 충분한 수명을 제공합니다. 둘째, 스택 용량이 제한되어 있습니다. 예를 들어 CentOS 7에서는 8MB입니다. 이 한도를 초과하는 메모리를 할당하면 스택 오버플로 오류가 발생하게 됩니다(재귀적 함수 호출이 이 문제의 일반적인 원인입니다). 반면 힙은 이러한 용량 제한이 없습니다.

따라서 메모리를 할당할 때, 기능적으로 가능하다면 힙 할당보다는 스택 할당을 선호해야 합니다.

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

프로세스가 메모리를 할당하고 사용하는 총 메모리 공간에는 모두 메모리 풀(memory pool)이 영향을 미칩니다. 이 숨겨진 메모리 풀의 존재를 이해하는 것이 메모리 할당 효율을 향상시키는 열쇠입니다.

숨겨진 C 라이브러리 메모리 풀은 프로세스의 메모리 오버헤드에 상당한 영향을 미칩니다. 프로세스의 메모리 사용량이 예상을 초과할 때, 사용 중인 메모리 풀과 각 스레드에 대해 미리 할당된 공간을 인지해야 합니다.

다른 C 라이브러리 메모리 풀은 각기 다른 시나리오에 적합합니다. 예를 들어, TCMalloc은 다중 스레드 조건 하에서 작은 메모리 할당에 특히 유용하며, Ptmalloc2는 다양한 크기의 메모리 할당에 대해 안정적인 성능을 제공하며 일반 목적으로 사용됩니다.

메모리 풀은 힙(Heap) 메모리를 관리하며, 스택(Stack) 메모리 할당만큼 빠르지는 않습니다. 그러나 스택 메모리 할당은 수명과 용량 측면에서 제약 사항이 있어서 많은 응용 프로그램에는 다소 융통성이 떨어집니다. 그럼에도 불구하고 가능하다면 항상 메모리를 스택에 할당하는 것을 선호해야 합니다. 왜냐하면, 메모리 풀이 관리하는 힙 메모리 할당보다 훨씬 빠르기 때문입니다!

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

안녕하세요! 오늘은 분산 시스템에서 메모리 할당 관점에서 성능 향상에 대해 이야기했어요. 오늘의 내용을 공부한 후에는 최대한 빨리 메모리를 할당하는 방법을 알게 되었을 것이고, 사용 중인 메모리 풀을 이해했을 것이며, 이것이 프로세스의 최종 메모리 크기에 어떤 영향을 미치는지 알게 되었을 거예요. 심지어 서드파티 구성 요소의 경우, LD_PRELOAD 환경 변수를 사용하여 프로그램 시작 시 C 라이브러리 메모리 풀을 가장 적합한 것으로 대체할 수 있어요 (Linux에서 LD_PRELOAD를 사용하여 동적 라이브러리를 수정하여 메모리 풀을 변경할 수 있어요).

메모리 할당 시간은 사소해 보일 수 있지만, 메모리 할당에 대해 가장 빠른 방법을 사용하는 것이 전문가와 초보자를 구별하는 요소에요. 비슷한 알고리즘 간의 성능 차이는 이러한 코딩 세부 사항에 반영되며, 여러분이 이에 주목하길 바라요.

![Memory Pool How To Improve Memory Allocation Efficiency](/assets/img/2024-07-12-MemoryPoolHowToImproveMemoryAllocationEfficiency_3.png)
