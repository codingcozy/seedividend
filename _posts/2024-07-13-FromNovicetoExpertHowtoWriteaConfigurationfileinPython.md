---
title: "초보부터 전문가까지 Python으로 설정 파일 작성하는 방법"
description: ""
coverImage: "/assets/img/2024-07-13-FromNovicetoExpertHowtoWriteaConfigurationfileinPython_0.png"
date: 2024-07-13 21:07
ogImage: 
  url: /assets/img/2024-07-13-FromNovicetoExpertHowtoWriteaConfigurationfileinPython_0.png
tag: Tech
originalTitle: "From Novice to Expert: How to Write a Configuration file in Python"
link: "https://medium.com/towards-data-science/from-novice-to-expert-how-to-write-a-configuration-file-in-python-273e171a8eb3"
isUpdated: true
---




![From Novice to Expert: How to Write a Configuration File in Python](/assets/img/2024-07-13-FromNovicetoExpertHowtoWriteaConfigurationfileinPython_0.png)

소프트웨어를 설계할 때 일반적으로 높은 품질의 코드를 작성하는 데 많은 노력을 기울입니다. 하지만 그것만으로 충분하지 않습니다. 좋은 소프트웨어는 테스트, 배포, 네트워크 등 생태계를 고려해야 합니다. 가장 중요한 측면 중 하나는 구성 관리입니다.

좋은 구성 관리는 코드를 수정하지 않고 소프트웨어를 어떤 환경에서든 실행할 수 있어야 합니다. 이를 통해 운영팀이 모든 귀찮은 설정을 관리할 수 있게 도와주며 프로세스 중에 무엇이 발생할 수 있는지 보여주고 심지어 런타임 중에 동작을 변경할 수도 있습니다.

가장 일반적인 구성에는 데이터베이스나 외부 서비스의 자격 증명, 배포된 서버의 호스트 이름, 동적 매개변수 등이 포함됩니다.

<div class="content-ad"></div>

이 문서에서는 구성 관리의 좋은 실천 방법과 그것을 Python에서 어떻게 구현할 수 있는지에 대해 공유하고자 합니다. 더 많은 아이디어가 있다면 아래에 댓글을 남겨주세요.

## 별도의 구성 파일이 필요한 경우

구성 파일을 작성하기 전에, 외부 파일이 왜 필요한지 스스로에게 물어봐야 합니다. 코드에서 그냥 상수로 만들 수 없을까요? 사실, 유명한 The Twelve-Factor App이 이 질문에 대답해주었습니다:

데이터베이스 자격 증명과 같은 환경에 따라 변하는 매개변수는 외부 파일에 저장하는 것이 좋다고 권장합니다. 그렇지 않으면 코드 내에서는 그냥 일반 상수일 뿐입니다. 또한 자주 보이는 다른 사용 사례는 외부 파일에 동적 변수를 저장하는 것인데, 예를 들어 블랙리스트나 화이트리스트 등이 있습니다. 하지만 특정 범위 내의 숫자(예: 타임아웃)나 일부 자유 텍스트일 수도 있습니다. 이러한 변수들은 각 환경에서 동일할 수 있지만, 구성 파일은 소프트웨어를 훨씬 유연하고 편리하게 편집할 수 있도록 만듭니다. 그러나 구성이 너무 많아지면 데이터베이스로 옮기는 것도 고려해볼 수 있습니다.

<div class="content-ad"></div>

## 어떤 형식의 설정 파일을 사용해야 할까요?

사실, 코드가 설정 파일을 읽고 파싱할 수 있다면 설정 파일의 형식에 대한 제약은 없습니다. 그러나 몇 가지 좋은 관행이 있습니다.

가장 일반적이고 표준화된 형식은 YAML, JSON, TOML, INI가 있습니다. 좋은 설정 파일은 최소한 다음 3가지 기준을 충족해야 합니다:

- 쉽게 읽고 편집할 수 있어야 합니다: 텍스트 기반으로 구조화되어 이해하기 쉬운 방식으로 작성되어야 합니다. 비개발자들도 읽을 수 있어야 합니다.
- 주석을 허용해야 합니다: 설정 파일은 개발자만이 읽는 것이 아닙니다. 비개발자들이 프로세스를 이해하고 소프트웨어 동작을 수정하려고 할 때 매우 중요합니다. 주석을 작성하여 특정 사항을 빠르게 설명하는 것은 설정 파일을 더욱 표현력있게 만드는 방법입니다.
- 쉽게 배포할 수 있어야 합니다: 설정 파일은 모든 운영 체제와 환경에서 인식할 수 있어야 합니다. 또한 CDaaS 파이프라인을 통해 서버로 쉽게 전송될 수 있어야 합니다.

<div class="content-ad"></div>

아마도 아직 무엇이 더 나은지 모르실지도 모릅니다. 그러나 Python의 맥락에서 생각해 보면, 답은 YAML 또는 INI일 것입니다. YAML과 INI는 대부분의 Python 프로그램과 패키지에서 잘 받아들여집니다. INI는 아마 가장 간단한 솔루션으로 계층 구조의 단계가 1개뿐입니다. 그러나 INI에는 데이터 유형이 없어 모든 것이 문자열로 인코딩됩니다.

YAML에서 동일한 구성은 이렇게 보입니다. 알 수 있듯이 YAML은 중첩 구조를 아주 잘 지원합니다 (JSON과 마찬가지). 게다가 YAML은 문자열, 정수, 실수, 부울, 리스트, 딕셔너리 등 일부 데이터 유형을 기본적으로 인코딩합니다.

JSON은 YAML과 매우 비슷하며 매우 인기가 있지만 JSON에는 주석을 추가할 수 없습니다. 저는 프로그램 내부에서 구성을 위해 JSON을 자주 사용하지만 구성을 다른 사람들과 공유하고 싶을 때는 사용하지 않습니다.

반면에 TOML은 INI와 비슷하나 더 많은 데이터 유형을 지원하고 중첩 구조에 대한 구문을 정의합니다. pip 또는 poetry와 같은 Python 패키지 관리에 많이 사용됩니다. 그러나 구성 파일에 많은 중첩 구조가 있는 경우 YAML이 더 나은 선택입니다. 다음 파일은 INI처럼 보이지만 각 문자열 값이 따옴표로 묶여있습니다.

<div class="content-ad"></div>

지금까지 왜(WHY)와 무엇(WHAT)을 설명했습니다. 다음 섹션에서는 HOW를 보여드릴 거에요.

## 옵션1: YAML/JSON — 외부 파일을 간단히 읽기

일반적인 방법부터 시작하겠습니다. 간단히 외부 파일을 만들어서 읽어오는 방법입니다. Python에는 YAML 및 JSON 파일을 구문 분석하기 위한 전용 내장 패키지가 있습니다. 아래 코드에서 확인할 수 있듯이, 두 파일 모두 동일한 dict 개체를 반환하므로 두 파일에 대한 속성 접근은 동일할 것입니다.

읽기

<div class="content-ad"></div>

안녕하세요! 보안 문제로 인해 설정 파일에서 코드 주입을 피하려면 yaml.load() 대신 yaml.safe_load()를 사용하는 것이 좋습니다.

유효성 검사

두 패키지 모두 존재하지 않는 파일에 대해 FileNotFoundError를 발생시킵니다. YAML은 비-YAML 파일 및 잘못된 YAML 파일에 대해 서로 다른 예외를 throw하며, JSON은 이러한 오류 모두에 대해 JSONDecoderError를 throw합니다.

## 옵션2: Cofigureparser — Python 내장 패키지

<div class="content-ad"></div>

지금부터 구성 관리를 위해 설계된 패키지를 소개하겠습니다. 먼저 파이썬 내장 패키지인 ConfigParser부터 시작해보겠습니다.

ConfigParser는 주로 INI 파일을 읽고 쓰는 데 사용되지만, 딕셔너리 및 반복 가능한 파일 객체도 입력으로 지원합니다. 각 INI 파일은 여러 섹션으로 구성되어 있으며 여러 개의 키-값 쌍이 포함되어 있습니다. 아래는 필드에 액세스하는 예시입니다.

읽기

ConfigParser는 구성 파일에서 데이터 유형을 추측하지 않기 때문에 모든 구성은 문자열로 저장됩니다. 그러나 문자열을 올바른 데이터 유형으로 변환하는 몇 가지 메서드를 제공합니다. 가장 흥미로운 것 중 하나는 부울(참/거짓) 유형입니다. `yes`/`no`, `on`/`off`, `true`/`false` 및 `1`/`0`과 같은 부울 값을 인식할 수 있습니다.

<div class="content-ad"></div>

이미 언급한 대로, read_dict()를 사용하여 사전에서도 읽을 수 있습니다. 또한 read_string()을 사용하여 문자열 또는 read_file()을 사용하여 이터러블 파일 객체에서도 읽을 수 있습니다.

유효성 검사

Configparser의 유효성 검사는 YAML 및 JSON보다 직관적이지 않습니다. 첫째, 파일이 존재하지 않을 경우 FileNotFoundError를 일으키지 않고 대신에 키에 액세스하려고 할 때 KeyError가 발생합니다.

또한, 이 패키지는 들여쓰기 오류를 "무시"합니다. 아래 예제처럼 "DEBUG" 앞에 추가 탭 또는 공백이 있다면, ENVIRONMENT 및 DEBUG에 대해 잘못된 값이 반환됩니다.

<div class="content-ad"></div>

그럼에도 불구하고 Configparser는 여러 오류에 대해 ParserError를 반환할 수 있습니다(마지막 테스트 케이스를 참조하세요). 이는 한 번에 문제를 해결하는 데 도움이 됩니다.

## 옵션3: python-dotenv — 환경 변수로 설정 구성하기

이제 우리는 서드 파티 라이브러리로 넘어갑니다. 지금까지 실제로 .env이라는 구성 파일 유형을 놓치고 있습니다. .env 파일 내부의 변수들은 python-dotenv에 의해 환경 변수로 로드되어 os.getenv로 액세스할 수 있습니다.

.env 파일은 기본적으로 다음과 같이 보입니다. 기본 경로는 프로젝트의 루트 폴더입니다.

<div class="content-ad"></div>

```js
환경=test
디버그=true
사용자이름=xiaoxu
암호=xiaoxu
호스트=127.0.0.1
포트=5432
```

읽기

매우 쉽게 사용할 수 있습니다. 환경에 이미 있는 변수를 매개변수로 오버라이드할지 여부를 결정할 수 있습니다.

유효성 검사

<div class="content-ad"></div>

그러나 python-dotenv은 .env 파일을 유효성 검사하지 않습니다. 이렇게 .env 파일이 있고 DEBUG에 액세스하려고 하면, 예외 없이 반환값으로 None을 받을 것입니다.

```js
# .env
ENVIRONMENT=test
DEBUG
# load.py
load_dotenv()
print('DEBUG' in os.environ.keys())
# False
```

## 옵션4: Dynaconf — 파이썬을 위한 강력한 설정 구성

Dynaconf은 파이썬을 위한 매우 강력한 설정 구성입니다. 다양한 파일 형식을 지원합니다: yaml, json, ini, toml 및 python. .env 파일을 자동으로로드할 수 있고 사용자 정의 유효성 검사 규칙을 지원합니다. 간단히 말해서, 이전 3가지 옵션에서 다루는 대부분의 기능을 다루며 더 나아갑니다. 예를 들어, 암호화된 비밀번호를 저장하고 사용자 정의 로더를 사용하여 비밀번호를 복호화할 수 있습니다. 또한 Flask, Django 및 Pytest와 잘 통합되어 있습니다. 이 글에서는 모든 기능을 다 다루지 않겠지만, 자세한 내용은 공식 문서를 참조해주세요.

<div class="content-ad"></div>

표 태그를 Markdown 형식으로 변경해 주세요.

<div class="content-ad"></div>

내가 흥미로운 기능 중 하나는 사용자 정의 유효성 검사기입니다. 이전에 언급했듯이 Configparser는 INI 파일을 엄격하게 유효성을 검사하지 않지만 dynaconf 내에서 이를 달성할 수 있습니다. 이 예에서는 파일에 특정 키가 있는지와 특정 키가 올바른 값을 갖는지를 확인합니다. YAML 또는 TOML 파일에서 읽는 경우에는 여러 데이터 유형을 지원하므로 숫자가 특정 범위에 있는지도 확인할 수 있습니다.

Pytest와의 통합

또 다른 흥미로운 기능은 pytest와의 통합입니다. 유닛 테스트를 위한 설정은 일반적으로 다른 환경과 다릅니다. FORCE_ENV_FOR_DYNACONF를 사용하여 응용 프로그램이 설정 파일의 다른 섹션을 읽도록 하거나 monkeypatch를 사용하여 설정 파일의 특정 키와 값 쌍을 대체할 수 있습니다.

런타임 중 구성 새로 고침

<div class="content-ad"></div>

Dynaconf은 reload()도 지원합니다. 이 기능은 모든 로더를 정리하고 실행합니다. 이것은 애플리케이션이 실행 중에 설정 파일을 다시로드하길 원할 때 유용합니다. 예를 들어, 설정 파일이 열리고 수정될 때 애플리케이션이 자동으로 설정을 다시로드해야 하는 경우가 있습니다.

## 옵션5: 하이드라- 계층형 구성을 동적으로 생성하여 개발 단순화

마지막 옵션은 파일 로더 이상입니다. 하이드라는 Facebook에서 개발한 프레임워크로 복잡한 애플리케이션을 우아하게 구성하는 데 도움이 됩니다.

하이드라는 구성 파일 읽기, 쓰기, 유효성 검사 뿐만 아니라 다중 구성 파일 관리에 도움이 되는 전략을 제시하며, 명령줄 인터페이스를 통해 오버라이딩하고, 각 실행의 스냅샷을 생성하는 등의 기능을 제공합니다.

<div class="content-ad"></div>

표 태그를 Markdown 형식으로 변경하면 됩니다.

<div class="content-ad"></div>

구성 그룹

Hydra에서는 구성 그룹이라는 개념을 소개합니다. 이 아이디어는 동일한 유형의 구성을 그룹화하고 실행 중에 그 중 하나를 선택하는 것입니다. 예를 들어, "데이터베이스"라는 그룹을 가질 수 있고, Postgres용 구성 하나와 MySQL용 다른 구성 하나를 가질 수 있습니다.

보다 복잡해지면 프로그램에서 이와 같은 레이아웃을 가질 수 있습니다 (Hydra 문서의 예시)

그리고 db, schema 및 ui의 다른 조합을 사용하여 응용 프로그램을 벤치마크하고 싶다면 다음을 실행할 수 있습니다:

<div class="content-ad"></div>

```js
python my_app.py db=postgresql schema=school.yaml
```

자세히 ...

하이드라는 다양한 설정 파일을 사용하여 여러 작업을 동시에 실행하는 --multirun을 지원합니다. 예를 들어, 이전 예제를 위해 다음과 같이 실행할 수 있습니다:

```js
python my_app.py schema=warehouse,support,school db=mysql,postgresql -m
```

<div class="content-ad"></div>

그럼 기본적으로 동시에 6개의 작업을 시작해요!

```js
[2019-10-01 14:44:16,254] - 로컬에서 6개의 작업 시작
[2019-10-01 14:44:16,254] - 스위프 출력 디렉토리: multirun/2019-10-01/14-44-16
[2019-10-01 14:44:16,254] -     #0 : schema=warehouse db=mysql
[2019-10-01 14:44:16,321] -     #1 : schema=warehouse db=postgresql
[2019-10-01 14:44:16,390] -     #2 : schema=support db=mysql
[2019-10-01 14:44:16,458] -     #3 : schema=support db=postgresql
[2019-10-01 14:44:16,527] -     #4 : schema=school db=mysql
[2019-10-01 14:44:16,602] -     #5 : schema=school db=postgresql
```

## 결론

이 글에서는 WHY WHAT 및 HOW 측면에서 Python에서의 구성 관리에 대해 이야기했습니다. 사용 사례에 따라 복잡한 도구/프레임워크가 항상 간단한 패키지보다 나을 수 있는 것은 아닙니다. 어떤 것을 선택하더라도 항상 가독성, 유지 보수 가능성 및 오류를 쉽게 찾을 수 있는 방법을 고려해야 합니다. 사실, 구성 파일은 그냥 다른 유형의 코드일 뿐입니다.

<div class="content-ad"></div>

이 기사를 즐기시길 바라며 아래에 자유롭게 댓글을 남겨주세요.

## 참고