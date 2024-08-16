---
title: "NPMRC 파일이란 무엇인가요"
description: ""
coverImage: "/assets/img/2024-05-12-Whatisanpmrcfile_0.png"
date: 2024-05-12 20:05
ogImage: 
  url: /assets/img/2024-05-12-Whatisanpmrcfile_0.png
tag: Tech
originalTitle: "What is a .npmrc file?"
link: "https://medium.com/@pmmanav/what-is-a-npmrc-file-e7bd40bff3f0"
isUpdated: true
---




.npmrc 파일은 npm(Node Package Manager) 명령행 도구에서 사용되는 구성 파일입니다. 이 파일을 통해 npm이 패키지 및 의존성을 관리하는 방식과 관련된 다양한 설정을 사용자 정의할 수 있습니다. 이 파일은 일반적으로 프로젝트의 루트 디렉토리에 위치하며 다양한 구성 옵션을 포함할 수 있습니다. 아래는 .npmrc 파일에 설정할 수 있는 일반적인 사용 사례 및 구성 옵션입니다:

- 레지스트리 구성: .npmrc 파일을 사용하여 npm이 패키지를 가져올 레지스트리를 지정할 수 있습니다. 예를 들어, 프라이빗 레지스트리나 기본 레지스트리의 미러를 사용하고 싶을 수 있습니다.
- 스코프 패키지 구성: 스코프 패키지(이름이 @scope/로 시작하는 패키지)를 사용하는 경우 해당 패키지에 특정한 구성 옵션을 설정할 수 있습니다.
- 인증: .npmrc 파일을 사용하여 프라이빗 레지스트리나 서비스의 인증 토큰 또는 자격 증명을 저장할 수 있습니다.
- 프록시 구성: 회사 프록시 뒤에서 작업하는 경우 .npmrc 파일에 프록시 관련 옵션을 설정하여 npm이 프록시를 통해 작동하도록 할 수 있습니다.
- 캐시 제어: .npmrc 파일에 캐시 관련 설정을 지정하여 npm이 패키지를 캐시하는 방식을 제어할 수 있습니다.
- 글로벌 대 로컬 구성: 글로벌 및 로컬 설정에 대해 서로 다른 .npmrc 파일을 가질 수 있습니다. 글로벌 설정은 시스템의 모든 프로젝트에 적용되고, 로컬 설정은 프로젝트 디렉토리에만 특정합니다.
- 패키지 설치 동작: npm install을 실행할 때 npm이 패키지를 기본적으로 dependencies 또는 devDependencies로 저장하도록 구성할 수 있습니다. 또한 npm이 패키지를 자동으로 package.json 파일에 저장할지 여부를 제어할 수도 있습니다.

다음은 간단한 .npmrc 파일이 어떻게 보일 수 있는지 예제입니다:

```js
registry=https://registry.npmjs.org/
loglevel=warn
save-exact=true
```



이 예시에서, 이 파일은 기본 레지스트리를 npm 공개 레지스트리로 설정하고, 로그 레벨을 “warn"으로 설정하며, npm이 패키지의 정확한 버전을 저장하도록 구성합니다.

.npmrc 파일에 설정한 일부 옵션은 npm을 사용할 때 명령행 인수에 의해 재정의될 수 있습니다. npm 문서에서 설정 옵션의 포괄적인 목록을 찾을 수 있습니다.

.npmrc 파일은 종종 코드와 함께 버전 관리 시스템에 저장되므로 인증 토큰과 같은 중요한 정보를 조심스럽게 다루어야 합니다. 중요한 정보를 관리하기 위해 환경 변수나 다른 안전한 방법을 사용하는 것을 고려해야 합니다.