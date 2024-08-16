---
title: "storybook CLI 명령어 옵션 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "CLI options"
link: "https://storybook.js.org/docs/api/cli-options"
isUpdated: true
---






Storybook의 명령줄 인터페이스(CLI)는 Storybook을 구축하고 개발하는 데 사용하는 주요 도구입니다.

## API 명령어

CLI에서 storybook --help를 실행하여 다음 문서를 확인할 수 있습니다.

### dev



귀하의 프로젝트 루트에서 실행되어야 합니다. 브라우저에서 소스 코드 변경 사항을 실시간으로 반영하는 Storybook 개발 빌드를 컴파일하고 제공합니다.

```js
storybook dev [options]
```

옵션은 다음을 포함합니다:

### build



Storybook 인스턴스를 컴파일해서 배포할 수 있도록 준비하세요. 프로젝트의 루트에서 실행해야 합니다.

```js
storybook build [options]
```

옵션은 다음과 같습니다:

### init



프로젝트에 지정된 버전(@latest, @8, @next 등)의 Storybook을 설치하고 초기화합니다. 설치 가이드에서 자세히 읽어보세요.

```js
storybook[@version] init [options]
```

예를 들어, storybook@latest init을 입력하면 최신 버전의 Storybook이 프로젝트에 설치됩니다.

옵션은 다음과 같습니다:



### 추가

Storybook 애드온을 설치하고 프로젝트를 구성합니다. 애드온 설치 가이드에서 자세히 알아볼 수 있어요.

```js
storybook@latest add [addon] [options]
```

옵션은 아래와 같아요:



### 삭제

프로젝트에서 Storybook 애드온을 삭제합니다. 애드온 설치 가이드에서 자세히 알아보세요.

```js
storybook@latest remove [addon] [options]
```

옵션은 다음과 같습니다:



### 업그레이드

지정된 버전(@latest, @8, @next 등)으로 당신의 Storybook 인스턴스를 업그레이드합니다. 업그레이드 가이드에서 더 읽어보세요.

```js
storybook[@version] upgrade [options]
```

예를 들어, storybook@latest upgrade --dry-run을 실행하면 프로젝트를 가장 최신 버전의 Storybook으로 업그레이드하는 변경 사항을 실제로 적용하지 않고 시뮬레이션할 것입니다.



옵션은 다음과 같습니다:

### 마이그레이션

지정된 버전과 호환되도록 Storybook 프로젝트를 확실하게 하는 codemod를 실행합니다. 마이그레이션 가이드에서 자세히 알아보세요.

```js
storybook[@version] migrate [codemod] [options]
```



예를 들어, storybook@latest migrate csf-2-to-3 --dry-run은 프로젝트를 확인하여 변화를 주지 않고도 코드 모드를 적용할 수 있는지를 확인하고, 영향을 받을 파일들을 보고해줍니다.

옵션은 다음과 같습니다:

### automigrate

지정된 버전으로 Storybook 프로젝트를 자동으로 마이그레이션할 수 있는지 확인하기 위해 표준 구성 검사를 수행합니다. 마이그레이션 가이드에서 자세히 알아보세요.



```js
storybook[@version] automigrate [fixId] [options]
```

예를 들어, storybook@latest automigrate --dry-run은 프로젝트를 스캔하여 변경 사항을 가하지 않고 자동으로 적용할 수 있는 잠재적인 마이그레이션을 찾습니다.

옵션에는 다음이 포함됩니다:

### doctor



당신의 스토리북 프로젝트에서 일반적인 문제를 확인하고 해결 방법에 대한 제안을 제공합니다 (예: 중복 의존성, 호환되지 않는 애드온 또는 버전 불일치 등). 스토리북 버전을 업그레이드할 때 유용합니다.

```js
storybook doctor [옵션]
```

옵션은 다음과 같습니다:

### 정보



Reports useful debugging 정보를 제공하는 스토리북 info 명령어에 대한 예시 출력입니다:

```js
Storybook Environment Info:

  System:
    OS: macOS 14.2
    CPU: (8) arm64 Apple M3
    Shell: 5.9 - /bin/zsh
  Binaries:
    Node: 18.19.0 - ~/.nvm/versions/node/v18.19.0/bin/node
    npm: 10.2.3 - ~/.nvm/versions/node/v18.19.0/bin/npm <----- active
  Browsers:
    Chrome: 120.0.6099.199
  npmPackages:
    @storybook/addon-essentials: ^7.6.6 => 7.6.6
    @storybook/addon-interactions: ^7.6.6 => 7.6.6
    @storybook/addon-links: ^7.6.6 => 7.6.6
    @storybook/addon-onboarding: ^1.0.10 => 1.0.10
    @storybook/blocks: ^7.6.6 => 7.6.6
    @storybook/preset-create-react-app: ^7.6.6 => 7.6.6
    @storybook/react: ^7.6.6 => 7.6.6
    @storybook/react-webpack5: ^7.6.6 => 7.6.6
    @storybook/test: ^7.6.6 => 7.6.6
    storybook: ^7.6.6 => 7.6.6
  npmGlobalPackages:
    chromatic: ^10.2.0 => 10.2.0
```



### 샌드박스

지정된 버전(예: @latest, @8, @next)을 사용하여 테스트용 Storybook 기능을 기반으로 지원되는 프레임워크 목록에 따라 로컬 샌드박스 프로젝트를 생성합니다. 이 기능은 이슈를 오픈하거나 토론을 할 때 버그를 재현하는 데 유용합니다.

```js
storybook[@version] sandbox [framework-filter] [options]
```

예를 들어, storybook@next sandbox는 Storybook의 최신 사전 릴리스 버전을 사용하여 샌드박스를 생성합니다.



프레임워크 필터 인자는 선택 사항이며 사용 가능한 프레임워크 목록을 필터링할 수 있습니다. 예를 들어, storybook@next sandbox react는 React 기반 샌드박스를 생성할 수 있는 옵션만 제공합니다.

옵션을 포함하여: