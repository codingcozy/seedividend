---
title: "Mac OS X에서 Ruby 버전 변경하는 방법"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-12 21:40
ogImage: 
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Change ruby version on Mac OS X"
link: "https://medium.com/@olivierpicault/change-ruby-version-on-mac-os-98c800a85d6d"
---


모든 설명서를 읽고 StackOverflow 게시물 및 다른 잘못된 블로그 포스트를 읽은 후, 제 경험에 따라 작동하는 것을 찾았어요. 그래서 미래를 위해 나 포함 누군가가 필요할 때 참고할 수 있도록 메모해두려고 해요.

기본적으로 Mac OS는 /usr/bin/ruby에 위치한 Ruby 버전을 사용해요. 이를 변경하여 나중에 쉽게 Ruby 버전을 관리할 수 있도록 해야 해요.

- rbenv 사용
- 원하는 버전 설치: rbenv install 3.0.1
- 버전을 기본값으로 설정:


rbenv local 3.0.1
rbenv global 3.0.1


<div class="content-ad"></div>

- 타겟 버전을 가진 ~/.ruby-version 파일을 만들어주세요.

```js
echo "3.0.1" >> ~/.ruby-version
```

- 다음을 ~./zshrc 파일에 추가해주세요:

```js
# Ruby
eval "$(rbenv init - zsh)"
```

<div class="content-ad"></div>

저기요!

```js
~ cat ~/.ruby-version
3.0.1

~ ruby -v
ruby 3.0.1p64 (2021-04-05 revision 0fb782ee38) [x86_64-darwin20]

~ which ruby
/Users/olivier/.rbenv/shims/ruby

~ rbenv local
3.0.1

~ rbenv global
3.0.1
```