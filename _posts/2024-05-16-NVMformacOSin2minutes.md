---
title: "맥용 NVM을 2분 안에 설정하기"
description: ""
coverImage: "/assets/img/2024-05-16-NVMformacOSin2minutes_0.png"
date: 2024-05-16 17:08
ogImage:
  url: /assets/img/2024-05-16-NVMformacOSin2minutes_0.png
tag: Tech
originalTitle: "NVM for macOS in 2 minutes"
link: "https://medium.com/@sergi-jimenez/nvm-for-macos-in-2-minutes-0d5adec21e0a"
isUpdated: true
---

![NVM for MacOS](/assets/img/2024-05-16-NVMformacOSin2minutes_0.png)

애플리케이션이 Node.js 아키텍처를 기반으로 한 경우, 서로 다른 버전 간을 전환할 수 있는 능력은 기존 프로젝트와 최신 플랫폼 기능을 활용하기 위해 필수적입니다. 그러나 MacOS와 같은 운영 체제에서는 네이티브로 통합되지 않아 버전 관리가 복잡해질 수 있습니다.

# NVM이란?

NVM은 하나의 시스템에서 여러 버전의 Node.js를 쉽게 설치하고 관리할 수 있게 해주는 명령줄 도구입니다. 그러나 MacOS에서의 구현은 환경 및 의존성 관리에 대한 차이로 인해 다른 운영 체제와 비교했을 때 특별한 도전을 안겨줍니다. 왜냐하면 MacOS에는 내장되어 있지 않기 때문에 대신 Homebrew를 설치해야 합니다.

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

# 어떻게 설치하나요?

터미널을 열고 다음 명령어로 Homebrew를 설치하세요:

```js
/bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/Homebrew/install/master/install.sh>)"
```

Homebrew가 설치되면 NVM을 설치할 차례입니다.

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
brew install nvm
```

NVM을 사용하려면 항상 ~/.bash_profile 또는 ~/.zshrc 파일에 포함해야 합니다:

```js
source $(brew --prefix nvm)/nvm.sh
```

이 파일들을 찾을 수 없는 경우 sudo su 명령어를 사용하여 수퍼유저로 접근하여 찾을 수 있습니다. 만약 해당 파일이 없다면, 직접 생성할 수 있습니다.

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

NVM을 설치한 후에는 NodeJS의 최신 버전을 설치할 차례입니다:

```js
nvm install node
```

설치가 완료되면 우리가 원하는 NodeJS 버전들을 설치할 수 있습니다. 이를 위해 컴퓨터에 설치된 모든 버전을 확인하려면 다음 명령을 사용하십시오:

```js
nvm ls-remote
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

만약 우리가 설치하고 싶은 버전을 모른다면 공식 NodeJS 웹사이트를 참고할 수 있어요. 설치하고 싶은 버전을 알고 있다면 다음 명령어를 입력하면 돼요:

```js
nvm install [설치할 버전]

## 예시:
nvm install 18.10.0
```

설치되면 아래와 같이 사용할 수 있어요:

```js
nvm use [사용할 버전]

## 예시:
nvm use 18.10.0
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

만약 우리가 다른 버전으로 변경하길 원한다면 먼저 nvm list로 설치된 모든 버전을 나열해야 합니다. 원하는 버전을 찾으면 nvm use [원하는 버전 번호]를 사용하여 해당 버전을 사용할 수 있습니다.

# 결론

Homebrew를 통해 MacOS에 NVM을 설치하면 Node.js 버전 관리가 크게 간소화됩니다. NVM을 사용하면 시스템에서 여러 버전의 Node.js를 쉽게 설치, 전환 및 관리할 수 있어서 다양한 프로젝트에 적응하고 최신 플랫폼 기능을 활용할 수 있습니다. 몇 가지 터미널 명령만으로 새로운 버전을 설치하고 이를 전환하며 개발 환경이 항상 호환되고 최신 상태임을 보장할 수 있습니다. 확실히 NVM을 통해 macOS에서 Node.js 개발 환경을 완전히 제어할 수 있어서 호환성 문제나 오래된 버전에 대해 걱정하지 않고 놀라운 애플리케이션을 만드는 데 집중할 수 있습니다.
