---
title: "Power BI 보고서에 HTML, CSS를 활용하기"
description: ""
coverImage: "/assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_0.png"
date: 2024-05-01 22:51
ogImage: 
  url: /assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_0.png
tag: Tech
originalTitle: "Elevating Power BI Reports with HTML , CSS: Joining Forces 💪"
link: "https://medium.com/microsoft-power-bi/elevating-power-bi-reports-with-html-css-joining-forces-f90fbd654e8b"
---


<img src="/assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_0.png" />

🎁 이 기사 끝에 PBIX 파일을 다운로드할 수 있습니다!

## 소개

HTML(HyperText Markup Language)은 웹 페이지를 만들고 디자인하는 데 사용되는 표준 프로그래밍 언어입니다. CSS(Cascading Style Sheets)와 결합되어 광범위한 스타일링 및 레이아웃 조정이 가능하며, 이 두 언어는 거의 모든 종류의 웹 인터페이스 디자인을 가능하게 합니다.

<div class="content-ad"></div>

HTML/CSS 전문가는 아니지만, Power BI 보고서의 일부에 점점 HTML/CSS를 활용하여 사용자 정의 모양, 아이콘 등을 통해 시각적 매력을 높이고 있어요. 이를 통해 보고서에서 사용된 도형과 측정 항목의 수를 줄이거나 간단하게 만들 수도 있어요. 이전 기사에서 공유된 PBIX 파일을 보신 분들 중 많이 알고 계실 것 같은데요, 저는 주로 Power BI의 기능과 HTML/CSS의 다양성을 효과적으로 결합할 수 있는 HTML Content 비주얼을 활용하곤 해요 💪.

지난 글 "매력적인 Power BI 보고서 디자인하는 방법"에서는 FP20 Analytics Challenge인 Data-Driven Education Management을 위해 작성한 보고서에서 이 대회를 위해 사용한 HTML 내용 비주얼을 간단하게 소개할 거에요 (Power BI 보고서는 아직 진행 중이고 😅— 대회 마감일은 2월 15일 ⏰).

## HTML 내용 비주얼에 액세스하는 방법

HTML 내용 비주얼은 Power BI의 표준 시각화 도구가 아니에요. 보고서에 추가하려면 다음 단계를 따라 가져와야 해요:

<div class="content-ad"></div>

- Power BI의 시각화 패널에서 "Get more visuals" 세 개의 점(...)을 클릭합니다.
- HTML Content 시각화를 선택합니다. 빠르게 찾으려면 오른쪽에 있는 검색 바를 사용하세요.
- Power BI 보고서에 HTML Content Visual을 가져오려면 "Add"를 클릭합니다.

![이미지](/assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_1.png)

## Power BI에서 HTML Content Visual 사용하기

Power BI에서 HTML 콘텐츠 시각화를 사용하려면 시각화를 보고서에 추가하고 HTML 코드를 포함하는 측정 항목이나 필드를 사용하면 됩니다. HTML 코드는 항상 측정 항목이나 필드에서 따옴표(" ")로 둘러싸여 있어야 합니다.

<div class="content-ad"></div>

HTML 콘텐츠 비주얼에 감사드리는 점은 DAX와 HTML의 기능을 결합하여 시각화를 최대한 활용할 수 있는 측정치를 만들 수 있는 점입니다. 몇 가지 예시를 통해 더욱 명확해질 것입니다.

이 시각화 도구에 대한 문서를 확인하실 수 있습니다.

HTML에 대해 간단히 알아보기...

HTML은 웹 브라우저에 콘텐츠를 표시하는 방법을 지시하는 일련의 요소나 태그로 구성됩니다. 예를 들어, 텍스트는 다양한 태그로 둘러싸여 있어야 하는데, 이는 문단으로 표시할지, 제목으로 표시할지, 아니면 목록 항목으로 표시할지를 나타내는 것입니다. HTML 태그는 일반적으로 `p`로 시작하는 문단과 `/p`로 끝나는 것과 같이 짝을 이룹니다. 이러한 태그 내의 속성은 스타일, 링크 또는 기타 속성을 더 자세히 정의할 수 있습니다.

<div class="content-ad"></div>

HTML의 기본 이해가 내 프로그래밍 여정 전체에 많은 도움이 되었다는 것을 발견했어요. 저는 프로젝트를 통해 가장 잘 배우는 편이에요. 그래서 HTML을 사용하는 방법을 시작할 때 도움이 되도록 몇 가지 간단한 예제를 다음 섹션에서 보여드릴 거에요. 그러나 강의를 통해 학습하는 것을 선호한다면, Codecademy의 HTML 강의를 권해드립니다. 몇 년 전에 CSS 강의와 함께 수강한 적이 있어요. 각 강의의 수강 시간은 약 6시간이고, 제게 견고한 기반이 마련되도록 도와주었어요 (제 생각에요 😅).

## 1. 텍스트 스타일링

텍스트의 일부를 이탤릭체로 만드는 방법을 찾다가 HTML을 발견했어요. HTML에서 텍스트를 스타일링하는 일반적인 방법 몇 가지를 보여드릴게요:

- `i`와 `/i`는 텍스트를 이탤릭체로 만들어요.
- `b`와 `/b`는 텍스트를 굵게 만들어요.
- `br`은 줄 바꿈을 추가해요.
- `u`와 `/u`는 텍스트에 밑줄을 긋어요.
- `span style="color:#FF5733;"`와 `/span`은 텍스트 색상을 바꿀 수 있어요.
- `div style="font-family:`Arial`;"`와 `/div`은 글꼴을 바꿀 수 있어요.

<div class="content-ad"></div>

이 HTML 태그들을 조치나 필드에 직접 통합하여 보고서 내에서 텍스트 모양을 동적으로 수정할 수 있습니다. 이 기능은 주요 지표를 강조하거나 특정 부분을 강조하거나 보고서를 더 멋지게 만드는 데 특히 유용합니다 😎.

제 보고서에서는 HTML 콘텐츠 비주얼을 사용하여 이러한 텍스트 상자들을 스타일링했어요:

![HTML Content Visual](/assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_2.png)

여기 Average Score KPI 아래 "지난 학기/작년" 텍스트를 표시하기 위해 만든 DAX 측정값이 있어요:

<div class="content-ad"></div>

```js
시각화 마지막 학기/작년 평균 점수 = 
"지난 학기: " & "<b>" & FORMAT([작년 학기 평균 점수], "0.0") & "</b><br>" &
"작년: " & "<b>" & FORMAT([작년 평균 점수], "0.0") & "</b>"
```

이 측정값에서는 강조하려는 텍스트를 `b`와 `/b` 태그 사이에 넣어 텍스트를 굵게 표시했습니다. 새 줄로 이동하기 위해 `br` 태그를 사용했습니다. 모든 HTML 태그는 인용 부호 안에 포함되어야 합니다. DAX 측정값에서 두 개 이상의 HTML 태그를 연달아 사용해야 할 때(`/b``br`와 같이), 같은 인용 부호 내에 함께 넣을 수 있습니다.

## 2. 모양 생성하기

HTML과 CSS는 Power BI 보고서 내에서 직접 사용자 지정 모양을 생성하는 강력한 도구 상자를 제공합니다.

<div class="content-ad"></div>

보고서에서는 전 학기와 작년을 보여주는 KPI의 변화를 나타내기 위해 다음과 같은 배경 타원 모양을 생성했습니다.

![배경 타원 모양](/assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_3.png)

파워 BI의 기본 타원 모양 대신 HTML을 사용하여이 모양을 만들기로 결정했는데, 다음 섹션에서 살펴볼 HTML 아이콘을 포함하고 싶었기 때문입니다. 게다가, 이 타원은 상당히 작아야 했고, 파워 BI 모양을 사용하면 텍스트를 추가하고 완전히 보이게하기가 어려웠습니다.

이를 위해 'Oval Set Up'이라는 DAX 측정 항목을 생성하여 시작했습니다:

<div class="content-ad"></div>

```js
Oval Set Up = "<head>
<meta name=""viewport"" content=""width=device-width, initial-scale=1"">
<style>
.oval {
  height: 18px;
  width: 48px;
  background-color: BACKGROUND_COLOR ;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: {FONT_COLOR} ;
  font-size: 10px;
}
</style>
<body>
<div class=""oval"">
    <span>&nbsp;TEXT</span>
</div>
</body>
"
```

위 코드는 원형 모양의 외관과 레이아웃을 정의하기 위해 HTML 및 CSS를 사용하며, 사용자 정의 가능한 요소를 위해 중괄호({}) 안에 플레이스홀더를 사용합니다. 각 부분의 역할은 다음과 같습니다:

- HTML 구조: `head` 섹션에는 다양한 디바이스에서 적절한 확대/축소가 이루어지도록 하는 `meta` 태그가 포함되어 있습니다. width=device-width, initial-scale=1은 콘텐츠가 반응형으로 스케일링되도록 설정합니다. `head` 내의 `style` 섹션은 원형 모양을 위한 CSS 스타일을 정의합니다.
- CSS 스타일링 (oval 클래스):

  - height: 18px; 및 width: 48px;는 원형의 크기를 설정합니다.
  - background-color: BACKGROUND_COLOR;는 원형의 채우기 색상을 지정하는데, BACKGROUND_COLOR는 색상 값을 나타내는 플레이스홀더입니다.
  - border-radius: 25px;는 원형의 모양을 둥근 타원형으로 정의하며, 코너가 얼마나 둥글게 보여야 하는지를 결정합니다.
  - display: flex; align-items: center; justify-content: center;는 원형 내의 텍스트(또는 콘텐츠)를 세로 및 가로 중앙 정렬합니다.
  - color: FONT_COLOR;는 원형 내 텍스트의 색상을 설정하는데, FONT_COLOR는 텍스트 색상을 위한 플레이스홀더입니다.
  - font-size: 10px;은 원형 내의 텍스트 크기를 지정합니다.

<div class="content-ad"></div>

3. HTML 본문과 콘텐츠:

- `body`에는 "oval" 클래스가 적용된 `div` 요소가 포함되어 있으며, 이 div에 이전에 정의한 CSS 스타일이 적용됩니다.
- 이 div 내에 `span` 요소가 있고, TEXT라는 텍스트를 내부에 표시하고자 하는 플레이스홀더가 들어 있습니다. &nbsp; (간격을 유지하는 고정 간격 문자)는 텍스트가 원 안에서 올바르게 간격을 유지하도록 합니다.

다음 조치는 첫 번째 타원 모양(지난 학기의 차이를 보여줌)을 표시하기 위해 플레이스홀더를 DAX에 정의된 값으로 대체하고, 해당 값을 HTML/CSS 코드로 대체하는 것을 보여줍니다:

<img src="/assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_4.png" />

<div class="content-ad"></div>

```js
형식화된 지난 학기 평균 점수 변동 = 
VAR _Variation = FORMAT(ABS([지난 학기 평균 점수 % 변동]), "0.0%")
VAR _BackgroundColor = 
    IF(
        [지난 학기 평균 점수 변동]<0,
        [Color Light Red],
        [Color Light Green]
    )
VAR _FontColor = 
    IF(
            [지난 학기 평균 점수 변동]<0,
            [Color Red],
            [Color Green]
        )
VAR _Text = 
    IF(
            [지난 학기 평균 점수 변동]<0,
            [아이콘 빨간 삼각형 아래] &  _Variation,
            [아이콘 초록 삼각형 위] &  _Variation
        )
VAR _Shape = 
SUBSTITUTE(
    SUBSTITUTE(
        SUBSTITUTE(
            [Oval 설정],
            "{배경_색상}",
            _BackgroundColor
        ),
        "{글꼴_색상}",
        _FontColor
    ),
    "{텍스트}",
    _Text
)
RETURN IF([지난 학기평균 점수] <> 빈칸(), _Shape) 
```

지난 학기에 이루어지는 측정 항목은 다음과 같습니다:

```bash
- _변동 계산: 이 측정 값은 FORMAT(ABS([지난 학기 평균 점수 % 변동]), "0.0%")을 사용하여, 지난 학기 평균 점수의 절대 백분율 변동을 계산합니다.
- 배경 색상 설정: 평균 점수 변동이 음수(하락)인지 양수(상승)인지에 따라 배경 색상을 결정합니다. 변동이 음수인 경우, 연한 빨간색 ([Color Light Red])을 사용하고, 양수인 경우, 연한 초록색 ([Color Light Green])을 사용합니다.
- 글꼴 색상 선택: 배경 색상과 마찬가지로 점수 변동에 따라 글꼴 색상을 선택합니다. 어두운 빨간색 ([Color Red])은 감소를 나타내고, 녹색 ([Color Green])은 증가를 나타냅니다.
- 텍스트와 아이콘 구성: 측정 항목은 표시될 텍스트를 구성하여, 아이콘과 변동 백분율을 결합합니다. 점수가 감소한 경우, 빨간 아래쪽 화살표 아이콘을 변동에 앞서 놓고 ([아이콘 빨간 삼각형 아래] & _Variation), 증가한 경우 초록 위쪽 화살표 아이콘을 사용합니다 ([아이콘 초록 삼각형 위] & _Variation).
- HTML을 사용한 모양 사용자 정의: [Oval 설정]에서 HTML 설정을 이용하여, 배경 색상, 글꼴 색상 및 텍스트를 결정된 값(_BackgroundColor, _FontColor, _Text)으로 대체합니다. 이 단계를 통해, HTML/CSS로 디자인된 타원 모양의 모양을 현재 데이터 컨텍스트에 맞게 사용자 정의하고, 색상으로 표시되어 적절한 아이콘과 백분율 변화로 레이블이 붙습니다.
- 조건부 렌더링: 마지막으로, 측정값은 지난 학기에 유효한 평균 점수가 있는 경우에만 사용자 정의된 HTML/CSS 타원 모양을 출력합니다 (IF([지난 학기평균 점수] <> 빈칸(), _Shape)). 이는 데이터가 제공될 때만 시각화가 나타나도록 보장합니다(데이터 모델에는 몇 개월만 포함되어 있기 때문입니다).
```

## 3. 온라인에서 찾은 아이콘 통합

<div class="content-ad"></div>

파워 BI 보고서에 이미지로 아이콘을 로드하는 대신 HTML로 표시하면 더 깔끔해 보입니다. 비즈니스 규칙에 따라 적용할 수 있는 다양한 사용자 정의 옵션이 있습니다(예: 아이콘 크기를 더 작게하거나 크게 만들기, 색상 변경, 회전 등).

저는 현대적인 외관 때문에 'Font Awesome' 아이콘 라이브러리를 선호합니다. 지금까지 무료 아이콘만 사용해 왔지만, 좀 더 화려하고 트렌디한 것에 접속하려면 멤버십 옵션이 있습니다.

내 보고서에는 Font Awesome 아이콘 라이브러리를 활용하여 위쪽과 아래쪽 화살표 아이콘을 추가했습니다.

<img src="/assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_5.png" />

<div class="content-ad"></div>

가끔 이 라이브러리에서 여러 아이콘을 사용하기 때문에, 타원 모양과 같은 아이콘들을 사용하는 경우가 많습니다. 먼저 DAX 측정값을 설정하여, 그 중 일부를 대체합니다.

```js
아이콘 Font awesome 아이콘 설정 = "
<head>
    <meta name=""viewport"" content=""width=device-width, initial-scale=1"">
    <link rel=""stylesheet"" href=""https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css""/>
</head>
<i style=""color:COLOR"" class=""ICON_CODE SIZE"">
</i>
&nbsp;"
```

이 측정값이 달성하는 것은 다음과 같습니다:

- 반응형 디자인 설정: 'head' 섹션의 'meta' 태그는 화면 너비와 콘텐츠의 크기를 조절하여 다양한 디바이스에서 올바르게 표시될 수 있도록 하기 위해 뷰포트를 설정합니다. 이는 데스크톱, 태블릿 또는 스마트폰에서 아이콘을 볼 때 잘 보일 것을 의미합니다.
- Font Awesome 아이콘 접근: 'link' 태그는 CDN (콘텐츠 전송 네트워크)에서 Font Awesome 스타일시트를 가져옵니다. 이 스타일시트는 모든 Font Awesome 아이콘에 대한 스타일을 제공하여, 해당하는 특정 클래스 이름을 사용하여 보고서에서 사용할 수 있게 합니다.
- 아이콘 표시 및 사용자 지정: 'i' 태그를 사용하여 HTML 콘텐츠에 아이콘을 삽입합니다. 'class' 속성은 ICON_CODE (Font Awesome의 특정 클래스 이름의 플레이스홀더)와 SIZE(크기를 나타내는 플레이스홀더, 크기 조절 메타데이터를 사용하며, 예를 들어 'fa-lg'는 큰 크기입니다)를 사용하여 표시할 아이콘을 지정합니다. 'style' 속성은 원하는 색상 코드로 대체될 COLOR를 사용하여 아이콘의 색상을 설정하는 데 사용됩니다.
- 공간 관리: 끝에 있는 '&nbsp;'(간격을 유지하는 비중단 공백) 문자는 아이콘 뒤에 텍스트나 다른 요소가 따라오는 경우 적절한 간격을 유지하기 위해 사용됩니다. 이는 보고서에서 아이콘 다음에 텍스트나 다른 요소가 있을 경우 올바른 간격을 유지하는 데 유용합니다.

<div class="content-ad"></div>

실제 값으로 COLOR, ICON_CODE, 및 SIZE 자리 표시자를 대체함으로써, 이 방법을 사용하면 커스텀 아이콘을 Power BI 보고서에 동적으로 삽입할 수 있습니다.

그런 다음, Green Arrow Up과 같은 측정 항목에서 플레이스홀더 값을 대체하여 화살표 아이콘을 만듭니다:

![Green Arrow Up Image](/assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_6.png)

```js
Color Green = "#2C6D6A"

Icon green arrow up = 
SUBSTITUTE(
        SUBSTITUTE(
            SUBSTITUTE(
                [Icon Font awesome icon set up],
                "ICON_CODE",
                "fa-solid fa-arrow-trend-up"
                ), 
            "SIZE", 
            "fa-md"
        ),
        "COLOR",
        [Color Green]
    )
```

<div class="content-ad"></div>

아이콘 녹색 화살표 측정치가 이루어내는 것은 다음과 같습니다:

- 기본 템플릿: [아이콘 폰트 어썸 아이콘 설정]으로 시작합니다. 이는 HTML 코드를 포함한 구조화된 미리 정의된 템플릿으로 구성되어 있습니다. 이 템플릿에는 아이콘의 코드(ICON_CODE), 크기(SIZE), 색상(COLOR)을 포함할 수 있는 장소 표시자가 있습니다.
- 첫 번째 치환 — ICON_CODE: 첫 번째 SUBSTITUTE 함수는 ICON_CODE 플레이스홀더를 "fa-solid fa-arrow-trend-up"으로 대체합니다. 이는 폰트 어썸 라이브러리에서 솔리드한 상승 화살표 아이콘의 사용을 지정합니다. 이 아이콘은 일반적으로 증가한 KPI 또는 지표에서 시각적으로 긍정적인 성장 또는 개선을 나타내는 데 사용됩니다.
- 두 번째 치환 — SIZE: 다음 SUBSTITUTE 함수는 SIZE 플레이스홀더를 "fa-md"로 대체하여 아이콘의 크기를 중간으로 설정합니다. Font Awesome는 다양한 크기 클래스(fa-xs, fa-sm, fa-md, fa-lg, fa-xl, fa-2x부터 fa-10x)를 사용하여 아이콘을 손쉽게 크기 조절할 수 있도록 합니다. fa-md를 선택함으로써 아이콘이 너무 작거나 너무 크지 않게 조절하여 사용되는 맥락 내에서 시각적으로 균형을 맞추게 됩니다.
- 세 번째 치환 — COLOR: 마지막 SUBSTITUTE 함수는 COLOR 플레이스홀더를 [초록색]로 대체합니다. 이 측정치의 이 부분은 아이콘의 색상을 사용자 정의하며, 사전 정의된 변수나 측정치 [초록색]을 사용하여 사용할 정확한 녹색 쉐이드를 지정합니다. 녹색은 긍정적 성과와 관련되어 있어 상승하는 화살표 아이콘에 적합한 선택으로 여겨집니다.

파워 BI 보고서에서 만들어진 다른 모든 아이콘의 DAX 측정치를 확인하려면 이 기사의 끝에 제공된 PBIX 파일을 다운로드하여 사용할 수 있습니다. 이들은 _Constants/HTML Set Up 측정치 폴더 아래에서 모두 확인할 수 있습니다.

![이미지](/assets/img/2024-05-01-ElevatingPowerBIReportswithHTMLCSSJoiningForces_7.png)

<div class="content-ad"></div>

## HTML 콘텐츠 시각을 활용하는 다른 기회들

여러분이 아시다시피, Power BI의 HTML 콘텐츠 시각을 활용하여 얼마나 많은 가능성이 있는지 조금이라도 알 수 있었습니다. 다음은 Power BI에서 이 시각화를 활용하는 몇 가지 아이디어입니다:

- 대화형 콘텐츠 임베딩: 지도, 애니메이션 차트, 미니 게임과 같은 대화형 요소를 통합하여 사용자들을 즐겁게 만들어보세요.
- 사용자 정의 탐색 메뉴 만들기: 직관적인 탐색 메뉴를 설계하기 위해 HTML/CSS를 사용하여 보고서의 사용성과 구조를 향상시키세요.
- 외부 웹 콘텐츠 통합: 비디오, 실시간 데이터 피드, 또는 타 웹 콘텐츠를 보고서에 직접 삽입하여 최신 정보를 제공하고 데이터 이야기를 풍부하게 만드세요.
- 사용자 정의 스타일링과 브랜딩: 보고서의 모양과 느낌을 기업 브랜딩이나 특정 디자인 지침에 맞추어 조정하여 모든 보고서에서 일관된 시각적 경험을 제공하세요.

물론 이 외에도 더 많은 방법이 있을 거에요!!

<div class="content-ad"></div>

## 마무리

여기까지가 이 기사의 전부에요! 여기서 우리는 Power BI에서 HTML과 CSS로 할 수 있는 것들의 일부만 살짝 소개했는데, 여러분을 흥분하게 만들고 새로운 기회와 잠재적인 사용 사례들에 대해 생각하게 했으면 좋겠어요. HTML을 잘 몰라도 이 시각화를 시도해보고 싶다면, ChatGPT 🤖를 활용하여 필요한 HTML 코드를 준비하는 데 도움을 받아보세요!

다음 PBIX 파일에서 이러한 예시들을 모두 확인해보세요.

즐거운 디자인 🎨 그리고 저의 다음 업데이트를 기대해주세요! 🥸

<div class="content-ad"></div>

## 여기에서 나를 찾거나 팔로우하세요:

- Medium
- LinkedIn
- X (이전에는 Twitter)