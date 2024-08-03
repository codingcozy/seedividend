---
title: "리액트 네이티브 - React Query로 무한 스크롤 구현하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React Native  Infinite scroll with React Query"
link: "https://medium.com/@davidecarizzoni/react-native-infinite-scroll-with-react-query-3e5ef90f3caa"
---



![React Native Infinite Scroll with React Query](/assets/img/ReactNativeInfinitescrollwithReactQuery_0.png)

안녕하세요, 개발자 여러분! 오늘은 React Query를 사용하여 React Native에서 무한 스크롤이 적용된 flatlist를 개발하는 방법에 대해 이야기해보려고 합니다.

무한 스크롤은 많은 응용 프로그램의 개발에서 중요한 부분이며, 부드러운 사용자 경험을 제공하고 페이지별로 서버 호출을 실행하여 성능을 최적화할 수 있도록 도와줍니다.

저희는 무한 스크롤이 적용된 간단한 항목 목록을 만들고, 목록을 필터링할 수 있는 검색 필드를 추가할 예정입니다. 함께 만들어보시죠.

<div class="content-ad"></div>

하나 이상의 필터와 상호 작용함으로써 목록이 첫 번째 페이지로 재설정되고 그 후 전통적인 방법으로 계속됩니다.

우선, React Native 애플리케이션에 필요한 라이브러리를 설치해 보겠습니다.

yarn add @tanstack/react-query

예제에서는 React Query 버전 5를 사용하여 시작해 봅시다. 다른 버전을 사용하는 경우 구현 방법은 동일하지만 React Query에서 무한 스크롤을 구현하기 위해 사용되는 옵션이 약간 다를 수 있습니다.

<div class="content-ad"></div>

먼저 쿼리 클라이언트를 만들어봅시다. 코드를 깔끔하게 유지하기 위해 React Query 프로바이더를 인스턴스화하고 오프라인 쿼리/뮤테이션 상태 처리와 관련된 로직을 추가할 QueryProvider 파일을 사용할 거에요.

다음은 어떻게 하는지 보여드릴게요:

```js
// QueryProvider.tsx

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 새로운 QueryClient를 인스턴스화
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5분
      retry: 2,
      refetchOnWindowFocus: true,
    },
  },
});

// 생성한 queryClient로 QueryClientProvider를 내보냄
export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
```

```js
// App.tsx

import React from "react";
import { QueryProvider } from "./QueryProvider";
import InfiniteScrollScreen from "./InfiniteScrollScreen"; // 여기에 메인 컴포넌트를 넣어주세요

export const App = () => {
  return (
    <QueryProvider>
      <InfiniteScrollScreen />
    </QueryProvider>
  );
};
```

<div class="content-ad"></div>

이 설정을 통해 React Query가 초기화되고 애플리케이션에서 사용할 수 있게 됩니다. 이제 React Query를 사용하여 무한 스크롤이 있는 flatlist를 구현할 수 있습니다.

무한 스크롤을 구현하기 위한 필요한 로직을 삽입할 main 파일 useInfiniteScroll을 만들어 봅시다:

```js
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';

type Params<F> = {
  key: string;
  url: string;
  limit?: number;
  filters?: F;
};

export const useInfiniteScroll = <T = unknown, F = object>({
  key,
  url,
  limit = 10,
  filters,
}: Params<F>) => {
  const queryKey = [key, ..._.values<string | string[]>(_.omitBy(filters || {}, _.isEmpty))].filter(
    c => Boolean(c) && !_.isEmpty(c),
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryFn = async ({ pageParam = 1 }) => {
    const { data } = await axios.get<T[]>(url, {
      params: {
        page: pageParam,
        limit,
        ...filters,
      },
    });
    return {
      data: data,
      nextPage: pageParam + 1,
    };
  };
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, __, lastPageParam) => {
      if (lastPage.data.length < limit) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam === 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });

  const loadNext = useCallback(() => {
    hasNextPage && fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  const onRefresh = useCallback(() => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      refetch()
        .then(() => setIsRefreshing(false))
        .catch(() => setIsRefreshing(false));
    }
  }, [isRefreshing, refetch]);

  const flattenData = useMemo(() => {
    return data?.pages.flatMap(page => page.data) || [];
  }, [data?.pages]);

  return {
    data: flattenData,
    onEndReached: loadNext,
    isRefreshing,
    onRefresh,
    isFetchingNextPage
  };
};
```

아래에서 이 후크가 받는 매개변수를 나타냅니다:

<div class="content-ad"></div>

- key: 데이터를 캐싱하는 기본 키를 나타냅니다. 캐싱 부분은 완전히 React Query 라이브러리에 의해 처리됩니다. 모든 필터 값을 포함한 주요 키를 설정하여 필터가 변경될 때마다 새로운 API 호출이 발생하여 무한 스크롤을 다시 트리거합니다.
- url: API 호출에 사용되는 URL을 나타냅니다. 예를 들어, JSON Placeholder API를 사용하여 포스트 목록을 가져오려면 URL은 https://jsonplaceholder.typicode.com/posts 가 됩니다.
- limit: 각 호출에서 반환되는 요소 수를 나타냅니다. 제한이 10이면 각 호출에서 10개의 요소가 반환됩니다. 이 방법은 조회 중인 API 서비스에 따라 다를 수 있음에 유의해야 합니다. 이 경우, 페이지 네비게이션을 위해 두 개의 매개변수가 필요한데, 이는 페이지와 제한입니다. 페이지는 페이지 번호를 나타내며, 제한은 반환될 요소 수를 나타냅니다.
- filters: 호출에 전달된 필터를 나타냅니다. 이러한 필터가 객체로 처리될 것으로 예상합니다. 아래에서 예시를 살펴볼 것입니다.

훅이 TypeScript로 작성되었으므로 위에서 언급한 매개변수 외에도 두 가지 일반화(제네릭) T 및 F를 허용합니다:

- T: 반환해야 하는 데이터의 유형을 나타냅니다. 예를 들어, UserInterface와 같습니다.
- F: 필터를 나타내는 유형입니다. 예를 들어, 필터 유형은 다음과 같습니다: { search: string, userId: string }

무한 스크롤을 사용하는 예제는 다음과 같습니다.

<div class="content-ad"></div>

```js
import React, { useState } from 'react';
import { FlatList, Text, View, RefreshControl, StyleSheet, ActivityIndicator } from 'react-native';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useTranslation } from 'react-i18next';

type TFilters = {
  search: string;
};

type TData = {
  id: string;
  name: string;
  surname: string;
  email: string;
};

export const InfiniteScrollScreen = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<TFilters>({
    search: '',
  });

  const { data, isRefreshing, onRefresh, onEndReached, isFetchingNextPage } = useInfiniteScroll<
    TData,
    TFilters
  >({
    url: 'users',
    limit: 25,
    filters: filters,
    key: 'users',
  });

  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={item => item.id}
      initialNumToRender={10}
      data={data}
      onEndReached={onEndReached}
      removeClippedSubviews={true}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.id}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.listEmptyComponent}>
          <Text>{t('noResult')}</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.listFooterComponent}>
          {isFetchingNextPage && <ActivityIndicator />}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listEmptyComponent: {
    flexDirection: 'row',
  },
  listFooterComponent: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 60,
    width: '100%',
  },
  contentContainerStyle: {
    marginTop: 10,
    padding: 10,
  },
});
```

마무리하며, React Native에서 React Query를 사용하여 무한 스크롤을 구현하면 대용량 데이터를 다루는 애플리케이션에서 매끄러운 사용자 경험과 최적화된 성능을 제공합니다. React Query의 캐싱 및 페이지네이션 기능을 활용하여 개발자들은 데이터 가져오기와 페이지네이션 로직을 쉽게 관리할 수 있습니다. 소셜 미디어 피드, 제품 카탈로그 또는 다른 동적 목록 기반 인터페이스를 구축하고 있다면, React Query를 활용하여 무한 스크롤을 습득함으로써 더욱 반응적이고 효율적인 모바일 애플리케이션을 만들 수 있는 다양한 가능성이 열립니다. 그래서 지금 더 멀리 뛰어들어 무한 스크롤의 심층을 탐험하고 React Native 프로젝트를 새로운 상호작용성과 성능의 높은 수준으로 끌어올려보세요. 즐거운 코딩되세요!```
