---
title: "Java에서 불변 객체를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-30-HowtoCreateimmutableObjectsinJava_0.png"
date: 2024-07-30 17:16
ogImage: 
  url: /assets/img/2024-07-30-HowtoCreateimmutableObjectsinJava_0.png
tag: Tech
originalTitle: "How to Create immutable Objects in Java"
link: "https://medium.com/@vikas.taank_40391/how-to-create-immutable-objects-in-java-7b24bb9c0dc9"
---



![Immutable Object](/assets/img/2024-07-30-HowtoCreateimmutableObjectsinJava_0.png)

# 먼저 변경 불가능한 객체가 필요한 이유는 무엇입니까?

쓰레드 안전성: 변경 불가능한 객체는 기본적으로 쓰레드 안전하며 다른 쓰레드가 객체의 상태를 변경할 수 없습니다. 쓰레드가 객체를 변경하려고 시도하면 전혀 새로운 객체가 되어 상태 관리를 돕습니다.

캐싱에 불변 객체가 더 적합합니다. 수정 위험이없이 자유롭게 공유하고 재사용할 수 있어 성능을 향상시킵니다.


<div class="content-ad"></div>

보안: 변경 불가능한 객체들은 상태의 실수로 인한 또는 악의적인 변경을 방지함으로써 보안 장점을 제공할 수 있습니다. 예를 들어: String 클래스의 불변성은 SQL 인젝션 공격을 방지하는 데 도움이 됩니다. 변경 불가능한 문자열은 응용 프로그램의 다양한 부분 사이에서 공유될 수 있습니다.

![이미지](/assets/img/2024-07-30-HowtoCreateimmutableObjectsinJava_1.png)

# 불변 객체 생성 방법:

## 단계 1: 클래스를 final로 선언합니다: 다른 클래스가 확장하는 것을 방지합니다.

<div class="content-ad"></div>

## 단계2: 모든 필드를 final 및 private으로 만드세요. 이렇게 하면 필드가 선언 중이거나 생성자 내에서 한 번만 할당될 수 있습니다.

```java
private final String name; 
private final int age;
```

## 단계3: 생성자를 통해 필드를 초기화하세요. 모든 필드는 생성자에서 초기화되어야 합니다. 한번 설정되면 변경할 수 없습니다.

```java
public ImmutableClass(String name, int age) { 
    this.name = name;    
    this.age = age; 
}
```

<div class="content-ad"></div>

## 단계4: Getter만 제공하기: 필드에 액세스하기 위한 공개 getter 메서드를 제공하지만, 어떤 setter나 필드를 수정하는 메서드도 제공하지 마세요.

```js
public String getName() { return name; } 
public int getAge() { return age; }
```

단계5: 가변 필드의 불변성 보장하기: 클래스에 변경 가능한 객체(예: 배열, 컬렉션)가 있는 경우, 해당 필드가 변경되지 않도록 보장하세요. 이를 달성하는 방법은 다음과 같습니다:

a) Getter 메서드에서 새 객체를 반환합니다.

<div class="content-ad"></div>

b) 객체의 방어적 복사본 만들기.

```java
private final List<String> hobbies;
public ImmutableClass(String name, int age, List<String> hobbies) {
    this.name = name;
    this.age = age;
    this.hobbies = new ArrayList<>(hobbies); // 방어적 복사
}
public List<String> getHobbies() {
    return new ArrayList<>(hobbies); // 새 복사본 반환
}
```

# 예시 코드

여기 Java에서 불변 클래스의 완전한 예시가 있습니다:

<div class="content-ad"></div>

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class ImmutablePerson {
    private final String name;
    private final int age;
    private final List<String> hobbies;

    public ImmutablePerson(String name, int age, List<String> hobbies) {
        this.name = name;
        this.age = age;
        this.hobbies = new ArrayList<>(hobbies); // Defensive copy
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public List<String> getHobbies() {
        return Collections.unmodifiableList(hobbies); // Return unmodifiable view
    }
}
```

- 클래스에 대한 Final 키워드는 하위 클래스 생성을 방지합니다.
- 필드에 대한 Final 키워드는 필드가 한 번만 할당되도록 보장합니다.
- setter가 제공되지 않으면 생성 후 수정을 방지합니다.
- 방어적 복사를 수행하면 변경 가능한 필드의 변경으로부터 보호됩니다.

![이미지](/assets/img/2024-07-30-HowtoCreateimmutableObjectsinJava_2.png)

# Collections.unmodifiableList 사용하기

<div class="content-ad"></div>

이 방법은 변경을 방지하고 기존 목록을 수정할 수 없는 뷰로 래핑합니다.

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
public class ImmutableListExample {
    public static void main(String[] args) {
        List<String> modifiableList = new ArrayList<>();
        modifiableList.add("Item1");
        modifiableList.add("Item2");
        
        List<String> immutableList = Collections.unmodifiableList(modifiableList);
        
        // immutableList을 수정하려고 하면 UnsupportedOperationException이 발생합니다
        // immutableList.add("Item3"); // 예외가 발생합니다
        
        System.out.println(immutableList);
    }
}Using List.of (Java 9 and later)
```

## 이 방법은 직접 변경할 수 없는 목록을 생성합니다.

```java
import java.util.List;
public class ImmutableListExample {
    public static void main(String[] args) {
        List<String> immutableList = List.of("Item1", "Item2", "Item3");
        
        // immutableList을 수정하려고 하면 UnsupportedOperationException이 발생합니다
        // immutableList.add("Item4"); // 예외가 발생합니다
        
        System.out.println(immutableList);
    }
}Using Guava’s ImmutableList
```

<div class="content-ad"></div>

## Google의 Guava 라이브러리는 불변 컬렉션을 만드는 강력하고 편리한 방법을 제공합니다.

```java
import com.google.common.collect.ImmutableList;
public class ImmutableListExample {
    public static void main(String[] args) {
        ImmutableList<String> immutableList = ImmutableList.of("Item1", "Item2", "Item3");
        
        // Guava의 ImmutableList는 정의상 불변이므로 추가 작업이 필요하지 않습니다
        // immutableList.add("Item4"); // 이렇게 하면 예외가 발생합니다
        
        System.out.println(immutableList);
    }
}Custom Immutable List Wrapper
```

더 많은 제어를 위해 자체 불변 리스트 래퍼를 만들 수도 있습니다. 이는 추가 동작이나 제약이 필요할 때 유용합니다.

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
public final class CustomImmutableList<T> {
    private final List<T> internalList;
    public CustomImmutableList(List<T> list) {
        this.internalList = Collections.unmodifiableList(new ArrayList<>(list));
    }
    public T get(int index) {
        return internalList.get(index);
    }
    public int size() {
        return internalList.size();
    }
    @Override
    public String toString() {
        return internalList.toString();
    }
    public static void main(String[] args) {
        List<String> modifiableList = new ArrayList<>();
        modifiableList.add("Item1");
        modifiableList.add("Item2");
        CustomImmutableList<String> immutableList = new CustomImmutableList<>(modifiableList);
        // 내부 리스트를 수정하려고 하면 UnsupportedOperationException이 발생합니다
        // immutableList.internalList.add("Item3"); // 이렇게 하면 예외가 발생합니다
        
        System.out.println(immutableList);
    }
}
```

<div class="content-ad"></div>

- Collections.unmodifiableList: 수정 가능한 목록을 감싸서 변경할 수 없게 만듭니다.
- List.of: 변경할 수 없는 목록을 직접 생성합니다 (Java 9+).
- Guava의 ImmutableList: 추가 기능이 있는 변경할 수 없는 목록을 편리하게 생성하는 방법을 제공합니다.
- 사용자 정의 래퍼: 더 많은 제어를 위해 사용자 정의 변경할 수 없는 목록 래퍼를 구현할 수 있습니다.

## 요약:

- 변경할 수 없는 객체는 멀티스레딩 및 동시 응용 프로그램에서 객체 상태를 스레드 간 안전하게 공유하는 데 도움이 됩니다.
- 클래스는 변경할 수 없게 만들 수 있으며 Final 키워드 사용 및 설정자를 제공하지 않음과 같은 방법을 사용하여 이를 수행할 수 있습니다. 생성자 내에서 개체 생성을 포함시키며 클래스 내에서 변형 가능한 개체의 방어적 복사를 사용할 수 있습니다.
- 더 많은 제어를 위해 사용자 정의 변경할 수 없는 목록 래퍼를 생성할 수 있습니다. 추가 동작 또는 제약 조건을 추가해야 하는 경우 유용합니다.
- 클래스와 함께 사용하는 Final 키워드는 하위 클래스화를 방지합니다.
- 필드와 함께 사용하는 Final 키워드는 필드가 한 번만 할당되도록 보장합니다.
- 설정자가 제공되지 않으면 생성 후 수정을 방지합니다.
- 방어적 복사는 변형 가능한 필드의 변경으로부터 보호합니다.
- Google의 Guava 라이브러리는 변경할 수 없는 컬렉션을 만드는 견고하고 편리한 방법을 제공합니다.