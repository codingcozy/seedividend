---
title: "리액트에서 기본 포트 번호 변경하는 방법리액트 팁"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How to Change the Default Port Number in React React Tips"
link: "https://medium.com/stackademic/how-to-change-the-default-port-number-in-react-react-tips-1a957b54759e"
isUpdated: true
---

<img src="/assets/img/HowtoChangetheDefaultPortNumberinReactReactTips_0.png" />

## 소개 🌟

React 개발에 뛰어들 때, 처음으로 사용자 정의하고 싶은 것 중 하나는 기본 포트 번호를 변경하는 것이 될 수 있습니다. create-react-app을 사용하여 생성된 React 애플리케이션은 일반적으로 포트 3000에서 실행됩니다. 그러나 이미 해당 포트가 사용 중이거나 특정 배포 환경과 일치해야 하는 경우가 있을 수 있습니다.

이 글에서는 React에서 기본 포트 번호를 변경하는 과정을 안내해드릴 것입니다. 다양한 운영 체제에 대한 단계를 다룰 것이며, 초보자부터 숙련된 개발자까지 쉽게 따라 갈 수 있도록 할 것입니다.

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

이제 바로 시작하기 전에 개인 웹 사이트에서 웹 개발에 관한 더 심층적인 기사를 더 알아보세요:

## 기본 설정 이해하기 🔍

기본적으로, create-react-app으로 생성된 React 애플리케이션은 3000번 포트에서 실행되도록 구성되어 있습니다. 이 설정은 개발 서버를 시작하는 기본 스크립트에 내장되어 있습니다. 이를 사용자 정의하려면 시작 구성을 수정해야 합니다.

## Windows에서 포트 번호 변경하기 🪟

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

Windows에서는 환경 변수를 사용하여 포트 번호를 변경할 수 있습니다. 다음은 방법입니다:

- 좋아하는 코드 편집기에서 프로젝트 폴더를 엽니다.
- 루트 디렉토리에서 package.json 파일을 찾습니다.
- scripts 섹션에서 "start": "react-scripts start"와 유사한 줄을 찾을 수 있습니다.
- 이 줄을 수정하여 PORT 환경 변수를 설정합니다. 예를 들어 포트를 5000으로 변경하려면 다음을 사용하세요:

```js
"scripts": {
  "start": "set PORT=5000 && react-scripts start"
}
```

5. package.json 파일을 저장하세요.

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

6. npm start을 사용하여 프로젝트를 실행해보세요. 이제 React 애플리케이션이 http://localhost:5000에서 실행 중이어야 합니다.

## macOS/Linux에서 포트 번호 변경하기 🐧🍏

macOS와 Linux에서의 프로세스는 비슷하지만 환경 변수를 설정하는 구문이 약간 다릅니다. 다음 단계를 따라주세요:

- 코드 편집기에서 프로젝트를 엽니다.
- package.json 파일에서 start 스크립트를 아래와 같이 수정하세요:

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
"scripts": {
  "start": "PORT=5000 react-scripts start"
}
```

터미널에서 npm start를 실행하세요. 애플리케이션이 새로운 포트(http://localhost:5000 같은)에서 시작될 겁니다.

## 환경 구성 파일 사용하기 📄

다른 방법은 환경별 구성 파일을 사용하는 것입니다. create-react-app은 환경 변수를 설정하기 위해 .env 파일을 지원합니다. 이렇게 사용할 수 있습니다:

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

- 프로젝트 루트에서 .env라는 파일을 생성하세요.
- 다음 줄을 추가하여 포트를 설정하세요:

```js
PORT = 5000;
```

파일을 저장하고 npm start를 실행하세요. 앱은 지정된 포트에서 시작됩니다.

## 결론 🎉

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

리액트 애플리케이션에서 포트 번호를 사용자 정의하는 것은 간단합니다. Windows, macOS 또는 Linux를 사용하든 package.json 파일이나 .env 파일을 사용하여이 설정을 쉽게 조정할 수 있습니다. 이 유연성을 통해 다양한 개발 및 배포 환경과 원할한 통합이 가능합니다. 즐거운 코딩하세요!

# Stackademic

끝까지 읽어주셔서 감사합니다. 떠나기 전에:

- 박수를 보내고 저희 작가를 팔로우해 주세요! 👏
- Twitter(X), LinkedIn 및 YouTube에서 저희를 팔로우해주세요.
- Stackademic.com에서 전 세계에서 무료 프로그래밍 교육을 더 democrazing하는 방법에 대해 알아보세요.
