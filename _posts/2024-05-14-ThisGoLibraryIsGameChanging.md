---
title: "이 Go 라이브러리는 혁신적입니다"
description: ""
coverImage: "/assets/img/2024-05-14-ThisGoLibraryIsGameChanging_0.png"
date: 2024-05-14 11:39
ogImage: 
  url: /assets/img/2024-05-14-ThisGoLibraryIsGameChanging_0.png
tag: Tech
originalTitle: "This Go Library Is Game Changing…"
link: "https://medium.com/@hhartleyjs/react-but-in-go-c64c6fc62179"
---


<img src="/assets/img/2024-05-14-ThisGoLibraryIsGameChanging_0.png" />

React의 강력한 기능 중 하나는 JSX입니다. React는 렌더링 로직이 다른 UI 로직과 본질적으로 결합되어 있다는 사실을 받아들입니다. Jinja와 같은 템플릿 엔진을 사용하는 것은 데이터를 컴포넌트로 전달하는 대신 엔진에 문맥을 '전달'해야 한다는 사실로 인해 같은 경험을 제공해주지 않습니다.

# Templ은 HTML과 Go 사이의 간격을 좁히려고 합니다

```js
package main

// 우리 Component에서 사용할 수 있는 일반 Go 코드
var greeting = "환영합니다!"

// templ Component
templ headerTemplate(name string) {
  <header>
    <h1>{ name }</h1>
    <h2>"{ greeting }"은 일반 Go 코드에서 옵니다</h2>
  </header>
}
```



다음과 같이 templ은 Go에 자체 구문을 추가하지만 기본적으로 함수처럼 작동합니다.

# 구성

## Templ

```js
package components

templ Link(name string, path string) {
    - <li>
    -     <a href={templ.URL(path)}>{name}</a>
    - </li>
}

templ NavBar() {
    - @Link("Home", "home")
    - @Link("News", "news")
    - @Link("Contact Us", "contact-us")
}
```



## 리엑트

```js
function Welcome(props) {
  return <h1>안녕, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="사라" />
      <Welcome name="카할" />
      <Welcome name="에디트" />
    </div>
  );
}
```

보시다시피 구문은 매우 유사합니다. 리엑트 컴포넌트는 HTML 스타일 요소로 변합니다.

# For 루프



```js
package main

templ nameList(items []Item) {
  <ul>
  for _, item := range items {
    <li>{ item.Name }</li>
  }
  </ul>
}
```

여기서 Javascript가 약간 뛰어나다고 할 수 있습니다. Javascript에는 배열을 쉽게 반복할 수 있는 Map 함수와 같은 작은 도우미들이 많이 있습니다.

# Javascript

문법이 React와 비슷해 보이지만, 완전히 다릅니다. Templ은 Javascript와 상호 작용할 수 없도록 제한됩니다.



```js
templ body() {
 <script>
  const chart = LightweightCharts.createChart(document.body, { width: 400, height: 300 });
  const lineSeries = chart.addLineSeries();
  lineSeries.setData([
    { time: '2019-04-11', value: 80.01 },
    { time: '2019-04-12', value: 96.63 },
    { time: '2019-04-13', value: 76.64 },
    { time: '2019-04-14', value: 81.89 },
    { time: '2019-04-15', value: 74.43 },
    { time: '2019-04-16', value: 80.01 },
    { time: '2019-04-17', value: 96.63 },
    { time: '2019-04-18', value: 76.64 },
    { time: '2019-04-19', value: 81.89 },
    { time: '2019-04-20', value: 74.43 },
  ]);
 </script>
}
```

템플은 그냥 템플릿 엔진일 뿐이에요. 텍스트를 합쳐주는 거죠.

# 템플 설치하기

```js
go install github.com/a-h/templ/cmd/templ@latest
```



# Templ은 어떻게 작동하나요?

Templ 문서에서는 모든 .templ 파일을 components 폴더/패키지에 저장하는 것을 권장합니다.

```js
//navbar.templ
package components

templ Link(name string, path string) {
    <li>
        <a href={templ.URL(path)}>{name}</a>
    </li>
}

templ NavBar() {
    @Link("Home", "home")
    @Link("News", "news")
    @Link("Contact Us", "contact-us")
}
```

그런 다음 .templ 파일을 만든 후 다음 명령을 실행하면 됩니다:



```js
templ generate
```

그런 다음, 코드 생성을 사용하여 별도의 ‘navbar_templ.go’ 파일을 생성합니다.

<img src="/assets/img/2024-05-14-ThisGoLibraryIsGameChanging_1.png" />

그런 다음 핸들러에서는 간단히 Render 함수를 호출할 수 있습니다.




```js
package main

import (
"context"
"templ-echo-test/components"

"github.com/labstack/echo/v4"
)

func Page(c echo.Context) error {
return components.NavBar().Render(context.Background(), c.Response())
}
```

코드 생성 패스 없이는 Go가 .templ 파일을 읽을 수 없습니다.

# 핫 리로드

templ을 사용하는 Go 웹 애플리케이션에 웹 브라우저에서 액세스하려면 몇 가지 일이 발생해야 합니다:




- templ generate 명령을 실행하여 *.templ 파일에서 Go 코드 (*_templ.go 파일)를 생성해야 합니다.
- Go 코드는 포트에서 웹 서버를 시작해야 합니다. 예: (http.ListenAndServe("localhost:8080", nil).
- Go 프로그램을 실행해야 합니다. 예: go run .. 명령으로 실행합니다.
- 웹 브라우저가 페이지에 접속하거나 새로고침해야 합니다. 예: http://localhost:8080.

만약 *.templ 파일이 변경되면, #1과 #2를 실행해야 합니다.

만약 *.go 파일이 변경되면, #3과 #4를 실행해야 합니다.

Templ은 이러한 작업을 자동으로 수행하는 내장 툴을 제공합니다. Air와 같은 도구들도 사용할 수 있지만, 내장된 툴처럼 페이지를 자동으로 새로고침하지는 않습니다.



아래 명령어를 실행하여 설정을 합니다

```js
templ generate --watch --proxy="http://localhost:8080" --cmd="go run ."
```

# 내 이북을 확인해보세요: Go로 풀스택 애플리케이션 작성하기

https://harryhtml.gumroad.com/l/tdbxl