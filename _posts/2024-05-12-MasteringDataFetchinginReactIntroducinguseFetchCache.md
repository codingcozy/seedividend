---
title: "리액트에서 데이터 가져오기 마스터하기 useFetchCache 소개"
description: ""
coverImage: "/assets/img/2024-05-12-MasteringDataFetchinginReactIntroducinguseFetchCache_0.png"
date: 2024-05-12 19:02
ogImage: 
  url: /assets/img/2024-05-12-MasteringDataFetchinginReactIntroducinguseFetchCache_0.png
tag: Tech
originalTitle: "Mastering Data Fetching in React: Introducing useFetchCache"
link: "https://medium.com/@tonimaxx/mastering-data-fetching-in-react-introducing-usefetchcache-12954d09e8fb"
isUpdated: true
---




# TL;DR

useFetchCache 훅은 React 애플리케이션의 데이터 가져오기, 캐싱 및 업데이트를 간단하게 만들기 위해 설계된 사용자 정의 훅입니다. 네트워크 요청을 로컬 캐싱과 원활하게 통합함으로써, 빈번한 액세스가 필요하지만 자주 변경되지 않는 데이터를 처리하는 효율적인 방법을 제공합니다.

## React 컴포넌트에서 같은 데이터를 계속해서 가져오는 것에 지쳤습니까?

useFetchCache를 만나보세요! 데이터 가져오기와 캐싱의 슈퍼히어로! 🦸‍♂️



useFetchCache는 데이터 가져오기를 간편하게 만들어 주는 커스텀 React 훅이에요. 개인 비서처럼 작동하여 필요한 모든 것을 기억해 주어서 매번 요청할 필요가 없어요. 반복적인 데이터 가져오기 로직 작성이나 여러 개의 로딩 및 오류 상태를 처리하는 번거로움도 없어요. 😌

useFetchCache를 사용하면 API URL과 필요한 매개변수를 제공하고, 후는 모두 맡기면 돼요. 데이터를 가져오고 로딩 상태를 처리하며, AsyncStorage를 사용하여 결과를 로컬로 캐싱해요. 이렇게 하면 같은 데이터에 대한 후속 요청은 캐시에서 제공되어 네트워크 트래픽을 줄이고 성능을 향상시킬 수 있어요. ⚡

하지만 여기서 끝이 아니에요! useFetchCache에는 다시 불러오는 함수가 제공되어 데이터를 필요할 때마다 새롭게 불러올 수 있어요. 사용자 상호작용이나 주기적인 업데이트 때문이더라도 useFetchCache가 항상 도와줄 거예요. 🔄

그러니 React 컴포넌트를 강화하고 데이터 가져오기 프로세스를 간소화하려면 useFetchCache가 여러분의 새로운 친구가 될 거에요. 이 슈퍼히어로 훅으로 무거운 작업을 처리하고 사용자들을 위한 놀라운 경험을 만드는 데 집중할 수 있도록 해 주세요. 💯



useFetchCache를 통해 매끄러운 데이터 가져오기와 캐싱의 마법을 경험할 준비가 되셨나요? 🚀✨

## useFetchCache란?

useFetchCache는 API에서 데이터를 가져오는 과정을 자동화하고, 그 데이터를 로컬 저장소(AsyncStorage 사용)에 저장하며, 이후 요청에서 해당 데이터를 불러오는 React의 커스텀 훅입니다. 이 훅은 데이터 가져오기, 캐싱, 오류 관리를 처리하고, 강제 데이터 새로고침을 허용합니다.

## useFetchCache 사용의 장점



- 네트워크 호출 감소: 데이터를 로컬로 캐싱함으로써 애플리케이션에서 만드는 API 요청 수가 줄어들어 모바일 데이터 사용 및 제한적이거나 고비용의 연결 환경에서 특히 유용합니다.
- 성능 향상: 데이터를 로컬로 캐싱하면 데이터 검색 시간이 빨라지며, 데이터가 대부분 로컬 저장소에서 즉시 사용 가능하기 때문에 서버로의 왕복을 필요로하지 않습니다.
- 사용자 경험 향상: 사용자들은 빠른 로드 시간과 더 빠른 반응이 가능한 인터페이스를 경험할 수 있으며, 데이터가 빠른 액세스 로컬 캐시에서 로드되기 때문입니다.
- 간편화된 데이터 관리: 훅은 데이터 가져오기, 캐싱 및 오류 처리를 캡슐화하여 구성 요소 코드를 단순화합니다.

# useFetchCache 사용 방법

- 훅 가져오기: React 컴포넌트 파일에 useFetchCache를 가져와서 시작합니다.
- 훅 초기화: 필요한 매개변수(API URL 및 선택적으로 기본 캐시 키 및 만료 시간)를 사용하여 useFetchCache를 호출합니다. 특정 키가 제공되지 않으면 URL도 캐시 키로 사용할 수 있습니다.
- 데이터 표시: 훅이 반환하는 데이터 상태를 사용하여 컴포넌트에서 데이터를 표시합니다. 사용자에게 피드백을 제공하기 위해 필요한대로 로딩 상태 및 오류를 처리하세요.
- 새로 고침 및 페이지네이션 구현: 필요한 경우 신선한 데이터가 필요한 시나리오에 대비해 훅이 제공하는 refetch 메서드를 사용하고, API에서 지원하는 경우 API URL 또는 내부 상태를 조정하여 페이지네이션을 관리하세요.
- 코드 배치: 훅은 컴포넌트 함수 상단에 배치되어야 하며, 조건문이나 반복문 외부에 위치하여 훅의 규칙을 준수해야 합니다.

## 이것이 바로 훅입니다…



```js
// useFetchCache.js

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

/**
 * AsyncStorage를 사용하여 데이터를 가져와 캐싱하는 커스텀 훅입니다. 옵션으로 강제 새로고침이 가능합니다.
 * 
 * @param {string} url - 데이터를 가져올 API URL입니다.
 * @param {string} [baseCacheKey=null] - 데이터를 저장하는 기본 캐시 키입니다. 제공되지 않으면 URL이 기본값으로 사용됩니다.
 * @param {number} [expirationTime=3600000] - 캐시 만료까지의 밀리초 단위 시간입니다 (기본값은 1시간).
 * @return {Object} 데이터, 로딩 상태, 오류 및 리페치 함수를 포함한 객체입니다.
 */
const useFetchCache = (url, baseCacheKey = null, expirationTime = 1000 * 60 * 60) => {
  // 제공된 baseCacheKey 또는 URL을 사용하여 캐시 키를 구성합니다.
  const cacheKey = `${baseCacheKey ? baseCacheKey : encodeURIComponent(url)}`;

  // 데이터, 로딩 상태, 오류를 관리하는 상태 훅입니다.
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 데이터를 가져오는 함수로, 옵션으로 캐시를 무시할 수 있습니다.
  const fetchData = async (forceFetch = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const storedDataString = await AsyncStorage.getItem(cacheKey);

      // 강제 새로고침하지 않고 캐시가 있고 유효한 경우 캐시된 데이터를 사용합니다.
      if (!forceFetch && storedDataString) {
        const storedData = JSON.parse(storedDataString);
        const now = Date.now();
        if (now - storedData.timestamp < expirationTime) {
          console.log("캐시로부터 데이터를 제공합니다 for key:", cacheKey);
          setData(storedData.data);
          return;
        }
      }

      // 강제 새로고침이거나 캐시가 만료된 경우 또는 캐시가 없는 경우 API에서 데이터를 가져옵니다.
      console.log("API로부터 데이터를 가져옵니다 for URL:", url);
      const response = await axios.get(url);
      const newData = response.data;
      setData(newData);
      await AsyncStorage.setItem(cacheKey, JSON.stringify({
        data: newData,
        timestamp: Date.now(),
      }));
    } catch (err) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 캐시를 무시하여 데이터를 강제로 다시 가져오는 함수입니다.
  const refetch = useCallback(() => {
    console.log("캐시를 무시하고 데이터를 다시 가져옵니다...");
    fetchData(true);
  }, [url, cacheKey]);

  // URL이나 cacheKey가 변경될 때 데이터를 가져오는 효과입니다.
  useEffect(() => {
    fetchData();
  }, [url, cacheKey]);

  return { data, isLoading, error, refetch };
};

export default useFetchCache;
```

## 그리고 여기에 샘플 사용법이 있습니다...

```js
// DataFetchingComponent.js 

import React from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import useFetchCache from './useFetchCache'; // useFetchCache가 정의된 파일로 올바르게 지정하세요.

const DataFetchingComponent = () => {
  // 데이터를 가져올 URL입니다.
  const url = "https://api.example.com/data";

  // URL을 사용하여 훅을 초기화합니다. baseCacheKey를 제공하지 않으면 URL이 자동으로 캐시 키로 사용됩니다.
  const { data, isLoading, error, refetch } = useFetchCache(url);

  // 사용자가 "새로고침" 버튼을 누를 때 새로 고침 동작을 처리합니다.
  const handleRefresh = () => {
    refetch(); // 훅에서 제공하는 refetch 함수를 호출하여 데이터를 강제로 다시 가져옵니다.
  };

  // 데이터를 가져오는 동안 로딩 표시줄을 렌더링합니다.
  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;

  // 데이터를 가져오는 동안 오류가 발생하면 오류 메시지를 렌더링합니다.
  if (error) return <Text>Error: {error.toString()}</Text>;

  // 가져온 데이터 또는 가져온 데이터가 없을 경우 메시지를 렌더링합니다.
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Data: {data ? JSON.stringify(data) : '데이터 없음'}</Text>
      <Button title="데이터 새로고침" onPress={handleRefresh} color="#0000ff" />
    </View>
  );
};

export default DataFetchingComponent;
```

# 주요 내용



- 일관성이 중요합니다: 항상 동일한 데이터 집합에 대해 동일한 캐시 키를 사용하여 응용 프로그램 전체의 일관성을 보장하세요.
- 오류 처리를 세련되게: 데이터 가져오기에서 발생하는 오류를 세련되게 처리하여 사용자 경험을 개선하세요.
- 캐시 정기적으로 업데이트: 캐시된 데이터에 적절한 만료 시간을 설정하고 주기적으로 또는 사용자 요구에 따라 캐시를 업데이트하는 refetch 함수를 사용하세요.

# 결론

React 애플리케이션에서 useFetchCache 훅을 사용하면 데이터 처리를 최적화할 수 있습니다. 반복적이고 비용 소모적인 네트워크 요청이 줄어들며 데이터 로드 시간을 단축하고 구성 요소에서의 데이터 관리를 간단하게 할 수 있습니다. 이 훅을 통합함으로써 개발자들은 좋은 기능을 개발하는 데 더 집중할 수 있고 데이터 가져오기와 상태 관리의 복잡성에 대해 덜 걱정해도 됩니다.