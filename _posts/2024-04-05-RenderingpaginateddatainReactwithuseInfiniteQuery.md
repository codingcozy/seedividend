---
title: "React에서 useInfiniteQuery를 사용하여 페이지네이션된 데이터 렌더링하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Rendering paginated data in React with useInfiniteQuery"
link: "https://medium.com/@seeusimong/rendering-paginated-data-in-react-with-useinfinitequery-ece9771ec3a3"
isUpdated: true
---

## 여러 페이지의 데이터를 가져와 표시해야 했던 적이 있나요? 아니면 무한 스크롤 피드를 구현하고 싶은 경우가 있나요? useInfiniteQuery를 사용하면 어떻게 도움을 받을 수 있는지 알아보세요.

이 글에서는 React Query와 그 useInfiniteQuery 훅을 사용하여 React의 사용자 인터페이스 컴포넌트에서 확장 가능하고 재사용 가능한 데이터 가져오기 패턴을 만드는 방법을 탐색해보겠습니다.

참고: 이 글은 React Query (TanStack Query)의 v5.0이 출시된 후에 쓰여졌습니다. 이 글은 v4.x를 기반으로 작성되었으므로 라이브러리 설명서를 확인하려면 [여기](https://react-query.tanstack.com/)를 참고하세요.

## 동기부여

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

자주 사용자 인터페이스를 구현할 때 데이터 목록을 표시하는 경우 한꺼번에 전체 목록을 가져와 사용자에게 표시하는 유혹이 있을 수 있습니다. 그러나 데이터 크기가 커지면 한꺼번에 모든 데이터를 가져오는 데 더 오래 걸리고 사용자 경험이 부정적으로 영향을 받을 수 있습니다. 이로 인해 서버가 응답하는 데 더 오랜 시간이 걸리고 이로 인해 사용자는 페이지가로드 될 때까지 더 오래 기다려야 합니다. 데이터가 한꺼번에 렌더링되어도 사용자는 화면 높이만큼만 볼 수 있으며 긴 데이터 목록에서 계층이 없으면 탐색이 어려울 수 있습니다. 이는 특히 테이블 또는 밀도 있는 데이터 디스플레이의 경우 매우 부담스러울 수 있습니다.

이를 해결하기 위해 데이터 목록 뒤에 추가되는 데이터가 끝없이 스크롤링이나 페이지네이션과 같은 렌더링 패턴이 유용하며 데이터를 조직화하고 사용자에게 유용한 방식으로 표시할 수 있습니다. 데이터를 페이지별로 나누면 사용자에게 표시할 초기 페이지를 가져와 사용자에게 표시하고 사용자가 다음 데이터 페이지로 이동하려는 경우에만 다음 페이지를 가져올 수 있습니다. 반면에 무한 스크롤링은 소셜 미디어 피드에서 영감을 받아 사용자가 이전 게시물을 가져오기 위해 단순히 아래로 스크롤만 하면 되는 방법으로, 로그나 이벤트의 세부 데이터를 검색하고 표시할 때 유용할 수 있습니다.

전형적으로 이는 페이지나 보기를 구성하는 데이터 세그먼트마다 일관된 방식으로 가져와 클라이언트 브라우저에 저장되도록 보일러플레이트 코드와 오류 경계가 많이 필요합니다. 이것은 데이터 서버에서 동일한 데이터를 반복적으로 제공하는 API 호출 및 부하를 줄이고 데이터 가져오기로 인해 발생할 수 있는 API 오류나 느린 네트워크 연결과 같은 오류나 상태 변경을 graceful하게 처리할 수 있도록 합니다. 이러한 기능을 사용자 정의로 구현하면 오류가 많이 발생하며 디버깅하기 어려울 수 있습니다.

useInfiniteQuery를 활용하여 이 문제를 완화하고 사용자 경험을 향상시키는 방법을 알아보겠습니다.

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

React에서 이 경험을 구현하려면 두 부분으로 나눠 보겠습니다:

- 데이터 또는 '모델' 레이어, 그리고
- 디스플레이 또는 '뷰' 레이어.

## 데이터 레이어

이를 애플리케이션의 맥락에 두겠습니다. '서버'에는 사용자에게 프런트엔드에 표시하고 싶은 데이터 목록이 있습니다. 인스타그램의 경우, 이는 '게시물' 항목의 피드가 될 것이고 Gitlab의 CI 러너 로그 표시의 경우, 이는 '로그 항목'의 스트림이 될 것입니다. 이미 알고 있듯이 데이터를 조회할 때 데이터베이스나 서버에 부하를 줄이기 위해 이것을 '페이지'로 분할해야 합니다.

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

그러므로 데이터를 페이지별로 나누어 보여주기 위해 '커서'도 필요합니다. REST API 패턴에 익숙하신 분들에게는 자연스럽게 느껴질 것입니다. TypeScript에서는 이러한 형태로 최소한의 데이터가 REST API에서 반환되어야 합니다:

```js
interface Page {
  data: Data[]
  previousCursor?: number;
  nextCursor?: number;
}
```

데이터는 Data 배열로 제공되며, 이전/이후 페이지가 있는 경우 커서가 반환됩니다. 예를 들어 데이터가 '첫 번째' 페이지인 경우, '2'라는 nextCursor 값을 반환하여 두 번째 페이지를 검색할 수 있습니다. 마찬가지로, 데이터 시퀀스의 '마지막' 페이지인 경우 이전 페이지로 이동하기 위해 previousCursor를 반환할 수 있습니다. 이는 데이터 스트림이나 API 엔드포인트를 통해 원하는 방법으로 제공할 수 있습니다. 또한, 커서는 숫자뿐만 아니라 문자열 토큰이나 다른 유형도 될 수 있습니다. 이는 데이터 소스에 따라 다릅니다.

이제 데이터 레이어를 설정했으니, frontend로 이동하여 useInfiniteQuery를 사용하여 페이지별 데이터를 가져오는 데 도움을 받겠습니다.

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

## Display Layer: useInfiniteQuery

더 나은 유형 안전성과 자동 완성을 위해 TypeScript에서 이 후크를 살펴 봅시다. 처음 보면, 이 후크는 다소 복잡해 보입니다:

```js
import { useInfiniteQuery } from "@tanstack/react-query";

interface Page {
  data: Data[];
  previousCursor?: number;
  nextCursor?: number;
}

// 참고 - 이는 React 컴포넌트 내부에서만 사용할 수 있습니다
const {
  data, // 모든 페이지에서 누적된 데이터: InfiniteQueryData<Page>
  error, // 발생한 어떤 오류든
  fetchNextPage, // 다음 페이지를 가져오는 함수
  fetchPreviousPage,
  hasNextPage, // 다음 페이지를 사용할 수 있는지 나타내는 부울 값
  hasPreviousPage,
  isError, // 오류가 발생했는지 여부
  isFetching, // 쿼리 함수가 실행 중인지 여부
  isFetchingNextPage,
  isFetchingPreviousPage,
  status, // 'error' | 'loading' | 'success' - 이 후크의 상태를 나타냄
} = useInfiniteQuery<Page, Error>({
  queryKey: ['data'],
  queryFn: fetchData,
  getLastPageParam: (firstPage: Page, pages: Page[]) => (
    firstPage.previousCursor
  ),
  getNextPageParam: (lastPage: Page, pages: Page[]) => (
    lastPage.nextCursor
  ),
})
```

이는 useInfiniteQuery 함수로 반환된 전체 객체를 해체하고 있기 때문에 그래서 복잡해 보일 수 있습니다. 위에서 보듯이, 이는 데이터 가져오기를 제어하는 다양한 유용한 상태 객체와 함수를 제공합니다. isFetchingPreviousPage와 같은 특정 상태가 필요하지 않다면 이를 생략할 수 있습니다.

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

먼저 시작하려면 다음과 같은 매개변수들이 필요합니다:

- DataType: queryFn에 의해 반환되는 데이터의 형식입니다. 이것은 paginate된 쿼리 함수에게 다음 페이지 또는 이전 페이지를 제공할 수 있습니다. 이는 데이터를 가져올 "페이지"가 무엇인지 알려줍니다.
- queryFn: paginate된 데이터를 가져오는 비동기 데이터 가져오는 함수입니다.
- ErrorType: 데이터를 가져오는 함수에서 발생할 수 있는 오류의 유형입니다.
- getNextPageParam 또는 getPreviousPageParam: 데이터의 처음 또는 마지막 페이지가 포함된 모든 데이터 페이지 배열인 pages에서 다음/이전 페이지를 가져오기 위해 queryFn에 전달할 매개변수를 가져옵니다.

더 자세한 검토를 통해 해당 함수가 몇 가지 유용한 상태 객체를 반환한다는 것을 알 수 있습니다:

- data: 모든 데이터 상태를 포함하는 전체 데이터입니다.
- error: queryFn에 의해 반환된 오류입니다. isError가 false이면 null이 될 것입니다.
- hasNextPage 또는 hasPreviousPage: 현재 페이지에 queryFn이 해당 다음/이전 페이지를 가져올 수 있는 nextCursor 또는 lastCursor가 포함되어 있는지 여부입니다. 좀 더 자세히 살펴보도록 하죠.

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

테이블 태그를 Markdown 형식으로 변경해주세요.

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

```js
// 1. 매개변수 없음!
const fetchData = async () => {};

// 2. pageParam - 페이징된 API에 대한 커서로 작동하는 매개변수
const fetchData = async ({ pageParam = 0 }) => {
  // 위에서 `0`로 설정했습니다.
  // 그러나 이것은 원하는 데이터 형식을 취할 수 있습니다 - 이는 서버에 달려 있습니다.
};
```

대부분의 경우에는 데이터를 가져오기 위해 프론트엔드에서 데이터 서버나 API로 비동기 호출이 필요합니다. 더불어 React에서는 useCallback이나 useMemo와 같은 함수로이 함수를 래핑해야하며 오류 상태와 로딩 상태를 수동으로 처리해야합니다. 위의 예제에서는 useInfiniteQuery로 전달하여 오류 및 로딩 상태를 처리하고 데이터를 데이터 객체에 저장합니다.

이로써 불필요한 다시 렌더링을 유발할 수있는 useState와 같은 여러 상태 저장 함수를 사용하는 필요성이 사라집니다. 가능하다면 다음/이전 페이지의 페이징 커서를 얻기 위해 getNextPageParam 및 getPreviousPageParam과 통합 할 수 있는 두 번째 기능을 사용하는 것이 이상적이며 React Query 구문에서는 queryFn에 pageParam 속성이있는 객체로 전달됩니다.

## 표시 레이어: 페이지네이션

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

이제 페이지된 데이터를 보여주는 간단한 표시 컴포넌트를 구현해 보겠습니다. 이 컴포넌트는 다음 구성요소를 제공해야 합니다:

- 각 '페이지'를 데이터에 표시하는 스크롤 가능한 목록 표시
- 다음/이전 페이지를 가져오는 버튼
- 로딩 또는 오류 상태에 대한 처리를 하는 우아한 상태 처리

다음은 useInfiniteQuery 훅을 사용하는 간단한 컴포넌트입니다:

```js
// PaginatedDisplay.tsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

import DisplayComponent from "...."; // 사용자 정의 항목 표시

interface Page {
  data: Data[];
  previousCursor?: number;
  nextCursor?: number;
}

// `page` 매개변수로 페이지별 API에서 가져옵니다
const fetchData = async ({ pageParam = 0 }) => {
  return await fetch(`.../?page=${pageParam}`)
    .then(res => res.json()); // Page 유형이어야 함
}

export default function PaginatedDisplay() {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data, // InfiniteQueryData<Page>
    error, // Error
    fetchNextPage,
    hasNextPage, // boolean
    isError,
    isFetching, // boolean
    isFetchingNextPage,
  } = useInfiniteQuery<Page, Error>({
    queryKey: [‘data’],
    queryFn: fetchData,
    getNextPageParam: (lastPage: Page, pages: Page[]) => (
      lastPage.nextCursor
    ),
  });

  return (
    <div>
      {/* 주 데이터 레이어 - 마지막으로 가져온 페이지만 표시 */}
      <div>
        { /* data.pages: Page[] */ }
        {
          isFetching
          ? (<div>Loading...</div>)
          : isError
          ? (<div>{error}</div>)
          : data.pages[currentPage].data
              .map((item, index) => (
                <DisplayComponent key={index} {...item} />
              ))
        }
      </div>
      {/* 페이지네이션 컨트롤 */}
      <div>
        <button
          disabled={currentPage === 0}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }
        >
          {/* 현재 페이지가 첫 번째가 아닌 경우 */}
          { currentPage > 0
            ? "이전 페이지"
            : "더 이전 데이터 없음"
          }
        </button>
        <button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => {
            // 다음 페이지가 아직 로드되지 않은 경우
            if (data.pages.length <= currentPage + 1) {
              fetchNextPage();
            }
            setCurrentPage(currentPage + 1);
          }
        >
          {isFetchingNextPage
            ? "다음 페이지 불러오는 중"
            : hasNextPage
            ? "다음 페이지"
            : "나중 데이터 없음"
          }
        </button>
      </div>
    </div>
  )
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

위의 함수형 컴포넌트에서 나타나는 것처럼, 이는 간단히 데이터 페이지를 가져와서 현재 페이지로 설정하고 페이지 배열에서 항목 목록을 표시하는 역할을 합니다. 컴포넌트는 그런 다음 마지막으로 가져온 페이지의 항목 목록을 업데이트합니다.

여기서 useInfiniteQuery가 유용한 이유가 있습니다. 이는 오류 상태 및 로딩 상태를 제공하며, 우리를 위한 데이터 상태 저장소를 갖고 있습니다. 이제 우리는 현재 페이지 상태를 관리하는 것만 남았고, 심지어 다른 데이터 페이지를 가져오는 데 제공된 함수를 사용할 수도 있습니다. 또한 사용자 경험을 향상시키기 위해 사용자 정의 스타일과 결합할 수도 있습니다.

getPreviousPageParam 및 "이전 페이지" 가져오기와 관련된 모든 상태 및 함수들을 생략했음을 알 수 있습니다. 이러한 상태는 양방향 무한 쿼리를 위해 고려되지만, 데이터 페이지에서 첫 번째 페이지 앞에 오는 페이지를 가져오는 경우에 유용합니다. 이는 처음 가져온 페이지가 데이터 페이지 시퀀스에서 첫 번째가 아닌 경우에 유용할 수 있습니다. 이러한 논리의 구현은 독자에게 의해 연습으로 남깁니다 :). 우리의 경우에는 데이터 페이지 시퀀스에서 "다음" 페이지를 가져오는 작업에만 관여하며, 우리의 무한 쿼리는 단방향이라고 할 수 있습니다 (앞으로만 진행됨).

## 무한 스크롤

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

지금 훅을 사용하는 방법을 살펴보았으니, 알아낸 내용을 활용하여 무한 스크롤을 구현해 봅시다.

이 개념은 정말 간단합니다 — 사용자가 클릭할 필요 없이 단순히 아래로 스크롤하면 사용자가 fetchNextPage 함수를 호출합니다. 또한 데이터 표시를 변경하여 데이터의 모든 페이지를 표시해야 합니다.

마지막 항목이 화면에 보이는지 확인하는 다른 사용자 정의 훅을 사용하여 마지막 항목이 보이면 다음 페이지를 가져와야 합니다. 이를 위해서는 React Intersection Observer라는 라이브러리를 사용할 것입니다.

```js
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import DisplayComponent from "...."; // 여러분의 사용자 정의 항목 표시

export default function InfiniteScrollDisplay() {
  const [ref, inView] = useInView();

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error
  } = useInfiniteQuery<Page, Error>({
    queryKey: ['infiniteScroll'],
    queryFn: fetchData,
    //...
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <div>
        { /* data.pages: Page[] */ }
        {
          isError
          ? (<div>{error}</div>)
          : data.pages.map((page, pageNum) => (
              <React.Fragment key={pageNum}>
                {page.data.map((item, index) => (
                  <DisplayComponent key={index} {...item} />
                ))}
              </React.Fragment>
            ))
        }
      </div>
      {/* 페이지네이션 컨트롤 */}
      <div>
        <button
          ref={ref}
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? "다음 페이지 가져오는 중"
            : hasNextPage
            ? "더 많은 데이터 불러오기"
            : "데이터 더 이상 없음"
          }
        </button>
      </div>
    </div>
  )
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

react-intersection-observer의 후크는 배열에서 두 가지 항목을 제공합니다:

- ref — 뷰포트/가시 화면에 해당 요소가 있는지 확인하는 요소의 참조
- inView — 해당 요소가 가시인지를 나타내는 부울 값

이는 Mozilla intersectionObserver Web API를 사용하여 참조된 요소가 뷰포트에 있는지 확인하는 데 사용됩니다. 그런 다음 React useEffect 후크를 사용하여 마지막 행 버튼이 보이는 시점마다 refetch 함수를 트리거합니다. 이 fetch를 더 일찍 수행하려면 페이지 상단에있는 어떤 요소에 ref를 배치할 수 있습니다. 이는 데이터를 미리 가져와서 뷰어가 하단에 도달하기 전에 유용할 수 있습니다(예: Instagram).

useInfiniteQuery가 하는 마법은 단순히 새로운 데이터 페이지를 페이지 배열에 넣는 것입니다. 따라서 페이지는 새로운 데이터 페이지만 추가로 렌더링하면 되어 처음에 렌더링된 페이지를 그대로 유지합니다.

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

인터페이스를 개선하기 위해 스타일링을 활용할 수 있으며, 데이터가 보기 좋게 표시될 수 있도록 도와줍니다. 또한, 각 데이터 항목을 props로 전달하는 Functional Component DisplayComponent도 포함되어 있음을 알 수 있습니다. 이를 통해 각 데이터 항목을 렌더링하는 책임이 해당 컴포넌트로 옮겨져, 모든 데이터 항목이 동일한 방식으로 표시됩니다.

## 결론 및 추가 단계

이게 전부에요! 더 나아가려면, 이러한 라이브러리를 사용해 infiniteQuery를 통합해볼 수 있습니다:

- TanStack Table — 자체 재사용 가능한 테이블 컴포넌트를 사용자 정의하는 무헤드 라이브러리입니다.
- ShadCN UI — 호버 카드, 아코디언 등과 같은 일반 UI 컴포넌트를 사용자 정의하는 무헤드 라이브러리입니다.

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

React/Tanstack Query 프레임워크에 대해 더 자세히 알아보세요: React Query. 이 것은 전체 React 프론트엔드에서 데이터 가져오기/변이 작업 및 가져온 데이터 상태를 달라게합니다. 또한 위에 표시된 queryKey 값과 같이 가져온 데이터를 캐시하는 데 자주 사용됩니다.

물론 이 모든 논리를 처음부터 구현할 수 있지만, 이러한 라이브러리들은 비슷한 기능을 구현하는 데 필요한 부담과 보일러플레이트 코드를 줄여줍니다. Tanstack Table과 Tanstack Query의 경우, 데이터 상태가 변경될 때 다시 렌더링되는 횟수를 줄이는 등 더 효율적인 코드를 만들어줍니다 (컴포넌트로 반환되는 고립된 상태 저장소의 양을 줄임으로써). 또한 상태의 변경이 어떤 구성 요소들이 다시 렌더링되는지 분석하여 가능한 한 그 부분을 분리하여 성능을 향상시킬 수 있습니다.

Svelte와 같은 다른 프레임워크에서는 동일한 팀에 의해 개발된 Svelte Query를 살펴볼 수도 있습니다. Tanstack Query는 이미 React, Solid 및 Vue와 자연스럽게 작동합니다.
