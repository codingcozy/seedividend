---
title: "React 앱을 GitHub 저장소에 연결하기"
description: ""
coverImage: "/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_0.png"
date: 2024-05-12 21:52
ogImage: 
  url: /assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_0.png
tag: Tech
originalTitle: "Connecting a React App to a GitHub Repository"
link: "https://medium.com/@brianhulela/connecting-a-react-app-to-a-github-repository-c2b563f1885d"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_0.png)

이
튜토리얼에서는 React 애플리케이션을 GitHub 저장소에 연결하는 방법을 배울 것입니다. 이 연결은 프로젝트에서 변경 사항을 추적하고 다른 사람들과 효과적으로 협업하는 데 중요합니다.

다음은 시작하는 데 도움이 될 수 있는 단계별 가이드입니다:

## 1. React 앱 만들기:



비주얼 스튜디오 코드 터미널에서 다음 명령을 사용하여 React 애플리케이션을 시작하세요:

```js
npx create-react-app my-react-app
```

앱의 디렉토리로 이동하세요:

```js
cd my-first-app
```



아래는 표의 내용입니다.

| Order Number | Product Name | Quantity |
|--------------|--------------|----------|
| 1            | T-shirt      | 2        |
| 2            | Jeans        | 1        |
| 3            | Shoes        | 2        |



한 번 시작하면 브라우저에서 앱이 작동하는 것을 볼 수 있을 거에요.

![이미지](/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_2.png)

### 3. GitHub 저장소 설정:

선택한 이름으로 새 GitHub 저장소를 만드세요. 다른 설정은 기본값으로 둬두 돼요.




![Connecting a React App to a GitHub Repository](/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_3.png)

Once created, you'll land on a new page.

![Connecting a React App to a GitHub Repository](/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_4.png)

Remember to copy the repository link.




<img src="/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_5.png" />

## 4. GitHub 저장소에 React 앱 연결하기:

React 애플리케이션의 디렉토리에서 새 터미널 탭을 열고 (필요시) 다음을 사용하여 앱 디렉토리로 이동하세요:

```js
cd my-first-app
```



기토 저장소를 초기화하세요

```js
git init
```

아래 명령어를 사용하여 앱을 GitHub 저장소에 연결하세요. `<username>`을 여러분의 GitHub 사용자 이름으로 바꿔주세요:

```js
git remote add origin https://github.com/<username>/my-first-app.git
```



내 경우에는

```js
git remote add origin https://github.com/Brianhulela/my-first-app.git
```

![이미지](/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_6.png)

명령이 실행을 완료하면 다음 명령으로 연결을 확인합니다:



```js
git remote -v
```

저장소 이름을 확인할 수 있어야 합니다. 저의 경우에는 출력이 다음과 같았습니다:

<img src="/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_7.png" />

## 5. 변경 내용 준비 및 푸시:



다음 명령을 실행하여 변경 내용을 커밋할 준비를 합니다:

```js
git add .
git commit -m "첫 번째 git 커밋"
```

앱에 변경 사항이 없는 경우 커밋이 "working tree clean"을 반환할 수 있습니다.

![이미지](/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_8.png)



## 6. 저장소로 푸시하기:

귀하의 앱을 GitHub 저장소로 푸시하려면 다음을 사용하십시오:

```js
git push
```

"upstream" 브랜치에 관한 오류가 발생할 수 있습니다. 마스터 브랜치가 아직 업스트림으로 설정되지 않았기 때문입니다. 다음 단계에서 이를 수행하겠습니다.



<img src="/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_9.png" />

## 7. Upstream Branch 설정하기:

다음 명령어를 사용하여 upstream branch를 설정하여 에러를 해결하세요:

```js
git push --set-upstream origin master
```



<img src="/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_10.png" />

## 7. GitHub에서 확인하기:

마지막으로, React 애플리케이션이 성공적으로 푸시되었는지 확인하기 위해 GitHub 저장소를 확인하세요.

<img src="/assets/img/2024-05-12-ConnectingaReactApptoaGitHubRepository_11.png" />



이 단계를 따라하면 React 앱과 GitHub 저장소 간에 연결을 설정하여 효율적인 버전 관리와 협업이 가능해집니다.

저장소: [https://github.com/Brianhulela/my-first-app](https://github.com/Brianhulela/my-first-app)