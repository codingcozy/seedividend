---
title: "왜 Lombok이 여전히 모든 Java 개발자 도구에 있는가"
description: ""
coverImage: "/assets/img/2024-07-12-WhyIsLombokStillinEveryJavaDeveloperToolkit_0.png"
date: 2024-07-12 21:18
ogImage: 
  url: /assets/img/2024-07-12-WhyIsLombokStillinEveryJavaDeveloperToolkit_0.png
tag: Tech
originalTitle: "Why Is Lombok Still in Every Java Developer Toolkit?"
link: "https://medium.com/codex/why-is-lombok-still-in-every-java-developer-toolkit-ba038bf47f7"
---


<img src="/assets/img/2024-07-12-WhyIsLombokStillinEveryJavaDeveloperToolkit_0.png" />

내 동료는 "왜 Lombok을 사용해서 getter와 setter를 생성하냐구요? 제가 직접 작성하는 편이 더 좋아요." 라고 말하며 보일러플레이트(getter)를 코드베이스에 병합합니다.

왜 개발자들이 Lombok에 반대할까요? Lombok에 대해 잘못된 믿음을 가지고 있는 것은 무엇인가요? 그리고 왜 보일러플레이트를 직접 작성하는 것을 선호할까요?

잘못 사용된다면 어떤 도구라도 치명적일 수 있습니다. Lombok도 그 중 하나입니다. 간단한 어노테이션이 뒷받침되어 이상한 버그를 일으킬 수 있습니다. 이런 일이 일어나는 것은 Lombok을 남용했을 때에만 발생하며, 그 외엔 훌륭한 도구입니다.

<div class="content-ad"></div>

럼복에 대해 들은 몇 가지 잘못된 생각이 있어요.

- 럼복을 사용해서 컴파일러를 속일 수 있다는 것
    - @SneakyThrows는 확인된 예외를 처리하는 필요 없이 처리할 수 있게 합니다. 이를 처리하기 위해 많은 보일러플레이트를 작성할 필요가 없습니다.
    
    여기에 맞는 해결책이 없다면, 이것은 컴파일러를 위한 한 가지 트릭입니다.

<div class="content-ad"></div>

이 해킹을 사용하여 많은 희생을 하는 것인가요? 저는 그렇지 않다고 말하겠어요.

호출 스택 상단에 적절한 오류 처리가 있으면, 이 해킹으로 인한 느낌을 느끼지 않을 거에요. 그리고 백엔드에서는 더 읽기 쉽고 소비하기 쉬운 코드를 얻게 됩니다.

확인된 예외에 대해 악마인지 아닌지는 들어가지 않겠어요. 롬복이 여기서 우리에게 제공하는 것은 더 빨리 반복할 수 있는 기회입니다. 예외가 빠질 가능성이 있다면, 그건 당신의 걱정입니다.

@SneakyThrows로 어떠한 문제도 경험해보지 못했어요. 하고 계신 일을 잘 아신다면 문제 없을 거에요.

<div class="content-ad"></div>

@SneakyThrows가 모든 상황에서 컴파일러를 막기 위해 사용되어서는 안 됩니다. SneakyThrows를 사용하면 특정 위치에서 예외에 대해 신경 쓰지 않아도 도움이 됩니다.

# Lombok의 구식 기능을 사용할 수 있습니다. (이것들이 정말 구식인가요?)

Java 17 이상을 작성 중이라면 @Value는 무의미합니다.

Records는 이 주석을 구식으로 만듭니다. 그래도 다른 주석을 위해 Lombok이 필요합니다.

<div class="content-ad"></div>

하이버네이트 엔티티는 롬복의 @NoArgsConstructor @Builder 및 기타 기능을 통해 큰 혜택을 받습니다. 하지만 @Data는 피하는 것이 좋습니다. 롬복은 JPA에서 매우 유용하며 확실히 좋은 사용 사례입니다.

레코드와 함께 @Builder를 사용할 가능성이 높은데, 부분 레코드를 생성하는 네이티브 방법이 없기 때문입니다. 레코드에 대해 withers가 구현되면 Builder가 필요하지 않을 것입니다. 그 때까지 부분 레코드 빌더를 생성하는 가장 쉬운 방법입니다.

롬복의 @Builder가 레코드에 적용된 코드입니다.

```java
package com.example.demoslombok;

public record User(String name, String lastName) {
    public User(String name, String lastName) {
        this.name = name;
        this.lastName = lastName;
    }

    public static User.UserBuilder builder() {
        return new User.UserBuilder();
    }

    public String name() {
        return this.name;
    }

    public String lastName() {
        return this.lastName;
    }

    public static class UserBuilder {
        private String name;
        private String lastName;

        UserBuilder() {
        }

        public User.UserBuilder name(final String name) {
            this.name = name;
            return this;
        }

        public User.UserBuilder lastName(final String lastName) {
            this.lastName = lastName;
            return this;
        }

        public User build() {
            return new User(this.name, this.lastName);
        }

        public String toString() {
            return "User.UserBuilder(name=" + this.name + ", lastName=" + this.lastName + ")";
        }
    }
}
```

<div class="content-ad"></div>

value 객체 (레코드)에는 @Getter와 @Setter를 사용하지 않습니다.

Lombok이 생성하는 대신에 항상 레코드를 사용하는 것이 좋습니다. 변경 가능한 객체를 원하지 않는 한, 레코드를 사용하면 Lombok이 생성한 getter가 필요하지 않습니다.

레코드에 대해 @Setter는 이미 존재하지 않습니다. 변경할 수 없는 객체에 대해서도 @Setter가 필요하지 않을 것입니다. 각 레코드에는 변경할 수 없는 객체에 적합한 간결한 생성자가 있습니다.

이 모든 것은 Java 17과 함께 작업하는 즐거움을 가진 사람들에게 적합합니다. 하지만 더 오래된 Java 버전을 사용하는 사람들에게는 어떻게 할까요?

<div class="content-ad"></div>

많은 사람들이 몇 가지 프로젝트에서 Java 업그레이드가 약간의 이벤트가 아니라는 것을 잊어버린다. 이러한 기능은 Java 개발을 쉽게 만든다. 그래서 사람들은 이러한 기능에 의존한다.

오래된 코드베이스에서 롬복을 사용하는 또 다른 특성은 업그레이드가 큰 혼란을 일으킬 수 있다는 것이다. 델롬복이 있더라도, 특정 사용 사례에서는 역효과를 낼 수 있다.

여기 개발자의 통찰력이다. 델롬복이 기대대로 작동하지 않는 이유에 대한 내용이다:

도심 전설에 따르면 롬복을 사용하지 않기로 결정했을 때, delombok을 사용하여 확장된 코드를 생성하고 주석 처리된 파일을 대체할 수 있다는 것이었다. 그러나 생성된 파일은 매우 추악하고 어떤 스타일도 따르지 않았습니다. 모든 문제를 기억하지는 못하지만, 하나의 예로는 @NonNull 어노테이션을 사용하여 Guava Preconditions이나 Apache Commons의 Validate와 같은 한 줄 솔루션 대신 if/throw 블록을 사용하는 많은 라인으로 변환되었습니다. 생성된 코드를 보니 더 의존성을 추가하는 대신 바닐라 Java로 코드를 생성하는 것이 합리적으로 보이기 때문에 이것이 예상되었어야 했습니다. 그러나 실제로 이 전환을 수행하기 위해 필요한 작업에는 실제로 누구도 이를 인지하지 못했습니다. 그 결과 우리는 델롬복된 파일 대신 주석 처리된 파일의 구현을 수정하게 되었고, 이것은 많은 작업이 필요했습니다. 이 상황에서 많은 사람들은 롬복을 그대로 유지하는 것을 선호할지 모르겠지만, 나의 주된 관심사는 만약에 중요한 Java 업그레이드를 지원하기 위해 실제로 이전이 필요해진다면 어떻게 될지에 대한 것이었습니다 (현재 롬복은 여전히 Java 9-11에서 문제를 겪고 있음). 따라서 우리는 이러한 우려를 피하고 후에 보일러플레이트 코드 문제를 해결하기로 결정했습니다.

<div class="content-ad"></div>

주석(annotation)을 적당히 사용하고 필요한 곳에 한해 사용하세요. delombok을 너무 믿지 마세요. 생성된 코드가 더 혼란스러울 수 있습니다.

# 주석(annotation)의 내부 작동 방식을 미리 알아야 합니다

Lombok의 몇 가지 기능은 잊혀지고 사용되지 않습니다. 예를 들어 Lombok에는 withers가 있지만, 큰 형제인 @Builder 때문에 그것에 대해 들어본 사람이 없습니다.

그리고 그것은 그러한 이유 때문입니다.

<div class="content-ad"></div>

`@Builder`은 `@With`보다 메모리 친화적인 옵션입니다.

`@Builder`는 속성의 수와 관련이 없습니다. 이 주석은 빌더와 인스턴스의 인스턴스만 생성합니다.

`@With`는 각 속성마다 새로운 인스턴스를 만듭니다. 이는 각 중간 단계가 불변이어야하기 때문에 발생하는 결과입니다.

이것은 주석이 개발 경험을 좌우할 수 있는 단일 예시에 불과합니다. 하지만 Java 언어는 이러한 이례에 대응하기 위해 진화하고 있습니다.

<div class="content-ad"></div>

그래서 심층적인 내용을 모두 배울 필요가 없어요. 이전 예시에서는 레코드였는데, 이제는 @Value가 필요하지 않고 그 주석에 더 이상 신경 쓸 필요가 없어요.

@With도 마찬가지로 그렇게 될 거에요. Withers가 만들어지면 이 주석에 대해서는 잊어버릴 거예요. Withers는 신중하게 만들어지기 때문에 아직은 Java 릴리스에 포함되지 않았어요.

Lombok은 이 주석과 관련된 장애물을 극복하는 데 도움을 줄 수 있어요. Lombok의 withers에 대한 토론은 Java 언어 기능을 설계하는 데 보물 같은 자료가 돼요. 적어도, 나에게는 withers의 문제를 이해하는 데 도움이 되죠.

예를 들어, WithBy 이슈에 대한 코멘트를 살펴보면 Valhalla와 Amber가 해결할 문제를 볼 수 있어요. 예를 들면, 자기 참조 타입과 같은 문제는 원시 Valhalla 타입에서 발생하지 않아요. 그래서 이 문제에는 언어적 해결책이 필요하답니다.