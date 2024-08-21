---
title: "JAVA 쓰레드가 start를 두 번 호출하면 어떻게 될까"
description: ""
coverImage: "/assets/img/2024-07-09-JAVAWhatHappensWhenaThreadCallsStartTwice_0.png"
date: 2024-07-09 21:26
ogImage:
  url: /assets/img/2024-07-09-JAVAWhatHappensWhenaThreadCallsStartTwice_0.png
tag: Tech
originalTitle: "JAVA: What Happens When a Thread Calls Start Twice?"
link: "https://medium.com/@haiou-a/java-what-happens-when-a-thread-calls-start-twice-7b85ddd22c05"
isUpdated: true
---

![이미지](/assets/img/2024-07-09-JAVAWhatHappensWhenaThreadCallsStartTwice_0.png)

# 소개

주말에 Java 백엔드 개발 엔지니어 포지션 면접에 참석한 적이 있습니다.

면접관은 Java 멀티스레딩에 관련된 질문을 폭풍처럼 던져왔어요. 쓰레드 생성 방법, 쓰레드 상태, 상태 전이, 쓰레드 안전성 보장 방법, 다양한 락의 차이, 사용 방법 등에 대해 물어봤습니다.

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

열심히 자료를 외워서 대부분의 질문에 대답할 수 있었어요. 그런데 면접관이 마지막으로 한 질문은 회고적으로 간단했지만, 그 당시에는 전혀 몰랐어요.

맨 처음에는 Thread 소스 코드를 봤느냐고 물으셨고, 자신있게 "네"라고 대답했어요. 그리고 이 질문을 넘겨받았는데요. 어떻게 대답할 거라고요?

# Thread 시작하기

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

많은 면접 질문이 자바에서 스레드를 생성하는 방법으로 3, 4가지 이상이 있다고 언급하지만, 실제로 스레드를 생성하는 유일한 방법은 new Thread().start()을 사용하는 것입니다.

【코드 예시 1】

```java
public class Test {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {});
        System.out.println(thread.getName()+":"+thread.getState());
        thread.start();
        System.out.println(thread.getName()+":"+thread.getState());
    }
}
```

출력:

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
Thread-0:NEW
Thread-0:RUNNABLE
```

스레드가 생성되면 NEW 상태에 있습니다. start() 메서드를 호출하면 스레드가 RUNNABLE 상태로 이동됩니다.

# RUNNABLE 상태의 스레드에 start() 호출하기

위의 테스트 코드를 기반으로 start() 메서드를 다시 호출해보겠습니다.

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
<img src="/assets/img/2024-07-09-JAVAWhatHappensWhenaThreadCallsStartTwice_1.png" />

【코드 예시 2】

public class Test {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {});
        System.out.println(thread.getName()+":"+thread.getState());
        // start 메서드 처음 호출
        thread.start();
        System.out.println(thread.getName()+":"+thread.getState());
        // start 메서드 두 번째 호출
        thread.start();
        System.out.println(thread.getName()+":"+thread.getState());
    }
}

출력:
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

```js
Thread-0:새로 만들어짐
Thread-0:실행 가능
main 스레드에서 예외 발생: java.lang.IllegalThreadStateException
    at java.lang.Thread.start(Thread.java:708)
    at com.javabuild.server.pojo.Test.main(Test.java:17)
```

start를 두 번 호출하면 IllegalThreadStateException이 발생합니다.

이게 왜 그럴까요? start 소스 코드를 자세히 살펴봅시다!

【소스 코드 분석 1】

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

```java
// synchronized 키워드를 사용하면이 메서드가 스레드로부터 안전하다는 것이 보장됩니다.
public synchronized void start() {
    // threadStatus != 0은이 스레드가 이미 시작되었거나 완료되었음을 나타냅니다.
    // 스레드를 다시 시작하려고하면 IllegalThreadStateException이 발생합니다.
    if (threadStatus != 0)
        throw new IllegalThreadStateException();

    // 현재 스레드 그룹에 이 스레드를 추가합니다.
    group.add(this);

    // 스레드 시작이 성공적으로 진행되었는지를 기록하는 변수를 선언합니다.
    boolean started = false;
    try {
        // Native 메소드를 사용하여이 스레드를 시작합니다.
        start0();
        // 예외가 발생하지 않으면, started가 true로 설정되어 스레드가 성공적으로 시작되었음을 나타냅니다.
        started = true;
    } finally {
        // try 블록이 예외를 throw 하든 말든, finally 블록은 항상 실행됩니다.
        try {
            // 스레드가 성공적으로 시작되지 않은 경우, 이 스레드를 스레드 그룹에서 제거합니다.
            if (!started) {
                group.threadStartFailed(this);
            }
        } catch (Throwable ignore) {
            // 제거 중 예외가 발생한 경우, 무시됩니다.
        }
    }
}
```

스레드가 이미 시작되었거나 완료되었음을 나타내는 threadStatus가 0이 아닌 경우, IllegalThreadStateException이 발생할 수 있습니다.

start 소스 코드에 중단점을 설정하고 첫 번째 start 호출을 따라가면 이 지점에서 예외가 throw되지 않는 것을 확인할 수 있습니다.

![그림](/assets/img/2024-07-09-JAVAWhatHappensWhenaThreadCallsStartTwice_2.png)

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

이 시점에서 threadStatus가 0인 것으로 나타내어 thread가 NEW 상태임을 알 수 있습니다. 중단점을 설정한 후, native method인 start0()에 도달하면 threadStatus가 5로 변하여 thread가 RUNNABLE 상태임을 나타냅니다. 이제 두 번째 start 호출을 따라 진행해 봅시다.

![image](/assets/img/2024-07-09-JAVAWhatHappensWhenaThreadCallsStartTwice_3.png)

이 시점에서 threadStatus가 5이므로 0과 같지 않은 조건을 충족하게 됩니다. 따라서 IllegalThreadStateException이 발생하게 됩니다!

# TERMINATED Thread에 Start 호출하기

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
public class Test {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {});
        thread.start();
        Thread.sleep(1000);
        System.out.println(thread.getName() + ":" + thread.getState());
        thread.start();
        System.out.println(thread.getName() + ":" + thread.getState());
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

```js
Thread-0:TERMINATED
Exception in thread "main" java.lang.IllegalThreadStateException
    at java.lang.Thread.start(Thread.java:708)
    at com.javabuild.server.pojo.Test.main(Test.java:17)
```

여기서 0이 아닌 조건이 다시 충족되어 IllegalThreadStateException이 발생했습니다!

실제로 state 메서드의 소스 코드를 들여다봐서 다른 스레드 상태 뒤에 있는 로직을 볼 수 있습니다.

【소스 코드 분석 2】

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

```java
// Thread.getState 메서드 소스 코드:
public State getState() {
    // 현재 스레드 상태를 가져옵니다.
    return sun.misc.VM.toThreadState(threadStatus);
}

// sun.misc.VM 소스 코드:
// 스레드 상태 값과 4를 비트 AND 연산한 결과가 0이 아니면, 스레드는 RUNNABLE 상태에 있습니다.
// 스레드 상태 값과 1024를 비트 AND 연산한 결과가 0이 아니면, 스레드는 BLOCKED 상태에 있습니다.
// 스레드 상태 값과 16을 비트 AND 연산한 결과가 0이 아니면, 스레드는 WAITING 상태에 있습니다.
// 스레드 상태 값과 32를 비트 AND 연산한 결과가 0이 아니면, 스레드는 TIMED_WAITING 상태에 있습니다.
// 스레드 상태 값과 2를 비트 AND 연산한 결과가 0이 아니면, 스레드는 TERMINATED 상태에 있습니다.
// 마지막으로, 스레드 상태 값과 1을 비트 AND 연산한 결과가 0이면, 스레드는 NEW 상태에 있고, 그렇지 않으면, 스레드는 RUNNABLE 상태에 있습니다.
public static State toThreadState(int var0) {
    if ((var0 & 4) != 0) {
        return State.RUNNABLE;
    } else if ((var0 & 1024) != 0) {
        return State.BLOCKED;
    } else if ((var0 & 16) != 0) {
        return State.WAITING;
    } else if ((var0 & 32) != 0) {
        return State.TIMED_WAITING;
    } else if ((var0 & 2) != 0) {
        return State.TERMINATED;
    } else {
        return (var0 & 1) == 0 ? State.NEW : State.RUNNABLE;
    }
}
```

# 요약

오늘은 여기까지입니다. 한편, 이것은 단지 간단하고 작은 세부사항입니다.

이것을 쓴 이유는 모두에게 Java 스레드에 관한 작은 세부사항을 공유하는 것뿐만 아니라, 면접 준비를 하는 분들에게 세심하게 준비할 것을 권장하기 위해서입니다. 소스 코드를 더 읽어보고, 왜인지 스스로에게 물어보고, 답을 찾아보세요. Java 개발은 피상적일 수 없습니다.
