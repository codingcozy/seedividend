---
title: "Java에서 Cancelable CountDownLatch 사용 방법"
description: ""
coverImage: "/assets/img/2024-07-30-CancelableCountDownLatchinJava_0.png"
date: 2024-07-30 17:12
ogImage:
  url: /assets/img/2024-07-30-CancelableCountDownLatchinJava_0.png
tag: Tech
originalTitle: "Cancelable CountDownLatch in Java"
link: "https://medium.com/itnext/cancelable-countdownlatch-in-java-2b960fb77403"
isUpdated: true
---

최근에 아주 동기화 유틸리티에 대한 시리즈 기사를 쓰기 시작했어요. 이 가상의 멀티스레드 파일 다운로더를 구현하여 다양한 버전의 다운로더를 만들었습니다. 그중에는 wait() 및 notifyAll(), RenerantLock, CyclicBarrier, 그리고 Countdownlatch를 사용한 버전들이 있어요.

이 기사에서는 Countdownlatch 버전을 개선하고 멀티스레드 다운로더에서 Fail fast 기능을 가지도록 Countdownlatch를 취소할 수 있게 만들 것입니다.

![image](/assets/img/2024-07-30-CancelableCountDownLatchinJava_0.png)

# 첫 번째: 요약

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

이전에 다뤘던 멀티 스레드 파일 다운로더와 관련된 기사와 비슷하게, 시작하기 전에 이전 구현을 검토하고 어떤 점을 개선하고 싶은지 살펴봅시다. 멀티 스레드 파일 다운로더 샘플의 소스 코드는 이 GitHub 저장소에 있으며, CyclicBarrier를 사용하는 구현을 볼 수 있는 Second implementation: Using Java synchronization utilities라는 전용 커밋을 찾을 수 있습니다.

## 왜 CountdownLatch를 사용하지 않았을까요?

첫 번째 기사에서 메인 및 다운로더 스레드 간의 동기화 도구로 CyclicBarrier 대신 CountdownLatch를 사용하지 않은 이유를 설명했습니다.

# CountDownLatch를 취소 가능하게 만들기

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

취소 가능한 Countdownlatch를 구현하는 다양한 방법이 있습니다. 아이디어를 얻으려면 스택 오버플로 질문을 읽어보세요. 일반적으로 우리는 CancelableCountDownLatch 또는 AbortableCountDownLatch라는 새로운 클래스를 소개해야 합니다. 이 새로운 클래스를 구현하는 방법은 다음 중 하나일 수 있습니다:

- 내부적으로 Countdownlatch를 사용하는 래퍼 클래스를 구현합니다.
- CountDownLatch에서 확장된 새 클래스를 구현합니다.

## 취소 가능한 CountDownLatch를 가지고 있는 새로운 래퍼 클래스 소개

대부분의 경우에는 상속 대신 구성을 선호하기 때문에, 첫 번째 방법을 권장하고 Countdownlatch를 위한 래퍼인 CancelableCountDownLatch라는 새 클래스를 만들겠습니다:

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
package com.saeed;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicBoolean;

public class CancelableCountDownLatch {
    private final AtomicBoolean canceled = new AtomicBoolean(false);
    private final CountDownLatch latch;

    public CancelableCountDownLatch(int count) {
        latch = new CountDownLatch(count);
    }

    public CountDownLatch getLatch() {
        return latch;
    }

    public synchronized void cancel() {
        System.out.println("Cancel callback call: fail-fast");
        if (latch.getCount() == 0)
            return;

        while (latch.getCount() > 0)
            latch.countDown();

        canceled.set(true);
    }

    public boolean isCanceled() {
        return canceled.get();
    }
}
```

이 클래스에는 취소 상태를 나타내는 boolean 필드(AtomicBoolean)와 기본 CountDownLatch 인스턴스가 있습니다.

이 클래스에는 3개의 공개 메서드가 있습니다:

- getLatch(): 필요할 때 기본 CountDownLatch를 노출합니다.
- cancel(): 이 메소드는 사실상 기본 latch의 남은 수를 카운트 다운한 다음 latch의 취소된 상태 필드를 true로 변경합니다.
- isCanceled(): latch가 취소되었는지를 확인할 수 있도록 합니다.

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

## CancelableCountDownLatch를 사용하여 다운로더를 다시 구현하기

첫 번째 기사에서의 마지막 다운로더 구현에 일부 변경 사항을 가미하면 CancelableCountDownLatch를 사용하여 다운로더를 구현할 수 있습니다:

```js
public class Downloader {
    private static final int NUMBER_OF_PARTS = 4;
    private static final long TIMEOUT_MILLIS = 4000;
    private static final List<TaskInfo> TASK_INFO_LIST = Collections.synchronizedList(new ArrayList<>(List.of(
            new TaskInfo(1000, true),
            new TaskInfo(2000, true),
            new TaskInfo(4700, true),
            new TaskInfo(100, false)
    )));

    public static void main(String[] args) {
        cleanUp();
        System.out.println("---Cleanup finished---------------");

        ExecutorService executorService = Executors.newFixedThreadPool(NUMBER_OF_PARTS);
        CancelableCountDownLatch latch = new CancelableCountDownLatch(NUMBER_OF_PARTS);


        for (int i = 1; i <= NUMBER_OF_PARTS; i++) {
            executorService.submit(new DownloadTask(i, latch));
        }

        try {
            if (latch.getLatch().await(TIMEOUT_MILLIS, TimeUnit.MILLISECONDS) && !latch.isCanceled()) {
                combineParts();
                System.out.println("File download complete.");
            } else {
                if (latch.isCanceled()) {
                    System.out.println("Latch is canceled");
                } else {
                    System.out.println("Timeout occurred, uncompleted tasks: " + latch.getLatch().getCount());
                }
            }
        } catch (InterruptedException e) {
            System.out.println("Error occurred: " + e.getClass().getName());
            latch.cancel();
        } finally {
            executorService.shutdownNow();
            deleteParts();
        }
    }

    static class DownloadTask implements Runnable {
        private int partId;
        private CancelableCountDownLatch latch;

        public DownloadTask(int partId, CancelableCountDownLatch latch) {
            this.partId = partId;
            this.latch = latch;
        }

        @Override
        public void run() {
            downloadPart();
            latch.getLatch().countDown();
        }

        private void downloadPart() {
            try (BufferedWriter writer = new BufferedWriter(new FileWriter("part_" + partId + ".txt"))) {
                writer.write("Content of part " + partId);
                var taskInfo = TASK_INFO_LIST.isEmpty()
                        ? new TaskInfo(new Random().nextLong(5000), true)
                        : TASK_INFO_LIST.removeFirst();
                System.out.println("Part " + partId + " download started (" + taskInfo + " ).");
                Thread.sleep(taskInfo.waitTime);
                checkTaskStatus(taskInfo.completionStatus);
            } catch (IOException | InterruptedException e) {
                if (e instanceof InterruptedException) {
                    System.out.println("Download of part " + partId + " was interrupted.");
                } else {
                    e.printStackTrace();
                }
            }
        }

        private void checkTaskStatus(boolean status) {
            if (!status) {
                latch.cancel();
                System.out.println("Part " + partId + " failed.");
            } else {
                System.out.println("Part " + partId + " downloaded.");
            }
        }
    }
    // other methods
}
// other methods and classes
```

이 구현에서 주목할 점이 있습니다:

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

- 다운로드 작업에 실패하거나 주 스레드에서 오류가 발생할 때는 항상 latch.cancel() 메서드를 호출해야 합니다.
- 주 스레드에서는 latch.isCanceled() 메서드를 호출하여 latch 취소 상태를 확인해야 합니다.

# 마무리

Countdownlatch를 취소 가능하게 만들어서 멀티스레드 파일 다운로더에서 빠르게 실패하는 기능을 얻었습니다. 그러나 이 시리즈의 첫 번째 기사에서 언급했듯이, 우리의 필요와 문제 설명에 맞는 올바른 Java 동기화 유틸리티를 선택하는 것이 매우 중요합니다.

🧵 Java 동시성 시리즈:

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

🙏 읽어 주셔서 감사합니다. 아래 연락처로 연락하실 수 있습니다:

🖊️ 미디엄 | 🐦 트위터 | 🗞️ 개발 팁 뉴스레터
