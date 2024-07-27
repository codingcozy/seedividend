---
title: "리액트 네이티브에서 Reanimated를 사용해 사용자 정의 새로고침 애니메이션 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingaCustomRefreshAnimationinReactNativeusingReanimated_0.png"
date: 2024-05-12 21:21
ogImage: 
  url: /assets/img/2024-05-12-BuildingaCustomRefreshAnimationinReactNativeusingReanimated_0.png
tag: Tech
originalTitle: "Building a Custom Refresh Animation in React Native using Reanimated"
link: "https://medium.com/cloudboost/building-a-custom-refresh-animation-in-react-native-using-reanimated-9b64212a0366"
---


## 간단한 애니메이션이 앱의 사용자 경험을 얼마나 높일 수 있는지 궁금했던 적이 있나요?

잘 디자인된 애니메이션은 평범한 사용자 상호 작용을 진정으로 기억에 남는 경험으로 변화시킬 수 있습니다.

이 포스트에서는 React Native와 Reanimated 라이브러리를 사용하여 모바일 앱에 맞춘 흥미로운 사용자 정의 '당겨서 새로고침' 애니메이션을 만드는 방법을 배우게 됩니다.

## 그냥 React Native의 RefreshControl을 사용하는 것이 좋지 않을까요?



리액트 네이티브로 모바일 애플리케이션을 개발할 때, Pull-to-refresh 기능을 구현하는 데 RefreshControl 컴포넌트를 주로 사용합니다.

간단하고 직관적이지만, 꽤 기본적이며 제한된 사용자 정의 기능을 제공합니다. 이로 인해 여러분의 앱이 그저 다른 어떤 앱처럼 보이는 경우가 있을 수 있습니다.

사용자 정의 애니메이션을 생성하면 앱의 모양과 느낌을 자유롭게 조절하여 브랜딩 및 디자인 언어와 완벽하게 일치시킬 수 있습니다. 이로써 앱이 더 독특하고 기억에 남는 사용자 경험을 제공하게 되어 앱이 더욱 독특하고 기억에 남게 만듭니다.

## 왜 Animated가 아닌 Reanimated 라이브러리를 사용해야 하는가?



React Native에서 애니메이션에 관한 이야기가 나온다면, 두 가지 주요 라이브러리가 떠오르게 됩니다: 내장된 Animated 라이브러리와 더 고급화된 Reanimated 라이브러리가 있습니다.

Reanimated가 선호되는 이유는 몇 가지가 있습니다:

- 성능:
Reanimated는 특히 복잡한 애니메이션에 대해 우수한 성능을 제공합니다. 네이티브 스레드를 활용하여 JavaScript 스레드 대신 작동함으로써 더 효율적으로 작동합니다. 이는 훨씬 부드러운 애니메이션을 가능하게 하며, 이는 원활한 사용자 경험을 위한 중요한 요소입니다.
- 제스처 기반 애니메이션:
Reanimated는 더 복잡한 애니메이션 처리를 위한 더 나은 API를 제공하며, 제스처와 애니메이션의 더 섬세한 제어와 더 부드러운 통합을 가능케 합니다.
- 선언적 접근: Animated와 달리, Reanimated는 애니메이션에 더 선언적인 접근 방식을 채용합니다. 이는 애니메이션이 더 복잡해지면서 이해하고 관리하기 쉬워집니다.

# 시작하기



이 튜토리얼에서는 간단한 앱을 향상시키고자 합니다. 이 앱은 FlatList에서 카드 형태로 표시되는 Dribbble 샷 목록을 보여줍니다. 우리의 목표는 사용자가 목록을 위로 당겼을 때 나타나는 사용자 정의 새로 고침 애니메이션을 추가하는 것입니다.

## 프로젝트 복제 및 설정

로컬 컴퓨터에서 저장소를 클론하고 프로젝트를 설정하기 위해 다음 단계를 따라주세요:

저장소 복제:
터미널을 열고 다음 명령어로 저장소를 클론하세요:



```js
git clone https://github.com/teefouad/custom-rn-refresh-animation-start.git
```

VSCode에서 프로젝트 열기:
이 강좌의 모든 코드는 app/index.tsx에 들어가기 때문에 해당 파일을 열어 다른 파일과 디렉터리를 무시할 수 있습니다.
다음과 같은 내용이 표시됩니다:

<img src="/assets/img/2024-05-12-BuildingaCustomRefreshAnimationinReactNativeusingReanimated_0.png" />

의존성 설치:
필요한 종속 항목을 설치하려면 npm install 또는 yarn을 실행하세요.



프로젝트 실행하기:
npm start 또는 yarn start를 실행하여 프로젝트를 시작하세요. 이렇게 하면 Metro 번들러가 초기화되고 앱이 개발 모드로 실행됩니다.

프로젝트가 설정되었으므로, 이제 우리는 흥미로운 부분으로 빠져들 준비가 되었습니다: 우리의 사용자 정의 새로고침 애니메이션 만들기!

# 애니메이션 만들기: 상단 스크롤 감지

사용자 정의 애니메이션을 만드는 첫 번째 단계는 FlatList가 맨 위로 스크롤되었을 때 감지하는 것입니다.



이를 위해 Reanimated에서 useAnimatedScrollHandler를 사용할 것입니다. 이 훅은 최적화되고 성능이 좋은 방식으로 스크롤 이벤트를 처리할 수 있는 함수를 제공할 것입니다.

1. 먼저, Reanimated에서 훅을 import 해야 합니다:

```js
/**
 * Dependency imports
 */

 import React from 'react';
 import { FlatList, StyleSheet, View, ViewProps } from 'react-native';
 import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
```

2. useAnimatedScrollHandler를 사용하여 스크롤 핸들러를 생성하세요:



```js
const DribbbleShots: React.FC<DribbbleShotsProps & ViewProps> = () => {
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      console.log(event.contentOffset.y);
    },
  });

  return (
    ...
```

지금은 리스트 스크롤 위치를 기록하는 것으로 할게요.

3. 리스트에 스크롤 핸들러를 연결해보세요. useAnimatedScrollHandler를 사용하여 만든 스크롤 이벤트 핸들러는 React Native의 FlatList와 호환되지 않을 것이므로 Reanimated에서 제공하는 FlatList로 대체해야 합니다.

```js
return (
    <View style={styles.root}>
      <Animated.FlatList
        ...
        onScroll={scrollHandler}
        scrollEventThrottle={16} // 부드러운 성능을 위한 좋은 방법
      />
    </View>
);
```



scrollEventThrottle 속성은 스크롤 이벤트가 발생하는 빈도를 제어합니다. 여기서 값이 16이면 스크롤 이벤트를 대략 16밀리초마다 캡처합니다. 이렇게 하면 애니메이션이 부드럽고 반응이 빠릅니다.

![이미지](https://miro.medium.com/v2/resize:fit:1280/1*6cGVuwIPgf4QnLIC79xN7g.gif)

이제 콘솔에 스크롤 위치를 단순히 기록하는 대신, 이를 공유 값에 저장합시다.

다음과 같이 코드를 업데이트하세요:



```js
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

...

const DribbbleShots: React.FC<DribbbleShotsProps & ViewProps> = () => {
  const scrollPosition = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPosition.value = event.contentOffset.y;
    },
  });
  ...
```

# 단계 2: 팬 제스처 캡처하기

이제 목록이 화면 상단까지 스크롤된 것을 감지할 수 있게 되었으므로, 다음 단계는 사용자가 목록을 더 아래로 끌 때 팬 제스처를 캡처하는 것입니다. 이를 달성하기 위해 FlatList의 부모 View에 PanResponder를 사용할 것입니다.

팬 응답자(pan responder)를 생성하기 위해 React Native에서 PanResponder를 가져오세요:



```js
import {
  PanResponder,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
```

그런 다음 PanResponder의 인스턴스를 저장하고 FlatList의 부모 View에 연결하기 위해 ref를 사용하십시오:

```js
const DribbbleShots: React.FC<DribbbleShotsProps & ViewProps> = () => {
  ...

  const panResponderRef = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        console.log(gestureState.dy);
      },
    })
  );

  return (
    <View
      style={styles.root}
      {...panResponderRef.current.panHandlers}
    >
      <Animated.FlatList
        ...
```

이 코드를 자세히 살펴보고 각 부분이 하는 일을 이해해보겠습니다:



PanResponder.create()
이 함수 호출은 PanResponder 인스턴스를 만들며 터치 동작에 대한 앱의 응답 방법을 설명하는 객체를 받습니다. 그리고 PanResponder는 React Ref에 저장됩니다.

onMoveShouldSetPanResponder: () =` true,
터치 동작 중 움직임이 있을 때 호출되는 함수입니다. 여기서 true를 반환하면 사용자가 손가락을 움직일 때 Pan Responder가 계속해서 동작을 처리합니다.

onPanResponderMove: (event, gestureState) =` ' ... '
응답해야 할 제스처가 있으면, 이 함수는 제스처 동작 중 움직임이 발생할 때 실행됩니다.

gestureState는 현재 제스처에 대한 다양한 데이터를 포함하는 객체로, 터치의 위치, 전체 움직임 등을 나타냅니다. 우리는 gestureState.dy에만 관심이 있으며, 이 값은 제스처 시작부터 Y방향으로 얼마나 움직였는지를 나타냅니다. 사용자가 얼마나 아래로 당겼는지를 추적하는 데 사용할 것입니다.



현재 목록을 스크롤하려고 하면 응답하지 않는 것 같아요. 이것은 우리의 PanResponder가 계속해서 모든 팬 제스처를 캡처하기 때문에 발생합니다. 결과적으로 목록은 팬 제스처가 발생했음을 처리할 수 없죠. 일단 괜찮아요, 나중에 이 문제를 해결할 거예요.

<img src="https://miro.medium.com/v2/resize:fit:1280/1*JeG4IxcnUQdpcaBdWBzMnA.gif" />

이제 이동 값을 갖게 됐으니, 이 값을 활용해봅시다. 새로운 공유 값(shared value)을 생성하고 이동 값을 저장하는데 사용해요. 이 공유 값은 목록을 애니메이션화하는 데 활용할 수 있어요.

```js
...

const pullDownPosition = useSharedValue(0);

const panResponderRef = React.useRef(
  PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      pullDownPosition.value = gestureState.dy;
    },
  })
);

...
```



다음 단계는 Reanimated의 useAnimatedStyle 훅을 사용하여 일부 스타일을 생성하고 적용하는 것입니다. 이 훅은 Reanimated에서 제공되며 공유 값이나 다른 반응형 변수에 기반한 동적 스타일을 생성할 수 있게 해줍니다.

참고: 스타일을 목록 자체가 아닌 목록 부모 View에 적용해야 합니다. 또한 React Native의 View가 아닌 Animated.View를 사용해야 합니다.

```js
...
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

...

const pullDownStyles = useAnimatedStyle(() => {
  return {
    transform: [
      {
        translateY: pullDownPosition.value,
      },
    ],
  };
});

return (
  <Animated.View
    style={[styles.root, pullDownStyles]}
    {...panResponderRef.current.panHandlers}
  >
    <Animated.FlatList
      data={data}
      ...
```



저희 코드를 약간 수정하여 사용자가 목록을 아래로 당길 수는 있지만 상단 경계를 넘어서 올릴 수 없도록 해보겠습니다:

```js
...

const panResponderRef = React.useRef(
  PanResponder.create({
    ...

    onPanResponderMove: (event, gestureState) => {
      pullDownPosition.value = Math.max(gestureState.dy, 0);
    },
  })
);
...
```

<img src="https://miro.medium.com/v2/resize:fit:1400/1*FTJzKVw9pWxBXYxL4Nrf1g.gif" />

풀다운 애니메이션을 완성하기 위해, 팬 제스처가 해제될 때 pullDownPosition 공유 값을 제로로 재설정해보겠습니다. Reanimated는 공유 값을 애니메이션화할 수 있는 일련의 애니메이션 유틸리티 함수를 제공합니다. 이 경우에는 pullDownPosition 값을 매끄럽게 제로로 애니메이션화하기 위해 withTiming 함수를 사용하겠습니다.



```js
...
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

...

const panResponderRef = React.useRef(
  PanResponder.create({
    ...
    onPanResponderRelease: () => {
      pullDownPosition.value = withTiming(0, { duration: 180 });
    },
  })
);
```

팬 제스처는 다른 제스처나 작업에 의해 조기에 종료되거나 중단될 수 있습니다. 다양한 상호 작용 시나리오에서 일관된 신뢰할 수 있는 사용자 경험을 보장하기 위해 onPanResponderRelease와 함께 onPanResponderTerminate도 사용합시다:

```js
...

const onPanRelease = () => {
  pullDownPosition.value = withTiming(0, { duration: 180 });
};

const panResponderRef = React.useRef(
  PanResponder.create({
    ...
    onPanResponderRelease: onPanRelease,
    onPanResponderTerminate: onPanRelease,
  })
);

...
```

<img src="https://miro.medium.com/v2/resize:fit:1280/1*9K8kEfhq4VnhQPZoe60Pfw.gif" />



# 단계 3: 목록의 스크롤 동작 복원하기

간단한 작동하는 풀다운 애니메이션이 있지만, 목록의 정상적인 스크롤 동작이 보존되고 올바르게 작동하는지 확인해야 합니다.

onMoveShouldSetPanResponder로 돌아가서 항상 true를 반환하는 대신 의미있는 것을 반환하도록 하겠습니다. 목록이 맨 위로 스크롤되고 사용자가 목록을 더 아래로 밀어내는 경우에만 풀다운 제스처를 허용할 것입니다. 이는 아래와 같이 해석됩니다:

```js
...
const panResponderRef = React.useRef(
  PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) =>
      scrollPosition.value <= 0 && gestureState.dy >= 0,
    onPanResponderMove: (event, gestureState) => {
      pullDownPosition.value = Math.max(gestureState.dy, 0);
    },
...
``` 



<img src="https://miro.medium.com/v2/resize:fit:1280/1*URAgW2RXvWsWs1YxrTLL6g.gif" />

잘 했어요! 목록이 이제 제대로 작동하고 풀다운 애니메이션이 의도대로 트리거되어 멋진 일을 해냈어요!

이제 잠시 쉬는 시간이에요. 커피 한 잔을 즐기세요 ☕, 몇 분 휴식을 취한 후에 마지막 단계로 넘어갈게요.

# 마지막 단계: 새로고침 트리거하기



이제 튜토리얼의 가장 중요한 부분에 도달했어요. 여기서는 실제로 새로 고침 동작을 트리거할 수 있도록 로직을 설정하는 방법을 알아볼 거에요. 현재 사용자들은 목록을 아래로 내릴 수 있지만, 제약을 추가하고 언제 새로 고침을 활성화해야 하는지 정의하고 싶어요.

## 최대 아래로 당기기 거리 설정

지금 사용자들은 화면 아래쪽까지 목록을 아래로 끌어 내릴 수 있어요. 이것은 자연스럽지 않고 직관적이지 않게 느껴지죠. 그래서 우리는 아래로 당기는 거리를 최대 150픽셀로 제한할 거에요.

```js
...

const panResponderRef = React.useRef(
  PanResponder.create({
    ...
    onPanResponderMove: (event, gestureState) => {
      const maxDistance = 150;
      pullDownPosition.value = Math.max(Math.min(maxDistance, gestureState.dy), 0);
    },
...
```



## 새로고침 트리거 지점 결정하기

사용자가 이 150픽셀 범위의 절반 이상으로 당겼을 때, 새로고침 액션이 트리거될 준비가 된 것으로 간주합니다. 이 지점을 넘어서 제스처를 놓으면 새로고침 액션이 시작됩니다.

```js
...
const pullDownPosition = useSharedValue(0);
const isReadyToRefresh = useSharedValue(false);

const panResponderRef = React.useRef(
  PanResponder.create({
    ...
    onPanResponderMove: (event, gestureState) => {
      const maxDistance = 150;
      pullDownPosition.value = Math.max(Math.min(maxDistance, gestureState.dy), 0);

      if (
        pullDownPosition.value >= maxDistance / 2 &&
        isReadyToRefresh.value === false
      ) {
        isReadyToRefresh.value = true;
        console.log('새로고침할 준비 완료');
      }

      if (
        pullDownPosition.value < maxDistance / 2 &&
        isReadyToRefresh.value === true
      ) {
        isReadyToRefresh.value = false;
        console.log('릴리스 시 새로고침하지 않음');
      }
    },
...
```

공유 값 isReadyToRefresh는 목록을 충분히 당겼는지 여부를 나타냅니다. 이제는 제스처 릴리스 처리 논리를 업데이트해봅시다:



```js
...

const onPanRelease = () => {
  pullDownPosition.value = withTiming(isReadyToRefresh.value ? 75 : 0, {
    duration: 180,
  });

  if (isReadyToRefresh.value) {
    isReadyToRefresh.value = false;

    // 새로고침 실행
  }
};

const panResponderRef = React.useRef(
  PanResponder.create({
    ...
    onPanResponderRelease: onPanRelease,
    onPanResponderTerminate: onPanRelease,
  })
);
...
```

새로고침 작업을 트리거하는 메커니즘이 마련되었으니, 제스처(팬 릴리스)의 끝을 처리해봅시다.

## 새로고침 작업 트리거

사용자의 제스처가 끝나고 새로고침 작업 준비가 완료되면, onRefresh 함수를 호출할 것입니다. 이 함수는 하나의 매개변수를 받습니다. 해당 매개변수는 새로고침 작업이 완료된 후 애니메이션을 재설정할 done 함수입니다.



```js
...

const pullDownPosition = useSharedValue(0);
const isReadyToRefresh = useSharedValue(false);

const onRefresh = (done: () => void) => {
  console.log('새로 고침 중...');

  setTimeout(() => {
    console.log('새로 고침 완료!');
    done();
  }, 7500);
};

const onPanRelease = () => {
  pullDownPosition.value = withTiming(isReadyToRefresh.value ? 75 : 0, {
    duration: 180,
  });

  if (isReadyToRefresh.value) {
    isReadyToRefresh.value = false;

    // 애니메이션을 재설정하는 함수
    const onRefreshComplete = () => {
      pullDownPosition.value = withTiming(0, { duration: 180 });
    };

    // 새로 고침 작업 실행
    onRefresh(onRefreshComplete);
  }
};

...
```

`onRefresh` 함수는 setTimeout을 사용하여 새로 고침 프로세스를 시뮬레이션합니다(실제 데이터 가져오기 프로세스의 가상 대체물로). 데이터가 새로 고쳐지면 애니메이션을 재설정하기 위해 `done` 콜백이 호출됩니다.

<img src="https://miro.medium.com/v2/resize:fit:1280/1*qtBcIAWfx4fISFDhdmreFw.gif" />

# 애니메이션 구축하기



이제 useAnimatedStyle 훅을 사용하여 새로 고침 애니메이션을 활성화할 준비가 되었습니다. 몇 가지 애니메이션 컴포넌트로 UI를 개선하면서 시작해 봅시다.

## 배경 설정

먼저, 애니메이션을 위한 배경을 만들겠습니다. 주요 UI를 View로 감싸고 기본 스타일을 적용하세요:

```js
...

return (
  <View
    style={{
      flex: 1,
      backgroundColor: '#333',
    }}
  >
    <Animated.View
      style={[styles.root, pullDownStyles]}
      {...panResponderRef.current.panHandlers}
    >
      <Animated.FlatList
        ...
      />
    </Animated.View>
  </View>
);

...
```



뷰는 애니메이션을 강조하는 어두운 배경을 제공하는 컨테이너 역할을 합니다.

## 새로 고침 아이콘 통합

다음으로, 회전하는 새로 고침 아이콘을 추가해 봅시다. 이 아이콘을 풀 다운 위치에 따라 확대 및 회전되도록 애니메이션화할 것입니다:

```js
const DribbbleShots: React.FC<DribbbleShotsProps & ViewProps> = () => {
  ...

  const refreshContainerStyles = useAnimatedStyle(() => {
    return {
      height: pullDownPosition.value,
    };
  });

  const refreshIconStyles = useAnimatedStyle(() => {
    const scale = Math.min(1, Math.max(0, pullDownPosition.value / 75));

    return {
      opacity: Math.max(0, pullDownPosition.value - 25) / 50,
      transform: [
        {
          scale: scale,
        },
        {
          rotate: `${pullDownPosition.value * 3}deg`,
        },
      ],
    };
  });

  return (
    [styles.refreshContainer, refreshContainerStyles]}>
        <Animated.Image
          source={refreshIcon}
          style={[styles.refreshIcon, refreshIconStyles]}
        />
      </Animated.View>

      ...
    </View>
  );
};
```




![Loading animation](https://miro.medium.com/v2/resize:fit:1400/1*OVJMKGr9f4IJG3Ou7KTUjA.gif)

이제 '새로 고침 중...'이라는 단어를 단순히 기록하는 대신 상태 값을 사용하여 UI를 업데이트하고 새로 고침이 진행 중임을 나타내겠습니다:

```js
...

const DribbbleShots: React.FC<DribbbleShotsProps & ViewProps> = () => {
  ...

  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = (done: () => void) => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      done();
    }, 7500);
  };

  ...

  return (
    <View
      pointerEvents={refreshing ? 'none' : 'auto'}
      style={
        flex: 1,
        backgroundColor: '#333',
      }
    >

    ...
```

데이터가 아직로드 중인 동안 원치 않는 pull-down 제스처를 제어하고 방지하려면 pointerEvents 속성을 추가했습니다.




## 로고 애니메이션 구현하기

조금 더 재미있게 만들기 위해 애니메이션 로고를 추가해봅시다. 사용한 애니메이션 로고는 원래 Tony Pinkevych가 Dribbble에서 만들었고, 저는 이 데모에 맞게 약간 수정했습니다.

```js
/**
 * 의존성 가져오기
 */

import React from 'react';
import { Image } from 'expo-image';

...

const DribbbleShots: React.FC<DribbbleShotsProps & ViewProps> = () => {
  ...

  return (
    <View
      pointerEvents={refreshing ? 'none' : 'auto'}
      style={
        flex: 1,
        backgroundColor: '#333',
      }
    >
      <Animated.View style={[styles.refreshContainer, refreshContainerStyles]}>
        {refreshing && (
          <Image
            source={animatedLogo}
            style={ width: 280, height: '100%', objectFit: 'cover' }
          />
        )}

        <Animated.Image
          source={refreshIcon}
          style={[styles.refreshIcon, refreshIconStyles]}
        />
      </Animated.View>

    ...
```

마지막으로, refreshIconStyles를 업데이트하여 새로 고침 아이콘을 애니메이션 로고로 부드럽게 전환해보겠습니다.



```js
const refreshIconStyles = useAnimatedStyle(() => {
  const scale = Math.min(1, Math.max(0, pullDownPosition.value / 75));

  return {
    opacity: refreshing
      ? withDelay(100, withTiming(0, { duration: 20 }))
      : Math.max(0, pullDownPosition.value - 25) / 50,
    transform: [
      {
        scaleX: refreshing ? withTiming(0.15, { duration: 120 }) : scale,
      },
      {
        scaleY: scale,
      },
      {
        rotate: `${pullDownPosition.value * 3}deg`,
      },
    ],
    backgroundColor: refreshing ? '#fff' : 'transparent',
  };
}, [refreshing]);
```

마지막으로, 데이터를 로드하는 동안 스켈레톤 카드를 보여줄 것입니다:

```js
...

<Animated.FlatList
  ...
  renderItem={({ item, index }) => (
    <Card
      loading={refreshing}
      index={index}
      image={item.image}
      title={item.title}
      likes={item.likes}
    />
  )}
  onScroll={scrollHandler}
  scrollEventThrottle={16}
/>
</Animated.View>

...
```

이러한 마지막 손짓으로, 새로 고침 애니메이션이 기능적이면서 시각적으로 매력적으로 완성되었습니다.



# 활기찬 인상 깊은 애니메이션

이제 창조의 시간입니다. 여기 창의성을 자극하고 다음 앱을 위한 몇 가지 아이디어를 제공할 인상적인 애니메이션의 선별된 목록이 준비되어 있습니다.

![Animation 1](https://miro.medium.com/v2/resize:fit:1400/1*KB2KSwJq06LLyzA2_t-h1w.gif)

![Animation 2](https://miro.medium.com/v2/resize:fit:1400/1*6L8rnyxjfPF-leE0x3Kigg.gif)




![Animated GIF](https://miro.medium.com/v2/resize:fit:1400/1*Fb1kzeeAhQVNEf5TTAZlrg.gif)

![Animated GIF](https://miro.medium.com/v2/resize:fit:1400/1*YU3TndEWRtBaNcjXf-JZVg.gif)

![Animated GIF](https://miro.medium.com/v2/resize:fit:1400/1*sMa1sfIYa6Zsl8Co0bCsEQ.gif)

![Animated GIF](https://miro.medium.com/v2/resize:fit:1400/1*N5X0Kbuz7jHxclWzBv-glw.gif)



![image1](https://miro.medium.com/v2/resize:fit:1400/1*pZ8ddY3rFUoVBuTWAhRPTg.gif)

![image2](https://miro.medium.com/v2/resize:fit:1400/1*bSPbDYoIz9zz3r2mCftWKw.gif)

![image3](https://miro.medium.com/v2/resize:fit:1400/1*utIKDBZ3o_V_-ctf22CBSA.gif)

![image4](https://miro.medium.com/v2/resize:fit:1400/1*Ti1YIVYL67ZQHWDXNX8ZzA.gif)



![이미지1](https://miro.medium.com/v2/resize:fit:1400/1*948wumPUB-5spDMTYs0Odg.gif)

![이미지2](https://miro.medium.com/v2/resize:fit:1400/1*V4UtSyfCN9DDpl70IxXSHA.gif)

![이미지3](https://miro.medium.com/v2/resize:fit:1400/1*GA_UPaFN6krQMhRb3lGiqw.gif)

![이미지4](https://miro.medium.com/v2/resize:fit:1400/1*m4aMIvlIMY5WGmyFL8q2gA.gif)



# 결론

우리의 사용자 정의 새로 고침 애니메이션 자습서가 마무리되었습니다! 아마도 이것이 여러분의 프로젝트에 몇 가지 아이디어를 불러일으켰으면 좋겠네요. 다양한 애니메이션을 실험해보고 해당 앱의 사용자 경험을 어떻게 향상시킬 수 있는지 확인해 보는 것을 권장합니다.

기억하세요, 배우는 가장 좋은 방법은 직접 해보는 것이기 때문에 고유한 새로 고침 애니메이션을 만들어보는 것에 도전해 보세요. 즐거운 코딩 되세요!