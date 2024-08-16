---
title: "첫 번째 React 앱을 GitHub에 푸시하는 방법 단계별 안내"
description: ""
coverImage: "/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_0.png"
date: 2024-05-14 11:24
ogImage: 
  url: /assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Pushing Your First React App to GitHub: A Step-by-Step Guide"
link: "https://medium.com/@regondaakhil/pushing-your-first-react-app-to-github-a-step-by-step-guide-f7b592e67658"
isUpdated: true
---




![2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_0](/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_0.png)

이전에 작성한 기사에서(https://medium.com/@regondaakhil1509/getting-started-with-react-a-beginners-guide-to-setting-up-your-first-application-a6d8a1ae414), React 애플리케이션을 설정하는 과정을 안내했습니다. 이제 로컬 코드를 GitHub에 올리는 방법을 배우는 것이 시간입니다. 이 단계별 가이드는 새로운 리포지토리를 GitHub에 생성하고 로컬 리포지토리에 연결하고 코드를 원격 리포지토리에 푸시하는 방법을 보여줍니다.

React가 처음이거나 GitHub를 시작한지 얼마 안 된 경우에도 이 튜토리얼은 프로젝트를 온라인으로 만들어 공동 작업자나 잠재적인 고용주에게 접근 가능하도록 도와줄 것입니다. React 스킬을 다음 수준으로 끌어 올리기 위해 준비하세요!

# 소개 - Git 및 GitHub에 대해



![2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_1.png](/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_1.png)

깃

- 깃은 코드 변경을 관리하는 버전 관리 시스템입니다.
- 깃을 사용하면 개발자들은 코드 버전을 추적하고, 다른 사람들과 협업하며, 필요할 때 이전 버전으로 되돌릴 수 있습니다.
- 깃은 여러 개발자가 동시에 동일한 프로젝트에 작업할 수 있는 분산 버전 관리 시스템입니다. 각 개발자는 자신의 로컬 머신에 코드 저장소의 완전한 복사본을 가지고 있습니다.
- 깃에 대해 더 알아보려면 https://git-scm.com/about를 방문해보세요.

깃허브



- GitHub은 Git 저장소를 호스팅하는 웹 기반 플랫폼입니다.
- 협업을 더 쉽게 만드는 풀 리퀘스트, 이슈 추적 및 코드 리뷰와 같은 기능을 제공합니다.
- GitHub에는 개발자들이 서로를 팔로우하고 자신의 작업을 보다 넓은 커뮤니티와 공유할 수 있는 소셜 측면도 있습니다.
- GitHub에 대해 더 알아보려면 https://github.blog/category/company/에서 확인할 수 있습니다.

- GitHub는 Git 호스팅을 제공하는 유일한 플랫폼이 아닙니다.
- 다른 Git 호스팅 플랫폼으로는 GitLab, Bitbucket 및 SourceForge 등이 있습니다.
- GitHub는 사용하기 쉽고 다양한 기능을 갖춘 편리한 플랫폼이어서 인기가 많습니다.

## 설정

시작하기 전에 기술적 선행 조건이 모두 갖추어져 있는지 확인하는 것이 중요합니다. 가장 중요한 요구 사항은 로컬 머신에 Git이 설치되어 있어야 한다는 것입니다. 아직 Git을 설치하지 않은 경우 https://git-scm.com/downloads 에서 Git을 다운로드하고 설치할 수 있습니다.



설치 과정을 확인하려면 터미널에서 다음 명령을 실행하세요:

```js
git -v
```

예시(숫자는 시스템에 따라 다를 수 있습니다):

![예시 이미지](/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_2.png)



다음 단계는 아직 GitHub 계정을 만들지 않으셨다면 GitHub 계정을 생성해야 합니다.

![image](/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_3.png)

GitHub 대시보드에서 새 저장소를 만들려면 페이지의 오른쪽 상단을 나타내는 플러스 기호로 표시된 드롭다운 메뉴를 클릭하십시오. 거기서 "New repository"로 표시된 옵션을 선택하거나 New Repository를 클릭할 수 있습니다.

![image](/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_4.png)



그 다음으로, 양식을 완성해야 합니다.

- "저장소 이름" 필드에 저장소 이름을 입력하세요.
- 선택사항으로 "설명" 필드에 저장소에 대한 설명을 추가할 수 있습니다.
- 저장소의 가시성 설정을 선택하세요. 저장소를 비공개로 유지하려면 "비공개"를 선택하세요. 그렇지 않으면 "공개"를 선택하세요.
- 저장소에 README 파일을 만들고 싶다면 "이 저장소에 README 파일 추가" 확인란을 선택하세요.
- 원하는 경우 저장소에 라이선스를 선택하세요. 인기 있는 오픈소스 라이선스 목록 중에서 선택하거나 라이선스를 추가하고 싶지 않다면 "없음"을 선택하세요.
- "저장소 만들기" 버튼을 클릭하세요.

![Image](/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_5.png)

만세! 새로운 저장소를 만들었어요.



<img src="/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_6.png" />

다음 단계는 코드를 로컬에서 GitHub로 이동하는 것입니다.

만약 처음으로 git을 설정하고 있다면, git을 이름 및 이메일로 구성해야 합니다. 터미널에서 다음 명령어를 실행하세요.

```js
git config --global user.email "Your_Email"
git config --global user.name "Your_Name"
```



로컬 React 프로젝트에서 Git을 초기화하려면:

VS Code에서 "your_local_repo" 폴더(저의 경우, my_portfolio)를 열고 터미널을 열어 해당 디렉토리에서 Git을 초기화하는 명령을 실행하세요.

```js
git init
```




![이미지](/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_7.png)

GitHub의 원격 저장소 링크는 저장소 페이지에서 "Code" 버튼을 클릭하여 찾을 수 있습니다. 적절한 프로토콜을 선택(우리의 경우 HTTPS), URL을 클립보드에 복사하고, VS 코드 터미널에서 다음 명령을 실행합니다.

```js
git remote add origin https://github.com/your-username/your-repo.git
```

변경 내용을 스테이징하고 커밋하세요:




React 프로젝트의 모든 파일을 준비하는 "git add" 명령어를 사용하고, 그 변경 사항을 커밋하기 위해 "git commit" 명령어를 사용하세요.

```js
git add .
git commit -m "커밋 메시지 작성"
```

GitHub로 변경 사항을 푸시하세요:

마지막으로, 커밋된 변경 사항을 GitHub 리포지토리에 푸시하기 위해 "git push" 명령어를 사용하세요.



```js
git push -u origin main
```

와우! 이렇게 하면 로컬 React 파일이 GitHub에 업로드되어 원격 저장소에서 액세스할 수 있습니다.

![이미지](/assets/img/2024-05-14-PushingYourFirstReactApptoGitHubAStep-by-StepGuide_8.png)
