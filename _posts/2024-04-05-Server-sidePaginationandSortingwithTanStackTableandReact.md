---
title: "TanStack Table과 React를 사용한 Server-side Pagination 및 sorting 구현하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Server-side Pagination and Sorting with TanStack Table and React"
link: "https://medium.com/@aylo.srd/server-side-pagination-and-sorting-with-tanstack-table-and-react-bd493170125e"
isUpdated: true
---

## 테이블을 수동으로 정렬 및 페이지네이션 관리하여 제어권을 되찾으세요.

TanStack Table은 최소한의 입력으로 테이블을 자동으로 페이지네이션 및 정렬하는 데 탁월한 성능을 보입니다. 그러나 많은 항목을 포함하는 테이블을 다룰 때는 앱 상태를 과도하게 사용하지 않고 페이지네이션 및 정렬 작업을 서버로 위임하는 것이 더 나을 때가 많습니다. 이 튜토리얼에서는 TanStack Table, React 및 JavaScript만을 사용하여 '진격의 거인' 에피소드를 모두 표시하는 테이블을 만들어볼 것입니다. 열의 정렬 및 페이지네이션을 수동으로 관리하는 방법과 이러한 기능을 API와 통합하는 방법에 대해 다룰 것입니다.

# 너무 길어요(TJ;DR) ⏩

여기서 최종 결과물을 확인하실 수 있는 대화식 React 플레이그라운드가 있습니다.

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

# 어플리케이션

해당 어플리케이션은 에피소드 번호(절대), 시즌 내 에피소드 번호(시즌 내), 그리고 제목을 표시하는 세 열 테이블로 구성되어 있습니다. 각 열 제목을 클릭하면 화살표 방향에 따라 테이블을 오름차순이나 내림차순으로 정렬하거나 필터를 제거할 수 있습니다. 또한 페이지네이션 섹션을 통해 페이지 간 이동 및 페이지 당 표시되는 에피소드 수를 결정할 수 있습니다.

두 가지 수준에서 작업할 것입니다: 테이블 수준과 커스텀 후크 수준(페이지네이션용 후크 하나와 정렬용 후크 하나). 각 후크는 테이블과 상호작용하고 상태를 관리하며, 정렬 및 페이지네이션을 위한 서버로의 API 호출을 처리할 것입니다.

```js
export const App = () => {
  const { ... } = usePagination(...);

  const { ... } = useSorting();

  const [ ... ] = useFakeAPI(...);

  return (
    <Table { ... } />
  );
};
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

이 예시에서는 가짜 API를 사용할 것이며, { pagination: { skip, limit }, sort: { field, order } } 객체는 서버 측 정렬 및 페이지네이션 매개변수를 처리하는 일반적인 방법입니다. 그러나 이를 특정한 사용 사례에 맞게 수정할 수 있습니다.

# 페이지네이션

먼저 페이지네이션부터 시작하겠습니다. 우리는 이미 페이지네이션이 완료된 데이터를 제공할 책임이 있기 때문에 제어 컴포넌트의 영역에 있습니다. 따라서 사용자의 입력을 기반으로 테이블의 상태를 제어해야 합니다. 그런 다음 페이지네이션 prop 및 사용자가 이 페이지네이션을 변경할 때의 콜백(onPaginationChange)을 제공하겠습니다. 테이블 항목은 페이지네이션 상태에 따라 가져올 것입니다.

그런 다음 테이블에 총 페이지 수를 전달하여 표시합니다. 마지막으로, 서버와 상호 작용할 것이므로 사용자에게 알리고 로딩 단계 동안 특정 작업을 차단하는 데 필요한 로딩 prop이 있어야 합니다.

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

여기는 테이블의 속성에 대한 코드 조각입니다:

```js
export const Table = ({
  // 기타 열(column), 데이터(data) 등의 속성을 여기에 추가하세요
  loading,
  onPaginationChange,
  pageCount,
  pagination,
}) => {
  // 컴포넌트 구현은 여기에 있습니다
};
```

pagination은 다음과 같은 구조를 가진 pagination 상태를 보유합니다.

```js
export type PaginationState = {
  pageIndex: number
  pageSize: number
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

자, 이제 useReactTable 옵션을 추가해 봅시다:

```js
const tableLib = useReactTable({
  // 다른 옵션(컬럼, 데이터, getCoreRowModel 등)을 여기에 추가하세요
  manualPagination: true,
  onPaginationChange,
  state: { pagination },
});
```

이 구성에서 manualPagination: true를 사용하여 테이블에게 페이지네이션을 우리가 제어할 것이라고 알립니다. 테이블의 상태에 pagination을 추가하여 현재 페이지네이션 설정을 추적합니다. 또한 사용자 상호작용으로 페이지네이션 메서드 중 하나가 호출될 때마다 콜백인 onPaginationChange을 제공합니다.

이제 `table /` 바로 밑에 페이지네이션 상호작용을 포함하는 `footer /` 구성 요소를 추가할 것입니다. 페이지 사이를 이동할 수 있는 버튼 집합(이전, 다음, 처음, 마지막)과 함께 페이지 크기를 조정할 수 있는 선택 입력을 통합할 것입니다. 가독성을 위해, 이것을 별도의 컴포넌트로 추출할 수 있습니다.

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
const Pagination = ({ tableLib }) => (
  <footer className="pagination">
    <button disabled={!tableLib.getCanPreviousPage()} onClick={() => tableLib.setPageIndex(0)}>
      ⏪
    </button>
    <button disabled={!tableLib.getCanPreviousPage()} onClick={tableLib.previousPage}>
      ◀️
    </button>
    <span>{`페이지 ${tableLib.getState().pagination.pageIndex + 1} / ${tableLib.getPageCount()}`}</span>
    <button disabled={!tableLib.getCanNextPage()} onClick={tableLib.nextPage}>
      ▶️
    </button>
    <button disabled={!tableLib.getCanNextPage()} onClick={() => tableLib.setPageIndex(tableLib.getPageCount() - 1)}>
      ⏩
    </button>
    <span>Show: </span>
    <select value={tableLib.getState().pageSize} onChange={(e) => tableLib.setPageSize(parseInt(e.target.value, 10))}>
      {[5, 10, 20].map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
    <span> items per page</span>
  </footer>
);
```

우리는 TanStack의 table 객체로부터 모든 정보를 직접 얻을 수 있다는 점에 유의하십시오. 페이지네이션 props을 참조할 필요가 없었습니다. 콜백 중 하나를 호출하면 onPaginationChange가 호출되고 우리에게 바깥부분 컴포넌트에서 설정할 새로운 페이지네이션을 제공할 것입니다. 따라서 onPaginationChange이외에 전달해야 하는 유일한 콜백입니다. goToPage나 goToNextPage 페이지 함수를 작성할 필요가 없습니다. TanStack가 수동 페이지네이션 모드에서라도 모두 처리해줄 것입니다.

이제 usePagination 훅에 대해 살펴봅시다. 이 훅은 페이지네이션 변경 핸들러를 제공하고 테이블을 API에 연결하는 역할을 담당합니다. 이 훅에서 가장 중요한 함수는 onPaginationChange입니다. 이 함수는 이전 페이지네이션 상태와 상태 변경을 일으킨 작업을 기반으로 업데이트 콜백을 사용하여 새로운 페이지네이션 상태를 생성합니다. 이것은 setter에 콜백이 전달되었을 때 useState에서 발생하는 일과 정확히 같은 일이 발생합니다.

```js
type Updater = (prevPagination: PaginationState) => nextPagination: PaginationState
const updatePagination: Updater = (...) => ...

onPaginationState(updatePagination)
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

useState가 필요한 기능을 포함하고 있으므로 직접 사용할 겁니다. 초기 pageSize 및 pageIndex를 전달하고, onPaginationChange으로 페이지네이션과 setter를 반환할 거에요.

```js
export function usePagination() {
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageIndex: 0,
  });
  const { pageSize, pageIndex } = pagination;

  return {
    limit: pageSize,
    onPaginationChange: setPagination,
    pagination,
    skip: pageSize * pageIndex,
  };
}
```

API가 { pagination: { skip, limit } } 패러다임으로 페이지네이션을 다루기 때문에, 해당 값들을 hook에서 도출한 후 반환할 거에요.

마지막으로, 테이블은 아직 완전히 효과적으로 페이지를 필요로 합니다. 테이블 요소의 전체 수 (일반적으로 API에서 제공되는 정보 및 테이블을 채우는 데이터와 함께)를 페이지 크기 (또는 제한)로 나누어서 계산됩니다. API는 또한 로딩 여부를 제공할 겁니다.

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

이제 우리는 모든 것을 App 컴포넌트에서 함께 사용할 수 있게 되었습니다 :

```js
export const App = () => {
  const { limit, onPaginationChange, skip, pagination } = usePagination();


  const [data, count, loading] = useFakeAPI("/episodes", {
    pagination: { skip, limit }
  );

  const pageCount = Math.round(count / limit);

  return (
    <Table
      ...
      data={data}
      loading={loading}
      onPaginationChange={onPaginationChange}
      pageCount={pageCount}
      pagination={pagination}
      ...
    />
  );
};
```

# 정렬

페이지 구성에 익숙해진 것을 바탕으로 TanStack Table의 정렬에 대해 더 빠르게 진행할 것입니다. 정렬은 페이지 구성과 동일한 원리를 기반으로 하고 있으며 (우리는 여전히 제어 컴포넌트를 다루고 있습니다), 다음 섹션의 목표는 컬럼 헤더 중 하나를 클릭할 때마다 테이블 데이터를 해당 열 ID에 따라 오름차순 또는 내림차순으로 정렬할 수 있도록 하는 것입니다. 또한 정렬 순서에 대한 시각적 힌트도 제공할 것입니다.

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

`Table` 컴포넌트에 전달된 프롭스를 통해 시작해 봅시다. `onSortingChange` 콜백 함수와 정렬 상태를 추가하겠습니다:

```js
export const Table = ({
  // 다른 프롭스(열, 데이터 등)도 여기에 추가
  loading,
  // 페이지네이션 프롭스
  onPaginationChange,
  pageCount,
  pagination,
  // 정렬 프롭스
  onSortingChange,
  sorting,
}) => {
  // 여기에 컴포넌트 구현
};
```

정렬 상태는 아래와 같이 타입이 지정된 컬럼 정렬 상태 배열입니다:

```js
type ColumnSort = {
  id: string
  desc: boolean
}

type SortingState = ColumnSort[]
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

ColumnSort은 정렬 중인 열의 ID와 해당 정렬이 내림차순인지를 나타내는 부울을 보유합니다. 이 튜토리얼에서는 단일 열 정렬을 다루고 있으므로 상태는 한 번에 하나 또는 제로 개의 열만 보유할 것입니다 (여기를 참조하세요).

다음으로, useReactTable의 옵션에 추가해봅시다: 새로운 정렬 순서를 토글할 때마다 트리거될 onSortingChange 및 정렬을 독립적인 옵션으로가 아니라 테이블의 상태 내부에 페이지네이션 옆에 포함시킵니다.

```js
const tableLib = useReactTable({
  // 컬럼, 데이터, getCoreRowModel 등과 같은 다른 옵션을 여기에 삽입하세요
  manualPagination: true,
  manualSorting: true,
  onPaginationChange,
  onSortingChange,
  state: { pagination, sorting },
});
```

이제 우리의 테이블의 `헤더 /`에 작업할 수 있습니다. 여기에 있습니다:

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
<thead>
  {tableLib.getHeaderGroups().map((headerGroup) => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <th
          key={header.id}
          {...(header.column.getCanSort() ? { onClick: header.column.getToggleSortingHandler() } : {})}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}

          {header.column.getIsSorted() === "asc" ? (
            <span> 🔼</span>
          ) : header.column.getIsSorted() === "desc" ? (
            <span> 🔽</span>
          ) : null}
        </th>
      ))}
    </tr>
  ))}
</thead>
```

각 열의 정렬 여부를 확인해야 합니다 (특정 열에 대해 enableSorting: false를 설정한 경우 해당 열에 대해는 이렇게 되지 않습니다). 이를 getCanSort를 호출하여 수행할 수 있습니다. 열이 실제로 정렬될 수 있다면, onSortingChange를 클릭 핸들러에 전달합니다. onSortingChange을 직접 사용하지 않는다는 점을 유의해야 합니다. 대신에 getToggleSortingToggle를 호출하여 TanStack 테이블에서 가져옵니다. 이를 통해 열의 정렬 상태를 오름차순, 내림차순 또는 정렬 없음으로 전환하는 함수가 제공됩니다. 이 함수가 바로 onSortingChange입니다.

마지막으로 getIsSorted를 호출하여 열이 정렬된 순서를 확인할 수 있습니다. 해당 열에 정렬 상태가 없는 경우를 처리하는 것을 잊지 말아야 합니다 (enableSortingRemoval: true를 선택한 경우 또는 enableSorting: false로 특정 열에 대해 정렬을 비활성화한 경우). 이 경우를 삼항 연산자에서 null을 사용하여 처리할 수 있습니다.

이제 usePagination 후크에 집중해보겠습니다. 이 후크는 이전 usePagination 후크와 동일한 비즈니스 로직을 따릅니다.

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
export function useSorting(initialField = "id", initialOrder = "ASC") {
  const [sorting, setSorting] = useState([{ id: initialField, desc: initialOrder === "DESC" }]);

  return {
    // 🔽 테이블 정렬 상태
    sorting,
    onSortingChange: setSorting,
    // 🔽 API 정렬 매개변수
    order: !sorting.length ? initialOrder : sorting[0].desc ? "DESC" : "ASC",
    field: sorting.length ? sorting[0].id : initialField,
  };
}
```

여기서 주요한 차이점은 상태가 열 상태의 배열인 것입니다. 그러나 한 번에 한 열씩 정렬할 것이기 때문에 상태는 항상 인덱스 0에 있을 것입니다. 정렬 배열이 비어 있는지 항상 확인하는 점에 주목해 주세요. 이는 enableSortingRemoval: true를 선택하지 않은 한 (마지막으로 한 번 더, 여기서), 열을 세 번 클릭할 때마다 정렬 상태가 지워질 것이기 때문입니다.

마지막으로, 모든 것을 App 컴포넌트에서 함께 넣어 봅시다:

```js
export const App = () => {
  const { limit, onPaginationChange, skip, pagination } = usePagination();

  const { sorting, onSortingChange, field, order } = useSorting();

  const [data, count, loading] = useFakeAPI("/episodes", {
    pagination: { skip, limit },
    sort: { field, order },
  });

  const pageCount = Math.round(count / limit);

  return (
    <Table
      ...
      data={data}
      loading={loading}
      onPaginationChange={onPaginationChange}
      onSortingChange={onSortingChange}
      pageCount={pageCount}
      pagination={pagination}
      sorting={sorting}
      ...
    />
  );
};
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

# 결론

마무리로, 이 튜토리얼에서는 React에서 TanStack Table을 사용하여 서버 측 페이지네이션 및 정렬을 다루는 기본적인 이해를 제공했습니다. 그러나 이것은 시작에 불과합니다. TanStack Table의 진정한 힘은 유연성과 확장성에 있습니다. 이 기반을 활용하여 더 복잡하고 맞춤화된 솔루션을 만들어 나가세요.

다양한 구성을 실험해보고 라이브러리의 추가 기능을 탐색하며 사용자 경험을 더 향상시킬 수 있는 방법을 찾아보세요. 기록한 코드는 절대적인 것이 아닙니다. 이것은 시작점으로서 혁신하고 개선할 수 있는 기초입니다.

이 튜토리얼의 최종 결과물을 보려면 이 URL 기반의 대화형 React 플레이그라운드를 확인해보세요. 즐거운 코딩되세요!

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

## 출처:

- [tanstack.com의 table v8](https://tanstack.com/table/v8)
- [stackoverflow.com의 tanstack v8 react table에서 서버 측 수동 정렬하는 방법](https://stackoverflow.com/questions/74321216/tanstack-v8-react-table-how-to-sort-server-side-with-manualsorting)
