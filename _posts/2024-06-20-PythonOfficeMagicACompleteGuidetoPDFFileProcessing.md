---
title: "파이썬 오피스 마법 PDF 파일 처리에 대한 완벽한 가이드"
description: ""
coverImage: "/assets/img/2024-06-20-PythonOfficeMagicACompleteGuidetoPDFFileProcessing_0.png"
date: 2024-06-20 02:01
ogImage: 
  url: /assets/img/2024-06-20-PythonOfficeMagicACompleteGuidetoPDFFileProcessing_0.png
tag: Tech
originalTitle: "Python Office Magic: A Complete Guide to PDF File Processing"
link: "https://medium.com/gitconnected/python-office-magic-a-complete-guide-to-pdf-file-processing-70552bc49151"
isUpdated: true
---




![Python Office Magic](/assets/img/2024-06-20-PythonOfficeMagicACompleteGuidetoPDFFileProcessing_0.png)

안녕하세요 여러분, 파이썬 오피스 매직 공유에 오신 것을 환영합니다! 오늘은 마법같은 기술 - 파이썬 PDF 자동화 처리를 탐험할 수 있도록 안내해 드리겠습니다. 오피스 워리어, 데이터 분석가 또는 열렬한 파이썬 애호가이든 여러분께 탁월한 편의성을 제공할 수 있다고 믿습니다.

파이썬 PDF 자동화의 세계는 정말 흥미진진하고 다채롭습니다. 이러한 기술을 숙달하면 사무실에서 진정한 마법사가 되어 업무 효율을 향상시키고 더욱 흥미로운 일을 즐길 수 있습니다!

# PDF 구문 분석 및 텍스트 추출

<div class="content-ad"></div>

첫 번째로 밝혀야 할 비밀은 PDF 구문 분석 및 텍스트 추출입니다. PDF에서 유용한 정보를 추출하는 방법이 궁금했던 적이 있나요? 걱정하지 마세요, Python이 도와줄 거예요. PyPDF2, FPDF, 그리고 reportlab과 같은 놀라운 라이브러리를 사용하여 PDF 파일을 구문 분석하고 거기서 텍스트 정보를 추출할 수 있어요.

다음은 PyPDF2, FPDF, 그리고 reportlab 라이브러리에 대한 소개입니다:

- PyPDF2 라이브러리: PyPDF2는 PDF 파일을 처리하기 위한 Python 라이브러리입니다. PDF 파일을 병합, 분할, 회전, 텍스트 추출, 페이지 추출, 워터마크 추가 등 다양한 기능을 제공해요. PyPDF2 라이브러리를 사용하여 PDF 파일의 내용을 읽고, 텍스트와 이미지를 추출할 수 있습니다. 또한 새로운 PDF 파일을 생성하거나 기존 파일을 수정하는 데 사용할 수 있어요. 다양한 PDF 작업에 적합한 기능이 풍부하고 사용하기 쉬운 라이브러리에요.
- FPDF: FPDF는 PDF 파일을 생성하기 위한 Python 라이브러리입니다. Python 코드를 사용하여 텍스트, 이미지, 테이블, 그래픽 등의 요소를 포함한 표준 PDF 문서를 생성할 수 있어요. FPDF는 간단하고 사용하기 쉬워요. 기본적인 PDF 생성에 적합해요. 보고서, 문서, 인증서, 송장 등을 생성하는 데 FDPF를 사용할 수 있어요.
- reportlab: reportlab은 복잡한 PDF 문서를 생성하기 위한 강력하고 유연한 Python 라이브러리에요. 텍스트, 이미지, 테이블, 그래픽, 글꼴 등을 처리할 수 있는 풍부한 기능을 제공하며, 고급 레이아웃과 스타일을 지원해요. 전문적인 PDF 보고서, 책, 데이터 시각화 등을 생성하는 데 적합한 널리 사용되는 라이브러리에요.

먼저 모듈들을 설치하세요:

<div class="content-ad"></div>

```js
pip install PyPDF2 FPDF reportlab
```

설치가 완료되면 PDF 파일을 다루는 재미를 즐길 수 있어요.

특별 안내: 이 모듈의 API를 배울 때 주의해야 할 문제가 있어요. PdfFileReader, PdfFileWriter, PdfFileMerger 클래스는 3.0.0 버전에서 삭제될 예정이에요. PdfReader, PdfWriter 및 PdfMerger를 대신 사용하는 것이 좋습니다.

저는 PyPDF2 (버전 3.0.1)를 설치했고, 다음 코드만이 정상적으로 실행되는 것을 확인했어요. 모두가 버전 호환성 문제에 주의해야 해요.


<div class="content-ad"></div>

```python
import PyPDF2

# PDF 파일 열기
with open('example.pdf', 'rb') as file:
  # PDF 리더 객체 생성
  reader = PyPDF2.PdfReader(file)
  
  # PDF 파일의 페이지 수 가져오기
  num_pages = len(reader.pages)
  
  # 페이지별로 텍스트 내용 추출하고 출력
  for page_num in range(num_pages):
    page = reader.pages[page_num]
    text = page.extract_text()
    print(text)
```

안녕하세요! 이제 PDF에서 텍스트를 추출할 수 있어요. 마치 암호를 해독하는 탐정 같죠! 한 번 시도해보세요.

# PDF 병합 및 분할

이제 두 번째로 PDF 병합 및 분할입니다. 손에 든 여러 PDF 파일을 쉽게 병합하거나 큰 파일을 여러 작은 파일로 분할할 수 있어요. 다음 유쾌한 코드를 시도해보세요:

<div class="content-ad"></div>

```python
from PyPDF2 import PdfMerger, PdfReader, PdfWriter

# PDF 병합기 생성
merger = PdfMerger()

# 여러 PDF 파일 병합
merger.append('example.pdf')
merger.append('file2.pdf')

# 병합된 파일 저장
merger.write('merged.pdf')
merger.close()

# PDF 파일 분할
with open('merged.pdf', 'rb') as file:
    reader = PdfReader(file)
    num_pages = len(reader.pages)
  
    # 10 페이지씩 분할
    for start in range(0, num_pages, 10):
        end = min(start + 9, num_pages - 1)
        writer = PdfWriter()
    
        # 지정 범위의 페이지를 새 파일에 추가
        for page_num in range(start, end + 1):
            writer.add_page(reader.pages[page_num])
    
        # 분할된 파일 저장
        with open(f'part_{start+1}-{end+1}.pdf', 'wb') as output_file:
            writer.write(output_file)

print("짜잔! 병합 및 분할 마법이 완료되었어요!")
```

# PDF 양식 처리

세 번째 기술은 PDF 양식 처리입니다. 많은 양의 PDF 양식 작성은 매우 지루한 작업이라는 것을 알고 계시죠. 하지만 걱정 마세요! 파이썬의 마법 같은 도우미가 여기에 있습니다! PyPDF2, pdfw, FPDF 등의 흥미로운 라이브러리를 사용하여 자동으로 양식 필드를 작성하고, 작성된 데이터를 읽거나 새로운 PDF 양식을 생성할 수 있습니다. 한 번 시도해보세요!

```python
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas

# 자동으로 양식 필드 작성
def fill_form(input_file, output_file, data):
    c = canvas.Canvas(output_file)
    c.setFont("Helvetica", 12)
    
    # 입력 파일 읽고 페이지별로 처리
    reader = PdfReader(input_file)
    for page_num, page in enumerate(reader.pages, start=1):
        # 페이지 크기 얻고 해당 크기로 캔버스 생성
        page_width = float(page.mediabox.width)
        page_height = float(page.mediabox.width)
        c.setPageSize((page_width, page_height))
        
        # 페이지 내용 그리기
        c.showPage()
        
        # 페이지에 양식 필드가 있는지 확인
        if '/Annots' in page:
            # 모든 양식 필드 탐색
            for annot in page['/Annots']:
                # 필드 유형이 텍스트 영역인지 확인
                if '/T' in annot and '/V' in annot and annot['/Type'] == '/Annot':
                    field_name = annot['/T'][1:-1]  # 필드 이름 가져오기
                    # 필드 값을 수신 데이터로 교체
                    if field_name in data:
                        field_value = data[field_name]
                        c.drawString(annot['/Rect'][0], annot['/Rect'][1], field_value)
    
    # 채워진 데이터가 포함된 PDF 저장
    c.save()

# 채워진 데이터 읽기
def read_form_data(input_file):
    data = {}
    reader = PdfReader(input_file)
    
    # 모든 페이지 탐색
    for page in reader.pages:
        # 양식 필드가 있는지 확인
        if '/Annots' in page:
            # 모든 양식 필드 탐색
            for annot in page['/Annots']:
                # 필드 유형이 텍스트 영역인지 확인
                if '/T' in annot and '/V' in annot and annot['/Type'] == '/Annot':
                    field_name = annot['/T'][1:-1]  # 필드 이름 가져오기
                    field_value = annot['/V'][1:-1] if isinstance(annot['/V'], str) else ''
                    data[field_name] = field_value
    
    return data

# 새 PDF 양식 생성
def create_form(output_file, data):
    c = canvas.Canvas(output_file)
    c.setFont("Helvetica", 12)
    
    # 데이터를 양식에 행별로 추가
    y = 800
    for field, value in data.items():
        c.drawString(50, y, f"{field}: {value}")
        y -= 20
    
    # 양식 저장
    c.save()

# 양식 필드 작성하고 저장
fill_form('form_template.pdf', 'filled_form.pdf', {'name': 'joe', 'age': '18'})

# 채워진 데이터 읽고 출력
form_data = read_form_data('filled_form.pdf')
print(form_data)

# 새 PDF 양식 생성
create_form('my_form.pdf', {'name': 'joe', 'age': '18'})

print("마법 완료! 이제 PDF 양식을 쉽게 처리할 수 있어요!")
```

<div class="content-ad"></div>

안녕하세요! 이제 여러분은 폼 처리의 위대한 마법사가 되셨습니다! 파이썬에게 이 잡다한 폼 작업을 처리하도록 맡기세요!

# PDF 문서 변환

다음으로 소개할 것은 PDF 문서 변환입니다. 때로는 PDF의 형식이 매우 편리하지 않을 수 있으며, PDF를 이미지, HTML 또는 일반 텍스트와 같은 다른 형식으로 변환하고 싶을 수 있습니다. 함께 변환의 마법을 탐험해 봅시다!

PDF 문서를 다른 형식으로 변환할 때, 이를 위해 다양한 라이브러리와 도구를 사용할 수 있습니다. 각 변환 유형에 대한 이론적 설명과 해당 샘플 코드가 다음에 나와 있습니다:

<div class="content-ad"></div>

## PDF를 이미지로 변환하기

PDF를 이미지로 변환하려면 pdf2image 라이브러리를 사용할 수 있어요. 이 라이브러리는 PDF 페이지를 이미지 형식(JPEG, PNG 등)으로 변환할 수 있어요. PDF를 이미지로 변환하는 예제 코드를 확인해보세요:

```python
from pdf2image import convert_from_path

def pdf_to_image(input_file, output_file):
    images = convert_from_path(input_file)
    for i, image in enumerate(images):
        image.save(f'{output_file}_{i}.jpg', 'JPEG')

pdf_to_image('input.pdf', 'output_image')
```

pdf_to_image 함수를 호출하여 입력 PDF 파일을 이미지로 변환하고 JPEG 형식의 이미지 파일로 저장할 수 있어요.

<div class="content-ad"></div>

참고: pdf2image.exceptions.PDFInfoNotInstalledError 오류 메시지가 발생한다면, 이 오류는 일반적으로 poppler-utils 종속성이 누락되었을 때 발생합니다. 이 문제를 해결하려면 다음과 같은 단계를 따르세요:

Windows：

- 다음 웹사이트를 방문하세요: github.com/oschwartz10…
- "Assets" 섹션에서 귀하의 운영 체제에 적합한 poppler-x.x.x_x 버전을 다운로드하세요.
- 다운로드한 파일을 해제하고 해당 경로를 시스템 환경 변수에 추가하세요.

macOS：

<div class="content-ad"></div>

Homebrew를 통해 Poppler를 설치해보세요. 아래 명령어를 실행해보세요:

```bash
brew install poppler
```

Ubuntu/Debian:

Poppler를 설치해보세요. 아래 명령어를 실행해보세요:

<div class="content-ad"></div>

```js
sudo apt-get install poppler-utils
```

설치가 완료되면 Python 환경을 다시 시작하고 pdf_to_image 함수를 실행해보세요. 이렇게 하면 PDF를 이미지로 성공적으로 변환할 수 있습니다.

## PDF를 HTML로 변환

PDF 파일을 HTML 형식으로 변환하려면 PyPDF2와 같은 PDF 파싱을 지원하는 라이브러리를 사용할 수 있습니다. 다음은 PDF를 HTML로 변환하는 예제 코드입니다:

<div class="content-ad"></div>

```python
from PyPDF2 import PdfReader

def pdf_to_html(input_file, output_file):
    with open(input_file, 'rb') as file:
        reader = PdfReader(file)
        text = ""
        
        # Extract text content page by page
        for page in reader.pages:
            text += page.extract_text()
        
        # Save as HTML file
        with open(output_file, 'w') as html_file:
            html_file.write(f"<html><body>{text}</body></html>")

pdf_to_html('input.pdf', 'output.html')
```

pdf_to_html 함수를 호출하여 입력 PDF 파일을 HTML 형식으로 변환하고 결과를 출력 파일에 저장할 수 있습니다.

## PDF를 일반 텍스트로 변환하기

PDF를 일반 텍스트 형식으로 변환하려면 pdfminer 라이브러리를 사용할 수 있습니다. PDF 문서에서 텍스트를 추출하는 강력한 도구입니다. PDF를 일반 텍스트로 변환하는 예시 코드는 다음과 같습니다:

<div class="content-ad"></div>

pdfminer.six 라이브러리: 이것은 Python 3 전용으로 작성된 pdfminer 라이브러리의 새 버전입니다. PDF 구문 분석의 현대적인 구현이며 지속적인 유지 보수와 업데이트를 받습니다. pdfminer.six 라이브러리는 Python 2 및 Python 3 모두와 호환되므로 Python의 최신 버전에서 사용할 수도 있고 일부 이전 버전도 지원합니다.

의존성 설치: pdfminer.six 라이브러리 사용

```js
pip install pdfminer.six
```

샘플 코드:

<div class="content-ad"></div>

```python
from pdfminer.high_level import extract_text_to_fp

def pdf_to_text(input_file, output_file):
    with open(output_file, 'w') as text_file:
        with open(input_file, 'rb') as file:
            extract_text_to_fp(file, text_file)

pdf_to_text('input.pdf', 'output.txt')
```

pdf_to_text 함수를 호출하여 입력 PDF 파일을 일반 텍스트 형식으로 변환하고 결과를 출력 파일에 저장할 수 있습니다.

## PDF를 워드 문서로 변환

PDF를 워드 문서로 변환하려면 python-docx와 같은 서드파티 라이브러리를 사용할 수 있습니다. 이 라이브러리를 사용하여 워드 문서를 생성하고 편집할 수 있습니다.


<div class="content-ad"></div>

파이썬-docx 라이브러리에 대한 소개입니다:

- 파이썬-docx 라이브러리: 파이썬-docx는 Microsoft Word 문서를 생성하고 수정하기 위한 파이썬 라이브러리입니다. 이는 간단하면서도 강력한 API를 제공하여 코드를 통해 Word 문서를 생성, 수정 및 조작할 수 있습니다. 파이썬-docx를 사용하면 문단, 글꼴 스타일, 표, 이미지 및 기타 내용을 추가할 수 있습니다. 또한 기존 문서의 스타일과 내용을 수정할 수 있습니다. Word 2007 및 그 이상 버전을 위한 docx 파일 형식을 지원합니다.

의존성 설치:

```js
pip install python-docx PyPDF2
```

<div class="content-ad"></div>

다음은 PDF를 워드 문서로 변환하는 예제 코드입니다:

```python
from docx import Document
from PyPDF2 import PdfReader

def pdf_to_word(input_file, output_file):
    with open(input_file, 'rb') as file:
        reader = PdfReader(file)
        text = ""
        
        # 페이지별 텍스트 내용 추출
        for page in reader.pages:
            text += page.extract_text()
        
        # 워드 문서 생성
        doc = Document()
        doc.add_paragraph(text)
        
        # 워드 문서로 저장
        doc.save(output_file)

pdf_to_word('input.pdf', 'output.docx')
```

pdf_to_word 함수를 호출하여 입력 PDF 파일을 워드 문서로 변환하고 결과를 출력 파일에 저장할 수 있습니다.

위의 예제 코드를 실행하기 전에 필요한 라이브러리와 종속성이 설치되어 있는지 확인해주세요. 누락된 라이브러리는 pip 명령을 사용하여 설치할 수 있습니다.

<div class="content-ad"></div>

샘플 코드를 통해 PDF 파일을 다른 형식으로 변환하는 데 도움이 될 수 있기를 바랍니다. 궁금한 점이 있으면 언제든지 질문해 주세요!

# PDF 워터마크와 서명

이제 PDF 워터마크와 디지털 서명의 마법을 소개합니다! PDF 파일에 워터마크나 디지털 서명을 추가하면 저작권 보호와 보안을 강화할 수 있다고 상상해 보세요. 이 마법 같은 판타지 세계로 함께 들어가 봅시다:

```js
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
import io

# PDF에 워터마크 추가
def add_watermark(input_file, output_file, watermark_text):
    reader = PdfReader(input_file)
    writer = PdfWriter()

    watermark_buffer = io.BytesIO()

    # 워터마크가 있는 PDF를 만듭니다.
    c = canvas.Canvas(watermark_buffer)
    c.setFont("Helvetica", 48) # 폰트 선택에 유의하세요.
    c.rotate(45)
    c.translate(-500, -500)
    c.setFillAlpha(0.3)
    c.drawString(400, 400, watermark_text)
    c.save()

    watermark_buffer.seek(0)
    watermark_pdf = PdfReader(watermark_buffer)

    # 각 페이지를 탐색합니다.
    for i, page in enumerate(reader.pages, start=1):
        watermark_page = watermark_pdf.pages[0]

        # 페이지에 워터마크 추가
        page.merge_page(watermark_page)
        writer.add_page(page)

    # 워터마크가 있는 파일로 저장합니다.
    with open(output_file, 'wb') as file:
        writer.write(file)

# PDF에 디지털 서명 추가
def add_signature(input_file, output_file, signature_image):
    reader = PdfReader(input_file)
    writer = PdfWriter()

    # 각 페이지를 탐색합니다.
    for i, page in enumerate(reader.pages, start=1):
        # 페이지 우측 하단에 서명 이미지 추가
        page.merge_page(signature_image)
        writer.add_page(page)

    # 서명이 있는 문서를 저장합니다.
    with open(output_file, 'wb') as file:
        writer.write(file)

# add_watermark() 및 add_signature() 함수를 사용하여 워터마크와 서명을 추가합니다.
watermark_text = "기밀 문서, 비밀 유지해주세요."
signature_image = PdfReader("signature.pdf").pages[0]

add_watermark('part_21-30.pdf', 'document_with_watermark.pdf', watermark_text)
add_signature('document_with_watermark.pdf', 'document_with_watermark_and_signature.pdf', signature_image)

print("워터마크 및 서명 마법이 완료되었습니다! 이제 PDF 파일을 더 안전하고 전문적으로 만들 수 있습니다!")
```

<div class="content-ad"></div>

안녕 안녕 안녕, 이제 PDF 워터마크와 서명의 초강력 마법사가 되었다구요! 문서들이 마법과 보호로 가득 차도록 해봅시다!

# PDF 보고서 생성

이제, 우리는 마지막 마법 조각을 탐험할 준비가 되었습니다! PDF 보고서 생성, 파이썬의 힘을 활용하여 차트, 테이블, 텍스트를 포함한 다양하고 아름다운 PDF 보고서를 생성해보세요. 함께 이 마법 같은 여정을 떠나봐요!

의존성 설치:

<div class="content-ad"></div>

```js
pip install pytesseract
```

```js
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, Image
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, Spacer

# 보고서 내용 생성
def create_report(output_file, data):
    # PDF 문서 개체 생성
    doc = SimpleDocTemplate(output_file, pagesize=A4)

    # 스타일 시트 로드
    styles = getSampleStyleSheet()

    # 보고서 내용 요소 생성
    elements = []

    # 제목 추가
    title = Paragraph("판매 보고서", styles["Title"])
    elements.append(title)
    elements.append(Spacer(1, 20))

    # 테이블 추가
    table_data = data
    table = Table(table_data)
    elements.append(table)
    elements.append(Spacer(1, 20))

    # 차트 생성 및 PNG 이미지로 저장
    plt.plot(data[1][1:], marker='o')
    plt.xlabel("날짜")
    plt.ylabel("매출액")
    plt.title("매출 트렌드 차트")
    plt.savefig("sales_plot.png")
    plt.close()

    # 차트를 보고서 내용에 추가
    image = Image("sales_plot.png", width=400, height=300)
    elements.append(image)

    # 보고서 생성
    doc.build(elements)

# 보고서 데이터 생성
report_data = [
    ["날짜", "매출액"],
    ["1/1", 100],
    ["1/2", 200],
    ["1/3", 150],
    ["1/4", 300],
]

# 보고서 생성
create_report('sales_report.pdf', report_data)

print("테이블 생성이 완료되었습니다! 이제 생성된 보고서 파일을 확인할 수 있습니다.")
```

# OCR (Optical Character Recognition)

마지막으로 OCR (Optical Character Recognition)가 있습니다. 몇 장의 스캔된 PDF 문서가 있고 이를 검색 가능하고 편집 가능한 텍스트로 변환해야 한다고 상상해보세요. Python이 이를 가능하게 해줄 수 있다는 좋은 소식이 있습니다! 이 마법 같은 주문을 함께 체험해봅시다!


<div class="content-ad"></div>

```js
import pdf2image
import pytesseract

# PDF를 이미지로 변환
def pdf_to_image(input_file):
    images = pdf2image.convert_from_path(input_file)
    return images

# OCR을 사용하여 이미지를 텍스트로 변환
def image_to_text(image):
    text = pytesseract.image_to_string(image)
    return text

# 텍스트를 파일에 저장
def save_text_to_file(text, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)

# PDF에서 텍스트 추출
def extract_text_from_pdf(input_file, output_file):
    # PDF를 이미지로 변환
    images = pdf_to_image(input_file)
    
    extracted_text = ""
    
    # 각 이미지에서 텍스트 추출
    for image in images:
        text = image_to_text(image)
        extracted_text += text + "\n"
    
    # 추출된 텍스트를 파일에 저장
    save_text_to_file(extracted_text, output_file)

# 스캔된 PDF에서 텍스트 추출
extract_text_from_pdf('scanned_document.pdf', 'extracted_text.txt')

print("OCR (광학 문자 인식) 매직이 완료되었습니다! 이제 스캔된 PDF 문서를 편집 가능한 텍스트로 변환할 수 있어요!")
```

와우, 이제 이미 OCR 마술사가 되었네요! Python이 이 스캔된 PDF 파일을 해석해줄게요!

# 끝에 작성됨

대단해요! 우리는 방금 Python PDF 자동화 처리의 일곱 가지 마법 중 하나를 마스터했어요! PDF 구문 분석 및 텍스트 추출, PDF 병합 및 분할, PDF 양식 처리, PDF 문서 변환, PDF 워터마킹 및 서명, PDF 보고서 생성 및 OCR(광학 문자 인식)을 포함해요. 정말 진정한 오피스 마법사가 되셨네요! 파일 처리, 보고서 생성 또는 텍스트 추출, Python이 도와드릴 준비가 되어있어요.

<div class="content-ad"></div>

이 흥미로운 지식 포인트들과 재미있는 설명으로 파이썬 PDF 자동화의 세계에 매료되셨군요. 파이썬 지식에 대해 더 알고 싶다면 제 팔로우를 해주세요! 함께 파이썬의 끝없는 가능성을 탐험해봐요!