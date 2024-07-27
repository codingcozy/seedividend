---
title: "PySpark의 Cache 기능에 대한 오해"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-CacheinPySparkAmisconception_0.png"
date: 2024-07-06 10:34
ogImage:
  url: /assets/img/2024-07-06-CacheinPySparkAmisconception_0.png
tag: Tech
originalTitle: "Cache() in PySpark — A misconception"
link: "https://medium.com/@rubihali/cache-in-pyspark-a-misconception-3b1f97dd149b"
---

/assets/img/2024-07-06-CacheinPySparkAmisconception_0.png

파이스파크(Pyspark)에서 변환(transformations)과 액션(actions) 사이의 미묘한 차이를 이해하는 것은 데이터 처리 워크플로우를 최적화하는 데 중요합니다. 하나의 흔한 오해는 성능 최적화에 중요한 역할을 하는 `cache()` 함수를 액션으로 잘못 인식하는 것입니다.

이 오해를 자세히 살펴보자

# 변환(Transformations) 및 액션(Actions)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 변환 작업: RDD(Resilience Distributed Dataset)에 대한 연산을 의미하며, 새로운 RDD를 생성합니다. 이러한 작업들은 지연 계산을 사용하여 즉시 결과를 계산하지 않습니다. 중요한 예로는 filter(), join(), flatMap(), cache() 등이 있습니다. (이 목록에 cache()가 포함된 것을 보고 놀라셨을 거라고 생각하지만, 이 내용을 확인하시면 더 큰 깨달음을 얻게 될 거에요 😉)
- 액션: 액션은 변환 작업을 실행하여 결과를 생성하거나 데이터를 외부 저장소에 쓸 때 사용됩니다. 중요한 예로는 collect(), count(), reduce(), saveAsTextFile() 등이 있습니다.

# cache()가 액션으로 오해되는 부분에 대한 해명

cache()는 RDD를 메모리에 저장하여 이후의 작업에서 빠르게 접근할 수 있도록 표시하는 변환 작업입니다. 이는 즉시 계산을 수행하지 않으며, 단지 RDD가 최초 계산을 수행한 후 메모리에 유지되어야 함을 나타냅니다.

cache()가 효과를 발휘하는 경우:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

RDD의 실제 캐싱은 액션이 호출될 때에만 발생합니다. 예를 들어, 캐싱된 RDD에 count()와 같은 액션을 수행하면, Spark는 RDD를 계산한 다음 미래 사용을 위해 메모리에 저장합니다.

```js
rdd = sc.parallelize([1, 2, 3, 4, 5])
cached_rdd = rdd.map(lambda x: x * 2).cache()  # 이것은 변환입니다

# 현재까지 아직 계산이 발생하지는 않았습니다.

count = cached_rdd.count()  # 이것은 액션으로 계산 및 캐싱을 트리거합니다
```

# 요약:

- 변환(Transformation): cache()는 데이터를 메모리에 유지함으로써 미래의 액션을 최적화하는 방법을 Spark에 알려줍니다.
- 액션(Action): count(), collect()와 같이 실제 계산을 트리거하는 모든 작업은 변환(캐싱 포함)이 실행되도록 합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이러한 포인트를 이해하면 cache()가 변환(transform)이며 동작(action)이 아닌 이유가 명확해지리라고 생각해요. cache()는 미래 계산을 최적화하는 데 도움을 주지만 직접적인 계산을 일으키지는 않아요.
