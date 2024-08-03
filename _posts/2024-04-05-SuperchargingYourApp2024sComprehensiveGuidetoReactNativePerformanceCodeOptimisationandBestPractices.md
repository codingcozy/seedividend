---
title: "2024년 React Native 성능을 향상시키는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Supercharging Your App 2024s Comprehensive Guide to React Native Performance, Code Optimisation, and Best Practices"
link: "https://medium.com/@ahmad.almezaal/supercharging-your-app-2024s-comprehensive-guide-to-react-native-performance-code-optimisation-677040868df1"
---



<img src="https://miro.medium.com/v2/resize:fit:1400/1*6WIkNgEMWiijLnC4SKSEFg.gif" />

모바일 앱 개발 영역에서 계속 발전하는 가운데 React Native가 크로스 플랫폼 응용 프로그램을 제작하는 데 중요한 프레임워크로 자리 잡고 있습니다. iOS 및 Android 간에 코드를 쉽게 공유할 수 있는 놀라운 능력으로 특별히 주목받고 있습니다. 그럼에도 불구하고 React Native 앱을 최적화하여 최상의 성능을 발휘하기까지의 여정은 종종 모호함으로 둘러싸여 있습니다. 향상 전략에 대한 명확한 안내를 갈구하는 개발자들 때문입니다. 이에 대응하여 저희의 기사는 앞으로 나아가는 길에 빛을 비추기 위해 노력합니다. React Native 애플리케이션의 성능을 현저히 향상시킬 수 있는 다방면의 모범 사례를 제시할 것입니다.

이 탐험을 시작하면 앱을 정제하고 더욱 강력하게 만들기 위한 다양한 꿀팁을 발견하게 될 것입니다. 잘 알려지지 않은 기능과 기능성을 활용하여 일반적인 함정을 피하는 혁신적인 접근 방식을 채택하기까지, 저희의 안내서는 React Native 앱이 반응성과 효율성에서 자연스러운 경쟁뿐만 아니라 웃돌 수 있도록 필요한 통찰력을 제공합니다.

다음 섹션들이 단계별로 안내해 드릴 것이며, React Native 앱을 효율적이고 성능이 우수한 모범으로 변모시키는 데 도움이 될 것입니다.

<div class="content-ad"></div>

# 1. 인라인 함수 사용을 피하세요

인라인 함수는 편리하지만 React Native 앱에서 성능 병목 현상을 일으킬 수 있습니다. 컴포넌트가 다시 렌더링될 때마다 인라인 함수가 다시 생성되어 자식 컴포넌트가 불필요하게 다시 렌더링되는 원인이 됩니다. 이로 인해 추가적인 메모리를 소비할 뿐만 아니라 처리 시간도 늘어납니다. 이러한 함수들을 컴포넌트의 정의 바깥으로 추출함으로써 불필요한 다시 렌더링을 방지하고 앱의 성능을 향상시킬 수 있습니다.

최적화 전: 이 예시에서는 인라인 함수가 직접 Button의 onPress 속성으로 전달되어 부모 컴포넌트가 업데이트될 때마다 잠재적인 다시 렌더링을 발생시킵니다.

```js
import React from "react";
import { Button, View, Pressable, Text } from "react-native";

const CustomButton = () => {
  return (
    <Pressable onPress={() => console.log("Button clicked!")}>
      <Text>Click Me" </Text>
    </Pressable>
  );
};
```

<div class="content-ad"></div>

최적화 후: 여기서는 함수를 컴포넌트 본문 바깥에 정의합니다. 이 변경으로 함수가 렌더링마다 재생성되지 않아 컴포넌트가 불필요하게 다시 렌더링되는 것을 방지합니다.

```js
import React from "react";
import { Button, View } from "react-native";

const handlePress = () => {
  console.log("Button clicked!");
};

const CustomButton = () => {
  return (
    <Pressable onPress={handlePress}>
      <Text>Click Me</Text>
    </Pressable>
  );
};
```

이 최적화된 예시에서 CustomButton 밖에 handlePress를 정의함으로써 함수가 불필요하게 재생성되지 않도록 합니다.

# 2. 함수 메모이제이션을 위한 useCallback 활용

<div class="content-ad"></div>

성능을 향상시키는 중요한 측면 중 하나는 불필요한 다시 렌더링을 방지하기 위해 함수를 메모이징하는 것입니다. 여기에서 React의 useCallback 훅이 등장하면서, 콜백 함수를 메모이징하는 효율적인 방법을 제공합니다.

## useCallback 이해하기

useCallback 훅은 의존성(dependencies) 중 하나가 변경되었을 때만 변경되는 콜백 함수의 메모이징(기억된) 버전을 반환합니다. 이는 참조 동등성(reference equality)을 기반으로 하고 있는 최적화된 자식 컴포넌트에 콜백을 전달할 때 특히 유용합니다. 이를 통해 불필요한 렌더링을 방지할 수 있습니다.

## useCallback의 중요성

<div class="content-ad"></div>

리액트 네이티브에서 렌더링 성능은 부드러운 사용자 경험을 위한 핵심 요소입니다. useCallback은 필요한 경우가 아닌 한 함수가 매 렌더링마다 재생성되지 않도록하여 다시 렌더링 횟수를 최소화하는 데 도움을 줍니다. 이는 JavaScript 스레드에 가해지는 작업 부담을 줄여 더 빠른 실행 시간과 더 반응적인 애플리케이션을 만듭니다.

useCallback을 사용하기 전: 여기 컴포넌트 내에서 함수가 정의된 일반적인 시나리오가 있습니다. useCallback을 사용하지 않으면 이 함수는 컴포넌트가 다시 렌더링될 때마다 재생성됩니다.

```js
import React, { useState } from "react";
import { Button, View } from "react-native";

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <View>
      <Button onPress={incrementCount} title="Increment" />
    </View>
  );
};
```

useCallback을 사용한 후: 이제 useCallback을 사용하여 incrementCount 함수를 메모이제이션하는 방법을 사용하여 위 코드를 리팩토링해보겠습니다.

<div class="content-ad"></div>

```js
import React, { useState, useCallback } from "react";
import { Button, View } from "react-native";

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count]); // `count` is a dependency of `incrementCount`

  return (
    <View>
      <Button onPress={incrementCount} title="Increment" />
    </View>
  );
};
```

# 3. useMemo를 사용하여 효율성 향상: 복잡한 계산 캐싱

useMemo는 useCallback과 유사하지만, useCallback은 함수를 메모이제이션하는 데 사용되고 useMemo는 함수 결과를 메모이제이션하는 데 사용됩니다. 이 차이점은 불필요한 계산과 다시 렌더링을 방지하여 앱의 성능을 향상시키는 데 중요합니다.

## useMemo의 본질

<div class="content-ad"></div>

`useMemo`은 함수의 출력을 기억하는 React 훅입니다. 의존성 중 하나가 변경될 때만 결과를 다시 계산합니다. 본질적으로 `useMemo`는 컴포넌트가 이전 계산 결과를 기억함으로써 매 렌더링마다 비싼 계산을 피할 수 있게 합니다.

## `useMemo`를 사용하는 이유

React Native 애플리케이션은 때로 렌더링 중에 수행되는 복잡한 계산이나 변환으로 인해 느릴 수 있습니다. `useMemo`는 필요할 때에만 무거운 함수가 다시 실행되도록 보장하여 자원을 보존하고 애플리케이션 인터페이스의 순조로움을 유지합니다.

## `useMemo`의 실제 활용법

<div class="content-ad"></div>

간단한 예를 통해 useMemo의 사용을 설명해보겠습니다.

useMemo를 사용하기 전: 숫자 배열의 합을 계산하는 컴포넌트를 상상해보세요. useMemo를 사용하지 않으면 이 계산은 컴포넌트가 렌더링될 때마다 발생하여 성능 문제를 일으킬 수 있습니다.

```js
import React from "react";
import { View, Text } from "react-native";

const SumComponent = ({ numbers }) => {
  const sum = numbers.reduce((acc, current) => acc + current, 0);

  return (
    <View>
      <Text>Sum: {sum}</Text>
    </View>
  );
};
```

useMemo 사용 후: 여기서는 sum 계산을 기억하는 데 useMemo를 사용하도록 코드를 리팩터링했습니다.

<div class="content-ad"></div>

```js
import React, { useMemo } from "react";
import { View, Text } from "react-native";

const SumComponent = ({ numbers }) => {
  const sum = useMemo(() => {
    return numbers.reduce((acc, current) => acc + current, 0);
  }, [numbers]); // `numbers` is a dependency

  return (
    <View>
      <Text>Sum: {sum}</Text>
    </View>
  );
};
```

두 번째 예시에서 useMemo는 합계 계산 결과를 기억합니다. useMemo 내부의 함수는 numbers 배열이 변경될 때만 실행됩니다. 컴포넌트가 다시 렌더링되어도 numbers 배열이 동일하면 useMemo가 계산을 건너뛰고 기억된 결과를 반환하여 효율성을 향상시킵니다.

# 4. 컴포넌트 최적화를 위한 React.memo 활용

React.memo는 useMemo나 useCallback과는 다른 목적을 가진 고차 컴포넌트(HOC)입니다. 함수형 컴포넌트의 다시 렌더링 프로세스를 제어하는 데 사용되며, 특히 복잡한 컴포넌트 트리를 가진 앱에서 성능을 향상시키는 데 중요한 도구로 작용합니다.

<div class="content-ad"></div>

## React.memo 이해하기

React.memo은 함수형 컴포넌트를 감싸서 props를 얕게 비교하여 불필요한 다시 렌더링을 방지합니다. 만약 props가 마지막 렌더링 이후로 변경되지 않았다면, React.memo는 컴포넌트의 다시 렌더링을 방지하여 소중한 리소스를 절약하고 앱 성능을 향상시킵니다.

## React.memo를 언제 사용해야 할까요?

React.memo를 사용하는 것이 특히 유용한 상황은 다음과 같습니다:

<div class="content-ad"></div>

- 컴포넌트는 복잡한 객체를 props로 받습니다.
- 컴포넌트는 종종 동일한 props로 다시 렌더링됩니다.
- 앱의 성능 프로필이 빈번한 불필요한 다시 렌더링을 나타냅니다.

## 예제: React.memo로 최적화하기

사용자 정보를 표시하지만 빈번한 업데이트가 필요하지 않은 컴포넌트를 고려해보세요.

React.memo를 사용하기 전:

<div class="content-ad"></div>

```js
const UserProfile = ({ name, email }) => {
  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
};
```

리액트.memo를 적용한 후:

```js
const UserProfile = React.memo(({ name, email }) => {
  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
});
```

UserProfile을 React.memo로 감심으로써, 리액트는 name 또는 email props이 변경되지 않는 한이 컴포넌트를 다시 렌더링하지 않아야 함을 알 수 있습니다. 이 간단한 개선 사항은 깊은 컴포넌트 트리 또는 복잡한 UI가 있는 애플리케이션에서 상당한 성능 향상을 이끌 수 있습니다.

<div class="content-ad"></div>

## React.memo 사용하는 최상의 방법

- 선택적 사용: React.memo를 자주 동일한 props로 다시 렌더링되는 컴포넌트에 적용합니다.
- 깊은 비교: props로 깊은 객체를 갖는 컴포넌트의 경우, 정확한 재렌더링 제어를 위해 React.memo의 두 번째 인자로 사용자 정의 비교 함수를 구현해야 합니다.
- 성능 프로파일링: React.memo 및 다른 최적화가 앱의 성능을 향상시키는지 특정한 도구인 React Developer Tools를 사용하여 항상 성능 향상을 측정하세요.

# FastImage로 이미지 캐싱 및 성능 향상 향상

모바일 앱의 미디어 리치 환경에서 이미지 처리를 최적화하는 것은 React Native 앱 성능을 향상시키는 데 중요합니다. 강력한 React Native 라이브러리인 FastImage는 고급 캐싱, 우선순위 로딩 및 순진 이미지 지원을 제공하여 표준 Image 컴포넌트보다 크게 뛰어난 성능을 제공합니다. 개발자들에게 필수적인 도구입니다.

<div class="content-ad"></div>

## FastImage를 선택하는 이유

- 효율적인 캐싱: 이미지를 더 효과적으로 캐싱하여 네트워크 요청을 최소화합니다.
- 우선순위 로딩: 중요한 이미지를 먼저 로드하도록 이미지 로드 우선순위를 설정할 수 있습니다.
- 점진적 이미지 지원: 이미지를 다운로드하는 동안 이미지를 표시함으로써 인지된 로드 시간을 개선합니다.

## 빠른 통합 가이드

FastImage를 설치한 후, React Native의 기본 Image 컴포넌트를 쉽게 대체하여 이러한 이점을 활용할 수 있습니다.

<div class="content-ad"></div>

```js
import FastImage from 'react-native-fast-image';

const OptimizedImage = () => (
  <FastImage
    style={ width: 200, height: 200 }
    source={
      uri: 'https://example.com/image.jpg',
      priority: FastImage.priority.normal,
    }
    resizeMode={FastImage.resizeMode.contain}
  />
);
```

- 이미지 최적화하기: 이미지의 적절한 크기와 압축을 확인하세요.
- 전략적으로 프리로드하기: 중요한 이미지에 대해 FastImage의 프리로드 기능을 사용하여 사용자 경험을 더 개선해보세요.
- 캐시 효율적으로 관리하기: FastImage의 캐시 제어를 활용하여 성능과 메모리 사용량을 균형 있게 유지하세요.

# 6. 메모리 누수 방지: 리액트 네이티브에서 상태 업데이트 보호하기

비동기 작업에서 상태 업데이트를 관리하는 것은 때때로 컴포넌트가 언마운트되기 전에 메모리 누수로 이어질 수 있습니다. 이 문제는 비동기 작업이 완료되고 DOM에 더 이상 없는 컴포넌트의 상태를 업데이트하려고 할 때 발생하여 React에서 경고를 발생시킵니다. 이러한 문제에 대응하기 위해 컴포넌트가 여전히 마운트된 상태인 경우에만 안전하게 상태를 업데이트하는 사용자 정의 후크를 만들어 메모리 누수를 방지할 수 있습니다.

<div class="content-ad"></div>

## 안전한 상태 업데이트 후크의 필요성

API에서 데이터를 가져오거나 타임아웃을 설정하는 등의 비동기 작업은 컴포넌트가 언마운트되기 전에 완료되지 않을 수 있습니다. 컴포넌트의 마운트 상태를 확인하는 커스텀 후크를 사용하면 언마운트된 컴포넌트에서 불필요하고 잠재적으로 해로운 상태 업데이트를 방지할 수 있습니다.

```js
import { useState, useEffect, useCallback, useRef } from "react";

export const useSafeState = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const isMountedRef = useRef(null);

  useEffect(() => {
    // 컴포넌트 마운트
    isMountedRef.current = true;

    // 컴포넌트 언마운트 시 정리
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const safeSetValue = useCallback((newValue) => {
    // 컴포넌트가 마운트된 경우에만 상태 업데이트
    if (isMountedRef.current) {
      setValue(newValue);
    }
  }, []);

  return [value, safeSetValue];
};
```

이 후크는 컴포넌트의 마운트 상태를 추적하기 위해 ref인 isMountedRef를 초기화합니다. 컴포넌트가 마운트되면 isMountedRef.current를 true로 설정합니다. useEffect에 제공된 정리 함수는 컴포넌트가 언마운트될 때 이 값을 false로 변경하여 상태를 업데이트할 수 없는 안전하지 않은 상태임을 나타냅니다. 그런 다음 safeSetValue 함수는 상태를 업데이트하기 전에 이 ref를 확인하여 컴포넌트가 마운트된 것을 보장합니다.

<div class="content-ad"></div>

## 사용 예시:

```js
const MyComponent = () => {
  const [data, setData] = useSafeState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchSomeData();
      setData(result);
    };

    fetchData();
  }, [setData]);

  return <View>{data && <Text>{data}</Text>}</View>;
};
```

이 예시에서 setData 함수는 컴포넌트 상태를 안전하게 업데이트하며, MyComponent가 여전히 마운트된 상태인 경우에만 가져온 데이터로 업데이트합니다. 이로써 마운트 해제된 컴포넌트에 대한 상태 업데이트로 인한 메모리 누수 문제가 효과적으로 방지됩니다.

# 최상의 성능을 위해 ScrollView 대신 FlatList 및 SectionList 사용하기

<div class="content-ad"></div>

리액트 네이티브 개발에서는 데이터 목록을 효율적으로 렌더링하여 부드러운 스크롤 성능을 유지하고 메모리 사용량을 최소화하는 것이 중요합니다. 복잡하거나 대규모 데이터셋을 처리할 때는 작업에 적합한 컴포넌트를 선택하는 것이 앱 성능에 상당한 영향을 미칠 수 있습니다. 이러한 시나리오에서는 ScrollView 대신 FlatList나 SectionList를 사용해야 합니다. 또한 페이지네이션을 구현하면 데이터를 점진적으로 로드하여 앱의 응답성을 더욱 향상시킬 수 있습니다.

## 왜 FlatList와 SectionList를 선호해야 하는가?

- 효율적인 데이터 처리: FlatList와 SectionList는 긴 데이터 목록에 최적화되어 있습니다. 보이는 항목들이나 보이는 것과 가까운 항목들만 렌더링하여 사용되는 메모리 양을 줄이고 성능을 향상시킵니다.
- 내장 기능: 이러한 컴포넌트들은 새로 고침, 더 많은 항목 로드, 구분자 표시 등의 기능을 기본으로 제공하므로 다양한 사용 사례에 매우 유용합니다.
- 사용자 정의 및 유연성: FlatList와 SectionList는 항목 렌더링, 레이아웃, 동작에 대한 방대한 사용자 정의 옵션을 제공하여 복잡한 UI 디자인을 수용합니다.

## FlatList에서 페이지네이션 구현하기

<div class="content-ad"></div>

페이지네이션은 한 번에 데이터 청크를 로드하도록 허용하여 사용자 경험을 향상시키고 컨텐츠를 빠르게 표시하며 로드 시간을 줄입니다. 이것은 FlatList에서 페이지네이션을 구현하는 간단화된 예제입니다:

```js
import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const PaginatedList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    const newData = await fetchYourData(page);
    setData([...data, ...newData]);
    setPage(page + 1);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.key}</Text>}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={fetchData}
      onEndReachedThreshold={0.5}
    />
  );
};
```

이 예제에서는 사용자가 목록의 끝에 도달할 때 새 데이터를 가져와 추가하는 방법을 보여줍니다. 또한 onEndReachedThreshold를 조정하여 스크롤 위치에 따라 데이터 가져오기를 트리거할 시기를 제어할 수도 있습니다.

# 8. 빠르고 강력한 MMKV로 로컬 스토리지 강화하기

<div class="content-ad"></div>

모바일 앱 개발에서 흔한 병목 현상 중 하나는 데이터 저장 및 검색의 효율성입니다. 기본 AsyncStorage API는 유용하지만 더 엄격한 애플리케이션의 성능 요구를 충족시키지 못할 수 있습니다. MMKV는 고속 C++ 라이브러리를 활용한 스토리지 솔루션으로 AsyncStorage보다 빠른 데이터 액세스를 제공합니다.

## MMKV의 장점

MMKV는 C++로 설계 및 구현되어 있어 성능과 효율성에서 뛰어납니다. 여기 몇 가지 주요 이점이 있습니다:

- 속도: MMKV는 효율적인 직렬화와 역직렬화로 AsyncStorage보다 훨씬 빠른 거의 즉시 읽기 및 쓰기 작업을 제공합니다.
- 크기 효율성: 저장 공간 사용을 최적화하여 앱 데이터의 풋프린트가 최소화되도록 합니다.
- 쉬운 이전: 간단하고 직관적인 API 덕분에 개발자는 최소한의 코드 변경으로 AsyncStorage에서 MMKV로 쉽게 전환할 수 있습니다.
- 멀티 프로세스 액세스: AsyncStorage와 달리 MMKV는 동시에 여러 프로세스에서 액세스할 수 있어 복잡한 애플리케이션에 이상적입니다.

<div class="content-ad"></div>

```js
import MMKVStorage from "react-native-mmkv";

const storage = new MMKVStorage.Loader().initialize();

// 데이터 저장
storage.setString("user_token", "abc123");

// 데이터 검색
const userToken = storage.getString("user_token");
```

## MMKV 대 AsyncStorage:

- 성능: MMKV의 읽기 및 쓰기 작업은 훨씬 빠르며, 대규모 데이터 세트에서도 원활한 경험을 제공합니다.
- 병행성: MMKV는 데이터 손상의 위험이 없는 동시 읽기 및 쓰기를 지원하며, 동시 작업에 어려움을 겪는 AsyncStorage와 달리 안정성을 제공합니다.
- API 간결성: 두 가지 모두 직관적인 API를 제공하지만, MMKV의 추가 기능이 이용성을 복잡하게 만들지는 않습니다.

# 9. 모든 콘솔 로그 제거하기

<div class="content-ad"></div>

리액트 네이티브의 문서에는 쉽고 효과적인 최적화 방법이 강조되고 있어요: 프로덕션 코드에서 console.log 문을 제거하는 것이죠. 이러한 로그는 개발 단계에서 유용하지만, 프로덕션 환경에서는 자바스크립트 스레드를 불필요하게 점유하여 앱의 성능을 느리게 할 수 있습니다.

## 빠른 해결 방법:

- 수동 정리: 프로덕션 빌드 이전에 console.log 문을 제거하거나 주석 처리하세요.
- Babel로 자동화: babel-plugin-transform-remove-console 플러그인을 사용하여 프로덕션 빌드에서 자동으로 로그를 제거하세요.

```js
// Babel 구성 (babel.config.js)
module.exports = {
  env: {
    production: {
      plugins: ["transform-remove-console"],
    },
  },
};
```

<div class="content-ad"></div>

이 간단한 단계를 따르면 JavaScript 스레드를 중요한 작업에 집중시켜 앱 성능을 크게 향상시킬 수 있어요. 사용자 경험을 보다 원할하게 만들어줄 거예요.

그럼 이제 React Native 앱을 최고 성능으로 업그레이드하는 방법에 대한 안내를 마칩니다!

![이미지](https://miro.medium.com/v2/resize:fit:900/1*WlFNK7FX6wahcwmbqRH9OA.gif)

# 결론

<div class="content-ad"></div>

React Native 앱을 향상시키는 것은, 효율적인 상태 관리와 메모리 누수 방지부터 이미지 최적화와 타사 라이브러리의 신중한 사용까지 다양한 전략을 포함하는 지속적인 여정입니다. 우리는 React.memo를 활용하여 컴포넌트 다시 렌더링을 최적화하고, useSafeState를 사용하여 마운트 해제된 컴포넌트의 업데이트를 피하며, FastImage로 이미지 성능을 향상하는 등 고급 기술을 탐구했습니다. 각 전략은 응용 프로그램이 원할하게 실행되고 모든 기기에서 훌륭한 사용자 경험을 제공하는 데 중요한 역할을 합니다.

이러한 관행을 구현하면 앱의 성능을 크게 향상시켜 더 빠르고 반응성이 뛰어나며 효율적으로 동작하게 만들 수 있습니다. 그러나 React Native의 세계는 항상 진화하고 있어 새로운 도구, 기술, 최상의 관행이 정기적으로 등장합니다.

이제 여러분의 소식을 듣고 싶습니다! React Native 앱을 최적화하는 데 직면한 어떤 도전 과제가 있나요? 우리가 다음에 탐구해야 할 특정 주제나 기술이 있나요? 여러분의 생각과 질문을 공유해 주시고 함께 학습하고 발전하는 여정을 계속해 나가요!
