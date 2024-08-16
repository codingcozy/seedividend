---
title: "JS 정규표현식 성능 문제 해결 방법"
description: ""
coverImage: "/assets/img/2024-06-22-JSRegexpPerformanceIssue_0.png"
date: 2024-06-22 06:08
ogImage: 
  url: /assets/img/2024-06-22-JSRegexpPerformanceIssue_0.png
tag: Tech
originalTitle: "JS Regexp Performance Issue"
link: "https://medium.com/@arielguata/one-common-reason-for-performance-problems-in-input-or-string-validations-is-the-complexity-of-2fa66bd2c2dd"
isUpdated: true
---




## 자주, 우리는 잠재적인 성능 문제를 인식하지 못하고 간단한 문자열 검색을 위해 정규식 표현을 사용합니다.

![이미지](/assets/img/2024-06-22-JSRegexpPerformanceIssue_0.png)

입력 또는 문자열 유효성 검사의 성능 문제의 일반적인 이유 중 하나는 정규식 검사의 복잡성입니다.

크롬 기반 브라우저 (예: Chrome, Edge, Opera 등)에는 정규식 엔진과 관련된 알려진 문제가 있습니다. Firefox도 마찬가지 문제를 가지고 있습니다. 왜냐하면 SpiderMonkey 엔진이 Chrome의 정규식에 동일한 엔진을 사용하기 때문입니다. 문제는 엔진이 정규식을 테스트하는 방법 (백트래킹 알고리즘)에서 나옵니다. 엔진이 적합한 패턴을 찾을 수 없을 때 검색을 완료하는 데 필요한 시간복잡도가 기하급수적으로 높아지기 때문입니다.

<div class="content-ad"></div>

이 문제를 확인하려면 새 탭을 열고 about:blank로 이동하십시오. 콘솔에서 다음 코드 조각을 실행하십시오. URL에 사용된 ID의 길이에 따라 정규 표현식 검색을 완료하는 데 걸리는 시간이 다를 수 있습니다.

만약 숫자와 단어 "ID"가 연달아 나오는 형식의 ID가 있는지 확인하고 싶다면 아래의 코드를 실행해보세요:

```js
const url1 = "www.somesite1.com/18329719832791721285462id/user"
const url2 = "www.somesite2.com/18329719832791721285462/user"

let start = performance.now();
/(\d*)*(id)/.exec(url1);
console.log(performance.now() - start)

start = performance.now();
/(\d*)*(id)/.exec(url2);
console.log(performance.now() - start)
```

위 코드의 성능평가:

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-22-JSRegexpPerformanceIssue_1.png)

만약 우리가 숫자로 구성된 ID 뒤에 "id"라는 단어가 오는 존재를 확인하려고 한다고 가정해봅시다. 우리의 정규 표현식에서는 (\d*) 표현식이 반복되는 숫자 시퀀스를 찾습니다. 하나의 추가와일드카드로 감싸면 엔진은 시퀀스의 시퀀스를 찾습니다. 와일드카드 하나를 제거하면 여전히 동일한 결과를 얻으면서 검색에 필요한 시간을 크게 줄일 수 있습니다.

(백트래킹 알고리즘의 문제에 대해 더 자세히 설명된 것은 여기에서 확인할 수 있습니다)

결론:


<div class="content-ad"></div>

- regexp는 필요한 경우에만 사용하고 기본 선택지로 사용하지 마세요. includes() 및 split() 메소드를 사용하여 동일한 결과를 얻을 수 있습니다.
- 때로는 성능 문제를 일으키지 않는 새로운 regexp 패턴을 수정하거나 만들 수 있습니다.
- 각 추가된 문자로 성능 문제가 크게 증가하거나 문자열 검색이 있는 경우 해당 함수가 regexp를 사용한 것일 수 있음을 나타낼 수 있습니다.