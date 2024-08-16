---
title: "Java 8 코딩 및 프로그래밍 인터뷰 질문과 답변 모음"
description: ""
coverImage: "/assets/img/2024-07-07-Java8CodingandProgrammingInterviewQuestionsandAnswers_0.png"
date: 2024-07-07 19:26
ogImage: 
  url: /assets/img/2024-07-07-Java8CodingandProgrammingInterviewQuestionsandAnswers_0.png
tag: Tech
originalTitle: "Java 8 Coding and Programming Interview Questions and Answers"
link: "https://medium.com/dev-genius/java-8-coding-and-programming-interview-questions-and-answers-62512c44f062"
isUpdated: true
---




![이미지](/assets/img/2024-07-07-Java8CodingandProgrammingInterviewQuestionsandAnswers_0.png)

자바 8이 출시된 지 8년이 되었습니다. 이미 자바 8 인터뷰 질문과 답변 및 자바 8 스트림 API 인터뷰 질문과 답변을 공유했습니다. 또한 자바 8 - 실시간 코딩 인터뷰 질문과 답변도 찾아볼 수 있습니다.

이 튜토리얼에서는 최고의 자바 8 코딩 및 프로그래밍 인터뷰 질문과 답변을 공유하겠습니다. 아래 질문을 해결하기 위해 Stream API 함수만 사용했습니다. 이 페이지를 즐겨찾기 해두세요. 계속해서 더 많은 질문을 추가할 것입니다.

- 정수 목록이 주어졌을 때 Stream 함수를 사용하여 목록에 있는 모든 짝수를 찾아내세요.

<div class="content-ad"></div>

```java
import java.util.*;
import java.util.stream.*;

public class EvenNumber{
    public static void main(String args[]) {
      List<Integer> list = Arrays.asList(10,15,8,49,25,98,32);
      list.stream()
          .filter(n -> n%2 == 0)
          .forEach(System.out::println);
    }
}
Output: 
10, 8, 98, 32
```

2. 주어진 정수 목록 중에서 Stream 기능을 사용하여 1로 시작하는 모든 숫자를 찾는 방법은?

```java
import java.util.*;
import java.util.stream.*;

public class NumberStartingWithOne{
    public static void main(String args[]) {
        List<Integer> myList = Arrays.asList(10,15,8,49,25,98,32);
        myList.stream()
              .map(s -> s + "") // 정수를 문자열로 변환
              .filter(s -> s.startsWith("1"))
              .forEach(System.out::println);
    }
}
Output:
10, 15
```

3. Java에서 Stream 함수를 사용하여 주어진 정수 목록에서 중복 요소를 찾는 방법은?

<div class="content-ad"></div>

```java
import java.util.*;
import java.util.stream.*;

public class DuplicateElements {
  public static void main(String args[]) {
          List<Integer> myList = Arrays.asList(10,15,8,49,25,98,98,32,15);
          Set<Integer> set = new HashSet();
          myList.stream()
                .filter(n -> !set.add(n))
                .forEach(System.out::println);
  }
}

Output:
98, 15
```

4. 주어진 정수 목록에서 스트림 함수를 사용하여 목록의 첫 번째 요소를 찾으세요.

```java
import java.util.*;
import java.util.stream.*;

public class FindFirstElement{
  public static void main(String args[]) {
          List<Integer> myList = Arrays.asList(10,15,8,49,25,98,98,32,15);
          myList.stream()
                .findFirst()
                .ifPresent(System.out::println);
  }
}

Output:
10
```

5. 정수 목록이 주어졌을 때, 스트림 함수를 사용하여 목록에 포함된 요소의 총 개수를 찾으세요.

<div class="content-ad"></div>

```java
import java.util.*;
import java.util.stream.*;

public class FindTheTotalNumberOfElements {
  public static void main(String args[]) {
          List<Integer> myList = Arrays.asList(10,15,8,49,25,98,98,32,15);
          long count =  myList.stream()
                              .count();
          System.out.println(count);                    
  }
}

Output:
9
```

6. 주어진 정수 목록에서 Stream 함수를 사용하여 가장 큰 값 요소를 찾으시오.

```java
import java.util.*;
import java.util.stream.*;

public class FindMaxElement{
  public static void main(String args[]) {
          List<Integer> myList = Arrays.asList(10,15,8,49,25,98,98,32,15);
          int max =  myList.stream()
                           .max(Integer::compare)
                           .get();
          System.out.println(max);                    
  }
}

Output:
98
```

7. 주어진 문자열에서 Stream 함수를 사용하여 첫 번째로 반복되지 않는 문자를 찾으시오.

<div class="content-ad"></div>

```java
import java.util.*;
import java.util.stream.*;
import java.util.function.Function;

public class FirstNonRepeated {
    public static void main(String args[]) {
        String input = "Java articles are Awesome";

        Character result = input.chars() // 문자열의 스트림        
            .mapToObj(s -> Character.toLowerCase(Character.valueOf((char) s))) // 먼저 Character 객체로 변환한 후 소문자로         
            .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting())) // 문자를 카운트하여 맵에 저장 
            .entrySet()
            .stream()
            .filter(entry -> entry.getValue() == 1L)
            .map(entry -> entry.getKey())
            .findFirst()
            .get();
        System.out.println(result);                    
    }
}

결과:
j
```

8. 주어진 문자열에서 Stream 함수를 사용하여 첫 번째 반복된 문자를 찾으세요.

```java
import java.util.*;
import java.util.stream.*;
import java.util.function.Function;

public class FirstRepeated {
    public static void main(String args[]) {
        String input = "Java Articles are Awesome";

        Character result = input.chars() // 문자열의 스트림        
            .mapToObj(s -> Character.toLowerCase(Character.valueOf((char) s))) // 먼저 Character 객체로 변환한 후 소문자로         
            .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting())) // 문자를 카운트하여 맵에 저장 
            .entrySet()
            .stream()
            .filter(entry -> entry.getValue() > 1L)
            .map(entry -> entry.getKey())
            .findFirst()
            .get();
        System.out.println(result);                    
    }
}

결과:
a
```

9. 정수 목록이 주어졌을 때, Stream 함수를 사용하여 모든 값들을 정렬하세요.

<div class="content-ad"></div>

```java
import java.util.*;
import java.util.stream.*;
import java.util.function.Function;

public class SortValues{
  public static void main(String args[]) {
          List<Integer> myList = Arrays.asList(10,15,8,49,25,98,98,32,15);

           myList.stream()
                 .sorted()
                 .forEach(System.out::println);
  }
}

Output:
 8
10
15
15
25
32
49
98
98

10. 정수 목록이 제공되면 Stream 함수를 사용하여 해당 값의 모든 값이 내림차순으로 정렬되도록하세요?

import java.util.*;
import java.util.stream.*;
import java.util.function.Function;

public class SortDescending{
  public static void main(String args[]) {
          List<Integer> myList = Arrays.asList(10,15,8,49,25,98,98,32,15);

           myList.stream()
                 .sorted(Collections.reverseOrder())
                 .forEach(System.out::println);
  }
}

Output:
98
98
49
32
25
15
15
10
8

11. 정수 배열 nums가 주어지면, 배열에서 어떤 값이 두 번 이상 나타나는 경우 true를 반환하고 모든 요소가 서로 다른 경우 false를 반환하세요.

<div class="content-ad"></div>

public boolean containsDuplicate(int[] nums) {
    List<Integer> list = Arrays.stream(nums)
                               .boxed()
                               .collect(Collectors.toList());
    Set<Integer> set = new HashSet<>(list);
    if (set.size() == list.size()) {
        return false;
    } 
    return true;
}

Input: nums = [1,2,3,1]
Output: true

Input: nums = [1,2,3,4]
Output: false

12. Java 8 Date and Time API를 사용하여 현재 날짜와 시간을 어떻게 가져올까요?

class Java8 {
    public static void main(String[] args) {
        System.out.println("현재 지역 날짜: " + java.time.LocalDate.now());
        // 날짜를 가져오기 위해 LocalDate API를 사용했습니다.
        System.out.println("현재 지역 시간: " + java.time.LocalTime.now());
        // 시간을 가져오기 위해 LocalTime API를 사용했습니다.
        System.out.println("현재 지역 날짜와 시간: " + java.time.LocalDateTime.now());
        // 날짜와 시간을 모두 가져오기 위해 LocalDateTime API를 사용했습니다.
    }
}

13. 두 개의 스트림을 연결(concatenate)하는 Java 8 프로그램을 작성해보세요.

<div class="content-ad"></div>

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class Java8 {
    public static void main(String[] args) {

        List<String> list1 = Arrays.asList("Java", "8");
        List<String> list2 = Arrays.asList("explained", "through", "programs");

        Stream<String> concatStream = Stream.concat(list1.stream(), list2.stream());
         
        // List1과 List2를 Stream으로 변환한 후 연결했습니다.
 
        concatStream.forEach(str -&gt; System.out.print(str + " "));
         
        // 연결된 Stream을 출력했습니다.
    }
}

14. 리스트 요소에 대해 세제곱을 수행하고 50보다 큰 숫자를 필터링하는 Java 8 프로그램입니다.

import java.util.*;

public class Main {
    public static void main(String[] args) {
       List<Integer> integerList = Arrays.asList(4, 5, 6, 7, 1, 2, 3);
       integerList.stream()
                  .map(i -> i*i*i)
                  .filter(i -> i > 50)
                  .forEach(System.out::println);
    }
}  

Output:
64
125
216
343

15. 배열을 정렬한 다음 정렬된 배열을 Stream으로 변환하는 Java 8 프로그램을 작성하세요.

<div class="content-ad"></div>

import java.util.Arrays;

public class Java8 {

    public static void main(String[] args) {
        int arr[] = { 99, 55, 203, 99, 4, 91 };
        Arrays.parallelSort(arr);
        // Sorted the Array using parallelSort()
        
        Arrays.stream(arr).forEach(n -> System.out.print(n + " "));
        /* Converted it into Stream and then
           printed using forEach */
    }
}

16. 자바 8에서 객체를 대문자로 변환하는 방법은 무엇인가요?

import java.util.List;
import java.util.stream.Collectors;

public class Java8 {

    public static void main(String[] args) {
        List<String> nameLst = names.stream()
                                    .map(String::toUpperCase)
                                    .collect(Collectors.toList());
        System.out.println(nameLst);
    }
}

output:
AA, BB, CC, DD

17. 중복된 키를 고려하여 List의 객체를 Map으로 변환하고 정렬된 순서로 저장하는 방법은 무엇인가요?

<div class="content-ad"></div>

public class TestNotes {

    public static void main(String[] args) {

        List<Notes> noteLst = new ArrayList<>();
        noteLst.add(new Notes(1, "note1", 11));
        noteLst.add(new Notes(2, "note2", 22));
        noteLst.add(new Notes(3, "note3", 33));
        noteLst.add(new Notes(4, "note4", 44));
        noteLst.add(new Notes(5, "note5", 55));

        noteLst.add(new Notes(6, "note4", 66));

        Map<String, Long> notesRecords = noteLst.stream()
                .sorted(Comparator.comparingLong(Notes::getTagId)
                        .reversed())
                .collect(Collectors.toMap(Notes::getTagName, Notes::getTagId,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));
        
        System.out.println("Notes : " + notesRecords);
    }
}

18. Java8에서 String ArrayList에서 각 요소/단어를 어떻게 세는지에 대한 방법?

public class TestNotes {

    public static void main(String[] args) {
        List<String> names = Arrays.asList("AA", "BB", "AA", "CC");
        Map<String, Long> namesCount = names
                .stream()
                .collect(
                        Collectors.groupingBy(
                                Function.identity(),
                                Collectors.counting()
                        ));
        System.out.println(namesCount);
    }
}

Output:
{CC=1, BB=1, AA=2}

19. Java8에서 String ArrayList에서 중복 요소 및 해당 수를 찾는 방법?

<div class="content-ad"></div>

public class TestNotes {

    public static void main(String[] args) {
        List<String> names = Arrays.asList("AA", "BB", "AA", "CC");
        Map<String, Long> namesCount = names
                .stream()
                .filter(x -> Collections.frequency(names, x) > 1)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        System.out.println(namesCount);
    }
}

Output:
{AA=2}

20. Java 8를 사용하여 목록이 비어 있는지 확인하는 방법 및 null이 아닌 경우 목록을 반복하고 객체를 출력하는 방법은 무엇인가요?

Optional.ofNullable(noteLst)
        .orElseGet(Collections::emptyList) // noteLst가 null이면 빈 불변의 목록([])을 생성합니다.
        .stream().filter(Objects::nonNull) // 각 객체를 반복하고 null이 아닌 객체를 고려합니다.
        .map(note -> Notes::getTagName) // 메소드 참조, 태그 이름만 고려합니다.
        .forEach(System.out::println); // 태그 이름을 출력합니다.

21. 배열에서 최대 요소를 찾는 프로그램을 작성해보세요.

<div class="content-ad"></div>

public static int findMaxElement(int[] arr) {
  return Arrays.stream(arr).max().getAsInt();
}

Input: 12,19,20,88,00,9
output: 88

22. 문자열에서 각 문자의 개수를 출력하는 프로그램을 작성하세요.

public static void findCountOfChars(String s) {
    Map<String, Long> map = Arrays.stream(s.split(""))
                                  .map(String::toLowerCase)
                                  .collect(Collectors.groupingBy(str -> str, 
                                  LinkedHashMap::new, Collectors.counting()));
}

Input: String s = "string data to count each character";
Output: {s=1, t=5, r=3, i=1, n=2, g=1,  =5, d=1, a=5, o=2, c=4, u=1, e=2, h=2}

여기서 Java 8 코딩 면접 질문과 답변의 끝이 있습니다. 이러한 질문은 모든 Java 8 인터뷰에서 매우 흔하기 때문에 해당 프로그램을 저장하고 연습하세요.

<div class="content-ad"></div>

기사를 읽어 주셔서 감사합니다. 박수를 보내주시고 공유하고 댓글을 달아주세요. 그렇게 하면 더 많은 기사를 작성하게 될 겁니다. 소중한 제안을 공유해 주시고 솔직한 피드백을 감사히 받겠습니다!!!