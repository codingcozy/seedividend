---
title: "이전 화면으로 돌아갈 때 데이터 전송하기 React Native"
description: ""
coverImage: "/assets/img/2024-06-20-PassDataWhenbacktoPreviousScreenReactNative_0.png"
date: 2024-06-20 05:15
ogImage: 
  url: /assets/img/2024-06-20-PassDataWhenbacktoPreviousScreenReactNative_0.png
tag: Tech
originalTitle: "Pass Data When back to Previous Screen React Native"
link: "https://medium.com/@samirrana-18696/pass-data-when-back-to-previous-screen-react-native-393d80be5f0f"
isUpdated: true
---




리액트 네비게이션에서 navigation.goBack 함수를 사용하면 스택 내비게이터에서 이전 화면으로 돌아갈 수 있어요. 이전 화면으로 돌아갈 때 데이터를 전달하고 싶다면 params 속성과 함께 navigation.goBack 함수를 사용할 수 있어요.

예를 들어:

ScreenA와 ScreenB 두 개의 화면이 있다고 가정해봅시다. ScreenA에서 ScreenB로 이동한 다음 ScreenA로 돌아가면서 데이터를 전달하고 싶다면요.

ScreenA에서:

<div class="content-ad"></div>

```js
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const ScreenA = ({ navigation }) => {
  const [dataFromScreenB, setDataFromScreenB] = useState(null);

  const navigateToScreenB = () => {
    navigation.navigate('ScreenB', {
      onGoBack: (data) => {
        // ScreenB로부터 데이터를 처리하는 콜백 함수
        setDataFromScreenB(data);
      },
    });
  };

  return (
    <View>
      <Text>ScreenB로부터의 데이터: {dataFromScreenB}</Text>
      <Button title="ScreenB로 이동" onPress={navigateToScreenB} />
    </View>
  );
};

export default ScreenA;
```

```js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const ScreenB = ({ route, navigation }) => {
  const [dataToSendBack, setDataToSendBack] = useState('');

  const handleGoBack = () => {
    // onGoBack 콜백을 사용해 ScreenA로 데이터 전달
    route.params.onGoBack(dataToSendBack);
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        placeholder="데이터 입력"
        value={dataToSendBack}
        onChangeText={(text) => setDataToSendBack(text)}
      />
      <Button title="데이터와 함께 돌아가기" onPress={handleGoBack} />
    </View>
  );
};

export default ScreenB;
```

이 예시에서:
- ScreenA는 navigation.navigate를 사용하여 ScreenB로 이동하고 매개변수로 콜백 함수(onGoBack)를 전달합니다.
- ScreenB는 navigation route에서 콜백 함수를 추출하고 이를 사용하여 되돌아갈 때 ScreenA로 데이터를 전달합니다.

<div class="content-ad"></div>

이 패턴은 navigation.goBack를 사용할 때 자식 화면(ScreenB)에서 부모 화면(ScreenA)로 데이터를 전달할 수 있는 방법입니다. 코드를 귀하의 특정 사용 사례와 데이터 요구 사항에 맞게 조정해주세요.

감사합니다!!!