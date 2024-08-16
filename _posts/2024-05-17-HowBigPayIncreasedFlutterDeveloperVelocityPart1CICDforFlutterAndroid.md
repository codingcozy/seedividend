---
title: "Flutter로 안드로이드를 위한 CI CD 구축 방법"
description: ""
coverImage: "/assets/img/2024-05-17-HowBigPayIncreasedFlutterDeveloperVelocityPart1CICDforFlutterAndroid_0.png"
date: 2024-05-17 21:35
ogImage: 
  url: /assets/img/2024-05-17-HowBigPayIncreasedFlutterDeveloperVelocityPart1CICDforFlutterAndroid_0.png
tag: Tech
originalTitle: "How BigPay Increased Flutter Developer Velocity: Part 1 — CI CD for Flutter Android"
link: "https://medium.com/bigpay-tech-blog/how-bigpay-increased-flutter-developer-velocity-part-1-ci-cd-for-flutter-android-using-github-34624b59762e"
isUpdated: true
---




<img src="/assets/img/2024-05-17-HowBigPayIncreasedFlutterDeveloperVelocityPart1CICDforFlutterAndroid_0.png" />

## 소개

모바일 애플리케이션의 빠르게 변화하는 세계에서는 적응성과 효율성이 매우 중요합니다. BigPay에서는 사용자들에게 재무 거래를 원활하고 효율적으로 제공하기 위해 노력하고 있습니다. BigPay라는 모바일 앱은 전 세계 어디에서나 지출, 송금, 수신 및 자금 추적을 위한 간단한 인터페이스를 제공합니다. 최근에 우리는 네이티브 모바일 앱에서 완전한 플러터 기반 애플리케이션으로 이전하여 개발 프로세스를 통합하고 Flutter의 크로스 플랫폼 능력을 활용하였습니다.

이 블로그 시리즈는 모바일 개발자, 기술 애호가 및 개발 워크플로우를 향상시키고자 하는 업계 전문가를 대상으로 합니다. 저희 목적은 BigPay 모바일 앱의 개발 워크플로우를 어떻게 향상시켰는지 공유하여 복잡한 문제 해결에 대한 저희의 구조화된 접근 방식을 보여주는 것입니다. Part 1에서는 GitHub Actions를 사용하여 Flutter 안드로이드 앱의 연속적 통합 및 배포 (CI/CD) 워크플로우를 어떻게 구현했는지 안내함으로써 스테이징 및 프로덕션을 위한 다양한 빌드 플레이버를 지원합니다. 또한 Firebase와 Diawi를 사용하여 빌드를 테스터에게 자동 배포하는 과정을 자동화하는 방법도 배우게 됩니다.

<div class="content-ad"></div>

또한, 파트 2를 기대해 주세요. 거기에서는 iOS 앱을 위한 유사한 CI/CD 워크플로우 설정을 다뤄볼 것입니다. iOS 배포 프로세스를 최적화하는 통찰을 공유할 예정이에요. 이 두 부분을 함께 보면 Android와 iOS 플랫폼 모두에 걸쳐 개발 워크플로우를 최적화하는 포괄적인 안내서를 제공할 거에요.

우리의 여정을 상세히 설명함으로써, CI/CD에 대한 실용적인 통찰력뿐만 아니라 개발에 대한 저희 팀의 접근 방식을 특징 짓는 신중한 계획과 실행에 대해 반영하고 있습니다. 이러한 모범 사례에 대한 우리의 경험은 다른 사람들이 자신의 프로세스를 개선하려는 데 유용한 자원으로 기능할 수 있어요. 저희의 경험을 읽으면서, 여러분이 자신의 프로젝트에 적용할 수 있는 영감과 유용한 전략을 발견할 수 있기를 바랍니다. 혁신과 기술에 열정이 있는 분들은 BigPay에서 함께 배우고 탐험할 것이 많아요.

## 문제

많은 개발 팀과 마찬가지로, 우리는 시간이 많이 걸리는 수동 빌드, 일관성 없는 빌드 환경, 그리고 배포 지연과 같은 문제로 고생했었어요. 이러한 도전에 부딪히며 새로운 기능과 업데이트를 빠르게 전달하는 것이 어려워졌습니다. 우리는 워크플로우를 최적화하고 생산성을 높이는 더 나은 방법이 있어야 한다고 느꼈죠.

<div class="content-ad"></div>

## 해결 방법

이러한 도전에 대처하기 위해, 우리는 Flutter 앱에 대한 CI/CD 파이프라인을 설정하기 위해 GitHub Actions를 채택했습니다. GitHub Actions는 빌드, 테스트 및 배포 프로세스를 자동화하는 효율적이고 유연한 솔루션을 제공하여 우리가 고품질 코드를 유지하고 업데이트를 보다 신속하게 전달할 수 있도록 도와주었습니다.

시장에는 Codemagic, Bitrise, Appcircle 등과 같은 여러 CI/CD 솔루션이 있지만, GitHub Actions를 선택한 이유는 GitHub 자체와의 원활한 통합 덕분입니다. 이미 GitHub를 코드 저장소로 사용하고 있기 때문에 GitHub Actions를 활용하면 추가 도구나 통합 없이도 워크플로우를 간소화할 수 있었습니다. 이 통합은 개발 프로세스를 간소화할뿐만 아니라 CI/CD 파이프라인이 기존 코드베이스와 밀접하게 통합되어 협업과 개발 팀 간의 가시성을 향상시킵니다.

GitHub Actions를 활용하여 개발 및 배포 프로세스를 GitHub 생태계 내에서 중앙 집중화하여 다양한 도구와 플랫폼을 관리할 필요가 없어졌습니다. 이 통합 접근 방식은 시간과 노력을 절약하는 데 도움이 되며 개발 관행에서 일관성과 신뢰성을 증진시킵니다.

<div class="content-ad"></div>

GitHub Actions는 GitHub과의 통합 기능 외에도 다양한 내장 기능과 사용자 정의 가능한 워크플로우를 제공하여 우리가 특정 요구 사항에 맞게 CI/CD 파이프라인을 맞춤화할 수 있습니다. 코드 테스트 자동화, 배포 관리 또는 제3자 서비스와 통합하는 등의 작업을 GitHub Actions를 통해 할 수 있어 개발 워크플로우를 최적화하기 위해 필요한 유연성과 확장성을 제공합니다.

## 전제 조건

시작하기 전에 다음 사항을 준비해야 합니다:
1. GitHub에 호스팅된 Flutter 앱.
2. GitHub Actions의 기본적인 이해.
3. GitHub 계정.
4. Firebase 앱 유포.
5. Diawi 계정

## 단계 1: Flutter 프로젝트 설정하기

<div class="content-ad"></div>

먼저, Flutter 프로젝트가 제대로 설정되어 있고 GitHub 저장소에 커밋되어 있는지 확인하세요. Flutter 프로젝트를 아직 생성하지 않은 경우 다음을 실행하여 생성할 수 있습니다:

```js
flutter create bigpay_app 
```

프로젝트 디렉토리로 이동하고 아직 Git 저장소를 초기화하지 않은 경우 다음을 실행하세요:

```js
cd bigpay_app
git init
git remote add origin <your-repository-url>
git add .
git commit -m “Initial commit”
git push -u origin master
```

<div class="content-ad"></div>

## 단계 2: Flutter 플레이버 구성

우리의 CI/CD 파이프라인을 위해 스테이징 및 프로덕션 환경에 대해 다른 빌드 구성을 다루어야 합니다. 이를 위해 플레이버를 사용하세요. 만약 필요하다면 Flutter 프로젝트가 스테이징과 프로덕션을 위한 적절한 플레이버로 구성되어 있는지 확인해 주세요.

## 단계 3: GitHub Actions Workflow 파일 생성

## Android

<div class="content-ad"></div>

GitHub Actions workflows는 YAML 파일에서 정의됩니다. 프로젝트의 루트에 .github/workflows라는 디렉토리를 생성하십시오. 이미 존재하지 않는 경우에만 만들어주세요. 이 디렉토리 안에 build-android.yml이라는 파일을 생성하십시오 (이름은 원하는 대로 지으실 수 있습니다).

그러면 이제 귀하의 저장소가 다음과 같이 보일 것입니다

![이미지를 참조하십시오](/assets/img/2024-05-17-HowBigPayIncreasedFlutterDeveloperVelocityPart1CICDforFlutterAndroid_1.png)

새로 생성된 build-android.yml 파일을 열고 언제 이 작업이 시작될지 정의하십시오.

<div class="content-ad"></div>

아래는 작업(workflow)를 마스터 브랜치로 푸시할 때마다 트리거하는 기본적인 구성입니다.

이제 사용할 OS를 정의하고 flutter를 위한 환경을 설정해야 합니다.

```js
on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: 저장소 체크아웃
      uses: actions/checkout@v4

    - name: JDK 17 설정
      uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: '17'

    - name: Flutter 설정
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.19.1'
```

<div class="content-ad"></div>

안녕하세요! 안드로이드에서는 우분투를 OS로 사용하고 있습니다.
설치할 미리 정의된 작업은 checkout@v4, setup-java@v4, flutter-action@v2 등이 있습니다. 이를 사용하여 Java 및 Flutter 버전 3.19.1을 설정해야 합니다.

이제 응용 프로그램을 빌드할 Flutter 명령을 실행할 수 있습니다.

```js
on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: '17'

    - name: Set up Flutter
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.19.1'

    - name: Install dependencies
      run: flutter pub get

    - name: Run tests
      run: flutter test

    - name: Build staging APK
      run: flutter build apk --debug --flavor staging
```

이 구성은 마스터 브랜치로의 모든 푸시 요청에서 워크플로우를 트리거합니다. 리포지토리를 체크아웃하고, Flutter를 설정하고, 종속성을 설치하고, 테스트를 실행하고, 디버그 모드에서 스테이징 APK를 빌드합니다.

<div class="content-ad"></div>

릴리스 모드 빌드
플레이 스토어에 게시하려면 앱을 디지턈 인증서로 서명해야 합니다.

앱을 서명하려면 다음 지침을 사용하십시오. 이미 한 경우에는 이 부분을 건너뛰고 GitHub Secrets 설정으로 넘어가실 수 있습니다.

업로드 키스토어 생성
macOS 또는 Linux에서 다음 명령을 사용하십시오:

```js
keytool -genkey -v -keystore ~/keystore.jks -keyalg RSA \
-keysize 2048 -validity 10000 -alias upload
```

<div class="content-ad"></div>

Windows에서 PowerShell에서 다음 몤을 사용하세요:

```js
keytool -genkey -v -keystore %userprofile%\keystore.jks ^
 -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 ^
 -alias upload
```

이 명령은 keystore.jks 파일을 홈 디렉토리에 저장합니다. 다른 곳에 저장하려면 -keystore 매개변수에 전달하는 인수를 변경하십시오. 그러나 keystore 파일을 비공개로 유지하고 공개 소스 제어에 체크하지 마십시오!

Gradle 설정
릴리스 모드 빌드를 추가하기 전에, GitHub 비밀 변수를 사용하여 은닉 변수를 활용하기 위해 우리 앱 수준의 build.gradle 파일에서 서명 구성을 먼저 설정해야 합니다. 이후에 이러한 비밀 변수를 설정할 것입니다.

<div class="content-ad"></div>

이전에 생성한 키스토어를 아래와 같이 android/app 폴더로 이동합니다.

다음을 포함하는 android 루트 폴더에 signing.properties라는 파일을 만듭니다: 우리의 키스토어(RELEASE_STORE_FILE, RELEASE_STORE_PASSWORD, RELEASE_KEY_ALIAS 및 RELEASE_KEY_PASSWORD).

![이미지1](/assets/img/2024-05-17-HowBigPayIncreasedFlutterDeveloperVelocityPart1CICDforFlutterAndroid_2.png)

![이미지2](/assets/img/2024-05-17-HowBigPayIncreasedFlutterDeveloperVelocityPart1CICDforFlutterAndroid_3.png)

<div class="content-ad"></div>

저희 앱 수준의 build.gradle에 다음 코드를 추가해주세요.

```js
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file("signing.properties")
if (keystorePropertiesFile.exists()) {
 keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

signingConfigs {
    release {
        if (keystoreProperties["RELEASE_STORE_FILE"] != null) {
            storeFile file(keystoreProperties['RELEASE_STORE_FILE'])
            storePassword keystoreProperties['RELEASE_STORE_PASSWORD']
            keyAlias keystoreProperties['RELEASE_KEY_ALIAS']
            keyPassword keystoreProperties['RELEASE_KEY_PASSWORD']
        } else {
            project.logger.error("릴리스 서명 구성을 찾을 수 없습니다. 릴리스 빌드가 실패할 수 있습니다! signing.properties 파일을 확인해주세요.")
        }
    }
}
```

해당 코드 스니펫은 앱을 서명하기 위해 signing.properties에서 키스토어 속성을 로드합니다. signing.properties 파일의 존재 여부를 확인한 후 그 내용을 keystoreProperties에 로드합니다.

릴리스용으로 buildTypes를 업데이트해주세요.

<div class="content-ad"></div>

```js
  buildTypes { 
          release { 
            signingConfig signingConfigs.release 
  } 
          debug { 
            signingConfig signingConfigs.debug 
            debuggable true 
          } 
  }
```

signingConfig signingConfigs.release: 앞서 미리 설정한 signingConfigs.release에 정의된 서명 구성을 릴리스 빌드에 사용합니다.

이 방식을 사용하면 키스토어 파일을 해당 경로에 로컬로 남길 수 있고, .gitignore에 추가하여 그레이들 파일을 계속 빌드할 수 있습니다.

키스토어의 인코딩
다음 단계는 방금 생성한 키스토어 파일의 인코딩을 다룹니다. 인코딩에 대해 우리는 널리 사용되는 Base64 인코딩 체계를 활용할 것입니다. 키스토어 파일의 인코딩은 이 파일을 텍스트로 GitHub Secrets에 저장하고 나중에 GitHub 워크플로 프로세스에서 다시 원래 키스토어 파일로 디코딩할 수 있게 합니다.

<div class="content-ad"></div>

안녕하세요! 안드로이드/app 폴더로 이동해서 .jks 파일을 찾아보세요. 해당 폴더 내에서 macOS에서 터미널에서 다음 명령을 실행하세요: base64 keystore.jks > keystore_base64.txt. 모든 과정이 제대로 진행되면 새로 생성된 keystore_base64.txt 파일을 확인할 수 있을 거예요. 이 파일에는 키 저장소 파일을 표현하는 인코딩된 텍스트가 포함되어 있습니다.

윈도우에서는 OpenSSL을 사용하여 쉽게 인코딩 단계를 수행할 수 있어요. OpenSSL을 다운로드하고 설치한 뒤 인코딩을 진행하세요.

3.1 GitHub Secrets 설정하기
첫 번째 시크릿은 우리의 키 저장소 파일의 인코딩된 Base64 표현이에요. 프로젝트의 GitHub 시크릿으로 이동해서 KEYSTORE_BASE64라는 새 GitHub 시크릿을 추가하고, keystore_base64.txt 파일의 내용을 복사해서 값을 필드에 붙여넣으세요.

그 다음에는 signing.properties 파일의 텍스트를 포함하는 ANDROID_SIGNING_PROPERTIES라는 또 다른 시크릿을 생성하세요.

3.2 릴리스 모드 빌드하기
이제 시크릿을 설정했으니, 릴리스 모드를 빌드하는 실제 워크플로우를 진행할 수 있어요.

<div class="content-ad"></div>

```js
on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: '17'

    - name: Set up Flutter
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.19.1'
    
    - name: Retrieve signing.properties
      env:
        ANDROID_SIGNING_PROPERTIES: ${{ secrets.ANDROID_SIGNING_PROPERTIES }}
      run: echo "$ANDROID_SIGNING_PROPERTIES" >> ./android/signing.properties

    - name: Retrieve keystore
      env:
        KEYSTORE_BASE64: ${{ secrets.KEYSTORE_BASE64 }}
      run: echo "$KEYSTORE_BASE64" | base64 --decode > ./android/app/keystore.jks

    - name: Install dependencies
      run: flutter pub get

    - name: Run tests
      run: flutter test

    - name: Build staging APK
      run: flutter build apk --release --flavor staging
```

새로 추가된 코드 조각은 Android 응용 프로그램에 서명하는 데 필요한 Android 서명 속성과 키스토어 파일을 검색하고 설정하도록 설계되었습니다. 각 부분이 무엇을 하는지 살펴보겠습니다:

단계별 구문 분석
서명 속성(.properties) 검색

```js
- name: Retrieve signing.properties
  env:
    ANDROID_SIGNING_PROPERTIES: ${{ secrets.ANDROID_SIGNING_PROPERTIES }}
  run: echo "$ANDROID_SIGNING_PROPERTIES" >> ./android/signing.properties
```

<div class="content-ad"></div>

**Explanation:**

**env:** 환경 변수 **ANDROID_SIGNING_PROPERTIES**를 GitHub Actions 시크릿인 **ANDROID_SIGNING_PROPERTIES**의 값으로 설정합니다.

**run:** 쉘 명령어를 실행하여 **ANDROID_SIGNING_PROPERTIES**의 값을 **./android** 디렉토리에 위치한 **signing.properties**라는 파일에 출력합니다. \` 는 값을 파일에 추가합니다. 파일이 존재하지 않는 경우에는 새로 생성됩니다.

KeyStore 가져오기

```js
- name: KeyStore 가져오기
  env:
     KEYSTORE_BASE64: ${secrets.KEYSTORE_BASE64}
  run: echo "$KEYSTORE_BASE64" | base64 --decode > ./android/app/keystore.jks
```

<div class="content-ad"></div>

환경 변수 KEYSTORE_BASE64에 GitHub Actions 시크릿 KEYSTORE_BASE64의 값을 설정합니다.

아래 쉘 명령어를 실행하여 Base64로 인코딩된 키스토어를 디코딩하고 이를 바이너리 파일로 저장합니다.
`echo "$KEYSTORE_BASE64"`은 KEYSTORE_BASE64 환경 변수에 저장된 Base64로 인코딩된 문자열을 출력합니다.

이 출력을 base64 명령어에 파이핑하여 Base64 문자열을 원래 바이너리 형식으로 디코딩합니다.

`./android/app/keystore.jks`은 디코딩된 바이너리 내용을 ./android/app 디렉토리에 있는 keystore.jks라는 파일에 작성합니다.

<div class="content-ad"></div>

스테이징 APK를 빌드하는 코드 스니펫입니다.
우리의 Workflow의 다음 단계에서는 Firebase-Distribution-Github-Action을 사용하여 출력 APK를 업로드할 것입니다.

## 단계 4 Firebase 앱 배포

<div class="content-ad"></div>

파이어베이스 액션을 추가하기 전에 시크릿에 FIREBASE_APP_ID 및 CREDENTIAL_FILE_CONTENT를 설정해야 합니다.

FIREBASE_APP_ID는 애플리케이션을 설정한 후 파이어베이스의 일반 설정에서 찾을 수 있습니다.

![이미지](/assets/img/2024-05-17-HowBigPayIncreasedFlutterDeveloperVelocityPart1CICDforFlutterAndroid_4.png)

CREDENTIAL_FILE_CONTENT에 대한 자세한 설명은 공식 문서에서 제공하는 지침을 따라 3단계(비공개 JSON 키 만들기 및 다운로드)까지 따르십시오.

<div class="content-ad"></div>

새로운 시크릿 2개를 생성해주세요. FIREBASE_APP_ID에는 firebase 앱 ID를 값으로 넣고, CREDENTIAL_FILE_CONTENT에는 이전 단계에서 생성된 파일의 내용을 값으로 넣어주세요 (아래 샘플에서는 이 시크릿의 이름이 FIREBASE_ANDROID_STAGING_APP_ID 및 CREDENTIAL_FILE_CONTENT입니다).

파이어베이스 액션 추가

```js
  - name: 스테이징 APK를 Firebase에 업로드
    uses: wzieba/Firebase-Distribution-Github-Action@v1
    with:
      appId: ${vars.FIREBASE_ANDROID_STAGING_APP_ID}
      serviceCredentialsFileContent: ${secrets.CREDENTIAL_FILE_CONTENT}
      groups: "android-qa"
      file: ./flutter/build/app/outputs/flutter-apk/app-staging-release.apk
```

이 워크플로우 단계에서는 Firebase-Distribution-Github-Action을 사용하여 apk 출력을 업로드하고 android-qa 라는 qa 테스터 그룹에 업로드합니다.

<div class="content-ad"></div>

## 단계 5 Diawi 업로드

- 아티팩트를 업로드하기 위해 Diawi를 활용하려면 Diawi.com 계정이 필요합니다. 아직 계정이 없다면 diawi.com을 방문하여 하나를 만드십시오.
- Diawi 계정에 로그인한 후 다음 링크로 이동하여 Diawi API 액세스 토큰을 생성하십시오: Diawi API 액세스 토큰.
- 토큰을 생성하면 브라우저에 표시됩니다. 이 토큰은 한 번만 볼 수 있으므로 즉시 저장해두어야 합니다. 이 토큰은 Diawi로 아티팩트를 업로드할 때 인증에 필요합니다.
- diawi 토큰이 생성되었으니 값을 가지는 1개의 새로운 시크릿 DIAWI_TOKEN을 만드십시오.

Diawi 액션 추가

```js
- name: 스테이징 APK를 Diawi에 업로드
  uses: rnkdsh/action-upload-diawi@v1.5.5
  id: diawi-upload-staging
  with:
    token: ${ secrets.DIAWI_TOKEN }
    file: ./flutter/build/app/outputs/flutter-apk/app-staging-release.apk

- name: 업로드된 스테이징 APK의 Diawi 링크 가져오기
  run: echo "Diawi 링크 ${ steps.diawi-upload-staging.outputs.url }"
```

<div class="content-ad"></div>

우리의 Workflow의 마지막 단계에서는 apk 출력을 Diawi에 업로드하고 Diawi 링크를 출력합니다.

요약된 Workflow는 다음과 같습니다:

```js
name: build-android
on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: '17'

    - name: Set up Flutter
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.19.1'
    
    - name: Retrieve signing.properties
      env:
        ANDROID_SIGNING_PROPERTIES: ${ secrets.ANDROID_SIGNING_PROPERTIES }
      run: echo "$ANDROID_SIGNING_PROPERTIES" >> ./android/signing.properties

    - name: Retrieve keystore
      env:
        KEYSTORE_BASE64: ${ secrets.KEYSTORE_BASE64 }
      run: echo "$KEYSTORE_BASE64" | base64 --decode > ./android/app/keystore.jks

    - name: Install dependencies
      run: flutter pub get

    - name: Run tests
      run: flutter test

    - name: Build staging APK
      run: flutter build apk --release --flavor staging

    - name: Upload staging APK to Firebase
      uses: wzieba/Firebase-Distribution-Github-Action@v1
      with:
        appId: ${ vars.FIREBASE_ANDROID_STAGING_APP_ID }
        serviceCredentialsFileContent: ${ secrets.CREDENTIAL_FILE_CONTENT }
        groups: "android-qa"
        file: ./flutter/build/app/outputs/flutter-apk/app-staging-release.apk

    - name: Upload staging APK to Diawi
      uses: rnkdsh/action-upload-diawi@v1.5.5
      id: diawi-upload-staging
      with:
        token: ${ secrets.DIAWI_TOKEN }
        file: ./flutter/build/app/outputs/flutter-apk/app-staging-release.apk
    
    - name: Get Diawi link of uploaded staging APK
      run: echo "Diawi link ${ steps.diawi-upload-staging.outputs.url }"
```

## 작업 진행 중인 Workflow

<div class="content-ad"></div>

이제 Workflow를 완료했으니, 액세스하는 것은 간단합니다. GitHub 저장소의 "Actions" 탭으로 이동하면 거기에서 찾을 수 있습니다!

![이미지](/assets/img/2024-05-17-HowBigPayIncreasedFlutterDeveloperVelocityPart1CICDforFlutterAndroid_5.png)

앞으로 내부 테스터들과 새 빌드를 공유해야 할 때는, 메인 브랜치로 간단히 푸시하면 됩니다. 그게 전부입니다! 더 이상 테스터들에게 빌드를 배포하는 데 대한 귀찮음이나 스트레스 없이 간단히 푸시하면 되죠.

# 결과

<div class="content-ad"></div>

CI/CD 파이프라인을 도입한 후 개발 워크플로우에서 상당한 개선을 보았습니다. 빌드 시간이 줄고 배포가 더 신뢰할 수 있어졌으며, 팀원들은 빌드 및 배포 관리보다는 새로운 기능 개발에 더 많은 시간을 할애할 수 있게 되었습니다. 이러한 변화로 우리의 개발 속도와 전반적인 생산성이 크게 향상되었습니다.

# 결론

GitHub Actions를 CI/CD 파이프라인으로 채택함으로써 개발 프로세스를 간소화하고 효율성을 향상시켰습니다. CI/CD를 도입하는 것은 소프트웨어 품질과 효율적인 배포를 보장하기 위해 중요합니다. 빌드, 테스트 및 배포 프로세스를 자동화함으로써 우리는 사용자에게 빠르고 신뢰할 수 있는 업데이트를 제공하여 BigPay와의 전반적인 경험을 향상시킬 수 있습니다.

iOS 앱을 위한 비슷한 CI/CD 워크플로우 설정에 대해 보다 자세히 살펴볼 Part 2를 기대해 주세요.

<div class="content-ad"></div>

참고 자료

- [https://docs.flutter.dev/deployment/android](https://docs.flutter.dev/deployment/android)