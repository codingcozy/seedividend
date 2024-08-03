---
title: "React Native subscription에 대한 팁과 노하우"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React Native subscription tips and tricks"
link: "https://medium.com/@l.reinaldodemelo/react-native-subscription-tips-and-tricks-163724062c66"
---



# 시작해보죠!

우선, 요구 사항을 개요로 작성해볼까요? 제품 팀이 인앱 구독 추가를 요청했다고 상상해보세요. 이미 문제없이 해결되었어요 (아주 간단해요). 이제 할 일은 앱에 페이월을 통합하는 것이죠. 하지만 그것만이 아닙니다; 때로는 특정 기능이 페이월에 의해 제한되지 않고 구독이 필요한 경우가 있는데요.

이 도전 과제를 어떻게 해결할까요? 기초부터 시작해보죠. 우리는 항상 사용자의 구독 상태에 대한 가장 정확한 정보를 가지고 있도록하기 위해 앱이 활성 상태인지 또는 백그라운드에서 실행 중인지 확인해야 합니다. 그래서 이 목적을 위한 후크를 만들어 봅시다:

```js
import React from "react";
import { AppState, AppStateStatus } from "react-native";

type Props = {
  onActive?: () => void,
  onBackground?: () => void,
};

export const useAppState = (props: Props | undefined) => {
  const { onActive, onBackground } = props || {};

  const appState = React.useRef < AppStateStatus > AppState.currentState;

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("앱이 화면으로 돌아왔어요!");
        onActive?.();
      }

      if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log("앱이 백그라운드로 이동했어요!");
        onBackground?.();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [onActive, onBackground]);

  return { state: appState.current };
};
```

<div class="content-ad"></div>

이제 백엔드 팀과 API 엔드포인트를 제공받기 위해 대화해야 합니다. 이 엔드포인트의 주요 목적은 사용자가 활성 구독을 가지고 있는지를 확인하는 것입니다. 이 엔드포인트를 제공해주면 우리는 모든 준비가 된 것이니 계속 진행할 수 있게 될 거에요. (또는 엔드포인트가 배포될 때까지 응답을 가짜로 만들어 사용할 수도 있어요).

useAppState 훅을 추가했기 때문에 사용자 구독 상태를 확인할 수 있는 아래와 같은 것을 만들 수 있어요. 한번 살펴보세요:

```js
import React from "react";
import { View, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { storage } from "@lib/storage";
import { useAppState } from "@hooks/useAppState";

export const useSubscription = () => {
  const [subscribed, setSubscribed] = React.useState(false);

  useAppState({
    onActive: async () => {
      // 사용자가 구독 중인지 확인합니다.
      // 몇 밀리초가 소요되는 API 호출일 수 있습니다.
      // 모든 앱이 열릴 때마다 확인을 피하기 위해 시간을 추가할 수 있어요.
      // 예를 들어, 앱이 30분 이내에 열린 경우 이전 상태를 가져오도록 시간을 설정하고 API를 호출하지 않을 수 있어요.
      const isSubscribed = storage.getString("subscribed");
      setSubscribed(isSubscribed === "true");
      storage.set("subscribed", "true");
    },
  });

  return { subscribed };
};
```

사용자가 활성 구독을 가지고 있는지 확인할 때, 그 정보를 빠르게 액세스하기 위해 저장하고 API 과부하를 피하는 것이 유용할 수 있어요. 저는 예제에서 MMKV를 사용하고 있는데요, AsyncStorage보다 훨씬 빠릅니다.

<div class="content-ad"></div>

좋아요, 이제 앱 상태, API 호출 또는 캐시된 데이터를 통해 구독 상태를 확인하는 방법을 결정했으니, 고차 컴포넌트(HOC)를 사용하여 지불 벽을 만드는 방법을 살펴보겠습니다. 아래 예시를 확인해보세요:

```js
export const withPaywall = (Component: React.FC<any>) => (props: any) => {
  const navigation = useNavigation();
  const { subscribed } = useSubscription();

  useFocusEffect(
    React.useCallback(() => {
      if (!subscribed) {
        // Paywall을 닫은 후 사용자가 홈으로 돌아가도록 확인
        navigation.navigate("Paywall");
      }
    }, [subscribed, navigation])
  );

  if (!subscribed) {
    return null;
  }

  return <Component {...props} />;
};
```

useEffect 대신 useFocusEffect를 사용하는 이유가 뭔지 궁금하신가요? 간단합니다. useEffect는 열 때마다 트리거를 보장하지 않지만, useFocusEffect는 함수가 항상 호출되어 일관된 동작을 보장합니다.

HOC가 무엇이며 어떻게 사용되는지 잘 모르겠다면, 아래 예시를 살펴보세요. 그러면 이해하실 거예요.

<div class="content-ad"></div>

```js
import React from "react";
import { Text, View } from "react-native";
import { withPaywall } from "@hooks/useSubscription";

export const MyScreen = withPaywall(() => {
  return (
    <View>
      <Text>MyScreen</Text>
    </View>
  );
});
```

엄청 간단하죠? 이제 사용자가 구독이 필요한 화면으로 이동할 때마다 우리는 사용자를 페이월 화면으로 보냅니다. 또한 사용자가 페이월 화면을 닫지 못하도록 하고, 닫으면 홈 화면으로 리디렉트되어 페이월 뒤의 화면에 액세스할 수 없도록 해야 합니다.

우리의 초기 요구 사항을 기억하세요? 사용자가 활성 구독이 없는 경우 일부 구성 요소에 액세스 제한을 두어야 합니다. 이 목적을 위해 비슷한 접근 방식을 채용하겠습니다.

```js
import React from "react";
import { View, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { storage } from "@lib/storage";
import { useAppState } from "@hooks/useAppState";

export const withSubscription = (Component: React.FC<any>) => (props: any) => {
  const { subscribed } = useSubscription();

  if (!subscribed) {
    return (
      <View>
        <Text>Subscription based</Text>
      </View>
    );
  }

  return <Component {...props} />;
};
```

<div class="content-ad"></div>

우리는 마찬가지로 거의 같은 방식으로 사용할 수 있어요.

```js
import React from "react";
import { View, Text } from "react-native";
import { withSubscription } from "@hooks/useSubscription";

const MyComponent = withSubscription(() => {
  return <Text>MyScreen</Text>;
});

export const MyScreen = () => {
  return (
    <View>
      <MyComponent />
    </View>
  );
};
```

당신이 생각하는 것을 알아요. 왜 단순한 컴포넌트 래퍼 대신 HOC를 사용해야 하는 거죠? 알겠어요, 당신의 방법대로 가볼게요.

```js
import React from "react";
import { View, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { storage } from "@lib/storage";
import { useAppState } from "@hooks/useAppState";

type WithSubscriptionProps = {
  children: React.ReactNode,
};

export const WithSubscription = (props: WithSubscriptionProps) => {
  const { children } = props;

  const { subscribed } = useSubscription();

  if (!subscribed) {
    return (
      <View style={{ position: "relative" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <Text>Subscription based</Text>
        </View>
        <View style={{ opacity: 0.1 }}>{children}</View>
      </View>
    );
  }

  return <>{children}</>;
};
```

<div class="content-ad"></div>

행복하신가요? 그렇다면 공유하고 댓글을 남겨 주세요!

```js
import React from "react";
import { View, Text } from "react-native";
import { WithSubscription } from "@hooks/useSubscription";

export const MyScreen = () => {
  return (
    <View>
      <WithSubscription>
        <Text>MyScreen</Text>
      </WithSubscription>
    </View>
  );
};
```

더 많은 React, Next.js, React Native 콘텐츠를 기대해 주세요. 곧 Golang도 소개할 예정이에요. (솔직히 말하면, Node.js에 조금 지쳐 있어요.)

<img src="/assets/img/ReactNativesubscriptiontipsandtricks_0.png" />

<div class="content-ad"></div>

👋
