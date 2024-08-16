---
title: "파이썬에서 HTML을 PDF로 변환하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to Convert HTML to PDF in Python"
link: "https://cloudmersive.medium.com/how-to-convert-html-to-pdf-in-python-42cc39d68270"
isUpdated: true
---






HTML을 PDF로 쉽게 변환하는 방법은 무료 API를 호출하여 보완적인 코드 예제를 사용하는 것입니다.

![이미지](/assets/img/How-to-Convert-HTML-to-PDF-in-Python_0.png)

API 호출을 구조화하기 위해 먼저 클라이언트 SDK를 설치해봅시다. 다음 명령어를 사용하세요:

```js
pip install cloudmersive-convert-api-client
```

<div class="content-ad"></div>

그 후에, 가져오기와 함수 호출을 추가하세요. input_file 변수에 HTML 파일 경로를 포함하고, 배경 그래픽을 포함하고 스케일 요소를 설정하는 옵션을 사용자 정의해 봅시다:

```js
from __future__ import print_function
import time
import cloudmersive_convert_api_client
from cloudmersive_convert_api_client.rest import ApiException
from pprint import pprint

# API 키를 구성합니다. Apikey로 API 키 승인을 설정합니다.
configuration = cloudmersive_convert_api_client.Configuration()
configuration.api_key['Apikey'] = 'YOUR_API_KEY'

# API 클래스의 인스턴스를 생성합니다.
api_instance = cloudmersive_convert_api_client.ConvertDocumentApi(cloudmersive_convert_api_client.ApiClient(configuration))
input_file = '/path/to/inputfile' # file | 작업을 수행할 입력 파일.
include_background_graphics = true # bool | 선택 사양: PDF에 배경 그래픽을 포함하려면 true로 설정하거나 포함하지 않으려면 false로 설정하세요. 기본값은 true입니다. (선택 사양)
scale_factor = 56 # int | 선택 사양: 100으로 확대하여 100%로 확대하고 50%로 축소하려면 50%로 설정하고, 200%로 확대하려면 200%로 설정하세요. 기본값은 100%입니다. 최대값은 1000%입니다. (선택 사양)

try:
    # HTML 문서 파일을 PDF 문서로 변환합니다.
    api_response = api_instance.convert_document_html_to_pdf(input_file, include_background_graphics=include_background_graphics, scale_factor=scale_factor)
    pprint(api_response)
except ApiException as e:
    print("ConvertDocumentApi->convert_document_html_to_pdf 호출 시 예외 발생: %s\n" % e)
```

API 호출을 승인하려면 무료 Cloudmersive API 키만 있으면 됩니다. 이를 통해 매월 800회의 API 호출을 제로 요청으로 이용할 수 있습니다.

그렇게 간단히, 모든 준비가 끝났습니다 — 더 이상의 코드 작성은 필요하지 않습니다.