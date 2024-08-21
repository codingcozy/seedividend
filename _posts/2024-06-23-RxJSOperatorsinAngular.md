---
title: "Angular에서 꼭 알아야 할 RxJS 연산자들"
description: ""
coverImage: "/assets/img/2024-06-23-RxJSOperatorsinAngular_0.png"
date: 2024-06-23 14:10
ogImage:
  url: /assets/img/2024-06-23-RxJSOperatorsinAngular_0.png
tag: Tech
originalTitle: "RxJS Operators in Angular"
link: "https://medium.com/@mlkpatel0/rxjs-operators-in-angular-fd199de5143e"
isUpdated: true
---

RxJS 연산자는 Angular의 강력한 기능으로, 데이터 스트림을 조작하고 변환할 수 있는 기능입니다. Observable과 함께 사용하여 데이터를 필터링, 매핑, 축소하고 기타 작업을 수행할 수 있습니다.

파이프 연산자(Pipeable Operator)는 Observable을 입력으로 받아 다른 Observable을 반환하는 함수입니다. 이는 순수한 작업입니다: 이전 Observable은 변경되지 않습니다.

다음은 Angular에서 자주 사용되는 몇 가지 RxJS 연산자 예시입니다:

- map: 이 연산자는 observable에서 방출되는 데이터를 변환하는 데 사용됩니다. 예를 들어, 숫자 스트림을 방출하는 observable이 있다면, 각 숫자의 값을 두 배로 만들기 위해 map 연산자를 사용할 수 있습니다.

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

import 'of' from ‘rxjs’;

import 'map' from ‘rxjs/operators’;

![Image 1](/assets/img/2024-06-23-RxJSOperatorsinAngular_0.png)

![Image 2](/assets/img/2024-06-23-RxJSOperatorsinAngular_1.png)

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

- filter : 이 연산자는 옵저버블에서 방출된 데이터를 필터링하는 데 사용됩니다. 예를 들어, 숫자 스트림을 방출하는 옵저버블이 있다면, filter 연산자를 사용하여 짝수만 방출할 수 있습니다:

```javascript
import { of } from ‘rxjs’;
import { filter } from ‘rxjs/operators’;
```

![RxJS Operators in Angular](/assets/img/2024-06-23-RxJSOperatorsinAngular_2.png)

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

![이미지](/assets/img/2024-06-23-RxJSOperatorsinAngular_3.png)

- mergeMap: 이 연산자는 여러 개의 옵저버블을 하나의 옵저버블로 병합하는 데 사용됩니다. 예를 들어 데이터 스트림을 방출하는 두 옵저버블이 있다면 mergeMap 연산자를 사용하여 두 스트림을 하나로 병합할 수 있습니다:

import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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

![이미지1](/assets/img/2024-06-23-RxJSOperatorsinAngular_4.png)

![이미지2](/assets/img/2024-06-23-RxJSOperatorsinAngular_5.png)

- forkJoin: RxJS의 forkJoin 연산자는 여러 옵저버블이 완료될 때까지 기다린 다음 각 옵저버블이 발행한 마지막 값의 배열을 방출하는 데 사용됩니다. 이 연산자는 여러 요청을 동시에 수행하고 모든 요청이 완료된 후에만 작업을 수행해야 할 때 유용합니다.

아래는 Angular에서 forkJoin을 사용하여 여러 HTTP 요청을 수행한 다음 결과를 결합하는 예시입니다:

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

```typescript
import { forkJoin, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

![RxJS Operators in Angular 6](/assets/img/2024-06-23-RxJSOperatorsinAngular_6.png)
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

이 예제에서는 HttpClient 모듈을 사용하여 두 개의 HTTP 요청을 보냈고 forkJoin 연산자를 사용하여 두 요청이 완료될 때까지 기다렸습니다. 그런 다음 구독(subscribe) 메서드를 사용하여 결과를 처리하는데, 이는 두 요청에서 마지막으로 방출된 값들의 배열입니다.

또한 forkJoin은 observables의 배열을 사용할 수도 있으므로 2개 이상의 요청을 기다리는 데 사용할 수 있습니다.

forkJoin은 여러 요청이 완료될 때까지 기다려야 하는 경우 유용한 연산자이며, 코드를 더 읽기 쉽고 유지 관리하기 쉽게 만들 수 있습니다.

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

- switchMap: RxJS의 switchMap 연산자는 옵저버블에서 방출되는 값들을 주어진 함수를 적용하여 새로운 옵저버블로 평탄화하는 데 사용됩니다. 이 연산자는 현재 옵저버블의 값에 따라 요청을 만든 다음 값이 변경되면 새로운 옵저버블로 전환할 때 유용합니다.

다음은 Angular에서 switchMap을 사용하여 검색 입력란에 입력된 텍스트를 기반으로 서버에서 사용자를 검색하는 방법의 예시입니다:

![이미지](/assets/img/2024-06-23-RxJSOperatorsinAngular_8.png)

위 예시에서 fromEvent는 사용자가 검색 입력란에 타이핑할 때 이벤트를 방출하는 옵저버블을 만드는 데 사용되고, debounceTime 연산자는 사용자가 타이핑을 멈출 때까지 기다렸다가 값을 방출하는 데 사용됩니다. distinctUntilChanged 연산자는 값이 변경될 때만 값을 방출하고, 마지막으로 switchMap은 http 요청에 의해 생성된 새로운 옵저버블로 전환하는 데 사용됩니다. 각 새로운 keyup 이벤트마다 이전 요청이 취소되고 새로운 요청이 수행됩니다.

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

`switchMap`는 현재 observable 값에 기반하여 새로운 observable로 전환해야 하는 시나리오를 처리하는 데 사용할 수 있는 강력한 연산자입니다. 새 값이 발행될 때 과거 요청을 취소하는 데 유용합니다.

- **concatMap**: RxJS에서 Observable을 해체하여 각 값에 대해 매핑 함수를 적용하고, 그 결과 Observables를 발행된 순서대로 연결하는 연산자입니다. 배열의 각 항목에 대해 HTTP 요청을 만들기 위해 `concatMap`을 사용하는 예시가 다음에 나와 있어요:

![2024-06-23-RxJSOperatorsinAngular_9.png](/assets/img/2024-06-23-RxJSOperatorsinAngular_9.png)

![2024-06-23-RxJSOperatorsinAngular_10.png](/assets/img/2024-06-23-RxJSOperatorsinAngular_10.png)

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

이 예제는 관찰 가능한을 만들기 위해 from을 사용하여 숫자 1, 2, 3을 방출합니다. 그런 다음 concatMap 연산자를 사용하여 각 숫자를 URL에서 JSON 객체를 가져오는 HTTP 요청으로 매핑합니다. 결과 관찰 가능은 숫자가 방출된 순서대로 JSON 객체를 방출할 것입니다.

이것은 RxJS에서 사용 가능한 많은 연산자 중 일부 예시에 불과합니다. 이러한 연산자를 조합하여 다양한 사용 사례를 처리하는 강력하고 표현력 있는 데이터 파이프라인을 만들 수 있습니다.

읽어 주셔서 감사합니다!

계속 학습하려면 저를 따라 주세요!
