---
title: "맥OS에서 Expo로 빌드하는 동안 권한 문제 해결하기 개인 경험 공유"
description: ""
coverImage: "/assets/img/2024-05-16-SolvingPermissionIssuesinmacOSWhileBuildingwithExpoAPersonalExperience_0.png"
date: 2024-05-16 03:56
ogImage: 
  url: /assets/img/2024-05-16-SolvingPermissionIssuesinmacOSWhileBuildingwithExpoAPersonalExperience_0.png
tag: Tech
originalTitle: "Solving Permission Issues in macOS While Building with Expo: A Personal Experience"
link: "https://medium.com/@srekthk/solving-permission-issues-in-macos-while-building-with-expo-a-personal-experience-c9c4545897f1"
isUpdated: true
---




# 소개

React Native 프로젝트에서 작업하는 개발자로서, macOS에서 네이티브 모듈 및 종속성을 다룰 때 허가 관련 문제에 직면할 수 있습니다. 최근에는 Expo 프로젝트를 위한 네이티브 iOS 폴더를 생성하는 동안 이 문제에 직면했습니다. 제 경험의 단계별 설명과 문제를 해결한 방법을 소개하겠습니다. 여러분에게도 도움이 되기를 바랍니다.

# 문제

macOS에서 Expo 프로젝트의 네이티브 환경을 설정하는 동안 여러 문제를 겪게 되었습니다.



- 초기 설정: 내 맥에 Node.js, Expo 또는 EAS CLI가 설치되지 않았습니다 (새 맥북).
- sudo로 설치: Expo 및 EAS를 설치하기 위해 sudo를 사용했더니 소유권 관련 문제가 발생했습니다.
- 권한 오류: 이 문제로 인해 CocoaPods 및 기타 종속성이 성공적으로 설치되는 것을 방해하는 권한 오류가 발생했습니다.

# 문제 해결 단계

## 단계 1: 문제 파악

npm 패키지를 설치할 때 sudo를 사용하면 파일이 루트 사용자에 의해 소유된 상태가 될 수 있습니다. 이 소유권 불일치로 인해 이후에 해당 패키지를 실행하거나 수정할 때 권한 오류가 발생할 수 있습니다. 문제를 식별하고 해결한 방법은 다음과 같습니다.



## 단계 2: 전역으로 설치된 패키지 제거하기

먼저, sudo를 사용하여 설치된 전역 패키지를 제거해야 했어요.

```js
sudo npm uninstall -g expo-cli eas-cli
```

## 단계 3: 디렉토리 소유권 변경하기



저는 권한 문제를 피하기 위해 프로젝트 디렉토리를 내 사용자 계정의 소유로 설정했어요.

터미널을 열어주세요: 프로젝트가 있는 디렉토리로 이동해주세요.

소유권 변경:

```bash
sudo chown -R 당신의사용자이름:당신의그룹 /Users/ociuz/Documents/nss-kuwait
```



## 단계 4: Expo와 EAS CLI를 sudo 없이 설치하기

다음으로, sudo를 사용하지 않고 Expo와 EAS CLI를 다시 설치했습니다.

```js
npm install -g expo-cli eas-cli
rm -rf /Users/{username}/.npm/_cacache/content-v2/sha512/5b/e8
```



두 번째 명령어는 sudo를 사용하여 생성된 캐시와 파일을 제거하는 것입니다. 이를 본인의 경로로 교체해야 합니다.

## 단계 5: 엑스포 미리 빌드

그런 다음 미리 빌드를 실행하세요.

```js
npx expo prebuild
```



맨 처음에는 CocoaPods 설치가 실패했지만 재시도에서 성공했습니다.

이제 android와 ios 폴더가 생겼을 것입니다.

# 결론

위 단계를 따라서 Expo를 사용하면서 macOS에서 권한 문제를 성공적으로 해결했습니다. 올바른 소유권을 보장하고 개발 도구 설치 시 sudo를 피하는 것이 원활한 설정 과정의 핵심이었습니다. 유사한 문제를 겪으면 이 단계를 시도하고 환경이 올바르게 구성되었는지 확인하세요.



# 추가 팁

- npm 사용 시 sudo 사용 피하기: 전역으로 npm 패키지를 설치할 때는 sudo 사용을 피하는 것이 일반적으로 좋은 관행입니다. 대신, npm을 홈 디렉터리에 패키지를 설치하도록 구성하세요.
- 권한 정기적으로 확인하기: 프로젝트 디렉토리의 권한을 주기적으로 확인하여 예상치 못한 문제를 방지하세요.
- 버전 관리 사용하기: Git과 같은 버전 관리 시스템을 사용하여 데이터 손실을 방지하고 변경 사항을 추적하세요.

이 가이드가 당신의 개발 작업에서 권한 문제를 탐색하고 해결하는 데 도움이 되기를 바라며, 질문이나 추가 팁이 있다면 아래 댓글에서 자유롭게 공유해 주세요!