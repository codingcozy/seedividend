---
title: "API 성능 향상 병렬 처리, 일괄 처리, 그리고 Bson 필터"
description: ""
coverImage: "/assets/img/2024-05-15-ImprovingAPIperformanceParallelprocessingbatchingandBsonfilters_0.png"
date: 2024-05-15 02:43
ogImage: 
  url: /assets/img/2024-05-15-ImprovingAPIperformanceParallelprocessingbatchingandBsonfilters_0.png
tag: Tech
originalTitle: "Improving API performance: Parallel processing, batching and Bson filters"
link: "https://medium.com/@mr.subhamdhillon/improving-api-performance-parallel-processing-batching-and-bson-filters-6bc43b3886af"
isUpdated: true
---




이 글에서는 개발자가 API의 성능을 향상시키기 위해 사용할 수 있는 최적화 시리즈를 탐색해 보겠습니다. API를 디자인할 때 최적의 성능을 확보하는 것이 중요합니다. 그러나 때로는 사용 가능한 도구를 효과적으로 활용하지 못하거나, 충분한 정보가 없어 판단을 내리기 어려울 수 있습니다.

일반적인 시나리오를 살펴보겠습니다: 데이터베이스에서 카테고리 및 해당 카테고리에 속한 제품을 가져오는 과정입니다. 우리는 구현할 수 있는 다양한 최적화 또는 수정 단계를 따라갈 것입니다.

```js
List<Category> categories = getAllCategory();
        
categories.forEach(category -> {
    Product product = getProductByCategory(category.getId());
    productList.add(product);
});
```

이 코드 조각은 잘 작동하며 우리가 하려고 하는 작업을 수행합니다. 그런데 더 나은 방법이 있을까요?



병렬 스트림이 도와드릴게요!!!

Java는 API 성능을 향상시키기 위해 병렬 스트림을 제공하지만 효율적으로 사용하지 않으면 시스템 가속화에 도움이 되지 않을 수 있습니다. 병렬 스트림은 백그라운드 OS 스레드를 활용하여 실행하므로 스레드 컨텍스트 전환의 오버헤드를 고려하면서 효과적으로 사용하는 방법을 이해하는 것이 중요합니다.

배치 처리 소개

한 걸음 더 나아가서 일부 배치 처리를 사용하고 병렬 스트림을 활용하여 더욱 최적화할 수 있습니다.



```java
List<Category> categories = getAllCategory();
List<List<Category>> partitionedCategories = Lists.partition(categories, 50);

partitionedCategories.parallelStream().forEach(categoryBatch -> {
    categoryBatch.parallelStream().forEach(category -> {
        Product product = getProductByCategory(category.getId());
        productList.add(product);
    });
});
```

파티션 함수는 원본 목록을 지정된 배치 크기를 기준으로 일괄로 나눕니다. 예를 들어, 원본 목록에 220개의 요소가 있다면 결과 목록은 크기가 `50, 50, 50, 50, 20`인 5개의 요소로 나눠질 것입니다.

그리고 이제 중첩된 병렬 스트림을 사용하여 요소를 반복할 수 있습니다.

다중 처리를 잘 활용한 것 같은데, 더 개선할 부분이 있을까요?



데이터베이스 최적화

이제 최적화된 접근법처럼 보이지만, 여전히 DB(데이터베이스)에 N번 접근하고 있습니다. 다만, 여러 스레드를 사용하여 동일한 작업을 수행하고 있을 뿐입니다.

더 좋은 접근 방식은 분할된 목록을 사용하여 WHERE 절을 구성하고 여러 카테고리 ID를 전달하여 단일 데이터베이스 호출을 실행하는 것입니다.

```js
db.getCollection('Product').find({'category_id':{$in:['categoryId1','categoryId2']}
```



```js
Bson filter = Filters.in("categoryId", "categoryId1", "categoryId2");
// 마찬가지로 필터를 사용하여 카테고리 ID를 전달할 수 있습니다.
List<Category> categories = getAllCategory();
List<List<Category>> partitionedCategories = Lists.partition(categories, 50);

partitionedCategories.parallelStream().forEach(categoryBatch->{
    Bson filter = Filters.in("categoryId", categoryBatch);
    List<Product> productsBatch = getProducts(filter);
    productList.addAll(productsBatch);
});
```

Bson 필터를 사용하여 데이터 검색을 구현하면 API에 유연성을 추가할 수 있어서 클라이언트가 쿼리를 자신의 요구에 맞게 조정할 수 있습니다. 이 방식은 API의 사용성을 향상시키고 다양한 시나리오에서 유용하게 사용할 수 있도록 합니다.

지금까지 한 작업을 요약해볼까요!

정말 멋진 개선이군요. 일괄 검색 및 여러 스레드를 활용하면 데이터베이스 호출 수를 줄이고 병렬 처리를 효율적으로 활용하여 성능을 크게 향상시킬 수 있습니다. API의 성능에 상당한 최적화가 되었으므로 성능 상에서 뚜렷한 차이를 느낄 수 있을 겁니다.




이 풀 리퀘스트는 정말 리뷰할 준비가 되어 있어요! 😄🚀