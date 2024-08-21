---
title: "React Native 페이지 최적화 방법 정리(2024년 최신)"
description: ""
coverImage: "/assets/img/2024-05-17-OptimizingaHeavyReactNativePageAGradualRewriteJourney_0.png"
date: 2024-05-17 20:52
ogImage:
  url: /assets/img/2024-05-17-OptimizingaHeavyReactNativePageAGradualRewriteJourney_0.png
tag: Tech
originalTitle: "Optimizing a Heavy React Native Page: A Gradual Rewrite Journey"
link: "https://medium.com/@ronitbhatia98/optimizing-a-heavy-react-native-page-a-gradual-rewrite-journey-c843c020dca9"
isUpdated: true
---

리액트는 쉽게 시작할 수 있는 프레임워크이지만 규모 확장에는 어렵습니다. 어플리케이션이 커지면 잘못된 상태 업데이트, 뒤얽힌 렌더 로직, 비효율적인 이벤트 핸들러 생성, 비효율적인 라이브러리 사용, 그리고 불필요한 useEffect가 매우 쉽게 발생하고 어플리케이션의 렌더 성능에 심각한 영향을 미칠 수 있습니다. 이 느려짐은 React Native 어플리케이션에서 특히 더 눈에 띄며, 여기서 모든 렌더링이 강력한 웹 서버에 의해 수행되지 않기 때문입니다. 저는 현재 진행 중인 피트니스 어플리케이션의 프로필 페이지를 작성하면서 이 현상을 다시 한번 깨닫게 되었습니다.

이 기사는 원래 2년 전에 작성한 프로필 페이지를 점진적으로 다시 작성하는 과정을 요약할 것입니다. 프로필 페이지로 네비게이션하면 Google Pixel 7에서 프레임이 20-40 FPS로 떨어지는 현상이 있었습니다. 최적화 이후, 어플리케이션은 86 FPS의 프레임율을 유지할 수 있었습니다. 최적화 이후 90 FPS에서 4 FPS가 떨어진 것은 사용 중인 React Navigation 1.0 라이브러리가 최적이 아니었기 때문에 불가피했습니다. 제 어플리케이션의 이 라이브러리 업그레이드는 진행 중이며, 라이브러리 업그레이드 후의 성능 향상에 대해 향후 기사에서 보고하겠습니다.

끝까지 긴 여행이니 그에 맞게 준비하세요! 그러나 궁금해 하지 않으시면, 깊이 파고들기 전에 미리 작성해 둔 주요 내용을 읽어보실 수 있습니다. 또한, 본 기사는 React, React Native, 그리고 React Native Animations의 기본을 알고 있다고 가정합니다. 그럼, 더 이상 미루지 말고 출발해봅시다!

# 주요 내용

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

- React 개발자로 활동하면 React Native 앱 개발에 대한 우위를 가질 수 있어요. 하지만 효율적인 React Native 앱을 만들기 위해 따르아야 할 특정한 디자인 가이드라인이 있어요. 예를 들어,
  a. 좋은 예전 map 함수 대신 컴포넌트 목록을 렌더링하기 위해 FlatLists를 사용합니다.
  b. 제스처를 처리하기 위해 제스처 핸들러를 최대한 활용합니다 — 모바일 앱 개발은 클릭보다는 제스처에 집중되어 있어요.
  c. 컴포넌트를 애니메이션화하기 위해 Reanimated 라이브러리를 효율적으로 활용합니다. 다시 말해, 웹과는 다르게, 애니메이션은 앱 UX에서 더 중요한 역할을 합니다.
  d. 긴 목록의 컴포넌트를 렌더링하기 위해 항상 FlatLists를 사용합니다. 각 컴포넌트 내부의 비즈니스 로직을 최소화해야 합니다.
- 목록을 어떻게 렌더링하든지간에, React는 목록의 모든 컴포넌트가 렌더링된 후에만 결과를 화면에 그립니다. 따라서, FlatLists를 사용하더라도 각 컴포넌트의 렌더링 시간을 최적화해야 합니다. 과도한 렌더링 로직은 막대한 화면 드랍을 초래할 수 있습니다.
- 각 컴포넌트 내부에 무거운 렌더링 로직을 사용하는 것이 불가피할 경우, 렌더링 로직 실행을 디바운스하여 목록의 빠른 초기 로드를 보장할 수 있습니다. 제 경우, 각 목록 컴포넌트에 부담이 되는 MapView를 렌더링해야 했기 때문에 화면 드랍이 발생했어요. 해결책은 MapView를 렌더링하기 전에 의도적으로 1초의 지연을 도입하는 것이었어요. 이로써 화면 드랍 없이 초기 렌더링 시간이 빨라지게 되었고, Map은 초기 로드 후 1초 후에 렌더링되었습니다. 디바운스 중일 때 가벼운 로더를 표시해야 합니다. 사용자는 디바운스된 논리 실행 후 레이아웃 점프를 보게 되면 안 됩니다.
- 앱 전체에서 재사용될 이미지를 미리 가져올 수 있어요. 이는 expo-image나 react-native-fast-image와 같은 라이브러리를 사용하여 수행할 수 있습니다.
- 특히 목록 내부에 있는 컴포넌트를 메모라이즈해야 합니다.
  initialNumToRender 속성을 사용 중이라면, FlatList는 초기 목록 컴포넌트가 렌더링된 후에 정의된 창 크기까지 전체 목록을 다시 렌더링합니다.
  예: 만약 initialNumToRender가 3이고 창 크기가 10이라면, FlatList는 다음과 같이 동작할 것입니다:
  a. 처음 3개의 목록 항목을 초기로드합니다.
  b. 완료되었을 때, 첫 10개 항목을 렌더링합니다. 이미 로드된 처음 3개 항목을 다시 렌더링합니다.
- React 상태와 Reanimated 공유 값이 혼합되지 않도록 주의해야 합니다. React 상태는 JS 스레드에서 유지되고, Reanimated 공유 값은 UI 스레드에서 유지됩니다. 항상 기억해야 할 사항은:
  a. React 상태를 수정하는 것은 비용이 많이 들지만, 공유 값의 수정은 그렇지 않습니다.
  b. 공유 값 수정은 컴포넌트를 다시 렌더링하지 않습니다. 따라서 Reanimated 값 변경 시 자동으로 업데이트되지 않는다고 하더라도, Reanimated 래퍼 내에 있지 않는 React JS 변수는 컴포넌트가 업데이트되지 않습니다.
- 마지막으로, React 상태 업데이트는 매우 비용이 많이 들 수 있음을 인지해야 합니다. Memoization은 이러한 문제를 해결하는 데 매우 유용합니다. 예를 들어, 부모에 상태 변수가 포함된 경우, 모든 자식이 부모 상태 변경 시 다시 렌더링됩니다. 이는 단순 컴포넌트에는 해로울 수 있지만, 무거운 자식 컴포넌트의 다시 렌더링은 화면 드랍을 유발할 수 있습니다. 메모라이제이션은 종속 프로퍼티 변경 시에만 다시 렌더링되도록 보정합니다.

이론적인 내용이 도움이 되었기를 바라며, 지금은 비성능 페이지 수정의 풍요로운 여정을 떠나봅시다.

# 프로필 페이지에 관한 내용과 마주한 문제들

## 기능성 및 초기 컴포넌트 구조

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

![Component Structure](/assets/img/2024-05-17-OptimizingaHeavyReactNativePageAGradualRewriteJourney_0.png)

프로필 페이지의 초기 구성은 위 이미지에 요약되어 있습니다. PersonalProfile은 이 페이지의 "화면"인 최상위 구성 요소입니다. PersonalProfile을 통해 다음 정보가 표시됩니다.

- ProfileSummary 구성 요소는 다음을 표시합니다:
  a. 프로필 사진 (Avatar라고 불리는 구성 요소를 통해)
  b. 사용자의 이름
  c. 사용자의 운동 횟수, 팔로워 수 및 사용자가 팔로우하는 사람 수

- ProfileTabs 구성 요소에는 사용자가 최근에 완료한 운동 및 해당 사용자가 편성한 훈련 계획을 표시하는 두 개의 탭이 포함되어 있습니다.

- WorkoutSnippet 구성 요소를 통해 각 운동이 요약됩니다. WorkoutSnippet은 운동 제목 ("Saturday Night Run"이 화면 샷에 표시됨), 캡션 ("A good run"이 화면 샷에 표시됨), 운동 경로를 나타내는 MapView, 운동 통계 및 운동과 상호 작용하는 몇 가지 제어가 표시됩니다.

구성 요소 구조는 다음과 같이 요약될 수 있습니다:

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
<PersonalProfile>
  <ProfileSummary />
  <ProfileTabs>{...(<WorkoutSnippet />)}</ProfileTabs>
</PersonalProfile>
```

Initial analysis 후 많은 개선점을 발견했지만, 페이지 성능을 저해하는 주요 원인은 운동 스니펫 목록이었다고 결론지었습니다. 각 스니펫에는 비싼 MapView가 있었고, 잘못된 위치에 상태 업데이트가 발생하여 긴 목록이 다시 처음부터 렌더링되었습니다. 사용자가 페이지를 보기 전까지 React가 가상 DOM에서 전체 목록을 렌더링할 때 크게 프레임 속도가 떨어졌습니다.

## 사용자 메타데이터 가져오기

- 사용자 정보는 앱의 로컬 스토리지에 캐시되어 있어 같은 세션에서는 메타데이터를 다시 가져 오지 않습니다. 사용자가 프로필 페이지를 수동으로 새로 고치지 않는 한 (Instagram처럼 아래로 끌어 다시 가져오는 것),
- 백엔드 통신은 GraphQL을 기반으로 하며, PersonalProfile 구성 요소는 Apollo의 useQuery 훅을 사용하여 메타데이터를 가져옵니다. 성공적인 검색을 통해 저장된 사용자 데이터를 업데이트해야 하므로 가져온 데이터에 대한 useEffect가 구현됩니다. 훅 값이 변경 될 때 캐시를 업데이트 합니다.

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
// 인증 컨텍스트를 사용하여 캐시 스토리지와 상호 작용합니다.
const { secureUser, setUserData } =
    useContext<AuthContextEntity>(AuthContext);

// 팔로워 및 팔로잉 수를 가져오기 위한 쿼리
const {
  data: followCount,
  loading: followCountLoading,
  error: followCountError,
} = useQuery<{ userById: Partial<User> }>(userQueries.followCount, {
  variables: { id: secureUser._id },
});

// 운동 수를 가져오기 위한 쿼리
const {
  data: workoutCount,
  loading: workoutCountLoading,
  error: workoutCountError,
} = useQuery<{ getActivityCount: number }>(
  recentActivityQueries.activityCount,
  {
    variables: { userId: secureUser._id },
  }
);

const updateUserInCache = () => {
  setUserData({
    ...secureUser,
    followCount: followCount.followCount,
    followerCount: followCount.followerCount,
    workoutCount,
  });
};

// 운동 수 검색 후 캐시에 사용자 업데이트
useEffect(() => {
  updateUserInCache();
}, [workoutCount]);

// 팔로워-팔로잉 수 검색 후 캐시에 사용자 업데이트
useEffect(() => {
  updateUserInCache();
}, [followCount]);
```

문제:
이 메타데이터 가져오기는 Apollo 클라이언트 라이브러리에서 제공하는 훅에 의해 초기 렌더링 후에 발생합니다. 이 요청은 React 컨텍스트를 업데이트하므로 컨텍스트 업데이트는 루트 컴포넌트인 PersonalProfile을 다시 렌더링하게 만듭니다. 부모 컴포넌트의 다시 렌더링은 모든 하위 컴포넌트를 다시 렌더링하게 만듭니다.
초기 로드 중 프레임 드롭의 원인은 아니지만, 이는 후속 렌더링 시간을 늘리는 원인이 되었습니다.
해결책:
모든 하위 컴포넌트의 메모이제이션.

## 초기 코드- 탭 렌더링

초기 설계에서 탭 관리 책임을 ProfileTabs 컴포넌트에 통합했습니다.
다음과 같은 내용을 포함했습니다:

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

- 상단에 두 개의 탭이 있습니다 — 운동 및 훈련 계획.
- 프로필 Body. 이 안에 있는 내용은 탭에 의해 관리되는 상태에 따라 다릅니다.

두 탭 중 하나를 클릭하면 React 상태가 업데이트되어 Body가 다시 렌더링됩니다.
이는 UX를 떨어뜨렸을 뿐만 아니라 두 탭 사이를 스와이프할 수 없고, 그냥 하나의 탭을 클릭해야 했으며, 본문에 포함된 전체 목록이 언마운트되어 다시 처음부터 마운트되고 활성 탭이 다시 전환되면 자신도 다시 렌더링되었습니다 — 가시적인 스터터가 발생했습니다.

```js
const [activeTab, setActiveTab] = useState(0);
const handleTabPress = (index: number) => {
  setActiveTab(index);
};
const renderTabs = () => {
  return (
    <>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <Touchable {...tabProps}>{tab.icon}</Touchable>
        ))}
      </View>
      <View style={styles.tabBottomContainer}>
        <TabIndicator
          activeIndex={activeTab}
          width={styles.tabBottom.width}
          height={styles.tabBottom.height}
          backgroundColor={styles.tabBottom.backgroundColor}
          totalTabs={TAB_ARR_LENGTH}
        />
      </View>
      {activeTab === 0 ? renderWorkouts() : renderTrainingPlans()}
    </>
  );
};
```

## 초기 코드 — 운동 목록 렌더링

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

프레임 드랍의 뿌리는 비효율적으로 렌더링되는 고가의 구성 요소 목록입니다.

```js
<View style={styles.body}>
  {recentWorkouts.map((workout, index) => (
    <WorkoutSnippet workout={workout} key={workout.endTime} {...props} />
  ))}
</View>
```

알 수 있듯이 FlatList를 사용하지 않았으며 각 구성 요소가 비싼 MapView를 렌더링했습니다. 최적화 없이 초기에 6개의 WorkoutSnippet 및 따라서 한꺼번에 6개의 MapView가 렌더링되어 React가 거대한 프레임 드롭이 발생했습니다.
동시에 프로필 페이지는 다음과 같은 문제를 마주해 큰 프레임 속도가 감소하게 되었습니다:

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

- 운동 목록의 초기 렌더링이 느립니다.
- 사용자 정보를 업데이트하는 후크가 전체 페이지를 다시 렌더링하므로 이후에 발생하는 지연이 증가합니다.
- 탭을 전환하면 본문이 다시 렌더링되어 지연을 야기합니다.

아래 문제를 확인할 수 있습니다:

![문제1](https://miro.medium.com/v2/resize:fit:932/1*zkDh8rVTwp3JcXvIGI_3gA.gif)

![문제2](https://miro.medium.com/v2/resize:fit:632/1*zkEbgEryLuesOPbJHBejRw.gif)

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

## 프로파일러의 단점 관찰

프로파일러를 읽는 방법을 모르겠다면, 이 기사를 읽기를 권장합니다. 프로파일러 데이터를 읽고 해석하는 것이 문제를 이해하고 이를 최적화하는 데 많은 역할을 했습니다.
플레임 그래프는 가장 부담스러운 구성 요소를 확인하는 데 사용되었습니다. 이것이 어떻게해서 MapViews가 지연의 근본 원인인지 알아낼 수 있었던 이유입니다. 플레임 그래프는 또한 모든 연이은 렌더링을 나열하고 어떤 구성 요소가 다시 렌더링되었는지 강조합니다. 이것이 부담스러운 구성 요소의 불필요한 재렌더링을 알아낼 수 있는 방법이었습니다.

프로파일러의 플레임 그래프를 읽은 결과는 다음과 같습니다:

- 프로파일 화면의 초기 렌더링에는 list가 135ms 소요되어 총 200ms가 걸렸습니다.
- 사용자 메타데이터를 가져오면 앞서 설명한대로 콘텍스트 개체가 업데이트되어 전체 화면이 다시 렌더링됩니다. 이 재렌더링은 122ms가 걸렸습니다.
- 탭을 탐색하면 상태가 업데이트되어 탭 및 본문 전체가 다시 렌더링되며 렌더링 시간은 190ms였습니다.

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

안녕하세요!

# 최적화

## ScrollView를 FlatList로 대체하기

FlatList는 React Native에서 제공하는 가상 리스트로, 대규모 리스트의 성능을 향상시키고 메모리 소비를 줄입니다. 이는 활성 항목들의 유한한 렌더 창을 유지함으로써 달성됩니다. 이 렌더 창 밖에 있는 항목들은 공백 뷰로 대체되어 전체 리스트의 성능을 향상시킵니다. 렌더 성능을 최적화하기 위해 여러 프롭스가 제공되며, 개발자는 렌더 창을 미세 조정할 수 있습니다. 리스트의 초기 렌더링에 문제가 있었기 때문에 initialNumToRender 프롭이 관련이 있습니다.

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

따라서 ScrollView 안에있던 맵을 FlatList로 전환하여 운동 목록을 렌더링했습니다:

```js
const renderItem: ListRenderItem<Workout> = useCallback((workout: ListRenderItemInfo<Workout>) => {
  return <WorkoutSnippet workout={workout.item} {...otherProps} />;
}, []);
return (
  <FlatList
    data={workouts}
    renderItem={renderItem}
    keyExtractor={(item) => item._id}
    initialNumToRender={3}
    {...otherProps}
  />
);
```

아래에 몇 가지 주요 관찰 사항이 나와 있어요. 주의 깊게 읽어 주세요:

- initialNumToRender 속성을 3으로 설정하여 가상 목록이 초기 렌더링 시 처음 3개 요소만 렌더링되도록 했어요.
  그러나 초기 렌더링이 완료되면, 가상 목록이 창 크기 내의 모든 항목을 렌더링합니다 (기본적으로 10 뷰포트 단위에 해당하는).
  재랜더링 시 초기에 렌더링된 구성 요소를 무시하지 않아요. 창 크기 내 목록의 모든 항목이 다시 렌더링됩니다.
  예: 창 크기 내에 10개 항목이 있고, 초기 렌더링할 항목 수가 3개이면 목록은 다음과 같이 되겠죠:
  i. 초기 렌더링 시 3개 항목을 렌더링합니다.
  ii. 다음 렌더링 시 (이미 렌더링된 초기 항목 포함) 모든 10개 항목을 렌더링합니다.
  따라서, 가상 목록에서 재랜더링을 방지하기 위해 렌더링되는 구성 요소를 메모이즈하는 것이 중요합니다.
  목록에서 렌더링되는 구성 요소를 메모이즈하면 초기 항목이 다시 불필요하게 렌더링되는 것을 방지할 수 있어요.
- renderItem 속성에 전달된 함수는 FlatList의 렌더링 로직을 정의합니다.
  이것을 참조로 전달하고, useCallback 훅 내부에 래핑되었는지 확인하는 것이 중요합니다.
  이를 하지 않으면 FlatList 부모의 재랜더링마다 함수가 재정의되어 목록의 중복 재랜더링을 일으킬 수 있어요. 그것은 매우 비용이 많이들 수 있어요.

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

이 최적화를 고려한 후에 성능을 확인해봅시다:

![GIF](https://miro.medium.com/v2/resize:fit:1224/1*eMhn-98QVNHKvJh4T-ILnQ.gif)

관찰할 수 있듯이, 여전히 일시적인 끊김이 있습니다! 3개의 컴포넌트를 동시에 렌더링해도, MapView는 여전히 핸드폰이 작은 시간프레임 내에서 렌더링하기에 너무 많은 부하를 줍니다.

## MapViews의 지연 로딩

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

해결책은 MapViews를 Lazy Load하는 것이었습니다. 이 방법은 다음과 같이 작동했습니다:

- 각 목록 항목에 고정 높이 MapView가 있습니다.
- MapView의 로딩을 일부러 1초 지연합니다.
- 해당 시간까지 MapView 자리에 스켈레톤 로더를 표시합니다.

마운트 시에 useEffect 내에서 timeout을 놓는 것으로 구현하였습니다.
리스트 컴포넌트 내에 상태를 배치합니다:

```js
const [mapLoaded, setMapLoaded] = useState(false);
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

리스트 컴포넌트 내에 useEffect를 정의하세요:

```js
useEffect(() => {
  setTimeout(() => {
    setMapLoaded(true);
  }, 1000);
}, []);
```

MapView 렌더링 로직:

```js
if (!mapLoaded) {
  return <ActivityIndicator />;
}
return <MapView {...props} />;
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

최종 최적화:

지도를 이렇게 로드하는 것은 mapLoaded = false에서 mapLoaded = true로 상태가 업데이트되는 동안 UI를 차단합니다. 예를 들어, 이 상태가 업데이트되는 동안 탭을 전환하려고 하면 지연이 발생할 수 있습니다. 여기서 React의 새로운 비동기 아키텍처가 문제를 해결해 줍니다 - useTransition 훅을 사용하여 비동기 상태 업데이트를 실행함으로써 차단된 UI 요소는 더 이상 문제가 되지 않습니다. 더 자세한 내용은 여기를 참조하세요.
따라서 우리는 이 상태 업데이트를 전환 내부로 감싸줍니다:

```js
useEffect(() => {
  setTimeout(() => {
    startTransition(() => {
      setMapLoaded(true);
    });
  }, 1000);
}, []);
```

마지막으로, 여기가 결과입니다:

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

![image](https://miro.medium.com/v2/resize:fit:808/1*lXJIEkRu_pn9vl7VH5loag.gif)

The drop during mount is now down to 82 FPS from a previously unreliable 20–40 FPS! There is an inevitable drop when the MapViews load in eventually after 1 second, but the UI remains responsive throughout!

As for the profiler results, the render time of the screen dropped to 120ms, with the list itself taking 90ms.
That’s an improvement by a third of the original render time!

## Fixing Tab Switching Logic — Making the Tabs Swipe-able

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

이전에는 탭을 클릭할 수만 있고 스와이프할 수는 없었습니다. 탭을 전환할 때마다 본문이 다시 렌더링되어 부드럽지 않은 화면 전환이 발생했죠. 이 문제를 해결하기 위해 본문을 수평으로 렌더링하는 FlatList로 변경할 것입니다. 이렇게하면 재렌더링으로 인한 문제 해결뿐 아니라 (FlatList는 상태에 관계없이 두 번째 탭을 게으르게 렌더링합니다), 사용자 경험을 더 좋게 만들어 프로필 페이지를 더 쉽게 탐색할 수 있습니다.

참고: 이 하위 섹션은 최적화보다는 UI 디자인 구현에 가깝습니다. 이 섹션은 읽지 않고 결과만 보셔도 됩니다.

다음은 새로운 레이아웃입니다:

![이미지](/assets/img/2024-05-17-OptimizingaHeavyReactNativePageAGradualRewriteJourney_1.png)

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

최종 결과물:

<img src="https://miro.medium.com/v2/resize:fit:504/1*Drzw-Y4UMkDy09OwlS2v2Q.gif" />

정말 부드러운 모션인데요!

사용자가 수평으로 스와이프할 때 무슨 일이 벌어지는지 자세히 살펴봅시다:

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

- 사용자가 탭의 너비의 약 50%로 스크롤 할 때 활성 탭 아이콘이 "점등"합니다.
- 활성 탭을 나타내는 하얀색 하단 테두리가 사용자의 수평 스크롤에 따라 이동합니다.

![이미지](https://miro.medium.com/v2/resize:fit:712/1*bfGvqGl9Z1vbTZ9QQgHUHw.gif)

3. 탭을 클릭하면 본문이 100% 스크롤되어 다음 요소로 이동합니다. 탭 표시기도 함께 이동합니다.

![이미지](https://miro.medium.com/v2/resize:fit:956/1*kXqvHtGO3Avsa_jBwGsgjA.gif)

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

## 고정 탭 구현하기

이것은 매우 간단합니다. React Native의 FlatList 컴포넌트가 제공하는 stickyHeaderIndices 속성은 수직 목록에서 작동하며 지정된 인덱스의 구성요소를 스크롤할 때 상단에 고정시킵니다. 다음은 프로필 화면 내에 정의된 최상위 FlatList의 코드입니다:

```js
const flatListData = useMemo(
  () => [renderProfileSummary, renderTabs, renderBody],
  [renderProfileSummary, renderTabs, renderBody]
);
const renderItem: ListRenderItem<() => JSX.Element> = useCallback((item) => item.item(), []);
const stickyIndices = useMemo(() => [1], []);

<FlatList data={flatListData} renderItem={renderItem} stickyHeaderIndices={stickyIndices} {...otherProps} />;
```

FlatList로 전달된 모든 데이터가 메모화된 것에 주목하세요. 이는 프로필 화면의 재렌더링 시 props의 재정의를 방지해야 하기 때문입니다 (React는 객체에 대한 참조 무결성을 확인합니다. 객체를 메모화하면 렌더링 간 참조 무결성을 유지하는 데 도움이 됩니다). 기억하세요 - props의 변경은 전체 목록을 다시 렌더링하게 만들며, 우리는 그것을 방지하려고 합니다.

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

- ProfileSummary(프로필 요약 렌더링), Tabs(탭 렌더링), 및 body(본문 렌더링) 함수들은 데이터로 FlatList에 전달됩니다. renderItem 함수는 이러한 함수들을 간단히 실행합니다.
- stickyHeaderIndices가 [1]로 정의되어 있습니다. 이는 우리가 탭들(데이터 배열의 첫 번째 위치에 정의된)을 스크롤하여 지나갈 때에 고정시킵니다.

## 동적으로 하단 테두리 효과 구현하기

이 부분은 다소 까다로운 부분입니다. 이 효과를 달성하기 위해 Reanimated 라이브러리의 공유 값(shared values)을 활용했습니다. 만약 이 라이브러리에 익숙하지 않다면, 그 뛰어난 문서를 읽어보는 것을 권합니다.

한 발 물러서서, 가로 스크롤 뷰에 대해 다음을 관찰합니다:

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

- 각 탭은 화면 너비와 같은 너비를 갖습니다 (100vw).
- 따라서, 수평 스크롤 뷰의 총 너비는 nTabs _ 100vw 입니다. 이것은 우리의 공유 값의 범위가 됩니다:
  [스크롤 없음, 모든 탭 스크롤됨] = [0, nTabs _ 100vw]
  다시 말해, 애니메이션 값은 사용자가 수평으로 스크롤한 픽셀량을 단순히 추적할 것입니다.

수평 FlatList가 스크롤되면, 이 애니메이션의 값을 조정하여 단순히 사용자가 스크롤한 현재 오프셋 (픽셀 수)이어야 합니다. FlatList의 onScroll 프로퍼티를 사용하면 아주 쉽게 이를 달성할 수 있습니다:

```js
const onBodyScroll = useCallback(
  (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { x } = contentOffset;
    swipeAnimationValue.value = x;
  },
  [swipeAnimationValue]
);
```

마지막으로, 탭 인디케이터의 스타일을 다음과 같이 설정하겠습니다:

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
const indicatorStyle = useAnimatedStyle(() => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: vw(100 / nTabs),
  transform: [
    {
      translateX: interpolate(animatedValue.value, [0, nTabs * vw(100)], [0, nTabs * vw(100 / nTabs)]),
    },
  ],
}));
```

interpolare 함수는 애니메이션 값과 스타일 속성 값의 매핑을 담당합니다.

- 인디케이터의 너비는 100 % / nTabs (우리 예에서 50vw)와 같아야 합니다.
- 인디케이터는 왼쪽 하단에 절대 위치로 배치됩니다.
- 스크롤이 없는 경우에는 어떤 이동도 필요하지 않습니다. 목록이 완전히 스크롤되었을 때 (마지막 요소조차 완전히 스크롤된 경우), 인디케이터는 nTabs \* vw(100 / nTabs)만큼 이동해야 합니다.
  Reanimated 라이브러리가 이들 극단값 사이의 중간 값들을 처리해줄 것입니다.

아래에 시각화가 제공되었습니다:

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

![image](/assets/img/2024-05-17-OptimizingaHeavyReactNativePageAGradualRewriteJourney_2.png)

This wraps up our translation effect!

## Achieving Dynamic Tab Icon Color

Observe carefully when the color of the tab icon changes:

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

![이미지](https://miro.medium.com/v2/resize:fit:1100/1*S9kq4JSTm65UgmYbbv_Cpg.gif)

사용자가 탭 본문의 50% 이상으로 스크롤했을 때 탭 색상이 변경됩니다. 새로운 색상으로 유지되는 기간은 얼마인가요? 사용자가 탭 본문의 50% 이상 스크롤하지 않는 한 계속해서 색상이 유지됩니다.
우리의 animatedValue가 저장하고 있는 것을 기억하세요: 그렇습니다, 수평 FlatList의 스크롤 오프셋을 저장하고 있습니다!
우리는 Reanimated 라이브러리에서 제공되는 interpolateColor 함수를 사용하여 탭의 색상을 보간할 수 있습니다!
스크롤 오프셋을 탭 아이콘의 색상으로 매핑하는 보간 함수를 구성해야 합니다.

각 탭에는 인덱스가 있습니다. 여기서 두 탭의 인덱스는 각각 0과 1입니다.

여기 우리의 수평 탭 본문 목록이 펼쳐진 모습입니다.

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

<img src="/assets/img/2024-05-17-OptimizingaHeavyReactNativePageAGradualRewriteJourney_3.png" />

그러므로, animatedValue의 최대 가능한 값은 얼마라고 생각하시나요?
200vw를 추측했다면, 정답입니다. 이는 사용자가 두 번째 탭 (Tab 1)을 넘어간 경우, 즉 뷰포트에 탭이 전혀 표시되지 않는 경우입니다.
여기에 마지막으로, 각 탭이 시작하는 오프셋을 기록합니다:

- Tab 0는 오프셋 0에서 시작합니다.
- Tab 1은 Tab 0 이후 100vw에서 시작합니다.

여기 사용자가 초기에 화면에서 볼 수 있는 것입니다:

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

<img src="/assets/img/2024-05-17-OptimizingaHeavyReactNativePageAGradualRewriteJourney_4.png" />

여기서,

- 스크롤 오프셋은 0입니다 (스크롤이 발생하지 않았으므로, animatedValue는 0입니다.)
- 탭 0은 활성화된 색 (흰색)을 가지고 있고, 탭 1은 비활성화된 색 (회색)을 가지고 있습니다.

자, 이제 활성 탭이 변경될 때 스크롤의 정확한 상태를 확인해 봅시다:

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

<img src="/assets/img/2024-05-17-OptimizingaHeavyReactNativePageAGradualRewriteJourney_5.png" />

여기서,

- 스크롤 오프셋은 50vw입니다(탭의 반쪽이 사용자에 의해 스크롤되어 지나갔기 때문에), 그래서 우리의 애니메이션 값은 50vw입니다.
- 탭 0은 비활성화되었고(회색), 탭 1은 활성화되었습니다(흰색).

이전에 언급한 것처럼, 탭 0의 스크롤 오프셋은 0에서 시작하고, 탭 1의 스크롤 오프셋은 100vw에서 시작합니다. 추론하면, 삽입된 탭 2는 200vw에서 시작할 것이며, 이와 같은 식으로 계속됩니다.

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

애니메이션을 완성하려면 이 최종 질문에 답해야 합니다:

답변:
사용자가 (i — 0.5) _ x로 스크롤할 때(시작 오프셋 — 탭 너비의 50%라면) 탭을 활성화합니다.
사용자가 (i + 0.5) _ x로 스크롤할 때(시작 오프셋 + 탭 너비의 50%라면) 탭을 비활성화합니다.
우리 예시에서 이를 설명하면,

- 탭 0은 현재 스크롤 오프셋이 (0–0.5) _ 100vw와 (0+0.5) _ 100vw, 즉 -50vw와 50vw 사이일 때 활성화됩니다.
- 탭 1은 현재 스크롤 오프셋이 (1 - 0.5) _ 100vw와 (1 + 0.5) _ 100vw, 즉 50vw와 150vw 사이일 때 활성화됩니다.

마침내 보간된 아이콘 스타일이 준비되었습니다:

```js
const iconStyle = useAnimatedStyle(() => ({
  color: interpolateColor(
    animatedValue.value,
    [(idx - 0.5) * animOffset - 1, (idx - 0.5) * animOffset, (idx + 0.5) * animOffset, (idx + 0.5) * animOffset + 1],
    [inactiveTabColor, activeTabColor, activeTabColor, inactiveTabColor]
  ),
}));
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

만개의 프롭 객체가 전부 useMemo를 사용해 메모이제이션했고, 화면의 모든 자식 컴포넌트를 React.memo를 사용해 메모이즈드 컴포넌트로 만들었어요.

## 최적의 라이브러리 사용과 아이콘 폰트 미리 불러오기

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

이미지 및 글꼴을 렌더링할 때 추가 밀리초를 저장하기 위한 마지막 단계였습니다. React Native 문서 자체에서는 기본 `Image /` 컴포넌트 대신 전용 이미지 라이브러리를 사용하는 것을 제안합니다. expo-image 라이브러리는 잘 유지되며 이미지를 캐시하는 옵션을 제공합니다.

정적 데이터를 가져오는 최적화를 위해 앱을 로드할 때 모든 아이콘 및 텍스트 글꼴을 미리 가져오기 위해 expo-font 패키지를 사용했습니다:

```js
const [fontsLoaded] = useFonts({
  // 텍스트 글꼴
  Oswald: require("fitnet/assets/textFonts/Oswald.ttf"),
  Raleway: require("./src/assets/textFonts/Raleway.ttf"),
  "Raleway-Bold": require("./src/assets/textFonts/Raleway-Bold.ttf"),
  // 아이콘 글꼴
  NavBarIcons: require("fitnet/assets/iconFonts/NavBarIcons.ttf"),
  HomeIcons: require("fitnet/assets/iconFonts/HomeIcons.ttf"),
  ...AntDesign.font,
  ...createIconSetFromIcoMoon.font,
  ...EvilIcons.font,
  ...FontAwesome.font,
  ...FontAwesome5.font,
  ...MaterialCommunityIcons.font,
  ...MaterialIcons.font,
});
```

expo-image 라이브러리를 사용하여 사용자의 프로필 사진을 로그인할 때 캐시하고 앱 전체에 걸쳐 프로필 사진을 반복 다운로드하는 것을 방지했습니다. 이는 로그아웃 시에 지워졌습니다.

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
const signIn = (user) => {
  if (user.displayPicture) {
    Image.prefetch(user.displayPicture, "memory");
  }
  setUserData(user);
};
...
const signOut = async () => {
  await unsetUserData();
  await clearAsyncStorage();
  await Image.clearMemoryCache();
  await Image.clearDiskCache();
}
```

# 결론

긴 여정이었습니다! React Native 애플리케이션을 최적으로 설계하는 데 어떤 통찰력을 얻었으면 좋겠어요. 메모이제이션, 적절한 네이티브 컴포넌트 사용, 캐싱 그리고 값 비싼 로직을 신중하게 배치하는 것은 앱을 최적화하는 데 큰 역할을 합니다. 이러한 전략을 사용하여 렌더링 시간을 200ms에서 110ms로 줄일 수 있었어요. 탭을 재설계하고 reanimated 라이브러리를 활용하며 값 비싼 상태 업데이트를 피함으로써 추후의 느림 현상을 완전히 제거할 수 있었어요! 프로파일러는 앱 성능의 병목 지점을 관찰하는 데 훌륭한 도구에요. 다음 번엔 또 뵙겠습니다!

# 관련 기사

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

# 테이블 태그를 Markdown 형식으로 변경해주세요.

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

리액트 네이티브에서 대량의 UI 항목을 최적으로 로드하는 방법에 대한 제안 목록입니다.
