---
title: "React Native 리스트의 성능을 개선하는 방법 FlatList 최적화 가이드"
description: ""
coverImage: "/assets/img/2024-05-12-OptimizeYourReactNativeListswithFlatListAPerformanceGuide_0.png"
date: 2024-05-12 18:48
ogImage: 
  url: /assets/img/2024-05-12-OptimizeYourReactNativeListswithFlatListAPerformanceGuide_0.png
tag: Tech
originalTitle: "Optimize Your React Native Lists with FlatList: A Performance Guide"
link: "https://medium.com/stackademic/optimize-your-react-native-lists-with-flatlist-a-performance-guide-e6369d59c8e7"
isUpdated: true
---




소개

![이미지](/assets/img/2024-05-12-OptimizeYourReactNativeListswithFlatListAPerformanceGuide_0.png)

FlatList란 무엇인가요?

- 성능 최적화: FlatList는 대규모 목록을 효율적으로 렌더링하기 위해 설계된 React Native 컴포넌트입니다. "게으른 로딩"이라는 기술을 통해 이를 수행합니다. 이는 화면에 현재 표시된 항목만 렌더링하고 사용자가 스크롤할 때 컴포넌트를 재활용함으로써 작동합니다.
- 이를 통해 많은 양의 데이터를 다룰 때에도 앱이 부드럽고 반응성 있게 유지됩니다.
- 필수적인 목록 기능: FlatList는 사용자 친화적인 목록을 구축하는 데 필수적인 다양한 기능을 제공합니다.
- 매우 맞춤화 가능: 속성, 스타일링, 사용자 정의 컴포넌트를 사용하여 목록의 모양과 느낌을 쉽게 조정할 수 있습니다.



FlatList를 사용하는 주요 장점들

- 성능, 성능, 성능: FlatList는 긴 목록을 처리할 때 빛을 발합니다. 게으르게 로딩하고 최적화 기술을 사용하여 데이터가 많아져도 앱이 느려지지 않도록 합니다.
- 내장 기능: 바퀴를 재창조할 필요 없어요. FlatList에는 현대적인 목록에서 기대할 수 있는 기능이 탑재되어 있습니다: 당겨서 새로고침, 헤더, 푸터, 항목 구분선, 특정 위치로 스크롤 등.
- 크로스 플랫폼: 하나의 코드 베이스로 iOS와 Android 기기에서 목록이 매끄럽게 작동합니다.

## 핵심 기능들:

- FlatList는 상자에서 바로 제공되는 주요 기능들로, 매우 유용하게 만들어집니다:
- 크로스 플랫폼: iOS와 Android에서 일관되게 작동합니다.
- 수평 모드: 표준 수직 및 수평 목록 간 전환 가능.
- 가시성 콜백: 보이는 항목을 추적하여, 사용자가 끝에 가까워질 때 추가 데이터를 로드할 수 있도록 합니다.
- 헤더 및 푸터: 헤더와 푸터를 목록에 쉽게 통합합니다.
- 구분선: 목록 항목 사이의 구분선 외관을 사용자 정의할 수 있습니다.
- 당겨서 새로고침: 사용자가 목록 내용을 새로 고칠 수 있는 일반적인 인터페이스.
- 스크롤 로딩 (무한 스크롤): 사용자가 스크롤할 때 자연스럽게 더 많은 데이터를 로드합니다.
- ScrollToIndex: 목록에서 특정 항목으로 빠르게 이동합니다.
- 여러 열: 그리드 형식으로 목록을 렌더링합니다.



FlatList을 언제 사용해볼까요?

- 연락처 목록 표시
- 이미지 갤러리 만들기
- 뉴스 피드 또는 타임라인 구축
- 전자상거래 앱에서 제품 목록 렌더링
- 스크롤 가능한 항목 목록을 표시해야 하는 모든 시나리오

간단한 예제로 설명해 보겠습니다:

```js
import { FlatList, Text } from 'react-native';

const myData = [ /* 데이터 객체 배열 */ ];

const renderItem = ({ item }) => (
    <Text>{item.title}</Text> 
);

<FlatList
  data={myData}
  renderItem={renderItem} 
  keyExtractor={item => item.id} 
/>
```



중요한 속성 설명해 드릴게요

- data: 리스트에 표시하려는 데이터 배열입니다.
- renderItem: 데이터 배열에서 개별 항목을 가져와서 시각적으로 표현하는 JSX 구조를 반환하는 함수입니다.
- keyExtractor: 각 목록 항목에 대한 고유한 키를 생성하는 함수입니다 (React의 렌더링 최적화에 중요합니다).

## FlatList가 동적으로 업데이트되도록 만드는 방법

이 핵심은 FlatList가 응용 프로그램 데이터 변경에 따라 디스플레이를 어떻게 업데이트할지 제어하는 데 있습니다.



- 선택 가능한 항목: FlatList에서 항목을 선택할 때 시각적으로 변경되도록 하는 것이 목표입니다 (예: 선택된 항목 강조 표시). 이를 위해 다음이 필요합니다:

- 상태(State): 현재 선택된 항목의 ID를 추적하기 위해 selectedId와 같은 상태 변수가 필요합니다.
- 시각적 스타일링: renderItem 함수 내부에서 항목의 ID가 선택된 ID와 일치하는지 여부에 따라 다른 스타일을 적용해야 합니다.

extraData - 업데이트의 핵심:

- FlatList는 PureComponent이므로 생성자에서 직접 변경된 경우에만 다시 렌더링됩니다.
- 항목을 선택하는 경우 대부분 FlatList 자체의 속성 외부에서 상태를 변경하므로, extraData='selectedId'를 사용하여 selectedId 상태 변수가 변경될 때마다 FlatList가 다시 렌더링되어야 함을 알립니다.



keyExtractor - 고유 키 보장하기:

- keyExtractor는 React에서 리스트를 업데이트할 때 효율적으로 사용됩니다. 데이터의 각 항목에서 고유 키(일반적으로 ID)를 추출하는 방법을 제공합니다.

예시

```js
import { FlatList, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const recipes = [
  { id: 'recipe1', title: '맛있는 팬케이크' },
  { id: 'recipe2', title: '초콜릿 케이크' },
  // ... 더 많은 레시피
];

const RecipeCard = ({ recipe, onFavoriteToggle }) => { return ( <TouchableOpacity onPress={() => onFavoriteToggle(recipe.id)}> <View style={styles.card}> <Text style={styles.title}>{recipe.title}</Text> {/* 가상: 여기에 이미지가 있을 것 */} <Text style={recipe.isFavorite ? styles.favorite : styles.notFavorite}> {recipe.isFavorite ? '♥ 즐겨찾기한 레시피' : '☆ 즐겨찾기하기' } </Text> </View> </TouchableOpacity> ); };

const RecipeApp = () => {
  const [recipesData, setRecipesData] = useState(recipes); // 즐겨찾기 관리
  const [selectedId, setSelectedId] = useState(null); // extraData에 여전히 사용됨

  const handleFavoriteToggle = (recipeId) => {
    setRecipesData(prevRecipes => prevRecipes.map(recipe =>
      recipe.id === recipeId ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    ));
    setSelectedId(recipeId); 
  };

  return (
    <FlatList
      data={recipesData} // 업데이트된 데이터 전달
      renderItem={({ item }) => (
        <RecipeCard 
         recipe={item} 
         isFavorite={item.isFavorite} // 속성으로 전달
         onFavoriteToggle={handleFavoriteToggle} 
        /> 
      )} 
      keyExtractor={(item) => item.id} 
      numColumns={2} 
      extraData={selectedId} 
    />
  );
};
```



데이터:

- recipes: 초기 레시피 데이터를 보유한 간단한 배열입니다. 각 레시피에는 id 및 title 속성이 포함되어 있습니다.

구성 요소:

- RecipeCard: 단일 레시피 카드를 표시하는 컴포넌트입니다. 제목, 이미지를 위한 자리 표시자 및 즐겨찾기 버튼이 포함되어 있습니다. 이 버튼은 레시피의 isFavorite 상태에 따라 동적으로 변경됩니다.
- RecipeApp: 앱의 주요 컴포넌트입니다. 다음을 관리합니다:
- 상태:
- recipesData: 레시피의 현재 상태를 유지하는 배열로, isFavorite 상태를 포함합니다. 이는 recipes 배열을 사용하여 초기화됩니다.
- selectedId: 레시피를 즐겨찾기 추가하거나 취소할 때 FlatList를 다시 렌더링하기 위해 사용됩니다.
- handleFavoriteToggle: 레시피를 즐겨찾기 추가/취소하는 논리를 처리하는 함수입니다. 이 함수는 다음을 수행합니다:
- recipesData 배열에서 올바른 레시피를 찾습니다.
- 레시피의 isFavorite 속성을 토글합니다.
- 다시 렌더링을 트리거하기 위해 setRecipesData를 사용하여 recipesData 상태를 업데이트합니다.
- 렌더링을 강제로 수행하기 위해 setSelectedId를 통해 selectedId를 업데이트하여 하트/별표가 즉시 업데이트되도록 합니다.



아래는 Markdown 형식으로 변환된 텍스트입니다:

- **FlatList**: 레시피 목록을 효율적으로 렌더링하는 데 사용됩니다. 주요 속성은 다음과 같습니다:
  - **data**: 현재 즐겨찾기 상태를 반영하도록 recipesData 배열을 사용합니다.
  - **renderItem**: 데이터 내 각 레시피에 대해 RecipeCard 컴포넌트를 렌더링하며, 레시피 데이터와 handleFavoriteToggle 함수를 전달합니다.
  - **keyExtractor**: 각 레시피 객체에서 고유 id 속성을 추출하여 효율적인 추적을 가능하도록 합니다.
  - **numColumns**: 두 개의 열을 갖는 그리드를 생성합니다.
  - **extraData**: 선택된 ID가 변경될 때 (즐겨찾기를 추가하거나 삭제할 때) FlatList가 업데이트된 즐겨찾기 상태를 반영하도록 합니다.

## VirtualizedList을 위한 Wrapper로서 FlatList

- **성능 중점**: FlatList는 효율성을 위해 VirtualizedList 기반으로 구축되었습니다. 화면에 현재 보이는 레시피 카드만 렌더링합니다. 많은 레시피가 있는 경우 부드러운 스크롤링을 위해 중요합니다.
- **상태 제한**: 레시피 카드가 화면에서 스크롤되어 나가면 (예: 확장된 세부 정보 섹션이 있는 경우) 내부 상태가 기본적으로 유지되지 않습니다. 보통 Redux와 같은 중앙 집중형 저장소에 그러한 데이터를 저장합니다.



PureComponent 동작

- 변경 감지: PureComponent인 FlatList는 속성이나 기본 데이터가 실제로 변경될 때만 다시 렌더링되도록 최적화되어 있습니다. 여기서 extraData가 중요한 역할을 하며 레시피를 즐겨찾기로 지정하면 새로 고침이 트리거되어야 함을 알려줍니다.
- 속성 동등성: 레시피 배열 내의 변경 사항이 감지됩니다. renderItem이 의존하는 모든 요소가 레시피 데이터에 포함되어 있거나 별도의 속성으로 전달되는지 확인하는 것이 중요합니다.

메모리 관리 및 부드러운 스크롤링

- 비동기 렌더링: FlatList는 스크롤이 부드럽게 느껴지도록 실제로 보이는 것보다 약간 앞의 내용을 렌더링합니다. 하지만 너무 빠르게 스크롤할 경우, 콘텐츠가로드될 때까지 잠깐 빈 공간이 보일 수 있습니다.



keyExtractor

- 중요도: React에서 어떤 레시피 카드가 무엇인지 효율적으로 추적하는 것은 매우 중요합니다. 고유한 ID를 사용하는 것이 이상적인 방법입니다.

## ItemSeparatorComponent

React Native의 FlatList와 관련된 ItemSeparatorComponent의 설명은 다음과 같습니다:



목적:

- ItemSeparatorComponent 속성을 사용하면 FlatList에 사용자 정의 구성 요소나 요소를 각 항목 사이에 삽입하여 시각적 구분선이나 간격을 만들 수 있습니다.

작동 방식:

- 기본값 없음: FlatList에 기본 구분자가 없습니다. ItemSeparatorComponent를 사용하면 간단히 추가할 수 있습니다.
- 배치: 구분자 구성 요소는 각 항목 사이에 렌더링되며 목록의 맨 위와 맨 아래를 제외합니다.
- renderItem 통합: FlatList의 renderItem 함수는 그 내부의 info 매개변수에 속성을 제공합니다:
  - highlighted: 현재 항목이 강조 표시되는지 표시합니다 (예: 눌림).
  - separators.highlight: 구분자를 강조 표시하는 함수입니다.
  - separators.unhighlight: 구분자의 강조 표시를 제거하는 함수입니다.
  - separators.updateProps: 구분자의 다른 사용자 지정 속성을 업데이트하는 함수입니다.



유연성:

- 컴포넌트: 사용자 정의 React 컴포넌트를 생성하여 구분자 역할을 할 수 있습니다. 이렇게 하면 외관과 동작에 대한 완전한 제어권을 갖게 됩니다.
- 엘리먼트: 간단한 구분자의 경우 `View`와 같은 React 엘리먼트를 직접 전달하고 선 또는 간격을 위한 스타일링을 적용할 수 있습니다.

예시:

```js
const ItemSeparator = () => <View style={ height: 1, backgroundColor: 'lightgray' } />;

<FlatList
  data={myData}
  renderItem={({ item }) => <MyItemComponent item={item} />}
  ItemSeparatorComponent={ItemSeparator} 
/>
```



종류:

- component: 리액트 컴포넌트 클래스 또는 함수형 컴포넌트.
- function: 리액트 엘리먼트를 반환하는 함수.
- element: 직접적인 리액트 엘리먼트 (시각적 구분선을 위한 간단한 뷰일 때가 많음)

## 스타일링 속성

다음은 리액트 네이티브의 FlatList 컴포넌트 내에서 다양한 스타일링 속성 및 다른 중요한 목록 관련 속성에 대한 설명입니다:



# ListEmptyComponent

리액트 네이티브의 FlatList에서 ListEmptyComponent가 어떻게 작동하는지 살펴보겠습니다:

목적:

- ListEmptyComponent 속성은 FlatList가 렌더링할 데이터가 없을 때(즉, 데이터 배열이 비어있을 때) 표시할 내용을 결정합니다.
- 완전히 비어있는 화면이 아닌 사용자에게 친숙한 메시지나 시각적 표시 방법을 제공합니다.



작동 방식:

- 조건부 렌더링: FlatList는 자동으로 데이터 배열이 비어 있는지 확인합니다. 데이터 배열이 비어있으면 보통의 목록 항목 대신 ListEmptyComponent를 렌더링합니다.
- 유연성: 렌더링할 대상에 대해 두 가지 주요 옵션이 있습니다:

    - React 컴포넌트: 사용자 정의 React 컴포넌트(예: EmptyListComponent)를 만들어 메시지, 이미지, "새로 고침" 버튼과 같은 작업을 제공합니다. 외관과 기능에 완전한 제어권을 제공합니다.

  2. React 엘리먼트: 종종 "단순한" 것처럼 React 엘리먼트를 직접 제공합니다:



```js
<Text style={textAlign: 'center'}>레시피를 찾을 수 없어요!</Text>
```

```js
const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>아직 레시피가 없어요!</Text>
    </View> 
);

<FlatList
    data={recipes}
    renderItem={({ item }) => <RecipeCard recipe={item} />} 
    ListEmptyComponent={EmptyListComponent} 
/>
```

유형

- component: React 컴포넌트 클래스 또는 함수형 컴포넌트.
- element: React 요소 직접 사용.



주요 포인트:

- 스타일링: 앱 디자인에 맞게 빈 컴포넌트의 스타일을 적절히 지정하세요.
- 사용자 경험: 잘 디자인된 ListEmptyComponent는 맨 텅 빈 목록보다 훨씬 나은 경험을 제공할 수 있습니다.

# ListFooterComponent

React Native의 FlatList 안에서 ListFooterComponent를 살펴봅시다.



목적:

- ListFooterComponent 속성을 사용하면 FlatList의 가장 아래에 일반 리스트 항목들 다음에 렌더링되는 구성 요소나 요소를 추가할 수 있습니다.
- 일반적인 사용 사례:
   - 추가 데이터를 가져오기 위한 "더 보기" 버튼 표시
   - 데이터를 가져오는 동안 로딩 스피너 표시
   - 나열된 항목을 기반으로 요약 정보나 총계 제공
   - 광고를 위한 자리 표시

작동 방식:

- 배치: ListFooterComponent는 리스트의 절대적 끝에 일관되게 렌더링되며, 리스트가 화면 전체를 채우지 않더라도 렌더링됩니다.
- 렌더링: 리스트에 데이터가 있는지 여부와 상관없이 렌더링됩니다.
- 유연성: 다른 유사한 속성과 마찬가지로, 사용할 수 있는 옵션:
   - React 구성 요소: 복잡한 레이아웃이나 상호작용을 위한 사용자 지정 구성 요소
   - React 요소: 기본 디스플레이를 위한 `View`와 같은 간단한 요소



예시

```js
const FooterLoader = () => (
  <View style={styles.footer}>
    <ActivityIndicator size="small" color="gray" />
    <Text style={styles.footerText}>더 로딩 중...</Text>
  </View>
);

<FlatList
  data={recipes}
  renderItem={({ item }) => <RecipeCard recipe={item} />}
  ListFooterComponent={FooterLoader} 
/>
```

유형

- component: React 컴포넌트 클래스 또는 함수형 컴포넌트.
- element: React 요소 직접.



중요한 사항:

- 스크롤: ListFooterComponent를 보려면 사용자가 목록의 맨 아래로 스크롤해야 할 수도 있습니다.
- ListHeaderComponent: ListHeaderComponent라는 상대적인 요소가 있으며 비슷한 기능을 하지만 목록의 맨 위에 컴포넌트를 렌더링합니다.

# ListFooterComponentStyle

React Native의 FlatList에서 ListFooterComponentStyle에 대해 이야기해봅시다.



목적:

- ListFooterComponentStyle prop을 사용하면 ListFooterComponent를 포함하는 내부 뷰에 사용자 정의 스타일을 적용할 수 있습니다. 이를 통해 목록 내의 footer 영역의 모양과 레이아웃을 제어할 수 있습니다.

사용 방법:

- StyleSheet를 Import하세요:



```js
import { StyleSheet } from 'react-native';
```

2. 스타일 생성:

```js
const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: 'lightblue',
        padding: 20,
        alignItems: 'center' 
    }
});
```

3. FlatList에 적용하기:



```js
<FlatList
    // ... 다른 FlatList 속성들
    ListFooterComponent={footerComponent}
    ListFooterComponentStyle={styles.footerContainer}
/>
```

스타일링 제어:

- ListFooterComponentStyle 속성은 유효한 View 스타일 속성을 받습니다. 다음과 같이 사용자 정의할 수 있습니다:
- 레이아웃: flex, flexDirection, justifyContent, alignItems 등
- 배경: backgroundColor
- 크기: height, width, padding, margin
- 테두리: borderWidth, borderColor, borderRadius
- ... 그 외 등등!

중요한 고려 사항:



- 내부 뷰: ListFooterComponent를 보유하는 컨테이너를 스타일링하고 있습니다. 컴포넌트 자체를 스타일링하고 있지 않습니다.
- 컴포넌트 스타일링: 필요하다면 ListFooterComponent를 따로 스타일링하세요.

예시:

화면 하단에 고정된 푸터를 원한다면:

```js
ListFooterComponentStyle={ 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
}
```



팁

- 지금까지 보여준 대로 스타일 시트를 사용하여 구성된 스타일링을 하세요.
- 원하는 푸터 레이아웃과 외관을 얻기 위해 실험해보세요!
- ListFooterComponentStyle: ListFooterComponent를 보유하는 컨테이너에 스타일을 적용합니다.
- ListHeaderComponentStyle: ListHeaderComponent를 보유하는 컨테이너에 스타일을 적용합니다.
- columnWrapperStyle: numColumns를 사용하는 경우 다중 항목 행의 스타일을 사용자 정의합니다.

스타일링에 대한 중요한 참고 사항

- 이러한 props은 레이아웃, 테두리, 배경 등을 사용자 정의하기 위한 유효한 ViewStyle 속성을 수용합니다.
- 일반적으로 헤더, 푸터 및 항목 구성 요소를 내부 콘텐츠에 대해 별도로 스타일링할 것입니다.



기타 중요한 속성들

좀 더 복잡하거나 자주 사용되는 몇 가지 속성들을 알아보겠습니다:

- **extraData:**
  - 주요 데이터 속성 외부의 데이터가 변경될 때 FlatList(순수 컴포넌트)에게 다시 렌더링하도록 지시합니다.
  - 항목 자체가 아닌 다른 요소에 기반한 동적 업데이트에 유용합니다(예: 컴포넌트 내 선택된 상태 등).
- **getItemLayout:**
  - 최적화: 성능 향상을 위해 항목의 높이와 오프셋을 미리 계산하여 크기가 고정된 항목의 목록에 사용됩니다.
- **horizontal:**
  - 목록의 레이아웃을 가로 스크롤링으로 전환합니다.
- **initialNumToRender:**
  - 초기 경험을 더 부드럽게 하기 위해 처음에 렌더링할 항목 수를 지정합니다.
- **inverted:**
  - 목록의 방향을 반대로 바꿉니다.
- **keyExtractor:**
  - 항목에 대한 고유한 키를 제공하여 React의 렌더링 효율성을 유지합니다.
- **numColumns:**
  - 다중 열 그리드 레이아웃을 만듭니다.
- **onRefresh & refreshing:**
  - "당겨서 새로고침" 기능을 구현합니다.
- **onViewableItemsChanged:**
  - 항목 가시성이 변경될 때 트리거되는 콜백 함수(게으른 로딩과 같은 작업에 유용)입니다.
- **viewabilityConfig:**
  - onViewableItemsChanged 콜백이 트리거되는 조건을 세밀하게 조정합니다(가시성 임계값 등).

큰 목록을 최적화하기



### onViewableItemsChanged

**도전 과제:** FlatList를 사용하여 오래된 버전이나 성능이 떨어지는 장치에서 특히 많은 데이터 목록을 표시할 때 성능 문제를 겪을 수 있습니다. 한꺼번에 많은 항목을 렌더링하면 장치에 과부하가 걸려 스크롤이 느려지거나 프레임이 떨어질 수 있습니다.

**해결책:** React Native의 FlatList 컴포넌트는 이러한 성능 문제를 해결하기 위해 설계된 onViewableItemsChanged라는 강력한 속성을 제공합니다. 이는 목록 내 항목의 가시성이 변경될 때마다 호출되는 콜백 함수를 제공합니다. 이를 통해 다음과 같은 최적화를 전략적으로 구현할 수 있습니다:

- **지연 로딩:** 사용자가 목록 끝에 접근할 때만 추가 데이터를 가져와 렌더링합니다.
- **미디어 제어:** 비디오가 뷰포트를 벗어나거나 들어올 때 비디오를 일시 정지하거나 재생하여 자원을 절약합니다.
- **선택적 업데이트:** 현재 가시 상태인 항목에 따라 FlatList 바깥쪽의 UI 일부를 업데이트합니다.



`onViewableItemsChanged` Prop에 대해 설명드리겠습니다.

함수 서명:

```js
onViewableItemsChanged: ({ changed, viewableItems }) => void
```

- changed: ViewToken 객체의 배열입니다. 각 객체는 특정 항목의 가시성 변경을 설명합니다.
- viewableItems: 현재 뷰포트 내에서 실제로 보이는 항목을 나타내는 ViewToken 객체의 배열입니다.



ViewToken 구조:

- index: 데이터 배열 내 항목의 인덱스입니다.
- isViewable: 해당 항목이 보이는 영역 내에 있는 경우 true이고, 그렇지 않으면 false인 부울 값입니다.
- key: 항목에 제공한 고유한 키입니다.
- (기타 속성 가능): ViewToken은 viewabilityConfig에 기반한 추가 속성을 가질 수 있습니다.

키 구성 옵션 (viewabilityConfig)

- viewAreaCoveragePercentThreshold: 콜백을 트리거하기 위해 항목의 영역 중 얼마나 비춰져 있어야 하는지 결정하는 숫자 (예: 50).
- itemVisiblePercentThreshold: 화면에 표시되어야 하는 항목의 얼마나 많은 부분을 제어하는 숫자 (항목의 높이가 다른 목록에 유용).
- minimumViewTime: 항목이 "보이는" 것으로 간주되기 전에 보이는 지속 시간을 설정하는 밀리초 단위의 값입니다.
- waitForInteraction: true인 경우 사용자가 목록과 상호 작용한 후까지 가시성 업데이트를 지연시켜 빠른 스크롤 중에 성능을 향상시킵니다.



실용적인 예시: 무한 스크롤링

```js
const handleViewableItemsChanged = ({ viewableItems }) => {
  const isLastItemVisible = viewableItems[viewableItems.length - 1].isViewable;
  if (isLastItemVisible && !isLoading) {  
    loadMoreData(); 
  }
};

<FlatList
    data={data}
    onViewableItemsChanged={handleViewableItemsChanged}
    viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }} 
    // ... 다른 FlatList 속성들
/>
```

주의사항

- 트레이드오프(Trade-offs): onViewableItemsChanged 내부에 과도하게 복잡한 계산을 포함하는 것은 성능에 영향을 줄 수 있습니다. 콜백을 트리거하는 방법을 세밀하게 조정하기 위해 viewabilityConfig을 사용하세요.
- 실제 최적화 예시: 매우 복잡한 시나리오에서는 onViewableItemsChanged를 getItemLayout과 결합하여 아이템 크기를 사전 계산하여 더 부드러운 스크롤링을 구현할 수 있습니다.



## 스크롤 및 제어를 위한 주요 FlatList 메서드

메서드 설명

- flashScrollIndicators()
- 목적: 스크롤 표시기(스크롤바)를 잠시 표시하여 사용자에게 시각적 피드백을 제공합니다.
- 사용 사례: 목록 끝에 새 데이터를로드 한 후나 프로그래밍 방식으로 위치로 스크롤하는 경우에 사용합니다.
- 예시:

```js
myListRef.current.flashScrollIndicators();
```



- getNativeScrollRef()
  - 목적: 기본 네이티브 스크롤 컴포넌트(예: ScrollView 또는 VirtualizedList)에 대한 참조를 제공합니다.
  - 사용 사례: 절대적으로 필요한 경우에만 스크롤 컴포넌트의 하위 수준 사용자 정의를 위해 이에 액세스합니다. (대부분의 경우, 이는 필요하지 않을 것입니다).
- getScrollResponder()
  - 목적: 스크롤 상호작용을 관리하는 스크롤 응답자 객체에 대한 참조를 반환합니다.
  - 사용 사례: 스크롤 동작을 세밀하게 조정하거나 특정 스크롤 이벤트에 응답해야 하는 고급 시나리오에서 사용합니다.
- getScrollableNode()
  - 목적: 스크롤 가능한 컴포넌트 자체에 대한 참조를 제공합니다.
  - 사용 사례: 거의 필요하지 않습니다. 주로 스크롤 가능한 노드에서 직접 메서드를 호출해야 할 경우에 유용합니다.
- scrollToEnd(params?: ' animated?: boolean ')
  - 목적: 콘텐츠의 맨 끝(또는 목록이 수평인 경우 하단)으로 스크롤합니다.
  - 옵션:
    - animated (boolean, 기본: true): 스크롤을 애니메이션으로 제어할지 여부를 결정합니다.
  - 예시:

```js
const scrollToEnd = () => {
    flatListRef.current.scrollToEnd({ animated: true }); 
};
```

* **중요:** 큰 목록의 경우, 부드럽고 효율적인 스크롤링을 위해 `getItemLayout` 속성을 사용하는지 확인하십시오.

scrollToIndex(params: ' animated?: boolean; index: number; viewOffset?: number; viewPosition?: number; ')




- 목적: 데이터 배열 내에서 특정 항목의 인덱스(위치)로 스크롤합니다.
- 옵션:
  - animated (boolean, 기본값: true): 애니메이션을 컨트롤합니다.
  - index (number): 스크롤할 항목의 인덱스입니다.
  - viewOffset (number): 픽셀 단위의 추가 오프셋입니다.
  - viewPosition (number): 뷰포트 내 항목의 위치를 제어합니다 (0: 맨 위, 1: 맨 아래, 0.5: 중앙).
- 예시:

```js
const scrollToRecipe = (index) => {
  flatListRef.current.scrollToIndex({ index, viewPosition: 0 }); // 화면 맨 위에 있는 항목의 맨 위로 스크롤
};
```

- **강조:** 성능 개선을 위해 특정 항목으로 스크롤하는 우선적인 방법입니다.

scrollToItem(params: ' animated?: boolean; item: Item; viewPosition?: number; ')



- 목적: 데이터에서 아이템 객체를 제공하여 해당 항목으로 스크롤합니다.
- 단점: 특히 대규모 목록의 경우 scrollToIndex보다 효율성이 떨어질 수 있으며 데이터 배열을 검색해야 할 수도 있습니다.
- 참고: 가능하면 최상의 성능을 위해 scrollToIndex를 선택하십시오.

## 이론을 실제로 구현하기: React Native의 FlatList를 활용한 인터랙티브 레시피 앱 제작

FlatListDemonstration.jsx

```js
import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import recipesData from '../data/recipeData'; // 데이터가 올바르게 형식화되었는지 확인
import { useNavigation } from '@react-navigation/native';

const FlatListDemonstration = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState(recipesData);
  const [isFetching, setIsFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id) => {
    const newRecipes = recipes.map(recipe =>
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe,
    );
    setRecipes(newRecipes);
    navigation.navigate('Favorites', {
      recipes: newRecipes.filter(r => r.isFavorite),
    });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = text
      ? recipes.filter(recipe =>
          recipe.name.toLowerCase().includes(text.toLowerCase()),
        )
      : recipesData;
    setRecipes(filteredData);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="레시피 검색..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.actionArea}>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Text style={styles.favorite}>
                  {item.isFavorite ? '♥' : '☆'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RecipeDetails', { recipe: item })
                }>
                <Text style={styles.detailsButton}>세부 정보</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default FlatListDemonstration;
```



<img src="/assets/img/2024-05-12-OptimizeYourReactNativeListswithFlatListAPerformanceGuide_1.png" />

RecipeDetailsScreen.jsx

```js
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const RecipeDetailsScreen = ({route}) => {
  const {recipe} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <View style={styles.section}>
        <Text style={styles.header}>재료</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.text}>
            {ingredient.name}: {ingredient.quantity}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>조리 방법</Text>
        {recipe.instructions.map((step, index) => (
          <Text key={index} style={styles.text}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};
```

<img src="/assets/img/2024-05-12-OptimizeYourReactNativeListswithFlatListAPerformanceGuide_2.png" />



FavouriteList.jsx

```js
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
const FavoriteList = ({route}) => {
    const navigation = useNavigation();
    const {recipes} = route.params;
    const [favorites, setFavorites] = useState(recipes);

    return (
        <GestureHandlerRootView style={styles.rootView}>
            <View style={styles.container}>
                <DraggableFlatList
                    data={favorites}
                    renderItem={({item, drag, isActive}) => (
                        <TouchableOpacity
                            onLongPress={drag}
                            style={[styles.card, isActive && styles.activeCard]}
                        >
                            <Image
                                source={item.image}
                                style={styles.recipeImage}
                                accessibilityLabel={`Image of ${item.name}`}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.recipeTitle}>{item.name}</Text>
                                <Text style={styles.recipeDescription}>{item.description}</Text>
                                <TouchableOpacity  style={styles.detailsButton}  onPress={() =>
                                    navigation.navigate('RecipeDetails', {recipe: item})}
                                >
                                    <Text style={styles.detailsButtonText}>View Details</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                    onDragEnd={({data}) => setFavorites(data)}
                />
            </View>
        </GestureHandlerRootView>
    );
};
```

![Image 1](/assets/img/2024-05-12-OptimizeYourReactNativeListswithFlatListAPerformanceGuide_3.png)

![Image 2](/assets/img/2024-05-12-OptimizeYourReactNativeListswithFlatListAPerformanceGuide_4.png)




App.jsx

```js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlatListDemonstration from './src/components/flatlist';
import RecipeDetailsScreen from './src/screens/RecipeDetailsScreen';

import FavoriteList from './src/components/FavoriteList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={FlatListDemonstration} // 홈 화면에 FlatListDemonstration 사용
            options={{ title: 'Recipe List' }}
          />

          <Stack.Screen
            name="RecipeDetails"
            component={RecipeDetailsScreen}
            options={{ title: 'Recipe Details' }}
          />
          
          <Stack.Screen name="Favorites" component={FavoriteList} options={{ title: 'Favorite Recipes' }} />
      
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
```

컴포넌트와 역할:

- FlatListDemonstration: 레시피 목록을 렌더링하는 주요 컴포넌트입니다. 레시피 데이터, 사용자 상호작용(검색, 즐겨찾기), 다른 화면으로의 이동을 관리합니다.
- FavoriteList: DraggableFlatList 라이브러리를 사용하여 즐겨찾은 레시피 목록을 표시하는 컴포넌트로, 사용자가 순서를 변경할 수 있습니다.
- RecipeDetailsScreen: FlatList에서 항목을 탭하면 특정 레시피의 세부 정보를 표시하는 컴포넌트입니다.



FlatList와 관련된 주요 기능:

- 상태 관리 (useState):
  - 컴포넌트는 여러 상태 변수를 유지합니다:
    - recipes: 레시피 데이터 배열을 보유합니다.
    - isFetching: 데이터를 가져오는지 추적합니다 (풀 투 리프레시를 위한 가능성 있음).
    - refreshing: 데이터 가져오는 동안 시각적 리프레시 인디케이터를 제어합니다.
    - searchQuery: 사용자가 입력한 현재 검색어를 저장합니다.
  - toggleFavorite 함수는 사용자가 레시피 항목의 즐겨찾기 버튼을 탭할 때 트리거됩니다. 이 함수는 특정 레시피를 찾아 isFavorite 속성을 토글하고, 필요에 따라 즐겨찾기 화면으로 이동을 트리거합니다.
  - handleSearch 함수는 검색 바에서 사용자 입력에 따라 searchQuery 상태를 업데이트합니다. 그런 다음 검색어와 일치하는 레시피 데이터만 표시하기 위해 recipes 데이터를 필터링합니다.
- 검색 기능:
  - 검색 바를 사용하여 레시피 목록을 동적으로 필터링할 수 있습니다.
  - 사용자가 검색 바에 입력할 때 handleSearch 함수가 호출되어 searchQuery 상태를 업데이트합니다.
  - handleSearch 함수는 filter 메서드를 사용하여 recipes 데이터를 필터링합니다. 검색어의 소문자 버전을 포함하는 레시피 이름을 가진 레시피만 유지합니다.
  - 필터링된 데이터는 새로운 recipes 상태로 설정되어 FlatList가 업데이트된 목록으로 다시 렌더링됩니다.
- 내비게이션 (@react-navigation/native):
  - 이 예제는 화면 간 부드러운 내비게이션을 위해 @react-navigation/native를 사용합니다.
  - 레시피 항목을 누르면 toggleFavorite 함수가 호출되며, 레시피가 즐겨찾기 상태인 경우 즐겨찾기 화면으로 이동할 수 있습니다.
  - "자세히 보기" 버튼을 누르면 navigation.navigate(`RecipeDetails`, 'recipe: item')이 호출되어 선택한 레시피 데이터를 매개변수로 전달하여 RecipeDetailsScreen을 내비게이션 스택에 푸시합니다.
- 풀 투 리프레시 (RefreshControl):
  - 풀 투 리프레시 기능을 구현하기 위해 RefreshControl 컴포넌트를 사용합니다.
  - 사용자가 목록 상단에서 아래로 스와이프하면 onRefresh 함수가 호출됩니다.
  - 이 예제에서 onRefresh는 데이터 가져오기를 모방하기 위해 1.5초 지연을 시뮬레이션하고, 그 후 refreshing 상태를 업데이트하여 리프레시 인디케이터를 끕니다.
  - 실제 앱에서는 onRefresh가 아마도 API에서 새 데이터를 가져오고 recipes 상태를 그에 맞게 업데이트할 것입니다.

더 많은 정보를 보려면 공식 문서를 방문해주세요: https://reactnative.dev/docs/flatlist

이 글을 읽어주셔서 정말 감사합니다! 여러분의 지원과 관심이 저에게는 큰 힘이 됩니다. 유용하게 여기셨다면, 이를 즐길 수 있는 다른 사람들과 공유해보시기를 권장드립니다. 더 많은 통찰과 팁을 기대해주세요. 📚💖 우리 커뮤니티의 멋진 일원이 되어 주셔서 다시 한번 감사드립니다! 🌟



# 스택데믹 🎓

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가를 응원하고 팔로우해 주세요! 👏
- 저희를 팔로우하세요 X | LinkedIn | YouTube | Discord
- 다른 플랫폼들도 방문해 주세요: In Plain English | CoFeed | Venture | Cubed
- 스택데믹닷컴에서 더 많은 콘텐츠를 만나보세요