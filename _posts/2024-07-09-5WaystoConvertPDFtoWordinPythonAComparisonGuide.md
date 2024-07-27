---
title: "Python을 사용한 PDF를 Word로 변환하는 5가지 방법 비교 가이드"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-5WaystoConvertPDFtoWordinPythonAComparisonGuide_0.png"
date: 2024-07-09 14:43
ogImage:
  url: /assets/img/2024-07-09-5WaystoConvertPDFtoWordinPythonAComparisonGuide_0.png
tag: Tech
originalTitle: "5 Ways to Convert PDF to Word in Python: A Comparison Guide"
link: "https://medium.com/@alexaae9/5-ways-to-convert-pdf-to-word-in-python-a-comparison-guide-1771cfd109e7"
---

![image](/TIL/assets/img/2024-07-09-5WaystoConvertPDFtoWordinPythonAComparisonGuide_0.png)

PDF 문서를 편집 가능한 Microsoft Word 파일로 변환하면 변경 사항을 가할 수 있고 주석을 추가하며 PDF 콘텐츠에 대해 더 효율적으로 협업할 수 있습니다.

이 블로그 포스트에서는 무료 오픈 소스 라이브러리 또는 상용 라이브러리를 사용하여 Python에서 PDF를 Word로 변환하는 5가지 솔루션을 모아서 각 솔루션의 장단점을 강조했습니다.

- PyPDF2 및 python-docx를 사용하여 PDF를 Word로 변환
- pdfplumber 및 python-docx를 사용하여 PDF를 Word로 변환
- pdf2docx를 사용하여 PDF를 Word로 변환
- Spire.PDF for Python을 사용하여 PDF를 Word로 변환
- .NET을 통해 Aspose.Words for Python을 사용하여 PDF를 Word로 변환

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

## PyPDF2와 python-docx를 사용하여 PDF를 Word로 변환하기

PyPDF2는 Python에서 PDF 파일을 다루는 데 사용하는 무료 오픈 소스 라이브러리로, PDF 문서를 읽고 조작하며 처리하는 다양한 기능을 제공합니다.

python-docx는 Microsoft Word (.docx) 파일을 생성하고 업데이트하는 데 사용하는 무료 오픈 소스 라이브러리입니다.

PyPI를 통해 이들을 설치하려면 다음과 같은 pip 명령을 사용하십시오.

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
pip install PyPDF2
pip install python-docx
```

코드 예시:

```js
from PyPDF2 import PdfReader
from PyPDF2 import PdfWriter
from docx import Document
from docx.shared import Inches

# 새 Word 문서 생성
document = Document()

# PDF 파일 열기
with open("C:\\Users\\Administrator\\Desktop\\Input.pdf", "rb") as file:

    # PdfReader 객체 생성
    pdf_reader = PdfReader(file)

    # 쓰기용으로 Word 문서 열기
    with open("output.docx", "wb") as output_file:

        # 각 페이지를 순환하며
        for page_num in range(len(pdf_reader.pages)):

            # 현재 페이지 가져오기
            page = pdf_reader.pages[page_num]

            # 페이지에서 텍스트 추출
            text = page.extract_text()

            # 텍스트를 담는 단락을 Word에 추가
            document.add_paragraph(text)

# Word 문서 저장
document.save("output.docx")
```

장점:

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

- 무료입니다.

단점:

- 텍스트만 추출되어 워드 문서에 삽입됩니다.
- 원본 PDF 파일의 모든 서식과 레이아웃이 손실됩니다.

## pdfplumber와 python-docx를 이용해 PDF를 워드로 변환하기

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

python-docx은 Microsoft Word (.docx) 파일을 만들고 업데이트하기 위한 무료 오픈소스 라이브러리입니다.

pdfplumber는 PDF 파일로부터 텍스트와 테이블을 추출하기 위한 무료 오픈소스 Python 라이브러리입니다.

아래 명령어를 통해 PyPI를 통해 이를 설치할 수 있습니다.

```js
pip install pdfplumber
pip install python-docx
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

아래는 코드 예시입니다:

```js
import pdfplumber
from docx import Document
from docx.shared import Inches

# PDF 파일 열기
with pdfplumber.open("C:\\Users\\Administrator\\Desktop\\Input.pdf") as pdf:

    # PDF에서 텍스트 추출
    text = ""
    for page in pdf.pages:
        text += page.extract_text()

# 새 Word 문서 생성
document = Document()

# 문서에 텍스트가 들어갈 단락 추가
document.add_paragraph(text)

# Word 문서 저장
document.save("output.docx")
```

장점:

- 무료입니다.

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

**단점:**

- 텍스트만 추출되어 워드 문서에 들어가게 됩니다.
- 원본 PDF 파일의 모든 서식과 레이아웃이 사라집니다.

## pdf2docx를 사용하여 PDF를 워드로 변환하기

pdf2docx는 PDF 파일을 Microsoft Word (.docx) 문서로 간단하고 효율적으로 변환하는 방법을 제공하는 Python 라이브러리입니다. 이는 문서 변환, 데이터 추출 및 텍스트 처리와 같은 여러 목적으로 사용할 수 있는 무료 오픈 소스 라이브러리입니다.

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

다음 pip 명령을 사용하여 PyPI에서 설치할 수 있습니다.

```js
pip install pdf2docx
```

코드 예시:

```js
from pdf2docx import Converter

def convert_pdf_to_docx(pdf_file, docx_file):

    # Converter 객체 생성
    cv = Converter(pdf_file)

    # 지정된 PDF 페이지를 docx로 변환
    cv.convert(docx_file, start=0, end=None)
    cv.close()

# PDF를 Docx 파일로 변환
convert_pdf_to_docx("C:\\Users\\Administrator\\Desktop\\Input.pdf", "Output.docx")
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

장점:

- 무료입니다.
- 텍스트 및 그래픽 요소가 모두 변환됩니다.
- 형식 및 레이아웃이 유지됩니다.

단점:

- 상업용 라이브러리를 사용하는 것보다 복잡한 PDF 문서를 변환하는 데 시간이 조금 더 소요됩니다.

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

## Spire.PDF를 사용하여 PDF를 Word로 변환하기

Spire.PDF for Python은 Python에서 PDF 문서를 처리하는 기능이 풍부한 라이브러리입니다. PDF 파일을 프로그래밍적으로 만들거나 수정하거나 조작하기 위한 다양한 도구를 제공합니다.

PyPI에서 다음 pip 명령어를 사용하여 설치할 수 있습니다.

```js
pip install Spire.PDF
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

코드 예시:

```python
from spire.pdf.common import *
from spire.pdf import *

# PdfDocument 객체 생성
doc = PdfDocument()

# PDF 문서 불러오기
doc.LoadFromFile("C:\\Users\\Administrator\\Desktop\\Input.pdf")

# 스트리밍 레이아웃으로 PDF를 Word로 변환
# doc.ConvertOptions.SetPdfToDocOptions(True, True)

# docx 파일로 변환
doc.SaveToFile("Output.docx", FileFormat.DOCX)

# 리소스 해제
doc.Close()
```

장점:

- 텍스트와 그래픽 요소가 모두 변환됩니다.
- 서식과 레이아웃이 보존됩니다(고정 페이지 레이아웃 모드에서).
- 변환 속도가 빠릅니다.

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

단점:

- 최저 수준의 라이선스 비용은 $999입니다.

## Aspose.Words for Python을 사용하여 PDF를 Word로 변환하기

Aspose.Words for Python via .NET은 Python을 통해 Microsoft Word 문서(.docx, .doc)를 조작하고 변환하는 상용 라이브러리입니다. 또한 PDF 및 HTML과 같은 다른 형식을 Word 형식으로 변환하는 기능도 지원합니다.

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

테이블 태그를 Markdown 형식으로 변경해보세요.

| Header One | Header Two |
| ---------- | ---------- |
| Data 1     | Data 2     |
| Data 3     | Data 4     |

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

장점:

- 텍스트 및 그래픽 요소가 모두 변환됩니다.
- 형식과 레이아웃이 보존됩니다.
- 변환 속도가 빠릅니다.

단점:

- 가장 낮은 수준의 라이선스 비용은 $1199입니다.

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

## 결론

무료이자 오픈 소스인 라이브러리를 사용하면 Python을 활용해 PDF 및 Word 문서를 처리할 수 있어 편리하며, 라이선스나 비용에 대한 걱정 없이 사용할 수 있습니다. 상업용 솔루션은 일반적으로 무료이자 오픈 소스인 라이브러리보다 더 고급 기능을 제공하며 더 나은 성능을 보장합니다. 이러한 옵션 중 어떤 것을 선택할지는 당신의 특정 요구 사항, 예산 및 필요한 기능 수준에 따라 다를 것입니다.

## 관련 자료

Python에서 PDF에 주석 달기의 8가지 방법

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

파이썬에서 PDF 파일을 나누고 병합하기

파이썬에서 PDF의 텍스트 추출하기

파이썬에서 PDF에서 이미지 추출하기
