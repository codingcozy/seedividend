---
title: "Spring Boot 메모리 용량을 초과하는 데이터를 처리하는 REST 엔드포인트 방법"
description: ""
coverImage: "/assets/img/2024-07-06-SpringBootHandlingaRESTEndpointThatQueriesMoreDataThanMemoryAvailable_0.png"
date: 2024-07-06 10:38
ogImage: 
  url: /assets/img/2024-07-06-SpringBootHandlingaRESTEndpointThatQueriesMoreDataThanMemoryAvailable_0.png
tag: Tech
originalTitle: "Spring Boot: Handling a REST Endpoint That Queries More Data Than Memory Available"
link: "https://medium.com/javajams/spring-boot-handling-a-rest-endpoint-that-queries-more-data-than-memory-available-a0c049548d04"
isUpdated: true
---




만약 개발자이고 아직 이 문제에 직면해 보지 않은 경우라도, 언젠가는 Spring Boot REST 엔드포인트를 만들어야 하는 상황에 직면하게 될 것이므로 이 글을 읽는 것이 여전히 가치가 있습니다.

/assets/img/2024-07-06-SpringBootHandlingaRESTEndpointThatQueriesMoreDataThanMemoryAvailable_0.png

이 기사에서는 메모리에 맞지 않는 결과를 가진 데이터베이스 쿼리를 수행하는 Spring Boot REST 엔드포인트의 예제를 살펴보겠습니다.

# 시나리오

<div class="content-ad"></div>

이 연습에서는 Customer, Order, OrderItem 및 Product을 포함하는 간단한 시나리오를 사용해 봅시다:

![Image](/assets/img/2024-07-06-SpringBootHandlingaRESTEndpointThatQueriesMoreDataThanMemoryAvailable_1.png)

우리의 목표는 보고서를 생성하는 엔드포인트를 만드는 것입니다. 이 엔드포인트는 다음을 조회하고 반환할 것입니다:

- 백만 건의 주문.
- 500만 개 이상의 주문 아이템.

<div class="content-ad"></div>

# 전통적인 구현 방식

일부 필드를 가진 DTO를 정의해 봅시다:

```js
@Data
public class ReportDto {
  private final Long orderId;
  private final LocalDate date;
  private final String customerName;
  . . .
  private final List<Item> items;

  @Data
  public static class Item {…
``` 