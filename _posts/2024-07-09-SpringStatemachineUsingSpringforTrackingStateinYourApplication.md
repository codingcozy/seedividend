---
title: "스프링 스테이트머신 - 애플리케이션 상태 추적을 위한 스프링 사용 방법"
description: ""
coverImage: "/assets/img/2024-07-09-SpringStatemachineUsingSpringforTrackingStateinYourApplication_0.png"
date: 2024-07-09 21:30
ogImage:
  url: /assets/img/2024-07-09-SpringStatemachineUsingSpringforTrackingStateinYourApplication_0.png
tag: Tech
originalTitle: "Spring Statemachine — Using Spring for Tracking State in Your Application."
link: "https://medium.com/gitconnected/spring-statemachine-using-spring-for-tracking-state-in-your-application-031f7fd9027f"
isUpdated: true
---

![Spring Statemachine](/assets/img/2024-07-09-SpringStatemachineUsingSpringforTrackingStateinYourApplication_0.png)

Part Two Here.

# Overview

Spring Statemachine (SSM)은 SpringBoot 애플리케이션에서 상태 기계를 구현하는 데 사용할 수 있는 프레임워크입니다. 상태 기계는 한 번에 하나만 활성 상태가 될 수 있는 유한 상태의 컴퓨팅 모델입니다.

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

입력 이벤트에 응답하여 상태 기계가 한 상태에서 다른 상태로 전이됩니다.

상태 기계의 개념은 종종 초기 아키텍처 설계가 아닌 개발 중에 구현됩니다. 이는 코드에서 복잡한 루프 또는 중첩된 if-else 문 또는 다른 분기 논리를 발견했을 때 발생합니다. 상태 기계가 필요한지 어떻게 알 수 있을까요? 다음과 같은 패턴 중 코드에서 발견된다면 상태 기계가 적절한 후보일 수 있습니다.

- 여러 단계 또는 복잡한 작업을 작은 작업으로 분할합니다.
- 논리 변수 또는 열거형을 구현하여 작업의 단계를 표시합니다.
- 이전에 언급된 변수 또는 열거형을 확인하기 위해 큰 if-else 구조를 루핑합니다.

이러한 사항 중 하나 이상이 해당되면 상태 기계를 고려해야 할 수 있습니다. Spring을 사용 중이라면 SSM이 이 사용 사례를 해결하는 좋은 후보입니다. 이를 사용하면 도움이 될 것입니다.

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

- 지저분한 다층 결정문들을 방지합니다.
- 타입 안전성(열거형)을 사용하여 작업 흐름 구성을 형식화합니다.
- 작업 흐름을 전이, 액션, 리스너 및 가드로 모듈화합니다.

## 용어집

- 상태 기계: 상태, 영역, 전이 및 이벤트를 조율하는 통제 엔티티입니다. 초기 상태, 종료 상태 및 정의된 유한한 상태 집합이 있습니다.
- 상태: 어떤 조건이 참인 순간 또는 상황을 나타냅니다.
- 전이: 소스 상태와 대상 상태 사이의 관계입니다. 상태가 다른 상태로 이동하는 방식입니다.
- 이벤트: 상태 기계가 상태 변경을 신호하는 데 사용하는 것입니다.
- 영역: 상태 기계의 관련된 부분이지만 의존하지 않는 부분입니다. 상태와 전이를 포함합니다.
- 가드: 상태 변수와/또는 이벤트 매개변수의 값에 기반한 부울 표현식입니다. 상태 전이가 발생해야 하는지를 결정할 수 있습니다.
- 액션: 전이 트리거 중에 실행되는 동작입니다.

## 우리의 사용 사례

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

기사를 게시하기 위한 워크플로우를 구현할 예정입니다. 이는 기사가 편집되기 전에는 편집되지 않은 상태로 시작하여, 편집이 완료되면 리뷰 단계로 이동합니다. 리뷰 후에는 거부될 수도 있고(더 많은 편집이 필요함을 의미), 게시될 수도 있습니다.

다음과 같이 기사 워크플로우를 그림으로 표현할 수 있습니다:

![Article Workflow](/assets/img/2024-07-09-SpringStatemachineUsingSpringforTrackingStateinYourApplication_1.png)

다음 섹션에서는 SSM을 사용하여 이를 어떻게 구현할지 살펴볼 것입니다.

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

# 구현

이 프로그램의 코드는 여기서 찾을 수 있습니다.

## 의존성

첫 번째 단계는 웹, JPA 및 롬복 의존성이 있는 표준 SpringBoot 애플리케이션을 가져와서 SpringBoot Statemachine Starter 의존성을 다음과 같이 추가하는 것입니다.

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

먼저 속성을 선언해야 합니다. 현재 SpringBoot 3.x를 사용하고 있으며(작성 시점 기준 3.1.5 버전을 사용 중), 다음 버전을 포함할 것입니다.

```js
<properties>
  <maven.compiler.source>17</maven.compiler.source>
  <maven.compiler.target>17</maven.compiler.target>
  <spring-statemachine.version>3.2.1</spring-statemachine.version>
</properties>
```

그리고 pom에 다음을 추가합니다.

```js
<dependency>
  <groupId>org.springframework.statemachine</groupId>
  <artifactId>spring-statemachine-starter</artifactId>
</dependency>
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

우리 프로젝트에 다음 종속성들을 가져올 것입니다.

![Dependencies](/assets/img/2024-07-09-SpringStatemachineUsingSpringforTrackingStateinYourApplication_2.png)

## 정의

우리는 Java Enums를 사용하여 전이에 대한 가능한 상태와 이벤트를 나타낼 것입니다. 이것은 코드 작성을 시작하기 전에 다이어그램을 사용하여 상태를 스케치하고 상태와 이벤트에 유효한 이름을 할당하는 것이 왜 중요한지를 설명합니다. UML 다이어그램이 가치 있을 수 있고, 구조에 대한 설명은 여기에 개요되어 있습니다.

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

단계와 필요한 이벤트를 보여주는 다이어그램이 준비되면 이러한 enum 클래스를 정의할 수 있습니다. 우리의 목적을 위해서는

```js
public enum ArticleStates {
    UNEDITED_ARTICLE,
    EDITING_IN_PROGRESS,
    ARTICLE_IN_REVIEW,
    ARTICLE_PUBLISHED
}
```

및

```js
public enum ArticleEvents {
    EDIT_ARTICLE,
    REVIEW_ARTICLE,
    REJECT_ARTICLE,
    PUBLISH_ARTICLE
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

이들은 상태 기계 구성의 기반을 제공할 것입니다. 또한 상태 기계를 빌드하는 대상 엔티티인 Article을 나타내는 간단한 모델 클래스를 정의할 것입니다. 데이터베이스에 이를 보관할 것이므로 JPA Entity 주석을 달아 표시합니다. 또한 @Enumerated 주석을 사용하여 상태 열을 정의하고 우리의 상태 enum 클래스를 타입으로 사용합니다.

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Article {

    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    private ArticleStates state;

    private String text;
}
```

워크플로 대상 클래스를 위해 정의된 JPA Entity가 있으므로 간단한 JPA Repository를 추가할 것입니다.

```java
public interface ArticleRepository extends JpaRepository<Article, Long> {
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

그러면 우리는 상태 머신 구성을 정의할 수 있습니다.

## 구성

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

다음으로 코드의 다음 부분은 상태 머신 자체의 구성에 관련된 것을 검토할 것입니다.

SSM을 사용하면 상태 머신 구성에 청취자(listener)를 정의할 수 있습니다. 개발 중 상태 전이를 기록하는 데 매우 유용합니다. 이는 다음과 같이 정의됩니다. 우리의 enum이 코드 전체에서 사용되는 것을 주목해주세요. 이것은 상태 머신에 유형 안전성을 제공하는 멋진 추가 기능입니다.

```js
public class Listener extends StateMachineListenerAdapter<ArticleStates, ArticleEvents> {
    @Override
    public void stateChanged(State<ArticleStates, ArticleEvents> from, State<ArticleStates, ArticleEvents> to) {
        System.out.println("state changed from " + offNullableState(from) + " to " + offNullableState(to));
    }

    @Override
    public void eventNotAccepted(Message<ArticleEvents> eventsMessage) {
        System.out.println("Error event not accepted " + eventsMessage);
    }

    private Object offNullableState(State<ArticleStates, ArticleEvents> s) {
        return Optional.ofNullable(s).map(State::getId).orElse(null);
    }
}
```

청취자를 통해 완전한 상태 머신 구성을 정의할 수 있습니다. 현재는 소스, 대상, 그리고 이벤트 필드에 집중해 주시기 바랍니다. 구성의 action 및 guard 부분에 대해는 이후에 설명할 예정입니다.

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

@EnableStateMachineFactory 주석을 사용하여 @Configuration 관련 클래스를 가져와 상태 머신 팩토리를 구축하는 데 강조하고 싶어요. 이를 통해 더 많은 제어를 제공하고 단일 애플리케이션 내에서 여러 상태머신으로 작업할 수 있으며 StateMachineFactory 클래스를 의존성 주입 가능하게 만듭니다. 나중에 보게 될 것처럼요.

```js
@Configuration
@EnableStateMachineFactory
@AllArgsConstructor
public class StateMachineConfig extends EnumStateMachineConfigurerAdapter<ArticleStates, ArticleEvents> {

    private final EditingAction editingAction;
    private final BeginEditAction beginEditAction;
    private final EditingCompleteAction editingCompleteAction;
    private final ReviewCompleteAction reviewCompleteAction;
    private final ArticleIdGuard articleIdGuard;

    @Override
    public void configure(StateMachineStateConfigurer<ArticleStates, ArticleEvents> states) throws Exception {
        states.withStates()
            .initial(ArticleStates.UNEDITED_ARTICLE)
            .states(EnumSet.allOf(ArticleStates.class))
            .end(ArticleStates.ARTICLE_PUBLISHED);
    }

    @Override
    public void configure(StateMachineTransitionConfigurer<ArticleStates, ArticleEvents> transitions) throws Exception {
        transitions
            .withExternal()
            .source(ArticleStates.UNEDITED_ARTICLE)
            .target(ArticleStates.EDITING_IN_PROGRESS)
            .event(ArticleEvents.EDIT_ARTICLE)
            .guard(articleIdGuard)
            .action(beginEditAction)
            .and()
            .withExternal()
            .source(ArticleStates.EDITING_IN_PROGRESS)
            .target(ArticleStates.ARTICLE_IN_REVIEW)
            .event(ArticleEvents.REVIEW_ARTICLE)
            .action(editingCompleteAction)
            .and()
            .withExternal()
            .source(ArticleStates.ARTICLE_IN_REVIEW)
            .target(ArticleStates.EDITING_IN_PROGRESS)
            .event(ArticleEvents.REJECT_ARTICLE)
            .action(reviewCompleteAction)
            .and()
            .withExternal()
            .source(ArticleStates.ARTICLE_IN_REVIEW)
            .target(ArticleStates.ARTICLE_PUBLISHED)
            .event(ArticleEvents.PUBLISH_ARTICLE)
            .action(reviewCompleteAction);
    }

    @Override
    public void configure(StateMachineConfigurationConfigurer<ArticleStates, ArticleEvents> config) throws Exception {
        config.withConfiguration()
            .autoStartup(true)
            .listener(new Listener());
    }
}
```

첫 번째 재정의는 상태를 정의합니다. 여기서 시작, 끝 및 상태 머신 내에서 사용할 수 있는 가능한 상태를 선언합니다.

두 번째 재정의는 전이를 정의합니다. 이것은 적절한 상태 머신 다이어그램을 보유하는 것이 이를 올바르게 이해하는 데 주요 이점이 되는 것을 설명한 곳으로 돌아갑니다. 이 섹션에서는 소스(현재 상태), 대상(전환될 상태) 및 해당 전환을 트리거하는 이벤트를 정의합니다.

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

예를 들어, 우리는 우리의 article이 ArticleStates.UNEDITED_ARTICLE 상태에 있고 ArticleEvents.EDIT_ARTICLE 이벤트를 받았을 때 ArticleStates.EDITING_IN_PROGRESS 상태로 전환해야 한다고 정의합니다. SSM 없이 수행될 경우 대응하는 if..else 구조보다 해석하기 쉽고 오류 가능성이 적은 간결하고 명확한 정의입니다.

또한, 앞서 다이어그램으로 돌아가보면 구성에 정의된 네 가지 전이를 볼 수 있습니다. 이는 구성에 지정된 수와 동일합니다.

상태 기계는 흐름뿐만 아니라 상태 변경이 발생할 때 실행되는 코드를 구현할 수 있습니다.

## 동작

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

상태 머신과 상호 작용하는 데 사용할 수 있는 컴포넌트로서 Action이 있습니다. Action은 상태 머신 및 해당 상태 라이프 사이클의 여러 위치에서 실행될 수 있습니다. 우리의 경우 전이 구성의 일부로 Action을 정의했습니다.

Action에 대한 전용 클래스를 만드는 것이 가장 명확하고 혼잡을 줄일 수 있다고 생각합니다. 이렇게 하면 다음과 같이 Action을 정의할 수 있습니다. override는 작업이 호출될 때 상태 머신 자체에서 제공되는 타입 안전한 context 매개변수를 취합니다.

context 내에서는 상태 머신을 시작하는 사람이 설정해야 하는 헤더 값이 정의됩니다. 이 값은 추적 중인 article의 고유 ID를 나타냅니다. 이 값을 검색한 다음, workflow 내의 다음 이벤트에 대해 새 이벤트를 보내어 상태를 진행시킵니다.

```js
@Slf4j
@Component
public class BeginEditAction implements Action<ArticleStates, ArticleEvents> {

    @Override
    public void execute(StateContext<ArticleStates, ArticleEvents> context) {
        Long header = (Long) context.getMessageHeader(ArticleServiceImpl.ARTICLE_ID_HEADER);
        System.out.println("Doing action " + context.getTarget().getId() + " received article id " + header);

        context.getStateMachine().sendEvent(Mono.just(MessageBuilder.withPayload(ArticleEvents.EDIT_ARTICLE)
            .setHeader(ArticleServiceImpl.ARTICLE_ID_HEADER, header)
            .build())).doOnComplete(() -> System.out.println("Begin Edit Article handling")).subscribe();
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

특별한 처리 예제는 ReviewCompleteAction.java 파일에서 수행됩니다. 상태 기계 정의에서 두 가지 가능한 전이, 즉 Successful 및 Reject을 기억하실 것입니다. 이를 모의 테스트 코드로 설정하여 액션 내에서 시뮬레이션합니다.

```js
@Slf4j
@Component
public class ReviewCompleteAction implements Action<ArticleStates, ArticleEvents> {

    @Override
    public void execute(StateContext<ArticleStates, ArticleEvents> context) {
        Long header = (Long) context.getMessageHeader(ArticleServiceImpl.ARTICLE_ID_HEADER);
        System.out.println("실행 중인 액션 " + context.getTarget().getId() + "에서 받은 기사 ID: " + header);

        /*
        이는 통계적으로 10번 중 8번은 게시하고 2번은 거부하는 모의 로직입니다.
         */
        if (new Random().nextInt(10) < 8) {
            context.getStateMachine().sendEvent(Mono.just(MessageBuilder.withPayload(ArticleEvents.PUBLISH_ARTICLE)
                .setHeader(ArticleServiceImpl.ARTICLE_ID_HEADER, header)
                .build())).doOnComplete(() -> System.out.println("리뷰 완료: 성공적으로 처리됨")).subscribe();
        } else {
            context.getStateMachine().sendEvent(Mono.just(MessageBuilder.withPayload(ArticleEvents.REJECT_ARTICLE)
                .setHeader(ArticleServiceImpl.ARTICLE_ID_HEADER, header)
                .build())).doOnComplete(() -> System.out.println("리뷰 완료: 거부 처리됨")).subscribe();
        }
    }
}
```

0부터 9까지의 임의의 숫자를 생성하고, 숫자가 8보다 작으면 기사를 수락하고 8보다 크거나 같으면 거부합니다. 다시 말하지만, 이는 설명을 위한 것이며 이 두 결과는 우리 상태 기계에 들어오는 외부 이벤트(예: 웹 인터페이스에서 편집자나 근거자가 수락 또는 거부 버튼을 누르는 경우)에 의해 분할되고 트리거됩니다.

코드에 있는 다른 모든 액션을 모두 포함하지는 않겠습니다. 해당 텍스트에서 참조할 수 있습니다. 그러나 이러한 모든 액션은 액션을 구현하는 유사한 패턴을 따릅니다. 우리의 액션이 간단하지만 더 복잡한 로직도 구현할 수 있습니다. 예를 들어 외부 API를 호출하고 헤더 또는 페이로드를 통해 컨텍스트를 수정하거나 추가할 수 있습니다.

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

## 가드

상태 머신 내의 가드는 상태를 확인하고 다음 전이가 가능한지를 결정하는 데 사용됩니다. 우리의 설정에서 초기 전이의 일부로 하나의 가드를 포함했습니다. 이는 상태 머신을 초기화할 때 필수 정보가 설정되었는지 확인하는 데 사용될 것입니다. 특히, 헤더에 기사 ID가 설정되어 있는지 확인하여 추가 처리가 필요합니다. 이 작업은 설정 여부에 따라 true 또는 false를 반환합니다.

```java
@Component
public class ArticleIdGuard implements Guard<ArticleStates, ArticleEvents> {

    @Override
    public boolean evaluate(StateContext<ArticleStates, ArticleEvents> context) {
        boolean val = context.getMessageHeader(ArticleServiceImpl.ARTICLE_ID_HEADER) != null;
        System.out.println("가드 결과는 " + val);
        return val;
    }
}
```

만약 false가 반환된다면, 전이가 허용되지 않고 상태 머신은 현재 상태에 유지됩니다.

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

## 상태 유지

상태 기계는 전이가 동기적이고 딜레이 없이 발생하는 방식으로 구현되지 않는 경우가 많습니다. 전이는 종종 마지막 상태가 활성화된 후 몇 분, 몇 시간 또는 심지어 며칠 후에 발생할 수 있는 외부 이벤트에서 트리거됩니다. 예를 들어, 기사 제출 시 제출된 기사가 검토에 성공하여 기사가 발행되었는지 또는 기사가 거부되고 더 많은 편집이 필요한지를 결정하는 데 시간이 걸릴 수 있습니다. 이에 따라 특정 대상 엔티티(기사)의 현재 상태를 지속하고 검색하는 메커니즘이 필요합니다. 이는 다양한 방법으로 수행할 수 있으며, 저희는 상태 인터셉터를 사용하여 구현하기로 결정했습니다.

```java
@RequiredArgsConstructor
@Component
public class ArticleStateChangeInterceptor extends StateMachineInterceptorAdapter<ArticleStates, ArticleEvents> {

    private final ArticleRepository articleRepository;

    @Override
    public void preStateChange(State<ArticleStates, ArticleEvents> state, Message<ArticleEvents> message,
                               Transition<ArticleStates, ArticleEvents> transition, StateMachine<ArticleStates, ArticleEvents> stateMachine,
                               StateMachine<ArticleStates, ArticleEvents> rootStateMachine) {

        Optional.ofNullable(message).flatMap(msg ->
                Optional.ofNullable((Long) msg.getHeaders().getOrDefault(ArticleServiceImpl.ARTICLE_ID_HEADER, -1L))).
            ifPresent(articleId -> {
                Article article = articleRepository.getOne(articleId);
                article.setState(state.getId());
                articleRepository.save(article);
            });
    }
}
```

이 코드는 이전에 정의된 리포지토리를 사용하여 헤더 값에서 기사 id를 가져와 새 상태를 설정한 다음 저장합니다. 이 과정은 간단합니다. 이제 인터셉터가 어떻게 구성되는지 정의해야 합니다.

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

## 모두 연결하는 중

우리가 구현한 모든 설정을 모두 사용하기 위해서는 상태 머신을 호출할 방법이 필요합니다. 이를 위해 다양한 상태를 정의하고 상태가 데이터베이스에 올바르게 저장되도록 보장하는 인터셉터를 포함하는 서비스 클래스를 정의합니다. 먼저 필요한 워크플로 단계와 일치하는 인터페이스를 정의하는 것이 좋습니다. 외부에서 새 문서를 생성하는 방법도 포함합니다. 엔터티 클래스를 넘기지만, 이는 대부분 DTO로 정의됩니다.

```js
public interface ArticleService {

    Article newArticle(ArticleDto articleDto);

    StateMachine<ArticleStates, ArticleEvents> beginEditing(Long articleId);

    StateMachine<ArticleStates, ArticleEvents> beginReviewing(Long paymentId);

    StateMachine<ArticleStates, ArticleEvents> publish(Long paymentId);
}
```

관련된 구현 클래스는 여기에 표시되어 있습니다.

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
@RequiredArgsConstructor
@Service
public class ArticleServiceImpl implements ArticleService {

    public static final String ARTICLE_ID_HEADER = "article_id";
    private final ArticleRepository articleRepository;
    private final StateMachineFactory<ArticleStates, ArticleEvents> stateMachineFactory;
    private final ArticleStateChangeInterceptor articleStateChangeInterceptor;

    @Override
    public Article newArticle(ArticleDto articleDto) {
        Article article = Article.builder()
            .state(ArticleStates.UNEDITED_ARTICLE)
            .text(articleDto.getText())
            .build();
        return articleRepository.save(article);
    }

    @Transactional
    @Override
    public StateMachine<ArticleStates, ArticleEvents> beginEditing(Long articleId) {
        StateMachine<ArticleStates, ArticleEvents> sm = build(articleId);

        sendEvent(articleId, sm, ArticleEvents.EDIT_ARTICLE);

        return sm;
    }

    @Transactional
    @Override
    public StateMachine<ArticleStates, ArticleEvents> beginReviewing(Long articleId) {
        StateMachine<ArticleStates, ArticleEvents> sm = build(articleId);

        sendEvent(articleId, sm, ArticleEvents.REVIEW_ARTICLE);

        return sm;
    }

    @Transactional
    @Override
    public StateMachine<ArticleStates, ArticleEvents> publish(Long articleId) {
        StateMachine<ArticleStates, ArticleEvents> sm = build(articleId);

        sendEvent(articleId, sm, ArticleEvents.PUBLISH_ARTICLE);

        return sm;
    }

    private void sendEvent(Long articleId, StateMachine<ArticleStates, ArticleEvents> sm,
                           ArticleEvents event) {
        Message<ArticleEvents> msg = MessageBuilder.withPayload(event)
            .setHeader(ARTICLE_ID_HEADER, articleId)
            .build();

        sm.sendEvent(Mono.just(msg)).subscribe();
    }

    private StateMachine<ArticleStates, ArticleEvents> build(Long articleId) {
        Article article = articleRepository.getOne(articleId);

        StateMachine<ArticleStates, ArticleEvents> sm = stateMachineFactory.getStateMachine(Long.toString(article.getId()));

        sm.stop();

        sm.getStateMachineAccessor()
            .doWithAllRegions(smInt -> {
                smInt.addStateMachineInterceptor(articleStateChangeInterceptor);
                smInt.resetStateMachine(new DefaultStateMachineContext<>(article.getState(), null, null, null));
            });

        sm.start();

        return sm;
    }
}
```

저희의 구현은 각 이벤트 핸들러 메서드에 동일한 패턴을 따릅니다. build() 메서드를 사용하여 Article을 빌드하고, 상태 머신 식별자로서 article id를 사용하여 상태 머신 객체를 가져옵니다. 그런 다음 상태 머신에 인터셉터를 설정하고 시작합니다.

이 작업이 완료되면 현재 단계와 관련된 이벤트를 보내고, sendEvent() 메서드에서 이벤트에 전달된 메시지의 헤더에 article id를 설정하는 것을 확인합니다.

이러한 패턴을 사용하면 beginEditing(Long articleId)와 같은 각 핸들러 메서드는 간단하며 상태 머신에 정보를 보내기 위해 이 두 메서드를 재사용할 수 있습니다.

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

구현을 마쳤습니다. 하지만 상태 머신을 어떻게 테스트할 수 있을까요?

## 테스트

테스트는 서비스 클래스에서 수행할 수 있습니다. 테스트에서는 이벤트에 따라 원하는 결과가 처리되는지 확인하고, 논문을 수락하거나 거부하는 의사 코드를 테스트합니다. 이는 표준 SpringBoot 단위 테스트를 통해 수행됩니다.

```java
@SpringBootTest
class ArticleServiceImplTest {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleService articleService;

    private ArticleDto dto;

    @BeforeEach
    void setUp() {
        dto = new ArticleDto();
        dto.setText("샘플 텍스트");
    }

    @Transactional
    @Test
    void beginEditing() {

        Article newArticle = articleService.newArticle(dto);

        assertThat(newArticle.getState()).isEqualTo(ArticleStates.UNEDITED_ARTICLE);

        StateMachine<ArticleStates, ArticleEvents> sm = articleService.beginEditing(newArticle.getId());

        articleRepository.getOne(newArticle.getId());

        assertThat(sm.getState().getId()).isEqualTo(ArticleStates.EDITING_IN_PROGRESS);
    }

    @Transactional
    @RepeatedTest(10)
    void testFullFlow() {
        Article newArticle = articleService.newArticle(dto);

        System.out.println(newArticle.getState());
        assertThat(newArticle.getState()).isEqualTo(ArticleStates.UNEDITED_ARTICLE);

        StateMachine<ArticleStates, ArticleEvents> sm = articleService.beginEditing(newArticle.getId());

        assertThat(sm.getState().getId()).isEqualTo(ArticleStates.EDITING_IN_PROGRESS);

        sm = articleService.beginReviewing(newArticle.getId());
        assertThat(sm.getState().getId()).isEqualTo(ArticleStates.ARTICLE_IN_REVIEW);

        sm = articleService.publish(newArticle.getId());
        if (sm.getState().getId().equals(ArticleStates.ARTICLE_PUBLISHED)) {
            assertThat(sm.getState().getId()).isEqualTo(ArticleStates.ARTICLE_PUBLISHED);
        } else {
            assertThat(sm.getState().getId()).isEqualTo(ArticleStates.EDITING_IN_PROGRESS);
        }
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

우리는 상태를 확인했습니다.

이 내용은 여러 차례 언급되었지만, 이 유닛 테스트에서 필요한 것은 API 및 이벤트 기반 메시지를 통해 인간 또는 기계 상호작용을 통해 상태가 진행됨에 따라 호출되어야 합니다.

# 요약

이 기사에서는 Spring Statemachine (SSM)의 전체 구현을 살펴보았습니다. 우리는 액션, 이벤트, 전이, 가드와 같은 상태 기계의 주요 구성 요소 및 청취자(listener)와 인터셉터를 사용하여 상태 기계와 인터페이스하는 방법을 살펴보았습니다.

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

마침내, 모든 것을 연결하는 서비스 클래스가 구현되었고, 우리는 단위 테스트로 확인했습니다.

적절한 사용 사례에 대한 상태 머신은 개발자 도구 상자에 보관해야 하는 매우 강력하고 복잡성을 줄이는 메커니즘입니다.

언제나 이 기사의 소스는 제 Github 저장소에서 찾을 수 있습니다.

여정을 즐기세요.
