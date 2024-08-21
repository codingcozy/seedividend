---
title: "React Native CICD GitHub Actions와 App Center 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-ReactNativeCICDGitHubActionsAppCenter_0.png"
date: 2024-06-23 13:14
ogImage:
  url: /assets/img/2024-06-23-ReactNativeCICDGitHubActionsAppCenter_0.png
tag: Tech
originalTitle: "React Native CI CD: GitHub Actions , App Center"
link: "https://medium.com/towardsdev/react-native-ci-cd-github-actions-app-center-e173f14d770c"
isUpdated: true
---

React Native 프로젝트에 대한 Continuous Integration 및 Continuous Deployment (CI/CD) 설정은 빌드, 테스트 및 배포 프로세스 자동화를 포함합니다. 이렇게 React Native 프로젝트를 CI/CD하려면 인기 있는 도구인 CI용 GitHub Actions 및 CD용 App Center를 사용하는 기본 예제가 있습니다:

![React Native CI/CD](/assets/img/2024-06-23-ReactNativeCICDGitHubActionsAppCenter_0.png)

1. GitHub 저장소 설정:

- 이미 하지 않았다면 React Native 프로젝트용 GitHub 저장소를 만듭니다.
- React Native 프로젝트 코드를 이 저장소에 푸시합니다.

2. CI용 GitHub Workflow 만들기:

- 저장소에 `.github/workflows/ci.yml` 파일을 만듭니다.
- GitHub Actions를 사용하여 CI 워크플로우를 정의하기 위해 이 파일을 구성합니다. 다음은 기본 예제입니다:

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

```yaml
이름: CI

활성화:
  푸시:
    브랜치: [main]

작업:
  빌드:
    실행: ubuntu-latest

    단계:
      - 이름: 코드 체크아웃
        사용: actions/checkout@v2

      - 이름: Node.js 설정
        사용: actions/setup-node@v1
        with:
          node-version: "14.x"

      - 이름: 종속성 설치
        실행: npm install

      - 이름: 빌드
        실행: npm run build

      - 이름: 테스트
        실행: npm test
```

3. CD를 위해 앱 센터 설정:

- 이미 Microsoft 앱 센터에 계정이 없다면 계정을 설정하세요.
- React Native 프로젝트에 대응하는 앱 센터에서 앱을 생성하세요.

4. App Center와 CD 통합:

- 개발 환경에서 App Center CLI를 설치하세요.
- CLI를 App Center와 인증하세요.
- React Native 프로젝트에 App Center를 통합하세요:

```bash
appcenter login
appcenter apps create -d "Your React Native App" -o "React Native" -p React-Native
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

— App Center에서 제공하는 지침에 따라 React Native 프로젝트에 SDK를 통합하여 충돌 보고, 분석 및 배포 기능을 활성화하세요.

5. CD 파이프라인 구성:
   — 자동 배포를 위해 App Center에 릴리스 파이프라인을 생성하세요.
   — 새 빌드 아티팩트가 생성된 경우(예: CI 성공 후) 파이프라인을 트리거하도록 구성하세요.

6. CD 트리거를 위한 GitHub Workflow 업데이트:
   — 성공한 빌드 후 App Center CD를 트리거하도록 GitHub Actions workflow를 수정하세요:

```js
...
jobs:
  build:
    ...
    steps:
      ...

  deploy:
    needs: build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Trigger App Center Release
        run: appcenter codepush release-react -a <ownerName>/<appName> -d <deploymentName>
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

7. 변경 내용 커밋 및 푸시하기:

- `.github/workflows/ci.yml` 및 다른 관련 파일에 변경 내용을 커밋합니다.
- 변경 사항을 GitHub 저장소에 푸시합니다.

위 단계를 통해 React Native 프로젝트를 위한 기본 CI/CD 파이프라인을 설정했습니다. 저장소에 변경 사항을 푸시할 때마다 GitHub Actions가 자동으로 빌드하고 테스트를 실행합니다. 성공적으로 완료되면, App Center가 앱을 지정된 배포 환경으로 배포합니다. 해당 설정을 프로젝트 요구사항과 선호에 맞게 조정하고 확장해보세요.
