---
title: "물리적 디바이스를 Firebase Emulator에 연결하기"
description: ""
coverImage: "/assets/img/2024-05-15-ConnectingPhysicalDevicestoYourFirebaseEmulator_0.png"
date: 2024-05-15 10:54
ogImage: 
  url: /assets/img/2024-05-15-ConnectingPhysicalDevicestoYourFirebaseEmulator_0.png
tag: Tech
originalTitle: "Connecting Physical Devices to Your Firebase Emulator"
link: "https://medium.com/@Toglefritz/connecting-physical-devices-to-your-firebase-emulator-dae629c6d192"
---


## 플러터 개발 및 테스트를 위한 Firebase 에뮬레이터 스위트에 실제 기기 연결하기

모든 플러터 개발자들은 공통 목표를 공유합니다: 성능이 우수하고 버그가 없는 앱을 출시하는 것입니다. 이를 달성하기 위해서는 실제 환경과 가까운 환경에서 엄격한 테스트가 필요합니다. 이를 통해 개발자들은 사용자에게 영향을 미치기 전에 문제를 식별하고 해결할 수 있습니다. 테스트 조건이 실제 사용 시나리오와 유사할수록, 개발자들은 앱을 미세 조정하여 안정성, 사용성 및 원활한 성능을 보장할 수 있습니다.

그러나 가끔씩 실제 제품 환경에서 바로 테스트하는 것이 유혹적일 수 있지만, 이는 매우 위험합니다. 실제 사용자들의 경험과 정확히 일치하는 테스트를 수행하는 것은 기존 사용자들에게 라이브 서비스를 방해할 위험을 가지며, 의도하지 않은 상당한 비용을 초래할 수도 있습니다. 구름 기능에 오류가 있는 경우, 수천 개의 작업을 실수로 수행할 수 있습니다. 각 작업은 수수료가 부과될 수 있습니다. 불행한 헤드라인의 대상이 되고 싶지 않다면 안전하고 격리된 테스트 환경이 중요합니다.

![이미지](/assets/img/2024-05-15-ConnectingPhysicalDevicestoYourFirebaseEmulator_0.png)



파이어베이스 에뮬레이터 스위트가 등장하는 곳입니다. 이는 파이어베이스 서비스를 로컬로 시뮬레이션하여 앱의 기능을 철저히 테스트할 수 있게 해줍니다. 인증, 데이터베이스 작업, 서버 측 로직과 같은 기능을 배포 코드가 실제 백엔드로 이동하는 위험 없이 테스트할 수 있습니다. 이 로컬 에뮬레이터와 함께 물리적 장치에서 테스트를 활성화하여, 개발자는 실제 사용자들이 사용하는 실제 장치에서 어플리케이션이 어떻게 동작하는지 볼 수 있습니다. 이는 랩 조건과 실제 사용 사이의 간극을 메우고, 프로덕션 환경에서의 테스트의 위험을 회피할 수 있도록 해줍니다.

<img src="/assets/img/2024-05-15-ConnectingPhysicalDevicestoYourFirebaseEmulator_1.png" />

파이어베이스 에뮬레이터 스위트를 설정하는 방법에 대한 훌륭한 많은 기사들이 있습니다. 이 기사들은 에뮬레이터가 테스트 중인 소프트웨어가 실행 중인 기기와 동일한 장치에서 실행되고 있다고 가정합니다. 실제로 구글의 공식 문서는 우수합니다. 하지만 모바일 개발자에게는 물리적 장치에서 테스트하는 것이 가장 중요한 경우가 많습니다, 시뮬레이션된 아이폰이나 안드로이드 장치만으로는 부족합니다. 시뮬레이터는 모바일 장치의 하드웨어 동작(배터리 사용, 카메라 기능, GPS 정확도 등)을 완벽하게 재현할 수 없기 때문입니다. 또한 시뮬레이터에서 앱의 느낌을 완전히 이해하는 것이 어렵습니다. 실제 장치에서 테스트하여 앱이 실제 사용 조건에서 잘 작동하도록 보장하고, 시뮬레이터가 놓치는 세세한 점과 상호 작용을 포착할 수 있습니다.

파이어베이스 에뮬레이터 스위트에 실제 모바일 장치를 연결하는 방법에 대한 문서화된 정보가 부족합니다. 그래서 이 기사에서는 이 과정을 다룰 것입니다.



# 로컬에서 플러터 앱을 Firebase Emulator Suite에 연결하는 방법

그러나 실제 기기와 작업하기 전에 첫 번째 단계는 개발 컴퓨터에서 모두 실행 중인 경우 플러터 앱을 Firebase Emulator Suite에 연결하는 것입니다. 이를 수행하려면 앞에서 언급한 대로 다른 곳에서도 잘 문서화되어있는 몇 가지 단계를 따라야합니다.

## 단계 1: Firebase Emulator Suite 설치 및 구성

플러터 앱을 Firebase Emulator에 연결하려면 먼저 Firebase CLI를 설치하고 로컬 컴퓨터에 Firebase Emulator Suite를 설정해야합니다. Firebase CLI는 npm을 사용하여 설치할 수 있습니다:



```bash
npm install -g firebase-tools
```

만약 아직 프로젝트 디렉토리에서 Firebase를 초기화하지 않았다면:

```bash
firebase init
```

초기화 과정 중에 설정하려는 역할을 선택하세요 (예: Firestore, Authentication, Functions). 이렇게 하면 프로젝트 디렉토리에 firebase.json 파일이 생성되고 해당 파일에 에뮬레이터 설정이 저장됩니다. 곧 다시 이 파일을 사용할 것이므로 기억해 두세요.



## 단계 2: 플러터 앱에서 Firebase 구성

플러터 앱에서 Firebase 패키지가 라이브 Firebase 서비스가 아닌 로컬 엠블러에 연결되도록 구성해야 합니다. 플러터 앱에서 Firebase를 초기화하여 로컬 엠블러 인스턴스에 연결하십시오. 일반적으로 이는 main.dart 파일이나 Firebase를 초기화하는 곳에서 수행됩니다:

```js
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Firebase를 초기화합니다.
  await Firebase.initializeApp();

  // 디버그 모드에서 Firebase 로컬 엠블러를 사용합니다.
  if (kDebugMode) {
    FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
    await FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
    FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);

    debugPrint('Firebase 엠블러 스위트 사용중');
  }

  runApp(MyApp());
}
```



```js
if (kDebugMode) {…}
```

은 선택 사항이지만, 디버깅 중에 Flutter 앱이 항상 Firebase Emulator Suite를 사용하는지 확인하는 데 유용하다고 생각합니다.

## 단계 3: 에뮬레이터 실행 및 Flutter 앱 실행

Firebase 에뮬레이터를 구성하고 Flutter 앱이 이러한 에뮬레이터에 연결되도록 설정한 후, 이제 에뮬레이터를 시작할 수 있습니다:



```js
firebase emulators:start
```

이 명령어는 설정한 모든 에뮬레이터를 시작합니다. 플러터 앱을 시작하기 전에 실행 중인지 확인해주세요. 이제 디버그 모드로 플러터 앱을 실행하면 Firebase Emulator Suite를 사용할 수 있습니다. CLI도 이에 대해 알려줄 것이지만, (일반적으로) http://localhost:4000/로 이동하여 에뮬레이터 스위트용 UI에 액세스할 수 있습니다.

![Connecting Physical Devices to Your Firebase Emulator](/assets/img/2024-05-15-ConnectingPhysicalDevicestoYourFirebaseEmulator_2.png)

## 단계 4: 연결 확인하기



앱이 실행되면 FirebaseAuth를 사용하여 로그인하거나 Firestore에서 문서를 읽고 쓰는 작업을 수행해보세요. 에뮬레이터 UI에 반영된 액션을 확인할 수 있을 것입니다. 이는 Flutter 앱이 Firebase Emulator에 올바르게 연결되어 있는지를 확인하는 것이죠.

# Flutter 앱과 Firebase 에뮬레이터를 외부 장치에 연결하기

좋아요, 이제 Flutter 앱이 동일한 기기에서 실행 중일 때 Firebase 에뮬레이터 스위트에 연결할 수 있는 것처럼 외부 모바일 장치(예: 안드로이드 폰, 아이폰 또는 iPad)에서 실행 중인 Flutter 앱을 Firebase 에뮬레이터 스위트에 연결하기 위한 몇 가지 조정이 필요합니다.

## 단계 1: 개발 환경의 IP 주소 얻기



먼저 개발 컴퓨터의 IP 주소를 확인해야 합니다. 이 IP 주소는 플러터 앱의 Firebase 초기화 코드에서 localhost 참조를 대체할 것입니다. 이렇게 하면 주요 운영 체제에서 IP 주소를 찾을 수 있습니다:

- Windows: 명령 프롬프트를 열고 ipconfig를 입력합니다. 네트워크 연결에서 "IPv4 주소"를 찾아보세요.
- macOS: 시스템 환경설정을 열고 네트워크로 이동한 다음 활성 네트워크 연결을 선택합니다. 거기서 IP 주소를 확인할 수 있습니다.
- Linux: 터미널을 열고 hostname -I를 입력하면 컴퓨터의 IP 주소가 표시됩니다.

## 단계 2: 플러터 앱의 Firebase 초기화 업데이트

획득한 IP 주소로 플러터 앱의 Firebase 초기화 코드에서 localhost 참조를 대체하세요. 이렇게 하면 외부 기기가 올바른 서버를 대상으로 할 수 있습니다. main.dart에서 설정을 수정하는 방법은 다음과 같습니다:



```js
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Firebase 초기화
  await Firebase.initializeApp();

  // 디버그 모드에서는 Firebase 로컬 에뮬레이터를 사용합니다.
  if (kDebugMode) {
    // Firebase 에뮬레이터 스위트를 실행하는 컴퓨터의 IP 주소입니다. 앱과 같은 기기에서 에뮬레이터 스위트를 실행 중이면 "localhost"를 사용합니다. 그렇지 않으면 에뮬레이터 스위트를 실행 중인 기기의 IP 주소를 사용합니다.
    const String devMachineIP = '192.168.x.x';  // 실제 IP 주소로 대체하세요

    FirebaseFirestore.instance.useFirestoreEmulator(devMachineIP, 8080);
    await FirebaseAuth.instance.useAuthEmulator(devMachineIP, 9099);
    FirebaseFunctions.instance.useFunctionsEmulator(devMachineIP, 5001);
  }

  runApp(MyApp());
}
```

## 단계 3 : firebase.json 구성 수정

이 프로젝트에 Firebase를 초기화할 때 생성된 firebase.json 파일을 기억하시나요? 외부 기기에서 연결을 허용하려면 Firebase Emulator Suite를 localhost뿐만 아니라 모든 IP 주소에서 요청을 수락하도록 구성해야 합니다. 이를 위해 firebase.json 파일에서 모든 에뮬레이터의 호스트를 0.0.0.0으로 설정합니다:

```js
{
  "emulators": {
    "auth": {
      "host": "0.0.0.0",
      "port": "9099"
    },
    "firestore": {
      "host": "0.0.0.0",
      "port": "8080"
    },
    "functions": {
      "host": "0.0.0.0",
      "port": "5001"
    },
    // 필요한 다른 서비스를 포함하세요
  }
}
```



## ❗ 보안 경고 ❗

Firebase 에뮬레이터를 어떤 IP 주소에서든 연결할 수 있도록 구성하면 외부 기기에서의 테스트를 가능케 할 뿐만 아니라 에뮬레이터를 네트워크에 노출시킬 수도 있습니다. 이 설정은 무단 접근을 방지하기 위해 안전하고 제어된 네트워크 환경에서만 사용해야 합니다. Firebase Emulator Suite를 인터넷이나 안전하지 않은 네트워크에 노출시키지 마십시오.

# 마무리

외부 모바일 기기를 Firebase Emulator Suite에 연결하는 과정은 문서화가 잘 되어 있지 않지만, 주요 변경 사항은 두 가지뿐입니다:



- firebase.json 파일에서 에뮬레이터의 호스트를 0.0.0.0으로 설정하여 앱이 로컬 컴퓨터 외의 기기에서도 연결할 수 있도록 합니다.
- Flutter 앱을 로컬호스트 대신 개발 컴퓨터의 IP 주소를 사용하도록 업데이트합니다.

Flutter 앱을 외부 모바일 기기와 Firebase Emulator Suite에 연결할 수 있도록 설정하면 개발 컴퓨터의 범위를 벗어나 심층적인 테스트를 수행할 수 있습니다. 이 기능을 통해 제품 환경에 손상을 주지 않고 실제 기기에서 앱의 기능을 검증하므로 더 큰 확신을 갖고 앱을 출시할 수 있을 것입니다.

![이미지](/assets/img/2024-05-15-ConnectingPhysicalDevicestoYourFirebaseEmulator_3.png)