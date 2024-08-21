---
title: "Ruby on Rails와 React로 풀스택 애플리케이션 빌드하기 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-07-02-BuildingaFull-StackApplicationwithRubyonRailsandReactAStep-by-StepGuide_0.png"
date: 2024-07-02 22:12
ogImage:
  url: /assets/img/2024-07-02-BuildingaFull-StackApplicationwithRubyonRailsandReactAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Building a Full-Stack Application with Ruby on Rails and React: A Step-by-Step Guide"
link: "https://medium.com/@mihir0603/building-a-full-stack-application-with-ruby-on-rails-and-react-a-step-by-step-guide-a040ed1c0c62"
isUpdated: true
---

# 소개

루비 온 레일즈와 리액트를 사용하는 이유는 무엇인가요?

오늘날 웹 개발 환경에서, 동적이고 상호작용적인 웹 애플리케이션을 만들기 위해서는 여러 기술의 장점을 활용해야 합니다. 루비 온 레일즈와 리액트는 두 가지 강력한 도구로, 결합하면 풀 스택 애플리케이션을 구축하는 강력한 솔루션을 제공할 수 있습니다.

루비 온 레일즈는 단순성과 생산성으로 유명한 인기 있는 백엔드 프레임워크입니다. 설정보다 관례를 중시하는 (CoC) 원칙을 따라 쉽게 설정하고 애플리케이션을 신속하게 개발할 수 있습니다. 레일즈에는 ORM(ActiveRecord), 라우팅 및 미들웨어 지원과 같은 다양한 내장 기능이 포함되어 있어 백엔드 개발을 간소화합니다.

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

반면에 React는 사용자 인터페이스를 구축하기 위한 매우 효율적이고 유연한 JavaScript 라이브러리입니다. 페이스북에서 개발 및 유지보수되며, 재사용 가능한 UI 구성 요소를 작성하고 상태를 관리하는 데 능숙하여 복잡하고 인터랙티브한 프론트엔드를 구축하기에 이상적입니다.

# 개발 환경 설정하기

루비 온 레일즈(Ruby on Rails)와 React를 사용하여 풀 스택 애플리케이션을 구축하려면, 다음 단계를 따라 개발 환경을 설정하세요.

## 단계 1: 루비 및 레일즈 설치하기

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

먼저 Ruby가 설치되어 있는지 확인해주세요. RVM이나 rbenv와 같은 버전 관리자를 사용할 수 있습니다. 다음은 rbenv를 사용하는 예시입니다:

```js
# rbenv와 ruby-build 설치
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-installer | bash

# rbenv를 bash에 추가하여 터미널을 열 때마다 로드되도록 설정
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc

# Ruby 설치
rbenv install 3.1.0
rbenv global 3.1.0

# 설치 확인
ruby -v
```

다음으로 Rails를 설치하세요:

```js
gem install rails
rails -v
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

## 단계 2: 새로운 Rails API-Only 어플리케이션 설정하기

--api 플래그로 새로운 Rails 어플리케이션을 생성해보세요. 이 플래그는 Rails를 API 전용 모드로 설정합니다:

```js
rails new my-fullstack-app --api
cd my-fullstack-app
```

## 단계 3: Node.js와 Yarn 설치하기

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

React를 사용하려면 Node.js와 Yarn이 필요합니다. 패키지 관리자를 사용하여 이들을 설치해야 합니다. Ubuntu에서는 다음과 같이 설치할 수 있습니다:

```js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install --global yarn
```

설치가 올바르게 되었는지 확인해보세요:

```js
node - v;
yarn - v;
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

## 단계 4: React 앱 만들기

프론트엔드를 설정하기 위해 Create React App을 사용하세요:

```js
npx create-react-app frontend
cd frontend
```

## 단계 5: React와 Rails 연결하기

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

리액트 앱을 레일즈 서버에서 제공하려면 create-react-app 빌드 스크립트와 React 개발 서버에 프록시를 사용할 수 있습니다.

- 리액트 앱 빌드하기:

```js
yarn build
```

2. 빌드된 파일들을 레일즈로 이동시키세요:

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

렉트 앱의 build 폴더를 레일즈 공용 디렉토리로 복사해 주세요:

```js
cp -R build ../public/
```

3. 개발을 위한 프록시 설정:

렉트 package.json에 레일즈 서버로의 프록시를 추가해 주세요:

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
"proxy": "http://localhost:3001"
```

## 단계 6: 두 서버 시작하기

Rails 서버를 시작하세요:

```js
rails server -p 3001
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

다른 터미널에서 React 개발 서버를 시작하세요:

```js
cd frontend
yarn start
```

이제 React 앱은 Rails 백엔드로 API 요청을 프록시(proxy)하고 있으므로, 풀 스택 애플리케이션 개발을 시작할 준비가 되었습니다.

이 설정으로 Rails와 React를 사용하여 풀 스택 애플리케이션을 개발할 준비가 되었습니다. 다음으로 Rails 백엔드를 생성하는 방법에 대해 알아보겠습니다. 이 설정이 여러분의 기대에 맞습니까?
