---
title: "Java 21  더 이상 필요 없는 public static void main"
description: ""
coverImage: "/assets/img/2024-07-01-Java21Nomorepublicstaticvoidmain_0.png"
date: 2024-07-01 16:46
ogImage: 
  url: /assets/img/2024-07-01-Java21Nomorepublicstaticvoidmain_0.png
tag: Tech
originalTitle: "Java 21— No more public static void main()"
link: "https://medium.com/@shwetha.hey/java-21-no-more-public-static-void-main-c90334d6d95e"
---


## 새로운 main() 메서드로 길을 찾아가기

![이미지](/assets/img/2024-07-01-Java21Nomorepublicstaticvoidmain_0.png)

그렇습니다. Java 21에서는 public static void main() 메서드가 더 이상 필수적이지 않습니다.

이것은 Java 애플리케이션의 코딩을 간소화하기 위해 Java 21에서 도입된 새로운 기능입니다.

<div class="content-ad"></div>

자바에서 main() 메서드는 모든 자바 프로그램의 시작점입니다. 자바 프로그램을 실행할 때 자바 가상 머신(JVM)은 main() 메서드를 호출하여 프로그램을 시작합니다.

## 그런데, 그 이유는 뭘까요?

# ✅ 간단함

먼저, Java를 배우는 초보자들에게 더 쉽게 만들어 줍니다. main() 메서드는 새로운 프로그래머들에게 진입 장벽으로 여겨지기도 하는데, 이해하기에 혼란스러울 수 있기 때문입니다.

<div class="content-ad"></div>

# ✅다른 프로그래밍 언어와 일관성을 유지하기 위해

둘째, 이 변경으로 Java는 다른 프로그래밍 언어와 더 일관성있게 됩니다. 다른 많은 언어에서는 프로그램의 시작점이 main()과 같은 특정 메서드가 아니라, 시작 시에 실행되는 코드 블록입니다.

그리고 이게 놀랍다구요 - Java는 Python이나 JavaScript와 같은 다른 프로그래밍 언어와 일관성을 유지하려고 노력하고 있어요. 이들 언어는 main() 메서드를 굳이 사용하지 않는데, Java가 왜 사용해야 하나요?

# ✅유연성:

<div class="content-ad"></div>

마지막으로, 자바 프로그램의 구조를 더 유연하게 만들어 주는 새로운 가능성을 엽니다. 이제 main 클래스 없이도 자바 프로그램을 만들 수 있어 더 유연성이 증가했습니다.

이전에는 main() 메서드를 선언하는 엄격한 방법을 따라야 했고, 새로운 시도를 하고 싶을 때 제한을 받았습니다. 그러나 이제 main() 메서드 없이, 당신은 다양한 프로그래밍 스타일을 탐험할 수 있습니다.

예를 들어 함수형 프로그래밍과 같은 일부 프로그래밍 스타일은 main() 메서드를 전혀 사용하지 않습니다. 함수형 프로그래밍에서는 프로그램이 작고 재사용 가능한 함수들로 구축되며, 프로그램을 시작하는 중심적인 main() 메서드가 필요하지 않습니다.

다음은 public static void main() 메서드 없이 자바 프로그램을 실행하는 샘플 코드입니다:

<div class="content-ad"></div>


```js
class HelloWorld {

     void main() {
        System.out.println("Hello, world!");
    }

}
```

## 이제 더 나아가서:

Java 21에서 제공하는 '이름 없는 클래스(unnamed classes)' 기능을 사용하면 클래스를 선언하지 않고도 간단한 Java 프로그램을 작성할 수 있습니다.
 
예를 들어, 개발자는 여러 개의 작고 자기 포함 함수로 구성된 프로그램을 작성할 수 있습니다. 각 함수는 자체 '이름 없는 클래스(unnamed class)'에 정의될 수 있고, 이러한 함수들은 main 메소드에서 호출될 수 있습니다. 이렇게 하면 프로그램이 모듈식이 되며, 각 함수가 특정한 작업을 수행할 수 있어 이해하기 쉬워집니다.


<div class="content-ad"></div>

```js
new {
    System.out.println("안녕, 세상아!");
}
```

전반적으로 main() 메서드의 제거는 자바에 대한 긍정적인 변화입니다. 이것은 언어를 더 접근 가능하고, 현대적이며 유연하게 만듭니다. 자바 개발자라면 한 번 시도해보는 것을 권장합니다.