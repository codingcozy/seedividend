---
title: "Expo Dev Client 설치 방법 완벽한 가이드 2024"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_0.png"
date: 2024-05-12 19:08
ogImage: 
  url: /assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_0.png
tag: Tech
originalTitle: "How to Set Up Expo Dev Client: A Complete Guide [2024]"
link: "https://medium.com/@prasadkatkade008/how-to-set-up-expo-dev-client-a-complete-guide-2024-be898a519ec1"
---


<img src="/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_0.png" />

# 그럼, 시작해봅시다!

다음 튜토리얼은 Windows 기기용으로 제작되었으며, 특히 Windows 10 (64비트)에 맞춰져 있습니다. 만약 맥이나 리눅스를 사용하고 계신다면, 전반적인 과정을 이해하기 위해 읽어보세요.

## 목차 —



- Java Development Kit (JDK)을 설치하세요.
- 환경 변수 설정: JAVA_HOME 및 JAVA 경로
- Android Studio 다운로드
- SDK 및 빌드 도구 구성
- Android 에뮬레이터 구성
- Android 환경 변수 설정: ANDROID_HOME 및 경로
- NodeJS 설치
- Expo 프로젝트 설정
- Expo 개발 클라이언트 설정 및 Expo 프로젝트 로컬에서 컴파일
- 첫 번째 디버그-개발 빌드 생성

## Expo Dev Client는 무엇인가요?

공식 Expo 문서에 따르면, Expo Go 대신 개발 빌드를 선택하면 원시 런타임을 완전히 제어할 수 있습니다. 이를 통해 원시 라이브러리를 설치하거나 프로젝트 구성을 조정하거나 심지어 고유의 원시 코드를 작성할 수 있습니다.

더 간단하게 말하면, 기본 Expo 구성은 프로젝트를 Expo 클라우드에 업로드한 다음 빌드를 받는 과정으로 진행됩니다. 그러나 이 프로세스는 Expo 라이브러리만 원활하게 지원합니다. @react-native-google-signin/google-signin과 같은 원시 라이브러리를 사용할 경우 이와 같은 방식으로 작동하지 않습니다.



## Expo Dev Client 설정하기: 단계별 안내

이 튜토리얼에서는 JAVA Development Kit (JDK), 안드로이드 스튜디오 및 Node가 필요합니다.

Oracle 또는 OpenJDK 플랫폼을 방문하여 JDK를 다운로드하고 Gradle 버전과 호환되는지 확인하십시오. 2024년 기준으로 React Native는 Gradle 8.3을 사용하고 있으며 이는 JDK 17과 호환됩니다.

설치 가이드를 따르고 JAVA를 설치하는 경로를 메모해두세요. 기본적으로 C:\Program Files\Java\jdk-17 경로에 설치됩니다.



<img src="/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_1.png" />

시스템 속성에서 ‘환경 변수’를 검색하세요. 이 섹션에서 사용자 계정과 시스템 변수가 있습니다. 둘 다 변수를 설정하는 것이 좋습니다.

다음 단계를 따르세요:

- ‘JAVA_HOME’이라는 이름의 새 변수를 시스템 및 사용자 변수에 생성하고 JDK를 설치한 경로를 입력하세요
(예: C:\Program Files\Java\jdk-17).
- 시스템 변수 아래에 ‘Path’ 변수를 찾으세요. ‘jdk/bin’ 폴더의 경로를 추가하세요 (예: C:\Program Files\Java\jdk-17\bin).



드디어 설치를 확인하려면 명령 프롬프트(cmd)에서 'java -version'을 실행해주세요. 제대로 설정했다면 자바 버전 정보가 표시될 것입니다.

에뮬레이터, SDK 및 플랫폼 도구를 설치하려면 안드로이드 스튜디오가 필요합니다. 또한 IDE를 통해 로컬 빌드를 실행할 수도 있습니다.

공식 안드로이드 웹사이트에 방문하여 최신 IDE를 다운로드하세요. 기본 설치 가이드를 따라 설치 경로를 기억해주세요.

![이미지](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_2.png)



설치를 완료한 후 안드로이드 스튜디오를 열고 SDK 관리자를 엽니다.

![이미지](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_3.png)

호환성을 위해 가장 최신 SDK 버전과 바로 전 버전을 함께 설치해주세요. 예를 들어, 현재 가장 최신 SDK 버전은 34이므로 33 버전도 설치하시면 됩니다.

![이미지](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_4.png)



SDK와 함께 필요한 도구들이 있습니다. 기본적으로 설치되는 일부 도구들 외에 추가로 필요한 것들이 있습니다:

- 안드로이드 SDK 명령줄 도구
- 안드로이드 SDK 플랫폼 도구
- 안드로이드 SDK 빌드 도구
- 안드로이드 에뮬레이터
- Google Play 라이센스 라이브러리 (선택 사항)

체크박스를 선택하고 적용을 클릭하면 설치됩니다.

![Android SDK](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_5.png)



당신의 어플리케이션을 실행하기 위한 기본 에뮬레이터를 설정해야 합니다. 장치에서 어플리케이션을 실행할 수도 있지만, 적어도 하나의 에뮬레이터가 있어야 합니다.

가상 장치 관리자로 이동해주세요.

![이미지](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_6.png)

처음에는 새로운 장치가 보이지 않을 수 있습니다. + 아이콘 '새 가상 장치 생성'을 클릭하고, 장치를 선택한 후 '다음'을 클릭하여 OS 버전과 세로 방향을 선택해주세요.



새 장치를 설정하는 동안 Intel HAXM 설치 실패와 관련된 오류가 발생할 수 있습니다. 이를 해결하기 위해 Stack Overflow 답변 가이드를 따르세요.

설치가 완료되면 가상 장치를 실행할 수 있어야 합니다. 로딩에 몇 분이 소요될 수 있으니 조급해하지 마세요.

![이미지](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_7.png)

Expo 및 React Native가 SDK 도구에 올바르게 액세스할 수 있도록 환경 변수 섹션에서 해당 경로를 선언해야 합니다. 2단계와 유사하게 진행하세요.



SDK 도구가 설치된 위치는 기본적으로 SDK 관리자에서 제공됩니다. 사용자/AppData 디렉토리에 있습니다.

파일 탐색기에서 해당 경로로 이동해주세요. 사용자 계정 내의 'AppData' 폴더는 기본적으로 숨겨져 있습니다. '숨겨진 파일 표시'를 활성화해야 'AppData' 폴더에 액세스할 수 있습니다.

이제 환경 변수를 다시 엽니다.

- 시스템 및 사용자 변수에서 'ANDROID_HOME'이라는 정확한 이름의 새 변수를 만들고 SDK를 설치한 경로(C:\Users\사용자명\AppData\Local\Android\Sdk)를 포함시킵니다.
- 이제 시스템 및 사용자 변수에 위치한 'Path' 변수에 다음 경로를 추가하세요. '사용자명'을 실제 계정명으로 교체해주세요:
- C:\Users\사용자명\AppData\Local\Android\Sdk
- C:\Users\사용자명\AppData\Local\Android\Sdk\platform-tools
- C:\Users\사용자명\AppData\Local\Android\Sdk\emulator
- C:\Users\사용자명\AppData\Local\Android\Sdk\tools
- C:\Users\사용자명\AppData\Local\Android\Sdk\tools\bin



마침내 CMD 내에서 ADB 쉘을 실행할 수 있어야 합니다. 설정을 확인하려면 'adb --version'을 실행하세요.

![이미지](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_8.png)

Node의 안정 버전을 다운로드하세요. 저는 현재 18.18.0을 사용 중이며 기본 설치 가이드를 따르면 됩니다.

CMD 내에서 'node --version' 명령으로 설치를 확인하세요.




![이미지](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_9.png)

마침내, 우리는 Expo 애플리케이션을 시작할 수 있습니다. 저는 NativeWind-Tailwind 지원, 최신 Expo SDK 50, Expo 파일 기반 라우팅, React Reanimated 라이브러리 및 TypeScript 통합을 포함한 애플리케이션을 설정하는 데 다음 예제를 사용합니다.

```js
npx create-expo-app -e with-router-tailwind
```

프로젝트가 작동하고 오류가 없는지 확인하세요. Play Store 또는 App Store에서 실제 기기에 Expo Go Client를 다운로드하세요. 그런 다음 아래 명령을 실행하여 QR 코드를 스캔하여 기기에서 Expo 애플리케이션을 실행하세요. 이제 Expo Go Client로 애플리케이션을 실행 중임을 주의하세요.




```js
npm run start
```

만약 모든 것이 올바르게 작동하고 있다면 Expo 대시보드에 로그인하기 위해 EAS CLI를 다운로드하십시오.

```js
npm install --global eas-cli
```

작업을 완료한 후에는 다음 명령어를 사용하여 대시보드에 로그인하십시오. Expo 계정이 없다면 여기에서 생성하십시오.



```js
eas login  // 사용자 이름과 비밀번호를 입력하라는 프롬프트가 나타납니다.
eas whoami // 사용자 이름을 반환합니다.
```

eas.json 파일을 만들어서 빌드 구성 파일로 사용하세요. 이 파일에는 세 가지 프로필이 있습니다. 여기에서 자세히 알아보세요. eas.json 파일을 만들려면 프로젝트 터미널에서 다음 명령을 실행하세요.

```js
eas:configure
```

eas.json 파일을 업데이트하여 빌드 유형을 APK로 지정하여 기기에 직접 설치할 수 있도록 했습니다.



```js
{
  "cli": {
    "version": ">= 7.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

검증을 위해, 다음 명령을 사용하여 Expo 대시보드 내에서 미리보기 프로필로 Expo 애플리케이션을 빌드할 수 있습니다. 그러나 주의해야 할 점은 developmentClient가 true로 설정되어 있기 때문에 개발용 빌드는 불가능합니다.

```js
eas build -p android --profile preview
```

개발 환경을 설정하는 필수 헤더를 애플리케이션에 추가하는 Expo Dev Client 라이브러리를 설치해야 합니다. 프로젝트 터미널에서 아래 명령을 실행하세요.



```js
npx expo install expo-dev-client
```

참고: 이 라이브러리를 설치하면 Expo 프로젝트를 실행하는 기본 구성(npm run start 사용)이 개발 빌드로 전환됩니다. 따라서 Expo Go Client 모바일 애플리케이션이 작동하지 않습니다. Expo Client 내에서 실행하려면 터미널을 사용하여 Expo Go로 전환해야 합니다. 또한, 네이티브 라이브러리를 사용하고 있지 않은지 확인하세요.

<img src="/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_10.png" />

다음 명령을 사용하여 프로젝트를 로컬에서 컴파일하세요.



```js
npx expo run:android 
```

이 명령은 이전에 설치한 JDK 및 SDK 도구를 사용하여 Gradle 파일을 생성합니다. 먼저 프로젝트 내에 .android 폴더를 만들고 응용 프로그램을 실행하기 위해 에뮬레이터를 시작합니다. 컴파일 프로세스는 약 15분 이상 소요되므로 조금만 기다려주십시오.

첫 번째 개발 빌드를 생성하려면 다음 명령을 사용하십시오:

```js
eas build --profile development --platform android
```  



이 작업은 EAS 서버로 애플리케이션을 컴파일하는 것입니다. 로그인한 후 대시보드에서 진행 상황을 확인할 수 있어요.

작업이 완료되면 "설치" 버튼을 클릭하여 애플리케이션 (APK)을 다운로드할 수 있어요. 추가로 터미널에서는 애플리케이션을 에뮬레이터 내에서 실행할 것인지 선택하라고 안내할 거에요. 저는 애플리케이션을 실제 장치에서 실행하는 것을 선호하니, 같은 취향을 가진다면 모바일 브라우저에서 링크를 열고 애플리케이션을 다운로드하세요.

참고: 애플리케이션 크기에 대해 걱정하지 마세요; 최적화되지 않은 APK 빌드입니다.

![이미지](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_11.png)



앱을 다운로드하고 설치한 후, 맨 위에 앱 이름과 함께 다음과 같은 인터페이스가 표시됩니다.

![앱 인터페이스](/assets/img/2024-05-12-HowtoSetUpExpoDevClientACompleteGuide2024_12.png)

이제 프로젝트 터미널로 돌아가서 다음 명령을 실행해보세요:

```js
npx expo start --dev-client
```



처음에 애플리케이션은 개발 서버를 자동으로 감지하지 못할 수 있습니다. 따라서 수동으로 URL을 입력해야 합니다. 위 명령으로 코드를 컴파일한 후에는 localhost URL을 제공할 것입니다. 예를 들어, http://localhost:8081과 같이 나올 겁니다.

애플리케이션에서 "localhost" 부분을 자신의 IP 주소로 바꾸세요. 핸드폰이 동일한 Wi-Fi 네트워크에 연결되어 있는지 확인한 후, 애플리케이션에서 http://192.168.0.100:8081과 같이 수동으로 URL을 입력하세요. 그러면 애플리케이션이 로드되고, Expo Go Client와 유사한 핫 리프레시 기능을 지원할 겁니다.

참고: 새 라이브러리를 설치할 때마다 위 명령을 사용하여 애플리케이션을 다시 빌드하고, 기기에 최신 빌드를 다운로드/설치해야 합니다.

그러니까, 한숨을 내쉬세요. Expo 개발 클라이언트 설정이 완료되었습니다. 건배! 🥂



어려움이 있으면 언제든지 연락해주세요.
LinkedIn | Twitter (X)