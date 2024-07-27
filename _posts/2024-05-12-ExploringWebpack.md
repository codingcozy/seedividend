---
title: "Webpack 탐험"
description: ""
coverImage: "/assets/img/2024-05-12-ExploringWebpack_0.png"
date: 2024-05-12 23:16
ogImage: 
  url: /assets/img/2024-05-12-ExploringWebpack_0.png
tag: Tech
originalTitle: "Exploring Webpack"
link: "https://medium.com/@mazenadel19/exploring-webpack-778d9a469b29"
---


프론트엔드 개발자들의 삶 속에는 번들러에서 뭔가를 편집해야 하는 시기가 올 때가 있죠. 다행히 아직은 그런 날이 오지 않았지만, 여유 시간이 좀 생겨 이 키워드들을 해결해 보기로 했어요: Webpack — Craco — Bundles — Chunks — Bundle Size — Code Splitting — Dynamic imports.

이 포스트를 통해 웹팩의 기본적인 것을 알아보고, 왜 현대 웹 개발에 중요한지 이해하는 데 도움이 되도록 하겠습니다.

그럼 첫 번째 질문은:

## 웹팩이란 무엇인가요?



웹팩은 모듈 번들러입니다. 프로젝트의 파일을 하나 이상의 파일(번들)로 번들링합니다. 그런 다음 일부 추가 정리 작업(ES6를 이전 JavaScript로 변환, 최소화/압축, 트리 쉐이킹, 코드 분할, 압축 및 자산 최적화, 그리고 추가 프로덕션 모드별 최적화)을 수행하여 코드를 제품용으로 준비합니다. 요약하면, 웹팩은 개발 코드와 제품 코드 사이의 중간 매개체라고 할 수 있습니다.

![이미지1](/assets/img/2024-05-12-ExploringWebpack_0.png)

웹팩이 하는 또 다른 중요한 작업은 종속성을 해결하고 최종 번들에 포함하는 것입니다. 프론트엔드 프레임워크가 나오기 전의 이야기를 하나 들려드릴게요.

![이미지2](/assets/img/2024-05-12-ExploringWebpack_1.png)



옛날에는 HTML, CSS, 그리고 자바스크립트만 사용했던 시절, 우리가 HTML 파일을 구조화했던 방법을 기억하나요?

```js
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Document</title>
    <link rel='stylesheet' href='style.css'>
</head>
<body>
    
    <script src='script.js'></script>
</body>
</html>
```

만약 프로젝트에 부트스트랩을 추가하고 싶다면 어떻게 할까요?

```js
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel='stylesheet' href='style.css'>
</head>
<body>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src='script.js'></script>
</body>
</html>
```



스타일시트와 스크립트가 부트스트랩의 스타일시트와 스크립트 뒤에 위치하는 것을 알아 보았나요? 왜 그렇게 한걸까요?

우리는 스타일시트가 기본 부트스트랩 스타일을 덮어쓰도록 하고 싶었거나, 스크립트의 경우에는 사용자 정의 스크립트가 웹페이지에서 마지막으로 실행되어 이전 스크립트에 덮어쓰거나 사용될 수 있도록 하고, 페이지의 나머지가 완전히 렌더링되었는지 확인하려고 합니다. 그래서 다음과 같이 무언가를 할 때:

```js
document.querySelector('#firstName')
```

#firstName이 DOM에 존재해야합니다. 부트스트랩 스크립트도 마찬가지입니다. 그래서 스크립트가 페이지 맨 아래에 있고 맨 위에 있지 않은 이유입니다. HTML이 추가되기 전에 자바스크립트를 추가하기를 원합니다.



여기서 일부 종속성이 발생하고 있어요. 순서가 중요하며 요소는 조작하기 전에 DOM에 존재해야 합니다.

현대 웹 개발에서는 HTML이나 스크립트를 작성하지 않고, HTML 헤드에 Bootstrap 링크를 추가하지 않고, 패키지를 다운로드하고, react-bootstrap과 같은 라이브러리를 사용하여 구성 요소를 파일로 가져옵니다. 맞죠?

여기서 Webpack 마법이 뒤에서 일어나는 첫 번째 신비한 모습을 볼 수 있어요. 다음 코드를 참고하세요:

```js
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AutoLayoutExample() {
  return (
    <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;
```



자동 레이아웃 예제 컴포넌트가 올바르게 렌더링되려면 이 파일에는 존재하지 않지만 자동 레이아웃 예제 컴포넌트를 올바르게 렌더링하려면 반드시 있어야 하는 3가지 다른 컴포넌트(Container, Row 및 Col)에 의존합니다. 웹팩은 교통 담당자입니다. 컴포넌트가 사용되기 전에 해당 컴포넌트에 종속된 코드가 존재하는지 확인하여 HTML을 스크립트보다 먼저 배치하는 것과 같은 역할을 합니다.

웹팩은 또한 개발 서버를 실행함으로써 프로젝트 개발을 도와줍니다. 예전에는 코드 변경을 테스트하려면 변경된 파일을 저장하고 새로고침 버튼을 눌러야 했지만, 이제는 그렇지 않습니다. 더 이상 새로고침 버튼을 클릭할 필요가 없습니다. package.json에서 start 스크립트를 실행하면 start 스크립트에 나열된 스크립트가 실행되어 WebpackDevServer의 새 인스턴스가 생성되고 컴파일러와 구성이 전달됩니다. 인스턴스의 리스너 메소드가 호출되어 포트와 호스트 값을 전달합니다. 그런 다음 콘솔을 지우고 "개발 서버 시작 중..."이라고 읽습니다. 브라우저는 올바른 개발 URL로 열립니다. 마지막으로 프로세스가 종료될 때 두 개의 리스너가 추가됩니다. 이는 웹 서버를 종료하고 start.js 프로세스를 종료합니다.
내부적으로 start 스크립트는 다음과 같이 작동합니다:


"start": "webpack-dev-server --mode development --open"


이는 Webpack에 개발 서버를 시작하고 파일을 실시간으로 제공하고 브라우저를 webpack.config 파일에서 지정한 포트로 엽니다(또는 기본값 8080을 사용합니다). 프로젝트를 최종 배포용으로 빌드하려면 아래와 같이 보일 수 있는 빌드 스크립트를 실행할 것입니다:



```js
"build": "webpack --mode production"
```

이 스크립트는 기본 Webpack 구성을 사용합니다. 이 구성은 프로젝트 루트에서 src 디렉토리를 찾고 index.js를 엔트리 포인트로 찾습니다. index.js에서 Webpack은 종속성 그래프를 빌드하기 시작합니다. 이전 예제와 유사하게 Container, Row 및 Col이 필요했던 것과 같이 AutoLayoutExample을 올바르게 렌더링하려면 Bootstrap이 AutoLayoutExample을 렌더링하기 전에 있는지 확인해야 합니다.

전형적인 React 앱에는 package.json이나 프로젝트 트리에 webpack.config.js 파일이 없는 것을 알아채셨나요?

이것은 React 팀이 이미 create-react-app을 사용할 때 모든 Webpack 구성을 내부에서 처리하고 있기 때문입니다. 그들은 무작위로 Webpack 구성을 변경하는 개발자들이 전반적인 경험을 저하시킬 수 있는 예상치 못한 동작을 도입할 위험 때문에 Webpack 구성을 무작위로 조정하길 원하지 않습니다.



하지만 자신이 무엇을 하고 있는지 알고 있다면 어떻게 해야 할까요? React의 웹팩 config를 재정의하는 데 도움이 되는 도구인 CRACO(Create React App Configuration Override)가 있습니다.

다음은 Craco가 공식 문서에서 자신을 어떻게 정의하는지에 대한 내용입니다:

이 정의 아래에 큰 경고도 있습니다:

따라서 CRACO를 사용하는 것은 React에게 "나는 안다, 내가 뭘 하고 있는지 안다"고 말하는 것과 동등합니다.



제 경우에는 CRACO를 사용하여 빌드를 분석할 계획입니다. 기본 빌드 스크립트를 수정하지 않을 것이고, 학습 목적으로 새로운 스크립트를 추가하여 번들을 조사하는 것을 목표로 할 것입니다. 

이제부터 회사에서 사용하는 볼륨이 큰 비공개 레포지토리를 분석할 것입니다. 그 레포지토리는 매우 크기 때문에 번들과 청크에 대해 배우기에 완벽한 대상이라고 생각합니다.

그러나 어떤 도구를 설치하기 전에, 손에 있는 것을 활용해보는 것은 어떨까요? 브라우저를 사용하면 번들을 분석하는 방법을 배우는 데 좋은 시작점이 될 수 있습니다. 그렇다면 번들은 무엇일까요? 청크는 무엇일까요?

## 번들(Bundle):



## 청크:

애플리케이션이 상당히 큰 경우 큰 번들을 청크로 나누어 게으르게 로드하는 것은 의미가 있습니다. 일반적으로 시간을 크게 단축할 수 있습니다.

번들을 분석하는 것은 브라우저로 제공되는 JavaScript 양을 최적화하는 좋은 첫 번째 단계이며, 이를 통해 페이지 로딩 시간을 향상시키고 직접적으로 더 나은 대규모 내용 그리기 속도(LCP)와 첫 입력 지연(FID)을 얻을 수 있습니다.
브라우저가 코드를 구문 분석, 분석 및 컴파일하는 데 필요한 시간을 단축함으로써.

다음 예제를 고려해보세요. 앱에서 사용자 페이지로 이동한 경우:



![Webpack](/assets/img/2024-05-12-ExploringWebpack_2.png)

위의 스크린샷에서는 네트워크 탭에서 이 페이지를로드하기 위해 서버에서 보낸 청크를 볼 수 있습니다. 또한 청크의 크기와 서버에서 브라우저로 이 청크를 보내는 데 필요한 시간도 볼 수 있습니다. 커버리지 탭에는 사용되지 않는 바이트의 크기를 볼 수 있습니다. 또한 개발 모드에서만, 청크 내의 실제 파일을 가리키는 소스 맵을 볼 수 있습니다. 청크 옆의 드롭다운 지시기를 클릭하여 찾을 수 있습니다.

14.chunk.js에는 97.7%의 사용되지 않은 바이트를 가진 useLocalStorage 커스텀 훅이 있는 한 개의 파일이 있습니다. 이는 useLocalStorage의 사용을 다시 확인해야 할 지표일 수 있습니다. 아마도 이 페이지에서는 그것이 필요하지 않을 수도 있습니다.

네트워크 및 커버리지 탭을 사용하면 이미 작은 범위에 대한 분석을 수행할 준비가 되어 있다면 좋은 시작이 될 수 있습니다. 그러나 프로젝트의 전반적인 분석을 원하는 경우, 일부 3rd 파티 도구의 도움이 필요할 수 있습니다.



우리가 먼저 할 일은 "craco"와 "webpack-bundle-analyzer"라는 웹팩 프러그인을 설치하는 것입니다. 이러한 패키지들은 새로운 스크립트를 실행할 때 웹팩이 출력하는 번들된 코드를 확인하는 데 도움이 됩니다:

```js
yarn add @craco/craco webpack-bundle-analyzer progress-bar-webpack-plugin chalk --dev
```

그런 다음 package.json 파일 아래에 "analysis"라는 스크립트를 추가할 수 있습니다.

```js
 "scripts": {
        "analysis": "craco build",
        // 다른 스크립트들
 
}
```



우리는 craco.config.js 파일을 만들고 다음 코드를 추가합니다.

```js
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    webpack: {
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'server',
            }),
            new ProgressBarPlugin({
                format: `${chalk.green('분석 중...')} ${chalk.green(
                    '[:bar]'
                )}${chalk.green('[:percent]')}${chalk.green(
                    '[:elapsed seconds]'
                )} - :msg`,
            }),
        ],
    },
};
```

참고: CommonJS 구문을 사용하였습니다. 왜냐하면 webpack 구성 파일은 Node.js 환경에서 실행되기 때문입니다.

이 파일에서는 BundleAnalyzerPlugin을 사용하여 빌드 후 서버를 열어 Webpack 출력 파일의 크기와 내용을 시각적으로 표시하고, ProgressBarPlugin을 사용하여 빌드 중에 터미널에 진행률 표시줄을 표시하여 빌드가 얼마나 완료되었는지와 실행 시간이 얼마나 되었는지 나타냅니다. 마지막으로 터미널에 색을 추가하기 위해 chalk를 사용하고 있습니다.



우리의 분석 스크립트를 실행한 결과입니다:

- [ExploringWebpack_3](/assets/img/2024-05-12-ExploringWebpack_3.png)
- [ExploringWebpack_4](/assets/img/2024-05-12-ExploringWebpack_4.png)
- [ExploringWebpack_5](/assets/img/2024-05-12-ExploringWebpack_5.png)



이 것은 무엇인가요?

저희의 최종 번들입니다. 응용 프로그램 코드와 그에 의존하는 어떤 모듈도 모두 포함되어 있습니다. 코드 스플리팅 및 다양한 웹팩 최적화 후 node_modules에서 발생하는 종속성도 포함되어 있습니다. BundleAnalyzerPlugin을 통해 3가지 화면을 제공합니다:

- Stat: 이 화면에서는 최적화가 적용되기 전 번들 내 각 모듈의 원시 크기를 보여줍니다. 프로젝트 내 각 파일/모듈의 크기에 대한 아이디어를 제공합니다.
- Parsed: 이 화면에서는 웹팩이 해석하고 처리한 후 각 모듈의 크기를 볼 수 있습니다. 일반적으로 트리 쉐이킹, 코드 스플리팅 및 기타 최적화 작업이 포함됩니다. 따라서 이 화면에서 보이는 숫자는 웹팩이 다양한 최적화를 적용한 후의 모듈 크기를 반영합니다.
- Gzipped: 이 화면에서는 gzip 압축이 적용된 후 각 모듈의 크기를 보여줍니다. Gzip 압축은 네트워크를 통해 전송되는 파일의 크기를 줄이는 데 사용되는 표준 기술입니다. 이 화면의 숫자는 압축 후 각 모듈의 예상 크기를 나타냅니다.

일반적으로 번들 크기에 대해 이야기할 때는 Gzipped 크기를 의미합니다. 그러나 Parsed와 Gzipped 둘 다 중요한 지표입니다. Parsed 크기는 브라우저가 앱을 로드할 때 수행해야 할 작업 양을 이해하는 데 도움을 줍니다. 반면 Gzipped 크기는 앱이 사용자에게 빠르게 다운로드되고 실행을 시작할 수 있는 속도를 알려줍니다.



우리는 React Lazy Imports에 마법 주석을 추가하여 출력을 향상시킬 수 있어요.

Lazy Imports 또는 Lazy Loading:

```js
import React from 'react';

const Users = React.lazy(() =>
    import(
        /* webpackChunkName:"Users" */ 'users/page의 경로'
    )
);


return (
<React.Suspense fallback={<div>로딩 중....</div>}>
  <Users/>
<React.Suspense>
)
```

이 향상된 결과는 엄청난 번들을 향상시키기 위한 좋은 시작점이 될 수 있어요. 내가 상위 여덟 청크로 줄인 후 (번들 크기의 약 2/3을 차지해요😲) Webpack 마법 주석을 lazy import된 routes 컴포넌트에 추가한 후에, EmployeeScoreCard (452 KB) 청크와 Style 청크 (296 KB) 중 두 가장 큰 문제가 되는 청크를 식별할 수 있어요.




![ExploringWebpack_6](/assets/img/2024-05-12-ExploringWebpack_6.png)

번들 크기를 최적화하는 데 일반적으로 사용되는 두 가지 방법은 레이지 로딩과 동적 임포트입니다. 또 더 나아가 EmployeeScoreCard 내부의 일부 구성 요소를 레이지 로딩하여 이 청크를 여러 개의 청크로 분할할 수 있습니다. 결과는 다음과 같습니다:

내부 구성 요소를 레이지 로딩한 후 EmployeeScoreCard는 훨씬 작아졌습니다. 우리가 명시적으로 확인하지 않는 이상 전혀 표시되지 않습니다. 또한 마지막 이미지에서 EmployeeInfoGrid라는 청크를 볼 수 있는데, 이 간단한 개선의 결과에 대해 저도 놀랍습니다. 총 청크 크기가 7.25MB에서 6.83MB로 감소했습니다. 6%의 감소입니다. 🤯

번들을 최적화하는 두 번째 방법은 청크 내부에서 동적 임포트를 사용하는 것입니다. 동적 임포트는 일반적으로 사용자 작업에 따라 조건적으로 로딩됩니다. 다음 코드를 고려해보세요:



```js
import React, { useState } from 'react';

const Dashboard = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [UserDetails, setUserDetails] = useState(null);

  const handleClick = async () => {
    if (!UserDetails) {
      const { default: UserDetailsComponent } = await import('./UserDetails');
      setUserDetails(UserDetailsComponent);
    }
    setShowUserDetails(true);
  };

  return (
    <div>
      <button onClick={handleClick}>세부 정보 보기</button>
      {showUserDetails && UserDetails && <UserDetails user={/* 사용자 데이터 입력 */} />}
    </div>
  );
};

export default Dashboard;
```

여기서는 사용자가 버튼을 클릭한 후 UserDetailsComponent만 가져오기 때문에, UserDetailsComponent를 위한 별도의 청크를 만듭니다.

이러한 기술을 따르면 번들 크기를 크게 줄일 수 있어 다음과 같은 결과를 얻을 수 있습니다:

- 초기 로딩 시간 단축
- 대역폭 사용 감소
- 브라우저 캐싱 향상
- 이탈률 낮춤
- 사용자 경험 향상
- SEO 향상



하지만 번들 크기를 줄이는 데 가장 중요한 팁은 제 생각에는:

당신이 할 말을 아는 편이에요:
- "나한테 바퀴를 재발명하라는 거야?"
- "그 라이브러리가 내 삶을 더 쉽게 만들어줘."

내가 당신에게 그것을 설치하지 말라고 금지하는 건 아니에요 😅 그저 자원을 효율적으로 활용해봐요. 터미널 출력이나 웹팩 분석기 출력을 자세히 살펴보면, 모든 그 무명의 청크들이 node_modules 이거나, 아무 로직이 없는 코드거나, 그리고 우리가 지타줘야 하는 추가적인 부담이 있는 거예요.



나도 누구 다름 없이 도서관을 좋아해요. 하지만 프로젝트에 라이브러리를 설치한다면 다음을 지켜주세요:

- 정기적으로 유지/업그레이드하기
- 같은 작업을 수행하는 여러 라이브러리를 설치하지 않기
- 최신 정보 유지하기. 라이브러리는 사용이 중단되고 브라우저는 매일 라이브러리를 대체할 수 있는 기능을 추가합니다.

마지막으로 번들을 분석한 후, 이 라이브러리들이 반드시 필요하다면 더 작은 라이브러리로 대체해보세요. 다음 패키지를 설치하기 전에 https://bundlephobia.com/ 같은 도구가 여러분의 여정에서 큰 도움이 될 수 있습니다.

작은 번들과 버그 없는 하루 되세요!