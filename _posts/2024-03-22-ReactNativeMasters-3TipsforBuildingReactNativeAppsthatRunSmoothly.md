---
title: "성능 좋은 React 네이티브 앱을 만들기 위한 팁 5가지"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "React Native Masters-3 Tips for Building React Native Apps that Run Smoothly"
link: "https://blog.stackademic.com/react-native-masters-tips-for-building-react-native-apps-that-run-smoothly-ec41c749e54b"
isUpdated: true
---

슈퍼 빠른 React Native 앱을 만드는 것은 퍼즐 맞추기와 비슷해요 — 올바른 조각들을 올바른 자리에 놓아야 해요. 이 블로그 포스트에서는 React Native 앱을 매우 잘 작동하도록 만드는 몇 가지 유용한 팁과 트릭을 공유할 거예요. 코딩 전문가이든 막 시작한 사람이든, 이 아이디어들은 앱 개발 여정을 훨씬 더 부드럽게 만들어 줄 거예요. 함께 시작해 보면서 멋진 React Native 앱을 만드는 방법을 알아볼까요?

![링크](/assets/img/React-Native-Masters-3:-Tips-for-Building-React-Native-Apps-that-Run-Smoothly_0.png)

## 1. 렌더 최적화:

- 클래스 컴포넌트의 경우 PureComponent를 사용하여 shouldComponentUpdate 메서드를 자동으로 구현하여 props와 state를 얕은 비교하는 효과를 얻을 수 있어요.
- 함수형 컴포넌트의 경우 React.memo 고차 컴포넌트를 사용하여 비슷한 효과를 얻을 수 있어요.

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
// 클래스 컴포넌트
class MyComponent extends React.PureComponent {
  // ...
}

// 함수형 컴포넌트
const MyFunctionalComponent = React.memo((props) => {
  // ...
});
```

- 컴포넌트가 불필요하게 다시 렌더링되지 않도록 확인하세요. 부모 컴포넌트가 다시 렌더링되면 자식 컴포넌트도 프롭스나 상태가 변경되지 않았더라도 강제로 다시 렌더링될 수 있습니다.

## 2. 목록에 FlatList 또는 SectionList 사용하기:

- React Native은 가상 목록(FlatList와 유사한)을 제공하여 뷰포트에 있는 항목만 렌더링하여 대규모 데이터 세트의 성능을 향상시킵니다. 긴 목록의 경우 ScrollView 대신에 현재 화면에 보이는 항목만 효율적으로 렌더링하기 위해 FlatList 또는 SectionList를 사용하세요.

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

## 3. 이미지 최적화:

- 이미지를 압축하고 최적화하여 파일 크기를 줄입니다. ImageOptim이나 TinyPNG과 같은 도구를 사용할 수 있습니다.
- Image 구성 요소의 resizeMode 속성을 사용하여 이미지의 크기 조절을 제어할 수 있습니다.
- FastImage와 같은 이미지 로딩 라이브러리를 사용하여 로딩 성능을 향상시키고 이미지를 성능적으로 캐싱하는 것을 고려해보세요. 또한, 해당 라이브러리의 lazy loading 기능을 사용할 수 있습니다. FastImage는 우선 순위 설정뿐만 아니라 이미지 로딩 우선 순위, 이미지 사전로드, 로드 이벤트 등 추가 기능을 지원합니다. 더 고급 사용법에 대해서는 공식 문서를 참고해주세요: react-native-fast-image

```js
import React from 'react';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

const YourComponent = () => {
  return (
    <View>
      {/* 일반 Image 구성 요소 */}
      <Image source={ uri: 'https://example.com/image.jpg' } style={ width: 200, height: 200 } />

      {/* FastImage 구성 요소 */}
      <FastImage
        source={
          uri: 'https://example.com/image.jpg',
          priority: FastImage.priority.high,
        }
        style={ width: 200, height: 200 }
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default YourComponent;
```

## 4. 모든 것에 Redux 사용을 피하세요:

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

리덕스는 리액트에서 큰 작업을 처리하는 강력한 도구 상자와 비슷해요. 하지만 모든 상황에 항상 최적의 선택은 아닙니다. 서버 상태를 관리하면서도 모든 것에 리덕스를 사용하는 것은 필요 이상으로 복잡해질 수 있어요. 불필요하게 추가 코드와 규칙을 더하면 개발이 더디어질 수 있어요. 대신, 간단한 작업에는 리액트의 useState와 Context API와 같은 기본 도구를 사용하는 것이 더 나아요. 또는 Tanstack Query와 같은 서버 상태를 관리하기 위한 간단한 대안을 사용하는 것도 좋은 방법이에요. 프로젝트의 규모와 사용하는 도구 사이의 적절한 균형을 찾으면 작업을 간단하고 효율적으로 처리할 수 있어요.

## 5. Hermes JavaScript 엔진을 선호하세요:

Hermes는 안드로이드에서 리액트 네이티브 앱을 실행하는 데 최적화된 JavaScript 엔진입니다. 리액트 네이티브와 함께 제공되는 기본 JavaScriptCore 엔진의 대안으로 작용해요. Hermes가 이러한 장점을 제공하는 반면, 그 영향은 앱의 특정 사항과 대상 사용자에 따라 다를 수 있어요. 특히 Hermes를 활성화하여 앱을 완전히 테스트하고 호환성을 보장하며 특정 사용 사례에 대한 성능 이점을 평가하는 것이 권장됩니다. 리액트 네이티브 프로젝트에서 Hermes를 사용하는 몇 가지 장점은 다음과 같아요:

- 시작 성능 향상: Hermes는 앱 시작 시간을 빠르게 제공하도록 설계되었어요. 빌드 프로세스 중에 JavaScript 코드를 최적화하여 구문 분석 및 초기화 시간을 줄이는 결과를 얻을 수 있어요.
- 작은 앱 크기: Hermes는 불필요한 런타임 기능을 제거하고 더 효율적인 바이트 코드 형식을 사용하여 JavaScript 번들을 최적화해요. 이는 제한된 대역폭이나 저장 공간을 가진 사용자에게 중요한 작은 앱 크기로 이어질 수 있어요.
- 메모리 사용량 감소: Hermes는 효율적인 메모리 사용으로 유명합니다. React Native 앱의 전체 메모리 풋프린트를 낮출 수 있어요. 이는 제한된 RAM을 가진 디바이스에 특히 유용합니다.
- 배터리 수명 향상: JavaScript 실행을 최적화함으로써 Hermes는 모바일 장치의 배터리 수명을 향상시킬 수 있어요. 처리 시간과 메모리 사용량을 줄이면 장치의 자원에 덜 부담을 줄 수 있어요.
- 최적화된 가비지 수집: Hermes는 앱 실행 중에 중단을 최소화하도록 특별히 설계된 가비지 수집기를 사용해요. 이로 인해 React Native 앱에서 부드러운 애니메이션이나 상호작용이 가능해질 수 있어요.
- 하위 Android 장치와의 더 나은 호환성: Hermes는 성능을 최적화하여 하위 Android 장치에서 더 나은 사용 경험을 제공합니다. 이로써 앱이 더 넓은 범위의 장치에서 부드러운 경험을 제공할 수 있어요.
- 커뮤니티 지원: Hermes는 React Native 커뮤니티에서 인기를 얻고 있으며 Facebook에 의해 적극적으로 유지보수됩니다. 이는 지속적인 업데이트, 버그 수정 및 React Native의 최신 기능에 대한 지원을 보장합니다.
- React Native 디버깅 도구와 호환: 디버깅이 JavaScriptCore를 사용하는 것과 약간 다를 수 있지만 Hermes는 표준 디버깅 도구를 지원해요. Chrome DevTools나 React Native Debugger와 같은 도구를 사용하여 React Native 앱을 디버깅할 수 있어요.

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
