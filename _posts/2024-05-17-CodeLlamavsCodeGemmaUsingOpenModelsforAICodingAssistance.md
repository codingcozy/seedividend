---
title: "CodeLlama vs CodeGemma, AI 코딩 어시스턴스에 오픈 모델 활용하기"
description: ""
coverImage: "/assets/img/2024-05-17-CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_0.png"
date: 2024-05-17 20:44
ogImage:
  url: /assets/img/2024-05-17-CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_0.png
tag: Tech
originalTitle: "CodeLlama vs. CodeGemma: Using Open Models for AI Coding Assistance"
link: "https://medium.com/towards-data-science/codellama-vs-codegemma-using-open-models-for-ai-coding-assistance-da446c9157b8"
isUpdated: true
---

<img src="/assets/img/2024-05-17-CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_0.png" />

AI 코딩 도구 시장은 수십억 달러의 산업입니다. 2030년까지 172억 달러에 이를 것으로 예상되며, 현재에도 VS Code 또는 JetBrains IDE용 AI 플러그인은 수백만 번 다운로드되었습니다. 하지만 무료 코딩 도우미로 로컬 모델을 실행할 수 있을까요? 그리고 그 성능은 어떨까요? 이 기사에서는 두 개의 오픈 모델, Code Gemma와 Code Llama를 테스트해 보겠습니다. 제 PC에 설치하고, 그들이 어떻게 작동하는지 확인할 것입니다.

더 이상의 말이 필요 없으니, 시작해 봅시다!

## 1. 모델들

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

본문 작성 시점에서 코딩 목적으로 두 가지 주요 오픈 모델이 무료로 다운로드할 수 있으며 사용할 수 있습니다:

- CodeLlama. 이 모델은 2023년 Meta에서 출시되었으며, 7B, 13B, 34B, 70B 크기로 제공됩니다. "Base", "Instruct", "Python" 모델을 사용할 수 있습니다. 4가지 크기이지만, 로컬에서 실제로 사용할 수 있는 것은 7B 및 13B 모델뿐입니다; 다른 크기는 너무 "무겁습니다."
- CodeGemma. 이 모델은 2024년 Google에서 출시되었으며, 2B 및 7B 크기로 제공됩니다. 2B 모델은 코드 완성을 위해 훈련되었으며, 7B 모델은 코드 채움 및 자연어 프롬프트를 위해 훈련되었습니다.

본문에서는 HuggingFace에서 제공되며 GGUF 형식으로 다운로드할 수 있는 7B 및 13B 모델을 테스트할 것이며, 이를 사용하여 다양한 앱에서 이 모델들을 사용할 수 있도록 OpenAI 호환 로컬 서버를 실행할 것입니다. 그러나 이를 수행하기 전에 단순히 모델을 Python으로 실행하여 무엇을 할 수 있는지 살펴보겠습니다. 실제 사용으로 넘어가고 싶은 독자분들은 이 부분을 건너뛸 수 있습니다.

두 모델을 테스트하기 위해 Google Colab 인스턴스를 무료로 사용할 것입니다. 먼저, 모델과 토크나이저를 로드해보겠습니다:

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

```python
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import transformers
import torch


model_id = "..."
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=False,
)

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="cuda",
    torch_dtype=torch.bfloat16,
)
```

HuggingFace의 Transformers 라이브러리는 모델 파일을 자동으로 다운로드해줍니다. 7B 모델은 약 16.2 GB의 GPU RAM을 필요로 하지만, bits and bytes 라이브러리를 활용하여 4비트 해상도로 모델을 실행하면 필요한 메모리 용량은 약 5GB 정도로 줄어듭니다.

이제 모델을 테스트하기 위한 코드 조각을 만들어 봅시다. 예를 들어, 문자열 목록을 파일에 작성하는 Python 메서드를 작성해보겠습니다:

```python
python_code = """
class Writer:
   def write_file(self, filename: str, data: List[str]):
        \"\"\" Write list of strings to a text file \"\"\"
        with open(filename, 'w') as f_out:
            for line in data:
                f_out.write(f"{line}\n")
"""
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

모델의 코딩 능력을 테스트하기 위해, 두 모델에게 "pytest"를 만들도록 요청해보겠습니다:

```js
chat = [{
    "role": "user",
    "content": f"이 파이썬 메소드에 대한 pytest를 작성해주세요:\n{python_code}. "\
               f"테스트가 끝나면 생성된 파일을 삭제하세요."
    }]


prompt = tokenizer.apply_chat_template(chat, tokenize=False, add_generation_prompt=True)
inputs = tokenizer.encode(prompt, add_special_tokens=False, return_tensors="pt")
outputs = model.generate(input_ids=inputs.to(model.device), max_new_tokens=1024)
result = tokenizer.decode(outputs[0])
```

결과적으로, CodeLlama 7B가 이 코드를 생성했고, 이 과정은 19초가 걸렸습니다:

```js
import pytest


class TestWriter:
    def test_write_file(self):
        writer = Writer()
        filename = 'test.txt'
        data = ['line1', 'line2', 'line3']
        writer.write_file(filename, data)
        with open(filename, 'r') as f:
            lines = f.readlines()
            assert lines == data
        os.remove(filename)
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

CodeGemma이 이 코드를 생성했고, 프로세스에는 16초가 걸렸어요:

```js
import pytest


def test_write_file():
    """ write_file 메소드를 테스트함 """
    filename = "test.txt"
    data = ["This is a test", "line 2", "line 3"]
    Writer().write_file(filename, data)

    with open(filename, "r") as f:
        assert f.read() == "This is a test\nline 2\nline 3\n"

    import os
    os.remove(filename)
```

개인적으로, 저는 두 번째 버전을 선호해요. 첫째, CodeGemma가 메소드의 설명을 나타내는 docstring을 제공했고, 이는 현대적인 "linter" 도구의 요구 사항이에요. 둘째, Writer().write_file(...) 코드는 writer 변수를 선언하고 나중에 사용하는 것보다 더 간결하고 가독성이 좋아 보여요. 셋째, CodeGemma는 "os" 파이썬 모듈을 가져왔는데, CodeLlama는 이를 "잊어버렸어요".

첫눈에는 두 코드 조각이 모두 올바르게 보여요. pytest -v file.py 명령을 실행하여 코드를 실행해 보겠습니다:

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

<img src="/assets/img/2024-05-17-CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_1.png" />

실제로 두 테스트의 정확성에 대해 잘못 이야기 했었고, 첫 번째 테스트에 버그가 있습니다. 재미있게도, 두 번째 테스트는 뿐만 아니라 더 나은 모습을 하고 있으며, 작동하기도 합니다. 그 반면 첫 번째는 작동하지 않습니다. 스크린샷에서 오류는 명백합니다. 독자들은 자신의 힘으로 어떻게 수정할지 찾아보세요.

처음에는 CodeGemma 2B "코드 완성" 모델을 테스트할 계획이 없었지만, 독자들을 위한 추가 혜택으로 해보자구요! 모델을 로드하는 방법은 동일합니다. 오직 모델 ID만 바꾸면 됩니다:

```js
model_id = "google/codegemma-2b"
model = AutoModelForCausalLM.from_pretrained(model_id, ...)
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

아래는 코드 완성을 위해 훈련된 모델입니다. 영어 설명이 없어도 되며, 소스 코드만 제공하면 됩니다:

```js
# Prompt
python_code = """
class Writer:
   def write_file(self, filename: str, data: List[str]):
      ...

import pytest

def test_write_file():
    \"\"\"\ Test the write_file method \"\"\"
"""

prompt = f"""
<|fim_prefix|>{python_code}
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

우리가 볼 수 있듯이 해당 코드는 "그대로 사용"되지 않을 것입니다. 하지만 논리는 올바른 것으로 보입니다. 필요한 수정은 assert 라인을 올바르게 포맷하는 것입니다:

```js
assert lines == ["Hello\n", "World\n"]
```

이후에 "pytest"가 통과되었습니다. 모델은 테스트 이후 파일을 제거하지 않았지만, 나는 프롬프트에서 그것을 요청하지 않았습니다. 마지막으로, 소형 모델의 실행 시간은 단지 3.3초로, 더 큰 모델과 비교했을 때 약 5배 빠릅니다.

## 2. 람마 서버 실행

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

우리는 파이썬에서 모델을 테스트했고, 이제 로컬 OpenAI 호환 서버를 실행해볼 차례입니다. 이를 위해 Llama-cpp-python을 사용할 거예요. 이 프로젝트는 멋지고 가벼워요. 한 줄의 명령어로 우리가 원하는 어떤 모델이든 실행할 수 있어요:

```js
# 코드 Gemma
python3 -m llama_cpp.server --model codegemma-7b-it-Q4_K_M.gguf --n_ctx 8192 --n_gpu_layers -1 --host 0.0.0.0 --port 8000

# 코드 Llama 7B
python3 -m llama_cpp.server --model codellama-7b-instruct.Q4_K_M.gguf --n_ctx 8192 --n_gpu_layers -1 --host 0.0.0.0 --port 8000

# 코드 Llama 13B
python3 -m llama_cpp.server --model codellama-13b-instruct.Q4_K_M.gguf --n_ctx 8192 --n_gpu_layers -1 --host 0.0.0.0 --port 8000
```

모델을 로드할 GPU RAM이 충분하지 않으면, n_gpu_layers 매개변수를 변경하여 GPU에 일부 레이어만 로드할 수 있어요. 또한 Apple Silicon이나 심지어 CPU에서 모델을 실행할 수도 있지만 물론 느릴 거예요.

## 3. 앱들

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

지금은 로컬 OpenAI 호환 서버가 있으며 몇 가지 앱을 테스트할 준비가 되어 있습니다!

### 3.1 AI Shell

AI Shell은 자연어 프롬프트를 콘솔 명령어로 변환할 수 있는 오픈 소스 앱입니다. 이 앱은 꽤 인기가 있으며 작성 당시 프로젝트는 GitHub에서 3.6K개의 스타를 받았습니다. AI Shell은 TypeScript로 작성되었으며 npm 패키지 관리자를 통해 이 앱을 설치할 수 있습니다 (저는 여기서 Node JS 20.13.0도 설치했습니다):

```js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install v20.13.0
npm install -g @builder.io/ai-shell
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

앱을 실행하기 전에 API 엔드포인트를 구성해야 합니다:

```js
ai config set OPENAI_KEY=12345678
ai config set OPENAI_API_ENDPOINT=http://127.0.0.1:8000/v1
```

이제 콘솔에서 "ai chat" 명령을 입력하여 언제든지 모델과 대화를 시작할 수 있습니다:

![대화 모델](https://miro.medium.com/v2/resize:fit:1400/1*9zJpuyFx_-HW4AZ4b9ZH8A.gif)

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

프로그램을 사용하는 또 다른 방법은 실행하려는 명령어를 입력하는 것입니다. 예를 들어, "현재 폴더에 있는 파일 표시"와 같은 내용을 입력할 수 있어요:

![image](https://miro.medium.com/v2/resize:fit:1400/1*4PElpWscaef11mHRzCdZ5Q.gif)

안타깝게도 무료 7B 모델로는 작동하지 않았고, 모델이 올바른 쉘 명령어를 생성하지 못했어요. 또한 프롬프트 안에 있는 "스크립트"라는 단어가 모델을 혼란스럽게 만들었고, 영화 대본과 관련된 텍스트를 생성했어요.

이 문제는 아마도 프롬프트를 조정하여 해결할 수 있겠죠. 그러나 이 텍스트를 작성할 때에는 프롬프트가 TypeScript 소스에 하드코딩되어 있어 쉽게 구성할 수 없었어요. 아직까지 GitHub에서 제 기능 제안에 응답한 사람이 없지만, 향후 개선될 것을 희망해요.

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

3.2 ShellGPT

ShellGPT는 이 텍스트를 작성하는 시점에서 GitHub에서 8.3K개의 스타를 가진 또 다른 흥미로운 오픈소스 프로젝트입니다. 우리는 다음과 같이 pip를 사용하여 쉽게 응용 프로그램을 설치할 수 있습니다:

```js
pip3 install shell-gpt
```

로컬 모델과 함께 ShellGPT를 사용하려면 ~/.config/shell_gpt/.sgptrc 파일에서 API 엔드포인트를 변경해야 합니다.

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
API_BASE_URL=http://127.0.0.1:8000/v1
OPENAI_API_KEY=12345678
```

그럼 이제 우리는 이전 앱과 거의 같은 방식으로 터미널 쉘에 직접 요청을 입력할 수 있어요:

```js
sgpt "로컬 파일을 표시하는 명령어를 작성해주세요"
```

안타깝게도, CodeGemma 모델은 ShellGPT에서 작동하지 않았고, LlamaCpp 서버는 Server 500 오류를 반환했어요: '시스템 역할이 지원되지 않음'. 처음에는 LlamaCpp 문제인 줄 알았지만 로그를 확인한 후에는 모델 메타데이터에 이런 라인이 있는 것을 보았어요:

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
{ if messages[0]['role'] == 'system' }
  { raise_exception('시스템 역할은 지원되지 않습니다')
```

코드젬마가 "시스템" 역할을 지원하지 않는 것은 안타깝습니다. 왜냐하면 OpenAI API에서 널리 사용되기 때문입니다. 따라서 OpenAI 호환 앱은 코드젬마를 사용할 수 없습니다. 이전에 보았던 것처럼, 코드젬마가 생성한 코드는 꽤 좋았기 때문에 아쉽습니다.

코드람마에 대한 셸GPT는 잘 작동합니다:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*N6gwsFM7ZNt7OW2sZcaNZg.gif)

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

터미널 셸에서 '—shell' 접두어를 지정하여 명령을 직접 실행하는 기능이 편리합니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*xTTNTI0Ykh8NGuqkIpwLVg.gif)

더 개선할 공간이 있습니다. 예를 들어, "문서 폴더의 크기 표시하기" 프롬프트에 대한 du -sh ~/Documents 응답이 반환됩니다. 이것은 올바른 bash 명령어입니다. 그러나 ShellGPT는 문자열에서 해당 명령을 가져오지 못했고 "명령을 찾을 수 없음" 오류만 받았습니다.

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

bash 명령어를 사용하는 것도 유용하지만, 실제 코딩 지원은 어떨까요? 오픈소스 CodeGPT 플러그인을 통해 이를 할 수 있어요. 먼저, PyCharm IDE에 플러그인을 설치하고 LlamaCpp와 함께 사용할 수 있도록 설정했어요:

![CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance](/assets/img/2024-05-17-CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_2.png)

예를 들어, 다음과 같은 Python 클래스를 고려해봅시다:

```js
class ServerConnection:
    """ Server connection handling """

    def __init__(self):
        self.is_connected = False
        self.connection_time = -1
        self.uploads_total = 0
        self.reconnects_total = 0
        self.reconnect_threshold_sec = 64
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

저는 모델에게 변수를 따로 Python 데이터 클래스로 리팩터링하도록 요청할 것입니다.

결과적으로 CodeGemma는 이를 수행하지 못했으며 "시스템 역할을 지원하지 않음"이라는 오류가 발생했습니다. CodeLlama 7B는 작업을 완료할 수 없었고 대신에 데이터 클래스 대신 표준 클래스를 생성했습니다. 반면에 CodeLlama 13B는 잘 수행했습니다:

![이미지](/assets/img/2024-05-17-CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_3.png)

다음 단계로, 더 복잡한 내용을 요청하고 텍스트 필드와 버튼 프롬프트가 있는 UI Python 애플리케이션을 만들어보았습니다. Llama 13B 모델이 이 코드를 생성했습니다:

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

```python
import tkinter as tk

# 메인 창 생성
root = tk.Tk()
root.title("Hello World")
root.geometry("320x200")

# 텍스트 필드 생성
text_field = tk.Entry(root)
text_field.pack()

# 버튼 생성
button = tk.Button(root, text="Click Me!", command=lambda: print("You clicked the button!"))
button.pack()

# 메인 루프 시작
root.mainloop()
```

코드는 올바르지만, 애플리케이션 창이 보이지 않았습니다. 크기가 지정되지 않았습니다. 나는 모델에게 제목을 "Hello World"로 변경하고 창 크기를 320x200으로 설정하도록 요청했습니다:

<img src="/assets/img/2024-05-17-CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_4.png" />

결과가 적절하게 나와 요청한 애플리케이션이 예상대로 작동했습니다.

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

![CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_5](/assets/img/2024-05-17-CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_5.png)

저는 13B 모델이 완벽하지 않다는 것을 인정해야합니다. 이론적으로는 큰 컨텍스트 창과 이전 채팅 결과를 사용해야 하지만, 제가 모델에게 생성된 코드를 클래스로 이동하도록 요청했을 때 창 크기나 제목을 설정하지 않은 새로운 코드를 생성했습니다:

```js
import tkinter as tk

class HelloWorld(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.pack()

        # 텍스트 필드 생성
        self.text_field = tk.Entry(self)
        self.text_field.pack()

        # 버튼 생성
        self.button = tk.Button(self, text="Click Me!", command=lambda: print("Button clicked!"))
        self.button.pack()


if __name__ == "__main__":
    root = tk.Tk()
    app = HelloWorld(root)
    root.mainloop()
```

하지만 일반적으로 말하자면, 모델이 정확한 클래스를 생성했으며 조금의 복사 붙여넣기로 작업을 완료하는 것이 쉬웠습니다.

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

## 4. 단점

지금까지 모든 예시를 통해 모델이 작동하는 것을 확인할 수 있습니다; 코드와 bash 명령을 모두 생성할 수 있습니다. 그러나 몇 가지 단점과 문제점도 있습니다:

- 로컬 LLM 인스턴스를 사용하려면 좋은 그래픽 카드가 필요합니다. 저는 2.5년 전에 구매한 8GB GPU RAM을 갖춘 GeForce RTX 3060 카드를 사용하고 있습니다. Colab 테스트에서는 8 GB가 7B 모델을 실행하는 데 충분하다는 것을 확인했지만, 실제 데스크탑에서는 그 용량이 부족했습니다. OS 자체도 일부 GPU를 필요로 하기 때문입니다. 실제로 13B 모델을 실행하려면 적어도 16 GB의 GPU RAM이 필요하며, 미래 개선을 위한 여유 공간으로 24 GB가 필요합니다. 현실적으로 고려할만 한가요? 현재 GPU 가격을 고려할 때, 1000-1500달러에는 AI 구독을 여러 년간 할 수 있습니다.
- 오픈 소스 앱은 완벽하지 않습니다. 제 테스트에서 LlamaCpp 서버는 때로 "segmentation fault"와 함께 충돌하고, CodeGPT 앱은 때로는 모델에 요청을 전송하지 않았고, PyCharm을 재시작해야 했고 등등 발생했습니다. 이것은 오픈 소스이며 어떤 종류의 보장도 없으므로 불평할 것이 아니지만, 이러한 AI 도구들에 대해서는 아직 "초기 채택" 단계에 있다는 것을 인정해야 합니다.
- 또한 대형 로컬 언어 모델 실행은 에너지를 많이 소비하는 작업입니다. 마지막 테스트로 내 데스크톱 PC에 전력계를 연결했습니다. 평상시에는 약 80 와트를 소비하는 것으로 나타났습니다. 하지만 LLM 요청이 실행될 때는 에너지 소비량이 거의 3배 증가합니다:

![이미지](/assets/img/2024-05-17-CodeLlamavsCodeGemmaUsingOpenModelsforAICodingAssistance_6.png)

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

## 결론

본 기사에서는 오픈 언어 모델이 코딩 어시스턴트로서 작동하는 능력을 테스트하였고, 결과는 흥미로웠습니다:

- 작은 7B 및 13B 모델조차도 리팩토링, 단위 테스트 생성 또는 작은 코드 템플릿 작성과 같은 일부 코딩 작업을 수행할 수 있습니다. 물론, 이러한 모델들은 175B ChatGPT 3.5와 같이 큰 모델에 비해 능력이 떨어지지만, 로컬 모델을 사용하는 것은 구독 비용이 필요하지 않을 뿐만 아니라, 개인 정보 관점에서 빠르고 효율적일 수도 있습니다.
- 반면에 로컬 모델을 실행하려면 고사양의 하드웨어가 필요하며, 이는 비용 부담뿐만 아니라 에너지 소모도 초래할 수 있습니다. 본 기사 작성 시, 고사양 GPU는 최대 $1500에 이를 수 있으며, 이는 로컬 LLMs만 실행하기에는 현실적이지 않습니다 — 해당 비용으로 클라우드 서비스 구독을 매우 오랜 기간 동안 이용할 수 있습니다.
- AI 도구를 사용하는 도전 과제는 하드웨어뿐만 아니라 소프트웨어에도 있습니다. 최소한 본 게시물 작성 시점에는 AI 소프트웨어의 오픈 소스 생태계가 아직 미성숙한 것으로 나타났습니다. HuggingFace에서 39,769개의 오픈 7B 모델을 발견했으나 GitHub에서의 오픈 소스 AI 앱 수는 미미합니다. 이 기사에서 설명한 3가지가 거의 제가 찾아낸 전부였습니다 (만약 놓친 것이 있다면, 아래 댓글에 쓰거나, 추가 리뷰를 진행할지도 모릅니다).

일반적으로 일상적인 코딩 작업에 로컬 LLM을 사용하는 것은 가능하지만, 소프트웨어와 하드웨어 모두에서 여전히 많은 도전 과제가 있음을 알 수 있습니다. 더 나은 AI 칩 및 효율적인 모델을 위해 노력하고 있는 다른 기업들이 있음도 알고 있습니다. Microsoft의 Phi-3와 같은 새로운 모델은 이제 모바일 하드웨어에서도 작동할 수 있습니다. 그것이 AI 산업을 어떻게 바꿀지 어떻게 알 수 있을까요? 다음 세대의 통합 그래픽 카드는 저렴하고 조용하며 CUDA 호환될 것인가요? 아직 모릅니다. 분명히 새로운 AI 관련 하드웨어가 발표될 것이며 (M4가 이미 첫 번째였습니다), 적어도 오픈 사용을 위한 드라이버 없이 독점적인 새 하드웨어가 되지 않기를 희망합니다.

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

읽어 주셔서 감사합니다. 이야기가 마음에 드셨다면 Medium에 구독해보세요. 그러면 새 기사가 발행될 때 알림을 받을 수 있을 뿐만 아니라 수천 편의 다른 작가들의 이야기에도 완전한 접속 권한을 얻을 수 있습니다. 또한 LinkedIn을 통해 연락하실 수도 있습니다. 거기에서는 전체 기사로 충분치 않은 작은 포스트를 주기적으로 발행하고 있습니다. 이번 포스트와 다른 포스트의 전체 소스 코드를 원하신다면 Patreon 페이지를 방문해보세요.

자연어 처리와 언어 모델을 사용하는 것에 관심이 있는 분들은 다른 논문들도 읽어보세요:

- GPT 모델: 어떻게 작동합니까?
- 16, 8 및 4비트 부동 소수점 형식 - 어떻게 작동합니까?
- 대규모 언어 모델로 판다 데이터프레임 처리하기
- 주말 AI 프로젝트 (제1부): 라즈베리 파이에서 음성 인식 및 LLaMA-2 GPT 실행
- 주말 AI 프로젝트 (제2부): 음성 인식, PTT 및 라지 액션 모델을 라즈베리 파이에서 사용하기
- 주말 AI 프로젝트 (제3부): 시각 장애인을 위한 시각 보조 도구 만들기
