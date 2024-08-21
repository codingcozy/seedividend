---
title: "파이썬에서 HTML을 PDF로 변환하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-ConvertHTMLtoPDFinPythonStep-by-StepGuide_0.png"
date: 2024-05-01 23:45
ogImage:
  url: /assets/img/2024-05-01-ConvertHTMLtoPDFinPythonStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Convert HTML to PDF in Python: Step-by-Step Guide"
link: "https://medium.com/@vidvatek/convert-html-to-pdf-in-python-step-by-step-guide-fc4e6d3dbd39"
isUpdated: true
---

요즘 디지털 시대에는 HTML 콘텐츠를 PDF 형식으로 변환해야 하는 일이 자주 있습니다. 보고서 생성, 웹 콘텐츠 보관, 인쇄 가능 문서 작성 등 다양한 목적으로 HTML을 PDF 파일로 변환해야 하는데, 이는 제 프로그래밍 도구상에서 중요한 기술이 되었습니다.

다행히도 Python은 이 작업을 단순화시키는 강력한 라이브러리를 제공하여, 초보자를 포함한 모든 프로그래머들에게 접근하기 쉽게 만들어 주고 있습니다. 이 글에서는 Python을 사용하여 HTML을 PDF로 변환하는 과정을 안내해 드릴 것이며, 이를 통해 HTML 콘텐츠로부터 전문적으로 보이는 PDF 문서를 쉽게 생성할 수 있게 될 것입니다.

pdfkit 및 wkhtmltopdf와 같은 Python 라이브러리를 활용함으로써, 명령줄 도구인 wkhtmltopdf의 기능을 활용하면서도 Python 코드의 간편함과 유연성을 누릴 수 있었습니다.

저는 이러한 라이브러리의 설치 및 구성을 안내하여, 모든 것을 올바르게 설정할 수 있도록 도와 드리겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리 환경이 준비되면 실제 변환 과정으로 들어가게 될 거에요. HTML 파일 또는 HTML 콘텐츠를 로드하고 아름다운 PDF 문서로 변환하는 방법을 보여드릴 거에요.

하지만 여기서 우리의 여정은 끝나지 않아요. PDF 변환을 여러분의 특정한 요구에 맞게 맞춤화할 수 있는 다양한 사용자 정의 옵션도 살펴볼 거에요.

여러분은 페이지 크기, 여백, 헤더, 풋터를 조절하는 방법과 CSS 스타일시트와 외부 에셋을 사용하여 PDF 렌더링을 향상시키는 방법을 배울 거에요.

이미지와 외부 자원을 원활하게 처리할 수 있는 지식을 제공해 드릴 거에요, 이를 통해 여러분의 PDF가 원본 HTML 콘텐츠를 정확하게 반영할 수 있도록 도와드릴 거에요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

모든 프로그래밍 작업과 마찬가지로, 문제 해결은 과정에서 불가피한 부분임을 알고 있습니다. 안심하세요, 변환 과정 중에 발생할 수 있는 글꼴 문제나 렌더링 차이와 같은 잠재적인 어려움에 대처하고, 극복할 수 있는 실용적인 팁과 해결책을 제시해 드리겠습니다.

더불어, 고급 주제를 탐구하고 실력을 더욱 향상시킬 수 있는 추가 자료들을 안내해 드리겠습니다.

이 글을 마치면, 파이썬을 사용하여 HTML을 PDF로 손쉽게 변환하는 데 필요한 지식과 도구를 소유하게 될 것이라고 자신 있습니다.

이 새로운 능력은 문서 생성을 자동화하고 응용 프로그램을 향상시키며, 시각적으로 매력적이고 전문적인 PDF 문서를 제작하는 데 창의성을 발휘할 수 있는 힘을 줄 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

그러니 함께 HTML을 PDF로 변환하는 Python의 잠재력을 발휘해 보도록 하죠!

pdfkit 설치하기

pdfkit을 설치하고 파이썬 환경에 추가하려면 다음 코드 스니펫을 사용할 수 있어요:

```js
pip install pdfkit
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

명령 줄 인터페이스나 터미널에서이 명령을 실행하면 pdfkit 라이브러리의 설치 과정이 시작됩니다. pip는 Python의 패키지 관리자이며, Python 패키지 인덱스 (PyPI)에서 pdfkit을 자동으로 다운로드하고 설치합니다.

설치가 완료되면 Python 프로젝트에서 pdfkit을 사용할 수 있게 됩니다. 이 라이브러리는 명령줄 도구 wkhtmltopdf를 편리하게 감싸는 역할을 하며, Python 코드를 사용하여 HTML을 쉽게 PDF로 변환할 수 있게 해줍니다.

pdfkit이 성공적으로 설치되면 HTML에서 PDF로 변환하는 프로세스의 다음 단계로 진행할 수 있습니다.

아래 스크린샷을 참조해주세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

wkhtmltopdf를 설치해보세요.

wkhtmltopdf를 설치하려면 운영 체제에 따라 다음 지침을 따르세요.

Ubuntu:

터미널을 열고 다음 명령을 실행하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
sudo apt-get install wkhtmltopdf
```

시스템 비밀번호를 요청하면 제공하고 설치가 진행됩니다.

macOS:

Homebrew가 설치되어 있는 경우, 터미널을 열고 다음 명령어를 실행하십시오.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
brew install homebrew/cask/wkhtmltopdf
```

설치가 시작됩니다. Homebrew가 대신 처리해줄 거에요.

Windows:

- 공식 wkhtmltopdf 다운로드 페이지인 https://wkhtmltopdf.org/downloads.html을 방문해주세요.
- Windows 버전에 맞는 wkhtmltopdf 버전(32비트 또는 64비트)을 선택해주세요.
- 다운로드가 완료되면 다운로드한 파일을 찾아 두 번 클릭하여 설치 프로세스를 시작해주세요.
- 화면에 나타나는 지침에 따라 원하는 옵션을 선택하여 설치를 완료해주세요.
- 기본적으로 wkhtmltopdf는 C:\Program Files\wkhtmltopdf 경로에 설치됩니다.
- 명령 프롬프트에서 어디서든 명령을 실행할 수 있도록 하기 위해 환경 변수 설정에서 시스템의 PATH 변수에 bin 폴더를 추가해야 합니다.
- 예를 들어, PATH 변수에 C:\Program Files\wkhtmltopdf\bin을 추가해주세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

설치가 완료되고 필요한 구성이 마무리되면 Python 프로젝트에서 HTML을 PDF로 변환하는 데 wkhtmltopdf를 사용할 준비가 됩니다.

관련 글: 라라벨 10에서 완전한 CRUD 애플리케이션 구축하기

예시:

pdfkit을 사용하여 URL로부터 PDF 파일을 생성하는 방법을 보여주는 예제입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import pdfkit

pdfkit.from_url('https://www.google.com/', 'test.pdf')
```

이 예제에서 우리는 pdfkit 모듈을 import하고 from_url() 함수를 사용하여 지정된 URL(https://www.google.com/)의 웹페이지를 PDF 파일로 변환합니다.

결과로 생성된 PDF 파일은 `test.pdf`라는 파일명으로 저장됩니다.

URL과 출력 파일명을 필요에 맞게 사용자 정의할 수 있습니다. 이 코드를 실행하면 변환 프로세스가 시작되고 제공된 URL에서 PDF 파일이 생성됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

예시:

이 예시에서는 pdfkit 모듈을 가져와서 from_file() 함수를 사용하여 `test.html`이라는 HTML 파일을 PDF 파일로 변환합니다.

생성된 PDF 파일은 `example.pdf`라는 파일 이름으로 저장됩니다.

```js
import pdfkit

pdfkit.from_file('test.html', 'example.pdf')
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

HTML 파일의 실제 경로 또는 파일 이름을 입력하고 싶은 HTML 파일의 경로나 파일 이름으로 대체해주세요.

또한, 원하는 대로 출력 파일 이름을 사용자 정의할 수 있습니다. 이 코드를 실행하면 HTML 콘텐츠로부터 PDF 파일을 생성하는 변환 프로세스가 시작됩니다.

예시:

이 예시에서는 헤딩과 단락이 포함된 HTML 문자열 html_str을 정의합니다. from_string()을 사용하여 이 HTML 문자열을 `test.pdf`라는 PDF 파일로 변환합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import pdfkit

pdfkit.from_string('안녕하세요!', 'test.pdf')

또는

var htmlstr = '<h2>PDF 파일 생성</h2><p>PDF 파일을 생성합니다</p>'

pdfkit.from_string(htmlstr, 'test.pdf')
```

예시:

여기에는 여러 URL 또는 파일을 하나의 PDF로 변환하는 방법을 보여주는 예시가 있습니다:

예시 1: 여러 URL을 PDF로 변환하기:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import pdfkit

pdfkit.from_url(['google.com', 'yandex.ru', 'engadget.com'], 'test.pdf')
```

이 예제에서는 from_url() 함수를 사용하여 여러 웹페이지를 단일 PDF 파일로 변환할 때 URL 목록([`google.com`, `yandex.ru`, `engadget.com`])을 전달합니다. PDF 파일은 `test.pdf`라는 이름으로 생성됩니다.

각 URL은 생성된 PDF 내에서 개별 페이지로 변환됩니다.

예제 2: 여러 HTML 파일을 PDF로 변환하기:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import pdfkit

pdfkit.from_file(['file1.html', 'file2.html'], 'test.pdf')
```

이 예제에서는 from_file() 함수를 사용하여 여러 HTML 파일을 단일 PDF 파일인 `test.pdf`로 변환하는데 HTML 파일의 목록([`file1.html`, `file2.html`])을 제공합니다.

생성된 PDF 내에 각 HTML 파일은 별도의 페이지로 변환됩니다.

추가로 도움이 될 만한 정보:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 추천 도서: 파이썬 입문: 파이썬 시작하기
- 추천 도서: 파이썬: 세계에서 가장 인기 있는 언어로의 여정
- 추천 도서: 라라벨에서의 AJAX CRUD 작업 10가지: 단계별 안내
