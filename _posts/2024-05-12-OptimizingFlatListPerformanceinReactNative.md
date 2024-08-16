---
title: "리액트 네이티브에서 FlatList 성능 최적화하기"
description: ""
coverImage: "/assets/img/2024-05-12-OptimizingFlatListPerformanceinReactNative_0.png"
date: 2024-05-12 20:34
ogImage: 
  url: /assets/img/2024-05-12-OptimizingFlatListPerformanceinReactNative_0.png
tag: Tech
originalTitle: "Optimizing FlatList Performance in React Native"
link: "https://medium.com/@ajkhatibi/optimizing-flatlist-performance-in-react-native-a83b1315ded9"
isUpdated: true
---




<img src="/assets/img/2024-05-12-OptimizingFlatListPerformanceinReactNative_0.png" />

리액트 네이티브는 개발자가 크로스 플랫폼 앱을 쉽게 만들 수 있도록 했습니다. 가장 일반적으로 사용되는 구성 요소 중 하나가 FlatList 인데, 올바르게 사용하지 않으면 앱이 느려질 수 있습니다. 성능을 개선하기 위한 몇 가지 방법에 대해 이야기해 보겠습니다.

# 1. getItemLayout 속성 사용

getItemLayout 속성을 사용하면 React Native가 측정 과정을 피할 수 있어 성능을 향상시킬 수 있습니다. 특히 긴 목록을 다룰 때 유용합니다.



```js
<FlatList
  data={data}
  keyExtractor={item => item.id.toString()}
  getItemLayout={(data, index) => (
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  )}
  renderItem={({item}) => <Item title={item.title} />}
/>
```

특이사항: 항목의 높이가 고정되어 있지 않으면 레이아웃을 계산하는 것이 까다로울 수 있습니다. 이러한 경우에는 getItemLayout이 도움이 되지 않을 수 있습니다.

참고: 각 항목의 높이가 동일한 경우 getItemLayout이 가장 효과적입니다.

## 2. removeClippedSubviews 활용하기



`removeClippedSubviews` 속성은 화면 바깥에 있는 뷰를 언로드하여 리소스를 해제합니다. 이는 큰 목록에서 도움이 될 수 있지만, 이러한 언로드된 뷰로 다시 스크롤할 때 약간의 지연이 발생할 수 있습니다.

```js
<FlatList
  data={data}
  removeClippedSubviews={true}
  renderItem={renderItem}
/>
```

참고: `removeClippedSubviews`는 강력한 도구이지만 몇 가지 주의할 점이 있습니다. 목록의 항목들이 복잡한 상태를 가지거나 이미지나 비디오와 같은 미디어를 포함하는 경우 주목할 만한 예외 상황이 발생할 수 있습니다.

예를 들어, 사용자가 사진을 보낼 수 있는 채팅 애플리케이션을 고려해 보겠습니다. 만약 채팅 기록에서 `removeClippedSubviews`를 사용한다면, 예전에 보낸 이미지를 찾으려고 상단으로 스크롤하는 경우 이미지가 화면에 다시 나타날 때 다시로드되거나 깜박일 수 있습니다. 왜냐하면 해당 이미지가 화면 밖에 있을 때 메모리에서 해제되었기 때문입니다. 이는 사용자 경험을 손상시킬 수 있습니다.



# 3. maxToRenderPerBatch 및 windowSize를 사용하여 렌더링 항목 제한하기

maxToRenderPerBatch는 각 렌더링 일괄처리별 표시되는 항목 수를 제한하여 부하를 줄입니다. windowSize는 가시 콘텐츠에서 양쪽 방향으로 렌더링되는 항목 "페이지" 수를 정의합니다.

```js
<FlatList
  data={data}
  maxToRenderPerBatch={10}
  windowSize={5}
  renderItem={renderItem}
/>
```

참고: 데이터 세트가 다양하여 목록 항목의 크기와 복잡성이 매우 다를 수 있는 상황(예: 텍스트, 이미지, 비디오, 광고 등 다양한 유형의 게시물이 있는 소셜 미디어 애플리케이션)에 대비하는 잠재적인 예외 상황이 발생할 수 있습니다.



높은 maxToRenderPerBatch 값을 설정하면 엔진이 한꺼번에 많은 항목을 렌더링하려고 하기 때문에 보다 복잡한 항목들의 렌더링이 지연될 수 있습니다. 특히 하위 기기에서는 눈에 띄는 렉이 발생할 수 있습니다.

반면에 windowSize가 낮게 설정된 경우 사용자가 피드를 빠르게 스크롤하면 화면에 표시할 항목들이 미리 준비되지 않아 비어있는 공간이나 로딩 스피너가 나타날 수 있습니다.

# 4. initialNumToRender 사용하기

이 속성은 초기 배치에서 렌더링할 항목 수를 설정합니다. 이 속성은 앱의 첫 인상을 개선하는 데 유용할 수 있습니다.



```js
<FlatList
  data={messages}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  initialNumToRender={20} // 처음에는 최근 20개의 메시지만 렌더링합니다.
  inverted // 가장 최근의 메시지가 아래에 표시되도록 리스트를 뒤집습니다.
/>
```

채팅 애플리케이션을 고려해 보겠습니다. 각 채팅 메시지가 FlatList의 항목으로 표시됩니다. 사용자가 채팅을 열 때 채팅 기록의 모든 메시지를 렌더링하지 않고 즉시 가장 최근 메시지를 표시하고 싶습니다.

이 경우, initialNumToRender를 적당한 숫자(예: 20)로 설정하여 가장 최근의 메시지를 빠르게 렌더링할 수 있습니다. 이렇게 하면 앱은 처음 로드할 때 수백 또는 수천 개의 메시지를 처리하고 렌더링하는 대신 초기로드시 20개 항목만 처리하고 렌더링하면 됩니다. 이렇게 하면 훨씬 부드럽고 빠른 사용자 경험을 제공할 수 있습니다.

# 5. Use keyExtractor



keyExtractor를 사용하면 항목에 사용되는 키를 제어할 수 있습니다. 안정적인 키를 제공하면 성능 향상을 이끌 수 있습니다.

```js
<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
/>
```

# 6. 렌더링 시 인라인 함수와 변수 사용 피하기

인라인 함수나 변수를 FlatList나 해당 항목에 전달하는 것은 필요하지 않은 다시 렌더링을 유발할 수 있습니다. 새로운 함수나 객체가 생성되기 때문에 props가 변경되어 렌더링이 불필요하게 발생할 수 있습니다.



여기 인라인 함수와 변수를 포함한 컴포넌트 예제입니다:

```js
function ExampleComponent({ data }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.name}</Text>} // 인라인 함수
      keyExtractor={item => item.id} // 인라인 함수
    />
  );
}
```

위 예제에서, renderItem과 keyExtractor 함수들은 컴포넌트 내에서 인라인으로 정의되어 있습니다. 이는 컴포넌트가 다시 렌더링될 때마다 재생성될 것을 의미합니다.

다음은 위 컴포넌트를 인라인 함수와 변수를 피하고 리팩토링하는 방법입니다:



```js
function ExampleComponent({ data }) {
  const renderItem = ({ item }) => <Text>{item.name}</Text>; // 렌더 메소드 외부에 정의됨
  const keyExtractor = item => item.id; // 렌더 메소드 외부에 정의됨

  return (
    <FlatList
      data={data}
      renderItem={renderItem} // 함수에 대한 참조
      keyExtractor={keyExtractor} // 함수에 대한 참조
    />
  );
}
```

렌더 메소드 외부에 renderItem 및 keyExtractor 함수를 정의함으로써 컴포넌트가 초기화될 때 단 한 번만 생성되고 매 렌더마다 재생성되는 일이 없어집니다.

예외 상황: 추가 매개변수를 전달해야 할 경우 인라인 함수를 사용하고 싶을 수 있습니다. 대신 추가 매개변수를 데이터를 통해 전달하고 renderItem 함수에서 추출하십시오.

React Native의 FlatList는 강력한 도구이지만 현명하게 사용하는 것이 중요합니다. 이러한 팁을 활용하면 목록이 부드럽고 반응적이며 더 나은 사용자 경험을 제공할 수 있습니다.