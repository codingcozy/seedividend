---
title: "리액트 네이티브에서 Redux를 이용한 테마 설정"
description: ""
coverImage: "/assets/img/2024-06-20-ThemingWithReduxinReactNative_0.png"
date: 2024-06-20 00:06
ogImage: 
  url: /assets/img/2024-06-20-ThemingWithReduxinReactNative_0.png
tag: Tech
originalTitle: "Theming With Redux in React Native"
link: "https://medium.com/@banjolakunri/theming-with-redux-in-react-native-f321037e82f0"
isUpdated: true
---




![image](/assets/img/2024-06-20-ThemingWithReduxinReactNative_0.png)

왜 Theming을 할까요?

Theming은 현대 앱의 주요 부분이 되어, 사용자 맞춤화 기능을 더욱 향상시킬 수 있게 해줍니다. 테마는 다양한 속성을 포함한 스타일을 설정하여, 다양한 사용자에게 다양한 방식으로 읽히게 합니다. 특히 편의성 측면에서 다르게 작용합니다. 요즘 유행하는 테마 모드는 주로 밝은 모드 또는 어두운 모드(어두운 모드가 가장 좋아요 :-))가 사용되고 있습니다. 일반적으로 사용자의 전화 시스템이 결정하도록 하는 세 번째 옵션이 존재하기도 합니다.

Redux로 Theming을 하는 이유는 무엇인가요?

<div class="content-ad"></div>

리덕스는 사용자가 상태를 중앙에서 조직적으로 관리할 수 있도록 도와주는 상태 관리 라이브러리입니다. 리덕스는 애플리케이션 상태를 저장하는 저장소 역할을 하며, 사용자는 이 저장소로 읽기, 업데이트 또는 액션을 전달할 수 있습니다. 리액트 컨텍스트, 리액트 쿼리 등 다른 더 쉬운 옵션이 있지만, 사용자를 위해 상태 관리를 간단하게 만드는 목적으로 이 글을 리덕스로 작성했습니다.

- 리덕스는 현재 여러 프로젝트에서 사용 중인 매우 큰 커뮤니티 기반을 가지고 있습니다. 누군가에게 도움이 될 수 있습니다.
- 개인적으로는 상태 관리 과정에서 어떤 일이 벌어지는지 더 잘 이해할 수 있다고 믿습니다.
- 누군가가 그것이 스트레스라고 말했으므로, 왜냐하면 나는 그렇게 결정했기 때문에요. :-))

우리가 이루고자 하는 목표

이 프로젝트를 작성하는 시점을 기준으로, React Native 버전인 0.72.7, TypeScript 버전인 4.8.4, Node 버전인 16.17.1, 그리고 NPM 버전인 8.15.0을 사용할 것입니다. 사용할 리덕스 패키지 버전은 다음과 같습니다.

<div class="content-ad"></div>

- "redux": "5.0.1",
- "redux-logger": "3.0.6",
- "redux-persist": "6.0.0",
- "@react-native-async-storage/async-storage": "1.21.0"

이 프로젝트를 진행하면서 몇 가지 목표를 이루고자 합니다.

- 작업 환경을 설치하고 설정하기.
- 서로 다른 테마에 대한 다양한 색상을 만들고 사용할 테마 색상 객체를 선택하는 함수를 작성하기.
- 액션과 리듀서 만들기.
- Redux 스토어 만들기, Redux 로거, 퍼시스트, 그리고 Async Storage 설정하기. 이 패키지들이 어떤 역할을 하는지 앱에서 사용하면서 설명해 드리겠습니다.
- 리하이드레이션에 대해 설명하고 여기서 왜 필요한지 이야기하기.
- 이 컴포넌트 내에서 저장된 상태 사용하기.
- 마지막으로, 사용자가 시스템의 기본 테마를 사용할 수 있도록 하는 세 번째 옵션을 고려하기.

전제 조건

<div class="content-ad"></div>

- Javascript, Typescript, React Native 및 Redux에 대한 지식이 있습니다.
- 위의 패키지가 설치되었습니다.

시작하기

패키지 설치

```js
// npm을 사용하여
npm i redux redux-logger redux-persist @react-native-async-storage/async-storage
// yarn을 사용하여
yarn add redux redux-logger redux-persist @react-native-async-storage/async-storage
```

<div class="content-ad"></div>

색구성 만들기

누가 색상을 선택하는 데 머리 아픈 적이 없나요? src 폴더에 colors.tsx 파일을 생성하세요. 여기에는 light 및 dark 모드에 구조를 제공하는 유형을 만들었고, 이를 light 및 dark 키로 지정된 객체에 할당했습니다. 또한 테마에 따라 색구성을 반환하는 함수를 만들었습니다. 나중에 이 부분으로 돌아오겠습니다.

```js
export interface ColorProps {
  screenColor: string;
  primary: string;
  primaryTextColor: string;
  lighterBlack: string;
  secondaryTextColor: string;
  inActiveUnderlineTextInputColor: string;
  tertiaryTextColor: string;
  whiteColor: string;
  lightPrimaryColor: string;
  favouriteButtonColor: string;
  addPhotoButtonColor: string;
  ratingIconColor: string;
  disabledButtonColor: string;
  onboardingInactiveIconColor: string;
  tabBarTextColor: string;
  tabColor: string;
  gradientColor: string;
}
export const Colors: ColorProps = {
  screenColor: '#E5E5E5',
  primaryTextColor: '#000000',
  lighterBlack: '#FFFFFF',
  secondaryTextColor: '#FFFFFF',
  tertiaryTextColor: '#FFFFFF',
  gradientColor: '#61D2C4',
  tabColor: '#FFFFFF',
  ratingIconColor: '#FFCD00',
  primary: '#2DDA93',
  disabledButtonColor: '#AAAAAA',
  onboardingInactiveIconColor: '#DBDBDB',
  inActiveUnderlineTextInputColor: '#A7A7A7',
  lightPrimaryColor: '#61D2C4',
  tabBarTextColor: '#D2D2D2',
  whiteColor: '#FFFFFF',
  favouriteButtonColor: '#FF6262',
  addPhotoButtonColor: '#48A2F5',
};

export const DarkColors: ColorProps = {
  primaryTextColor: '#FFFFFF',
  tertiaryTextColor: '#1E1E1E',
  secondaryTextColor: '#F5F5F5',
  screenColor: '#1B1C1E',
  lighterBlack: '#777777',
  tabColor: '#FFFFFF',
  ratingIconColor: '#FFCD00',
  primary: '#2DDA93',
  disabledButtonColor: '#AAAAAA',
  lightPrimaryColor: '#61D2C4',
  gradientColor: '#1B1C1E',
  onboardingInactiveIconColor: '#DBDBDB',
  inActiveUnderlineTextInputColor: '#A7A7A7',
  tabBarTextColor: '#D2D2D2',
  whiteColor: '#FFFFFF',
  favouriteButtonColor: '#FF6262',
  addPhotoButtonColor: '#48A2F5',
};
const themes = {
  light: {...Colors},
  dark: {...DarkColors},
};

export const getThemeColor = (
  theme: 'light' | 'dark' = 'light',
  useSystemTheme?: 'light' | 'dark',
) => {
  const themeMode = themes[theme];
  return themeMode;
};
```

더 진행하기 전에, store, action 및 reducer는 무엇인가요? 간단히 살펴보겠습니다.

<div class="content-ad"></div>

어딘가에서 배운 상인의 비유를 사용해 보자. 좋은 걸로 알고 있어.

- 가게를 운영하는 상인인 당신이라고 상상해보세요. 당신은 주문을 방문해야 팔 수 있는 국가를 파는 상점을 소유하고 있어요 (이곳에서는 이것이 유행이죠). 당신의 고객들은 직접 물건을 가져갈 수 없어요, 당신이 주어야죠 (리덕스 스토어).
- 이익을 내려면 고객이 있어야 해요 - 우리는 비즈니스를 운영하고 있거든요!! - 이 고객들은 상점에 있는 제품에 대해 요청하거나 주문을 넣어요 (하나의 액션). 이러한 주문/요청은 '타입'으로 분류되며, 기타 정보와 함께 액션 객체에 유지되어요.
- 이제 재고를 업데이트해야 해요 - 몇 개의 물건을 주고 나서 재고가 부족해요 - 그러나 당신이 따르는 특정 논리가 있어요. 여기에서 리듀서라는 개념이 등장해요. 리듀서는 현재 상태와 액션을 받아 들이는 순수한 액션 함수로, 액션 타입과 데이터에 기반하여 새로운 상태를 반환해요.

우리의 리덕스 폴더 구조

![image](/assets/img/2024-06-20-ThemingWithReduxinReactNative_1.png)

<div class="content-ad"></div>

미리 정의된 유형과 초기 테마 상태를 정의해 봅시다 (이 기능은 더 큰 앱의 일부이므로 혼란스러워하지 않도록 이렇게 하고 있어요). 상태 매개변수에 초기 상태를 기본값으로 전달하는 것이 중요합니다. 이렇게 함으로써 상태가 정의되지 않은 경우 첫 번째로 리듀서를 호출할 때 처리할 수 있습니다.

```js
export default {
  TOGGLE_STATUS: 'Toggle',
};
export type ThemeData = {
  theme: 'light' | 'dark' | 'system';
};
const initialState: ThemeData = {
  theme: 'light',
};
```

이제 액션(고객)을 만들어 봅시다.
먼저 액션 생성자부터 시작할게요 - 액션을 반환하는 함수(유형, 페이로드)를 반환하고, 페이로드를 새로운 테마로 설정하여 나중에 컴포넌트에서 디스패치할 것입니다. 

```js
export const toggleTheme = (newTheme: string) => {
  return {
    type: types.TOGGLE_STATUS, // 모든 액션은 유형을 가져야 합니다
    payload: newTheme,
  };
};
```

<div class="content-ad"></div>

저희 상태를 업데이트하기 위한 reducer를 생성 중입니다 (상점 주인님)

여기서 이전 상태를 가져오고 이를 이전 상태가 없는 경우 초기 상태로 설정하는데 사용합니다. 그런 다음 액션에서 전달된 테마 값을 새 상태로 반환합니다. 여기서 액션은 'type, payload'로 구조화되어 있습니다. 타입이 없는 경우에는 이전 상태를 기본 블록에 전달합니다. 이 동작은 새로운 테마 모드로 상태를 업데이트합니다.

```js
const toggleThemeReducer = (
  state: ThemeData = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case types.TOGGLE_STATUS:
      return {...state, theme: payload};
    default:
      return state;
  }
};
```

리덕스 스토어 설정 중입니다

<div class="content-ad"></div>

와, 그것은 쉬운 부분이었네요. 이제 더 쉬운 부분으로 넘어가겠습니다. (다만 좀 더 신경 써야 할 수도 있어요 :-)).

우리는 예상되는 입력 상태에 타입을 지정하는 것부터 시작할 거에요. 이렇게 미리 정의된 타입을 TypeScript가 타입 추론을 도와줄 때 삶이 조금 더 쉬워지게 됩니다.

```js
export type ThemeState = ReturnType<typeof toggleThemeReducer>;
```

그런 다음에는 우리의 toggleThemeReducer 주위에 래퍼 역할을 하는 루트 리듀서를 가지고 있어요. 그 루트 리듀서는 redux-persist를 사용할 때 지속 상태를 처리하는 데 도움을 줍니다.

<div class="content-ad"></div>

```js
const rootReducer = (state: ThemeState | undefined, action: any) => {
  const rehydratedState: ThemeState | undefined = toggleThemeReducer(state, action);
  return rehydratedState;
};
```

이제 상태를 보존해야 합니다. 이렇게 하면 사용자가 애플리케이션을 다시 시작하거나 새로 고침하면 이전에 한 변경 사항을 볼 수 있습니다. 테마 상태를 앱 다시 시작이나 새로 고침을 통해 다시 살리기 위해 상태를 보존하고 살립니다. 먼저 리듀서를 보존할 설정 객체(코드 상단에 좋습니다)를 만들고, 이 값을 persistReducer에 전달해야 합니다. 지속성 구성 객체는 redux-persist가 저장 솔루션으로 AsyncStorage를 사용하도록 구성하고 '테마' 상태만을 지속해야 한다고 지정합니다.

```js
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
```

이제 저장소를 설정하고 이 저장소를 지속해야 합니다. 지속된 리듀서를 사용하여 저장소를 생성하면 테마 상태를 지속하고 다시 살립니다. 지속된 저장소(persistor)는 persistStore와 Redux 저장소를 사용하여 만듭니다. 이 persistor는 필요할 때 상태를 수동으로 보존하고 다시 살릴 수 있습니다.


<div class="content-ad"></div>


```js
상태 = createStore(
= 지속Reducer,
= applyMiddleware(...middlewares),
);
= 지속 = persistStore(모임);
```

Redux-logger

이것은 Redux 스토어를 사용할 때 우리를 돕는 미들웨어입니다. 우리는 reduxlogger를 사용하는 middleware라는 배열을 만듭니다.

```js
reduxlogger = createLogger({});
middleware = [reduxlogger];

상태 = createStore(
= 지속Reducer,
= applyMiddleware(...middleware),
);
```

<div class="content-ad"></div>

- Redux Logger: 이것은 모든 Redux 액션과 상태 변경을 콘솔에 로그로 남기는 개발 도구입니다. 이는 디버깅 목적으로 매우 유용한데, 액션의 흐름을 추적하고 그에 따라 상태가 어떻게 업데이트되는지 확인할 수 있기 때문입니다.

재수행(Rehydration)

이제, 우리는 리듀서를 수정하여 우리가 재수행할 때의 시나리오에 유의해야 합니다. 하지만 먼저, 재수행이 무엇인지 살펴보겠습니다. 우리 로거에서 가져온 앱의 로그를 살펴보면, 재시작했다는 것을 알 수 있습니다.

```js
{"theme": {"theme": "light"}
GROUP  action persist/PERSIST @ 16:15:46.681
LOG    prev state {"theme": {"theme": "light"}
LOG    action     {"register": [Function register], "rehydrate": [Function rehydrate], "type": "persist/PERSIST"}
LOG    next state {"_persist": {"rehydrated": false, "version": -1}, "theme": {"theme": "light"}
LOG    {"theme": {"theme": "light"} 재수행상태 
LOG    {"_persist": {"rehydrated": true, "version": -1}, "theme": {"theme": "dark"} 페이로드 {"theme": "light"} 상태
GROUP  action persist/REHYDRATE @ 16:15:46.923
LOG    prev state {"_persist": {"rehydrated": false, "version": -1}, "theme": {"theme": "light"}
LOG    action     {"err": undefined, "key": "root", "payload": {"_persist": {"rehydrated": true, "version": -1}, "theme": {"theme": "dark"}, "type": "persist/REHYDRATE"}
LOG    next state {"_persist": {"rehydrated": true, "version": -1}, "theme": {"theme": "dark"}
```

<div class="content-ad"></div>

여기에서 무슨 일이 일어나고 있는 거죠?

앱이 다시 시작될 때, redux-persist가 먼저 현재 상태인 `light`를 AsyncStorage에 `persist/PERSIST` 액션을 사용하여 영속화합니다. 그런 다음, 이전에 `dark`로 설정되었던 영속 상태를 AsyncStorage에서 가져와 Redux 스토어에 `persist/REHYDRATE` 액션을 사용하여 재수확합니다.

이것이 스토어에 대한 완전한 코드입니다.

```js
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
};

const rootReducer = (state: ThemeState | undefined, action: any) => {
  const rehydratedState: ThemeState | undefined = toggleThemeReducer(state, action);
  return rehydratedState;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>; // 사전 정의된 이 유형 추론을 돕기 위한 것.
```

<div class="content-ad"></div>

우리 컴포넌트와 함께 이들 저장된 상태를 사용합니다.

이 시연에서는 앱 내에서 테마 모드를 전환하는 데 도움이 되는 테마 버튼이 포함된 드롭다운을 가지고 있을 것입니다.

```js
인터페이스 DropDownData {
  라벨: 문자열;
  값: 문자열;
}
인터페이스 DropDownProps {
  색상?: 문자열;
}
const DropDown = (props?: DropDownProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const data: DropDownData[] = [
    {label: '테마', 값: 'theme'},
  ];

  const dispatch = useDispatch();

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const styles = StyleSheet.create({
    dropDownItem: {
      paddingHorizontal: screenWidth * 0.04,
    },
    dropdown: {
      backgroundColor: Colors.screenColor,
      position: 'absolute',
      left: screenWidth * 0.55,
      borderRadius: 20,
      paddingVertical: 8,
      width: screenWidth * 0.4,
    },
  });

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);

    if (value === 'customTheme') {
      dispatch(toggleTheme(theme === 'light' ? 'dark' : 'light'));
    } else if (value === 'system') {
      dispatch(toggleTheme('system'));
    }
  };
  return (
    <View
      style={
        position: 'absolute',
        top: screenHeight * 0.07,
        right: screenWidth * 0.03,
      }>
      <SelectDropdown
        data={data}
        statusBarTranslucent
        renderItem={(
          selectedItem: DropDownData,
          index: number,
          isSelected: boolean,
        ) => {
          return (
            <View
              style={
                ...styles.dropDownItem,
                borderBottomWidth: 1,
                borderBottomColor: Colors.primary,
              }>
              <WText
                style={
                  paddingVertical: 13,
                  paddingLeft: 5,
                  fontSize: 18,
                }>
                {selectedItem.label}
              </WText>
            </View>
          );
        }
        dropdownOverlayColor="transparent"
        renderButton={() => {
          return (
            <View
              style={
                alignItems: 'flex-end',
                backgroundColor: Colors.lighterBlack,
                borderRadius: 100,
                padding: 5,
              }>
              <Ionicons
                name="ellipsis-vertical"
                color={Colors.primary}
                size={30}
              />
            </View>
          );
        }
        onSelect={(selectedItem: DropDownData, index: number) => {
          handleOptionSelect(selectedItem.value);
        }
        dropdownStyle={styles.dropdown}
      />
    </View>
  );
};

export default DropDown;
```

위에 무슨 일이 발생했나요? "CustomTheme"을 선택했을 때, 현재 테마의 값을 확인한 후, 테마를 번갈아가며 변경합니다. 그러나 "system" 옵션을 선택하면 폰의 기본 테마를 사용합니다.

<div class="content-ad"></div>

시스템 기본 테마 사용하기

마지막으로 시스템 테마를 사용하려면 useColorScheme 훅을 활용할 수 있습니다. 이 훅은 기기에서 현재 사용 중인 색상테마에 대한 업데이트를 제공합니다. colors.tsx 파일에서 getThemeColor 함수를 수정해봅시다.

```js
export const getThemeColor = (theme: 'light' | 'dark' = 'light') => {
  const systemTheme = useColorScheme() || 'light';
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme: storedTheme} = userTheme;
  let themeMode;

  if (storedTheme === 'system') {
    const themeMode = themes[systemTheme];
    return themeMode;
  } else {
    const themeMode = themes[theme];
    return themeMode;
  }
};
```

아래의 코드를 사용하여 저장소에서 현재 테마 색상을 제공받아 원하는 동작을 구현하는데 사용할 수 있습니다.

<div class="content-ad"></div>

```js
const userTheme = useSelector((state: RootState) => state.theme);
const {theme} = userTheme;
const Colors = getThemeColor(theme);
```

아래는 우리의 결과입니다.

![image](https://miro.medium.com/v2/resize:fit:1152/1*2zA_7xp0whnKUe5a5ts_aA.gif)