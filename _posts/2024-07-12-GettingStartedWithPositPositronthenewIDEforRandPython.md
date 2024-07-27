---
title: "새로운 R 및 Python IDE, Posit Positron 시작하기 사용법 가이드"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-GettingStartedWithPositPositronthenewIDEforRandPython_0.png"
date: 2024-07-12 19:38
ogImage: 
  url: /TIL/assets/img/2024-07-12-GettingStartedWithPositPositronthenewIDEforRandPython_0.png
tag: Tech
originalTitle: "Getting Started With Posit Positron, the new IDE for R and Python"
link: "https://medium.com/codex/getting-started-with-posit-positron-the-new-ide-for-r-and-python-de1beab9c70d"
---



![image](/TIL/assets/img/2024-07-12-GettingStartedWithPositPositronthenewIDEforRandPython_0.png)

Positron sounds like the latest Autobot to join Optimus Prime in the Transformer movies (and toys — can’t forget those!!). Instead, it is a new IDE meant to transform programming and data science workflows if its creator Posit has its way.

Positron is an IDE, launched as a surprise Beta product by Posit. The new IDE is designed to allow data scientists to better explore data in both R and Python programs.

## Some Background on Posit


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

포지트의 이름 선택은 흥미로운 역사를 갖고 있어요. 포지트는 주요 제품으로 인해 먼저 RStudio로 알려진 소프트웨어 개발 회사입니다. RStudio는 주로 R 프로그래머들 사이에서 매우 인기 있는 통합 개발 환경(IDE)로, 스크립트, 라이브러리, 시각화 및 생성된 데이터 개체를 표시하는 분할 창 레이아웃으로 유명해졌어요.

RStudio는 reticulate를 실행할 수 있는 기능을 통합하여 Python을 R에서 실행할 수 있게 했어요. 그리고 최신화된 마크다운 스위트인 Quarto가 기능을 더욱 향상시켰어요. 결과적으로, RStudio는 상당한 규모의 Python 개발자들을 끌게 되었어요.

# 시작하기

포지트론을 시작하려면 GitHub 저장소의 릴리스 페이지를 통해 IDE를 다운로드해야 해요. 현재 베타 버전은 Windows 및 맥 OS에서 사용할 수 있어요. 물론, 페이지에서는 요구 사항을 설명하고 있어요 — 포지트가 더 많은 베타 버전을 출시할수록 IDE의 몇 가지 반복 버전을 볼 수 있을 거예요.

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

R 및 Python 언어는 일반 절차에 따라 설치되어야 합니다. 사용자는 R 버전 4.2 이상과 Python 3.8 이상을 갖추고 있어야 합니다.

Python 사용자는 또한 Python을 실행하기 위한 IPykernel 패키지를 포함해야 합니다. 여기서 다운로드하는 방법을 배울 수 있습니다. 통상 Python 프로토콜을 사용하여 호출할 수 있습니다.

설치된 경우 Positron은 언어 파일을 인식하여 기본 Python 및 R을 위한 패키지 및 라이브러리 설치에 시달리지 않고 시작할 수 있도록 합니다.

Python 환경 설정이 다른 경우 드롭다운 메뉴도 있습니다. IDE 오른쪽 상단에 나타납니다.

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

아래는 마크다운 형식으로 컨버팅 된 표입니다.


| Tag        | Description                                                                             |
|------------|-----------------------------------------------------------------------------------------|
| img        | `<img>` 태그는 이미지를 삽입할 때 사용합니다.                                                  |
| div        | `<div>` 태그는 문서의 섹션을 나타내거나 스타일을 지정하기 위해 사용됩니다.                             |
| p          | `<p>` 태그는 단락을 나타내며 텍스트를 그룹화할 때 사용됩니다.                                        |
| a          | `<a>` 태그는 하이퍼링크를 생성할 때 사용되며 클릭 가능한 링크를 만듭니다.                          |
| table      | `<table>` 태그는 표를 만들기 위해 사용되며 여러 행과 열을 가질 수 있습니다.                           |


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

Posit가 Positron을 개발할 때 Visual Studio 코드에 사용된 OSS(오픈 소스 소프트웨어) 아키텍처를 사용했어요. 그런 다음 Positron에는 RStudio와 유사한 데이터 탐색을 위한 목적의 독특한 기능들이 추가되었어요.

RStudio 설정과 유사한 영역에 전용 패널이 있는 플로팅이 가능합니다. 또한 Shiny 앱을 표시하는 데도 작동하며, 사용자는 환경 내에서 R 기반 및 Python 기반 Shiny 앱을 모두 볼 수 있습니다.

왼쪽 메뉴에는 Visual Studio 코드에 나타나는 아이콘과 같은 아이콘이 있어요 — 탐색, 검색, 소스 제어, 실행 및 디버그 아이콘입니다. 주요 차이점은 테스트 아이콘입니다. 이 테스트 아이콘을 사용하여 사용자는 Positron에서 실행된 프로그램을 위한 테스트 프레임워크를 구성할 수 있어요. 이를 통해 환경에서 간단한 테스트를 만드는 데 도움이 될 수 있습니다.

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

# 데이터 탐색기를 사용하여 데이터 검사

Positron의 가장 중요한 기능은 변수 검사와 플로팅을 지원하는 RStudio 스타일입니다. 변수 검사 기능을 사용하면 사용자가 데이터 크기 및 최근성에 따라 어떤 변수가 있는지 알 수 있습니다.

GitHub 페이지에 따르면 데이터 탐색기에는 데이터 그리드, 요약 패널 및 필터 막대가 있습니다.

- 데이터 그리드 — 개별 셀 및 열을 표시하는 스프레드시트 형식의 출력입니다. 또한 정렬 기능도 있습니다.

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

**2. 요약 패널** - 각 열 이름, 유형 및 결측 데이터 비율을 보여주는 디스플레이입니다. 탐색적 데이터 분석을 보완하는데 사용되며, 각 열 이름과 그에 해당하는 유형을 나타내는 아이콘을 나란히 표시합니다. 또한 인라인 막대 그래프 내에서 결측 데이터 양을 증가하는 백분율로 표시합니다.

![이미지](/TIL/assets/img/2024-07-12-GettingStartedWithPositPositronthenewIDEforRandPython_3.png)

**3. 필터 막대** - 열의 관측값 유형에 따라 특정 열을 필터링하는 기능을 제공합니다. 예를 들어, 문자열 열은 포함하거나 시작하거나 끝나거나 비어있거나 정확히 일치하는 등의 필터를 가지고 있습니다. 숫자 열은 논리 연산의 필터를 가지고 있어 작거나 크거나, 동일하거나, 두 값 사이에 포함되는 등의 작업을 수행할 수 있습니다.

그림을 생성하기 위해 ggplot, txhousing로부터 데이터를 가져왔습니다. 데이터에는 9개의 열이 있습니다. 왼쪽에는 각 열의 요약 패널을 볼 수 있습니다. 그 옆에 데이터 그리드가 나타납니다. 오른쪽에는 변수 패널 아래에 생성한 변수인 q가 표시됩니다. q 변수는 텍사스 주택 데이터를 포함하는 것뿐입니다. 패널에는 q를 설명하는데 쓰이며, 사용된 데이터 오브젝트 유형(data.frame), 행 수(8602), 열 수(9)를 보여줍니다.

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


![Data Explorer Screenshot](/TIL/assets/img/2024-07-12-GettingStartedWithPositPositronthenewIDEforRandPython_4.png)

데이터 익스플로러(Data Explorer)를 사용하면 Python(pandas)이나 R(data.frame, tibble, data.table)에서 해당 데이터 프레임을 표시할 수 있어, 대부분의 데이터 모델링 요구를 보완할 수 있습니다.

또한 다른 데이터 유형인 polars에 대한 실험적 지원이 있습니다. 추가 Python 데이터 프레임 라이브러리도 곧 예상됩니다.

# 확장 기능 추가 가능


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

사용자들은 일반적으로 Visual Studio Code에서 사용하는 동일한 확장 프로그램을 추가할 수 있습니다. 아래 이미지에서 Prettier를 사용하여 Positron 계정에 어두운 테마를 적용했습니다.

확장 프로그램의 가용성을 통해 개발자들은 다양한 상호작용이나 도구에 적응할 필요 없이 보다 개인화된 개발 환경을 구축할 수 있습니다.

그러나 사용자들은 일반적으로 Visual Studio Code에서 필요한 R 및 Python 실행을 위해 어떤 확장 프로그램도 사용하지 않는 것이 좋습니다. 이러한 확장 프로그램에서 이미 필요한 기능이 Positron에 포함되어 있기 때문에 필요하지 않습니다. 이 통합은 VSC에 비해 일부 환경 "불필요한" 요소를 저장할 수 있으나, 아마도 VSC는 R 프로그래밍을 실행하기 위한 환경에서 확장 프로그램만이 필요할 것입니다.

또한 Postiron 확장 프로그램을 찾고 설치하기 위해서는 OpenVSX(https://openvsx.org)를 사용해야 합니다. Microsoft Marketplace 대신 사용해야 합니다.

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

# RStudio가 곧 대체될 것으로 기대하지 마세요

Positron에 대한 초기 대중 응답은 긍정적이지만, 아직 IDE가 완전히 RStudio를 대체할 것인지에 대한 의문이 남아 있습니다. Positron을 시도한 대부분의 개발자들은 이를 RStudio의 대체품으로 극찬하고 있습니다.

Posit의 수석 과학자 인 Hadley Wickham은 R 프로그래밍에 대해 방대한 글을 쓴 사람으로, Positron을 사용한 후 계속해서 지원이 가능하며 RStudio의 개발은 장래에 계속될 것이라고 팔로워들에게 안심시켰습니다. 그는 또 다른 게시물에서, 몇 가지 버그 해결이 남아 있기 때문에 처음 공부하는 학습자들에게는 문제가 해결된 IDE가 필요하다는 점을 주의했습니다.

![Getting Started with Posit: Positron, the new IDE for R and Python](/TIL/assets/img/2024-07-12-GettingStartedWithPositPositronthenewIDEforRandPython_5.png)

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

나 또한 Positron이 가져야했던 몇 가지 기능이 RStudio에 있다고 생각합니다. 적어도 변형으로써요. RStudio에서 파일을 빠르게 찾을 수 있고 어떤 라이브러리가 업데이트가 필요한지 확인하고 업데이트를 설치하고 함수 정의를 찾을 수 있는 것이 마음에 듭니다. 하지만 이 모든 것은 현재 R과 Python 사용이 혼합된 상태보다는 R 프로그래밍을 위해 설계되었습니다.

Posit에는 Positron에서 유용한 도구가 있습니다. 이것이 어떻게 더 발전하고 개발자 및 데이터 과학자들 사이에서 어떻게 채택되어 나갈지 흥미롭게 살펴볼 만합니다.