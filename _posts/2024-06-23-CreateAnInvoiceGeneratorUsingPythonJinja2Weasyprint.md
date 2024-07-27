---
title: "파이썬, Jinja2, Weasyprint를 사용한 인보이스 생성기 만들기"
description: ""
coverImage: "/assets/img/2024-06-23-CreateAnInvoiceGeneratorUsingPythonJinja2Weasyprint_0.png"
date: 2024-06-23 14:41
ogImage: 
  url: /assets/img/2024-06-23-CreateAnInvoiceGeneratorUsingPythonJinja2Weasyprint_0.png
tag: Tech
originalTitle: "Create An Invoice Generator Using Python, Jinja2 , Weasyprint"
link: "https://medium.com/@hammad.ai/create-an-invoice-generator-using-python-jinja2-weasyprint-48ef1f450ac5"
---


프리랜서 프로젝트로 작은 작업을 부탁받을 때는 어떻게 하시나요?

고객에게 할 작업과 해당 작업에 대한 비용을 나열한 송장을 작성합니다. 이를 통해 작업 범위를 세부적으로 설명하고 해당 비용에 대해 투명하게 고객에게 알림을 줍니다. 이는 비즈니스 거래에서 명확성과 공정성에 대한 당신의 헌신을 보여줍니다.

프리랜서 고객과 거래할 때 전문성에 기여하는 다른 요소들이 많지만, 실제로 신경 쓸 필요가 없는 기능으로 여러 기능이 넘치는 완벽한 송장 솔루션 대신 사용할 도구로 이것을 선택했습니다.

이 작업을 위한 빠르고 간편한 솔루션이 필요했기 때문에 이 스크립트를 만들었고, 정확히 어떻게 만들었는지 보여드릴게요.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-23-CreateAnInvoiceGeneratorUsingPythonJinja2Weasyprint_0.png" />

# 랜드스케이프

저는 단순함을 유지하고 싶었어요... 정말 한없이 단순하게. 보통 제가 하는 것과 같이 OOP 방식을 선택하는 대신 함수를 만들었어요. 그러나 다소 사용자 정의할 수 있도록 하기 위해 invoice를 설정하는 방법에 대한 구성이 담긴 settings.py를 추가했어요.

invoice 자체는 jinja2 구문으로 작성된 HTML 파일입니다. 이 템플릿에 렌더링되는 데이터는 data.json에서 제공됩니다.

<div class="content-ad"></div>

당연히 나는 render_template()를 팩토리로 사용하는 원시적인 팩토리 디자인 패턴을 선택했고 이는 invoice_gen.py 내에 있습니다.

각 파일이 의도된 용도는 다음과 같습니다:

- data.json 👉 Jinja 템플릿으로 렌더링 될 데이터를 포함합니다.
- invoice_gen.py 👉 팩토리로 작용하여 송장을 생성하는 스크립트 파일입니다.
- settings.py 👉 HTML 템플릿의 구성을 포함합니다.

조금 더 이해하기 쉽게 하기 위해 아래 다이어그램에서 어떻게 작동하는지 설명했습니다:

<div class="content-ad"></div>

# 기술

다음을 사용하고 있습니다:

- Jinja
- WeasyPrint

# 데이터 파일

<div class="content-ad"></div>

이건 저희가 템플릿에 렌더링하려는 모든 정보를 포함한 JSON 파일입니다. 제 파일은 다음과 같은 형식을 가지고 있어요:

```js
{
    "title": "서비스 청구서",
    "invoiceNumber": 13,
    "issueDate": "2023년 11월 12일",
    "dueDate": "2023년 12월 18일",
    "status": "만기",

...

    "server": {
        "logo": "로고/경로.png",
        "companyName": "Hammad의 회사",
        "firstName": "M. Hammad",
        "lastName": "Hassan",
        "address": {
            "city": "신드주 카라치",
            "country": "파키스탄"
        },
        "email": "hammad.hassan@localhost.com",
        "profileURL": {
            "url": "https://www.upwork.com/freelancers/~01f9b5bc6f481f0385",
            "displayText": "Upwork의 Hammad"
        }
    },
    "itemList": [
        {
            "title": "파이썬 코스",
            "description": "시작하기에 좋은 파이썬 기초 코스",
            "isFixedPrice": false,
            "rate": 10,
            "hours": 15
        },
        {
            "title": "HTML/CSS/JS",
            "description": "초보자용 프론트엔드 코스",
            "isFixedPrice": false,
            "rate": 6,
            "hours": 10
        }
    ],
    "moderatorCharges": 0.1,
    "percentIncreaseAfterDueDate": 0.05

...

}
```

위의 JSON 파일은 제가 사용하는 실제 파일의 간략한 버전입니다.

# 주요 스크립트

<div class="content-ad"></div>

data.json 파일에 정의된 데이터 세트에서 송장을 생성하는 프로세스는 송장을 만들기 위해 여러 리소스를 사용합니다. 클라이언트에게 보낼 수 있는 송장을 생성합니다.

먼저 의존성을 가져와야 합니다.

```js
from jinja2 import Template
import json
```

그런 다음, Jinja HTML 템플릿에 일부 컨텍스트를 삽입하는 함수를 작성하고 나중에 이러한 템플릿을 pdf로 변환할 것입니다.

<div class="content-ad"></div>

```python
def render_template(
    template_file: str, 
    context: dict, 
    styles: list, 
    output_filename: str
) -> str:
    
    # 템플릿 파일을 가져와 컨텍스트 변수를 사용하여 렌더링합니다.
    template = Template(template_file)
    rendered_html = template.render(context)

    # 출력 파일의 이름을 설정합니다.
    html_file = f"{output_filename}.html"
    pdf_file = f"{output_filename}.pdf"

    # HTML 콘텐츠를 파일에 기록합니다.
    with open(html_file, 'w') as file:
        file.write(rendered_html)

    # WeasyPrint를 사용하여 HTML을 PDF로 변환합니다.
    HTML(html_file).write_pdf(pdf_file, stylesheets=styles)

    # 파일 이름을 반환합니다.
    return pdf_file
```

이제 동일한 스크립트 파일 내에서 템플릿을 렌더링하는 데 필요한 에셋을 로드합니다.

```python
# 컨텍스트 데이터 로드
context_data = {}
with open("./data.json") as data:
    context_data = get_context_data(json.load(data))
    
# Jinja 템플릿 로드
template_html = ""
with open(TEMPLATE_HTML_PATH) as template:
    template_html = template.read()

# 템플릿을 렌더링하고 PDF를 생성합니다.
pdf_filename = render_template(template_html, context_data, TEMPLATE_CSS, OUTPUT_FILENAME)
print(f"PDF 생성됨: {pdf_filename}")
```

get_context_data() 함수에서 컨텍스트 데이터를 불러오고, 이 함수는 settings.py에 위치합니다. 이 함수는 파이썬 딕셔너리 하나를 매개변수로 받습니다. 이 딕셔너리는 data.json에서 가져옵니다.

<div class="content-ad"></div>

우리는 또한 Jinja 템플릿(HTML 파일)을 로드하고 'with' 키워드와 'open' 함수를 사용하여 내용을 읽습니다. TEMPLATE_HTML_PATH는 settings.py에서 왔는데, 이는 다음 섹션에서 설명됩니다.

마지막으로, 우리는 render_template() 함수를 호출하여 그 마법을 일으킵니다.

# 설정 파일

이 파일에는 스크립트의 모든 사용자 정의 가능한 부분이 포함되어 있습니다. 따라서 위에서 언급한 스크립트의 결과를 변경하고 싶다면, 이 파일을 변경하면 됩니다.

<div class="content-ad"></div>

의존성을 가져오세요. 이제 weasyprint가 포함되어 있습니다.

```js
from weasyprint import HTML, CSS
from datetime import datetime
```

이 파일에는 변수 3개와 함수 하나만 포함되어 있습니다.

```js
OUTPUT_FILENAME = f"output-{datetime.now().strftime('%d-%b-%Y')}"
TEMPLATE_HTML_PATH = "./invoice_template_002.html"

TEMPLATE_CSS = [
    CSS("./invoice_template_002.css"),
    CSS("https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" ),
    CSS("https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" )
]
```

<div class="content-ad"></div>

첫 두 변수는 설명이 분명하기 때문에 그에 대해 많은 시간을 낭비하지 않을 겁니다.

그러나 TEMPLATE_CSS는 weasyprint 라이브러리에서 가져온 CSS 개체의 목록입니다.

이 목록에는 필요한 만큼 많은 CSS 모듈을 추가할 수 있으며 모두 HTML 템플릿에 적용됩니다.

이 목록의 첫 번째 요소는 제 개인적인 사용자 정의 CSS이므로 상대 경로를 갖고 있습니다. 다른 두 개는 Bootstrap 및 Font Awesome CDNs에서 가져온 링크입니다.

<div class="content-ad"></div>

```python
def get_context_data(context_json:dict)->dict:
    """이 함수는 data.json에서 가져온 컨텍스트를 조작합니다."""
    context_json['issueDate'] = datetime.strptime(context_json['issueDate'], '%d-%m-%Y').strftime('%d-%m-%Y')
    context_json['dueDate'] = datetime.strptime(context_json['dueDate'], '%d-%m-%Y').strftime('%d-%m-%Y')
    context_json['invoiceDate'] = datetime.strptime(context_json['issueDate'], '%d-%m-%Y').strftime('%B')
    return context_json
```

get_context_data()는 정확히 그 이름이 의미하는 대로 동작합니다. 이 함수는 컨텍스트 데이터를 가져오고, 사용자가 해당 데이터를 조작할 수 있도록 해주며, 수식을 적용하고 계산을 수행한 다음 데이터를 Python 사전 형태로 반환합니다.

나는 이 함수를 사용했는데, data.json에는 많은 정보가 있지만, 계산이 필요한 데이터를 넣지 않았기 때문이다. 예를 들어, 송장에 판매 중인 다양한 제품이 있을 수 있지만, 고객에게 청구하는 총 금액은 하드 코딩하는 대신 계산되어야 합니다.

하지만 위의 함수에서 그중 어떤 것도 계산하지는 않았습니다. 그 이유는 저는 계산을 Jinja 템플릿 내에서 수행하기로 선택했기 때문입니다.


<div class="content-ad"></div>

어찌되었든, 여기저기 숫자를 하드 코딩하진 않아요.

너무 많은 공간을 차지하기 때문에 템플릿 파일은 여기에 포함하지 않겠습니다. 그러나 완전한 코드를 확인하려면 내 GitHub 저장소를 확인해주세요.

# GitHub 저장소

# 샘플 미리보기

<div class="content-ad"></div>

<img src="/assets/img/2024-06-23-CreateAnInvoiceGeneratorUsingPythonJinja2Weasyprint_1.png" />

위는 제가 제공한 공장 코드로 할 수 있는 가능성 중 하나입니다. 예를 들어, 인증서를 만들거나 CSS로 스타일을 지정하고 data.json에 수령인의 이름을 넣을 수도 있습니다.

즐겁게 사용하시기 바랍니다.

만약 이 글이 도움이 되었고 새로운 것을 배웠다면 👏을 남겨주시거나 제게 알려주셔요 📣. 여러분의 피드백을 듣고 싶어합니다.