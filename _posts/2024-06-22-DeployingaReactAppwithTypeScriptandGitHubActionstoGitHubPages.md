---
title: " TypeScript와 GitHub Actions를 사용하여 React 앱을 GitHub Pages에 배포하는 방법 "
description: ""
coverImage: "/assets/img/2024-06-22-DeployingaReactAppwithTypeScriptandGitHubActionstoGitHubPages_0.png"
date: 2024-06-22 03:03
ogImage: 
  url: /assets/img/2024-06-22-DeployingaReactAppwithTypeScriptandGitHubActionstoGitHubPages_0.png
tag: Tech
originalTitle: "🚀 Deploying a React App with TypeScript and GitHub Actions to GitHub Pages 🚀"
link: "https://medium.com/@jagoda11/deploying-a-react-app-with-typescript-and-github-actions-to-github-pages-93c12d6c6675"
---


리액트 애플리케이션을 GitHub Pages에 배포하는 것은 적절한 설정으로 간단할 수 있어요. 이 안내서를 통해 TypeScript 및 GitHub Actions를 사용하여 미리 빌드된 React 앱을 GitHub Pages에 배포하는 방법을 안내할 거에요. 최적의 방법에 중점을 두어 배포를 깔끔하고 효율적으로 만들어보겠습니다.

# 소개

이 워크플로우는 dist 폴더를 메인 브랜치에 커밋하는 대신 peaceiris/actions-gh-pages@v3action을 사용하여 dist 디렉토리의 내용을 직접 gh-pages 브랜치에 배포합니다. 이 방법을 통해 애플리케이션의 컴파일된 최적화된 프로덕션 빌드만 GitHub Pages에 배포되므로 메인 브랜치를 깨끗하게 유지하고 소스 코드 관리에 집중할 수 있습니다.

# 구성 세부 정보

<div class="content-ad"></div>

1. 라우터의 베이스네임 속성: 🛤️
App.tsx 파일에서 `Router` 컴포넌트의 basename 속성을 설정하세요. 이렇게 하면 애플리케이션이 GitHub Pages의 하위 디렉토리 (/pokemon-react-app)에 배포될 때, 라우트가 해당 기본 URL을 기준으로 올바르게 해석됩니다.

```js
<Router basename="/pokemon-react-app">
 {/* 여러분의 라우트 */}
</Router>
```

2. 웹팩 설정: 🔧
웹팩 구성에서 publicPath를 조정하여 하위 디렉토리에 배포될 때 자산 URL을 고려하세요.

```js
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/pokemon-react-app/',
}
```

<div class="content-ad"></div>

3. Package.json 구성: 📦
package.json의 name 및 homepage 필드가 GitHub Pages를 올바르게 구성하도록 설정되었는지 확인하세요.

```js
{
  "name": "pokemon-react-app",
  "homepage": "https://Jagoda11.github.io/pokemon-react-app",
}
```

# 단계별 안내 📝

# 1. gh-pages 브랜치 생성하기 🌿

<div class="content-ad"></div>

첫째로, gh-pages 브랜치가 없는 경우에만 생성하고 해당 내용을 정리하세요:

```js
git checkout -b gh-pages
git checkout gh-pages
git rm -r .
git commit -m "배포를 위한 정리"
git push origin gh-pages
```

# 2. GitHub Actions Workflow ⚙️

ci.yml 파일에 GitHub Actions Workflow를 설정하여 배포 프로세스를 자동화하세요.

<div class="content-ad"></div>

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [21.x]

    steps:
      - uses: actions/checkout@v2
      - name: 🛠️ Use Node.js ${ matrix.node-version }
        uses: actions/setup-node@v2
        with:
          node-version: ${ matrix.node-version }
      - name: 📦 Install dependencies
        run: npm ci
      - name: 🖌️ Format code
        run: npm run format
      - name: 🧹 Lint code
        run: npm run lint
      - name: 🔨 Build
        run: npm run build
      - name: 🧪 Test with coverage
        run: npm run test
      - name: 🚀 Deploy to GitHub Pages 🚀
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${ secrets.GITHUB_TOKEN }
          publish_dir: ./dist
```

# 3. Configuring GitHub Pages in GitHub Interface 🌐

To configure GitHub Pages in the GitHub interface:

1. Navigate to Repository Settings: 🛠️
Go to your repository on GitHub, click on the Settings tab.

<div class="content-ad"></div>

2. 페이지 설정에 액세스하기: 📄
왼쪽 메뉴에서 아래로 스크롤하여 "페이지"를 클릭하세요.

3. 소스 브랜치 선택하기: 🌳
"소스" 섹션에서 브랜치 드롭다운 메뉴에서 gh-pages를 선택하세요.

4. 폴더 지정하기: 📁
만약 당신의 dist 폴더가 리포지토리의 루트 레벨에 있다면, 폴더 드롭다운에서 / (루트)를 선택하세요. 다른 디렉토리 안에 있다면 해당 경로를 명시하세요.

5. HTTPS 강제하기: 🔒
사이트를 배포할 때 안전한 연결을 보장하기 위해 HTTPS를 활성화할 박스를 체크하세요.

<div class="content-ad"></div>

6. 저장하기: 💾
구성을 적용하려면 저장 버튼을 클릭하세요.

![이미지](/assets/img/2024-06-22-DeployingaReactAppwithTypeScriptandGitHubActionstoGitHubPages_0.png)

## 4. .gitignore에 dist 유지하기 🚫

주 브랜치를 깨끗하게 유지하려면 .gitignore 파일에 dist 디렉토리를 포함시키세요. 이렇게 하면 dist 폴더가 주 브랜치에 커밋되지 않고, GitHub Actions 파이프라인에서 빌드 프로세스 중에 생성됩니다.

<div class="content-ad"></div>

 다음과 같은 줄을 .gitignore 파일에 추가해주세요:

```js
dist/
```

# 결론 🎉

위 단계를 따라하면 GitHub Actions를 통해 GitHub Pages에 React 애플리케이션을 효율적으로 배포할 수 있습니다. 이 설정은 메인 브랜치를 유지하고 소스 코드 관리에 집중하면서 최적화된 프로덕션 빌드만 배포되도록 보장합니다.

<div class="content-ad"></div>

제 포켓몬 앱의 작동 예제를 확인하고 완전한 소스 코드를 보려면 GitHub 저장소를 살펴보세요.

저자 소개

안녕하세요, 개발에 열정을 품고 웹 개발과 오픈 소스 프로젝트에 관심을 가지고 있는 Jagoda입니다. GitHub에서 제 작품을 더 확인하거나 LinkedIn에서 저와 소통할 수 있습니다.

질문이 있거나 추가 도움이 필요하다면 언제든지 댓글을 남기거나 연락해주세요. 즐거운 배포되세요!🌟