---
title: "100초 안에 플러터 앱에 Firebase를 추가하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Add Firebase into Your Flutter App  Within 100 Seconds"
link: "https://theflutterway.medium.com/add-firebase-into-your-flutter-app-within-100-seconds-5dd3573be094"
---



프로젝트에 Firebase 🔥을 어떻게 추가하는지 궁금할 수도 있고, 이미 알고 계실 수도 있습니다. 확실한 한 가지는 100초보다 더 걸린다는 것입니다. 하지만, 만약에 새로운 🆕 또는 기존 플러터 프로젝트에 Firebase를 💯초 이내에 추가할 수 있다고 말해주면 어떨까요? 😱 너무 좋은 소리일 것 같지만, 함께 하면 제가 증명해 줄게요!

![Add-Firebase-into-Your-Flutter-App-—-Within-100-Seconds_0.png](/assets/img/Add-Firebase-into-Your-Flutter-App-—-Within-100-Seconds_0.png)

## 단계 1: Firebase CLI 설치

시작하기 전에, 컴퓨터에 Firebase CLI가 설치되어 있는지 확인해주세요. 그렇지 않다면, 다음 명령어를 실행하여 전역적으로 설치하세요:

<div class="content-ad"></div>

```js
npm install -g firebase-tools
```

```js
curl -sL https://firebase.tools | bash
```

다음 명령어를 실행하여 Firebase 계정에 로그인하세요:

```js
firebase login
```

<div class="content-ad"></div>

아래 명령어를 사용하여 Firebase 계정에 연결된 모든 프로젝트를 표시해 보세요:

```js
firebase projects:list
```

다음으로, 아래 명령어를 실행하여 FlutterFire CLI를 활성화해보세요:

```js
dart pub global activate flutterfire_cli
```

<div class="content-ad"></div>

만약 Mac을 사용 중이라면 경고가 표시될 수 있어요 👇

![이미지](/assets/img/Add-Firebase-into-Your-Flutter-App-—-Within-100-Seconds_1.png)

이 경고를 해결하려면 먼저 사용 중인 쉘을 확인해야 해요.

```js
echo $SHELL
```

<div class="content-ad"></div>

현재 사용 중인 셸의 경로를 나타내는 명령입니다. 예를 들어, /bin/bash, /bin/zsh 또는 다른 셸과 같습니다.

사용 중인 셸에 따라 구성 파일이 달라집니다:

- Bash의 경우, 구성 파일은 일반적으로 ~/.bashrc 또는 ~/.bash_profile입니다.
- Zsh의 경우, 구성 파일은 ~/.zshrc입니다.

이제 경로를 알게 되었으니 nano 또는 vim과 같은 텍스트 편집기를 사용할 수 있습니다. 예를 들어, Zsh를 사용하고 ~/.zshrc를 편집하려는 경우 다음 명령을 실행하십시오:

<div class="content-ad"></div>

```js
nano ~/.zshrc
```

해당 경로를 추가하고 저장하세요.

```js
export PATH="$PATH":"$HOME/.pub-cache/bin"
```

## 단계 2: 새로운 또는 기존 플러터 앱에 Firebase 추가하기

<div class="content-ad"></div>

새로운 Flutter 프로젝트 또는 기존 프로젝트에 Firebase를 통합할 수 있는 옵션이 있습니다. 이 튜토리얼에서는 FlutterShop UI 키트에 Firebase를 추가하는 방법을 보여드릴 거에요. 이 UI 키트에는 100개 이상의 사전 빌드된 스크린이 함께 제공되어, Flutter를 사용하여 어떤 유형의 전자 상거래 앱도 만들 수 있어요. FlutterShop을 사용하면 앱이 전문적으로 보이게 되며 개발 시간을 최대 70% 절약할 수 있어요. 소스 코드를 무료로 다운로드하거나 라이브 데모를 확인할 수 있어요.

프로젝트를 다운로드한 후, 선호하는 IDE에서 열어주세요. 그런 다음, firebase_core 패키지를 프로젝트에 추가하세요. 또는 Flutter 프로젝트 디렉토리에서 다음 명령을 실행하여 패키지를 설치할 수도 있어요:

```js
flutter pub add firebase_core
```

거의 다 왔어요! Flutter 프로젝트를 Firebase에 연결하려면 간단히 Flutter 프로젝트 디렉토리에서 이 단일 명령을 실행하면 돼요:

<div class="content-ad"></div>

```js
플러터파이어 구성
```

기존 프로젝트를 사용하거나 새 프로젝트를 생성할 수 있습니다. 🔄 이 데모에서는 새 프로젝트를 만들어 'FlutterShop-100s-challenge'라고 이름을 지으려고 합니다. 프로젝트를 생성하는 동안 사용하려는 플랫폼을 선택할 수 있습니다. 작업을 완료하면 lib 디렉터리를 확인해 보면 플러터파이어 CLI에 의해 생성된 'firebase_options.dart'라는 새 파일이 있는 것을 발견할 수 있습니다. 📂 인상적이죠? 이제 main.dart 파일로 돌아가 봅시다. main 함수를 비동기 함수로 변환하고 DefaultFirebaseOptions를 사용하여 Firebase를 초기화할 것입니다.

```js
await Firebase.initializeApp(
  options: DefaultFirebaseOptions.currentPlatform,
);
```

Firebase 통합이 완료되었습니다 🔥. 이제 다른 프로젝트에 Firebase를 통합하고 싶을 때는 해당 프로젝트 디렉터리에서 'flutterfire configure' 명령을 실행하기만 하면 됩니다

<div class="content-ad"></div>

이 튜토리얼에 대한 여러분의 의견을 듣고 싶어요. 도움이 되었던 점이 무엇인지 궁금해요. 즐겁고 유용하게 느꼈다면 👏 박수를 부탁드려요. 여러분의 피드백은 저에게 중요하며, 여러분에게 가치 있고 유용한 콘텐츠를 만들 수 있도록 돕아줘요. 이 튜토리얼을 읽어주셔서 감사해요.
