---
title: "리액트 네이티브 앱을 위한 CICD 파이프라인 Fastlane과 GitHub Actions 사용하기 - 파트 1 Fastlane 이해하기"
description: ""
coverImage: "/assets/img/2024-05-12-CICDpipelineforReactNativeappsuseFastlaneandGitHubActions-Part1understandFastlane_0.png"
date: 2024-05-12 22:32
ogImage: 
  url: /assets/img/2024-05-12-CICDpipelineforReactNativeappsuseFastlaneandGitHubActions-Part1understandFastlane_0.png
tag: Tech
originalTitle: "CI CD pipeline for React Native apps: use Fastlane and GitHub Actions- Part 1: understand Fastlane"
link: "https://medium.com/@malikchohra/ci-cd-pipeline-for-react-native-apps-use-fastlane-and-github-actions-40f9ad2036d0"
isUpdated: true
---




![Screenshot](/assets/img/2024-05-12-CICDpipelineforReactNativeappsuseFastlaneandGitHubActions-Part1understandFastlane_0.png)

리액트 네이티브 프레임워크는 크로스 플랫폼 앱 개발을 혁신적으로 변화시켰으며, iOS 및 Android 모두에 대한 풍부하고 성능이 우수한 애플리케이션을 개발할 수 있도록 허용합니다. 그러나 현대 소프트웨어 개발에서 요구되는 민첩성은 코드 작성 뿐만 아니라 견고한 테스트, 자동화된 빌드 및 신속한 배포도 포함됩니다.

리액트 네이티브는 iOS 및 Android 애플리케이션 모두를 제공하므로 Apple 및 Google 스토어에 출시하는 것은 머리아플 수도 있습니다: 둘 다 별도로 빌드하고 테스트하고, 리뷰에 제출하고 확인을 기다립니다. 리액트 네이티브의 초창기에 이러한 프로세스를 수행하는 것은 머리아팠지만, 그 이후에 그 작업을 수행할 수 있는 도구들이 출시되었습니다.

해당 프로세스는 다음과 같이 수행되었습니다:



## 안드로이드 (Google Play Store):

- 개발자들은 Android Studio를 사용하여 코드를 작성하고 안드로이드 앱 프로젝트를 관리합니다. Gradle은 빌드 프로세스를 자동화하며 코드 컴파일 및 APK 생성과 같은 작업을 처리합니다. 앱이 배포 준비가 되면, 개발자들은 Google Play 콘솔을 사용하여 앱을 제출하고, 앱 메타데이터를 관리하며 사용자 피드백 및 분석을 모니터링합니다.

## iOS (Apple App Store):

- Xcode는 iOS 앱 개발의 주요 도구로, 구축 및 테스트를 위한 포괄적인 기능 세트를 제공합니다. Fastlane은 Xcode를 보완하여 배포 작업을 자동화합니다. 개발자들은 Fastlane 레인을 구성하여 앱을 빌드, 코드 서명, App Store에 앱을 릴리스하는 작업을 처리합니다. Apple Developer 계정은 App Store에 앱을 제출하기 위한 필수 사항이며, 여기서 개발자들은 앱 인증서, 프로비저닝 프로필 및 앱 제출을 관리합니다.



표가 있던 형식은 자동화 도구들이 소개되기 전까지는 그랬어요. 그 중 일부는 다음과 같아요:

## Expo

Expo는 React Native 앱의 개발 및 배포를 간단하게 만드는 플랫폼이에요. iOS 및 Android 장치 모두에 앱을 쉽게 구축, 테스트 및 배포할 수 있는 도구와 서비스를 제공해요. 또한 Expo에는 Google Play Store와 Apple App Store용 앱 이진 파일을 생성할 수 있는 내장된 빌드 서버도 포함돼 있어요.

## Fastlane



패스트레인은 iOS 및 안드로이드 앱 개발 및 배포와 관련된 작업을 자동화하는 도구입니다. 빌드, 테스트, 앱 배포, Google Play Store 및 Apple App Store를 위한 스크린샷 및 메타데이터 생성 등과 같은 작업을 자동화하는 데 사용할 수 있습니다.

패스트레인은 "레인"이라는 개념을 소개하여 워크플로우를 간소화합니다. 빌드, 테스트, 코드 서명 및 배포와 같은 작업을 자동화하여 수동 에러를 줄이고 전체 생산성을 향상시킵니다.

## AppCenter

AppCenter는 iOS 및 안드로이드 기기에 앱을 빌드, 테스트 및 배포하는 데 사용되는 도구 모음을 제공하는 플랫폼입니다. 내장된 빌드 서버, 지속적 통합 및 지속적 전달 (CI/CD) 파이프라인 및 배포 플랫폼이 포함되어 있습니다.



## Codemagic

코드매직은 클라우드 기반 CI/CD 플랫폼으로, 모바일 앱의 빌드 및 배포를 자동화하는 데 사용할 수 있습니다. Expo, Fastlane, AppCenter 등 다양한 도구와 통합됩니다.

## Firebase

Firebase는 모바일 앱을 빌드, 배포 및 관리하기 위한 다양한 서비스를 제공하는 플랫폼입니다. 내장된 CI/CD 파이프라인, 배포 플랫폼, 그리고 분석, 크래시 보고 등의 기능을 위한 도구 세트를 포함하고 있습니다.



저에게 있어서 제일 좋은 도구는 Fastlane이었어요. 이 도구를 사용해서 제작한 앱들을 수동으로 제출하는데 사용했지만, GitHub Actions가 도입되면서 더 쉬워졌어요.

GitHub Actions는 GitHub 저장소와 완벽하게 통합되는 CI/CD 플랫폼입니다. 이를 사용하여 개발자들은 코드 푸시 또는 풀 리퀘스트와 같은 이벤트로 트리거되는 자동화된 워크플로우를 정의할 수 있습니다.

이 기사에서는 Fastlane을 GitHub Actions와 함께 사용하여 CI/CD 릴리스 프로세스를 진행하는 방법을 단계별로 안내할 거에요.

## 가정들



튜토리얼 일부를 따를 수 있어요:

- 맥 머신을 사용하고 계시다면 좋아요
- React Native 저장소를 호스팅하는 GitHub 계정을 가지고 있어요
- React Native 앱과 이미 통합된 Firebase 계정을 가지고 있어요 (Firebase 앱 배포를 건너뛸 수 있다면 선택사항)
- Google Play Store와 iOS App Store에 앱이 등록되어 있어요

# 솔루션을 엔지니어링하는 방법:

이 섹션에서는 Fastlane과 Github actions을 통합하는 방법을 설명하고 싶어요. 다른 튜토리얼을 읽을 수 있지만, 주로 어떻게 하는지 보여주는 것보다는 어떻게 엔지니어링하는지에 대해 알려드릴 거예요. '어떻게 생각하는지 가르치는' 방법을 알 수 있을 거예요.



## Fastlane의 내부 작동 방식:

Fastlane은 빌드, 테스트 및 제출 작업을 자동화합니다. 아래와 같은 방법으로 사용됩니다:

- 레인 정의: Fastfile에서 레인을 정의하여 관련 작업을 그룹화합니다. 예를 들어, 앱을 빌드하는 레인, 앱을 테스트하는 레인, 앱을 배포하는 레인 등이 있을 수 있습니다.
- 플러그인 사용: Fastlane은 다양한 작업을 자동화할 수 있는 풍부한 플러그인 생태계를 보유하고 있습니다. 예를 들어, 앱을 빌드하는 플러그인, 앱을 테스트하는 플러그인, 스크린샷을 생성하는 플러그인, 앱을 앱 스토어에 제출하는 플러그인 등이 있습니다.
- 자격증명 및 비밀 정보: Fastlane은 API 키, 인증서, 프로비저닝 프로필과 같은 중요 정보를 안전하게 관리할 수 있는 방법을 제공합니다. 이러한 정보는 빌드 프로세스 중에 안전하게 저장되고 액세스할 수 있습니다.

- iOS 및 Android 앱에 서명하기 위해 인증서와 프로비저닝 프로필이 필요합니다. 이를 통해 개발자는 Apple 또는 Google에 자신을 식별하고 앱을 앱 스토어 또는 구글 플레이에 배포할 수 있습니다.
- 이는 빌드 및 제출 작업시 다른 인증서와 프로비저닝 프로필이 필요하기 때문에 중요합니다. 이를 관리하기 위해 사용되는 플러그인 중 하나가 Fastlane Match입니다.



4. 앱 테스트하기: Fastlane을 사용하면 배포 전에 앱이 정확히 작동하는지 확인하는 테스트를 실행할 수 있습니다.

5. 스크린샷 생성하기: Fastlane을 사용하면 앱 스토어를 위한 스크린샷을 생성할 수 있어서 앱이 다양한 기기에서 잘 보이도록 할 수 있습니다.

iOS의 경우:

- Fastlane을 사용하여 원하는 iOS 기기나 시뮬레이터용으로 앱을 빌드할 수 있습니다.
- Fastlane을 사용하여 XCTest나 Jest와 같은 도구로 iOS 테스트를 실행할 수 있습니다.
- Fastlane을 사용하여 FastlaneSnapshots와 같은 도구로 앱 스토어를 위한 스크린샷을 생성할 수 있습니다.
- Fastlane을 사용하여 App Store Connect와 같은 도구로 앱을 앱 스토어에 제출할 수 있습니다.



## 안드로이드 용:

- Fastlane은 원하는 Android 장치 또는 에뮬레이터를 위해 Gradle 또는 Bazel을 사용하여 앱을 빌드할 수 있습니다.
- Fastlane은 Espresso 또는 Mockito와 같은 도구를 사용하여 Android 테스트를 실행할 수 있습니다.
- Fastlane은 Appium과 같은 도구를 사용하여 Google Play Store를 위한 스크린샷을 생성할 수 있습니다.
- Fastlane은 Google Play Console과 같은 도구를 사용하여 앱을 Google Play Store에 제출할 수 있습니다.

팁: Fastlane은 미리 정의된 스크립트를 실행하므로 수동으로 수행할 수 있는 작업을 자동화합니다. 이는 Fastlane이 필요하지 않고 앱을 Apple 및 Google 스토어에 제출하는 CI-CD 프로세스를 달성할 수 있다는 것을 의미합니다. 그러나 사용하면 (자동화 도구와 같은) CI-CD 프로세스를 크게 개선할 수 있습니다.