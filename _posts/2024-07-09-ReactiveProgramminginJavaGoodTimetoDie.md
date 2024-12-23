---
title: "Java Reactive Programming  지금 배우기 좋은 때"
description: ""
coverImage: "/assets/img/2024-07-09-ReactiveProgramminginJavaGoodTimetoDie_0.png"
date: 2024-07-09 21:45
ogImage:
  url: /assets/img/2024-07-09-ReactiveProgramminginJavaGoodTimetoDie_0.png
tag: Tech
originalTitle: "Reactive Programming in Java — Good Time to Die"
link: "https://medium.com/@viraj_63415/reactive-programming-in-java-good-time-to-die-79f243dc1275"
isUpdated: true
---

<img src="/assets/img/2024-07-09-ReactiveProgramminginJavaGoodTimetoDie_0.png" />

이 기사에서는 Reactive Programming의 이유, 개발자들 사이에서 인기가 없는 이유, 그리고 Java 가상 스레드의 도입으로 이제 그것이 사라져야 할 때가 올 수도 있다는 이유에 대해 설명합니다.

명령형 스타일 프로그래밍은 개발자들 사이에서 항상 매우 인기가 있었습니다. 이에 대한 이유는 매우 명백합니다. if-then-else, while 루프, 함수 및 블록과 같은 구성 요소의 사용으로 인해 결과 코드를 이해하기 쉽고 디버깅하기 쉽고 상상하기 쉽게 만들어줍니다. 코드로 인한 예외는 쉽게 추적할 수 있습니다. 그러나 모든 좋은 것들과 마찬가지로, 일반적으로 문제가 발생합니다. 이 스타일의 프로그래밍은 스레드가 필요 이상으로 오랜 시간 동안 블록되는 문제가 발생합니다.

# 동기식 블로킹 디자인

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

이를 이해하기 위해 일반적인 기업용 사례 요청을 살펴보겠습니다. 이 요청에서 코드는 데이터베이스에서 데이터를 가져 오고, 웹 서비스에서 데이터를 가져 와서 결과를 병합 한 다음 최종 결과를 사용자에게 다시 보내야합니다. Tomcat과 같은 Application Server에서는 사용자 요청에 대해 하나의 플랫폼 스레드가 할당되며 데이터베이스에서 데이터를 가져 오기 위해 호출을 하고(fetchDataFromDB 호출), 웹 서비스에서 데이터를 가져 오기 위해 호출을 한 다음(FetchDataFromService 호출) 병합하고 데이터를 사용자에게 보내기 위해(procceed to send the data to user) 호출합니다.

Figure 1에서는 수직 화살표로 위에서 아래로 실행 스레드를 볼 수 있습니다. 초록색 부분은 실행의 CPU 부분이고 빨간색 부분은 스레드가 데이터를 기다리는 시간입니다. 대부분의 기업 응용 프로그램은 IO에 바인딩되어 있으므로 스레드는 대부분의 시간을 차단하여 리소스를 낭비하게 됩니다. Figure 1은 동기 차단 설계를 나타내는 도표적 표현을 보여줍니다.

![이미지](/assets/img/2024-07-09-ReactiveProgramminginJavaGoodTimetoDie_1.png)

Java에서 플랫폼 스레드는 기본적으로 각 플랫폼 스레드가 1MB의 스택 메모리를 사용하기 때문에 비용이 많이 드는 리소스입니다. 즉, JVM에서 실행되는 플랫폼 스레드 수에는 상한선이 있습니다. 따라서 하나의 플랫폼 스레드가 사용자 요청에 전담된 경우 다수의 동시 사용자를 가진 애플리케이션에 대한 문제가 발생합니다. 이 문제를 해결하는 전통적인 방법은 최대 스레드 수 (예: 200)를 갖는 스레드 풀을 생성하고 수직 또는 수평으로 애플리케이션을 확장하여 필요한 만큼 큰 수의 사용자를 지원하는 것입니다. 수직 확장은 컨테이너 또는 VM에 더 많은 리소스를 추가하는 것을 의미하고, 수평 확장은 애플리케이션의 인스턴스를 더 추가하는 것을 의미합니다.

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

# 비동기 블로킹 디자인

성능을 향상시키기 위해 일부 일련으로 실행되는 작업을 병렬화할 수 있는 비동기 모델을 사용할 수 있습니다. 예를 들어, 데이터베이스와 웹 서비스의 페치 작업을 병렬로 실행할 수 있다고 가정한다면, 각각 별도의 플랫폼 스레드에서 실행할 수 있습니다. 이 경우 스레드 다이어그램은 다음과 같이 보일 것입니다.

<img src="/assets/img/2024-07-09-ReactiveProgramminginJavaGoodTimetoDie_2.png" />

이 시나리오에서 사용자 요청 스레드는 두 스레드를 시작합니다. 하나는 데이터베이스로부터 데이터를 가져 오고 다른 하나는 웹 서비스에서 데이터를 가져옵니다. 그런 다음 두 결과를 얻기 위해 블록된 후에 데이터를 병합하여 사용자에게 데이터를 보내게 됩니다. Java에서는 Executor Service에 Callable 또는 Runnable 작업을 제출하고 Java Futures를 사용하여 이를 성취할 수 있습니다.

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

이렇게 하면 성능이 향상되며 두 데이터 가져오기가 병렬로 수행됩니다. 그러나 대부분의 경우 성능이 향상될 수 있지만, 단기간 동안 플랫폼 스레드 수가 1에서 3으로 증가합니다. 확장성 측면에서는이 기간 동안 문제가 더욱 악화될 것입니다.

# 반응형 스타일 디자인

반응형 프로그래밍 스타일은 이 문제를 해결하기 위해 탄생했습니다. 문제는 비용이 많이든 플랫폼 스레드가 블록 연산 중에 아무것도 하지 않고 시간을 낭비한다는 것입니다. Servlet 3.0 및 3.1의 도입으로 서블릿 스레드는 사용자에게 HTTP 데이터를 다시 보낼 필요가 없어졌으며, 이를 통해 스레드 블로킹을 피하기 위한 몇 가지 똑똑한 프로그래밍을 할 수 있게 되었습니다. Java 8은 CompletableFuture 클래스를 도입하여 리액티브 파이프라인을 만들 수 있게 했습니다. 이 개발 스타일의 전반적인 아이디어는 사용 사례에 대한 실행을 지정하고 사용 사례 자체를 실행하지 않는다는 것입니다.

결국 사용자 요청 스레드는 사용 사례를 위한 CompletableFuture 파이프라인(또는 다른 파이프라인)을 지정하기만 하고 사용자에게 데이터를 다시 보내기 위해 계속 살아 있을 필요가 없기 때문에 가능한 빨리 풀로 할당될 것입니다. 그림 3은 이를 다이어그램 형식으로 보여줍니다.

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

![Reactive Programming in Java](/assets/img/2024-07-09-ReactiveProgramminginJavaGoodTimetoDie_3.png)

이 시나리오에서 User Request 쓰레드는 3개의 활동을 실행하기 위한 파이프라인을 만듭니다 - 먼저 FetchDataFromService와 FetchDataFromDB를 병렬로 실행한 다음 SendDataToUser를 실행합니다. 그러나 이 파이프라인을 만든 후에는 사용자 요청 쓰레드가 단순히 스레드 풀로 돌아갑니다. 이는 이제 JVM에 다룰 스레드가 하나 줄어들어 부담이 매우 줄어든다는 것을 의미합니다. 데이터 가져오기 스레드가 실행을 완료하면 데이터가 사용자에게 전달됩니다. 그러나 이것은 문제를 부분적으로 해결하는 것뿐입니다. 왜냐하면 웹 서비스와 데이터베이스에서 데이터를 가져오는 실제 활동이 여전히 해당 플랫폼 스레드를 차단하기 때문입니다.

이는 중요한 점을 제기합니다 - 개발자는 파이프라인에서 생성한 작업이 차단되지 않도록 해야 합니다. 이것을 올바르게 처리하기가 어렵습니다. 왜냐하면 이 작업은 수동으로 이루어지고 컴파일 시간이나 실행 시간에 경고나 오류로 표시되지 않기 때문에 오류가 발생할 수 있습니다.

# 완전히 반응형 스타일 디자인

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

이것을 어떻게 더 나아지게 만들까요? 이 디자인을 완전히 반응형으로 만들기 위해서는 데이터베이스 및 웹 서비스에 대한 데이터를 가져오는 작업을 비차단 방식으로 수행해야 합니다. Java에서는 JDK 7의 일환으로 NIO (New IO)가 도입되면서 IO 작업을 비차단으로 수행할 수 있게 되었습니다. 이제 Java의 모든 IO 기반 클래스와 메서드에는 비차단 버전이 있습니다. 예를 들어 소켓 읽기/쓰기, 파일 읽기/쓰기, 락 API 등이 그 예시입니다. 개발자로서, 이러한 클래스/메서드의 비차단 버전이나 NIO를 지원하는 라이브러리를 사용하여 데이터에 대한 호출을 해야 합니다. Figure 4는 이러한 설계의 다이어그램적 표현을 보여줍니다.

![image](/assets/img/2024-07-09-ReactiveProgramminginJavaGoodTimetoDie_4.png)

Fetch Data 내에서 요청을 수행하는 스레드와 데이터를 가져오는 스레드가 서로 다름을 볼 수 있습니다. 예를 들어, 웹 서비스에서 데이터를 가져오기 위한 HTTP GET 요청은 가져온 데이터를 처리하는 스레드와는 다른 스레드에서 실행됩니다. 이는 완전히 반응형이며 IO 작업 중에 블로킹을 방지하는 문제를 해결합니다. 여기에서 플랫폼 스레드를 사용하는 유일한 시나리오는 CPU 작업 중에이며 IO 중에는 사용되지 않습니다. 플랫폼 스레드 실행의 일부로는 빨간색 부분이 나타나지 않습니다.

이 개발 스타일을 사용하면 애플리케이션의 높은 확장성을 달성할 수 있습니다. 그러나 이 해결책은 너무 복잡합니다. 반응형 파이프라인을 생성하고 디버깅하고 실행하는 것은 어려운 일입니다. 그래서 이러한 개발 스타일은 매우 인기가 없는 편입니다. Spring Boot는 Reactive Style 프로그래밍에 전념한 전체 개발 스택을 제공하는데, Spring WebFlux라고 불리며 Project Reactor를 사용합니다. 이 스타일은 데이터베이스, 웹 서비스 등에 대해 비차단 동작을 제공하는 많은 라이브러리를 활용합니다.

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

# 가상 스레드

리액티브 디자인에 대한 다른 대안이 있을까요? 확실히 있습니다. Java 21이 출시되면서 오라클은 오랫동안 기다렸던 가상 스레드 기능을 소개했습니다. 이미 이야기한 바와 같이, 플랫폼 스레드의 문제점은 블로킹 동작 중에는 효율적으로 사용되지 않는다는 것입니다. 플랫폼 스레드는 기본적으로 운영 체제 스레드 주변에 얇은 래퍼(wrapper)입니다. 그리고 우리가 알다싶이, 운영 체제 스레드는 비용이 많이 듭니다.

그에 반해 가상 스레드는 JVM에서 Thread 클래스의 구현이며 가벼움입니다. 결국 다음과 같이 요약할 수 있습니다. 코드 실행에 가상 스레드를 사용할 때 CPU 동작 중에는 플랫폼 스레드(캐리어 스레드라고 함)를 사용하고 IO 동작을 만나면 캐리어 스레드를 해제합니다. JVM은 어떻게 IO 동작을 만날 때를 알까요? 이전에 언급한 대로, Java 라이브러리의 대부분 IO 동작에는 블로킹 및 논블로킹 버전이 있습니다. 가상 스레드에서 실행할 때 JVM은 자동으로 IO 동작의 논블로킹 버전을 사용하도록 전환합니다. 이 변경은 대부분의 IO 동작에 대해 핵심 Java 라이브러리 전반에 수고들여 적용되었습니다. 코드가 IO 동작을 만나면, 캐리어 스레드는 풀로 반환되고 해당 IO에 대한 데이터가 준비되면 가상 스레드가 데이터를 처리하기 위해 다른 캐리어 스레드에 재스케줄됩니다. 다시 말해, 가상 스레드에서 블로킹은 문제가 전혀 되지 않습니다. 이유는 기존 캐리어 스레드가 해제되기 때문입니다.

애플리케이션 서버에서 개발자들은 이제 사용자 요청에 대해 가상 스레드를 사용할 수 있는 옵션을 갖게 되었습니다. 이 결과로 개발자들은 기존과 같은 명령형 스타일로 개발할 수 있으면서 반응형 파이프라인을 사용할 때 얻는 확장성 이점을 얻을 수 있게 되었습니다(복잡함 없이). 다이어그램 형식으로 동기 블로킹 디자인을 보여주는 Figure 5를 참조하세요(블로킹 문제가 없음에 유의).

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

<img src="/assets/img/2024-07-09-ReactiveProgramminginJavaGoodTimetoDie_5.png" />

위 다이어그램을 살펴보세요. 사용자 요청 스레드는 가상 스레드입니다 (파란색 세로 화살표). 스레드의 빨간 부분은 더 이상 문제가 아닙니다. 왜냐하면 블로킹 작업 중에 기본적인 Carrier 스레드가 해제되기 때문에 이것이 반응형 프레임워크를 사용하는 경우와 동일한 확장성 이점을 얻게 됩니다.

# 가상 스레드와 비동기 블로킹 디자인

도표 6은 비동기 블로킹 디자인에서 가상 스레드의 사용을 다이어그래 매티칭 형태로 보여줍니다 (다시 한 번, 블로킹은 문제가 되지 않습니다). 기사에서 이전에 언급했듯이, 우리는 Java Futures를 사용할 수 있고 이를 할 수 있는 옵션이 분명히 있습니다. 그러나 Java 21은 구조화된 비동기 동작을 처리하기 위해 새로운 클래스인 StructuredTaskScope와 Subtask 몇 개를 도입했습니다. 현재 이러한 클래스들은 미리보기 모드에 있지만, 시도해 볼 가치가 있습니다.

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

![Reactive Programming in Java](/assets/img/2024-07-09-ReactiveProgramminginJavaGoodTimetoDie_6.png)

가상 스레드와 구조화된 작업 범위의 조합은 매우 강력할 것입니다. 가상 스레드는 블로킹을 무시하게 만들며, 구조화된 작업 범위는 비동기 프로그래밍을 직관적인 방식으로 처리하기 위한 더 높은 수준의 클래스를 제공할 것입니다. 왜 CompletableFuture가 전혀 필요한지 이해하기가 매우 어렵습니다.

반응형 프레임워크 대신 가상 스레드를 사용하는 것에는 많은 이점이 있습니다. 여기에 몇 가지가 있습니다.

- 명령형 스타일 개발 계속 사용 가능
- 복잡한 반응형 파이프라인을 만들 필요 없음
- 비블로킹 IO를 코드에서 직접 사용할 필요 없음
- 코딩, 디버깅 및 디자인 이해하기가 더 쉬움

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

그것은 정말 훌륭합니다.

# 개요

요약하면, Java 21에서 Virtual Threads가 소개되면서 Virtual thread에서의 블로킹은 더 이상 문제가 되지 않습니다. 개발자들은 이제 복잡한 Reactive Style 파이프라인을 만들거나 비블로킹 IO를 사용하여 고도로 확장 가능한 애플리케이션을 만들 필요가 없어졌습니다.

대안은 Java 21에서 소개된 Virtual Threads를 Java Futures나 Structured Concurrency(Java 21의 미리보기 기능) 클래스와 함께 사용하는 것입니다.
