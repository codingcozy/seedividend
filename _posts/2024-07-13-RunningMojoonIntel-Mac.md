---
title: "인텔 맥에서 Mojo 실행하는 방법"
description: ""
coverImage: "/assets/img/2024-07-13-RunningMojoonIntel-Mac_0.png"
date: 2024-07-13 01:44
ogImage: 
  url: /assets/img/2024-07-13-RunningMojoonIntel-Mac_0.png
tag: Tech
originalTitle: "Running Mojo on Intel-Mac"
link: "https://medium.com/@nik.vee.p/running-mojo-on-intel-mac-82324f2e557b"
isUpdated: true
---




![Mojo](/assets/img/2024-07-13-RunningMojoonIntel-Mac_0.png)

파이썬과 유사하지만 C처럼 실행되는 프로그래밍 언어인 Mojo는 AI 시스템의 속도를 가속화하기 위해 만들어졌습니다. 파이썬보다 최대 68,000배 빠릅니다 😳. 이는 Scalar C++보다 빠릅니다.

# Mojo를 선택한 이유

AI 엔지니어로써 잠재적인 속도 향상이 매력적하지만, 2020년형 Intel 칩이 장착된 맥북으로 작업하는 제한으로 어려움을 겪고 있습니다.

<div class="content-ad"></div>

저의 맥(인텔 기반)에 Mojo를 설치하려고 하니 다음과 같은 오류가 발생했습니다.

![Running Mojo on Intel Mac](/assets/img/2024-07-13-RunningMojoonIntel-Mac_1.png)

Mojo 개발에는 강력하지만 "구식" 시스템을 사용하고 있는 피해자인 것 같네요..

그래서 어떤 해결책을 도출해야 할 것 같아요.

<div class="content-ad"></div>

# 인텔 맥에서 Mojo를 작동시키는 방법

## 리눅스에서 Mojo를 실행할 수 있습니다.

Mojo는 리눅스 환경에서 실행할 수 있기 때문에, 해결 방법은 아마도 맥에서 리눅스 환경을 만들고, 그곳에서 프로그램을 실행하는 것일 것 같네요.

그럼 Mojo에서 개발을 시작해봅시다. 🚀

<div class="content-ad"></div>

## 시작하기

이 과정은 Docker를 사용하여 Mojo가 Mac에서 실행될 수 있는 격리된 환경을 만드는 일련의 단계를 통해 진행할 것입니다.

## Docker를 사용한 환경 설정

우선, Mojo 개발을 진행할 디렉토리를 열고 사용하세요. 제 경우에는 Mojo를 위한 폴더를 만들고, 그 안에 first-project라는 새 폴더를 만들었습니다. 또한 Visual Studio Code에서 Mojo 확장 프로그램을 설치하여 개발하고 있습니다.

<div class="content-ad"></div>

디렉토리 안에 Docker 파일(확장자 없음)을 만들겠습니다. Modular과 Mojo는 개발을 위해 Python 3.8–3.11을 필요로 합니다. 저는 Python 3.10을 사용할 것입니다.

그런 다음 Modular을 설치하는 명령어를 사용하고, 그 다음에 Mojo를 설치하겠습니다.

```js
FROM python:3.10

RUN apt-get update && apt-get install -y curl

# Modular CLI 설치
RUN curl https://get.modular.com | sh -

# PATH에 Modular 추가
ENV PATH="/root/.modular/pkg/packages.modular.com_mojo/bin:${PATH}"

# Mojo 설치
RUN modular auth [여러분의 인증 키 입력]
RUN modular install mojo

WORKDIR /app

CMD ["/bin/bash"]
```

위 단계를 완료하면, Dockerfile이 있는 디렉토리에서 Docker 이미지를 빌드하세요.

<div class="content-ad"></div>

```bash
도커 빌드 명령어를 사용해서 "mojo-dev" 이미지를 생성하세요.

<img src="/assets/img/2024-07-13-RunningMojoonIntel-Mac_2.png" />

이미지 생성이 완료되면 도커 컨테이너를 실행하세요:

도커 컨테이너를 실행하는 명령어입니다.

도커 실행 -it -v $(pwd):/app mojo-dev

<div class="content-ad"></div>

터미널 창에서 Docker 컨테이너의 루트를 확인할 수 있어요:

![화면](/assets/img/2024-07-13-RunningMojoonIntel-Mac_3.png)

앱이 잘 작동되는지 확인하려면 다음 명령어를 입력하세요:

python --version
mojo --version

<div class="content-ad"></div>

Mojo에서 개발을 시작해도 좋을 것 같네요.

여기 두 숫자를 더하는 간단한 mojo 함수가 있습니다 (제 파일명은 first.mojo):

fn add_two_numbers(a: Int, b: Int) -> Int:
    return a + b

def main():
    result = add_two_numbers(1, 2);
    print("결과는: ", result)

<div class="content-ad"></div>

파일을 실행하려면,

mojo run first.mojo

그러면 다음과 같은 결과를 얻게 됩니다:

![](/assets/img/2024-07-13-RunningMojoonIntel-Mac_5.png)

<div class="content-ad"></div>

# 마무리 글

Mojo를 내 프로그램에 통합해서 속도 향상을 체험하고 싶어요!

이전에는 Python 속도 향상을 위해 Numpy와 Cython과 같은 다양한 방법을 사용해왔는데, 속도가 향상된 것은 알겠지만, Mojo를 통해 프로그램을 얼마나 더 빠르게 만들 수 있는지 기대돼요.

AI 및 프로그래밍 작업을 가속화하는 팁에 대한 더 많은 소식을 기대해 주세요.

<div class="content-ad"></div>

# 연락처

질문이 있으시면 저의 웹사이트를 통해 연락 주세요: [https://mont-ops.com](https://mont-ops.com) .

감사합니다! 행복한 코딩 되세요!