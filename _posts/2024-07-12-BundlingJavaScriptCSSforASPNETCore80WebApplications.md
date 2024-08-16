---
title: "ASPNET Core 80 웹 애플리케이션에서 JavaScript와 CSS 번들링하는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-BundlingJavaScriptCSSforASPNETCore80WebApplications_0.png"
date: 2024-07-12 19:16
ogImage: 
  url: /assets/img/2024-07-12-BundlingJavaScriptCSSforASPNETCore80WebApplications_0.png
tag: Tech
originalTitle: "Bundling (JavaScript CSS) for ASP.NET Core 8.0 Web Applications"
link: "https://medium.com/gitconnected/bundling-javascript-css-for-asp-net-core-8-0-web-applications-e616875c7d1b"
isUpdated: true
---




ASP.NET Core 웹 프로젝트는 이제 JS/CSS 번들링을 기본으로 제공하지 않습니다. ASP.NET Core는 이제 응용 프로그램 개발자가 자체 번들링 솔루션을 제공하기를 기대하기 때문에, 본 블로그 포스트에서는 ASP.NET Core 웹 응용 프로그램을 위한 사용자 정의 JS/CSS 번들링을 구현할 것입니다.

![이미지](/assets/img/2024-07-12-BundlingJavaScriptCSSforASPNETCore80WebApplications_0.png)

# 웹 응용 프로그램

번들링이 없는 .NET 웹 응용 프로그램의 폴더 구조는 아래와 같습니다. 여기서는 "script"와 "styles" 폴더를 사용하여 각각 JS 및 CSS 파일을 포함합니다:

<div class="content-ad"></div>


회사.MyProduct.Solution
  |__ 회사.MyProduct.Web.App
          |__ index.html
          |__ scripts
          |     |__ script.min.js
          |
          |__ styles
                |__ styles.min.css


# JS/CSS 번들링

JS/CSS 번들링이란 .NET 솔루션을 빌드할 때마다 웹 애플리케이션에 사용되는 모든 JavaScript 파일과 CSS 파일을 최소화(minified)하고 하나의 "script.min.js" 및 "styles.min.css" 파일로 병합하여 웹 애플리케이션이 실행될 때 이용할 수 있도록 하는 것을 의미합니다.

이러한 번들링 프로세스를 자동화할 수 있는 방법이 필요합니다.


<div class="content-ad"></div>

# 번들 옵션

ASP.NET Core 8.0 웹 애플리케이션에서 JS/CSS 번들링을 구현하는 방법은 다음과 같습니다:

1 — 비주얼 스튜디오 확장 프로그램

2 — NuGet 서드 파티 번들링 패키지

<div class="content-ad"></div>

3 — ASP.NET Tag Helper Library

4 — 사용자 정의 번들링

위의 첫 세 가지 옵션 중에 하나를 사용해도 괜찮지만, 대규모 프로젝트에 대 한 CI(지속적 통합)가 필요할 때 부족할 수 있습니다.

그래서 네 번째 옵션 "사용자 정의 번들링"을 탐구해야 할 때입니다.

<div class="content-ad"></div>

가정해 봅시다. .NET Solution이 빌드 및 배포될 때마다 JavaScript와 CSS를 병합, 최소화 및 번들링해야 하는 ASP.NET Core 웹 응용 프로그램이 있다고 합시다.

# 구현

솔루션에 "Company.MyProduct.Web.Node"라는 빈 프로젝트를 추가합니다. 이 프로젝트는 Node 패키지를 포함할 것입니다. 이 프로젝트에는 서버 측 코드가 포함되지 않습니다. 그러므로 솔루션 구조는 다음과 같이 보일 것입니다:

```js
Company.MyProduct.Solution
  |__ Company.MyProduct.Web.App
          |__ Company.MyProduct.Web.App.csproj
          |__ index.html
          |__ scripts
          |    |__ script.min.js
          |
          |__ styles
                |__ styles.min.css

  |__ Company.MyProduct.Web.Node
          |__ Company.MyProduct.Web.Node.csproj
          |__ gulpfile.js
          |__ package.json
          |__ tsconfig.json
          |__ src
               |__ js
               |    |__ main.ts
               |    |__ some-script-01.ts
               |__ some-script-02.ts
               |
               |__ scss
                    |__ main.scss
                    |__ some-style-01.scss
                    |__ some-style-02.scss
```

<div class="content-ad"></div>

이제 새로 추가된 Node 프로젝트에 추가된 모든 파일들을 개별적으로 살펴보겠습니다.

## 1 — package.json

다음은 Node의 package.json 파일을 살펴봅시다:

```js
// package.json

{
  "version": "1.0.0",
  "name": "client-library",
  "private": true,
  "description": "Client library",
  "main": "gulpfile.js",
  "scripts": {
    "build": "node gulpfile.js"
  },
  "dependencies": {
    "@types/jquery": "^3.5.16",
    "bootstrap": "^5.3.0",
    "date-fns": "^2.30.0",
    "font-awesome": "^4.7.0",
    "jquery": "^3.7.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-clean-css": "^4.3.0",
    "gulp-concat": "^2.6.1",
    "gulp-sass": "^5.1.0",
    "gulp-sourcemaps": "^3.0.0",
    "gulp-strip-import-export": "^1.0.0",
    "gulp-typescript": "^6.0.0-alpha.1",
    "gulp-uglify": "^3.0.2",
    "sass": "^1.64.1",
    "tslib": "^2.6.1"
  }
}
```

<div class="content-ad"></div>

패키지.json 파일은 번들링 프로세스를 실행하는 gulp Node 패키지에서 사용할 종속성만 포함하고 있습니다. 새 릴리스에 따라 패키지 버전을 업데이트해도 괜찮습니다.

## 2 - tsconfig.json

이제 TypeScript 지원을 구성하는 tsconfig.json 파일을 살펴보겠습니다:

```js
// tsconfig.json

{
  "compilerOptions": {
    "baseUrl": "./",
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "importHelpers": true,
    "module": "ES2020",
    "moduleResolution": "node",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": false,
    "noImplicitOverride": true,
    "noImplicitReturns": false,
    "noPropertyAccessFromIndexSignature": false,
    "removeComments": true,
    "sourceMap": true,
    "strict": true,
    "target": "ES2020",
    "useDefineForClassFields": false,
    "types": [ "jquery" ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

<div class="content-ad"></div>

## 3 - gulpfile.js

이제 번들링을 자동화하기 위해 사용할 "gulpfile.js"를 살펴보겠습니다.

```js
/// <binding BeforeBuild='default' />
const gulp = require('gulp');
const sassPlugin = require('gulp-sass')(require('sass'));
const uglifyPlugin = require('gulp-uglify');
const minifyCssPlugin = require('gulp-clean-css');
const concatPlugin = require('gulp-concat');
const sourceMapsPlugin = require('gulp-sourcemaps');
const stripImportExportPlugin = require('gulp-strip-import-export');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('./tsconfig.json', {});

const cssDistPath = './dist/css';
const jsDistPath = './dist/js';

Company.MyProduct.Solution\Company.MyProduct.Web.App\scripts

const cssCopyPath = '../Company.MyProduct.Web.App/scripts';
const jsCopyPath = '../Company.MyProduct.Web.App/Styles';

var minifyCssTask = function () {
    return gulp.src([
        // 모든 파일을 나열하거나 중첩으로 인해 중복 파일이 생성될 수 있습니다.
        './src/scss/main.scss'
    ])
        .pipe(sourceMapsPlugin.init({ loadMaps: true }))
        .pipe(sassPlugin())
        .pipe(minifyCssPlugin())
        .pipe(gulp.dest(cssDistPath))
        .pipe(concatPlugin('styles.min.css'))
        .pipe(sourceMapsPlugin.write('./maps'))
        .pipe(gulp.dest(cssDistPath))
        .pipe(gulp.dest(cssCopyPath));
}

var minifyJsTask = function () {
    return gulp.src([
        './src/js/**/*.ts'
    ])
        .pipe(stripImportExportPlugin())
        .pipe(sourceMapsPlugin.init({ loadMaps: true }))
        .pipe(tsProject())
        .pipe(gulp.dest(jsDistPath))
        .pipe(concatPlugin('script.min.js'))
        .pipe(uglifyPlugin())
        .pipe(sourceMapsPlugin.write('./maps'))
        .pipe(gulp.dest(jsDistPath))
        .pipe(gulp.dest(jsCopyPath));
}

var mainTask = function () {
    minifyCssTask();
    minifyJsTask();
}

// 개별 작업
gulp.task('build_css', minifyCssTask);
gulp.task('build_js', minifyJsTask);

// 자동 빌드를 위한 메인 작업.
gulp.task('default', gulp.series('build_css', 'build_js'));

// 수동 빌드를 위한 내보내기.
exports.default = mainTask();
```

위에서 나오는 /// `binding BeforeBuild=’default’ /`는 Visual Studio에게 gulpfile.js를 실행하는 방법을 알려주는 설정 태그입니다. 여기서 파일 내의 "default"라는 Task는 빌드 요청시 빌드 전에 실행됩니다.

<div class="content-ad"></div>

## 4 - 소스 파일

우리의 솔루션을 빌드할 때마다, Visual Studio Task Runner는 빌드하기 전에 gulpfile.js의 "default" 작업을 실행하여 JavaScript 및 CSS 파일을 번들로 만들고 목적지 폴더로 파일을 복사한 후 응용 프로그램을 실행합니다.

gulpfile.js 내부의 "build_js" 작업은 "js" 폴더 내의 모든 TypeScript 파일을 변환, 최소화하고 병합하여 하나의 JavaScript 파일인 "script.min.js"로 만들고 해당 파일을 경로 Company.MyProduct.Solution\Company.MyProduct.Web.App\scripts로 복사합니다.

gulpfile.js 내부의 "build_css" 작업은 "scss" 폴더 내의 모든 SCSS 스타일을 변환, 최소화하고 병합하여 하나의 CSS 파일인 "styles.min.js"로 만들고 해당 파일을 경로 Company.MyProduct.Solution\Company.MyProduct.Web.App\styles로 복사합니다.

<div class="content-ad"></div>

또한 감사를 위해 생성된 파일의 사본을 "dist" 폴더에 보관하고 있습니다.

## 5 — csproj 파일

이제 누락된 사항이 없는지 확인하기 위해 "Company.MyProduct.Web.Node.csproj" 파일을 살펴보겠습니다:

```js
// Company.MyProduct.Web.Node.csproj

<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <Compile Remove="node_modules\**" />
    <EmbeddedResource Remove="node_modules\**" />
    <None Remove="node_modules\**" />
  </ItemGroup>

  <ItemGroup>
    <None Remove="package-lock.json" />
    <None Remove="package.json" />
    <None Remove="tsconfig.json" />
  </ItemGroup>

  <ItemGroup>
    <Content Include="package-lock.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
      <ExcludeFromSingleFile>true</ExcludeFromSingleFile>
      <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
    </Content>
    <Content Include="package.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
      <ExcludeFromSingleFile>true</ExcludeFromSingleFile>
      <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
    </Content>
    <Content Include="tsconfig.json">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
      <ExcludeFromSingleFile>true</ExcludeFromSingleFile>
      <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
    </Content>
  </ItemGroup>

</Project>
```

<div class="content-ad"></div>

위에서 확인할 수 있듯이, 프로젝트 파일에는 프로젝트에 추가되는 파일을 제한하는 것 이외에는 중요한 내용이 없습니다.

모든 준비가 끝나면 gulp.js 파일이 솔루션이 빌드될 때마다 실행되고, 최소화된 파일이 웹 애플리케이션이 사용할 목적지로 배치됩니다.

여기까지입니다!

이 게시물이 마음에 드셨나요? 더 이런 콘텐츠를 원하시면 팔로우해주세요!