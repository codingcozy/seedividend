---
title: "vuepress 로 GitHub pages 에 사이트 호스팅 하는 방법"
description: "vuepress를 이용해 블로그를 만들어 GitHub pages에 호스팅하는 방법에 대해서 공유합니다"
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# vuepress 로 GitHub pages 에 사이트 호스팅 하는 방법

이전에는 GitHub pages + 지킬 테마를 이용해서 블로그를 만들었었는데, 새로 블로그를 만들게 되면서 찾다가 알게된 **vuepress로 GitHub pages에 사이트 호스팅 하는 방법에 대해서 포스팅하려고 한다.**

**다른 사이트에서도 vuepress 를 이용해서 github pages에 호스팅 하는 글들이 많지만 초보자 눈 높이에 맞추어 차근차근 정리된 글은 없는 것 같아 상세히 정리하려고 한다.**

<img width="1709" alt="image" src="https://user-images.githubusercontent.com/46010705/198867686-c2f60f4a-2326-4a3e-8f55-74e87e52effa.png">



<div class="content-ad"></div>

vuepress와 github pages 를 이용하면 위와 같은 블로그를 만들 수 있다.

디자인도 굉장히 깔끔하고 IT 정보성 블로그로는 군더더기가 없는 것이라 생각해서 이 스타일을 채택하게 되었다.

이 글에서는 github pages와 vuepress의 깊은 얘기는 뒤로하고 github pages에 vuepress를 이용해서 블로그 사이트를 호스팅 하는 방법에만 초점을 맞추어 포스팅하려고 한다.

## github 저장소 생성

TIL이라는 저장소를 생성해준다. 저장소의 이름은 어떤 것이어도 상관 없다.

<img width="1080" alt="image" src="https://user-images.githubusercontent.com/46010705/198867791-7423904c-0410-4657-9073-11411e0137bc.png">

저장소를 생성해주었다면 **해당 저장소에 vuepress를 설치해야한다.**

## vuepress 설치



<div class="content-ad"></div>

vuepress를 설치하는 방법은 2가지로 나뉜다. 보일러플레이트를 가지고 있는 패키지를 설치하거나 직접 수동으로 vuepress를 설치하는 방법이다.

이번 글에서는 vuepress를 수동으로 설치해서 아래와 같은 기본적인 형태의 사이트를 호스팅하는 것까지만 다루려고 한다.

![image](https://user-images.githubusercontent.com/46010705/200462601-1f276025-c8ca-4b98-8498-331910267548.png)

다음에는 github pages에 vuepress의 테마와 스타일을 적용할 수 있는 방법을 포스팅하려고 한다.

다시 본론으로 돌아와서

### 1. Npm 설치

저장소 루트디렉토리에서 아래 명령어를 입력한다.

vuepress를 설치하기 위해서는 yarn, npm이 필요하기 때문이다.

```sh
npm init
```

### 2. vuepress 설치



<div class="content-ad"></div>

**npm을 설치했으니 vuepress를 설치해준다.**

```sh
yarn add -D vuepress
```

### 3. 포스트 작성

GitHub pages 를 사용하는 방법에는 여러가지가 있는데 루트 디렉토리에 `docs/` 폴더 하위에 글을 작성하는 방식을 선택했기 때문에 docs 폴더를 만들어 하위에 마크다운 문서를 작성해준다.

```sh
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

README 파일은 홈에 노출될 글을 작성하는 곳이고

포스팅을 하는 것처럼 `vue-press.md` 파일을 하나 생성해서 아래와 같이 임의로 글을 작성해봅니다

```md
# vuepress
```

### 4. Package.json 작성

`package.json` 의 script 부분을 아래와 같이 추가해준다.

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

### 5. vuepress 설정

docs 하위에 `.vuepress/config.js` 폴더를 만들어줍니다.

그리고 아래 내용을 채워줍니다.

```js
module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
};
```

### 6. 로컬 실행

```sh
yarn docs:dev
```

vuepress 설치는 끝났다. 이제 로컬에서 vuepress가 정상적으로 동작하는지 테스트 해보면 된다.

<img width="1717" alt="image" src="https://user-images.githubusercontent.com/46010705/198868117-9b10b886-be78-4656-a1ce-99934df8d955.png">

Localhost:8000 으로 접근하면 위와 같은 화면이 뜨는 것을 볼 수 있다.

그러면 이제 GitHub pages 에 호스팅을 해야한다.

### 7. GitHub pages 호스팅

github pages 에 호스팅을 하려면 저장소를 `githubID.github.io` 로 만드는 방법도 있고 위에서 말한 것처럼 `docs` 디렉토리 하위에 포스팅을 하는 방법이 있다. `docs` 방법을 하려면 브랜치를 `gh-pages` 에 푸시해야한다.

이건 그냥 github에서 만든 규칙이라고 생각하면 된다. 의문을 가질 필요가 없다.

```sh
git checkout -b gh-pages
```

```sh
git add .
```

```sh
git commit -m "initial commit"
```

```sh
git push origin gh-pages
```

<img width="1694" alt="image" src="https://user-images.githubusercontent.com/46010705/198868521-7373f5a4-84b3-4ec2-82c5-0fab634be502.png">

저장소의 settings 에 들어가면 좌측에 pages 메뉴가 있다 여기 들어오면 github pages에 대한 정보를 확인할 수 있다.

**branch에 /docs 디렉토리로 되어있어야 정상 동작하니 참고하시길 바란다. (root로 되어있을 경우 호스팅시 404 에러가 발생)**

이제 `깃헙아이디.github.io/저장소이름` 에 접근하면 아래와 같이 호스팅이 된 것을 볼 수 있다.

<img width="1567" alt="image" src="https://user-images.githubusercontent.com/46010705/198868544-ef35f221-fedb-4ad9-a6fb-edee3a116ed3.png">

위 화면이 홈 화면이고 아까 `vue-press.md` 포스팅을 보고 싶다면 `깃헙아이디.github.io/저장소이름/vue-press` 로 접근하면

<img width="1111" alt="image" src="https://user-images.githubusercontent.com/46010705/198902069-90664aaf-b325-42d4-9ceb-b9a30390dfec.png">

이렇게 포스팅에 접근할 수 있다.

이번 포스팅에서는 다른 부분 빼고 vuepress를 github pages 에 어떻게 호스팅 하는지에만 다루었고, 위 이미지처럼 블로그를 구성하기에는 너무 볼품 없기 때문에 보일러플레이트를 활용하거나 스타일을 커스텀하는 방식에 대해서도 추가로 다루어야할 것 같다.
