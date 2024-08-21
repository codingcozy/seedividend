---
title: "React Testing Library 설치하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How to Install React Testing Library with Yarn and NPM"
link: "https://medium.com/@leandroaps/how-to-install-react-testing-library-with-yarn-and-npm-d264b37ffdf8"
isUpdated: true
---

<img src="/assets/img/HowtoInstallReactTestingLibrarywithYarnandNPM_0.png" />

React Testing Library은 리액트 컴포넌트를 테스트하는 인기있는 도구입니다. 구현 세부 정보 대신 사용자 상호 작용을 테스트하는 데 중점을 둬서 더 견고하고 유지보수가 쉬운 테스트를 만들 수 있습니다. 새 프로젝트를 시작하거나 기존 프로젝트에 React Testing Library를 통합하려면 Yarn 또는 NPM을 사용하는 방법을 알려드리겠습니다.

새 프로젝트를 초기화하세요 (필요한 경우): 이미 프로젝트를 설정하지 않았다면 다음 명령을 실행하여 새 프로젝트를 생성할 수 있습니다:

```js
yarn init
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

React Testing Library를 설치하려면 다음 명령어를 실행하세요:

```js
yarn add @testing-library/react @testing-library/dom
```

설치 확인: 설치가 완료되면 package.json 파일을 확인하거나 다음을 실행하여 React Testing Library가 제대로 설치되었는지 확인할 수 있습니다:

```js
yarn list --depth=0
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

위에서 나열된 패키지 목록에 @testing-library/react와 @testing-library/dom이 표시되어야 합니다.

# npm으로 설치하는 방법

만약 npm을 사용하는 것을 선호한다면, 다음 단계를 따라 React Testing Library를 설치할 수 있습니다:

- 새 프로젝트 초기화 (필요시): 이미 프로젝트를 설정하지 않았다면, 다음 명령어를 실행하여 새 프로젝트를 생성할 수 있습니다:

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
npm init
```

React Testing Library 설치: 프로젝트에 React Testing Library를 추가하려면 다음 명령을 실행하세요:

```js
npm install --save-dev @testing-library/react @testing-library/dom
```

설치 확인: 설치가 완료되면 package.json 파일을 확인하거나 다음을 실행하여 React Testing Library가 올바르게 설치되었는지 확인할 수 있습니다:

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
npm ls --depth=0
```

설치된 패키지 목록에서 @testing-library/react와 @testing-library/dom을 볼 수 있어야 합니다.

# 결론

Yarn이든 NPM이든 상관없이 React Testing Library를 프로젝트에 통합하는 것은 간단합니다. 한 번 설치하면 React Testing Library가 제공하는 직관적이고 개발자 친화적인 API를 사용하여 React 컴포넌트에 대한 테스트 작성을 시작할 수 있습니다. 즐거운 테스팅하세요!
