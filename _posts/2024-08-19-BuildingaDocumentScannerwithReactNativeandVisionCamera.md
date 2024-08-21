---
title: "React Native와 Vision Camera를 사용해 문서 스캐너 만드는 방법"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-19 03:32
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Building a Document Scanner with React Native and Vision Camera"
link: "https://medium.com/@hadi311374/building-a-document-scanner-with-react-native-and-vision-camera-2f7cd46b689f"
isUpdated: true
updatedAt: 1724032888001
---

간단하지만 강력한 문서 스캐너를 만드는 과정을 React Native을 사용하여 안내해 드리겠습니다. 카메라 액세스를 위해 react-native-vision-camera 라이브러리와 문서 스캐닝을 위해 @ertan95/react-native-document-scanner 라이브러리를 활용하겠습니다. 이 프로젝트는 모바일 앱에 문서 스캐닝 기능을 구현하려는 누구에게나 완벽합니다.

## 필요 사항

시작하기 전에 다음 사항이 필요합니다:

- React Native에 대한 기본적인 이해.
- React Native 개발 환경 설정 (React Native CLI).
- 노드.js가 설치된 컴퓨터.

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

## 단계 1: 프로젝트 설정하기

먼저, 새로운 React Native 프로젝트를 생성하세요:

```js
npx react-native init DocumentScannerApp
cd DocumentScannerApp
```

그런 다음, 필요한 종속성을 설치하세요:

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
npm install react-native-vision-camera @ertan95/react-native-document-scanner
```

## 단계 2: iOS 및 Android 설정

카메라 권한 요청에 들어가기 전에 따라야 할 플랫폼 별 설정 단계가 있습니다.

### iOS 전용: CocoaPods 설정

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

iOS를 사용하는 경우 필요한 CocoaPods 종속성을 설치하고 Podfile에 작은 추가를 해야합니다.

- 필요한 Pod 추가
- ios/Podfile을 열고 다음 줄을 추가하세요:

```js
pod 'RNPdfScanner', :path => '../node_modules/react-native-document-scanner/ios'
```

- 이를 통해 react-native-document-scanner 라이브러리가 iOS 프로젝트와 올바르게 연결되도록 할 수 있습니다.

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

2. CocoaPods 의존성 설치

- pod을 추가한 후, 프로젝트 디렉토리에서 다음 명령을 실행해주세요:

```js
cd ios && pod install && cd ..
```

이 명령은 react-native-vision-camera 및 다른 라이브러리에서 필요한 모든 네이티브 종속성을 설치합니다.

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

## Android 전용: AndroidManifest.xml 구성

Android를 위해서는 "Manifest 병합 오류"를 피하고 카메라 권한을 요청하기 위해 AndroidManifest.xml 파일을 수정해야 합니다.

- Manifest 헤더 수정

android/app/src/main/AndroidManifest.xml에서 `manifest` 태그를 수정하여 xmlns:tools 속성을 포함하도록 합니다. 이 작업을 완료하면 manifest 헤더가 다음과 같아야 합니다:

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
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.<yourAppName>"
    xmlns:tools="http://schemas.android.com/tools">
```

2. `application` 태그 업데이트

`application` 태그에 tools:replace="android:allowBackup"을 추가하십시오. 이렇게 함으로써 충돌하는 android:allowBackup 속성이 올바르게 처리되도록 할 수 있습니다. 이제 `application` 태그는 다음과 같이 보일 것입니다:

```js
<application
    tools:replace="android:allowBackup"
    android:name=".MainApplication"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    android:allowBackup="false"
    android:theme="@style/AppTheme">
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

3. 카메라 권한 요청 추가

마지막으로, `manifest` 태그 내에 다음 줄을 추가하여 카메라 권한을 요청하십시오:

```js
<uses-permission android:name="android.permission.CAMERA" />
```

이러한 단계를 통해 앱이 iOS와 Android 모두에 대해 제대로 구성되어 일반적인 문제를 피하고 카메라 기능을 원활하게 활용할 수 있도록 할 수 있습니다.

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

## 단계 3: 카메라 권한 요청

카메라에 액세스하려면 사용자로부터 권한이 필요합니다. react-native-vision-camera 라이브러리를 사용하여 이러한 권한을 요청할 것입니다. 다음 코드 스니펫은 카메라 권한을 요청하고 처리하는 방법을 보여줍니다:

```js
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import type { ImageRequireSource } from "react-native";
import { Linking } from "react-native";
import { StyleSheet, View, Text, Image } from "react-native";
import type { CameraPermissionStatus } from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera";
import type { Routes } from "./Routes";

type Props = NativeStackScreenProps<Routes, "PermissionsPage">;
export function PermissionsPage({ navigation }: Props): React.ReactElement {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState < CameraPermissionStatus > "not-determined";

  const requestCameraPermission = useCallback(async () => {
    console.log("카메라 권한 요청 중...");
    const permission = await Camera.requestCameraPermission();
    console.log(`카메라 권한 상태: ${permission}`);

    if (permission === "denied") await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === "granted") navigation.replace("CameraPage");
  }, [cameraPermissionStatus, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Vision Camera에 오신 것을 환영합니다.</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== "granted" && (
          <Text style={styles.permissionText}>
            Vision Camera가 <Text style={styles.bold}>카메라 권한</Text>이 필요합니다.{" "}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              승인
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: "bold",
    maxWidth: "80%",
  },
  banner: {
    position: "absolute",
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  permissionsContainer: {
    marginTop: 1 * 2,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: "#007aff",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
});
```

## 단계 4: 문서 스캐너 통합

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

카메라 권한이 처리되었으므로 문서 스캐너를 통합할 수 있습니다. 이를 위해 @ertan95/react-native-document-scanner 라이브러리를 사용합니다. 아래는 코드 예시입니다:

```js
import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import DocumentScanner from "@ertan95/react-native-document-scanner";

export default function App() {
  const device = useCameraDevice("back");
  const [imageUri, setImageUri] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleDocumentScan = (uri) => {
    setImageUri(uri);
    setIsScanning(false); // 사진을 찍은 후 스캔 중지
  };

  const handleScanButtonPress = () => {
    setIsScanning(true); // 버튼을 누르면 스캔 시작
  };

  if (imageUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.preview} />
        <TouchableOpacity onPress={() => setImageUri(null)} style={styles.button}>
          <Text style={styles.buttonText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (device == null) {
    return <Text>로딩 중...</Text>;
  }

  return (
    <View style={styles.container}>
      {isScanning ? (
        <DocumentScanner
          useBase64
          onPictureTaken={(data) => handleDocumentScan(data.croppedImage)}
          overlayColor="rgba(255,130,0, 0.7)"
          enableTorch={false}
          quality={0.8}
          detectionCountBeforeCapture={8}
          detectionRefreshRateInMs={50}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      )}
      <TouchableOpacity onPress={handleScanButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{isScanning ? "스캔 중..." : "사진 찍기"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  button: {
    alignSelf: "center",
    position: "absolute",
    bottom: 32,
  },
  buttonText: {
    backgroundColor: "rgba(245, 252, 255, 0.7)",
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
```

## 단계 5: 앱 스타일링

앱을 깔끔하게 만들기 위해 기본 스타일을 적용하겠습니다:

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  button: {
    alignSelf: "center",
    position: "absolute",
    bottom: 32,
  },
  buttonText: {
    backgroundColor: "rgba(245, 252, 255, 0.7)",
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  permissions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

## 단계 6: 앱 실행하기

다음 명령어를 사용하여 앱을 실행하세요:

```js
npx react-native run-android
# 또는
npx react-native run-ios
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

이제 완전히 기능하는 문서 스캐너가 있어요! 문서 사진을 찍고, 자동으로 자르고 결과를 표시할 수 있어요.

코딩해 볼까요? 🚀
