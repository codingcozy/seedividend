---
title: "리액트 웹앱에서 SonarQube를 사용한 정적 분석"
description: ""
coverImage: "/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_0.png"
date: 2024-05-12 22:25
ogImage: 
  url: /assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_0.png
tag: Tech
originalTitle: "Static Analysis Using SonarQube in a React Webapp"
link: "https://medium.com/allient/static-analysis-using-sonarqube-in-a-react-webapp-dd4b335d6062"
---


(2023년 11월 업데이트) 보안은 코드를 작성할 때 집중해야 하는 가장 중요한 주제 중 하나입니다. 안정적이고 품질 높은 제품을 갖기 위해서는 코드에 취약점이 없는지 확인해야 합니다. 프로젝트에 따라 우리는 더 정교한 소프트웨어를 사용하여 코드를 테스트해야 할 수도 있습니다. 이 글에서는 샘플 React JS 프로젝트에 SonarQube를 사용하여 정적 분석을 실행할 것입니다. 주 언어로 javascript를 사용하는 장점 중 하나는 Veracode 보고서에 따르면 심각도가 낮은 결함이 있다는 것입니다.

![이미지](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_0.png)

# 정적 분석이란?

OWASP에 따르면 정적 응용 프로그램 보안 테스트(SAST)는 보안 결함을 찾는 데 도움이 되도록 코드 소스나 컴파일된 코드 버전을 분석하는 도구입니다.



# SonarQube가 무엇인가요?

![이미지](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_1.png)

SonarQube는 프로젝트에서 버그, 취약점 및 코드 향수를 탐지하는 자동 코드 검토 도구입니다. 이 도구는 27가지 다른 프로그래밍 언어를 지원합니다.

다양한 요구 사항에 따라 다른 계획이 있지만, 이 게시물에서는 무료이며 오픈 소스인 커뮤니티 버전을 사용할 것입니다.



<img src="/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_2.png" />

# 왜 SonarQube를 사용해야 하는가?

- 상용 제품과 비교하더라도 오픈 소스 버전은 무료이다.
- 개발자가 더 깨끗하고 안전한 코드를 작성할 수 있도록 돕는다.
- 깨끗하고 유지보수 가능한 코드로 기술 부채를 줄이고 개발자의 속도를 높이는 데 도움을 준다.
- 프로덕션으로 이동하기 전에 가능한 보안 결함을 식별할 수 있도록 도와준다.
- CI/DC 흐름에 추가할 수 있다.
- 예방책은 문제가 발생했을 때 큰 보안 문제를 해결하는 것보다 항상 더 저렴하다.

# 로컬 PC에 SonarQube 설정하기



이 게시물은 ReactJS 프로젝트에 SonarQube를 구성하는 방법을 보여줍니다. 그러나 비슷한 설정은 React Native 또는 다른 Node.js 프로젝트에도 사용할 수 있습니다.

단계 1: PC에 도커가 설치되어 있는지 확인하세요. 아직 설치하지 않았다면 여기서 다운로드할 수 있습니다.

React 프로젝트에 "sonarqube-scanner" 패키지를 설치하세요.

```js
yarn add --dev sonarqube-scanner
```



단계 2: 프로젝트 폴더의 루트에 docker-compose.yml 파일을 생성하고 아래 코드를 붙여넣으세요. 우리는 최신 LTS 버전인 sonarqube 8.9.10을 사용합니다.

단계 3: 프로젝트 폴더 루트에 sonarqube 폴더를 만들어서 다음 내용을 담은 sonarscan.js 파일을 추가하세요.

나중에 사용될 projectName과 projectKey를 사용자 정의할 수 있습니다. 또한 토큰은 그 때 업데이트될 것입니다.

단계 4: SonarQube 서버를 시작하려면 다음 명령을 실행하세요.



```js
도커 컴포즈 업
```

단계 5: SonarQube에 로그인하려면 http://localhost:9000로 이동하십시오. 다음 자격 증명을 사용해야 합니다.

```js
로그인: admin
비밀번호: admin
```

<img src="/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_3.png" />



시스템에 로그인하면 비밀번호를 변경해야 하며, 마지막으로 주요 대시보드를 볼 수 있고 새 프로젝트를 생성할 준비가되었습니다. 수동으로 선택하십시오.

![이미지](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_4.png)

단계 6: 프로젝트 이름을 선호하는대로 지정하십시오. React 프로젝트와 동일한 이름을 사용하는 것을 권장합니다.

![이미지](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_5.png)



Step 7: 프로젝트를 위한 토큰을 생성하세요. 원하는 이름을 사용할 수 있습니다. 제가 my_test_app을 사용해서 쉽게 기억할 수 있도록 했어요. 토큰이 생성되면 안전한 곳에 저장해주세요. 나중에 필요할 거예요.

로컬에서 선택하세요.

![이미지 1](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_6.png)

![이미지 2](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_7.png)



이 토큰을 저장해야 합니다. 이 토큰은 나중에 분석을 실행하는 데 사용될 것입니다!

![Image](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_8.png)

단계 8: 새 스캔 시작.

만약 git을 사용 중이라면, 다음 줄을 .gitignore 파일에 추가해주세요.



```js
.scannerwork
sonarqube/extensions
sonarqube/data
sonarqube/logs
```

다음 명령어를 다른 터미널에서 실행해 주세요.

```js
node ./sonarqube/sonarscan.js
```

만약 모든게 올바르다면, 잠시 기다리시면 콘솔에 성공 메시지가 표시됩니다.



![이미지](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_9.png)

단계 9: 마지막으로 SonarQube 대시보드로 돌아가서 코드에 얼마나 많은 버그, 취약점, 보안 핫스팟, 코드 냄새가 있는지 확인하세요.

![이미지](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_10.png)

SonarQube는 멋진 도구입니다. 코드 버그, 취약점, 코드 냄새를 보여줄 뿐만 아니라 해결 방법도 제시해줍니다.



- 버그: 이것은 프로그래머가 특정 동작을 구현하려고 할 때 발생하는 문제로, 코드가 올바르게 이 동작에 부합하지 않는다는 것은 잘못된 코딩으로 인한 것입니다. 이것은 어제 고쳐져야 합니다. 빨리 해결해야 합니다.
- 취약점: 이 결함은 해커가 코드를 악용하여 데이터를 추출하거나 소프트웨어를 변조하거나 더 나쁜 경우에는 모든 것을 삭제할 수 있는 문제를 초래할 수 있습니다.
- 보안 핫스팟: 개발자가 수동으로 검토해야 하는 보안에 민감한 코드 부분입니다. 검토 후에 위협이 없다고 판단되거나 코드를 보안하기 위한 수정이 필요할 수 있습니다.
- 코드 스멜: 코드 내에서 발생하는 유지보수 관련 문제입니다. 이는 나중에 발생하는 변경을 어렵게 만들며 미래의 변경으로 추가 오류를 발생시킬 수 있습니다.

![이미지](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_11.png)

추가 보너스 단계: 검사 보고서를 출력해야 하는 경우, 이 플러그인을 다운로드하고 설치할 수 있습니다.

![이미지](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_12.png)



참고: 이 플러그인은 SonarQube의 최신 LTS 버전과만 호환됩니다.

서버를 다시 시작하고 최종적으로 보고서를 내보내야 할 수도 있습니다.

![이미지](/assets/img/2024-05-12-StaticAnalysisUsingSonarQubeinaReactWebapp_13.png)

여기에서 Github에서 샘플 프로젝트를 얻을 수 있습니다.



"저는 소나린트, HCL AppScan CodeSweep 및 ESLint를 사용하는 것을 추천합니다. 코드를 작성하는 동안 문제를 찾는 데 정말 도움이 됩니다.

이 게시물을 읽어 주셔서 감사합니다 😃 !!

# 도와드릴 일이 있나요?

우리는 당신을 듣기 위해 준비되어 있습니다. 다음 큰 일을 위해 도움이 필요하다면 저희 팀에 웹사이트나 info@jrtec.io로 연락해 주세요."