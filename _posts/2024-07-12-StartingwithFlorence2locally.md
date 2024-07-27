---
title: "로컬에서 Florence 2 시작하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-StartingwithFlorence2locally_0.png"
date: 2024-07-12 20:11
ogImage: 
  url: /TIL/assets/img/2024-07-12-StartingwithFlorence2locally_0.png
tag: Tech
originalTitle: "Starting with Florence 2 locally."
link: "https://medium.com/@alexbuzunov/starting-with-florence-2-locally-722f035caba1"
---


플로렌스-2는 Microsoft의 고급 비전 기반 모델로, 프롬프트 기반 방식을 사용하여 다양한 비전 및 비전-언어 작업을 처리하기 위해 설계되었습니다. 로컬에서 플로렌스-2를 설정하고 실행하는 데 도움이 되는 시작 스크립트가 여기 있어요.

![이미지](/TIL/assets/img/2024-07-12-StartingwithFlorence2locally_0.png)

# 시작 스크립트

플로렌스-2를 실행하는 데 사용할 수 있는 시작 스크립트입니다.

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

```python
import os
from transformers import AutoProcessor, AutoModelForCausalLM  
from PIL import Image
import requests
from unittest.mock import patch
from transformers.dynamic_module_utils import get_imports

def run_example(task_prompt, text_input=None):
    if text_input is None:
        prompt = task_prompt
    else:
        prompt = task_prompt + text_input
    inputs = processor(text=prompt, images=image, return_tensors="pt")
    generated_ids = model.generate(
        input_ids=inputs["input_ids"].cuda(),
        pixel_values=inputs["pixel_values"].cuda(),
        max_new_tokens=1024,
        early_stopping=False,
        do_sample=False,
        num_beams=3,
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]
    parsed_answer = processor.post_process_generation(
        generated_text, 
        task=task_prompt, 
        image_size=(image.width, image.height),
    )
    return parsed_answer

# Example usage
fn = 'ray_ban_meta.jpeg'
image = Image.open(fn)
task_prompt = '<MORE_DETAILED_CAPTION>'
ret = run_example(task_prompt)
print(ret)
```

## 너무 괴롭히지 마세요

만약 지역에서 실행하는 모든 시도 끝에도 이 예외를 받게 된다면: `pip install flash_attn`를 실행해 보세요.

```python
File "C:\Users\alex_\aichat\florence2_vision\myenv\lib\site-packages\transformers\dynamic_module_utils.py", line 182, in check_imports
    raise ImportError(
ImportError: 이 모델링 파일은 환경에 없는 다음 패키지가 필요합니다: flash_attn. `pip install flash_attn`을 실행해 보세요.
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

상태 코드를 Markdown 형식으로 변경하십시오.

```js
File "C:\Users\alex_\aichat\florence2_vision\myenv\lib\site-packages\flash_attn\flash_attn_interface.py", line 10, in <module>
    import flash_attn_2_cuda as flash_attn_cuda
ImportError: DLL load failed while importing flash_attn_2_cuda: The specified procedure could not be found.
```

청소한 상태에서 Miniconda를 사용하여 시작해 보세요.

# 깔끔한 환경 설정

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

다음과 같이 새로운 conda 환경을 만들어 보세요:

```js
conda create -n florence2 python=3.11 -y
conda activate florence2
```

CUDA 설치 여부 확인:

CUDA가 설치되어 있는지 확인해주세요:

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
nvcc --version

nvcc: NVIDIA (R) Cuda 컴파일러 드라이버
Copyright (c) 2005-2024 NVIDIA Corporation
2024년 4월 17일 수요일에 빌드됨
Cuda 컴파일 도구, 릴리즈 12.5, V12.5.40
빌드 cuda_12.5.r12.5/compiler.34177558_0
```

CUDA 경로 설정:

```js
set "CUDA_PATH=C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.5"
set "CUDA_HOME=C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.5"
```

PyTorch 및 종속성 설치하기:

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
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install transformers einops timm
```

# Flash 어텐션 불필요

transformers 의존성에서 요구되지도 않고 알려진 문제입니다.

이것이 해결책이에요:

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
# With Python 3.11.7, transformers==4.36.2
import os
from unittest.mock import patch

from transformers import AutoModelForCausalLM
from transformers.dynamic_module_utils import get_imports


def fixed_get_imports(filename: str | os.PathLike) -> list[str]:
    """https://huggingface.co/microsoft/phi-1_5/discussions/72을 위한 해결책."""
    if not str(filename).endswith("/modeling_phi.py"):
        return get_imports(filename)
    imports = get_imports(filename)
    imports.remove("flash_attn")
    return imports


with patch("transformers.dynamic_module_utils.get_imports", fixed_get_imports):
    model = AutoModelForCausalLM.from_pretrained("microsoft/phi-1_5", trust_remote_code=True)
```

# OCR 테스트

## 입력 이미지

<img src="/TIL/assets/img/2024-07-12-StartingwithFlorence2locally_1.png" />


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

다음은 스크립트를 실행한 후의 업데이트 내용입니다:

```js
D:\DEV\MODELS\modules\transformers_modules\microsoft\Florence-2-large-ft\3112cd2e25c969cfdcb600a01489c56737d943d3\modeling_florence2.py:1209: UserWarning: 1Torch was not compiled with flash attention. (Triggered internally at ..\aten\src\ATen\native\transformers\cuda\sdp_utils.cpp:455.)
  attn_output = torch.nn.functional.scaled_dot_product_attention(
{'<OCR>': '2310Z8MOOWN - RW4008 6015IC 26243-4003RCID 2AYOA-403'}
```

잘 작동합니다! 좀 그렇지만요. 일부 숫자가 누락되었지만, 그건 다음에 다시 이야기할 주제입니다.

# 마지막으로

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

이 단계를 따르면 어려움 없이 Florence-2를 로컬에서 실행할 수 있을 것입니다. 다른 문제가 발생하면 모든 의존성이 올바르게 설치되어 있는지, 환경이 올바르게 구성되어 있는지 확인해주세요.

# Hugging Face Spaces

환경을 로컬로 설정하기를 원치 않는다면 Hugging Face Spaces를 사용하여 Florence-2를 실행할 수도 있습니다. 이는 로컬 구성이 필요 없이 모델에 액세스할 수 있는 클라우드 기반 솔루션을 제공합니다. Hugging Face의 Florence-2 스페이스를 확인해보세요: Hugging Face Spaces

# 출처