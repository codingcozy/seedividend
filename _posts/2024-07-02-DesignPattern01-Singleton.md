---
title: "디자인 패턴 01 - 싱글톤 패턴 완벽 가이드"
description: ""
coverImage: "/assets/img/2024-07-02-DesignPattern01-Singleton_0.png"
date: 2024-07-02 22:10
ogImage: 
  url: /assets/img/2024-07-02-DesignPattern01-Singleton_0.png
tag: Tech
originalTitle: "Design Pattern 01 - Singleton"
link: "https://medium.com/@noyoncse3101/design-pattern-01-singleton-cb9db180cffe"
isUpdated: true
---




싱글턴은 한 클래스가 하나의 인스턴스만 가지도록 보장하면서 이 인스턴스에 대한 전역 액세스 포인트를 제공하는 생성 패턴입니다.

## 싱글턴 패턴 원칙

- 싱글턴 디자인 패턴은 한 클래스가 하나의 인스턴스만 갖도록 보장하며 클래스의 인스턴스화를 단일 객체로 제한해야 합니다.
- 이는 인스턴스에 대한 전역 액세스 포인트를 제공하고 다른 클래스와 컴포넌트가 싱글턴 인스턴스에 쉽게 액세스할 수 있도록 합니다.

## Java 싱글턴 패턴 구현

<div class="content-ad"></div>

싱글톤 패턴을 구현할 때 다양한 방법이 있지만 모두 공통적인 개념을 가지고 있습니다.

- 다른 클래스에서 클래스의 인스턴스화를 제한하기 위한 개인 생성자.
- 클래스의 유일한 인스턴스인 동일한 클래스의 개인 정적 변수.
- 클래스의 인스턴스를 반환하는 공용 정적 메서드. 이는 외부 세계가 싱글톤 클래스의 인스턴스를 얻기 위한 전역 액세스 포인트입니다.

# 1. 즉시 초기화

즉시 초기화에서는 싱글톤 클래스 인스턴스가 클래스 로딩 중에 생성됩니다.

<div class="content-ad"></div>

```java
public class EagerInitializedSingleton {

    private static final EagerInitializedSingleton instance = new EagerInitializedSingleton();

    // private constructor to avoid client applications using the constructor
    private EagerInitializedSingleton(){}

    public static EagerInitializedSingleton getInstance() {
        return instance;
    }
}
```

이 방법은 인스턴스가 항상 사용 가능하다는 것을 보장하지만 즉시 필요하지 않더라도 리소스를 소비할 수 있습니다.

## 2. Lazy initialization

게으른 초기화는 싱글톤 인스턴스의 초기화를 필요할 때까지 늦추는 방식입니다. 이 방법은 리소스를 절약합니다.

<div class="content-ad"></div>


public class LazyInitializedSingleton {

    private static LazyInitializedSingleton instance;

    private LazyInitializedSingleton(){}

    public static LazyInitializedSingleton getInstance() {
        if (instance == null) {
            instance = new LazyInitializedSingleton();
        }
        return instance;
    }
}


이 구현은 단일 스레드 환경에서는 잘 작동합니다. 그러나 다중 스레드 시스템의 경우, 여러 스레드가 동시에 if 문 안에 있을 때 문제를 일으킬 수 있습니다. 싱글톤 패턴이 깨지고 두 스레드가 싱글톤 클래스의 서로 다른 인스턴스를 가져올 수 있습니다.

# 3. 스레드 안전한 싱글톤

위의 예(Lazy initialization)는 싱글톤 패턴이 스레드 안전하지 않습니다. 스레드 안전을 보장하기 위해 다음 접근 방식을 사용할 수 있습니다.


<div class="content-ad"></div>

- getInstance() 메서드를 동기화합니다. 아래는 구현 코드입니다

```js
public class ThreadSafeSingleton {

    private static ThreadSafeSingleton instance;

    private ThreadSafeSingleton(){}

    public static synchronized ThreadSafeSingleton getInstance() {
        if (instance == null) {
            instance = new ThreadSafeSingleton();
        }
        return instance;
    }

}
```

## 장점

- 스레드 안전이 보장됩니다.
- 클라이언트 응용 프로그램은 매개변수를 전달할 수 있습니다.
- 지연 초기화가 달성되었습니다.

<div class="content-ad"></div>

## 단점

- 잠금 오버헤드 때문에 성능이 느립니다.
- 인스턴스 변수가 초기화된 후에는 필요하지 않은 동기화가 있습니다.

2. if 블록 내에서 synchronized 블록을 사용하십시오. 이중 확인 락(Double Checked Locking)

```java
public class ThreadSafeSingleton {

    private static ThreadSafeSingleton instance;

    private ThreadSafeSingleton(){}
  
    public static ThreadSafeSingleton getInstanceUsingDoubleLocking() {
        if (instance == null) {
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) {
                    instance = new ThreadSafeSingleton();
                }
            }
        }
        return instance;
    }
}
```

<div class="content-ad"></div>

## 장점

- 스레드 안전이 보장됩니다.
- 클라이언트 애플리케이션이 인수를 전달할 수 있습니다.
- Lazy initialization이 달성됩니다.
- 변수가 null인 경우 처음 몇 개의 스레드에만 적용되며 동기화 오버헤드가 최소화됩니다.

## 단점

- 추가적인 if 조건문이 필요합니다.

<div class="content-ad"></div>

# 싱글톤 패턴의 장점

- 단일 인스턴스 생성
- 전역 액세스
- 게으른 초기화
- 스레드 안전성

# 싱글톤 패턴의 단점

- 전역 상태: 전역 상태를 도입하면 시스템 동작 추적이 복잡해지고 잠재적으로 버그를 발생시킬 수 있습니다.
- 강한 결합: 싱글톤에 직접 액세스하는 것은 강한 결합을 초래할 수 있으며, 향후 변경이나 대체가 어려워질 수 있습니다.
- 테스트 도전: 전역 액세스는 단위 테스트를 복잡하게 만듭니다.
- 라이프사이클 관리: 싱글톤 라이프사이클 관리, 특히 재초기화는 복잡할 수 있습니다.
- 확장성 제한: 싱글톤 클래스를 확장하거나 수정하는 것은 제한된 생성으로 인해 도전적일 수 있습니다.
- 단일 책임 원칙 위반: 싱글톤 클래스에는 두 가지 책임이 있습니다. 하나는 단일 인스턴스 생성이고 다른 하나는 작업 실행입니다. 그래서 단일 책임 원칙을 위반합니다.

<div class="content-ad"></div>

# 실제 싱글톤 예제 몇 가지:

- Logger: 시스템 전체에 걸쳐 로깅 작업을 관리합니다.
- Database Connection: 데이터베이스 상호 작용을 위한 공유 연결을 제공합니다.
- Configuration manager: 애플리케이션 설정 및 속성을 중앙 집중화합니다.
- Cache manager: 성능을 개선하기 위해 캐싱 작업을 처리합니다.
- Thread pool: 동시 프로그래밍에서 스레드 생성 및 실행을 관리합니다.

# 참고:

- https://www.digitalocean.com/community/tutorials/thread-safety-in-java-singleton-classes
- https://refactoring.guru/design-patterns/singleton
- https://belatrix.globant.com/us-en/blog/the-singleton-design-pattern/

<div class="content-ad"></div>

읽어 주셔서 감사합니다. 의견이나 제안이 있으시면 아래 댓글로 자유롭게 남겨주세요.

트위터, GitHub, 그리고 링크드인에서 저를 팔로우하실 수 있습니다.

안녕히 가세요! 👋