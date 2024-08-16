---
title: "리액트 네이티브에서 다중 모달 지원하기 새로운 방식"
description: ""
coverImage: "/assets/img/2024-06-20-SupportingMultipleModalsinReactNativeANewApproach_0.png"
date: 2024-06-20 01:20
ogImage: 
  url: /assets/img/2024-06-20-SupportingMultipleModalsinReactNativeANewApproach_0.png
tag: Tech
originalTitle: "Supporting Multiple Modals in React Native: A New Approach"
link: "https://medium.com/whitespectre/supporting-multiple-modals-in-react-native-a-new-approach-a6a4f4ff0339"
isUpdated: true
---




## 여러 모달을 관리하는 것은 React Native의 표준 모달 구현 및 인기있는 서드 파티 라이브러리에서 볼 수 있는 제한 사항입니다. 이 문제에 대한 우리만의 접근 방식 및 우리의 rn-modal-presenter 라이브러리 사용 방법을 알아보세요.

바이 화이트 스펙트어 React Native 팀

![이미지](/assets/img/2024-06-20-SupportingMultipleModalsinReactNativeANewApproach_0.png)

이 기사는 화이트 스펙트어 React Native 팀 구성원인 Lucas Diez de Medina와 Rui Lu가 공동 저술했습니다.

<div class="content-ad"></div>

어플 빌드를 위한 조사 중에, 현재 React Native 표준 모달 구현이 동시에 여러 모달을 관리하지 못한다는 사실을 발견했습니다. 인기 있는 서드 파티 라이브러리들도 비슷한 제한을 가지고 있어서 우리에겐 작동하지 않았습니다. 더욱 복잡한 React Native 앱일수록 더 많은 제약이 생길 것입니다. 더 나쁜 점은, 에러가 발생할 수 있지만 눈에 띄지 않을 수도 있습니다.

그래서 우리는 우리만의 간단한 방법을 만들기로 결정했고, rn-modal-presenter 라이브러리를 출시했습니다. 우리가 발견한 사항과 여러분의 React Native 프로젝트에 우리 라이브러리를 사용하는 방법을 알아보려면 계속 읽어주세요.

이 글에서 다루는 내용은 다음과 같습니다:

- 서드 파티 모달 라이브러리의 제한 사항
- 테스트한 대안
- 우리의 해결책: rn-modal-presenter 라이브러리
- rn-modal-presenter 라이브러리 구현 방법

<div class="content-ad"></div>

rn-modal-presenter 라이브러리의 전체 문서를 npm 및 GitHub에서 읽어보세요.

# 서드파티 Modal 라이브러리의 제한 사항

이제 위에서 언급한 대로, React Native에서 모달이 얼마나 중요한지는 알 수 있지만, 표준 구현은 몇 가지 중요한 제한 사항을 갖고 있습니다. 이는 사용자에게 다른 상황에서 여러 모달을 표시하려고 시도했을 때 우리가 발견한 것입니다.

모달은 일반적으로 프롭을 기반으로 표시되거나 숨겨지는 컴포넌트이며, 이 프롭은 일반적으로 표시하는 컴포넌트의 상태에 의해 제어됩니다. 해당 컴포넌트는 컴포넌트 트리의 일부여야 하며 표시하고 싶은 모든 컴포넌트의 자식으로 나타나야 합니다. 이러한 이유로 하나의 컴포넌트로 표시되는 여러 모달을 표시하려는 경우나 모달이 표시되는 별도의 화면으로 이동해야 하는 경우에 기본적인 제한 사항과 복잡성이 발생합니다.

<div class="content-ad"></div>

위의 내용을 한국어로 번역하면 다음과 같습니다:

- 모달을 제어하는 상태를 관리해야 합니다.
- 상태를 업데이트함으로써 모달의 표시 및 숨김을 동시에 처리해야 합니다 (표시하는 컴포넌트 내에서).
- 특정 컴포넌트에서 모달을 표시한 후에 뒤로 이동하려면, 표시하는 컴포넌트가 언마운트되므로 모달도 사라집니다.
- iOS에서는 동시에 두 개 이상의 모달을 표시하거나 서로 겹치는 여러 모달을 스택으로 관리할 수 없습니다: https://github.com/react-native-modal/react-native-modal/issues/30

마지막으로, 이 제한 사항은 iOS 네이티브 측면에 있습니다. UIViewController가 다른 뷰 컨트롤러를 표시한 후, 표시 중인 뷰 컨트롤러 (이제 숨겨진 상태)가 해당 뷰 컨트롤러 위에 다른 두 번째 뷰 컨트롤러를 표시할 수 없습니다. 따라서 이전에 표시된 뷰 컨트롤러에서 두 번째 뷰를 표시해야 합니다.

# 간단한 예시

<div class="content-ad"></div>

간단한 예제로이 한계를 확인해 보겠습니다. 여기서는 전통적인 모달을 사용하여 앱 평가를 받으려고 시도하지만, 특정 상황에서만 만족한 사용자에게만 보여줍니다.

사용자가 앱에서 관련 작업을 수행한 후에는 다음을 보여줍니다:

- 작업이 완료되었음을 알리는 모달
- 앱에 대해 얼마나 만족하는지 묻는 모달

- 긍정적인 답변일 경우 AppStore에서 앱 평가를 요청하는 모달을 보여줍니다.
- 부정적인 답변인 경우 피드백을 남겨 주시라는 모달을 제공합니다.

<div class="content-ad"></div>

그럼, 모든 이 modal들이 같은 메인 화면에서 제시되며 이 코드 스니펫에서 볼 수 있듯이 네 가지 다른 modal에 대한 모든 상태를 가지고 있으며 그 상태에 따라 각 modal을 표시합니다.

```js
const App = () => {
 const [showRateAppModal, setShowRateAppModal] = useState(false);
 const [showAppRatedPositiveModal, setShowAppRatedPositiveModal] = useState(false);
 const [showAppRatedNegativeModal, setShowAppRatedNegativeModal] = useState(false);
 const [showActivateGadgetModal, setShowActivateGadgetModal] = useState(false);
 
 return (
   <SafeAreaView>
     {showActivateGadgetModal && (
       <ActivateGadgetModal
         onDismiss={() => {
           setShowActivateGadgetModal(false);
         }
       />
     )}
     {showRateAppModal && (
       <RateAppModal
         positiveFeedback={() => {
           setShowRateAppModal(false);
           setShowAppRatedPositiveModal(true);
         }
         negativeFeedback={() => {
           setShowRateAppModal(false);
           setShowAppRatedNegativeModal(true);
         }
       />
     )}
     {showAppRatedPositiveModal && (
       <PositiveFeedbackModal
         onDismiss={() => setShowAppRatedPositiveModal(false)}
       />
     )}
     {showAppRatedNegativeModal && (
       <NegativeFeedbackModal
         onDismiss={() => setShowAppRatedNegativeModal(false)}
       />
     )}
     <Button
       title="Activate Gadget"
       onPress={() => {
         setShowActivateGadgetModal(true);
         setShowRateAppModal(true);
       }
     />
   </SafeAreaView>
 );
};
```

이 상호작용은 상태를 같은 컴포넌트에서 제어하기 때문에 매우 간단합니다. 또한 우리는 저장소(store)를 가지고 있지 않습니다. 이미 4개의 상태 변수를 가지고 있는 저장소를 관리하고 있는데, 이것은 계속해 추가할수록 더 복잡해집니다.

이제 실수로 두 개의 modal을 동시에 표시하려고하면 어떻게 작동하는지 살펴보겠습니다.

<div class="content-ad"></div>

이 경우에는 첫 번째 모달이 iOS에서만 표시될 것이며, 이 문제의 가장 나쁜 부분은 React Native 콘솔에서는 오류가 발생하지 않았다는 것입니다.

그러나 Xcode 콘솔을 확인하면 현재 다른 View Controller 위에 View Controller를 표시하려고 시도하고 있는 것이 iOS 시스템에서 올바르지 않은 동작임을 알 수 있습니다.

보게 될 오류는 다음과 같습니다:

```js
Warning: Attempt to present <UIViewController: 0x147d2c6b0> on <UIViewController: 0x147d614c0> which is already presenting (null)
```

<div class="content-ad"></div>

iOS에서 올바른 흐름은 첫 번째 모달을 표시한 후에, 첫 번째 모달이 해제되면(해당 상태 변수를 false로 설정함으로써) 다음 모달의 상태 변수를 true로 설정하여 표시하는 것입니다.

상상할 수 있듯이, 이것은 매우 복잡해질 수 있습니다. 대부분의 경우 개발자들은 여러 모달의 해제와 표시를 관리하기 위해 지연 또는 시간 초과를 사용합니다. 이로 인해 예기치 못한 오류가 발생하며 실제로 모달 애니메이션 지속 시간은 앱이 실행되는 기기에 따라 다를 수 있습니다.

요약하면, 여기서 직면한 문제는 표시 컴포넌트가 모든 로직 및 상태 관리를 처리해야 하고 표시하려는 각 모달마다 하나의 상태 변수가 필요하다는 것입니다.

우리에게 가장 큰 문제는 한 가지 실수를 하게 되면, 두 개의 모달을 동시에 표시하려고 한다면 두 번째 모달이 나타나지 않고 오류/경고 메시지도 표시되지 않는다는 것입니다.

<div class="content-ad"></div>

# 시도한 대체품

리액트 네이티브 프로젝트에서 여러 모달을 관리하는 데 직면할 수 있는 두 가지 일반적인 문제는 다음과 같습니다:

- 동시에 하나 이상의 모달을 표시할 수 없음
- 모달이 더 많이 추가될수록 코드 복잡성이 기하급수적으로 증가함

이러한 두 가지 문제로 인해 표준 네이티브 모달 컴포넌트를 사용하면서 이를 해결하기 위해 다양한 옵션을 시도해 보았습니다.

<div class="content-ad"></div>

아래에는 여기서 가장 일반적으로 사용되는 2개의 라이브러리가 있으며, 이들을 사용한 이유와 우리가 고유한 방식으로 진행하기로 결정한 이유를 설명했습니다.

# react-native-modal

이는 표준 React Native Modal 컴포넌트의 확장입니다. 기존 기능에 추가적인 기능을 제공하여 들어오는/나가는 애니메이션 타이밍을 지정할 수 있거나 다른 콜백을 제공하여 API를 사용자 정의할 수 있습니다. 또한 기기 방향에 따라 스와이프할 수 있고 스크롤 가능하며 적응적인 콘텐츠를 제공합니다.

하지만 이러한 기능이 얼마나 좋든, 이 라이브러리는 결국 React Native에서 모달이 작동하는 방식을 변경하지 않기 때문에 여전히 동시에 여러 모달을 표시하거나 코드 복잡성을 줄이는 등 위에서 언급한 같은 제한 사항을 갖고 있습니다.

<div class="content-ad"></div>

# react-native-modalfy

이 라이브러리는 이전 것보다 훨씬 인기가 적지만, 우리가 달성하고자 하는 방향과 일치합니다.

첫 번째 이점은 JavaScript로 구현되어 여러 모달을 지원한다는 것입니다. 코드의 어느 곳에서든 JavaScript 함수를 호출할 수 있으며, 컴포넌트 트리를 혼동시키지 않고 추가적인 상태를 관리할 필요가 없습니다.

다른 중요한 점은 명령형 API를 기반으로 하고 있으며, 각 모달의 외형에 대한 애니메이션과 전환을 완전히 사용자 정의할 수 있다는 것입니다.

<div class="content-ad"></div>

위 장점들에도 불구하고, 이 라이브러리는 설정하기 위해 일부 뼈대 코드가 필요했습니다. 이런 면에서 React Navigation과 매우 유사합니다. 여러분은 프로젝트 내에서 사용할 각 모달을 미리 정의하고 각각에 대한 구성을 제공해야 합니다.

또 다른 단점은 동일한 모달 유형의 여러 인스턴스를 표시하거나 숨기지 못한다는 것입니다. 같은 스타일을 공유하는 다양한 버튼과 복사본을 가진 다수의 모달이 있는 애플리케이션에서는, 다양한 모달 엔티티를 만드는 대신 서로 다른 복사본을 위한 특정 매개변수를 가진 하나의 모달만 가지는 것이 더 효율적입니다.

# 우리의 해결책: rn-modal-presenter

다양한 옵션을 분석한 후, 우리는 다음 기반으로 우리만의 라이브러리를 만들기로 결정했습니다.

<div class="content-ad"></div>

# 유연한 구성요소와 명령형 API

유연하다는 의미는 어떤 구성요소든 모달로 표현할 수 있고, 상태를 수정하지 않고 코드의 어디서든(표시된 모달 내에서도) 표시/감춤을 관리할 수 있다는 것입니다.

명령형 API를 사용하면 앱 전체 위에 모달이 표시되므로 어디서든 모달 표시를 트리거할 수 있습니다.

# 콘텐츠는 부모 구성요소(보통 귀하의 구성요소) 위에 표시됩니다

<div class="content-ad"></div>

이 부보 컴포넌트는 우리 라이브러리에서 노출되었고, 여러분은 해당 컴포넌트 트리 어딘가에 배치해야 합니다. 이것은 모달 창이 다른 일반 뷰와 화면에 비해 가장 높은 우선순위를 가지고 있기 때문에 멋집니다.

# 다중 모달 지원

100% 자바스크립트 라이브러리이기 때문에 여러 개의 모달을 쉽게 표시할 수 있습니다. 또한 동일한 모달 유형의 여러 인스턴스를 표시하는 것을 지원합니다.

그러나 이에는 조금 제한이 있습니다. 자바스크립트 솔루션이기 때문에 프로젝트에 다른 네이티브 모달이 있는 경우, 해당 나중 모달은 여전히 우리 모달 위에 있을 수 있습니다. 왜냐하면 네이티브 컴포넌트가 가장 높은 우선순위를 가지기 때문입니다.

<div class="content-ad"></div>

# 라이브러리 통합 방법

단계 1: 프로젝트에 라이브러리 추가하기:

- yarn add @whitespectre/rn-modal-presenter
- npm install @whitespectre/rn-modal-presenter

단계 2: 모달을 표시하고 싶은 컴포넌트 위에 래핑하기:

<div class="content-ad"></div>

```js
import { ModalPresenterParent, showModal } from '@whitespectre/rn-modal-presenter';
…
<ModalPresenterParent>
  <App />
</ModalPresenterParent>
```

제 3단계: showModal 메소드를 호출하세요. 이 메소드는 다음을 받습니다:

- 보여질 컴포넌트
- 해당 컴포넌트로 전달될 속성
- 나중에 모달을 해제하는 데 사용할 ModalHandler를 반환합니다.

```js
export declare const showModal: <ContentProps>(
  Content: (props: ContentProps & ModalContentProps) => JSX.Element,
  contentProps: ContentProps,
) => ModalHandler;
```

<div class="content-ad"></div>

그게 다야. 충분히 준비됐어요.

## 더 복잡한 구현

### 컴포넌트에 속성 전달하기

모달 위에 표시하려는 컴포넌트에 속성을 추가하려면 컴포넌트에 도우미 함수를 만들 수 있습니다.

<div class="content-ad"></div>

이 경우에는 showModal 함수를 호출하는 helper 함수를 만들 수 있습니다. 이 함수는 사용자에게 보여줄 텍스트와 사용자가 닫기 버튼을 눌렀을 때 실행할 완료 핸들러를 받는데, 이것은 custom text modal이 받는 속성을 받게 됩니다.

```js
export const showCustomAlert = (
  title: string,
  body: string,
  buttons: CustomAlertButton[] = [defaultButton],
) => {
  return showModal(CustomAlert, { title, body, buttons });
};
```

## 컴포넌트 속성에 ModalContentProps 추가하기

이 기능은 컴포넌트를 설치할 때 라이브러리에 의해 제공되며, dismiss 함수를 포함합니다.

<div class="content-ad"></div>

```js
const CustomAlert = ({
  dismiss,
  title,
  body,
  buttons
}: CustomAlertProps & ModalContentProps) => {
  return (
    …
```

여기에는 모달 컴포넌트 속성으로 반환된 dismiss 함수를 전달하고 해당 dismiss를 모달 내에서 모달을 지우는 데 사용합니다.

## 새 라이브러리를 사용한 원본 예제

rn-modal-presenter 라이브러리를 사용하면 상태를 관리할 필요가 없고 어디에서든 모달 표시를 강제로 트리거할 수 있기 때문에 원본 예제는 다음과 같이 다시 작성할 수 있습니다.

<div class="content-ad"></div>

메인 앱 컴포넌트는 Gadget Activation 모달을 표시할 것입니다:

```js
const App = () => {
  return (
    <ModalPresenterParent>
      <SafeAreaView>
        <Button
          title="Gadget 활성화"
          onPress={() => {
            showModal(ActivateGadgetModal, {});
          }
        />
      </SafeAreaView>
    </ModalPresenterParent>
  );
};
```

그리고 각 모달은 자체적으로 dismiss하고, 흐름에서 다음 모달을 표시하는 책임이 있을 것입니다. 예를 들어, ActivateGadgetModal은 아래와 같이 보일 것입니다:

```js
const ActivateGadgetModal = ({dismiss}: ModalContentProps) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modal}>
        <View style={styles.contentContainer}>
          <Text>당신의 Gadget이 활성화되었습니다</Text>
          <View style={styles.buttonsContainer}>
            <Button
              title="닫기"
              onPress={() => {
                dismiss();
                showModal(RateAppModal, {});
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};
```

<div class="content-ad"></div>

# 미래 개선 사항

rn-modal-presenter 라이브러리는 현재 진행 중인 프로젝트에 우리의 요구 사항에 맞게 만들어 졌지만, 사용하면서 다른 기능과 개선 사항들을 확인했습니다. 다른 사용 사례에 유용할 수 있는 것들입니다.

여기 우리 라이브러리에 도입하고 싶은 주요 기능 및 개선 사항입니다:

- 하나씩 보이도록 모달의 대기열 만들기
- 현재 여러 개의 모달이 동시에 표시되려고 하면 서로 위에 겹쳐서 나타납니다.
- 대기열은 우선순위 매커니즘을 포함하여 강제로 다음 모달을 표시할 수 있어야 합니다.
- 뷰가 네이티브 뷰들 위에 나타날 수 있도록 만들기
- 더불어 네이티브 모듈을 구축하여 내용을 네이티브 뷰 위에 표시할 수 있도록 하기
- 각 효과에 대해 사용자 정의 가능한 애니메이션 및 지속 시간 허용하기

<div class="content-ad"></div>

만약 이러한 기능 중 어떤 것을 구현하고 싶거나 우리 라이브러리에 기여하고 싶다면, 언제든지 다음 링크에서 PR을 열어주세요: [https://github.com/whitespectre/rn-modal-presenter](https://github.com/whitespectre/rn-modal-presenter).