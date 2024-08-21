---
title: "Nodejs를 NVM으로 설치하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How to install Nodejs by NVM"
link: "https://medium.com/geekculture/how-to-install-node-js-by-nvm-61addf4ab1ba"
isUpdated: true
---

## nvm을 사용하여 여러 버전의 Node.js를 설치하고 관리하세요.

가끔 GitHub를 탐험하다가 몇 가지 Node.js 프로젝트를 클론하면, 현재 설치된 Node.js와 호환되지 않는 경우가 있습니다. 이때 그 버전의 다른 Node.js를 설치해야 합니다. NVM을 사용하면 로컬 머신에서 여러 버전의 Node.js를 쉽게 설치하고 관리할 수 있습니다.

![이미지](/assets/img/HowtoinstallNodejsbyNVM_0.png)

# Ubuntu 및 Mac OS에 nvm 설치하기

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

기계에 nvm을 설치하거나 업데이트하는 방법은 여러 가지가 있지만, 저는 인스톨러 스크립트를 사용해서 nvm을 설치하는 것을 선호해요. 이 글을 작성할 당시 nvm 인스톨러의 최신 버전은 0.38.0이었어요. 그래서 터미널에서 아래의 명령어로 curl을 사용하여 다운로드한 다음 bash로 실행할 수 있어요.

```js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

또는 wget을 사용하는 경우:

```js
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
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

앞으로 설치 프로그램은 nvm 저장소를 ~/.nvm/ 디렉토리에 복제하고, nvm을 로드하려면 ~/.bashrc 파일 끝에 아래 줄을 추가해야 합니다.

```js
export NVM_DIR="$HOME/.nvm"
# 이 명령어가 nvm을 로드합니다
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# 이 명령어가 nvm bash_completion을 로드합니다
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

이제 nvm을 로드하려면 터미널을 닫고 다시 열어야 합니다. 그 후 설치가 제대로 되었는지 확인해보세요.

```js
nvm --version
# 0.38.0
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

이제 nvm을 사용할 준비가 되었습니다.

# nvm으로 Node.js 버전 관리하기

nvm에는 설치, 사용, 제거 등 많은 하위 명령이 있습니다. 우리는 몇 가지 필수 하위 명령을 선택하고 설명하고자 합니다.

## Node.js 버전 설치

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

먼저, 사용 가능한 버전 목록을 list-remote 또는 ls-remote 하위 명령을 사용하여 확인할 수 있어요.

```js
nvm list-remote # 또는 nvm ls-remote
```

원하는 버전을 nvm install 하위 명령으로 설치할 수 있어요.

```js
nvm install <version> # 예시: 14.17.6
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

LTS 버전을 설치하려면 버전 번호 대신 --lts를 사용할 수 있어요.

```js
nvm install --lts
```

또는 최신 버전을 설치하려면 버전 번호 대신 node를 사용할 수 있어요.

```js
nvm install node
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

## 특정 버전의 Node.js 로드하기

이제 기계에 몇 가지 버전의 Node.js를 설치했어요; 따라서 설치된 버전의 목록을 list 또는 ls 하위 명령어로 볼 수 있어요.

```js
nvm list # 또는 nvm ls
```

특정 버전을 로드하려면 use 하위 명령어를 사용하세요. 이 하위 명령어를 사용하면 버전 번호나 --lts 플래그로 Node.js를 로드할 수 있어요.

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

```bash
nvm 사용 <버전>
```

또는 LTS 버전을 사용하려면

```bash
nvm 사용 --lts
```

또는 최신 버전을 사용하려면

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
nvm use node
```

## Node.js 버전을 제거하는 방법

마지막으로, Node.js 버전을 제거하고 싶다면 해당 버전을 제거하는 uninstall 서브커맨드를 사용할 수 있습니다.

먼저, use를 사용하여 다른 버전으로 전환한 다음에 제거할 수 있습니다.

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
nvm uninstall <version>
```

# .nvmrc 파일은 무엇인가요?

Node.js 프로젝트에서 해당 버전과 호환되는 Node.js 버전을 파일에 저장할 수 있습니다. 이를 .nvmrc라고 부르며 프로젝트의 루트 디렉토리에 생성해야 합니다.

```js
node --version > /path/to/project/.nvmrc
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

그러면 팀원들의 다른 기기에서도 호환되는 버전을 사용할 수 있어요.

```js
nvm use
# '/path/to/project/.nvmrc'에서 '<v14.17.6> 버전을 발견했습니다.'
# node v14.17.6 (npm v6.14.15)을(를) 현재 사용 중입니다.
```

# Node.js에 패키지 설치하기

NVM으로 설치된 Node.js에 패키지를 설치하는 방법은 일반적인 node.js 설치와 동일하지만, 패키지 설치는 버전 번호를 기반으로 합니다.

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
nvm use 14.17.5
npm install --global yarn
which yarn
# ~/.nvm/versions/node/v14.17.5/bin/yarn
```

# 결론

NVM을 사용하면 한 대의 컴퓨터에서 여러 가지 node.js 버전을 함께 사용할 수 있으며 해당 버전을 프로젝트에 사용하거나 개발 버전의 기능을 테스트할 때 시스템 또는 프로젝트에 부작용을 일으키지 않도록 할 수 있습니다.

따라서 Node.js를 설치하고 쉽게 관리하기 위해 NVM을 사용하는 것을 권장합니다.

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

# 자료:
