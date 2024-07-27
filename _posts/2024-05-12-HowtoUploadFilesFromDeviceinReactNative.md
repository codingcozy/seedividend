---
title: "React Native에서 기기에서 파일을 업로드하는 방법"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoUploadFilesFromDeviceinReactNative_0.png"
date: 2024-05-12 21:28
ogImage: 
  url: /assets/img/2024-05-12-HowtoUploadFilesFromDeviceinReactNative_0.png
tag: Tech
originalTitle: "How to Upload Files From Device in React Native"
link: "https://medium.com/@sanchit0496/how-to-upload-files-from-device-in-react-native-6206b8cd7aff"
---


사용자들이 갤러리에서 이미지를 선택할 수 있는 기능을 제공하는 모바일 애플리케이션을 개발 중이신데요, React Native는 expo-image-picker를 통해 이를 쉽게 구현할 수 있어요. 이 라이브러리는 사용자들이 카메라 롤에서 기존 사진을 손쉽게 선택하거나 카메라를 통해 새 이미지를 캡처할 수 있는 기능을 제공합니다.

![이미지](/assets/img/2024-05-12-HowtoUploadFilesFromDeviceinReactNative_0.png)

# 설치

시작하기 전에 React Native 프로젝트가 설정되어 있고 Expo와 통합되어 있는지 확인해주세요. Expo는 expo-image-picker 라이브러리를 제공하는데, 이를 통해 기기의 카메라와 사진 라이브러리에 접근할 수 있습니다.



```js
npx expo install expo-image-picker
```

# 코드

```js
import React, { useEffect, useState } from 'react';
import { Button, View, Image, Platform, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Pressable } from 'react-native';


const ImagePickerScreen = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== 'granted') {
          alert('죄송합니다. 이 기능을 사용하려면 카메라 롤 권한이 필요합니다.');
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== 'granted') {
          alert('죄송합니다. 이 기능을 사용하려면 카메라 권한이 필요합니다.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="카메라 롤에서 이미지 선택" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
        <Pressable onPress={navigateProfile}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#003F5C', padding: 25 }}>프로필로 이동</Text>
        </Pressable>
    </View>
  );
};

export default ImagePickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
```

# 코드 설명




이제 코드를 분해하여 각 부분을 이해해 봅시다.

## 필요한 모듈 가져오기

```js
import React, { useEffect, useState } from 'react';
import { Button, View, Image, Platform, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
```

이 섹션에서는 다음을 가져옵니다:



- 기본 기능과 렌더링을 위한 React 훅과 컴포넌트를 사용합니다.
- 이미지 선택을 처리하기 위해 expo-image-picker의 ImagePicker를 사용합니다.
- 화면 전환을 위한 네비게이션 도구를 사용합니다.

```js
const ImagePickerScreen = () => {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  ...
};
```

여기서:

- ImagePickerScreen 함수형 컴포넌트를 정의합니다.
- 선택한 이미지를 관리하기 위해 useState를 사용합니다.
- 네비게이션을 설정합니다.



## 권한을 위한 useEffect 훅

```js
useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryStatus.status !== 'granted') {
        alert('죄송합니다, 이 기능을 사용하려면 사진 라이브러리 권한이 필요합니다!');
      }

      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== 'granted') {
        alert('죄송합니다, 이 기능을 사용하려면 카메라 권한이 필요합니다!');
      }
    }
  })();
}, []);
```

이 코드 블록은 컴포넌트가 마운트된 후 실행되는 useEffect 훅을 사용하고 있습니다:

- 플랫폼 확인:



먼저 플랫폼이 웹 브라우저가 아닌지 확인합니다 (Platform.OS !== `web`). 이것은 권한 처리가 일반적으로 모바일 기기 관련 문제이므로 웹 플랫폼에는 적용되지 않기 때문에 중요합니다.

2. 권한 요청:

미디어 라이브러리 권한: 미디어 라이브러리에 액세스하기 위한 권한을 요청합니다 (ImagePicker.requestMediaLibraryPermissionsAsync()). 이것은 앱이 기기에 저장된 사진에 액세스할 수 있도록 하는 데 필요합니다.

카메라 권한: 마찬가지로, 카메라 사용 권한을 요청합니다 (ImagePicker.requestCameraPermissionsAsync()). 이 권한은 앱이 기기의 카메라를 사용하여 새로운 사진을 찍을 수 있도록 해야 합니다.



3. 권한 상태 처리:

만약 권한이 허용되지 않았을 경우 (상태 !== `granted`), 사용자에게 경고창을 보여줍니다. 이 경고창은 앱이 올바르게 작동하기 위해 이러한 권한이 필요하다는 것을 사용자에게 알리는 간단한 방법입니다.

## 이미지 선택을 위한 pickImage 함수

```js
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    setImage(result.uri);
  }
};
```



이 함수는 기기의 이미지 라이브러리를 열고 사용자가 이미지를 선택할 수 있도록 담당합니다:

- 이미지 라이브러리 열기: ImagePicker.launchImageLibraryAsync은 이미지 라이브러리를 열어주는 비동기 함수입니다.
- 구성:

  - mediaTypes: ImagePicker.MediaTypeOptions.All: 이 설정은 사용자가 사진 및 동영상을 포함한 모든 미디어 유형을 선택할 수 있게 합니다.
  - allowsEditing: true: 사용자는 이미지를 선택하기 전에 (자르기와 같은) 편집할 수 있습니다.
  - aspect: [4, 3]: 이미지 편집기의 종횡비를 설정합니다.
  - quality: 1: 선택한 이미지의 품질을 결정합니다. 여기서 1은 최상의 품질을 의미합니다.

3. 선택 처리:



- 해당 기능은 사용자가 이미지를 선택할 때까지 대기합니다. 이미지를 선택하면 결과 객체에 선택에 관한 세부 정보가 포함됩니다.
- 작업이 취소되지 않은 경우 (!result.cancelled), 이미지 URI는 setImage(result.uri)를 호출하여 컴포넌트의 상태에 저장됩니다. 그런 다음 이 URI를 사용하여 이미지를 표시하거나 서버에 업로드할 수 있습니다.

# 결론

Expo의 Image Picker를 React Native 앱에 통합하면 사용자 경험을 향상시키는 강력한 방법을 시연합니다. 권한을 책임 있게 처리하고 이미지 선택 및 편집을 가능하게 함으로써, 이 앱은 사용자의 개인 정보를 존중할 뿐만 아니라 개인화되고 대화식인 접촉을 제공합니다. 이 기능은 현대적인 모바일 앱에서 중요하며, 사용자 참여를 풍부하게 해주고 앱을 보다 다양하고 사용자 친화적으로 만듭니다

GitHub: https://github.com/sanchit0496/react_native_scaffolding



# 더 많은 정보를 위해 Sanchit의 LinkedIn을 팔로우해 주세요