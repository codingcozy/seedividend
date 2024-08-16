---
title: "리액트 네이티브에서 네이티브 모듈 생성하기"
description: ""
coverImage: "/assets/img/2024-05-14-CreatingaNativeModuleinReactNative_0.png"
date: 2024-05-14 11:38
ogImage: 
  url: /assets/img/2024-05-14-CreatingaNativeModuleinReactNative_0.png
tag: Tech
originalTitle: "Creating a Native Module in React Native"
link: "https://medium.com/@mohamed.ma872/creating-a-native-module-in-react-native-df1a694c89a7"
isUpdated: true
---




리액트 네이티브는 JavaScript와 React를 사용하여 모바일 앱을 개발할 수 있게 해주는 인기 있는 프레임워크입니다. 때때로 자바스크립트에서 사용할 수 없는 플랫폼별 기능에 액세스해야 할 수도 있습니다. 이때 네이티브 모듈이 필요한데, 이를 통해 iOS의 Swift나 안드로이드의 코틀린과 같은 네이티브 언어로 코드를 작성하여 사용할 수 있습니다.

## 네이티브 모듈이란?

네이티브 모듈은 JavaScript로 처리할 수 없는 작업을 수행할 수 있도록 해주는, 네이티브 플랫폼 언어(Swift, Kotlin 등)로 작성된 코드 조각입니다. 디바이스 하드웨어 기능에 액세스하거나 복잡한 계산을 수행하는 것 등이 그 예시에 해당합니다.

## 요구 사항



시작하기 전에 설치해야 할 사항들을 확인해 주세요:

- Node.js와 npm
- React Native CLI
- Xcode (iOS 개발을 위해)
- 안드로이드 스튜디오 (Android 개발을 위해)

## 단계별 안내

1. 개발 환경 설정하기



우선, 아직 React Native 프로젝트를 설정하지 않았다면 다음을 따르세요:

```js
npx react-native init MyNativeModuleProject
cd MyNativeModuleProject
```

2. 네이티브 모듈 생성

iOS 및 Android 모두에서 기기 정보를 제공하는 네이티브 모듈을 생성해봅시다.



안드로이드용으로:

- Kotlin 파일 생성: 안드로이드 프로젝트 디렉토리로 이동하세요:

```js
cd android/app/src/main/java/com/mynativemoduleproject/
```

- 패키지 내에 DeviceInfoModule.kt라는 새로운 Kotlin 파일을 생성하세요.
- Kotlin 파일 편집:



이 네이티브 모듈의 Kotlin 코드입니다:

```js
package com.mynativemoduleproject

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class DeviceInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "DeviceInfo"
    }

    @ReactMethod
    fun getDeviceInfo(promise: Promise) {
        try {
            val deviceInfo = mapOf("device" to android.os.Build.MODEL, "OS" to android.os.Build.VERSION.RELEASE)
            promise.resolve(deviceInfo)
        } catch (e: Exception) {
            promise.reject("Error", e.localizedMessage)
        }
    }
}
```

이 모듈은 기기 모델과 OS 버전을 반환합니다.

시각적 표현:



- 모듈 등록하기: 이 모듈을 당신의 주 애플리케이션 파일에 등록해야 합니다.
- MainApplication.java 파일 편집하기:

```js
package com.mynativemoduleproject;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new DeviceInfoPackage()  // 여기에 패키지 등록
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
```

iOS 경우:

- Swift 파일 생성하기: Xcode에서 iOS 프로젝트 디렉토리로 이동한 후 MyDeviceInfo.swift라는 새로운 Swift 파일을 생성합니다.
- Swift 파일 편집하기:



여기 네이티브 모듈을 위한 Swift 코드가 있어요:

```js
// MyDeviceInfo.swift
import Foundation
import UIKit

@objc(MyDeviceInfo)
class MyDeviceInfo: NSObject {

  @objc
  func getDeviceInfo(_ callback: RCTResponseSenderBlock) {
    callback([nil, ["device": UIDevice.current.model, "OS": UIDevice.current.systemVersion]])
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
```

이 코드 스니펫은 안드로이드 버전과 유사한 기능을 제공하여, 디바이스 모델과 OS 버전을 반환해 주는 거예요.

비주얼 표현:



- 모듈 등록: Bridging-Header.h 파일을 편집하여 Swift 파일이 React Native에서 보이도록 합니다:

```js
#import "React/RCTBridgeModule.h"
```

- JavaScript에서 네이티브 모듈 사용

이제 JavaScript 코드에서 네이티브 모듈을 사용할 수 있습니다.



```js
import React, { Component } from 'react';
import { View, Text, NativeModules } from 'react-native';

const { DeviceInfo } = NativeModules;

class App extends Component {
  state = {
    deviceInfo: {}
  };

  componentDidMount() {
    DeviceInfo.getDeviceInfo((error, info) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({ deviceInfo: info });
      }
    });
  }

  render() {
    const { deviceInfo } = this.state;
    return (
      <View style={ flex: 1, justifyContent: 'center', alignItems: 'center' }>
        <Text>기기 모델: {deviceInfo.device}</Text>
        <Text>OS 버전: {deviceInfo.OS}</Text>
      </View>
    );
  }
}

export default App;
```

이 React 컴포넌트는 네이티브 모듈에서 불러온 기기 정보를 표시합니다.

## 결론

React Native에서 네이티브 모듈을 생성하는 것은 플랫폼별 코드를 활용하여 앱의 기능을 확장하는 강력한 방법입니다. 이 단계를 따르면 네이티브 기능에 액세스하여 모바일 애플리케이션을 효과적으로 강화할 수 있습니다. 즐거운 코딩하세요!




참고 : https://reactnative.dev/docs/native-modules-android