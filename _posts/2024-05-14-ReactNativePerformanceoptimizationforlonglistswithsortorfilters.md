---
title: "React Native 정렬 또는 필터가 있는 긴 목록의 성능 최적화"
description: ""
coverImage: "/assets/img/2024-05-14-ReactNativePerformanceoptimizationforlonglistswithsortorfilters_0.png"
date: 2024-05-14 10:33
ogImage: 
  url: /assets/img/2024-05-14-ReactNativePerformanceoptimizationforlonglistswithsortorfilters_0.png
tag: Tech
originalTitle: "React Native: Performance optimization for long lists with sort or filters"
link: "https://medium.com/@sebastian.e.vogel/react-native-performance-optimization-for-long-lists-with-sort-or-filters-4ac356846805"
isUpdated: true
---




React Native에서 긴 요소 목록을 다루는 것은 꽤 도전적일 수 있어요. RN 문서에서는 FlatList를 사용하는 것을 권장하지만, 제공된 예제는 종종 방대한 목록이나 필터 적용 및 목록 정렬과 같은 시나리오를 다루지 않아서 많은 애플리케이션에서 필수적인 요구 사항들을 보여주지 못합니다.

# 예시와 관찰

RN 문서의 성능에 따른 가이드에 따라 매우 간단한 사용자 인터페이스를 갖춘 새로운 React Native 프로젝트를 만들어 보겠습니다. 우리는 이 인터페이스를 따라 MOCK 데이터셋을 만들었습니다. 이 데이터셋은 다음 인터페이스를 따르는 500개의 제품 항목이 있어요:

```js
interface Item {
 id: number
 name: string
 expiration_date: string
 qty: number
}
```



그럼, 헤더와 두 개의 버튼이 있는 FlatList를 구현했습니다. 하나의 버튼은 ID가 가장 높은 순서대로 목록을 정렬하고, 다른 하나는 ID가 가장 낮은 순서대로 정렬합니다.

```js
export const List = () => {
  const [orderBy, setOrderBy] = useState<'normal' | 'reverse'>('normal');

  const renderListItem = useCallback(({item, index}: {item: Item; index: number}) => {
    return <ListItem item={item} index={index} />;
  }, []);

  const ListHeaderComponent = useCallback(() => {
    return (
      <Header
        title={'Order by'}
        onPressButton1={() => {
          setOrderBy('normal');
        }}
        onPressButton2={() => {
          setOrderBy('reverse');
        }}
      />
    );
  }, []);

  const orderedData = useMemo(() => {
    return orderBy === 'normal'
      ? mockData.data.sort((a, b) => a.id - b.id)
      : mockData.data.sort((a, b) => b.id - a.id);
  }, [orderBy]);

  return (
    <>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={({id}) => id.toString()}
        renderItem={renderListItem}
        data={orderedData}
        stickyHeaderIndices={[0]}
      />
    </>
  );
}
```

ListItem 컴포넌트를 메모이즈하여 불필요한 다시 렌더링을 피했습니다. 인덱스에 따라 배경색이 결정되며, 동작을 이해하기 위해 인덱스를 기록하고 있습니다.

```js
export const ListItem = memo(({item, index}: {item: Item; index: number}) => {
  const backgroundColor = item.id % 2 === 0 ? '#red' : 'pink';

  console.log(index);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor,
      }}>
      <Text>
        {item.name} - {item.id}
      </Text>
    </View>
  );
})
```



FlatList은 동작을 이해하고 문제를 해결하는 데 도움이 되는 세 가지 중요한 속성을 제공합니다:

- initialNumToRender: 초기 배치에서 렌더링할 아이템 수를 결정하며, 화면을 채우되 과도하게 많이 렌더링하지 않아야 합니다.
- maxToRenderPerBatch: 각 증분 렌더 배치에서 렌더링할 최대 아이템 수를 지정합니다.
- updateCellsBatchingPeriod: 배치 렌더 사이의 밀리초 단위 지연 시간을 설정합니다.

예를 들어, initialNumToRender=10, maxToRenderPerBatch=10, updateCellsBatchingPeriod=10으로 설정하면, 리스트는 초기 10개 아이템을 먼저 렌더링한 다음, 10ms마다 10개씩 더 추가하여 완료될 때까지 부드럽게 렌더링되며, JS 스레드를 차단하지 않습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*okgjSFX3jUmN-5CM2dAESw.gif)



리스트를 스크롤하는 동안 추가 항목이 배경에서 완료될 때까지 렌더링됩니다.

![scrolling](https://miro.medium.com/v2/resize:fit:1200/1*cDzV6w7LguahgYZ4ywfQig.gif)

그러나 목록을 정렬할 때 예상대로 동작하지 않습니다.

![sorting](https://miro.medium.com/v2/resize:fit:1200/1*a4yZcj1iJYYel3tllSJqEw.gif)



RN의 가이드라인을 따라 FlatList 성능을 향상시키려고 노력했지만, 목록이 예상대로 동작하지 않았어요. 그러나 성능을 향상시키는 것으로 보이는 잠재적인 해결책을 고안해 냈어요.

주문 상태가 변경될 때마다 리스트의 다시 마운트를 트리거할 수 있도록 키를 사용함으로써, 초기 마운트 과정을 완료될 때까지 JS 스레드를 차단하지 않고 효율적으로 진행할 수 있어요.

```js
<FlatList
    key={orderBy}
    ...나머지 초기 속성
/>
```

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*yLeRxhhh2BRKBJ2MBERS5Q.gif)



행동을 더 잘 이해하기 위해 initialNumToRender=20, maxToRenderPerBatch=1 및 updateCellsBatchingPeriod=500으로 설정합니다.

![이미지1](https://miro.medium.com/v2/resize:fit:1200/1*1JSiEZjP8PLNiP8I2OEvVw.gif)

그러나 키가 삭제되면 어떻게 되나요?

![이미지2](https://miro.medium.com/v2/resize:fit:1200/1*vnZ50uq7oTxc1T_vdNHopQ.gif)



요약하자면, 렌더링된 목록에서 데이터를 필터링하거나 정렬하는 것은 초기 렌더링 시 항목 수와 동일한 수의 항목이 렌더링될 때까지 JS 스레드를 차단하는데 이상적인 방법이 아닙니다. 
목록의 성능을 향상시킬 수 있습니다. 목록을 강제로 마운트하여 교차 상태를 키로 전달하면 목록의 데이터도 변경할 수 있습니다.

저장소: https://gitlab.com/sebastian.e.vogel/reactnativelonglistperformance