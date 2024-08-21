---
title: "우아하게 Docker로 Python 환경 설정하기  따라하기 쉽게"
description: ""
coverImage: "/assets/img/2024-07-10-SettingADockerizedPythonEnvironmentTheElegantWay_0.png"
date: 2024-07-10 02:45
ogImage:
  url: /assets/img/2024-07-10-SettingADockerizedPythonEnvironmentTheElegantWay_0.png
tag: Tech
originalTitle: "Setting A Dockerized Python Environment — The Elegant Way"
link: "https://medium.com/towards-data-science/setting-a-dockerized-python-environment-the-elegant-way-f716ef85571d"
isUpdated: true
---

이 게시물은 VScode 및 Dev Containers 확장 프로그램을 사용하여 Python 도커화 개발 환경을 설정하는 단계별 가이드를 제공합니다.

이 주제에 대한 이전 게시물인 "도커화된 Python 환경 설정하는 방법 - 어렵게"에서는 명령줄 인터페이스(CLI)를 통해 도커화된 Python 개발 환경을 설정하는 방법을 살펴보았습니다. 이번 게시물에서는 VScode 및 Dev Containers 확장 프로그램을 사용하여 더 우아하고 견고한 방법으로 도커화된 Python 개발 환경을 설정하는 방법을 다룰 것입니다.

관련 기사들:

이 자습서를 마치면, 간단한 Python 개발 환경을 VScode와 Dev Containers 확장 프로그램을 사용하여 설정할 수 있게 될 것입니다.

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

![이미지](/assets/img/2024-07-10-SettingADockerizedPythonEnvironmentTheElegantWay_0.png)

# 준비물

이 튜토리얼을 따라하기 위해서는 다음이 필요합니다:

- macOS 또는 Windows OS 기계를 사용하는 경우 Docker Desktop(또는 동등한 제품), 또는 Linux OS를 사용하는 경우 Docker가 설치되어 있어야 합니다.
- Docker Hub 계정으로부터 이미지를 가져오기 위해
- VScode IDE 및 Dev Containers 확장 기능이 설치되어 있어야 합니다.

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

이 튜토리얼에서는 공식 Python 이미지인 python:3.10을 사용할 것입니다.

본 포스트의 모든 코드 예제는 여기에서 확인할 수 있습니다.

# 데브 컨테이너 익스텐션

시작하기 전에, 먼저 데브 컨테이너 익스텐션이 무엇이며 언제 사용해야 하는지 설명하겠습니다.

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

간단히 말해, VScode Dev Containers 확장 기능은 도커 컨테이너 내부에서 격리된 VScode 세션을 원활하게 열 수 있게 해줍니다. 격리 수준은 다음 세 가지 레이어를 포함합니다:

- 환경
- VScode 설정
- VScode 확장 프로그램

devcontainer.json 파일을 통해 세션 설정을 정의하고 위의 세 가지 레이어를 설정하고 정의할 수 있습니다.

Dev Containers 확장 기능을 사용하여 프로젝트 폴더를 컨테이너 내에서 설정하고 실행하려면 아래 두 가지 구성 요소가 필요합니다:

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

- Dev Containers 확장 프로그램을 설치하세요.
- 프로젝트 폴더에서 .devcontainer 라는 폴더를 만들고 devcontainer.json 파일을 설정하세요.

다음 다이어그램은 Dev Containers의 일반 아키텍처를 설명합니다:

![Dev Containers Architecture](/assets/img/2024-07-10-SettingADockerizedPythonEnvironmentTheElegantWay_1.png)

Dev Containers 확장은 시작 시에 컨테이너 내에서 새로운 VScode 세션을 만듭니다. 기본적으로 로컬 폴더를 컨테이너에 연결하므로 코드를 지속적으로 유지하고 로컬 폴더와 동기화할 수 있습니다. 추가 폴더를 연결할 수도 있지만, 이것은 이 튜토리얼의 범위를 벗어납니다.

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

다음 섹션에서는 devcontainer.json 파일을 사용하여 Python 환경을 설정하는 방법을 살펴보겠습니다.

# Docker화된 Python 환경 설정

devcontainer.json 설정을 시작하기 전에, 먼저 개발 환경의 범위를 정의해야 합니다. 다음 기능들을 포함해야 합니다:

- Python 3.10
- Jupyter 노트북 지원
- 필요한 라이브러리 설치 - Pandas 및 VScode Jupyter 지원 라이브러리
- 지원 확장 프로그램 설치 - Python 및 Jupyter

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

다음 섹션에서는 devcontainer.json 파일의 핵심 기능에 대해 자세히 살펴보겠습니다. 우리는 최소한의 Python 환경으로 시작하고 다양한 사용자 정의 레이어를 추가하여 이를 사용자 정의하는 방법을 보여줄 것입니다.

## 빌드 대 이미지

Dev Containers 확장 프로그램을 사용하여 컨테이너화된 세션을 시작하는 주요 요구 사항은 이미지 설정을 정의하는 것입니다. 이미지 설정을 하는 방법은 두 가지가 있습니다:

- 빌드 인수를 사용하여 컨테이너 시작 시 이미지를 빌드하고 실행합니다. 이 인수를 사용하면 빌드를 위한 Dockerfile을 정의하고 docker 빌드 함수에 인수를 전달할 수 있습니다. 빌드 프로세스가 완료되면 컨테이너 내부에서 세션을 시작합니다.
- 이미지 인수를 사용하여 기존 이미지로 세션을 시작합니다.

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

각 방법마다 장단점이 있으므로 사용 사례에 따라 적절한 방법을 고려해야 합니다. 이미지 인수를 사용해야 하는 경우는 환경 요구 사항을 완벽히 충족하는 이미지가 있는 경우입니다. 빌드 인수를 사용하는 좋은 사례는 베이스 이미지는 있지만 소량의 사용자 지정 설정을 추가해야 하는 경우입니다.

다음 섹션에서는 공식 Python 이미지(python:3.10)를 가져오기 위해 이미지 인수를 사용하는 간단한 Python 환경을 구성하는 예제로 시작하겠습니다.

## 기본적인 Docker화된 Python 환경

아래의 devcontainer.json 파일은 Python 환경을 설정하는 간단한 예제를 제공합니다. 세션 환경으로 python:3.10 이미지를 정의하기 위해 이미지 인수를 사용합니다.

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

```json
{
  "name": "파이썬 개발 환경",
  "image": "python:3.10"
}
```

`name` 인수는 환경 이름을 정의합니다. 이 경우, "파이썬 개발 환경"으로 설정했습니다.

환경을 시작하기 전에, 아래 사항을 확인해주세요:

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

- Docker Desktop (또는 동등한 소프트웨어)가 열려 있습니다.
- Docker Hub에 로그인되어 있습니다 (또는 미리 Python 이미지를 가져왔습니다).
- 프로젝트 폴더의 .devcontainer 폴더 아래에 devcontainer.json 파일이 설정되어 있습니다:

```js
.
└── .devcontainer
    └── devcontainer.json
```

이 예제의 코드는 여기에서 확인하실 수 있습니다.

세션을 시작하려면, 왼쪽 하단에 있는 Dev Container 아이콘을 클릭하고 화면 캡처에서 보여지는 것과 같이 Reopen in Container 옵션을 선택하시면 됩니다:

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

![image](https://miro.medium.com/v2/resize:fit:1400/1*la5gIkzz8nm3-2-YUILgyA.gif)

개발 컨테이너 확장 프로그램은 세션의 첫 번째 실행 시간에 image 매개변수로 정의된 이미지를 찾습니다 (이 경우 — python:3.10). 이미지가 로컬에서 사용할 수 없으면 Docker Hub에서 가져오며, 이 과정에는 몇 분이 소요될 수 있습니다. 그 후 세션을 시작하는 데 몇 초가 걸릴 것입니다.

![image](/assets/img/2024-07-10-SettingADockerizedPythonEnvironmentTheElegantWay_2.png)

위 스크린샷을 통해 devcontainer.json 매개변수와 세션 설정 간의 매핑을 볼 수 있습니다. 세션 이름이 이제 오른쪽 하단에 표시되어 있으며(보라색으로 표시됨), 이는 name 매개변수의 값과 일치합니다. 마찬가지로 세션은 이제 python:3.10 컨테이너 내에서 실행되며 터미널에서 Python을 실행할 수 있습니다.

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

파이썬 컨테이너에는 기본 파이썬 라이브러리가 함께 제공됩니다. 다음 섹션에서는 build argument를 사용하여 파이썬 베이스 이미지 위에 더 많은 레이어를 추가하는 방법을 살펴보겠습니다.

## Dockerfile을 사용하여 Python 환경을 사용자 정의하기

이제 devcontainer.json을 수정하여 위 환경을 사용자 정의해 봅시다. 이미지 argument를 build argument로 변경할 것입니다. build argument를 사용하면 세션 시작 시 도커 파일을 사용하여 이미지를 생성하고 docker build 함수에 인수를 전달할 수 있습니다. 이 글에서 소개하는 방법은 다음과 같습니다:

- base 이미지로 python:3.10 가져오기
- 가상 환경 설정
- 필요한 라이브러리 설치하기

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

다음 Dockerfile을 사용하여 Python 환경을 설정할 것입니다:

Dockerfile

```js
FROM python:3.10

ARG PYTHON_ENV=my_env

ENV PYTHON_ENV=$PYTHON_ENV

RUN mkdir requirements

COPY requirements.txt set_python_env.sh /requirements/

RUN bash ./requirements/set_python_env.sh $PYTHON_ENV
```

FROM 인자를 사용하여 Python 이미지를 가져오고, ARG 및 ENV 인자를 사용하여 가상 환경을 인자 및 환경 변수로 설정합니다. 또한 가상 환경을 설정하고 필요한 라이브러리를 설치하기 위해 다음 두 개의 보조 파일을 사용합니다.

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

- requirements.txt: 필요한 라이브러리 목록을 담은 설정 파일입니다. 이 예제에서는 Pandas 라이브러리 버전 2.0.3과 Jupyter를 지원하는 라이브러리(ipykernel, ipywidgets, jupyter)를 설치할 것입니다. Wheels 라이브러리는 C 의존성을 처리하는 지원 라이브러리입니다.
- set_python_env.sh: 가상 환경을 설정하고 requirements.txt 파일을 사용하여 필요한 라이브러리를 설치하는 도우미 bash 스크립트입니다.

requirements.txt

```js
wheel==0.40.0
pandas==2.0.3
ipykernel
ipywidgets
jupyter
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

```bash
#!/usr/bin/env bash

PYTHON_ENV=$1

python3 -m venv /opt/$PYTHON_ENV  \
        && export PATH=/opt/$PYTHON_ENV/bin:$PATH \
        && echo "source /opt/$PYTHON_ENV/bin/activate" >> ~/.bashrc

source /opt/$PYTHON_ENV/bin/activate

pip3 install -r ./requirements/requirements.txt
```

마지막 but not least, 우리는 다음의 테스트 파일을 사용하여 Pandas 라이브러리가 올바르게 설치되었는지 평가하고 Hello World! 메시지를 출력할 것입니다:

test1.py

```python
import pandas as pd

print("Hello World!")
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

devcontainer.json 파일에서 변경 사항을 적용해보세요. 이미지 인자를 빌드 인자로 바꿔주세요:

```json
{
  "name": "Python Development Environment",
  "build": {
    "dockerfile": "Dockerfile",
    "context": ".",
    "args": {
      "PYTHON_ENV": "my_python_dev"
    }
  }
}
```

이 예제에 대한 파일은 여기에서 확인하실 수 있어요.

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

이미지 생성을 사용자 정의하기 위해 build 하위 인수들을 활용할 수 있습니다. Docker build 함수에 인수를 전달하여 이미지 빌드를 조정할 수 있습니다. 이미지를 빌드하기 위해 다음과 같은 인수를 사용합니다:

- dockerfile — Dockerfile의 경로와 이름
- context — Docker 빌드 중에 COPY 인수를 통해 파일에 액세스할 수 있도록 로컬 파일 시스템의 경로를 설정합니다. 이 경우 devcontainer.json 파일의 현재 폴더(예: .devcontainer 폴더)를 사용합니다.
- args — 빌드 프로세스 중에 컨테이너에 인수를 설정하고 전달합니다. PYTHON_ENV 인수를 사용하여 가상 환경을 설정하고 my_python_dev로 명명합니다.

당신은 .devcontainer 폴더 아래 Dockerfile, requirements.txt 및 set_python_env.sh 파일을 devcontainer.json 파일과 함께 보유해야 합니다:

.
├── .devcontainer
│ ├── Dockerfile
│ ├── devcontainer.json
│ ├── requirements.txt
│ └── set_python_env.sh
└── test2.py

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

이제 새로운 설정을 사용하여 세션을 시작하고 test1.py 파일로 테스트해 봅시다.

![image](/assets/img/2024-07-10-SettingADockerizedPythonEnvironmentTheElegantWay_3.png)

위 스크린샷에서 볼 수 있듯이 터미널에서 테스트 스크립트를 성공적으로 실행했고 (보라색으로 표시), 예상대로 Hello World! 메시지를 출력했습니다 (초록색으로 표시). 또한 이미지에서 설정한 가상 환경인 my_python_dev가 기본으로 로드되었습니다 (노란색으로 표시).

다음 섹션에서는 Dev Containers 세션의 VScode 설정을 사용자 정의하는 방법을 살펴볼 것입니다.

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

## VScode 설정 사용자 정의하기

Dev Containers 확장 프로그램의 훌륭한 기능 중 하나는 세션 설정을 주요 VScode 설정에서 격리시킨다는 것입니다. 이는 프로젝트 수준에서 VScode 설정을 완전히 사용자 정의할 수 있다는 것을 의미합니다. 이는 개발 환경의 재현성을 Python이나 OS 설정을 넘어 확장합니다. 마지막으로, 이는 타인과의 협업이나 여러 기기에서 작업할 때 매끄럽고 효율적입니다.

다음 예시로 이 튜토리얼을 마무리 지을 것인데, 거기서 우리는 어떻게 customizations 인자를 사용하여 VScode 설정을 사용자 정의하는지 볼 것입니다. 이전 예시에 해당 인자를 추가하고 vscode 하위 인자를 사용하여 환경의 기본 Python 인터프리터와 필요한 확장 프로그램을 설정할 것입니다:

devcontainer.json

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
{
    "name": "Python 개발 환경",
    "build": {
        "dockerfile": "Dockerfile",
        "context": ".",
        "args": {
            "PYTHON_ENV": "my_python_dev"
        }
    },
    "customizations": {
        "vscode": {
            "settings": {
                "python.defaultInterpreterPath": "/opt/my_python_dev/bin/python3",
                "python.selectInterpreter": "/opt/my_python_dev/bin/python3"
            },
            "extensions": [
                "ms-python.python",
                "ms-toolsai.jupyter"
            ]
        }
    }
}
```

이 예시에 대한 파일은 여기에서 이용 가능합니다.

이미지에서 정의된 Python 가상 환경을 설정 인자로 사용합니다. 또한 Python 및 Jupyter 지원 확장 프로그램을 설치하는 데 확장 프로그램 인자를 사용합니다.

Python 확장 프로그램을 추가한 후, 아래 스크린샷에 나타난 것처럼 확장 플러그인을 사용하여 Python 스크립트를 실행할 수 있습니다. 또한 Juptyer 확장 프로그램을 활용하여 Python 코드를 대화식 모드로 실행할 수 있습니다.

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

![dockerized python environment](https://miro.medium.com/v2/resize:fit:1400/1*rtd2u27LabzCPM4Uh7hsMg.gif)

# 개요

이 튜토리얼에서는 VScode 및 Dev Containers 확장 프로그램을 사용하여 도커화된 Python 환경을 설정하는 방법을 살펴보았습니다. Dev Containers 확장 프로그램을 사용하면 컨테이너를 개발 워크플로에 효과적으로 통합할 수 있습니다. 몇 가지 간단한 단계로 devcontainer.json 파일을 사용하여 도커화된 Python 환경을 설정하고 사용자 정의하는 방법을 살펴보았습니다. 이미지 및 빌드 인수로 세션 이미지를 설정하거나 customizations 인수로 확장 프로그램을 설정하는 두 가지 접근 방식을 살펴보았습니다. 이 튜토리얼에서 다루지 않은 추가적인 사용자 정의 옵션이 있으며 다음을 확인하는 것을 권장합니다:

- 환경 변수 정의
- 추가 볼륨 탑재
- 도커 실행 명령에 인수 설정
- 실행 후 명령 실행

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

만약 자세한 내용에 흥미를 느낀다면 이 튜토리얼을 확인해 보시는 것을 추천드립니다:

# 자원

- 코드 예시 — [github.com/RamiKrispin/vscode-python-medium](https://github.com/RamiKrispin/vscode-python-medium)
- VScode — [code.visualstudio.com/](https://code.visualstudio.com/)
- Dev Containers — [code.visualstudio.com/docs/devcontainers/containers](https://code.visualstudio.com/docs/devcontainers/containers)
- GitHub 템플릿으로 도커화된 Python 개발 환경 설정하기 — [medium.com/@rami.krispin/setting-a-dockerized-python-development-environment-template-de2400c4812b](https://medium.com/@rami.krispin/setting-a-dockerized-python-development-environment-template-de2400c4812b)
