---
title: "Plotly Dash로 아름답고 상호작용하는 대시보드 레이아웃 만드는 방법 Python"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_0.png"
date: 2024-07-09 14:39
ogImage:
  url: /assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_0.png
tag: Tech
originalTitle: "How to create a beautiful, interactive dashboard layout in Python with Plotly Dash"
link: "https://medium.com/plotly/how-to-create-a-beautiful-interactive-dashboard-layout-in-python-with-plotly-dash-a45c57bb2f3c"
---

파이썬으로 만들어진 대시보드는 인상적인 디자인, 독특한 상호작용 및 최고의 처리 속도를 가질 수 있습니다. 그건 멋지게 들리지만, 주의할 점이 있어요: 생성 과정은 그다지 간단하지 않고 많은 함정이 숨어 있습니다. 이 기사는 대시보드 생성의 첫 번째 단계인 레이아웃 디자인에 주로 초점을 맞춥니다. 대시보드 그리드를 개발하고, 컨테이너, 텍스트 블록, 버튼, 드롭다운, 이미지 및 출력 양식과 같은 모든 기본 레이아웃 요소를 생성하고 스타일을 적용하는 방법을 살펴볼 것입니다.

우리가 점진적으로 만들어 나갈 대시보드 프로토타입은 최근 Dash Example App Gallery에 포함된 내 Global Precious Metals and Stones Export Research 대시보드에서 영감을 받았습니다. 입구 페이지의 모든 주요 요소가 어떻게 생성되었는지에 대해 자세히 알아볼 것입니다.

우리가 최종으로 얻게 될 모습은 이렇습니다:

![How to create a beautiful interactive dashboard layout in Python with Plotly Dash](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_0.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

대시보드를 이미지 그대로 재현하려면 Poppins 글꼴이 설치되어 있어야 합니다. 일부 컴퓨터는 기본적으로 이 글꼴을 가지고 있을 수 있지만, 만약 설치가 필요하다면 여기서 다운로드할 수 있습니다.

그러면 레이아웃 생성을 시작해 보겠습니다!

GitHub 리포지토리를 사용하여 함께 따라오실 수 있습니다.

## 패키지 설치하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

일반적으로, Dash에서는 대시보드를 만드는 것이 아니라 대시보드처럼 보이는 완전한 웹 애플리케이션을 만드는 것입니다. 따라서 생성 프로세스는 웹 페이지의 생성과 매우 유사합니다.

레이아웃을 만들기 위해 다음과 같은 여러 요소 세트를 사용할 것입니다:

- 대시보드 구조를 개발하는 데 사용되는 HTML 요소;
- 외관을 정의하는 CSS;
- 사전 설계된 Dash 및 Bootstrap 구성 요소로 생성 프로세스를 용이하게 하는 데 사용되는 것입니다.

그래프를 그리려면 Numpy, Random 및 Plotly 라이브러리가 필요합니다. Plotly는 Dash와 함께 설치되고 Random은 Python과 함께 설치되므로 Numpy가 이미 설치되어 있지 않은 경우에만 설치하면 됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
pip install dash
pip install dash-bootstrap-components
pip install numpy
```

여기서 모든 작업은 Jupyter Notebook에서 이루어질 거에요.

```js
from dash import Dash, html, dcc
import dash_bootstrap_components as dbc
```

레이아웃을 만들기 위해 필요한 모든 패키지를 방금 설치했어요!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Dash를 사용하여 우리 애플리케이션을 출시할 거에요.
- Dash에서의 HTML 컴포넌트는 HTML 태그와 유사해요. 예를 들어, Dash 명령어인 html.Div(), html.P(), 또는 html.Img()는 각각 `div`, `p`, 또는 `img`를 나타내요. 여기서 모든 컴포넌트 목록이 있어요.
- Dash 코어 컴포넌트 (DCC)는 준비된 상호작용 요소인 그래프, 드롭다운, 버튼 또는 임시 저장소를 저장해요. 즉, dcc.Dropdown()이나 dcc.Graph() 명령어를 적용하여 각각 드롭다운을 생성하거나 Plotly 그래프를 호출할 수 있어요. 가능한 모든 컴포넌트가 여기 나와 있어요.
- Dash Bootstrap 컴포넌트 (DBC)는 많은 경우 HTML 및 DCC 요소, 심지어 전체 CSS 파일을 효과적으로 대체할 수 있어요. 우리는 DBC 명령어를 사용하여 대시보드 본문, 모든 버튼, 그리고 전반적인 페이지 스타일링을 설정할 거에요. Dash Bootstrap 요소에 대해 더 많이 읽어볼 수 있는 곳이 있어요.

## 중첩 대시보드 구조

본질적으로, Dash 애플리케이션은 중첩된 직사각형 DIV 컨테이너 구조에요. 이러한 컨테이너에는 그래프, 텍스트, 이미지 및 탐색 요소들을 배치해요. 배경을 고려하면, 우리 페이지는 여러 레이어로 구성되어 있어요:

![대화형 대시보드 레이아웃을 만드는 방법](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_1.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 애플리케이션 시작하기

대시보드를 만드는 것부터 시작해봅시다. 우선, 대시 애플리케이션을 실행해 봅시다:

```js
app = Dash(__name__);
```

그 다음으로 레이아웃을 만들어봅니다; 현재는 빈 DIV 컨테이너입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
app.layout = html.Div();
```

이제 개발 서버를 디버그 모드로 실행할 수 있습니다:

```js
if __name__ == "__main__":
    app.run_server(debug=True, port=8050)
```

결과 코드를 실행해보세요!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
app = Dash(__name__)
app.layout = html.Div()
if __name__ == "__main__":
    app.run_server(debug=True, port=8050)
```

저희 애플리케이션이 생성되었습니다! 지금은 빈 페이지일 뿐입니다. 주피터 노트북을 사용하신다면 바로 출력 창에서 확인하실 수 있고, 개발 서버인 http://127.0.0.1:8050/에서 전체 화면으로 확장할 수도 있습니다.

서버 링크의 마지막 네 자리는 포트 번호입니다; 기본값은 8050입니다. 앱이 개발 중일 때 업데이트가 중지된 경우, 애플리케이션 코드와 링크에 다른 포트 번호를 넣어주시면 됩니다 — 예를 들어, 8051입니다.

## 대시보드 본문 만들기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

대시보드 본문을 만들기 위해 Bootstrap 컨테이너를 사용할 것입니다. 이는 대시보드 그리드의 최상위 요소로서, 너비를 설정하고 모든 하위 요소를 "포함"합니다. 우리의 임시 html.Div()를 dbc.Container()으로 교체하세요. 대시보드가 브라우저 창의 너비를 100% 차지하도록 하려면 fluid=True로 설정하여 fluid 해야합니다.

```js
app.layout = dbc.Container((fluid = True));
```

화면에 컨테이너가 나타나려면 무언가를 포함해야하므로 일시적으로 일부 텍스트를 넣어봅시다. 먼저 텍스트를 html.P() 요소로 감싸주세요. HTML `p` 태그와 유사한 요소이며, 그런 다음 컨테이너 내에 배치하세요.

```js
app.layout = dbc.Container(html.P("내 멋진 대시보드가 여기에 나타납니다."), (fluid = True));
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

앱을 업데이트하고 와우! 우리의 컨테이너 내용을 볼 수 있어요. 아직까지는 꽤 평범해 보이니 대시보드를 스타일링하는 것부터 시작해 볼까요?

## 대시보드가 어떻게 스타일링되는지

우리 앱의 각 부분인 컨테이너, 네비게이션 요소 또는 텍스트는 길이와 너비, 색상, 폰트, 들여쓰기 등 특정한 스타일을 가질 수 있어요. 전체 앱에 대한 일반적인 스타일링 규칙은 특별한 사용자 정의 CSS 파일에 설정되고, 개별 요소의 스타일은 사용자 정의 CSS 및 앱 코드에 자세히 기재할 수 있어요.

먼저 사용자 정의 CSS를 만들어 보겠어요. 주피터 노트북(또는 코드)이 실행되는 동일한 폴더에 "assets" 폴더를 생성한 다음 그 안에 빈 텍스트 파일을 만들어 "style.css"로 저장하세요. 이 파일에서 대시보드 요소들의 모습을 자세히 설명할 거예요. 파일을 열어보겠어요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

대시보드 요소와 해당 CSS 스타일을 연결하려면 클래스 또는 ID를 제공합니다:

- 클래스는 요소나 여러 요소 그룹에 지정하여 스타일을 적용합니다.
- ID는 고유한 대시보드 요소에 할당되어 해당 요소의 스타일을 설정하거나 상호작용을 구성합니다.

요소에는 클래스와 ID를 둘 다 할당할 수 있으며, 후자가 "강력"합니다. 즉, 컨테이너의 클래스 "red"가 빨간색을 지정하고 ID "blue"가 파란색을 지정한다면 컨테이너는 빨간색이 아니라 파란색이 됩니다.

특정 HTML 태그의 모든 요소에 스타일을 지정할 수도 있습니다. 예를 들어 모든 텍스트 (`p`)나 전체 페이지 (`body`)에 대해 클래스나 ID를 지정하지 않고 스타일을 할당할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

대시보드의 본문을 스타일링하려면 클래스를 제공합니다. 클래스는 대시보드의 컨테이너 내에 설정되며, 다른 내용과 쉼표로 구분됩니다:

```js
app.layout = dbc.Container(
  html.P("내 멋진 대시보드가 여기에 있을 거예요."),
  (fluid = True),
  (className = "대시보드-컨테이너")
);
```

코드를 저장한 후 CSS 파일로 넘어가 보겠습니다. 클래스에 스타일을 설정하려면 그 이름 앞에 점(.)을 붙입니다: .대시보드-컨테이너. 여기서 대시보드의 너비와 높이 (1400x800), 정렬, 들여쓰기, 색상 (배경색), 테두리 (border), 모서리를 둥근 모양으로 만드는 속성을 설정했습니다. 이 모두는 잘 알려진 CSS 스타일링 요소이며, 오픈 소스 문서에서 많은 정보를 찾을 수 있습니다. 지금은 이 스타일링 조각을 style.css 파일에 넣고 저장한 다음 어플리케이션이 어떻게 변하는지 확인해보세요.

```js
.대시보드-컨테이너 {
    width: 1400px;
    height: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    background-color: #010103;
    border: 1px solid #cccccc;
    border-radius: 10px;
}
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

대시보드 본문의 스타일은 설정되었지만, 배경과 플레이스홀더 텍스트는 어떻게 되나요?

우리의 배경은 웹 페이지 자체입니다. 스타일은 대시 컴포넌트가 아닌 표준 HTML `body` 태그에 의해 결정되고 클래스를 도입할 필요가 없습니다. SlateGray 색상으로 지정해봅시다.

```js
body {
    background-color: #708090;
}
```

기억하세요, 우리는 placeholder 텍스트를 html.P() 태그로 감쌌습니다. 이를 스타일링하기 위해 모든 `p` 요소(즉, 텍스트)를 한꺼번에 스타일링할 수 있습니다. 클래스를 도입할 필요가 없으며, 서로 다른 스타일로 여러 html.P() 텍스트를 만들려면 각각 클래스를 생성해야 합니다. 우리의 텍스트를 흰색 Poppins 글꼴로 그리고 여백을 설정해봅시다. 모든 여백은 부모 컨테이너부터 측정됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
p {
    font-family: 'Poppins';
    color: #ffffff;
    margin-left: 30px;
    margin-top: 30px;
}
```

우리의 CSS 파일은 이제 다음과 같아야 합니다:

```js
body {
    background-color: #708090;
}

.dashboard-container {
    width: 1400px;
    height: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    background-color: #010103;
    border: 1px solid #cccccc;
    border-radius: 10px;
}

p {
    font-family: 'Poppins';
    color: #ffffff;
    margin-left: 30px;
    margin-top: 30px;
}
```

저장하고 앱으로 돌아가세요. 스타일이 자동으로 업데이트 되지 않으면 페이지를 새로 고침하세요. 우리 대시보드의 본문과 배경이 준비되었어요!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_2.png)

## 기본 스타일을 사용하는 방법 및 왜 설정해야 하는가?

부트스트랩에는 응용 프로그램이 시작될 때 설치할 수 있는 미리 디자인된 스타일이 있습니다. 모든 가능한 옵션에 대한 링크는이 페이지의 마지막 섹션에 나열되어 있습니다. 각 스타일 페이지는 적용 후 응용 프로그램의 모든 요소가 어떻게 보일지 보여줍니다.

기본 스타일을 설정하려면, 응용 프로그램을 시작할 때 대괄호 안에 명시합니다. 여기에서 Flatly 스타일로 지정한 것처럼요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
app = Dash(__name__, (external_stylesheets = [dbc.themes.FLATLY]));
```

기본 스타일을 설정하면 나만의 것을 만들 때 많은 시간을 절약할 수 있어요. 이는 사실 Bootstrap에서 생성된 미리 만들어진 사용자 정의 CSS 파일입니다. 응용 프로그램을 시작할 때 이를 설정하면 응용 프로그램의 요소들이 이 CSS 파일에 지정된 스타일과 연결됩니다.

그러나 응용 프로그램에는 여러 개의 CSS 파일이 있을 수 있어요! 기본 스타일을 설정하고 나서 자신만의 사용자 정의 CSS 파일을 자산 폴더에 추가하면 응용 프로그램은 계층 구조에 따라 두 가지 CSS 파일을 따라갑니다: 먼저 우리의 사용자 정의 파일에서 요소의 스타일을 찾은 다음 Bootstrap 파일에서 찾아요.

어떻게 작동하는지 보고 싶나요? 잠시 style.css를 style.txt로 저장해서, Dash가 그것을 "보지" 못하도록 해보세요. 어떻게 앱이 변하는지 확인해보세요. 이제 페이지가 "Flatly" 스타일로 디자인되었어요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

CSS 계층 구조를 알면 어떤 장점이 있을까요? 이를 알면 우리에게 가장 적합한 기본 스타일을 설정하고, 그 다음에는 완전히 새로운 스타일을 처음부터 만드는 대신 우리 자신의 CSS 파일에서 일부 요소를 맞춤 설정할 수 있습니다.

## 개별 대시보드 요소 스타일링

또한 앱에서 직접 각 개별 요소를 스타일링할 수 있습니다. 이 스타일은 사용자 정의 CSS와 Bootstrap CSS보다 우선순위가 높습니다. 예를 들어 대시보드의 색상을 흰색으로, 테두리 색상을 검정색으로, 텍스트 색상을 검정색으로 변경해 볼 수 있습니다. 이를 위해 새로운 색상을 포함하는 스타일 딕셔너리를 dbc.Container() 및 html.P() 안에 넣어주면 됩니다.

```js
app.layout = dbc.Container(
  html.P("내 멋진 대시보드가 여기에 있을 거예요.", (style = { color: "#010103" })),
  (fluid = True),
  (className = "dashboard-container"),
  (style = {
    "background-color": "#ffffff",
    "border-color": "#010103",
  })
);
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 대시보드 구성하기

그래서, 우리는 대시보드의 본문을 갖게 되었습니다. 이제 DIV 컨테이너를 겹쳐 놓기 시작합시다.

첫 번째 DIV 컨테이너의 층은 대시보드를 네비게이션 바와 콘텐츠(우리의 경우에는 그래프 및 출력)로 나눕니다.

![대시보드 구성](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_3.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

위 코드에서 placeholder 텍스트를 제거하고 대신 두 개의 DIV 컨테이너 목록을 넣어봅시다.

```js
app.layout = dbc.Container([html.Div(), html.Div()], (fluid = True), (className = "dashboard-container"));
```

이제 컨테이너의 매개변수를 명확히해 봅시다:

너비와 높이. 우리는 대시보드를 수평으로 나누었고, 기본적으로 자식 컨테이너의 높이는 부모의 100%가 됩니다. 각 컨테이너의 너비는 스타일 사전에서 픽셀로(“140px” 또는 단순히 140) 또는 부모 컨테이너의 너비의 백분율로(“10%”) 지정합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

들여쓰기입니다. 여백 크기도 픽셀로 지정하거나 컨테이너 크기의 백분율로 지정할 수 있습니다. 모든 변에 여백을 설정할 수 있습니다(margin: 25) 또는 특정 변에만 설정할 수 있습니다(margin-left: 25). 자식 컨테이너와 여백의 총 너비가 부모 컨테이너의 너비를 초과하지 않도록 주의하세요.

정렬입니다. 자식 컨테이너를 정렬하려면 부모 컨테이너의 스타일 사전에서 'display' 옵션을 사용합니다. 수평으로 정렬하려면 "flex"로 지정하고, 수직으로 정렬하려면 "block"으로 지정하세요.

```js
app.layout = dbc.Container(
  [
    html.Div(
      (style = {
        width: 340,
        "margin-left": 35,
        "margin-top": 35,
        "margin-bottom": 35,
      })
    ),
    html.Div(
      (style = {
        width: 990,
        "margin-top": 35,
        "margin-right": 35,
        "margin-bottom": 35,
      })
    ),
  ],
  (fluid = True),
  (style = { display: "flex" }),
  (className = "dashboard-container")
);
```

첫 번째 층의 자식 컨테이너가 생성되었습니다. 두 번째로 넘어가봅시다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_4.png)

왼쪽 "네비게이션" 컨테이너는 네 개의 부분으로 나뉩니다: 대시보드 제목 및 설명, 버튼 막대, 드롭다운 메뉴 막대 및 이미지입니다. 그래서 네 개의 빈 DIV 컨테이너 목록을 넣어봅시다.

대시보드의 오른쪽 부분은 그래프와 해당 출력으로 구성되어 있어서 두 개의 DIV 목록을 넣을 것입니다. 그래프와 출력 패널의 너비는 대략 80 대 20의 비율이 되어야 합니다. 부모 DIV의 display 매개변수를 "flex"로 설정하여 이를 가로로 정렬합니다.

```js
app.layout = dbc.Container(
  [
    html.Div(
      [html.Div(), html.Div(), html.Div(), html.Div()],
      (style = {
        width: 340,
        "margin-left": 35,
        "margin-top": 35,
        "margin-bottom": 35,
      })
    ),
    html.Div(
      [html.Div((style = { width: 790 })), html.Div((style = { width: 200 }))],
      (style = {
        width: 990,
        "margin-top": 35,
        "margin-right": 35,
        "margin-bottom": 35,
        display: "flex",
      })
    ),
  ],
  (fluid = True),
  (style = { display: "flex" }),
  (className = "dashboard-container")
);
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 텍스트 형식 지정

이 수준에서는 이미 대시보드에 콘텐츠를 채워 넣을 수 있습니다. 네비게이션 패널의 상단 컨테이너에는 대시보드 제목과 소개 텍스트가 있습니다. 대시보드에서 헤딩은 일반적으로 html.H1(), html.H2(), ... html.H6() 명령을 사용하여 지정되며, 이는 HTML의 `h1`, `h2`, ... `h6` 태그와 유사합니다.

대시보드에는 헤더와 하나의 종류의 서브헤더만 있는데, 공통 태그를 사용하고 클래스나 ID를 도입하지 않아도 됩니다.

헤더와 소개 텍스트를 상단 DIV 컨테이너에 html.H1() 및 html.P() 요소의 목록으로 넣으세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
html.Div([
  html.H1("Welcome to my beautiful dashboard!"),
  html.P("This dashboard prototype shows how to create an effective layout."),
]);
```

이제 CSS로 이동하여 주요 헤더인 h1에 스타일을 만들고, p에 대한 하나를 다음과 같이 수정하세요:

```js
h1 {
    font-family: "Poppins";
    color: #ffffff;
    font-size: 35px;
    margin: 15px;
}

p {
    font-family: "Poppins";
    color: #ffffff;
    font-size: 16px;
    margin: 15px;
    text-align: justify;
}
```

CSS를 저장한 후에도 제목이 어떻게 보이는지 개선하고 싶어졌고, 이제 앱 코드에서 직접 수정하겠습니다. 먼저, 텍스트 컨테이너 요소를 상단에 맞추기 위해 '수직 정렬' 매개변수를 설정합니다. 둘째, 대시보드 높이의 3분의 1 정도로 컨테이너의 높이를 수정하여 텍스트를 네비게이션에서 명확하게 분리합니다. 마지막으로 html.Span()과 html.Br()을 사용하여 "Welcome"을 새 줄에 두어 텍스트를 분리하겠습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

html.Div([
html.H1([
html.Span("환영합니다"),
html.Br(),
html.Span("내 멋진 대시보드로!")
]),
html.P("이 대시보드 프로토타입은 효과적인 레이아웃을 어떻게 만드는지 보여줍니다.")
],
style={
"vertical-alignment": "top",
"height": 260
})

저장하고 업데이트하세요. 이제 우리 대시보드는 이렇습니다:

<img src="/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_5.png" />

## 버튼 스타일링

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

저희 네비게이션 바의 두 번째 컨테이너에는 버튼이 포함되어 있습니다. 처음 두 개는 그룹 버튼이고 세 번째는 독립적인 버튼입니다. 이 컨테이너는 마지막 DIV 레이어에 속해 있어요.

![image](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_6.png)

따라서 이 컨테이너를 2:1의 비율로 나누되, CSS 파일에서 제목과 텍스트에 15px의 여백을 주었던 것을 기억하면, 버튼 패널에도 같은 여백을 유지하는 것이 좋아요. 그리고 "display"를 "flex"로 설정하여 두 자식 컨테이너를 일렬로 유지해 주세요.

```js
html.Div(
  [html.Div((style = { width: 206 })), html.Div((style = { width: 104 }))],
  (style = { "margin-left": 15, "margin-right": 15, display: "flex" })
);
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

두 개의 버튼 그룹은 RadioItems 요소입니다. 즉, 버튼처럼 스타일이 적용된 체크박스입니다. 이 요소에 대해 더 자세히 알아보려면 "RadioItems as ButtonGroup" 섹션을 확인해주세요.

우리는 미래 버튼을 dbc.RadioItems() 태그 아래의 왼쪽 컨테이너에 배치합니다. 내부에는 각 버튼의 라벨과 실제 값이 정의된 사전 목록인 options를 배치합니다. 또한 options 외에도 선택된 기본 옵션인 value를 배치합니다.

```js
html.Div(
  [
    html.Div(
      dbc.RadioItems(
        (options = [
          { label: "그래프", value: 1 },
          { label: "테이블", value: 2 },
        ]),
        (value = 1)
      ),
      (style = { width: 206 })
    ),
    html.Div((style = { width: 104 })),
  ],
  (style = {
    "margin-left": 15,
    "margin-right": 15,
    display: "flex",
  })
);
```

지금 앱을 업데이트하면 "그래프"와 "테이블"이라는 두 개의 전환 가능한 체크박스가 표시됩니다. 이것들을 버튼으로 바꿔야 합니다. 여기서 우리의 기본 스타일이 도움이 될 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Flatly 스타일 페이지를 확인해보세요. 버튼 섹션에서는 활성화된(active), 비활성화(disabled), 아웃라인(outline) 버튼을 볼 수 있어요. 'primary', 'secondary', 'danger'와 같은 이름들은 특정 색상을 나타냅니다. 저희 대시보드에서 'light' 버튼을 사용할 거에요: 버튼을 누르면 활성화된 'light' 버튼처럼 보이고, 그렇지 않을 때는 아웃라인 'light' 버튼처럼 보이게 할 거에요. 활성화된 버튼 행 위로 마우스 커서를 올리고 팝업 버튼을 클릭해보세요; 그러면 이 모든 버튼의 코드와 클래스를 포함한 창이 나타날 거에요. 우리 버튼은 "btn btn-light" 클래스를 가지고 있어요. 아웃라인 버튼 행에서는, 우리가 관심을 갖는 버튼 클래스가 "btn btn-outline-light"입니다. 우리는 지금 이 두 클래스를 사용할 거에요.

이제 코드로 돌아가서 체크박스를 이 버튼들로 변환해보겠어요. 이를 위해 dbc.RadioItems() 내부에 여러 클래스를 지정해야 해요:

- className "btn-group"은 우리 버튼 그룹을 가로로 정렬할 거에요.
- inputClassName "btn-check"은 체크박스를 "숨길" 거에요.
- labelClassName "btn btn-outline-light"는 선택되지 않은 체크박스의 텍스트를 Flatly 아웃라인 버튼으로 보이게 할 거에요.
- labelCheckedClassName "btn btn-light"는 선택된 체크박스의 텍스트를 Flatly 활성화된 버튼으로 보이게 할 거에요.

```js
html.Div(
  [
    html.Div(
      dbc.RadioItems(
        (className = "btn-group"),
        (inputClassName = "btn-check"),
        (labelClassName = "btn btn-outline-light"),
        (labelCheckedClassName = "btn btn-light"),
        (options = [
          { label: "Graph", value: 1 },
          { label: "Table", value: 2 },
        ]),
        (value = 1)
      ),
      (style = { width: 206 })
    ),
    html.Div((style = { width: 104 })),
  ],
  (style = {
    "margin-left": 15,
    "margin-right": 15,
    display: "flex",
  })
);
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

모든 이 클래스들의 외관은 이미 우리의 부트스트랩 CSS 파일에 설정되어 있습니다. 앱을 업데이트하고 체크박스가 버튼으로 변환되었는지 확인하세요. 원하는 대로 이미 가까이 왔습니다; 조금 수정이 필요합니다. 특히, 버튼이 부모 컨테이너의 전체 영역을 차지하도록 만들고, 선택되지 않은 버튼에서 외곽선을 제거하며, 버튼에 마우스를 올렸을 때 버튼이 가벼워지게 만들고, Poppins 글꼴로 바꾸려고 합니다.

우리는 우리의 사용자 정의 CSS 파일을 사용하여 부트스트랩 Flatly 버튼 매개변수를 다시 작성하여 이 모든 것을 수행할 것입니다. CSS 스타일링의 자세한 분석은 이 튜토리얼의 범위를 벗어나므로 이 코드 조각을 CSS 파일에 넣고 저장하세요:

```js
/* 라디오 버튼 */

.form-check {
    width: 100%;
    height: 38px;
    margin: 1px;
    padding-left: 0;
}

.btn.btn-outline-light,
.btn.btn-light {
    width: 100%;
    height: 100%;
    padding: 6px;
    font-family: "Poppins";
    border-radius: 3px;
}

.btn.btn-outline-light {
    border: 1px solid transparent;
}

.btn.btn-outline-light:hover {
    color: #010103;
    background-color: color-mix(in srgb, var(--bs-light), #010103 7%);
}
```

이제 세 번째 버튼으로 넘어가 봅시다. 여기서는 보이지 않는 체크박스가 아니기 때문에 매우 간단합니다. 두 번째 컨테이너에 `dbc.Button()` 태그를 넣고, 버튼 라벨("About"), 클릭 수 및 클래스 이름을 지정하세요. 세 번째 버튼은 다른 두 버튼과 색상이 다르게 표시되기를 원합니다. 그래서 그 버튼의 클래스를 "btn btn-info"로 설정하여 Flatly 활성 '정보' 버튼처럼 보이도록 만들겠습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
html.Div(
  [
    html.Div(
      dbc.RadioItems(
        (className = "btn-group"),
        (inputClassName = "btn-check"),
        (labelClassName = "btn btn-outline-light"),
        (labelCheckedClassName = "btn btn-light"),
        (options = [
          { label: "Graph", value: 1 },
          { label: "Table", value: 2 },
        ]),
        (value = 1)
      ),
      (style = { width: 206 })
    ),
    html.Div(dbc.Button("About", (className = "btn btn-info"), (n_clicks = 0)), (style = { width: 104 })),
  ],
  (style = {
    "margin-left": 15,
    "margin-right": 15,
    display: "flex",
  })
);
```

이제 이 추가적인 버튼 스타일을 사용자 정의 CSS 스타일로 변경하고 앱을 업데이트하세요:

```js
/* Single button */

.btn.btn-info {
    width: 100%;
    height: 38px;
    margin: 1px;
    padding: 6px;
    font-family: "Poppins";
    border-radius: 3px;
    background-color: transparent;
    border: 1px solid transparent;
}

.btn.btn-info:active,
.btn.btn-info:focus {
    background-color: var(--bs-info);
}

.btn.btn-info:hover {
    background-color: color-mix(in srgb, var(--bs-info), #010103 7%);
}
```

우리의 버튼 패널이 준비되었습니다!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_7.png)

## 드롭다운 스타일링

다음 컨테이너는 세 개의 드롭다운이 아래로 배치된 그룹입니다. 그래서 그 안에 세 개의 빈 DIV 컨테이너 목록을 넣어 보겠습니다. 또한 부모 컨테이너의 왼쪽과 오른쪽 여백을 다시 15px로 설정하고 위쪽으로는 버튼들과 구분하기 위해 30px 여백을 두겠습니다.

```js
html.Div(
  [html.Div(), html.Div(), html.Div()],
  (style = {
    "margin-left": 15,
    "margin-right": 15,
    "margin-top": 30,
  })
);
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

부트스트랩 컴포넌트를 사용하여 버튼이나 드롭다운을 만들 수 있지만, 많은 옵션을 선택해야 하거나 기본 옵션을 표시해야 하는 경우에는 (우리의 경우처럼) Dash Core Components (DCC)를 사용하는 것이 더 편리합니다. dcc dropdown에 대해 더 자세히 알아보세요.

우리의 경우 각 드롭다운 DIV 컨테이너에는 서브헤더와 드롭다운이 포함되어 있습니다. 서브헤더는 html.H2() 태그로 감싸고 그 뒤에 dcc.Dropdown()을 배치하세요:

```js
html.Div(
  [
    html.Div([html.H2("선택 불가 드롭다운:"), dcc.Dropdown()]),
    html.Div([html.H2("선택 불가 드롭다운:"), dcc.Dropdown()]),
    html.Div([html.H2("선택 가능 드롭다운:"), dcc.Dropdown()]),
  ],
  (style = {
    "margin-left": 15,
    "margin-right": 15,
    "margin-top": 30,
  })
);
```

먼저 서브헤더를 스타일링해 보겠습니다. CSS 파일에 다음 스타일을 h2 태그에 적용하세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
h2 {
    margin-bottom: 0px;
    margin-top: 10px;
    font-family: "Poppins";
    font-size: 14px !important;
    color: #ffffff;
}
```

이제 드롭다운을 채워보겠습니다. 라디오 버튼과 유사하게, 드롭다운에는 옵션 사전과 기본 선택값이 있습니다. 또한 드롭다운을 clearable 또는 non-clearable(그럼 우리에게 예를 들어 "선택..."과 같은 플레이스홀더를 보여주며 기본값이 필요 없게 됩니다.)로 설정하여 clearable 매개변수를 각각 False 또는 True로 설정하여 만들 수 있습니다. 또 다른 유용한 매개변수는 optionHeight로, 드롭다운 메뉴 옵션의 높이를 설정합니다.

```js
html.Div(
  [
    html.Div([
      html.H2("선택 불가능한 드롭다운:"),
      dcc.Dropdown(
        (options = [
          { label: "옵션 A", value: 1 },
          { label: "옵션 B", value: 2 },
          { label: "옵션 C", value: 3 },
        ]),
        (value = 1),
        (clearable = False),
        (optionHeight = 40)
      ),
    ]),
    html.Div([
      html.H2("선택 불가능한 드롭다운:"),
      dcc.Dropdown(
        (options = [
          { label: "옵션 A", value: 1 },
          { label: "옵션 B", value: 2 },
          { label: "옵션 C", value: 3 },
        ]),
        (value = 2),
        (clearable = False),
        (optionHeight = 40)
      ),
    ]),
    html.Div([
      html.H2("선택 가능한 드롭다운:"),
      dcc.Dropdown(
        (options = [
          { label: "옵션 A", value: 1 },
          { label: "옵션 B", value: 2 },
          { label: "옵션 C", value: 3 },
        ]),
        (clearable = True),
        (optionHeight = 40)
      ),
    ]),
  ],
  (style = {
    "margin-left": 15,
    "margin-right": 15,
    "margin-top": 30,
  })
);
```

이제 앱을 업데이트하세요. 이미 매우 멋져 보이지만, 아직도 드롭다운을 다크 모드로 디자인하고 싶습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

그래서, 각 dcc.Dropdown()에 className="customDropdown"을 추가하고 CSS 파일로 이동합시다. DCC 요소를 스타일링하는 것은 Bootstrap 요소를 스타일링하는 것보다 복잡합니다. 왜냐하면 우리에게 고정된 요소 스타일이 없기 때문에 모든 것은 사용자 정의 CSS에서 지정되어야 합니다. 그래서 이 코드를 CSS 파일에 추가하고 저장하세요.

```js
/* Dropdowns */

.customDropdown {
    font-size: 16px;
    font-family: "Poppins";
    padding-left: 1px;
}

.customDropdown .Select-control {
    width: 100%;
    height: 38px;
    background-color: transparent;
    border: 1px solid #676768;
    border-radius: 3px;
    color: var(--bs-info) !important;
}

.customDropdown .Select-value-label,
.customDropdown .Select-placeholder {
    color: var(--bs-info) !important;
}

.customDropdown .Select-arrow {
    border-color: #cccccc transparent transparent;
}

.customDropdown.is-open .Select-arrow {
    border-color: transparent transparent #cccccc;
}

.customDropdown .Select-clear {
    color: var(--bs-info);
    font-size: 22px;
}

.customDropdown.is-focused:not(.is-open) > .Select-control {
    border: 2px solid color-mix(in srgb, var(--bs-info), #010103 50%) !important;
}

.customDropdown.is-focused:not(.is-open) .Select-arrow {
    border-color: var(--bs-info) transparent transparent;
}

.customDropdown .Select-menu-outer {
    margin-top: 5px;
    border-radius: 3px;
    background-color: #010103;
    border: 1px solid #676768;
    color: var(--bs-light);
}

.customDropdown .VirtualizedSelectFocusedOption {
    background-color: color-mix(in srgb, var(--bs-light), #010103 7%);
    border-radius: 3px;
    color: #010103;
}
```

저장하고 결과를 확인해봅시다. 이제 애플리케이션이 다음과 같이 보여져야 합니다:

<img src="/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_8.png" />

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 이미지 추가하기

이 부분은 매우 간단합니다: Dash에서 이미지를 추가하는 것은 다른 HTML 요소처럼 html.Img() 명령을 사용하면 됩니다. 이 명령은 해당 `img` 태그를 복제합니다. 안에는 이미지 링크와 이미지의 너비, 높이, 여백을 정의할 수 있는 스타일 딕셔너리가 들어갑니다.

```js
html.Div(
  html.Img(
    (src = "assets/image.svg"),
    (style = {
      "margin-left": 15,
      "margin-right": 15,
      "margin-top": 30,
      width: 310,
    })
  )
);
```

저는 미리 assets 폴더에 두었던 이미지를 사용했습니다. 이 명령줄에서 명령 바 아래에 이미지가 나타났습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_9.png)

## 그래프 추가

대시보드의 주요 공간은 그래프로 채워지므로 한 개를 만들어 봅시다. 먼저 우리의 import 목록에 아래 패키지들을 추가해주세요:

```python
import plotly.graph_objects as go
import numpy as np
import random
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

자, 이제 표준 분포에서 무작위 샘플을 사용하여 산점도를 만들어 봅시다:

```js
fig = go.Figure(
  go.Scattergl(
    (x = np.random.randn(1000)),
    (y = np.random.randn(1000)),
    (mode = "markers"),
    (marker = dict((color = random.sample(["#ecf0f1"] * 500 + ["#3498db"] * 500, 1000)), (line_width = 1)))
  )
);

fig.update_layout(
  (plot_bgcolor = "#010103"),
  (width = 790),
  (height = 730),
  (xaxis_visible = False),
  (yaxis_visible = False),
  (showlegend = False),
  (margin = dict((l = 0), (r = 0), (t = 0), (b = 0)))
);
```

여기서 중요한 점은 레이아웃 바깥에서 그래프를 생성해야 합니다. 레이아웃에서는 완성된 시각화만을 호출합니다. 따라서 차트 코드를 레이아웃 코드 앞에 배치합니다.

레이아웃에서는 그래프를 dсс.Graph() 명령으로 호출합니다. 그래프 데이터를 figure 변수에 전달합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
html.Div(dcc.Graph((figure = fig)), (style = { width: 790 }));
```

차트의 팝업 내비게이션 바가 싫어요. 아래 CSS 파일을 사용하여 제거할 수 있어요:

```js
.modebar { display: none !important; }
```

우리 대시보드 레이아웃이 거의 준비되었어요!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![image](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_10.png)

## 그래프 출력 섹션 추가

대시보드의 마지막 부분은 차트의 출력 섹션입니다. 기본적으로 이러한 출력 섹션은 사용자 동작에 따라 변하는 `p` 요소를 포함한 동일한 DIV 컨테이너들입니다. 그래프 오른쪽에 이러한 출력 컨테이너들을 두 개 생성해 봅시다.

두 개의 출력 필드를 생성하려면 간단히 마지막 빈 DIV 컨테이너에 두 가지 텍스트 요소와 두 개의 DIV를 배치하면 됩니다. 이미 subheading에 스타일이 적용되어 있으므로 해당 요소들을 html.H2() 명령어로 감싸기만 하면 됩니다. 또한 출력 필드 중 하나에는 값을 채우고 나머지는 비워 둡시다. 여전히 무료인 `h3` 텍스트 태그를 사용하여 출력을 스타일링하겠습니다. 두 번째 컨테이너 내부에 html.H3(“Selected Value”) 요소를 배치합니다. 출력 DIV 필드 자체에 스타일을 적용하려면 클래스를 도입해야 합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
html.Div(
  [
    html.H2("Output 1:"),
    html.Div((className = "Output")),
    html.H2("Output 2:"),
    html.Div(html.H3("Selected Value"), (className = "Output")),
  ],
  (style = { width: 200 })
);
```

이제 CSS 파일에서 .Output 클래스와 h3 태그에 스타일을 할당하겠습니다:

```js
.Output {
    width: 150px;
    height: 38px;
    background-color: rgba(204,204,204,0.1);
    border: 1px solid rgba(204,204,204,0.1);
    border-radius: 3px;
}

.Output:empty::before {
  content:"";
  display:inline-block;
}

h3 {
    font-size: 16px;
    line-height: 34px;
    padding-left: 7px;
    font-family: "Poppins";
    color: var(--bs-info);
}
```

자, 모두 끝났어요! 대시보드를 위한 모든 레이아웃 요소들이 개발되었습니다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-09-HowtocreateabeautifulinteractivedashboardlayoutinPythonwithPlotlyDash_11.png)

우리는 그래프와 모든 탐색 요소가 포함된 레이아웃을 완성했으므로 Plotly Dash에서 대시보드를 만드는 첫 번째 단계를 완료했습니다. 다음 단계는 상호 작용이 가능하게 만드는 것인데, 이 단계에서 이전에 생성한 모든 탐색 요소들을 "작동"시킬 것입니다. 세 번째는 일반 사용자가 이용할 수 있는 실시간 웹 애플리케이션을 배포하는 것입니다.

Dash 앱 개발의 첫 번째 단계에서 도움이 될 수 있는 것은 무엇인가요?

- Dribble의 웹 디자인 섹션에는 영감을 얻을 수 있는 많은 아름답고 기능적인 레이아웃이 있습니다.
- 준비된 CSS 솔루션을 공부하는 것. CodePen을 확인할 수 있지만, 대부분의 "어떻게 할 수 있는가"라는 질문에 대한 대답은 Stackoverflow나 Google에서 간단한 검색으로 찾을 수 있습니다.
- Dash 문서를 주의 깊게 읽고 사이트를 검색하는 것. 각 Dash 요소의 설명은 항상 코드 예제와 변경할 수 있는 속성 목록이 함께 제공됩니다.
- Plotly 커뮤니티 포럼. 커뮤니티 회원들은 이미 발생한 대부분의 문제를 해결하려고 노력했습니다. 그들은 자주 코드 조각을 게시하고 토론하며, 이러한 토론 중에서 종종 준비된 솔루션을 찾을 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

즐거운 앱 개발 되세요!
