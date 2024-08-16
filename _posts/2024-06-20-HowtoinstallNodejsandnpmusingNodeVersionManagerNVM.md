---
title: "Node Version Manager NVM를 사용하여 Nodejs와 npm을 설치하는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoinstallNodejsandnpmusingNodeVersionManagerNVM_0.png"
date: 2024-06-20 01:46
ogImage: 
  url: /assets/img/2024-06-20-HowtoinstallNodejsandnpmusingNodeVersionManagerNVM_0.png
tag: Tech
originalTitle: "How to install Node.js and npm using Node Version Manager (NVM)"
link: "https://medium.com/@imvinojanv/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1"
isUpdated: true
---




## Node.js, npm

![Node.js and npm](/assets/img/2024-06-20-HowtoinstallNodejsandnpmusingNodeVersionManagerNVM_0.png)

# NVM을 이용하여 Node.js와 npm 설치하기

Node.js를 설치하는 대안으로, Node Version Manager(NVM)라는 도구를 사용할 수 있습니다. NVM은 운영 체제 수준이 아닌 홈 디렉토리 내의 독립적인 디렉토리 수준에서 작동합니다. 이는 전체 시스템에 영향을 미치지 않고 여러 개의 독립된 Node.js 버전을 설치할 수 있다는 것을 의미합니다.

<div class="content-ad"></div>

NVM(노드 버전 관리자)은 여러 활성 노드.js 버전을 관리하는 데 사용되는 bash 스크립트입니다. NVM을 사용하면 사용하거나 테스트하려는 원하는 특정 노드.js 버전을 설치하거나 제거할 수 있습니다.

Ubuntu 시스템에서 NVM을 사용하여 노드.js 및 npm을 설치하려면 다음 단계를 수행하세요:

## 1. NVM(노드 버전 관리자) 스크립트 설치

nvm 스크립트를 다운로드하고 설치하려면 다음을 실행하세요:

<div class="content-ad"></div>

```js
✔ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

위 명령어는 Github의 NVM 저장소를 ~/.nvm 디렉토리로 클론합니다:

```js
출력
=> nvm을 사용하기 위해 터미널을 닫았다가 다시 열거나 아래 명령어를 실행하세요:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # 이 명령은 nvm을 불러옵니다
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # 이 명령은 nvm bash_completion을 불러옵니다
```

## ⭕ 참고 :
터미널에서 “curl: command not found” 오류가 발생하는 경우.

<div class="content-ad"></div>

Debian에서 Curl 유틸리티 설치

Curl은 Debian 10 운영 체제의 공식 APT 패키지 저장소에서 설치할 수 있습니다.

먼저 아래 명령을 사용하여 시스템의 저장소 캐시를 업데이트하세요:

```bash
sudo apt update
```

<div class="content-ad"></div>

이제 아래 명령을 사용하여 설치된 패키지를 업그레이드하세요:

```js
✔ sudo apt upgrade
```

시스템을 성공적으로 업데이트하고 업그레이드한 후에는 데비안 10 시스템에 Curl을 설치하기 위해 아래 명령을 입력하세요.

```js
✔ sudo apt install curl
```

<div class="content-ad"></div>

Curl 라이브러리 설치가 시작되어 다운로드되고, 곧 설치될 것입니다.

설치가 완료되면 NVM 설치 명령을 실행할 수 있어요...👍
— ⭕

## 2. 터미널을 다시 시작해주세요

프로필의 변경 사항을 반영하려면 터미널을 닫고 다시 열어주세요

<div class="content-ad"></div>

## 3. 확인해 보세요

nvm이 제대로 설치되었는지 확인하려면 다음을 입력하세요:

```js
nvm --version
출력
0.34.0
```

## 4. 어떤 일을 하는지 확인해 보세요

<div class="content-ad"></div>

nvm ls-remote 명령어를 실행하여 사용 가능한 모든 버전의 목록을 확인해보세요.

```js
출력
       v14.13.0
       v14.13.1
       v14.14.0
       v14.15.0   (LTS: Fermium)
       v14.15.1   (LTS: Fermium)
       v14.15.2   (LTS: Fermium)
       v14.15.3   (LTS: Fermium)
       v14.15.4   (LTS: Fermium)
       v14.15.5   (LTS: Fermium)
       v14.16.0   (LTS: Fermium)
       v14.16.1   (LTS: Fermium)
       v14.17.0   (LTS: Fermium)
       v14.17.1   (LTS: Fermium)
       v14.17.2   (LTS: Fermium)
       v14.17.3   (LTS: Fermium)
       v14.17.4   (LTS: Fermium)
       v14.17.5   (LTS: Fermium)
       v14.17.6   (LTS: Fermium)
       v14.18.0   (LTS: Fermium)
       v14.18.1   (LTS: Fermium)
       v14.18.2   (LTS: Fermium)
       v14.18.3   (LTS: Fermium)
       v14.19.0   (LTS: Fermium)
       v14.19.1   (LTS: Fermium)
       v14.19.2   (LTS: Fermium)
       v14.19.3   (Latest LTS: Fermium)
        v15.0.0
        v15.0.1
        v15.1.0
        v15.2.0
        v15.2.1
        v15.3.0
        v15.4.0
        v15.5.0
        v15.5.1
        v15.6.0
        v15.7.0
        v15.8.0
        v15.9.0
       v15.10.0
       v15.11.0
       v15.12.0
       v15.13.0
       v15.14.0
        v16.0.0
        v16.1.0
        v16.2.0
        v16.3.0
        v16.4.0
        v16.4.1
        v16.4.2
        v16.5.0
        v16.6.0
        v16.6.1
        v16.6.2
        v16.7.0
        v16.8.0
        v16.9.0
        v16.9.1
       v16.10.0
       v16.11.0
       v16.11.1
       v16.12.0
       v16.13.0   (LTS: Gallium)
       v16.13.1   (LTS: Gallium)
       v16.13.2   (LTS: Gallium)
       v16.14.0   (LTS: Gallium)
       v16.14.1   (LTS: Gallium)
       v16.14.2   (LTS: Gallium)
       v16.15.0   (Latest LTS: Gallium)
        v17.0.0
        v17.0.1
        v17.1.0
        v17.2.0
        v17.3.0
        v17.3.1
        v17.4.0
        v17.5.0
        v17.6.0
        v17.7.0
        v17.7.1
        v17.7.2
        v17.8.0
        v17.9.0
        v18.0.0
        v18.1.0
        v18.2.0
```

## 5. 최신 LTS 버전의 Node.js 및 npm 설치하기

이제 nvm을 설치했으니, 현재 LTS 버전의 Node.js를 설치하고 사용해봅시다!

<div class="content-ad"></div>

```js
✔ nvm install --lts
출력
현재 node v16.15.0을 사용 중입니다 (npm v8.5.5)
기본 별칭 생성: default -> lts/* (-> v16.15.0)
```

작동하는지 확인하고 버전이 올바른지 확인하세요:

```js
✔ node --version
출력
v16.15.0
--------------------------------------------------------------------
✔ npm --version
출력
8.5.5
```

## Node의 기본 버전 설정하기

<div class="content-ad"></div>

만약 여러 개의 Node 버전이 설치되어 있다면, 그 목록을 얻으려면 ls를 실행할 수 있어요:

```js
✔ nvm ls
출력
->     v16.15.0
default -> lts/* (-> v16.15.0)
node -> stable (-> v16.15.0) (default)
stable -> 16.15 (-> v16.15.0) (default)
iojs -> N/A (default)
unstable -> N/A (default)
lts/* -> lts/gallium (-> v16.15.0)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.12 (-> N/A)
lts/fermium -> v14.19.3 (-> N/A)
lts/gallium -> v16.15.0
```

또한 원하는 버전을 기본값으로 설정할 수도 있어요:

```js
✔ nvm alias default 16.15.0

출력
default -> 16.15.0 (-> v16.15.0)
```

<div class="content-ad"></div>

새 세션을 생성하면 이 버전이 자동으로 선택됩니다. 또한 다음 명령의 예시에서와 같이 별칭을 사용하여 이를 참조할 수 있습니다:

```js
✔ nvm use default
Output
Now using node v16.15.0 (npm v8.5.5)
```

각 Node.js 버전은 자체 패키지를 추적하고 이를 관리하는 데 사용할 수 있는 npm을 가지고 있습니다.

# Node.js 제거하기

<div class="content-ad"></div>

Node.js를 삭제하는 방법은 설치된 버전에 따라 apt 또는 nvm을 사용할 수 있어요. 기본 저장소 버전을 제거하려면 시스템 수준에서 apt를 사용할 거예요. 이 명령어는 패키지를 제거하고 구성 파일을 유지합니다. 나중에 다시 패키지를 설치할 계획이 있다면 유용해요:

```bash
✔ sudo apt remove nodejs
```

나중에 구성 파일을 사용할 계획이 없다면 다음 명령어를 실행하여 해당 패키지와 관련된 구성 파일을 함께 제거할 수 있어요:

```bash
✔ sudo apt purge nodejs
```

<div class="content-ad"></div>

마지막으로 제거한 패키지와 함께 자동으로 설치된 사용하지 않는 패키지를 제거할 수 있습니다:

```js
✔ sudo apt autoremove
```

nvm을 사용하여 활성화한 Node.js 버전을 제거하려면 먼저 제거하려는 버전이 현재 활성 버전인지 확인하세요:

```js
✔ nvm current
```

<div class="content-ad"></div>

대상이 되는 버전이 현재 활성 버전이 아닌 경우, 다음을 실행할 수 있습니다:

```js
✔ nvm uninstall node_version
출력
node_version 노드를 제거했습니다
```

이 명령은 선택한 Node.js 버전을 제거합니다.

제거하려는 버전이 현재 활성 버전인 경우, 변경 사항을 적용하려면 먼저 nvm을 비활성화해야 합니다.

<div class="content-ad"></div>

```js
✔ nvm deactivate
```

이제 이전에 사용한 삭제 명령을 사용하여 현재 버전을 삭제할 수 있습니다. 이는 Node.js의 대상 버전과 관련된 모든 파일을 제거하지만 다시 설치하는 데 사용할 수 있는 캐시된 파일은 제외됩니다.

여러분 모두가 제 글을 이해하고 즐기셨으면 좋겠습니다. 더 많은 업데이트를 받기 위해 제 페이지를 팔로우해 주세요.

다른 글을 확인하기 전에, 이미 팔로우하고 있지 않다면 제 페이지를 팔로우해 주십시오. 여러분의 팔로우는 테크 커뮤니티에 더 유용한 콘텐츠를 만드는 데 도움이 됩니다.

<div class="content-ad"></div>

✍️
Vinojan Veerapathirathasan
DecHorizon의 창업자 및 CEO
LinkedIn: [링크](https://www.linkedin.com/in/imvinojanv/)
Github: [링크](https://github.com/imvinojanv)
이메일: vinojan@dechorizon.com | 전화번호: +94 77 573 7782

감사합니다…!