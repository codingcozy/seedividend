---
title: "리액트 네이티브에서 페이지와 함께 페이지네이션하기"
description: ""
coverImage: "/assets/img/2024-05-12-PaginationinReactNativewithPage_0.png"
date: 2024-05-12 22:14
ogImage: 
  url: /assets/img/2024-05-12-PaginationinReactNativewithPage_0.png
tag: Tech
originalTitle: "Pagination in React Native with Page"
link: "https://medium.com/@okerioh/pagination-in-react-native-with-page-ebfca1874f17"
---


소개:

페이지네이션은 React Native에서 대량의 데이터 목록을 효율적으로 관리하고 표시할 수 있게 해주는 강력한 기술입니다. 이 글에서는 FlatList와 페이지네이션 버튼을 사용하여 고급 페이지네이션을 구현하는 방법에 대해 알아볼 것입니다. 페이지네이션의 논리, 각 페이지별 데이터 검색 방법 및 렌더링 프로세스의 최적화에 대해 논의할 것입니다. 함께 React Native 페이지네이션을 마스터해봅시다!

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*Vj09FpPeRuOC7tDLGpBrsg.gif)

```js
..... 구성 요소 구조 ....
const handlePageClick = (p: number) => setCurrentPage(p);

  const renderItem = ({item}: {item: ScoreCard}) => {
    return <Card item={item} key={item.id} />;
  };

return (
<SafeAreaView style={styles.container}>      
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={handleEmpty}
        windowSize={10} // VirtualizedList의 기능 추가
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <View style={styles.paginationContainer}>
        {renderPaginationButtons()}
      </View>
    </SafeAreaView>
)
...
```



- 페이지네이션 로직

저희 페이지네이션 구현의 핵심은 'Institution' 컴포넌트에 있습니다. 이 컴포넌트는 'useState'와 같은 React 훅을 사용하여 중요한 상태 변수를 관리합니다. 'currentPage' 상태는 현재 표시되는 페이지를 나타내고, 'totalPages'는 전체 목록에 대한 총 페이지 수를 저장합니다. 'itemsPerPage'를 설정하여 페이지 당 표시할 항목 수를 결정하여 로딩 프로세스를 최적화합니다.

```js
const [totalPages, setTotalpages] = useState(0);
const [currentPage, setCurrentPage] = useState(0);
const [items, setItems] = useState([]);
const [refreshing, setRefreshing] = useState(false);
const itemsPerPage = 16;
```

2. 각 페이지의 데이터 가져오기



'fetchData' 함수는 페이지네이션 로직의 중요한 부분입니다. 'Institution' 컴포넌트가 마운트되거나 'currentPage'가 변경될 때마다 해당 함수를 호출하여 현재 페이지의 데이터를 검색합니다. 우리는 데이터를 가져오는 작업을 처리하는 'fetcher' 유틸리티 함수를 사용합니다.

```js
useEffect(() => {
  fetchData();
}, [currentPage]);

async function fetchData() {
  setRefreshing(true);
  try {
    let response = await fetcher(currentPage, itemsPerPage);
    setTotalpages(response.metadata.total / itemsPerPage);
    let data: [] = response.results;
    setItems(data);
    setRefreshing(false);
  } catch (error) {
    setRefreshing(false);
    console.log(error);
  }
}
```

3. 페이지네이션 버튼 처리

사용자가 페이지별 목록을 탐색할 수 있도록 하기 위해, 페이지네이션 버튼을 렌더링할 때 TouchableOpacity 요소를 사용합니다. 'renderPaginationButtons' 함수는 'currentPage', 'totalPages', 그리고 표시할 최대 버튼 수('maxButtonsToShow')를 기반으로 표시할 페이지를 계산한 다음 적절한 버튼을 생성합니다.



```js
const renderPaginationButtons = () => {
  const maxButtonsToShow = 5;
  let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

  if (endPage - startPage + 1 < maxButtonsToShow) {
    startPage = Math.max(0, endPage - maxButtonsToShow + 1);
  }

  const buttons = [];

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <TouchableOpacity
        key={i}
        onPress={() => handlePageClick(i)}
        style={[
          styles.paginationButton,
          i === currentPage ? styles.activeButton : null,
        ]}>
        <Text style={{color: 'white'}}>{i}</Text>
      </TouchableOpacity>,
    );
  }

  return buttons;
};
```

4. Pull-to-Refresh 및 데이터 없음 처리

더 나은 사용자 경험을 제공하기 위해 'RefreshControl'를 사용하여 pull-to-refresh 기능을 구현했습니다. 사용자는 필요할 때 목록을 수동으로 새로 고칠 수 있습니다. 추가로, 표시할 기관이 없는 시나리오를 처리하기 위해 '기관 없음' 메시지를 렌더링합니다.

```js
const handleRefresh = () => {
  setRefreshing(true);
  setTimeout(() => setRefreshing(false), 1000);
};

const handleEmpty = () => {
  return <Text>기관이 없습니다!</Text>;
};
```



5. 더 나은 사용자 경험을 위한 스타일링

저희는 컴포넌트에 시각적 매력을 더하기 위해 StyleSheet를 활용합니다. 페이지네이션 버튼은 활성화될 때 색상과 크기가 변경되어 사용자에게 시각적 피드백을 제공하여 전체 앱 경험을 향상시킵니다.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  paginationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'gray',
  },
  activeButton: {
    backgroundColor: '#22c55d',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
  },
});
```

맺음말



이 코드에 대한 링크는 여기에서 확인할 수 있습니다 - ` paginate. React Native pagination을 FlatList와 페이지 버튼으로 마스터하여 대량의 데이터 목록을 손쉽게 처리하여 부드러운 성능과 더 나은 사용자 경험을 보장할 수 있습니다. 페이지네이션은 렌더링을 크게 최적화하며 네트워크 리소스 부하를 줄이고 전반적인 앱 대응성을 향상시킵니다. React Native 애플리케이션에서 고급 페이지네이션을 구현하는 것은 고품질이고 성능이 우수한 모바일 앱을 제공하는 데 유용한 기술입니다.