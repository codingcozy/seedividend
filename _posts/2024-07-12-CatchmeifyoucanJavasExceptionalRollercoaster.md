---
title: "Catch me if you can Java의 예외 처리 롤러코스터"
description: ""
coverImage: "/assets/img/2024-07-12-CatchmeifyoucanJavasExceptionalRollercoaster_0.png"
date: 2024-07-12 21:14
ogImage: 
  url: /assets/img/2024-07-12-CatchmeifyoucanJavasExceptionalRollercoaster_0.png
tag: Tech
originalTitle: "Catch me if you can: Java’s Exceptional Rollercoaster"
link: "https://medium.com/javarevisited/catch-me-if-you-can-javas-exceptional-rollercoaster-3b527e62904f"
isUpdated: true
---





![CatchmeifyoucanJavasExceptionalRollercoaster](/assets/img/2024-07-12-CatchmeifyoucanJavasExceptionalRollercoaster_0.png)

자바 개발자는 재미있고 쉽다고 하죠. 자바는 강력하고 안전하며 안정적이라고 하죠. 그러나 처음 예외를 만날 때 모든 이 마법이 사라진다고 하죠. 그리고 그것에 익숙해질 수가 없어요. 수많은 시간을 디버깅하고 StackOverflow를 찾아보며 테스트를 만들어 예외를 잡으려고 노력하다가 마침내 성공했을 때 너무 지칩니다. 제가 경험한 예외 목록을 준비했습니다.

# NullPointerException (NPE)

그것, 유명한 NPE입니다! 애플리케이션이 null 값을 가진 객체 참조를 사용하려고 시도했음을 나타냅니다. 다시 말해, null인 객체의 메서드를 호출할 때 발생합니다.


<div class="content-ad"></div>

예를 들어, 아직 `ArrayList`이 null인 상태에서 `arrayList.get(i)`를 호출하거나, `new ArrayList``()`를 호출한 적이 없을 때 발생합니다. 또는 아직 문자열이 null인 상태에서 `string.toUpperCase()`을 호출할 때도 마찬가지입니다.

이것은 아마도 Java에서 가장 흔한 런타임 예외입니다. "예기치 않은" 것은 아니지만, 명확한 컨텍스트가 제공되지 않을 때 디버깅하는 것이 귀찮을 수 있습니다.

널포인트 익셉션(NPE)로 인해 잠 못 이루는 밤을 몇 번이나 보냈나요?

# ArrayIndexOutOfBoundsException

<div class="content-ad"></div>

자바를 배운 지 얼마 되지 않은 사람들에게는 이것이 매우 잘 알려진 것이라고 생각해요. 배열을 계산하거나 행렬 과제를 해결하거나 알고리즘 문제를 풀 때 항상 마주치게 되는 오류죠.

이 오류는 배열 요소에 접근할 때 배열 범위를 벗어나는 인덱스를 사용하려고 시도했을 때 발생합니다. 안심해요, 모두가 한 번쯤은 겪어봤을 거예요. 하지만 이것은 당신의 인내심을 단련하기에 좋은 기회랍니다!

# OutOfMemoryError: PermGen Space

요 정도면 아주 특별한 경우이며, 요즘에는 거의 만나기 힘들어요! 그래서 이것은 제 컬렉션 속 보물인 거죠 :)

<div class="content-ad"></div>

자바 8 이전에는 Permanent Generation(PermGen) 공간이 힙의 고정 크기 부분으로 사용되어 클래스 메타데이터와 정적 요소에 사용되었습니다. 계속해서 다시 시작하지 않고 배포를 진행하면 이 공간이 가득 차게 될 수 있습니다. 이 오류는 JVM이 PermGen 섹션에서 메모리 부족 상태에 빠졌음을 나타냅니다. 이는 종종 너무 많은 클래스나 너무 큰 클래스가 로드되어 발생할 수 있습니다.

# OutOfMemoryError: Java heap space

당신의 애플리케이션 객체들이 할당된 힙 공간을 모두 소비하고 가비지 컬렉터가 더 이상 공간을 확보할 수 없을 때, Java는 이 오류를 발생시킵니다. 이는 메모리 누수에서 발생할 수도 있고, 애플리케이션이 필요로하는 메모리 양을 과소평가한 경우에도 발생할 수 있습니다.

한 가지 이야기를 해 줄게요. 한 번 레거시 애플리케이션을 지원했었어요. 이 애플리케이션은 데이터베이스 전체를 캐시에 로드하고 몇 가지 규칙에 따라 집계한 후 UI에 집계된 데이터를 제공했었습니다. 데이터량이 꾸준히 늘어나고 있었어요. 절대로 천천히 늘어나는 것이 아니라서요 :) 이 애플리케이션은 매일 이 오류를 계속 발생시켰어요. 정말, 농담 아니에요. 그렇게 짜증이 나서 제가 그 애플리케이션을 종료해 버렸답니다. 후회는 없어요, 거의 죽어가는 상태였으니까요. 자비의 행동이었다고 생각해요 :)

<div class="content-ad"></div>

# 스택 오버플로우 오류

네, 이건 클래식입니다! 잘 알려진 Q&A 프로그래머 자원 덕분에 매우 인기가 많아졌죠.

간단히 말하면, 이는 일반적으로 종료 조건을 충족시키지 못하는 잘못 설계된 재귀 호출의 결과입니다. 이는 JVM이 응용 프로그램 재귀가 너무 깊게 들어가 있다는 것을 나타내는 방법입니다. 무서우면서도 짜증나는 오류일지라도, NPE보다 고치고 잡기 쉽습니다.

예를 들어, 클라이언트가 악의적으로든 버그로든 깊게 중첩된 JSON을 보낸다고 상상해보세요.

<div class="content-ad"></div>

귀하의 재귀 논리는 적절한 확인 절차 없이 중첩 구조로 계속 깊이 들어가고 있습니다.

```java
public class JsonProcessor {

    public void processJson(Map<String, Object> jsonMap) {
        // 현재 수준의 JSON 처리
        // ... 현재 맵을 처리하는 논리 ...

        // 그런 다음 중첩된 맵(중첩된 JSON 객체를 나타냄)을 재귀적으로 처리합니다.
        for (Object value : jsonMap.values()) {
            if (value instanceof Map) {
                processJson((Map<String, Object>) value); // 재귀 호출
            }
        }
    }
}
```

클라이언트가 수천 단계로 이어지는 깊은 중첩 JSON을 보내는 경우와 같이요.

<div class="content-ad"></div>

제공되는 서비스는 JSON 구조를 처리할 때 깊은 재귀로 인해 StackOverflowError가 발생할 수 있습니다.

## ClassNotFoundException

이 예외는 애플리케이션이 Class.forName()이나 ClassLoader.loadClass()와 같은 메서드를 사용하여 런타임 중에 클래스를 로드하려고 할 때 클래스가 클래스 경로(classpath)에서 찾을 수 없을 때 발생합니다.

개발자가 이 예외를 만날 수 있는 가장 일반적인 시나리오 중 하나는 JDBC를 사용하여 데이터베이스에 연결하려고 할 때입니다.

<div class="content-ad"></div>

```js
try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydatabase", "user", "password");
} catch (ClassNotFoundException e) {
    e.printStackTrace();
}
```

위의 코드에서 MySQL JDBC 드라이버 jar 파일이 classpath에 포함되어 있지 않으면 Class.forName() 호출 시 ClassNotFoundException이 발생합니다.

# NoClassDefFoundError

이 오류는 조금 더 이상하게 발생합니다. JVM이나 ClassLoader 인스턴스가 특정 클래스를 로드하려고 시도하고 필요한 .class 파일이 컴파일 시에는 존재했지만 실행 시에는 존재하지 않은 경우에 발생합니다.

<div class="content-ad"></div>

자바니까 가능한 일들이야! 나는 네게 그 마법을 보여줄게. 내 손을 따라와 봐:

너는 여러 의존성을 가진 큰 애플리케이션을 개발하고 있고, Maven이나 Gradle과 같은 빌드 도구를 사용하고 있어. 개발 중에 라이브러리(LibraryA라고 하자)를 빌드 파일에 추가하고, 이 라이브러리에서 클래스(ClassA)를 사용하는 코드를 작성했어.

모든 것이 멋지게 컴파일되었어. 이제 배포하기 전에 누군가가 빌드를 "최적화"하기로 결정하고, LibraryA를 실제 패키지된 애플리케이션에서 실수로 제거했거나, 필요 없다고 생각하고 삭제했을 수도 있어. 아니면 LibraryA가 그대로 남아 있지만, 어떤 구성 문제 때문에 올바르게 로드되지 않는 경우도 있을 수 있어. 네 코드가 실행되어 ClassA를 사용하려고 시도할 때, 범: NoClassDefFoundError.

또 다른 전형적인 시나리오는 클래스패스에 동일한 라이브러리의 두 버전이 있는 경우야. 한 버전이 다른 것을 덮어씌우는 경우가 있다. 그렇게 되면 네가 기대한 것과 다른 버전에서 클래스가 로드될 수 있는 상황이 발생하여, 그 버전 간에 중요한 차이가 있으면 NoClassDefFoundError가 발생할 수 있어.

<div class="content-ad"></div>

# UnsupportedClassVersionError

이 오류는 자바 애플리케이션을 더 높은 버전의 자바로 컴파일한 후 오래된 버전에서 실행하려고 할 때 발생합니다. UnsupportedClassVersionError은 자바 개발자들에게 "앗, 시간이 중요하다는 거야!"라고 말해주는 우주의 방법입니다.

자바 17에서 소개된 멋진 새 기능들을 사용하고 있고 JDK 17을 사용하는 로컬 개발 환경을 설정해 둔 전자 상거래 플랫폼을 위한 웹 서비스를 개발 중인 자바 개발자로 상상해보세요. 모든 코드가 아름답게 컴파일되고 단위 테스트는 모두 통과되며 웹 서비스가 내 컴퓨터에서 완벽하게 작동합니다.

그런 다음 애플리케이션의 .jar 또는 .war 파일을 만들어 운영팀에 전달해 프로덕션 서버에 배포하도록 합니다. 안전을 위해 살짝 뒤처지거나 업데이트를 아직 진행하지 않은 운영팀이 프로덕션 서버에서 아직 JDK 11을 사용 중일 수 있습니다. 그들이 애플리케이션을 배포하자 서버가 UnsupportedClassVersionError을 던집니다.

<div class="content-ad"></div>

그게 왜 일어난 건가요?

귀하의 애플리케이션이 JDK 17로 컴파일되어 바이트 코드 버전이 생산 서버의 오래된 JVM(JDK 11)에서 이해되지 않는 문제가 발생했습니다. 생성 서버의 JVM에서 다음과 같이 알려주고 있습니다:

# ConcurrentModificationException

이는 반복자(iterator)를 사용하여 컬렉션을 반복하는 동안 컬렉션을 수정하려고 시도하고 처리되지 않을 때 발생합니다. Java 컬렉션은 fail-fast이기 때문에 반복자 생성 후에 동시 수정이 발생하면 이 예외가 발생합니다.

<div class="content-ad"></div>

채팅 어플리케이션을 만든다고 상상해봅시다. 사용자들이 다양한 채팅방에 참여할 수 있는 어플리케이션입니다. 간단히 설명하자면, 온라인 사용자 목록을 유지하는 글로벌 채팅방이 있습니다.

```js
List<User> onlineUsers = new ArrayList<>();
```

이제 몇 분마다 비활성 사용자를 확인하고 온라인 사용자 목록에서 제거하여 업데이트하는 백그라운드 작업 또는 스레드가 있다고 가정해 봅시다. 동시에 동일한 목록을 반복하며 모든 온라인 사용자에게 브로드캐스트 메시지를 보내는 다른 스레드 또는 프로세스도 있습니다.

```js
// 비활성 사용자를 제거하는 백그라운드 작업
new Thread(() -> {
    for (User user : onlineUsers) {
        if (isInactive(user)) {
            onlineUsers.remove(user);
        }
    }
}).start();

// 모든 사용자에게 브로드캐스트 메시지 보내기
for (User user : onlineUsers) {
    sendMessageToUser("여러분 안녕하세요!", user);
}
```

<div class="content-ad"></div>

상기 시나리오에서 명확한 경쟁 조건이 있습니다. 백그라운드 작업이 onlineUsers 목록을 반복하고 비활성 사용자를 제거하는 동안 브로드캐스트 루프가 메시지를 전송하면 ConcurrentModificationException이 발생할 수 있습니다.

# IllegalMonitorStateException

이 오류는 스레드가 지정된 모니터를 소유하지 않은 채로 객체의 모니터에 대기하거나 다른 스레드가 기다리고 있는 객체의 모니터에 알림을 보내려고 시도할 때 발생합니다. 이는 자주 멀티스레드 작업 중에 마주치는 조밀한 오류입니다.

자바 개발자로서 분산 시스템에서 작업 중인 상황을 상상해보세요. 사용자 지정 블로킹 큐를 구현하는 작업을 맡게 되었습니다. 이 큐는 생산자가 항목을 추가하고 소비자가 항목을 가져갈 수 있도록 하는데, 큐가 비어 있으면 소비자가 소비할 것이 있을 때까지 기다리고, 큐가 꽉 차 있으면 생산자가 생성할 공간이 생길 때까지 기다려야 합니다.

<div class="content-ad"></div>

Java의 락 (동기화된 메소드와 블록) 및 wait()과 notify() 메커니즘을 사용하여 이를 구현하기로 결정했습니다.

```java
public class CustomBlockingQueue<T> {
    private final int capacity;
    private final List<T> queue = new ArrayList<>();

    public CustomBlockingQueue(int capacity) {
        this.capacity = capacity;
    }

    public synchronized void add(T item) {
        if (queue.size() == capacity) {
            // 큐가 가득 찼을 때 생산자 스레드가 기다리도록 하는 의도입니다.
            this.wait();
        }
        queue.add(item);
        this.notify(); // 대기 중인 소비자에게 새 항목이 생겼음을 알립니다.
    }

    public synchronized T take() {
        if (queue.isEmpty()) {
            // 큐가 비어 있을 때 소비자 스레드가 기다리도록 하는 의도입니다.
            this.wait();
        }
        T item = queue.remove(0);
        this.notify(); // 대기 중인 생산자에게 이제 공간이 있는지 알립니다.
        return item;
    }
}
```

다중 스레드로 위의 코드를 실행하려고 하면 this.wait() 또는 this.notify()를 호출할 때 IllegalMonitorStateException이 발생합니다.

wait(), notify() 및 notifyAll() 메소드는 현재 스레드가 해당 객체의 모니터를 보유할 때만 해당 객체에 대해 호출할 수 있습니다. 이는 동기화된 메소드나 블록을 사용하여 획득됩니다. 위의 코드에서는 실수로 synchronized 문맥 외부에서 wait()와 notify()를 호출하였습니다.

<div class="content-ad"></div>

여기서 예외 처리를 한 번 허용하고 코드가 올바르다고 생각하지 않게끔 하지 않겠습니다:

```js
public synchronized void add(T item) throws InterruptedException {
    while (queue.size() == capacity) {
        this.wait();
    }
    queue.add(item);
    this.notify();
}

public synchronized T take() throws InterruptedException {
    while (queue.isEmpty()) {
        this.wait();
    }
    T item = queue.remove(0);
    this.notify();
    return item;
}
```

메서드 시그니처에 synchronized 키워드가 추가되었으며, 깨어난 후 조건을 다시 확인하기 위해 if 대신 while을 사용한 것에 유의해 주세요.

# 단언 오류

<div class="content-ad"></div>

이 예외는 assert 문이 실패할 때 발생합니다. Java 언어의 일부이지만 특정 실행 환경에서 당신이 단언문이 활성화되어 있다고 기대하지 않는다면 가끔 예상치 못한 상황이 발생할 수 있습니다.

번영하는 전자 상거래 플랫폼을 위한 Java 개발자로 상상해보세요. 제품 재고를 관리하는 백엔드 시스템을 개발했습니다. 제품이 판매될 때마다 해당 제품의 재고 수는 감소합니다. 안전을 위해 코드에 검사를 넣어 제품 재고 수가 영 아래로 내려가지 않도록 했습니다.

그러나 개발 중에 보조 보호 장치로 assert 문을 추가하기로 결정했습니다:

```java
public class InventoryManager {
    private Map<String, Integer> productInventory = new HashMap<>();

    public void reduceInventory(String productId, int count) {
        int currentCount = productInventory.getOrDefault(productId, 0);
        
        // 재고가 영 아래로 내려가지 않도록 확인합니다.
        if (currentCount < count) {
            currentCount = 0;
        } else {
            currentCount -= count;
        }
        
        // 안전을 위한 assert 문.
        assert currentCount >= 0: "제품의 재고가 음수가 되었습니다: " + productId;

        productInventory.put(productId, currentCount);
    }
}
```

<div class="content-ad"></div>

## 예상치 못한 충돌

테스트 및 개발 단계에서는 모든 것이 잘 진행되는 것 같았습니다. 그러나 백엔드 시스템의 새 버전을 배포한 이후 하루가 지난 어느 날, 서비스가 AssertionError(단언 오류)로 인해 충돌했다는 보고를 받았습니다.

일부 조사를 거친 후, 운영 환경의 JVM이 -ea 플래그를 사용하여 단언을 활성화한 상태로 시작되었던 모호한 이유를 깨달았습니다.

동일한 순간에 두 스레드가 동일한 상품의 재고를 줄이려고 시도하여 경합 조건을 발생시켜 해당 제품의 재고 수가 잠시간 음수가 되도록 했습니다. 이 이상한 현상을 인식하고 AssertionError를 발생시켜 서비스가 충돌하는 데에 영향을 미쳤고, 이는 세련되게 처리되지 않았습니다.

<div class="content-ad"></div>

몇 년 동안 이러한 예외를 모두 보았으니, 현재는 짜증스러울지 모르지만 각각이 소중한 학습 기회를 제공한다고 확신합니다.

제 글을 즐겁게 보셨다면, 커피 한 잔 사주시는 것도 고려해 주세요 💗 그리고 자바, 기술, 인공지능에 관한 더 많은 글이 기대되세요 👩🏻‍💻