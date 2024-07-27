---
title: "waitnotify 대신 ReentrantLock 사용 방법"
description: ""
coverImage: "/assets/img/2024-07-12-UsingRenerantLockinsteadofwaitnotify_0.png"
date: 2024-07-12 21:09
ogImage: 
  url: /assets/img/2024-07-12-UsingRenerantLockinsteadofwaitnotify_0.png
tag: Tech
originalTitle: "Using RenerantLock instead of wait notify"
link: "https://medium.com/itnext/using-renerantlock-instead-of-wait-notify-cadf4510e390"
---


지난 주에는 Java 동기화 유틸리티에 관한 기사를 작성해보았어요! 📝 그리고 Java에서 다양한 동기화 기술을 사용하여 멀티스레드 파일 다운로더를 구현해 보았어요. 

해당 기사에서는 wait()/notify(), CountDownLatch, CyclicBarrier를 사용하여 다운로더의 3가지 버전을 구현했어요. 이번에는 wait()/notify()를 사용한 첫 번째 구현을 개선하고, RenerantLock와 Condition을 사용하여 구현하여, 스레드 동기화를 위해 wait()/notify() 대신 이 두 가지 현대적인 대안 API에 대해 더 자세히 알아볼 거예요!

![이미지](/assets/img/2024-07-12-UsingRenerantLockinsteadofwaitnotify_0.png)

# 처음으로: 요약

<div class="content-ad"></div>

세부 사항에 들어가기 전에, wait()/notify()을 사용하여 다운로더의 첫 번째 구현을 간단히 되짚어 보겠습니다. 해당 소스 코드는 이 GitHub 저장소에 있고, wait()/notify()를 사용하는 구현을 볼 수 있는 First implementation: Don’t use Java synchronization utilities라는 전용 커밋을 찾을 수 있습니다:

```js
public class Downloader {
    private static final int NUMBER_OF_PARTS = 4;
    private static final long TIMEOUT_MILLIS = 4000;
    private static final List<TaskInfo> TASK_INFO_LIST = Collections.synchronizedList(new ArrayList<>(List.of(
//            new TaskInfo(100, true),
//            new TaskInfo(100, true),
//            new TaskInfo(100, true),
//            new TaskInfo(100, true)
    )));

    private static int completedParts = 0;
    private static boolean errorOccurred = false;

    public static void main(String[] args) {
        cleanUp();
        System.out.println("---Cleanup finished---------------");

        final List<Thread> downloadTasks = new ArrayList<>();
        final Object lock = new Object();

        for (int part = 1; part <= NUMBER_OF_PARTS; part++) {
            Thread thread = new Thread(new DownloadTask(part, lock));
            downloadTasks.add(thread);
            thread.start();
        }

        long startTime = System.currentTimeMillis();

        synchronized (lock) {
            while (completedParts < NUMBER_OF_PARTS && System.currentTimeMillis() - startTime < TIMEOUT_MILLIS && !errorOccurred) {
                try {
                    lock.wait(TIMEOUT_MILLIS - (System.currentTimeMillis() - startTime));
                } catch (InterruptedException e) {
                    System.out.println("Timeout or error occurred: " + e.getClass().getName());
                }
            }

            if (completedParts < NUMBER_OF_PARTS || errorOccurred) {
                System.out.println("Timeout reached or error occurred. Not all parts were downloaded.");
                downloadTasks.stream()
                        .filter(Thread::isAlive)
                        .forEach(Thread::interrupt);
            } else {
                combineParts();
                System.out.println("File download complete.");
            }
        }

        deleteParts();
    }

    static class DownloadTask implements Runnable {
        private final int partId;
        private final Object lock;

        public DownloadTask(int partId, Object lock) {
            this.partId = partId;
            this.lock = lock;
        }

        @Override
        public void run() {
            boolean downloaded = downloadPart();

            synchronized (lock) {
                if (downloaded) {
                    completedParts++;
                    lock.notifyAll();
                }else {
                    errorOccurred = true;
                    lock.notifyAll();
                }
            }
        }

        private boolean downloadPart() {
            try (BufferedWriter writer = new BufferedWriter(new FileWriter("part_" + partId + ".txt"))) {
                writer.write("Content of part " + partId);
                var taskInfo = TASK_INFO_LIST.isEmpty()
                        ? new TaskInfo(new Random().nextLong(5000), true)
                        : TASK_INFO_LIST.removeFirst();
                System.out.println("Part " + partId + " download started (" + taskInfo + " ).");
                Thread.sleep(taskInfo.waitTime);
                return checkTaskStatus(taskInfo.completionStatus);
            } catch (IOException | InterruptedException e) {
                if (e instanceof InterruptedException) {
                    System.out.println("Download of part " + partId + " was interrupted.");
                } else {
                    e.printStackTrace();
                }
                return false;
            }
        }

        private boolean checkTaskStatus(boolean status) {
            if (!status) {
                System.out.println("Part " + partId + " failed.");
            } else {
                System.out.println("Part " + partId + " downloaded.");
            }

            return status;
        }
    }
    // other methods
}
// other methods and classes
```

이 구현에서는 synchronized 블록과 wait()/notify()을 사용하여 쓰레드를 동기화했습니다. 모든 쓰레드(main 쓰레드 및 작업자) 사이에서 모니터로 사용되는 lock 객체를 공유합니다:

- Main 쓰레드는 경과 시간, 완료된 다운로드 파트 및 오류 상태를 계속 확인한 후, lock 객체(타임아웃과 함께)에서 DownloadTask에서 알림을 받거나 타임아웃이 발생할 때까지 기다립니다.
- 각 DownloadTask 쓰레드는 파트의 다운로드 성공 여부 또는 실패로 종료됩니다. 어느 경우든, lock 객체에서 notifyAll()을 호출하여 Main 쓰레드를 알리고 공유 상태 필드(completedParts 또는 errorOccurred)를 업데이트합니다.

<div class="content-ad"></div>

# wait/notify 대신 Lock 및 Condition 사용하기

synchronized 블록과 wait()/notify()은 동기화 및 가드된 블록을 정의하는 데에는 적합하지 않고 원시적인 도구로 간주됩니다. Locks를 원시 타입 대신 사용하는 것의 장점은 다음과 같습니다:

- Lock는 인터페이스이기 때문에 쉽게 목적체로 사용하고 테스트를 작성할 수 있습니다.
- Lock을 사용하면 lock() 및 unlock() 메서드를 다른 메서드에서 호출하여 Lock을 확장할 수 있지만 synchronized 블록은 메서드 내에 있어야 합니다.
- Lock API는 lockInterruptibly() 또는 tryLock()과 같은 메서드를 제공하여 synchronized 블록보다 더 유연하게 Lock을 사용할 수 있게 합니다.

Lock 인터페이스에는 Locking (lock()) 및 Unlocking (unlock())에 중요한 두 가지 메서드가 있으며 synchronized 블록 대신 사용할 수 있습니다. Lock의 newCondition() 메서드는 wait()/notify() 대신 사용할 수 있는 Condition 객체를 반환하며 Condition 클래스의 동등한 메서드는 await()와 signal()입니다.

<div class="content-ad"></div>

우리는 Java Lock API를 사용하여 다운로더를 다시 구현할 수 있어요:

```java
public class Downloader {
    private static final int NUMBER_OF_PARTS = 4;
    private static final long TIMEOUT_MILLIS = 4000;
    private static final List<TaskInfo> TASK_INFO_LIST = Collections.synchronizedList(new ArrayList<>(List.of(
            new TaskInfo(100, true),
            new TaskInfo(2000, true),
            new TaskInfo(3500, true),
            new TaskInfo(300, true)
    )));

    private static AtomicInteger completedParts = new AtomicInteger(0);
    private static AtomicBoolean errorOccurred = new AtomicBoolean(false);

    public static void main(String[] args) {
        cleanUp();
        System.out.println("---Cleanup finished---------------");

        final List<Thread> downloadTasks = new ArrayList<>();
        ReentrantLock lock = new ReentrantLock();
        Condition condition = lock.newCondition();

        for (int part = 1; part <= NUMBER_OF_PARTS; part++) {
            Thread thread = new Thread(new DownloadTask(part, lock, condition));
            downloadTasks.add(thread);
            thread.start();
        }

        long startTime = System.currentTimeMillis();

        try {
            lock.lock();
            while (completedParts.get() < NUMBER_OF_PARTS && System.currentTimeMillis() - startTime < TIMEOUT_MILLIS && !errorOccurred.get()) {
                try {
                    condition.await(TIMEOUT_MILLIS - (System.currentTimeMillis() - startTime), TimeUnit.MILLISECONDS);
                } catch (InterruptedException e) {
                    System.out.println("Timeout or error occurred: " + e.getClass().getName());
                }
            }

            if (completedParts.get() < NUMBER_OF_PARTS || errorOccurred.get()) {
                System.out.println("Timeout reached or error occurred. Not all parts were downloaded.");
                downloadTasks.stream()
                        .filter(Thread::isAlive)
                        .forEach(Thread::interrupt);
            } else {
                combineParts();
                System.out.println("File download complete.");
            }
        } finally {
            lock.unlock();
        }

        deleteParts();
    }

    static class DownloadTask implements Runnable {
        private final int partId;
        private final ReentrantLock lock;
        private final Condition condition;

        public DownloadTask(int partId, ReentrantLock lock, Condition condition) {
            this.partId = partId;
            this.lock = lock;
            this.condition = condition;
        }

        @Override
        public void run() {
            boolean downloaded = downloadPart();

            try {
                lock.lock();

                if (downloaded) {
                    completedParts.incrementAndGet();
                    condition.signalAll();
                } else {
                    errorOccurred.set(true);
                    condition.signalAll();
                }
            } finally {
                lock.unlock();
            }
        }

        private boolean downloadPart() {
            try (BufferedWriter writer = new BufferedWriter(new FileWriter("part_" + partId + ".txt"))) {
                writer.write("Content of part " + partId);
                var taskInfo = TASK_INFO_LIST.isEmpty()
                        ? new TaskInfo(new Random().nextLong(5000), true)
                        : TASK_INFO_LIST.removeFirst();
                System.out.println("Part " + partId + " download started (" + taskInfo + " ).");
                Thread.sleep(taskInfo.waitTime);
                return checkTaskStatus(taskInfo.completionStatus);
            } catch (IOException | InterruptedException e) {
                if (e instanceof InterruptedException) {
                    System.out.println("Download of part " + partId + " was interrupted.");
                } else {
                    e.printStackTrace();
                }
                return false;
            }
        }

        private boolean checkTaskStatus(boolean status) {
            if (!status) {
                System.out.println("Part " + partId + " failed.");
            } else {
                System.out.println("Part " + partId + " downloaded.");
            }

            return status;
        }
    }
}
```

# 마무리

Lock API를 사용하니 더 안정적이고 코드의 흐름 및 로직을 더 효율적으로 조절할 수 있어요. 하지만 Lock API는 더 많은 가능성을 제공하지만 일부 경우에는 synchronized 블록과 wait()/notify()에 비해 약간 덜 효율적일 수 있다는 점을 잊지 말아야 해요.

<div class="content-ad"></div>

🧵 이전 게시물:

- 🌐 자바 동기화 유틸리티를 사용한 다중 스레드 파일 다운로더 구현
- 🔒 자바에서의 StampedLock을 사용한 낙관적 락

🙏 읽어주셔서 감사합니다. 저와 소통하고 싶으시면 아래에서 저에게 연락할 수 있습니다:

🖊️ Medium | 🐦 Twitter | ❇️ DevTips Newsletter