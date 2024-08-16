---
title: "리액트 네이티브 이미지 피커 구현에 대한 심층 탐구"
description: ""
coverImage: "/assets/img/2024-05-12-DeepDiveintoImplementingreact-native-image-picker_0.png"
date: 2024-05-12 22:16
ogImage: 
  url: /assets/img/2024-05-12-DeepDiveintoImplementingreact-native-image-picker_0.png
tag: Tech
originalTitle: "Deep Dive into Implementing react-native-image-picker"
link: "https://medium.com/@mmokgosi9/deep-dive-into-implementing-react-native-image-picker-c1567484a53"
isUpdated: true
---




<img src="/assets/img/2024-05-12-DeepDiveintoImplementingreact-native-image-picker_0.png" />

현대 애플리케이션에서 사용자가 프로필에 사진을 업로드할 수 있는 기능을 제공하는 것은 표준입니다. 사용자들이 계속해서 앱을 방문할 수 있도록 최상의 경험을 제공하는 것이 매우 중요합니다.

React-Native로 모바일 앱을 개발 중이라면, react-native-image-picker 덕분에 이것을 아주 쉽게 구현할 수 있습니다.

# 내 앱은 어떤 이미지 형식을 지원해야 할까요?



첫 번째로 해야 할 질문은 "내 앱이 지원해야 하는 이미지 유형은 무엇인가?"입니다. 다양한 이미지 유형이 존재하며, 모든 종류의 사람들을 대상으로 하는 앱을 원한다면 특히 혼란스럽고 압도될 수 있습니다. React Native는 이를 우리에게 아주 쉽게 만들어줍니다.

그래서 선택지를 좁힐 수 있습니다. 이 목록에 언급되지 않은 것 중 하나는 Base64입니다. Base64는 이진 데이터를 나타내는 이진-텍스트 인코딩 체계의 한 그룹입니다.

# React-Native-Image-Picker

## React Native Image Picker란 무엇인가요?



React-Native-Image-Picker은 React Native 모듈로, 기기 라이브러리에서 미디어를 선택하거나 직접 카메라에서 가져 올 수 있도록 네이티브 UI를 사용할 수 있게 해줍니다. 현재 약 60,000명의 개발자가 사용 중이며, 제공되는 기능이 매우 견고하기 때문에 많은 사람들이 사용하고 있습니다.

## React-Native-Image-Picker 설치 및 설정하는 방법

먼저 패키지를 프로젝트에 설치합니다:

Android:



```js
yarn add react-native-image-picker
```

iOS:

```js
npx pod-install ios
```

react-native-image-picker 레포지토리에는 몇 가지 추가 설치 단계에 대한 조언이 있습니다. 그 중 일부는 다음과 같습니다:
사용자가 사진 또는 비디오를 선택할 수 있도록 하는 경우 NSPhotoLibraryUsageDescription을 추가하세요.



iOS

Android

`saveToPhotos` 속성을 `true`로 설정하지 않는 한 권한이 필요하지 않습니다.

iOS의 권한은 다음과 같이 test 폴더 내의 Info.plist 파일에 들어갑니다:



```js
<key>NSPhotoLibraryUsageDescription</key>
 <string>$(PRODUCT_NAME)님의 사진 갤러리에 접근하려고 합니다</string>
<key>NSCameraUsageDescription</key>
 <string>$(PRODUCT_NAME)님의 카메라를 사용하려고 합니다</string>
```

## Android의 권한은 AndroidManifest.xml 파일에 작성해주세요 :

React-Native-Image-Picker 모듈은 사용자에게 작동을 위해 권한이 필요하지 않지만, 사용자가 앱에서 촬영한 이미지를 갤러리에 저장하는 옵션을 설정한 경우, 다음 권한이 필요합니다:

```js
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```



위에서 사용자에게 겔러리 접근 권한과 애플리케이션에서 캡처한 이미지를 사용자의 갤러리에 저장할 것인지에 대한 동의를 요청하는 것입니다.

## React-Native-image-Picker 구현하기

프로필 컴포넌트 Profile.js를 생성하십시오. react-native-image-picker에는 사용할 수 있는 두 가지 메서드가 있습니다. launchCamera()는 카메라를 실행하여 사진을 찍고, launchImageLibrary()는 갤러리를 실행하여 사진이나 비디오를 선택합니다. 이를 파일에 import할 것입니다.

launchLibrary 메서드는 사용자의 갤러리를 열고 이미지 설정과 응답 두 가지 매개변수를 사용합니다.



`launchCamera` 메소드는 사용자의 카메라를 실행하며 이미지의 구성 및 응답에 대한 두 개의 매개변수를 가져옵니다.

`pickerResponse` 상태 변수는 이미지 피커에서의 응답을 저장하는 데 사용됩니다. `imageFromDB` 상태 변수는 데이터베이스에서 이미지를 저장하여 나중에 액세스할 수 있도록 합니다.

Image 컴포넌트는 다음과 같이 사용됩니다:

```js
<Card style=//카드 스타일, 특히 이미지에 고도를 원하는 경우>
    <Image
        source={
          uri: `data:image/*;base64,${imageFromDB}`,
          width: ..,
          height: ...,
        }
        style=//추가 이미지 스타일
    />
</Card>
```



이 코드 라인

```js
uri: `data:image/*;base64,${imageFromDB}`,
```

은 우리가 데이터베이스에서 이미지를 렌더링하는 데 `uri` 속성을 사용하고 `image/*`가 지정된 이미지 유형을 렌더링하도록 보장합니다.

또한 사용자가 갤러리 또는 카메라에 액세스하여 이미지를 업로드할 수 있도록 모달을 활성화하는 프레서블 아이콘을 추가할 수도 있습니다.



```js
 <Pressable
    style={({ pressed }) => [
        {
            ...styles.cameraIconView,
            opacity: pressed ? 0.5 : 1,
        },
    ]}
    onPress={() => setVisible(true)}
>
    <IconComponent
        source={icons.camera}
        tintColor={themeColor.primaryWhite}
    />
</Pressable>
```

저희는 프로필 컴포넌트에 모달을 넣고 필요한 모든 속성을 전달하고 싶어요.

```js
<ImagePickerModal
    isVisible={visible}
    onClose={() => setVisible(false)}
    onImageLibraryPress={onImageGalleryPress}
    onCameraPress={onCameraPress}
/>
```

마지막으로 ImagePickerModal 컴포넌트를 만들어야 할 것입니다.



데이터베이스로 이미지를 그대로 보내기보다 base64 이미지를 사용하는 이유를 궁금해하는 분들을 위해, base64 인코딩을 사용하면 데이터 크기를 최대 33%까지 줄일 수 있으며 많은 프로그래밍 언어가 base64 인코딩을 내장 지원하고 있습니다.

# 페이지 상태에 따라 이미지를 조건부로 렌더링하기

이미지를 렌더링하기 위해 우리는 다음 3가지 경우를 살펴볼 것입니다:

- 사용자가 로그인하지 않았을 때
- 사용자가 로그인했지만 프로필 이미지가 없는 경우
- 사용자가 로그인하고 프로필 이미지가 있는 경우
- 사용자가 로그인하고 방금 프로필 이미지를 변경한 경우



```js
userLoggedIn ? {
  uri ? (
    <Card style={styles.userDBImageView}>
        <Image
            source={
                uri: uri,
                width: styles.userDBImage.width,
                height: styles.userDBImage.height,
            }
            style={styles.userDBImage}
        />
    </Card>
) : imageFromDB ? (
    <Card style={styles.userDBImageView}>
        <Image
            source={
                uri: `data:image/*;base64,${imageFromDB}`,
                width: styles.userDBImage.width,
                height: styles.userDBImage.height,
            }
            style={styles.userDBImage}
            // tintColor={colors.primaryWhite}
        />
    </Card>
) : (
    <Card
        style={
            ...styles.userImageView,
            marginTop: '8%',
            width: '25%',
        }
    >
        <Image
            source={icons.profileImage}
            style={styles.userImage}
            tintColor={colors.primaryWhite}
        />
    </Card>
)
) : (
<Card style={styles.userImageView}>
    <Image
        source={icons.profileImage}
        style={styles.userImage}
        tintColor={colors.primaryWhite}
    />
</Card>
         )
}
```

## 사용자가 로그인하지 않은 경우

마지막 컴포넌트는 사용자가 로그인하지 않았을 때 호출될 것이므로 해당 이미지의 소스는 기본/대체 이미지여야합니다.

## 사용자는 로그인했지만 프로필 이미지가 없습니다



사용자가 로그인했지만 프로필 이미지가 없는 경우, 코드에서 두 번째로 나타나는 그림과 동일한 이미지를 표시할 것입니다.

## 사용자가 로그인하고 프로필 이미지가 있는 경우

두 번째 구성 요소는 사용자가 로그인했는지와 데이터베이스에서 이미지를 가지고 있는지 확인한 후 렌더링됩니다.

## 사용자가 로그인하고 방금 프로필 이미지를 변경한 경우



이 코드 조각은 먼저 사용자가 uri 변수를 사용하여 새 이미지를 선택/캡처했는지 확인합니다. uri에 값이 있는 경우, 삼항 연산자에서 다른 변수들 보다 우선순위가 높기 때문에 즉시 표시됩니다.

# 결론

react-native-image-picker를 사용하면 이미지 업로드 기능을 쉽게 구현할 수 있습니다. 사용자가 이미지와 비디오를 업로드할 수 있는 애플리케이션을 쉽게 구축할 수 있을 정도로 강력합니다. 사용자 경험을 즐겁게 만들어주지만, 더 중요한 점은 개발자 경험까지 더욱 즐겁게 만들어준다는 것입니다.