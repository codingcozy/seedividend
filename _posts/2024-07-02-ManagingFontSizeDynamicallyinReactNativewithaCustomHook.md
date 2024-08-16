---
title: "사용자 정의 훅으로 React Native에서 글꼴 크기 동적으로 관리하는 방법"
description: ""
coverImage: "/assets/img/2024-07-02-ManagingFontSizeDynamicallyinReactNativewithaCustomHook_0.png"
date: 2024-07-02 22:20
ogImage: 
  url: /assets/img/2024-07-02-ManagingFontSizeDynamicallyinReactNativewithaCustomHook_0.png
tag: Tech
originalTitle: "Managing Font Size Dynamically in React Native with a Custom Hook"
link: "https://medium.com/@hannan.azmat/managing-font-size-dynamically-in-react-native-with-a-custom-hook-845161f95024"
isUpdated: true
---





![이미지](/assets/img/2024-07-02-ManagingFontSizeDynamicallyinReactNativewithaCustomHook_0.png)

현대 모바일 앱 개발에서는 사용자 친화적이고 접근성 있는 인터페이스를 만드는 것이 중요합니다. 이를 달성하는 한 가지 중요한 측면은 효율적인 글꼴 크기 관리입니다. 이 블로그에서는 React Native 애플리케이션에서 커스텀 훅을 사용하여 동적으로 글꼴 크기를 관리하는 실용적인 접근 방법을 탐색해보겠습니다. 이 방법을 사용하면 사용자가 자신의 선호에 따라 글꼴 크기를 조정할 수 있고 다양한 디바이스에서 응답형 디자인을 보장할 수 있습니다.

# 글꼴 크기 관리 소개

글꼴 크기 관리는 텍스트 크기를 설정하는 것 이상입니다. 서로 다른 화면 크기와 사용자 선호에 맞게 적응할 수 있는 확장 가능하고 유연한 시스템을 만드는 것을 포함합니다. 이 블로그에서는 React Native 앱에 확장 가능한 글꼴 크기 시스템을 제공하는 커스텀 훅을 만드는 방법을 다룰 것입니다.


<div class="content-ad"></div>

# 사용자 정의 글꼴 크기 훅 만들기

여기에는 글꼴 크기를 동적으로 관리하는 FontSizeProvider 및 useFontSize 훅을 구축하는 단계별 가이드가 있습니다:

1. FontSizeProvider 훅 설정하기
FontSizeProvider 컴포넌트는 글꼴 크기 관리 시스템의 핵심입니다. 현재 글꼴 크기를 제공하고 사용자가 글꼴 크기를 조정할 수 있는 방법을 제공합니다.

```js
import React, {
 createContext,
 ReactNode,
 useContext,
 useEffect,
 useState,
} from 'react';
import {Dimensions, PixelRatio} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getAsyncStorage, setAsyncStorage} from '@utils/async-storage.ts';

// 기기의 화면 너비 가져오기
const {width: SCREEN_WIDTH} = Dimensions.get('window');

// 다른 기기 유형에 대한 기본 너비 정의
const baseWidths = {
 phone: 365,
 tablet: 768,
};

// 기기 유형 결정하기
const getDeviceType = () => {
 return DeviceInfo.isTablet() ? 'tablet' : 'phone';
};

// 기기 유형을 기반으로 스케일 요인 계산하기
const getScaleFactor = () => {
 const deviceType = getDeviceType();
 const baseWidth = baseWidths[deviceType];
 return SCREEN_WIDTH / baseWidth;
};

// 다른 텍스트 카테고리에 대한 기본 글꼴 크기 정의
const baseFontSizes = {
 h1: 38,
 h2: 34,
 h3: 30,
 h4: 26,
 h5: 20,
 h6: 19,
 subtitle1: 16,
 subtitle2: 14,
 body1: 16,
 body2: 14,
 button: 14,
 caption: 12,
 overline: 10,
};

// 글꼴 크기에 대한 유형 정의
type FontSizes = typeof baseFontSizes;

export type FontSizeContextType = {
 fontSizes: FontSizes;
 currentFontSize: number;
 changeFontSize: (multiplier: number) => void;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(
 undefined,
);

const fontSizeKey = 'userFontSizeMultiplier';

// FontSizeProvider 컴포넌트
const FontSizeProvider: React.FC<{children: ReactNode}> = ({children}) => {
 const [currentFontSize, setCurrentFontSize] =
  useState<number>(getScaleFactor());

 useEffect(() => {
  (async () => {
   const savedMultiplier = await getAsyncStorage(fontSizeKey);
   if (savedMultiplier) {
    setCurrentFontSize(Number(savedMultiplier));
   }
  })();
 }, []);

 const fontSizes = Object.keys(baseFontSizes)?.reduce((acc, key) => {
  acc[key as keyof FontSizes] = Math.round(
   PixelRatio.roundToNearestPixel(
    baseFontSizes[key as keyof FontSizes] * currentFontSize,
   ),
  );
  return acc;
 }, {} as FontSizes);

 const changeFontSize = async (multiplier: number) => {
  setCurrentFontSize(multiplier);
  await setAsyncStorage(fontSizeKey, multiplier?.toString());
 };

 return (
  <FontSizeContext.Provider
   value={{
    fontSizes,
    currentFontSize,
    changeFontSize,
   }}>
   {children}
  </FontSizeContext.Provider>
 );
};

export default FontSizeProvider;
```

<div class="content-ad"></div>


이 코드에서는 getDeviceType가 기기가 태블릿인지 휴대폰인지를 결정하고, getScaleFactor는 기기의 화면 너비를 기반으로 스케일링 계수를 계산합니다. FontSizeProvider는 현재 폰트 크기 배수를 관리하고 이를 나머지 앱에 제공합니다.

2. 컴포넌트에서 폰트 크기 후크 사용하기
React Native 컴포넌트에서 FontSizeProvider와 useFontSize 후크를 사용하여 폰트 크기를 표시하고 조정하는 방법은 다음과 같습니다:

```js
import React, {memo} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {fontCategory, useFontSize} from '@hooks/font-size-provider.tsx';

const Settings = () => {
 const {fontSizes, changeFontSize, currentFontSize} = useFontSize();

 return (
  <View style={styles.container}>
   <Text style={[styles.title, {fontSize: fontSizes.body1}]}>
    Responsive Font Size
   </Text>
   <Text style={[styles.subtitle, {fontSize: fontSizes.h2}]}>
    This text is responsive!
   </Text>
   <View style={styles.buttonContainer}>
    {fontCategory?.map(item => {
     return (
      <Button
       key={item?.key}
       title={item?.key}
       color={currentFontSize === item?.value ? 'green' : ''}
       onPress={() => changeFontSize(item?.value)}
      />
     );
    })}
   </View>
   <Text style={styles.selectedScaleText}>
    Selected Scale: {currentFontSize}
   </Text>
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
 title: {
  fontWeight: 'bold',
 },
 subtitle: {
  color: 'gray',
 },
 buttonContainer: {
  marginTop: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '80%',
 },
 selectedScaleText: {
  marginTop: 20,
  fontSize: 18,
  fontWeight: 'bold',
 },
});

export default memo(Settings);
```

Settings 컴포넌트에서는 useFontSize를 사용하여 현재 폰트 크기에 액세스하고 폰트 크기 배수를 변경합니다. 버튼을 통해 사용자가 다른 폰트 크기 스케일을 선택할 수 있습니다. "fontSizes" 객체는 다양한 텍스트 요소에 대한 반응형 폰트 크기를 제공합니다.

<div class="content-ad"></div>

# 이 접근 방식을 사용하는 이점

확장성: 사용자 환경 설정에 따라 앱 전체에서 글꼴 크기를 동적으로 조정할 수 있습니다.
응답성: 서로 다른 기기와 화면 크기에 대해 글꼴 크기를 자동으로 조정합니다.
사용자 제어: 간단한 인터페이스를 통해 사용자가 글꼴 크기를 변경할 수 있습니다. 일관성: 앱 전체에서 일관된 글꼴 크기 시스템을 유지합니다.

# 결론

React Native 애플리케이션에서 사용자 친화적인 글꼴 크기 관리 시스템을 만드는데 글꼴 크기를 효과적으로 관리하는 것은 반응 형이고 접근할 수 있는 사용자 인터페이스를 만드는 데 중요합니다. FontSizeProvider 훅과 useFontSize 훅을 사용하여 동적이고 사용자 친화적인 글꼴 크기 관리 시스템을 만들 수 있습니다. 이 접근 방식은 앱의 사용성을 향상시키는데 그치지 않고 디바이스 및 사용자 환경 설정에 맞게 디자인이 조정되도록 보장합니다. 이러한 실천 방법을 도입하면 보다 넓은 범위의 사용자 요구 사항과 디바이스 구성에 대응하는 더 나은 React Native 애플리케이션을 개발할 수 있습니다.

<div class="content-ad"></div>

이 예시를 자유롭게 활용하고 프로젝트의 특정 요구사항에 맞게 확장해보세요!