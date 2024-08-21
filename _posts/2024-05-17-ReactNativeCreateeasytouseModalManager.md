---
title: "리액트 네이티브로 모달을 윕게 사용할 수 있는 Modal Manager 만들기"
description: ""
coverImage: "/assets/img/2024-05-17-ReactNativeCreateeasytouseModalManager_0.png"
date: 2024-05-17 21:03
ogImage:
  url: /assets/img/2024-05-17-ReactNativeCreateeasytouseModalManager_0.png
tag: Tech
originalTitle: "React Native | Create easy to use Modal Manager"
link: "https://medium.com/@davidecarizzoni/react-native-create-easy-to-use-modal-manager-f5cb41020dbd"
isUpdated: true
---

<img src="/assets/img/2024-05-17-ReactNativeCreateeasytouseModalManager_0.png" />

안녕하세요, 개발자 여러분!

오늘은 React Native에서 모달을 가장 간편하고 편리하게 사용하는 방법에 대해 알아보겠습니다! React Native에서 모달을 사용하는 전통적인 방법은 각 화면이나 컴포넌트마다 "Modal" 컴포넌트와 해당 props를 정의하는 것이 일반적입니다. 이는 종종 모달이 사용되는 문맥에 높은 결합도를 가지는 문제로 이어질 수 있습니다.

보통 확인 또는 다른 복잡한 동작에 모달을 사용하는 각 화면에서는 useState를 사용하여 가시성 상태를 정의합니다 (전통적인 [visible, setVisible] = useState(false) 방식), 이를 통해 모달이 화면에 표시되는지 여부를 컨트롤합니다. 이 방법은 개발 속도를 크게 늦추고 유연성과 재사용성을 저하시키는 요소로 인식됩니다.

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

이 문제를 해결하기 위해 간단하고 효율적인 방법으로 모달 가시성을 관리하는 방법을 고안했습니다.

화면 중앙에 표시되는 모달과 화면 하단에 고정된 모달을 위한 두 가지 다른 구성을 채택했습니다.

그러니, 프로젝트 구조를 설정해 보겠습니다. 먼저 프로젝트의 src 디렉토리 내에 "modal-manager" 폴더를 추가하는 것으로 시작하겠습니다.

![모달 매니저](/assets/img/2024-05-17-ReactNativeCreateeasytouseModalManager_1.png)

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

보시다시피, 프로젝트를 최적으로 관리할 수 있는 간단하고 조직적인 구조를 만드는 것이 매우 중요합니다.

최종 결과물로서, 모달을 메인 파일(예: App.tsx)에 삽입한 다음 간단한 방법으로 어디서든 사용할 수 있습니다.

필요한 종속성은 "react-native-modal"뿐입니다. 따라서 모든 것이 올바르게 작동하도록 하려면 선호하는 패키지 관리자에 따라 npm 또는 yarn을 사용하여 라이브러리를 설치해야 합니다(저는 yarn을 선호합니다).

여기에서는 나중에 사용할 모달을 어디에 어떻게 정의하는지에 대한 예제가 있습니다.

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

```jsx
  import { NavigationContainer } from '@react-navigation/native';
  import Modal, { BaseCenterModalContainer, BaseBottomModalContainer } from "./src/modal-manager";

  export const App = () => {

   const showCenteredModal = () => {
     Modal.show({
       children: (
         <BaseCenterModalContainer style={ height: 400, backgroundColor: 'white' }>
           <Text>Center modal</Text>
         </BaseCenterModalContainer>
       ),
       dismissable: true,
       position: 'center',
     });
   };


   return (
     <NavigationContainer>
       <Modal />
       {children}
     </NavigationContainer>
   )
  }
```

위에서 볼 수 있듯이, 모달을 사용하는 두 가지 예제가 있습니다. 간단하게 사용하기 위해 App.tsx 파일에 배치되었지만, 프로젝트의 어디에서든 "Modal.show" 및 "Modal.hide" 메소드를 사용할 수 있습니다.

더불어, 모든 코드를 TypeScript로 작성하여 더 깨끗하고 재사용 가능한 코드를 구현하였습니다.

두 가지 방법으로 모달을 표시할 수 있는 옵션이 있습니다.

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

1 — 화면 하단에

```js
Modal.show({
 children: (
   <BaseBottomModalContainer style={ height: 400, backgroundColor: 'white' }>
     <Text>Center modal</Text>
    </BaseBottomModalContainer>
  ),
  dismissable: true,
  position: 'bottom',
});
```

<img src="/assets/img/2024-05-17-ReactNativeCreateeasytouseModalManager_2.png" />

2 — 화면 중앙에 위치

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
Modal.show({
    children: (
      <BaseCenterModalContainer style={ height: 400, backgroundColor: 'white' }>
        <Text>Center modal</Text>
      </BaseCenterModalContainer>
    ),
    dismissable: true,
    position: 'center',
  });
```

![Modal Manager](/assets/img/2024-05-17-ReactNativeCreateeasytouseModalManager_3.png)

두 경우 모두 세 가지 주요 속성이 있습니다:

- children ⇒ 모달의 콘텐츠를 나타냅니다. 예를 들어, 간단한 텍스트를 삽입했습니다.
- dismissable ⇒ 배경을 탭하여 모달을 닫을 수 있는지 여부를 나타냅니다.
- position ⇒ 모달의 위치를 지정합니다. 이는 중앙 또는 하단일 수 있습니다. 이 두 값 중 하나를 사용할 때는 기본적인 스타일을 쉽게 오버라이드할 수 있는 BaseCenterModalContainer 또는 BaseBottomModalContainer 컴포넌트를 사용할 수도 있습니다.

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

또한, 이전 구성 요소를 사용하지 않고도 모달에 표시해야 하는 구성 요소를 간단히 전달할 수도 있습니다.

자 이제 다양한 부분들을 자세히 살펴보겠습니다.

types/index.tsx

모달에 대한 모든 유용한 유형은 이 파일 내에서 정의되어 있습니다.

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
import { ReactNode } from "react";
import { StyleProp } from "react-native";

export type ReactChildren = ReactNode;

export type ModalData = {
  children: ReactChildren,
};

export type ModalOptions = {
  dismissable: boolean,
  animated?: boolean,
  position: "center" | "bottom",
};

export type ModalShowParams = ModalData & ModalOptions;

export type ModalHideParams = {};

export type ModalRef = {
  show: (params: ModalShowParams) => void,
  hide: (params?: ModalHideParams) => void,
};

export type ModalConfig = {
  style?: StyleProp<any>,
};

export type ModalProps = {
  config?: ModalConfig,
};
```

컴포넌트 관련해서는 세 가지가 있습니다.

이 중에서 가장 중요한 것은 모달의 기본 시각적 디자인을 캡슐화하고 있습니다. 특히 화면의 중앙이나 하단에 모달이 표시될지를 결정합니다.

ModalUI.tsx

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
import { Dimensions, StyleSheet } from "react-native";
import { ModalConfig, ModalData, ModalHideParams, ModalOptions, ModalShowParams } from "../types";
import RNModal from "react-native-modal";
import { useCallback } from "react";

export type ModalUIProps = {
  isVisible: boolean,
  options: ModalOptions,
  data: ModalData,
  show: (params: ModalShowParams) => void,
  hide: (params: ModalHideParams) => void,
  config?: ModalConfig,
  onHide: () => void,
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export const ModalUI = ({ isVisible, data, options, hide, onHide, config }: ModalUIProps) => {
  const { children } = data;
  const { style } = config || {};
  const { dismissable, position, animated } = options;

  const onBackdropPress = useCallback(() => {
    if (dismissable) {
      hide({});
    }
  }, []);

  if (!children) {
    return null;
  }

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={isVisible}
      useNativeDriver
      deviceHeight={SCREEN_HEIGHT}
      deviceWidth={SCREEN_WIDTH}
      style={[modalPositionStyles[position], styles.modal, style]}
      onBackdropPress={onBackdropPress}
      avoidKeyboard={false}
      onModalHide={onHide}
      backdropOpacity={0.4}
    >
      {children}
    </RNModal>
  );
};

const modalPositionStyles = StyleSheet.create({
  center: {
    justifyContent: "center",
    margin: 20,
  },
  bottom: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

const styles = StyleSheet.create({
  modal: {},
});
```

이 컴포넌트는 React Native에서 모달의 시각적 측면을 관리합니다. 다음은 이 컴포넌트의 역할입니다:

2. 초기 설정:

- 모달의 표시 상태, 표시할 데이터, 모달 구성 옵션, 모달을 숨기는 함수 및 모달 닫기 이벤트를 처리하는 콜백 함수와 같은 props를 받습니다.

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

2. 이벤트 처리:

- 모달이 닫힐 수 있도록 설정되어 있으면 (dismissable), 모달 바깥 영역을 탭하면 모달을 숨기는 함수가 정의됩니다 (onBackdropPress).

3. 모달 렌더링:

- 모달의 내용은 존재하는 경우에만 조건부로 렌더링됩니다 (children). 표시할 데이터가 없는 경우에는 컴포넌트가 null을 반환합니다.
- 모달을 생성하기 위해 react-native-modal 컴포넌트를 사용합니다.
- 모달의 위치 (가운데 또는 아래)에 기본 스타일을 적용하고, config prop을 통해 제공된 스타일을 통해 사용자 정의를 허용합니다.

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

4. 미리 정의된 스타일:

- 화면 중앙 또는 하단에 모달을 위치시키기 위해 두 세트의 스타일을 정의합니다.

5. 모달 상태 관리:

- 모달은 화면 크기를 상태의 일부로 수신하여 다양한 기기 크기에 적절하게 적응합니다.

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

요약하자면, 이 컴포넌트는 리액트 네이티브에서 모달을 유연하고 구성 가능하게 표시하는 인프라를 제공하며, 애플리케이션 요구에 맞는 외관 및 동작을 사용자화할 수 있습니다.

BaseBottomModalContainer.tsx

이 간단한 컴포넌트는 하단 모달에서 일반적으로 사용되는 기본 스타일을 정의하는 곳입니다. 예를 들어, 둥근 테두리 등이 있습니다.

```js
import { StyleSheet, ViewProps } from "react-native";

export const BaseBottomModalContainer = ({ children, style, ...props }: ViewProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
});
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

테이블 태그를 Markdown 형식으로 변경해주세요.

BaseCenterModalContainer.tsx

```js
import { StyleSheet, View, ViewProps } from "react-native";

export const BaseCenterModalContainer = ({ children, style, ...props }: ViewProps) => {
  return (
    <View style={StyleSheet.compose(styles.container, style)} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20
  }
}
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

```js
import { useCallback, useState } from 'react';
import { ModalData, ModalOptions, ModalProps, ModalShowParams } from '../types';
import { mergeIfDefined } from '../utils/obj.ts';

export type UseModalParams = {
  defaultOptions: Omit<ModalProps, 'config'>;
};

const DEFAULT_OPTIONS: ModalOptions = {
  dismissable: true,
  position: 'center',
  animated: false
};

export const useModal = ({ defaultOptions }: UseModalParams) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<ModalData>({
    children: null,
  });

  const initialOptions = mergeIfDefined(
    DEFAULT_OPTIONS,
    defaultOptions,
  ) as Required<ModalOptions>;

  const [options, setOptions] = useState<ModalOptions>(initialOptions);

  const show = useCallback(
    (params: ModalShowParams) => {
      setData({
        children: params.children ?? null,
      });
      setOptions({
        dismissable: params.dismissable ?? initialOptions.dismissable,
        position: params.position ?? initialOptions.position,
        animated: params.animated,
      });
      setIsVisible(true);
    },
    [initialOptions],
  );

  const hide = useCallback(() => {
    setIsVisible(false);
  }, [initialOptions]);

  const onHide = useCallback(() => {
    setData({
      children: null,
    });
    setOptions(initialOptions);
  }, [initialOptions]);

  return {
    isVisible,
    show,
    hide,
    data,
    options,
    onHide,
  };
};
```

이 useModal이라는 훅은 모달을 관리하기 위해 설계되었습니다. 다음은 이 훅이 하는 일입니다:

- 상태 관리: 현재 모달이 표시 중인지 여부를 나타내는 상태(isVisible) 및 모달 내부에 표시할 데이터(data)를 유지합니다.
- 기본 옵션: 모달의 기본 옵션을 지정할 수 있으며, 모달이 닫힐 수 있는지(dismissable), 위치(position), 애니메이션 여부(animated) 등을 설정할 수 있습니다.
- 모달 표시: show 함수를 사용하여 제공된 매개변수로 모달을 표시합니다. 제공된 매개변수에 기반하여 모달 데이터와 옵션을 업데이트하고 isVisible을 true로 설정합니다.
- 모달 숨기기: hide 함수는 현재 표시 중인 모달을 숨기는 데 사용됩니다. isVisible를 false로 설정합니다.
- 숨김 콜백: onHide 함수는 모달이 숨겨질 때 트리거되는 콜백입니다. 모달 데이터와 옵션을 초기 값으로 재설정합니다.

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

Modal.tsx

```js
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { ModalHideParams, ModalProps, ModalRef, ModalShowParams } from "./types";
import { useModal } from "./hook/useModal.ts";
import { ModalUI } from "./components";

const ModalRoot = forwardRef((props: ModalProps, ref) => {
  const { config, ...defaultOptions } = props;
  const { show, hide, isVisible, options, onHide, data } = useModal({
    defaultOptions,
  });

  // This must use useCallback to ensure the ref doesn't get set to null and then a new ref every render.
  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show,
        hide,
      }),
      [hide, show]
    )
  );

  return (
    <ModalUI
      isVisible={isVisible}
      options={options}
      data={data}
      hide={hide}
      onHide={onHide}
      show={show}
      config={config}
    />
  );
});

type ModalRefObj = {
  current: ModalRef | null,
};

let refs: ModalRefObj[] = [];

/**
 * Adds a ref to the end of the array, which will be used to show the toasts until its ref becomes null.
 *
 * @param newRef the new ref, which must be stable for the life of the Toast instance.
 */
function addNewRef(newRef: ModalRef) {
  refs.push({
    current: newRef,
  });
}

/**
 * Removes the passed-in ref from the file-level refs array using a strict equality check.
 *
 * @param oldRef the exact ref object to remove from the refs array.
 */
function removeOldRef(oldRef: ModalRef | null) {
  refs = refs.filter((r) => r.current !== oldRef);
}

export function Modal(props: ModalProps) {
  const ModalRef = (useRef < ModalRef) | (null > null);

  /*
    This must use `useCallback` to ensure the ref doesn't get set to null and then a new ref every render.
    Failure to do so will cause whichever Toast *renders or re-renders* last to be the instance that is used,
    rather than being the Toast that was *mounted* last.
  */
  const setRef = useCallback((ref: ModalRef | null) => {
    // Since we know there's a ref, we'll update `refs` to use it.
    if (ref) {
      // store the ref in this toast instance to be able to remove it from the array later when the ref becomes null.
      ModalRef.current = ref;
      addNewRef(ref);
    } else {
      // remove this toast's ref, wherever it is in the array.
      removeOldRef(ModalRef.current);
    }
  }, []);

  return <ModalRoot ref={setRef} {...props} />;
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find((ref) => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}

Modal.show = (params: ModalShowParams) => {
  getRef()?.show(params);
};

Modal.hide = (params?: ModalHideParams) => {
  getRef()?.hide(params);
};
```

이 파일은 모달 컴포넌트를 설정하여 `Modal/`을 선언한 후 필요에 따라 표시하거나 숨길 수 있게 합니다. 기능을 자세히 살펴보겠습니다:

- ModalRoot 컴포넌트:

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

- 이 컴포넌트는 ref를 전달받을 수 있도록 forwardRef를 사용하여 정의되었습니다.
- Modal의 상태를 관리하는 useModal 훅을 활용하여 시각적 효과, 옵션 및 데이터를 포함합니다.
- useImperativeHandle을 사용하여 ref가 모달을 조작하는 show 및 hide와 같은 필수 기능만 노출되도록 합니다.

2. 모달 컴포넌트:

- 사용자가 상호작용하는 컴포넌트입니다. ModalRoot 컴포넌트를 감싸고 ref를 관리합니다.
- setRef 함수를 사용하여 ref가 올바르게 업데이트되고 나중에 사용하기 위해 저장됩니다.

3. Ref 관리:

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

- `addNewRef`은 새 모달이 생성될 때 refs 배열에 새 ref를 추가합니다.
- `removeOldRef`는 모달이 파괴될 때 배열에서 ref를 제거합니다.

4. 정적 메서드:

- `Modal.show`과 `Modal.hide`는 Modal 컴포넌트에 연결된 정적 메서드입니다.
- 이들은 활성 모달 인스턴스를 찾기 위해 refs 배열을 활용하고 해당하는 show 또는 hide 메서드를 호출합니다.

이 파일은 React Native 애플리케이션에서 모달을 관리하는 논리를 캡슐화합니다. 사용자는 `Modal/` 컴포넌트 하나로 모달을 쉽게 생성하고 제어할 수 있으며, 모달을 표시하고 숨기는 정적 메서드가 포함되어 있습니다.

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

여기까지 왔네요! 이 모달 관리 시스템을 구현함으로써 프로세스를 보다 효율적이고 직관적으로 만들었습니다. 이 방식의 모듈성을 통해 표시 및 상호 작용 방식을 우리의 특정 요구에 쉽게 적응시킬 수 있습니다. 더 많은 통찰력과 코딩을 더 부드럽고 빠르게 만들어줄 새로운 도구를 업데이트하는 방법을 계속 따라와 주세요. 이 여정에 함께해줘서 감사합니다!

즐거운 코딩하세요!

소스 코드: https://github.com/davidecarizzoni/react-native-modal-manager

Linkedin 프로필: https://www.linkedin.com/in/davide-carizzoni/
